/**
 * Registro de glifos do Design System Unooblog.
 *
 * A biblioteca é a da Plataforma Unooria: **Material Symbols Rounded**, peso
 * 300, sem preenchimento, grade normal — a mesma do quadro de ícones da
 * plataforma (quadro `6024:2923`). Nada é desenhado à mão: cada entrada aponta
 * para o nome da ligadura da fonte (`ligature`), e todo nome usado aqui existe
 * no quadro, conferido em `src/unooria/tokens/figma_icons_node_6024_2923.json`.
 *
 * Substitutos, porque o quadro não publica o glifo: tema claro → `wb_sunny`,
 * desfazer → `replay`, expandir → `keyboard_arrow_down`,  * quadro também não publica `light_mode`, `expand_more` nem `bookmark_border`.
 *
 * A fonte é **de ligadura**: sem `fonts/unooblog.css` (ou o Material Symbols
 * carregado pelo consumidor), o texto da ligadura aparece no lugar do glifo.
 */

/**
 * Definição de um glifo do registro.
 */
export interface UblIconDefinition {
  /** Nome da ligadura no Material Symbols Rounded */
  ligature: string;
  /** Usa o eixo `FILL` = 1 (glifo preenchido) */
  filled?: boolean;
  /** Espelha o glifo no eixo horizontal */
  flipX?: boolean;
  /** Uso do glifo no produto */
  usage: string;
}

