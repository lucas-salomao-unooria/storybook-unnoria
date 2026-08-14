import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Breadcrumb } from './Breadcrumb';

// Ícones auxiliares em SVG inline para garantia de zero dependência externa
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const SlashSeparator = () => (
  <span style={{ opacity: 0.6, fontSize: '0.9em' }}>/</span>
);

const meta: Meta<typeof Breadcrumb> = {
  title: 'Plataforma Unooria/Componentes/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema de cores do componente.',
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm'],
      description: 'Tamanho da tipografia e espaçamentos do breadcrumb.',
    },
    maxItems: {
      control: 'number',
      description: 'Limite de itens visíveis antes de colapsar em "...".',
    },
    ariaLabel: {
      control: 'text',
      description: 'Rótulo acessível da navegação para leitores de tela.',
    },
  },
  args: {
    theme: 'light',
    size: 's',
    ariaLabel: 'Navegação Estrutural',
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const defaultItems = [
  { label: 'Início', href: '#' },
  { label: 'Configurações', href: '#' },
  { label: 'Usuários', href: '#' },
  { label: 'Permissões do Perfil', isCurrent: true },
];

/**
 * Uso simples do Breadcrumb com links e item ativo final.
 */
export const Simple: Story = {
  args: {
    items: defaultItems,
    theme: 'light',
  },
};

/**
 * Breadcrumb utilizando ícones para enriquecer a hierarquia de navegação.
 */
export const WithIcons: Story = {
  args: {
    theme: 'light',
    items: [
      { label: 'Início', href: '#', icon: <HomeIcon /> },
      { label: 'Projetos', href: '#', icon: <FolderIcon /> },
      { label: 'Configurações do Sistema', isCurrent: true, icon: <SettingsIcon /> },
    ],
  },
};

/**
 * Separador customizado (ex: barra `/` ao invés da seta padrão).
 */
export const CustomSeparator: Story = {
  args: {
    theme: 'light',
    separator: <SlashSeparator />,
    items: [
      { label: 'Dashboard', href: '#' },
      { label: 'Relatórios', href: '#' },
      { label: 'Vendas Q3', isCurrent: true },
    ],
  },
};

/**
 * Colapso automático quando o número de itens excede `maxItems`.
 * Clicar no botão `...` expande todos os níveis.
 */
export const CollapsedMaxItems: Story = {
  args: {
    theme: 'light',
    maxItems: 3,
    items: [
      { label: 'Home', href: '#' },
      { label: 'Organização', href: '#' },
      { label: 'Departamentos', href: '#' },
      { label: 'Tecnologia da Informação', href: '#' },
      { label: 'Desenvolvimento', href: '#' },
      { label: 'Projeto Unooria', isCurrent: true },
    ],
  },
};

/**
 * Modo Escuro (Dark Mode).
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => (
    <div style={{ backgroundColor: '#22272A', padding: '24px', borderRadius: '8px' }}>
      <Breadcrumb
        {...args}
        theme="dark"
        items={[
          { label: 'Home', href: '#', icon: <HomeIcon /> },
          { label: 'Serviços', href: '#', icon: <FolderIcon /> },
          { label: 'Infraestrutura Cloud', isCurrent: true },
        ]}
      />
    </div>
  ),
};

/**
 * Comparação Lado a Lado dos Temas Light e Dark Mode.
 */
export const LightAndDarkComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Light Mode */}
      <div style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #CBD4D6', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontFamily: 'sans-serif', color: '#536167', fontSize: '14px' }}>
          Light Mode (Tema Claro)
        </h4>
        <Breadcrumb
          theme="light"
          items={[
            { label: 'Início', href: '#', icon: <HomeIcon /> },
            { label: 'Gestão de Contas', href: '#' },
            { label: 'Faturamento', href: '#' },
            { label: 'Histórico de Faturas', isCurrent: true },
          ]}
        />
      </div>

      {/* Dark Mode */}
      <div style={{ padding: '24px', backgroundColor: '#22272A', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontFamily: 'sans-serif', color: '#A7B5B9', fontSize: '14px' }}>
          Dark Mode (Tema Escuro)
        </h4>
        <Breadcrumb
          theme="dark"
          items={[
            { label: 'Início', href: '#', icon: <HomeIcon /> },
            { label: 'Gestão de Contas', href: '#' },
            { label: 'Faturamento', href: '#' },
            { label: 'Histórico de Faturas', isCurrent: true },
          ]}
        />
      </div>
    </div>
  ),
};

/**
 * Caso de Uso Complexo: Múltiplos tamanhos, colapso e manipuladores de clique interativos.
 */
export const Complex: Story = {
  render: () => {
    const handleNavigation = (label: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      alert(`Navegando para: ${label}`);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h5 style={{ margin: '0 0 8px 0', fontFamily: 'sans-serif', color: '#617379' }}>
            Tamanho XS (Extra Small) com colapso:
          </h5>
          <Breadcrumb
            size="xs"
            maxItems={3}
            items={[
              { label: 'App', href: '#', onClick: handleNavigation('App') },
              { label: 'Módulo A', href: '#', onClick: handleNavigation('Módulo A') },
              { label: 'Seção B', href: '#', onClick: handleNavigation('Seção B') },
              { label: 'Subseção C', href: '#', onClick: handleNavigation('Subseção C') },
              { label: 'Página Final', isCurrent: true },
            ]}
          />
        </div>

        <div>
          <h5 style={{ margin: '0 0 8px 0', fontFamily: 'sans-serif', color: '#617379' }}>
            Tamanho S (Small - Padrão) com ícones e handlers de clique:
          </h5>
          <Breadcrumb
            size="s"
            items={[
              { label: 'Início', href: '#', icon: <HomeIcon />, onClick: handleNavigation('Início') },
              { label: 'Configurações', href: '#', icon: <SettingsIcon />, onClick: handleNavigation('Configurações') },
              { label: 'Segurança', isCurrent: true },
            ]}
          />
        </div>

        <div>
          <h5 style={{ margin: '0 0 8px 0', fontFamily: 'sans-serif', color: '#617379' }}>
            Tamanho M (Medium):
          </h5>
          <Breadcrumb
            size="m"
            items={[
              { label: 'Painel Geral', href: '#', onClick: handleNavigation('Painel Geral') },
              { label: 'Estatísticas', href: '#', onClick: handleNavigation('Estatísticas') },
              { label: 'Métricas de Desempenho', isCurrent: true },
            ]}
          />
        </div>
      </div>
    );
  },
};
