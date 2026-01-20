const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendOtpMail = async (email, name, otp) => {
  try {
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: "pawanjalandhara2001@gmail.com",
        name: "StackNexa",
      },
      to: [{ email }],
      subject: "🔐 StackNexa | OTP Verification",
      htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>StackNexa OTP</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f4f6f8;
            font-family: Arial, Helvetica, sans-serif;
          }
          .container {
            max-width: 520px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          }
          .header {
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            padding: 24px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 26px;
            letter-spacing: 1px;
             font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 1px;
  font-family: "Segoe UI", system-ui, sans-serif;
          }
          .content {
            padding: 30px;
            color: #333333;
          }
          .content h2 {
            margin-top: 0;
            font-size: 20px;
          }
          .otp-box {
            margin: 30px 0;
            text-align: center;
          }
          .otp {
            display: inline-block;
            background: #f1f5f9;
            padding: 14px 28px;
            font-size: 28px;
            letter-spacing: 6px;
            font-weight: bold;
            border-radius: 8px;
            color: #0f2027;
          }
          .note {
            font-size: 14px;
            color: #666666;
            margin-top: 20px;
          }
          .footer {
            background: #f9fafb;
            padding: 18px;
            text-align: center;
            font-size: 13px;
            color: #888888;
          }
          .brand {
            color: #2c5364;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>StackNexa</h1>
          </div>

          <div class="content">
            <h2>Hello ${name || "User"},</h2>

            <p>
              We received a request to verify your email address.
              Please use the OTP below to continue.
            </p>

            <div class="otp-box">
              <div class="otp">${otp}</div>
            </div>

            <p class="note">
              ⏳ This OTP is valid for <b>10 minutes</b>.  
              Please do not share this code with anyone.
            </p>
          </div>

          <div class="footer">
            © ${new Date().getFullYear()} <span class="brand">StackNexa</span>.  
            All rights reserved.
          </div>
        </div>
      </body>
      </html>
      `,
    });

    console.log("✅ OTP email sent via Brevo API");
  } catch (err) {
    console.error("❌ Brevo API email failed:", err.message);
    throw err;
  }
};

module.exports = sendOtpMail;
