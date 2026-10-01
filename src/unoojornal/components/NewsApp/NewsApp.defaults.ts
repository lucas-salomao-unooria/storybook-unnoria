import type { UjnSection } from '../../edition';

/**
 * As cinco seções editoriais padrão do jornal, na ordem das pílulas de filtro.
 * É um ponto de partida genérico: uma publicação com outras seções passa as
 * próprias em `sections` (os identificadores continuam os de `UjnSectionId`).
 */
export const ujnDefaultSections: UjnSection[] = [
  { id: 'vida-escolar', label: 'Vida escolar' },
  { id: 'ciencia', label: 'Ciência e tecnologia' },
  { id: 'cultura', label: 'Cultura' },
  { id: 'esportes', label: 'Esportes' },
  { id: 'opiniao', label: 'Opinião' },
];
