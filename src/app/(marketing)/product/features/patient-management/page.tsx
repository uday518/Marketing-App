import PatientMgmtHero from '@/components/PatientMgmtHero/PatientMgmtHero';
import PatientMgmtSections from '@/components/PatientMgmtSections/PatientMgmtSections';
import PatientMgmtCapabilities from '@/components/PatientMgmtCapabilities/PatientMgmtCapabilities';
import PatientMgmtWorkflow from '@/components/PatientMgmtWorkflow/PatientMgmtWorkflow';
import PatientMgmtWorksBestWith from '@/components/PatientMgmtWorksBestWith/PatientMgmtWorksBestWith';
import PatientMgmtCTA from '@/components/PatientMgmtCTA/PatientMgmtCTA';
import FeatureNav from '@/components/FeatureNav/FeatureNav';

export default function PatientManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      <PatientMgmtHero />
      <PatientMgmtSections />
      <PatientMgmtCapabilities />
      <PatientMgmtWorkflow />
      <PatientMgmtWorksBestWith />
      <PatientMgmtCTA />
      <FeatureNav />
    </main>
  );
}
