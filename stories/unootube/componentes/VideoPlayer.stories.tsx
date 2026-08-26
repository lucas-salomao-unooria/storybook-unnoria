import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { VideoPlayer } from '../../../src/unootube';
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
  UniDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { playerPoster } from '../fixtures';

const meta: Meta<typeof VideoPlayer> = {
  title: 'Unootube/Componentes/VideoPlayer',
  component: VideoPlayer,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    videoTitle: { control: 'text' },
    currentTime: { control: 'text' },
    duration: { control: 'text' },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    buffered: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    showInfo: { control: 'boolean' },
    className: { control: 'text' },
    onPlay: { action: 'onPlay' },
    onNext: { action: 'onNext' },
    onToggleSound: { action: 'onToggleSound' },
    onToggleCaptions: { action: 'onToggleCaptions' },
    onSettings: { action: 'onSettings' },
    onTheater: { action: 'onTheater' },
    onCast: { action: 'onCast' },
    onFullscreen: { action: 'onFullscreen' },
    onInfo: { action: 'onInfo' },
  },
  args: {
    src: playerPoster,
    alt: '',
    videoTitle: 'Video Title',
    currentTime: '5:07',
    duration: '15:28',
    progress: 0.33,
    buffered: 0.5,
    showInfo: true,
  },
};

export default meta;

type Story = StoryObj<typeof VideoPlayer>;

const VideoPlayerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Mídia"
      title="VideoPlayer"
      description="Reprodução do nó Media/VideoPlayer (18:1295). O arquivo o publica em duas larguras — 424×238 dentro do cartão horizontal do canal e 640×360 dentro do reprodutor completo —, sempre com a mesma geometria interna de controles: quem escala é o quadro, não a barra."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="As camadas do reprodutor e os dois vermelhos que convivem nele."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🔴" title="Dois vermelhos no mesmo quadro">
        A linha do tempo usa <code>#FC0D1C</code> (<code>red/600</code>) e o selo HD usa{' '}
        <code>#EE1A26</code> (<code>red/500</code>, o semântico). Os dois aparecem simultaneamente —
        é a prova de que não podem ser consolidados.
      </UniDocCard>
      <UniDocCard icon="🎚️" title="Três camadas na linha do tempo">
        Trilho a 20% de <code>#EAEAEA</code>, trecho carregado a 50% e reproduzido no vermelho de
        progresso. Todas as três são literais do arquivo.
      </UniDocCard>
      <UniDocCard icon="🌫️" title="Dois véus de 96px">
        Gradientes lineares de preto para transparente, no topo e na base do quadro. Servem para o
        título e os controles ficarem legíveis sobre qualquer imagem.
      </UniDocCard>
      <UniDocCard icon="🎛️" title="Nove controles vetoriais">
        Reproduzir, próximo, volume, relógio, legendas, qualidade, cinema, TV e tela cheia. Todos
        exportados da geometria resolvida do arquivo, com o traço de 1px a 10% que o próprio arquivo
        aplica.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="18:1295"
      frameName="Media/VideoPlayer"
      specs={[
        { label: 'Dimensões', value: '424 × 238 e 640 × 360' },
        { label: 'Linha do tempo', value: '3px · recuo 12px' },
        { label: 'Véus', value: '96px em cada extremidade' },
        { label: 'Relógio', value: 'Body/Small · altura 146,48%' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Glifos como geometria resolvida',
          detail:
            'os nove controles são operações booleanas cujo export SVG vem dominado pela máscara do traço decorativo. Foi usada a geometria de preenchimento resolvida (node.fillGeometry) — o resultado literal da operação — e o traço de 1px em preto a 10% é reproduzido separadamente no atributo stroke.',
        },
        {
          subject: 'Sombra local do selo HD',
          detail:
            'as letras “HD” carregam um drop shadow local de 1px em #560A0F, que não corresponde a nenhum degrau de elevação publicado. Por ser um efeito decorativo de um único nó, não foi tokenizado nem reproduzido.',
        },
        {
          subject: 'Pôster estático, não vídeo',
          detail:
            'o arquivo publica um quadro de vídeo como bitmap. O componente renderiza uma imagem de pôster com controles inertes: a reprodução real fica a cargo do produto, que liga os manipuladores a um <video>.',
        },
        {
          subject: 'Controles recolhidos em janelas estreitas',
          detail:
            'abaixo de 400px o grupo direito é reduzido ao botão de tela cheia. O arquivo não descreve esse comportamento, mas sem ele a barra quebraria em duas linhas.',
        },
        {
          subject: 'Altura de linha fracionária preservada',
          detail:
            'o relógio declara 146,48% sobre corpo 13, resultando em 19,04px. O valor foi mantido em vez de arredondado para os 18px do degrau Body/Small.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Pôster',
          role: 'Quadro de vídeo em 16:9, com a primitiva blue/400 como cor de espera.',
          token: '--uni-color-poster-placeholder',
        },
        {
          name: 'Véus',
          role: 'Dois gradientes de 96px, no topo e na base.',
          token: '--uni-gradient-player-top · -bottom',
        },
        {
          name: 'Cabeçalho',
          role: 'Título à esquerda e botão de informações à direita, a 14px do topo.',
          token: '--uni-font-body-md-*',
        },
        {
          name: 'Linha do tempo',
          role: 'Três camadas sobrepostas, recuadas 12px de cada aresta.',
          token: '--uni-color-player-track · -buffer · --uni-color-brand-progress',
        },
        {
          name: 'Barra de controles',
          role: 'Dois grupos de glifos com o relógio à esquerda.',
          token: '--uni-color-player-chrome',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: 640px" surface="primary" align="stretch">
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoPlayer src={playerPoster} videoTitle="Video Title" />
      </div>
    </UniDocStage>
    <UniDocStage label="A largura menor do arquivo: 424px" surface="primary" align="stretch">
      <div style={{ width: 424, maxWidth: '100%' }}>
        <VideoPlayer src={playerPoster} videoTitle="Video Title" />
      </div>
    </UniDocStage>
    <UniDocStage label="Progresso e carregamento" surface="primary" direction="column" align="stretch" gap={16}>
      {[
        { progress: 0, buffered: 0.2, label: 'Início' },
        { progress: 0.33, buffered: 0.5, label: 'Como no arquivo' },
        { progress: 0.85, buffered: 1, label: 'Quase ao fim' },
      ].map((state) => (
        <div key={state.label} style={{ width: 480, maxWidth: '100%' }}>
          <VideoPlayer
            src={playerPoster}
            videoTitle={state.label}
            progress={state.progress}
            buffered={state.buffered}
          />
        </div>
      ))}
    </UniDocStage>
    <UniDocStage label="Sem título e sem botão de informações" surface="primary" align="stretch">
      <div style={{ width: 480, maxWidth: '100%' }}>
        <VideoPlayer src={playerPoster} showInfo={false} />
      </div>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Ligue os manipuladores a um elemento <video> real: o componente é a camada de apresentação.',
        'Mantenha buffered maior ou igual a progress — o componente já garante isso internamente.',
        'Use a largura do contêiner para escalar o quadro; os controles têm tamanho fixo.',
        'Preserve os dois véus: são eles que garantem legibilidade sobre qualquer imagem.',
      ]}
      donts={[
        'Não troque o vermelho de progresso pelo vermelho semântico: os dois coexistem no quadro.',
        'Não redesenhe os glifos de controle — eles vêm da geometria resolvida do arquivo.',
        'Não remova o traço de 10% dos glifos: é o que os mantém legíveis sobre imagem clara.',
        'Não use os glifos de controle fora do reprodutor.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O reprodutor sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'deep']}>
      {() => (
        <div style={{ width: 480, maxWidth: '100%' }}>
          <VideoPlayer src={playerPoster} videoTitle="Video Title" />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="VideoPlayer"
      rows={[
        {
          name: 'src',
          type: 'string',
          description:
            'Endereço do quadro exibido como pôster. Os bitmaps do arquivo não integram o pacote.',
        },
        { name: 'alt', type: 'string', default: "''", description: 'Texto alternativo do pôster.' },
        {
          name: 'videoTitle',
          type: 'React.ReactNode',
          description: 'Título exibido no canto superior esquerdo, sobre o véu.',
        },
        {
          name: 'currentTime',
          type: 'string',
          default: "'5:07'",
          description: 'Tempo decorrido, exibido à esquerda da barra.',
        },
        {
          name: 'duration',
          type: 'string',
          default: "'15:28'",
          description: 'Duração total do vídeo.',
        },
        {
          name: 'progress',
          type: 'number',
          default: '0.33',
          description: 'Fração reproduzida da linha do tempo, de 0 a 1.',
        },
        {
          name: 'buffered',
          type: 'number',
          default: '0.5',
          description:
            'Fração carregada da linha do tempo. O componente garante que nunca seja menor que progress.',
        },
        {
          name: 'showInfo',
          type: 'boolean',
          default: 'true',
          description: 'Exibe o botão de informações no canto superior direito.',
        },
        {
          name: 'onPlay · onNext · onToggleSound · onToggleCaptions · onSettings · onTheater · onCast · onFullscreen · onInfo',
          type: '() => void',
          description: 'Manipuladores dos nove controles, na ordem em que aparecem na barra.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Demais atributos são repassados ao elemento raiz.',
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
  render: () => <VideoPlayerDocumentationPage />,
};

/**
 * Playground com 100% das props do VideoPlayer expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do VideoPlayer',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{ padding: 40, background: 'var(--uni-color-background-primary)' }}
    >
      <div style={{ width: 640, maxWidth: '100%', margin: '0 auto' }}>
        <VideoPlayer {...args} />
      </div>
    </div>
  ),
};

/**
 * Réplica visual do nó `Media/VideoPlayer` (18:1295), nas duas larguras do arquivo.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoPlayer src={playerPoster} videoTitle="Video Title" />
      </div>
      <div style={{ width: 424, maxWidth: '100%' }}>
        <VideoPlayer src={playerPoster} videoTitle="Video Title" />
      </div>
    </div>
  ),
};

/**
 * As duas larguras publicadas pelo arquivo.
 */
export const Tamanhos: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {[640, 424, 320].map((width) => (
        <div key={width}>
          <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 8 }}>
            {width}px
          </div>
          <div style={{ width, maxWidth: '100%' }}>
            <VideoPlayer src={playerPoster} videoTitle="Video Title" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Estados de progresso e carregamento da linha do tempo.
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
      {[
        { progress: 0, buffered: 0.2, title: 'Não iniciado' },
        { progress: 0.33, buffered: 0.5, title: 'Como no arquivo' },
        { progress: 0.85, buffered: 1, title: 'Totalmente carregado' },
      ].map((state) => (
        <div key={state.title} style={{ width: 480, maxWidth: '100%' }}>
          <VideoPlayer
            src={playerPoster}
            videoTitle={state.title}
            progress={state.progress}
            buffered={state.buffered}
          />
        </div>
      ))}
    </div>
  ),
};
