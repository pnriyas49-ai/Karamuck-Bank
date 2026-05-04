"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import PageBackground from "./PageBackground";

export function HeroParallax({ data }: { data: any }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.85], [1, 1, 0]);

  const images = data?.heroImages || [];

  return (
    <div 
      ref={ref}
      className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center bg-background"
    >
      {/* Background Layer */}
      <PageBackground imageUrls={images} overlayOpacity={0.55} blurAmount="1px" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none" />

      {/* Hero Content — z-30 to sit above all overlay layers */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-30 container mx-auto px-5 sm:px-6 text-center flex flex-col items-center mt-12 sm:mt-16 md:mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-md mb-4 sm:mb-6 md:mb-8"
        >
          <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] sm:text-xs md:text-sm font-medium text-foreground/80">Estd. 1916 · Trusted Co-operative Banking</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-[1.75rem] leading-tight sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-white max-w-5xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}
        >
          {data?.title || t("hero.title")}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-xl lg:text-2xl text-white/70 max-w-2xl font-light px-2 sm:px-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
        >
          {data?.subtitle || t("hero.subtitle")}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-6 sm:mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto px-2 sm:px-0"
        >
          <Button size="lg" className="h-11 sm:h-12 md:h-14 px-5 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg bg-primary hover:bg-primary/90 text-white rounded-full transition-all hover:scale-105 group shadow-lg shadow-primary/30">
            {t("hero.cta")}
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="h-11 sm:h-12 md:h-14 px-5 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg bg-white/10 hover:bg-white/20 border-white/30 text-white rounded-full transition-all hover:scale-105 backdrop-blur-md shadow-lg">
            Explore Services
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative gradient floor — z-25 so it stays below the content (z-30) */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-background to-transparent z-[25] pointer-events-none" />
    </div>
  );
}
