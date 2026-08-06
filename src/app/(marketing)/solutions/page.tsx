import SolutionsHero from '@/components/SolutionsHero/SolutionsHero';
import SolutionsRoles from '@/components/SolutionsRoles/SolutionsRoles';
import SolutionsCTA from '@/components/SolutionsCTA/SolutionsCTA';

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <SolutionsHero />
      <SolutionsRoles />
      <SolutionsCTA />
    </main>
  );
}
