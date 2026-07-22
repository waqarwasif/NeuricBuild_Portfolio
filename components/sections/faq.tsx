"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export function FAQ() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const { data: faqs, loading } = useFirestoreCollection<FAQ>("faqs");
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <SectionContainer id="faq">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left: Title */}
        <div className="lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#FF6600]" />
              <span className="text-xs font-display font-medium uppercase tracking-[0.08em] text-zinc-400">FAQ</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">
              Common <span className="font-light italic text-white/90">Questions</span>.
            </h2>
            <p className="text-zinc-400">
              Everything you need to know about our process, pricing, and how we work.
            </p>
          </motion.div>
        </div>

        {/* Right: Accordion */}
        <div ref={containerRef} className="lg:w-2/3 flex flex-col gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="w-full bg-white/5 animate-pulse rounded-xl h-[80px]" />
            ))
          ) : (
            faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className={cn("font-display text-xl font-medium transition-colors", openId === faq.id ? "text-primary" : "text-white group-hover:text-primary")}>
                    {faq.question}
                  </span>
                  <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", openId === faq.id ? "rotate-180 text-primary" : "text-zinc-500")} />
                </button>
                
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-zinc-400 pb-6 pt-2 pr-12">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
