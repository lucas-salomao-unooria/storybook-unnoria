import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { MusicDisc } from '../../../src/tiktooria';
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

const meta: Meta<typeof MusicDisc> = {
  title: 'Tik Tooria/Componentes/MusicDisc',
  component: MusicDisc,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: { type: 'range', min: 24, max: 120, step: 1 } },
    showTones: { control: 'boolean' },
    spinning: { control: 'boolean' },
    title: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    size: 49,
    showTones: true,
    spinning: false,
    title: '',
  },
};

export default meta;

type Story = StoryObj<typeof MusicDisc>;


const MusicDiscDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Feed"
      title="MusicDisc"
      description="Disco de 49px no canto inferior direito do feed. O preenchimento é o gradiente angular de quatro paradas do nó 4:1067, tokenizado como --tik-gradient-disc; o miolo é o disco de 12,5px em --tik-color-accent-disc-note. As notas flutuantes ao lado são o vetor literal do nó 4:1093."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="💿" title="Gradiente angular literal">
        Quatro paradas alternando #171717 e #373736, traduzidas de GRADIENT_ANGULAR para <code>conic-gradient</code> multiplicando cada posição por 360°.
      </TikDocCard>
      <TikDocCard icon="🎶" title="Notas flutuantes">
        O glifo <code>floatingTones</code> é o vetor de três notas do arquivo, posicionado à esquerda e acima do disco.
      </TikDocCard>
      <TikDocCard icon="🟡" title="Miolo de 12,5px">
        Disco em <code>--tik-color-accent-disc-note</code> (#DDBC43), 25,5% do diâmetro.
      </TikDocCard>
      <TikDocCard icon="🔄" title="Rotação opcional">
        O arquivo é estático; <code>spinning</code> é uma extensão documentada que respeita <code>prefers-reduced-motion</code>.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:1066"
      frameName="Disc — TikTok Home (For You)"
      specs={[
        { label: 'Diâmetro', value: '49px' },
        { label: 'Miolo', value: '12,5px (25,5%)' },
        { label: 'Gradiente', value: 'ANGULAR · 4 paradas' },
        { label: 'Notas', value: '56,5 × 67,5' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'conic-gradient em vez de GRADIENT_ANGULAR',
          detail:
            'as paradas do arquivo (0,126 / 0,384 / 0,628 / 0,88) foram convertidas para graus. A cor e a ordem são literais; a interpolação entre paradas fica a cargo do navegador.',
        },
        {
          subject: 'Rotação',
          detail:
            'não existe no arquivo, que é estático. Foi acrescentada como prop opcional e desligada por padrão, com animação suprimida em prefers-reduced-motion.',
        },
        {
          subject: 'Capa de álbum',
          detail:
            'o nó 4:1067 é preenchido pelo gradiente, não por uma fotografia. O componente não expõe prop de capa, para não inventar uma variante ausente.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Prato', role: 'Disco de raio total com o gradiente angular.', token: '--tik-gradient-disc' },
        { name: 'Miolo', role: 'Disco central em amarelo, 25,5% do diâmetro.', token: '--tik-color-accent-disc-note' },
        { name: 'Notas flutuantes', role: 'Vetor de três notas à esquerda e acima do prato.', token: 'glifo floatingTones' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Diâmetro oficial de 49px" surface="immersive" gap={40}>
      <MusicDisc />
      <MusicDisc showTones={false} />
      <MusicDisc spinning />
    </TikDocStage>
    <TikDocStage label="Escalas alternativas" surface="immersive" gap={40}>
      <MusicDisc size={32} showTones={false} />
      <MusicDisc size={49} />
      <MusicDisc size={72} />
      <MusicDisc size={96} />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Mantenha o diâmetro de 49px no feed — é a medida do arquivo.',
        'Use showTones={false} quando o disco aparecer fora do feed, sem contexto de trilha.',
        'Informe title quando o disco for interativo, para dar rótulo acessível.',
        'Ligue spinning apenas quando houver áudio tocando.',
      ]}
      donts={[
        'Não substitua o gradiente por uma fotografia de capa: o arquivo não publica essa variante.',
        'Não use o disco sobre cromo claro — o gradiente escuro perde contraste.',
        'Não anime o disco por padrão.',
        'Não recolora o miolo: #DDBC43 é literal do arquivo.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher initial="immersive">
      {() => (
        <MusicDisc spinning />
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="MusicDisc"
      rows={[
        {
          name: 'size',
          type: "number",
          default: "49",
          description:
            'Diâmetro do disco em pixels. O arquivo publica 49px.',
        },
        {
          name: 'showTones',
          type: "boolean",
          default: "true",
          description:
            'Exibe as notas flutuantes ao lado do disco.',
        },
        {
          name: 'spinning',
          type: "boolean",
          default: "false",
          description:
            'Anima a rotação. Extensão documentada; o arquivo é estático.',
        },
        {
          name: 'title',
          type: "string",
          description:
            'Rótulo acessível. Quando omitido, o disco é decorativo (aria-hidden).',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>",
          description:
            'Demais atributos HTML são repassados ao contêiner.',
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
  render: () => <MusicDiscDocumentationPage />,
};

/**
 * Playground com 100% das props do MusicDisc expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do MusicDisc',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <MusicDisc {...args} title={args.title || undefined} />
    </div>
  ),
};

/**
 * Réplica visual do frame oficial do Figma, sobre o quadro de vídeo exportado.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        position: 'relative',
        width: 414,
        height: 220,
        overflow: 'hidden',
        background: `center/cover no-repeat url(${tikFeedForYou})`,
      }}
    >
      <div style={{ position: 'absolute', right: 8, bottom: 95 }}>
        <MusicDisc spinning />
      </div>
    </div>
  ),
};

/**
 * Com e sem notas, estático e girando.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 48,
        padding: 40,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <MusicDisc />
      <MusicDisc showTones={false} />
      <MusicDisc spinning />
      <MusicDisc spinning showTones={false} />
    </div>
  ),
};

/**
 * Comparação de diâmetros.
 */
export const Tamanhos: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 40,
        alignItems: 'flex-end',
        padding: 40,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      {[32, 49, 72, 96].map((size) => (
        <MusicDisc key={size} size={size} showTones={false} />
      ))}
    </div>
  ),
};
