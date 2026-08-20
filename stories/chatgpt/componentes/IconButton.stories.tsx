import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../../../src/chatgpt/components/IconButton';
import { gptGlyphs } from '../../../src/chatgpt/tokens';
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
} from '../../../.storybook/components';
import { gptFigmaNodes } from '../fixtures';

const VARIANTES = ['default', 'filled', 'primary'] as const;
const TAMANHOS = ['sm', 'md', 'lg'] as const;

/**
 * Página de documentação rica do componente IconButton.
 */
const IconButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Componentes • Ações"
      title="IconButton"
      description="Réplica do conjunto IconButton da página 🟡 Design system: 3 variantes (Default, Filled, Primary) × 3 tamanhos (SM 28, MD 36, LG 44), com o glifo dimensionado pelas réguas size/icon-xs, -sm e -md. É o botão sem rótulo visível — por isso aria-label é obrigatório na API."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Três pesos visuais para o mesmo alvo de toque quadrado."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="👻" title="Default">
        Sem superfície em repouso — o glifo flutua sobre o conteúdo. É o fechar do cabeçalho e as
        ações discretas de barra.
      </GptDocCard>
      <GptDocCard icon="🩶" title="Filled">
        Superfície translúcida de 4% (<code>--gpt-fill-4</code>), suficiente para delimitar o alvo
        sem competir com o conteúdo.
      </GptDocCard>
      <GptDocCard icon="🟪" title="Primary">
        Superfície <code>interactive/primary</code> com glifo invertido. Reservado à ação de avanço
        de um fluxo.
      </GptDocCard>
      <GptDocCard icon="♿" title="Rótulo obrigatório">
        A prop <code>aria-label</code> é exigida pelo tipo: sem texto visível, é a única fonte de
        significado para leitores de tela.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do conjunto de variantes via Plugin API."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.iconButton}
      frameName="IconButton (Variant × Size · 9 variantes)"
      specs={[
        { label: 'SM', value: '28px · raio 6 · glifo 12' },
        { label: 'MD', value: '36px · raio 8 · glifo 16' },
        { label: 'LG', value: '44px · raio 12 · glifo 20' },
        { label: 'Default', value: 'preto a 0% de opacidade' },
        { label: 'Filled', value: 'preto a 4% de opacidade' },
        { label: 'Primary', value: '#5856D6 · interactive/primary' },
      ]}
      deviations={[
        'Os frames do arquivo abraçam a largura do glifo (layoutSizingHorizontal = HUG), produzindo larguras de 11–20px contra alturas fixas de 28/36/44. O componente renderiza o alvo quadrado — intenção evidente dado o raio igual nos quatro cantos e o glifo dimensionado por size/icon-*.',
        'O raio de 6px do tamanho SM é literal: Primitives/Radius salta de 4 para 8.',
        'A régua size/button-* (32/40/48) não corresponde a estas alturas e não é usada por este conjunto.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Um alvo quadrado e um único slot de conteúdo."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="⬛" title="Alvo de toque">
        Quadrado de 28, 36 ou 44px com raio próprio de cada tamanho. Nunca encolhe
        (<code>flex-shrink: 0</code>).
      </GptDocCard>
      <GptDocCard icon="🔤" title="Glifo">
        <code>children</code>, envolvido em um span <code>aria-hidden</code> e centralizado nos dois
        eixos.
      </GptDocCard>
      <GptDocCard icon="🎯" title="Foco">
        Anel de 2px em <code>border/brand</code> com deslocamento de 2px, visível apenas na
        navegação por teclado.
      </GptDocCard>
      <GptDocCard icon="🚫" title="Desabilitado">
        40% de opacidade e cursor <code>not-allowed</code>, sem alterar as medidas.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes, Tamanhos e Estados"
      description="As 9 combinações publicadas, renderizadas pelo componente real."
      barColor="#5856D6"
    />
    {VARIANTES.map((variant) => (
      <GptDocStage key={variant} label={`Variant=${variant}`} align="flex-start">
        {TAMANHOS.map((size) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <IconButton variant={variant} size={size} aria-label={`${variant} ${size}`}>
              {variant === 'primary' ? gptGlyphs.arrowRight : gptGlyphs.close}
            </IconButton>
            <div style={{ fontSize: 11, color: '#475157', marginTop: 8 }}>{size}</div>
          </div>
        ))}
      </GptDocStage>
    ))}
    <GptDocStage label="Estados e glifos do catálogo">
      <IconButton variant="filled" aria-label="Fechar">
        {gptGlyphs.close}
      </IconButton>
      <IconButton variant="filled" aria-label="Enviar">
        {gptGlyphs.send}
      </IconButton>
      <IconButton variant="filled" aria-label="Buscar">
        {gptGlyphs.search}
      </IconButton>
      <IconButton variant="filled" aria-label="Nova conversa">
        {gptGlyphs.plus}
      </IconButton>
      <IconButton variant="primary" disabled aria-label="Desabilitado">
        {gptGlyphs.arrowRight}
      </IconButton>
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de uso do botão sem rótulo."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Sempre preencher aria-label com o verbo da ação, não com o nome do símbolo.',
        'Usar Filled quando o botão fica sobre imagem ou lista densa, onde Default perde o alvo.',
        'Manter o tamanho LG em superfícies de toque e reservar SM a barras compactas.',
        'Consumir os caracteres por gptGlyphs em vez de colar o símbolo no JSX.',
      ]}
      donts={[
        'Renderizar texto dentro do IconButton — para rótulo visível use Button.',
        'Reduzir o alvo abaixo de 28px, o menor tamanho publicado.',
        'Usar Primary em mais de uma ação por barra.',
        'Confiar no glifo como única indicação de estado (ligado/desligado); para isso use Toggle.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Default e Filled seguem a escada translúcida, que se espelha em branco no Dark."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher>
      {() => (
        <>
          {VARIANTES.map((variant) => (
            <IconButton key={variant} variant={variant} aria-label={variant}>
              {variant === 'primary' ? gptGlyphs.arrowRight : gptGlyphs.close}
            </IconButton>
          ))}
        </>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente IconButton."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="IconButton"
      rows={[
        {
          name: 'variant',
          type: "'default' | 'filled' | 'primary'",
          default: "'default'",
          description: 'Variante visual, espelhando a propriedade Variant do conjunto no Figma.',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: 'Alvo de toque de 28, 36 ou 44px, com o glifo proporcional.',
        },
        {
          name: 'aria-label',
          type: 'string',
          description: 'Rótulo acessível obrigatório — o botão não tem texto visível.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Glifo centralizado, marcado como aria-hidden.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Desabilita a interação e aplica 40% de opacidade.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof IconButton> = {
  title: 'ChatGPT/Componentes/IconButton',
  component: IconButton,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: VARIANTES, description: 'Variante visual.' },
    size: { control: 'radio', options: TAMANHOS, description: 'Tamanho do alvo de toque.' },
    disabled: { control: 'boolean', description: 'Desabilita a interação.' },
    'aria-label': { control: 'text', description: 'Rótulo acessível obrigatório.' },
    children: { control: 'text', description: 'Glifo renderizado no centro.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    'aria-label': 'Fechar',
    children: gptGlyphs.close,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <IconButtonDocumentationPage />,
};

/**
 * Playground com todas as propriedades do IconButton expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do IconButton',
  render: (args) => (
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <IconButton {...args} />
    </div>
  ),
};

/**
 * Réplica visual do conjunto de variantes publicado no Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        padding: 16,
        border: '1px solid #E4E8E9',
        borderRadius: 5,
      }}
    >
      {VARIANTES.flatMap((variant) =>
        TAMANHOS.map((size) => (
          <IconButton
            key={`${variant}-${size}`}
            variant={variant}
            size={size}
            aria-label={`${variant} ${size}`}
          >
            {variant === 'primary' ? gptGlyphs.arrowRight : gptGlyphs.close}
          </IconButton>
        ))
      )}
    </div>
  ),
};

/**
 * Matriz completa de variantes por tamanho.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      {VARIANTES.map((variant) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 90, fontSize: 12, color: '#475157' }}>{variant}</span>
          {TAMANHOS.map((size) => (
            <IconButton key={size} variant={variant} size={size} aria-label={`${variant} ${size}`}>
              {variant === 'primary' ? gptGlyphs.arrowRight : gptGlyphs.close}
            </IconButton>
          ))}
        </div>
      ))}
    </div>
  ),
};

/**
 * Todos os glifos do catálogo aplicados ao mesmo botão.
 */
export const Glifos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(Object.keys(gptGlyphs) as (keyof typeof gptGlyphs)[]).map((name) => (
        <IconButton key={name} variant="filled" aria-label={name}>
          {gptGlyphs[name]}
        </IconButton>
      ))}
    </div>
  ),
};
