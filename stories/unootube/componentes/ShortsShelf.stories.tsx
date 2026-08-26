import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { ShortsCard, ShortsShelf } from '../../../src/unootube';
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
  UniDocThemeSwitcher,
} from '../../../.storybook/components';
import { shorts } from '../fixtures';

const SHORTS_FILE =
  'https://www.figma.com/design/FlqnnoY0Mqdjic53twLAC1/Free-YouTube-Shorts-Mockups--Community-';

const meta: Meta<typeof ShortsShelf> = {
  title: 'Unootube/Componentes/ShortsShelf',
  component: ShortsShelf,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    showLogo: { control: 'boolean' },
    layout: { control: 'radio', options: ['row', 'grid'] },
    columnWidth: { control: { type: 'range', min: 100, max: 260, step: 2 } },
    bordered: { control: 'boolean' },
    className: { control: 'text' },
  },
  args: {
    label: 'Shorts',
    showLogo: true,
    layout: 'row',
    columnWidth: 150,
    bordered: false,
  },
};

export default meta;

type Story = StoryObj<typeof ShortsShelf>;

const rowCards = shorts.slice(0, 8).map((short) => (
  <ShortsCard
    key={short.id}
    thumbnailSrc={short.thumbnailSrc}
    videoTitle={short.videoTitle}
    views={short.views}
  />
));

const gridCards = shorts.map((short) => (
  <ShortsCard
    key={short.id}
    variant="below"
    width="100%"
    thumbnailSrc={short.thumbnailSrc}
    videoTitle={short.videoTitle}
    views={short.views}
  />
));

const ShortsShelfDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Shorts"
      title="ShortsShelf"
      description="Reprodução da prateleira de Shorts do arquivo Free YouTube Shorts Mockups (Community), nas duas disposições publicadas: a faixa de rolagem horizontal da tela móvel (1:129) e a grade da área de trabalho (1:735). A prateleira não monta cartão nenhum — recebe os filhos por composição."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="O cabeçalho, as duas disposições e a rolagem que o arquivo não descreve."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="⚡" title="Cabeçalho com o raio da marca">
        Raio maciço vermelho à esquerda e o rótulo à direita. No móvel o rótulo é Roboto Medium 16;
        na área de trabalho, Regular 20 — corpo maior e peso menor, como o arquivo declara.
      </UniDocCard>
      <UniDocCard icon="↔️" title="row — faixa que rola">
        Cartões de 150px com 12px entre eles, rolagem horizontal com encaixe. O recuo à direita é
        menor de propósito no arquivo: é o que deixa o cartão seguinte assomando na aresta.
      </UniDocCard>
      <UniDocCard icon="▦" title="grid — grade que quebra">
        Sete cartões na primeira linha e cinco na segunda, com 16px entre colunas e 75px entre
        linhas. As colunas preenchem automaticamente o espaço disponível.
      </UniDocCard>
      <UniDocCard icon="🧩" title="Composição, não configuração">
        A prateleira não escolhe a variante do cartão. É a mesma seção servindo a{' '}
        <code>overlay</code> no móvel e a <code>below</code> na área de trabalho.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="1:129"
      frameName="Frame 18"
      fileUrl={SHORTS_FILE}
      specs={[
        { label: 'Prateleira móvel', value: 'padding 14 / 10 / 20 / 12 · gap 14' },
        { label: 'Cabeçalho móvel', value: 'gap 8 · rótulo Medium 16' },
        { label: 'Cabeçalho de trabalho', value: 'gap 11 · rótulo Regular 20' },
        { label: 'Grade', value: 'colunas de 149,85 · gap 16 / 75' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Rótulo "Storts"',
          detail:
            'o arquivo escreve "Storts" na prateleira móvel (node 1:134) e "Shorts" na da área de trabalho (node 1:740). É um erro de digitação do arquivo comunitário, não reproduzido: o padrão do componente é "Shorts".',
        },
        {
          subject: 'Rolagem real',
          detail:
            'o arquivo é um quadro estático com os cartões cortados na aresta direita. Sem rolagem o conteúdo além da borda ficaria inalcançável — o mesmo desvio já registrado para a barra lateral e a faixa de filtros.',
        },
        {
          subject: 'Fios da seção reproduzidos como borda',
          detail:
            'o arquivo desenha os delimitadores da seção na área de trabalho (nodes 1:734 e 1:791) como retângulos de 4px de altura preenchidos com o contorno sutil. Reproduzidos como borda de 1px, que é a espessura efetiva do traço visível.',
        },
        {
          subject: 'Encaixe de rolagem',
          detail:
            'o arquivo não descreve comportamento de rolagem. O encaixe por proximidade foi acrescentado para que a faixa pare com um cartão inteiro visível, e não cortado ao meio.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Cabeçalho',
          role: 'Raio da marca e rótulo da seção.',
          token: '--uni-color-brand-shorts',
        },
        {
          name: 'Rótulo',
          role: 'Medium 16 no móvel; Regular 20 na área de trabalho.',
          token: '--uni-font-body-lg-* · --uni-font-heading-h2-size',
        },
        {
          name: 'Faixa',
          role: 'Rolagem horizontal com encaixe, ou grade que preenche as colunas.',
          token: '--uni-spacing-12 · --uni-spacing-16',
        },
        {
          name: 'Delimitadores',
          role: 'Fios de 1px acima e abaixo da seção, ligados por bordered.',
          token: '--uni-color-border-subtle',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="row — como na prateleira móvel (390px)" surface="primary" align="stretch" padding={0}>
      <div style={{ width: 390, maxWidth: '100%' }}>
        <ShortsShelf>{rowCards}</ShortsShelf>
      </div>
    </UniDocStage>
    <UniDocStage label="grid — como na área de trabalho" surface="primary" align="stretch">
      <div style={{ width: '100%' }}>
        <ShortsShelf layout="grid" bordered>
          {gridCards}
        </ShortsShelf>
      </div>
    </UniDocStage>
    <UniDocStage label="Sem raio e com outro rótulo" surface="primary" align="stretch" padding={0}>
      <div style={{ width: 390, maxWidth: '100%' }}>
        <ShortsShelf showLogo={false} label="Em alta agora">
          {rowCards.slice(0, 5)}
        </ShortsShelf>
      </div>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use row com cartões overlay e grid com cartões below — é o par que o arquivo publica.',
        'Passe width="100%" nos cartões dentro da grade, para que preencham a coluna calculada.',
        'Ligue bordered quando a prateleira estiver entre outras seções da área de trabalho.',
        'Ajuste columnWidth quando a grade do produto tiver colunas diferentes das do arquivo.',
      ]}
      donts={[
        'Não escreva "Storts": é um erro de digitação do arquivo comunitário.',
        'Não remova a rolagem da faixa — sem ela o conteúdo além da borda fica inalcançável.',
        'Não use a grade dentro de um quadro de telefone: o arquivo só a publica em 1440px.',
        'Não monte os cartões dentro da prateleira; ela é um contêiner de composição.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="A prateleira é superfície de navegação e muda inteira com o tema. Os valores claros foram medidos no quadro Desktop Shorts Light theme (1:593)."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher align="stretch">
      {() => (
        <div style={{ width: '100%' }}>
          <ShortsShelf layout="grid" bordered columnWidth={140}>
            {gridCards.slice(0, 6)}
          </ShortsShelf>
        </div>
      )}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="ShortsShelf"
      rows={[
        {
          name: 'label',
          type: 'React.ReactNode',
          default: "'Shorts'",
          description: 'Rótulo da seção.',
        },
        {
          name: 'showLogo',
          type: 'boolean',
          default: 'true',
          description: 'Exibe o raio da marca à esquerda do rótulo.',
        },
        {
          name: 'layout',
          type: "'row' | 'grid'",
          default: "'row'",
          description: 'Faixa de rolagem horizontal ou grade que quebra em linhas.',
        },
        {
          name: 'columnWidth',
          type: 'number',
          default: '150',
          description: 'Largura mínima da coluna quando layout é grid.',
        },
        {
          name: 'bordered',
          type: 'boolean',
          default: 'false',
          description: 'Desenha os fios de 1px que delimitam a seção na área de trabalho.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Compõe com ShortsCard. Nenhum cartão é montado internamente.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
          description: 'Demais atributos são repassados ao <section>.',
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
  render: () => <ShortsShelfDocumentationPage />,
};

/**
 * Playground com 100% das props do ShortsShelf expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ShortsShelf',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-primary)' }}
    >
      <ShortsShelf {...args}>{args.layout === 'grid' ? gridCards : rowCards}</ShortsShelf>
    </div>
  ),
};

/**
 * Réplica visual dos nós `1:129` (móvel) e `1:735` (área de trabalho).
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <div style={{ width: 390, maxWidth: '100%' }}>
        <ShortsShelf>{rowCards}</ShortsShelf>
      </div>
      <ShortsShelf layout="grid" bordered>
        {gridCards}
      </ShortsShelf>
    </div>
  ),
};

/**
 * As duas disposições publicadas pelo arquivo.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      <div>
        <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 8 }}>
          row
        </div>
        <div style={{ width: 390, maxWidth: '100%' }}>
          <ShortsShelf>{rowCards}</ShortsShelf>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 8 }}>
          grid
        </div>
        <ShortsShelf layout="grid">{gridCards.slice(0, 7)}</ShortsShelf>
      </div>
    </div>
  ),
};
