import Hero from '@/components/Hero/Hero';
import Stats from '@/components/Stats/Stats';
import ValueProp from '@/components/ValueProp/ValueProp';
import FeaturesList from '@/components/FeaturesList/FeaturesList';
import BelowFoldSections from '@/components/BelowFoldSections/BelowFoldSections';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <ValueProp />
      <FeaturesList />
      <BelowFoldSections />
    </main>
  );
}
