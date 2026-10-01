import React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Espessura do fio.
 * - 'thin': 1px (`--ujn-rule-thin`) — divisor entre itens e contorno de bloco
 * - 'thick': 3px (`--ujn-rule-thick`) — fecha uma seção e abre a matéria
 * - 'double': 6px de altura (`--ujn-rule-double-height`): 3px, vão de 2px e
 *   1px — o fio duplo do cabeçalho do jornal
 */
export type UjnRuleVariant = 'thin' | 'thick' | 'double';

/**
 * Direção do fio.
 * - 'horizontal': ocupa a largura do contêiner
 * - 'vertical': ocupa a altura do contêiner (separa colunas)
 */
export type UjnRuleOrientation = 'horizontal' | 'vertical';

/**
 * Cor do fio.
 * - 'subtle': `--ujn-color-border-subtle`, o divisor de lista (só no 'thin')
 * - 'ink': `--ujn-color-border-rule`, a tinta do jornal
 */
export type UjnRuleTone = 'subtle' | 'ink';

/**
 * Propriedades do componente Rule da Unoojornal.
 */
export interface UjnRuleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Espessura do fio.
   * @default 'thin'
   */
  variant?: UjnRuleVariant;

  /**
   * Direção do fio.
   * @default 'horizontal'
   */
  orientation?: UjnRuleOrientation;

  /**
   * Fio decorativo: sai da árvore de acessibilidade. Com `false`, vira um
   * `role="separator"` anunciado pelo leitor de tela.
   * @default true
   */
  decorative?: boolean;

  /**
   * Cor do fio. Extensão do contrato: `thin` pode ser o divisor de lista
   * (`subtle`) ou a tinta do jornal (`ink`). `thick` e `double` são sempre tinta.
   * @default 'subtle'
   */
  tone?: UjnRuleTone;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
