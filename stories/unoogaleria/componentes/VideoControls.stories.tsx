import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fireEvent, fn, userEvent, within } from 'storybook/test';
import { VideoControls, useVideoPlayback } from '../../../src/unoogaleria/components/VideoControls';
import type { UglVideoControlsProps } from '../../../src/unoogaleria/components/VideoControls';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { IconButton } from '../../../src/unoogaleria/components/IconButton';
import { uglFormatDuration } from '../../../src/unoogaleria/media';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocCard,
  UglDocGrid,
  UglDocSpecs,
  UglDocDecisions,
  UglDocAnatomy,
  UglDocPractices,
  UglDocStage,
  UglDocThemeSwitcher,
  UglDocPropsTable,
} from '../../../.storybook/components';
import { uglVideos } from '../fixtures';

const BAR = '#716C98';

/** Vídeo de demonstração: o mais longo das fixtures. */
const VIDEO = [...uglVideos].sort((a, b) => (b.duration ?? 0) - (a.duration ?? 0))[0];
const DURACAO = VIDEO.duration ?? 0;
/** Posição inicial do controle com estado (um quarto do vídeo, em segundos inteiros). */
const INICIO = Math.floor(DURACAO / 4);

/**
 * Controles com estado local. Não há `<video>`: o estado é simulado, para
 * demonstrar (e testar) as intenções sem depender de reprodução real.
 */
const ControlesComEstado: React.FC<
  Partial<Pick<UglVideoControlsProps, 'onTogglePlay' | 'onSeek' | 'onToggleMute' | 'variant' | 'theme'>>
> = ({ onTogglePlay, onSeek, onToggleMute, variant, theme }) => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(INICIO);
  const [muted, setMuted] = useState(false);

  return (
    <VideoControls
      theme={theme}
      variant={variant}
      playing={playing}
      currentTime={time}
      duration={DURACAO}
      muted={muted}
      buffered={0.7}
      onTogglePlay={() => {
        setPlaying((atual) => !atual);
        onTogglePlay?.();
      }}
      onSeek={(segundos) => {
        setTime(segundos);
        onSeek?.(segundos);
      }}
      onToggleMute={() => {
        setMuted((atual) => !atual);
        onToggleMute?.();
      }}
    />
  );
};

/**
 * Reprodutor real: `<video>` lido pelo `useVideoPlayback` e comandado pelos
 * controles em cápsula, dentro do aparelho.
 */
const ReprodutorReal: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const video = useVideoPlayback(videoRef);

  return (
    <div
      data-ugl-immersive=""
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ugl-color-immersive-surface)',
      }}
    >
      <video
        ref={videoRef}
        src={VIDEO.videoSrc}
        poster={VIDEO.src}
        playsInline
        preload="metadata"
        aria-label={VIDEO.alt}
        style={{ width: '100%', display: 'block' }}
      />
      {!video.playing && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <IconButton icon="play" label="Reproduzir vídeo" variant="immersive" size="lg" filled onClick={video.togglePlay} />
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          left: 'var(--ugl-spacing-l)',
          right: 'var(--ugl-spacing-l)',
          bottom: 'calc(var(--ugl-safe-area-bottom) + var(--ugl-spacing-l))',
        }}
      >
        <VideoControls
          variant="overlay"
          playing={video.playing}
          currentTime={video.currentTime}
          duration={video.duration || DURACAO}
          muted={video.muted}
          buffered={video.duration ? video.buffered : undefined}
          onTogglePlay={video.togglePlay}
          onSeek={video.seek}
          onToggleMute={video.toggleMute}
        />
      </div>
    </div>
  );
};

/**
 * Página de documentação rica do componente VideoControls.
 */
const VideoControlsDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Visualizador"
      title="VideoControls"
      description="Controles de vídeo do visualizador: tocar e pausar, linha do tempo, tempos em algarismos tabulares e som. São apresentacionais — recebem o estado e devolvem intenções —, e o estado de um <video> real vem do hook useVideoPlayback, exportado da mesma pasta, que o lê sempre dos eventos do elemento."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma linha de controles, duas apresentações, um motor de estado separado."
    />
    <UglDocGrid>
      <UglDocCard icon="🎬" title="Dentro do visualizador">
        Na barra inferior do <code>MediaViewer</code>, sobre o fundo translúcido que a barra já pinta
        (variante <code>bar</code>), acima da tira de miniaturas.
      </UglDocCard>
      <UglDocCard icon="🫧" title="Sobre o vídeo">
        Solta sobre a mídia, como cápsula translúcida com desfoque (variante <code>overlay</code>) —
        prévias, memórias e reprodutores embutidos.
      </UglDocCard>
      <UglDocCard icon="🧠" title="Estado lido do elemento">
        <code>useVideoPlayback(videoRef)</code> assina <code>play</code>, <code>pause</code>,{' '}
        <code>timeupdate</code>, <code>durationchange</code>, <code>progress</code>,{' '}
        <code>volumechange</code> e <code>ended</code>. Nada é escrito de forma otimista: se o
        navegador recusar a reprodução, o botão continua dizendo &quot;Reproduzir&quot;.
      </UglDocCard>
      <UglDocCard icon="♿" title="Linha do tempo nativa">
        Um <code>&lt;input type=&quot;range&quot;&gt;</code> com <code>aria-valuetext</code> no formato
        falado &quot;0:12 de 0:32&quot;. Setas avançam e recuam 5 s, Page Up/Down 10 s, Home e End vão
        às pontas.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UglDocSpecs
      component="VideoControls"
      layout="Linha · 44px · tocar | tempo | trilha | duração | som"
      specs={[
        { label: 'Altura', value: '--ugl-touch-target (44px)' },
        { label: 'Trilha', value: '4px · --ugl-radius-full' },
        { label: 'Punho', value: '14px · immersive-text' },
        { label: 'Reproduzido', value: '--ugl-color-immersive-accent' },
        { label: 'Carregado', value: '--ugl-color-immersive-track' },
        { label: 'Não carregado', value: '--ugl-color-immersive-control' },
        { label: 'Tempos', value: 'caption-strong · tabular-nums' },
        { label: 'Cápsula (overlay)', value: 'immersive-bar · blur 16px' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Três faixas na trilha',
          detail:
            'o reproduzido fica em immersive-accent e o carregado em immersive-track, como pede o contrato; o trecho ainda não carregado desce para immersive-control (20% de branco), um degrau abaixo, para o carregamento ser visível. Sem buffered, a trilha inteira é immersive-track.',
        },
        {
          subject: 'Passos de teclado reescritos',
          detail:
            'o input usa step de 0,01 s para o arraste ser contínuo; com o passo nativo, a seta mudaria um centésimo de segundo. As teclas são tratadas pelo componente: ±5 s nas setas, ±10 s em Page Up/Down, Home e End. O evento é consumido (preventDefault), então o visualizador não troca de mídia enquanto a trilha tem foco.',
        },
        {
          subject: 'Nome que muda em vez de aria-pressed',
          detail:
            'tocar/pausar e som trocam o glifo e o nome ("Reproduzir" ↔ "Pausar", "Desativar som" ↔ "Ativar som"), como os reprodutores fazem. Um botão de alternância com nome fixo e aria-pressed diria "Reproduzir, pressionado" durante a reprodução, o que se lê como contradição.',
        },
        {
          subject: 'Tempos fora da árvore acessível',
          detail:
            'os dois tempos visíveis levam aria-hidden: a trilha já anuncia "0:12 de 0:32", e repetir os números em volta dela só alonga a leitura.',
        },
        {
          subject: 'Medidas locais',
          detail:
            'trilha de 4px, punho de 14px e largura mínima de 36px nos tempos (para "0:32" e "12:05" não empurrarem a trilha) são custom properties do bloco (--ugl-video-controls-*): não há degrau equivalente na escala.',
        },
        {
          subject: 'Hook com chave de troca',
          detail:
            'useVideoPlayback(videoRef, resetKey?) aceita uma chave opcional: quando o visualizador passa a outro vídeo, a chave muda, o estado volta ao vazio e os eventos do novo elemento são assinados. O estado de um vídeo nunca vaza para o seguinte.',
        },
        {
          subject: 'play() recusado não estoura',
          detail:
            'a promessa rejeitada pela política de reprodução automática é engolida — o estado segue o elemento, que continua pausado.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Cinco zonas numa linha de 44px."
    />
    <UglDocStage label="Variante bar" surface="immersive" align="flex-start">
      <div style={{ width: 358 }}>
        <VideoControls
          playing={false}
          currentTime={INICIO}
          duration={DURACAO}
          muted={false}
          buffered={0.7}
          onTogglePlay={() => undefined}
          onSeek={() => undefined}
          onToggleMute={() => undefined}
        />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Tocar/pausar', role: 'IconButton "bar" com play ou pause, preenchido.', token: '--ugl-color-immersive-text' },
            { name: 'Tempo atual', role: 'uglFormatDuration, algarismos tabulares.', token: 'caption-strong' },
            {
              name: 'Linha do tempo',
              role: 'input range nativo; trilha desenhada em três faixas.',
              token: 'immersive-accent · immersive-track · immersive-control',
            },
            { name: 'Duração', role: 'Tempo total do vídeo.', token: 'caption-strong' },
            { name: 'Som', role: 'IconButton "bar" com volume ou volumeOff.', token: '--ugl-color-immersive-text' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As duas apresentações e os estados de reprodução."
    />
    <UglDocStage label="bar · overlay" surface="immersive" direction="column" align="stretch">
      <VideoControls
        playing={false}
        currentTime={INICIO}
        duration={DURACAO}
        muted={false}
        buffered={0.7}
        onTogglePlay={() => undefined}
        onSeek={() => undefined}
        onToggleMute={() => undefined}
      />
      <VideoControls
        variant="overlay"
        playing
        currentTime={DURACAO / 2}
        duration={DURACAO}
        muted
        onTogglePlay={() => undefined}
        onSeek={() => undefined}
        onToggleMute={() => undefined}
      />
    </UglDocStage>
    <UglDocStage label="Pausado · reproduzindo · sem som · sem duração (desabilitada)" surface="immersive" direction="column" align="stretch">
      <VideoControls playing={false} currentTime={0} duration={DURACAO} muted={false} onTogglePlay={() => undefined} onSeek={() => undefined} onToggleMute={() => undefined} />
      <VideoControls playing currentTime={DURACAO * 0.6} duration={DURACAO} muted={false} buffered={0.9} onTogglePlay={() => undefined} onSeek={() => undefined} onToggleMute={() => undefined} />
      <VideoControls playing={false} currentTime={DURACAO} duration={DURACAO} muted onTogglePlay={() => undefined} onSeek={() => undefined} onToggleMute={() => undefined} />
      <VideoControls playing={false} currentTime={0} duration={0} muted={false} onTogglePlay={() => undefined} onSeek={() => undefined} onToggleMute={() => undefined} />
    </UglDocStage>
    <UglDocStage label="Com um vídeo real (useVideoPlayback)" surface="secondary">
      <PhoneFrame scale={0.6} ariaLabel="Aparelho com reprodutor">
        <ReprodutorReal />
      </PhoneFrame>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso dos controles." />
    <UglDocPractices
      dos={[
        'Ler o estado do elemento com useVideoPlayback e só repassá-lo aos controles.',
        'Passar a duração conhecida da mídia (item.duration) enquanto os metadados não chegam, para a trilha já nascer habilitada.',
        'Usar a variante bar dentro de uma barra imersiva e overlay quando os controles flutuam sobre o vídeo.',
        'Pausar o vídeo anterior ao trocar de mídia — no visualizador, desmontá-lo.',
      ]}
      donts={[
        'Escrever playing = true ao pedir a reprodução: o navegador pode recusar, e o botão mentiria.',
        'Usar os controles sobre superfície clara: as cores são imersivas e só se leem sobre escuro.',
        'Reimplementar a trilha com div e eventos de ponteiro: o range nativo já dá toque, arraste e leitor de tela.',
        'Esconder o botão de som em vídeos com áudio.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Os controles são imersivos: iguais nos dois temas, porque o fundo é o vídeo."
    />
    <UglDocThemeSwitcher surface="immersive">
      {(tema) => (
        <div style={{ width: 358 }}>
          <ControlesComEstado theme={tema} />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do componente e do hook."
    />
    <UglDocPropsTable
      title="VideoControls"
      rows={[
        { name: 'playing', type: 'boolean', description: 'O vídeo está avançando. Obrigatório.' },
        { name: 'currentTime', type: 'number', description: 'Posição atual, em segundos. Obrigatório.' },
        { name: 'duration', type: 'number', description: 'Duração total, em segundos. Com 0, a trilha fica desabilitada. Obrigatório.' },
        { name: 'muted', type: 'boolean', description: 'Áudio silenciado. Obrigatório.' },
        { name: 'buffered', type: 'number', description: 'Fração carregada, de 0 a 1. Sem valor, a trilha inteira aparece carregada.' },
        { name: 'onTogglePlay', type: '() => void', description: 'Pedido de tocar ou pausar. Obrigatório.' },
        { name: 'onSeek', type: '(seconds: number) => void', description: 'Pedido de busca: arraste da trilha e teclas. Obrigatório.' },
        { name: 'onToggleMute', type: '() => void', description: 'Pedido de alternar o som. Obrigatório.' },
        { name: 'variant', type: "'bar' | 'overlay'", default: "'bar'", description: 'Linha sem fundo ou cápsula translúcida.' },
        { name: 'playLabel', type: 'string', default: "'Reproduzir'", description: 'Nome do botão principal quando pausado.' },
        { name: 'pauseLabel', type: 'string', default: "'Pausar'", description: 'Nome do botão principal durante a reprodução.' },
        { name: 'muteLabel', type: 'string', default: "'Desativar som'", description: 'Nome do botão de som com o som ligado.' },
        { name: 'unmuteLabel', type: 'string', default: "'Ativar som'", description: 'Nome do botão de som com o som desligado.' },
        { name: 'seekLabel', type: 'string', default: "'Posição do vídeo'", description: 'Nome acessível da trilha.' },
        { name: 'ariaLabel', type: 'string', default: "'Controles do vídeo'", description: 'Nome do grupo.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema do conteúdo aninhado. Os controles são invariantes.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UglDocPropsTable
      title="useVideoPlayback(videoRef, resetKey?) → UglVideoPlayback"
      rows={[
        { name: 'videoRef', type: 'RefObject<HTMLVideoElement | null>', description: 'Ref do <video> real.' },
        { name: 'resetKey', type: 'unknown', description: 'Chave que troca a assinatura quando o elemento é outro (id da mídia).' },
        { name: 'playing', type: 'boolean', description: 'Lido de play, pause, playing e ended.' },
        { name: 'currentTime', type: 'number', description: 'Lido de timeupdate, seeking e seeked.' },
        { name: 'duration', type: 'number', description: 'Lido de durationchange e loadedmetadata (0 antes deles).' },
        { name: 'muted', type: 'boolean', description: 'Lido de volumechange.' },
        { name: 'buffered', type: 'number', description: 'Fração carregada (0–1), lida de progress.' },
        { name: 'ended', type: 'boolean', description: 'A reprodução chegou ao fim.' },
        { name: 'play / pause', type: '() => void', description: 'Comandos diretos; play() recusado é silencioso.' },
        { name: 'togglePlay', type: '() => void', description: 'Alterna; no fim, recomeça do início.' },
        { name: 'seek', type: '(seconds: number) => void', description: 'Busca limitada à duração.' },
        { name: 'toggleMute', type: '() => void', description: 'Alterna o mudo.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof VideoControls> = {
  title: 'Unoogaleria/Componentes/VideoControls',
  component: VideoControls,
  parameters: { layout: 'padded' },
  argTypes: {
    playing: { control: 'boolean', description: 'O vídeo está avançando.' },
    currentTime: { control: { type: 'range', min: 0, max: DURACAO, step: 0.5 }, description: 'Posição atual, em segundos.' },
    duration: { control: { type: 'number', min: 0 }, description: 'Duração total, em segundos.' },
    muted: { control: 'boolean', description: 'Áudio silenciado.' },
    buffered: { control: { type: 'range', min: 0, max: 1, step: 0.05 }, description: 'Fração carregada.' },
    variant: { control: 'radio', options: ['bar', 'overlay'], description: 'Apresentação.' },
    playLabel: { control: 'text', description: 'Nome do botão quando pausado.' },
    pauseLabel: { control: 'text', description: 'Nome do botão durante a reprodução.' },
    muteLabel: { control: 'text', description: 'Nome do botão de som com som ligado.' },
    unmuteLabel: { control: 'text', description: 'Nome do botão de som com som desligado.' },
    seekLabel: { control: 'text', description: 'Nome acessível da trilha.' },
    ariaLabel: { control: 'text', description: 'Nome do grupo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema do conteúdo aninhado.' },
    onTogglePlay: { action: 'onTogglePlay' },
    onSeek: { action: 'onSeek' },
    onToggleMute: { action: 'onToggleMute' },
  },
  args: {
    playing: false,
    currentTime: INICIO,
    duration: DURACAO,
    muted: false,
    buffered: 0.7,
    variant: 'bar',
    playLabel: 'Reproduzir',
    pauseLabel: 'Pausar',
    muteLabel: 'Desativar som',
    unmuteLabel: 'Ativar som',
    seekLabel: 'Posição do vídeo',
    ariaLabel: 'Controles do vídeo',
  },
};

export default meta;

type Story = StoryObj<typeof VideoControls>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <VideoControlsDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do VideoControls',
  render: (args) => (
    <UglDocStage surface="immersive" align="flex-start">
      <div style={{ width: 358 }}>
        <VideoControls {...args} />
      </div>
    </UglDocStage>
  ),
};

/**
 * Um vídeo real dentro do aparelho, lido pelo hook e comandado pelos controles.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: reprodutor com vídeo real',
  render: () => (
    <PhoneFrame scale={0.75} ariaLabel="Aparelho com reprodutor">
      <ReprodutorReal />
    </PhoneFrame>
  ),
};

/**
 * As duas apresentações.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UglDocStage surface="immersive" direction="column" align="stretch" width={400}>
      <ControlesComEstado variant="bar" />
      <ControlesComEstado variant="overlay" />
    </UglDocStage>
  ),
};

/**
 * Pausado, reproduzindo, sem som, carregando e sem duração.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage surface="immersive" direction="column" align="stretch" width={400}>
      {[
        { playing: false, currentTime: 0, muted: false, buffered: 0.1, duration: DURACAO },
        { playing: true, currentTime: DURACAO * 0.5, muted: false, buffered: 0.8, duration: DURACAO },
        { playing: true, currentTime: DURACAO * 0.75, muted: true, buffered: 1, duration: DURACAO },
        { playing: false, currentTime: 0, muted: false, buffered: 0, duration: 0 },
      ].map((estado, posicao) => (
        <VideoControls
          key={posicao}
          {...estado}
          onTogglePlay={() => undefined}
          onSeek={() => undefined}
          onToggleMute={() => undefined}
        />
      ))}
    </UglDocStage>
  ),
};

/**
 * Os dois temas lado a lado: os controles não mudam.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UglDocStage key={tema} label={tema === 'light' ? 'Tema claro' : 'Tema escuro'} theme={tema} surface="immersive" width={400}>
          <ControlesComEstado theme={tema} />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Tocar e pausar, buscar pela trilha (teclado e arraste) e alternar o som.
 */
export const Interativo: Story = {
  name: 'Tocar, pausar e buscar',
  args: { onTogglePlay: fn(), onSeek: fn(), onToggleMute: fn() },
  render: (args) => (
    <UglDocStage surface="immersive" width={400}>
      <ControlesComEstado onTogglePlay={args.onTogglePlay} onSeek={args.onSeek} onToggleMute={args.onToggleMute} />
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);

    await userEvent.click(tela.getByRole('button', { name: 'Reproduzir' }));
    await expect(args.onTogglePlay).toHaveBeenCalledTimes(1);
    await expect(tela.getByRole('button', { name: 'Pausar' })).toBeInTheDocument();

    const trilha = tela.getByRole('slider', { name: 'Posição do vídeo' });
    trilha.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(args.onSeek).toHaveBeenLastCalledWith(INICIO + 5);
    await expect(trilha).toHaveAttribute(
      'aria-valuetext',
      `${uglFormatDuration(INICIO + 5)} de ${uglFormatDuration(DURACAO)}`
    );

    fireEvent.change(trilha, { target: { value: '2' } });
    await expect(args.onSeek).toHaveBeenLastCalledWith(2);

    await userEvent.click(tela.getByRole('button', { name: 'Desativar som' }));
    await expect(args.onToggleMute).toHaveBeenCalledTimes(1);
    await expect(tela.getByRole('button', { name: 'Ativar som' })).toBeInTheDocument();

    await userEvent.click(tela.getByRole('button', { name: 'Pausar' }));
    await expect(args.onTogglePlay).toHaveBeenCalledTimes(2);
    await expect(tela.getByRole('button', { name: 'Reproduzir' })).toBeInTheDocument();
  },
};
