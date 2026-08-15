import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SideBar, SideBarItem } from '../../../src/unooria/components/SideBar/SideBar';
import { SideBarProps, SideBarItemData, SideBarAppItem } from '../../../src/unooria/components/SideBar/SideBar.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

// Ícones SVG inline para ilustrar a sidebar
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CoursesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const sampleSideItems: SideBarItemData[] = [
  { id: 'home', label: 'Início', icon: <HomeIcon />, tooltip: 'Página Inicial' },
  { id: 'courses', label: 'Meus Cursos', icon: <CoursesIcon />, tooltip: 'Meus Cursos', badge: '3' },
  { id: 'analytics', label: 'Progresso', icon: <AnalyticsIcon />, tooltip: 'Desempenho' },
  { id: 'settings', label: 'Configurações', icon: <SettingsIcon />, tooltip: 'Ajustes' },
];

const sampleAppsList: SideBarAppItem[] = [
  { id: 'app1', label: 'Aprendizagem Industrial', icon: <CoursesIcon /> },
  { id: 'app2', label: 'Carreira e empregabilidade', icon: <HomeIcon /> },
  { id: 'app3', label: 'Senai Play', icon: <AnalyticsIcon /> },
  { id: 'app4', label: 'Futuro Digital', icon: <SettingsIcon /> },
  { id: 'app5', label: 'Mundo Senai', icon: <CoursesIcon /> },
  { id: 'app6', label: 'Simulador de entrevista', icon: <HomeIcon /> },
];

/**
 * Página de Documentação Rica da SideBar baseada no Padrão Ouro do Design System Unooria
 */
const SideBarDocumentationPage = () => {
  return (
    <UnooriaDocShell>
      {/* 1. Cabeçalho Oficial */}
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Navegação & Estrutura"
        title="SideBar"
        description="A Barra Lateral é um componente de navegação vertical compacto (44px) projetado para acesso rápido e intuitivo aos módulos da aplicação, com Tooltips laterais a 4px de distância, badges acoplados e suporte ao painel expansível de aplicativos."
      />

      {/* 2. Visão Geral */}
      <UnooriaDocSectionHeader
        title="1. Visão Geral & Conceito de Design"
        description="Diretrizes de aplicação extraídas das especificações oficiais do Figma."
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
            A <strong>Barra Lateral</strong> é um componente de navegação vertical posicionado à esquerda da tela.
            Ela exibe itens ou ícones organizados de forma hierárquica, facilitando a navegação sem ocupar muito espaço visual.
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
          <h4 style={{ margin: '0 0 12px 0', color: '#6487C2', fontSize: 16 }}>📐 Tooltips Laterais com 4px de Espaçamento</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#475157' }}>
            A Barra Lateral inclui um complemento visual — o tooltip com o nome da página — para garantir navegação precisa.
            É mandatório respeitar o espaçamento de <strong>4px</strong> entre o botão e o tooltip.
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
              3340:11320 (Side Bar)
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #CBD5E1', paddingLeft: 16 }}>
            <span style={{ fontSize: 12, color: '#49699F', textTransform: 'uppercase', fontWeight: 600 }}>
              Component Sets
            </span>
            <div style={{ fontSize: 14, color: '#22272A', fontWeight: 600 }}>
              Button Sidebar (#21592:599) • Sidebar (#21592:856) • Avatar Chat Nai (#6535:5305)
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
        title="3. Matriz do Figma (Estados do Botão & Painel de Apps)"
        description="Demonstração dos botões compactos de 36px com tooltips a 4px e painel lateral de aplicativos."
      />
      <div style={{ display: 'flex', gap: 48, padding: 32, backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', minHeight: 400 }}>
        {/* Barra Lateral Padrão */}
        <div>
          <h5 style={{ margin: '0 0 16px 0', color: '#22272A' }}>Barra Compacta (44px)</h5>
          <SideBar
            items={sampleSideItems}
            appsItems={sampleAppsList}
            defaultActiveId="courses"
            showNaiAssistant={true}
          />
        </div>

        {/* Barra Lateral com Painel de Apps Aberto */}
        <div>
          <h5 style={{ margin: '0 0 16px 0', color: '#22272A' }}>Com Painel de Apps Aberto (#21592:858)</h5>
          <SideBar
            items={sampleSideItems}
            appsItems={sampleAppsList}
            isAppsOpen={true}
            defaultActiveId="home"
          />
        </div>
      </div>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof SideBar> = {
  title: 'Plataforma Unooria/Componentes/SideBar',
  component: SideBar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual de cor',
    },
    showNaiAssistant: {
      control: 'boolean',
      description: 'Exibe o widget flutuante do assistente NAI',
    },
  },
  args: {
    theme: 'light',
    showNaiAssistant: true,
    items: sampleSideItems,
    appsItems: sampleAppsList,
  },
};

export default meta;

type Story = StoryObj<typeof SideBar>;

export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SideBarDocumentationPage />,
};

export const Playground: Story = {
  name: '🎮 Playground Interativo',
  render: (args) => (
    <div style={{ padding: 40, display: 'flex', backgroundColor: args.theme === 'dark' ? '#22272A' : '#F8FAFC', borderRadius: 12, minHeight: 450 }}>
      <SideBar {...args} />
    </div>
  ),
};

export const ComPainelDeAppsAberto: Story = {
  name: '📱 Com Painel de Apps Aberto',
  render: () => (
    <div style={{ padding: 40, display: 'flex', backgroundColor: '#F8FAFC', borderRadius: 12, minHeight: 450 }}>
      <SideBar
        items={sampleSideItems}
        appsItems={sampleAppsList}
        isAppsOpen={true}
      />
    </div>
  ),
};
