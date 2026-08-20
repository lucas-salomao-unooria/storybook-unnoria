import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AlertBox } from '../../../src/unooria/components/AlertBox/AlertBox';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

/**
 * Página de Documentação Rica do AlertBox baseada no Padrão Ouro do Design System Unooria
 */
const AlertBoxDocumentationPage = () => {
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleAction = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const propsTableData = [
    {
      name: 'variant',
      type: "'info' | 'success' | 'warning' | 'danger' | 'error'",
      default: "'info'",
      desc: 'Define a severidade semântica, o ícone no badge circular e o esquema de cores.',
    },
    {
      name: 'device',
      type: "'desktop' | 'mobile' | 'auto'",
      default: "'desktop'",
      desc: 'Define o formato do contêiner (Desktop: 436px com botões lado a lado; Mobile: 355px com botões empilhados).',
    },
    {
      name: 'title',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Título principal em destaque (Bold 20px no Desktop / 16px no Mobile), 100% centralizado.',
    },
    {
      name: 'description',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Texto descritivo do alerta (Regular 16px no Desktop / 14px no Mobile), 100% centralizado.',
    },
    {
      name: 'primaryAction',
      type: 'AlertBoxActionConfig | React.ReactNode',
      default: 'undefined',
      desc: 'Ação primária destacada (Filled). No Desktop fica à direita; no Mobile fica no topo.',
    },
    {
      name: 'secondaryAction',
      type: 'AlertBoxActionConfig | React.ReactNode',
      default: 'undefined',
      desc: 'Ação secundária (Subtle / Ghost). No Desktop fica à esquerda; no Mobile fica abaixo.',
    },
    {
      name: 'icon',
      type: 'React.ReactNode | boolean',
      default: 'true',
      desc: 'Exibe o ícone oficial da severidade no badge circular de 48x48px ou renderiza um ícone customizado.',
    },
    {
      name: 'theme',
      type: "'dark' | 'light'",
      default: "'dark'",
      desc: 'Tema visual da superfície. Dark usa fundo #22272A com backdrop blur 45px (padrão Figma).',
    },
    {
      name: 'isDismissible',
      type: 'boolean',
      default: 'false',
      desc: 'Quando ativado, exibe um botão de fechar no canto superior direito do card.',
    },
    {
      name: 'actions',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Substitui a área de botões padrão por elementos customizados.',
    },
  ];

  return (
    <UnooriaDocShell>
      {/* 1. Cabeçalho Oficial */}
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Feedback & Diálogos"
        title="AlertBox"
        description="O Alert Box é um componente de interface que notifica o usuário sobre informações críticas ou ações que exigem decisão imediata, como confirmações de saída, avisos de perda de dados ou erros de sistema. Projetado com contraste forte, badge de ícone no topo e botões destacados para Desktop e Mobile."
      />

      {feedbackMessage && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            padding: '12px 20px',
            backgroundColor: '#00A369',
            color: '#FFFFFF',
            borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            zIndex: 9999,
            fontWeight: 600,
          }}
        >
          {feedbackMessage}
        </div>
      )}

      {/* 2. Visão Geral & O que são */}
      <UnooriaDocSectionHeader
        title="1. Visão Geral & Conceito de Design"
        description="Diretrizes conceituais e motivos de uso extraídos da especificação oficial do Figma."
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
            backgroundColor: 'var(--unooria-color-neutral-900, #22272A)',
            color: '#FFFFFF',
            padding: 24,
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#6487C2', fontSize: 16 }}>🎯 O que são</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#D4D4D4' }}>
            O <strong>Alert Box</strong> é um componente de interface que aparece para notificar o usuário sobre informações
            importantes ou ações que exigem uma decisão imediata, como confirmações ou avisos de erro.
            Diferente de notificações periféricas como Snackbars ou Toasts, o Alert Box atua como ponto focal de decisão até que o usuário responda ou reconheça a mensagem.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--unooria-color-neutral-900, #22272A)',
            color: '#FFFFFF',
            padding: 24,
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#0086FF', fontSize: 16 }}>📱 Desktop vs. Mobile</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#D4D4D4' }}>
            No <strong>Desktop</strong>, o contêiner possui <code>436px</code> de largura e organiza as ações lado a lado
            (botões compactos de 36px). No <strong>Mobile</strong>, o contêiner tem <code>355px</code> e empilha as ações
            verticalmente em botões com altura touch-friendly de <code>48px</code> (ação primária no topo).
          </p>
        </div>
      </div>

      {/* 3. Figma & Especificações */}
      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Links diretos para inspeção no Figma Dev Mode e identificadores oficiais dos nós de design."
      />
      <div
        style={{
          backgroundColor: '#1E232A',
          border: '1px solid #2F3842',
          borderRadius: 8,
          padding: 20,
          marginBottom: 32,
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 12, color: '#8FAFE5', textTransform: 'uppercase', fontWeight: 600 }}>
              Figma Frame Node ID
            </span>
            <div style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 700, fontFamily: 'monospace' }}>
              17025:277
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #3A4552', paddingLeft: 16 }}>
            <span style={{ fontSize: 12, color: '#8FAFE5', textTransform: 'uppercase', fontWeight: 600 }}>
              Component Set ID
            </span>
            <div style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 700, fontFamily: 'monospace' }}>
              1349:4736 (Alert Box)
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <a
              href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=17025-277&m=dev"
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

      {/* 4. Anatomia do Componente */}
      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Estrutura e distribuição visual dos elementos do AlertBox."
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          padding: 32,
          backgroundColor: '#15181B',
          borderRadius: 12,
          marginBottom: 32,
        }}
      >
        <AlertBox
          variant="danger"
          device="desktop"
          title="Você tem alterações não salvas."
          description="Se sair agora, suas modificações serão perdidas. Deseja sair sem salvar?"
          secondaryAction={{
            label: 'Cancelar',
            onClick: () => handleAction('Ação Cancelar clicada'),
          }}
          primaryAction={{
            label: 'Sair sem salvar',
            onClick: () => handleAction('Ação Sair sem salvar clicada'),
          }}
        />
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
          <span style={{ fontSize: 13, color: '#E31A1A' }}>① Badge Circular de Ícone (48x48px)</span>
          <span style={{ fontSize: 13, color: '#FFFFFF' }}>② Título em Destaque (Bold 20px)</span>
          <span style={{ fontSize: 13, color: '#D4D4D4' }}>③ Corpo Descritivo (Regular 16px)</span>
          <span style={{ fontSize: 13, color: '#8FAFE5' }}>④ Botão Secundário / Cancelar (Subtle)</span>
          <span style={{ fontSize: 13, color: '#6487C2' }}>⑤ Botão Primário / Ação (Filled)</span>
        </div>
      </div>

      {/* 5. Matriz de Variantes & Dispositivos */}
      <UnooriaDocSectionHeader
        title="4. Matriz de Severidades e Dispositivos (Desktop & Mobile)"
        description="As 4 severidades oficiais (Danger, Info, Success, Warning) renderizadas nos dois formatos."
      />

      <h4 style={{ color: '#6487C2', margin: '24px 0 16px 0' }}>🖥️ Versão Desktop (436px)</h4>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 24,
          marginBottom: 40,
        }}
      >
        {/* Danger Desktop */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#E31A1A' }}>State = Danger (Desktop)</span>
          <AlertBox
            variant="danger"
            device="desktop"
            title="Você tem alterações não salvas."
            description="Se sair agora, suas modificações serão perdidas. Deseja sair sem salvar?"
            secondaryAction={{ label: 'Cancelar', onClick: () => handleAction('Cancelado') }}
            primaryAction={{ label: 'Sair sem salvar', onClick: () => handleAction('Confirmado') }}
          />
        </div>

        {/* Info Desktop */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0086FF' }}>State = Info (Desktop)</span>
          <AlertBox
            variant="info"
            device="desktop"
            title="Nova atualização disponível"
            description="Uma nova versão do sistema está pronta para instalação com melhorias de segurança."
            secondaryAction={{ label: 'Lembrar mais tarde', onClick: () => handleAction('Adiado') }}
            primaryAction={{ label: 'Atualizar agora', onClick: () => handleAction('Atualizando') }}
          />
        </div>

        {/* Success Desktop */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#00A369' }}>State = Success (Desktop)</span>
          <AlertBox
            variant="success"
            device="desktop"
            title="Exportação concluída com sucesso"
            description="O relatório financeiro consolidado foi gerado e está disponível para download."
            secondaryAction={{ label: 'Fechar', onClick: () => handleAction('Fechado') }}
            primaryAction={{ label: 'Baixar PDF', onClick: () => handleAction('Baixando PDF') }}
          />
        </div>

        {/* Warning Desktop */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#F97607' }}>State = Warning (Desktop)</span>
          <AlertBox
            variant="warning"
            device="desktop"
            title="Limite de armazenamento atingido"
            description="Seu plano atingiu 90% da cota contratada. Considere realizar um upgrade."
            secondaryAction={{ label: 'Ver detalhes', onClick: () => handleAction('Ver detalhes') }}
            primaryAction={{ label: 'Fazer Upgrade', onClick: () => handleAction('Upgrade') }}
          />
        </div>
      </div>

      <h4 style={{ color: '#6487C2', margin: '24px 0 16px 0' }}>📱 Versão Mobile (355px - Botões Empilhados de 48px)</h4>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          marginBottom: 40,
        }}
      >
        {/* Danger Mobile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#E31A1A' }}>State = Danger (Mobile)</span>
          <AlertBox
            variant="danger"
            device="mobile"
            title="Você tem alterações não salvas."
            description="Se sair agora, suas modificações serão perdidas. Deseja sair sem salvar?"
            primaryAction={{ label: 'Sair sem salvar', onClick: () => handleAction('Saindo') }}
            secondaryAction={{ label: 'Cancelar', onClick: () => handleAction('Cancelado') }}
          />
        </div>

        {/* Info Mobile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0086FF' }}>State = Info (Mobile)</span>
          <AlertBox
            variant="info"
            device="mobile"
            title="Você tem alterações não salvas."
            description="Se sair agora, suas modificações serão perdidas. Deseja sair sem salvar?"
            primaryAction={{ label: 'Text Button', onClick: () => handleAction('Confirmado') }}
            secondaryAction={{ label: 'Text Button', onClick: () => handleAction('Cancelado') }}
          />
        </div>

        {/* Success Mobile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#00A369' }}>State = Success (Mobile)</span>
          <AlertBox
            variant="success"
            device="mobile"
            title="Você tem alterações não salvas."
            description="Se sair agora, suas modificações serão perdidas. Deseja sair sem salvar?"
            primaryAction={{ label: 'Text Button', onClick: () => handleAction('Confirmado') }}
            secondaryAction={{ label: 'Text Button', onClick: () => handleAction('Cancelado') }}
          />
        </div>

        {/* Warning Mobile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#F97607' }}>State = Warning (Mobile)</span>
          <AlertBox
            variant="warning"
            device="mobile"
            title="Você tem alterações não salvas."
            description="Se sair agora, suas modificações serão perdidas. Deseja sair sem salvar?"
            primaryAction={{ label: 'Text Button', onClick: () => handleAction('Confirmado') }}
            secondaryAction={{ label: 'Text Button', onClick: () => handleAction('Cancelado') }}
          />
        </div>
      </div>

      {/* 6. Suporte a Temas (Light e Dark) */}
      <UnooriaDocSectionHeader
        title="5. Suporte a Temas (Light & Dark)"
        description="O AlertBox adapta sua superfície, contraste e botões de acordo com o tema da aplicação."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 24,
          marginBottom: 40,
        }}
      >
        {/* Dark Theme */}
        <div
          style={{
            padding: 32,
            backgroundColor: '#0F1215',
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>Tema Escuro (Dark - Padrão Figma)</span>
          <AlertBox
            theme="dark"
            variant="info"
            device="desktop"
            title="Modo Escuro Ativo"
            description="Superfície translúcida com backdrop-filter blur 45px e alto contraste."
            secondaryAction={{ label: 'Fechar' }}
            primaryAction={{ label: 'Confirmar' }}
          />
        </div>

        {/* Light Theme */}
        <div
          style={{
            padding: 32,
            backgroundColor: '#F5F8FC',
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: '#22272A' }}>Tema Claro (Light)</span>
          <AlertBox
            theme="light"
            variant="info"
            device="desktop"
            title="Modo Claro Ativo"
            description="Superfície sólida/branca calibrada com borda sutil e contraste WCAG AA."
            secondaryAction={{ label: 'Fechar' }}
            primaryAction={{ label: 'Confirmar' }}
          />
        </div>
      </div>

      {/* 7. Boas Práticas (Do's & Don'ts) */}
      <UnooriaDocSectionHeader
        title="6. Boas Práticas (Do's & Don'ts)"
        description="Recomendações essenciais para aplicação do AlertBox em fluxos de experiência do usuário."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          marginBottom: 40,
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
          <h4 style={{ color: '#00A369', margin: '0 0 12px 0', fontSize: 16 }}>✅ O que FAZER (Do&apos;s)</h4>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.6, color: '#E8F5EE' }}>
            <li>Utilize para ações críticas que demandam consentimento ou confirmação imediata.</li>
            <li>Forneça rótulos de botões claros e orientados à ação (ex: &quot;Sair sem salvar&quot;, &quot;Excluir conta&quot;).</li>
            <li>Utilize a variante <code>danger</code> para operações destrutivas e irreversíveis.</li>
            <li>Utilize o modo <code>device=&quot;mobile&quot;</code> em telas estreitas para botões de fácil toque (48px).</li>
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
          <h4 style={{ color: '#E31A1A', margin: '0 0 12px 0', fontSize: 16 }}>❌ O que NÃO FAZER (Don&apos;ts)</h4>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.6, color: '#FDECEC' }}>
            <li>Não utilize para feedbacks passivos ou temporários de 3 segundos (use Toasts).</li>
            <li>Não utilize textos longos ou parágrafos múltiplos no corpo do alerta.</li>
            <li>Não utilize como barra horizontal de notificação de topo (use FeedbackAlert / Banners).</li>
            <li>Evite usar rótulos ambíguos como &quot;Sim&quot; ou &quot;Não&quot; quando a ação puder ser explícita.</li>
          </ul>
        </div>
      </div>

      {/* 8. Tabela de Props API */}
      <UnooriaDocSectionHeader
        title="7. Tabela de Propriedades (Props API)"
        description="Especificação completa das propriedades aceitas pelo componente AlertBox."
      />
      <div style={{ overflowX: 'auto', marginBottom: 40 }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 14,
            textAlign: 'left',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #2F3842', backgroundColor: '#1E232A' }}>
              <th style={{ padding: '12px 16px', color: '#FFFFFF' }}>Propriedade</th>
              <th style={{ padding: '12px 16px', color: '#FFFFFF' }}>Tipo</th>
              <th style={{ padding: '12px 16px', color: '#FFFFFF' }}>Padrão</th>
              <th style={{ padding: '12px 16px', color: '#FFFFFF' }}>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {propsTableData.map((item, idx) => (
              <tr
                key={item.name}
                style={{
                  borderBottom: '1px solid #2F3842',
                  backgroundColor: idx % 2 === 0 ? '#15181B' : '#191D22',
                }}
              >
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#8FAFE5', fontWeight: 600 }}>
                  {item.name}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>
                  {item.type}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#D4D4D4' }}>
                  {item.default}
                </td>
                <td style={{ padding: '12px 16px', color: '#D4D4D4' }}>
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

// Configuração Meta do Storybook (Sem tags: ['autodocs'] conforme regra oficial)
const meta: Meta<typeof AlertBox> = {
  title: 'Plataforma Unooria/Componentes/AlertBox',
  component: AlertBox,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Severidade semântica do alerta',
    },
    device: {
      control: 'radio',
      options: ['desktop', 'mobile', 'auto'],
      description: 'Modo de dispositivo / layout visual',
    },
    theme: {
      control: 'radio',
      options: ['dark', 'light'],
      description: 'Tema visual da superfície',
    },
    title: {
      control: 'text',
      description: 'Título principal em negrito',
    },
    description: {
      control: 'text',
      description: 'Texto descritivo centralizado',
    },
    icon: {
      control: 'boolean',
      description: 'Exibe o ícone de severidade no badge circular',
    },
    isDismissible: {
      control: 'boolean',
      description: 'Exibe botão fechar no canto superior',
    },
  },
  args: {
    variant: 'danger',
    device: 'desktop',
    theme: 'dark',
    title: 'Você tem alterações não salvas.',
    description: 'Se sair agora, suas modificações serão perdidas. Deseja sair sem salvar?',
    icon: true,
    isDismissible: false,
  },
};

export default meta;

type Story = StoryObj<typeof AlertBox>;

/**
 * 📄 Documentação Completa (Padrão Ouro)
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AlertBoxDocumentationPage />,
};

/**
 * Playground interativo com controles reativos
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
        backgroundColor: args.theme === 'light' ? '#F0F4F8' : '#0F1215',
        borderRadius: 16,
        minHeight: 380,
      }}
    >
      <AlertBox
        {...args}
        secondaryAction={{
          label: 'Cancelar',
          onClick: () => alert('Ação Cancelar disparada'),
        }}
        primaryAction={{
          label: 'Confirmar',
          onClick: () => alert('Ação Confirmar disparada'),
        }}
      />
    </div>
  ),
};

/**
 * Todas as Severidades no Desktop
 */
export const TodasSeveridadesDesktop: Story = {
  name: '🖥️ Todas as Severidades (Desktop)',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: 32,
        padding: 24,
        backgroundColor: '#0F1215',
        borderRadius: 16,
      }}
    >
      <AlertBox
        variant="danger"
        device="desktop"
        title="Você tem alterações não salvas."
        description="Se sair agora, suas modificações serão perdidas. Deseja sair sem salvar?"
        secondaryAction={{ label: 'Cancelar' }}
        primaryAction={{ label: 'Sair sem salvar' }}
      />

      <AlertBox
        variant="info"
        device="desktop"
        title="Atualização de Segurança"
        description="Uma nova versão está disponível com correções importantes. Deseja reiniciar?"
        secondaryAction={{ label: 'Mais tarde' }}
        primaryAction={{ label: 'Reiniciar' }}
      />

      <AlertBox
        variant="success"
        device="desktop"
        title="Publicação Concluída"
        description="Seus componentes foram publicados com sucesso no repositório corporativo."
        secondaryAction={{ label: 'Ver log' }}
        primaryAction={{ label: 'Concluir' }}
      />

      <AlertBox
        variant="warning"
        device="desktop"
        title="Armazenamento Quase Cheio"
        description="Você utilizou 92% da sua cota disponível. Faça upgrade para evitar interrupções."
        secondaryAction={{ label: 'Ignorar' }}
        primaryAction={{ label: 'Fazer Upgrade' }}
      />
    </div>
  ),
};

