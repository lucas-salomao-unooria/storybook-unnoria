import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente ShareBar da Unoojornal.
 *
 * Cada ação só aparece quando o produto a trata: `onShare`, `onCopyLink`,
 * `onPrint`, e `onSave` (ou `saved` / `defaultSaved`) para salvar. Sem nenhuma
 * delas, a barra não renderiza nada.
 */
export interface UjnShareBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Chamado ao acionar "Compartilhar a matéria".
   */
  onShare?: () => void;

  /**
   * Chamado ao acionar "Copiar link da matéria".
   */
  onCopyLink?: () => void;

  /**
   * Chamado ao alternar "Salvar para ler depois", com o novo estado
   * (`true` = salva).
   */
  onSave?: (saved: boolean) => void;

  /**
   * Matéria salva. Quando informado, o estado é do produto (controlado) e o
   * botão só pede a troca por `onSave`. Quando omitido, o componente guarda o
   * estado a partir de `defaultSaved`.
   */
  saved?: boolean;

  /**
   * Estado inicial de "salva" no modo não controlado. Informá-lo (mesmo
   * `false`) já faz o botão de salvar aparecer.
   */
  defaultSaved?: boolean;

  /**
   * Chamado ao acionar "Imprimir a matéria".
   */
  onPrint?: () => void;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
