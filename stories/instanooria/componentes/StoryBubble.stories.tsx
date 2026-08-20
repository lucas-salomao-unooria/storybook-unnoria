import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StoryBubble } from '../../../src/instanooria/components/StoryBubble';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaAvatars } from '../fixtures';

/**
 * Página de documentação rica do componente StoryBubble.
 */
const StoryBubbleDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Stories"
      title="StoryBubble"
      description="Célula individual da bandeja de stories: avatar com anel e nome de usuário abaixo. Reproduz a célula de 64 × 83px do Figma, incluindo a etiqueta LIVE ancorada na base do anel e o atalho “+” usado para criar um novo destaque."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Um componente, quatro estados, três contextos de uso."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🟠" title="Bandeja do Feed">
        No topo do Feed, os estados <code>unseen</code> e <code>live</code> ordenam a atenção: quem
        está ao vivo vem primeiro, seguido de quem tem story novo.
      </InstaDocCard>
      <InstaDocCard icon="⚪" title="Destaques do perfil">
        No perfil, todas as células usam <code>seen</code> — destaques são conteúdo permanente e não
        competem por urgência.
      </InstaDocCard>
      <InstaDocCard icon="➕" title="Criação">
        O estado <code>add</code> substitui a foto pelo glifo “+”, formando o atalho “Novo” no início
        da faixa de destaques.
      </InstaDocCard>
      <InstaDocCard icon="✂️" title="Rótulo truncado">
        Nomes longos são truncados com reticências em uma única linha, preservando o ritmo horizontal
        da bandeja.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas da célula lidas dos frames Stories e Account Info."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1698"
      frameName="Stories → Your Story"
      specs={[
        { label: 'Célula do Feed', value: '62 × 81px' },
        { label: 'Célula do perfil', value: '64 × 83px' },
        { label: 'Avatar interno', value: '56px' },
        { label: 'Rótulo', value: 'Caption/Medium · 12px' },
        { label: 'Gap avatar → rótulo', value: '6px' },
        { label: 'Etiqueta LIVE', value: 'ancorada em -5px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Botão acessível contendo o avatar com anel e o rótulo truncável."
    />
    <InstaDocStage label="Estrutura da célula">
      <StoryBubble username="zackjohn" avatarSrc={instaAvatars.zackjohn} state="unseen" />
      <StoryBubble
        username="nome_de_usuario_muito_longo"
        avatarSrc={instaAvatars.kieron_d}
        state="unseen"
      />
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Estados e Tamanhos"
      description="Os quatro estados e a variação de diâmetro do avatar."
    />
    <InstaDocStage label="Estados">
      <StoryBubble username="karennne" avatarSrc={instaAvatars.karennne} state="live" />
      <StoryBubble username="zackjohn" avatarSrc={instaAvatars.zackjohn} state="unseen" />
      <StoryBubble username="craig_love" avatarSrc={instaAvatars.craig_love} state="seen" />
      <StoryBubble username="Novo" state="add" />
    </InstaDocStage>

    <InstaDocStage label="Diâmetros">
      {[48, 56, 64].map((size) => (
        <StoryBubble
          key={size}
          username={`${size}px`}
          avatarSrc={instaAvatars.jacob_w}
          state="unseen"
          avatarSize={size}
        />
      ))}
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de uso verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Ordenar a bandeja por prioridade: live, depois unseen, depois seen.',
        'Usar state="seen" em todos os destaques do perfil.',
        'Manter o rótulo em uma única linha, deixando o truncamento agir.',
        'Colocar o atalho state="add" sempre na primeira posição da faixa de destaques.',
      ]}
      donts={[
        'Exibir dois estados live consecutivos sem hierarquia clara de recência.',
        'Quebrar o rótulo em duas linhas para caber um nome longo.',
        'Usar o gradiente de story em destaques permanentes.',
        'Remover o rótulo: ele é a única identificação textual da célula.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="O rótulo e a folga do anel acompanham a superfície ativa."
    />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <>
          <StoryBubble
            username="karennne"
            avatarSrc={instaAvatars.karennne}
            state="live"
            theme={activeTheme}
          />
          <StoryBubble
            username="zackjohn"
            avatarSrc={instaAvatars.zackjohn}
            state="unseen"
            theme={activeTheme}
          />
          <StoryBubble
            username="craig_love"
            avatarSrc={instaAvatars.craig_love}
            state="seen"
            theme={activeTheme}
          />
          <StoryBubble username="Novo" state="add" theme={activeTheme} />
        </>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente StoryBubble."
    />
    <InstaDocPropsTable
      title="StoryBubble"
      rows={[
        {
          name: 'username',
          type: 'string',
          description: 'Nome exibido abaixo do avatar. Obrigatório.',
        },
        { name: 'avatarSrc', type: 'string', description: 'URL da imagem do avatar.' },
        { name: 'initials', type: 'string', description: 'Iniciais exibidas sem imagem.' },
        {
          name: 'state',
          type: "'unseen' | 'seen' | 'live' | 'add'",
          default: "'unseen'",
          description: 'Estado do story, que define anel e selo.',
        },
        {
          name: 'avatarSize',
          type: 'number',
          default: '56',
          description: 'Diâmetro do recorte interno do avatar em pixels.',
        },
        {
          name: 'liveLabel',
          type: 'string',
          default: "'LIVE'",
          description: 'Rótulo da etiqueta no estado live.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof StoryBubble> = {
  title: 'Instanooria/Componentes/StoryBubble',
  component: StoryBubble,
  parameters: { layout: 'padded' },
  argTypes: {
    username: { control: 'text', description: 'Nome exibido abaixo do avatar.' },
    avatarSrc: { control: 'text', description: 'URL da imagem do avatar.' },
    state: {
      control: 'radio',
      options: ['unseen', 'seen', 'live', 'add'],
      description: 'Estado do story.',
    },
    avatarSize: {
      control: { type: 'range', min: 40, max: 96, step: 2 },
      description: 'Diâmetro do avatar em pixels.',
    },
    liveLabel: { control: 'text', description: 'Rótulo da etiqueta LIVE.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    username: 'karennne',
    avatarSrc: instaAvatars.karennne,
    state: 'live',
    avatarSize: 56,
    liveLabel: 'LIVE',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof StoryBubble>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
    <div
      data-insta-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <StoryBubble {...args} />
    </div>
  ),
};

/**
 * Matriz completa dos quatro estados.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <StoryBubble username="karennne" avatarSrc={instaAvatars.karennne} state="live" />
      <StoryBubble username="zackjohn" avatarSrc={instaAvatars.zackjohn} state="unseen" />
      <StoryBubble username="craig_love" avatarSrc={instaAvatars.craig_love} state="seen" />
      <StoryBubble username="Novo" state="add" />
    </div>
  ),
};

/**
 * Comparação de diâmetros do avatar interno.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {[40, 48, 56, 64, 80].map((size) => (
        <StoryBubble
          key={size}
          username={`${size}px`}
          avatarSrc={instaAvatars.jacob_w}
          state="unseen"
          avatarSize={size}
        />
      ))}
    </div>
  ),
};
