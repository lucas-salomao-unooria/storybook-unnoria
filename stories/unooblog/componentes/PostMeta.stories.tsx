import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { PostMeta } from '../../../src/unooblog/components/PostMeta';
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
import { postEmDestaque, postsDoFeed, propsDoPostMeta } from './feed.demo';

const BAR = '#716C98';

const [primeiro, segundo] = postsDoFeed;

/**
 * Página de documentação rica do componente PostMeta.
 */
const PostMetaDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Feed"
      title="PostMeta"
      description="Linha de metadados de um post: avatar pequeno, autoria em negrito, data, tempo de leitura e contagem de comentários. Corre na mesma linha nos cartões e se empilha no cabeçalho do post."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="A assinatura que aparece em todo cartão, lista e cabeçalho de post."
    />
    <UblDocGrid>
      <UblDocCard icon="✍️" title="Autoria sempre presente">
        O blog é de autoria: o avatar e o nome de quem escreve acompanham o post em qualquer
        superfície, sem depender do tamanho do cartão.
      </UblDocCard>
      <UblDocCard icon="📅" title="Data legível por máquina">
        Com <code>dateTime</code>, a data vira um <code>&lt;time datetime&gt;</code>; sem ele, é só
        texto.
      </UblDocCard>
      <UblDocCard icon="💬" title="Comentários por extenso">
        A contagem aparece como número com o glifo de comentários, e o leitor de tela ouve “3
        comentários” (ou “1 comentário”).
      </UblDocCard>
      <UblDocCard icon="↔️" title="Inline ou empilhada">
        <code>inline</code> corre em uma linha e quebra quando falta largura; <code>stacked</code>{' '}
        põe a autoria em cima e os detalhes embaixo, com avatar de 32px.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="PostMeta"
      layout="Linha · largura do contêiner"
      specs={[
        { label: 'Avatar', value: 'sm (24px) no inline · md (32px) no stacked · decorativo (alt vazio)' },
        { label: 'Autoria', value: 'label · 14/20px · 700 · text-primary' },
        { label: 'Detalhes', value: 'caption · 12/18px · text-secondary, separados por “·”' },
        { label: 'Comentários', value: 'glifo comments (16px) + número em pt-BR + texto oculto por extenso' },
        { label: 'Cores', value: 'variáveis locais --ubl-post-meta-author e --ubl-post-meta-detail' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Cores por variável local',
          detail:
            'autoria e detalhes leem --ubl-post-meta-author e --ubl-post-meta-detail. O cartão em destaque as redefine para o texto branco sobre a capa e o cartão lido as leva ao tom muted, sem o PostMeta conhecer nenhum dos dois.',
        },
        {
          subject: 'Separador decorativo',
          detail:
            'o ponto “·” entre os detalhes é aria-hidden: o leitor de tela lê data, tempo e comentários em sequência, sem pontuação falada.',
        },
        {
          subject: 'Comentários dizem o número por extenso',
          detail:
            'o número visível é aria-hidden e um texto oculto traz “1.234 comentários” com plural correto; o glifo sozinho não diria nada.',
        },
        {
          subject: 'Server Component',
          detail: 'só recebe props e renderiza markup; não usa hook nem repassa função.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocStage label="Disposição inline" surface="card" align="stretch" direction="column" width={560}>
      <PostMeta {...propsDoPostMeta(primeiro)} />
    </UblDocStage>
    <UblDocAnatomy
      zones={[
        { name: 'Avatar', role: 'Retrato ou iniciais; decorativo.', token: '--ubl-avatar-sm | --ubl-avatar-md' },
        { name: 'Autoria', role: 'Nome em negrito.', token: '--ubl-font-label-* · --ubl-color-text-primary' },
        { name: 'Data', role: '<time datetime> quando há dateTime.', token: '--ubl-font-caption-*' },
        { name: 'Tempo de leitura', role: 'Texto já formatado.', token: '--ubl-color-text-secondary' },
        { name: 'Comentários', role: 'Glifo, número e texto oculto.', token: '--ubl-icon-size-xs' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As duas disposições e as combinações de detalhes — componentes reais."
    />
    <UblDocStage label="Disposições" surface="card" align="stretch" direction="column" width={560}>
      <PostMeta {...propsDoPostMeta(primeiro)} layout="inline" />
      <PostMeta {...propsDoPostMeta(primeiro)} layout="stacked" />
    </UblDocStage>
    <UblDocStage label="Combinações de detalhes" surface="card" align="stretch" direction="column" width={560}>
      <PostMeta author="Marina Azevedo" date="29 set 2026" />
      <PostMeta author="Marina Azevedo" date="29 set 2026" dateTime="2026-09-29" readingTime="4 min de leitura" />
      <PostMeta author="Marina Azevedo" date="29 set 2026" comments={1} />
      <PostMeta author="Marina Azevedo" date="29 set 2026" comments={1234} />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Passar dateTime em ISO 8601: leitores de tela, buscadores e extensões entendem a data.',
        'Formatar data e tempo de leitura antes de passar (ublFormatDate, ublReadingLabel): o componente não decide o idioma.',
        'Usar stacked no cabeçalho do post e inline em cartões e listas.',
        'Passar comments só quando há comentários habilitados: 0 também é uma informação.',
      ]}
      donts={[
        'Passar a data em formato ambíguo (03/04) sem dateTime.',
        'Repetir o nome da autoria no texto ao lado: o PostMeta já o traz.',
        'Pôr link dentro do PostMeta: no cartão, o clique pertence ao título.',
        'Trocar a cor da autoria por CSS solto: use as variáveis locais.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Autoria, detalhes e glifo acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher surface="card">
      {() => (
        <div style={{ display: 'grid', gap: 12, width: 520 }}>
          <PostMeta {...propsDoPostMeta(primeiro)} />
          <PostMeta {...propsDoPostMeta(segundo)} layout="stacked" />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="PostMeta"
      rows={[
        { name: 'author', type: 'string', description: 'Nome de quem assina; também as iniciais do avatar. Obrigatório.' },
        { name: 'avatarSrc', type: 'string', description: 'Retrato de quem assina.' },
        { name: 'date', type: 'string', description: 'Data já formatada. Obrigatória.' },
        { name: 'dateTime', type: 'string', description: 'Data ISO 8601; vira <time datetime>.' },
        { name: 'readingTime', type: 'string', description: 'Tempo de leitura formatado.' },
        { name: 'comments', type: 'number', description: 'Quantidade de comentários.' },
        { name: 'layout', type: "'inline' | 'stacked'", default: "'inline'", description: 'Disposição da linha.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos do <div>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PostMeta> = {
  title: 'Unooblog/Componentes/PostMeta',
  component: PostMeta,
  parameters: { layout: 'padded' },
  argTypes: {
    author: { control: 'text', description: 'Nome de quem assina.' },
    avatarSrc: { control: 'text', description: 'Retrato de quem assina.' },
    date: { control: 'text', description: 'Data formatada.' },
    dateTime: { control: 'text', description: 'Data ISO (<time datetime>).' },
    readingTime: { control: 'text', description: 'Tempo de leitura.' },
    comments: { control: { type: 'number', min: 0, step: 1 }, description: 'Quantidade de comentários.' },
    layout: { control: 'radio', options: ['inline', 'stacked'], description: 'Disposição da linha.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    ...propsDoPostMeta(primeiro),
    layout: 'inline',
  },
};

export default meta;

type Story = StoryObj<typeof PostMeta>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PostMetaDocumentationPage />,
};

/**
 * Playground da linha de metadados, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PostMeta',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} surface="card" align="stretch" direction="column" width={560}>
      <PostMeta {...args} />
    </UblDocStage>
  ),
};

/**
 * No cabeçalho do post (empilhada) e na base de um cartão (inline).
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={620} gap={16}>
      <PostMeta {...propsDoPostMeta(postEmDestaque)} layout="stacked" />
      <PostMeta {...propsDoPostMeta(segundo)} />
    </UblDocStage>
  ),
};

/**
 * Do contêiner largo ao estreito: a linha quebra quando falta largura.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[560, 360, 240].map((width) => (
        <UblDocStage key={width} label={`Contêiner de ${width}px`} surface="card" align="stretch" direction="column" width={width}>
          <PostMeta {...propsDoPostMeta(primeiro)} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * As duas disposições.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UblDocStage surface="card" align="stretch" direction="column" width={560}>
      <PostMeta {...propsDoPostMeta(primeiro)} layout="inline" />
      <PostMeta {...propsDoPostMeta(primeiro)} layout="stacked" />
    </UblDocStage>
  ),
};

/**
 * Combinações de detalhes: só a data, data com `<time>`, uma contagem e um milhar.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="card" align="stretch" direction="column" width={560}>
      <PostMeta author="Marina Azevedo" date="29 set 2026" />
      <PostMeta author="Marina Azevedo" date="29 set 2026" dateTime="2026-09-29" readingTime="4 min de leitura" />
      <PostMeta author="Marina Azevedo" date="29 set 2026" comments={1} />
      <PostMeta author="Marina Azevedo" date="29 set 2026" comments={1234} />
    </UblDocStage>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UblDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="card" align="stretch" direction="column" width={460}>
          <PostMeta {...propsDoPostMeta(primeiro)} />
          <PostMeta {...propsDoPostMeta(segundo)} layout="stacked" />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação (semântica): a data é um `<time datetime>` e a contagem de
 * comentários chega por extenso, com plural correto e milhar em pt-BR.
 */
export const Semantica: Story = {
  name: 'Interação: semântica',
  render: () => (
    <UblDocStage surface="card" align="stretch" direction="column" width={560}>
      <PostMeta author="Ana Lima" date="29 set 2026" dateTime="2026-09-29" readingTime="4 min de leitura" comments={1} />
      <PostMeta author="Bruno Reis" date="12 set 2026" comments={1234} />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const time = canvasElement.querySelector('time') as HTMLTimeElement;
    await expect(time).toHaveAttribute('datetime', '2026-09-29');
    await expect(time).toHaveTextContent('29 set 2026');

    // Sem dateTime, a data é só texto (um único <time> na tela).
    await expect(canvasElement.querySelectorAll('time')).toHaveLength(1);

    await expect(canvas.getByText('1 comentário')).toBeInTheDocument();
    await expect(canvas.getByText('1.234 comentários')).toBeInTheDocument();
    await expect(canvas.getByText('4 min de leitura')).toBeInTheDocument();
    await expect(canvas.getByText('Ana Lima')).toBeInTheDocument();
  },
};
