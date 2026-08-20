import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Breadcrumb } from '../../../src/unooria/components/Breadcrumb/Breadcrumb';
import { BreadcrumbItem } from '../../../src/unooria/components/Breadcrumb/Breadcrumb.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

// Ícones SVG inline para ilustrar navegação hierárquica
const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const FolderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const DatabaseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

// Separadores visuais customizados
const SlashSeparator = () => <span style={{ opacity: 0.6, fontSize: '0.9em', fontWeight: 600 }}>/</span>;
const ArrowSeparator = () => <span style={{ opacity: 0.7, fontSize: '0.9em' }}>→</span>;
const DotSeparator = () => <span style={{ opacity: 0.5, fontSize: '1.1em' }}>•</span>;

const defaultBreadcrumbItems: BreadcrumbItem[] = [
  { label: 'Início', href: '#', icon: <HomeIcon /> },
  { label: 'Configurações', href: '#', icon: <SettingsIcon /> },
  { label: 'Usuários e Equipes', href: '#', icon: <UserIcon /> },
  { label: 'Permissões de Acesso', isCurrent: true },
];

/**
 * Página de Documentação Rica do Breadcrumb baseada no Padrão Ouro do Design System Unooria
 */
const BreadcrumbDocumentationPage = () => {
  const propsTableData = [
    {
      name: 'items',
      type: 'BreadcrumbItem[]',
      default: 'Obrigatório',
      desc: 'Lista ordenada de itens representando o caminho hierárquico da raiz até a página atual.',
    },
    {
      name: 'size',
      type: "'xs' | 's' | 'm'",
      default: "'s'",
      desc: 'Escala tipográfica e de espaçamento (xs: 12px, s: 14px padrão, m: 16px).',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Tema visual de cores para superfícies claras ou escuras.',
    },
    {
      name: 'separator',
      type: 'React.ReactNode',
      default: '<ChevronRight />',
      desc: 'Elemento ou ícone visual posicionado entre cada item da trilha.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Breadcrumb'",
      desc: 'Rótulo acessível fornecido ao elemento nav para leitores de tela.',
    },
    {
      name: 'maxItems',
      type: 'number',
      default: 'undefined',
      desc: 'Quantidade máxima de itens visíveis antes de colapsar os intermediários em um botão "...".',
    },
    {
      name: 'itemsBeforeCollapse',
      type: 'number',
      default: '1',
      desc: 'Número de itens visíveis no início da trilha antes do botão de colapso.',
    },
    {
      name: 'itemsAfterCollapse',
      type: 'number',
      default: '1',
      desc: 'Número de itens visíveis no final da trilha após o botão de colapso.',
    },
  ];

  const itemPropsData = [
    { name: 'label', type: 'React.ReactNode', desc: 'Rótulo textual ou elemento visual do item.' },
    { name: 'href', type: 'string', desc: 'URL de destino para navegação. Omitido se isCurrent for true.' },
    { name: 'icon', type: 'React.ReactNode', desc: 'Ícone opcional posicionado antes do rótulo.' },
    { name: 'isCurrent', type: 'boolean', desc: 'Indica a página atual, aplicando aria-current="page" e desativando o link.' },
    { name: 'onClick', type: '(event: MouseEvent) => void', desc: 'Callback disparado ao clicar no item.' },
    { name: 'as', type: 'React.ElementType', desc: 'Componente polimórfico de link (ex: Next.js Link, React Router Link).' },
    { name: 'ariaLabel', type: 'string', desc: 'Rótulo acessível individual para o item.' },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Navegação"
        title="Breadcrumb"
        description="O Breadcrumb é um elemento de navegação estrutural secundária que revela a posição do usuário na arquitetura de informação da aplicação. Proporciona orientação espacial imediata, atalhos de retorno a níveis superiores, colapso inteligente de caminhos profundos (maxItems) e suporte nativo a Next.js Link / React Router."
      />

      {/* 1. Visão Geral & Motivo de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Motivos de Uso"
          description="Diretrizes de arquitetura de informação e usabilidade da Plataforma Unooria"
          barColor="#006BFF"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              📍 Orientação Hierárquica
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Permite ao usuário identificar onde está situado na hierarquia do sistema, mesmo quando chega via links externos, busca ou favoritos.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              ⚡ Retorno Rápido com Menos Cliques
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Facilita o salto direto para categorias ou diretórios pais superiores sem a necessidade de clicar repetidamente no botão Voltar do navegador.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              ↔️ Colapso Inteligente (`maxItems`)
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Em caminhos com muitos níveis de profundidade, agrupa itens intermediários em um botão interativo <code style={{ fontSize: '12px' }}>...</code> para evitar quebra de layout.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Anatomia & Tamanhos */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="2. Anatomia do Componente & Escala de Tamanhos"
          description="Elementos constituintes da trilha e as 3 escalas tipográficas suportadas"
          barColor="#10B981"
        />

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', marginTop: '16px' }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            Demonstração de Anatomia:
          </h4>
          <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', marginBottom: '20px' }}>
            <Breadcrumb items={defaultBreadcrumbItems} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '13px', marginBottom: '24px' }}>
            <div style={{ padding: '12px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}>
              <strong style={{ color: '#006BFF', display: 'block' }}>1. Item Raiz (Home):</strong>
              Ponto de partida global com suporte a ícones.
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}>
              <strong style={{ color: '#006BFF', display: 'block' }}>2. Separador:</strong>
              Ícone de Chevron com <code style={{ fontSize: '11px' }}>aria-hidden=&quot;true&quot;</code>.
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}>
              <strong style={{ color: '#006BFF', display: 'block' }}>3. Links Intermediários:</strong>
              Níveis pais clicáveis com foco acessível e polimorfismo.
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}>
              <strong style={{ color: '#006BFF', display: 'block' }}>4. Página Atual:</strong>
              Último item com <code style={{ fontSize: '11px' }}>aria-current=&quot;page&quot;</code> em negrito.
            </div>
          </div>

          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            Escala de Tamanhos (`xs`, `s`, `m`):
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '4px' }}>
                Tamanho XS (Extra Small - 12px):
              </span>
              <Breadcrumb size="xs" items={defaultBreadcrumbItems} />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '4px' }}>
                Tamanho S (Small - 14px / Padrão):
              </span>
              <Breadcrumb size="s" items={defaultBreadcrumbItems} />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '4px' }}>
                Tamanho M (Medium - 16px):
              </span>
              <Breadcrumb size="m" items={defaultBreadcrumbItems} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Diretrizes de Design & Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="3. Diretrizes de Design & Boas Práticas" barColor="#EF4444" />
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
              <li>Reflita a hierarquia real da aplicação, não o histórico aleatório de páginas visitadas.</li>
              <li>Sempre marque o último item como <code style={{ fontSize: '12px' }}>isCurrent: true</code> para sinalizar a página ativa.</li>
              <li>Utilize <code style={{ fontSize: '12px' }}>maxItems</code> em sistemas com mais de 4 níveis de profundidade.</li>
              <li>Integre com bibliotecas de roteamento SPA usando a propriedade <code style={{ fontSize: '12px' }}>as</code>.</li>
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
              <li>Não utilize o Breadcrumb como substituto da navegação primária (Header/Sidebar).</li>
              <li>Não transforme o último item (página atual) em um link clicável redundante.</li>
              <li>Não polua os leitores de tela: garanta que separadores tenham <code style={{ fontSize: '12px' }}>aria-hidden=&quot;true&quot;</code>.</li>
              <li>Não utilize Breadcrumbs em páginas de primeiro nível (Dashboard/Home).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Acessibilidade & Suporte a Temas */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="4. Acessibilidade (WCAG 2.1 AA) & Suporte a Temas" barColor="#06B6D4" />
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
            ♿ Semântica e Conformidade Acessível
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#475569', lineHeight: '1.7' }}>
            <li>
              <strong>Estrutura Landmark:</strong> Renderizado dentro de um elemento <code style={{ fontSize: '12px' }}>&lt;nav aria-label=&quot;Breadcrumb&quot;&gt;</code> com lista ordenada <code style={{ fontSize: '12px' }}>&lt;ol&gt;</code> e itens <code style={{ fontSize: '12px' }}>&lt;li&gt;</code>.
            </li>
            <li>
              <strong>Página Ativa:</strong> O item corrente recebe o atributo oficial <code style={{ fontSize: '12px' }}>aria-current=&quot;page&quot;</code>.
            </li>
            <li>
              <strong>Foco por Teclado:</strong> Todos os links intermediários e o botão de colapso <code style={{ fontSize: '12px' }}>...</code> possuem anéis de foco visíveis e acionamento por <code style={{ fontSize: '12px' }}>Enter</code>.
            </li>
          </ul>
        </div>

        {/* Comparação Light vs Dark */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', border: '1px solid #CBD4D6', borderRadius: '12px', backgroundColor: '#FFFFFF' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#22272A', fontSize: '14px', fontWeight: 700 }}>☀️ Light Mode (Tema Claro)</h4>
            <Breadcrumb theme="light" items={defaultBreadcrumbItems} />
          </div>

          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#22272A' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#F1F5F9', fontSize: '14px', fontWeight: 700 }}>🌙 Dark Mode (Tema Escuro)</h4>
            <Breadcrumb theme="dark" items={defaultBreadcrumbItems} />
          </div>
        </div>
      </section>

      {/* 5. Props API Reference */}
      <section>
        <UnooriaDocSectionHeader title="5. Referência das Propriedades (Props API)" barColor="#64748B" />
        <div style={{ overflowX: 'auto', marginTop: '16px', marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>
            BreadcrumbProps
          </h4>
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

        <div style={{ overflowX: 'auto' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>
            BreadcrumbItem (Estrutura de cada item)
          </h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Propriedade</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {itemPropsData.map((prop) => (
                <tr key={prop.name} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0066FF', fontFamily: 'monospace' }}>{prop.name}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#475569', fontSize: '13px' }}>{prop.type}</td>
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

const meta: Meta<typeof Breadcrumb> = {
  title: 'Plataforma Unooria/Componentes/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['xs', 's', 'm'],
      description: 'Tamanho e escala tipográfica do Breadcrumb.',
      table: {
        defaultValue: { summary: 's' },
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
    maxItems: {
      control: 'number',
      description: 'Número máximo de itens visíveis antes de colapsar.',
    },
    itemsBeforeCollapse: {
      control: 'number',
      description: 'Itens visíveis no início antes do botão de colapso.',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    itemsAfterCollapse: {
      control: 'number',
      description: 'Itens visíveis no final após o botão de colapso.',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Rótulo acessível da navegação para leitores de tela.',
      table: {
        defaultValue: { summary: 'Breadcrumb' },
      },
    },
  },
  args: {
    size: 's',
    theme: 'light',
    items: defaultBreadcrumbItems,
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BreadcrumbDocumentationPage />,
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
      }}
    >
      <Breadcrumb {...args} />
    </div>
  ),
  args: {
    size: 's',
    theme: 'light',
    items: [
      { label: 'Início', href: '#', icon: <HomeIcon /> },
      { label: 'Projetos', href: '#' },
      { label: 'Design System', href: '#' },
      { label: 'Componente Breadcrumb', isCurrent: true },
    ],
  },
};

/**
 * Comparação visual dos 3 tamanhos tipográficos suportados (`xs`, `s`, `m`).
 */
export const TodosTamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
          Tamanho XS (Extra Small - 12px):
        </span>
        <Breadcrumb size="xs" items={defaultBreadcrumbItems} />
      </div>

      <div>
        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
          Tamanho S (Small - 14px / Padrão):
        </span>
        <Breadcrumb size="s" items={defaultBreadcrumbItems} />
      </div>

      <div>
        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
          Tamanho M (Medium - 16px):
        </span>
        <Breadcrumb size="m" items={defaultBreadcrumbItems} />
      </div>
    </div>
  ),
};

/**
 * Trilha de Breadcrumb enriquecida com ícones contextuais em cada etapa.
 */
export const ComIcones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Breadcrumb
        size="s"
        items={[
          { label: 'Dashboard', href: '#', icon: <HomeIcon /> },
          { label: 'Armazenamento', href: '#', icon: <FolderIcon /> },
          { label: 'Bancos de Dados', href: '#', icon: <DatabaseIcon /> },
          { label: 'Configurações de Réplica', isCurrent: true, icon: <SettingsIcon /> },
        ]}
      />
    </div>
  ),
};

/**
 * Separadores Customizados (Barra `/`, Seta `→`, Ponto `•`).
 */
export const SeparadoresCustomizados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
          Separador Barra Inclinada (`/`):
        </span>
        <Breadcrumb
          separator={<SlashSeparator />}
          items={[
            { label: 'Início', href: '#' },
            { label: 'Documentos', href: '#' },
            { label: 'Contratos 2026', isCurrent: true },
          ]}
        />
      </div>

      <div>
        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
          Separador Seta Direta (`→`):
        </span>
        <Breadcrumb
          separator={<ArrowSeparator />}
          items={[
            { label: 'Produtos', href: '#' },
            { label: 'Vestuário', href: '#' },
            { label: 'Camisetas', isCurrent: true },
          ]}
        />
      </div>

      <div>
        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
          Separador Ponto Médio (`•`):
        </span>
        <Breadcrumb
          separator={<DotSeparator />}
          items={[
            { label: 'Organização', href: '#' },
            { label: 'Equipes', href: '#' },
            { label: 'Desenvolvedores', isCurrent: true },
          ]}
        />
      </div>
    </div>
  ),
};

