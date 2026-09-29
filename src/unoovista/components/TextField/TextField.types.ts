import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Variantes do campo de texto.
 * - 'filled': caixa arredondada com preenchimento `fill-field` e contorno de
 *   controle, com o rótulo acima (autenticação e formulários)
 * - 'underline': rótulo à esquerda e traço inferior de controle, em linha
 *   (edição de perfil)
 */
export type UnvTextFieldVariant = 'filled' | 'underline';

/**
 * Propriedades do componente TextField do Unoovista.
 */
export interface UnvTextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Variante visual do campo.
   * @default 'filled'
   */
  variant?: UnvTextFieldVariant;

  /**
   * Rótulo do campo. Na variante 'underline' é exibido à esquerda do valor;
   * na variante 'filled' é lido por leitores de tela quando `hideLabel` é true.
   */
  label?: string;

  /**
   * Oculta visualmente o rótulo mantendo-o acessível.
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Texto de apoio exibido abaixo do campo.
   */
  hint?: React.ReactNode;

  /**
   * Mensagem de erro. Quando presente, o campo assume o estado inválido, que
   * não depende só da cor: contorno mais grosso, glifo de alerta e o prefixo
   * "Erro:" lido pelo leitor de tela.
   */
  error?: React.ReactNode;

  /**
   * Ação renderizada à direita do campo (ex.: "Esqueceu a senha?").
   */
  trailing?: React.ReactNode;

  /**
   * Ocupa toda a largura disponível do contêiner.
   * @default true
   */
  block?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral
   * por `data-unv-theme`.
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional aplicada ao contêiner do campo.
   */
  className?: string;
}
