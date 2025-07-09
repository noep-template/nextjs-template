/* eslint-disable indent */
'use client';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/services/routes';
import { cn } from '@/services/utils';
import { projects } from '@/static/projects';
import { FLEX_CLASSES, TEXT_CLASSES } from '@/static/styles/tailwind-classes';
import { useRouter } from 'next/navigation';
import { Layout } from '../utils/Layout';

export function ProjectsPage(): React.JSX.Element {
  const router = useRouter();

  return (
    <Layout>
      <div
        className={cn(
          FLEX_CLASSES.col,
          'w-full h-screen items-center justify-center'
        )}
      >
        <h1 className={TEXT_CLASSES.h1}>{'Projects Page'}</h1>
        {projects.map((project) => (
          <Button
            key={project.slug}
            className='mt-4'
            variant='outline'
            onClick={() => router.push(ROUTES.projects.project(project.slug))}
          >
            {project.id}
          </Button>
        ))}
      </div>
    </Layout>
  );
}
