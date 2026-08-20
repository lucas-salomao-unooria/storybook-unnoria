import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';

import { Comment } from '../../../src/unitube';
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
import { comments } from '../fixtures';

const meta: Meta<typeof Comment> = {
  title: 'Unitube/Componentes/Comment',
  component: Comment,
  parameters: { layout: 'padded' },
  argTypes: {
    avatarSrc: { control: 'text' },
    avatarInitials: { control: 'text' },
    authorName: { control: 'text' },
    timestamp: { control: 'text' },
    commentText: { control: 'text' },
    likeCount: { control: 'number' },
    dislikeCount: { control: 'number' },
    liked: { control: 'boolean' },
    replyLabel: { control: 'text' },
    showReply: { control: 'boolean' },
    className: { control: 'text' },
    onLike: { action: 'onLike' },
    onDislike: { action: 'onDislike' },
    onReply: { action: 'onReply' },
  },
  args: {
    avatarSrc: comments[0].avatarSrc,
    avatarInitials: 'UN',
    authorName: 'User Name',
    timestamp: '8 hours ago',
    commentText: 'Wow, world is full of different skills',
    likeCount: 3,
    dislikeCount: 3,
    liked: false,
    replyLabel: 'REPLY',
    showReply: true,
  },
};

export default meta;

type Story = StoryObj<typeof Comment>;

const CommentDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Componentes • Conteúdo"
      title="Comment"
      description="Reprodução do nó Content/Comment (24:2191), o item da lista de comentários. É o único ponto do arquivo em que três degraus tipográficos convivem na mesma coluna — nome em Bold 13, data em Caption/Default e texto em Body/Medium —, todos com altura de linha declarada de 20px, o que mantém o ritmo vertical constante apesar dos corpos distintos."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="O item da lista de comentários."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="📏" title="Ritmo de 20px">
        Três corpos diferentes — 13, 12 e 14 — com a mesma altura de linha. É o que faz a coluna
        parecer alinhada apesar da variação tipográfica.
      </UniDocCard>
      <UniDocCard icon="👤" title="Avatar de 40px">
        Diâmetro exclusivo do comentário, com folga de 16px. Menor que os 48px da descrição e maior
        que os 36px do cartão de vídeo.
      </UniDocCard>
      <UniDocCard icon="👍" title="Glifos de 16px">
        Os ícones de curtida ficam em alvos de 32px com recuo de 8px, resultando em glifos de 16px —
        o mesmo alvo reduzido que o menu superior aplica.
      </UniDocCard>
      <UniDocCard icon="💬" title="Barra de três ações">
        Curtir com contagem, não curtir com contagem e responder. O rótulo “REPLY” usa
        Caption/Default em peso regular, não Bold.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="24:2191"
      frameName="Content/Comment"
      specs={[
        { label: 'Dimensões', value: '640 × 100' },
        { label: 'Avatar', value: '40px (--uni-avatar-lg)' },
        { label: 'Nome', value: 'Roboto Bold 13/20' },
        { label: 'Alvos de ação', value: '32px · glifo 16px' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Estado curtido',
          detail:
            'o arquivo publica apenas o coração de contorno. A prop liked troca o glifo por likedFill — que o arquivo publica para a barra lateral — e define aria-pressed, porque uma curtida sem estado não comunica se a ação já foi tomada.',
        },
        {
          subject: 'Roboto Bold 13 fora da escala',
          detail:
            'o nome do autor combina o corpo de Body/Small com peso Bold e altura de linha de 20px. A escala não declara esse par; ele foi preservado literal e anotado no CSS.',
        },
        {
          subject: 'Contagem de descurtidas',
          detail:
            'o arquivo mostra o número 3 ao lado dos dois glifos, provavelmente por duplicação da instância. A prop dislikeCount é opcional: omiti-la deixa o botão apenas com o glifo, que é o comportamento esperado em produto.',
        },
        {
          subject: 'Semântica de artigo',
          detail:
            'o arquivo publica um frame estático. O componente renderiza <article> com <header>, porque o design mostra um item de conteúdo autoral em uma lista.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Coluna do retrato',
          role: 'Avatar de 40px com folga de 16px à direita.',
          token: '--uni-avatar-lg',
        },
        {
          name: 'Cabeçalho',
          role: 'Nome em Bold 13/20 e data em Caption/Default, alinhados pela base.',
          token: '--uni-font-body-sm-size · --uni-font-weight-bold',
        },
        {
          name: 'Texto',
          role: 'Body/Medium em texto primário, com quebra em qualquer ponto.',
          token: '--uni-font-body-md-*',
        },
        {
          name: 'Barra de ações',
          role: 'Curtir, não curtir e responder, em alvos de 32px.',
          token: '--uni-color-text-secondary',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: a lista de comentários" surface="primary" direction="column" align="stretch" gap={0}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          avatarSrc={comment.avatarSrc}
          authorName={comment.authorName}
          timestamp={comment.timestamp}
          commentText={comment.commentText}
          likeCount={comment.likeCount}
          dislikeCount={comment.dislikeCount}
        />
      ))}
    </UniDocStage>
    <UniDocStage label="Estados" surface="primary" direction="column" align="stretch" gap={0}>
      <Comment
        avatarSrc={comments[0].avatarSrc}
        authorName="Não curtido"
        timestamp="8 hours ago"
        commentText="O coração de contorno é o único estado que o arquivo publica."
        likeCount={3}
      />
      <Comment
        avatarSrc={comments[1].avatarSrc}
        authorName="Curtido"
        timestamp="4 days ago"
        commentText="O glifo preenchido vem da barra lateral, e aria-pressed comunica o estado."
        likeCount={4}
        liked
      />
      <Comment
        avatarSrc={comments[2].avatarSrc}
        authorName="Sem contagens"
        timestamp="1 week ago"
        commentText="Os botões ficam apenas com o glifo quando nenhuma contagem é informada."
      />
      <Comment
        avatarInitials="AW"
        authorName="Sem retrato e sem resposta"
        timestamp="2 weeks ago"
        commentText="O substituto por iniciais entra quando o retrato não é informado."
        likeCount={41}
        showReply={false}
      />
    </UniDocStage>
    <UniDocStage label="Texto longo" surface="primary" direction="column" align="stretch" gap={0}>
      <Comment
        avatarSrc={comments[3].avatarSrc}
        authorName="Anna White"
        timestamp="2 weeks ago"
        commentText="Um comentário mais longo, que ocupa várias linhas dentro da coluna de 544px reservada pelo arquivo. O texto quebra em qualquer ponto, para que palavras muito longas não estourem a largura do bloco."
        likeCount={41}
        dislikeCount={0}
      />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use liked para refletir o estado real da curtida do usuário.',
        'Omita dislikeCount: em produto, a contagem de descurtidas geralmente não é pública.',
        'Localize replyLabel junto do resto da interface.',
        'Empilhe os comentários diretamente: o recuo inferior de 16px de cada um é a separação.',
      ]}
      donts={[
        'Não use glifos de 24px na barra de ações: o arquivo os reduz a 16px.',
        'Não substitua o par Bold 13/20 do nome por outro degrau.',
        'Não adicione fio entre comentários — o arquivo não os separa.',
        'Não remova o aria-pressed do botão de curtida.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O comentário sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'deep']}>
      {() => (
        <div style={{ width: 560, maxWidth: '100%' }}>
          <Comment
            avatarSrc={comments[0].avatarSrc}
            authorName="User Name"
            timestamp="8 hours ago"
            commentText="Wow, world is full of different skills"
            likeCount={3}
          />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="Comment"
      rows={[
        { name: 'avatarSrc', type: 'string', description: 'Endereço do retrato do autor.' },
        {
          name: 'avatarInitials',
          type: 'string',
          description: 'Iniciais exibidas quando avatarSrc não é informado.',
        },
        { name: 'authorName', type: 'React.ReactNode', description: 'Nome do autor.' },
        { name: 'timestamp', type: 'React.ReactNode', description: 'Data relativa da publicação.' },
        { name: 'commentText', type: 'React.ReactNode', description: 'Texto do comentário.' },
        {
          name: 'likeCount',
          type: 'number',
          description: 'Contagem de curtidas. Quando omitida, o botão fica apenas com o glifo.',
        },
        {
          name: 'dislikeCount',
          type: 'number',
          description: 'Contagem de descurtidas. Geralmente omitida em produto.',
        },
        {
          name: 'liked',
          type: 'boolean',
          default: 'false',
          description:
            'Marca o comentário como curtido: troca o glifo pelo preenchido e define aria-pressed.',
        },
        {
          name: 'replyLabel',
          type: 'React.ReactNode',
          default: "'REPLY'",
          description: 'Rótulo do botão de resposta.',
        },
        {
          name: 'showReply',
          type: 'boolean',
          default: 'true',
          description: 'Exibe o botão de resposta.',
        },
        {
          name: 'onLike · onDislike · onReply',
          type: '() => void',
          description: 'Manipuladores das três ações da barra.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
          description: 'Demais atributos são repassados ao <article>.',
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
  render: () => <CommentDocumentationPage />,
};

/**
 * Playground com 100% das props do Comment expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Comment',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{ padding: 40, background: 'var(--uni-color-background-primary)' }}
    >
      <div style={{ width: 640, maxWidth: '100%', margin: '0 auto' }}>
        <Comment {...args} />
      </div>
    </div>
  ),
};

/**
 * Réplica visual do nó `Content/Comment` (24:2191), 640×100.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 24, background: 'var(--uni-color-background-primary)' }}
    >
      <div style={{ width: 640, maxWidth: '100%' }}>
        <Comment
          avatarSrc={comments[0].avatarSrc}
          authorName="User Name"
          timestamp="8 hours ago"
          commentText="Wow, world is full of different skills"
          likeCount={3}
          dislikeCount={3}
        />
      </div>
    </div>
  ),
};

/**
 * Curtida interativa, com troca de glifo.
 */
export const Estados: Story = {
  render: () => {
    const LikeDemo = () => {
      const [liked, setLiked] = useState(false);
      return (
        <div
          data-uni-theme="dark"
          style={{ padding: 24, background: 'var(--uni-color-background-primary)', width: 640 }}
        >
          <Comment
            avatarSrc={comments[0].avatarSrc}
            authorName="User Name"
            timestamp="8 hours ago"
            commentText="Clique no coração para alternar o estado curtido."
            likeCount={liked ? 4 : 3}
            liked={liked}
            onLike={() => setLiked((current) => !current)}
          />
          <Comment
            avatarInitials="AC"
            authorName="Sem retrato"
            timestamp="4 days ago"
            commentText="O substituto por iniciais entra quando o retrato não é informado."
            likeCount={12}
          />
          <Comment
            avatarSrc={comments[2].avatarSrc}
            authorName="Sem contagem e sem resposta"
            timestamp="1 week ago"
            commentText="Os botões ficam apenas com o glifo."
            showReply={false}
          />
        </div>
      );
    };
    return <LikeDemo />;
  },
};
