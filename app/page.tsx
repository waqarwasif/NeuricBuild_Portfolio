import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Team } from "@/components/sections/team";
import { AboutStats } from "@/components/sections/about-stats";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Team />
      <AboutStats />
      <Process />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      
      {/* Simple Footer */}
      <footer className="w-full bg-bg-surface border-t border-border py-8 mt-12 text-center">
        <p className="text-text-muted text-sm">&copy; {new Date().getFullYear()} NeuricBuild. All rights reserved.</p>
      </footer>
    </>
  );
}
