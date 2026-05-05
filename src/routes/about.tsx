import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Section, Eyebrow } from "@/components/Section";
import { Target, Compass, Globe2, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dime Consultants" },
      { name: "description", content: "Dime Consultants is an AI and Business Process Reengineering firm based at Two Rivers Mall, Nairobi. We serve clients across all industries." },
      { property: "og:title", content: "About Dime Consultants" },
      { property: "og:description", content: "AI & BPR consulting from Nairobi, Kenya — serving clients across every industry." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageLayout>
      <Section>
        <Eyebrow>About us</Eyebrow>
        <h1 className="max-w-3xl text-5xl font-semibold md:text-6xl">We help organisations turn intelligence into outcomes.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Dime Consultants Limited is an AI and Business Process Reengineering consultancy headquartered at Two Rivers Mall, Nairobi.
          We work with leaders across every sector — financial services, logistics, healthcare, manufacturing, public sector and more —
          to design, train and deploy AI capability that produces measurable ROI.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { i: Target, t: "Mission", d: "Make modern AI practical, ethical and ROI-positive for every workforce we touch." },
            { i: Compass, t: "Vision", d: "An East Africa where every organisation operates with intelligent systems by default." },
            { i: HeartHandshake, t: "Values", d: "Craft, candour, compounding outcomes — and respect for the contexts we operate in." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-border bg-card p-6">
              <x.i className="mb-4 text-cyan" />
              <h3 className="text-xl font-semibold">{x.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="border-y border-border bg-[var(--deep)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <Globe2 className="mb-4 text-cyan" />
            <h2 className="text-3xl font-semibold md:text-4xl">Rooted in Nairobi. Built for the world.</h2>
            <p className="mt-4 text-muted-foreground">
              Our work spans East Africa and beyond — from global multinationals refining their finance operations,
              to regional banks navigating digital transformation, to mission-driven organisations using AI to scale impact.
              Every engagement is tailored. None is templated.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["12+","Industries served"],
              ["3","Continents reached"],
              ["500+","Practitioners trained"],
              ["90 days","Average ROI horizon"],
            ].map(([v,l]) => (
              <div key={l} className="rounded-2xl border border-border bg-card p-6">
                <div className="text-3xl font-semibold gradient-text">{v}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section className="text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">Let's design your transformation.</h2>
        <Link to="/contact" className="mt-8 inline-flex rounded-full bg-cyan px-7 py-3.5 font-semibold text-primary-foreground glow">Talk to us</Link>
      </Section>
    </PageLayout>
  );
}
