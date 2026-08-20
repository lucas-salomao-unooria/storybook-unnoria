import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Separator, SectionLabel, SettingsRow } from '../../../src/tiktooria';
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

const meta: Meta<typeof Separator> = {
  title: 'Tik Tooria/Componentes/Separator',
  component: Separator,
  parameters: { layout: 'padded' },
  argTypes: {
    tone: { control: 'radio', options: ['hairline', 'sheet'] },
    inset: { control: 'boolean' },
    className: { control: 'text' },
  },
  args: {
    tone: 'hairline',
    inset: true,
  },
};

export default meta;

type Story = StoryObj<typeof Separator>;


const SeparatorDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Listas"
      title="Separator"
      description="Fio de 382px que separa seções de configuração e as duas faixas da folha de compartilhamento. A espessura é fracionária no arquivo — 0,66px entre seções e 0,33px na folha — e é reproduzida por border-top, não por altura de bloco, para não somar pixel inteiro ao fluxo."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="➖" title="Dois tons">
        <code>hairline</code> (#D0D1D3, 0,66px) separa seções de configuração; <code>sheet</code> (#DADBDB, 0,33px) separa as faixas da folha. São dois valores distintos no arquivo.
      </TikDocCard>
      <TikDocCard icon="📐" title="Largura de 382px">
        O fio recua 16px de cada lado. <code>inset={false}</code> o estende de borda a borda, para composições que precisam disso.
      </TikDocCard>
      <TikDocCard icon="🪶" title="Fora do fluxo">
        Implementado como <code>border-top</code> em um elemento de altura zero, o que evita somar um pixel inteiro à lista.
      </TikDocCard>
      <TikDocCard icon="🧱" title="Semântico">
        Renderiza <code>&lt;hr&gt;</code>, que leitores de tela anunciam como separador temático.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:269"
      frameName="Spearator — TikTok Privacy and settings"
      specs={[
        { label: 'Largura', value: '382px' },
        { label: 'Espessura (seção)', value: '0,66px' },
        { label: 'Espessura (folha)', value: '0,33px' },
        { label: 'Recuo lateral', value: '16px' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Nome do nó grafado “Spearator”',
          detail:
            'o arquivo contém um erro de digitação no nome da camada. O componente usa a grafia correta; o node de origem está registrado para rastreabilidade.',
        },
        {
          subject: 'Fio como border em vez de nó de linha',
          detail:
            'o arquivo desenha um nó LINE com stroke. Reproduzido como border-top de altura zero, o que dá o mesmo resultado sem introduzir um elemento com caixa.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Fio', role: 'Borda superior de espessura fracionária, com recuo lateral opcional.', token: '--tik-color-border-hairline / --tik-color-border-separator' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Tom de seção, entre grupos de configuração" surface="chrome" align="stretch" direction="column" width={414} gap={0}>
      <SectionLabel>ACCOUNT</SectionLabel>
      <SettingsRow label="Manage my account" icon="accountStroke" />
      <Separator />
      <SectionLabel>GENERAL</SectionLabel>
      <SettingsRow label="Push notifications" icon="bell" />
    </TikDocStage>
    <TikDocStage label="Tom de folha" surface="sheet" align="stretch" direction="column" width={414} gap={16}>
      <Separator tone="sheet" />
    </TikDocStage>
    <TikDocStage label="Sem recuo lateral" surface="chrome" align="stretch" direction="column" width={414} gap={16}>
      <Separator inset={false} />
      <Separator tone="sheet" inset={false} />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use tone="hairline" entre seções de configuração e tone="sheet" dentro de folhas.',
        'Mantenha inset ligado nas listas, para casar com a calha de 16px.',
        'Prefira o Separator a uma borda na linha: as linhas do arquivo não têm borda própria.',
      ]}
      donts={[
        'Não arredonde a espessura para 1px.',
        'Não coloque um Separator entre cada linha: o arquivo só separa grupos.',
        'Não use o tom de folha sobre cromo claro nem o de seção dentro de uma folha.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome', 'sheet']}>
      {(surface) => (
        <div style={{ width: 414 }}>
          <Separator tone={surface === 'sheet' ? 'sheet' : 'hairline'} />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="Separator"
      rows={[
        {
          name: 'tone',
          type: "'hairline' | 'sheet'",
          default: "hairline",
          description:
            'Tom do fio. hairline usa #D0D1D3 a 0,66px; sheet usa #DADBDB a 0,33px.',
        },
        {
          name: 'inset',
          type: "boolean",
          default: "true",
          description:
            'Aplica a calha lateral de 16px, resultando nos 382px do arquivo.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "Omit<React.HTMLAttributes<HTMLHRElement>, 'children'>",
          description:
            'Demais atributos HTML são repassados ao <hr>.',
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
  render: () => <SeparatorDocumentationPage />,
};

/**
 * Playground com 100% das props do Separator expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Separator',
  render: (args) => (
    <div style={{ width: 414, padding: '24px 0', background: 'var(--tik-color-surface-primary)' }}>
      <Separator {...args} />
    </div>
  ),
};

/**
 * Réplica visual dos dois usos publicados pelo arquivo.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 414 }}>
      <div style={{ background: 'var(--tik-color-surface-primary)', paddingBottom: 12 }}>
        <SectionLabel>ACCOUNT</SectionLabel>
        <SettingsRow label="TikCode" icon="qrCode" />
        <Separator />
        <SectionLabel>GENERAL</SectionLabel>
        <SettingsRow label="Data Saver" icon="drop" />
      </div>
      <div style={{ background: 'var(--tik-color-surface-sheet)', padding: '20px 0' }}>
        <Separator tone="sheet" />
      </div>
    </div>
  ),
};

/**
 * Os dois tons, com e sem recuo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ width: 414, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Separator />
      <Separator inset={false} />
      <div style={{ background: 'var(--tik-color-surface-sheet)', padding: '20px 0' }}>
        <Separator tone="sheet" />
      </div>
      <div style={{ background: 'var(--tik-color-surface-sheet)', padding: '20px 0' }}>
        <Separator tone="sheet" inset={false} />
      </div>
    </div>
  ),
};
