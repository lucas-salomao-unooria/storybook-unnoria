import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  typographyStyles,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
  TypographyStyle,
} from '../../src/whatsapp/tokens/typography';

// Componente para renderizar cada item de estilo de texto
const TypographyItem: React.FC<{
  styleToken: TypographyStyle;
  customText?: string;
  showDetails?: boolean;
}> = ({ styleToken, customText, showDetails = true }) => {
  const textToDisplay = customText || styleToken.sampleText;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #DFE5E1',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          borderBottom: '1px solid #F3F5F2',
          paddingBottom: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontWeight: 600,
              fontSize: '13px',
              color: '#17211E',
            }}
          >
            {styleToken.name}
          </span>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '12px',
              backgroundColor: '#AFE3D4',
              color: '#0B594D',
              fontWeight: 500,
            }}
          >
            role: {styleToken.role}
          </span>
        </div>

        {showDetails && (
          <div
            style={{
              fontSize: '11px',
              color: '#697773',
              fontFamily: 'monospace',
            }}
          >
            {styleToken.fontSize} / {styleToken.lineHeight} • {styleToken.fontWeightName}
          </div>
        )}
      </div>

      <p style={{ fontSize: '12px', color: '#697773', margin: 0 }}>
        {styleToken.description}
      </p>

      {/* Preview Visual */}
      <div
        style={{
          padding: '12px 0',
          color: '#17211E',
          fontFamily: styleToken.fontFamily,
          fontSize: styleToken.fontSize,
          lineHeight: styleToken.lineHeight,
          fontWeight: styleToken.fontWeight,
          wordBreak: 'break-word',
        }}
      >
        {textToDisplay}
      </div>

      {showDetails && (
        <div
          style={{
            backgroundColor: '#F3F5F2',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '11px',
            fontFamily: 'monospace',
            color: '#17211E',
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <span>font-size: {styleToken.fontSize};</span>
          <span>line-height: {styleToken.lineHeight};</span>
          <span>font-weight: {styleToken.fontWeight};</span>
          <span>class: .text-{styleToken.role.replace(/([A-Z])/g, '-$1').toLowerCase()}</span>
        </div>
      )}
    </div>
  );
};

