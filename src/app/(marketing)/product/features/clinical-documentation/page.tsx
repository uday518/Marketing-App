import ClinDocsHero from '@/components/ClinDocsHero/ClinDocsHero';
import ClinDocsSections from '@/components/ClinDocsSections/ClinDocsSections';
import ClinDocsCapabilities from '@/components/ClinDocsCapabilities/ClinDocsCapabilities';
import ClinDocsWorkflow from '@/components/ClinDocsWorkflow/ClinDocsWorkflow';
import ClinDocsWorksBestWith from '@/components/ClinDocsWorksBestWith/ClinDocsWorksBestWith';
import ClinDocsCTA from '@/components/ClinDocsCTA/ClinDocsCTA';
import FeatureNav from '@/components/FeatureNav/FeatureNav';

export default function ClinicalDocumentationPage() {
  return (
    <main className="min-h-screen bg-white">
      <ClinDocsHero />
      <ClinDocsSections />
      <ClinDocsCapabilities />
      <ClinDocsWorkflow />
      <ClinDocsWorksBestWith />
      <ClinDocsCTA />
      <FeatureNav />
    </main>
  );
}
