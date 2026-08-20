import React from 'react';
import type { WaIconName } from '../Icon';

/**
 * Ações disponíveis na folha de anexos, cada uma com a cor exata do arquivo.
 */
export type WaAttachmentKind =
  | 'document'
  | 'camera'
  | 'gallery'
  | 'audio'
  | 'location'
  | 'contact';

/**
 * Descrição de uma ação da folha de anexos.
 */
export interface WaAttachmentAction {
  /** Tipo da ação, que define a cor do círculo */
  kind: WaAttachmentKind;
  /** Rótulo exibido abaixo do círculo */
  label: string;
  /** Glifo exibido dentro do círculo */
  icon: WaIconName;
}

/**
 * Propriedades do componente AttachmentSheet do WhatsApp Mobile.
 */
export interface WaAttachmentSheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Ações exibidas na grade de três colunas.
   */
  actions: WaAttachmentAction[];

  /**
   * Callback disparado ao escolher uma ação.
   */
  onSelect?: (kind: WaAttachmentKind) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
