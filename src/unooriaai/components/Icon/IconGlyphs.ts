/**
 * Registro de glifos do Design System UnooriaAI.
 *
 * A biblioteca é a da Plataforma Unooria: **Material Symbols Rounded**, peso
 * 300, sem preenchimento, grade normal — a mesma do quadro de ícones da
 * plataforma (`src/unooria`, quadro `6024:2923`). Nada é desenhado à mão: cada
 * entrada aponta para o nome da ligadura da fonte (`ligature`), e todo nome
 * usado aqui existe no quadro.
 *
 * A fonte é **de ligadura**: sem `fonts/unooriaai.css` (ou o Material Symbols
 * carregado pelo consumidor), o texto da ligadura aparece no lugar do glifo.
 *
 * Os treze primeiros nomes (`microphone` … `shieldWarning`) são o vocabulário
 * histórico do módulo; os seis seguintes (`close` … `chatBubble`) substituem os
 * caracteres tipográficos que os slots de glifo usavam (`✕ → ↑ ✦ ⌕ 💬`).
 */

/**
 * Definição de um glifo do registro.
 */
export interface UaiIconDefinition {
  /** Nome da ligadura no Material Symbols Rounded */
  ligature: string;
  /** Usa o eixo `FILL` = 1 (glifo preenchido) */
  filled?: boolean;
  /** Uso do glifo no produto */
  usage: string;
}

export const uaiIcons = {
  microphone: { ligature: 'mic', usage: 'Entrada por voz no compositor de mensagens.' },
  image: { ligature: 'photo', usage: 'Anexar imagem no compositor de mensagens.' },
  paperPlaneRight: { ligature: 'send', usage: 'Enviar a mensagem do compositor.' },
  add: { ligature: 'add', usage: 'Iniciar uma nova conversa (botão da barra lateral).' },
  chatText: { ligature: 'chat', usage: 'Linha de conversa na barra lateral.' },
  trash: { ligature: 'delete', usage: 'Excluir conversas ou dados, na barra lateral e nas configurações.' },
  sun: { ligature: 'wb_sunny', usage: 'Alternar aparência e tema, na barra lateral e nas configurações.' },
  user: { ligature: 'person', usage: 'Perfil e conta da pessoa usuária.' },
  arrowSquareOut: { ligature: 'open_in_new', usage: 'Item que abre uma página ou serviço externo.' },
  signOut: { ligature: 'logout', usage: 'Sair da conta.' },
  chats: { ligature: 'forum', usage: 'Exemplos de perguntas, cabeçalho de coluna de tópicos.' },
  stars: { ligature: 'stars', filled: true, usage: 'Capacidades do assistente, cabeçalho de coluna de tópicos.' },
  shieldWarning: { ligature: 'gpp_maybe', usage: 'Limitações e avisos de segurança, cabeçalho de coluna de tópicos.' },
  close: { ligature: 'close', usage: 'Fechar diálogo ou painel (`Modal`, `IconButton`).' },
  arrowForward: { ligature: 'arrow_forward', usage: 'Avançar ou continuar (`IconButton` primário).' },
  arrowUpward: { ligature: 'arrow_upward', usage: 'Enviar mensagem no `ChatInput`.' },
  sparkle: { ligature: 'flare', usage: 'Sugestão de comando (`Tag`).' },
  search: { ligature: 'search', usage: 'Campo de busca (`SearchInput`).' },
  chatBubble: { ligature: 'chat_bubble', usage: 'Conversa na navegação (`NavItem`).' },
} as const satisfies Record<string, UaiIconDefinition>;

/**
 * Nomes de todos os glifos disponíveis.
 */
export type UaiIconName = keyof typeof uaiIcons;

/**
 * Lista dos nomes, na ordem do registro.
 */
export const uaiIconNames = Object.keys(uaiIcons) as UaiIconName[];
