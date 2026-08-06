'use client';

import dynamic from 'next/dynamic';

const ProductPreview = dynamic(() => import('@/components/ProductPreview/ProductPreview'));
const Testimonials = dynamic(() => import('@/components/Testimonials/Testimonials'));
const Security = dynamic(() => import('@/components/Security/Security'));
const Pricing = dynamic(() => import('@/components/Pricing/Pricing'));
const FAQ = dynamic(() => import('@/components/FAQ/FAQ'));
const FinalCTA = dynamic(() => import('@/components/FinalCTA/FinalCTA'));

export default function BelowFoldSections() {
  return (
    <>
      <ProductPreview />
      <Testimonials />
      <Security />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}