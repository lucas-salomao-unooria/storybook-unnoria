import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomBar, BottomBarItem, AppsIcon, MenuIcon } from '../../../src/unooria/components/BottomBar/BottomBar';
import { BottomBarProps, BottomBarItemData } from '../../../src/unooria/components/BottomBar/BottomBar.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

// Ícones SVG inline para ilustrar navegação
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

const BookOpenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const sampleItems: BottomBarItemData[] = [
  { id: 'home', label: 'Início', icon: <HomeIcon />, tooltip: 'Página Inicial' },
  { id: 'search', label: 'Pesquisar', icon: <SearchIcon />, tooltip: 'Pesquisar Cursos' },
  { id: 'courses', label: 'Meus Cursos', icon: <BookOpenIcon />, tooltip: 'Meus Cursos', badge: '3' },
  { id: 'profile', label: 'Perfil', icon: <UserIcon />, tooltip: 'Minha Conta' },
];

const sampleMobMenu = [
  { id: '1', label: 'Aprendizagem Industrial', icon: <BookOpenIcon /> },
  { id: '2', label: 'Carreira e empregabilidade', icon: <UserIcon /> },
  { id: '3', label: 'Senai Play', icon: <HomeIcon /> },
  { id: '4', label: 'Futuro Digital', icon: <SearchIcon /> },
  { id: '5', label: 'Mundo Senai', icon: <BookOpenIcon /> },
  { id: '6', label: 'Simulador de entrevista', icon: <PlusIcon /> },
];

/**
 * Página de Documentação Rica do BottomBar baseada no Padrão Ouro do Design System Unooria
 */
