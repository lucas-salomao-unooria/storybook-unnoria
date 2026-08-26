import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import {
  uniSpacing,
  uniRadius,
  uniDimensions,
  uniAvatarSizes,
  uniShortsSizes,
} from '../../../src/unootube/tokens';
import { Avatar, SearchBox, TopMenuItem, VideoCard } from '../../../src/unootube';
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
import { avatars, videos } from '../fixtures';

const meta: Meta = {
  title: 'Unootube/Fundamentos/Espaçamento & Layout',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

const SpacingDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Fundamentos • Espaçamento & Layout"
      title="Espaçamento & Layout"
      description="Treze degraus de espaçamento, oito raios e um conjunto de dimensões estruturais medidas nó a nó. O arquivo declara base de 4px, mas a escala publicada preserva degraus finos de 1, 2, 6 e 10 pixels — que não podem ser arredondados para a grade."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Como a régua se organiza e o que ela governa."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="📐" title="Base de 4px com degraus finos">
        O cabeçalho da página declara “Base unit: 4px”, mas a escala publica 1, 2, 6 e 10 além dos
        múltiplos de quatro. Os degraus finos existem para fios, cápsulas e recuos de linha — é
        proibido arredondá-los.
      </UniDocCard>
      <UniDocCard icon="🔲" title="Oito raios, do fio à cápsula">
        De <code>0</code> a <code>80px</code>. O degrau <code>full</code> é literalmente 80px no
        arquivo, e não um valor arbitrariamente grande: o quadro de raios o rotula assim.
      </UniDocCard>
      <UniDocCard icon="📏" title="Dimensões medidas nó a nó">
        O arquivo posiciona as telas em coordenadas absolutas, sem auto layout na maioria dos
        quadros. As medidas estruturais — barra de 56px, lateral de 240px, colunas de 664 e 426 —
        foram lidas dos nós e registram o <code>figmaNode</code>.
      </UniDocCard>
      <UniDocCard icon="👤" title="Seis diâmetros de avatar">
        24, 32, 36, 40, 48 e 80 pixels, cada um medido em um contexto diferente. São todos literais:
        é proibido consolidá-los em uma escala derivada por cálculo.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="106:3125"
      frameName="Spacing e Radius — página 🎨 Design System"
      specs={[
        { label: 'Espaçamento', value: '13 degraus (0 a 64)' },
        { label: 'Raios', value: '8 degraus (0 a 80) + o de 4px do segundo arquivo' },
        { label: 'Quadro de tela', value: '1440 × 1024' },
        { label: 'Calha de conteúdo', value: '65px' },
        { label: 'Quadros móveis', value: '390 × 844 e 360 × 800' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Calha de 65px não está na escala',
          detail:
            'a calha lateral do conteúdo em largura total (playlist e cartão horizontal) mede 65px, um valor que a escala de espaçamento não publica. Foi tokenizado como --uni-content-gutter em vez de forçado para 64px.',
        },
        {
          subject: 'Medidas fracionárias e ímpares preservadas',
          detail:
            'o contorno da pílula inativa mede 0,3px; o recuo da cápsula de duração usa 3px; o recuo vertical do cartão da coluna lateral usa 7px; o do cabeçalho de canal usa 18px e 22px. Nenhum foi arredondado — todos estão anotados no CSS do componente.',
        },
        {
          subject: 'Ausência de auto layout na maioria dos quadros',
          detail:
            'as três telas e vários componentes são posicionados por coordenada. Os componentes reconstroem a geometria com flex, preservando as medidas lidas nó a nó.',
        },
        {
          subject: 'Espaçamentos por coordenada na barra de filtros',
          detail:
            'as 28 pílulas do menu superior têm intervalos irregulares no arquivo. O TopMenuBar usa um intervalo único de 12px, equivalente à distância média medida.',
        },
        {
          subject: 'Raio de 4px ausente da coleção publicada',
          detail:
            'a coleção Radius do arquivo original salta de 2px para 8px. O arquivo de Shorts aplica 4px no botão de inscrição (3:208), no botão de som (3:238) e na pílula de filtro móvel (1:220). Foi tokenizado como --uni-radius-control, nomeado por uso e não por posição na escala, para não se confundir com --uni-radius-sm.',
        },
        {
          subject: 'Dois quadros de dispositivo do segundo arquivo',
          detail:
            'o arquivo de Shorts publica as mesmas telas em 390×844 (iPhone) e 360×800 (Android). As duas medidas são literais e não foram consolidadas — o PhoneFrame expõe as duas.',
        },
        {
          subject: 'Dois diâmetros de avatar fora da escala nomeada',
          detail:
            'a linha de canal do reprodutor de Shorts usa 38px (3:487) e o cabeçalho de canal móvel usa 77px (16:1082). Os dois entram por size numérico no Avatar, e não como degraus nomeados, para que a escala nomeada continue refletindo apenas o arquivo original.',
        },
        {
          subject: 'Espaçamento irregular da barra de abas móvel',
          detail:
            'o arquivo agrupa os três primeiros destinos com 34px entre eles e afasta os dois últimos com 24px. O MobileTabBar distribui os cinco alvos uniformemente, porque a régua do arquivo não sobrevive a uma janela de largura diferente da do quadro.',
        },
        {
          subject: 'Pontos de quebra ausentes',
          detail:
            'o arquivo publica apenas o quadro de 1440px. Os pontos de quebra em 900px e 800px foram acrescentados para que a barra superior, o cartão horizontal e as colunas não se quebrem em janelas menores — comportamento que o arquivo não descreve.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia da régua"
      description="Espaçamento, raios, dimensões e diâmetros de avatar."
      barColor="#9EBFD0"
    />

    <h4 style={{ margin: '0 0 12px 0', fontSize: 15, color: '#22272A' }}>Escala de espaçamento</h4>
    <div
      data-uni-theme="dark"
      style={{
        background: 'var(--uni-color-background-primary)',
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        padding: 24,
        marginBottom: 32,
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {Object.entries(uniSpacing).map(([key, token]) => (
        <div
          key={key}
          style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '7px 0' }}
        >
          <span
            style={{
              width: 150,
              flex: 'none',
              fontSize: 12,
              fontFamily: 'ui-monospace, Menlo, monospace',
              color: 'var(--uni-color-text-secondary)',
            }}
          >
            {token.cssVar}
          </span>
          <span
            style={{
              width: 48,
              flex: 'none',
              fontSize: 12,
              color: 'var(--uni-color-text-primary)',
            }}
          >
            {token.value}px
          </span>
          <span
            style={{
              height: 10,
              width: Math.max(token.value * 6, 2),
              background: 'var(--uni-color-brand-primary)',
              flex: 'none',
            }}
          />
          <span style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)' }}>
            {token.usage}
          </span>
        </div>
      ))}
    </div>

    <h4 style={{ margin: '0 0 12px 0', fontSize: 15, color: '#22272A' }}>Raios de borda</h4>
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        background: 'var(--uni-color-background-primary)',
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        padding: 24,
        marginBottom: 32,
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {Object.entries(uniRadius).map(([key, token]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: 'var(--uni-color-background-surface)',
              borderRadius: token.value,
            }}
          />
          <div style={{ fontSize: 12, color: 'var(--uni-color-text-primary)', marginTop: 8 }}>
            {key}
          </div>
          <div style={{ fontSize: 11, color: 'var(--uni-color-text-secondary)' }}>
            {token.value}px
          </div>
        </div>
      ))}
    </div>

    <h4 style={{ margin: '0 0 12px 0', fontSize: 15, color: '#22272A' }}>
      Medidas do Shorts e do cromo móvel
    </h4>
    <div style={{ border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'auto', marginBottom: 32 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: '#F5F5F5' }}>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Variável</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Valor</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Uso</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Figma</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(uniShortsSizes).map(([key, token]) => (
            <tr key={key} style={{ borderTop: '1px solid #E4E8E9' }}>
              <td
                style={{
                  padding: '10px 14px',
                  fontFamily: 'ui-monospace, Menlo, monospace',
                  fontSize: 12,
                  color: '#22272A',
                }}
              >
                {token.cssVar}
              </td>
              <td
                style={{
                  padding: '10px 14px',
                  fontFamily: 'ui-monospace, Menlo, monospace',
                  fontSize: 12,
                  color: '#6487C2',
                }}
              >
                {token.value}px
              </td>
              <td style={{ padding: '10px 14px', color: '#475157', lineHeight: 1.5 }}>
                {token.usage}
              </td>
              <td
                style={{
                  padding: '10px 14px',
                  fontFamily: 'ui-monospace, Menlo, monospace',
                  fontSize: 11.5,
                  color: '#475157',
                }}
              >
                {token.figmaNode ?? '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h4 style={{ margin: '0 0 12px 0', fontSize: 15, color: '#22272A' }}>
      Diâmetros de avatar
    </h4>
    <UniDocStage label="Os seis diâmetros nomeados do arquivo original, mais os dois literais do arquivo de Shorts" surface="primary" gap={20}>
      {Object.entries(uniAvatarSizes).map(([key, token]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <Avatar src={avatars.marcusLevin} alt="" size={token.value} />
          <div
            style={{
              fontSize: 11,
              color: 'var(--uni-color-text-secondary)',
              marginTop: 6,
              fontFamily: 'var(--uni-font-sans)',
            }}
          >
            {key} · {token.value}px
          </div>
        </div>
      ))}
    </UniDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de aplicação"
      description="As medidas em uso nos componentes reais."
      barColor="#EE1A26"
    />
    <UniDocStage label="Raio sm (2px) no campo de busca, xl (32px) na pílula" surface="secondary" direction="column" align="stretch" gap={20}>
      <SearchBox />
      <div style={{ display: 'flex', gap: 12 }}>
        <TopMenuItem label="All" active />
        <TopMenuItem label="Music" />
        <TopMenuItem label="Gaming" />
      </div>
    </UniDocStage>
    <UniDocStage label="Cartão de 276px: a medida que governa a grade inicial" surface="primary" gap={16}>
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
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use os tokens de espaçamento em padding, margin e gap — nunca pixels avulsos.',
        'Aplique --uni-content-gutter nas seções de largura total, para que os fios divisores fiquem alinhados ao conteúdo.',
        'Escolha o diâmetro de avatar pelo contexto, usando os seis tokens publicados.',
        'Preserve as medidas fracionárias anotadas: 0,3px de contorno e 3px de recuo têm razão de ser.',
      ]}
      donts={[
        'Não arredonde os degraus finos de 1, 2, 6 e 10 para a grade de 4px.',
        'Não force a calha de 65px para 64px: é uma medida própria do arquivo.',
        'Não derive diâmetros de avatar por cálculo — os seis são literais.',
        'Não use o raio full (80px) em superfície retangular: ele existe para avatares.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="As medidas sobre as superfícies escuras oficiais."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'surface']}>
      {() => (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Avatar src={avatars.annaWhite} alt="" size="xl" />
          <TopMenuItem label="Pílula de 32px" active />
          <div
            style={{
              width: 120,
              height: 40,
              background: 'var(--uni-color-background-field)',
              borderRadius: 'var(--uni-radius-sm)',
            }}
          />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência completa de tokens"
      description="Espaçamento, raios e dimensões estruturais."
      barColor="#EE1A26"
    />
    <UniDocPropsTable
      title="Espaçamento"
      rows={Object.values(uniSpacing).map((token) => ({
        name: token.cssVar,
        type: 'length',
        default: `${token.value}px`,
        description: `${token.usage}${token.figmaNode ? ` · node ${token.figmaNode}` : ''}`,
      }))}
    />
    <UniDocPropsTable
      title="Raios"
      rows={Object.values(uniRadius).map((token) => ({
        name: token.cssVar,
        type: 'length',
        default: `${token.value}px`,
        description: `${token.usage}${token.figmaNode ? ` · node ${token.figmaNode}` : ''}`,
      }))}
    />
    <UniDocPropsTable
      title="Dimensões estruturais"
      rows={Object.values(uniDimensions).map((token) => ({
        name: token.cssVar,
        type: 'length',
        default: `${token.value}px`,
        description: `${token.usage}${token.figmaNode ? ` · node ${token.figmaNode}` : ''}`,
      }))}
    />
    <UniDocPropsTable
      title="Diâmetros de avatar"
      rows={Object.values(uniAvatarSizes).map((token) => ({
        name: token.cssVar,
        type: 'length',
        default: `${token.value}px`,
        description: `${token.usage}${token.figmaNode ? ` · node ${token.figmaNode}` : ''}`,
      }))}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa da régua de medidas baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SpacingDocumentationPage />,
};

/**
 * Réplica do quadro `Spacing` (106:3125) do arquivo de design.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        background: 'var(--uni-color-background-primary)',
        padding: 40,
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      <h2
        style={{
          margin: '0 0 8px 0',
          fontSize: 24,
          fontWeight: 700,
          color: 'var(--uni-color-text-primary)',
        }}
      >
        Spacing Tokens
      </h2>
      <p style={{ margin: '0 0 24px 0', fontSize: 13, color: 'var(--uni-color-text-secondary)' }}>
        Base unit: 4px · Used for padding, margins, gaps
      </p>
      {Object.values(uniSpacing).map((token) => (
        <div
          key={token.cssVar}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
        >
          <span
            style={{ width: 80, fontSize: 13, color: 'var(--uni-color-text-primary)' }}
          >
            spacing/{token.value}
          </span>
          <span style={{ width: 40, fontSize: 13, color: 'var(--uni-color-text-primary)' }}>
            {token.value}px
          </span>
          <span
            style={{
              height: 10,
              width: token.value * 6,
              background: 'var(--uni-color-brand-primary)',
            }}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * Os oito raios publicados, na medida real.
 */
export const Raios: Story = {
  name: 'Raios de borda',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        background: 'var(--uni-color-background-primary)',
        padding: 40,
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {Object.entries(uniRadius).map(([key, token]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 88,
              height: 88,
              background: 'var(--uni-color-background-surface)',
              borderRadius: token.value,
            }}
          />
          <div style={{ fontSize: 12, color: 'var(--uni-color-text-primary)', marginTop: 8 }}>
            {key}
          </div>
          <div style={{ fontSize: 11, color: 'var(--uni-color-text-secondary)' }}>
            {token.value}px
          </div>
        </div>
      ))}
    </div>
  ),
};
