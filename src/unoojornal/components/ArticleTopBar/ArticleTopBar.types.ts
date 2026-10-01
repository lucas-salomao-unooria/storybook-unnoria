import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente ArticleTopBar da Unoojornal.
 */
export interface UjnArticleTopBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Texto do atalho de volta. No compacto, o texto some e o nome acessível
   * continua sendo este.
   * @default 'Voltar para a capa'
   */
  backLabel?: string;

  /**
   * Endereço da capa. Com ele, o atalho é um link (`<a>`); sem ele, é um botão.
   */
  backHref?: string;

  /**
   * Chamado ao acionar o atalho de volta. Com `backHref`, roda antes da
   * navegação e pode cancelá-la (`event.preventDefault()`).
   */
  onBack?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Nome da publicação, exibido ao centro no `Masthead` de tamanho `md`.
   */
  title: string;

  /**
   * Identificação da edição, à direita ("Edição nº 214"). Some no compacto.
   */
  edition?: string;

  /**
   * Progresso de leitura da matéria, de 0 a 100. Quando informado, a faixa do
   * `ReadingProgress` aparece embutida no topo da barra.
   */
  progress?: number;

  /**
   * Rótulo acessível da faixa de progresso.
   * @default 'Progresso de leitura'
   */
  progressLabel?: string;

  /**
   * Ações extras à direita, depois da edição (`IconButton`, por exemplo).
   */
  actions?: React.ReactNode;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
