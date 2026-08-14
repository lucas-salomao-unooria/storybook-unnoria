import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberButton } from '../../../src/unooria/components/NumberButton/NumberButton';
import {
  NumberButtonProps,
  NumberButtonSize,
  NumberButtonTheme,
} from '../../../src/unooria/components/NumberButton/NumberButton.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../src/unooria/docs';

// ============================================================================
// Ícones utilitários inline para documentação e simuladores
// ============================================================================
const ShoppingCartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

const KeyboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M6 12h.001M10 12h.001M14 12h.001M18 12h.001M7 16h10" />
  </svg>
);

/**
 * Página de Documentação Rica do NumberButton (Stepper Numérico)
 * Padrão Ouro Unooria Design System
 */
const NumberButtonDocumentationPage = () => {
  const [interactiveTheme, setInteractiveTheme] = useState<NumberButtonTheme>('light');
  const [demoValuePad, setDemoValuePad] = useState<number>(7);
  const [demoValueMoney, setDemoValueMoney] = useState<number>(150);
  const [demoValueWeight, setDemoValueWeight] = useState<number>(2.5);

  const sizesInfo: { size: NumberButtonSize; label: string; height: string; button: string; typography: string; desc: string }[] = [
    {
      size: 'lg',
      label: 'Large (LG)',
      height: '48px',
      button: '44x44px',
      typography: 'Title-L Bold (20px / 30px / 700)',
      desc: 'Destaque visual para touch screens, PDVs, fluxos prioritários de checkout e telas de autosserviço.',
    },
    {
      size: 'md',
      label: 'Medium (MD) • Padrão',
      height: '40px',
      button: '36x36px',
      typography: 'Body-M Bold (18px / 28px / 700)',
      desc: 'Tamanho padrão do Design System Unooria para modais, carrinhos, filtros e formulários principais.',
    },
    {
      size: 'sm',
      label: 'Small (SM)',
      height: '32px',
      button: '28x28px',
      typography: 'Body-S Bold (16px / 24px / 700)',
      desc: 'Ideal para tabelas operacionais densas, gavetas laterais de edição e listas compactas.',
    },
    {
      size: 'xs',
      label: 'Extra Small (XS)',
      height: '28px',
      button: '24x24px',
      typography: 'Body-XS Bold (14px / 20px / 700)',
      desc: 'Densidade extrema de dados, sublinhas de tabela e controles integrados a linhas de grade.',
    },
  ];

  const propsTableData = [
    {
      name: 'value',
      type: 'number',
      default: 'undefined',
      desc: 'Valor numérico em modo controlado.',
    },
    {
      name: 'defaultValue',
      type: 'number',
      default: '0',
      desc: 'Valor numérico inicial em modo não controlado.',
    },
    {
      name: 'min',
      type: 'number',
      default: '-Infinity',
      desc: 'Valor mínimo permitido. Ao atingir este limite, o botão de decremento (-) é desabilitado.',
    },
    {
      name: 'max',
      type: 'number',
      default: 'Infinity',
      desc: 'Valor máximo permitido. Ao atingir este limite, o botão de incremento (+) é desabilitado.',
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      desc: 'Passo de incremento e decremento ao acionar os botões ou setas do teclado.',
    },
    {
      name: 'onChange',
      type: '(value: number) => void',
      default: 'undefined',
      desc: 'Callback disparado sempre que o valor numérico é alterado com sucesso.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg'",
      default: "'md'",
      desc: 'Escala dimensional e tipográfica: xs (28px), sm (32px), md (40px) ou lg (48px).',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Tema visual de cores para superfícies claras ou escuras.',
    },
    {
      name: 'disabled / isDisabled',
      type: 'boolean',
      default: 'false',
      desc: 'Desabilita todas as interações, reduz a opacidade para 0.55 e aplica cursor not-allowed.',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      default: 'false',
      desc: 'Mantém o valor legível, mas desativa os botões e impede edição direta.',
    },
    {
      name: 'formatValue',
      type: '(value: number) => string | number',
      default: 'undefined',
      desc: 'Função de formatação para exibição personalizada (ex: zeros à esquerda, moeda, unidades).',
    },
    {
      name: 'parseValue',
      type: '(text: string) => number',
      default: 'undefined',
      desc: 'Função customizada para converter o texto digitado pelo usuário em número.',
    },
    {
      name: 'allowInput',
      type: 'boolean',
      default: 'true',
      desc: 'Permite edição direta no campo numérico via teclado.',
    },
    {
      name: 'prefix',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Elemento ou texto exibido antes do valor central (ex: "R$", "v.", ícone).',
    },
    {
      name: 'suffix',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Elemento ou texto exibido após o valor central (ex: "kg", "itens", "%").',
    },
    {
      name: 'precision',
      type: 'number',
      default: 'auto',
      desc: 'Quantidade de casas decimais fixas para arredondamento (calculado automaticamente com base no step).',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Controle de valor numérico'",
      desc: 'Rótulo de acessibilidade para o input central (spinbutton).',
    },
    {
      name: 'ariaLabelDecrement',
      type: 'string',
      default: "'Diminuir valor'",
      desc: 'Rótulo de acessibilidade do botão de decremento (-).',
    },
    {
      name: 'ariaLabelIncrement',
      type: 'string',
      default: "'Aumentar valor'",
      desc: 'Rótulo de acessibilidade do botão de incremento (+).',
    },
    {
      name: 'state',
      type: "'default' | 'hover' | 'active' | 'focus' | 'disabled'",
      default: "'default'",
      desc: 'Força um estado visual específico para documentação e testes visuais no Storybook.',
    },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Controles de Entrada"
        title="NumberButton"
        description="O NumberButton (Stepper Numérico) é um controle de precisão projetado para ajuste numérico rápido e seguro via botões de incremento (+) e decremento (-), digitação direta com máscara, suporte a zeros à esquerda ('000'), limites estritos min/max e conformidade integral com WAI-ARIA SpinButton. Especificação fiel ao nó #14662:399 do Figma."
      />

      {/* 1. Visão Geral & Casos de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Casos de Uso"
          description="Diretrizes de usabilidade e cenários ideais de aplicação no ecossistema Unooria"
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
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛒</div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              Carrinhos de Compras & Checkout
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Controle de quantidades de itens em estoque, compras e faturamento com limites estritos de mínimo e máximo.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚙️</div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              Parâmetros & Configurações
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Ajuste fino de limites operacionais, paginação de relatórios, timers, thresholds de alerta e cotas de usuários.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              Valores Monetários & Frações
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Incrementos financeiros em Reais (R$), taxas percentuais (%), dosagens e frações de peso com prefixos e sufixos.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔢</div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              Formatação com Zeros à Esquerda
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Exibição padronizada de códigos de lote, sequenciais e numerações de guichê em formato '001', '002', '010'.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Figma & Especificações */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="2. Figma & Especificações Técnicas"
          description="Vínculo com o arquivo oficial do Figma e tokens de design aplicados"
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
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              paddingBottom: '16px',
              borderBottom: '1px solid #F1F5F9',
              marginBottom: '20px',
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#EEF2FF',
                  color: '#4F46E5',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                Figma Unooria_DS_v0.2
              </span>
              <h4 style={{ margin: 0, fontSize: '16px', color: '#0F172A' }}>
                Nós Oficiais: <code>#14662:399</code> e <code>#14662:31020</code>
              </h4>
            </div>

            <a
              href="https://www.figma.com/design/i0HRQSBtQQ9ZXDYiJPRnGv/Unooria_DS_v0.2?node-id=14662-399&m=dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                backgroundColor: '#0066FF',
                color: '#FFFFFF',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'background-color 0.2s ease',
              }}
            >
              <span>Abrir no Figma Dev Mode</span>
              <ExternalLinkIcon />
            </a>
          </div>

          {/* Grid de Tokens & Especificações */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Cores Light</div>
              <div style={{ marginTop: '8px', fontSize: '13px', color: '#1E293B', lineHeight: '1.6' }}>
                <div><strong>Texto:</strong> #383E41 (Neutral 900)</div>
                <div><strong>Borda:</strong> #CBD4D6 (Neutral 200)</div>
                <div><strong>Fundo Ação Hover:</strong> rgba(127, 165, 226, 0.10)</div>
                <div><strong>Foco Anel:</strong> #7FA5E2 (BrandNavy 600)</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#1E293B', color: '#E2E8F0', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>Cores Dark</div>
              <div style={{ marginTop: '8px', fontSize: '13px', color: '#F1F5F9', lineHeight: '1.6' }}>
                <div><strong>Texto:</strong> #E4E8E9 (Neutral 150)</div>
                <div><strong>Borda:</strong> #475157 (NeutralDark 300)</div>
                <div><strong>Fundo Ação Hover:</strong> rgba(127, 165, 226, 0.15)</div>
                <div><strong>Foco Anel:</strong> #8FAFE5 (BrandNavy 500)</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Geometria & Raio</div>
              <div style={{ marginTop: '8px', fontSize: '13px', color: '#1E293B', lineHeight: '1.6' }}>
                <div><strong>Contêiner:</strong> Border-radius 8px</div>
                <div><strong>Botões LG/MD:</strong> Border-radius 6px</div>
                <div><strong>Botões SM/XS:</strong> Border-radius 4px</div>
                <div><strong>Espessura de Borda:</strong> 1px sólida</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Anatomia do Componente e Escala Tipográfica */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="3. Anatomia do Componente & Escala Tipográfica"
          description="Dissecção dos elementos constituintes e comparação das 4 escalas de tamanho"
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
          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            Anatomia dos Elementos:
          </h4>

          {/* Diagrama Visual de Anatomia */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 16px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px dashed #CBD5E1',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#0066FF', fontWeight: 600, marginBottom: '4px' }}>① Botão (-)</div>
                <div style={{ width: '40px', height: '40px', border: '2px solid #0066FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', color: '#0066FF' }}>−</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#8B5CF6', fontWeight: 600, marginBottom: '4px' }}>② Prefixo (Opt)</div>
                <div style={{ height: '40px', padding: '0 10px', border: '2px solid #8B5CF6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', color: '#8B5CF6' }}>R$</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600, marginBottom: '4px' }}>③ Display / Input</div>
                <div style={{ height: '40px', minWidth: '70px', padding: '0 16px', border: '2px solid #10B981', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', color: '#10B981' }}>007</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 600, marginBottom: '4px' }}>④ Sufixo (Opt)</div>
                <div style={{ height: '40px', padding: '0 10px', border: '2px solid #F59E0B', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', color: '#F59E0B' }}>kg</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#0066FF', fontWeight: 600, marginBottom: '4px' }}>⑤ Botão (+)</div>
                <div style={{ width: '40px', height: '40px', border: '2px solid #0066FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', color: '#0066FF' }}>+</div>
              </div>
            </div>
          </div>

          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            Escala Tipográfica & Dimensões Oficiais:
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {sizesInfo.map((item) => (
              <div
                key={item.size}
                style={{
                  padding: '18px',
                  borderRadius: '10px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>{item.label}</span>
                  <code style={{ fontSize: '11px', padding: '2px 6px', backgroundColor: '#E2E8F0', borderRadius: '4px' }}>
                    size=&quot;{item.size}&quot;
                  </code>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
                  <NumberButton size={item.size} defaultValue={10} />
                </div>

                <div style={{ fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
                  <div><strong>Altura:</strong> {item.height} | <strong>Ação:</strong> {item.button}</div>
                  <div><strong>Fonte:</strong> {item.typography}</div>
                </div>

                <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: '1.4' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Matriz de Tamanhos e Estados */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="4. Matriz de Tamanhos & Estados Interativos"
          description="Comportamento visual em todos os estados de interação do sistema"
          barColor="#F59E0B"
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
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                  <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Estado</th>
                  <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Pré-visualização Interativa</th>
                  <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição & Feedback</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px', fontWeight: 600, color: '#1E293B' }}>
                    <div>Default</div>
                    <code style={{ fontSize: '11px', color: '#64748B' }}>state=&quot;default&quot;</code>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <NumberButton defaultValue={5} />
                  </td>
                  <td style={{ padding: '16px', color: '#475569', fontSize: '13px' }}>
                    Estado neutro de repouso com borda neutra e fundo de ação transparente.
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px', fontWeight: 600, color: '#1E293B' }}>
                    <div>Hover</div>
                    <code style={{ fontSize: '11px', color: '#64748B' }}>isHovered=true</code>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <NumberButton defaultValue={5} state="hover" isHovered />
                  </td>
                  <td style={{ padding: '16px', color: '#475569', fontSize: '13px' }}>
                    Fundo de ação sutil (<code style={{ fontSize: '12px' }}>rgba(127, 165, 226, 0.10)</code>) ao passar o cursor sobre os botões.
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px', fontWeight: 600, color: '#1E293B' }}>
                    <div>Active (Pressed)</div>
                    <code style={{ fontSize: '11px', color: '#64748B' }}>state=&quot;active&quot;</code>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <NumberButton defaultValue={5} state="active" isActive />
                  </td>
                  <td style={{ padding: '16px', color: '#475569', fontSize: '13px' }}>
                    Feedback tátil imediato com fundo mais pronunciado (<code style={{ fontSize: '12px' }}>rgba(127, 165, 226, 0.20)</code>).
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px', fontWeight: 600, color: '#1E293B' }}>
                    <div>Focus / Focused</div>
                    <code style={{ fontSize: '11px', color: '#64748B' }}>state=&quot;focus&quot;</code>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <NumberButton defaultValue={5} state="focus" isFocused />
                  </td>
                  <td style={{ padding: '16px', color: '#475569', fontSize: '13px' }}>
                    Anel de foco na cor Brand Navy (<code style={{ fontSize: '12px' }}>#7FA5E2</code>) com sombra difusa de 2px.
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px', fontWeight: 600, color: '#1E293B' }}>
                    <div>Disabled</div>
                    <code style={{ fontSize: '11px', color: '#64748B' }}>disabled=true</code>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <NumberButton defaultValue={5} disabled />
                  </td>
                  <td style={{ padding: '16px', color: '#475569', fontSize: '13px' }}>
                    Opacidade reduzida (0.55), bloqueio total de eventos de clique e digitação, cursor <code style={{ fontSize: '12px' }}>not-allowed</code>.
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: '16px', fontWeight: 600, color: '#1E293B' }}>
                    <div>ReadOnly</div>
                    <code style={{ fontSize: '11px', color: '#64748B' }}>readOnly=true</code>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <NumberButton defaultValue={42} readOnly />
                  </td>
                  <td style={{ padding: '16px', color: '#475569', fontSize: '13px' }}>
                    Valor legível com nitidez total, botões de ação inativos e edição de texto desativada.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Formatação e Máscaras Personalizadas */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="5. Formatação & Máscaras Personalizadas"
          description="Zeros à esquerda ('000'), valores monetários, unidades de medida e limites min/max"
          barColor="#EC4899"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '16px',
          }}
        >
          {/* Pad 3 Dígitos */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
                🔢 Zeros à Esquerda ('000')
              </h4>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Lote / Guichê</span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
              Ideal para códigos sequenciais, numerações de guichê e lotes de produção com tamanho uniforme.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
              <NumberButton
                min={1}
                max={999}
                value={demoValuePad}
                onChange={setDemoValuePad}
                formatValue={(v) => String(v).padStart(3, '0')}
              />
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Valor real: <strong>{demoValuePad}</strong>
              </span>
            </div>
            <pre style={{ margin: 0, padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px', fontSize: '11px', color: '#334155' }}>
              <code>{'formatValue={(v) => String(v).padStart(3, "0")}'}</code>
            </pre>
          </div>

          {/* Moeda R$ */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
                💵 Moeda com Prefixo
              </h4>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Financeiro</span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
              Exibição com prefixo monetário &quot;R$&quot; e passo de R$ 50,00 para ajustes de orçamento.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
              <NumberButton
                prefix="R$"
                step={50}
                min={0}
                max={10000}
                value={demoValueMoney}
                onChange={setDemoValueMoney}
                formatValue={(v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              />
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Total: <strong>R$ {demoValueMoney.toFixed(2)}</strong>
              </span>
            </div>
            <pre style={{ margin: 0, padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px', fontSize: '11px', color: '#334155' }}>
              <code>{'prefix="R$" step={50} min={0}'}</code>
            </pre>
          </div>

          {/* Unidade métrica (kg) */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
                ⚖️ Unidade de Medida (Sufixo)
              </h4>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Logística</span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
              Ajuste de peso fracionado de 0,5 em 0,5 kg com precisão decimal automática.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
              <NumberButton
                suffix="kg"
                step={0.5}
                min={0.5}
                max={50}
                value={demoValueWeight}
                onChange={setDemoValueWeight}
              />
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Peso: <strong>{demoValueWeight} kg</strong>
              </span>
            </div>
            <pre style={{ margin: 0, padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '6px', fontSize: '11px', color: '#334155' }}>
              <code>{'suffix="kg" step={0.5} min={0.5}'}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* 6. Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="6. Boas Práticas (Do's & Don'ts)" barColor="#EF4444" />
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
              <li>Defina sempre limites <code style={{ fontSize: '12px' }}>min</code> e <code style={{ fontSize: '12px' }}>max</code> para prevenir valores negativos ou absurdos no banco de dados.</li>
              <li>Utilize o tamanho <code style={{ fontSize: '12px' }}>md</code> como padrão e reserve <code style={{ fontSize: '12px' }}>sm</code> ou <code style={{ fontSize: '12px' }}>xs</code> para tabelas densas.</li>
              <li>Ajuste o <code style={{ fontSize: '12px' }}>step</code> proporcionalmente à magnitude do dado (ex: step 10 em orçamentos, step 0.1 em frações).</li>
              <li>Adicione <code style={{ fontSize: '12px' }}>prefix</code> ou <code style={{ fontSize: '12px' }}>suffix</code> sempre que a unidade de medida precisar ficar explícita.</li>
              <li>Forneça rótulos de acessibilidade claros via <code style={{ fontSize: '12px' }}>ariaLabel</code>, <code style={{ fontSize: '12px' }}>ariaLabelIncrement</code> e <code style={{ fontSize: '12px' }}>ariaLabelDecrement</code>.</li>
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
              <li>Não utilize o NumberButton para entrada de textos livres ou senhas alfanuméricas.</li>
              <li>Não utilize para números imensos sem step configurado (ex: digitação de CPF ou CEP - use MaskedInput).</li>
              <li>Não omita os limites de estoque em carrinhos de compras (evitando seleções maiores do que o estoque disponível).</li>
              <li>Não force o tamanho <code style={{ fontSize: '12px' }}>lg</code> dentro de células compactas de tabela de dados.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Suporte a Temas e Acessibilidade (WCAG 2.1 AA) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="7. Suporte a Temas & Acessibilidade (WCAG 2.1 AA)"
          description="Navegação por teclado completa e conformidade com temas Claro e Escuro"
          barColor="#06B6D4"
        />

        {/* Atalhos de Teclado */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <KeyboardIcon />
            <h4 style={{ margin: 0, fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              Navegação e Atalhos de Teclado (WAI-ARIA SpinButton)
            </h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>↑ Seta para Cima</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Incrementa 1x o valor de step</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>↓ Seta para Baixo</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Decrementa 1x o valor de step</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>Page Up / Page Down</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Ajusta rapidamente em saltos de 10x step</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>Home / End</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Define imediatamente o valor min / max</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>Enter / Escape</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Confirma a digitação ou restaura o valor anterior</div>
            </div>
          </div>
        </div>

        {/* Simulador Interativo com Toggle de Tema */}
        <div
          style={{
            padding: '24px',
            borderRadius: '12px',
            backgroundColor: interactiveTheme === 'dark' ? '#1E293B' : '#FFFFFF',
            border: `1px solid ${interactiveTheme === 'dark' ? '#334155' : '#E2E8F0'}`,
            transition: 'background-color 0.2s ease, border-color 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '15px', color: interactiveTheme === 'dark' ? '#F8FAFC' : '#1E293B' }}>
              Simulador de Tema Interativo:
            </h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setInteractiveTheme('light')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: interactiveTheme === 'light' ? '#0066FF' : '#FFFFFF',
                  color: interactiveTheme === 'light' ? '#FFFFFF' : '#334155',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                ☀️ Light Mode
              </button>
              <button
                type="button"
                onClick={() => setInteractiveTheme('dark')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: '1px solid #475569',
                  backgroundColor: interactiveTheme === 'dark' ? '#0066FF' : '#334155',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                🌙 Dark Mode
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <NumberButton theme={interactiveTheme} size="lg" defaultValue={25} />
            <NumberButton theme={interactiveTheme} size="md" defaultValue={10} />
            <NumberButton theme={interactiveTheme} size="sm" defaultValue={3} />
            <NumberButton theme={interactiveTheme} size="xs" defaultValue={1} />
          </div>
        </div>
      </section>

      {/* 8. Tabela Completa de Props da API */}
      <section>
        <UnooriaDocSectionHeader title="8. Referência Completa das Propriedades (Props API)" barColor="#64748B" />
        <div style={{ overflowX: 'auto', marginTop: '16px' }}>
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
              {propsTableData.map((prop) => (
                <tr key={prop.name} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0066FF', fontFamily: 'monospace' }}>
                    {prop.name}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#475569', fontSize: '13px' }}>
                    {prop.type}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#64748B', fontSize: '13px' }}>
                    {prop.default}
                  </td>
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
// Configuração do Meta do Storybook
// ============================================================================
const meta: Meta<typeof NumberButton> = {
  title: 'Plataforma Unooria/Componentes/NumberButton',
  component: NumberButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'O NumberButton é um stepper numérico de alta precisão com suporte a botões de incremento/decremento, máscara, acessibilidade WAI-ARIA, 4 tamanhos e 2 temas.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'number',
      description: 'Valor numérico controlado.',
    },
    defaultValue: {
      control: 'number',
      description: 'Valor numérico inicial em modo não controlado.',
      table: { defaultValue: { summary: '0' } },
    },
    min: {
      control: 'number',
      description: 'Valor mínimo permitido.',
      table: { defaultValue: { summary: '-Infinity' } },
    },
    max: {
      control: 'number',
      description: 'Valor máximo permitido.',
      table: { defaultValue: { summary: 'Infinity' } },
    },
    step: {
      control: 'number',
      description: 'Passo de incremento/decremento.',
      table: { defaultValue: { summary: '1' } },
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Escala tipográfica e de altura do componente.',
      table: { defaultValue: { summary: 'md' } },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Tema visual de cores.',
      table: { defaultValue: { summary: 'light' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o componente e reduz a opacidade.',
      table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Desativa os botões mantendo o valor visível sem esmaecer.',
      table: { defaultValue: { summary: 'false' } },
    },
    allowInput: {
      control: 'boolean',
      description: 'Permite edição direta no campo central via teclado.',
      table: { defaultValue: { summary: 'true' } },
    },
    prefix: {
      control: 'text',
      description: 'Texto ou elemento exibido antes do número.',
    },
    suffix: {
      control: 'text',
      description: 'Texto ou elemento exibido depois do número.',
    },
    precision: {
      control: 'number',
      description: 'Número de casas decimais para arredondamento.',
    },
  },
  args: {
    defaultValue: 5,
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    theme: 'light',
    disabled: false,
    readOnly: false,
    allowInput: true,
  },
};

export default meta;
type Story = StoryObj<typeof NumberButton>;

// ============================================================================
// 1ª História Obrigatória: Documentação Completa
// ============================================================================
/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <NumberButtonDocumentationPage />,
};

// ============================================================================
// 2ª História: Playground Interativo
// ============================================================================
/**
 * Playground interativo com controles abrangentes e fundo adaptativo ao tema.
 */
export const Playground: Story = {
  render: (args: NumberButtonProps) => (
    <div
      style={{
        padding: '36px',
        borderRadius: '12px',
        backgroundColor: args.theme === 'dark' ? '#1E293B' : '#F8FAFC',
        border: `1px solid ${args.theme === 'dark' ? '#334155' : '#E2E8F0'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '160px',
      }}
    >
      <NumberButton {...args} />
    </div>
  ),
  args: {
    defaultValue: 10,
    min: 0,
    max: 50,
    step: 1,
    size: 'md',
    theme: 'light',
  },
};

// ============================================================================
// 3ª História: Todos os Tamanhos (LG, MD, SM, XS)
// ============================================================================
/**
 * Comparação lado a lado dos 4 tamanhos suportados (LG, MD, SM, XS) nos temas Claro e Escuro.
 */
export const TodosTamanhos: Story = {
  name: '📐 Todos os Tamanhos',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Tema Claro */}
      <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1E293B' }}>☀️ Tema Claro (Light):</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>LG (48px - Title-L Bold 20px)</span>
            <NumberButton size="lg" defaultValue={20} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>MD (40px - Body-M Bold 18px • Padrão)</span>
            <NumberButton size="md" defaultValue={15} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>SM (32px - Body-S Bold 16px)</span>
            <NumberButton size="sm" defaultValue={10} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>XS (28px - Body-XS Bold 14px)</span>
            <NumberButton size="xs" defaultValue={5} />
          </div>
        </div>
      </div>

      {/* Tema Escuro */}
      <div style={{ padding: '24px', backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid #334155' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#F1F5F9' }}>🌙 Tema Escuro (Dark):</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>LG (48px)</span>
            <NumberButton theme="dark" size="lg" defaultValue={20} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>MD (40px)</span>
            <NumberButton theme="dark" size="md" defaultValue={15} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>SM (32px)</span>
            <NumberButton theme="dark" size="sm" defaultValue={10} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>XS (28px)</span>
            <NumberButton theme="dark" size="xs" defaultValue={5} />
          </div>
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// 4ª História: Todos os Estados
// ============================================================================
/**
 * Matriz visual com todos os estados funcionais e visuais suportados.
 */
export const TodosEstados: Story = {
  name: '⚡ Todos os Estados',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
      }}
    >
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>Default (Padrão)</h5>
        <NumberButton defaultValue={10} />
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>Hover (Fundo Ação Sutil)</h5>
        <NumberButton defaultValue={10} state="hover" isHovered />
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>Active (Pressionado)</h5>
        <NumberButton defaultValue={10} state="active" isActive />
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>Focus (Anel Brand Navy)</h5>
        <NumberButton defaultValue={10} state="focus" isFocused />
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>Disabled (Desabilitado)</h5>
        <NumberButton defaultValue={10} disabled />
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>ReadOnly (Somente Leitura)</h5>
        <NumberButton defaultValue={42} readOnly />
      </div>
    </div>
  ),
};

// ============================================================================
// 5ª História: Formatos Personalizados
// ============================================================================
/**
 * Casos avançados com formatação customizada (zeros à esquerda, moeda, unidades, decimais).
 */
export const FormatosPersonalizados: Story = {
  name: '🎨 Formatos Personalizados',
  render: () => {
    const CustomFormatsDemo = () => {
      const [padVal, setPadVal] = useState(3);
      const [moneyVal, setMoneyVal] = useState(250);
      const [percentVal, setPercentVal] = useState(15);
      const [weightVal, setWeightVal] = useState(1.25);

      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Pad 3 dígitos */}
          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>Zeros à Esquerda ('000')</h5>
            <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#64748B' }}>Formatação de código de lote ou guichê (001 a 999)</p>
            <NumberButton
              min={1}
              max={999}
              value={padVal}
              onChange={setPadVal}
              formatValue={(v) => String(v).padStart(3, '0')}
            />
          </div>

          {/* Moeda R$ */}
          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>Valor Monetário (R$)</h5>
            <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#64748B' }}>Ajuste orçamentário com step de 50</p>
            <NumberButton
              prefix="R$"
              step={50}
              min={0}
              max={5000}
              value={moneyVal}
              onChange={setMoneyVal}
              formatValue={(v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            />
          </div>

          {/* Porcentagem */}
          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>Taxa Percentual (%)</h5>
            <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#64748B' }}>Desconto ou alíquota de 0% a 100%</p>
            <NumberButton
              suffix="%"
              step={5}
              min={0}
              max={100}
              value={percentVal}
              onChange={setPercentVal}
            />
          </div>

          {/* Peso Decimal */}
          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>Frações de Peso (kg)</h5>
            <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#64748B' }}>Precisão de 2 casas decimais e step de 0.25</p>
            <NumberButton
              suffix="kg"
              step={0.25}
              precision={2}
              min={0.25}
              max={20}
              value={weightVal}
              onChange={setWeightVal}
            />
          </div>
        </div>
      );
    };

    return <CustomFormatsDemo />;
  },
};

// ============================================================================
// 6ª História: Simulador de Carrinho de Compras Interativo
// ============================================================================
/**
 * Exemplo interativo de aplicação real em um carrinho de compras com cálculo dinâmico de subtotais e frete.
 */
export const SimuladorContador: Story = {
  name: '🛒 Simulador Carrinho de Compras',
  render: () => {
    const ShoppingCartSimulator = () => {
      const [items, setItems] = useState([
        { id: 1, name: 'Unooria UI Pro Kit - Licença Enterprise', unitPrice: 299.0, quantity: 2, maxStock: 10 },
        { id: 2, name: 'Módulo de Analytics Avançado', unitPrice: 149.5, quantity: 1, maxStock: 5 },
        { id: 3, name: 'Suporte Técnico Premium 24/7 (Meses)', unitPrice: 89.9, quantity: 3, maxStock: 12 },
      ]);

      const handleQuantityChange = (id: number, nextQty: number) => {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, quantity: nextQty } : item))
        );
      };

      const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
      const discount = subtotal > 800 ? subtotal * 0.1 : 0;
      const total = subtotal - discount;

      return (
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
            overflow: 'hidden',
          }}
        >
          {/* Header do Carrinho */}
          <div
            style={{
              padding: '20px 24px',
              backgroundColor: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingCartIcon />
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#0F172A' }}>
                Resumo do Pedido • Checkout Unooria
              </h3>
            </div>
            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
              {items.reduce((acc, item) => acc + item.quantity, 0)} itens selecionados
            </span>
          </div>

          {/* Lista de Itens */}
          <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: '1 1 200px' }}>
                  <h5 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>
                    {item.name}
                  </h5>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>
                    Unitário: <strong>R$ {item.unitPrice.toFixed(2)}</strong> • Limite em estoque: {item.maxStock}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <NumberButton
                    size="sm"
                    min={0}
                    max={item.maxStock}
                    value={item.quantity}
                    onChange={(val) => handleQuantityChange(item.id, val)}
                  />
                  <div style={{ minWidth: '90px', textAlign: 'right', fontWeight: 700, fontSize: '15px', color: '#0F172A' }}>
                    R$ {(item.unitPrice * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo Financeiro */}
          <div
            style={{
              padding: '20px 24px',
              backgroundColor: '#F8FAFC',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#475569' }}>
              <span>Subtotal dos Itens:</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#10B981', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircleIcon /> Desconto Especial (&gt; R$ 800):
                </span>
                <span>- R$ {discount.toFixed(2)} (10%)</span>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '18px',
                fontWeight: 700,
                color: '#0F172A',
                paddingTop: '10px',
                borderTop: '1px dashed #CBD5E1',
              }}
            >
              <span>Total do Pedido:</span>
              <span style={{ color: '#0066FF' }}>R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      );
    };

    return <ShoppingCartSimulator />;
  },
};
