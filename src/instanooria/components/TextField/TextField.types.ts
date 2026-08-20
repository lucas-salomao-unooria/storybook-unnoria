import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Variantes do campo de texto.
 * - 'filled': caixa preenchida com contorno, usada nas telas de autenticação
 * - 'underline': rótulo à esquerda e traço inferior, usado em "Editar perfil"
 */
export type InstaTextFieldVariant = 'filled' | 'underline';

/**
 * Propriedades do componente TextField do Instanooria.
 */
export interface InstaTextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Variante visual do campo.
   * @default 'filled'
   */
  variant?: InstaTextFieldVariant;

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
   * Mensagem de erro. Quando presente, o campo assume o estado inválido.
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
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional aplicada ao contêiner do campo.
   */
  className?: string;
}
