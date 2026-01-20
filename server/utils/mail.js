const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * ✅ Gmail Transporter (Production Safe)
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASS,
  },
});

/**
 * 🔎 Verify transporter once
 */
transporter.verify((err) => {
  if (err) {
    console.error("❌ Gmail SMTP verification failed:", err.message);
  } else {
    console.log("✅ Gmail SMTP ready");
  }
});

/**
 * 📩 Send OTP Email
 */
const sendOtpMail = async (email, name, otp, otpExpiry) => {
  if (!process.env.GOOGLE_USER || !process.env.GOOGLE_PASS) {
    throw new Error("Gmail credentials missing in environment variables");
  }

  const requestTime = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const expiryTime = new Date(otpExpiry).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"StackNexa" <${process.env.GOOGLE_USER}>`,
      to: email,
      subject: "🔐 StackNexa OTP Verification",
      html: `
     <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;
box-shadow:0 18px 40px rgba(15,23,42,0.25);font-family:Inter,Arial,sans-serif;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#0f172a,#1e3a8a);padding:28px;text-align:center;">
    <h1 style="margin:0;font-size:32px;letter-spacing:1px;color:#ffffff;">
      Stack<span style="color:#60a5fa;">Nexa</span>
    </h1>
    <p style="margin-top:6px;font-size:13px;color:#dbeafe;">
      Secure Account Verification
    </p>
  </div>

  <!-- Body -->
  <div style="padding:30px;color:#0f172a;">
    <p style="font-size:16px;margin-bottom:8px;">
      Hello <strong>${name}</strong>,
    </p>

    <p style="font-size:14px;color:#334155;line-height:1.6;">
      Use the One-Time Password (OTP) below to verify your StackNexa account.
    </p>

    <!-- OTP Box -->
    <div style="margin:30px 0;text-align:center;">
      <div style="
        display:inline-block;
        padding:16px 42px;
        font-size:32px;
        font-weight:700;
        letter-spacing:8px;
        background:#f8fafc;
        border:2px solid #1e3a8a;
        border-radius:14px;
        color:#0f172a;
      ">
        ${otp}
      </div>
    </div>

    <div style="font-size:14px;color:#334155;line-height:1.6;">
      ⏳ <strong>Valid for:</strong> 10 minutes<br/>
      ⌛ <strong>Expires at:</strong> ${expiryTime}
    </div>

    <p style="font-size:12px;color:#64748b;margin-top:22px;">
      Requested on ${requestTime}
    </p>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:26px 0;" />

    <p style="font-size:12px;color:#64748b;">
      If you didn’t request this OTP, you can safely ignore this email.
    </p>
  </div>

  <!-- Footer -->
  <div style="background:#f1f5f9;padding:16px;text-align:center;
  font-size:11px;color:#64748b;">
    © ${new Date().getFullYear()} StackNexa · All rights reserved
  </div>

</div>

      `,
    });

    console.log("✅ OTP email sent (Premium Dark UI):", email);
  } catch (error) {
    console.error("❌ OTP email failed:", error.message);
    throw new Error("OTP email delivery failed");
  }
};

module.exports = sendOtpMail;
