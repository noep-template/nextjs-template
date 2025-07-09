/* eslint-disable indent */
'use client';
import { FullPageLoader } from '@/components/Loaders/FullPageLoader';
import { cn } from '@/services/utils';
import { projects } from '@/static/projects';
import { FLEX_CLASSES, TEXT_CLASSES } from '@/static/styles/tailwind-classes';
import { Layout } from '../utils/Layout';

interface ProjectDetailProps {
  slug: string;
}

export function ProjectDetail({ slug }: ProjectDetailProps) {
  const project = projects.find((p) => p.slug === slug);

  return project ? (
    <Layout>
      <div
        className={cn(
          FLEX_CLASSES.col,
          'w-full h-screen flex items-center justify-center'
        )}
      >
        <h1 className={TEXT_CLASSES.h1}>{project.id}</h1>
      </div>
    </Layout>
  ) : (
    <FullPageLoader />
  );
}
