import StaffMgmtHero from '@/components/StaffMgmtHero/StaffMgmtHero';
import StaffMgmtSections from '@/components/StaffMgmtSections/StaffMgmtSections';
import StaffMgmtCapabilities from '@/components/StaffMgmtCapabilities/StaffMgmtCapabilities';
import StaffMgmtHowItWorks from '@/components/StaffMgmtHowItWorks/StaffMgmtHowItWorks';
import StaffMgmtWorksBestWith from '@/components/StaffMgmtWorksBestWith/StaffMgmtWorksBestWith';
import StaffMgmtCTA from '@/components/StaffMgmtCTA/StaffMgmtCTA';
import FeatureNav from '@/components/FeatureNav/FeatureNav';

export default function StaffManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      <StaffMgmtHero />
      <StaffMgmtSections />
      <StaffMgmtCapabilities />
      <StaffMgmtHowItWorks />
      <StaffMgmtWorksBestWith />
      <StaffMgmtCTA />
      <FeatureNav />
    </main>
  );
}
