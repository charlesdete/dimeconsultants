import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Section, Eyebrow } from "@/components/Section";
import { Mail, MapPin, Phone, Calendar, Send } from "lucide-react";
import { useState } from "react";
import { sendContactEmail } from "./api.send-email";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book a Discovery Call | Dime Consultants" },
      {
        name: "description",
        content:
          "Book a discovery call with Dime Consultants. Visit us at Two Rivers Mall, Nairobi or chat with us on WhatsApp.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await sendContactEmail(formData);
      setSent(true);
      setFormData({ name: "", email: "", organisation: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <Section>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="page-title">Let's design what's next.</h1>
        <p className="page-copy">
          Book a 30-minute discovery call, drop us a message, or visit us at Two Rivers Mall in
          Nairobi.
        </p>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="discovery-label">
              <Calendar size={20} />
              <span>Discovery Call</span>
            </div>
            <h2>Schedule on Calendly</h2>
            <p>Pick a time that works. We'll send a calendar invite with the call link.</p>
            <a
              href="https://calendly.com/dimeconsultants/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              Open Calendly
            </a>
            <div className="contact-details">
              <div className="contact-detail">
                <MapPin size={16} className="cyan-icon" />
                Two Rivers Mall, Nairobi, Kenya
              </div>
              <div className="contact-detail">
                <Mail size={16} className="cyan-icon" />
                hello@dimeconsultants.co.ke
              </div>
              <div className="contact-detail">
                <Phone size={16} className="cyan-icon" />
                +254 700 000 000
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="contact-form">
            <h2>Send us a message</h2>
            <div className="contact-form-fields">
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                className="form-control"
              />
              <input
                required
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Work email"
                className="form-control"
              />
              <input
                name="organisation"
                value={formData.organisation}
                onChange={handleChange}
                placeholder="Organisation"
                className="form-control"
              />
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="How can we help?"
                className="form-control"
              />
              {error && <div style={{ color: "#ef4444", fontSize: "14px" }}>{error}</div>}
              {sent && (
                <div style={{ color: "#10b981", fontSize: "14px" }}>Message sent successfully!</div>
              )}
              <button disabled={loading} className="button-primary">
                <Send size={16} />
                {loading ? "Sending..." : sent ? "Message sent" : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </Section>
    </PageLayout>
  );
}
