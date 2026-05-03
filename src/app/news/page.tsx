import React from "react";
import { getCollection } from "@/lib/data-reader";

export default function NewsPage() {
  const newsData = getCollection('news') || [];
  const defaultNews = [
    { date: "Oct 15, 2026", title: "New Core Banking Software Update", desc: "We are migrating to a faster and more secure core banking system this weekend.", tag: "Technology" },
    { date: "Sep 28, 2026", title: "Annual General Body Meeting", desc: "The AGM for the financial year 2025-2026 will be held at the head office auditorium.", tag: "Event" },
    { date: "Sep 10, 2026", title: "Interest Rate Revised", desc: "Fixed deposit interest rates have been increased by 0.5% for senior citizens.", tag: "Finance" },
  ];

  const renderNews = newsData.length > 0 
    ? newsData.map((n: any) => ({ ...n.entry }))
    : defaultNews;

  return (
    <main className="min-h-screen pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 bg-background flex flex-col relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 mt-6 sm:mt-10 md:mt-12 max-w-4xl">
        <div className="mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6">News & Updates</h1>
          <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-primary via-gold to-accent rounded-full" />
        </div>

        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {renderNews.map((item, i) => (
            <div
              key={item.title + i}
              className="glass-panel p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl border-l-4 border-l-primary hover:border-l-gold transition-colors duration-300"
            >
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2">
                <span className="text-[11px] sm:text-xs md:text-sm text-primary font-semibold">{item.date}</span>
                <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{item.tag}</span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-foreground">{item.title}</h3>
              <p className="text-foreground/70 text-xs sm:text-sm md:text-base leading-relaxed">{item.desc}</p>
              {item.image && (
                 <div className="mt-3 sm:mt-4 rounded-lg sm:rounded-xl overflow-hidden h-36 sm:h-44 md:h-48 max-w-md">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                 </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
