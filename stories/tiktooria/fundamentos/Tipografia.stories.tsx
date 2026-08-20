import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { tikFontFamilies, tikTypographyScale } from '../../../src/tiktooria/tokens';
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
import { VideoMeta } from '../../../src/tiktooria';

const meta: Meta = {
  title: 'Tik Tooria/Fundamentos/Tipografia',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

const SampleRow: React.FC<{ token: (typeof tikTypographyScale)[number]; onImmersive?: boolean }> = ({
  token,
  onImmersive = false,
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(190px, 220px) 1fr',
      alignItems: 'baseline',
      gap: 20,
      padding: '14px 0',
      borderTop: '1px solid #E4E8E9',
    }}
  >
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#22272A' }}>{token.name}</div>
      <div
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 11,
          color: '#475157',
          marginTop: 2,
        }}
      >
        {token.size} · {token.weight} · lh {token.line} · ls {token.tracking}
      </div>
      <div style={{ fontSize: 11, color: '#6487C2', marginTop: 2 }}>node {token.figmaNode}</div>
    </div>
    <div
      style={{
        fontFamily: token.family === 'system' ? tikFontFamilies.system : tikFontFamilies.sans,
        fontSize: token.size,
        fontWeight: token.weight,
        lineHeight: token.line,
        letterSpacing: token.tracking,
        color: onImmersive ? 'var(--tik-color-text-on-immersive)' : 'var(--tik-color-text-primary)',
      }}
    >
      {token.usage}
    </div>
  </div>
);

const TypographyDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Fundamentos • Tipografia"
      title="Tipografia"
      description="A escala reúne os 29 degraus de texto lidos via Plugin API do arquivo Figma. O arquivo usa Proxima Nova em todo o produto e SF Pro Text nos elementos de sistema do iPhone X. Nenhum degrau declara altura de linha — todos são “normal”, exceto a legenda do vídeo, que fixa 19,5px."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Como a escala se organiza."
      barColor="#EA4359"
    />
    <TikDocGrid>
      <TikDocCard icon="🅰️" title="Duas famílias">
        <code>--tik-font-sans</code> (Proxima Nova) para o produto e{' '}
        <code>--tik-font-system</code> (SF Pro Text) para relógio, título e link do leitor de QR.
      </TikDocCard>
      <TikDocCard icon="⚖️" title="Três pesos">
        400 (Regular), 600 (Semibold) e 700 (Bold). O arquivo usa os três de forma semântica: Regular
        para corpo, Semibold para identidade e Bold para títulos e tiras.
      </TikDocCard>
      <TikDocCard icon="📐" title="Tracking pontual">
        Apenas seis degraus declaram tracking: <code>+0,15px</code> nos rótulos de aba,{' '}
        <code>+0,1px</code> na aba ativa do feed, <code>+0,5px</code> na chamada,{' '}
        <code>-0,25px</code> no botão flutuante e <code>-0,3/-0,6px</code> nos degraus de sistema.
      </TikDocCard>
      <TikDocCard icon="📏" title="Uma única altura de linha">
        A legenda do vídeo é o único degrau com <code>line-height</code> declarado (19,5px). Todos os
        demais herdam <code>normal</code> — é proibido inventar altura de linha.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      barColor="#E6436D"
    />
    <TikDocFigmaSpecs
      nodeId="4:171"
      frameName="Página TikTok — leitura de getStyledTextSegments"
      specs={[
        { label: 'Degraus mapeados', value: '29' },
        { label: 'Estilo de texto publicado', value: 'Button 10' },
        { label: 'Famílias', value: 'Proxima Nova · SF Pro Text' },
        { label: 'Degraus com line-height', value: '2 (legenda e hashtags)' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Proxima Nova',
          detail:
            'é uma fonte comercial da Adobe e não pode ser distribuída com o pacote. A pilha de fallback usa Montserrat (geométrica, Google Fonts) e depois as famílias de sistema. Um produto licenciado que registre a Proxima Nova via @font-face passa a usá-la automaticamente, pois é o primeiro nome da pilha.',
        },
        {
          subject: 'Um único estilo de texto publicado',
          detail:
            'o arquivo publica somente “Button 10” (Proxima Nova Regular 10, tracking 0,15). Os 28 degraus restantes foram lidos dos nós de texto, com o node de referência registrado em typography.ts.',
        },
        {
          subject: 'Semibold 18 em duas variantes',
          detail:
            'a aba “For You” aparece com tracking 0,1px em alguns frames e sem tracking em outros. Foi tokenizado o degrau com tracking, que é o predominante; a variante sem tracking é um deslize do próprio arquivo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia da escala"
      description="Os 29 degraus em ordem decrescente de tamanho, renderizados com os valores literais do arquivo."
      barColor="#65D2E9"
    />
    <div style={{ marginBottom: 32 }}>
      {tikTypographyScale.map((token) => (
        <SampleRow key={token.name} token={token} />
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="4. Matriz de pesos e famílias"
      barColor="#161722"
    />
    <TikDocGrid min={260}>
      {[400, 600, 700].map((weight) => (
        <TikDocCard key={weight} title={`Peso ${weight}`}>
          <div
            style={{
              fontFamily: tikFontFamilies.sans,
              fontWeight: weight,
              fontSize: 20,
              color: '#22272A',
              marginBottom: 6,
            }}
          >
            Tik Tooria
          </div>
          <div style={{ fontSize: 12.5 }}>
            {tikTypographyScale.filter((t) => t.weight === weight && t.family === 'sans').length}{' '}
            degraus usam este peso na família do produto.
          </div>
        </TikDocCard>
      ))}
      <TikDocCard title="SF Pro Text">
        <div
          style={{
            fontFamily: tikFontFamilies.system,
            fontWeight: 600,
            fontSize: 20,
            color: '#22272A',
            marginBottom: 6,
            letterSpacing: '-0.3px',
          }}
        >
          9:41
        </div>
        <div style={{ fontSize: 12.5 }}>
          Quatro degraus de sistema: relógio, título do leitor, link e subtítulo do seletor.
        </div>
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Consuma o degrau completo (size + weight + line + tracking) via as quatro variáveis do prefixo.',
        'Use Caption/Caption Strong apenas na legenda do vídeo — é o único lugar com altura de linha fixa.',
        'Aplique Nav e Nav Active nos rótulos da barra de abas: mudam apenas de peso, nunca de tamanho.',
        'Reserve a família de sistema para os elementos de chrome do iPhone X.',
      ]}
      donts={[
        'Não invente altura de linha nem tracking em degraus que o arquivo declara como normal / 0.',
        'Não misture Proxima Nova e SF Pro Text no mesmo bloco de conteúdo do produto.',
        'Não use text-transform no rótulo de seção: o arquivo escreve “ACCOUNT” já em caixa alta.',
        'Não substitua Semibold 17 por Bold 17 — são degraus distintos (identidade × título de barra).',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="A mesma escala nos dois contextos publicados."
      barColor="#65D2E9"
    />
    <TikDocSurfaceSwitcher>
      {(surface) => (
        <div style={{ width: 340 }}>
          {surface === 'immersive' ? (
            <VideoMeta
              handle="@craig_love"
              caption="The most satisfying Job"
              tags="#fyp #satisfying #roadmarking"
              music="Roddy Roundicch - The Rou"
            />
          ) : (
            <div style={{ fontFamily: 'var(--tik-font-sans)' }}>
              <div
                style={{
                  fontSize: 'var(--tik-font-heading-size)',
                  fontWeight: 700,
                  color: 'var(--tik-color-text-primary)',
                }}
              >
                Privacy and settings
              </div>
              <div
                style={{
                  fontSize: 'var(--tik-font-body-size)',
                  color: 'var(--tik-color-text-primary)',
                  marginTop: 8,
                }}
              >
                Manage my account
              </div>
              <div
                style={{
                  fontSize: 'var(--tik-font-meta-size)',
                  color: 'var(--tik-color-text-secondary)',
                  marginTop: 4,
                }}
              >
                Following · Followers · Likes
              </div>
            </div>
          )}
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência da API de tokens"
      description="tikTypographyScale exporta name, cssVarPrefix, family, size, weight, line, tracking, usage e figmaNode."
      barColor="#161722"
    />
    <TikDocCard icon="📦" title="Consumo em CSS">
      <pre style={{ margin: 0, fontSize: 12.5, whiteSpace: 'pre-wrap' }}>{`.meu-titulo {
  font-family: var(--tik-font-sans);
  font-size: var(--tik-font-heading-size);
  font-weight: var(--tik-font-heading-weight);
  line-height: var(--tik-font-heading-line);
  letter-spacing: var(--tik-font-heading-tracking);
}`}</pre>
    </TikDocCard>
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa da tipografia, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TypographyDocumentationPage />,
};

/**
 * A escala completa, sem as seções explicativas.
 */
export const EscalaCompleta: Story = {
  name: '🅰️ Escala completa',
  render: () => (
    <UnooriaDocShell>
      {tikTypographyScale.map((token) => (
        <SampleRow key={token.name} token={token} />
      ))}
    </UnooriaDocShell>
  ),
};

/**
 * Apenas os degraus da família de sistema (SF Pro Text).
 */
export const DegrausDeSistema: Story = {
  name: '⌚ Degraus de sistema',
  render: () => (
    <UnooriaDocShell>
      {tikTypographyScale
        .filter((token) => token.family === 'system')
        .map((token) => (
          <SampleRow key={token.name} token={token} />
        ))}
    </UnooriaDocShell>
  ),
};

/**
 * Os degraus que só existem sobre a superfície imersiva.
 */
export const DegrausImersivos: Story = {
  name: '🌙 Degraus sobre vídeo',
  render: () => (
    <TikDocStage surface="immersive" align="stretch" direction="column" padding={32}>
      {tikTypographyScale
        .filter((token) =>
          ['Feed Tab Active', 'Feed Tab Inactive', 'Caption', 'Caption Strong', 'Tool', 'Micro Bold'].includes(
            token.name
          )
        )
        .map((token) => (
          <div
            key={token.name}
            style={{
              fontFamily: 'var(--tik-font-sans)',
              fontSize: token.size,
              fontWeight: token.weight,
              lineHeight: token.line,
              letterSpacing: token.tracking,
              color: 'var(--tik-color-text-on-immersive)',
              textShadow: 'var(--tik-text-drop)',
            }}
          >
            {token.name} — {token.usage}
          </div>
        ))}
    </TikDocStage>
  ),
};
