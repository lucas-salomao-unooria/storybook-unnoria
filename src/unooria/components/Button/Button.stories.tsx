import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ButtonProps, ButtonVariant, ButtonState, ButtonSize } from './Button.types';
import { UnooriaDocShell, UnooriaDocHeader } from '../../docs';

// Ícones SVG inline para estória interativa sem dependências externas
const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h8c1 0 2 1 2 2v2" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Plataforma Unooria/Componentes/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'O componente `Button` da Plataforma Unooria é o principal elemento de ação do sistema. Possui 5 variantes (Primary, Secondary, Outline, Ghost, Danger), 3 tamanhos (sm, md, lg), suporte completo a ícones e tratamento meticuloso de todos os estados isolados (Default, Hover, Active, Focus, Disabled, Loading) nos temas Light e Dark.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Variante estética do botão',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do botão',
      table: { defaultValue: { summary: 'md' } },
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'focus', 'disabled', 'loading'],
      description: 'Estado isolado forçado para testes visuais e documentação',
      table: { defaultValue: { summary: 'default' } },
    },
    isHovered: {
      control: 'boolean',
      description: 'Força o estilo de Hover',
    },
    isActive: {
      control: 'boolean',
      description: 'Força o estilo de Active (pressionado)',
    },
    isFocused: {
      control: 'boolean',
      description: 'Força o estilo de Focus',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Força o estado Desabilitado',
    },
    isLoading: {
      control: 'boolean',
      description: 'Exibe o indicador de Carregamento (Spinner)',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Ocupa 100% da largura do contêiner',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema de cor da interface',
      table: { defaultValue: { summary: 'light' } },
    },
    children: {
      control: 'text',
      description: 'Texto do botão',
    },
  },
  args: {
    children: 'Confirmar Ação',
    variant: 'primary',
    size: 'md',
    state: 'default',
    theme: 'light',
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Story Principal do Botão com Controles Interativos no Storybook Controls
 */
export const Playground: Story = {
  render: (args) => (
    <div
      style={{
        padding: '32px',
        backgroundColor: args.theme === 'dark' ? '#22272A' : '#FFFFFF',
        borderRadius: '16px',
        border: args.theme === 'dark' ? '1px solid #3D4448' : '1px solid #E4E8E9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Button {...args} />
    </div>
  ),
};

/**
 * Matriz Completa de Estados Isolados (Hover, Active, Focus, Disabled, Loading)
 * comparando todas as 5 variantes nos temas Claro e Escuro.
 */
export const MatrizDeEstados: Story = {
  render: () => {
    const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger'];
    const states: { label: string; stateProp: ButtonState }[] = [
      { label: 'Default', stateProp: 'default' },
      { label: 'Hover', stateProp: 'hover' },
      { label: 'Active', stateProp: 'active' },
      { label: 'Focus', stateProp: 'focus' },
      { label: 'Disabled', stateProp: 'disabled' },
      { label: 'Loading', stateProp: 'loading' },
    ];

    const renderMatrixForTheme = (theme: 'light' | 'dark') => (
      <div
        style={{
          backgroundColor: theme === 'dark' ? '#1C2023' : '#F8FAFC',
          padding: '24px',
          borderRadius: '16px',
          border: theme === 'dark' ? '1px solid #3D4448' : '1px solid #E2E8F0',
          marginBottom: '32px',
          color: theme === 'dark' ? '#F5F5F5' : '#22272A',
        }}
      >
        <h3
          style={{
            margin: '0 0 16px 0',
            fontSize: '18px',
            fontWeight: 700,
            color: theme === 'dark' ? '#7FA5E2' : '#2F4F7F',
            fontFamily: 'Open Sans, sans-serif',
          }}
        >
          {theme === 'light' ? '☀️ Tema Light (Modo Claro)' : '🌙 Tema Dark (Modo Escuro)'}
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${theme === 'dark' ? '#3D4448' : '#CBD4D6'}` }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 700 }}>Variante</th>
                {states.map((st) => (
                  <th key={st.label} style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 700 }}>
                    {st.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variants.map((variant) => (
                <tr
                  key={variant}
                  style={{
                    borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                  }}
                >
                  <td style={{ padding: '16px 12px', fontWeight: 600, fontSize: '14px', textTransform: 'capitalize' }}>
                    {variant}
                  </td>
                  {states.map((st) => (
                    <td key={st.label} style={{ padding: '16px 12px', textAlign: 'center' }}>
                      <Button
                        variant={variant}
                        size="md"
                        state={st.stateProp}
                        theme={theme}
                        leftIcon={st.stateProp === 'default' ? <PlusIcon /> : undefined}
                      >
                        {st.stateProp === 'loading' ? 'Salvando' : 'Botão'}
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

    return (
      <UnooriaDocShell>
        <UnooriaDocHeader
          category="Componentes • Ações"
          title="Matriz de Estados Isolados"
          description="Visualização simultânea de todas as variações estéticas do botão em cada um dos estados interativos (Default, Hover, Active, Focus, Disabled, Loading) nos dois temas suportados."
        />
        {renderMatrixForTheme('light')}
        {renderMatrixForTheme('dark')}
      </UnooriaDocShell>
    );
  },
};

/**
 * Exibição de todas as Variantes do Botão
 */
export const Variantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Open Sans, sans-serif' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
    </div>
  ),
};

/**
 * Exibição dos Tamanhos suportados (sm: 36px, md: 44px, lg: 52px)
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <Button size="sm" leftIcon={<PlusIcon />}>
        Small (36px)
      </Button>
      <Button size="md" leftIcon={<PlusIcon />}>
        Medium (44px)
      </Button>
      <Button size="lg" leftIcon={<PlusIcon />}>
        Large (52px)
      </Button>
    </div>
  ),
};

/**
 * Variações de Ícones (Esquerda, Direita, Ambos e Somente Ícone)
 */
export const ComIcones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary" leftIcon={<PlusIcon />}>
          Novo Item
        </Button>
        <Button variant="secondary" rightIcon={<ArrowRightIcon />}>
          Continuar
        </Button>
        <Button variant="outline" leftIcon={<DownloadIcon />} rightIcon={<StarIcon />}>
          Baixar Favorito
        </Button>
        <Button variant="danger" leftIcon={<TrashIcon />}>
          Excluir
        </Button>
        <Button variant="primary" size="md" aria-label="Adicionar item" leftIcon={<PlusIcon />} />
      </div>
    </div>
  ),
};

/**
 * Comparação Lado a Lado dos Temas Light e Dark
 */
export const ComparaTema: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', fontFamily: 'Open Sans, sans-serif' }}>
      {/* Light Theme Panel */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#22272A' }}>Modo Claro (Light)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button variant="primary" theme="light">Primary Light</Button>
          <Button variant="secondary" theme="light">Secondary Light</Button>
          <Button variant="outline" theme="light">Outline Light</Button>
          <Button variant="ghost" theme="light">Ghost Light</Button>
          <Button variant="danger" theme="light">Danger Light</Button>
        </div>
      </div>

      {/* Dark Theme Panel */}
      <div style={{ backgroundColor: '#22272A', padding: '24px', borderRadius: '16px', border: '1px solid #3D4448', color: '#FFFFFF' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#FFFFFF' }}>Modo Escuro (Dark)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button variant="primary" theme="dark">Primary Dark</Button>
          <Button variant="secondary" theme="dark">Secondary Dark</Button>
          <Button variant="outline" theme="dark">Outline Dark</Button>
          <Button variant="ghost" theme="dark">Ghost Dark</Button>
          <Button variant="danger" theme="dark">Danger Dark</Button>
        </div>
      </div>
    </div>
  ),
};
