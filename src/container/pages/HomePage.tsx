'use client';

import { Col, H1, Layout } from '@/components';
import { useTranslations } from 'next-intl';

export function HomePage(): JSX.Element {
  const tCommons = useTranslations('common');
  return (
    <Layout isNavClose={false}>
      <Col className='h-screen w-full items-center justify-center'>
        <H1>{tCommons('home.name')}</H1>
      </Col>
    </Layout>
  );
}
