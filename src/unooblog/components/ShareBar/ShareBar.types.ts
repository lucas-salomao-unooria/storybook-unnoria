import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Disposição da barra de compartilhamento.
 * - 'horizontal': botões em linha (fim do post, cabeçalho)
 * - 'vertical': botões em coluna, fixa ao lado da coluna de leitura ao rolar
 */
export type UblShareBarOrientation = 'horizontal' | 'vertical';

/**
 * Propriedades do componente ShareBar da Unooblog.
 *
 * Cada ação só aparece quando o produto a trata: `onShare` e `onCopyLink`. Sem
 * nenhuma delas, a barra não renderiza nada.
 */
export interface UblShareBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Chamado ao acionar "Compartilhar o post". Sem ele, o botão não aparece.
   */
  onShare?: () => void;

  /**
   * Chamado ao acionar "Copiar link do post". Sem ele, o botão não aparece.
   * Avisar a pessoa de que o link foi copiado (um `Toast`) é do produto.
   */
  onCopyLink?: () => void;

  /**
   * Disposição dos botões. A vertical fica fixa (`position: sticky`) abaixo do
   * cabeçalho do site enquanto o post rola.
   * @default 'horizontal'
   */
  orientation?: UblShareBarOrientation;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
