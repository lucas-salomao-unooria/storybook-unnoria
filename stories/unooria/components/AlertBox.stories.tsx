import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AlertBox } from '../../../src/unooria/components/AlertBox/AlertBox';
import { AlertBoxProps, AlertBoxVariant } from '../../../src/unooria/components/AlertBox/AlertBox.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../src/unooria/docs';

// Ícones SVG inline para ilustrar cenários e personalizações
const BellIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ShieldAlertIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

/**
 * Página de Documentação Rica do AlertBox baseada no Padrão Ouro do Design System Unooria
 */
const AlertBoxDocumentationPage = () => {
  const [dismissedAlerts, setDismissedAlerts] = useState<Record<string, boolean>>({});

  const handleDismiss = (id: string) => {
    setDismissedAlerts((prev) => ({ ...prev, [id]: true }));
  };

  const handleResetAlerts = () => {
    setDismissedAlerts({});
  };

  const propsTableData = [
    {
      name: 'variant',
      type: "'info' | 'success' | 'warning' | 'error'",
      default: "'info'",
      desc: 'Define a severidade semântica, ícone padrão e esquema de cores do alerta.',
    },
    {
      name: 'title',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Título principal em destaque (peso 600) exibido no topo do corpo da mensagem.',
    },
    {
      name: 'description',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Texto descritivo com explicações detalhadas ou orientações adicionais.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Conteúdo React flexível e customizado renderizado dentro do corpo do alerta.',
    },
    {
      name: 'icon',
      type: 'boolean | React.ReactNode',
      default: 'true',
      desc: 'Controla a exibição do ícone: true (padrão da variante), false (oculto) ou ReactNode customizado.',
    },
    {
      name: 'isDismissible',
      type: 'boolean',
      default: 'false',
      desc: 'Habilita o botão de fechar (X) acessível na extremidade direita do alerta.',
    },
    {
      name: 'onClose',
      type: '(event?: React.MouseEvent) => void',
      default: 'undefined',
      desc: 'Callback disparado ao clicar no botão de fechar quando isDismissible é true.',
    },
    {
      name: 'action',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Elemento ou botão de ação individual renderizado abaixo do texto descritivo.',
    },
    {
      name: 'actions',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Grupo de elementos ou múltiplos botões de ação contextuais.',
    },
    {
      name: 'actionButton',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Propriedade retrocompatível para passagem de ação customizada.',
    },
    {
      name: 'bordered',
      type: 'boolean',
      default: 'true',
      desc: 'Se true, aplica contorno sutil delimitador de 1px com a cor semântica do estado.',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Alterna entre os temas visuais Claro (Light) e Escuro (Dark) da plataforma.',
    },
    {
      name: 'role',
      type: 'string',
      default: "'status' ou 'alert'",
      desc: 'Papel ARIA semântico. Automaticamente assume "alert" para error/warning e "status" para info/success.',
    },
    {
      name: 'aria-live',
      type: "'polite' | 'assertive' | 'off'",
      default: "'polite'",
      desc: 'Define a urgência da leitura por leitores de tela em regiões vivas.',
    },
    {
      name: 'aria-label',
      type: 'string',
      default: 'computed',
      desc: 'Rótulo acessível fornecido aos leitores de tela.',
    },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Feedbacks"
        title="AlertBox"
        description="O AlertBox é o componente oficial da Plataforma Unooria para comunicação de mensagens de sistema, feedbacks de ações assíncronas, orientações contextuais e alertas de segurança. Projetado com total conformidade aos tokens do Figma, 4 níveis de severidade, comportamento persistente ou dispensável e acessibilidade WCAG 2.1 AA."
      />

      {/* 1. Visão Geral & Motivos de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Motivos de Uso"
          description="Diretrizes extraídas das especificações de design do Figma (Nó mPw4Hhx9ptkgcHtySaSilO / 17025:277)"
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
              💬 Comunicação Não Intrusiva
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Diferente de modais bloqueantes, o AlertBox apresenta orientações diretamente no fluxo visual da página, permitindo que o usuário continue trabalhando enquanto recebe o feedback.
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
              🎯 4 Níveis de Severidade
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Classificação semântica intuitiva em <strong>Info</strong>, <strong>Success</strong>, <strong>Warning</strong> e <strong>Error</strong>, cada uma com paleta cromática e ícones padronizados.
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
              🎨 Fidelidade Total aos Tokens
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Utiliza 100% dos tokens CSS do Unooria (<code style={{ fontSize: '12px', background: '#E2E8F0', padding: '2px 4px', borderRadius: '4px' }}>--unooria-color-*</code>), garantindo consistência em temas Light e Dark.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Diretrizes das 4 Severidades */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="2. Diretrizes das 4 Severidades"
          description="Quando e como utilizar cada variante semântica no produto"
          barColor="#10B981"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          <AlertBox
            variant="info"
            title="Info (Informativo / Dica)"
            description="Comunica novidades de recursos, dicas contextuais, atualizações de versão ou avisos neutros que orientam o usuário sem exigir correção imediata."
            isDismissible
          />
          <AlertBox
            variant="success"
            title="Success (Sucesso / Confirmação)"
            description="Confirma a conclusão bem-sucedida de operações importantes, sincronizações finalizadas, registros salvos ou transações concluídas."
            isDismissible
          />
          <AlertBox
            variant="warning"
            title="Warning (Aviso / Atenção Preventiva)"
            description="Sinaliza riscos potenciais, iminência de expiração de planos/chaves, dados incompletos ou comportamentos que podem gerar transtornos futuros."
            isDismissible
          />
          <AlertBox
            variant="error"
            title="Error (Erro Crítico / Falha de Sistema)"
            description="Alerta sobre erros impeditivos, falhas de conexão com a API, perda de autenticação ou recusa de validação em formulários críticos."
            isDismissible
          />
        </div>
      </section>

      {/* 3. Persistência & Ações */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="3. Persistência, Ações e Fechamento"
          description="Regras de comportamento para alertas permanentes vs dispensáveis (isDismissible) e botões de ação"
          barColor="#F59E0B"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '16px',
            marginBottom: '20px',
          }}
        >
          <div style={{ padding: '20px', backgroundColor: '#FFFBEB', borderRadius: '12px', border: '1px solid #FDE68A' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#92400E', fontSize: '15px', fontWeight: 600 }}>
              🔒 Alertas Persistentes (<code style={{ fontSize: '12px' }}>isDismissible=false</code>)
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#B45309', lineHeight: '1.6' }}>
              Devem permanecer visíveis até que o problema subjacente seja corrigido pelo usuário ou pelo sistema (ex: falta de conectividade ou perfil cadastral incompleto).
            </p>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#EFF6FF', borderRadius: '12px', border: '1px solid #BFDBFE' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#1E40AF', fontSize: '15px', fontWeight: 600 }}>
              ❌ Alertas Dispensáveis (<code style={{ fontSize: '12px' }}>isDismissible=true</code>)
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#1D4ED8', lineHeight: '1.6' }}>
              Apresentam o botão de fechar acessível com foco por teclado e suporte a leitores de tela. Indicados para anúncios, novidades e mensagens de confirmação pós-ação.
            </p>
          </div>
        </div>

        {/* Simulador Interativo */}
        <div
          style={{
            padding: '24px',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            backgroundColor: '#FAFAFA',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>
              Simulador Interativo de Persistência & Ações
            </span>
            {Object.keys(dismissedAlerts).length > 0 && (
              <button
                onClick={handleResetAlerts}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  color: '#006BFF',
                }}
              >
                Restaurar Alertas Fechados
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {!dismissedAlerts['persistente'] && (
              <AlertBox
                variant="error"
                title="Alerta Persistente: Falha no Gateway de Pagamento"
                description="Não foi possível sincronizar o status da transação. Esta mensagem permanecerá até o restabelecimento do serviço."
                isDismissible={false}
                action={
                  <button
                    onClick={() => alert('Tentando reconexão...')}
                    style={{
                      padding: '6px 12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      borderRadius: '6px',
                      border: '1px solid #DC2626',
                      backgroundColor: '#DC2626',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                    }}
                  >
                    Tentar Reconectar
                  </button>
                }
              />
            )}

            {!dismissedAlerts['dispensavel1'] && (
              <AlertBox
                variant="info"
                title="Novo Recurso de Filtros Inteligentes"
                description="Agora você pode agrupar e exportar dados com consultas personalizadas no relatório financeiro."
                isDismissible={true}
                onClose={() => handleDismiss('dispensavel1')}
                action={
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => alert('Tour iniciado!')}
                      style={{
                        padding: '6px 12px',
                        fontSize: '13px',
                        fontWeight: 600,
                        borderRadius: '6px',
                        border: '1px solid #006BFF',
                        backgroundColor: '#006BFF',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      Fazer Tour
                    </button>
                  </div>
                }
              />
            )}
          </div>
        </div>
      </section>

      {/* 4. Anatomia do Componente */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="4. Anatomia do Componente" barColor="#8B5CF6" />
        <div
          style={{
            padding: '24px',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>1. Ícone Semântico</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Ícone SVG automático alinhado à esquerda conforme a variante (`info`, `success`, `warning`, `error`).
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>2. Título (Title)</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Título em peso semi-negrito (<code style={{ fontSize: '11px' }}>600</code>), comunicando a ideia principal com clareza.
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>3. Descrição / Children</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Texto detalhado ou nós React para explicações contextuais e orientações corretivas.
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>4. Ações & Fechamento</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Botões de resolução imediata (`action`/`actions`) e botão dispensável (`isDismissible`).
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Diretrizes de Design & Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="5. Diretrizes de Design & Boas Práticas" barColor="#EF4444" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
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
              <li>Mantenha títulos curtos, diretos e com vocabulário orientado à ação.</li>
              <li>Utilize a variante que corresponda estritamente à severidade da situação.</li>
              <li>Forneça botões de ação (<code style={{ fontSize: '12px' }}>action</code>) quando houver uma rota de resolução imediata.</li>
              <li>Posicione o alerta próximo ao conteúdo ou formulário ao qual ele se refere.</li>
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
              <li>Não utilize o AlertBox para feedbacks flutuantes temporários de 3 segundos (use Toasts).</li>
              <li>Não utilize a variante <code style={{ fontSize: '12px' }}>error</code> para avisos preventivos ou mensagens neutras.</li>
              <li>Não sobrecarregue o usuário empilhando múltiplos alertas simultâneos sem agrupamento.</li>
              <li>Não oculte botões de dispensa em mensagens promocionais ou de novidades.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Acessibilidade & Suporte a Temas */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="6. Acessibilidade (WCAG 2.1 AA) & Suporte a Temas" barColor="#06B6D4" />
        <div
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            marginBottom: '20px',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
            ♿ Recursos Nativos de Acessibilidade
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#475569', lineHeight: '1.7' }}>
            <li>
              <strong>ARIA Roles Dinâmicos:</strong> As variantes <code style={{ fontSize: '12px' }}>error</code> e <code style={{ fontSize: '12px' }}>warning</code> utilizam automaticamente <code style={{ fontSize: '12px' }}>role=&quot;alert&quot;</code>, enquanto <code style={{ fontSize: '12px' }}>info</code> e <code style={{ fontSize: '12px' }}>success</code> recebem <code style={{ fontSize: '12px' }}>role=&quot;status&quot;</code>.
            </li>
            <li>
              <strong>Live Regions:</strong> Suporte a <code style={{ fontSize: '12px' }}>aria-live=&quot;polite&quot;</code> e <code style={{ fontSize: '12px' }}>aria-atomic=&quot;true&quot;</code> para que leitores de tela anunciem mensagens atualizadas dinamicamente sem interromper o usuário.
            </li>
            <li>
              <strong>Navegação por Teclado:</strong> O botão de fechar possui anel de foco visível de alto contraste e acionamento por tecla <code style={{ fontSize: '12px' }}>Enter</code> ou <code style={{ fontSize: '12px' }}>Space</code>.
            </li>
            <li>
              <strong>Contraste Cromático:</strong> Todas as combinações de fundo, borda e tipografia atendem à taxa mínima de 4.5:1 da WCAG 2.1 AA.
            </li>
          </ul>
        </div>

        {/* Comparação Light vs Dark */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', border: '1px solid #E2E8F0', borderRadius: '12px', backgroundColor: '#FFFFFF' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#0284C7', fontSize: '15px' }}>☀️ Tema Claro (Light Mode)</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <AlertBox theme="light" variant="info" title="Informativo Claro" description="Contraste calibrado para fundos claros." isDismissible />
              <AlertBox theme="light" variant="success" title="Sucesso Claro" description="Operação gravada com êxito." isDismissible />
            </div>
          </div>

          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#22272A', border: '1px solid #3D4448' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#38BDF8', fontSize: '15px' }}>🌙 Tema Escuro (Dark Mode)</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <AlertBox theme="dark" variant="info" title="Informativo Escuro" description="Fundo adaptado com superfícies escuras." isDismissible />
              <AlertBox theme="dark" variant="success" title="Sucesso Escuro" description="Operação gravada com êxito no dark mode." isDismissible />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Props API Reference */}
      <section>
        <UnooriaDocSectionHeader title="7. Referência Completa das Propriedades (Props API)" barColor="#64748B" />
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
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof AlertBox> = {
  title: 'Plataforma Unooria/Componentes/AlertBox',
  component: AlertBox,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Variante de severidade e esquema de cor do alerta.',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: 'text',
      description: 'Título principal exibido em destaque no topo.',
    },
    description: {
      control: 'text',
      description: 'Texto descritivo com informações adicionais.',
    },
    icon: {
      control: 'boolean',
      description: 'Habilita, desabilita ou substitui o ícone do alerta.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    isDismissible: {
      control: 'boolean',
      description: 'Permite ao usuário fechar/dispensar o alerta.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    bordered: {
      control: 'boolean',
      description: 'Exibe ou oculta o contorno de borda externa.',
      table: {
        defaultValue: { summary: 'true' },
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
    onClose: {
      action: 'closed',
      description: 'Callback acionado ao clicar no botão fechar.',
    },
  },
  args: {
    variant: 'info',
    title: 'Atenção às atualizações do sistema',
    description: 'Uma nova versão do módulo de relatórios está disponível. Salve suas alterações antes de atualizar.',
    icon: true,
    isDismissible: true,
    bordered: true,
    theme: 'light',
  },
};

export default meta;
type Story = StoryObj<typeof AlertBox>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AlertBoxDocumentationPage />,
};

/**
 * Playground interativo com controles abrangentes e fundo adaptativo ao tema.
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
      <AlertBox {...args} />
    </div>
  ),
  args: {
    variant: 'info',
    title: 'Atualização do Sistema',
    description: 'Experimente alterar os controles na barra inferior do Storybook para testar variantes, temas e comportamentos.',
    isDismissible: true,
    bordered: true,
    theme: 'light',
  },
};

/**
 * Matriz visual com todas as 4 variantes de severidade (Info, Success, Warning, Error).
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '680px' }}>
      <AlertBox
        variant="info"
        title="Informação Geral"
        description="O sistema passará por uma manutenção programada neste sábado às 22h."
        isDismissible
      />
      <AlertBox
        variant="success"
        title="Operação Realizada com Sucesso"
        description="Os dados do perfil e as permissões de acesso foram gravados com êxito."
        isDismissible
      />
      <AlertBox
        variant="warning"
        title="Atenção: Licença Prestes a Expirar"
        description="Sua assinatura corporativa expira em 5 dias. Renove para evitar interrupções."
        isDismissible
      />
      <AlertBox
        variant="error"
        title="Falha Crítica na Autenticação"
        description="Token de segurança expirado ou inválido. Realize login novamente para continuar."
        isDismissible
      />
    </div>
  ),
};

/**
 * AlertBox com botões de ação contextuais individuais e múltiplos (`action` e `actions`).
 */
export const ComAcoes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '680px' }}>
      <AlertBox
        variant="info"
        title="Nova Versão 3.2.0 Disponível"
        description="Inclui melhorias de performance e novas opções de exportação de dados."
        isDismissible
        action={
          <button
            onClick={() => alert('Iniciando download...')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #006BFF',
              backgroundColor: '#006BFF',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Atualizar Agora
          </button>
        }
      />

      <AlertBox
        variant="warning"
        title="Limite de Armazenamento Atingido (92%)"
        description="Seu plano atingiu quase a capacidade total. Limpe arquivos antigos ou faça upgrade."
        isDismissible
        actions={
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => alert('Redirecionando para planos...')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #DD5202',
                backgroundColor: '#DD5202',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Fazer Upgrade
            </button>
            <button
              onClick={() => alert('Abrindo gerenciador de arquivos...')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Gerenciar Espaço
            </button>
          </div>
        }
      />
    </div>
  ),
};

/**
 * Alertas Dispensáveis com gerenciamento de estado interativo.
 */
export const DispensavelInterativo: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      { id: '1', variant: 'info' as AlertBoxVariant, title: 'Notificação 1', desc: 'Clique no X para me dispensar.' },
      { id: '2', variant: 'success' as AlertBoxVariant, title: 'Notificação 2', desc: 'Outro alerta que pode ser fechado.' },
    ]);

    const removeAlert = (id: string) => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    };

    const resetAlerts = () => {
      setAlerts([
        { id: '1', variant: 'info', title: 'Notificação 1', desc: 'Clique no X para me dispensar.' },
        { id: '2', variant: 'success', title: 'Notificação 2', desc: 'Outro alerta que pode ser fechado.' },
      ]);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '680px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#64748B' }}>
            Alertas ativos: {alerts.length}
          </span>
          {alerts.length < 2 && (
            <button
              onClick={resetAlerts}
              style={{
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: '4px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              Restaurar Alertas
            </button>
          )}
        </div>
        {alerts.map((a) => (
          <AlertBox
            key={a.id}
            variant={a.variant}
            title={a.title}
            description={a.desc}
            isDismissible
            onClose={() => removeAlert(a.id)}
          />
        ))}
      </div>
    );
  },
};

/**
 * Comparação entre Alertas com Borda e sem Borda (bordered={true} vs bordered={false}).
 */
export const ComBordasESemBordas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '680px' }}>
      <AlertBox
        variant="info"
        title="Com Borda Delimitadora (bordered = true / Padrão)"
        description="Apresenta contorno sutil de 1px na cor semântica da variante, ideal para separar de fundos similares."
        bordered={true}
        isDismissible
      />
      <AlertBox
        variant="info"
        title="Sem Borda Delimitadora (bordered = false)"
        description="Fundo sólido sem linha externa, indicado para superfícies com alto contraste ou contêineres próprios."
        bordered={false}
        isDismissible
      />
    </div>
  ),
};

