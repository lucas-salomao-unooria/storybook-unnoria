import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
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
import { TabBar, TopBar } from '../../../src/whatsappmobile';
import { waTabs } from '../fixtures';

const BAR = '#0CA996';

/**
 * Demonstração interativa com estado local de aba ativa.
 */
const InteractiveTabBar: React.FC = () => {
  const [activeId, setActiveId] = useState('chats');

  return (
    <div style={{ width: 411 }}>
      <TabBar
        items={waTabs}
        activeId={activeId}
        onChange={setActiveId}
        tone={activeId === 'status' ? 'accentStatus' : 'accent'}
      />
      <div
        style={{
          background: 'var(--wa-color-surface-canvas)',
          color: 'var(--wa-color-text-primary)',
          fontFamily: 'var(--wa-font-sans)',
          fontSize: 15,
          padding: '20px 19px',
        }}
        id={`wa-tabpanel-${activeId}`}
        role="tabpanel"
        aria-labelledby={`wa-tab-${activeId}`}
      >
        Painel de {activeId}
      </div>
    </div>
  );
};

/**
 * Página de documentação rica do componente TabBar.
 */
const TabBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Navegação"
      title="TabBar"
      description="Navegação primária entre CHATS, STATUS e CALLS. Reproduz a faixa inferior da barra de 100px do arquivo: atalho de câmera à esquerda, três abas de 112px separadas por 18px, selo de não lidas ao lado do rótulo ativo e indicador arredondado de 3px sob a aba selecionada."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🧭" title="Três abas fixas">
        O produto tem exatamente três destinos primários. A prop <code>items</code> aceita qualquer
        conjunto, mas o arquivo desenha CHATS, STATUS e CALLS nesta ordem.
      </WaDocCard>
      <WaDocCard icon="📸" title="Atalho de câmera">
        À esquerda das abas, ocupando a calha de 37px do arquivo. É uma ação, não uma aba: não
        participa da seleção nem recebe indicador.
      </WaDocCard>
      <WaDocCard icon="🟩" title="Dois verdes de ativo">
        O arquivo pinta CHATS ativa em #0CA996 e STATUS ativa em #189C87. A prop{' '}
        <code>tone</code> preserva essa divergência em vez de uniformizá-la.
      </WaDocCard>
      <WaDocCard icon="♿" title="Semântica de abas">
        A barra é um <code>tablist</code>; cada aba é um <code>tab</code> com{' '}
        <code>aria-selected</code> e <code>aria-controls</code> apontando para o painel.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2166"
      frameName="Chats Main Page · Line 7 (indicador)"
      specs={[
        { label: 'Altura da faixa', value: '31 px' },
        { label: 'Largura da aba', value: '112 px' },
        { label: 'Espaço entre abas', value: '18 px' },
        { label: 'Indicador', value: '3 px arredondado' },
        { label: 'Rótulo', value: 'PT Sans 700 · 16px' },
        { label: 'Câmera', value: 'fa-solid:camera · 20px · #9DA5AC' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Alinhamento dos rótulos',
          detail:
            'no arquivo, o rótulo CALLS fica 9px à direita do centro do seu compartimento. O componente centraliza os três rótulos, correção deliberada de um deslize de desenho.',
        },
        {
          subject: 'Cor da aba ativa',
          detail:
            'CHATS usa #0CA996 (node 1:2140) e STATUS usa #189C87 (node 1:151). Ambos são expostos via prop tone; nenhum foi descartado.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Superfície', role: 'Compartilha o fundo da barra superior.', token: '--wa-color-surface-appbar' },
        { name: 'Atalho de câmera', role: 'Botão de ação na calha esquerda de 37px.', token: '--wa-color-icon-camera' },
        { name: 'Rótulo', role: 'Nome da aba em caixa alta.', token: '--wa-font-body-md-* · --wa-color-text-appbar' },
        { name: 'Selo', role: 'Contagem de não lidas ao lado do rótulo.', token: 'Badge variant="tab"' },
        { name: 'Indicador', role: 'Linha arredondada de 3px sob a aba ativa.', token: '--wa-tab-indicator-width · --wa-color-accent' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <WaDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <TabBar items={waTabs} activeId="chats" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={waTabs} activeId="status" tone="accentStatus" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={waTabs} activeId="calls" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={waTabs.map((tab) => ({ ...tab, badge: undefined }))} activeId="chats" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={waTabs} activeId="chats" showCamera={false} />
      </div>
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Demonstração interativa"
      description="Selecione uma aba: o indicador, o tom e o painel controlado acompanham."
    />
    <WaDocStage surface="canvas" padding={20}>
      <InteractiveTabBar />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Manter o TabBar dentro do footer do TopBar, na mesma superfície.',
        'Trocar tone para "accentStatus" quando a aba STATUS estiver ativa.',
        'Ligar aria-controls do tab ao id do painel correspondente.',
        'Exibir o selo apenas quando houver mensagens não lidas.',
      ]}
      donts={[
        'Adicionar uma quarta aba: o compartimento de 112px deixa de caber em 411px.',
        'Tratar o atalho de câmera como aba selecionável.',
        'Repetir o indicador em mais de uma aba.',
        'Renderizar o TabBar sobre a superfície canvas em vez da app bar.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base']}>
      {() => (
        <div style={{ width: 411 }}>
          <TabBar items={waTabs} activeId="chats" />
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="TabBar"
      rows={[
        { name: 'items', type: 'WaTabBarItem[]', description: 'Abas exibidas na barra. Obrigatório.' },
        { name: 'activeId', type: 'string', description: 'Identificador da aba ativa. Obrigatório.' },
        { name: 'onChange', type: '(id: string) => void', description: 'Callback disparado ao selecionar uma aba.' },
        { name: 'showCamera', type: 'boolean', default: 'true', description: 'Exibe o atalho de câmera à esquerda.' },
        { name: 'onCamera', type: '(event) => void', description: 'Callback do atalho de câmera.' },
        { name: 'tone', type: "'accent' | 'accentStatus'", default: "'accent'", description: 'Tom do rótulo e do indicador da aba ativa.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <WaDocPropsTable
      title="WaTabBarItem"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único da aba.' },
        { name: 'label', type: 'string', description: 'Rótulo exibido em caixa alta.' },
        { name: 'badge', type: 'number', description: 'Quantidade de não lidas exibida em um selo.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TabBar> = {
  title: 'Whatsapp Mobile/Componentes/TabBar',
  component: TabBar,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Abas exibidas na barra.' },
    activeId: { control: 'select', options: ['chats', 'status', 'calls'], description: 'Aba ativa.' },
    showCamera: { control: 'boolean', description: 'Exibe o atalho de câmera.' },
    tone: { control: 'radio', options: ['accent', 'accentStatus'], description: 'Tom da aba ativa.' },
  },
  args: { items: waTabs, activeId: 'chats', showCamera: true, tone: 'accent' },
};

export default meta;

type Story = StoryObj<typeof TabBar>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TabBarDocumentationPage />,
};

/**
 * Playground com 100% das props do TabBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TabBar',
  render: (args) => (
    <WaDocStage surface="canvas" padding={20}>
      <div style={{ width: 411 }}>
        <TabBar {...args} />
      </div>
    </WaDocStage>
  ),
};

/**
 * Réplica da faixa de abas do frame "Chats Main Page".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="canvas" padding={20}>
      <div style={{ width: 411 }}>
        <TopBar title="WhatsApp" footer={<TabBar items={waTabs} activeId="chats" />} />
      </div>
    </WaDocStage>
  ),
};

/**
 * Matriz completa de abas ativas e tons.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <TabBar items={waTabs} activeId="chats" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={waTabs} activeId="status" tone="accentStatus" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={waTabs} activeId="calls" />
      </div>
    </WaDocStage>
  ),
};

/**
 * Estados de seleção, com e sem selo e sem o atalho de câmera.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <TabBar items={waTabs.map((tab) => ({ ...tab, badge: undefined }))} activeId="chats" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={waTabs} activeId="chats" showCamera={false} />
      </div>
      <div style={{ width: 411 }}>
        <InteractiveTabBar />
      </div>
    </WaDocStage>
  ),
};
