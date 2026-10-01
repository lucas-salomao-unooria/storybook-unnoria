import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { EmptyState } from '../../../src/unooblog/components/EmptyState';
import { Button } from '../../../src/unooblog/components/Button';
import { Logo } from '../../../src/unooblog/components/Logo';
import { PhoneFrame } from '../../../src/unooblog/components/PhoneFrame';
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
import { notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Espião da ação "Explorar posts" da estória de interação. */
const explorarSpy = fn();

/**
 * Os vazios do blog: o que a tela diz quando não há o que mostrar.
 */
const CENARIOS = {
  salvas: {
    icon: 'bookmark',
    title: 'Nenhum post salvo',
    description: 'Toque no marcador de um post para guardá-lo aqui e ler com calma depois.',
    acao: 'Explorar posts',
  },
  busca: {
    icon: 'search',
    title: 'Nada encontrado',
    description: 'Não achamos posts para essa busca. Confira a grafia ou tente uma palavra mais geral.',
    acao: 'Limpar a busca',
  },
  topico: {
    icon: 'topics',
    title: 'Este tópico ainda não tem posts',
    description: 'Assim que alguém publicar, os posts aparecem aqui.',
    acao: 'Ver todos os tópicos',
  },
} as const;

type Cenario = keyof typeof CENARIOS;

/**
 * Vazio de demonstração dentro de uma tela do aparelho, sob a marca do blog,
 * com a ação que resolve o vazio.
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
          padding: 'calc(var(--ubl-safe-area-top) + var(--ubl-spacing-l)) var(--ubl-gutter) var(--ubl-safe-area-bottom)',
          background: 'var(--ubl-color-background-page)',
        }}
      >
        <Logo height={24} decorative />
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
      badgeBrand="Unooblog"
      category="Componentes • Avisos"
      title="EmptyState"
      description="O que a tela mostra quando não há o que mostrar: nenhum post salvo, busca sem resultado, tópico sem posts. Glifo num medalhão circular, título, texto de apoio e a ação que resolve o vazio."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Um vazio explicado é um vazio resolvido."
    />
    <UblDocGrid>
      <UblDocCard icon="🔖" title="Nenhum post salvo">
        A lista de leitura nasce vazia. O estado diz como preenchê-la e leva a pessoa de volta ao feed.
      </UblDocCard>
      <UblDocCard icon="🔍" title="Busca sem resultado">
        Em vez de uma tela em branco, explica o que aconteceu e oferece limpar a busca.
      </UblDocCard>
      <UblDocCard icon="🗂️" title="Tópico sem posts">
        Um tópico novo ainda sem posts não parece quebrado: parece à espera de quem escreve.
      </UblDocCard>
      <UblDocCard icon="🙈" title="Glifo decorativo">
        O ícone é <code>aria-hidden</code>: quem informa é o título, em um <code>&lt;h2&gt;</code>{' '}
        (ou <code>&lt;h3&gt;</code>, com <code>headingLevel</code>).
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UblDocSpecs
      component="EmptyState"
      layout="Coluna centralizada · medalhão de 80px · texto até 360px"
      specs={[
        { label: 'Medalhão', value: '80px · círculo · --ubl-color-background-subtle' },
        { label: 'Glifo', value: 'Icon lg (32px) · --ubl-color-icon-accent' },
        { label: 'Título', value: 'heading-4 (20/30, 600) · --ubl-color-text-primary' },
        { label: 'Apoio', value: 'body-md (14/20) · --ubl-color-text-secondary' },
        { label: 'Ação', value: 'margem de --ubl-spacing-xl acima' },
        { label: 'Recuo', value: '--ubl-spacing-4xl · --ubl-gutter' },
        { label: 'Servidor', value: 'Server Component: só recebe props' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Medalhão em background-subtle',
          detail:
            'o círculo usa a camada sutil da escada (página → cartão → sutil), sem contorno nem sombra. O glifo acompanha o tom de acento do ícone. O medalhão é circular, como os demais controles do blog.',
        },
        {
          subject: 'Título em heading-4',
          detail:
            'o jornal usa title-md (20/28, 700); o blog usa heading-4 (20/30, 600), o mesmo degrau do título de Modal e BottomSheet, para que as peças de aviso e de camada falem com a mesma voz.',
        },
        {
          subject: 'Glifo opcional',
          detail:
            'icon é opcional: um vazio de texto puro ("Sem comentários") dispensa o medalhão. Quando presente, é decorativo (aria-hidden) — o título informa.',
        },
        {
          subject: 'Glifo de 32px, e não 48px',
          detail:
            'a grade de ícones do blog termina em 32px (Icon lg). O medalhão de 80px dá ao glifo 24px de folga de cada lado, em escala de página de leitura.',
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
    <UblDocStage surface="page" align="flex-start" padding={16}>
      <TelaVazia />
      <div style={{ flex: '1 1 320px' }}>
        <UblDocAnatomy
          zones={[
            { name: 'Medalhão', role: 'Círculo com o glifo, decorativo (aria-hidden).', token: '--ubl-color-background-subtle' },
            { name: 'Título', role: 'Cabeçalho que nomeia o vazio.', token: '--ubl-font-heading-4-*' },
            { name: 'Apoio', role: 'O que aparece aqui e como preencher.', token: '--ubl-font-body-md-*' },
            { name: 'Ação', role: 'Slot para o botão que resolve o vazio.', token: '--ubl-spacing-xl' },
          ]}
        />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os três vazios do blog, renderizados com o componente real."
    />
    <UblDocStage label="Cenários" surface="page" align="flex-start" padding={16}>
      {(Object.keys(CENARIOS) as Cenario[]).map((chave) => (
        <div key={chave} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>{CENARIOS[chave].title}</p>
          <TelaVazia cenario={chave} scale={0.5} />
        </div>
      ))}
    </UblDocStage>
    <UblDocStage label="Composição mínima" surface="card" align="flex-start" padding={16} width="100%">
      <div style={{ flex: '1 1 260px' }}>
        <p style={notaEstilo}>sem glifo, sem apoio e sem ação</p>
        <EmptyState title="Sem comentários" />
      </div>
      <div style={{ flex: '1 1 260px' }}>
        <p style={notaEstilo}>headingLevel=3, com glifo e apoio</p>
        <EmptyState icon="comments" title="Ainda não há comentários" description="Seja a primeira pessoa a comentar." headingLevel={3} />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como escrever um vazio." />
    <UblDocPractices
      dos={[
        'Dizer o que aconteceu no título e como resolver no apoio.',
        'Oferecer uma ação que leve a pessoa adiante (voltar ao feed, limpar a busca).',
        'Escolher o glifo que descreve o conteúdo ausente (marcador, lupa, tópicos).',
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
    <UblDocThemeSwitcher surface="page" padding={16}>
      {(tema) => <TelaVazia key={tema} theme={tema} />}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do EmptyState. Os demais atributos vão ao contêiner."
    />
    <UblDocPropsTable
      title="EmptyState"
      rows={[
        { name: 'icon', type: 'UblIconName', description: 'Glifo do registro em 32px, no medalhão. Sem ele, não há medalhão.' },
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
  title: 'Unooblog/Componentes/EmptyState',
  component: EmptyState,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: { control: 'text', description: 'Glifo do registro (ex.: bookmark, search, topics).' },
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
    <div style={{ background: 'var(--ubl-color-background-page)', padding: 16 }} data-ubl-theme={args.theme}>
      <EmptyState {...args} action={<Button variant="secondary">Explorar posts</Button>} />
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
 * Os três vazios do blog.
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
    <div style={{ display: 'grid', gap: 16, background: 'var(--ubl-color-background-card)', padding: 16 }}>
      <EmptyState
        icon="search"
        title="Nada encontrado"
        description="Confira a grafia ou tente uma palavra mais geral."
        action={<Button variant="secondary">Limpar a busca</Button>}
      />
      <EmptyState icon="comments" title="Ainda não há comentários" description="Seja a primeira pessoa a comentar." />
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
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', background: 'var(--ubl-color-background-card)', padding: 16 }}>
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
  render: () => <TelaVazia scale={0.75} aoAcionar={explorarSpy} />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    // O título nomeia o vazio como cabeçalho; o glifo não entra na árvore de acessibilidade.
    const titulo = tela.getByRole('heading', { name: CENARIOS.salvas.title });
    await expect(titulo.tagName).toBe('H2');
    const medalhao = titulo.parentElement?.querySelector('.ubl-empty-state__medallion');
    await expect(medalhao).toHaveAttribute('aria-hidden', 'true');

    await userEvent.click(tela.getByRole('button', { name: CENARIOS.salvas.acao }));
    await expect(explorarSpy).toHaveBeenCalledTimes(1);
  },
};