/**
 * Variações de Ícones: Padrão, Oculto (icon={false}) e Customizado com SVG.
 */
export const VariacoesDeIcones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '680px' }}>
      <AlertBox
        variant="info"
        title="Ícone Padrão da Variante (icon = true)"
        description="Renderiza o ícone SVG correspondente à severidade 'info'."
        icon={true}
      />
      <AlertBox
        variant="info"
        title="Sem Ícone (icon = false)"
        description="Oculta o slot do ícone, aproveitando toda a largura para o texto."
        icon={false}
      />
      <AlertBox
        variant="warning"
        title="Ícone Customizado (Sino de Alerta)"
        description="Utiliza um ícone SVG customizado passado via propriedade icon."
        icon={<BellIcon />}
      />
      <AlertBox
        variant="error"
        title="Ícone Customizado de Segurança (Escudo)"
        description="Substitui o ícone nativo por um escudo de segurança."
        icon={<ShieldAlertIcon />}
      />
    </div>
  ),
};

/**
 * Modo Escuro (Dark Mode) Isolado.
 */
export const ModoEscuro: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#22272A',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '680px',
      }}
    >
      <AlertBox
        theme="dark"
        variant="info"
        title="Dark Mode - Informativo"
        description="Superfície e tipografia calibradas para máxima legibilidade no tema escuro."
        isDismissible
      />
      <AlertBox
        theme="dark"
        variant="success"
        title="Dark Mode - Sucesso"
        description="Confirmação de operação realizada no tema escuro."
        isDismissible
      />
      <AlertBox
        theme="dark"
        variant="warning"
        title="Dark Mode - Aviso"
        description="Atenção aos prazos no tema escuro."
        isDismissible
      />
      <AlertBox
        theme="dark"
        variant="error"
        title="Dark Mode - Erro Crítico"
        description="Falha crítica de conexão em ambiente com tema escuro."
        isDismissible
      />
    </div>
  ),
};