/**
 * Colapso Inteligente quando a quantidade de itens excede `maxItems`.
 * Clicar no botão `...` expande instantaneamente todos os níveis.
 */
export const ColapsoInteligente: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
          Colapso Padrão (maxItems=3, 1 item antes e 1 item depois):
        </span>
        <Breadcrumb
          maxItems={3}
          itemsBeforeCollapse={1}
          itemsAfterCollapse={1}
          items={[
            { label: 'Início', href: '#' },
            { label: 'América Latina', href: '#' },
            { label: 'Brasil', href: '#' },
            { label: 'São Paulo', href: '#' },
            { label: 'Filial Central', isCurrent: true },
          ]}
        />
      </div>

      <div>
        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
          Colapso com Limites Personalizados (maxItems=4, itemsBeforeCollapse=2, itemsAfterCollapse=2):
        </span>
        <Breadcrumb
          maxItems={4}
          itemsBeforeCollapse={2}
          itemsAfterCollapse={2}
          items={[
            { label: 'Nuvem Unooria', href: '#' },
            { label: 'Cluster Principal', href: '#' },
            { label: 'Namespaces', href: '#' },
            { label: 'Produção', href: '#' },
            { label: 'Microsserviços', href: '#' },
            { label: 'Auth-Service', isCurrent: true },
          ]}
        />
      </div>
    </div>
  ),
};

