import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FeatureCard } from '../../../src/unooriaai/components/FeatureCard';
import { ChatInput, Icon, Tag } from '../../../src/unooriaai/components';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocAnatomy,
  UaiDocCard,
  UaiDocDecisions,
  UaiDocGrid,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocSpecs,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';
import { uaiFeatures } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente FeatureCard.
 */
const FeatureCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Catálogo"
      title="FeatureCard"
      description="Cartão de 240 × 120 com padding 16, gap 8, raio 12 e contorno translúcido, com título em Label/MD e descrição em Body/XS, ambos centralizados nos dois eixos. É o cartão de capacidade da tela de nova conversa."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão Geral & Casos de Uso"
      description="Um cartão de proposta, exibido em grade quando a conversa ainda está vazia."
    />
    <UaiDocGrid>
      <UaiDocCard icon="✨" title="Capacidades">
        O uso canônico: grade de cartões apresentando o que o assistente pode fazer —{' '}
        <em>Criar uma imagem</em>, <em>Pesquisar na web</em>, <em>Escrever ou programar</em>.
      </UaiDocCard>
      <UaiDocCard icon="🎯" title="Centralizado">
        Diferente do <code>AssistantCard</code>, o conteúdo é centralizado nos dois eixos, o que dá
        ao cartão peso de convite e não de item de lista.
      </UaiDocCard>
      <UaiDocCard icon="🖱️" title="Acionável">
        Com <code>as=&quot;button&quot;</code>, clicar preenche o compositor com o comando
        correspondente. Ganha realce no hover e anel de foco.
      </UaiDocCard>
      <UaiDocCard icon="📐" title="Medidas fixas">
        240 × 120 por padrão, para que a grade fique regular. Com <code>block</code>, a altura passa
        a acompanhar o conteúdo.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas e tokens do componente."
    />
    <UaiDocSpecs
      component="FeatureCard"
      layout="Coluna centralizada · 240 × 120"
      specs={[
        { label: 'Dimensões', value: '240 × 120' },
        { label: 'Padding', value: '16px · --uai-spacing-6' },
        { label: 'Gap', value: '8px · --uai-spacing-4' },
        { label: 'Raio', value: '12px · --uai-radius-lg' },
        { label: 'Contorno', value: '1px · --uai-fill-8' },
        { label: 'Alinhamento', value: 'center / center nos dois eixos' },
        { label: 'Título', value: 'Label/MD · --uai-text-primary' },
        { label: 'Descrição', value: 'Body/XS · --uai-text-soft-50 (6,42:1 claro · 8,64:1 escuro)' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Descrição em Body/XS',
          detail:
            'A descrição usa o degrau Body/XS (12/18) da escala da Plataforma Unooria, o mesmo do AssistantCard, e cabe em duas linhas dentro dos 120px de altura.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'Quando renderizado como button ou âncora, o hover usa --uai-fill-2 (descrição a 5,79:1 claro e 7,71:1 escuro sobre o realce) e o foco, um anel de 2px em --uai-border-brand.',
        },
        {
          subject: 'Sem slot de ícone',
          detail:
            'O cartão mantém só título e descrição. Um glifo junto ao título pode ser composto no próprio título, com o Icon do módulo.',
        },
        {
          subject: 'Contorno em vez de sombra',
          detail:
            'O cartão se separa da superfície por contorno translúcido de 1px, sem sombra.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do Componente"
      description="Título e descrição, centralizados."
    />
    <UaiDocAnatomy
      zones={[
        { name: 'title', role: 'Label/MD em text-primary, centralizado.', token: '--uai-text-primary' },
        {
          name: 'description',
          role: 'Body/XS. Pode ocupar duas linhas dentro dos 120px de altura.',
          token: '--uai-text-soft-50',
        },
        {
          name: 'Contorno',
          role: 'Fio de 1px translúcido — o mesmo tratamento do AssistantCard, sem sombra.',
          token: '--uai-fill-8',
        },
        {
          name: 'block',
          role: 'Largura de 100% e altura automática, para grades em que a coluna define a medida.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de Variantes e Composição"
      description="Cartão padrão, com glifo no título, acionável e em grade de tela vazia."
    />
    <UaiDocStage label="Padrão e sem descrição">
      <FeatureCard
        title="Título do recurso"
        description="Descrição curta do recurso ou da capacidade"
      />
      <FeatureCard title="Somente título" />
    </UaiDocStage>
    <UaiDocStage label="Com glifo da biblioteca no título">
      <FeatureCard
        title={
          <>
            <Icon name="sparkle" size={16} /> Sugestões
          </>
        }
        description="O glifo é composto no título com o Icon do módulo"
      />
    </UaiDocStage>
    <UaiDocStage label="Acionável">
      {uaiFeatures.slice(1, 4).map((item) => (
        <FeatureCard key={item.title} as="button" title={item.title} description={item.description} />
      ))}
    </UaiDocStage>
    <UaiDocStage label="Grade da tela de nova conversa" direction="column">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 12,
          width: '100%',
        }}
      >
        {uaiFeatures.map((item) => (
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
        <Tag glyph={<Icon name="sparkle" size={16} />}>Ideias</Tag>
        <Tag glyph={<Icon name="sparkle" size={16} />}>Pesquisa</Tag>
      </div>
      <ChatInput block />
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Boas Práticas"
      description="Regras de apresentação de capacidades."
    />
    <UaiDocPractices
      dos={[
        'Manter a descrição em até duas linhas, respeitando os 120px de altura.',
        'Passar as="button" quando clicar no cartão preencher o compositor.',
        'Usar block em grades responsivas, deixando a coluna definir a largura.',
        'Manter títulos paralelos entre os cartões de uma mesma grade (todos verbos, por exemplo).',
      ]}
      donts={[
        'Colocar mais de duas linhas de descrição no cartão de medidas fixas.',
        'Renderizar como div e adicionar onClick — o cartão fica inacessível por teclado.',
        'Usar o FeatureCard como item de lista: para isso existe o AssistantCard, alinhado à esquerda.',
        'Substituir o contorno translúcido por sombra.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a Temas"
      description="A superfície segue --uai-bg-primary e o contorno a escada translúcida (tinta roxa no claro, branco no escuro)."
    />
    <UaiDocThemeSwitcher>
      {() => (
        <>
          {uaiFeatures.slice(0, 3).map((item) => (
            <FeatureCard key={item.title} title={item.title} description={item.description} />
          ))}
        </>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente FeatureCard."
    />
    <UaiDocPropsTable
      title="FeatureCard"
      rows={[
        { name: 'title', type: 'React.ReactNode', description: 'Título do recurso, em Label/MD.' },
        {
          name: 'description',
          type: 'React.ReactNode',
          description: 'Descrição curta em Body/XS.',
        },
        {
          name: 'as',
          type: 'React.ElementType',
          default: "'div'",
          description: "Elemento raiz — use 'button' ou 'a' quando o cartão for acionável.",
        },
        {
          name: 'href / target / rel',
          type: 'string',
          description: 'Destino, alvo e relação do link quando as renderiza uma âncora.',
        },
        {
          name: 'type / disabled',
          type: "'button' | 'submit' | 'reset' / boolean",
          description: 'Tipo e desabilitação quando as renderiza um button.',
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
  title: 'UnooriaAI/Componentes/FeatureCard',
  component: FeatureCard,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título do recurso.' },
    description: { control: 'text', description: 'Descrição curta do recurso.' },
    as: {
      control: 'select',
      options: ['div', 'button', 'a'],
      description: 'Elemento raiz renderizado.',
    },
    href: { control: 'text', description: 'Destino do link (quando as="a").' },
    target: {
      control: 'select',
      options: [undefined, '_self', '_blank'],
      description: 'Alvo de navegação (quando as="a").',
    },
    rel: { control: 'text', description: 'Relação do link (quando as="a").' },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      description: 'Tipo do botão (quando as="button").',
    },
    disabled: { control: 'boolean', description: 'Desabilita o botão (quando as="button").' },
    block: { control: 'boolean', description: 'Ocupa toda a largura e libera a altura.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: 'Título do recurso',
    description: 'Descrição curta do recurso ou da capacidade',
    as: 'button',
    type: 'button',
    disabled: false,
    block: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof FeatureCard>;

/**
 * Documentação rica e completa do componente.
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
    <UaiDocStage theme={args.theme ?? 'light'} padding={48}>
      <FeatureCard {...args} />
    </UaiDocStage>
  ),
};

/**
 * O cartão na medida de 240 × 120.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UaiDocStage align="flex-start" width={272} padding={16}>
      <FeatureCard
        title="Título do recurso"
        description="Descrição curta do recurso ou da capacidade"
      />
    </UaiDocStage>
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
      {uaiFeatures.map((item) => (
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
