import { createAPIFileRoute } from "@tanstack/react-start/server";
import nodemailer from "nodemailer";

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

export const Route = createAPIFileRoute("/api/send-email").default(
  async (req: Request) => {
    try {
      if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
          status: 405,
          headers: { "Content-Type": "application/json" },
        });
      }

      const data: ContactFormData = await req.json();
      const { name, email, organisation, message } = data;

      // Validate required fields
      if (!name || !email || !message) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Get SMTP credentials from environment variables
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = parseInt(process.env.SMTP_PORT || "587");
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const recipientEmail = process.env.RECIPIENT_EMAIL || "hello@dimeconsultants.co.ke";

      if (!smtpHost || !smtpUser || !smtpPass) {
        console.error("SMTP configuration missing");
        return new Response(
          JSON.stringify({ error: "Email service not configured" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

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

      return new Response(
        JSON.stringify({
          success: true,
          message: "Email sent successfully",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Email error:", error);
      return new Response(
        JSON.stringify({
          error: error instanceof Error ? error.message : "Failed to send email",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
);