export const ublIcons = {
  /* ------------------------------------------------------------ Navegação */
  home: { ligature: 'home', usage: 'Início, em repouso.' },
  homeFilled: { ligature: 'home', filled: true, usage: 'Início, ativo.' },
  topics: { ligature: 'tag', usage: 'Tópicos.' },
  series: { ligature: 'menu_book', usage: 'Séries de posts.' },
  authors: { ligature: 'group', usage: 'Autores.' },
  article: { ligature: 'article', usage: 'Post.' },
  feed: { ligature: 'rss_feed', usage: 'Assinar o feed.' },
  menu: { ligature: 'menu', usage: 'Abrir a navegação no móvel.' },
  search: { ligature: 'search', usage: 'Campo de busca e abrir a busca.' },
  close: { ligature: 'close', usage: 'Fechar folhas, diálogos e limpar o campo.' },
  arrowBack: { ligature: 'arrow_back', usage: 'Voltar.' },
  arrowForward: { ligature: 'arrow_forward', usage: 'Seta de "Ler post" e de "Ver todos".' },
  chevronLeft: { ligature: 'chevron_left', usage: 'Página anterior e post anterior.' },
  chevronRight: { ligature: 'chevron_right', usage: 'Próxima página, próximo post e separador de trilha.' },
  chevronDown: { ligature: 'keyboard_arrow_down', usage: 'Expandir e alça de folha inferior.' },
  chevronUp: { ligature: 'keyboard_arrow_up', usage: 'Recolher e voltar ao topo.' },
  tableOfContents: { ligature: 'toc', usage: 'Sumário do post.' },

  /* ---------------------------------------------------------------- Ações */
  bookmark: { ligature: 'bookmark', usage: 'Salvar o post para ler depois, em repouso.' },
  bookmarkFilled: { ligature: 'bookmark', filled: true, usage: 'Post salvo.' },
  like: { ligature: 'favorite', usage: 'Curtir o post, em repouso.' },
  likeFilled: { ligature: 'favorite', filled: true, usage: 'Post curtido.' },
  thumbUp: { ligature: 'thumb_up', usage: 'Curtir um comentário, em repouso.' },
  thumbUpFilled: { ligature: 'thumb_up', filled: true, usage: 'Comentário curtido.' },
  comments: { ligature: 'chat_bubble', usage: 'Comentários.' },
  reply: { ligature: 'reply', usage: 'Responder a um comentário.' },
  send: { ligature: 'send', usage: 'Publicar o comentário.' },
  edit: { ligature: 'edit', usage: 'Editar o próprio comentário.' },
  delete: { ligature: 'delete', usage: 'Excluir o próprio comentário e remover dos salvos.' },
  share: { ligature: 'share', usage: 'Compartilhar o post.' },
  link: { ligature: 'link', usage: 'Copiar o endereço do post.' },
  copy: { ligature: 'content_copy', usage: 'Copiar o código.' },
  openInNew: { ligature: 'open_in_new', usage: 'Abrir em outra janela.' },
  undo: { ligature: 'replay', usage: 'Desfazer, no aviso passageiro.' },
  add: { ligature: 'add', usage: 'Aumentar o texto e adicionar.' },
  remove: { ligature: 'remove', usage: 'Diminuir o texto.' },
  check: { ligature: 'check', usage: 'Confirmação e item marcado.' },
  follow: { ligature: 'person_add', usage: 'Seguir o autor.' },
  following: { ligature: 'check', usage: 'Autor seguido.' },
  moreHorizontal: { ligature: 'more_horiz', usage: 'Mais ações.' },
  filter: { ligature: 'filter_list', usage: 'Filtros no móvel.' },
  sort: { ligature: 'sort', usage: 'Ordenar a lista.' },

  /* ------------------------------------------------------------- Conteúdo */
  schedule: { ligature: 'schedule', usage: 'Tempo de leitura.' },
  calendar: { ligature: 'calendar_month', usage: 'Data de publicação.' },
  history: { ligature: 'history', usage: 'Posts lidos recentemente.' },
  views: { ligature: 'visibility', usage: 'Visualizações.' },
  person: { ligature: 'person', usage: 'Autoria sem retrato.' },
  mail: { ligature: 'mail', usage: 'Newsletter e contato.' },
  notifications: { ligature: 'notifications', usage: 'Avisos de novos posts.' },
  code: { ligature: 'code', usage: 'Bloco de código.' },
  quote: { ligature: 'format_quote', usage: 'Citação.' },
  textSize: { ligature: 'format_size', usage: 'Tamanho do texto do post.' },
  tip: { ligature: 'lightbulb', usage: 'Aviso do tipo dica.' },
  info: { ligature: 'info', usage: 'Aviso informativo.' },
  warning: { ligature: 'warning', usage: 'Aviso de atenção.' },
  error: { ligature: 'error', usage: 'Erro de campo.' },
  checkCircle: { ligature: 'check_circle', filled: true, usage: 'Inscrição confirmada.' },
  lock: { ligature: 'lock', usage: 'Conteúdo restrito.' },
  explore: { ligature: 'explore', usage: 'Descobrir tópicos.' },

  /* ----------------------------------------------------------------- Tema */
  darkMode: { ligature: 'dark_mode', usage: 'Alternar para o tema escuro.' },
  lightMode: { ligature: 'wb_sunny', usage: 'Alternar para o tema claro.' },

  /* ---------------------------------------- Barra de status do aparelho */
  signal: { ligature: 'signal_cellular_alt', usage: 'Sinal móvel na barra de status do aparelho.' },
  wifi: { ligature: 'signal_wifi_4_bar', filled: true, usage: 'Conexão sem fio na barra de status do aparelho.' },
  batteryHigh: { ligature: 'battery_horiz_075', filled: true, usage: 'Bateria acima de 60% na barra de status.' },
  batteryMedium: { ligature: 'battery_horiz_050', filled: true, usage: 'Bateria entre 30% e 60% na barra de status.' },
  batteryLow: { ligature: 'battery_horiz_000', filled: true, usage: 'Bateria abaixo de 30% na barra de status.' },
} as const satisfies Record<string, UblIconDefinition>;

/**
 * Nome de um glifo do registro.
 */
export type UblIconName = keyof typeof ublIcons;

/**
 * Todos os nomes do registro, na ordem de declaração.
 */
export const ublIconNames = Object.keys(ublIcons) as UblIconName[];
