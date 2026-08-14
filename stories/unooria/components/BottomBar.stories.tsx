import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomBar, BottomBarItem, BottomBarAction } from '../../../src/unooria/components/BottomBar/BottomBar';
import type {
  BottomBarProps,
  BottomBarItemData,
  BottomBarVariant,
  BottomBarTheme,
  BottomBarActionProps,
  BottomBarActionVariant,
} from '../../../src/unooria/components/BottomBar/BottomBar.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../src/unooria/docs';

// ============================================================================
// Ícones SVG Inline Utilitários para Navegação Mobile
// ============================================================================

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

// ============================================================================
// Coleções de Itens Pré-configurados para Demonstrações
// ============================================================================

const sampleItems5: BottomBarItemData[] = [
  { id: 'home', label: 'Início', icon: <HomeIcon /> },
  { id: 'search', label: 'Explorar', icon: <SearchIcon /> },
  { id: 'messages', label: 'Mensagens', icon: <ChatIcon />, badge: 3 },
  { id: 'notifications', label: 'Alertas', icon: <BellIcon />, badge: true },
  { id: 'profile', label: 'Perfil', icon: <UserIcon /> },
];

const sampleItems4: BottomBarItemData[] = [
  { id: 'home', label: 'Início', icon: <HomeIcon /> },
  { id: 'explore', label: 'Descobrir', icon: <SearchIcon /> },
  { id: 'favorites', label: 'Favoritos', icon: <HeartIcon />, badge: '12' },
  { id: 'profile', label: 'Perfil', icon: <UserIcon /> },
];

const sampleItemsTopCenter: BottomBarItemData[] = [
  { id: 'home', label: 'Início', icon: <HomeIcon /> },
  { id: 'feed', label: 'Feed', icon: <GridIcon /> },
  { id: 'chat', label: 'Mensagens', icon: <ChatIcon />, badge: 4 },
  { id: 'profile', label: 'Conta', icon: <UserIcon /> },
];

// ============================================================================
// Página de Documentação Completa (Padrão Ouro Unooria)
// ============================================================================

