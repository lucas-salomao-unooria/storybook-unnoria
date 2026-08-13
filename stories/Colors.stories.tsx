import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { lightColors, darkColors, semanticColorNames, cssVariableNames, ColorTokens } from '../src/whatsapp/tokens/colors';

/**
 * Story interativa para documentação dos Tokens de Cores do WhatsApp UI (Conversa UI).
 * Exibe as amostras de cores semânticas dos temas Light e Dark extraídos do Figma.
 */
const meta: Meta = {
  title: 'WhatsApp/Tokens/Cores',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Documentação dos Tokens de Cores Semânticas do WhatsApp UI extraídos do Figma (Conversa UI - AI Simulation System). Permite comparar as variações de cada token entre os temas Light e Dark.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface ColorSwatchProps {
  tokenKey: keyof ColorTokens;
  mode: 'light' | 'dark';
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ tokenKey, mode }) => {
  const isLight = mode === 'light';
  const colorValue = isLight ? lightColors[tokenKey] : darkColors[tokenKey];
  const semanticName = semanticColorNames[tokenKey];
  const cssVar = cssVariableNames[tokenKey];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '8px',
        backgroundColor: isLight ? '#FFFFFF' : '#17211E',
        border: `1px solid ${isLight ? '#DFE5E1' : '#2A3834'}`,
        color: isLight ? '#17211E' : '#FFFFFF',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '6px',
          backgroundColor: colorValue,
          border: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          flexShrink: 0,
        }}
      />
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: '14px', lineHeight: '20px' }}>
          {semanticName}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: isLight ? '#697773' : '#9BABA5',
            fontFamily: 'monospace',
            marginTop: '2px',
          }}
        >
          {cssVar} • <span style={{ textTransform: 'uppercase' }}>{colorValue}</span>
        </div>
      </div>
    </div>
  );
};

interface ThemeCardProps {
  title: string;
  mode: 'light' | 'dark';
}

const ThemeCard: React.FC<ThemeCardProps> = ({ title, mode }) => {
  const isLight = mode === 'light';
  const colors = isLight ? lightColors : darkColors;
  const tokenKeys = Object.keys(semanticColorNames) as (keyof ColorTokens)[];

  return (
    <div
      style={{
        flex: '1 1 320px',
        backgroundColor: colors.bgCanvas,
        padding: '24px',
        borderRadius: '16px',
        border: `1px solid ${colors.border}`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3
          style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 700,
            color: colors.textPrimary,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            padding: '4px 8px',
            borderRadius: '12px',
            backgroundColor: colors.bgBrand,
            color: '#FFFFFF',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {mode.toUpperCase()}
        </span>
      </div>

      {/* Amostras dos Tokens */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {tokenKeys.map((key) => (
          <ColorSwatch key={key} tokenKey={key} mode={mode} />
        ))}
      </div>

      {/* Demonstração de Componente com Tokens */}
      <div
        style={{
          marginTop: '12px',
          padding: '16px',
          borderRadius: '12px',
          backgroundColor: colors.bgSurface,
          border: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: colors.statusOnline,
            }}
          />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: colors.textSecondary,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Exemplo de Interface WhatsApp
          </span>
        </div>

        <div
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: colors.bgChatSent,
            color: colors.textPrimary,
            fontSize: '13px',
            lineHeight: '18px',
            fontFamily: 'Inter, sans-serif',
            maxWidth: '85%',
          }}
        >
          Mensagem enviada no chat com token <strong>color/bg/chat-sent</strong>.
        </div>
      </div>
    </div>
  );
};

/**
 * História padrão exibindo as cores do WhatsApp UI nos temas Light e Dark lado a lado.
 */
export const VisaoGeral: Story = {
  render: () => {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 8px 0', color: '#17211E' }}>
            Tokens de Cores - WhatsApp UI
          </h1>
          <p style={{ fontSize: '15px', color: '#697773', margin: 0, lineHeight: '22px' }}>
            Light e Dark utilizam os mesmos nomes semânticos. Aplique o modo ao container pai;
            evite trocar manualmente as cores internas dos componentes.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          <ThemeCard title="Modo Claro" mode="light" />
          <ThemeCard title="Modo Escuro" mode="dark" />
        </div>
      </div>
    );
  },
};

/**
 * História Interativa para alternar dinamicamente entre os temas na mesma visualização.
 */
export const AlternadorInterativo: Story = {
  render: () => {
    const [selectedMode, setSelectedMode] = useState<'light' | 'dark'>('light');

    return (
      <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '22px', fontWeight: 700 }}>
              Testador de Tema Interativo (WhatsApp)
            </h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#697773' }}>
              Alterne o modo para visualizar o comportamento dinâmico do tema.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '4px',
              padding: '4px',
              backgroundColor: '#E5EBE7',
              borderRadius: '8px',
            }}
          >
            <button
              onClick={() => setSelectedMode('light')}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: selectedMode === 'light' ? '#FFFFFF' : 'transparent',
                color: selectedMode === 'light' ? '#17211E' : '#697773',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: selectedMode === 'light' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              Light
            </button>
            <button
              onClick={() => setSelectedMode('dark')}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: selectedMode === 'dark' ? '#17211E' : 'transparent',
                color: selectedMode === 'dark' ? '#FFFFFF' : '#697773',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: selectedMode === 'dark' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              Dark
            </button>
          </div>
        </div>

        <ThemeCard title={`Modo Atual: ${selectedMode === 'light' ? 'Claro' : 'Escuro'}`} mode={selectedMode} />
      </div>
    );
  },
};

/**
 * Tabela detalhada de tokens para referência rápida de desenvolvedores e designers.
 */
export const TabelaDeTokens: Story = {
  render: () => {
    const tokenKeys = Object.keys(semanticColorNames) as (keyof ColorTokens)[];

    return (
      <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>
          Tabela Completa de Tokens de Cores
        </h2>
        <div
          style={{
            overflowX: 'auto',
            borderRadius: '12px',
            border: '1px solid #DFE5E1',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '14px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#F3F5F2', borderBottom: '1px solid #DFE5E1' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Nome Semântico (Figma)</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Variável CSS</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Chave TypeScript</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Hex Light</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Hex Dark</th>
              </tr>
            </thead>
            <tbody>
              {tokenKeys.map((key, index) => {
                const lightHex = lightColors[key];
                const darkHex = darkColors[key];
                const isEven = index % 2 === 0;

                return (
                  <tr
                    key={key}
                    style={{
                      backgroundColor: isEven ? '#FFFFFF' : '#FAFCFA',
                      borderBottom: '1px solid #EFEFEF',
                    }}
                  >
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#18A87A' }}>
                      {semanticColorNames[key]}
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#697773' }}>
                      {cssVariableNames[key]}
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>{key}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '4px',
                            backgroundColor: lightHex,
                            border: '1px solid #DDD',
                          }}
                        />
                        <span style={{ fontFamily: 'monospace' }}>{lightHex}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '4px',
                            backgroundColor: darkHex,
                            border: '1px solid #DDD',
                          }}
                        />
                        <span style={{ fontFamily: 'monospace' }}>{darkHex}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
};
