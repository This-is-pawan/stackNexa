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

  <!-- Tailwind-like utility styling (Email Safe) -->
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont;
    }

    .container {
      max-width: 520px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }

    /* Header */
    .header {
      background: linear-gradient(135deg, #020617, #0f172a, #1e3a8a);
      padding: 28px;
      text-align: center;
    }

    .brand {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: 1px;
    }

    .brand .stack {
      color: #3b82f6; /* Blue */
    }

    .brand .nexa {
      color: #ffffff; /* White */
    }

    /* Content */
    .content {
      padding: 32px;
      color: #0f172a;
    }

    .content h2 {
      margin-top: 0;
      font-size: 20px;
      font-weight: 600;
    }

    .content p {
      font-size: 15px;
      line-height: 1.6;
      color: #334155;
    }

    /* OTP */
    .otp-box {
      margin: 30px 0;
      text-align: center;
    }

    .otp {
      display: inline-block;
      background-color: #eff6ff;
      color: #1e3a8a;
      padding: 16px 34px;
      font-size: 30px;
      font-weight: 700;
      letter-spacing: 6px;
      border-radius: 10px;
      border: 1px dashed #3b82f6;
    }

    .note {
      font-size: 13px;
      color: #475569;
      margin-top: 20px;
    }

    /* Footer */
    .footer {
      background-color: #f8fafc;
      padding: 18px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
    }

    .footer span {
      color: #2563eb;
      font-weight: 600;
    }
  </style>
</head>

<body>
  <div class="container">

    <!-- Header -->
    <div class="header">
      <div class="brand">
        <span class="stack">Stack</span><span class="nexa">Nexa</span>
      </div>
    </div>

    <!-- Content -->
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

    <!-- Footer -->
    <div class="footer">
      © ${new Date().getFullYear()} <span>StackNexa</span>. All rights reserved.
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
