import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Item da navegação principal do cabeçalho.
 */
export interface UblSiteHeaderItem {
  /**
   * Identificador estável do destino (vai para `onNavigate` e casa com `activeId`).
   */
  id: string;

  /**
   * Texto do link.
   */
  label: string;

  /**
   * Destino. Com `href` o item é um `<a>`; sem ele, um `<button>` que só
   * dispara `onNavigate` (o produto decide para onde ir).
   */
  href?: string;
}

/**
 * Modo de cor que o produto está exibindo. Escolhe o glifo do alternador
 * (lua no claro, sol no escuro) e o estado `aria-pressed`.
 */
export type UblSiteHeaderThemeMode = 'light' | 'dark';

/**
 * Propriedades do componente SiteHeader da Unooblog.
 *
 * Os atributos nativos de `<header>` (`id`, `data-*`, `aria-*`…) vão para o
 * invólucro.
 */
export interface UblSiteHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Nome do site. É o nome acessível do link da marca.
   */
  siteName: string;

  /**
   * Destinos da navegação principal.
   */
  items: UblSiteHeaderItem[];

  /**
   * Identificador do item ativo. Recebe `aria-current="page"` e o sublinhado
   * de 2px.
   */
  activeId?: string;

  /**
   * Chamado com o `id` do item escolhido. Num item com `href` a navegação do
   * navegador continua valendo; o produto pode cancelá-la no próprio `<a>`.
   */
  onNavigate?: (id: string) => void;

  /**
   * Chamado ao acionar o botão de busca. Sem esta prop o botão não aparece.
   */
  onSearch?: () => void;

  /**
   * Modo de cor em uso. Sem esta prop (ou sem `onToggleTheme`) o alternador
   * não aparece.
   */
  themeMode?: UblSiteHeaderThemeMode;

  /**
   * Chamado ao acionar o alternador claro/escuro. O produto troca o
   * `data-ubl-theme` e devolve o novo `themeMode`.
   */
  onToggleTheme?: () => void;

  /**
   * Ações extras do produto (entrar, assinar…), à direita dos botões.
   */
  actions?: React.ReactNode;

  /**
   * Fixa a barra no topo do contêiner de rolagem (`position: sticky`).
   * @default true
   */
  sticky?: boolean;

  /**
   * Substitui a marca padrão (o `Logo`). Vai dentro do link da marca.
   */
  logo?: React.ReactNode;

  /**
   * Destino do link da marca. Sem ele a marca é só um bloco (não um link).
   */
  homeHref?: string;

  /**
   * Chamado ao acionar a marca (voltar ao início). Sem `homeHref`, a marca vira um
   * botão (e não um link sem destino); com `homeHref`, é um link e o evento permite
   * cancelar a navegação.
   */
  onHome?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Nome acessível do marco de navegação.
   * @default 'Navegação principal'
   */
  navLabel?: string;

  /**
   * Nome acessível do botão de menu (largura compacta).
   * @default 'Menu'
   */
  menuLabel?: string;

  /**
   * Nome acessível do botão de busca.
   * @default 'Buscar'
   */
  searchLabel?: string;

  /**
   * Nome acessível do alternador de tema.
   * @default 'Tema escuro'
   */
  themeLabel?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
