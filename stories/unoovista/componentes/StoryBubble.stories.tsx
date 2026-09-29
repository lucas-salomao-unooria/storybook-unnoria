import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { StoryBubble } from '../../../src/unoovista/components/StoryBubble';
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
import { unvAvatars } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente StoryBubble.
 */
const StoryBubbleDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Histórias"
      title="StoryBubble"
      description="Célula individual da bandeja de histórias: o avatar em squircle com anel, o nome abaixo e, conforme o estado, o selo LIVE ou o atalho “+”. O formato squircle e a espessura do anel dizem o mesmo que a cor, e o estado também é lido em texto."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Um componente, quatro estados, três contextos de uso."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🟣" title="Bandeja do feed">
        No topo do feed, <code>unseen</code> e <code>live</code> ordenam a atenção: quem está ao
        vivo vem primeiro, seguido de quem tem história nova.
      </UnvDocCard>
      <UnvDocCard icon="⚪" title="Destaques do perfil">
        No perfil, todas as células usam <code>seen</code>: destaques são conteúdo permanente e não
        competem por urgência.
      </UnvDocCard>
      <UnvDocCard icon="➕" title="Criação">
        O estado <code>add</code> mostra a cápsula “+” no canto. Sem imagem, o espaço vazio é
        tracejado; com <code>avatarSrc</code>, é o atalho “Sua história” com a foto da pessoa.
      </UnvDocCard>
      <UnvDocCard icon="🔊" title="Estado em texto">
        Cada célula anuncia o estado junto do nome (“história nova”, “história vista”, “ao vivo”,
        “adicionar história”). Ninguém depende de enxergar o gradiente.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="StoryBubble"
      layout="Coluna · avatar + rótulo"
      specs={[
        { label: 'Avatar interno', value: '56px (avatarSize)' },
        { label: 'Anel + folga', value: '2px + 2px (visto: 1px + 3px)' },
        { label: 'Forma', value: 'Squircle · border-radius: 32%' },
        { label: 'Anéis', value: '--unv-gradient-story · -live · highlight-ring' },
        { label: 'Rótulo', value: 'caption-md · Open Sans 400 · 12/18px' },
        { label: 'Selo LIVE', value: '--unv-gradient-livebadge · text-on-media' },
        { label: 'Atalho “+”', value: 'Cápsula 24px · action-primary' },
        { label: 'Alvo de toque', value: 'Célula de ao menos 72 × 44px' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Squircle como pista não cromática',
          detail:
            'quem tem história ou transmissão ao vivo usa cantos de 32%; o avatar comum do módulo é círculo. A forma acompanha o anel para quem não distingue os tons do gradiente.',
        },
        {
          subject: 'Estado anunciado em texto',
          detail:
            'o aria-label do botão soma ao nome o estado (“marina.luz, ao vivo”), com o texto de statusLabel — extensão aditiva e opcional. O anel é decorativo e fica aria-hidden.',
        },
        {
          subject: 'Componente autônomo',
          detail:
            'o anel é desenhado pela própria célula, e não pelo Avatar: o squircle e a folga pertencem à bandeja, e o Avatar continua sendo o círculo do módulo.',
        },
        {
          subject: 'Estado add com foto',
          detail:
            'o estado add passa a respeitar avatarSrc e initials, para o atalho “Sua história” com a foto da pessoa. Sem imagem, o espaço vazio é tracejado (border-control) e o “+” fica no canto.',
        },
        {
          subject: 'Folga do anel sobre outra superfície',
          detail:
            'a folga usa --unv-color-ring-inner (a superfície primária). Sobre outra superfície, o contêiner redefine --unv-story-bubble-gap para casar o recorte.',
        },
        {
          subject: 'Rótulo do selo em 10px',
          detail:
            'o selo LIVE usa o degrau nav-badge (10px, 700), o único abaixo de 12px do módulo. Branco sobre o gradiente mede de 11,4:1 a 4,7:1 nos dois temas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Botão acessível que contém o quadro (anel, folga e imagem), os selos e o rótulo."
    />
    <UnvDocAnatomy
      zones={[
        { name: 'Anel', role: 'Gradiente de história ou de transmissão; neutro e fino quando vista.', token: '--unv-gradient-story · --unv-gradient-live · --unv-color-highlight-ring' },
        { name: 'Folga', role: 'Recorte entre anel e imagem, na cor da superfície.', token: '--unv-color-ring-inner' },
        { name: 'Imagem', role: 'Avatar em squircle; iniciais ou espaço tracejado sem imagem.', token: '--unv-color-background-tertiary' },
        { name: 'Selo LIVE / atalho “+”', role: 'Na base do anel (ao vivo) ou no canto (adicionar).', token: '--unv-gradient-livebadge · --unv-color-action-primary' },
        { name: 'Rótulo', role: 'Nome em uma linha, truncado com reticências.', token: '--unv-color-text-primary' },
        { name: 'Texto de estado', role: 'Somado ao nome no aria-label do botão.', token: 'statusLabel' },
      ]}
    />
    <UnvDocStage label="Estrutura da célula" surface="primary">
      <StoryBubble username="theo.andrade" avatarSrc={unvAvatars.theoAndrade} state="unseen" />
      <StoryBubble
        username="nome_de_usuario_muito_longo"
        avatarSrc={unvAvatars.daviNogueira}
        state="unseen"
      />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de estados e tamanhos"
      description="Os quatro estados e a variação do avatar."
    />
    <UnvDocStage label="Estados" surface="primary">
      <StoryBubble username="marina.luz" avatarSrc={unvAvatars.marinaLuz} state="live" />
      <StoryBubble username="theo.andrade" avatarSrc={unvAvatars.theoAndrade} state="unseen" />
      <StoryBubble username="bia.raiz" avatarSrc={unvAvatars.biaRaiz} state="seen" />
      <StoryBubble username="Novo" state="add" />
      <StoryBubble username="Sua história" avatarSrc={unvAvatars.lucasMar} state="add" />
    </UnvDocStage>
    <UnvDocStage label="Diâmetros" surface="primary" align="flex-start">
      {[48, 56, 64].map((size) => (
        <StoryBubble
          key={size}
          username={`${size}px`}
          avatarSrc={unvAvatars.lucasMar}
          state="unseen"
          avatarSize={size}
        />
      ))}
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Ordenar a bandeja por prioridade: ao vivo, depois nova, depois vista.',
        'Usar state="seen" em todos os destaques do perfil.',
        'Deixar o truncamento agir: o rótulo fica em uma linha.',
        'Pôr o atalho state="add" na primeira posição da faixa de destaques.',
        'Passar statusLabel traduzido quando o produto não estiver em pt-BR.',
      ]}
      donts={[
        'Sinalizar o estado só pela cor do anel.',
        'Quebrar o rótulo em duas linhas para caber um nome longo.',
        'Usar o gradiente de história em destaques permanentes.',
        'Remover o rótulo: é a única identificação textual da célula.',
        'Trocar o squircle por círculo para o avatar de quem tem história.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Anéis, selos e folga acompanham o tema: os gradientes trocam de degrau para manter o contraste."
    />
    <UnvDocThemeSwitcher>
      {() => (
        <>
          <StoryBubble username="marina.luz" avatarSrc={unvAvatars.marinaLuz} state="live" />
          <StoryBubble username="theo.andrade" avatarSrc={unvAvatars.theoAndrade} state="unseen" />
          <StoryBubble username="bia.raiz" avatarSrc={unvAvatars.biaRaiz} state="seen" />
          <StoryBubble username="Novo" state="add" />
        </>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UnvDocPropsTable
      title="StoryBubble"
      rows={[
        { name: 'username', type: 'string', description: 'Nome exibido abaixo do avatar. Obrigatório.' },
        { name: 'avatarSrc', type: 'string', description: 'URL da imagem do avatar.' },
        { name: 'initials', type: 'string', description: 'Iniciais exibidas sem imagem.' },
        {
          name: 'state',
          type: "'unseen' | 'seen' | 'live' | 'add'",
          default: "'unseen'",
          description: 'Estado da história, que define anel e selo.',
        },
        { name: 'avatarSize', type: 'number', default: '56', description: 'Aresta do avatar interno, em pixels.' },
        { name: 'liveLabel', type: 'string', default: "'AO VIVO'", description: 'Rótulo do selo no estado live.' },
        {
          name: 'statusLabel',
          type: 'string',
          default: 'depende do estado',
          description: 'Texto de estado lido pelo leitor de tela; string vazia omite.',
        },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        {
          name: '...rest',
          type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
          description: 'Repassados ao botão (onClick, aria-*, data-*).',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof StoryBubble> = {
  title: 'Unoovista/Componentes/StoryBubble',
  component: StoryBubble,
  parameters: { layout: 'padded' },
  argTypes: {
    username: { control: 'text', description: 'Nome exibido abaixo do avatar.' },
    avatarSrc: { control: 'text', description: 'URL da imagem do avatar.' },
    initials: { control: 'text', description: 'Iniciais exibidas sem imagem.' },
    state: {
      control: 'radio',
      options: ['unseen', 'seen', 'live', 'add'],
      description: 'Estado da história.',
    },
    avatarSize: {
      control: { type: 'range', min: 40, max: 96, step: 2 },
      description: 'Aresta do avatar interno, em pixels.',
    },
    liveLabel: { control: 'text', description: 'Rótulo do selo LIVE.' },
    statusLabel: { control: 'text', description: 'Texto de estado para leitor de tela.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    onClick: { action: 'onClick' },
  },
  args: {
    username: 'marina.luz',
    avatarSrc: unvAvatars.marinaLuz,
    initials: '',
    state: 'live',
    avatarSize: 56,
    liveLabel: 'AO VIVO',
    statusLabel: undefined,
  },
};

export default meta;

type Story = StoryObj<typeof StoryBubble>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <StoryBubbleDocumentationPage />,
};

/**
 * Playground com todas as propriedades do StoryBubble expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do StoryBubble',
  render: (args) => (
    <UnvDocStage theme={args.theme ?? 'light'} surface="primary" padding={48}>
      <StoryBubble {...args} />
    </UnvDocStage>
  ),
};

/**
 * Matriz completa dos quatro estados, nos dois temas.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UnvDocStage key={theme} label={`Tema ${theme}`} theme={theme} surface="primary">
          <StoryBubble username="marina.luz" avatarSrc={unvAvatars.marinaLuz} state="live" />
          <StoryBubble username="theo.andrade" avatarSrc={unvAvatars.theoAndrade} state="unseen" />
          <StoryBubble username="bia.raiz" avatarSrc={unvAvatars.biaRaiz} state="seen" />
          <StoryBubble username="Novo" state="add" />
          <StoryBubble username="Sua história" avatarSrc={unvAvatars.lucasMar} state="add" />
          <StoryBubble username="Iniciais" initials="lm" state="unseen" />
        </UnvDocStage>
      ))}
    </div>
  ),
};

/**
 * Comparação de diâmetros do avatar interno.
 */
export const Tamanhos: Story = {
  render: () => (
    <UnvDocStage surface="primary" align="flex-start">
      {[40, 48, 56, 64, 80].map((size) => (
        <StoryBubble
          key={size}
          username={`${size}px`}
          avatarSrc={unvAvatars.lucasMar}
          state="unseen"
          avatarSize={size}
        />
      ))}
    </UnvDocStage>
  ),
};

/**
 * Cada estado é anunciado em texto junto do nome, além do anel.
 */
export const EstadoAnunciado: Story = {
  name: 'Estado anunciado em texto',
  render: () => (
    <UnvDocStage surface="primary">
      <StoryBubble username="marina.luz" avatarSrc={unvAvatars.marinaLuz} state="live" />
      <StoryBubble username="theo.andrade" avatarSrc={unvAvatars.theoAndrade} state="unseen" />
      <StoryBubble username="bia.raiz" avatarSrc={unvAvatars.biaRaiz} state="seen" />
      <StoryBubble username="Novo" state="add" />
      <StoryBubble username="davi" state="unseen" statusLabel="nova história de Davi" />
    </UnvDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('button', { name: 'marina.luz, ao vivo' })).toBeInTheDocument();
    await expect(tela.getByRole('button', { name: 'theo.andrade, história nova' })).toBeInTheDocument();
    await expect(tela.getByRole('button', { name: 'bia.raiz, história vista' })).toBeInTheDocument();
    await expect(tela.getByRole('button', { name: 'Novo, adicionar história' })).toBeInTheDocument();
    await expect(tela.getByRole('button', { name: 'davi, nova história de Davi' })).toBeInTheDocument();
  },
};
