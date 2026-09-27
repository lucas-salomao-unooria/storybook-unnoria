import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { NewspaperPage, NEWSPAPER_LAYOUTS } from '../../../src/unooria/components/NewspaperPage';
import type { NewspaperLayout, NewspaperSlot } from '../../../src/unooria/components/NewspaperPage';
import { Button } from '../../../src/unooria/components/Button';
import { Icon } from '../../../src/unooria/components/Icon';
import type { UnooriaTheme } from '../../../src/unooria/tokens';
import '../../../src/unooria/tokens/icons.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/* ---------------------------------------------------------------------------
   Imagens de demonstração — desenhadas na hora, com as cores lidas dos tokens
   do :root. Nenhum arquivo entra no repositório, nenhuma cor avulsa entra no
   código, nenhuma pessoa aparece, e o teste não depende de rede.
   ------------------------------------------------------------------------- */

const token = (nome: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(nome).trim() || 'currentColor';

type Cena = 'gincana' | 'feira' | 'horta';

const ALT: Record<Cena, string> = {
  gincana: 'Desenho de bandeirinhas coloridas sobre a quadra da escola',
  feira: 'Desenho de uma mesa com a maquete de um vulcão e um frasco de experiência',
  horta: 'Desenho de canteiros de horta com pés de alface e o sol',
};

const desenharCena = (cena: Cena): string => {
  let corpo: string[];
  if (cena === 'gincana') {
    const cores = [
      '--unooria-color-danger-400',
      '--unooria-color-info-400',
      '--unooria-color-success-400',
      '--unooria-color-brandorange-400',
    ].map(token);
    const bandeiras = Array.from({ length: 10 }, (_, i) => {
      const x = 10 + i * 30;
      return `<polygon points="${x},30 ${x + 26},30 ${x + 13},56" fill="${cores[i % cores.length]}"/>`;
    });
    corpo = [
      `<rect width="320" height="180" fill="${token('--unooria-color-brandnavy-100')}"/>`,
      `<rect y="118" width="320" height="62" fill="${token('--unooria-color-brandorange-300')}"/>`,
      `<rect x="20" y="132" width="280" height="36" fill="none" stroke="${token('--unooria-color-neutral-50')}" stroke-width="3"/>`,
      `<line x1="160" y1="132" x2="160" y2="168" stroke="${token('--unooria-color-neutral-50')}" stroke-width="3"/>`,
      `<line x1="0" y1="30" x2="320" y2="30" stroke="${token('--unooria-color-neutral-700')}" stroke-width="2"/>`,
      ...bandeiras,
    ];
  } else if (cena === 'feira') {
    corpo = [
      `<rect width="320" height="180" fill="${token('--unooria-color-brandpurple-100')}"/>`,
      `<rect x="200" y="20" width="96" height="30" rx="4" fill="${token('--unooria-color-neutral-50')}"/>`,
      `<rect x="210" y="30" width="60" height="4" rx="2" fill="${token('--unooria-color-neutral-300')}"/>`,
      `<rect x="210" y="38" width="40" height="4" rx="2" fill="${token('--unooria-color-neutral-300')}"/>`,
      `<polygon points="80,116 124,52 168,116" fill="${token('--unooria-color-brandorange-600')}"/>`,
      `<circle cx="118" cy="44" r="8" fill="${token('--unooria-color-danger-400')}"/>`,
      `<circle cx="132" cy="36" r="6" fill="${token('--unooria-color-danger-400')}"/>`,
      `<polygon points="214,116 232,78 232,58 246,58 246,78 264,116" fill="${token('--unooria-color-info-300')}"/>`,
      `<rect x="30" y="116" width="260" height="14" rx="3" fill="${token('--unooria-color-brandorange-800')}"/>`,
      `<rect x="44" y="130" width="10" height="50" fill="${token('--unooria-color-brandorange-800')}"/>`,
      `<rect x="266" y="130" width="10" height="50" fill="${token('--unooria-color-brandorange-800')}"/>`,
    ];
  } else {
    const alfaces = [120, 150].flatMap((y, fileira) =>
      Array.from({ length: 7 }, (_, i) => {
        const cor = token(i % 2 === fileira ? '--unooria-color-success-500' : '--unooria-color-success-600');
        return `<circle cx="${30 + i * 44}" cy="${y}" r="14" fill="${cor}"/>`;
      })
    );
    corpo = [
      `<rect width="320" height="180" fill="${token('--unooria-color-brandnavy-200')}"/>`,
      `<circle cx="262" cy="40" r="22" fill="${token('--unooria-color-brandorange-300')}"/>`,
      `<rect y="100" width="320" height="80" fill="${token('--unooria-color-brandorange-700')}"/>`,
      ...alfaces,
    ];
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180">${corpo.join('')}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const useCenas = (): Record<Cena, string> =>
  useMemo(
    () => ({ gincana: desenharCena('gincana'), feira: desenharCena('feira'), horta: desenharCena('horta') }),
    []
  );

/* ---------------------------------------------------------------------------
   O conteúdo de demonstração: a 1ª edição (com a gincana de 2018 e o boato da
   cantina) e a 2ª, refeita depois da reação dos leitores.
   ------------------------------------------------------------------------- */

type Cenas = Record<Cena, string>;

const gincana = (cenas: Cenas): NewspaperSlot => ({
  id: 'gincana',
  medium: 'message',
  headline: 'Gincana da primavera é neste sábado',
  summary: 'A mensagem pede que as famílias venham com roupa de festa, às 9h, na quadra da escola.',
  imageSrc: cenas.gincana,
  imageAlt: ALT.gincana,
});

const feira = (cenas: Cenas): NewspaperSlot => ({
  id: 'feira',
  medium: 'bulletin',
  headline: 'Feira de ciências abre inscrições',
  summary: 'As turmas do 4º e do 5º ano podem inscrever projetos até sexta-feira, na secretaria.',
  imageSrc: cenas.feira,
  imageAlt: ALT.feira,
});

const cantina: NewspaperSlot = {
  id: 'cantina',
  medium: 'social',
  headline: 'Cantina vai servir sorvete todo dia',
  summary: 'Um post diz que o cardápio muda na semana que vem.',
};

const horta = (cenas: Cenas): NewspaperSlot => ({
  id: 'horta',
  medium: 'newspaper',
  headline: 'Horta da escola colhe a primeira safra',
  summary: 'O 3º ano plantou alface e cenoura em março. A colheita vai para a merenda desta semana.',
  imageSrc: cenas.horta,
  imageAlt: ALT.horta,
});

const biblioteca: NewspaperSlot = {
  id: 'biblioteca',
  medium: 'radio',
  headline: 'Biblioteca ganha 200 livros novos',
  summary: 'A bibliotecária contou na rádio da escola que os livros chegam na segunda-feira.',
};

const PRIMEIRA = { edition: '1ª edição', dateLine: 'Sexta-feira, 25 de setembro de 2026' };
const SEGUNDA = { edition: '2ª edição', dateLine: 'Segunda-feira, 28 de setembro de 2026' };

const primeiraEdicao = (cenas: Cenas): (NewspaperSlot | null)[] => [gincana(cenas), feira(cenas), cantina];

const primeiraRevisada = (cenas: Cenas): (NewspaperSlot | null)[] => [
  { ...gincana(cenas), marker: { tone: 'alert', label: 'Fato de 2018 — já passou' } },
  { ...feira(cenas), marker: { tone: 'ok', label: 'Notícia de agora, do mural da escola' } },
  { ...cantina, marker: { tone: 'alert', label: 'Sem fonte — ninguém confirmou' } },
];

const segundaEdicao = (cenas: Cenas): (NewspaperSlot | null)[] => [horta(cenas), feira(cenas), biblioteca];

const segundaRevisada = (cenas: Cenas): (NewspaperSlot | null)[] => [
  { ...horta(cenas), marker: { tone: 'ok', label: 'Fato desta semana' } },
  { ...feira(cenas), marker: { tone: 'ok', label: 'Notícia de agora' } },
  { ...biblioteca, marker: { tone: 'ok', label: 'Confirmado pela bibliotecária' } },
];

const POSICOES = ['Manchete principal', 'Notícia secundária A', 'Notícia secundária B'];

/**
 * A ação de cada vaga, como a missão a usa: "Trocar matéria" na vaga cheia e
 * "Escolher matéria" na vazia. O nome acessível CONTÉM o rótulo visível e
 * acrescenta a posição — três botões "Trocar matéria" iguais não dizem qual é
 * qual numa lista de botões.
 */
const acaoDaVaga = (tema: UnooriaTheme = 'light') =>
  function acaoDaVagaNoTema(indice: number, vaga: NewspaperSlot | null) {
    const rotulo = vaga ? 'Trocar matéria' : 'Escolher matéria';
    return (
      <Button
        variant="outline"
        size="sm"
        theme={tema}
        aria-label={`${rotulo}: ${POSICOES[indice]}`}
        leftIcon={vaga ? <Icon name="swap_horiz" size="xs" color="currentColor" /> : undefined}
      >
        {rotulo}
      </Button>
    );
  };

/* ---------------------------------------------------------------------------
   Peças da página de documentação — só tokens, nenhuma cor avulsa (seção 2).
   ------------------------------------------------------------------------- */

const Cartao: React.FC<{ icone: string; titulo: string; children: React.ReactNode }> = ({
  icone,
  titulo,
  children,
}) => (
  <div
    style={{
      padding: 'var(--unooria-spacing-s)',
      border: '1px solid var(--unooria-color-neutral-150)',
      borderRadius: 12,
      background: 'var(--unooria-color-neutral-50)',
      color: 'var(--unooria-color-neutral-700)',
      fontSize: 14,
      lineHeight: 1.6,
    }}
  >
    <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--unooria-color-neutral-950)' }}>
      {icone} {titulo}
    </p>
    {children}
  </div>
);

const Grade: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 'var(--unooria-spacing-s)',
      marginBottom: 'var(--unooria-spacing-l)',
    }}
  >
    {children}
  </div>
);

