import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { RelatedArticles } from '../../../src/unoojornal/components/RelatedArticles';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocGrid,
  UjnDocCard,
  UjnDocSpecs,
  UjnDocDecisions,
  UjnDocAnatomy,
  UjnDocStage,
  UjnDocPractices,
  UjnDocThemeSwitcher,
  UjnDocPropsTable,
} from '../../../.storybook/components';
import { itemRelacionado, materiasDaLista } from './capa.demo';

const BAR = '#716C98';

/** Espiões das estórias de interação. */
const openSpy = fn();

const items = materiasDaLista.slice(0, 3).map(itemRelacionado);

/**
 * Página de documentação rica do componente RelatedArticles.
 */
const RelatedArticlesDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Capa"
      title="RelatedArticles"
      description="Bloco “Leia também”, no fim da matéria: título de seção com fio e uma grade de cartões de matéria — três colunas no largo, duas no médio e uma no compacto."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Mantém o leitor no jornal depois do último parágrafo."
    />
    <UjnDocGrid>
      <UjnDocCard icon="📚" title="Fim da matéria">
        Três matérias relacionadas, sugeridas pela seção ou pelo assunto, abaixo da nota de
        correções.
      </UjnDocCard>
      <UjnDocCard icon="🧩" title="Composição">
        Usa o <code>SectionHeading</code> e o <code>ArticleCard</code>: o bloco não tem visual
        próprio além da grade.
      </UjnDocCard>
      <UjnDocCard icon="🆔" title="Abrir por id">
        <code>onOpen</code> devolve o <code>id</code> do item; itens com <code>href</code> também
        navegam pelo link.
      </UjnDocCard>
      <UjnDocCard icon="🧾" title="Lista de verdade">
        É uma região nomeada pelo título, com um <code>&lt;ul&gt;</code> e um{' '}
        <code>&lt;li&gt;</code> por cartão.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="RelatedArticles"
      layout="Seção · grade de cartões"
      specs={[
        { label: 'Pontos de quebra', value: 'de contêiner: 1 coluna · ≥ 640px 2 colunas · ≥ 960px 3 colunas' },
        { label: 'Vão', value: '--ujn-spacing-xl (20px)' },
        { label: 'Cabeçalho', value: 'SectionHeading com fio de 1px, nível h2' },
        { label: 'Cartão', value: 'ArticleCard (3:2, etiqueta, título, tempo)' },
        { label: 'Região', value: '<section aria-label> com o título do bloco' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Composição, e não cópia',
          detail:
            'o bloco usa o ArticleCard e o SectionHeading reais: uma mudança no cartão chega ao “Leia também” sem retoque.',
        },
        {
          subject: 'onOpen devolve o id',
          detail:
            'o produto sabe qual matéria abrir sem comparar títulos; o evento do clique não sobe, porque o consumidor quer a matéria, e não o evento.',
        },
        {
          subject: 'Região nomeada pelo título, sem useId',
          detail:
            'aria-label recebe o mesmo texto do heading. Os dois nomes coincidem, e o arquivo evita um hook só para ligar ids.',
        },
        {
          subject: 'Três por linha, não quatro',
          detail:
            'o bloco acompanha a coluna de leitura, que é mais estreita que a capa: três cartões ainda mostram o título em até três linhas.',
        },
        {
          subject: 'Client Component',
          detail: 'repassa uma função ao ArticleCard em cada item; por isso começa com \'use client\'.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocStage label="Largo (1000px)" surface="page" align="stretch" direction="column" padding={24} width={1000}>
      <RelatedArticles items={items} onOpen={() => undefined} />
    </UjnDocStage>
    <UjnDocAnatomy
      zones={[
        { name: 'Cabeçalho', role: 'Título do bloco, com fio por baixo.', token: 'SectionHeading rule' },
        { name: 'Lista', role: 'Grade de 1, 2 ou 3 colunas.', token: '--ujn-spacing-xl' },
        { name: 'Item', role: 'Um <li> com um cartão.', token: '—' },
        { name: 'Cartão', role: 'ArticleCard: fotografia, etiqueta, título e tempo.', token: 'ArticleCard' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Três larguras de contêiner, título próprio e itens com link."
    />
    <div style={{ display: 'grid', gap: 16 }}>
      {[1000, 700, 360].map((width) => (
        <UjnDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" padding={24} width={width}>
          <RelatedArticles items={items} onOpen={() => undefined} />
        </UjnDocStage>
      ))}
      <UjnDocStage label="Título próprio e itens com href" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <RelatedArticles title="Mais da editoria" items={items.map((item) => ({ ...item, href: `#${item.id}` }))} />
      </UjnDocStage>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Sugerir matérias da mesma seção ou do mesmo assunto.',
        'Limitar a três itens: a grade fecha uma linha no largo.',
        'Usar id estável em cada item: é a chave e o que onOpen devolve.',
        'Manter o bloco depois da nota de correções.',
      ]}
      donts={[
        'Repetir a matéria que o leitor acabou de ler.',
        'Colocar mais de seis itens: o bloco vira outra capa.',
        'Passar href e onOpen esperando que o link não navegue: use event.preventDefault no produto.',
        'Trocar o título do bloco por algo que não diga o que é.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Cartões, fio e títulos acompanham data-ujn-theme."
    />
    <UjnDocThemeSwitcher surface="page" padding={24}>
      {() => (
        <div style={{ width: 960 }}>
          <RelatedArticles items={items} onOpen={() => undefined} />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="RelatedArticles"
      rows={[
        { name: 'title', type: 'string', default: "'Leia também'", description: 'Título do bloco; também nomeia a região.' },
        { name: 'items', type: 'UjnRelatedArticle[]', description: 'Matérias relacionadas. Obrigatório.' },
        { name: 'onOpen', type: '(id: string) => void', description: 'Abre uma matéria; recebe o id do item.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos do <section>.' },
      ]}
    />
    <UjnDocPropsTable
      title="UjnRelatedArticle (item)"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador estável; é o que onOpen devolve.' },
        { name: 'kicker', type: 'string', description: 'Etiqueta da seção.' },
        { name: 'title', type: 'string', description: 'Título da matéria.' },
        { name: 'readingTime', type: 'string', description: 'Tempo de leitura formatado.' },
        { name: 'imageSrc', type: 'string', description: 'Endereço da fotografia.' },
        { name: 'imageAlt', type: 'string', description: 'Descrição da fotografia.' },
        { name: 'href', type: 'string', description: 'Endereço da matéria; faz do título um <a>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof RelatedArticles> = {
  title: 'Unoojornal/Componentes/RelatedArticles',
  component: RelatedArticles,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título do bloco.' },
    items: { control: 'object', description: 'Matérias relacionadas (JSON).' },
    onOpen: { action: 'onOpen', description: 'Abre uma matéria; recebe o id.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: 'Leia também',
    items,
  },
};

export default meta;

type Story = StoryObj<typeof RelatedArticles>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <RelatedArticlesDocumentationPage />,
};

/**
 * Playground do bloco, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do RelatedArticles',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} surface="page" align="stretch" direction="column" padding={24} width={1000}>
      <RelatedArticles {...args} />
    </UjnDocStage>
  ),
};

/**
 * O “Leia também” no fim da matéria, na coluna da página.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: fim da matéria',
  render: () => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={32} width={1280}>
      <RelatedArticles items={items} onOpen={() => undefined} />
    </UjnDocStage>
  ),
};

/**
 * Contêiner largo (3 colunas), médio (2) e compacto (1).
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[1000, 700, 360].map((width) => (
        <UjnDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" padding={24} width={width}>
          <RelatedArticles items={items} onOpen={() => undefined} />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Com botões (onOpen), com links (href) e só informativo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="Botões (onOpen)" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <RelatedArticles items={items} onOpen={() => undefined} />
      </UjnDocStage>
      <UjnDocStage label="Links (href)" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <RelatedArticles items={items.map((item) => ({ ...item, href: `#${item.id}` }))} />
      </UjnDocStage>
      <UjnDocStage label="Só informativo" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <RelatedArticles items={items} />
      </UjnDocStage>
    </div>
  ),
};

/**
 * Um item só, dois itens e título próprio.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="Um item" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <RelatedArticles items={items.slice(0, 1)} onOpen={() => undefined} />
      </UjnDocStage>
      <UjnDocStage label="Dois itens e título próprio" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <RelatedArticles title="Mais da editoria" items={items.slice(0, 2)} onOpen={() => undefined} />
      </UjnDocStage>
    </div>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="stretch" direction="column" padding={24} width={1000}>
          <RelatedArticles items={items} onOpen={() => undefined} />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: a região é nomeada pelo título, tem um item por matéria e o
 * clique devolve o `id` da matéria.
 */
export const Abrir: Story = {
  name: 'Interação: abrir uma matéria',
  render: () => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={24} width={1000}>
      <RelatedArticles items={items} onOpen={openSpy} />
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    openSpy.mockClear();
    const canvas = within(canvasElement);

    const region = canvas.getByRole('region', { name: 'Leia também' });
    await expect(within(region).getByRole('heading', { level: 2, name: 'Leia também' })).toBeInTheDocument();
    await expect(within(region).getAllByRole('listitem')).toHaveLength(items.length);

    const segundo = items[1];
    const button = within(region).getByRole('button', { name: segundo.title });
    await userEvent.click(button);
    await expect(openSpy).toHaveBeenCalledWith(segundo.id);
    button.focus();
    await userEvent.keyboard('{Enter}');
    await expect(openSpy).toHaveBeenCalledTimes(2);
  },
};
