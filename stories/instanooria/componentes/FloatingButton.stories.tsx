import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { FloatingButton } from '../../../src/instanooria/components/FloatingButton';
import { MediaGrid } from '../../../src/instanooria/components/MediaGrid';
import { Button } from '../../../src/instanooria/components/Button';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocDeviations,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaGridItems } from '../fixtures';

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
  theme = 'light',
  variant = 'primary',
  placement = 'top',
  label = 'Novas publicações',
  icon = 'chevronDown',
}) => (
  <div
    data-insta-theme={theme}
    style={{
      position: 'relative',
      width: 300,
      height: 320,
      overflow: 'hidden',
      backgroundColor: 'var(--insta-color-background-primary)',
    }}
  >
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <MediaGrid items={instaGridItems} theme={theme} />
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
          backgroundColor: 'var(--insta-color-background-tertiary)',
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
      badgeBrand="Instanooria"
      category="Componentes • Extensões"
      title="FloatingButton"
      description="A pílula flutuante do app real — a de “Novas publicações”: glifo e rótulo numa cápsula de 32px, centralizada sobre a tela, no topo ou na base. O Instagram não tem FAB circular. Extensão: a medida é a da pílula “Select multiple” da tela de adicionar imagem."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Uma ação que flutua sobre o conteúdo que rola."
    />
    <InstaDocGrid>
      <InstaDocCard icon="💊" title="Pílula, não círculo">
        O Instagram resolve a ação flutuante com uma cápsula de rótulo — “Novas publicações”,
        “Select multiple”. Um FAB circular seria de outro app.
      </InstaDocCard>
      <InstaDocCard icon="🎨" title="Duas variantes">
        <code>primary</code> no azul de ação; <code>neutral</code> na superfície de camada, como a
        pílula do quadro.
      </InstaDocCard>
      <InstaDocCard icon="📍" title="Topo ou base">
        <code>placement</code> escolhe a borda e <code>offset</code> a distância — por exemplo, sob
        a TopBar.
      </InstaDocCard>
      <InstaDocCard icon="🫥" title="Some com transição">
        <code>hidden</code> esmaece e desliza 8px; em <code>prefers-reduced-motion</code>, some sem
        movimento. Escondida, sai do foco e da árvore de acessibilidade.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="A pílula “Select multiple”, a única flutuante que o arquivo publica."
    />
    <InstaDocFigmaSpecs
      nodeId="0:3218"
      frameName="Instagram Add Image → Select Multiple"
      specs={[
        { label: 'Altura', value: '32px' },
        { label: 'Raio', value: 'total (--insta-radius-full)' },
        { label: 'Recuo', value: '12px (--insta-spacing-m)' },
        { label: 'Glifo → rótulo', value: '10px (--insta-spacing-s)' },
        { label: 'Neutra', value: 'background-elevated · text-primary' },
        { label: 'Primária', value: 'action-primary · branco' },
        { label: 'Rótulo', value: 'Title/Small · 14px' },
        { label: 'Distância da borda', value: '16px (--insta-spacing-l)' },
      ]}
    />
    <InstaDocDeviations
      items={[
        {
          subject: 'Sem quadro de botão flutuante',
          detail:
            'o arquivo não publica FAB nem a pílula “Novas publicações”. A medida e a variante neutra vêm da pílula “Select multiple” (0:3218); a primária usa o azul e o branco do Button primário.',
        },
        {
          subject: 'Rótulo em Title/Small',
          detail:
            'no quadro, “SELECT MULTIPLE” é Overline/Default (11px) em caixa alta. A pílula usa Title/Small, o degrau dos rótulos de botão, como “Novas publicações” no app.',
        },
        {
          subject: 'Contorno na variante neutra',
          detail:
            'no quadro a pílula fica sobre a fotografia; sobre a tela branca ela sumiria. Ganhou o contorno do Button secundário — sem sombra (seção 2.3).',
        },
        {
          subject: 'Glifo do registro',
          detail:
            'o glifo de “Select multiple” não está no registro; a pílula aceita só nomes do registro (InstaIconName). A seta de “Novas publicações” também não existe — nenhum glifo foi desenhado.',
        },
        {
          subject: 'Contraste da primária',
          detail:
            'branco sobre --insta-color-action-primary mede 3,06:1, abaixo dos 4,5:1 de texto de 14px. É o par do Button primário; ressalva aberta.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Glifo e rótulo numa cápsula, sobre o contêiner posicionado da tela."
    />
    <InstaDocStage label="Pílula sobre a grade que rola" align="flex-start">
      <TelaComPilula />
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Variantes, bordas e o estado escondido."
    />
    <InstaDocStage label="variant × placement" align="flex-start">
      <TelaComPilula variant="primary" placement="top" />
      <TelaComPilula variant="neutral" placement="bottom" label="Selecionar vários" icon="grid" />
    </InstaDocStage>
    <InstaDocStage label="hidden" align="flex-start">
      <PilulaQueSome />
    </InstaDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da pílula." />
    <InstaDocPractices
      dos={[
        'Posicionar o contêiner da TELA, não o da rolagem — senão a pílula rola junto.',
        'Usar rótulos curtos, de uma a três palavras.',
        'Esconder com hidden em vez de desmontar, para a transição acontecer.',
        'Usar offset para livrar a TopBar ou a TabBar.',
      ]}
      donts={[
        'Reproduzir um FAB circular: o Instagram não tem.',
        'Usar duas pílulas na mesma borda.',
        'Passar um glifo desenhado à mão — só nomes do registro.',
        'Acrescentar sombra para destacar a pílula.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="As duas variantes acompanham o tema."
    />
    <InstaDocThemeSwitcher>
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
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente FloatingButton."
    />
    <InstaDocPropsTable
      title="FloatingButton"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo da pílula. Obrigatório.' },
        { name: 'icon', type: 'InstaIconName', description: 'Glifo do registro antes do rótulo.' },
        { name: 'variant', type: "'primary' | 'neutral'", default: "'primary'", description: 'Variante visual.' },
        { name: 'placement', type: "'top' | 'bottom'", default: "'top'", description: 'Borda do contêiner.' },
        {
          name: 'offset',
          type: 'number | string',
          default: "'var(--insta-spacing-l)'",
          description: 'Distância até a borda escolhida.',
        },
        { name: 'hidden', type: 'boolean', default: 'false', description: 'Esconde com transição.' },
        { name: 'theme', type: "'light' | 'dark'", default: "'light'", description: 'Tema visual.' },
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
  title: 'Instanooria/Componentes/FloatingButton',
  component: FloatingButton,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Rótulo.' },
    icon: { control: 'select', options: [undefined, 'chevronDown', 'grid', 'add', 'camera'], description: 'Glifo.' },
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
    <div
      data-insta-theme={args.theme}
      style={{
        position: 'relative',
        width: 375,
        height: 320,
        overflow: 'hidden',
        backgroundColor: 'var(--insta-color-background-primary)',
      }}
    >
      <MediaGrid items={instaGridItems} theme={args.theme} />
      <FloatingButton {...args} />
    </div>
  ),
};

/**
 * A pílula "Select multiple" do quadro, na variante neutra, sobre a grade.
 */
export const EmContexto: Story = {
  name: '🎨 Em Contexto — “Select multiple”',
  render: () => (
    <TelaComPilula variant="neutral" placement="bottom" label="Selecionar vários" icon="grid" />
  ),
};

/**
 * Escondida, a pílula sai da árvore de acessibilidade e volta ao mostrar.
 */
export const Estados: Story = {
  render: () => <PilulaQueSome />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('button', { name: 'Novas publicações' })).toBeInTheDocument();
    await userEvent.click(tela.getByRole('button', { name: 'Esconder a pílula' }));
    await expect(tela.queryByRole('button', { name: 'Novas publicações' })).not.toBeInTheDocument();
    await userEvent.click(tela.getByRole('button', { name: 'Mostrar a pílula' }));
    await expect(tela.getByRole('button', { name: 'Novas publicações' })).toBeInTheDocument();
  },
};
