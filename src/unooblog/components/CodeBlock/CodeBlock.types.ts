import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Propriedades do componente CodeBlock da Unooblog.
 */
export interface UblCodeBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onCopy'> {
  /**
   * Código a exibir, com quebras de linha. A quebra final é ignorada. Este é
   * também o texto que o botão de copiar envia à área de transferência.
   */
  code: string;

  /**
   * Linguagem do trecho ("TypeScript", "css"). Aparece na barra quando não há
   * `filename` e entra no nome acessível da região. Não liga nenhum realce:
   * o bloco não colore a sintaxe.
   */
  language?: string;

  /**
   * Nome do arquivo ("useDebounce.ts"). Tem precedência sobre a linguagem no
   * rótulo da barra.
   */
  filename?: string;

  /**
   * Mostra a numeração das linhas. Os números não são selecionáveis nem
   * entram no texto copiado.
   * @default false
   */
  showLineNumbers?: boolean;

  /**
   * Linhas a destacar (contagem a partir de 1), com faixa de fundo e barra
   * lateral. Também são citadas no nome acessível da região.
   */
  highlightLines?: number[];

  /**
   * Rótulo acessível do botão de copiar.
   * @default 'Copiar código'
   */
  copyLabel?: string;

  /**
   * Texto da confirmação, mostrado no botão e anunciado numa região
   * `aria-live`.
   * @default 'Copiado'
   */
  copiedLabel?: string;

  /**
   * Texto anunciado quando a área de transferência recusa a cópia.
   * @default 'Não foi possível copiar'
   */
  copyFailedLabel?: string;

  /**
   * Chamado depois de uma cópia bem-sucedida, com o código copiado.
   */
  onCopy?: (code: string) => void;

  /**
   * Força o tema visual. O bloco é invariante (superfície escura nos dois
   * temas); o tema só afeta o anel de foco herdado e o contorno.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
