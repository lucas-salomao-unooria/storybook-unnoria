import React from 'react';

/**
 * Propriedades do componente ChatWallpaper do WhatsApp Mobile.
 */
export interface WaChatWallpaperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * URL da textura de fundo. O arquivo de origem usa uma imagem rasterizada de
   * rabiscos, exportada do frame "Direct Message" (node 1:2974).
   */
  src?: string;

  /**
   * Conteúdo empilhado sobre a textura.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
