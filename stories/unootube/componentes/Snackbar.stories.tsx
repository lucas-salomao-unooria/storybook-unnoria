import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Button, Snackbar } from '../../../src/unootube';
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

const meta: Meta<typeof Snackbar> = {
  title: 'Unootube/Componentes/Snackbar',
  component: Snackbar,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean' },
    message: { control: 'text' },
    variant: { control: 'radio', options: ['default', 'danger'] },
    actionLabel: { control: 'text' },
    duration: { control: { type: 'number', min: 0, step: 500 } },
    floating: { control: 'boolean' },
    theme: { control: 'radio', options: ['dark', 'light'] },
    className: { control: 'text' },
    onAction: { action: 'onAction' },
    onClose: { action: 'onClose' },
  },
  args: {
    open: true,
    message: 'Salvo em "Assistir mais tarde"',
    variant: 'default',
    actionLabel: 'Desfazer',
    duration: 0,
    floating: false,
    theme: 'dark',
  },
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

const SnackbarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Extensões"
      title="Snackbar"
      description="Aviso flutuante do Unootube. É uma EXTENSÃO DECLARADA: as seis telas dos dois arquivos de origem são estáticas e nenhuma confirma uma ação. A forma vem da superfície interativa dos chips e do degrau Elevation/Medium, que o quadro de elevação descreve como “flutuante: menus suspensos e popovers”."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Por que existe, e por que não tem escada de severidade."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="💬" title="Confirma sem interromper">
        &ldquo;Salvo na playlist&rdquo;, &ldquo;Link copiado&rdquo;. Aviso que não exige decisão
        não pode roubar o foco — para o que exige decisão existe o <code>Modal</code>.
      </UniDocCard>
      <UniDocCard icon="🎨" title="Só dois tons, e é deliberado">
        O Unootube publica <strong>um</strong> vermelho semântico e nenhum verde, âmbar ou azul de
        estado. Uma escada de severidade exigiria inventar três famílias de cor que nenhum dos dois
        arquivos tem. Distinga sucesso de alerta pelo texto.
      </UniDocCard>
      <UniDocCard icon="⏸️" title="A contagem pausa">
        Enquanto o ponteiro está sobre o aviso ou a ação tem foco, o fechamento automático para.
        Sem isso, um aviso com ação some antes de ser acionável por teclado.
      </UniDocCard>
      <UniDocCard icon="🔊" title="Anunciado sem roubar o foco">
        <code>role=&quot;status&quot;</code> com <code>aria-live=&quot;polite&quot;</code>: o
        leitor de tela lê o aviso quando terminar o que está lendo, sem deslocar o cursor.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="A origem de cada medida e o registro completo de desvios."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="106:3214"
      frameName="Elevation (a única âncora publicada)"
      specs={[
        { label: 'Superfície', value: 'background/surface · #303030' },
        { label: 'Sombra', value: 'Elevation/Medium · 0 4 8 rgba(0,0,0,0.16)' },
        { label: 'Raio', value: '--uni-radius-sm (2px)' },
        { label: 'Altura mínima', value: '48px · largura máxima 568px' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'O componente inteiro é extensão',
          detail:
            'nenhum dos dois arquivos de origem publica aviso flutuante — as seis telas somadas não confirmam nenhuma ação. Foi acrescentado porque produto precisa confirmar sem interromper.',
        },
        {
          subject: 'Ausência de escada de severidade',
          detail:
            'o Unootube publica um único vermelho semântico e nenhum verde, âmbar ou azul de estado. Em vez de inventar três famílias de cor, o componente tem só os tons default e danger — e o danger marca a aresta em vez de tingir a superfície, porque não existe vermelho escuro publicado para fundo.',
        },
        {
          subject: 'Ação em caixa alta',
          detail:
            'o degrau Label/Large é Bold 14 sem transformação declarada. A caixa alta é convenção de rótulo de ação em aviso e foi acrescentada no CSS; remova a regra text-transform se o produto preferir a caixa do arquivo.',
        },
        {
          subject: 'Posição flutuante opcional',
          detail:
            'floating fixa o aviso no canto inferior esquerdo, onde o produto de referência o coloca. Vem desligado para que quem já tem uma região de avisos própria receba o componente em fluxo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Superfície',
          role: 'A mesma dos chips e da linha ativa, com a sombra do degrau médio.',
          token: '--uni-color-background-surface · --uni-elevation-medium',
        },
        {
          name: 'Mensagem',
          role: 'Texto em Body/Medium, na tinta primária.',
          token: '--uni-font-body-md-*',
        },
        {
          name: 'Ação',
          role: 'Rótulo em Label/Large no vermelho semântico, o único acento publicado.',
          token: '--uni-color-brand-primary',
        },
        {
          name: 'Aresta de perigo',
          role: 'Faixa de 4px no vermelho semântico, só no tom danger.',
          token: '--uni-spacing-4',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Os dois tons" surface="primary" direction="column" align="stretch" gap={16}>
      <Snackbar message='Salvo em "Assistir mais tarde"' actionLabel="Desfazer" duration={0} />
      <Snackbar
        variant="danger"
        message="Não foi possível salvar o vídeo"
        actionLabel="Tentar de novo"
        duration={0}
      />
    </UniDocStage>
    <UniDocStage label="Sem ação" surface="primary" align="stretch">
      <Snackbar message="Link copiado" duration={0} />
    </UniDocStage>
    <UniDocStage label="Mensagem longa, largura máxima de 568px" surface="primary" align="stretch">
      <Snackbar
        message="O vídeo foi removido da playlist e a alteração já vale para todos os dispositivos conectados a esta conta."
        actionLabel="Desfazer"
        duration={0}
      />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use para confirmar o que já aconteceu, com uma saída opcional — "Desfazer" é o caso canônico.',
        'Deixe duration em zero quando o aviso tiver ação: quem navega por teclado precisa de tempo.',
        'Escreva a severidade no texto, já que a marca não publica escada de cor de estado.',
        'Informe a prop theme quando o aviso for renderizado via portal, fora da árvore da tela.',
      ]}
      donts={[
        'Não use para o que exige decisão antes de continuar: isso é Modal.',
        'Não empilhe vários avisos — enfileire e mostre um de cada vez.',
        'Não invente verde ou âmbar: nenhum dos dois arquivos de origem publica cor de estado.',
        'Não coloque mais de uma ação: a faixa é de um alvo só.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="O aviso nos dois temas medidos do segundo arquivo de origem."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher>
      {() => (
        <Snackbar message='Salvo em "Assistir mais tarde"' actionLabel="Desfazer" duration={0} />
      )}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="Snackbar"
      rows={[
        { name: 'open', type: 'boolean', default: 'true', description: 'Controla a visibilidade. Fechado, não renderiza nada.' },
        { name: 'message', type: 'React.ReactNode', description: 'Texto do aviso. Obrigatório.' },
        { name: 'variant', type: "'default' | 'danger'", default: "'default'", description: 'Tom do aviso. São só dois: a marca não publica escada de severidade.' },
        { name: 'actionLabel', type: 'React.ReactNode', description: 'Rótulo da ação à direita. Sem ele, nenhuma ação é renderizada.' },
        { name: 'onAction', type: '() => void', description: 'Chamado ao acionar a ação. O aviso fecha em seguida.' },
        { name: 'duration', type: 'number', default: '5000', description: 'Milissegundos até o fechamento automático. 0 desliga.' },
        { name: 'onClose', type: '() => void', description: 'Chamado quando o aviso se fecha, por tempo ou por ação.' },
        { name: 'floating', type: 'boolean', default: 'false', description: 'Fixa o aviso no canto inferior esquerdo da janela.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema do nó raiz, para quando o aviso é renderizado via portal.' },
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
  render: () => <SnackbarDocumentationPage />,
};

/**
 * Playground com 100% das props do Snackbar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Snackbar',
  render: (args) => (
    <div
      data-uni-theme={args.theme ?? 'dark'}
      style={{ padding: 40, background: 'var(--uni-color-background-primary)' }}
    >
      <Snackbar {...args} />
    </div>
  ),
};

/**
 * O ciclo real: abrir, contar o tempo, pausar ao apontar e fechar.
 */
export const CicloCompleto: Story = {
  name: '🎬 Ciclo completo com fechamento automático',
  render: () => {
    const Demo = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <div
          data-uni-theme="dark"
          style={{
            padding: 40,
            minHeight: 220,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            alignItems: 'flex-start',
            background: 'var(--uni-color-background-primary)',
          }}
        >
          <Button onClick={() => setOpen(true)}>Salvar na playlist</Button>
          <Snackbar
            open={open}
            message='Salvo em "Assistir mais tarde"'
            actionLabel="Desfazer"
            duration={4000}
            onClose={() => setOpen(false)}
          />
        </div>
      );
    };

    return <Demo />;
  },
};

/**
 * Os dois tons publicados.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <Snackbar message='Salvo em "Assistir mais tarde"' actionLabel="Desfazer" duration={0} />
      <Snackbar
        variant="danger"
        message="Não foi possível salvar o vídeo"
        actionLabel="Tentar de novo"
        duration={0}
      />
      <Snackbar message="Link copiado" duration={0} />
    </div>
  ),
};
