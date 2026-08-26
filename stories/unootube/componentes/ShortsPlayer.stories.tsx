import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Icon, PhoneFrame, ShortsActionRail, ShortsPlayer } from '../../../src/unootube';
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
import { avatars, shortsPlayerPoster, soundCover } from '../fixtures';
import { useDemoVideo } from '../useDemoVideo';

/**
 * Legenda como o arquivo escreve o nó `3:203`: texto em Regular com as
 * hashtags em Bold **dentro** do mesmo parágrafo.
 */
const Caption = () => (
  <>
    Home video | Movements | Dancing in the rain <strong>#shorts</strong>{' '}
    <strong>#Shorts</strong> tiktok
  </>
);

const meta: Meta<typeof ShortsPlayer> = {
  title: 'Unootube/Componentes/ShortsPlayer',
  component: ShortsPlayer,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text' },
    poster: { control: 'text' },
    alt: { control: 'text' },
    variant: { control: 'radio', options: ['immersive', 'card'] },
    caption: { control: 'text' },
    channelName: { control: 'text' },
    avatarSrc: { control: 'text' },
    avatarInitials: { control: 'text' },
    subscribed: { control: 'boolean' },
    subscribeLabel: { control: 'text' },
    subscribedLabel: { control: 'text' },
    showChannel: { control: 'boolean' },
    likeCount: { control: 'text' },
    liked: { control: 'boolean' },
    dislikeLabel: { control: 'text' },
    disliked: { control: 'boolean' },
    commentCount: { control: 'text' },
    shareLabel: { control: 'text' },
    soundSrc: { control: 'text' },
    showRail: { control: 'boolean' },
    autoPlay: { control: 'boolean' },
    loop: { control: 'boolean' },
    muted: { control: 'boolean' },
    preload: { control: 'radio', options: ['none', 'metadata', 'auto'] },
    tapToToggle: { control: 'boolean' },
    showBigPlay: { control: 'boolean' },
    showProgress: { control: 'boolean' },
    showPeek: { control: 'boolean' },
    className: { control: 'text' },
    onSubscribe: { action: 'onSubscribe' },
    onLike: { action: 'onLike' },
    onDislike: { action: 'onDislike' },
    onComment: { action: 'onComment' },
    onShare: { action: 'onShare' },
    onMore: { action: 'onMore' },
    onSound: { action: 'onSound' },
    onPlay: { action: 'onPlay' },
    onPause: { action: 'onPause' },
    onEnded: { action: 'onEnded' },
  },
  args: {
    poster: shortsPlayerPoster,
    alt: '',
    variant: 'immersive',
    caption: 'Home video | Movements | Dancing in the rain #shorts #Shorts tiktok',
    channelName: 'SADEK Tuts',
    avatarSrc: avatars.skylarDias,
    subscribed: false,
    subscribeLabel: 'SUBSCRIBE',
    subscribedLabel: 'SUBSCRIBED',
    showChannel: true,
    likeCount: '245K',
    liked: false,
    dislikeLabel: 'Dislike',
    disliked: false,
    commentCount: '952',
    shareLabel: 'Share',
    showRail: true,
    autoPlay: false,
    loop: true,
    muted: true,
    preload: 'metadata',
    tapToToggle: true,
    showBigPlay: true,
    showProgress: true,
    showPeek: false,
  },
};

export default meta;

type Story = StoryObj<typeof ShortsPlayer>;

/** Reprodutor ligado ao vídeo vertical sintético gerado no navegador. */
const LiveShortsPlayer: React.FC<React.ComponentProps<typeof ShortsPlayer>> = (props) => {
  const src = useDemoVideo('portrait');
  return <ShortsPlayer {...props} src={src} />;
};

const ShortsPlayerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Shorts"
      title="ShortsPlayer"
      description="Reprodução do reprodutor vertical do arquivo Free YouTube Shorts Mockups (Community), nas duas apresentações publicadas: a imersiva da tela móvel (3:196), com a trilha de ações sobre o vídeo, e a de cartão da área de trabalho (3:450), com o quadro de 488px e a trilha ao lado. Com uma fonte de vídeo, o formato passa a funcionar como formato."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="O que o arquivo desenha e o que o componente acrescenta para que o formato funcione."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="📱" title="Duas apresentações, não dois tamanhos">
        Na imersiva a trilha fica <strong>sobre</strong> o vídeo, com glifos brancos sem fundo. Na de
        cartão fica <strong>ao lado</strong>, em botões circulares de 54px sobre superfície
        interativa. São composições distintas — por isso a prop se chama <code>variant</code>.
      </UniDocCard>
      <UniDocCard icon="▶️" title="Toque alterna a reprodução">
        O quadro inteiro é um alvo de reproduzir e pausar, como no formato de origem. É um{' '}
        <code>&lt;button&gt;</code> de verdade sob o conteúdo, e não um manipulador no contêiner, para
        continuar alcançável por teclado.
      </UniDocCard>
      <UniDocCard icon="🔇" title="Começa silenciado, por necessidade">
        Nenhum navegador aceita autoplay com áudio. O botão de som na base da trilha é o alvo para
        reativá-lo — o mesmo lugar em que o arquivo desenha a capa do áudio.
      </UniDocCard>
      <UniDocCard icon="🌗" title="Claro e escuro medidos">
        O véu, a legenda e a trilha ficam sobre mídia e não mudam com o tema. O que muda é o que
        cerca o quadro na variante de cartão — e os valores claros vêm medidos do próprio arquivo.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="3:196"
      frameName="iPhone Shorts Dark theme"
      fileUrl="https://www.figma.com/design/FlqnnoY0Mqdjic53twLAC1/Free-YouTube-Shorts-Mockups--Community-"
      specs={[
        { label: 'Quadro imersivo', value: '390 × 844 · vídeo em 9:16' },
        { label: 'Quadro de cartão', value: '488,16 × 867,49 · raio 8px' },
        { label: 'Véu inferior', value: '193,9px · paradas 37,188% e 48,296%' },
        { label: 'Legenda', value: 'Roboto Regular 16 · largura 242px' },
        { label: 'Trilha imersiva', value: '36px de largura · 20px entre ações' },
        { label: 'Trilha de cartão', value: 'botões de 53,98px · 22,9px do quadro' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Reprodução real',
          detail:
            'o arquivo é um bitmap com um véu e ícones por cima. O componente monta um <video> quando recebe src ou sources, com toque para alternar, laço ligado por padrão e linha do tempo acompanhando o avanço. Sem fonte, permanece a réplica estática — é assim que a documentação reproduz o arquivo fielmente.',
        },
        {
          subject: 'Linha do tempo',
          detail:
            'o arquivo não desenha progresso no reprodutor de Shorts. A faixa de 2px na base é extensão, construída sobre os mesmos tokens do VideoPlayer, e pode ser desligada com showProgress={false} para obter a réplica exata do quadro.',
        },
        {
          subject: 'Glifo central de pausa',
          detail:
            'o arquivo desenha o quadro sempre em reprodução. Sem o glifo central, um vídeo pausado não daria nenhum sinal disso.',
        },
        {
          subject: 'Botão de inscrição próprio',
          detail:
            'é vermelho puro (#FF0000) com raio de 4px (node 3:208) — não é o SubscribeButton da tela de vídeo, que usa #CC0000. Somando a chamada em texto vermelho do cabeçalho de canal móvel, são três alvos de inscrição distintos no mesmo produto, e nenhum foi consolidado.',
        },
        {
          subject: 'Estado inscrito e estados de curtida',
          detail:
            'o arquivo só desenha o estado não inscrito e o coração de contorno. Inscrito, curtido e não curtido foram acrescentados usando apenas tokens da própria marca, sem introduzir forma nova.',
        },
        {
          subject: 'Glifo de som montado de retângulos',
          detail:
            'o equalizador do botão de som não é um vetor no arquivo: são cinco retângulos posicionados dentro do quadro de 36px (nodes 3:240 a 3:244). As coordenadas foram convertidas dos inset percentuais sem arredondamento, e vivem em SoundGlyph.tsx pelo mesmo motivo que os retângulos do selo HD vivem em PlayerGlyphs.',
        },
        {
          subject: 'Ponto de quebra em 560px',
          detail:
            'o arquivo publica a variante de cartão apenas no quadro de 1440px. Abaixo de 560px o quadro de 488px não cabe ao lado da trilha, e o vídeo passa a ocupar a largura disponível.',
        },
        {
          subject: 'Bitmaps não redistribuídos',
          detail:
            'os quadros de vídeo, retratos e capas de áudio do arquivo são fotografias de banco de imagens. Nenhum foi exportado: as estórias usam pôsteres sintéticos em SVG, e todas as imagens entram por prop.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Quadro',
          role: 'Vídeo em 9:16. Ocupa a tela na variante imersiva; 488px com raio na de cartão.',
          token: '--uni-shorts-aspect · --uni-shorts-frame-width',
        },
        {
          name: 'Véu inferior',
          role: 'Gradiente de 194px com as duas paradas literais do arquivo.',
          token: '--uni-gradient-shorts-bottom',
        },
        {
          name: 'Legenda',
          role: 'Roboto Regular 16 branco, com hashtags em Bold no mesmo parágrafo.',
          token: '--uni-font-body-lg-* · --uni-font-weight-regular',
        },
        {
          name: 'Linha de canal',
          role: 'Retrato, nome em Medium 14 e o botão de inscrição vermelho puro.',
          token: '--uni-color-brand-shorts · --uni-radius-control',
        },
        {
          name: 'Trilha de ações',
          role: 'Reticências, curtir, não curtir, comentar, compartilhar e o botão de som.',
          token: '--uni-shorts-rail-width · --uni-shorts-rail-gap',
        },
        {
          name: 'Linha do tempo',
          role: 'Faixa de 2px na base. Extensão, desligável com showProgress.',
          token: '--uni-color-brand-progress',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Imersivo, com reprodução real — toque no quadro" surface="primary">
      <PhoneFrame surface="immersive">
        <LiveShortsPlayer
          poster={shortsPlayerPoster}
          caption={<Caption />}
          channelName="SADEK Tuts"
          avatarSrc={avatars.skylarDias}
          likeCount="245K"
          commentCount="952"
          soundSrc={soundCover}
          style={{ height: '100%' }}
        />
      </PhoneFrame>
    </UniDocStage>

    <UniDocStage label="Cartão da área de trabalho, com reprodução real" surface="primary">
      <LiveShortsPlayer
        variant="card"
        poster={shortsPlayerPoster}
        caption={<Caption />}
        channelName="SADEK Tuts"
        avatarSrc={avatars.skylarDias}
        likeCount="245K thousand"
        commentCount="952"
        soundSrc={soundCover}
        onMore={() => undefined}
        style={{ width: 340 }}
      />
    </UniDocStage>

    <UniDocStage label="Réplica estática — sem fonte de vídeo, como no arquivo" surface="primary">
      <PhoneFrame surface="immersive">
        <ShortsPlayer
          poster={shortsPlayerPoster}
          caption={<Caption />}
          channelName="SADEK Tuts"
          avatarSrc={avatars.skylarDias}
          likeCount="245K"
          commentCount="952"
          showProgress={false}
          style={{ height: '100%' }}
        />
      </PhoneFrame>
    </UniDocStage>

    <UniDocStage label="Curtido, inscrito e sem trilha" surface="primary" gap={24}>
      <PhoneFrame surface="immersive" scale={0.62} style={{ marginBottom: -320 }}>
        <ShortsPlayer
          poster={shortsPlayerPoster}
          caption={<Caption />}
          channelName="SADEK Tuts"
          avatarSrc={avatars.skylarDias}
          likeCount="245K"
          liked
          commentCount="952"
          subscribed
          style={{ height: '100%' }}
        />
      </PhoneFrame>
      <PhoneFrame surface="immersive" scale={0.62} style={{ marginBottom: -320 }}>
        <ShortsPlayer
          poster={shortsPlayerPoster}
          caption={<Caption />}
          channelName="SADEK Tuts"
          avatarSrc={avatars.skylarDias}
          showRail={false}
          style={{ height: '100%' }}
        />
      </PhoneFrame>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Mantenha loop ligado: é o comportamento do formato, e o arquivo não desenha estado de fim.',
        'Informe poster junto com src — é o quadro que aparece antes do primeiro frame decodificar.',
        'Use a variante imersiva dentro de PhoneFrame ou de uma tela de altura definida.',
        'Passe a legenda como ReactNode para reproduzir as hashtags em Bold dentro do parágrafo.',
        'Desligue showProgress quando o objetivo for a réplica exata do quadro do Figma.',
      ]}
      donts={[
        'Não use o SubscribeButton da tela de vídeo aqui: são vermelhos e raios diferentes.',
        'Não deixe muted={false} com autoPlay — o navegador recusa e o vídeo fica parado sem aviso.',
        'Não substitua o glifo de som por um ícone de outra biblioteca: ele é geometria do arquivo.',
        'Não consolide as duas variantes por espaçamento: o alvo da trilha muda de forma entre elas.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="O quadro é mídia e não muda com o tema. Na variante de cartão, o que muda é a trilha ao lado — e os valores claros foram medidos no próprio arquivo de Shorts, não derivados por inversão."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher align="stretch">
      {() => (
        <ShortsPlayer
          variant="card"
          poster={shortsPlayerPoster}
          caption={<Caption />}
          channelName="SADEK Tuts"
          avatarSrc={avatars.skylarDias}
          likeCount="245K"
          commentCount="952"
          onMore={() => undefined}
          style={{ width: 320 }}
        />
      )}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="ShortsPlayer"
      rows={[
        {
          name: 'src · sources',
          type: 'string · UniVideoSource[]',
          description:
            'Fonte do vídeo vertical. Informar qualquer uma liga o modo de reprodução real; sem elas, o componente é a réplica estática.',
        },
        {
          name: 'poster',
          type: 'string',
          description: 'Quadro exibido antes da reprodução e no modo estático.',
        },
        { name: 'alt', type: 'string', default: "''", description: 'Texto alternativo do quadro.' },
        {
          name: 'captions',
          type: 'UniVideoCaptionTrack[]',
          description: 'Faixas de legenda em WebVTT.',
        },
        {
          name: 'variant',
          type: "'immersive' | 'card'",
          default: "'immersive'",
          description: 'Trilha sobre o vídeo (móvel) ou ao lado dele (área de trabalho).',
        },
        {
          name: 'caption',
          type: 'React.ReactNode',
          description:
            'Legenda do vídeo. Aceita ReactNode para reproduzir as hashtags em Bold dentro do parágrafo.',
        },
        {
          name: 'channelName · avatarSrc · avatarInitials',
          type: 'React.ReactNode · string · string',
          description: 'Linha de canal sob a legenda.',
        },
        {
          name: 'subscribed · subscribeLabel · subscribedLabel · onSubscribe',
          type: 'boolean · React.ReactNode · React.ReactNode · () => void',
          default: "false · 'SUBSCRIBE' · 'SUBSCRIBED' · —",
          description: 'Botão de inscrição vermelho puro, com raio de 4px.',
        },
        {
          name: 'showChannel',
          type: 'boolean',
          default: 'true',
          description: 'Exibe a linha de canal sob a legenda.',
        },
        {
          name: 'likeCount · liked · onLike',
          type: 'React.ReactNode · boolean · () => void',
          description: 'Primeira ação da trilha.',
        },
        {
          name: 'dislikeLabel · disliked · onDislike',
          type: "React.ReactNode · boolean · () => void",
          default: "'Dislike' · false · —",
          description: 'Segunda ação. Usa o mesmo polegar girado 180°, sem duplicar vetor.',
        },
        {
          name: 'commentCount · onComment',
          type: 'React.ReactNode · () => void',
          description: 'Terceira ação da trilha.',
        },
        {
          name: 'shareLabel · onShare',
          type: 'React.ReactNode · () => void',
          default: "'Share' · —",
          description: 'Quarta ação da trilha.',
        },
        {
          name: 'onMore',
          type: '() => void',
          description: 'Menu de reticências no topo da trilha. Sem ele, o topo não é renderizado.',
        },
        {
          name: 'soundSrc · onSound',
          type: 'string · () => void',
          description:
            'Botão de som na base da trilha. Com soundSrc, o bitmap da capa preenche o quadrado; sem ele, o equalizador de cinco barras do arquivo.',
        },
        {
          name: 'showRail · actions',
          type: 'boolean · React.ReactNode',
          default: 'true · —',
          description:
            'Exibe ou substitui a trilha inteira. Componha com ShortsActionRail quando o conjunto de ações do produto não for o do arquivo.',
        },
        {
          name: 'autoPlay · loop · muted · preload',
          type: 'boolean · boolean · boolean · "none" | "metadata" | "auto"',
          default: 'false · true · true · "metadata"',
          description: 'Repassados ao elemento de vídeo. O laço é ligado por ser o do formato.',
        },
        {
          name: 'tapToToggle · showBigPlay · showProgress',
          type: 'boolean',
          default: 'true',
          description:
            'Toque no quadro, glifo central de pausa e linha do tempo. Os três são extensões do componente.',
        },
        {
          name: 'showPeek',
          type: 'boolean',
          default: 'false',
          description: 'Faixa do próximo Short abaixo do quadro. Só na variante card.',
        },
        {
          name: 'videoRef',
          type: 'React.Ref<HTMLVideoElement>',
          description: 'Referência para o elemento de vídeo.',
        },
        {
          name: 'onPlay · onPause · onEnded · onTimeUpdate · onStateChange',
          type: '() => void · … · (state, controls) => void',
          description: 'Ciclo de vida e estado da reprodução.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
          description: 'Demais atributos são repassados ao <section>.',
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
  render: () => <ShortsPlayerDocumentationPage />,
};

/**
 * Playground com 100% das props do ShortsPlayer expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ShortsPlayer',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      {args.variant === 'card' ? (
        <ShortsPlayer {...args} />
      ) : (
        <PhoneFrame surface="immersive">
          <ShortsPlayer {...args} style={{ height: '100%' }} />
        </PhoneFrame>
      )}
    </div>
  ),
};

/**
 * Reprodução real, com o vídeo vertical sintético gerado no navegador.
 */
export const ReproducaoReal: Story = {
  name: '▶️ 2. Reprodução real',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <PhoneFrame surface="immersive">
        <LiveShortsPlayer
          poster={shortsPlayerPoster}
          caption={<Caption />}
          channelName="SADEK Tuts"
          avatarSrc={avatars.skylarDias}
          likeCount="245K"
          commentCount="952"
          soundSrc={soundCover}
          onMore={() => undefined}
          style={{ height: '100%' }}
        />
      </PhoneFrame>
    </div>
  ),
};

/**
 * Réplica visual dos nós `3:196` (imersivo) e `3:450` (cartão).
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 48,
        flexWrap: 'wrap',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <PhoneFrame surface="immersive">
        <ShortsPlayer
          poster={shortsPlayerPoster}
          caption={<Caption />}
          channelName="SADEK Tuts"
          avatarSrc={avatars.skylarDias}
          likeCount="245K"
          commentCount="952"
          showProgress={false}
          onMore={() => undefined}
          style={{ height: '100%' }}
        />
      </PhoneFrame>

      <ShortsPlayer
        variant="card"
        poster={shortsPlayerPoster}
        caption={<Caption />}
        channelName="SADEK Tuts"
        avatarSrc={avatars.skylarDias}
        likeCount="245K thousand"
        commentCount="952"
        soundSrc={soundCover}
        showProgress={false}
        showPeek
        onMore={() => undefined}
        style={{ width: 360 }}
      />
    </div>
  ),
};

/**
 * As duas apresentações lado a lado.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 48,
        flexWrap: 'wrap',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {(['immersive', 'card'] as const).map((variant) => (
        <div key={variant}>
          <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 8 }}>
            {variant}
          </div>
          {variant === 'immersive' ? (
            <PhoneFrame surface="immersive" scale={0.72} style={{ marginBottom: -236 }}>
              <ShortsPlayer
                poster={shortsPlayerPoster}
                caption={<Caption />}
                channelName="SADEK Tuts"
                avatarSrc={avatars.skylarDias}
                likeCount="245K"
                commentCount="952"
                style={{ height: '100%' }}
              />
            </PhoneFrame>
          ) : (
            <ShortsPlayer
              variant="card"
              poster={shortsPlayerPoster}
              caption={<Caption />}
              channelName="SADEK Tuts"
              avatarSrc={avatars.skylarDias}
              likeCount="245K"
              commentCount="952"
              style={{ width: 300 }}
            />
          )}
        </div>
      ))}
    </div>
  ),
};

/**
 * Trilha de ações substituída por composição, com `ShortsActionRail`.
 */
export const ComposicaoModular: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <PhoneFrame surface="immersive">
        <ShortsPlayer
          poster={shortsPlayerPoster}
          caption={<Caption />}
          channelName="SADEK Tuts"
          avatarSrc={avatars.skylarDias}
          style={{ height: '100%' }}
          actions={
            <ShortsActionRail variant="overlay">
              <ShortsActionRail.Item
                icon={<Icon name="likedFill" size={36} />}
                label="1,2M"
                aria-label="Curtir"
              />
              <ShortsActionRail.Item
                icon={<Icon name="save" size={30} />}
                label="Salvar"
                aria-label="Salvar"
              />
              <ShortsActionRail.Item
                icon={<Icon name="shortsShare" size={28} />}
                label="Enviar"
                aria-label="Enviar"
              />
            </ShortsActionRail>
          }
        />
      </PhoneFrame>
    </div>
  ),
};
