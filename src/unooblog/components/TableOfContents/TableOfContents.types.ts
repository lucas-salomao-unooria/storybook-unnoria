import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Item do sumário: um título do post.
 */
export interface UblTableOfContentsItem {
  /**
   * Identificador do título no corpo do post (o `id` do `<h2>` ou `<h3>`). O
   * link do item é `#id`.
   */
  id: string;

  /**
   * Texto do título.
   */
  label: string;

  /**
   * Nível do título. O nível 3 aparece recuado sob o nível 2.
   */
  level: 2 | 3;
}

/**
 * Variantes de composição do sumário.
 * - 'sidebar': coluna fixa (`position: sticky`) de `--ubl-toc-width`, ao lado do
 *   texto no largo
 * - 'inline': bloco recolhível (`<details>`) no topo do post, para o compacto
 */
export type UblTableOfContentsVariant = 'sidebar' | 'inline';

/**
 * Propriedades do componente TableOfContents da Unooblog.
 *
 * Os atributos nativos de `<nav>` (`id`, `data-*`…) vão para o invólucro.
 */
export interface UblTableOfContentsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'title' | 'onSelect'> {
  /**
   * Títulos do post, na ordem em que aparecem.
   */
  items: UblTableOfContentsItem[];

  /**
   * Identificador do título em leitura. Recebe `aria-current="location"`, a
   * barra lateral de 2px e o peso maior.
   */
  activeId?: string;

  /**
   * Chamado com o `id` do item escolhido (e o evento do clique). A rolagem
   * nativa até `#id` continua valendo; o produto pode cancelá-la com
   * `event.preventDefault()` para rolar um contêiner próprio.
   */
  onSelect?: (id: string, event: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Título do sumário. Também é o nome acessível do marco de navegação.
   * @default 'Neste post'
   */
  title?: string;

  /**
   * Composição do sumário.
   * @default 'sidebar'
   */
  variant?: UblTableOfContentsVariant;

  /**
   * Só na variante `inline`: se o bloco começa aberto. Sem a prop, ele abre
   * sozinho quando o contêiner tem 640px ou mais e começa fechado abaixo disso.
   */
  defaultOpen?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
