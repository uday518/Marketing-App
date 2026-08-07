import QueueMgmtHero from '@/components/QueueMgmtHero/QueueMgmtHero';
import QueueMgmtSections from '@/components/QueueMgmtSections/QueueMgmtSections';
import QueueMgmtCapabilities from '@/components/QueueMgmtCapabilities/QueueMgmtCapabilities';
import QueueMgmtWorkflow from '@/components/QueueMgmtWorkflow/QueueMgmtWorkflow';
import QueueMgmtWorksBestWith from '@/components/QueueMgmtWorksBestWith/QueueMgmtWorksBestWith';
import QueueMgmtCTA from '@/components/QueueMgmtCTA/QueueMgmtCTA';
import FeatureNav from '@/components/FeatureNav/FeatureNav';

export default function QueueManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      <QueueMgmtHero />
      <QueueMgmtSections />
      <QueueMgmtCapabilities />
      <QueueMgmtWorkflow />
      <QueueMgmtWorksBestWith />
      <QueueMgmtCTA />
      <FeatureNav />
    </main>
  );
}
