import React from "react";
import { getSingleton } from "@/lib/data-reader";

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
    <main className="min-h-screen pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 bg-background flex flex-col relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 mt-6 sm:mt-10 md:mt-12">
        <div className="mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6">Gallery</h1>
          <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-primary via-gold to-accent rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {renderImages.map((src: string, i: number) => (
            <div
              key={i}
              className="group relative h-36 sm:h-48 md:h-56 lg:h-64 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden glass-panel"
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
