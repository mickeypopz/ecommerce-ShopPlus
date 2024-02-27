const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text, role) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    let logo = "Shop Plus +"
    let Name = "Shop Plus"
    let texts = "";
    let htmls = "";
    if (role === "verify") {
      let link = text;
      texts = `Hello, 
    Please click on the following link to verify your email: ${link}  Best regards,
    ${Name} team`;
      htmls = `<!DOCTYPE html>
    <html>
      <head> </head>
      <body>
        <center>
          <table
            style="
              width: 560px;
              margin: 0;
              padding: 0;
              font-family: Helvetica, Arial, sans-serif;
              border-collapse: collapse !important;
              height: 100% !important;
              background-color: #ffffff;
            "
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            height="100%"
            width="100%"
            id="m_-8681643305988200227bodyTable"
          >
            <tbody>
              <tr>
                <td
                  align="center"
                  valign="top"
                  id="m_-8681643305988200227bodyCell"
                  style="
                    margin: 0;
                    padding: 0;
                    font-family: Helvetica, Arial, sans-serif;
                    height: 100% !important;
                  "
                >
                  <div
                    style="
                      background-color: #ffffff;
                      color: #202123;
                      padding: 27px 28px 0 25px;
                    "
                  >
                    <p style="text-align: left; margin: 0">
                      <img
                        src=${logo}
                        alt=${Name}
                        title=""
                        style="
                          width: 140px;
                          height: auto;
                          border: 0;
                          line-height: 100%;
                          outline: none;
                          text-decoration: none;
                        "
                        class="CToWUd"
                      />
                    </p>
                  </div>
                  <div
                    style="
                      background-color: #f5f5f5b3;
                      color: #353740;
                      margin: 20px 15px;
                      padding: 14px;
                      border-radius: 12px;
                      text-align: left;
                      line-height: 1.5;
                    "
                  >
                    <h1
                      style="
                        color: #202123;
                        font-size: 32px;
                        line-height: 40px;
                        margin: 0 0 20px;
                      "
                    >
                      Verify your email address
                    </h1>
                    <p style="font-size: 16px; line-height: 24px">
                      Thank you for signing up!
                    </p>
                    <p style="font-size: 16px; line-height: 24px">
                      Please confirm your email ${email} by clicking the button
                      below.
                    </p>
    
                    <p style="margin: 24px 0 0; text-align: left">
                      <a
                        href="${link}"
                        style="
                          display: inline-block;
                          text-decoration: none;
                          background: #10a37f;
                          border-radius: 3px;
                          color: white;
                          font-family: Helvetica, sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                          font-weight: 400;
                          padding: 12px 20px 11px;
                          margin: 0px;
                        "
                        target="_blank"
                        data-saferedirecturl="${link}"
                      >
                        Verify email address
                      </a>
                    </p>
                  </div>
                  <div
                    style="
                      text-align: left;
                      background: #ffffff;
                      color: #6e6e80;
                      padding: 0 20px 20px;
                      font-size: 13px;
                      line-height: 1.4;
                    "
                  >
                    <p style="margin: 0">
                      This link will expire in 7 days. Please let us know if you
                      have any questions, feature requests, or general feedback
                      simply by replying to this email.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </body>
    </html>
    `;
    } else {
      let link = text;
      texts = `Hello, 
       Please click on the following link to reset your password: ${link}  Best regards,
    ${Name} team`;
      htmls = `<!DOCTYPE html>
    <html>
      <head> </head>
      <body>
        <center>
          <table
            style="
              width: 560px;
              margin: 0;
              padding: 0;
              font-family: Helvetica, Arial, sans-serif;
              border-collapse: collapse !important;
              height: 100% !important;
              background-color: #ffffff;
            "
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            height="100%"
            width="100%"
            id="m_-8681643305988200227bodyTable"
          >
            <tbody>
              <tr>
                <td
                  align="center"
                  valign="top"
                  id="m_-8681643305988200227bodyCell"
                  style="
                    margin: 0;
                    padding: 0;
                    font-family: Helvetica, Arial, sans-serif;
                    height: 100% !important;
                  "
                >
                  <div
                    style="
                      background-color: #ffffff;
                      color: #202123;
                      padding: 27px 28px 0 25px;
                    "
                  >
                    <p style="text-align: left; margin: 0">
                      <img
                        src=${logo}
                        alt=${Name}
                        title=""
                        style="
                          width: 140px;
                          height: auto;
                          border: 0;
                          line-height: 100%;
                          outline: none;
                          text-decoration: none;
                        "
                        class="CToWUd"
                      />
                    </p>
                  </div>
                  <div
                    style="
                      background-color: #f5f5f5b3;
                      color: #353740;
                      margin: 20px 15px;
                      padding: 14px;
                      border-radius: 12px;
                      text-align: left;
                      line-height: 1.5;
                    "
                  >
                    <h2
                      style="
                        color: #202123;
                        font-size: 32px;
                        line-height: 40px;
                        margin: 0 0 20px;
                      "
                    >
                    Reset your password

                    </h2>
                    
                    <p style="font-size: 16px; line-height: 24px">
                    Please click the button below to reset your password for the email ${email}.
                    </p>
    
                    <p style="margin: 24px 0 0; text-align: left">
                      <a
                        href="${link}"
                        style="
                          display: inline-block;
                          text-decoration: none;
                          background: #10a37f;
                          border-radius: 3px;
                          color: white;
                          font-family: Helvetica, sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                          font-weight: 400;
                          padding: 12px 20px 11px;
                          margin: 0px;
                        "
                        target="_blank"
                        data-saferedirecturl="${link}"
                      >
                      Reset Password
                      </a>
                    </p>
                  </div>
                  <div
                    style="
                      text-align: left;
                      background: #ffffff;
                      color: #6e6e80;
                      padding: 0 20px 20px;
                      font-size: 13px;
                      line-height: 1.4;
                    "
                  >
                    <p style="margin: 0">
                      This link will expire in 7 days. Please let us know if you
                      have any questions, feature requests, or general feedback
                      simply by replying to this email.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </body>
    </html>
    `;
    }
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: texts,
      html: htmls,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;
