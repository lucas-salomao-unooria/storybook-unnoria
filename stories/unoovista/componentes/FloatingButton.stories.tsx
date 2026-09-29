import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { FloatingButton } from '../../../src/unoovista/components/FloatingButton';
import { MediaGrid } from '../../../src/unoovista/components/MediaGrid';
import { Button } from '../../../src/unoovista/components/Button';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocCard,
  UnvDocGrid,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocStage,
  UnvDocThemeSwitcher,
  UnvDocPropsTable,
} from '../../../.storybook/components';
import { unvGridItems } from '../fixtures';

const BAR = '#716C98';

/**
 * Uma tela posicionada com a grade rolando por baixo e a pílula por cima.
 */
const TelaComPilula: React.FC<{
  theme?: 'light' | 'dark';
  variant?: 'primary' | 'neutral';
  placement?: 'top' | 'bottom';
  label?: string;
  icon?: 'grid' | 'add' | 'chevronDown';
}> = ({
  theme,
  variant = 'primary',
  placement = 'top',
  label = 'Novas publicações',
  icon = 'chevronDown',
}) => (
  <div
    data-unv-theme={theme}
    style={{
      position: 'relative',
      width: 300,
      height: 320,
      overflow: 'hidden',
      borderRadius: 'var(--unv-radius-l)',
      backgroundColor: 'var(--unv-color-background-secondary)',
    }}
  >
    <div style={{ height: '100%', overflowY: 'auto', padding: 'var(--unv-spacing-xs)' }}>
      <MediaGrid items={unvGridItems} theme={theme} />
    </div>
    <FloatingButton theme={theme} variant={variant} placement={placement} icon={icon}>
      {label}
    </FloatingButton>
  </div>
);

/**
 * A pílula que some e volta — a transição respeita `prefers-reduced-motion`.
 */
const PilulaQueSome: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Button variant="secondary" onClick={() => setHidden((value) => !value)}>
        {hidden ? 'Mostrar a pílula' : 'Esconder a pílula'}
      </Button>
      <div
        style={{
          position: 'relative',
          width: 300,
          height: 120,
          borderRadius: 'var(--unv-radius-l)',
          backgroundColor: 'var(--unv-color-background-tertiary)',
        }}
      >
        <FloatingButton icon="chevronDown" hidden={hidden}>
          Novas publicações
        </FloatingButton>
      </div>
    </div>
  );
};

/**
 * Página de documentação rica do componente FloatingButton.
 */
const FloatingButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Extensões"
      title="FloatingButton"
      description="Pílula flutuante de 44px, com glifo e rótulo, centralizada sobre a tela no topo ou na base: o aviso de “novas publicações” que leva de volta ao início do feed, por exemplo. É uma cápsula de rótulo, não um botão circular; flutua com a elevação de sobreposição do tema e, escondida, sai da ordem de foco e da árvore de acessibilidade."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma ação que flutua sobre o conteúdo que rola."
    />
    <UnvDocGrid>
      <UnvDocCard icon="💊" title="Pílula, não círculo">
        A ação flutuante é uma cápsula de rótulo — “Novas publicações”, “Selecionar vários”. O
        rótulo diz o que ela faz sem depender de um glifo isolado.
      </UnvDocCard>
      <UnvDocCard icon="🎨" title="Duas variantes">
        <code>primary</code> no roxo de ação, com o rótulo em <code>text-on-action</code>;{' '}
        <code>neutral</code> na superfície elevada, com contorno fino.
      </UnvDocCard>
      <UnvDocCard icon="📍" title="Topo ou base">
        <code>placement</code> escolhe a borda e <code>offset</code> a distância — por exemplo, sob
        a barra superior ou acima da doca de navegação.
      </UnvDocCard>
      <UnvDocCard icon="🫥" title="Some com transição">
        <code>hidden</code> esmaece e desliza 8px; em <code>prefers-reduced-motion</code>, some sem
        movimento. Escondida, sai do foco e da árvore de acessibilidade.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UnvDocSpecs
      component="FloatingButton"
      layout="Pílula · 44px · flutuante"
      specs={[
        { label: 'Altura', value: '44px (--unv-touch-target)' },
        { label: 'Raio', value: 'total (--unv-radius-full)' },
        { label: 'Recuo lateral', value: '16px (--unv-spacing-l)' },
        { label: 'Glifo → rótulo', value: '8px (--unv-spacing-xs)' },
        { label: 'Primária', value: 'action-primary · text-on-action' },
        { label: 'Neutra', value: 'background-elevated · text-primary' },
        { label: 'Rótulo', value: 'title-sm · 14px' },
        { label: 'Elevação', value: '--unv-elevation-overlay' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Pílula de rótulo, no topo ou na base',
          detail:
            'a ação flutuante do sistema é uma cápsula com glifo e rótulo, não um círculo. A altura é o alvo de toque de 44px, e o botão aceita só nomes do registro de ícones (UnvIconName): nenhum glifo é desenhado.',
        },
        {
          subject: 'Elevação de sobreposição nas duas variantes',
          detail:
            'a pílula paira sobre o conteúdo com --unv-elevation-overlay, o mesmo degrau da doca, dos menus e das folhas. A variante primária ganha ainda um contorno de 2px na cor da superfície elevada, para se destacar sobre fotografia; a neutra, um contorno de 1px em border-default.',
        },
        {
          subject: 'Contraste do rótulo da primária',
          detail:
            'text-on-action sobre action-primary mede 4,88:1 no tema claro (branco sobre #716C98) e 8,27:1 no escuro (#080922 sobre #AAA5C2), acima dos 4,5:1 de texto. No hover e no pressionado o fundo passa a action-pressed: 7,07:1 no claro e 12,10:1 no escuro.',
        },
        {
          subject: 'Rótulo da neutra',
          detail:
            'text-primary sobre background-elevated mede 15,1:1 no claro e 10,4:1 no escuro. O hover troca o fundo para background-secondary.',
        },
        {
          subject: 'Escondida sai da árvore de acessibilidade',
          detail:
            'hidden aplica aria-hidden, tabIndex -1 e visibility oculta ao fim da transição de 200ms; pointer-events também é desligado. A transição some com prefers-reduced-motion.',
        },
        {
          subject: 'Tema herdado',
          detail:
            'theme é opcional e sem valor padrão: sem ele, a pílula herda data-unv-theme do contêiner.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Glifo e rótulo numa cápsula, sobre o contêiner posicionado da tela."
    />
    <UnvDocStage surface="secondary" align="flex-start" padding={24} gap={32}>
      <TelaComPilula />
      <div style={{ flex: '1 1 320px' }}>
        <UnvDocAnatomy
          zones={[
            {
              name: 'Cápsula',
              role: 'Superfície de 44px de altura e raio total, com contorno e elevação de sobreposição.',
              token: '--unv-radius-full · --unv-elevation-overlay',
            },
            {
              name: 'Glifo',
              role: 'Glifo opcional do registro de ícones, antes do rótulo.',
              token: 'prop icon',
            },
            {
              name: 'Rótulo',
              role: 'Texto curto, em title-sm; trunca com reticências se faltar espaço.',
              token: '--unv-font-title-sm-size',
            },
            {
              name: 'Contêiner',
              role: 'A pílula se posiciona sobre o contêiner com position: relative mais próximo.',
              token: 'prop placement · prop offset',
            },
          ]}
        />
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Variantes, bordas e o estado escondido."
    />
    <UnvDocStage label="variant × placement" surface="secondary" align="flex-start" padding={24}>
      <TelaComPilula variant="primary" placement="top" />
      <TelaComPilula variant="neutral" placement="bottom" label="Selecionar vários" icon="grid" />
    </UnvDocStage>
    <UnvDocStage label="hidden" surface="secondary" align="flex-start" padding={24}>
      <PilulaQueSome />
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso da pílula." />
    <UnvDocPractices
      dos={[
        'Posicionar o contêiner da TELA, não o da rolagem — senão a pílula rola junto.',
        'Usar rótulos curtos, de uma a três palavras.',
        'Esconder com hidden em vez de desmontar, para a transição acontecer.',
        'Usar offset para livrar a barra superior ou a doca de navegação.',
      ]}
      donts={[
        'Transformar a pílula em um botão circular só com glifo.',
        'Usar duas pílulas na mesma borda.',
        'Passar um glifo desenhado à mão — só nomes do registro.',
        'Trocar a elevação de sobreposição por sombras avulsas.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="As duas variantes acompanham o tema."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={24}>
      {(activeTheme) => (
        <>
          <TelaComPilula theme={activeTheme} />
          <TelaComPilula
            theme={activeTheme}
            variant="neutral"
            placement="bottom"
            label="Selecionar vários"
            icon="grid"
          />
        </>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do componente FloatingButton."
    />
    <UnvDocPropsTable
      title="FloatingButton"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo da pílula. Obrigatório.' },
        { name: 'icon', type: 'UnvIconName', description: 'Glifo do registro antes do rótulo.' },
        { name: 'variant', type: "'primary' | 'neutral'", default: "'primary'", description: 'Variante visual.' },
        { name: 'placement', type: "'top' | 'bottom'", default: "'top'", description: 'Borda do contêiner.' },
        {
          name: 'offset',
          type: 'number | string',
          default: "'var(--unv-spacing-l)'",
          description: 'Distância até a borda escolhida.',
        },
        { name: 'hidden', type: 'boolean', default: 'false', description: 'Esconde com transição.' },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Tema visual. Sem valor, herda o do contêiner.',
        },
        {
          name: '...rest',
          type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
          description: 'Repassados ao botão (onClick, aria-*).',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof FloatingButton> = {
  title: 'Unoovista/Componentes/FloatingButton',
  component: FloatingButton,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Rótulo.' },
    icon: {
      control: 'select',
      options: [undefined, 'chevronDown', 'grid', 'add', 'camera'],
      description: 'Glifo.',
    },
    variant: { control: 'radio', options: ['primary', 'neutral'], description: 'Variante.' },
    placement: { control: 'radio', options: ['top', 'bottom'], description: 'Borda.' },
    offset: { control: 'number', description: 'Distância da borda, em px.' },
    hidden: { control: 'boolean', description: 'Escondida.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onClick: { action: 'onClick' },
  },
  args: {
    children: 'Novas publicações',
    icon: 'chevronDown',
    variant: 'primary',
    placement: 'top',
    offset: 16,
    hidden: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof FloatingButton>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <FloatingButtonDocumentationPage />,
};

/**
 * Playground com todas as propriedades do FloatingButton expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do FloatingButton',
  render: (args) => (
    <UnvDocStage theme={args.theme} surface="secondary" align="flex-start" padding={24}>
      <div
        style={{
          position: 'relative',
          width: 375,
          height: 320,
          overflow: 'hidden',
          borderRadius: 'var(--unv-radius-l)',
          backgroundColor: 'var(--unv-color-background-secondary)',
        }}
      >
        <div style={{ padding: 'var(--unv-spacing-xs)' }}>
          <MediaGrid items={unvGridItems} theme={args.theme} />
        </div>
        <FloatingButton {...args} />
      </div>
    </UnvDocStage>
  ),
};

/**
 * A pílula neutra, na base, sobre a grade de escolha de imagens.
 */
export const EmContexto: Story = {
  name: '🎨 Exemplo Oficial: “Selecionar vários”',
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={24}>
      <TelaComPilula variant="neutral" placement="bottom" label="Selecionar vários" icon="grid" />
    </UnvDocStage>
  ),
};

/**
 * As duas variantes, no topo e na base.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={24}>
      <TelaComPilula variant="primary" placement="top" />
      <TelaComPilula variant="neutral" placement="bottom" label="Selecionar vários" icon="grid" />
    </UnvDocStage>
  ),
};

/**
 * As duas variantes nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UnvDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={tema}
          surface="secondary"
          align="flex-start"
          padding={24}
        >
          <TelaComPilula variant="primary" placement="top" />
          <TelaComPilula variant="neutral" placement="bottom" label="Selecionar vários" icon="grid" />
        </UnvDocStage>
      ))}
    </div>
  ),
};

/**
 * Escondida, a pílula sai da árvore de acessibilidade e volta ao mostrar.
 */
export const Estados: Story = {
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={24}>
      <PilulaQueSome />
    </UnvDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('button', { name: 'Novas publicações' })).toBeInTheDocument();
    await userEvent.click(tela.getByRole('button', { name: 'Esconder a pílula' }));
    await expect(tela.queryByRole('button', { name: 'Novas publicações' })).not.toBeInTheDocument();
    await userEvent.click(tela.getByRole('button', { name: 'Mostrar a pílula' }));
    await expect(tela.getByRole('button', { name: 'Novas publicações' })).toBeInTheDocument();
  },
};
