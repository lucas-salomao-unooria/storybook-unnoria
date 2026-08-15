import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../../src/unooria/components/Badge/Badge';
import { BadgeProps, BadgeVariant, BadgeSize } from '../../../src/unooria/components/Badge/Badge.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

// Ícones utilitários inline para independência e demonstração de casos de uso
const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const UserAvatar = ({ initials = 'US', bg = '#6487C2' }: { initials?: string; bg?: string }) => (
  <div
    style={{
      width: 44,
      height: 44,
      borderRadius: '50%',
      backgroundColor: bg,
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 16,
      position: 'relative',
    }}
  >
    {initials}
  </div>
);

/**
 * Página de Documentação Rica do Badge baseada no Padrão Ouro do Design System Unooria
 */
const BadgeDocumentationPage = () => {
  const figmaVariants: { variant: BadgeVariant; label: string; color: string; desc: string }[] = [
    { variant: 'error', label: 'Error', color: '#E31A1A', desc: 'Notificações críticas, mensagens não lidas urgentes, erros ou contagens em aberto.' },
    { variant: 'warning', label: 'Warning', color: '#DD5202', desc: 'Alertas moderados, itens sob revisão ou estados de atenção.' },
    { variant: 'info', label: 'Info', color: '#006BFF', desc: 'Novidades, badges informativos gerais e versões de sistema.' },
    { variant: 'success', label: 'Success (Sucess)', color: '#008257', desc: 'Status ativo/online, tarefas concluídas e confirmações.' },
    { variant: 'disable', label: 'Disable', color: 'rgba(34, 39, 42, 0.3)', desc: 'Itens inativos, rascunhos, canais desabilitados ou offline.' },
  ];

  const propsTableData = [
    {
      name: 'variant',
      type: "'error' | 'warning' | 'info' | 'success' | 'disable' | 'primary' | 'neutral' | 'default'",
      default: "'info'",
      desc: 'Define o status semântico e a cor sólida de fundo do Badge.',
    },
    {
      name: 'number',
      type: "'on' | 'off'",
      default: "'on'",
      desc: 'Modo de exibição do Figma: "on" exibe cápsula com número/rótulo; "off" exibe Dot circular de 8x8px.',
    },
    {
      name: 'count',
      type: 'number',
      default: 'undefined',
      desc: 'Valor numérico direto (ex: count=1, count=120 com suporte a overflow).',
    },
    {
      name: 'overflowCount',
      type: 'number',
      default: '99',
      desc: 'Valor máximo exibido antes de truncar como "99+".',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'dot'",
      default: "'sm'",
      desc: 'Escala do Badge (sm é o padrão oficial de 10px Bold do Figma; dot renderiza 8x8px).',
    },
    {
      name: 'dot',
      type: 'boolean',
      default: 'false',
      desc: 'Quando true sem texto, atua como Dot puro; com texto, exibe um ponto indicador antecedendo o conteúdo.',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Tema visual de contraste.',
    },
    {
      name: 'dismissible',
      type: 'boolean',
      default: 'false',
      desc: 'Renderiza um botão de fechar/remover (X) ao lado do texto.',
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Ícone opcional renderizado ao lado do texto.',
    },
  ];

  return (
    <UnooriaDocShell>
      {/* 1. Cabeçalho Oficial */}
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Indicadores & Status"
        title="Badges"
        description="Badges são pequenos elementos gráficos usados para comunicar status, contagens de notificações não lidas e alertas de sistema. Projetados com cores vibrantes sólidas e suporte aos modos Number On (Pílula) e Number Off (Dot de 8x8px)."
      />

      {/* 2. Visão Geral & Conceito do Figma */}
      <UnooriaDocSectionHeader
        title="1. Visão Geral & O que são"
        description="Conceito e diretrizes extraídos diretamente da especificação oficial do Figma."
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
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#22272A', fontSize: 16 }}>🎯 O que são</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#475157' }}>
            Badges são ícones ou pequenos elementos gráficos usados para mostrar informações sobre um item, como status ou
            notificações. Eles indicam algo importante, como um alerta, uma contagem ou uma conquista.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            padding: 24,
            borderRadius: 12,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#6487C2', fontSize: 16 }}>🔴 Modos Number On vs. Number Off</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#475157' }}>
            No modo <strong>Number On</strong>, o componente apresenta formato de cápsula (<code>1000px</code>) contendo um número ou
            rótulo com tipografia <strong>10px Bold</strong>. No modo <strong>Number Off</strong>, atua como um discreto ponto (Dot)
            circular de <strong>8x8px</strong>.
          </p>
        </div>
      </div>

      {/* 3. Figma & Especificações */}
      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Links oficiais e identificadores de nós de design para homologação visual."
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
              17265:3692
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #CBD5E1', paddingLeft: 16 }}>
            <span style={{ fontSize: 12, color: '#49699F', textTransform: 'uppercase', fontWeight: 600 }}>
              Component Set ID
            </span>
            <div style={{ fontSize: 16, color: '#22272A', fontWeight: 700, fontFamily: 'monospace' }}>
              5920:3299 (Badges)
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <a
              href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=17265-3692&m=dev"
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

      {/* 4. Matriz Oficial do Figma */}
      <UnooriaDocSectionHeader
        title="3. Matriz Oficial do Figma (Variantes x Number On/Off)"
        description="Reprodução fiel da matriz de componentes do nó 17265:3692 do Figma."
      />
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 12,
          padding: 24,
          marginBottom: 32,
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#475157', fontSize: 13 }}>Variante</th>
              <th style={{ padding: '12px 16px', color: '#475157', fontSize: 13 }}>Number On (Pílula 10px Bold)</th>
              <th style={{ padding: '12px 16px', color: '#475157', fontSize: 13 }}>Number Off (Dot 8x8px)</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#475157', fontSize: 13 }}>Uso Típico</th>
            </tr>
          </thead>
          <tbody>
            {figmaVariants.map((item) => (
              <tr key={item.variant} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '16px', textAlign: 'left', fontWeight: 700, color: '#383E41' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: item.color,
                        display: 'inline-block',
                      }}
                    />
                    {item.label}
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <Badge variant={item.variant} number="on">
                    1
                  </Badge>
                </td>
                <td style={{ padding: '16px' }}>
                  <Badge variant={item.variant} number="off" />
                </td>
                <td style={{ padding: '16px', textAlign: 'left', fontSize: 13, color: '#617379' }}>
                  {item.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5. Casos de Uso Reais */}
      <UnooriaDocSectionHeader
        title="4. Casos de Uso Reais (Avatares, Ícones & Menus)"
        description="Exemplos de aplicação de Badges acoplados a componentes da interface."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
          marginBottom: 32,
        }}
      >
        {/* Notificações em Sino */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: '#383E41' }}>Ícone com Contagem</span>
          <div style={{ position: 'relative', display: 'inline-flex', padding: 8 }}>
            <BellIcon />
            <span style={{ position: 'absolute', top: 0, right: 0 }}>
              <Badge variant="error" count={5} />
            </span>
          </div>
          <span style={{ fontSize: 12, color: '#617379' }}>5 Notificações não lidas</span>
        </div>

        {/* E-mail com Overflow */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: '#383E41' }}>Contagem com Overflow (99+)</span>
          <div style={{ position: 'relative', display: 'inline-flex', padding: 8 }}>
            <MailIcon />
            <span style={{ position: 'absolute', top: -4, right: -12 }}>
              <Badge variant="error" count={128} overflowCount={99} />
            </span>
          </div>
          <span style={{ fontSize: 12, color: '#617379' }}>Exibe "99+"</span>
        </div>

        {/* Avatar Online com Dot */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: '#383E41' }}>Status Online em Avatar</span>
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <UserAvatar initials="LS" bg="#6487C2" />
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                border: '2px solid #FFFFFF',
                borderRadius: '50%',
                display: 'inline-flex',
              }}
            >
              <Badge variant="success" number="off" />
            </span>
          </div>
          <span style={{ fontSize: 12, color: '#008257', fontWeight: 600 }}>Usuário Online</span>
        </div>
      </div>

      {/* 6. Suporte a Temas */}
      <UnooriaDocSectionHeader
        title="5. Suporte a Temas (Light & Dark)"
        description="O contraste é preservado automaticamente em ambos os modos."
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
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <Badge theme="light" variant="error">Error</Badge>
          <Badge theme="light" variant="warning">Warning</Badge>
          <Badge theme="light" variant="info">Info</Badge>
          <Badge theme="light" variant="success">Success</Badge>
          <Badge theme="light" variant="disable">Disable</Badge>
        </div>

        <div
          style={{
            backgroundColor: '#22272A',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: 24,
            borderRadius: 12,
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <Badge theme="dark" variant="error">Error</Badge>
          <Badge theme="dark" variant="warning">Warning</Badge>
          <Badge theme="dark" variant="info">Info</Badge>
          <Badge theme="dark" variant="success">Success</Badge>
          <Badge theme="dark" variant="disable">Disable</Badge>
        </div>
      </div>

      {/* 7. Boas Práticas */}
      <UnooriaDocSectionHeader
        title="6. Boas Práticas (Do's & Don'ts)"
        description="Orientações de design de interface para uso consciente de Badges."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            backgroundColor: '#0E241B',
            border: '1px solid #00A369',
            borderRadius: 8,
            padding: 20,
          }}
        >
          <h4 style={{ color: '#00A369', margin: '0 0 12px 0', fontSize: 16 }}>✅ O que FAZER (Do's)</h4>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.6, color: '#E8F5EE' }}>
            <li>Utilize números curtos ou contagens diretas no badge.</li>
            <li>Utilize o modo <code>number="off"</code> (Dot 8x8px) para indicar status simples (online, pendente).</li>
            <li>Defina <code>overflowCount={99}</code> para contagens de três dígitos.</li>
            <li>Reserve a cor <code>error</code> (#E31A1A) para alertas e notificações não lidas.</li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: '#2A1212',
            border: '1px solid #E31A1A',
            borderRadius: 8,
            padding: 20,
          }}
        >
          <h4 style={{ color: '#E31A1A', margin: '0 0 12px 0', fontSize: 16 }}>❌ O que NÃO FAZER (Don'ts)</h4>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.6, color: '#FDECEC' }}>
            <li>Não insira frases ou textos longos dentro de um badge.</li>
            <li>Não use múltiplos badges concorrentes com a cor vermelha na mesma linha.</li>
            <li>Evite usar badges como botões principais de ação.</li>
          </ul>
        </div>
      </div>

      {/* 8. Props API */}
      <UnooriaDocSectionHeader
        title="7. Tabela de Propriedades (Props API)"
        description="Especificação técnica detalhada das propriedades aceitas pelo Badge."
      />
      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 14,
            textAlign: 'left',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #CBD5E1', backgroundColor: '#F8FAFC' }}>
              <th style={{ padding: '12px 16px', color: '#22272A' }}>Propriedade</th>
              <th style={{ padding: '12px 16px', color: '#22272A' }}>Tipo</th>
              <th style={{ padding: '12px 16px', color: '#22272A' }}>Padrão</th>
              <th style={{ padding: '12px 16px', color: '#22272A' }}>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {propsTableData.map((item, idx) => (
              <tr
                key={item.name}
                style={{
                  borderBottom: '1px solid #E2E8F0',
                  backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                }}
              >
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#49699F', fontWeight: 600 }}>
                  {item.name}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>
                  {item.type}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#617379' }}>
                  {item.default}
                </td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>
                  {item.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UnooriaDocShell>
  );
};

// Configuração Meta (Sem tags: ['autodocs'] conforme regra oficial)
const meta: Meta<typeof Badge> = {
  title: 'Plataforma Unooria/Componentes/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success', 'disable', 'primary', 'neutral'],
      description: 'Variante visual / status de cor',
    },
    number: {
      control: 'radio',
      options: ['on', 'off'],
      description: 'Modo do Figma: "on" (Pílula com número) ou "off" (Dot 8x8px)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'dot'],
      description: 'Escala visual do componente',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema de cor da interface',
    },
    count: {
      control: 'number',
      description: 'Contagem numérica exibida',
    },
    overflowCount: {
      control: 'number',
      description: 'Limite máximo de contagem',
    },
    children: {
      control: 'text',
      description: 'Conteúdo textual do Badge',
    },
    dot: {
      control: 'boolean',
      description: 'Ponto indicador de status',
    },
    pill: {
      control: 'boolean',
      description: 'Formato arredondado em pílula',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
  },
  args: {
    variant: 'error',
    number: 'on',
    size: 'sm',
    theme: 'light',
    children: '1',
    pill: true,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

/**
 * 📄 Documentação Completa (Padrão Ouro)
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BadgeDocumentationPage />,
};

/**
 * Playground interativo
 */
export const Playground: Story = {
  name: '🎮 Playground Interativo',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: args.theme === 'dark' ? '#22272A' : '#F8FAFC',
        borderRadius: 12,
        minHeight: 160,
      }}
    >
      <Badge {...args} />
    </div>
  ),
};

