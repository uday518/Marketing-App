import FeaturesHubHero from '@/components/FeaturesHubHero/FeaturesHubHero';
import IntegrationFlow from '@/components/IntegrationFlow/IntegrationFlow';
import ExploreByCapability from '@/components/ExploreByCapability/ExploreByCapability';
import FinalCTA from '@/components/FinalCTA/FinalCTA';

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white">
      <FeaturesHubHero />
      <IntegrationFlow />
      <ExploreByCapability />
      <FinalCTA />
    </main>
  );
}
