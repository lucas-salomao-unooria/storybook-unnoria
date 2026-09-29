import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocAnatomy,
  UncDocPractices,
  UncDocPropsTable,
  UncDocStage,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import { DateChip, ChatWallpaper } from '../../../src/unoochat';
import { uncWallpaperFor, uncWallpaperLight } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente DateChip.
 */
const DateChipDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Conversa"
      title="DateChip"
      description="Separador de data do fluxo de mensagens: etiqueta de 27px de altura com raio de 6px em --unc-color-surface-datechip e texto de 12px em --unc-color-text-secondary, centralizada sobre o fundo da conversa nos temas claro e escuro."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="📅" title="Marcador temporal">
        Separa blocos de mensagens por dia, com rótulos como <code>HOJE</code>,{' '}
        <code>ONTEM</code> ou uma data completa.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Superfície própria">
        <code>--unc-color-surface-datechip</code> (#DFDDEB no claro, #34375C no escuro) destaca a
        etiqueta do fundo texturizado sem competir com os balões.
      </UncDocCard>
      <UncDocCard icon="📏" title="Largura mínima">
        A etiqueta tem 59px de largura mínima e cresce com o rótulo, mantendo os 27px de altura e o
        raio de 6px.
      </UncDocCard>
      <UncDocCard icon="🔤" title="Caixa alta por convenção">
        Os rótulos do produto vêm em caixa alta (<code>HOJE</code>). O componente não transforma o
        texto: o rótulo é passado já formatado.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="DateChip"
      layout="Etiqueta · 27px"
      specs={[
        { label: 'Altura', value: '27px' },
        { label: 'Largura mínima', value: '59px' },
        { label: 'Raio', value: '6px (--unc-radius-l)' },
        { label: 'Recuo lateral', value: '10px (--unc-spacing-s)' },
        { label: 'Superfície', value: '--unc-color-surface-datechip' },
        { label: 'Texto', value: 'Open Sans 400 · 12px / 18px · text-secondary' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Cores por tema',
          detail:
            'a superfície é brandpurple 200 no claro (#DFDDEB) e brandpurple 800 no escuro (#34375C); o texto usa --unc-color-text-secondary (#475157 / #CBD4D6), com contraste acima de 4,5:1 nos dois temas.',
        },
        {
          subject: 'Tamanho do rótulo',
          detail:
            'o rótulo usa o degrau de 12px da escala da Unooria (--unooria-size-body-xxs), o menor degrau de texto corrido, para a etiqueta não disputar atenção com as mensagens.',
        },
        {
          subject: 'Espaçamento interno',
          detail:
            'os 10px laterais são próprios do módulo e permitem rótulos mais longos que “HOJE” sem quebrar a altura fixa.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Cápsula', role: 'Retângulo de 27px de altura com raio de 6px.', token: '--unc-color-surface-datechip · --unc-radius-l' },
        { name: 'Rótulo', role: 'Data em Open Sans 12px.', token: '--unc-font-label-sm-* · --unc-color-text-secondary' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de rótulos" />
    {(['light', 'dark'] as const).map((theme) => (
      <UncDocStage
        key={theme}
        label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
        theme={theme}
        surface="canvas"
        padding={28}
        gap={16}
      >
        <DateChip>HOJE</DateChip>
        <DateChip>ONTEM</DateChip>
        <DateChip>16/02/2026</DateChip>
        <DateChip>SEGUNDA-FEIRA</DateChip>
      </UncDocStage>
    ))}

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Em contexto"
      description="Sobre o fundo texturizado da conversa, nos dois temas."
    />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <div key={theme} data-unc-theme={theme} style={{ width: 411, display: 'flex' }}>
          <ChatWallpaper src={uncWallpaperFor(theme)}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '18px 0 200px' }}>
              <DateChip>HOJE</DateChip>
            </div>
          </ChatWallpaper>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={[
        'Centralizar horizontalmente no fluxo de mensagens.',
        'Passar o rótulo já formatado, em caixa alta.',
        'Inserir apenas quando a data muda entre mensagens consecutivas.',
        'Manter a etiqueta acima do primeiro balão do dia.',
      ]}
      donts={[
        'Alinhar à esquerda ou à direita.',
        'Usar a superfície da barra superior em vez de --unc-color-surface-datechip.',
        'Aplicar text-transform no CSS: o rótulo chega pronto.',
        'Repetir a etiqueta entre mensagens do mesmo dia.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre claro e escuro: a superfície e o texto da etiqueta acompanham data-unc-theme."
    />
    <UncDocThemeSwitcher surface="base" padding={40}>
      {() => <DateChip>HOJE</DateChip>}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
      title="DateChip"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo exibido. Obrigatório.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof DateChip> = {
  title: 'Unoochat/Componentes/DateChip',
  component: DateChip,
  parameters: { layout: 'padded' },
  argTypes: { children: { control: 'text', description: 'Rótulo exibido.' } },
  args: { children: 'HOJE' },
};

export default meta;

type Story = StoryObj<typeof DateChip>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <DateChipDocumentationPage />,
};

/**
 * Playground com 100% das props do DateChip expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do DateChip',
  render: (args) => (
    <UncDocStage surface="canvas" padding={40}>
      <DateChip {...args} />
    </UncDocStage>
  ),
};

/**
 * Etiqueta “HOJE” sobre o fundo texturizado da conversa.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <div style={{ width: 411, height: 260, display: 'flex' }}>
      <ChatWallpaper src={uncWallpaperLight}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 18 }}>
          <DateChip>HOJE</DateChip>
        </div>
      </ChatWallpaper>
    </div>
  ),
};

/**
 * Matriz de rótulos de comprimentos diferentes.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UncDocStage surface="canvas" padding={28} gap={16}>
      <DateChip>HOJE</DateChip>
      <DateChip>ONTEM</DateChip>
      <DateChip>16/02/2026</DateChip>
    </UncDocStage>
  ),
};
