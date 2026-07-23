"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, MessageCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  business: z.string().min(2, "Business name is required"),
  department: z.string().min(1, "Please select a department"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  message: z.string().min(10, "Please provide more details about your project"),
  time: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    setIsRedirecting(true);
    
    // Construct WhatsApp Message
    const msg = `Hello NeuricBuild! 👋\n\nName: ${data.name}\nBusiness: ${data.business}\nDepartment: ${data.department}\nService: ${data.service}\nBudget: ${data.budget || 'Not specified'}\nPreferred Time: ${data.time || 'Anytime'}\n\nDetails: ${data.message}`;
    
    const encodedMsg = encodeURIComponent(msg);
    const targetNumber = data.department === "Customer Support" 
      ? process.env.NEXT_PUBLIC_WHATSAPP_CUSTOMER 
      : process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS;
      
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedMsg}`;
    
    // Simulate slight delay for UX
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsRedirecting(false);
    }, 1000);
  };

  return (
    <SectionContainer id="contact">
      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-start bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="h-16 w-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-8">
            <MessageCircle className="h-8 w-8 text-primary drop-shadow-[0_0_15px_rgba(255,102,0,0.8)]" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white drop-shadow-lg">
            Let&apos;s Build Something <br />
            <span className="font-light italic text-white/90">Incredible.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-md">
            Skip the lengthy proposals. Fill out the form below and we&apos;ll immediately connect on WhatsApp to discuss your project.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-white font-medium">
              <div className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_#8FD14F]" />
              Available for new projects
            </div>
            <div className="flex items-center gap-4 text-zinc-500">
              <div className="h-2 w-2 rounded-full bg-white/20" />
              Avg response: 2 hours
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Your Name *</label>
                <input 
                  {...register("name")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors focus:bg-white/10"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Business Name *</label>
                <input 
                  {...register("business")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors focus:bg-white/10"
                  placeholder="Acme Corp"
                />
                {errors.business && <p className="text-red-400 text-xs">{errors.business.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Department *</label>
                <select 
                  {...register("department")}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="">Select a department...</option>
                  <option value="Sales & Business">Sales & Business</option>
                  <option value="Customer Support">Customer Support</option>
                </select>
                {errors.department && <p className="text-red-400 text-xs">{errors.department.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Service Interested In *</label>
                <select 
                  {...register("service")}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="">Select a service...</option>
                <option value="Website Development">Website Development</option>
                <option value="Social Media Design">Social Media Design</option>
                <option value="Content Creation Plan">Content Creation Plan</option>
                <option value="Other">Other</option>
              </select>
              {errors.service && <p className="text-red-400 text-xs">{errors.service.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Budget Range</label>
                <select 
                  {...register("budget")}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="">Select range...</option>
                  <option value="Under $1k">Under $1k</option>
                  <option value="$1k - $5k">$1k - $5k</option>
                  <option value="$5k+">$5k+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Preferred Time</label>
                <select 
                  {...register("time")}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="">Select time...</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Project Details *</label>
              <textarea 
                {...register("message")}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none focus:bg-white/10"
                placeholder="Tell us a bit about what you're looking to achieve..."
              />
              {errors.message && <p className="text-red-400 text-xs">{errors.message.message}</p>}
            </div>

            <Button type="submit" className="w-full group bg-primary hover:bg-primary/90 text-white rounded-xl shadow-[0_0_20px_rgba(255,102,0,0.4)]" disabled={isRedirecting}>
              {isRedirecting ? "Redirecting to WhatsApp..." : "Send Request via WhatsApp"}
              {!isRedirecting && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </Button>
          </form>
        </motion.div>

      </div>
    </SectionContainer>
  );
}
