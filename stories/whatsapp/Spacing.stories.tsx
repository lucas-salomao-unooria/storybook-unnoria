import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { spacing, spacingPx, radius, radiusPx, SpacingToken, RadiusToken } from '../../src/whatsapp/tokens/spacing';

// Componente visual para demonstrar a escala de espaçamentos do WhatsApp UI
const SpacingDocumentation: React.FC<{
  selectedPadding?: SpacingToken;
  selectedGap?: SpacingToken;
  interactiveRadius?: RadiusToken;
}> = ({
  selectedPadding = 'md',
  selectedGap = 'sm',
  interactiveRadius = 'md',
}) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const spacingEntries = Object.entries(spacing) as [SpacingToken, string][];
  const radiusEntries = Object.entries(radius) as [RadiusToken, string][];

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#17211E', maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <header style={{ marginBottom: '32px', borderBottom: '1px solid #E5E7EB', paddingBottom: '24px' }}>
        <div style={{ display: 'inline-block', background: '#E6F4F0', color: '#0B795F', fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '12px', marginBottom: '8px' }}>
          WhatsApp UI Design System
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 8px 0', color: '#17211E' }}>
          Tokens de Espaçamento e Raio de Borda
        </h1>
        <p style={{ fontSize: '15px', color: '#697773', margin: 0, lineHeight: '1.6' }}>
          Uma escala de grid base de <strong>4 px</strong> com dimensões nomeadas para web. Utilize os tokens para garantir consistência visual em paddings, gaps, margens e tamanhos na interface do WhatsApp.
        </p>
      </header>

      {/* Seção 1: Réguas e Blocos Visuais da Escala de Espaçamento */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: '#17211E', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '20px', background: '#18A87A', borderRadius: '4px', display: 'inline-block' }}></span>
          Escala de Espaçamento (Spacing Scale)
        </h2>

        {/* Tabela / Grid de Blocos com Réguas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {spacingEntries.map(([token, remValue]) => {
            const pxValue = spacingPx[token];
            const cssVar = `--spacing-${token}`;

            return (
              <div
                key={token}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 100px 140px 1fr',
                  alignItems: 'center',
                  padding: '16px 20px',
                  background: '#F9FAFB',
                  border: '1px solid #EAECF0',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Nome do Token e Botão para Copiar */}
                <div>
                  <button
                    onClick={() => handleCopy(cssVar)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    title="Clique para copiar a variável CSS"
                  >
                    <span style={{ fontSize: '16px', fontWeight: 700, color: '#0B795F' }}>
                      {token}
                    </span>
                    <span style={{ fontSize: '11px', color: '#697773', fontFamily: 'monospace' }}>
                      {copiedToken === cssVar ? 'Copiado!' : cssVar}
                    </span>
                  </button>
                </div>

                {/* Valores em Rem e PX */}
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#344054' }}>
                  {pxValue}px
                </div>
                <div style={{ fontSize: '13px', color: '#667085', fontFamily: 'monospace' }}>
                  {remValue}
                </div>

                {/* Régua / Bloco Visual com Largura Real */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    {/* Bloco de Amostra Visual */}
                    <div
                      style={{
                        width: `${pxValue * 3}px`,
                        height: '32px',
                        background: '#18A87A',
                        borderRadius: '4px',
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>

                  {/* Indicador Numérico de Largura Real em Escala 1:1 */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: `${pxValue}px`,
                      height: '12px',
                      background: '#AFE3D4',
                      borderRadius: '2px',
                      border: '1px solid #18A87A',
                    }}
                    title={`Largura em escala 1:1 (${pxValue}px)`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Seção 2: Playground Interativo de Padding e Gap */}
      <section style={{ marginBottom: '48px', padding: '24px', background: '#F8FAF9', borderRadius: '12px', border: '1px solid #D0E7E0' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: '#0B795F' }}>
          Simulador Interativo de Espaçamento
        </h2>
        <p style={{ fontSize: '14px', color: '#475467', marginBottom: '20px' }}>
          Ajuste os seletores nos controles da história para observar a aplicação prática dos tokens em tempo real.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Exemplo 1: Container com Padding do Token */}
          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #EAECF0' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#344054', marginBottom: '12px' }}>
              Demonstração de Padding: <code style={{ color: '#0B795F' }}>padding: spacing['{selectedPadding}']</code> ({spacingPx[selectedPadding]}px)
            </h3>

            <div
              style={{
                background: '#AFE3D4',
                padding: spacing[selectedPadding],
                borderRadius: radius[interactiveRadius],
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '16px',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#101828',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                Conteúdo Interno do Card
                <div style={{ fontSize: '11px', color: '#667085', marginTop: '4px' }}>
                  A área verde-clara ao redor representa o padding configurado.
                </div>
              </div>
            </div>
          </div>

          {/* Exemplo 2: Container Flex com Gap do Token */}
          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #EAECF0' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#344054', marginBottom: '12px' }}>
              Demonstração de Gap: <code style={{ color: '#0B795F' }}>gap: spacing['{selectedGap}']</code> ({spacingPx[selectedGap]}px)
            </h3>

            <div
              style={{
                display: 'flex',
                gap: spacing[selectedGap],
                padding: '16px',
                background: '#F2F4F7',
                borderRadius: radius[interactiveRadius],
                overflowX: 'auto',
              }}
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  style={{
                    flex: 1,
                    minWidth: '60px',
                    padding: '12px 8px',
                    background: '#18A87A',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  Item {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3: Tokens de Raio de Borda (Radius Tokens) */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: '#17211E', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '20px', background: '#0B795F', borderRadius: '4px', display: 'inline-block' }}></span>
          Tokens de Raio de Borda (Radius Tokens)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          {radiusEntries.map(([token, val]) => (
            <div
              key={token}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 16px',
                background: '#FFFFFF',
                border: '1px solid #EAECF0',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              {/* Bloco de Demonstração de Raio */}
              <div
                style={{
                  width: '82px',
                  height: '82px',
                  background: '#AFE3D4',
                  border: '2px solid #0B795F',
                  borderRadius: radius[token],
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#0B795F' }}>
                  {val}
                </span>
              </div>

              <span style={{ fontSize: '14px', fontWeight: 700, color: '#101828' }}>
                {token}
              </span>
              <span style={{ fontSize: '11px', color: '#667085', fontFamily: 'monospace', marginTop: '2px' }}>
                --radius-{token}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const meta: Meta<typeof SpacingDocumentation> = {
  title: 'WhatsApp/Tokens/Espaçamento',
  component: SpacingDocumentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Documentação interativa dos Tokens de Espaçamento e Raios de Borda do WhatsApp UI extraídos diretamente das especificações do Figma. Baseado na escala de 4px.',
      },
    },
  },
  argTypes: {
    selectedPadding: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Token de espaçamento para teste interativo de padding',
    },
    selectedGap: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Token de espaçamento para teste interativo de gap',
    },
    interactiveRadius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'bubble', 'full'],
      description: 'Token de raio de borda para teste interativo',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SpacingDocumentation>;

export const Default: Story = {
  args: {
    selectedPadding: 'md',
    selectedGap: 'sm',
    interactiveRadius: 'md',
  },
};

export const SmallSpacing: Story = {
  args: {
    selectedPadding: 'xs',
    selectedGap: '2xs',
    interactiveRadius: 'sm',
  },
};

export const LargeSpacing: Story = {
  args: {
    selectedPadding: 'xl',
    selectedGap: 'lg',
    interactiveRadius: 'lg',
  },
};
