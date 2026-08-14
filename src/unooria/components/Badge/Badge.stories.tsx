import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { BadgeProps, BadgeVariant, BadgeSize } from './Badge.types';

// Ícones SVG utilitários para uso nas histórias
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.25 4.75L6 12L2.75 8.75" />
  </svg>
);

const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 1.5L1.5 13.5H14.5L8 1.5Z" />
    <path d="M8 6V9" />
    <path d="M8 11.5H8.01" />
  </svg>
);

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6.5" />
    <path d="M8 7.5V11.5" />
    <path d="M8 5H8.01" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1.25l2.25 4.56 5.03.73-3.64 3.55.86 5.01L8 12.74l-4.5 2.36.86-5.01-3.64-3.55 5.03-.73L8 1.25z" />
  </svg>
);

const BellIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6a4 4 0 018 0c0 4 2 5 2 5H2s2-1 2-5z" />
    <path d="M6.5 13.5a1.5 1.5 0 003 0" />
  </svg>
);

const meta: Meta<typeof Badge> = {
  title: 'Plataforma Unooria/Componentes/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Componente Badge - Plataforma Unooria

O **Badge** (ou etiqueta/pílula de status) é um componente compacto e versátil utilizado para indicar estados, contagens, avisos e categorias no Design System da Plataforma Unooria.

#### Características Principais:
- **Variantes e Status:** \`default\`, \`primary\`, \`success\`, \`warning\`, \`error\`, \`neutral\`, \`info\`.
- **Tamanhos:** \`sm\` (10px / h:20px), \`md\` (12px / h:24px), \`lg\` (14px / h:30px).
- **Temas:** Suporte nativo aos temas **Light** (\`theme="light"\`) e **Dark Mode** (\`theme="dark"\`).
- **Recursos Adicionais:** Ponto indicador de status (\`dot\`), ícones personalizados, pílula (\`pill\`), interatividade (\`onClick\`), desabilitado (\`disabled\`) e fechamento (\`dismissible\` + \`onClose\`).
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'neutral', 'info'],
      description: 'Define o estilo/status de cor do Badge.',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'neutral', 'info'],
      description: 'Alias alternativo para a propriedade variant.',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Define as dimensões e o tamanho tipográfico do Badge.',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Alterna entre os esquemas de cores Light Mode e Dark Mode.',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    dot: {
      control: 'boolean',
      description: 'Exibe um pequeno ponto (dot) de status colorido.',
    },
    pill: {
      control: 'boolean',
      description: 'Define se o formato é pílula totalmente arredondada (9999px).',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita interações e reduz a opacidade.',
    },
    dismissible: {
      control: 'boolean',
      description: 'Exibe o botão de fechamento (X).',
    },
    children: {
      control: 'text',
      description: 'Texto ou elemento exibido no corpo do Badge.',
    },
  },
  args: {
    children: 'Badge Label',
    variant: 'primary',
    size: 'md',
    theme: 'light',
    dot: false,
    pill: true,
    disabled: false,
    dismissible: false,
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

/**
 * História Padrão Interativa com Controls do Storybook
 */
export const Playground: Story = {
  args: {
    children: 'Status Ativo',
    variant: 'primary',
    size: 'md',
    theme: 'light',
  },
};

/**
 * Matriz de Todas as Variantes de Cores e Status
 */
export const TodasVariantes: Story = {
  render: () => {
    const variants: { name: BadgeVariant; label: string }[] = [
      { name: 'default', label: 'Default' },
      { name: 'primary', label: 'Primary' },
      { name: 'success', label: 'Success' },
      { name: 'warning', label: 'Warning' },
      { name: 'error', label: 'Error' },
      { name: 'neutral', label: 'Neutral' },
      { name: 'info', label: 'Info' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
        {/* Seção Light Mode */}
        <div style={{ padding: '24px', borderRadius: '16px', border: '1px solid #E4E8E9', backgroundColor: '#FFFFFF' }}>
          <h4 style={{ margin: '0 0 16px 0', fontFamily: 'Open Sans, sans-serif', color: '#22272A', fontSize: '16px', fontWeight: 700 }}>
            Modo Claro (Light Mode)
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {variants.map((v) => (
              <Badge key={v.name} variant={v.name} theme="light">
                {v.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Seção Dark Mode */}
        <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: '#22272A' }}>
          <h4 style={{ margin: '0 0 16px 0', fontFamily: 'Open Sans, sans-serif', color: '#FFFFFF', fontSize: '16px', fontWeight: 700 }}>
            Modo Escuro (Dark Mode)
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {variants.map((v) => (
              <Badge key={v.name} variant={v.name} theme="dark">
                {v.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Comparação de Tamanhos (sm, md, lg)
 */
export const Tamanhos: Story = {
  render: () => {
    const sizes: { size: BadgeSize; label: string }[] = [
      { size: 'sm', label: 'Small (20px)' },
      { size: 'md', label: 'Medium (24px)' },
      { size: 'lg', label: 'Large (30px)' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {sizes.map((s) => (
            <Badge key={s.size} size={s.size} variant="primary">
              {s.label}
            </Badge>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {sizes.map((s) => (
            <Badge key={s.size} size={s.size} variant="success" dot>
              {s.label}
            </Badge>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Badges com Pontos Indicadores de Status (Dot)
 */
export const ComStatusDot: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <Badge variant="success" dot theme="light">
          Online
        </Badge>
        <Badge variant="warning" dot theme="light">
          Aguardando
        </Badge>
        <Badge variant="error" dot theme="light">
          Erro crítico
        </Badge>
        <Badge variant="info" dot theme="light">
          Em análise
        </Badge>
        <Badge variant="primary" dot theme="light">
          Processando
        </Badge>
        <Badge variant="neutral" dot theme="light">
          Inativo
        </Badge>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '20px', backgroundColor: '#22272A', borderRadius: '12px' }}>
        <Badge variant="success" dot theme="dark">
          Online
        </Badge>
        <Badge variant="warning" dot theme="dark">
          Aguardando
        </Badge>
        <Badge variant="error" dot theme="dark">
          Erro crítico
        </Badge>
        <Badge variant="info" dot theme="dark">
          Em análise
        </Badge>
        <Badge variant="primary" dot theme="dark">
          Processando
        </Badge>
        <Badge variant="neutral" dot theme="dark">
          Inativo
        </Badge>
      </div>
    </div>
  ),
};

/**
 * Badges com Ícones Integrados
 */
export const ComIcones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <Badge variant="success" icon={<CheckIcon />}>
          Aprovado
        </Badge>
        <Badge variant="warning" icon={<AlertIcon />}>
          Atenção
        </Badge>
        <Badge variant="info" icon={<InfoIcon />}>
          Informativo
        </Badge>
        <Badge variant="primary" icon={<StarIcon />}>
          Destaque
        </Badge>
        <Badge variant="neutral" icon={<BellIcon />} iconPosition="right">
          Notificações (3)
        </Badge>
      </div>
    </div>
  ),
};

/**
 * Formato Pílula vs Arredondado Moderado
 */
export const PillVsSquare: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge variant="primary" pill={true}>
        Pill (Arredondado Máximo)
      </Badge>
      <Badge variant="primary" pill={false}>
        Square (Border Radius 4px)
      </Badge>
    </div>
  ),
};

/**
 * Badges Removíveis / Fecháveis (Dismissible)
 */
export const Removivel: Story = {
  render: () => {
    const [tags, setTags] = React.useState(['React', 'TypeScript', 'Storybook', 'Next.js', 'Unooria']);

    const handleRemove = (tagToRemove: string) => {
      setTags((prev) => prev.filter((t) => t !== tagToRemove));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: 0, fontSize: '14px', fontFamily: 'Open Sans, sans-serif', color: '#617379' }}>
          Clique no X para remover uma etiqueta:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {tags.map((tag) => (
            <Badge key={tag} variant="primary" dismissible onClose={() => handleRemove(tag)}>
              {tag}
            </Badge>
          ))}
          {tags.length === 0 && (
            <button
              onClick={() => setTags(['React', 'TypeScript', 'Storybook', 'Next.js', 'Unooria'])}
              style={{
                fontSize: '12px',
                padding: '4px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD4D6',
                cursor: 'pointer',
                background: '#FFFFFF',
              }}
            >
              Restaurar Etiquetas
            </button>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Badges Interativos com Ação de Clique
 */
export const Interativo: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Badge
        variant="info"
        onClick={() => alert('Badge clicado!')}
      >
        Clique aqui (Interativo)
      </Badge>
      <Badge
        variant="primary"
        disabled
        onClick={() => alert('Não deve disparar')}
      >
        Badge Desabilitado
      </Badge>
    </div>
  ),
};
