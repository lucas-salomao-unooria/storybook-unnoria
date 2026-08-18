import React from 'react';

/**
 * Estado do envio de um arquivo individual
 */
export type UploadFileStatus = 'idle' | 'uploading' | 'completed' | 'error';

/**
 * Item de arquivo na lista de uploads
 */
export interface UploadFileItem {
  /**
   * Identificador único do arquivo
   */
  id: string;

  /**
   * Nome do arquivo (ex: "Documento_Fiscal.pdf")
   */
  name: string;

  /**
   * Tamanho formatado ou em bytes (ex: "50 MB" ou 52428800)
   */
  size: string | number;

  /**
   * Porcentagem de progresso do upload (0 a 100)
   * @default 100
   */
  progress: number;

  /**
   * Estado atual do upload
   * @default 'completed'
   */
  status?: UploadFileStatus;

  /**
   * Objeto File nativo original do navegador (se aplicável)
   */
  file?: File;

  /**
   * Mensagem de erro caso o envio falhe
   */
  error?: string;
}

/**
 * Propriedades do componente FileUpload (Área e Lista de Upload)
 * Plataforma Unooria - Extraído do Figma (Node 18661:2161 / Component Set 18647:26131)
 */
export interface FileUploadProps {
  /**
   * Lista de arquivos adicionados (modo controlado)
   */
  files?: UploadFileItem[];

  /**
   * Lista inicial de arquivos (modo não controlado)
   */
  defaultFiles?: UploadFileItem[];

  /**
   * Callback disparado quando a lista de arquivos muda
   */
  onFilesChange?: (files: UploadFileItem[]) => void;

  /**
   * Callback disparado ao selecionar novos arquivos
   */
  onUpload?: (files: File[]) => void;

  /**
   * Callback disparado ao excluir/remover um arquivo da lista
   */
  onRemove?: (id: string) => void;

  /**
   * Tipos/extensões de arquivos aceitos (ex: ".jpeg,.jpg,.png,.pdf,.mp4" ou "image/*")
   * @default '.jpeg,.jpg,.png,.pdf,.mp4'
   */
  accept?: string;

  /**
   * Tamanho máximo permitido por arquivo em bytes (default: 50 MB)
   * @default 52428800
   */
  maxSize?: number;

  /**
   * Permite selecionar múltiplos arquivos
   * @default true
   */
  multiple?: boolean;

  /**
   * Quantidade máxima de arquivos permitidos
   */
  maxFiles?: number;

  /**
   * Rótulo superior do campo (Top Label)
   * @default 'Input Label'
   */
  label?: React.ReactNode;

  /**
   * Se verdadeiro, exibe asterisco vermelho de obrigatoriedade (*)
   * @default false
   */
  required?: boolean;

  /**
   * Título principal exibido na caixa de dropzone
   * @default 'Solte seu arquivo aqui ou clique para escolher'
   */
  dropzoneTitle?: string;

  /**
   * Subtítulo / instruções de formato exibidas na caixa de dropzone
   * @default 'Formatos JPEG, PNG, PDF e MP4, até 50 MB'
   */
  dropzoneSubtitle?: string;

  /**
   * Desabilita a interação com a área de upload
   * @default false
   */
  disabled?: boolean;

  /**
   * Se verdadeiro, oculta a área de dropzone e exibe apenas os cards de arquivos
   * @default false
   */
  hideDropzone?: boolean;

  /**
   * Tema visual: 'light' ou 'dark'
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Classes CSS adicionais
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais
   */
  style?: React.CSSProperties;
}

/**
 * Propriedades do Modal de Upload de Arquivos
 */
export interface UploadFileModalProps extends Omit<FileUploadProps, 'className' | 'style'> {
  /**
   * Se o modal está visível/aberto
   */
  isOpen: boolean;

  /**
   * Callback disparado ao fechar o modal
   */
  onClose: () => void;

  /**
   * Título do cabeçalho do modal
   * @default 'Upload de arquivo'
   */
  title?: string;

  /**
   * Subtítulo explicativo do modal
   */
  description?: string;

  /**
   * Callback disparado ao clicar no botão de confirmação/envio
   */
  onSubmit?: (files: UploadFileItem[]) => void;

  /**
   * Texto do botão primário de envio
   * @default 'Enviar documento'
   */
  submitText?: string;

  /**
   * Texto do botão secundário de cancelar
   * @default 'Cancelar'
   */
  cancelText?: string;

  /**
   * Desabilita o botão de envio
   */
  isSubmitting?: boolean;

  /**
   * Classes adicionais para o container do modal
   */
  modalClassName?: string;
}
