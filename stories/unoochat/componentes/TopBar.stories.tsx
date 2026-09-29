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
import { TopBar, TabBar } from '../../../src/unoochat';
import { uncTabs } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente TopBar.
 */
const TopBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Navegação"
      title="TopBar"
      description="Barra superior do produto em duas variantes: a faixa inicial de 69px com a marca Unoochat, busca e menu de opções; e a faixa de página de 57px com seta de voltar, título e legenda opcional. O rodapé aceita o TabBar, compondo a barra de 100px da tela de conversas."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🏠" title="Variante home">
        Marca &quot;Unoochat&quot; em Open Sans 600 e 20px, na cor de acento{' '}
        <code>--unc-color-accent</code>, calha de 24px e as ações de busca e menu (glifos de 24px)
        à direita.
      </UncDocCard>
      <UncDocCard icon="📄" title="Variante page">
        Faixa de 57px com seta de voltar e título em <code>--unc-color-text-primary</code>. É a barra
        de Ajustes, Mensagens favoritadas, Novo grupo e Selecionar contato.
      </UncDocCard>
      <UncDocCard icon="🧩" title="Rodapé componível">
        A prop <code>footer</code> encaixa o <code>TabBar</code> dentro da mesma superfície,
        somando os 100px da barra sem duplicar o preenchimento.
      </UncDocCard>
      <UncDocCard icon="🏷️" title="Legenda de contexto">
        Telas como Novo grupo e Selecionar contato exibem uma segunda linha (&quot;Adicionar
        participantes&quot;, &quot;626 contatos&quot;), coberta pela prop <code>subtitle</code>.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="TopBar"
      layout="Barra · 69px + abas"
      specs={[
        { label: 'Altura (home + abas)', value: '100 px' },
        { label: 'Altura (faixa de título)', value: '69 px' },
        { label: 'Altura (page)', value: '57 px' },
        { label: 'Superfície', value: '--unc-color-surface-appbar' },
        { label: 'Marca', value: 'Open Sans 600 · 20px · --unc-color-accent' },
        { label: 'Título de página', value: 'Open Sans 600 · 20px · --unc-color-text-primary' },
        { label: 'Ações', value: 'search 24px · overflow 24px @90°' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Marca no acento',
          detail:
            'na variante home a marca usa --unc-color-accent (#716C98 no claro, #AAA5C2 no escuro), e o título de página usa --unc-color-text-primary. A cor separa a identidade do produto do título de uma tela.',
        },
        {
          subject: 'Legenda em valor único',
          detail:
            'a legenda da variante page usa Open Sans 700 em 12px na cor --unc-color-text-secondary, um só degrau para todas as telas.',
        },
        {
          subject: 'Menu vertical por rotação',
          detail:
            'o glifo do menu é o overflow (more_horiz do Material Symbols Rounded) girado 90°, o que produz o menu vertical sem outro glifo no registro.',
        },
        {
          subject: 'Alvos de toque',
          detail:
            'busca e menu ocupam botões de 32×32px, e a seta de voltar, 38×36px, todos com foco visível de 2px no acento.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Superfície', role: 'Faixa de fundo comum às duas variantes.', token: '--unc-color-surface-appbar' },
        { name: 'Seta de voltar', role: 'Opcional na home, padrão na variante page.', token: '--unc-color-icon-muted' },
        { name: 'Título', role: 'Marca ou nome da página.', token: '--unc-font-title-md-* · --unc-color-accent | --unc-color-text-primary' },
        { name: 'Legenda', role: 'Segunda linha de contexto, opcional.', token: '--unc-color-text-secondary' },
        { name: 'Ações', role: 'Slot livre seguido de busca e menu.', token: '--unc-color-icon-appbar' },
        { name: 'Rodapé', role: 'Encaixe do TabBar dentro da mesma superfície.', token: 'prop footer' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <UncDocStage label="Tema claro" theme="light" surface="canvas" direction="column" align="stretch" gap={18} padding={20}>
      <div style={{ width: 411 }}>
        <TopBar title="Unoochat" />
      </div>
      <div style={{ width: 411 }}>
        <TopBar
          title="Unoochat"
          footer={<TabBar items={uncTabs} activeId="chats" />}
        />
      </div>
      <div style={{ width: 411 }}>
        <TopBar variant="page" title="Ajustes" showSearch={false} showMenu={false} />
      </div>
      <div style={{ width: 411 }}>
        <TopBar variant="page" title="Novo grupo" subtitle="Adicionar participantes" showMenu={false} />
      </div>
      <div style={{ width: 411 }}>
        <TopBar variant="page" title="Selecionar contato" subtitle="626 contatos" />
      </div>
      <div style={{ width: 411 }}>
        <TopBar title="Unoochat" showSearch={false} />
      </div>
    </UncDocStage>
    <UncDocStage label="Tema escuro" theme="dark" surface="canvas" direction="column" align="stretch" gap={18} padding={20}>
      <div style={{ width: 411 }}>
        <TopBar
          title="Unoochat"
          footer={<TabBar items={uncTabs} activeId="chats" />}
        />
      </div>
      <div style={{ width: 411 }}>
        <TopBar variant="page" title="Novo grupo" subtitle="Adicionar participantes" showMenu={false} />
      </div>
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Usar variant="home" apenas na tela inicial com abas.',
        'Encaixar o TabBar por footer, para que ambos compartilhem a mesma superfície.',
        'Ocultar busca e menu quando a página não oferecer essas ações.',
        'Manter o título em uma linha; a legenda existe justamente para o contexto extra.',
      ]}
      donts={[
        'Empilhar duas TopBar na mesma tela.',
        'Renderizar o TabBar fora do footer, criando uma segunda faixa de fundo.',
        'Usar --unc-color-text-primary na variante home: a marca vai no acento.',
        'Adicionar sombra sob a barra: a separação é feita por superfície.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: superfície, marca, glifos e abas seguem os tokens."
    />
    <UncDocThemeSwitcher surface="canvas">
      {() => (
        <div style={{ width: 411 }}>
          <TopBar title="Unoochat" footer={<TabBar items={uncTabs} activeId="chats" />} />
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
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
  title: 'Unoochat/Componentes/TopBar',
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
    title: 'Unoochat',
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
 * Documentação rica e completa do componente.
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
    <UncDocStage surface="canvas" padding={20}>
      <div style={{ width: 411 }}>
        <TopBar {...args} />
      </div>
    </UncDocStage>
  ),
};

/**
 * Barra de 100px da tela de conversas: marca, busca, menu e abas.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo da Tela de Conversas',
  render: () => (
    <UncDocStage surface="canvas" padding={20}>
      <div style={{ width: 411 }}>
        <TopBar title="Unoochat" footer={<TabBar items={uncTabs} activeId="chats" />} />
      </div>
    </UncDocStage>
  ),
};

/**
 * Matriz completa das duas variantes.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UncDocStage surface="canvas" direction="column" align="stretch" gap={18} padding={20}>
      <div style={{ width: 411 }}>
        <TopBar title="Unoochat" />
      </div>
      <div style={{ width: 411 }}>
        <TopBar variant="page" title="Mensagens favoritadas" showSearch={false} showMenu={false} />
      </div>
    </UncDocStage>
  ),
};

/**
 * Uso componível: TopBar hospedando o TabBar em seu rodapé.
 */
export const ComposicaoModular: Story = {
  name: 'ComposicaoModular',
  render: () => (
    <UncDocStage surface="canvas" direction="column" align="stretch" gap={18} padding={20}>
      {(['chats', 'status', 'calls'] as const).map((activeId) => (
        <div key={activeId} style={{ width: 411 }}>
          <TopBar
            title="Unoochat"
            footer={
              <TabBar items={uncTabs} activeId={activeId} />
            }
          />
        </div>
      ))}
    </UncDocStage>
  ),
};
