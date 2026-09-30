/**
 * Registro de glifos do Design System Unoogaleria.
 *
 * A biblioteca é a da Plataforma Unooria: **Material Symbols Rounded**, peso
 * 300, sem preenchimento, grade normal — a mesma do quadro de ícones da
 * plataforma (quadro `6024:2923`). Nada é desenhado à mão: cada entrada aponta
 * para o nome da ligadura da fonte (`ligature`), e todo nome usado aqui existe
 * no quadro, conferido em `src/unooria/tokens/figma_icons_node_6024_2923.json`.
 *
 * UMA exceção declarada: `play` usa `play_arrow`, que o quadro não publica (ele
 * publica `pause` na categoria de áudio e vídeo, mas não o par). É o mesmo glifo
 * da mesma biblioteca-base, pelo nome da ligadura — o precedente é o
 * `AudioPlayer` da Plataforma Unooria (AGENTS.md, 5.1).
 *
 * Substitutos, porque o quadro não publica o glifo: desfazer → `replay`,
 * espelhar → `swap_horiz`, captura de tela → `stay_current_portrait`.
 *
 * A fonte é **de ligadura**: sem `fonts/unoogaleria.css` (ou o Material Symbols
 * carregado pelo consumidor), o texto da ligadura aparece no lugar do glifo.
 */

/**
 * Definição de um glifo do registro.
 */
export interface UglIconDefinition {
  /** Nome da ligadura no Material Symbols Rounded */
  ligature: string;
  /** Usa o eixo `FILL` = 1 (glifo preenchido) */
  filled?: boolean;
  /** Espelha o glifo no eixo horizontal */
  flipX?: boolean;
  /** Uso do glifo no produto */
  usage: string;
}

