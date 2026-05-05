import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Section, Eyebrow } from "@/components/Section";
import { Mail, MapPin, Phone, Calendar, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book a Discovery Call | Dime Consultants" },
      { name: "description", content: "Book a discovery call with Dime Consultants. Visit us at Two Rivers Mall, Nairobi or chat with us on WhatsApp." },
      { property: "og:title", content: "Contact Dime Consultants" },
      { property: "og:description", content: "Book a discovery call or visit us at Two Rivers Mall, Nairobi." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageLayout>
      <Section>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="max-w-3xl text-5xl font-semibold md:text-6xl">Let's design what's next.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Book a 30-minute discovery call, drop us a message, or visit us at Two Rivers Mall in Nairobi.</p>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Calendly */}
          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="mb-4 flex items-center gap-3 text-cyan"><Calendar size={20}/><span className="text-sm uppercase tracking-widest">Discovery Call</span></div>
            <h2 className="text-2xl font-semibold">Schedule on Calendly</h2>
            <p className="mt-2 text-sm text-muted-foreground">Pick a time that works. We'll send a calendar invite with the call link.</p>
            <a
              href="https://calendly.com/dimeconsultants/discovery"
              target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 font-semibold text-primary-foreground glow"
            >
              Open Calendly
            </a>
            <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-3"><MapPin size={16} className="text-cyan"/>Two Rivers Mall, Nairobi, Kenya</div>
              <div className="flex items-center gap-3"><Mail size={16} className="text-cyan"/>hello@dimeconsultants.co.ke</div>
              <div className="flex items-center gap-3"><Phone size={16} className="text-cyan"/>+254 700 000 000</div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-3xl border border-border bg-card p-8"
          >
            <h2 className="text-2xl font-semibold">Send us a message</h2>
            <div className="mt-6 grid gap-4">
              <input required placeholder="Full name" className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-cyan" />
              <input required type="email" placeholder="Work email" className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-cyan" />
              <input placeholder="Organisation" className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-cyan" />
              <textarea required rows={5} placeholder="How can we help?" className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-cyan"/>
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan px-6 py-3 font-semibold text-primary-foreground glow">
                <Send size={16}/>{sent ? "Message sent" : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </Section>
    </PageLayout>
  );
}
