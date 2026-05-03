import React from "react";
import { getSingleton } from "@/lib/data-reader";

export const dynamic = 'force-dynamic';

export default function GalleryPage() {
  const data = getSingleton('photoGallery') || {};
  const defaultImages = [
    { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop" },
    { src: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=600&auto=format&fit=crop" },
    { src: "https://images.unsplash.com/photo-1579621970588-a3f5ce599fac?q=80&w=600&auto=format&fit=crop" },
    { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop" },
  ];

  const renderImages = data.images && data.images.length > 0
    ? data.images
    : defaultImages.map(img => img.src);

  return (
    <main className="min-h-screen pt-32 sm:pt-40 pb-12 bg-background flex flex-col relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 mt-8 sm:mt-12">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">Gallery</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-primary via-gold to-accent rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {renderImages.map((src: string, i: number) => (
            <div
              key={i}
              className="group relative h-48 sm:h-56 md:h-64 rounded-2xl sm:rounded-3xl overflow-hidden glass-panel"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={src} 
                alt={`Gallery image ${i}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
