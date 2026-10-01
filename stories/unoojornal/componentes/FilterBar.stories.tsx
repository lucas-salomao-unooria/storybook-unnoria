import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { FilterBar } from '../../../src/unoojornal/components/FilterBar';
import type { UjnFilterBarItem } from '../../../src/unoojornal/components/FilterBar';
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
import { ujnArticles, ujnSections } from '../fixtures';

const BAR = '#716C98';

/** Filtros das seções, com "Todas" na frente e a contagem de cada seção. */
const FILTROS: UjnFilterBarItem[] = [
  { id: 'todas', label: 'Todas', count: ujnArticles.length },
  ...ujnSections.map((secao) => ({
    id: secao.id,
    label: secao.label,
    count: ujnArticles.filter((materia) => materia.section === secao.id).length,
  })),
];

const FILTROS_SEM_CONTAGEM: UjnFilterBarItem[] = FILTROS.map(({ id, label }) => ({ id, label }));

const ROTULO = 'Filtrar matérias por seção';

const LARGURAS = [
  { rotulo: 'Largo (1280px)', largura: 1280 },
  { rotulo: 'Médio (720px)', largura: 720 },
  { rotulo: 'Compacto (390px)', largura: 390 },
] as const;

/**
 * Barra com o estado guardado pela estória, como o produto faria.
 */
const BarDemo: React.FC<{
  items?: UjnFilterBarItem[];
  inicial?: string;
  theme?: 'light' | 'dark';
  aoMudar?: (id: string) => void;
}> = ({ items = FILTROS, inicial = 'todas', theme, aoMudar }) => {
  const [valor, setValor] = useState(inicial);

  return (
    <FilterBar
      theme={theme}
      items={items}
      value={valor}
      ariaLabel={ROTULO}
      onValueChange={(id) => {
        setValor(id);
        aoMudar?.(id);
      }}
    />
  );
};

/**
 * Página de documentação rica do componente FilterBar.
 */
const FilterBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Cabeçalho e navegação"
      title="FilterBar"
      description="A linha de pílulas de filtro da lista de matérias: escolha única, com foco móvel e navegação por setas. Acionar a pílula já selecionada devolve ao filtro “todas”."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="Um grupo de filtros, um teclado." />
    <UjnDocGrid>
      <UjnDocCard icon="🏷️" title="Filtrar por seção">
        Cada pílula é uma seção (Cultura, Esportes…). A primeira costuma ser &quot;Todas&quot;, o{' '}
        <code>allId</code> da barra.
      </UjnDocCard>
      <UjnDocCard icon="⌨️" title="Foco móvel">
        Só uma pílula entra no Tab. <kbd>←</kbd> e <kbd>→</kbd> movem o foco entre as pílulas, com volta ao
        início e ao fim; <kbd>Home</kbd> e <kbd>End</kbd> vão às pontas. Enter, Espaço ou clique escolhem.
      </UjnDocCard>
      <UjnDocCard icon="🔢" title="Contagem por filtro">
        Cada item aceita <code>count</code>, exibido na pílula. O total da lista (“7 matérias nesta
        edição”) é do <code>SectionHeading</code>, não da barra.
      </UjnDocCard>
      <UjnDocCard icon="📱" title="Rolagem no compacto">
        Abaixo de 640px a barra vira uma linha só que rola na horizontal, com barra fina.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura herdada da lista de matérias de `homepage-default` (`3:7`) e do quadro de pílulas `5:96`."
    />
    <UjnDocSpecs
      component="FilterBar"
      layout="Linha de FilterPill com folga de 8px · quebra de linha no largo, rolagem no compacto"
      specs={[
        { label: 'Papel', value: 'role="group" com aria-label; pílulas com aria-pressed' },
        { label: 'Folga', value: '--ujn-spacing-xs (8px)' },
        { label: 'Teclado', value: '← → (com volta), Home, End movem o foco; Enter/Espaço escolhem' },
        { label: 'Roving', value: 'tabIndex 0 na pílula com foco, ou na selecionada; −1 nas demais' },
        { label: 'Controle', value: 'value (controlado) ou defaultValue (não controlado)' },
        { label: 'Quebras', value: '@container: compacto < 640px rola na horizontal' },
        { label: 'Fronteira', value: "'use client' (estado, refs e funções repassadas)" },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Botões de alternância, não rádios',
          detail:
            'o contrato fixa aria-pressed nas pílulas; a barra é um role="group" de botões de alternância. Escolha única continua garantida por quem guarda o valor.',
        },
        {
          subject: 'Setas movem o foco, não a escolha',
          detail:
            'diferente de um grupo de rádio, cada pílula é um botão que filtra a lista inteira; escolher a cada seta recarregaria a lista a cada passo. A escolha é de Enter, Espaço ou clique.',
        },
        {
          subject: 'Pílula selecionada acionada de novo',
          detail:
            'volta ao filtro allId ("todas"), para que o aria-pressed permita desfazer o filtro; acionar a pílula "Todas" não muda nada.',
        },
        {
          subject: 'Foco móvel acompanha o foco real',
          detail:
            'o ponto de Tab é a última pílula focada (ou, sem foco, a selecionada), de modo que Shift+Tab e Tab voltem ao lugar onde a pessoa estava.',
        },
        {
          subject: 'Sem contagem total',
          detail:
            'o texto "7 matérias nesta edição" pertence ao SectionHeading; a barra só mostra a contagem por filtro.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Grupo, lista e pílulas." />
    <UjnDocStage surface="page" align="stretch" direction="column" padding={16}>
      <BarDemo />
      <UjnDocAnatomy
        zones={[
          { name: 'Grupo', role: 'role="group", nomeado por ariaLabel; trata ← → Home End.', token: 'aria-label' },
          { name: 'Lista', role: 'Quebra de linha no largo; rola no compacto.', token: '--ujn-spacing-xs' },
          { name: 'Pílula (FilterPill)', role: 'Botão de alternância com aria-pressed.', token: '--ujn-color-action-primary' },
          { name: 'Contagem', role: 'Quantidade por filtro; opcional.', token: '--ujn-color-text-secondary' },
        ]}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real em cada largura, com e sem contagem."
    />
    {LARGURAS.map(({ rotulo, largura }) => (
      <UjnDocStage key={rotulo} label={rotulo} surface="page" align="flex-start" padding={16}>
        <div style={{ width: largura, maxWidth: '100%' }}>
          <BarDemo inicial="cultura" />
        </div>
      </UjnDocStage>
    ))}
    <UjnDocStage label="Sem contagem" surface="page" align="flex-start" padding={16}>
      <div style={{ width: 720, maxWidth: '100%' }}>
        <BarDemo items={FILTROS_SEM_CONTAGEM} />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Filtros que o teclado alcança." />
    <UjnDocPractices
      dos={[
        'Colocar "Todas" primeiro e usá-la como allId: é o estado inicial e o destino do desfazer.',
        'Dar um ariaLabel que diga o que a barra filtra (“Filtrar matérias por seção”).',
        'Guardar o filtro na lista que ele filtra e passar value + onValueChange.',
        'Manter cinco a sete filtros: acima disso a barra deixa de ser escaneável.',
      ]}
      donts={[
        'Pôr links de navegação entre páginas na FilterBar: isso é da MainNav.',
        'Esconder um filtro sem matérias: desabilite a pílula (FilterPill) em vez de sumir com ela.',
        'Repetir o total de matérias na barra: o total é do cabeçalho da lista.',
        'Interceptar as setas no consumidor: a barra já cuida de ← → Home End.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Pílulas, contorno e foco acompanham o tema." />
    <UjnDocThemeSwitcher surface="page" padding={16}>
      {(tema) => (
        <div style={{ width: '100%' }}>
          <BarDemo theme={tema} inicial="ciencia" />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público da FilterBar. Os demais atributos vão ao invólucro."
    />
    <UjnDocPropsTable
      title="FilterBar"
      rows={[
        { name: 'items', type: 'UjnFilterBarItem[]', description: 'Filtros, na ordem de exibição. Obrigatório.' },
        { name: 'value', type: 'string', description: 'id do filtro selecionado (modo controlado).' },
        { name: 'defaultValue', type: 'string', default: 'allId', description: 'id inicial (modo não controlado).' },
        { name: 'onValueChange', type: '(id: string) => void', description: 'Chamado com o id do novo filtro.' },
        { name: 'ariaLabel', type: 'string', description: 'Nome acessível do grupo. Obrigatório.' },
        { name: 'allId', type: 'string', default: "'todas'", description: 'id de "sem filtro"; acionar a pílula selecionada de outro id volta a ele.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UjnDocPropsTable
      title="UjnFilterBarItem"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador estável do filtro.' },
        { name: 'label', type: 'string', description: 'Rótulo da pílula.' },
        { name: 'count', type: 'number', description: 'Quantidade de matérias do filtro.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof FilterBar> = {
  title: 'Unoojornal/Componentes/FilterBar',
  component: FilterBar,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Filtros (id, label, count).' },
    value: { control: 'select', options: FILTROS.map((filtro) => filtro.id), description: 'Filtro selecionado (controlado).' },
    defaultValue: { control: false, description: 'Filtro inicial (não controlado).' },
    onValueChange: { action: 'onValueChange', description: 'Chamado com o id do novo filtro.' },
    ariaLabel: { control: 'text', description: 'Nome acessível do grupo.' },
    allId: { control: 'text', description: 'id que representa "sem filtro".' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    items: FILTROS,
    value: 'todas',
    ariaLabel: ROTULO,
    allId: 'todas',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof FilterBar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <FilterBarDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. O valor vem do controle
 * `value`; o `onValueChange` é registrado em Ações.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da FilterBar',
  render: (args) => (
    <div data-ujn-theme={args.theme} style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <FilterBar {...args} />
    </div>
  ),
};

/**
 * Composição fiel à lista de matérias do jornal: as seções com a contagem de
 * cada uma.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: filtros da lista de matérias',
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <BarDemo />
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
          <BarDemo inicial="esportes" />
        </div>
      ))}
    </div>
  ),
};

/**
 * Com e sem contagem por filtro.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <BarDemo />
      <BarDemo items={FILTROS_SEM_CONTAGEM} />
    </div>
  ),
};

/**
 * Cada filtro selecionado, um por barra.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      {FILTROS.slice(0, 3).map((filtro) => (
        <FilterBar key={filtro.id} items={FILTROS} value={filtro.id} ariaLabel={`${ROTULO} (${filtro.label} selecionado)`} />
      ))}
    </div>
  ),
};

/**
 * A barra nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} data-ujn-theme={tema} style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
          <BarDemo theme={tema} inicial="cultura" />
        </div>
      ))}
    </div>
  ),
};

const aoMudar = fn();

/**
 * Clique seleciona e anuncia aria-pressed; acionar a selecionada volta a
 * "Todas".
 */
export const SelecionarComClique: Story = {
  name: 'Clique seleciona e aria-pressed',
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <BarDemo aoMudar={aoMudar} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    aoMudar.mockClear();
    const tela = within(canvasElement);
    const grupo = tela.getByRole('group', { name: ROTULO });
    const todas = within(grupo).getByRole('button', { name: /^Todas/ });
    const cultura = within(grupo).getByRole('button', { name: /^Cultura/ });

    await expect(todas).toHaveAttribute('aria-pressed', 'true');
    await expect(cultura).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(cultura);
    await expect(aoMudar).toHaveBeenLastCalledWith('cultura');
    await expect(cultura).toHaveAttribute('aria-pressed', 'true');
    await expect(todas).toHaveAttribute('aria-pressed', 'false');
    await expect(within(grupo).getAllByRole('button', { pressed: true })).toHaveLength(1);

    // Acionar a selecionada devolve "Todas".
    await userEvent.click(cultura);
    await expect(aoMudar).toHaveBeenLastCalledWith('todas');
    await expect(todas).toHaveAttribute('aria-pressed', 'true');
    await expect(cultura).toHaveAttribute('aria-pressed', 'false');
  },
};

/**
 * Setas movem o foco (com volta), Home e End vão às pontas, e só uma pílula
 * entra no Tab.
 */
export const TecladoComSetas: Story = {
  name: 'Setas movem o foco (foco móvel)',
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <BarDemo />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const grupo = tela.getByRole('group', { name: ROTULO });
    const pilulas = within(grupo).getAllByRole('button');

    // Só a selecionada ("Todas") está no Tab.
    await expect(pilulas.filter((pilula) => pilula.tabIndex === 0)).toHaveLength(1);
    await expect(pilulas[0]).toHaveAttribute('tabindex', '0');

    await userEvent.tab();
    await expect(pilulas[0]).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    await expect(pilulas[1]).toHaveFocus();
    // As setas movem o foco, não a seleção.
    await expect(pilulas[0]).toHaveAttribute('aria-pressed', 'true');
    await expect(pilulas[1]).toHaveAttribute('aria-pressed', 'false');
    // O ponto de Tab acompanha o foco.
    await expect(pilulas[1]).toHaveAttribute('tabindex', '0');
    await expect(pilulas[0]).toHaveAttribute('tabindex', '-1');

    await userEvent.keyboard('{ArrowLeft}');
    await expect(pilulas[0]).toHaveFocus();

    // Volta ao fim a partir do início e ao início a partir do fim.
    await userEvent.keyboard('{ArrowLeft}');
    await expect(pilulas[pilulas.length - 1]).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(pilulas[0]).toHaveFocus();

    await userEvent.keyboard('{End}');
    await expect(pilulas[pilulas.length - 1]).toHaveFocus();
    await userEvent.keyboard('{Home}');
    await expect(pilulas[0]).toHaveFocus();

    // Enter escolhe a pílula focada.
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    await userEvent.keyboard('{Enter}');
    await expect(pilulas[2]).toHaveAttribute('aria-pressed', 'true');
    await expect(pilulas[0]).toHaveAttribute('aria-pressed', 'false');
  },
};
