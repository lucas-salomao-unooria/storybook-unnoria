import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { HomeIndicator } from '../../../src/tiktooria';
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

const meta: Meta<typeof HomeIndicator> = {
  title: 'Tik Tooria/Componentes/HomeIndicator',
  component: HomeIndicator,
  parameters: { layout: 'padded' },
  argTypes: {
    surface: {
      control: 'radio',
      options: ['chrome', 'immersive'],
      description: 'Contexto de superfície; define a cor da linha.',
    },
    className: { control: 'text' },
  },
  args: { surface: 'chrome' },
};

export default meta;

type Story = StoryObj<typeof HomeIndicator>;

const HomeIndicatorDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Chrome do dispositivo"
      title="HomeIndicator"
      description="Faixa de 414×35 na base de todas as telas, com a linha de 134×5 e raio total. O fundo é transparente: a única diferença entre contextos é a cor da linha, que o arquivo publica como #060606 sobre cromo claro e #E9E9E9 sobre superfície imersiva — dois tokens distintos, não uma inversão calculada."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="➖" title="Faixa reservada">
        Os 35px na base existem em todas as 15 telas. A barra de abas de 83px já os contém — não
        empilhe os dois.
      </TikDocCard>
      <TikDocCard icon="🎨" title="Dois tokens de cor">
        <code>--tik-color-indicator-light</code> e <code>--tik-color-indicator-immersive</code>. Nem
        preto puro, nem branco puro: são os valores literais do arquivo.
      </TikDocCard>
      <TikDocCard icon="👻" title="Fundo transparente">
        A faixa não pinta fundo. Ela deixa aparecer o vídeo, a fotografia ou a superfície da tela.
      </TikDocCard>
      <TikDocCard icon="♿" title="Puramente decorativo">
        O componente é <code>aria-hidden</code>: reproduz um affordance do sistema operacional, não
        um controle da aplicação.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:1120"
      frameName="Bars / Home Indicator"
      specs={[
        { label: 'Dimensões da faixa', value: '414 × 35' },
        { label: 'Dimensões da linha', value: '134 × 5' },
        { label: 'Raio', value: '100px (total)' },
        { label: 'Recuo da base', value: '10px' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Nó de fundo vazio',
          detail:
            'o arquivo inclui um nó "⬛ Background" de 414×35 sem preenchimento visível em cada faixa. Ele não foi reproduzido: um elemento transparente sem função não entra no pacote.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        {
          name: 'Faixa',
          role: 'Contêiner de 35px de altura, sem fundo, com a linha alinhada à base.',
          token: '--tik-homeindicator-height',
        },
        {
          name: 'Linha',
          role: 'Cápsula de 134×5 centralizada, recuada 10px da base.',
          token: '--tik-indicator-width · --tik-indicator-height · --tik-radius-full',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Cromo claro" surface="chrome" align="stretch" width={414}>
      <HomeIndicator surface="chrome" />
    </TikDocStage>
    <TikDocStage label="Imersivo" surface="immersive" align="stretch" width={414}>
      <HomeIndicator surface="immersive" />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use o HomeIndicator em telas que não têm barra de abas (folhas, câmera, leitor de QR).',
        'Escolha surface pelo fundo imediatamente atrás da linha.',
        'Mantenha a faixa como último filho da tela.',
      ]}
      donts={[
        'Não empilhe o HomeIndicator sob uma TabBar: os 83px da barra já reservam o espaço.',
        'Não pinte fundo na faixa — ela precisa deixar o conteúdo aparecer.',
        'Não altere a largura de 134px, que é a medida do sistema.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher>
      {(surface) => (
        <div style={{ width: 414 }}>
          <HomeIndicator surface={surface === 'immersive' ? 'immersive' : 'chrome'} />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="HomeIndicator"
      rows={[
        {
          name: 'surface',
          type: "'chrome' | 'immersive'",
          default: "'chrome'",
          description:
            'Contexto de superfície. chrome usa --tik-color-indicator-light (#060606); immersive usa --tik-color-indicator-immersive (#E9E9E9).',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: "Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>",
          description: 'Demais atributos HTML são repassados ao contêiner.',
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
  render: () => <HomeIndicatorDocumentationPage />,
};

/**
 * Playground com 100% das props do HomeIndicator expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do HomeIndicator',
  render: (args) => (
    <div
      style={{
        width: 414,
        paddingTop: 40,
        background:
          args.surface === 'immersive'
            ? 'var(--tik-color-surface-immersive)'
            : 'var(--tik-color-surface-primary)',
        border: '1px solid #E4E8E9',
      }}
    >
      <HomeIndicator {...args} />
    </div>
  ),
};

/**
 * Réplica visual dos frames oficiais do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['chrome', 'immersive'] as const).map((surface) => (
        <div
          key={surface}
          style={{
            width: 414,
            height: 120,
            display: 'flex',
            alignItems: 'flex-end',
            background:
              surface === 'immersive'
                ? 'var(--tik-color-surface-immersive)'
                : 'var(--tik-color-surface-primary)',
            border: '1px solid #E4E8E9',
          }}
        >
          <HomeIndicator surface={surface} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Os dois contextos de superfície.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['chrome', 'immersive'] as const).map((surface) => (
        <div
          key={surface}
          style={{
            width: 414,
            background:
              surface === 'immersive'
                ? 'var(--tik-color-surface-immersive)'
                : 'var(--tik-color-surface-primary)',
            border: '1px solid #E4E8E9',
          }}
        >
          <HomeIndicator surface={surface} />
        </div>
      ))}
    </div>
  ),
};
