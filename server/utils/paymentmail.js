const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
const sendPaymentSuccessEmail = async ({
  email,
  name,
  amount,
  paymentId,
  orderId,
  plan,
}) => {
  try {
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: "pawanjalandhara2001@gmail.com",
        name: "StackNexa",
      },
      to: [{ email }],
      subject: "✅ Payment Successful | StackNexa",
      htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Payment Successful</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: system-ui, -apple-system, BlinkMacSystemFont;
    }
    .container {
      max-width: 520px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }
    .header {
      background: linear-gradient(135deg, #16a34a, #22c55e);
      padding: 26px;
      text-align: center;
      color: #ffffff;
      font-size: 28px;
      font-weight: 800;
    }
    .content {
      padding: 32px;
      color: #0f172a;
    }
    .content h2 {
      margin-top: 0;
      font-size: 20px;
    }
    .details {
      background: #f8fafc;
      border-radius: 10px;
      padding: 18px;
      margin: 20px 0;
      font-size: 14px;
      line-height: 1.7;
    }
    .details b {
      color: #020617;
    }
    .success {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      color: #16a34a;
      margin: 20px 0;
    }
    .footer {
      background: #f8fafc;
      padding: 18px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
    }
    .footer span {
      color: #16a34a;
      font-weight: 600;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      StackNexa
    </div>

    <div class="content">
      <h2>Hello ${name || "User"},</h2>

      <p>
        🎉 Thank you for your payment! Your transaction was completed successfully.
      </p>

      <div class="success">✔ Payment Confirmed</div>

      <div class="details">
        <p><b>Plan:</b> ${plan}</p>
        <p><b>Amount Paid:</b> ₹${amount}</p>
        <p><b>Payment ID:</b> ${paymentId}</p>
        <p><b>Order ID:</b> ${orderId}</p>
        <p><b>Status:</b> Success</p>
      </div>

      <p>
        You now have access to all <b>${plan}</b> features.
        If you have any questions, feel free to contact us.
      </p>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} <span>StackNexa</span>. All rights reserved.
    </div>
  </div>
</body>
</html>
      `,
    });

    console.log("✅ Payment success email sent");
  } catch (err) {
    console.error("❌ Payment email failed:", err.message);
    throw err;
  }
};

module.exports = sendPaymentSuccessEmail;
