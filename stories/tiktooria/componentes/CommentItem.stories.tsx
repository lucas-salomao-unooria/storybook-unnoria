import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { CommentItem, Sheet } from '../../../src/tiktooria';
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
import { tikCommentAvatars, tikComments } from '../fixtures';

const meta: Meta<typeof CommentItem> = {
  title: 'Tik Tooria/Componentes/CommentItem',
  component: CommentItem,
  parameters: { layout: 'padded' },
  argTypes: {
    author: { control: 'text' },
    text: { control: 'text' },
    time: { control: 'text' },
    avatarSrc: { control: 'text' },
    verified: { control: 'boolean' },
    likes: { control: 'text' },
    liked: { control: 'boolean' },
    repliesLabel: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    author: 'martini_rond',
    text: 'How neatly I write the date in my book',
    time: '22h',
    avatarSrc: tikCommentAvatars[0],
    verified: false,
    likes: '8098',
    liked: false,
    repliesLabel: 'View replies (4)',
  },
};

export default meta;

type Story = StoryObj<typeof CommentItem>;


const CommentItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Folha"
      title="CommentItem"
      description="Comentário da folha, com 60px de altura sem respostas e 80px com o atalho de respostas. A fotografia é um disco de 32px na calha de 16px; o corpo alinha em 60px; o coração e o contador ficam na borda direita. O autor usa Semibold 13 em tom secundário e o texto usa Regular 15 em tom primário — uma inversão de hierarquia deliberada do arquivo."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="💬" title="Duas alturas">
        60px sem respostas e 80px com o atalho “View replies (n)”. As duas existem no arquivo.
      </TikDocCard>
      <TikDocCard icon="🔀" title="Hierarquia invertida">
        O autor é o elemento mais apagado (Semibold 13 em cinza) e o texto é o mais escuro (Regular 15 em #161722). É deliberado: o conteúdo importa mais que a autoria.
      </TikDocCard>
      <TikDocCard icon="✔️" title="Selo verificado">
        Disco de 10px em <code>--tik-color-brand-cyan</code>, ao lado do autor. Aparece uma vez no arquivo.
      </TikDocCard>
      <TikDocCard icon="❤️" title="Curtida à direita">
        Coração de contorno com o contador abaixo. O arquivo não publica o estado curtido.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:968"
      frameName="Comment — TikTok Comments"
      specs={[
        { label: 'Alturas', value: '60px e 80px' },
        { label: 'Fotografia', value: '32px na calha de 16px' },
        { label: 'Corpo', value: 'alinhado em 60px' },
        { label: 'Autor', value: 'Semibold 13 · #86878B' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Estado curtido',
          detail:
            'o arquivo publica apenas o coração de contorno. A prop liked troca o glifo para o coração preenchido da trilha de ações — extensão necessária, já que o produto precisa refletir a ação do usuário.',
        },
        {
          subject: 'Altura por conteúdo',
          detail:
            'o arquivo fixa 60px e 80px. O componente calcula a altura pelo conteúdo, o que dá as mesmas medidas com os textos do arquivo e evita corte quando o comentário quebra em duas linhas.',
        },
        {
          subject: 'Tempo dentro do texto',
          detail:
            'o arquivo grava o tempo como um segundo span no mesmo nó do comentário. O componente mantém esse arranjo, o que preserva a quebra de linha natural entre texto e tempo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Fotografia', role: 'Avatar de 32px na calha de 16px.', token: '--tik-avatar-xs' },
        { name: 'Autor', role: 'Semibold 13 em tom secundário, com selo opcional.', token: '--tik-font-meta-strong-* · --tik-color-text-secondary' },
        { name: 'Texto', role: 'Regular 15 em tom primário, seguido do tempo em 13.', token: '--tik-font-body-*' },
        { name: 'Respostas', role: 'Atalho em Semibold 13 com divisa, opcional.', token: 'glifo caretReplies' },
        { name: 'Curtida', role: 'Coração e contador na borda direita.', token: 'glifo heartStroke' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Os sete comentários do arquivo" surface="sheet" align="stretch" direction="column" width={414} gap={0}>
      {tikComments.map((comment) => (
        <CommentItem key={comment.author} {...comment} />
      ))}
    </TikDocStage>
    <TikDocStage label="Com selo verificado e curtido" surface="sheet" align="stretch" direction="column" width={414} gap={0}>
      <CommentItem
        author="mis_potter"
        text="Sjpuld’ve used that on his forces 😷😷"
        time="13h"
        avatarSrc={tikCommentAvatars[3]}
        verified
        likes="8098"
        repliesLabel="View replies (4)"
      />
      <CommentItem
        author="karennne"
        text="No prressure"
        time="22h"
        avatarSrc={tikCommentAvatars[4]}
        likes="8099"
        liked
      />
    </TikDocStage>
    <TikDocStage label="Sem respostas e sem contador" surface="sheet" align="stretch" direction="column" width={414} gap={0}>
      <CommentItem
        author="zackjohn"
        text="Doing this would make me so anxious"
        time="22h"
        avatarSrc={tikCommentAvatars[5]}
        likes="8098"
      />
      <CommentItem
        author="joshua_l"
        text="My OCD couldn’t do it"
        time="15h"
        avatarSrc={tikCommentAvatars[6]}
      />
    </TikDocStage>
    <TikDocStage label="Comentário longo, quebrando em três linhas" surface="sheet" align="stretch" direction="column" width={414} gap={0}>
      <CommentItem
        author="craig_love"
        text="Um comentário deliberadamente longo, escrito para conferir a quebra de linha dentro da largura útil da folha e o alinhamento do coração à direita"
        time="3h"
        avatarSrc={tikCommentAvatars[7]}
        likes="12"
        repliesLabel="View replies (2)"
      />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Mantenha a hierarquia do arquivo: autor apagado, texto escuro.',
        'Informe repliesLabel apenas quando houver respostas.',
        'Use verified só em contas realmente verificadas.',
        'Coloque os comentários dentro de um Sheet.Body, que dá a rolagem.',
      ]}
      donts={[
        'Não destaque o autor mais que o texto.',
        'Não use o comentário fora da folha: ele depende da superfície #F5F5F4.',
        'Não omita likes se o produto exibe contagem — o espaço fica reservado de qualquer forma.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['sheet', 'chrome']} padding={0}>
      {() => (
        <div style={{ width: 414 }}>
          {tikComments.slice(0, 3).map((comment) => (
            <CommentItem key={comment.author} {...comment} />
          ))}
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="CommentItem"
      rows={[
        {
          name: 'author',
          type: "React.ReactNode",
          description:
            'Autor do comentário, em Semibold 13 e tom secundário.',
        },
        {
          name: 'text',
          type: "React.ReactNode",
          description:
            'Texto do comentário, em Regular 15 e tom primário.',
        },
        {
          name: 'time',
          type: "React.ReactNode",
          description:
            'Tempo decorrido, exibido após o texto em Regular 13.',
        },
        {
          name: 'avatarSrc',
          type: "string",
          description:
            'Endereço da fotografia do autor, exibida em 32px.',
        },
        {
          name: 'verified',
          type: "boolean",
          default: "false",
          description:
            'Exibe o selo de conta verificada de 10px ao lado do autor.',
        },
        {
          name: 'likes',
          type: "React.ReactNode",
          description:
            'Número de curtidas, exibido sob o coração.',
        },
        {
          name: 'liked',
          type: "boolean",
          default: "false",
          description:
            'Troca o coração de contorno pelo preenchido. Extensão documentada.',
        },
        {
          name: 'repliesLabel',
          type: "React.ReactNode",
          description:
            'Rótulo do atalho de respostas, como “View replies (4)”.',
        },
        {
          name: 'onLike',
          type: "() => void",
          description:
            'Acionado ao curtir o comentário.',
        },
        {
          name: 'onOpenReplies',
          type: "() => void",
          description:
            'Acionado ao abrir as respostas.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "React.HTMLAttributes<HTMLElement>",
          description:
            'Demais atributos HTML são repassados ao <article>.',
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
  render: () => <CommentItemDocumentationPage />,
};

/**
 * Playground com 100% das props do CommentItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do CommentItem',
  render: (args) => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-sheet)' }}>
      <CommentItem {...args} />
    </div>
  ),
};

/**
 * Réplica visual da folha de comentários do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-immersive)', paddingTop: 40 }}>
      <Sheet ariaLabel="Comentários">
        <Sheet.Header title="579 comments" showClose />
        <Sheet.Body style={{ maxHeight: 460 }}>
          {tikComments.map((comment) => (
            <CommentItem key={comment.author} {...comment} />
          ))}
        </Sheet.Body>
      </Sheet>
    </div>
  ),
};

/**
 * Todas as combinações de zonas do comentário.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-sheet)' }}>
      <CommentItem
        author="Com respostas"
        text="Comentário com atalho de respostas"
        time="22h"
        avatarSrc={tikCommentAvatars[0]}
        likes="8098"
        repliesLabel="View replies (4)"
      />
      <CommentItem
        author="Sem respostas"
        text="Comentário simples"
        time="15h"
        avatarSrc={tikCommentAvatars[1]}
        likes="8098"
      />
      <CommentItem
        author="Verificado"
        text="Comentário de conta verificada"
        time="13h"
        avatarSrc={tikCommentAvatars[3]}
        verified
        likes="8098"
      />
      <CommentItem
        author="Curtido"
        text="Comentário já curtido"
        time="2h"
        avatarSrc={tikCommentAvatars[4]}
        likes="8099"
        liked
      />
      <CommentItem author="Sem contador" text="Comentário sem curtidas" time="1h" />
    </div>
  ),
};

/**
 * Estados da curtida.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-sheet)' }}>
      <CommentItem
        author="martini_rond"
        text="Não curtido"
        time="22h"
        avatarSrc={tikCommentAvatars[0]}
        likes="8098"
      />
      <CommentItem
        author="martini_rond"
        text="Curtido"
        time="22h"
        avatarSrc={tikCommentAvatars[0]}
        likes="8099"
        liked
      />
    </div>
  ),
};
