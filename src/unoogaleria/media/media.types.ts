/**
 * Modelo de domínio da Unoogaleria: a mídia, o álbum e o estado de edição.
 *
 * Todos os componentes do módulo falam este vocabulário. Nenhum deles guarda a
 * biblioteca: quem a guarda é o produto (ou o `GalleryApp`, que é um produto de
 * demonstração pronto), e os componentes recebem itens e devolvem intenções.
 */

/**
 * Tipo primário da mídia.
 */
export type UglMediaType = 'photo' | 'video';

/**
 * Subtipos que a galeria reconhece e que viram álbum em "Tipos de mídia".
 * - 'selfie': câmera frontal
 * - 'screenshot': captura de tela
 * - 'panorama': panorâmica
 * - 'live': foto com movimento
 * - 'burst': sequência
 * - 'hdr': alto alcance dinâmico
 */
export type UglMediaSubtype = 'selfie' | 'screenshot' | 'panorama' | 'live' | 'burst' | 'hdr';

/**
 * Proporções de corte oferecidas pelo editor.
 */
export type UglAspectRatio = 'original' | 'free' | '1:1' | '4:5' | '3:2' | '4:3' | '16:9' | '9:16';

/**
 * Filtros predefinidos do editor.
 */
export type UglFilterId =
  | 'original'
  | 'vivido'
  | 'quente'
  | 'frio'
  | 'dramatico'
  | 'mono'
  | 'prata'
  | 'nostalgia';

/**
 * Ajustes finos do editor. Todos vão de -100 a 100 com 0 neutro, exceto a
 * vinheta, que vai de 0 a 100.
 */
export interface UglAdjustments {
  exposure: number;
  brightness: number;
  contrast: number;
  saturation: number;
  warmth: number;
  shadows: number;
  vignette: number;
}

/**
 * Chave de um ajuste fino.
 */
export type UglAdjustmentKey = keyof UglAdjustments;

/**
 * Edição não destrutiva de uma foto. A mídia original nunca é reescrita: a
 * galeria aplica a edição na exibição, e "Reverter" volta ao padrão.
 */
export interface UglEditState {
  /** Rotação em passos de 90°, no sentido anti-horário */
  rotation: 0 | 90 | 180 | 270;
  /** Espelhamento horizontal */
  flipX: boolean;
  /** Endireitamento fino, de -45° a 45° */
  straighten: number;
  /** Proporção do corte */
  aspect: UglAspectRatio;
  /** Ajustes finos */
  adjustments: UglAdjustments;
  /** Filtro predefinido */
  filter: UglFilterId;
  /** Intensidade do filtro, de 0 a 100 */
  filterIntensity: number;
}

/**
 * Uma foto ou um vídeo da biblioteca.
 */
export interface UglMediaItem {
  /** Identificador único e estável */
  id: string;
  /** Foto ou vídeo */
  type: UglMediaType;
  /** Imagem: a própria foto ou o quadro de capa do vídeo */
  src: string;
  /** Arquivo de vídeo reproduzível (só em `type: 'video'`) */
  videoSrc?: string;
  /** Texto alternativo — é o nome acessível da miniatura */
  alt: string;
  /** Largura original em pixels */
  width: number;
  /** Altura original em pixels */
  height: number;
  /** Momento da captura, em ISO 8601 com fuso (`2026-09-28T14:32:00-03:00`) */
  takenAt: string;
  /** Duração do vídeo em segundos */
  duration?: number;
  /** Marcada como favorita */
  favorite?: boolean;
  /** Lugar de captura, já legível ("Ouro Preto, MG") */
  location?: string;
  /** Câmera e lente ("Câmera traseira · 26 mm · ƒ/1,8") */
  camera?: string;
  /** Tamanho do arquivo em bytes */
  sizeBytes?: number;
  /** Nome do arquivo ("IMG_2041.HEIC") */
  fileName?: string;
  /** Legenda escrita pela pessoa */
  description?: string;
  /** Álbuns de que a mídia faz parte */
  albumIds?: string[];
  /** Pessoas reconhecidas, por identificador */
  people?: string[];
  /** Subtipos reconhecidos */
  subtypes?: UglMediaSubtype[];
  /** Palavras de conteúdo usadas pela busca ("praia", "cachorro") */
  tags?: string[];
  /** Oculta: sai da biblioteca e só aparece no álbum protegido */
  hidden?: boolean;
  /** Momento em que foi para Excluídos recentemente (ISO 8601) */
  deletedAt?: string;
  /** Edição não destrutiva aplicada */
  edit?: UglEditState;
}

/**
 * Tipo de álbum.
 * - 'user': criado pela pessoa
 * - 'smart': gerado pela galeria (Recentes, Favoritos, tipos de mídia)
 * - 'shared': compartilhado com outras pessoas
 * - 'protected': protegido (Ocultos, Excluídos recentemente)
 */
export type UglAlbumKind = 'user' | 'smart' | 'shared' | 'protected';

/**
 * Um álbum.
 */
export interface UglAlbum {
  /** Identificador único */
  id: string;
  /** Nome exibido */
  title: string;
  /** Quantidade de itens */
  count: number;
  /** Imagem de capa */
  coverSrc?: string;
  /** Texto alternativo da capa */
  coverAlt?: string;
  /** Tipo de álbum */
  kind?: UglAlbumKind;
}

/**
 * Uma pessoa reconhecida ou um contato.
 */
export interface UglPerson {
  /** Identificador único */
  id: string;
  /** Nome exibido */
  name: string;
  /** Retrato */
  avatarSrc?: string;
}

/**
 * Um grupo de mídia sob um cabeçalho (dia, mês ou ano).
 */
export interface UglMediaSection {
  /** Identificador estável do grupo (`2026-09-28`, `2026-09`, `2026`) */
  id: string;
  /** Rótulo do grupo ("Hoje", "Ontem", "seg., 21 de set.") */
  title: string;
  /** Linha de apoio (lugar mais frequente do grupo) */
  subtitle?: string;
  /** Itens do grupo, do mais recente ao mais antigo */
  items: UglMediaItem[];
}

/**
 * Agrupamento da biblioteca.
 */
export type UglGroupBy = 'day' | 'month' | 'year' | 'none';
