import React from 'react';
import type { UglIconName, UglIconTone } from '../Icon';
import type { UglTheme } from '../../tokens';

/**
 * Propriedades do componente ListRow da Unoogaleria.
 *
 * O elemento raiz muda com a função da linha: `<a>` com `href`, `<button>` com
 * `onClick`, e `<div>` quando a linha só informa.
 */
export interface UglListRowProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'onClick'> {
  /**
   * Glifo à esquerda.
   */
  icon?: UglIconName;

  /**
   * Tom do glifo.
   * @default 'accent' ('danger' quando `destructive`)
   */
  iconTone?: UglIconTone;

  /**
   * Título da linha ("Vídeos", "Excluídos recentemente").
   */
  title: React.ReactNode;

  /**
   * Linha de apoio abaixo do título.
   */
  subtitle?: React.ReactNode;

  /**
   * Valor à direita — em geral a contagem de itens. Números são formatados em
   * pt-BR ("1.204").
   */
  detail?: string | number;

  /**
   * Conteúdo à direita, depois do detalhe (um interruptor, um selo).
   */
  trailing?: React.ReactNode;

  /**
   * Exibe a seta de navegação à direita.
   * @default true quando há `onClick` ou `href`
   */
  chevron?: boolean;

  /**
   * Marca a linha como protegida: glifo de cadeado antes do detalhe (e
   * ", protegido" no nome acessível).
   * @default false
   */
  locked?: boolean;

  /**
   * Torna a linha um botão.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Torna a linha um link.
   */
  href?: string;

  /**
   * Destino do link (com `href`).
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];

  /**
   * Relação do link (com `href`).
   */
  rel?: string;

  /**
   * Exibe o fio divisor recuado na base. O último item de um `ListGroup` nunca
   * o mostra.
   * @default true
   */
  divider?: boolean;

  /**
   * Ação destrutiva: título em `--ugl-color-text-danger`.
   * @default false
   */
  destructive?: boolean;

  /**
   * Desabilita a linha interativa.
   * @default false
   */
  disabled?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}

/**
 * Propriedades do componente ListGroup da Unoogaleria.
 */
export interface UglListGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Título do grupo, acima do cartão ("Tipos de mídia"). Quando é texto, também
   * nomeia a lista para o leitor de tela.
   */
  title?: React.ReactNode;

  /**
   * Nível do título no documento.
   * @default 2
   */
  headingLevel?: 2 | 3;

  /**
   * Texto de apoio abaixo do cartão.
   */
  footer?: React.ReactNode;

  /**
   * Recua o cartão das bordas pela margem da tela e arredonda os cantos. Sem
   * recuo, o cartão ocupa a largura toda, sem raio.
   * @default true
   */
  inset?: boolean;

  /**
   * As linhas (`ListRow`). Cada filho vira um item da lista.
   */
  children?: React.ReactNode;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
