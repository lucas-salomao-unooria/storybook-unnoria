import React from 'react';

/**
 * Estados possíveis de cada passo (Step)
 */
export type StepStatus = 'default' | 'selected' | 'completed' | 'error' | 'disabled';

/**
 * Orientação do Stepper: horizontal (padrão) ou vertical
 */
export type StepperOrientation = 'horizontal' | 'vertical';

/**
 * Tamanho visual do Stepper
 */
export type StepperSize = 'sm' | 'md' | 'lg';

/**
 * Definição individual de uma etapa (Step)
 */
export interface StepItem {
  /**
   * Identificador único da etapa.
   */
  id?: string | number;

  /**
   * Rótulo principal da etapa (ex: "Dados Pessoais", "Endereço").
   */
  label: React.ReactNode;

  /**
   * Descrição ou subtítulo opcional.
   */
  description?: React.ReactNode;

  /**
   * Nome do ícone Google Material Symbols (ex: "add", "person", "home", "check_circle").
   */
  icon?: string;

  /**
   * Estado explícito da etapa. Se omitido, é inferido automaticamente com base no `currentStep`.
   */
  status?: StepStatus;

  /**
   * Se verdadeiro, indica que a etapa é opcional e exibe uma tag ou texto informativo.
   */
  optional?: boolean;

  /**
   * Se verdadeiro, desabilita a interação com esta etapa.
   */
  disabled?: boolean;
}

/**
 * Propriedades do componente Stepper
 * Plataforma Unooria - Extraído do Figma (Node 12694:10079 / Component Set 12694:10091)
 */
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Lista de etapas quando utilizado no modo baseado em dados.
   */
  steps?: StepItem[];

  /**
   * Índice da etapa atual ativa (0-indexed).
   * @default 0
   */
  currentStep?: number;

  /**
   * Callback disparado quando o usuário clica em uma etapa navegável.
   */
  onStepClick?: (stepIndex: number, step: StepItem) => void;

  /**
   * Orientação do Stepper: 'horizontal' ou 'vertical'.
   * @default 'horizontal'
   */
  orientation?: StepperOrientation;

  /**
   * Tamanho visual do Stepper.
   * @default 'md'
   */
  size?: StepperSize;

  /**
   * Se verdadeiro, permite ao usuário clicar nas etapas para navegar.
   * @default true
   */
  clickable?: boolean;

  /**
   * Se verdadeiro, exibe as linhas conectoras entre as etapas.
   * @default true
   */
  showConnector?: boolean;

  /**
   * Se verdadeiro, preenche os conectores de etapas já concluídas com a cor de destaque (Brand Navy).
   * @default true
   */
  fillCompletedConnectors?: boolean;

  /**
   * Tema visual: 'light' (fundo claro) ou 'dark' (fundo escuro #22272A).
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Subcomponentes declarativos (modo Compound Component).
   */
  children?: React.ReactNode;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais.
   */
  style?: React.CSSProperties;
}

/**
 * Propriedades do subcomponente Step (usado no modo declarativo ou renderizado internamente)
 */
export interface StepProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Índice da etapa.
   */
  index?: number;

  /**
   * Rótulo principal da etapa.
   */
  label: React.ReactNode;

  /**
   * Descrição ou subtítulo opcional.
   */
  description?: React.ReactNode;

  /**
   * Nome do ícone Material Symbols.
   */
  icon?: string;

  /**
   * Estado da etapa.
   * @default 'default'
   */
  status?: StepStatus;

  /**
   * Se a etapa é opcional.
   */
  optional?: boolean;

  /**
   * Se a etapa é clicável.
   */
  clickable?: boolean;

  /**
   * Tamanho visual.
   */
  size?: StepperSize;

  /**
   * Tema visual.
   */
  theme?: 'light' | 'dark';

  /**
   * Callback de clique.
   */
  onStepClick?: () => void;
}
