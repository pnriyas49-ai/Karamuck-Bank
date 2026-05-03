"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { name: t("nav.home"), href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Facilities", href: "/facilities" },
    { name: "News", href: "/news" },
    { name: "Gallery", href: "/gallery" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <footer className="relative bg-foreground/[0.03] border-t border-foreground/10 overflow-hidden">
      {/* Subtle background glows */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.svg"
                alt="Karamuck Service Co-operative Bank"
                width={160}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed mt-4">
              Serving the community since 1916 with trust, transparency, and modern banking solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-semibold text-base mb-4">Services</h4>
            <ul className="space-y-2">
              {["Gold Loans", "Chitty Schemes", "Fixed Deposits", "Digital Banking", "Micro Finance"].map((svc) => (
                <li key={svc}>
                  <Link href="/facilities" className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200">
                    {svc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-foreground font-semibold text-base mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground/60 text-sm">Thrissur, Kerala, India</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-foreground/60 text-sm">+91 487 2345 678</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-foreground/60 text-sm">info@karamuckscb.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground/40 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Karamuck Service Co-operative Bank Ltd. All rights reserved.
          </p>
          <p className="text-foreground/30 text-xs">
            Estd. 1916
          </p>
        </div>
      </div>
    </footer>
  );
}
