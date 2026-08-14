import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  SideBar,
  SideBarItem,
  SideBarSection,
  SideBarHeader,
  SideBarFooter,
} from '../../../src/unooria/components/SideBar/SideBar';
import {
  SideBarProps,
  SideBarItemProps,
  SideBarItemData,
  SideBarSectionProps,
  SideBarHeaderProps,
  SideBarFooterProps,
  SideBarLayout,
  SideBarTheme,
  SideBarBadgeVariant,
} from '../../../src/unooria/components/SideBar/SideBar.types';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../src/unooria/docs';

/* ==========================================================================
   Ícones SVG Utilitários Inline para Independência Total
   ========================================================================== */

const BrandLogoIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const DashboardIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

const ChatIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChartBarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 11l18-5v12L3 13v-2z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
);

const WalletIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
    <path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const HelpCircleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const BellIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const LogOutIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#10B981"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#EF4444"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ==========================================================================
   Dados de Exemplo para a SideBar
   ========================================================================== */

const sampleSections: SideBarSectionProps[] = [
  {
    id: 'main',
    title: 'Visão Geral',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <DashboardIcon />,
        active: true,
      },
      {
        id: 'chat',
        label: 'Atendimento & Chat',
        icon: <ChatIcon />,
        badge: 14,
        badgeVariant: 'primary',
      },
      {
        id: 'crm',
        label: 'Contatos & CRM',
        icon: <UsersIcon />,
      },
    ],
  },
  {
    id: 'growth',
    title: 'Crescimento & Vendas',
    items: [
      {
        id: 'campaigns',
        label: 'Campanhas em Massa',
        icon: <MegaphoneIcon />,
        badge: 'NOVO',
        badgeVariant: 'success',
      },
      {
        id: 'analytics',
        label: 'Relatórios & Métricas',
        icon: <ChartBarIcon />,
      },
      {
        id: 'finance',
        label: 'Financeiro & Recargas',
        icon: <WalletIcon />,
        badge: '!',
        badgeVariant: 'warning',
      },
    ],
  },
  {
    id: 'system',
    title: 'Sistema',
    items: [
      {
        id: 'settings',
        label: 'Configurações Gerais',
        icon: <SettingsIcon />,
      },
      {
        id: 'support',
        label: 'Central de Ajuda',
        icon: <HelpCircleIcon />,
      },
      {
        id: 'disabled-item',
        label: 'Módulo em Manutenção',
        icon: <BellIcon />,
        disabled: true,
        badge: 'OFF',
        badgeVariant: 'neutral',
      },
    ],
  },
];

const sampleUser = {
  name: 'Lucas Salomão',
  role: 'Administrador Master',
  email: 'lucas@unooria.com',
};

/* ==========================================================================
   Página de Documentação Rica do SideBar (Padrão Ouro)
   ========================================================================== */

