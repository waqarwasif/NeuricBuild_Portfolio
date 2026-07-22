"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import Image from "next/image";
import { TeamProfileModal } from "@/components/ui/team-profile-modal";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";

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

export interface TeamMember {
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
  stats?: { followers: string; following: string };
  tags?: string[];
  featuredCards?: { title: string; subtitle?: string; actionText?: string; imageUrl?: string; price?: string; isLocked?: boolean; duration?: string; }[];
}

export function Team() {
  const { data: team, loading } = useFirestoreCollection<TeamMember>("team");
  const [activeMember, setActiveMember] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<TeamMember | null>(null);

  const getOwnerId = () => {
    if (team.length === 0) return null;
    const owner = team.find(m => m.role.toLowerCase().includes("founder") || m.name.toLowerCase().includes("usman"));
    return owner ? owner.id : team[0].id;
  };

  useEffect(() => {
    if (!loading && team.length > 0 && !activeMember) {
      setActiveMember(getOwnerId());
    }
  }, [team, loading, activeMember]);

  return (
    <SectionContainer id="team" className="relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative mb-16 text-center max-w-3xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-display font-medium text-[20px] uppercase tracking-[0.08em] text-text-muted">Meet The Team</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            A Diverse Group of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic">Passionate</span> Professionals.
          </h2>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto z-10 px-4 h-auto md:h-[700px] relative">
        {loading ? (
          <div className="flex flex-col md:flex-row h-full gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white/5 rounded-[40px] flex-1 border border-white/10" />
            ))}
          </div>
        ) : (
          <div 
            className="flex flex-col md:flex-row w-full h-full gap-4 md:items-center"
            onMouseLeave={() => {
              setActiveMember(getOwnerId());
            }}
          >
            {team.map((member, index) => {
              const isActive = activeMember === member.id;
              
              let offsetClass = "";
              if (index === 0) offsetClass = "md:translate-y-12";
              else if (index === 1) offsetClass = "md:translate-y-4";
              else if (index === 2) offsetClass = "md:-translate-y-6";
              else if (index === 3) offsetClass = "md:translate-y-4";
              else if (index === 4) offsetClass = "md:translate-y-12";

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setActiveMember(member.id)}
                  onClick={() => setActiveMember(member.id)}
                  className={`relative cursor-pointer overflow-hidden rounded-[40px] transition-all duration-700 ease-in-out h-[450px] md:h-full ${
                    isActive ? "md:flex-[3.2]" : "md:flex-[1.2]"
                  } bg-zinc-900 border ${isActive ? "border-primary/50 shadow-[0_0_30px_rgba(255,102,0,0.2)]" : "border-white/10"} group ${offsetClass}`}
                >
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className={`object-cover transition-all duration-700 ease-in-out ${
                      isActive ? "opacity-60 md:opacity-40" : "opacity-40 grayscale group-hover:grayscale-0"
                    } object-[center_top] md:object-center`}
                  />
                  
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent transition-all duration-700 ${isActive ? "via-transparent md:group-hover:via-[#050505]/60 opacity-80 md:group-hover:opacity-90" : "via-[#050505]/40 opacity-90"}`} />

                  <div className={`absolute bottom-0 left-0 w-full p-6 md:p-8 transition-all duration-500 flex flex-col justify-end h-full`}>
                    
                    <div className={`md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-12 flex justify-center transition-all duration-500 ${isActive ? "opacity-0 scale-95 pointer-events-none absolute" : "opacity-100 scale-100"}`}>
                      <h3 
                        className="font-display text-2xl font-bold text-white tracking-wider whitespace-nowrap"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {member.name}
                      </h3>
                    </div>

                    <div className={`transition-all duration-500 transform ${isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}`}>
                      <h3 className="font-display text-3xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                      <p className="text-accent font-medium mb-0 md:group-hover:mb-4 transition-all duration-500">{member.role}</p>
                      
                      <div className={`overflow-hidden transition-all duration-700 ${isActive ? "max-h-[400px] md:max-h-0 md:group-hover:max-h-[400px]" : "max-h-0"}`}>
                        <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 mt-4 md:mt-0 max-w-lg hidden md:block">
                          {member.bio}
                        </p>
                        
                        {member.socialLinks && (
                          <div className="flex gap-4">
                            {member.socialLinks.twitter && (
                              <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors backdrop-blur-md">
                                <TwitterIcon className="h-4 w-4" />
                              </a>
                            )}
                            {member.socialLinks.linkedin && (
                              <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors backdrop-blur-md">
                                <LinkedinIcon className="h-4 w-4" />
                              </a>
                            )}
                            {member.socialLinks.github && (
                              <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors backdrop-blur-md">
                                <GithubIcon className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        )}
                        
                        {isActive && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProfile(member);
                            }}
                            className="mt-6 bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold tracking-wide hover:bg-primary hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,102,0,0.5)] transform hover:scale-105 active:scale-95 flex items-center gap-2"
                          >
                            View Full Profile
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <TeamProfileModal 
        member={selectedProfile} 
        isOpen={!!selectedProfile} 
        onClose={() => setSelectedProfile(null)} 
      />
    </SectionContainer>
  );
}
