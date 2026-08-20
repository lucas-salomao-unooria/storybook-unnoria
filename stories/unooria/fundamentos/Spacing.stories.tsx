import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  unooriaSpacing,
  unooriaSpacingPx,
  UnooriaSpacingKey,
} from '../../../src/unooria/tokens/spacing';
import '../../../src/unooria/tokens/spacing.css';
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
 * Componente visual para documentação e simulação do Espaçamento (Space)
 * Plataforma Unooria - Extraído do Figma (Node 6189:512)
 */
const UnooriaSpacingDocumentation: React.FC<{
  selectedPadding?: UnooriaSpacingKey;
  selectedGap?: UnooriaSpacingKey;
  selectedMargin?: UnooriaSpacingKey;
}> = ({
  selectedPadding = 'M',
  selectedGap = 'S',
  selectedMargin = 'XS',
}) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [currentPadding, setCurrentPadding] = useState<UnooriaSpacingKey>(selectedPadding);
  const [currentGap, setCurrentGap] = useState<UnooriaSpacingKey>(selectedGap);
  const [currentMargin, setCurrentMargin] = useState<UnooriaSpacingKey>(selectedMargin);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const spacingKeys: UnooriaSpacingKey[] = [
    'None',
    '4XS',
    'XXXS',
    'XXS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
    'XXXL',
    '4XL',
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        category="Foundations • Espaçamento"
        title="Espaçamento"
        description="Sistema de escala de espaçamentos para garantir organização, ritmo visual, legibilidade e consistência de layouts em toda a Plataforma Unooria."
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

      {/* SEÇÃO 1: REPRODUÇÃO FIEL DO FIGMA (Node 6189:512) */}
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
              Especificação Visual Figma (Node 6189:512)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design exato conforme especificado no Figma para o componente Space.
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
                Space
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
                Space refere-se ao espaçamento entre elementos na interface, garantindo organização, legibilidade e uma experiência visual equilibrada.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ fontWeight: 700, color: '#CBD4D6' }}>Exemplo visual:</strong>{' '}
                Margens e paddings bem definidos criam respiro entre seções, enquanto espaçamentos consistentes melhoram a hierarquia e a usabilidade.
              </p>
            </div>
          </div>

          {/* Tabela de Tokens Figma (516px) */}
          <div
            style={{
              width: '100%',
              maxWidth: '516px',
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
            }}
          >
            {/* Header da Tabela */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 100px 1fr',
                padding: '8px 16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#F5F5F5', lineHeight: '24px' }}>
                name
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#F5F5F5', lineHeight: '24px' }}>
                px
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#F5F5F5', lineHeight: '24px' }}>
                example
              </div>
            </div>

            {/* Linhas da Tabela */}
            {spacingKeys.map((key) => {
              const token = unooriaSpacing[key];
              const px = token.px;

              return (
                <div
                  key={key}
                  onClick={() => handleCopy(token.cssVar)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 100px 1fr',
                    padding: '8px 16px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  title={`Clique para copiar ${token.cssVar}`}
                >
                  {/* name */}
                  <div style={{ fontSize: '16px', fontWeight: 400, color: '#CBD4D6', lineHeight: '24px' }}>
                    {token.name}
                  </div>

                  {/* px */}
                  <div style={{ fontSize: '16px', fontWeight: 400, color: '#CBD4D6', lineHeight: '24px' }}>
                    {px}px
                  </div>

                  {/* example */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: '24px',
                    }}
                  >
                    {px > 0 ? (
                      <div
                        style={{
                          width: `${px}px`,
                          height: `${px}px`,
                          backgroundColor: '#7FA5E2',
                          borderRadius: '1px',
                          transition: 'transform 0.2s ease',
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '12px', color: 'rgba(203, 212, 214, 0.5)', fontStyle: 'italic' }}>
                        —
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
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

      {/* SEÇÃO 2: SIMULADOR INTERATIVO E PLAYGROUND */}
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
          Simulador Interativo de Espaçamentos (Box-Model)
        </h2>

        {/* Controles do Simulador */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            backgroundColor: '#FFFFFF',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid #E2E8F0',
            marginBottom: '24px',
          }}
        >
          {/* Seletor de Padding */}
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
              Padding do Container:
            </label>
            <select
              value={currentPadding}
              onChange={(e) => setCurrentPadding(e.target.value as UnooriaSpacingKey)}
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
              {spacingKeys.map((k) => (
                <option key={k} value={k}>
                  {k} ({unooriaSpacingPx[k]}px)
                </option>
              ))}
            </select>
          </div>

          {/* Seletor de Gap */}
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
              Gap entre Elementos:
            </label>
            <select
              value={currentGap}
              onChange={(e) => setCurrentGap(e.target.value as UnooriaSpacingKey)}
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
              {spacingKeys.map((k) => (
                <option key={k} value={k}>
                  {k} ({unooriaSpacingPx[k]}px)
                </option>
              ))}
            </select>
          </div>

          {/* Seletor de Margem */}
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
              Margem Externa:
            </label>
            <select
              value={currentMargin}
              onChange={(e) => setCurrentMargin(e.target.value as UnooriaSpacingKey)}
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
              {spacingKeys.map((k) => (
                <option key={k} value={k}>
                  {k} ({unooriaSpacingPx[k]}px)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preview do Simulador */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '32px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <div
            style={{
              marginBottom: '16px',
              fontSize: '13px',
              color: '#64748B',
              fontFamily: 'monospace',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <span>
              Styles: <code>padding: {unooriaSpacingPx[currentPadding]}px</code> |{' '}
              <code>gap: {unooriaSpacingPx[currentGap]}px</code> |{' '}
              <code>margin: {unooriaSpacingPx[currentMargin]}px</code>
            </span>
            <CopyBadge
              text={`padding: var(${unooriaSpacing[currentPadding].cssVar}); gap: var(${unooriaSpacing[currentGap].cssVar}); margin: var(${unooriaSpacing[currentMargin].cssVar});`}
              label="Copiar CSS do Box"
            />
          </div>

          {/* Wrapper com visualização de área de padding */}
          <div
            style={{
              backgroundColor: 'rgba(127, 165, 226, 0.2)',
              padding: `${unooriaSpacingPx[currentPadding]}px`,
              borderRadius: '12px',
              border: '1px dashed #0086FF',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Flex Container interno com Gap */}
            <div
              style={{
                display: 'flex',
                gap: `${unooriaSpacingPx[currentGap]}px`,
                backgroundColor: '#FFFFFF',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                overflowX: 'auto',
                transition: 'all 0.3s ease',
              }}
            >
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  style={{
                    flex: 1,
                    minWidth: '120px',
                    padding: '16px',
                    backgroundColor: '#22272A',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    textAlign: 'center',
                    margin: `${unooriaSpacingPx[currentMargin]}px 0`,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                    Card {item}
                  </div>
                  <div style={{ fontSize: '11px', color: '#CBD4D6' }}>
                    Padding: {unooriaSpacing[currentPadding].name}
                  </div>
                </div>
              ))}
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
          Referência de Tokens, Variáveis CSS e Classes Utilitárias
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
                  Token Name
                </th>
                <th style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>
                  Pixels (px)
                </th>
                <th style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>
                  REM
                </th>
                <th style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>
                  Variável CSS
                </th>
                <th style={{ padding: '16px 20px', fontSize: '13px', color: '#475569' }}>
                  Classes Utilitárias (Padding / Margin / Gap)
                </th>
                <th style={{ padding: '16px 20px', fontSize: '13px', color: '#475569', textAlign: 'right' }}>
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              {spacingKeys.map((key) => {
                const token = unooriaSpacing[key];
                const keyLower = key.toLowerCase();

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
                    <td
                      style={{
                        padding: '14px 20px',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#0F172A',
                      }}
                    >
                      {token.name}
                    </td>
                    <td
                      style={{
                        padding: '14px 20px',
                        fontSize: '14px',
                        color: '#334155',
                        fontWeight: 600,
                      }}
                    >
                      {token.px}px
                    </td>
                    <td
                      style={{
                        padding: '14px 20px',
                        fontSize: '13px',
                        color: '#64748B',
                        fontFamily: 'monospace',
                      }}
                    >
                      {token.rem}
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
                        {token.cssVar}
                      </code>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <code style={{ fontSize: '11px', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                          .unooria-p-{keyLower}
                        </code>
                        <code style={{ fontSize: '11px', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                          .unooria-m-{keyLower}
                        </code>
                        <code style={{ fontSize: '11px', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                          .unooria-gap-{keyLower}
                        </code>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <CopyBadge text={`var(${token.cssVar})`} label="Copiar CSS" />
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

const meta: Meta<typeof UnooriaSpacingDocumentation> = {
  title: 'Plataforma Unooria/Fundamentos/Espaçamento',
  component: UnooriaSpacingDocumentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Documentação e especificações visuais fiéis ao Figma do componente Space (Espaçamento) da Plataforma Unooria.',
      },
    },
  },
  argTypes: {
    selectedPadding: {
      control: 'select',
      options: ['None', '4XS', 'XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL'],
      description: 'Token de espaçamento de padding para o simulador',
    },
    selectedGap: {
      control: 'select',
      options: ['None', '4XS', 'XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL'],
      description: 'Token de espaçamento de gap para o simulador',
    },
    selectedMargin: {
      control: 'select',
      options: ['None', '4XS', 'XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL'],
      description: 'Token de espaçamento de margem para o simulador',
    },
  },
};

export default meta;

type Story = StoryObj<typeof UnooriaSpacingDocumentation>;

export const Default: Story = {
  args: {
    selectedPadding: 'M',
    selectedGap: 'S',
    selectedMargin: 'XS',
  },
};

export const SmallSpacing: Story = {
  args: {
    selectedPadding: 'XS',
    selectedGap: '4XS',
    selectedMargin: 'XXXS',
  },
};

export const LargeSpacing: Story = {
  args: {
    selectedPadding: 'XXL',
    selectedGap: 'XL',
    selectedMargin: 'L',
  },
};
