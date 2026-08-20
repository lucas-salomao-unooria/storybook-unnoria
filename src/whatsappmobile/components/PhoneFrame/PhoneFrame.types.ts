import React from 'react';

/**
 * Propriedades do componente PhoneFrame do WhatsApp Mobile.
 */
export interface WaPhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Conteúdo da tela.
   */
  children?: React.ReactNode;

  /**
   * Legenda exibida abaixo do aparelho, usada nas estórias de telas compostas.
   */
  caption?: string;

  /**
   * Fator de escala aplicado ao aparelho, útil para exibir várias telas lado a
   * lado na documentação.
   * @default 1
   */
  scale?: number;

  /**
   * Desenha a moldura arredondada ao redor da tela.
   * @default true
   */
  bordered?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
