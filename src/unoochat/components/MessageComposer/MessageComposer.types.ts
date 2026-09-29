import React from 'react';

/**
 * Propriedades do componente MessageComposer do Unoochat.
 */
export interface UncMessageComposerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Valor do campo de texto.
   */
  value?: string;

  /**
   * Texto de espaço reservado.
   * @default 'Digite uma mensagem'
   */
  placeholder?: string;

  /**
   * Callback de digitação.
   */
  onChange?: (value: string) => void;

  /**
   * Callback do seletor de emoji.
   */
  onEmoji?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback do clipe de anexo.
   */
  onAttach?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback do atalho de câmera.
   */
  onCamera?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback do botão de ação (microfone quando o campo está vazio).
   */
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Exibe o cursor sublinhado do campo, para a demonstração do foco.
   * @default false
   */
  focused?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
