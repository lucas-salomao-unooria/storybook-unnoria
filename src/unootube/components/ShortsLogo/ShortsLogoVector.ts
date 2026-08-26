/**
 * Vetores do logotipo do Shorts.
 *
 * Copiados **literalmente** dos exports SVG do arquivo Figma "Free YouTube
 * Shorts Mockups (Community)" (fileKey `FlqnnoY0Mqdjic53twLAC1`). Nenhum
 * caminho foi desenhado à mão nem aproximado, e o `viewBox` de cada export é
 * preservado — os dois são **não quadrados**.
 *
 * O arquivo publica **duas formas distintas**, e é por isso que existem duas
 * entradas em vez de uma com prop de cor:
 *
 * - `brand` (node `1:737`) é o raio **maciço**, em vermelho, com o triângulo de
 *   reprodução vazado na tinta escura. É a marca do produto, e aparece ao lado
 *   do título "Shorts" das prateleiras.
 * - `mono` (node `I1:241;13:110`) é o raio **em contorno**, monocromático, com o
 *   triângulo preenchido na mesma cor. É o ícone de navegação, e aparece na
 *   barra de abas móvel e na barra lateral.
 *
 * O raio maciço nunca é usado como ícone de navegação, e o de contorno nunca é
 * pintado de vermelho: são papéis diferentes, e a prop `variant` os separa.
 */

/** Um caminho do logotipo, com o preenchimento literal do nó. */
export interface UniShortsLogoShape {
  /** Atributo `d` literal do export */
  d: string;
  /**
   * Preenchimento literal do nó. Quando ausente, o caminho herda
   * `currentColor` — é o que permite ao raio de contorno servir ao texto
   * primário, ao secundário e ao branco sobre mídia.
   */
  fill?: string;
}

/** Definição de uma das duas formas publicadas. */
export interface UniShortsLogoVariantDefinition {
  /** Nome da camada correspondente no Figma */
  figmaName: string;
  /** Node do Figma de origem */
  figmaNode: string;
  /** `viewBox` literal do export */
  viewBox: string;
  /** Caminhos, na ordem de pintura do arquivo */
  shapes: UniShortsLogoShape[];
  /** Onde o arquivo usa esta forma */
  usage: string;
}

export const uniShortsLogoVectors = {
  brand: {
    figmaName: 'Group 37591',
    figmaNode: '1:737',
    viewBox: '0 0 15.9097 20.0251',
    shapes: [
      {
        d: 'M1.80722 5.22195C0.0787003 6.21964 -0.513097 8.42923 0.48495 10.1573C1.16589 11.3373 2.41222 11.9876 3.68466 11.9636C3.78667 11.9617 3.84022 12.0996 3.75901 12.1614L2.28475 13.2827C0.556239 14.2804 -0.0355575 16.49 0.962489 18.218C1.95956 19.9461 4.16952 20.5381 5.89804 19.5404L14.1031 14.8031C15.8307 13.8055 16.4225 11.5959 15.4254 9.86783C14.7141 8.63636 13.3881 7.98179 12.0591 8.06834C11.9494 8.07548 11.8854 7.91235 11.9766 7.851L13.6256 6.74234C15.3531 5.74466 15.9449 3.53507 14.9478 1.80704C13.9498 0.0790104 11.7408 -0.513031 10.0123 0.48465L1.80722 5.22195Z',
        fill: 'var(--uni-color-brand-shorts)',
      },
      {
        d: 'M10.6109 9.98885C10.7443 10.0658 10.7443 10.2583 10.6109 10.3353L6.24091 12.8583C6.10757 12.9353 5.94091 12.8391 5.94091 12.6851L5.94091 7.63902C5.94091 7.48506 6.10757 7.38883 6.24091 7.46581L10.6109 9.98885Z',
        fill: 'var(--uni-color-shorts-ink)',
      },
    ],
    usage: 'Marca da prateleira de Shorts, à esquerda do título',
  },
  mono: {
    figmaName: 'Group 3',
    figmaNode: 'I1:241;13:110',
    viewBox: '0 0 27.1787 24.8375',
    shapes: [
      {
        d: 'M5.39734 8.00298C3.34752 9.15173 2.6452 11.6959 3.82866 13.6856C4.49045 14.7983 5.51738 15.5492 6.61863 15.8132C5.10141 17.0934 4.68008 19.2771 5.72288 21.0303C6.90634 23.02 9.52745 23.7017 11.5773 22.553L21.7814 16.8345C23.8312 15.6857 24.5335 13.1415 23.35 11.1518C22.6971 10.0541 21.6066 9.35445 20.4158 9.14072C22.0498 7.87987 22.531 5.61468 21.4558 3.80713C20.2724 1.81743 17.6513 1.13571 15.6014 2.28446L5.39734 8.00298ZM17.7103 9.68566C17.7444 9.55735 17.8288 9.44243 17.9554 9.37149L19.3514 8.58912C20.8888 7.72756 21.4155 5.8194 20.5279 4.32713C19.6403 2.83485 17.6745 2.32356 16.1371 3.18513L5.93306 8.90365C4.39569 9.76521 3.86895 11.6734 4.75655 13.1656C5.54365 14.489 6.92827 15.1812 8.2023 14.777C8.38081 14.7204 8.5786 14.7335 8.73634 14.8164C8.82297 14.8609 8.89839 14.9291 8.95126 15.018C9.09919 15.2667 9.01447 15.583 8.76203 15.7245L7.82727 16.2483C6.2899 17.1099 5.76316 19.018 6.65076 20.5103C7.53836 22.0026 9.50419 22.5139 11.0416 21.6523L21.2456 15.9338C22.783 15.0722 23.3098 13.1641 22.4222 11.6718C21.6241 10.33 19.9543 9.78135 18.508 10.3106C18.2352 10.4105 17.9114 10.3282 17.7635 10.0795C17.689 9.95429 17.6733 9.8111 17.7103 9.68566Z',
      },
      {
        d: 'M11.5367 10.7994C11.5367 10.4217 11.9523 10.1888 12.2893 10.3777L16.575 12.7794C16.9157 12.9704 16.9205 13.4484 16.5835 13.6373L12.2978 16.039C11.9608 16.2279 11.5367 15.9849 11.5367 15.6029L11.5367 10.7994Z',
      },
    ],
    usage: 'Ícone de navegação, na barra de abas móvel e na barra lateral',
  },
} as const satisfies Record<string, UniShortsLogoVariantDefinition>;

/** As duas formas publicadas pelo arquivo. */
export type UniShortsLogoVariant = keyof typeof uniShortsLogoVectors;

/** O mesmo registro com a assinatura larga da interface. */
export const uniShortsLogo: Record<UniShortsLogoVariant, UniShortsLogoVariantDefinition> =
  uniShortsLogoVectors;
