import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TabBar, instaDefaultTabs } from '../../../src/instanooria/components/TabBar';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaAvatars } from '../fixtures';

/**
 * Abas de demonstração com o avatar do usuário na quinta posição.
 */
const DEMO_TABS = instaDefaultTabs.map((tab) =>
  tab.id === 'profile' ? { ...tab, avatarSrc: instaAvatars.jacob_w } : tab
);

/**
 * Página de documentação rica do componente TabBar.
 */
const TabBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Navegação"
      title="TabBar"
      description="Barra de navegação inferior de 79px com cinco abas de 75px de largura. A aba ativa alterna para o glifo preenchido correspondente e a aba de perfil renderiza o avatar do usuário com anel neutro, exatamente como nos frames do arquivo de design."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Cinco destinos fixos, sem rótulos textuais."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🏠" title="Cinco destinos">
        Feed, Buscar, Criar, Atividade e Perfil. O conjunto é fixo em todas as telas de nível
        superior do produto.
      </InstaDocCard>
      <InstaDocCard icon="🔳" title="Estado ativo por preenchimento">
        Não há cor de destaque: a aba ativa troca o glifo vazado pelo preenchido (
        <code>search → searchFilled</code>, <code>heart → heartFilled</code>).
      </InstaDocCard>
      <InstaDocCard icon="👤" title="Aba de perfil especial">
        A quinta aba renderiza o avatar de 23px em vez de um glifo, ganhando anel neutro quando
        ativa.
      </InstaDocCard>
      <InstaDocCard icon="♿" title="Sem rótulo visível, com rótulo acessível">
        Cada aba declara <code>role=&quot;tab&quot;</code>, <code>aria-selected</code> e um{' '}
        <code>aria-label</code> textual, mantendo a navegação utilizável por leitor de tela.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do frame Tab Bar do arquivo."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1724"
      frameName="Instagram Main → Tab Bar"
      specs={[
        { label: 'Altura total', value: '79px' },
        { label: 'Faixa de conteúdo', value: '50px' },
        { label: 'Home indicator', value: '29px' },
        { label: 'Largura por aba', value: '75px' },
        { label: 'Glifos', value: '≈ 23–24px' },
        { label: 'Avatar da aba 5', value: '23px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Cinco botões de largura idêntica sobre a superfície secondary, com traço no topo."
    />
    <InstaDocStage label="Barra completa (375px)" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <TabBar items={DEMO_TABS} activeId="feed" />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Estados"
      description="Cada aba em estado ativo, exibindo a troca para o glifo preenchido."
    />
    {DEMO_TABS.map((tab) => (
      <InstaDocStage key={tab.id} label={`Ativa: ${tab.label}`} align="flex-start" padding={0}>
        <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
          <TabBar items={DEMO_TABS} activeId={tab.id} withHomeIndicatorInset={false} />
        </div>
      </InstaDocStage>
    ))}

    <InstaDocStage label="Com indicador de novidade" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <TabBar
          items={DEMO_TABS.map((tab) =>
            tab.id === 'activity' ? { ...tab, hasNotification: true } : tab
          )}
          activeId="feed"
          withHomeIndicatorInset={false}
        />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de navegação verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Manter exatamente cinco abas — o layout de 75px depende disso.',
        'Sempre informar activeId: sem ele nenhuma aba aparece selecionada.',
        'Passar avatarSrc na aba de perfil para reforçar a identidade do usuário.',
        'Usar hasNotification apenas para conteúdo realmente novo desde a última visita.',
      ]}
      donts={[
        'Adicionar rótulos textuais abaixo dos glifos.',
        'Colorir a aba ativa em azul: o arquivo diferencia apenas por preenchimento.',
        'Esconder a barra em telas de nível superior.',
        'Usar mais de um indicador de novidade simultaneamente.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A superfície e os glifos invertem juntos, preservando o contraste do estado ativo."
    />
    <InstaDocThemeSwitcher padding={0}>
      {(activeTheme) => (
        <div style={{ width: 375 }}>
          <TabBar items={DEMO_TABS} activeId="feed" theme={activeTheme} />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente TabBar."
    />
    <InstaDocPropsTable
      title="TabBar"
      rows={[
        {
          name: 'items',
          type: 'InstaTabItem[]',
          default: 'instaDefaultTabs',
          description: 'Abas exibidas. O padrão reproduz as cinco abas do arquivo de design.',
        },
        { name: 'activeId', type: 'string', description: 'Identificador da aba ativa.' },
        {
          name: 'onChange',
          type: '(id: string, item: InstaTabItem, index: number) => void',
          description: 'Callback disparado ao selecionar uma aba.',
        },
        {
          name: 'withHomeIndicatorInset',
          type: 'boolean',
          default: 'true',
          description: 'Reserva os 29px inferiores do home indicator.',
        },
        {
          name: 'ariaLabel',
          type: 'string',
          default: "'Navegação principal'",
          description: 'Rótulo acessível da barra.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
      ]}
    />

    <InstaDocPropsTable
      title="InstaTabItem"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único da aba.' },
        { name: 'label', type: 'string', description: 'Rótulo acessível, não exibido visualmente.' },
        { name: 'icon', type: 'InstaIconName', description: 'Glifo do estado inativo.' },
        {
          name: 'activeIcon',
          type: 'InstaIconName',
          description: 'Glifo do estado ativo; reutiliza icon quando ausente.',
        },
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar, usada pela aba de perfil.' },
        {
          name: 'hasNotification',
          type: 'boolean',
          default: 'false',
          description: 'Exibe o ponto vermelho de novidades sobre o glifo.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TabBar> = {
  title: 'Instanooria/Componentes/TabBar',
  component: TabBar,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Abas exibidas na barra.' },
    activeId: {
      control: 'select',
      options: instaDefaultTabs.map((tab) => tab.id),
      description: 'Identificador da aba ativa.',
    },
    withHomeIndicatorInset: {
      control: 'boolean',
      description: 'Reserva os 29px do home indicator.',
    },
    ariaLabel: { control: 'text', description: 'Rótulo acessível da barra.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    items: DEMO_TABS,
    activeId: 'feed',
    withHomeIndicatorInset: true,
    ariaLabel: 'Navegação principal',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof TabBar>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TabBarDocumentationPage />,
};

/**
 * Playground com todas as propriedades da TabBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da TabBar',
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}
    >
      <TabBar {...args} />
    </div>
  ),
};

/**
 * Navegação interativa entre as cinco abas.
 */
export const Interativa: Story = {
  name: '🎨 Exemplo Oficial do Figma (interativo)',
  render: () => {
    const InteractiveTabBar = () => {
      const [active, setActive] = useState('feed');

      return (
        <div style={{ width: 375 }}>
          <div
            style={{
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FAFAFA',
              border: '1px solid #E4E8E9',
              borderBottom: 'none',
              borderRadius: '12px 12px 0 0',
              fontSize: 14,
              color: '#475157',
            }}
          >
            Aba ativa: <strong style={{ marginLeft: 6 }}>{active}</strong>
          </div>
          <div style={{ border: '1px solid #E4E8E9', borderTop: 'none', borderRadius: '0 0 12px 12px', overflow: 'hidden' }}>
            <TabBar items={DEMO_TABS} activeId={active} onChange={(id) => setActive(id)} />
          </div>
        </div>
      );
    };

    return <InteractiveTabBar />;
  },
};

/**
 * Matriz de estados: cada aba em foco.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, width: 375 }}>
      {DEMO_TABS.map((tab) => (
        <TabBar
          key={tab.id}
          items={DEMO_TABS}
          activeId={tab.id}
          withHomeIndicatorInset={false}
        />
      ))}
    </div>
  ),
};
