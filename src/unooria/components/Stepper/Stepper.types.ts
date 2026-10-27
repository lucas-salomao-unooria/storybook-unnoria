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
 * Tamanho visual do Stepper.
 *
 * `xs` é a barra de etapas COMPACTA de uma tela de celular (375px): rótulo de
 * 12px, alvo de 28px e o vão entre as etapas reduzido. Junto de
 * `showIcons={false}` e `showConnector={false}`, quatro etapas cabem numa
 * linha de 343px ("Etapa 3 · Etapa 4 · Etapa 5: Reconstruir · Etapa 6").
 */
export type StepperSize = 'xs' | 'sm' | 'md' | 'lg';

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
   * Se falso, as etapas não desenham o glifo (o `add` padrão, o `check` da
   * concluída ou o `icon` informado): sobra só o rótulo, e o estado se lê pelo
   * peso e pela cor do texto e pelo `aria-current` da etapa atual. É a barra
   * só de texto de uma tela estreita.
   * @default true
   */
  showIcons?: boolean;

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
   * Se falso, a etapa não desenha o glifo. Ver `showIcons` no `Stepper`.
   * @default true
   */
  showIcon?: boolean;

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
