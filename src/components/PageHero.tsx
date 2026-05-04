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
}

export default function PageHero({ title, subtitle, heroImage }: PageHeroProps) {
  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden" style={{ paddingTop: '72px' }}>
      <PageBackground imageUrl={heroImage} overlayOpacity={0.7} blurAmount="3px" />
      {/* Fallback gradient when no hero image */}
      {!heroImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-accent/60 to-background" />
      )}
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="text-center max-w-[700px] mx-auto"
        >
          <motion.h1
            variants={fadeUp}
            className="font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)' }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              variants={fadeUp}
              className="mt-4 text-white/70 text-base sm:text-lg md:text-xl"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
