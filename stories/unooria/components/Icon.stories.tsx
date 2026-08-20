import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon } from '../../../src/unooria/components/Icon/Icon';
import { unooriaIconSizes, UnooriaIconSizeKey } from '../../../src/unooria/tokens/icons';
import '../../../src/unooria/tokens/icons.css';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

const IconDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Elementos Básicos"
        title="Icon"
        description="Componente React oficial para renderização de ícones no ecossistema Unooria. Suporta a biblioteca Material Symbols Rounded com tokens de tamanho (4XS a XL), espessura de traço, preenchimento óptico, animação contínua (spin) e marcas vetoriais customizadas do SENAI."
      />

      {/* 1. VISÃO GERAL & CASOS DE USO */}
      <section style={{ marginBottom: '48px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Casos de Uso"
          description="O componente Icon encapsula a renderização otimizada de fontes de ícones e SVGs com garantia de acessibilidade e consistência de escala."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: 'var(--unooria-color-neutral-50, #FFFFFF)', padding: '20px', borderRadius: '12px', border: '1px solid var(--unooria-color-neutral-150, #E4E8E9)' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>🎯</div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--unooria-color-neutral-950, #22272A)', margin: '0 0 6px 0' }}>Ações e Navegação</h4>
            <p style={{ fontSize: '13px', color: 'var(--unooria-color-neutral-500, #617379)', margin: 0, lineHeight: 1.5 }}>
              Utilizado dentro de botões, sidebars, breadcrumbs, abas e links para guiar e acelerar o reconhecimento das ações.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--unooria-color-neutral-50, #FFFFFF)', padding: '20px', borderRadius: '12px', border: '1px solid var(--unooria-color-neutral-150, #E4E8E9)' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>💡</div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--unooria-color-neutral-950, #22272A)', margin: '0 0 6px 0' }}>Feedbacks e Alertas</h4>
            <p style={{ fontSize: '13px', color: 'var(--unooria-color-neutral-500, #617379)', margin: 0, lineHeight: 1.5 }}>
              Sinaliza estados de sucesso, perigo, aviso e informação em componentes como <code>AlertBox</code>, <code>FeedbackAlert</code> e <code>Badge</code>.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--unooria-color-neutral-50, #FFFFFF)', padding: '20px', borderRadius: '12px', border: '1px solid var(--unooria-color-neutral-150, #E4E8E9)' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>🏢</div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--unooria-color-neutral-950, #22272A)', margin: '0 0 6px 0' }}>Marcas Institucionais SENAI</h4>
            <p style={{ fontSize: '13px', color: 'var(--unooria-color-neutral-500, #617379)', margin: 0, lineHeight: 1.5 }}>
              Integração nativa com 5 marcas SVG do SENAI (Mundo SENAI, Futuro Digital, Aprendizagem Nacional, Estante Virtual, SENAI Play).
            </p>
          </div>
        </div>
      </section>

      {/* 2. MATRIZ DE TAMANHOS */}
      <section style={{ marginBottom: '48px' }}>
        <UnooriaDocSectionHeader
          title="2. Matriz de Tamanhos Suportados"
          description="Comparação direta dos 8 tamanhos de tokens renderizados com o componente oficial."
        />

        <div
          style={{
            backgroundColor: 'var(--unooria-color-neutral-50, #FFFFFF)',
            borderRadius: '16px',
            border: '1px solid var(--unooria-color-neutral-150, #E4E8E9)',
            padding: '32px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          {(['4XS', '3XS', 'XXS', 'XS', 'S', 'M', 'L', 'XL'] as UnooriaIconSizeKey[]).map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="verified" size={s} color="var(--unooria-color-info-500, #0086FF)" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--unooria-color-neutral-950, #22272A)' }}>{s}</div>
                <div style={{ fontSize: '11px', color: 'var(--unooria-color-neutral-500, #617379)', fontFamily: 'monospace' }}>{unooriaIconSizes[s]}px</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MARCAS CUSTOMIZADAS DO SENAI */}
      <section style={{ marginBottom: '48px' }}>
        <UnooriaDocSectionHeader
          title="3. Marcas Vetoriais Customizadas do SENAI"
          description="O componente detecta automaticamente nomes de marcas do SENAI e renderiza o SVG otimizado em alta definição."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { name: 'mundo-senai', label: 'Mundo SENAI' },
            { name: 'futuro-digital', label: 'Futuro Digital' },
            { name: 'aprendizagem-nacional', label: 'Aprendizagem Nacional' },
            { name: 'estante-virtual', label: 'Estante Virtual' },
            { name: 'senai-play', label: 'SENAI Play' },
          ].map((item) => (
            <div
              key={item.name}
              style={{
                backgroundColor: 'var(--unooria-color-neutral-50, #FFFFFF)',
                borderRadius: '12px',
                border: '1px solid var(--unooria-color-neutral-150, #E4E8E9)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--unooria-color-brandnavy-50, #F5F8FC)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name={item.name} size="m" color="var(--unooria-color-brandnavy-600, #7FA5E2)" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--unooria-color-neutral-950, #22272A)' }}>{item.label}</div>
                <code style={{ fontSize: '11px', color: 'var(--unooria-color-neutral-500, #617379)', backgroundColor: 'var(--unooria-color-neutral-100, #F5F5F5)', padding: '2px 6px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>
                  name=&quot;{item.name}&quot;
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SUPORTE A TEMAS */}
      <section style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <UnooriaDocSectionHeader
            title="4. Suporte a Temas (Light & Dark)"
            description="Demonstração em tempo real com herança correta de cor em superfícies claras e escuras."
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTheme('light')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: activeTheme === 'light' ? '1px solid var(--unooria-color-info-500, #0086FF)' : '1px solid var(--unooria-color-neutral-200, #CBD4D6)',
                backgroundColor: activeTheme === 'light' ? 'var(--unooria-color-info-500, #0086FF)' : 'var(--unooria-color-neutral-50, #FFFFFF)',
                color: activeTheme === 'light' ? 'var(--unooria-color-neutral-50, #FFFFFF)' : 'var(--unooria-color-neutral-800, #3D4448)',
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
                border: activeTheme === 'dark' ? '1px solid var(--unooria-color-brandnavy-600, #7FA5E2)' : '1px solid var(--unooria-color-neutral-200, #CBD4D6)',
                backgroundColor: activeTheme === 'dark' ? 'var(--unooria-color-neutraldark-50, #22272A)' : 'var(--unooria-color-neutral-50, #FFFFFF)',
                color: activeTheme === 'dark' ? 'var(--unooria-color-neutraldark-950, #F5F5F5)' : 'var(--unooria-color-neutral-800, #3D4448)',
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
            backgroundColor: activeTheme === 'dark' ? 'var(--unooria-color-neutraldark-50, #22272A)' : 'var(--unooria-color-neutral-50, #FFFFFF)',
            color: activeTheme === 'dark' ? 'var(--unooria-color-neutraldark-950, #F5F5F5)' : 'var(--unooria-color-neutral-950, #22272A)',
            borderRadius: '16px',
            border: activeTheme === 'dark' ? '1px solid var(--unooria-color-neutraldark-300, #475157)' : '1px solid var(--unooria-color-neutral-150, #E4E8E9)',
            padding: '32px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon name="search" size="s" color={activeTheme === 'dark' ? 'var(--unooria-color-neutral-50, #FFFFFF)' : 'var(--unooria-color-neutral-950, #22272A)'} />
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Busca</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon name="settings" size="s" color={activeTheme === 'dark' ? 'var(--unooria-color-neutral-300, #A7B5B9)' : 'var(--unooria-color-neutral-700, #475157)'} />
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Configurações</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon name="favorite" size="s" fill color="var(--unooria-color-danger-500, #F83B3B)" />
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Favoritos</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon name="progress_activity" size="s" spin color={activeTheme === 'dark' ? 'var(--unooria-color-brandnavy-600, #7FA5E2)' : 'var(--unooria-color-info-500, #0086FF)'} />
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Carregando...</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon name="mundo-senai" size="s" color={activeTheme === 'dark' ? 'var(--unooria-color-brandnavy-600, #7FA5E2)' : 'var(--unooria-color-brandnavy-600, #7FA5E2)'} />
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Mundo SENAI</span>
          </div>
        </div>
      </section>

      {/* 5. TABELA DE PROPS */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="5. Referência Completa de Props da API"
          description="Todas as propriedades aceitas pelo componente React Icon."
        />

        <div style={{ backgroundColor: 'var(--unooria-color-neutral-50, #FFFFFF)', borderRadius: '16px', border: '1px solid var(--unooria-color-neutral-150, #E4E8E9)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--unooria-color-neutral-100, #F5F5F5)', borderBottom: '1px solid var(--unooria-color-neutral-150, #E4E8E9)' }}>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--unooria-color-neutral-800, #3D4448)' }}>Prop</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--unooria-color-neutral-800, #3D4448)' }}>Tipo</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--unooria-color-neutral-800, #3D4448)' }}>Padrão</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--unooria-color-neutral-800, #3D4448)' }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--unooria-color-neutral-150, #E4E8E9)' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--unooria-color-brandnavy-600, #7FA5E2)' }}>name</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: 'var(--unooria-color-neutral-500, #617379)' }}>string</td>
                <td style={{ padding: '12px 18px', color: 'var(--unooria-color-danger-600, #E31A1A)', fontWeight: 600 }}>Obrigatório</td>
                <td style={{ padding: '12px 18px', color: 'var(--unooria-color-neutral-800, #3D4448)' }}>Nome do ícone no Material Symbols ou marca SENAI (ex: &apos;search&apos;, &apos;mundo-senai&apos;).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--unooria-color-neutral-150, #E4E8E9)' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--unooria-color-brandnavy-600, #7FA5E2)' }}>size</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: 'var(--unooria-color-neutral-500, #617379)' }}>&apos;4xs&apos; | &apos;3xs&apos; | &apos;xxs&apos; | &apos;xs&apos; | &apos;s&apos; | &apos;m&apos; | &apos;l&apos; | &apos;xl&apos; | number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>&apos;s&apos; (24px)</td>
                <td style={{ padding: '12px 18px', color: 'var(--unooria-color-neutral-800, #3D4448)' }}>Tamanho baseado na escala de tokens ou pixels numéricos.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--unooria-color-neutral-150, #E4E8E9)' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--unooria-color-brandnavy-600, #7FA5E2)' }}>weight</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: 'var(--unooria-color-neutral-500, #617379)' }}>100 | 200 | 300 | 400 | 500 | 600 | 700</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>300</td>
                <td style={{ padding: '12px 18px', color: 'var(--unooria-color-neutral-800, #3D4448)' }}>Espessura da linha da fonte de ícones.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--unooria-color-neutral-150, #E4E8E9)' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--unooria-color-brandnavy-600, #7FA5E2)' }}>fill</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: 'var(--unooria-color-neutral-500, #617379)' }}>boolean | 0 | 1</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false (0)</td>
                <td style={{ padding: '12px 18px', color: 'var(--unooria-color-neutral-800, #3D4448)' }}>Alterna entre visual vazado (outline) e preenchido.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--unooria-color-neutral-150, #E4E8E9)' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--unooria-color-brandnavy-600, #7FA5E2)' }}>color</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: 'var(--unooria-color-neutral-500, #617379)' }}>string</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>&apos;currentColor&apos;</td>
                <td style={{ padding: '12px 18px', color: 'var(--unooria-color-neutral-800, #3D4448)' }}>Cor do ícone em formato CSS hexadecimal, RGB ou variável de token (ex: var(--unooria-color-brandnavy-600)).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--unooria-color-neutral-150, #E4E8E9)' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--unooria-color-brandnavy-600, #7FA5E2)' }}>spin</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: 'var(--unooria-color-neutral-500, #617379)' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: 'var(--unooria-color-neutral-800, #3D4448)' }}>Aplica rotação contínua em 360° para ícones de carregamento/processamento.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--unooria-color-brandnavy-600, #7FA5E2)' }}>aria-label</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: 'var(--unooria-color-neutral-500, #617379)' }}>string</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: 'var(--unooria-color-neutral-800, #3D4448)' }}>Texto alternativo acessível para leitores de tela quando o ícone tiver significado próprio.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Icon> = {
  title: 'Plataforma Unooria/Componentes/Icon',
  component: Icon,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Nome do ícone no Material Symbols ou marca SENAI',
      defaultValue: 'search',
    },
    size: {
      control: 'select',
      options: ['4xs', '3xs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 16, 24, 32, 48],
      description: 'Tamanho do ícone pela escala de tokens ou número em px',
    },
    weight: {
      control: 'select',
      options: [100, 200, 300, 400, 500, 600, 700],
      description: 'Espessura do traço (wght)',
    },
    fill: {
      control: 'boolean',
      description: 'Preenchimento (0 = Off, 1 = On)',
    },
    color: {
      control: 'color',
      description: 'Cor do ícone',
    },
    spin: {
      control: 'boolean',
      description: 'Animação de rotação contínua (spin)',
    },
    rotate: {
      control: 'number',
      description: 'Graus de rotação estática',
    },
  },
  args: {
    name: 'search',
    size: 's',
    weight: 300,
    fill: false,
    color: '#22272A',
    spin: false,
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <IconDocumentationPage />,
};

/**
 * Playground interativo com 100% das props mapeadas nos controles do Storybook.
 */
export const Playground: Story = {
  name: '🕹️ Playground Interativo',
  args: {
    name: 'search',
    size: 's',
    weight: 300,
    fill: false,
    color: '#0086FF',
    spin: false,
  },
};

/**
 * Todas as variantes de tamanho renderizadas lado a lado.
 */
export const TodasVariantesTamanho: Story = {
  name: 'Tamanhos (4XS a XL)',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
      <Icon name="search" size="4xs" />
      <Icon name="search" size="3xs" />
      <Icon name="search" size="xxs" />
      <Icon name="search" size="xs" />
      <Icon name="search" size="s" />
      <Icon name="search" size="m" />
      <Icon name="search" size="l" />
      <Icon name="search" size="xl" />
    </div>
  ),
};

/**
 * Marcas customizadas vetoriais do SENAI.
 */
export const MarcasCustomizadasSENAI: Story = {
  name: 'Marcas SENAI (SVGs)',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
      <Icon name="mundo-senai" size="m" color="#0086FF" />
      <Icon name="futuro-digital" size="m" color="#0086FF" />
      <Icon name="aprendizagem-nacional" size="m" color="#0086FF" />
      <Icon name="estante-virtual" size="m" color="#0086FF" />
      <Icon name="senai-play" size="m" color="#0086FF" />
    </div>
  ),
};

/**
 * Ícone com animação de carregamento (spin).
 */
export const LoaderAnimado: Story = {
  name: 'Loader Animado (Spin)',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Icon name="progress_activity" size="s" spin color="#0086FF" />
      <Icon name="sync" size="s" spin color="#01B574" />
      <Icon name="refresh" size="m" spin color="#7FA5E2" />
    </div>
  ),
};
