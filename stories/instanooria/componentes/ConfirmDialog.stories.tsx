import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { ConfirmDialog } from '../../../src/instanooria/components/ConfirmDialog';
import { Button } from '../../../src/instanooria/components/Button';
import { PostCard } from '../../../src/instanooria/components/PostCard';
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
import { instaAvatars, instaPhotos } from '../fixtures';

type Tom = 'default' | 'destructive';

/**
 * Uma tela com o alerta fechado e o botão que o abre — o fundo recebe
 * `aria-hidden` enquanto o alerta está aberto.
 */
const AlertaNaTela: React.FC<{
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
      data-insta-theme={theme}
      style={{
        position: 'relative',
        width: 375,
        height: 420,
        overflow: 'hidden',
        backgroundColor: 'var(--insta-color-background-primary)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PostCard theme={theme}>
          <PostCard.Header username="jacob_w" avatarSrc={instaAvatars.jacob_w} theme={theme} />
          <PostCard.Media src={instaPhotos.forest} alt="Floresta ao amanhecer" aspectRatio={1.6} theme={theme} />
        </PostCard>
        <div style={{ padding: '0 15px' }}>
          <Button block theme={theme} variant={destrutivo ? 'secondary' : 'primary'} onClick={() => setOpen(true)}>
            {destrutivo ? 'Descartar os três posts' : 'Publicar no Story do grêmio'}
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={open}
        theme={theme}
        tone={tone}
        title={destrutivo ? 'Descartar a seleção?' : 'Publicar nos Stories do grêmio?'}
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
      badgeBrand="Instanooria"
      category="Componentes • Extensões"
      title="ConfirmDialog"
      description="O alerta do iOS que o Instagram usa: painel centralizado com título, mensagem e as ações empilhadas com divisórias finas — a confirmação primeiro, em peso forte, e “Cancelar” por último. role=&quot;alertdialog&quot; com foco preso, ESC, fundo aria-hidden e foco devolvido. Extensão sem quadro no arquivo de origem."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Confirmar antes de uma ação que não volta."
    />
    <InstaDocGrid>
      <InstaDocCard icon="✅" title="Confirmação">
        Tom <code>default</code>: a ação no azul de ação — “Publicar”, “Enviar”.
      </InstaDocCard>
      <InstaDocCard icon="🗑️" title="Destrutiva">
        Tom <code>destructive</code>: a ação no vermelho da marca — “Descartar”. O alerta abre com o
        foco em “Cancelar”, para que um Enter reflexo não apague nada.
      </InstaDocCard>
      <InstaDocCard icon="⏳" title="Em andamento">
        <code>busy</code> trava as duas ações e o ESC enquanto o servidor responde, e declara{' '}
        <code>aria-busy</code>.
      </InstaDocCard>
      <InstaDocCard icon="♿" title="alertdialog de verdade">
        Nomeado pelo título, descrito pela mensagem. O toque no véu NÃO cancela — como no iOS.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Sem quadro no arquivo: as ações são o par “Cancel” / “Next” da tela de adicionar imagem."
    />
    <InstaDocFigmaSpecs
      nodeId="0:3194"
      frameName="Instagram Add Image → Top Bar (Cancel · Next)"
      specs={[
        { label: 'Largura', value: '270px (alerta do iOS)' },
        { label: 'Superfície', value: '--insta-color-background-elevated' },
        { label: 'Véu', value: '--insta-color-overlay-scrim' },
        { label: 'Raio', value: '10px (--insta-radius-l)' },
        { label: 'Título', value: 'Title/Large · 16/21px' },
        { label: 'Mensagem', value: 'Label/Medium · text-secondary' },
        { label: 'Confirmar', value: 'Title/Large · action-primary | brand-like' },
        { label: 'Cancelar', value: 'Body/Large · text-primary' },
        { label: 'Ação', value: '44px · hairline de 0,33px no topo' },
      ]}
    />
    <InstaDocDeviations
      items={[
        {
          subject: 'Sem quadro no arquivo de origem',
          detail:
            'o arquivo não publica alerta nem diálogo. A forma é a do alerta do iOS; as duas ações repetem a tipografia do par “Cancel” / “Next” da barra da tela de adicionar imagem (0:3194), e a superfície é a de camada do token.',
        },
        {
          subject: 'Largura de 270px',
          detail: 'medida do alerta do sistema, não do arquivo. Encolhe em contêineres menores.',
        },
        {
          subject: 'Contraste das ações coloridas no tema claro',
          detail:
            'o azul de ação sobre a superfície mede 3,06:1 e o vermelho da marca, 3,70:1 — abaixo dos 4,5:1 de texto normal. São as cores que o pedido fixa e que o app usa; no escuro o azul passa de 4,9:1. Ressalva aberta, como a do Button primário.',
        },
        {
          subject: 'Sem sombra, sem desfoque',
          detail: 'o alerta do iOS tem fundo translúcido com blur; aqui a separação é só o véu (seção 2.3).',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Véu, painel, título, mensagem e a pilha de ações. Toque no botão para abrir."
    />
    <InstaDocStage label="Confirmação sobre a tela" align="flex-start" padding={0}>
      <AlertaNaTela />
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Os dois tons. Cada alerta abre pelo botão da própria tela."
    />
    <InstaDocStage label="tone" align="flex-start">
      <AlertaNaTela tone="default" />
      <AlertaNaTela tone="destructive" />
    </InstaDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Quando e como confirmar." />
    <InstaDocPractices
      dos={[
        'Renderizar dentro do contêiner da tela (position: relative): o véu cobre só ele.',
        'Escrever o título como pergunta e a mensagem com a consequência.',
        'Usar tone="destructive" em tudo o que apaga ou descarta.',
        'Ligar busy enquanto a ação espera o servidor.',
      ]}
      donts={[
        'Confirmar ações reversíveis — o alerta interrompe.',
        'Fechar o alerta no toque no véu: no iOS, ele não fecha.',
        'Empilhar mais de duas ações.',
        'Acrescentar sombra ou desfoque ao painel.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Superfície, texto e divisórias acompanham o tema."
    />
    <InstaDocThemeSwitcher padding={0}>
      {(activeTheme) => <AlertaNaTela key={activeTheme} theme={activeTheme} tone="destructive" />}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente ConfirmDialog."
    />
    <InstaDocPropsTable
      title="ConfirmDialog"
      rows={[
        { name: 'open', type: 'boolean', description: 'Abre o alerta. Fechado, não renderiza nada. Obrigatório.' },
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
          description: 'Cor da confirmação; o destrutivo abre com foco em Cancelar.',
        },
        { name: 'busy', type: 'boolean', default: 'false', description: 'Trava as ações e o ESC; aria-busy.' },
        { name: 'theme', type: "'light' | 'dark'", default: "'light'", description: 'Tema visual.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Instanooria/Componentes/ConfirmDialog',
  component: ConfirmDialog,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Abre o alerta.' },
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
    title: 'Publicar nos Stories do grêmio?',
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
      data-insta-theme={args.theme}
      style={{
        position: 'relative',
        width: 375,
        height: 420,
        backgroundColor: 'var(--insta-color-background-primary)',
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
      <AlertaNaTela tone="default" />
      <AlertaNaTela tone="destructive" />
    </div>
  ),
};

/**
 * Destrutivo: o foco abre em Cancelar, o ESC cancela e o foco volta ao botão.
 */
export const Estados: Story = {
  args: { onConfirm: fn(), onCancel: fn() },
  render: (args) => (
    <AlertaNaTela tone="destructive" onConfirm={args.onConfirm} onCancel={args.onCancel} />
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const abrir = tela.getByRole('button', { name: 'Descartar os três posts' });

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
