"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, PlayCircle } from "lucide-react";
import { useEffect } from "react";

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export interface TeamMemberProfile {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  stats?: {
    followers: string;
    following: string;
  };
  tags?: string[];
  featuredCards?: {
    title: string;
    subtitle?: string;
    actionText?: string;
    imageUrl?: string;
    price?: string;
    isLocked?: boolean;
    duration?: string;
  }[];
}

interface TeamProfileModalProps {
  member: TeamMemberProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TeamProfileModal({ member, isOpen, onClose }: TeamProfileModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-[480px] h-[85vh] max-h-[800px] bg-[#1a1a1a] rounded-[40px] overflow-hidden flex flex-col pointer-events-auto shadow-2xl relative border border-white/10"
            >
              {/* Back Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 left-6 z-10 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pb-24 relative">
                
                {/* Decorative Top Glow */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                {/* Top Section */}
                <div className="pt-12 px-6 pb-6 flex flex-col items-center relative">
                  
                  {/* Avatar Row */}
                  <div className="flex items-center justify-center w-full mb-4">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-zinc-600 to-zinc-300">
                        <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-[#1a1a1a]">
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Name and Tags */}
                  <div className="text-center mb-6 mt-2">
                    <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                      {member.name}
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" />
                      </svg>
                    </h2>
                    <p className="text-zinc-400 text-[11px] mt-2 flex items-center justify-center flex-wrap">
                      {(member.tags || [member.role]).map((tag, i, arr) => (
                        <span key={tag} className="flex items-center">
                          {tag}
                          {i < arr.length - 1 && <span className="mx-2 opacity-30">|</span>}
                        </span>
                      ))}
                    </p>
                  </div>

                  {/* Social Links */}
                  {member.socialLinks && Object.values(member.socialLinks).some(link => link && link !== "#") && (
                    <div className="flex justify-center gap-4 w-full">
                      {member.socialLinks.twitter && member.socialLinks.twitter !== "#" && (
                        <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md">
                          <TwitterIcon className="h-4 w-4" />
                        </a>
                      )}
                      {member.socialLinks.linkedin && member.socialLinks.linkedin !== "#" && (
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md">
                          <LinkedinIcon className="h-4 w-4" />
                        </a>
                      )}
                      {member.socialLinks.github && member.socialLinks.github !== "#" && (
                        <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md">
                          <GithubIcon className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Description and Work Section */}
                <div className="px-4 pb-4">
                  <div className="w-full bg-[#dcdcdc] rounded-[24px] p-6 flex flex-col relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full overflow-hidden relative shadow-sm">
                        <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                      </div>
                      <span className="text-sm font-bold text-black flex items-center gap-1">
                        {member.name.split(' ')[0]}
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-black" fill="currentColor">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-sm text-zinc-800 leading-relaxed mb-6">
                      {member.bio}
                    </p>
                    <button className="w-full bg-zinc-900 text-white rounded-full py-3.5 text-sm font-bold hover:bg-black transition-colors shadow-lg">
                      View Work
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
