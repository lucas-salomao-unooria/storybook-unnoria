import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Avatar, Icon } from '../../../src/tiktooria';
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
import { tikAvatarCraig, tikAvatarJacob, tikCommentAvatars } from '../fixtures';

const meta: Meta<typeof Avatar> = {
  title: 'Tik Tooria/Componentes/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] },
    src: { control: 'text' },
    alt: { control: 'text' },
    background: { control: 'text' },
    ring: { control: 'boolean' },
    followable: { control: 'boolean' },
    followLabel: { control: 'text' },
    className: { control: 'text' },
    onFollow: { action: 'onFollow' },
  },
  args: {
    size: 'sm',
    src: tikAvatarCraig,
    alt: 'Retrato de craig_love',
    ring: false,
    followable: false,
    followLabel: 'Seguir',
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

const AvatarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Identidade"
      title="Avatar"
      description="Disco de raio total nos seis diâmetros do arquivo: 32px no comentário, 47px no autor do vídeo, 49px no alvo de compartilhamento, 56px na linha social, 90px no seletor de mídia do perfil e 96px no cabeçalho. Aceita fotografia, glifo ou apenas cor de fundo, e pode receber o anel branco de 1px do feed e o botão de seguir de 21px."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="⭕" title="Seis diâmetros literais">
        Nenhum foi consolidado: cada um pertence a um componente distinto do arquivo. O token nomeado
        evita que um produto escolha o tamanho pelo espaço disponível.
      </TikDocCard>
      <TikDocCard icon="🖼️" title="Fotografia por prop">
        As fotografias do arquivo são bitmaps colados nos frames. Foram exportadas para{' '}
        <code>public/tiktooria/</code> e são informadas por <code>src</code> — nunca embutidas no
        pacote.
      </TikDocCard>
      <TikDocCard icon="➕" title="Botão de seguir">
        <code>followable</code> sobrepõe o glifo <code>followPlus</code> de 21px à base, avançando
        11,5px além do disco, como no nó 4:1087.
      </TikDocCard>
      <TikDocCard icon="🎨" title="Disco colorido com glifo">
        As linhas “Invite friends” e “Find contacts” usam disco de 56px em cor de marca com um glifo
        branco no centro, via <code>background</code> + <code>icon</code>.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:1085"
      frameName="User — TikTok Home (For You)"
      specs={[
        { label: 'Diâmetros', value: '32 · 47 · 49 · 56 · 90 · 96' },
        { label: 'Raio', value: 'total (1000px)' },
        { label: 'Anel do feed', value: '1px branco, por fora' },
        { label: 'Botão de seguir', value: '21px · #EA4359' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Anel desenhado como stroke externo',
          detail:
            'o arquivo aplica um stroke de 1px com alinhamento OUTSIDE ao avatar do feed. Reproduzido como box-shadow de raio 0, que não altera a caixa do elemento como um border faria.',
        },
        {
          subject: 'Placeholder de mídia',
          detail:
            'quando não há fotografia nem glifo, o disco fica em --tik-color-surface-media (#C4C4C4), a mesma reserva que o Figma usa sob os bitmaps.',
        },
        {
          subject: 'Iniciais',
          detail:
            'o arquivo não publica avatar com iniciais. O componente não oferece esse recurso, para não inventar um estado inexistente.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        {
          name: 'Disco',
          role: 'Contêiner circular no diâmetro escolhido.',
          token: '--tik-avatar-xs … --tik-avatar-xxl · --tik-radius-full',
        },
        { name: 'Fotografia', role: 'Imagem recortada com object-fit: cover.' },
        { name: 'Glifo', role: 'Alternativa à fotografia, centralizada no disco.' },
        {
          name: 'Anel',
          role: 'Contorno branco de 1px por fora, exclusivo do feed.',
          token: '--tik-color-border-grid',
        },
        {
          name: 'Botão de seguir',
          role: 'Alvo de 21px sobreposto à base, centralizado.',
          token: '--tik-follow-button · glifo followPlus',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de tamanhos, variantes e estados" barColor="#161722" />
    <TikDocStage label="Os seis diâmetros do arquivo" surface="chrome" gap={20}>
      {(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Avatar size={size} src={tikAvatarJacob} alt="" />
          <div style={{ fontSize: 11, color: 'var(--tik-color-text-secondary)', marginTop: 6 }}>
            {size}
          </div>
        </div>
      ))}
    </TikDocStage>
    <TikDocStage label="Anel e botão de seguir — sobre o feed" surface="immersive" gap={28}>
      <Avatar size="sm" src={tikAvatarCraig} alt="" ring />
      <Avatar size="sm" src={tikAvatarCraig} alt="" ring followable />
      <Avatar size="sm" src={tikAvatarCraig} alt="" followable />
    </TikDocStage>
    <TikDocStage label="Discos coloridos com glifo — “Find friends”" surface="chrome" gap={20}>
      <Avatar
        size="lg"
        background="var(--tik-color-avatar-invite)"
        icon={<Icon name="addAccountStroke" size={25} tone="onImmersive" />}
      />
      <Avatar
        size="lg"
        background="var(--tik-color-avatar-contacts)"
        icon={<Icon name="contacts" size={21} tone="onImmersive" />}
      />
    </TikDocStage>
    <TikDocStage label="Reserva de mídia — sem fotografia" surface="chrome" gap={20}>
      {(['xs', 'sm', 'lg', 'xxl'] as const).map((size) => (
        <Avatar key={size} size={size} />
      ))}
    </TikDocStage>
    <TikDocStage label="Tamanho numérico arbitrário" surface="chrome" gap={20}>
      {[24, 40, 64, 120].map((size) => (
        <Avatar key={size} size={size} src={tikAvatarJacob} alt="" />
      ))}
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Escolha o diâmetro pelo componente de destino: xs em comentário, sm no feed, xxl no perfil.',
        'Passe alt descritivo quando o avatar identificar uma pessoa; deixe vazio quando for decorativo ao lado do nome.',
        'Use ring apenas sobre superfície imersiva — é onde o arquivo o aplica.',
        'Combine background e icon para discos de ação, sem fotografia.',
      ]}
      donts={[
        'Não invente avatar com iniciais: o arquivo não publica esse estado.',
        'Não use ring sobre cromo claro, onde o contorno branco desaparece.',
        'Não aplique followable em avatares de lista — ele pertence ao feed.',
        'Não embuta as fotografias no pacote: informe-as por prop.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher>
      {(surface) => (
        <>
          {tikCommentAvatars.slice(0, 4).map((src) => (
            <Avatar key={src} size="xs" src={src} alt="" />
          ))}
          <Avatar size="sm" src={tikAvatarCraig} alt="" ring={surface === 'immersive'} followable />
        </>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="Avatar"
      rows={[
        {
          name: 'size',
          type: 'TikAvatarSize | number',
          default: "'sm'",
          description: 'Diâmetro. Tokens: xs 32, sm 47, md 49, lg 56, xl 90, xxl 96. Aceita px.',
        },
        {
          name: 'src',
          type: 'string',
          description: 'Endereço da fotografia. Bitmaps são informados por prop, não embutidos.',
        },
        { name: 'alt', type: 'string', default: "''", description: 'Texto alternativo.' },
        {
          name: 'icon',
          type: 'React.ReactNode',
          description: 'Glifo exibido no lugar da fotografia.',
        },
        {
          name: 'background',
          type: 'string',
          description: 'Cor de fundo do disco quando não há fotografia.',
        },
        {
          name: 'ring',
          type: 'boolean',
          default: 'false',
          description: 'Aplica o anel branco de 1px por fora do disco.',
        },
        {
          name: 'followable',
          type: 'boolean',
          default: 'false',
          description: 'Exibe o botão de seguir de 21px sobreposto à base.',
        },
        {
          name: 'followLabel',
          type: 'string',
          default: "'Seguir'",
          description: 'Rótulo acessível do botão de seguir.',
        },
        { name: 'onFollow', type: '() => void', description: 'Acionado ao clicar em seguir.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: "Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>",
          description: 'Demais atributos HTML são repassados ao contêiner.',
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
  render: () => <AvatarDocumentationPage />,
};

/**
 * Playground com 100% das props do Avatar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Avatar',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
        background: args.ring
          ? 'var(--tik-color-surface-immersive)'
          : 'var(--tik-color-surface-primary)',
      }}
    >
      <Avatar {...args} />
    </div>
  ),
};

/**
 * Réplica visual dos frames oficiais do Figma que usam avatar.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-end' }}>
      <div style={{ background: 'var(--tik-color-surface-immersive)', padding: 20 }}>
        <Avatar size="sm" src={tikAvatarCraig} alt="" ring followable />
      </div>
      <Avatar size="xxl" src={tikAvatarJacob} alt="" />
      <Avatar size="xs" src={tikCommentAvatars[0]} alt="" />
      <Avatar
        size="lg"
        background="var(--tik-color-avatar-invite)"
        icon={<Icon name="addAccountStroke" size={25} tone="onImmersive" />}
      />
    </div>
  ),
};

/**
 * Os seis diâmetros nomeados do arquivo.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Avatar size={size} src={tikAvatarJacob} alt="" />
          <div
            style={{
              fontFamily: 'var(--tik-font-sans)',
              fontSize: 11,
              color: 'var(--tik-color-text-secondary)',
              marginTop: 6,
            }}
          >
            {size}
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Todas as combinações de conteúdo e adornos.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
      <Avatar size="sm" src={tikAvatarCraig} alt="" />
      <Avatar size="sm" src={tikAvatarCraig} alt="" ring />
      <Avatar size="sm" src={tikAvatarCraig} alt="" followable />
      <Avatar size="sm" src={tikAvatarCraig} alt="" ring followable />
      <Avatar size="sm" />
      <Avatar
        size="sm"
        background="var(--tik-color-avatar-contacts)"
        icon={<Icon name="contacts" size={20} tone="onImmersive" />}
      />
    </div>
  ),
};
