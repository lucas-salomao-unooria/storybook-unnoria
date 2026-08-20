import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { gptRadius, gptSizing, gptSpacing } from '../../../src/chatgpt/tokens/spacing';
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
} from '../../../.storybook/components';
import { Avatar, Button, IconButton } from '../../../src/chatgpt/components';
import { gptFigmaNodes } from '../fixtures';

const CHAVES_SPACING = Object.keys(gptSpacing).map(Number) as (keyof typeof gptSpacing)[];
const CHAVES_RADIUS = Object.keys(gptRadius) as (keyof typeof gptRadius)[];
const CHAVES_SIZING = Object.keys(gptSizing) as (keyof typeof gptSizing)[];

/** Onde cada degrau de espaçamento aparece nos componentes da biblioteca. */
const USO_SPACING: Partial<Record<keyof typeof gptSpacing, string>> = {
  1: 'Gap interno do GPTCard, folga do knob do Toggle, padding vertical do Badge',
  2: 'Gap entre itens da Sidebar, raio do Badge',
  3: 'Padding vertical do Button SM, gap de glifo do Tag e do Button',
  4: 'Padding horizontal do Badge, gap de NavItem/ChatInput/SearchInput, padding do Button MD',
  5: 'Padding horizontal do Button SM, padding do GPTCard e do ChatBubble, padding da Sidebar',
  6: 'Padding do Button MD e do FeatureCard, padding lateral do ChatInput, gap do Modal',
  7: 'Diâmetro do knob do Toggle',
  8: 'Padding do Button LG e do Modal, altura do trilho do Toggle',
  9: 'Altura do IconButton SM',
  12: 'Altura do ChatInput',
};

/**
 * Página de documentação rica dos tokens de medida.
 */
const EspacamentoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Fundamentos • Espaçamento & Layout"
      title="Espaçamento & Layout"
      description="As três coleções de medida do arquivo Figma: Primitives/Spacing (19 degraus de 0 a 160px), Primitives/Radius (10 degraus de 0 a total) e Primitives/Sizing (14 dimensões estruturais de ícone, avatar, botão, barra lateral e campo)."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Três réguas independentes, cada uma com sua coleção de variáveis."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="📏" title="Espaçamento">
        Grade de 4px com dois degraus finos preservados do arquivo — 2px (<code>spacing/1</code>) e
        6px (<code>spacing/3</code>). Cobre padding, gap e margem de todos os componentes.
      </GptDocCard>
      <GptDocCard icon="🔲" title="Arredondamento">
        Dez degraus, de <code>radius/none</code> a <code>radius/full</code>. Os mais usados são{' '}
        <code>md</code> (8) em campos e navegação, <code>lg</code> (12) em cartões e{' '}
        <code>3xl</code> (24) na cápsula do compositor.
      </GptDocCard>
      <GptDocCard icon="📐" title="Dimensões">
        Réguas fechadas de ícone (12–32), avatar (24–48) e botão (32–48), mais a largura da barra
        lateral (260) e a altura de campo (44).
      </GptDocCard>
      <GptDocCard icon="🧩" title="Consumo">
        Em CSS via <code>--gpt-spacing-*</code>, <code>--gpt-radius-*</code> e{' '}
        <code>--gpt-size-*</code>; em TypeScript via <code>gptSpacing</code>,{' '}
        <code>gptRadius</code> e <code>gptSizing</code>.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Coleções de variáveis lidas via Plugin API."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.collectionSpacing}
      frameName="Primitives/Spacing · Radius · Sizing"
      specs={[
        { label: 'Primitives/Spacing', value: '19 variáveis · 0–160px' },
        { label: 'Primitives/Radius', value: '10 variáveis · 0–9999px' },
        { label: 'Primitives/Sizing', value: '14 variáveis' },
        { label: 'Grade base', value: '4px' },
        { label: 'Barra lateral', value: '260px · size/sidebar' },
        { label: 'Altura de campo', value: '44px · size/input-height' },
      ]}
      deviations={[
        'Vários componentes usam medidas que não existem nas coleções: padding vertical de 10px (Input e Sidebar.NewChatButton), alturas de 28/36/44 no IconButton, 36px no SearchInput, raio de 6px no IconButton SM e corpo de 13px no FeatureCard. Todas estão anotadas como literais no CSS do componente correspondente.',
        'A régua size/button-* (32/40/48) não é usada por nenhum componente publicado: Button e IconButton derivam a altura de padding mais altura de linha. Foi mantida nos tokens por fidelidade à coleção.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia da Escala de Espaçamento"
      description="Cada barra tem a largura exata do degrau."
      barColor="#5856D6"
    />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        marginBottom: 32,
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        padding: 20,
        background: '#F5F5F5',
      }}
    >
      {CHAVES_SPACING.map((key) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              width: 130,
              fontSize: 11,
              color: '#475157',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              flexShrink: 0,
            }}
          >
            --gpt-spacing-{key}
          </span>
          <span
            style={{
              width: 44,
              fontSize: 12,
              fontWeight: 700,
              color: '#22272A',
              flexShrink: 0,
            }}
          >
            {gptSpacing[key]}px
          </span>
          <span
            style={{
              height: 14,
              width: Math.max(gptSpacing[key], 2),
              background: '#5856D6',
              borderRadius: 3,
              flexShrink: 0,
            }}
          />
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="4. Matriz de Arredondamento e Dimensões"
      description="Os dez raios aplicados a um quadrado de 64px e as réguas estruturais em componentes reais."
      barColor="#5856D6"
    />
    <GptDocStage label="Primitives/Radius">
      {CHAVES_RADIUS.map((key) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 64,
              height: 64,
              border: '1.5px solid #5856D6',
              borderRadius: gptRadius[key] === 9999 ? '9999px' : gptRadius[key],
              background: '#FFFFFF',
            }}
          />
          <div style={{ fontSize: 11, color: '#22272A', fontWeight: 700, marginTop: 8 }}>{key}</div>
          <div style={{ fontSize: 11, color: '#475157' }}>
            {gptRadius[key] === 9999 ? 'total' : `${gptRadius[key]}px`}
          </div>
        </div>
      ))}
    </GptDocStage>

    <GptDocStage label="Régua de avatar — size/avatar-sm a size/avatar-xl">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Avatar size={size} initials="U" />
          <div style={{ fontSize: 11, color: '#475157', marginTop: 8 }}>
            {size} · {gptSizing[`avatar${size.toUpperCase()}` as keyof typeof gptSizing]}px
          </div>
        </div>
      ))}
    </GptDocStage>

    <GptDocStage label="Alvos de toque — Button e IconButton">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button size={size}>Button</Button>
          <IconButton size={size} variant="filled" aria-label={`Fechar ${size}`}>
            ✕
          </IconButton>
        </div>
      ))}
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de aplicação das três réguas."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Usar sempre um degrau da escala em padding, gap e margem — inclusive os degraus finos de 2px e 6px.',
        'Escolher o raio pela natureza da superfície: 8 para controles, 12 para cartões, 16 para diálogos, 24 para o compositor.',
        'Consumir as réguas de ícone e avatar em vez de repetir pixels no CSS do componente.',
        'Anotar no CSS qualquer medida literal do arquivo que não tenha token equivalente.',
      ]}
      donts={[
        'Inventar degraus intermediários (10, 14, 18) sem registrar o desvio.',
        'Aplicar radius/full a retângulos largos — a cápsula só é correta em elementos de altura fixa.',
        'Usar var(--unooria-spacing-*) dentro do ChatGPT.',
        'Fixar largura de barra lateral em pixel avulso em vez de size/sidebar.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="As três coleções têm modo único no Figma: as medidas não mudam entre Light e Dark. A troca de tema altera apenas cor."
      barColor="#5856D6"
    />
    <GptDocStage label="Mesmo espaçamento nos dois temas">
      {(['light', 'dark'] as const).map((theme) => (
        <div
          key={theme}
          data-gpt-theme={theme}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: 20,
            borderRadius: 12,
            background: theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
            border: '1px solid #E4E8E9',
          }}
        >
          <Avatar size="lg" initials="U" />
          <Button variant="primary">Primary</Button>
          <IconButton variant="filled" aria-label="Fechar">
            ✕
          </IconButton>
        </div>
      ))}
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="7. Referência Completa das Medidas"
      description="Valor, variável CSS e onde cada token é aplicado."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="Primitives/Spacing"
      rows={CHAVES_SPACING.map((key) => ({
        name: `spacing/${key}`,
        type: `--gpt-spacing-${key}`,
        default: `${gptSpacing[key]}px`,
        description: USO_SPACING[key] ?? 'Degrau disponível para composição de telas.',
      }))}
    />
    <GptDocPropsTable
      title="Primitives/Radius"
      rows={CHAVES_RADIUS.map((key) => ({
        name: `radius/${key}`,
        type: `--gpt-radius-${key}`,
        default: gptRadius[key] === 9999 ? '9999px' : `${gptRadius[key]}px`,
        description: `Token TypeScript: gptRadius['${key}'].`,
      }))}
    />
    <GptDocPropsTable
      title="Primitives/Sizing"
      rows={CHAVES_SIZING.map((key) => ({
        name: key,
        type: `--gpt-size-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`,
        default: `${gptSizing[key]}px`,
        description: `Token TypeScript: gptSizing.${key}.`,
      }))}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'ChatGPT/Fundamentos/Espaçamento & Layout',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tokens de espaçamento, arredondamento e dimensão do ChatGPT, extraídos das coleções Primitives/Spacing, Primitives/Radius e Primitives/Sizing do Figma.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa das medidas.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <EspacamentoDocumentationPage />,
};

/**
 * Escala de espaçamento isolada.
 */
export const EscalaDeEspacamento: Story = {
  name: '📏 Escala de Espaçamento',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {CHAVES_SPACING.map((key) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 130, fontSize: 11, color: '#475157' }}>--gpt-spacing-{key}</span>
          <span style={{ width: 44, fontSize: 12, fontWeight: 700 }}>{gptSpacing[key]}px</span>
          <span
            style={{
              height: 14,
              width: Math.max(gptSpacing[key], 2),
              background: '#5856D6',
              borderRadius: 3,
            }}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * Os dez degraus de arredondamento.
 */
export const Arredondamento: Story = {
  name: '🔲 Arredondamento',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {CHAVES_RADIUS.map((key) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 64,
              height: 64,
              border: '1.5px solid #5856D6',
              borderRadius: gptRadius[key] === 9999 ? '9999px' : gptRadius[key],
            }}
          />
          <div style={{ fontSize: 11, fontWeight: 700, marginTop: 8 }}>{key}</div>
        </div>
      ))}
    </div>
  ),
};
