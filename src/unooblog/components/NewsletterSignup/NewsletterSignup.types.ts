import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Estado da inscrição.
 * - 'idle': formulário aguardando o e-mail
 * - 'success': inscrição concluída; o formulário dá lugar à mensagem
 * - 'error': a inscrição falhou; a mensagem de erro aparece no campo
 */
export type UblNewsletterStatus = 'idle' | 'success' | 'error';

/**
 * Propriedades do componente NewsletterSignup da Unooblog.
 */
export interface UblNewsletterSignupProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'onSubmit' | 'defaultValue'> {
  /**
   * Título do cartão.
   * @default 'Receba os próximos posts'
   */
  title?: string;

  /**
   * Texto de apoio abaixo do título.
   */
  description?: string;

  /**
   * Rótulo do campo de e-mail (é o nome acessível do campo).
   * @default 'E-mail'
   */
  emailLabel?: string;

  /**
   * Rótulo do botão de envio.
   * @default 'Assinar'
   */
  buttonLabel?: string;

  /**
   * Chamado com o e-mail digitado (sem espaços nas pontas) quando o formato é
   * válido. O texto é lido do nó do campo no envio: o campo nunca é
   * controlado (AGENTS.md, 4.5.1), então o preenchimento automático do
   * navegador também vale.
   */
  onSubscribe?: (email: string) => void;

  /**
   * Estado da inscrição, decidido por quem recebe o e-mail.
   * @default 'idle'
   */
  status?: UblNewsletterStatus;

  /**
   * Mensagem exibida em `status="success"`, em região `aria-live`.
   * @default 'Inscrição confirmada. Você receberá os próximos posts por e-mail.'
   */
  successMessage?: string;

  /**
   * Mensagem exibida no campo em `status="error"`.
   * @default 'Não foi possível concluir a inscrição. Tente novamente em instantes.'
   */
  errorMessage?: string;

  /**
   * Mensagem do erro de formato, quando o e-mail está vazio ou inválido.
   * @default 'Informe um e-mail válido, como nome@exemplo.com.'
   */
  invalidMessage?: string;

  /**
   * E-mail inicial do campo (modo não controlado).
   */
  defaultValue?: string;

  /**
   * Nível do título (`<h2>` a `<h4>`).
   * @default 2
   */
  headingLevel?: 2 | 3 | 4;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
