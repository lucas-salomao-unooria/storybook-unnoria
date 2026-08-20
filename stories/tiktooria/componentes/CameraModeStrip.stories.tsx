import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';

import { CameraModeStrip } from '../../../src/tiktooria';
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
import { tikCameraModes, tikCameraPreview } from '../fixtures';

const meta: Meta<typeof CameraModeStrip> = {
  title: 'Tik Tooria/Componentes/CameraModeStrip',
  component: CameraModeStrip,
  parameters: { layout: 'padded' },
  argTypes: {
    active: { control: 'select', options: ['60s', '15s', 'templates'] },
    className: { control: 'text' },
  },
  args: {
    active: '15s',
  },
};

export default meta;

type Story = StoryObj<typeof CameraModeStrip>;


const CameraModeStripDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Câmera"
      title="CameraModeStrip"
      description="Tira de modos de captura na base da câmera. Os rótulos usam Bold 15 em branco; os inativos ficam a 60% de opacidade e o ativo recebe o disco de 5px abaixo — exatamente como no arquivo, que publica três modos: 60s, 15s e Templates."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="⏱️" title="Três modos">
        60s, 15s e Templates. No arquivo o modo ativo é o de 15s, o padrão do produto.
      </TikDocCard>
      <TikDocCard icon="⚪" title="Disco de 5px">
        Marca de seleção sob o rótulo ativo, o menor indicador do módulo.
      </TikDocCard>
      <TikDocCard icon="🫥" title="60% nos inativos">
        A distinção é só de opacidade: o tamanho e o peso não mudam entre estados.
      </TikDocCard>
      <TikDocCard icon="🔤" title="Bold 15">
        Mesmo degrau do botão primário, o que dá peso à escolha de duração.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:664"
      frameName="Camera Configurations — TikTok Camera"
      specs={[
        { label: 'Dimensões', value: '179 × 29' },
        { label: 'Rótulo', value: 'Bold 15 · branco' },
        { label: 'Inativo', value: '60% de opacidade' },
        { label: 'Disco', value: '5px' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Espaçamento por coordenada',
          detail:
            'o arquivo centraliza os rótulos em x=152, 206,5 e 283 — intervalos de 54,5 e 76,5px, proporcionais ao comprimento de cada palavra. O componente usa gap fixo de 24px, o que produz espaçamento regular.',
        },
        {
          subject: 'Sem estado de foco no arquivo',
          detail:
            'foi acrescentado anel de 2px em branco no :focus-visible, coerente com os outros controles sobre superfície imersiva.',
        },
        {
          subject: 'Modos como dado',
          detail:
            'o arquivo grava os três rótulos como texto. O componente os recebe por prop, para que um produto possa oferecer outras durações.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Tira', role: 'Linha horizontal centralizada com 24px entre modos.' },
        { name: 'Rótulo', role: 'Bold 15 em branco, a 60% quando inativo.', token: '--tik-font-body-bold-*' },
        { name: 'Disco', role: 'Marca de 5px sob o rótulo ativo.', token: '--tik-color-text-on-immersive' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Como no arquivo — 15s ativo" surface="immersive" gap={40}>
      <CameraModeStrip modes={tikCameraModes} active="15s" />
    </TikDocStage>
    <TikDocStage label="Cada modo ativo" surface="immersive" direction="column" align="center" gap={24}>
      {tikCameraModes.map((mode) => (
        <CameraModeStrip key={mode.id} modes={tikCameraModes} active={mode.id} />
      ))}
    </TikDocStage>
    <TikDocStage label="Durações alternativas" surface="immersive" gap={40}>
      <CameraModeStrip
        modes={[
          { id: '3m', label: '3m' },
          { id: '60s', label: '60s' },
          { id: '15s', label: '15s' },
        ]}
        active="60s"
      />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Mantenha a ordem das durações da mais longa para a mais curta, como no arquivo.',
        'Posicione a tira sob a superfície da câmera, centralizada.',
        'Trate onSelect como troca de duração de gravação.',
      ]}
      donts={[
        'Não use a tira sobre cromo claro.',
        'Não altere o tamanho do rótulo entre estados: a distinção é de opacidade.',
        'Não aumente o disco de 5px.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher initial="immersive">
      {() => (
        <CameraModeStrip modes={tikCameraModes} active="15s" />
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="CameraModeStrip"
      rows={[
        {
          name: 'modes',
          type: "TikCameraMode[]",
          description:
            'Modos exibidos. O arquivo publica três: 60s, 15s e Templates.',
        },
        {
          name: 'active',
          type: "string",
          description:
            'Identificador do modo ativo.',
        },
        {
          name: 'onSelect',
          type: "(id: string) => void",
          description:
            'Acionado ao selecionar um modo.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>",
          description:
            'Demais atributos HTML são repassados ao contêiner.',
        },
      ]}
    />
    <TikDocPropsTable
      title="TikCameraMode"
      rows={[
        {
          name: 'id',
          type: "string",
          description:
            'Identificador do modo.',
        },
        {
          name: 'label',
          type: "React.ReactNode",
          description:
            'Rótulo exibido em Bold 15.',
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
  render: () => <CameraModeStripDocumentationPage />,
};

/**
 * Playground com 100% das props do CameraModeStrip expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do CameraModeStrip',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <CameraModeStrip {...args} modes={tikCameraModes} />
    </div>
  ),
};

/**
 * Réplica visual da tira do frame “TikTok Camera”, sob a pré-visualização.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        width: 414,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <div
        style={{
          height: 300,
          margin: '0 0 24px',
          background: `center/cover no-repeat url(${tikCameraPreview})`,
          borderRadius: 'var(--tik-radius-surface)',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 24 }}>
        <CameraModeStrip modes={tikCameraModes} active="15s" />
      </div>
    </div>
  ),
};

/**
 * Cada modo no estado ativo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        alignItems: 'center',
        padding: 32,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      {tikCameraModes.map((mode) => (
        <CameraModeStrip key={mode.id} modes={tikCameraModes} active={mode.id} />
      ))}
    </div>
  ),
};

/**
 * Troca de modo controlada, com o estado mantido pela estória.
 */
export const Estados: Story = {
  render: () => {
    const [active, setActive] = useState('15s');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          alignItems: 'center',
          padding: 32,
          background: 'var(--tik-color-surface-immersive)',
        }}
      >
        <CameraModeStrip modes={tikCameraModes} active={active} onSelect={setActive} />
        <span
          style={{
            fontFamily: 'var(--tik-font-sans)',
            fontSize: 13,
            color: 'var(--tik-color-text-on-immersive-muted)',
          }}
        >
          Modo ativo: {active}
        </span>
      </div>
    );
  },
};
