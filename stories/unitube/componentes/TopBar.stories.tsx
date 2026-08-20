import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Button, SearchBox, TopBar } from '../../../src/unitube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocAnatomy,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { avatars } from '../fixtures';

const meta: Meta<typeof TopBar> = {
  title: 'Unitube/Componentes/TopBar',
  component: TopBar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    avatarSrc: { control: 'text' },
    avatarInitials: { control: 'text' },
    notificationCount: { control: { type: 'number', min: 0, max: 200 } },
    logoHref: { control: 'text' },
    className: { control: 'text' },
    onToggleSidebar: { action: 'onToggleSidebar' },
    onSearch: { action: 'onSearch' },
    onVoiceSearch: { action: 'onVoiceSearch' },
  },
  args: {
    avatarSrc: avatars.currentUser,
    avatarInitials: 'LS',
    notificationCount: 0,
    logoHref: '',
  },
};

export default meta;

type Story = StoryObj<typeof TopBar>;

const TopBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Componentes • Navegação"
      title="TopBar"
      description="Reprodução do nó Navigation/TopBar (7:111), a barra de 56px que atravessa as três telas do arquivo. Repare que ela usa --uni-color-background-secondary (#212121), e não o fundo principal (#181818): a barra é uma superfície um degrau acima da página, e é essa diferença de luminância que a separa do conteúdo."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Os três blocos da barra e como eles se distribuem."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🧭" title="Três blocos, uma linha">
        Marca à esquerda (alternador + logotipo), busca ao centro e perfil expandido à direita. Os
        recuos externos são de 16px em ambos os lados.
      </UniDocCard>
      <UniDocCard icon="🎯" title="Busca centrada no quadro">
        No arquivo a caixa de busca começa em x=525 de 1440 — centrada no quadro inteiro, não no
        espaço remanescente entre os dois blocos. Por isso a coluna central usa <code>flex: 1</code>{' '}
        com largura máxima.
      </UniDocCard>
      <UniDocCard icon="🪜" title="Um degrau acima da página">
        <code>#212121</code> contra <code>#181818</code> do conteúdo. Nenhuma sombra separa a barra
        — a diferença de luminância basta.
      </UniDocCard>
      <UniDocCard icon="🔌" title="Blocos substituíveis">
        As props <code>search</code> e <code>actions</code> aceitam <code>ReactNode</code>, para que
        um produto injete um campo com sugestões próprias ou um botão de entrar quando não há
        sessão.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="7:111"
      frameName="Navigation/TopBar"
      specs={[
        { label: 'Dimensões', value: '1440 × 56' },
        { label: 'Superfície', value: '#212121 (background/secondary)' },
        { label: 'Bloco de marca', value: 'x=16 · logotipo com recuo 18/14/18/16' },
        { label: 'Busca', value: 'x=525 · 470px' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Largura fluida',
          detail:
            'o arquivo publica a barra em 1440px fixos. O componente usa largura de 100% com recuo de 16px, para que a barra acompanhe a janela real — o quadro fixo é reproduzido apenas no DesktopFrame das telas compostas.',
        },
        {
          subject: 'Recolhimento da busca',
          detail:
            'abaixo de 800px a coluna central é ocultada. O arquivo não descreve esse comportamento, mas sem ele a barra quebraria em duas linhas em janelas estreitas.',
        },
        {
          subject: 'Selo de notificação',
          detail:
            'o alvo de notificações do arquivo não tem contador. O selo foi acrescentado no ProfileExpanded com o vermelho semântico e o degrau Caption/Small, e só aparece quando notificationCount é maior que zero.',
        },
        {
          subject: 'Logotipo como âncora',
          detail:
            'o arquivo não declara destino de navegação. Quando logoHref é informado, o logotipo é renderizado como <a> rotulado; sem a prop, permanece um <span> decorativo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Superfície',
          role: 'Barra de 56px de altura, um degrau acima do fundo da página.',
          token: '--uni-color-background-secondary · --uni-topbar-height',
        },
        {
          name: 'Alternador de barra lateral',
          role: 'Alvo circular de 40px com o glifo hamburger.',
          token: '--uni-icon-button-size',
        },
        {
          name: 'Logotipo',
          role: 'Quadro com recuo 18/14/18/16, opcionalmente uma âncora.',
          token: 'prop logoHref',
        },
        {
          name: 'Busca',
          role: 'Coluna central que cresce e centraliza a caixa no quadro.',
          token: 'prop search',
        },
        {
          name: 'Ações',
          role: 'Perfil expandido com criar, aplicativos, notificações e avatar.',
          token: 'prop actions',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo" surface="primary" align="stretch" padding={0}>
      <TopBar avatarSrc={avatars.currentUser} />
    </UniDocStage>
    <UniDocStage label="Com contador de notificações" surface="primary" align="stretch" padding={0}>
      <TopBar avatarSrc={avatars.currentUser} notificationCount={9} />
    </UniDocStage>
    <UniDocStage label="Sem sessão: bloco de ações substituído" surface="primary" align="stretch" padding={0}>
      <TopBar actions={<Button icon="more">ENTRAR</Button>} />
    </UniDocStage>
    <UniDocStage label="Busca substituída por um campo do produto" surface="primary" align="stretch" padding={0}>
      <TopBar
        avatarInitials="LS"
        search={<SearchBox placeholder="Pesquisar no Unitube" showVoiceSearch={false} />}
      />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Mantenha a barra em --uni-color-background-secondary, um degrau acima do conteúdo.',
        'Informe logoHref para que o logotipo leve à página inicial.',
        'Use a prop search para injetar um campo com sugestões, preservando a geometria da barra.',
        'Passe notificationCount apenas quando houver notificações reais a comunicar.',
      ]}
      donts={[
        'Não adicione box-shadow à barra: a separação é feita por luminância.',
        'Não altere a altura de 56px, que é a referência vertical de todas as telas.',
        'Não coloque a busca à esquerda ou à direita — ela é centrada no quadro.',
        'Não empilhe dois níveis de navegação dentro da própria TopBar: use o TopMenuBar abaixo dela.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="A barra sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'deep']} padding={0}>
      {() => (
        <div style={{ width: '100%' }}>
          <TopBar avatarSrc={avatars.currentUser} notificationCount={3} />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="TopBar"
      rows={[
        {
          name: 'avatarSrc',
          type: 'string',
          description: 'Endereço do retrato do usuário, repassado ao perfil expandido.',
        },
        {
          name: 'avatarInitials',
          type: 'string',
          description: 'Iniciais exibidas quando avatarSrc não é informado.',
        },
        {
          name: 'notificationCount',
          type: 'number',
          description:
            'Quantidade de notificações não lidas. Maior que zero exibe o selo, acrescentado pela biblioteca.',
        },
        {
          name: 'onToggleSidebar',
          type: '() => void',
          description: 'Chamado ao acionar o alternador da barra lateral.',
        },
        {
          name: 'onSearch',
          type: '(value: string) => void',
          description: 'Chamado quando a busca padrão é enviada.',
        },
        {
          name: 'onVoiceSearch',
          type: '() => void',
          description: 'Chamado ao acionar a busca por voz da caixa padrão.',
        },
        {
          name: 'search',
          type: 'React.ReactNode',
          description:
            'Substitui a caixa de busca padrão. Use para injetar um campo controlado com sugestões próprias.',
        },
        {
          name: 'actions',
          type: 'React.ReactNode',
          description:
            'Substitui o bloco direito padrão — por exemplo, por um botão de entrar quando não há sessão.',
        },
        {
          name: 'logoHref',
          type: 'string',
          description:
            'Endereço de destino do logotipo. Quando informado, o logotipo é renderizado como âncora rotulada.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
          description: 'Demais atributos são repassados ao <header>.',
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
  render: () => <TopBarDocumentationPage />,
};

/**
 * Playground com 100% das props do TopBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TopBar',
  render: (args) => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <TopBar {...args} logoHref={args.logoHref || undefined} />
      <div style={{ height: 240 }} />
    </div>
  ),
};

/**
 * Réplica visual do nó `Navigation/TopBar` (7:111), 1440×56.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <TopBar avatarSrc={avatars.currentUser} />
      <div style={{ height: 200 }} />
    </div>
  ),
};

/**
 * Composições possíveis dos blocos substituíveis.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 24,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <TopBar avatarSrc={avatars.currentUser} />
      <TopBar avatarSrc={avatars.currentUser} notificationCount={12} />
      <TopBar actions={<Button icon="more">ENTRAR</Button>} />
      <TopBar avatarInitials="LS" search={<SearchBox showVoiceSearch={false} />} />
    </div>
  ),
};
