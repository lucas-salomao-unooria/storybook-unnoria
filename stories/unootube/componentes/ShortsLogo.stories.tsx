import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { ShortsLogo, uniShortsLogo } from '../../../src/unootube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocAnatomy,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocThemeSwitcher,
} from '../../../.storybook/components';

const SHORTS_FILE =
  'https://www.figma.com/design/FlqnnoY0Mqdjic53twLAC1/Free-YouTube-Shorts-Mockups--Community-';

const meta: Meta<typeof ShortsLogo> = {
  title: 'Unootube/Componentes/ShortsLogo',
  component: ShortsLogo,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['brand', 'mono'] },
    size: { control: { type: 'range', min: 12, max: 96, step: 1 } },
    title: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    variant: 'brand',
    size: 20,
  },
};

export default meta;

type Story = StoryObj<typeof ShortsLogo>;

const ShortsLogoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Fundação"
      title="ShortsLogo"
      description="Reprodução das duas formas do raio do Shorts publicadas pelo arquivo Free YouTube Shorts Mockups (Community): o raio maciço vermelho da marca (1:737) e o raio em contorno monocromático da navegação (I1:241;13:110). Não são a mesma forma em cores diferentes — são dois vetores distintos, com papéis distintos."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Por que a prop se chama variant e não tone."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="⚡" title="brand — o raio maciço">
        Corpo vermelho puro com o triângulo de reprodução vazado na tinta escura. É a marca do
        produto, e aparece ao lado do título &ldquo;Shorts&rdquo; das prateleiras.
      </UniDocCard>
      <UniDocCard icon="🧭" title="mono — o raio em contorno">
        Monocromático, herda <code>currentColor</code>. É o ícone de navegação, e aparece na barra de
        abas móvel e na barra lateral.
      </UniDocCard>
      <UniDocCard icon="🚫" title="Nunca se substituem">
        O maciço não vira ícone de navegação, e o de contorno não é pintado de vermelho. São
        geometrias diferentes — o contorno tem o vazado do traço desenhado no próprio caminho.
      </UniDocCard>
      <UniDocCard icon="📐" title="Altura governa, largura é derivada">
        Os dois <code>viewBox</code> são não quadrados (15,91×20,03 e 27,18×24,84). A prop{' '}
        <code>size</code> define a altura, e a largura vem da razão literal do export.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="1:737"
      frameName="Group 37591"
      fileUrl={SHORTS_FILE}
      specs={[
        { label: 'brand', value: 'viewBox 15,9097 × 20,0251' },
        { label: 'mono', value: 'viewBox 27,1787 × 24,8375' },
        { label: 'Corpo', value: '#FF0000 · --uni-color-brand-shorts, não o emblema' },
        { label: 'Triângulo', value: '#161722 · a tinta do arquivo de Shorts' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Raio maciço exportado como PNG no móvel',
          detail:
            'na prateleira móvel o arquivo cola o raio como bitmap (node 1:132, "pngaaa 1"). O vetor foi tomado da versão da área de trabalho (node 1:737), que é vetorial e idêntica em forma. Nenhum bitmap foi redistribuído.',
        },
        {
          subject: 'Duas geometrias, não duas cores',
          detail:
            'o raio de navegação tem o contorno vazado desenhado no próprio caminho, e não é o raio maciço com preenchimento trocado. Consolidá-los exigiria redesenhar um dos dois.',
        },
        {
          subject: 'Marca registrada',
          detail:
            'o raio do Shorts é marca registrada do Google LLC e está presente por fidelidade ao arquivo comunitário. Um produto que publique a biblioteca deve substituir ShortsLogoVector.ts pela própria marca, como já vale para o Logo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Corpo do raio',
          role: 'Vermelho puro na variante brand; currentColor na mono.',
          token: '--uni-color-brand-shorts',
        },
        {
          name: 'Triângulo de reprodução',
          role: 'Vazado na tinta escura do arquivo, na variante brand.',
          token: '--uni-color-shorts-ink',
        },
        {
          name: 'Quadro',
          role: 'viewBox literal do export, sempre não quadrado.',
          token: 'size governa a altura',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="As duas formas, no tamanho do arquivo" surface="primary" gap={40}>
      <ShortsLogo variant="brand" size={20} />
      <span style={{ color: 'var(--uni-color-text-primary)', display: 'inline-flex' }}>
        <ShortsLogo variant="mono" size={26} />
      </span>
    </UniDocStage>
    <UniDocStage label="Escala" surface="primary" gap={32}>
      {[16, 20, 28, 40, 64].map((size) => (
        <ShortsLogo key={size} variant="brand" size={size} />
      ))}
    </UniDocStage>
    <UniDocStage label="A forma mono herda a cor do ancestral" surface="primary" gap={32}>
      {(
        [
          ['Primário', 'var(--uni-color-text-primary)'],
          ['Secundário', 'var(--uni-color-text-secondary)'],
          ['Marca', 'var(--uni-color-brand-primary)'],
        ] as const
      ).map(([label, color]) => (
        <div
          key={label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            color,
            fontSize: 11,
            fontFamily: 'var(--uni-font-sans)',
          }}
        >
          <ShortsLogo variant="mono" size={32} />
          {label}
        </div>
      ))}
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use brand ao lado de um rótulo "Shorts" em texto — é onde o arquivo o coloca.',
        'Use mono como ícone de navegação, deixando a cor vir do ancestral.',
        'Informe title quando o raio aparecer sozinho, sem rótulo em texto ao lado.',
        'Trate size como altura: a largura vem da razão do viewBox e não deve ser forçada.',
      ]}
      donts={[
        'Não pinte a variante mono de vermelho para simular a brand.',
        'Não estique o raio em um quadrado — nenhum dos dois viewBox é quadrado.',
        'Não use o raio maciço dentro de uma barra de navegação.',
        'Não publique a marca de terceiros sem verificar as próprias permissões de uso.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="A variante brand é invariante — o vermelho e a tinta do triângulo são constantes da marca. A mono acompanha o texto, e por isso muda com o tema."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher>
      {() => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            color: 'var(--uni-color-text-primary)',
          }}
        >
          <ShortsLogo variant="brand" size={28} />
          <ShortsLogo variant="mono" size={32} />
        </div>
      )}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="ShortsLogo"
      rows={[
        {
          name: 'variant',
          type: "'brand' | 'mono'",
          default: "'brand'",
          description: 'Raio maciço vermelho ou raio em contorno monocromático.',
        },
        {
          name: 'size',
          type: 'number',
          default: '20',
          description: 'Altura em pixels. A largura é derivada da razão do viewBox literal.',
        },
        {
          name: 'title',
          type: 'string',
          description:
            'Rótulo acessível. Com ele o SVG recebe role="img"; sem ele, é tratado como decorativo.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.SVGProps<SVGSVGElement>',
          description: 'Demais atributos são repassados ao <svg>.',
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
  render: () => <ShortsLogoDocumentationPage />,
};

/**
 * Playground com 100% das props do ShortsLogo expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ShortsLogo',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 48,
        background: 'var(--uni-color-background-primary)',
        color: 'var(--uni-color-text-primary)',
      }}
    >
      <ShortsLogo {...args} />
    </div>
  ),
};

/**
 * Réplica visual dos nós `1:737` e `I1:241;13:110`, com os dados literais do export.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {(['brand', 'mono'] as const).map((variant) => (
        <div
          key={variant}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            padding: 20,
            minWidth: 260,
            border: '1px solid var(--uni-color-border-subtle)',
            borderRadius: 8,
            color: 'var(--uni-color-text-primary)',
          }}
        >
          <ShortsLogo variant={variant} size={40} />
          <strong style={{ fontSize: 13 }}>{variant}</strong>
          <code
            style={{
              fontSize: 11,
              color: 'var(--uni-color-text-secondary)',
              wordBreak: 'break-all',
            }}
          >
            {uniShortsLogo[variant].figmaNode} · viewBox {uniShortsLogo[variant].viewBox}
          </code>
          <span style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)' }}>
            {uniShortsLogo[variant].usage}
          </span>
        </div>
      ))}
    </div>
  ),
};

/**
 * A escala aplicada às duas formas.
 */
export const Tamanhos: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
        color: 'var(--uni-color-text-primary)',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {(['brand', 'mono'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          <span style={{ fontSize: 12, width: 60, color: 'var(--uni-color-text-secondary)' }}>
            {variant}
          </span>
          {[16, 20, 26, 32, 48].map((size) => (
            <ShortsLogo key={size} variant={variant} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
};
