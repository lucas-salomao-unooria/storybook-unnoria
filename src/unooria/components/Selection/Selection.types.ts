import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Escala oficial de tamanhos do Selection no Figma.
 * Conjunto `Select` (1124:1007) — quatro alturas de gatilho.
 * - `xs`: 32px de gatilho, raio 8px, valor em body-XXS (12/18)
 * - `sm`: 40px de gatilho, raio 8px, valor em body-XS (14/20)
 * - `md`: 48px de gatilho, raio 12px, valor em body-S (16/24)
 * - `lg`: 56px de gatilho, raio 16px, valor em body-M (18/28)
 */
export type SelectionSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Estados visuais publicados pelo conjunto `Select` (1124:1007) do Figma.
 * - `default`: contorno em neutral-150
 * - `active`: contorno em brandnavy-600 (foco / interação)
 * - `disabled`: contorno em neutral-150, rótulo e valor em neutral-500
 * - `error`: contorno, valor e descrição em danger-700
 */
export type SelectionState = 'default' | 'active' | 'disabled' | 'error';

/**
 * Temas visuais suportados (Light e Dark).
 */
export type SelectionTheme = UnooriaTheme;

/**
 * Valor do Selection: uma opção (`string`) no modo simples,
 * ou uma lista (`string[]`) quando `multiple` está ativo.
 */
export type SelectionValue = string | string[];

/**
 * Opção individual da lista suspensa.
 * Corresponde a uma instância de `Select State` (1218:10533) dentro do
 * `Select Box` (17017:43244).
 */
export interface SelectionOptionItem {
  /** Identificador único da opção */
  value: string;
  /** Rótulo exibido na linha e no gatilho quando selecionada */
  label: React.ReactNode;
  /** Desabilita a opção individualmente */
  disabled?: boolean;
}

/* ==========================================================================
   Selection.Option — conjunto `Select State` (1218:10533)
   ========================================================================== */

/**
 * Propriedades da linha de opção.
 * O Figma publica os estados `Default` e `Hover`; `selected`, `active` e
 * `disabled` são extensões declaradas na estória do componente.
 */
export interface SelectionOptionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Valor associado à opção, repassado ao `onSelect` */
  value?: string;
  /** Rótulo textual da linha (Figma: `Input Label`) */
  label?: React.ReactNode;
  /**
   * Exibe a caixa de seleção à esquerda do rótulo (Figma: `Show checkbox`).
   * @default true
   */
  showCheckbox?: boolean;
  /**
   * Marca a opção como selecionada — preenche o `Checkbox` do Design System.
   * @default false
   */
  selected?: boolean;
  /**
   * Realce de navegação por teclado, equivalente visual ao estado `Hover`
   * do Figma.
   * @default false
   */
  active?: boolean;
  /**
   * Desabilita a linha.
   * @default false
   */
  disabled?: boolean;
  /**
   * Escala de tamanho da linha.
   * @default 'md'
   */
  size?: SelectionSize;
  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: SelectionTheme;
  /** Callback disparado ao acionar a linha */
  onSelect?: (value: string | undefined, event: React.MouseEvent<HTMLDivElement>) => void;
}

/* ==========================================================================
   Selection.Box — conjunto `Select Box` (17017:43244)
   ========================================================================== */

/**
 * Propriedades do painel suspenso que agrupa as linhas de opção.
 */
export interface SelectionBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Escala de tamanho do painel — governa o raio e a altura das linhas
   * descendentes.
   * @default 'md'
   */
  size?: SelectionSize;
  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: SelectionTheme;
  /**
   * Posiciona o painel de forma flutuante (absoluta) sob o gatilho, sem
   * empurrar o conteúdo seguinte.
   * @default false
   */
  floating?: boolean;
  /**
   * Altura máxima do painel antes de habilitar rolagem interna.
   * O Figma desenha cinco linhas estáticas; a rolagem é extensão declarada.
   */
  maxHeight?: number | string;
}

/* ==========================================================================
   Selection.Trigger — conjunto `Select` (1124:1007)
   ========================================================================== */

/**
 * Propriedades do gatilho: linha de rótulo, caixa de valor com seta e
 * mensagem de descrição.
 */
