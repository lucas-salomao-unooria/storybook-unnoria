import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { VideoPlayer, formatPlaybackTime } from '../../../src/unootube';
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
import { resolveBlobDuration, useDemoVideo } from '../useDemoVideo';

const meta: Meta<typeof VideoPlayer> = {
  title: 'Unootube/Componentes/VideoPlayer',
  component: VideoPlayer,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text' },
    poster: { control: 'text' },
    alt: { control: 'text' },
    videoTitle: { control: 'text' },
    autoPlay: { control: 'boolean' },
    loop: { control: 'boolean' },
    muted: { control: 'boolean' },
    preload: { control: 'radio', options: ['none', 'metadata', 'auto'] },
    playsInline: { control: 'boolean' },
    autoHideControls: { control: 'boolean' },
    showBigPlay: { control: 'boolean' },
    showInfo: { control: 'boolean' },
    currentTime: { control: 'text' },
    duration: { control: 'text' },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    buffered: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    className: { control: 'text' },
    onPlay: { action: 'onPlay' },
    onPause: { action: 'onPause' },
    onEnded: { action: 'onEnded' },
    onNext: { action: 'onNext' },
    onToggleCaptions: { action: 'onToggleCaptions' },
    onSettings: { action: 'onSettings' },
    onTheater: { action: 'onTheater' },
    onCast: { action: 'onCast' },
    onInfo: { action: 'onInfo' },
  },
  args: {
    poster: playerPoster,
    alt: '',
    videoTitle: 'Video Title',
    autoPlay: false,
    loop: false,
    muted: false,
    preload: 'metadata',
    playsInline: true,
    autoHideControls: true,
    showBigPlay: true,
    showInfo: true,
    currentTime: '5:07',
    duration: '15:28',
    progress: 0.33,
    buffered: 0.5,
  },
};

export default meta;

type Story = StoryObj<typeof VideoPlayer>;

/**
 * Reprodutor ligado ao vídeo sintético gerado no navegador.
 *
 * Enquanto o vídeo não estiver pronto — ou se o navegador não gravar vídeo —, o
 * componente cai automaticamente na réplica estática, e a estória continua
 * renderizando.
 */
const LiveVideoPlayer: React.FC<
  React.ComponentProps<typeof VideoPlayer> & { width?: number }
> = ({ width = 640, ...props }) => {
  const src = useDemoVideo('landscape');
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    if (src) resolveBlobDuration(videoRef.current);
  }, [src]);

  return (
    <div style={{ width, maxWidth: '100%' }}>
      <VideoPlayer {...props} src={src} videoRef={videoRef} />
    </div>
  );
};

/** Painel que espelha o estado do reprodutor, para provar que ele é real. */
const StateReadout: React.FC = () => {
  const src = useDemoVideo('landscape');
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [snapshot, setSnapshot] = React.useState({
    playing: false,
    muted: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
  });

  React.useEffect(() => {
    if (src) resolveBlobDuration(videoRef.current);
  }, [src]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 480, maxWidth: '100%' }}>
      <VideoPlayer
        src={src}
        poster={playerPoster}
        videoTitle="Estado ao vivo"
        loop
        videoRef={videoRef}
        onStateChange={(state) =>
          setSnapshot({
            playing: state.playing,
            muted: state.muted,
            currentTime: state.currentTime,
            duration: state.duration,
            progress: state.progress,
          })
        }
      />
      <dl
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: 8,
          margin: 0,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 12,
          color: 'var(--uni-color-text-secondary)',
        }}
      >
        <div>
          <dt>playing</dt>
          <dd style={{ margin: 0, color: 'var(--uni-color-text-primary)' }}>
            {String(snapshot.playing)}
          </dd>
        </div>
        <div>
          <dt>muted</dt>
          <dd style={{ margin: 0, color: 'var(--uni-color-text-primary)' }}>
            {String(snapshot.muted)}
          </dd>
        </div>
        <div>
          <dt>currentTime</dt>
          <dd style={{ margin: 0, color: 'var(--uni-color-text-primary)' }}>
            {formatPlaybackTime(snapshot.currentTime)}
          </dd>
        </div>
        <div>
          <dt>duration</dt>
          <dd style={{ margin: 0, color: 'var(--uni-color-text-primary)' }}>
            {Number.isFinite(snapshot.duration) && snapshot.duration > 0
              ? formatPlaybackTime(snapshot.duration)
              : '--:--'}
          </dd>
        </div>
        <div>
          <dt>progress</dt>
          <dd style={{ margin: 0, color: 'var(--uni-color-text-primary)' }}>
            {(snapshot.progress * 100).toFixed(0)}%
          </dd>
        </div>
      </dl>
    </div>
  );
};

const VideoPlayerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Mídia"
      title="VideoPlayer"
      description="Reprodução do nó Media/VideoPlayer (18:1295). O arquivo o publica em duas larguras — 424×238 dentro do cartão horizontal do canal e 640×360 dentro do reprodutor completo —, sempre com a mesma geometria interna de controles: quem escala é o quadro, não a barra. O arquivo desenha controles inertes; com uma fonte de vídeo, eles operam de verdade."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="As camadas do reprodutor, os dois vermelhos que convivem nele e os dois modos de operação."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="▶️" title="Dois modos, uma só aparência">
        Com <code>src</code> ou <code>sources</code>, monta um <code>&lt;video&gt;</code> e os nove
        controles do arquivo passam a comandar reprodução, busca, volume, legendas e tela cheia. Sem
        fonte, exibe o <code>poster</code> e a linha do tempo governada por prop — a réplica exata do
        quadro do Figma.
      </UniDocCard>
      <UniDocCard icon="🔴" title="Dois vermelhos no mesmo quadro">
        A linha do tempo usa <code>#FC0D1C</code> (<code>red/600</code>) e o selo HD usa{' '}
        <code>#EE1A26</code> (<code>red/500</code>, o semântico). Os dois aparecem simultaneamente —
        é a prova de que não podem ser consolidados.
      </UniDocCard>
      <UniDocCard icon="🎚️" title="Três camadas na linha do tempo">
        Trilho a 20% de <code>#EAEAEA</code>, trecho carregado a 50% e reproduzido no vermelho de
        progresso. Todas as três são literais do arquivo; com vídeo, as três passam a vir do
        elemento.
      </UniDocCard>
      <UniDocCard icon="⌨️" title="Teclado completo">
        <code>Espaço</code> e <code>K</code> alternam, <code>M</code> silencia, <code>F</code> abre a
        tela cheia, as setas buscam 5s e <code>J</code>/<code>L</code> buscam 10s. A linha do tempo é
        um <code>slider</code> focável, com <code>Home</code> e <code>End</code>.
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
          subject: 'Reprodução real',
          detail:
            'o arquivo publica um quadro de vídeo como bitmap, com controles desenhados e inertes. O componente ganhou um elemento <video> e uma máquina de estados (useVideoPlayback) que os nove controles comandam. Sem fonte de vídeo, nada disso é montado e o quadro volta a ser a réplica estática do arquivo.',
        },
        {
          subject: 'Migração de `src`',
          detail:
            'até a versão anterior `src` designava o quadro estático. Agora `src` é o vídeo e o quadro estático é `poster`. As composições internas (VideoPlayerFull, VideoCardHorizontal) foram migradas junto.',
        },
        {
          subject: 'Botão central, punho e régua de volume',
          detail:
            'o arquivo desenha o quadro sempre em reprodução, sem alvo central, sem punho na linha do tempo e sem régua de volume. Os três foram acrescentados usando exclusivamente tokens da própria marca, e os dois últimos só aparecem ao apontar — em repouso o quadro continua idêntico ao desenho.',
        },
        {
          subject: 'Recolhimento dos controles',
          detail:
            'sem ele, os dois véus de 96px cobririam permanentemente as duas faixas mais importantes do quadro durante a reprodução. Os véus, o cabeçalho e a barra saem de cena após 2,6s sem interação e voltam ao primeiro movimento do ponteiro.',
        },
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
          subject: 'Controles recolhidos em janelas estreitas',
          detail:
            'abaixo de 400px o grupo direito é reduzido ao botão de tela cheia. O arquivo não descreve esse comportamento, mas sem ele a barra quebraria em duas linhas.',
        },
        {
          subject: 'Altura de linha fracionária preservada',
          detail:
            'o relógio declara 146,48% sobre corpo 13, resultando em 19,04px. O valor foi mantido em vez de arredondado para os 18px do degrau Body/Small.',
        },
        {
          subject: 'Vídeo de demonstração sintético',
          detail:
            'as estórias não embarcam mídia: o vídeo é desenhado em um canvas e gravado pelo navegador com MediaRecorder, gerando um blob local. Se o navegador não gravar vídeo, as estórias caem no modo de réplica estática.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Mídia',
          role: 'Elemento <video> quando há fonte; imagem de pôster no modo estático.',
          token: '--uni-color-poster-placeholder',
        },
        {
          name: 'Véus',
          role: 'Dois gradientes de 96px, no topo e na base, que se recolhem durante a reprodução.',
          token: '--uni-gradient-player-top · -bottom',
        },
        {
          name: 'Cabeçalho',
          role: 'Título à esquerda e botão de informações à direita, a 14px do topo.',
          token: '--uni-font-body-md-*',
        },
        {
          name: 'Botão central',
          role: 'Alvo de reprodução exibido enquanto o vídeo está pausado. Extensão.',
          token: '--uni-color-player-chrome',
        },
        {
          name: 'Linha do tempo',
          role: 'Três camadas sobrepostas, recuadas 12px. Arrastável e focável quando há vídeo.',
          token: '--uni-color-player-track · -buffer · --uni-color-brand-progress',
        },
        {
          name: 'Barra de controles',
          role: 'Dois grupos de glifos com o relógio e a régua de volume à esquerda.',
          token: '--uni-color-player-chrome',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Reprodução real — clique para reproduzir" surface="primary" align="stretch">
      <LiveVideoPlayer poster={playerPoster} videoTitle="Reprodução real" loop width={560} />
    </UniDocStage>
    <UniDocStage label="Estado ao vivo, lido do elemento" surface="primary" align="stretch">
      <StateReadout />
    </UniDocStage>
    <UniDocStage label="Réplica estática — como no arquivo: 640px" surface="primary" align="stretch">
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoPlayer poster={playerPoster} videoTitle="Video Title" />
      </div>
    </UniDocStage>
    <UniDocStage label="A largura menor do arquivo: 424px" surface="primary" align="stretch">
      <div style={{ width: 424, maxWidth: '100%' }}>
        <VideoPlayer poster={playerPoster} videoTitle="Video Title" />
      </div>
    </UniDocStage>
    <UniDocStage
      label="Progresso e carregamento (modo estático)"
      surface="primary"
      direction="column"
      align="stretch"
      gap={16}
    >
      {[
        { progress: 0, buffered: 0.2, label: 'Início' },
        { progress: 0.33, buffered: 0.5, label: 'Como no arquivo' },
        { progress: 0.85, buffered: 1, label: 'Quase ao fim' },
      ].map((state) => (
        <div key={state.label} style={{ width: 480, maxWidth: '100%' }}>
          <VideoPlayer
            poster={playerPoster}
            videoTitle={state.label}
            progress={state.progress}
            buffered={state.buffered}
          />
        </div>
      ))}
    </UniDocStage>
    <UniDocStage label="Sem título e sem botão de informações" surface="primary" align="stretch">
      <div style={{ width: 480, maxWidth: '100%' }}>
        <VideoPlayer poster={playerPoster} showInfo={false} />
      </div>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Informe poster junto com src: é o quadro que aparece antes do primeiro frame decodificar.',
        'Combine autoPlay com muted — nenhum navegador aceita autoplay com áudio.',
        'Use onStateChange quando o produto precisar de controles fora do quadro; ele entrega estado e comandos.',
        'Use a largura do contêiner para escalar o quadro; os controles têm tamanho fixo.',
        'Preserve os dois véus: são eles que garantem legibilidade sobre qualquer imagem.',
      ]}
      donts={[
        'Não passe uma imagem em src — src é o vídeo; a imagem é poster.',
        'Não troque o vermelho de progresso pelo vermelho semântico: os dois coexistem no quadro.',
        'Não redesenhe os glifos de controle — eles vêm da geometria resolvida do arquivo.',
        'Não remova o traço de 10% dos glifos: é o que os mantém legíveis sobre imagem clara.',
        'Não desligue autoHideControls em vídeos longos: os véus cobrem 192px do quadro.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O reprodutor sobre cada superfície oficial. O quadro é mídia e não muda com o tema — o que muda é o que o cerca."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'deep']}>
      {() => (
        <div style={{ width: 480, maxWidth: '100%' }}>
          <VideoPlayer poster={playerPoster} videoTitle="Video Title" />
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
            'Endereço do vídeo. Informar src ou sources liga o modo de reprodução real.',
        },
        {
          name: 'sources',
          type: 'UniVideoSource[]',
          description:
            'Fontes alternativas ({ src, type }). Quando informado, tem precedência sobre src.',
        },
        {
          name: 'poster',
          type: 'string',
          description: 'Quadro exibido antes da reprodução e no modo estático.',
        },
        { name: 'alt', type: 'string', default: "''", description: 'Texto alternativo do pôster.' },
        {
          name: 'captions',
          type: 'UniVideoCaptionTrack[]',
          description:
            'Faixas WebVTT. Com pelo menos uma, o botão de legendas passa a alterná-las de verdade.',
        },
        {
          name: 'videoTitle',
          type: 'React.ReactNode',
          description: 'Título exibido no canto superior esquerdo, sobre o véu.',
        },
        {
          name: 'autoPlay · loop · muted · preload · playsInline',
          type: 'boolean · boolean · boolean · "none" | "metadata" | "auto" · boolean',
          default: 'false · false · false · "metadata" · true',
          description: 'Repassados ao elemento de vídeo.',
        },
        {
          name: 'autoHideControls',
          type: 'boolean',
          default: 'true',
          description: 'Recolhe véus, cabeçalho e barra após 2,6s sem interação durante a reprodução.',
        },
        {
          name: 'showBigPlay',
          type: 'boolean',
          default: 'true',
          description: 'Exibe o botão central enquanto o vídeo está pausado.',
        },
        {
          name: 'showInfo',
          type: 'boolean',
          default: 'true',
          description: 'Exibe o botão de informações no canto superior direito.',
        },
        {
          name: 'currentTime · duration · progress · buffered',
          type: 'string · string · number · number',
          default: "'5:07' · '15:28' · 0.33 · 0.5",
          description:
            'Governam a linha do tempo apenas no modo estático. Durante reprodução real, os quatro vêm do elemento.',
        },
        {
          name: 'videoRef',
          type: 'React.Ref<HTMLVideoElement>',
          description: 'Referência para o elemento de vídeo, quando o produto precisar comandá-lo.',
        },
        {
          name: 'onPlay · onPause · onEnded',
          type: '() => void',
          description: 'Ciclo de vida da reprodução.',
        },
        {
          name: 'onTimeUpdate',
          type: '(currentTime: number, duration: number) => void',
          description: 'Chamado a cada avanço do tempo, em segundos.',
        },
        {
          name: 'onStateChange',
          type: '(state: UniVideoState, controls: UniVideoControls) => void',
          description:
            'Chamado a cada mudança de estado, com os comandos imperativos. Serve para montar controles externos ao quadro.',
        },
        {
          name: 'onNext · onSettings · onTheater · onCast · onInfo',
          type: '() => void',
          description:
            'Manipuladores dos controles sem comportamento embutido — eles pertencem ao produto.',
        },
        {
          name: 'onToggleCaptions',
          type: '(showing: boolean) => void',
          description: 'Chamado ao alternar as legendas, com o novo estado.',
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
 *
 * Cole a URL de um vídeo no controle `src` para reproduzir mídia própria; sem
 * ele, o componente permanece na réplica estática.
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
 * Reprodução real, com o vídeo sintético gerado no navegador.
 */
export const ReproducaoReal: Story = {
  name: '▶️ 2. Reprodução real',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 40, background: 'var(--uni-color-background-primary)' }}
    >
      <div style={{ margin: '0 auto', width: 640, maxWidth: '100%' }}>
        <LiveVideoPlayer poster={playerPoster} videoTitle="Video Title" loop />
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
        <VideoPlayer poster={playerPoster} videoTitle="Video Title" />
      </div>
      <div style={{ width: 424, maxWidth: '100%' }}>
        <VideoPlayer poster={playerPoster} videoTitle="Video Title" />
      </div>
    </div>
  ),
};

/**
 * As duas larguras publicadas pelo arquivo, mais uma janela estreita.
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
            <VideoPlayer poster={playerPoster} videoTitle="Video Title" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Estados de progresso e carregamento da linha do tempo, no modo estático.
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
            poster={playerPoster}
            videoTitle={state.title}
            progress={state.progress}
            buffered={state.buffered}
          />
        </div>
      ))}
    </div>
  ),
};
