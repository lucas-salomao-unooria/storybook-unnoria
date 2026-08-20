import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs } from '../../../src/unooria/components/Tab/Tabs';
import { Icon } from '../../../src/unooria/components/Icon/Icon';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/Tab/Tab.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Componente de demonstração de painel administrativo funcional
 */
const AdminPanelDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | number>('users');

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E4E8E9',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="users" icon="group" badge={12}>
            Usuários
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon="settings">
            Configurações
          </Tabs.Tab>
          <Tabs.Tab value="reports" icon="bar_chart" badge="Novo">
            Relatórios
          </Tabs.Tab>
          <Tabs.Tab value="billing" icon="credit_card" disabled>
            Faturamento (Bloqueado)
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="users">
          <div
            style={{
              padding: '20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700, color: '#22272A' }}>
              Gestão de Usuários (12 ativos)
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
              Visualize, adicione ou gerencie as permissões dos usuários cadastrados na organização.
            </p>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="settings">
          <div
            style={{
              padding: '20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700, color: '#22272A' }}>
              Configurações da Plataforma
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
              Ajuste preferências globais, notificações por e-mail e parâmetros de segurança da conta.
            </p>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="reports">
          <div
            style={{
              padding: '20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700, color: '#22272A' }}>
              Relatórios e Métricas
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
              Acesse gráficos de engajamento, taxa de conclusão de cursos e retenção de alunos.
            </p>
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

/**
 * Página principal de documentação rica do componente Tab (Padrão Ouro)
 */
const TabDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Navegação & Conteúdo"
        title="Tab"
        description="Um Tab organiza conteúdos relacionados em seções separadas, permitindo ao usuário alternar entre diferentes visões sem sair da mesma página, promovendo navegação fluida e economizando espaço na interface."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 12694:10183)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 12694:10183)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design, proporções e estados exatos conforme especificados na prancha oficial do Figma para o componente Tab.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=12694-10183&m=dev"
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
            gap: '36px',
          }}
        >
          {/* Header do Frame Figma */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '18px', color: '#475157', fontWeight: 400 }}>Components</span>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#22272A', margin: '0 0 16px 0', lineHeight: 1.2 }}>
              Tab
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475157', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>O que são:</strong> Um Tab é um componente de interface que organiza
                conteúdos relacionados em seções separadas, acessadas por meio de abas. Ele permite ao usuário alternar
                entre diferentes visões ou categorias sem sair da mesma página, promovendo uma navegação mais fluida e
                economizando espaço na tela. Os Tabs devem ser claramente rotulados, visualmente distintos entre si, e conter
                uma indicação clara de qual aba está ativa no momento.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>Exemplo visual:</strong> Em um painel de administração, um Tab pode ser
                usado para alternar entre as seções &quot;Usuários&quot;, &quot;Configurações&quot; e &quot;Relatórios&quot;. Cada aba representa uma seção
                diferente do conteúdo. Ao clicar na aba &quot;Configurações&quot;, o conteúdo abaixo do menu de abas é atualizado sem
                recarregar a página.
              </p>
            </div>
          </div>

          {/* Catálogo de 4 Variantes do Component Set Figma (Default, Active, Hover, Hover-Active) */}
          <div style={{ borderTop: '1px solid #E4E8E9', paddingTop: '28px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#7C8E94', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
              Catálogo de 4 Estados do Component Set Figma (`Tab`)
            </span>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* 1. Default */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Default</span>
                <button
                  type="button"
                  className="unooria-tab unooria-tab--default"
                  style={{ borderBottom: '2px solid #E4E8E9' }}
                >
                  <span className="unooria-tab__icon">
                    <Icon name="add" size="s" color="currentColor" />
                  </span>
                  <span>Example Text</span>
                  <span className="unooria-tab__badge">1</span>
                </button>
              </div>

              {/* 2. Active / Selected */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Active</span>
                <button
                  type="button"
                  className="unooria-tab unooria-tab--selected"
                >
                  <span className="unooria-tab__icon">
                    <Icon name="add" size="s" color="currentColor" />
                  </span>
                  <span>Example Text</span>
                  <span className="unooria-tab__badge">1</span>
                </button>
              </div>

              {/* 3. Hover */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Hover</span>
                <button
                  type="button"
                  className="unooria-tab unooria-tab--default"
                  style={{
                    backgroundColor: 'rgba(127, 165, 226, 0.05)',
                    borderRadius: '12px 12px 0 0',
                    borderBottom: '2px solid #E4E8E9',
                  }}
                >
                  <span className="unooria-tab__icon">
                    <Icon name="add" size="s" color="currentColor" />
                  </span>
                  <span>Example Text</span>
                  <span className="unooria-tab__badge">1</span>
                </button>
              </div>

              {/* 4. Hover Active */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Hover Active</span>
                <button
                  type="button"
                  className="unooria-tab unooria-tab--selected"
                  style={{
                    backgroundColor: 'rgba(127, 165, 226, 0.05)',
                    borderRadius: '12px 12px 0 0',
                  }}
                >
                  <span className="unooria-tab__icon">
                    <Icon name="add" size="s" color="currentColor" />
                  </span>
                  <span>Example Text</span>
                  <span className="unooria-tab__badge">1</span>
                </button>
              </div>
            </div>
          </div>

          {/* Barra de 3 Abas Contíguas do Figma */}
          <div style={{ borderTop: '1px solid #E4E8E9', paddingTop: '28px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#7C8E94', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
              Montagem Real da Barra de Abas (Figma Frame 2)
            </span>
            <div className="unooria-tab-list">
              <button type="button" className="unooria-tab unooria-tab--default" style={{ width: '206px' }}>
                <span className="unooria-tab__icon">
                  <Icon name="add" size="s" color="currentColor" />
                </span>
                <span>Example Text</span>
                <span className="unooria-tab__badge">1</span>
              </button>

              <button type="button" className="unooria-tab unooria-tab--default" style={{ width: '206px' }}>
                <span className="unooria-tab__icon">
                  <Icon name="add" size="s" color="currentColor" />
                </span>
                <span>Example Text</span>
                <span className="unooria-tab__badge">1</span>
              </button>

              <button type="button" className="unooria-tab unooria-tab--selected" style={{ width: '209px' }}>
                <span className="unooria-tab__icon">
                  <Icon name="add" size="s" color="currentColor" />
                </span>
                <span>Example Text</span>
                <span className="unooria-tab__badge">1</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: ANATOMIA E TABELA DE TOKENS OFICIAIS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Anatomia & Tokens Oficiais"
          description="Tokens oficiais do Design System Unooria com integração nativa ao arquivo colors.css."
        />

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E4E8E9' }}>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Propriedade</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Valor Figma</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Token Oficial</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Variável CSS</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Altura da Aba</td>
                <td style={{ padding: '12px 18px' }}>48px</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>spacing-xl</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-spacing-xl: 48px;</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Padding Horizontal</td>
                <td style={{ padding: '12px 18px' }}>24px</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>spacing-m</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-spacing-m: 24px;</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Indicador Inferior Ativo</td>
                <td style={{ padding: '12px 18px' }}>2px (#6487C2)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>brandNavy[700]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-brandnavy-700</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Linha de Base Inativa</td>
                <td style={{ padding: '12px 18px' }}>2px (#E4E8E9)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>neutral[150]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-neutral-150</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Hover Background</td>
                <td style={{ padding: '12px 18px' }}>rgba(127, 165, 226, 0.05)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>opacity-brandnavy-50</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-opacity-brandnavy-50</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Badge Contador</td>
                <td style={{ padding: '12px 18px' }}>22x22px (#6487C2)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>brandNavy[700]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-brandnavy-700</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Texto Ativo</td>
                <td style={{ padding: '12px 18px' }}>#383E41 (14px SemiBold)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>neutral[900]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-neutral-900</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: DEMONSTRAÇÃO COMPLETA DE PAINEL ADMINISTRATIVO
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Demonstração com Troca de Conteúdo"
          description="Exemplo interativo de navegação com abas e renderização de painéis correspondentes."
        />

        <AdminPanelDemo />
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
          <Tabs theme={activeTheme} defaultValue="tab1">
            <Tabs.List>
              <Tabs.Tab value="tab1" icon="dashboard">
                Visão Geral
              </Tabs.Tab>
              <Tabs.Tab value="tab2" icon="analytics" badge={3}>
                Desempenho
              </Tabs.Tab>
              <Tabs.Tab value="tab3" icon="history">
                Histórico
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="tab1">
              <div style={{ color: activeTheme === 'dark' ? '#F5F5F5' : '#22272A', fontSize: '13px' }}>
                Conteúdo renderizado com alto contraste para {activeTheme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}.
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="tab2">
              <div style={{ color: activeTheme === 'dark' ? '#F5F5F5' : '#22272A', fontSize: '13px' }}>
                Painel de métricas e analytics.
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="tab3">
              <div style={{ color: activeTheme === 'dark' ? '#F5F5F5' : '#22272A', fontSize: '13px' }}>
                Registro histórico de atividades.
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: BOAS PRÁTICAS DE USO (DO & DON'T)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Diretrizes para navegação fluida em interfaces modulares."
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
                <strong>Use para alternar visões na mesma página:</strong> Sem causar recarregamento de página.
              </li>
              <li>
                <strong>Mantenha rótulos curtos e concisos:</strong> Palavras diretas (ex: &quot;Geral&quot;, &quot;Segurança&quot;, &quot;Logs&quot;).
              </li>
              <li>
                <strong>Utilize badges para contagens dinâmicas:</strong> Indique notificações ou itens pendentes na aba.
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
                <strong>Não use abas para processos passo a passo:</strong> Para fluxos sequenciais obrigatórios, use o <code>Stepper</code>.
              </li>
              <li>
                <strong>Não aninhe múltiplas camadas de abas horizontais:</strong> Prefira menu lateral para navegação hierárquica secundária.
              </li>
              <li>
                <strong>Não oculte o indicador ativo:</strong> O usuário precisa saber com clareza em qual seção está posicionado.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 6: REFERÊNCIA DE PROPS
          ========================================================================= */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="Referência Completa de Props da API"
          description="Todas as propriedades suportadas pelo componente Tabs, Tab, TabList e TabPanel."
        />

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E4E8E9' }}>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Prop</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Tipo</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Padrão</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>value</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>string | number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Valor da aba ativa (modo controlado).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>defaultValue</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>string | number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Aba inicial padrão (modo não controlado).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>variant</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>&apos;line&apos; | &apos;pill&apos;</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>&apos;line&apos;</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Estilo visual das abas.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>size</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>&apos;md&apos;</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tamanho visual (md = 48px Figma).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>fullWidth</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Se as abas expandem 100% da largura.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>theme</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>&apos;light&apos; | &apos;dark&apos;</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>&apos;light&apos;</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tema visual de contraste.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Tabs> = {
  title: 'Plataforma Unooria/Componentes/Tab',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['line', 'pill'],
      description: 'Variante visual das abas',
      defaultValue: 'line',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho das abas',
      defaultValue: 'md',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Ocupar 100% da largura',
      defaultValue: false,
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual',
      defaultValue: 'light',
    },
  },
  args: {
    variant: 'line',
    size: 'md',
    fullWidth: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TabDocumentationPage />,
};

/**
 * Playground interativo com 100% das props mapeadas em controles.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => {
    const [selectedTab, setSelectedTab] = useState<string | number>('tab1');

    return (
      <div
        style={{
          padding: '24px',
          backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF',
          borderRadius: '16px',
          border: args.theme === 'dark' ? '1px solid #383E41' : '1px solid #E4E8E9',
        }}
      >
        <Tabs {...args} value={selectedTab} onChange={setSelectedTab}>
          <Tabs.List>
            <Tabs.Tab value="tab1" icon="dashboard">
              Visão Geral
            </Tabs.Tab>
            <Tabs.Tab value="tab2" icon="group" badge={5}>
              Equipe
            </Tabs.Tab>
            <Tabs.Tab value="tab3" icon="settings">
              Ajustes
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="tab1">
            <div style={{ color: args.theme === 'dark' ? '#F5F5F5' : '#22272A', padding: '8px 0' }}>
              Conteúdo da aba Visão Geral.
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="tab2">
            <div style={{ color: args.theme === 'dark' ? '#F5F5F5' : '#22272A', padding: '8px 0' }}>
              Conteúdo da aba Equipe com 5 membros ativos.
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="tab3">
            <div style={{ color: args.theme === 'dark' ? '#F5F5F5' : '#22272A', padding: '8px 0' }}>
              Configurações e parâmetros do sistema.
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    );
  },
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 12694:10183).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 12694:10183)',
  render: () => (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '48px',
        border: '1px solid #E4E8E9',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        maxWidth: '720px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '32px' }}>
        <span style={{ fontSize: '18px', color: '#475157' }}>Components</span>
        <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#22272A', margin: '0 0 16px 0', lineHeight: 1.2 }}>
          Tab
        </h1>
        <p style={{ margin: 0, fontSize: '13px', color: '#475157', lineHeight: 1.6 }}>
          <strong>O que são:</strong> Um Tab é um componente de interface que organiza conteúdos relacionados em seções separadas, acessadas por meio de abas.
        </p>
      </div>

      <div className="unooria-tab-list">
        <button type="button" className="unooria-tab unooria-tab--default" style={{ width: '206px' }}>
          <span className="unooria-tab__icon">
            <Icon name="add" size="s" color="currentColor" />
          </span>
          <span>Example Text</span>
          <span className="unooria-tab__badge">1</span>
        </button>

        <button type="button" className="unooria-tab unooria-tab--default" style={{ width: '206px' }}>
          <span className="unooria-tab__icon">
            <Icon name="add" size="s" color="currentColor" />
          </span>
          <span>Example Text</span>
          <span className="unooria-tab__badge">1</span>
        </button>

        <button type="button" className="unooria-tab unooria-tab--selected" style={{ width: '209px' }}>
          <span className="unooria-tab__icon">
            <Icon name="add" size="s" color="currentColor" />
          </span>
          <span>Example Text</span>
          <span className="unooria-tab__badge">1</span>
        </button>
      </div>
    </div>
  ),
};

/**
 * Painel Administrativo Completo com troca dinâmica de abas.
 */
export const PainelAdministrativoCompleto: Story = {
  render: () => <AdminPanelDemo />,
};

/**
 * Variante Pill (Pílula moderna).
 */
export const VariantePill: Story = {
  name: 'Variante Pill (Pílula)',
  render: () => (
    <div style={{ maxWidth: '520px', padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
      <Tabs variant="pill" defaultValue="all">
        <Tabs.List>
          <Tabs.Tab value="all">Todos (45)</Tabs.Tab>
          <Tabs.Tab value="pending">Pendentes (8)</Tabs.Tab>
          <Tabs.Tab value="completed">Concluídos (37)</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="all">
          <p style={{ fontSize: '13px', color: '#64748B', margin: '8px 0 0 0' }}>Exibindo todos os 45 registros.</p>
        </Tabs.Panel>
        <Tabs.Panel value="pending">
          <p style={{ fontSize: '13px', color: '#64748B', margin: '8px 0 0 0' }}>Exibindo 8 registros com ação pendente.</p>
        </Tabs.Panel>
        <Tabs.Panel value="completed">
          <p style={{ fontSize: '13px', color: '#64748B', margin: '8px 0 0 0' }}>Exibindo 37 registros concluídos.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  ),
};