const SideBarDocumentationPage = () => {
  const [demoTheme, setDemoTheme] = useState<SideBarTheme>('light');
  const [activeItem, setActiveItem] = useState<string>('dashboard');

  const propsSideBarData = [
    {
      name: 'layout',
      type: "'collapsed' | 'expanded'",
      default: "'expanded'",
      desc: 'Modo de exibição estrutural da barra: colapsada (compacta com 44px) ou expandida (completa com 232px - 260px).',
    },
    {
      name: 'isExpanded',
      type: 'boolean',
      default: 'undefined',
      desc: 'Controla programaticamente se a barra lateral está aberta/expandida (modo controlado).',
    },
    {
      name: 'defaultExpanded',
      type: 'boolean',
      default: 'true',
      desc: 'Estado inicial de expansão quando utilizado no modo não-controlado.',
    },
    {
      name: 'onToggleExpanded',
      type: '(isExpanded: boolean) => void',
      default: 'undefined',
      desc: 'Callback executado sempre que o usuário aciona o botão de colapso/expansão.',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Alterna a paleta de cores entre Light Mode (Claro) e Dark Mode (Escuro) em conformidade com os tokens Unooria.',
    },
    {
      name: 'width',
      type: 'number | string',
      default: '260 (ou 232 do Figma)',
      desc: 'Largura total da SideBar quando estiver no estado expandido.',
    },
    {
      name: 'collapsedWidth',
      type: 'number | string',
      default: '44',
      desc: 'Largura compacta da SideBar quando estiver no estado colapsado (apenas ícones).',
    },
    {
      name: 'sections',
      type: 'SideBarSectionProps[]',
      default: 'undefined',
      desc: 'Lista declarativa de grupos de seções e seus respectivos itens de navegação.',
    },
    {
      name: 'items',
      type: 'SideBarItemData[]',
      default: 'undefined',
      desc: 'Lista direta de itens quando não há necessidade de subdivisão em seções.',
    },
    {
      name: 'activeItemId',
      type: 'string',
      default: 'undefined',
      desc: 'Identificador do item ativo/selecionado na barra para sincronização com roteadores (ex: Next.js, React Router).',
    },
    {
      name: 'onItemClick',
      type: '(item: SideBarItemData, e: React.MouseEvent) => void',
      default: 'undefined',
      desc: 'Callback global acionado ao clicar em qualquer item gerenciado pela barra.',
    },
    {
      name: 'header',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Elemento JSX de cabeçalho ou subcomponente SideBarHeader customizado.',
    },
    {
      name: 'footer',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Elemento JSX de rodapé ou subcomponente SideBarFooter com dados de usuário e ações.',
    },
    {
      name: 'collapsible',
      type: 'boolean',
      default: 'true',
      desc: 'Define se a barra lateral permite retração/expansão pelo usuário.',
    },
    {
      name: 'showToggleButton',
      type: 'boolean',
      default: 'true',
      desc: 'Exibe o botão interativo de Chevron para recolher e expandir o layout.',
    },
    {
      name: 'toggleButtonPosition',
      type: "'header' | 'footer' | 'floating'",
      default: "'header'",
      desc: 'Posicionamento do botão nativo de toggle (no topo junto à marca, no rodapé ou flutuante na borda).',
    },
  ];

  const propsSideBarItemData = [
    {
      name: 'id',
      type: 'string',
      default: 'undefined',
      desc: 'Identificador único do item de navegação.',
    },
    {
      name: 'label',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Texto ou título do item de menu exibido no modo expandido.',
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Ícone SVG ilustrativo do módulo (sempre visível em ambos os modos).',
    },
    {
      name: 'badge',
      type: 'React.ReactNode | number | string',
      default: 'undefined',
      desc: 'Contador de mensagens, tag "NOVO" ou indicador de status.',
    },
    {
      name: 'badgeVariant',
      type: "'default' | 'primary' | 'success' | 'warning' | 'error' | 'neutral' | 'info'",
      default: "'default'",
      desc: 'Esquema de cores semântico aplicado ao Badge do item.',
    },
    {
      name: 'active',
      type: 'boolean',
      default: 'false',
      desc: 'Destaca o item com a cor primária de seleção ativa.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Desativa interações de clique, reduz a opacidade e adiciona aria-disabled.',
    },
    {
      name: 'tooltip',
      type: 'string',
      default: 'computed (label)',
      desc: 'Texto do balão flutuante acessível exibido ao passar o cursor no modo colapsado.',
    },
    {
      name: 'href',
      type: 'string',
      default: 'undefined',
      desc: 'URL de destino caso o item atue como link âncora polimórfico.',
    },
    {
      name: 'as',
      type: 'React.ElementType',
      default: "'button' ou 'a'",
      desc: 'Elemento polimórfico para integração com Links de frameworks (ex: NextLink, NavLink).',
    },
  ];

  const propsSideBarHeaderData = [
    {
      name: 'logo',
      type: 'React.ReactNode',
      default: 'DefaultBrandIcon',
      desc: 'Logotipo ou símbolo da marca do cliente/sistema.',
    },
    {
      name: 'title',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Título principal da aplicação (ex: "Unooria Suite").',
    },
    {
      name: 'subtitle',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Subtítulo, versão ou ambiente (ex: "v2.0 • Enterprise").',
    },
    {
      name: 'showToggleButton',
      type: 'boolean',
      default: 'true',
      desc: 'Exibe o botão de Chevron ao lado da marca no cabeçalho.',
    },
  ];

  const propsSideBarFooterData = [
    {
      name: 'user',
      type: 'SideBarUserProfile',
      default: 'undefined',
      desc: 'Objeto com nome, e-mail, cargo e avatar do usuário autenticado.',
    },
    {
      name: 'actions',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Ações utilitárias no rodapé, como botão de Logout ou Configurações Rápidas.',
    },
    {
      name: 'showToggleButton',
      type: 'boolean',
      default: 'false',
      desc: 'Exibe o botão de alternância no rodapé inferior.',
    },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Navegação Estrutural"
        title="SideBar"
        description="A SideBar é o componente mestre de navegação lateral da Plataforma Unooria. Projetada para sustentar a arquitetura de informação de sistemas multi-módulos, ela oferece transição fluida entre os modos Colapsado (44px compacto focado em ícones e tooltips flutuantes) e Expandido (232px - 260px com agrupamento por seções, badges e perfil do usuário), total aderência às diretrizes do Figma, suporte a Dark/Light Mode e acessibilidade ARIA."
      />

      {/* 1. Visão Geral & Casos de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Casos de Uso"
          description="Pilares de navegação, arquitetura de informação e ergonomia de software empresarial"
          barColor="#0066FF"
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
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              🧭 Navegação Principal Multi-Módulo
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Centraliza o acesso a todos os módulos do ecossistema Unooria (Chat, CRM, Campanhas, Analytics, Configurações) mantendo a hierarquia visual consistente em todas as telas.
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
              ⚡ Alternância Fluida (44px ⟷ 232px)
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Otimiza o espaço útil de tela. Em telas menores ou dashboards analíticos densos, o usuário recolhe a SideBar para 44px, preservando o acesso rápido via ícones e tooltips inteligentes.
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
              🔔 Notificações & Status Integrados
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Suporta Badges semânticos nativos nos itens para destacar mensagens em espera, novos recursos ou alertas críticos com atualização reativa em tempo real.
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
              🌗 Suporte Nativo a Temas (Light / Dark)
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Renderização perfeita tanto em interfaces claras de trabalho diurno quanto em ambientes escuros de alta concentração e baixa fadiga visual.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Figma & Especificações Técnicas */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="2. Figma & Especificações Técnicas"
          description="Rastreabilidade direta com o arquivo mestre do Figma Design System Unooria"
          barColor="#6366F1"
        />

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '24px',
            marginTop: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              paddingBottom: '20px',
              borderBottom: '1px solid #F1F5F9',
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  backgroundColor: '#EEF2FF',
                  color: '#4F46E5',
                  marginBottom: '6px',
                }}
              >
                Figma Component Set
              </span>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>
                SideBar Component Structure
              </h3>
            </div>

            <a
              href="https://www.figma.com/design/i0HRQSBtQQ9ZXDYiJPRnGv/Unooria_DS_v0.2?node-id=3340-11320&m=dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              <span>Abrir no Figma Dev Mode ↗</span>
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginTop: '20px',
            }}
          >
            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Node IDs do Figma</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
                <code>3340:11320</code> • <code>21592:856</code>
              </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Dimensões de Largura</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
                Colapsado: <strong>44px</strong> | Expandido: <strong>232px</strong>
              </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Raio de Borda dos Itens</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
                <strong>8px</strong> (<code>var(--unooria-radius-md)</code>)
              </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Curva de Transição</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
                <code>250ms cubic-bezier(0.2, 0, 0, 1)</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Anatomia do Componente e Transições de Layout */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="3. Anatomia do Componente & Transições"
          description="Decomposição estrutural dos elementos da SideBar e comportamento de colapso"
          barColor="#10B981"
        />

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '24px',
            marginTop: '16px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                Subcomponentes Estruturais
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8', color: '#475569' }}>
                <li>
                  <strong>SideBarHeader:</strong> Contém o logotipo da marca, o título do workspace e o botão de Chevron retrátil.
                </li>
                <li>
                  <strong>SideBarSection:</strong> Agrupador semântico de itens com rótulo em caixa-alta e separador sutil.
                </li>
                <li>
                  <strong>SideBarItem:</strong> Elemento clicável com ícone SVG (20px), rótulo legível, contador Badge e tooltip no modo compacto.
                </li>
                <li>
                  <strong>SideBarFooter:</strong> Área inferior contendo o card do usuário ativo (Avatar + Nome + Cargo) e ações adicionais.
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                Comportamento no Modo Colapsado (44px)
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8', color: '#475569' }}>
                <li>Rótulos textuais e subtítulos são ocultados de forma acessível.</li>
                <li>Os títulos de seção se transformam em linhas divisórias sutis de 1px.</li>
                <li>O contador Badge se reposiciona como um ponto flutuante sobre o ícone.</li>
                <li>Hover em qualquer item dispara o <strong>Tooltip Flutuante</strong> lateral com fundo escuro e tipografia de alto contraste.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Matriz Comparativa de Layouts & Estados de Itens */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="4. Matriz de Layouts (44px vs 232px) & Estados de Itens"
          description="Visualização simultânea dos estados e larguras em conformidade com o Figma"
          barColor="#F59E0B"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '24px',
            marginTop: '16px',
            padding: '24px',
            backgroundColor: '#F8FAFC',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            alignItems: 'start',
          }}
        >
          {/* Coluna 1: Colapsado */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '8px', textTransform: 'uppercase' }}>
              Colapsado (44px)
            </div>
            <div style={{ height: '420px', border: '1px solid #CBD5E1', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
              <SideBar
                layout="collapsed"
                width={232}
                collapsedWidth={44}
                header={
                  <SideBarHeader
                    logo={<BrandLogoIcon />}
                    showToggleButton={false}
                  />
                }
                sections={[
                  {
                    id: 's1',
                    items: [
                      { id: 'd1', label: 'Dashboard', icon: <DashboardIcon />, active: true },
                      { id: 'd2', label: 'Chat', icon: <ChatIcon />, badge: 8, badgeVariant: 'primary' },
                      { id: 'd3', label: 'Clientes', icon: <UsersIcon /> },
                      { id: 'd4', label: 'Configurações', icon: <SettingsIcon /> },
                    ],
                  },
                ]}
                footer={
                  <SideBarFooter
                    user={{ name: 'Lucas Salomão' }}
                  />
                }
              />
            </div>
          </div>

          {/* Coluna 2: Expandido com Estados */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '8px', textTransform: 'uppercase' }}>
              Expandido (232px) com Estados (Default, Active, Hover, Disabled, Badges)
            </div>
            <div style={{ height: '420px', border: '1px solid #CBD5E1', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
              <SideBar
                layout="expanded"
                width={232}
                collapsedWidth={44}
                header={
                  <SideBarHeader
                    logo={<BrandLogoIcon />}
                    title="Unooria Suite"
                    subtitle="Workspace Pro"
                    showToggleButton={true}
                  />
                }
                sections={sampleSections}
                footer={
                  <SideBarFooter
                    user={sampleUser}
                    actions={
                      <button
                        type="button"
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#64748B',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '6px',
                        }}
                        title="Encerrar Sessão"
                      >
                        <LogOutIcon />
                      </button>
                    }
                  />
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="5. Boas Práticas (Do's & Don'ts)"
          description="Diretrizes de UX e design de interação para implementação da SideBar"
          barColor="#EC4899"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          {/* Card DO */}
          <div
            style={{
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <CheckIcon />
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#166534' }}>
                O que FAZER (Do&apos;s)
              </h4>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.7', color: '#166534' }}>
              <li>Forneça ícones claros e representativos de 18px a 20px para todos os itens da barra.</li>
              <li>Utilize seções lógicas (`SideBarSection`) para agrupar módulos por afinidade temática.</li>
              <li>Sincronize a prop `activeItemId` com a rota atual do sistema para feedback visual imediato.</li>
              <li>Utilize badges de alerta (`warning` ou `error`) apenas quando houver ação imediata requerida.</li>
              <li>Preserve a transição suave de 250ms ao alternar o layout para evitar quebras visuais de tela.</li>
            </ul>
          </div>

          {/* Card DON'T */}
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <CloseIcon />
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#991B1B' }}>
                O que NÃO FAZER (Don&apos;ts)
              </h4>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.7', color: '#991B1B' }}>
              <li>Não sobrecarregue a barra com mais de 15 itens principais sem agrupamento em seções.</li>
              <li>Não utilize textos longos nos rótulos que causem quebra de linha no estado expandido (limite a 20-25 caracteres).</li>
              <li>Não desative os tooltips no modo colapsado, pois usuários precisam saber o destino de cada ícone.</li>
              <li>Não force o layout expandido em telas mobile; em telas menores utilize Drawer ou BottomBar.</li>
              <li>Não use cores arbitrárias fora da paleta de tokens semânticos do Unooria.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Suporte a Temas (Light e Dark) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="6. Suporte a Temas (Light e Dark)"
          description="Alternância em tempo real e teste de contraste da SideBar"
          barColor="#8B5CF6"
        />

        <div
          style={{
            backgroundColor: demoTheme === 'dark' ? '#0F172A' : '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '24px',
            marginTop: '16px',
            transition: 'background-color 0.3s ease',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: '15px',
                fontWeight: 700,
                color: demoTheme === 'dark' ? '#F8FAFC' : '#0F172A',
              }}
            >
              Simulador de Tema Interativo ({demoTheme === 'dark' ? 'Dark Mode' : 'Light Mode'})
            </h4>

            <button
              type="button"
              onClick={() => setDemoTheme(demoTheme === 'light' ? 'dark' : 'light')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: demoTheme === 'dark' ? '#1E293B' : '#F1F5F9',
                color: demoTheme === 'dark' ? '#FFFFFF' : '#0F172A',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              {demoTheme === 'light' ? '🌙 Alternar para Dark Mode' : '☀️ Alternar para Light Mode'}
            </button>
          </div>

          <div
            style={{
              height: '460px',
              maxWidth: '300px',
              border: `1px solid ${demoTheme === 'dark' ? '#334155' : '#CBD5E1'}`,
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <SideBar
              theme={demoTheme}
              layout="expanded"
              width={260}
              activeItemId={activeItem}
              onItemClick={(item) => setActiveItem(item.id)}
              header={
                <SideBarHeader
                  logo={<BrandLogoIcon />}
                  title="Unooria Live"
                  subtitle="Enterprise System"
                />
              }
              sections={sampleSections}
              footer={
                <SideBarFooter
                  user={sampleUser}
                  actions={
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: demoTheme === 'dark' ? '#94A3B8' : '#64748B',
                      }}
                      title="Sair"
                    >
                      <LogOutIcon />
                    </button>
                  }
                />
              }
            />
          </div>
        </div>
      </section>

      {/* 7. Tabelas de Props da API */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="7. Tabela Completa de Props da API"
          description="Referência de tipagem e propriedades dos subcomponentes da SideBar"
          barColor="#0EA5E9"
        />

        {/* Tabela SideBar */}
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
            Propriedades de &lt;SideBar /&gt;
          </h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Propriedade</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Tipo</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Padrão</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {propsSideBarData.map((prop, idx) => (
                  <tr
                    key={prop.name}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                    }}
                  >
                    <td style={{ padding: '10px 16px', fontWeight: 600, color: '#0F172A' }}>
                      <code>{prop.name}</code>
                    </td>
                    <td style={{ padding: '10px 16px', color: '#6366F1' }}>
                      <code>{prop.type}</code>
                    </td>
                    <td style={{ padding: '10px 16px', color: '#64748B' }}>
                      <code>{prop.default}</code>
                    </td>
                    <td style={{ padding: '10px 16px', color: '#334155' }}>{prop.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabela SideBarItem */}
        <div style={{ marginTop: '32px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
            Propriedades de &lt;SideBarItem /&gt;
          </h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Propriedade</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Tipo</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Padrão</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {propsSideBarItemData.map((prop, idx) => (
                  <tr
                    key={prop.name}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                    }}
                  >
                    <td style={{ padding: '10px 16px', fontWeight: 600, color: '#0F172A' }}>
                      <code>{prop.name}</code>
                    </td>
                    <td style={{ padding: '10px 16px', color: '#6366F1' }}>
                      <code>{prop.type}</code>
                    </td>
                    <td style={{ padding: '10px 16px', color: '#64748B' }}>
                      <code>{prop.default}</code>
                    </td>
                    <td style={{ padding: '10px 16px', color: '#334155' }}>{prop.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabela SideBarHeader e SideBarFooter */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '32px' }}>
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
              &lt;SideBarHeader /&gt;
            </h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                    <th style={{ padding: '10px 12px', fontWeight: 600, color: '#475569' }}>Prop</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600, color: '#475569' }}>Tipo</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600, color: '#475569' }}>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {propsSideBarHeaderData.map((prop, idx) => (
                    <tr
                      key={prop.name}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                      }}
                    >
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}><code>{prop.name}</code></td>
                      <td style={{ padding: '8px 12px', color: '#6366F1' }}><code>{prop.type}</code></td>
                      <td style={{ padding: '8px 12px', color: '#334155' }}>{prop.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
              &lt;SideBarFooter /&gt;
            </h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                    <th style={{ padding: '10px 12px', fontWeight: 600, color: '#475569' }}>Prop</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600, color: '#475569' }}>Tipo</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600, color: '#475569' }}>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {propsSideBarFooterData.map((prop, idx) => (
                    <tr
                      key={prop.name}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                      }}
                    >
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}><code>{prop.name}</code></td>
                      <td style={{ padding: '8px 12px', color: '#6366F1' }}><code>{prop.type}</code></td>
                      <td style={{ padding: '8px 12px', color: '#334155' }}>{prop.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

/* ==========================================================================
   Configuração do Objeto Meta (Storybook)
   ========================================================================== */

const meta: Meta<typeof SideBar> = {
  title: 'Plataforma Unooria/Componentes/SideBar',
  component: SideBar,
  subcomponents: {
    SideBarItem: SideBarItem as React.ComponentType<any>,
    SideBarSection: SideBarSection as React.ComponentType<any>,
    SideBarHeader: SideBarHeader as React.ComponentType<any>,
    SideBarFooter: SideBarFooter as React.ComponentType<any>,
  },
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['expanded', 'collapsed'],
      description: 'Modo estrutural de exibição da barra lateral.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'expanded' },
      },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Tema visual da barra de navegação.',
      table: {
        category: 'Aparência',
        defaultValue: { summary: 'light' },
      },
    },
    width: {
      control: { type: 'number' },
      description: 'Largura em pixels da SideBar expandida.',
      table: {
        category: 'Dimensões',
        defaultValue: { summary: '232' },
      },
    },
    collapsedWidth: {
      control: { type: 'number' },
      description: 'Largura em pixels da SideBar colapsada.',
      table: {
        category: 'Dimensões',
        defaultValue: { summary: '44' },
      },
    },
    collapsible: {
      control: { type: 'boolean' },
      description: 'Habilita a capacidade de retração/expansão pelo usuário.',
      table: {
        category: 'Comportamento',
        defaultValue: { summary: 'true' },
      },
    },
    showToggleButton: {
      control: { type: 'boolean' },
      description: 'Exibe o botão de alternância (Chevron).',
      table: {
        category: 'Comportamento',
        defaultValue: { summary: 'true' },
      },
    },
    toggleButtonPosition: {
      control: { type: 'select' },
      options: ['header', 'footer', 'floating'],
      description: 'Posição do botão de alternância.',
      table: {
        category: 'Comportamento',
        defaultValue: { summary: 'header' },
      },
    },
  },
  args: {
    layout: 'expanded',
    theme: 'light',
    width: 232,
    collapsedWidth: 44,
    collapsible: true,
    showToggleButton: true,
    toggleButtonPosition: 'header',
  },
};

