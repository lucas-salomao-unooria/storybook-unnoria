import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';

import { FeedHeader } from '../../../src/tiktooria';
import type { TikFeedTab } from '../../../src/tiktooria';
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

const meta: Meta<typeof FeedHeader> = {
  title: 'Tik Tooria/Componentes/FeedHeader',
  component: FeedHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    active: { control: 'radio', options: ['following', 'forYou'] },
    followingLabel: { control: 'text' },
    forYouLabel: { control: 'text' },
    className: { control: 'text' },
    onSelect: { action: 'onSelect' },
  },
  args: { active: 'forYou', followingLabel: 'Following', forYouLabel: 'For You' },
};

export default meta;

type Story = StoryObj<typeof FeedHeader>;

const OverVideo: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: 'relative',
      width: 414,
      height: 200,
      overflow: 'hidden',
      background: `center/cover no-repeat url(${tikFeedForYou})`,
    }}
  >
    <div style={{ position: 'absolute', top: 44, width: '100%' }}>{children}</div>
  </div>
);

const FeedHeaderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Navegação"
      title="FeedHeader"
      description="Cabeçalho de 414×44 do feed imersivo. A aba ativa é Semibold 18 com tracking de 0,1px em branco; a inativa é Semibold 16 em branco a 60% de opacidade. O separador é um traço vertical de 11px em branco a 20%. É o único componente de navegação que vive exclusivamente sobre o vídeo."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🎬" title="Só sobre o vídeo">
        Aparece nas quatro telas de feed do arquivo — For You, Following, Comments e Share to — sempre
        sobreposto ao quadro do vídeo, sem fundo próprio.
      </TikDocCard>
      <TikDocCard icon="🔤" title="Tamanho como estado">
        Diferente de qualquer outra aba do módulo, aqui o estado ativo muda o <strong>tamanho</strong>{' '}
        do texto (16 → 18) e não apenas o peso ou a cor.
      </TikDocCard>
      <TikDocCard icon="➗" title="Separador translúcido">
        Traço de 1×11 em branco a 20%, o único uso dessa opacidade no arquivo.
      </TikDocCard>
      <TikDocCard icon="🌐" title="Rótulos configuráveis">
        O arquivo publica “Following | For You”; ambos são props para permitir localização.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:1116"
      frameName="Header — TikTok Home (For You)"
      specs={[
        { label: 'Dimensões', value: '414 × 44' },
        { label: 'Aba ativa', value: 'Semibold 18 · +0,1px · #FFFFFF' },
        { label: 'Aba inativa', value: 'Semibold 16 · rgba(255,255,255,0.6)' },
        { label: 'Separador', value: '1 × 11 · branco 20%' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Texto fatiado em três nós',
          detail:
            'o arquivo quebra “For You” em três camadas de texto (“F”, “o”, “r You”), resquício de edição manual. O componente usa um único nó de texto, o que preserva o resultado visual e corrige o kerning.',
        },
        {
          subject: 'Semibold 18 com e sem tracking',
          detail:
            'a aba ativa aparece com tracking 0,1px em alguns frames e sem tracking em outros. O componente usa a variante com tracking, predominante no arquivo.',
        },
        {
          subject: 'Sem indicador de seleção',
          detail:
            'o arquivo não desenha sublinhado nem pílula sob a aba ativa — a distinção é apenas tipográfica. Nenhum indicador foi acrescentado.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        {
          name: 'Aba inativa',
          role: 'Semibold 16 em branco a 60%.',
          token: '--tik-font-feedtab-inactive-* · --tik-color-text-on-immersive-muted',
        },
        { name: 'Separador', role: 'Traço vertical de 11px em branco a 20%.' },
        {
          name: 'Aba ativa',
          role: 'Semibold 18 com tracking de 0,1px em branco cheio.',
          token: '--tik-font-feedtab-active-* · --tik-color-text-on-immersive',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="For You ativa — sobre o quadro oficial do arquivo" surface="immersive" align="stretch" width={414}>
      <OverVideo>
        <FeedHeader active="forYou" />
      </OverVideo>
    </TikDocStage>
    <TikDocStage label="Following ativa" surface="immersive" align="stretch" width={414}>
      <OverVideo>
        <FeedHeader active="following" />
      </OverVideo>
    </TikDocStage>
    <TikDocStage label="Rótulos localizados" surface="immersive" align="stretch" width={414}>
      <FeedHeader active="forYou" followingLabel="Seguindo" forYouLabel="Para você" />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Posicione o FeedHeader a 44px do topo, logo abaixo da barra de status.',
        'Use-o apenas sobre superfície imersiva — o contraste depende do vídeo escuro.',
        'Localize os dois rótulos juntos, para manter o equilíbrio do par.',
        'Trate onSelect como troca de feed, não como filtro.',
      ]}
      donts={[
        'Não acrescente sublinhado ou pílula à aba ativa: o arquivo distingue só por tipografia.',
        'Não use o FeedHeader sobre cromo claro — o branco a 60% desaparece.',
        'Não adicione uma terceira aba: o arquivo publica exatamente duas.',
        'Não pinte fundo no cabeçalho.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher initial="immersive">
      {() => (
        <div style={{ width: 414 }}>
          <FeedHeader active="forYou" />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="FeedHeader"
      rows={[
        {
          name: 'active',
          type: "'following' | 'forYou'",
          default: "'forYou'",
          description: 'Aba ativa. Muda tamanho, peso e opacidade do rótulo.',
        },
        {
          name: 'followingLabel',
          type: 'React.ReactNode',
          default: "'Following'",
          description: 'Rótulo da aba de seguidos.',
        },
        {
          name: 'forYouLabel',
          type: 'React.ReactNode',
          default: "'For You'",
          description: 'Rótulo da aba recomendada.',
        },
        {
          name: 'onSelect',
          type: '(tab: TikFeedTab) => void',
          description: 'Acionado ao selecionar uma aba.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: "Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'>",
          description: 'Demais atributos HTML são repassados ao <nav>.',
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
  render: () => <FeedHeaderDocumentationPage />,
};

/**
 * Playground com 100% das props do FeedHeader expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do FeedHeader',
  render: (args) => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-immersive)', padding: '8px 0' }}>
      <FeedHeader {...args} />
    </div>
  ),
};

/**
 * Réplica visual do frame oficial do Figma, sobre o quadro de vídeo exportado.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <OverVideo>
      <FeedHeader active="forYou" />
    </OverVideo>
  ),
};

/**
 * As duas abas nos dois estados.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: 414,
        background: 'var(--tik-color-surface-immersive)',
        padding: '16px 0',
      }}
    >
      <FeedHeader active="forYou" />
      <FeedHeader active="following" />
    </div>
  ),
};

/**
 * Troca de aba controlada, com o estado mantido pela estória.
 */
export const Estados: Story = {
  render: () => {
    const [active, setActive] = useState<TikFeedTab>('forYou');

    return (
      <div style={{ width: 414 }}>
        <OverVideo>
          <FeedHeader active={active} onSelect={setActive} />
        </OverVideo>
        <p
          style={{
            fontFamily: 'var(--tik-font-sans)',
            fontSize: 13,
            color: 'var(--tik-color-text-secondary)',
          }}
        >
          Aba ativa: <strong>{active}</strong>
        </p>
      </div>
    );
  },
};
