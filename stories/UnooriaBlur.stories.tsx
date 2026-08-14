import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { backgroundBlur, BackgroundBlurLevel } from '../src/unooria/tokens/blur';
import '../src/unooria/tokens/blur.css';
import { UnooriaDocShell, UnooriaDocHeader } from '../src/unooria/docs';

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
        title="Background Blur"
        description={
          <>
            Sistema de desfocagem de fundo (<em>backdrop blur</em>) e opacidade para criação de efeitos de profundidade e <strong>Glassmorphism</strong> em componentes e cards da Plataforma Unooria.
          </>
        }
      />

      {/* FEEDBACK DE COPIA */}
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
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 8px 0' }}>
          Playground Interativo de Blur & Fundo
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 24px 0' }}>
          Teste o efeito de desfoque de fundo trocando o nível do token e a imagem/padrão de fundo.
        </p>

        {/* Controles de Teste */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px', backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          
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
                    padding: '8px 14px',
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
              {[
                { id: 'holographic', label: 'Holográfico Figma' },
                { id: 'vibrant', label: 'Gradiente Colorido' },
                { id: 'shapes', label: 'Geométrico' },
                { id: 'photo', label: 'Suave' },
              ].map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setActiveBg(bg.id as any)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
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

          {/* Sliders Customizados */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475157', marginBottom: '4px' }}>
              Ajuste Fino - Blur: {customBlurPx}px
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={customBlurPx}
              onChange={(e) => setCustomBlurPx(Number(e.target.value))}
              style={{ width: '100%', marginBottom: '12px' }}
            />

            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475157', marginBottom: '4px' }}>
              Ajuste Fino - Opacidade: {Math.round(customOpacity * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={customOpacity}
              onChange={(e) => setCustomOpacity(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

        </div>

        {/* Display do Teste em Tempo Real */}
        <div style={{
          height: '320px',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
          background: bgStyles[activeBg],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
        }}>
          {/* Card Glassmorphic de Teste */}
          <div style={{
            maxWidth: '500px',
            width: '100%',
            padding: '32px',
            borderRadius: '20px',
            backgroundColor: `rgba(14, 16, 57, ${customOpacity})`,
            backdropFilter: `blur(${customBlurPx}px)`,
            WebkitBackdropFilter: `blur(${customBlurPx}px)`,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            color: '#FFFFFF',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700 }}>
              Painel de Blur Ativo ({activeLevel})
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: '1.5', opacity: 0.85 }}>
              Este cartão demonstra o efeito de refração fosca aplicado sobre conteúdos com o token ativo de <strong>{customBlurPx}px</strong> e opacidade de <strong>{Math.round(customOpacity * 100)}%</strong>.
            </p>
            <div style={{ display: 'inline-flex', gap: '8px' }}>
              <span style={{ background: '#22272A', color: '#FFFFFF', fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '6px' }}>
                backdrop-filter: blur({customBlurPx}px)
              </span>
              <span style={{ background: '#0086FF', color: '#FFFFFF', fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '6px' }}>
                opacity: {customOpacity}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECAO 3: TABELA COMPLETA DE TOKENS */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 8px 0' }}>
          Tabela de Tokens de Background Blur
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 24px 0' }}>
          Relação de variáveis CSS, tokens TypeScript e valores de desfoque.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475157' }}>Nível</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475157' }}>Desfoque (Blur)</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475157' }}>Opacidade</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475157' }}>Variável CSS</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475157' }}>Objeto TypeScript</th>
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
                      <code style={{ backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', color: '#0F172A', fontSize: '13px' }}>
                        --unooria-blur-{lvl}
                      </code>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <code style={{ backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', color: '#0F172A', fontSize: '13px' }}>
                        backgroundBlur[{lvl}]
                      </code>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleCopy(`backdrop-filter: blur(var(--unooria-blur-${lvl})); opacity: var(--unooria-opacity-blur-${lvl});`)}
                        style={{ backgroundColor: '#F1F5F9', color: '#22272A', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Copiar CSS
                      </button>
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
