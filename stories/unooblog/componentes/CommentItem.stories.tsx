import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { CommentItem } from '../../../src/unooblog/components/CommentItem';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocPractices,
  UblDocStage,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';

const BAR = '#716C98';

/** Largura de uma coluna de comentários de demonstração. */
const COLUNA: React.CSSProperties = { width: 'min(560px, 100%)', boxSizing: 'border-box' };

/** Texto de um comentário de demonstração. */
const TEXTO =
  'Gostei da explicação sobre contêineres. O exemplo do cartão que se rearranja pela largura do próprio contêiner ficou muito claro.';

/**
 * Comentário com o estado de curtir guardado pelo produto.
 */
const ComentarioInterativo: React.FC<{ mine?: boolean }> = ({ mine }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(2);
  return (
    <div style={COLUNA}>
      <CommentItem
        author="Beatriz Nogueira"
        text={TEXTO}
        date="Há 2 horas"
        dateTime="2026-09-30T08:00:00-03:00"
        likes={likes}
        liked={liked}
        mine={mine}
        onToggleLike={() => {
          setLiked((atual) => !atual);
          setLikes((atual) => atual + (liked ? -1 : 1));
        }}
        onReply={() => undefined}
        onDelete={() => undefined}
      />
    </div>
  );
};

/**
 * Página de documentação rica do componente CommentItem.
 */
const CommentItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Comentários"
      title="CommentItem"
      description="Um comentário de leitor: avatar, nome em negrito, data relativa, texto e a linha de ações — curtir, responder e, só nos comentários de quem lê, excluir. É a peça que o CommentThread repete em fio."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma voz da conversa, com o que a pessoa pode fazer a seguir."
    />
    <UblDocGrid>
      <UblDocCard icon="💬" title="Conversa sob o post">
        Cada comentário traz quem escreveu, quando e o que disse, no degrau de texto de 16/24 — a
        prosa de 18/28 fica para o post.
      </UblDocCard>
      <UblDocCard icon="👍" title="Curtir com contagem">
        O botão é um alternador (<code>aria-pressed</code>) e a contagem entra no nome acessível:
        “Curtir comentário de Beatriz, 3 curtidas”.
      </UblDocCard>
      <UblDocCard icon="↩️" title="Respostas recuadas">
        <code>isReply</code> recua o comentário com um filete à esquerda; a menção a quem foi
        respondido aparece quando a resposta é a outra resposta.
      </UblDocCard>
      <UblDocCard icon="🗑️" title="Excluir só o meu">
        O botão “Excluir meu comentário” só existe com <code>mine</code>: ninguém vê a ação num
        comentário alheio.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UblDocSpecs
      component="CommentItem"
      layout="Grade de duas colunas · avatar (32px) · conteúdo"
      specs={[
        { label: 'Avatar', value: 'Avatar md · 32px (--ubl-avatar-md) · decorativo (alt vazio)' },
        { label: 'Nome', value: 'Label (14/20) em negrito · --ubl-color-text-primary' },
        { label: 'Data', value: 'Caption (12/18) · --ubl-color-text-secondary · <time dateTime>' },
        { label: 'Texto', value: 'Body-lg (16/24) · quebras de linha preservadas' },
        { label: 'Ações', value: 'IconButton sm (curtir, excluir) e Button ghost sm (responder)' },
        { label: 'Resposta', value: 'filete de 2px em --ubl-color-border-subtle + recuo de 16px' },
        { label: 'Destaque', value: 'fundo --ubl-color-background-subtle + “em destaque” em texto oculto' },
        { label: 'Raiz', value: '<article aria-labelledby> (o nome do autor)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Corpo em body-lg, não em prose',
          detail:
            'a prosa do post é 18/28; comentário é texto curto e o degrau 16/24 mantém o fio mais denso sem cair abaixo de 16px.',
        },
        {
          subject: 'Contagem de curtidas no nome, não ao lado',
          detail:
            'o número visível é aria-hidden e o nome do botão diz “…, 3 curtidas”. Assim o leitor de tela ouve a contagem uma vez só e o nome do botão não muda quando a pessoa curte (quem muda é o aria-pressed).',
        },
        {
          subject: 'Destaque também em texto, nunca só na cor',
          detail:
            'o fundo background-subtle é sutil e some para quem não distingue tons. “, em destaque” é anunciado depois do nome, em texto visualmente oculto.',
        },
        {
          subject: 'Resposta com filete e menção',
          detail:
            'o recuo vem do filete de border-subtle; a menção “@nome” só aparece quando a resposta é a uma resposta (a árvore tem dois níveis), com “Em resposta a nome:” para o leitor de tela.',
        },
        {
          subject: 'Excluir só com mine, em botão de glifo',
          detail:
            'a ação destrutiva fica à direita, isolada das outras duas, e é um IconButton com o rótulo “Excluir meu comentário”. A confirmação, se o produto quiser, é dele: o componente só avisa por onDelete.',
        },
        {
          subject: 'Data pronta por prop',
          detail:
            'o componente não formata datas; o texto relativo vem de ublTimeAgo, num fuso explícito (o CommentThread faz isso). dateTime leva o ISO para máquinas.',
        },
        {
          subject: 'Sem “ver mais”',
          detail:
            'o texto não é truncado em “ver mais”: comentários têm limite de 1000 caracteres no compositor e cabem inteiros.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Cada zona do comentário." />
    <UblDocStage surface="page" align="flex-start" padding={16}>
      <div style={COLUNA}>
        <CommentItem
          author="Beatriz Nogueira"
          text={TEXTO}
          date="Há 2 horas"
          dateTime="2026-09-30T08:00:00-03:00"
          likes={3}
          mine
          onToggleLike={() => undefined}
          onReply={() => undefined}
          onDelete={() => undefined}
        />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UblDocAnatomy
          zones={[
            { name: 'Avatar', role: 'Retrato ou iniciais, decorativo: o nome está ao lado.', token: '--ubl-avatar-md' },
            { name: 'Nome', role: 'Autor em negrito; nomeia o <article>.', token: 'Label' },
            { name: 'Data', role: 'Texto relativo dentro de <time>.', token: 'Caption' },
            { name: 'Texto', role: 'Corpo do comentário, com quebras preservadas.', token: 'Body-lg' },
            { name: 'Curtir', role: 'Alternador com contagem no nome acessível.', token: '--ubl-color-icon-accent' },
            { name: 'Responder', role: 'Botão discreto com glifo e rótulo.', token: 'Button ghost sm' },
            { name: 'Excluir', role: 'Só com mine; glifo com rótulo.', token: 'IconButton sm' },
          ]}
        />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada comentário é o componente real."
    />
    <UblDocStage label="Padrão, curtido, meu" surface="page" direction="column" align="stretch" padding={16} gap={0}>
      <CommentItem author="Rafael Lima" text="Concordo! Só senti falta de um exemplo com três colunas." date="Há 1 hora" likes={0} onToggleLike={() => undefined} onReply={() => undefined} />
      <CommentItem author="Beatriz Nogueira" text={TEXTO} date="Há 2 horas" likes={12} liked onToggleLike={() => undefined} onReply={() => undefined} />
      <CommentItem author="Você" text="Salvei nos favoritos para reler com calma. 🌱" date="Ontem" likes={1} mine onToggleLike={() => undefined} onReply={() => undefined} onDelete={() => undefined} />
    </UblDocStage>
    <UblDocStage label="Resposta, resposta de resposta e destaque" surface="page" direction="column" align="stretch" padding={16} gap={0}>
      <CommentItem author="Rafael Lima" text="Concordo! Só senti falta de um exemplo com três colunas." date="Há 1 hora" likes={3} isReply onToggleLike={() => undefined} onReply={() => undefined} />
      <CommentItem author="Beatriz Nogueira" text="Boa ideia, vou testar e conto aqui." date="Há 20 minutos" likes={1} isReply replyingToName="Rafael Lima" onToggleLike={() => undefined} onReply={() => undefined} />
      <CommentItem author="Você" text="Acabei de publicar este comentário." date="Agora" likes={0} mine highlighted onToggleLike={() => undefined} onReply={() => undefined} onDelete={() => undefined} />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como compor um comentário." />
    <UblDocPractices
      dos={[
        'Entregar a data já formatada (ublTimeAgo) e o ISO em dateTime.',
        'Mostrar “Excluir meu comentário” apenas com mine.',
        'Guardar o estado de curtir no produto e passar liked e likes atualizados.',
        'Usar highlighted para o comentário recém-publicado, e rolar até ele.',
        'Usar isReply dentro de uma lista aninhada, nunca solto.',
      ]}
      donts={[
        'Montar o nome do botão de curtir por fora: a contagem já está no rótulo.',
        'Mostrar excluir em comentário alheio, mesmo desabilitado.',
        'Indicar o destaque só pela cor do fundo.',
        'Passar HTML em text: o texto é puro, com quebras preservadas.',
        'Truncar o comentário com reticências: ele cabe inteiro.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Nome, data, destaque e filete acompanham o tema."
    />
    <UblDocThemeSwitcher surface="page" padding={16}>
      {(tema) => (
        <div key={tema} style={COLUNA}>
          <CommentItem author="Beatriz Nogueira" text={TEXTO} date="Há 2 horas" likes={3} liked onToggleLike={() => undefined} onReply={() => undefined} />
          <CommentItem author="Rafael Lima" text="Concordo!" date="Há 1 hora" likes={0} isReply highlighted onToggleLike={() => undefined} onReply={() => undefined} />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UblDocPropsTable
      title="CommentItem"
      rows={[
        { name: 'author', type: 'string', description: 'Nome de quem comentou; nomeia o comentário.' },
        { name: 'avatarSrc', type: 'string', description: 'Retrato; sem ele, mostra as iniciais.' },
        { name: 'text', type: 'string', description: 'Texto do comentário, com quebras preservadas.' },
        { name: 'date', type: 'string', description: 'Data já formatada, por exemplo “Há 2 horas”.' },
        { name: 'dateTime', type: 'string', description: 'ISO 8601 do atributo dateTime do <time>.' },
        { name: 'likes', type: 'number', description: 'Número de curtidas; entra no nome acessível do botão.' },
        { name: 'liked', type: 'boolean', default: 'false', description: 'Quem lê já curtiu: liga aria-pressed.' },
        { name: 'mine', type: 'boolean', default: 'false', description: 'Comentário de quem lê: mostra “Excluir meu comentário”.' },
        { name: 'isReply', type: 'boolean', default: 'false', description: 'Resposta: recua com um filete à esquerda.' },
        { name: 'highlighted', type: 'boolean', default: 'false', description: 'Destaque: muda o fundo e anuncia “em destaque”.' },
        { name: 'replyingToName', type: 'string', description: 'Menção a quem foi respondido (resposta de resposta).' },
        { name: 'replying', type: 'boolean', description: 'Há um compositor aberto sob o comentário: liga aria-expanded em “Responder”.' },
        { name: 'replyLabel', type: 'string', default: "'Responder'", description: 'Rótulo do botão de responder.' },
        { name: 'deleteLabel', type: 'string', default: "'Excluir meu comentário'", description: 'Rótulo do botão de excluir.' },
        { name: 'onToggleLike', type: '() => void', description: 'Curtir ou descurtir.' },
        { name: 'onReply', type: '() => void', description: 'Pedir para responder.' },
        { name: 'onDelete', type: '() => void', description: 'Excluir; o botão só existe com mine.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className / style', type: 'string / CSSProperties', description: 'Classe e estilo da raiz.' },
        { name: '...article', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos, repassados ao <article>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof CommentItem> = {
  title: 'Unooblog/Componentes/CommentItem',
  component: CommentItem,
  parameters: { layout: 'padded' },
  argTypes: {
    author: { control: 'text', description: 'Nome de quem comentou.' },
    avatarSrc: { control: 'text', description: 'Retrato (vazio mostra as iniciais).' },
    text: { control: 'text', description: 'Texto do comentário.' },
    date: { control: 'text', description: 'Data já formatada.' },
    dateTime: { control: 'text', description: 'ISO 8601 do <time>.' },
    likes: { control: { type: 'number', min: 0 }, description: 'Número de curtidas.' },
    liked: { control: 'boolean', description: 'Quem lê já curtiu.' },
    mine: { control: 'boolean', description: 'Comentário de quem lê (mostra excluir).' },
    isReply: { control: 'boolean', description: 'Resposta recuada.' },
    highlighted: { control: 'boolean', description: 'Comentário em destaque.' },
    replyingToName: { control: 'text', description: 'Menção a quem foi respondido.' },
    replying: { control: 'boolean', description: 'Compositor de resposta aberto.' },
    replyLabel: { control: 'text', description: 'Rótulo de responder.' },
    deleteLabel: { control: 'text', description: 'Rótulo de excluir.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onToggleLike: { action: 'onToggleLike' },
    onReply: { action: 'onReply' },
    onDelete: { action: 'onDelete' },
  },
  args: {
    author: 'Beatriz Nogueira',
    text: TEXTO,
    date: 'Há 2 horas',
    dateTime: '2026-09-30T08:00:00-03:00',
    likes: 3,
    liked: false,
    mine: false,
    isReply: false,
    highlighted: false,
    replying: false,
    replyLabel: 'Responder',
    deleteLabel: 'Excluir meu comentário',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof CommentItem>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CommentItemDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do CommentItem',
  render: (args) => (
    <div
      data-ubl-theme={args.theme}
      style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-page)' }}
    >
      <CommentItem {...args} />
    </div>
  ),
};

/**
 * Composição realista: um trecho da conversa sob um post, com resposta e menção.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: trecho da conversa',
  render: () => (
    <div style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-page)' }}>
      <CommentItem author="Beatriz Nogueira" text={TEXTO} date="Há 2 horas" likes={12} liked onToggleLike={() => undefined} onReply={() => undefined} />
      <CommentItem author="Rafael Lima" text="Concordo! Só senti falta de um exemplo com três colunas." date="Há 1 hora" likes={3} isReply onToggleLike={() => undefined} onReply={() => undefined} />
      <CommentItem author="Beatriz Nogueira" text="Boa ideia, vou testar e conto aqui." date="Há 20 minutos" likes={1} isReply replyingToName="Rafael Lima" onToggleLike={() => undefined} onReply={() => undefined} />
    </div>
  ),
};

/**
 * O comentário em larguras de contêiner estreita, média e larga.
 */
export const Tamanhos: Story = {
  name: 'Larguras',
  render: () => (
    <div style={{ display: 'grid', gap: 24, padding: 16, background: 'var(--ubl-color-background-page)' }}>
      {[280, 420, 680].map((largura) => (
        <div key={largura} style={{ width: largura, maxWidth: '100%' }}>
          <CommentItem author="Beatriz Nogueira" text={TEXTO} date="Há 2 horas" likes={3} onToggleLike={() => undefined} onReply={() => undefined} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Padrão, curtido, meu, resposta, resposta com menção e em destaque.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-page)' }}>
      <CommentItem author="Rafael Lima" text="Comentário padrão." date="Há 1 hora" likes={0} onToggleLike={() => undefined} onReply={() => undefined} />
      <CommentItem author="Rafael Lima" text="Comentário curtido." date="Há 1 hora" likes={5} liked onToggleLike={() => undefined} onReply={() => undefined} />
      <CommentItem author="Você" text="Comentário meu, com excluir." date="Há 1 hora" likes={1} mine onToggleLike={() => undefined} onReply={() => undefined} onDelete={() => undefined} />
      <CommentItem author="Rafael Lima" text="Resposta recuada." date="Há 1 hora" likes={0} isReply onToggleLike={() => undefined} onReply={() => undefined} />
      <CommentItem author="Beatriz Nogueira" text="Resposta a uma resposta." date="Há 1 hora" likes={0} isReply replyingToName="Rafael Lima" onToggleLike={() => undefined} onReply={() => undefined} />
      <CommentItem author="Você" text="Comentário em destaque." date="Agora" likes={0} mine highlighted onToggleLike={() => undefined} onReply={() => undefined} onDelete={() => undefined} />
    </div>
  ),
};

/**
 * Sem retrato, texto longo com quebras, compositor de resposta aberto e zero curtidas.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-page)' }}>
      <CommentItem author="Carolina Dias" text="Sem retrato: o avatar mostra as iniciais." date="Há 3 dias" likes={0} onToggleLike={() => undefined} onReply={() => undefined} />
      <CommentItem
        author="Rafael Lima"
        text={'Texto longo com quebras de linha.\n\nSegundo parágrafo, com uma palavra enorme: supercalifragilisticoexpialidosoparaverificarqueaquebradelinhaacontececomoesperado.'}
        date="Há 1 hora"
        likes={2}
        onToggleLike={() => undefined}
        onReply={() => undefined}
      />
      <CommentItem author="Beatriz Nogueira" text="Há um compositor de resposta aberto abaixo deste comentário." date="Há 2 horas" likes={4} replying onToggleLike={() => undefined} onReply={() => undefined} />
    </div>
  ),
};

/**
 * O comentário nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div
          key={tema}
          data-ubl-theme={tema}
          style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-page)' }}
        >
          <CommentItem author="Beatriz Nogueira" text={TEXTO} date="Há 2 horas" likes={3} liked onToggleLike={() => undefined} onReply={() => undefined} />
          <CommentItem author="Rafael Lima" text="Resposta em destaque." date="Agora" likes={0} isReply highlighted onToggleLike={() => undefined} onReply={() => undefined} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Curtir alterna aria-pressed e a contagem do nome acessível; responder chama o callback.
 */
export const CurtirEResponder: Story = {
  name: 'Curtir e responder',
  args: { onReply: fn() },
  render: (args) => (
    <div style={COLUNA}>
      <ComentarioInterativo />
      <CommentItem {...args} author="Rafael Lima" text="Teste de responder." date="Há 1 hora" likes={0} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);

    const curtir = tela.getByRole('button', { name: 'Curtir comentário de Beatriz Nogueira, 2 curtidas' });
    await expect(curtir).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(curtir);
    const curtido = tela.getByRole('button', { name: 'Curtir comentário de Beatriz Nogueira, 3 curtidas' });
    await expect(curtido).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(curtido);
    await expect(
      tela.getByRole('button', { name: 'Curtir comentário de Beatriz Nogueira, 2 curtidas' })
    ).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(tela.getByRole('button', { name: 'Responder a Rafael Lima' }));
    await expect(args.onReply).toHaveBeenCalledTimes(1);
  },
};

/**
 * Excluir só aparece no comentário de quem lê e avisa o produto ao ser clicado.
 */
export const ExcluirSoNoMeu: Story = {
  name: 'Excluir só no meu comentário',
  args: { onDelete: fn() },
  render: (args) => (
    <div style={COLUNA}>
      <CommentItem {...args} author="Rafael Lima" text="Comentário alheio." date="Há 1 hora" likes={0} mine={false} />
      <CommentItem {...args} author="Você" text="Comentário meu." date="Há 1 hora" likes={0} mine />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);

    // Só o comentário de quem lê tem o botão: um, entre dois comentários.
    const botoes = tela.getAllByRole('button', { name: 'Excluir meu comentário' });
    await expect(botoes).toHaveLength(1);

    await userEvent.click(botoes[0]);
    await expect(args.onDelete).toHaveBeenCalledTimes(1);
  },
};

/**
 * O destaque é anunciado em texto, e a menção de resposta de resposta tem o texto para leitor de tela.
 */
export const DestaqueEMencao: Story = {
  name: 'Destaque e menção acessíveis',
  render: () => (
    <div style={COLUNA}>
      <CommentItem author="Você" text="Acabei de publicar." date="Agora" likes={0} highlighted />
      <CommentItem author="Beatriz Nogueira" text="Boa ideia." date="Há 20 minutos" likes={0} isReply replyingToName="Rafael Lima" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('article', { name: /^Você\s*,?\s*em destaque$/ })).toBeInTheDocument();
    await expect(tela.getByText('Em resposta a Rafael Lima:')).toBeInTheDocument();
    await expect(tela.getByText('Acabei de publicar.').closest('article')).toHaveClass(
      'ubl-comment-item--highlighted'
    );
  },
};
