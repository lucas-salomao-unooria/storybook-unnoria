import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Propriedades do componente `Composer` do Design System UnooriaAI.
 *
 * Compositor translúcido de 760 × 56 que ancora a base da tela do cliente web,
 * com a trilha de quatro alvos: voz, anexo, campo e envio.
 */
export interface UaiComposerProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
  /** Texto do campo (uso controlado). */
  value?: string;

  /** Notifica cada alteração do texto. */
  onValueChange?: (value: string) => void;

  /**
   * Texto do placeholder.
   * @default 'Escreva uma mensagem'
   */
  placeholder?: string;

  /**
   * Chamado ao acionar o botão de enviar ou pressionar `Enter`, com o texto
   * atual do campo.
   */
  onSend?: (value: string) => void;

  /** Chamado ao acionar o alvo de entrada de voz. */
  onVoice?: () => void;

  /** Chamado ao acionar o alvo de anexar imagem. */
  onAttach?: () => void;

  /**
   * Substitui os dois alvos que antecedem o campo. Quando informado, `onVoice`
   * e `onAttach` são ignorados.
   */
  leadingActions?: React.ReactNode;

  /**
   * Oculta os dois alvos que antecedem o campo.
   * @default false
   */
  hideLeadingActions?: boolean;

  /** Rótulo acessível do alvo de voz. @default 'Entrada de voz' */
  voiceLabel?: string;

  /** Rótulo acessível do alvo de anexo. @default 'Anexar imagem' */
  attachLabel?: string;

  /** Rótulo acessível do alvo de envio. @default 'Enviar mensagem' */
  sendLabel?: string;

  /** Desabilita o campo e todos os alvos. @default false */
  disabled?: boolean;

  /** Torna o campo somente leitura — útil em vitrines. @default false */
  readOnly?: boolean;

  /**
   * Ocupa toda a largura disponível. Quando `false`, mantém os 760px de
   * largura do compositor.
   * @default false
   */
  block?: boolean;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /** Classe CSS adicional. */
  className?: string;
}

/**
 * Propriedades da doca `Composer.Dock` — a faixa com véu e desfoque de fundo
 * que fica atrás do compositor.
 */
export interface UaiComposerDockProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, herda o
   * tema do contêiner ancestral.
   */
  theme?: UaiTheme;
}
