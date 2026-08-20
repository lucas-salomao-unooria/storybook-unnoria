import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ListSectionItem } from '../../../src/unooria/components/ListSectionItem/ListSectionItem';
import { Tag } from '../../../src/unooria/components/Tag/Tag';
import { Avatar } from '../../../src/unooria/components/Avatar/Avatar';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/ListSectionItem/ListSectionItem.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Demonstração de Trilha de Aprendizagem com Módulos
 */
const CourseModulesDemo: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    '1': true,
    '2': false,
    '3': false,
  });

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedItems((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div
      style={{
        backgroundColor: '#22272A',
        borderRadius: '24px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '680px',
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>
          Trilha: Especialista em Design System
        </h4>
        <p style={{ margin: 0, fontSize: '13px', color: '#CBD4D6' }}>
          Selecione as disciplinas para emitir o certificado de conclusão.
        </p>
      </div>

      <ListSectionItem
        theme="dark"
        showCheckbox
        checked={selectedItems['1']}
        onCheckChange={(c) => toggleSelect('1', c)}
        visual="icon"
        icon="token"
        category="Módulo 01 • Fundamentos"
        title="Arquitetura de Tokens & Cores Semânticas"
        description="Aprenda a estruturar escalas cromáticas, transparências RGBA e variáveis globais."
        metadata="12 aulas • 4h 30min • Concluído em 14/08/2026"
        tag={<Tag variant="success" pill>Concluído</Tag>}
        showMoreAction
        onMoreActionClick={() => alert('Opções do Módulo 01')}
      />

      <ListSectionItem
        theme="dark"
        showCheckbox
        checked={selectedItems['2']}
        onCheckChange={(c) => toggleSelect('2', c)}
        visual="icon"
        icon="widgets"
        category="Módulo 02 • Componentes"
        title="Desenvolvimento de Componentes Acessíveis"
        description="Construção de componentes com semântica ARIA, focus trapping e navegação por teclado."
        metadata="18 aulas • 6h 15min • Em andamento"
        tag={<Tag variant="brand" pill>Em Andamento</Tag>}
        showMoreAction
        onMoreActionClick={() => alert('Opções do Módulo 02')}
      />

      <ListSectionItem
        theme="dark"
        showCheckbox
        checked={selectedItems['3']}
        onCheckChange={(c) => toggleSelect('3', c)}
        visual="icon"
        icon="auto_stories"
        category="Módulo 03 • Storybook"
        title="Documentação Rica & Playgrounds no Storybook"
        description="Boas práticas de documentação viva, matrizes de variantes e testes de regressão visual."
        metadata="8 aulas • 3h 00min • Não iniciado"
        tag={<Tag variant="neutral" pill>Bloqueado</Tag>}
        showMoreAction
        onMoreActionClick={() => alert('Opções do Módulo 03')}
      />
    </div>
  );
};

/**
 * Página principal de documentação rica do componente ListSectionItem (Padrão Ouro)
 */
const ListSectionItemDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Listas & Agrupamentos"
        title="ListSectionItem"
        description="O List Section Item organiza e agrupa itens relacionados dentro de uma lista, dividindo-os por títulos, categorias e metadados para facilitar a navegação, seleção e execução de ações rápidas."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 6101:5691)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 6101:5691)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Layout e proporções exatas conforme especificadas na prancha do Figma para Visual=Icon e Visual=Avatar.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=6101-5691&m=dev"
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

        {/* CONTAINER DO FIGMA (#22272A) */}
        <div
          style={{
            backgroundColor: '#22272A',
            borderRadius: '24px',
            padding: '48px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          {/* Header do Frame Figma */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '18px', color: '#CBD4D6', fontWeight: 400 }}>Widgets</span>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.2 }}>
              List Section Item
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#CBD4D6', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#FFFFFF' }}>O que são:</strong> O List Section Item é um componente que organiza e agrupa itens relacionados dentro de uma lista,
                dividindo-os por títulos ou categorias para facilitar a navegação e compreensão. Seu objetivo é melhorar a usabilidade, tornando a visualização de dados mais clara e intuitiva.
                Visualmente, ele deve ser bem delimitado, com separadores visíveis que diferenciam cada seção de forma organizada e harmoniosa.
              </p>
            </div>
          </div>

          {/* Matriz das Variantes Oficiais do Figma */}
          <div style={{ borderTop: '1px solid #3D4448', paddingTop: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#CBD4D6', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
              Variantes do Component Set (Node 1537:4807)
            </span>

            {/* 1. Visual=Icon */}
            <ListSectionItem
              theme="dark"
              showCheckbox
              checked
              visual="icon"
              icon="school"
              category="Titulo de icone"
              title="Example title"
              description="Description 1"
              metadata="Description 2"
              tag={<Tag variant="success" pill>Tag</Tag>}
              showToggle
              toggleChecked
              showMoreAction
            />

            {/* 2. Visual=Avatar */}
            <ListSectionItem
              theme="dark"
              showCheckbox
              checked={false}
              visual="avatar"
              avatar={<Avatar name="Ana Silva" size="xs" />}
              category="Gestão de Usuários"
              title="Ana Silva"
              description="Instrutora Chefe • Design System"
              metadata="Último acesso há 15 minutos"
              tag={<Tag variant="brand" pill>Ativo</Tag>}
              showToggle
              toggleChecked={false}
              showMoreAction
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: TRILHA DE MÓDULOS DE CURSO
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Exemplo em Trilha de Aprendizagem"
          description="Aplicação real de módulos com checkbox de conclusão, tags e botões de ação."
        />

        <CourseModulesDemo />
      </section>

      {/* =========================================================================
          SEÇÃO 3: SUPORTE A TEMAS (LIGHT & DARK)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <UnooriaDocSectionHeader
            title="Suporte a Temas (Light & Dark Mode)"
            description="Contraste adaptativo transparente no fundo escuro (#22272A) e claro (#FFFFFF)."
          />
          <div style={{ display: 'flex', gap: '8px' }}>
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
          </div>
        </div>

        <div
          style={{
            backgroundColor: activeTheme === 'dark' ? '#181C1E' : '#F8FAFC',
            borderRadius: '16px',
            border: activeTheme === 'dark' ? '1px solid #383E41' : '1px solid #E4E8E9',
            padding: '32px',
            maxWidth: '680px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            transition: 'all 0.2s ease',
          }}
        >
          <ListSectionItem
            theme={activeTheme}
            showCheckbox
            visual="icon"
            icon="notifications"
            title="Notificações Push"
            description="Receba alertas sobre novos cursos e mensagens de instrutores."
            metadata="Configuração global do sistema"
            showToggle
            toggleChecked
          />

          <ListSectionItem
            theme={activeTheme}
            showCheckbox
            visual="icon"
            icon="security"
            title="Autenticação em Duas Etapas"
            description="Segurança adicional ao realizar login."
            metadata="Recomendado ativar"
            showToggle
            toggleChecked={false}
          />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 4: BOAS PRÁTICAS DE USO (DO & DON'T)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Diretrizes para garantir clareza e hierarquia na estruturação de listas."
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
                <strong>Use categorias superiores para agrupar módulos:</strong> Facilita a leitura escaneada em listas longas.
              </li>
              <li>
                <strong>Inclua metadados secundários úteis:</strong> Exiba contagem de aulas, tempo estimado ou data de conclusão.
              </li>
              <li>
                <strong>Utilize tags para status claros:</strong> Tags coloridas fornecem feedback instantâneo sobre o estado do item.
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
                <strong>Não sobrecarregue a linha com muitos controles simultâneos:</strong> Evite colocar Checkbox, Toggle e múltiplos botões no mesmo item.
              </li>
              <li>
                <strong>Não use títulos excessivamente longos sem truncamento:</strong> Prefira manter títulos diretos e objetivos.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof ListSectionItem> = {
  title: 'Plataforma Unooria/Componentes/ListSectionItem',
  component: ListSectionItem,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título principal',
      defaultValue: 'Example title',
    },
    category: {
      control: 'text',
      description: 'Categoria superior',
      defaultValue: 'Titulo de icone',
    },
    description: {
      control: 'text',
      description: 'Descrição primária',
      defaultValue: 'Description 1',
    },
    metadata: {
      control: 'text',
      description: 'Metadados secundários',
      defaultValue: 'Description 2',
    },
    visual: {
      control: 'radio',
      options: ['none', 'icon', 'avatar'],
      description: 'Elemento visual líder',
      defaultValue: 'icon',
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Exibir checkbox de seleção',
      defaultValue: true,
    },
    checked: {
      control: 'boolean',
      description: 'Checkbox selecionado',
      defaultValue: true,
    },
    showToggle: {
      control: 'boolean',
      description: 'Exibir switch',
      defaultValue: true,
    },
    toggleChecked: {
      control: 'boolean',
      description: 'Switch ligado',
      defaultValue: true,
    },
    showMoreAction: {
      control: 'boolean',
      description: 'Exibir botão more_vert',
      defaultValue: true,
    },
    theme: {
      control: 'radio',
      options: ['dark', 'light'],
      description: 'Tema visual',
      defaultValue: 'dark',
    },
  },
  args: {
    title: 'Example title',
    category: 'Titulo de icone',
    description: 'Description 1',
    metadata: 'Description 2',
    visual: 'icon',
    icon: 'school',
    showCheckbox: true,
    checked: true,
    showToggle: true,
    toggleChecked: true,
    showMoreAction: true,
    theme: 'dark',
  },
};

export default meta;

type Story = StoryObj<typeof ListSectionItem>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ListSectionItemDocumentationPage />,
};

/**
 * Playground interativo do ListSectionItem
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? true);
    const [toggle, setToggle] = useState(args.toggleChecked ?? true);

    return (
      <div style={{ maxWidth: '640px', padding: '32px', backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF', borderRadius: '16px' }}>
        <ListSectionItem
          {...args}
          checked={checked}
          onCheckChange={setChecked}
          toggleChecked={toggle}
          onToggleChange={setToggle}
          tag={<Tag variant="success" pill>Tag</Tag>}
        />
      </div>
    );
  },
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 6101:5691).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 6101:5691)',
  render: () => (
    <div
      style={{
        backgroundColor: '#22272A',
        borderRadius: '24px',
        padding: '48px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
        maxWidth: '680px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '18px', color: '#CBD4D6' }}>Widgets</span>
        <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          List Section Item
        </h1>
        <p style={{ margin: 0, fontSize: '13px', color: '#CBD4D6', lineHeight: 1.6 }}>
          O List Section Item organiza e agrupa itens relacionados dentro de uma lista.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <ListSectionItem
          theme="dark"
          showCheckbox
          checked
          visual="icon"
          icon="school"
          category="Titulo de icone"
          title="Example title"
          description="Description 1"
          metadata="Description 2"
          tag={<Tag variant="success" pill>Tag</Tag>}
          showToggle
          toggleChecked
          showMoreAction
        />

        <ListSectionItem
          theme="dark"
          showCheckbox
          checked={false}
          visual="avatar"
          avatar={<Avatar name="Ana Silva" size="xs" />}
          category="Gestão de Usuários"
          title="Ana Silva"
          description="Instrutora Chefe • Design System"
          metadata="Último acesso há 15 minutos"
          tag={<Tag variant="brand" pill>Ativo</Tag>}
          showToggle
          toggleChecked={false}
          showMoreAction
        />
      </div>
    </div>
  ),
};

/**
 * Trilha de Módulos
 */
export const TrilhaDeModulos: Story = {
  name: 'Trilha de Módulos',
  render: () => <CourseModulesDemo />,
};
