import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  gridWidgetsBreakpoints,
  GridWidgetKey,
  GridWidgetSpec,
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
 * Componente visual para documentação e simulação interativa de Grids Widgets da Plataforma Unooria.
 * Extraído das especificações oficiais do Figma (node 17777:3282).
 */
const UnooriaGridsWidgetsDocumentation: React.FC<{
  initialBreakpoint?: GridWidgetKey;
  showOverlayInitially?: boolean;
}> = ({
  initialBreakpoint = 'notebook',
  showOverlayInitially = true,
}) => {
  const [activeKey, setActiveKey] = useState<GridWidgetKey>(initialBreakpoint);
  const [showOverlay, setShowOverlay] = useState<boolean>(showOverlayInitially);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const currentSpec: GridWidgetSpec = gridWidgetsBreakpoints[activeKey];
  const keys: GridWidgetKey[] = [
    'mobile360',
    'mobile375',
    'tabletPortrait',
    'tabletLandscape',
    'notebook',
    'desktop',
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        category="Foundations • Grids Widgets"
        title="Grids Widgets & Proporções Flexíveis"
        description={
          <>
            Diretrizes de layout e distribuição de <strong>widgets flexíveis</strong> em relação ao container e à viewport da Plataforma Unooria. Garante alinhamento, fluidez proporcional e legibilidade em todas as resoluções (Mobile, Tablet, Notebook e Desktop).
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

      {/* Controle de Dispositivos / Breakpoints */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0', color: '#22272A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '22px', background: '#0066FF', borderRadius: '4px', display: 'inline-block' }} />
              Seletor de Dispositivo & Viewport de Widgets
            </h2>
            <p style={{ fontSize: '14px', color: '#475157', margin: 0 }}>
              Escolha uma resolução de tela para visualizar a distribuição dos widgets e seus percentuais flexíveis no Figma.
            </p>
          </div>

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
            {showOverlay ? 'Ocultar Margens & Guias' : 'Exibir Margens & Guias'}
          </button>
        </div>

        {/* Grade de Botões de Dispositivos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {keys.map((key) => {
            const spec = gridWidgetsBreakpoints[key];
            const isActive = activeKey === key;

            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '14px 16px',
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
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700 }}>
                    {spec.name}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: '8px',
                    background: isActive ? 'rgba(255,255,255,0.2)' : '#E2E8F0',
                    color: isActive ? '#FFFFFF' : '#475157'
                  }}>
                    {spec.canvasWidthPx}px
                  </span>
                </div>
                <div style={{ fontSize: '12px', opacity: 0.85 }}>
                  {spec.widgets.length} {spec.widgets.length === 1 ? 'widget' : 'widgets'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Cards de Métricas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '16px',
          padding: '20px',
          background: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Canvas Ref.
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A' }}>
              {currentSpec.canvasWidthPx}px
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
              Largura total da tela
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Margem Lateral
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#059669' }}>
              {currentSpec.margin}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
              Padding nas bordas
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Gutter / Gap
            </div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#D97706' }}>
              {currentSpec.gutter}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
              Espaçamento entre widgets
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Proporções Flexíveis
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0066FF' }}>
              {currentSpec.widgets.map(w => w.flexiblePercentage).join(' / ')}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
              Percentual no Figma
            </div>
          </div>
        </div>

        {/* Simulador de Canvas dos Widgets */}
        <div style={{
          background: '#22272A',
          borderRadius: '16px',
          padding: '32px 24px',
          boxShadow: '0 12px 28px -4px rgba(0, 0, 0, 0.25)',
          overflowX: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', color: '#CBD4D6', fontSize: '13px' }}>
            <span>Dispositivo selecionado: <strong style={{ color: '#FFFFFF' }}>{currentSpec.name} ({currentSpec.canvasWidthPx}px)</strong></span>
            <span>Escala ajustada para o container</span>
          </div>

          {/* Frame do Canvas da Tela */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: `${currentSpec.canvasWidthPx}px`,
            margin: '0 auto',
            background: '#3D4448',
            borderRadius: '12px',
            padding: `32px ${currentSpec.margin}`,
            border: '1px solid #4D565B',
            boxSizing: 'border-box',
            minHeight: '260px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>

            {/* Marcadores de Margem Lateral Externa */}
            {showOverlay && (
              <>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: currentSpec.margin,
                  background: 'rgba(5, 150, 105, 0.2)',
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
                  {currentSpec.margin}
                </div>

                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: currentSpec.margin,
                  background: 'rgba(5, 150, 105, 0.2)',
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
                  {currentSpec.margin}
                </div>
              </>
            )}

            {/* Layout dos Widgets dentro do Container */}
            <div style={{
              display: 'flex',
              gap: currentSpec.gutter,
              width: '100%',
              alignItems: 'stretch',
              justifyContent: 'center',
              flexWrap: 'nowrap'
            }}>
              {currentSpec.widgets.map((widget, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCopy(`width: ${widget.flexiblePercentage}; /* ${widget.widthPx}px */`)}
                  style={{
                    flex: `0 0 ${widget.percentageValue}%`,
                    maxWidth: `${widget.percentageValue}%`,
                    backgroundColor: '#22272A',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    padding: '24px 16px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    minHeight: '180px',
                    boxSizing: 'border-box',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#0066FF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                  title={`Clique para copiar CSS (${widget.flexiblePercentage})`}
                >
                  <div style={{ width: '100%' }}>
                    <div style={{ fontSize: '11px', color: '#7FA5E2', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                      {widget.columnsSpan} {widget.columnsSpan === 1 ? 'coluna' : 'colunas'}
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                      {widget.label}
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: 'rgba(0, 102, 255, 0.15)',
                    border: '1px solid rgba(0, 102, 255, 0.3)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    width: '90%',
                    boxSizing: 'border-box',
                    margin: '12px 0'
                  }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#60A5FA' }}>
                      {widget.flexiblePercentage}
                    </div>
                    <div style={{ fontSize: '11px', color: '#CBD4D6' }}>
                      {widget.widthPx}px de referência
                    </div>
                  </div>

                  <div style={{ fontSize: '10px', color: '#94A3B8' }}>
                    Clique para copiar CSS
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Seção 2: Tabela de Especificações Completas */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0', color: '#22272A', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '22px', background: '#01B574', borderRadius: '4px', display: 'inline-block' }} />
          Tabela Completa de Grids Widgets do Figma
        </h2>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '14px 16px', color: '#475569' }}>Dispositivo</th>
                <th style={{ padding: '14px 16px', color: '#475569' }}>Canvas Ref.</th>
                <th style={{ padding: '14px 16px', color: '#475569' }}>Margem</th>
                <th style={{ padding: '14px 16px', color: '#475569' }}>Gutter</th>
                <th style={{ padding: '14px 16px', color: '#475569' }}>Widgets & Proporções</th>
                <th style={{ padding: '14px 16px', color: '#475569', textAlign: 'right' }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key) => {
                const spec = gridWidgetsBreakpoints[key];
                return (
                  <tr key={key} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>
                      {spec.name}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontWeight: 600 }}>
                      {spec.canvasWidthPx}px
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace' }}>
                      {spec.margin}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'monospace' }}>
                      {spec.gutter}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {spec.widgets.map((w, idx) => (
                          <span key={idx} style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                            {w.label}: {w.flexiblePercentage} ({w.widthPx}px)
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <CopyBadge
                        text={spec.widgets.map(w => `${w.label}: ${w.flexiblePercentage}`).join('; ')}
                        label="Copiar Proporções"
                      />
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

const meta: Meta<typeof UnooriaGridsWidgetsDocumentation> = {
  title: 'Plataforma Unooria/Fundamentos/Grids Widgets',
  component: UnooriaGridsWidgetsDocumentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Documentação visual e especificação técnica dos Grids Widgets e Proporções Flexíveis da Plataforma Unooria.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UnooriaGridsWidgetsDocumentation>;

export const VisaoGeral: Story = {};
