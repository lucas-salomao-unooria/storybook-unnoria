import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  gridBreakpoints,
  gridColumns,
  gridGutters,
  gridMargins,
  gridContainerWidths,
  GridBreakpointKey,
  breakpoints,
} from '../../../src/unooria/tokens/grids';
import '../../../src/unooria/tokens/grids.css';
import { UnooriaDocShell, UnooriaDocHeader } from '../../../src/unooria/docs';

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
 * Componente visual para documentação e simulação interativa dos Grids da Plataforma Unooria.
 */
const UnooriaGridsDocumentation: React.FC<{
  initialBreakpoint?: GridBreakpointKey;
  showOverlayInitially?: boolean;
}> = ({
  initialBreakpoint = 'notebook',
  showOverlayInitially = true,
}) => {
  const [activeBreakpoint, setActiveBreakpoint] = useState<GridBreakpointKey>(initialBreakpoint);
  const [showOverlay, setShowOverlay] = useState<boolean>(showOverlayInitially);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [customSpan, setCustomSpan] = useState<number>(4);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const currentConfig = gridBreakpoints[activeBreakpoint];
  const breakpointKeys: GridBreakpointKey[] = ['mobile', 'tablet', 'notebook', 'desktop'];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        category="Foundations • Grids & Layout"
        title="Grids & Layout Responsivo"
        description={
          <>
            Sistema de grid responsivo com base em <strong>4, 8 e 12 colunas</strong> projetado para garantir alinhamento, fluidez, proporção e ritmo visual em todas as telas da Plataforma Unooria.
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

      {/* Seção 1: Seletor de Breakpoints e Painel de Métricas */}
      <section style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0', color: '#22272A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '22px', background: '#0066FF', borderRadius: '4px', display: 'inline-block' }} />
              Visualizador de Grid por Dispositivo
            </h2>
            <p style={{ fontSize: '14px', color: '#475157', margin: 0 }}>
              Selecione um breakpoint para inspecionar a estrutura de colunas, margens e gutters do Figma.
            </p>
          </div>

          {/* Toggle de Overlay do Grid */}
          <button
            onClick={() => setShowOverlay(!showOverlay)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: showOverlay ? '#EFF6FF' : '#F4F6F8',
              border: `1px solid ${showOverlay ? '#BFDBFE' : '#D0D5DD'}`,
              borderRadius: '8px',
              color: showOverlay ? '#1D4ED8' : '#344054',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: showOverlay ? '#2563EB' : '#98A2B3'
            }} />
            {showOverlay ? 'Ocultar Overlay de Colunas' : 'Exibir Overlay de Colunas'}
          </button>
        </div>

        {/* Botões de Seleção de Dispositivos / Breakpoints */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {breakpointKeys.map((key) => {
            const config = gridBreakpoints[key];
            const isActive = activeBreakpoint === key;

            return (
              <button
                key={key}
                onClick={() => setActiveBreakpoint(key)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '16px',
                  background: isActive ? '#1E293B' : '#F8FAFC',
                  color: isActive ? '#FFFFFF' : '#334155',
                  border: `2px solid ${isActive ? '#0066FF' : '#E2E8F0'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(0, 102, 255, 0.15)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700 }}>
                    {config.name}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '10px',
                    background: isActive ? 'rgba(255,255,255,0.2)' : '#E2E8F0',
                    color: isActive ? '#FFFFFF' : '#475157'
                  }}>
                    {config.columns} colunas
                  </span>
                </div>

                <div style={{ fontSize: '13px', opacity: 0.85, marginBottom: '6px' }}>
                  Canvas: <strong>{config.canvasWidthPx}px</strong>
                </div>

                <div style={{ fontSize: '11px', opacity: 0.75, fontFamily: 'monospace' }}>
                  min-width: {config.minWidth}
                </div>
              </button>
            );
          })}
        </div>

        {/* Cards de Métricas do Breakpoint Ativo */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px',
          padding: '20px',
          background: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Número de Colunas
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A' }}>
              {currentConfig.columns}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
              Divisão proporcional
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Largura da Coluna
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0066FF' }}>
              {currentConfig.columnWidthPx}px
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
              Referência no Figma
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Gutter / Gap
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#D97706' }}>
              {currentConfig.gutter}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
              Entre colunas
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Margem Lateral
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#059669' }}>
              {currentConfig.margin}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
              Padding externo
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Container Útil Max
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#7C3AED' }}>
              {currentConfig.maxContainerWidth}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
              Área total dos elementos
            </div>
          </div>
        </div>

        {/* Canvas de Simulação Visual das Colunas */}
        <div style={{
          background: '#0F172A',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
          overflowX: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', color: '#94A3B8', fontSize: '12px' }}>
            <span>Simulador de Viewport: <strong>{currentConfig.name} ({currentConfig.canvasWidthPx}px)</strong></span>
            <span>Escala ajustada para o container</span>
          </div>

          {/* Frame do Canvas com Margem e Gutters Reais */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: `${currentConfig.canvasWidthPx}px`,
              margin: '0 auto',
              background: '#1E293B',
              borderRadius: '8px',
              padding: `20px ${currentConfig.margin}`,
              border: '1px solid #334155',
              boxSizing: 'border-box',
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Overlay de Colunas do Figma */}
            {showOverlay && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${currentConfig.columns}, 1fr)`,
                  gap: currentConfig.gutter,
                  width: '100%',
                  height: '160px',
                  position: 'relative',
                }}
              >
                {Array.from({ length: currentConfig.columns }).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255, 0, 0, 0.15)',
                      borderLeft: '1px dashed rgba(255, 0, 0, 0.4)',
                      borderRight: '1px dashed rgba(255, 0, 0, 0.4)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F87171',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    C{index + 1}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Seção 2: Simulador Interativo de Layout com Grid Spans */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0', color: '#22272A', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '22px', background: '#0066FF', borderRadius: '4px', display: 'inline-block' }} />
          Simulador Interativo de Elementos no Grid
        </h2>
        <p style={{ fontSize: '14px', color: '#475157', margin: '0 0 20px 0' }}>
          Teste a distribuição de elementos alterando a ocupação de colunas (col-span) dinamicamente.
        </p>

        {/* Controle do Span */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <label style={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>
              Colunas ocupadas pelo Card 1 (Span 1 a {currentConfig.columns}):
            </label>
            <input
              type="range"
              min="1"
              max={currentConfig.columns}
              value={Math.min(customSpan, currentConfig.columns)}
              onChange={(e) => setCustomSpan(Number(e.target.value))}
              style={{ width: '200px' }}
            />
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0066FF' }}>
              {Math.min(customSpan, currentConfig.columns)} colunas ({`.unooria-col-${Math.min(customSpan, currentConfig.columns)}`})
            </span>
          </div>

          {/* Grid de Exemplo */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${currentConfig.columns}, 1fr)`,
              gap: currentConfig.gutter,
              backgroundColor: '#F8FAFC',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                gridColumn: `span ${Math.min(customSpan, currentConfig.columns)} / span ${Math.min(customSpan, currentConfig.columns)}`,
                backgroundColor: '#1E293B',
                color: '#FFFFFF',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>Card Destaque</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                Ocupa {Math.min(customSpan, currentConfig.columns)} de {currentConfig.columns} colunas
              </div>
            </div>

            <div
              style={{
                gridColumn: `span ${Math.max(1, currentConfig.columns - Math.min(customSpan, currentConfig.columns))} / span ${Math.max(1, currentConfig.columns - Math.min(customSpan, currentConfig.columns))}`,
                backgroundColor: '#0066FF',
                color: '#FFFFFF',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,102,255,0.2)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>Card Complementar</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                Ocupa {Math.max(1, currentConfig.columns - Math.min(customSpan, currentConfig.columns))} colunas
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3: Tabela de Referência de Tokens e Utilitários CSS */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0', color: '#22272A', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '22px', background: '#01B574', borderRadius: '4px', display: 'inline-block' }} />
          Tabela Comparativa de Breakpoints e Variáveis CSS
        </h2>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '14px 16px', color: '#475569' }}>Dispositivo</th>
                <th style={{ padding: '14px 16px', color: '#475569' }}>Breakpoint (min-width)</th>
                <th style={{ padding: '14px 16px', color: '#475569' }}>Colunas</th>
                <th style={{ padding: '14px 16px', color: '#475569' }}>Gutter</th>
                <th style={{ padding: '14px 16px', color: '#475569' }}>Margem</th>
                <th style={{ padding: '14px 16px', color: '#475569' }}>Max Width</th>
                <th style={{ padding: '14px 16px', color: '#475569', textAlign: 'right' }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {breakpointKeys.map((key) => {
                const config = gridBreakpoints[key];
                return (
                  <tr key={key} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>
                      {config.name}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#0066FF', fontWeight: 600 }}>
                      {config.minWidth}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 600 }}>
                      {config.columns}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace' }}>
                      {config.gutter}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace' }}>
                      {config.margin}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontWeight: 600 }}>
                      {config.maxContainerWidth}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <CopyBadge text={`@media (min-width: ${config.minWidth}) { /* ... */ }`} label="Copiar Media Query" />
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

const meta: Meta<typeof UnooriaGridsDocumentation> = {
  title: 'Plataforma Unooria/Fundamentos/Grids',
  component: UnooriaGridsDocumentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Documentação visual e especificação técnica dos Grids e Layouts responsivos da Plataforma Unooria.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UnooriaGridsDocumentation>;

export const VisaoGeral: Story = {};