/**
 * Todas as Severidades no Mobile
 */
export const TodasSeveridadesMobile: Story = {
  name: '📱 Todas as Severidades (Mobile)',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 32,
        padding: 24,
        backgroundColor: '#0F1215',
        borderRadius: 16,
      }}
    >
      <AlertBox
        variant="danger"
        device="mobile"
        title="Você tem alterações não salvas."
        description="Se sair agora, suas modificações serão perdidas. Deseja sair sem salvar?"
        primaryAction={{ label: 'Sair sem salvar' }}
        secondaryAction={{ label: 'Cancelar' }}
      />

      <AlertBox
        variant="info"
        device="mobile"
        title="Atualização de Segurança"
        description="Uma nova versão está disponível com correções importantes. Deseja reiniciar?"
        primaryAction={{ label: 'Reiniciar' }}
        secondaryAction={{ label: 'Mais tarde' }}
      />

      <AlertBox
        variant="success"
        device="mobile"
        title="Publicação Concluída"
        description="Seus componentes foram publicados com sucesso no repositório corporativo."
        primaryAction={{ label: 'Concluir' }}
        secondaryAction={{ label: 'Ver log' }}
      />

      <AlertBox
        variant="warning"
        device="mobile"
        title="Armazenamento Quase Cheio"
        description="Você utilizou 92% da sua cota disponível. Faça upgrade para evitar interrupções."
        primaryAction={{ label: 'Fazer Upgrade' }}
        secondaryAction={{ label: 'Ignorar' }}
      />
    </div>
  ),
};

