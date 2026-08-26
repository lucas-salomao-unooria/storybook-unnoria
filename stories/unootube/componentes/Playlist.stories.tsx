import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Playlist, VideoCardSmall } from '../../../src/unootube';
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
import { videos } from '../fixtures';

const meta: Meta<typeof Playlist> = {
  title: 'Unootube/Componentes/Playlist',
  component: Playlist,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    playlistTitle: { control: 'text' },
    playAllLabel: { control: 'text' },
    showPlayAll: { control: 'boolean' },
    className: { control: 'text' },
    onPlayAll: { action: 'onPlayAll' },
  },
  args: {
    playlistTitle: 'Playlist Title',
    playAllLabel: 'Play all',
    showPlayAll: true,
  },
};

export default meta;

type Story = StoryObj<typeof Playlist>;

/** Os cinco cartões da linha, como no arquivo. */
const Cards = ({ count = 5 }: { count?: number }) => (
  <>
    {videos.slice(0, count).map((video) => (
      <VideoCardSmall
        key={video.id}
        thumbnailSrc={video.thumbnailSrc}
        duration={video.duration}
        videoTitle="Video Title"
        channelName={video.channelName}
        metadata="329K views · 1 month ago"
      />
    ))}
  </>
);

const PlaylistDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Mídia"
      title="Playlist"
      description="Reprodução do nó Media/Playlist (19:1562), 1200×288, a faixa horizontal que a tela de canal repete quatro vezes. Os fios de 1px acima e abaixo têm 1070px, e não os 1200px da seção: o arquivo os desenha dentro da calha de 65px, de modo que o divisor fique alinhado ao conteúdo."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="A faixa de playlist da tela de canal."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="✂️" title="Fios alinhados ao conteúdo">
        Os divisores têm 1070px dentro de uma seção de 1200px. Por isso a calha de 65px fica na
        seção, e os fios ficam no bloco interno.
      </UniDocCard>
      <UniDocCard icon="▶️" title="Cabeçalho com “Play all”">
        Título e botão dividem a linha. O rótulo do botão usa o mesmo corpo do título — 16px Bold —,
        mas em texto secundário.
      </UniDocCard>
      <UniDocCard icon="🎞️" title="Cinco cartões por linha">
        A linha do arquivo cabe exatamente cinco <code>VideoCardSmall</code> de 214px nos 1070px
        úteis.
      </UniDocCard>
      <UniDocCard icon="↔️" title="Faixa rolável">
        O arquivo é estático e corta os cartões na borda. Aqui a linha rola horizontalmente, para que
        playlists com mais de cinco vídeos sejam alcançáveis.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="19:1562"
      frameName="Media/Playlist"
      specs={[
        { label: 'Dimensões', value: '1200 × 288' },
        { label: 'Calha', value: '65px' },
        { label: 'Fios', value: '1070 × 1 · #303030' },
        { label: 'Cartões', value: '5 × 214px' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Linha rolável',
          detail:
            'o arquivo desenha cinco cartões fixos, cortados na borda. O componente rola horizontalmente com barra fina, para que playlists maiores sejam navegáveis — sem isso, os vídeos além do quinto seriam inalcançáveis.',
        },
        {
          subject: 'Rótulo “Play all” em texto secundário',
          detail:
            'o arquivo pinta o rótulo do botão com #AAAAAA, mais apagado que o título ao lado, apesar de os dois compartilharem o corpo de 16px Bold. A hierarquia invertida foi preservada.',
        },
        {
          subject: 'Título promovido a h2',
          detail:
            'o arquivo publica uma camada de texto solta. O componente renderiza <h2>, porque a playlist é uma seção da tela de canal.',
        },
        {
          subject: 'Calha reduzida em janelas estreitas',
          detail:
            'abaixo de 900px a calha de 65px passa a 24px, para que a faixa não perca largura útil. O arquivo publica apenas o quadro de 1200px.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Seção',
          role: 'Faixa de largura total com calha lateral de 65px.',
          token: '--uni-content-gutter',
        },
        {
          name: 'Fios',
          role: 'Divisores de 1px acima e abaixo do bloco interno.',
          token: '--uni-color-border-subtle',
        },
        {
          name: 'Cabeçalho',
          role: 'Título em Heading/H4 e botão “Play all” em texto secundário.',
          token: '--uni-font-heading-h4-*',
        },
        {
          name: 'Linha de cartões',
          role: 'Faixa rolável com recuo vertical de 24px.',
          token: '--uni-videocard-small-width',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: cinco cartões" surface="primary" align="stretch" padding={0}>
      <Playlist playlistTitle="Playlist Title">
        <Cards />
      </Playlist>
    </UniDocStage>
    <UniDocStage label="Sem botão de reprodução em sequência" surface="primary" align="stretch" padding={0}>
      <Playlist playlistTitle="Playlist Title" showPlayAll={false}>
        <Cards count={4} />
      </Playlist>
    </UniDocStage>
    <UniDocStage label="Faixa transbordando, com rolagem" surface="primary" align="stretch" padding={0}>
      <Playlist playlistTitle="Playlist Title" playAllLabel="Reproduzir tudo">
        <Cards count={8} />
      </Playlist>
    </UniDocStage>
    <UniDocStage label="Quatro faixas empilhadas, como na tela de canal" surface="primary" align="stretch" padding={0}>
      <div style={{ width: '100%' }}>
        {['Playlist Title', 'Uploads', 'Popular uploads', 'Created playlists'].map((title) => (
          <Playlist key={title} playlistTitle={title}>
            <Cards />
          </Playlist>
        ))}
      </div>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Componha a linha com VideoCardSmall: o Playlist já controla a largura de cada cartão.',
        'Empilhe várias faixas: os fios se somam e formam um divisor único entre elas.',
        'Oculte o botão “Play all” quando a playlist não for reproduzível em sequência.',
        'Mantenha a calha de 65px para alinhar os fios ao conteúdo.',
      ]}
      donts={[
        'Não use border-bottom na seção: o fio tem 1070px, não os 1200px do quadro.',
        'Não coloque cartões de outro formato na linha.',
        'Não pinte o rótulo “Play all” em texto primário: o arquivo o usa apagado.',
        'Não desabilite a rolagem horizontal quando houver mais de cinco cartões.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="A faixa sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'deep']} padding={0}>
      {() => (
        <div style={{ width: '100%' }}>
          <Playlist playlistTitle="Playlist Title">
            <Cards count={4} />
          </Playlist>
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="Playlist"
      rows={[
        { name: 'playlistTitle', type: 'React.ReactNode', description: 'Título da playlist, em <h2>.' },
        {
          name: 'playAllLabel',
          type: 'React.ReactNode',
          default: "'Play all'",
          description: 'Rótulo do botão de reprodução em sequência.',
        },
        {
          name: 'showPlayAll',
          type: 'boolean',
          default: 'true',
          description: 'Exibe o botão “Play all”.',
        },
        {
          name: 'onPlayAll',
          type: '() => void',
          description: 'Chamado ao acionar o botão de reprodução em sequência.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Cartões da linha. Componha com VideoCardSmall.',
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
  render: () => <PlaylistDocumentationPage />,
};

/**
 * Playground com 100% das props do Playlist expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Playlist',
  render: (args) => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <Playlist {...args}>
        <Cards />
      </Playlist>
    </div>
  ),
};

/**
 * Réplica visual do nó `Media/Playlist` (19:1562), 1200×288.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ width: 1200, maxWidth: '100%', background: 'var(--uni-color-background-primary)' }}
    >
      <Playlist playlistTitle="Playlist Title">
        <Cards />
      </Playlist>
    </div>
  ),
};

/**
 * Quatro faixas empilhadas, como na tela de canal.
 */
export const ComposicaoModular: Story = {
  name: 'Composição modular',
  render: () => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      {['Playlist Title', 'Uploads', 'Popular uploads', 'Created playlists'].map((title) => (
        <Playlist key={title} playlistTitle={title}>
          <Cards />
        </Playlist>
      ))}
    </div>
  ),
};
