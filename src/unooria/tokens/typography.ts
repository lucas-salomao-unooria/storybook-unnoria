/**
 * Tokens de Tipografia e Regras do Design System - Plataforma Unooria
 * Extraídos e sincronizados das especificações oficiais do Figma
 */

export const fontFamilies = {
  sans: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const desktopFontSizes = {
  'heading-4xl': '60px',
  'heading-xxxl': '48px',
  'heading-xxl': '34px',
  'title-xl': '24px',
  'title-l': '20px',
  'body-m': '18px',
  'body-s': '16px',
  'body-xs': '14px',
  'body-xxs': '12px',
  'caption-xxxs': '10px',
} as const;

export const desktopLineHeights = {
  'heading-4xl': '78px',
  'heading-xxxl': '64px',
  'heading-xxl': '48px',
  'title-xl': '34px',
  'title-l': '30px',
  'body-m': '28px',
  'body-s': '24px',
  'body-xs': '20px',
  'body-xxs': '18px',
  'caption-xxxs': '14px',
} as const;

export const mobileFontSizes = {
  'heading-4xl': '34px', // Substituição automática em mobile para 34px
  'heading-xxxl': '34px', // Substituição automática em mobile para 34px
  'heading-xxl': '24px',
  'title-xl': '20px',
  'title-l': '18px',
  'body-m': '16px',
  'body-s': '14px',
  'body-xs': '14px',
  'body-xxs': '10px',
  'caption-xxxs': '10px',
} as const;

export const mobileLineHeights = {
  'heading-4xl': '48px', // Substituição automática em mobile para 48px
  'heading-xxxl': '48px', // Substituição automática em mobile para 48px
  'heading-xxl': '34px',
  'title-xl': '30px',
  'title-l': '28px',
  'body-m': '24px',
  'body-s': '20px',
  'body-xs': '18px',
  'body-xxs': '14px',
  'caption-xxxs': '14px',
} as const;

export const fontSizes = desktopFontSizes;
export const lineHeights = desktopLineHeights;

export const letterSpacings = {
  tight: '-0.01em',
  normal: '0px',
  wide: '0.02em',
} as const;

export interface RecommendedWeight {
  weight: number;
  weightName: string;
  context: string;
}

export interface TypographyTokenStyle {
  id: string;
  name: string;
  category: 'heading' | 'title' | 'body' | 'caption';
  description: string;
  fontFamily: string;
  desktop: {
    fontSize: string;
    lineHeight: string;
  };
  mobile: {
    fontSize: string;
    lineHeight: string;
  };
  recommendedWeights: RecommendedWeight[];
  sampleText: string;
}

export const typographyStyles: Record<string, TypographyTokenStyle> = {
  heading4XL: {
    id: 'heading-4xl',
    name: 'Heading 4XL',
    category: 'heading',
    description: 'Título principal de impacto para hero sections e capas no desktop. Substituído automaticamente por 34px em mobile.',
    fontFamily: fontFamilies.sans,
    desktop: {
      fontSize: '60px',
      lineHeight: '78px',
    },
    mobile: {
      fontSize: '34px',
      lineHeight: '48px',
    },
    recommendedWeights: [
      { weight: 700, weightName: 'Bold (700)', context: 'Desktop: Garante autoridade visual' },
      { weight: 600, weightName: 'Semibold (600)', context: 'Opção de menor contraste' },
      { weight: 400, weightName: 'Regular (400)', context: 'Títulos elegantes de grandes dimensões' },
    ],
    sampleText: 'Plataforma Unooria Design System',
  },
  headingXXXL: {
    id: 'heading-xxxl',
    name: 'Heading XXXL',
    category: 'heading',
    description: 'Títulos de seções de alta hierarquia e banners. Substituído automaticamente por 34px em mobile.',
    fontFamily: fontFamilies.sans,
    desktop: {
      fontSize: '48px',
      lineHeight: '64px',
    },
    mobile: {
      fontSize: '34px',
      lineHeight: '48px',
    },
    recommendedWeights: [
      { weight: 700, weightName: 'Bold (700)', context: 'Desktop: Hierarquia principal' },
      { weight: 600, weightName: 'Semibold (600)', context: 'Subtítulos de destaque' },
      { weight: 400, weightName: 'Regular (400)', context: 'Variação regular' },
    ],
    sampleText: 'Conheça nossos Fundamentos e Princípios',
  },
  headingXXL: {
    id: 'heading-xxl',
    name: 'Heading XXL',
    category: 'heading',
    description: 'Cabeçalho para seções e páginas internas.',
    fontFamily: fontFamilies.sans,
    desktop: {
      fontSize: '34px',
      lineHeight: '48px',
    },
    mobile: {
      fontSize: '24px',
      lineHeight: '34px',
    },
    recommendedWeights: [
      { weight: 700, weightName: 'Bold (700)', context: 'Uso padrão para títulos de seção' },
      { weight: 600, weightName: 'Semibold (600)', context: 'Densidade mobile moderada' },
      { weight: 400, weightName: 'Regular (400)', context: 'Estilo editorial' },
    ],
    sampleText: '1 - Fundamentos e Princípios',
  },
  titleXL: {
    id: 'title-xl',
    name: 'Title XL',
    category: 'title',
    description: 'Títulos de cards grandes, modal headers e grupos de conteúdo.',
    fontFamily: fontFamilies.sans,
    desktop: {
      fontSize: '24px',
      lineHeight: '34px',
    },
    mobile: {
      fontSize: '20px',
      lineHeight: '30px',
    },
    recommendedWeights: [
      { weight: 700, weightName: 'Bold (700)', context: 'Títulos e cabeçalhos em destaque' },
      { weight: 600, weightName: 'Semibold (600)', context: 'Alternativa para alta densidade' },
      { weight: 400, weightName: 'Regular (400)', context: 'Sub-cabeçalhos' },
    ],
    sampleText: 'Integridade e Consistência do Sistema',
  },
  titleL: {
    id: 'title-l',
    name: 'Title L',
    category: 'title',
    description: 'Subtítulos de componentes, tabelas e cabeçalhos secundários.',
    fontFamily: fontFamilies.sans,
    desktop: {
      fontSize: '20px',
      lineHeight: '30px',
    },
    mobile: {
      fontSize: '18px',
      lineHeight: '28px',
    },
    recommendedWeights: [
      { weight: 700, weightName: 'Bold (700)', context: 'Contraste elevado' },
      { weight: 600, weightName: 'Semibold (600)', context: 'Subtítulos e botões proeminentes' },
      { weight: 400, weightName: 'Regular (400)', context: 'Textos em caixas de destaque' },
    ],
    sampleText: 'Regras de Aplicação de Pesos por Contexto',
  },
  bodyM: {
    id: 'body-m',
    name: 'Body M',
    category: 'body',
    description: 'Base padrão de leitura da interface para parágrafos e textos longos.',
    fontFamily: fontFamilies.sans,
    desktop: {
      fontSize: '18px',
      lineHeight: '28px',
    },
    mobile: {
      fontSize: '16px',
      lineHeight: '24px',
    },
    recommendedWeights: [
      { weight: 400, weightName: 'Regular (400)', context: 'Base de leitura contínua e parágrafos' },
      { weight: 600, weightName: 'Semibold (600)', context: 'Destaque de palavras importantes no parágrafo' },
      { weight: 700, weightName: 'Bold (700)', context: 'Atenção imediata' },
    ],
    sampleText: 'Conforme definido nos fundamentos, este Design System é uma coleção de regras e princípios que devem ser seguidos fielmente para manter a consistência visual.',
  },
  bodyS: {
    id: 'body-s',
    name: 'Body S',
    category: 'body',
    description: 'Texto secundário, cards compactos e descrição de campos de entrada.',
    fontFamily: fontFamilies.sans,
    desktop: {
      fontSize: '16px',
      lineHeight: '24px',
    },
    mobile: {
      fontSize: '14px',
      lineHeight: '20px',
    },
    recommendedWeights: [
      { weight: 400, weightName: 'Regular (400)', context: 'Leitura secundária' },
      { weight: 600, weightName: 'Semibold (600)', context: 'Componentes como Botões e Tabs' },
      { weight: 700, weightName: 'Bold (700)', context: 'Ênfase em textos menores' },
    ],
    sampleText: 'Utilize Semibold (600) para garantir legibilidade em componentes menores.',
  },
  bodyXS: {
    id: 'body-xs',
    name: 'Body XS',
    category: 'body',
    description: 'Labels de formulários, ajudas de campos e descrições auxiliares.',
    fontFamily: fontFamilies.sans,
    desktop: {
      fontSize: '14px',
      lineHeight: '20px',
    },
    mobile: {
      fontSize: '14px',
      lineHeight: '18px',
    },
    recommendedWeights: [
      { weight: 500, weightName: 'Medium (500)', context: 'Formulários: Labels para diferenciar do conteúdo' },
      { weight: 600, weightName: 'Semibold (600)', context: 'Componentes compactos' },
      { weight: 400, weightName: 'Regular (400)', context: 'Mensagens de ajuda / Helper text' },
    ],
    sampleText: 'Labels de formulários devem utilizar Medium (500) para diferenciar o rótulo do valor inserido.',
  },
  bodyXXS: {
    id: 'body-xxs',
    name: 'Body XXS',
    category: 'body',
    description: 'Rodapés, avisos legais, badges e metadados de sistema.',
    fontFamily: fontFamilies.sans,
    desktop: {
      fontSize: '12px',
      lineHeight: '18px',
    },
    mobile: {
      fontSize: '10px',
      lineHeight: '14px',
    },
    recommendedWeights: [
      { weight: 400, weightName: 'Regular (400)', context: 'Metadados e notas de rodapé' },
      { weight: 600, weightName: 'Semibold (600)', context: 'Badges de status' },
      { weight: 700, weightName: 'Bold (700)', context: 'Indicadores de perigo / alerta' },
    ],
    sampleText: 'Avisos de copyright, versão do sistema e metadados de auditoria.',
  },
  captionXXXS: {
    id: 'caption-xxxs',
    name: 'Caption XXXS',
    category: 'caption',
    description: 'Legendas mínimas, micro-copy, timestamps e marcações de sistema.',
    fontFamily: fontFamilies.sans,
    desktop: {
      fontSize: '10px',
      lineHeight: '14px',
    },
    mobile: {
      fontSize: '10px',
      lineHeight: '14px',
    },
    recommendedWeights: [
      { weight: 400, weightName: 'Regular (400)', context: 'Timestamps e micro-detalhes' },
      { weight: 600, weightName: 'Semibold (600)', context: 'Rótulos minúsculos' },
      { weight: 700, weightName: 'Bold (700)', context: 'Contadores em relatórios' },
    ],
    sampleText: 'DESIGN SYSTEM • PLATAFORMA UNOORIA',
  },
} as const;

export const typographyRules = {
  title: 'Regras da Tipografia da Plataforma Unooria',
  sections: [
    {
      title: '1 - Fundamentos e Princípios',
      content:
        'Conforme definido nos fundamentos, este Design System é uma coleção de regras e princípios que devem ser seguidos fielmente para manter a consistência visual.',
      weights: [
        {
          name: 'Regular (400)',
          usage: 'Utilizado para blocos de leitura contínua e parágrafos.',
        },
        {
          name: 'Medium (500)',
          usage: 'Aplicado em textos que necessitam de destaque sutil, como labels de formulários ou itens de listas.',
        },
        {
          name: 'Semibold (600)',
          usage: 'Utilizado para sub-títulos, estados ativos de componentes e rótulos de botões.',
        },
        {
          name: 'Bold (700)',
          usage: 'Reservado para títulos principais e informações que exigem atenção imediata.',
        },
      ],
    },
    {
      title: '2 - Regras de Aplicação de Pesos por Contexto',
      categories: [
        {
          name: 'Títulos e Cabeçalhos',
          rules: [
            'Desktop: Use Bold (700) para tokens de 4XL a XL para garantir autoridade visual.',
            'Mobile: Para os tokens de 34px a 20px, pode-se alternar entre Bold (700) e Semibold (600) dependendo da densidade da tela.',
          ],
        },
        {
          name: 'Corpo de Texto e Interface',
          rules: [
            'Leitura: O token M (18px) em Regular (400) é a base da interface.',
            'Destaque no Texto: Use Semibold (600) para destacar palavras importantes dentro de parágrafos.',
            'Componentes (Botões/Tabs): Utilize Semibold (600) para garantir legibilidade em tamanhos menores como S (16px) ou XS (14px).',
            'Formulários: Labels devem utilizar Medium (500) no tamanho XS (14px) para diferenciar o rótulo do conteúdo preenchido.',
          ],
        },
      ],
    },
    {
      title: '3 - Diretrizes de Responsividade',
      rules: [
        {
          topic: 'Substituição Automática',
          description:
            'Em dispositivos móveis, qualquer elemento marcado como 4XL ou XXXL deve renderizar automaticamente com o tamanho de 34px (XXL) e linha de 48px.',
        },
        {
          topic: 'Fidelidade Técnica',
          description:
            '"Um design system é essencialmente uma coleção de regras, restrições e princípios implementados em design e código". Não é permitida a criação de novos pesos ou tamanhos fora desta tabela oficial.',
        },
      ],
    },
  ],
} as const;

export const unooriaTypography = {
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  desktopFontSizes,
  desktopLineHeights,
  mobileFontSizes,
  mobileLineHeights,
  letterSpacings,
  styles: typographyStyles,
  rules: typographyRules,
} as const;

export const typography = unooriaTypography;

/** Tipos derivados de Tipografia */
export type FontFamiliesTokens = typeof fontFamilies;
export type UnooriaFontFamilyKey = keyof typeof fontFamilies;

export type FontWeightsTokens = typeof fontWeights;
export type UnooriaFontWeightKey = keyof typeof fontWeights;

export type DesktopFontSizesTokens = typeof desktopFontSizes;
export type UnooriaFontSizeKey = keyof typeof desktopFontSizes;

export type DesktopLineHeightsTokens = typeof desktopLineHeights;
export type UnooriaLineHeightKey = keyof typeof desktopLineHeights;

export type MobileFontSizesTokens = typeof mobileFontSizes;
export type MobileLineHeightsTokens = typeof mobileLineHeights;

export type LetterSpacingsTokens = typeof letterSpacings;
export type UnooriaLetterSpacingKey = keyof typeof letterSpacings;

export type TypographyStylesTokens = typeof typographyStyles;
export type UnooriaTypographyStyleKey = keyof typeof typographyStyles;

export type UnooriaTypographyTokens = typeof unooriaTypography;

export default typography;
