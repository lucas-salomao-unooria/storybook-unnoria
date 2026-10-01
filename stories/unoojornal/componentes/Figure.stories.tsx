import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Figure } from '../../../src/unoojornal/components/Figure';
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
import { ujnArticles } from '../fixtures';

const BAR = '#716C98';

/** O bloco de figura da matéria principal da edição. */
const FIGURA = ujnArticles[0].body.find((bloco) => bloco.type === 'figure');
const SRC = FIGURA && FIGURA.type === 'figure' ? FIGURA.src : '/unoojornal/foto-11.svg';
const ALT =
  FIGURA && FIGURA.type === 'figure'
    ? FIGURA.alt
    : 'Ginásio cheio de visitantes circulando entre as bancadas da feira';
const LEGENDA =
  FIGURA && FIGURA.type === 'figure'
    ? FIGURA.caption
    : 'O ginásio recebeu cerca de oitocentos visitantes só no primeiro turno.';
const CREDITO = FIGURA && FIGURA.type === 'figure' ? FIGURA.credit : 'Acervo do Clube de Fotografia';

const rotuloEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ujn-font-sans)',
  fontSize: 'var(--ujn-font-caption-size)',
  lineHeight: 'var(--ujn-font-caption-line)',
  color: 'var(--ujn-color-text-secondary)',
};

/**
 * Figura com legenda do arranjo, na largura pedida.
 */
const FiguraRotulada: React.FC<{
  rotulo: string;
  largura?: number | string;
  props?: Partial<React.ComponentProps<typeof Figure>>;
}> = ({ rotulo, largura = 360, props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: largura }}>
    <p style={rotuloEstilo}>{rotulo}</p>
    <Figure src={SRC} alt={ALT} caption={LEGENDA} credit={CREDITO} {...props} />
  </div>
);

/**
 * Página de documentação rica do componente Figure.
 */
const FigureDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Matéria"
      title="Figure"
      description="Imagem da matéria em quadro de proporção 3:2, com legenda e crédito. É a fotografia que ilustra o texto, nunca um enfeite."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma foto com a história dela."
    />
    <UjnDocGrid>
      <UjnDocCard icon="🖼️" title="Foto no meio do texto">
        Entra como filho do <code>ArticleBody</code>, entre dois parágrafos, ocupando a coluna de
        leitura inteira.
      </UjnDocCard>
      <UjnDocCard icon="📝" title="Legenda e crédito">
        A legenda diz o que a foto mostra; o crédito, quem a fez. Os dois ficam na{' '}
        <code>&lt;figcaption&gt;</code>.
      </UjnDocCard>
      <UjnDocCard icon="♿" title="Descrição obrigatória">
        O <code>alt</code> é obrigatório: descreve a cena para quem não a vê, e a legenda continua
        sendo texto à parte.
      </UjnDocCard>
      <UjnDocCard icon="📐" title="Sempre 3:2">
        O quadro tem a proporção da fotografia do jornal; a imagem preenche e corta pelas bordas.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura herdada da tela da matéria e da galeria; cores e fontes são as da Plataforma Unooria."
    />
    <UjnDocSpecs
      component="Figure"
      layout="Coluna · quadro 3:2 · legenda e crédito abaixo"
      specs={[
        { label: 'Estrutura herdada', value: 'Tela article-detail 3:363 · galeria 5:214' },
        { label: 'Quadro', value: 'aspect-ratio 3 / 2 · object-fit: cover' },
        { label: 'Espera', value: '--ujn-color-background-subtle' },
        { label: 'Raio', value: '--ujn-radius-xs (2px)' },
        { label: 'Legenda', value: 'Body/Small (14/20, 400) em --ujn-color-text-secondary' },
        { label: 'Crédito', value: 'Caption (12/18, 400) em --ujn-color-text-muted' },
        { label: 'Carregamento', value: 'loading="lazy" · decoding="async"' },
        { label: 'Fronteira', value: 'Server Component' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Proporção fixa em 3:2',
          detail:
            'toda fotografia do jornal tem essa proporção; um quadro fixo evita que a página salte quando a imagem termina de carregar.',
        },
        {
          subject: 'Superfície sutil de espera',
          detail:
            'enquanto a imagem não chega, o quadro é --ujn-color-background-subtle, que existe nos dois temas.',
        },
        {
          subject: 'Raio de 2px',
          detail:
            'o jornal é reto: a foto tem o raio mínimo (xs). Só a pílula e o avatar arredondam.',
        },
        {
          subject: 'Legenda condicional',
          detail:
            'a <figcaption> só existe com legenda ou crédito: uma figura sem texto não deixa uma legenda vazia para o leitor de tela.',
        },
        {
          subject: 'Crédito em linha própria',
          detail:
            'o crédito fica abaixo da legenda, em Caption e no tom mudo, para não competir com ela.',
        },
        {
          subject: 'Sem sombra',
          detail:
            'a superfície é plana; a foto se separa do texto pelo espaço, e não por elevação.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Quadro, legenda e crédito."
    />
    <UjnDocStage surface="card" align="stretch" direction="column" padding={32} width={560}>
      <Figure src={SRC} alt={ALT} caption={LEGENDA} credit={CREDITO} />
      <UjnDocAnatomy
        zones={[
          { name: 'Quadro', role: 'Moldura 3:2 com raio mínimo.', token: 'aspect-ratio 3 / 2 · --ujn-radius-xs' },
          { name: 'Imagem', role: 'Preenche o quadro e corta pelas bordas.', token: 'object-fit: cover' },
          { name: 'Legenda', role: 'O que a foto mostra.', token: '--ujn-font-body-sm-*' },
          { name: 'Crédito', role: 'Quem fez a foto.', token: '--ujn-font-caption-*' },
        ]}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Larguras de coluna e combinações de legenda."
    />
    <UjnDocStage label="Larguras" surface="card" align="flex-start" padding={24}>
      <FiguraRotulada rotulo="280px" largura={280} />
      <FiguraRotulada rotulo="420px" largura={420} />
      <FiguraRotulada rotulo="740px (coluna de leitura)" largura={740} />
    </UjnDocStage>
    <UjnDocStage label="Estados" surface="card" align="flex-start" padding={24}>
      <FiguraRotulada rotulo="Legenda e crédito" />
      <FiguraRotulada rotulo="Só legenda" props={{ credit: undefined }} />
      <FiguraRotulada rotulo="Só crédito" props={{ caption: undefined }} />
      <FiguraRotulada rotulo="Sem texto" props={{ caption: undefined, credit: undefined }} />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar a figura." />
    <UjnDocPractices
      dos={[
        'Escrever um alt que descreva a cena, e uma legenda que acrescente contexto.',
        'Dar o crédito de toda fotografia que não seja da redação.',
        'Usar fotos de proporção próxima a 3:2: o corte fica discreto.',
        'Deixar a figura entre parágrafos, dentro do ArticleBody.',
      ]}
      donts={[
        'Repetir a legenda no alt: o leitor de tela diria a mesma coisa duas vezes.',
        'Usar a figura como fundo decorativo: ela é conteúdo da matéria.',
        'Embutir a imagem no pacote: o endereço entra sempre por src.',
        'Esperar que o quadro acompanhe a proporção da imagem: ele é sempre 3:2.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfície de espera, legenda e crédito acompanham o tema."
    />
    <UjnDocThemeSwitcher surface="card" padding={32}>
      {(tema) => (
        <div style={{ width: 520, maxWidth: '100%' }}>
          <Figure src={SRC} alt={ALT} caption={LEGENDA} credit={CREDITO} theme={tema} />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do Figure. Os demais atributos vão ao <figure>."
    />
    <UjnDocPropsTable
      title="Figure"
      rows={[
        { name: 'src', type: 'string', description: 'Endereço da imagem. Obrigatório.' },
        { name: 'alt', type: 'string', description: 'Descrição para leitores de tela. Obrigatório.' },
        { name: 'caption', type: 'string', description: 'Legenda visível, abaixo da imagem.' },
        { name: 'credit', type: 'string', description: 'Crédito da fotografia, abaixo da legenda.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Figure> = {
  title: 'Unoojornal/Componentes/Figure',
  component: Figure,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text', description: 'Endereço da imagem.' },
    alt: { control: 'text', description: 'Descrição para leitores de tela.' },
    caption: { control: 'text', description: 'Legenda visível.' },
    credit: { control: 'text', description: 'Crédito da fotografia.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    src: SRC,
    alt: ALT,
    caption: LEGENDA,
    credit: CREDITO,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Figure>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <FigureDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Figure',
  render: (args) => (
    <UjnDocStage surface="card" theme={args.theme} align="flex-start" padding={32}>
      <div style={{ width: 560, maxWidth: '100%' }}>
        <Figure {...args} />
      </div>
    </UjnDocStage>
  ),
};

/**
 * A figura da matéria principal, com legenda e crédito (tela `article-detail`,
 * `3:363`).
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: figura da matéria',
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={32}>
      <div style={{ width: 560, maxWidth: '100%' }}>
        <Figure src={SRC} alt={ALT} caption={LEGENDA} credit={CREDITO} />
      </div>
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await expect(tela.getByRole('img', { name: ALT })).toHaveAttribute('src', SRC);
    await expect(tela.getByText(LEGENDA)).toBeInTheDocument();
    await expect(tela.getByText(CREDITO ?? '')).toBeInTheDocument();
  },
};

/**
 * O quadro 3:2 em três larguras.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      <FiguraRotulada rotulo="280px" largura={280} />
      <FiguraRotulada rotulo="420px" largura={420} />
      <FiguraRotulada rotulo="740px" largura={740} />
    </UjnDocStage>
  ),
};

/**
 * O componente tem uma única forma; a variação é o texto.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      <FiguraRotulada rotulo="Legenda e crédito" />
      <FiguraRotulada rotulo="Só legenda" props={{ credit: undefined }} />
      <FiguraRotulada rotulo="Só crédito" props={{ caption: undefined }} />
    </UjnDocStage>
  ),
};

/**
 * Sem texto algum, e com legenda longa.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      <FiguraRotulada rotulo="Sem legenda e sem crédito" props={{ caption: undefined, credit: undefined }} />
      <FiguraRotulada rotulo="Legenda longa" props={{ caption: `${LEGENDA} ${LEGENDA}` }} />
    </UjnDocStage>
  ),
};

/**
 * A figura nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UjnDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          surface="card"
          theme={tema}
          align="stretch"
          direction="column"
          padding={24}
          width={420}
        >
          <Figure src={SRC} alt={ALT} caption={LEGENDA} credit={CREDITO} theme={tema} />
        </UjnDocStage>
      ))}
    </div>
  ),
};
