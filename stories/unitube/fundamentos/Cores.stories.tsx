import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import {
  uniNeutralColors,
  uniBrandColors,
  uniSemanticColors,
  uniDerivedColors,
} from '../../../src/unitube/tokens';
import { Button, SubscribeButton, TopMenuItem, VideoCard } from '../../../src/unitube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocStage,
  UniDocSurfaceSwitcher,
  UniDocTokenSwatch,
} from '../../../.storybook/components';
import { videos } from '../fixtures';

const meta: Meta = {
  title: 'Unitube/Fundamentos/Cores',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

const GROUPS = [
  {
    title: 'Primitivas — Neutros',
    description:
      'Doze degraus, do branco puro ao quase-preto. Nunca são aplicados diretamente em componente: servem de origem para os aliases semânticos.',
    tokens: uniNeutralColors,
  },
  {
    title: 'Primitivas — Vermelho da marca e acento',
    description:
      'Quatro vermelhos distintos, usados em contextos diferentes, mais o azul de espera do quadro de vídeo.',
    tokens: uniBrandColors,
  },
  {
    title: 'Semânticos publicados pelo arquivo',
    description:
      'Os nove tokens que o quadro “SEMANTIC TOKENS (DARK MODE)” declara por nome e por uso. Todo componente deve consumir estes.',
    tokens: uniSemanticColors,
  },
  {
    title: 'Semânticos derivados de nó',
    description:
      'Valores que o arquivo aplica em componente mas não declara na lista de tokens. Foram tokenizados para que nenhum componente cite primitiva.',
    tokens: uniDerivedColors,
  },
];

const ColorsDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Fundamentos • Cores"
      title="Cores"
      description="A paleta do Unitube foi lida do arquivo Figma “YouTube UI Clone Design (Community)”, página “🎨 Design System”. Ao contrário das outras marcas da plataforma, este arquivo documenta os próprios tokens: publica dezessete primitivas e nove tokens semânticos com nome e descrição de uso. Os demais valores foram lidos do preenchimento literal do nó indicado em cada token."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Como a paleta se organiza e por que ela tem um único modo."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🌑" title="Um único modo: escuro">
        O quadro semântico se intitula <strong>“SEMANTIC TOKENS (DARK MODE)”</strong> e o cabeçalho
        da página declara “Dark theme first”. Não existe versão clara de nenhum componente, portanto
        é proibido derivar um tema claro por cálculo.
      </UniDocCard>
      <UniDocCard icon="🪜" title="Escada de luminância, não sombra">
        A separação entre camadas é feita por luminância: página em <code>#181818</code>, barras em{' '}
        <code>#212121</code>, superfícies interativas em <code>#303030</code> e campos em{' '}
        <code>#121212</code>. As três sombras publicadas existem para camadas flutuantes, não para
        decorar superfície plana.
      </UniDocCard>
      <UniDocCard icon="🔴" title="Quatro vermelhos, não um">
        O arquivo publica <code>#EE1A26</code> (semântico), <code>#FC0D1C</code> (progresso),{' '}
        <code>#CC0000</code> (inscrição) e <code>#FF0000</code> (logotipo). Eles convivem na mesma
        tela — no reprodutor, o selo HD usa o semântico enquanto a linha do tempo usa o de
        progresso. É proibido consolidá-los.
      </UniDocCard>
      <UniDocCard icon="🧾" title="Rastreabilidade por token">
        Cada entrada de <code>colors.ts</code> registra <code>figmaToken</code> quando o arquivo
        declara o nome, e <code>figmaNode</code> quando o valor foi lido do nó. Nenhum valor foi
        estimado a partir de captura de tela.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="106:2954"
      frameName="Colors — página 🎨 Design System"
      specs={[
        { label: 'Primitivas neutras', value: '12 degraus' },
        { label: 'Primitivas de marca', value: '4 vermelhos + 1 azul' },
        { label: 'Tokens semânticos', value: '9 publicados' },
        { label: 'Modos', value: 'Dark (único)' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Ausência de tema claro',
          detail:
            'o arquivo publica apenas o modo escuro. Nenhum valor claro foi inventado — as primitivas neutras claras (neutral/50 a 400) existem como origem de texto e contorno sobre fundo escuro, não como superfície.',
        },
        {
          subject: 'color/text/tertiary mais claro que o secundário',
          detail:
            'o arquivo aponta text/tertiary para neutral/300 (#C4C4C4) e text/secondary para neutral/400 (#AAAAAA), ou seja, o degrau “mais sutil” é o mais claro dos dois. A inversão foi preservada como declarada, sem correção.',
        },
        {
          subject: 'color/border/default é um neutro claro',
          detail:
            'o arquivo aponta border/default para neutral/200 (#EAEAEA), um contorno claro sobre fundo escuro. Nenhuma tela o usa como divisor: todas usam border/subtle (#303030). O token foi preservado como declarado, e os componentes consomem o sutil.',
        },
        {
          subject: 'Valores aplicados sem token declarado',
          detail:
            'o campo de busca (#121212), o botão de microfone (#000000), a pílula ativa (#FFFFFF/#030303), o cromo do reprodutor (#EAEAEA) e as camadas da linha do tempo foram lidos do nó e tokenizados como --uni-color-*-derivados, para que nenhum componente precise citar primitiva.',
        },
        {
          subject: 'Realces de interação',
          detail:
            'o arquivo é estático e não descreve hover, foco nem pressionado. Foram acrescentados como branco translúcido a 10% e 20% (--uni-color-state-hover e -active) e anel de foco no vermelho semântico, usando exclusivamente tokens da própria marca.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia da paleta"
      description="Os quatro grupos, na ordem em que o arquivo os apresenta."
      barColor="#9EBFD0"
    />
    {GROUPS.map((group) => (
      <div key={group.title} style={{ marginBottom: 32 }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: 15, color: '#22272A' }}>{group.title}</h4>
        <p style={{ margin: '0 0 14px 0', fontSize: 13.5, lineHeight: 1.6, color: '#475157' }}>
          {group.description}
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
            gap: 16,
          }}
        >
          {Object.entries(group.tokens).map(([key, token]) => (
            <UniDocTokenSwatch
              key={key}
              name={key}
              cssVar={token.cssVar}
              value={token.value}
              figmaName={token.figmaToken ?? token.figmaNode}
            />
          ))}
        </div>
      </div>
    ))}

    <UnooriaDocSectionHeader
      title="4. Matriz de aplicação"
      description="Os tokens em uso nos componentes reais."
      barColor="#EE1A26"
    />
    <UniDocStage label="Os quatro vermelhos, lado a lado" surface="primary" gap={20}>
      <SubscribeButton />
      <TopMenuItem label="Ativo" active />
      <Button icon="liked">1.7 K</Button>
      <div
        style={{
          width: 200,
          height: 3,
          background: 'var(--uni-color-player-track)',
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            inset: '0 auto 0 0',
            width: '55%',
            background: 'var(--uni-color-brand-progress)',
          }}
        />
      </div>
    </UniDocStage>
    <UniDocStage label="Escada de luminância: cartão sobre a página" surface="primary" gap={20}>
      <VideoCard
        thumbnailSrc={videos[0].thumbnailSrc}
        avatarSrc={videos[0].avatarSrc}
        duration={videos[0].duration}
        videoTitle={videos[0].videoTitle}
        channelName={videos[0].channelName}
        metadata={videos[0].metadata}
      />
      <VideoCard
        thumbnailSrc={videos[2].thumbnailSrc}
        avatarSrc={videos[2].avatarSrc}
        duration={videos[2].duration}
        videoTitle={videos[2].videoTitle}
        channelName={videos[2].channelName}
        metadata={videos[2].metadata}
      />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Consuma sempre os tokens semânticos: --uni-color-background-*, -text-* e -border-*.',
        'Use --uni-color-border-subtle para divisores: é o que todas as telas do arquivo aplicam.',
        'Separe camadas por luminância de superfície, não por sombra.',
        'Preserve os quatro vermelhos em seus contextos: marca, progresso, inscrição e logotipo.',
      ]}
      donts={[
        'Não derive um tema claro: o arquivo não publica nenhum valor claro de superfície.',
        'Não aplique primitivas diretamente em componente — use os aliases semânticos.',
        'Não substitua --uni-color-brand-subscribe por --uni-color-brand-primary: são vermelhos diferentes.',
        'Não use var(--tik-*), var(--insta-*), var(--gpt-*), var(--wa-*) nem var(--unooria-*) dentro do Unitube.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O arquivo tem modo único; a demonstração alterna entre as cinco superfícies escuras oficiais."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'surface', 'field', 'deep']}>
      {() => (
        <>
          <SubscribeButton />
          <TopMenuItem label="Categoria" active />
          <TopMenuItem label="Categoria" />
          <Button icon="share">SHARE</Button>
        </>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência completa de tokens"
      description="Todos os tokens da marca, com valor, uso e nó de origem."
      barColor="#EE1A26"
    />
    <div style={{ border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'auto' }}>
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
          {GROUPS.flatMap((group) => Object.entries(group.tokens)).map(([key, token]) => (
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
                {token.value}
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
                {token.figmaToken ?? token.figmaNode ?? '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa da paleta baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ColorsDocumentationPage />,
};

/**
 * Os nove tokens semânticos declarados pelo arquivo de design.
 */
export const TokensSemanticos: Story = {
  name: '⭐ Tokens semânticos publicados',
  render: () => (
    <UnooriaDocShell>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        {Object.entries(uniSemanticColors).map(([key, token]) => (
          <UniDocTokenSwatch
            key={key}
            name={key}
            cssVar={token.cssVar}
            value={token.value}
            figmaName={token.figmaToken}
          />
        ))}
      </div>
    </UnooriaDocShell>
  ),
};

/**
 * A escada de luminância que separa as camadas da interface.
 */
export const EscadaDeLuminancia: Story = {
  name: 'Escada de luminância',
  render: () => (
    <UnooriaDocShell>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {[
          { label: 'neutral/900 · #030303 — mais profundo que qualquer superfície', value: '#030303' },
          { label: 'neutral/800 · #121212 — interior do campo de busca', value: '#121212' },
          { label: 'neutral/700 · #181818 — fundo da página', value: '#181818' },
          { label: 'neutral/600 · #212121 — barras de navegação', value: '#212121' },
          { label: 'neutral/500 · #303030 — superfícies interativas e divisores', value: '#303030' },
        ].map((step) => (
          <div
            key={step.value}
            style={{
              padding: '18px 20px',
              background: step.value,
              color: '#FFFFFF',
              fontFamily: 'var(--uni-font-sans)',
              fontSize: 13,
            }}
          >
            {step.label}
          </div>
        ))}
      </div>
    </UnooriaDocShell>
  ),
};
