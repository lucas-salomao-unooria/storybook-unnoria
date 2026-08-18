import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../../../src/unooria/components/Toggle/Toggle';
import '../../../src/unooria/components/Toggle/Toggle.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Painel de Configurações e Notificações de Exemplo
 */
const SettingsPanelDemo: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E4E8E9',
        padding: '32px',
        maxWidth: '560px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#22272A' }}>
          Preferências do Sistema
        </h4>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
          Gerencie permissões, notificações e métodos de segurança da sua conta.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Toggle
          size="md"
          checked={emailNotifications}
          onChange={setEmailNotifications}
          label="Notificações por E-mail"
          description="Receba resumos diários de atividades e novidades dos cursos."
        />

        <div style={{ height: '1px', backgroundColor: '#F1F5F9' }} />

        <Toggle
          size="md"
          checked={smsAlerts}
          onChange={setSmsAlerts}
          label="Alertas por SMS"
          description="Avisos urgentes sobre prazos de certificados e cobranças."
        />

        <div style={{ height: '1px', backgroundColor: '#F1F5F9' }} />

        <Toggle
          size="md"
          checked={twoFactorAuth}
          onChange={setTwoFactorAuth}
          label="Autenticação em Duas Etapas (2FA)"
          description="Exigir código de segurança ao fazer login em novos dispositivos."
        />

        <div style={{ height: '1px', backgroundColor: '#F1F5F9' }} />

        <Toggle
          size="md"
          checked={autoSave}
          onChange={setAutoSave}
          label="Salvamento Automático em Nuvem"
          description="Grava o progresso das aulas e exercícios a cada minuto."
        />

        <div style={{ height: '1px', backgroundColor: '#F1F5F9' }} />

        <Toggle
          size="md"
          disabled
          checked={false}
          label="Integração Corporativa SAML (Desativado)"
          description="Disponível apenas para planos Enterprise."
        />
      </div>
    </div>
  );
};

/**
 * Página principal de documentação rica do componente Toggle (Padrão Ouro)
 */
const ToggleDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Seleção & Controles"
        title="Toggle"
        description="O Toggle (Switch / Interruptor) permite ao usuário alternar instantaneamente entre dois estados binários (ativado/desativado) com feedback visual claro, animação suave e transição fluida."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 6034:914)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 6034:914)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design, proporções e matriz das 12 variantes exatas conforme especificadas na prancha oficial do Figma.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=6034-914&m=dev"
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

        {/* CONTAINER DO FIGMA (Fundo #22272A) */}
        <div
          style={{
            backgroundColor: '#22272A',
            borderRadius: '24px',
            padding: '48px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          {/* Header do Frame Figma */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '18px', color: '#CBD4D6', fontWeight: 400 }}>Foundations</span>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.2 }}>
              Toggle
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#CBD4D6', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#FFFFFF' }}>O que são:</strong> Um toggle é um componente de interface que permite ao usuário alternar entre dois estados.
                São usados para permitir mudanças rápidas e intuitivas, garantindo que o usuário compreenda o impacto imediato de suas ações.
                É fundamental que o toggle tenha uma indicação visual clara dos estados, como cores distintas e animações suaves, para reforçar a interação.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#FFFFFF' }}>Exemplo visual:</strong> Em um painel de configurações, um toggle pode ser usado para ativar ou desativar notificações.
                Quando "ativado", o botão desliza para a direita e muda de cor. Ao "desativar", ele retorna à esquerda e volta à cor original. Isso dá um feedback visual claro da ação.
              </p>
            </div>
          </div>

          {/* Matriz das 12 Variantes do Figma */}
          <div style={{ borderTop: '1px solid #3D4448', paddingTop: '28px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#CBD4D6', textTransform: 'uppercase', marginBottom: '20px', display: 'block' }}>
              Catálogo das 12 Variantes Oficiais do Figma (Node 6034:960)
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {/* Coluna 1: Tamanho XS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#7FA5E2' }}>Tamanho XS (38x20px)</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#CBD4D6' }}>OFF (Default)</span>
                  <Toggle size="xs" checked={false} theme="dark" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#CBD4D6' }}>ON (Default)</span>
                  <Toggle size="xs" checked={true} theme="dark" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#CBD4D6' }}>OFF (Disabled)</span>
                  <Toggle size="xs" checked={false} disabled theme="dark" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#CBD4D6' }}>ON (Disabled)</span>
                  <Toggle size="xs" checked={true} disabled theme="dark" />
                </div>
              </div>

              {/* Coluna 2: Tamanho LG */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#7FA5E2' }}>Tamanho LG (54x28px)</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#CBD4D6' }}>OFF (Default)</span>
                  <Toggle size="lg" checked={false} theme="dark" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#CBD4D6' }}>ON (Default)</span>
                  <Toggle size="lg" checked={true} theme="dark" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#CBD4D6' }}>OFF (Disabled)</span>
                  <Toggle size="lg" checked={false} disabled theme="dark" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#CBD4D6' }}>ON (Disabled)</span>
                  <Toggle size="lg" checked={true} disabled theme="dark" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: MATRIZ DE TAMANHOS (XS, MD, LG)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Escala Oficial de Tamanhos"
          description="3 tamanhos para acomodar desde tabelas densas até telas de configurações."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E4E8E9', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF' }}>XS • 38×20px (Padrão)</span>
            <Toggle size="xs" defaultChecked label="Tamanho XS" description="Knob de 16px" />
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E4E8E9', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF' }}>MD • 46×24px (Intermediário)</span>
            <Toggle size="md" defaultChecked label="Tamanho MD" description="Knob de 20px" />
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E4E8E9', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF' }}>LG • 54×28px (Expandido)</span>
            <Toggle size="lg" defaultChecked label="Tamanho LG" description="Knob de 24px" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: PAINEL DE CONFIGURAÇÕES
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Painel de Preferências e Configurações"
          description="Exemplo prático de lista de opções com labels, descrições e estados ativos/desabilitados."
        />

        <SettingsPanelDemo />
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
            gap: '32px',
            flexWrap: 'wrap',
            transition: 'all 0.2s ease',
          }}
        >
          <Toggle
            theme={activeTheme}
            size="md"
            defaultChecked={false}
            label="Modo Não Perturbe"
            description="Silencia todas as notificações sonoras."
          />
          <Toggle
            theme={activeTheme}
            size="md"
            defaultChecked={true}
            label="Sincronização Automática"
            description="Atualiza dados em segundo plano."
          />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: BOAS PRÁTICAS DE USO (DO & DON'T)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Diretrizes para garantir a melhor experiência na utilização de switches."
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
                <strong>Use para ações de efeito imediato:</strong> Toggles devem aplicar alterações sem necessidade de clicar em "Salvar".
              </li>
              <li>
                <strong>Forneça labels afirmativos e claros:</strong> Ex: "Ativar notificações" em vez de "Notificações ligadas/desligadas?".
              </li>
              <li>
                <strong>Inclua descrições quando a ação for complexa:</strong> Ajuda o usuário a entender o impacto da alteração.
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
                <strong>Não use Toggle dentro de formulários que exigem confirmação com botão de submit:</strong> Nesses casos, prefira `Checkbox`.
              </li>
              <li>
                <strong>Não use texto que mude dinamicamente dentro do label (ex: "Ligado" / "Desligado"):</strong> A própria posição do knob já indica o estado.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Toggle> = {
  title: 'Plataforma Unooria/Componentes/Toggle',
  component: Toggle,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'md', 'lg'],
      description: 'Tamanho visual do componente',
      defaultValue: 'xs',
    },
    checked: {
      control: 'boolean',
      description: 'Estado ativado/desativado',
    },
    label: {
      control: 'text',
      description: 'Rótulo textual associado',
    },
    description: {
      control: 'text',
      description: 'Descrição de apoio abaixo do rótulo',
    },
    labelPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Posição do rótulo',
      defaultValue: 'right',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitar componente',
      defaultValue: false,
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual de contraste',
      defaultValue: 'light',
    },
  },
  args: {
    size: 'xs',
    label: 'Ativar Notificações',
    description: 'Receba alertas instantâneos no navegador.',
    labelPosition: 'right',
    disabled: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ToggleDocumentationPage />,
};

