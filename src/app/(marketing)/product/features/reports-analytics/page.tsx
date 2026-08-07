import ReportsAnalyticsHero from '@/components/ReportsAnalyticsHero/ReportsAnalyticsHero';
import ReportsTypeSections from '@/components/ReportsTypeSections/ReportsTypeSections';
import ReportsCapabilities from '@/components/ReportsCapabilities/ReportsCapabilities';
import ReportsHowItWorks from '@/components/ReportsHowItWorks/ReportsHowItWorks';
import ReportsWorksBestWith from '@/components/ReportsWorksBestWith/ReportsWorksBestWith';
import ReportsCTA from '@/components/ReportsCTA/ReportsCTA';
import FeatureNav from '@/components/FeatureNav/FeatureNav';

export default function ReportsAnalyticsPage() {
  return (
    <main className="min-h-screen bg-white">
      <ReportsAnalyticsHero />
      <ReportsTypeSections />
      <ReportsCapabilities />
      <ReportsHowItWorks />
      <ReportsWorksBestWith />
      <ReportsCTA />
      <FeatureNav />
    </main>
  );
}
