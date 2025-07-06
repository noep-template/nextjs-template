/* eslint-disable indent */
'use client';
import { Col, FullPageLoader, H1, Layout } from '@/components';
import { projects } from '@/static/projects';

interface ProjectDetailProps {
  slug: string;
}

export function ProjectDetail({ slug }: ProjectDetailProps) {
  const project = projects.find((p) => p.slug === slug);

  return project ? (
    <Layout isNavClose={false}>
      <Col className='w-full h-screen flex items-center justify-center'>
        <H1>{project.id}</H1>
      </Col>
    </Layout>
  ) : (
    <FullPageLoader />
  );
}
