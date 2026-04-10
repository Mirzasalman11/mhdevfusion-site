import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: "MHDEVFUSION Services | Transform Your Business with Innovation",
  description: "Unlock your business’s potential with MHDEVFUSION’s web, mobile, AI, and marketing services—innovative solutions crafted to drive growth and real results.",
  keywords: "digital agency services, web development, mobile app solutions, AI services, digital marketing strategies, business growth, innovative solutions",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
