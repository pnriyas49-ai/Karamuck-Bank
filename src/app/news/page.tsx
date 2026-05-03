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
    <main className="min-h-screen pt-32 sm:pt-40 pb-12 bg-background flex flex-col relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 mt-8 sm:mt-12 max-w-4xl">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">News & Updates</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-primary via-gold to-accent rounded-full" />
        </div>

        <div className="space-y-4 sm:space-y-6">
          {renderNews.map((item, i) => (
            <div
              key={item.title + i}
              className="glass-panel p-5 sm:p-6 rounded-xl sm:rounded-2xl border-l-4 border-l-primary hover:border-l-gold transition-colors duration-300"
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <span className="text-xs sm:text-sm text-primary font-semibold">{item.date}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{item.tag}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">{item.title}</h3>
              <p className="text-foreground/70 text-sm sm:text-base">{item.desc}</p>
              {item.image && (
                 <div className="mt-4 rounded-xl overflow-hidden h-48 max-w-md">
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
