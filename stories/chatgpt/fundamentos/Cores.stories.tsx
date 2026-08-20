import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  gptPrimitiveColors,
  gptPrimitiveCssVars,
  gptPrimitiveFigmaNames,
  gptLightColors,
  gptDarkColors,
  gptSemanticCssVars,
  gptSemanticFigmaNames,
  gptOverlays,
  gptTranslucentScale,
  type GptSemanticColors,
} from '../../../src/chatgpt/tokens/colors';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  GptDocCard,
  GptDocGrid,
  GptDocFigmaSpecs,
  GptDocPractices,
  GptDocPropsTable,
  GptDocStage,
  GptDocThemeSwitcher,
  GptDocTokenSwatch,
} from '../../../.storybook/components';
import { Badge, Button, ChatBubble, Tag } from '../../../src/chatgpt/components';
import { gptFigmaNodes } from '../fixtures';

/** Agrupamento semântico dos tokens para exibição em documentação. */
const GRUPOS_SEMANTICOS: {
  title: string;
  description: string;
  keys: (keyof GptSemanticColors)[];
}[] = [
  {
    title: 'Superfícies',
    description:
      'Hierarquia de profundidade das telas: área de conversa, barra lateral, blocos sutis, superfície invertida dos botões sólidos e superfície de marca.',
    keys: ['bgPrimary', 'bgSecondary', 'bgTertiary', 'bgInverse', 'bgBrand'],
  },
  {
    title: 'Texto',
    description:
      'Três níveis de contraste, o texto sobre superfície invertida, o texto de marca e o link.',
    keys: ['textPrimary', 'textSecondary', 'textTertiary', 'textInverse', 'textBrand', 'textLink'],
  },
  {
    title: 'Bordas',
    description:
      'Contorno padrão de campos e cartões, o contorno de alto contraste e o contorno de foco.',
    keys: ['borderDefault', 'borderStrong', 'borderBrand'],
  },
  {
    title: 'Interação',
    description: 'Ação primária, seu estado de hover e a ação secundária azul.',
    keys: ['interactivePrimary', 'interactiveHover', 'interactiveSecondary'],
  },
  {
    title: 'Estados',
    description: 'Sucesso, erro, atenção e informação — as quatro severidades da biblioteca.',
    keys: ['statusSuccess', 'statusError', 'statusWarning', 'statusInfo'],
  },
];

const PRIMITIVAS: (keyof typeof gptPrimitiveColors)[][] = [
  ['black', 'white', 'gray50', 'gray100', 'gray200', 'gray400', 'gray600', 'gray800', 'gray900'],
  ['purple400', 'purple500', 'purple600', 'purple700'],
  ['blue400', 'blue500', 'blue600'],
  ['green500', 'green600', 'red500', 'red600'],
  ['orange400', 'orange500', 'yellow500', 'pink400', 'pink500'],
];

/**
 * Página de documentação rica dos tokens de cor.
 */
const CoresDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Fundamentos • Cores"
      title="Cores"
      description="As 25 primitivas de Primitives/Colors, os 21 tokens semânticos de Semantic/Colors com modos Light e Dark, os 8 overlays publicados como estilos de pintura e a escada translúcida que os componentes aplicam diretamente. Todos os valores foram lidos das coleções de variáveis do arquivo Figma — nenhum foi estimado a partir de captura de tela."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="A biblioteca separa valor bruto de intenção: primitivas nomeiam a cor, semânticos nomeiam o papel."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="🎨" title="Primitivas">
        Coleção <code>Primitives/Colors</code>, modo único <code>Default</code>. São 25 valores
        fixos, nunca aplicados diretamente em componente — servem de origem para os aliases
        semânticos.
      </GptDocCard>
      <GptDocCard icon="🌗" title="Semânticos">
        Coleção <code>Semantic/Colors</code>, com os modos <code>Light</code> e <code>Dark</code>.
        Cada um dos 21 tokens é um alias para uma primitiva, e é a troca desse alias que produz o
        tema escuro.
      </GptDocCard>
      <GptDocCard icon="🫥" title="Overlays">
        Oito estilos de pintura <code>Overlay/*</code> — preto a 4/10/20/40/80% e branco a
        20/40/80%. Usados em scrims e superfícies translúcidas que precisam funcionar sobre
        qualquer fundo.
      </GptDocCard>
      <GptDocCard icon="📉" title="Escada translúcida">
        Os componentes do arquivo aplicam preenchimentos de preto com opacidade sem vínculo com
        variável. A escada foi reproduzida como <code>--gpt-fill-*</code> e{' '}
        <code>--gpt-text-soft-*</code>, espelhada em branco no modo Dark.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Coleções de variáveis lidas via Plugin API na página 🟡 Design system."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.collectionSemanticColors}
      frameName="Semantic/Colors (Light · Dark)"
      specs={[
        { label: 'Primitives/Colors', value: '25 variáveis · 1 modo' },
        { label: 'Semantic/Colors', value: '21 variáveis · 2 modos' },
        { label: 'Estilos de pintura', value: '21 (13 cores + 8 overlays)' },
        { label: 'Marca', value: '#5856D6 · color/purple/600' },
        { label: 'Superfície Dark', value: '#1C1C1C · color/gray/800' },
        { label: 'Atributo de tema', value: 'data-gpt-theme' },
      ]}
      deviations={[
        'text/tertiary aponta para color/gray/800 no Light e color/purple/400 no Dark — a inversão é a declarada no arquivo e foi mantida sem ajuste.',
        'color/gray/400 (#9F9FFB) é um lilás, não um cinza: o nome da primitiva no arquivo não corresponde ao matiz. Preservado como está para manter o vínculo com a variável de origem.',
        'A escada translúcida dos componentes não existe como variável no Figma; foi tokenizada aqui para permitir o modo Dark sem perder os valores literais do Light.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia dos Tokens Semânticos"
      description="Cada cartão mostra o valor resolvido no modo Light, a variável CSS e o nome no Figma. Clique para copiar."
      barColor="#5856D6"
    />
    {GRUPOS_SEMANTICOS.map((grupo) => (
      <div key={grupo.title} style={{ marginBottom: 28 }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: 14, color: '#22272A' }}>{grupo.title}</h4>
        <p style={{ margin: '0 0 12px 0', fontSize: 13, color: '#475157', lineHeight: 1.6 }}>
          {grupo.description}
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 14,
          }}
        >
          {grupo.keys.map((key) => (
            <GptDocTokenSwatch
              key={key}
              name={key}
              cssVar={gptSemanticCssVars[key]}
              value={gptLightColors[key]}
              figmaName={gptSemanticFigmaNames[key]}
            />
          ))}
        </div>
      </div>
    ))}

    <UnooriaDocSectionHeader
      title="4. Matriz de Primitivas"
      description="As 25 variáveis de Primitives/Colors, agrupadas por matiz."
      barColor="#5856D6"
    />
    {PRIMITIVAS.map((linha, indice) => (
      <div
        key={indice}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: 14,
          marginBottom: 14,
        }}
      >
        {linha.map((key) => (
          <GptDocTokenSwatch
            key={key}
            name={key}
            cssVar={gptPrimitiveCssVars[key]}
            value={gptPrimitiveColors[key]}
            figmaName={gptPrimitiveFigmaNames[key]}
          />
        ))}
      </div>
    ))}

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de consumo verificadas contra a estrutura das coleções."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Consumir sempre os tokens semânticos (--gpt-bg-*, --gpt-text-*) nos componentes — eles já resolvem os dois temas.',
        'Usar a escada --gpt-fill-* para superfícies translúcidas e --gpt-text-soft-* para hierarquia de texto por opacidade.',
        'Aplicar os overlays --gpt-overlay-* em scrims que precisam funcionar sobre qualquer fundo.',
        'Trocar o tema pelo atributo data-gpt-theme no contêiner mais externo possível, deixando os componentes herdarem.',
      ]}
      donts={[
        'Aplicar uma primitiva (--gpt-color-purple-600) diretamente em componente — o modo Dark deixa de funcionar.',
        'Usar var(--unooria-*) ou var(--insta-*) dentro do ChatGPT: são marcas com hierarquias cromáticas distintas.',
        'Escrever hexadecimais avulsos em CSS ou em estilo inline de componente de produção.',
        'Assumir que status/* muda entre os temas: apenas warning e info trocam de valor.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Componentes reais resolvendo as mesmas variáveis nos dois modos."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher>
      {() => (
        <>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Tag glyph="✦">Brainstorm</Tag>
          <Badge variant="primary">Badge</Badge>
          <ChatBubble role="user">Hello, how can you help me?</ChatBubble>
        </>
      )}
    </GptDocThemeSwitcher>

    <GptDocStage label="Overlays publicados (sobre xadrez, para mostrar a transparência)">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 14,
          width: '100%',
        }}
      >
        {(Object.keys(gptOverlays) as (keyof typeof gptOverlays)[]).map((key) => (
          <GptDocTokenSwatch
            key={key}
            name={key}
            cssVar={`--gpt-overlay-${key.replace(/([a-z])(\d)/, '$1-$2')}`}
            value={gptOverlays[key]}
            checkerboard
          />
        ))}
      </div>
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="7. Referência Completa da Escada Translúcida"
      description="Onde cada degrau é aplicado e o valor resolvido em cada tema."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="Superfícies e textos translúcidos"
      rows={gptTranslucentScale.map((item) => ({
        name: item.cssVar,
        type: item.light,
        default: item.dark,
        description: item.usage,
      }))}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'ChatGPT/Fundamentos/Cores',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tokens de cor do ChatGPT extraídos das coleções de variáveis do arquivo Figma “ChatGPT UI Kit (AI Chat) (Community)”, com suporte nativo aos temas Light e Dark.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa dos tokens de cor.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CoresDocumentationPage />,
};

/**
 * Grade das 25 primitivas de `Primitives/Colors`.
 */
