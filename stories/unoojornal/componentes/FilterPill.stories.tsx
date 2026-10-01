import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { FilterPill } from '../../../src/unoojornal/components/FilterPill';
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

type ForcedState = 'default' | 'hover' | 'selected' | 'focus' | 'disabled';

const STATES: { state: ForcedState; label: string }[] = [
  { state: 'default', label: 'Repouso' },
  { state: 'hover', label: 'Hover' },
  { state: 'selected', label: 'Selecionada' },
  { state: 'focus', label: 'Foco' },
  { state: 'disabled', label: 'Desabilitada' },
];

/**
 * Estados forçados SÓ para a documentação (quadro `5:96` do arquivo de
 * referência): uma classe repete o efeito do pseudo-estado, com os mesmos
 * tokens do FilterPill.css, para ver a matriz de uma vez, sem o ponteiro.
 */
const ForcedStateStyles: React.FC = () => (
  <style>{`
    .ujn-doc-state--hover { background-color: var(--ujn-color-fill-field); }
    .ujn-doc-state--focus { outline: 2px solid var(--ujn-color-focus-ring); outline-offset: 2px; }
  `}</style>
);

/**
 * Matriz do quadro `5:96`: os cinco estados com o componente real.
 */
const StateMatrix: React.FC<{ theme?: 'light' | 'dark'; count?: number }> = ({ theme, count }) => (
  <div data-ujn-theme={theme} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: 4 }}>
    <ForcedStateStyles />
    {STATES.map(({ state, label }) => (
      <FilterPill
        key={state}
        selected={state === 'selected'}
        disabled={state === 'disabled'}
        count={count}
        className={state === 'hover' || state === 'focus' ? `ujn-doc-state--${state}` : undefined}
        tabIndex={state === 'default' || state === 'selected' || state === 'disabled' ? undefined : -1}
      >
        {label}
      </FilterPill>
    ))}
  </div>
);

/**
 * Pílula com estado local, para a documentação responder ao clique.
 */
const PillDemo: React.FC<{ children: React.ReactNode; count?: number; theme?: 'light' | 'dark'; disabled?: boolean }> = ({
  children,
  count,
  theme,
  disabled,
}) => {
  const [selecionada, setSelecionada] = useState(false);

  return (
    <FilterPill
      theme={theme}
      selected={selecionada}
      count={count}
      disabled={disabled}
      onClick={() => setSelecionada((atual) => !atual)}
    >
      {children}
    </FilterPill>
  );
};

/**
 * Página de documentação rica do componente FilterPill.
 */
const FilterPillDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Cabeçalho e navegação"
      title="FilterPill"
      description="Pílula de filtro da lista de matérias: contorno em repouso, preenchimento de campo no hover e preenchimento de ação quando selecionada, com visto, contagem opcional e anel de foco. É o botão de alternância que a FilterBar organiza."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="Um filtro, um botão de alternância." />
    <UjnDocGrid>
      <UjnDocCard icon="🏷️" title="Filtrar a lista">
        Cada pílula representa uma seção ou um tema da lista de matérias. Selecionada, ela é o filtro em
        vigor.
      </UjnDocCard>
      <UjnDocCard icon="✅" title="Seleção por mais de uma pista">
        A pílula selecionada muda de preenchimento, ganha um visto e anuncia{' '}
        <code>aria-pressed=&quot;true&quot;</code>: a cor nunca é o único sinal.
      </UjnDocCard>
      <UjnDocCard icon="🔢" title="Contagem opcional">
        <code>count</code> mostra quantas matérias o filtro traz, depois do rótulo.
      </UjnDocCard>
      <UjnDocCard icon="👆" title="Alvo de 44px">
        A pílula tem 38px de altura e um alvo de toque invisível de 44px.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estados herdados do quadro de pílulas `5:96` do arquivo de referência."
    />
    <UjnDocSpecs
      component="FilterPill"
      layout="Linha (visto · rótulo · contagem) · raio de pílula · contorno de 1px"
      specs={[
        { label: 'Repouso', value: 'Contorno --ujn-color-border-control · rótulo --ujn-color-text-primary' },
        { label: 'Hover', value: '--ujn-color-fill-field' },
        { label: 'Selecionada', value: '--ujn-color-action-primary · rótulo --ujn-color-text-on-action' },
        { label: 'Selecionada em hover', value: '--ujn-color-action-pressed' },
        { label: 'Foco', value: 'Anel de 2px · --ujn-color-focus-ring' },
        { label: 'Desabilitada', value: '40% de opacidade · cursor not-allowed' },
        { label: 'Rótulo', value: 'Label/Medium (14/20, 600)' },
        { label: 'Fronteira', value: 'Server Component (a FilterBar, client, a compõe)' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Dourado do Figma → roxo de ação',
          detail:
            'a pílula selecionada do arquivo de referência é dourada; aqui é --ujn-color-action-primary, com rótulo --ujn-color-text-on-action (branco no claro, roxo profundo no escuro), ≥ 4,5:1 nos dois temas.',
        },
        {
          subject: 'Visto na pílula selecionada',
          detail:
            'o arquivo só troca o preenchimento. O visto acrescenta uma pista que não depende de cor, como o aria-pressed faz para o leitor de tela.',
        },
        {
          subject: 'Alvo de 44px com pílula de 38px',
          detail:
            'o desenho pede uma pílula compacta; um pseudoelemento invisível estende a área de toque a 44px, sem mudar o desenho nem o espaço ocupado.',
        },
        {
          subject: 'Desabilitada por opacidade',
          detail:
            'o quadro de estados mostra a pílula esmaecida; 40% de opacidade é o mesmo recurso dos demais controles do módulo e é isento de contraste por inatividade (WCAG 1.4.3).',
        },
        {
          subject: 'Raio de pílula',
          detail:
            'o jornal é reto; a pílula e o avatar são as duas exceções redondas, como no arquivo de referência.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Visto, rótulo e contagem." />
    <UjnDocStage surface="page" align="center" padding={16}>
      <FilterPill selected count={7}>
        Cultura
      </FilterPill>
      <div style={{ flex: '1 1 320px' }}>
        <UjnDocAnatomy
          zones={[
            { name: 'Visto', role: 'Aparece só na pílula selecionada.', token: 'Icon check xs' },
            { name: 'Rótulo', role: 'Nome do filtro, em uma linha.', token: 'Label/Medium' },
            { name: 'Contagem', role: 'Quantidade de matérias; opcional.', token: '--ujn-color-text-secondary' },
            { name: 'Contorno', role: '1px em repouso; vira o preenchimento de ação quando selecionada.', token: '--ujn-color-border-control' },
          ]}
        />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os cinco estados do quadro `5:96`, com e sem contagem. As pílulas da última linha respondem ao clique."
    />
    <UjnDocStage label="Estados" surface="page" align="flex-start" padding={16}>
      <StateMatrix />
    </UjnDocStage>
    <UjnDocStage label="Com contagem" surface="page" align="flex-start" padding={16}>
      <StateMatrix count={7} />
    </UjnDocStage>
    <UjnDocStage label="Interativas (clique para alternar)" surface="page" align="flex-start" padding={16}>
      <PillDemo>Todas</PillDemo>
      <PillDemo count={12}>Cultura</PillDemo>
      <PillDemo count={4}>Esportes</PillDemo>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Filtros que se entendem." />
    <UjnDocPractices
      dos={[
        'Usar a pílula dentro de uma FilterBar, que cuida do grupo e do teclado.',
        'Escrever rótulos curtos e no singular de seção (“Cultura”, “Esportes”).',
        'Mostrar a contagem quando a pessoa precisa decidir onde clicar.',
        'Desabilitar a pílula de um filtro sem matérias, em vez de escondê-la.',
      ]}
      donts={[
        'Usar a pílula como botão de ação (salvar, enviar): ela é um filtro de alternância.',
        'Distinguir selecionada de repouso só pela cor: o visto e aria-pressed são parte do estado.',
        'Encolher a pílula abaixo de 38px ou o alvo abaixo de 44px.',
        'Colocar texto longo no rótulo: a pílula não quebra de linha.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Preenchimento, contorno e foco acompanham o tema." />
    <UjnDocThemeSwitcher surface="page" padding={16}>
      {(tema) => <StateMatrix theme={tema} count={7} />}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do FilterPill. Os demais atributos vão ao botão."
    />
    <UjnDocPropsTable
      title="FilterPill"
      rows={[
        { name: 'selected', type: 'boolean', default: 'false', description: 'Pílula selecionada: aria-pressed, preenchimento de ação e visto.' },
        { name: 'count', type: 'number', description: 'Quantidade de matérias, depois do rótulo.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Esmaecida, fora do Tab e sem resposta ao toque.' },
        { name: 'children', type: 'ReactNode', description: 'Rótulo do filtro. Obrigatório.' },
        { name: 'onClick', type: 'MouseEventHandler<HTMLButtonElement>', description: 'Chamado no clique (ou Enter/Espaço).' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof FilterPill> = {
  title: 'Unoojornal/Componentes/FilterPill',
  component: FilterPill,
  parameters: { layout: 'padded' },
  argTypes: {
    selected: { control: 'boolean', description: 'Pílula selecionada.' },
    count: { control: 'number', description: 'Quantidade de matérias.' },
    disabled: { control: 'boolean', description: 'Pílula desabilitada.' },
    children: { control: 'text', description: 'Rótulo do filtro.' },
    onClick: { action: 'onClick', description: 'Chamado no clique.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    selected: false,
    count: 7,
    disabled: false,
    children: 'Cultura',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof FilterPill>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <FilterPillDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da FilterPill',
  render: (args) => (
    <div data-ujn-theme={args.theme} style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <FilterPill {...args} />
    </div>
  ),
};

/**
 * Composição fiel ao quadro de pílulas `5:96`: os cinco estados lado a lado.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: estados da pílula (5:96)',
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <StateMatrix />
    </div>
  ),
};

/**
 * Sem contagem e com contagem de um e de três dígitos.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <FilterPill>Sem contagem</FilterPill>
      <FilterPill count={7}>Um dígito</FilterPill>
      <FilterPill count={128}>Três dígitos</FilterPill>
    </div>
  ),
};

/**
 * Repouso e selecionada, com e sem contagem.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <FilterPill>Repouso</FilterPill>
      <FilterPill selected>Selecionada</FilterPill>
      <FilterPill count={7}>Repouso com contagem</FilterPill>
      <FilterPill selected count={7}>Selecionada com contagem</FilterPill>
    </div>
  ),
};

/**
 * Padrão, hover, selecionada, foco e desabilitada, forçados para a documentação.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <StateMatrix />
    </div>
  ),
};

/**
 * A pílula nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} data-ujn-theme={tema} style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
          <StateMatrix theme={tema} count={7} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Pílula com estado local usada na estória de interação.
 */
function FilterPillComEstado() {
  const [selecionada, setSelecionada] = useState(false);

  return (
    <FilterPill selected={selecionada} count={7} onClick={() => setSelecionada((atual) => !atual)}>
      Cultura
    </FilterPill>
  );
}

const aoClicar = fn();

/**
 * Clique alterna aria-pressed; a desabilitada não responde.
 */
export const Alternar: Story = {
  name: 'Alternar e desabilitada',
  render: () => (
    <div style={{ display: 'flex', gap: 12, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <FilterPillComEstado />
      <FilterPill disabled onClick={() => aoClicar('desabilitada')}>
        Desabilitada
      </FilterPill>
    </div>
  ),
  play: async ({ canvasElement }) => {
    aoClicar.mockClear();
    const tela = within(canvasElement);
    const pilula = tela.getByRole('button', { name: 'Cultura 7' });

    await expect(pilula).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(pilula);
    await expect(pilula).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(pilula);
    await expect(pilula).toHaveAttribute('aria-pressed', 'false');

    // Teclado: Enter e Espaço alternam.
    pilula.focus();
    await userEvent.keyboard('{Enter}');
    await expect(pilula).toHaveAttribute('aria-pressed', 'true');
    await userEvent.keyboard(' ');
    await expect(pilula).toHaveAttribute('aria-pressed', 'false');

    const desabilitada = tela.getByRole('button', { name: 'Desabilitada' });
    await expect(desabilitada).toBeDisabled();
    await userEvent.click(desabilitada);
    await expect(aoClicar).not.toHaveBeenCalled();
  },
};
