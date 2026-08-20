import React, { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  unooriaIconSizes,
  unooriaIconSizesRem,
  unooriaIconStrokeWeights,
  unooriaTechAreasIcons,
  unooriaInitiativesIcons,
  unooriaIconCategories,
  UnooriaIconSizeKey,
  UnooriaIconStrokeWeightKey,
  UnooriaIconCategoryKey,
} from '../../../src/unooria/tokens/icons';
import '../../../src/unooria/tokens/icons.css';
import { Icon } from '../../../src/unooria/components/Icon/Icon';
import type { UnooriaIconWeight } from '../../../src/unooria/components/Icon/Icon.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

// Componente para notificação ao copiar
const CopyBadge: React.FC<{ text: string; label?: string; copiedLabel?: string }> = ({
  text,
  label,
  copiedLabel,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
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
        padding: '3px 8px',
        fontSize: '11px',
        fontFamily: 'monospace',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontWeight: 500,
      }}
    >
      {copied ? `✓ ${copiedLabel || 'Copiado!'}` : label || text}
    </button>
  );
};

/**
 * Componente principal da Documentação de Ícones da Plataforma Unooria (Figma Node: 6024:2923)
 */
const UnooriaIconsDocumentation: React.FC = () => {
  const [copiedFeedback, setCopiedFeedback] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [interactiveSize, setInteractiveSize] = useState<UnooriaIconSizeKey>('S');
  const [interactiveWeight, setInteractiveWeight] = useState<UnooriaIconWeight>(300);
  const [interactiveFill, setInteractiveFill] = useState<boolean>(false);
  const [interactiveColor, setInteractiveColor] = useState<string>('#22272A');
  const [selectedTechAreaSearch, setSelectedTechAreaSearch] = useState<string>('');
  const [selectedInitiativeSearch, setSelectedInitiativeSearch] = useState<string>('');

  const handleCopyToast = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFeedback(`${description}: ${text}`);
    setTimeout(() => setCopiedFeedback(null), 2500);
  };

  // Coleta todas as categorias e ícones
  const allCategoryEntries = useMemo(() => {
    return Object.entries(unooriaIconCategories) as [UnooriaIconCategoryKey, { count: number; icons: readonly string[] }][];
  }, []);

  const totalIconsCount = useMemo(() => {
    return allCategoryEntries.reduce((acc, [, data]) => acc + data.icons.length, 0);
  }, [allCategoryEntries]);

  // Filtra ícones com base na categoria e busca
  const filteredCatalog = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return allCategoryEntries
      .map(([catName, catData]) => {
        if (activeCategory !== 'all' && activeCategory !== catName) {
          return null;
        }

        const matchedIcons = catData.icons.filter((iconName) =>
          term === '' ? true : iconName.toLowerCase().includes(term) || catName.toLowerCase().includes(term)
        );

        if (matchedIcons.length === 0) return null;

        return {
          category: catName,
          total: catData.count,
          icons: matchedIcons,
        };
      })
      .filter(Boolean) as { category: string; total: number; icons: string[] }[];
  }, [allCategoryEntries, activeCategory, searchTerm]);

  const sizeKeys: UnooriaIconSizeKey[] = ['4XS', '3XS', 'XXS', 'XS', 'S', 'M', 'L', 'XL'];
  const strokeKeys: UnooriaIconStrokeWeightKey[] = ['thin', 'regular', 'medium', 'bold'];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Foundations • Ícones"
        title="Ícones"
        description="Sistema oficial de ícones da Plataforma Unooria baseado no Google Material Symbols Rounded (Weight 300, Fill 0, Grade 0, Optical Size 24px) com escala tipográfica de 8 tamanhos, espessuras de traço, mapeamento para Áreas Tecnológicas e marcas customizadas de Iniciativas SENAI."
      />

      {/* FEEDBACK DE CÓPIA GLOBAL */}
      {copiedFeedback && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#22272A',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            fontSize: '14px',
            fontWeight: 600,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.2s ease-in-out',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <span style={{ color: '#01B574' }}>✓</span>
          <span>{copiedFeedback}</span>
        </div>
      )}

      {/* =========================================================================
          SEÇÃO 1: REPRODUÇÃO FIEL DO FIGMA (Node 6024:2923)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 6024:2923)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design exato conforme especificado na prancha do Figma para o acervo de ícones do Design System.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=6024-2923&m=dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#F1F5F9',
              color: '#0086FF',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid #E2E8F0',
            }}
          >
            <span>Abrir no Figma (Dev Mode)</span>
            <span>↗</span>
          </a>
        </div>

        {/* CONTAINER ESCURO FIGMA #22272A */}
        <div
          style={{
            backgroundColor: '#22272A',
            borderRadius: '32px',
            padding: '56px 48px',
            color: '#FFFFFF',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Header do Frame Figma */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '32px' }}>
            <span style={{ fontSize: '16px', color: '#CBD4D6', fontWeight: 400, letterSpacing: '0.5px' }}>
              Components
            </span>
            <h1 style={{ fontSize: '44px', fontWeight: 700, color: '#FFFFFF', margin: 0, letterSpacing: '-0.5px' }}>
              Ícones
            </h1>
            <span style={{ fontSize: '20px', color: '#7FA5E2', fontWeight: 500, marginTop: '4px' }}>
              Material Symbols and Icons
            </span>
          </div>

          {/* Bloco Conceitual do Figma */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              lineHeight: 1.6,
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
              O que são os Ícones do Design System?
            </h3>
            <p style={{ fontSize: '15px', color: '#CBD4D6', margin: 0 }}>
              Os ícones são elementos visuais que representam ações, funções ou informações de forma simples e intuitiva.
              Eles ajudam a melhorar a usabilidade de uma interface, permitindo que os usuários reconheçam rapidamente
              comandos e naveguem com mais facilidade. Ícones bem projetados devem ser claros, universais e consistentes
              com o estilo visual da interface, evitando ambiguidades.
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '15px', color: '#CBD4D6', margin: 0 }}>
                Estamos utilizando a biblioteca oficial de ícones do Google com as seguintes configurações padronizadas:
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                  marginTop: '4px',
                }}
              >
                <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '12px', color: '#7FA5E2', textTransform: 'uppercase', fontWeight: 600 }}>Style</div>
                  <div style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: 700, marginTop: '2px' }}>Rounded</div>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '12px', color: '#7FA5E2', textTransform: 'uppercase', fontWeight: 600 }}>Weight</div>
                  <div style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: 700, marginTop: '2px' }}>300 (Light)</div>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '12px', color: '#7FA5E2', textTransform: 'uppercase', fontWeight: 600 }}>Fill</div>
                  <div style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: 700, marginTop: '2px' }}>Off (0)</div>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '12px', color: '#7FA5E2', textTransform: 'uppercase', fontWeight: 600 }}>Grade</div>
                  <div style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: 700, marginTop: '2px' }}>Normal (0)</div>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '12px', color: '#7FA5E2', textTransform: 'uppercase', fontWeight: 600 }}>Optical Size</div>
                  <div style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: 700, marginTop: '2px' }}>24px (Master)</div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
              <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0, fontStyle: 'italic' }}>
                <strong>Exemplo visual:</strong> Os ícones devem seguir um padrão de tamanho e espaçamento, garantindo
                alinhamento e harmonia no design. Quando interativos, podem ter estados visuais diferentes, como mudanças de
                cor ou sombreamento ao passar o cursor, indicando que são clicáveis.
              </p>
            </div>
          </div>

          {/* Destaque das Estatísticas do Frame */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
            }}
          >
            <div style={{ backgroundColor: '#181C1E', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#7FA5E2' }}>{totalIconsCount}</div>
              <div style={{ fontSize: '14px', color: '#CBD4D6', fontWeight: 600, marginTop: '4px' }}>Ícones Catalogados</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>15 Categorias do Material Symbols</div>
            </div>
            <div style={{ backgroundColor: '#181C1E', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#01B574' }}>23</div>
              <div style={{ fontSize: '14px', color: '#CBD4D6', fontWeight: 600, marginTop: '4px' }}>Áreas Tecnológicas</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Mapeamentos oficiais SENAI</div>
            </div>
            <div style={{ backgroundColor: '#181C1E', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#0086FF' }}>18</div>
              <div style={{ fontSize: '14px', color: '#CBD4D6', fontWeight: 600, marginTop: '4px' }}>Iniciativas SENAI</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Inclui 5 marcas vetoriais exclusivas</div>
            </div>
            <div style={{ backgroundColor: '#181C1E', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#F83B3B' }}>8</div>
              <div style={{ fontSize: '14px', color: '#CBD4D6', fontWeight: 600, marginTop: '4px' }}>Tamanhos Padronizados</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>De 12px (4XS) a 48px (XL)</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: ESCALA DE TAMANHOS (TOKENS DE DIMENSÃO)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Escala de Tamanhos (Icon Size Tokens)"
          description="Escala proporcional de 8 tamanhos de ícones para compor desde indicadores compactos em inputs até grandes ilustrações em modais e banners."
        />

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            marginBottom: '24px',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 600, color: '#334155' }}>Token</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, color: '#334155' }}>Pixels</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, color: '#334155' }}>REM</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, color: '#334155' }}>Variável CSS</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, color: '#334155', textAlign: 'center' }}>Preview Visual</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, color: '#334155' }}>Aplicação Típica</th>
                  <th style={{ padding: '16px 20px', fontWeight: 600, color: '#334155', textAlign: 'right' }}>Ação</th>
                </tr>
              </thead>
              <tbody>
                {sizeKeys.map((key) => {
                  const px = unooriaIconSizes[key];
                  const rem = unooriaIconSizesRem[key];
                  const keyLower = key.toLowerCase();
                  const cssVar = `--unooria-icon-size-${keyLower}`;
                  const isMaster = key === 'S';

                  const usageMap: Record<UnooriaIconSizeKey, string> = {
                    '4XS': 'Badges ultra-compactos, tags mínimas, status dots inline',
                    '3XS': 'Botões compactos, inputs densos, campos de formulário P',
                    'XXS': 'Ícones inline em textos secundários, tabs compactas',
                    'XS': 'Botões padrão M, breadcrumbs, chips, dropdown triggers',
                    'S': 'Padrão Master do Figma (24px), botões principais, sidebars',
                    'M': 'Cards médios, headers de blocos, botões de ação flutuantes',
                    'L': 'Hero icons, modais, empty states médios, cards de destaque',
                    'XL': 'Grandes banners de boas-vindas, empty states principais',
                  };

                  return (
                    <tr
                      key={key}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        backgroundColor: isMaster ? '#F0F7FF' : 'transparent',
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      <td style={{ padding: '14px 20px', fontWeight: 700, color: isMaster ? '#0086FF' : '#1E293B' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{key}</span>
                          {isMaster && (
                            <span
                              style={{
                                backgroundColor: '#0086FF',
                                color: '#FFFFFF',
                                fontSize: '10px',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                              }}
                            >
                              Master
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px', fontFamily: 'monospace', fontWeight: 600, color: '#475569' }}>
                        {px}px
                      </td>
                      <td style={{ padding: '14px 20px', fontFamily: 'monospace', color: '#64748B' }}>
                        {rem}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <code style={{ fontSize: '12px', color: '#0086FF', backgroundColor: '#F1F5F9', padding: '3px 8px', borderRadius: '4px' }}>
                          var({cssVar})
                        </code>
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '56px',
                            height: '56px',
                            backgroundColor: '#F8FAFC',
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                          }}
                        >
                          <Icon name="search" size={key} color="#22272A" />
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px', color: '#64748B', fontSize: '13px' }}>
                        {usageMap[key]}
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <CopyBadge text={`var(${cssVar})`} label="Copiar CSS" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Simulador Interativo de Tamanhos */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
                Régua Visual Comparativa de Todos os Tamanhos
              </h4>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                Comparação lado a lado com os 8 tokens alinhados pela linha de base.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>Preenchimento (Fill):</span>
              <button
                onClick={() => setInteractiveFill(!interactiveFill)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: interactiveFill ? '#0086FF' : '#FFFFFF',
                  color: interactiveFill ? '#FFFFFF' : '#334155',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {interactiveFill ? 'Preenchido (Fill 1)' : 'Contorno (Fill 0)'}
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '32px 24px',
              border: '1px dashed #CBD5E1',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            {sizeKeys.map((k) => (
              <div
                key={k}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: interactiveSize === k ? '#EFF6FF' : 'transparent',
                  border: interactiveSize === k ? '1px solid #93C5FD' : '1px solid transparent',
                  transition: 'all 0.15s ease',
                }}
                onClick={() => setInteractiveSize(k)}
              >
                <div style={{ height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="star" size={k} fill={interactiveFill} color="#0086FF" />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>{k}</div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>
                    {unooriaIconSizes[k]}px
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: ESPESSURAS DE TRAÇO (STROKE)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Espessuras de Traço (Stroke Weights)"
          description="Variação de peso do traço óptico para equilibrar hierarquia visual e densidade de tela."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          {strokeKeys.map((strokeKey) => {
            const strokeVal = unooriaIconStrokeWeights[strokeKey];
            const weightMap: Record<UnooriaIconStrokeWeightKey, UnooriaIconWeight> = {
              thin: 200,
              regular: 300,
              medium: 400,
              bold: 600,
            };
            const w = weightMap[strokeKey];
            const isStandard = strokeKey === 'regular';

            return (
              <div
                key={strokeKey}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: isStandard ? '2px solid #0086FF' : '1px solid #E2E8F0',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', textTransform: 'capitalize' }}>
                    {strokeKey} ({strokeVal})
                  </span>
                  {isStandard && (
                    <span style={{ backgroundColor: '#0086FF', color: '#FFFFFF', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      Padrão
                    </span>
                  )}
                </div>

                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  <Icon name="home" size="m" weight={w} color="#22272A" />
                  <Icon name="settings" size="m" weight={w} color="#22272A" />
                  <Icon name="favorite" size="m" weight={w} color="#22272A" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748B' }}>
                  <span>Weight: <strong>{w}</strong></span>
                  <code style={{ fontSize: '11px', color: '#0086FF', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                    --unooria-icon-stroke-{strokeKey}
                  </code>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 4: ÁREAS TECNOLÓGICAS SENAI (23 SETORES)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <UnooriaDocSectionHeader
              title="Áreas Tecnológicas SENAI (23 Mapeamentos)"
              description="Iconografia semântica oficial padronizada para identificar os 23 setores de atuação tecnológica do SENAI no ecossistema Unooria."
            />
          </div>
          <div style={{ width: '280px' }}>
            <input
              type="text"
              placeholder="Filtrar áreas ou ícones..."
              value={selectedTechAreaSearch}
              onChange={(e) => setSelectedTechAreaSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {Object.entries(unooriaTechAreasIcons)
            .filter(([area, iconName]) => {
              const term = selectedTechAreaSearch.toLowerCase().trim();
              return term === '' || area.toLowerCase().includes(term) || iconName.toLowerCase().includes(term);
            })
            .map(([area, iconName]) => (
              <div
                key={area}
                onClick={() => handleCopyToast(`<Icon name="${iconName}" />`, 'Código do Ícone')}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0086FF';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 134, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.03)';
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    backgroundColor: '#F0F7FF',
                    color: '#0086FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon name={iconName} size="s" color="#0086FF" />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#1E293B',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={area}
                  >
                    {area}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <code style={{ fontSize: '11px', color: '#64748B', backgroundColor: '#F1F5F9', padding: '1px 6px', borderRadius: '4px' }}>
                      {iconName}
                    </code>
                  </div>
                </div>

                <CopyBadge text={iconName} label="Copiar" />
              </div>
            ))}
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: INICIATIVAS SENAI (18 INICIATIVAS & 5 MARCAS VETORIAIS)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <UnooriaDocSectionHeader
              title="Iniciativas & Programas SENAI (18 Mapeamentos)"
              description="Mapeamento completo para plataformas e iniciativas institucionais, integrando 5 marcas vetoriais customizadas SVG oficiais do Figma."
            />
          </div>
          <div style={{ width: '280px' }}>
            <input
              type="text"
              placeholder="Filtrar iniciativas..."
              value={selectedInitiativeSearch}
              onChange={(e) => setSelectedInitiativeSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {Object.entries(unooriaInitiativesIcons)
            .filter(([init, iconRef]) => {
              const term = selectedInitiativeSearch.toLowerCase().trim();
              return term === '' || init.toLowerCase().includes(term) || iconRef.toLowerCase().includes(term);
            })
            .map(([init, iconRef]) => {
              const isCustomSvg = [
                'Aprendizagem Nacional',
                'Estante Virtual',
                'Futuro Digital',
                'Mundo Senai',
                'Senai Play',
              ].includes(iconRef);

              return (
                <div
                  key={init}
                  onClick={() => handleCopyToast(`<Icon name="${iconRef}" />`, 'Código do Ícone')}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: isCustomSvg ? '1.5px solid #7FA5E2' : '1px solid #E2E8F0',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0086FF';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 134, 255, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isCustomSvg ? '#7FA5E2' : '#E2E8F0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.03)';
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      backgroundColor: isCustomSvg ? '#F4F7FE' : '#F8FAFC',
                      color: isCustomSvg ? '#0086FF' : '#334155',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={iconRef} size="s" color={isCustomSvg ? '#0086FF' : '#334155'} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#1E293B',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      title={init}
                    >
                      {init}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                      <code style={{ fontSize: '11px', color: '#64748B', backgroundColor: '#F1F5F9', padding: '1px 6px', borderRadius: '4px' }}>
                        {iconRef}
                      </code>
                      {isCustomSvg && (
                        <span style={{ fontSize: '10px', color: '#0086FF', fontWeight: 600, backgroundColor: '#EBF3FF', padding: '1px 5px', borderRadius: '3px' }}>
                          SVG Custom
                        </span>
                      )}
                    </div>
                  </div>

                  <CopyBadge text={iconRef} label="Copiar" />
                </div>
              );
            })}
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 6: CATÁLOGO GERAL DE ÍCONES (1.564 ÍCONES EM 15 CATEGORIAS)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title={`Catálogo Geral de Ícones (${totalIconsCount} Ícones)`}
          description="Explore o acervo completo de 15 categorias extraído da prancha oficial do Figma com busca instantânea, filtros e cópia em 1 clique."
        />

        {/* BARRA DE FERRAMENTAS & CONTROLES */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          {/* Linha 1: Input de Busca + Filtros Interativos */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 300px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Pesquisar por nome do ícone (ex: 'search', 'settings', 'user', 'arrow')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#F8FAFC',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease',
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Seletor de Tamanho */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>Tamanho:</span>
              <select
                value={interactiveSize}
                onChange={(e) => setInteractiveSize(e.target.value as UnooriaIconSizeKey)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#1E293B',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {sizeKeys.map((k) => (
                  <option key={k} value={k}>
                    {k} ({unooriaIconSizes[k]}px)
                  </option>
                ))}
              </select>
            </div>

            {/* Seletor de Weight */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>Peso:</span>
              <select
                value={interactiveWeight}
                onChange={(e) => setInteractiveWeight(Number(e.target.value) as UnooriaIconWeight)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#1E293B',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value={100}>100 (Thin)</option>
                <option value={200}>200 (Extra Light)</option>
                <option value={300}>300 (Light - Oficial)</option>
                <option value={400}>400 (Regular)</option>
                <option value={500}>500 (Medium)</option>
                <option value={600}>600 (Semi Bold)</option>
                <option value={700}>700 (Bold)</option>
              </select>
            </div>

            {/* Toggle Fill */}
            <button
              onClick={() => setInteractiveFill(!interactiveFill)}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: interactiveFill ? '#0086FF' : '#FFFFFF',
                color: interactiveFill ? '#FFFFFF' : '#334155',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {interactiveFill ? '★ Fill Ativo (1)' : '☆ Fill Inativo (0)'}
            </button>

            {/* Seletor de Cores */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>Cor:</span>
              <input
                type="color"
                value={interactiveColor}
                onChange={(e) => setInteractiveColor(e.target.value)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  cursor: 'pointer',
                  padding: '2px',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>
          </div>

          {/* Linha 2: Chips de Categorias */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: activeCategory === 'all' ? '1px solid #0086FF' : '1px solid #E2E8F0',
                backgroundColor: activeCategory === 'all' ? '#0086FF' : '#FFFFFF',
                color: activeCategory === 'all' ? '#FFFFFF' : '#475569',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Todas as Categorias ({totalIconsCount})
            </button>

            {allCategoryEntries.map(([catName, catData]) => {
              const isSelected = activeCategory === catName;
              return (
                <button
                  key={catName}
                  onClick={() => setActiveCategory(catName)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: isSelected ? '1px solid #0086FF' : '1px solid #E2E8F0',
                    backgroundColor: isSelected ? '#0086FF' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#475569',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {catName} ({catData.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* GRADE DE ÍCONES POR CATEGORIA */}
        {filteredCatalog.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '48px',
              textAlign: 'center',
              color: '#64748B',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1E293B', margin: '0 0 8px 0' }}>
              Nenhum ícone encontrado
            </h3>
            <p style={{ fontSize: '14px', margin: 0 }}>
              Não encontramos nenhum ícone correspondente à busca &quot;{searchTerm}&quot;.
            </p>
          </div>
        ) : (
          filteredCatalog.map((group) => (
            <div
              key={group.category}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '28px',
                marginBottom: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  borderBottom: '1px solid #F1F5F9',
                  paddingBottom: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', margin: 0 }}>
                    Categoria: {group.category}
                  </h3>
                  <span
                    style={{
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {group.icons.length} {group.icons.length === 1 ? 'ícone' : 'ícones'}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: '12px',
                }}
              >
                {group.icons.map((iconName) => (
                  <div
                    key={iconName}
                    onClick={() => handleCopyToast(`<Icon name="${iconName}" />`, 'Código do Ícone')}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px 8px',
                      borderRadius: '10px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      gap: '10px',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFF6FF';
                      e.currentTarget.style.borderColor = '#0086FF';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon
                        name={iconName}
                        size={interactiveSize}
                        weight={interactiveWeight}
                        fill={interactiveFill}
                        color={interactiveColor}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#475569',
                        fontFamily: 'monospace',
                        textAlign: 'center',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        padding: '0 4px',
                      }}
                      title={iconName}
                    >
                      {iconName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* =========================================================================
          SEÇÃO 7: BOAS PRÁTICAS DE USO
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso"
          description="Diretrizes essenciais de acessibilidade, consistência de estilo e boas práticas para interfaces fluidas."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* DO */}
          <div
            style={{
              backgroundColor: '#F0FDF4',
              borderRadius: '16px',
              border: '1px solid #BBF7D0',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16A34A', fontWeight: 700, fontSize: '16px' }}>
              <span>✓</span> O QUE FAZER (DO)
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534', fontSize: '14px', lineHeight: 1.6 }}>
              <li>
                <strong>Use tamanhos padronizados da escala:</strong> Sempre utilize os tokens <code>4XS</code> até <code>XL</code> para manter harmonia proporcional.
              </li>
              <li>
                <strong>Garanta acessibilidade:</strong> Quando o ícone for interativo e não tiver texto ao lado, forneça sempre a prop <code>aria-label</code>.
              </li>
              <li>
                <strong>Mantenha consistência de Weight:</strong> O peso oficial é <strong>300 (Light)</strong>. Utilize pesos maiores apenas para dar ênfase máxima em seleções.
              </li>
              <li>
                <strong>Adote preenchimento semântico (Fill):</strong> Alterne <code>fill</code> para <code>true</code> para indicar estados ativos/selecionados (ex: item favoritado, aba selecionada).
              </li>
            </ul>
          </div>

          {/* DON'T */}
          <div
            style={{
              backgroundColor: '#FEF2F2',
              borderRadius: '16px',
              border: '1px solid #FECACA',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontWeight: 700, fontSize: '16px' }}>
              <span>✕</span> O QUE EVITAR (DON&apos;T)
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#991B1B', fontSize: '14px', lineHeight: 1.6 }}>
              <li>
                <strong>Não use tamanhos arbitrários em CSS:</strong> Evite definir <code>width: 27px; height: 27px;</code> sem utilizar a escala oficial de tokens.
              </li>
              <li>
                <strong>Não misture estilos de famílias de ícones:</strong> Evite misturar ícones Outline afiados com Rounded na mesma tela.
              </li>
              <li>
                <strong>Não crie botões apenas com ícone sem rótulo acessível:</strong> Leitores de tela precisam saber a finalidade da ação através de <code>aria-label</code>.
              </li>
              <li>
                <strong>Não use cores com baixo contraste:</strong> Garanta contraste mínimo de 3:1 para ícones interativos e 4.5:1 para texto adjacente.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 8: REFERÊNCIA RÁPIDA DE CÓDIGO
          ========================================================================= */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="Exemplos de Código (React & CSS)"
          description="Snippets prontos para importar e utilizar o componente Icon ou variáveis CSS nativas."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* React Component */}
          <div
            style={{
              backgroundColor: '#22272A',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: 1.5,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
              <span style={{ color: '#7FA5E2', fontWeight: 600 }}>Uso com Componente React</span>
              <CopyBadge
                text={`import { Icon } from '@unooria/design-system';\n\n// Ícone padrão 24px (S)\n<Icon name="search" />\n\n// Ícone com tamanho de token e cor customizada\n<Icon name="notifications" size="m" color="#0086FF" />\n\n// Ícone customizado SENAI\n<Icon name="mundo-senai" size="l" />\n\n// Ícone com rotação / spin contínuo (loader)\n<Icon name="progress_activity" size="s" spin />`}
                label="Copiar JSX"
              />
            </div>
            <pre style={{ margin: 0, overflowX: 'auto', color: '#CBD4D6' }}>
              {`import { Icon } from '@unooria/design-system';

// Ícone padrão 24px (S)
<Icon name="search" />

// Ícone com tamanho de token e cor
<Icon name="notifications" size="m" color="#0086FF" />

// Marca customizada SENAI
<Icon name="mundo-senai" size="l" />

// Loader animado (spin)
<Icon name="progress_activity" size="s" spin />`}
            </pre>
          </div>

          {/* HTML / CSS Variables */}
          <div
            style={{
              backgroundColor: '#22272A',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: 1.5,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
              <span style={{ color: '#7FA5E2', fontWeight: 600 }}>Uso com Classes CSS & Variáveis</span>
              <CopyBadge
                text={`<!-- HTML nativo com classe e variável de tamanho -->\n<span class="material-symbols-rounded unooria-icon--size-s">\n  search\n</span>`}
                label="Copiar HTML"
              />
            </div>
            <pre style={{ margin: 0, overflowX: 'auto', color: '#CBD4D6' }}>
              {`<!-- HTML nativo com classes do Unooria -->
<span class="material-symbols-rounded unooria-icon--size-s">
  search
</span>

/* Em CSS puro */
.meu-elemento-icone {
  font-size: var(--unooria-icon-size-m); /* 32px */
  color: var(--unooria-color-brandnavy-600); /* ou var(--unooria-icon-color-brand) */
}`}
            </pre>
          </div>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof UnooriaIconsDocumentation> = {
  title: 'Plataforma Unooria/Fundamentos/Ícones',
  component: UnooriaIconsDocumentation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Documentação e especificações visuais fiéis ao Figma (Node 6024:2923) dos Tokens de Ícones da Plataforma Unooria.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof UnooriaIconsDocumentation>;

/**
 * Documentação rica e completa dos tokens de ícones baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <UnooriaIconsDocumentation />,
};

/**
 * Especificação visual fiel 1:1 do Frame Figma (Node 6024:2923)
 */
export const EspecificacaoFigma: Story = {
  name: '🎨 Especificação Fiel Figma (Node 6024:2923)',
  render: () => <UnooriaIconsDocumentation />,
};
