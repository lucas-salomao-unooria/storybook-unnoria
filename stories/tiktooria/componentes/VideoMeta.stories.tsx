import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { VideoMeta } from '../../../src/tiktooria';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocAnatomy,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocPropsTable,
  TikDocStage,
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { tikFeedForYou } from '../fixtures';

const meta: Meta<typeof VideoMeta> = {
  title: 'Tik Tooria/Componentes/VideoMeta',
  component: VideoMeta,
  parameters: { layout: 'padded' },
  argTypes: {
    handle: { control: 'text' },
    caption: { control: 'text' },
    tags: { control: 'text' },
    music: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    handle: '@craig_love',
    caption: 'The most satisfying Job',
    tags: '#fyp #satisfying #roadmarking',
    music: 'Roddy Roundicch - The Rou',
  },
};

export default meta;

type Story = StoryObj<typeof VideoMeta>;


const VideoMetaDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Feed"
      title="VideoMeta"
      description="Bloco de autoria, legenda e trilha sonora no canto inferior esquerdo do feed. A legenda separa dois pesos no mesmo parágrafo — texto corrido em Regular a 90% de opacidade e hashtags em Semibold em branco cheio — e é o único lugar do arquivo com altura de linha declarada (19,5px). O letreiro de música reproduz o preenchimento em gradiente linear que esmaece as duas pontas."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="👤" title="Autoria em Semibold 17">
        O identificador usa o mesmo degrau do @handle do perfil, o que amarra as duas telas.
      </TikDocCard>
      <TikDocCard icon="📝" title="Legenda com dois pesos">
        Texto corrido em Regular a 90% e hashtags em Semibold em branco cheio, no mesmo parágrafo — como o arquivo faz com dois nós de texto.
      </TikDocCard>
      <TikDocCard icon="🎵" title="Letreiro com esmaecimento">
        O nome da trilha é pintado com <code>--tik-gradient-marquee</code> recortado no texto, reproduzindo as paradas do nó 4:1092.
      </TikDocCard>
      <TikDocCard icon="📐" title="Largura de 332px">
        A legenda ocupa no máximo 332px, deixando livre a coluna da trilha de ações.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:1063"
      frameName="Info + Music — TikTok Home (For You)"
      specs={[
        { label: 'Largura máxima', value: '332px' },
        { label: 'Autoria', value: 'Semibold 17' },
        { label: 'Legenda', value: 'Regular 15 · linha 19,5px' },
        { label: 'Letreiro', value: 'Regular 15 · 206px' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Gradiente como máscara de texto',
          detail:
            'o arquivo pinta o nó de texto com um GRADIENT_LINEAR de cinco paradas. Reproduzido com `background-clip: text`, que é a tradução direta em CSS; o resultado é idêntico, mas exige cor transparente no texto.',
        },
        {
          subject: 'Hashtags no mesmo parágrafo',
          detail:
            'o arquivo usa três spans no mesmo nó de texto para alternar o peso. O componente expõe `caption` e `tags` como props separadas e as concatena, o que preserva o resultado e torna o conteúdo programável.',
        },
        {
          subject: 'Sem animação de letreiro',
          detail:
            'o arquivo é estático e o esmaecimento das pontas apenas sugere rolagem. Nenhuma animação foi acrescentada.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Identificador', role: 'Autoria em Semibold 17 em branco.', token: '--tik-font-handle-* · --tik-color-text-on-immersive' },
        { name: 'Legenda', role: 'Regular 15 com linha de 19,5px a 90% de opacidade.', token: '--tik-font-caption-*' },
        { name: 'Etiquetas', role: 'Semibold 15 em branco cheio, após a legenda.', token: '--tik-font-caption-strong-*' },
        { name: 'Letreiro de música', role: 'Nota de 12px e nome da trilha com esmaecimento nas pontas.', token: '--tik-gradient-marquee' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Completo — “Home (For You)”" surface="immersive" align="stretch" width={414}>
      <VideoMeta
        handle="@craig_love"
        caption="The most satisfying Job"
        tags="#fyp #satisfying #roadmarking"
        music="Roddy Roundicch - The Rou"
      />
    </TikDocStage>
    <TikDocStage label="Só etiquetas — “Home (Following)”" surface="immersive" align="stretch" width={414}>
      <VideoMeta
        handle="@karennne · 1-28"
        tags="#avicii #wflove"
        music="Avicii - Waiting For Love (ft."
      />
    </TikDocStage>
    <TikDocStage label="Sem trilha sonora" surface="immersive" align="stretch" width={414}>
      <VideoMeta handle="@jacob_w" caption="Sem áudio original" />
    </TikDocStage>
    <TikDocStage label="Legenda longa, quebrando em três linhas" surface="immersive" align="stretch" width={414}>
      <VideoMeta
        handle="@craig_love"
        caption="Uma legenda deliberadamente longa para conferir a altura de linha de 19,5px e a quebra dentro dos 332px de largura máxima"
        tags="#fyp #teste"
        music="Roddy Roundicch - The Rou"
      />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use o VideoMeta apenas sobre superfície imersiva.',
        'Separe legenda e hashtags nas props caption e tags, para preservar os dois pesos.',
        'Respeite a largura máxima de 332px, deixando livre a coluna da trilha de ações.',
        'Omita music quando o vídeo usar áudio original sem trilha creditada.',
      ]}
      donts={[
        'Não escreva as hashtags dentro de caption: elas perderiam o peso Semibold.',
        'Não anime o letreiro — o esmaecimento das pontas é decorativo no arquivo.',
        'Não use o componente sobre cromo claro: o texto branco desaparece.',
        'Não altere a altura de linha de 19,5px da legenda.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher initial="immersive">
      {() => (
        <VideoMeta
          handle="@craig_love"
          caption="The most satisfying Job"
          tags="#fyp #satisfying"
          music="Roddy Roundicch - The Rou"
        />
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="VideoMeta"
      rows={[
        {
          name: 'handle',
          type: "React.ReactNode",
          description:
            'Identificador do autor, renderizado em Semibold 17.',
        },
        {
          name: 'caption',
          type: "React.ReactNode",
          description:
            'Legenda do vídeo, em Regular 15 com altura de linha de 19,5px.',
        },
        {
          name: 'tags',
          type: "React.ReactNode",
          description:
            'Etiquetas exibidas após a legenda, em Semibold 15.',
        },
        {
          name: 'music',
          type: "React.ReactNode",
          description:
            'Nome da trilha sonora, exibido no letreiro com esmaecimento nas pontas.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "React.HTMLAttributes<HTMLDivElement>",
          description:
            'Demais atributos HTML são repassados ao contêiner.',
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
  render: () => <VideoMetaDocumentationPage />,
};

/**
 * Playground com 100% das props do VideoMeta expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do VideoMeta',
  render: (args) => (
    <div
      style={{
        width: 414,
        padding: 24,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <VideoMeta {...args} />
    </div>
  ),
};

/**
 * Réplica visual do frame oficial do Figma, sobre o quadro de vídeo exportado.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        position: 'relative',
        width: 414,
        height: 300,
        overflow: 'hidden',
        background: `center/cover no-repeat url(${tikFeedForYou})`,
      }}
    >
      <div style={{ position: 'absolute', left: 12, bottom: 20 }}>
        <VideoMeta
          handle="@craig_love"
          caption="The most satisfying Job"
          tags="#fyp #satisfying #roadmarking"
          music="Roddy Roundicch - The Rou"
        />
      </div>
    </div>
  ),
};

/**
 * As duas composições publicadas pelo arquivo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        width: 414,
        padding: 24,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <VideoMeta
        handle="@craig_love"
        caption="The most satisfying Job"
        tags="#fyp #satisfying #roadmarking"
        music="Roddy Roundicch - The Rou"
      />
      <VideoMeta
        handle="@karennne · 1-28"
        tags="#avicii #wflove"
        music="Avicii - Waiting For Love (ft."
      />
    </div>
  ),
};
