import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Section, Eyebrow } from "@/components/Section";
import { Download, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights & Resources | Dime Consultants" },
      { name: "description", content: "Articles, playbooks and downloadable resources on AI adoption, governance and the future of work." },
      { property: "og:title", content: "Insights — Dime Consultants" },
      { property: "og:description", content: "AI adoption, governance and workforce transformation insights." },
    ],
  }),
  component: InsightsPage,
});

const posts = [
  { t: "Five signs your team is AI-ready (and three signs it isn't)", d: "A practical readiness checklist before you spin up a programme.", tag: "Readiness" },
  { t: "From training to ROI in 90 days: a playbook", d: "How we structure cohort programmes around measurable business outcomes.", tag: "Playbook" },
  { t: "Governance without bureaucracy", d: "Designing AI oversight that scales with adoption rather than slowing it.", tag: "Governance" },
  { t: "Agents that actually do work", d: "The architectural choices that separate prototypes from production agents.", tag: "Automation" },
  { t: "AI in East African enterprise", d: "Notes from the field on how regional firms are adopting modern AI.", tag: "Region" },
  { t: "Leading AI transformation", d: "An executive's field guide to building AI capability inside your organisation.", tag: "Leadership" },
];

function InsightsPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <PageLayout>
      <Section>
        <Eyebrow>Insights</Eyebrow>
        <h1 className="max-w-3xl text-5xl font-semibold md:text-6xl">Field notes from the AI frontier.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Articles, playbooks and downloads from our work with teams around the world.</p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.t} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-cyan/50">
              <span className="text-xs uppercase tracking-widest text-cyan">{p.tag}</span>
              <h3 className="mt-3 text-lg font-semibold">{p.t}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.d}</p>
              <Link to="/insights" className="mt-4 inline-flex items-center gap-1 text-sm text-cyan">Read <ArrowRight size={14}/></Link>
            </article>
          ))}
        </div>
      </Section>

      <section className="border-y border-border bg-[var(--deep)]">
        <Section className="!py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Eyebrow>Free download</Eyebrow>
              <h2 className="text-3xl font-semibold md:text-4xl">The AI-Ready Workforce Field Guide</h2>
              <p className="mt-3 text-muted-foreground">A 24-page playbook on building AI capability inside any organisation. Get the PDF in your inbox.</p>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); setDone(true); }}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 sm:flex-row"
            >
              <input
                required type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-cyan"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan px-5 py-3 text-sm font-semibold text-primary-foreground">
                <Download size={16}/> {done ? "Sent!" : "Get the guide"}
              </button>
            </form>
          </div>
        </Section>
      </section>
    </PageLayout>
  );
}
