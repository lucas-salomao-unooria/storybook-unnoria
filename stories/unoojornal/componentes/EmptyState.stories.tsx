import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { EmptyState } from '../../../src/unoojornal/components/EmptyState';
import { Button } from '../../../src/unoojornal/components/Button';
import { Masthead } from '../../../src/unoojornal/components/Masthead';
import { PhoneFrame } from '../../../src/unoojornal/components/PhoneFrame';
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
import { notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Espião da ação "Ir para a capa" da estória de interação. */
const irParaCapaSpy = fn();

/**
 * Os vazios do jornal: o que a tela diz quando não há o que mostrar.
 */
const CENARIOS = {
  salvas: {
    icon: 'bookmark',
    title: 'Nenhuma matéria salva',
    description: 'Toque no marcador de uma matéria para guardá-la aqui e ler com calma depois.',
    acao: 'Ir para a capa',
  },
  busca: {
    icon: 'search',
    title: 'Nada encontrado',
    description: 'Não achamos matérias para essa busca. Confira a grafia ou tente uma palavra mais geral.',
    acao: 'Limpar a busca',
  },
  secao: {
    icon: 'edition',
    title: 'Esta seção ainda não tem publicações',
    description: 'Assim que a redação publicar, as matérias aparecem aqui.',
    acao: 'Ver todas as seções',
  },
} as const;

type Cenario = keyof typeof CENARIOS;

/**
 * Vazio de demonstração dentro de uma tela do aparelho, sob o título da
 * publicação, com a ação que resolve o vazio.
 */
const TelaVazia: React.FC<{
  cenario?: Cenario;
  theme?: 'light' | 'dark';
  scale?: number;
  aoAcionar?: () => void;
}> = ({ cenario = 'salvas', theme, scale = 0.6, aoAcionar }) => {
  const dados = CENARIOS[cenario];

  return (
    <PhoneFrame scale={scale} theme={theme} ariaLabel="Aparelho de demonstração">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxSizing: 'border-box',
          padding: 'calc(var(--ujn-safe-area-top) + var(--ujn-spacing-l)) var(--ujn-gutter) var(--ujn-safe-area-bottom)',
          background: 'var(--ujn-color-background-page)',
        }}
      >
        <Masthead title={ujnPublication.name} size="md" rule="thin" as="p" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <EmptyState
            icon={dados.icon}
            title={dados.title}
            description={dados.description}
            action={
              <Button variant="secondary" onClick={aoAcionar}>
                {dados.acao}
              </Button>
            }
          />
        </div>
      </div>
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente EmptyState.
 */
const EmptyStateDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Avisos"
      title="EmptyState"
      description="O que a tela mostra quando não há o que mostrar: nenhuma matéria salva, busca sem resultado, seção sem publicações. Glifo num medalhão circular, título, texto de apoio e a ação que resolve o vazio."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Um vazio explicado é um vazio resolvido."
    />
    <UjnDocGrid>
      <UjnDocCard icon="🔖" title="Nenhuma matéria salva">
        A lista de leitura nasce vazia. O estado diz como preenchê-la e leva a pessoa de volta à capa.
      </UjnDocCard>
      <UjnDocCard icon="🔍" title="Busca sem resultado">
        Em vez de uma tela em branco, explica o que aconteceu e oferece limpar a busca.
      </UjnDocCard>
      <UjnDocCard icon="📰" title="Seção sem publicações">
        Uma seção nova ainda sem matérias não parece quebrada: parece à espera da redação.
      </UjnDocCard>
      <UjnDocCard icon="🙈" title="Glifo decorativo">
        O ícone é <code>aria-hidden</code>: quem informa é o título, em um <code>&lt;h2&gt;</code>{' '}
        (ou <code>&lt;h3&gt;</code>, com <code>headingLevel</code>).
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UjnDocSpecs
      component="EmptyState"
      layout="Coluna centralizada · medalhão de 80px · texto até 360px"
      specs={[
        { label: 'Medalhão', value: '80px · círculo · --ujn-color-background-subtle' },
        { label: 'Glifo', value: 'Icon lg (32px) · --ujn-color-icon-accent' },
        { label: 'Título', value: 'Title/Medium (20/28, 700) · --ujn-color-text-primary' },
        { label: 'Apoio', value: 'Body/Medium · --ujn-color-text-secondary' },
        { label: 'Ação', value: 'margem de --ujn-spacing-xl acima' },
        { label: 'Recuo', value: '--ujn-spacing-4xl · --ujn-gutter' },
        { label: 'Servidor', value: 'Server Component: só recebe props' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Medalhão em background-subtle',
          detail:
            'o círculo usa a camada sutil da escada (página → cartão → sutil), sem contorno nem sombra. O glifo acompanha o tom de acento do ícone. O jornal é plano: só a pílula e o círculo arredondam.',
        },
        {
          subject: 'Glifo opcional',
          detail:
            'icon é opcional: um vazio de texto puro ("Sem comentários") dispensa o medalhão. Quando presente, é decorativo (aria-hidden) — o título informa.',
        },
        {
          subject: 'Glifo de 32px, e não 48px',
          detail:
            'a grade de ícones do jornal termina em 32px (Icon lg). O medalhão de 80px dá ao glifo 24px de folga de cada lado — a mesma proporção do estado vazio da galeria, em escala de página de leitura.',
        },
        {
          subject: 'Título em <h2>, com nível ajustável',
          detail:
            'o vazio nomeia uma região da página, então o título é um cabeçalho. headingLevel aceita 2 ou 3 para respeitar a hierarquia do contêiner.',
        },
        {
          subject: 'Ação é slot',
          detail:
            'action recebe um ReactNode — em geral um Button. O componente não conhece a ação, só a dispõe com folga e quebra de linha quando há mais de uma.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Cada zona do estado vazio." />
    <UjnDocStage surface="page" align="flex-start" padding={16}>
      <TelaVazia />
      <div style={{ flex: '1 1 320px' }}>
        <UjnDocAnatomy
          zones={[
            { name: 'Medalhão', role: 'Círculo com o glifo, decorativo (aria-hidden).', token: '--ujn-color-background-subtle' },
            { name: 'Título', role: 'Cabeçalho que nomeia o vazio.', token: 'Title/Medium' },
            { name: 'Apoio', role: 'O que aparece aqui e como preencher.', token: 'Body/Medium' },
            { name: 'Ação', role: 'Slot para o botão que resolve o vazio.', token: '--ujn-spacing-xl' },
          ]}
        />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os três vazios do jornal, renderizados com o componente real."
    />
    <UjnDocStage label="Cenários" surface="page" align="flex-start" padding={16}>
      {(Object.keys(CENARIOS) as Cenario[]).map((chave) => (
        <div key={chave} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>{CENARIOS[chave].title}</p>
          <TelaVazia cenario={chave} scale={0.5} />
        </div>
      ))}
    </UjnDocStage>
    <UjnDocStage label="Composição mínima" surface="card" align="flex-start" padding={16} width="100%">
      <div style={{ flex: '1 1 260px' }}>
        <p style={notaEstilo}>sem glifo, sem apoio e sem ação</p>
        <EmptyState title="Sem comentários" />
      </div>
      <div style={{ flex: '1 1 260px' }}>
        <p style={notaEstilo}>headingLevel=3, com glifo e apoio</p>
        <EmptyState icon="letters" title="Nenhuma carta ainda" description="Seja a primeira pessoa a escrever." headingLevel={3} />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como escrever um vazio." />
    <UjnDocPractices
      dos={[
        'Dizer o que aconteceu no título e como resolver no apoio.',
        'Oferecer uma ação que leve a pessoa adiante (voltar à capa, limpar a busca).',
        'Escolher o glifo que descreve o conteúdo ausente (marcador, lupa, edição).',
        'Usar headingLevel 3 quando o vazio mora dentro de uma seção que já tem h2.',
        'Manter o texto curto: duas linhas de apoio, no máximo.',
      ]}
      donts={[
        'Deixar a região em branco: parece quebrada.',
        'Usar o EmptyState para erro de rede ou de carregamento: o erro merece mensagem própria.',
        'Pôr mais de uma ação primária: o vazio resolve-se de um jeito só.',
        'Contar com o glifo para comunicar: ele é decorativo.',
        'Desenhar um medalhão à mão com outro ícone: o glifo vem do registro.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Medalhão, texto e ação acompanham o tema."
    />
    <UjnDocThemeSwitcher surface="page" padding={16}>
      {(tema) => <TelaVazia key={tema} theme={tema} />}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do EmptyState. Os demais atributos vão ao contêiner."
    />
    <UjnDocPropsTable
      title="EmptyState"
      rows={[
        { name: 'icon', type: 'UjnIconName', description: 'Glifo do registro em 32px, no medalhão. Sem ele, não há medalhão.' },
        { name: 'title', type: 'ReactNode', description: 'Título curto que nomeia o vazio. Obrigatório.' },
        { name: 'description', type: 'ReactNode', description: 'Texto de apoio: o que aparece aqui e como preencher.' },
        { name: 'action', type: 'ReactNode', description: 'Ação que resolve o vazio — em geral um Button.' },
        { name: 'headingLevel', type: '2 | 3', default: '2', description: 'Nível do título no documento.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className / ref', type: 'string / Ref<HTMLDivElement>', description: 'Classe e ref do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof EmptyState> = {
  title: 'Unoojornal/Componentes/EmptyState',
  component: EmptyState,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: { control: 'text', description: 'Glifo do registro (ex.: bookmark, search, edition).' },
    title: { control: 'text', description: 'Título que nomeia o vazio.' },
    description: { control: 'text', description: 'Texto de apoio.' },
    action: { control: false, description: 'Ação que resolve o vazio (a estória usa um Button).' },
    headingLevel: { control: 'radio', options: [2, 3], description: 'Nível do título no documento.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    icon: 'bookmark',
    title: CENARIOS.salvas.title,
    description: CENARIOS.salvas.description,
    headingLevel: 2,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <EmptyStateDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do EmptyState',
  render: (args) => (
    <div style={{ background: 'var(--ujn-color-background-page)', padding: 16 }} data-ujn-theme={args.theme}>
      <EmptyState {...args} action={<Button variant="secondary">Ir para a capa</Button>} />
    </div>
  ),
};

/**
 * Composição realista: a lista de leitura vazia, na tela do aparelho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: lista de leitura vazia',
  render: () => <TelaVazia scale={0.75} />,
};

/**
 * Os três vazios do jornal.
 */
export const Tamanhos: Story = {
  name: 'Cenários',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(Object.keys(CENARIOS) as Cenario[]).map((chave) => (
        <div key={chave} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>{CENARIOS[chave].title}</p>
          <TelaVazia cenario={chave} scale={0.55} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Do vazio completo ao mínimo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16, background: 'var(--ujn-color-background-card)', padding: 16 }}>
      <EmptyState
        icon="search"
        title="Nada encontrado"
        description="Confira a grafia ou tente uma palavra mais geral."
        action={<Button variant="secondary">Limpar a busca</Button>}
      />
      <EmptyState icon="letters" title="Nenhuma carta ainda" description="Seja a primeira pessoa a escrever." />
      <EmptyState title="Sem comentários" />
    </div>
  ),
};

/**
 * Nível do título: h2 e h3.
 */
export const Estados: Story = {
  name: 'Nível do título',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', background: 'var(--ujn-color-background-card)', padding: 16 }}>
      <EmptyState icon="bookmark" title="headingLevel 2 (padrão)" />
      <EmptyState icon="bookmark" title="headingLevel 3" headingLevel={3} />
    </div>
  ),
};

/**
 * O vazio nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>{tema === 'light' ? 'Tema claro' : 'Tema escuro'}</p>
          <TelaVazia theme={tema} />
        </div>
      ))}
    </div>
  ),
};

/**
 * O título é um cabeçalho, o glifo é decorativo e a ação funciona.
 */
export const AcaoDoVazio: Story = {
  name: 'Título, glifo decorativo e ação',
  render: () => <TelaVazia scale={0.75} aoAcionar={irParaCapaSpy} />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    // O título nomeia o vazio como cabeçalho; o glifo não entra na árvore de acessibilidade.
    const titulo = tela.getByRole('heading', { name: CENARIOS.salvas.title });
    await expect(titulo.tagName).toBe('H2');
    const medalhao = titulo.parentElement?.querySelector('.ujn-empty-state__medallion');
    await expect(medalhao).toHaveAttribute('aria-hidden', 'true');

    await userEvent.click(tela.getByRole('button', { name: CENARIOS.salvas.acao }));
    await expect(irParaCapaSpy).toHaveBeenCalledTimes(1);
  },
};
