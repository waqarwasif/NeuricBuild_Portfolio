"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const pricingPlans = [
  {
    name: "Social Starter",
    desc: "Perfect for local businesses looking to establish a presence.",
    price: "$499",
    period: "/month",
    features: [
      "12 Custom Posts",
      "Basic Story Templates",
      "Monthly Content Calendar",
      "Community Management",
    ],
    recommended: false,
  },
  {
    name: "Growth Engine",
    desc: "Our most popular tier. Full-scale digital presence and web optimization.",
    price: "$1,299",
    period: "/month",
    features: [
      "Next.js Landing Page included",
      "24 Custom Posts + Reels",
      "Advanced Strategy & Analytics",
      "Priority Support (WhatsApp)",
      "Weekly Reporting",
    ],
    recommended: true,
  },
  {
    name: "Enterprise Custom",
    desc: "For brands needing bespoke web apps and massive scale.",
    price: "Custom",
    period: "",
    features: [
      "Full Web App Development",
      "Dedicated Account Manager",
      "Custom AI Chatbots (Beta)",
      "Unlimited Revisions",
    ],
    recommended: false,
  }
];

export function Pricing() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <SectionContainer id="pricing" className="relative">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="mb-16 text-center max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#FF6600]" />
            <span className="text-xs font-display font-medium uppercase tracking-[0.08em] text-zinc-400">Flexible Membership Options</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
            Choose the Plan That <br />
            <span className="text-primary italic">Grows With You.</span>
          </h2>
          
          {/* Toggle */}
          <div className="inline-flex items-center p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mt-6">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                !isAnnual ? "bg-white/10 text-white shadow-md border border-white/10" : "text-zinc-500 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                isAnnual ? "bg-white/10 text-white shadow-md border border-white/10" : "text-zinc-500 hover:text-white"
              )}
            >
              Quarterly <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold uppercase border border-primary/30">Save 15%</span>
            </button>
          </div>
        </motion.div>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-center mt-12 relative z-10">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className={cn(
              "rounded-3xl p-8 transition-all duration-300 flex flex-col h-full relative overflow-hidden",
              plan.recommended 
                ? "bg-black/60 backdrop-blur-xl border border-primary/50 shadow-[0_0_50px_rgba(255,102,0,0.2)] lg:-translate-y-4 lg:py-12 z-20" 
                : "bg-white/5 backdrop-blur-md border border-white/10 opacity-80 hover:opacity-100 z-10"
            )}
          >
            {plan.recommended && (
              <>
                {/* Glow inside the recommended card */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/30 blur-[60px] rounded-full mix-blend-screen pointer-events-none" />
                
                <div className="absolute top-0 left-0 w-full bg-primary text-white text-xs font-bold uppercase tracking-wider py-2 text-center">
                  Most Popular
                </div>
              </>
            )}
            
            <div className={cn("mt-4", plan.recommended ? "mt-8" : "")}>
              <h3 className="font-display text-2xl font-bold mb-2 text-white">{plan.name}</h3>
              <p className="text-zinc-400 text-sm mb-6 h-10">{plan.desc}</p>
              
              <div className="mb-8 flex items-baseline">
                <span className="text-4xl md:text-5xl font-display font-bold text-white">{plan.price}</span>
                <span className="text-zinc-500 ml-2 font-medium text-sm">{plan.period}</span>
              </div>
              
              <Button 
                variant={plan.recommended ? "default" : "ghost"} 
                className={cn(
                  "w-full mb-8 group rounded-xl", 
                  plan.recommended 
                    ? "bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(255,102,0,0.4)]" 
                    : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                )}
              >
                Get Started
                {plan.recommended && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </Button>
              
              <ul className="space-y-4 mt-auto relative z-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-zinc-300">
                    <div className="mt-0.5 mr-3 flex-shrink-0">
                      <Check className={cn("h-4 w-4", plan.recommended ? "text-primary" : "text-white")} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
