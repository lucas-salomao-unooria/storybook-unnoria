import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Chip, SoundHeader } from '../../../src/tiktooria';
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
import { tikAlbumCover } from '../fixtures';

const meta: Meta<typeof SoundHeader> = {
  title: 'Tik Tooria/Componentes/SoundHeader',
  component: SoundHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    artist: { control: 'text' },
    videoCount: { control: 'text' },
    coverSrc: { control: 'text' },
    coverAlt: { control: 'text' },
    className: { control: 'text' },
    onBack: { action: 'onBack' },
    onShare: { action: 'onShare' },
    onPlay: { action: 'onPlay' },
  },
  args: {
    title: 'The Round',
    artist: 'Roddy Roundicch',
    videoCount: '1.7M videos',
    coverSrc: tikAlbumCover,
    coverAlt: 'Capa do álbum The Round',
  },
};

export default meta;

type Story = StoryObj<typeof SoundHeader>;


const SoundHeaderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Som"
      title="SoundHeader"
      description="Cabeçalho de 414×265 da tela “TikTok Album”: barra de navegação, capa de 120px com o glifo de reprodução, título em Semibold 20, autor e contagem em Regular 13, e a faixa de ação. O fio inferior é o único do arquivo em #E3E3E4 — todos os outros cabeçalhos usam #D0D1D3."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="💽" title="Capa quadrada de 120px">
        Sem raio: é o único elemento de mídia do arquivo com cantos retos, o que o distingue das miniaturas e dos cartões de fotografia.
      </TikDocCard>
      <TikDocCard icon="▶️" title="Reprodução sobreposta">
        O glifo <code>play</code> de 24px fica centralizado na capa, que é o alvo de toque.
      </TikDocCard>
      <TikDocCard icon="🔤" title="Semibold 20">
        Único uso desse degrau no arquivo — maior que qualquer título de barra.
      </TikDocCard>
      <TikDocCard icon="➖" title="Fio em #E3E3E4">
        Este cabeçalho usa o tom de contorno em vez do tom de fio. É uma exceção do arquivo, preservada.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:806"
      frameName="Top bar — TikTok Album"
      specs={[
        { label: 'Dimensões', value: '414 × 265' },
        { label: 'Capa', value: '120 × 120' },
        { label: 'Título', value: 'Semibold 20' },
        { label: 'Fio inferior', value: '0,33px #E3E3E4' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Fio em tom de contorno',
          detail:
            'o arquivo aplica #E3E3E4 ao fio deste cabeçalho, e não o #D0D1D3 usado nas outras barras. O valor literal foi preservado em --tik-elevation-bar-bottom-outline.',
        },
        {
          subject: 'Contagem de vídeos divergente',
          detail:
            'o texto do nó 4:812 diz “1M videos” na metadados achatada e “1.7M videos” na leitura do nó. O componente recebe o valor por prop, sem fixar nenhum dos dois.',
        },
        {
          subject: 'Altura por conteúdo',
          detail:
            'o arquivo fixa 265px. O componente calcula a altura pelo conteúdo, o que dá a mesma medida com os valores do arquivo e acomoda títulos longos.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Barra de navegação', role: 'Retorno à esquerda e compartilhar à direita, a 18px das bordas.', token: 'glifos arrowBack e share' },
        { name: 'Capa', role: 'Quadrado de 120px com o glifo de reprodução centralizado.', token: '--tik-album-cover' },
        { name: 'Título', role: 'Semibold 20 em tom primário.', token: '--tik-font-title-lg-*' },
        { name: 'Autor e contagem', role: 'Duas linhas em Regular 13 e tom secundário.', token: '--tik-font-meta-*' },
        { name: 'Ação', role: 'Faixa com o chip de favoritos.', token: 'slot action' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Como no arquivo — “TikTok Album”" surface="chrome" align="stretch" direction="column" width={414}>
      <SoundHeader
        title="The Round"
        artist="Roddy Roundicch"
        videoCount="1.7M videos"
        coverSrc={tikAlbumCover}
        coverAlt="Capa do álbum The Round"
        action={
          <Chip icon="bookmarkSmall" fixedWidth>
            Add to Favorites
          </Chip>
        }
      />
    </TikDocStage>
    <TikDocStage label="Sem capa e sem ação" surface="chrome" align="stretch" direction="column" width={414}>
      <SoundHeader title="Som original" artist="craig_love" videoCount="128 videos" />
    </TikDocStage>
    <TikDocStage label="Título longo" surface="chrome" align="stretch" direction="column" width={414}>
      <SoundHeader
        title="Um título de trilha bem mais longo"
        artist="Roddy Roundicch"
        videoCount="1.7M videos"
        coverSrc={tikAlbumCover}
        action={<Chip icon="bookmarkSmall">Add to Favorites</Chip>}
      />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Passe a capa por coverSrc: as imagens são bitmaps informados por prop.',
        'Use o Chip no slot action, como o arquivo faz com “Add to Favorites”.',
        'Mantenha a capa sem raio, distinguindo-a das miniaturas.',
        'Informe coverAlt quando a capa tiver conteúdo descritível.',
      ]}
      donts={[
        'Não arredonde a capa.',
        'Não troque o fio de #E3E3E4 por #D0D1D3: é uma exceção do arquivo.',
        'Não use um botão primary no slot de ação — o arquivo usa um chip.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome']} padding={0}>
      {() => (
        <div style={{ width: 414 }}>
          <SoundHeader
            title="The Round"
            artist="Roddy Roundicch"
            videoCount="1.7M videos"
            coverSrc={tikAlbumCover}
            action={<Chip icon="bookmarkSmall">Add to Favorites</Chip>}
          />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="SoundHeader"
      rows={[
        {
          name: 'title',
          type: "React.ReactNode",
          description:
            'Nome da trilha, em Semibold 20.',
        },
        {
          name: 'artist',
          type: "React.ReactNode",
          description:
            'Autor da trilha, em Regular 13.',
        },
        {
          name: 'videoCount',
          type: "React.ReactNode",
          description:
            'Contagem de vídeos que usam a trilha, em Regular 13.',
        },
        {
          name: 'coverSrc',
          type: "string",
          description:
            'Endereço da capa do álbum, exibida em 120px.',
        },
        {
          name: 'coverAlt',
          type: "string",
          description:
            'Texto alternativo da capa.',
        },
        {
          name: 'action',
          type: "React.ReactNode",
          description:
            'Ação sob os metadados — no arquivo, o chip “Add to Favorites”.',
        },
        {
          name: 'onBack',
          type: "() => void",
          description:
            'Acionado ao clicar na seta de retorno.',
        },
        {
          name: 'onShare',
          type: "() => void",
          description:
            'Acionado ao clicar em compartilhar.',
        },
        {
          name: 'onPlay',
          type: "() => void",
          description:
            'Acionado ao clicar na capa para reproduzir.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "Omit<React.HTMLAttributes<HTMLElement>, 'title'>",
          description:
            'Demais atributos HTML são repassados ao <header>.',
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
  render: () => <SoundHeaderDocumentationPage />,
};

/**
 * Playground com 100% das props do SoundHeader expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SoundHeader',
  render: (args) => (
    <div style={{ width: 414 }}>
      <SoundHeader
        {...args}
        action={
          <Chip icon="bookmarkSmall" fixedWidth>
            Add to Favorites
          </Chip>
        }
      />
    </div>
  ),
};

/**
 * Réplica visual do cabeçalho do frame “TikTok Album” do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 414 }}>
      <SoundHeader
        title="The Round"
        artist="Roddy Roundicch"
        videoCount="1.7M videos"
        coverSrc={tikAlbumCover}
        coverAlt="Capa do álbum The Round"
        action={
          <Chip icon="bookmarkSmall" fixedWidth>
            Add to Favorites
          </Chip>
        }
      />
    </div>
  ),
};

/**
 * Com capa e ação, sem capa e com título longo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 414 }}>
      <SoundHeader
        title="The Round"
        artist="Roddy Roundicch"
        videoCount="1.7M videos"
        coverSrc={tikAlbumCover}
        action={<Chip icon="bookmarkSmall">Add to Favorites</Chip>}
      />
      <SoundHeader title="Som original" artist="craig_love" videoCount="128 videos" />
      <SoundHeader
        title="Um título de trilha bem mais longo"
        artist="Roddy Roundicch"
        videoCount="1.7M videos"
        coverSrc={tikAlbumCover}
      />
    </div>
  ),
};
