import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import { NewsCard, NEWS_MEDIUMS, NEWS_MEDIUM_LABELS } from '../../../src/unooria/components/NewsCard';
import type { NewsMedium } from '../../../src/unooria/components/NewsCard';
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

/* ---------------------------------------------------------------------------
   As 8 notícias da mesa — uma por meio, conteúdo neutro de demonstração.
   ------------------------------------------------------------------------- */

const NOTICIAS: Record<NewsMedium, { headline: string; summary: string }> = {
  newspaper: {
    headline: 'Feira de ciências abre inscrições na biblioteca',
    summary:
      'Estudantes do 4º ao 9º ano podem inscrever projetos até sexta-feira. A biblioteca empresta materiais, e cada turma apresenta seu experimento no pátio durante a manhã de sábado.',
  },
  radio: {
    headline: 'Gincana do bairro reúne 300 famílias',
    summary:
      'A rádio comunitária contou que a gincana do fim de semana teve corrida de saco, caça ao tesouro e uma arrecadação de livros para a nova sala de leitura.',
  },
  tv: {
    headline: 'Praça do bairro ganha horta comunitária',
    summary:
      'O telejornal da cidade mostrou moradores plantando alface, cenoura e temperos. Qualquer pessoa pode ajudar a regar nas manhãs de sábado, e a colheita será dividida entre as famílias.',
  },
  blog: {
    headline: 'Receita de bolo de cenoura faz sucesso na cantina',
    summary:
      'Uma merendeira escreveu no blog da escola como prepara o bolo favorito dos estudantes. O texto traz a receita inteira e dicas para fazer em casa com um adulto.',
  },
  portal: {
    headline: 'Biblioteca municipal amplia horário aos sábados',
    summary:
      'O portal de notícias da cidade informou que a biblioteca vai abrir das 9h às 17h aos sábados. Haverá contação de histórias para crianças e empréstimo de jogos de tabuleiro.',
  },
  social: {
    headline: 'Post anuncia show de talentos no ginásio da escola',
    summary:
      'Uma publicação com muitas fotos convida as famílias para o show de talentos. O texto não diz a data nem quem organiza, só pede para compartilhar com todo mundo.',
  },
  message: {
    headline: 'Mensagem diz que não haverá aula na segunda-feira',
    summary:
      'Um texto encaminhado muitas vezes afirma que a escola vai fechar na segunda. A mensagem não tem assinatura e pede que cada pessoa envie para mais dez contatos.',
  },
  bulletin: {
    headline: 'Campanha do agasalho recebe doações até dia 30',
    summary:
      'A secretaria avisa que casacos, cobertores e meias em bom estado podem ser deixados na caixa da entrada. Tudo será entregue a famílias do bairro antes do inverno.',
  },
};

/** A grade da mesa é do consumidor: o cartão ocupa a largura da célula. */
const MESA: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: 'var(--unooria-spacing-s)',
  alignItems: 'stretch',
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

/**
 * Página de documentação rica do componente NewsCard.
 */
