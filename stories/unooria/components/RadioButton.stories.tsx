import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton, RadioGroup } from '../../../src/unooria/components/RadioButton/RadioButton';
import {
  RadioButtonProps,
  RadioGroupProps,
  RadioButtonOption,
  RadioButtonSize,
  RadioButtonTheme,
  RadioButtonState,
  RadioButtonBoxSide,
  RadioGroupDirection,
} from '../../../src/unooria/components/RadioButton/RadioButton.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

// ============================================================================
// ÍCONES SVG INLINE AUXILIARES
// ============================================================================

const FigmaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8 24C10.2091 24 12 22.2091 12 20V16H8C5.79086 16 4 17.7909 4 20C4 22.2091 5.79086 24 8 24Z"
      fill="#0ACF83"
    />
    <path
      d="M4 12C4 9.79086 5.79086 8 8 8H12V16H8C5.79086 16 4 14.2091 4 12Z"
      fill="#A259FF"
    />
    <path
      d="M4 4C4 1.79086 5.79086 0 8 0H12V8H8C5.79086 8 4 6.20914 4 4Z"
      fill="#F24E1E"
    />
    <path
      d="M12 0H16C18.2091 0 20 1.79086 20 4C20 6.20914 18.2091 8 16 8H12V0Z"
      fill="#FF7262"
    />
    <path
      d="M20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12C12 9.79086 13.7909 8 16 8C18.2091 8 20 9.79086 20 12Z"
      fill="#1ABCFE"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CreditCardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

// ============================================================================
// PÁGINA DE DOCUMENTAÇÃO COMPLETA (PADRÃO OURO)
// ============================================================================

