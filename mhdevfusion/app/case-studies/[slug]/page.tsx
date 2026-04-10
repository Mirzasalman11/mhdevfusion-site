import { Metadata } from 'next';
import { projects } from '@/lib/data/projects';
import CaseStudyDetailClient from './CaseStudyDetailClient';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.meta.slug === slug || p.id === slug);

  if (!project || !project.seo) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.seo.title,
    description: project.seo.description,
    keywords: project.seo.keywords,
  }
}

export default function CaseStudyDetailPage({ params }: Props) {
  return <CaseStudyDetailClient params={params} />;
}
