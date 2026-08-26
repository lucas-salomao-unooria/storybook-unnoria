import React from 'react';
import { getDemoVideo, resolveBlobDuration, type UniDemoVideoOrientation } from './demoVideo';

export type { UniDemoVideoOrientation };
export { resolveBlobDuration };

/**
 * Entrega o vídeo de demonstração sintético à estória.
 *
 * Devolve `undefined` no primeiro render — e permanentemente, se o navegador
 * não gravar vídeo. Os reprodutores tratam a ausência de fonte como réplica
 * estática, então a estória renderiza corretamente nos dois casos.
 */
export const useDemoVideo = (
  orientation: UniDemoVideoOrientation = 'landscape'
): string | undefined => {
  const [src, setSrc] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    let alive = true;
    void getDemoVideo(orientation).then((value) => {
      if (alive) setSrc(value);
    });
    return () => {
      alive = false;
    };
  }, [orientation]);

  return src;
};
