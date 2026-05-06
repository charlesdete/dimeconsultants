import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Cog, Shield, Sparkles, TrendingUp, Users, Zap, CheckCircle2 } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { NeuralBackground } from "@/components/NeuralBackground";
import { Section, Eyebrow } from "@/components/Section";
export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: "Dime Consultants — Driving Global Efficiency with AI" },
            { name: "description", content: "Nairobi-based AI & Business Process Reengineering consultancy. Forge your AI-ready workforce with measurable ROI across all industries." },
            { property: "og:title", content: "Dime Consultants — Driving Global Efficiency with AI" },
            { property: "og:description", content: "AI workforce training and BPR consulting from Nairobi to the world." },
            { property: "og:type", content: "website" },
        ],
    }),
    component: HomePage,
});
const stats = [
    { v: "500+", l: "Professionals trained" },
    { v: "40+", l: "Organisations served" },
    { v: "90 days", l: "From training to ROI" },
    { v: "12", l: "Industries covered" },
];
const services = [
    { icon: Brain, t: "AI Workforce Training", d: "Custom-built curricula that turn teams into confident operators of modern AI tools." },
    { icon: Cog, t: "Business Process Reengineering", d: "Redesign workflows around intelligent automation for compounding efficiency." },
    { icon: Shield, t: "AI Governance & Compliance", d: "Frameworks aligned with global standards and East African regulatory context." },
    { icon: TrendingUp, t: "AI Strategy for Leaders", d: "Executive enablement to set vision, measure ROI and lead transformation." },
];
function HomePage() {
    return (<PageLayout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 grid-bg opacity-40"/>
        <NeuralBackground />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-28 pt-24 text-center md:pt-32">
          <Eyebrow>Driving global efficiency with AI</Eyebrow>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-balance text-5xl font-semibold leading-[1.05] md:text-7xl">
            Forge Your <span className="gradient-text">AI-Ready</span><br /> Workforce
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }} className="mt-6 max-w-2xl text-lg text-muted-foreground">
            We help organisations across every industry deploy AI confidently — through hands-on training,
            process reengineering and measurable outcomes.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-cyan px-7 py-3.5 font-semibold text-primary-foreground shadow-[0_0_30px_oklch(0.78_0.16_210/0.5)] transition hover:opacity-90">
              Book a Discovery Call <ArrowRight className="transition group-hover:translate-x-0.5" size={18}/>
            </Link>
            <Link to="/scanner" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-semibold text-foreground transition hover:border-cyan hover:text-cyan">
              Take the AI Readiness Scan
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="mt-20 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {stats.map((s) => (<div key={s.l} className="bg-card p-6 text-left">
                <div className="text-3xl font-semibold gradient-text md:text-4xl">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section>
        <div className="mb-14 max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="text-4xl font-semibold md:text-5xl">An intelligent operating layer for your business.</h2>
          <p className="mt-4 text-muted-foreground">Industry-agnostic. Outcome-obsessed. Built for the East African and global enterprise.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (<motion.div key={s.t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-cyan/50">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
                <s.icon size={20}/>
              </div>
              <h3 className="text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan/10 opacity-0 blur-2xl transition group-hover:opacity-100"/>
            </motion.div>))}
        </div>
      </Section>

      {/* PROGRAMME PROMO */}
      <section className="border-y border-border bg-[var(--deep)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>Flagship Programme</Eyebrow>
            <h2 className="text-4xl font-semibold md:text-5xl">The AI-Ready Workforce Programme</h2>
            <p className="mt-4 text-muted-foreground">A 90-day journey across five modules — from foundational fluency to enterprise-grade automation. Customised to your sector, your tools and your KPIs.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["AI Foundations", "Agents & Automation", "Practical Tool Mastery", "Ethics & Compliance", "AI Strategy for Leaders"].map(m => (<li key={m} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-cyan"/>{m}</li>))}
            </ul>
            <Link to="/programme" className="mt-8 inline-flex items-center gap-2 text-cyan hover:underline">Explore the programme <ArrowRight size={16}/></Link>
          </div>
          <div className="relative">
            <div className="glass relative rounded-3xl p-8">
              <Sparkles className="mb-4 text-cyan"/>
              <div className="space-y-4">
                {[
            { i: Users, t: "Cohort + 1:1 mentorship" },
            { i: Zap, t: "Hands-on labs with real workflows" },
            { i: Shield, t: "Governance baked in from day one" },
        ].map((x) => (<div key={x.t} className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-4">
                    <x.i size={18} className="text-cyan"/>
                    <span className="text-sm">{x.t}</span>
                  </div>))}
              </div>
            </div>
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-cyan/10 blur-3xl"/>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <Section>
        <div className="mb-10 text-center">
          <Eyebrow>Trusted across industries</Eyebrow>
          <h2 className="text-3xl font-semibold md:text-4xl">From global logistics to financial services and beyond</h2>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 md:grid-cols-6">
          {["Kuehne+Nagel", "Habib Bank", "Sigma Tech", "Equator Health", "Nyumbani Group", "Savannah Logistics"].map(n => (<div key={n} className="flex h-24 items-center justify-center bg-card px-4 text-center text-sm text-muted-foreground">{n}</div>))}
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 grid-bg opacity-30"/>
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-4xl font-semibold md:text-5xl">Ready to operationalise AI?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Book a 30-minute discovery call. We'll map your readiness, surface quick wins and design a custom roadmap.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan px-7 py-3.5 font-semibold text-primary-foreground glow">
            Schedule on Calendly <ArrowRight size={18}/>
          </Link>
        </div>
      </section>
    </PageLayout>);
}
