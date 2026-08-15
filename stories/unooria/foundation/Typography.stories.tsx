import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  typographyStyles,
  fontFamilies,
  fontWeights,
  desktopFontSizes,
  desktopLineHeights,
  mobileFontSizes,
  mobileLineHeights,
  typographyRules,
  TypographyTokenStyle,
} from '../../../src/unooria/tokens/typography';
import '../../../src/unooria/tokens/typography.css';
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

interface TypographyCardProps {
  token: TypographyTokenStyle;
  customText?: string;
  viewportMode?: 'desktop' | 'mobile';
  selectedWeight?: string;
  showDetails?: boolean;
}

// Componente de Card Individual para cada Token de Tipografia
const TypographyTokenCard: React.FC<TypographyCardProps> = ({
  token,
  customText,
  viewportMode = 'desktop',
  selectedWeight = 'default',
  showDetails = true,
}) => {
  const isMobile = viewportMode === 'mobile';
  const currentMetrics = isMobile ? token.mobile : token.desktop;
  const textToDisplay = customText && customText.trim() !== '' ? customText : token.sampleText;

  // Determina o peso a ser aplicado no preview
  const primaryWeightObj = token.recommendedWeights[0];
  const activeWeight =
    selectedWeight !== 'default' ? parseInt(selectedWeight, 10) : primaryWeightObj?.weight || 400;

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    heading: { bg: '#EBF3FF', text: '#0052CC', border: '#B3D4FF' },
    title: { bg: '#E3FCEF', text: '#006644', border: '#ABF5D1' },
    body: { bg: '#F4F5F7', text: '#172B4D', border: '#DFE1E6' },
    caption: { bg: '#FFF0B3', text: '#172B4D', border: '#FFE380' },
  };

  const badgeStyle = categoryColors[token.category] || categoryColors.body;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {/* Cabeçalho do Card */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          borderBottom: '1px solid #EDF2F7',
          paddingBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3
            style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: 700,
              color: '#22272A',
              fontFamily: '"Open Sans", sans-serif',
            }}
          >
            {token.name}
          </h3>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: '12px',
              backgroundColor: badgeStyle.bg,
              color: badgeStyle.text,
              border: `1px solid ${badgeStyle.border}`,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {token.category}
          </span>
          {isMobile && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: '12px',
                backgroundColor: '#FFEBE6',
                color: '#DE350B',
                border: '1px solid #FFBDAD',
              }}
            >
              📱 Mobile: {currentMetrics.fontSize} / {currentMetrics.lineHeight}
            </span>
          )}
        </div>

        <div
          style={{
            fontSize: '12px',
            color: '#475157',
            fontFamily: 'monospace',
            backgroundColor: '#F7FAFC',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid #E2E8F0',
          }}
        >
          {currentMetrics.fontSize} / {currentMetrics.lineHeight} • Peso: {activeWeight}
        </div>
      </div>

      {/* Descrição */}
      <p style={{ fontSize: '13px', color: '#617379', margin: 0, lineHeight: '18px' }}>
        {token.description}
      </p>

      {/* Area do Preview Visual Interativo */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#FAFAFA',
          borderRadius: '8px',
          border: '1px solid #F0F0F0',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
        }}
      >
        <div
          style={{
            fontFamily: token.fontFamily,
            fontSize: currentMetrics.fontSize,
            lineHeight: currentMetrics.lineHeight,
            fontWeight: activeWeight,
            color: '#22272A',
            wordBreak: 'break-word',
            width: '100%',
          }}
        >
          {textToDisplay}
        </div>
      </div>

      {/* Pesos recomendados no Figma */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#475157', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Pesos Recomendados (Figma):
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {token.recommendedWeights.map((rw) => (
            <span
              key={rw.weight}
              style={{
                fontSize: '11px',
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: activeWeight === rw.weight ? '#22272A' : '#EDF2F7',
                color: activeWeight === rw.weight ? '#FFFFFF' : '#475157',
                fontWeight: rw.weight,
                transition: 'all 0.15s ease',
              }}
              title={rw.context}
            >
              {rw.weightName} ({rw.weight})
            </span>
          ))}
        </div>
      </div>

      {/* Detalhes Técnicos de CSS com Botões de Cópia */}
      {showDetails && (
        <div
          style={{
            backgroundColor: '#F8FAFC',
            padding: '14px 16px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            fontSize: '12px',
            fontFamily: 'monospace',
            color: '#2D3748',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <span><strong>CSS Class:</strong> <code>.unooria-text-{token.id}</code></span>
            <CopyBadge text={`.unooria-text-${token.id}`} label="Copiar" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <span><strong>Size Var:</strong> <code>var(--unooria-size-{token.id})</code></span>
            <CopyBadge text={`var(--unooria-size-${token.id})`} label="Copiar" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <span><strong>Line-Height:</strong> <code>var(--unooria-line-height-{token.id})</code></span>
            <CopyBadge text={`var(--unooria-line-height-${token.id})`} label="Copiar" />
          </div>
        </div>
      )}
    </div>
  );
};

// Componente para Exibir o Quadro Oficial de Regras e Diretrizes do Design System
const RulesSection: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #CBD5E1',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div style={{ borderBottom: '2px solid #2563EB', paddingBottom: '12px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Especificações do Figma • Parte 3
        </span>
        <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '4px 0 0 0', color: '#1E293B' }}>
          {typographyRules.title}
        </h2>
      </div>

      {/* 1 - Fundamentos e Princípios */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: 0 }}>
          {typographyRules.sections[0].title}
        </h3>
        <p style={{ fontSize: '14px', color: '#475569', margin: 0, lineHeight: '22px' }}>
          {typographyRules.sections[0].content}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          {typographyRules.sections[0].weights?.map((w, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '12px',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#0F172A', marginBottom: '4px' }}>
                {w.name}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', lineHeight: '18px' }}>
                {w.usage}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2 - Regras de Aplicação de Pesos por Contexto */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: 0 }}>
          {typographyRules.sections[1].title}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {typographyRules.sections[1].categories?.map((cat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#F1F5F9',
                borderLeft: '4px solid #3B82F6',
                borderRadius: '4px',
                padding: '14px',
              }}
            >
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>
                {cat.name}
              </h4>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#334155', lineHeight: '20px' }}>
                {cat.rules.map((r, rIdx) => (
                  <li key={rIdx} style={{ marginBottom: '4px' }}>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 3 - Diretrizes de Responsividade */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: 0 }}>
          {typographyRules.sections[2].title}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {typographyRules.sections[2].rules?.map((ruleItem, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FEF3C7',
                border: '1px solid #FCD34D',
                borderRadius: '8px',
                padding: '14px',
              }}
            >
              <strong style={{ fontSize: '13px', color: '#78350F', display: 'block', marginBottom: '4px' }}>
                {ruleItem.topic}
              </strong>
              <p style={{ margin: 0, fontSize: '13px', color: '#92400E', lineHeight: '19px' }}>
                {ruleItem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente Guia Geral de Tipografia
function UnooriaTypographyGuide({
  sampleText = '',
  viewportMode = 'desktop',
  filterCategory = 'all',
  selectedWeight = 'default',
  showDetails = true,
  showRules = true,
}: {
  sampleText?: string;
  viewportMode?: 'desktop' | 'mobile';
  filterCategory?: string;
  selectedWeight?: string;
  showDetails?: boolean;
  showRules?: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const tokensList = Object.values(typographyStyles).filter((token) => {
    const matchesCategory = filterCategory === 'all' || token.category === filterCategory;
    const matchesSearch =
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        category="Foundations • Tipografia"
        title="Tokens de Tipografia"
        description={
          <>
            A tipografia oficial da Plataforma Unooria utiliza a fonte <strong>Open Sans</strong> com uma escala rigorosa e responsiva para Desktop e Mobile. Todas as variações de tamanho, altura de linha e peso seguem regras formais do sistema.
          </>
        }
      />

      {/* Seção de Regras e Diretrizes do Sistema */}
      {showRules && <RulesSection />}

      {/* Tabela de Resumo dos Tokens Base com Cópia Rápida */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '24px',
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 16px 0', color: '#1E293B' }}>
          Tabela Comparativa de Escala (Desktop x Mobile)
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '10px 12px', color: '#475569' }}>Token / Identificador</th>
                <th style={{ padding: '10px 12px', color: '#475569' }}>Desktop Size</th>
                <th style={{ padding: '10px 12px', color: '#475569' }}>Desktop Line Height</th>
                <th style={{ padding: '10px 12px', color: '#2563EB' }}>Mobile Size</th>
                <th style={{ padding: '10px 12px', color: '#2563EB' }}>Mobile Line Height</th>
                <th style={{ padding: '10px 12px', color: '#475569' }}>Classe CSS</th>
                <th style={{ padding: '10px 12px', color: '#475569', textAlign: 'right' }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(typographyStyles).map((token, index) => (
                <tr
                  key={token.id}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                  }}
                >
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>
                    {token.name} <code style={{ fontSize: '11px', color: '#64748B' }}>({token.id})</code>
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontWeight: 600 }}>
                    {token.desktop.fontSize}
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#64748B' }}>
                    {token.desktop.lineHeight}
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontWeight: 700, color: '#2563EB' }}>
                    {token.mobile.fontSize}
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#2563EB' }}>
                    {token.mobile.lineHeight}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <code style={{ fontSize: '11px', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                      .unooria-text-{token.id}
                    </code>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                    <CopyBadge text={`.unooria-text-${token.id}`} label="Copiar Class" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Controles de Busca e Filtro */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          backgroundColor: '#F8FAFC',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          flexWrap: 'wrap',
        }}
      >
        <input
          type="text"
          placeholder="Buscar token por nome, id ou descrição..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            minWidth: '240px',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            fontSize: '14px',
            outline: 'none',
          }}
        />

        <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
          Exibindo {tokensList.length} de {Object.keys(typographyStyles).length} tokens
        </div>
      </div>

      {/* Lista de Tokens de Tipografia */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {tokensList.map((token) => (
          <TypographyTokenCard
            key={token.id}
            token={token}
            customText={sampleText}
            viewportMode={viewportMode}
            selectedWeight={selectedWeight}
            showDetails={showDetails}
          />
        ))}

        {tokensList.length === 0 && (
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              color: '#64748B',
            }}
          >
            Nenhum token de tipografia encontrado para a busca "{searchQuery}".
          </div>
        )}
      </div>
    </UnooriaDocShell>
  );
}

