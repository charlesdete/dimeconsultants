import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Section, Eyebrow } from "@/components/Section";
import { Banknote, Truck, HeartPulse, Factory, Landmark, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    meta: [
      { title: "AI Use Cases | Dime Consultants" },
      { name: "description", content: "Real-world AI use cases across financial services, logistics, healthcare, manufacturing, public sector and retail." },
      { property: "og:title", content: "AI Use Cases — Dime Consultants" },
      { property: "og:description", content: "Industry-spanning AI applications and outcomes." },
    ],
  }),
  component: UseCasesPage,
});

const cases = [
  { icon: Banknote, t: "Financial Services", d: "Automated KYC review, intelligent document processing and risk-scoring copilots that compress cycle time." },
  { icon: Truck, t: "Logistics & Supply Chain", d: "Demand forecasting, exception triage and shipment intelligence agents that reduce dwell time." },
  { icon: HeartPulse, t: "Healthcare", d: "Clinical documentation assistants, patient triage flows and admin automation that gives clinicians time back." },
  { icon: Factory, t: "Manufacturing", d: "Predictive maintenance, quality vision systems and shift-handover summarisation." },
  { icon: Landmark, t: "Public Sector & NGOs", d: "Citizen service copilots, grant-reporting automation and multilingual outreach at scale." },
  { icon: ShoppingBag, t: "Retail & Consumer", d: "Personalised merchandising, AI customer support and creative ops acceleration." },
];

function UseCasesPage() {
  return (
    <PageLayout>
      <Section>
        <Eyebrow>Use Cases</Eyebrow>
        <h1 className="max-w-3xl text-5xl font-semibold md:text-6xl">AI is industry-agnostic. The value is in the fit.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">A snapshot of where we have helped organisations apply AI to drive measurable outcomes.</p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-6 transition hover:border-cyan/50">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-cyan/10 text-cyan"><c.icon size={20}/></div>
              <h3 className="text-lg font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
