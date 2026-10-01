import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { RichContent, RichContentTable } from '../../../src/unooria/components/RichContent';
import type { UnooriaTheme } from '../../../src/unooria/tokens';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';
import { AlternadorDeTema, Cartao, Grade, Palco, Praticas, TabelaDeProps } from './agente/docKit';
import { RespostaEmMarkdown } from './agente/fixtures';

/** Todos os elementos que a tipografia cobre, como o react-markdown os produziria. */
const TodosOsElementos: React.FC = () => (
  <>
    <h1>Título 1 — Planejamento do bimestre</h1>
    <p>
      Parágrafo com <strong>negrito</strong>, <em>itálico</em>, <code>código em linha</code> e um{' '}
      <a href="#link">link para o material</a>.
    </p>
    <h2>Título 2 — Objetivos</h2>
    <ul>
      <li>Ler e comparar frações.</li>
      <li>
        Reconhecer frações equivalentes
        <ul>
          <li>com tiras de papel;</li>
          <li>na reta numérica.</li>
        </ul>
      </li>
    </ul>
    <h3>Título 3 — Etapas</h3>
    <ol>
      <li>Abertura</li>
      <li>Exploração em duplas</li>
      <li>Sistematização</li>
    </ol>
    <h4>Título 4 — Observação</h4>
    <blockquote>
      <p>Uma citação: a turma explica com as próprias palavras.</p>
    </blockquote>
    <pre>
      <code>{'1/2 = 2/4 = 3/6\n1/3 = 2/6 = 3/9'}</code>
    </pre>
    <hr />
    <p>Tabela simples (sem o RichContentTable: as células quebram para caber):</p>
    <table>
      <thead>
        <tr>
          <th>Fração</th>
          <th>Equivalente</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1/2</td>
          <td>2/4</td>
        </tr>
      </tbody>
    </table>
    <p>Tabela larga, com o RichContentTable (rola de lado):</p>
    <RichContentTable>
      <thead>
        <tr>
          {['Semana', 'Habilidade', 'Atividade', 'Material', 'Avaliação', 'Observações'].map((c) => (
            <th key={c}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>EF05MA03</td>
          <td>Tiras de frações em duplas</td>
          <td>Caderno do Professor, p. 12</td>
          <td>Papel de saída</td>
          <td>Retomar 1/3 com quem errou</td>
        </tr>
        <tr>
          <td>2</td>
          <td>EF05MA04</td>
          <td>Reta numérica no chão da sala</td>
          <td>Fita crepe e cartões</td>
          <td>Observação</td>
          <td>Levar para o pátio se chover pouco</td>
        </tr>
      </tbody>
    </RichContentTable>
  </>
);

const RichContentDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<UnooriaTheme>('light');
  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Agente de IA do professor"
        title="RichContent"
        description="A tipografia de uma resposta escrita: títulos, parágrafos, listas, citações, código, tabelas, fio e links já renderizados ganham a escala e as cores da Plataforma Unooria. Não converte markdown nem recebe HTML em texto — recebe os elementos prontos em children."
      />

      <UnooriaDocSectionHeader title="1. Visão Geral & Casos de Uso" description="A resposta do agente, legível." />
      <Grade>
        <Cartao icone="📝" titulo="Markdown no produto, tipografia no DS">
          No hub, o react-markdown converte a resposta em elementos; o <code>RichContent</code> só os veste. Sem{' '}
          <code>dangerouslySetInnerHTML</code>: a sanitização é de quem converte.
        </Cartao>
        <Cartao icone="📊" titulo="Tabela larga">
          <code>RichContentTable</code> põe a tabela numa faixa do <code>ScrollBar</code> que rola de lado. Use-o como o
          componente de tabela do react-markdown: <code>{'components={{ table: RichContentTable }}'}</code>.
        </Cartao>
        <Cartao icone="🔒" titulo="Escopo">
          Todo seletor descende de <code>.unooria-rich-content</code>: nada vaza para fora do invólucro.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="2. Figma & Especificações Técnicas" description="Design próprio, nos degraus da escala da seção." />
      <Grade>
        <Cartao icone="🔠" titulo="Escala">
          Corpo <code>body-s</code> (16/24; 14/20 abaixo de 768px); h1 <code>title-l</code> (20/30), h2{' '}
          <code>body-m</code> (18/28), h3 e h4 <code>body-s</code>. Numa resposta de chat, um h1 de página seria grito.
        </Cartao>
        <Cartao icone="🎨" titulo="Cores">
          Link <code>brandnavy-800</code> sublinhado (5,5:1); citação com fio <code>brandpurple-300</code>; código e
          cabeçalho de tabela em <code>neutral-100</code>; fios <code>neutral-150</code>.
        </Cartao>
        <Cartao icone="↔️" titulo="Tabela sem o RichContentTable">
          A tabela fica na largura do texto e as células quebram as palavras — não muda o <code>display</code> da
          tabela, que em alguns navegadores apagaria a semântica de tabela.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="3. Anatomia do Componente" description="Um invólucro e uma faixa de rolagem." />
      <Grade>
        <Cartao icone="1" titulo="RichContent">
          <code>div</code> (ou <code>section</code>/<code>article</code> via <code>as</code>) com a classe da
          tipografia.
        </Cartao>
        <Cartao icone="2" titulo="RichContentTable">
          <code>ScrollBar</code> horizontal (região focável “Tabela”) com a <code>table</code> dentro. Descarta o{' '}
          <code>node</code> que o react-markdown repassa.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="4. Matriz de Variantes, Tamanhos e Estados" description="Todos os elementos cobertos." />
      <Palco rotulo="Todos os elementos" largura={560}>
        <RichContent>
          <TodosOsElementos />
        </RichContent>
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso." />
      <Praticas
        fazer={[
          'Sanitizar o markdown antes de renderizar (no produto).',
          'Mapear table para RichContentTable no react-markdown.',
          'Abrir links externos em nova aba no componente de link do produto.',
        ]}
        evitar={[
          'Passar HTML em texto com dangerouslySetInnerHTML.',
          'Estilizar os elementos de novo por fora: a tipografia é esta.',
          'Usar RichContent para formulário ou interface: é só para texto lido.',
        ]}
      />

      <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Claro e escuro, em tempo real." />
      <AlternadorDeTema tema={tema} aoMudar={setTema} />
      <Palco rotulo={`Tema ${tema === 'light' ? 'claro' : 'escuro'}`} tema={tema} largura={560}>
        <RichContent theme={tema}>
          <RespostaEmMarkdown />
        </RichContent>
      </Palco>

      <UnooriaDocSectionHeader title="7. Referência Completa de Props da API" description="Contrato público." />
      <TabelaDeProps
        linhas={[
          { nome: 'children', tipo: 'ReactNode', descricao: 'Os elementos já renderizados.' },
          { nome: 'as', tipo: "'div' | 'section' | 'article'", padrao: "'div'", descricao: 'Elemento da raiz.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
          { nome: 'RichContentTable · scrollLabel', tipo: 'string', padrao: "'Tabela'", descricao: 'Nome da faixa de rolagem.' },
          { nome: 'RichContentTable · node', tipo: 'unknown', descricao: 'O nó do react-markdown — descartado.' },
          { nome: 'RichContentTable · ...rest', tipo: 'TableHTMLAttributes', descricao: 'Vão à <table>.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof RichContent> = {
  title: 'Plataforma Unooria/Componentes/RichContent',
  component: RichContent,
  parameters: { layout: 'padded' },
  argTypes: {
    as: { control: 'radio', options: ['div', 'section', 'article'], description: 'Elemento da raiz.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: false, description: 'Os elementos já renderizados. No playground: uma resposta do agente.' },
  },
  args: {
    as: 'div',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof RichContent>;

/** Documentação rica e completa do componente. */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <RichContentDocumentationPage />,
};

/** Playground com todas as propriedades, sobre uma resposta do agente. */
export const Playground: Story = {
  name: '🕹️ 1. Playground do RichContent',
  render: (args) => (
    <Palco rotulo="RichContent" tema={args.theme} largura={560}>
      <RichContent {...args}>
        <RespostaEmMarkdown />
      </RichContent>
    </Palco>
  ),
};

/** Todos os elementos, nos dois temas. */
export const TodasVariantes: Story = {
  name: '🎨 Todas as Variantes',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Palco rotulo="Claro" largura={480}>
        <RichContent>
          <TodosOsElementos />
        </RichContent>
      </Palco>
      <Palco rotulo="Escuro" tema="dark" largura={480}>
        <RichContent theme="dark">
          <TodosOsElementos />
        </RichContent>
      </Palco>
    </div>
  ),
};

/**
 * As garantias: a hierarquia de títulos chega ao leitor de tela, a tabela
 * larga fica numa faixa focável e rola de lado, e o `node` do react-markdown
 * não vai ao DOM.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <RichContent data-testid="conteudo">
        <TodosOsElementos />
      </RichContent>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await expect(tela.getByRole('heading', { level: 1 })).toHaveTextContent('Planejamento do bimestre');
    await expect(tela.getAllByRole('heading')).toHaveLength(4);

    const faixa = tela.getByRole('region', { name: 'Tabela' });
    await expect(faixa).toHaveAttribute('tabindex', '0');
    // Em 360px a tabela de seis colunas não cabe: a faixa rola.
    await expect(faixa.scrollWidth).toBeGreaterThan(faixa.clientWidth);
    await expect(within(faixa).getByRole('table')).toBeInTheDocument();
    await expect(faixa.querySelector('table')?.hasAttribute('node')).toBe(false);
  },
};
