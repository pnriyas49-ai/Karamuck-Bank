'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Store } from 'lucide-react';
import PageBackground from './PageBackground';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

interface FacilitySection {
  title: string;
  titleMl: string;
  columns: string[];
  rows: string[][];
}
interface Subsidiary {
  title: string;
  titleMl: string;
  description: string;
  image: string;
}
interface FacilitiesData {
  heroImage: string;
  sections: FacilitySection[];
  subsidiaries: Subsidiary[];
}

export default function FacilitiesClient({ data }: { data: FacilitiesData }) {
  const { t } = useLanguage();
  if (!data) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden" style={{ paddingTop: '72px' }}>
        <PageBackground imageUrl={data.heroImage} overlayOpacity={0.7} blurAmount="3px" />
        {/* Fallback gradient if no hero image */}
        {!data.heroImage && (
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
              {t('Our Facilities', 'സൗകര്യങ്ങൾ')}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* ═══ QUICK NAV ═══ */}
      <div className="bg-card border-b border-border sticky top-[72px] z-50">
        <div className="container mx-auto flex flex-wrap gap-2 px-4 sm:px-6 py-3">
          {data.sections?.map((s, i) => (
            <a
              key={i}
              href={`#section-${i}`}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-secondary text-muted-foreground border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-200 no-underline"
            >
              {t(s.title, s.titleMl)}
            </a>
          ))}
          {data.subsidiaries?.length > 0 && (
            <a
              href="#subsidiaries"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-accent-foreground transition-all duration-200 no-underline"
            >
              {t('Subsidiary Firms', 'അനുബന്ധ സ്ഥാപനങ്ങൾ')}
            </a>
          )}
        </div>
      </div>

      {/* ═══ TABLE SECTIONS ═══ */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {data.sections?.map((section, sIdx) => (
          <motion.section
            key={sIdx}
            id={`section-${sIdx}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
            style={{ scrollMarginTop: '140px' }}
          >
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-accent rounded" />
              <h2 className="font-bold text-xl sm:text-2xl text-primary">
                {t(section.title, section.titleMl)}
              </h2>
            </div>

            {/* Table Card */}
            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-primary">
                      {section.columns.map((col, cIdx) => (
                        <th
                          key={cIdx}
                          className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-bold text-primary-foreground uppercase tracking-wider whitespace-nowrap"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={`border-b border-border transition-colors hover:bg-muted/50 ${
                          rIdx % 2 === 0 ? 'bg-card' : 'bg-secondary/50'
                        }`}
                      >
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className={`px-4 sm:px-6 py-3 sm:py-4 text-sm ${
                              cellIdx === 0 ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>
        ))}

        {/* ═══ SUBSIDIARIES ═══ */}
        {data.subsidiaries?.length > 0 && (
          <motion.section
            id="subsidiaries"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
            style={{ scrollMarginTop: '140px' }}
          >
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">
                {t('Community Services', 'സാമൂഹിക സേവനങ്ങൾ')}
              </p>
              <h2 className="font-bold text-2xl sm:text-3xl text-foreground">
                {t('Subsidiary Firms', 'അനുബന്ധ സ്ഥാപനങ്ങൾ')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.subsidiaries.map((sub, idx) => (
                <motion.div key={idx} variants={fadeUp} className="glass-panel rounded-2xl overflow-hidden">
                  <div className="h-[200px] bg-secondary overflow-hidden">
                    {sub.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={sub.image}
                        alt={sub.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Store size={48} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {t(sub.title, sub.titleMl)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{sub.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
