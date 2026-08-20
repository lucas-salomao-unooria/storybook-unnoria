import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  WaDocGrid,
  WaDocCard,
  WaDocFigmaSpecs,
  WaDocDeviations,
  WaDocAnatomy,
  WaDocPractices,
  WaDocPropsTable,
  WaDocStage,
  WaDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { Fab } from '../../../src/whatsappmobile';

const BAR = '#0CA996';

const VARIANTS = [
  { variant: 'chat' as const, label: 'chat · 52px · #04AD9C', usage: 'Nova conversa (1:2128)' },
  { variant: 'camera' as const, label: 'camera · 54px · #00B09C', usage: 'Novo status (1:165)' },
  { variant: 'call' as const, label: 'call · 54px · #00B09C', usage: 'Nova chamada (1:696)' },
  { variant: 'mic' as const, label: 'mic · 43px · #02AF9C', usage: 'Gravar áudio (1:3031)' },
  { variant: 'edit' as const, label: 'edit · 41px · #313C42', usage: 'Escrever status (1:162)' },
  { variant: 'endCall' as const, label: 'endCall · 58px · #E91C43', usage: 'Encerrar chamada (1:4631)' },
];

/**
 * Página de documentação rica do componente Fab.
 */
const FabDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Ações"
      title="Fab"
      description="Botão de ação flutuante circular. Cada variante reproduz o diâmetro, a cor de preenchimento e o glifo exportados do frame correspondente do arquivo — de 41px a 58px, em cinco verdes distintos e um vermelho. O drop shadow de 0 4px 2px rgba(0,0,0,0.25) é aplicado ao glifo interno, nunca ao círculo, exatamente como no Figma."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="➕" title="Uma ação primária por tela">
        Cada aba tem seu FAB: nova conversa em CHATS, câmera em STATUS e nova chamada em CALLS.
        O arquivo nunca empilha dois FABs de mesma hierarquia.
      </WaDocCard>
      <WaDocCard icon="🎨" title="Cinco verdes distintos">
        <code>#04AD9C</code>, <code>#00B09C</code> e <code>#02AF9C</code> são tons próximos porém
        diferentes no arquivo. Cada variante consome o token do seu contexto.
      </WaDocCard>
      <WaDocCard icon="✨" title="Sombra apenas no glifo">
        O filtro SVG do arquivo envolve o vetor interno. Aplicá-lo ao círculo produziria uma peça
        visualmente diferente da original.
      </WaDocCard>
      <WaDocCard icon="🎙️" title="Glifo de microfone composto">
        <code>micBody</code> e <code>micStand</code> são dois nós independentes do Figma,
        posicionados pelo componente nas coordenadas originais em vez de fundidos num caminho novo.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2128"
      frameName="Chats Main Page · Group 224"
      specs={[
        { label: 'Diâmetros', value: '41 · 43 · 52 · 54 · 58 px' },
        { label: 'Sombra', value: '0 4px 2px rgba(0,0,0,0.25)' },
        { label: 'Alvo da sombra', value: 'Glifo interno' },
        { label: 'FAB de conversa', value: '52 × 51 px · #04AD9C' },
        { label: 'FAB secundário', value: '41 × 40 px · #313C42' },
        { label: 'Encerrar chamada', value: '58 px · #E91C43' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Elipses não circulares',
          detail:
            'no arquivo, o FAB de conversa mede 52×51px e o secundário 41×40px — elipses de 1px de diferença. O componente adota círculos perfeitos de 52px e 41px, correção deliberada de um deslize de desenho.',
        },
        {
          subject: 'Linhas internas do glifo newChat',
          detail:
            'as duas linhas dentro do balão são nós separados no arquivo (Line 16 e Line 17), com traços #04A595 e #04AD9C. Como são recortes do próprio círculo, ambas foram registradas em `--wa-color-accent-fab-chat` (#04AD9C) — a cor do FAB —, mantendo o recorte coerente caso a superfície mude.',
        },
        {
          subject: 'viewBox dos glifos',
          detail:
            'newChat e pencil mantêm o viewBox do grupo original (52×51 e 41×40), incluindo o espaço em volta do vetor, para posicionar o glifo dentro do círculo como no Figma.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Círculo', role: 'Superfície circular preenchida pela cor da variante.', token: '--wa-color-accent-fab* · --wa-color-danger-endcall' },
        { name: 'Glifo', role: 'Vetor exportado do Figma, com o drop shadow do arquivo.', token: '--wa-elevation-fab · --wa-color-icon-on-accent' },
        { name: 'Rótulo acessível', role: 'Texto obrigatório anunciado por leitores de tela.', token: 'prop label' },
        { name: 'Anel de foco', role: 'Contorno visível na navegação por teclado.', token: '--wa-color-icon-appbar' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes, tamanhos e estados" />
    <WaDocStage surface="canvas" padding={32} gap={36}>
      {VARIANTS.map((item) => (
        <div key={item.variant} style={{ textAlign: 'center', width: 150 }}>
          <Fab variant={item.variant} label={item.usage} />
          <div style={{ marginTop: 10, color: 'var(--wa-color-text-meta)', fontFamily: 'var(--wa-font-sans)', fontSize: 11 }}>
            {item.label}
            <br />
            {item.usage}
          </div>
        </div>
      ))}
    </WaDocStage>

    <WaDocStage label="Tamanho livre" surface="canvas" padding={32} gap={28}>
      {[32, 43, 52, 64, 80].map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Fab variant="chat" size={size} label={`Nova conversa ${size}px`} />
          <div style={{ marginTop: 8, color: 'var(--wa-color-text-meta)', fontFamily: 'var(--wa-font-sans)', fontSize: 11 }}>
            {size}px
          </div>
        </div>
      ))}
    </WaDocStage>

    <WaDocStage label="Estados" surface="canvas" padding={32} gap={28}>
      <Fab variant="chat" label="Padrão" />
      <Fab variant="chat" label="Desabilitado" disabled />
      <Fab variant="endCall" label="Encerrar" />
      <Fab variant="endCall" label="Encerrar desabilitado" disabled />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Informar sempre label: o botão exibe apenas um glifo.',
        'Usar uma única ação primária por tela.',
        'Combinar edit e camera na aba Status, empilhados como no arquivo.',
        'Reservar endCall exclusivamente para encerrar chamadas.',
      ]}
      donts={[
        'Aplicar box-shadow ao círculo do botão.',
        'Trocar o verde de uma variante pelo de outra.',
        'Usar o FAB para ações secundárias que caberiam na barra superior.',
        'Renderizar o FAB sem rótulo acessível.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base', 'sheet', 'call']}>
      {() => (
        <>
          <Fab variant="chat" label="Nova conversa" />
          <Fab variant="camera" label="Novo status" />
          <Fab variant="mic" label="Gravar áudio" />
          <Fab variant="endCall" label="Encerrar chamada" />
        </>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="Fab"
      rows={[
        { name: 'variant', type: "'chat' | 'camera' | 'call' | 'mic' | 'edit' | 'endCall'", default: "'chat'", description: 'Variante visual, que define diâmetro, cor e glifo.' },
        { name: 'size', type: 'number', description: 'Diâmetro em pixels. Sem ela, usa a medida oficial da variante.' },
        { name: 'label', type: 'string', description: 'Rótulo acessível. Obrigatório.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o botão, aplicando opacidade 0,5.' },
        { name: 'onClick', type: '(event) => void', description: 'Callback de ativação.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Fab> = {
  title: 'Whatsapp Mobile/Componentes/Fab',
  component: Fab,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['chat', 'camera', 'call', 'mic', 'edit', 'endCall'], description: 'Variante visual.' },
    size: { control: { type: 'range', min: 24, max: 120, step: 1 }, description: 'Diâmetro em pixels.' },
    label: { control: 'text', description: 'Rótulo acessível.' },
    disabled: { control: 'boolean', description: 'Desabilita o botão.' },
  },
  args: { variant: 'chat', size: 52, label: 'Nova conversa', disabled: false },
};

export default meta;

type Story = StoryObj<typeof Fab>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <FabDocumentationPage />,
};

/**
 * Playground com 100% das props do Fab expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Fab',
  render: (args) => (
    <WaDocStage surface="canvas" padding={40}>
      <Fab {...args} />
    </WaDocStage>
  ),
};

/**
 * Réplica do par de FABs da aba Status, empilhados como no arquivo.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="canvas" padding={32} direction="column" gap={14}>
      <Fab variant="edit" label="Escrever status" />
      <Fab variant="camera" label="Novo status" />
    </WaDocStage>
  ),
};

/**
 * Matriz completa das seis variantes.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="canvas" padding={32} gap={32}>
      {VARIANTS.map((item) => (
        <Fab key={item.variant} variant={item.variant} label={item.usage} />
      ))}
    </WaDocStage>
  ),
};

/**
 * Comparação de diâmetros.
 */
export const Tamanhos: Story = {
  render: () => (
    <WaDocStage surface="canvas" padding={32} gap={28}>
      {[32, 43, 52, 64, 80].map((size) => (
        <Fab key={size} variant="chat" size={size} label={`Nova conversa ${size}px`} />
      ))}
    </WaDocStage>
  ),
};

/**
 * Estados padrão e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="canvas" padding={32} gap={28}>
      <Fab variant="chat" label="Padrão" />
      <Fab variant="chat" label="Desabilitado" disabled />
      <Fab variant="endCall" label="Encerrar" />
      <Fab variant="endCall" label="Encerrar desabilitado" disabled />
    </WaDocStage>
  ),
};
