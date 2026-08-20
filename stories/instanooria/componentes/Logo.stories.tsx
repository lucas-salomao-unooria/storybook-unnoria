import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Logo } from '../../../src/instanooria/components/Logo';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaPhotos } from '../fixtures';

/**
 * Página de documentação rica do componente Logo.
 */
const LogoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Marca"
      title="Logo"
      description="Assinatura manuscrita do Instanooria, exibida no centro da barra superior do Feed e no topo das telas de autenticação. O vetor é o export literal da camada “Instagram Logo” do Figma, um único caminho com proporção fixa de 105 × 28px."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Onde a marca aparece e como ela se comporta em cada superfície."
    />
    <InstaDocGrid>
      <InstaDocCard icon="✍️" title="Vetor, não fonte">
        A assinatura é um caminho vetorial fechado, não texto tipografado. Isso elimina a dependência
        de uma fonte manuscrita e garante renderização idêntica em qualquer plataforma.
      </InstaDocCard>
      <InstaDocCard icon="📐" title="Proporção travada">
        A largura é sempre derivada da altura pela razão 105 ÷ 28. A API expõe apenas{' '}
        <code>height</code>, tornando a distorção impossível por construção.
      </InstaDocCard>
      <InstaDocCard icon="🎨" title="Monocromático">
        A marca herda <code>currentColor</code>: preta no tema Classic, quase branca no Dark e sempre
        branca sobre mídia com o tom <code>inverse</code>.
      </InstaDocCard>
      <InstaDocCard icon="♿" title="Acessível por padrão">
        Renderiza <code>role=&quot;img&quot;</code> com o rótulo &quot;Instanooria&quot;. Em contextos
        onde a marca é redundante, <code>decorative</code> a remove da árvore de acessibilidade.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Origem exata do vetor dentro do arquivo de design."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1757"
      frameName="Top Bar → Instagram Logo"
      specs={[
        { label: 'Dimensão original', value: '105 × 28px' },
        { label: 'Tipo de camada', value: 'boolean-operation' },
        { label: 'Caminhos', value: '1 (único path)' },
        { label: 'Posição no Feed', value: 'centro óptico, y = 54px' },
        { label: 'Altura no login', value: '≈ 44px' },
        { label: 'Cor', value: 'currentColor' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="A altura define tudo: largura, área de respiro e peso óptico."
    />
    <InstaDocStage label="Escala proporcional">
      {[20, 28, 36, 44, 56].map((height) => (
        <div key={height} style={{ textAlign: 'center' }}>
          <Logo height={height} />
          <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>
            {height}px · {Math.round((height * 105) / 28)}px
          </div>
        </div>
      ))}
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Tons"
      description="Os três tons disponíveis, cada um em sua superfície de destino."
    />
    <InstaDocStage label="primary · inverse · inherit" background="#FFFFFF">
      <div style={{ textAlign: 'center' }}>
        <Logo height={32} tone="primary" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>primary</div>
      </div>
      <div
        style={{
          textAlign: 'center',
          backgroundColor: '#000000',
          padding: '16px 24px',
          borderRadius: 10,
        }}
      >
        <Logo height={32} tone="inverse" />
        <div style={{ fontSize: 12, color: '#CBD4D6', marginTop: 10 }}>inverse</div>
      </div>
      <div style={{ textAlign: 'center', color: '#3897F0' }}>
        <Logo height={32} tone="inherit" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>inherit</div>
      </div>
    </InstaDocStage>

    <InstaDocStage label="Sobre mídia (tone=&quot;inverse&quot;)" background="#F5F5F5">
      <div
        style={{
          position: 'relative',
          width: 320,
          height: 160,
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <img
          src={instaPhotos.city}
          alt="Cidade ao entardecer"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0))',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 18,
          }}
        >
          <Logo height={28} tone="inverse" />
        </div>
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de aplicação da marca verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Controlar o tamanho apenas pela prop height, deixando a largura ser derivada.',
        'Usar tone="inverse" sempre que a marca ficar sobre mídia ou fundo escuro fixo.',
        'Marcar como decorative quando o nome do produto já estiver escrito ao lado.',
        'Manter respiro lateral de pelo menos metade da altura da marca.',
      ]}
      donts={[
        'Definir width e height simultaneamente, distorcendo a assinatura.',
        'Aplicar gradiente, sombra ou contorno sobre a marca.',
        'Rotacionar, inclinar ou espelhar o vetor.',
        'Recriar a assinatura com uma fonte manuscrita de terceiros.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A marca acompanha --insta-color-text-primary, invertendo automaticamente."
    />
    <InstaDocThemeSwitcher>
      {(activeTheme) => <Logo height={34} theme={activeTheme} />}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Logo."
    />
    <InstaDocPropsTable
      title="Logo"
      rows={[
        {
          name: 'height',
          type: 'number',
          default: '28',
          description: 'Altura em pixels. A largura é derivada da proporção 105 ÷ 28.',
        },
        {
          name: 'tone',
          type: "'primary' | 'inverse' | 'inherit'",
          default: "'primary'",
          description: 'Tom cromático da assinatura.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
        {
          name: 'title',
          type: 'string',
          default: "'Instanooria'",
          description: 'Rótulo acessível da marca.',
        },
        {
          name: 'decorative',
          type: 'boolean',
          default: 'false',
          description: 'Remove a marca da árvore de acessibilidade.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Logo> = {
  title: 'Instanooria/Componentes/Logo',
  component: Logo,
  parameters: { layout: 'padded' },
  argTypes: {
    height: {
      control: { type: 'range', min: 16, max: 96, step: 1 },
      description: 'Altura da assinatura em pixels.',
    },
    tone: {
      control: 'radio',
      options: ['primary', 'inverse', 'inherit'],
      description: 'Tom cromático da assinatura.',
    },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    title: { control: 'text', description: 'Rótulo acessível.' },
    decorative: { control: 'boolean', description: 'Remove da árvore de acessibilidade.' },
  },
  args: {
    height: 34,
    tone: 'primary',
    theme: 'light',
    title: 'Instanooria',
    decorative: false,
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
    <div
      data-insta-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 56,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <Logo {...args} />
    </div>
  ),
};

/**
 * Escala de tamanhos usada nas telas do arquivo de design.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
      {[20, 28, 34, 44, 56].map((height) => (
        <div key={height} style={{ textAlign: 'center' }}>
          <Logo height={height} />
          <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>{height}px</div>
        </div>
      ))}
    </div>
  ),
};
