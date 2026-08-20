import React from 'react';

/**
 * Propriedades do botão de inscrição do Unitube.
 *
 * Reproduz o nó `Channel/Subscribes-Btn`, publicado tanto no cabeçalho de canal
 * (`17:2796`) quanto na descrição do vídeo (`20:2989`), com a mesma geometria
 * nos dois lugares: 116×36, recuo 10/16, raio de 2px e preenchimento
 * `--uni-color-brand-subscribe`.
 */
export interface UniSubscribeButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Rótulo do botão.
   * @default 'Subscribes'
   */
  label?: React.ReactNode;

  /**
   * Marca o canal como já inscrito. O arquivo publica **apenas** o estado não
   * inscrito; o estado inscrito é uma extensão registrada como desvio, montada
   * com `--uni-color-background-surface` e o texto secundário.
   * @default false
   */
  subscribed?: boolean;

  /**
   * Rótulo exibido quando `subscribed` é verdadeiro.
   * @default 'Subscribed'
   */
  subscribedLabel?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
