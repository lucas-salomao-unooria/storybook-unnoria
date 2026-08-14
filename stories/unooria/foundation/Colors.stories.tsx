import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  brandNavy,
  brandNavyOverlay,
  brandPurple,
  brandPurpleOverlay,
  brandBlue,
  brandBlueOverlay,
  brandOrange,
  brandOrangeOverlay,
  neutral,
  neutralLightOverlay,
  neutralDark,
  neutralDarkOverlay,
  danger,
  dangerOverlay,
  success,
  successOverlay,
  warning,
  warningOverlay,
  info,
  infoOverlay,
  gradients,
} from '../../../src/unooria/tokens/colors';
import '../../../src/unooria/tokens/colors.css';
import { UnooriaDocShell, UnooriaDocHeader } from '../../../src/unooria/docs';

/**
 * Storybook da Plataforma Unooria - Tokens de Cores
 * Documentação interativa e completa da paleta visual extraída do Figma.
 */
const meta: Meta = {
  title: 'Plataforma Unooria/Fundamentos/Cores',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Documentação interativa dos Tokens de Cores da Plataforma Unooria. Inclui cores de marca (primárias e secundárias), neutras para modo claro/escuro, feedbacks de sistema (erro, sucesso, alerta e info), overlays de transparência e gradientes.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

// Componente para notificação ao copiar
const CopyBadge: React.FC<{ text: string }> = ({ text }) => {
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
        color: copied ? '#FFFFFF' : 'inherit',
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
      {copied ? '✓ Copiado!' : text}
    </button>
  );
};

