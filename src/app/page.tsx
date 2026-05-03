import { HeroParallax } from "@/components/HeroParallax";
import { FloatingServices } from "@/components/FloatingServices";
import { EmiCalculator } from "@/components/EmiCalculator";
import { getSingleton, getCollection } from '@/lib/data-reader';



export default function Home() {
  const homepageData = getSingleton('homepage') || {};
  const facilities = getCollection('facilities') || [];

  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <HeroParallax data={homepageData} />
      <div className="relative z-20 bg-background/50 backdrop-blur-3xl">
        <FloatingServices facilities={facilities} />
        <EmiCalculator />
      </div>
    </main>
  );
}
