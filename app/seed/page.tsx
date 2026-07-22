"use client";

import { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const seedData = {
  services: [
    { id: "01", title: "High-Performance Web Apps", desc: "Insanely fast, conversion-optimized Next.js web applications that serve as your ultimate digital asset.", image: "/images/web_dev_podium.png", tag: "[ engineering ]", span: "lg:col-span-12", order: 1 },
    { id: "02", title: "Premium Social & Content", desc: "Striking feed design and strategic content calendars that turn your social channels into a premium experience.", image: "/images/social_media_phone.png", tag: "[ identity ]", span: "lg:col-span-8", order: 2 },
    { id: "03", title: "AI Chatbot Automation", desc: "Intelligent agents that handle customer service and close sales 24/7 without human intervention.", image: "/images/ai_robot_brain.png", tag: "[ coming soon ]", span: "lg:col-span-4", order: 3 }
  ],
  portfolio: [
    { id: "1", client: "Nexus Web Platform", industry: "Web Development", metric: "Global Launch", type: "video", media: "/webvid/2026-07-22 11-10-11.mp4", colSpan: "col-span-1 md:col-span-12 lg:col-span-8", height: "h-[400px] md:h-[500px]", order: 1 },
    { id: "2", client: "Aura Health Portal", industry: "Web Development", metric: "Seamless UX", type: "video", media: "/webvid/2026-07-22 11-12-08.mp4", colSpan: "col-span-1 md:col-span-6 lg:col-span-4", height: "h-[350px] md:h-[500px]", order: 2 },
    { id: "3", client: "Lumina Real Estate UI", industry: "Web Development", metric: "High Conversion", type: "video", media: "/webvid/2026-07-22 11-14-30.mp4", colSpan: "col-span-1 md:col-span-6 lg:col-span-6", height: "h-[350px] md:h-[400px]", order: 3 },
    { id: "4", client: "Future Forward App", industry: "Web Development", metric: "Interactive Dashboard", type: "video", media: "/webvid/2026-07-22 11-20-40.mp4", colSpan: "col-span-1 md:col-span-12 lg:col-span-6", height: "h-[350px] md:h-[400px]", order: 4 },
    { id: "5", client: "Velocity Fintech", industry: "Web Development", metric: "Secure Architecture", type: "video", media: "/webvid/2026-07-22 11-23-49.mp4", colSpan: "col-span-1 md:col-span-12 lg:col-span-4", height: "h-[350px] md:h-[400px]", order: 5 },
    { id: "6", client: "Nova SaaS", industry: "Web Development", metric: "Scalable Infrastructure", type: "video", media: "/webvid/2026-07-22 11-25-59.mp4", colSpan: "col-span-1 md:col-span-6 lg:col-span-4", height: "h-[350px] md:h-[400px]", order: 6 },
    { id: "7", client: "Horizon E-Commerce", industry: "Web Development", metric: "Optimized Checkout", type: "video", media: "/webvid/2026-07-22 11-26-20.mp4", colSpan: "col-span-1 md:col-span-6 lg:col-span-4", height: "h-[350px] md:h-[400px]", order: 7 },
    { id: "8", client: "Vanguard Portal", industry: "Web Development", metric: "Enterprise Scale", type: "video", media: "/webvid/2026-07-22 11-36-48.mp4", colSpan: "col-span-1 md:col-span-12 lg:col-span-8", height: "h-[400px] md:h-[500px]", order: 8 },
    { id: "9", client: "Apex Dashboard", industry: "Web Development", metric: "Data Visualization", type: "video", media: "/webvid/2026-07-22 12-32-49.mp4", colSpan: "col-span-1 md:col-span-12 lg:col-span-4", height: "h-[400px] md:h-[500px]", order: 9 },
    { id: "10", client: "Quantum Web App", industry: "Web Development", metric: "Next.js Powered", type: "video", media: "/webvid/2026-07-22 12-34-31.mp4", colSpan: "col-span-1 md:col-span-12 lg:col-span-12", height: "h-[400px] md:h-[600px]", order: 10 }
  ],
  team: [
    { id: "dummy-3", name: "M. Ayan", role: "Graphic Designer", imageUrl: "/images/team-4-final.jpeg", bio: "Alex brings Designing excellence to the team, Designing Graphics for Businesses and enchances their Social Media Growth.", socialLinks: { twitter: "#", linkedin: "#" }, stats: { followers: "34.9 K", following: "2245" }, tags: ["Social Media", "Graphic Design", "Detail-oriented"], featuredCards: [{ title: "Interactive Web Experiences", duration: "18:40" }, { title: "Hire for next project", actionText: "Upgrade to Pro" }], order: 1 },
    { id: "dummy-4", name: "Izhan Amir", role: "Lead Developer & Marketing Strategist", imageUrl: "/images/team-3-final.jpeg", bio: "Izhan drives our growth through innovative Marketing strategies and innovative Lead Generation systems ", socialLinks: { twitter: "#", linkedin: "#" }, stats: { followers: "12.4 K", following: "1450" }, tags: ["Marketing", "Strategy", "Growth"], featuredCards: [{ title: "Growth Engine Strategies", duration: "12:15" }], order: 2 },
    { id: "dummy-1", name: "Usman Ali", role: "Founder & Creative Director", imageUrl: "/images/owner.jpeg", bio: "Usman is the visionary behind NeuricBuild, with over a decade of experience in digital transformation and design.", socialLinks: { twitter: "#", linkedin: "#", github: "#" }, stats: { followers: "45.2 K", following: "342" }, tags: ["Visionary", "Design", "Leadership"], featuredCards: [{ title: "Building the Future of Web", duration: "24:30" }, { title: "Latest Case Study", actionText: "Read Case Study" }], order: 3 },
    { id: "dummy-2", name: "Fatima Zahra", role: "Content Specialist", imageUrl: "/images/team-2-final.jpeg", bio: "Sarah crafts compelling narratives and content strategies that resonate with audiences across all digital touchpoints.", socialLinks: { twitter: "#", linkedin: "#" }, stats: { followers: "28.5 K", following: "1120" }, tags: ["Content", "Storytelling", "Social"], featuredCards: [{ title: "Content Strategy Masterclass", duration: "45:00" }], order: 4 },
    { id: "dummy-5", name: "Aisha Rahman", role: "Project Manager", imageUrl: "/images/team-1-final.jpeg", bio: "Priya ensures every project is delivered on time, exceeding client expectations with her impeccable organizational skills.", socialLinks: { linkedin: "#" }, stats: { followers: "8.1 K", following: "540" }, tags: ["Management", "Agile", "Delivery"], featuredCards: [{ title: "Agile Project Delivery", duration: "15:20" }, { title: "Schedule a Consultation", actionText: "Book Now" }], order: 5 }
  ],
  testimonials: [
    { id: "1", quote: "NeuricBuild completely transformed our digital presence. They didn't just build a website; they architected a growth engine. The 48-hour turnaround on revisions is unmatched.", author: "Sarah Jenkins", role: "Founder, Nexus AI", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop", order: 1 },
    { id: "2", quote: "The most professional agency we've ever partnered with. Their design systems are incredibly robust and their understanding of conversion optimization is next level.", author: "Marcus Thorne", role: "CEO, Velocity Fintech", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop", order: 2 },
    { id: "3", quote: "What impressed us most was their strategic approach. They didn't just ask what we wanted; they told us what we needed to dominate our market.", author: "Elena Rodriguez", role: "Marketing Director, Lumina", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop", order: 3 }
  ],
  pricing: [
    { id: "1", name: "Social Starter", desc: "Perfect for local businesses looking to establish a presence.", price: "$499", period: "/month", features: ["12 Custom Posts", "Basic Story Templates", "Monthly Content Calendar", "Community Management"], recommended: false, order: 1 },
    { id: "2", name: "Growth Engine", desc: "Our most popular tier. Full-scale digital presence and web optimization.", price: "$1,299", period: "/month", features: ["Next.js Landing Page included", "24 Custom Posts + Reels", "Advanced Strategy & Analytics", "Priority Support (WhatsApp)", "Weekly Reporting"], recommended: true, order: 2 },
    { id: "3", name: "Enterprise Custom", desc: "For brands needing bespoke web apps and massive scale.", price: "Custom", period: "", features: ["Full Web App Development", "Dedicated Account Manager", "Custom AI Chatbots (Beta)", "Unlimited Revisions"], recommended: false, order: 3 }
  ],
  faqs: [
    { id: "1", question: "How long does a project take?", answer: "Typical web projects take 2-4 weeks from strategy to launch. Social media and content plans are delivered monthly based on your specific tier.", order: 1 },
    { id: "2", question: "Do you offer monthly packages or one-time projects?", answer: "Both! We offer one-time builds for websites and monthly retainers for continuous growth, social media management, and SEO.", order: 2 },
    { id: "3", question: "What's your revision policy?", answer: "We offer unlimited revisions during the design phase. Once development begins, we stick strictly to the approved scope to ensure fast delivery.", order: 3 },
    { id: "4", question: "Do you work with international clients?", answer: "Yes, we work with clients globally. Our asynchronous AI-augmented workflow means time zones are rarely an issue.", order: 4 },
    { id: "5", question: "What do you need from me to get started?", answer: "Just your brand assets (logos, colors) and a clear understanding of your goals. If you don't have those, our Strategy phase will help build them.", order: 5 },
    { id: "6", question: "Do you require a contract/deposit?", answer: "Yes, we require a 50% upfront deposit to commence work, with the remaining 50% due upon project completion and handover.", order: 6 }
  ],
  stats: [
    { id: "1", label: "Weeks to Launch", value: "2-4", suffix: "", icon: "Zap", color: "from-[#FF4400]/20 to-[#FF4400]/0", textColor: "text-[#FF4400]", order: 1 },
    { id: "2", label: "Client Satisfaction", value: "99", suffix: "%", icon: "Users2", color: "from-blue-500/20 to-blue-500/0", textColor: "text-blue-500", order: 2 },
    { id: "3", label: "Global Clients", value: "40", suffix: "+", icon: "Globe2", color: "from-purple-500/20 to-purple-500/0", textColor: "text-purple-500", order: 3 },
    { id: "4", label: "Hours Saved per Project", value: "100", suffix: "+", icon: "Timer", color: "from-emerald-500/20 to-emerald-500/0", textColor: "text-emerald-500", order: 4 }
  ]
};

export default function SeedPage() {
  const [status, setStatus] = useState<string>("Ready to seed database.");
  const [isSeeding, setIsSeeding] = useState(false);

  const seedDatabase = async () => {
    setIsSeeding(true);
    setStatus("Seeding starting...");
    try {
      for (const [collectionName, items] of Object.entries(seedData)) {
        setStatus(`Seeding ${collectionName}...`);
        for (const item of items) {
          const docRef = doc(collection(db, collectionName), item.id);
          await setDoc(docRef, item);
        }
      }
      setStatus("Database seeded successfully! All data is now in Firebase.");
    } catch (error: any) {
      console.error("Error seeding database:", error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-[#FF4400]">Firebase Database Seeder</h1>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          This utility will push all hardcoded initial data to your connected Firebase Firestore database.
          Click the button below once to initialize your collections.
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={seedDatabase} 
            disabled={isSeeding}
            className="bg-[#FF4400] text-white px-8 py-3 rounded-full font-bold hover:bg-[#CC3300] transition disabled:opacity-50 disabled:cursor-not-allowed w-full"
          >
            {isSeeding ? "Seeding..." : "Seed Database"}
          </button>
          
          <div className="mt-4 p-4 w-full bg-black border border-zinc-800 rounded-lg font-mono text-sm">
            {status}
          </div>
        </div>
      </div>
    </div>
  );
}
