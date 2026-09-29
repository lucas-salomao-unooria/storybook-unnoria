import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TopBar } from '../../../src/unoovista/components/TopBar';
import { Logo } from '../../../src/unoovista/components/Logo';
import { Button } from '../../../src/unoovista/components/Button';
import { Icon } from '../../../src/unoovista/components/Icon';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';

const BAR = '#716C98';

/**
 * Ações do feed: vídeos longos, código pessoal e mensagens.
 */
const FeedActions = () => (
  <>
    <TopBar.Action icon="longVideo" label="Vídeos" />
    <TopBar.Action icon="addChat" label="Mensagens" hasNotification />
  </>
);

const FeedBar: React.FC<React.ComponentProps<typeof TopBar>> = (props) => (
  <TopBar
    withStatusBarInset={false}
    title={<Logo height={26} />}
    trailing={<FeedActions />}
    {...props}
  />
);

const MessagesBar: React.FC<React.ComponentProps<typeof TopBar>> = (props) => (
  <TopBar
    withStatusBarInset={false}
    leading={<TopBar.Action icon="back" label="Voltar" />}
    title="lucasMar"
    trailing={<TopBar.Action icon="addChat" label="Nova conversa" />}
    {...props}
  />
);

const ProfileBar: React.FC<React.ComponentProps<typeof TopBar>> = (props) => (
  <TopBar
    variant="plain"
    withStatusBarInset={false}
    title={
      <>
        <Icon name="lock" size="sm" tone="inherit" />
        lucasMar
        <Icon name="chevronDown" size="sm" tone="inherit" />
      </>
    }
    trailing={<TopBar.Action icon="menu" label="Abrir menu" />}
    {...props}
  />
);

const EditBar: React.FC<React.ComponentProps<typeof TopBar>> = (props) => (
  <TopBar
    variant="plain"
    withStatusBarInset={false}
    leading={<Button variant="link">Cancelar</Button>}
    title="Editar perfil"
    trailing={<Button variant="link">Concluir</Button>}
    {...props}
  />
);

/**
 * Página de documentação rica do componente TopBar.
 */
const TopBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Navegação"
      title="TopBar"
      description="Barra superior sem fio: título grande alinhado à esquerda, slot inicial para o logotipo ou para voltar e ações à direita em botões circulares de 44px. A barra é da mesma superfície da tela — a separação vem da camada, não de uma linha."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Um título, dois slots e uma ação circular."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🏷️" title="Título à esquerda">
        O título usa <code>heading-h3</code> (Open Sans 600, 20/30px) e trunca com reticências. Um
        nó customizado, como o logotipo, ocupa o mesmo lugar.
      </UnvDocCard>
      <UnvDocCard icon="🔘" title="Ações circulares">
        <code>TopBar.Action</code> é um botão redondo de 44px com fundo <code>fill-field</code> e
        glifo de 24px. O nome acessível é obrigatório.
      </UnvDocCard>
      <UnvDocCard icon="🫧" title="Sem fio inferior">
        Por padrão a barra não tem linha. <code>bordered</code> devolve um fio de 1px em{' '}
        <code>border-subtle</code> para telas que precisam de separação explícita.
      </UnvDocCard>
      <UnvDocCard icon="📱" title="Recuo da barra de status">
        <code>withStatusBarInset</code> reserva os 44px superiores do aparelho. Desligue quando a
        barra estiver dentro de um <code>PhoneFrame</code> que já desenha a barra de status.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="TopBar"
      layout="Barra · 44px + recuo opcional de 44px"
      specs={[
        { label: 'Faixa de conteúdo', value: '60px (44px de alvo + 8px acima e abaixo)' },
        { label: 'Recuo lateral', value: '16px (--unv-gutter)' },
        { label: 'Título', value: 'heading-h3 · Open Sans 600 · 20/30px' },
        { label: 'Ação circular', value: '44 × 44px · raio total · glifo de 24px' },
        { label: 'Espaço entre ações', value: '8px' },
        { label: 'Superfícies', value: 'feed: secundária · plain: primária' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Título à esquerda, não centralizado',
          detail:
            'o título grande à esquerda deixa a barra respirar e libera o centro para o conteúdo; o slot inicial (logotipo ou voltar) vem antes dele.',
        },
        {
          subject: 'Ações em botões circulares',
          detail:
            'cada ação só de glifo é um círculo de 44px com --unv-color-fill-field, o que dá alvo de toque mínimo e um limite visível sem contorno. No hover o fundo passa a --unv-color-border-default.',
        },
        {
          subject: 'Fio desligado por padrão',
          detail:
            'bordered passou de true para false. A barra e a tela compartilham a superfície, e o fio de 1px (--unv-color-border-subtle) fica como variante opcional.',
        },
        {
          subject: 'TopBar.Action (extensão aditiva)',
          detail:
            'subcomponente novo, com icon e label obrigatórios; hasNotification acrescenta o ponto de novidades e ", com novidades" ao nome acessível.',
        },
        {
          subject: 'Tema herdado',
          detail:
            'theme deixou de ter padrão "light": sem a prop, a barra herda data-unv-theme do contêiner, e por isso acompanha o tema escuro sem configuração.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Três zonas: slot inicial, título e ações."
    />
    <UnvDocAnatomy
      zones={[
        {
          name: 'Slot inicial (leading)',
          role: 'Voltar, logotipo ou ação de texto. Opcional.',
          token: '--unv-color-icon-primary',
        },
        {
          name: 'Título (title)',
          role: 'Texto ou nó; ocupa o espaço que sobra e trunca.',
          token: '--unv-font-heading-h3-* · --unv-color-text-primary',
        },
        {
          name: 'Ações (trailing)',
          role: 'Uma ou duas ações; use TopBar.Action para glifos.',
          token: '--unv-color-fill-field · --unv-touch-target',
        },
        {
          name: 'Superfície',
          role: 'A da tela; sem fio, salvo bordered.',
          token: '--unv-color-background-secondary | -primary',
        },
      ]}
    />
    <UnvDocStage label="Slots identificados" surface="secondary" align="stretch" padding={0}>
      <FeedBar leading={<Icon name="camera" size="md" />} />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As barras das telas principais, nos dois temas."
    />
    <UnvDocStage label="Feed · tema claro" surface="secondary" align="stretch" padding={0}>
      <FeedBar />
    </UnvDocStage>
    <UnvDocStage label="Mensagens · tema claro" surface="secondary" align="stretch" padding={0}>
      <MessagesBar />
    </UnvDocStage>
    <UnvDocStage label="Perfil (plain) · tema claro" surface="primary" align="stretch" padding={0}>
      <ProfileBar />
    </UnvDocStage>
    <UnvDocStage label="Edição (ações de texto) · tema claro" surface="primary" align="stretch" padding={0}>
      <EditBar />
    </UnvDocStage>
    <UnvDocStage label="Com fio (bordered)" surface="secondary" align="stretch" padding={0}>
      <FeedBar bordered />
    </UnvDocStage>
    <UnvDocStage label="Feed · tema escuro" theme="dark" surface="secondary" align="stretch" padding={0}>
      <FeedBar />
    </UnvDocStage>
    <UnvDocStage label="Perfil (plain) · tema escuro" theme="dark" surface="primary" align="stretch" padding={0}>
      <ProfileBar />
    </UnvDocStage>
    <UnvDocStage label="Com recuo da barra de status" surface="secondary" align="stretch" padding={0}>
      <FeedBar withStatusBarInset />
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Manter no máximo duas ações no slot trailing.',
        'Usar TopBar.Action, com label, em toda ação que seja só um glifo.',
        'Usar a variante plain quando a primeira camada abaixo for background-primary.',
        'Desligar withStatusBarInset dentro de um PhoneFrame.',
      ]}
      donts={[
        'Colocar texto longo no título: ele trunca com reticências.',
        'Usar o logotipo e um título textual ao mesmo tempo.',
        'Adicionar uma terceira ação, que aperta o título.',
        'Ligar bordered em toda tela: o fio é exceção, não regra.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfície, título e botões circulares seguem os tokens do tema."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={0}>
      {() => (
        <div style={{ width: 375 }}>
          <FeedBar leading={<Icon name="camera" size="md" />} />
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UnvDocPropsTable
      title="TopBar"
      rows={[
        { name: 'leading', type: 'React.ReactNode', description: 'Slot inicial, antes do título.' },
        { name: 'title', type: 'React.ReactNode', description: 'Título grande, à esquerda.' },
        { name: 'trailing', type: 'React.ReactNode', description: 'Ações à direita.' },
        { name: 'variant', type: "'feed' | 'plain'", default: "'feed'", description: 'Superfície: secundária (feed) ou primária (plain).' },
        { name: 'withStatusBarInset', type: 'boolean', default: 'true', description: 'Reserva os 44px da barra de status.' },
        { name: 'bordered', type: 'boolean', default: 'false', description: 'Fio de 1px na base.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UnvDocPropsTable
      title="TopBar.Action"
      rows={[
        { name: 'icon', type: 'UnvIconName', description: 'Glifo do registro de ícones. Obrigatório.' },
        { name: 'label', type: 'string', description: 'Nome acessível. Obrigatório.' },
        { name: 'hasNotification', type: 'boolean', default: 'false', description: 'Ponto de novidades no canto.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'onClick', type: '(event) => void', description: 'Como em qualquer <button>; as demais props nativas são repassadas.' },
      ]}
    />
  </UnooriaDocShell>
);

const LEADING = {
  nenhum: undefined,
  voltar: <TopBar.Action icon="back" label="Voltar" />,
  camera: <TopBar.Action icon="camera" label="Abrir a câmera" />,
  cancelar: <Button variant="link">Cancelar</Button>,
};

const TRAILING = {
  nenhum: undefined,
  'uma ação': <TopBar.Action icon="menu" label="Abrir menu" />,
  'duas ações': <FeedActions />,
  concluir: <Button variant="link">Concluir</Button>,
};

const TITLE = {
  texto: 'Atividade',
  logotipo: <Logo height={26} />,
  vazio: undefined,
};

const meta: Meta<typeof TopBar> = {
  title: 'Unoovista/Componentes/TopBar',
  component: TopBar,
  parameters: { layout: 'padded' },
  argTypes: {
    leading: {
      control: 'select',
      options: Object.keys(LEADING),
      mapping: LEADING,
      description: 'Slot inicial.',
    },
    title: {
      control: 'select',
      options: Object.keys(TITLE),
      mapping: TITLE,
      description: 'Título (texto ou nó).',
    },
    trailing: {
      control: 'select',
      options: Object.keys(TRAILING),
      mapping: TRAILING,
      description: 'Ações à direita.',
    },
    variant: { control: 'radio', options: ['feed', 'plain'], description: 'Superfície da barra.' },
    withStatusBarInset: { control: 'boolean', description: 'Reserva os 44px da barra de status.' },
    bordered: { control: 'boolean', description: 'Fio de 1px na base.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    leading: 'nenhum' as never,
    title: 'texto' as never,
    trailing: 'duas ações' as never,
    variant: 'feed',
    withStatusBarInset: false,
    bordered: false,
  },
};

export default meta;

type Story = StoryObj<typeof TopBar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TopBarDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da TopBar',
  render: (args) => (
    <UnvDocStage surface="secondary" align="stretch" padding={0} width={375}>
      <TopBar {...args} />
    </UnvDocStage>
  ),
};

/**
 * As barras das cinco telas principais.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo das Telas Principais',
  render: () => (
    <div style={{ display: 'grid', gap: 20, width: 375 }}>
      <UnvDocStage label="Feed" surface="secondary" align="stretch" padding={0}>
        <FeedBar />
      </UnvDocStage>
      <UnvDocStage label="Mensagens" surface="secondary" align="stretch" padding={0}>
        <MessagesBar />
      </UnvDocStage>
      <UnvDocStage label="Perfil" surface="primary" align="stretch" padding={0}>
        <ProfileBar />
      </UnvDocStage>
      <UnvDocStage label="Edição" surface="primary" align="stretch" padding={0}>
        <EditBar />
      </UnvDocStage>
    </div>
  ),
};

/**
 * Variantes de superfície, com e sem fio, nos dois temas.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20, width: 375 }}>
      {(['light', 'dark'] as const).flatMap((theme) => [
        <UnvDocStage key={`${theme}-feed`} label={`feed · ${theme}`} theme={theme} surface="secondary" align="stretch" padding={0}>
          <FeedBar />
        </UnvDocStage>,
        <UnvDocStage key={`${theme}-plain`} label={`plain · ${theme}`} theme={theme} surface="primary" align="stretch" padding={0}>
          <ProfileBar />
        </UnvDocStage>,
        <UnvDocStage key={`${theme}-bordered`} label={`feed com fio · ${theme}`} theme={theme} surface="secondary" align="stretch" padding={0}>
          <FeedBar bordered />
        </UnvDocStage>,
      ])}
    </div>
  ),
};

/**
 * Estados da ação circular: repouso, com novidades e desabilitada.
 */
export const Estados: Story = {
  render: () => (
    <UnvDocStage surface="secondary" gap={16}>
      <TopBar.Action icon="addChat" label="Mensagens" />
      <TopBar.Action icon="addChat" label="Mensagens" hasNotification />
      <TopBar.Action icon="addChat" label="Mensagens" disabled />
    </UnvDocStage>
  ),
};
