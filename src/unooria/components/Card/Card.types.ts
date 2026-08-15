import React from 'react';
import type { UnooriaTheme } from '../../tokens';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'interactive';
export type CardOrientation = 'vertical' | 'horizontal';
export type CardTheme = UnooriaTheme;
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | number | string;
export type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string;
export type CardTitleSize = 'sm' | 'md' | 'lg' | 'xl';
export type CardTitleAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div' | 'p';

export interface CardMetadataItem {
  icon?: React.ReactNode;
  text: React.ReactNode;
}

export interface CardActionItem {
  label: React.ReactNode;
  variant?: 'filled' | 'subtle';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  disabled?: boolean;
}

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  tag?: React.ReactNode;
  tags?: React.ReactNode[];
  action?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  progress?: number;
  className?: string;
  children?: React.ReactNode;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: CardTitleAs;
  size?: CardTitleSize;
  truncate?: boolean | number;
  className?: string;
  children?: React.ReactNode;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  icon?: React.ReactNode;
  truncate?: boolean | number;
  className?: string;
  children?: React.ReactNode;
}

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  aspectRatio?: string | number;
  height?: number | string;
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  className?: string;
  children?: React.ReactNode;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface CardBadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface CardProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
}

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: CardVariant;
  orientation?: CardOrientation;
  theme?: CardTheme;
  interactive?: boolean;
  disabled?: boolean;

  // Atalhos declarativos de alto nível conforme Figma #7731:291
  icon?: React.ReactNode;
  tag?: React.ReactNode;
  tags?: React.ReactNode[];
  optionsAction?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  progress?: number;
  description?: React.ReactNode;
  metadata?: CardMetadataItem[];
  subtags?: React.ReactNode[];
  primaryAction?: CardActionItem;
  secondaryAction?: CardActionItem;
  actions?: CardActionItem[];

  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
