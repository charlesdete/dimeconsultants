import { createServerFn } from "@tanstack/react-start";

// Dynamic import to ensure nodemailer only loads on server
const getNodemailer = async () => {
  if (typeof window !== "undefined") {
    throw new Error("This function can only be called on the server");
  }
  return await import("nodemailer");
};

interface ContactFormData {
  name: string;
  email: string;
  organisation: string;
  message: string;
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export const sendContactEmail = createServerFn(
  { method: "POST" },
  async (data: ContactFormData) => {
    try {
      const { name, email, organisation, message } = data;

      // Validate required fields
      if (!name || !email || !message) {
        throw new Error("Missing required fields");
      }

      // Get SMTP credentials from environment variables
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = parseInt(process.env.SMTP_PORT || "587");
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const recipientEmail = process.env.RECIPIENT_EMAIL || "hello@dimeconsultants.co.ke";

      if (!smtpHost || !smtpUser || !smtpPass) {
        console.error("SMTP configuration missing");
        throw new Error("Email service not configured");
      }

      // Dynamically import nodemailer only on server
      const nodemailer = await getNodemailer();

      // Create transporter
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Email to Dime Consultants
      const mailOptions = {
        from: smtpUser,
        to: recipientEmail,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Organisation:</strong> ${escapeHtml(organisation || "N/A")}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      return { success: true, message: "Email sent successfully" };
    } catch (error) {
      console.error("Email error:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to send email");
    }
  },
);