/**
 * Guia e Documentação Interativa dos Tokens de Tipografia da Plataforma Unooria.
 * Sincronizado estritamente com as especificações oficiais extraídas do Figma.
 */
const meta = {
  title: 'Plataforma Unooria/Fundamentos/Tipografia',
  component: UnooriaTypographyGuide,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Sistema de Tipografia da **Plataforma Unooria** baseado na família tipográfica **Open Sans**. ' +
          'Apresenta rigorosa hierarquia responsiva (Desktop x Mobile) e regras formais de pesos e contexto.',
      },
    },
  },
  argTypes: {
    sampleText: {
      control: 'text',
      description: 'Texto de exemplo customizado para teste em todos os tokens',
      defaultValue: '',
    },
    viewportMode: {
      control: 'radio',
      options: ['desktop', 'mobile'],
      description: 'Modo de visualização da escala de tipografia (Desktop ou Mobile)',
      defaultValue: 'desktop',
    },
    filterCategory: {
      control: 'select',
      options: ['all', 'heading', 'title', 'body', 'caption'],
      description: 'Filtrar por categoria do token',
      defaultValue: 'all',
    },
    selectedWeight: {
      control: 'select',
      options: ['default', '400', '500', '600', '700'],
      description: 'Forçar peso específico para teste visual',
      defaultValue: 'default',
    },
    showDetails: {
      control: 'boolean',
      description: 'Exibir detalhes técnicos de CSS e classes utilitárias',
      defaultValue: true,
    },
    showRules: {
      control: 'boolean',
      description: 'Exibir o guia de Regras e Integridade do Sistema',
      defaultValue: true,
    },
  },
} satisfies Meta<typeof UnooriaTypographyGuide>;