/**
 * Renderização Polimórfica utilizando a propriedade `as` (ex: componente Next.js Link ou React Router).
 */
export const Polimorfismo: Story = {
  render: () => {
    // Simulação de componente de roteamento SPA
    const CustomRouterLink = ({
      href,
      to,
      children,
      ...rest
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string }) => (
      <a href={href || to} data-spa-link="true" style={{ textDecoration: 'none' }} {...rest}>
        {children}
      </a>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
          Itens renderizados com componente de link customizado (<code style={{ fontSize: '12px' }}>as=&#123;CustomRouterLink&#125;</code>):
        </p>
        <Breadcrumb
          items={[
            { label: 'Portal SPA', href: '/portal', as: CustomRouterLink, icon: <HomeIcon /> },
            { label: 'Módulo Financeiro', href: '/portal/finance', as: CustomRouterLink },
            { label: 'Extrato Detalhado', isCurrent: true },
          ]}
        />
      </div>
    );
  },
};

/**
 * Modo Escuro (Dark Mode) Isolado.
 */
export const ModoEscuro: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div style={{ padding: '24px', backgroundColor: '#22272A', borderRadius: '12px' }}>
      <Breadcrumb
        theme="dark"
        items={[
          { label: 'Console Cloud', href: '#', icon: <HomeIcon /> },
          { label: 'Infraestrutura', href: '#', icon: <FolderIcon /> },
          { label: 'Monitoramento de Recursos', isCurrent: true },
        ]}
      />
    </div>
  ),
};

