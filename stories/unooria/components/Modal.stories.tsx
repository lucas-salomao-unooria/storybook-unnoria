import React, { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../../../src/unooria/components/Modal/Modal';
import {
  ModalSize,
  ModalTheme,
} from '../../../src/unooria/components/Modal/Modal.types';
import { Button } from '../../../src/unooria/components/Button/Button';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

// ============================================================================
// Ícones SVG Inline para independência total de pacotes externos
// ============================================================================
const AlertTriangleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const UserPlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h8c1 0 2 1 2 2v2" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const LayersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

/**
 * Página de Documentação Rica do Modal baseada no Padrão Ouro do Design System Unooria
 */
const ModalDocumentationPage = () => {
  // Estados para simulações interativas na página de documentação
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [docTheme, setDocTheme] = useState<ModalTheme>('light');

  const propsTableData = [
    {
      name: 'isOpen',
      type: 'boolean',
      default: 'obrigatório',
      desc: 'Controla a exibição e montagem do modal no DOM via React Portal.',
    },
    {
      name: 'onClose',
      type: '() => void',
      default: 'obrigatório',
      desc: 'Callback acionado ao solicitar o fechamento (clique no overlay, botão X ou tecla ESC).',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'full'",
      default: "'md'",
      desc: 'Largura e escala do modal: sm (400px), md (617px - padrão Figma), lg (800px) e full (95vw).',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Tema visual de cores para superfícies claras ou escuras.',
    },
    {
      name: 'title',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Título principal shorthand do cabeçalho (renderizado automaticamente como Modal.Title).',
    },
    {
      name: 'description',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Texto de apoio ou subtítulo shorthand exibido abaixo do título.',
    },
    {
      name: 'subtitle',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Alias alternativo para a propriedade description.',
    },
    {
      name: 'footer',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Conteúdo ou grupo de botões personalizado para o rodapé.',
    },
    {
      name: 'primaryAction',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Ação principal shorthand (ex: Botão Confirmar/Salvar) inserida no rodapé.',
    },
    {
      name: 'secondaryAction',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Ação secundária shorthand (ex: Botão Cancelar) inserida no rodapé.',
    },
    {
      name: 'footerAlign',
      type: "'start' | 'center' | 'end' | 'space-between'",
      default: "'end'",
      desc: 'Alinhamento horizontal dos elementos no rodapé shorthand.',
    },
    {
      name: 'closeOnOverlayClick',
      type: 'boolean',
      default: 'true',
      desc: 'Se true, fecha o modal ao clicar no fundo escurecido (com validação anti-drag de seleção).',
    },
    {
      name: 'closeOnEsc',
      type: 'boolean',
      default: 'true',
      desc: 'Se true, fecha o modal imediatamente ao pressionar a tecla Escape do teclado.',
    },
    {
      name: 'showCloseButton',
      type: 'boolean',
      default: 'true',
      desc: 'Exibe o botão circular de fechar (X) no canto superior direito do cabeçalho.',
    },
    {
      name: 'lockScroll',
      type: 'boolean',
      default: 'true',
      desc: 'Bloqueia o scroll do body com compensação de scrollbar para evitar saltos visuais de layout.',
    },
    {
      name: 'trapFocus',
      type: 'boolean',
      default: 'true',
      desc: 'Confinamento de navegação acessível por Tab/Shift+Tab dentro do diálogo (WAI-ARIA).',
    },
    {
      name: 'initialFocusRef',
      type: 'React.RefObject<HTMLElement>',
      default: 'undefined',
      desc: 'Elemento que deve receber o foco de digitação assim que o modal for renderizado.',
    },
    {
      name: 'finalFocusRef',
      type: 'React.RefObject<HTMLElement>',
      default: 'undefined',
      desc: 'Elemento que receberá o foco de volta quando o modal for fechado.',
    },
    {
      name: 'role',
      type: "'dialog' | 'alertdialog'",
      default: "'dialog'",
      desc: 'Papel semântico WAI-ARIA. Use "alertdialog" para confirmações destrutivas com bloqueio estrito.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Conteúdo principal ou subcomponentes modulares (Modal.Header, Modal.Body, Modal.Footer).',
    },
  ];

  const subcomponentsData = [
    {
      name: 'Modal.Header',
      props: 'title?, description?, subtitle?, showCloseButton?, onClose?, action?, children?',
      desc: 'Contêiner de topo com espaçamento Figma de 24px entre título e o botão de fechar.',
    },
    {
      name: 'Modal.Title',
      props: "as? ('h1' | 'h2' | ...), id?, children",
      desc: 'Título semântico (Open Sans, 20px, Bold 700) com vinculação automática de aria-labelledby.',
    },
    {
      name: 'Modal.Description',
      props: "as? ('p' | 'span' | ...), id?, children",
      desc: 'Texto de apoio (Open Sans, 14px, Regular 400) com vinculação automática de aria-describedby.',
    },
    {
      name: 'Modal.Body',
      props: "padding? ('none' | 'sm' | 'md' | 'lg' | string), scrollable?, maxHeight?, children",
      desc: 'Área central de conteúdo com rolagem independente, scrollbar discreta e gap interno de 16px.',
    },
    {
      name: 'Modal.Footer',
      props: "align? ('start' | 'center' | 'end' | 'space-between'), gap?, divider?, primaryAction?, secondaryAction?, children",
      desc: 'Barra inferior de ações com espaçamento Figma de 16px entre botões e alinhamento flexível.',
    },
    {
      name: 'Modal.CloseButton',
      props: 'ariaLabel?, icon?, onClick?',
      desc: 'Botão de fechamento acessível (32x32px) com suporte a foco visível de alto contraste.',
    },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Overlays & Diálogos"
        title="Modal"
        description="O componente Modal (Diálogo Flutuante) é o contêiner de foco exclusivo oficial da Plataforma Unooria. Projetado para capturar a atenção do usuário para decisões críticas, fluxos de confirmação, formulários de criação/edição e visualização contextual, mantendo total fidelidade aos tokens do Figma, transições fluidas e conformidade rigorosa com a WAI-ARIA 1.2."
      />

      {/* 1. Visão Geral & Casos de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Casos de Uso"
          description="Quando e como utilizar o Modal nas jornadas de usuário da Plataforma Unooria"
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
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span> Diálogos de Confirmação
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Confirmação de ações irreversíveis ou destrutivas (ex: exclusão de dados, cancelamento de contrato, saída com alterações não salvas) usando <code style={{ fontSize: '12px', background: '#E2E8F0', padding: '2px 4px', borderRadius: '4px' }}>role=&quot;alertdialog&quot;</code>.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📝</span> Formulários Modais
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Fluxos rápidos de cadastro ou edição de entidades sem exigir que o usuário mude de página ou perca o contexto da listagem/tabela principal.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📜</span> Termos & Políticas de Uso
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Apresentação de documentos extensos e termos legais com área de rolagem interna suave (<code style={{ fontSize: '12px', background: '#E2E8F0', padding: '2px 4px', borderRadius: '4px' }}>Modal.Body scrollable</code>) e barra de ações fixa.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🖼️</span> Visualizadores de Mídia
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Exibição ampliada de relatórios, gráficos, detalhes técnicos ou prévias de documentos em escala estendida ou tela cheia (<code style={{ fontSize: '12px', background: '#E2E8F0', padding: '2px 4px', borderRadius: '4px' }}>size=&quot;lg&quot;</code> ou <code style={{ fontSize: '12px', background: '#E2E8F0', padding: '2px 4px', borderRadius: '4px' }}>&quot;full&quot;</code>).
            </p>
          </div>
        </div>
      </section>

      {/* 2. Figma & Especificações */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="2. Figma & Especificações Técnicas de Design"
          description="Alinhamento milimétrico com o arquivo de design do Figma Unooria"
          barColor="#10B981"
        />

        <div
          style={{
            padding: '24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            marginTop: '16px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#006BFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Figma Spec Link
              </div>
              <a
                href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=8909-60&m=dev"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#1E293B',
                  textDecoration: 'none',
                  marginTop: '4px',
                }}
              >
                <span>Design System Unooria • Modal Component</span>
                <ExternalLinkIcon />
              </a>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, border: '1px solid #DBEAFE' }}>
                Node #8909:60 (Default 617px)
              </span>
              <span style={{ backgroundColor: '#FEF2F2', color: '#B91C1C', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, border: '1px solid #FEE2E2' }}>
                Node #8909:64 (Alert / Destructive)
              </span>
              <span style={{ backgroundColor: '#F5F3FF', color: '#6D28D9', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, border: '1px solid #EDE9FE' }}>
                Node #8909:70 (Expanded / Full)
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>OVERLAY BACKDROP</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>rgba(34, 39, 42, 0.4)</div>
              <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>Filtro de desfoque: <code style={{ fontSize: '11px' }}>blur(8px)</code></div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>CANTOS ARREDONDADOS</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>border-radius: 16px</div>
              <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>Mobile: cantos superiores 16px</div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>ELEVAÇÃO & SOMBRA</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>Elevation 3 (Floating)</div>
              <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>0 20px 25px -5px rgba(0,0,0,0.1)</div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>GRID DE ESPAÇAMENTO</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>Header 24px • Body 16px</div>
              <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>Rodapé com gap de 16px</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Anatomia Modular */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="3. Anatomia Modular (Compound Components)"
          description="Estrutura atômica em camadas com componentes compostos para máxima flexibilidade"
          barColor="#8B5CF6"
        />

        <div
          style={{
            padding: '24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            marginTop: '16px',
          }}
        >
          {/* Wireframe anatômico esquemático */}
          <div
            style={{
              padding: '20px',
              backgroundColor: '#F1F5F9',
              borderRadius: '10px',
              border: '2px dashed #CBD5E1',
              marginBottom: '24px',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '12px', letterSpacing: '0.05em' }}>
              ESQUEMA DE CAMADAS • ANATOMIA VISUAL
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '2px solid #006BFF',
                padding: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              {/* Header Wireframe */}
              <div style={{ border: '1px dashed #006BFF', padding: '12px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E40AF' }}>1. Modal.Header & Modal.Title</div>
                  <div style={{ fontSize: '12px', color: '#3B82F6' }}>2. Modal.Description (subtítulo)</div>
                </div>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #93C5FD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#1E40AF' }}>
                  X
                </div>
              </div>

              {/* Body Wireframe */}
              <div style={{ border: '1px dashed #10B981', padding: '16px', borderRadius: '8px', backgroundColor: '#F0FDF4', margin: '12px 0' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#166534' }}>3. Modal.Body (Área de Conteúdo)</div>
                <div style={{ fontSize: '12px', color: '#15803D', marginTop: '4px' }}>
                  Suporta formulários, textos, tabelas ou qualquer nó React com rolagem independente.
                </div>
              </div>

              {/* Footer Wireframe */}
              <div style={{ border: '1px dashed #8B5CF6', padding: '12px', borderRadius: '8px', backgroundColor: '#F5F3FF', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <div style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #DDD6FE', fontSize: '12px', color: '#6D28D9', fontWeight: 600 }}>
                  Ação Secundária
                </div>
                <div style={{ padding: '6px 12px', borderRadius: '6px', backgroundColor: '#7C3AED', color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>
                  4. Modal.Footer (Ação Primária)
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {subcomponentsData.map((sub) => (
              <div
                key={sub.name}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#006BFF', fontFamily: 'monospace' }}>
                  {sub.name}
                </div>
                <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#64748B', marginTop: '4px' }}>
                  {sub.props}
                </div>
                <div style={{ fontSize: '13px', color: '#334155', marginTop: '8px', lineHeight: '1.5' }}>
                  {sub.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tamanhos Suportados */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="4. Tamanhos Suportados (Sizes Matrix)"
          description="Escalas dimensionais calibradas para cada tipo de fluxo de trabalho"
          barColor="#F59E0B"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>Small (sm)</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#006BFF', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>400px</span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '12px 0 16px 0', lineHeight: '1.5' }}>
              Ideal para diálogos curtos, confirmações rápidas, avisos de exclusão ou perguntas binárias diretas.
            </p>
            <Button size="sm" variant="outline" fullWidth onClick={() => setActiveDemo('sm')}>
              Testar Tamanho sm
            </Button>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '2px solid #006BFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#006BFF' }}>Medium (md) ★ Figma</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF', backgroundColor: '#006BFF', padding: '2px 8px', borderRadius: '4px' }}>617px</span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '12px 0 16px 0', lineHeight: '1.5' }}>
              Dimensão padrão do design system (#8909:60). Perfeito para formulários modais padrão e assistentes de configuração.
            </p>
            <Button size="sm" variant="primary" fullWidth onClick={() => setActiveDemo('md')}>
              Testar Tamanho md
            </Button>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>Large (lg)</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#006BFF', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>800px</span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '12px 0 16px 0', lineHeight: '1.5' }}>
              Utilizado para formulários em 2 colunas, relatórios detalhados, tabelas de dados ou formulários densos.
            </p>
            <Button size="sm" variant="outline" fullWidth onClick={() => setActiveDemo('lg')}>
              Testar Tamanho lg
            </Button>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>Fullscreen (full)</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#006BFF', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>95vw / 100vh</span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '12px 0 16px 0', lineHeight: '1.5' }}>
              Ocupa quase a tela inteira. Recomendado para wizards passo-a-passo complexos, editores de mídia e dashboards.
            </p>
            <Button size="sm" variant="outline" fullWidth onClick={() => setActiveDemo('full')}>
              Testar Tamanho full
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Acessibilidade WAI-ARIA (WCAG 2.1 AA) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="5. Acessibilidade WAI-ARIA & Usabilidade (WCAG 2.1 AA)"
          description="Recursos nativos implementados para conformidade universal com tecnologias assistivas"
          barColor="#06B6D4"
        />

        <div
          style={{
            padding: '24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            marginTop: '16px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '14px' }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
                🛡️ Focus Trap (Confinamento de Foco)
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                A navegação por <code style={{ fontSize: '12px' }}>Tab</code> e <code style={{ fontSize: '12px' }}>Shift + Tab</code> fica estritamente restrita aos elementos focáveis dentro do modal. Ao atingir o último elemento, o foco retorna ao primeiro.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '14px' }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
                ⌨️ Tecla Escape (ESC)
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                Pressionar a tecla <code style={{ fontSize: '12px' }}>Escape</code> fecha imediatamente o modal, disparando o callback <code style={{ fontSize: '12px' }}>onClose</code> e restaurando o foco no elemento acionador original.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '14px' }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
                🔒 Bloqueio de Scroll do Body (Scroll Lock)
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                O <code style={{ fontSize: '12px' }}>document.body</code> recebe <code style={{ fontSize: '12px' }}>overflow: hidden</code> automático com compensação precisa de largura da barra de rolagem, prevenindo layout shifts indesejados.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '14px' }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
                🏷️ Identificadores ARIA Dinâmicos
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                Uso nativo de <code style={{ fontSize: '12px' }}>useId()</code> do React para associar de forma transparente <code style={{ fontSize: '12px' }}>aria-labelledby</code> ao título e <code style={{ fontSize: '12px' }}>aria-describedby</code> à descrição.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="6. Diretrizes de Uso & Boas Práticas (Do's & Don'ts)" barColor="#EF4444" />
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
              <li>Utilize títulos claros e orientados à ação (ex: &quot;Excluir Usuário&quot; em vez de &quot;Tem certeza?&quot;).</li>
              <li>Posicione sempre a ação afirmativa/primária em destaque e garanta uma opção clara de cancelamento.</li>
              <li>Permita o fechamento com tecla Escape e clique no overlay em fluxos não críticos.</li>
              <li>Aponte o foco inicial no primeiro campo do formulário usando a prop <code style={{ fontSize: '12px' }}>initialFocusRef</code>.</li>
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
              <li>Não empilhe múltiplos modais abertos simultaneamente (evite &quot;nested modals&quot;).</li>
              <li>Não utilize modais para mensagens de feedback efêmeras de 3 segundos (use Toasts ou AlertBox).</li>
              <li>Não remova o botão de fechar (X) sem uma razão crítica de fluxo bloqueante.</li>
              <li>Não insira conteúdos excessivamente densos sem habilitar a rolagem interna do corpo.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Suporte a Temas (Light & Dark) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="7. Suporte a Temas (Light e Dark Mode)" barColor="#6366F1" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
          {/* Card Light */}
          <div style={{ padding: '20px', border: '1px solid #E2E8F0', borderRadius: '12px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, color: '#0284C7', fontSize: '15px' }}>☀️ Tema Claro (Light Mode)</h4>
              <span style={{ fontSize: '12px', color: '#64748B' }}>--unooria-modal-bg: #FFFFFF</span>
            </div>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
              Fundo branco com bordas sutis (#E4E8E9), tipografia de alto contraste (#22272A) e overlay escurecido a 40% com desfoque de 8px.
            </p>
            <div style={{ marginTop: '16px' }}>
              <Button
                size="sm"
                variant="outline"
                fullWidth
                onClick={() => {
                  setDocTheme('light');
                  setActiveDemo('theme-preview');
                }}
              >
                Abrir Modal no Tema Light
              </Button>
            </div>
          </div>

          {/* Card Dark */}
          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#22272A', border: '1px solid #3D4448' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, color: '#38BDF8', fontSize: '15px' }}>🌙 Tema Escuro (Dark Mode)</h4>
              <span style={{ fontSize: '12px', color: '#A7B5B9' }}>--unooria-modal-bg: #22272A</span>
            </div>
            <p style={{ fontSize: '13px', color: '#A7B5B9', lineHeight: '1.5' }}>
              Superfície escura profunda com borda grafite (#3D4448), tipografia branca (#FFFFFF) e sombra reforçada para alta profundidade.
            </p>
            <div style={{ marginTop: '16px' }}>
              <Button
                size="sm"
                variant="primary"
                fullWidth
                onClick={() => {
                  setDocTheme('dark');
                  setActiveDemo('theme-preview');
                }}
              >
                Abrir Modal no Tema Dark
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Tabela Completa de Props da API */}
      <section>
        <UnooriaDocSectionHeader title="8. Referência Completa das Propriedades (Props API)" barColor="#64748B" />
        <div style={{ overflowX: 'auto', marginTop: '16px' }}>
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
      </section>

      {/* Modais de Demonstração Interativa na Documentação */}
      {activeDemo === 'sm' && (
        <Modal
          isOpen={true}
          size="sm"
          onClose={() => setActiveDemo(null)}
          title="Confirmar Notificação"
          description="Deseja enviar este alerta para todos os 45 usuários da equipe?"
          primaryAction={
            <Button variant="primary" size="sm" onClick={() => setActiveDemo(null)}>
              Confirmar
            </Button>
          }
          secondaryAction={
            <Button variant="outline" size="sm" onClick={() => setActiveDemo(null)}>
              Cancelar
            </Button>
          }
        >
          <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>
            Esta mensagem será disparada instantaneamente através do canal prioritário.
          </p>
        </Modal>
      )}

      {activeDemo === 'md' && (
        <Modal
          isOpen={true}
          size="md"
          onClose={() => setActiveDemo(null)}
          title="Editar Configurações da Conta"
          description="Atualize as preferências de segurança e faturamento da sua organização."
          primaryAction={
            <Button variant="primary" size="md" onClick={() => setActiveDemo(null)}>
              Salvar Alterações
            </Button>
          }
          secondaryAction={
            <Button variant="outline" size="md" onClick={() => setActiveDemo(null)}>
              Voltar
            </Button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
              Nome da Organização
              <input
                type="text"
                defaultValue="Unooria Tech Solutions"
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: '4px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </label>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
              E-mail de Notificações
              <input
                type="email"
                defaultValue="admin@unooria.com"
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: '4px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </label>
          </div>
        </Modal>
      )}

      {activeDemo === 'lg' && (
        <Modal
          isOpen={true}
          size="lg"
          onClose={() => setActiveDemo(null)}
          title="Relatório Detalhado de Performance"
          description="Estatísticas consolidadas dos últimos 30 dias de processamento."
          primaryAction={
            <Button variant="primary" size="md" onClick={() => setActiveDemo(null)}>
              Exportar PDF
            </Button>
          }
          secondaryAction={
            <Button variant="outline" size="md" onClick={() => setActiveDemo(null)}>
              Fechar
            </Button>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Requisições</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#006BFF' }}>1.248.920</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Uptime</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#10B981' }}>99.98%</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Latência Média</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#F59E0B' }}>42ms</div>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
            O tamanho Large (800px) acomoda dashboards analíticos, gráficos densos e múltiplos blocos de informação com leitura fluida e confortável.
          </p>
        </Modal>
      )}

      {activeDemo === 'full' && (
        <Modal
          isOpen={true}
          size="full"
          onClose={() => setActiveDemo(null)}
          title="Assistente de Implantação e Migração de Dados"
          description="Fluxo em tela cheia com etapas sequenciais de configuração de infraestrutura."
          primaryAction={
            <Button variant="primary" size="md" onClick={() => setActiveDemo(null)}>
              Concluir Migração
            </Button>
          }
          secondaryAction={
            <Button variant="outline" size="md" onClick={() => setActiveDemo(null)}>
              Cancelar
            </Button>
          }
        >
          <div style={{ padding: '24px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <LayersIcon />
            <h3 style={{ margin: '12px 0 6px 0', fontSize: '18px', color: '#1E293B' }}>Ambiente de Visualização Expandida</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748B', maxWidth: '500px' }}>
              O tamanho Fullscreen (95vw) é indicado para editores de código, mapeadores de tabelas e fluxos guiados passo a passo.
            </p>
          </div>
        </Modal>
      )}

      {activeDemo === 'theme-preview' && (
        <Modal
          isOpen={true}
          theme={docTheme}
          size="md"
          onClose={() => setActiveDemo(null)}
          title={`Modal no Tema ${docTheme === 'dark' ? 'Dark (Escuro)' : 'Light (Claro)'}`}
          description="Verifique como as cores de fundo, sombras, bordas e botões de fechamento se adaptam perfeitamente ao tema."
          primaryAction={
            <Button variant="primary" size="md" onClick={() => setActiveDemo(null)}>
              Entendido
            </Button>
          }
          secondaryAction={
            <Button variant="outline" size="md" onClick={() => setActiveDemo(null)}>
              Fechar
            </Button>
          }
        >
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
            O tema {docTheme} aplica automaticamente os tokens CSS semânticos da Plataforma Unooria, garantindo legibilidade superior e contraste em conformidade com a WCAG 2.1 AA.
          </p>
        </Modal>
      )}
    </UnooriaDocShell>
  );
};

// ============================================================================
// Configuração do Objeto Meta
// ============================================================================
const meta: Meta<typeof Modal> = {
  title: 'Plataforma Unooria/Componentes/Modal',
  component: Modal,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controla se o modal está aberto ou fechado.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Tamanho e largura do modal.',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Tema visual de cores (Light ou Dark).',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    title: {
      control: 'text',
      description: 'Título principal exibido no cabeçalho.',
    },
    description: {
      control: 'text',
      description: 'Subtítulo descritivo do cabeçalho.',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Exibe ou oculta o botão de fechar (X).',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Fecha ao clicar no fundo escurecido.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Fecha ao pressionar a tecla ESC.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    lockScroll: {
      control: 'boolean',
      description: 'Bloqueia o scroll do body quando aberto.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    trapFocus: {
      control: 'boolean',
      description: 'Confinamento acessível de foco por teclado.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    footerAlign: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between'],
      description: 'Alinhamento dos botões no rodapé.',
      table: {
        defaultValue: { summary: 'end' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback disparado ao fechar.',
    },
  },
  args: {
    isOpen: false,
    size: 'md',
    theme: 'light',
    title: 'Configurações de Notificação',
    description: 'Escolha os canais prioritários para recebimento de alertas da plataforma.',
    showCloseButton: true,
    closeOnOverlayClick: true,
    closeOnEsc: true,
    lockScroll: true,
    trapFocus: true,
    footerAlign: 'end',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ============================================================================
// 1ª História Obrigatória: 📄 Documentação Completa
// ============================================================================
/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ModalDocumentationPage />,
};

// ============================================================================
// 2ª História: Playground Interativo
// ============================================================================
/**
 * Playground interativo com controles abrangentes e botão acionador.
 */
export const Playground: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    // Sincroniza com as alterações dos controles do Storybook
    React.useEffect(() => {
      setIsOpen(args.isOpen);
    }, [args.isOpen]);

    const handleClose = () => {
      setIsOpen(false);
      args.onClose?.();
    };

    return (
      <div
        style={{
          padding: '40px 24px',
          borderRadius: '12px',
          backgroundColor: args.theme === 'dark' ? '#1E293B' : '#F8FAFC',
          border: `1px solid ${args.theme === 'dark' ? '#334155' : '#E2E8F0'}`,
          maxWidth: '640px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: args.theme === 'dark' ? '#FFFFFF' : '#1E293B' }}>
          Playground Interativo do Modal
        </h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: args.theme === 'dark' ? '#94A3B8' : '#64748B' }}>
          Clique no botão abaixo para abrir o modal e experimente modificar os controles no painel inferior do Storybook.
        </p>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsOpen(true)}
        >
          Abrir Modal ({args.size?.toUpperCase()})
        </Button>

        <Modal
          {...args}
          isOpen={isOpen}
          onClose={handleClose}
          primaryAction={
            <Button variant="primary" size="md" onClick={handleClose}>
              Salvar Alterações
            </Button>
          }
          secondaryAction={
            <Button variant="outline" size="md" onClick={handleClose}>
              Cancelar
            </Button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
              Este é o corpo do modal com layout flexível. Altere as propriedades como <strong>size</strong>, <strong>theme</strong> e <strong>footerAlign</strong> nos controles do Storybook.
            </p>
            <div style={{ padding: '12px', backgroundColor: args.theme === 'dark' ? '#2A3236' : '#F1F5F9', borderRadius: '8px', fontSize: '13px' }}>
              💡 <strong>Dica:</strong> Pressione a tecla <kbd style={{ padding: '2px 4px', background: '#E2E8F0', borderRadius: '4px', color: '#1E293B' }}>ESC</kbd> ou clique fora para testar o fechamento acessível.
            </div>
          </div>
        </Modal>
      </div>
    );
  },
  args: {
    isOpen: false,
    size: 'md',
    theme: 'light',
    title: 'Configurações de Notificação',
    description: 'Escolha os canais prioritários para recebimento de alertas da plataforma.',
  },
};

// ============================================================================
// 3ª História: Todos os Tamanhos (TodosTamanhos)
// ============================================================================
/**
 * Demonstração dos 4 tamanhos suportados pelo Modal Unooria: sm (400px), md (617px), lg (800px) e full.
 */
export const TodosTamanhos: Story = {
  name: 'Todos os Tamanhos (Sizes)',
  render: () => {
    const [currentSize, setCurrentSize] = useState<ModalSize | null>(null);

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', color: '#1E293B' }}>
            Matriz de Tamanhos Suportados
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>
            Clique em cada botão para visualizar o comportamento dimensional e a proporção de cada tamanho.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>Small (sm)</div>
            <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>400px de largura</div>
            <Button variant="outline" size="sm" fullWidth onClick={() => setCurrentSize('sm')}>
              Abrir Modal SM
            </Button>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '2px solid #006BFF', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#006BFF', marginBottom: '4px' }}>Medium (md)</div>
            <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>617px (Figma Padrão)</div>
            <Button variant="primary" size="sm" fullWidth onClick={() => setCurrentSize('md')}>
              Abrir Modal MD
            </Button>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>Large (lg)</div>
            <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>800px de largura</div>
            <Button variant="outline" size="sm" fullWidth onClick={() => setCurrentSize('lg')}>
              Abrir Modal LG
            </Button>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>Fullscreen (full)</div>
            <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>95vw / Quase tela cheia</div>
            <Button variant="outline" size="sm" fullWidth onClick={() => setCurrentSize('full')}>
              Abrir Modal FULL
            </Button>
          </div>
        </div>

        {currentSize && (
          <Modal
            isOpen={true}
            size={currentSize}
            onClose={() => setCurrentSize(null)}
            title={`Modal no Tamanho: ${currentSize.toUpperCase()}`}
            description={`Demonstração dimensional calibrada com a escala do Design System Unooria (${currentSize === 'md' ? '617px - Especificação Oficial Figma #8909:60' : currentSize === 'sm' ? '400px' : currentSize === 'lg' ? '800px' : '95vw'}).`}
            primaryAction={
              <Button variant="primary" size="md" onClick={() => setCurrentSize(null)}>
                Entendido
              </Button>
            }
            secondaryAction={
              <Button variant="outline" size="md" onClick={() => setCurrentSize(null)}>
                Fechar
              </Button>
            }
          >
            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>
                Este modal está renderizado com a propriedade <code style={{ color: '#006BFF', fontWeight: 600 }}>size=&quot;{currentSize}&quot;</code>.
                Em telas mobile (&lt; 640px), o modal se converte fluidamente em uma folha inferior (bottom-sheet) com cantos superiores arredondados.
              </p>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};

// ============================================================================
// 4ª História: Diálogo de Confirmação (DialogoConfirmacao)
// ============================================================================
/**
 * Modal configurado para confirmação de ações destrutivas (role="alertdialog") com foco e semântica crítica.
 */
export const DialogoConfirmacao: Story = {
  name: 'Diálogo de Confirmação (Destrutivo)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
      <div style={{ padding: '32px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1E293B' }}>Fluxo de Exclusão com Diálogo Crítico</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>
            Exemplo de diálogo com <code style={{ fontSize: '12px', background: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>role=&quot;alertdialog&quot;</code> e botão de ação perigosa.
          </p>
        </div>

        <Button
          variant="danger"
          size="md"
          leftIcon={<TrashIcon />}
          onClick={() => setIsOpen(true)}
        >
          Excluir Base de Dados
        </Button>

        <Modal
          isOpen={isOpen}
          role="alertdialog"
          size="sm"
          onClose={() => setIsOpen(false)}
          title="Excluir Definitivamente?"
          description="Esta ação removerá permanentemente a base de dados e não poderá ser desfeita."
          primaryAction={
            <Button
              variant="danger"
              size="md"
              leftIcon={<TrashIcon />}
              onClick={() => {
                alert('Item excluído com sucesso!');
                setIsOpen(false);
              }}
            >
              Sim, Excluir Registro
            </Button>
          }
          secondaryAction={
            <Button
              ref={cancelRef}
              variant="outline"
              size="md"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
          }
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FEE2E2' }}>
            <AlertTriangleIcon />
            <div style={{ fontSize: '13px', color: '#991B1B', lineHeight: '1.5' }}>
              <strong>Atenção:</strong> Todos os 1.420 clientes vinculados a esta conta serão desassociados imediatamente.
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};

// ============================================================================
// 5ª História: Formulário Modal (FormularioModal)
// ============================================================================
/**
 * Modal contendo formulário de cadastro/edição com campos estruturados, scroll interno e foco inicial.
 */
export const FormularioModal: Story = {
  name: 'Formulário Modal (Cadastro/Edição)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const firstInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Novo membro cadastrado com sucesso!');
      setIsOpen(false);
    };

    return (
      <div style={{ padding: '32px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1E293B' }}>Criação Rápida em Modal</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>
            Formulário de cadastro com rolagem interna suave e foco automático no primeiro campo.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<UserPlusIcon />}
          onClick={() => setIsOpen(true)}
        >
          Adicionar Novo Membro
        </Button>

        <Modal
          isOpen={isOpen}
          size="md"
          onClose={() => setIsOpen(false)}
          title="Novo Membro da Equipe"
          description="Preencha os dados e selecione o nível de permissão de acesso para o novo colaborador."
          primaryAction={
            <Button
              variant="primary"
              size="md"
              type="submit"
              form="modal-add-user-form"
            >
              Criar Acesso
            </Button>
          }
          secondaryAction={
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
          }
        >
          <form id="modal-add-user-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
              Nome Completo *
              <input
                ref={firstInputRef}
                type="text"
                required
                placeholder="Ex: Ana Clara Silva"
                style={{
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
              E-mail Corporativo *
              <input
                type="email"
                required
                placeholder="Ex: ana.silva@unooria.com"
                style={{
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                Departamento
                <select
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '14px',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <option value="eng">Engenharia de Software</option>
                  <option value="design">Design & UX</option>
                  <option value="produto">Gestão de Produto</option>
                  <option value="suporte">Atendimento ao Cliente</option>
                </select>
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                Perfil de Acesso
                <select
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '14px',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <option value="collab">Colaborador (Padrão)</option>
                  <option value="manager">Gerente de Equipe</option>
                  <option value="admin">Administrador Global</option>
                </select>
              </label>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569', cursor: 'pointer', marginTop: '4px' }}>
              <input type="checkbox" defaultChecked />
              Enviar convite de ativação e instruções por e-mail
            </label>
          </form>
        </Modal>
      </div>
    );
  },
};

// ============================================================================
// 6ª História: Composição Modular (ComposicaoModular)
// ============================================================================
/**
 * Demonstração do uso via Compound Components (Modal.Header, Modal.Title, Modal.Body, Modal.Footer).
 */
export const ComposicaoModular: Story = {
  name: 'Composição Modular (Compound Components)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<'pro' | 'enterprise'>('enterprise');

    return (
      <div style={{ padding: '32px', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1E293B' }}>Uso Flexível com Compound Components</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>
            Permite injetar badges, ícones customizados no cabeçalho e layouts complexos no corpo e rodapé.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsOpen(true)}
        >
          Fazer Upgrade de Plano
        </Button>

        <Modal isOpen={isOpen} size="lg" onClose={() => setIsOpen(false)}>
          {/* Header Modular Customizado */}
          <Modal.Header showCloseButton onClose={() => setIsOpen(false)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Modal.Title>Planos & Faturamento</Modal.Title>
              <span style={{ backgroundColor: '#EFF6FF', color: '#006BFF', fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', border: '1px solid #DBEAFE' }}>
                RECOMENDADO
              </span>
            </div>
            <Modal.Description>
              Selecione o pacote que melhor atende à escala de requisições da sua organização.
            </Modal.Description>
          </Modal.Header>

          {/* Body Modular com Seleção de Planos */}
          <Modal.Body padding="md" scrollable>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div
                onClick={() => setSelectedPlan('pro')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: `2px solid ${selectedPlan === 'pro' ? '#006BFF' : '#E2E8F0'}`,
                  backgroundColor: selectedPlan === 'pro' ? '#F0F7FF' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>Plano Professional</span>
                  {selectedPlan === 'pro' && <CheckCircleIcon />}
                </div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#006BFF', margin: '8px 0 4px 0' }}>
                  R$ 149<span style={{ fontSize: '13px', fontWeight: 400, color: '#64748B' }}>/mês</span>
                </div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>Até 10 membros e 100.000 requisições/mês.</div>
              </div>

              <div
                onClick={() => setSelectedPlan('enterprise')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: `2px solid ${selectedPlan === 'enterprise' ? '#006BFF' : '#E2E8F0'}`,
                  backgroundColor: selectedPlan === 'enterprise' ? '#F0F7FF' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>Plano Enterprise</span>
                  {selectedPlan === 'enterprise' && <CheckCircleIcon />}
                </div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#006BFF', margin: '8px 0 4px 0' }}>
                  R$ 399<span style={{ fontSize: '13px', fontWeight: 400, color: '#64748B' }}>/mês</span>
                </div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>Membros ilimitados, SLA 99.9% e suporte 24/7.</div>
              </div>
            </div>
          </Modal.Body>

          {/* Footer Modular com Divisor */}
          <Modal.Footer align="space-between" divider>
            <span style={{ fontSize: '13px', color: '#64748B' }}>
              Cobrança mensal recorrente com cancelamento a qualquer momento.
            </span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="outline" size="md" onClick={() => setIsOpen(false)}>
                Agora Não
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  alert(`Upgrade confirmado para o Plano ${selectedPlan.toUpperCase()}!`);
                  setIsOpen(false);
                }}
              >
                Confirmar Assinatura
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

// ============================================================================
// 7ª História: Exemplo Canônico do Figma (Nó #8909:60)
// ============================================================================
/**
 * Réplica idêntica de 1:1 do nó `#8909:425` do Figma com o formulário de 5 campos e botões.
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node #8909:60)',
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div style={{ padding: '32px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <Button variant="primary" size="md" onClick={() => setIsOpen(true)}>
          Abrir Modal Oficial do Figma
        </Button>

        <Modal
          isOpen={isOpen}
          size="md"
          onClose={() => setIsOpen(false)}
          title="Title Example"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's."
          primaryAction={
            <Button variant="primary" size="md" onClick={() => setIsOpen(false)}>
              Text Button
            </Button>
          }
          secondaryAction={
            <Button variant="outline" size="md" onClick={() => setIsOpen(false)}>
              Text Button
            </Button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#22272A' }}>Input Label</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#C11414' }}>*</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 12px',
                    border: '1px solid #E4E8E9',
                    borderRadius: '12px',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <span style={{ fontSize: '16px', color: '#383E41' }}>Placeholder</span>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  },
};