const Palco: React.FC<{ rotulo: string; escuro?: boolean; children: React.ReactNode }> = ({
  rotulo,
  escuro = false,
  children,
}) => (
  <div style={{ marginBottom: 'var(--unooria-spacing-m)' }}>
    <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--unooria-color-neutral-700)' }}>{rotulo}</p>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 'var(--unooria-spacing-m)',
        padding: 'var(--unooria-spacing-m)',
        borderRadius: 12,
        background: escuro ? 'var(--unooria-color-neutraldark-100)' : 'var(--unooria-color-neutral-100)',
      }}
    >
      {children}
    </div>
  </div>
);

/**
 * Uma largura fixa para a página — `375` é o aparelho da missão, descontadas
 * as calhas de 16px da tela (a página fica com 343px).
 */
const Moldura: React.FC<{ largura: number; rotulo?: string; escuro?: boolean; children: React.ReactNode }> = ({
  largura,
  rotulo,
  escuro = false,
  children,
}) => (
  <div style={{ width: largura, maxWidth: '100%', flex: '0 1 auto' }}>
    {rotulo && (
      <p
        style={{
          margin: '0 0 8px',
          fontSize: 12,
          color: escuro ? 'var(--unooria-color-neutraldark-900)' : 'var(--unooria-color-neutral-700)',
        }}
      >
        {rotulo}
      </p>
    )}
    <div style={{ padding: largura <= 375 ? 16 : 0, boxSizing: 'border-box' }}>{children}</div>
  </div>
);

