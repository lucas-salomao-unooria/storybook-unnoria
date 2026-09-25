import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Propriedades do componente DirectThread do Instanooria.
 *
 * Extensão: a conversa de DM aberta. O arquivo de origem publica só a LISTA de
 * conversas (`0:768` / `0:2482`); a conversa aberta vem do app real, com a
 * barra, o avatar e a tipografia da lista.
 *
 * A área de mensagens é um `role="log"`: mensagem nova é anunciada pelo leitor
 * de tela, e a rolagem acompanha a última enquanto a pessoa estiver no fim.
 */
export interface InstaDirectThreadProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Nome de usuário da outra pessoa. Título da conversa.
   */
  username: string;

  /**
   * URL do avatar da outra pessoa.
   */
  avatarSrc?: string;

  /**
   * Linha abaixo do nome — por exemplo "Ativa agora".
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
   * Rodapé fixo sob as mensagens: um botão de ação ou um compositor
   * desabilitado.
   */
  footer?: React.ReactNode;

  /**
   * Reserva os 44px da status bar do iPhone X acima da barra, como a `TopBar`.
   * Desligue dentro do `PhoneFrame`, que já desenha a status bar.
   * @default true
   */
  withStatusBarInset?: boolean;

  /**
   * Reserva, sob o rodapé, a faixa do home indicator — a mesma da barra
   * "Camera" da lista de conversas (`0:2614`).
   * @default true
   */
  withHomeIndicatorInset?: boolean;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
