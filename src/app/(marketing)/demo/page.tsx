import type { Metadata } from 'next';
import DemoPageContent from './DemoPageContent';

export const metadata: Metadata = {
  title: 'Book a Demo | mysaas',
  description: 'See how mysaas can transform your dental practice. Book a personalized walkthrough with our team.',
};

export default function DemoPage() {
  return <DemoPageContent />;
}
