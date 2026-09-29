'use client';

import React from 'react';
import type { UncIconName } from '../Icon';

/**
 * Ações disponíveis na folha de anexos, cada uma com a cor de círculo própria.
 */
export type UncAttachmentKind =
  | 'document'
  | 'camera'
  | 'gallery'
  | 'audio'
  | 'location'
  | 'contact';

/**
 * Descrição de uma ação da folha de anexos.
 */
export interface UncAttachmentAction {
  /** Tipo da ação, que define a cor do círculo */
  kind: UncAttachmentKind;
  /** Rótulo exibido abaixo do círculo */
  label: string;
  /** Glifo exibido dentro do círculo */
  icon: UncIconName;
}

/**
 * Propriedades do componente AttachmentSheet do Unoochat.
 */
export interface UncAttachmentSheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Ações exibidas na grade de três colunas.
   */
  actions: UncAttachmentAction[];

  /**
   * Callback disparado ao escolher uma ação.
   */
  onSelect?: (kind: UncAttachmentKind) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
