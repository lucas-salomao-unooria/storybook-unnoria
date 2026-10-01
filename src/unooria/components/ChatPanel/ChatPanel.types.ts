import type React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Tamanho do painel.
 * - `compacto`: 400 x 640px no máximo, acima do `ChatLauncher`.
 * - `expandido`: até 960px (ou 90% da largura) x 85% da altura da janela, e
 *   desce até a borda — cobre o `ChatLauncher`, que fica embaixo dele.
 * Abaixo de 600px de largura, os dois viram quase tela cheia (8px de margem).
 */
export type ChatPanelSize = 'compacto' | 'expandido';

/**
 * Onde o painel fica.
 * - `bottom-right` (padrão) e `bottom-left`: fixo no canto da janela, do mesmo
 *   lado do `ChatLauncher`.
 * - `inline`: no fluxo do documento, com altura fixa — para documentação.
 */
export type ChatPanelPlacement = 'bottom-right' | 'bottom-left' | 'inline';

/**
 * Propriedades do `ChatPanel`, o painel NÃO modal do agente de IA do
 * professor: sem véu, sem prisão de foco — a página continua usável ao lado.
 *
 * Composição: cabeçalho (`avatar`, `title`, `subtitle`, `actions`), corpo
 * rolável (`children`, dentro do `ScrollBar`), rodapé (`footer`, o
 * `ChatComposer`) e, opcional, uma coluna lateral (`sidebar`, o `ChatHistory`).
 */
export interface ChatPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'role'> {
  /**
   * Aberto. Fechado, o painel continua montado com `hidden` — o rascunho do
   * compositor e a rolagem sobrevivem, e o `aria-controls` do `ChatLauncher`
   * aponta para um elemento que existe.
   * @default true
   */
  open?: boolean;

  /**
   * Tamanho.
   * @default 'compacto'
   */
  size?: ChatPanelSize;

  /**
   * Onde o painel fica.
   * @default 'bottom-right'
   */
  placement?: ChatPanelPlacement;

  /**
   * Fechar: o Esc (com o foco dentro do painel) chama isto. O botão de fechar
   * do cabeçalho é um `ChatPanelAction` em `actions`, que também o chama.
   */
  onClose?: () => void;

  /**
   * Esc fecha. Um filho que trata o próprio Esc (a confirmação do
   * `ChatHistory`) chama `preventDefault` e o painel não fecha.
   * @default true
   */
  closeOnEsc?: boolean;

  /** @default 'Agente de IA do professor' */
  title?: React.ReactNode;

  /** Linha sob o título ("Tire dúvidas sobre o material da rede"). */
  subtitle?: React.ReactNode;

  /**
   * O avatar do cabeçalho. Sem ele, o `AgentAvatar` `sm` (decorativo: o título
   * já diz quem é). `null` tira o avatar.
   */
  avatar?: React.ReactNode;

  /** Ações do cabeçalho, em geral `ChatPanelAction`s: nova conversa, histórico, expandir, fechar. */
  actions?: React.ReactNode;

  /** O corpo: as mensagens. Rola dentro do `ScrollBar`. */
  children?: React.ReactNode;

  /** O rodapé fixo: o `ChatComposer`. */
  footer?: React.ReactNode;

  /**
   * Coluna lateral (o `ChatHistory`). No `expandido`, fica à esquerda da
   * conversa, com 280px; no `compacto`, toma o lugar da conversa enquanto
   * `sidebarOpen`.
   */
  sidebar?: React.ReactNode;

  /**
   * A coluna lateral está à vista.
   * @default true (quando há `sidebar`)
   */
  sidebarOpen?: boolean;

  /**
   * Papel do painel.
   * @default 'complementary'
   */
  role?: 'complementary' | 'region';

  /**
   * Nome da área rolável das mensagens.
   * @default 'Mensagens da conversa'
   */
  bodyLabel?: string;

  /**
   * Acompanha o fim: quando o conteúdo cresce (uma resposta chegando) e a
   * pessoa está no fim, o corpo rola junto. Se ela subiu para reler, NÃO rola —
   * aparece o botão de ir ao fim.
   * @default true
   */
  stickToBottom?: boolean;

  /**
   * Força a rolagem até o fim quando MUDA — mesmo que a pessoa tenha subido.
   * Passe, por exemplo, o id da última mensagem do professor: enviar sempre
   * leva ao fim.
   */
  scrollToEndKey?: string | number;

  /** Avisa quando a pessoa chega ao fim do corpo ou sai dele. */
  onAtBottomChange?: (atBottom: boolean) => void;

  /**
   * Mostra o botão de ir ao fim quando a pessoa não está no fim.
   * @default true
   */
  showScrollToEnd?: boolean;

  /** @default 'Ir para a mensagem mais recente' */
  scrollToEndLabel?: string;

  /** Ref do elemento que rola (o `ScrollBar` do corpo). */
  bodyRef?: React.Ref<HTMLDivElement>;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;
}

/**
 * Propriedades do `ChatPanelAction`, um botão de ícone do cabeçalho do painel.
 */
export interface ChatPanelActionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** O glifo, pelo nome da ligadura do Material Symbols (quadro `6024:2923`). */
  icon: string;

  /** Nome acessível e texto do `Tooltip`. */
  label: string;

  /**
   * Botão de alternar (o histórico): vira `aria-pressed` e o fundo fica marcado.
   * Ausente: botão comum.
   */
  pressed?: boolean;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;
}