const BottomBarDocumentationPage = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [themeMode, setThemeMode] = useState<BottomBarTheme>('light');

  const bottomBarPropsData = [
    {
      name: 'variant',
      type: "'fixed' | 'floating' | 'top-center'",
      default: "'fixed'",
      desc: 'Define a variante de layout estrutural da barra: Fixed (ancorada), Floating (dock flutuante) ou Top-Center (com botão FAB elevado).',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Tema visual de cores para superfícies claras ou escuras, com ajuste automático de contraste e reflexos de blur.',
    },
    {
      name: 'items',
      type: 'BottomBarItemData[]',
      default: 'undefined',
      desc: 'Lista declarativa de itens de navegação com id, label, icon, badge e callbacks.',
    },
    {
      name: 'activeId',
      type: 'string',
      default: 'undefined',
      desc: 'ID do item ativo selecionado no modo controlado.',
    },
    {
      name: 'defaultActiveId',
      type: 'string',
      default: 'items[0]?.id',
      desc: 'ID do item inicialmente selecionado no modo não-controlado.',
    },
    {
      name: 'onChange',
      type: '(id: string) => void',
      default: 'undefined',
      desc: 'Callback disparado ao clicar e selecionar um novo item de navegação.',
    },
    {
      name: 'centerAction',
      type: 'ReactNode | BottomBarActionProps',
      default: 'undefined',
      desc: 'Botão de ação central proeminente utilizado na variante top-center ou em layouts customizados.',
    },
    {
      name: 'fixedToBottom',
      type: 'boolean',
      default: 'false',
      desc: 'Se true, fixa a barra automaticamente no rodapé do viewport via position: fixed; bottom: 0; z-index: 1000.',
    },
    {
      name: 'showLabels',
      type: 'boolean',
      default: 'true',
      desc: 'Controla a exibição dos textos/rótulos abaixo dos ícones de cada item.',
    },
    {
      name: 'safeArea',
      type: 'boolean',
      default: 'true',
      desc: 'Aplica padding/margem dinâmica para acomodar a safe area inferior de iPhones e dispositivos móveis.',
    },
    {
      name: 'maxWidth',
      type: 'string | number',
      default: 'undefined',
      desc: 'Largura máxima delimitadora da barra (ex: "560px", "100%", 600) para uso centralizado em tablets e desktop.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Navegação inferior'",
      desc: 'Rótulo acessível fornecido à tag semântica <nav> para tecnologias assistivas e leitores de tela.',
    },
  ];

  const itemPropsData = [
    { name: 'id', type: 'string', desc: 'Identificador único e imutável do item na barra.' },
    { name: 'label', type: 'ReactNode', desc: 'Rótulo textual ou elemento descritivo exibido abaixo do ícone.' },
    { name: 'icon', type: 'ReactNode', desc: 'Ícone visual representativo da rota/destino.' },
    { name: 'badge', type: 'ReactNode | string | number | boolean', desc: 'Marcador de status ou notificações: número, string (ex: "99+"), boolean (dot) ou ReactNode.' },
    { name: 'active', type: 'boolean', desc: 'Estado selecionado/ativo do item.' },
    { name: 'disabled', type: 'boolean', desc: 'Desabilita o item para interações de toque e clique.' },
    { name: 'href', type: 'string', desc: 'URL de destino caso o item atue como link navegável (<a>).' },
    { name: 'onClick', type: '(id: string, e: MouseEvent) => void', desc: 'Callback acionado ao clicar no item.' },
    { name: 'as', type: 'ElementType', desc: 'Elemento polimórfico customizado (ex: Next.js Link, React Router Link, <a>, <button>).' },
    { name: 'ariaLabel', type: 'string', desc: 'Rótulo acessível individual para o item caso o label seja oculto ou customizado.' },
  ];

  const actionPropsData = [
    { name: 'icon', type: 'ReactNode', default: '<PlusIcon />', desc: 'Ícone visual exibido no interior do botão central FAB.' },
    { name: 'label', type: 'string', default: "'Ação rápida'", desc: 'Rótulo acessível ARIA e tooltip descritivo do botão.' },
    { name: 'variant', type: "'primary' | 'secondary' | 'gradient' | 'danger'", default: "'primary'", desc: 'Paleta cromática de destaque do botão central de ação.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Dimensões do botão (sm: 42px, md: 50px, lg: 58px).' },
    { name: 'theme', type: "'light' | 'dark'", default: "'light'", desc: 'Tema visual do botão de ação.' },
    { name: 'disabled', type: 'boolean', default: 'false', desc: 'Desativa interações de clique e esmaece o botão.' },
    { name: 'onClick', type: '(e: MouseEvent) => void', default: 'undefined', desc: 'Callback disparado ao clicar no botão de ação.' },
    { name: 'as', type: 'ElementType', default: "'button'", desc: 'Componente polimórfico customizado.' },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Navegação Mobile"
        title="BottomBar"
        description="A BottomBar é o componente primordial de navegação inferior para aplicações mobile-first, web apps responsivos e PWAs do ecossistema Unooria. Projetada com fidelidade rigorosa às especificações do Figma, oferece três variantes consolidadas: Fixed (ancorada na base da viewport), Floating Dock (estilo dock flutuante com blur translúcido e elevação) e Top-Center (com botão central FAB elevado para ações primárias)."
      />

      {/* 1. Visão Geral & Casos de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Motivos de Uso"
          description="Diretrizes ergonômicas de toque, usabilidade e arquitetura mobile da Plataforma Unooria"
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
              👍 Ergonomia da Zona do Polegar (Thumb Zone)
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Posicionada na região inferior da tela de maior facilidade de alcance com uma única mão, reduzindo a fadiga motora em smartphones.
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
              🚀 3 Variantes Estruturais Oficiais
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Permite alternar com flexibilidade entre <strong>Fixed</strong> (largura total), <strong>Floating Dock</strong> (pílula flutuante moderna) e <strong>Top-Center</strong> (com FAB integrado).
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
              ✨ Efeitos Visuais & Safe-Area Nativa
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Inclui vidro translúcido com <code style={{ fontSize: '12px', background: '#E2E8F0', padding: '2px 4px', borderRadius: '4px' }}>backdrop-filter: blur(12px)</code>, sombras de elevação e adaptação automática à barra inicial do iOS/Android.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Figma & Especificações Técnicas */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="2. Figma & Especificações Técnicas"
          description="Rastreabilidade direta com os nós e protótipos oficiais do arquivo Unooria DS v0.2"
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
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              paddingBottom: '20px',
              borderBottom: '1px solid #F1F5F9',
              marginBottom: '20px',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#6366F1',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Arquivo de Design Figma
              </span>
              <strong style={{ fontSize: '16px', color: '#1E293B' }}>
                Unooria_DS_v0.2 • Bottom Navigation & Dock Bar
              </strong>
            </div>
            <a
              href="https://www.figma.com/design/i0HRQSBtQQ9ZXDYiJPRnGv/Unooria_DS_v0.2?node-id=3340-11320&m=dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#6366F1',
                color: '#FFFFFF',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '13px',
                transition: 'background-color 0.2s',
              }}
            >
              <span>Abrir no Figma Dev Mode</span>
              <span>↗</span>
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, display: 'block' }}>NODE ID PRINCIPAL</span>
              <code style={{ fontSize: '14px', color: '#006BFF', fontWeight: 600 }}>3340:11320</code>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#475569' }}>
                Especificação mestre de layout, espaçamentos e variantes de estado da BottomBar.
              </p>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, display: 'block' }}>FLOATING DOCK & BLUR</span>
              <code style={{ fontSize: '14px', color: '#10B981', fontWeight: 600 }}>6034:1213</code>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#475569' }}>
                Tokens de raio 28px, backdrop-filter de 12px e elevações para modo claro/escuro.
              </p>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, display: 'block' }}>FAB ACTION BUTTON</span>
              <code style={{ fontSize: '14px', color: '#F59E0B', fontWeight: 600 }}>991:7131</code>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#475569' }}>
                Botão central elevado (translateY -18px) com paletas Primary, Secondary, Gradient e Danger.
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: '#F1F5F9', borderRadius: '8px', padding: '16px', fontSize: '13px', color: '#334155' }}>
            <strong>Resumo dos Tokens CSS Aplicados:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', lineHeight: '1.7' }}>
              <li><strong>Alturas Base:</strong> 64px para Fixed e Top-Center; 60px para Floating Dock.</li>
              <li><strong>Cores Superfície Light:</strong> <code style={{ fontSize: '12px' }}>rgba(255, 255, 255, 0.94)</code> (Fixed) e <code style={{ fontSize: '12px' }}>rgba(255, 255, 255, 0.88)</code> (Floating).</li>
              <li><strong>Cores Superfície Dark:</strong> <code style={{ fontSize: '12px' }}>rgba(34, 39, 42, 0.94)</code> (Fixed) e <code style={{ fontSize: '12px' }}>rgba(34, 39, 42, 0.88)</code> (Floating).</li>
              <li><strong>Efeito Translúcido:</strong> <code style={{ fontSize: '12px' }}>backdrop-filter: blur(12px)</code>.</li>
              <li><strong>Raio da Pílula:</strong> 28px (<code style={{ fontSize: '12px' }}>border-radius: 28px</code>).</li>
              <li><strong>Acomodação de Tela:</strong> <code style={{ fontSize: '12px' }}>env(safe-area-inset-bottom, 8px)</code>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Anatomia do Componente & Efeitos */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="3. Anatomia do Componente e Efeitos Visuais"
          description="Estrutura de montagem interna, zonas interativas e reflexos de profundidade"
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
          {/* Demonstração visual interativa sobre fundo com textura/gradiente para evidenciar o blur */}
          <div
            style={{
              padding: '32px 16px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B8DD6 100%)',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Elementos visuais decorativos de fundo para testar o blur */}
            <div
              style={{
                position: 'absolute',
                width: '180px',
                height: '60px',
                backgroundColor: '#FDE047',
                borderRadius: '30px',
                top: '20px',
                left: '15%',
                transform: 'rotate(-10deg)',
                opacity: 0.8,
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '120px',
                height: '120px',
                backgroundColor: '#EC4899',
                borderRadius: '50%',
                bottom: '10px',
                right: '18%',
                opacity: 0.75,
              }}
            />

            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600, marginBottom: '16px', textShadow: '0 1px 2px rgba(0,0,0,0.4)', zIndex: 1 }}>
              Efeito de Blur (12px) e Elevação sobre Superfície Texturizada:
            </span>

            <div style={{ width: '100%', maxWidth: '420px', zIndex: 2 }}>
              <BottomBar
                variant="floating"
                theme="light"
                items={sampleItems5}
                activeId={activeTab}
                onChange={(id) => setActiveTab(id)}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
              fontSize: '13px',
            }}
          >
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#006BFF', display: 'block', marginBottom: '2px' }}>1. Container da Barra:</strong>
              Superfície com blur translúcido, bordas suaves e controle de largura máxima.
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#006BFF', display: 'block', marginBottom: '2px' }}>2. Itens de Navegação:</strong>
              Área de toque mínima de 48x48px com ícone, feedback tátil e rótulo.
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#006BFF', display: 'block', marginBottom: '2px' }}>3. Indicadores / Badges:</strong>
              Pílulas de notificação com suporte a números, contadores (+99) e pontos (dot).
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#006BFF', display: 'block', marginBottom: '2px' }}>4. Botão Central FAB:</strong>
              Ação de criação proeminente elevada (<code style={{ fontSize: '11px' }}>translateY(-18px)</code>).
            </div>
          </div>
        </div>
      </section>

      {/* 4. Matriz de Variantes de Layout */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="4. Matriz de Variantes de Layout"
          description="Comparação prática das três variantes suportadas: Fixed, Floating Dock e Top-Center"
          barColor="#F59E0B"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
          {/* Variante 1: Fixed */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#006BFF', textTransform: 'uppercase' }}>Variante 1</span>
              <h4 style={{ margin: '2px 0 4px 0', fontSize: '16px', color: '#1E293B' }}>Fixed (Ancorada com Largura Total)</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                Ideal para aplicativos clássicos ancorados diretamente no rodapé da janela, com borda sutil divisória superior.
              </p>
            </div>
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px 0 0 0' }}>
              <BottomBar variant="fixed" items={sampleItems5} activeId="home" />
            </div>
          </div>

          {/* Variante 2: Floating Dock */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>Variante 2</span>
              <h4 style={{ margin: '2px 0 4px 0', fontSize: '16px', color: '#1E293B' }}>Floating Dock (Pílula Flutuante com Blur)</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                Design moderno tipo ilha/dock com cantos arredondados de 28px, elevação pronunciada e descolamento do rodapé.
              </p>
            </div>
            <div style={{ backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px 12px' }}>
              <BottomBar variant="floating" maxWidth="480px" items={sampleItems4} activeId="explore" />
            </div>
          </div>

          {/* Variante 3: Top-Center com FAB */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase' }}>Variante 3</span>
              <h4 style={{ margin: '2px 0 4px 0', fontSize: '16px', color: '#1E293B' }}>Top-Center (Com Botão FAB Central Elevado)</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                Divide os itens igualmente em duas asas laterais com um botão de ação primária (+) em destaque central superior.
              </p>
            </div>
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '28px 0 0 0' }}>
              <BottomBar
                variant="top-center"
                items={sampleItemsTopCenter}
                activeId="home"
                centerAction={
                  <BottomBarAction
                    variant="gradient"
                    size="md"
                    label="Nova postagem"
                    onClick={() => alert('Ação central acionada!')}
                  />
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Diretrizes de Design & Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="5. Diretrizes de Design & Boas Práticas" barColor="#EF4444" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginTop: '16px',
          }}
        >
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
              <li>Mantenha entre <strong>3 e 5 itens principais</strong> para evitar agrupamento excessivo e poluição visual.</li>
              <li>Utilize a variante <strong>Top-Center</strong> quando o produto tiver uma ação de criação frequente (Novo Pedido, Criar Post, Adicionar).</li>
              <li>Habilite sempre <code style={{ fontSize: '12px' }}>safeArea: true</code> para preservar a usabilidade na barra de gestos do iOS e Android.</li>
              <li>Forneça rótulos de texto concisos (1 palavra) para reforçar o significado dos ícones.</li>
              <li>Utilize a propriedade <code style={{ fontSize: '12px' }}>maxWidth</code> quando renderizar a barra flutuante em tablets e telas largas.</li>
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
              <li>Não utilize mais de 5 destinos na BottomBar; para rotas adicionais, utilize uma aba de menu &quot;Mais&quot;.</li>
              <li>Não coloque ações destrutivas (ex: Excluir, Sair) diretamente como itens fixos da barra inferior.</li>
              <li>Não misture a BottomBar com uma Sidebar Desktop aberta que possua exatamente as mesmas opções na mesma viewport.</li>
              <li>Não oculte rótulos de texto a menos que os ícones sejam universalmente compreensíveis no contexto do produto.</li>
              <li>Não utilize texto de rótulo longo que cause quebra de linha ou truncamento excessivo.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Suporte a Temas (Light e Dark) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="6. Suporte a Temas (Light e Dark Mode)" barColor="#06B6D4" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px', marginBottom: '20px' }}>
          <span style={{ fontSize: '14px', color: '#475569', fontWeight: 600 }}>Alternar Preview do Tema:</span>
          <button
            onClick={() => setThemeMode('light')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              backgroundColor: themeMode === 'light' ? '#006BFF' : '#FFFFFF',
              color: themeMode === 'light' ? '#FFFFFF' : '#334155',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            ☀️ Modo Claro (Light)
          </button>
          <button
            onClick={() => setThemeMode('dark')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #475569',
              backgroundColor: themeMode === 'dark' ? '#006BFF' : '#1E293B',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            🌙 Modo Escuro (Dark)
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Caixa Light Mode */}
          <div
            style={{
              padding: '24px 16px',
              border: '1px solid #CBD4D6',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', color: '#22272A', fontSize: '14px', fontWeight: 700 }}>
              ☀️ Light Mode (Superfície Clara)
            </h4>
            <div style={{ backgroundColor: '#F8FAFC', padding: '16px 8px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <BottomBar theme="light" variant="floating" items={sampleItems4} activeId="home" />
            </div>
          </div>

          {/* Caixa Dark Mode */}
          <div
            style={{
              padding: '24px 16px',
              borderRadius: '12px',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', color: '#F1F5F9', fontSize: '14px', fontWeight: 700 }}>
              🌙 Dark Mode (Superfície Escura)
            </h4>
            <div style={{ backgroundColor: '#0F172A', padding: '16px 8px', borderRadius: '8px', border: '1px solid #1E293B' }}>
              <BottomBar theme="dark" variant="floating" items={sampleItems4} activeId="home" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Tabela Completa de Props da API */}
      <section>
        <UnooriaDocSectionHeader title="7. Referência Completa das Propriedades (Props API)" barColor="#64748B" />

        {/* Props de BottomBar */}
        <div style={{ overflowX: 'auto', marginTop: '16px', marginBottom: '32px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            BottomBarProps (Componente Raiz)
          </h4>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '14px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Propriedade</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Padrão</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {bottomBarPropsData.map((prop) => (
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

        {/* Props de BottomBarItemData */}
        <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            BottomBarItemData / BottomBarItemProps (Itens de Navegação)
          </h4>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '14px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
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

        {/* Props de BottomBarActionProps */}
        <div style={{ overflowX: 'auto' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            BottomBarActionProps (Botão de Ação Central FAB)
          </h4>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '14px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Propriedade</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Padrão</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {actionPropsData.map((prop) => (
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

// ============================================================================
// Configuração do Storybook Meta
// ============================================================================

const meta: Meta<typeof BottomBar> = {
  title: 'Plataforma Unooria/Componentes/BottomBar',
  component: BottomBar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['fixed', 'floating', 'top-center'],
      description: 'Variante de layout da BottomBar (Fixed, Floating Dock ou Top-Center com FAB).',
      table: {
        defaultValue: { summary: 'fixed' },
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
    showLabels: {
      control: 'boolean',
      description: 'Se deve exibir os textos/labels dos itens.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    safeArea: {
      control: 'boolean',
      description: 'Se deve aplicar espaçamento inferior para safe-area de dispositivos móveis.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    fixedToBottom: {
      control: 'boolean',
      description: 'Se deve fixar a barra automaticamente no rodapé do viewport.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    maxWidth: {
      control: 'text',
      description: 'Largura máxima delimitadora da barra (ex: "520px", "100%").',
    },
    ariaLabel: {
      control: 'text',
      description: 'Rótulo acessível da tag <nav>.',
      table: {
        defaultValue: { summary: 'Navegação inferior' },
      },
    },
  },
  args: {
    variant: 'fixed',
    theme: 'light',
    showLabels: true,
    safeArea: true,
    fixedToBottom: false,
    items: sampleItems5,
  },
};

export default meta;
type Story = StoryObj<typeof BottomBar>;

// ============================================================================
// Estórias na Ordem Obrigatória
// ============================================================================

/**
 * 1ª Estória (Mandatória): Documentação rica e completa baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BottomBarDocumentationPage />,
};

/**
 * 2ª Estória: Playground interativo com controles configuráveis e fundo adaptável.
 */
export const Playground: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState<string>('home');

    return (
      <div
        style={{
          padding: '40px 16px',
          borderRadius: '16px',
          backgroundColor: args.theme === 'dark' ? '#0F172A' : '#F1F5F9',
          border: `1px solid ${args.theme === 'dark' ? '#334155' : '#E2E8F0'}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
        }}
      >
        <div style={{ width: '100%', maxWidth: args.maxWidth || '480px' }}>
          <BottomBar
            {...args}
            activeId={activeTab}
            onChange={(id) => setActiveTab(id)}
          />
        </div>
      </div>
    );
  },
  args: {
    variant: 'floating',
    theme: 'light',
    showLabels: true,
    safeArea: true,
    maxWidth: '460px',
    items: sampleItems5,
  },
};

/**
 * 3ª Estória: Variante Flutuante (Floating Dock) com blur translúcido e cantos arredondados.
 */
export const VarianteFlutuante: Story = {
  render: () => {
    const [activeId, setActiveId] = useState<string>('home');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Demonstração em Tema Claro */}
        <div
          style={{
            padding: '32px 16px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
            border: '1px solid #CBD5E1',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '16px', textAlign: 'center' }}>
            ☀️ Floating Dock • Tema Claro (Light)
          </span>
          <div style={{ maxWidth: '440px', margin: '0 auto' }}>
            <BottomBar
              variant="floating"
              theme="light"
              items={sampleItems4}
              activeId={activeId}
              onChange={(id) => setActiveId(id)}
            />
          </div>
        </div>

        {/* Demonstração em Tema Escuro */}
        <div
          style={{
            padding: '32px 16px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            border: '1px solid #334155',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#F1F5F9', display: 'block', marginBottom: '16px', textAlign: 'center' }}>
            🌙 Floating Dock • Tema Escuro (Dark)
          </span>
          <div style={{ maxWidth: '440px', margin: '0 auto' }}>
            <BottomBar
              variant="floating"
              theme="dark"
              items={sampleItems4}
              activeId={activeId}
              onChange={(id) => setActiveId(id)}
            />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * 4ª Estória: Variante Fixa (Fixed) ancorada na base com largura total e linha divisória sutil.
 */
export const VarianteFixa: Story = {
  render: () => {
    const [selectedTab, setSelectedTab] = useState<string>('search');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
            <h4 style={{ margin: 0, fontSize: '14px', color: '#1E293B' }}>Fixed Bottom Navigation (Largura Total - Light)</h4>
          </div>
          <BottomBar
            variant="fixed"
            theme="light"
            items={sampleItems5}
            activeId={selectedTab}
            onChange={(id) => setSelectedTab(id)}
          />
        </div>

        <div style={{ border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', backgroundColor: '#0F172A', borderBottom: '1px solid #334155' }}>
            <h4 style={{ margin: 0, fontSize: '14px', color: '#F1F5F9' }}>Fixed Bottom Navigation (Largura Total - Dark)</h4>
          </div>
          <BottomBar
            variant="fixed"
            theme="dark"
            items={sampleItems5}
            activeId={selectedTab}
            onChange={(id) => setSelectedTab(id)}
          />
        </div>
      </div>
    );
  },
};

/**
 * 5ª Estória: Variante Top-Center com botão central FAB proeminente (+).
 */
export const VarianteTopCenter: Story = {
  render: () => {
    const [activeId, setActiveId] = useState<string>('home');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Botão Central com Gradiente */}
        <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px 16px', backgroundColor: '#F8FAFC' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '24px', textAlign: 'center' }}>
            ✨ Botão Central em Gradiente (Variant: Gradient)
          </span>
          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <BottomBar
              variant="top-center"
              theme="light"
              items={sampleItemsTopCenter}
              activeId={activeId}
              onChange={(id) => setActiveId(id)}
              centerAction={
                <BottomBarAction
                  variant="gradient"
                  size="md"
                  label="Criar nova publicação"
                  onClick={() => alert('Abrir modal de criação!')}
                />
              }
            />
          </div>
        </div>

        {/* Botão Central Primary no Tema Escuro */}
        <div style={{ border: '1px solid #334155', borderRadius: '12px', padding: '24px 16px', backgroundColor: '#0F172A' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#F1F5F9', display: 'block', marginBottom: '24px', textAlign: 'center' }}>
            🌙 Botão Central Primary no Modo Escuro (Variant: Primary / Theme: Dark)
          </span>
          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <BottomBar
              variant="top-center"
              theme="dark"
              items={sampleItemsTopCenter}
              activeId={activeId}
              onChange={(id) => setActiveId(id)}
              centerAction={
                <BottomBarAction
                  variant="primary"
                  theme="dark"
                  size="md"
                  label="Nova mensagem"
                  onClick={() => alert('Criar novo chat!')}
                />
              }
            />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * 6ª Estória: Simulador Mobile Interativo de Smartphone com tela de aplicativo realista.
 */
export const SimuladorMobile: Story = {
  name: '📱 Simulador Mobile Completo',
  render: () => {
    const [selectedTab, setSelectedTab] = useState<string>('home');
    const [barVariant, setBarVariant] = useState<BottomBarVariant>('floating');
    const [theme, setTheme] = useState<BottomBarTheme>('light');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          padding: '20px',
        }}
      >
        {/* Painel de Controle do Simulador */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '12px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>Controles do Smartphone:</span>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setBarVariant('floating')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: barVariant === 'floating' ? '#006BFF' : '#F8FAFC',
                color: barVariant === 'floating' ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Dock Flutuante
            </button>
            <button
              onClick={() => setBarVariant('fixed')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: barVariant === 'fixed' ? '#006BFF' : '#F8FAFC',
                color: barVariant === 'fixed' ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Barra Fixa
            </button>
            <button
              onClick={() => setBarVariant('top-center')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: barVariant === 'top-center' ? '#006BFF' : '#F8FAFC',
                color: barVariant === 'top-center' ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Top-Center FAB
            </button>
          </div>

          <div style={{ height: '18px', width: '1px', backgroundColor: '#E2E8F0', margin: '0 4px' }} />

          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              backgroundColor: theme === 'dark' ? '#1E293B' : '#F8FAFC',
              color: theme === 'dark' ? '#FFFFFF' : '#334155',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {theme === 'light' ? '☀️ Claro' : '🌙 Escuro'}
          </button>
        </div>

        {/* Moldura de Smartphone (Device Frame) */}
        <div
          style={{
            width: '360px',
            height: '720px',
            backgroundColor: theme === 'dark' ? '#0B0F19' : '#F8FAFC',
            borderRadius: '44px',
            border: '10px solid #1E293B',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Dynamic Island / Notch */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '110px',
              height: '24px',
              backgroundColor: '#000000',
              borderRadius: '20px',
              zIndex: 30,
            }}
          />

          {/* Barra de Status Superior */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 24px 6px 24px',
              fontSize: '12px',
              fontWeight: 600,
              color: theme === 'dark' ? '#F1F5F9' : '#0F172A',
              zIndex: 20,
            }}
          >
            <span>09:41</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span>5G</span>
              <span style={{ fontSize: '10px' }}>100%</span>
            </div>
          </div>

          {/* Cabeçalho do App */}
          <div
            style={{
              padding: '12px 20px',
              borderBottom: `1px solid ${theme === 'dark' ? '#1E293B' : '#E2E8F0'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: theme === 'dark' ? '#0F172A' : '#FFFFFF',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', color: '#006BFF', fontWeight: 700, textTransform: 'uppercase' }}>Unooria App</span>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: theme === 'dark' ? '#F8FAFC' : '#1E293B' }}>
                {selectedTab === 'home' && 'Feed Principal'}
                {selectedTab === 'search' && 'Explorar Conteúdo'}
                {selectedTab === 'messages' && 'Conversas'}
                {selectedTab === 'notifications' && 'Notificações'}
                {selectedTab === 'profile' && 'Meu Perfil'}
                {selectedTab === 'feed' && 'Publicações'}
                {selectedTab === 'chat' && 'Mensagens Diretas'}
              </h3>
            </div>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#7FA5E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 700,
              }}
            >
              UN
            </div>
          </div>

          {/* Conteúdo com Scroll da Tela */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 20px 90px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div
              style={{
                padding: '16px',
                borderRadius: '16px',
                background: theme === 'dark' ? 'linear-gradient(135deg, #1E293B, #0F172A)' : 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
                border: `1px solid ${theme === 'dark' ? '#334155' : '#C7D2FE'}`,
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#4F46E5', display: 'block', marginBottom: '4px' }}>
                Destaque do Dia
              </span>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: theme === 'dark' ? '#FFFFFF' : '#1E293B' }}>
                Design System Unooria v0.2
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: theme === 'dark' ? '#94A3B8' : '#475569', lineHeight: '1.5' }}>
                Navegação responsiva, ergonomia para polegar e componentes acessíveis com fidelidade total aos tokens.
              </p>
            </div>

            {/* Cards de Exemplo */}
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
                  border: `1px solid ${theme === 'dark' ? '#334155' : '#E2E8F0'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: theme === 'dark' ? '#334155' : '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#006BFF',
                    fontWeight: 700,
                  }}
                >
                  #{item}
                </div>
                <div style={{ flex: 1 }}>
                  <h5 style={{ margin: '0 0 2px 0', fontSize: '13px', color: theme === 'dark' ? '#F1F5F9' : '#1E293B' }}>
                    Item de Notificação {item}
                  </h5>
                  <p style={{ margin: 0, fontSize: '11px', color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
                    Atualização sincronizada há 10 minutos
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Barra de Navegação Inferior Posicionada */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: barVariant === 'floating' ? '0 12px 6px 12px' : 0,
              zIndex: 25,
            }}
          >
            <BottomBar
              variant={barVariant}
              theme={theme}
              items={barVariant === 'top-center' ? sampleItemsTopCenter : sampleItems5}
              activeId={selectedTab}
              onChange={(id) => setSelectedTab(id)}
              centerAction={
                barVariant === 'top-center' ? (
                  <BottomBarAction
                    variant="gradient"
                    size="md"
                    label="Adicionar novo"
                    onClick={() => alert('Ação central acionada no simulador!')}
                  />
                ) : undefined
              }
            />
          </div>

          {/* Indicador de Barra Inicial do iPhone (Home Bar) */}
          <div
            style={{
              position: 'absolute',
              bottom: '6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '130px',
              height: '4px',
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)',
              borderRadius: '2px',
              zIndex: 30,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    );
  },
};
