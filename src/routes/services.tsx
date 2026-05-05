import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Section, Eyebrow } from "@/components/Section";
import { Brain, Cog, Shield, TrendingUp, Workflow, GraduationCap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AI Training & Business Process Reengineering | Dime" },
      { name: "description", content: "AI workforce training, business process reengineering, governance and executive AI strategy — customised across every industry." },
      { property: "og:title", content: "Services — Dime Consultants" },
      { property: "og:description", content: "AI training, BPR, governance and executive AI strategy." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Brain, t: "AI Workforce Training", d: "Custom curricula that move teams from curiosity to confident daily use of modern AI." },
  { icon: Cog, t: "Business Process Reengineering", d: "Redesign workflows end-to-end with intelligent automation woven into the fabric." },
  { icon: Workflow, t: "Agentic Automation Builds", d: "We design and ship AI agents that take real work off your team's desk." },
  { icon: Shield, t: "AI Governance & Compliance", d: "Policy, risk and oversight frameworks that scale with your AI footprint." },
  { icon: TrendingUp, t: "AI Strategy for Leaders", d: "Executive labs to set vision, prioritise investment and measure ROI." },
  { icon: GraduationCap, t: "Continuous Learning (LMS)", d: "Always-on access to our LMS with refreshers, new modules and a peer community." },
];

function ServicesPage() {
  return (
    <PageLayout>
      <Section>
        <Eyebrow>Services</Eyebrow>
        <h1 className="max-w-3xl text-5xl font-semibold md:text-6xl">Practical AI capability — across every function and industry.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Every engagement is customised. Whether you operate in finance, logistics, healthcare, manufacturing,
          government or the creative economy — we tailor curricula, automations and governance to your context.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.t} className="group rounded-2xl border border-border bg-card p-6 transition hover:border-cyan/50">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
                <s.icon size={20}/>
              </div>
              <h3 className="text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-[var(--deep)] p-10 text-center">
          <h2 className="text-3xl font-semibold">Looking for a structured programme?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Our flagship AI-Ready Workforce Programme bundles our core training tracks with mentorship and certification.</p>
          <Link to="/programme" className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 font-semibold text-primary-foreground glow">Explore Programme <ArrowRight size={16}/></Link>
        </div>
      </Section>
    </PageLayout>
  );
}
