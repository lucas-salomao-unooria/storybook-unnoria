import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { uaiRadius, uaiSizing, uaiSpacing } from '../../../src/unooriaai/tokens/spacing';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocCard,
  UaiDocDecisions,
  UaiDocGrid,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocSpecs,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';
import { Avatar, Button, Icon, IconButton } from '../../../src/unooriaai/components';

const BAR = '#716C98';
const DOC_TEXT = '#22272A';
const DOC_MUTED = '#475157';
const DOC_BORDER = '#E4E8E9';
const DOC_SUBTLE = '#F5F5F5';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const CHAVES_SPACING = Object.keys(uaiSpacing).map(Number) as (keyof typeof uaiSpacing)[];
const CHAVES_RADIUS = Object.keys(uaiRadius) as (keyof typeof uaiRadius)[];
const CHAVES_SIZING = Object.keys(uaiSizing) as (keyof typeof uaiSizing)[];

/** Onde cada degrau de espaçamento aparece nos componentes do módulo. */
const USO_SPACING: Partial<Record<keyof typeof uaiSpacing, string>> = {
  1: 'Gap interno do AssistantCard, folga do botão deslizante do Toggle, padding vertical do Badge',
  2: 'Gap entre itens da Sidebar, raio do Badge',
  3: 'Padding vertical do Button SM, gap de glifo do Tag e do Button',
  4: 'Padding horizontal do Badge, gap de NavItem, ChatInput e SearchInput, padding do Button MD',
  5: 'Padding horizontal do Button SM, padding do AssistantCard e do ChatBubble, padding da Sidebar',
  6: 'Padding do Button MD e do FeatureCard, padding lateral do ChatInput, gap do Modal',
  7: 'Diâmetro do botão deslizante do Toggle',
  8: 'Padding do Button LG e do Modal, altura do trilho do Toggle',
  9: 'Altura do IconButton SM',
  12: 'Altura do ChatInput',
};

const nomeDoTamanho = (key: string) => key.replace(/([A-Z])/g, '-$1').toLowerCase();

/** Barra proporcional ao degrau de espaçamento. */
const BarraDeEspaco: React.FC<{ chave: keyof typeof uaiSpacing }> = ({ chave }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <span style={{ width: 130, fontSize: 11, color: DOC_MUTED, fontFamily: MONO, flexShrink: 0 }}>
      --uai-spacing-{chave}
    </span>
    <span style={{ width: 44, fontSize: 12, fontWeight: 700, color: DOC_TEXT, flexShrink: 0 }}>
      {uaiSpacing[chave]}px
    </span>
    <span
      style={{
        height: 14,
        width: Math.max(uaiSpacing[chave], 2),
        background: BAR,
        borderRadius: 3,
        flexShrink: 0,
      }}
    />
  </div>
);

/** Quadrado de 64px que demonstra um degrau de arredondamento. */
const AmostraDeRaio: React.FC<{ chave: keyof typeof uaiRadius; legenda?: boolean }> = ({
  chave,
  legenda = true,
}) => (
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        width: 64,
        height: 64,
        border: `1.5px solid ${BAR}`,
        borderRadius: uaiRadius[chave] === 9999 ? '9999px' : uaiRadius[chave],
        background: '#FFFFFF',
      }}
    />
    <div style={{ fontSize: 11, color: DOC_TEXT, fontWeight: 700, marginTop: 8 }}>{chave}</div>
    {legenda && (
      <div style={{ fontSize: 11, color: DOC_MUTED }}>
        {uaiRadius[chave] === 9999 ? 'total' : `${uaiRadius[chave]}px`}
      </div>
    )}
  </div>
);

/**
 * Página de documentação rica dos tokens de medida.
 */
const EspacamentoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Fundamentos • Espaçamento & Layout"
      title="Espaçamento & Layout"
      description={`As três réguas de medida do módulo: espaçamento (${CHAVES_SPACING.length} degraus de 0 a 160px), arredondamento (${CHAVES_RADIUS.length} degraus de 0 a total) e dimensões estruturais (${CHAVES_SIZING.length} medidas de ícone, avatar, botão, barra lateral e campo). São medidas próprias do módulo; só os degraus de ícone têm origem na Plataforma Unooria.`}
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Três réguas independentes, cada uma com o próprio prefixo de variável."
      barColor={BAR}
    />
    <UaiDocGrid>
      <UaiDocCard icon="📏" title="Espaçamento">
        Grade de 4px com dois degraus finos, de 2px (<code>spacing-1</code>) e 6px (
        <code>spacing-3</code>). Cobre padding, gap e margem de todos os componentes.
      </UaiDocCard>
      <UaiDocCard icon="🔲" title="Arredondamento">
        Dez degraus, de <code>radius-none</code> a <code>radius-full</code>. Os mais usados são{' '}
        <code>md</code> (8) em campos e navegação, <code>lg</code> (12) em cartões e{' '}
        <code>3xl</code> (24) na cápsula do compositor.
      </UaiDocCard>
      <UaiDocCard icon="📐" title="Dimensões">
        Réguas fechadas de ícone (12–32), avatar (24–48) e botão (32–48), mais a largura da barra
        lateral (260) e a altura de campo (44).
      </UaiDocCard>
      <UaiDocCard icon="🧩" title="Consumo">
        Em CSS via <code>--uai-spacing-*</code>, <code>--uai-radius-*</code> e{' '}
        <code>--uai-size-*</code>; em TypeScript via <code>uaiSpacing</code>,{' '}
        <code>uaiRadius</code> e <code>uaiSizing</code>.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações Técnicas"
      description="Estrutura das réguas de medida e decisões registradas."
      barColor={BAR}
    />
    <UaiDocSpecs
      component="../tokens"
      layout="Medidas do módulo"
      specs={[
        { label: 'Espaçamento', value: `${CHAVES_SPACING.length} degraus · 0–160px` },
        { label: 'Arredondamento', value: `${CHAVES_RADIUS.length} degraus · 0–9999px` },
        { label: 'Dimensões', value: `${CHAVES_SIZING.length} medidas` },
        { label: 'Grade base', value: '4px' },
        { label: 'Barra lateral', value: '260px · --uai-size-sidebar' },
        { label: 'Altura de campo', value: '44px · --uai-size-input-height' },
        { label: 'Ícones', value: '12 · 16 · 20 · 24 · 32px' },
        { label: 'Transição padrão', value: '150ms ease' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Medidas próprias, não a escala da Unooria',
          detail:
            'A escala de espaçamento da plataforma é de 4/8px e deslocaria as linhas de altura fixa do módulo; por isso a régua é própria e não cita token de origem. A exceção são os degraus de ícone (--uai-size-icon-*), que são degraus de --unooria-icon-size-*.',
        },
        {
          subject: 'Degraus finos preservados',
          detail:
            'Os degraus de 2px e 6px ficam na escala porque alturas de linha, gaps de glifo e folgas de controle dependem deles.',
        },
        {
          subject: 'Medidas literais de componente',
          detail:
            'Algumas medidas de componente não têm degrau equivalente (por exemplo, padding vertical de 10px e alturas de 28, 36 e 44px em botões de ícone e campos); ficam anotadas como literais no CSS do componente.',
        },
        {
          subject: 'Régua de botão',
          detail:
            'A régua --uai-size-button-* (32/40/48) fica disponível para composição de telas; Button e IconButton derivam a altura de padding mais altura de linha.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia da Escala de Espaçamento"
      description="Cada barra tem a largura exata do degrau."
      barColor={BAR}
    />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        marginBottom: 32,
        border: `1px solid ${DOC_BORDER}`,
        borderRadius: 12,
        padding: 20,
        background: DOC_SUBTLE,
      }}
    >
      {CHAVES_SPACING.map((key) => (
        <BarraDeEspaco key={key} chave={key} />
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="4. Matriz de Arredondamento e Dimensões"
      description="Os dez raios aplicados a um quadrado de 64px e as réguas estruturais em componentes reais."
      barColor={BAR}
    />
    <UaiDocStage label="Escala de arredondamento — --uai-radius-*">
      {CHAVES_RADIUS.map((key) => (
        <AmostraDeRaio key={key} chave={key} />
      ))}
    </UaiDocStage>

    <UaiDocStage label="Régua de avatar — --uai-size-avatar-sm a -xl">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Avatar size={size} initials="U" />
          <div style={{ fontSize: 11, color: DOC_MUTED, marginTop: 8 }}>
            {size} · {uaiSizing[`avatar${size[0].toUpperCase()}${size.slice(1)}` as keyof typeof uaiSizing]}px
          </div>
        </div>
      ))}
    </UaiDocStage>

    <UaiDocStage label="Alvos de toque — Button e IconButton">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button size={size}>Botão</Button>
          <IconButton size={size} variant="filled" aria-label={`Fechar ${size}`}>
            <Icon name="close" size={16} />
          </IconButton>
        </div>
      ))}
    </UaiDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de aplicação das três réguas."
      barColor={BAR}
    />
    <UaiDocPractices
      dos={[
        'Usar sempre um degrau da escala em padding, gap e margem — inclusive os degraus finos de 2px e 6px.',
        'Escolher o raio pela natureza da superfície: 8 para controles, 12 para cartões, 16 para diálogos, 24 para o compositor.',
        'Consumir as réguas de ícone e avatar em vez de repetir pixels no CSS do componente.',
        'Anotar no CSS qualquer medida literal que não tenha token equivalente.',
      ]}
      donts={[
        'Inventar degraus intermediários (10, 14, 18) sem registrar a decisão.',
        'Aplicar radius-full a retângulos largos: a cápsula só é correta em elementos de altura fixa.',
        'Usar var(--unooria-spacing-*) dentro do UnooriaAI: a escala da plataforma é de 4/8px e desloca as linhas.',
        'Fixar a largura da barra lateral em pixel avulso em vez de --uai-size-sidebar.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="As medidas não mudam entre os temas claro e escuro: a troca de tema altera apenas cor."
      barColor={BAR}
    />
    <UaiDocThemeSwitcher>
      {() => (
        <>
          <Avatar size="lg" initials="U" />
          <Button variant="primary">Primário</Button>
          <IconButton variant="filled" aria-label="Fechar">
            <Icon name="close" size={16} />
          </IconButton>
        </>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa das Medidas"
      description="Valor, variável CSS e onde cada token é aplicado."
      barColor={BAR}
    />
    <UaiDocPropsTable
      title="Espaçamento"
      rows={CHAVES_SPACING.map((key) => ({
        name: `spacing-${key}`,
        type: `--uai-spacing-${key}`,
        default: `${uaiSpacing[key]}px`,
        description: USO_SPACING[key] ?? 'Degrau disponível para composição de telas.',
      }))}
    />
    <UaiDocPropsTable
      title="Arredondamento"
      rows={CHAVES_RADIUS.map((key) => ({
        name: `radius-${key}`,
        type: `--uai-radius-${key}`,
        default: uaiRadius[key] === 9999 ? '9999px' : `${uaiRadius[key]}px`,
        description: `Token TypeScript: uaiRadius['${key}'].`,
      }))}
    />
    <UaiDocPropsTable
      title="Dimensões"
      rows={CHAVES_SIZING.map((key) => ({
        name: key,
        type: `--uai-size-${nomeDoTamanho(key)}`,
        default: `${uaiSizing[key]}px`,
        description: key.startsWith('icon')
          ? `Degrau de --unooria-icon-size-*. Token TypeScript: uaiSizing.${key}.`
          : `Token TypeScript: uaiSizing.${key}.`,
      }))}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'UnooriaAI/Fundamentos/Espaçamento & Layout',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tokens de espaçamento, arredondamento e dimensão do UnooriaAI: medidas próprias do módulo, em grade de 4px.',
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
        <BarraDeEspaco key={key} chave={key} />
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
        <AmostraDeRaio key={key} chave={key} legenda={false} />
      ))}
    </div>
  ),
};
