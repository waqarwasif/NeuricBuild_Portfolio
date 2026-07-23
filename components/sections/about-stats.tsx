"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { Zap, Globe2, Users2, Timer } from "lucide-react";
import Image from "next/image";

export function AboutStats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <SectionContainer id="about">
      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: About Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#FF6600]" />
            <span className="text-xs font-display font-medium text-[20px] uppercase tracking-[0.08em] text-zinc-400">Why Choose Us</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
            The Speed of AI.<br />
            <span className="font-light italic text-white/90">The Polish of Experts.</span>
          </h2>
          <div className="space-y-6 text-lg text-zinc-400">
            <p>
              NeuricBuild wasn&apos;t founded to be just another traditional agency. We are an AI-augmented team that leverages advanced tooling to cut development times in half without sacrificing quality.
            </p>
            <p>
              Whether you&apos;re establishing a new digital footprint or scaling your operations to the next level, we build the systems, content, and experiences that turn visitors into loyal customers and drive sustainable growth.
            </p>
          </div>
        </motion.div>

        {/* Right: Asymmetric Stat Cluster with Visuals */}
        <div className="relative flex flex-col md:block h-auto md:h-[500px] w-full gap-4 mt-8 md:mt-0">
          {/* Background Visual (Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-0 opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
          >
            <Image src="/images/about_visual.png" alt="AI Speed Visual" fill className="object-cover mix-blend-screen" />
          </motion.div>
          
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen z-0" />

          {/* Large Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: [0, -10, 0] } : {}}
            transition={{ opacity: { duration: 0.5, delay: 0.2 }, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
            className="relative md:absolute md:top-0 md:left-0 w-full md:w-3/5 bg-black/60 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl z-20 hover:border-primary/50 transition-colors group"
          >
            <div className="h-12 w-12 rounded-xl bg-black/80 border border-white/10 flex items-center justify-center mb-4 group-hover:border-primary/50 transition-colors">
              <Zap className="text-primary h-6 w-6 drop-shadow-[0_0_15px_rgba(255,102,0,0.8)]" />
            </div>
            <p className="font-display text-5xl font-bold text-white mb-2 drop-shadow-md">2x</p>
            <p className="text-zinc-400 text-sm font-medium">Faster Delivery Time</p>
          </motion.div>

          {/* Large Stat 2 */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: [0, 10, 0] } : {}}
             transition={{ opacity: { duration: 0.5, delay: 0.3 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 } }}
             className="relative md:absolute md:bottom-10 md:right-0 w-full md:w-[55%] bg-black/60 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl z-10 hover:border-secondary/50 transition-colors group"
          >
            <div className="h-12 w-12 rounded-xl bg-black/80 border border-white/10 flex items-center justify-center mb-4 group-hover:border-secondary/50 transition-colors">
              <Globe2 className="text-secondary h-6 w-6 drop-shadow-[0_0_15px_rgba(143,209,79,0.8)]" />
            </div>
            <p className="font-display text-4xl font-bold text-white mb-2 drop-shadow-md">Global</p>
            <p className="text-zinc-400 text-sm font-medium">Reach & Experience</p>
          </motion.div>

          <div className="flex flex-row gap-4 w-full md:block">
            {/* Small Stat 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1, y: [0, -8, 0] } : {}}
              transition={{ opacity: { duration: 0.4, delay: 0.4 }, scale: { duration: 0.4, delay: 0.4 }, y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 } }}
              className="flex-1 relative md:absolute md:top-12 md:right-4 md:w-1/3 bg-primary/90 backdrop-blur-xl p-6 rounded-3xl shadow-[0_0_40px_rgba(255,102,0,0.4)] z-30 border border-primary/50"
            >
              <Users2 className="text-white h-6 w-6 mb-3" />
              <p className="font-display text-3xl font-bold text-white mb-1">98%</p>
              <p className="text-white/90 text-xs font-bold uppercase tracking-wider">Retention</p>
            </motion.div>

            {/* Small Stat 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1, y: [0, 8, 0] } : {}}
              transition={{ opacity: { duration: 0.4, delay: 0.5 }, scale: { duration: 0.4, delay: 0.5 }, y: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.5 } }}
              className="flex-1 relative md:absolute md:bottom-0 md:left-10 md:w-1/3 bg-[#0a0a0a]/90 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl z-40 border border-white/10 hover:border-accent/50 transition-colors"
            >
              <Timer className="text-accent h-6 w-6 mb-3 drop-shadow-[0_0_15px_rgba(96,76,195,0.8)]" />
              <p className="font-display text-3xl font-bold text-white mb-1">48h</p>
              <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Response</p>
            </motion.div>
          </div>
        </div>

      </div>
    </SectionContainer>
  );
}