const Praticas: React.FC<{ fazer: string[]; evitar: string[] }> = ({ fazer, evitar }) => (
  <Grade>
    <Cartao icone="✓" titulo="O que fazer">
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {fazer.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Cartao>
    <Cartao icone="✕" titulo="O que evitar">
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {evitar.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Cartao>
  </Grade>
);

const TabelaDeProps: React.FC<{
  linhas: { nome: string; tipo: string; padrao?: string; descricao: string }[];
}> = ({ linhas }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
    <thead>
      <tr style={{ color: 'var(--unooria-color-neutral-950)' }}>
        {['Prop', 'Tipo', 'Padrão', 'Descrição'].map((c) => (
          <th key={c} style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-200)' }}>
            {c}
          </th>
        ))}
      </tr>
    </thead>
    <tbody style={{ color: 'var(--unooria-color-neutral-700)' }}>
      {linhas.map((l) => (
        <tr key={l.nome}>
          <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
            <code>{l.nome}</code>
          </td>
          <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
            <code>{l.tipo}</code>
          </td>
          <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
            {l.padrao ? <code>{l.padrao}</code> : '—'}
          </td>
          <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>{l.descricao}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const DESCRICAO_DO_LAYOUT: Record<NewspaperLayout, string> = {
  classic: 'manchete em cima, secundárias lado a lado',
  'hero-image': 'imagem grande e faixa sólida',
  columns: 'coluna larga e coluna estreita',
};

/** O comparativo: as duas edições em miniatura, lado a lado. */
const Comparativo: React.FC<{ cenas: Cenas; tema?: UnooriaTheme }> = ({ cenas, tema = 'light' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }}>
    <NewspaperPage
      {...PRIMEIRA}
      size="thumbnail"
      readOnly
      theme={tema}
      layout="classic"
      slots={primeiraRevisada(cenas)}
    />
    <NewspaperPage
      {...SEGUNDA}
      size="thumbnail"
      readOnly
      theme={tema}
      layout="hero-image"
      slots={segundaRevisada(cenas)}
    />
  </div>
);

/**
 * Página de documentação rica do componente NewspaperPage.
 */
const NewspaperPageDocumentationPage: React.FC = () => {
  const cenas = useCenas();
  const [tema, setTema] = useState<UnooriaTheme>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Jornal"
        title="NewspaperPage"
        description="A primeira página do jornal da escola: o nome do jornal em caixa alta sobre um fio duplo, a edição e a data, e EXATAMENTE três vagas — a manchete principal e duas secundárias. É onde a criança monta a edição, publica, revisa com marcadores e compara a 1ª com a 2ª edição."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="A missão Jornal da Escola, do 4º ano: montar, publicar, ouvir os leitores, refazer."
      />
      <Grade>
        <Cartao icone="🗞️" titulo="Três vagas, sempre">
          <code>slots</code> tem três posições: 0 é a manchete principal, 1 e 2 são as secundárias.{' '}
          <code>null</code> é vaga vazia, com a caixa tracejada e o rótulo da vaga.
        </Cartao>
        <Cartao icone="🔒" titulo="Layout em conjunto fechado">
          Na missão, uma IA escolhe o layout — e só entre <code>classic</code>, <code>hero-image</code> e{' '}
          <code>columns</code> (<code>NEWSPAPER_LAYOUTS</code>). Ela nunca toca no texto da criança.
        </Cartao>
        <Cartao icone="🔍" titulo="Revisão com marcadores">
          Cada vaga pode trazer um marcador: tom <code>alert</code> (“Fato de 2018 — já passou”) ou{' '}
          <code>ok</code>. Ícone com nome e texto — nunca só a cor.
        </Cartao>
        <Cartao icone="↔️" titulo="Comparativo de edições">
          <code>size=&quot;thumbnail&quot;</code> é a miniatura: menor, sem resumo e sem ações. Duas lado a
          lado mostram o que mudou da 1ª para a 2ª edição.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Design próprio: a seção não tem quadro de jornal no Figma."
      />
      <Grade>
        <Cartao icone="📐" titulo="De onde vêm as medidas">
          A folha é o <code>Card</code>: fio de 1px, raio de 16px, recuo de 16px. A faixa do marcador é o{' '}
          <code>Tag</code>: 28px de altura mínima, recuo de 4px 8px, raio de 8px, texto 14/20. A ação é o{' '}
          <code>Button</code> <code>outline</code> <code>sm</code>, entregue por <code>renderSlotAction</code>.
        </Cartao>
        <Cartao icone="📏" titulo="Layout por contêiner">
          A página é um contêiner de consulta (<code>container-type: inline-size</code>). Com 300px de
          conteúdo, as secundárias do <code>classic</code> ficam lado a lado; com 540px, cada layout abre
          as colunas. A miniatura abre em 300px. Os títulos usam <code>clamp()</code> com <code>cqi</code>.
        </Cartao>
        <Cartao icone="🎨" titulo="Cores">
          Marcador <code>alert</code>: <code>danger-800</code> sobre <code>danger-50</code> (7,37:1).{' '}
          <code>ok</code>: <code>success-800</code> sobre <code>success-50</code> (6,61:1). Faixa do{' '}
          <code>hero-image</code>: <code>brandpurple-950</code> com texto branco (19,58:1), o par do{' '}
          <code>Button</code> primário. Tracejado da vaga vazia em <code>neutral-400</code> (3,41:1).
        </Cartao>
        <Cartao icone="⚠️" titulo="Desvios registrados">
          Os tamanhos de texto são literais: os tokens <code>--unooria-size-*</code> trocam de degrau em
          768px de VIEWPORT, e a miniatura é estreita mesmo em tela larga. Todos os glifos são do quadro
          de ícones <code>6024:2923</code>, pelo nome da ligadura do Material Symbols Rounded:{' '}
          <code>add</code>, <code>warning</code>, <code>check_circle</code>, e os dos meios, lidos de{' '}
          <code>NEWS_MEDIUM_ICONS</code> (nunca escritos à mão aqui).
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Cabeçalho (nome, fio duplo, edição e data) e as três vagas."
      />
      <Grade>
        <Cartao icone="1" titulo="Cabeçalho">
          <code>nameplate</code> em caixa alta sobre o fio duplo; embaixo, <code>edition</code> e{' '}
          <code>dateLine</code>, fechados por um fio simples.
        </Cartao>
        <Cartao icone="2" titulo="Vaga preenchida">
          O meio (ícone e nome), a manchete (maior na vaga 0), o marcador, o resumo, a imagem 16:9 e a ação.
          No DOM, a manchete vem primeiro: quem navega por títulos cai nela e ouve o marcador logo depois.
        </Cartao>
        <Cartao icone="3" titulo="Vaga vazia">
          Caixa tracejada com o ícone <code>add</code> e o rótulo (<code>emptyLabels</code>). O leitor de tela
          ouve “Notícia secundária B, vaga vazia”. Em <code>readOnly</code>, sem convite.
        </Cartao>
        <Cartao icone="4" titulo="Títulos e regiões">
          Cada vaga é uma <code>section</code> nomeada. A manchete principal é <code>h2</code> e as
          secundárias <code>h3</code> (<code>headingLevel</code> sobe tudo um nível).
        </Cartao>
      </Grade>
      <Palco rotulo="No aparelho de 375px, com a ação de cada vaga">
        <Moldura largura={375}>
          <NewspaperPage {...PRIMEIRA} slots={[feira(cenas), null, biblioteca]} renderSlotAction={acaoDaVaga()} />
        </Moldura>
      </Palco>

      <UnooriaDocSectionHeader
        title="4. Matriz de Variantes, Tamanhos e Estados"
        description="Os três layouts com a mesma edição, a revisão e o comparativo."
      />
      {NEWSPAPER_LAYOUTS.map((layout) => (
        <Palco key={layout} rotulo={`layout="${layout}" — ${DESCRICAO_DO_LAYOUT[layout]}`}>
          <Moldura largura={375} rotulo="375px">
            <NewspaperPage {...SEGUNDA} layout={layout} slots={segundaEdicao(cenas)} readOnly />
          </Moldura>
          <Moldura largura={720} rotulo="720px">
            <NewspaperPage {...SEGUNDA} layout={layout} slots={segundaEdicao(cenas)} readOnly />
          </Moldura>
        </Palco>
      ))}
      <Palco rotulo="Revisão: a 1ª edição com os marcadores">
        <Moldura largura={375}>
          <NewspaperPage {...PRIMEIRA} slots={primeiraRevisada(cenas)} readOnly />
        </Moldura>
      </Palco>
      <Palco rotulo='Comparativo: size="thumbnail", 1ª edição × 2ª edição'>
        <Moldura largura={375}>
          <Comparativo cenas={cenas} />
        </Moldura>
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da primeira página." />
      <Praticas
        fazer={[
          'Mandar sempre as três posições em slots, com null na vaga vazia.',
          'Validar o layout da IA no servidor contra NEWSPAPER_LAYOUTS.',
          'Escrever o motivo do marcador em palavras (“Fato de 2018 — já passou”).',
          'Dar imageAlt a toda imagem — foto de primeira página é conteúdo.',
          'Pôr a posição no nome acessível da ação: “Trocar matéria: Manchete principal”.',
          'Usar readOnly na edição publicada e thumbnail no comparativo.',
        ]}
        evitar={[
          'Deixar a IA mudar manchete ou resumo — ela só escolhe o layout.',
          'Inventar um quarto layout só na tela: é contrato com a IA.',
          'Marcador só com cor, ou com texto vazio.',
          'Pôr a página num flex sem largura: ela toma a largura do contêiner, não a do conteúdo.',
          'Botão de ação dentro da manchete: a ação é o slot renderSlotAction, fora do título.',
        ]}
      />

      <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Claro e escuro, em tempo real." />
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {(['light', 'dark'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTema(t)}
            aria-pressed={tema === t}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid var(--unooria-color-neutral-200)',
              background: tema === t ? 'var(--unooria-color-neutral-150)' : 'var(--unooria-color-neutral-50)',
              color: 'var(--unooria-color-neutral-950)',
              cursor: 'pointer',
            }}
          >
            {t === 'light' ? 'Claro' : 'Escuro'}
          </button>
        ))}
      </div>
      <Palco rotulo={`Tema ${tema === 'light' ? 'claro' : 'escuro'}`} escuro={tema === 'dark'}>
        <Moldura largura={375} escuro={tema === 'dark'} rotulo="hero-image, com a revisão">
          <NewspaperPage {...PRIMEIRA} theme={tema} layout="hero-image" slots={primeiraRevisada(cenas)} readOnly />
        </Moldura>
        <Moldura largura={375} escuro={tema === 'dark'} rotulo="Montando, com vaga vazia">
          <NewspaperPage
            {...SEGUNDA}
            theme={tema}
            slots={[horta(cenas), null, biblioteca]}
            renderSlotAction={acaoDaVaga(tema)}
          />
        </Moldura>
        <Moldura largura={375} escuro={tema === 'dark'} rotulo="Comparativo">
          <Comparativo cenas={cenas} tema={tema} />
        </Moldura>
      </Palco>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente NewspaperPage."
      />
      <TabelaDeProps
        linhas={[
          { nome: 'slots', tipo: '(NewspaperSlot | null)[]', descricao: 'As três vagas: 0 = manchete principal, 1 e 2 = secundárias; null = vazia. Obrigatório.' },
          { nome: 'nameplate', tipo: 'ReactNode', padrao: "'Jornal da Escola'", descricao: 'Nome do jornal, em caixa alta.' },
          { nome: 'edition', tipo: 'ReactNode', descricao: 'A edição (“1ª edição”). Entra no nome da página.' },
          { nome: 'dateLine', tipo: 'ReactNode', descricao: 'A linha de data do cabeçalho.' },
          { nome: 'layout', tipo: "'classic' | 'hero-image' | 'columns'", padrao: "'classic'", descricao: 'Conjunto fechado (NEWSPAPER_LAYOUTS): é o que a IA pode escolher.' },
          { nome: 'emptyLabels', tipo: '[ReactNode, ReactNode, ReactNode]', padrao: "['Manchete principal', 'Notícia secundária A', 'Notícia secundária B']", descricao: 'Texto da vaga vazia; quando é texto, também nomeia a vaga.' },
          { nome: 'renderSlotAction', tipo: '(index, slot) => ReactNode', descricao: 'A ação de cada vaga. Ignorada em readOnly e na miniatura.' },
          { nome: 'readOnly', tipo: 'boolean', padrao: 'false', descricao: 'Edição publicada: sem ações e sem convite nas vagas vazias.' },
          { nome: 'size', tipo: "'full' | 'thumbnail'", padrao: "'full'", descricao: 'thumbnail: menor, sem resumo e sem ações.' },
          { nome: 'headingLevel', tipo: '2 | 3', padrao: '2', descricao: 'Nível da manchete principal; as secundárias ficam um abaixo.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
          { nome: 'aria-label', tipo: 'string', descricao: 'Nome da página. Sem ele: nameplate + edition, quando são texto.' },
          { nome: 'NewspaperSlot', tipo: '{ id, headline, summary?, medium?, imageSrc?, imageAlt?, marker? }', descricao: 'Com imageSrc, imageAlt é obrigatório no tipo; em tempo de execução, imagem sem alt não é desenhada.' },
          { nome: 'NewspaperSlotMarker', tipo: "{ tone: 'alert' | 'ok'; label: ReactNode }", descricao: 'O marcador da revisão: ícone com nome (Atenção / Tudo certo) e o motivo em texto.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

/** As vagas do playground, em JSON. `cena:*` vira um desenho na hora. */
const SLOTS_DO_PLAYGROUND: (NewspaperSlot | null)[] = [
  {
    id: 'gincana',
    medium: 'message',
    headline: 'Gincana da primavera é neste sábado',
    summary: 'A mensagem pede que as famílias venham com roupa de festa, às 9h, na quadra da escola.',
    imageSrc: 'cena:gincana',
    imageAlt: ALT.gincana,
    marker: { tone: 'alert', label: 'Fato de 2018 — já passou' },
  },
  {
    id: 'feira',
    medium: 'bulletin',
    headline: 'Feira de ciências abre inscrições',
    summary: 'As turmas do 4º e do 5º ano podem inscrever projetos até sexta-feira, na secretaria.',
    imageSrc: 'cena:feira',
    imageAlt: ALT.feira,
  },
  null,
];

const comCenas = (slots: (NewspaperSlot | null)[], cenas: Cenas): (NewspaperSlot | null)[] =>
  (Array.isArray(slots) ? slots : []).map((vaga) => {
    if (!vaga || vaga.imageSrc === undefined || !vaga.imageSrc.startsWith('cena:')) return vaga;
    const cena = vaga.imageSrc.slice(5) as Cena;
    return { ...vaga, imageSrc: cenas[cena] ?? vaga.imageSrc };
  });

const meta: Meta<typeof NewspaperPage> = {
  title: 'Plataforma Unooria/Componentes/NewspaperPage',
  component: NewspaperPage,
  parameters: { layout: 'padded' },
  argTypes: {
    nameplate: { control: 'text', description: 'Nome do jornal.' },
    edition: { control: 'text', description: 'A edição.' },
    dateLine: { control: 'text', description: 'A linha de data.' },
    slots: {
      control: 'object',
      description: 'As três vagas (JSON). null = vaga vazia. imageSrc "cena:gincana|feira|horta" vira desenho.',
    },
    layout: { control: 'radio', options: [...NEWSPAPER_LAYOUTS], description: 'Layout (conjunto fechado).' },
    emptyLabels: { control: 'object', description: 'Texto das três vagas vazias.' },
    renderSlotAction: {
      control: false,
      description: 'A ação de cada vaga. No playground: “Trocar matéria” / “Escolher matéria”.',
    },
    readOnly: { control: 'boolean', description: 'Edição publicada: sem ações.' },
    size: { control: 'radio', options: ['full', 'thumbnail'], description: 'Página inteira ou miniatura.' },
    headingLevel: { control: 'radio', options: [2, 3], description: 'Nível da manchete principal.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    nameplate: 'Jornal da Escola',
    edition: '1ª edição',
    dateLine: 'Sexta-feira, 25 de setembro de 2026',
    slots: SLOTS_DO_PLAYGROUND,
    layout: 'classic',
    emptyLabels: ['Manchete principal', 'Notícia secundária A', 'Notícia secundária B'],
    renderSlotAction: acaoDaVaga(),
    readOnly: false,
    size: 'full',
    headingLevel: 2,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof NewspaperPage>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <NewspaperPageDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. Mude a largura da janela (ou
 * o `size`) para ver o layout se reorganizar pela largura da página.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do NewspaperPage',
  render: function PlaygroundRender(args) {
    const cenas = useCenas();
    // A ação segue o tema escolhido no controle (a de `args` nasce no claro).
    const acao = args.renderSlotAction ? acaoDaVaga(args.theme) : undefined;
    return (
      <div style={{ maxWidth: 720 }}>
        <NewspaperPage {...args} slots={comCenas(args.slots, cenas)} renderSlotAction={acao} />
      </div>
    );
  },
};

/**
 * Os três layouts do conjunto fechado com a MESMA edição, no aparelho de
 * 375px e em 720px. A IA escolhe entre eles; o texto não muda.
 */
export const Layouts: Story = {
  name: '🗞️ Os três layouts',
  render: function LayoutsRender() {
    const cenas = useCenas();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {NEWSPAPER_LAYOUTS.map((layout) => (
          <div key={layout} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 24 }}>
            <Moldura largura={375} rotulo={`${layout} — ${DESCRICAO_DO_LAYOUT[layout]} · 375px`}>
              <NewspaperPage {...SEGUNDA} layout={layout} slots={segundaEdicao(cenas)} readOnly />
            </Moldura>
            <Moldura largura={720} rotulo={`${layout} — ${DESCRICAO_DO_LAYOUT[layout]} · 720px`}>
              <NewspaperPage {...SEGUNDA} layout={layout} slots={segundaEdicao(cenas)} readOnly />
            </Moldura>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Montando a edição: uma vaga cheia, duas vazias, e a ação de cada uma.
 */
export const VagasVazias: Story = {
  name: '➕ Montando, com vagas vazias',
  render: function VagasVaziasRender() {
    const cenas = useCenas();
    return (
      <Moldura largura={375}>
        <NewspaperPage {...PRIMEIRA} slots={[null, feira(cenas), null]} renderSlotAction={acaoDaVaga()} />
      </Moldura>
    );
  },
};

/**
 * A revisão: a 1ª edição como foi publicada e, ao lado, com um marcador em
 * cada vaga.
 */
export const Revisao: Story = {
  name: '🔍 Revisão com marcadores',
  render: function RevisaoRender() {
    const cenas = useCenas();
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 24 }}>
        <Moldura largura={375} rotulo="Publicada · 375px">
          <NewspaperPage {...PRIMEIRA} slots={primeiraEdicao(cenas)} readOnly />
        </Moldura>
        <Moldura largura={375} rotulo="Na revisão · 375px">
          <NewspaperPage {...PRIMEIRA} slots={primeiraRevisada(cenas)} readOnly />
        </Moldura>
        <Moldura largura={720} rotulo="Na revisão · 720px">
          <NewspaperPage {...PRIMEIRA} slots={primeiraRevisada(cenas)} readOnly />
        </Moldura>
      </div>
    );
  },
};

/**
 * O comparativo do fim da missão: a 1ª e a 2ª edição em miniatura, lado a
 * lado — no aparelho e numa tela larga.
 */
export const ComparativoDeEdicoes: Story = {
  name: '↔️ Comparativo: 1ª × 2ª edição',
  render: function ComparativoRender() {
    const cenas = useCenas();
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 24 }}>
        <Moldura largura={375} rotulo="375px">
          <Comparativo cenas={cenas} />
        </Moldura>
        <Moldura largura={800} rotulo="800px">
          <Comparativo cenas={cenas} />
        </Moldura>
      </div>
    );
  },
};

/**
 * As garantias de acessibilidade, verificadas: três regiões nomeadas, a vaga
 * vazia anunciada como vazia, o marcador com texto e ícone nomeado, e a
 * edição publicada sem as ações.
 */
export const Estados: Story = {
  render: function EstadosRender() {
    const cenas = useCenas();
    const revisada = primeiraRevisada(cenas);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 375 }}>
        <NewspaperPage {...PRIMEIRA} slots={[revisada[0], revisada[1], null]} renderSlotAction={acaoDaVaga()} />
        <NewspaperPage {...SEGUNDA} slots={[horta(cenas), null, biblioteca]} renderSlotAction={acaoDaVaga()} readOnly />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const montando = tela.getByRole('article', { name: 'Jornal da Escola, 1ª edição' });
    const publicada = tela.getByRole('article', { name: 'Jornal da Escola, 2ª edição' });

    // Três vagas, cada uma uma região nomeada pela posição e pela manchete.
    const pagina = within(montando);
    const vagas = pagina.getAllByRole('region');
    await expect(vagas).toHaveLength(3);
    await expect(vagas[0]).toHaveAccessibleName('Manchete principal: Gincana da primavera é neste sábado');
    await expect(vagas[1]).toHaveAccessibleName('Notícia secundária A: Feira de ciências abre inscrições');

    // A vaga vazia é anunciada como vazia.
    await expect(vagas[2]).toHaveAccessibleName('Notícia secundária B, vaga vazia');
    await expect(within(vagas[2]).getByText('Notícia secundária B')).toBeInTheDocument();

    // A manchete principal é um título acima das secundárias.
    await expect(pagina.getByRole('heading', { level: 2 })).toHaveTextContent('Gincana da primavera é neste sábado');
    await expect(pagina.getByRole('heading', { level: 3 })).toHaveTextContent('Feira de ciências abre inscrições');

    // O marcador alert tem texto E ícone com nome — não só cor.
    const principal = within(vagas[0]);
    await expect(principal.getByText('Fato de 2018 — já passou')).toBeInTheDocument();
    const icone = principal.getByRole('img', { name: 'Atenção' });
    await expect(icone).toHaveTextContent('warning');
    await expect(within(vagas[1]).getByRole('img', { name: 'Tudo certo' })).toHaveTextContent('check_circle');

    // Montando: uma ação por vaga, com a posição no nome.
    await expect(pagina.getAllByRole('button')).toHaveLength(3);
    await expect(pagina.getByRole('button', { name: 'Escolher matéria: Notícia secundária B' })).toBeInTheDocument();

    // Publicada: renderSlotAction foi passada, e nada dela aparece.
    const edicao = within(publicada);
    await expect(edicao.getAllByRole('region')).toHaveLength(3);
    await expect(edicao.queryAllByRole('button')).toHaveLength(0);
    const vazia = edicao.getByRole('region', { name: 'Notícia secundária A, vaga vazia' });
    await expect(within(vazia).queryByText('add')).not.toBeInTheDocument();

    // A imagem tem a descrição de fato.
    await expect(edicao.getByRole('img', { name: ALT.horta })).toBeInTheDocument();
  },
};
