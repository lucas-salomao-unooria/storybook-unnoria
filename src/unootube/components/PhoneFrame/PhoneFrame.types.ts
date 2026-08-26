import React from 'react';

/**
 * Os dois quadros de dispositivo em que o arquivo publica as telas móveis.
 *
 * - `iphone`: 390×844 (`1:115`, `3:196`, `16:860`)
 * - `android`: 360×800 (`1:801`, `3:676`, `16:1012`)
 *
 * As duas medidas são literais e não foram consolidadas: o arquivo desenha as
 * mesmas telas nas duas, e as diferenças de recuo aparecem nos componentes.
 */
export type UniPhoneDevice = 'iphone' | 'android';

/**
 * Propriedades da moldura de telefone.
 */
export interface UniPhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Quadro de dispositivo.
   * @default 'iphone'
   */
  device?: UniPhoneDevice;

  /**
   * Fundo do interior da moldura.
   * @default 'primary'
   */
  surface?: 'primary' | 'secondary' | 'immersive';

  /**
   * Escala aplicada à moldura, para caber em painéis de documentação estreitos.
   * @default 1
   */
  scale?: number;

  /** Conteúdo da tela. */
  children: React.ReactNode;

  /** Classe CSS adicional. */
  className?: string;
}
