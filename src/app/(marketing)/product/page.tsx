import ProductHero from '@/components/ProductHero/ProductHero';
import ProductFeaturesGrid from '@/components/ProductFeaturesGrid/ProductFeaturesGrid';
import ProductFeatureDetails from '@/components/ProductFeatureDetails/ProductFeatureDetails';
import ProductStats from '@/components/ProductStats/ProductStats';
import ProductPreview from '@/components/ProductPreview/ProductPreview';
import FinalCTA from '@/components/FinalCTA/FinalCTA';

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-white">
      <ProductHero />
      <ProductFeaturesGrid />
      <ProductFeatureDetails />
      <ProductStats />
      <ProductPreview />
      <FinalCTA />
    </main>
  );
}