const BottomBarDocumentationPage = () => {
  return (
    <UnooriaDocShell>
      {/* 1. Cabeçalho Oficial */}
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Navegação & Estrutura"
        title="BottomBar"
        description="A Bottom Bar é o componente de navegação posicionado na parte inferior da tela, permitindo acesso imediato aos módulos principais com Tooltips no hover a 4px de distância e suporte ao menu expansível mobile (Menu-Mob)."
      />

      {/* 2. Visão Geral */}
      <UnooriaDocSectionHeader
        title="1. Visão Geral & O que são"
        description="Conceito e especificações de uso extraídos diretamente do Figma."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            padding: 24,
            borderRadius: 12,
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#22272A', fontSize: 16 }}>🎯 O que são</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#475157' }}>
            A <strong>Bottom Bar</strong> é um componente de navegação horizontal posicionado na parte inferior da tela, permitindo acesso rápido a detalhes ou funcionalidades principais de uma aplicação.
            Oferece navegação clara e acessível, especialmente em dispositivos móveis, onde é fácil de alcançar com o polegar.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            padding: 24,
            borderRadius: 12,
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#6487C2', fontSize: 16 }}>📐 Tooltips a 4px de Distância</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#475157' }}>
            Conforme a diretriz do Figma, cada botão inclui um complemento visual — o tooltip com o nome da página —
            mantendo rigorosamente o espaçamento de <strong>4px</strong> entre o botão e o tooltip.
          </p>
        </div>
      </div>

      {/* 3. Figma Specs */}
      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Links oficiais e nós de design homologados."
      />
      <div
        style={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: 8,
          padding: 20,
          marginBottom: 32,
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 12, color: '#49699F', textTransform: 'uppercase', fontWeight: 600 }}>
              Figma Frame Node ID
            </span>
            <div style={{ fontSize: 16, color: '#22272A', fontWeight: 700, fontFamily: 'monospace' }}>
              3340:11320 (Bottom Bar)
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #CBD5E1', paddingLeft: 16 }}>
            <span style={{ fontSize: 12, color: '#49699F', textTransform: 'uppercase', fontWeight: 600 }}>
              Component Sets
            </span>
            <div style={{ fontSize: 14, color: '#22272A', fontWeight: 600 }}>
              Action Botton Bar (#21641:1072) • Menu-Mob (#22274:17632)
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <a
              href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=3340-11320&m=dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                backgroundColor: '#6487C2',
                color: '#FFFFFF',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Abrir no Figma Dev Mode ↗
            </a>
          </div>
        </div>
      </div>

      {/* 4. Matriz do Figma */}
      <UnooriaDocSectionHeader
        title="3. Matriz do Figma (Desktop Action Bar & Mobile Dock)"
        description="Exibição comparativa dos formatos Desktop e Mobile do Figma."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 32 }}>
        {/* Desktop */}
        <div style={{ padding: 24, backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#22272A' }}>🖥️ Barra de Ações Desktop (#991:7131 / #21641:1072)</h4>
          <BottomBar
            variant="floating"
            items={sampleItems}
            defaultActiveId="courses"
          />
        </div>

        {/* Mobile Dock Menu-Mob */}
        <div style={{ padding: 24, backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#22272A' }}>📱 Mobile Dock com Popover Menu-Mob (#22274:17632)</h4>
          <BottomBar
            variant="mobile-dock"
            menuMobItems={sampleMobMenu}
          />
        </div>
      </div>

      {/* 5. API Props */}
      <UnooriaDocSectionHeader
        title="4. Referência Completa de Props da API"
        description="Todas as propriedades disponíveis para configuração do componente BottomBar."
      />
      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, overflow: 'hidden' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600, fontSize: 14 }}>Propriedade</th>
              <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600, fontSize: 14 }}>Tipo</th>
              <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600, fontSize: 14 }}>Padrão</th>
              <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600, fontSize: 14 }}>Descrição</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: 14, color: '#475157' }}>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>items</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>BottomBarItemData[]</td>
              <td style={{ padding: '12px 16px' }}>-</td>
              <td style={{ padding: '12px 16px' }}>Array de itens de navegação a serem exibidos.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>variant</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>'fixed' | 'floating' | 'mobile-dock' | 'top-center'</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>'floating'</td>
              <td style={{ padding: '12px 16px' }}>Variante visual e de layout da barra.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>theme</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>BottomBarTheme</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>'light'</td>
              <td style={{ padding: '12px 16px' }}>Tema de cor da barra (light ou dark).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>activeId</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>string</td>
              <td style={{ padding: '12px 16px' }}>-</td>
              <td style={{ padding: '12px 16px' }}>ID do item atualmente ativo (controlado).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>defaultActiveId</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>string</td>
              <td style={{ padding: '12px 16px' }}>-</td>
              <td style={{ padding: '12px 16px' }}>ID do item inicialmente ativo (não controlado).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>onChange</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>{`(id: string, item?: BottomBarItemData) => void`}</td>
              <td style={{ padding: '12px 16px' }}>-</td>
              <td style={{ padding: '12px 16px' }}>Callback acionado ao alterar o item ativo.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>maxWidth</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>string | number</td>
              <td style={{ padding: '12px 16px' }}>-</td>
              <td style={{ padding: '12px 16px' }}>Largura máxima da barra.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>hasSafeArea</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>boolean</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>false</td>
              <td style={{ padding: '12px 16px' }}>Adiciona espaçamento inferior para safe area.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>action</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>BottomBarActionProps | ReactNode</td>
              <td style={{ padding: '12px 16px' }}>-</td>
              <td style={{ padding: '12px 16px' }}>Botão de ação principal (ex: FAB) injetado na barra.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>actionPosition</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>'center' | 'end'</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>'center'</td>
              <td style={{ padding: '12px 16px' }}>Posição do botão de ação.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>menuMobItems</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>BottomBarMenuItem[]</td>
              <td style={{ padding: '12px 16px' }}>-</td>
              <td style={{ padding: '12px 16px' }}>Itens para renderizar no menu expansível (mobile-dock).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>isMenuMobOpen</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>boolean</td>
              <td style={{ padding: '12px 16px' }}>-</td>
              <td style={{ padding: '12px 16px' }}>Estado controlado de abertura do menu expansível.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>onMenuMobToggle</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>{`(isOpen: boolean) => void`}</td>
              <td style={{ padding: '12px 16px' }}>-</td>
              <td style={{ padding: '12px 16px' }}>Callback disparado ao alternar a visibilidade do menu.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>className / style</td>
              <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>string / CSSProperties</td>
              <td style={{ padding: '12px 16px' }}>-</td>
              <td style={{ padding: '12px 16px' }}>Customizações de estilo adicionais.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 6. Boas Práticas */}
      <UnooriaDocSectionHeader
        title="5. Boas Práticas (Do's & Don'ts)"
        description="Diretrizes de uso para garantir consistência e acessibilidade."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 32 }}>
        <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: 24, borderRadius: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>✅</span>
            <h4 style={{ margin: 0, color: '#065F46', fontSize: 16 }}>Do (Faça)</h4>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: '#064E3B', lineHeight: 1.6 }}>
            Use a variante <strong>mobile-dock</strong> em dispositivos com telas pequenas para economizar espaço e agrupar múltiplos itens de navegação dentro do menu expansível de forma eficiente.
          </p>
        </div>

        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: 24, borderRadius: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>❌</span>
            <h4 style={{ margin: 0, color: '#991B1B', fontSize: 16 }}>Don't (Evite)</h4>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: '#7F1D1D', lineHeight: 1.6 }}>
            Não inclua muitos botões de ação primária ou coloque botões extras flutuando isolados. A variante <strong>top-center</strong> deve apresentar apenas <strong>uma única</strong> ação principal proeminente.
          </p>
        </div>
      </div>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof BottomBar> = {
  title: 'Plataforma Unooria/Componentes/BottomBar',
  component: BottomBar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['fixed', 'floating', 'mobile-dock'],
      description: 'Variante de layout da barra inferior',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual de cor',
    },
  },
  args: {
    variant: 'floating',
    theme: 'light',
    items: sampleItems,
    menuMobItems: sampleMobMenu,
  },
};

export default meta;

type Story = StoryObj<typeof BottomBar>;

export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BottomBarDocumentationPage />,
};

export const Playground: Story = {
  name: '🎮 Playground Interativo',
  render: (args) => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center', backgroundColor: args.theme === 'dark' ? '#22272A' : '#F8FAFC', borderRadius: 12 }}>
      <BottomBar {...args} />
    </div>
  ),
};

export const MobileDockMenuMob: Story = {
  name: '📱 Mobile Dock (Menu-Mob Popover)',
  render: () => (
    <div style={{ padding: 60, display: 'flex', justifyContent: 'center', backgroundColor: '#F8FAFC', borderRadius: 12, minHeight: 400, alignItems: 'flex-end' }}>
      <BottomBar variant="mobile-dock" menuMobItems={sampleMobMenu} isMenuMobOpen={true} />
    </div>
  ),
};
