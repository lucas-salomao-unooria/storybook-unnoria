import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { BottomSheet } from '../../../src/instanooria/components/BottomSheet';
import { Button } from '../../../src/instanooria/components/Button';
import { ListItem } from '../../../src/instanooria/components/ListItem';
import { Icon } from '../../../src/instanooria/components/Icon';
import { StoryViewer } from '../../../src/instanooria/components/StoryViewer';
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

/**
 * Conteúdo de demonstração da "Ficha técnica" de um post.
 */
const FichaTecnica: React.FC = () => (
  <dl style={{ margin: 0, display: 'grid', gap: 10 }}>
    {[
      ['Quem postou', 'craig_love'],
      ['Quando', 'Há 4 horas'],
      ['Onde', 'Cantina da escola'],
      ['Por que entrou no Story', 'Mostra o lanche novo que o grêmio conseguiu.'],
    ].map(([termo, valor]) => (
      <div key={termo}>
        <dt style={{ fontWeight: 590, fontSize: 13 }}>{termo}</dt>
        <dd style={{ margin: 0, color: 'var(--insta-color-text-secondary)' }}>{valor}</dd>
      </div>
    ))}
  </dl>
);

/**
 * A folha não modal sobre o Story — o caso da "Ficha técnica".
 */
const FichaSobreOStory: React.FC<{ theme?: 'light' | 'dark'; defaultOpen?: boolean }> = ({
  theme = 'dark',
  defaultOpen = false,
}) => (
  <div style={{ width: 300, height: 540, borderRadius: 12, overflow: 'hidden' }}>
    <StoryViewer
      theme={theme}
      mediaSrc={instaPhotos.coffee}
      mediaAlt="Lanche novo na cantina"
      username="craig_love"
      avatarSrc={instaAvatars.craig_love}
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
      data-insta-theme={theme}
      style={{
        position: 'relative',
        width: 375,
        height: 420,
        overflow: 'hidden',
        backgroundColor: 'var(--insta-color-background-primary)',
      }}
    >
      <div style={{ padding: 15 }}>
        <Button theme={theme} variant="secondary" onClick={() => setOpen(true)}>
          Abrir as opções
        </Button>
      </div>
      <BottomSheet open={open} onOpenChange={setOpen} title="Opções do post" theme={theme}>
        <div style={{ margin: '0 -15px' }}>
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
      badgeBrand="Instanooria"
      category="Componentes • Extensões"
      title="BottomSheet"
      description="A folha inferior do app real: cantos arredondados em cima, alça e a superfície de camada. Dois modos — modal, com véu e foco preso, e não modal, que fica sobre o conteúdo sem bloqueá-lo e alterna entre recolhida e expandida. Extensão: o arquivo publica só a gaveta lateral do menu do perfil."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Uma folha, dois comportamentos."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🗂️" title="Não modal — a ficha técnica">
        Recolhida, mostra só a alça e <code>collapsedLabel</code>. Expandida, ocupa até{' '}
        <code>maxHeight</code> e rola por dentro. O Story por baixo continua tocável.
      </InstaDocCard>
      <InstaDocCard icon="🪟" title="Modal — as opções">
        Véu, foco preso, ESC e toque no véu fecham, foco devolvido a quem abriu — o mesmo foco do{' '}
        <code>ConfirmDialog</code>.
      </InstaDocCard>
      <InstaDocCard icon="🎛️" title="Controlada ou não">
        Com <code>open</code> e <code>onOpenChange</code>, o produto manda. Sem <code>open</code>, a
        folha guarda o estado a partir de <code>defaultOpen</code>.
      </InstaDocCard>
      <InstaDocCard icon="♿" title="Disclosure acessível">
        No modo não modal, a alça é um botão com <code>aria-expanded</code> e{' '}
        <code>aria-controls</code>; o ESC recolhe e devolve o foco à alça.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="A gaveta lateral do menu do perfil é a única camada que o arquivo publica."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2938"
      frameName="Instagram Profile Menu → Profile Menu (a gaveta lateral)"
      specs={[
        { label: 'Superfície', value: '--insta-color-background-elevated' },
        { label: 'Raio superior', value: '10px (--insta-radius-l)' },
        { label: 'Alça', value: '36 × 4px · border-default' },
        { label: 'Título', value: 'Title/Large · 16/21px' },
        { label: 'Corpo', value: 'Body/Medium · calha de 15px' },
        { label: 'Separação', value: 'hairline-top de 0,33px' },
        { label: 'Véu (modal)', value: '--insta-color-overlay-scrim' },
        { label: 'Altura máxima', value: '85% (a missão usa 45%)' },
      ]}
    />
    <InstaDocDeviations
      items={[
        {
          subject: 'Sem quadro no arquivo de origem',
          detail:
            'o arquivo publica só a gaveta LATERAL do menu do perfil (0:1161 / 0:2938). Dela vêm a camada sobre a tela, o corpo Body/Medium e a separação por hairline; a forma inferior, com alça e cantos arredondados, é a do app real.',
        },
        {
          subject: 'Superfície elevated',
          detail:
            'a gaveta usa color/background/primary; a folha usa --insta-color-background-elevated, que o token descreve como “camadas elevadas (menus, sheets)” e que no escuro é #262626, como a folha do app.',
        },
        {
          subject: 'Chevron girado',
          detail:
            'a alça mostra o chevronDown do registro (Accounts List), girado 180° quando recolhida. Nenhum glifo novo.',
        },
        {
          subject: 'Sem arraste',
          detail:
            'no app a folha é arrastada. Aqui a alça é um botão — é o que dá acesso por teclado e leitor de tela.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Alça, título e corpo — a folha não modal sobre o Story, recolhida e expandida."
    />
    <InstaDocStage label="Não modal sobre o Story (maxHeight 45%)" align="flex-start">
      <FichaSobreOStory />
      <FichaSobreOStory defaultOpen />
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="O modo modal. Toque no véu para fechar e no botão para reabrir."
    />
    <InstaDocStage label="Modal" align="flex-start" padding={0}>
      <FolhaDeOpcoes initialOpen={false} />
    </InstaDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da folha." />
    <InstaDocPractices
      dos={[
        'Renderizar dentro de um contêiner posicionado (position: relative).',
        'Dar um título: é ele que nomeia a folha modal para o leitor de tela.',
        'Usar modal={false} para informação complementar que não interrompe.',
        'Limitar maxHeight quando a folha fica sobre mídia que precisa continuar visível.',
      ]}
      donts={[
        'Abrir duas folhas modais ao mesmo tempo.',
        'Acrescentar sombra para separá-la do fundo.',
        'Usar a folha modal para uma confirmação — essa é o ConfirmDialog.',
        'Envolver os filhos do StoryViewer num div de tela cheia: ele bloquearia as zonas de toque.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Superfície, alça e texto acompanham o tema."
    />
    <InstaDocThemeSwitcher initial="dark">
      {(activeTheme) => <FichaSobreOStory key={activeTheme} theme={activeTheme} defaultOpen />}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente BottomSheet."
    />
    <InstaDocPropsTable
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
        { name: 'theme', type: "'light' | 'dark'", default: "'light'", description: 'Tema visual.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof BottomSheet> = {
  title: 'Instanooria/Componentes/BottomSheet',
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
      data-insta-theme={args.theme}
      style={{
        position: 'relative',
        width: 375,
        height: 540,
        overflow: 'hidden',
        backgroundColor: 'var(--insta-color-background-primary)',
      }}
    >
      <img
        src={instaPhotos.coffee}
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
  render: () => <FichaSobreOStory />,
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
