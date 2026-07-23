"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Process", href: "#process" },
  { name: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
        scrolled ? "w-[calc(100%-2rem)] max-w-[1280px]" : "w-full max-w-[1280px] px-4 md:px-6 lg:px-8"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between rounded-full border border-border/50 bg-bg-surface/80 px-4 py-2 backdrop-blur-md transition-all",
          scrolled ? "shadow-lg shadow-black/20" : ""
        )}
      >
        <Link href="/" className="px-2 font-display text-xl font-bold tracking-tight text-white">
          Neuric<span className="text-primary">Build</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-text-muted hover:text-white transition-colors"
              onMouseEnter={() => setActive(link.name)}
              onMouseLeave={() => setActive("")}
            >
              {link.name}
              {active === link.name && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-4 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="default" className="group">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS}`} target="_blank" rel="noopener noreferrer">
              Sales
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_CUSTOMER}`} target="_blank" rel="noopener noreferrer">
              Support
            </a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="p-2 md:hidden text-text-muted hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 rounded-3xl border border-border bg-bg-surface/95 p-6 backdrop-blur-xl md:hidden flex flex-col gap-4 shadow-2xl"
          >
            {links.map((link) => (
               <Link
               key={link.name}
               href={link.href}
               className="text-lg font-medium text-text-muted hover:text-white"
               onClick={() => setMobileMenuOpen(false)}
             >
               {link.name}
             </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Button asChild variant="default" className="w-full group">
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS}`} target="_blank" rel="noopener noreferrer">
                  Sales
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_CUSTOMER}`} target="_blank" rel="noopener noreferrer">
                  Support
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
