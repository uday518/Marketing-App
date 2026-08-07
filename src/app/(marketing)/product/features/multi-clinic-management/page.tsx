import MultiClinicHero from '@/components/MultiClinicHero/MultiClinicHero';
import MultiClinicSections from '@/components/MultiClinicSections/MultiClinicSections';
import MultiClinicCapabilities from '@/components/MultiClinicCapabilities/MultiClinicCapabilities';
import MultiClinicHowItWorks from '@/components/MultiClinicHowItWorks/MultiClinicHowItWorks';
import MultiClinicWorksBestWith from '@/components/MultiClinicWorksBestWith/MultiClinicWorksBestWith';
import MultiClinicCTA from '@/components/MultiClinicCTA/MultiClinicCTA';
import FeatureNav from '@/components/FeatureNav/FeatureNav';

export default function MultiClinicManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      <MultiClinicHero />
      <MultiClinicSections />
      <MultiClinicCapabilities />
      <MultiClinicHowItWorks />
      <MultiClinicWorksBestWith />
      <MultiClinicCTA />
      <FeatureNav />
    </main>
  );
}
