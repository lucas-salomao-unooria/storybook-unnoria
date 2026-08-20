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
import { TopBar, TabBar } from '../../../src/whatsappmobile';
import { waTabs } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente TopBar.
 */
const TopBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Navegação"
      title="TopBar"
      description="Barra superior do produto em duas variantes: a faixa inicial de 69px com a marca WhatsApp, busca e menu de opções; e a faixa de página de 57px com seta de voltar, título e legenda opcional. O rodapé aceita o TabBar, reconstituindo a barra de 100px do frame Chats Main Page."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🏠" title="Variante home">
        Marca em PT Sans Bold 20px na cor <code>--wa-color-text-appbar</code>, calha de 24px e as
        ações de busca (25px) e menu (26px, girado 90°) à direita.
      </WaDocCard>
      <WaDocCard icon="📄" title="Variante page">
        Faixa de 57px com seta de voltar de 38px e título em <code>--wa-color-text-title</code>.
        É a barra de Settings, Starred messages, New group e Select Contact.
      </WaDocCard>
      <WaDocCard icon="🧩" title="Rodapé componível">
        A prop <code>footer</code> encaixa o <code>TabBar</code> dentro da mesma superfície,
        reproduzindo os 100px do arquivo sem duplicar o preenchimento.
      </WaDocCard>
      <WaDocCard icon="🏷️" title="Legenda de contexto">
        Frames como New group e Select Contact exibem uma segunda linha
        (&quot;Add participants&quot;, &quot;626 contacts&quot;), coberta pela prop{' '}
        <code>subtitle</code>.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2136"
      frameName="Chats Main Page · Rectangle 1"
      specs={[
        { label: 'Altura (home + abas)', value: '100 px' },
        { label: 'Altura (faixa de título)', value: '69 px' },
        { label: 'Altura (page)', value: '57 px' },
        { label: 'Superfície', value: '#232D36' },
        { label: 'Marca', value: 'PT Sans 700 · 20px · #9DA5AC' },
        { label: 'Ações', value: 'search 25px · overflow 26px @90°' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Legenda da variante page',
          detail:
            'o arquivo desenha a legenda em tamanhos variáveis por frame. O componente adota PT Sans Bold 13px em --wa-color-text-meta como valor único, mantendo a hierarquia sem multiplicar tokens.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Superfície', role: 'Faixa de fundo comum às duas variantes.', token: '--wa-color-surface-appbar' },
        { name: 'Seta de voltar', role: 'Opcional na home, padrão na variante page.', token: '--wa-color-icon-back' },
        { name: 'Título', role: 'Marca ou nome da página.', token: '--wa-font-title-md-* · --wa-color-text-appbar | --wa-color-text-title' },
        { name: 'Legenda', role: 'Segunda linha de contexto, opcional.', token: '--wa-color-text-meta' },
        { name: 'Ações', role: 'Slot livre seguido de busca e menu.', token: '--wa-color-icon-appbar' },
        { name: 'Rodapé', role: 'Encaixe do TabBar dentro da mesma superfície.', token: 'prop footer' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <WaDocStage surface="canvas" direction="column" align="stretch" gap={18} padding={20}>
      <div style={{ width: 411 }}>
        <TopBar title="WhatsApp" />
      </div>
      <div style={{ width: 411 }}>
        <TopBar
          title="WhatsApp"
          footer={<TabBar items={waTabs} activeId="chats" />}
        />
      </div>
      <div style={{ width: 411 }}>
        <TopBar variant="page" title="Settings" showSearch={false} showMenu={false} />
      </div>
      <div style={{ width: 411 }}>
        <TopBar variant="page" title="New group" subtitle="Add participants" showMenu={false} />
      </div>
      <div style={{ width: 411 }}>
        <TopBar variant="page" title="Select Contact" subtitle="626 contacts" />
      </div>
      <div style={{ width: 411 }}>
        <TopBar title="WhatsApp" showSearch={false} />
      </div>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Usar variant="home" apenas na tela inicial com abas.',
        'Encaixar o TabBar por footer, para que ambos compartilhem a mesma superfície.',
        'Ocultar busca e menu quando a página não oferecer essas ações.',
        'Manter o título em uma linha; a legenda existe justamente para o contexto extra.',
      ]}
      donts={[
        'Empilhar duas TopBar na mesma tela.',
        'Renderizar o TabBar fora do footer, criando uma segunda faixa de fundo.',
        'Usar --wa-color-text-title na variante home (a marca é mais apagada, #9DA5AC).',
        'Adicionar sombra sob a barra: o arquivo é plano.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base']}>
      {() => (
        <div style={{ width: 411 }}>
          <TopBar title="WhatsApp" footer={<TabBar items={waTabs} activeId="chats" />} />
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="TopBar"
      rows={[
        { name: 'title', type: 'string', description: 'Título exibido na barra. Obrigatório.' },
        { name: 'subtitle', type: 'string', description: 'Legenda opcional abaixo do título.' },
        { name: 'variant', type: "'home' | 'page'", default: "'home'", description: 'Variante visual da barra.' },
        { name: 'showBack', type: 'boolean', default: "variant === 'page'", description: 'Exibe a seta de voltar à esquerda.' },
        { name: 'onBack', type: '(event) => void', description: 'Callback da seta de voltar.' },
        { name: 'showSearch', type: 'boolean', default: 'true', description: 'Exibe a ação de busca à direita.' },
        { name: 'onSearch', type: '(event) => void', description: 'Callback da ação de busca.' },
        { name: 'showMenu', type: 'boolean', default: 'true', description: 'Exibe o menu de opções à direita.' },
        { name: 'onMenu', type: '(event) => void', description: 'Callback do menu de opções.' },
        { name: 'actions', type: 'React.ReactNode', description: 'Ações adicionais renderizadas antes de busca e menu.' },
        { name: 'footer', type: 'React.ReactNode', description: 'Conteúdo ancorado ao rodapé, usado para encaixar o TabBar.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TopBar> = {
  title: 'Whatsapp Mobile/Componentes/TopBar',
  component: TopBar,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título exibido na barra.' },
    subtitle: { control: 'text', description: 'Legenda opcional abaixo do título.' },
    variant: { control: 'radio', options: ['home', 'page'], description: 'Variante visual da barra.' },
    showBack: { control: 'boolean', description: 'Exibe a seta de voltar.' },
    showSearch: { control: 'boolean', description: 'Exibe a ação de busca.' },
    showMenu: { control: 'boolean', description: 'Exibe o menu de opções.' },
  },
  args: {
    title: 'WhatsApp',
    subtitle: '',
    variant: 'home',
    showBack: false,
    showSearch: true,
    showMenu: true,
  },
};

export default meta;

type Story = StoryObj<typeof TopBar>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TopBarDocumentationPage />,
};

/**
 * Playground com 100% das props do TopBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TopBar',
  render: (args) => (
    <WaDocStage surface="canvas" padding={20}>
      <div style={{ width: 411 }}>
        <TopBar {...args} />
      </div>
    </WaDocStage>
  ),
};

/**
 * Réplica da barra de 100px do frame "Chats Main Page".
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
 * Matriz completa das duas variantes.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="canvas" direction="column" align="stretch" gap={18} padding={20}>
      <div style={{ width: 411 }}>
        <TopBar title="WhatsApp" />
      </div>
      <div style={{ width: 411 }}>
        <TopBar variant="page" title="Starred messages" showSearch={false} showMenu={false} />
      </div>
    </WaDocStage>
  ),
};

/**
 * Uso componível: TopBar hospedando o TabBar em seu rodapé.
 */
export const ComposicaoModular: Story = {
  name: 'ComposicaoModular',
  render: () => (
    <WaDocStage surface="canvas" direction="column" align="stretch" gap={18} padding={20}>
      {(['chats', 'status', 'calls'] as const).map((activeId) => (
        <div key={activeId} style={{ width: 411 }}>
          <TopBar
            title="WhatsApp"
            footer={
              <TabBar
                items={waTabs}
                activeId={activeId}
                tone={activeId === 'status' ? 'accentStatus' : 'accent'}
              />
            }
          />
        </div>
      ))}
    </WaDocStage>
  ),
};
