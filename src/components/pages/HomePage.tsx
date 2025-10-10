'use client';

import { cn } from '@/services/utils';
import { FLEX_CLASSES, TEXT_CLASSES } from '@/static/styles/tailwind-classes';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Image } from '../Medias/Image';
import { ImagesFullScreen } from '../Medias/ImagesFullScreen';
import { NavKeys } from '../NavBar';
import { Button } from '../ui/button';
import { Layout } from '../utils/Layout';

export function HomePage(): React.JSX.Element {
  const tCommons = useTranslations('common');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Exemple d'images pour la galerie
  const exampleImages = ['/logo.webP', '/logos/logo_192x192.webp', '/logos/logo_512x512.webp'];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <Layout>
      <div
        id={NavKeys.HOME}
        className={cn(FLEX_CLASSES.col, 'h-screen w-full items-center justify-center gap-8')}
      >
        <h1 className={TEXT_CLASSES.h1}>{tCommons('home.name')}</h1>

        {/* Section d'exemple avec galerie d'images */}
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            {exampleImages.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={image}
                  alt={`Image exemple ${index + 1}`}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {tCommons('home.fullscreen')}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <p className={cn(TEXT_CLASSES.p14, 'text-sm text-muted-foreground text-center max-w-md')}>
            {tCommons('home.description')}
          </p>
        </div>
      </div>

      {/* Composant ImagesFullScreen */}
      <ImagesFullScreen
        images={exampleImages}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={selectedImageIndex}
        projectName="exemple-galerie"
      />
    </Layout>
  );
}
