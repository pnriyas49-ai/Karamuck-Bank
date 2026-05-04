"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "EN" | "ML";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string, ml?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "hero.title": "The Future of Co-operative Banking",
    "hero.subtitle": "Experience secure, transparent, and spatial banking tailored for your prosperity.",
    "hero.cta": "Open Account",
    "services.gold": "Gold Loans",
    "services.gold.desc": "Lowest interest rates with instant approval.",
    "services.chitty": "Chitty",
    "services.chitty.desc": "Secure your future with our trusted chitty schemes.",
    "services.digital": "Digital Banking",
    "services.digital.desc": "24/7 access to your accounts from anywhere.",
    "emi.title": "Quick EMI Calculator",
    "emi.amount": "Loan Amount",
    "emi.tenure": "Tenure (Months)",
    "emi.interest": "Interest Rate (% p.a.)",
    "emi.monthly": "Estimated Monthly EMI",
  },
  ML: {
    "nav.home": "ഹോം",
    "nav.services": "സേവനങ്ങൾ",
    "nav.about": "ഞങ്ങളെക്കുറിച്ച്",
    "nav.contact": "ബന്ധപ്പെടുക",
    "hero.title": "സഹകരണ ബാങ്കിംഗിൻ്റെ ഭാവി",
    "hero.subtitle": "നിങ്ങളുടെ അഭിവൃദ്ധിക്കായി രൂപകൽപ്പന ചെയ്ത സുരക്ഷിതവും സുതാര്യവുമായ ബാങ്കിംഗ് അനുഭവിക്കുക.",
    "hero.cta": "അക്കൗണ്ട് തുറക്കുക",
    "services.gold": "സ്വർണ്ണ വായ്പകൾ",
    "services.gold.desc": "ഏറ്റവും കുറഞ്ഞ പലിശ നിരക്കുകൾ, ഉടനടി അനുമതി.",
    "services.chitty": "ചിട്ടി",
    "services.chitty.desc": "ഞങ്ങളുടെ വിശ്വസ്ത ചിട്ടി സ്കീമുകളിലൂടെ നിങ്ങളുടെ ഭാവി സുരക്ഷിതമാക്കുക.",
    "services.digital": "ഡിജിറ്റൽ ബാങ്കിംഗ്",
    "services.digital.desc": "എവിടെനിന്നും 24/7 നിങ്ങളുടെ അക്കൗണ്ടുകൾ ആക്സസ് ചെയ്യുക.",
    "emi.title": "ദ്രുത ഇഎംഐ കാൽക്കുലേറ്റർ",
    "emi.amount": "വായ്പാ തുക",
    "emi.tenure": "കാലാവധി (മാസങ്ങൾ)",
    "emi.interest": "പലിശ നിരക്ക് (% പ്രതിവർഷം)",
    "emi.monthly": "പ്രതിമാസ ഇഎംഐ",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "ML" : "EN"));
  };

  const t = (key: string, ml?: string) => {
    if (ml && language === 'ML') return ml;
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