/**
 * Playground interativo com 100% das props mapeadas em controles.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => {
    const [isChecked, setIsChecked] = useState<boolean>(args.checked ?? true);
    return (
      <div style={{ maxWidth: '400px', padding: '24px', backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF', borderRadius: '16px' }}>
        <Toggle {...args} checked={isChecked} onChange={setIsChecked} />
      </div>
    );
  },
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 6034:914).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 6034:914)',
  render: () => (
    <div
      style={{
        backgroundColor: '#22272A',
        borderRadius: '24px',
        padding: '48px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
        maxWidth: '560px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '18px', color: '#CBD4D6' }}>Foundations</span>
        <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          Toggle
        </h1>
        <p style={{ margin: 0, fontSize: '13px', color: '#CBD4D6', lineHeight: 1.6 }}>
          Um toggle é um componente de interface que permite ao usuário alternar entre dois estados.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        <Toggle size="xs" checked={false} theme="dark" label="XS Desativado" />
        <Toggle size="xs" checked={true} theme="dark" label="XS Ativado" />
        <Toggle size="lg" checked={false} theme="dark" label="LG Desativado" />
        <Toggle size="lg" checked={true} theme="dark" label="LG Ativado" />
      </div>
    </div>
  ),
};

/**
 * Todos os Tamanhos e Estados
 */
export const TodosOsTamanhosEEstados: Story = {
  name: 'Todos os Tamanhos e Estados',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '420px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B' }}>Tamanho XS (38x20px)</span>
        <Toggle size="xs" defaultChecked={false} label="Desativado" />
        <Toggle size="xs" defaultChecked={true} label="Ativado" />
        <Toggle size="xs" disabled defaultChecked={false} label="Desabilitado OFF" />
        <Toggle size="xs" disabled defaultChecked={true} label="Desabilitado ON" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B' }}>Tamanho LG (54x28px)</span>
        <Toggle size="lg" defaultChecked={false} label="Desativado" />
        <Toggle size="lg" defaultChecked={true} label="Ativado" />
        <Toggle size="lg" disabled defaultChecked={false} label="Desabilitado OFF" />
        <Toggle size="lg" disabled defaultChecked={true} label="Desabilitado ON" />
      </div>
    </div>
  ),
};

/**
 * Painel de Configurações
 */
export const PainelDeConfiguracoes: Story = {
  name: 'Painel de Configurações',
  render: () => <SettingsPanelDemo />,
};
