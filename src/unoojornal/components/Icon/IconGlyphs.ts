/**
 * Registro de glifos do Design System Unoojornal.
 *
 * A biblioteca é a da Plataforma Unooria: **Material Symbols Rounded**, peso
 * 300, sem preenchimento, grade normal — a mesma do quadro de ícones da
 * plataforma (quadro `6024:2923`). Nada é desenhado à mão: cada entrada aponta
 * para o nome da ligadura da fonte (`ligature`), e todo nome usado aqui existe
 * no quadro, conferido em `src/unooria/tokens/figma_icons_node_6024_2923.json`.
 *
 * Substitutos, porque o quadro não publica o glifo: desfazer → `replay`,
 * expandir → `keyboard_arrow_down`, tema claro → `wb_sunny`. O quadro também não
 * publica `light_mode`, `expand_more`, `bookmark_border` nem `text_increase`.
 *
 * A fonte é **de ligadura**: sem `fonts/unoojornal.css` (ou o Material Symbols
 * carregado pelo consumidor), o texto da ligadura aparece no lugar do glifo.
 */

/**
 * Definição de um glifo do registro.
 */
export interface UjnIconDefinition {
  /** Nome da ligadura no Material Symbols Rounded */
  ligature: string;
  /** Usa o eixo `FILL` = 1 (glifo preenchido) */
  filled?: boolean;
  /** Espelha o glifo no eixo horizontal */
  flipX?: boolean;
  /** Uso do glifo no produto */
  usage: string;
}

export const ujnIcons = {
  /* ------------------------------------------------------------ Navegação */
  home: { ligature: 'home', usage: 'Início (capa), em repouso.' },
  homeFilled: { ligature: 'home', filled: true, usage: 'Início (capa), ativo.' },
  latest: { ligature: 'article', usage: 'Últimas notícias, em repouso.' },
  latestFilled: { ligature: 'article', filled: true, usage: 'Últimas notícias, ativo.' },
  opinion: { ligature: 'campaign', usage: 'Opinião, em repouso.' },
  opinionFilled: { ligature: 'campaign', filled: true, usage: 'Opinião, ativo.' },
  agenda: { ligature: 'event', usage: 'Agenda, em repouso.' },
  agendaFilled: { ligature: 'event', filled: true, usage: 'Agenda, ativo.' },
  gallery: { ligature: 'photo_library', usage: 'Galeria, em repouso.' },
  galleryFilled: { ligature: 'photo_library', filled: true, usage: 'Galeria, ativo.' },
  menu: { ligature: 'menu', usage: 'Abrir a navegação no móvel.' },
  search: { ligature: 'search', usage: 'Campo de busca e abrir a busca.' },
  close: { ligature: 'close', usage: 'Fechar folhas, diálogos e limpar o campo.' },
  arrowBack: { ligature: 'arrow_back', usage: '"Voltar para a capa" na barra da matéria.' },
  arrowForward: { ligature: 'arrow_forward', usage: 'Seta de "Ver todas as fotos" e de "Ler mais".' },
  chevronLeft: { ligature: 'chevron_left', usage: 'Página anterior na paginação.' },
  chevronRight: { ligature: 'chevron_right', usage: 'Próxima página na paginação.' },
  chevronDown: { ligature: 'keyboard_arrow_down', usage: 'Expandir e alça de folha inferior.' },
  chevronUp: { ligature: 'keyboard_arrow_up', usage: 'Recolher.' },

  /* ---------------------------------------------------------------- Ações */
  bookmark: { ligature: 'bookmark', usage: 'Salvar a matéria para ler depois, em repouso.' },
  bookmarkFilled: { ligature: 'bookmark', filled: true, usage: 'Matéria salva.' },
  share: { ligature: 'share', usage: 'Compartilhar a matéria.' },
  link: { ligature: 'link', usage: 'Copiar o endereço da matéria.' },
  copy: { ligature: 'content_copy', usage: 'Copiar texto.' },
  print: { ligature: 'print', usage: 'Imprimir a matéria.' },
  openInNew: { ligature: 'open_in_new', usage: 'Abrir em outra janela.' },
  send: { ligature: 'send', usage: 'Enviar a carta à redação.' },
  undo: { ligature: 'replay', usage: 'Desfazer, no aviso passageiro.' },
  add: { ligature: 'add', usage: 'Aumentar o texto.' },
  remove: { ligature: 'remove', usage: 'Diminuir o texto.' },
  edit: { ligature: 'edit', usage: 'Escrever uma carta.' },
  delete: { ligature: 'delete', usage: 'Excluir das matérias salvas.' },
  check: { ligature: 'check', usage: 'Confirmação e item marcado.' },
  filter: { ligature: 'filter_list', usage: 'Filtros no móvel.' },
  sort: { ligature: 'sort', usage: 'Ordenar a lista.' },
  moreHorizontal: { ligature: 'more_horiz', usage: 'Mais ações.' },

  /* ------------------------------------------------------------- Conteúdo */
  schedule: { ligature: 'schedule', usage: 'Tempo de leitura.' },
  calendar: { ligature: 'calendar_month', usage: 'Data da edição.' },
  history: { ligature: 'history', usage: 'Matérias lidas recentemente.' },
  person: { ligature: 'person', usage: 'Autoria sem retrato.' },
  group: { ligature: 'group', usage: 'Equipe da redação.' },
  mail: { ligature: 'mail', usage: 'Contato e correções.' },
  letters: { ligature: 'forum', usage: 'Cartas à redação.' },
  quote: { ligature: 'format_quote', usage: 'Citação em destaque.' },
  textSize: { ligature: 'format_size', usage: 'Tamanho do texto da matéria.' },
  edition: { ligature: 'menu_book', usage: 'Edição do jornal.' },
  info: { ligature: 'info', usage: 'Aviso informativo.' },
  warning: { ligature: 'warning', usage: 'Nota de correção.' },
  error: { ligature: 'error', usage: 'Erro de campo.' },
  checkCircle: { ligature: 'check_circle', filled: true, usage: 'Carta enviada com sucesso.' },
  lock: { ligature: 'lock', usage: 'Conteúdo restrito.' },

  /* ----------------------------------------------------------------- Tema */
  darkMode: { ligature: 'dark_mode', usage: 'Alternar para o tema escuro.' },
  lightMode: { ligature: 'wb_sunny', usage: 'Alternar para o tema claro.' },

  /* ---------------------------------------- Barra de status do aparelho */
  signal: { ligature: 'signal_cellular_alt', usage: 'Sinal móvel na barra de status do aparelho.' },
  wifi: { ligature: 'signal_wifi_4_bar', filled: true, usage: 'Conexão sem fio na barra de status do aparelho.' },
  batteryHigh: { ligature: 'battery_horiz_075', filled: true, usage: 'Bateria acima de 60% na barra de status.' },
  batteryMedium: { ligature: 'battery_horiz_050', filled: true, usage: 'Bateria entre 30% e 60% na barra de status.' },
  batteryLow: { ligature: 'battery_horiz_000', filled: true, usage: 'Bateria abaixo de 30% na barra de status.' },
} as const satisfies Record<string, UjnIconDefinition>;

/**
 * Nome de um glifo do registro.
 */
export type UjnIconName = keyof typeof ujnIcons;

/**
 * Todos os nomes do registro, na ordem de declaração.
 */
export const ujnIconNames = Object.keys(ujnIcons) as UjnIconName[];
