import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { CommentThread } from '../../../src/unooblog/components/CommentThread';
import { CommentComposer } from '../../../src/unooblog/components/CommentComposer';
import { ublTimeAgo } from '../../../src/unooblog/content';
import type { UblComment } from '../../../src/unooblog/content';
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
import { ublComments, ublDemoNow } from '../fixtures';

const BAR = '#716C98';

/** Largura de uma coluna de leitura de demonstração. */
const COLUNA: React.CSSProperties = { width: 'min(680px, 100%)', boxSizing: 'border-box' };

/** Os comentários do post "Foco visível": oito raízes e respostas de um nível. */
const COMENTARIOS = ublComments.filter((comentario) => comentario.postId === 'foco-visivel');

/** Cadeia com resposta de resposta, fora de ordem, para provar o achatamento. */
const CADEIA: UblComment[] = [
  {
    id: 'raiz',
    postId: 'p',
    authorName: 'Beatriz Nogueira',
    text: 'Comentário raiz.',
    createdAt: '2026-09-30T08:00:00-03:00',
    likes: 1,
  },
  {
    id: 'resposta-2',
    postId: 'p',
    authorName: 'Caio Menezes',
    text: 'Resposta à resposta de Renata.',
    createdAt: '2026-09-30T09:30:00-03:00',
    parentId: 'resposta-1',
    likes: 0,
  },
  {
    id: 'resposta-1',
    postId: 'p',
    authorName: 'Renata Prado',
    text: 'Primeira resposta à raiz.',
    createdAt: '2026-09-30T08:40:00-03:00',
    parentId: 'raiz',
    likes: 2,
  },
];

/**
 * Fio completo e interativo: curtir, responder com compositor sob o comentário,
 * publicar um comentário novo ou uma resposta e excluir o que é meu.
 */
const FioInterativo: React.FC<{ inicial?: UblComment[] }> = ({ inicial = COMENTARIOS }) => {
  const [comentarios, setComentarios] = useState<UblComment[]>(inicial);
  const [curtidos, setCurtidos] = useState<string[]>([]);
  const [respondendo, setRespondendo] = useState<string | undefined>();
  const [destaque, setDestaque] = useState<string | undefined>();
  const [contador, setContador] = useState(0);

  const publicar = (texto: string, parentId?: string) => {
    const id = `novo-${contador}`;
    setContador((atual) => atual + 1);
    setComentarios((atuais) => [
      ...atuais,
      {
        id,
        postId: 'foco-visivel',
        authorName: 'Você',
        text: texto,
        createdAt: ublDemoNow,
        likes: 0,
        mine: true,
        parentId,
      },
    ]);
    setDestaque(id);
    setRespondendo(undefined);
  };

  return (
    <div style={COLUNA}>
      <CommentThread
        comments={comentarios}
        now={ublDemoNow}
        likedIds={curtidos}
        highlightedId={destaque}
        replyingToId={respondendo}
        composer={<CommentComposer onSubmit={(texto) => publicar(texto)} />}
        renderComposer={(parentId) => (
          <CommentComposer
            replyingTo={comentarios.find((item) => item.id === parentId)?.authorName}
            onCancel={() => setRespondendo(undefined)}
            onSubmit={(texto) => publicar(texto, parentId)}
          />
        )}
        onToggleLike={(id) => {
          const jaCurtiu = curtidos.includes(id);
          setCurtidos((atuais) => (jaCurtiu ? atuais.filter((item) => item !== id) : [...atuais, id]));
          setComentarios((atuais) =>
            atuais.map((item) => (item.id === id ? { ...item, likes: item.likes + (jaCurtiu ? -1 : 1) } : item))
          );
        }}
        onReply={(id) => setRespondendo((atual) => (atual === id ? undefined : id))}
        onDelete={(id) => setComentarios((atuais) => atuais.filter((item) => item.id !== id))}
      />
    </div>
  );
};

/**
 * Página de documentação rica do componente CommentThread.
 */
const CommentThreadDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Comentários"
      title="CommentThread"
      description="A seção de comentários de um post: título com a contagem, comentários em fio e respostas recuadas, montados a partir de uma lista plana com parentId. O compositor de resposta abre logo abaixo do comentário respondido."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="A conversa sob o post, lida de cima para baixo."
    />
    <UblDocGrid>
      <UblDocCard icon="🌳" title="Árvore de dois níveis">
        Cada comentário-raiz tem as respostas numa lista aninhada, em ordem cronológica. Resposta de
        resposta sobe para o nível 1 e mantém a menção a quem foi respondido.
      </UblDocCard>
      <UblDocCard icon="↩️" title="Compositor no lugar">
        <code>renderComposer(parentId)</code> desenha o compositor sob o comentário respondido
        (<code>replyingToId</code>): a pessoa responde onde está lendo.
      </UblDocCard>
      <UblDocCard icon="🕒" title="Datas relativas estáveis">
        “Há 2 horas” sai de <code>ublTimeAgo</code> com um fuso e um “agora” explícitos: a mesma
        conversa lê igual na máquina de quem desenvolve e no CI.
      </UblDocCard>
      <UblDocCard icon="🫥" title="Estado vazio">
        Sem comentários, a seção mostra o <code>emptyLabel</code> em vez de uma lista vazia.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UblDocSpecs
      component="CommentThread"
      layout="Seção · título e selo · lista de comentários com listas aninhadas"
      specs={[
        { label: 'Raiz', value: '<section aria-labelledby> nomeada pelo título' },
        { label: 'Título', value: 'Heading-4 (20/30) · h2 por padrão · Badge neutro com a contagem' },
        { label: 'Lista', value: '<ol> de raízes; <ol> aninhada de respostas dentro de cada <li>' },
        { label: 'Recuo das respostas', value: 'avatar md (32px) + vão de 12px' },
        { label: 'Separação', value: 'fio de 1px em --ubl-color-border-subtle entre as raízes' },
        { label: 'Compositor', value: 'cartão --ubl-color-background-card · raio 12px' },
        { label: 'Vazio', value: 'cartão lavanda com Body-lg em --ubl-color-text-secondary' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Lista plana na entrada, árvore na saída',
          detail:
            'quem busca os comentários recebe uma lista com parentId; montar a árvore dentro do componente evita que cada produto reinvente a ordenação. As raízes mantêm a ordem recebida (o produto decide “mais recentes” ou “mais antigos”) e as respostas saem em ordem cronológica.',
        },
        {
          subject: 'Só dois níveis, com menção',
          detail:
            'fios mais fundos esmagam a coluna de leitura no celular. Resposta de resposta é achatada no nível 1 e ganha “@nome” (com “Em resposta a nome:” para o leitor de tela) para preservar com quem a pessoa conversava. Pai ausente ou ciclo nos dados: o comentário vira raiz, nunca some.',
        },
        {
          subject: 'Listas aninhadas reais',
          detail:
            'as respostas ficam numa <ol> dentro do <li> do pai: o leitor de tela anuncia “lista com 2 itens” dentro do comentário e quem navega por listas entende a hierarquia sem depender do recuo visual.',
        },
        {
          subject: 'Compositor sob o comentário respondido',
          detail:
            'responder abre o compositor logo abaixo do comentário — e não numa caixa fixa no fim da página —, com aria-expanded em “Responder”. O componente só abre o espaço (renderComposer); quem decide o que acontece ao enviar é o produto.',
        },
        {
          subject: 'Estado de curtir e destaque por id, vindos de fora',
          detail:
            'UblComment não carrega “curtido por mim”: likedIds e highlightedId são props, para o produto guardar o estado da sessão sem mutar os comentários.',
        },
        {
          subject: 'Slot composer para o comentário novo',
          detail:
            'além de renderComposer, o slot composer abre um espaço fixo entre o título e a lista (ou onde o produto o encaixar), para o compositor de comentário de primeiro nível. É uma extensão do contrato, aditiva.',
        },
        {
          subject: 'Contagem fora do nome da seção',
          detail:
            'o nome da seção é só o título; o Badge ao lado traz o total. Misturar o número no nome faria o leitor de tela repeti-lo a cada pouso na região.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Cada zona da seção." />
    <UblDocStage surface="page" align="flex-start" padding={16}>
      <div style={COLUNA}>
        <CommentThread
          comments={COMENTARIOS.slice(0, 3)}
          now={ublDemoNow}
          onToggleLike={() => undefined}
          onReply={() => undefined}
        />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UblDocAnatomy
          zones={[
            { name: 'Título e contagem', role: 'h2 que nomeia a seção, com o total num Badge neutro.', token: 'Heading-4' },
            { name: 'Slot composer', role: 'Compositor de comentário novo, opcional.', token: '--ubl-color-background-card' },
            { name: 'Lista de raízes', role: '<ol> com os comentários sem parentId.', token: '--ubl-color-border-subtle' },
            { name: 'CommentItem', role: 'Cada comentário, com data relativa de ublTimeAgo.', token: 'CommentItem' },
            { name: 'Lista de respostas', role: '<ol> aninhada, recuada, em ordem cronológica.', token: 'avatar md + 12px' },
            { name: 'Compositor de resposta', role: 'renderComposer sob o comentário respondido.', token: '--ubl-radius-m' },
          ]}
        />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada fio é o componente real."
    />
    <UblDocStage label="Fio com respostas, curtida e destaque" surface="page" direction="column" align="stretch" padding={16}>
      <CommentThread
        comments={COMENTARIOS}
        now={ublDemoNow}
        likedIds={['c-foco-1']}
        highlightedId="c-foco-voce"
        onToggleLike={() => undefined}
        onReply={() => undefined}
        onDelete={() => undefined}
      />
    </UblDocStage>
    <UblDocStage label="Resposta de resposta achatada, com menção" surface="page" direction="column" align="stretch" padding={16}>
      <CommentThread title="Conversa" headingLevel="h3" comments={CADEIA} now={ublDemoNow} onToggleLike={() => undefined} onReply={() => undefined} />
    </UblDocStage>
    <UblDocStage label="Estado vazio" surface="page" direction="column" align="stretch" padding={16}>
      <CommentThread comments={[]} />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como compor a seção." />
    <UblDocPractices
      dos={[
        'Passar now e timeZone fixos em estórias e testes.',
        'Guardar likedIds e a lista de comentários no produto e atualizar a contagem ao curtir.',
        'Mostrar o compositor com renderComposer sob o comentário respondido.',
        'Destacar o comentário recém-publicado com highlightedId e rolar até ele.',
        'Passar onDelete só quando houver o que excluir: o botão aparece apenas nos comentários mine.',
      ]}
      donts={[
        'Montar a árvore por fora e passar comentários já aninhados: a entrada é plana.',
        'Calcular “Há 2 horas” no cliente com Date.now em estórias: o texto muda a cada execução.',
        'Aninhar mais de dois níveis: a coluna de leitura não comporta.',
        'Usar a seção sem título: ele é o nome da região.',
        'Esconder o estado vazio: uma seção em branco parece quebrada.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Título, fios, destaque e estado vazio acompanham o tema."
    />
    <UblDocThemeSwitcher surface="page" padding={16}>
      {(tema) => (
        <div key={tema} style={COLUNA}>
          <CommentThread
            comments={COMENTARIOS.slice(0, 3)}
            now={ublDemoNow}
            highlightedId="c-foco-2"
            onToggleLike={() => undefined}
            onReply={() => undefined}
          />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UblDocPropsTable
      title="CommentThread"
      rows={[
        { name: 'title', type: 'string', default: "'Comentários'", description: 'Título da seção; nomeia a região.' },
        { name: 'headingLevel', type: "'h2' | 'h3'", default: "'h2'", description: 'Nível do título na hierarquia da página.' },
        { name: 'comments', type: 'UblComment[]', description: 'Lista plana; parentId aponta o comentário respondido.' },
        { name: 'onToggleLike', type: '(id: string) => void', description: 'Curtir ou descurtir o comentário.' },
        { name: 'onReply', type: '(id: string) => void', description: 'Responder ao comentário.' },
        { name: 'onDelete', type: '(id: string) => void', description: 'Excluir; o botão só aparece nos comentários com mine.' },
        { name: 'likedIds', type: 'string[]', description: 'Ids já curtidos por quem lê (aria-pressed).' },
        { name: 'highlightedId', type: 'string', description: 'Id do comentário em destaque.' },
        { name: 'replyingToId', type: 'string', description: 'Id do comentário respondido: abre o compositor abaixo dele.' },
        { name: 'renderComposer', type: '(parentId: string) => ReactNode', description: 'Desenha o compositor sob o comentário respondido.' },
        { name: 'composer', type: 'ReactNode', description: 'Slot fixo entre o título e a lista (comentário novo).' },
        { name: 'emptyLabel', type: 'string', default: "'Ainda não há comentários. Seja a primeira pessoa a comentar.'", description: 'Texto do estado vazio.' },
        { name: 'now', type: 'Date | string', default: 'new Date()', description: 'Instante de referência das datas relativas.' },
        { name: 'timeZone', type: 'string', default: "'America/Sao_Paulo'", description: 'Fuso em que as datas são lidas.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className / style', type: 'string / CSSProperties', description: 'Classe e estilo da raiz.' },
        { name: '...section', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos, repassados ao <section>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof CommentThread> = {
  title: 'Unooblog/Componentes/CommentThread',
  component: CommentThread,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título da seção.' },
    headingLevel: { control: 'radio', options: ['h2', 'h3'], description: 'Nível do título.' },
    comments: { control: 'object', description: 'Lista plana de comentários (UblComment[]).' },
    likedIds: { control: 'object', description: 'Ids curtidos por quem lê.' },
    highlightedId: { control: 'text', description: 'Id do comentário em destaque.' },
    replyingToId: { control: 'text', description: 'Id do comentário respondido (abre o compositor).' },
    renderComposer: { control: false, description: 'Compositor sob o comentário respondido.' },
    composer: { control: false, description: 'Slot do comentário novo.' },
    emptyLabel: { control: 'text', description: 'Texto do estado vazio.' },
    now: { control: 'text', description: 'Instante de referência das datas relativas.' },
    timeZone: { control: 'text', description: 'Fuso das datas.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onToggleLike: { action: 'onToggleLike' },
    onReply: { action: 'onReply' },
    onDelete: { action: 'onDelete' },
  },
  args: {
    title: 'Comentários',
    headingLevel: 'h2',
    comments: COMENTARIOS,
    likedIds: [],
    emptyLabel: 'Ainda não há comentários. Seja a primeira pessoa a comentar.',
    now: ublDemoNow,
    timeZone: 'America/Sao_Paulo',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof CommentThread>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CommentThreadDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. Defina `replyingToId` para abrir o compositor.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do CommentThread',
  render: (args) => (
    <div
      data-ubl-theme={args.theme}
      style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-page)' }}
    >
      <CommentThread
        {...args}
        renderComposer={(parentId) => (
          <CommentComposer
            replyingTo={args.comments.find((item) => item.id === parentId)?.authorName}
            onCancel={() => undefined}
          />
        )}
      />
    </div>
  ),
};

/**
 * Composição realista: o fio completo sob um post, com curtir, responder, publicar e excluir.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: fio completo sob o post',
  render: () => (
    <div style={{ padding: 16, background: 'var(--ubl-color-background-page)' }}>
      <FioInterativo />
    </div>
  ),
};

/**
 * A seção em contêineres estreito, médio e largo.
 */
export const Tamanhos: Story = {
  name: 'Larguras',
  render: () => (
    <div style={{ display: 'grid', gap: 32, padding: 16, background: 'var(--ubl-color-background-page)' }}>
      {[320, 480, 680].map((largura) => (
        <div key={largura} style={{ width: largura, maxWidth: '100%' }}>
          <CommentThread
            comments={COMENTARIOS.slice(0, 2)}
            now={ublDemoNow}
            onToggleLike={() => undefined}
            onReply={() => undefined}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * Fio completo, resposta de resposta achatada e título em h3.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ ...COLUNA, display: 'grid', gap: 32, padding: 16, background: 'var(--ubl-color-background-page)' }}>
      <CommentThread comments={COMENTARIOS.slice(0, 4)} now={ublDemoNow} onToggleLike={() => undefined} onReply={() => undefined} />
      <CommentThread title="Conversa" headingLevel="h3" comments={CADEIA} now={ublDemoNow} onToggleLike={() => undefined} onReply={() => undefined} />
    </div>
  ),
};

/**
 * Vazio, com curtida, com destaque e com compositor aberto sob um comentário.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ ...COLUNA, display: 'grid', gap: 32, padding: 16, background: 'var(--ubl-color-background-page)' }}>
      <CommentThread comments={[]} />
      <CommentThread
        comments={COMENTARIOS.slice(0, 3)}
        now={ublDemoNow}
        likedIds={['c-foco-1', 'c-foco-2']}
        highlightedId="c-foco-3"
        replyingToId="c-foco-1"
        renderComposer={() => <CommentComposer replyingTo="Beatriz Nogueira" onCancel={() => undefined} />}
        onToggleLike={() => undefined}
        onReply={() => undefined}
      />
    </div>
  ),
};

/**
 * O fio nos dois temas.
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
          <CommentThread
            comments={COMENTARIOS.slice(0, 3)}
            now={ublDemoNow}
            highlightedId="c-foco-2"
            onToggleLike={() => undefined}
            onReply={() => undefined}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * A árvore aninhada renderiza as respostas dentro do comentário pai, em ordem cronológica.
 */
export const ArvoreAninhada: Story = {
  name: 'Árvore aninhada',
  render: () => (
    <div style={COLUNA}>
      <CommentThread comments={CADEIA} now={ublDemoNow} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    const secao = tela.getByRole('region', { name: 'Comentários' });
    const [listaRaiz] = within(secao).getAllByRole('list');
    // Uma raiz só: as duas respostas moram dentro dela.
    await expect(listaRaiz.querySelectorAll(':scope > li')).toHaveLength(1);

    const raiz = tela.getByText('Comentário raiz.').closest('li') as HTMLElement;
    const respostas = within(raiz).getByRole('list');
    const itens = within(respostas).getAllByRole('article');
    await expect(itens).toHaveLength(2);

    // Ordem cronológica, e não a do array (resposta-2 vem primeiro nos dados).
    await expect(itens[0]).toHaveTextContent('Primeira resposta à raiz.');
    await expect(itens[1]).toHaveTextContent('Resposta à resposta de Renata.');

    // Resposta de resposta: achatada no nível 1, com a menção a quem foi respondido.
    await expect(within(itens[1]).getByText('Em resposta a Renata Prado:')).toBeInTheDocument();
    await expect(within(itens[0]).queryByText(/Em resposta a/)).toBeNull();

    // A data relativa vem de ublTimeAgo, no fuso e no "agora" informados.
    const data = canvasElement.querySelector('time[datetime="2026-09-30T08:00:00-03:00"]');
    await expect(data).toHaveTextContent(ublTimeAgo('2026-09-30T08:00:00-03:00', ublDemoNow));
  },
};

/**
 * Curtir e responder chamam os callbacks com o id do comentário.
 */
export const CurtirEResponder: Story = {
  name: 'Curtir e responder',
  args: { onToggleLike: fn(), onReply: fn(), onDelete: fn(), comments: COMENTARIOS.slice(0, 4) },
  render: (args) => (
    <div style={COLUNA}>
      <CommentThread {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);

    await userEvent.click(tela.getByRole('button', { name: /^Curtir comentário de Beatriz Nogueira/ }));
    await expect(args.onToggleLike).toHaveBeenCalledWith('c-foco-1');

    await userEvent.click(tela.getByRole('button', { name: 'Responder a Davi Ferraz' }));
    await expect(args.onReply).toHaveBeenCalledWith('c-foco-3');

    // Nenhum desses quatro comentários é meu: não há botão de excluir.
    await expect(tela.queryByRole('button', { name: 'Excluir meu comentário' })).toBeNull();
  },
};

/**
 * Excluir só aparece nos comentários de quem lê e chama onDelete com o id.
 */
export const ExcluirSoNoMeu: Story = {
  name: 'Excluir só no meu comentário',
  args: { onDelete: fn(), onToggleLike: fn(), onReply: fn() },
  render: (args) => (
    <div style={COLUNA}>
      <CommentThread {...args} comments={COMENTARIOS} now={ublDemoNow} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);

    const botoes = tela.getAllByRole('button', { name: 'Excluir meu comentário' });
    await expect(botoes).toHaveLength(1);
    await userEvent.click(botoes[0]);
    await expect(args.onDelete).toHaveBeenCalledWith('c-foco-voce');
  },
};

/**
 * Sem comentários, a seção mostra o texto do estado vazio e nenhuma lista.
 */
export const Vazio: Story = {
  args: { comments: [], emptyLabel: 'Seja a primeira pessoa a comentar este post.' },
  render: (args) => (
    <div style={COLUNA}>
      <CommentThread {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getByText('Seja a primeira pessoa a comentar este post.')).toBeInTheDocument();
    await expect(tela.queryByRole('list')).toBeNull();
    await expect(tela.getByRole('region', { name: 'Comentários' })).toBeInTheDocument();
  },
};

/**
 * Fluxo completo: responder abre o compositor sob o comentário; enviar insere a resposta no pai.
 */
export const ResponderNoFio: Story = {
  name: 'Responder no fio',
  render: () => <FioInterativo />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    const davi = tela.getByText(/^No nosso sistema o foco/).closest('li') as HTMLElement;
    const botaoResponder = within(davi).getAllByRole('button', { name: 'Responder a Davi Ferraz' })[0];
    await expect(botaoResponder).not.toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(botaoResponder);
    await expect(botaoResponder).toHaveAttribute('aria-expanded', 'true');

    // O compositor abre dentro da entrada de Davi, não no fim da página.
    const campo = within(davi).getByRole('textbox', { name: 'Respondendo a Davi Ferraz' });
    await userEvent.type(campo, 'Boa observação sobre o tema escuro!');
    await userEvent.keyboard('{Control>}{Enter}{/Control}');

    await waitFor(() => expect(within(davi).queryByRole('textbox', { name: /Respondendo/ })).toBeNull());
    const resposta = within(davi).getByText('Boa observação sobre o tema escuro!').closest('article') as HTMLElement;
    await expect(resposta).toHaveClass('ubl-comment-item--reply');
    await expect(resposta).toHaveClass('ubl-comment-item--highlighted');
    // Resposta minha: ganha o botão de excluir.
    await expect(within(resposta).getByRole('button', { name: 'Excluir meu comentário' })).toBeInTheDocument();
  },
};
