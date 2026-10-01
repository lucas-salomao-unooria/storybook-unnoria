import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Footer } from '../../../src/unoojornal/components/Footer';
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
import { ujnPublication } from '../fixtures';

const BAR = '#716C98';

/**
 * Rodapé completo com as três colunas do jornal e o conteúdo das fixtures.
 */
const FullFooter: React.FC<Partial<React.ComponentProps<typeof Footer>>> = (props) => (
  <Footer
    title={ujnPublication.name}
    description={ujnPublication.description}
    copyright={ujnPublication.copyright}
    note={ujnPublication.note}
    {...props}
  >
    <Footer.Column heading="Redação">
      <a href="#quem-somos">Quem somos</a>
      <a href="#equipe">Equipe editorial</a>
      <a href="#participe">Participe do jornal</a>
    </Footer.Column>
    <Footer.Column heading="Edição & Orientação">
      <p>Edição nº 214 · março de 2026</p>
      <p>Orientação: Prof.ª Helena Duarte, Departamento de Língua Portuguesa</p>
    </Footer.Column>
    <Footer.Column heading="Contato & Expediente">
      <a href="mailto:redacao@gazetadopatio.example">redacao@gazetadopatio.example</a>
      <a href="#expediente">Expediente</a>
    </Footer.Column>
  </Footer>
);

/**
 * Página de documentação rica dos componentes Footer e Footer.Column.
 */
const FooterDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Capa"
      title="Footer"
      description="Rodapé do jornal: nome da publicação, descrição, colunas de links e a linha de direitos. É a única superfície escura do jornal claro e é a mesma nos dois temas."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Fecha a capa e a matéria."
    />
    <UjnDocGrid>
      <UjnDocCard icon="🌑" title="Superfície invariante">
        Usa só os tokens <code>--ujn-color-footer-*</code>: no tema claro é o único bloco escuro; no
        escuro continua um degrau acima da página.
      </UjnDocCard>
      <UjnDocCard icon="🧱" title="Colunas livres">
        Cada <code>Footer.Column</code> tem cabeçalho em caixa alta e conteúdo livre: links, linhas de
        texto, e-mail.
      </UjnDocCard>
      <UjnDocCard icon="📐" title="Por contêiner">
        Uma coluna abaixo de 640px, duas a partir de 640px e três, ao lado do bloco do título, a partir
        de 960px.
      </UjnDocCard>
      <UjnDocCard icon="©️" title="Direitos e nota">
        A linha de direitos fica na base, separada por um fio; a nota complementar vai ao lado.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="Footer · Footer.Column"
      layout="Faixa de largura total · conteúdo de até 1280px"
      specs={[
        { label: 'Superfície', value: '--ujn-color-footer-surface (invariante)' },
        { label: 'Nome da publicação', value: 'title-lg · 24/34px · --ujn-color-footer-accent' },
        { label: 'Descrição', value: 'body-md · 16/24px · --ujn-color-footer-text-secondary' },
        { label: 'Cabeçalho da coluna', value: 'kicker 12/18px · caixa alta · --ujn-color-footer-accent' },
        { label: 'Links', value: 'body-sm · --ujn-color-footer-text · alvo de 44px' },
        { label: 'Fio da base', value: '1px --ujn-color-footer-border' },
        { label: 'Recuo lateral', value: '16px · 48px (≥ 640px) · 80px (≥ 960px)' },
        { label: 'Foco dos links', value: 'anel de 2px em --ujn-color-footer-accent' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Escuro nos dois temas',
          detail:
            'o rodapé não tem variante clara nem escura: --ujn-color-footer-* é invariante, o que o torna a âncora visual do jornal. O contraste é medido uma só vez, e vale nos dois temas.',
        },
        {
          subject: 'Anel de foco claro',
          detail:
            'o anel de foco dos links do rodapé usa --ujn-color-footer-accent, e não o focus-ring do tema: o anel do tema claro (roxo médio) some no fundo escuro.',
        },
        {
          subject: 'Colunas são <div>, não regiões',
          detail:
            'três colunas viradas <section aria-label> criariam três landmarks dentro do <footer>; elas só agrupam, e o cabeçalho de cada uma é um h3.',
        },
        {
          subject: 'Links com alvo de 44px',
          detail: 'links dentro das colunas têm altura mínima de --ujn-touch-target, sem alterar o ritmo visual.',
        },
        {
          subject: 'Dourado do Figma → roxo claro',
          detail: 'o rodapé do arquivo de origem usa dourado para o título e os cabeçalhos; aqui é brandpurple-400.',
        },
        {
          subject: 'Server Component',
          detail: 'só recebe props e renderiza markup; nenhuma função passa a filho.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocStage label="Largo (1100px)" surface="page" align="stretch" direction="column" padding={0} gap={0} width={1100}>
      <FullFooter />
    </UjnDocStage>
    <UjnDocAnatomy
      zones={[
        { name: 'Nome da publicação', role: 'Título do rodapé, na cor de destaque.', token: '--ujn-font-title-lg-* · --ujn-color-footer-accent' },
        { name: 'Descrição', role: 'Apresentação curta da publicação.', token: '--ujn-color-footer-text-secondary' },
        { name: 'Cabeçalho da coluna', role: 'Rótulo em caixa alta.', token: '--ujn-font-kicker-* · --ujn-color-footer-accent' },
        { name: 'Conteúdo da coluna', role: 'Links ou linhas de texto.', token: '--ujn-color-footer-text' },
        { name: 'Fio', role: 'Separa a linha de direitos.', token: '--ujn-color-footer-border' },
        { name: 'Direitos e nota', role: 'Base do rodapé.', token: '--ujn-font-caption-*' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Três larguras de contêiner e o rodapé mínimo."
    />
    <div style={{ display: 'grid', gap: 16 }}>
      {[1100, 700, 360].map((width) => (
        <UjnDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" padding={0} gap={0} width={width}>
          <FullFooter />
        </UjnDocStage>
      ))}
      <UjnDocStage label="Mínimo: só o título e a linha de direitos" surface="page" align="stretch" direction="column" padding={0} gap={0} width={700}>
        <Footer title={ujnPublication.name} copyright={ujnPublication.copyright} />
      </UjnDocStage>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Manter três colunas no máximo: o largo as alinha ao lado do título.',
        'Usar links reais em Footer.Column: o alvo tem 44px de altura.',
        'Escrever a linha de direitos completa, com o ano e a instituição.',
        'Deixar o rodapé como último elemento da página.',
      ]}
      donts={[
        'Pintar o rodapé de outra cor: ele é invariante de propósito.',
        'Usar cores de texto próprias dentro das colunas.',
        'Pôr formulários longos no rodapé.',
        'Repetir a navegação principal nas colunas.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O rodapé é igual nos dois temas: o seletor mostra que nada muda."
    />
    <UjnDocThemeSwitcher surface="page" padding={0}>
      {() => (
        <div style={{ width: 960 }}>
          <FullFooter />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="Footer"
      rows={[
        { name: 'title', type: 'string', description: 'Nome da publicação. Obrigatório.' },
        { name: 'description', type: 'string', description: 'Descrição curta da publicação.' },
        { name: 'copyright', type: 'string', description: 'Linha de direitos, na base.' },
        { name: 'note', type: 'string', description: 'Nota complementar da base.' },
        { name: 'children', type: 'React.ReactNode', description: 'As colunas: um Footer.Column por coluna.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema do contêiner; as cores do rodapé são invariantes.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos do <footer>.' },
      ]}
    />
    <UjnDocPropsTable
      title="Footer.Column"
      rows={[
        { name: 'heading', type: 'string', description: 'Cabeçalho da coluna, em caixa alta. Obrigatório.' },
        { name: 'children', type: 'React.ReactNode', description: 'Links ou linhas de texto. Obrigatório.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos do <div>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Footer> = {
  title: 'Unoojornal/Componentes/Footer',
  component: Footer,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Nome da publicação.' },
    description: { control: 'text', description: 'Descrição curta.' },
    copyright: { control: 'text', description: 'Linha de direitos.' },
    note: { control: 'text', description: 'Nota complementar.' },
    children: { control: false, description: 'As colunas (Footer.Column).' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema do contêiner (o rodapé é invariante).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: ujnPublication.name,
    description: ujnPublication.description,
    copyright: ujnPublication.copyright,
    note: ujnPublication.note,
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

/**
 * Documentação rica e completa dos componentes.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <FooterDocumentationPage />,
};

/**
 * Playground do rodapé, com as props do Footer expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Footer',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} surface="page" align="stretch" direction="column" padding={0} gap={0} width={1100}>
      <FullFooter {...args} />
    </UjnDocStage>
  ),
};

type ColumnArgs = React.ComponentProps<typeof Footer.Column>;

/**
 * Playground da coluna, com as props do Footer.Column expostas.
 */
export const PlaygroundColuna: StoryObj<ColumnArgs> = {
  name: '🕹️ 2. Playground do Footer.Column',
  argTypes: {
    heading: { control: 'text', description: 'Cabeçalho da coluna.' },
    children: { control: 'text', description: 'Conteúdo da coluna.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    heading: 'Contato & Expediente',
    children: 'redacao@gazetadopatio.example',
  },
  render: (args) => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={0} gap={0} width={480}>
      <Footer title={ujnPublication.name}>
        <Footer.Column {...args} />
      </Footer>
    </UjnDocStage>
  ),
};

/**
 * O rodapé da capa, na largura da página.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: rodapé da capa',
  render: () => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={0} gap={0} width={1440}>
      <FullFooter />
    </UjnDocStage>
  ),
};

/**
 * Largo (três colunas), médio (duas) e compacto (uma).
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[1100, 700, 360].map((width) => (
        <UjnDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" padding={0} gap={0} width={width}>
          <FullFooter />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Completo, com duas colunas e mínimo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="Completo" surface="page" align="stretch" direction="column" padding={0} gap={0} width={1100}>
        <FullFooter />
      </UjnDocStage>
      <UjnDocStage label="Duas colunas" surface="page" align="stretch" direction="column" padding={0} gap={0} width={1100}>
        <Footer title={ujnPublication.name} description={ujnPublication.description} copyright={ujnPublication.copyright}>
          <Footer.Column heading="Redação">
            <a href="#quem-somos">Quem somos</a>
            <a href="#equipe">Equipe editorial</a>
          </Footer.Column>
          <Footer.Column heading="Contato">
            <a href="mailto:redacao@gazetadopatio.example">redacao@gazetadopatio.example</a>
          </Footer.Column>
        </Footer>
      </UjnDocStage>
      <UjnDocStage label="Mínimo" surface="page" align="stretch" direction="column" padding={0} gap={0} width={1100}>
        <Footer title={ujnPublication.name} copyright={ujnPublication.copyright} />
      </UjnDocStage>
    </div>
  ),
};

/**
 * Sem descrição, sem nota e com texto longo numa coluna.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="Sem descrição e sem nota" surface="page" align="stretch" direction="column" padding={0} gap={0} width={1100}>
        <FullFooter description={undefined} note={undefined} />
      </UjnDocStage>
      <UjnDocStage label="Texto longo numa coluna" surface="page" align="stretch" direction="column" padding={0} gap={0} width={700}>
        <Footer title={ujnPublication.name} copyright={ujnPublication.copyright}>
          <Footer.Column heading="Expediente">
            <p>
              Jornal laboratório produzido integralmente pelos estudantes do Ensino Médio, com orientação do
              Departamento de Língua Portuguesa e apoio da biblioteca escolar.
            </p>
          </Footer.Column>
        </Footer>
      </UjnDocStage>
    </div>
  ),
};

/**
 * Os dois temas: o rodapé é idêntico.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="stretch" direction="column" padding={0} gap={0} width={1100}>
          <FullFooter />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Estrutura: o rodapé é um `<footer>` com as três colunas nomeadas por
 * cabeçalhos, links reais e a linha de direitos.
 */
export const Estrutura: Story = {
  name: 'Interação: estrutura e links',
  render: () => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={0} gap={0} width={1100}>
      <FullFooter />
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const footer = canvas.getByRole('contentinfo');
    await expect(within(footer).getAllByRole('heading', { level: 3 })).toHaveLength(3);
    await expect(within(footer).getByRole('heading', { level: 3, name: 'Redação' })).toBeInTheDocument();

    const link = within(footer).getByRole('link', { name: 'Quem somos' });
    await expect(link).toHaveAttribute('href', '#quem-somos');
    await expect(within(footer).getByRole('link', { name: /redacao@/ })).toHaveAttribute('href', expect.stringContaining('mailto:'));

    await expect(within(footer).getByText(ujnPublication.copyright)).toBeInTheDocument();
  },
};
