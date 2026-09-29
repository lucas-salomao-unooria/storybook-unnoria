import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Chip } from '../../../src/unoovista/components/Chip';
import { Icon } from '../../../src/unoovista/components/Icon';
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

const BAR = '#716C98';

/** Categorias de demonstração da faixa de busca. */
const CATEGORIES = ['Vídeos', 'Loja', 'Estilo', 'Esportes', 'Automóveis', 'Viagem'];

const CategoryIcon = () => <Icon name="longVideo" size="sm" tone="inherit" />;

/**
 * Faixa de categorias em que um chip fica selecionado por vez.
 */
const CategoryRow = ({ width }: { width?: number }) => {
  const [active, setActive] = useState(0);

  return (
    <div
      role="group"
      aria-label="Categorias"
      style={{
        width,
        maxWidth: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        scrollbarWidth: 'thin',
        padding: 4,
      }}
    >
      {CATEGORIES.map((category, index) => (
        <Chip
          key={category}
          selected={index === active}
          onClick={() => setActive(index)}
          leadingIcon={index === 0 ? <CategoryIcon /> : undefined}
        >
          {category}
        </Chip>
      ))}
    </div>
  );
};

/**
 * Página de documentação rica do componente Chip.
 */
const ChipDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Filtro"
      title="Chip"
      description="Cápsula de filtro e de categoria, exibida numa faixa rolável abaixo do campo de busca. Em repouso é uma cápsula de contorno suave sobre a superfície de conteúdo; selecionada, ganha o preenchimento roxo de ação. O estado se comunica por preenchimento e por aria-pressed, nunca só por cor."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Para que o chip serve e o que ele não é."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🧭" title="Filtro por categoria">
        Refina uma lista ou o resultado de uma busca: Vídeos, Loja, Estilo, Esportes. Filtra o
        conteúdo; não executa uma ação.
      </UnvDocCard>
      <UnvDocCard icon="🟣" title="Seleção em roxo">
        O chip selecionado usa <code>--unv-color-action-primary</code> com rótulo em{' '}
        <code>--unv-color-text-on-action</code>: um par medido nos dois temas.
      </UnvDocCard>
      <UnvDocCard icon="🎛️" title="Ícone opcional">
        <code>leadingIcon</code> recebe um <code>Icon</code> do módulo, para categorias com identidade
        visual própria.
      </UnvDocCard>
      <UnvDocCard icon="♿" title="Botão de alternância">
        É um <code>button</code> com <code>aria-pressed</code>; alvo de toque de 44px e foco visível de
        2px.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="Chip"
      layout="Cápsula · 32px"
      specs={[
        { label: 'Altura', value: '32px (--unv-spacing-3xl)' },
        { label: 'Recuo lateral', value: '12px (--unv-spacing-m)' },
        { label: 'Raio', value: '--unv-radius-full' },
        { label: 'Rótulo', value: 'title-sm · 14px/600' },
        { label: 'Repouso', value: 'background-primary + contorno action-secondary-border' },
        { label: 'Selecionado', value: 'action-primary + text-on-action' },
        { label: 'Alvo de toque', value: '44px (área invisível)' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Seleção por preenchimento roxo',
          detail:
            'o chip selecionado deixou de inverter para texto primário e passou a usar o preenchimento de ação (--unv-color-action-primary) com --unv-color-text-on-action. O contraste entre os dois estados de preenchimento é a pista visual; aria-pressed é a pista assistiva.',
        },
        {
          subject: 'Hover sem cálculo',
          detail:
            'em repouso o hover usa --unv-color-fill-field; selecionado, --unv-color-action-pressed. Nenhuma cor é derivada por filtro ou opacidade.',
        },
        {
          subject: 'Contorno suave',
          detail:
            'o contorno em repouso usa --unv-color-action-secondary-border, como o botão secundário: o rótulo (≥ 4,5:1) identifica o chip, e o estado se distingue pelo preenchimento.',
        },
        {
          subject: 'Desabilitado',
          detail:
            'rótulo em --unv-color-text-placeholder e contorno em --unv-color-border-subtle; o cursor muda para not-allowed.',
        },
        {
          subject: 'Alvo de 44px',
          detail:
            'a altura visível de 32px permanece; um pseudo-elemento invisível amplia a área de toque a --unv-touch-target.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UnvDocAnatomy
      zones={[
        {
          name: 'Cápsula',
          role: 'Contêiner de 32px com raio total, contorno de 1px e fundo de conteúdo.',
          token: '--unv-color-background-primary · --unv-color-action-secondary-border',
        },
        {
          name: 'Ícone inicial',
          role: 'Slot leadingIcon, aria-hidden. Herda a cor do rótulo.',
        },
        {
          name: 'Rótulo',
          role: 'Texto de uma linha em title-sm.',
          token: '--unv-color-text-primary · --unv-color-text-on-action',
        },
        {
          name: 'Estado selecionado',
          role: 'Troca fundo e contorno para o roxo de ação e o rótulo para o texto sobre ação.',
          token: '--unv-color-action-primary · --unv-color-text-on-action',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Estados e composições renderizados pelo componente real."
    />
    <UnvDocStage label="Estados" gap={12}>
      <Chip>Padrão</Chip>
      <Chip selected>Selecionado</Chip>
      <Chip disabled>Desabilitado</Chip>
      <Chip leadingIcon={<CategoryIcon />}>Com ícone</Chip>
      <Chip selected leadingIcon={<CategoryIcon />}>
        Selecionado com ícone
      </Chip>
    </UnvDocStage>
    <UnvDocStage label="Faixa interativa de categorias (clique para trocar)" align="flex-start">
      <CategoryRow width={375} />
    </UnvDocStage>
    <UnvDocStage
      label="Sobre a tela (background-secondary)"
      surface="secondary"
      align="flex-start"
    >
      <CategoryRow width={375} />
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Manter exatamente um chip selecionado na faixa, quando o filtro é exclusivo.',
        'Usar rótulos de uma palavra sempre que possível.',
        'Deixar o último chip parcialmente visível para sinalizar rolagem.',
        'Reservar o ícone para categorias que tenham identidade visual própria.',
        'Agrupar a faixa com role="group" e um rótulo acessível.',
      ]}
      donts={[
        'Permitir seleção múltipla sem indicar isso visualmente.',
        'Quebrar a faixa em duas linhas.',
        'Usar o chip como botão de ação: ele filtra, não executa.',
        'Aplicar cores de severidade (erro, sucesso) ao chip.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O preenchimento de ação clareia no tema escuro, e o rótulo escurece junto."
    />
    <UnvDocThemeSwitcher>
      {() => (
        <>
          <Chip>Padrão</Chip>
          <Chip selected>Selecionado</Chip>
          <Chip disabled>Desabilitado</Chip>
          <Chip leadingIcon={<CategoryIcon />}>Vídeos</Chip>
        </>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UnvDocPropsTable
      title="Chip"
      rows={[
        {
          name: 'leadingIcon',
          type: 'React.ReactNode',
          description: 'Ícone antes do rótulo (aria-hidden).',
        },
        {
          name: 'selected',
          type: 'boolean',
          default: 'false',
          description: 'Marca o chip como selecionado (aria-pressed) e aplica o preenchimento de ação.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Força o tema. Sem valor, herda o de data-unv-theme do contêiner.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo do chip.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...button',
          type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
          description: 'Demais atributos do botão (onClick, disabled, aria-*).',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Chip> = {
  title: 'Unoovista/Componentes/Chip',
  component: Chip,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    selected: { control: 'boolean', description: 'Marca o chip como selecionado.' },
    disabled: { control: 'boolean', description: 'Desabilita o chip.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Rótulo do chip.' },
  },
  args: {
    selected: false,
    disabled: false,
    theme: 'light',
    children: 'Vídeos',
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
 * Playground com as propriedades do Chip expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Chip',
  render: (args) => (
    <UnvDocStage theme={args.theme ?? 'light'} padding={40}>
      <Chip {...args} leadingIcon={<CategoryIcon />} />
    </UnvDocStage>
  ),
};

/**
 * Faixa interativa de categorias.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={16}>
      <CategoryRow width={375} />
    </UnvDocStage>
  ),
};

/**
 * Matriz completa de estados.
 */
export const Estados: Story = {
  render: () => (
    <UnvDocStage gap={12}>
      <Chip>Padrão</Chip>
      <Chip selected>Selecionado</Chip>
      <Chip disabled>Desabilitado</Chip>
      <Chip leadingIcon={<CategoryIcon />}>Com ícone</Chip>
    </UnvDocStage>
  ),
};
