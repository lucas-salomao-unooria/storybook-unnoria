import React, { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { TableOfContents } from '../../../src/unooblog/components/TableOfContents';
import type { UblTableOfContentsItem } from '../../../src/unooblog/components/TableOfContents';
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

const ITENS: UblTableOfContentsItem[] = [
  { id: 'por-que-o-teclado-vem-primeiro', label: 'Por que o teclado vem primeiro', level: 2 },
  { id: 'ordem-de-tabulacao', label: 'Ordem de tabulação', level: 3 },
  { id: 'foco-visivel', label: 'Foco visível', level: 3 },
  { id: 'atalhos', label: 'Atalhos que não atrapalham', level: 2 },
  { id: 'testando-sem-o-mouse', label: 'Testando sem o mouse', level: 2 },
  { id: 'checklist', label: 'Checklist para entregar', level: 2 },
];

/**
 * Sumário com o item ativo guardado pela estória, como o produto faria. O
 * clique não rola a página: `preventDefault` evita mexer no endereço do quadro
 * de documentação.
 */
const TocDemo: React.FC<{
  variant?: 'sidebar' | 'inline';
  inicial?: string;
  largura?: number | string;
  theme?: 'light' | 'dark';
  itens?: UblTableOfContentsItem[];
  defaultOpen?: boolean;
  aoSelecionar?: (id: string) => void;
}> = ({ variant = 'sidebar', inicial = 'foco-visivel', largura, theme, itens = ITENS, defaultOpen, aoSelecionar }) => {
  const [ativo, setAtivo] = useState(inicial);

  return (
    <div style={{ width: largura, maxWidth: '100%' }}>
      <TableOfContents
        theme={theme}
        variant={variant}
        items={itens}
        activeId={ativo}
        defaultOpen={defaultOpen}
        onSelect={(id, evento) => {
          evento.preventDefault();
          setAtivo(id);
          aoSelecionar?.(id);
        }}
      />
    </div>
  );
};

const PARAGRAFO =
  'Um parágrafo de enchimento para dar altura ao texto: o sumário continua visível enquanto esta coluna rola, e o item em leitura acompanha o título que está no topo.';

/**
 * Post curto com sumário lateral preso (`sticky`) ao lado do texto. A rolagem é
 * a do contêiner; um `IntersectionObserver` marca o título em leitura.
 */
const LeituraComSumario: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(ITENS[0].id);

  useEffect(() => {
    const area = areaRef.current;
    if (!area || typeof IntersectionObserver === 'undefined') return undefined;
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.find((entrada) => entrada.isIntersecting);
        if (visivel) setAtivo(visivel.target.id);
      },
      { root: area, rootMargin: '0px 0px -70% 0px' }
    );
    area.querySelectorAll('h2, h3').forEach((titulo) => observador.observe(titulo));
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={areaRef}
      data-ubl-theme={theme}
      data-testid="area-de-leitura"
      style={{
        width: 960,
        maxWidth: '100%',
        height: 360,
        overflowY: 'auto',
        boxSizing: 'border-box',
        padding: 24,
        background: 'var(--ubl-color-background-page)',
        border: '1px solid var(--ubl-color-border-subtle)',
        borderRadius: 12,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) var(--ubl-toc-width)',
        gap: 32,
        alignItems: 'start',
      }}
    >
      <article
        style={{
          fontFamily: 'var(--ubl-font-sans)',
          fontSize: 'var(--ubl-font-prose-size)',
          lineHeight: 'var(--ubl-font-prose-line)',
          color: 'var(--ubl-color-text-primary)',
        }}
      >
        {ITENS.map((item) => {
          const Titulo = item.level === 2 ? 'h2' : 'h3';
          return (
            <section key={item.id}>
              <Titulo id={item.id} style={{ margin: '0 0 8px', scrollMarginTop: 16 }}>
                {item.label}
              </Titulo>
              <p style={{ margin: '0 0 16px' }}>{PARAGRAFO}</p>
              <p style={{ margin: '0 0 32px' }}>{PARAGRAFO}</p>
            </section>
          );
        })}
      </article>
      <TableOfContents
        items={ITENS}
        activeId={ativo}
        style={{ '--ubl-toc-sticky-top': '0px' } as React.CSSProperties}
        onSelect={(id, evento) => {
          evento.preventDefault();
          setAtivo(id);
          areaRef.current?.querySelector(`#${id}`)?.scrollIntoView({ block: 'start' });
        }}
      />
    </div>
  );
};

