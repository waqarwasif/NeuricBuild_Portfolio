"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { Quote } from "lucide-react";
import Image from "next/image";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image?: string;
}

export function Testimonials() {
  const { data: testimonials, loading } = useFirestoreCollection<Testimonial>("testimonials");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <SectionContainer id="testimonials" className="relative">
      
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#FF6600]" />
            <span className="text-xs font-display font-medium uppercase tracking-[0.08em] text-zinc-400">Client Success</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
            Don&apos;t Just Take Our <span className="font-light italic text-white/90">Word</span>.
          </h2>
        </motion.div>
      </div>

      <div ref={containerRef} className="flex flex-col gap-6 w-full relative z-10">
        {loading ? (
          <div className="w-full bg-white/5 animate-pulse rounded-3xl h-[400px]" />
        ) : (
          testimonials.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden"
            >
              <Quote className="absolute -top-6 -left-6 h-32 w-32 text-white/5 -rotate-12" />
              
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
                <div className="max-w-3xl">
                  <p className="font-display text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-8 drop-shadow-md">
                    &quot;{testimonials[0].quote}&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-black border border-white/20 overflow-hidden relative">
                      {testimonials[0].image && (
                        <Image src={testimonials[0].image} alt={testimonials[0].author} fill className="object-cover" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{testimonials[0].author}</h4>
                      <p className="text-primary text-sm font-medium">{testimonials[0].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.5, delay: 0.3 }}
           className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 hide-scrollbar"
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="min-w-[300px] md:min-w-[400px] bg-white/5 animate-pulse rounded-3xl h-[250px] snap-start" />
            ))
          ) : (
            testimonials.slice(1).map((testimonial) => (
              <div key={testimonial.id} className="min-w-[300px] md:min-w-[400px] bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 snap-start hover:bg-white/10 transition-colors flex flex-col justify-between">
                <div>
                  <Quote className="h-8 w-8 text-primary/40 mb-4" />
                  <p className="text-zinc-400 max-w-xl mx-auto md:mx-0">
                    Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with NeuricBuild.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {testimonial.image && (
                    <div className="h-12 w-12 rounded-full overflow-hidden border border-white/20">
                      <Image width={48} height={48} src={testimonial.image} alt={testimonial.author} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-white font-bold">{testimonial.author}</h4>
                    <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
