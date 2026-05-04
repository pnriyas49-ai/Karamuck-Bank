'use client';
import { motion } from 'framer-motion';
import PageBackground from './PageBackground';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

interface PageHeroProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  heroImages?: string[];
}

export default function PageHero({ title, subtitle, heroImage, heroImages = [] }: PageHeroProps) {
  const images = heroImages.length > 0 ? heroImages : (heroImage ? [heroImage] : []);
  
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden" style={{ paddingTop: '72px' }}>
      <PageBackground imageUrls={images} overlayOpacity={0.55} blurAmount="1px" />
      {/* Fallback gradient when no hero images */}
      {images.length === 0 && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-accent/60 to-background" />
      )}
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-30 py-16 sm:py-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="text-center max-w-[700px] mx-auto"
        >
          <motion.h1
            variants={fadeUp}
            className="font-bold text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            style={{ fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              variants={fadeUp}
              className="mt-4 text-white/80 text-base sm:text-lg md:text-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
