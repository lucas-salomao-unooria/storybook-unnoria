/**
 * Glifos tipográficos do Design System ChatGPT.
 *
 * O arquivo de design **não possui uma biblioteca de ícones vetoriais**: os
 * componentes da página `🟡 Design system` usam caracteres tipográficos como
 * ícone (camadas TEXT com Inter Regular). Estes são os caracteres literais
 * lidos dessas camadas — reproduzi-los é o caminho fiel, e evita desenhar
 * vetores que não existem no arquivo.
 */
export const gptGlyphs = {
  /** `✕` — fechar (IconButton/Default, Modal.Header) */
  close: '✕',
  /** `→` — avançar (IconButton/Primary) */
  arrowRight: '→',
  /** `↑` — enviar mensagem (ChatInput.SendButton) */
  send: '↑',
  /** `✦` — sugestão de prompt (Tag) */
  sparkle: '✦',
  /** `⌕` — busca (SearchInput) */
  search: '⌕',
  /** `+` — nova conversa (Sidebar.NewChatButton) */
  plus: '+',
  /** `💬` — conversa (NavItem) */
  chat: '💬',
} as const;

/**
 * Nome de um glifo disponível.
 */
export type GptGlyphName = keyof typeof gptGlyphs;
