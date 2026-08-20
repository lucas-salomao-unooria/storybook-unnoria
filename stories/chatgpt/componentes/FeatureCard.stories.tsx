import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FeatureCard } from '../../../src/chatgpt/components/FeatureCard';
import { ChatInput, Tag } from '../../../src/chatgpt/components';
import { gptGlyphs } from '../../../src/chatgpt/tokens';
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
import { gptFeatures, gptFigmaNodes } from '../fixtures';

/**
 * Página de documentação rica do componente FeatureCard.
 */
const FeatureCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Componentes • Catálogo"
      title="FeatureCard"
      description="Réplica do componente FeatureCard da página 🟡 Design system: cartão de 240 × 120 com padding 16, gap 8, raio 12 e contorno translúcido de 8%, com título em Label/MD e descrição de 13px a 50% de opacidade, ambos centralizados nos dois eixos. É o cartão de capacidade da tela de nova conversa."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Um cartão de proposta, exibido em grade quando a conversa ainda está vazia."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="✨" title="Capacidades">
        O uso canônico: grade de cartões apresentando o que o assistente pode fazer —{' '}
        <em>Create an image</em>, <em>Search the web</em>, <em>Write or code</em>.
      </GptDocCard>
      <GptDocCard icon="🎯" title="Centralizado">
        Diferente do <code>GPTCard</code>, o conteúdo é centralizado nos dois eixos, o que dá ao
        cartão peso de convite e não de item de lista.
      </GptDocCard>
      <GptDocCard icon="🖱️" title="Acionável">
        Com <code>as=&quot;button&quot;</code>, clicar preenche o compositor com o prompt correspondente.
        Ganha hover a 2% e anel de foco.
      </GptDocCard>
      <GptDocCard icon="📐" title="Medidas fixas">
        240 × 120 por padrão, para que a grade fique regular. Com <code>block</code>, a altura passa
        a acompanhar o conteúdo.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do componente via Plugin API."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.featureCard}
      frameName="FeatureCard (componente único)"
      specs={[
        { label: 'Dimensões', value: '240 × 120' },
        { label: 'Padding', value: '16px · spacing/6' },
        { label: 'Gap', value: '8px · spacing/4' },
        { label: 'Raio', value: '12px · radius/lg' },
        { label: 'Contorno', value: '1px · preto a 8%' },
        { label: 'Alinhamento', value: 'CENTER/CENTER nos dois eixos' },
      ]}
      deviations={[
        'O corpo da descrição é 13px — valor literal do arquivo, entre os degraus Body/XS (12) e Body/SM (14). A altura de linha adotada é a de Body/SM (20px), a mais próxima da escala publicada.',
        'O arquivo não publica estado de hover nem de foco. Quando renderizado como button ou âncora, o hover usa --gpt-fill-2 e o foco um anel de 2px em border/brand.',
        'O arquivo não tem slot de ícone no cartão, ainda que a tela de nova conversa exiba glifos junto ao título. O componente mantém apenas título e descrição, como publicado.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Título e descrição, centralizados."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="🅰️" title="title">
        <code>Label/MD</code> em <code>text/primary</code>, centralizado.
      </GptDocCard>
      <GptDocCard icon="📄" title="description">
        13px a 50% de opacidade. Pode ocupar duas linhas dentro dos 120px de altura.
      </GptDocCard>
      <GptDocCard icon="▭" title="Contorno">
        1px a 8% — o mesmo tratamento do <code>GPTCard</code>, sem sombra.
      </GptDocCard>
      <GptDocCard icon="↔️" title="block">
        Largura de 100% e altura automática, para grades em que a coluna define a medida.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Composições"
      description="Cartão padrão, acionável e em grade de tela vazia."
      barColor="#5856D6"
    />
    <GptDocStage label="Padrão e sem descrição">
      <FeatureCard title="Feature Title" description="Short description of the feature or capability" />
      <FeatureCard title="Somente título" />
    </GptDocStage>
    <GptDocStage label="Acionável">
      {gptFeatures.slice(1, 4).map((item) => (
        <FeatureCard key={item.title} as="button" title={item.title} description={item.description} />
      ))}
    </GptDocStage>
    <GptDocStage label="Grade da tela de nova conversa" direction="column">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 12,
          width: '100%',
        }}
      >
        {gptFeatures.map((item) => (
          <FeatureCard
            key={item.title}
            as="button"
            block
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Tag glyph={gptGlyphs.sparkle}>Brainstorm</Tag>
        <Tag glyph={gptGlyphs.sparkle}>Research</Tag>
      </div>
      <ChatInput block />
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de apresentação de capacidades."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Manter a descrição em até duas linhas, respeitando os 120px de altura.',
        'Passar as="button" quando clicar no cartão preencher o compositor.',
        'Usar block em grades responsivas, deixando a coluna definir a largura.',
        'Manter títulos paralelos entre os cartões de uma mesma grade (todos verbos, por exemplo).',
      ]}
      donts={[
        'Colocar mais de duas linhas de descrição no cartão de medidas fixas.',
        'Renderizar como div e adicionar onClick — o cartão fica inacessível por teclado.',
        'Usar o FeatureCard como item de lista: para isso existe o GPTCard, alinhado à esquerda.',
        'Substituir o contorno de 8% por sombra.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A superfície segue bg/primary e o contorno a escada translúcida."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher>
      {() => (
        <>
          {gptFeatures.slice(0, 3).map((item) => (
            <FeatureCard key={item.title} title={item.title} description={item.description} />
          ))}
        </>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente FeatureCard."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="FeatureCard"
      rows={[
        { name: 'title', type: 'React.ReactNode', description: 'Título do recurso, em Label/MD.' },
        {
          name: 'description',
          type: 'React.ReactNode',
          description: 'Descrição curta em 13px a 50% de opacidade.',
        },
        {
          name: 'as',
          type: 'React.ElementType',
          default: "'div'",
          description: "Elemento raiz — use 'button' ou 'a' quando o cartão for acionável.",
        },
        {
          name: 'block',
          type: 'boolean',
          default: 'false',
          description:
            'Ocupa toda a largura disponível e libera a altura, em vez das medidas fixas de 240 × 120.',
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

const meta: Meta<typeof FeatureCard> = {
  title: 'ChatGPT/Componentes/FeatureCard',
  component: FeatureCard,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título do recurso.' },
    description: { control: 'text', description: 'Descrição curta do recurso.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura e libera a altura.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    title: 'Feature Title',
    description: 'Short description of the feature or capability',
    block: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof FeatureCard>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <FeatureCardDocumentationPage />,
};

/**
 * Playground com todas as propriedades do FeatureCard expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do FeatureCard',
  render: (args) => (
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <FeatureCard {...args} />
    </div>
  ),
};

/**
 * Réplica visual do componente publicado no Figma — 240 × 120.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ padding: 16, border: '1px solid #E4E8E9', borderRadius: 5, width: 272 }}>
      <FeatureCard title="Feature Title" description="Short description of the feature or capability" />
    </div>
  ),
};

/**
 * Grade de capacidades, como na tela de nova conversa.
 */
export const Grade: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 12,
        maxWidth: 760,
      }}
    >
      {gptFeatures.map((item) => (
        <FeatureCard
          key={item.title}
          as="button"
          block
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  ),
};
