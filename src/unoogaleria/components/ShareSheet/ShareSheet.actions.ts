import type { UglShareAction } from './ShareSheet.types';

/**
 * Ações padrão da folha de compartilhamento, na ordem de exibição.
 *
 * Fica fora de `ShareSheet.tsx` de propósito: aquele arquivo é `'use client'`,
 * e um valor exportado de módulo cliente chega a um Server Component como
 * referência, não como dado.
 */
export const uglDefaultShareActions: readonly UglShareAction[] = [
  { id: 'copy-link', label: 'Copiar link', icon: 'link' },
  { id: 'copy', label: 'Copiar', icon: 'copy' },
  { id: 'duplicate', label: 'Duplicar', icon: 'duplicate' },
  { id: 'add-to-album', label: 'Adicionar a um álbum', icon: 'addToAlbum' },
  { id: 'save-to-files', label: 'Salvar em arquivos', icon: 'download' },
  { id: 'print', label: 'Imprimir', icon: 'print' },
  { id: 'slideshow', label: 'Apresentação', icon: 'slideshow' },
  { id: 'hide', label: 'Ocultar', icon: 'hide' },
];
