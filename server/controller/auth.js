const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const sendEmail = require("../utils/email");
const Token = require("../models/token");
const crypto = require("crypto");

class Auth {
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    let { name, email, password, cPassword, verified, userRole } = req.body;
    let error = {};
    if (!name || !email || !password || !cPassword) {
      error = {
        ...error,
        name: "Filed must not be empty",
        email: "Filed must not be empty",
        password: "Filed must not be empty",
        cPassword: "Filed must not be empty",
      };
      return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Name must be 3-25 charecter" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 charecter",
            name: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // If Email & Number exists in Database then:
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "Email already exists",
              };
              return res.json({ error });
            } else {
              let role = "";
              let verife = "";
              if (userRole === null || userRole == undefined) {
                const firstUser = await userModel.findOne({});
                if (!firstUser) {
                  role = 1;
                } else {
                  role = 0;
                } 
              } else {
                role = userRole;
              }
              if (verified === null || verified == undefined) {
                verife = "false";
              } else {
                verife = verified;
              }
              let newUser = new userModel({
                name,
                email,
                password,
                verified: verife,
                // ========= Here role 1 for admin signup role 0 for customer signup =========
                userRole: role, // Field Name change to userRole from role
              });
              newUser.save();
              let token = await new Token({
                userId: newUser._id,
                token: crypto.randomBytes(32).toString("hex"),
              }).save();

              const message = `${process.env.WEB}/verify/${newUser.id}/${token.token}`;
              await sendEmail(
                newUser.email,
                "Verification Email",
                message,
                "verify"
              );
              return res.json({
                success: `A confirmation email successfully sent to ${newUser.email}`,
              });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

  async postSignupAdmin(req, res) {
    let { name, email, password, cPassword, verified, userRole } = req.body;
    let error = {};
    if (!name || !email || !password || !cPassword) {
      error = {
        ...error,
        name: "Filed must not be empty",
        email: "Filed must not be empty",
        password: "Filed must not be empty",
        cPassword: "Filed must not be empty",
      };
      return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Name must be 3-25 charecter" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 charecter",
            name: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // If Email & Number exists in Database then:
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "Email already exists",
              };
              return res.json({ error });
            } else {
              let role = "";
              let verife = "";
              if (userRole === null || userRole == undefined) {
                role = 0;
              } else {
                role = userRole;
              }
              if (verified === null || verified == undefined) {
                verife = "false";
              } else {
                verife = verified;
              }
              let newUser = new userModel({
                name,
                email,
                password,
                verified: verife,
                // ========= Here role 1 for admin signup role 0 for customer signup =========
                userRole: role, // Field Name change to userRole from role
              });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Account create successfully",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }
  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        if (data.verified === "false") {
          // Check if a token already exists for the user
          let existingToken = await Token.findOne({ userId: data._id });
          // If a token already exists, delete it
          if (existingToken) {
            await existingToken.remove();
          }
          // Create a new token for the user
          let token = await new Token({
            userId: data._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();

          const message = `${process.env.WEB}/verify/${data.id}/${token.token}`;
          await sendEmail(data.email, "Verification Email", message, "verify");
          return res.json({
            verifyerror: "An email sent to your account please verify",
          });
        } else {
          const login = await bcrypt.compare(password, data.password);
          if (login) {
            const token = jwt.sign(
              { _id: data._id, role: data.userRole },
              JWT_SECRET
            );
            const encode = jwt.verify(token, JWT_SECRET);
            return res.json({
              token: token,
              user: encode,
            });
          } else {
            return res.json({
              error: "Invalid email or password",
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const authController = new Auth();
module.exports = authController;
