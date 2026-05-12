import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Brain,
  Cog,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { NeuralBackground } from "@/components/NeuralBackground";
import { Section, Eyebrow } from "@/components/Section";
import habibBank from "@/assets/logos/habibibank.jpeg";
import logoMyCredit from "@/assets/logos/mycredit.jpg";
import kuehnelnagel from "@/assets/logos/kuehnelnagel.png";
import dimecredit from "@/assets/logos/dimecredit.png";

const partners = [
  { name: "MyCredit", src: logoMyCredit },
  { name: "Habibi Bank", src: habibBank },
  { name: "Kuehnel Nagel", src: kuehnelnagel },
  { name: "Dime Credit", src: dimecredit },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dime Consultants — Driving Global Efficiency with AI" },
      {
        name: "description",
        content:
          "Nairobi-based AI & Business Process Reengineering consultancy. Forge your AI-ready workforce with measurable ROI across all industries.",
      },
      { property: "og:title", content: "Dime Consultants — Driving Global Efficiency with AI" },
      {
        property: "og:description",
        content: "AI workforce training and BPR consulting from Nairobi to the world.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const stats = [
  { v: "3000+", l: "Professionals trained" },
  { v: "40+", l: "Organisations served" },
  { v: "90 days", l: "From training to ROI" },
  { v: "12", l: "Industries covered" },
];
const services = [
  {
    icon: Brain,
    t: "AI Workforce Training",
    d: "Custom-built curricula that turn teams into confident operators of modern AI tools.",
  },
  {
    icon: Cog,
    t: "Business Process Reengineering",
    d: "Redesign workflows around intelligent automation for compounding efficiency.",
  },
  {
    icon: Shield,
    t: "AI Governance & Compliance",
    d: "Frameworks aligned with global standards and East African regulatory context.",
  },
  {
    icon: TrendingUp,
    t: "AI Strategy for Leaders",
    d: "Executive enablement to set vision, measure ROI and lead transformation.",
  },
];

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const logosPerView = 4;
  const totalSlides = Math.ceil(partners.length / logosPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const visiblePartners = partners.slice(
    currentIndex * logosPerView,
    currentIndex * logosPerView + logosPerView,
  );

  return (
    <PageLayout>
      <section className="home-hero">
        <div className="home-hero-grid grid-bg" />
        <NeuralBackground />
        <div className="home-hero-content">
          <Eyebrow>Driving global efficiency with AI</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="home-title"
          >
            Driving Global <span className="gradient-text">Efficiency</span>
            <br /> with AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="home-subtitle"
          >
            We help organisations across every industry deploy AI confidently — through hands-on
            training, process reengineering and measurable outcomes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="home-actions"
          >
            <Link to="/contact" className="button-primary">
              Book a Discovery Call <ArrowRight size={18} />
            </Link>
            <Link to="/scanner" className="button-secondary">
              Take the AI Readiness Scan
            </Link>
          </motion.div>
          <div className="home-stats">
            {stats.map((s) => (
              <div key={s.l} className="stat-card">
                <div className="stat-value gradient-text">{s.v}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Section>
        <div className="home-section-heading">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="section-title">An intelligent operating layer for your business.</h2>
          <p className="section-copy">
            Industry-agnostic. Outcome-obsessed. Built for the East African and global enterprise.
          </p>
        </div>
        <div className="responsive-grid four">
          {services.map((s) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card home-service-card"
            >
              <div className="icon-box">
                <s.icon size={20} />
              </div>
              <h3 className="home-card-title">{s.t}</h3>
              <p className="home-card-copy">{s.d}</p>
              <div className="home-service-glow" />
            </motion.div>
          ))}
        </div>
      </Section>
      <section className="split-band">
        <div className="band-grid two">
          <div>
            <Eyebrow>Flagship Programme</Eyebrow>
            <h2 className="section-title">The AI-Ready Workforce Programme</h2>
            <p className="section-copy">
              A 90-day journey across five modules — from foundational fluency to enterprise-grade
              automation. Customised to your sector, your tools and your KPIs.
            </p>
            <ul className="programme-list">
              {[
                "AI Foundations",
                "Agents & Automation",
                "Practical Tool Mastery",
                "Ethics & Compliance",
                "AI Strategy for Leaders",
              ].map((m) => (
                <li key={m}>
                  <CheckCircle2 size={18} className="cyan-icon" />
                  {m}
                </li>
              ))}
            </ul>
            <Link to="/programme" className="text-link programme-link">
              Explore the programme <ArrowRight size={16} />
            </Link>
          </div>
          <div className="programme-panel-wrap">
            <div className="programme-panel glass">
              <Sparkles className="cyan-icon" />
              <div className="programme-panel-list">
                {[
                  { i: Users, t: "Cohort + 1:1 mentorship" },
                  { i: Zap, t: "Hands-on labs with real workflows" },
                  { i: Shield, t: "Governance baked in from day one" },
                ].map((x) => (
                  <div key={x.t} className="programme-panel-row">
                    <x.i size={18} className="cyan-icon" />
                    <span>{x.t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="programme-panel-glow" />
          </div>
        </div>
      </section>
      <Section>
        <div className="logo-heading">
          <Eyebrow>Trusted across industries</Eyebrow>
          <h2 className="section-title">Partners and clients we've worked with</h2>
        </div>
        <div className="carousel-wrapper">
          <div className="logo-carousel">
            <motion.div
              className="logo-grid carousel-scroll"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...visiblePartners, ...visiblePartners].map((p, idx) => (
                <motion.div key={`${p.name}-${idx}`} className="logo-cell" whileHover={{ y: -4 }}>
                  <img src={p.src} alt={`${p.name} logo`} loading="lazy" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="carousel-dots">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </Section>
      <section className="home-cta">
        <div className="cta-grid-layer grid-bg" />
        <div className="home-cta-content">
          <h2 className="section-title">Ready to operationalise AI?</h2>
          <p className="home-cta-copy">
            Chat with our AI agent to explore your readiness, discover quick wins and design a
            custom roadmap.
          </p>
          <a
            href="https://executives.dimeconsultants.africa/"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary"
          >
            Start Conversation <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
