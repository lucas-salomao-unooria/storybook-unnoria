import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Chip } from '../../../src/unoogaleria/components/Chip';
import { Icon } from '../../../src/unoogaleria/components/Icon';
import { SearchField } from '../../../src/unoogaleria/components/SearchField';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import type { UglIconName } from '../../../src/unoogaleria/components/Icon';
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
import { uglSearchCategories } from '../fixtures';

const BAR = '#716C98';

/**
 * Filtros da biblioteca, declarados aqui: as fixtures não trazem filtros.
 */
const FILTERS: { id: string; label: string; icon: UglIconName }[] = [
  { id: 'favoritos', label: 'Favoritos', icon: 'favorite' },
  { id: 'fotos', label: 'Fotos', icon: 'photo' },
  { id: 'videos', label: 'Vídeos', icon: 'video' },
  { id: 'editadas', label: 'Editadas', icon: 'edit' },
];

/**
 * Faixa de filtros de alternância, cada um com o próprio `aria-pressed`.
 */
const FilterRow: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
  const [active, setActive] = useState<string[]>(['favoritos']);

  return (
    <div
      role="group"
      aria-label="Filtros da biblioteca"
      style={{ display: 'flex', gap: 'var(--ugl-spacing-xs)', flexWrap: 'wrap' }}
    >
      {FILTERS.map((filter) => (
        <Chip
          key={filter.id}
          size={size}
          label={filter.label}
          icon={filter.icon}
          selected={active.includes(filter.id)}
          onClick={() =>
            setActive((current) =>
              current.includes(filter.id)
                ? current.filter((id) => id !== filter.id)
                : [...current, filter.id]
            )
          }
        />
      ))}
    </div>
  );
};

/**
 * Tela de busca: campo, sugestões por categoria e o filtro escolhido.
 */
const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ugl-spacing-l)',
        height: '100%',
        padding: 'calc(var(--ugl-safe-area-top) + var(--ugl-spacing-xs)) var(--ugl-gutter) 0',
        boxSizing: 'border-box',
        background: 'var(--ugl-color-background-primary)',
      }}
    >
      <h1 className="ugl-text ugl-text--display">Busca</h1>
      <SearchField value={query} onChange={(next) => setQuery(next)} />
      <section aria-labelledby="chip-sugestoes">
        <h2 id="chip-sugestoes" className="ugl-text ugl-text--title-lg" style={{ marginBottom: 12 }}>
          Sugestões
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ugl-spacing-xs)' }}>
          {uglSearchCategories.map((category) => (
            <Chip
              key={category.id}
              label={category.label}
              icon={category.icon}
              variant="outline"
              onClick={() => setQuery(category.query)}
            />
          ))}
        </div>
      </section>
      <section aria-labelledby="chip-filtros">
        <h2 id="chip-filtros" className="ugl-text ugl-text--title-lg" style={{ marginBottom: 12 }}>
          Mostrar
        </h2>
        <FilterRow />
      </section>
    </div>
  );
};

const CountBadge: React.FC<{ value: number }> = ({ value }) => (
  <span className="ugl-text ugl-text--caption-strong" style={{ color: 'inherit' }}>
    {value}
  </span>
);

/**
 * Página de documentação rica do componente Chip.
 */
const ChipDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Controles"
      title="Chip"
      description="Pílula de filtro ou de sugestão, em 32 ou 40px de altura. Com selected definido é um botão de alternância (aria-pressed); ligado, ganha o preenchimento de ação e o visto. Sem selected, é uma sugestão que dispara uma ação."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Dois papéis com a mesma forma: alternar um filtro e sugerir uma busca."
    />
    <UglDocGrid>
      <UglDocCard icon="🎛️" title="Filtro de alternância">
        “Favoritos”, “Vídeos”, “Editadas” sobre a biblioteca. Cada chip é independente, com o
        próprio <code>aria-pressed</code>; o produto decide como os filtros se combinam.
      </UglDocCard>
      <UglDocCard icon="💡" title="Sugestão de busca">
        As categorias da busca (“Animais”, “Paisagens”) são botões comuns: sem{' '}
        <code>selected</code>, o chip não anuncia estado, só a ação.
      </UglDocCard>
      <UglDocCard icon="➕" title="Conteúdo à direita">
        O slot <code>trailing</code> recebe uma contagem ou a seta <code>expand</code> de um
        filtro que abre uma folha de opções.
      </UglDocCard>
      <UglDocCard icon="👆" title="Alvo de 44px">
        O desenho tem 32 ou 40px, mas a área de toque é estendida para 44px por uma camada
        invisível acima e abaixo — a faixa de chips continua compacta.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="Chip"
      layout="Pílula · 32/40px"
      specs={[
        { label: 'Alturas', value: 'sm 32px · md 40px (locais)' },
        { label: 'Área de toque', value: '44px (--ugl-touch-target)' },
        { label: 'Forma', value: '--ugl-radius-full' },
        { label: 'Filled', value: '--ugl-color-fill-field' },
        { label: 'Outline', value: '1px --ugl-color-border-default' },
        { label: 'Selecionado', value: '--ugl-color-action-primary · text-on-action' },
        { label: 'Rótulo', value: 'label · Open Sans 600 · 14/20px' },
        { label: 'Glifo', value: 'xs 16px (sm) · sm 20px (md)' },
        { label: 'Foco', value: 'contorno de 2px em --ugl-color-focus-ring' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Alturas locais de 32 e 40px',
          detail:
            'a régua de tamanhos só publica o alvo de 44px; as duas alturas viram --ugl-chip-height-sm e -md no topo do Chip.css.',
        },
        {
          subject: 'Área de toque estendida',
          detail:
            'um ::before invisível de 44px centralizado verticalmente garante o alvo mínimo sem aumentar a pílula. Por isso a faixa de chips precisa de pelo menos 4px de espaço entre linhas.',
        },
        {
          subject: 'Visto quando ligado',
          detail:
            'sem glifo próprio, o chip selecionado mostra check antes do rótulo: a mudança não depende só de cor. Com glifo próprio, a troca de fill-field para action-primary (luminância, não matiz) e o aria-pressed bastam.',
        },
        {
          subject: 'Selecionado igual nas duas variantes',
          detail:
            'filled e outline convergem no mesmo preenchimento de ação quando ligados: o contorno só distingue o chip em repouso.',
        },
        {
          subject: 'Contorno do outline abaixo de 3:1',
          detail:
            'border-default é suave (o rótulo em text-primary, ≥ 12:1, é quem identifica o controle). Para um contorno que precise passar de 3:1 sozinho, use o TextField ou o Button secondary.',
        },
        {
          subject: 'Server Component',
          detail:
            'o Chip só recebe props; onClick vai direto ao <button> nativo. type="button" é o padrão.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UglDocAnatomy
      zones={[
        { name: 'Pílula (button)', role: 'Alvo com aria-pressed quando selected está definido.', token: '--ugl-radius-full · --ugl-color-fill-field' },
        { name: 'Glifo', role: 'Opcional; vira check quando ligado sem glifo próprio. Decorativo.', token: '--ugl-icon-size-xs · --ugl-icon-size-sm' },
        { name: 'Rótulo', role: 'Nome acessível do chip; trunca com reticências.', token: '--ugl-font-label-*' },
        { name: 'Trailing', role: 'Contagem ou seta depois do rótulo, com números tabulares.', token: 'currentColor' },
        { name: 'Área de toque', role: 'Camada invisível de 44px.', token: '--ugl-touch-target' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real, nas duas variantes e nos dois tamanhos."
    />
    <UglDocStage label="Filled — repouso, ligado, com glifo, com contagem, desabilitado" gap={12}>
      <Chip label="Paisagens" />
      <Chip label="Favoritos" selected />
      <Chip label="Vídeos" icon="video" selected={false} />
      <Chip label="Pessoas" icon="people" trailing={<CountBadge value={6} />} />
      <Chip label="Editadas" disabled />
    </UglDocStage>
    <UglDocStage label="Outline" gap={12}>
      <Chip variant="outline" label="Paisagens" />
      <Chip variant="outline" label="Favoritos" selected />
      <Chip variant="outline" label="Ordenar" icon="sort" trailing={<Icon name="expand" size="xs" tone="inherit" />} />
      <Chip variant="outline" label="Editadas" disabled />
    </UglDocStage>
    <UglDocStage label="Tamanhos: sm (32px) e md (40px)" gap={12}>
      <Chip size="sm" label="Pequeno" icon="photo" />
      <Chip size="md" label="Médio" icon="photo" />
      <Chip size="sm" label="Ligado" selected />
      <Chip size="md" label="Ligado" selected />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Passar selected (true ou false) em todo chip de filtro, para que ele anuncie o estado.',
        'Omitir selected nas sugestões, que só disparam uma ação.',
        'Manter rótulos de uma ou duas palavras.',
        'Agrupar a faixa num role="group" com aria-label quando os chips forem filtros.',
      ]}
      donts={[
        'Usar o Chip como aba ou escolha única: para isso existe o SegmentedControl.',
        'Colocar outro botão dentro do trailing: o chip já é um botão.',
        'Diferenciar filtros só pela cor do glifo.',
        'Encostar duas linhas de chips sem espaço: a área de toque de 44px se sobreporia.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Preenchimento, contorno, rótulo e foco acompanham data-ugl-theme."
    />
    <UglDocThemeSwitcher>
      {() => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Chip label="Paisagens" />
          <Chip label="Favoritos" selected />
          <Chip variant="outline" label="Vídeos" icon="video" />
          <Chip variant="outline" label="Editadas" selected />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UglDocPropsTable
      title="Chip"
      rows={[
        { name: 'label', type: 'React.ReactNode', description: 'Rótulo e nome acessível. Obrigatório.' },
        { name: 'icon', type: 'UglIconName', description: 'Glifo antes do rótulo.' },
        { name: 'selected', type: 'boolean', description: 'Quando definido, vira aria-pressed; ligado, aplica o preenchimento de ação.' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Altura de 32 ou 40px.' },
        { name: 'variant', type: "'filled' | 'outline'", default: "'filled'", description: 'Preenchimento suave ou contorno.' },
        { name: 'trailing', type: 'React.ReactNode', description: 'Conteúdo depois do rótulo.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o chip.' },
        { name: 'onClick', type: '(event) => void', description: 'Ação do chip.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className / style', type: 'string / CSSProperties', description: 'Classe e estilo do <button>.' },
        { name: '...button', type: 'React.ButtonHTMLAttributes<HTMLButtonElement>', description: 'Demais atributos nativos (type, aria-*, data-*).' },
      ]}
    />
    <UglDocPropsTable
      title="Tipos públicos"
      rows={[
        { name: 'UglChipSize', type: "'sm' | 'md'", description: 'Alturas do chip.' },
        { name: 'UglChipVariant', type: "'filled' | 'outline'", description: 'Variantes visuais.' },
        { name: 'UglChipProps', type: 'interface', description: 'Propriedades do componente.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Chip> = {
  title: 'Unoogaleria/Componentes/Chip',
  component: Chip,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo do chip.' },
    icon: {
      control: 'select',
      options: [undefined, 'favorite', 'photo', 'video', 'people', 'location', 'pets', 'landscape'],
      description: 'Glifo antes do rótulo.',
    },
    selected: {
      control: 'select',
      options: ['indefinido', 'ligado', 'desligado'],
      mapping: { indefinido: undefined, ligado: true, desligado: false },
      description: 'Estado de alternância (indefinido = sugestão).',
    },
    size: { control: 'radio', options: ['sm', 'md'], description: 'Altura.' },
    variant: { control: 'radio', options: ['filled', 'outline'], description: 'Variante visual.' },
    trailing: {
      control: 'select',
      options: ['nenhum', 'contagem', 'seta'],
      mapping: {
        nenhum: undefined,
        contagem: <CountBadge value={12} />,
        seta: <Icon name="expand" size="xs" tone="inherit" />,
      },
      description: 'Conteúdo depois do rótulo.',
    },
    disabled: { control: 'boolean', description: 'Desabilita o chip.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    onClick: { action: 'onClick', description: 'Ação do chip.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    label: 'Favoritos',
    icon: 'favorite',
    selected: 'desligado' as never,
    size: 'md',
    variant: 'filled',
    trailing: 'nenhum' as never,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChipDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Chip',
  render: (args) => (
    <UglDocStage theme={args.theme ?? 'light'} padding={40}>
      <Chip {...args} />
    </UglDocStage>
  ),
};

/**
 * A tela de busca dentro do aparelho: sugestões em outline e filtros ligáveis.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: tela de busca',
  parameters: { layout: 'centered' },
  render: () => (
    <PhoneFrame scale={0.75} ariaLabel="Galeria — busca">
      <SearchScreen />
    </PhoneFrame>
  ),
};

/**
 * Matriz das duas variantes em repouso, ligadas e com conteúdo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UglDocStage direction="column" align="flex-start" gap={16}>
      {(['filled', 'outline'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Chip variant={variant} label="Paisagens" />
          <Chip variant={variant} label="Favoritos" selected />
          <Chip variant={variant} label="Vídeos" icon="video" selected={false} />
          <Chip variant={variant} label="Pessoas" icon="people" trailing={<CountBadge value={6} />} />
        </div>
      ))}
    </UglDocStage>
  ),
};

/**
 * Os dois tamanhos lado a lado.
 */
export const Tamanhos: Story = {
  render: () => (
    <UglDocStage gap={12}>
      <Chip size="sm" label="Pequeno · 32px" icon="photo" />
      <Chip size="md" label="Médio · 40px" icon="photo" />
    </UglDocStage>
  ),
};

/**
 * Repouso, ligado, desligado e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage gap={12}>
      <Chip label="Sugestão" />
      <Chip label="Ligado" selected />
      <Chip label="Desligado" selected={false} />
      <Chip label="Desabilitado" disabled />
      <Chip label="Ligado e desabilitado" selected disabled />
    </UglDocStage>
  ),
};

/**
 * Os mesmos chips nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UglDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} gap={12}>
          <Chip label="Paisagens" />
          <Chip label="Favoritos" selected />
          <Chip variant="outline" label="Vídeos" icon="video" />
          <Chip label="Editadas" disabled />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: o filtro alterna `aria-pressed` por clique e por teclado, e a
 * sugestão (sem `selected`) não anuncia estado.
 */
export const AlternarFiltro: Story = {
  name: 'Interação: alternar filtro',
  args: { onClick: fn() },
  render: (args) => (
    <UglDocStage direction="column" align="flex-start" gap={16}>
      <FilterRow />
      <Chip label={uglSearchCategories[0].label} icon={uglSearchCategories[0].icon} onClick={args.onClick} />
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const videos = canvas.getByRole('button', { name: FILTERS[2].label });
    const favoritos = canvas.getByRole('button', { name: FILTERS[0].label });

    await expect(favoritos).toHaveAttribute('aria-pressed', 'true');
    await expect(videos).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(videos);
    await expect(videos).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(favoritos);
    await expect(favoritos).toHaveAttribute('aria-pressed', 'false');

    videos.focus();
    await userEvent.keyboard(' ');
    await expect(videos).toHaveAttribute('aria-pressed', 'false');
    await userEvent.keyboard('{Enter}');
    await expect(videos).toHaveAttribute('aria-pressed', 'true');

    const suggestion = canvas.getByRole('button', { name: uglSearchCategories[0].label });
    await expect(suggestion).not.toHaveAttribute('aria-pressed');
    await userEvent.click(suggestion);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
