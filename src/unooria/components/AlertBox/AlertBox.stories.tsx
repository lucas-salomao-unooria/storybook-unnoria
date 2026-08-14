import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AlertBox } from './AlertBox';

// Ícone customizado de exemplo para a estória CustomIcon
const CustomBellIcon = () => (
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

const meta: Meta<typeof AlertBox> = {
  title: 'Plataforma Unooria/Componentes/AlertBox',
  component: AlertBox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Variante de severidade do alerta.',
    },
    title: {
      control: 'text',
      description: 'Título principal do alerta.',
    },
    description: {
      control: 'text',
      description: 'Texto descritivo com detalhes adicionais.',
    },
    icon: {
      control: 'boolean',
      description: 'Habilita, desabilita ou substitui o ícone do alerta.',
    },
    isDismissible: {
      control: 'boolean',
      description: 'Permite que o usuário feche o alerta.',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema de cores do componente.',
    },
    onClose: {
      action: 'closed',
      description: 'Callback executado ao clicar no botão de fechar.',
    },
  },
  args: {
    variant: 'info',
    title: 'Atenção às atualizações do sistema',
    description: 'Uma nova versão do módulo de relatórios está disponível. Salve suas alterações antes de atualizar.',
    icon: true,
    isDismissible: true,
    theme: 'light',
  },
};

export default meta;
type Story = StoryObj<typeof AlertBox>;

/**
 * Uso padrão interativo com controles do Storybook.
 */
export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Informação do Sistema',
    description: 'Esta é uma mensagem informativa padrão para notificar sobre atualizações de status.',
    isDismissible: true,
    theme: 'light',
  },
};

/**
 * Exibição de todas as 4 variantes de severidade (Info, Success, Warning, Error) no tema Light.
 */
export const AllSeverities: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px' }}>
      <AlertBox
        variant="info"
        title="Informação"
        description="O sistema passará por uma manutenção programada neste final de semana."
        isDismissible
      />
      <AlertBox
        variant="success"
        title="Operação realizada com sucesso"
        description="Os dados do perfil foram atualizados e salvos com sucesso no servidor."
        isDismissible
      />
      <AlertBox
        variant="warning"
        title="Atenção necessária"
        description="Seu plano expira em 3 dias. Renove agora para evitar a suspensão dos serviços."
        isDismissible
      />
      <AlertBox
        variant="error"
        title="Falha na autenticação"
        description="Não foi possível conectar ao servidor. Verifique sua conexão de rede e tente novamente."
        isDismissible
      />
    </div>
  ),
};

/**
 * AlertBox com botão de fechar (isDismissible) e botão/link de ação personalizada.
 */
export const DismissibleAndActions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px' }}>
      <AlertBox
        variant="info"
        title="Nova atualização disponível"
        description="Versão 2.4.0 com melhorias de desempenho e correções de segurança."
        isDismissible
        actionButton={
          <button
            onClick={() => alert('Iniciando atualização...')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid var(--unooria-color-info-600, #006BFF)',
              backgroundColor: 'var(--unooria-color-info-600, #006BFF)',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Atualizar agora
          </button>
        }
      />

      <AlertBox
        variant="warning"
        title="Sessão prestes a expirar"
        description="Sua sessão expira em 2 minutos por inatividade."
        isDismissible
        actionButton={
          <button
            onClick={() => alert('Sessão renovada!')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid var(--unooria-color-warning-600, #DD5202)',
              backgroundColor: 'transparent',
              color: 'var(--unooria-color-warning-900, #7A230D)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Continuar conectado
          </button>
        }
      />
    </div>
  ),
};

/**
 * AlertBox sem ícone (`icon={false}`).
 */
export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    title: 'Alerta Simplificado',
    description: 'AlertBox exibido sem o ícone de severidade na lateral esquerda.',
    icon: false,
    isDismissible: true,
  },
};

/**
 * AlertBox com ícone customizado fornecido via ReactNode.
 */
export const CustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'Notificação Personalizada',
    description: 'Este alerta utiliza um ícone de sino customizado no lugar do ícone padrão.',
    icon: <CustomBellIcon />,
    isDismissible: true,
  },
};

/**
 * Exibição no Modo Escuro (Dark Mode).
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div
      style={{
        backgroundColor: '#22272A',
        padding: '24px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '640px',
      }}
    >
      <AlertBox
        theme="dark"
        variant="info"
        title="Informação (Dark Mode)"
        description="Mensagem informativa renderizada com cores e contraste ajustados para tema escuro."
        isDismissible
      />
      <AlertBox
        theme="dark"
        variant="success"
        title="Sucesso (Dark Mode)"
        description="Ação concluída com êxito no ambiente escuro."
        isDismissible
      />
      <AlertBox
        theme="dark"
        variant="warning"
        title="Aviso (Dark Mode)"
        description="Alerta de atenção configurado para o tema dark."
        isDismissible
      />
      <AlertBox
        theme="dark"
        variant="error"
        title="Erro (Dark Mode)"
        description="Mensagem crítica de erro estilizada para Dark Mode."
        isDismissible
      />
    </div>
  ),
};

/**
 * Comparação Lado a Lado dos Temas Light e Dark Mode em todas as severidades.
 */
export const LightAndDarkComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '1200px' }}>
      {/* Light Mode */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #CBD4D6',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h4 style={{ margin: '0 0 8px 0', fontFamily: 'sans-serif', color: '#536167', fontSize: '15px' }}>
          Light Mode (Tema Claro)
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
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h4 style={{ margin: '0 0 8px 0', fontFamily: 'sans-serif', color: '#A7B5B9', fontSize: '15px' }}>
          Dark Mode (Tema Escuro)
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
