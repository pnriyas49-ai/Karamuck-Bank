"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Facilities", href: "/facilities" },
    { name: "News", href: "/news" },
    { name: "Gallery", href: "/gallery" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-panel border-b border-foreground/10 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer shrink-0">
          <Image
            src="/logo.svg"
            alt="Karamuck Service Co-operative Bank"
            width={180}
            height={55}
            className="h-10 sm:h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 relative group/link ${
                  isActive ? "text-primary font-semibold" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover/link:w-full"}`} />
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-full"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          )}

          <Button
            variant="ghost"
            onClick={toggleLanguage}
            className="text-foreground/80 hover:text-foreground hover:bg-foreground/10 gap-2 rounded-full px-3 text-sm"
          >
            <Globe className="w-4 h-4" />
            {language === "EN" ? "മലയാളം" : "English"}
          </Button>
          
          <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-5 transition-all hover:scale-105 shadow-lg shadow-primary/25">
            {t("hero.cta")}
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-1">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground hover:bg-foreground/10"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-foreground/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-panel border-b border-foreground/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium py-2 border-b border-foreground/5 ${
                      isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={toggleLanguage}
                  className="w-full justify-center gap-2 bg-transparent border-foreground/20 text-foreground hover:bg-foreground/10"
                >
                  <Globe className="w-4 h-4" />
                  {language === "EN" ? "Switch to Malayalam" : "Switch to English"}
                </Button>
                <Button className="w-full bg-primary text-white font-bold shadow-lg shadow-primary/25">
                  {t("hero.cta")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
