const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * ✅ SINGLE TRANSPORTER
 * Works on:
 * - localhost
 * - Render / production
 */
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false, // Brevo uses TLS on 587
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

/**
 * 📩 Send OTP Email
 */
const sendOtpMail = async (email, name, otp, otpExpiry) => {
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
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "🔐 StackNexa  Verification OTP",
      html: `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
        <div style="max-width:520px; margin:auto; background:#ffffff; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.08); overflow:hidden;">
          
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#6366f1,#4f46e5); padding:24px; text-align:center;">
            <h1 style="margin:0; letter-spacing:2px; font-size:32px;">
              <span style="color:#facc15;">Stack</span><span style="color:#ffffff;">Nexa</span>
            </h1>
            <p style="margin:6px 0 0; color:#e0e7ff; font-size:14px;">
              Secure Authentication Service
            </p>
          </div>

          <!-- Body -->
          <div style="padding:24px; color:#111827;">
            <p style="font-size:16px;">Hello <strong>${name}</strong>,</p>

            <p style="font-size:14px; color:#374151;">
              Use the OTP below to securely log in to your StackNexa account.
            </p>

            <div style="margin:24px 0; text-align:center;">
              <div style="display:inline-block; padding:14px 28px; font-size:28px; letter-spacing:6px; font-weight:bold; background:#f1f5f9; border-radius:10px; color:#4f46e5;">
                ${otp}
              </div>
            </div>

            <p style="font-size:14px; color:#374151;">
              ⏳ <strong>Valid for:</strong> 10 minutes <br/>
              ⌛ <strong>Expires at:</strong> ${expiryTime}
            </p>

            <p style="font-size:13px; color:#6b7280; margin-top:20px;">
              📅 Requested on: ${requestTime}
            </p>

            <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;" />

            <p style="font-size:13px; color:#6b7280;">
              If you didn’t request this OTP, please ignore this email or contact StackNexa support.
            </p>
          </div>

          <!-- Footer -->
          <div style="background:#f9fafb; padding:16px; text-align:center; font-size:12px; color:#9ca3af;">
            © ${new Date().getFullYear()} StackNexa. All rights reserved.
          </div>

        </div>
      </div>
      `,
    });

    console.log("✅ OTP email sent to:", email);
  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendOtpMail;
