import React from "react";
import { Shield, TrendingUp, Smartphone, Landmark, Lock, HandCoins } from "lucide-react";
import { getCollection } from "@/lib/data-reader";

export default function FacilitiesPage() {
  const facilitiesData = getCollection('facilities') || [];

  const defaultFacilities = [
    { title: "Gold Loan", desc: "Quick and hassle-free gold loans at the lowest interest rates with instant approval.", iconName: 'Shield', colorClass: "text-gold" },
    { title: "Chitty", desc: "Reliable chitty schemes to save and grow your wealth securely with flexible terms.", iconName: 'TrendingUp', colorClass: "text-accent" },
    { title: "Fixed Deposits", desc: "High-yield fixed deposits with attractive rates and special senior citizen benefits.", iconName: 'Landmark', colorClass: "text-primary" },
    { title: "Locker Facility", desc: "State-of-the-art safe deposit lockers for your valuables with 24/7 security.", iconName: 'Lock', colorClass: "text-gold" },
    { title: "Digital Banking", desc: "IMPS, NEFT, RTGS, and mobile banking services available round the clock.", iconName: 'Smartphone', colorClass: "text-accent" },
    { title: "Micro Finance", desc: "Supporting small businesses and self-help groups with easy loan access.", iconName: 'HandCoins', colorClass: "text-primary" },
  ];

  // Only use CMS data if entries actually have title + desc (i.e. proper facilities, not just image uploads)
  const validCmsData = facilitiesData.filter(
    (f: any) => f.entry?.title && f.entry?.desc
  );

  const renderFacilities = validCmsData.length > 0
    ? validCmsData.map((f: any) => ({ ...f.entry }))
    : defaultFacilities;

  const getIcon = (iconName: string, className: string) => {
    switch (iconName?.toLowerCase()) {
      case 'shield': return <Shield className={className} />;
      case 'trendingup': return <TrendingUp className={className} />;
      case 'landmark': return <Landmark className={className} />;
      case 'lock': return <Lock className={className} />;
      case 'smartphone': return <Smartphone className={className} />;
      case 'handcoins': return <HandCoins className={className} />;
      default: return <Shield className={className} />;
    }
  };

  return (
    <main className="min-h-screen pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 bg-background flex flex-col relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] bg-accent/8 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[150px] sm:w-[250px] md:w-[300px] h-[150px] sm:h-[250px] md:h-[300px] bg-gold/8 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 mt-6 sm:mt-10 md:mt-12">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">Our Facilities</h1>
          <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-primary via-gold to-accent rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {renderFacilities.map((fac: any, i: number) => (
            <div
              key={fac.title + i}
              className="glass-panel p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl hover:scale-[1.03] transition-all duration-300 cursor-default group"
            >
              <div className={`p-2.5 sm:p-3 bg-foreground/5 rounded-lg sm:rounded-xl w-fit mb-3 sm:mb-4 border border-foreground/10 group-hover:bg-foreground/10 transition-colors ${fac.colorClass || ''}`}>
                {getIcon(fac.iconName, "w-5 h-5 sm:w-6 sm:h-6")}
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2 md:mb-3 text-foreground group-hover:text-primary transition-colors">{fac.title}</h3>
              <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">{fac.desc}</p>
              {fac.image && (
                 <div className="mt-3 sm:mt-4 rounded-lg sm:rounded-xl overflow-hidden h-28 sm:h-32">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={fac.image} alt={fac.title} className="w-full h-full object-cover" />
                 </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
