import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Link de uma coluna do rodapé.
 */
export interface UblSiteFooterLink {
  /**
   * Texto do link.
   */
  label: string;

  /**
   * Destino. Com `href` o item é um `<a>`.
   */
  href?: string;

  /**
   * Chamado ao acionar o item. Sem `href`, o item vira um `<button>`; com os
   * dois, o `<a>` mantém o destino e também dispara a função.
   */
  onClick?: () => void;
}

/**
 * Coluna de links do rodapé.
 */
export interface UblSiteFooterColumn {
  /**
   * Título da coluna (`<h2>`).
   */
  heading: string;

  /**
   * Links da coluna.
   */
  links: UblSiteFooterLink[];
}

/**
 * Propriedades do componente SiteFooter da Unooblog.
 *
 * Os atributos nativos de `<footer>` vão para o invólucro.
 */
export interface UblSiteFooterProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Nome do site. É o nome acessível da marca e do rodapé.
   */
  siteName: string;

  /**
   * Frase curta sob a marca.
   */
  description?: string;

  /**
   * Colunas de links, lado a lado no largo e empilhadas no compacto.
   */
  columns: UblSiteFooterColumn[];

  /**
   * Linha de direitos, no fim do rodapé.
   */
  copyright?: string;

  /**
   * Slot sob a descrição: o formulário de newsletter, por exemplo.
   */
  children?: React.ReactNode;

  /**
   * Substitui a marca padrão (o `Logo`).
   */
  logo?: React.ReactNode;

  /**
   * Nome acessível do marco de navegação das colunas.
   * @default 'Links do rodapé'
   */
  navLabel?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
