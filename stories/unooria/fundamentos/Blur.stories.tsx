import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { backgroundBlur, BackgroundBlurLevel } from '../../../src/unooria/tokens/blur';
import '../../../src/unooria/tokens/blur.css';
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
 * Componente visual para documentação e simulação do Background Blur (Efeitos de Blur de Fundo & Glassmorphism)
 * Plataforma Unooria - Extraído do Figma (Node 6217:97)
 */
const UnooriaBlurDocumentation: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<BackgroundBlurLevel>(500);
  const [copiedText, setCopiedToken] = useState<string | null>(null);
  const [customBlurPx, setCustomBlurPx] = useState<number>(32);
  const [customOpacity, setCustomOpacity] = useState<number>(0.5);
  const [activeBg, setActiveBg] = useState<'holographic' | 'vibrant' | 'shapes' | 'photo'>('holographic');
  const [activeUiPreset, setActiveUiPreset] = useState<'card' | 'modal' | 'navbar'>('card');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Background de Gradiente Holográfico fiel ao Figma
  const figmaHolographicBg = 'linear-gradient(145deg, #090B19 0%, #0E1039 25%, #18284A 55%, #3C5B8B 80%, #7FA5E2 100%)';

  const bgStyles = {
    holographic: figmaHolographicBg,
    vibrant: 'linear-gradient(135deg, #0086FF 0%, #7FA5E2 30%, #01B574 60%, #F83B3B 100%)',
    shapes: 'repeating-linear-gradient(45deg, #0E1039, #0E1039 20px, #0086FF 20px, #0086FF 40px, #7FA5E2 40px, #7FA5E2 60px)',
    photo: 'radial-gradient(circle at 50% 50%, #7FA5E2 0%, #0086FF 50%, #0E1039 100%)',
  };

  const levels: BackgroundBlurLevel[] = [300, 400, 500, 700, 900];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        category="Foundations • Background Blur"
        title="Background Blur & Glassmorphism"
        description={
          <>
            Sistema de desfocagem de fundo (<em>backdrop blur</em>) e opacidade para criação de efeitos de profundidade e <strong>Glassmorphism</strong> em componentes, cartões e modais da Plataforma Unooria.
          </>
        }
      />

      {/* FEEDBACK DE CÓPIA */}
      {copiedText && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#22272A', color: '#FFFFFF', padding: '12px 20px', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', fontSize: '14px', fontWeight: 600, zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>✓</span> Copiado: <code style={{ color: '#7FA5E2', backgroundColor: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>{copiedText}</code>
        </div>
      )}

      {/* SECAO 1: REPRODUCAO PIXEL-PERFECT DO FIGMA (Node 6217:97) */}
      <section style={{ marginBottom: '60px' }}>
        
        {/* Rótulo superior "Holographic Gradients" do Figma */}
        <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 500, marginBottom: '8px', paddingLeft: '4px' }}>
          Holographic Gradients
        </div>

        {/* CONTAINER ESCURO FIGMA #22272A / #1E2328 */}
        <div style={{ backgroundColor: '#22272A', borderRadius: '32px', padding: '64px 48px', color: '#FFFFFF', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
          
          {/* Header Interno Figma */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ fontSize: '18px', color: '#94A3B8', fontWeight: 400, marginBottom: '8px' }}>
              Components
            </div>
            <h3 style={{ fontSize: '48px', fontWeight: 700, margin: 0, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              Background Blur
            </h3>
          </div>

          {/* Cards Grid dos 5 níveis idênticos ao Figma */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'flex-start' }}>
            {levels.map((level) => {
              const token = backgroundBlur[level];
              return (
                <div key={level} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '380px' }}>
                  
                  {/* Card com Fundo Holográfico Azul/Escuro do Figma */}
                  <div style={{
                    width: '380px',
                    height: '380px',
                    borderRadius: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                    background: figmaHolographicBg,
                    boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px'
                  }}>

                    {/* Quadrado Interno com Blur (Idêntico ao Figma, sem textos internos) */}
                    <div style={{
                      width: '220px',
                      height: '220px',
                      borderRadius: '24px',
                      backgroundColor: `rgba(14, 16, 57, ${token.opacity})`,
                      backdropFilter: `blur(${token.blur})`,
                      WebkitBackdropFilter: `blur(${token.blur})`,
                      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleCopy(`backdrop-filter: blur(${token.blur}); opacity: ${token.opacity};`)}
                    title={`Clique para copiar CSS (blur: ${token.blur}, opacity: ${token.opacity})`}
                    />

                  </div>

                  {/* Informações numéricas sob o Card (Idêntico ao Figma) */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', padding: '0 4px' }}>
                    <div style={{ fontSize: '34px', fontWeight: 400, color: '#FFFFFF' }}>
                      {level}
                    </div>
                    <div style={{ fontSize: '20px', color: '#94A3B8', textAlign: 'right', lineHeight: '1.4', whiteSpace: 'pre-line' }}>
                      {`blur ${token.blurPx}\nopacity ${token.opacityPercent}`}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECAO 2: EXPLORADOR INTERATIVO E PLAYGROUND */}
      <section style={{ marginBottom: '60px', backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '22px', background: '#0086FF', borderRadius: '4px', display: 'inline-block' }} />
          Playground Interativo de Blur & Glassmorphism
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 24px 0' }}>
          Teste o efeito de desfoque de fundo em tempo real trocando o nível do token, imagem de fundo e tipo de componente.
        </p>

        {/* Controles de Teste */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px', backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          
          {/* Seletor de Nivel Token */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475157', marginBottom: '8px' }}>
              Nível do Token de Blur:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setActiveLevel(lvl);
                    setCustomBlurPx(backgroundBlur[lvl].blurPx);
                    setCustomOpacity(backgroundBlur[lvl].opacity);
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: activeLevel === lvl ? '#0086FF' : '#CBD5E1',
                    backgroundColor: activeLevel === lvl ? '#0086FF' : '#FFFFFF',
                    color: activeLevel === lvl ? '#FFFFFF' : '#475157',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Seletor de Estilo de Fundo */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475157', marginBottom: '8px' }}>
              Fundo de Teste:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {([
                { id: 'holographic', label: 'Holográfico' },
                { id: 'vibrant', label: 'Vibrante' },
                { id: 'shapes', label: 'Geométrico' },
                { id: 'photo', label: 'Suave' },
              ] as const).map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setActiveBg(bg.id)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: activeBg === bg.id ? '#22272A' : '#CBD5E1',
                    backgroundColor: activeBg === bg.id ? '#22272A' : '#FFFFFF',
                    color: activeBg === bg.id ? '#FFFFFF' : '#475157',
                    cursor: 'pointer'
                  }}
                >
                  {bg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de Componente */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475157', marginBottom: '8px' }}>
              Preset de Interface:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['card', 'modal', 'navbar'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveUiPreset(p)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: activeUiPreset === p ? '#0086FF' : '#CBD5E1',
                    backgroundColor: activeUiPreset === p ? '#EFF6FF' : '#FFFFFF',
                    color: activeUiPreset === p ? '#0086FF' : '#475157',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders Customizados */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475157', marginBottom: '4px' }}>
              Ajuste Fino - Blur: {customBlurPx}px
            </label>
            <input
              type="range"
              min="0"
              max="80"
              value={customBlurPx}
              onChange={(e) => setCustomBlurPx(Number(e.target.value))}
              style={{ width: '100%', marginBottom: '8px' }}
            />

            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475157', marginBottom: '4px' }}>
              Ajuste Fino - Opacidade: {Math.round(customOpacity * 100)}%
            </label>
            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={customOpacity}
              onChange={(e) => setCustomOpacity(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

        </div>

        {/* Display do Teste em Tempo Real */}
        <div style={{
          minHeight: '340px',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
          background: bgStyles[activeBg],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '36px',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
        }}>
          {activeUiPreset === 'card' && (
            <div style={{
              maxWidth: '480px',
              width: '100%',
              padding: '28px',
              borderRadius: '20px',
              backgroundColor: `rgba(14, 16, 57, ${customOpacity})`,
              backdropFilter: `blur(${customBlurPx}px)`,
              WebkitBackdropFilter: `blur(${customBlurPx}px)`,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              color: '#FFFFFF',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: 700 }}>
                Glassmorphic Card ({activeLevel})
              </h3>
              <p style={{ margin: '0 0 16px 0', fontSize: '13px', lineHeight: '1.5', opacity: 0.85 }}>
                Efeito de refração e desfoque aplicado sobre o plano de fundo com token de <strong>{customBlurPx}px</strong>.
              </p>
              <div style={{ display: 'inline-flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <CopyBadge text={`backdrop-filter: blur(${customBlurPx}px);`} label={`blur: ${customBlurPx}px`} />
                <CopyBadge text={`opacity: ${customOpacity};`} label={`opacity: ${Math.round(customOpacity * 100)}%`} />
              </div>
            </div>
          )}

          {activeUiPreset === 'modal' && (
            <div style={{
              maxWidth: '420px',
              width: '100%',
              padding: '32px',
              borderRadius: '24px',
              backgroundColor: `rgba(14, 16, 57, ${customOpacity})`,
              backdropFilter: `blur(${customBlurPx}px)`,
              WebkitBackdropFilter: `blur(${customBlurPx}px)`,
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
              color: '#FFFFFF',
            }}>
              <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Modal Glassmorphism</div>
              <p style={{ fontSize: '13px', opacity: 0.85, margin: '0 0 20px 0', lineHeight: '1.5' }}>
                Modais translúcidos garantem foco no conteúdo mantendo o contexto da tela subjacente.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ flex: 1, padding: '10px', borderRadius: '8px', background: '#0086FF', color: '#FFF', border: 'none', fontWeight: 600, fontSize: '12px' }}>
                  Confirmar
                </button>
                <button style={{ padding: '10px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: '#FFF', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600, fontSize: '12px' }}>
                  Fechar
                </button>
              </div>
            </div>
          )}

          {activeUiPreset === 'navbar' && (
            <div style={{
              maxWidth: '600px',
              width: '100%',
              padding: '16px 24px',
              borderRadius: '50px',
              backgroundColor: `rgba(14, 16, 57, ${customOpacity})`,
              backdropFilter: `blur(${customBlurPx}px)`,
              WebkitBackdropFilter: `blur(${customBlurPx}px)`,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 12px 36px rgba(0,0,0,0.25)',
              color: '#FFFFFF',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#7FA5E2' }}>Unooria GlassNav</div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', fontWeight: 500 }}>
                <span>Início</span>
                <span>Produtos</span>
                <span>Tokens</span>
              </div>
              <button style={{ padding: '6px 14px', borderRadius: '20px', background: '#0086FF', color: '#FFF', border: 'none', fontSize: '12px', fontWeight: 600 }}>
                Entrar
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECAO 3: TABELA COMPLETA DE TOKENS E CLASSES UTILITÁRIAS */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '22px', background: '#01B574', borderRadius: '4px', display: 'inline-block' }} />
          Tabela de Tokens e Classes Utilitárias de Blur
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 24px 0' }}>
          Relação completa de variáveis CSS `:root`, classes utilitárias e tokens TypeScript.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475157' }}>Nível</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475157' }}>Desfoque (Blur)</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475157' }}>Opacidade</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475157' }}>Variável CSS Blur</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475157' }}>Variável CSS Opacity</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475157' }}>Classe Utilitária</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475157', textAlign: 'right' }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {levels.map((lvl) => {
                const token = backgroundBlur[lvl];
                return (
                  <tr key={lvl} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#22272A' }}>
                      <span style={{ background: '#22272A', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px', fontSize: '12px' }}>
                        {lvl}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0086FF' }}>
                      {token.blur} ({token.blurPx}px)
                    </td>
                    <td style={{ padding: '14px 16px', color: '#475157' }}>
                      {token.opacityPercent} ({token.opacity})
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <code style={{ backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', color: '#0F172A', fontSize: '12px' }}>
                        --unooria-blur-{lvl}
                      </code>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <code style={{ backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', color: '#0F172A', fontSize: '12px' }}>
                        --unooria-opacity-blur-{lvl}
                      </code>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <code style={{ backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', color: '#0F172A', fontSize: '12px' }}>
                        .unooria-blur-{lvl}
                      </code>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <CopyBadge text={`backdrop-filter: blur(var(--unooria-blur-${lvl})); opacity: var(--unooria-opacity-blur-${lvl});`} label="Copiar CSS" />
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

const meta: Meta<typeof UnooriaBlurDocumentation> = {
  title: 'Plataforma Unooria/Fundamentos/Background Blur',
  component: UnooriaBlurDocumentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Documentação visual e especificação interativa dos tokens de Background Blur e Glassmorphism da Plataforma Unooria.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UnooriaBlurDocumentation>;

export const VisaoGeral: Story = {};
