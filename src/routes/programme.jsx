import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Section, Eyebrow } from "@/components/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles, Bot, Wrench, ScrollText, Crown, CheckCircle2 } from "lucide-react";
export const Route = createFileRoute("/programme")({
    head: () => ({
        meta: [
            { title: "AI-Ready Workforce Programme | Dime Consultants" },
            { name: "description", content: "Our flagship 90-day AI-Ready Workforce Programme: foundations, agents & automation, tool mastery, ethics & compliance, and leadership strategy." },
            { property: "og:title", content: "AI-Ready Workforce Programme" },
            { property: "og:description", content: "90 days, five modules, measurable AI ROI." },
        ],
    }),
    component: ProgrammePage,
});
const modules = [
    { icon: Sparkles, t: "AI Foundations", d: "Demystify modern AI. Build shared vocabulary, intuition and confidence across your team." },
    { icon: Bot, t: "Agents & Automation", d: "Design and deploy AI agents that automate real workflows — from inbox triage to reporting." },
    { icon: Wrench, t: "Practical Tool Mastery", d: "Hands-on with the tools your team will use daily — prompting, copilots, vertical apps." },
    { icon: ScrollText, t: "Ethics & Compliance", d: "Responsible AI by design. Policy, oversight and risk for your regulatory context." },
    { icon: Crown, t: "AI Strategy for Leaders", d: "Executive lab on vision, investment, KPIs and change management." },
];
const faqs = [
    { q: "How long does your engagement last?", a: "From the first day of the training session, our flagship engagement runs for up to 90 days. It includes multiple training sessions, ongoing access to our LMS, one-on-one support and mentorship. A Certificate of Completion is also available." },
    { q: "Which industries do you serve?", a: "All of them. We have delivered customised programmes across financial services, logistics, healthcare, manufacturing, public sector, professional services and more. Curricula are tailored to your sector, tools and KPIs." },
    { q: "Is the training delivered in-person or online?", a: "Both. We deliver in-person at your premises or our Two Rivers location, and run hybrid and fully virtual cohorts depending on your team's geography." },
    { q: "Do you customise content?", a: "Always. Every engagement starts with a discovery and readiness assessment. We then build the curriculum around your industry, processes and tooling." },
    { q: "What kind of ROI should we expect?", a: "We design every engagement around measurable outcomes — time saved, cycle-time reduction, quality improvements and revenue lift. We baseline at the start and report through the 90 days." },
];
function ProgrammePage() {
    return (<PageLayout>
      <Section>
        <Eyebrow>Flagship Programme</Eyebrow>
        <h1 className="max-w-3xl text-5xl font-semibold md:text-6xl">The AI-Ready Workforce Programme</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A 90-day, end-to-end transformation across five modules. Built for cohorts of 10–200 professionals.
          Customised to your industry, your stack and your business outcomes.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => (<div key={m.t} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-cyan/10 text-cyan"><m.icon size={20}/></div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Module 0{i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold">{m.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.d}</p>
            </div>))}
        </div>
      </Section>

      <section className="border-y border-border bg-[var(--deep)]">
        <Section>
          <Eyebrow>What's included</Eyebrow>
          <h2 className="text-4xl font-semibold">Everything to make AI stick.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
            "Up to 90 days of structured engagement from day one of training",
            "Multiple live training sessions tailored to your sector",
            "Ongoing access to our Learning Management System (LMS)",
            "One-on-one support and mentorship throughout",
            "Hands-on labs with your real workflows and tools",
            "Certificate of Completion for every learner",
            "Executive briefings and KPI dashboards",
            "Governance, ethics and compliance playbook",
        ].map(t => (<div key={t} className="flex items-start gap-3 rounded-xl border border-border bg-card/60 p-4">
                <CheckCircle2 size={18} className="mt-0.5 text-cyan"/><span className="text-sm">{t}</span>
              </div>))}
          </div>
        </Section>
      </section>

      <Section>
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-4xl font-semibold">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-8 max-w-3xl">
          {faqs.map((f, i) => (<AccordionItem key={i} value={`f${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>))}
        </Accordion>
        <div className="mt-12">
          <Link to="/contact" className="inline-flex rounded-full bg-cyan px-7 py-3.5 font-semibold text-primary-foreground glow">Enrol your team</Link>
        </div>
      </Section>
    </PageLayout>);
}
