import { Metadata } from 'next';
import { services } from '@/lib/data';
import ServiceDetailClient from './ServiceDetailClient';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service || !service.seo) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
  }
}

export default function ServiceDetailPage({ params }: Props) {
  return <ServiceDetailClient params={params} />;
}
