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
} from '../src/unooria/tokens/grids';
import '../src/unooria/tokens/grids.css';

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
    <div style={{ fontFamily: 'Open Sans, system-ui, -apple-system, sans-serif', color: '#22272A', maxWidth: '1200px', margin: '0 auto', padding: '32px 24px', backgroundColor: '#FFFFFF' }}>
      
      {/* Cabecalho Principal */}
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #E4E8E9', paddingBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span style={{ background: '#22272A', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '16px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Plataforma Unooria
          </span>
          <span style={{ background: '#E4E8E9', color: '#475157', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '12px' }}>
            Layout & Tokens
          </span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 700, margin: '0 0 12px 0', color: '#22272A', letterSpacing: '-0.5px' }}>
          Tokens de Grids & Layout
        </h1>

        <p style={{ fontSize: '16px', color: '#475157', margin: 0, lineHeight: '1.6', maxWidth: '850px' }}>
          Sistema de grid responsivo com base em <strong>4, 8 e 12 colunas</strong> projetado para garantir alinhamento, fluidez, proporção e ritmo visual em todas as telas da Plataforma Unooria.
        </p>
      </header>

      {/* Seção 1: Seletor de Breakpoints e Painel de Métricas */}
      <section style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0', color: '#22272A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '22px', background: '#0066FF', borderRadius: '4px', display: 'inline-block' }}></span>
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
                    color: isActive ? '#FFFFFF' : '#475569'
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
            {/* Indicador visual de Margem Lateral Direita/Esquerda */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: currentConfig.margin,
              background: 'rgba(5, 150, 105, 0.15)',
              borderRight: '1px dashed #059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              writingMode: 'vertical-rl',
              color: '#34D399',
              fontSize: '10px',
              fontWeight: 600,
              pointerEvents: 'none'
            }}>
              Margin {currentConfig.margin}
            </div>

            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: currentConfig.margin,
              background: 'rgba(5, 150, 105, 0.15)',
              borderLeft: '1px dashed #059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              writingMode: 'vertical-rl',
              color: '#34D399',
              fontSize: '10px',
              fontWeight: 600,
              pointerEvents: 'none'
            }}>
              Margin {currentConfig.margin}
            </div>

            {/* Grid com Colunas Reais do Figma */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${currentConfig.columns}, minmax(0, 1fr))`,
                gap: currentConfig.gutter,
                position: 'relative',
                width: '100%',
                zIndex: 2,
              }}
            >
              {Array.from({ length: currentConfig.columns }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    height: '140px',
                    background: showOverlay ? 'rgba(239, 68, 68, 0.18)' : '#334155',
                    border: `1px solid ${showOverlay ? 'rgba(239, 68, 68, 0.5)' : '#475569'}`,
                    borderRadius: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: showOverlay ? '#FCA5A5' : '#F1F5F9',
                    fontSize: '12px',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span>Col {index + 1}</span>
                  <span style={{ fontSize: '10px', fontWeight: 400, opacity: 0.8, marginTop: '4px' }}>
                    {currentConfig.columnWidthPx}px
                  </span>
                </div>
              ))}
            </div>

            {/* Marcador de Gutter (Gap) centralizado */}
            <div style={{
              marginTop: '12px',
              textAlign: 'center',
              color: '#F59E0B',
              fontSize: '11px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <span style={{ height: '1px', background: '#F59E0B', flex: 1 }}></span>
              <span>Gutter / Gap entre colunas = {currentConfig.gutter}</span>
              <span style={{ height: '1px', background: '#F59E0B', flex: 1 }}></span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2: Playground de Ocupação de Colunas (Grid Spans) */}
      <section style={{ marginBottom: '48px', padding: '28px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0', color: '#0F172A' }}>
              Playground de Layout & Spans
            </h2>
            <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>
              Simule a distribuição de componentes utilizando as classes do CSS Grid da Plataforma Unooria.
            </p>
          </div>

          {/* Controle de Span de Colunas */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
              Span das Colunas do Exemplo:
            </label>
            <select
              value={customSpan}
              onChange={(e) => setCustomSpan(Number(e.target.value))}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                fontWeight: 600,
                background: '#FFFFFF',
                color: '#0F172A',
                cursor: 'pointer'
              }}
            >
              {[1, 2, 3, 4, 6, 8, 12].map((span) => (
                <option key={span} value={span} disabled={span > currentConfig.columns}>
                  {span} {span === 1 ? 'coluna' : 'colunas'} (unooria-col-{span})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Exemplo Interativo de Componentes no Grid */}
        <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${currentConfig.columns}, minmax(0, 1fr))`,
              gap: currentConfig.gutter,
            }}
          >
            {Array.from({ length: Math.ceil(currentConfig.columns / Math.min(customSpan, currentConfig.columns)) }).map((_, i) => (
              <div
                key={i}
                style={{
                  gridColumn: `span ${Math.min(customSpan, currentConfig.columns)} / span ${Math.min(customSpan, currentConfig.columns)}`,
                  background: '#EFF6FF',
                  border: '1px solid #93C5FD',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1D4ED8', marginBottom: '4px' }}>
                  Card {i + 1}
                </div>
                <div style={{ fontSize: '11px', color: '#3B82F6', fontFamily: 'monospace' }}>
                  .unooria-col-{Math.min(customSpan, currentConfig.columns)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 3: Tabela de Especificação Completa dos Tokens */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '22px', background: '#059669', borderRadius: '4px', display: 'inline-block' }}></span>
          Tabela Completa de Breakpoints & Tokens de Grid
        </h2>

        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#475569' }}>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Dispositivo</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Breakpoint (min-width)</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Canvas Ref.</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Colunas</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Largura da Coluna</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Gutter / Gap</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Margem (Corners)</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Container Max</th>
              </tr>
            </thead>
            <tbody>
              {breakpointKeys.map((key, index) => {
                const item = gridBreakpoints[key];
                const isSelected = activeBreakpoint === key;

                return (
                  <tr
                    key={key}
                    style={{
                      borderBottom: index < breakpointKeys.length - 1 ? '1px solid #E2E8F0' : 'none',
                      background: isSelected ? '#F0F9FF' : index % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{item.name}</span>
                        {isSelected && (
                          <span style={{ fontSize: '10px', background: '#0284C7', color: '#FFFFFF', padding: '2px 6px', borderRadius: '8px' }}>
                            Ativo
                          </span>
                        )}
                      </div>
                    </td>

                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#2563EB', fontWeight: 600 }}>
                      <button
                        onClick={() => handleCopy(`--unooria-breakpoint-${key}`)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', color: 'inherit', fontFamily: 'inherit' }}
                        title="Clique para copiar a variável CSS do breakpoint"
                      >
                        {item.minWidth}
                        <div style={{ fontSize: '10px', color: '#64748B' }}>
                          {copiedToken === `--unooria-breakpoint-${key}` ? 'Copiado!' : `--unooria-breakpoint-${key}`}
                        </div>
                      </button>
                    </td>

                    <td style={{ padding: '14px 16px', color: '#334155' }}>
                      {item.canvasWidthPx}px
                    </td>

                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>
                      {item.columns}
                    </td>

                    <td style={{ padding: '14px 16px', color: '#0284C7', fontWeight: 600 }}>
                      {item.columnWidthPx}px
                    </td>

                    <td style={{ padding: '14px 16px', color: '#D97706', fontWeight: 600 }}>
                      {item.gutter}
                    </td>

                    <td style={{ padding: '14px 16px', color: '#059669', fontWeight: 600 }}>
                      {item.margin}
                    </td>

                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#7C3AED' }}>
                      {item.maxContainerWidth}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

    </div>
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
          'Documentação e especificações técnicas do sistema de Grids e Breakpoints da Plataforma Unooria extraídos diretamente do Figma. Inclui número de colunas, gutters, margens, largura do container e simulador de layout.',
      },
    },
  },
  argTypes: {
    initialBreakpoint: {
      control: 'select',
      options: ['mobile', 'tablet', 'notebook', 'desktop'],
      description: 'Breakpoint inicial selecionado na documentação',
    },
    showOverlayInitially: {
      control: 'boolean',
      description: 'Define se o overlay de colunas começa visível',
    },
  },
};

export default meta;

type Story = StoryObj<typeof UnooriaGridsDocumentation>;

export const Default: Story = {
  args: {
    initialBreakpoint: 'notebook',
    showOverlayInitially: true,
  },
};

export const MobileGrid: Story = {
  args: {
    initialBreakpoint: 'mobile',
    showOverlayInitially: true,
  },
};

export const TabletGrid: Story = {
  args: {
    initialBreakpoint: 'tablet',
    showOverlayInitially: true,
  },
};

export const DesktopGrid: Story = {
  args: {
    initialBreakpoint: 'desktop',
    showOverlayInitially: true,
  },
};
