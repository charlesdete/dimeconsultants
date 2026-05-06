import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Section, Eyebrow } from "@/components/Section";
import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
export const Route = createFileRoute("/scanner")({
    head: () => ({
        meta: [
            { title: "AI Readiness Scanner | Dime Consultants" },
            { name: "description", content: "Take our 2-minute AI Readiness Scanner and get an instant score plus tailored recommendations." },
            { property: "og:title", content: "AI Readiness Scanner — Dime Consultants" },
            { property: "og:description", content: "How AI-ready is your organisation? Find out in 2 minutes." },
        ],
    }),
    component: ScannerPage,
});
const QUESTIONS = [
    { q: "Does your organisation have a documented AI strategy?", o: ["No", "In progress", "Yes — published"] },
    { q: "What share of your team uses AI tools weekly?", o: ["<10%", "10–40%", "40%+"] },
    { q: "Do you have an AI governance or ethics policy?", o: ["No", "Drafting", "Approved & live"] },
    { q: "Are AI initiatives tied to measurable KPIs?", o: ["Rarely", "Sometimes", "Always"] },
    { q: "How mature is your data foundation for AI?", o: ["Fragmented", "Workable", "Strong"] },
    { q: "Do leaders sponsor AI transformation actively?", o: ["No", "Some", "Yes, top-down"] },
];
function ScannerPage() {
    const [answers, setAnswers] = useState([]);
    const [done, setDone] = useState(false);
    const step = answers.length;
    const score = answers.reduce((a, b) => a + b, 0);
    const max = QUESTIONS.length * 2;
    const pct = Math.round((score / max) * 100);
    const tier = pct >= 75 ? { name: "AI Accelerator", color: "text-cyan", note: "You're ahead of the curve. Time to scale agentic automations across the enterprise." } :
        pct >= 45 ? { name: "AI Builder", color: "text-cyan", note: "Strong foundations. A structured 90-day programme will compound your gains." } :
            { name: "AI Starter", color: "text-cyan", note: "Big upside ahead. Start with foundations, governance and a focused pilot." };
    const reset = () => { setAnswers([]); setDone(false); };
    return (<PageLayout>
      <Section>
        <Eyebrow>Interactive Tool</Eyebrow>
        <h1 className="max-w-3xl text-5xl font-semibold md:text-6xl">AI Readiness Scanner</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Answer 6 quick questions. Get an instant readiness tier and recommended next steps.</p>

        <div className="mt-12 rounded-3xl border border-border bg-card p-8">
          {!done ? (<>
              <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
                <span>Question {Math.min(step + 1, QUESTIONS.length)} of {QUESTIONS.length}</span>
                <span>{Math.round((step / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-cyan transition-all" style={{ width: `${(step / QUESTIONS.length) * 100}%` }}/>
              </div>
              <h3 className="text-xl font-semibold md:text-2xl">{QUESTIONS[step].q}</h3>
              <div className="mt-6 grid gap-3">
                {QUESTIONS[step].o.map((o, i) => (<button key={o} onClick={() => {
                    const next = [...answers, i];
                    setAnswers(next);
                    if (next.length === QUESTIONS.length)
                        setDone(true);
                }} className="group flex items-center justify-between rounded-xl border border-border bg-background p-4 text-left transition hover:border-cyan hover:bg-cyan/5">
                    <span>{o}</span>
                    <ArrowRight size={16} className="text-muted-foreground transition group-hover:translate-x-1 group-hover:text-cyan"/>
                  </button>))}
              </div>
            </>) : (<div className="text-center">
              <div className="text-sm uppercase tracking-widest text-muted-foreground">Your readiness tier</div>
              <div className={`mt-2 text-5xl font-semibold ${tier.color}`}>{tier.name}</div>
              <div className="mt-1 text-2xl font-semibold">{pct}/100</div>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{tier.note}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 font-semibold text-primary-foreground glow">Discuss your results <ArrowRight size={16}/></a>
                <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:border-cyan hover:text-cyan"><RotateCcw size={14}/> Retake</button>
              </div>
            </div>)}
        </div>
      </Section>
    </PageLayout>);
}
