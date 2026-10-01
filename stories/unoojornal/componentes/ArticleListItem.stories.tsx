import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ArticleListItem } from '../../../src/unoojornal/components/ArticleListItem';
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
import { materiasDaLista, propsDoItem } from './capa.demo';

const BAR = '#716C98';

/** Espiões das estórias de interação. */
const openSpy = fn();
const saveSpy = fn();
const linkSpy = fn();

const [primeira, segunda, terceira] = materiasDaLista;

/**
 * Lista de três matérias com salvar controlado, a matéria atual e uma lida.
 */
const ArticleList: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => {
  const [savedIds, setSavedIds] = useState<string[]>([segunda.id]);
  const toggle = (id: string) => (saved: boolean) =>
    setSavedIds((current) => (saved ? [...current, id] : current.filter((item) => item !== id)));

  return (
    <div role="list" data-ujn-theme={theme} style={{ width: '100%' }}>
      {[primeira, segunda, terceira].map((article, index) => (
        <div role="listitem" key={article.id}>
          <ArticleListItem
            {...propsDoItem(article)}
            current={index === 0}
            read={index === 2}
            saved={savedIds.includes(article.id)}
            onToggleSave={toggle(article.id)}
            onOpen={() => undefined}
          />
        </div>
      ))}
    </div>
  );
};

/**
 * Página de documentação rica do componente ArticleListItem.
 */
const ArticleListItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Capa"
      title="ArticleListItem"
      description="Item da lista de matérias da capa: etiqueta e tempo no alto, título, resumo de duas linhas, assinatura e tempo de leitura. Cinco estados — padrão, hover, foco, atual e lida —, com salvar para ler depois sem abrir a matéria."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="A linha da lista “Últimas notícias” e dos resultados de busca."
    />
    <UjnDocGrid>
      <UjnDocCard icon="📰" title="Lista de matérias">
        Uma linha por matéria, separada por fio de 1px. O título é o único alvo de foco: o item
        inteiro clica por pseudo-elemento, e o nome acessível é o título.
      </UjnDocCard>
      <UjnDocCard icon="🔖" title="Salvar sem abrir">
        Com <code>onToggleSave</code>, aparece o botão de marcador. Ele fica sobre a área clicável
        e <strong>nunca</strong> dispara <code>onOpen</code>.
      </UjnDocCard>
      <UjnDocCard icon="👀" title="Atual e lida">
        <code>current</code> fixa a barra lateral e anuncia <code>aria-current</code>;{' '}
        <code>read</code> passa o texto ao tom discreto <em>e</em> acrescenta o selo “Lida”.
      </UjnDocCard>
      <UjnDocCard icon="🔗" title="Link ou botão">
        <code>href</code> faz do título um <code>&lt;a&gt;</code>; só <code>onOpen</code>, um{' '}
        <code>&lt;button&gt;</code>. Sem nenhum dos dois, o item só informa.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="ArticleListItem"
      layout="Linha · largura do contêiner"
      specs={[
        { label: 'Estrutura herdada', value: 'quadro 5:133 do arquivo de origem (só a estrutura)' },
        { label: 'Recuo', value: '16px acima e abaixo · 20px à esquerda (--ujn-spacing-*)' },
        { label: 'Etiqueta', value: 'kicker · 12/18px · caixa alta · text-accent' },
        { label: 'Título', value: 'title-md · Open Sans 600 · 20/30px' },
        { label: 'Resumo', value: 'body-md · 16/24px · duas linhas, depois reticências' },
        { label: 'Barra lateral', value: '--ujn-rule-thick (3px) em action-primary, no hover e no atual' },
        { label: 'Hover', value: 'fundo --ujn-color-state-hover (sem sombra)' },
        { label: 'Atual', value: 'fundo background-subtle + barra fixa + aria-current' },
        { label: 'Lida', value: 'texto text-muted + selo “Lida” com glifo check' },
        { label: 'Foco', value: 'anel de 2px em focus-ring, por dentro do item' },
        { label: 'Salvar', value: 'IconButton md (44px) · aria-pressed' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Um único alvo, o título',
          detail:
            'o item inteiro clica por um ::after absoluto do link do título. Há um só ponto de Tab por matéria e o nome acessível é o título, e não a concatenação de etiqueta, resumo e assinatura.',
        },
        {
          subject: 'Salvar fica por cima',
          detail:
            'o botão tem z-index acima do pseudo-elemento e é irmão do corpo, e não filho do link: botão dentro de link não é HTML válido, e o clique em “salvar” não pode abrir a matéria.',
        },
        {
          subject: 'Lida nunca é só opacidade',
          detail:
            'o texto vai para text-muted (que mantém 4,5:1) e o item ganha o selo “Lida” com glifo. O estado existe para quem não distingue tons.',
        },
        {
          subject: 'Atual por forma e por nome',
          detail:
            'a barra lateral de 3px e o fundo sutil mostram o estado; aria-current="true" o anuncia. A barra do hover é a mesma, em repouso invisível: o atual é a barra que não some.',
        },
        {
          subject: 'Dourado do Figma → roxo de ação',
          detail:
            'o arquivo de origem usa a barra lateral dourada no hover; aqui é --ujn-color-action-primary. Serifa → Open Sans 600 no título.',
        },
        {
          subject: 'Client Component',
          detail:
            'o arquivo repassa onOpen ao link e onToggleSave ao botão; por isso começa com \'use client\'.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocStage label="Item com todos os elementos" surface="card" align="stretch" direction="column" gap={0} padding={0} width={720}>
      <ArticleListItem {...propsDoItem(primeira)} onOpen={() => undefined} onToggleSave={() => undefined} />
    </UjnDocStage>
    <UjnDocAnatomy
      zones={[
        { name: 'Barra lateral', role: 'Hover e atual; 3px.', token: '--ujn-rule-thick · --ujn-color-action-primary' },
        { name: 'Etiqueta e tempo', role: 'Seção em caixa alta e “Há 2 horas”.', token: '--ujn-font-kicker-* · --ujn-font-caption-*' },
        { name: 'Título (alvo)', role: 'Link ou botão que estende o alvo ao item.', token: '--ujn-font-title-md-*' },
        { name: 'Resumo', role: 'Duas linhas.', token: '--ujn-font-body-md-* · --ujn-color-text-secondary' },
        { name: 'Assinatura', role: 'Byline com papel e tempo de leitura.', token: '--ujn-font-label-* · --ujn-font-caption-*' },
        { name: 'Selo “Lida”', role: 'Só no estado lida.', token: '--ujn-color-text-muted' },
        { name: 'Salvar', role: 'Opcional; IconButton com aria-pressed.', token: '--ujn-touch-target' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Padrão, atual, lida, com salvar e só informativo — componentes reais."
    />
    <UjnDocStage label="Estados" surface="card" align="stretch" direction="column" gap={0} padding={0} width={720}>
      <ArticleListItem {...propsDoItem(primeira)} href="#padrao" />
      <ArticleListItem {...propsDoItem(segunda)} href="#atual" current />
      <ArticleListItem {...propsDoItem(terceira)} href="#lida" read />
      <ArticleListItem {...propsDoItem(primeira)} onOpen={() => undefined} onToggleSave={() => undefined} saved />
      <ArticleListItem {...propsDoItem(segunda)} summary={undefined} />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Passar href quando a matéria tem endereço: o leitor de tela anuncia “link”.',
        'Marcar current na matéria aberta ao lado da lista, para ela ser reencontrada.',
        'Marcar read com o histórico de leitura: o selo “Lida” acompanha o tom.',
        'Manter o resumo curto: ele é cortado em duas linhas.',
      ]}
      donts={[
        'Pôr outro link ou botão dentro do item: o clique já pertence ao título.',
        'Indicar lida só com opacidade ou só com cor.',
        'Esconder o selo “Lida” no CSS do produto.',
        'Usar o salvar para abrir a matéria: ele só alterna o marcador.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Barra, fundos, fios e texto acompanham data-ujn-theme."
    />
    <UjnDocThemeSwitcher surface="card" padding={0}>
      {() => (
        <div style={{ width: 720 }}>
          <ArticleList />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="ArticleListItem"
      rows={[
        { name: 'kicker', type: 'string', description: 'Etiqueta da seção. Obrigatória.' },
        { name: 'timeAgo', type: 'string', description: 'Tempo desde a publicação (“Há 2 horas”).' },
        { name: 'title', type: 'string', description: 'Título; é o alvo principal. Obrigatório.' },
        { name: 'summary', type: 'string', description: 'Resumo, cortado em duas linhas.' },
        { name: 'author', type: 'string', description: 'Nome de quem assina. Obrigatório.' },
        { name: 'authorRole', type: 'string', description: 'Papel ou turma.' },
        { name: 'readingTime', type: 'string', description: 'Tempo de leitura formatado.' },
        { name: 'href', type: 'string', description: 'Faz do título um <a>.' },
        { name: 'onOpen', type: '(event: MouseEvent<HTMLElement>) => void', description: 'Abre a matéria; sem href, faz do título um <button>.' },
        { name: 'saved', type: 'boolean', default: 'false', description: 'Matéria salva (marcador preenchido).' },
        { name: 'onToggleSave', type: '(saved: boolean) => void', description: 'Mostra o botão de salvar e recebe o novo valor.' },
        { name: 'read', type: 'boolean', default: 'false', description: 'Matéria lida: texto discreto e selo “Lida”.' },
        { name: 'current', type: 'boolean', default: 'false', description: 'Matéria aberta: barra lateral e aria-current.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos do <article>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ArticleListItem> = {
  title: 'Unoojornal/Componentes/ArticleListItem',
  component: ArticleListItem,
  parameters: { layout: 'padded' },
  argTypes: {
    kicker: { control: 'text', description: 'Etiqueta da seção.' },
    timeAgo: { control: 'text', description: 'Tempo desde a publicação.' },
    title: { control: 'text', description: 'Título (alvo principal).' },
    summary: { control: 'text', description: 'Resumo, em duas linhas.' },
    author: { control: 'text', description: 'Nome de quem assina.' },
    authorRole: { control: 'text', description: 'Papel ou turma.' },
    readingTime: { control: 'text', description: 'Tempo de leitura.' },
    href: { control: 'text', description: 'Endereço (faz do título um link).' },
    onOpen: { action: 'onOpen', description: 'Abre a matéria (faz do título um botão sem href).' },
    saved: { control: 'boolean', description: 'Matéria salva.' },
    onToggleSave: { action: 'onToggleSave', description: 'Mostra o botão de salvar.' },
    read: { control: 'boolean', description: 'Matéria lida.' },
    current: { control: 'boolean', description: 'Matéria atual.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    ...propsDoItem(primeira),
    saved: false,
    read: false,
    current: false,
  },
};

export default meta;

type Story = StoryObj<typeof ArticleListItem>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ArticleListItemDocumentationPage />,
};

/**
 * Playground do item, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ArticleListItem',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} surface="card" align="stretch" direction="column" gap={0} padding={0} width={720}>
      <ArticleListItem {...args} />
    </UjnDocStage>
  ),
};

/**
 * A lista da capa: três matérias, a primeira aberta, a última lida.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: lista de matérias',
  render: () => (
    <UjnDocStage surface="card" align="stretch" direction="column" gap={0} padding={0} width={720}>
      <ArticleList />
    </UjnDocStage>
  ),
};

/**
 * Do contêiner largo ao estreito: o item acompanha a largura disponível.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[720, 480, 320].map((width) => (
        <UjnDocStage key={width} label={`Contêiner de ${width}px`} surface="card" align="stretch" direction="column" gap={0} padding={0} width={width}>
          <ArticleListItem {...propsDoItem(primeira)} href="#tamanho" onToggleSave={() => undefined} />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Link, botão, só informativo e com salvar.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UjnDocStage surface="card" align="stretch" direction="column" gap={0} padding={0} width={720}>
      <ArticleListItem {...propsDoItem(primeira)} href="#link" />
      <ArticleListItem {...propsDoItem(segunda)} onOpen={() => undefined} />
      <ArticleListItem {...propsDoItem(terceira)} />
      <ArticleListItem {...propsDoItem(primeira)} onOpen={() => undefined} onToggleSave={() => undefined} />
    </UjnDocStage>
  ),
};

/**
 * Padrão, atual, lida e salva. O hover e o foco se veem com o ponteiro e com o Tab.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="card" align="stretch" direction="column" gap={0} padding={0} width={720}>
      <ArticleListItem {...propsDoItem(primeira)} href="#padrao" />
      <ArticleListItem {...propsDoItem(segunda)} href="#atual" current />
      <ArticleListItem {...propsDoItem(terceira)} href="#lida" read />
      <ArticleListItem {...propsDoItem(primeira)} onOpen={() => undefined} onToggleSave={() => undefined} saved />
    </UjnDocStage>
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
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="card" align="stretch" direction="column" gap={0} padding={0} width={560}>
          <ArticleList />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: o título abre por clique e por Enter, o salvar não abre, e o
 * item atual anuncia `aria-current`.
 */
export const AbrirESalvar: Story = {
  name: 'Interação: abrir e salvar',
  render: () => (
    <UjnDocStage surface="card" align="stretch" direction="column" gap={0} padding={0} width={720}>
      <ArticleListItem {...propsDoItem(primeira)} onOpen={openSpy} onToggleSave={saveSpy} />
      <ArticleListItem
        {...propsDoItem(segunda)}
        href="#segunda"
        onOpen={(event) => {
          event.preventDefault();
          linkSpy();
        }}
        current
      />
      <ArticleListItem {...propsDoItem(terceira)} read />
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    openSpy.mockClear();
    saveSpy.mockClear();
    linkSpy.mockClear();
    const canvas = within(canvasElement);

    // Sem href, o título é um botão: clique e Enter abrem.
    const open = canvas.getByRole('button', { name: primeira.title });
    await userEvent.click(open);
    await expect(openSpy).toHaveBeenCalledTimes(1);
    open.focus();
    await userEvent.keyboard('{Enter}');
    await expect(openSpy).toHaveBeenCalledTimes(2);

    // Salvar não abre a matéria e entrega o novo valor.
    const save = canvas.getByRole('button', { name: new RegExp(`Salvar.*${primeira.title.slice(0, 12)}`) });
    await expect(save).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(save);
    await expect(saveSpy).toHaveBeenCalledWith(true);
    await expect(openSpy).toHaveBeenCalledTimes(2);

    // Com href, o título é um link; o item atual anuncia aria-current.
    const link = canvas.getByRole('link', { name: segunda.title });
    await expect(link).toHaveAttribute('href', '#segunda');
    await expect(link).toHaveAttribute('aria-current', 'true');
    await userEvent.click(link);
    await expect(linkSpy).toHaveBeenCalledTimes(1);

    // Lida e sem destino: só informa, e o selo diz o estado em palavras.
    await expect(canvas.getByText('Lida')).toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: terceira.title })).toBeNull();
  },
};
