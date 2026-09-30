import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SegmentedControl } from '../../../src/unoogaleria/components/SegmentedControl';
import type { UglSegmentedOption } from '../../../src/unoogaleria/components/SegmentedControl';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocGrid,
  UglDocCard,
  UglDocSpecs,
  UglDocDecisions,
  UglDocAnatomy,
  UglDocStage,
  UglDocPractices,
  UglDocThemeSwitcher,
  UglDocPropsTable,
} from '../../../.storybook/components';
import { uglMediaItems } from '../fixtures';

const BAR = '#716C98';

/** Visões da biblioteca: o controle que flutua sobre a grade. */
const VIEWS: UglSegmentedOption[] = [
  { id: 'anos', label: 'Anos' },
  { id: 'meses', label: 'Meses' },
  { id: 'todas', label: 'Todas' },
];

/** Tipo de mídia, com glifo. */
const TYPES: UglSegmentedOption[] = [
  { id: 'fotos', label: 'Fotos', icon: 'photo' },
  { id: 'videos', label: 'Vídeos', icon: 'video' },
];

/** Ordem dos álbuns, com quatro opções. */
const ORDER: UglSegmentedOption[] = [
  { id: 'recentes', label: 'Recentes' },
  { id: 'nome', label: 'Nome' },
  { id: 'tamanho', label: 'Tamanho' },
  { id: 'data', label: 'Data' },
];

/**
 * Controle segmentado controlado pela estória, com a escolha escrita ao lado.
 */
const ControlledSegmented: React.FC = () => {
  const [view, setView] = useState('todas');

  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
      <SegmentedControl ariaLabel="Visão da biblioteca" options={VIEWS} value={view} onChange={setView} />
      <span className="ugl-text ugl-text--body-md ugl-text--secondary" aria-live="polite">
        Visão escolhida: {VIEWS.find((option) => option.id === view)?.label}
      </span>
    </div>
  );
};

/**
 * Biblioteca dentro do aparelho: grade de miniaturas e o controle flutuante.
 */
const LibraryScreen: React.FC = () => {
  const [view, setView] = useState('todas');
  const columns = view === 'anos' ? 5 : view === 'meses' ? 4 : 3;

  return (
    <div style={{ position: 'relative', height: '100%', background: 'var(--ugl-color-background-primary)' }}>
      <div
        style={{
          height: '100%',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          paddingTop: 'var(--ugl-safe-area-top)',
          boxSizing: 'border-box',
        }}
      >
        <ul
          aria-label="Fotos e vídeos"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: 'var(--ugl-grid-gap)',
            margin: 0,
            padding: '0 0 120px',
            listStyle: 'none',
          }}
        >
          {uglMediaItems.map((item) => (
            <li key={item.id} style={{ aspectRatio: '1 / 1', background: 'var(--ugl-color-background-tertiary)' }}>
              <img src={item.src} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 'calc(var(--ugl-safe-area-bottom) + var(--ugl-spacing-l))',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 'var(--ugl-z-bar)',
        }}
      >
        <SegmentedControl
          ariaLabel="Visão da biblioteca"
          options={VIEWS}
          value={view}
          onChange={setView}
          variant="floating"
          size="sm"
        />
      </div>
    </div>
  );
};

/**
 * Página de documentação rica do componente SegmentedControl.
 */
const SegmentedControlDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Controles"
      title="SegmentedControl"
      description="Escolha única entre poucas opções de mesmo peso — Anos, Meses, Todas. Grupo de rádio com foco móvel: um único ponto de Tab, e as setas, Home e End movem a escolha. O indicador desliza sob o segmento escolhido."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Troca de visão sem trocar de tela."
    />
    <UglDocGrid>
      <UglDocCard icon="🗓️" title="Visão da biblioteca">
        “Anos | Meses | Todas” flutua sobre a grade na variante <code>floating</code>: cápsula
        translúcida com desfoque e sombra de sobreposição.
      </UglDocCard>
      <UglDocCard icon="🎞️" title="Tipo de mídia">
        “Fotos | Vídeos” com glifo, na variante <code>default</code>, dentro de uma folha ou de
        um cabeçalho.
      </UglDocCard>
      <UglDocCard icon="⌨️" title="Grupo de rádio de verdade">
        <code>{'role="radiogroup"'}</code> com <code>aria-label</code> obrigatório, e cada segmento
        um <code>{'role="radio"'}</code> com <code>aria-checked</code>. Setas, Home e End escolhem e
        focam juntos.
      </UglDocCard>
      <UglDocCard icon="🔁" title="Controlado ou não">
        <code>value</code> + <code>onChange</code> para o produto guardar a escolha, ou{' '}
        <code>defaultValue</code> para o componente guardá-la.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="SegmentedControl"
      layout="Trilha em cápsula · 32/40px"
      specs={[
        { label: 'Alturas', value: 'sm 32px · md 40px (locais)' },
        { label: 'Área de toque', value: '44px (--ugl-touch-target)' },
        { label: 'Trilha (default)', value: '--ugl-color-fill-field' },
        { label: 'Trilha (floating)', value: 'surface-bar + blur(--ugl-blur-bar) + elevation-overlay' },
        { label: 'Indicador', value: '--ugl-color-action-primary · recuo de 2px' },
        { label: 'Rótulo escolhido', value: '--ugl-color-text-on-action' },
        { label: 'Rótulo', value: 'label · Open Sans 600 · 14/20px' },
        { label: 'Deslize', value: '--ugl-transition-slow (desligado em movimento reduzido)' },
        { label: 'Foco', value: 'contorno de 2px em --ugl-color-focus-ring, afastado 2px' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Indicador no roxo de ação',
          detail:
            'um segmento branco sobre a trilha lavanda mediria perto de 1,1:1 e o escolhido só se distinguiria pelo contorno. Com action-primary e o rótulo em text-on-action, o segmento escolhido contrasta com a trilha e o rótulo passa de 4,5:1 nos dois temas.',
        },
        {
          subject: 'Segmentos de mesma largura',
          detail:
            'a trilha é uma grade de colunas iguais (repeat(n, minmax(0, 1fr))). Assim o indicador desliza só por CSS — largura 1/n e translateX(índice × 100%) —, sem medir o DOM nem reagir a redimensionamento.',
        },
        {
          subject: 'Seta escolhe, não só foca',
          detail:
            'o padrão de grupo de rádio nativo: a seta move o foco e a escolha juntos, e as setas dão a volta nas pontas. Espaço e Enter confirmam o segmento focado (útil depois de um clique fora).',
        },
        {
          subject: 'Alturas e recuo locais',
          detail:
            '--ugl-segmented-height-sm (32px), -md (40px) e --ugl-segmented-inset (2px, o degrau --ugl-spacing-4xs) no topo do CSS; a área de toque é estendida para 44px por ::before.',
        },
        {
          subject: 'Sem opções desabilitadas',
          detail:
            'o contrato não prevê segmento desabilitado: uma opção indisponível sai da lista, em vez de ficar num grupo de rádio que a pula no teclado.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UglDocAnatomy
      zones={[
        { name: 'Trilha (radiogroup)', role: 'Grade de colunas iguais, nomeada por ariaLabel.', token: '--ugl-color-fill-field · --ugl-radius-full' },
        { name: 'Indicador', role: 'Cápsula decorativa (aria-hidden) sob o segmento escolhido.', token: '--ugl-color-action-primary' },
        { name: 'Segmento (radio)', role: 'Botão com aria-checked e tabindex móvel.', token: '--ugl-font-label-*' },
        { name: 'Glifo', role: 'Opcional, antes do rótulo, decorativo.', token: '--ugl-icon-size-xs · -sm' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real, nas duas variantes, nos dois tamanhos e com glifos."
    />
    <UglDocStage label="default · md" gap={16}>
      <SegmentedControl ariaLabel="Visão (matriz, médio)" options={VIEWS} defaultValue="meses" />
      <SegmentedControl ariaLabel="Tipo (matriz, médio)" options={TYPES} />
    </UglDocStage>
    <UglDocStage label="default · sm" gap={16}>
      <SegmentedControl ariaLabel="Visão (matriz, pequeno)" options={VIEWS} size="sm" defaultValue="todas" />
      <SegmentedControl ariaLabel="Ordem (matriz, pequeno)" options={ORDER} size="sm" />
    </UglDocStage>
    <UglDocStage label="floating sobre mídia" surface="immersive" gap={16}>
      <SegmentedControl ariaLabel="Visão (matriz, flutuante)" options={VIEWS} variant="floating" size="sm" defaultValue="todas" />
    </UglDocStage>
    <UglDocStage label="fullWidth" align="stretch" width={390}>
      <SegmentedControl ariaLabel="Tipo (matriz, largura total)" options={TYPES} fullWidth />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Usar de duas a quatro opções curtas, de mesmo peso.',
        'Dar um ariaLabel que diga o que o grupo escolhe ("Visão da biblioteca").',
        'Usar floating só quando o controle flutua sobre a grade.',
        'Aplicar a troca de conteúdo na hora em que onChange dispara.',
      ]}
      donts={[
        'Usar para navegação entre telas: isso é a TabBar.',
        'Usar para filtros combináveis: isso são Chips.',
        'Colocar mais de quatro opções: a largura igual espreme os rótulos.',
        'Pedir confirmação depois da escolha.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Trilha, indicador, rótulos e foco acompanham data-ugl-theme."
    />
    <UglDocThemeSwitcher surface="secondary">
      {() => (
        <div style={{ display: 'grid', gap: 16, justifyItems: 'center' }}>
          <SegmentedControl ariaLabel="Visão (tema)" options={VIEWS} defaultValue="todas" />
          <SegmentedControl ariaLabel="Tipo (tema)" options={TYPES} variant="floating" />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UglDocPropsTable
      title="SegmentedControl"
      rows={[
        { name: 'options', type: 'UglSegmentedOption[]', description: 'Opções, na ordem de exibição. Obrigatório.' },
        { name: 'ariaLabel', type: 'string', description: 'Nome acessível do radiogroup. Obrigatório.' },
        { name: 'value', type: 'string', description: 'Opção escolhida (modo controlado).' },
        { name: 'defaultValue', type: 'string', default: 'options[0].id', description: 'Opção inicial (modo não controlado).' },
        { name: 'onChange', type: '(id: string) => void', description: 'Chamado a cada escolha, por ponteiro ou teclado.' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Altura de 32 ou 40px.' },
        { name: 'variant', type: "'default' | 'floating'", default: "'default'", description: 'Trilha sólida ou cápsula flutuante.' },
        { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Ocupa a largura do contêiner.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className / style', type: 'string / CSSProperties', description: 'Classe e estilo da trilha.' },
        { name: '...div', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos nativos da trilha.' },
      ]}
    />
    <UglDocPropsTable
      title="UglSegmentedOption"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador devolvido por onChange.' },
        { name: 'label', type: 'string', description: 'Rótulo e nome acessível do segmento.' },
        { name: 'icon', type: 'UglIconName', description: 'Glifo antes do rótulo.' },
      ]}
    />
    <UglDocPropsTable
      title="Tipos públicos"
      rows={[
        { name: 'UglSegmentedControlSize', type: "'sm' | 'md'", description: 'Alturas.' },
        { name: 'UglSegmentedControlVariant', type: "'default' | 'floating'", description: 'Variantes.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SegmentedControl> = {
  title: 'Unoogaleria/Componentes/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'padded' },
  argTypes: {
    options: { control: 'object', description: 'Opções (id, label, icon).' },
    ariaLabel: { control: 'text', description: 'Nome acessível do grupo.' },
    value: { control: 'text', description: 'Opção escolhida (modo controlado).' },
    defaultValue: { control: 'text', description: 'Opção inicial (modo não controlado).' },
    onChange: { action: 'onChange', description: 'Chamado com o id escolhido.' },
    size: { control: 'radio', options: ['sm', 'md'], description: 'Altura.' },
    variant: { control: 'radio', options: ['default', 'floating'], description: 'Variante visual.' },
    fullWidth: { control: 'boolean', description: 'Ocupa toda a largura.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    options: VIEWS,
    ariaLabel: 'Visão da biblioteca',
    defaultValue: 'todas',
    size: 'md',
    variant: 'default',
    fullWidth: false,
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SegmentedControlDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SegmentedControl',
  render: (args) => (
    <UglDocStage theme={args.theme ?? 'light'} surface="secondary" padding={40}>
      <SegmentedControl {...args} />
    </UglDocStage>
  ),
};

/**
 * A biblioteca no aparelho, com "Anos | Meses | Todas" flutuando sobre a grade.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: visão da biblioteca',
  parameters: { layout: 'centered' },
  render: () => (
    <PhoneFrame scale={0.75} ariaLabel="Galeria — biblioteca">
      <LibraryScreen />
    </PhoneFrame>
  ),
};

/**
 * As duas variantes, com e sem glifo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UglDocStage label="default" gap={16}>
        <SegmentedControl ariaLabel="Visão (default)" options={VIEWS} defaultValue="todas" />
        <SegmentedControl ariaLabel="Tipo (default)" options={TYPES} />
      </UglDocStage>
      <UglDocStage label="floating" surface="tertiary" gap={16}>
        <SegmentedControl ariaLabel="Visão (floating)" options={VIEWS} variant="floating" defaultValue="todas" />
        <SegmentedControl ariaLabel="Tipo (floating)" options={TYPES} variant="floating" />
      </UglDocStage>
    </div>
  ),
};

/**
 * Pequeno, médio e em largura total.
 */
export const Tamanhos: Story = {
  render: () => (
    <UglDocStage direction="column" align="flex-start" gap={16} width={390}>
      <SegmentedControl ariaLabel="Visão (pequeno)" options={VIEWS} size="sm" />
      <SegmentedControl ariaLabel="Visão (médio)" options={VIEWS} size="md" />
      <SegmentedControl ariaLabel="Visão (largura total)" options={VIEWS} fullWidth />
    </UglDocStage>
  ),
};

/**
 * Cada opção escolhida, e um valor que não existe na lista (sem indicador).
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage direction="column" align="flex-start" gap={16}>
      {VIEWS.map((option) => (
        <SegmentedControl
          key={option.id}
          ariaLabel={`Visão com ${option.label} escolhida`}
          options={VIEWS}
          value={option.id}
        />
      ))}
      <SegmentedControl ariaLabel="Visão sem escolha" options={VIEWS} value="inexistente" />
    </UglDocStage>
  ),
};

/**
 * O mesmo controle nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UglDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} gap={16}>
          <SegmentedControl ariaLabel={`Visão (${theme})`} options={VIEWS} defaultValue="meses" />
          <SegmentedControl ariaLabel={`Tipo (${theme})`} options={TYPES} variant="floating" />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Modo controlado: o texto ao lado acompanha a escolha.
 */
export const Controlado: Story = {
  name: 'Modo controlado',
  render: () => (
    <UglDocStage align="flex-start">
      <ControlledSegmented />
    </UglDocStage>
  ),
};

/**
 * Interação: um único ponto de Tab; setas, Home e End escolhem e focam, e as
 * setas dão a volta nas pontas.
 */
export const NavegacaoPorTeclado: Story = {
  name: 'Interação: teclado',
  args: { onChange: fn() },
  render: (args) => (
    <UglDocStage>
      <SegmentedControl ariaLabel="Visão da biblioteca" options={VIEWS} defaultValue="todas" onChange={args.onChange} />
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('radiogroup', { name: 'Visão da biblioteca' });
    const [anos, meses, todas] = VIEWS.map((option) =>
      within(group).getByRole('radio', { name: option.label })
    );

    await expect(todas).toHaveAttribute('aria-checked', 'true');
    await expect(todas).toHaveAttribute('tabindex', '0');
    await expect(anos).toHaveAttribute('tabindex', '-1');

    todas.focus();
    await expect(todas).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}');
    await expect(meses).toHaveFocus();
    await expect(meses).toHaveAttribute('aria-checked', 'true');
    await expect(args.onChange).toHaveBeenLastCalledWith(VIEWS[1].id);

    await userEvent.keyboard('{Home}');
    await expect(anos).toHaveFocus();
    await expect(anos).toHaveAttribute('aria-checked', 'true');

    await userEvent.keyboard('{ArrowLeft}');
    await expect(todas).toHaveFocus();
    await expect(todas).toHaveAttribute('aria-checked', 'true');

    await userEvent.keyboard('{ArrowRight}');
    await expect(anos).toHaveAttribute('aria-checked', 'true');

    await userEvent.keyboard('{End}');
    await expect(todas).toHaveAttribute('aria-checked', 'true');
    await expect(meses).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(meses);
    await expect(meses).toHaveAttribute('aria-checked', 'true');
    await expect(meses).toHaveAttribute('tabindex', '0');
  },
};
