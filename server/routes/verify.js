const Token = require("../models/token");
const userModel = require("../models/users");
const express = require("express");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { validateEmail } = require("../config/function");

const router = express.Router();

router.get("/verify/:id/:token", async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });

    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send("Invalid link");

    await userModel.findOneAndUpdate({ _id: user._id }, { verified: "true" });
    await Token.findOneAndDelete({ _id: token._id });

    res.send("email verified sucessfully");
  } catch (error) {
    res.status(400).send("An error occured");
  }
});

router.post("/password-reset", async (req, res) => {
  try {
    if (validateEmail(req.body.email)) {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) return res.send("User with given email doesn't exist");

      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
      }

      const message = `${process.env.WEB}/password-reset/${user._id}/${token.token}`;
      await sendEmail(user.email, "Password reset", message, "reset");

      res.send("Password reset link sent to your email account");
    } else {
      res.send("Invalid email");
    }
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});
router.get("/password-reset/:userId/:token", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(400).send("Invalid link or expired");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");
    res.send("User and Token found");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});

router.post("/password-reset/:userId/:token", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(400).send("Invalid link or expired");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");
    let password = req.body.password;
    let passwords = bcrypt.hashSync(password, 10);
    user.password = passwords;
    await user.save();
    await token.delete();

    res.send("Password reset sucessfully");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});
module.exports = router;
