import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Masthead } from '../../../src/unoojornal/components/Masthead';
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

const LARGURAS = [
  { rotulo: 'Largo (1280px)', largura: 1280 },
  { rotulo: 'Médio (720px)', largura: 720 },
  { rotulo: 'Compacto (390px)', largura: 390 },
] as const;

const Legenda: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ margin: '0 0 4px', fontFamily: 'var(--ujn-font-sans)', fontSize: 12, color: 'var(--ujn-color-text-secondary)' }}>
    {children}
  </p>
);

/**
 * Página de documentação rica do componente Masthead.
 */
const MastheadDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Cabeçalho e navegação"
      title="Masthead"
      description="O nome da publicação: título em Open Sans bold, lema abaixo e o fio duplo da tinta fechando o bloco. É o `h1` da capa — e a assinatura visual do jornal."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Um título, um lema, um fio."
    />
    <UjnDocGrid>
      <UjnDocCard icon="📰" title="Cabeçalho da capa">
        No tamanho <code>lg</code> o título usa a escala de masthead (60/78, bold) e o fio é duplo: é a
        marca de que a página é a capa do jornal.
      </UjnDocCard>
      <UjnDocCard icon="📑" title="Páginas internas">
        O tamanho <code>md</code> usa Title/Large (24/34) e <code>as=&quot;p&quot;</code> abre mão do{' '}
        <code>h1</code> — uma página tem um só.
      </UjnDocCard>
      <UjnDocCard icon="🔗" title="Título que leva à capa">
        Com <code>href</code> o título é um link, com foco visível e sublinhado no hover.
      </UjnDocCard>
      <UjnDocCard icon="📐" title="Alinhamento e fio">
        <code>align</code> centraliza ou alinha à esquerda; <code>rule</code> escolhe fio duplo, simples ou
        nenhum.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura herdada do cabeçalho `homepage-default` (`3:7`) do arquivo de referência."
    />
    <UjnDocSpecs
      component="Masthead"
      layout="Coluna centrada · título · lema · fio duplo de 6px"
      specs={[
        { label: 'Título lg (≥ 960px)', value: '--ujn-font-masthead-* (60/78, 700)' },
        { label: 'Título lg (< 960px)', value: '--ujn-font-headline-* (34/48), depois title-lg abaixo de 480px' },
        { label: 'Título md', value: '--ujn-font-title-lg-* (24/34, 700)' },
        { label: 'Lema', value: 'Body/Medium (16/24); ≥ 960px, Body/Large (18/28)' },
        { label: 'Fio duplo', value: '--ujn-gradient-rule-double (3px · vão 2px · 1px)' },
        { label: 'Tinta', value: '--ujn-color-border-rule' },
        { label: 'Recuo lateral', value: '--ujn-gutter (16px) · --ujn-gutter-wide (80px) ≥ 960px' },
        { label: 'Fronteira', value: 'Server Component' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Serifa do Figma → Open Sans bold',
          detail:
            'o arquivo de referência desenha o nome do jornal em serifa; a identidade da Unooria usa Open Sans em todo o jornal, e o peso 700 carrega a hierarquia que a serifa carregava.',
        },
        {
          subject: 'Tinta do fio por tema',
          detail:
            '--ujn-color-border-rule é o roxo mais escuro no claro e o lilás mais claro no escuro, sempre ≥ 3:1 sobre a página; o fio duplo acompanha o tema sem token novo.',
        },
        {
          subject: 'Título reduzido por degraus, não por clamp()',
          detail:
            'o título de 60px não cabe em 390px; em vez de um valor fluido (sem token), o contêiner troca de degrau da escala tipográfica: 60 → 34 abaixo de 960px → 24 abaixo de 480px.',
        },
        {
          subject: 'Fio com o recuo do conteúdo',
          detail:
            'o fio não vai de borda a borda: usa a largura do conteúdo (menos a calha), como o fio do arquivo de referência.',
        },
        {
          subject: 'Uso do h1',
          detail:
            'as páginas de matéria têm o título da matéria como h1; nelas o Masthead usa as="p". O componente nunca decide isso sozinho.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Quatro zonas, de cima para baixo." />
    <UjnDocStage surface="page" align="stretch" direction="column" padding={16}>
      <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} />
      <UjnDocAnatomy
        zones={[
          { name: 'Título', role: 'Nome da publicação; o h1 da capa. Vira link com href.', token: '--ujn-font-masthead-*' },
          { name: 'Lema', role: 'Frase de apoio, em texto secundário.', token: '--ujn-color-text-secondary' },
          { name: 'Fio duplo', role: 'Fecha o cabeçalho; opcional (simples ou nenhum).', token: '--ujn-gradient-rule-double' },
        ]}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real em cada largura, tamanho, alinhamento e fio."
    />
    {LARGURAS.map(({ rotulo, largura }) => (
      <UjnDocStage key={rotulo} label={rotulo} surface="page" align="flex-start" padding={16}>
        <div style={{ width: largura, maxWidth: '100%' }}>
          <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} as="p" />
        </div>
      </UjnDocStage>
    ))}
    <UjnDocStage label="Tamanho (size)" surface="page" align="stretch" direction="column" padding={16}>
      <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} size="lg" as="p" />
      <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} size="md" as="p" />
    </UjnDocStage>
    <UjnDocStage label="Alinhamento (align) e fio (rule)" surface="page" align="stretch" direction="column" padding={16}>
      <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} align="start" size="md" as="p" />
      <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} size="md" rule="thin" as="p" />
      <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} size="md" rule="none" as="p" />
    </UjnDocStage>
    <UjnDocStage label="Título como link (href)" surface="page" align="stretch" direction="column" padding={16}>
      <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} size="md" href="#capa" as="p" />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Um cabeçalho que se lê de longe." />
    <UjnDocPractices
      dos={[
        'Usar um só h1 por página: o Masthead na capa, o título da matéria nas páginas de leitura (com as="p").',
        'Manter o lema numa linha ou duas; ele explica o jornal, não resume a edição.',
        'Ligar o título à capa (href) em todas as páginas internas.',
        'Deixar o fio duplo para a capa e o simples para as páginas internas.',
      ]}
      donts={[
        'Trocar a fonte do título por uma serifa ou por um logotipo em imagem: o nome precisa ser texto.',
        'Forçar font-size no título: a escala por contêiner já o reduz no compacto.',
        'Colocar dois Masthead com h1 na mesma página.',
        'Pôr o fio duplo em cartões e caixas laterais: ele só fecha o cabeçalho.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Texto e tinta do fio acompanham o tema." />
    <UjnDocThemeSwitcher surface="page" padding={16}>
      {(tema) => (
        <div style={{ width: '100%' }}>
          <Masthead theme={tema} title={ujnPublication.name} tagline={ujnPublication.tagline} as="p" />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do Masthead. Os demais atributos vão ao invólucro."
    />
    <UjnDocPropsTable
      title="Masthead"
      rows={[
        { name: 'title', type: 'ReactNode', description: 'Nome da publicação. Obrigatório.' },
        { name: 'tagline', type: 'ReactNode', description: 'Lema, abaixo do título.' },
        { name: 'align', type: "'center' | 'start'", default: "'center'", description: 'Alinhamento do título e do lema.' },
        { name: 'size', type: "'lg' | 'md'", default: "'lg'", description: 'lg: escala de masthead; md: Title/Large.' },
        { name: 'rule', type: "'double' | 'thin' | 'none'", default: "'double'", description: 'Fio sob o bloco.' },
        { name: 'href', type: 'string', description: 'Quando definido, o título é um link.' },
        { name: 'as', type: "'h1' | 'p'", default: "'h1'", description: 'Elemento do título.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional no invólucro.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Masthead> = {
  title: 'Unoojornal/Componentes/Masthead',
  component: Masthead,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Nome da publicação.' },
    tagline: { control: 'text', description: 'Lema, abaixo do título.' },
    align: { control: 'radio', options: ['center', 'start'], description: 'Alinhamento.' },
    size: { control: 'radio', options: ['lg', 'md'], description: 'Tamanho do título.' },
    rule: { control: 'radio', options: ['double', 'thin', 'none'], description: 'Fio sob o bloco.' },
    href: { control: 'text', description: 'Torna o título um link.' },
    as: { control: 'radio', options: ['h1', 'p'], description: 'Elemento do título.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: ujnPublication.name,
    tagline: ujnPublication.tagline,
    align: 'center',
    size: 'lg',
    rule: 'double',
    as: 'p',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Masthead>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MastheadDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Masthead',
  render: (args) => (
    <div data-ujn-theme={args.theme} style={{ background: 'var(--ujn-color-background-page)' }}>
      <Masthead {...args} />
    </div>
  ),
};

/**
 * Composição fiel à estrutura do cabeçalho da capa: título, lema e fio duplo.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: cabeçalho da capa',
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)' }}>
      <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} as="p" />
    </div>
  ),
};

/**
 * Os dois tamanhos e as três larguras de contêiner.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      {LARGURAS.map(({ rotulo, largura }) => (
        <div key={rotulo} style={{ width: largura, maxWidth: '100%' }}>
          <Legenda>{rotulo}</Legenda>
          <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} as="p" />
        </div>
      ))}
      <div>
        <Legenda>size=&quot;md&quot;</Legenda>
        <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} size="md" as="p" />
      </div>
    </div>
  ),
};

/**
 * Os três fios, os dois alinhamentos e o título como link.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      {(['double', 'thin', 'none'] as const).map((fio) => (
        <div key={fio}>
          <Legenda>rule=&quot;{fio}&quot;</Legenda>
          <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} size="md" rule={fio} as="p" />
        </div>
      ))}
      <div>
        <Legenda>align=&quot;start&quot;</Legenda>
        <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} size="md" align="start" as="p" />
      </div>
      <div>
        <Legenda>href</Legenda>
        <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} size="md" href="#capa" as="p" />
      </div>
    </div>
  ),
};

/**
 * Título como texto e título como link (com foco visível).
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <Masthead title={ujnPublication.name} size="md" rule="thin" as="p" />
      <Masthead title={ujnPublication.name} size="md" rule="thin" href="#capa" as="p" />
    </div>
  ),
};

/**
 * O cabeçalho nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} data-ujn-theme={tema} style={{ background: 'var(--ujn-color-background-page)' }}>
          <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} as="p" />
        </div>
      ))}
    </div>
  ),
};

/**
 * O título é o h1 da página e vira link com href.
 */
export const TituloEhH1: Story = {
  name: 'Título é o h1 e leva à capa',
  render: () => <Masthead title={ujnPublication.name} tagline={ujnPublication.tagline} href="#capa" />,
  play: async ({ canvasElement }) => {
    const cabecalho = within(canvasElement);
    const titulo = cabecalho.getByRole('heading', { level: 1, name: ujnPublication.name });
    await expect(titulo).toBeVisible();
    await expect(within(titulo).getByRole('link', { name: ujnPublication.name })).toHaveAttribute('href', '#capa');
    await expect(cabecalho.getByText(ujnPublication.tagline)).toBeVisible();
  },
};
