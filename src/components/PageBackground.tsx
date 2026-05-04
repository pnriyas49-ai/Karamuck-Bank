'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

interface PageBackgroundProps {
  imageUrl?: string;
  imageUrls?: string[];
  videoUrl?: string;
  overlayOpacity?: number;
  blurAmount?: string;
}

export default function PageBackground({
  imageUrl,
  imageUrls = [],
  videoUrl,
  overlayOpacity = 0.5,
  blurAmount = '4px',
}: PageBackgroundProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const validImages = imageUrls.length > 0 ? imageUrls : (imageUrl ? [imageUrl] : []);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (validImages.length <= 1 || videoUrl) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [validImages.length, videoUrl]);

  const yScroll = useTransform(scrollY, [0, 1000], ['0%', '20%']);
  const scaleScroll = useTransform(scrollY, [0, 1000], [1.05, 1.15]);

  const springConfig = { damping: 30, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-3, 3]), springConfig);
  const translateX = useSpring(useTransform(mouseX, [-1, 1], [15, -15]), springConfig);

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - left) / width - 0.5) * 2);
    mouseY.set(((e.clientY - top) / height - 0.5) * 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  if (validImages.length === 0 && !videoUrl) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full overflow-hidden z-0"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%',
          y: yScroll,
          scale: scaleScroll,
          rotateX,
          rotateY,
          x: translateX,
          transformStyle: 'preserve-3d',
        }}
        className="w-[120%] h-[120%]"
      >
        {videoUrl ? (
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentIndex}
              src={validImages[currentIndex]}
              alt="Page background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        )}
      </motion.div>

      {/* Overlay — ensures white text is always readable over any hero image */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom,
            rgba(10, 20, 15, ${overlayOpacity * 0.85}) 0%,
            rgba(10, 20, 15, ${overlayOpacity * 0.55}) 40%,
            rgba(10, 20, 15, ${overlayOpacity * 0.5}) 60%,
            rgba(10, 20, 15, ${overlayOpacity * 0.9}) 100%)`,
          backdropFilter: `blur(${blurAmount})`,
          WebkitBackdropFilter: `blur(${blurAmount})`,
        }}
      />
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.15)_100%)]" />
    </div>
  );
}
