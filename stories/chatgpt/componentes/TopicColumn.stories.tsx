import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TopicColumn } from '../../../src/chatgpt/components/TopicColumn';
import { PromptSuggestion } from '../../../src/chatgpt/components/PromptSuggestion';
import { gptIconNames } from '../../../src/chatgpt/components/Icon';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  GptDocCard,
  GptDocGrid,
  GptDocFigmaSpecs,
  GptDocPractices,
  GptDocPropsTable,
  GptDocStage,
  GptDocThemeSwitcher,
} from '../../../.storybook/components';
import { gptTopicColumns, gptWebClientNodes } from '../fixtures';

/**
 * As três colunas do arquivo, montadas com os componentes reais.
 */
const ColunasOficiais = () => (
  <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
    {gptTopicColumns.map((column) => (
      <TopicColumn key={column.title} icon={column.icon} title={column.title}>
        {column.items.map((item) => (
          <PromptSuggestion key={item} as={column.title === 'Examples' ? 'button' : 'div'}>
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
      badgeBrand="ChatGPT"
      category="Componentes • Layout"
      title="TopicColumn"
      description="Réplica de uma das três colunas da tela New chat - V1 - A: ícone de 32px, título Heading/H3 com 8px de intervalo, e abaixo a pilha de cartões com 16px entre eles. É o que estrutura a tela vazia em Examples, Capabilities e Limitations."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="A grade de três colunas da tela vazia."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="💬" title="Examples">
        Ícone <code>chats</code>. Cartões acionáveis que preenchem o compositor.
      </GptDocCard>
      <GptDocCard icon="✨" title="Capabilities">
        Ícone <code>stars</code>. Frases informativas sobre o que o assistente faz.
      </GptDocCard>
      <GptDocCard icon="🛡️" title="Limitations">
        Ícone <code>shieldWarning</code>. Ressalvas sobre o que ele não garante.
      </GptDocCard>
      <GptDocCard icon="🧱" title="Semântica correta">
        A coluna é uma <code>&lt;section&gt;</code> com título em <code>&lt;h2&gt;</code> — o
        arquivo mostra uma hierarquia, e é ela que o leitor de tela precisa ouvir.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas da instância Frame das três colunas."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptWebClientNodes.screenLight}
      frameName="Frame (State=Static, Vertical=True, Flip=True)"
      specs={[
        { label: 'Largura', value: '280px' },
        { label: 'Cabeçalho', value: '84px de altura · padding vertical 8' },
        { label: 'Ícone', value: '32 × 32 · size/icon-xl' },
        { label: 'Título', value: 'Inter Semi Bold · 18/28 (Heading/H3)' },
        { label: 'Ícone → título', value: '8px · spacing/4' },
        { label: 'Cabeçalho → cartões', value: '16px · spacing/6' },
      ]}
      deviations={[
        'No arquivo os cartões são posicionados em coordenadas absolutas (y = 100, 164 e 228) e o cabeçalho ocupa 84px. Aqui a coluna é um fluxo vertical único: os intervalos medidos foram preservados (16px do cabeçalho ao primeiro cartão e 16px entre cartões), e a coluna passa a sobreviver a títulos de outro comprimento.',
        'A grade da tela tem 40px entre as colunas — esse intervalo pertence ao contêiner, não ao componente, e é aplicado nas telas compostas.',
        'O título virou `<h2>` dentro de uma `<section>`. O arquivo não declara semântica; a hierarquia visual é inequívoca.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Cabeçalho centralizado e pilha de cartões."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="🎯" title="icon">
        Nome do registro <code>gptIcons</code>, renderizado a 32px e centralizado.
      </GptDocCard>
      <GptDocCard icon="🔤" title="title">
        O rótulo da coluna, em <code>Heading/H3</code>.
      </GptDocCard>
      <GptDocCard icon="🧩" title="iconNode">
        Substitui o ícone do registro por um nó arbitrário, para colunas que o arquivo não publica.
      </GptDocCard>
      <GptDocCard icon="📚" title="children">
        A pilha de cartões — normalmente três <code>PromptSuggestion</code>.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes"
      description="As três colunas publicadas e uma coluna sem cartões."
      barColor="#5856D6"
    />
    <GptDocStage label="As três colunas do arquivo" align="flex-start">
      <ColunasOficiais />
    </GptDocStage>
    <GptDocStage label="Somente o cabeçalho" align="flex-start">
      <TopicColumn icon="chats" title="Examples" />
      <TopicColumn icon="stars" title="Capabilities" />
      <TopicColumn icon="shieldWarning" title="Limitations" />
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de composição da tela vazia."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Manter as três colunas com 40px de intervalo, como faz a grade do arquivo.',
        'Usar o ícone que o arquivo associa a cada coluna — chats, stars e shieldWarning.',
        'Deixar acionáveis apenas os cartões da coluna Examples.',
        'Manter três cartões por coluna para preservar o equilíbrio da grade.',
      ]}
      donts={[
        'Repetir o mesmo ícone em duas colunas: ele é o que distingue os três temas.',
        'Trocar o título por um corpo menor que Heading/H3.',
        'Alinhar o cabeçalho à esquerda — o arquivo centraliza ícone e título.',
        'Misturar cartões acionáveis e informativos dentro de uma mesma coluna.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Ícone e título seguem text/primary; os cartões trocam de superfície."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher direction="column">
      {() => <ColunasOficiais />}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente TopicColumn."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="TopicColumn"
      rows={[
        { name: 'title', type: 'React.ReactNode', description: 'Título da coluna, em Heading/H3.' },
        {
          name: 'icon',
          type: 'GptIconName',
          description:
            'Ícone de 32px acima do título. O arquivo usa chats, stars e shieldWarning.',
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
  title: 'ChatGPT/Componentes/TopicColumn',
  component: TopicColumn,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título da coluna.' },
    icon: { control: 'select', options: gptIconNames, description: 'Ícone de 32px.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    title: 'Examples',
    icon: 'chats',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof TopicColumn>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#333333' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <TopicColumn {...args}>
        {gptTopicColumns[0].items.map((item) => (
          <PromptSuggestion key={item} as="button">
            {item}
          </PromptSuggestion>
        ))}
      </TopicColumn>
    </div>
  ),
};

/**
 * Réplica da grade de três colunas da tela de nova conversa.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ padding: 24, border: '1px solid #E4E8E9', borderRadius: 5 }}>
      <ColunasOficiais />
    </div>
  ),
};

/**
 * As três colunas publicadas, lado a lado.
 */
export const TodasVariantes: Story = {
  render: () => <ColunasOficiais />,
};
