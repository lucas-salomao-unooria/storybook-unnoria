import React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Propriedades do componente CommentComposer da Unooblog.
 *
 * Os atributos nativos de `<form>` (`id`, `aria-*`, `data-*`…) vão para a raiz,
 * que é também quem recebe a `ref`; `className`, `style` e `theme` também.
 */
export interface UblCommentComposerProps
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'onChange' | 'defaultValue' | 'name'
  > {
  /**
   * Retrato de quem comenta. Sem ele, o avatar mostra as iniciais de `name`.
   */
  avatarSrc?: string;

  /**
   * Nome de quem comenta (origem das iniciais do avatar).
   * @default 'Você'
   */
  name?: string;

  /**
   * Texto de exemplo do campo vazio.
   * @default 'Escreva um comentário'
   */
  placeholder?: string;

  /**
   * Texto (modo controlado). Só é repassado ao campo nativo quando definido
   * (AGENTS.md, 4.5.1); sem ele, o texto mora no DOM. Em modo controlado, quem
   * limpa o campo após o envio é o consumidor.
   */
  value?: string;

  /**
   * Texto inicial (modo não controlado).
   */
  defaultValue?: string;

  /**
   * Chamado a cada alteração do texto, com o texto já limitado.
   */
  onValueChange?: (text: string) => void;

  /**
   * Chamado ao enviar (clique em “Comentar” ou Ctrl/⌘ + Enter) com o texto
   * aparado. Não é chamado com o texto vazio, só de espaços ou acima do limite.
   * Em modo não controlado, o campo é limpo em seguida e o foco volta a ele.
   */
  onSubmit?: (text: string) => void;

  /**
   * Chamado ao cancelar. Quando existe, o botão “Cancelar” aparece.
   */
  onCancel?: () => void;

  /**
   * Limite de caracteres, contado em **code points** (um emoji conta um). O
   * campo não usa os atributos nativos de limite, que medem UTF-16.
   * @default 1000
   */
  maxLength?: number;

  /**
   * Rótulo do botão de enviar.
   * @default 'Comentar'
   */
  submitLabel?: string;

  /**
   * Rótulo do botão de cancelar.
   * @default 'Cancelar'
   */
  cancelLabel?: string;

  /**
   * Nome de quem está sendo respondido. O rótulo do campo passa a ser
   * “Respondendo a <nome>”.
   */
  replyingTo?: string;

  /**
   * Texto de apoio abaixo do campo. Passe `null` para suprimi-lo.
   * @default 'Ctrl ou ⌘ + Enter para enviar.'
   */
  hint?: React.ReactNode;

  /**
   * Mensagem de erro do envio (por exemplo, falha de rede). Substitui o apoio.
   */
  error?: React.ReactNode;

  /**
   * Linhas visíveis da área de texto.
   * @default 3
   */
  rows?: number;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
