import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionHeader } from '../../../src/unooria/components/SectionHeader/SectionHeader';
import { Button } from '../../../src/unooria/components/Button/Button';
import { Tag } from '../../../src/unooria/components/Tag/Tag';
import { Icon } from '../../../src/unooria/components/Icon/Icon';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/SectionHeader/SectionHeader.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Demonstração de Página Administrativa com SectionHeader
 */
const AdminPageDemo: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid #E4E8E9',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
      }}
    >
      <SectionHeader
        showBack
        onBack={() => alert('Voltando para o painel principal')}
        title="Gestão de Fornecedores"
        description="Consulte, filtre e cadastre novos parceiros tecnológicos da plataforma."
        badge={<Tag variant="brand" pill>128 Ativos</Tag>}
        showSearch
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Pesquisar por nome ou CNPJ..."
        showFilter
        filterActive={filterActive}
        onFilterClick={() => setFilterActive(!filterActive)}
        actions={
          <Button variant="primary" onClick={() => alert('Abrir modal de novo cadastro')}>
            <Icon name="add" size="xs" color="currentColor" /> Novo Fornecedor
          </Button>
        }
        divider
      />

      <div
        style={{
          padding: '24px',
          backgroundColor: '#F8FAFC',
          borderRadius: '12px',
          border: '1px dashed #CBD5E1',
          textAlign: 'center',
          color: '#64748B',
          fontSize: '14px',
        }}
      >
        Área de conteúdo da seção (Tabela de dados filtrada por: <strong>&quot;{search || 'Todos'}&quot;</strong>)
      </div>
    </div>
  );
};

/**
 * Página principal de documentação rica do componente SectionHeader (Padrão Ouro)
 */
const SectionHeaderDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Estrutura & Navegação"
        title="SectionHeader"
        description="O Section Header é o elemento estrutural localizado no topo de uma área de conteúdo, card ou página. Sua função é fornecer contexto imediato ao usuário (título + descrição), separando a navegação das ferramentas de busca, filtros e ações rápidas."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 22677:2549)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 22677:2549)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Layouts oficiais Desktop e Mobile com campo de busca de 300px, botão de filtro em brandNavy (#6487C2) e slot de ações.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=22677-2549&m=dev"
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

        {/* CONTAINER DO FIGMA */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid #E4E8E9',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          {/* Header do Frame Figma */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '18px', color: '#475157', fontWeight: 400 }}>Widgets</span>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#22272A', margin: '0 0 16px 0', lineHeight: 1.2 }}>
              Section Header
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475157', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>O que é:</strong> O Section Header organiza e introduz blocos de informação em páginas ou dashboards.
                Ele alinha o contexto à esquerda com título e descrição claros, e agrupa ferramentas de filtragem, busca e botões de ação à direita.
              </p>
            </div>
          </div>

          {/* Demonstração Oficial do Componente */}
          <div style={{ borderTop: '1px solid #E4E8E9', paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#7C8E94', textTransform: 'uppercase', display: 'block' }}>
              Variante Desktop Oficial (Component Set 24591:12975)
            </span>

            <SectionHeader
              title="Page title"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              showSearch
              searchPlaceholder="Search here..."
              showFilter
              actions={
                <Button variant="primary">
                  <Icon name="add" size="xs" color="currentColor" /> Action
                </Button>
              }
              divider
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: PÁGINA ADMINISTRATIVA COMPLETA
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Exemplo em Página Administrativa"
          description="Aplicação real com botão de retorno, badge de contagem, busca e filtros ativos."
        />

        <AdminPageDemo />
      </section>

      {/* =========================================================================
          SEÇÃO 3: VARIANTE MOBILE RESPONSIVA
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Variante Mobile (Empilhada)"
          description="Adaptação fluida para telas menores onde busca e filtros ocupam largura total."
        />

        <div style={{ maxWidth: '380px', backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
          <SectionHeader
            variant="mobile"
            showBack
            title="Relatórios"
            description="Histórico de transações."
            showSearch
            showFilter
            actions={<Button variant="primary" size="s">Exportar</Button>}
          />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 4: SUPORTE A TEMAS (LIGHT & DARK)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <UnooriaDocSectionHeader
            title="Suporte a Temas (Light & Dark Mode)"
            description="Contraste adaptativo transparente no fundo escuro (#22272A) e claro (#FFFFFF)."
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
                backgroundColor: activeTheme === 'dark' ? '#22272A' : '#FFFFFF',
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
            backgroundColor: activeTheme === 'dark' ? '#181C1E' : '#F8FAFC',
            borderRadius: '16px',
            border: activeTheme === 'dark' ? '1px solid #383E41' : '1px solid #E4E8E9',
            padding: '32px',
            transition: 'all 0.2s ease',
          }}
        >
          <SectionHeader
            theme={activeTheme}
            showBack
            title="Módulos de Ensino"
            description="Gerenciamento de trilhas e disciplinas."
            showSearch
            showFilter
            divider
          />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: BOAS PRÁTICAS DE USO (DO & DON'T)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Diretrizes para garantir clareza e consistência na estruturação de seções."
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
                <strong>Mantenha títulos objetivos e diretos:</strong> Identifique imediatamente o objetivo da página.
              </li>
              <li>
                <strong>Use descrições para esclarecer o escopo da tela:</strong> Facilita a orientação de novos usuários.
              </li>
              <li>
                <strong>Agrupe ações relacionadas no slot da direita:</strong> Mantém o padrão consistente de navegação à esquerda e ações à direita.
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
                <strong>Não sobrecarregue o cabeçalho com muitos botões:</strong> Limite a 1 ou 2 ações principais.
              </li>
              <li>
                <strong>Não use botões de voltar sem callback de retorno:</strong> Apenas ative `showBack` quando houver histórico prévio.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof SectionHeader> = {
  title: 'Plataforma Unooria/Componentes/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título da página ou seção',
      defaultValue: 'Page title',
    },
    description: {
      control: 'text',
      description: 'Descrição de apoio',
      defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    showBack: {
      control: 'boolean',
      description: 'Exibir botão de voltar',
      defaultValue: false,
    },
    showSearch: {
      control: 'boolean',
      description: 'Exibir campo de busca',
      defaultValue: true,
    },
    showFilter: {
      control: 'boolean',
      description: 'Exibir botão de filtro',
      defaultValue: true,
    },
    filterActive: {
      control: 'boolean',
      description: 'Filtro ativo',
      defaultValue: false,
    },
    divider: {
      control: 'boolean',
      description: 'Linha divisória inferior',
      defaultValue: true,
    },
    variant: {
      control: 'radio',
      options: ['default', 'mobile', 'compact'],
      description: 'Variante de layout',
      defaultValue: 'default',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual',
      defaultValue: 'light',
    },
  },
  args: {
    title: 'Page title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    showBack: false,
    showSearch: true,
    showFilter: true,
    filterActive: false,
    divider: true,
    variant: 'default',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof SectionHeader>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SectionHeaderDocumentationPage />,
};

/**
 * Playground interativo do SectionHeader
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF', borderRadius: '16px' }}>
      <SectionHeader
        {...args}
        actions={
          <Button variant="primary">
            <Icon name="add" size="xs" color="currentColor" /> Action
          </Button>
        }
      />
    </div>
  ),
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 22677:2549).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 22677:2549)',
  render: () => (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '48px',
        border: '1px solid #E4E8E9',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <SectionHeader
        title="Page title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        showSearch
        showFilter
        actions={
          <Button variant="primary">
            <Icon name="add" size="xs" color="currentColor" /> Action
          </Button>
        }
        divider
      />
    </div>
  ),
};

/**
 * Variante Mobile Empilhada
 */
export const VersaoMobile: Story = {
  name: 'Variante Mobile',
  render: () => (
    <div style={{ maxWidth: '380px', backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
      <SectionHeader
        variant="mobile"
        showBack
        title="Relatórios"
        description="Histórico de transações."
        showSearch
        showFilter
        actions={<Button variant="primary" size="s">Exportar</Button>}
      />
    </div>
  ),
};

/**
 * Exemplo em Página Administrativa
 */
export const PaginaAdministrativa: Story = {
  name: 'Exemplo em Página Administrativa',
  render: () => <AdminPageDemo />,
};
