import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { MainNav } from '../../../src/unoojornal/components/MainNav';
import type { UjnMainNavItem } from '../../../src/unoojornal/components/MainNav';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocGrid,
  UjnDocCard,
  UjnDocSpecs,
  UjnDocDecisions,
  UjnDocAnatomy,
  UjnDocStage,
  UjnDocPractices,
  UjnDocThemeSwitcher,
  UjnDocPropsTable,
} from '../../../.storybook/components';

const BAR = '#716C98';

/** As cinco seções do jornal, sem endereço: a navegação é por estado. */
const SECOES: UjnMainNavItem[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'ultimas', label: 'Últimas' },
  { id: 'opiniao', label: 'Opinião' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'galeria', label: 'Galeria' },
];

/** As mesmas seções com glifo e endereço. */
const SECOES_COM_GLIFO: UjnMainNavItem[] = [
  { id: 'inicio', label: 'Início', href: '#inicio', icon: 'home' },
  { id: 'ultimas', label: 'Últimas', href: '#ultimas', icon: 'latest' },
  { id: 'opiniao', label: 'Opinião', href: '#opiniao', icon: 'opinion' },
  { id: 'agenda', label: 'Agenda', href: '#agenda', icon: 'agenda' },
  { id: 'galeria', label: 'Galeria', href: '#galeria', icon: 'gallery' },
];

const LARGURAS = [
  { rotulo: 'Largo (1280px)', largura: 1280 },
  { rotulo: 'Médio (720px)', largura: 720 },
  { rotulo: 'Compacto (390px)', largura: 390 },
] as const;

/**
 * Navegação com estado local: o produto guarda a seção atual.
 */
const NavDemo: React.FC<{
  items?: UjnMainNavItem[];
  inicial?: string;
  theme?: 'light' | 'dark';
  ariaLabel?: string;
  aoNavegar?: (id: string) => void;
}> = ({ items = SECOES, inicial = 'inicio', theme, ariaLabel, aoNavegar }) => {
  const [ativo, setAtivo] = useState(inicial);

  return (
    <MainNav
      theme={theme}
      items={items}
      activeId={ativo}
      ariaLabel={ariaLabel}
      onNavigate={(id) => {
        setAtivo(id);
        aoNavegar?.(id);
      }}
    />
  );
};

/** Impede a navegação nativa dos links de demonstração. */
const SemNavegar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    onClickCapture={(event) => {
      if ((event.target as HTMLElement).closest('a')) event.preventDefault();
    }}
  >
    {children}
  </div>
);

/**
 * Página de documentação rica do componente MainNav.
 */
const MainNavDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Cabeçalho e navegação"
      title="MainNav"
      description="A navegação principal do jornal: a linha de cinco seções (Início, Últimas, Opinião, Agenda e Galeria) sob o cabeçalho, com a seção atual sublinhada. No compacto a linha rola na horizontal."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="Um marco de navegação, cinco seções." />
    <UjnDocGrid>
      <UjnDocCard icon="🧭" title="Marco de navegação">
        Um <code>&lt;nav&gt;</code> com lista e nome acessível (<code>ariaLabel</code>, padrão
        &quot;Seções do jornal&quot;). O item atual recebe <code>aria-current=&quot;page&quot;</code>.
      </UjnDocCard>
      <UjnDocCard icon="🔗" title="Links ou estado">
        Itens com <code>href</code> são links; sem <code>href</code>, botões. <code>onNavigate</code> recebe
        o <code>id</code> em ambos os casos.
      </UjnDocCard>
      <UjnDocCard icon="↔️" title="Rolagem no compacto">
        Abaixo de 640px de contêiner a linha rola na horizontal, com barra fina, e a seção atual é trazida à
        vista.
      </UjnDocCard>
      <UjnDocCard icon="🎯" title="Compõe o NavLink">
        Cada item é um <code>NavLink</code>: o sublinhado, o foco e o alvo de 44px vêm dele.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura herdada da linha de navegação de `homepage-default` (`3:7`) e dos estados `5:9`."
    />
    <UjnDocSpecs
      component="MainNav"
      layout="Lista horizontal centrada · altura de 44px · fio inferior de 1px"
      specs={[
        { label: 'Superfície', value: '--ujn-color-background-page' },
        { label: 'Fio inferior', value: '--ujn-elevation-hairline-bottom' },
        { label: 'Altura do item', value: '--ujn-nav-height (44px)' },
        { label: 'Folga entre itens', value: '--ujn-spacing-xxl (24px); compacto --ujn-spacing-xxs' },
        { label: 'Recuo lateral', value: '--ujn-gutter (16px) · --ujn-gutter-wide (80px) ≥ 960px' },
        { label: 'Quebras', value: '@container: largo ≥ 960px · médio ≥ 640px · compacto abaixo' },
        { label: 'Fronteira', value: "'use client' (repassa onNavigate aos filhos)" },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Rolagem horizontal em vez de menu',
          detail:
            'as cinco seções cabem em 390px só com recuo curto; em vez de esconder a navegação num menu, a linha rola e traz a seção atual à vista. A barra é fina (scrollbar-width: thin), sem setas do Windows.',
        },
        {
          subject: 'onNavigate não impede a navegação',
          detail:
            'o callback apenas avisa; um item com href navega normalmente, e o produto que quiser interceptar chama preventDefault no próprio link ou usa itens sem href.',
        },
        {
          subject: 'Sem foco móvel',
          detail:
            'é uma lista de links, não um grupo de seleção: cada item entra no Tab. As setas ←/→ pertencem à FilterBar, que é escolha única.',
        },
        {
          subject: 'Sublinhado por cima do fio',
          detail:
            'o fio inferior da barra é uma sombra de 1px e o sublinhado do item é uma borda de 2px; os dois se sobrepõem na base sem token novo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Marco, lista e itens." />
    <UjnDocStage surface="page" align="stretch" direction="column" padding={16}>
      <SemNavegar>
        <NavDemo items={SECOES_COM_GLIFO} />
      </SemNavegar>
      <UjnDocAnatomy
        zones={[
          { name: 'Marco <nav>', role: 'Nomeado por ariaLabel; contém a lista.', token: 'aria-label' },
          { name: 'Lista', role: 'Linha de itens; rola na horizontal no compacto.', token: '--ujn-spacing-xxl' },
          { name: 'Item (NavLink)', role: 'Link ou botão com sublinhado de 2px no ativo.', token: '--ujn-color-action-primary' },
          { name: 'Fio inferior', role: 'Separa a navegação do conteúdo.', token: '--ujn-elevation-hairline-bottom' },
        ]}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real em cada largura, com e sem glifo."
    />
    {LARGURAS.map(({ rotulo, largura }) => (
      <UjnDocStage key={rotulo} label={rotulo} surface="page" align="flex-start" padding={16}>
        <div style={{ width: largura, maxWidth: '100%' }}>
          <NavDemo inicial="opiniao" />
        </div>
      </UjnDocStage>
    ))}
    <UjnDocStage label="Com glifo e endereço" surface="page" align="flex-start" padding={16}>
      <div style={{ width: 720, maxWidth: '100%' }}>
        <SemNavegar>
          <NavDemo items={SECOES_COM_GLIFO} inicial="galeria" />
        </SemNavegar>
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Navegação previsível." />
    <UjnDocPractices
      dos={[
        'Manter as cinco seções fixas e na mesma ordem em todas as páginas.',
        'Passar activeId sempre: sem ele nenhum item é anunciado como página atual.',
        'Dar um ariaLabel próprio quando houver mais de uma navegação na página (ex.: a do rodapé).',
        'Usar href nos itens quando as seções têm endereço próprio.',
      ]}
      donts={[
        'Encher a linha de seções: a rolagem horizontal é um recurso do compacto, não um menu longo.',
        'Pôr ações (buscar, trocar tema) dentro da MainNav: elas são da barra de ações.',
        'Marcar vários itens como ativos.',
        'Usar a MainNav para escolher filtros da lista: isso é da FilterBar.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Sublinhado, fio e realces acompanham o tema." />
    <UjnDocThemeSwitcher surface="page" padding={16}>
      {(tema) => (
        <div style={{ width: '100%' }}>
          <NavDemo theme={tema} />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público da MainNav. Os demais atributos vão ao <nav>."
    />
    <UjnDocPropsTable
      title="MainNav"
      rows={[
        { name: 'items', type: 'UjnMainNavItem[]', description: 'Seções, na ordem de exibição. Obrigatório.' },
        { name: 'activeId', type: 'string', description: 'id do item da página atual (aria-current). Obrigatório.' },
        { name: 'onNavigate', type: '(id: string) => void', description: 'Chamado com o id do item acionado.' },
        { name: 'ariaLabel', type: 'string', default: "'Seções do jornal'", description: 'Nome acessível do marco.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UjnDocPropsTable
      title="UjnMainNavItem"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador estável do item.' },
        { name: 'label', type: 'string', description: 'Rótulo do item.' },
        { name: 'href', type: 'string', description: 'Endereço. Sem ele, o item é um botão.' },
        { name: 'icon', type: 'UjnIconName', description: 'Glifo antes do rótulo.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MainNav> = {
  title: 'Unoojornal/Componentes/MainNav',
  component: MainNav,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Seções (id, label, href, icon).' },
    activeId: { control: 'select', options: SECOES.map((secao) => secao.id), description: 'Seção atual.' },
    onNavigate: { action: 'onNavigate', description: 'Chamado com o id do item acionado.' },
    ariaLabel: { control: 'text', description: 'Nome acessível do marco.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    items: SECOES,
    activeId: 'inicio',
    ariaLabel: 'Seções do jornal',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof MainNav>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MainNavDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da MainNav',
  render: (args) => (
    <div data-ujn-theme={args.theme} style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <SemNavegar>
        <MainNav {...args} />
      </SemNavegar>
    </div>
  ),
};

/**
 * Composição fiel à linha de navegação do cabeçalho: cinco seções, a atual
 * sublinhada.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: navegação do cabeçalho',
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)' }}>
      <NavDemo />
    </div>
  ),
};

/**
 * As três larguras de contêiner.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      {LARGURAS.map(({ rotulo, largura }) => (
        <div key={rotulo} style={{ width: largura, maxWidth: '100%' }}>
          <p style={{ margin: '0 0 4px', fontFamily: 'var(--ujn-font-sans)', fontSize: 12, color: 'var(--ujn-color-text-secondary)' }}>
            {rotulo}
          </p>
          <NavDemo inicial="agenda" />
        </div>
      ))}
    </div>
  ),
};

/**
 * Sem glifo e com glifo e endereço.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <NavDemo />
      <SemNavegar>
        <NavDemo items={SECOES_COM_GLIFO} />
      </SemNavegar>
    </div>
  ),
};

/**
 * Uma seção ativa por vez, da primeira à última.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      {SECOES.map((secao) => (
        <MainNav key={secao.id} items={SECOES} activeId={secao.id} />
      ))}
    </div>
  ),
};

/**
 * A navegação nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} data-ujn-theme={tema} style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
          <NavDemo theme={tema} inicial="ultimas" />
        </div>
      ))}
    </div>
  ),
};

const aoNavegar = fn();

/**
 * Marca a seção atual por aria-current e a troca ao acionar outro item.
 */
export const NavegarEntreSecoes: Story = {
  name: 'Seção atual e navegação',
  render: () => <NavDemo aoNavegar={aoNavegar} />,
  play: async ({ canvasElement }) => {
    aoNavegar.mockClear();
    const tela = within(canvasElement);
    const nav = tela.getByRole('navigation', { name: 'Seções do jornal' });

    await expect(within(nav).getByRole('button', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
    await expect(within(nav).getAllByRole('button').filter((botao) => botao.hasAttribute('aria-current'))).toHaveLength(1);

    await userEvent.click(within(nav).getByRole('button', { name: 'Opinião' }));
    await expect(aoNavegar).toHaveBeenLastCalledWith('opiniao');
    await expect(within(nav).getByRole('button', { name: 'Opinião' })).toHaveAttribute('aria-current', 'page');
    await expect(within(nav).getByRole('button', { name: 'Início' })).not.toHaveAttribute('aria-current');

    // Teclado: Tab chega ao item e Enter o aciona.
    within(nav).getByRole('button', { name: 'Galeria' }).focus();
    await userEvent.keyboard('{Enter}');
    await expect(aoNavegar).toHaveBeenLastCalledWith('galeria');
    await expect(within(nav).getByRole('button', { name: 'Galeria' })).toHaveAttribute('aria-current', 'page');
  },
};
