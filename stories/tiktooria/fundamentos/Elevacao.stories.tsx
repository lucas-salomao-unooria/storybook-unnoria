import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { tikElevationTokens } from '../../../src/tiktooria/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocStage,
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { Button, PhotoCard, SettingsRow, TabBar, Tooltip } from '../../../src/tiktooria';
import { tikPhotos } from '../fixtures';

const meta: Meta = {
  title: 'Tik Tooria/Fundamentos/Elevação',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

const ElevationSample: React.FC<{ token: (typeof tikElevationTokens)[number] }> = ({ token }) => {
  const isHairline = token.value.includes(' 0 ') && !token.value.includes('px 0.') === false;
  const isTextDrop = token.cssVar === '--tik-text-drop';

  return (
    <div
      style={{
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        padding: 20,
        background: '#FFFFFF',
      }}
    >
      <div
        style={{
          height: 76,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 14,
          background: isTextDrop ? '#161722' : '#F5F5F5',
          borderRadius: 8,
        }}
      >
        {isTextDrop ? (
          <span
            style={{
              fontFamily: 'var(--tik-font-sans)',
              fontSize: 13,
              fontWeight: 600,
              color: '#FFFFFF',
              textShadow: token.value,
            }}
          >
            328.7K
          </span>
        ) : (
          <div
            style={{
              width: 120,
              height: 44,
              background: '#FFFFFF',
              borderRadius: 8,
              boxShadow: token.value,
            }}
          />
        )}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#22272A' }}>
        {token.figmaStyle ? `${token.figmaStyle} · publicado` : 'Efeito local'}
      </div>
      <code
        style={{
          display: 'block',
          fontSize: 11.5,
          color: '#6487C2',
          marginTop: 4,
          wordBreak: 'break-all',
        }}
      >
        {token.cssVar}
      </code>
      <code
        style={{
          display: 'block',
          fontSize: 11,
          color: '#475157',
          marginTop: 2,
          wordBreak: 'break-all',
        }}
      >
        {token.value}
      </code>
      <div style={{ fontSize: 12.5, color: '#475157', marginTop: 8, lineHeight: 1.5 }}>
        {token.usage}
      </div>
      {token.figmaNode && (
        <div style={{ fontSize: 11, color: '#6487C2', marginTop: 4 }}>node {token.figmaNode}</div>
      )}
      {isHairline && null}
    </div>
  );
};

const ElevationDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Fundamentos • Elevação"
      title="Elevação"
      description="A biblioteca é plana por padrão. O arquivo Figma publica apenas dois estilos de efeito — “Action Button Shadow” e “Text Drop” — e separa barras, linhas e folhas por fios de 0,33px (sombras de raio 0), não por desfoque. Desfoque real existe só em cinco alvos flutuantes."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="📄" title="Plano por padrão">
        Linhas de configuração, campos, chips e folhas inferiores não têm sombra alguma no arquivo. A
        separação vem de contraste de luminância e de fios.
      </TikDocCard>
      <TikDocCard icon="➖" title="Fios são sombras de raio 0">
        As barras usam <code>box-shadow: 0 ±0.33px 0 cor</code>. Isso mantém o fio fora do fluxo de
        layout — uma <code>border</code> de 1px somaria altura e engrossaria a linha.
      </TikDocCard>
      <TikDocCard icon="✍️" title="Text Drop sobre vídeo">
        Rótulos e contadores sobre o feed recebem <code>--tik-text-drop</code>{' '}
        (<code>1px 1px 0 rgba(0,0,0,0.3)</code>), único recurso de legibilidade que o arquivo aplica.
      </TikDocCard>
      <TikDocCard icon="☁️" title="Desfoque em cinco lugares">
        Botão flutuante, chamada do perfil, cartão de fotografia, logotipo de SMS e moldura de upload.
        Nada além disso.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:171"
      frameName="Página TikTok — estilos de efeito e efeitos locais"
      specs={[
        { label: 'Estilos de efeito publicados', value: '2' },
        { label: 'Efeitos locais tokenizados', value: '11' },
        { label: 'Fios de 0,33px', value: '4 tons distintos' },
        { label: 'Efeitos com desfoque', value: '5' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Action Button Shadow em duas intensidades',
          detail:
            'o estilo publicado usa preto a 10%, mas o contador de fotos do seletor de upload aplica a mesma geometria com preto a 20%. Os dois foram preservados: --tik-elevation-action-button e -strong.',
        },
        {
          subject: 'Quatro tons de fio',
          detail:
            'o arquivo usa #D0D1D3 nas barras de cromo, #262626 na barra de abas imersiva, #E3E3E4 no cabeçalho da página de som e #DADBDB no separador interno da folha. Nenhum foi consolidado.',
        },
        {
          subject: 'Efeitos empilhados no cartão de fotografia',
          detail:
            'o nó 4:631 acumula duas sombras: preto a 25% embaixo e branco a 10% na aresta superior. As duas são aplicadas na mesma declaração, na ordem do arquivo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia dos efeitos"
      description="Os 13 efeitos oficiais, com o valor literal e o nó de origem."
      barColor="#65D2E9"
    />
    <TikDocGrid min={280}>
      {tikElevationTokens.map((token) => (
        <ElevationSample key={token.cssVar} token={token} />
      ))}
    </TikDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de aplicação em componentes"
      description="Os mesmos componentes de produção que consomem cada efeito."
      barColor="#161722"
    />
    <TikDocStage label="Fio inferior de barra — SettingsRow sem sombra própria" surface="chrome" direction="column" align="stretch" width={414}>
      <SettingsRow label="Manage my account" icon="accountStroke" />
      <SettingsRow label="Privacy and safety" icon="lock" />
    </TikDocStage>
    <TikDocStage label="Fio superior — TabBar nos dois contextos" surface="chrome" direction="column" align="stretch" width={414}>
      <TabBar surface="chrome">
        <TabBar.Item icon="homeSolid" label="Home" active />
        <TabBar.Item icon="search" label="Discover" />
        <TabBar.CreateButton surface="chrome" />
        <TabBar.Item icon="messageStroke" label="Inbox" />
        <TabBar.Item icon="accountStroke" label="Me" />
      </TabBar>
    </TikDocStage>
    <TikDocStage label="Desfoque — botão flutuante, chamada e cartão de fotografia" surface="chrome" gap={28}>
      <Button variant="floating" icon="videoCameraSolid">
        Use this sound
      </Button>
      <Tooltip title="Tap to create" description="a new video" />
      <PhotoCard src={tikPhotos[0]} width={120} height={200} counter="3/22" />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use os tokens --tik-elevation-bar-* para separar barras: são sombras de raio 0, não bordas.',
        'Aplique --tik-text-drop a qualquer texto que fique diretamente sobre o vídeo.',
        'Empilhe --tik-elevation-photo-rim antes de --tik-elevation-photo, na ordem do arquivo.',
        'Escolha o fio pelo contexto: #262626 sobre preto, #D0D1D3 sobre branco.',
      ]}
      donts={[
        'Não adicione box-shadow a linhas, campos, chips ou folhas inferiores — o arquivo não tem.',
        'Não substitua o fio de 0,33px por border: 1px, que engrossa a linha e altera o layout.',
        'Não use o mesmo fio nos dois contextos: o tom claro desaparece sobre preto.',
        'Não invente elevação para criar hierarquia; use contraste de superfície, como o arquivo faz.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O fio da barra de abas muda de tom entre os contextos; a geometria é a mesma."
      barColor="#65D2E9"
    />
    <TikDocSurfaceSwitcher>
      {(surface) => (
        <div style={{ width: 414 }}>
          <TabBar surface={surface === 'immersive' ? 'immersive' : 'chrome'}>
            <TabBar.Item icon="homeSolid" label="Home" active />
            <TabBar.Item icon="search" label="Discover" />
            <TabBar.CreateButton surface={surface === 'immersive' ? 'immersive' : 'chrome'} />
            <TabBar.Item icon="messageStroke" label="Inbox" />
            <TabBar.Item icon="accountStroke" label="Me" />
          </TabBar>
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência da API de tokens"
      description="tikElevationTokens exporta cssVar, value, usage, figmaNode e figmaStyle."
      barColor="#161722"
    />
    <TikDocCard icon="📦" title="Consumo em CSS">
      <pre style={{ margin: 0, fontSize: 12.5, whiteSpace: 'pre-wrap' }}>{`.minha-barra-superior { box-shadow: var(--tik-elevation-bar-bottom); }
.minha-barra-imersiva { box-shadow: var(--tik-elevation-bar-top-immersive); }
.meu-contador-sobre-video { text-shadow: var(--tik-text-drop); }`}</pre>
    </TikDocCard>
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa da elevação, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ElevationDocumentationPage />,
};

/**
 * Os 13 efeitos oficiais em uma grade única.
 */
export const TodosOsEfeitos: Story = {
  name: '☁️ Todos os efeitos',
  render: () => (
    <UnooriaDocShell>
      <TikDocGrid min={280}>
        {tikElevationTokens.map((token) => (
          <ElevationSample key={token.cssVar} token={token} />
        ))}
      </TikDocGrid>
    </UnooriaDocShell>
  ),
};

/**
 * Apenas os dois estilos de efeito que o arquivo publica.
 */
export const EstilosPublicados: Story = {
  name: '⭐ Estilos publicados pelo Figma',
  render: () => (
    <UnooriaDocShell>
      <TikDocGrid min={300}>
        {tikElevationTokens
          .filter((token) => token.figmaStyle)
          .map((token) => (
            <ElevationSample key={token.cssVar} token={token} />
          ))}
      </TikDocGrid>
    </UnooriaDocShell>
  ),
};
