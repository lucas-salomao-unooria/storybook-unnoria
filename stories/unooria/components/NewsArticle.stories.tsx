import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import { NewsArticle } from '../../../src/unooria/components/NewsArticle';
import type { NewsArticleMedium } from '../../../src/unooria/components/NewsCard';
import '../../../src/unooria/tokens/icons.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/* ---------------------------------------------------------------------------
   Imagens de demonstração — desenhadas na hora, com as cores lidas dos tokens
   do :root. Nenhum arquivo entra no repositório, nenhuma cor avulsa entra no
   código, e o teste não depende de rede.
   ------------------------------------------------------------------------- */

const token = (nome: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(nome).trim() || 'currentColor';

type Cena = 'praca' | 'biblioteca';

const ALT_PRACA = 'Desenho de uma praça com gramado, uma árvore, um canteiro e o sol';
const ALT_BIBLIOTECA = 'Desenho de uma estante cheia de livros coloridos';

const desenharCena = (cena: Cena): string => {
  let corpo: string;
  if (cena === 'praca') {
    corpo = [
      `<rect width="320" height="180" fill="${token('--unooria-color-brandnavy-200')}"/>`,
      `<circle cx="258" cy="46" r="22" fill="${token('--unooria-color-brandorange-300')}"/>`,
      `<ellipse cx="80" cy="190" rx="170" ry="70" fill="${token('--unooria-color-success-400')}"/>`,
      `<ellipse cx="260" cy="200" rx="160" ry="80" fill="${token('--unooria-color-success-500')}"/>`,
      `<rect x="120" y="92" width="14" height="44" fill="${token('--unooria-color-brandorange-800')}"/>`,
      `<circle cx="127" cy="84" r="26" fill="${token('--unooria-color-success-700')}"/>`,
      `<rect x="190" y="116" width="84" height="30" rx="4" fill="${token('--unooria-color-brandorange-200')}"/>`,
    ].join('');
  } else {
    const cores = [
      '--unooria-color-brandnavy-600',
      '--unooria-color-brandpurple-600',
      '--unooria-color-brandorange-400',
      '--unooria-color-success-500',
      '--unooria-color-info-400',
      '--unooria-color-neutral-300',
    ].map(token);
    const livros: string[] = [];
    [38, 74, 110].forEach((y, fileira) => {
      let x = 50;
      let i = fileira;
      while (x < 262) {
        const largura = 12 + ((i * 5) % 8);
        livros.push(`<rect x="${x}" y="${y}" width="${largura}" height="28" rx="2" fill="${cores[i % cores.length]}"/>`);
        x += largura + 3;
        i += 1;
      }
    });
    corpo = [
      `<rect width="320" height="180" fill="${token('--unooria-color-brandorange-100')}"/>`,
      `<rect y="150" width="320" height="30" fill="${token('--unooria-color-brandorange-300')}"/>`,
      `<rect x="40" y="30" width="240" height="116" rx="4" fill="${token('--unooria-color-brandorange-800')}"/>`,
      ...livros,
    ].join('');
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180">${corpo}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const useCena = (cena: Cena) => useMemo(() => desenharCena(cena), [cena]);

/** Um endereço que o navegador não consegue decodificar — a imagem quebrada. */
const IMAGEM_QUEBRADA = 'data:image/png;base64,AAAA';

const MEIOS: NewsArticleMedium[] = ['newspaper', 'radio', 'tv', 'blog', 'portal', 'bulletin'];

const LEGENDA_TV = 'Praça do bairro ganha horta comunitária';

/* ---------------------------------------------------------------------------
   As seis matérias de demonstração — conteúdo neutro, sem pessoas reais.
   ------------------------------------------------------------------------- */

type Materia = {
  masthead: string;
  headline: string;
  corpo: string[];
  caption?: string;
  speaker?: string;
};

const MATERIAS: Record<NewsArticleMedium, Materia> = {
  newspaper: {
    masthead: 'Folha do Bairro',
    headline: 'Feira de ciências abre inscrições na biblioteca',
    caption: 'A estante de livros de experimentos, na biblioteca da escola.',
    corpo: [
      'As inscrições para a feira de ciências da escola estão abertas até sexta-feira. Podem participar turmas do 4º ao 9º ano, com projetos individuais ou em grupo.',
      'A biblioteca vai emprestar lupas, ímãs, balanças e livros de experimentos. Quem precisar de ajuda para escolher um tema pode conversar com a bibliotecária no intervalo.',
      'A apresentação será no pátio, na manhã de sábado. As famílias estão convidadas a visitar os estandes e conversar com os estudantes sobre o que eles descobriram.',
    ],
  },
  radio: {
    masthead: 'Rádio Comunitária 98,5',
    headline: 'Gincana do bairro reúne 300 famílias',
    speaker: 'Locutor',
    corpo: [
      'Bom dia, ouvintes! Neste fim de semana, cerca de 300 famílias participaram da gincana do bairro, na praça da igreja.',
      'Teve corrida de saco, caça ao tesouro e uma arrecadação de livros. Os organizadores contaram que os livros vão para a nova sala de leitura do centro comunitário.',
    ],
  },
  tv: {
    masthead: 'TV Cidade — Jornal do Meio-Dia',
    headline: 'Moradores plantam horta na praça do bairro',
    caption: LEGENDA_TV,
    corpo: [
      'Apresentadora: A praça do bairro amanheceu diferente hoje. Moradores se juntaram para plantar alface, cenoura e temperos.',
      'Repórter: Qualquer pessoa pode ajudar a regar nas manhãs de sábado. A colheita vai ser dividida entre as famílias que participarem.',
    ],
  },
  blog: {
    masthead: 'Blog da Cantina',
    headline: 'Receita de bolo de cenoura faz sucesso na cantina',
    corpo: [
      'Todo mundo pergunta qual é o segredo do bolo de cenoura da cantina. Hoje eu conto a receita inteira, do jeitinho que faço toda quinta-feira.',
      'Você vai precisar de três cenouras médias, três ovos, uma xícara de óleo, duas xícaras de açúcar e duas xícaras de farinha de trigo.',
      'Peça ajuda a um adulto para bater tudo no liquidificador e para usar o forno. Depois é só esperar esfriar e dividir com quem você gosta!',
    ],
  },
  portal: {
    masthead: 'Portal Notícias da Cidade',
    headline: 'Biblioteca municipal amplia horário aos sábados',
    caption: 'A praça em frente à biblioteca, onde acontece a contação de histórias.',
    corpo: [
      'A biblioteca municipal vai abrir das 9h às 17h aos sábados a partir do mês que vem. Antes, o atendimento terminava ao meio-dia.',
      'Segundo a prefeitura, a mudança atende a um pedido de famílias que trabalham durante a semana. Haverá contação de histórias às 10h e empréstimo de jogos de tabuleiro.',
    ],
  },
  bulletin: {
    masthead: 'Secretaria da escola',
    headline: 'Campanha do agasalho recebe doações até dia 30',
    corpo: [
      'Casacos, cobertores e meias em bom estado podem ser deixados na caixa da entrada, das 7h às 17h.',
      'Tudo será entregue a famílias do bairro antes do inverno. Obrigado a quem puder ajudar!',
    ],
  },
};

const Paragrafos: React.FC<{ textos: string[] }> = ({ textos }) => (
  <>
    {textos.map((t) => (
      <p key={t}>{t}</p>
    ))}
  </>
);

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

const Grade: React.FC<{ children: React.ReactNode; minimo?: number }> = ({ children, minimo = 220 }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${minimo}px, 1fr))`,
      gap: 'var(--unooria-spacing-s)',
      alignItems: 'start',
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
        padding: 'var(--unooria-spacing-m)',
        borderRadius: 12,
        background: escuro ? 'var(--unooria-color-neutraldark-100)' : 'var(--unooria-color-neutral-100)',
      }}
    >
      {children}
    </div>
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

/** Uma matéria de demonstração pronta, por meio. */
const Demonstracao: React.FC<{
  medium: NewsArticleMedium;
  theme?: 'light' | 'dark';
  imagens: Record<Cena, string>;
}> = ({ medium, theme = 'light', imagens }) => {
  const m = MATERIAS[medium];
  // Rádio, telejornal, blog e mural sem imagem: o telejornal mostra o desenho,
  // os outros três simplesmente não têm quadro.
  const comImagem: Partial<Record<NewsArticleMedium, { src: string; alt: string }>> = {
    newspaper: { src: imagens.biblioteca, alt: ALT_BIBLIOTECA },
    portal: { src: imagens.praca, alt: ALT_PRACA },
  };
  const imagem = comImagem[medium];
  return (
    <NewsArticle
      medium={medium}
      theme={theme}
      masthead={m.masthead}
      headline={m.headline}
      caption={m.caption}
      speaker={m.speaker}
      imageSrc={imagem?.src}
      imageAlt={imagem?.alt}
    >
      <Paragrafos textos={m.corpo} />
    </NewsArticle>
  );
};

/**
 * Página de documentação rica do componente NewsArticle.
 */
const NewsArticleDocumentationPage: React.FC = () => {
  const praca = useCena('praca');
  const biblioteca = useCena('biblioteca');
  const imagens = { praca, biblioteca };
  const [tema, setTema] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Jornal"
        title="NewsArticle"
        description="A matéria no formato do meio de origem — o recorte de jornal, o boletim de rádio transcrito, o quadro do telejornal, o post de blog, a matéria de portal ou o aviso do mural —, para a gaveta que o NewsCard abre. Cada meio se reconhece pela forma, feita só com tokens e com a fonte da seção."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="A criança toca num cartão da mesa e a gaveta mostra a notícia como ela é no meio de origem."
      />
      <Grade>
        <Cartao icone="📰" titulo="Seis meios, seis formas">
          Recorte com cantos cortados, selo “No ar”, tarja sobre o quadro, post com espaçamento de
          leitura, barra do portal e alfinete do mural. A forma diz o meio antes de qualquer leitura.
        </Cartao>
        <Cartao icone="📻" titulo="Rádio sem som">
          O boletim chega transcrito, com quem fala como rótulo. A atividade não depende de som: sala
          barulhenta, fone que falta, criança surda.
        </Cartao>
        <Cartao icone="🔍" titulo="A fonte é pista">
          <code>masthead</code> é opcional de propósito: a fonte é uma pista que a criança revela à parte.
          Sem ela, fica só a decoração do meio — o fio duplo do jornal, a barra do portal.
        </Cartao>
        <Cartao icone="🧩" titulo="Sem rede social nem mensagem">
          Só <code>NewsArticleMedium</code>. O post original se desenha com o <code>PostCard</code> do
          Instanooria e a mensagem com o <code>MessageBubble</code> do WhatsApp Mobile — cada peça na seção
          da plataforma que ela imita.
        </Cartao>
        <Cartao icone="🖼️" titulo="Nunca um buraco">
          No telejornal e no portal, sem imagem (ou com imagem quebrada) aparece o desenho pelo meio. Nos
          outros meios a imagem é opcional e simplesmente não aparece.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Design próprio: a seção não tem quadro de notícia no Figma."
      />
      <Grade>
        <Cartao icone="📐" titulo="Design próprio">
          Não há quadro de notícia no arquivo da seção. A folha segue o <code>Card</code> (fio de 1px, raio
          de 12px); o selo “No ar” tem a altura da <code>Tag</code> <code>md</code> (28px); a escala de texto
          é a da seção.
        </Cartao>
        <Cartao icone="📏" titulo="Medidas">
          Recuo de 24px (16px abaixo de 480px) e 16px entre as zonas. Quadro 16:9 com raio de 8px. Manchete
          24/34px bold — no jornal, 34/48px. Corpo 16/24px (no blog, 16/28px, até 65 caracteres por linha;
          no rádio, 18/28px). Tarja 16/24px semibold. Jornal em duas colunas de 240px quando cabem.
        </Cartao>
        <Cartao icone="🔤" titulo="Sem serifa, de propósito">
          A seção não tem token de fonte serifada. O jornal se reconhece pelo recorte, pela caixa alta do
          cabeçalho com fio duplo e pelas colunas — uma serifa inventada seria uma fonte avulsa, como uma
          cor avulsa.
        </Cartao>
        <Cartao icone="🎨" titulo="Contraste">
          Tarja em <code>brandpurple-950</code> com texto branco (cerca de 19,6:1), fundo SÓLIDO: não depende
          da foto. Selo “No ar” em <code>brandorange-700</code> com branco (5,6:1). Barra do portal em{' '}
          <code>brandnavy-900</code> com branco (8,2:1). Nenhuma cor sugere se a notícia é verdadeira.
        </Cartao>
        <Cartao icone="🔣" titulo="Glifos — todos do quadro, sem desvio">
          O ícone de cada meio vem de <code>NEWS_MEDIUM_ICONS</code>: <code>newspaper</code>, <code>mic</code>{' '}
          (o selo “No ar”), <code>connected_tv</code> (telejornal), <code>article</code> (blog),{' '}
          <code>public</code> (barra do portal) e <code>keep</code> (o alfinete do mural). Todos estão no quadro
          de ícones da seção (<code>6024:2923</code>), pelo nome da ligadura — não há desvio de glifo.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Uma <article> nomeada “Matéria original — <meio>”, com a folha e as zonas do meio."
      />
      <Grade minimo={300}>
        <Palco rotulo="Portal de notícias, com todas as zonas">
          <Demonstracao medium="portal" imagens={imagens} />
        </Palco>
        <Cartao icone="🧩" titulo="Zonas">
          <ol style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              <strong>Folha</strong> (<code>__sheet</code>) — a superfície do meio: papel, cartão, aviso.
            </li>
            <li>
              <strong>Cabeçalho do veículo</strong> — <code>__masthead</code>, <code>__bar</code> (portal) ou{' '}
              <code>__on-air-bar</code> (rádio). O texto só aparece com <code>masthead</code>.
            </li>
            <li>
              <strong>Manchete</strong> (<code>__headline</code>) — <code>h3</code> por padrão (
              <code>headingLevel</code>).
            </li>
            <li>
              <strong>Quadro 16:9</strong> (<code>__frame</code>) — imagem ou desenho, com a legenda (
              <code>__caption</code>).
            </li>
            <li>
              <strong>Corpo</strong> (<code>__body</code>) — no rádio, a fala em citação (
              <code>__quote</code>) com quem fala (<code>__speaker</code>).
            </li>
          </ol>
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="4. Matriz dos 6 Meios e Estados"
        description="Os seis meios de NewsArticleMedium, e o que acontece sem imagem e sem veículo."
      />
      <Grade minimo={320}>
        {MEIOS.map((meio) => (
          <Palco key={meio} rotulo={`medium="${meio}"`}>
            <Demonstracao medium={meio} imagens={imagens} />
          </Palco>
        ))}
      </Grade>
      <Grade minimo={320}>
        <Palco rotulo="Portal com imagem quebrada — cai no desenho">
          <NewsArticle
            medium="portal"
            masthead={MATERIAS.portal.masthead}
            headline={MATERIAS.portal.headline}
            imageSrc={IMAGEM_QUEBRADA}
            imageAlt="Foto da biblioteca"
          >
            <Paragrafos textos={MATERIAS.portal.corpo.slice(0, 1)} />
          </NewsArticle>
        </Palco>
        <Palco rotulo="Sem masthead — jornal fica com o fio duplo, portal com a barra sem texto">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <NewsArticle medium="newspaper" headline={MATERIAS.newspaper.headline}>
              <Paragrafos textos={MATERIAS.newspaper.corpo.slice(0, 1)} />
            </NewsArticle>
            <NewsArticle medium="portal" headline={MATERIAS.portal.headline}>
              <Paragrafos textos={MATERIAS.portal.corpo.slice(0, 1)} />
            </NewsArticle>
          </div>
        </Palco>
      </Grade>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da matéria na gaveta." />
      <Praticas
        fazer={[
          'Manter headingLevel={3} (o padrão) quando a gaveta tiver título próprio; 2 quando a manchete for o título dela.',
          'Dar imageAlt sempre que houver imageSrc.',
          'Omitir masthead enquanto a fonte for uma pista a revelar.',
          'Transcrever o boletim de rádio e o telejornal inteiros no children.',
          'Usar o PostCard do Instanooria e o MessageBubble do WhatsApp Mobile para rede social e mensagem.',
        ]}
        evitar={[
          'Tocar áudio ou vídeo: a atividade não depende de som.',
          'Pôr curtidas, visualizações ou comentários na matéria.',
          'Imitar fonte serifada com imagem de texto.',
          'Passar caption num meio sem quadro de imagem — ela não aparece.',
          'Colorir a matéria pela veracidade da notícia.',
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--unooria-spacing-m)',
            alignItems: 'start',
          }}
        >
          {MEIOS.map((meio) => (
            <Demonstracao key={meio} medium={meio} theme={tema} imagens={imagens} />
          ))}
        </div>
      </Palco>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente NewsArticle. Estende os atributos de <article>, menos title."
      />
      <TabelaDeProps
        linhas={[
          { nome: 'medium', tipo: 'NewsArticleMedium', descricao: "O meio de origem ('newspaper' | 'radio' | 'tv' | 'blog' | 'portal' | 'bulletin'). Obrigatório." },
          { nome: 'headline', tipo: 'React.ReactNode', descricao: 'A manchete, como título. Obrigatório.' },
          { nome: 'children', tipo: 'React.ReactNode', descricao: 'O corpo: texto, fala transcrita (rádio) ou transcrição (telejornal). Obrigatório.' },
          { nome: 'masthead', tipo: 'React.ReactNode', descricao: 'Nome do veículo. Opcional: a fonte é pista revelada à parte.' },
          { nome: 'imageSrc', tipo: 'string', descricao: 'Imagem 16:9. No telejornal e no portal, sem ela aparece o desenho.' },
          { nome: 'imageAlt', tipo: 'string', descricao: 'Texto alternativo — obrigatório de fato quando há imageSrc.' },
          { nome: 'caption', tipo: 'React.ReactNode', descricao: 'Legenda; no telejornal, a tarja sobre o quadro. Só aparece com o quadro.' },
          { nome: 'speaker', tipo: 'React.ReactNode', descricao: 'Quem fala, no rádio (ex.: "Locutor").' },
          { nome: 'headingLevel', tipo: '2 | 3 | 4', padrao: '3', descricao: 'Nível do título da manchete.' },
          { nome: 'onAirLabel', tipo: 'string', padrao: "'No ar'", descricao: 'Selo do boletim de rádio.' },
          { nome: 'transcriptLabel', tipo: 'string', padrao: "'Transcrição'", descricao: 'Rótulo sobre o corpo no telejornal.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
          { nome: 'className', tipo: 'string', descricao: 'Classe CSS adicional.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

type PlaygroundArgs = React.ComponentProps<typeof NewsArticle>;

const meta: Meta<typeof NewsArticle> = {
  title: 'Plataforma Unooria/Componentes/NewsArticle',
  component: NewsArticle,
  parameters: { layout: 'padded' },
  argTypes: {
    medium: { control: 'select', options: MEIOS, description: 'O meio de origem.' },
    headline: { control: 'text', description: 'A manchete.' },
    children: { control: 'text', description: 'O corpo da matéria.' },
    masthead: { control: 'text', description: 'Nome do veículo (opcional).' },
    imageSrc: { control: 'text', description: 'Endereço da imagem. Vazio no telejornal e no portal mostra o desenho.' },
    imageAlt: { control: 'text', description: 'Texto alternativo da imagem.' },
    caption: { control: 'text', description: 'Legenda; tarja no telejornal.' },
    speaker: { control: 'text', description: 'Quem fala, no rádio.' },
    headingLevel: { control: 'radio', options: [2, 3, 4], description: 'Nível do título.' },
    onAirLabel: { control: 'text', description: 'Selo do rádio.' },
    transcriptLabel: { control: 'text', description: 'Rótulo da transcrição no telejornal.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    medium: 'tv',
    headline: MATERIAS.tv.headline,
    children: MATERIAS.tv.corpo.join(' '),
    masthead: MATERIAS.tv.masthead,
    imageSrc: '',
    imageAlt: '',
    caption: MATERIAS.tv.caption,
    speaker: 'Locutor',
    headingLevel: 3,
    onAirLabel: 'No ar',
    transcriptLabel: 'Transcrição',
    theme: 'light',
  } satisfies Partial<PlaygroundArgs>,
};

export default meta;

type Story = StoryObj<typeof NewsArticle>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <NewsArticleDocumentationPage />,
};

/**
 * Playground com todas as propriedades do NewsArticle expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do NewsArticle',
  render: ({ children, ...args }) => (
    <div style={{ maxWidth: 640 }}>
      <NewsArticle {...args} imageSrc={args.imageSrc || undefined} imageAlt={args.imageAlt || undefined}>
        <p>{children}</p>
      </NewsArticle>
    </div>
  ),
};

/**
 * Os seis meios, como a gaveta do Jornal da Escola os mostra.
 */
export const TodosOsMeios: Story = {
  name: '🎨 Os 6 meios',
  render: function TodosRender() {
    const praca = useCena('praca');
    const biblioteca = useCena('biblioteca');
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {MEIOS.map((meio) => (
          <Demonstracao key={meio} medium={meio} imagens={{ praca, biblioteca }} />
        ))}
      </div>
    );
  },
};

/**
 * Imagem quebrada no portal, telejornal sem imagem com a tarja, rádio com quem
 * fala e jornal sem o nome do veículo.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 640 }}>
      <NewsArticle
        medium="portal"
        masthead={MATERIAS.portal.masthead}
        headline={MATERIAS.portal.headline}
        imageSrc={IMAGEM_QUEBRADA}
        imageAlt="Foto da biblioteca"
      >
        <Paragrafos textos={MATERIAS.portal.corpo.slice(0, 1)} />
      </NewsArticle>
      <NewsArticle medium="tv" headline={MATERIAS.tv.headline} caption={LEGENDA_TV}>
        <Paragrafos textos={MATERIAS.tv.corpo} />
      </NewsArticle>
      <NewsArticle medium="radio" headline={MATERIAS.radio.headline} speaker="Locutor">
        <Paragrafos textos={MATERIAS.radio.corpo} />
      </NewsArticle>
      <NewsArticle medium="newspaper" headline={MATERIAS.newspaper.headline}>
        <Paragrafos textos={MATERIAS.newspaper.corpo.slice(0, 1)} />
      </NewsArticle>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    // Telejornal: a matéria se nomeia pelo meio, a tarja aparece sobre o desenho.
    const tv = tela.getByRole('article', { name: 'Matéria original — Telejornal' });
    await expect(within(tv).getByText(LEGENDA_TV)).toBeVisible();
    await expect(tv.querySelector('.unooria-news-article__media--illustration')).not.toBeNull();
    await expect(within(tv).getByRole('heading', { level: 3 })).toHaveTextContent(MATERIAS.tv.headline);
    await expect(within(tv).getByText('Transcrição')).toBeVisible();

    // Rádio: transcrito, com quem fala — e nenhum áudio.
    const radio = tela.getByRole('article', { name: 'Matéria original — Rádio' });
    await expect(within(radio).getByText('No ar')).toBeVisible();
    await expect(within(radio).getByText('Locutor')).toBeVisible();
    await expect(radio.querySelector('blockquote')).toHaveTextContent('300 famílias');
    await expect(radio.querySelector('audio')).toBeNull();

    // Portal com imagem quebrada: cai no desenho, nunca um buraco.
    const portal = tela.getByRole('article', { name: 'Matéria original — Portal de notícias' });
    await waitFor(
      () => expect(portal.querySelector('.unooria-news-article__media--illustration')).not.toBeNull(),
      { timeout: 4000 }
    );
    await expect(portal.querySelector('img')).toBeNull();

    // Jornal sem masthead: o fio duplo fica, sem texto que entregue a fonte.
    const jornal = tela.getByRole('article', { name: 'Matéria original — Jornal impresso' });
    await expect(jornal.querySelector('.unooria-news-article__masthead--empty')).not.toBeNull();
  },
};