// Funcao para formatar cores sempre como HEX (#RRGGBB)
function formatDisplayHex(color: string): string {
  if (!color) return '';
  if (color.startsWith('#')) return color.toUpperCase();
  if (color.startsWith('rgba') || color.startsWith('rgb')) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      const r = parseInt(match[1], 10).toString(16).padStart(2, '0');
      const g = parseInt(match[2], 10).toString(16).padStart(2, '0');
      const b = parseInt(match[3], 10).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`.toUpperCase();
    }
  }
  return color;
}

// Funcao para checar se a cor e escura
function isColorDark(hex: string): boolean {
  if (!hex) return false;
  const formattedHex = formatDisplayHex(hex);
  if (!formattedHex.startsWith('#')) return false;
  const c = formattedHex.substring(1);
  const rgb = parseInt(c.length === 3 ? c.split('').map((x) => x + x).join('') : c, 16);
  if (isNaN(rgb)) return false;
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma < 140;
}

// Interface para Swatch de Cor idêntico ao Figma
interface SwatchCardProps {
  step: string;
  value: string;
  displayHex?: string;
  cssVar: string;
  isBase?: boolean;
  baseText?: string;
  textColor?: string;
  contrast?: string;
  opacityText?: string;
}

const SwatchCard: React.FC<SwatchCardProps> = ({
  step,
  value,
  displayHex,
  cssVar,
  isBase,
  baseText = 'color base',
  textColor,
  contrast,
  opacityText,
}) => {
  const [copied, setCopied] = useState(false);

  // Calcula valor Hex para exibicao estilo Figma
  const hexToShow = displayHex || formatDisplayHex(value);

  // Calcula cor de texto automatica
  const isDark =
    textColor === '#FFFFFF' ||
    ['600', '700', '800', '900', '950'].includes(step) ||
    isColorDark(value);

  const fgColor = textColor || (isDark ? '#FFFFFF' : '#22272A');
  const isGradient = value.includes('gradient');

  // Formata o nome do token idêntico ao Figma: $color-brandnavy-50 ou $color-opacity-brandnavy-50
  const tokenName = cssVar.startsWith('--unooria-color-opacity-')
    ? cssVar.replace('--unooria-color-opacity-', '$color-opacity-')
    : cssVar.replace('--unooria-color-', '$color-');

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div
      onClick={handleCopy}
      title="Clique para copiar o valor HEX/CSS"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '151px',
        height: '151px',
        borderRadius: '16px',
        padding: '16px',
        background: value,
        boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.12)' : '0 2px 6px rgba(0,0,0,0.03)',
        border: isDark ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
        boxSizing: 'border-box',
        position: 'relative',
        color: fgColor,
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      {/* Feedback ao clicar para copiar */}
      {copied && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            backgroundColor: 'rgba(0,0,0,0.75)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 700,
            zIndex: 10,
            backdropFilter: 'blur(3px)',
          }}
        >
          ✓ Copiado!
        </div>
      )}

      {/* Linha Superior: Numero/Passo e badge BASE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: '14px', lineHeight: 1 }}>{step}</span>
        {isBase && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 400,
              opacity: 0.85,
              lineHeight: 1,
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            {baseText}
          </span>
        )}
      </div>

      {/* Linhas Inferiores: HEX, Nome do Token e Relação de Contraste / Opacidade */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {!isGradient && (
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
              lineHeight: '1.2',
              letterSpacing: '-0.2px',
            }}
          >
            {hexToShow}
          </span>
        )}
        <span
          style={{
            fontSize: '11px',
            fontWeight: 400,
            opacity: 0.85,
            lineHeight: '1.3',
            wordBreak: 'break-all',
            fontFamily: 'Open Sans, system-ui, sans-serif',
          }}
        >
          {tokenName}
        </span>
        {contrast && (
          <span
            style={{
              fontSize: '10px',
              opacity: 0.75,
              lineHeight: '1.2',
              fontFamily: 'Open Sans, system-ui, sans-serif',
            }}
          >
            contrast-ratio: {contrast}
          </span>
        )}
        {opacityText && (
          <span
            style={{
              fontSize: '10px',
              opacity: 0.75,
              lineHeight: '1.2',
              fontFamily: 'Open Sans, system-ui, sans-serif',
            }}
          >
            opacity: {opacityText}
          </span>
        )}
      </div>
    </div>
  );
};

// Seção para um grupo de cores
interface ColorGroupProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const ColorGroup: React.FC<ColorGroupProps> = ({ title, description, children }) => (
  <div
    style={{
      marginBottom: '36px',
      backgroundColor: '#FFFFFF',
      borderRadius: '20px',
      padding: '28px',
      border: '1px solid #E4E8E9',
      boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
    }}
  >
    <div style={{ marginBottom: '20px' }}>
      <h3
        style={{
          fontSize: '22px',
          fontWeight: 700,
          margin: '0 0 8px 0',
          color: '#22272A',
          fontFamily: 'Open Sans, sans-serif',
          letterSpacing: '-0.3px',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '14px',
          lineHeight: '22px',
          color: '#475157',
          margin: 0,
          fontFamily: 'Open Sans, sans-serif',
          maxWidth: '850px',
        }}
      >
        {description}
      </p>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>{children}</div>
  </div>
);

/**
 * Visão Geral de Todos os Tokens de Cores da Plataforma Unooria
 */
export const VisaoGeral: Story = {
  render: () => {
    return (
      <UnooriaDocShell>
        <UnooriaDocHeader
          category="Foundations • Cores"
          title="Tokens de Cores"
          description="A paleta da Plataforma Unooria foi projetada para oferecer alta acessibilidade (conformidade WCAG AAA/AA), harmonização visual dinâmica e flexibilidade entre temas claro e escuro."
        />

        {/* Section 1 (Node 14667:55): Primary Color + Primary Overlay */}
        <ColorGroup
          title="Primary - Brand Navy"
          description="A cor primária é aplicada em elementos interativos, como botões e links, com o objetivo de guiar a navegação do usuário e facilitar a interação com a interface."
        >
          <SwatchCard step="50" value={brandNavy[50]} displayHex="#F5F8FC" cssVar="--unooria-color-brandnavy-50" contrast="AAA" />
          <SwatchCard step="100" value={brandNavy[100]} displayHex="#E8EFFA" cssVar="--unooria-color-brandnavy-100" contrast="AAA" />
          <SwatchCard step="200" value={brandNavy[200]} displayHex="#D3E0F5" cssVar="--unooria-color-brandnavy-200" contrast="AAA" />
          <SwatchCard step="300" value={brandNavy[300]} displayHex="#BDD0EF" cssVar="--unooria-color-brandnavy-300" contrast="AAA" />
          <SwatchCard step="400" value={brandNavy[400]} displayHex="#A4BDE9" cssVar="--unooria-color-brandnavy-400" contrast="AA" />
          <SwatchCard step="500" value={brandNavy[500]} displayHex="#8FAFE5" cssVar="--unooria-color-brandnavy-500" contrast="AA" />
          <SwatchCard step="600" value={brandNavy[600]} displayHex="#7FA5E2" cssVar="--unooria-color-brandnavy-600" isBase baseText="color base" contrast="AA" />
          <SwatchCard step="700" value={brandNavy[700]} displayHex="#6487C2" cssVar="--unooria-color-brandnavy-700" contrast="AA" />
          <SwatchCard step="800" value={brandNavy[800]} displayHex="#49699F" cssVar="--unooria-color-brandnavy-800" contrast="AAA" />
          <SwatchCard step="900" value={brandNavy[900]} displayHex="#2F4F7F" cssVar="--unooria-color-brandnavy-900" contrast="AAA" />
          <SwatchCard step="950" value={brandNavy[950]} displayHex="#0E1039" cssVar="--unooria-color-brandnavy-950" contrast="AAA" />
        </ColorGroup>

        <ColorGroup
          title="Primary - Brand Navy Overlay"
          description="As cores com opacidade são cores com certa transparência. Em nosso sistema de design, elas são utilizadas para as sombras dos elementos e para obter o efeito ideal no glassmorfismo."
        >
          {Object.entries(brandNavyOverlay).map(([step, val]) => (
            <SwatchCard
              key={step}
              step={`${step}`}
              value={val}
              displayHex="#7FA5E2"
              cssVar={`--unooria-color-opacity-brandnavy-${step}`}
              opacityText={`${Number(step) / 10}%`}
            />
          ))}
        </ColorGroup>

        {/* Section 2 (Node 14665:172): Secondary Color + Secondary Overlay */}
        <ColorGroup
          title="Secondary - Brand Purple"
          description="As cores secundárias servem como complementares para ilustrações, gráficos ou componentes interativos. Elas são utilizadas quando a cor primária não atende aos requisitos de acessibilidade ou para criar variações visuais."
        >
          <SwatchCard step="50" value={brandPurple[50]} cssVar="--unooria-color-brandpurple-50" contrast="AAA" />
          <SwatchCard step="100" value={brandPurple[100]} cssVar="--unooria-color-brandpurple-100" contrast="AAA" />
          <SwatchCard step="200" value={brandPurple[200]} cssVar="--unooria-color-brandpurple-200" contrast="AAA" />
          <SwatchCard step="300" value={brandPurple[300]} cssVar="--unooria-color-brandpurple-300" contrast="AAA" />
          <SwatchCard step="400" value={brandPurple[400]} cssVar="--unooria-color-brandpurple-400" contrast="AA" />
          <SwatchCard step="500" value={brandPurple[500]} cssVar="--unooria-color-brandpurple-500" contrast="AA" />
          <SwatchCard step="600" value={brandPurple[600]} cssVar="--unooria-color-brandpurple-600" contrast="AA" />
          <SwatchCard step="700" value={brandPurple[700]} cssVar="--unooria-color-brandpurple-700" contrast="AA" />
          <SwatchCard step="800" value={brandPurple[800]} cssVar="--unooria-color-brandpurple-800" contrast="AAA" />
          <SwatchCard step="900" value={brandPurple[900]} cssVar="--unooria-color-brandpurple-900" isBase baseText="color base" contrast="AAA" />
          <SwatchCard step="950" value={brandPurple[950]} cssVar="--unooria-color-brandpurple-950" contrast="AAA" />
        </ColorGroup>

        <ColorGroup
          title="Secondary - Brand Purple Overlay"
          description="As cores com opacidade são cores com certa transparência. Em nosso sistema de design, elas são utilizadas para as sombras dos elementos e para obter o efeito ideal no glassmorfismo."
        >
          {Object.entries(brandPurpleOverlay).map(([step, val]) => (
            <SwatchCard
              key={step}
              step={`${step}`}
              value={val}
              displayHex="#0E1039"
              cssVar={`--unooria-color-opacity-brandpurple-${step}`}
              opacityText={`${Number(step) / 10}%`}
            />
          ))}
        </ColorGroup>

        {/* Brand Orange (Legado) */}
        <ColorGroup
          title="Brand Orange (Legado / Destaque)"
          description="Escala de laranjas utilizada para elementos de destaque e retrocompatibilidade do sistema."
        >
          {Object.entries(brandOrange).map(([step, val]) => (
            <SwatchCard
              key={step}
              step={step}
              value={val}
              cssVar={`--unooria-color-brandorange-${step}`}
              isBase={step === '600'}
              textColor={Number(step) >= 500 ? '#FFFFFF' : '#22272A'}
            />
          ))}
        </ColorGroup>

        <ColorGroup
          title="Brand Orange Overlay"
          description="Overlays com base na cor laranja para efeitos de sombra e destaques luminosos."
        >
          {Object.entries(brandOrangeOverlay).map(([step, val]) => (
            <SwatchCard
              key={step}
              step={step}
              value={val}
              cssVar={`--unooria-color-opacity-brandorange-${step}`}
              opacityText={`${Number(step) / 10}%`}
            />
          ))}
        </ColorGroup>

        {/* Section 7 (Node 14665:198): Neutrals - Light Mode + Light Overlays */}
        <ColorGroup
          title="Neutrals - Light Mode"
          description="As cores neutras são usadas para textos, fundos e componentes como bordas e divisores. Essas cores garantem legibilidade e consistência visual, tanto em interfaces claras quanto em escuras, sempre preservando a acessibilidade."
        >
          {Object.entries(neutral).map(([step, val]) => {
            const isDarkStep = Number(step) >= 500;
            return (
              <SwatchCard
                key={step}
                step={step}
                value={val}
                cssVar={`--unooria-color-neutral-${step}`}
                textColor={isDarkStep ? '#FFFFFF' : '#22272A'}
              />
            );
          })}
        </ColorGroup>

        <ColorGroup
          title="Neutrals - Light Overlay"
          description="As cores com opacidade são cores com certa transparência. Em nosso sistema de design, elas são utilizadas para as sombras dos elementos e para obter o efeito ideal no glassmorfismo."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', background: '#22272A', padding: '16px', borderRadius: '16px', width: '100%' }}>
            {Object.entries(neutralLightOverlay).map(([step, val]) => (
              <SwatchCard
                key={step}
                step={step}
                value={val}
                cssVar={`--unooria-color-opacity-neutrallight-${step}`}
                textColor="#FFFFFF"
              />
            ))}
          </div>
        </ColorGroup>

        {/* Section 8 (Node 17055:3007): Neutrals - Dark Mode + Dark Overlays */}
        <ColorGroup
          title="Neutrals - Dark Mode"
          description="No modo escuro, as cores neutras são otimizadas para acessibilidade e são comumente aplicadas em superfícies e elevações, garantindo que os elementos mantenham boa legibilidade e contraste em ambientes de baixa luminosidade."
        >
          {Object.entries(neutralDark).map(([step, val]) => {
            const isLightStep = Number(step) >= 800 || step === '950';
            return (
              <SwatchCard
                key={step}
                step={step}
                value={val}
                cssVar={`--unooria-color-neutraldark-${step}`}
                textColor={isLightStep ? '#22272A' : '#FFFFFF'}
              />
            );
          })}
        </ColorGroup>

        <ColorGroup
          title="Neutrals - Dark Overlay"
          description="As cores com opacidade são cores com certa transparência. Em nosso sistema de design, elas são utilizadas para as sombras dos elementos e para obter o efeito ideal no glassmorfismo."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', background: '#F5F5F5', padding: '16px', borderRadius: '16px', width: '100%' }}>
            {Object.entries(neutralDarkOverlay).map(([step, val]) => (
              <SwatchCard
                key={step}
                step={step}
                value={val}
                cssVar={`--unooria-color-opacity-neutraldark-${step}`}
                textColor="#22272A"
              />
            ))}
          </div>
        </ColorGroup>

        {/* Section 3: Danger (Node 14665:224) */}
        <ColorGroup
          title="Danger"
          description="A cor de alerta é utilizada para sinalizar erros ou condições críticas, como destacar campos obrigatórios em formulários ou alertar o usuário sobre ações que precisam ser corrigidas."
        >
          {Object.entries(danger).map(([step, val]) => (
            <SwatchCard
              key={step}
              step={step}
              value={val}
              cssVar={`--unooria-color-danger-${step}`}
              isBase={step === '600'}
              textColor={Number(step) >= 500 ? '#FFFFFF' : '#22272A'}
            />
          ))}
        </ColorGroup>

        <ColorGroup
          title="Danger Overlay"
          description="As cores com opacidade são cores com certa transparência. Em nosso sistema de design, elas são utilizadas para as sombras dos elementos e para obter o efeito ideal no glassmorfismo."
        >
          {Object.entries(dangerOverlay).map(([step, val]) => (
            <SwatchCard
              key={step}
              step={step}
              value={val}
              cssVar={`--unooria-color-opacity-danger-${step}`}
              textColor="#22272A"
            />
          ))}
        </ColorGroup>

        {/* Section 4: Success (Node 14665:250) */}
        <ColorGroup
          title="Success"
          description="As cores de sucesso têm a função de confirmar ações concluídas corretamente, fornecendo feedback positivo ao usuário sobre interações bem-sucedidas, como finalização de tarefas ou envio de informações."
        >
          {Object.entries(success).map(([step, val]) => (
            <SwatchCard
              key={step}
              step={step}
              value={val}
              cssVar={`--unooria-color-sucess-${step}`}
              isBase={step === '500'}
              textColor={Number(step) >= 600 ? '#FFFFFF' : '#22272A'}
            />
          ))}
        </ColorGroup>

        <ColorGroup
          title="Success Overlay"
          description="As cores com opacidade são cores com certa transparência. Em nosso sistema de design, elas são utilizadas para as sombras dos elementos e para obter o efeito ideal no glassmorfismo."
        >
          {Object.entries(successOverlay).map(([step, val]) => (
            <SwatchCard
              key={step}
              step={step}
              value={val}
              cssVar={`--unooria-color-opacity-sucess-${step}`}
              textColor="#22272A"
            />
          ))}
        </ColorGroup>

        {/* Section 5: Warning (Node 14665:276) */}
        <ColorGroup
          title="Warning"
          description="As cores de advertência são usadas para indicar recomendações ou precauções, geralmente em situações onde o usuário precisa tomar uma ação específica, como um aviso para concluir o perfil ou atenção a uma tarefa importante."
        >
          {Object.entries(warning).map(([step, val]) => (
            <SwatchCard
              key={step}
              step={step}
              value={val}
              cssVar={`--unooria-color-warning-${step}`}
              isBase={step === '500'}
              textColor={Number(step) >= 500 ? '#FFFFFF' : '#22272A'}
            />
          ))}
        </ColorGroup>

        <ColorGroup
          title="Warning Overlay"
          description="As cores com opacidade são cores com certa transparência. Em nosso sistema de design, elas são utilizadas para as sombras dos elementos e para obter o efeito ideal no glassmorfismo."
        >
          {Object.entries(warningOverlay).map(([step, val]) => (
            <SwatchCard
              key={step}
              step={step}
              value={val}
              cssVar={`--unooria-color-opacity-warning-${step}`}
              textColor="#22272A"
            />
          ))}
        </ColorGroup>

        {/* Section 6: Info (Node 1349:6301) */}
        <ColorGroup
          title="Info"
          description="As cores informativas destacam dados e informações relevantes na interface. São usadas em ícones, textos e componentes que transmitem orientações ou status importantes, como notificações, alertas de sistema e links com dados essenciais."
        >
          {Object.entries(info).map(([step, val]) => (
            <SwatchCard
              key={step}
              step={step}
              value={val}
              cssVar={`--unooria-color-info-${step}`}
              isBase={step === '500'}
              textColor={Number(step) >= 400 ? '#FFFFFF' : '#22272A'}
            />
          ))}
        </ColorGroup>

        <ColorGroup
          title="Info Overlay"
          description="As cores com opacidade são cores com certa transparência. Em nosso sistema de design, elas são utilizadas para as sombras dos elementos e para obter o efeito ideal no glassmorfismo."
        >
          {Object.entries(infoOverlay).map(([step, val]) => (
            <SwatchCard
              key={step}
              step={step}
              value={val}
              cssVar={`--unooria-color-opacity-info-${step}`}
              textColor="#22272A"
            />
          ))}
        </ColorGroup>

        {/* 8. Gradientes */}
        <ColorGroup
          title="Gradients"
          description="Os gradientes são aplicados em fundos, botões de destaque, overlays e outros elementos interativos, criando uma transição suave entre cores que guia o olhar do usuário e agrega modernidade ao design."
        >
          {Object.entries(gradients).map(([num, val]) => (
            <div
              key={num}
              style={{
                width: '180px',
                height: '160px',
                borderRadius: '16px',
                padding: '12px',
                background: val,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: num === '1' || num === '2' ? '#FFFFFF' : '#22272A',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '16px' }}>Gradiente {num}</div>
              <div style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: 'monospace' }}>$color-gradient-{num}</span>
                <CopyBadge text={`var(--unooria-color-gradient-${num})`} />
              </div>
            </div>
          ))}
        </ColorGroup>
      </UnooriaDocShell>
    );
  },
};

/**
 * Story com Simulador Interativo de Componente de UI em Tempo Real
 */
export const SimuladorDeCoresUI: Story = {
  render: () => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
    const [brandTheme, setBrandTheme] = useState<'navy' | 'purple' | 'orange'>('navy');
    const [feedbackStatus, setFeedbackStatus] = useState<'success' | 'warning' | 'danger' | 'info'>('success');
    const [useGradientBg, setUseGradientBg] = useState<boolean>(false);

    // Mapeamento dinâmico
    const brandMap = {
      navy: {
        primary: brandNavy[600],
        primaryHover: brandNavy[700],
        lightBg: brandNavy[50],
        tokenName: 'brandNavy[600]',
        cssVar: 'var(--unooria-color-brandnavy-600)',
      },
      purple: {
        primary: brandPurple[600],
        primaryHover: brandPurple[700],
        lightBg: brandPurple[50],
        tokenName: 'brandPurple[600]',
        cssVar: 'var(--unooria-color-brandpurple-600)',
      },
      orange: {
        primary: brandOrange[600],
        primaryHover: brandOrange[700],
        lightBg: brandOrange[50],
        tokenName: 'brandOrange[600]',
        cssVar: 'var(--unooria-color-brandorange-600)',
      },
    };

    const feedbackMap = {
      success: {
        color: success[500],
        bg: success[50],
        border: success[200],
        label: 'Operação concluída com sucesso',
        icon: '✓',
        cssVar: 'var(--unooria-color-success-500)',
      },
      warning: {
        color: warning[500],
        bg: warning[50],
        border: warning[200],
        label: 'Atenção: verifique suas configurações',
        icon: '⚠',
        cssVar: 'var(--unooria-color-warning-500)',
      },
      danger: {
        color: danger[600],
        bg: danger[50],
        border: danger[200],
        label: 'Erro crítico na sincronização',
        icon: '✕',
        cssVar: 'var(--unooria-color-danger-600)',
      },
      info: {
        color: info[500],
        bg: info[50],
        border: info[200],
        label: 'Nova atualização do sistema disponível',
        icon: 'ℹ',
        cssVar: 'var(--unooria-color-info-500)',
      },
    };

    const currentBrand = brandMap[brandTheme];
    const currentFeedback = feedbackMap[feedbackStatus];

    const isDark = themeMode === 'dark';
    const cardBg = isDark ? neutralDark[100] : neutral[50];
    const textPrimary = isDark ? neutralDark[950] : neutral[950];
    const textSecondary = isDark ? neutralDark[700] : neutral[500];
    const borderColor = isDark ? neutralDark[300] : neutral[150];

    return (
      <div style={{ fontFamily: 'Open Sans, sans-serif', maxWidth: '1000px', margin: '0 auto', color: '#22272A' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
          Simulador Interativo de Interface com Tokens de Cores
        </h2>
        <p style={{ color: '#617379', marginBottom: '24px', fontSize: '14px' }}>
          Experimente a aplicação dinâmica dos tokens de cores em um componente real, alternando temas, cores de marca e estados de feedback.
        </p>

        {/* Controles do Simulador */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            backgroundColor: '#F8FAFC',
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            marginBottom: '28px',
          }}
        >
          {/* Seletor de Tema */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              Modo de Tema:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setThemeMode('light')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: `2px solid ${themeMode === 'light' ? '#1670FA' : '#CBD5E1'}`,
                  backgroundColor: themeMode === 'light' ? '#FFFFFF' : '#F1F5F9',
                  color: '#1E293B',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                ☀ Light
              </button>
              <button
                onClick={() => setThemeMode('dark')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: `2px solid ${themeMode === 'dark' ? '#1670FA' : '#CBD5E1'}`,
                  backgroundColor: themeMode === 'dark' ? '#22272A' : '#F1F5F9',
                  color: themeMode === 'dark' ? '#FFFFFF' : '#1E293B',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                🌙 Dark
              </button>
            </div>
          </div>

          {/* Seletor de Cor Primária */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              Cor de Marca:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['navy', 'purple', 'orange'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBrandTheme(b)}
                  style={{
                    flex: 1,
                    padding: '8px 6px',
                    borderRadius: '8px',
                    border: `2px solid ${brandTheme === b ? '#1670FA' : '#CBD5E1'}`,
                    backgroundColor: b === 'navy' ? brandNavy[600] : b === 'purple' ? brandPurple[600] : brandOrange[600],
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '11px',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Seletor de Feedback */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              Estado de Feedback:
            </label>
            <select
              value={feedbackStatus}
              onChange={(e) => setFeedbackStatus(e.target.value as any)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                color: '#1E293B',
                cursor: 'pointer',
              }}
            >
              <option value="success">Success (Verde)</option>
              <option value="warning">Warning (Laranja/Amarelo)</option>
              <option value="danger">Danger (Vermelho)</option>
              <option value="info">Info (Azul)</option>
            </select>
          </div>

          {/* Toggle de Gradiente */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              Fundo com Gradiente:
            </label>
            <button
              onClick={() => setUseGradientBg(!useGradientBg)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: `2px solid ${useGradientBg ? '#1670FA' : '#CBD5E1'}`,
                backgroundColor: useGradientBg ? '#1670FA' : '#FFFFFF',
                color: useGradientBg ? '#FFFFFF' : '#334155',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {useGradientBg ? '✦ Gradiente 1 Ativo' : 'Sólido / Neutro'}
            </button>
          </div>
        </div>

        {/* Display do Card de Teste */}
        <div
          style={{
            padding: '48px 24px',
            borderRadius: '24px',
            background: useGradientBg
              ? gradients[1]
              : isDark
              ? '#0E1039'
              : '#F5F8FC',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 'inset 0 0 24px rgba(0,0,0,0.06)',
            marginBottom: '28px',
            transition: 'all 0.3s ease',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: cardBg,
              borderRadius: '20px',
              padding: '28px',
              boxShadow: isDark
                ? '0 20px 40px rgba(0, 0, 0, 0.45)'
                : '0 12px 32px rgba(14, 16, 57, 0.08)',
              border: `1px solid ${borderColor}`,
              color: textPrimary,
              transition: 'all 0.3s ease',
            }}
          >
            {/* Header do Card */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: currentBrand.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '16px',
                  }}
                >
                  U
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: textPrimary }}>
                    Painel Unooria
                  </h4>
                  <span style={{ fontSize: '12px', color: textSecondary }}>
                    Design System v1.0.0
                  </span>
                </div>
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '20px',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : currentBrand.lightBg,
                  color: currentBrand.primary,
                }}
              >
                {themeMode.toUpperCase()}
              </span>
            </div>

            {/* Banner de Feedback */}
            <div
              style={{
                backgroundColor: isDark ? 'rgba(0,0,0,0.25)' : currentFeedback.bg,
                border: `1px solid ${currentFeedback.border}`,
                borderRadius: '12px',
                padding: '12px 16px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span style={{ color: currentFeedback.color, fontWeight: 800, fontSize: '14px' }}>
                {currentFeedback.icon}
              </span>
              <span style={{ fontSize: '13px', color: textPrimary, fontWeight: 600 }}>
                {currentFeedback.label}
              </span>
            </div>

            {/* Ações */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: currentBrand.primary,
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: `0 4px 12px ${currentBrand.primary}40`,
                  transition: 'opacity 0.2s ease',
                }}
              >
                Ação Primária
              </button>
              <button
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: 'transparent',
                  color: textPrimary,
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>

        {/* Tokens Utilizados com Cópia Rápida */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E4E8E9',
            padding: '20px',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#22272A' }}>
            Tokens de Cores Aplicados nesta Configuração:
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <CopyBadge text={currentBrand.cssVar} />
            <CopyBadge text={currentFeedback.cssVar} />
            <CopyBadge text={isDark ? 'var(--unooria-color-neutraldark-100)' : 'var(--unooria-color-neutral-50)'} />
            <CopyBadge text={isDark ? 'var(--unooria-color-neutraldark-950)' : 'var(--unooria-color-neutral-950)'} />
            {useGradientBg && <CopyBadge text="var(--unooria-color-gradient-1)" />}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Story Interativa com Filtro por Categoria e Copiador de Código
 */
export const ExploradorInterativo: Story = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('brandNavy');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const categories: Record<string, { label: string; tokens: Record<string, string>; prefix: string }> = {
      brandNavy: { label: 'Brand Navy (Primária)', tokens: brandNavy, prefix: 'brandnavy' },
      brandNavyOverlay: { label: 'Brand Navy Overlay', tokens: brandNavyOverlay, prefix: 'opacity-brandnavy' },
      brandPurple: { label: 'Brand Purple (Secundária)', tokens: brandPurple, prefix: 'brandpurple' },
      brandPurpleOverlay: { label: 'Brand Purple Overlay', tokens: brandPurpleOverlay, prefix: 'opacity-brandpurple' },
      brandOrange: { label: 'Brand Orange (Destaque)', tokens: brandOrange, prefix: 'brandorange' },
      brandOrangeOverlay: { label: 'Brand Orange Overlay', tokens: brandOrangeOverlay, prefix: 'opacity-brandorange' },
      neutral: { label: 'Neutras Light', tokens: neutral, prefix: 'neutral' },
      neutralLightOverlay: { label: 'Neutras Light Overlay', tokens: neutralLightOverlay, prefix: 'opacity-neutrallight' },
      neutralDark: { label: 'Neutras Dark', tokens: neutralDark, prefix: 'neutraldark' },
      neutralDarkOverlay: { label: 'Neutras Dark Overlay', tokens: neutralDarkOverlay, prefix: 'opacity-neutraldark' },
      danger: { label: 'Danger', tokens: danger, prefix: 'danger' },
      dangerOverlay: { label: 'Danger Overlay', tokens: dangerOverlay, prefix: 'opacity-danger' },
      success: { label: 'Success', tokens: success, prefix: 'sucess' },
      successOverlay: { label: 'Success Overlay', tokens: successOverlay, prefix: 'opacity-sucess' },
      warning: { label: 'Warning', tokens: warning, prefix: 'warning' },
      warningOverlay: { label: 'Warning Overlay', tokens: warningOverlay, prefix: 'opacity-warning' },
      info: { label: 'Info', tokens: info, prefix: 'info' },
      infoOverlay: { label: 'Info Overlay', tokens: infoOverlay, prefix: 'opacity-info' },
    };

    const currentCat = categories[selectedCategory];
    const filteredEntries = Object.entries(currentCat.tokens).filter(
      ([step, val]) =>
        step.includes(searchTerm) ||
        val.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `--unooria-color-${currentCat.prefix}-${step}`.includes(searchTerm)
    );

    return (
      <div style={{ fontFamily: 'Open Sans, sans-serif', maxWidth: '1000px', margin: '0 auto', color: '#22272A' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
          Explorador Interativo de Tokens de Cores
        </h2>
        <p style={{ color: '#617379', marginBottom: '24px', fontSize: '14px' }}>
          Filtre por categoria de token ou busque diretamente por valor Hexadecimal, passo ou nome da variável CSS.
        </p>

        {/* Controles de Filtro e Busca */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
          <input
            type="text"
            placeholder="Buscar por #HEX, tom ou CSS var..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 18px',
              borderRadius: '10px',
              border: '1px solid #CBD4D6',
              fontSize: '14px',
              width: '320px',
              outline: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
            }}
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {Object.entries(categories).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: selectedCategory === key ? '#1670FA' : '#F5F5F5',
                  color: selectedCategory === key ? '#FFFFFF' : '#475157',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedCategory === key ? '0 2px 8px rgba(22, 112, 250, 0.25)' : 'none',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grade de Resultados */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {filteredEntries.map(([step, val]) => (
            <SwatchCard
              key={step}
              step={step}
              value={val}
              cssVar={`--unooria-color-${currentCat.prefix}-${step}`}
            />
          ))}
          {filteredEntries.length === 0 && (
            <div style={{ padding: '32px', color: '#7C8E94', width: '100%', textAlign: 'center' }}>
              Nenhum token encontrado para a busca "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Tabela Completa para Referência Rápida de Desenvolvedores
 */
export const TabelaDeTokens: Story = {
  render: () => {
    const allGroups = [
      { name: 'Brand Navy (Primária)', tokens: brandNavy, prefix: 'brandnavy' },
      { name: 'Brand Navy Overlay', tokens: brandNavyOverlay, prefix: 'opacity-brandnavy' },
      { name: 'Brand Purple (Secundária)', tokens: brandPurple, prefix: 'brandpurple' },
      { name: 'Brand Purple Overlay', tokens: brandPurpleOverlay, prefix: 'opacity-brandpurple' },
      { name: 'Brand Orange (Destaque)', tokens: brandOrange, prefix: 'brandorange' },
      { name: 'Brand Orange Overlay', tokens: brandOrangeOverlay, prefix: 'opacity-brandorange' },
      { name: 'Neutros Light', tokens: neutral, prefix: 'neutral' },
      { name: 'Neutros Light Overlay', tokens: neutralLightOverlay, prefix: 'opacity-neutrallight' },
      { name: 'Neutros Dark', tokens: neutralDark, prefix: 'neutraldark' },
      { name: 'Neutros Dark Overlay', tokens: neutralDarkOverlay, prefix: 'opacity-neutraldark' },
      { name: 'Danger', tokens: danger, prefix: 'danger' },
      { name: 'Danger Overlay', tokens: dangerOverlay, prefix: 'opacity-danger' },
      { name: 'Success', tokens: success, prefix: 'sucess' },
      { name: 'Success Overlay', tokens: successOverlay, prefix: 'opacity-sucess' },
      { name: 'Warning', tokens: warning, prefix: 'warning' },
      { name: 'Warning Overlay', tokens: warningOverlay, prefix: 'opacity-warning' },
      { name: 'Info', tokens: info, prefix: 'info' },
      { name: 'Info Overlay', tokens: infoOverlay, prefix: 'opacity-info' },
    ];

    return (
      <div style={{ fontFamily: 'Open Sans, sans-serif', maxWidth: '1100px', margin: '0 auto', color: '#22272A' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>
          Tabela Completa de Mapeamento dos Tokens de Cores
        </h2>

        <div
          style={{
            overflowX: 'auto',
            borderRadius: '16px',
            border: '1px solid #E4E8E9',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F5F5F5', borderBottom: '1px solid #CBD4D6' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Grupo</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Passo / Tom</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Variável CSS</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Amostra</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Valor Hex / RGBA</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'right' }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {allGroups.map((group) =>
                Object.entries(group.tokens).map(([step, value], idx) => {
                  const cssVar = `--unooria-color-${group.prefix}-${step}`;
                  return (
                    <tr
                      key={`${group.name}-${step}`}
                      style={{
                        borderBottom: '1px solid #E4E8E9',
                        backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F7F9FD',
                      }}
                    >
                      {idx === 0 ? (
                        <td
                          rowSpan={Object.keys(group.tokens).length}
                          style={{
                            padding: '12px 16px',
                            fontWeight: 700,
                            color: '#1670FA',
                            borderRight: '1px solid #E4E8E9',
                            verticalAlign: 'top',
                            backgroundColor: '#FFFFFF',
                          }}
                        >
                          {group.name}
                        </td>
                      ) : null}
                      <td style={{ padding: '10px 16px', fontWeight: 600 }}>{step}</td>
                      <td style={{ padding: '10px 16px', fontFamily: 'monospace', color: '#475157' }}>
                        {cssVar}
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            backgroundColor: value,
                            border: '1px solid rgba(0,0,0,0.15)',
                          }}
                        />
                      </td>
                      <td style={{ padding: '10px 16px', fontFamily: 'monospace', fontWeight: 600 }}>
                        {formatDisplayHex(value)}
                      </td>
                      <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                        <CopyBadge text={`var(${cssVar})`} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
};
