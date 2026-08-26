import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { SubscribeButton } from '../../../src/unitube';
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
  UniDocSurfaceSwitcher,
} from '../../../.storybook/components';

const meta: Meta<typeof SubscribeButton> = {
  title: 'Unitube/Componentes/SubscribeButton',
  component: SubscribeButton,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    subscribed: { control: 'boolean' },
    subscribedLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
  args: {
    label: 'Subscribes',
    subscribed: false,
    subscribedLabel: 'Subscribed',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof SubscribeButton>;

const SubscribeButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Componentes • Ação"
      title="SubscribeButton"
      description="Reprodução do nó Channel/Subscribes-Btn, o único botão preenchido de todo o arquivo. Aparece com geometria idêntica no cabeçalho de canal (17:2796) e na descrição do vídeo (20:2989): 116×36, recuo 10/16, raio de 2px e preenchimento #CC0000 — a primitiva red/700, e não o vermelho semântico da marca."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Por que este é o único botão sólido do arquivo."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🎯" title="A única chamada principal">
        Todo o resto da interface é transparente ou contornado. Este botão é o único com superfície
        sólida — é o que o distingue como ação principal de canal.
      </UniDocCard>
      <UniDocCard icon="🔴" title="Vermelho próprio">
        Usa <code>#CC0000</code> (<code>red/700</code>), mais escuro que o vermelho semântico{' '}
        <code>#EE1A26</code>. Os dois convivem na mesma tela e não podem ser consolidados.
      </UniDocCard>
      <UniDocCard icon="📐" title="Raio de 2px, não pílula">
        O raio é <code>--uni-radius-sm</code>, o mesmo do campo de busca. O botão é retangular de
        cantos suaves, não uma cápsula.
      </UniDocCard>
      <UniDocCard icon="🔁" title="Geometria idêntica em dois contextos">
        Cabeçalho de canal e descrição do vídeo usam exatamente as mesmas medidas. O que muda é o
        recuo do quadro que o envolve — 22px no canal, 7/8px na descrição.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="17:2796"
      frameName="Channel/Subscribes-Btn"
      specs={[
        { label: 'Dimensões', value: '116 × 36' },
        { label: 'Recuo', value: '10 / 16' },
        { label: 'Raio', value: '2px (--uni-radius-sm)' },
        { label: 'Preenchimento', value: '#CC0000 (red/700)' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Estado inscrito',
          detail:
            'o arquivo publica apenas o botão vermelho, não inscrito. O estado inscrito foi acrescentado com --uni-color-background-surface e texto secundário, porque um botão de inscrição sem estado não comunica se a ação já foi tomada. Define aria-pressed.',
        },
        {
          subject: 'Rótulo no plural',
          detail:
            'o arquivo escreve “Subscribes”, no plural, provavelmente por engano do autor do arquivo comunitário. O rótulo literal foi preservado como padrão; a prop label permite corrigi-lo em produto.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'hover, foco e desabilitado não existem no arquivo. Foram construídos com um realce de brilho, anel de foco de 2px no vermelho semântico e 40% de opacidade no desabilitado.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Superfície',
          role: 'Retângulo sólido de 36px de altura com raio de 2px.',
          token: '--uni-color-brand-subscribe · --uni-radius-sm',
        },
        {
          name: 'Rótulo',
          role: 'Label/Large em texto primário, com recuo 10/16.',
          token: '--uni-font-label-lg-*',
        },
        {
          name: 'Estado inscrito',
          role: 'Superfície interativa com texto secundário, acrescentado pela biblioteca.',
          token: '--uni-color-background-surface',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo" surface="primary">
      <SubscribeButton />
    </UniDocStage>
    <UniDocStage label="Estados" surface="primary" gap={20}>
      <SubscribeButton />
      <SubscribeButton subscribed />
      <SubscribeButton disabled />
    </UniDocStage>
    <UniDocStage label="Rótulos localizados" surface="primary" gap={20}>
      <SubscribeButton label="Inscrever-se" subscribedLabel="Inscrito" />
      <SubscribeButton label="Inscrever-se" subscribedLabel="Inscrito" subscribed />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Reserve este botão para a ação principal de canal: é o único sólido do arquivo.',
        'Use subscribed para refletir o estado real da inscrição, e não apenas o visual.',
        'Localize label e subscribedLabel juntos, para que os dois estados falem a mesma língua.',
        'Mantenha o raio de 2px: o botão é retangular, não uma cápsula.',
      ]}
      donts={[
        'Não troque --uni-color-brand-subscribe por --uni-color-brand-primary: são vermelhos diferentes.',
        'Não use mais de um botão sólido por tela — a hierarquia depende de ele ser único.',
        'Não arredonde o botão em pílula: o arquivo usa o mesmo raio do campo de busca.',
        'Não remova o aria-pressed: é o que comunica o estado a leitores de tela.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O botão sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'surface']}>
      {() => (
        <>
          <SubscribeButton />
          <SubscribeButton subscribed />
        </>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="SubscribeButton"
      rows={[
        {
          name: 'label',
          type: 'React.ReactNode',
          default: "'Subscribes'",
          description:
            'Rótulo do estado não inscrito. O padrão reproduz o texto literal do arquivo, que está no plural.',
        },
        {
          name: 'subscribed',
          type: 'boolean',
          default: 'false',
          description:
            'Marca o canal como já inscrito. Troca a superfície e o rótulo, e define aria-pressed. Estado acrescentado pela biblioteca.',
        },
        {
          name: 'subscribedLabel',
          type: 'React.ReactNode',
          default: "'Subscribed'",
          description: 'Rótulo exibido quando subscribed é verdadeiro.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
          description: 'Demais atributos são repassados ao <button>, incluindo onClick e disabled.',
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
  render: () => <SubscribeButtonDocumentationPage />,
};

/**
 * Playground com 100% das props do SubscribeButton expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SubscribeButton',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <SubscribeButton {...args} />
    </div>
  ),
};

/**
 * Réplica visual do nó `Channel/Subscribes-Btn` (17:2796).
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-primary)' }}
    >
      <SubscribeButton />
    </div>
  ),
};

/**
 * Os dois estados de inscrição.
 */
export const Estados: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 20,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <SubscribeButton />
      <SubscribeButton subscribed />
      <SubscribeButton disabled />
    </div>
  ),
};
