import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { uniTypography, UNI_FONT_FAMILY } from '../../../src/unitube/tokens';
import { Comment, SidebarMenuItem, VideoCard, VideoCardSidebar } from '../../../src/unitube';
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
import { avatars, comments, videos } from '../fixtures';

const meta: Meta = {
  title: 'Unitube/Fundamentos/Tipografia',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

const SPECIMEN = 'The quick brown fox';

const TypographyDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Fundamentos • Tipografia"
      title="Tipografia"
      description="Uma família — Roboto —, dois pesos e onze degraus. O arquivo declara letter-spacing zero em todos eles e alturas de linha absolutas em pixels, sem nenhum valor automático na escala publicada. É a escala tipográfica mais enxuta entre as marcas da plataforma."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="O que a escala publica e o que ela deliberadamente não tem."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🔤" title="Roboto, licença aberta">
        Ao contrário da Proxima Nova do Tik Tooria, a Roboto é distribuída pelo Google Fonts sob
        Apache 2.0 e pode ser carregada diretamente. Não há pilha substituta a documentar — apenas
        um fallback de sistema para o caso de a fonte não carregar.
      </UniDocCard>
      <UniDocCard icon="⚖️" title="Dois pesos, e só">
        Regular 400 e Bold 700. O arquivo não usa Medium, Light nem itálico em nenhum degrau da
        escala. A hierarquia é construída por corpo e por cor, não por peso intermediário.
      </UniDocCard>
      <UniDocCard icon="📏" title="Tracking zero em todos os degraus">
        Os onze degraus medem <code>letterSpacing 0%</code>. É proibido inventar tracking — o token{' '}
        <code>--uni-font-tracking</code> existe para que nenhum componente escreva <code>0</code>{' '}
        avulso.
      </UniDocCard>
      <UniDocCard icon="🧱" title="Alturas de linha absolutas">
        Todos os degraus declaram altura em pixels: 32, 28, 24, 22, 20, 18 e 14. Nenhum usa{' '}
        <code>AUTO</code> na escala documentada — o que mantém o ritmo vertical previsível.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="106:3067"
      frameName="Typography — página 🎨 Design System"
      specs={[
        { label: 'Família', value: 'Roboto' },
        { label: 'Degraus', value: '11' },
        { label: 'Pesos', value: '400 e 700' },
        { label: 'Tracking', value: '0 em todos' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Componentes usam alturas automáticas',
          detail:
            'a escala documentada declara alturas em pixels, mas a maioria dos nós de componente do arquivo usa lineHeight AUTO. Os componentes adotam a altura da escala publicada, que é a fonte canônica; a diferença é de no máximo 1px por degrau.',
        },
        {
          subject: 'Combinações fora da escala',
          detail:
            'quatro nós combinam corpo e peso que a escala não pareia: o item de rodapé (13 Bold), a linha de metadados do cartão horizontal (13 Bold), o título do reprodutor completo (18 Regular) e o nome do canal (24 Regular). Os quatro estão anotados no CSS do componente correspondente.',
        },
        {
          subject: 'Peso invertido em relação à hierarquia',
          detail:
            'no reprodutor completo o título usa Regular 18 enquanto a linha de metadados, de hierarquia inferior, usa Bold 14. O arquivo é assim; a inversão foi preservada.',
        },
        {
          subject: 'Altura de linha fracionária do relógio',
          detail:
            'o relógio do reprodutor declara 146,48% sobre corpo 13, resultando em 19,04px. O valor foi preservado em vez de arredondado para os 18px do degrau Body/Small.',
        },
        {
          subject: 'Peso 500 no carregamento da fonte',
          detail:
            'a folha carrega os pesos 400, 500 e 700 da Roboto, mas nenhum token usa 500. O peso está disponível para produtos que precisem de um degrau intermediário sem recarregar a fonte.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia da escala"
      description="Os onze degraus, com corpo, altura, peso e uso declarado pelo arquivo."
      barColor="#9EBFD0"
    />
    <div
      data-uni-theme="dark"
      style={{
        background: 'var(--uni-color-background-primary)',
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        padding: 32,
        marginBottom: 32,
        fontFamily: UNI_FONT_FAMILY,
      }}
    >
      {Object.entries(uniTypography).map(([key, token]) => (
        <div
          key={key}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 20,
            flexWrap: 'wrap',
            padding: '14px 0',
            borderTop: '1px solid var(--uni-color-border-subtle)',
          }}
        >
          <span
            style={{
              width: 130,
              flex: 'none',
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--uni-color-text-secondary)',
              fontFamily: 'ui-monospace, Menlo, monospace',
            }}
          >
            {token.figmaName}
          </span>
          <span
            style={{
              width: 110,
              flex: 'none',
              fontSize: 12,
              color: 'var(--uni-color-text-secondary)',
              fontFamily: 'ui-monospace, Menlo, monospace',
            }}
          >
            {token.fontSize}/{token.lineHeight} {token.fontWeight === 700 ? 'Bold' : 'Regular'}
          </span>
          <span
            style={{
              flex: '1 1 240px',
              fontSize: token.fontSize,
              lineHeight: `${token.lineHeight}px`,
              fontWeight: token.fontWeight,
              letterSpacing: 0,
              color: 'var(--uni-color-text-primary)',
            }}
          >
            {SPECIMEN}
          </span>
          <span
            style={{
              width: 190,
              flex: 'none',
              fontSize: 12,
              color: 'var(--uni-color-text-secondary)',
            }}
          >
            {token.usage}
          </span>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="4. Matriz de aplicação"
      description="Os degraus em uso nos componentes reais."
      barColor="#EE1A26"
    />
    <UniDocStage label="Label/Medium no título, Caption/Default nos metadados" surface="primary">
      <VideoCard
        thumbnailSrc={videos[1].thumbnailSrc}
        avatarSrc={videos[1].avatarSrc}
        duration={videos[1].duration}
        videoTitle="Como a escala tipográfica organiza a hierarquia do cartão"
        channelName={videos[1].channelName}
        metadata={videos[1].metadata}
      />
      <VideoCardSidebar
        thumbnailSrc={videos[3].thumbnailSrc}
        duration={videos[3].duration}
        videoTitle="Body/Medium no título: o único cartão em peso regular"
        channelName={videos[3].channelName}
        metadata="1M views · 3 years ago"
      />
    </UniDocStage>
    <UniDocStage label="Três degraus na mesma coluna, com ritmo de 20px" surface="primary" direction="column" align="stretch">
      <Comment
        avatarSrc={comments[0].avatarSrc}
        authorName={comments[0].authorName}
        timestamp={comments[0].timestamp}
        commentText={comments[0].commentText}
        likeCount={comments[0].likeCount}
        dislikeCount={comments[0].dislikeCount}
      />
    </UniDocStage>
    <UniDocStage label="Body/Medium na linha de menu" surface="secondary" direction="column" align="stretch">
      <SidebarMenuItem icon="home" activeIcon="homeFill" menuLabel="Menu Item" active />
      <SidebarMenuItem icon="explore" menuLabel="Explore" />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use os degraus como par corpo + altura: --uni-font-body-md-size sempre com -line.',
        'Aplique letter-spacing: var(--uni-font-tracking) para deixar explícito que o arquivo não usa tracking.',
        'Prefira Label/* para rótulos de botão e navegação, e Caption/* para metadados.',
        'Use --uni-font-weight-regular e -bold em vez de escrever 400 e 700 avulsos.',
      ]}
      donts={[
        'Não invente tracking: os onze degraus medem zero.',
        'Não use pesos fora de 400 e 700 na escala documentada.',
        'Não substitua Roboto por outra família: é a única do arquivo.',
        'Não pareie corpo e altura de degraus diferentes sem registrar o desvio na estória do componente.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="A escala sobre as superfícies escuras oficiais."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'surface']}>
      {() => (
        <div style={{ fontFamily: UNI_FONT_FAMILY, textAlign: 'left' }}>
          <div
            style={{
              fontSize: 24,
              lineHeight: '32px',
              fontWeight: 700,
              color: 'var(--uni-color-text-primary)',
            }}
          >
            Heading/H1 — 24/32 Bold
          </div>
          <div
            style={{
              fontSize: 14,
              lineHeight: '20px',
              fontWeight: 400,
              color: 'var(--uni-color-text-primary)',
            }}
          >
            Body/Medium — 14/20 Regular
          </div>
          <div
            style={{
              fontSize: 12,
              lineHeight: '18px',
              fontWeight: 400,
              color: 'var(--uni-color-text-secondary)',
            }}
          >
            Caption/Default — 12/18 Regular em texto secundário
          </div>
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência completa de tokens"
      description="As variáveis CSS de cada degrau."
      barColor="#EE1A26"
    />
    <UniDocPropsTable
      title="Variáveis por degrau"
      rows={Object.values(uniTypography).map((token) => ({
        name: token.figmaName,
        type: `${token.cssVarPrefix}-size · -line · -weight`,
        default: `${token.fontSize}/${token.lineHeight} ${token.fontWeight}`,
        description: `${token.usage} · node ${token.figmaNode}`,
      }))}
    />
    <UniDocPropsTable
      title="Variáveis globais"
      rows={[
        {
          name: '--uni-font-sans',
          type: 'string',
          default: "'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          description: 'Família única do arquivo, com pilha de fallback de sistema.',
        },
        {
          name: '--uni-font-weight-regular',
          type: 'number',
          default: '400',
          description: 'Peso regular, usado por corpo, legenda e metadados.',
        },
        {
          name: '--uni-font-weight-bold',
          type: 'number',
          default: '700',
          description: 'Peso Bold, usado por títulos e rótulos.',
        },
        {
          name: '--uni-font-tracking',
          type: 'number',
          default: '0',
          description:
            'Tracking único do arquivo. Existe para que nenhum componente escreva 0 avulso.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa da escala tipográfica baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TypographyDocumentationPage />,
};

/**
 * Réplica do quadro `Typography` (106:3067) do arquivo de design.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        background: 'var(--uni-color-background-primary)',
        padding: 40,
        fontFamily: UNI_FONT_FAMILY,
      }}
    >
      <h2
        style={{
          margin: '0 0 8px 0',
          fontSize: 24,
          lineHeight: '32px',
          fontWeight: 700,
          color: 'var(--uni-color-text-primary)',
        }}
      >
        Typography Scale
      </h2>
      <p
        style={{
          margin: '0 0 24px 0',
          fontSize: 13,
          color: 'var(--uni-color-text-secondary)',
        }}
      >
        Font family: Roboto
      </p>
      {Object.values(uniTypography).map((token) => (
        <div
          key={token.figmaName}
          style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}
        >
          <span
            style={{
              width: 130,
              flex: 'none',
              fontSize: 13,
              color: 'var(--uni-color-text-secondary)',
            }}
          >
            {token.figmaName}
          </span>
          <span
            style={{
              width: 100,
              flex: 'none',
              fontSize: 13,
              color: 'var(--uni-color-text-secondary)',
            }}
          >
            {token.fontSize}/{token.lineHeight} {token.fontWeight === 700 ? 'Bold' : 'Regular'}
          </span>
          <span
            style={{
              fontSize: token.fontSize,
              lineHeight: `${token.lineHeight}px`,
              fontWeight: token.fontWeight,
              color: 'var(--uni-color-text-primary)',
            }}
          >
            {SPECIMEN}
          </span>
        </div>
      ))}
    </div>
  ),
};

/**
 * Os quatro pares de corpo e peso que o arquivo aplica fora da escala publicada.
 */
export const CombinacoesForaDaEscala: Story = {
  name: 'Combinações fora da escala',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        background: 'var(--uni-color-background-primary)',
        padding: 40,
        fontFamily: UNI_FONT_FAMILY,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {[
        { label: 'FooterItem — 13 Bold (node 9:3231)', size: 13, weight: 700, color: 'var(--uni-color-text-secondary)' },
        { label: 'VideoCardHorizontal.metadata — 13 Bold (node 19:1346)', size: 13, weight: 700, color: 'var(--uni-color-text-secondary)' },
        { label: 'VideoPlayerFull.title — 18 Regular (node 20:2920)', size: 18, weight: 400, color: 'var(--uni-color-text-primary)' },
        { label: 'ChannelHeader.name — 24 Regular (node 17:2796)', size: 24, weight: 400, color: 'var(--uni-color-text-primary)' },
      ].map((row) => (
        <div key={row.label}>
          <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 4 }}>
            {row.label}
          </div>
          <div style={{ fontSize: row.size, fontWeight: row.weight, color: row.color }}>
            {SPECIMEN}
          </div>
        </div>
      ))}
      <Comment
        avatarSrc={avatars.alanCooper}
        authorName="User Name"
        timestamp="8 hours ago"
        commentText="O nome do autor usa 13 Bold com altura de 20px — outro par que a escala não declara."
        likeCount={3}
      />
    </div>
  ),
};
