import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  gridWidgetsBreakpoints,
  GridWidgetKey,
  GridWidgetSpec,
} from '../src/unooria/tokens/grids';
import '../src/unooria/tokens/grids.css';

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
    <div style={{
      fontFamily: 'Open Sans, system-ui, -apple-system, sans-serif',
      color: '#22272A',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '32px 24px',
      backgroundColor: '#FFFFFF'
    }}>
      
      {/* Cabeçalho Principal com Identidade Visual Unooria */}
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #E4E8E9', paddingBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span style={{
            background: '#22272A',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: '16px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            Plataforma Unooria
          </span>
          <span style={{
            background: '#E4E8E9',
            color: '#475157',
            fontSize: '11px',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '12px'
          }}>
            Foundations &bull; Grids Widgets
          </span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 700, margin: '0 0 12px 0', color: '#22272A', letterSpacing: '-0.5px' }}>
          Grids Widgets
        </h1>

        <p style={{ fontSize: '16px', color: '#475157', margin: 0, lineHeight: '1.6', maxWidth: '850px' }}>
          Diretrizes de layout e distribuição de <strong>widgets flexíveis</strong> em relação ao container e à viewport da Plataforma Unooria.
          Garante alinhamento, fluidez proporcional e legibilidade em todas as resoluções (Mobile, Tablet, Notebook e Desktop).
        </p>
      </header>

      {/* Controle de Dispositivos / Breakpoints */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0', color: '#22272A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '22px', background: '#0066FF', borderRadius: '4px', display: 'inline-block' }}></span>
              Seletor de Dispositivo & Viewport
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
                    color: isActive ? '#FFFFFF' : '#475569'
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
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0066FF' }}>
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

            {/* Container dos Widgets Flexíveis */}
            <div style={{
              display: 'flex',
              width: '100%',
              gap: currentSpec.gutter,
              alignItems: 'stretch',
              justifyContent: 'center'
            }}>
              {currentSpec.widgets.map((widget, index) => (
                <div
                  key={index}
                  style={{
                    flex: `0 0 ${widget.percentageValue}%`,
                    width: `${widget.percentageValue}%`,
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    borderRadius: '8px',
                    padding: '24px 12px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '140px',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>
                    Flexible
                  </div>

                  <div style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#60A5FA',
                    marginBottom: '8px'
                  }}>
                    {widget.flexiblePercentage}
                  </div>

                  <div style={{
                    fontSize: '11px',
                    background: 'rgba(0, 0, 0, 0.25)',
                    padding: '3px 8px',
                    borderRadius: '10px',
                    color: '#CBD4D6'
                  }}>
                    Ref: {widget.widthPx}px
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabela Especificação Completa */}
      <section>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#22272A', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '22px', background: '#059669', borderRadius: '4px', display: 'inline-block' }}></span>
          Tabela Técnica de Grids Widgets (Figma Node 17777:3282)
        </h2>

        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#475569' }}>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Breakpoint / Telas</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Canvas Ref.</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Margem Externa</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Gutter / Gap</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Widgets No Layout</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Proporção Flexível (%)</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Token / Ação</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key, index) => {
                const spec = gridWidgetsBreakpoints[key];
                const isSelected = activeKey === key;

                return (
                  <tr
                    key={key}
                    style={{
                      borderBottom: index < keys.length - 1 ? '1px solid #E2E8F0' : 'none',
                      background: isSelected ? '#F0F9FF' : index % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{spec.name}</span>
                        {isSelected && (
                          <span style={{ fontSize: '10px', background: '#0284C7', color: '#FFFFFF', padding: '2px 6px', borderRadius: '8px' }}>
                            Ativo
                          </span>
                        )}
                      </div>
                    </td>

                    <td style={{ padding: '14px 16px', color: '#334155' }}>
                      {spec.canvasWidthPx}px
                    </td>

                    <td style={{ padding: '14px 16px', color: '#059669', fontWeight: 600 }}>
                      {spec.margin}
                    </td>

                    <td style={{ padding: '14px 16px', color: '#D97706', fontWeight: 600 }}>
                      {spec.gutter}
                    </td>

                    <td style={{ padding: '14px 16px', color: '#334155' }}>
                      {spec.widgets.map(w => `${w.label} (${w.widthPx}px)`).join(', ')}
                    </td>

                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#2563EB' }}>
                      {spec.widgets.map(w => w.flexiblePercentage).join(' / ')}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => handleCopy(`--unooria-widget-grid-${key}`)}
                        style={{
                          background: '#EFF6FF',
                          border: '1px solid #BFDBFE',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          color: '#1D4ED8',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {copiedToken === `--unooria-widget-grid-${key}` ? 'Copiado!' : 'Copiar Token'}
                      </button>
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

const meta: Meta<typeof UnooriaGridsWidgetsDocumentation> = {
  title: 'Plataforma Unooria/Fundamentos/Grids Widgets',
  component: UnooriaGridsWidgetsDocumentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Documentação e especificações técnicas de Grids Widgets para a Plataforma Unooria extraídas do Figma. Inclui canvas de referência, percentuais flexíveis por viewport, gutters e simulador interativo.',
      },
    },
  },
  argTypes: {
    initialBreakpoint: {
      control: 'select',
      options: [
        'mobile360',
        'mobile375',
        'tabletPortrait',
        'tabletLandscape',
        'notebook',
        'desktop',
      ],
      description: 'Breakpoint inicial selecionado',
    },
    showOverlayInitially: {
      control: 'boolean',
      description: 'Define se as margens e guias aparecem visíveis inicialmente',
    },
  },
};

export default meta;

type Story = StoryObj<typeof UnooriaGridsWidgetsDocumentation>;

export const Default: Story = {
  args: {
    initialBreakpoint: 'notebook',
    showOverlayInitially: true,
  },
};

export const Mobile360: Story = {
  args: {
    initialBreakpoint: 'mobile360',
    showOverlayInitially: true,
  },
};

export const Mobile375: Story = {
  args: {
    initialBreakpoint: 'mobile375',
    showOverlayInitially: true,
  },
};

export const TabletPortrait: Story = {
  args: {
    initialBreakpoint: 'tabletPortrait',
    showOverlayInitially: true,
  },
};

export const TabletLandscape: Story = {
  args: {
    initialBreakpoint: 'tabletLandscape',
    showOverlayInitially: true,
  },
};

export const Notebook: Story = {
  args: {
    initialBreakpoint: 'notebook',
    showOverlayInitially: true,
  },
};

export const Desktop: Story = {
  args: {
    initialBreakpoint: 'desktop',
    showOverlayInitially: true,
  },
};
