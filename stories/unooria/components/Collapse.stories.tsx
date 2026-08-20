import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Collapse,
  CollapseHeader,
  CollapseTitle,
  CollapseSubtitle,
  CollapseProgressBar,
  CollapseBody,
} from '../../../src/unooria/components/Collapse';
import { CollapseTheme } from '../../../src/unooria/components/Collapse/Collapse.types';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

// ============================================================================
// Ícones SVG Inline para Exemplos e Ilustração Semântica
// ============================================================================
const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const HelpCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const LayersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const PlusMinusIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
    }}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// ============================================================================
// Página de Documentação Rica do Collapse - Padrão Ouro Unooria
// ============================================================================
const CollapseDocumentationPage: React.FC = () => {
  const [docTheme, setDocTheme] = useState<CollapseTheme>('light');
  const [interactiveProgress, setInteractiveProgress] = useState<number>(65);

  const collapsePropsList = [
    { name: 'title', type: 'React.ReactNode', default: 'undefined', desc: 'Título principal exibido no cabeçalho em peso semi-bold (600).' },
    { name: 'subtitle / description', type: 'React.ReactNode', default: 'undefined', desc: 'Texto secundário explicativo ou descrição posicionado logo abaixo do título.' },
    { name: 'leadingIcon', type: 'React.ReactNode', default: 'undefined', desc: 'Ícone posicionado à esquerda do bloco de títulos no cabeçalho.' },
    { name: 'isOpen', type: 'boolean', default: 'undefined', desc: 'Controla o estado de expansão (modo controlado).' },
    { name: 'defaultOpen', type: 'boolean', default: 'false', desc: 'Estado inicial de abertura quando operando em modo não-controlado.' },
    { name: 'onToggle', type: '(isOpen: boolean, event?: Event) => void', default: 'undefined', desc: 'Callback disparado ao alternar entre os estados aberto e fechado.' },
    { name: 'disabled', type: 'boolean', default: 'false', desc: 'Desabilita as interações do cabeçalho e aplica opacidade de 55%.' },
    { name: 'showProgressBar', type: 'boolean', default: 'false', desc: 'Habilita a exibição da barra de progresso horizontal entre o header e o corpo.' },
    { name: 'progress', type: 'number | CollapseProgressConfig', default: 'undefined', desc: 'Valor numérico percentual (0 a 100) ou objeto com cor e formatação customizada.' },
    { name: 'progressColor', type: 'string', default: "'#01B574'", desc: 'Cor do preenchimento da barra de progresso (verde oficial Unooria).' },
    { name: 'icon / expandIcon', type: 'ReactNode | (({ isOpen, disabled }) => ReactNode)', default: 'Chevron SVG', desc: 'Ícone de expansão customizado ou render prop para rotações personalizadas.' },
    { name: 'headerExtra', type: 'React.ReactNode', default: 'undefined', desc: 'Conteúdo ou ação extra renderizada à direita no cabeçalho antes do ícone de toggle.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Define os espaçamentos internos e escala tipográfica do componente.' },
    { name: 'variant', type: "'default' | 'bordered' | 'card'", default: "'default'", desc: 'Estilo visual de contorno e elevação do contêiner.' },
    { name: 'mediaVariant', type: "'custom' | 'text' | 'slot' | 'select'", default: "'custom'", desc: 'Variante de layout pré-estilizado para o corpo de conteúdo interno.' },
    { name: 'theme', type: "'light' | 'dark'", default: "'light'", desc: 'Tema visual com chaveamento automático de variáveis CSS.' },
    { name: 'children', type: 'React.ReactNode', default: 'undefined', desc: 'Conteúdo do painel expansível ou composição de subcomponentes.' },
  ];

  const subcomponentsList = [
    { name: 'Collapse.Header', props: 'title, subtitle, leadingIcon, extra, icon, disabled, onToggle, children', desc: 'Cabeçalho clicável acessível (role="button", tabIndex, aria-expanded).' },
    { name: 'Collapse.Title', props: 'as ("h4"), size ("sm"|"md"|"lg"), className, children', desc: 'Título tipográfico semântico com herança automática de tamanho do contexto.' },
    { name: 'Collapse.Subtitle', props: 'className, children', desc: 'Subtítulo descritivo em tipografia secundária de 12px.' },
    { name: 'Collapse.ProgressBar', props: 'value (0..100), color ("#01B574"), showLabel (true), label', desc: 'Barra de progresso horizontal acessível (role="progressbar") de 10px com cantos arredondados.' },
    { name: 'Collapse.Body / Collapse.Panel', props: 'isOpen, variant ("text"|"slot"|"select"|"custom"), padding, children', desc: 'Painel expansível com animação de altura dinâmica via CSS grid-template-rows.' },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Estrutura & Divulgação"
        title="Collapse"
        description="O Collapse (Painel Expansível / Sanfona) é o componente oficial do Design System Unooria projetado para organizar, ocultar e revelar blocos densos de conteúdo sob demanda. Com suporte a barra de progresso horizontal em verde oficial (#01B574), composição modular (Compound Components), acessibilidade WCAG 2.1 AA e total fidelidade às especificações do Figma."
      />

      {/* 1. Visão Geral & Casos de Uso */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Casos de Uso"
          description="Diretrizes arquiteturais para uso do Collapse em fluxos e telas da Plataforma Unooria"
          barColor="#006BFF"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ color: '#006BFF' }}><HelpCircleIcon /></div>
              <h4 style={{ margin: 0, fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
                FAQ & Ajuda Contextual
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
              Permite que o usuário explore dúvidas frequentes e tutoriais passo a passo sem poluir a visualização inicial da página.
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ color: '#01B574' }}><CheckCircleIcon /></div>
              <h4 style={{ margin: 0, fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
                Formulários & Checklists
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
              Ideal para formulários em etapas com a <strong>barra de progresso horizontal</strong> integrada indicando a taxa de conclusão de cada sessão.
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ color: '#8B5CF6' }}><SettingsIcon /></div>
              <h4 style={{ margin: 0, fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
                Painéis de Configurações
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
              Agrupa de forma limpa opções avançadas, permissões de segurança e preferências da conta com expansão instantânea.
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ color: '#F59E0B' }}><LayersIcon /></div>
              <h4 style={{ margin: 0, fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
                Acordeom / Sanfona
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
              Pode ser encadeado em grupos verticais com controle exclusivo de apenas 1 painel aberto por vez para manter a densidade visual equilibrada.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Figma & Especificações Técnicas */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="2. Figma & Especificações Técnicas"
          description="Rastreabilidade direta com os nós canônicos do Figma Design System Unooria"
          barColor="#10B981"
        />

        <div
          style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#166534', marginBottom: '4px' }}>
                🔗 Referência Oficial no Figma
              </div>
              <div style={{ fontSize: '13px', color: '#15803D' }}>
                Arquivo: <code>Design-System-Unooria</code> • Nó Master: <code>12694-9193</code>
              </div>
            </div>
            <a
              href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=12694-9193&m=dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: '#166534',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Abrir no Figma Dev Mode ↗
            </a>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>Elemento / Token</th>
                <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>Node ID Figma</th>
                <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>Valor & Regra de Design</th>
                <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>Comportamento</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0066FF', fontFamily: 'monospace' }}>Collapse Master</td>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#64748B' }}>12694:9193</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>Border radius 12px, border 1px solid #E4E8E9</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>Contêiner base com suporte a light/dark e tamanhos sm/md/lg.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0066FF', fontFamily: 'monospace' }}>Default (Closed)</td>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#64748B' }}>12694:9203</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>Chevron 0deg ou Plus (+), corpo com grid-template-rows: 0fr</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>Exibe apenas o header e opcionalmente a barra de progresso.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0066FF', fontFamily: 'monospace' }}>Opened (Expanded)</td>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#64748B' }}>12694:9202</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>Chevron 180deg ou Minus (x), corpo expandido com opacidade 1</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>Animação suave de abertura sem corte abrupto de layout.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0066FF', fontFamily: 'monospace' }}>Progress Bar</td>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#64748B' }}>12694:9207</td>
                <td style={{ padding: '10px 14px', color: '#334155' }}>Track 10px, indicador 6px, cor <code>#01B574</code></td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>Exibe percentual textual formatado (ex: 75%) à direita.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Anatomia do Componente */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="3. Anatomia do Componente"
          description="Dissecção dos elementos internos e zonas de personalização visual"
          barColor="#8B5CF6"
        />

        <div
          style={{
            padding: '24px',
            borderRadius: '16px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            marginBottom: '20px',
          }}
        >
          {/* Exemplo de Anatomia Visual com Anotações */}
          <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                border: '1px solid #E4E8E9',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                position: 'relative',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: '#EFF6FF',
                      color: '#006BFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <SettingsIcon />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 600, color: '#22272A' }}>
                        Configurações da Conta
                      </span>
                      <span style={{ fontSize: '11px', background: '#DBEAFE', color: '#1E40AF', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                        3. Título
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                      <span style={{ fontSize: '12px', color: '#617379' }}>
                        Gerencie credenciais, 2FA e notificações ativas
                      </span>
                      <span style={{ fontSize: '11px', background: '#E2E8F0', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                        4. Subtítulo
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', background: '#FEF3C7', color: '#92400E', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                    5. Expand Icon
                  </span>
                  <div style={{ color: '#475157' }}>
                    <PlusMinusIcon isOpen={true} />
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '10px', backgroundColor: 'rgba(34,39,42,0.06)', borderRadius: '12px', padding: '2px 3px', boxSizing: 'border-box' }}>
                  <div style={{ width: '80%', height: '6px', backgroundColor: '#01B574', borderRadius: '12px' }} />
                </div>
                <span style={{ fontSize: '12px', color: '#617379', fontWeight: 600 }}>80%</span>
                <span style={{ fontSize: '11px', background: '#DCFCE7', color: '#166534', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                  6. Progress Bar (#01B574)
                </span>
              </div>

              {/* Body */}
              <div style={{ paddingTop: '12px', borderTop: '1px dashed #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', background: '#F3E8FF', color: '#6B21A8', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, width: 'fit-content' }}>
                  7. Content Body (Expansível com auto-height)
                </span>
                <p style={{ margin: 0, fontSize: '13px', color: '#475157', lineHeight: '1.6' }}>
                  Aqui reside qualquer nó React: formulários de dados, listas interativas, botões de ação ou tabelas personalizadas.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <strong style={{ color: '#006BFF', fontSize: '13px' }}>1. Contêiner Base:</strong>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>Borda de 1px, cantos arredondados de 12px e isolamento de contexto.</p>
          </div>
          <div style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <strong style={{ color: '#006BFF', fontSize: '13px' }}>2. Leading Icon:</strong>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>Ícone contextualizador à esquerda com espaçamento de 12px.</p>
          </div>
          <div style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: '#01B574', color: '#FFFFFF' }}>
            <strong style={{ fontSize: '13px' }}>6. Barra de Progresso:</strong>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.9 }}>Indicador verde #01B574 com transição CSS suave de largura.</p>
          </div>
          <div style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <strong style={{ color: '#8B5CF6', fontSize: '13px' }}>7. Grid Animation:</strong>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>Transição de 0fr para 1fr eliminando &quot;jank&quot; e recálculos custosos de JS.</p>
          </div>
        </div>
      </section>

      {/* 4. Matriz de Estados & Variantes */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="4. Matriz de Estados & Variantes"
          description="Comparativo de comportamento: Fechado, Aberto, Desabilitado e Variantes de Contêiner"
          barColor="#EC4899"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Default vs Bordered vs Card */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                Variante Default (Borda sutil)
              </div>
              <Collapse
                title="Sessão Padrão"
                subtitle="variant='default' • Ideal para a maioria das interfaces"
                variant="default"
                defaultOpen={false}
              >
                <p style={{ margin: 0, fontSize: '13px', color: '#475157' }}>
                  Contorno neutro de 1px com fundo branco e contraste ideal para fluxos limpos.
                </p>
              </Collapse>
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                Variante Card (Elevação com sombra)
              </div>
              <Collapse
                title="Sessão em Destaque"
                subtitle="variant='card' • Com sombra suave de elevação"
                variant="card"
                defaultOpen={true}
              >
                <p style={{ margin: 0, fontSize: '13px', color: '#475157' }}>
                  Aplica sombra sutil (<code style={{ fontSize: '11px', background: '#F1F5F9', padding: '2px 4px' }}>elevation-sm</code>) destacando blocos principais do restante do conteúdo.
                </p>
              </Collapse>
            </div>
          </div>

          {/* Desabilitado e Media Variants */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                Estado Desabilitado (disabled=true)
              </div>
              <Collapse
                title="Recurso Bloqueado"
                subtitle="Disponível apenas no plano Enterprise"
                leadingIcon={<ShieldIcon />}
                disabled={true}
                showProgressBar={true}
                progress={30}
              >
                <p style={{ margin: 0, fontSize: '13px', color: '#475157' }}>
                  Não pode ser expandido nem focado por teclado.
                </p>
              </Collapse>
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                Variante de Mídia: Slot (Tracejado)
              </div>
              <Collapse
                title="Upload de Arquivos Fiscais"
                subtitle="mediaVariant='slot' • Área reservada para inserção de componentes"
                defaultOpen={true}
                mediaVariant="slot"
              >
                <span>📂 Arraste arquivos aqui ou clique para selecionar</span>
              </Collapse>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Composição Modular (Compound Components) */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="5. Composição Modular (Compound Components)"
          description="Flexibilidade total entre sintaxe declarativa rápida e blocos atômicos altamente customizáveis"
          barColor="#3B82F6"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
              ⚡ Sintaxe Declarativa (Rápida)
            </h4>
            <pre style={{ margin: 0, padding: '12px', borderRadius: '8px', backgroundColor: '#0F172A', color: '#E2E8F0', fontSize: '12px', overflowX: 'auto', lineHeight: '1.5' }}>
{`<Collapse
  title="Segurança"
  subtitle="Autenticação em 2 fatores"
  showProgressBar
  progress={80}
>
  <p>Conteúdo interno...</p>
</Collapse>`}
            </pre>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
              🧩 Sintaxe Composta (Compound)
            </h4>
            <pre style={{ margin: 0, padding: '12px', borderRadius: '8px', backgroundColor: '#0F172A', color: '#E2E8F0', fontSize: '12px', overflowX: 'auto', lineHeight: '1.5' }}>
{`<Collapse>
  <Collapse.Header
    title={<Collapse.Title>Segurança</Collapse.Title>}
    subtitle={<Collapse.Subtitle>2FA</Collapse.Subtitle>}
    extra={<Badge>Ativo</Badge>}
  />
  <Collapse.ProgressBar value={80} />
  <Collapse.Body>
    <MeuFormularioCustom />
  </Collapse.Body>
</Collapse>`}
            </pre>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>Subcomponente</th>
                <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>Props Principais</th>
                <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>Responsabilidade</th>
              </tr>
            </thead>
            <tbody>
              {subcomponentsList.map((item) => (
                <tr key={item.name} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0066FF', fontFamily: 'monospace' }}>{item.name}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#475569', fontSize: '12px' }}>{item.props}</td>
                  <td style={{ padding: '10px 14px', color: '#334155' }}>{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="6. Boas Práticas (Do's & Don'ts)"
          description="Recomendações de design e usabilidade para máxima experiência do usuário"
          barColor="#F59E0B"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Do's */}
          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#166534', fontWeight: 700, fontSize: '15px' }}>
              <span>✅ O Que Fazer (Do&apos;s)</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#15803D', fontSize: '13px', lineHeight: '1.7' }}>
              <li><strong>Títulos Claros:</strong> Use textos objetivos que informem claramente o que será revelado na expansão.</li>
              <li><strong>Barra de Progresso:</strong> Utilize a barra horizontal verde (#01B574) quando o collapse representar uma etapa de checklist ou formulário.</li>
              <li><strong>Teclado & Acessibilidade:</strong> Garanta navegação natural via tabulação e alternância com <kbd style={{ background: '#DCFCE7', padding: '2px 4px', borderRadius: '4px', fontSize: '11px' }}>Enter</kbd> ou <kbd style={{ background: '#DCFCE7', padding: '2px 4px', borderRadius: '4px', fontSize: '11px' }}>Espaço</kbd>.</li>
              <li><strong>Subtítulos Informativos:</strong> Use a propriedade <code>subtitle</code> para dar resumos ou status rápidos sem precisar abrir o painel.</li>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#991B1B', fontWeight: 700, fontSize: '15px' }}>
              <span>❌ O Que Evitar (Don&apos;ts)</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#B91C1C', fontSize: '13px', lineHeight: '1.7' }}>
              <li><strong>Aninhamento Excessivo:</strong> Evite aninhar mais de 2 níveis de collapse dentro de um mesmo fluxo visual.</li>
              <li><strong>Ocultar Ações Críticas:</strong> Não esconda botões essenciais de confirmação de pagamento ou submit primário dentro de um painel fechado por padrão.</li>
              <li><strong>Ícones Conflitantes:</strong> Não misture ícones de seta com botões de ação adicionais que possam confundir a área de clique.</li>
              <li><strong>Sobrecarga Textual no Título:</strong> Mantenha o título conciso; mova explicações longas para o subtítulo ou corpo.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Suporte a Temas (Light e Dark) */}
      <section style={{ marginBottom: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <UnooriaDocSectionHeader
            title="7. Suporte a Temas (Light & Dark)"
            description="Alternância perfeita e instantânea de variáveis CSS tokens para fundos escuros"
            barColor="#6366F1"
            marginBottom="0"
          />

          {/* Seletor de Tema Interativo da Documentação */}
          <div style={{ display: 'flex', gap: '4px', backgroundColor: '#E2E8F0', padding: '4px', borderRadius: '8px' }}>
            <button
              onClick={() => setDocTheme('light')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: docTheme === 'light' ? '#FFFFFF' : 'transparent',
                color: docTheme === 'light' ? '#0F172A' : '#64748B',
                fontWeight: docTheme === 'light' ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: docTheme === 'light' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              ☀️ Tema Claro (Light)
            </button>
            <button
              onClick={() => setDocTheme('dark')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: docTheme === 'dark' ? '#1E293B' : 'transparent',
                color: docTheme === 'dark' ? '#FFFFFF' : '#64748B',
                fontWeight: docTheme === 'dark' ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: docTheme === 'dark' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              🌙 Tema Escuro (Dark)
            </button>
          </div>
        </div>

        <div
          style={{
            padding: '24px',
            borderRadius: '16px',
            backgroundColor: docTheme === 'dark' ? '#1E293B' : '#F8FAFC',
            border: `1px solid ${docTheme === 'dark' ? '#334155' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Collapse
              theme={docTheme}
              title="Informações de Cobrança"
              subtitle="Endereço cadastrado, cartão corporativo e notas fiscais"
              leadingIcon={<FileTextIcon />}
              showProgressBar={true}
              progress={interactiveProgress}
              defaultOpen={true}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6' }}>
                  Tokens aplicados automaticamente: Fundo (<code style={{ fontSize: '11px' }}>{docTheme === 'dark' ? '#22272A' : '#FFFFFF'}</code>), Borda (<code style={{ fontSize: '11px' }}>{docTheme === 'dark' ? '#475157' : '#E4E8E9'}</code>) e Indicador de Progresso (<code style={{ fontSize: '11px', color: '#01B574' }}>#01B574</code>).
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>Ajustar progresso:</span>
                  {[25, 50, 75, 100].map((val) => (
                    <button
                      key={val}
                      onClick={() => setInteractiveProgress(val)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        border: '1px solid #CBD5E1',
                        backgroundColor: interactiveProgress === val ? '#01B574' : '#FFFFFF',
                        color: interactiveProgress === val ? '#FFFFFF' : '#334155',
                        cursor: 'pointer',
                      }}
                    >
                      {val}%
                    </button>
                  ))}
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </section>

      {/* 8. Tabela Completa de Props da API */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="8. Tabela Completa de Props da API"
          description="Especificação técnica completa dos parâmetros aceitos pelo componente Collapse"
          barColor="#059669"
        />

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Propriedade</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Padrão</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {collapsePropsList.map((prop) => (
                <tr key={prop.name} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0066FF', fontFamily: 'monospace' }}>{prop.name}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#475569', fontSize: '12px' }}>{prop.type}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#64748B', fontSize: '12px' }}>{prop.default}</td>
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
// Configuração do Storybook Meta (Sem tags autodocs conforme regra mandatória)
// ============================================================================
const meta: Meta<typeof Collapse> = {
  title: 'Plataforma Unooria/Componentes/Collapse',
  component: Collapse,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título principal exibido no cabeçalho.',
    },
    subtitle: {
      control: 'text',
      description: 'Subtítulo ou descrição auxiliar exibida abaixo do título.',
    },
    isOpen: {
      control: 'boolean',
      description: 'Estado de abertura controlado externamente.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Estado inicial de abertura em modo não-controlado.',
      table: { defaultValue: { summary: 'false' } },
    },
    showProgressBar: {
      control: 'boolean',
      description: 'Habilita a exibição da barra de progresso horizontal.',
      table: { defaultValue: { summary: 'false' } },
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Valor numérico percentual (0 a 100) do progresso.',
    },
    progressColor: {
      control: 'color',
      description: 'Cor customizada do indicador de progresso.',
      table: { defaultValue: { summary: '#01B574' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita as interações e reduz a opacidade.',
      table: { defaultValue: { summary: 'false' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho e espaçamento interno do componente.',
      table: { defaultValue: { summary: 'md' } },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Tema visual do componente.',
      table: { defaultValue: { summary: 'light' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'card'],
      description: 'Variante visual do contêiner.',
      table: { defaultValue: { summary: 'default' } },
    },
    mediaVariant: {
      control: 'select',
      options: ['custom', 'text', 'slot', 'select'],
      description: 'Estilo pré-configurado do corpo interno de mídia.',
      table: { defaultValue: { summary: 'custom' } },
    },
  },
  args: {
    title: 'Informações Cadastrais',
    subtitle: 'Dados de identificação e preferências de contato',
    isOpen: false,
    defaultOpen: false,
    showProgressBar: true,
    progress: 75,
    progressColor: '#01B574',
    disabled: false,
    size: 'md',
    theme: 'light',
    variant: 'default',
    mediaVariant: 'custom',
  },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

// ============================================================================
// 1ª História Obrigatória: Documentação Completa
// ============================================================================
/**
 * Documentação rica e completa do componente Collapse baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CollapseDocumentationPage />,
};

// ============================================================================
// 2ª História Obrigatória: Playground Interativo
// ============================================================================
/**
 * Playground interativo com todos os controles de estado, tamanho, variantes e tema.
 */
export const Playground: Story = {
  render: (args) => (
    <div
      style={{
        padding: '32px',
        borderRadius: '12px',
        backgroundColor: args.theme === 'dark' ? '#1E293B' : '#F8FAFC',
        border: `1px solid ${args.theme === 'dark' ? '#334155' : '#E2E8F0'}`,
        maxWidth: '720px',
        margin: '0 auto',
      }}
    >
      <Collapse {...args}>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
          Este é o corpo do painel expansível. Você pode interagir com os controles na aba inferior
          do Storybook para ajustar o título, tema, variantes e o valor da barra de progresso horizontal em tempo real.
        </p>
      </Collapse>
    </div>
  ),
  args: {
    title: 'Painel Expansível Interativo',
    subtitle: 'Altere as propriedades abaixo para testar estados e variantes',
    showProgressBar: true,
    progress: 60,
    size: 'md',
    theme: 'light',
    variant: 'default',
  },
};

// ============================================================================
// 3ª História Obrigatória: Com Barra de Progresso (25%, 50%, 75%, 100%)
// ============================================================================
/**
 * Demonstração da barra de progresso horizontal em diferentes estágios (25%, 50%, 75% e 100%)
 * com o verde oficial #01B574 do Design System Unooria.
 */
export const ComBarraDeProgresso: Story = {
  name: 'Barra de Progresso (25%, 50%, 75%, 100%)',
  render: () => {
    const steps = [
      { id: 1, title: '1. Dados Básicos e Pessoais', subtitle: 'Nome, CPF e data de nascimento', progress: 100, defaultOpen: false },
      { id: 2, title: '2. Endereço e Localização', subtitle: 'CEP, logradouro e complemento', progress: 75, defaultOpen: true },
      { id: 3, title: '3. Dados Bancários e Faturamento', subtitle: 'Chave PIX e conta corrente', progress: 50, defaultOpen: false },
      { id: 4, title: '4. Validação de Documentos', subtitle: 'Envio de CNH/RG e comprovante', progress: 25, defaultOpen: false },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#1E293B' }}>
            Checklist de Onboarding da Empresa
          </h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
            Acompanhamento de progresso com indicador visual horizontal verde (#01B574).
          </p>
        </div>

        {steps.map((step) => (
          <Collapse
            key={step.id}
            title={step.title}
            subtitle={step.subtitle}
            showProgressBar={true}
            progress={step.progress}
            defaultOpen={step.defaultOpen}
            variant="bordered"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
                Progresso atual desta etapa: <strong>{step.progress}% preenchido</strong>.
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#01B574',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onClick={() => alert(`Avançando etapa: ${step.title}`)}
                >
                  Continuar Preenchimento
                </button>
              </div>
            </div>
          </Collapse>
        ))}
      </div>
    );
  },
};

// ============================================================================
// 4ª História Obrigatória: Acordeom Sanfona (Apenas 1 Aberto por Vez)
// ============================================================================
/**
 * Comportamento de Acordeom / Sanfona sincronizado onde apenas um painel permanece
 * expandido por vez, otimizando o espaço da interface.
 */
export const AcordeomSanfona: Story = {
  name: 'Acordeom / Sanfona (Exclusivo)',
  render: () => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
    const [exclusiveMode, setExclusiveMode] = useState<boolean>(true);
    const [multiOpen, setMultiOpen] = useState<Record<number, boolean>>({ 0: true });

    const items = [
      {
        id: 0,
        title: 'Como funciona o faturamento mensal?',
        subtitle: 'Dúvidas sobre ciclo de faturamento e emissão de notas fiscais',
        icon: <HelpCircleIcon />,
        content: 'O faturamento é realizado no primeiro dia útil de cada mês com vencimento para 10 dias úteis. As notas fiscais são emitidas automaticamente e enviadas para o e-mail financeiro cadastrado.',
      },
      {
        id: 1,
        title: 'Posso convidar membros adicionais da minha equipe?',
        subtitle: 'Gerenciamento de licenças e níveis de permissão',
        icon: <UserIcon />,
        content: 'Sim, dependendo do seu plano contratado você pode convidar membros ilimitados como visualizadores ou adquirir licenças adicionais de administradores e editores através do painel de Configurações.',
      },
      {
        id: 2,
        title: 'Quais protocolos de segurança e criptografia são adotados?',
        subtitle: 'Padrões SOC2, ISO 27001 e conformidade LGPD',
        icon: <ShieldIcon />,
        content: 'Todos os dados trafegados utilizam criptografia TLS 1.3 ponta a ponta e repouso com AES-256 bits. Nossos servidores contam com backups diários redundantes em múltiplas regiões geográficas.',
      },
      {
        id: 3,
        title: 'Como exportar meus relatórios e métricas para PDF e CSV?',
        subtitle: 'Exportação assíncrona e relatórios automatizados',
        icon: <FileTextIcon />,
        content: 'Acesse a aba de Relatórios, selecione o período desejado e clique no botão de ação rápida "Exportar Dados". O arquivo é compilado em segundo plano e enviado via download direto.',
      },
    ];

    const handleToggle = (index: number) => {
      if (exclusiveMode) {
        setActiveAccordion((prev) => (prev === index ? null : index));
      } else {
        setMultiOpen((prev) => ({ ...prev, [index]: !prev[index] }));
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#1E293B' }}>
              Central de Perguntas Frequentes (FAQ)
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
              {exclusiveMode ? 'Modo Sanfona: apenas 1 painel aberto por vez.' : 'Modo Livre: múltiplos painéis abertos simultaneamente.'}
            </p>
          </div>

          <button
            onClick={() => setExclusiveMode(!exclusiveMode)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {exclusiveMode ? 'Alternar para Modo Múltiplo' : 'Alternar para Modo Exclusivo'}
          </button>
        </div>

        {items.map((item) => {
          const isOpen = exclusiveMode ? activeAccordion === item.id : Boolean(multiOpen[item.id]);

          return (
            <Collapse
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              leadingIcon={item.icon}
              isOpen={isOpen}
              onToggle={() => handleToggle(item.id)}
              variant="bordered"
            >
              <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                {item.content}
              </p>
            </Collapse>
          );
        })}
      </div>
    );
  },
};

// ============================================================================
// 5ª História Obrigatória: Composição Modular (Compound Components)
// ============================================================================
/**
 * Demonstração do uso flexível dos subcomponentes `Collapse.Header`, `Collapse.Title`,
 * `Collapse.Subtitle`, `Collapse.ProgressBar` e `Collapse.Body`.
 */
export const ComposicaoModular: Story = {
  name: 'Composição Modular (Compound)',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4px' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#1E293B' }}>
            Composição Avançada com Subcomponentes
          </h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
            Utilizando <code>Collapse.Header</code>, <code>Collapse.ProgressBar</code> e <code>Collapse.Body</code> com badges e ações contextuais personalizadas.
          </p>
        </div>

        {/* Exemplo 1: Com Badge e Ação Extra no Header */}
        <Collapse defaultOpen={true} variant="card">
          <CollapseHeader
            leadingIcon={<ShieldIcon />}
            title={<CollapseTitle size="lg">Autenticação e Segurança Avançada</CollapseTitle>}
            subtitle={<CollapseSubtitle>Status de proteção da organização</CollapseSubtitle>}
            extra={
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: '#DCFCE7',
                  color: '#166534',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                }}
              >
                Protegido
              </span>
            }
          />
          <CollapseProgressBar value={90} color="#01B574" />
          <CollapseBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div>
                  <strong style={{ fontSize: '13px', color: '#1E293B' }}>Autenticação em Dois Fatores (2FA)</strong>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Obrigatório para todos os administradores</div>
                </div>
                <span style={{ fontSize: '12px', color: '#01B574', fontWeight: 600 }}>Ativado ✓</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div>
                  <strong style={{ fontSize: '13px', color: '#1E293B' }}>Sessões Ativas Concorrentes</strong>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Limite de 3 dispositivos simultâneos</div>
                </div>
                <button
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onClick={() => alert('Encerrando outras sessões...')}
                >
                  Encerrar Outras
                </button>
              </div>
            </div>
          </CollapseBody>
        </Collapse>

        {/* Exemplo 2: Com Ícone Customizado de Mais/Menos */}
        <Collapse defaultOpen={false} variant="bordered">
          <CollapseHeader
            leadingIcon={<SettingsIcon />}
            title={<CollapseTitle size="md">Preferências de Notificação por Canal</CollapseTitle>}
            subtitle={<CollapseSubtitle>E-mail, SMS, Webhook e Push</CollapseSubtitle>}
            icon={({ isOpen }) => <PlusMinusIcon isOpen={isOpen} />}
          />
          <CollapseBody>
            <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
              Personalize a frequência de envio de notificações de relatórios diários e alertas de incidentes críticos.
            </p>
          </CollapseBody>
        </Collapse>
      </div>
    );
  },
};

// ============================================================================
// 6ª História Obrigatória: Variantes e Tamanhos (sm, md, lg em Light e Dark)
// ============================================================================
/**
 * Matriz visual comparando todos os tamanhos suportados (`sm`, `md`, `lg`)
 * e variantes de superfície (`default`, `bordered`, `card`) em temas Light e Dark.
 */
export const VariantesETamanhos: Story = {
  name: 'Variantes e Tamanhos (sm, md, lg)',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px', margin: '0 auto' }}>
        {/* Bloco 1: Tamanhos (sm, md, lg) */}
        <div>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#1E293B' }}>
            1. Escala de Tamanhos (sm = 12px padding, md = 16px, lg = 20px)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Collapse
              size="sm"
              title="Collapse Tamanho Pequeno (size='sm')"
              subtitle="Padding de 12px e título em 14px"
              showProgressBar
              progress={35}
              defaultOpen={false}
            >
              <p style={{ margin: 0, fontSize: '12px', color: '#475569' }}>Conteúdo em escala reduzida para barras laterais e painéis compactos.</p>
            </Collapse>

            <Collapse
              size="md"
              title="Collapse Tamanho Médio Padrão (size='md')"
              subtitle="Padding de 16px e título em 16px"
              showProgressBar
              progress={65}
              defaultOpen={true}
            >
              <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>Tamanho balanceado padrão para a maioria dos fluxos da plataforma.</p>
            </Collapse>

            <Collapse
              size="lg"
              title="Collapse Tamanho Grande (size='lg')"
              subtitle="Padding de 20px e título em 18px"
              showProgressBar
              progress={90}
              defaultOpen={false}
            >
              <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>Espaçamento generoso para seções de destaque e formulários principais.</p>
            </Collapse>
          </div>
        </div>

        {/* Bloco 2: Variantes de Superfície (default, bordered, card) */}
        <div>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#1E293B' }}>
            2. Variantes de Superfície (default, bordered, card)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Collapse variant="default" title="Variante Default" subtitle="Borda sutil neutra de 1px">
              <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>Superfície clean sem sombra.</p>
            </Collapse>

            <Collapse variant="bordered" title="Variante Bordered" subtitle="Borda delimitadora destacada">
              <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>Ideal para separação nítida entre múltiplos itens.</p>
            </Collapse>

            <Collapse variant="card" title="Variante Card" subtitle="Com elevação e sombra suave">
              <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>Proporciona destaque visual e profundidade em relação ao plano de fundo.</p>
            </Collapse>
          </div>
        </div>

        {/* Bloco 3: Tema Dark */}
        <div style={{ padding: '24px', borderRadius: '16px', backgroundColor: '#1E293B', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#F8FAFC' }}>
            3. Suporte Nativo ao Tema Dark (theme=&apos;dark&apos;)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Collapse
              theme="dark"
              title="Sessão Escura com Barra de Progresso"
              subtitle="Cores calibradas para alto contraste e conforto visual"
              leadingIcon={<ShieldIcon />}
              showProgressBar
              progress={80}
              defaultOpen={true}
            >
              <p style={{ margin: 0, fontSize: '13px', color: '#A7B5B9', lineHeight: '1.6' }}>
                Fundo neutro escuro <code>#22272A</code>, texto em <code>#F5F5F5</code>, subtítulo em <code>#A7B5B9</code> e barra de progresso em verde <code>#01B574</code>.
              </p>
            </Collapse>
          </div>
        </div>
      </div>
    );
  },
};
