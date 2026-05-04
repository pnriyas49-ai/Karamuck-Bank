import React from "react";
import { Target, Heart, Users, Award } from "lucide-react";
import { getSingleton } from "@/lib/data-reader";
import PageHero from "@/components/PageHero";

export default function AboutPage() {
  const data = getSingleton('about') || {};
  const stats = [
    { label: "Years of Service", value: "108+", icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { label: "Members", value: "10,000+", icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { label: "Branches", value: "5+", icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <PageHero
        title="Our Legacy"
        subtitle="Karamuck Service Co-operative Bank"
        heroImage={data.heroImage}
      />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-12 md:py-16">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-panel p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl text-center">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-gold mb-1.5 sm:mb-2">
                {stat.icon}
              </div>
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-primary mb-0.5 sm:mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-10 sm:mb-14 md:mb-16">
          <div className="glass-panel p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg sm:rounded-xl">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">{data.visionTitle || "Our Vision"}</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed text-sm sm:text-base md:text-lg whitespace-pre-wrap">
              {data.visionText || "To be the most trusted and technically advanced co-operative banking institution, providing transparent, reliable, and premium financial services to our community since 1916."}
            </p>
          </div>
          
          <div className="glass-panel p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg sm:rounded-xl">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-accent">{data.missionTitle || "Our Mission"}</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed text-sm sm:text-base md:text-lg whitespace-pre-wrap">
              {data.missionText || "Empowering individuals and businesses with accessible credit, secure savings, and digital-first solutions while maintaining the core co-operative principles of trust and community service."}
            </p>
          </div>
        </div>

        {data.historyText && (
          <div className="glass-panel p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl mb-10 sm:mb-14 md:mb-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">Our History</h2>
            <p className="text-foreground/70 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">{data.historyText}</p>
          </div>
        )}
        
        {data.aboutImage && (
          <div className="w-full h-48 sm:h-64 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden mb-10 sm:mb-14 md:mb-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.aboutImage} alt="About Bank" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </main>
  );
}