const RadioButtonDocumentationPage = () => {
  // Estado local para simuladores interativos dentro da documentação
  const [docDemoValue, setDocDemoValue] = useState<string>('pix');
  const [docTheme, setDocTheme] = useState<RadioButtonTheme>('light');
  const [deliveryMethod, setDeliveryMethod] = useState<string>('express');
  const [selectedBoxSideDemo, setSelectedBoxSideDemo] = useState<string>('opt1');

  // Dados das Props do RadioButton
  const radioButtonPropsData = [
    {
      name: 'boxSide',
      type: "'left' | 'right' | 'none' | 'Left side' | 'Right side' | 'No text'",
      default: "'left'",
      desc: 'Posição do controle de rádio em relação ao rótulo textual: "left" (padrão Figma Left side), "right" (Right side) ou "none" (No text).',
    },
    {
      name: 'value',
      type: 'string | number',
      default: 'undefined',
      desc: 'Valor único associado ao botão de rádio submetido ao formulário ou manipulado no grupo.',
    },
    {
      name: 'checked',
      type: 'boolean',
      default: 'undefined',
      desc: 'Define se o botão de rádio está selecionado (Modo Controlado).',
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      default: 'false',
      desc: 'Define o estado inicial de seleção (Modo Não-Controlado).',
    },
    {
      name: 'label',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Rótulo textual principal exibido ao lado do botão de rádio com peso tipográfico 400/500.',
    },
    {
      name: 'helperText',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Texto secundário de apoio descritivo exibido abaixo do rótulo principal.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      desc: 'Tamanho do controle: sm (16px / dot 10px), md (20px / dot 14px - Padrão Figma ⭐), lg (24px / dot 16px).',
    },
    {
      name: 'disabled / isDisabled',
      type: 'boolean',
      default: 'false',
      desc: 'Desabilita o botão, aplicando borda #E4E8E9, fundo neutro e cursor not-allowed.',
    },
    {
      name: 'error',
      type: 'boolean | string',
      default: 'false',
      desc: 'Aplica a borda de erro (--unooria-color-danger-500) e opcionalmente renderiza mensagem de validação.',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Tema cromático do componente com adaptação automática de superfícies, anéis e halos.',
    },
    {
      name: 'name',
      type: 'string',
      default: 'undefined',
      desc: 'Nome comum compartilhado do grupo de rádio HTML para seleção mutuamente exclusiva nativa.',
    },
    {
      name: 'onChange',
      type: '(event: React.ChangeEvent<HTMLInputElement>, checked?: boolean) => void',
      default: 'undefined',
      desc: 'Callback disparado imediatamente quando o usuário seleciona o rádio.',
    },
    {
      name: 'state',
      type: "'default' | 'hover' | 'active' | 'focus' | 'disabled'",
      default: "'default'",
      desc: 'Força um estado visual isolado para fins de documentação, matrizes e homologação visual.',
    },
    {
      name: 'isHovered',
      type: 'boolean',
      default: 'false',
      desc: 'Força visualmente o estado de hover com o halo azul de 4px (--unooria-color-opacity-brandnavy-50).',
    },
    {
      name: 'isFocused',
      type: 'boolean',
      default: 'false',
      desc: 'Força visualmente o anel de foco acessível de 3px (--unooria-color-opacity-brandnavy-200).',
    },
    {
      name: 'isActive',
      type: 'boolean',
      default: 'false',
      desc: 'Força visualmente o estado de clique ativo (compressão scale 0.96).',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      desc: 'Rótulo acessível obrigatório quando o botão de rádio é utilizado sem rótulo visível (boxSide="none").',
    },
  ];

  // Dados das Props do RadioGroup
  const radioGroupPropsData = [
    {
      name: 'options',
      type: 'RadioButtonOption[]',
      default: 'undefined',
      desc: 'Lista declarativa de opções ({ value, label, helperText, disabled, error, boxSide }) para renderização automática.',
    },
    {
      name: 'value',
      type: 'string | number',
      default: 'undefined',
      desc: 'Valor atualmente selecionado no grupo (Modo Controlado).',
    },
    {
      name: 'defaultValue',
      type: 'string | number',
      default: 'undefined',
      desc: 'Valor inicialmente selecionado no grupo (Modo Não-Controlado).',
    },
    {
      name: 'onChange',
      type: '(value: string | number, event?: React.ChangeEvent) => void',
      default: 'undefined',
      desc: 'Callback disparado quando qualquer opção dentro do grupo é selecionada.',
    },
    {
      name: 'direction',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      desc: 'Orientação de layout das opções dentro do contêiner flexível.',
    },
    {
      name: 'boxSide',
      type: "'left' | 'right' | 'none' | 'Left side' | 'Right side' | 'No text'",
      default: "'left'",
      desc: 'Posição padrão da caixa de rádio propagada para todos os botões filhos.',
    },
    {
      name: 'label',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Título do grupo renderizado como <legend> semântico do <fieldset>.',
    },
    {
      name: 'helperText',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Texto de orientação geral exibido no rodapé do grupo.',
    },
    {
      name: 'error',
      type: 'boolean | string',
      default: 'false',
      desc: 'Exibe o status de erro e mensagem de validação com ícone de alerta no rodapé do grupo.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Propaga o estado desabilitado para todas as opções de rádio filhas.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      desc: 'Define o tamanho padrão aplicado a todos os botões de rádio filhos do grupo.',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Tema cromático compartilhado com todas as opções do grupo.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      desc: 'Adiciona indicador de obrigatoriedade (*) ao lado do rótulo e aplica aria-required.',
    },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Formulários & Seleção"
        title="RadioButton & RadioGroup"
        description="O RadioButton é o componente oficial de seleção mutuamente exclusiva do Design System Unooria, 100% conforme a especificação do Figma Nó #25405:5873. Projetado para escolha de uma única opção em conjuntos visíveis, oferecendo 4 estados de design (Default, Hover com halo suave, Selected com ponto central de 14px e Disable), 3 posições de layout do boxSide (Left side, Right side, No text), suporte pleno a temas Light/Dark e acessibilidade total WAI-ARIA."
      />

      {/* 1. VISÃO GERAL & CASOS DE USO */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Casos de Uso"
          description="Diretrizes fundamentais para a seleção de controles de formulário na Plataforma Unooria"
          barColor="#6487C2"
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
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔘</span> O que é (Definição Oficial Figma)
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              <em>&ldquo;Componente que permite ao usuário escolher apenas uma opção de um conjunto de alternativas, desmarcando automaticamente as outras.&rdquo;</em>
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
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>👁️</span> Exemplo Prático Visual
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Em formulários de cadastro e checkout, o usuário escolhe entre métodos de envio, formas de pagamento ou gênero, onde exatamente uma alternativa fica marcada por um círculo com ponto azul preenchido.
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
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⌨️</span> Agrupamento Semântico WAI-ARIA
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Ao usar <code>&lt;RadioGroup&gt;</code>, é gerado um <code>&lt;fieldset&gt;</code> acessível com <code>role=&quot;radiogroup&quot;</code> e suporte a navegação por setas (<kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd>).
            </p>
          </div>
        </div>

        {/* Guia Comparativo: Radio vs Checkbox vs Switch vs Select */}
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
            🧭 Guia Rápido: Quando Usar Qual Componente de Seleção?
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD' }}>
              <strong style={{ color: '#0369A1', fontSize: '13px', display: 'block', marginBottom: '4px' }}>🔘 RadioButton</strong>
              <span style={{ fontSize: '12px', color: '#0C4A6E' }}>1 escolha obrigatória entre 2 a 5 alternativas visíveis mutuamente exclusivas.</span>
            </div>
            <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#334155', fontSize: '13px', display: 'block', marginBottom: '4px' }}>☑️ Checkbox</strong>
              <span style={{ fontSize: '12px', color: '#475569' }}>Múltipla escolha (0, 1 ou mais opções) ou aceite de termos/condições.</span>
            </div>
            <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#334155', fontSize: '13px', display: 'block', marginBottom: '4px' }}>🔀 Switch / Toggle</strong>
              <span style={{ fontSize: '12px', color: '#475569' }}>Ativação/desativação binária imediata de configurações (on/off).</span>
            </div>
            <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#334155', fontSize: '13px', display: 'block', marginBottom: '4px' }}>🔽 Select / Dropdown</strong>
              <span style={{ fontSize: '12px', color: '#475569' }}>Conjuntos extensos com mais de 5 a 7 opções (países, moedas, estados).</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FIGMA & ESPECIFICAÇÕES TÉCNICAS */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="2. Figma & Especificações Técnicas (Nó #25405:5873)"
          description="Rastreabilidade direta com o arquivo oficial do Design System Unooria"
          barColor="#0ACF83"
        />

        <div
          style={{
            padding: '24px',
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            marginTop: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <FigmaIcon />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '16px', color: '#1E293B', fontWeight: 600 }}>
                  Figma Component Node: #25405:5873 (Set #25405:5882)
                </h4>
                <span style={{ fontSize: '13px', color: '#64748B' }}>
                  Arquivo: Design System Unooria • Frame: &ldquo;Checkbox + Radio button&rdquo;
                </span>
              </div>
            </div>

            <a
              href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=25405-5873&m=dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#1E293B',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background-color 0.2s',
              }}
            >
              <span>Abrir no Figma Dev Mode</span>
              <ExternalLinkIcon />
            </a>
          </div>

          {/* Tokens de Cores e Medidas Oficiais do Figma */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <strong style={{ fontSize: '13px', color: '#1E293B', display: 'block', marginBottom: '8px' }}>
                🎨 Tokens Cromáticos dos 4 Estados do Figma
              </strong>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#475569', lineHeight: '1.8' }}>
                <li><strong>Default:</strong> Borda <code>#CBD4D6</code>, Fundo <code>#FFFFFF</code>, Texto <code>#383E41</code></li>
                <li><strong>Hover:</strong> Borda <code>#6487C2</code>, Fundo com halo <code>rgba(127, 165, 226, 0.05)</code></li>
                <li><strong>Selected:</strong> Anel <code>#6487C2</code> / <code>rgba(34,39,42,0.2)</code>, Dot <code>#6487C2</code> (14px)</li>
                <li><strong>Disable:</strong> Borda <code>#E4E8E9</code>, Fundo <code>#F5F5F5</code>, Dot <code>#A7B5B9</code>, Texto <code>#475157</code></li>
              </ul>
            </div>

            <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <strong style={{ fontSize: '13px', color: '#1E40AF', display: 'block', marginBottom: '8px' }}>
                📐 Dimensões Padrão Figma (Tamanho MD ⭐)
              </strong>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#1E40AF', lineHeight: '1.8' }}>
                <li><strong>Diâmetro Externo:</strong> <code>20px × 20px</code> (Raio 1000px / 9999px)</li>
                <li><strong>Ponto Central (Dot):</strong> <code>14px × 14px</code> (Cor Brand Navy 700)</li>
                <li><strong>Tipografia Rótulo:</strong> <code>14px / line-height 18px (Open Sans)</code></li>
                <li><strong>Espaçamento (Gap):</strong> <code>8px a 10px</code> entre rádio e texto</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ANATOMIA & AS 3 OPÇÕES DE BOXSIDE */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="3. Anatomia do Componente & As 3 Opções de Box Side"
          description="Detalhamento estrutural do rádio e as variantes de posicionamento Left side, Right side e No text"
          barColor="#8B5CF6"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginTop: '16px',
          }}
        >
          {/* Cartão de Anatomia */}
          <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              🧱 Elementos da Estrutura Anatômica
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ borderLeft: '3px solid #6487C2', paddingLeft: '12px' }}>
                <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>1. Outer Control Ring (Círculo Externo)</strong>
                <span style={{ fontSize: '13px', color: '#64748B' }}>
                  Contêiner circular com raio 9999px, borda de 1.5px (<code>#CBD4D6</code>) e transições suaves de cor e sombra.
                </span>
              </div>

              <div style={{ borderLeft: '3px solid #6487C2', paddingLeft: '12px' }}>
                <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>2. Inner Dot (Ponto Central de 14px)</strong>
                <span style={{ fontSize: '13px', color: '#64748B' }}>
                  Ponto interno preenchido com a cor primária Brand Navy 700 (<code>#6487C2</code>), com microinteração de mola elástica.
                </span>
              </div>

              <div style={{ borderLeft: '3px solid #6487C2', paddingLeft: '12px' }}>
                <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>3. Rótulo Textual (Label)</strong>
                <span style={{ fontSize: '13px', color: '#64748B' }}>
                  Texto principal alinhado ao topo/centro do rádio com excelente contraste tipográfico.
                </span>
              </div>

              <div style={{ borderLeft: '3px solid #6487C2', paddingLeft: '12px' }}>
                <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>4. Texto Auxiliar / Mensagem de Erro (Helper)</strong>
                <span style={{ fontSize: '13px', color: '#64748B' }}>
                  Texto secundário de instrução associado semanticamente via <code>aria-describedby</code>.
                </span>
              </div>
            </div>
          </div>

          {/* As 3 Opções de Box Side (Figma Oficial) */}
          <div style={{ padding: '24px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              📍 3 Opções de Layout do Box Side (Figma #25405:5873)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '13px', color: '#1E293B' }}>1. Left side (Padrão)</strong>
                  <code style={{ fontSize: '11px', color: '#0066FF' }}>boxSide=&quot;left&quot;</code>
                </div>
                <RadioButton
                  name="doc-box-side-demo"
                  boxSide="left"
                  label="Controle de Rádio à Esquerda"
                  helperText="Layout canônico para a grande maioria dos formulários"
                  checked={selectedBoxSideDemo === 'opt1'}
                  onChange={() => setSelectedBoxSideDemo('opt1')}
                />
              </div>

              <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '13px', color: '#1E293B' }}>2. Right side</strong>
                  <code style={{ fontSize: '11px', color: '#0066FF' }}>boxSide=&quot;right&quot;</code>
                </div>
                <RadioButton
                  name="doc-box-side-demo"
                  boxSide="right"
                  label="Texto à Esquerda, Rádio à Direita"
                  helperText="Ideal para cartões de seleção, listas em mobile e modais"
                  checked={selectedBoxSideDemo === 'opt2'}
                  onChange={() => setSelectedBoxSideDemo('opt2')}
                />
              </div>

              <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '13px', color: '#1E293B' }}>3. No text</strong>
                  <code style={{ fontSize: '11px', color: '#0066FF' }}>boxSide=&quot;none&quot;</code>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <RadioButton
                    name="doc-box-side-demo"
                    boxSide="none"
                    ariaLabel="Opção isolada sem rótulo visível"
                    checked={selectedBoxSideDemo === 'opt3'}
                    onChange={() => setSelectedBoxSideDemo('opt3')}
                  />
                  <span style={{ fontSize: '13px', color: '#64748B' }}>
                    Controle isolado (para tabelas de dados, matrizes ou cards com design próprio).
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MATRIZ COMPARATIVA FIGMA: 4 ESTADOS X 3 POSIÇÕES */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="4. Matriz Comparativa Oficial Figma (4 Estados × 3 Posições)"
          description="Reprodução visual exata da matriz do componente Figma #25405:5873"
          barColor="#3B82F6"
        />

        <div
          style={{
            overflowX: 'auto',
            marginTop: '16px',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '14px 18px', color: '#1E293B', fontWeight: 600 }}>Estado Figma</th>
                <th style={{ padding: '14px 18px', color: '#1E293B', fontWeight: 600 }}>Left side</th>
                <th style={{ padding: '14px 18px', color: '#1E293B', fontWeight: 600 }}>Right side</th>
                <th style={{ padding: '14px 18px', color: '#1E293B', fontWeight: 600, textAlign: 'center' }}>No text</th>
              </tr>
            </thead>
            <tbody>
              {/* Linha 1: Default */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>
                  <div>Default</div>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 400 }}>Borda #CBD4D6</span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <RadioButton boxSide="left" checked={false} onChange={() => {}} label="Placeholder" />
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <RadioButton boxSide="right" checked={false} onChange={() => {}} label="Placeholder" />
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                  <RadioButton boxSide="none" checked={false} onChange={() => {}} ariaLabel="Default No Text" />
                </td>
              </tr>

              {/* Linha 2: Hover */}
              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                <td style={{ padding: '14px 18px', fontWeight: 600, color: '#1E40AF' }}>
                  <div>Hover</div>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 400 }}>Halo rgba(127,165,226,0.05)</span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <RadioButton boxSide="left" checked={false} isHovered onChange={() => {}} label="Placeholder" />
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <RadioButton boxSide="right" checked={false} isHovered onChange={() => {}} label="Placeholder" />
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                  <RadioButton boxSide="none" checked={false} isHovered onChange={() => {}} ariaLabel="Hover No Text" />
                </td>
              </tr>

              {/* Linha 3: Selected */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px 18px', fontWeight: 600, color: '#0F766E' }}>
                  <div>Selected</div>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 400 }}>Dot 14px #6487C2</span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <RadioButton boxSide="left" checked={true} onChange={() => {}} label="Placeholder" />
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <RadioButton boxSide="right" checked={true} onChange={() => {}} label="Placeholder" />
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                  <RadioButton boxSide="none" checked={true} onChange={() => {}} ariaLabel="Selected No Text" />
                </td>
              </tr>

              {/* Linha 4: Disable */}
              <tr>
                <td style={{ padding: '14px 18px', fontWeight: 600, color: '#64748B' }}>
                  <div>Disable</div>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 400 }}>Borda #E4E8E9</span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <RadioButton boxSide="left" checked={false} disabled onChange={() => {}} label="Placeholder" />
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <RadioButton boxSide="right" checked={false} disabled onChange={() => {}} label="Placeholder" />
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                  <RadioButton boxSide="none" checked={false} disabled onChange={() => {}} ariaLabel="Disabled No Text" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. DEMONSTRAÇÃO DOS HALOS E EFEITOS VISUAIS */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="5. Demonstração dos Halos e Efeitos Visuais"
          description="Visualização em alta resolução do halo azul suave de hover, anel cinza e expansão elástica"
          barColor="#06B6D4"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          {/* Halo Hover */}
          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
              🔵 Halo Azul Suave de Hover
            </h5>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px 0', lineHeight: '1.6' }}>
              Ao passar o cursor, o círculo recebe um halo externo de 4px com cor <code>rgba(127, 165, 226, 0.05)</code> e borda <code>#6487C2</code>.
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <RadioButton checked={false} isHovered onChange={() => {}} label="Hover Desmarcado" />
              <RadioButton checked={true} isHovered onChange={() => {}} label="Hover Marcado" />
            </div>
          </div>

          {/* Anel e Ponto Selected */}
          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
              🔘 Anel & Ponto Central de 14px
            </h5>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px 0', lineHeight: '1.6' }}>
              No estado selecionado, o ponto interno de 14px em diâmetro é desenhado com a cor oficial Brand Navy 700 (<code>#6487C2</code>).
            </p>
            <RadioButton defaultChecked label="Opção Selecionada Ativa" helperText="Ponto central com animação elástica suave" />
          </div>

          {/* Halo Focus Acessível */}
          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
              ⚡ Halo de Foco Acessível (Focus-Visible)
            </h5>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px 0', lineHeight: '1.6' }}>
              Navegando por teclado, exibe anel de foco de 3px com <code>rgba(127, 165, 226, 0.20)</code> garantindo WCAG 2.1 AA.
            </p>
            <RadioButton checked={false} isFocused onChange={() => {}} label="Foco por Teclado" />
          </div>
        </div>
      </section>

      {/* 6. AGRUPAMENTO COM RADIOGROUP & TECLADO */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="6. Agrupamento com RadioGroup & Navegação por Teclado"
          description="Coordenação centralizada de estado, layouts Vertical/Horizontal e suporte total WAI-ARIA"
          barColor="#F59E0B"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginTop: '16px',
          }}
        >
          {/* Exemplo Vertical */}
          <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              📐 Layout Vertical com `options` Declarativas
            </h4>
            <RadioGroup
              name="doc-shipping"
              label="Modalidade de Envio"
              helperText="Selecione o prazo ideal para entrega do seu pedido"
              value={deliveryMethod}
              onChange={(val) => setDeliveryMethod(String(val))}
              direction="vertical"
              options={[
                {
                  value: 'standard',
                  label: 'Entrega Econômica (PAC)',
                  helperText: '5 a 8 dias úteis • R$ 14,90',
                },
                {
                  value: 'express',
                  label: 'Entrega Expressa (Sedex)',
                  helperText: '1 a 2 dias úteis • R$ 28,50',
                },
                {
                  value: 'sameday',
                  label: 'Super Expressa (Mesmo Dia)',
                  helperText: 'Até as 20h para pedidos feitos até as 13h • R$ 42,00',
                },
              ]}
            />
            <div style={{ marginTop: '16px', padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '6px', fontSize: '12px', color: '#475569' }}>
              Modalidade selecionada: <strong>{deliveryMethod}</strong>
            </div>
          </div>

          {/* Teclas de Navegação WAI-ARIA */}
          <div style={{ padding: '24px', backgroundColor: '#FFFBEB', borderRadius: '12px', border: '1px solid #FDE68A' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#92400E', fontWeight: 600 }}>
              ⌨️ Suporte Completo à Navegação por Teclado
            </h4>
            <p style={{ fontSize: '13px', color: '#B45309', lineHeight: '1.6', margin: '0 0 16px 0' }}>
              O componente atende estritamente às normas WAI-ARIA Radio Group Design Pattern:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <kbd style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: 700 }}>Tab</kbd>
                <span style={{ fontSize: '13px', color: '#78350F' }}>Entra no grupo focando diretamente na opção marcada atualmente.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <kbd style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: 700 }}>↓ / →</kbd>
                <span style={{ fontSize: '13px', color: '#78350F' }}>Avança e seleciona a próxima opção não-desabilitada de forma cíclica.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <kbd style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: 700 }}>↑ / ←</kbd>
                <span style={{ fontSize: '13px', color: '#78350F' }}>Retorna e seleciona a opção anterior não-desabilitada de forma cíclica.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <kbd style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: 700 }}>Space</kbd>
                <span style={{ fontSize: '13px', color: '#78350F' }}>Marca a opção atualmente em foco caso ainda não esteja selecionada.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DIRETRIZES DE DESIGN & BOAS PRÁTICAS */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="7. Diretrizes de Design & Boas Práticas (Do's & Don'ts)"
          description="Recomendações essenciais para garantir usabilidade, clareza e consistência no Design System"
          barColor="#EF4444"
        />

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
              padding: '24px',
              borderRadius: '12px',
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', color: '#166534', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
              <span>✅</span> O que fazer (Do&apos;s)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#15803D', lineHeight: '1.7' }}>
              <li>
                <strong>Sempre pré-selecione uma opção padrão recomendada</strong> quando fizer sentido no fluxo (evite deixar o usuário em dúvida).
              </li>
              <li>
                <strong>Prefira disposição vertical</strong> para grupos de opções com rótulos longos ou descrições auxiliares (facilita o escaneamento visual em Z).
              </li>
              <li>
                <strong>Mantenha as alternativas mutuamente exclusivas</strong> de forma clara e inequívoca.
              </li>
              <li>
                <strong>Utilize o componente &lt;RadioGroup&gt;</strong> para vincular automaticamente o <code>name</code> compartilhado e a acessibilidade.
              </li>
            </ul>
          </div>

          {/* Don'ts */}
          <div
            style={{
              padding: '24px',
              borderRadius: '12px',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', color: '#991B1B', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
              <span>❌</span> O que evitar (Don&apos;ts)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#B91C1C', lineHeight: '1.7' }}>
              <li>
                <strong>Não utilize RadioButton para ações com múltipla escolha</strong> (utilize o componente <code>&lt;Checkbox&gt;</code>).
              </li>
              <li>
                <strong>Não utilize RadioButton individual isolado</strong> para alternar estados ativado/desativado (use <code>&lt;Switch&gt;</code> ou <code>&lt;Checkbox&gt;</code>).
              </li>
              <li>
                <strong>Não ultrapasse 5 ou 6 opções</strong> em um mesmo grupo de rádio (para listas longas, prefira <code>&lt;Select&gt;</code>).
              </li>
              <li>
                <strong>Não execute ações irreversíveis instantaneamente</strong> apenas ao clicar no rádio sem confirmação ou botão de submissão do formulário.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. SUPORTE A TEMAS (LIGHT E DARK) */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="8. Suporte a Temas (Light e Dark) & Acessibilidade WCAG 2.1 AA"
          description="Contraste cromático calibrado, superfícies adaptadas e teste interativo de temas"
          barColor="#06B6D4"
        />

        <div
          style={{
            padding: '24px',
            backgroundColor: docTheme === 'dark' ? '#22272A' : '#FFFFFF',
            borderRadius: '12px',
            border: docTheme === 'dark' ? '1px solid #3D4448' : '1px solid #E2E8F0',
            transition: 'all 0.3s ease',
            marginTop: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '16px', color: docTheme === 'dark' ? '#F8FAFC' : '#1E293B', fontWeight: 600 }}>
                🌓 Simulador de Tema Interativo
              </h4>
              <span style={{ fontSize: '13px', color: docTheme === 'dark' ? '#94A3B8' : '#64748B' }}>
                Alterne o tema e teste o contraste visual e a fidelidade aos tokens do Figma
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setDocTheme('light')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: docTheme === 'light' ? '#006BFF' : '#F1F5F9',
                  color: docTheme === 'light' ? '#FFFFFF' : '#334155',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                ☀️ Light Mode
              </button>
              <button
                onClick={() => setDocTheme('dark')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: '1px solid #475569',
                  backgroundColor: docTheme === 'dark' ? '#006BFF' : '#334155',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                🌙 Dark Mode
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <RadioGroup
              theme={docTheme}
              name={`doc-theme-demo-${docTheme}`}
              label="Forma de Pagamento"
              helperText="Escolha como deseja quitar sua assinatura mensal"
              value={docDemoValue}
              onChange={(val) => setDocDemoValue(String(val))}
              options={[
                { value: 'pix', label: 'PIX Instantâneo', helperText: 'Aprovação em segundos com 5% de desconto' },
                { value: 'credit_card', label: 'Cartão de Crédito', helperText: 'Até 12x sem juros no plano anual' },
                { value: 'boleto', label: 'Boleto Bancário', helperText: 'Compensação em até 48 horas úteis' },
                { value: 'crypto', label: 'Criptomoedas (USDT / BTC)', helperText: 'Desabilitado temporariamente para manutenção', disabled: true },
              ]}
            />

            {/* Resumo do Pedido Visual */}
            <div
              style={{
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: docTheme === 'dark' ? '#1B1E20' : '#F8FAFC',
                border: docTheme === 'dark' ? '1px solid #3D4448' : '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', color: docTheme === 'dark' ? '#E2E8F0' : '#1E293B', fontWeight: 600 }}>
                  Resumo do Método Escolhido
                </h5>
                <p style={{ margin: 0, fontSize: '13px', color: docTheme === 'dark' ? '#94A3B8' : '#64748B' }}>
                  Opção ativa:{' '}
                  <strong style={{ color: '#006BFF' }}>
                    {docDemoValue === 'pix' && 'PIX (5% OFF)'}
                    {docDemoValue === 'credit_card' && 'Cartão de Crédito'}
                    {docDemoValue === 'boleto' && 'Boleto Bancário'}
                  </strong>
                </p>
              </div>

              <div style={{ marginTop: '16px', fontSize: '12px', color: docTheme === 'dark' ? '#64748B' : '#94A3B8' }}>
                WCAG 2.1 AA Compliant: Contraste de texto superior a 4.5:1 e halo de foco com 3:1 mínimo contra o fundo.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TABELA COMPLETA DE PROPS DA API */}
      <section style={{ marginBottom: '44px' }}>
        <UnooriaDocSectionHeader
          title="9. Referência da API (Props API Reference)"
          description="Especificação completa dos contratos TypeScript para RadioButton e RadioGroup"
          barColor="#64748B"
        />

        {/* Props do RadioButton */}
        <h4 style={{ margin: '20px 0 12px 0', fontSize: '16px', color: '#1E293B', fontWeight: 600 }}>
          Props do Componente <code style={{ color: '#0066FF' }}>&lt;RadioButton /&gt;</code>
        </h4>
        <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Propriedade</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Padrão</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {radioButtonPropsData.map((prop) => (
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

        {/* Props do RadioGroup */}
        <h4 style={{ margin: '20px 0 12px 0', fontSize: '16px', color: '#1E293B', fontWeight: 600 }}>
          Props do Componente <code style={{ color: '#0066FF' }}>&lt;RadioGroup /&gt;</code>
        </h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Propriedade</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Padrão</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {radioGroupPropsData.map((prop) => (
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
// CONFIGURAÇÃO DO META (STORYBOOK)
// ============================================================================

const meta: Meta<typeof RadioButton> = {
  title: 'Plataforma Unooria/Componentes/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    boxSide: {
      control: 'select',
      options: ['left', 'right', 'none', 'Left side', 'Right side', 'No text'],
      description: 'Posição do controle de rádio em relação ao rótulo conforme Figma #25405:5873.',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Escala de tamanho do controle de rádio.',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Estado de seleção (Modo Controlado).',
    },
    label: {
      control: 'text',
      description: 'Rótulo textual principal.',
    },
    helperText: {
      control: 'text',
      description: 'Texto secundário explicativo ou de apoio.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o botão de rádio e bloqueia interações.',
    },
    error: {
      control: 'text',
      description: 'Estado ou mensagem de erro de validação.',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Tema cromático (Light ou Dark).',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'focus', 'disabled'],
      description: 'Força estado visual estático para homologação.',
    },
  },
  args: {
    boxSide: 'left',
    label: 'Opção do RadioButton',
    helperText: 'Texto auxiliar descritivo da opção selecionável',
    size: 'md',
    disabled: false,
    theme: 'light',
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

// ============================================================================
// 1ª HISTÓRIA: DOCUMENTAÇÃO COMPLETA (MANDATÓRIA)
// ============================================================================

/**
 * Documentação rica e completa do componente RadioButton e RadioGroup baseada nas especificações do Figma #25405:5873.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <RadioButtonDocumentationPage />,
};

// ============================================================================
// 2ª HISTÓRIA: PLAYGROUND INTERATIVO
// ============================================================================

/**
 * Playground interativo com controles configuráveis (incluindo boxSide) e suporte aos modos Light e Dark.
 */
export const Playground: Story = {
  name: '🎮 Playground Interativo',
  render: (args) => {
    const isDark = args.theme === 'dark';
    return (
      <div
        style={{
          padding: '32px',
          borderRadius: '12px',
          backgroundColor: isDark ? '#22272A' : '#F8FAFC',
          border: isDark ? '1px solid #3D4448' : '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
        }}
      >
        <RadioButton {...args} />
      </div>
    );
  },
};

// ============================================================================
// 3ª HISTÓRIA: TODOS OS ESTADOS
// ============================================================================

/**
 * Matriz visual completa de todos os estados: Default (Unchecked), Hover, Selected, Disabled e com Erro.
 */
export const TodosEstados: Story = {
  name: '🔬 Todos os Estados',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '820px' }}>
        {/* Light Mode States */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
            ☀️ Estados no Tema Claro (Light Mode)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>1. Default (Padrão)</span>
              <RadioButton checked={false} onChange={() => {}} label="Desmarcado Padrão" />
              <RadioButton checked={true} onChange={() => {}} label="Marcado Padrão" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>2. Hover (Halo Azul 4px)</span>
              <RadioButton checked={false} isHovered onChange={() => {}} label="Hover Desmarcado" />
              <RadioButton checked={true} isHovered onChange={() => {}} label="Hover Marcado" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>3. Focus (Anel Acessível 3px)</span>
              <RadioButton checked={false} isFocused onChange={() => {}} label="Focus Desmarcado" />
              <RadioButton checked={true} isFocused onChange={() => {}} label="Focus Marcado" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>4. Active (Pressionado)</span>
              <RadioButton checked={false} isActive onChange={() => {}} label="Active Desmarcado" />
              <RadioButton checked={true} isActive onChange={() => {}} label="Active Marcado" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>5. Disabled (Desabilitado)</span>
              <RadioButton checked={false} disabled onChange={() => {}} label="Desabilitado Desmarcado" />
              <RadioButton checked={true} disabled onChange={() => {}} label="Desabilitado Marcado" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#DC2626' }}>6. Erro de Validação</span>
              <RadioButton checked={false} error="Campo obrigatório" onChange={() => {}} label="Erro Desmarcado" />
              <RadioButton checked={true} error="Opção indisponível" onChange={() => {}} label="Erro Marcado" />
            </div>
          </div>
        </div>

        {/* Dark Mode States */}
        <div style={{ padding: '24px', backgroundColor: '#22272A', borderRadius: '12px', border: '1px solid #3D4448' }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#F8FAFC', fontWeight: 600 }}>
            🌙 Estados no Tema Escuro (Dark Mode)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>Default Dark</span>
              <RadioButton theme="dark" checked={false} onChange={() => {}} label="Desmarcado Dark" />
              <RadioButton theme="dark" checked={true} onChange={() => {}} label="Marcado Dark" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>Hover Dark</span>
              <RadioButton theme="dark" checked={false} isHovered onChange={() => {}} label="Hover Dark" />
              <RadioButton theme="dark" checked={true} isHovered onChange={() => {}} label="Hover Dark Marcado" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>Focus Dark</span>
              <RadioButton theme="dark" checked={false} isFocused onChange={() => {}} label="Focus Dark" />
              <RadioButton theme="dark" checked={true} isFocused onChange={() => {}} label="Focus Dark Marcado" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>Disabled Dark</span>
              <RadioButton theme="dark" checked={false} disabled onChange={() => {}} label="Disabled Dark" />
              <RadioButton theme="dark" checked={true} disabled onChange={() => {}} label="Disabled Dark Marcado" />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ============================================================================
// 4ª HISTÓRIA: POSIÇÕES DO BOX (BOXSIDE)
// ============================================================================

/**
 * Comparação lado a lado das 3 opções de posicionamento do boxSide: `Left side`, `Right side` e `No text`.
 */
export const PosicoesDoBox: Story = {
  name: '📐 Posições do Box (boxSide)',
  render: () => {
    const [leftVal, setLeftVal] = useState<string>('opt1');
    const [rightVal, setRightVal] = useState<string>('opt1');
    const [noTextVal, setNoTextVal] = useState<string>('opt1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '780px' }}>
        {/* 1. Left side */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ margin: 0, fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              1. Left side (`boxSide=&quot;left&quot;` • Padrão Figma)
            </h4>
            <span style={{ fontSize: '12px', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '4px' }}>
              Controle à esquerda, rótulo à direita
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <RadioButton
              boxSide="left"
              name="box-left-demo"
              label="Opção com Box Side Left"
              helperText="Disposição padrão mais utilizada em formulários e cadastros"
              checked={leftVal === 'opt1'}
              onChange={() => setLeftVal('opt1')}
            />
            <RadioButton
              boxSide="left"
              name="box-left-demo"
              label="Segunda Opção com Box Side Left"
              helperText="Texto informativo de apoio alinhado perfeitamente"
              checked={leftVal === 'opt2'}
              onChange={() => setLeftVal('opt2')}
            />
          </div>
        </div>

        {/* 2. Right side */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ margin: 0, fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              2. Right side (`boxSide=&quot;right&quot;`)
            </h4>
            <span style={{ fontSize: '12px', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '4px' }}>
              Rótulo à esquerda, controle à direita
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 16px' }}>
              <RadioButton
                boxSide="right"
                name="box-right-demo"
                label="Cartão com Seleção à Direita"
                helperText="Ideal para cartões de listagem, faturas e telas mobile"
                checked={rightVal === 'opt1'}
                onChange={() => setRightVal('opt1')}
              />
            </div>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 16px' }}>
              <RadioButton
                boxSide="right"
                name="box-right-demo"
                label="Segunda Opção com Seleção à Direita"
                helperText="Permite escaneamento rápido do texto com a ação no canto"
                checked={rightVal === 'opt2'}
                onChange={() => setRightVal('opt2')}
              />
            </div>
          </div>
        </div>

        {/* 3. No text */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ margin: 0, fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              3. No text (`boxSide=&quot;none&quot;`)
            </h4>
            <span style={{ fontSize: '12px', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '4px' }}>
              Apenas o controle de rádio isolado
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RadioButton
                boxSide="none"
                name="box-none-demo"
                ariaLabel="Opção A isolada"
                checked={noTextVal === 'opt1'}
                onChange={() => setNoTextVal('opt1')}
              />
              <span style={{ fontSize: '13px', color: '#475569' }}>Opção A</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RadioButton
                boxSide="none"
                name="box-none-demo"
                ariaLabel="Opção B isolada"
                checked={noTextVal === 'opt2'}
                onChange={() => setNoTextVal('opt2')}
              />
              <span style={{ fontSize: '13px', color: '#475569' }}>Opção B</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RadioButton
                boxSide="none"
                name="box-none-demo"
                ariaLabel="Opção C isolada"
                checked={noTextVal === 'opt3'}
                onChange={() => setNoTextVal('opt3')}
              />
              <span style={{ fontSize: '13px', color: '#475569' }}>Opção C</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ============================================================================
// 5ª HISTÓRIA: TODOS OS TAMANHOS
// ============================================================================

/**
 * Comparação lado a lado dos 3 tamanhos disponíveis: sm (16px), md (20px - padrão Figma ⭐) e lg (24px).
 */
export const TodosTamanhos: Story = {
  name: '📏 Todos os Tamanhos',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px' }}>
        {/* Tamanho SM */}
        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>Tamanho SM (16px • Compacto)</span>
            <span style={{ fontSize: '11px', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '4px' }}>Dot: 10px</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <RadioButton
              size="sm"
              name="size-sm-demo"
              defaultChecked
              label="Opção Compacta Selecionada"
              helperText="Ideal para tabelas de alta densidade e sidebars de filtros"
            />
            <RadioButton
              size="sm"
              name="size-sm-demo"
              label="Segunda Opção Compacta"
              helperText="Tipografia de 12px com line-height proporcional de 20px"
            />
          </div>
        </div>

        {/* Tamanho MD */}
        <div style={{ padding: '20px', backgroundColor: '#EFF6FF', borderRadius: '12px', border: '1px solid #BFDBFE' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E40AF' }}>Tamanho MD (20px • Padrão Figma #25405:5873 ⭐)</span>
            <span style={{ fontSize: '11px', color: '#1D4ED8', backgroundColor: '#DBEAFE', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Dot: 14px</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <RadioButton
              size="md"
              name="size-md-demo"
              defaultChecked
              label="Opção Padrão Selecionada"
              helperText="Tamanho canônico do Design System Unooria com ponto interno de 14px"
            />
            <RadioButton
              size="md"
              name="size-md-demo"
              label="Segunda Opção Padrão"
              helperText="Tipografia balanceada de 14px com espaçamento de 10px"
            />
          </div>
        </div>

        {/* Tamanho LG */}
        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>Tamanho LG (24px • Destaque / Touch Friendly)</span>
            <span style={{ fontSize: '11px', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '4px' }}>Dot: 16px</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <RadioButton
              size="lg"
              name="size-lg-demo"
              defaultChecked
              label="Opção Destaque Selecionada"
              helperText="Área de toque estendida excelente para tablets e formulários com foco em acessibilidade"
            />
            <RadioButton
              size="lg"
              name="size-lg-demo"
              label="Segunda Opção Destaque"
              helperText="Tipografia de 16px com line-height amplo de 26px"
            />
          </div>
        </div>
      </div>
    );
  },
};

// ============================================================================
// 6ª HISTÓRIA: GRUPO DE OPÇÕES (RADIOGROUP)
// ============================================================================

/**
 * Demonstração do componente RadioGroup com layouts Vertical e Horizontal, opções declarativas e compostas.
 */
export const GrupoDeOpcoes: Story = {
  name: '📑 Grupo de Opções (RadioGroup)',
  render: () => {
    const [billingCycle, setBillingCycle] = useState<string>('annual');
    const [communicationChannel, setCommunicationChannel] = useState<string>('email');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '720px' }}>
        {/* Grupo Vertical Declarativo */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
            1. RadioGroup Vertical com Lista Declarativa (`options`)
          </h4>
          <RadioGroup
            name="billing-cycle"
            label="Ciclo de Faturamento"
            helperText="Economize até 20% optando pelo plano anual antecipado"
            value={billingCycle}
            onChange={(val) => setBillingCycle(String(val))}
            direction="vertical"
            options={[
              {
                value: 'monthly',
                label: 'Cobrança Mensal',
                helperText: 'R$ 89,00 por usuário / mês (sem fidelidade)',
              },
              {
                value: 'annual',
                label: 'Cobrança Anual (Recomendado ⭐)',
                helperText: 'R$ 69,00 por usuário / mês (R$ 828,00 faturado anualmente)',
              },
              {
                value: 'enterprise',
                label: 'Contrato Customizado Enterprise',
                helperText: 'Para equipes com mais de 50 licenças e SLA dedicado',
              },
            ]}
          />
          <div style={{ marginTop: '16px', padding: '10px 14px', backgroundColor: '#F0F9FF', borderRadius: '8px', border: '1px solid #BAE6FD', fontSize: '13px', color: '#0369A1' }}>
            Valor selecionado no estado do formulário: <strong>{billingCycle}</strong>
          </div>
        </div>

        {/* Grupo Horizontal com Filhos Compostos */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
            2. RadioGroup Horizontal com Filhos Compostos (`&lt;RadioButton /&gt;`)
          </h4>
          <RadioGroup
            name="comm-channel"
            label="Canal Preferencial de Notificação"
            direction="horizontal"
            value={communicationChannel}
            onChange={(val) => setCommunicationChannel(String(val))}
            helperText="Defina por onde a Plataforma Unooria deve enviar seus alertas de sistema"
          >
            <RadioButton value="email" label="E-mail" helperText="Relatórios diários" />
            <RadioButton value="whatsapp" label="WhatsApp" helperText="Alertas críticos" />
            <RadioButton value="sms" label="SMS" helperText="Apenas segurança" />
          </RadioGroup>
        </div>
      </div>
    );
  },
};

// ============================================================================
// 7ª HISTÓRIA: SIMULADOR DE FORMULÁRIO (MUNDO REAL)
// ============================================================================

/**
 * Exemplo do mundo real de um checkout interativo com seleção de frete, método de pagamento, cálculo de descontos e validação.
 */
export const SimuladorFormulario: Story = {
  name: '🛒 Simulador de Formulário Real',
  render: () => {
    const [selectedPayment, setSelectedPayment] = useState<string>('pix');
    const [selectedShipping, setSelectedShipping] = useState<string>('express');
    const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    const basePrice = 299.9;
    const shippingCosts: Record<string, number> = {
      standard: 15.0,
      express: 32.0,
      sameday: 55.0,
    };

    const shippingPrice = shippingCosts[selectedShipping] || 0;
    const discount = selectedPayment === 'pix' ? basePrice * 0.05 : 0;
    const totalPrice = basePrice + shippingPrice - discount;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedPayment) {
        setHasError(true);
        return;
      }
      setHasError(false);
      setOrderSubmitted(true);
    };

    const handleReset = () => {
      setOrderSubmitted(false);
      setSelectedPayment('pix');
      setSelectedShipping('express');
      setHasError(false);
    };

    return (
      <div style={{ maxWidth: '840px', margin: '0 auto' }}>
        {orderSubmitted ? (
          <div
            style={{
              padding: '32px',
              borderRadius: '16px',
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{ color: '#16A34A' }}>
              <CheckCircleIcon />
            </div>
            <h3 style={{ margin: 0, fontSize: '20px', color: '#166534', fontWeight: 700 }}>
              Pedido Realizado com Sucesso!
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#15803D', maxWidth: '460px', lineHeight: '1.6' }}>
              Seu pedido foi registrado na Plataforma Unooria. O comprovante e código de rastreamento foram enviados para o seu e-mail cadastrado.
            </p>
            <div
              style={{
                padding: '16px 24px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #DCFCE7',
                fontSize: '13px',
                color: '#14532D',
                textAlign: 'left',
                width: '100%',
                maxWidth: '420px',
              }}
            >
              <div>• Forma de Pagamento: <strong>{selectedPayment.toUpperCase()}</strong></div>
              <div>• Frete: <strong>{selectedShipping === 'express' ? 'Sedex Express' : selectedShipping === 'sameday' ? 'Mesmo Dia' : 'PAC Econômico'}</strong></div>
              <div>• Total Final: <strong>R$ {totalPrice.toFixed(2).replace('.', ',')}</strong></div>
            </div>
            <button
              onClick={handleReset}
              style={{
                marginTop: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: '#16A34A',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Simular Outro Pedido
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '28px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#1E293B', fontWeight: 700 }}>
                Checkout de Assinatura • Plataforma Unooria
              </h3>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Selecione as modalidades desejadas abaixo para finalizar sua contratação
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {/* Coluna 1: Opções de Envio e Pagamento */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {/* Seleção de Envio */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <TruckIcon />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>
                      1. Modalidade de Envio do Kit Físico
                    </span>
                  </div>
                  <RadioGroup
                    name="checkout-shipping"
                    value={selectedShipping}
                    onChange={(val) => setSelectedShipping(String(val))}
                    options={[
                      { value: 'standard', label: 'Econômica (PAC)', helperText: '5 a 8 dias úteis • R$ 15,00' },
                      { value: 'express', label: 'Expressa (Sedex)', helperText: '1 a 2 dias úteis • R$ 32,00' },
                      { value: 'sameday', label: 'Mesmo Dia (Capital)', helperText: 'Até as 20h de hoje • R$ 55,00' },
                    ]}
                  />
                </div>

                {/* Seleção de Pagamento */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <CreditCardIcon />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>
                      2. Forma de Pagamento
                    </span>
                  </div>
                  <RadioGroup
                    name="checkout-payment"
                    value={selectedPayment}
                    onChange={(val) => {
                      setSelectedPayment(String(val));
                      setHasError(false);
                    }}
                    error={hasError ? 'Selecione uma forma de pagamento para continuar' : undefined}
                    options={[
                      { value: 'pix', label: 'PIX Instantâneo (5% de Desconto)', helperText: 'Aprovação e liberação imediata da conta' },
                      { value: 'credit_card', label: 'Cartão de Crédito', helperText: 'Em até 12x no cartão corporativo' },
                      { value: 'boleto', label: 'Boleto Bancário', helperText: 'Compensação bancária em até 48 horas úteis' },
                    ]}
                  />
                </div>
              </div>

              {/* Coluna 2: Card de Resumo Financeiro */}
              <div
                style={{
                  padding: '24px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1E293B', fontWeight: 700 }}>
                    Resumo Financeiro do Pedido
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#475569' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Plano Unooria Pro (Mensal):</span>
                      <strong style={{ color: '#1E293B' }}>R$ {basePrice.toFixed(2).replace('.', ',')}</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Frete Kit de Boas-Vindas:</span>
                      <strong style={{ color: '#1E293B' }}>R$ {shippingPrice.toFixed(2).replace('.', ',')}</strong>
                    </div>

                    {discount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A' }}>
                        <span>Desconto PIX (5%):</span>
                        <strong>- R$ {discount.toFixed(2).replace('.', ',')}</strong>
                      </div>
                    )}

                    <div style={{ borderTop: '2px dashed #E2E8F0', marginTop: '12px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '16px' }}>
                      <strong style={{ color: '#1E293B' }}>Total a Pagar:</strong>
                      <strong style={{ color: '#006BFF', fontSize: '18px' }}>
                        R$ {totalPrice.toFixed(2).replace('.', ',')}
                      </strong>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      backgroundColor: '#006BFF',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0, 107, 255, 0.2)',
                    }}
                  >
                    Confirmar e Finalizar Pedido
                  </button>
                  <span style={{ display: 'block', textAlign: 'center', fontSize: '11px', color: '#94A3B8', marginTop: '8px' }}>
                    Transação segura com criptografia TLS de 256 bits
                  </span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  },
};
