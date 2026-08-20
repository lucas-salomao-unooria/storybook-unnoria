import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Icon, NavBar } from '../../../src/tiktooria';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocAnatomy,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocPropsTable,
  TikDocStage,
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';

const meta: Meta<typeof NavBar> = {
  title: 'Tik Tooria/Componentes/NavBar',
  component: NavBar,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    showBack: { control: 'boolean' },
    backLabel: { control: 'text' },
    selectable: { control: 'boolean' },
    hairline: { control: 'boolean' },
    className: { control: 'text' },
    onBack: { action: 'onBack' },
  },
  args: {
    title: 'Privacy and settings',
    showBack: true,
    backLabel: 'Voltar',
    selectable: false,
    hairline: true,
  },
};

export default meta;

type Story = StoryObj<typeof NavBar>;

const NavBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Navegação"
      title="NavBar"
      description="Barra superior de 414×88 das telas de cromo claro. Reserva os 44px da barra de status no topo e alinha o título centralizado a 55px do topo do frame, como nos sete frames de origem: Find friends, Privacy and settings, Edit profile, TikTok User, Direct Message, All activity e a página de som."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🧭" title="Três zonas">
        Slot esquerdo (retorno ou ação), título centralizado em Bold 17 e slot direito livre. A grade
        de três colunas mantém o título óptico no centro mesmo com ações assimétricas.
      </TikDocCard>
      <TikDocCard icon="➖" title="Fio opcional">
        Cinco frames aplicam o fio inferior de 0,33px; “Find friends” e “All activity” não. A prop{' '}
        <code>hairline</code> cobre os dois casos.
      </TikDocCard>
      <TikDocCard icon="🔽" title="Título selecionável">
        Nas telas “TikTok User” e “All activity” o título traz a divisa de seleção de conta ou de
        filtro. <code>selectable</code> a acrescenta.
      </TikDocCard>
      <TikDocCard icon="🎯" title="Ações livres">
        <code>leading</code> e <code>trailing</code> aceitam qualquer nó: leitor de QR, menu de três
        pontos, adicionar conta ou compartilhar.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:222"
      frameName="Top Bar — TikTok Find Friends"
      specs={[
        { label: 'Dimensões', value: '414 × 88' },
        { label: 'Título', value: 'Proxima Nova Bold 17' },
        { label: 'Recuo lateral', value: '18px' },
        { label: 'Fio inferior', value: '0,33px #D0D1D3' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Título posicionado por coordenada',
          detail:
            'o arquivo centraliza o título em x=207 e o desloca para x=199 nas telas com divisa de seleção. O componente usa grade de três colunas, o que centraliza o conjunto título+divisa e produz um deslocamento equivalente sem coordenada fixa.',
        },
        {
          subject: 'Barra de status embutida',
          detail:
            'no arquivo, a barra de status é um frame irmão sobreposto ao topo da barra superior. Aqui os 88px reservam os 44px por padding, e a StatusBar é renderizada como irmã — não como filha.',
        },
        {
          subject: 'Foco visível',
          detail:
            'o arquivo não descreve estado de foco. O anel de 2px em --tik-color-brand-button foi acrescentado usando apenas tokens da marca.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        {
          name: 'Reserva da barra de status',
          role: 'Padding superior de 44px.',
          token: '--tik-statusbar-height',
        },
        {
          name: 'Slot esquerdo',
          role: 'Seta de retorno (10,2×18) ou conteúdo livre, recuado 18px.',
          token: 'glifo arrowBack',
        },
        {
          name: 'Título',
          role: 'Bold 17 centralizado, com divisa opcional.',
          token: '--tik-font-heading-* · --tik-color-text-primary',
        },
        { name: 'Slot direito', role: 'Ação livre alinhada à borda direita.' },
        {
          name: 'Fio inferior',
          role: 'Sombra de raio 0 de 0,33px, opcional.',
          token: '--tik-elevation-bar-bottom',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Com retorno e leitor de QR — “Find friends” (sem fio)" surface="chrome" align="stretch" width={414}>
      <NavBar
        title="Find friends"
        showBack
        hairline={false}
        trailing={<Icon name="scanner" size={18} tone="primary" />}
      />
    </TikDocStage>
    <TikDocStage label="Somente retorno — “Privacy and settings”" surface="chrome" align="stretch" width={414}>
      <NavBar title="Privacy and settings" showBack />
    </TikDocStage>
    <TikDocStage label="Título selecionável com ações — “TikTok User”" surface="chrome" align="stretch" width={414}>
      <NavBar
        title="Jacob West"
        selectable
        leading={<Icon name="addAccount" size={22} tone="primary" />}
        trailing={<Icon name="menu" size={4} tone="primary" />}
      />
    </TikDocStage>
    <TikDocStage label="Filtro de atividade — “All activity” (sem fio)" surface="chrome" align="stretch" width={414}>
      <NavBar
        title="All activity"
        selectable
        hairline={false}
        trailing={<Icon name="send" size={19.5} tone="primary" />}
      />
    </TikDocStage>
    <TikDocStage label="Com ação de nova conversa — “Direct messages”" surface="chrome" align="stretch" width={414}>
      <NavBar
        title="Direct messages"
        showBack
        trailing={<Icon name="plus" size={16} tone="primary" />}
      />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use showBack apenas quando houver uma tela anterior; nas raízes, use leading.',
        'Desligue hairline nas telas cujo conteúdo já começa com um campo ou uma faixa própria.',
        'Passe um Icon do próprio módulo nos slots leading e trailing.',
        'Combine selectable com um menu real — a divisa promete uma escolha.',
      ]}
      donts={[
        'Não coloque a StatusBar dentro da NavBar: elas são irmãs.',
        'Não use a NavBar sobre superfície imersiva — o feed usa o FeedHeader.',
        'Não sobrecarregue o slot direito com mais de duas ações.',
        'Não substitua o título por um logotipo: o arquivo não publica essa variante.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome', 'sheet']}>
      {() => (
        <div style={{ width: 414 }}>
          <NavBar title="Edit profile" showBack />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="NavBar"
      rows={[
        { name: 'title', type: 'React.ReactNode', description: 'Título centralizado, em Bold 17.' },
        {
          name: 'showBack',
          type: 'boolean',
          default: 'false',
          description: 'Exibe a seta de retorno à esquerda, no lugar de leading.',
        },
        {
          name: 'backLabel',
          type: 'string',
          default: "'Voltar'",
          description: 'Rótulo acessível da seta de retorno.',
        },
        { name: 'onBack', type: '() => void', description: 'Acionado ao clicar na seta de retorno.' },
        {
          name: 'leading',
          type: 'React.ReactNode',
          description: 'Conteúdo livre no canto esquerdo, quando a tela não tem retorno.',
        },
        {
          name: 'trailing',
          type: 'React.ReactNode',
          description: 'Conteúdo livre no canto direito.',
        },
        {
          name: 'selectable',
          type: 'boolean',
          default: 'false',
          description: 'Exibe a divisa de seleção ao lado do título.',
        },
        {
          name: 'hairline',
          type: 'boolean',
          default: 'true',
          description: 'Aplica o fio inferior de 0,33px.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: "Omit<React.HTMLAttributes<HTMLElement>, 'title'>",
          description: 'Demais atributos HTML são repassados ao <header>.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <NavBarDocumentationPage />,
};

/**
 * Playground com 100% das props da NavBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da NavBar',
  render: (args) => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <NavBar {...args} trailing={<Icon name="scanner" size={18} tone="primary" />} />
    </div>
  ),
};

/**
 * Réplica visual dos sete frames oficiais de barra superior do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 414 }}>
      <NavBar
        title="Find friends"
        showBack
        hairline={false}
        trailing={<Icon name="scanner" size={18} tone="primary" />}
      />
      <NavBar title="Privacy and settings" showBack />
      <NavBar title="Edit profile" showBack />
      <NavBar
        title="Jacob West"
        selectable
        leading={<Icon name="addAccount" size={22} tone="primary" />}
        trailing={<Icon name="menu" size={4} tone="primary" />}
      />
      <NavBar title="Direct messages" showBack trailing={<Icon name="plus" size={16} tone="primary" />} />
      <NavBar
        title="All activity"
        selectable
        hairline={false}
        trailing={<Icon name="send" size={19.5} tone="primary" />}
      />
    </div>
  ),
};

/**
 * Matriz de combinações de slots.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 414 }}>
      <NavBar title="Só título" hairline={false} />
      <NavBar title="Com retorno" showBack />
      <NavBar title="Com ação" showBack trailing={<Icon name="share" size={18} tone="primary" />} />
      <NavBar title="Selecionável" selectable />
      <NavBar
        title="Completa"
        selectable
        leading={<Icon name="addAccount" size={22} tone="primary" />}
        trailing={<Icon name="menu" size={4} tone="primary" />}
      />
    </div>
  ),
};

/**
 * Estados interativos da seta de retorno.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 414 }}>
      <NavBar title="Repouso" showBack />
      <NavBar title="Sem fio inferior" showBack hairline={false} />
      <NavBar title="Sem título" showBack trailing={<Icon name="share" size={18} tone="primary" />} />
    </div>
  ),
};
