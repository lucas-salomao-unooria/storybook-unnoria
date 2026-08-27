import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Button, EmptyState, SubscribeButton } from '../../../src/unootube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocAnatomy,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocThemeSwitcher,
} from '../../../.storybook/components';

const meta: Meta<typeof EmptyState> = {
  title: 'Unootube/Componentes/EmptyState',
  component: EmptyState,
  parameters: { layout: 'padded' },
  argTypes: {
    iconName: {
      control: 'select',
      options: ['watchLater', 'liked', 'library', 'subscriptions', 'history', 'search', 'yourVideos'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    compact: { control: 'boolean' },
    className: { control: 'text' },
  },
  args: {
    iconName: 'watchLater',
    title: 'Nenhum vídeo salvo ainda',
    description:
      'Os vídeos que você salvar em "Assistir mais tarde" aparecem aqui, em qualquer dispositivo conectado a esta conta.',
    compact: false,
  },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

const EmptyStateDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Extensões"
      title="EmptyState"
      description="Estado vazio do Unootube. É uma EXTENSÃO DECLARADA: as seis telas dos dois arquivos de origem estão todas cheias de conteúdo, e nenhuma mostra uma playlist sem vídeo ou uma busca sem resultado. A composição usa apenas degraus publicados."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Por que existe, e por que a ilustração é um slot."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="📭" title="O arquivo nunca fica vazio">
        As seis telas publicadas estão todas cheias. Playlist sem vídeo, busca sem resultado e
        canal sem inscrição são realidade de produto, não de mockup.
      </UniDocCard>
      <UniDocCard icon="🎨" title="Zero valor novo">
        Glifo da própria biblioteca de 52, título em <code>Heading/H3</code>, descrição em{' '}
        <code>Body/Medium</code> na tinta secundária e a calha de 16px. Nenhum token foi criado
        para este componente.
      </UniDocCard>
      <UniDocCard icon="🖼️" title="Ilustração como slot">
        <code>illustration</code> é um <code>ReactNode</code>, e não um caminho de imagem. É o que
        permite ao produto injetar a própria arte sem que a biblioteca embuta bitmap — a mesma
        regra que vale para todo o módulo.
      </UniDocCard>
      <UniDocCard icon="🔇" title="Glifo decorativo">
        O ícone não recebe rótulo acessível: o título já comunica o estado, e anunciá-lo só
        acrescentaria ruído ao leitor de tela.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="A origem de cada medida e o registro completo de desvios."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="106:3067"
      frameName="Typography (a escala emprestada)"
      specs={[
        { label: 'Título', value: 'Heading/H3 · 18/24 Bold' },
        { label: 'Descrição', value: 'Body/Medium em text/secondary' },
        { label: 'Glifo', value: '48px · 32px no modo compacto' },
        { label: 'Medida de linha', value: '480px na descrição' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'O componente inteiro é extensão',
          detail:
            'nenhum dos dois arquivos de origem publica estado vazio — as seis telas somadas estão todas cheias de conteúdo. Foi acrescentado porque produto tem playlist sem vídeo e busca sem resultado.',
        },
        {
          subject: 'Nenhum token novo',
          detail:
            'ao contrário do Modal, que precisou do véu, este componente não introduziu nenhum valor: título, descrição, glifo e espaçamento saem todos de degraus publicados.',
        },
        {
          subject: 'Medida de linha de 480px',
          detail:
            'a descrição é limitada a 480px, o intervalo confortável de leitura. Sem limite, ela atravessaria a largura da página e viraria uma linha só. O arquivo não publica medida de linha porque não publica parágrafo isolado.',
        },
        {
          subject: 'Ilustração como slot, não como imagem',
          detail:
            'illustration recebe um ReactNode em vez de um caminho, pelo mesmo motivo que vale para todo o módulo: nenhum bitmap integra o pacote.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Ilustração',
          role: 'Glifo da biblioteca ou arte própria, na tinta secundária.',
          token: '--uni-color-text-secondary',
        },
        {
          name: 'Título',
          role: 'Uma linha em Heading/H3, na tinta primária.',
          token: '--uni-font-heading-h3-*',
        },
        {
          name: 'Descrição',
          role: 'Body/Medium na tinta secundária, limitada a 480px de medida.',
          token: '--uni-font-body-md-*',
        },
        {
          name: 'Ação',
          role: 'Faixa opcional. Componha com Button ou SubscribeButton.',
          token: '--uni-spacing-8',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Completo — glifo, título, descrição e ação" surface="primary" align="stretch">
      <EmptyState
        iconName="watchLater"
        title="Nenhum vídeo salvo ainda"
        description='Os vídeos que você salvar em "Assistir mais tarde" aparecem aqui, em qualquer dispositivo conectado a esta conta.'
        action={<SubscribeButton label="Explorar vídeos" />}
      />
    </UniDocStage>
    <UniDocStage label="Compacto — dentro de uma coluna" surface="primary" align="stretch">
      <EmptyState
        compact
        iconName="search"
        title="Nenhum resultado"
        description="Tente outras palavras ou remova os filtros."
        action={<Button>Limpar filtros</Button>}
      />
    </UniDocStage>
    <UniDocStage label="Só título e descrição" surface="primary" align="stretch">
      <EmptyState
        title="Este canal ainda não publicou vídeos"
        description="Inscreva-se para receber uma notificação quando o primeiro chegar."
      />
    </UniDocStage>
    <UniDocStage label="Com ilustração própria no slot" surface="primary" align="stretch">
      <EmptyState
        illustration={
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
            <rect
              x="6"
              y="16"
              width="60"
              height="40"
              rx="4"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M30 30L46 36L30 42V30Z" fill="currentColor" />
          </svg>
        }
        title="Sua playlist está vazia"
        description="Adicione vídeos para assistir em sequência, sem precisar procurar de novo."
      />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Diga o que aconteceu no título e o que fazer na descrição — os dois papéis são distintos.',
        'Ofereça uma saída na faixa de ação sempre que existir uma: estado vazio sem caminho é beco.',
        'Use compact dentro de coluna ou cartão; o padrão é para página inteira.',
        'Escolha o glifo entre os 52 da biblioteca, ou injete a própria arte pelo slot illustration.',
      ]}
      donts={[
        'Não use para erro de carregamento: vazio e falha são estados diferentes e pedem textos diferentes.',
        'Não embuta bitmap no pacote — a ilustração entra por slot, como todas as imagens do módulo.',
        'Não escreva descrição longa: a medida é limitada a 480px por um motivo.',
        'Não desenhe um glifo novo para o estado vazio; use os que a biblioteca já tem.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="O estado vazio nos dois temas medidos do segundo arquivo de origem."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher align="stretch">
      {() => (
        <EmptyState
          iconName="watchLater"
          title="Nenhum vídeo salvo ainda"
          description='Os vídeos que você salvar em "Assistir mais tarde" aparecem aqui.'
          action={<SubscribeButton label="Explorar vídeos" />}
        />
      )}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="EmptyState"
      rows={[
        { name: 'iconName', type: 'UniIconName', description: 'Glifo acima do título, entre os 52 da biblioteca. Ignorado quando illustration é informado.' },
        { name: 'illustration', type: 'React.ReactNode', description: 'Arte própria no lugar do glifo. Slot, e não caminho de imagem: nenhum bitmap integra o pacote.' },
        { name: 'title', type: 'React.ReactNode', description: 'Título em Heading/H3. Obrigatório.' },
        { name: 'description', type: 'React.ReactNode', description: 'Descrição em Body/Medium, limitada a 480px de medida de linha.' },
        { name: 'action', type: 'React.ReactNode', description: 'Faixa de ação. Componha com Button ou SubscribeButton.' },
        { name: 'compact', type: 'boolean', default: 'false', description: 'Reduz espaçamentos e o glifo, para uso dentro de coluna ou cartão.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos são repassados ao elemento raiz.' },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <EmptyStateDocumentationPage />,
};

/**
 * Playground com 100% das props do EmptyState expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do EmptyState',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{ padding: 40, background: 'var(--uni-color-background-primary)' }}
    >
      <EmptyState {...args} />
    </div>
  ),
};

/**
 * Os casos reais de produto que o arquivo não desenha.
 */
export const Estados: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <EmptyState
        iconName="watchLater"
        title="Nenhum vídeo salvo ainda"
        description='Os vídeos que você salvar em "Assistir mais tarde" aparecem aqui.'
        action={<SubscribeButton label="Explorar vídeos" />}
      />
      <EmptyState
        compact
        iconName="search"
        title="Nenhum resultado"
        description="Tente outras palavras ou remova os filtros."
        action={<Button>Limpar filtros</Button>}
      />
      <EmptyState
        compact
        iconName="subscriptions"
        title="Você ainda não se inscreveu em nenhum canal"
      />
    </div>
  ),
};
