"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";

interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  tag: string;
  span: string;
}

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: services, loading } = useFirestoreCollection<ServiceItem>("services");

  // Background parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="services" ref={containerRef} className="relative w-full bg-[#030303] py-32 px-4 md:px-8 overflow-hidden font-sans">
      
      {/* Absolute Ambient Glow - adds atmosphere without clutter */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FF4400]/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* =========================================
            HEADER SECTION
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8"
        >
          <div className="relative">
            <span className="text-[#FF4400] font-mono text-[20px] tracking-[0.3em] uppercase mb-6 block">Our Solutions</span>
            <h2 className="font-display text-5xl md:text-7xl lg:text-[100px] font-black text-white tracking-tighter leading-[0.9]">
              ENGINEERED <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF4400] to-[#992200]">FOR SCALE.</span>
            </h2>
          </div>
          <div className="max-w-md text-zinc-400 text-sm md:text-base leading-relaxed border-l border-white/10 pl-6 xl:mb-4">
            We don&apos;t just build apps; we engineer automated ecosystems. Whether you need an intelligent conversational agent or a sophisticated workflow, we construct solutions that amplify human capability and drive autonomous growth.
          </div>
        </motion.div>

        {/* =========================================
            DYNAMIC BENTO GRID
            ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 relative">
          
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`rounded-3xl bg-white/5 animate-pulse h-[450px] md:h-[550px] ${i === 0 ? 'lg:col-span-12' : i === 1 ? 'lg:col-span-8' : 'lg:col-span-4'}`} />
            ))
          ) : (
            services.map((service, index) => {
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 80, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className={`relative group rounded-3xl overflow-hidden bg-[#080808] border border-white/5 hover:border-white/20 transition-colors duration-700 h-[450px] md:h-[550px] ${service.span}`}
                >
                  {/* 
                    IMAGE BACKGROUND
                    Custom generated 3D renders. Kept highly visible.
                  */}
                  <div className="absolute inset-0 z-0 overflow-hidden bg-[#030303]">
                    {/* Subtle tint overlays */}
                    <div className="absolute inset-0 bg-[#030303]/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000" />
                    
                    {/* Gradient Fade to Black at bottom to ensure perfect text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-20" />
                    
                    {/* The actual image with parallax */}
                    <motion.img 
                      style={{ y: yBg }}
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-[120%] object-cover object-center opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000"
                    />
                  </div>

                  {/* Content Overlay */}
                  <div className="relative z-30 h-full flex flex-col justify-between p-8 md:p-12">
                    
                    {/* Top: Tag and Number */}
                    <div className="flex justify-between items-start">
                      <span className="text-zinc-300 font-mono text-[9px] uppercase tracking-[0.2em] px-4 py-1.5 border border-white/10 rounded-full backdrop-blur-md bg-black/40">
                        {service.tag}
                      </span>
                      
                      {/* Massive Engineered Outline Number */}
                      <span className="font-display text-7xl md:text-[100px] font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] group-hover:[-webkit-text-stroke:1.5px_rgba(255,68,0,0.8)] group-hover:text-[#FF4400]/10 transition-all duration-700 drop-shadow-2xl leading-none">
                        {service.id}
                      </span>
                    </div>

                    {/* Bottom: Title and Description (Animated on hover) */}
                    <div className="max-w-md transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[0.21,0.47,0.32,0.98]">
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                        {service.title}
                      </h3>
                      <div className="overflow-hidden">
                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-[0.21,0.47,0.32,0.98]">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Animated Bottom Glow Line */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF4400] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out z-30 origin-left" />
                </motion.div>
              );
            })
          )}
          
        </div>
      </div>
    </section>
  );
}
