import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Table } from '../../../src/unootube';
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

const meta: Meta<typeof Table> = {
  title: 'Unootube/Componentes/Table',
  component: Table,
  parameters: { layout: 'padded' },
  argTypes: {
    dense: { control: 'boolean' },
    zebra: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
    caption: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    dense: false,
    zebra: false,
    stickyHeader: false,
    caption: 'Desempenho dos vídeos publicados',
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

/** Linhas de demonstração, com os rótulos que o arquivo usa nos cartões. */
const rows = [
  { id: 'r1', videoTitle: 'Video title goes here', views: '15K', duration: '23:45', published: '1 week ago' },
  { id: 'r2', videoTitle: 'Ep 6: Living to Serve | SEARCH ON', views: '1M', duration: '12:08', published: '3 years ago' },
  { id: 'r3', videoTitle: 'Home video | Movements', views: '245K', duration: '0:58', published: '2 hours ago' },
  { id: 'r4', videoTitle: 'DIY Toys | Satisfying And Relaxing', views: '24M', duration: '1:12', published: '5 days ago' },
];

/** Tabela de demonstração reaproveitada pelos palcos. */
const DemoTable: React.FC<React.ComponentProps<typeof Table>> = (props) => (
  <Table {...props}>
    <Table.Head>
      <Table.Row>
        <Table.Cell header>Vídeo</Table.Cell>
        <Table.Cell header align="end" nowrap>
          Visualizações
        </Table.Cell>
        <Table.Cell header align="end" nowrap>
          Duração
        </Table.Cell>
        <Table.Cell header nowrap>
          Publicado
        </Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {rows.map((row, index) => (
        <Table.Row key={row.id} selected={index === 1}>
          <Table.Cell>{row.videoTitle}</Table.Cell>
          <Table.Cell align="end" nowrap>
            {row.views}
          </Table.Cell>
          <Table.Cell align="end" nowrap>
            {row.duration}
          </Table.Cell>
          <Table.Cell nowrap>{row.published}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

const TableDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Extensões"
      title="Table"
      description="Grade de dados do Unootube. É uma EXTENSÃO DECLARADA: o produto de referência organiza conteúdo em cartão e em lista, nunca em tabela. A régua não foi inventada — é a da linha de lista, que os dois arquivos publicam à exaustão: 40px de altura e fio de 1px em border/subtle."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="De onde veio a régua de um componente que o arquivo não desenha."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="📏" title="A régua é a da linha de lista">
        Altura de 40px (<code>8:126</code>, a linha da barra lateral), divisor de 1px em{' '}
        <code>border/subtle</code> — o mesmo fio que separa as seções — e calha de 16px. Nada
        precisou ser inventado.
      </UniDocCard>
      <UniDocCard icon="🪶" title="Plana, como as listas do arquivo">
        Nenhuma sombra. A separação vem do fio e da luminância da superfície, exatamente como nas
        listas que os arquivos publicam.
      </UniDocCard>
      <UniDocCard icon="🧭" title="Semântica de verdade">
        <code>&lt;table&gt;</code> com <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code> e{' '}
        <code>&lt;th scope=&quot;col&quot;&gt;</code>. A legenda é lida por leitores de tela e fica
        visualmente oculta.
      </UniDocCard>
      <UniDocCard icon="↔️" title="Rolagem alcançável por teclado">
        O contêiner de rolagem tem <code>tabindex</code> e <code>role=&quot;group&quot;</code>. Sem
        isso, colunas fora da tela ficariam inacessíveis a quem navega sem ponteiro.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="A origem de cada medida e o registro completo de desvios."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="8:126"
      frameName="Linha da barra lateral (a régua emprestada)"
      specs={[
        { label: 'Altura da linha', value: '40px · 32px no modo denso' },
        { label: 'Divisor', value: '1px em border/subtle' },
        { label: 'Cabeçalho', value: 'Label/Large em text/secondary' },
        { label: 'Conteúdo', value: 'Body/Medium em text/primary' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'O componente inteiro é extensão',
          detail:
            'nenhum dos dois arquivos de origem publica tabela — o produto de referência organiza conteúdo em cartão e em lista. Foi acrescentado porque um painel de aluno precisa de grade de dados.',
        },
        {
          subject: 'Régua emprestada da linha de lista',
          detail:
            'altura, divisor, calha e tipografia vêm todos da linha da barra lateral (8:126) e do fio que separa as seções (1:599). Nenhum valor novo foi introduzido.',
        },
        {
          subject: 'Listra desligada por padrão',
          detail:
            'o arquivo separa listas por fio, não por faixa. A prop zebra existe para tabelas muito largas, mas vem desligada e é construída sobre o realce de interação da própria marca.',
        },
        {
          subject: 'Cabeçalho fixo com superfície opaca',
          detail:
            'stickyHeader precisa de um fundo opaco por baixo, senão o conteúdo rolaria visível através dele. Usa background/primary, a superfície da página.',
        },
        {
          subject: 'Célula de cabeçalho explícita',
          detail:
            'Table.Cell só vira <th scope="col"> com a prop header. Injetá-la a partir do Table.Head exigiria um contexto React, o que tornaria a tabela inteira um Client Component sem ganho — ela não tem estado nenhum.',
        },
        {
          subject: 'Alinhamento lógico',
          detail:
            'a prop align usa start | center | end, e não a escada legada do HTML (left | right). É o que respeita direção de leitura em interface publicada em mais de um idioma.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Contêiner de rolagem',
          role: 'Rolagem horizontal com tabindex, para colunas fora da tela.',
          token: 'role="group"',
        },
        {
          name: 'Table.Head',
          role: 'Cabeçalho em Label/Large, na tinta secundária.',
          token: '--uni-font-label-lg-* · --uni-color-text-secondary',
        },
        {
          name: 'Table.Row',
          role: 'Linha de 40px com fio de 1px na base. A última não leva fio.',
          token: '--uni-sidebar-item-height · --uni-color-border-subtle',
        },
        {
          name: 'Table.Cell',
          role: 'Conteúdo em Body/Medium, calha de 16px, alinhamento lógico.',
          token: '--uni-font-body-md-* · --uni-spacing-16',
        },
        {
          name: 'Linha selecionada',
          role: 'Superfície de seleção da marca, distinta do realce de hover.',
          token: '--uni-color-surface-selected',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Padrão — a régua da linha de lista" surface="primary" align="stretch">
      <DemoTable caption="Desempenho dos vídeos publicados" />
    </UniDocStage>
    <UniDocStage label="Denso — 32px por linha" surface="primary" align="stretch">
      <DemoTable dense caption="Desempenho dos vídeos publicados" />
    </UniDocStage>
    <UniDocStage label="Com listra (extensão, desligada por padrão)" surface="primary" align="stretch">
      <DemoTable zebra caption="Desempenho dos vídeos publicados" />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Informe uma caption sempre que não houver um título próximo descrevendo a tabela.',
        'Marque todas as células de Table.Head com header, para que virem <th scope="col">.',
        'Use align="end" e nowrap em colunas numéricas: é o que alinha a vírgula.',
        'Deixe a listra desligada — o arquivo separa listas por fio, e o fio já basta.',
      ]}
      donts={[
        'Não use tabela para layout: o produto de referência organiza conteúdo em cartão.',
        'Não aplique sombra: a biblioteca é plana e as listas do arquivo também.',
        'Não use stickyHeader sem dar altura ao contêiner — o cabeçalho não teria onde grudar.',
        'Não misture com a Table da Plataforma Unooria na mesma tela: são marcas distintas.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="A tabela nos dois temas medidos do segundo arquivo de origem."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher align="stretch">
      {() => <DemoTable caption="Desempenho dos vídeos publicados" />}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="Table"
      rows={[
        { name: 'dense', type: 'boolean', default: 'false', description: 'Reduz a altura da linha de 40px para 32px.' },
        { name: 'zebra', type: 'boolean', default: 'false', description: 'Alterna a superfície das linhas. Extensão: o arquivo separa por fio.' },
        { name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Mantém o cabeçalho fixo. Exige altura no contêiner.' },
        { name: 'caption', type: 'React.ReactNode', description: 'Legenda lida por leitores de tela, visualmente oculta.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        { name: '...rest', type: 'React.TableHTMLAttributes<HTMLTableElement>', description: 'Demais atributos vão para o elemento <table>.' },
      ]}
    />
    <UniDocPropsTable
      title="Table.Row"
      rows={[
        { name: 'selected', type: 'boolean', default: 'false', description: 'Marca a linha como selecionada, com a superfície de seleção da marca.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLTableRowElement>', description: 'Demais atributos vão para o <tr>.' },
      ]}
    />
    <UniDocPropsTable
      title="Table.Cell"
      rows={[
        { name: 'header', type: 'boolean', default: 'false', description: 'Renderiza como <th scope="col">. Use em todas as células de Table.Head.' },
        { name: 'align', type: "'start' | 'center' | 'end'", default: "'start'", description: 'Alinhamento lógico do conteúdo, que respeita direção de leitura.' },
        { name: 'nowrap', type: 'boolean', default: 'false', description: 'Impede a quebra de linha, para colunas numéricas curtas.' },
        { name: '...rest', type: 'React.TdHTMLAttributes<HTMLTableCellElement>', description: 'Demais atributos vão para a célula.' },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TableDocumentationPage />,
};

/**
 * Playground com 100% das props da Table expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da Table',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{ padding: 40, background: 'var(--uni-color-background-primary)' }}
    >
      <DemoTable {...args} />
    </div>
  ),
};

/**
 * Os três modos de densidade e superfície.
 */
export const Estados: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <DemoTable caption="Padrão" />
      <DemoTable dense caption="Denso" />
      <DemoTable zebra caption="Com listra" />
    </div>
  ),
};

/**
 * Cabeçalho fixo dentro de um contêiner com altura.
 */
export const CabecalhoFixo: Story = {
  name: 'Cabeçalho fixo',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-primary)' }}
    >
      <div style={{ height: 200, overflowY: 'auto' }}>
        <Table stickyHeader caption="Desempenho dos vídeos publicados">
          <Table.Head>
            <Table.Row>
              <Table.Cell header>Vídeo</Table.Cell>
              <Table.Cell header align="end" nowrap>
                Visualizações
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {[...rows, ...rows, ...rows].map((row, index) => (
              <Table.Row key={`${row.id}-${index}`}>
                <Table.Cell>{row.videoTitle}</Table.Cell>
                <Table.Cell align="end" nowrap>
                  {row.views}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  ),
};
