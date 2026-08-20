import HowItWorksHero from '@/components/HowItWorksHero/HowItWorksHero';
import HowItWorksSteps from '@/components/HowItWorksSteps/HowItWorksSteps';
import HowItWorksRoles from '@/components/HowItWorksRoles/HowItWorksRoles';
import HowItWorksCTA from '@/components/HowItWorksCTA/HowItWorksCTA';

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-bg-page">
      <HowItWorksHero />
      <HowItWorksSteps />
      <HowItWorksRoles />
      <HowItWorksCTA />
    </main>
  );
}