"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { Lightbulb, PenTool, TrendingUp, CheckCircle2 } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Strategy",
    description: "We map out the architecture, UX, and social strategy before writing a single line of code.",
    icon: Lightbulb,
    bgColor: "bg-[#050505]",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    borderColor: "border-primary/20",
    features: ["Market Research", "UX/UI Wireframing", "Technical Architecture", "Growth Planning"]
  },
  {
    id: "02",
    title: "Create",
    description: "Our AI-augmented workflow enables us to build, design, and iterate at unprecedented speeds.",
    icon: PenTool,
    bgColor: "bg-[#0a0a0f]",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    borderColor: "border-accent/20",
    features: ["Rapid Prototyping", "Frontend Engineering", "Backend Systems", "AI Integration"]
  },
  {
    id: "03",
    title: "Grow",
    description: "We deploy your project and initiate the growth engines, continuously optimizing for results.",
    icon: TrendingUp,
    bgColor: "bg-[#050a05]",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    borderColor: "border-secondary/20",
    features: ["Launch Strategy", "Performance Optimization", "Conversion Tracking", "Continuous Scaling"]
  }
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <SectionContainer id="process" className="relative overflow-visible">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="relative mb-16 md:mb-32 text-center max-w-3xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-display font-medium uppercase tracking-[0.08em] text-text-muted">Our Process</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
            How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic">Deliver</span>.
          </h2>
        </motion.div>
      </div>

      <div ref={containerRef} className="relative max-w-5xl mx-auto pb-32 z-10 px-4 md:px-0">
        <div className="flex flex-col gap-0 md:gap-4 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`sticky w-full rounded-[40px] overflow-hidden border ${step.borderColor} shadow-2xl transition-all duration-500 flex flex-col md:flex-row p-8 md:p-16 ${step.bgColor} backdrop-blur-2xl`}
              style={{
                top: `calc(15vh + ${index * 30}px)`,
                zIndex: index + 10,
                minHeight: '400px'
              }}
            >
              {/* Background giant number */}
              <div className="absolute right-[-20px] bottom-[-60px] text-[250px] font-display font-black text-white/[0.02] select-none pointer-events-none leading-none">
                {step.id}
              </div>

              {/* Content */}
              <div className="flex-1 pr-0 md:pr-12 relative z-10">
                <div className={`h-20 w-20 rounded-3xl flex items-center justify-center mb-8 border border-white/5 ${step.iconBg}`}>
                  <step.icon className={`h-10 w-10 ${step.iconColor}`} />
                </div>
                
                <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                  {step.title}
                </h3>
                
                <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-xl mb-10 md:mb-0">
                  {step.description}
                </p>
              </div>

              {/* Features List */}
              <div className="flex-1 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-0 md:pl-16 relative z-10">
                <ul className="space-y-6">
                  {step.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/80 text-lg md:text-xl font-medium">
                      <CheckCircle2 className={`h-6 w-6 flex-shrink-0 ${step.iconColor}`} />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
