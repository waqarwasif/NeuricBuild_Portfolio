"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { ArrowUpRight, X, Play } from "lucide-react";
import { cn } from "@/lib/utils";

import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";

interface WorkItem {
  id: string;
  client: string;
  industry: string;
  metric: string;
  type: string;
  media: string;
  colSpan: string;
  height: string;
}

export function Portfolio() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const { data: works, loading } = useFirestoreCollection<WorkItem>("portfolio");
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedWork) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedWork]);

  return (
    <SectionContainer id="work" className="relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#FF6600]" />
            <span className="text-xs font-display font-medium text-[20px] uppercase tracking-[0.08em] text-zinc-400">Featured Work</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
            Design With Purpose.<br />
            <span className="font-light italic text-white/90">Build With Impact.</span>
          </h2>
        </motion.div>
        

      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`rounded-3xl bg-white/5 animate-pulse h-[400px] ${i === 0 ? 'col-span-1 md:col-span-12 lg:col-span-8' : i === 1 ? 'col-span-1 md:col-span-6 lg:col-span-4' : i === 2 ? 'col-span-1 md:col-span-6 lg:col-span-6' : 'col-span-1 md:col-span-12 lg:col-span-6'}`} />
          ))
        ) : (
          works.map((work, index) => (
          <motion.div
            key={work.id}
            onClick={() => setSelectedWork(work)}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-[#050505] border border-white/5 hover:border-primary/50 transition-all duration-700 backdrop-blur-sm ${work.colSpan} ${work.height} shadow-lg hover:shadow-[0_0_40px_rgba(255,68,0,0.2)]`}
          >
            {/* Base Media */}
            <div className="absolute inset-0 z-0">
              {work.type === 'video' ? (
                <video 
                  src={work.media} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
              ) : (
                <img 
                  src={work.media} 
                  alt={work.client} 
                  className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
              )}
            </div>
            
            {/* Play Indicator for Videos */}
            {work.type === 'video' && (
              <div className="absolute top-6 right-6 z-20 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-2 text-white/70 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Play className="w-4 h-4 fill-current" />
              </div>
            )}
            
            {/* Duotone Hover Overlay & Gradient fade */}
            <div className="absolute inset-0 bg-[#050505]/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            
            {/* Content overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
              <div className="flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider mb-3">
                    {work.industry}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-md">{work.client}</h3>
                  <p className="text-zinc-300 font-medium text-sm md:text-base">{work.metric}</p>
                </div>
                
                <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 shadow-[0_0_20px_rgba(255,102,0,0.5)]">
                  <ArrowUpRight className="h-6 w-6" />
                </div>
              </div>
            </div>
          </motion.div>
        )))}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setSelectedWork(null)}
          >
            <motion.button 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-6 right-6 md:top-12 md:right-12 z-[110] p-3 bg-white/10 hover:bg-primary border border-white/20 hover:border-primary rounded-full text-white transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedWork(null);
              }}
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking the media itself
            >
              {selectedWork.type === 'video' ? (
                <video 
                  src={selectedWork.media} 
                  controls 
                  autoPlay 
                  className="w-full h-full max-h-[85vh] object-contain"
                />
              ) : (
                <img 
                  src={selectedWork.media} 
                  alt={selectedWork.client} 
                  className="w-full h-full max-h-[85vh] object-contain"
                />
              )}
              
              {/* Info Bar in Lightbox */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent pointer-events-none">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary text-[10px] font-bold uppercase tracking-wider mb-2">
                  {selectedWork.industry}
                </span>
                <h3 className="font-display text-3xl font-bold text-white drop-shadow-md">{selectedWork.client}</h3>
                <p className="text-zinc-300">{selectedWork.metric}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
}
