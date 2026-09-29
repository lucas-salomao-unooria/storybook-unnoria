import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { BottomSheet } from '../../../src/unoovista/components/BottomSheet';
import { Button } from '../../../src/unoovista/components/Button';
import { ListItem } from '../../../src/unoovista/components/ListItem';
import { Icon } from '../../../src/unoovista/components/Icon';
import { StoryViewer } from '../../../src/unoovista/components/StoryViewer';
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
import { unvAvatars, unvPhotos } from '../fixtures';

/**
 * Conteúdo de demonstração da "Ficha técnica" de um post.
 */
const FichaTecnica: React.FC = () => (
  <dl style={{ margin: 0, display: 'grid', gap: 10 }}>
    {[
      ['Quem postou', 'biaRaiz'],
      ['Quando', 'Há 4 horas'],
      ['Onde', 'Cantina da escola'],
      ['Por que entrou na história', 'Mostra o lanche novo que o grêmio conseguiu.'],
    ].map(([termo, valor]) => (
      <div key={termo}>
        <dt style={{ fontWeight: 600, fontSize: 13 }}>{termo}</dt>
        <dd style={{ margin: 0, color: 'var(--unv-color-text-secondary)' }}>{valor}</dd>
      </div>
    ))}
  </dl>
);

/**
 * A folha não modal sobre uma história — o caso da "Ficha técnica".
 */
const FichaSobreAHistoria: React.FC<{ theme?: 'light' | 'dark'; defaultOpen?: boolean }> = ({
  theme = 'dark',
  defaultOpen = false,
}) => (
  <div style={{ width: 300, height: 540, borderRadius: 12, overflow: 'hidden' }}>
    <StoryViewer
      theme={theme}
      mediaSrc={unvPhotos.coffee}
      mediaAlt="Lanche novo na cantina"
      username="biaRaiz"
      avatarSrc={unvAvatars.biaRaiz}
      timestamp="4h"
      segments={3}
      currentSegment={1}
      segmentProgress={0.4}
    >
      <BottomSheet
        modal={false}
        theme={theme}
        defaultOpen={defaultOpen}
        maxHeight="45%"
        collapsedLabel="Ver detalhes da postagem"
        title="Ficha técnica"
      >
        <FichaTecnica />
      </BottomSheet>
    </StoryViewer>
  </div>
);

/**
 * A folha modal de opções, aberta por um botão.
 */
const FolhaDeOpcoes: React.FC<{ theme?: 'light' | 'dark'; initialOpen?: boolean }> = ({
  theme = 'light',
  initialOpen = true,
}) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <div
      data-unv-theme={theme}
      style={{
        position: 'relative',
        width: 375,
        height: 420,
        overflow: 'hidden',
        backgroundColor: 'var(--unv-color-background-secondary)',
      }}
    >
      <div style={{ padding: 16 }}>
        <Button theme={theme} variant="secondary" onClick={() => setOpen(true)}>
          Abrir as opções
        </Button>
      </div>
      <BottomSheet open={open} onOpenChange={setOpen} title="Opções do post" theme={theme}>
        <div style={{ margin: '0 -16px' }}>
          <ListItem
            theme={theme}
            leading={<Icon name="bookmark" theme={theme} />}
            title="Salvar"
            onClick={() => setOpen(false)}
          />
          <ListItem
            theme={theme}
            leading={<Icon name="share" theme={theme} />}
            title="Compartilhar"
            onClick={() => setOpen(false)}
          />
        </div>
      </BottomSheet>
    </div>
  );
};

/**
 * Página de documentação rica do componente BottomSheet.
 */
const BottomSheetDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Extensões"
      title="BottomSheet"
      description="A folha inferior em camadas: superfície elevada com sombra de sobreposição, cantos arredondados só no topo e uma alça centralizada. Dois modos — modal, com véu roxo e foco preso, e não modal, que fica sobre o conteúdo sem bloqueá-lo e alterna entre recolhida e expandida. Sem arraste."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Uma folha, dois comportamentos."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🗂️" title="Não modal — a ficha técnica">
        Recolhida, mostra só a alça e <code>collapsedLabel</code>. Expandida, ocupa até{' '}
        <code>maxHeight</code> e rola por dentro. A história por baixo continua tocável.
      </UnvDocCard>
      <UnvDocCard icon="🪟" title="Modal — as opções">
        Véu, foco preso, ESC e toque no véu fecham, foco devolvido a quem abriu — o mesmo foco do{' '}
        <code>ConfirmDialog</code>.
      </UnvDocCard>
      <UnvDocCard icon="🎛️" title="Controlada ou não">
        Com <code>open</code> e <code>onOpenChange</code>, o produto manda. Sem <code>open</code>, a
        folha guarda o estado a partir de <code>defaultOpen</code>.
      </UnvDocCard>
      <UnvDocCard icon="♿" title="Disclosure acessível">
        No modo não modal, a alça é um botão com <code>aria-expanded</code> e{' '}
        <code>aria-controls</code>; o ESC recolhe e devolve o foco à alça.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações técnicas"
      description="Superfície, alça, título e corpo da folha."
    />
    <UnvDocSpecs
      component="BottomSheet"
      layout="Folha · largura total · até 85% da altura"
      specs={[
        { label: 'Superfície', value: '--unv-color-background-elevated' },
        { label: 'Elevação', value: '--unv-elevation-overlay' },
        { label: 'Raio superior', value: '16px (--unv-radius-l)' },
        { label: 'Alça', value: '40 × 4px · --unv-color-border-control' },
        { label: 'Título', value: 'title-lg · Open Sans 600 · 18/28px' },
        { label: 'Alça recolhida', value: 'title-md · 16/24px · alvo de 44px' },
        { label: 'Corpo', value: 'body-md · 14/20px · calha de 16px' },
        { label: 'Véu (modal)', value: '--unv-color-overlay-scrim' },
        { label: 'Altura máxima', value: '85% (padrão) — configurável' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Sombra de sobreposição no lugar de fio',
          detail:
            'a folha se separa do conteúdo por --unv-elevation-overlay (e, no modal, pelo véu), não por um fio de largura total. É uma das superfícies em que o módulo permite sombra.',
        },
        {
          subject: 'Alça em border-control',
          detail:
            'a alça é o gesto de abrir/recolher do modo não modal e precisa ser vista: border-control mede 4,96:1 (claro) e 5,39:1 (escuro) sobre a superfície elevada. border-default mediria 1,6:1 nos dois temas:1.',
        },
        {
          subject: 'Foco em text-primary',
          detail:
            'text-primary mede 15,1:1 (claro) e 10,4:1 (escuro) sobre a superfície elevada; action-primary mede 4,80:1 no escuro.',
        },
        {
          subject: 'Sem arraste',
          detail:
            'a alça é um botão (aria-expanded), o que dá acesso por teclado e leitor de tela; no modal, fecham o ESC e o toque no véu.',
        },
        {
          subject: 'Título à esquerda, chevron à direita',
          detail:
            'na alça recolhida o rótulo fica à esquerda e o chevronDown do registro, à direita, girado 180° quando recolhida. Nenhum glifo novo.',
        },
        {
          subject: 'Botão de fechar',
          detail: 'a folha não desenha um X: o fechamento é pelo ESC, pelo véu ou por uma ação do conteúdo. Um X, quando o produto o incluir, deve ter 48px.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Alça, título e corpo — a folha não modal sobre uma história, recolhida e expandida."
    />
    <UnvDocAnatomy
      zones={[
        { name: 'Alça', role: 'Botão com aria-expanded no modo não modal; enfeite no modal.', token: '--unv-color-border-control' },
        { name: 'Título', role: 'Nome do diálogo (modal) ou rótulo da alça expandida (não modal).', token: 'title-lg' },
        { name: 'Corpo', role: 'Conteúdo rolável, com a calha do módulo.', token: 'body-md' },
        { name: 'Véu', role: 'Só no modo modal; o toque nele fecha a folha.', token: '--unv-color-overlay-scrim' },
      ]}
    />
    <UnvDocStage label="Não modal sobre uma história (maxHeight 45%)" align="flex-start">
      <FichaSobreAHistoria />
      <FichaSobreAHistoria defaultOpen />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="O modo modal. Toque no véu para fechar e no botão para reabrir."
    />
    <UnvDocStage label="Modal" align="flex-start" padding={0}>
      <FolhaDeOpcoes initialOpen={false} />
    </UnvDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da folha." />
    <UnvDocPractices
      dos={[
        'Renderizar dentro de um contêiner posicionado (position: relative).',
        'Dar um título: é ele que nomeia a folha modal para o leitor de tela.',
        'Usar modal={false} para informação complementar que não interrompe.',
        'Limitar maxHeight quando a folha fica sobre mídia que precisa continuar visível.',
      ]}
      donts={[
        'Abrir duas folhas modais ao mesmo tempo.',
        'Trocar a sombra de sobreposição por um fio de largura total.',
        'Usar a folha modal para uma confirmação — essa é o ConfirmDialog.',
        'Envolver os filhos do StoryViewer num div de tela cheia: ele bloquearia as zonas de toque.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Superfície, alça e texto acompanham o tema."
    />
    <UnvDocThemeSwitcher initial="dark">
      {(activeTheme) => <FichaSobreAHistoria key={activeTheme} theme={activeTheme} defaultOpen />}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente BottomSheet."
    />
    <UnvDocPropsTable
      title="BottomSheet"
      rows={[
        { name: 'open', type: 'boolean', description: 'Aberta/expandida. Informada, a folha é controlada.' },
        { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Estado inicial sem open.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Alça, ESC ou véu pedem mudança.' },
        { name: 'modal', type: 'boolean', default: 'true', description: 'Véu e foco preso, ou folha sobre o conteúdo.' },
        { name: 'title', type: 'React.ReactNode', description: 'Título; nome acessível do modo modal.' },
        {
          name: 'collapsedLabel',
          type: 'React.ReactNode',
          default: "'Ver detalhes'",
          description: 'Rótulo da alça recolhida (não modal).',
        },
        { name: 'maxHeight', type: 'number | string', default: "'85%'", description: 'Altura máxima da folha.' },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo; rola por dentro.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema visual; sem valor, herda do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof BottomSheet> = {
  title: 'Unoovista/Componentes/BottomSheet',
  component: BottomSheet,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Aberta/expandida.' },
    defaultOpen: { control: 'boolean', description: 'Estado inicial sem open.' },
    modal: { control: 'boolean', description: 'Modal ou sobre o conteúdo.' },
    title: { control: 'text', description: 'Título.' },
    collapsedLabel: { control: 'text', description: 'Rótulo da alça recolhida.' },
    maxHeight: { control: 'text', description: 'Altura máxima.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onOpenChange: { action: 'onOpenChange' },
  },
  args: {
    open: true,
    modal: false,
    title: 'Ficha técnica',
    collapsedLabel: 'Ver detalhes da postagem',
    maxHeight: '45%',
    theme: 'dark',
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BottomSheetDocumentationPage />,
};

/**
 * Playground com todas as propriedades da BottomSheet expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da BottomSheet',
  render: (args) => (
    <div
      data-unv-theme={args.theme}
      style={{
        position: 'relative',
        width: 375,
        height: 540,
        overflow: 'hidden',
        backgroundColor: 'var(--unv-color-background-secondary)',
      }}
    >
      <img
        src={unvPhotos.coffee}
        alt="Lanche novo na cantina"
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <BottomSheet {...args}>
        <FichaTecnica />
      </BottomSheet>
    </div>
  ),
};

/**
 * Não modal: a alça expande, o ESC recolhe e devolve o foco à alça.
 */
export const Estados: Story = {
  render: () => <FichaSobreAHistoria />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const alca = tela.getByRole('button', { name: 'Ver detalhes da postagem' });

    await expect(alca).toHaveAttribute('aria-expanded', 'false');
    await expect(tela.queryByText('Quem postou')).not.toBeVisible();

    await userEvent.click(alca);
    await expect(alca).toHaveAttribute('aria-expanded', 'true');
    await expect(alca).toHaveAccessibleName('Ficha técnica');
    await expect(tela.getByText('Quem postou')).toBeVisible();

    await userEvent.keyboard('{Escape}');
    await expect(alca).toHaveAttribute('aria-expanded', 'false');
    await expect(alca).toHaveFocus();
  },
};

/**
 * Modal: o ESC fecha e o botão reabre, com o foco dentro da folha.
 */
export const Modal: Story = {
  render: () => <FolhaDeOpcoes />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    const folha = tela.getByRole('dialog', { name: 'Opções do post' });
    await waitFor(() => expect(folha.contains(document.activeElement)).toBe(true));
    await userEvent.keyboard('{Escape}');
    await expect(tela.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(tela.getByRole('button', { name: 'Abrir as opções' }));
    await expect(tela.getByRole('dialog', { name: 'Opções do post' })).toBeInTheDocument();
  },
};