/**
 * Comparação Lado a Lado dos Temas Light e Dark.
 */
export const ComparacaoTemas: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', border: '1px solid #CBD4D6', borderRadius: '12px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#22272A' }}>
          ☀️ Light Mode (Tema Claro)
        </h4>
        <Breadcrumb theme="light" items={defaultBreadcrumbItems} />
      </div>

      <div style={{ padding: '20px', backgroundColor: '#22272A', borderRadius: '12px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#F1F5F9' }}>
          🌙 Dark Mode (Tema Escuro)
        </h4>
        <Breadcrumb theme="dark" items={defaultBreadcrumbItems} />
      </div>
    </div>
  ),
};

/**
 * Cenários Práticos Reais: E-commerce, Painel Administrativo SaaS e Gestor de Arquivos.
 */
export const CenariosReais: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '720px' }}>
      {/* E-commerce */}
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
          Cenário 1: E-commerce (Navegação de Catálogo)
        </h5>
        <Breadcrumb
          size="s"
          items={[
            { label: 'Loja Unooria', href: '#' },
            { label: 'Eletrônicos', href: '#' },
            { label: 'Smartphones', href: '#' },
            { label: 'Acessórios', href: '#' },
            { label: 'Carregador Sem Fio MagSafe 15W', isCurrent: true },
          ]}
        />
      </div>

      {/* Gestor de Arquivos */}
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
          Cenário 2: Gestor de Arquivos em Nuvem
        </h5>
        <Breadcrumb
          size="s"
          items={[
            { label: 'Meu Drive', href: '#', icon: <FolderIcon /> },
            { label: 'Documentos Contábeis', href: '#', icon: <FolderIcon /> },
            { label: 'Exercício Fiscal 2026', isCurrent: true },
          ]}
        />
      </div>
    </div>
  ),
};