/**
 * Comparativo de Temas Light e Dark
 */
export const ComparacaoTemas: Story = {
  name: '🌗 Comparativo de Temas (Light & Dark)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 32 }}>
      <div style={{ backgroundColor: '#0F1215', padding: 32, borderRadius: 16, textAlign: 'center' }}>
        <h4 style={{ color: '#FFFFFF', marginBottom: 20 }}>Dark Theme (Padrão Figma)</h4>
        <AlertBox
          theme="dark"
          variant="danger"
          device="desktop"
          title="Excluir Projeto Permanentemente?"
          description="Esta ação não poderá ser desfeita. Todos os arquivos e histórico serão removidos."
          secondaryAction={{ label: 'Cancelar' }}
          primaryAction={{ label: 'Excluir Projeto' }}
        />
      </div>

      <div style={{ backgroundColor: '#F0F4F8', padding: 32, borderRadius: 16, textAlign: 'center' }}>
        <h4 style={{ color: '#22272A', marginBottom: 20 }}>Light Theme</h4>
        <AlertBox
          theme="light"
          variant="danger"
          device="desktop"
          title="Excluir Projeto Permanentemente?"
          description="Esta ação não poderá ser desfeita. Todos os arquivos e histórico serão removidos."
          secondaryAction={{ label: 'Cancelar' }}
          primaryAction={{ label: 'Excluir Projeto' }}
        />
      </div>
    </div>
  ),
};