export default meta;

type Story = StoryObj<typeof UnooriaTypographyGuide>;

// Story Principal com o Guia Completo
export const GuiaCompleta: Story = {
  name: 'Visão Geral & Tokens',
  render: (args) => (
    <UnooriaTypographyGuide
      sampleText={args.sampleText}
      viewportMode={args.viewportMode}
      filterCategory={args.filterCategory}
      selectedWeight={args.selectedWeight}
      showDetails={args.showDetails}
      showRules={args.showRules}
    />
  ),
  args: {
    sampleText: '',
    viewportMode: 'desktop',
    filterCategory: 'all',
    selectedWeight: 'default',
    showDetails: true,
    showRules: true,
  },
};

// Story de Regras Oficiais de Tipografia
export const RegrasTipografia: Story = {
  name: 'Diretrizes & Regras do Sistema',
  render: () => <RulesSection />,
};

// Story com Type Tester Interativo
export const SimuladorTipografiaInterativo: Story = {
  name: 'Simulador Interativo (Type Tester)',
  render: () => {
    const [fontSize, setFontSize] = useState<number>(24);
    const [lineHeight, setLineHeight] = useState<number>(34);
    const [fontWeight, setFontWeight] = useState<number>(600);
    const [letterSpacing, setLetterSpacing] = useState<number>(0);
    const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');
    const [textColor, setTextColor] = useState<string>('#22272A');
    const [testText, setTestText] = useState<string>(
      'A Plataforma Unooria unifica a experiência visual corporativa com alto contraste e elegância tipográfica.'
    );

    const generatedCss = `font-family: var(--unooria-font-sans, "Open Sans", sans-serif);
font-size: ${fontSize}px;
line-height: ${lineHeight}px;
font-weight: ${fontWeight};
letter-spacing: ${letterSpacing}px;
text-align: ${textAlign};
color: ${textColor};`;

    return (
      <div style={{ fontFamily: 'Open Sans, sans-serif', maxWidth: '1000px', margin: '0 auto', color: '#22272A' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
          Simulador Interativo de Tipografia (Type Tester)
        </h2>
        <p style={{ color: '#617379', marginBottom: '24px', fontSize: '14px' }}>
          Ajuste dinamicamente tamanho, altura de linha, peso, alinhamento e espaçamento entre letras em tempo real.
        </p>

        {/* Controles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            backgroundColor: '#F8FAFC',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            marginBottom: '24px',
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Font Size: {fontSize}px
            </label>
            <input
              type="range"
              min="10"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Line Height: {lineHeight}px
            </label>
            <input
              type="range"
              min="12"
              max="90"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Font Weight: {fontWeight}
            </label>
            <select
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <option value="400">Regular (400)</option>
              <option value="500">Medium (500)</option>
              <option value="600">Semibold (600)</option>
              <option value="700">Bold (700)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Letter Spacing: {letterSpacing}px
            </label>
            <input
              type="range"
              min="-2"
              max="6"
              step="0.5"
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Alinhamento:
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['left', 'center', 'right', 'justify'] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setTextAlign(a)}
                  style={{
                    flex: 1,
                    padding: '8px 4px',
                    borderRadius: '6px',
                    border: `1px solid ${textAlign === a ? '#1670FA' : '#CBD5E1'}`,
                    backgroundColor: textAlign === a ? '#1670FA' : '#FFFFFF',
                    color: textAlign === a ? '#FFFFFF' : '#334155',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Cor do Texto:
            </label>
            <select
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <option value="#22272A">Neutral 950 (#22272A)</option>
              <option value="#475157">Neutral 700 (#475157)</option>
              <option value="#7FA5E2">Brand Navy 600 (#7FA5E2)</option>
              <option value="#716C98">Brand Purple 600 (#716C98)</option>
              <option value="#01B574">Success (#01B574)</option>
              <option value="#E31A1A">Danger (#E31A1A)</option>
            </select>
          </div>
        </div>

        {/* Input de Texto */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
            Texto de Teste:
          </label>
          <textarea
            rows={2}
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              fontSize: '14px',
              outline: 'none',
              fontFamily: '"Open Sans", sans-serif',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Display do Teste */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '36px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            marginBottom: '24px',
            minHeight: '140px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontFamily: '"Open Sans", sans-serif',
              fontSize: `${fontSize}px`,
              lineHeight: `${lineHeight}px`,
              fontWeight: fontWeight,
              letterSpacing: `${letterSpacing}px`,
              textAlign: textAlign,
              color: textColor,
              width: '100%',
              wordBreak: 'break-word',
            }}
          >
            {testText}
          </div>
        </div>

        {/* Snippet CSS Gerado */}
        <div
          style={{
            backgroundColor: '#1E293B',
            borderRadius: '12px',
            padding: '20px',
            color: '#FFFFFF',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>
              Código CSS Gerado
            </span>
            <CopyBadge text={generatedCss} label="Copiar CSS" />
          </div>
          <pre style={{ margin: 0, fontSize: '13px', fontFamily: 'monospace', color: '#7FA5E2', lineHeight: '1.6' }}>
            {generatedCss}
          </pre>
        </div>
      </div>
    );
  },
};

// Stories Individuais para Testes Rápidos dos Tokens

export const Heading4XL: Story = {
  name: 'Token / Heading 4XL',
  render: (args) => (
    <TypographyTokenCard
      token={typographyStyles.heading4XL}
      customText={args.sampleText}
      viewportMode={args.viewportMode}
      selectedWeight={args.selectedWeight}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'Plataforma Unooria Design System',
    viewportMode: 'desktop',
    selectedWeight: 'default',
    showDetails: true,
  },
};

export const HeadingXXXL: Story = {
  name: 'Token / Heading XXXL',
  render: (args) => (
    <TypographyTokenCard
      token={typographyStyles.headingXXXL}
      customText={args.sampleText}
      viewportMode={args.viewportMode}
      selectedWeight={args.selectedWeight}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'Conheça nossos Fundamentos e Princípios',
    viewportMode: 'desktop',
    selectedWeight: 'default',
    showDetails: true,
  },
};

export const HeadingXXL: Story = {
  name: 'Token / Heading XXL',
  render: (args) => (
    <TypographyTokenCard
      token={typographyStyles.headingXXL}
      customText={args.sampleText}
      viewportMode={args.viewportMode}
      selectedWeight={args.selectedWeight}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: '1 - Fundamentos e Princípios',
    viewportMode: 'desktop',
    selectedWeight: 'default',
    showDetails: true,
  },
};

export const TitleXL: Story = {
  name: 'Token / Title XL',
  render: (args) => (
    <TypographyTokenCard
      token={typographyStyles.titleXL}
      customText={args.sampleText}
      viewportMode={args.viewportMode}
      selectedWeight={args.selectedWeight}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'Integridade e Consistência do Sistema',
    viewportMode: 'desktop',
    selectedWeight: 'default',
    showDetails: true,
  },
};

export const TitleL: Story = {
  name: 'Token / Title L',
  render: (args) => (
    <TypographyTokenCard
      token={typographyStyles.titleL}
      customText={args.sampleText}
      viewportMode={args.viewportMode}
      selectedWeight={args.selectedWeight}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'Regras de Aplicação de Pesos por Contexto',
    viewportMode: 'desktop',
    selectedWeight: 'default',
    showDetails: true,
  },
};

export const BodyM: Story = {
  name: 'Token / Body M',
  render: (args) => (
    <TypographyTokenCard
      token={typographyStyles.bodyM}
      customText={args.sampleText}
      viewportMode={args.viewportMode}
      selectedWeight={args.selectedWeight}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText:
      'Conforme definido nos fundamentos, este Design System é uma coleção de regras e princípios que devem ser seguidos fielmente para manter a consistência visual.',
    viewportMode: 'desktop',
    selectedWeight: 'default',
    showDetails: true,
  },
};

export const BodyS: Story = {
  name: 'Token / Body S',
  render: (args) => (
    <TypographyTokenCard
      token={typographyStyles.bodyS}
      customText={args.sampleText}
      viewportMode={args.viewportMode}
      selectedWeight={args.selectedWeight}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'Utilize Semibold (600) para garantir legibilidade em componentes menores.',
    viewportMode: 'desktop',
    selectedWeight: 'default',
    showDetails: true,
  },
};

export const BodyXS: Story = {
  name: 'Token / Body XS',
  render: (args) => (
    <TypographyTokenCard
      token={typographyStyles.bodyXS}
      customText={args.sampleText}
      viewportMode={args.viewportMode}
      selectedWeight={args.selectedWeight}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText:
      'Labels de formulários devem utilizar Medium (500) para diferenciar o rótulo do valor inserido.',
    viewportMode: 'desktop',
    selectedWeight: 'default',
    showDetails: true,
  },
};

export const BodyXXS: Story = {
  name: 'Token / Body XXS',
  render: (args) => (
    <TypographyTokenCard
      token={typographyStyles.bodyXXS}
      customText={args.sampleText}
      viewportMode={args.viewportMode}
      selectedWeight={args.selectedWeight}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'Avisos de copyright, versão do sistema e metadados de auditoria.',
    viewportMode: 'desktop',
    selectedWeight: 'default',
    showDetails: true,
  },
};

export const CaptionXXXS: Story = {
  name: 'Token / Caption XXXS',
  render: (args) => (
    <TypographyTokenCard
      token={typographyStyles.captionXXXS}
      customText={args.sampleText}
      viewportMode={args.viewportMode}
      selectedWeight={args.selectedWeight}
      showDetails={args.showDetails}
    />
  ),
  args: {
    sampleText: 'DESIGN SYSTEM • PLATAFORMA UNOORIA',
    viewportMode: 'desktop',
    selectedWeight: 'default',
    showDetails: true,
  },
};
