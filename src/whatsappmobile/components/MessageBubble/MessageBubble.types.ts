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
   * Nome de quem escreveu, exibido no topo do balão recebido em conversa de
   * grupo. Extensão: o arquivo de origem não publica conversa de grupo.
   */
  sender?: React.ReactNode;

  /**
   * Rótulo da mensagem encaminhada, exibido acima do conteúdo com o glifo
   * `forward` — por exemplo, "Encaminhada". Ausente, o selo não aparece.
   * Extensão: o arquivo de origem não publica mensagem encaminhada.
   */
  forwardedLabel?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades do subcomponente de mídia do balão.
 *
 * Duas formas: com `src`, a imagem anexada; sem `src`, os `children` ocupam a
 * moldura — a mídia DESENHADA (um comunicado composto a partir do texto, uma
 * ilustração em SVG) para o produto que não serve arquivo de imagem. Com
 * `onClick`, qualquer das duas vira botão.
 */
export interface WaMessageMediaProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  /** URL da imagem anexada. Ausente, a moldura exibe os `children`. */
  src?: string;
  /**
   * Texto alternativo. Obrigatório: a mídia de uma mensagem é conteúdo, não
   * decoração. Passe `alt=""` explicitamente se a imagem for redundante em
   * relação ao texto do balão. Sem `src`, vira o nome acessível da moldura.
   */
  alt: string;
  /** Proporção da miniatura, em formato CSS `aspect-ratio` */
  ratio?: string;
  /** Conteúdo desenhado exibido na moldura quando não há `src`. */
  children?: React.ReactNode;
  /**
   * Callback de toque na mídia (abrir em tela cheia). Quando informado, a
   * moldura é renderizada como `<button>` — acionável por Enter e Espaço —,
   * como a `LinkPreview`.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Nome acessível da AÇÃO, quando há `onClick` — como "Abrir imagem de Pedro".
   * Ausente, o botão se anuncia pelo `alt`.
   */
  actionLabel?: string;
}

/**
 * Propriedades do subcomponente de pré-visualização de link.
 */
export interface WaMessageLinkPreviewProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'onClick'> {
  /** Manchete da página. */
  title: React.ReactNode;
  /** Resumo exibido abaixo da manchete. */
  description?: React.ReactNode;
  /** Domínio exibido no rodapé do cartão, como "noticiaslocais.edu.br". */
  domain: React.ReactNode;
  /** Miniatura desenhada ou imagem, exibida acima da manchete. */
  thumbnail?: React.ReactNode;
  /**
   * Callback de toque no cartão. Quando informado, o cartão é renderizado
   * como `<button>` — acionável por Enter e Espaço.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Propriedades do subcomponente de convite para grupo.
 */
export interface WaMessageInviteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Nome do grupo. */
  title: React.ReactNode;
  /** Linha abaixo do nome, como "Convite para grupo de conversa". */
  subtitle?: React.ReactNode;
  /** Avatar do grupo. Ausente, exibe as iniciais de `initials`. */
  avatarSrc?: string;
  /** Iniciais usadas quando não há avatar. */
  initials?: string;
  /** Rótulo do botão de entrar. */
  actionLabel: React.ReactNode;
  /** Callback do botão de entrar. */
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Desabilita o botão de entrar. */
  actionDisabled?: boolean;
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