/**
 * Matriz Oficial do Figma (Variantes x Number On/Off)
 */
export const MatrizFigmaOficial: Story = {
  name: '📐 Matriz Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 32,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {(['error', 'warning', 'info', 'success', 'disable'] as BadgeVariant[]).map((v) => (
        <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <span style={{ width: 90, fontSize: 14, fontWeight: 700, color: '#383E41', textTransform: 'capitalize' }}>
            {v}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ textAlign: 'center', minWidth: 60 }}>
              <Badge variant={v} number="on">
                1
              </Badge>
              <div style={{ fontSize: 11, color: '#617379', marginTop: 6 }}>Number On</div>
            </div>
            <div style={{ textAlign: 'center', minWidth: 60 }}>
              <Badge variant={v} number="off" />
              <div style={{ fontSize: 11, color: '#617379', marginTop: 6 }}>Number Off</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Badges com Número (Number On)
 */
export const BadgesComNumero: Story = {
  name: '🔢 Badges com Número (Number On)',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 24 }}>
      <Badge variant="error" number="on">1</Badge>
      <Badge variant="warning" number="on">3</Badge>
      <Badge variant="info" number="on">7</Badge>
      <Badge variant="success" number="on">12</Badge>
      <Badge variant="error" count={150} overflowCount={99} />
      <Badge variant="disable" number="on">0</Badge>
    </div>
  ),
};