const NewsCardDocumentationPage: React.FC = () => {
  const praca = useCena('praca');
  const biblioteca = useCena('biblioteca');
  const [tema, setTema] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Jornal"
        title="NewsCard"
        description="O cartão compacto de uma notícia na mesa da redação: a faixa do meio, a imagem 16:9 (ou o desenho do meio, quando não há imagem), a manchete e o resumo. O cartão inteiro é um botão que abre a matéria original numa gaveta. Nasceu para o Jornal da Escola do 4º ano e serve a qualquer tela que mostre notícia de mais de um meio."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="A mesa da redação: 8 notícias de meios diferentes, e a criança escolhe quais vão para a capa."
      />
      <Grade>
        <Cartao icone="👆" titulo="O cartão inteiro é o botão">
          Uma ação só — abrir a matéria. O alvo é o cartão todo, com foco visível de 2px, e{' '}
          <code>aria-haspopup=&quot;dialog&quot;</code> avisa que ele abre uma gaveta. Nada de “ler mais”
          pequeno dentro de um alvo grande.
        </Cartao>
        <Cartao icone="🧭" titulo="Oito meios, um vocabulário">
          <code>medium</code> escolhe o ícone e o rótulo em <code>NEWS_MEDIUM_ICONS</code> e{' '}
          <code>NEWS_MEDIUM_LABELS</code> — o mesmo vocabulário do <code>NewsArticle</code>.
        </Cartao>
        <Cartao icone="🖼️" titulo="Sem imagem, nunca um buraco">
          Sem <code>imageSrc</code>, ou se a imagem falhar ao carregar, a área 16:9 mostra o desenho pelo
          meio: o ícone do meio, grande, sobre fundo suave.
        </Cartao>
        <Cartao icone="✅" titulo="Na capa, sem alternância">
          <code>onFrontPage</code> mostra o selo e a borda de destaque, e o leitor de tela ouve “…, na
          capa”. Não é <code>aria-pressed</code>: tocar abre a gaveta, não tira da capa.
        </Cartao>
        <Cartao icone="🚫" titulo="Nada de vaidade">
          Sem curtidas, seguidores ou compartilhamentos — nem no meio <code>social</code>. Número de
          curtida vira pista falsa de confiabilidade.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Design próprio: a seção não tem quadro de notícia no Figma."
      />
      <Grade>
        <Cartao icone="📐" titulo="Design próprio">
          Não há quadro de notícia no arquivo da seção. As medidas vêm de peças que já existem no pacote:
          o <code>Card</code> (cartão), a <code>Tag</code> <code>md</code> (faixa do meio e selo) e o{' '}
          <code>Button</code> primário (foco).
        </Cartao>
        <Cartao icone="📏" titulo="Medidas">
          Cartão: fio de 1px, raio de 12px, recuo de 16px e 12px entre as zonas. Faixa do meio e selo:
          28px de altura, recuo de 4px/8px, raio de 8px, texto de 14/20px; o selo fica a 8px do canto da
          área 16:9 (raio de 8px), onde não quebra linha nem desalinha a grade.
          Manchete 18/28px semibold; resumo 16/24px. Foco: contorno de 2px, afastado 2px.
        </Cartao>
        <Cartao icone="🎨" titulo="Cores">
          O desenho de todos os meios usa um só tom (<code>brandnavy-100</code>, ícone em{' '}
          <code>brandnavy-800</code>): cor por meio seria lida como pista de confiabilidade. Na capa, borda{' '}
          <code>brandnavy-700</code> com anel de 1px — 2px no total, sem empurrar a grade — e selo em{' '}
          <code>brandnavy-900</code> com texto branco (8,2:1), fundo sólido sobre a imagem.
        </Cartao>
        <Cartao icone="🔣" titulo="Glifos — todos do quadro, sem desvio">
          Os oito meios vêm de <code>NEWS_MEDIUM_ICONS</code>: <code>newspaper</code>, <code>mic</code>{' '}
          (rádio), <code>connected_tv</code> (telejornal), <code>article</code> (blog), <code>public</code>{' '}
          (portal), <code>photo_camera</code> (rede social), <code>forward_to_inbox</code> (mensagem) e{' '}
          <code>keep</code> (o alfinete do mural). O selo usa <code>check_circle</code>. Todos estão no quadro
          de ícones da seção (<code>6024:2923</code>), pelo nome da ligadura do Material Symbols Rounded — não
          há desvio de glifo.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Cinco zonas, de cima para baixo. Tudo é <span>: dentro de um botão só cabem elementos de frase."
      />
      <Grade>
        <Palco rotulo="Na capa, com imagem">
          <NewsCard
            medium="newspaper"
            headline={NOTICIAS.newspaper.headline}
            summary={NOTICIAS.newspaper.summary}
            imageSrc={praca}
            imageAlt={ALT_PRACA}
            onFrontPage
          />
        </Palco>
        <Cartao icone="🧩" titulo="Zonas">
          <ol style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              <strong>Faixa do meio</strong> (<code>__band</code>) — ícone e rótulo, com a medida da{' '}
              <code>Tag</code>; não é clicável.
            </li>
            <li>
              <strong>Selo “Na capa”</strong> (<code>__front-page</code>) — só com <code>onFrontPage</code>, no
              canto da área 16:9, com fundo sólido.
            </li>
            <li>
              <strong>Área 16:9</strong> (<code>__media</code>) — a imagem, ou o desenho (
              <code>__media--illustration</code>).
            </li>
            <li>
              <strong>Manchete</strong> (<code>__headline</code>) — nomeia o botão.
            </li>
            <li>
              <strong>Resumo</strong> (<code>__summary</code>) — vai para a descrição acessível, depois do
              meio.
            </li>
          </ol>
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="4. Matriz dos 8 Meios e Estados"
        description="Os oito meios de NewsMedium, sem imagem (o desenho de cada um), e os estados do cartão."
      />
      <Palco rotulo="Os 8 meios — sem imagem, cada um mostra o próprio desenho">
        <div style={MESA}>
          {NEWS_MEDIUMS.map((meio) => (
            <NewsCard key={meio} medium={meio} headline={NOTICIAS[meio].headline} summary={NOTICIAS[meio].summary} />
          ))}
        </div>
      </Palco>
      <Palco rotulo="Estados: com imagem, imagem quebrada (cai no desenho), na capa e desabilitado">
        <div style={MESA}>
          <NewsCard
            medium="portal"
            headline={NOTICIAS.portal.headline}
            summary={NOTICIAS.portal.summary}
            imageSrc={biblioteca}
            imageAlt={ALT_BIBLIOTECA}
          />
          <NewsCard
            medium="portal"
            headline="Imagem que não carrega"
            summary="O endereço da imagem está quebrado: o cartão mostra o desenho do meio no lugar do ícone de imagem quebrada do navegador."
            imageSrc={IMAGEM_QUEBRADA}
            imageAlt="Foto da biblioteca"
          />
          <NewsCard
            medium="bulletin"
            headline={NOTICIAS.bulletin.headline}
            summary={NOTICIAS.bulletin.summary}
            onFrontPage
          />
          <NewsCard medium="message" headline={NOTICIAS.message.headline} summary={NOTICIAS.message.summary} disabled />
        </div>
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso do cartão na mesa." />
      <Praticas
        fazer={[
          'Escrever o resumo com 25 a 35 palavras — cabe em 3 ou 4 linhas, sem corte.',
          'Dar imageAlt sempre que houver imageSrc: ele entra na descrição do botão.',
          'Montar a grade da mesa no consumidor (ex.: repeat(auto-fill, minmax(240px, 1fr))).',
          'Abrir o NewsArticle na gaveta que o cartão aciona.',
          'Pôr e tirar da capa com outro controle, fora do cartão.',
        ]}
        evitar={[
          'Mostrar curtidas, seguidores ou compartilhamentos.',
          'Cortar manchete ou resumo com reticências ou line-clamp.',
          'Pôr botão ou link dentro do cartão — ele já é um botão.',
          'Usar aria-pressed, ou o próprio toque, para alternar a capa.',
          'Colorir o cartão pelo meio, ou pela veracidade da notícia.',
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
        <div style={MESA}>
          <NewsCard
            theme={tema}
            medium="newspaper"
            headline={NOTICIAS.newspaper.headline}
            summary={NOTICIAS.newspaper.summary}
            imageSrc={praca}
            imageAlt={ALT_PRACA}
          />
          <NewsCard theme={tema} medium="radio" headline={NOTICIAS.radio.headline} summary={NOTICIAS.radio.summary} />
          <NewsCard
            theme={tema}
            medium="bulletin"
            headline={NOTICIAS.bulletin.headline}
            summary={NOTICIAS.bulletin.summary}
            onFrontPage
          />
        </div>
      </Palco>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente NewsCard. Estende os atributos de <button>, menos title, type e children."
      />
      <TabelaDeProps
        linhas={[
          { nome: 'medium', tipo: 'NewsMedium', descricao: 'O meio da notícia: ícone, rótulo e desenho. Obrigatório.' },
          { nome: 'headline', tipo: 'React.ReactNode', descricao: 'A manchete; nomeia o botão. Obrigatório.' },
          { nome: 'summary', tipo: 'React.ReactNode', descricao: 'Resumo de 25 a 35 palavras; entra na descrição acessível.' },
          { nome: 'imageSrc', tipo: 'string', descricao: 'Imagem 16:9. Ausente ou quebrada, aparece o desenho pelo meio.' },
          { nome: 'imageAlt', tipo: 'string', descricao: 'Texto alternativo — obrigatório de fato quando há imageSrc.' },
          { nome: 'onFrontPage', tipo: 'boolean', padrao: 'false', descricao: 'Já está na capa: selo, borda e “, na capa” no nome.' },
          { nome: 'frontPageLabel', tipo: 'string', padrao: "'Na capa'", descricao: 'Texto do selo e do sufixo do nome.' },
          { nome: 'mediumLabel', tipo: 'string', descricao: 'Sobrescreve o rótulo do meio (padrão: NEWS_MEDIUM_LABELS).' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
          { nome: 'className', tipo: 'string', descricao: 'Classe CSS adicional.' },
          { nome: '...button', tipo: 'ButtonHTMLAttributes', descricao: 'onClick, disabled, aria-* e demais atributos de <button>.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof NewsCard> = {
  title: 'Plataforma Unooria/Componentes/NewsCard',
  component: NewsCard,
  parameters: { layout: 'padded' },
  argTypes: {
    medium: { control: 'select', options: NEWS_MEDIUMS, description: 'O meio da notícia.' },
    headline: { control: 'text', description: 'A manchete.' },
    summary: { control: 'text', description: 'Resumo de 25 a 35 palavras.' },
    imageSrc: {
      control: 'text',
      description: 'Endereço da imagem. Vazio mostra o desenho pelo meio; um endereço quebrado também.',
    },
    imageAlt: { control: 'text', description: 'Texto alternativo da imagem.' },
    onFrontPage: { control: 'boolean', description: 'A notícia já está na capa.' },
    frontPageLabel: { control: 'text', description: 'Texto do selo da capa.' },
    mediumLabel: { control: 'text', description: 'Sobrescreve o rótulo do meio.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    disabled: { control: 'boolean', description: 'Atributo nativo de <button>.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
    onClick: { action: 'onClick' },
  },
  args: {
    medium: 'newspaper',
    headline: NOTICIAS.newspaper.headline,
    summary: NOTICIAS.newspaper.summary,
    imageSrc: '',
    imageAlt: '',
    onFrontPage: false,
    frontPageLabel: 'Na capa',
    theme: 'light',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof NewsCard>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <NewsCardDocumentationPage />,
};

/**
 * Playground com todas as propriedades do NewsCard expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do NewsCard',
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <NewsCard {...args} imageSrc={args.imageSrc || undefined} imageAlt={args.imageAlt || undefined} />
    </div>
  ),
};

/**
 * A mesa da redação do Jornal da Escola: as 8 notícias numa grade responsiva
 * (a grade é do consumidor), três já na capa. Tocar num cartão diz qual
 * gaveta abriria.
 */
export const MesaDaRedacao: Story = {
  name: '🎨 Mesa da redação',
  render: function MesaRender() {
    const praca = useCena('praca');
    const biblioteca = useCena('biblioteca');
    const [aberta, setAberta] = useState<string | null>(null);
    const imagens: Partial<Record<NewsMedium, { src: string; alt: string }>> = {
      tv: { src: praca, alt: ALT_PRACA },
      portal: { src: biblioteca, alt: ALT_BIBLIOTECA },
    };
    const naCapa: NewsMedium[] = ['newspaper', 'tv', 'bulletin'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={MESA}>
          {NEWS_MEDIUMS.map((meio) => (
            <NewsCard
              key={meio}
              medium={meio}
              headline={NOTICIAS[meio].headline}
              summary={NOTICIAS[meio].summary}
              imageSrc={imagens[meio]?.src}
              imageAlt={imagens[meio]?.alt}
              onFrontPage={naCapa.includes(meio)}
              onClick={() => setAberta(`${NEWS_MEDIUM_LABELS[meio]}: ${NOTICIAS[meio].headline}`)}
            />
          ))}
        </div>
        <p role="status" style={{ margin: 0, fontSize: 14, color: 'var(--unooria-color-neutral-700)' }}>
          {aberta ? `A gaveta abriria a matéria — ${aberta}` : 'Toque num cartão para abrir a matéria.'}
        </p>
      </div>
    );
  },
};

/**
 * Imagem quebrada (cai no desenho), sem imagem, com imagem e na capa.
 */
export const Estados: Story = {
  render: function EstadosRender() {
    const praca = useCena('praca');
    return (
      <div style={{ ...MESA, maxWidth: 640 }}>
        <NewsCard
          medium="portal"
          headline={NOTICIAS.portal.headline}
          summary={NOTICIAS.portal.summary}
          imageSrc={IMAGEM_QUEBRADA}
          imageAlt="Foto da biblioteca"
        />
        <NewsCard medium="radio" headline={NOTICIAS.radio.headline} summary={NOTICIAS.radio.summary} />
        <NewsCard
          medium="newspaper"
          headline={NOTICIAS.newspaper.headline}
          summary={NOTICIAS.newspaper.summary}
          imageSrc={praca}
          imageAlt={ALT_PRACA}
        />
        <NewsCard
          medium="bulletin"
          headline={NOTICIAS.bulletin.headline}
          summary={NOTICIAS.bulletin.summary}
          onFrontPage
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    // Todo cartão é um botão que abre diálogo — e nenhum finge alternar.
    const cartoes = tela.getAllByRole('button');
    await expect(cartoes).toHaveLength(4);
    for (const cartao of cartoes) {
      await expect(cartao).toHaveAttribute('aria-haspopup', 'dialog');
      await expect(cartao).not.toHaveAttribute('aria-pressed');
    }

    // O nome é a manchete; na capa, ganha ", na capa".
    const jornal = tela.getByRole('button', { name: NOTICIAS.newspaper.headline });
    const naCapa = tela.getByRole('button', {
      name: /^Campanha do agasalho recebe doações até dia 30\s?, na capa$/,
    });
    await expect(naCapa).toHaveTextContent('Na capa');

    // Com imagem: o alt entra na descrição, depois do meio e do resumo.
    await expect(jornal.querySelector('img')).toHaveAttribute('alt', ALT_PRACA);
    await expect(jornal).toHaveAccessibleDescription(new RegExp(`^Jornal impresso .+ ${ALT_PRACA}$`));
    await expect(jornal.querySelector('.unooria-news-card__media--illustration')).toBeNull();

    // Sem imagem: o desenho pelo meio ocupa a área.
    const radio = tela.getByRole('button', { name: NOTICIAS.radio.headline });
    await expect(radio.querySelector('.unooria-news-card__media--illustration')).not.toBeNull();
    await expect(radio.querySelector('img')).toBeNull();

    // Imagem quebrada: cai no desenho, e o alt sai da descrição.
    const portal = tela.getByRole('button', { name: NOTICIAS.portal.headline });
    await waitFor(
      () => expect(portal.querySelector('.unooria-news-card__media--illustration')).not.toBeNull(),
      { timeout: 4000 }
    );
    await expect(portal.querySelector('img')).toBeNull();
    await expect(portal).not.toHaveAccessibleDescription(/Foto da biblioteca/);
  },
};
