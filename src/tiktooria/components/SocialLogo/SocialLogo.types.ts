import React from 'react';

/**
 * Logotipos de terceiros presentes no arquivo de design.
 *
 * A paleta destes logotipos é exclusiva da folha de compartilhamento e da tela
 * "Find friends"; é proibido reaproveitá-la em qualquer outro componente.
 */
export type TikSocialBrand =
  | 'whatsapp'
  | 'messenger'
  | 'message'
  | 'sms'
  | 'instagram'
  | 'facebook';

/**
 * Propriedades do logotipo de terceiro.
 */
export interface TikSocialLogoProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Marca representada.
   */
  brand: TikSocialBrand;

  /**
   * Diâmetro em pixels. O arquivo usa 47px (WhatsApp, Messenger), 49px
   * (Message, SMS, Instagram) e 54px (Facebook).
   * @default 47
   */
  size?: number;

  /**
   * Rótulo acessível. Quando omitido, o logotipo é tratado como decorativo.
   */
  title?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