/**
 * Badges Ponto (Number Off / Dot)
 */
export const BadgesPontoDot: Story = {
  name: '🔴 Badges Ponto (Number Off / Dot 8x8px)',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Badge variant="error" number="off" />
        <span style={{ fontSize: 13, color: '#383E41' }}>Error</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Badge variant="warning" number="off" />
        <span style={{ fontSize: 13, color: '#383E41' }}>Warning</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Badge variant="info" number="off" />
        <span style={{ fontSize: 13, color: '#383E41' }}>Info</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Badge variant="success" number="off" />
        <span style={{ fontSize: 13, color: '#383E41' }}>Success</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Badge variant="disable" number="off" />
        <span style={{ fontSize: 13, color: '#383E41' }}>Disable</span>
      </div>
    </div>
  ),
};

/**
 * Comparativo de Temas Light e Dark
 */
export const ComparacaoTemas: Story = {
  name: '🌗 Comparativo de Temas (Light & Dark)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
      <div style={{ backgroundColor: '#FFFFFF', padding: 32, borderRadius: 12, textAlign: 'center', border: '1px solid #E2E8F0' }}>
        <h4 style={{ color: '#383E41', marginBottom: 16 }}>Tema Claro (Light - Padrão Figma)</h4>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Badge theme="light" variant="error">1</Badge>
          <Badge theme="light" variant="warning">2</Badge>
          <Badge theme="light" variant="info">3</Badge>
          <Badge theme="light" variant="success">4</Badge>
          <Badge theme="light" variant="disable">5</Badge>
        </div>
      </div>

      <div style={{ backgroundColor: '#22272A', padding: 32, borderRadius: 12, textAlign: 'center' }}>
        <h4 style={{ color: '#F5F5F5', marginBottom: 16 }}>Tema Escuro (Dark)</h4>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Badge theme="dark" variant="error">1</Badge>
          <Badge theme="dark" variant="warning">2</Badge>
          <Badge theme="dark" variant="info">3</Badge>
          <Badge theme="dark" variant="success">4</Badge>
          <Badge theme="dark" variant="disable">5</Badge>
        </div>
      </div>
    </div>
  ),
};
