import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SiteHeader } from '../../../src/unooblog/components/SiteHeader';
import type { UblSiteHeaderItem } from '../../../src/unooblog/components/SiteHeader';
import { Button } from '../../../src/unooblog/components/Button';
import { Logo } from '../../../src/unooblog/components/Logo';
import { ublSite } from '../fixtures';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocStage,
  UblDocPractices,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';

const BAR = '#716C98';

const ITENS: UblSiteHeaderItem[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'topicos', label: 'Tópicos' },
  { id: 'series', label: 'Séries' },
  { id: 'autores', label: 'Autores' },
  { id: 'sobre', label: 'Sobre' },
];

const ITENS_COM_LINK: UblSiteHeaderItem[] = ITENS.map((item) => ({ ...item, href: `#${item.id}` }));

const LARGURAS = [
  { rotulo: 'Largo (1120px)', largura: 1120 },
  { rotulo: 'Médio (720px)', largura: 720 },
  { rotulo: 'Compacto (390px)', largura: 390 },
] as const;

/**
 * Cabeçalho com o estado guardado pela estória, como o produto faria: o item
 * ativo e o modo de cor moram no estado, e o modo troca o `data-ubl-theme` do
 * contêiner.
 */
const HeaderDemo: React.FC<{
  largura?: number;
  inicial?: string;
  modoInicial?: 'light' | 'dark';
  comBusca?: boolean;
  comTema?: boolean;
  comAcoes?: boolean;
  sticky?: boolean;
  itens?: UblSiteHeaderItem[];
  aoNavegar?: (id: string) => void;
  aoBuscar?: () => void;
}> = ({
  largura = 1120,
  inicial = 'inicio',
  modoInicial = 'light',
  comBusca = true,
  comTema = true,
  comAcoes = false,
  sticky = false,
  itens = ITENS,
  aoNavegar,
  aoBuscar,
}) => {
  const [ativo, setAtivo] = useState(inicial);
  const [modo, setModo] = useState<'light' | 'dark'>(modoInicial);

  return (
    <div
      data-ubl-theme={modo}
      style={{
        width: largura,
        maxWidth: '100%',
        minHeight: 360,
        background: 'var(--ubl-color-background-page)',
      }}
    >
      <SiteHeader
        siteName={ublSite.name}
        items={itens}
        activeId={ativo}
        sticky={sticky}
        onNavigate={(id) => {
          setAtivo(id);
          aoNavegar?.(id);
        }}
        onSearch={comBusca ? (aoBuscar ?? (() => undefined)) : undefined}
        themeMode={comTema ? modo : undefined}
        onToggleTheme={comTema ? () => setModo((atual) => (atual === 'light' ? 'dark' : 'light')) : undefined}
        actions={comAcoes ? <Button size="sm">Assinar</Button> : undefined}
      />
    </div>
  );
};

/**
 * Cabeçalho `sticky` dentro de um contêiner de rolagem: o texto corre por baixo
 * da barra translúcida, sem desfoque.
 */
const HeaderPegajoso: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => (
  <div
    data-ubl-theme={theme}
    data-testid="area-de-rolagem"
    style={{
      width: 720,
      maxWidth: '100%',
      height: 320,
      overflowY: 'auto',
      background: 'var(--ubl-color-background-page)',
      border: '1px solid var(--ubl-color-border-subtle)',
      borderRadius: 12,
    }}
  >
    <SiteHeader siteName={ublSite.name} items={ITENS} activeId="inicio" onSearch={() => undefined} />
    <div
      style={{
        padding: 24,
        fontFamily: 'var(--ubl-font-sans)',
        fontSize: 'var(--ubl-font-prose-size)',
        lineHeight: 'var(--ubl-font-prose-line)',
        color: 'var(--ubl-color-text-primary)',
      }}
    >
      {Array.from({ length: 10 }, (_, indice) => (
        <p key={indice} style={{ margin: '0 0 16px' }}>
          Parágrafo {indice + 1}: o cabeçalho fica colado ao topo do contêiner de rolagem, e a cor
          translúcida deixa ver o texto passando por baixo, sem desfoque de fundo.
        </p>
      ))}
    </div>
  </div>
);

/**
 * Página de documentação rica do componente SiteHeader.
 */
const SiteHeaderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Navegação"
      title="SiteHeader"
      description="Cabeçalho do site: marca, navegação principal com o item ativo sublinhado, busca, alternador claro/escuro e ações do produto. Abaixo de 640px de contêiner a navegação vira um botão de menu que abre uma lista sob a barra."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Chegar a qualquer parte do blog a partir de qualquer página."
    />
    <UblDocGrid>
      <UblDocCard icon="🧭" title="Navegação principal">
        Links para Início, Tópicos, Séries e Autores. O item ativo leva{' '}
        <code>aria-current=&quot;page&quot;</code>, sublinhado de 2px e peso maior — o estado não depende só
        da cor.
      </UblDocCard>
      <UblDocCard icon="🌗" title="Alternador de tema">
        Um botão com <code>aria-pressed</code>: <code>themeMode</code> escolhe o glifo (lua no claro, sol
        no escuro) e o produto troca o <code>data-ubl-theme</code>.
      </UblDocCard>
      <UblDocCard icon="📱" title="Menu no compacto">
        Abaixo de 640px de contêiner a lista vira um botão de menu com <code>aria-expanded</code>. Esc
        fecha e devolve o foco ao botão.
      </UblDocCard>
      <UblDocCard icon="📌" title="Cola no topo">
        Com <code>sticky</code> (padrão) a barra acompanha a rolagem; a cor é translúcida, sem desfoque.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Composição própria do blog; cores, fontes e glifos são os da Plataforma Unooria."
    />
    <UblDocSpecs
      component="SiteHeader"
      layout="Linha: marca · navegação · busca, tema e ações · 64px de altura · fio inferior de 1px"
      specs={[
        { label: 'Altura', value: '--ubl-site-header-height (64px)' },
        { label: 'Superfície', value: '--ubl-color-surface-bar (translúcida, sem backdrop-filter)' },
        { label: 'Fio', value: '--ubl-elevation-hairline-bottom (1px em border-subtle)' },
        { label: 'Item ativo', value: 'Sublinhado de 2px em --ubl-color-action-primary · peso bold' },
        { label: 'Alvos', value: 'Links e botões de 44px (--ubl-touch-target)' },
        { label: 'Compacto', value: '@container < 640px: botão de menu + lista sob a barra' },
        { label: 'Camada', value: '--ubl-z-bar quando sticky' },
        { label: 'Fronteira', value: "'use client' (estado do menu e funções repassadas aos botões)" },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Translúcido, sem desfoque',
          detail:
            'a barra usa só a cor translúcida --ubl-color-surface-bar. backdrop-filter pesa em aparelhos de entrada e muda o contraste com o fundo que passa por baixo; a cor a 90% já deixa o texto de baixo apenas insinuado.',
        },
        {
          subject: 'Menu como divulgação (disclosure)',
          detail:
            'no compacto o botão de menu tem aria-expanded e aria-controls apontando para a própria navegação, que abre como lista logo abaixo da barra. Não é um diálogo: não prende o foco, não escurece a página e o resto continua acessível.',
        },
        {
          subject: 'Esc, escolha e saída do foco fecham',
          detail:
            'Esc fecha e devolve o foco ao botão; escolher um item também (o foco volta ao botão, porque o item some); levar o foco para fora do cabeçalho fecha sem roubá-lo.',
        },
        {
          subject: 'Um só <nav> para os dois arranjos',
          detail:
            'a mesma navegação é a barra no largo e a lista no compacto, trocada por CSS de contêiner. Só existe um marco "Navegação principal" na árvore de acessibilidade, e nada é renderizado duas vezes.',
        },
        {
          subject: 'Alternador com o nome fixo',
          detail:
            'o botão se chama "Tema escuro" e comunica o estado por aria-pressed. Trocar o nome junto com o estado leria "ativado" duas vezes. O glifo, esse sim, acompanha o modo: quem vê a lua sabe qual tema vai ativar.',
        },
        {
          subject: 'Botões só quando há função',
          detail:
            'a busca e o alternador só aparecem se o produto passa onSearch e (themeMode + onToggleTheme). Um botão que não faz nada seria pior que nenhum.',
        },
        {
          subject: 'Item sem href é botão',
          detail:
            'um item com href é um <a>; sem href é um <button> que só dispara onNavigate. Em ambos, onNavigate recebe o id e o navegador mantém a navegação nativa do link.',
        },
        {
          subject: 'Sublinhado na base da barra',
          detail:
            'o link ocupa toda a altura de 64px, então o sublinhado de 2px cai na borda inferior da barra, junto do fio, e não flutuando no meio do texto.',
        },
        {
          subject: 'Acréscimos ao contrato',
          detail:
            'homeHref, onHome, navLabel, menuLabel, searchLabel e themeLabel (todos com padrão em pt-BR) foram acrescentados ao contrato; nada foi removido.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Marca, navegação e ferramentas."
    />
    <UblDocStage surface="page" align="stretch" direction="column" padding={0}>
      <HeaderDemo comAcoes />
    </UblDocStage>
    <UblDocAnatomy
      zones={[
        { name: 'Marca', role: 'Logo (ou slot logo); link quando há homeHref ou onHome. O nome acessível é siteName.', token: 'Logo · aria-label' },
        { name: 'Navegação principal', role: '<nav> com lista de links ou botões; o ativo leva aria-current e sublinhado.', token: '--ubl-color-action-primary' },
        { name: 'Busca', role: 'IconButton "Buscar"; só existe com onSearch.', token: 'IconButton ghost' },
        { name: 'Alternador de tema', role: 'IconButton com aria-pressed e glifo darkMode / lightMode.', token: 'IconButton pressed' },
        { name: 'Ações', role: 'Slot do produto (entrar, assinar).', token: 'actions' },
        { name: 'Botão de menu (compacto)', role: 'aria-expanded e aria-controls; abre a lista sob a barra.', token: 'IconButton menu / close' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real em cada largura de contêiner, com e sem ações, e preso ao topo."
    />
    {LARGURAS.map(({ rotulo, largura }) => (
      <UblDocStage key={rotulo} label={rotulo} surface="page" align="flex-start" padding={0}>
        <HeaderDemo largura={largura} comAcoes={largura > 400} />
      </UblDocStage>
    ))}
    <UblDocStage label="Item ativo diferente e itens com link (href)" surface="page" align="stretch" direction="column" padding={0}>
      <HeaderDemo inicial="series" itens={ITENS_COM_LINK} />
    </UblDocStage>
    <UblDocStage label="Sem busca e sem alternador de tema" surface="page" align="stretch" direction="column" padding={0}>
      <HeaderDemo comBusca={false} comTema={false} />
    </UblDocStage>
    <UblDocStage label="Marca própria no slot logo (só o símbolo)" surface="page" align="stretch" direction="column" padding={0}>
      <div style={{ background: 'var(--ubl-color-background-page)' }}>
        <SiteHeader
          siteName={ublSite.name}
          items={ITENS}
          activeId="inicio"
          logo={<Logo variant="mark" height={24} title={ublSite.name} decorative />}
          homeHref="#inicio"
        />
      </div>
    </UblDocStage>
    <UblDocStage label="Preso ao topo (sticky): role o texto" surface="subtle" align="flex-start" padding={24}>
      <HeaderPegajoso />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Uma barra que orienta sem pesar." />
    <UblDocPractices
      dos={[
        'Marcar o item ativo com activeId: é ele que leva aria-current e o sublinhado.',
        'Passar href nos itens quando o produto tem rotas reais, e cancelar a navegação nativa só se houver roteador próprio.',
        'Trocar o data-ubl-theme no contêiner ao receber onToggleTheme e devolver o novo themeMode.',
        'Limitar a navegação a cerca de cinco destinos; o resto vai para o rodapé.',
      ]}
      donts={[
        'Pôr mais de cinco itens: no compacto a lista cresce além da tela.',
        'Usar o slot actions para navegação: ele é para ações (entrar, assinar).',
        'Esperar que o menu do compacto prenda o foco ou escureça a página: ele é uma divulgação, não um diálogo.',
        'Trocar o nome do alternador de tema a cada clique: o estado é o aria-pressed.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Barra, fio, sublinhado e glifo do alternador acompanham o tema."
    />
    <UblDocThemeSwitcher surface="page" padding={0}>
      {(tema) => (
        <div style={{ width: '100%' }}>
          <HeaderDemo key={tema} modoInicial={tema} largura={1120} />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do SiteHeader. Os demais atributos nativos vão ao <header>."
    />
    <UblDocPropsTable
      title="SiteHeader"
      rows={[
        { name: 'siteName', type: 'string', description: 'Nome do site; nome acessível da marca. Obrigatório.' },
        { name: 'items', type: '{ id: string; label: string; href?: string }[]', description: 'Destinos da navegação principal. Obrigatório.' },
        { name: 'activeId', type: 'string', description: 'Item ativo: aria-current="page" e sublinhado de 2px.' },
        { name: 'onNavigate', type: '(id: string) => void', description: 'Chamado com o id do item escolhido.' },
        { name: 'onSearch', type: '() => void', description: 'Chamado pelo botão de busca. Sem ela o botão não aparece.' },
        { name: 'themeMode', type: "'light' | 'dark'", description: 'Modo em uso: escolhe o glifo e o aria-pressed do alternador.' },
        { name: 'onToggleTheme', type: '() => void', description: 'Chamado pelo alternador. Com themeMode, faz o botão aparecer.' },
        { name: 'actions', type: 'ReactNode', description: 'Ações extras do produto, à direita dos botões.' },
        { name: 'sticky', type: 'boolean', default: 'true', description: 'Fixa a barra no topo do contêiner de rolagem.' },
        { name: 'logo', type: 'ReactNode', description: 'Substitui o Logo padrão.' },
        { name: 'homeHref', type: 'string', description: 'Destino do link da marca.' },
        { name: 'onHome', type: '() => void', description: 'Chamado ao acionar a marca.' },
        { name: 'navLabel', type: 'string', default: "'Navegação principal'", description: 'Nome acessível do marco de navegação.' },
        { name: 'menuLabel', type: 'string', default: "'Menu'", description: 'Nome acessível do botão de menu (compacto).' },
        { name: 'searchLabel', type: 'string', default: "'Buscar'", description: 'Nome acessível do botão de busca.' },
        { name: 'themeLabel', type: 'string', default: "'Tema escuro'", description: 'Nome acessível do alternador de tema.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SiteHeader> = {
  title: 'Unooblog/Componentes/SiteHeader',
  component: SiteHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    siteName: { control: 'text', description: 'Nome do site (nome acessível da marca).' },
    items: { control: 'object', description: 'Destinos da navegação principal.' },
    activeId: { control: 'text', description: 'Id do item ativo.' },
    onNavigate: { action: 'onNavigate', description: 'Chamado com o id do item escolhido.' },
    onSearch: { action: 'onSearch', description: 'Chamado pelo botão de busca.' },
    themeMode: { control: 'radio', options: ['light', 'dark'], description: 'Modo de cor em uso (glifo e aria-pressed).' },
    onToggleTheme: { action: 'onToggleTheme', description: 'Chamado pelo alternador de tema.' },
    actions: { control: false, description: 'Ações extras do produto.' },
    sticky: { control: 'boolean', description: 'Fixa a barra no topo do contêiner de rolagem.' },
    logo: { control: false, description: 'Substitui o Logo padrão.' },
    homeHref: { control: 'text', description: 'Destino do link da marca.' },
    onHome: { action: 'onHome', description: 'Chamado ao acionar a marca.' },
    navLabel: { control: 'text', description: 'Nome acessível da navegação.' },
    menuLabel: { control: 'text', description: 'Nome acessível do botão de menu.' },
    searchLabel: { control: 'text', description: 'Nome acessível do botão de busca.' },
    themeLabel: { control: 'text', description: 'Nome acessível do alternador de tema.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    siteName: ublSite.name,
    items: ITENS,
    activeId: 'inicio',
    themeMode: 'light',
    sticky: false,
    navLabel: 'Navegação principal',
    menuLabel: 'Menu',
    searchLabel: 'Buscar',
    themeLabel: 'Tema escuro',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof SiteHeader>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SiteHeaderDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. As funções são registradas
 * em Ações; o tema do contêiner vem do controle `theme`.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SiteHeader',
  render: (args) => (
    <div
      data-ubl-theme={args.theme}
      style={{ background: 'var(--ubl-color-background-page)', minHeight: 360, maxWidth: 1120 }}
    >
      <SiteHeader {...args} />
    </div>
  ),
};

/**
 * Composição do cabeçalho de um post, com busca, alternador de tema e ação.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: cabeçalho do blog',
  render: () => <HeaderDemo comAcoes />,
};

/**
 * As três larguras de contêiner.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {LARGURAS.map(({ rotulo, largura }) => (
        <div key={rotulo}>
          <p style={{ margin: '0 0 4px', fontFamily: 'var(--ubl-font-sans)', fontSize: 12, color: 'var(--ubl-color-text-secondary)' }}>
            {rotulo}
          </p>
          <HeaderDemo largura={largura} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Com e sem busca, alternador e ações; itens como link e como botão.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <HeaderDemo comAcoes />
      <HeaderDemo itens={ITENS_COM_LINK} inicial="autores" />
      <HeaderDemo comBusca={false} comTema={false} />
      <HeaderDemo comBusca={false} />
    </div>
  ),
};

/**
 * Item ativo, alternador pressionado e cabeçalho preso ao topo.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <HeaderDemo inicial="topicos" />
      <HeaderDemo modoInicial="dark" inicial="series" />
      <HeaderPegajoso />
    </div>
  ),
};

/**
 * O cabeçalho nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <HeaderDemo key={tema} modoInicial={tema} comAcoes />
      ))}
    </div>
  ),
};

const aoNavegar = fn();
const aoBuscar = fn();

/**
 * Navegar, buscar e alternar o tema, no largo.
 */
export const NavegarBuscarETema: Story = {
  name: 'Navegar, buscar e alternar o tema',
  render: () => <HeaderDemo aoNavegar={aoNavegar} aoBuscar={aoBuscar} />,
  play: async ({ canvasElement }) => {
    aoNavegar.mockClear();
    aoBuscar.mockClear();
    const tela = within(canvasElement);
    const nav = tela.getByRole('navigation', { name: 'Navegação principal' });

    // O ativo inicial é "Início"; só ele leva aria-current.
    await expect(within(nav).getByRole('button', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
    await expect(within(nav).getByRole('button', { name: 'Tópicos' })).not.toHaveAttribute('aria-current');

    // Navegar: o ativo muda e onNavigate recebe o id.
    await userEvent.click(within(nav).getByRole('button', { name: 'Tópicos' }));
    await expect(aoNavegar).toHaveBeenLastCalledWith('topicos');
    await expect(within(nav).getByRole('button', { name: 'Tópicos' })).toHaveAttribute('aria-current', 'page');
    await expect(within(nav).getByRole('button', { name: 'Início' })).not.toHaveAttribute('aria-current');

    // Teclado: Tab chega aos links e Enter aciona.
    within(nav).getByRole('button', { name: 'Séries' }).focus();
    await userEvent.keyboard('{Enter}');
    await expect(aoNavegar).toHaveBeenLastCalledWith('series');

    // Busca.
    await userEvent.click(tela.getByRole('button', { name: 'Buscar' }));
    await expect(aoBuscar).toHaveBeenCalledTimes(1);

    // Alternador de tema: aria-pressed e data-ubl-theme do contêiner acompanham.
    const tema = tela.getByRole('button', { name: 'Tema escuro' });
    const raizDoTema = canvasElement.querySelector('[data-ubl-theme]') as HTMLElement;
    await expect(tema).toHaveAttribute('aria-pressed', 'false');
    await expect(raizDoTema).toHaveAttribute('data-ubl-theme', 'light');
    await userEvent.click(tema);
    await expect(tema).toHaveAttribute('aria-pressed', 'true');
    await expect(raizDoTema).toHaveAttribute('data-ubl-theme', 'dark');
    await userEvent.click(tema);
    await expect(tema).toHaveAttribute('aria-pressed', 'false');

    // No largo não existe botão de menu à vista.
    await expect(tela.queryByRole('button', { name: 'Menu' })).not.toBeInTheDocument();
  },
};

/**
 * No compacto a navegação vira um menu: abre, escolhe e fecha; Esc devolve o foco.
 */
export const MenuNoCompacto: Story = {
  name: 'Menu no compacto: abrir, Esc e escolher',
  render: () => <HeaderDemo largura={390} aoNavegar={aoNavegar} />,
  play: async ({ canvasElement }) => {
    aoNavegar.mockClear();
    const tela = within(canvasElement);
    const menu = tela.getByRole('button', { name: 'Menu' });
    const nav = canvasElement.querySelector('nav') as HTMLElement;

    // Fechado: a lista não aparece e o botão avisa.
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toHaveAttribute('aria-controls', nav.id);
    await expect(nav).not.toBeVisible();

    // Abre: a lista aparece, com os cinco destinos.
    await userEvent.click(menu);
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(nav).toBeVisible();
    await expect(within(nav).getAllByRole('button')).toHaveLength(5);

    // Esc fecha e devolve o foco ao botão.
    within(nav).getByRole('button', { name: 'Séries' }).focus();
    await userEvent.keyboard('{Escape}');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(nav).not.toBeVisible();
    await expect(menu).toHaveFocus();

    // Escolher um item navega, fecha a lista e devolve o foco ao botão.
    await userEvent.click(menu);
    await userEvent.click(within(nav).getByRole('button', { name: 'Autores' }));
    await expect(aoNavegar).toHaveBeenLastCalledWith('autores');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(nav).not.toBeVisible();
    await expect(menu).toHaveFocus();

    // Reabrindo, o item escolhido é o ativo.
    await userEvent.click(menu);
    await expect(within(nav).getByRole('button', { name: 'Autores' })).toHaveAttribute('aria-current', 'page');
  },
};
