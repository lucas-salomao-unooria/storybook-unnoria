import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Pagination } from '../../../src/unoojornal/components/Pagination';
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

/**
 * Paginação com a página guardada pela estória, como o produto faria.
 */
const PaginationDemo: React.FC<{
  inicial?: number;
  total?: number;
  siblingCount?: number;
  theme?: 'light' | 'dark';
  aoMudar?: (page: number) => void;
}> = ({ inicial = 1, total = 12, siblingCount = 1, theme, aoMudar }) => {
  const [pagina, setPagina] = useState(inicial);

  return (
    <Pagination
      theme={theme}
      page={pagina}
      pageCount={total}
      siblingCount={siblingCount}
      onPageChange={(proxima) => {
        setPagina(proxima);
        aoMudar?.(proxima);
      }}
    />
  );
};

const LARGURAS = [
  { rotulo: 'Largo (1280px)', largura: 1280 },
  { rotulo: 'Médio (720px)', largura: 720 },
  { rotulo: 'Compacto (390px)', largura: 390 },
] as const;

/**
 * Página de documentação rica do componente Pagination.
 */
const PaginationDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Cabeçalho e navegação"
      title="Pagination"
      description="Paginação da lista de matérias: botões de página anterior e próxima, números com a página atual marcada e reticências quando a lista é longa. No compacto, a lista de números cede lugar a “Página N de M”."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="Folhear a lista de matérias." />
    <UjnDocGrid>
      <UjnDocCard icon="📄" title="Página atual anunciada">
        A página atual leva <code>aria-current=&quot;page&quot;</code> e o preenchimento de ação; cada botão
        tem nome em pt-BR (&quot;Página 3&quot;).
      </UjnDocCard>
      <UjnDocCard icon="⏮️" title="Limites honestos">
        Na primeira página, &quot;Página anterior&quot; fica desabilitada; na última,
        &quot;Próxima página&quot;. Nenhum botão leva a lugar nenhum.
      </UjnDocCard>
      <UjnDocCard icon="…" title="Reticências inteligentes">
        A primeira e a última página sempre aparecem; a atual leva <code>siblingCount</code> vizinhas de
        cada lado e o resto vira reticências. A barra mantém sempre o mesmo número de posições.
      </UjnDocCard>
      <UjnDocCard icon="📱" title="Compacta">
        Abaixo de 640px de contêiner a lista de números dá lugar ao texto &quot;Página N de M&quot; entre as
        duas setas.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Navegação de páginas sob a lista de matérias de `homepage-default` (`3:7`)."
    />
    <UjnDocSpecs
      component="Pagination"
      layout="Linha centrada: seta · páginas · seta · alvos de 44px · folga de 8px"
      specs={[
        { label: 'Marco', value: '<nav aria-label="Paginação"> com lista' },
        { label: 'Alvo', value: '--ujn-touch-target (44px), raio --ujn-radius-s (4px)' },
        { label: 'Página atual', value: '--ujn-color-action-primary · rótulo --ujn-color-text-on-action' },
        { label: 'Hover', value: '--ujn-color-state-hover com contorno --ujn-color-border-default' },
        { label: 'Foco', value: 'Anel de 2px · --ujn-color-focus-ring' },
        { label: 'Setas', value: 'IconButton outline (chevronLeft, chevronRight)' },
        { label: 'Posições', value: '2 × siblingCount + 5 (constante)' },
        { label: 'Fronteira', value: "'use client' (repassa onPageChange aos botões)" },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Sempre controlada',
          detail:
            'o contrato fixa page + onPageChange: quem guarda a página é o produto, que também decide se ela vai para o endereço. Não existe modo não controlado.',
        },
        {
          subject: 'Número de posições constante',
          detail:
            'a barra tem sempre 2 × siblingCount + 5 posições (1 + reticências + vizinhas + reticências + última), para a largura não saltar ao paginar. Com poucas páginas, todas aparecem.',
        },
        {
          subject: 'Reticências fora da árvore de acessibilidade',
          detail:
            'as reticências são aria-hidden: o leitor de tela anuncia só as páginas que existem como botão.',
        },
        {
          subject: 'Resumo no compacto',
          detail:
            'sete botões de 44px não cabem em 390px. Em vez de encolher os alvos, a lista de números é trocada por "Página N de M", mantendo as duas setas.',
        },
        {
          subject: 'Rótulos configuráveis',
          detail:
            'previousLabel, nextLabel, pageLabel e summaryLabel são acréscimos ao contrato, com padrão em pt-BR, para o produto trocar o idioma sem tocar no componente.',
        },
        {
          subject: 'Seta em IconButton outline',
          detail:
            'as setas reusam o IconButton do módulo (44px, contorno), para ter o mesmo alvo e foco dos outros botões de glifo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Setas, números e reticências." />
    <UjnDocStage surface="page" align="stretch" direction="column" padding={16}>
      <PaginationDemo inicial={6} total={12} />
      <UjnDocAnatomy
        zones={[
          { name: 'Marco <nav>', role: 'Nomeado "Paginação"; contém a lista.', token: 'aria-label' },
          { name: 'Seta anterior / próxima', role: 'IconButton com nome; desabilitada nos limites.', token: 'IconButton outline' },
          { name: 'Página', role: 'Botão com nome "Página N"; a atual tem aria-current.', token: '--ujn-color-action-primary' },
          { name: 'Reticências', role: 'Decorativas (aria-hidden); marcam o intervalo omitido.', token: '--ujn-color-text-muted' },
          { name: 'Resumo (compacto)', role: '"Página N de M", no lugar dos números.', token: 'Label/Medium' },
        ]}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real em cada largura, perto das pontas e no meio de uma lista longa."
    />
    {LARGURAS.map(({ rotulo, largura }) => (
      <UjnDocStage key={rotulo} label={rotulo} surface="page" align="flex-start" padding={16}>
        <div style={{ width: largura, maxWidth: '100%' }}>
          <PaginationDemo inicial={6} total={12} />
        </div>
      </UjnDocStage>
    ))}
    <UjnDocStage label="Perto do início, do meio e do fim (12 páginas)" surface="page" align="stretch" direction="column" padding={16}>
      <PaginationDemo inicial={1} total={12} />
      <PaginationDemo inicial={6} total={12} />
      <PaginationDemo inicial={12} total={12} />
    </UjnDocStage>
    <UjnDocStage label="Lista curta (5 páginas) e siblingCount=2" surface="page" align="stretch" direction="column" padding={16}>
      <PaginationDemo inicial={3} total={5} />
      <PaginationDemo inicial={10} total={20} siblingCount={2} />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Paginar sem perder o leitor." />
    <UjnDocPractices
      dos={[
        'Guardar a página no estado (ou no endereço) do produto e passar page + onPageChange.',
        'Levar o foco ao início da lista ao trocar de página, para o leitor de tela anunciar o novo conteúdo.',
        'Manter o número de matérias por página estável: pageCount não deve mudar ao paginar.',
        'Passar rótulos próprios (pageLabel) quando as páginas têm nome ("Página 3 de resultados").',
      ]}
      donts={[
        'Mostrar a paginação com uma única página: com pageCount=1 as duas setas ficam desabilitadas e não há nada a folhear.',
        'Usar a Pagination para trocar de seção: isso é da MainNav.',
        'Esconder as setas nos limites: elas ficam desabilitadas, para a barra não mudar de forma.',
        'Reduzir os alvos abaixo de 44px para caber mais números: o compacto já troca por "Página N de M".',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Página atual, hover e foco acompanham o tema." />
    <UjnDocThemeSwitcher surface="page" padding={16}>
      {(tema) => (
        <div style={{ width: '100%' }}>
          <PaginationDemo theme={tema} inicial={6} total={12} />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público da Pagination. Os demais atributos vão ao <nav>."
    />
    <UjnDocPropsTable
      title="Pagination"
      rows={[
        { name: 'page', type: 'number', description: 'Página atual, de 1 a pageCount. Obrigatório.' },
        { name: 'pageCount', type: 'number', description: 'Total de páginas. Obrigatório.' },
        { name: 'onPageChange', type: '(page: number) => void', description: 'Chamado com a página escolhida.' },
        { name: 'siblingCount', type: 'number', default: '1', description: 'Páginas vizinhas de cada lado da atual.' },
        { name: 'ariaLabel', type: 'string', default: "'Paginação'", description: 'Nome acessível do marco.' },
        { name: 'previousLabel', type: 'string', default: "'Página anterior'", description: 'Nome do botão de voltar.' },
        { name: 'nextLabel', type: 'string', default: "'Próxima página'", description: 'Nome do botão de avançar.' },
        { name: 'pageLabel', type: '(page: number) => string', default: '(n) => `Página ${n}`', description: 'Nome do botão de uma página.' },
        { name: 'summaryLabel', type: '(page, pageCount) => string', default: '`Página ${page} de ${pageCount}`', description: 'Texto do compacto.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Pagination> = {
  title: 'Unoojornal/Componentes/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
  argTypes: {
    page: { control: { type: 'number', min: 1 }, description: 'Página atual.' },
    pageCount: { control: { type: 'number', min: 1 }, description: 'Total de páginas.' },
    onPageChange: { action: 'onPageChange', description: 'Chamado com a página escolhida.' },
    siblingCount: { control: { type: 'number', min: 0, max: 3 }, description: 'Vizinhas de cada lado da atual.' },
    ariaLabel: { control: 'text', description: 'Nome acessível do marco.' },
    previousLabel: { control: 'text', description: 'Nome do botão de voltar.' },
    nextLabel: { control: 'text', description: 'Nome do botão de avançar.' },
    pageLabel: { control: false, description: 'Função que nomeia o botão de uma página.' },
    summaryLabel: { control: false, description: 'Função que escreve o resumo do compacto.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    page: 6,
    pageCount: 12,
    siblingCount: 1,
    ariaLabel: 'Paginação',
    previousLabel: 'Página anterior',
    nextLabel: 'Próxima página',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PaginationDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. A página vem do controle
 * `page`; o `onPageChange` é registrado em Ações.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da Pagination',
  render: (args) => (
    <div data-ujn-theme={args.theme} style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <Pagination {...args} />
    </div>
  ),
};

/**
 * Composição fiel à navegação de páginas sob a lista de matérias.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: paginação da lista',
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <PaginationDemo inicial={3} total={12} />
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
          <PaginationDemo inicial={6} total={12} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Lista curta, longa e com mais vizinhas.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <PaginationDemo inicial={3} total={5} />
      <PaginationDemo inicial={6} total={12} />
      <PaginationDemo inicial={10} total={20} siblingCount={2} />
      <PaginationDemo inicial={1} total={1} />
    </div>
  ),
};

/**
 * Primeira página, meio e última página: as setas se desabilitam nos limites.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <PaginationDemo inicial={1} total={12} />
      <PaginationDemo inicial={6} total={12} />
      <PaginationDemo inicial={12} total={12} />
    </div>
  ),
};

/**
 * A paginação nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} data-ujn-theme={tema} style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
          <PaginationDemo theme={tema} inicial={6} total={12} />
        </div>
      ))}
    </div>
  ),
};

const aoMudar = fn();

/**
 * Clique em página, setas e limites: nada dispara além das pontas.
 */
export const NavegarPelasPaginas: Story = {
  name: 'Clique, setas e limites',
  render: () => (
    <div style={{ width: 1000, maxWidth: '100%', background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <PaginationDemo inicial={1} total={12} aoMudar={aoMudar} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    aoMudar.mockClear();
    const tela = within(canvasElement);
    const nav = tela.getByRole('navigation', { name: 'Paginação' });
    const anterior = within(nav).getByRole('button', { name: 'Página anterior' });
    const proxima = within(nav).getByRole('button', { name: 'Próxima página' });

    // Limite inicial: não há página anterior e a primeira é a atual.
    await expect(anterior).toBeDisabled();
    await expect(within(nav).getByRole('button', { name: 'Página 1' })).toHaveAttribute('aria-current', 'page');
    await expect(proxima).toBeEnabled();

    // Clique em um número.
    await userEvent.click(within(nav).getByRole('button', { name: 'Página 2' }));
    await expect(aoMudar).toHaveBeenLastCalledWith(2);
    await expect(within(nav).getByRole('button', { name: 'Página 2' })).toHaveAttribute('aria-current', 'page');
    await expect(within(nav).getAllByRole('button').filter((botao) => botao.getAttribute('aria-current') === 'page')).toHaveLength(1);
    await expect(anterior).toBeEnabled();

    // Próxima e anterior.
    await userEvent.click(proxima);
    await expect(aoMudar).toHaveBeenLastCalledWith(3);
    await userEvent.click(anterior);
    await expect(aoMudar).toHaveBeenLastCalledWith(2);

    // A última página sempre existe como botão; levar até ela desabilita "Próxima página".
    await userEvent.click(within(nav).getByRole('button', { name: 'Página 12' }));
    await expect(aoMudar).toHaveBeenLastCalledWith(12);
    await expect(proxima).toBeDisabled();
    await expect(within(nav).getByRole('button', { name: 'Página 12' })).toHaveAttribute('aria-current', 'page');

    // No limite final, clicar em "Próxima página" não dispara nada.
    const chamadas = aoMudar.mock.calls.length;
    await userEvent.click(proxima);
    await expect(aoMudar.mock.calls).toHaveLength(chamadas);

    // Teclado: Enter na página atual não repete a chamada.
    within(nav).getByRole('button', { name: 'Página 12' }).focus();
    await userEvent.keyboard('{Enter}');
    await expect(aoMudar.mock.calls).toHaveLength(chamadas);
  },
};