export default meta;

type Story = StoryObj<typeof SideBar>;

/* ==========================================================================
   1. Documentação Completa (Mandatória)
   ========================================================================== */

/**
 * Documentação rica e completa do componente SideBar com base nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SideBarDocumentationPage />,
};

/* ==========================================================================
   2. Playground Interativo
   ========================================================================== */

/**
 * Playground interativo para testar controles, larguras, temas e seções.
 */
export const Playground: Story = {
  name: '🎮 Playground Interativo',
  render: (args) => {
    const [activeId, setActiveId] = useState<string>('dashboard');

    return (
      <div
        style={{
          display: 'flex',
          height: '560px',
          backgroundColor: args.theme === 'dark' ? '#0F172A' : '#F8FAFC',
          border: '1px solid #CBD5E1',
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'all 0.25s ease',
        }}
      >
        <SideBar
          {...args}
          activeItemId={activeId}
          onItemClick={(item) => setActiveId(item.id)}
          header={
            <SideBarHeader
              logo={<BrandLogoIcon />}
              title="Unooria"
              subtitle="Playground v0.2"
              showToggleButton={args.showToggleButton}
            />
          }
          sections={sampleSections}
          footer={
            <SideBarFooter
              user={sampleUser}
              showToggleButton={args.toggleButtonPosition === 'footer'}
            />
          }
        />

        <div
          style={{
            flex: 1,
            padding: '32px',
            backgroundColor: args.theme === 'dark' ? '#1E293B' : '#FFFFFF',
            color: args.theme === 'dark' ? '#F8FAFC' : '#0F172A',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            overflowY: 'auto',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>
            Área Principal da Aplicação
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: args.theme === 'dark' ? '#94A3B8' : '#64748B' }}>
            Item selecionado na barra lateral: <strong>{activeId}</strong>
          </p>
          <div
            style={{
              marginTop: '16px',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: args.theme === 'dark' ? '#0F172A' : '#F1F5F9',
              fontSize: '13px',
            }}
          >
            💡 Alterne os controles no painel <strong>Controls</strong> abaixo para testar o comportamento de layout colapsado, larguras personalizadas e tema.
          </div>
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   3. Layout Expandido (232px)
   ========================================================================== */

/**
 * Exibe a SideBar em seu estado totalmente expandido conforme a especificação de 232px do Figma.
 */
export const LayoutExpandido: Story = {
  name: '📖 Layout Expandido (232px)',
  render: () => {
    const [selected, setSelected] = useState('chat');

    return (
      <div style={{ height: '520px', display: 'flex', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
        <SideBar
          layout="expanded"
          width={232}
          activeItemId={selected}
          onItemClick={(item) => setSelected(item.id)}
          header={
            <SideBarHeader
              logo={<BrandLogoIcon />}
              title="Unooria Suite"
              subtitle="Omnichannel"
            />
          }
          sections={sampleSections}
          footer={<SideBarFooter user={sampleUser} />}
        />
        <div style={{ flex: 1, padding: '24px', backgroundColor: '#F8FAFC' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
            Módulo Ativo: {selected}
          </h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>
            A SideBar expandida oferece visualização completa dos títulos de seções, contadores Badge numéricos e perfil do usuário.
          </p>
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   4. Layout Colapsado (44px)
   ========================================================================== */

/**
 * Exibe a SideBar compacta em 44px com foco em ícones e tooltips acessíveis.
 */
export const LayoutColapsado: Story = {
  name: '📑 Layout Colapsado (44px)',
  render: () => {
    const [selected, setSelected] = useState('campaigns');

    return (
      <div style={{ height: '520px', display: 'flex', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
        <SideBar
          layout="collapsed"
          collapsedWidth={44}
          activeItemId={selected}
          onItemClick={(item) => setSelected(item.id)}
          header={
            <SideBarHeader
              logo={<BrandLogoIcon />}
              showToggleButton={false}
            />
          }
          sections={sampleSections}
          footer={<SideBarFooter user={{ name: 'Lucas Salomão' }} />}
        />
        <div style={{ flex: 1, padding: '24px', backgroundColor: '#F8FAFC' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
            Modo Compacto de Alta Produtividade (44px)
          </h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748B', lineHeight: '1.6' }}>
            Passe o cursor sobre os ícones para visualizar o <strong>Tooltip Flutuante</strong> lateral. Este modo maximiza o espaço para gráficos analíticos e tabelas densas.
          </p>
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   5. Com Badges e Notificações
   ========================================================================== */

/**
 * Demonstra a integração de badges com diversas variantes semânticas (primary, success, warning, error, info).
 */
export const ComBadgesEAtalhos: Story = {
  name: '🔔 Com Badges e Notificações',
  render: () => (
    <div style={{ height: '520px', display: 'flex', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
      <SideBar layout="expanded" width={260}>
        <SideBarHeader
          logo={<BrandLogoIcon />}
          title="Notificações Unooria"
          subtitle="Status Operacional"
        />
        <SideBarSection title="Fila de Mensagens">
          <SideBarItem
            id="inbox-all"
            icon={<ChatIcon />}
            label="Todas as Mensagens"
            badge="99+"
            badgeVariant="primary"
            active
          />
          <SideBarItem
            id="inbox-urgent"
            icon={<BellIcon />}
            label="Chamados Urgentes"
            badge="5"
            badgeVariant="error"
          />
          <SideBarItem
            id="inbox-leads"
            icon={<UsersIcon />}
            label="Novos Leads"
            badge="12"
            badgeVariant="success"
          />
        </SideBarSection>

        <SideBarSection title="Faturamento & Alertas">
          <SideBarItem
            id="billing"
            icon={<WalletIcon />}
            label="Faturas Pendentes"
            badge="2"
            badgeVariant="warning"
          />
          <SideBarItem
            id="updates"
            icon={<MegaphoneIcon />}
            label="Atualizações de Release"
            badge="v2.4"
            badgeVariant="info"
          />
        </SideBarSection>

        <SideBarFooter user={sampleUser} />
      </SideBar>

      <div style={{ flex: 1, padding: '24px', backgroundColor: '#F8FAFC' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
          Matriz de Badges Semânticos Integrados
        </h4>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748B', lineHeight: '1.6' }}>
          Os badges da SideBar utilizam a mesma paleta e tipografia do componente <code>Badge</code>, garantindo coerência visual em todo o Design System.
        </p>
      </div>
    </div>
  ),
};

/* ==========================================================================
   6. Alternância Interativa (Dashboard Simulator)
   ========================================================================== */

/**
 * Simulador completo de aplicação com alternância dinâmica entre os modos expandido e colapsado via botão Chevron.
 */
export const AlternanciaInterativa: Story = {
  name: '🔄 Alternância Interativa (Dashboard)',
  render: () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [currentRoute, setCurrentRoute] = useState('dashboard');

    return (
      <div
        style={{
          display: 'flex',
          height: '560px',
          border: '1px solid #CBD5E1',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#F8FAFC',
        }}
      >
        <SideBar
          isExpanded={isExpanded}
          onToggleExpanded={setIsExpanded}
          width={240}
          collapsedWidth={44}
          activeItemId={currentRoute}
          onItemClick={(item) => setCurrentRoute(item.id)}
          header={
            <SideBarHeader
              logo={<BrandLogoIcon />}
              title="Unooria Pro"
              subtitle="Workspace"
              showToggleButton={true}
            />
          }
          sections={sampleSections}
          footer={<SideBarFooter user={sampleUser} />}
        />

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Topbar do Simulador */}
          <div
            style={{
              height: '56px',
              borderBottom: '1px solid #E2E8F0',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  color: '#0F172A',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {isExpanded ? '⇦ Recolher Barra (44px)' : '⇨ Expandir Barra (240px)'}
              </button>

              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Status da Barra: <strong>{isExpanded ? 'Expandida (240px)' : 'Colapsada (44px)'}</strong>
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#0F172A', fontWeight: 600 }}>
              <span>Lucas Salomão</span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
            </div>
          </div>

          {/* Conteúdo da Rota */}
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>
                Visão do Módulo: {currentRoute.toUpperCase()}
              </h3>
              <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: '#EEF2FF', color: '#4F46E5', borderRadius: '6px', fontWeight: 600 }}>
                Ambiente de Produção
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
              }}
            >
              <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Atendimentos Ativos</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>128</div>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Tempo Médio de Resposta</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#10B981', marginTop: '4px' }}>1m 42s</div>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Taxa de Resolução</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#0066FF', marginTop: '4px' }}>96.4%</div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6', margin: 0 }}>
              Ao clicar no botão de toggle tanto dentro da SideBar quanto na barra superior, note que o layout se ajusta fluidamente sem quebrar a proporção do conteúdo principal.
            </p>
          </div>
        </div>
      </div>
    );
  },
};
