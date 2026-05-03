"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, TrendingUp, Smartphone, ChevronRight } from "lucide-react";

export function FloatingServices({ facilities }: { facilities?: any[] }) {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getIcon = (iconName: string, colorClass: string) => {
    const className = `w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${colorClass}`;
    switch (iconName?.toLowerCase()) {
      case 'shield': return <Shield className={className} />;
      case 'trendingup': return <TrendingUp className={className} />;
      case 'smartphone': return <Smartphone className={className} />;
      default: return <Shield className={className} />;
    }
  };

  // These are always shown on the homepage as the 3 featured services
  const defaultServices = [
    {
      id: "gold",
      title: t("services.gold"),
      desc: t("services.gold.desc"),
      icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gold" />,
      color: "from-gold/20 to-transparent",
      delay: 0.1,
      className: "md:col-span-2 md:row-span-2",
    },
    {
      id: "chitty",
      title: t("services.chitty"),
      desc: t("services.chitty.desc"),
      icon: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent" />,
      color: "from-accent/20 to-transparent",
      delay: 0.3,
      className: "md:col-span-1 md:row-span-1",
    },
    {
      id: "digital",
      title: t("services.digital"),
      desc: t("services.digital.desc"),
      icon: <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />,
      color: "from-primary/15 to-transparent",
      delay: 0.5,
      className: "md:col-span-1 md:row-span-1",
    },
  ];

  // Only use CMS facilities if they have valid title/desc fields
  const validCmsFacilities = (facilities || []).filter(
    (f) => f.entry?.title && f.entry?.desc
  );

  // If we have 3+ valid CMS facilities, use them; otherwise always use defaults
  const servicesToRender =
    validCmsFacilities.length >= 3
      ? validCmsFacilities.slice(0, 3).map((f, i) => ({
          id: f.slug,
          title: f.entry.title,
          desc: f.entry.desc,
          icon: getIcon(f.entry.iconName, f.entry.colorClass || "text-primary"),
          color: `from-${
            f.entry.colorClass
              ? f.entry.colorClass.replace("text-", "")
              : "primary"
          }/20 to-transparent`,
          delay: 0.1 + i * 0.2,
          className:
            i === 0
              ? "md:col-span-2 md:row-span-2"
              : "md:col-span-1 md:row-span-1",
        }))
      : defaultServices;

  return (
    <section id="services" className="relative py-12 sm:py-20 md:py-28 lg:py-32 bg-background overflow-hidden z-10">
      {/* Background glow for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-accent/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6"
          >
            Our Services
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: "80px" } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-primary via-gold to-transparent rounded-full sm:[width:100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3 sm:gap-4 md:gap-6 lg:gap-10">
          {servicesToRender.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: service.delay, ease: "easeOut" }}
              className={`group glass-panel rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 relative overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:border-primary/30 cursor-pointer ${service.className}`}
            >
              {/* Internal glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="bg-foreground/5 w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 md:mb-8 border border-foreground/10 group-hover:bg-foreground/10 transition-colors duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-foreground/60 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 flex-grow leading-relaxed">
                  {service.desc}
                </p>

                <div className="flex items-center text-xs sm:text-sm font-medium text-foreground/40 group-hover:text-accent transition-colors duration-300 mt-auto">
                  Learn more <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
