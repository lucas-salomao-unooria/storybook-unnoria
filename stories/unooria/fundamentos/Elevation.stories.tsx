import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  unooriaElevation,
  UnooriaElevationKey,
  ElevationTokenDetail,
} from '../../../src/unooria/tokens/elevation';
import '../../../src/unooria/tokens/elevation.css';
import { UnooriaDocShell, UnooriaDocHeader } from '../../../.storybook/components';

// Componente para notificação ao copiar
const CopyBadge: React.FC<{ text: string; label?: string }> = ({ text, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      title="Clique para copiar"
      style={{
        background: copied ? '#01B574' : 'rgba(0, 0, 0, 0.06)',
        color: copied ? '#FFFFFF' : '#334155',
        border: 'none',
        borderRadius: '4px',
        padding: '2px 6px',
        fontSize: '11px',
        fontFamily: 'monospace',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {copied ? '✓ Copiado!' : label || text}
    </button>
  );
};

/**
 * Componente visual para documentação e simulação das Elevações e Sombras (Elevation / Box Shadows)
 * Plataforma Unooria - Extraído do Figma (Node 6188:6091)
 */
const UnooriaElevationDocumentation: React.FC<{
  selectedToken?: UnooriaElevationKey;
  interactiveBg?: 'dark' | 'light' | 'gradient';
}> = ({
  selectedToken = 'brandPrimary',
  interactiveBg = 'dark',
}) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTokenKey, setActiveTokenKey] = useState<UnooriaElevationKey>(selectedToken);
  const [previewBg, setPreviewBg] = useState<'dark' | 'light' | 'gradient'>(interactiveBg);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const elevationEntries = Object.entries(unooriaElevation) as [
    UnooriaElevationKey,
    ElevationTokenDetail,
  ][];

  const brandTokens = elevationEntries.filter(([, detail]) => detail.category === 'Brand');
  const semanticTokens = elevationEntries.filter(([, detail]) => detail.category === 'Semantic');
  const neutralTokens = elevationEntries.filter(([, detail]) => detail.category === 'Neutral');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        category="Foundations • Elevação & Sombras"
        title="Elevação & Sombras"
        description={
          <>
            Sistema de profundidade e hierarquia visual através de sombras projetadas (<em>box-shadow</em>) para destacar elementos interativos, modais, cartões e notificações na Plataforma Unooria.
          </>
        }
      />

      {/* FEEDBACK DE CÓPIA GLOBAL */}
      {copiedToken && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#22272A',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            fontSize: '14px',
            fontWeight: 600,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: '#01B574' }}>✓</span> Copiado:{' '}
          <code
            style={{
              color: '#7FA5E2',
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            {copiedToken}
          </code>
        </div>
      )}

      {/* SEÇÃO 1: REPRODUÇÃO FIEL DO FIGMA (Node 6188:6091) */}
      <section style={{ marginBottom: '60px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#22272A',
                margin: '0 0 4px 0',
              }}
            >
              Especificação Visual Figma (Node 6188:6091)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design exato conforme especificado no Figma para o componente Elevation.
            </p>
          </div>
        </div>

        {/* CONTAINER ESCURO FIGMA #22272A */}
        <div
          style={{
            backgroundColor: '#22272A',
            borderRadius: '32px',
            padding: '64px',
            color: '#FFFFFF',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '64px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Header Interno Figma */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '100%',
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  color: '#CBD4D6',
                  fontWeight: 400,
                  lineHeight: '28px',
                }}
              >
                Components
              </div>
              <h2
                style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  margin: 0,
                  color: '#FFFFFF',
                  lineHeight: '64px',
                  letterSpacing: '-0.5px',
                }}
              >
                Elevation
              </h2>
            </div>

            {/* Descrição em Texto */}
            <div
              style={{
                fontSize: '12px',
                lineHeight: '18px',
                color: '#CBD4D6',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxWidth: '800px',
              }}
            >
              <p style={{ margin: 0 }}>
                <strong style={{ fontWeight: 700, color: '#CBD4D6' }}>O que são:</strong>{' '}
                Elevation representa a profundidade de elementos na interface por meio de sombras, criando hierarquia visual e destacando componentes.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ fontWeight: 700, color: '#CBD4D6' }}>Exemplo visual:</strong>{' '}
                Botões e cartões podem ter sombras sutis para indicar interatividade, com elevações maiores para elementos em destaque.
              </p>
            </div>
          </div>

          {/* ÁREA DE CARDS BRAND & SEMANTIC */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '48px',
              width: '100%',
            }}
          >
            {/* Bloco Brand */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <h3
                style={{
                  fontSize: '34px',
                  fontWeight: 700,
                  lineHeight: '48px',
                  color: '#CBD4D6',
                  margin: 0,
                }}
              >
                Brand
              </h3>

              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  flexWrap: 'wrap',
                }}
              >
                {brandTokens.map(([key, detail]) => (
                  <div
                    key={key}
                    onClick={() => handleCopy(`var(${detail.cssVar})`)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                    }}
                    title={`Clique para copiar ${detail.cssVar}`}
                  >
                    <div
                      style={{
                        width: '172px',
                        height: '172px',
                        borderRadius: '24px',
                        backgroundColor: '#22272A',
                        boxShadow: detail.boxShadow,
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                    <span
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#CBD4D6',
                        textAlign: 'center',
                      }}
                    >
                      {detail.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bloco Semantic */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <h3
                style={{
                  fontSize: '34px',
                  fontWeight: 700,
                  lineHeight: '48px',
                  color: '#CBD4D6',
                  margin: 0,
                }}
              >
                Semantic
              </h3>

              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  flexWrap: 'wrap',
                }}
              >
                {semanticTokens.map(([key, detail]) => (
                  <div
                    key={key}
                    onClick={() => handleCopy(`var(${detail.cssVar})`)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                    }}
                    title={`Clique para copiar ${detail.cssVar}`}
                  >
                    <div
                      style={{
                        width: '172px',
                        height: '172px',
                        borderRadius: '24px',
                        backgroundColor: '#22272A',
                        boxShadow: detail.boxShadow,
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                    <span
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#CBD4D6',
                        textAlign: 'center',
                      }}
                    >
                      {detail.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ÁREA DE CARDS NEUTRAL */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              width: '100%',
            }}
          >
            <h3
              style={{
                fontSize: '34px',
                fontWeight: 700,
                lineHeight: '48px',
                color: '#CBD4D6',
                margin: 0,
              }}
            >
              Neutral
            </h3>

            <div
              style={{
                display: 'flex',
                gap: '24px',
                flexWrap: 'wrap',
                width: '100%',
              }}
            >
              {neutralTokens.map(([key, detail]) => (
                <div
                  key={key}
                  onClick={() => handleCopy(`var(${detail.cssVar})`)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                  title={`Clique para copiar ${detail.cssVar}`}
                >
                  <div
                    style={{
                      width: '172px',
                      height: '172px',
                      borderRadius: '24px',
                      backgroundColor: '#22272A',
                      boxShadow: detail.boxShadow,
                      backdropFilter: detail.backdropFilter,
                      WebkitBackdropFilter: detail.backdropFilter,
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                  <span
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#CBD4D6',
                      textAlign: 'center',
                    }}
                  >
                    {detail.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Interno Figma */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '32px 64px 0 64px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#CBD4D6', fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: '18px', letterSpacing: '0.5px' }}>
                Unooria
              </span>
            </div>
            <div
              style={{
                fontSize: '14px',
                color: '#CBD4D6',
                fontWeight: 400,
                lineHeight: '20px',
              }}
            >
              Design System
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: SIMULADOR INTERATIVO */}
      <section style={{ marginBottom: '60px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#22272A',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '22px',
              background: '#0086FF',
              borderRadius: '4px',
              display: 'inline-block',
            }}
          />
          Simulador Interativo de Sombras
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Controles do Simulador */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '8px',
                }}
              >
                Selecione o Token de Elevação:
              </label>
              <select
                value={activeTokenKey}
                onChange={(e) => setActiveTokenKey(e.target.value as UnooriaElevationKey)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#1E293B',
                  cursor: 'pointer',
                }}
              >
                {elevationEntries.map(([key, detail]) => (
                  <option key={key} value={key}>
                    [{detail.category}] {detail.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '8px',
                }}
              >
                Fundo do Canvas:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setPreviewBg('dark')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '6px',
                    border: previewBg === 'dark' ? '2px solid #0086FF' : '1px solid #CBD5E1',
                    backgroundColor: '#22272A',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Dark
                </button>
                <button
                  onClick={() => setPreviewBg('light')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '6px',
                    border: previewBg === 'light' ? '2px solid #0086FF' : '1px solid #CBD5E1',
                    backgroundColor: '#F1F5F9',
                    color: '#0F172A',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Light
                </button>
                <button
                  onClick={() => setPreviewBg('gradient')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '6px',
                    border: previewBg === 'gradient' ? '2px solid #0086FF' : '1px solid #CBD5E1',
                    background: 'linear-gradient(135deg, #0E1039, #0086FF)',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Gradient
                </button>
              </div>
            </div>

            <div
              style={{
                fontSize: '13px',
                color: '#64748B',
                lineHeight: '1.5',
                borderTop: '1px solid #F1F5F9',
                paddingTop: '16px',
              }}
            >
              <div>
                <strong>Token:</strong> <code>{unooriaElevation[activeTokenKey].cssVar}</code>
              </div>
              <div style={{ marginTop: '6px' }}>
                <strong>Box Shadow:</strong>{' '}
                <code style={{ fontSize: '11px', wordBreak: 'break-all' }}>
                  {unooriaElevation[activeTokenKey].boxShadow}
                </code>
              </div>
              <div style={{ marginTop: '12px' }}>
                <CopyBadge text={`box-shadow: var(${unooriaElevation[activeTokenKey].cssVar});`} label="Copiar CSS" />
              </div>
            </div>
          </div>

          {/* Visualização de Card Interativo */}
          <div
            style={{
              borderRadius: '16px',
              padding: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '320px',
              transition: 'background 0.3s ease',
              backgroundColor:
                previewBg === 'dark'
                  ? '#22272A'
                  : previewBg === 'light'
                  ? '#E2E8F0'
                  : 'transparent',
              background:
                previewBg === 'gradient'
                  ? 'linear-gradient(135deg, #0E1039 0%, #0086FF 50%, #7FA5E2 100%)'
                  : undefined,
            }}
          >
            <div
              style={{
                width: '260px',
                padding: '32px 24px',
                borderRadius: '24px',
                backgroundColor: previewBg === 'light' ? '#FFFFFF' : '#22272A',
                color: previewBg === 'light' ? '#0F172A' : '#FFFFFF',
                boxShadow: unooriaElevation[activeTokenKey].boxShadow,
                backdropFilter: unooriaElevation[activeTokenKey].backdropFilter || 'none',
                WebkitBackdropFilter: unooriaElevation[activeTokenKey].backdropFilter || 'none',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                border: previewBg === 'light' ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}
              >
                {unooriaElevation[activeTokenKey].name}
              </div>
              <p
                style={{
                  fontSize: '13px',
                  opacity: 0.8,
                  margin: '0 0 20px 0',
                  lineHeight: '1.5',
                }}
              >
                Demonstração da sombra em um componente Card da interface.
              </p>
              <button
                onClick={() => handleCopy(`var(${unooriaElevation[activeTokenKey].cssVar})`)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#0086FF',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,134,255,0.3)',
                }}
              >
                Copiar CSS Var
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: TABELA DE REFERÊNCIA RÁPIDA DE TOKENS E CLASSES UTILITÁRIAS */}
      <section>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#22272A',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '22px',
              background: '#01B574',
              borderRadius: '4px',
              display: 'inline-block',
            }}
          />
          Tabela Completa de Variáveis CSS e Classes Utilitárias de Elevação
        </h2>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: '#F8FAFC',
                  borderBottom: '1px solid #E2E8F0',
                }}
              >
                <th style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>
                  Categoria
                </th>
                <th style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>
                  Nome da Sombra
                </th>
                <th style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>
                  Valor CSS (Box-Shadow)
                </th>
                <th style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>
                  Variável CSS
                </th>
                <th style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>
                  Classe Utilitária CSS
                </th>
                <th style={{ padding: '16px 20px', fontSize: '13px', color: '#475569', textAlign: 'right' }}>
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              {elevationEntries.map(([key, detail]) => {
                const utilClass = `.unooria-${detail.cssVar.replace('--unooria-', '')}`;
                return (
                  <tr
                    key={key}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '4px 8px',
                          borderRadius: '12px',
                          backgroundColor:
                            detail.category === 'Brand'
                              ? '#EFF6FF'
                              : detail.category === 'Semantic'
                              ? '#FEF2F2'
                              : '#F1F5F9',
                          color:
                            detail.category === 'Brand'
                              ? '#1D4ED8'
                              : detail.category === 'Semantic'
                              ? '#DC2626'
                              : '#475569',
                        }}
                      >
                        {detail.category}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: '14px 20px',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#0F172A',
                      }}
                    >
                      {detail.name}
                    </td>
                    <td
                      style={{
                        padding: '14px 20px',
                        fontSize: '12px',
                        color: '#475569',
                        fontFamily: 'monospace',
                      }}
                    >
                      {detail.boxShadow}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <code
                        style={{
                          backgroundColor: '#F1F5F9',
                          color: '#0F172A',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontFamily: 'monospace',
                        }}
                      >
                        {detail.cssVar}
                      </code>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <code
                        style={{
                          backgroundColor: '#F1F5F9',
                          color: '#0F172A',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontFamily: 'monospace',
                        }}
                      >
                        {utilClass}
                      </code>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <CopyBadge text={`var(${detail.cssVar})`} label="Copiar CSS" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof UnooriaElevationDocumentation> = {
  title: 'Plataforma Unooria/Fundamentos/Elevação',
  component: UnooriaElevationDocumentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Documentação e especificações visuais fiéis ao Figma do componente Elevation (Elevações e Sombras) da Plataforma Unooria.',
      },
    },
  },
  argTypes: {
    selectedToken: {
      control: 'select',
      options: [
        'brandPrimary',
        'brandSecondary',
        'semanticDanger',
        'semanticWarning',
        'semanticSuccess',
        'semanticInfo',
        'neutral1',
        'neutral2',
        'neutral3',
        'neutral4',
        'neutral5',
        'neutral6',
      ],
      description: 'Token de elevação selecionado para o simulador interativo',
    },
    interactiveBg: {
      control: 'radio',
      options: ['dark', 'light', 'gradient'],
      description: 'Fundo do container no simulador',
    },
  },
};

export default meta;

type Story = StoryObj<typeof UnooriaElevationDocumentation>;

export const Default: Story = {
  args: {
    selectedToken: 'brandPrimary',
    interactiveBg: 'dark',
  },
};

export const SemanticShadows: Story = {
  args: {
    selectedToken: 'semanticDanger',
    interactiveBg: 'dark',
  },
};

export const NeutralShadows: Story = {
  args: {
    selectedToken: 'neutral3',
    interactiveBg: 'dark',
  },
};
