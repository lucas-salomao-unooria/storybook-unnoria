import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Elemento do título do certificado no sumário da página.
 */
export type CertificateTitleAs = 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

/**
 * Propriedades do componente Certificate da Plataforma Unooria.
 *
 * O selo de conclusão de uma missão: um cartão com o emblema (glifo num
 * medalhão), o título, a salvaguarda — uma garantia que a conclusão carrega,
 * mostrada como `Badge` de sucesso — e uma linha de rodapé. O certificado só
 * DESENHA: quem decide se ele aparece, e com qual salvaguarda, é o produto
 * (que sabe o que o servidor registrou).
 *
 * `title` do HTML fica de fora: aqui `title` é o título visível do certificado.
 */
export interface CertificateProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * O título ("Certificado de Auditoria Algorítmica"). É também o NOME
   * acessível do certificado (`<article aria-labelledby>`).
   */
  title: React.ReactNode;

  /**
   * Elemento do título. O padrão `h3` serve a um certificado dentro de uma
   * seção de `h2`; numa página que o põe direto sob o `h1`, passe `h2`.
   * @default 'h3'
   */
  titleAs?: CertificateTitleAs;

  /**
   * Ligadura do Material Symbols Rounded no medalhão (`balance`,
   * `workspace_premium`, `verified`). Decorativo: o nome é o `title`.
   * @default 'workspace_premium'
   */
  icon?: string;

  /**
   * A salvaguarda que a conclusão garante ("Direito à Explicação e Revisão
   * Humana"). Sai num `Badge` de sucesso com o glifo `verified_user`. Ausente,
   * o selo não aparece.
   */
  safeguard?: React.ReactNode;

  /**
   * Texto de rodapé, sob um fio tracejado ("Resultado congelado em 12/10 às
   * 10h32."). Sai num `<footer>` do certificado.
   */
  footer?: React.ReactNode;

  /**
   * Conteúdo livre entre o título e a salvaguarda (uma `Tag` com a equipe, um
   * parágrafo). Opcional.
   */
  children?: React.ReactNode;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /** Classe CSS adicional. */
  className?: string;
}
