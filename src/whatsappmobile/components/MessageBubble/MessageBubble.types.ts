import React from 'react';

/**
 * Direção do balão.
 * - 'out': mensagem enviada — `--wa-color-surface-bubble-out` (#054640) com
 *   cauda inferior direita, conforme o frame "Starred messages" (node 1:2931)
 * - 'in': mensagem recebida — `--wa-color-surface-bubble-in`. Desvio
 *   documentado: o arquivo de origem não publica um frame com balão recebido.
 */
export type WaMessageDirection = 'out' | 'in';

/**
 * Estado de entrega exibido no rodapé do balão.
 * - 'none': sem indicador
 * - 'sent': um tique em `--wa-color-icon-tick`
 * - 'read': dois tiques em `--wa-color-icon-tick`
 */
export type WaMessageDelivery = 'none' | 'sent' | 'read';

/**
 * Propriedades do componente MessageBubble do WhatsApp Mobile.
 */
export interface WaMessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Direção do balão.
   * @default 'out'
   */
  direction?: WaMessageDirection;

  /**
   * Conteúdo do balão. Aceita texto simples ou os subcomponentes
   * `MessageBubble.Media` e `MessageBubble.Document`.
   */
  children?: React.ReactNode;

  /**
   * Horário exibido no rodapé do balão.
   */
  time?: string;

  /**
   * Estado de entrega exibido ao lado do horário.
   * @default 'none'
   */
  delivery?: WaMessageDelivery;

  /**
   * Exibe a estrela de mensagem favoritada no rodapé.
   * @default false
   */
  starred?: boolean;

  /**
   * Desenha a cauda triangular na base do balão.
   * @default true
   */
  tail?: boolean;

  /**
   * Largura máxima do balão em pixels.
   * @default 240
   */
  maxWidth?: number;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades do subcomponente de mídia do balão.
 */
export interface WaMessageMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL da imagem anexada */
  src: string;
  /**
   * Texto alternativo. Obrigatório: a mídia de uma mensagem é conteúdo, não
   * decoração. Passe `alt=""` explicitamente se a imagem for redundante em
   * relação ao texto do balão.
   */
  alt: string;
  /** Proporção da miniatura, em formato CSS `aspect-ratio` */
  ratio?: string;
}

/**
 * Propriedades do subcomponente de documento do balão.
 */
export interface WaMessageDocumentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Nome do arquivo */
  name: string;
  /** Metadados exibidos abaixo, como "1090 pages" e "PDF" */
  details?: string[];
}