// Componente principal para a Guia do Design System
function TypographyDesignSystemGuide({
  sampleText,
  filterRole = 'all',
  showDetails = true,
}: {
  sampleText?: string;
  filterRole?: string;
  showDetails?: boolean;
}) {
  const [searchTerm, setSearchText] = useState('');

  const stylesList = Object.values(typographyStyles).filter((styleItem) => {
    const matchesFilter = filterRole === 'all' || styleItem.role === filterRole;
    const matchesSearch =
      styleItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      styleItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      styleItem.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div
      style={{
        fontFamily: 'Inter, -apple-system, sans-serif',
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        color: '#17211E',
      }}
    >
      {/* Cabeçalho */}
      <div
        style={{
          borderBottom: '2px solid #18A87A',
          paddingBottom: '16px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#18A87A',
          }}
        >
          WhatsApp UI • Design Tokens
        </span>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 600,
            lineHeight: '39px',
            margin: '4px 0 8px 0',
            color: '#17211E',
          }}
        >
          Tipografia & Estilos de Texto
        </h1>
        <p
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            color: '#697773',
            margin: 0,
          }}
        >
          Inter mantém a densidade das conversas e mensagens de simulação legíveis. Utilize papéis semânticos (roles) em vez de tamanhos arbitrários.
        </p>
      </div>

      {/* Tabela de Resumo dos Tokens Base */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #DFE5E1',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginTop: 0, marginBottom: '16px' }}>
          Tokens de Tipografia Base
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {/* Font Family */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#18A87A', marginBottom: '8px' }}>
              Font Family
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {Object.entries(fontFamilies).map(([key, value]) => (
                <li key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ color: '#17211E' }}>{key}</strong>
                  <span style={{ fontSize: '11px', color: '#697773', fontFamily: 'monospace' }}>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Font Weights */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#18A87A', marginBottom: '8px' }}>
              Font Weights
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {Object.entries(fontWeights).map(([key, value]) => (
                <li key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{key}</span>
                  <strong style={{ fontFamily: 'monospace' }}>{value}</strong>
                </li>
              ))}
            </ul>
          </div>

          {/* Font Sizes */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#18A87A', marginBottom: '8px' }}>
              Font Sizes
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {Object.entries(fontSizes).map(([key, value]) => (
                <li key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{key}</span>
                  <strong style={{ fontFamily: 'monospace' }}>{value}</strong>
                </li>
              ))}
            </ul>
          </div>

          {/* Line Heights */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#18A87A', marginBottom: '8px' }}>
              Line Heights
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {Object.entries(lineHeights).map(([key, value]) => (
                <li key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{key}</span>
                  <strong style={{ fontFamily: 'monospace' }}>{value}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Controles e Busca */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          backgroundColor: '#F3F5F2',
          padding: '12px 16px',
          borderRadius: '8px',
        }}
      >
        <input
          type="text"
          placeholder="Buscar por nome, papel ou descrição..."
          value={searchTerm}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #DFE5E1',
            fontSize: '13px',
            outline: 'none',
          }}
        />
        <span style={{ fontSize: '12px', color: '#697773' }}>
          Exibindo {stylesList.length} estilo(s)
        </span>
      </div>

      {/* Lista de Estilos de Texto */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {stylesList.map((styleToken) => (
          <TypographyItem
            key={styleToken.role}
            styleToken={styleToken}
            customText={sampleText}
            showDetails={showDetails}
          />
        ))}

        {stylesList.length === 0 && (
          <div
            style={{
              padding: '32px',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #DFE5E1',
              color: '#697773',
            }}
          >
            Nenhum estilo de texto encontrado para a busca "{searchTerm}".
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Documentação e visualização interativa dos Tokens de Tipografia
 * do Design System WhatsApp UI (Conversa UI).
 */
const meta = {
  title: 'WhatsApp/Tokens/Tipografia',
  component: TypographyDesignSystemGuide,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Sistema de tipografia projetado para garantir máxima legibilidade em interfaces densas de bate-papo e simulação. Utiliza a fonte **Inter** com hierarquia visual rigorosa baseada em papéis (roles), evitando tamanhos arbitrários de fonte.',
      },
    },
  },
  argTypes: {
    sampleText: {
      control: 'text',
      description: 'Texto de exemplo para testar em todos os estilos de tipografia',
      defaultValue: 'Conversa UI — Sistema de Simulação de IA',
    },
    filterRole: {
      control: 'select',
      options: ['all', 'display', 'sectionTitle', 'heading', 'chatTitle', 'body', 'bodyCompact', 'label', 'metadata', 'spec'],
      description: 'Filtrar estilo de texto específico',
    },
    showDetails: {
      control: 'boolean',
      description: 'Exibir detalhes técnicos de CSS em cada preview',
      defaultValue: true,
    },
  },
} satisfies Meta<typeof TypographyDesignSystemGuide>;

export default meta;

type Story = StoryObj<typeof TypographyDesignSystemGuide>;

// Story principal da Guia de Tipografia
export const GuiaTipografia: Story = {
  name: 'Visão Geral e Tokens',
  render: (args) => (
    <TypographyDesignSystemGuide
      sampleText={args.sampleText}
      filterRole={args.filterRole}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: '',
    filterRole: 'all',
    showDetails: true,
  },
};

// Story de Estilos Individuais para Teste Rápido
export const Display: Story = {
  name: 'Estilo / Display',
  render: (args) => (
    <TypographyItem
      styleToken={typographyStyles.display}
      customText={args.sampleText}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'Conversa UI',
    showDetails: true,
  },
};

export const SectionTitle: Story = {
  name: 'Estilo / Section Title',
  render: (args) => (
    <TypographyItem
      styleToken={typographyStyles.sectionTitle}
      customText={args.sampleText}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'Typography',
    showDetails: true,
  },
};

export const Heading: Story = {
  name: 'Estilo / Heading',
  render: (args) => (
    <TypographyItem
      styleToken={typographyStyles.heading}
      customText={args.sampleText}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'Chats',
    showDetails: true,
  },
};

export const ChatTitle: Story = {
  name: 'Estilo / Chat Title',
  render: (args) => (
    <TypographyItem
      styleToken={typographyStyles.chatTitle}
      customText={args.sampleText}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'Maya Chen',
    showDetails: true,
  },
};

export const Body: Story = {
  name: 'Estilo / Body',
  render: (args) => (
    <TypographyItem
      styleToken={typographyStyles.body}
      customText={args.sampleText}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'Perfect — see you at 12:30.',
    showDetails: true,
  },
};

export const BodyCompact: Story = {
  name: 'Estilo / Body Compact',
  render: (args) => (
    <TypographyItem
      styleToken={typographyStyles.bodyCompact}
      customText={args.sampleText}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'Final screens are up',
    showDetails: true,
  },
};

export const Label: Story = {
  name: 'Estilo / Label',
  render: (args) => (
    <TypographyItem
      styleToken={typographyStyles.label}
      customText={args.sampleText}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'UNREAD',
    showDetails: true,
  },
};

export const Metadata: Story = {
  name: 'Estilo / Metadata',
  render: (args) => (
    <TypographyItem
      styleToken={typographyStyles.metadata}
      customText={args.sampleText}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'Today at 09:41',
    showDetails: true,
  },
};

export const Spec: Story = {
  name: 'Estilo / Spec (Caption)',
  render: (args) => (
    <TypographyItem
      styleToken={typographyStyles.spec}
      customText={args.sampleText}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: '40px / 56px',
    showDetails: true,
  },
};
