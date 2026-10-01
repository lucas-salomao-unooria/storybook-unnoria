import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Figure } from '../../../src/unooblog/components/Figure';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocStage,
  UblDocPractices,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';
import { ublImages } from '../fixtures';

const BAR = '#716C98';

const FOTO = ublImages[0];
const LEGENDA = 'O anel de foco tem espessura, afastamento e cor próprios: não depende do contorno do navegador.';
const CREDITO = 'Ilustração: equipe do Caderno Aberto';

const rotuloEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ubl-font-sans)',
  fontSize: 'var(--ubl-font-caption-size)',
  lineHeight: 'var(--ubl-font-caption-line)',
  color: 'var(--ubl-color-text-secondary)',
};

/**
 * Coluna de leitura dentro de um contêiner mais largo, como na página do post:
 * a figura `wide` é a única que extrapola a coluna.
 */
const ColunaDeLeitura: React.FC<{ children: React.ReactNode; largura?: number }> = ({
  children,
  largura = 1000,
}) => (
  <div style={{ width: `min(${largura}px, 100%)`, containerType: 'inline-size' }}>
    <div style={{ maxWidth: 'var(--ubl-reading-width)', marginInline: 'auto' }}>{children}</div>
  </div>
);

/**
 * Página de documentação rica do componente Figure.
 */
const FigureDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Leitura"
      title="Figure"
      description="Imagem do post em quadro 16:9 de cantos macios, com legenda e crédito. É um <figure> de verdade e, na variante wide, extrapola a coluna de leitura até a largura da página."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Quando a imagem faz parte da explicação."
    />
    <UblDocGrid>
      <UblDocCard icon="🖼️" title="Ilustra o argumento">
        Diagramas, capturas e fotografias que o texto comenta. A descrição (<code>alt</code>) é
        obrigatória: sem ela, a figura só serve a quem enxerga.
      </UblDocCard>
      <UblDocCard icon="🏷️" title="Legenda e crédito">
        A legenda explica o que olhar; o crédito vai em linha própria, em tom mais discreto. A
        <code> &lt;figcaption&gt;</code> só existe quando há um dos dois.
      </UblDocCard>
      <UblDocCard icon="↔️" title="Ocupa a coluna ou a página">
        Por padrão a figura tem a largura da coluna de leitura. Com <code>wide</code>, ela se
        estende além da coluna, até <code>--ubl-page-width</code>.
      </UblDocCard>
      <UblDocCard icon="⏳" title="Carrega sem pular">
        O quadro 16:9 reserva o espaço e mostra uma superfície sutil enquanto a imagem não chega:
        o texto não se mexe quando ela carrega.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura própria do módulo; cores e fontes são as da Plataforma Unooria."
    />
    <UblDocSpecs
      component="Figure"
      layout="Quadro 16:9 · legenda e crédito abaixo, na largura de leitura"
      specs={[
        { label: 'Quadro', value: 'aspect-ratio 16 / 9 · raio --ubl-radius-m (12px) · object-fit cover' },
        { label: 'Espera', value: '--ubl-color-background-subtle atrás da imagem' },
        { label: 'Legenda', value: 'body-md (14/20) · --ubl-color-text-secondary' },
        { label: 'Crédito', value: 'caption (12/18) · --ubl-color-text-muted' },
        { label: 'Wide', value: 'margem negativa até min(contêiner, --ubl-page-width) (1120px)' },
        { label: 'Carregamento', value: 'loading="lazy" · decoding="async"' },
        { label: 'Raiz', value: '<figure> · <figcaption> só com legenda ou crédito' },
        { label: 'Fronteira', value: 'Server Component' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Cantos macios em vez de retos',
          detail:
            'a imagem do blog tem raio de 12px (radius-m). A figura do Unoojornal é reta; a composição do blog é de cartões e cantos arredondados.',
        },
        {
          subject: 'Proporção 16:9 em vez de 3:2',
          detail:
            'as capas e as ilustrações do blog são widescreen, a mesma proporção da capa do PostHeader, e o conjunto lê como uma coisa só.',
        },
        {
          subject: 'wide é margem, não largura fixa',
          detail:
            'a figura wide usa margem negativa calculada com a largura do contêiner (cqi). Sem contêiner à volta, cqi cai para a largura da janela; em contêineres mais estreitos que a coluna, a margem nunca fica positiva e a figura continua na coluna.',
        },
        {
          subject: 'Legenda na largura de leitura',
          detail:
            'mesmo na figura wide, a legenda fica centralizada na coluna de leitura (680px): linha de texto longa demais é difícil de ler.',
        },
        {
          subject: 'Sem sombra',
          detail:
            'a imagem se separa da página pela própria tinta e pelo raio; nenhum elevation é aplicado.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Quadro, legenda e crédito."
    />
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <ColunaDeLeitura>
        <Figure src={FOTO.src} alt={FOTO.alt} caption={LEGENDA} credit={CREDITO} />
      </ColunaDeLeitura>
      <UblDocAnatomy
        zones={[
          { name: 'Quadro', role: 'Reserva o espaço 16:9 e arredonda os cantos.', token: '--ubl-radius-m' },
          { name: 'Imagem', role: 'Cobre o quadro (object-fit: cover); carrega de forma preguiçosa.', token: 'src · alt' },
          { name: 'Legenda', role: 'Diz o que olhar na imagem.', token: 'body-md · text-secondary' },
          { name: 'Crédito', role: 'Autoria da imagem, em linha própria.', token: 'caption · text-muted' },
        ]}
      />
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Legenda e crédito presentes ou não; coluna e largura ampla."
    />
    <UblDocStage label="Legenda e crédito" surface="page" align="flex-start" padding={24}>
      {[
        { rotulo: 'Legenda e crédito', props: { caption: LEGENDA, credit: CREDITO } },
        { rotulo: 'Só legenda', props: { caption: LEGENDA } },
        { rotulo: 'Só crédito', props: { credit: CREDITO } },
        { rotulo: 'Sem legenda', props: {} },
      ].map(({ rotulo, props }) => (
        <div key={rotulo} style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>{rotulo}</p>
          <Figure src={FOTO.src} alt={FOTO.alt} {...props} />
        </div>
      ))}
    </UblDocStage>
    <UblDocStage label="Na coluna e wide" surface="page" align="flex-start" direction="column" padding={24}>
      <ColunaDeLeitura>
        <p style={rotuloEstilo}>Na coluna de leitura (padrão)</p>
        <Figure src={FOTO.src} alt={FOTO.alt} caption={LEGENDA} />
      </ColunaDeLeitura>
      <ColunaDeLeitura>
        <p style={rotuloEstilo}>wide: extrapola a coluna</p>
        <Figure wide src={FOTO.src} alt={FOTO.alt} caption={LEGENDA} />
      </ColunaDeLeitura>
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar a figura." />
    <UblDocPractices
      dos={[
        'Escrever um alt que diga o que a imagem mostra e por que está ali.',
        'Usar a legenda para dizer o que olhar, e não para repetir o alt.',
        'Dar crédito a quem fez a imagem.',
        'Reservar wide para imagens que precisam de largura: diagramas e capturas de tela largas.',
      ]}
      donts={[
        'Deixar o alt vazio numa imagem que carrega informação.',
        'Colocar texto essencial dentro da imagem sem repeti-lo no corpo do post.',
        'Usar wide em todas as figuras: o efeito vira ruído.',
        'Empilhar várias figuras sem texto entre elas.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O quadro de espera, a legenda e o crédito acompanham o tema."
    />
    <UblDocThemeSwitcher surface="page" padding={32}>
      {(tema) => (
        <ColunaDeLeitura>
          <Figure theme={tema} src={FOTO.src} alt={FOTO.alt} caption={LEGENDA} credit={CREDITO} />
        </ColunaDeLeitura>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do Figure. Os demais atributos vão ao <figure> raiz."
    />
    <UblDocPropsTable
      title="Figure"
      rows={[
        { name: 'src', type: 'string', description: 'Endereço da imagem. O pacote não embute bitmaps.' },
        { name: 'alt', type: 'string', description: 'Descrição para leitores de tela. Obrigatória; use "" só em imagem decorativa.' },
        { name: 'caption', type: 'string', description: 'Legenda visível abaixo da imagem.' },
        { name: 'credit', type: 'string', description: 'Crédito da imagem, em linha própria.' },
        { name: 'wide', type: 'boolean', default: 'false', description: 'Extrapola a coluna de leitura até --ubl-page-width, quando o contêiner permite.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Figure> = {
  title: 'Unooblog/Componentes/Figure',
  component: Figure,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text', description: 'Endereço da imagem.' },
    alt: { control: 'text', description: 'Descrição para leitores de tela.' },
    caption: { control: 'text', description: 'Legenda visível.' },
    credit: { control: 'text', description: 'Crédito da imagem.' },
    wide: { control: 'boolean', description: 'Extrapola a coluna de leitura.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    src: FOTO.src,
    alt: FOTO.alt,
    caption: LEGENDA,
    credit: CREDITO,
    wide: false,
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
    <UblDocStage surface="page" theme={args.theme} align="stretch" direction="column" padding={32}>
      <ColunaDeLeitura>
        <Figure {...args} />
      </ColunaDeLeitura>
    </UblDocStage>
  ),
};

/**
 * Uma figura no corpo de um post, entre dois parágrafos.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: figura no texto',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <ColunaDeLeitura>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'var(--ubl-font-sans)', color: 'var(--ubl-color-text-primary)' }}>
          <p className="ubl-text ubl-text--prose">
            O foco é a posição do teclado na página. Cada Tab avança para o próximo controle.
          </p>
          <Figure src={FOTO.src} alt={FOTO.alt} caption={LEGENDA} credit={CREDITO} />
          <p className="ubl-text ubl-text--prose">
            Sem um indicador, a pessoa precisa adivinhar onde está.
          </p>
        </div>
      </ColunaDeLeitura>
    </UblDocStage>
  ),
};

/**
 * A figura em contêineres de larguras diferentes: o quadro mantém 16:9.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={24}>
      {[200, 320, 480].map((largura) => (
        <div key={largura} style={{ width: largura, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>Contêiner de {largura}px</p>
          <Figure src={FOTO.src} alt={FOTO.alt} caption="Legenda curta." />
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * Coluna e wide, lado a lado.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" direction="column" padding={24}>
      <ColunaDeLeitura>
        <p style={rotuloEstilo}>Padrão</p>
        <Figure src={FOTO.src} alt={FOTO.alt} caption={LEGENDA} credit={CREDITO} />
      </ColunaDeLeitura>
      <ColunaDeLeitura>
        <p style={rotuloEstilo}>wide</p>
        <Figure wide src={FOTO.src} alt={FOTO.alt} caption={LEGENDA} credit={CREDITO} />
      </ColunaDeLeitura>
    </UblDocStage>
  ),
};

/**
 * Com e sem legenda e crédito; e a imagem ainda não carregada (quadro de espera).
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={24}>
      {[
        { rotulo: 'Legenda e crédito', props: { caption: LEGENDA, credit: CREDITO } },
        { rotulo: 'Sem legenda', props: {} },
        { rotulo: 'Imagem ausente (quadro de espera)', props: { src: '/unooblog/nao-existe.svg', caption: 'A legenda continua legível.' } },
      ].map(({ rotulo, props }) => (
        <div key={rotulo} style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>{rotulo}</p>
          <Figure src={FOTO.src} alt={FOTO.alt} {...props} />
        </div>
      ))}
    </UblDocStage>
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
        <UblDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          surface="page"
          theme={tema}
          align="stretch"
          direction="column"
          padding={24}
          width={360}
        >
          <Figure theme={tema} src={FOTO.src} alt={FOTO.alt} caption={LEGENDA} credit={CREDITO} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * A figura é um `<figure>` nomeado pela legenda, e a imagem tem o texto alternativo.
 */
export const EstruturaAcessivel: Story = {
  name: 'Estrutura acessível',
  render: (args) => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <ColunaDeLeitura>
        <Figure {...args} />
      </ColunaDeLeitura>
    </UblDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('figure')).toBeInTheDocument();
    await expect(tela.getByRole('img', { name: args.alt })).toBeInTheDocument();
    await expect(tela.getByText(args.caption as string)).toBeInTheDocument();
    await expect(tela.getByText(args.credit as string)).toBeInTheDocument();
  },
};