/**
 * Página de documentação rica do componente TableOfContents.
 */
const TableOfContentsDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Navegação"
      title="TableOfContents"
      description="Sumário do post: uma lista de links para os títulos, com o que está em leitura marcado por barra lateral. Fica preso ao lado do texto no largo (sidebar) ou vira um bloco recolhível no topo do post no compacto (inline)."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Dar ao leitor de um texto longo o mapa e o lugar onde ele está."
    />
    <UblDocGrid>
      <UblDocCard icon="🗺️" title="Mapa do post">
        Um item por intertítulo (<code>&lt;h2&gt;</code> e <code>&lt;h3&gt;</code>), na ordem do texto. O nível 3
        aparece recuado sob o nível 2.
      </UblDocCard>
      <UblDocCard icon="📍" title="Onde estou">
        O título em leitura leva <code>aria-current=&quot;location&quot;</code>, barra lateral de 2px na cor de
        ação e peso maior. Quem calcula o ativo (rolagem, observador) é o produto: <code>activeId</code>.
      </UblDocCard>
      <UblDocCard icon="📌" title="Preso ao lado do texto">
        Na variante <code>sidebar</code> o sumário é <code>position: sticky</code> e acompanha a rolagem, com
        a largura de <code>--ubl-toc-width</code>.
      </UblDocCard>
      <UblDocCard icon="📱" title="Recolhível no compacto">
        A variante <code>inline</code> é um <code>&lt;details&gt;</code> com <code>&lt;summary&gt;</code>: abre
        e fecha pelo teclado sem nenhum código.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Composição própria do blog; cores, fontes e glifos são os da Plataforma Unooria."
    />
    <UblDocSpecs
      component="TableOfContents"
      layout="Sidebar: coluna de 240px, título e trilha de 2px · Inline: cartão recolhível de largura total"
      specs={[
        { label: 'Largura (sidebar)', value: '--ubl-toc-width (240px)' },
        { label: 'Posição (sidebar)', value: 'sticky · top: --ubl-toc-sticky-top (altura do cabeçalho + 24px)' },
        { label: 'Trilha', value: 'Barra lateral de 2px em --ubl-color-border-subtle' },
        { label: 'Item ativo', value: 'Barra de 2px em --ubl-color-action-primary · texto primário · bold' },
        { label: 'Nível 3', value: 'Recuo de --ubl-spacing-xxl (24px)' },
        { label: 'Inline', value: '<details> em --ubl-color-background-card · raio --ubl-radius-m · chevron que gira' },
        { label: 'Alvos', value: 'Sidebar 36px de altura · inline 44px (--ubl-touch-target)' },
        { label: 'Fronteira', value: "'use client' (estado do bloco recolhível e funções repassadas)" },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Links nativos, sem escuta de tecla',
          detail:
            'cada item é <a href="#id">: Tab, Shift+Tab e Enter funcionam sem código, e a rolagem até o título é a do navegador. onSelect recebe também o evento, para quem rola um contêiner próprio chamar preventDefault().',
        },
        {
          subject: 'aria-current="location"',
          detail:
            'o item ativo marca um lugar dentro da mesma página, não uma página: "location" é o valor certo (a navegação principal usa "page"). A barra lateral e o peso bold reforçam, para o estado nunca depender só da cor.',
        },
        {
          subject: 'Quem diz o ativo é o produto',
          detail:
            'o componente não observa a rolagem: o observador depende de qual contêiner rola e de onde fica o cabeçalho. O produto calcula e passa activeId (a estória "Leitura com sumário preso" mostra um IntersectionObserver).',
        },
        {
          subject: 'Sidebar menor que o alvo de toque',
          detail:
            'os itens da sidebar medem 36px de altura (44px − 8px), não 44px: a coluna só aparece no largo, onde o ponteiro é o mouse, e com 44px um post de oito títulos passaria da altura da tela. O WCAG 2.5.8 pede 24px. No bloco inline, que é de toque, o alvo é de 44px.',
        },
        {
          subject: 'Abre sozinho no largo',
          detail:
            'sem defaultOpen, o bloco inline mede o próprio contêiner ao montar: com 640px ou mais ele começa aberto, abaixo disso fechado. Passar defaultOpen desliga a medição.',
        },
        {
          subject: 'Posição pegajosa por token local',
          detail:
            '--ubl-toc-sticky-top (cabeçalho de 64px + 24px) fica no CSS do componente e pode ser sobrescrito em style quando o produto não tem cabeçalho fixo. max-height e rolagem própria evitam que um sumário longo passe da tela.',
        },
        {
          subject: 'Título como <h2> na sidebar',
          detail:
            '"Neste post" é um <h2> que nomeia o marco de navegação por aria-labelledby; no inline, é o rótulo do <summary>.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Título, trilha e itens." />
    <UblDocStage surface="page" align="flex-start" padding={24}>
      <TocDemo largura="var(--ubl-toc-width)" />
    </UblDocStage>
    <UblDocAnatomy
      zones={[
        { name: 'Marco <nav>', role: 'Nomeado pelo título ("Neste post") por aria-labelledby.', token: 'aria-labelledby' },
        { name: 'Título', role: '<h2> na sidebar; rótulo do <summary> no inline.', token: 'label · bold' },
        { name: 'Trilha', role: 'Barra de 2px à esquerda de todos os itens.', token: '--ubl-color-border-subtle' },
        { name: 'Item', role: '<a href="#id"> com o texto do título.', token: '--ubl-color-text-secondary' },
        { name: 'Item ativo', role: 'Barra de 2px sobre a trilha, texto primário, bold, aria-current="location".', token: '--ubl-color-action-primary' },
        { name: 'Item de nível 3', role: 'Recuado sob o nível 2.', token: '--ubl-spacing-xxl' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As duas variantes reais, com o item ativo em lugares diferentes."
    />
    <UblDocStage label="sidebar" surface="page" align="flex-start" padding={24}>
      <TocDemo largura="var(--ubl-toc-width)" inicial="por-que-o-teclado-vem-primeiro" />
      <TocDemo largura="var(--ubl-toc-width)" inicial="atalhos" />
      <TocDemo largura="var(--ubl-toc-width)" inicial="checklist" />
    </UblDocStage>
    <UblDocStage label="inline, aberto (defaultOpen)" surface="page" align="flex-start" padding={24}>
      <TocDemo variant="inline" largura={420} defaultOpen />
    </UblDocStage>
    <UblDocStage label="inline, fechado (defaultOpen={false})" surface="page" align="flex-start" padding={24}>
      <TocDemo variant="inline" largura={420} defaultOpen={false} />
    </UblDocStage>
    <UblDocStage label="inline, largura compacta (390px): fechado por padrão" surface="page" align="flex-start" padding={24}>
      <TocDemo variant="inline" largura={390} />
    </UblDocStage>
    <UblDocStage label="Leitura com sumário preso: role o texto" surface="subtle" align="flex-start" padding={24}>
      <LeituraComSumario />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Um sumário que orienta sem competir com o texto." />
    <UblDocPractices
      dos={[
        'Montar os itens a partir dos intertítulos do post (ublTableOfContents), para o sumário nunca divergir do texto.',
        'Dar a cada título um id estável e usar scroll-margin-top pela altura do cabeçalho fixo.',
        'Mostrar o sumário só em posts com três ou mais seções.',
        'Usar a variante sidebar no largo e inline no compacto, trocando por consulta de contêiner.',
      ]}
      donts={[
        'Incluir títulos de nível 4 ou mais: o componente trata dois níveis.',
        'Marcar vários itens como ativos: só um leva aria-current.',
        'Usar o sumário como navegação entre posts: isso é do PostNavigation.',
        'Repetir o sumário inline e a sidebar ao mesmo tempo na tela.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Trilha, barra ativa e fundo acompanham o tema." />
    <UblDocThemeSwitcher surface="page" padding={24}>
      {(tema) => (
        <>
          <TocDemo theme={tema} largura="var(--ubl-toc-width)" />
          <TocDemo theme={tema} variant="inline" largura={360} defaultOpen />
        </>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do TableOfContents. Os demais atributos nativos vão ao <nav>."
    />
    <UblDocPropsTable
      title="TableOfContents"
      rows={[
        { name: 'items', type: '{ id: string; label: string; level: 2 | 3 }[]', description: 'Títulos do post, na ordem. O link de cada item é #id. Obrigatório.' },
        { name: 'activeId', type: 'string', description: 'Título em leitura: aria-current="location", barra lateral e bold.' },
        { name: 'onSelect', type: '(id: string, event: MouseEvent) => void', description: 'Chamado com o id do item e o evento do clique.' },
        { name: 'title', type: 'string', default: "'Neste post'", description: 'Título e nome acessível do marco.' },
        { name: 'variant', type: "'sidebar' | 'inline'", default: "'sidebar'", description: 'Coluna presa ao lado do texto ou bloco recolhível.' },
        { name: 'defaultOpen', type: 'boolean', description: 'Só no inline: começa aberto. Sem a prop, abre sozinho com 640px ou mais.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TableOfContents> = {
  title: 'Unooblog/Componentes/TableOfContents',
  component: TableOfContents,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Títulos do post (id, label, level 2 ou 3).' },
    activeId: { control: 'text', description: 'Id do título em leitura.' },
    onSelect: { action: 'onSelect', description: 'Chamado com o id do item e o evento.' },
    title: { control: 'text', description: 'Título e nome acessível do marco.' },
    variant: { control: 'radio', options: ['sidebar', 'inline'], description: 'Composição do sumário.' },
    defaultOpen: { control: 'boolean', description: 'Só no inline: começa aberto.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    items: ITENS,
    activeId: 'foco-visivel',
    title: 'Neste post',
    variant: 'sidebar',
    defaultOpen: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof TableOfContents>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TableOfContentsDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TableOfContents',
  render: (args) => (
    <div
      data-ubl-theme={args.theme}
      style={{ background: 'var(--ubl-color-background-page)', padding: 24, maxWidth: 480 }}
    >
      <TableOfContents {...args} />
    </div>
  ),
};

/**
 * Composição de um post longo: texto à esquerda e sumário preso à direita.
 */
export const LeituraComSumarioPreso: Story = {
  name: '🎨 Exemplo de composição: leitura com sumário preso',
  render: () => <LeituraComSumario />,
};

/**
 * A mesma lista nas larguras da sidebar e do bloco recolhível.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap', background: 'var(--ubl-color-background-page)', padding: 24 }}>
      <TocDemo largura="var(--ubl-toc-width)" />
      <TocDemo variant="inline" largura={390} defaultOpen />
      <TocDemo variant="inline" largura={560} defaultOpen />
    </div>
  ),
};

/**
 * As duas variantes, abertas e fechadas.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap', background: 'var(--ubl-color-background-page)', padding: 24 }}>
      <TocDemo largura="var(--ubl-toc-width)" />
      <TocDemo variant="inline" largura={360} defaultOpen />
      <TocDemo variant="inline" largura={360} defaultOpen={false} />
    </div>
  ),
};

/**
 * Item ativo no começo, no meio (nível 3) e no fim.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap', background: 'var(--ubl-color-background-page)', padding: 24 }}>
      <TocDemo largura="var(--ubl-toc-width)" inicial="por-que-o-teclado-vem-primeiro" />
      <TocDemo largura="var(--ubl-toc-width)" inicial="ordem-de-tabulacao" />
      <TocDemo largura="var(--ubl-toc-width)" inicial="checklist" />
    </div>
  ),
};

/**
 * O sumário nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div
          key={tema}
          data-ubl-theme={tema}
          style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap', background: 'var(--ubl-color-background-page)', padding: 24 }}
        >
          <TocDemo theme={tema} largura="var(--ubl-toc-width)" />
          <TocDemo theme={tema} variant="inline" largura={360} defaultOpen />
        </div>
      ))}
    </div>
  ),
};

const aoSelecionar = fn();

/**
 * Sidebar: clicar chama onSelect e muda o item atual; nível 3 recuado.
 */
export const SelecionarNaSidebar: Story = {
  name: 'Sidebar: selecionar um título',
  render: () => (
    <div style={{ background: 'var(--ubl-color-background-page)', padding: 24 }}>
      <TocDemo largura="var(--ubl-toc-width)" aoSelecionar={aoSelecionar} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    aoSelecionar.mockClear();
    const tela = within(canvasElement);
    const nav = tela.getByRole('navigation', { name: 'Neste post' });
    const links = within(nav).getAllByRole('link');
    await expect(links).toHaveLength(6);

    // O ativo inicial é "Foco visível" (aria-current="location"), e só ele.
    await expect(within(nav).getByRole('link', { name: 'Foco visível' })).toHaveAttribute('aria-current', 'location');
    await expect(nav.querySelectorAll('[aria-current="location"]')).toHaveLength(1);

    // Os itens apontam para as âncoras; o nível 3 é recuado.
    await expect(within(nav).getByRole('link', { name: 'Checklist para entregar' })).toHaveAttribute('href', '#checklist');
    await expect(within(nav).getByRole('link', { name: 'Foco visível' })).toHaveClass('ubl-toc__link--level-3');
    await expect(within(nav).getByRole('link', { name: 'Atalhos que não atrapalham' })).toHaveClass('ubl-toc__link--level-2');

    // Clique: onSelect recebe o id e o ativo muda.
    await userEvent.click(within(nav).getByRole('link', { name: 'Testando sem o mouse' }));
    await expect(aoSelecionar).toHaveBeenLastCalledWith('testando-sem-o-mouse');
    await expect(within(nav).getByRole('link', { name: 'Testando sem o mouse' })).toHaveAttribute('aria-current', 'location');
    await expect(within(nav).getByRole('link', { name: 'Foco visível' })).not.toHaveAttribute('aria-current');

    // Teclado: Enter no link focado também seleciona.
    within(nav).getByRole('link', { name: 'Atalhos que não atrapalham' }).focus();
    await userEvent.keyboard('{Enter}');
    await expect(aoSelecionar).toHaveBeenLastCalledWith('atalhos');
    await expect(within(nav).getByRole('link', { name: 'Atalhos que não atrapalham' })).toHaveAttribute('aria-current', 'location');
  },
};

/**
 * Inline: recolhível; abre ao clique, e escolher um item chama onSelect.
 */
export const AbrirEFecharNoInline: Story = {
  name: 'Inline: abrir, fechar e selecionar',
  render: () => (
    <div style={{ background: 'var(--ubl-color-background-page)', padding: 24 }}>
      <TocDemo variant="inline" largura={390} aoSelecionar={aoSelecionar} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    aoSelecionar.mockClear();
    const tela = within(canvasElement);
    const nav = tela.getByRole('navigation', { name: 'Neste post' });
    const detalhes = nav.querySelector('details') as HTMLDetailsElement;
    const resumo = within(nav).getByText('Neste post').closest('summary') as HTMLElement;

    // No compacto (390px), começa fechado.
    await expect(detalhes.open).toBe(false);
    await expect(within(nav).getByRole('link', { name: 'Checklist para entregar', hidden: true })).not.toBeVisible();

    // O resumo é focável pelo teclado (Enter e Espaço o acionam nativamente) e abre ao clique.
    resumo.focus();
    await expect(resumo).toHaveFocus();
    await userEvent.click(resumo);
    await waitFor(() => expect(detalhes.open).toBe(true));
    await expect(within(nav).getByRole('link', { name: 'Checklist para entregar' })).toBeVisible();

    // Escolher um item chama onSelect e muda o item atual.
    await userEvent.click(within(nav).getByRole('link', { name: 'Checklist para entregar' }));
    await expect(aoSelecionar).toHaveBeenLastCalledWith('checklist');
    await expect(within(nav).getByRole('link', { name: 'Checklist para entregar' })).toHaveAttribute('aria-current', 'location');

    // Fecha pelo clique no resumo.
    await userEvent.click(resumo);
    await waitFor(() => expect(detalhes.open).toBe(false));
  },
};

/**
 * Inline sem defaultOpen: abre sozinho num contêiner largo.
 */
export const AbreSozinhoNoLargo: Story = {
  name: 'Inline: abre sozinho no largo',
  render: () => (
    <div style={{ background: 'var(--ubl-color-background-page)', padding: 24 }}>
      <TocDemo variant="inline" largura={720} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const nav = tela.getByRole('navigation', { name: 'Neste post' });
    const detalhes = nav.querySelector('details') as HTMLDetailsElement;
    await waitFor(() => expect(detalhes.open).toBe(true));
  },
};
