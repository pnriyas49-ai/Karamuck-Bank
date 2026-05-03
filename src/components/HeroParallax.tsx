"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

export function HeroParallax({ data }: { data: any }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const images = data?.heroImages || [];

  React.useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div 
      ref={ref}
      className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center bg-background"
    >
      {/* Background Layer: Images or Abstract Glows */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {images.length > 0 ? (
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
              alt="Hero Background"
            />
            {/* Dark overlay to ensure text remains readable */}
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ) : (
          <>
            {/* Primary Red Glow - top left */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] sm:w-[50%] h-[50%] rounded-full bg-primary/15 blur-[80px] sm:blur-[120px]" />
            {/* Accent Green Glow - bottom right */}
            <div className="absolute bottom-[-20%] right-[-10%] w-[65%] sm:w-[55%] h-[55%] rounded-full bg-accent/12 blur-[100px] sm:blur-[150px]" />
            {/* Gold shimmer - center */}
            <div className="absolute top-[30%] right-[10%] sm:right-[20%] w-[40%] sm:w-[30%] h-[30%] rounded-full bg-gold/10 blur-[60px] sm:blur-[100px]" />
          </>
        )}
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 container mx-auto px-5 sm:px-6 text-center flex flex-col items-center mt-12 sm:mt-16 md:mt-20"
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
          className="text-[1.75rem] leading-tight sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-foreground max-w-5xl"
        >
          {data?.title || t("hero.title")}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-xl lg:text-2xl text-foreground/60 max-w-2xl font-light px-2 sm:px-4"
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
          <Button size="lg" variant="outline" className="h-11 sm:h-12 md:h-14 px-5 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg bg-foreground/5 hover:bg-foreground/10 border-foreground/20 text-foreground rounded-full transition-all hover:scale-105 backdrop-blur-md">
            Explore Services
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative gradient floor */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </div>
  );
}
