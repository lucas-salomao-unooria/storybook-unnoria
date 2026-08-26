import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Icon, ShortsActionRail, SoundGlyph } from '../../../src/unootube';
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
import { shortsPlayerPoster } from '../fixtures';

const SHORTS_FILE =
  'https://www.figma.com/design/FlqnnoY0Mqdjic53twLAC1/Free-YouTube-Shorts-Mockups--Community-';

const meta: Meta<typeof ShortsActionRail> = {
  title: 'Unootube/Componentes/ShortsActionRail',
  component: ShortsActionRail,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['overlay', 'standalone'] },
    className: { control: 'text' },
  },
  args: {
    variant: 'overlay',
  },
};

export default meta;

type Story = StoryObj<typeof ShortsActionRail>;

/** Conjunto de ações do arquivo, no tamanho de glifo de cada variante. */
const Actions = ({ size }: { size: number }) => (
  <>
    <ShortsActionRail.Item
      icon={<Icon name="likedFill" size={size} />}
      label="245K"
      aria-label="Curtir"
    />
    <ShortsActionRail.Item
      icon={<Icon name="likedFill" size={size} rotate={180} />}
      label="Dislike"
      aria-label="Não curtir"
    />
    <ShortsActionRail.Item
      icon={<Icon name="shortsComment" size={size * 0.83} />}
      label="952"
      aria-label="Comentários"
    />
    <ShortsActionRail.Item
      icon={<Icon name="shortsShare" size={size * 0.78} />}
      label="Share"
      aria-label="Compartilhar"
    />
  </>
);

