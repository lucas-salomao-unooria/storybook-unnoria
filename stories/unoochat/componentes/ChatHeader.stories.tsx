import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { expect, within } from 'storybook/test';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocAnatomy,
  UncDocPractices,
  UncDocPropsTable,
  UncDocStage,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import { ChatHeader, Icon, MessageTag, StatusBar } from '../../../src/unoochat';
import { uncAvatarPrincipal, uncAvatars } from '../fixtures';

const BAR = '#716C98';

/**
 * Chip de status do slot `trailing`: um `MessageTag` com pictograma, como o da
 * missão "O Porta-Voz dos Dados".
 */
const ChipDePublicacoes: React.FC<{ restantes?: number }> = ({ restantes = 3 }) => (
  <MessageTag icon={<Icon name="document" size={14} tone="inherit" />}>
    Publicações Oficiais Disponíveis: {restantes}/3
  </MessageTag>
);

/**
 * Página de documentação rica do componente ChatHeader.
 */
const ChatHeaderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Navegação"
      title="ChatHeader"
      description="Cabeçalho da tela de conversa: seta de voltar, avatar de 32px, nome do contato em Open Sans 20px e as três ações de vídeo, voz e menu, todas com glifos do Material Symbols Rounded. Compartilha a superfície da barra superior e acompanha o tema claro e o escuro."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="↩️" title="Sempre com retorno">
        A conversa é uma tela empilhada; o cabeçalho sempre expõe a seta de voltar em{' '}
        <code>--unc-color-icon-muted</code>.
      </UncDocCard>
      <UncDocCard icon="👤" title="Identidade clicável">
        Avatar e nome formam um único alvo que abre o perfil do contato, pela prop{' '}
        <code>onOpenProfile</code>.
      </UncDocCard>
      <UncDocCard icon="📞" title="Três ações fixas">
        Vídeo (<code>videoCall</code>), voz (<code>phone</code>) e menu (<code>overflow</code>{' '}
        girado 90°), com 24px de espaço entre elas.
      </UncDocCard>
      <UncDocCard icon="🏷️" title="Slot à direita (trailing)">
        A prop <code>trailing</code> recebe um chip de status — um <code>MessageTag</code> — no
        lugar dos botões de chamada. O “Mais opções” fica só com <code>onMenu</code>.
      </UncDocCard>
      <UncDocCard icon="🟣" title="Presença opcional">
        A prop <code>presence</code> acrescenta a segunda linha (“online”, “digitando…”) em{' '}
        <code>--unc-color-text-secondary</code>.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="ChatHeader"
      layout="Barra · 52px"
      specs={[
        { label: 'Altura', value: '52px (--unc-appbar-title-height)' },
        { label: 'Superfície', value: '--unc-color-surface-appbar' },
        { label: 'Avatar', value: '32px (--unc-avatar-sm)' },
        { label: 'Nome', value: 'Open Sans 400 · 20px / 30px' },
        { label: 'Presença', value: 'Open Sans 400 · 12px' },
        { label: 'Espaço entre ações', value: '24px (--unc-spacing-xxl)' },
        { label: 'Ícones', value: 'Material Symbols Rounded · 24px' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Cores por tema',
          detail:
            'a superfície é --unc-color-surface-appbar (#F7F6FA no claro, #34375C no escuro); o nome usa --unc-color-text-primary e a presença, --unc-color-text-secondary. A seta de voltar usa icon-muted e as ações, icon-appbar.',
        },
        {
          subject: 'Menu vertical por rotação',
          detail:
            'o registro de ícones traz o menu horizontal (more_horiz); o cabeçalho o gira 90° com a prop rotate para obter o menu vertical, sem registrar um segundo glifo.',
        },
        {
          subject: 'Slot trailing substitui as chamadas (2026-10-28)',
          detail:
            'com trailing, o conteúdo toma o lugar de vídeo e voz, e o menu só aparece se onMenu for informado. Um canal que exibe um status (a missão "O Porta-Voz dos Dados") não é uma conversa que se liga, e chip mais três glifos não cabem em 375px sem cortar o nome. A identidade guarda 104px (avatar e o começo do nome), o slot fica com o resto até metade da faixa, e o MessageTag quebra em linhas dentro dele. Sem trailing, o DOM é o de antes.',
        },
        {
          subject: 'Conteúdo do slot: MessageTag, não Badge',
          detail:
            'o MessageTag (cápsula neutra com pictograma e rótulo por extenso) serve ao chip de status sem variante nova. O Badge não serve: é um selo numérico de não lidas, com role="img" e rótulo "N não lidas".',
        },
        {
          subject: 'Linha de presença',
          detail:
            'extensão da biblioteca: usa o degrau de 12px da escala da Unooria (--unc-font-caption-size) e a cor secundária, para manter a hierarquia entre nome e estado.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Superfície', role: 'Faixa de 52px compartilhada com a barra superior.', token: '--unc-color-surface-appbar' },
        { name: 'Seta de voltar', role: 'Botão de retorno de 38px com o glifo back.', token: '--unc-color-icon-muted' },
        { name: 'Identidade', role: 'Avatar de 32px e nome, em um único alvo clicável.', token: '--unc-avatar-sm · --unc-color-text-primary' },
        { name: 'Presença', role: 'Segunda linha opcional de estado.', token: '--unc-color-text-secondary' },
        { name: 'Ações', role: 'Vídeo, voz e menu com espaçamento de 24px.', token: '--unc-color-icon-appbar' },
        { name: 'Trailing', role: 'Slot opcional no lugar de vídeo e voz, até metade da faixa.', token: 'unc-chatheader__trailing' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    {(['light', 'dark'] as const).map((theme) => (
      <UncDocStage
        key={theme}
        label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
        theme={theme}
        surface="canvas"
        direction="column"
        align="stretch"
        gap={16}
        padding={20}
      >
        <div style={{ width: 411 }}>
          <ChatHeader name="Amara Lima" avatarSrc={uncAvatarPrincipal} />
        </div>
        <div style={{ width: 411 }}>
          <ChatHeader name="Amara Lima" presence="online" avatarSrc={uncAvatarPrincipal} />
        </div>
        <div style={{ width: 411 }}>
          <ChatHeader name="Bruno Reis" presence="digitando…" avatarSrc={uncAvatars[1]} />
        </div>
        <div style={{ width: 411 }}>
          <ChatHeader name="Sem avatar" initials="SA" />
        </div>
        <div style={{ width: 411 }}>
          <ChatHeader name="Nome muito longo de um grupo de trabalho" avatarSrc={uncAvatars[3]} />
        </div>
        <div style={{ width: 375 }}>
          <ChatHeader name="Porta-Voz" initials="PV" trailing={<ChipDePublicacoes />} />
        </div>
        <div style={{ width: 375 }}>
          <ChatHeader
            name="Porta-Voz"
            initials="PV"
            trailing={<ChipDePublicacoes restantes={1} />}
            onMenu={() => undefined}
          />
        </div>
      </UncDocStage>
    ))}

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Empilhar a StatusBar acima do ChatHeader na tela de conversa.',
        'Manter avatar e nome no mesmo alvo, apontando para o perfil do contato.',
        'Descrever cada ação em aria-label, já que todas exibem apenas um glifo.',
        'Truncar nomes longos com reticências em vez de quebrar a faixa de 52px.',
      ]}
      donts={[
        'Adicionar uma quarta ação: o espaçamento de 24px deixa de caber.',
        'Usar o cabeçalho de página (TopBar variant="page") na tela de conversa.',
        'Ocultar a seta de voltar em uma tela empilhada.',
        'Trocar os glifos por outra biblioteca de ícones: use o registro do módulo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: superfície, texto e ícones acompanham data-unc-theme."
    />
    <UncDocThemeSwitcher surface="canvas" padding={20}>
      {() => (
        <div style={{ width: 411 }}>
          <ChatHeader name="Amara Lima" presence="online" avatarSrc={uncAvatarPrincipal} />
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="ChatHeader"
      rows={[
        { name: 'name', type: 'string', description: 'Nome do contato ou do grupo. Obrigatório.' },
        { name: 'presence', type: 'string', description: 'Linha de presença exibida abaixo do nome.' },
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do contato.' },
        { name: 'initials', type: 'string', description: 'Iniciais usadas quando não há avatar.' },
        { name: 'onBack', type: '(event) => void', description: 'Callback da seta de voltar.' },
        { name: 'onVideoCall', type: '(event) => void', description: 'Callback da chamada de vídeo.' },
        { name: 'onVoiceCall', type: '(event) => void', description: 'Callback da chamada de voz.' },
        { name: 'onMenu', type: '(event) => void', description: 'Callback do menu de opções.' },
        { name: 'onOpenProfile', type: '(event) => void', description: 'Callback de toque no avatar ou no nome.' },
        { name: 'trailing', type: 'React.ReactNode', description: 'Conteúdo à direita, como um MessageTag de status. Substitui vídeo e voz; o menu só aparece com onMenu. Ausente, o cabeçalho é o de sempre.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ChatHeader> = {
  title: 'Unoochat/Componentes/ChatHeader',
  component: ChatHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'text', description: 'Nome do contato ou do grupo.' },
    presence: { control: 'text', description: 'Linha de presença.' },
    avatarSrc: { control: 'select', options: [uncAvatarPrincipal, ...uncAvatars], description: 'URL do avatar.' },
    initials: { control: 'text', description: 'Iniciais sem avatar.' },
    trailing: { control: false, description: 'Slot à direita (ver a estória ComChipDeStatus).' },
  },
  args: { name: 'Amara Lima', presence: '', avatarSrc: uncAvatarPrincipal, initials: 'AL' },
};

export default meta;

type Story = StoryObj<typeof ChatHeader>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChatHeaderDocumentationPage />,
};

/**
 * Playground com 100% das props do ChatHeader expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChatHeader',
  render: (args) => (
    <UncDocStage surface="canvas" padding={20}>
      <div style={{ width: 411 }}>
        <ChatHeader {...args} />
      </div>
    </UncDocStage>
  ),
};

/**
 * Topo da tela de conversa, com a barra de status acima do cabeçalho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UncDocStage surface="canvas" padding={20}>
      <div style={{ width: 411 }}>
        <StatusBar height={22} />
        <ChatHeader name="Amara Lima" avatarSrc={uncAvatarPrincipal} />
      </div>
    </UncDocStage>
  ),
};

/**
 * Estados com e sem presença e sem avatar.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <ChatHeader name="Amara Lima" avatarSrc={uncAvatarPrincipal} />
      </div>
      <div style={{ width: 411 }}>
        <ChatHeader name="Amara Lima" presence="online" avatarSrc={uncAvatarPrincipal} />
      </div>
      <div style={{ width: 411 }}>
        <ChatHeader name="Sem avatar" initials="SA" />
      </div>
    </UncDocStage>
  ),
};

/**
 * Slot `trailing` com o chip de status da missão: sem `onMenu`, nenhuma ação;
 * com `onMenu`, só o "Mais opções". O `play` confere que as chamadas saem.
 */
export const ComChipDeStatus: Story = {
  render: () => (
    <UncDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 375 }} data-testid="sem-menu">
        <StatusBar height={22} />
        <ChatHeader name="Porta-Voz" presence="canal oficial" initials="PV" trailing={<ChipDePublicacoes />} />
      </div>
      <div style={{ width: 375 }} data-testid="com-menu">
        <ChatHeader
          name="Porta-Voz"
          initials="PV"
          trailing={<ChipDePublicacoes restantes={0} />}
          onMenu={() => undefined}
        />
      </div>
    </UncDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const semMenu = within(tela.getByTestId('sem-menu'));
    const comMenu = within(tela.getByTestId('com-menu'));

    await expect(semMenu.getByText('Publicações Oficiais Disponíveis: 3/3')).toBeVisible();
    await expect(semMenu.queryByRole('button', { name: 'Chamada de vídeo' })).toBeNull();
    await expect(semMenu.queryByRole('button', { name: 'Chamada de voz' })).toBeNull();
    await expect(semMenu.queryByRole('button', { name: 'Mais opções' })).toBeNull();
    await expect(comMenu.getByRole('button', { name: 'Mais opções' })).toBeVisible();
    await expect(comMenu.queryByRole('button', { name: 'Chamada de vídeo' })).toBeNull();
  },
};
