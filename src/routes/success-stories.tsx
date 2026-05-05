import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Section, Eyebrow } from "@/components/Section";
import { Quote, Star } from "lucide-react";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories & Testimonials | Dime Consultants" },
      { name: "description", content: "How global and regional teams — including Kuehne+Nagel finance and Habib Bank executives — have built AI capability with Dime Consultants." },
      { property: "og:title", content: "Success Stories — Dime Consultants" },
      { property: "og:description", content: "Customised AI training outcomes across global and regional clients." },
    ],
  }),
  component: StoriesPage,
});

const stories = [
  {
    org: "Kuehne+Nagel — Finance Team",
    summary: "Customised AI fluency programme for the finance function — focused on automating reconciliation, reporting and analyst workflows.",
    quote: "The team came in deeply tailored to our finance reality. Our analysts now ship in hours what used to take days.",
  },
  {
    org: "Habib Bank AG Zurich — Banking Executives",
    summary: "Executive AI strategy lab covering opportunity mapping, risk and governance for senior banking leadership.",
    quote: "A genuinely strategic engagement. We left with a roadmap, not a presentation.",
  },
  {
    org: "Regional Logistics Group",
    summary: "End-to-end BPR with embedded AI — exception triage agents reduced ops backlog by over 40%.",
    quote: "We expected training. We got a transformation.",
  },
];

function StoriesPage() {
  return (
    <PageLayout>
      <Section>
        <Eyebrow>Success Stories</Eyebrow>
        <h1 className="max-w-3xl text-5xl font-semibold md:text-6xl">Outcomes our clients can point to.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Selected engagements across industries — every programme custom-built for the team in the room.</p>

        <div className="mt-14 space-y-6">
          {stories.map((s) => (
            <div key={s.org} className="grid gap-6 rounded-2xl border border-border bg-card p-8 md:grid-cols-3">
              <div>
                <div className="flex gap-1 text-cyan">{Array.from({length:5}).map((_,i)=><Star key={i} size={16} fill="currentColor"/>)}</div>
                <h3 className="mt-3 text-xl font-semibold">{s.org}</h3>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground">{s.summary}</p>
                <div className="mt-4 flex gap-3 rounded-xl border-l-2 border-cyan bg-[var(--deep)] p-4">
                  <Quote size={18} className="shrink-0 text-cyan"/>
                  <p className="text-sm italic">"{s.quote}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