export const uglIcons = {
  /* ---------------------------------------------------------------- Abas */
  library: { ligature: 'photo_library', usage: 'Aba Biblioteca, em repouso.' },
  libraryFilled: { ligature: 'photo_library', filled: true, usage: 'Aba Biblioteca, ativa.' },
  albums: { ligature: 'photo_album', usage: 'Aba Álbuns, em repouso.' },
  albumsFilled: { ligature: 'photo_album', filled: true, usage: 'Aba Álbuns, ativa.' },
  memories: { ligature: 'auto_awesome_motion', usage: 'Aba Para você e cartões de memória, em repouso.' },
  memoriesFilled: { ligature: 'auto_awesome_motion', filled: true, usage: 'Aba Para você, ativa.' },
  search: { ligature: 'search', usage: 'Aba Busca e lupa do campo de busca.' },

  /* ----------------------------------------------------------- Navegação */
  back: { ligature: 'chevron_left', usage: 'Voltar para a tela anterior.' },
  close: { ligature: 'close', usage: 'Fechar o visualizador, uma folha ou limpar o campo.' },
  chevronRight: { ligature: 'chevron_right', usage: 'Seta de linha navegável e "Ver tudo".' },
  expand: { ligature: 'keyboard_arrow_down', usage: 'Abrir um grupo recolhido e alça de folha.' },
  collapse: { ligature: 'keyboard_arrow_up', usage: 'Recolher um grupo aberto.' },
  more: { ligature: 'more_horiz', usage: 'Menu de opções da mídia, do álbum e da barra.' },
  moreVertical: { ligature: 'more_vert', usage: 'Menu de opções em linhas de lista.' },

  /* --------------------------------------------------------- Ações de mídia */
  share: { ligature: 'ios_share', usage: 'Compartilhar a mídia aberta ou a seleção.' },
  favorite: { ligature: 'favorite', usage: 'Marcar como favorito (em repouso).' },
  favoriteFilled: { ligature: 'favorite', filled: true, usage: 'Mídia favorita e selo sobre a miniatura.' },
  info: { ligature: 'info', usage: 'Abrir o painel de informações da mídia.' },
  infoFilled: { ligature: 'info', filled: true, usage: 'Painel de informações aberto.' },
  edit: { ligature: 'tune', usage: 'Abrir o editor de fotos.' },
  pencil: { ligature: 'edit', usage: 'Renomear um álbum e editar a legenda.' },
  delete: { ligature: 'delete', usage: 'Mover para Excluídos recentemente.' },
  deleteForever: { ligature: 'delete_forever', usage: 'Excluir de vez, na lixeira.' },
  restore: { ligature: 'restore_from_trash', usage: 'Recuperar da lixeira.' },
  addToAlbum: { ligature: 'library_add', usage: 'Adicionar a mídia a um álbum.' },
  add: { ligature: 'add', usage: 'Criar álbum e ação de acréscimo genérica.' },
  addPhoto: { ligature: 'add_photo_alternate', usage: 'Adicionar fotos a um álbum vazio.' },
  newAlbum: { ligature: 'create_new_folder', usage: 'Novo álbum, no seletor de álbuns.' },
  duplicate: { ligature: 'filter_none', usage: 'Duplicar a mídia.' },
  copy: { ligature: 'content_copy', usage: 'Copiar a mídia para a área de transferência.' },
  download: { ligature: 'download', usage: 'Salvar em Arquivos.' },
  upload: { ligature: 'cloud_upload', usage: 'Enviar para a nuvem.' },
  cloudDone: { ligature: 'cloud_done', usage: 'Mídia com cópia na nuvem.' },
  link: { ligature: 'link', usage: 'Copiar link de compartilhamento.' },
  send: { ligature: 'send', usage: 'Enviar para um contato.' },
  print: { ligature: 'print', usage: 'Imprimir.' },
  slideshow: { ligature: 'slideshow', usage: 'Iniciar apresentação.' },
  hide: { ligature: 'visibility_off', usage: 'Ocultar a mídia e álbum Ocultos.' },
  show: { ligature: 'visibility', usage: 'Reexibir uma mídia oculta.' },
  lock: { ligature: 'lock', usage: 'Álbum protegido (Ocultos, Excluídos recentemente).' },
  unlock: { ligature: 'lock_open', usage: 'Desbloquear um álbum protegido.' },
  keep: { ligature: 'keep', usage: 'Fixar um álbum no topo.' },

  /* ------------------------------------------------------------- Seleção */
  check: { ligature: 'check', usage: 'Visto do círculo de seleção e "Concluído" no editor.' },
  checkCircle: { ligature: 'check_circle', filled: true, usage: 'Confirmação no aviso passageiro.' },
  circle: { ligature: 'circle', usage: 'Círculo de seleção vazio (referência de forma).' },
  selectAll: { ligature: 'select_all', usage: 'Selecionar tudo.' },

  /* ------------------------------------------------------ Organização */
  grid: { ligature: 'grid_view', usage: 'Alternar o tamanho da grade.' },
  zoomIn: { ligature: 'zoom_in', usage: 'Aproximar a grade (menos colunas) ou a foto.' },
  zoomOut: { ligature: 'zoom_out', usage: 'Afastar a grade (mais colunas) ou a foto.' },
  sort: { ligature: 'sort', usage: 'Ordenar álbuns.' },
  filter: { ligature: 'filter_list', usage: 'Filtrar a biblioteca (fotos, vídeos, favoritos).' },
  calendar: { ligature: 'calendar_month', usage: 'Data de captura no painel de informações.' },
  today: { ligature: 'today', usage: 'Voltar para hoje na biblioteca.' },
  recent: { ligature: 'schedule', usage: 'Álbum Recentes e hora de captura.' },
  history: { ligature: 'history', usage: 'Reverter para o original no editor.' },
  timer: { ligature: 'timer', usage: 'Dias restantes na lixeira.' },

  /* ------------------------------------------------------ Tipos de mídia */
  photo: { ligature: 'photo', usage: 'Fotos e espaço reservado de mídia sem imagem.' },
  brokenImage: { ligature: 'broken_image', usage: 'Mídia que não carregou.' },
  video: { ligature: 'video_camera_back', usage: 'Selo de vídeo e tipo Vídeos.' },
  movie: { ligature: 'movie', usage: 'Linha "Vídeos" em Tipos de mídia.' },
  selfie: { ligature: 'photo_camera_front', usage: 'Tipo Selfies.' },
  livePhoto: { ligature: 'motion_photos_on', usage: 'Selo e tipo Fotos com movimento.' },
  screenshot: { ligature: 'stay_current_portrait', usage: 'Tipo Capturas de tela.' },
  panorama: { ligature: 'panorama', usage: 'Tipo Panoramas.' },
  burst: { ligature: 'burst_mode', usage: 'Tipo Sequências.' },
  hdr: { ligature: 'hdr_on', usage: 'Selo de foto em alto alcance dinâmico.' },
  gif: { ligature: 'gif', usage: 'Tipo Animadas.' },
  imported: { ligature: 'drive_folder_upload', usage: 'Álbum Importados.' },

  /* ------------------------------------------------------ Metadados */
  camera: { ligature: 'photo_camera', usage: 'Câmera e lente no painel de informações.' },
  aspectRatio: { ligature: 'aspect_ratio', usage: 'Dimensões e resolução.' },
  location: { ligature: 'location_on', usage: 'Lugar de captura.' },
  people: { ligature: 'group', usage: 'Pessoas reconhecidas e álbum compartilhado.' },
  person: { ligature: 'person', usage: 'Pessoa sem retrato.' },
  personAdd: { ligature: 'person_add', usage: 'Nomear uma pessoa.' },
  face: { ligature: 'face', usage: 'Álbum Pessoas.' },
  label: { ligature: 'label', usage: 'Etiqueta e legenda.' },

  /* ------------------------------------------------------ Categorias de busca */
  pets: { ligature: 'pets', usage: 'Categoria Animais.' },
  food: { ligature: 'restaurant', usage: 'Categoria Comida.' },
  landscape: { ligature: 'landscape', usage: 'Categoria Paisagens.' },
  city: { ligature: 'location_city', usage: 'Categoria Cidades.' },
  nature: { ligature: 'park', usage: 'Categoria Natureza.' },
  travel: { ligature: 'flight', usage: 'Categoria Viagens.' },
  birthday: { ligature: 'cake', usage: 'Categoria Aniversários.' },
  car: { ligature: 'directions_car', usage: 'Categoria Veículos.' },
  document: { ligature: 'description', usage: 'Categoria Documentos.' },
  explore: { ligature: 'travel_explore', usage: 'Explorar lugares no mapa.' },
  imageSearch: { ligature: 'image_search', usage: 'Sugestão de busca por conteúdo.' },

  /* ------------------------------------------------------ Vídeo */
  play: { ligature: 'play_arrow', filled: true, usage: 'Reproduzir (fora do quadro — ver o cabeçalho).' },
  pause: { ligature: 'pause', filled: true, usage: 'Pausar a reprodução.' },
  replay: { ligature: 'replay', usage: 'Reproduzir de novo ao fim do vídeo.' },
  volume: { ligature: 'volume_up', usage: 'Som ligado.' },
  volumeOff: { ligature: 'volume_off', usage: 'Som desligado.' },
  fullscreen: { ligature: 'fullscreen', usage: 'Ocupar a tela inteira.' },
  fullscreenExit: { ligature: 'fullscreen_exit', usage: 'Sair da tela inteira.' },

  /* ------------------------------------------------------ Editor */
  crop: { ligature: 'crop', usage: 'Ferramenta Cortar.' },
  cropRotate: { ligature: 'crop_rotate', usage: 'Aba Cortar e girar.' },
  cropFree: { ligature: 'crop_free', usage: 'Proporção livre.' },
  cropSquare: { ligature: 'crop_square', usage: 'Proporção quadrada.' },
  cropWide: { ligature: 'crop_16_9', usage: 'Proporção 16:9.' },
  cropClassic: { ligature: 'crop_3_2', usage: 'Proporção 3:2.' },
  cropPortrait: { ligature: 'crop_portrait', usage: 'Proporção 4:5 e 9:16.' },
  rotate: { ligature: 'rotate_90_degrees_ccw', usage: 'Girar 90° no sentido anti-horário.' },
  flip: { ligature: 'swap_horiz', usage: 'Espelhar na horizontal (substituto de `flip`).' },
  straighten: { ligature: 'straighten', usage: 'Endireitar (ângulo fino).' },
  adjust: { ligature: 'tune', usage: 'Aba Ajustar.' },
  filters: { ligature: 'filter_vintage', usage: 'Aba Filtros.' },
  exposure: { ligature: 'exposure', usage: 'Ajuste Exposição.' },
  brightness: { ligature: 'brightness_5', usage: 'Ajuste Brilho.' },
  contrast: { ligature: 'contrast', usage: 'Ajuste Contraste.' },
  saturation: { ligature: 'water_drop', usage: 'Ajuste Saturação.' },
  warmth: { ligature: 'device_thermostat', usage: 'Ajuste Temperatura.' },
  shadows: { ligature: 'tonality', usage: 'Ajuste Sombras.' },
  vignette: { ligature: 'vignette', usage: 'Ajuste Vinheta.' },
  compare: { ligature: 'compare', usage: 'Pressionar para comparar com o original.' },
  undo: { ligature: 'replay', usage: 'Desfazer o último ajuste (substituto de `undo`).' },

  /* ------------------------------------------------------ Sistema */
  signal: { ligature: 'signal_cellular_alt', usage: 'Sinal móvel na barra de status do aparelho.' },
  wifi: { ligature: 'signal_wifi_4_bar', filled: true, usage: 'Conexão sem fio na barra de status do aparelho.' },
  batteryHigh: { ligature: 'battery_horiz_075', filled: true, usage: 'Bateria acima de 60% na barra de status.' },
  batteryMedium: { ligature: 'battery_horiz_050', filled: true, usage: 'Bateria entre 30% e 60% na barra de status.' },
  batteryLow: { ligature: 'battery_horiz_000', filled: true, usage: 'Bateria abaixo de 30% na barra de status.' },
  settings: { ligature: 'settings', usage: 'Ajustes da galeria.' },
  account: { ligature: 'account_circle', usage: 'Conta e armazenamento.' },
  darkMode: { ligature: 'dark_mode', usage: 'Alternar para o tema escuro.' },
  lightMode: { ligature: 'wb_sunny', usage: 'Alternar para o tema claro.' },
} as const satisfies Record<string, UglIconDefinition>;

/**
 * Nome de um glifo do registro.
 */
export type UglIconName = keyof typeof uglIcons;

/**
 * Todos os nomes do registro, na ordem de declaração.
 */
export const uglIconNames = Object.keys(uglIcons) as UglIconName[];