/**
 * Comparação Lado a Lado dos Temas Light e Dark Mode em todas as severidades.
 */
export const ComparacaoTemas: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '1200px' }}>
      {/* Light Mode */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #CBD4D6',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h4 style={{ margin: '0 0 8px 0', fontFamily: 'sans-serif', color: '#536167', fontSize: '15px', fontWeight: 700 }}>
          ☀️ Light Mode (Tema Claro)
        </h4>

        <AlertBox
          theme="light"
          variant="info"
          title="Info - Light"
          description="Mensagem informativa com contraste claro."
          isDismissible
        />
        <AlertBox
          theme="light"
          variant="success"
          title="Sucesso - Light"
          description="Confirmação de operação concluída com sucesso."
          isDismissible
        />
        <AlertBox
          theme="light"
          variant="warning"
          title="Aviso - Light"
          description="Alerta sobre pendências no cadastro."
          isDismissible
        />
        <AlertBox
          theme="light"
          variant="error"
          title="Erro - Light"
          description="Falha crítica no processamento do formulário."
          isDismissible
        />
      </div>

      {/* Dark Mode */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#22272A',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h4 style={{ margin: '0 0 8px 0', fontFamily: 'sans-serif', color: '#A7B5B9', fontSize: '15px', fontWeight: 700 }}>
          🌙 Dark Mode (Tema Escuro)
        </h4>

        <AlertBox
          theme="dark"
          variant="info"
          title="Info - Dark"
          description="Mensagem informativa com contraste escuro."
          isDismissible
        />
        <AlertBox
          theme="dark"
          variant="success"
          title="Sucesso - Dark"
          description="Confirmação de operação concluída com sucesso."
          isDismissible
        />
        <AlertBox
          theme="dark"
          variant="warning"
          title="Aviso - Dark"
          description="Alerta sobre pendências no cadastro."
          isDismissible
        />
        <AlertBox
          theme="dark"
          variant="error"
          title="Erro - Dark"
          description="Falha crítica no processamento do formulário."
          isDismissible
        />
      </div>
    </div>
  ),
};

