import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { ConfirmDialog } from '../../../src/unoovista/components/ConfirmDialog';
import { Button } from '../../../src/unoovista/components/Button';
import { PostCard } from '../../../src/unoovista/components/PostCard';
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

type Tom = 'default' | 'destructive';

/**
 * Uma tela com o diálogo fechado e o botão que o abre — o fundo recebe
 * `aria-hidden` enquanto o diálogo está aberto.
 */
const DialogoNaTela: React.FC<{
  tone?: Tom;
  theme?: 'light' | 'dark';
  initialOpen?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}> = ({ tone = 'default', theme = 'light', initialOpen = false, onConfirm, onCancel }) => {
  const [open, setOpen] = useState(initialOpen);
  const destrutivo = tone === 'destructive';

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
        <PostCard theme={theme}>
          <PostCard.Header username="lucasMar" avatarSrc={unvAvatars.lucasMar} theme={theme} />
          <PostCard.Media src={unvPhotos.forest} alt="Floresta ao amanhecer" aspectRatio={1.6} theme={theme} />
        </PostCard>
        <div>
          <Button block theme={theme} variant={destrutivo ? 'secondary' : 'primary'} onClick={() => setOpen(true)}>
            {destrutivo ? 'Descartar a seleção' : 'Publicar nas Histórias do grêmio'}
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={open}
        theme={theme}
        tone={tone}
        title={destrutivo ? 'Descartar a seleção?' : 'Publicar nas Histórias do grêmio?'}
        message={
          destrutivo
            ? 'Os três posts escolhidos e a legenda serão apagados. Isso não pode ser desfeito.'
            : 'Seus três posts e a legenda ficam visíveis para a turma no Mural.'
        }
        confirmLabel={destrutivo ? 'Descartar' : 'Publicar'}
        cancelLabel="Cancelar"
        onConfirm={() => {
          onConfirm?.();
          setOpen(false);
        }}
        onCancel={() => {
          onCancel?.();
          setOpen(false);
        }}
      />
    </div>
  );
};

/**
 * Página de documentação rica do componente ConfirmDialog.
 */
const ConfirmDialogDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Extensões"
      title="ConfirmDialog"
      description="Diálogo de confirmação de 300px sobre um véu roxo: título, mensagem e duas ações lado a lado em cápsulas de 44px — “Cancelar” em contorno e a confirmação preenchida. role=&quot;alertdialog&quot; com foco preso, ESC, fundo aria-hidden e foco devolvido; o foco abre em “Cancelar”."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Confirmar antes de uma ação que não volta."
    />
    <UnvDocGrid>
      <UnvDocCard icon="✅" title="Confirmação">
        Tom <code>default</code>: a confirmação preenchida no roxo de ação — “Publicar”, “Enviar”.
      </UnvDocCard>
      <UnvDocCard icon="🗑️" title="Destrutiva">
        Tom <code>destructive</code>: a confirmação preenchida no vermelho de alerta — “Descartar”. O
        foco abre em “Cancelar”, para que um Enter reflexo não apague nada.
      </UnvDocCard>
      <UnvDocCard icon="⏳" title="Em andamento">
        <code>busy</code> trava as duas ações e o ESC enquanto o servidor responde, e declara{' '}
        <code>aria-busy</code>.
      </UnvDocCard>
      <UnvDocCard icon="♿" title="alertdialog de verdade">
        Nomeado pelo título, descrito pela mensagem. O toque no véu NÃO cancela: um toque perdido não
        descarta a decisão.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações técnicas"
      description="Medidas e tokens do painel, do véu e das ações."
    />
    <UnvDocSpecs
      component="ConfirmDialog"
      layout="Painel · 300px · duas ações lado a lado"
      specs={[
        { label: 'Largura', value: '300px (encolhe em contêineres menores)' },
        { label: 'Superfície', value: '--unv-color-background-elevated' },
        { label: 'Elevação', value: '--unv-elevation-overlay · sem desfoque' },
        { label: 'Véu', value: '--unv-color-overlay-scrim' },
        { label: 'Raio', value: '16px (--unv-radius-l)' },
        { label: 'Título', value: 'title-lg · Open Sans 600 · 18/28px' },
        { label: 'Mensagem', value: 'body-md · text-secondary · 14/20px' },
        { label: 'Ação', value: '44px · cápsula (--unv-radius-full)' },
        { label: 'Confirmar', value: 'action-primary | brand-like preenchida' },
        { label: 'Cancelar', value: 'contorno border-control · text-primary' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Confirmar é botão preenchido, não texto colorido',
          detail:
            'como texto sobre a superfície elevada do tema escuro, action-primary mede 4,80:1 e brand-like, 4,07:1 (abaixo de 4,5:1); um rótulo em cor de ação também se leria como link, não como decisão. Preenchidas, o rótulo mede 4,88:1 (claro) e 8,27:1 (escuro) em action-primary/text-on-action, e 4,74:1 e 7,01:1 em brand-like/text-on-notification.',
        },
        {
          subject: 'Foco em text-primary',
          detail:
            'text-primary é o maior contraste disponível sobre a superfície elevada: 15,1:1 no claro e 10,4:1 no escuro (action-primary mede 4,80:1 no escuro).',
        },
        {
          subject: 'Foco abre sempre em “Cancelar”',
          detail:
            '“Cancelar” é a primeira ação no DOM e recebe o foco por initialFocusRef nos dois tons; a ordem do Tab acompanha a ordem visual (Cancelar, depois a confirmação).',
        },
        {
          subject: 'Ações lado a lado, com quebra',
          detail:
            'cada cápsula tem 44px de alto e largura mínima do próprio rótulo; se dois rótulos longos não cabem na linha, elas se empilham em vez de cortar o texto.',
        },
        {
          subject: 'O véu não cancela',
          detail: 'só “Cancelar” e o ESC cancelam. O contorno de “Cancelar” usa border-control (5,39:1 no escuro).',
        },
        {
          subject: 'Sem desfoque',
          detail: 'a separação do painel é o véu e --unv-elevation-overlay; nenhum backdrop-filter.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Véu, painel, título, mensagem e as duas ações. Toque no botão para abrir."
    />
    <UnvDocAnatomy
      zones={[
        { name: 'Véu', role: 'Cobre o contêiner posicionado e não cancela ao toque.', token: '--unv-color-overlay-scrim' },
        { name: 'Painel', role: 'Superfície de camada de 300px com o canto de 16px.', token: '--unv-color-background-elevated' },
        { name: 'Título e mensagem', role: 'Nome e descrição acessíveis do alertdialog.', token: 'title-lg · body-md' },
        { name: 'Cancelar', role: 'Cápsula em contorno; recebe o foco ao abrir.', token: '--unv-color-border-control' },
        { name: 'Confirmar', role: 'Cápsula preenchida no roxo de ação ou no vermelho de alerta.', token: '--unv-color-action-primary | --unv-color-brand-like' },
      ]}
    />
    <UnvDocStage label="Confirmação sobre a tela" align="flex-start" padding={0}>
      <DialogoNaTela />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Os dois tons. Cada diálogo abre pelo botão da própria tela."
    />
    <UnvDocStage label="tone" align="flex-start">
      <DialogoNaTela tone="default" />
      <DialogoNaTela tone="destructive" />
    </UnvDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Quando e como confirmar." />
    <UnvDocPractices
      dos={[
        'Renderizar dentro do contêiner da tela (position: relative): o véu cobre só ele.',
        'Escrever o título como pergunta e a mensagem com a consequência.',
        'Usar tone="destructive" em tudo o que apaga ou descarta.',
        'Ligar busy enquanto a ação espera o servidor.',
      ]}
      donts={[
        'Confirmar ações reversíveis — o diálogo interrompe.',
        'Fechar o diálogo no toque no véu.',
        'Acrescentar uma terceira ação.',
        'Acrescentar desfoque ao painel.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Superfície, texto, contorno e preenchimentos acompanham o tema."
    />
    <UnvDocThemeSwitcher padding={0}>
      {(activeTheme) => <DialogoNaTela key={activeTheme} theme={activeTheme} tone="destructive" />}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente ConfirmDialog."
    />
    <UnvDocPropsTable
      title="ConfirmDialog"
      rows={[
        { name: 'open', type: 'boolean', description: 'Abre o diálogo. Fechado, não renderiza nada. Obrigatório.' },
        { name: 'title', type: 'React.ReactNode', description: 'Título e nome acessível. Obrigatório.' },
        { name: 'message', type: 'React.ReactNode', description: 'Mensagem e descrição acessível.' },
        { name: 'confirmLabel', type: 'React.ReactNode', description: 'Rótulo da confirmação. Obrigatório.' },
        { name: 'cancelLabel', type: 'React.ReactNode', description: 'Rótulo de cancelar. Obrigatório.' },
        { name: 'onConfirm', type: '() => void', description: 'Ao confirmar. Obrigatório.' },
        { name: 'onCancel', type: '() => void', description: 'Ao cancelar ou no ESC. Obrigatório.' },
        {
          name: 'tone',
          type: "'default' | 'destructive'",
          default: "'default'",
          description: 'Cor da confirmação preenchida.',
        },
        { name: 'busy', type: 'boolean', default: 'false', description: 'Trava as ações e o ESC; aria-busy.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema visual; sem valor, herda do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Unoovista/Componentes/ConfirmDialog',
  component: ConfirmDialog,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Abre o diálogo.' },
    title: { control: 'text', description: 'Título.' },
    message: { control: 'text', description: 'Mensagem.' },
    confirmLabel: { control: 'text', description: 'Rótulo da confirmação.' },
    cancelLabel: { control: 'text', description: 'Rótulo de cancelar.' },
    tone: { control: 'radio', options: ['default', 'destructive'], description: 'Tom.' },
    busy: { control: 'boolean', description: 'Em andamento.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onConfirm: { action: 'onConfirm' },
    onCancel: { action: 'onCancel' },
  },
  args: {
    open: true,
    title: 'Publicar nas Histórias do grêmio?',
    message: 'Seus três posts e a legenda ficam visíveis para a turma no Mural.',
    confirmLabel: 'Publicar',
    cancelLabel: 'Cancelar',
    tone: 'default',
    busy: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmDialog>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ConfirmDialogDocumentationPage />,
};

/**
 * Playground com todas as propriedades do ConfirmDialog expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ConfirmDialog',
  render: (args) => (
    <div
      data-unv-theme={args.theme}
      style={{
        position: 'relative',
        width: 375,
        height: 420,
        backgroundColor: 'var(--unv-color-background-primary)',
      }}
    >
      <ConfirmDialog {...args} />
    </div>
  ),
};

/**
 * Os dois tons, cada um aberto sobre a própria tela.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <DialogoNaTela tone="default" />
      <DialogoNaTela tone="destructive" />
    </div>
  ),
};

/**
 * Destrutivo: o foco abre em Cancelar, o ESC cancela e o foco volta ao botão que abriu.
 */
export const Estados: Story = {
  args: { onConfirm: fn(), onCancel: fn() },
  render: (args) => (
    <DialogoNaTela tone="destructive" onConfirm={args.onConfirm} onCancel={args.onCancel} />
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const abrir = tela.getByRole('button', { name: 'Descartar a seleção' });

    await userEvent.click(abrir);
    const alerta = tela.getByRole('alertdialog', { name: 'Descartar a seleção?' });
    await expect(alerta).toHaveAccessibleDescription(
      'Os três posts escolhidos e a legenda serão apagados. Isso não pode ser desfeito.'
    );
    await waitFor(() => expect(within(alerta).getByRole('button', { name: 'Cancelar' })).toHaveFocus());

    await userEvent.keyboard('{Escape}');
    await expect(tela.queryByRole('alertdialog')).not.toBeInTheDocument();
    await expect(args.onCancel).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(abrir).toHaveFocus());

    await userEvent.click(abrir);
    await userEvent.click(tela.getByRole('button', { name: 'Descartar' }));
    await expect(args.onConfirm).toHaveBeenCalledTimes(1);
  },
};

/**
 * Em andamento: as ações não respondem e o ESC não fecha.
 */
export const EmAndamento: Story = {
  args: { busy: true, onConfirm: fn(), onCancel: fn() },
  render: (args) => (
    <div style={{ position: 'relative', width: 375, height: 320 }}>
      <ConfirmDialog {...args} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const alerta = tela.getByRole('alertdialog');

    await expect(alerta).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(within(alerta).getByRole('button', { name: 'Publicar' }));
    await userEvent.keyboard('{Escape}');
    await expect(args.onConfirm).not.toHaveBeenCalled();
    await expect(args.onCancel).not.toHaveBeenCalled();
  },
};
