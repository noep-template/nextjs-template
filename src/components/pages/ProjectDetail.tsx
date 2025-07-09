/* eslint-disable indent */
'use client';
import { FullPageLoader } from '@/components/Loaders/FullPageLoader';
import { cn } from '@/services/utils';
import { projects } from '@/static/projects';
import { FLEX_CLASSES, TEXT_CLASSES } from '@/static/styles/tailwind-classes';
import { useTranslations } from 'next-intl';
import { Layout } from '../utils/Layout';

interface ProjectDetailProps {
  slug: string;
}

export function ProjectDetail({ slug }: ProjectDetailProps) {
  const project = projects.find((p) => p.slug === slug);
  const tProjects = useTranslations('projects');

  return project ? (
    <Layout>
      <div
        className={cn(
          FLEX_CLASSES.col,
          'w-full h-screen flex items-center justify-center gap-4'
        )}
      >
        <h1 className={TEXT_CLASSES.h1}>{tProjects(project.title)}</h1>
        <p className={TEXT_CLASSES.p16}>{tProjects(project.description)}</p>
        <p className={TEXT_CLASSES.p16}>{project.id}</p>
      </div>
    </Layout>
  ) : (
    <FullPageLoader />
  );
}
