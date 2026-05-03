"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Slider } from "@/components/ui/slider";

export function EmiCalculator() {
  const { t } = useLanguage();
  
  const [amount, setAmount] = useState<number>(100000);
  const [tenure, setTenure] = useState<number>(12);
  const [interest, setInterest] = useState<number>(8.5);
  const [emi, setEmi] = useState<number>(0);

  useEffect(() => {
    const P = amount;
    const R = interest / 12 / 100;
    const N = tenure;

    if (P > 0 && R > 0 && N > 0) {
      const calcEmi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      setEmi(Math.round(calcEmi));
    } else {
      setEmi(0);
    }
  }, [amount, tenure, interest]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-background z-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="glass-panel rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-16 border border-foreground/10 relative overflow-hidden">
          {/* Subtle background glow inside card */}
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-accent/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-primary/10 rounded-full blur-[80px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            
            {/* Input Section */}
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {t("emi.title")}
                </h2>
                <p className="text-foreground/50 text-xs sm:text-sm">
                  Plan your loan accurately with real-time calculations.
                </p>
              </div>

              {/* Amount Slider */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-end gap-2">
                  <label className="text-foreground/80 font-medium text-sm sm:text-base">{t("emi.amount")}</label>
                  <span className="text-xl sm:text-2xl font-bold text-primary">{formatCurrency(amount)}</span>
                </div>
                <Slider
                  defaultValue={[100000]}
                  max={5000000}
                  step={10000}
                  value={[amount]}
                  onValueChange={(val) => setAmount(val[0])}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
                <div className="flex justify-between text-xs text-foreground/40">
                  <span>₹10,000</span>
                  <span>₹50L</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-end gap-2">
                  <label className="text-foreground/80 font-medium text-sm sm:text-base">{t("emi.tenure")}</label>
                  <span className="text-xl sm:text-2xl font-bold text-foreground">{tenure} Months</span>
                </div>
                <Slider
                  defaultValue={[12]}
                  max={120}
                  step={6}
                  value={[tenure]}
                  onValueChange={(val) => setTenure(val[0])}
                  className="[&_[role=slider]]:bg-accent [&_[role=slider]]:border-accent"
                />
                <div className="flex justify-between text-xs text-foreground/40">
                  <span>6 Mo</span>
                  <span>120 Mo</span>
                </div>
              </div>

              {/* Interest Slider */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-end gap-2">
                  <label className="text-foreground/80 font-medium text-sm sm:text-base">{t("emi.interest")}</label>
                  <span className="text-xl sm:text-2xl font-bold text-foreground">{interest}%</span>
                </div>
                <Slider
                  defaultValue={[8.5]}
                  max={20}
                  step={0.1}
                  value={[interest]}
                  onValueChange={(val) => setInterest(val[0])}
                  className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold"
                />
                <div className="flex justify-between text-xs text-foreground/40">
                  <span>0%</span>
                  <span>20%</span>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="bg-foreground/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-foreground/10 flex flex-col items-center justify-center text-center min-h-[220px] sm:min-h-[300px] backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h3 className="text-foreground/60 text-sm sm:text-lg mb-3 sm:mb-4 font-medium uppercase tracking-wider">
                  {t("emi.monthly")}
                </h3>
                <motion.div
                  key={emi}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold text-primary mb-2"
                >
                  {formatCurrency(emi)}
                </motion.div>
                <div className="w-12 h-1 bg-gradient-to-r from-primary via-gold to-accent mx-auto mt-4 sm:mt-6 rounded-full" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
