import TourHero from '@/components/TourHero/TourHero';
import TourClient from '@/components/TourClient/TourClient';
import TourCTA from '@/components/TourCTA/TourCTA';

export default function TourPage() {
  return (
    <main className="min-h-screen bg-white">
      <TourHero />
      <TourClient />
      <TourCTA />
    </main>
  );
}
