"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const secondaryContentRef = useRef<HTMLDivElement>(null);
  
  const frameCount = 270;
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    
    window.addEventListener('resize', resizeCanvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const paddedIndex = (i + 1).toString().padStart(4, "0");
      img.src = `/hero-sequence/frame-${paddedIndex}.webp`;
      images.push(img);
    }

    images[0].onload = render;

    function render() {
      if (!context || !canvas) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images[airpods.frame];
      if (img && img.complete) {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      }
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: containerRef.current,
        start: "top top",
        end: "+=3500", // Increased slightly for a smoother transition
        scrub: 1,
        pinSpacing: true,
      }
    });

    tl.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      duration: frameCount,
      onUpdate: render
    }, 0);

    // Scroll effect: Parallax and fade out the initial text as you scroll (0% to 35% of scroll)
    tl.to(contentRef.current, {
      y: -250,
      opacity: 0,
      scale: 0.9,
      duration: frameCount * 0.35, 
      ease: "power2.inOut"
    }, 0);

    // Secondary text fades in and floats up (45% to 65% of scroll)
    tl.fromTo(secondaryContentRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.95,
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: frameCount * 0.2,
      ease: "power2.out"
    }, frameCount * 0.45);

    // Secondary text fades out before exiting (85% to 100% of scroll)
    tl.to(secondaryContentRef.current, {
      y: -100,
      opacity: 0,
      scale: 1.05,
      duration: frameCount * 0.15,
      ease: "power2.in"
    }, frameCount * 0.85);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={triggerRef} className="w-full">
      <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center bg-black">
      
      {/* Sequence Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity pointer-events-none"
      />
      
      {/* Gradients to blend canvas with background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />

      {/* Secondary Animated Text (Appears mid-scroll) */}
      <div ref={secondaryContentRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none opacity-0 px-4">
        <h2 className="font-display text-5xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] via-[#FFA726] to-[#FF6600] bg-[length:200%_auto] animate-gradient-x text-center tracking-tight drop-shadow-2xl mb-4">
          Precision in<br />Every Pixel.
        </h2>
        <p className="text-xl md:text-3xl text-white font-medium mt-2 text-center max-w-4xl font-sans drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Seamlessly blending striking aesthetics with cutting-edge engineering.
        </p>
        <div className="mt-8 flex flex-col gap-2 items-center opacity-80">
          <span className="h-12 w-[1px] bg-gradient-to-b from-primary to-transparent" />
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Uncompromising Quality</p>
        </div>
      </div>

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-[1280px] px-6 h-full flex flex-col justify-center mt-20">
        <div className="flex flex-col gap-12 lg:gap-8 items-start lg:w-2/3">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-4 py-2"
          >
             <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#FF6600]" />
             <span className="text-xs font-display text-white font-medium tracking-widest uppercase">
               Premium Digital Experiences
             </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl"
          >
            Technology Crafted<br />
            for All <span className="font-light italic text-white/90">Not Machines</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-xl font-sans"
          >
            We create clear, intuitive, and accessible digital experiences shaped by real human behavior and AI-augmented precision.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <Button size="lg" className="group bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 shadow-[0_0_30px_rgba(255,102,0,0.3)]">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </Button>
            
            <div className="flex items-center gap-3 ml-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-black overflow-hidden relative z-10 hover:scale-125 hover:z-30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer">
                      <img src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop&crop=faces&fit=crop`} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
               <div className="flex flex-col">
                 <span className="text-white font-bold text-sm">900+ Happy Clients</span>
                 <span className="text-zinc-500 text-xs">Join them today</span>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Glassmorphic Bento Stats */}
        <div className="flex flex-wrap gap-4 mt-16 relative z-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl w-[200px] group hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,102,0,0.15)] hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              <p className="text-white font-display font-bold text-4xl mb-1 drop-shadow-md group-hover:scale-110 group-hover:text-primary origin-left transition-all duration-500">Trustful</p>
              <div className="h-[1px] w-full bg-white/10 my-3 group-hover:bg-primary/50 transition-colors duration-500" />
              <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider group-hover:text-zinc-300 transition-colors duration-500">Projects Delivered</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl w-[200px] group hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,102,0,0.15)] hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              <p className="text-white font-display font-bold text-4xl mb-1 drop-shadow-md group-hover:scale-110 group-hover:text-primary origin-left transition-all duration-500">98%</p>
              <div className="h-[1px] w-full bg-white/10 my-3 group-hover:bg-primary/50 transition-colors duration-500" />
              <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider group-hover:text-zinc-300 transition-colors duration-500">Client Satisfaction</p>
            </motion.div>
        </div>
      </div>
    </section>
    </div>
  );
}
