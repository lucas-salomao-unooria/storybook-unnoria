import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../../src/unooria/components/Badge/Badge';
import { BadgeProps, BadgeVariant, BadgeSize } from '../../../src/unooria/components/Badge/Badge.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../src/unooria/docs';

// Ícones SVG utilitários inline para independência total
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13.25 4.75L6 12L2.75 8.75" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 1.5L1.5 13.5H14.5L8 1.5Z" />
    <path d="M8 6V9" />
    <path d="M8 11.5H8.01" />
  </svg>
);

const InfoCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" />
    <path d="M8 7.5V11.5" />
    <path d="M8 5H8.01" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1.25l2.25 4.56 5.03.73-3.64 3.55.86 5.01L8 12.74l-4.5 2.36.86-5.01-3.64-3.55 5.03-.73L8 1.25z" />
  </svg>
);

const BellIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6a4 4 0 018 0c0 4 2 5 2 5H2s2-1 2-5z" />
    <path d="M6.5 13.5a1.5 1.5 0 003 0" />
  </svg>
);

/**
 * Página de Documentação Rica do Badge baseada no Padrão Ouro do Design System Unooria
 */
const BadgeDocumentationPage = () => {
  const variantsList: { variant: BadgeVariant; label: string; desc: string }[] = [
    { variant: 'default', label: 'Default', desc: 'Estilo neutro discreto para identificadores gerais e metadados secundários.' },
    { variant: 'primary', label: 'Primary', desc: 'Destaque com a cor da marca Unooria para itens selecionados, planos ou novidades.' },
    { variant: 'success', label: 'Success', desc: 'Indica estados positivos, status Online, pagamentos confirmados ou aprovações.' },
    { variant: 'warning', label: 'Warning', desc: 'Alertas moderados, pendências, estados de espera ou itens sob análise.' },
    { variant: 'error', label: 'Error', desc: 'Falhas críticas, pagamentos recusados, cancelamentos ou urgências.' },
    { variant: 'neutral', label: 'Neutral', desc: 'Informações de apoio, rascunhos, itens arquivados ou estados desativados.' },
    { variant: 'info', label: 'Info', desc: 'Mensagens instrutivas, orientações do sistema, versões ou sincronização.' },
  ];

  const propsTableData = [
    {
      name: 'variant',
      type: "'default' | 'primary' | 'success' | 'warning' | 'error' | 'neutral' | 'info'",
      default: "'default'",
      desc: 'Define o estilo semântico, cor de fundo, borda e texto do Badge.',
    },
    {
      name: 'status',
      type: 'BadgeVariant',
      default: 'undefined',
      desc: 'Alias amigável para variant. Se ambos forem passados, variant prevalece.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      desc: 'Escala do Badge: sm (20px altura), md (24px altura) e lg (30px altura).',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Alterna a paleta de cores para os temas Claro e Escuro.',
    },
    {
      name: 'dot',
      type: 'boolean',
      default: 'false',
      desc: 'Exibe um ponto colorido circular antecedendo o conteúdo para sinalizar presença ou status.',
    },
    {
      name: 'pill',
      type: 'boolean',
      default: 'true',
      desc: 'Define o formato: se true aplica raio de borda em pílula (9999px), se false aplica bordas arredondadas (4px).',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Reduz a opacidade para 0.5 e desativa manipuladores de clique e eventos de ponteiro.',
    },
    {
      name: 'dismissible',
      type: 'boolean',
      default: 'false',
      desc: 'Renderiza um botão de fechar/remover (X) acessível ao lado do texto.',
    },
    {
      name: 'onClose',
      type: '(e: React.MouseEvent) => void',
      default: 'undefined',
      desc: 'Callback executado ao clicar no botão de fechamento (X).',
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Ícone opcional (SVG ou ReactNode) renderizado junto ao texto.',
    },
    {
      name: 'iconPosition',
      type: "'left' | 'right'",
      default: "'left'",
      desc: 'Posiciona o ícone antes (left) ou depois (right) do rótulo textual.',
    },
    {
      name: 'as',
      type: 'React.ElementType',
      default: "'span'",
      desc: 'Elemento ou componente HTML para renderização polimórfica (ex: "span", "a", "button", Link).',
    },
    {
      name: 'onClick',
      type: '(e: React.MouseEvent) => void',
      default: 'undefined',
      desc: 'Habilita o estado interativo com feedback visual de hover/active/focus e navegação por teclado.',
    },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Indicadores"
        title="Badge"
        description="O Badge é um componente visual compacto e versátil utilizado para evidenciar metadados, status operacionais, contagens numéricas, categorias e conquistas. Projetado para alto contraste, suporte a ícones, pontos de presença (dot), polimorfismo e total integração com os tokens do Unooria."
      />

      {/* 1. Visão Geral & Motivo de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Diretrizes do Figma"
          description="Conceitos fundamentais e razões de uso extraídos do Figma Design System"
          barColor="#0066FF"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              🏷️ Identificação Rápida de Status
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Permite aos usuários escanear listas, tabelas e cabeçalhos identificando imediatamente o estado de entidades (ex: <em>Pago</em>, <em>Pendente</em>, <em>Cancelado</em>, <em>Online</em>).
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              🔢 Contadores & Notificações
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Ideal para sinalizar volumes de itens não lidos, mensagens pendentes, notificações em sinos e métricas agregadas em cards.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              ✨ Formato Flexível & Pílula
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Suporta formato totalmente arredondado em pílula (<code style={{ fontSize: '12px' }}>pill=true</code>) ou cantos moderadamente arredondados (<code style={{ fontSize: '12px' }}>pill=false</code>).
            </p>
          </div>
        </div>
      </section>

      {/* 2. Matriz de Variantes & Tamanhos */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="2. Variantes Semânticas & Escala de Tamanhos"
          description="As 7 variações cromáticas e os 3 tamanhos dimensionais"
          barColor="#10B981"
        />

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', marginTop: '16px' }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            Variantes Cromáticas:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {variantsList.map((item) => (
              <div
                key={item.variant}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #F1F5F9',
                  backgroundColor: '#F8FAFC',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Badge variant={item.variant}>{item.label}</Badge>
                  <code style={{ fontSize: '11px', color: '#64748B' }}>{item.variant}</code>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            Escala de Tamanhos (`sm`, `md`, `lg`):
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Badge size="sm" variant="primary">Small (20px)</Badge>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Font: 11px</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Badge size="md" variant="primary">Medium (24px)</Badge>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Font: 12px (Padrão)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Badge size="lg" variant="primary">Large (30px)</Badge>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Font: 14px</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Recursos Avançados (Dot, Dismissible, Polimorfismo) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="3. Recursos Avançados & Interatividade"
          description="Ponto de status (dot), etiquetas removíveis (dismissible) e renderização polimórfica (as)"
          barColor="#F59E0B"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginTop: '16px' }}>
          <div style={{ padding: '20px', border: '1px solid #E2E8F0', borderRadius: '12px', backgroundColor: '#FFFFFF' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>
              🔴 Ponto de Status (`dot=true`)
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
              Insere um círculo pulsante na cor da variante para representar conexão, atividade em tempo real ou presença.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Badge variant="success" dot>Online</Badge>
              <Badge variant="warning" dot>Ausente</Badge>
              <Badge variant="error" dot>Ocupado</Badge>
            </div>
          </div>

          <div style={{ padding: '20px', border: '1px solid #E2E8F0', borderRadius: '12px', backgroundColor: '#FFFFFF' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>
              ❌ Etiquetas Removíveis (`dismissible=true`)
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
              Adiciona o botão de fechamento com manipulador <code style={{ fontSize: '12px' }}>onClose</code>, ideal para filtros ativos e tags.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Badge variant="primary" dismissible onClose={() => alert('Filtro removido!')}>Design</Badge>
              <Badge variant="info" dismissible onClose={() => alert('Filtro removido!')}>React</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Diretrizes de Design & Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="4. Diretrizes de Design & Boas Práticas" barColor="#EF4444" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
          {/* Do's */}
          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', color: '#166534', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span> O que fazer (Do&apos;s)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#15803D', lineHeight: '1.6' }}>
              <li>Utilize textos curtos de 1 ou 2 palavras (ex: &quot;Ativo&quot;, &quot;Pendente&quot;, &quot;Novo&quot;).</li>
              <li>Combine ícones e textos para reforçar a semântica sem depender exclusivamente da cor.</li>
              <li>Utilize a prop <code style={{ fontSize: '12px' }}>pill=true</code> como padrão consistente na interface.</li>
              <li>Adicione <code style={{ fontSize: '12px' }}>aria-label</code> descritivo quando o badge contiver apenas números ou símbolos.</li>
            </ul>
          </div>

          {/* Don'ts */}
          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', color: '#991B1B', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>❌</span> O que evitar (Don&apos;ts)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#B91C1C', lineHeight: '1.6' }}>
              <li>Não utilize sentenças longas ou parágrafos dentro de um Badge.</li>
              <li>Não utilize Badges como botões de ação principal (use o componente <code style={{ fontSize: '12px' }}>Button</code>).</li>
              <li>Não misture aleatoriamente tamanhos diferentes em uma mesma lista de tags.</li>
              <li>Não utilize cores semânticas conflitantes (ex: variante <code style={{ fontSize: '12px' }}>success</code> para cancelamentos).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Acessibilidade (WCAG) & Suporte a Temas */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="5. Acessibilidade (WCAG 2.1 AA) & Suporte a Temas" barColor="#06B6D4" />
        <div
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            marginBottom: '20px',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
            ♿ Acessibilidade Integrada
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#475569', lineHeight: '1.7' }}>
            <li>
              <strong>Contraste Garantido:</strong> Todas as 7 variantes atingem contraste superior a 4.5:1 com relação aos fundos de cada tema.
            </li>
            <li>
              <strong>Navegação por Teclado:</strong> Quando renderizado como interativo (<code style={{ fontSize: '12px' }}>onClick</code> ou <code style={{ fontSize: '12px' }}>as=&quot;button&quot;</code>), o Badge recebe foco via tecla <code style={{ fontSize: '12px' }}>Tab</code> e pode ser ativado com <code style={{ fontSize: '12px' }}>Enter</code> ou <code style={{ fontSize: '12px' }}>Space</code>.
            </li>
            <li>
              <strong>Botão Fechar Acessível:</strong> O botão de fechamento inclui <code style={{ fontSize: '12px' }}>aria-label=&quot;Fechar&quot;</code> nativo e foco por teclado.
            </li>
          </ul>
        </div>

        {/* Comparação Light vs Dark */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', border: '1px solid #E2E8F0', borderRadius: '12px', backgroundColor: '#FFFFFF' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#0284C7', fontSize: '15px' }}>☀️ Light Mode (Tema Claro)</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Badge theme="light" variant="primary">Primary</Badge>
              <Badge theme="light" variant="success">Success</Badge>
              <Badge theme="light" variant="warning">Warning</Badge>
              <Badge theme="light" variant="error">Error</Badge>
              <Badge theme="light" variant="info">Info</Badge>
            </div>
          </div>

          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#22272A', border: '1px solid #3D4448' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#38BDF8', fontSize: '15px' }}>🌙 Dark Mode (Tema Escuro)</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Badge theme="dark" variant="primary">Primary</Badge>
              <Badge theme="dark" variant="success">Success</Badge>
              <Badge theme="dark" variant="warning">Warning</Badge>
              <Badge theme="dark" variant="error">Error</Badge>
              <Badge theme="dark" variant="info">Info</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Props API Reference */}
      <section>
        <UnooriaDocSectionHeader title="6. Referência Completa das Propriedades (Props API)" barColor="#64748B" />
        <div style={{ overflowX: 'auto', marginTop: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Propriedade</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Padrão</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {propsTableData.map((prop) => (
                <tr key={prop.name} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0066FF', fontFamily: 'monospace' }}>{prop.name}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#475569', fontSize: '13px' }}>{prop.type}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#64748B', fontSize: '13px' }}>{prop.default}</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>{prop.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Badge> = {
  title: 'Plataforma Unooria/Componentes/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'neutral', 'info'],
      description: 'Variante semântica de cor e estilo do Badge.',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho e escala de altura do componente.',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Tema visual de cores do componente.',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    dot: {
      control: 'boolean',
      description: 'Exibe um ponto colorido antecedendo o texto.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    pill: {
      control: 'boolean',
      description: 'Aplica formato arredondado de pílula (9999px) ou suave (4px).',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o Badge reduzindo opacidade e bloqueando cliques.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    dismissible: {
      control: 'boolean',
      description: 'Exibe o botão de fechar/remover (X) acessível.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    iconPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Posição do ícone em relação ao texto.',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    children: {
      control: 'text',
      description: 'Conteúdo textual ou elementos internos do Badge.',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    theme: 'light',
    dot: false,
    pill: true,
    disabled: false,
    dismissible: false,
    children: 'Badge Unooria',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BadgeDocumentationPage />,
};

/**
 * Playground interativo com controles abrangentes e fundo adaptativo ao tema.
 */
export const Playground: Story = {
  render: (args) => (
    <div
      style={{
        padding: '32px',
        borderRadius: '12px',
        backgroundColor: args.theme === 'dark' ? '#1E293B' : '#F8FAFC',
        border: `1px solid ${args.theme === 'dark' ? '#334155' : '#E2E8F0'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '120px',
      }}
    >
      <Badge {...args} />
    </div>
  ),
  args: {
    variant: 'primary',
    size: 'md',
    theme: 'light',
    dot: false,
    pill: true,
    children: 'Badge Interativo',
  },
};

/**
 * Matriz visual com todas as 7 variantes semânticas nos temas Claro e Escuro.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#64748B' }}>Tema Claro (Light):</h5>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#22272A', borderRadius: '12px' }}>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#94A3B8' }}>Tema Escuro (Dark):</h5>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Badge theme="dark" variant="default">Default</Badge>
          <Badge theme="dark" variant="primary">Primary</Badge>
          <Badge theme="dark" variant="success">Success</Badge>
          <Badge theme="dark" variant="warning">Warning</Badge>
          <Badge theme="dark" variant="error">Error</Badge>
          <Badge theme="dark" variant="neutral">Neutral</Badge>
          <Badge theme="dark" variant="info">Info</Badge>
        </div>
      </div>
    </div>
  ),
};

/**
 * Escala de tamanhos suportados (sm: 20px, md: 24px, lg: 30px).
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <Badge size="sm" variant="primary">
        Small (20px)
      </Badge>
      <Badge size="md" variant="primary">
        Medium (24px)
      </Badge>
      <Badge size="lg" variant="primary">
        Large (30px)
      </Badge>
    </div>
  ),
};

/**
 * Indicadores com ponto de presença e status (dot={true}).
 */
export const ComDot: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <Badge variant="success" dot>Online</Badge>
        <Badge variant="warning" dot>Aguardando</Badge>
        <Badge variant="error" dot>Falha de Conexão</Badge>
        <Badge variant="info" dot>Sincronizando</Badge>
        <Badge variant="primary" dot>Processando</Badge>
        <Badge variant="neutral" dot>Inativo</Badge>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '16px', backgroundColor: '#22272A', borderRadius: '12px' }}>
        <Badge theme="dark" variant="success" dot>Online</Badge>
        <Badge theme="dark" variant="warning" dot>Aguardando</Badge>
        <Badge theme="dark" variant="error" dot>Falha de Conexão</Badge>
        <Badge theme="dark" variant="info" dot>Sincronizando</Badge>
      </div>
    </div>
  ),
};

/**
 * Badges com ícones integrados à esquerda ou à direita.
 */
export const ComIcones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Badge variant="success" icon={<CheckIcon />}>
        Aprovado
      </Badge>
      <Badge variant="warning" icon={<AlertTriangleIcon />}>
        Atenção
      </Badge>
      <Badge variant="info" icon={<InfoCircleIcon />}>
        Informação
      </Badge>
      <Badge variant="primary" icon={<StarIcon />}>
        Destaque
      </Badge>
      <Badge variant="neutral" icon={<BellIcon />} iconPosition="right">
        Notificações (3)
      </Badge>
    </div>
  ),
};

/**
 * Comparação de formato: Pílula (pill=true) vs Cantos Arredondados Suaves (pill=false).
 */
export const FormatoPillVsSquare: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="primary" pill={true}>
        Pill (Arredondamento 9999px)
      </Badge>
      <Badge variant="primary" pill={false}>
        Square (Border Radius 4px)
      </Badge>
      <Badge variant="success" pill={false} icon={<CheckIcon />}>
        Etiqueta Quadrada
      </Badge>
    </div>
  ),
};

/**
 * Badges Removíveis / Fecháveis (dismissible={true}) com gerenciamento de estado.
 */
export const Removivel: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Storybook', 'Next.js', 'Unooria']);

    const handleRemove = (tagToRemove: string) => {
      setTags((prev) => prev.filter((t) => t !== tagToRemove));
    };

    const handleRestore = () => {
      setTags(['React', 'TypeScript', 'Storybook', 'Next.js', 'Unooria']);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>
          Clique no botão &quot;X&quot; para remover uma etiqueta da lista de filtros:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          {tags.map((tag) => (
            <Badge key={tag} variant="primary" dismissible onClose={() => handleRemove(tag)}>
              {tag}
            </Badge>
          ))}
          {tags.length === 0 && (
            <button
              onClick={handleRestore}
              style={{
                fontSize: '12px',
                padding: '4px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                cursor: 'pointer',
                background: '#FFFFFF',
                color: '#006BFF',
                fontWeight: 600,
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
 * Badges Interativos com ação de clique e estado desabilitado.
 */
export const InterativoEEstados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge
        variant="info"
        onClick={() => alert('Badge interativo acionado!')}
        style={{ cursor: 'pointer' }}
      >
        Badge Clicável (Hover/Focus)
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

/**
 * Renderização polimórfica utilizando a propriedade `as` (ex: como link `<a>` ou `<button>`).
 */
export const Polimorfismo: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge
        as="a"
        href="https://unooria.com"
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        style={{ cursor: 'pointer', textDecoration: 'none' }}
      >
        Badge como Link &lt;a&gt; ↗
      </Badge>
      <Badge
        as="button"
        onClick={() => alert('Badge renderizado diretamente como <button>')}
        variant="success"
        style={{ cursor: 'pointer' }}
      >
        Badge como &lt;button&gt;
      </Badge>
    </div>
  ),
};

/**
 * Modo Escuro (Dark Mode) Isolado.
 */
export const ModoEscuro: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div style={{ padding: '24px', backgroundColor: '#22272A', borderRadius: '12px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge theme="dark" variant="primary" dot>Primary Dark</Badge>
      <Badge theme="dark" variant="success" icon={<CheckIcon />}>Aprovado</Badge>
      <Badge theme="dark" variant="warning" dot>Pendente</Badge>
      <Badge theme="dark" variant="error">Falha</Badge>
      <Badge theme="dark" variant="info" dismissible onClose={() => {}}>Filtro</Badge>
    </div>
  ),
};

/**
 * Comparação Lado a Lado dos Temas Light e Dark.
 */
export const ComparacaoTemas: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', border: '1px solid #CBD4D6', borderRadius: '12px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#22272A' }}>
          ☀️ Light Mode (Tema Claro)
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Badge theme="light" variant="primary">Primary</Badge>
          <Badge theme="light" variant="success">Success</Badge>
          <Badge theme="light" variant="warning">Warning</Badge>
          <Badge theme="light" variant="error">Error</Badge>
          <Badge theme="light" variant="info">Info</Badge>
        </div>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#22272A', borderRadius: '12px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#F1F5F9' }}>
          🌙 Dark Mode (Tema Escuro)
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Badge theme="dark" variant="primary">Primary</Badge>
          <Badge theme="dark" variant="success">Success</Badge>
          <Badge theme="dark" variant="warning">Warning</Badge>
          <Badge theme="dark" variant="error">Error</Badge>
          <Badge theme="dark" variant="info">Info</Badge>
        </div>
      </div>
    </div>
  ),
};

/**
 * Cenários Práticos Reais: Status de Pedidos, Notificações e Categorias de Produtos.
 */
export const CenariosReais: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '640px' }}>
      {/* Tabela de Pedidos */}
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
          Status de Pedidos em E-commerce
        </h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
            <span>Pedido #84920 (Lucas Salomão)</span>
            <Badge variant="success" dot>Entregue</Badge>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
            <span>Pedido #84921 (Mariana Costa)</span>
            <Badge variant="info" dot>Em Trânsito</Badge>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
            <span>Pedido #84922 (Roberto Silva)</span>
            <Badge variant="warning" dot>Aguardando Pagamento</Badge>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
            <span>Pedido #84923 (Fernanda Souza)</span>
            <Badge variant="error" dot>Cancelado</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
};
