import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { TopicCloud } from '../../../src/unooblog/components/TopicCloud';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocPractices,
  UblDocStage,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';
import { topicosComContagem } from './feed.demo';

const BAR = '#716C98';

/** Espião das estórias de interação. */
const selectSpy = fn();

/**
 * Nuvem com a seleção guardada pelo produto.
 */
const NuvemControlada: React.FC<{ inicial?: string; title?: string; onSelect?: (id: string) => void }> = ({
  inicial,
  title = 'Explore por tópico',
  onSelect,
}) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(inicial);
  return (
    <div style={{ width: 'min(560px, 100%)' }}>
      <TopicCloud
        topics={topicosComContagem}
        title={title}
        selectedId={selectedId}
        onSelect={(id) => {
          setSelectedId((atual) => (atual === id ? undefined : id));
          onSelect?.(id);
        }}
      />
    </div>
  );
};

/**
 * Página de documentação rica do componente TopicCloud.
 */
const TopicCloudDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Feed"
      title="TopicCloud"
      description="Nuvem de tópicos: uma região nomeada com chips em fluxo que quebram de linha pela largura. O chip selecionado liga aria-pressed e a contagem de posts aparece no próprio chip."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Filtro do feed e descoberta de assuntos."
    />
    <UblDocGrid>
      <UblDocCard icon="🏷️" title="Filtro por tópico">
        Escolher um chip filtra o feed; escolher o mesmo chip de novo devolve o <code>id</code> e o
        produto decide limpar o filtro.
      </UblDocCard>
      <UblDocCard icon="🔢" title="Contagem de posts">
        Cada tópico pode trazer quantos posts tem, no próprio chip.
      </UblDocCard>
      <UblDocCard icon="♿" title="Região nomeada">
        Com <code>title</code>, o título visível nomeia a <code>&lt;section&gt;</code>; sem ele,{' '}
        <code>ariaLabel</code>. A lista é uma <code>&lt;ul&gt;</code>, e o leitor de tela anuncia
        a quantidade de tópicos.
      </UblDocCard>
      <UblDocCard icon="🌊" title="Fluxo livre">
        Os chips correm em linha e quebram quando falta largura: a nuvem serve a um rodapé largo e
        a uma coluna lateral.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="TopicCloud"
      layout="Fluxo · largura do contêiner"
      specs={[
        { label: 'Chips', value: 'TopicChip md (cápsula, contorno em border-control ≥ 3:1)' },
        { label: 'Espaço', value: '8px entre chips (--ubl-spacing-xs)' },
        { label: 'Título', value: 'heading-4 · 20/30px · 600 · <h2> (ou <h3>)' },
        { label: 'Selecionado', value: 'aria-pressed + preenchimento de ação (no TopicChip)' },
        { label: 'Semântica', value: '<section aria-labelledby | aria-label> com <ul> e <li>' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Sem estado próprio',
          detail:
            'a seleção é sempre do produto (selectedId): a nuvem só mostra e avisa. Assim ela serve ao filtro do feed, à página de tópico e a qualquer outro uso sem duplicar a verdade.',
        },
        {
          subject: 'Tocar o selecionado devolve o mesmo id',
          detail:
            'onSelect recebe string, nunca null: quem quer “limpar o filtro” trata o id repetido, como a estória faz. Mudar a assinatura quebraria quem já passa (id: string) => void.',
        },
        {
          subject: 'Título nomeia a região',
          detail:
            'com title, a região usa aria-labelledby (o texto que a pessoa vê é o nome que o leitor de tela diz); sem title, aria-label. Os dois juntos nunca saem — o aria-label venceria o título no cálculo do nome.',
        },
        {
          subject: 'Client Component',
          detail: "repassa onSelect aos chips; por isso começa com 'use client'.",
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocStage label="Nuvem com título e seleção" surface="page" align="stretch" direction="column" width={560}>
      <NuvemControlada inicial="acessibilidade" />
    </UblDocStage>
    <UblDocAnatomy
      zones={[
        { name: 'Região', role: '<section> nomeada pelo título ou por aria-label.', token: 'aria-labelledby | aria-label' },
        { name: 'Título', role: 'Visível, opcional.', token: '--ubl-font-heading-4-*' },
        { name: 'Lista', role: '<ul> em fluxo, com quebra de linha.', token: '--ubl-spacing-xs' },
        { name: 'Chip', role: 'TopicChip com contagem e aria-pressed.', token: 'TopicChip' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Com e sem título, sem seleção, com seleção e sem contagem — componentes reais."
    />
    <UblDocStage label="Sem seleção, com título" surface="page" align="stretch" direction="column" width={560}>
      <TopicCloud topics={topicosComContagem} title="Explore por tópico" />
    </UblDocStage>
    <UblDocStage label="Selecionado, sem título (nomeada por ariaLabel)" surface="page" align="stretch" direction="column" width={560}>
      <TopicCloud topics={topicosComContagem} selectedId="educacao" ariaLabel="Tópicos do blog" />
    </UblDocStage>
    <UblDocStage label="Sem contagem" surface="page" align="stretch" direction="column" width={560}>
      <TopicCloud
        topics={topicosComContagem.map(({ id, label }) => ({ id, label }))}
        ariaLabel="Tópicos sem contagem"
      />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Guardar selectedId no produto e tratar o id repetido como “limpar o filtro”.',
        'Dar um title visível quando a nuvem abre uma seção; ariaLabel quando ela está em um rodapé.',
        'Passar a contagem quando ela ajuda a escolher; omitir quando é sempre a mesma.',
        'Manter os rótulos curtos: o chip não quebra o texto em duas linhas.',
      ]}
      donts={[
        'Usar a nuvem como navegação principal: para isso há o cabeçalho.',
        'Indicar a seleção só pela cor: o aria-pressed e o preenchimento já dizem.',
        'Passar title e ariaLabel esperando os dois: com title, só o título nomeia a região.',
        'Colocar dezenas de tópicos sem agrupar: a nuvem vira ruído.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Chips, contornos e título acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher surface="page">
      {() => <NuvemControlada inicial="programacao-web" />}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="TopicCloud"
      rows={[
        { name: 'topics', type: '{ id: string; label: string; count?: number }[]', description: 'Tópicos exibidos, na ordem recebida. Obrigatório.' },
        { name: 'selectedId', type: 'string', description: 'Tópico selecionado (controlado); liga aria-pressed.' },
        { name: 'onSelect', type: '(id: string) => void', description: 'Chamado com o id do chip tocado, inclusive o já selecionado.' },
        { name: 'title', type: 'string', description: 'Título visível; nomeia a região.' },
        { name: 'ariaLabel', type: 'string', default: "'Tópicos'", description: 'Nome da região quando não há title.' },
        { name: 'headingLevel', type: '2 | 3', default: '2', description: 'Nível do título.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos da <section>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TopicCloud> = {
  title: 'Unooblog/Componentes/TopicCloud',
  component: TopicCloud,
  parameters: { layout: 'padded' },
  argTypes: {
    topics: { control: 'object', description: 'Tópicos exibidos ({ id, label, count? }).' },
    selectedId: {
      control: 'select',
      options: [undefined, ...topicosComContagem.map((topic) => topic.id)],
      description: 'Tópico selecionado.',
    },
    onSelect: { action: 'onSelect', description: 'Chamado com o id do chip tocado.' },
    title: { control: 'text', description: 'Título visível da seção.' },
    ariaLabel: { control: 'text', description: 'Nome da região quando não há título.' },
    headingLevel: { control: 'radio', options: [2, 3], description: 'Nível do título.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    topics: topicosComContagem,
    title: 'Explore por tópico',
    ariaLabel: 'Tópicos',
    headingLevel: 2,
  },
};

export default meta;

type Story = StoryObj<typeof TopicCloud>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TopicCloudDocumentationPage />,
};

/**
 * Playground da nuvem, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TopicCloud',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} surface="page" align="stretch" direction="column" width={560}>
      <TopicCloud {...args} />
    </UblDocStage>
  ),
};

/**
 * O filtro do feed: a nuvem controlada pelo produto.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: filtro do feed',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={620}>
      <NuvemControlada />
    </UblDocStage>
  ),
};

/**
 * Do contêiner largo ao estreito: os chips quebram de linha.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[720, 420, 280].map((width) => (
        <UblDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" width={width}>
          <TopicCloud topics={topicosComContagem} title="Explore por tópico" selectedId="carreira" />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Com título, sem título e nível de título 3.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={560}>
      <TopicCloud topics={topicosComContagem} title="Com título (h2)" />
      <TopicCloud topics={topicosComContagem} title="Com título (h3)" headingLevel={3} />
      <TopicCloud topics={topicosComContagem} ariaLabel="Sem título visível" />
    </UblDocStage>
  ),
};

/**
 * Sem seleção, com seleção e sem contagem.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={560}>
      <TopicCloud topics={topicosComContagem} ariaLabel="Sem seleção" />
      <TopicCloud topics={topicosComContagem} ariaLabel="Com seleção" selectedId="acessibilidade" />
      <TopicCloud
        topics={topicosComContagem.map(({ id, label }) => ({ id, label }))}
        ariaLabel="Sem contagem"
        selectedId="escrita"
      />
    </UblDocStage>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UblDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="stretch" direction="column" width={460}>
          <TopicCloud topics={topicosComContagem} title="Explore por tópico" selectedId="educacao" />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: a região é nomeada pelo título, tocar um chip seleciona (com
 * `aria-pressed`) e tocar de novo devolve o mesmo `id` para o produto limpar.
 */
export const Selecao: Story = {
  name: 'Interação: seleção e aria-pressed',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={620}>
      <NuvemControlada onSelect={selectSpy} />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    selectSpy.mockClear();
    const canvas = within(canvasElement);

    // A região se chama pelo título; a lista tem um item por tópico.
    const regiao = canvas.getByRole('region', { name: 'Explore por tópico' });
    await expect(within(regiao).getAllByRole('listitem')).toHaveLength(topicosComContagem.length);

    const botoes = within(regiao).getAllByRole('button');
    await expect(botoes).toHaveLength(topicosComContagem.length);
    for (const botao of botoes) {
      await expect(botao).toHaveAttribute('aria-pressed', 'false');
    }

    // Tocar seleciona exatamente um chip.
    const acessibilidade = within(regiao).getByRole('button', { name: /Acessibilidade/ });
    await userEvent.click(acessibilidade);
    await expect(selectSpy).toHaveBeenLastCalledWith('acessibilidade');
    await expect(acessibilidade).toHaveAttribute('aria-pressed', 'true');
    await expect(within(regiao).getAllByRole('button', { pressed: true })).toHaveLength(1);

    // Trocar de chip move a seleção.
    const educacao = within(regiao).getByRole('button', { name: /Educação/ });
    await userEvent.click(educacao);
    await expect(selectSpy).toHaveBeenLastCalledWith('educacao');
    await expect(educacao).toHaveAttribute('aria-pressed', 'true');
    await expect(acessibilidade).toHaveAttribute('aria-pressed', 'false');

    // Tocar o selecionado devolve o mesmo id; o produto limpa o filtro.
    await userEvent.click(educacao);
    await expect(selectSpy).toHaveBeenLastCalledWith('educacao');
    await expect(educacao).toHaveAttribute('aria-pressed', 'false');
    await expect(selectSpy).toHaveBeenCalledTimes(3);
  },
};
