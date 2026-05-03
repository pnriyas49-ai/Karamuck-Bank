import React from "react";
import { Target, Heart, Users, Award } from "lucide-react";
import { getSingleton } from "@/lib/data-reader";

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  const data = getSingleton('about') || {};
  const stats = [
    { label: "Years of Service", value: "108+", icon: <Award className="w-5 h-5" /> },
    { label: "Members", value: "10,000+", icon: <Users className="w-5 h-5" /> },
    { label: "Branches", value: "5+", icon: <Target className="w-5 h-5" /> },
  ];

  return (
    <main className="min-h-screen pt-32 sm:pt-40 pb-12 bg-background flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 mt-8 sm:mt-12">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground">About Us</h1>
        </div>
        <div className="h-1 w-20 bg-gradient-to-r from-primary via-gold to-accent mb-8 sm:mb-12 rounded-full" />

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {stats.map((stat, i) => (
            <div key={stat.label} className="glass-panel p-5 sm:p-6 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-2 text-gold mb-2">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-16">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-primary">{data.visionTitle || "Our Vision"}</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed text-base sm:text-lg whitespace-pre-wrap">
              {data.visionText || "To be the most trusted and technically advanced co-operative banking institution, providing transparent, reliable, and premium financial services to our community since 1916."}
            </p>
          </div>
          
          <div className="glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-xl">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-accent">{data.missionTitle || "Our Mission"}</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed text-base sm:text-lg whitespace-pre-wrap">
              {data.missionText || "Empowering individuals and businesses with accessible credit, secure savings, and digital-first solutions while maintaining the core co-operative principles of trust and community service."}
            </p>
          </div>
        </div>

        {data.historyText && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our History</h2>
            <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">{data.historyText}</p>
          </div>
        )}
        
        {data.aboutImage && (
          <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.aboutImage} alt="About Bank" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </main>
  );
}
