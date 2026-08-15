import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FeedbackAlert } from '../../../src/unooria/components/FeedbackAlert/FeedbackAlert';
import {
  FeedbackAlertProps,
  FeedbackAlertType,
  FeedbackAlertTheme,
} from '../../../src/unooria/components/FeedbackAlert/FeedbackAlert.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

// Ícones SVG auxiliares para exemplos customizados
const ShieldCheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const KeyIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 2l-2 2m-1.5 1.5L14 9l-3-3L8 9l3 3-6.5 6.5a2.12 2.12 0 1 0 3 3L14 15l3 3 3-3-3-3 3.5-3.5z" />
  </svg>
);

/**
 * Página de Documentação Rica do FeedbackAlert baseada no Padrão Ouro do Design System Unooria
 */
const FeedbackAlertDocumentationPage = () => {
  const [activeThemeTab, setActiveThemeTab] = useState<FeedbackAlertTheme>('light');
  const [dismissedAlerts, setDismissedAlerts] = useState<Record<string, boolean>>({});

  const handleDismiss = (id: string) => {
    setDismissedAlerts((prev) => ({ ...prev, [id]: true }));
  };

  const handleResetAlerts = () => {
    setDismissedAlerts({});
  };

  const figmaSpecsData = [
    {
      variant: 'Error (Erro)',
      nodeId: '24190:164',
      bgLight: 'rgba(227, 26, 26, 0.1)',
      textColorLight: '#C11414',
      bgDark: 'rgba(227, 26, 26, 0.15)',
      textColorDark: '#FF6A6A',
      tokenBg: '--unooria-color-opacity-danger-100',
      tokenText: '--unooria-color-danger-700 / 400',
    },
    {
      variant: 'Warning (Aviso)',
      nodeId: '24190:166',
      bgLight: 'rgba(249, 118, 7, 0.1)',
      textColorLight: '#B73506',
      bgDark: 'rgba(249, 118, 7, 0.15)',
      textColorDark: '#F97607',
      tokenBg: '--unooria-color-opacity-warning-100',
      tokenText: '--unooria-color-warning-700 / 500',
    },
    {
      variant: 'Success (Sucesso)',
      nodeId: '24190:169',
      bgLight: 'rgba(1, 181, 116, 0.1)',
      textColorLight: '#008257',
      bgDark: 'rgba(1, 181, 116, 0.15)',
      textColorDark: '#01B574',
      tokenBg: '--unooria-color-opacity-success-100',
      tokenText: '--unooria-color-success-700 / 500',
    },
    {
      variant: 'Info (Informação)',
      nodeId: '24190:172',
      bgLight: 'rgba(0, 134, 255, 0.1)',
      textColorLight: '#005CE6',
      bgDark: 'rgba(0, 134, 255, 0.15)',
      textColorDark: '#0086FF',
      tokenBg: '--unooria-color-opacity-info-100',
      tokenText: '--unooria-color-info-700 / 500',
    },
  ];

  const propsTableData = [
    {
      name: 'type',
      type: "'error' | 'warning' | 'success' | 'info'",
      default: "'info'",
      desc: 'Define a severidade semântica, cores de fundo translúcido e ícone nativo do alerta conforme Figma.',
    },
    {
      name: 'severity',
      type: "'error' | 'warning' | 'success' | 'info'",
      default: "undefined (alias de type)",
      desc: 'Alias de conveniência para a propriedade type.',
    },
    {
      name: 'title',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Título principal de destaque em peso semi-negrito/bold exibido no topo da mensagem.',
    },
    {
      name: 'description',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Texto principal descritivo com explicações detalhadas ou orientações contextuais.',
    },
    {
      name: 'subtle',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Texto secundário complementar com tipografia sutil de apoio (12px / menor opacidade).',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Conteúdo livre ou nós React renderizados no corpo da mensagem.',
    },
    {
      name: 'icon',
      type: 'boolean | React.ReactNode',
      default: 'true',
      desc: 'Controla a exibição do ícone: true (ícone temático padrão), false (oculto) ou ReactNode customizado.',
    },
    {
      name: 'dismissible',
      type: 'boolean',
      default: 'false',
      desc: 'Se true, renderiza o botão de fechar (Close button) com cantos arredondados de 8px na lateral direita.',
    },
    {
      name: 'isDismissible',
      type: 'boolean',
      default: 'false',
      desc: 'Alias de conveniência para a propriedade dismissible.',
    },
    {
      name: 'onDismiss',
      type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
      default: 'undefined',
      desc: 'Callback disparado ao clicar no botão de fechar/dispensar.',
    },
    {
      name: 'onClose',
      type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
      default: 'undefined',
      desc: 'Alias de conveniência para o callback onDismiss.',
    },
    {
      name: 'action',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Elemento ou botão de ação contextual renderizado na parte inferior do texto.',
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
      default: "'alert' ou 'status'",
      desc: 'Papel semântico ARIA para acessibilidade.',
    },
    {
      name: 'aria-live',
      type: "'polite' | 'assertive' | 'off'",
      default: "Auto ('assertive' em error, 'polite' nos demais)",
      desc: 'Controla como os leitores de tela anunciam as mudanças de conteúdo.',
    },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Feedbacks"
        title="FeedbackAlert"
        description="O FeedbackAlert é o componente oficial da Plataforma Unooria para comunicação contextual e estruturada de mensagens de status, notificações pós-ação, validações de formulário e alertas de sistema. Projetado com total conformidade ao Figma Nó #24190:87, 4 níveis de severidade com fundos translúcidos semânticos, cantos de 16px, padding de 24px, gap de 16px e suporte nativo a temas Light e Dark."
      />

      {/* 1. Visão Geral & Casos de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Casos de Uso"
          description="Mensagens de feedback claras, não-bloqueantes e integradas diretamente no layout da página"
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
              🔐 Validação de Formulário & Autenticação
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Exibe erros de credenciais inválidas, bloqueios de conta ou pendências de preenchimento logo acima dos campos, mantendo o usuário orientado.
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
              ✅ Confirmação de Operações
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Notifica o sucesso no envio de formulários, salvamento de dados cadastrais, alteração de senhas ou emissão de notas fiscais.
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
              ⚠️ Alertas Preventivos & Limites
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Informa sobre limites de plano atingidos, faturas em atraso iminente ou manutenções programadas sem bloquear a navegação.
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
              ℹ️ Dicas & Comunicados de Sistema
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Divulga novidades da plataforma, sugestões de produtividade e orientações de onboarding com opção de dispensa.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Figma & Especificações Técnicas */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="2. Figma & Especificações Técnicas"
          description="Rastreabilidade oficial e mapeamento de tokens de cores e nós do Figma"
          barColor="#6366F1"
        />

        <div
          style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: '#EEF2FF',
            border: '1px solid #C7D2FE',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#4F46E5', textTransform: 'uppercase' }}>
              Figma Design System Unooria
            </span>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#1E1B4B', marginTop: '2px' }}>
              Componente Nó Principal: #24190:87
            </div>
            <div style={{ fontSize: '13px', color: '#4338CA', marginTop: '2px' }}>
              Variantes: Error (24190:164), Warning (24190:166), Success (24190:169), Info (24190:172)
            </div>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=24190-87&m=dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#4F46E5',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Abrir no Figma Dev Mode ↗
          </a>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Severidade</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Node ID</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Fundo (Light)</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Texto/Ícone (Light)</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Fundo (Dark)</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Texto/Ícone (Dark)</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Tokens CSS</th>
              </tr>
            </thead>
            <tbody>
              {figmaSpecsData.map((spec) => (
                <tr key={spec.variant} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#1E293B' }}>{spec.variant}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6366F1' }}>{spec.nodeId}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#334155' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        borderRadius: '3px',
                        backgroundColor: spec.bgLight,
                        border: '1px solid #CBD5E1',
                        marginRight: '6px',
                        verticalAlign: 'middle',
                      }}
                    />
                    {spec.bgLight}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: spec.textColorLight, fontWeight: 600 }}>
                    {spec.textColorLight}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#334155' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        borderRadius: '3px',
                        backgroundColor: spec.bgDark,
                        marginRight: '6px',
                        verticalAlign: 'middle',
                      }}
                    />
                    {spec.bgDark}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: spec.textColorDark, fontWeight: 600 }}>
                    {spec.textColorDark}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#64748B', fontSize: '11px' }}>
                    {spec.tokenBg}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Matriz das 4 Severidades do Figma */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="3. Matriz das 4 Severidades do Figma"
          description="Visualização em tempo real das variantes Error, Warning, Success e Info com tokens de opacidade e cores semânticas"
          barColor="#10B981"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          {/* Error */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#C11414', textTransform: 'uppercase', marginBottom: '6px' }}>
              🔴 Error • Node #24190:164 • Fundo: rgba(227,26,26,0.1) • Texto: #C11414
            </div>
            <FeedbackAlert
              type="error"
              title="Falha na autenticação do usuário"
              description="E-mail ou senha incorretos. Verifique suas credenciais e tente novamente."
              subtle="Código de referência do erro: AUTH_INVALID_CREDENTIALS"
              dismissible
            />
          </div>

          {/* Warning */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#B73506', textTransform: 'uppercase', marginBottom: '6px' }}>
              🟠 Warning • Node #24190:166 • Fundo: rgba(249,118,7,0.1) • Texto: #B73506
            </div>
            <FeedbackAlert
              type="warning"
              title="Atenção: Limite de armazenamento quase atingido"
              description="Você consumiu 92% do espaço contratado. Recomendamos fazer upgrade ou limpar arquivos antigos."
              subtle="O envio de novas mídias pode ser bloqueado ao atingir 100%."
              dismissible
            />
          </div>

          {/* Success */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#008257', textTransform: 'uppercase', marginBottom: '6px' }}>
              🟢 Success • Node #24190:169 • Fundo: rgba(1,181,116,0.1) • Texto: #008257
            </div>
            <FeedbackAlert
              type="success"
              title="Alterações salvas com sucesso!"
              description="As preferências da sua organização foram sincronizadas em todos os dispositivos."
              subtle="Última sincronização realizada há 2 segundos."
              dismissible
            />
          </div>

          {/* Info */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#005CE6', textTransform: 'uppercase', marginBottom: '6px' }}>
              🔵 Info • Node #24190:172 • Fundo: rgba(0,134,255,0.1) • Texto: #005CE6
            </div>
            <FeedbackAlert
              type="info"
              title="Nova funcionalidade disponível"
              description="Agora você pode exportar relatórios customizados no formato XLSX e PDF diretamente pelo painel."
              subtle="Confira a documentação completa no menu de Ajuda."
              dismissible
            />
          </div>
        </div>
      </section>

      {/* 4. Anatomia do Componente */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="4. Anatomia do Componente"
          description="Dimensões, espaçamentos, tipografia e slots de conteúdo especificados no Figma"
          barColor="#8B5CF6"
        />

        <div
          style={{
            padding: '24px',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>Cantos Arredondados</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                <code style={{ fontSize: '12px', backgroundColor: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>
                  border-radius: 16px
                </code>
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>Padding & Gap Interno</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                <code style={{ fontSize: '12px', backgroundColor: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>
                  padding: 24px • gap: 16px
                </code>
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>Ícone Semântico</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Dimensão <code style={{ fontSize: '12px', backgroundColor: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>24px x 24px</code> alinhado ao topo
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>Tipografia de Título</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Semi-negrito/Bold (<code style={{ fontSize: '11px' }}>600</code>), 16px–20px
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>Texto Descritivo</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Regular (<code style={{ fontSize: '11px' }}>400</code>), 14px–18px, opacidade 0.92
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>Botão Dispensar (Close)</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Área <code style={{ fontSize: '12px', backgroundColor: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>28px x 28px</code> com radius de 8px
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed #E2E8F0', paddingTop: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '8px' }}>
              Exemplo Completo com Todos os Elementos Anatômicos:
            </span>
            <FeedbackAlert
              type="info"
              title="Título em Destaque (Title)"
              description="Corpo do texto descritivo detalhando o contexto e orientações (Description)."
              subtle="Informação de apoio secundária em tipografia reduzida (Subtle)."
              dismissible
              action={
                <button
                  type="button"
                  onClick={() => alert('Ação executada com sucesso!')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #005CE6',
                    backgroundColor: '#005CE6',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Botão de Ação (Action)
                </button>
              }
            />
          </div>
        </div>
      </section>

      {/* 5. Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="5. Boas Práticas (Do's & Don'ts)"
          description="Orientações essenciais de UX e Design para o uso correto dos alertas"
          barColor="#F59E0B"
        />

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
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#15803D', lineHeight: '1.7' }}>
              <li>
                <strong>Posicione contextualmente:</strong> Insira o alerta próximo ao elemento relevante (ex: acima do formulário de login).
              </li>
              <li>
                <strong>Seja direto e acionável:</strong> Explique o que aconteceu e como o usuário pode resolver o problema.
              </li>
              <li>
                <strong>Inclua botões de recuperação:</strong> Utilize o slot <code style={{ fontSize: '12px' }}>action</code> para atalhos de resolução rápida.
              </li>
              <li>
                <strong>Utilize a severidade correta:</strong> Reserve <code style={{ fontSize: '12px' }}>error</code> exclusivamente para bloqueios ou falhas críticas.
              </li>
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
              <li>
                <strong>Não use como Toast:</strong> O FeedbackAlert não possui temporizador de auto-fechamento automático de 3 segundos.
              </li>
              <li>
                <strong>Não polua com múltiplos alertas:</strong> Agrupe mensagens relacionadas para evitar fadiga de notificações.
              </li>
              <li>
                <strong>Não use títulos vagos:</strong> Evite títulos genéricos como &quot;Erro&quot; sem especificar a falha ocorrida.
              </li>
              <li>
                <strong>Não oculte o botão fechar em comunicados:</strong> Mensagens de dicas devem sempre permitir dispensa pelo usuário.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Suporte a Temas (Light e Dark com Toggle e Preview) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="6. Suporte a Temas (Light & Dark)"
          description="Alternância de tema com cálculo automático de contraste e superfícies translúcidas"
          barColor="#06B6D4"
        />

        {/* Simulador com Toggle */}
        <div
          style={{
            padding: '24px',
            borderRadius: '16px',
            backgroundColor: activeThemeTab === 'dark' ? '#1E293B' : '#F8FAFC',
            border: `1px solid ${activeThemeTab === 'dark' ? '#334155' : '#E2E8F0'}`,
            transition: 'all 0.2s ease',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: activeThemeTab === 'dark' ? '#F8FAFC' : '#1E293B',
              }}
            >
              Simulador Interativo de Tema
            </span>

            <div style={{ display: 'inline-flex', backgroundColor: activeThemeTab === 'dark' ? '#0F172A' : '#E2E8F0', padding: '3px', borderRadius: '8px' }}>
              <button
                type="button"
                onClick={() => setActiveThemeTab('light')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeThemeTab === 'light' ? '#FFFFFF' : 'transparent',
                  color: activeThemeTab === 'light' ? '#0F172A' : '#64748B',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: activeThemeTab === 'light' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                ☀️ Light Mode
              </button>
              <button
                type="button"
                onClick={() => setActiveThemeTab('dark')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeThemeTab === 'dark' ? '#334155' : 'transparent',
                  color: activeThemeTab === 'dark' ? '#F8FAFC' : '#64748B',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: activeThemeTab === 'dark' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                }}
              >
                🌙 Dark Mode
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <FeedbackAlert
              theme={activeThemeTab}
              type="error"
              title="Erro de Conexão com o Servidor"
              description="Não foi possível sincronizar os dados cadastrais. Tentativa 2 de 5 em andamento."
              dismissible
            />
            <FeedbackAlert
              theme={activeThemeTab}
              type="warning"
              title="Atualização Crítica de Segurança Pendente"
              description="Recomendamos atualizar sua chave de acesso API antes de 30/09."
              dismissible
            />
            <FeedbackAlert
              theme={activeThemeTab}
              type="success"
              title="Backup Concluído com Sucesso"
              description="Todos os 1.450 arquivos foram criptografados e salvos no cofre digital."
              dismissible
            />
            <FeedbackAlert
              theme={activeThemeTab}
              type="info"
              title="Dica de Produtividade"
              description="Pressione Ctrl+K (ou Cmd+K no Mac) para abrir a barra de busca rápida global."
              dismissible
            />
          </div>
        </div>
      </section>

      {/* 7. Referência Completa das Props (API Table) */}
      <section>
        <UnooriaDocSectionHeader
          title="7. Referência Completa das Propriedades (Props API)"
          description="Documentação técnica de tipos TypeScript e valores padrão para desenvolvedores"
          barColor="#64748B"
        />

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

const meta: Meta<typeof FeedbackAlert> = {
  title: 'Plataforma Unooria/Componentes/FeedbackAlert',
  component: FeedbackAlert,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['error', 'warning', 'success', 'info'],
      description: 'Variante de severidade e esquema de cor semântico do alerta.',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: 'text',
      description: 'Título principal em destaque exibido no topo.',
    },
    description: {
      control: 'text',
      description: 'Mensagem descritiva com informações ou orientações detalhadas.',
    },
    subtle: {
      control: 'text',
      description: 'Mensagem secundária com tipografia reduzida e menor opacidade.',
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Tema visual de cores do componente.',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    dismissible: {
      control: 'boolean',
      description: 'Habilita o botão de fechar/dispensar na lateral direita.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: 'boolean',
      description: 'Habilita, desabilita ou substitui o ícone do alerta.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback acionado ao clicar no botão fechar.',
    },
  },
  args: {
    type: 'error',
    title: 'Falha na autenticação',
    description: 'E-mail ou senha incorretos. Por favor, tente novamente ou recupere seu acesso.',
    subtle: 'Código de erro: ERR_AUTH_INVALID_CREDS',
    dismissible: true,
    icon: true,
    theme: 'light',
  },
};

export default meta;
type Story = StoryObj<typeof FeedbackAlert>;

/**
 * 1ª História Mandatória: Documentação Rica e Completa do componente baseada no Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <FeedbackAlertDocumentationPage />,
};

/**
 * 2ª História Mandatória: Playground interativo com controles abrangentes.
 */
export const Playground: Story = {
  render: (args) => (
    <div
      style={{
        padding: '32px',
        borderRadius: '16px',
        backgroundColor: args.theme === 'dark' ? '#1E293B' : '#F8FAFC',
        border: `1px solid ${args.theme === 'dark' ? '#334155' : '#E2E8F0'}`,
        maxWidth: '720px',
        margin: '0 auto',
      }}
    >
      <FeedbackAlert {...args} />
    </div>
  ),
  args: {
    type: 'info',
    title: 'Atualização do Sistema Unooria',
    description: 'Experimente alterar os controles na barra inferior do Storybook para testar variantes, temas e comportamentos.',
    subtle: 'Versão estável 4.10.0 disponível.',
    dismissible: true,
    icon: true,
    theme: 'light',
  },
};

/**
 * 3ª História Mandatória: Todas as Severidades do Figma (Error, Warning, Success, Info).
 */
export const TodasSeveridades: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
      <FeedbackAlert
        type="error"
        title="Error (Erro Crítico)"
        description="Não foi possível concluir a transação financeira. O gateway reportou recusa temporária."
        subtle="Transação ID: #TX-984214"
        dismissible
      />
      <FeedbackAlert
        type="warning"
        title="Warning (Aviso Preventivo)"
        description="Seu plano de armazenamento atinge a capacidade máxima em aproximadamente 3 dias."
        subtle="Consumo atual: 94 GB de 100 GB"
        dismissible
      />
      <FeedbackAlert
        type="success"
        title="Success (Sucesso / Confirmação)"
        description="O perfil da empresa e os dados fiscais foram atualizados e sincronizados com a Receita."
        subtle="Validação realizada com sucesso."
        dismissible
      />
      <FeedbackAlert
        type="info"
        title="Info (Informativo / Comunicado)"
        description="Uma nova funcionalidade de relatórios analíticos foi habilitada para sua conta."
        subtle="Explore o novo menu no canto superior esquerdo."
        dismissible
      />
    </div>
  ),
};

/**
 * 4ª História Mandatória: Alerta Dispensável com gerenciamento interativo de estado.
 */
export const Dispensavel: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      {
        id: 'alert-1',
        type: 'warning' as FeedbackAlertType,
        title: 'Aviso de Manutenção Programada',
        description: 'Os servidores passarão por otimização neste sábado às 23h00 (BRT). Duração estimada de 15 minutos.',
      },
      {
        id: 'alert-2',
        type: 'info' as FeedbackAlertType,
        title: 'Nova Integração com WhatsApp Business',
        description: 'Conecte múltiplos canais de atendimento em poucos cliques na aba de canais.',
      },
    ]);

    const removeAlert = (id: string) => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    };

    const resetAlerts = () => {
      setAlerts([
        {
          id: 'alert-1',
          type: 'warning',
          title: 'Aviso de Manutenção Programada',
          description: 'Os servidores passarão por otimização neste sábado às 23h00 (BRT). Duração estimada de 15 minutos.',
        },
        {
          id: 'alert-2',
          type: 'info',
          title: 'Nova Integração com WhatsApp Business',
          description: 'Conecte múltiplos canais de atendimento em poucos cliques na aba de canais.',
        },
      ]);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
            Alertas ativos: <strong>{alerts.length}</strong>
          </span>
          {alerts.length < 2 && (
            <button
              type="button"
              onClick={resetAlerts}
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

        {alerts.map((a) => (
          <FeedbackAlert
            key={a.id}
            type={a.type}
            title={a.title}
            description={a.description}
            dismissible
            onDismiss={() => removeAlert(a.id)}
          />
        ))}

        {alerts.length === 0 && (
          <div
            style={{
              padding: '24px',
              textAlign: 'center',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px dashed #CBD5E1',
              color: '#64748B',
              fontSize: '14px',
            }}
          >
            Todos os alertas foram dispensados. Clique no botão acima para restaurá-los.
          </div>
        )}
      </div>
    );
  },
};

/**
 * 5ª História Mandatória: Com Ação Contextual Integrada para recuperação ou ação imediata.
 */
export const ComAcaoContextual: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '720px' }}>
      {/* Exemplo 1: Erro com Ação de Tentar Novamente */}
      <FeedbackAlert
        type="error"
        title="Falha na sincronização de dados"
        description="Não foi possível carregar a lista atualizada de clientes devido a uma instabilidade momentânea na conexão."
        dismissible
        action={
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => alert('Tentando sincronizar novamente...')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #C11414',
                backgroundColor: '#C11414',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Tentar Novamente
            </button>
            <button
              type="button"
              onClick={() => alert('Abrindo diagnóstico de rede...')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Ver Diagnóstico
            </button>
          </div>
        }
      />

      {/* Exemplo 2: Aviso com Upgrade de Plano */}
      <FeedbackAlert
        type="warning"
        title="Limite de mensagens WhatsApp atingido"
        description="Você atingiu o limite mensal de 10.000 mensagens automáticas incluídas no plano Starter."
        dismissible
        action={
          <button
            type="button"
            onClick={() => alert('Redirecionando para página de planos...')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #B73506',
              backgroundColor: '#B73506',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Fazer Upgrade para Plano Pro
          </button>
        }
      />
    </div>
  ),
};

/**
 * 6ª História Mandatória: Simulador Contextual de Tela de Autenticação / Login.
 */
export const SimuladorFormularioLogin: Story = {
  render: () => {
    const [email, setEmail] = useState('usuario@empresa.com.br');
    const [password, setPassword] = useState('******');
    const [showError, setShowError] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setShowError(true);
    };

    return (
      <div
        style={{
          maxWidth: '440px',
          margin: '0 auto',
          padding: '32px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          fontFamily: 'var(--unooria-font-sans, sans-serif)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#006BFF',
              color: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              fontSize: '22px',
              fontWeight: 700,
            }}
          >
            U
          </div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 700, color: '#1E293B' }}>
            Acessar Plataforma Unooria
          </h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
            Entre com suas credenciais corporativas
          </p>
        </div>

        {/* FeedbackAlert Contextual de Erro de Autenticação */}
        {showError && (
          <div style={{ marginBottom: '20px' }}>
            <FeedbackAlert
              type="error"
              title="Credenciais Inválidas"
              description="A senha informada não confere com o e-mail cadastrado. Após 3 tentativas incorretas sua conta será temporariamente bloqueada."
              subtle="Tentativa 2 de 3."
              dismissible
              onDismiss={() => setShowError(false)}
              action={
                <button
                  type="button"
                  onClick={() => alert('Redirecionando para recuperação de senha...')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #C11414',
                    backgroundColor: '#FFFFFF',
                    color: '#C11414',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Esqueci minha senha
                </button>
              }
            />
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label
              htmlFor="login-email"
              style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}
            >
              E-mail corporativo
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}
            >
              Senha de acesso
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: '8px',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#006BFF',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          >
            Entrar na Conta
          </button>
        </form>
      </div>
    );
  },
};

/**
 * Modo Escuro (Dark Mode) Isolado em todas as severidades.
 */
export const ModoEscuro: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#1E293B',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '720px',
      }}
    >
      <FeedbackAlert
        theme="dark"
        type="error"
        title="Dark Mode • Error"
        description="Falha crítica de autenticação com superfície adaptada para contraste no tema escuro."
        dismissible
      />
      <FeedbackAlert
        theme="dark"
        type="warning"
        title="Dark Mode • Warning"
        description="Atenção aos prazos e faturas em atraso no ambiente com tema escuro."
        dismissible
      />
      <FeedbackAlert
        theme="dark"
        type="success"
        title="Dark Mode • Success"
        description="Operação e sincronização efetuadas com sucesso no tema escuro."
        dismissible
      />
      <FeedbackAlert
        theme="dark"
        type="info"
        title="Dark Mode • Info"
        description="Comunicado informativo exibido com clareza visual e conforto óptico noturno."
        dismissible
      />
    </div>
  ),
};

/**
 * Comparativo Lado a Lado dos Temas Light e Dark.
 */
export const ComparacaoTemasLightDark: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
        maxWidth: '1200px',
      }}
    >
      {/* Light Theme */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h4 style={{ margin: '0 0 8px 0', color: '#0F172A', fontSize: '16px', fontWeight: 700 }}>
          ☀️ Light Mode (Tema Claro)
        </h4>
        <FeedbackAlert
          theme="light"
          type="error"
          title="Erro de Validação"
          description="Fundo translúcido rgba(227, 26, 26, 0.1) e texto #C11414."
          dismissible
        />
        <FeedbackAlert
          theme="light"
          type="warning"
          title="Alerta Preventivo"
          description="Fundo translúcido rgba(249, 118, 7, 0.1) e texto #B73506."
          dismissible
        />
        <FeedbackAlert
          theme="light"
          type="success"
          title="Operação Concluída"
          description="Fundo translúcido rgba(1, 181, 116, 0.1) e texto #008257."
          dismissible
        />
        <FeedbackAlert
          theme="light"
          type="info"
          title="Informativo Geral"
          description="Fundo translúcido rgba(0, 134, 255, 0.1) e texto #005CE6."
          dismissible
        />
      </div>

      {/* Dark Theme */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#1E293B',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h4 style={{ margin: '0 0 8px 0', color: '#F8FAFC', fontSize: '16px', fontWeight: 700 }}>
          🌙 Dark Mode (Tema Escuro)
        </h4>
        <FeedbackAlert
          theme="dark"
          type="error"
          title="Erro de Validação"
          description="Fundo translúcido rgba(227, 26, 26, 0.15) e texto #FF6A6A."
          dismissible
        />
        <FeedbackAlert
          theme="dark"
          type="warning"
          title="Alerta Preventivo"
          description="Fundo translúcido rgba(249, 118, 7, 0.15) e texto #F97607."
          dismissible
        />
        <FeedbackAlert
          theme="dark"
          type="success"
          title="Operação Concluída"
          description="Fundo translúcido rgba(1, 181, 116, 0.15) e texto #01B574."
          dismissible
        />
        <FeedbackAlert
          theme="dark"
          type="info"
          title="Informativo Geral"
          description="Fundo translúcido rgba(0, 134, 255, 0.15) e texto #0086FF."
          dismissible
        />
      </div>
    </div>
  ),
};

/**
 * Variações com Ícone Oculto (icon={false}) e Ícone Customizado.
 */
export const VariacoesDeIcone: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
      <FeedbackAlert
        type="info"
        title="Ícone Padrão Nativo (icon = true)"
        description="Renderiza automaticamente o ícone SVG correspondente à variante 'info'."
        icon={true}
      />
      <FeedbackAlert
        type="info"
        title="Sem Ícone (icon = false)"
        description="Oculta o slot do ícone, aproveitando toda a largura para o texto e mantendo o alinhamento."
        icon={false}
      />
      <FeedbackAlert
        type="success"
        title="Ícone Customizado de Segurança (Escudo)"
        description="Substitui o ícone nativo por um componente ReactNode SVG customizado."
        icon={<ShieldCheckIcon />}
      />
      <FeedbackAlert
        type="warning"
        title="Ícone Customizado de Autenticação (Chave)"
        description="Ícone específico para alertas relacionados a tokens e senhas."
        icon={<KeyIcon />}
      />
    </div>
  ),
};
