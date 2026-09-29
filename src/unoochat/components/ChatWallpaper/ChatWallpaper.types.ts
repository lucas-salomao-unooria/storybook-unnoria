import React from 'react';

/**
 * Propriedades do componente ChatWallpaper do Unoochat.
 */
export interface UncChatWallpaperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * URL da textura de fundo — uma imagem rasterizada de rabiscos, que se
   * repete em ladrilhos de 320px.
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
