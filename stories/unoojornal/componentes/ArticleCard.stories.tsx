import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ArticleCard } from '../../../src/unoojornal/components/ArticleCard';
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
import { materiasDaLista, propsDoCartao } from './capa.demo';

const BAR = '#716C98';

/** Espiões das estórias de interação. */
const openSpy = fn();
const linkSpy = fn();

const [primeira, segunda, terceira] = materiasDaLista;

/**
 * Três cartões lado a lado, o do meio com destino por endereço.
 */
const CardRow: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, width: '100%' }}>
    <ArticleCard {...propsDoCartao(primeira)} onOpen={() => undefined} />
    <ArticleCard {...propsDoCartao(segunda)} href="#segunda" />
    <ArticleCard {...propsDoCartao(terceira)} onOpen={() => undefined} />
  </div>
);

/**
 * Página de documentação rica do componente ArticleCard.
 */
const ArticleCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Capa"
      title="ArticleCard"
      description="Cartão de matéria em grade: fotografia 3:2, etiqueta da seção, título e, no rodapé, o tempo e a chamada “Ler mais →”. Plano: o hover só troca o fio e sublinha o título, sem sombra."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Grades de matérias e o bloco “Leia também”."
    />
    <UjnDocGrid>
      <UjnDocCard icon="🗞️" title="Grade de matérias">
        Três ou quatro cartões por linha na capa, e duas colunas em tela média.
      </UjnDocCard>
      <UjnDocCard icon="➡️" title="Leia também">
        É o cartão que o <code>RelatedArticles</code> usa, um por matéria relacionada.
      </UjnDocCard>
      <UjnDocCard icon="🎯" title="Um alvo só">
        O título é o alvo e o cartão inteiro clica por pseudo-elemento. O leitor de tela lê o
        título como nome; a fotografia é lida pelo <code>imageAlt</code>.
      </UjnDocCard>
      <UjnDocCard icon="🪶" title="Sem sombra">
        A elevação é de fio e realce: o contorno passa a <code>action-primary</code> no hover.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="ArticleCard"
      layout="Cartão · largura do contêiner"
      specs={[
        { label: 'Estrutura herdada', value: 'quadro 5:181 do arquivo de origem (só a estrutura)' },
        { label: 'Fotografia', value: '3:2, encostada no topo e nas laterais' },
        { label: 'Contorno', value: '1px --ujn-color-border-subtle · hover: --ujn-color-action-primary' },
        { label: 'Forma', value: '--ujn-radius-s (4px)' },
        { label: 'Corpo', value: 'recuo de 16px · vão de 10px' },
        { label: 'Etiqueta', value: 'Tag outline sm' },
        { label: 'Título', value: 'title-md · Open Sans 600 · 20/30px' },
        { label: 'Rodapé', value: 'caption muted (tempo) · label accent (“Ler mais →”)' },
        { label: 'Foco', value: 'anel de 2px em focus-ring, por dentro do cartão' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Cartão inteiro clicável, um alvo de foco',
          detail:
            'o link do título tem um ::after que cobre o cartão. Não há links duplicados na imagem e na chamada, e o nome acessível é o título.',
        },
        {
          subject: '“Ler mais →” só visual',
          detail:
            'a chamada do rodapé é aria-hidden: o destino já é anunciado pelo link do título, e repetir “Ler mais” em cada cartão confunde a lista de links.',
        },
        {
          subject: 'Elevação por fio',
          detail:
            'o hover troca a cor do contorno e sublinha o título; nenhum box-shadow. Em repouso, só o fio de 1px separa o cartão da página.',
        },
        {
          subject: 'Dourado do Figma → roxo de ação',
          detail: 'o destaque do hover do arquivo de origem é dourado; aqui é --ujn-color-action-primary.',
        },
        {
          subject: 'Tempo no rodapé',
          detail:
            'readingTime recebe o texto já pronto (“Há 3 min”, “5 min de leitura”): o componente não decide qual das duas informações mostrar.',
        },
        {
          subject: 'Client Component',
          detail: 'recebe onOpen e o liga ao link do título; por isso começa com \'use client\'.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocStage label="Cartão" surface="page" align="flex-start" padding={24}>
      <div style={{ width: 360 }}>
        <ArticleCard {...propsDoCartao(primeira)} href="#anatomia" />
      </div>
    </UjnDocStage>
    <UjnDocAnatomy
      zones={[
        { name: 'Fotografia 3:2', role: 'Descrita pelo imageAlt.', token: '--ujn-color-background-subtle' },
        { name: 'Etiqueta', role: 'Seção, numa Tag outline.', token: 'Tag' },
        { name: 'Título (alvo)', role: 'Link ou botão que cobre o cartão.', token: '--ujn-font-title-md-*' },
        { name: 'Tempo', role: 'Texto discreto à esquerda do rodapé.', token: '--ujn-color-text-muted' },
        { name: 'Chamada', role: '“Ler mais →”, à direita, decorativa.', token: '--ujn-color-text-accent' },
        { name: 'Contorno', role: 'Fio de 1px; muda no hover.', token: '--ujn-color-border-subtle · --ujn-color-action-primary' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Link, botão e só informativo, em três larguras."
    />
    <UjnDocStage label="Variantes" surface="page" align="flex-start" padding={24} gap={20}>
      {[
        { label: 'Link', props: { href: '#link' } },
        { label: 'Botão', props: { onOpen: () => undefined } },
        { label: 'Só informa', props: {} },
      ].map(({ label, props }) => (
        <div key={label} style={{ width: 300 }}>
          <ArticleCard {...propsDoCartao(primeira)} {...props} />
        </div>
      ))}
    </UjnDocStage>
    <UjnDocStage label="Larguras de 360, 280 e 220px" surface="page" align="flex-start" padding={24} gap={20}>
      {[360, 280, 220].map((width) => (
        <div key={width} style={{ width }}>
          <ArticleCard {...propsDoCartao(segunda)} href="#largura" />
        </div>
      ))}
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Manter as fotografias na proporção 3:2: o cartão as recorta sem deformar.',
        'Escrever títulos que caibam em três linhas.',
        'Passar href quando houver endereço: o leitor de tela anuncia “link”.',
        'Usar readingTime com o texto pronto e curto.',
      ]}
      donts={[
        'Colocar outro link dentro do cartão: o clique já é do título.',
        'Trocar o fio de hover por sombra.',
        'Repetir a etiqueta no título (“Cultura: …”).',
        'Deixar imageAlt vazio quando a fotografia tem informação.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Fundo, contorno, texto e realce acompanham data-ujn-theme."
    />
    <UjnDocThemeSwitcher surface="page" padding={24}>
      {() => (
        <div style={{ width: 720 }}>
          <CardRow />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="ArticleCard"
      rows={[
        { name: 'imageSrc', type: 'string', description: 'Endereço da fotografia. Obrigatório.' },
        { name: 'imageAlt', type: 'string', description: 'Descrição da fotografia. Obrigatória.' },
        { name: 'kicker', type: 'string', description: 'Etiqueta da seção. Obrigatória.' },
        { name: 'title', type: 'string', description: 'Título; é o alvo principal. Obrigatório.' },
        { name: 'readingTime', type: 'string', description: 'Tempo ou tempo de leitura, já formatado.' },
        { name: 'ctaLabel', type: 'string', default: "'Ler mais'", description: 'Chamada do rodapé; só aparece se o cartão abre algo.' },
        { name: 'href', type: 'string', description: 'Faz do título um <a>.' },
        { name: 'onOpen', type: '(event: MouseEvent<HTMLElement>) => void', description: 'Abre a matéria; sem href, faz do título um <button>.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos do <article>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ArticleCard> = {
  title: 'Unoojornal/Componentes/ArticleCard',
  component: ArticleCard,
  parameters: { layout: 'padded' },
  argTypes: {
    imageSrc: { control: 'text', description: 'Endereço da fotografia.' },
    imageAlt: { control: 'text', description: 'Descrição da fotografia.' },
    kicker: { control: 'text', description: 'Etiqueta da seção.' },
    title: { control: 'text', description: 'Título (alvo principal).' },
    readingTime: { control: 'text', description: 'Tempo ou tempo de leitura.' },
    ctaLabel: { control: 'text', description: 'Chamada do rodapé.' },
    href: { control: 'text', description: 'Endereço (faz do título um link).' },
    onOpen: { action: 'onOpen', description: 'Abre a matéria.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    ...propsDoCartao(primeira),
    ctaLabel: 'Ler mais',
  },
};

export default meta;

type Story = StoryObj<typeof ArticleCard>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ArticleCardDocumentationPage />,
};

/**
 * Playground do cartão, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ArticleCard',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} surface="page" align="flex-start" padding={24}>
      <div style={{ width: 360 }}>
        <ArticleCard {...args} />
      </div>
    </UjnDocStage>
  ),
};

/**
 * A grade de três cartões da capa.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: grade da capa',
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} width={1000}>
      <CardRow />
    </UjnDocStage>
  ),
};

/**
 * Do cartão largo ao estreito.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      {[360, 280, 220].map((width) => (
        <div key={width} style={{ width }}>
          <ArticleCard {...propsDoCartao(segunda)} href="#largura" />
        </div>
      ))}
    </UjnDocStage>
  ),
};

/**
 * Com link, com botão e só informativo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      <div style={{ width: 300 }}>
        <ArticleCard {...propsDoCartao(primeira)} href="#link" />
      </div>
      <div style={{ width: 300 }}>
        <ArticleCard {...propsDoCartao(segunda)} onOpen={() => undefined} />
      </div>
      <div style={{ width: 300 }}>
        <ArticleCard {...propsDoCartao(terceira)} />
      </div>
    </UjnDocStage>
  ),
};

/**
 * Sem tempo, com chamada personalizada e com título longo.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      <div style={{ width: 300 }}>
        <ArticleCard {...propsDoCartao(primeira)} readingTime={undefined} href="#sem-tempo" />
      </div>
      <div style={{ width: 300 }}>
        <ArticleCard {...propsDoCartao(segunda)} ctaLabel="Continuar lendo" href="#chamada" />
      </div>
      <div style={{ width: 300 }}>
        <ArticleCard
          {...propsDoCartao(terceira)}
          title="Um título bem mais longo do que o normal, para mostrar como o cartão quebra a linha sem cortar nada"
          href="#longo"
        />
      </div>
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
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="flex-start" padding={24}>
          <div style={{ width: 300 }}>
            <ArticleCard {...propsDoCartao(primeira)} href="#tema" />
          </div>
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: o título abre por clique e por Enter, o link mantém o `href` e o
 * cartão tem um único ponto de foco.
 */
export const Abrir: Story = {
  name: 'Interação: abrir a matéria',
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      <div style={{ width: 300 }}>
        <ArticleCard {...propsDoCartao(primeira)} onOpen={openSpy} />
      </div>
      <div style={{ width: 300 }}>
        <ArticleCard
          {...propsDoCartao(segunda)}
          href="#segunda"
          onOpen={(event) => {
            event.preventDefault();
            linkSpy();
          }}
        />
      </div>
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    openSpy.mockClear();
    linkSpy.mockClear();
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', { name: primeira.title });
    await userEvent.click(button);
    await expect(openSpy).toHaveBeenCalledTimes(1);
    button.focus();
    await userEvent.keyboard('{Enter}');
    await expect(openSpy).toHaveBeenCalledTimes(2);

    const link = canvas.getByRole('link', { name: segunda.title });
    await expect(link).toHaveAttribute('href', '#segunda');
    await userEvent.click(link);
    await expect(linkSpy).toHaveBeenCalledTimes(1);

    // Um único alvo por cartão: dois cartões, dois controles.
    await expect(canvas.getAllByRole('button')).toHaveLength(1);
    await expect(canvas.getAllByRole('link')).toHaveLength(1);
  },
};