export const Primitivas: Story = {
  name: '🎨 Primitivas',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
        gap: 14,
      }}
    >
      {(Object.keys(gptPrimitiveColors) as (keyof typeof gptPrimitiveColors)[]).map((key) => (
        <GptDocTokenSwatch
          key={key}
          name={key}
          cssVar={gptPrimitiveCssVars[key]}
          value={gptPrimitiveColors[key]}
          figmaName={gptPrimitiveFigmaNames[key]}
        />
      ))}
    </div>
  ),
};

/**
 * Comparação direta entre os dois modos de `Semantic/Colors`.
 */
export const ComparativoDeTemas: Story = {
  name: '🌗 Comparativo Light × Dark',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
      {(['light', 'dark'] as const).map((activeTheme) => (
        <div
          key={activeTheme}
          data-gpt-theme={activeTheme}
          style={{
            padding: 24,
            borderRadius: 12,
            border: '1px solid #E4E8E9',
            backgroundColor: activeTheme === 'dark' ? '#1C1C1C' : '#FFFFFF',
          }}
        >
          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: 14,
              color: activeTheme === 'dark' ? '#FFFFFF' : '#000000',
            }}
          >
            {activeTheme === 'dark' ? 'Dark' : 'Light'}
          </h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {(Object.keys(gptLightColors) as (keyof GptSemanticColors)[]).map((key) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    width: 28,
                    height: 20,
                    borderRadius: 4,
                    border: '1px solid rgba(128,128,128,0.4)',
                    background: activeTheme === 'dark' ? gptDarkColors[key] : gptLightColors[key],
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    color: activeTheme === 'dark' ? '#E0E0E0' : '#303030',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  }}
                >
                  {gptSemanticCssVars[key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
