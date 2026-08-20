import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { HomeIndicator, PhoneFrame, StatusBar, NavBar } from '../../../src/tiktooria';
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
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';

const meta: Meta<typeof PhoneFrame> = {
  title: 'Tik Tooria/Componentes/PhoneFrame',
  component: PhoneFrame,
  parameters: { layout: 'padded' },
  argTypes: {
    surface: { control: 'radio', options: ['chrome', 'immersive'] },
    label: { control: 'text' },
    scale: { control: { type: 'range', min: 0.3, max: 1, step: 0.05 } },
    className: { control: 'text' },
  },
  args: { surface: 'chrome', label: 'TikTok Privacy and settings', scale: 1 },
};

export default meta;

type Story = StoryObj<typeof PhoneFrame>;

const Filler = () => (
  <>
    <StatusBar surface="chrome" />
    <NavBar title="Privacy and settings" showBack />
    <div
      style={{
        padding: 24,
        fontFamily: 'var(--tik-font-sans)',
        fontSize: 'var(--tik-font-body-size)',
        color: 'var(--tik-color-text-secondary)',
      }}
    >
      Conteúdo da tela
    </div>
    <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
      <HomeIndicator surface="chrome" />
    </div>
  </>
);

const PhoneFrameDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Documentação"
      title="PhoneFrame"
      description="Contêiner de documentação que reproduz o frame de 414×896 (iPhone XR/11) usado pelas 15 telas do arquivo Figma. Não é um componente de produção: sua função é dar às estórias o mesmo palco do arquivo, com a mesma relação de aspecto e o mesmo recorte de conteúdo."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="📐" title="Palco fiel">
        414×896 com <code>overflow: hidden</code> e <code>position: relative</code>, para que filhos
        posicionados de forma absoluta se ancorem ao frame, como no arquivo.
      </TikDocCard>
      <TikDocCard icon="🔍" title="Escala para comparação">
        <code>scale</code> reduz a moldura para exibir várias telas lado a lado sem alterar as medidas
        internas.
      </TikDocCard>
      <TikDocCard icon="🏷️" title="Rótulo de frame">
        <code>label</code> imprime o nome do frame do Figma sob a moldura, facilitando a conferência
        contra o arquivo.
      </TikDocCard>
      <TikDocCard icon="🚫" title="Fora do produto">
        Documentado como andaime. Um produto real usa o viewport do dispositivo, não esta moldura.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:171"
      frameName="Página TikTok — 15 frames de 414×896"
      specs={[
        { label: 'Dimensões', value: '414 × 896' },
        { label: 'Dispositivo', value: 'iPhone XR / 11' },
        { label: 'Telas no arquivo', value: '15' },
        { label: 'Recorte', value: 'overflow: hidden' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Componente de documentação',
          detail:
            'a moldura não existe como componente no arquivo: cada tela é um FRAME solto na página. O PhoneFrame é um andaime das estórias, exportado pelo pacote apenas para que produtos possam montar catálogos próprios.',
        },
        {
          subject: 'Rótulo e escala',
          detail:
            'nenhum dos dois existe no arquivo. São recursos exclusivos da documentação e não alteram a geometria interna.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Invólucro', role: 'Coluna que reserva espaço para a moldura e o rótulo.' },
        {
          name: 'Moldura',
          role: 'Frame de 414×896 com recorte e fundo do contexto.',
          token: '--tik-device-width · --tik-device-height',
        },
        {
          name: 'Rótulo',
          role: 'Legenda opcional em Semibold 13.',
          token: '--tik-font-meta-strong-* · --tik-color-text-secondary',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
      <PhoneFrame surface="chrome" label="Cromo claro · 100%">
        <Filler />
      </PhoneFrame>
      <PhoneFrame surface="immersive" label="Imersivo · 100%" />
    </div>
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
      {[0.4, 0.55, 0.7].map((scale) => (
        <PhoneFrame key={scale} surface="chrome" scale={scale} label={`Escala ${scale}`}>
          <Filler />
        </PhoneFrame>
      ))}
    </div>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use o PhoneFrame apenas em estórias e catálogos, nunca em produção.',
        'Informe label com o nome exato do frame do Figma.',
        'Use scale para comparar telas lado a lado; a geometria interna não muda.',
        'Defina surface pelo fundo real da tela reproduzida.',
      ]}
      donts={[
        'Não coloque a moldura dentro de um layout de produção.',
        'Não altere as dimensões de 414×896: elas são a referência do arquivo.',
        'Não use scale para caber a tela em telas pequenas — prefira rolagem do palco.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher padding={12}>
      {(surface) => (
        <PhoneFrame
          surface={surface === 'immersive' ? 'immersive' : 'chrome'}
          scale={0.45}
          label={surface === 'immersive' ? 'Imersivo' : 'Cromo claro'}
        >
          {surface === 'immersive' ? null : <Filler />}
        </PhoneFrame>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="PhoneFrame"
      rows={[
        {
          name: 'surface',
          type: "'chrome' | 'immersive'",
          default: "'chrome'",
          description:
            'Contexto de superfície. Define o fundo do palco e o atributo data-tik-surface herdado pelos descendentes.',
        },
        {
          name: 'label',
          type: 'string',
          description: 'Rótulo exibido sob a moldura, normalmente o nome do frame no Figma.',
        },
        {
          name: 'scale',
          type: 'number',
          default: '1',
          description: 'Escala aplicada à moldura, para exibir várias telas lado a lado.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo da tela.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Demais atributos HTML são repassados à moldura.',
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
  render: () => <PhoneFrameDocumentationPage />,
};

/**
 * Playground com 100% das props do PhoneFrame expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PhoneFrame',
  render: (args) => (
    <PhoneFrame {...args}>
      <Filler />
    </PhoneFrame>
  ),
};

/**
 * A moldura nas duas superfícies, em tamanho real.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <PhoneFrame surface="chrome" label="Cromo claro">
        <Filler />
      </PhoneFrame>
      <PhoneFrame surface="immersive" label="Imersivo" />
    </div>
  ),
};

/**
 * Comparação de escalas para catálogos de tela.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {[0.35, 0.5, 0.75, 1].map((scale) => (
        <PhoneFrame key={scale} surface="chrome" scale={scale} label={`${scale * 100}%`}>
          <Filler />
        </PhoneFrame>
      ))}
    </div>
  ),
};
