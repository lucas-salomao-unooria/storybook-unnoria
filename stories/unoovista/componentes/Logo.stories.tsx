import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Logo,
  unvLogoViewBox,
  unvLogoWidth,
  unvLogoHeight,
  unvLogoMarkViewBox,
} from '../../../src/unoovista/components/Logo';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import { unvPhotos } from '../fixtures';

const BAR = '#716C98';
const CAPTION: React.CSSProperties = { fontSize: 12, color: '#475157', marginTop: 10 };

const photos = Object.values(unvPhotos) as string[];

/**
 * Marca sobre fotografia, em tom inverse, com o véu de mídia do módulo.
 */
const LogoOnMedia = () => (
  <div
    style={{
      position: 'relative',
      width: 320,
      height: 160,
      borderRadius: 16,
      overflow: 'hidden',
    }}
  >
    <img
      src={photos[5 % photos.length]}
      alt="Cidade ao entardecer"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--unv-color-overlay-scrim)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Logo height={32} tone="inverse" />
    </div>
  </div>
);

/**
 * Página de documentação rica do componente Logo.
 */
const LogoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Marca"
      title="Logo"
      description="Marca do Unoovista: o símbolo da Plataforma Unooria — o infinito orgânico, o mesmo vetor da marca-mãe — e o logotipo tipográfico “Unoovista”, contornado de Open Sans Bold. Os dois são vetores, sem texto: nenhuma fonte ausente deforma a marca. O símbolo usa o roxo de ação e acompanha o tema."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Onde a marca aparece e como ela se comporta em cada superfície."
    />
    <UnvDocGrid>
      <UnvDocCard icon="♾️" title="O símbolo da Unooria">
        O infinito orgânico da marca-mãe: dois lóbulos fundidos, com o miolo vazado. É o caminho
        literal <code>SYMBOL_PATH_FILL</code> da Plataforma Unooria (viewBox 100×54), sem nenhuma
        coordenada redesenhada — o Unoovista é um produto da Unooria e usa o mesmo elemento.
      </UnvDocCard>
      <UnvDocCard icon="🔤" title="Contornos, não texto">
        O logotipo é Open Sans Bold convertido em caminhos. Uma fonte que não carrega não muda a marca,
        e o corte é idêntico em qualquer plataforma.
      </UnvDocCard>
      <UnvDocCard icon="🎨" title="Roxo de ação e o texto do tema">
        O símbolo em <code>--unv-color-action-primary</code> e o logotipo em{' '}
        <code>--unv-color-text-primary</code>. No tom <code>inverse</code>, tudo em branco sobre mídia.
      </UnvDocCard>
      <UnvDocCard icon="📐" title="Proporção travada">
        A largura sai da altura pelo <code>viewBox</code>: 158,84 × 24 no lockup e 100 × 54 no símbolo. A
        API só expõe <code>height</code>.
      </UnvDocCard>
      <UnvDocCard icon="♿" title="Acessível por padrão">
        Renderiza <code>role=&quot;img&quot;</code> com o rótulo &quot;Unoovista&quot;. Onde o nome já está
        escrito ao lado, <code>decorative</code> tira a marca da árvore de acessibilidade.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="Logo"
      layout="Vetor · lockup 158,84 × 24"
      specs={[
        { label: 'viewBox do lockup', value: unvLogoViewBox },
        { label: 'Proporção do lockup', value: `${unvLogoWidth} ÷ ${unvLogoHeight}` },
        { label: 'viewBox do símbolo', value: unvLogoMarkViewBox },
        { label: 'Símbolo', value: 'SYMBOL_PATH_FILL da Unooria · evenodd · escala 18/54 no lockup' },
        { label: 'Logotipo', value: 'Open Sans Bold · corpo 25px · linha de base y = 21' },
        { label: 'Respiro símbolo → logotipo', value: '3px' },
        { label: 'Altura padrão', value: '28px' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Marca original, sem herança',
          detail:
            'o logotipo anterior era uma assinatura manuscrita de terceiros e foi removido do pacote. O símbolo é o da Unooria (vetor literal) e o logotipo tipográfico é contornado de Open Sans Bold.',
        },
        {
          subject: 'Logotipo contornado da fonte da marca',
          detail:
            'Open Sans Bold, o .woff2 embutido em src/fonts/open-sans/. Técnica: eixo wght fixado em 700; texto posicionado com HarfBuzz (kern ligado, sem tracking); cada contorno transformado uma única vez por (x, y) → (x·s + tx, −y·s + 21), com s = 25/2048. Nenhuma coordenada foi redesenhada à mão. É proibido reescrever como <text>.',
        },
        {
          subject: 'Símbolo literal da marca-mãe',
          detail:
            'o símbolo é o SYMBOL_PATH_FILL de src/unooria/components/Logo/LogoVectors.tsx, copiado por script: viewBox 0 0 100 54, preenchimento evenodd, nenhuma coordenada tocada. No lockup ele é escalado por 18/54 e apoiado na linha de base do texto; o logotipo é deslocado por translate, não reescrito. A cor vem de uma classe CSS que cita token: o vetor não tem preenchimento literal.',
        },
        {
          subject: 'Uma tinta só no símbolo',
          detail:
            'o símbolo tem uma única cor (action-primary, 4,88:1 no claro e 7,70:1 no escuro sobre a tela). No tom inverse sobre mídia fica em --unv-color-text-on-media, como o logotipo.',
        },
        {
          subject: 'Prop variant e altura padrão',
          detail:
            'API aditiva: variant="lockup" (padrão) ou "mark". A altura padrão continua sendo 28px. A prop theme deixou de ter valor padrão: sem ela, a marca herda o tema do contêiner.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="O símbolo, o respiro e o logotipo compartilham uma linha de base."
    />
    <UnvDocAnatomy
      zones={[
        {
          name: 'Símbolo',
          role: 'Infinito orgânico da Unooria, no roxo de ação, escalado por 18/54 no lockup.',
          token: '--unv-color-action-primary',
        },
        {
          name: 'Respiro',
          role: 'Distância de 3px entre a tinta do símbolo e a do “U”. A base do símbolo coincide com a linha de base do texto.',
        },
        {
          name: 'Logotipo tipográfico',
          role: '“Unoovista” em contornos de Open Sans Bold, altura de maiúscula de 17,85px.',
          token: '--unv-color-text-primary',
        },
      ]}
    />
    <UnvDocStage label="Símbolo isolado (variant=&quot;mark&quot;) e lockup" gap={40}>
      <div style={{ textAlign: 'center' }}>
        <Logo variant="mark" height={54} />
        <div style={CAPTION}>mark · 54px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo height={48} />
        <div style={CAPTION}>lockup · 48px</div>
      </div>
    </UnvDocStage>
    <UnvDocStage label="Escala proporcional do lockup">
      {[20, 28, 36, 44, 56].map((height) => (
        <div key={height} style={{ textAlign: 'center' }}>
          <Logo height={height} />
          <div style={CAPTION}>
            {height}px · {Math.round((height * unvLogoWidth) / unvLogoHeight)}px
          </div>
        </div>
      ))}
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Composições, tons e superfícies de destino."
    />
    <UnvDocStage label="Composições" gap={40}>
      <Logo variant="lockup" height={32} />
      <Logo variant="mark" height={32} />
    </UnvDocStage>
    <UnvDocStage label="Tons: primary · inverse · inherit" gap={24}>
      <div style={{ textAlign: 'center' }}>
        <Logo height={32} tone="primary" />
        <div style={CAPTION}>primary</div>
      </div>
      <div
        data-unv-theme="dark"
        style={{
          textAlign: 'center',
          background: 'var(--unv-color-background-primary)',
          padding: '16px 24px',
          borderRadius: 16,
        }}
      >
        <Logo height={32} tone="inverse" />
        <div style={{ ...CAPTION, color: '#CBD4D6' }}>inverse</div>
      </div>
      <div style={{ textAlign: 'center', color: '#57547D' }}>
        <Logo height={32} tone="inherit" />
        <div style={CAPTION}>inherit</div>
      </div>
    </UnvDocStage>
    <UnvDocStage label="Sobre mídia (tone=&quot;inverse&quot;, com o véu overlay-scrim)">
      <LogoOnMedia />
    </UnvDocStage>
    <UnvDocStage label="Sobre a tela (background-secondary)" surface="secondary">
      <Logo height={32} />
      <Logo height={32} variant="mark" />
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Controlar o tamanho apenas pela prop height, deixando a largura ser derivada.',
        'Usar tone="inverse" sempre que a marca ficar sobre mídia com véu.',
        'Usar variant="mark" em espaços estreitos, como o ícone do aplicativo.',
        'Marcar como decorative quando o nome do produto já estiver escrito ao lado.',
        'Manter respiro lateral de pelo menos metade da altura da marca.',
      ]}
      donts={[
        'Definir width e height simultaneamente, distorcendo a marca.',
        'Aplicar gradiente, sombra ou contorno sobre a marca.',
        'Rotacionar, inclinar ou espelhar o vetor.',
        'Recriar o logotipo com <text> ou com outra fonte.',
        'Trocar a cor do símbolo por hexadecimal avulso.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O símbolo e o logotipo acompanham os tokens: no escuro, o roxo clareia e o texto passa a claro."
    />
    <UnvDocThemeSwitcher>
      {() => (
        <>
          <Logo height={36} />
          <Logo height={36} variant="mark" />
        </>
      )}
    </UnvDocThemeSwitcher>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
      <UnvDocStage label="Tema claro" theme="light" padding={32}>
        <Logo height={36} />
      </UnvDocStage>
      <UnvDocStage label="Tema escuro" theme="dark" padding={32}>
        <Logo height={36} />
      </UnvDocStage>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UnvDocPropsTable
      title="Logo"
      rows={[
        {
          name: 'height',
          type: 'number',
          default: '28',
          description: 'Altura em pixels. A largura é derivada do viewBox (lockup 158,84 × 24; símbolo 100 × 54).',
        },
        {
          name: 'variant',
          type: "'lockup' | 'mark'",
          default: "'lockup'",
          description: 'Lockup completo ou só o símbolo.',
        },
        {
          name: 'tone',
          type: "'primary' | 'inverse' | 'inherit'",
          default: "'primary'",
          description: 'Tom cromático: dois roxos + texto do tema, tudo em branco sobre mídia, ou uma tinta só herdada.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Força o tema. Sem valor, herda o de data-unv-theme do contêiner.',
        },
        {
          name: 'title',
          type: 'string',
          default: "'Unoovista'",
          description: 'Rótulo acessível da marca.',
        },
        {
          name: 'decorative',
          type: 'boolean',
          default: 'false',
          description: 'Remove a marca da árvore de acessibilidade.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Logo> = {
  title: 'Unoovista/Componentes/Logo',
  component: Logo,
  parameters: { layout: 'padded' },
  argTypes: {
    height: {
      control: { type: 'range', min: 16, max: 96, step: 1 },
      description: 'Altura da marca em pixels.',
    },
    variant: {
      control: 'radio',
      options: ['lockup', 'mark'],
      description: 'Lockup completo ou só o símbolo.',
    },
    tone: {
      control: 'radio',
      options: ['primary', 'inverse', 'inherit'],
      description: 'Tom cromático da marca.',
    },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    title: { control: 'text', description: 'Rótulo acessível.' },
    decorative: { control: 'boolean', description: 'Remove da árvore de acessibilidade.' },
  },
  args: {
    height: 40,
    variant: 'lockup',
    tone: 'primary',
    theme: 'light',
    title: 'Unoovista',
    decorative: false,
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <LogoDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Logo expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Logo',
  render: (args) => (
    <UnvDocStage
      theme={args.theme ?? 'light'}
      surface={args.tone === 'inverse' ? 'tertiary' : 'primary'}
      padding={56}
    >
      <Logo {...args} />
    </UnvDocStage>
  ),
};

/**
 * Símbolo, lockup e o uso nos dois temas.
 */
export const SimboloLockupEDoisTemas: Story = {
  name: '🎨 Símbolo, lockup e os dois temas',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
      <UnvDocStage label="Tema claro" theme="light" padding={40} direction="column" gap={24}>
        <Logo height={44} />
        <Logo height={44} variant="mark" />
      </UnvDocStage>
      <UnvDocStage label="Tema escuro" theme="dark" padding={40} direction="column" gap={24}>
        <Logo height={44} />
        <Logo height={44} variant="mark" />
      </UnvDocStage>
    </div>
  ),
};

/**
 * Escala de tamanhos do lockup.
 */
export const Tamanhos: Story = {
  render: () => (
    <UnvDocStage gap={32} align="center">
      {[20, 28, 34, 44, 56].map((height) => (
        <div key={height} style={{ textAlign: 'center' }}>
          <Logo height={height} />
          <div style={CAPTION}>{height}px</div>
        </div>
      ))}
    </UnvDocStage>
  ),
};

/**
 * Marca sobre fotografia, no tom inverse.
 */
export const SobreMidia: Story = {
  name: 'Sobre mídia (inverse)',
  render: () => (
    <UnvDocStage>
      <LogoOnMedia />
    </UnvDocStage>
  ),
};
