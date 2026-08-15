import React from 'react';

/**
 * Passos / Modos operacionais do componente Cropper baseados nas especificações do Figma Nó #12694:9694
 */
export type CropperStep = 'change-photo' | 'upload' | 'crop-preview';

/**
 * Modo de exibição do componente:
 * - 'modal': Renderiza como modal flutuante com backdrop / overlay escuro e foco acessível.
 * - 'inline': Renderiza embutido diretamente no fluxo do layout ou card pai.
 */
export type CropperViewMode = 'modal' | 'inline';

/**
 * Formato da máscara de corte:
 * - 'circle': Máscara circular (padrão para fotos de perfil no Figma).
 * - 'square': Máscara quadrada.
 */
export type CropperShape = 'circle' | 'square';

/**
 * Tema visual suportado pelo componente
 */
export type CropperTheme = 'light' | 'dark';

/**
 * Estrutura de dados retornada ao confirmar o corte da imagem
 */
export interface CropResult {
  /** Imagem cortada final codificada em Base64 Data URL (image/png ou image/jpeg) */
  dataUrl: string;
  /** Blob binário da imagem cortada para uploads via FormData */
  blob: Blob | null;
  /** Largura final da imagem gerada em pixels */
  width: number;
  /** Altura final da imagem gerada em pixels */
  height: number;
  /** Fator de zoom aplicado durante o corte (1.0x a 3.0x) */
  zoom: number;
  /** Ângulo de rotação em graus (0°, 90°, 180°, 270°) */
  rotation: number;
  /** Coordenadas relativas e absolutas do corte em relação à imagem original */
  cropCoordinates: {
    x: number;
    y: number;
    size: number;
  };
}

/**
 * Textos customizáveis e internacionalizáveis para todos os passos do Cropper (Figma #12694:9703)
 */
export interface CropperCustomTexts {
  /** Título do passo 'change-photo' (Padrão: "Alterar foto do perfil") */
  changePhotoTitle?: string;
  /** Subtítulo do passo 'change-photo' (Padrão: "Escolha uma nova imagem para atualizar sua foto de perfil.") */
  changePhotoSubtitle?: string;
  /** Rótulo do botão de alteração/edição (Padrão: "Editar") */
  changeButtonLabel?: string;
  /** Rótulo do botão de exclusão da foto (Padrão: "Remover") */
  deleteButtonLabel?: string;

  /** Título do passo 'upload' (Padrão: "Atualize sua foto de perfil") */
  uploadTitle?: string;
  /** Subtítulo do passo 'upload' (Padrão: "Use a galeria ou a câmera do seu dispositivo.") */
  uploadSubtitle?: string;
  /** Rótulo do botão de upload (Padrão: "Fazer upload") */
  uploadButtonLabel?: string;
  /** Rótulo do botão de câmera (Padrão: "Tire uma foto") */
  cameraButtonLabel?: string;

  /** Título do passo 'crop-preview' (Padrão: "Visualize sua nova foto") */
  cropTitle?: string;
  /** Subtítulo do passo 'crop-preview' (Padrão: "Gostou do resultado? Clique em Salvar para confirmar.") */
  cropSubtitle?: string;
  /** Rótulo do botão Cancelar (Padrão: "Cancelar") */
  cancelButtonLabel?: string;
  /** Rótulo do botão Salvar (Padrão: "Salvar") */
  saveButtonLabel?: string;

  /** Mensagem de erro de tamanho máximo de arquivo */
  fileSizeErrorText?: string;
  /** Mensagem de erro de formato de arquivo inválido */
  fileTypeErrorText?: string;
}

/**
 * Propriedades do componente Cropper do Design System Unooria
 */
export interface CropperProps {
  /**
   * URL ou Base64 da foto de perfil atualmente salva (se houver).
   */
  currentImage?: string;

  /**
   * Imagem inicial a ser aberta no editor para corte imediato.
   */
  initialImage?: string;

  /**
   * Passo inicial do componente. Se não especificado, deduz automaticamente.
   */
  initialStep?: CropperStep;

  /**
   * Formato da máscara de corte.
   * @default 'circle'
   */
  shape?: CropperShape;

  /**
   * Modo de exibição: 'modal' flutuante ou 'inline'.
   * @default 'inline'
   */
  viewMode?: CropperViewMode;

  /**
   * Tema visual de cor.
   * @default 'light'
   */
  theme?: CropperTheme;

  /**
   * Callback disparado quando o usuário clica no botão de fechar ou cancelar.
   */
  onClose?: () => void;

  /**
   * Callback disparado quando o usuário confirma o corte da imagem.
   */
  onSave?: (result: CropResult) => void;

  /**
   * Callback disparado quando o usuário clica em remover a foto atual.
   */
  onDelete?: () => void;

  /**
   * Callback disparado quando o passo atual é alterado.
   */
  onStepChange?: (step: CropperStep) => void;

  /**
   * Textos customizados para internacionalização.
   */
  customTexts?: CropperCustomTexts;

  /**
   * Tamanho máximo permitido para o arquivo em MB.
   * @default 10
   */
  maxFileSizeMB?: number;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Estilos CSS inline customizados.
   */
  style?: React.CSSProperties;
}
