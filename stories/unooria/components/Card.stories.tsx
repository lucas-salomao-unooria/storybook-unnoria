import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardMedia, CardProgress } from '../../../src/unooria/components/Card';
import { CardProps } from '../../../src/unooria/components/Card/Card.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

// Ícones SVG inline para ilustrar o Card
const AcademicIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SAMPLE_IMAGE = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';

/**
 * Página de Documentação Rica do Card baseada no Padrão Ouro do Design System Unooria
 */
const CardDocumentationPage = () => {
  return (
    <UnooriaDocShell>
      {/* 1. Cabeçalho Oficial */}
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Conteúdo & Superfície"
        title="Card"
        description="Os Cards são componentes modulares que agrupam informações de forma visual e acessível. Usados em dashboards, listagens e feeds, eles destacam títulos, mídias, textos, indicadores de progresso e botões."
      />

      {/* 2. Visão Geral & Regras de Ouro */}
      <UnooriaDocSectionHeader
        title="1. Visão Geral & Regras de Ouro de Composição"
        description="Diretrizes de layout e hierarquia extraídas diretamente do Figma oficial."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            padding: 24,
            borderRadius: 12,
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#22272A', fontSize: 16 }}>🎯 O que são</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#475157' }}>
            Os <strong>Cards</strong> oferecem uma experiência visual segmentada, com espaçamento adequado (16px de padding e 24px entre blocos) e hierarquia clara para facilitar a leitura e tomada de decisão.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            padding: 24,
            borderRadius: 12,
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#6487C2', fontSize: 16 }}>📐 Regra de Header & Botões</h4>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.6, color: '#475157' }}>
            <li><strong>Header:</strong> Se o ícone e a tag existirem, ícone fica à esquerda e tag à direita. Se apenas um existir, ele alinha à esquerda.</li>
            <li><strong>2 Botões:</strong> Ação principal em <code>filled</code> vibrante e secundária em <code>subtle</code>.</li>
            <li><strong>1 Botão:</strong> Deve ser <code>subtle</code> e ocupar 100% da largura inferior.</li>
          </ul>
        </div>
      </div>

      {/* 3. Figma Specs */}
      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Links oficiais e nós de design homologados."
      />
      <div
        style={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: 8,
          padding: 20,
          marginBottom: 32,
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 12, color: '#49699F', textTransform: 'uppercase', fontWeight: 600 }}>
              Figma Frame Node ID
            </span>
            <div style={{ fontSize: 16, color: '#22272A', fontWeight: 700, fontFamily: 'monospace' }}>
              7740:1778 (Card)
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #CBD5E1', paddingLeft: 16 }}>
            <span style={{ fontSize: 12, color: '#49699F', textTransform: 'uppercase', fontWeight: 600 }}>
              Component Set
            </span>
            <div style={{ fontSize: 14, color: '#22272A', fontWeight: 600 }}>
              Card (#7731:291)
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <a
              href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=7740-1778&m=dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                backgroundColor: '#6487C2',
                color: '#FFFFFF',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Abrir no Figma Dev Mode ↗
            </a>
          </div>
        </div>
      </div>

      {/* 4. Matriz do Figma */}
      <UnooriaDocSectionHeader
        title="3. Matriz do Figma (Card Completo & Variações)"
        description="Demonstração do Card completo com ícone, tag, imagem, progresso circular e botões de ação."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 32, marginBottom: 32 }}>
        {/* Card Completo */}
        <div style={{ padding: 24, backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'center' }}>
          <Card
            icon={<AcademicIcon />}
            tag="Tecnologia"
            image={SAMPLE_IMAGE}
            title="Desenvolvimento Web Fullstack"
            subtitle="Módulo Avançado de Frontend"
            progress={75}
            description="Aprenda a construir aplicações modernas e responsivas utilizando React, TypeScript e Design Systems escaláveis."
            metadata={[
              { icon: <ClockIcon />, text: 'Carga Horária: 120 horas' },
              { icon: <UserIcon />, text: 'Prof. Lucas Salomão' },
            ]}
            subtags={['React', 'TypeScript', 'Storybook']}
            secondaryAction={{ label: 'Ver Detalhes' }}
            primaryAction={{ label: 'Inscrever-se' }}
          />
        </div>

        {/* Card com 1 Botão (Full Width Subtle) */}
        <div style={{ padding: 24, backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'center' }}>
          <Card
            icon={<AcademicIcon />}
            title="Design System na Prática"
            subtitle="Fundamentos e Componentes"
            progress={40}
            description="Padronização visual e técnica para equipes de alto desempenho."
            metadata={[
              { icon: <ClockIcon />, text: 'Carga Horária: 40 horas' },
            ]}
            primaryAction={{ label: 'Continuar Curso' }}
          />
        </div>
      </div>

      {/* 5. Referência Completa de Props da API */}
      <UnooriaDocSectionHeader
        title="4. Referência Completa de Props da API"
        description="Propriedades disponíveis para o Card e seus subcomponentes."
      />
      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14, backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, overflow: 'hidden' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Propriedade</th>
              <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Tipo</th>
              <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Padrão</th>
              <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td colSpan={4} style={{ padding: '12px 16px', backgroundColor: '#F1F5F9', fontWeight: 600, color: '#475157' }}>Card</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>variant</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>'default' | 'elevated' | 'outlined' | 'interactive'</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Variante visual do Card.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>orientation</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>'vertical' | 'horizontal'</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Orientação do conteúdo do Card.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>theme</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>CardTheme</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Tema visual (light/dark).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>interactive</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>boolean</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Se true, aplica estilos de hover/focus.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>icon</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>React.ReactNode</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Ícone exibido no cabeçalho.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>tag / tags</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>React.ReactNode | React.ReactNode[]</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Tag(s) no cabeçalho.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>image</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>string</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>URL da imagem de destaque.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>title / subtitle</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>React.ReactNode</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Textos principais do Card.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>progress</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>number</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Valor do progresso circular (0-100).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>metadata</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>CardMetadataItem[]</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Lista de metadados com ícone e texto.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>primaryAction / secondaryAction</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>CardActionItem</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Ações principais e secundárias (botões).</td>
            </tr>

            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td colSpan={4} style={{ padding: '12px 16px', backgroundColor: '#F1F5F9', fontWeight: 600, color: '#475157' }}>CardHeader</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>avatar / icon</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>React.ReactNode</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Avatar ou ícone do cabeçalho.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>action</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>React.ReactNode</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Ação customizada à direita.</td>
            </tr>

            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td colSpan={4} style={{ padding: '12px 16px', backgroundColor: '#F1F5F9', fontWeight: 600, color: '#475157' }}>CardTitle</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>as</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>CardTitleAs</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Tag HTML a ser renderizada.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>size</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>CardTitleSize</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Tamanho do título.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>truncate</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>boolean | number</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Limita linhas do texto.</td>
            </tr>

            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td colSpan={4} style={{ padding: '12px 16px', backgroundColor: '#F1F5F9', fontWeight: 600, color: '#475157' }}>CardMedia</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>src</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>string</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>URL da imagem.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>fit</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>'cover' | 'contain' | 'fill' | 'none'</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Comportamento de object-fit.</td>
            </tr>

            <tr>
              <td colSpan={4} style={{ padding: '12px 16px', backgroundColor: '#F1F5F9', fontWeight: 600, color: '#475157' }}>CardProgress</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>value</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>number</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Valor do progresso (obrigatório).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A' }}>showLabel</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}><code>boolean</code></td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Exibe a porcentagem em texto.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 6. Boas Práticas (Do's & Don'ts) */}
      <UnooriaDocSectionHeader
        title="5. Boas Práticas (Do's & Don'ts)"
        description="Orientações sobre o uso correto e incorreto do componente."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 32 }}>
        <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: 24, borderRadius: 12 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#065F46', fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>✅</span> FAÇA (DO)
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.6, color: '#047857' }}>
            <li>Mantenha títulos curtos e descritivos.</li>
            <li>Use <strong>uma</strong> ação principal clara por Card.</li>
            <li>Utilize ícones coerentes com o contexto da informação.</li>
            <li>Aproveite o espaço em branco interno para melhor legibilidade.</li>
          </ul>
        </div>
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: 24, borderRadius: 12 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#991B1B', fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>❌</span> NÃO FAÇA (DON'T)
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.6, color: '#B91C1C' }}>
            <li>Não sobrecarregue o Card com muitos textos ou metadados desnecessários.</li>
            <li>Evite usar mais de dois botões no rodapé.</li>
            <li>Não misture estilos de botões incompatíveis com a hierarquia visual.</li>
            <li>Não remova os espaçamentos padrão, eles garantem o respiro visual.</li>
          </ul>
        </div>
      </div>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Card> = {
  title: 'Plataforma Unooria/Componentes/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual de cor',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Percentual do progresso circular',
    },
  },
  args: {
    theme: 'light',
    title: 'Desenvolvimento Web Fullstack',
    subtitle: 'Módulo Avançado',
    progress: 75,
    description: 'Aprenda a construir aplicações modernas e responsivas utilizando React e TypeScript.',
    image: SAMPLE_IMAGE,
    tag: 'Tecnologia',
    icon: <AcademicIcon />,
    metadata: [
      { icon: <ClockIcon />, text: 'Carga Horária: 120 horas' },
      { icon: <UserIcon />, text: 'Prof. Lucas Salomão' },
    ],
    subtags: ['React', 'TypeScript', 'Design System'],
    secondaryAction: { label: 'Ver Detalhes' },
    primaryAction: { label: 'Inscrever-se' },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CardDocumentationPage />,
};

export const Playground: Story = {
  name: '🎮 Playground Interativo',
  render: (args) => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center', backgroundColor: args.theme === 'dark' ? '#22272A' : '#F8FAFC', borderRadius: 12 }}>
      <Card {...args} />
    </div>
  ),
};

export const ComUmBotaoSubtle: Story = {
  name: '🔘 1 Botão (Full Width Subtle)',
  render: () => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center', backgroundColor: '#F8FAFC', borderRadius: 12 }}>
      <Card
        icon={<AcademicIcon />}
        title="Design System Unooria"
        subtitle="Módulo Básico"
        progress={100}
        description="Domine a arquitetura de tokens e componentes padronizados."
        primaryAction={{ label: 'Acessar Certificado' }}
      />
    </div>
  ),
};