export interface SelectionTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Rótulo superior do campo (Figma: propriedade `Placeholder`) */
  label?: React.ReactNode;
  /**
   * Exibe o asterisco vermelho de obrigatoriedade (Figma: `Required`).
   * @default false
   */
  required?: boolean;
  /**
   * Exibe o glifo de ajuda de 12px ao lado do rótulo (Figma: `Helper`).
   * @default false
   */
  helperIcon?: boolean | string | React.ReactNode;
  /** Conteúdo da caixa de valor (Figma: `Label` / `Active Label`) */
  valueLabel?: React.ReactNode;
  /**
   * Indica que o conteúdo da caixa é o texto de espera, e não uma seleção
   * efetiva — recebe cor de texto atenuada.
   * @default false
   */
  placeholderShown?: boolean;
  /** Mensagem sob a caixa (Figma: `Description`, usado como erro) */
  description?: React.ReactNode;
  /**
   * Estado visual do gatilho.
   * @default 'default'
   */
  state?: SelectionState;
  /**
   * Escala de tamanho.
   * @default 'md'
   */
  size?: SelectionSize;
  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: SelectionTheme;
  /**
   * Gira a seta para `keyboard_arrow_up`, indicando painel aberto.
   * @default false
   */
  open?: boolean;
  /** Classe CSS adicional para o container externo do gatilho */
  className?: string;
  /** Estilos inline do container externo do gatilho */
  style?: React.CSSProperties;
  /** Classe CSS adicional para a caixa de valor */
  controlClassName?: string;
}

/* ==========================================================================
   Selection — conjunto `Select Input` (12807:1730)
   ========================================================================== */

/**
 * Propriedades do componente completo, que compõe gatilho e painel com
 * gerenciamento de seleção, teclado e fechamento por clique externo.
 */
export interface SelectionProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'defaultValue' | 'children'
  > {
  /** Lista de opções do painel */
  options?: SelectionOptionItem[];
  /** Valor selecionado (modo controlado) */
  value?: SelectionValue;
  /** Valor inicial (modo não-controlado) */
  defaultValue?: SelectionValue;
  /** Callback de mudança de seleção */
  onChange?: (value: SelectionValue, option: SelectionOptionItem) => void;
  /**
   * Permite selecionar mais de uma opção — o painel do Figma usa caixas de
   * seleção, não botões de rádio.
   * @default false
   */
  multiple?: boolean;
  /** Estado de abertura do painel (modo controlado) */
  open?: boolean;
  /**
   * Estado inicial de abertura (modo não-controlado).
   * @default false
   */
  defaultOpen?: boolean;
  /** Callback de mudança do estado de abertura */
  onOpenChange?: (open: boolean) => void;
  /** Rótulo superior do campo (Figma: propriedade `Placeholder`) */
  label?: React.ReactNode;
  /**
   * Exibe o asterisco vermelho de obrigatoriedade.
   * @default false
   */
  required?: boolean;
  /** Exibe o glifo de ajuda de 12px ao lado do rótulo */
  helperIcon?: boolean | string | React.ReactNode;
  /** Texto de espera exibido quando nada está selecionado */
  placeholder?: React.ReactNode;
  /** Mensagem de erro, ou `true` para apenas pintar o estado */
  error?: boolean | string;
  /** Texto de apoio exibido quando não há erro */
  helperText?: React.ReactNode;
  /**
   * Força um estado visual, ignorando a derivação automática.
   * Útil para matrizes de documentação.
   */
  state?: SelectionState;
  /**
   * Desabilita o campo.
   * @default false
   */
  disabled?: boolean;
  /**
   * Escala de tamanho.
   * @default 'md'
   */
  size?: SelectionSize;
  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: SelectionTheme;
  /**
   * Ocupa toda a largura disponível do container.
   * @default true
   */
  fullWidth?: boolean;
  /**
   * Exibe as caixas de seleção nas linhas do painel.
   * @default true
   */
  showOptionCheckbox?: boolean;
  /**
   * Fecha o painel ao selecionar. Ignorado quando `multiple` está ativo.
   * @default true
   */
  closeOnSelect?: boolean;
  /**
   * Empilha o painel no fluxo, sob o gatilho, como no quadro
   * `Variant=Opened` do Figma, em vez de flutuar sobre o conteúdo.
   * @default false
   */
  inlineBox?: boolean;
  /** Altura máxima do painel antes de habilitar rolagem interna */
  maxBoxHeight?: number | string;
  /** Substitui a renderização do valor exibido no gatilho */
  renderValue?: (selected: SelectionOptionItem[]) => React.ReactNode;
  /** Nome do campo, para envio em formulários via input oculto */
  name?: string;
  /** Classe CSS adicional para o container externo */
  className?: string;
  /** Estilos inline do container externo */
  style?: React.CSSProperties;
  /** Classe CSS adicional para o gatilho */
  triggerClassName?: string;
  /** Classe CSS adicional para o painel */
  boxClassName?: string;
  /** Conteúdo customizado do painel, substituindo `options` */
  children?: React.ReactNode;
}
