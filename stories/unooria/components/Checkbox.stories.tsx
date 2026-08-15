import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from '../../../src/unooria/components/Checkbox/Checkbox';
import {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxSize,
  CheckboxTheme,
  CheckboxOption,
} from '../../../src/unooria/components/Checkbox/Checkbox.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

/* ==========================================================================
   Ícones Utilitários SVG Inline (Zero Dependências Externas)
   ========================================================================== */
const FigmaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 38 57" fill="none" aria-hidden="true">
    <path
      d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
      fill="#1ABCFE"
    />
    <path
      d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
      fill="#0ACF83"
    />
    <path
      d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
      fill="#FF7262"
    />
    <path
      d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
      fill="#F24E1E"
    />
    <path
      d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
      fill="#A259FF"
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ==========================================================================
   Página de Documentação Rica do Checkbox (Padrão Ouro Unooria)
   ========================================================================== */
const CheckboxDocumentationPage: React.FC = () => {
  // Estado para o simulador interativo de "Selecionar Todos"
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(['read', 'comment']);
  const allPermissions = ['read', 'write', 'delete', 'comment'];

  const isAllSelected = selectedPermissions.length === allPermissions.length;
  const isIndeterminate = selectedPermissions.length > 0 && selectedPermissions.length < allPermissions.length;

  const handleSelectAllToggle = (checked: boolean) => {
    if (checked) {
      setSelectedPermissions([...allPermissions]);
    } else {
      setSelectedPermissions([]);
    }
  };

  const handlePermissionChange = (perm: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions((prev) => [...prev, perm]);
    } else {
      setSelectedPermissions((prev) => prev.filter((p) => p !== perm));
    }
  };

  // Tabela de propriedades de Checkbox
  const checkboxPropsData = [
    {
      name: 'checked',
      type: 'boolean',
      default: 'undefined',
      desc: 'Define o estado de marcação no Modo Controlado.',
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      default: 'false',
      desc: 'Estado inicial de marcação no Modo Não-Controlado.',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      desc: 'Habilita o terceiro estado (misto/parcial), renderizando uma barra horizontal e definindo aria-checked="mixed".',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      desc: 'Tamanho dimensional da caixa de seleção e texto (sm: 16px, md: 20px - Padrão Figma #25405:5873, lg: 24px).',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Alterna a paleta de cores para superfícies em Modo Claro ou Modo Escuro.',
    },
    {
      name: 'label',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Rótulo textual ou elemento descritivo posicionado ao lado da caixa de seleção.',
    },
    {
      name: 'labelPosition',
      type: "'right' | 'left'",
      default: "'right'",
      desc: 'Define se o rótulo textual fica posicionado à direita ou à esquerda do checkbox.',
    },
    {
      name: 'helperText',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Texto de suporte explicativo ou mensagem instrucional exibida abaixo do rótulo.',
    },
    {
      name: 'error',
      type: 'boolean | string',
      default: 'false',
      desc: 'Indica estado inválido (borda vermelha de erro) e opcionalmente renderiza a mensagem textual de validação.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Desabilita o checkbox, bloqueando cliques e aplicando opacidade de 0.65.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      desc: 'Adiciona indicador visual de obrigatoriedade (*) e atributo HTML nativo required.',
    },
    {
      name: 'value',
      type: 'string',
      default: 'undefined',
      desc: 'Valor identificador da opção quando utilizado individualmente ou com CheckboxGroup.',
    },
    {
      name: 'name',
      type: 'string',
      default: 'undefined',
      desc: 'Nome do campo de formulário HTML submetido.',
    },
    {
      name: 'onChange',
      type: '(checked: boolean, event: ChangeEvent) => void',
      default: 'undefined',
      desc: 'Callback acionado a cada alteração de estado com o novo valor booleano.',
    },
    {
      name: 'inputRef',
      type: 'React.Ref<HTMLInputElement>',
      default: 'undefined',
      desc: 'Referência direta para o elemento <input type="checkbox"> nativo.',
    },
  ];

  // Tabela de propriedades de CheckboxGroup
  const checkboxGroupPropsData = [
    {
      name: 'label',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Título principal do grupo de opções renderizado dentro de uma tag semântica <legend>.',
    },
    {
      name: 'helperText',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Texto descritivo de instrução complementar para o grupo inteiro.',
    },
    {
      name: 'error',
      type: 'boolean | string',
      default: 'false',
      desc: 'Aplica estado de erro ao grupo e renderiza mensagem textual de validação compartilhada.',
    },
    {
      name: 'direction',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      desc: 'Orientação de layout das opções dentro do grupo.',
    },
    {
      name: 'options',
      type: 'CheckboxOption[]',
      default: 'undefined',
      desc: 'Lista declarativa de objetos de opção com label, value, helperText e disabled individual.',
    },
    {
      name: 'value',
      type: 'string[]',
      default: 'undefined',
      desc: 'Array com os valores dos itens marcados no Modo Controlado.',
    },
    {
      name: 'defaultValue',
      type: 'string[]',
      default: '[]',
      desc: 'Valores inicialmente marcados no Modo Não-Controlado.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      desc: 'Propaga o tamanho padrão para todos os checkboxes filhos pertencentes ao grupo.',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Propaga o tema Claro ou Escuro para todos os checkboxes filhos.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Desabilita coletivamente todos os checkboxes pertencentes ao grupo.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      desc: 'Adiciona indicador de campo obrigatório (*) ao lado do legend do grupo.',
    },
    {
      name: 'onChange',
      type: '(value: string[]) => void',
      default: 'undefined',
      desc: 'Callback acionado quando qualquer seleção do grupo for modificada, retornando a lista de strings ativas.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Permite compor checkboxes filhos customizados manualmente dentro do grupo.',
    },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Formulários & Seleção"
        title="Checkbox"
        description="O Checkbox é o componente de controle binário e seleção múltipla fundamental do Design System Unooria. Construído em estrita conformidade com as especificações oficiais do Figma (nó #25405:5873), suporta estados selecionado, não-selecionado e indeterminado (misto), raio de borda de até 8px, validações de erro, agrupamento coeso via CheckboxGroup e acessibilidade WCAG 2.1 AA."
      />

      {/* 1. Visão Geral & Casos de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Casos de Uso"
          description="Quando e por que utilizar checkboxes no design de interfaces da Plataforma Unooria"
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
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              ☑️ Seleção Múltipla Independente
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Permite que o usuário selecione zero, uma ou múltiplas opções de uma lista, onde cada escolha é completamente independente das demais (ex: filtros, permissões, preferências de notificação).
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              📝 Aceite & Confirmação Explícita
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Ideal para obter consentimentos legais explícitos, como &quot;Concordo com os Termos de Uso&quot; ou &quot;Declaro que li a Política de Privacidade&quot; antes da submissão do formulário.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              ➖ Terceiro Estado Indeterminado
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Representa seleções parciais em hierarquias pai-filho (ex: quando um grupo de 5 itens possui apenas 2 marcados, o checkbox mestre exibe um traço horizontal com <code style={{ fontSize: '12px' }}>aria-checked=&quot;mixed&quot;</code>).
            </p>
          </div>
        </div>
      </section>

      {/* 2. Figma & Especificações Técnicas */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="2. Especificações do Figma & Tokens de Design"
          description="Rastreabilidade oficial e parâmetros visuais extraídos do Design System Unooria"
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
          {/* Card com Link Oficial do Figma */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FigmaIcon />
              <div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', display: 'block' }}>
                  Figma Component Node: Checkbox & CheckboxGroup
                </span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  Node ID: <code style={{ color: '#0066FF', fontWeight: 600 }}>25405:5873</code> • Arquivo: Design-System-Unooria
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
                gap: '6px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#FFFFFF',
                backgroundColor: '#0066FF',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
              }}
            >
              <span>Abrir no Figma Dev Mode</span>
              <ExternalLinkIcon />
            </a>
          </div>

          {/* Tabela de Tokens e Especificações Visuais */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                  <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>Propriedade Visual</th>
                  <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>sm (Small)</th>
                  <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>md (Medium - Figma Padrão)</th>
                  <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>lg (Large)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#334155' }}>Dimensões da Caixa</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>16px × 16px</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#0066FF', fontWeight: 600 }}>20px × 20px</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>24px × 24px</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#334155' }}>Raio de Borda (Border Radius)</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>4px</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#0066FF', fontWeight: 600 }}>6px</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>8px</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#334155' }}>Tamanho do Ícone SVG</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>10px</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#0066FF', fontWeight: 600 }}>12px</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>14px</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#334155' }}>Tamanho da Fonte do Rótulo</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>13px (0.8125rem)</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#0066FF', fontWeight: 600 }}>14px (0.875rem)</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>16px (1.0rem)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#334155' }}>Borda Padrão (Default)</td>
                  <td colSpan={3} style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#617379' }}>
                    --unooria-color-neutral-200 (#CBD4D6)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#334155' }}>Preenchimento Selecionado</td>
                  <td colSpan={3} style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#6487C2', fontWeight: 600 }}>
                    --unooria-color-brandnavy-700 (#6487C2) • Hover: #49699F
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#334155' }}>Hover de Borda & Fundo</td>
                  <td colSpan={3} style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#7FA5E2' }}>
                    Borda: --unooria-color-brandnavy-600 (#7FA5E2) • Fundo: rgba(127, 165, 226, 0.05)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#334155' }}>Anel de Foco (Focus Ring)</td>
                  <td colSpan={3} style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#7FA5E2' }}>
                    3px var(--unooria-color-opacity-brandnavy-300, rgba(127, 165, 226, 0.35))
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#334155' }}>Token de Erro / Validação</td>
                  <td colSpan={3} style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#E31A1A' }}>
                    --unooria-color-danger-600 (#E31A1A) • Error Ring: 3px rgba(227, 26, 26, 0.25)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Anatomia do Componente */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="3. Anatomia do Componente"
          description="Dissecação estrutural dos elementos constituintes do Checkbox"
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              marginBottom: '24px',
            }}
          >
            <Checkbox
              size="lg"
              defaultChecked
              required
              label="Notificações em tempo real"
              helperText="Receba alertas instantâneos via push e e-mail corporativo"
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
              fontSize: '13px',
            }}
          >
            <div style={{ padding: '14px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}>
              <strong style={{ color: '#0066FF', display: 'block', marginBottom: '4px' }}>1. Caixa de Controle (Control Box):</strong>
              Contêiner visual com borda de 1.5px e cantos arredondados (raio de até 8px).
            </div>
            <div style={{ padding: '14px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}>
              <strong style={{ color: '#0066FF', display: 'block', marginBottom: '4px' }}>2. Ícone Indicador (SVG):</strong>
              Ícone nítido de check ou traço horizontal (indeterminado) com animação suave de escala.
            </div>
            <div style={{ padding: '14px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}>
              <strong style={{ color: '#0066FF', display: 'block', marginBottom: '4px' }}>3. Rótulo Textual (Label):</strong>
              Texto clicável alinhado perfeitamente com a caixa e com suporte a indicador obrigatório (*).
            </div>
            <div style={{ padding: '14px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}>
              <strong style={{ color: '#0066FF', display: 'block', marginBottom: '4px' }}>4. Texto de Suporte / Erro:</strong>
              Instrução complementar ou mensagem de validação contextual com cores semânticas.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Matriz de Estados & Tamanhos */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="4. Matriz de Estados e Escala de Tamanhos"
          description="Todos os estados visuais em cada um dos 3 tamanhos dimensionais suportados"
          barColor="#8B5CF6"
        />

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '24px',
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Tamanho Médio (md - Figma Padrão) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>
                Tamanho Médio • 20px (Tamanho Padrão Figma #25405:5873)
              </span>
              <span style={{ fontSize: '11px', backgroundColor: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                size=&quot;md&quot; (Padrão)
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
              }}
            >
              <Checkbox size="md" label="Não selecionado" />
              <Checkbox size="md" label="Selecionado" defaultChecked />
              <Checkbox size="md" label="Indeterminado" indeterminate />
              <Checkbox size="md" label="Desabilitado" disabled />
              <Checkbox size="md" label="Desabilitado (Marcado)" disabled defaultChecked />
              <Checkbox size="md" label="Com Erro" error="Campo obrigatório" />
            </div>
          </div>

          {/* Tamanho Pequeno (sm) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>
                Tamanho Pequeno • 16px (Tabelas e Painéis Densos)
              </span>
              <span style={{ fontSize: '11px', backgroundColor: '#F1F5F9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                size=&quot;sm&quot;
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
              }}
            >
              <Checkbox size="sm" label="Não selecionado" />
              <Checkbox size="sm" label="Selecionado" defaultChecked />
              <Checkbox size="sm" label="Indeterminado" indeterminate />
              <Checkbox size="sm" label="Desabilitado" disabled />
              <Checkbox size="sm" label="Com Erro" error="Inválido" />
            </div>
          </div>

          {/* Tamanho Grande (lg) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>
                Tamanho Grande • 24px (Mobile, Banners e Destaques)
              </span>
              <span style={{ fontSize: '11px', backgroundColor: '#F1F5F9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                size=&quot;lg&quot;
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
              }}
            >
              <Checkbox size="lg" label="Não selecionado" />
              <Checkbox size="lg" label="Selecionado" defaultChecked />
              <Checkbox size="lg" label="Indeterminado" indeterminate />
              <Checkbox size="lg" label="Desabilitado" disabled />
              <Checkbox size="lg" label="Com Erro" error="Seleção necessária" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Agrupamento com CheckboxGroup */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="5. Agrupamento com CheckboxGroup"
          description="Gerenciamento automático de estado múltiplo, orientação e acessibilidade"
          barColor="#0284C7"
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Grupo Vertical */}
            <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '12px' }}>
                DISPOSIÇÃO VERTICAL (`direction=&quot;vertical&quot;`)
              </span>
              <CheckboxGroup
                label="Canais de Notificação"
                helperText="Selecione por onde você deseja receber novidades e relatórios"
                defaultValue={['email', 'whatsapp']}
                options={[
                  { label: 'E-mail Comercial', value: 'email', helperText: 'Relatórios diários e faturamento' },
                  { label: 'WhatsApp Institucional', value: 'whatsapp', helperText: 'Alertas críticos em tempo real' },
                  { label: 'Notificações Push no Navegador', value: 'push', helperText: 'Alertas breves em segundo plano' },
                  { label: 'SMS de Segurança (2FA)', value: 'sms', disabled: true, helperText: 'Gerenciado pelo módulo de autenticação' },
                ]}
              />
            </div>

            {/* Grupo Horizontal */}
            <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '12px' }}>
                DISPOSIÇÃO HORIZONTAL (`direction=&quot;horizontal&quot;`)
              </span>
              <CheckboxGroup
                label="Dias Disponíveis para Atendimento"
                direction="horizontal"
                defaultValue={['seg', 'qua', 'sex']}
                options={[
                  { label: 'Seg', value: 'seg' },
                  { label: 'Ter', value: 'ter' },
                  { label: 'Qua', value: 'qua' },
                  { label: 'Qui', value: 'qui' },
                  { label: 'Sex', value: 'sex' },
                ]}
              />
              <div style={{ marginTop: '24px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '12px' }}>
                  GRUPO COM ESTADO DE ERRO
                </span>
                <CheckboxGroup
                  label="Termos e Consentimentos Obrigatórios"
                  required
                  error="Você deve aceitar ao menos os Termos de Uso e Política de Privacidade"
                  defaultValue={['marketing']}
                  options={[
                    { label: 'Li e concordo com os Termos de Serviço', value: 'terms' },
                    { label: 'Aceito a Política de Privacidade e Cookies', value: 'privacy' },
                    { label: 'Desejo receber novidades por e-mail', value: 'marketing' },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Simulador de Seleção Indeterminada */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="6. Padrão Interativo: Selecionar Todos (Indeterminado)"
          description="Exemplo funcional do comportamento pai-filho com cálculo dinâmico de estado"
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
          <div
            style={{
              padding: '20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              maxWidth: '480px',
            }}
          >
            {/* Checkbox Pai Mestre */}
            <div style={{ paddingBottom: '12px', borderBottom: '1px solid #E2E8F0', marginBottom: '12px' }}>
              <Checkbox
                label={
                  <strong style={{ color: '#0F172A' }}>
                    {isAllSelected ? 'Desmarcar todas as permissões' : 'Selecionar todas as permissões'}
                  </strong>
                }
                helperText={`${selectedPermissions.length} de ${allPermissions.length} permissões concedidas`}
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onChange={handleSelectAllToggle}
              />
            </div>

            {/* Checkboxes Filhos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '24px' }}>
              <Checkbox
                label="Visualizar registros e relatórios (Read)"
                value="read"
                checked={selectedPermissions.includes('read')}
                onChange={(checked) => handlePermissionChange('read', checked)}
              />
              <Checkbox
                label="Adicionar e editar dados (Write)"
                value="write"
                checked={selectedPermissions.includes('write')}
                onChange={(checked) => handlePermissionChange('write', checked)}
              />
              <Checkbox
                label="Excluir registros permanentemente (Delete)"
                value="delete"
                checked={selectedPermissions.includes('delete')}
                onChange={(checked) => handlePermissionChange('delete', checked)}
              />
              <Checkbox
                label="Adicionar comentários e observações (Comment)"
                value="comment"
                checked={selectedPermissions.includes('comment')}
                onChange={(checked) => handlePermissionChange('comment', checked)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Diretrizes de Design & Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="7. Diretrizes de Design & Boas Práticas" barColor="#EF4444" />
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
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#15803D', lineHeight: '1.7' }}>
              <li>Utilize rótulos afirmativos, claros e que façam sentido quando marcados (ex: &quot;Receber atualizações semanais&quot;).</li>
              <li>Permita que o usuário clique tanto na caixa quanto no rótulo de texto para alternar a marcação.</li>
              <li>Agrupe checkboxes relacionados utilizando o componente <code style={{ fontSize: '12px' }}>CheckboxGroup</code> para garantir acessibilidade semântica com <code style={{ fontSize: '12px' }}>fieldset</code> e <code style={{ fontSize: '12px' }}>legend</code>.</li>
              <li>Utilize o estado indeterminado (<code style={{ fontSize: '12px' }}>indeterminate</code>) quando houver seleção mista em listas hierárquicas.</li>
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
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#B91C1C', lineHeight: '1.7' }}>
              <li>Não utilize checkboxes para escolhas mutuamente exclusivas onde apenas uma opção pode ser selecionada (use <code style={{ fontSize: '12px' }}>RadioGroup</code>).</li>
              <li>Não utilize checkboxes para ações instantâneas que ativam/desativam serviços imediatamente sem botão de salvar (use <code style={{ fontSize: '12px' }}>Switch / Toggle</code>).</li>
              <li>Não redija textos em formato negativo dúbio (ex: &quot;Não desejo cancelar minha inscrição&quot;).</li>
              <li>Não esconda a caixa de seleção visual sem fornecer substituto acessível.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Suporte a Temas (Light e Dark) & Acessibilidade */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="8. Suporte a Temas (Light & Dark) & Acessibilidade WCAG 2.1 AA"
          description="Contraste de cores validado e comportamento acessível para leitores de tela"
          barColor="#06B6D4"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginTop: '16px',
            marginBottom: '20px',
          }}
        >
          {/* Light Mode */}
          <div
            style={{
              padding: '24px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '18px' }}>☀️</span>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#0F172A' }}>
                Modo Claro (Light Mode)
              </h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Checkbox theme="light" label="Item não marcado" />
              <Checkbox theme="light" label="Item marcado com sucesso" defaultChecked />
              <Checkbox theme="light" label="Seleção parcial mista" indeterminate />
              <Checkbox theme="light" label="Opção desabilitada" disabled defaultChecked />
              <Checkbox theme="light" label="Validação com erro" error="Seleção obrigatória" />
            </div>
          </div>

          {/* Dark Mode */}
          <div
            style={{
              padding: '24px',
              borderRadius: '12px',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '18px' }}>🌙</span>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#F8FAFC' }}>
                Modo Escuro (Dark Mode)
              </h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Checkbox theme="dark" label="Item não marcado" />
              <Checkbox theme="dark" label="Item marcado com sucesso" defaultChecked />
              <Checkbox theme="dark" label="Seleção parcial mista" indeterminate />
              <Checkbox theme="dark" label="Opção desabilitada" disabled defaultChecked />
              <Checkbox theme="dark" label="Validação com erro" error="Seleção obrigatória" />
            </div>
          </div>
        </div>

        {/* Diretrizes de Acessibilidade */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
            ♿ Recursos Nativos de Acessibilidade
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#475569', lineHeight: '1.7' }}>
            <li>
              <strong>Input Nativo Real:</strong> Mantém um <code style={{ fontSize: '12px' }}>&lt;input type=&quot;checkbox&quot;&gt;</code> acessível com classe screen-reader-only, garantindo total compatibilidade com tecnologias assistivas (NVDA, JAWS, VoiceOver).
            </li>
            <li>
              <strong>Suporte ao Estado Misto:</strong> Quando <code style={{ fontSize: '12px' }}>indeterminate=true</code>, o componente atualiza dinamicamente a propriedade <code style={{ fontSize: '12px' }}>indeterminate</code> do input nativo e o atributo <code style={{ fontSize: '12px' }}>aria-checked=&quot;mixed&quot;</code>.
            </li>
            <li>
              <strong>Foco Visível:</strong> Anel de foco nítido com espessura de 3px e cor da marca ao navegar por teclado (<kbd style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '1px 5px', borderRadius: '4px' }}>Tab</kbd> e <kbd style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '1px 5px', borderRadius: '4px' }}>Espaço</kbd>).
            </li>
            <li>
              <strong>Associação Semântica de Erros:</strong> Vincula mensagens de validação e textos auxiliares através de <code style={{ fontSize: '12px' }}>aria-describedby</code> e <code style={{ fontSize: '12px' }}>aria-invalid</code>.
            </li>
          </ul>
        </div>
      </section>

      {/* 9. Tabela de Props da API */}
      <section>
        <UnooriaDocSectionHeader
          title="9. Referência Completa da API (Props)"
          description="Tipagem TypeScript completa para Checkbox e CheckboxGroup"
          barColor="#64748B"
        />

        {/* Checkbox Props */}
        <h4 style={{ margin: '20px 0 12px 0', fontSize: '16px', fontWeight: 600, color: '#0F172A' }}>
          Propriedades do Checkbox (`CheckboxProps`)
        </h4>
        <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
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
              {checkboxPropsData.map((prop) => (
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

        {/* CheckboxGroup Props */}
        <h4 style={{ margin: '20px 0 12px 0', fontSize: '16px', fontWeight: 600, color: '#0F172A' }}>
          Propriedades do CheckboxGroup (`CheckboxGroupProps`)
        </h4>
        <div style={{ overflowX: 'auto' }}>
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
              {checkboxGroupPropsData.map((prop) => (
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

/* ==========================================================================
   Configuração do Objeto Meta (Storybook)
   ========================================================================== */
const meta: Meta<typeof Checkbox> = {
  title: 'Plataforma Unooria/Componentes/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Dimensão do Checkbox e escala tipográfica associada.',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Tema visual de cores (Claro ou Escuro).',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    label: {
      control: 'text',
      description: 'Rótulo textual exibido ao lado do checkbox.',
    },
    helperText: {
      control: 'text',
      description: 'Texto de suporte descritivo exibido abaixo do rótulo.',
    },
    checked: {
      control: 'boolean',
      description: 'Estado de marcação no modo controlado.',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Estado inicial de marcação.',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Estado intermediário/misto representado por traço horizontal.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o componente bloqueando interações.',
    },
    required: {
      control: 'boolean',
      description: 'Sinaliza campo obrigatório com asterisco vermelho.',
    },
    error: {
      control: 'text',
      description: 'Exibe estado de erro e mensagem de validação.',
    },
    labelPosition: {
      control: 'radio',
      options: ['right', 'left'],
      description: 'Posição do rótulo textual em relação à caixa.',
      table: {
        defaultValue: { summary: 'right' },
      },
    },
  },
  args: {
    label: 'Concordo com os termos e condições',
    helperText: 'Você pode alterar suas preferências a qualquer momento no perfil',
    size: 'md',
    theme: 'light',
    defaultChecked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    labelPosition: 'right',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/* ==========================================================================
   1ª Estória Obrigatória: Documentação Completa Rica
   ========================================================================== */
/**
 * Documentação rica e completa do Checkbox baseada nas especificações oficiais do Figma (#25405:5873).
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CheckboxDocumentationPage />,
};

/* ==========================================================================
   2ª Estória: Playground Interativo
   ========================================================================== */
export const Playground: Story = {
  name: '🎮 Playground Interativo',
  render: (args) => {
    const isDark = args.theme === 'dark';
    return (
      <div
        style={{
          padding: '32px',
          borderRadius: '12px',
          backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
          border: `1px solid ${isDark ? '#334155' : '#E2E8F0'}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '160px',
        }}
      >
        <Checkbox {...args} />
      </div>
    );
  },
};

/* ==========================================================================
   3ª Estória: Todos os Estados
   ========================================================================== */
export const TodosEstados: Story = {
  name: '✨ Todos os Estados',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>
          Estados no Modo Claro (Light Mode)
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Checkbox label="Estado Padrão (Não Selecionado)" />
          <Checkbox label="Estado Selecionado (Checked)" defaultChecked />
          <Checkbox label="Estado Indeterminado (Misto / Parcial)" indeterminate />
          <Checkbox label="Estado Desabilitado (Unchecked)" disabled />
          <Checkbox label="Estado Desabilitado (Checked)" disabled defaultChecked />
          <Checkbox label="Estado Desabilitado (Indeterminate)" disabled indeterminate />
          <Checkbox
            label="Estado com Erro de Validação"
            error="É obrigatório concordar para prosseguir com o cadastro"
          />
        </div>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid #334155' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#F8FAFC' }}>
          Estados no Modo Escuro (Dark Mode)
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Checkbox theme="dark" label="Estado Padrão (Não Selecionado)" />
          <Checkbox theme="dark" label="Estado Selecionado (Checked)" defaultChecked />
          <Checkbox theme="dark" label="Estado Indeterminado (Misto / Parcial)" indeterminate />
          <Checkbox theme="dark" label="Estado Desabilitado" disabled defaultChecked />
          <Checkbox
            theme="dark"
            label="Estado com Erro de Validação"
            error="É obrigatório concordar para prosseguir com o cadastro"
          />
        </div>
      </div>
    </div>
  ),
};

/* ==========================================================================
   4ª Estória: Todos os Tamanhos
   ========================================================================== */
export const TodosTamanhos: Story = {
  name: '📏 Todos os Tamanhos',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '650px',
        padding: '24px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <strong style={{ fontSize: '14px', color: '#0F172A' }}>Small (`size=&quot;sm&quot;` - 16px)</strong>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Caixa: 16px | Texto: 13px | Raio: 4px</span>
        </div>
        <Checkbox
          size="sm"
          label="Compacto para tabelas de alta densidade e modais enxutos"
          helperText="Texto auxiliar compacto em 11px"
          defaultChecked
        />
      </div>

      <div style={{ paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <strong style={{ fontSize: '14px', color: '#0066FF' }}>Medium (`size=&quot;md&quot;` - 20px - Padrão Figma)</strong>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Caixa: 20px | Texto: 14px | Raio: 6px</span>
        </div>
        <Checkbox
          size="md"
          label="Tamanho padrão recomendado para a maioria dos formulários"
          helperText="Texto auxiliar equilibrado em 12px"
          defaultChecked
        />
      </div>

      <div style={{ paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <strong style={{ fontSize: '14px', color: '#0F172A' }}>Large (`size=&quot;lg&quot;` - 24px)</strong>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Caixa: 24px | Texto: 16px | Raio: 8px</span>
        </div>
        <Checkbox
          size="lg"
          label="Amplo para telas touch, destaques e cards de seleção"
          helperText="Texto auxiliar ampliado em 13px"
          defaultChecked
        />
      </div>
    </div>
  ),
};

/* ==========================================================================
   5ª Estória: Grupo de Opções (CheckboxGroup)
   ========================================================================== */
export const GrupoDeOpcoes: Story = {
  name: '🗂️ Grupo de Opções (CheckboxGroup)',
  render: () => {
    const [selectedVertical, setSelectedVertical] = useState<string[]>(['react', 'typescript']);
    const [selectedHorizontal, setSelectedHorizontal] = useState<string[]>(['seg', 'qua']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '680px' }}>
        {/* Grupo Vertical */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <CheckboxGroup
            label="Competências e Tecnologias da Equipe"
            helperText="Selecione todas as habilidades dominadas pelo squad"
            value={selectedVertical}
            onChange={setSelectedVertical}
            options={[
              { label: 'React / Next.js', value: 'react', helperText: 'Desenvolvimento de interfaces modernas e SSR' },
              { label: 'TypeScript', value: 'typescript', helperText: 'Tipagem estática e segurança em tempo de compilação' },
              { label: 'Storybook & Design Systems', value: 'storybook', helperText: 'Documentação viva e catálogo de componentes' },
              { label: 'GraphQL API', value: 'graphql', helperText: 'Consultas declarativas e integração eficiente' },
              { label: 'WebAssembly (Legado)', value: 'wasm', disabled: true, helperText: 'Módulo descontinuado' },
            ]}
          />
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', fontSize: '13px', color: '#475569' }}>
            <strong>Itens selecionados:</strong> {selectedVertical.length > 0 ? selectedVertical.join(', ') : 'Nenhum item selecionado'}
          </div>
        </div>

        {/* Grupo Horizontal */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <CheckboxGroup
            label="Disponibilidade Semanal de Plantão"
            direction="horizontal"
            value={selectedHorizontal}
            onChange={setSelectedHorizontal}
            options={[
              { label: 'Segunda', value: 'seg' },
              { label: 'Terça', value: 'ter' },
              { label: 'Quarta', value: 'qua' },
              { label: 'Quinta', value: 'qui' },
              { label: 'Sexta', value: 'sex' },
            ]}
          />
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', fontSize: '13px', color: '#475569' }}>
            <strong>Dias selecionados:</strong> {selectedHorizontal.length > 0 ? selectedHorizontal.join(', ') : 'Nenhum'}
          </div>
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   6ª Estória: Exemplo Interativo de Seleção Indeterminada
   ========================================================================== */
export const ExemploIndeterminado: Story = {
  name: '⚡ Exemplo Indeterminado (Selecionar Todos)',
  render: () => {
    const modules: { id: string; name: string; desc: string }[] = [
      { id: 'dashboard', name: 'Módulo de Dashboard e Métricas', desc: 'Acesso a relatórios de faturamento e gráficos' },
      { id: 'users', name: 'Gestão de Usuários e Perfis', desc: 'Criação, edição e exclusão de contas' },
      { id: 'billing', name: 'Faturamento e Assinaturas', desc: 'Emissão de notas fiscais e gateways de pagamento' },
      { id: 'audit', name: 'Logs de Auditoria e Segurança', desc: 'Rastreabilidade de ações executadas no sistema' },
    ];

    const [selectedIds, setSelectedIds] = useState<string[]>(['dashboard', 'users']);

    const allChecked = selectedIds.length === modules.length;
    const isIndeterminate = selectedIds.length > 0 && selectedIds.length < modules.length;

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        setSelectedIds(modules.map((m) => m.id));
      } else {
        setSelectedIds([]);
      }
    };

    const handleItemToggle = (id: string, checked: boolean) => {
      if (checked) {
        setSelectedIds((prev) => [...prev, id]);
      } else {
        setSelectedIds((prev) => prev.filter((item) => item !== id));
      }
    };

    return (
      <div
        style={{
          maxWidth: '560px',
          padding: '24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
        }}
      >
        <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: '#0F172A' }}>
          Configuração de Permissões de Acesso
        </h4>
        <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#64748B' }}>
          Demonstração funcional do padrão &quot;Selecionar Todos&quot; com estado indeterminado nativo.
        </p>

        {/* Checkbox Pai Mestre */}
        <div
          style={{
            padding: '14px 16px',
            backgroundColor: '#F8FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            marginBottom: '16px',
          }}
        >
          <Checkbox
            label={<strong>{allChecked ? 'Desmarcar todos os módulos' : 'Selecionar todos os módulos'}</strong>}
            helperText={`${selectedIds.length} de ${modules.length} módulos habilitados`}
            checked={allChecked}
            indeterminate={isIndeterminate}
            onChange={handleSelectAll}
          />
        </div>

        {/* Checkboxes Filhos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '16px' }}>
          {modules.map((mod) => (
            <Checkbox
              key={mod.id}
              label={mod.name}
              helperText={mod.desc}
              checked={selectedIds.includes(mod.id)}
              onChange={(checked) => handleItemToggle(mod.id, checked)}
            />
          ))}
        </div>
      </div>
    );
  },
};
