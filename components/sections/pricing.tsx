"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { MessageCircle, ArrowRight } from "lucide-react";

export function Pricing() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <SectionContainer id="pricing" className="relative">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div ref={containerRef} className="text-center max-w-3xl mx-auto relative z-10 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#FF6600]" />
            <span className="text-xs font-display font-medium uppercase tracking-[0.08em] text-zinc-400">Pricing & Packages</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
            Ready to <span className="text-primary italic">Scale?</span>
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
            For custom pricing, bespoke web applications, or social media management packages, please reach out to our team directly.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <a 
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] text-white rounded-full font-bold hover:bg-[#20bd5a] transition-all shadow-[0_0_30px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle className="w-5 h-5" />
              Sales
            </a>
            
            <a 
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_CUSTOMER}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366]/10 text-[#25D366] rounded-full font-bold hover:bg-[#25D366] hover:text-white transition-all border border-[#25D366]/50"
            >
              <MessageCircle className="w-5 h-5" />
              Support
            </a>
            
            <a 
              href="#contact" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-md text-white rounded-full font-bold hover:bg-white/10 transition-all border border-white/10"
            >
              Fill out our Form
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
