import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TopicColumn } from '../../../src/unooriaai/components/TopicColumn';
import { PromptSuggestion } from '../../../src/unooriaai/components/PromptSuggestion';
import { uaiIconNames } from '../../../src/unooriaai/components/Icon';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocCard,
  UaiDocGrid,
  UaiDocSpecs,
  UaiDocDecisions,
  UaiDocAnatomy,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';
import { uaiTopicColumns } from '../fixtures';

const BAR = '#716C98';

/**
 * As três colunas da tela vazia, montadas com os componentes reais.
 */
const ColunasOficiais = () => (
  <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
    {uaiTopicColumns.map((column, index) => (
      <TopicColumn key={column.title} icon={column.icon} title={column.title}>
        {column.items.map((item) => (
          <PromptSuggestion key={item} as={index === 0 ? 'button' : 'div'}>
            {item}
          </PromptSuggestion>
        ))}
      </TopicColumn>
    ))}
  </div>
);

/**
 * Página de documentação rica do componente TopicColumn.
 */
const TopicColumnDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Layout"
      title="TopicColumn"
      description="Uma das três colunas da tela vazia: ícone de 32px, título no degrau heading-h3 com 8px de intervalo, e abaixo a pilha de cartões com 16px entre eles. É o que estrutura a tela em “Exemplos”, “Capacidades” e “Limitações”."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="A grade de três colunas da tela vazia."
      barColor={BAR}
    />
    <UaiDocGrid>
      <UaiDocCard icon="💬" title="Exemplos">
        Ícone <code>chats</code>. Cartões acionáveis que preenchem o compositor.
      </UaiDocCard>
      <UaiDocCard icon="✨" title="Capacidades">
        Ícone <code>stars</code>. Frases informativas sobre o que o assistente faz.
      </UaiDocCard>
      <UaiDocCard icon="🛡️" title="Limitações">
        Ícone <code>shieldWarning</code>. Ressalvas sobre o que ele não garante.
      </UaiDocCard>
      <UaiDocCard icon="🧱" title="Semântica correta">
        A coluna é uma <code>&lt;section&gt;</code> com título em <code>&lt;h2&gt;</code> — a
        hierarquia visual é a mesma que o leitor de tela precisa ouvir.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações técnicas"
      description="Medidas e tokens consumidos pela coluna."
      barColor={BAR}
    />
    <UaiDocSpecs
      component="TopicColumn"
      layout="Coluna · 280px"
      specs={[
        { label: 'Largura', value: '280px' },
        { label: 'Cabeçalho', value: 'padding vertical 8 · ícone e título centralizados' },
        { label: 'Ícone', value: '32 × 32 · --uai-size-icon-xl' },
        { label: 'Título', value: 'Open Sans semibold · 18/28 · --uai-font-heading-h3-*' },
        { label: 'Ícone → título', value: '8px · --uai-spacing-4' },
        { label: 'Cabeçalho → cartões', value: '16px · --uai-spacing-6' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Fluxo vertical único',
          detail:
            'A coluna empilha cabeçalho e cartões em um fluxo só, com 16px entre eles, em vez de posicionar cada cartão por coordenada. Ela sobrevive a títulos e cartões de outro comprimento.',
        },
        {
          subject: 'Intervalo entre colunas',
          detail:
            'Os 40px entre as três colunas pertencem ao contêiner, não ao componente, e são aplicados nas telas compostas.',
        },
        {
          subject: 'Semântica',
          detail:
            'O título é um `<h2>` dentro de uma `<section>`, de modo que a tela vazia tem uma hierarquia navegável por leitor de tela.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Cabeçalho centralizado e pilha de cartões."
      barColor={BAR}
    />
    <UaiDocAnatomy
      zones={[
        { name: 'icon', role: 'Nome do registro de ícones, renderizado a 32px e centralizado.', token: '--uai-size-icon-xl' },
        { name: 'title', role: 'O rótulo da coluna, no degrau heading-h3.', token: '--uai-font-heading-h3-size' },
        { name: 'iconNode', role: 'Substitui o ícone do registro por um nó arbitrário, para colunas novas.' },
        { name: 'children', role: 'A pilha de cartões — normalmente três PromptSuggestion.' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes, Tamanhos e Estados"
      description="As três colunas da tela vazia e colunas sem cartões."
      barColor={BAR}
    />
    <UaiDocStage label="As três colunas" align="flex-start">
      <ColunasOficiais />
    </UaiDocStage>
    <UaiDocStage label="Somente o cabeçalho" align="flex-start">
      <TopicColumn icon="chats" title="Exemplos" />
      <TopicColumn icon="stars" title="Capacidades" />
      <TopicColumn icon="shieldWarning" title="Limitações" />
    </UaiDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de composição da tela vazia."
      barColor={BAR}
    />
    <UaiDocPractices
      dos={[
        'Manter as três colunas com 40px de intervalo.',
        'Usar o ícone de cada coluna — chats, stars e shieldWarning.',
        'Deixar acionáveis apenas os cartões da coluna “Exemplos”.',
        'Manter três cartões por coluna para preservar o equilíbrio da grade.',
      ]}
      donts={[
        'Repetir o mesmo ícone em duas colunas: ele é o que distingue os três temas.',
        'Trocar o título por um corpo menor que o degrau heading-h3.',
        'Alinhar o cabeçalho à esquerda — ícone e título são centralizados.',
        'Misturar cartões acionáveis e informativos dentro de uma mesma coluna.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Ícone e título seguem o texto primário; os cartões trocam de superfície."
      barColor={BAR}
    />
    <UaiDocThemeSwitcher direction="column">{() => <ColunasOficiais />}</UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente TopicColumn."
      barColor={BAR}
    />
    <UaiDocPropsTable
      title="TopicColumn"
      rows={[
        {
          name: 'title',
          type: 'React.ReactNode',
          description: 'Título da coluna, no degrau heading-h3.',
        },
        {
          name: 'icon',
          type: 'UaiIconName',
          description: 'Ícone de 32px acima do título: chats, stars ou shieldWarning.',
        },
        {
          name: 'iconNode',
          type: 'React.ReactNode',
          description: 'Substitui o ícone do registro por um nó arbitrário.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Cartões da coluna — normalmente três PromptSuggestion.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TopicColumn> = {
  title: 'UnooriaAI/Componentes/TopicColumn',
  component: TopicColumn,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título da coluna.' },
    icon: { control: 'select', options: uaiIconNames, description: 'Ícone de 32px.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: 'Exemplos',
    icon: 'chats',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof TopicColumn>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TopicColumnDocumentationPage />,
};

/**
 * Playground com todas as propriedades do TopicColumn expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TopicColumn',
  render: (args) => (
    <UaiDocStage theme={args.theme ?? 'light'} padding={48} align="flex-start">
      <TopicColumn {...args}>
        {uaiTopicColumns[0].items.map((item) => (
          <PromptSuggestion key={item} as="button">
            {item}
          </PromptSuggestion>
        ))}
      </TopicColumn>
    </UaiDocStage>
  ),
};

/**
 * A grade de três colunas da tela de nova conversa.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UaiDocStage align="flex-start">
      <ColunasOficiais />
    </UaiDocStage>
  ),
};

/**
 * As três colunas, lado a lado.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UaiDocStage align="flex-start">
      <ColunasOficiais />
    </UaiDocStage>
  ),
};