/**
 * Cenários Práticos Reais de Aplicação no Produto.
 */
export const CenariosReais: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '720px' }}>
      {/* Cenário 1: Erro de Validação de Formulário */}
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
          Cenário 1: Erro de Validação em Formulário Cadastral
        </h5>
        <AlertBox
          variant="error"
          title="Não foi possível salvar os dados da empresa"
          description="Verifique os seguintes campos destacados: CNPJ inválido e CEP não localizado na base dos Correios."
          isDismissible
          action={
            <button
              onClick={() => alert('Focando no primeiro campo com erro...')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #DC2626',
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Corrigir Campos
            </button>
          }
        />
      </div>

      {/* Cenário 2: Conclusão de Checkout / Pagamento */}
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
          Cenário 2: Confirmação de Assinatura
        </h5>
        <AlertBox
          variant="success"
          icon={<CheckCircleIcon />}
          title="Assinatura Pro Ativada com Sucesso!"
          description="Seu comprovante foi enviado para o e-mail cadastrado. Todos os recursos já estão liberados para a sua equipe."
          isDismissible
          action={
            <button
              onClick={() => alert('Indo para o Dashboard...')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #16A34A',
                backgroundColor: '#16A34A',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Acessar Painel Pro
            </button>
          }
        />
      </div>
    </div>
  ),
};
