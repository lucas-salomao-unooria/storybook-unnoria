import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TabBar, unvDefaultTabs } from '../../../src/unoovista/components/TabBar';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import { unvAvatars } from '../fixtures';

const BAR = '#716C98';

/**
 * Abas de demonstração, com o avatar da pessoa na aba de perfil.
 */
const DEMO_TABS = unvDefaultTabs.map((tab) =>
  tab.id === 'profile' ? { ...tab, avatarSrc: unvAvatars.lucasMar } : tab
);

/**
 * Dock com estado local de aba ativa.
 */
const InteractiveTabBar: React.FC<{ withNotice?: boolean }> = ({ withNotice = true }) => {
  const [activeId, setActiveId] = useState('feed');
  const items = DEMO_TABS.map((tab) =>
    tab.id === 'activity' && withNotice ? { ...tab, hasNotification: true } : tab
  );

  return <TabBar items={items} activeId={activeId} onChange={setActiveId} />;
};

/**
 * Página de documentação rica do componente TabBar.
 */
const TabBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Navegação"
      title="TabBar"
      description="Doca de navegação flutuante em cápsula, afastada das bordas da tela. A aba ativa vira uma cápsula roxa com o glifo preenchido e o rótulo visível; as inativas mostram só o glifo, e o nome acessível está sempre presente."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Cinco destinos em uma doca que flutua sobre o conteúdo."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🏠" title="Cinco destinos">
        Feed, Buscar, Criar, Atividade e Perfil. O conjunto padrão vem de{' '}
        <code>unvDefaultTabs</code>; a prop <code>items</code> aceita outro.
      </UnvDocCard>
      <UnvDocCard icon="💊" title="Estado ativo em cápsula">
        A aba selecionada ganha fundo <code>action-primary</code>, glifo preenchido e o rótulo ao
        lado. Cor, forma e texto dizem a mesma coisa.
      </UnvDocCard>
      <UnvDocCard icon="👤" title="Aba de perfil">
        Com <code>avatarSrc</code>, a aba mostra o avatar de 24px no lugar do glifo; ativa, ele
        entra na cápsula junto do rótulo.
      </UnvDocCard>
      <UnvDocCard icon="♿" title="Nome acessível sempre">
        Cada aba é um <code>tab</code> com <code>aria-label</code>. As setas, Home e End movem a
        seleção, e só a aba ativa entra na sequência de Tab.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="TabBar"
      layout="Doca · 56px + margem de 16px"
      specs={[
        { label: 'Altura da doca', value: '56px (44px de aba + 6px de recuo)' },
        { label: 'Margem', value: '16px nas laterais e na base' },
        { label: 'Forma', value: 'Cápsula (--unv-radius-full)' },
        { label: 'Superfície', value: '--unv-color-background-elevated' },
        { label: 'Elevação', value: '--unv-elevation-overlay' },
        { label: 'Alvo da aba', value: '44px de altura, largura mínima de 44px' },
        { label: 'Rótulo', value: 'title-sm · Open Sans 600 · 14/20px' },
        { label: 'Recuo do indicador de início', value: '18px, completando 34px' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Doca flutuante em vez de barra colada',
          detail:
            'a navegação flutua a 16px das bordas, sobre a elevação de sobreposição, e não tem fio superior. O conteúdo rola por trás; a doca se separa dele pela superfície elevada.',
        },
        {
          subject: 'Só a aba ativa mostra rótulo',
          detail:
            'a cápsula ativa lê o destino atual sem ocupar espaço nas outras quatro. O nome acessível das inativas continua no aria-label.',
        },
        {
          subject: 'Cores de ação, não neutras',
          detail:
            'a aba ativa usa --unv-color-action-primary com --unv-color-text-on-action; as inativas, --unv-color-icon-secondary sobre a superfície elevada (3:1 ou mais nos dois temas).',
        },
        {
          subject: 'shortLabel (extensão aditiva)',
          detail:
            'campo opcional do item para o texto visível da cápsula ("Criar", para o nome acessível "Criar publicação"). Sem ele, a cápsula mostra label.',
        },
        {
          subject: 'Teclado e novidades',
          detail:
            'a doca segue o padrão de abas (setas, Home, End e tabindex móvel). O ponto de novidades é anunciado por aria-describedby, sem alterar o nome da aba.',
        },
        {
          subject: 'Moldura que não bloqueia toque',
          detail:
            'a moldura da doca ocupa a largura toda, mas com pointer-events desligado; só a cápsula recebe o ponteiro.',
        },
        {
          subject: 'Tema herdado',
          detail: 'theme deixou de ter padrão "light": sem a prop, herda data-unv-theme do contêiner.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UnvDocAnatomy
      zones={[
        { name: 'Moldura (nav)', role: 'Margem de 16px; transparente ao ponteiro.', token: '--unv-spacing-l' },
        { name: 'Doca (tablist)', role: 'Cápsula elevada que reúne as abas.', token: '--unv-color-background-elevated · --unv-elevation-overlay' },
        { name: 'Aba inativa', role: 'Alvo de 44px só com o glifo.', token: '--unv-color-icon-secondary' },
        { name: 'Aba ativa', role: 'Cápsula com glifo preenchido e rótulo.', token: '--unv-color-action-primary · --unv-color-text-on-action' },
        { name: 'Ponto de novidades', role: 'Selo no canto do glifo.', token: '--unv-color-brand-notification' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada aba ativa, com e sem novidades, nos dois temas."
    />
    {DEMO_TABS.map((tab) => (
      <UnvDocStage
        key={tab.id}
        label={`Ativa: ${tab.label}`}
        surface="secondary"
        align="stretch"
        padding={0}
        width={375}
      >
        <TabBar items={DEMO_TABS} activeId={tab.id} withHomeIndicatorInset={false} />
      </UnvDocStage>
    ))}
    <UnvDocStage label="Com novidades em Atividade" surface="secondary" align="stretch" padding={0} width={375}>
      <TabBar
        items={DEMO_TABS.map((tab) => (tab.id === 'activity' ? { ...tab, hasNotification: true } : tab))}
        activeId="feed"
        withHomeIndicatorInset={false}
      />
    </UnvDocStage>
    <UnvDocStage label="Tema escuro" theme="dark" surface="secondary" align="stretch" padding={0} width={375}>
      <TabBar
        items={DEMO_TABS.map((tab) => (tab.id === 'activity' ? { ...tab, hasNotification: true } : tab))}
        activeId="search"
        withHomeIndicatorInset={false}
      />
    </UnvDocStage>
    <UnvDocStage label="Demonstração interativa" surface="secondary" align="stretch" padding={0} width={375}>
      <InteractiveTabBar />
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Manter de três a cinco abas: a cápsula ativa precisa de espaço.',
        'Sempre informar activeId; sem ele nenhuma aba aparece selecionada.',
        'Usar shortLabel quando o nome acessível for longo.',
        'Reservar o recuo do indicador de início (withHomeIndicatorInset) em telas de aparelho.',
      ]}
      donts={[
        'Adicionar rótulo visível nas abas inativas: o rótulo é da ativa.',
        'Colar a doca à borda: a margem de 16px é parte do desenho.',
        'Indicar a aba ativa só pela cor do glifo.',
        'Esconder o nome acessível de uma aba só de glifo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A doca e a cápsula ativa trocam de degrau; o texto sobre a ação mantém 4,5:1."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={0}>
      {() => (
        <div style={{ width: 375 }}>
          <InteractiveTabBar />
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UnvDocPropsTable
      title="TabBar"
      rows={[
        { name: 'items', type: 'UnvTabItem[]', default: 'unvDefaultTabs', description: 'Abas exibidas na doca.' },
        { name: 'activeId', type: 'string', description: 'Identificador da aba ativa.' },
        { name: 'onChange', type: '(id, item, index) => void', description: 'Chamado ao selecionar uma aba, por clique ou teclado.' },
        { name: 'withHomeIndicatorInset', type: 'boolean', default: 'true', description: 'Reserva a área do indicador de início abaixo da doca.' },
        { name: 'ariaLabel', type: 'string', default: "'Navegação principal'", description: 'Nome acessível da navegação.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UnvDocPropsTable
      title="UnvTabItem"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único da aba.' },
        { name: 'label', type: 'string', description: 'Nome acessível da aba.' },
        { name: 'shortLabel', type: 'string', description: 'Texto curto da cápsula ativa; padrão é label.' },
        { name: 'icon', type: 'UnvIconName', description: 'Glifo do estado inativo.' },
        { name: 'activeIcon', type: 'UnvIconName', description: 'Glifo do estado ativo; padrão é icon, preenchido.' },
        { name: 'avatarSrc', type: 'string', description: 'Avatar no lugar do glifo (aba de perfil).' },
        { name: 'hasNotification', type: 'boolean', description: 'Ponto de novidades sobre o glifo.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TabBar> = {
  title: 'Unoovista/Componentes/TabBar',
  component: TabBar,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Abas exibidas na doca.' },
    activeId: {
      control: 'select',
      options: ['feed', 'search', 'create', 'activity', 'profile'],
      description: 'Aba ativa.',
    },
    onChange: { action: 'onChange', description: 'Chamado ao selecionar uma aba.' },
    withHomeIndicatorInset: { control: 'boolean', description: 'Reserva a área do indicador de início.' },
    ariaLabel: { control: 'text', description: 'Nome acessível da navegação.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    items: DEMO_TABS,
    activeId: 'feed',
    withHomeIndicatorInset: true,
    ariaLabel: 'Navegação principal',
  },
};

export default meta;

type Story = StoryObj<typeof TabBar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TabBarDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da TabBar',
  render: (args) => (
    <UnvDocStage surface="secondary" align="stretch" padding={0} width={375}>
      <TabBar {...args} />
    </UnvDocStage>
  ),
};

/**
 * Doca interativa: selecione uma aba, com o mouse ou com as setas do teclado.
 */
export const Interativa: Story = {
  name: '🎨 Doca Interativa',
  render: () => (
    <UnvDocStage surface="secondary" align="stretch" padding={0} width={375}>
      <InteractiveTabBar />
    </UnvDocStage>
  ),
};

/**
 * Cada aba em estado ativo, nos dois temas.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, width: 375 }}>
      {(['light', 'dark'] as const).flatMap((theme) =>
        DEMO_TABS.map((tab) => (
          <UnvDocStage
            key={`${theme}-${tab.id}`}
            label={`${theme} · ativa: ${tab.label}`}
            theme={theme}
            surface="secondary"
            align="stretch"
            padding={0}
          >
            <TabBar items={DEMO_TABS} activeId={tab.id} withHomeIndicatorInset={false} />
          </UnvDocStage>
        ))
      )}
    </div>
  ),
};

/**
 * Estados: com novidades, sem aba ativa e com recuo do indicador de início.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, width: 375 }}>
      <UnvDocStage label="Com novidades" surface="secondary" align="stretch" padding={0}>
        <TabBar
          items={DEMO_TABS.map((tab) => (tab.id === 'activity' ? { ...tab, hasNotification: true } : tab))}
          activeId="feed"
          withHomeIndicatorInset={false}
        />
      </UnvDocStage>
      <UnvDocStage label="Sem aba ativa" surface="secondary" align="stretch" padding={0}>
        <TabBar items={DEMO_TABS} withHomeIndicatorInset={false} />
      </UnvDocStage>
      <UnvDocStage label="Com recuo do indicador de início" surface="secondary" align="stretch" padding={0}>
        <TabBar items={DEMO_TABS} activeId="profile" />
      </UnvDocStage>
    </div>
  ),
};
