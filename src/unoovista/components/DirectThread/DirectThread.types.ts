import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Propriedades do componente DirectThread do Unoovista.
 *
 * Extensão do módulo: a conversa aberta, com o cabeçalho em cartão, as
 * mensagens e o compositor em cápsula.
 *
 * A área de mensagens é um `role="log"`: mensagem nova é anunciada pelo leitor
 * de tela, e a rolagem acompanha a última enquanto a pessoa estiver no fim.
 */
export interface UnvDirectThreadProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Nome da outra pessoa. Título da conversa.
   */
  username: string;

  /**
   * URL do avatar da outra pessoa.
   */
  avatarSrc?: string;

  /**
   * Estado abaixo do nome — por exemplo "Ativa agora".
   */
  subtitle?: React.ReactNode;

  /**
   * Callback do botão de voltar. Sem ele, o botão não é renderizado.
   */
  onBack?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Rótulo acessível do botão de voltar.
   * @default 'Voltar'
   */
  backLabel?: string;

  /**
   * As mensagens — `MessageBubble`, `DmPoll` e o que mais a conversa tiver.
   */
  children?: React.ReactNode;

  /**
   * Rodapé fixo sob as mensagens, dentro da cápsula do compositor: um campo,
   * um botão de ação ou um compositor desabilitado.
   */
  footer?: React.ReactNode;

  /**
   * Reserva a altura da barra de status do sistema acima do cabeçalho, como a
   * `TopBar`. Desligue dentro do `PhoneFrame`, que já a desenha.
   * @default true
   */
  withStatusBarInset?: boolean;

  /**
   * Reserva, sob o rodapé, a faixa do indicador de início do aparelho.
   * @default true
   */
  withHomeIndicatorInset?: boolean;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem valor, herda o
   * tema do contêiner (`data-unv-theme`).
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
