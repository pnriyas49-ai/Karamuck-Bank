import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSingleton } from "@/lib/data-reader";

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const data = getSingleton('contact') || {};
  return (
    <main className="min-h-screen pt-32 sm:pt-40 pb-12 bg-background flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 mt-8 sm:mt-12 max-w-5xl">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground">Contact Us</h1>
        </div>
        <div className="h-1 w-20 bg-gradient-to-r from-primary via-gold to-accent mb-8 sm:mb-12 rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Details */}
          <div className="space-y-4 sm:space-y-6">
            <div className="glass-panel p-5 sm:p-6 rounded-xl sm:rounded-2xl flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Head Office</h3>
                <p className="text-foreground/70 text-sm sm:text-base whitespace-pre-wrap">{data.address || "Karamuck Service Co-operative Bank Ltd.\nThrissur, Kerala, India"}</p>
              </div>
            </div>

            <div className="glass-panel p-5 sm:p-6 rounded-xl sm:rounded-2xl flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-accent/10 rounded-xl text-accent shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Phone</h3>
                <p className="text-foreground/70 text-sm sm:text-base">{data.phone1 || "+91 487 2345 678"}<br/>{data.phone2 || "+91 98765 43210"}</p>
              </div>
            </div>

            <div className="glass-panel p-5 sm:p-6 rounded-xl sm:rounded-2xl flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-gold/10 rounded-xl text-gold shrink-0">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Email</h3>
                <p className="text-foreground/70 text-sm sm:text-base">{data.email || "info@karamuckscb.com"}</p>
              </div>
            </div>

            <div className="glass-panel p-5 sm:p-6 rounded-xl sm:rounded-2xl flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Working Hours</h3>
                <p className="text-foreground/70 text-sm sm:text-base whitespace-pre-wrap">{data.workingHours || "Mon - Sat: 9:30 AM – 4:00 PM\nSunday: Closed"}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl h-fit">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Send a Message</h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Full Name</label>
                <input type="text" className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 sm:py-3 text-foreground text-sm sm:text-base outline-none focus:border-primary transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Email Address</label>
                <input type="email" className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 sm:py-3 text-foreground text-sm sm:text-base outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Phone Number</label>
                <input type="tel" className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 sm:py-3 text-foreground text-sm sm:text-base outline-none focus:border-primary transition-colors" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Message</label>
                <textarea rows={4} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 sm:py-3 text-foreground text-sm sm:text-base outline-none focus:border-primary transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white py-5 sm:py-6 text-base sm:text-lg rounded-xl mt-2 sm:mt-4 shadow-lg shadow-primary/25">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
