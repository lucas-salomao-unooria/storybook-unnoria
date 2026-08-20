import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { StatusBar } from '../../../src/tiktooria';
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

const meta: Meta<typeof StatusBar> = {
  title: 'Tik Tooria/Componentes/StatusBar',
  component: StatusBar,
  parameters: { layout: 'padded' },
  argTypes: {
    surface: {
      control: 'radio',
      options: ['chrome', 'immersive'],
      description: 'Contexto de superfície; define a cor do relógio e dos glifos.',
    },
    time: { control: 'text', description: 'Horário exibido. O arquivo fixa 9:41 nas 15 telas.' },
    className: { control: 'text' },
  },
  args: { surface: 'chrome', time: '9:41' },
};

export default meta;

type Story = StoryObj<typeof StatusBar>;

const StatusBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Chrome do dispositivo"
      title="StatusBar"
      description="Barra de status do iPhone X de 414×44, presente nas 15 telas do arquivo Figma. Reúne o relógio em SF Pro Text Semibold 15 com tracking de -0,3px, as barras de sinal celular, o glifo de Wi-Fi e a cápsula de bateria — os três exportados literalmente dos nós 4:244, 4:240 e 4:232."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="⌚" title="Chrome de todas as telas">
        Toda tela do Tik Tooria começa com a barra de status. Ela não é opcional: os 44px são
        reservados por todos os frames do arquivo.
      </TikDocCard>
      <TikDocCard icon="🌓" title="Dois contextos">
        Sobre cromo claro o conteúdo é <code>#171717</code>; sobre superfície imersiva é branco. Os
        dois valores são literais do arquivo.
      </TikDocCard>
      <TikDocCard icon="🔋" title="Bateria multicolorida">
        A cápsula combina contorno em <code>#ABABAB</code> com miolo na cor do contexto. É o único
        glifo da barra que não é monocromático.
      </TikDocCard>
      <TikDocCard icon="🌍" title="Horário configurável">
        O arquivo fixa <code>9:41</code>, mas a prop <code>time</code> permite exibir o horário real
        ou um valor localizado.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:1123"
      frameName="Bars / Status Bar / iPhone X"
      specs={[
        { label: 'Dimensões', value: '414 × 44' },
        { label: 'Relógio', value: 'SF Pro Text Semibold 15 · -0,3px' },
        { label: 'Recuo esquerdo', value: '23px' },
        { label: 'Recuo direito', value: '14,5px' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Geometria da bateria',
          detail:
            'o arquivo compõe a cápsula com um contorno, um terminal e um retângulo de carga. Os três nós são preservados no glifo `battery`; o retângulo de carga não declara fill e por isso herda a cor do contexto.',
        },
        {
          subject: 'Nível de bateria fixo',
          detail:
            'o retângulo de carga tem largura fixa de 18px no arquivo, o que representa carga cheia. Não há variante de nível — o componente não expõe prop de percentual.',
        },
        {
          subject: 'SF Pro Text',
          detail:
            'resolve nativamente em Apple; nos demais sistemas a pilha cai para as famílias de interface, o que altera ligeiramente a largura do relógio.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        {
          name: 'Relógio',
          role: 'Horário à esquerda, recuado 23px da borda.',
          token: '--tik-font-system-clock-* · --tik-color-text-statusbar',
        },
        {
          name: 'Sinal celular',
          role: 'Quatro barras crescentes, glifo mobileSignal.',
          token: 'node 4:244 · 19×11',
        },
        { name: 'Wi-Fi', role: 'Três arcos, glifo wifi.', token: 'node 4:240 · 17×11' },
        {
          name: 'Bateria',
          role: 'Cápsula com terminal, recuada 14,5px da borda direita.',
          token: 'node 4:232 · 25×11',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Cromo claro" surface="chrome" align="stretch" width={414}>
      <StatusBar surface="chrome" />
    </TikDocStage>
    <TikDocStage label="Imersivo" surface="immersive" align="stretch" width={414}>
      <StatusBar surface="immersive" />
    </TikDocStage>
    <TikDocStage label="Horário localizado" surface="chrome" align="stretch" width={414}>
      <StatusBar surface="chrome" time="14:52" />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Coloque a StatusBar como primeiro filho de toda tela, antes da barra superior.',
        'Escolha surface pelo fundo real da tela, não pela preferência do sistema.',
        'Deixe o horário em 9:41 nas estórias de documentação, para casar com o arquivo.',
        'Mantenha os 44px de altura: barras superiores e cabeçalhos já contam com essa reserva.',
      ]}
      donts={[
        'Não sobreponha conteúdo da tela à faixa de 44px.',
        'Não recolora a bateria manualmente — o tom do miolo vem do contexto.',
        'Não substitua os glifos de sistema por ícones de outra biblioteca.',
        'Não use a variante imersiva sobre fundo claro: o conteúdo branco desaparece.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher>
      {(surface) => (
        <div style={{ width: 414 }}>
          <StatusBar surface={surface === 'immersive' ? 'immersive' : 'chrome'} />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="StatusBar"
      rows={[
        {
          name: 'surface',
          type: "'chrome' | 'immersive'",
          default: "'chrome'",
          description:
            'Contexto de superfície. chrome pinta o conteúdo em --tik-color-text-statusbar; immersive o pinta em branco.',
        },
        {
          name: 'time',
          type: 'string',
          default: "'9:41'",
          description: 'Horário exibido à esquerda.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Classe CSS adicional aplicada ao contêiner.',
        },
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
  render: () => <StatusBarDocumentationPage />,
};

/**
 * Playground com 100% das props do StatusBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do StatusBar',
  render: (args) => (
    <div
      style={{
        width: 414,
        background:
          args.surface === 'immersive'
            ? 'var(--tik-color-surface-immersive)'
            : 'var(--tik-color-surface-primary)',
        border: '1px solid #E4E8E9',
      }}
    >
      <StatusBar {...args} />
    </div>
  ),
};

/**
 * Réplica visual dos frames oficiais do Figma, nos dois contextos.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
        <StatusBar surface="chrome" />
      </div>
      <div style={{ width: 414, background: 'var(--tik-color-surface-immersive)' }}>
        <StatusBar surface="immersive" />
      </div>
    </div>
  ),
};

/**
 * Os dois contextos de superfície lado a lado.
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
          <StatusBar surface={surface} />
        </div>
      ))}
    </div>
  ),
};
