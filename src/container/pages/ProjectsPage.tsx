/* eslint-disable indent */
'use client';
import { Col, H1, Layout } from '@/components';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';
import { projects } from '@/static/projects';
import { useRouter } from 'next/navigation';

export function ProjectsPage(): React.JSX.Element {
  const router = useRouter();

  return (
    <Layout isNavClose={false}>
      <Col className='w-full h-screen items-center justify-center'>
        <H1>{'Projects Page'}</H1>
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
      </Col>
    </Layout>
  );
}
