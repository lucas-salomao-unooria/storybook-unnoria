import React from 'react';

/**
 * Cores oficiais da marca Unooria
 */
export type LogoColor =
  | 'navy'       // #0B0C28 / #0E1039 (Brand Navy Principal)
  | 'blue'       // #7FA5E2 (Sky Blue)
  | 'lavender'   // #8886AA / #A5A4D0 (Lavender / Lilac)
  | 'white'      // #FFFFFF (Negative)
  | 'black'      // #000000 (Monochrome)
  | 'auto';      // Adapta automaticamente ao tema (Navy no Light, White no Dark)

/**
 * Escala de tamanhos oficiais do Logo Unooria
 */
export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

/**
 * Estilos do Símbolo / Isótipo
 */
export type LogoSymbolVariant = 'fill' | 'outline';

/**
 * Propriedades do componente Logo (Marca Unooria com Wordmark completo)
 */
export interface LogoProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Tamanho do logo:
   * - xs: 18px altura
   * - sm: 24px altura
   * - md: 32px altura (Padrão)
   * - lg: 48px altura
   * - xl: 64px altura
   * - number: Altura customizada em pixels (a largura mantém a proporção ~4.6:1)
   * @default 'md'
   */
  size?: LogoSize;

  /**
   * Variação de cor oficial da marca:
   * - 'navy': #0B0C28 (Azul Escuro Unooria)
   * - 'blue': #7FA5E2 (Azul Céu Unooria)
   * - 'lavender': #8886AA (Lavanda Unooria)
   * - 'white': #FFFFFF (Branco Negativo)
   * - 'black': #000000 (Preto Monocromático)
   * - 'auto': Automático pelo tema
   * @default 'auto'
   */
  color?: LogoColor;

  /**
   * Exibe o símbolo de marca registrada (®) sobrescrito
   * @default true
   */
  showRegisteredMark?: boolean;

  /**
   * Tema visual: 'light' ou 'dark'
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Texto alternativo para acessibilidade (aria-label)
   * @default 'Unooria'
   */
  ariaLabel?: string;

  /**
   * Classes CSS adicionais
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais
   */
  style?: React.CSSProperties;

  /**
   * Callback ao clicar no logo
   */
  onClick?: () => void;
}

/**
 * Propriedades do componente LogoSymbol (Isótipo / Símbolo Infinito Orgânico Isolado)
 */
export interface LogoSymbolProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Tamanho do símbolo
   * - xs: 16px
   * - sm: 24px
   * - md: 32px (Padrão)
   * - lg: 48px
   * - xl: 64px
   * - number: Largura customizada em pixels (proporção ~1.85:1)
   * @default 'md'
   */
  size?: LogoSize;

  /**
   * Estilo do símbolo: 'fill' (preenchido) ou 'outline' (apenas contorno)
   * @default 'fill'
   */
  variant?: LogoSymbolVariant;

  /**
   * Cor de preenchimento ou do contorno
   * @default 'auto'
   */
  color?: LogoColor | string;

  /**
   * Tema visual: 'light' ou 'dark'
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Texto alternativo para acessibilidade (aria-label)
   * @default 'Símbolo Unooria'
   */
  ariaLabel?: string;

  /**
   * Classes CSS adicionais
   */
  className?: string;

  /**
   * Callback ao clicar
   */
  onClick?: () => void;
}

/**
 * Propriedades do LogoAppIcon (Ícone em Squircle para App / Favicon)
 */
export interface LogoAppIconProps {
  /**
   * Tamanho do ícone
   * - sm: 48px
   * - md: 64px (Padrão)
   * - lg: 96px
   * - xl: 128px
   * - number: Tamanho quadrado em pixels
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;

  /**
   * Variante visual do App Icon:
   * - 'light': Fundo branco com borda e símbolo em Navy
   * - 'dark': Fundo Navy escuro com borda e símbolo em Lavanda
   * @default 'light'
   */
  variant?: 'light' | 'dark';

  /**
   * Classes CSS adicionais
   */
  className?: string;

  /**
   * Estilos CSS inline
   */
  style?: React.CSSProperties;

  /**
   * Callback ao clicar
   */
  onClick?: () => void;
}

/**
 * Propriedades do Lockup com Parceiro (Co-branding)
 */
export interface LogoLockupProps {
  /**
   * Nome do parceiro ou texto secundário
   */
  partnerName?: string;

  /**
   * Logo customizado do parceiro (ReactNode)
   */
  partnerLogo?: React.ReactNode;

  /**
   * Tamanho do logo Unooria no lockup
   * @default 'md'
   */
  size?: LogoSize;

  /**
   * Cor do logo Unooria
   */
  color?: LogoColor;

  /**
   * Tema visual
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Classes CSS adicionais
   */
  className?: string;

  /**
   * Estilos CSS inline
   */
  style?: React.CSSProperties;
}
