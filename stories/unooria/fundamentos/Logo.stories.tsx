import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Logo } from '../../../src/unooria/components/Logo/Logo';
import { LogoSymbol } from '../../../src/unooria/components/Logo/LogoSymbol';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/Logo/Logo.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Página principal de documentação rica da Marca e Símbolo Unooria (Padrão Ouro)
 */
const LogoDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Fundamentos & Marca • Identidade Visual"
        title="Marca & Símbolo Unooria"
        description="Identidade visual oficial da Unooria baseada estritamente nos ativos de alta fidelidade enviados, contemplando a marca completa 'unooria®' e o símbolo (isótipo) nas variações preenchida e contorno."
      />

      {/* =========================================================================
          SEÇÃO 1: MARCA COMPLETA (WORDMARK)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="1. Marca Unooria (Wordmark Oficial)"
          description="Aplicações da marca nas 5 cores institucionais em fundos claros e escuros com proporção nativa exata (~4.64:1)."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Navy on White */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '36px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              minHeight: '140px',
              border: '1px solid #E4E8E9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <Logo size="md" color="navy" />
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
              Marca Navy (#0E1039) • Fundo Claro
            </span>
          </div>

          {/* Blue on White */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '36px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              minHeight: '140px',
              border: '1px solid #E4E8E9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <Logo size="md" color="blue" />
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
              Marca Sky Blue (#7FA5E2) • Fundo Claro
            </span>
          </div>

          {/* Lavender on Navy */}
          <div
            style={{
              backgroundColor: '#0B0C28',
              borderRadius: '16px',
              padding: '36px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              minHeight: '140px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            <Logo size="md" color="lavender" />
            <span style={{ fontSize: '12px', color: '#8886AA', fontWeight: 600 }}>
              Marca Lavanda (#8886AA) • Fundo Navy
            </span>
          </div>

          {/* Lavender on White */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '36px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              minHeight: '140px',
              border: '1px solid #E4E8E9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <Logo size="md" color="lavender" />
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
              Marca Lavanda (#8886AA) • Fundo Claro
            </span>
          </div>

          {/* Black on White */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '36px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              minHeight: '140px',
              border: '1px solid #E4E8E9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <Logo size="md" color="black" />
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
              Marca Preto (#000000) • Monocromático
            </span>
          </div>

          {/* White on Dark */}
          <div
            style={{
              backgroundColor: '#22272A',
              borderRadius: '16px',
              padding: '36px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              minHeight: '140px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            <Logo size="md" color="white" />
            <span style={{ fontSize: '12px', color: '#CBD4D6', fontWeight: 600 }}>
              Marca Branco (#FFFFFF) • Negativo / Dark
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: SÍMBOLO DA MARCA (ISÓTIPO)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="2. Símbolo Unooria (Isótipo Oficial)"
          description="Símbolo central com geometria orgânica suave nas versões Preenchida (Solid Fill) e Contorno (Outline)."
        />

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E4E8E9',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
          }}
        >
          {/* Variações Preenchidas */}
          <div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#22272A', display: 'block', marginBottom: '20px' }}>
              Variações Preenchidas (Solid Fill)
            </span>
            <div style={{ display: 'flex', gap: '36px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <LogoSymbol size="lg" color="navy" variant="fill" />
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Navy Fill</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <LogoSymbol size="lg" color="lavender" variant="fill" />
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Lavanda Fill</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <LogoSymbol size="lg" color="blue" variant="fill" />
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Sky Blue Fill</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', backgroundColor: '#0B0C28', padding: '16px 20px', borderRadius: '12px' }}>
                <LogoSymbol size="lg" color="white" variant="fill" />
                <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>Branco (Dark)</span>
              </div>
            </div>
          </div>

          {/* Variações de Contorno */}
          <div style={{ paddingTop: '24px', borderTop: '1px solid #F1F5F9' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#22272A', display: 'block', marginBottom: '20px' }}>
              Variações de Contorno (Outline / Stroke)
            </span>
            <div style={{ display: 'flex', gap: '36px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <LogoSymbol size="lg" color="navy" variant="outline" />
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Navy Outline</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <LogoSymbol size="lg" color="lavender" variant="outline" />
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Lavanda Outline</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <LogoSymbol size="lg" color="blue" variant="outline" />
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Sky Blue Outline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: ESCALA DE TAMANHOS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="3. Escala de Tamanhos"
          description="Preservação da legibilidade e proporção exata da marca em todas as escalas."
        />

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E4E8E9',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#22272A', display: 'block' }}>XL (64px altura)</span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Landing Pages, Hero e Telas de Login</span>
            </div>
            <Logo size="xl" color="navy" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#22272A', display: 'block' }}>LG (48px altura)</span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Cabeçalhos institucionais e marketing</span>
            </div>
            <Logo size="lg" color="navy" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#22272A', display: 'block' }}>MD (32px altura) — Padrão</span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Topbars de dashboards e sidebars expandidas</span>
            </div>
            <Logo size="md" color="navy" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#22272A', display: 'block' }}>SM (24px altura)</span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Mobile navbars e cartões compactos</span>
            </div>
            <Logo size="sm" color="navy" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#22272A', display: 'block' }}>XS (18px altura) — Mínimo</span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Rodapés e assinaturas em telas reduzidas</span>
            </div>
            <Logo size="xs" color="navy" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 4: SUPORTE A TEMAS EM TEMPO REAL
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <UnooriaDocSectionHeader
            title="4. Suporte a Temas em Tempo Real"
            description="Alternância adaptativa de cores com contraste adequado no Light e Dark Mode."
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTheme('light')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: activeTheme === 'light' ? '1px solid #0086FF' : '1px solid #CBD5E1',
                backgroundColor: activeTheme === 'light' ? '#0086FF' : '#FFFFFF',
                color: activeTheme === 'light' ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Light Mode
            </button>
            <button
              onClick={() => setActiveTheme('dark')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: activeTheme === 'dark' ? '1px solid #7FA5E2' : '1px solid #CBD5E1',
                backgroundColor: activeTheme === 'dark' ? '#0B0C28' : '#FFFFFF',
                color: activeTheme === 'dark' ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Dark Mode
            </button>
          </div>
        </div>

        <div
          style={{
            backgroundColor: activeTheme === 'dark' ? '#0B0C28' : '#F8FAFC',
            borderRadius: '16px',
            border: activeTheme === 'dark' ? '1px solid #383E41' : '1px solid #E4E8E9',
            padding: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '48px',
            transition: 'all 0.2s ease',
            flexWrap: 'wrap',
          }}
        >
          <Logo theme={activeTheme} size="lg" color={activeTheme === 'dark' ? 'lavender' : 'navy'} />
          <LogoSymbol theme={activeTheme} size="lg" color={activeTheme === 'dark' ? 'lavender' : 'navy'} />
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Logo> = {
  title: 'Plataforma Unooria/Fundamentos/Marca & Símbolo',
  component: Logo,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamanho oficial',
      defaultValue: 'md',
    },
    color: {
      control: 'select',
      options: ['auto', 'navy', 'blue', 'lavender', 'black', 'white'],
      description: 'Cor oficial da marca',
      defaultValue: 'navy',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual',
      defaultValue: 'light',
    },
  },
  args: {
    size: 'md',
    color: 'navy',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

/**
 * Documentação rica e completa da marca e símbolo baseada nas diretrizes e imagens oficiais da Unooria.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <LogoDocumentationPage />,
};

/**
 * Playground da Marca Unooria (Wordmark)
 */
export const PlaygroundMarca: Story = {
  name: '🕹️ 1. Playground da Marca (Wordmark)',
  render: (args) => (
    <div
      style={{
        padding: '48px',
        backgroundColor:
          args.theme === 'dark' || args.color === 'white' || args.color === 'lavender'
            ? '#0B0C28'
            : '#FFFFFF',
        borderRadius: '16px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: args.theme === 'light' ? '1px solid #E4E8E9' : 'none',
      }}
    >
      <Logo {...args} />
    </div>
  ),
};

/**
 * Playground do Símbolo / Isótipo
 */
export const PlaygroundSimbolo: Story = {
  name: '🕹️ 2. Playground do Símbolo (Isótipo)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '16px', display: 'flex', gap: '24px', alignItems: 'center', border: '1px solid #E4E8E9' }}>
        <LogoSymbol size="xs" color="navy" variant="fill" />
        <LogoSymbol size="sm" color="navy" variant="fill" />
        <LogoSymbol size="md" color="navy" variant="fill" />
        <LogoSymbol size="lg" color="navy" variant="fill" />
        <LogoSymbol size="xl" color="navy" variant="fill" />
      </div>

      <div style={{ padding: '32px', backgroundColor: '#0B0C28', borderRadius: '16px', display: 'flex', gap: '24px', alignItems: 'center' }}>
        <LogoSymbol size="xs" color="lavender" variant="fill" />
        <LogoSymbol size="sm" color="lavender" variant="fill" />
        <LogoSymbol size="md" color="lavender" variant="fill" />
        <LogoSymbol size="lg" color="lavender" variant="fill" />
        <LogoSymbol size="xl" color="lavender" variant="fill" />
      </div>

      <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '16px', display: 'flex', gap: '24px', alignItems: 'center', border: '1px solid #E4E8E9' }}>
        <LogoSymbol size="xs" color="navy" variant="outline" />
        <LogoSymbol size="sm" color="navy" variant="outline" />
        <LogoSymbol size="md" color="navy" variant="outline" />
        <LogoSymbol size="lg" color="navy" variant="outline" />
        <LogoSymbol size="xl" color="navy" variant="outline" />
      </div>
    </div>
  ),
};

/**
 * Matriz Completa das Cores Oficiais da Marca
 */
export const TodasCores: Story = {
  name: '🎨 Todas as Cores Oficiais',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
      <div style={{ backgroundColor: '#0B0C28', borderRadius: '16px', padding: '32px', display: 'flex', justifyContent: 'center' }}>
        <Logo size="md" color="lavender" />
      </div>
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E4E8E9', borderRadius: '16px', padding: '32px', display: 'flex', justifyContent: 'center' }}>
        <Logo size="md" color="blue" />
      </div>
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E4E8E9', borderRadius: '16px', padding: '32px', display: 'flex', justifyContent: 'center' }}>
        <Logo size="md" color="navy" />
      </div>
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E4E8E9', borderRadius: '16px', padding: '32px', display: 'flex', justifyContent: 'center' }}>
        <Logo size="md" color="lavender" />
      </div>
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E4E8E9', borderRadius: '16px', padding: '32px', display: 'flex', justifyContent: 'center' }}>
        <Logo size="md" color="black" />
      </div>
      <div style={{ backgroundColor: '#22272A', borderRadius: '16px', padding: '32px', display: 'flex', justifyContent: 'center' }}>
        <Logo size="md" color="white" />
      </div>
    </div>
  ),
};

/**
 * Matriz de Escala de Tamanhos
 */
export const MatrizDeTamanhos: Story = {
  name: 'Matriz de Tamanhos (XL, LG, MD, SM, XS)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
      <div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '8px' }}>XL (64px altura)</span>
        <Logo size="xl" color="navy" />
      </div>
      <div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '8px' }}>LG (48px altura)</span>
        <Logo size="lg" color="navy" />
      </div>
      <div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '8px' }}>MD (32px altura)</span>
        <Logo size="md" color="navy" />
      </div>
      <div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '8px' }}>SM (24px altura)</span>
        <Logo size="sm" color="navy" />
      </div>
      <div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '8px' }}>XS (18px altura)</span>
        <Logo size="xs" color="navy" />
      </div>
    </div>
  ),
};
