import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { uniElevation } from '../../../src/unootube/tokens';
import { Sidebar, SidebarMenuItem, TopMenuBar, VideoCard } from '../../../src/unootube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { categories, videos } from '../fixtures';

const meta: Meta = {
  title: 'Unootube/Fundamentos/Elevação',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

const ElevationDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Fundamentos • Elevação"
      title="Elevação"
      description="Três degraus de sombra, publicados com nome e uso pelo próprio arquivo. A biblioteca, no entanto, é plana por padrão: nenhuma das três telas reconstruídas aplica box-shadow em barra, cartão ou lista — a separação é feita por luminância de superfície e por fios de 1px."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Por que três sombras existem e por que quase nada as usa."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🪜" title="Luminância antes de sombra">
        A hierarquia de camadas do arquivo é cromática: a página é <code>#181818</code>, a barra é{' '}
        <code>#212121</code> e a superfície interativa é <code>#303030</code>. Cada degrau é
        visivelmente mais claro que o anterior — a sombra seria redundante.
      </UniDocCard>
      <UniDocCard icon="✂️" title="Fios de 1px como divisor">
        Barra lateral, playlist, descrição de vídeo e menu superior se separam por fios de 1px em{' '}
        <code>--uni-color-border-subtle</code>. Na barra lateral o fio tem 224px contra os 240px da
        barra — a folga à direita é deliberada.
      </UniDocCard>
      <UniDocCard icon="🎚️" title="Três degraus para camadas flutuantes">
        <code>Low</code> para cartões e botões que precisem de destaque, <code>Medium</code> para
        menus suspensos e popovers, <code>High</code> para diálogos e folhas. Nenhum aparece nas
        telas publicadas.
      </UniDocCard>
      <UniDocCard icon="🚫" title="Nada de sombra em superfície plana">
        Introduzir <code>box-shadow</code> em barra, cartão de vídeo ou linha de lista contradiz o
        arquivo. Os três degraus existem para o que flutua acima da página, não para decorar o que
        está nela.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="106:3214"
      frameName="Elevation (Shadows) — página 🎨 Design System"
      specs={[
        { label: 'Degraus publicados', value: '3' },
        { label: 'Low', value: '0 1 3 · preto 12%' },
        { label: 'Medium', value: '0 4 8 · preto 16%' },
        { label: 'High', value: '0 8 16 · preto 20%' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Degraus publicados sem uso em componente',
          detail:
            'os três degraus são documentados no quadro de elevação, mas nenhum nó das três telas os aplica. Foram tokenizados por fidelidade à documentação do arquivo, e nenhum componente da biblioteca os consome por padrão.',
        },
        {
          subject: 'Sombra local do selo HD',
          detail:
            'as letras “HD” do reprodutor carregam um drop shadow local de deslocamento 1px em #560A0F, que não corresponde a nenhum dos três degraus. Como é um efeito de um único nó decorativo, não foi tokenizado nem reproduzido.',
        },
        {
          subject: 'Traço de 10% nos glifos do reprodutor',
          detail:
            'cada glifo de controle carrega um traço de 1px em preto a 10%. Não é elevação — é o que mantém o glifo legível sobre quadros de vídeo claros —, e por isso é reproduzido como stroke, não como sombra.',
        },
        {
          subject: 'Véus do reprodutor',
          detail:
            'os dois retângulos de 96px com gradiente linear no topo e na base do quadro cumprem papel de separação, mas são preenchimento, não efeito. Estão tokenizados como --uni-gradient-player-top e -bottom, junto das cores.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia dos degraus"
      description="Os três degraus, reproduzidos com o cartão de demonstração do arquivo."
      barColor="#9EBFD0"
    />
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 32,
        flexWrap: 'wrap',
        background: 'var(--uni-color-background-primary)',
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        padding: 40,
        marginBottom: 32,
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {Object.entries(uniElevation).map(([key, token]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 200,
              height: 100,
              borderRadius: 12,
              background: '#262626',
              boxShadow: token.value,
            }}
          />
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--uni-color-text-primary)',
              marginTop: 12,
            }}
          >
            {token.figmaName}
          </div>
          <div style={{ fontSize: 10, color: '#737373', marginTop: 6 }}>{token.usage}</div>
          <div
            style={{
              fontSize: 10,
              color: 'var(--uni-color-text-secondary)',
              marginTop: 6,
              fontFamily: 'ui-monospace, Menlo, monospace',
            }}
          >
            {token.cssVar}
          </div>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="4. Matriz de aplicação"
      description="Como o arquivo separa camadas sem usar nenhuma das três sombras."
      barColor="#EE1A26"
    />
    <UniDocStage label="Separação por luminância: barra sobre página" surface="primary" direction="column" align="stretch" padding={0}>
      <TopMenuBar options={categories.slice(0, 6)} activeId="all" />
      <div style={{ display: 'flex', gap: 16, padding: 24, flexWrap: 'wrap' }}>
        {videos.slice(0, 3).map((video) => (
          <VideoCard
            key={video.id}
            thumbnailSrc={video.thumbnailSrc}
            avatarSrc={video.avatarSrc}
            duration={video.duration}
            videoTitle={video.videoTitle}
            channelName={video.channelName}
            metadata={video.metadata}
          />
        ))}
      </div>
    </UniDocStage>
    <UniDocStage label="Separação por fio de 1px: blocos da barra lateral" surface="primary" align="stretch" padding={0}>
      <Sidebar style={{ height: 320 }}>
        <Sidebar.Section>
          <SidebarMenuItem icon="home" activeIcon="homeFill" menuLabel="Home" active />
          <SidebarMenuItem icon="explore" menuLabel="Explore" />
        </Sidebar.Section>
        <Sidebar.Section divider={false}>
          <SidebarMenuItem icon="library" menuLabel="Library" />
          <SidebarMenuItem icon="history" menuLabel="History" />
        </Sidebar.Section>
      </Sidebar>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Separe camadas por luminância de superfície e por fios de 1px, como as telas fazem.',
        'Reserve --uni-elevation-medium e -high para o que realmente flutua: menus e diálogos.',
        'Use --uni-color-border-subtle para todo divisor: é o contorno que as telas aplicam.',
        'Deixe a superfície interativa (#303030) marcar o item ativo, em vez de elevá-lo.',
      ]}
      donts={[
        'Não aplique box-shadow em barra, cartão de vídeo, linha de lista ou pílula de filtro.',
        'Não empilhe dois degraus de elevação no mesmo elemento.',
        'Não substitua a escada de luminância por sombra: contradiz o arquivo.',
        'Não use --uni-color-border-default como divisor — é um neutro claro, e nenhuma tela o aplica.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="Os três degraus sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'deep']}>
      {() => (
        <>
          {Object.entries(uniElevation).map(([key, token]) => (
            <div
              key={key}
              style={{
                width: 150,
                height: 80,
                borderRadius: 12,
                background: '#262626',
                boxShadow: token.value,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--uni-color-text-primary)',
                fontFamily: 'var(--uni-font-sans)',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {key}
            </div>
          ))}
        </>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência completa de tokens"
      description="Os três degraus e seu uso declarado."
      barColor="#EE1A26"
    />
    <UniDocPropsTable
      title="Elevação"
      rows={Object.values(uniElevation).map((token) => ({
        name: token.cssVar,
        type: 'box-shadow',
        default: token.value,
        description: `${token.usage} · ${token.figmaName} · node ${token.figmaNode}`,
      }))}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa da elevação baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ElevationDocumentationPage />,
};

/**
 * Réplica do quadro `Elevation (Shadows)` (106:3214) do arquivo de design.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        background: '#181818',
        borderRadius: 16,
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      <p style={{ margin: 0, fontSize: 24, lineHeight: '32px', fontWeight: 700, color: '#FFFFFF' }}>
        Elevation (Shadows)
      </p>
      <div style={{ display: 'flex', gap: 32 }}>
        {Object.values(uniElevation).map((token) => (
          <div
            key={token.cssVar}
            style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}
          >
            <div
              style={{
                width: 200,
                height: 100,
                borderRadius: 12,
                background: '#262626',
                boxShadow: token.value,
              }}
            />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>
              {token.figmaName}
            </span>
            <span style={{ fontSize: 10, color: '#737373' }}>{token.usage}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * A biblioteca é plana: as telas separam camadas sem nenhuma sombra.
 */
export const BibliotecaPlana: Story = {
  name: 'Biblioteca plana',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ background: 'var(--uni-color-background-primary)', padding: 0 }}
    >
      <TopMenuBar options={categories.slice(0, 8)} activeId="all" />
      <div style={{ display: 'flex', gap: 16, padding: 24, flexWrap: 'wrap' }}>
        {videos.slice(0, 4).map((video) => (
          <VideoCard
            key={video.id}
            thumbnailSrc={video.thumbnailSrc}
            avatarSrc={video.avatarSrc}
            duration={video.duration}
            videoTitle={video.videoTitle}
            channelName={video.channelName}
            metadata={video.metadata}
          />
        ))}
      </div>
    </div>
  ),
};
