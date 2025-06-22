import { useState, useEffect } from 'react';
import type { IconData } from '../types';

export const useIconList = (): IconData[] => {
  const [icons, setIcons] = useState<IconData[]>([]);

  useEffect(() => {
    const loadIcons = async () => {
      try {
        const pngModules = import.meta.glob('/public/icons/*.png', { 
          eager: true,
          as: 'url'
        });
        const jpgModules = import.meta.glob('/public/icons/*.jpg', { 
          eager: true,
          as: 'url'
        });
        const jpegModules = import.meta.glob('/public/icons/*.jpeg', { 
          eager: true,
          as: 'url'
        });
        const svgModules = import.meta.glob('/public/icons/*.svg', { 
          eager: true,
          as: 'url'
        });
        const gifModules = import.meta.glob('/public/icons/*.gif', { 
          eager: true,
          as: 'url'
        });
        const webpModules = import.meta.glob('/public/icons/*.webp', { 
          eager: true,
          as: 'url'
        });

        const allModules = {
          ...pngModules,
          ...jpgModules,
          ...jpegModules,
          ...svgModules,
          ...gifModules,
          ...webpModules
        };

        const iconList: IconData[] = Object.entries(allModules).map(([path, url]) => {
          const filename = path.split('/').pop() || '';
          const name = filename.replace(/\.[^/.]+$/, '');
          return {
            name,
            path: url as string
          };
        });

        setIcons(iconList.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.warn('Failed to load icons:', error);
        setIcons([]);
      }
    };

    loadIcons();
  }, []);

  return icons;
};