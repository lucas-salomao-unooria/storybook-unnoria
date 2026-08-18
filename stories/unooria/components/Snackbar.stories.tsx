import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from '../../../src/unooria/components/Snackbar/Snackbar';
import { SnackbarProvider, useSnackbar } from '../../../src/unooria/components/Snackbar/SnackbarProvider';
import { Icon } from '../../../src/unooria/components/Icon/Icon';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/Snackbar/Snackbar.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Subcomponente de demonstração para o simulador interativo de toasts
 */
const ToastTriggerSimulator: React.FC = () => {
  const { snackbar } = useSnackbar();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <button
        type="button"
        onClick={() =>
          snackbar.success(
            'Progresso salvo com sucesso',
            'Suas alterações foram sincronizadas na nuvem.',
            { actionLabel: 'Desfazer', onAction: () => alert('Ação desfeita!') }
          )
        }
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#01B574',
          color: '#FFFFFF',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <Icon name="check_circle" size="xs" color="#FFFFFF" />
        <span>Disparar Sucesso</span>
      </button>

      <button
        type="button"
        onClick={() =>
          snackbar.warning(
            'Atenção ao prazo de envio',
            'O questionário encerra em 15 minutos.',
            { actionLabel: 'Ver prazo' }
          )
        }
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#F97607',
          color: '#FFFFFF',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <Icon name="error" size="xs" color="#FFFFFF" />
        <span>Disparar Atenção</span>
      </button>

      <button
        type="button"
        onClick={() =>
          snackbar.error(
            'Falha na conexão',
            'Não foi possível salvar o arquivo. Tente novamente.',
            { actionLabel: 'Reconectar' }
          )
        }
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#E31A1A',
          color: '#FFFFFF',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <Icon name="cancel" size="xs" color="#FFFFFF" />
        <span>Disparar Erro</span>
      </button>

      <button
        type="button"
        onClick={() =>
          snackbar.info(
            'Nova versão disponível',
            'Uma nova atualização do sistema está pronta para uso.',
            { actionLabel: 'Atualizar' }
          )
        }
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#0086FF',
          color: '#FFFFFF',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <Icon name="info" size="xs" color="#FFFFFF" />
        <span>Disparar Info</span>
      </button>
    </div>
  );
};

/**
 * Página principal de documentação rica do componente Snackbar (Padrão Ouro)
 */
const SnackbarDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Feedback & Notificações"
        title="Snackbar"
        description="O Snackbar fornece feedback rápido, discreto e temporário ao usuário em resposta a uma ação (como salvar ou excluir um item), desaparecendo automaticamente após alguns segundos sem interromper o fluxo de trabalho."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 6029:1314)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 6029:1314)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design e proporções exatas conforme especificadas na prancha oficial do Figma para o componente Snackbar.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=6029-1314&m=dev"
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
              Snackbar
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475157', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>O que são:</strong> O Snackbar é um componente visual utilizado para
                fornecer feedback rápido e temporário ao usuário em resposta a uma ação, como salvar ou excluir um item.
                Ele aparece de forma discreta, geralmente na parte superior ou inferior da tela, e desaparece automaticamente
                após alguns segundos, sem exigir interação direta do usuário.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>Exemplo visual:</strong> Em uma plataforma de ensino online, após o aluno
                completar uma lição, um Snackbar pode aparecer no canto inferior da tela com a mensagem{' '}
                <em>"Progresso salvo com sucesso"</em> e um botão opcional <em>"Desfazer"</em>.
              </p>
            </div>
          </div>

          {/* Variantes Figma Desktop (408px) e Mobile (293px) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', borderTop: '1px solid #E4E8E9', paddingTop: '32px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#7C8E94', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
                Formato Desktop (408px × 64px - Linha Única)
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Snackbar
                  severity="success"
                  size="desktop"
                  title="Progresso salvo com sucesso"
                  description="Suas alterações já estão sincronizadas."
                  actionLabel="Desfazer"
                  onAction={() => {}}
                  onClose={() => {}}
                />
                <Snackbar
                  severity="danger"
                  size="desktop"
                  title="Erro ao salvar atividade"
                  description="Verifique a sua conexão de rede."
                  actionLabel="Tentar de novo"
                  onAction={() => {}}
                  onClose={() => {}}
                />
              </div>
            </div>

            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#7C8E94', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
                Formato Mobile (293px × 106px - Layout Empilhado)
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Snackbar
                  severity="warning"
                  size="mobile"
                  title="Atenção ao prazo"
                  description="A entrega encerra em breve."
                  actionLabel="Ver detalhes"
                  onAction={() => {}}
                  onClose={() => {}}
                />
                <Snackbar
                  severity="info"
                  size="mobile"
                  title="Nova notificação"
                  description="Seu tutor enviou um feedback."
                  actionLabel="Abrir"
                  onAction={() => {}}
                  onClose={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: ANATOMIA E TABELA DE SEVERIDADES
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Anatomia das 4 Severidades Oficiais"
          description="Cada severidade utiliza badges circulares de 32x32px com 10% de opacidade e ícones do Material Symbols."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {[
            {
              type: 'Success',
              icon: 'check_circle',
              color: '#01B574',
              token: '--unooria-color-success-500',
              bgToken: '--unooria-color-opacity-success-100',
              desc: 'Confirmação de ações bem-sucedidas ou salvamentos automáticos.',
            },
            {
              type: 'Warning',
              icon: 'error',
              color: '#F97607',
              token: '--unooria-color-warning-500',
              bgToken: '--unooria-color-opacity-warning-100',
              desc: 'Avisos e precauções que merecem atenção do usuário.',
            },
            {
              type: 'Danger (Error)',
              icon: 'cancel',
              color: '#E31A1A',
              token: '--unooria-color-danger-600',
              bgToken: '--unooria-color-opacity-danger-100',
              desc: 'Falhas de sistema, erros de validação ou operações destrutivas.',
            },
            {
              type: 'Info',
              icon: 'info',
              color: '#0086FF',
              token: '--unooria-color-info-500',
              bgToken: '--unooria-color-opacity-info-100',
              desc: 'Informativos de status, atualizações ou dicas contextuais.',
            },
          ].map((item) => (
            <div
              key={item.type}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E4E8E9',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: `rgba(${item.color === '#01B574' ? '1, 181, 116' : item.color === '#F97607' ? '249, 118, 7' : item.color === '#E31A1A' ? '227, 26, 26' : '0, 134, 255'}, 0.1)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                  }}
                >
                  <Icon name={item.icon} size="s" color="currentColor" />
                </div>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#22272A' }}>{item.type}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#475157', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              <code style={{ fontSize: '11px', color: item.color, backgroundColor: '#F8FAFC', padding: '4px 8px', borderRadius: '4px' }}>
                {item.token}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: SIMULADOR DE TOASTS EM TEMPO REAL
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Simulador Interativo de Toasts (Hook `useSnackbar`)"
          description="Clique nos botões abaixo para disparar notificações reais flutuantes com auto-dismiss no canto da tela."
        />

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9', padding: '24px' }}>
          <SnackbarProvider position="bottom-right">
            <ToastTriggerSimulator />
          </SnackbarProvider>
        </div>
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
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            transition: 'all 0.2s ease',
          }}
        >
          <Snackbar
            severity="success"
            title="Ação Concluída no Tema Ativo"
            description="Demonstração do contraste adaptativo de textos e ícones."
            actionLabel="OK"
            theme={activeTheme}
            onAction={() => {}}
            onClose={() => {}}
          />
          <Snackbar
            severity="warning"
            title="Atenção no Tema Ativo"
            description="Suporte a cores semânticas com fundo dark #22272A."
            theme={activeTheme}
            onClose={() => {}}
          />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: BOAS PRÁTICAS DE USO (DO & DON'T)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Diretrizes para escolher o componente correto de feedback."
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
                <strong>Use para feedbacks breves e temporários:</strong> Notificações de sucesso, salvamento em lote ou exclusões com "Desfazer".
              </li>
              <li>
                <strong>Mantenha títulos objetivos:</strong> Textos com até 1 linha de título e 2 linhas de descrição.
              </li>
              <li>
                <strong>Forneça botão de fechar:</strong> Permita que o usuário dispense a notificação antes do término do timer.
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
              <span>✕</span> O QUE EVITAR (DON'T)
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#991B1B', fontSize: '14px', lineHeight: 1.6 }}>
              <li>
                <strong>Não use para confirmações críticas que exigem bloqueio:</strong> Para exclusões permanentes de conta, use o <code>AlertBox</code> / <code>Modal</code>.
              </li>
              <li>
                <strong>Não use para avisos permanentes na página:</strong> Para mensagens que devem ficar fixas no layout, use o <code>FeedbackAlert</code>.
              </li>
              <li>
                <strong>Não sobrecarregue com múltiplos botões:</strong> Use no máximo 1 botão de ação textual ("Desfazer").
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
          description="Todas as propriedades suportadas pelo componente Snackbar."
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
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>severity</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'success' | 'warning' | 'danger' | 'info'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'success'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Severidade cromática do feedback.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>title</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>ReactNode</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>-</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Título principal em negrito (14px).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>description</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>ReactNode</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Mensagem explicativa (12px).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>actionLabel</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>string</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Texto do botão de ação opcional (ex: "Desfazer").</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>size</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'desktop' | 'mobile' | 'auto'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'auto'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Form factor visual do card.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>duration</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>5000</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tempo em ms para auto-dismiss (0 = permanente).</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>theme</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'light' | 'dark'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'light'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tema visual de contraste.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Snackbar> = {
  title: 'Plataforma Unooria/Componentes/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info'],
      description: 'Severidade do Snackbar',
      defaultValue: 'success',
    },
    title: {
      control: 'text',
      description: 'Título principal',
      defaultValue: 'Progresso salvo com sucesso',
    },
    description: {
      control: 'text',
      description: 'Descrição detalhada',
      defaultValue: 'Suas alterações foram sincronizadas na nuvem.',
    },
    actionLabel: {
      control: 'text',
      description: 'Rótulo da ação opcional',
      defaultValue: 'Desfazer',
    },
    size: {
      control: 'radio',
      options: ['desktop', 'mobile', 'auto'],
      description: 'Form factor visual',
      defaultValue: 'auto',
    },
    showClose: {
      control: 'boolean',
      description: 'Exibir botão de fechar',
      defaultValue: true,
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual',
      defaultValue: 'light',
    },
  },
  args: {
    severity: 'success',
    title: 'Progresso salvo com sucesso',
    description: 'Suas alterações foram sincronizadas na nuvem.',
    actionLabel: 'Desfazer',
    size: 'auto',
    showClose: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SnackbarDocumentationPage />,
};

/**
 * Playground interativo com 100% das props mapeadas em controles.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => (
    <div
      style={{
        padding: '32px',
        backgroundColor: args.theme === 'dark' ? '#181C1E' : '#F8FAFC',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Snackbar {...args} onClose={() => alert('Fechado!')} onAction={() => alert('Ação acionada!')} />
    </div>
  ),
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 6029:1314).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 6029:1314)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '440px' }}>
      <Snackbar
        severity="success"
        size="desktop"
        title="Progresso salvo com sucesso"
        description="Suas alterações já estão sincronizadas."
        actionLabel="Desfazer"
        onAction={() => {}}
        onClose={() => {}}
      />
      <Snackbar
        severity="warning"
        size="mobile"
        title="Atenção ao prazo de envio"
        description="O questionário encerra em 15 minutos."
        actionLabel="Ver detalhes"
        onAction={() => {}}
        onClose={() => {}}
      />
    </div>
  ),
};

/**
 * Matriz completa de todas as severidades.
 */
export const TodasSeveridades: Story = {
  name: 'Todas as Severidades',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '440px' }}>
      <Snackbar
        severity="success"
        title="Ação Concluída"
        description="Os dados foram atualizados com sucesso."
        actionLabel="Desfazer"
        onClose={() => {}}
      />
      <Snackbar
        severity="warning"
        title="Atenção Necessária"
        description="Você possui pendências cadastrais pendentes."
        actionLabel="Verificar"
        onClose={() => {}}
      />
      <Snackbar
        severity="danger"
        title="Erro no Processamento"
        description="Não foi possível concluir o download do relatório."
        actionLabel="Tentar de novo"
        onClose={() => {}}
      />
      <Snackbar
        severity="info"
        title="Novo Comunicado"
        description="O sistema entrará em manutenção às 22h."
        actionLabel="Saiba mais"
        onClose={() => {}}
      />
    </div>
  ),
};

/**
 * Formato Mobile (293px de largura com layout empilhado).
 */
export const FormatoMobile: Story = {
  name: 'Formato Mobile (293px)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Snackbar
        severity="success"
        size="mobile"
        title="Lição finalizada"
        description="Você acumulou +50 pontos de experiência."
        actionLabel="Continuar"
        onAction={() => {}}
        onClose={() => {}}
      />
    </div>
  ),
};