/** Fundo de mídia, para que a trilha sobreposta seja avaliada em contexto. */
const OnMedia: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      width: 220,
      height: 380,
      padding: 16,
      borderRadius: 8,
      backgroundImage: `url("${shortsPlayerPoster}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {children}
  </div>
);

const ShortsActionRailDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Shorts"
      title="ShortsActionRail"
      description="Reprodução da coluna de ações do reprodutor de Shorts nas duas formas que o arquivo publica: a trilha sobreposta ao vídeo da tela móvel (3:210) e a coluna de botões circulares ao lado do quadro na área de trabalho (3:453)."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Por que são duas formas, e por que os três blocos da coluna são slots."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🎯" title="O alvo muda de forma">
        Em <code>overlay</code> o alvo é o próprio glifo, branco e sem fundo — o contraste vem do véu
        do reprodutor. Em <code>standalone</code> é um círculo de 54px sobre a superfície interativa.
        Não é diferença de espaçamento.
      </UniDocCard>
      <UniDocCard icon="🧱" title="Três blocos, três intervalos">
        O arquivo separa reticências no topo, ações no meio e som na base, com intervalos diferentes
        entre eles. Modelá-los como <code>header</code> e <code>footer</code> evita recriar a coluna
        inteira para trocar um deles.
      </UniDocCard>
      <UniDocCard icon="🔄" title="Um polegar, dois usos">
        Curtir e não curtir usam o <strong>mesmo</strong> vetor, girado 180° pela prop{' '}
        <code>rotate</code>. Nenhum caminho foi duplicado com coordenadas reescritas.
      </UniDocCard>
      <UniDocCard icon="♿" title="Rótulo não é descrição">
        A contagem &ldquo;245K&rdquo; não diz o que a ação faz. Por isso cada item exige{' '}
        <code>aria-label</code> além do <code>label</code> visível.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="3:210"
      frameName="Frame 33"
      fileUrl={SHORTS_FILE}
      specs={[
        { label: 'overlay', value: '36px de largura · 20px entre ações · 4px glifo/rótulo' },
        { label: 'standalone', value: 'botões de 53,98px · coluna de 59px' },
        { label: 'Rótulo', value: 'Roboto Medium 12 branco' },
        { label: 'Topo e base', value: '2px acima · 16px abaixo do último rótulo' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Passo irregular na variante standalone',
          detail:
            'o arquivo posiciona as ações em coordenadas absolutas, com passo de 108,9px que inclui o rótulo. O componente usa um espaçamento único equivalente, para que a coluna sobreviva a rótulos de comprimento diferente.',
        },
        {
          subject: 'Estado acionado',
          detail:
            'o arquivo é estático e publica só o glifo em repouso. O estado active marca apenas a cor do glifo, sem introduzir forma nova, e declara aria-pressed.',
        },
        {
          subject: 'Glifos preenchidos e não os de contorno',
          detail:
            'a trilha usa likedFill do registro original — o mesmo vetor que o arquivo de Shorts exporta escalado por 1,5. shortsComment e shortsShare são novos: o arquivo original só publica share em contorno e não publica comentário nenhum.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'hover, foco e pressionado foram acrescentados usando apenas opacidade, escala e o anel de foco da própria marca.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Topo (header)',
          role: 'Menu de reticências, a 2px do grupo de ações.',
          token: '--uni-spacing-2',
        },
        {
          name: 'Grupo de ações',
          role: 'Curtir, não curtir, comentar e compartilhar, com 20px entre eles.',
          token: '--uni-shorts-rail-gap',
        },
        {
          name: 'Alvo',
          role: 'Glifo de 36px em overlay; círculo de 54px em standalone.',
          token: '--uni-shorts-rail-width · --uni-shorts-rail-button',
        },
        {
          name: 'Rótulo',
          role: 'Roboto Medium 12, sempre abaixo do glifo.',
          token: '--uni-font-caption-size · --uni-font-weight-medium',
        },
        {
          name: 'Base (footer)',
          role: 'Botão de som, a 16px do último rótulo.',
          token: '--uni-spacing-16',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="overlay — sobre o vídeo, como no arquivo" surface="primary">
      <OnMedia>
        <ShortsActionRail
          variant="overlay"
          header={<Icon name="more" size={24} style={{ color: '#FFFFFF' }} />}
          footer={
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                color: '#FFFFFF',
                background: 'var(--uni-color-shorts-sound-fill)',
                border: '1px solid #FFFFFF',
                borderRadius: 'var(--uni-radius-control)',
              }}
            >
              <SoundGlyph size={36} />
            </span>
          }
        >
          <Actions size={36} />
        </ShortsActionRail>
      </OnMedia>
    </UniDocStage>

    <UniDocStage label="standalone — ao lado do vídeo" surface="primary">
      <ShortsActionRail variant="standalone">
        <Actions size={24} />
      </ShortsActionRail>
    </UniDocStage>

    <UniDocStage label="Estado acionado" surface="primary" gap={40}>
      <OnMedia>
        <ShortsActionRail variant="overlay">
          <ShortsActionRail.Item
            icon={<Icon name="likedFill" size={36} />}
            label="245K"
            aria-label="Curtir"
            active
          />
          <ShortsActionRail.Item
            icon={<Icon name="likedFill" size={36} rotate={180} />}
            label="Dislike"
            aria-label="Não curtir"
          />
        </ShortsActionRail>
      </OnMedia>
      <ShortsActionRail variant="standalone">
        <ShortsActionRail.Item
          icon={<Icon name="likedFill" size={24} />}
          label="245K"
          aria-label="Curtir"
          active
        />
        <ShortsActionRail.Item
          icon={<Icon name="likedFill" size={24} rotate={180} />}
          label="Dislike"
          aria-label="Não curtir"
        />
      </ShortsActionRail>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Informe aria-label em todo item: a contagem visível não descreve a ação.',
        'Use overlay sobre mídia e standalone sobre superfície de página.',
        'Gire o polegar com rotate={180} para "não curtir", em vez de registrar outro vetor.',
        'Use header e footer para os blocos de topo e base — eles têm intervalos próprios.',
      ]}
      donts={[
        'Não misture as duas variantes na mesma coluna: o alvo muda de forma entre elas.',
        'Não use a trilha overlay sobre superfície clara — o glifo é branco por definição.',
        'Não substitua os glifos por outra biblioteca; todos vêm do export do Figma.',
        'Não coloque o botão de som dentro do grupo de ações: o arquivo o separa da base.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="A variante standalone é a única fora da mídia, e é a que muda com o tema. Os valores claros foram medidos no arquivo de Shorts."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher>
      {() => (
        <ShortsActionRail variant="standalone">
          <Actions size={24} />
        </ShortsActionRail>
      )}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="ShortsActionRail"
      rows={[
        {
          name: 'variant',
          type: "'overlay' | 'standalone'",
          default: "'overlay'",
          description: 'Trilha sobre o vídeo ou coluna de botões circulares ao lado dele.',
        },
        {
          name: 'header',
          type: 'React.ReactNode',
          description: 'Bloco fixado no topo. No arquivo é o menu de reticências.',
        },
        {
          name: 'footer',
          type: 'React.ReactNode',
          description: 'Bloco fixado na base. No arquivo é o botão de som.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Compõe com ShortsActionRail.Item.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Demais atributos são repassados ao elemento raiz.',
        },
      ]}
    />
    <UniDocPropsTable
      title="ShortsActionRail.Item"
      rows={[
        {
          name: 'icon',
          type: 'React.ReactNode',
          description: 'Glifo da ação. Componha com Icon — a trilha não escolhe glifo por nome.',
        },
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Rótulo sob o glifo. Sem ele, nenhuma linha é reservada.',
        },
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: 'Marca a ação como acionada. Declara aria-pressed e muda a cor do glifo.',
        },
        {
          name: 'aria-label',
          type: 'string',
          description: 'Rótulo acessível. Obrigatório quando o label visível é uma contagem.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
          description: 'Demais atributos são repassados ao <button>.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ShortsActionRailDocumentationPage />,
};

/**
 * Playground com 100% das props do ShortsActionRail expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ShortsActionRail',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      {args.variant === 'overlay' ? (
        <OnMedia>
          <ShortsActionRail {...args}>
            <Actions size={36} />
          </ShortsActionRail>
        </OnMedia>
      ) : (
        <ShortsActionRail {...args}>
          <Actions size={24} />
        </ShortsActionRail>
      )}
    </div>
  ),
};

/**
 * Réplica visual dos nós `3:210` (sobreposta) e `3:453` (ao lado).
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 48,
        flexWrap: 'wrap',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <OnMedia>
        <ShortsActionRail
          variant="overlay"
          header={<Icon name="more" size={24} style={{ color: '#FFFFFF' }} />}
        >
          <Actions size={36} />
        </ShortsActionRail>
      </OnMedia>
      <ShortsActionRail variant="standalone">
        <Actions size={24} />
      </ShortsActionRail>
    </div>
  ),
};

/**
 * As duas formas publicadas pelo arquivo.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 48,
        flexWrap: 'wrap',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      <div>
        <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 8 }}>
          overlay
        </div>
        <OnMedia>
          <ShortsActionRail variant="overlay">
            <Actions size={36} />
          </ShortsActionRail>
        </OnMedia>
      </div>
      <div>
        <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 8 }}>
          standalone
        </div>
        <ShortsActionRail variant="standalone">
          <Actions size={24} />
        </ShortsActionRail>
      </div>
    </div>
  ),
};
