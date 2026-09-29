import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocAnatomy,
  UncDocPractices,
  UncDocPropsTable,
  UncDocStage,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import {
  BottomSheet,
  Button,
  ChatWallpaper,
  ListItem,
  Avatar,
  MessageBubble,
} from '../../../src/unoochat';
import { uncWallpaperFor } from '../fixtures';

const BAR = '#716C98';

/**
 * A folha "Encaminhar para..." sobre uma conversa, com reabertura.
 */
const FolhaDeEncaminhar: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ position: 'relative', width: 375, height: 480, overflow: 'hidden' }}>
      <ChatWallpaper src={uncWallpaperFor(theme)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '18px 12px' }}>
          <MessageBubble direction="in" sender="Bruno Reis" time="08:12">
            O ônibus furou o pneu perto da praça.
          </MessageBubble>
          <Button onClick={() => setOpen(true)}>Abrir a folha</Button>
        </div>
      </ChatWallpaper>
      <BottomSheet
        open={open}
        title="Encaminhar para..."
        onClose={() => setOpen(false)}
        footer={<Button onClick={() => setOpen(false)}>Enviar</Button>}
      >
        <ListItem
          leading={<Avatar initials="MT" size="md" />}
          title="Mural da Turma"
          subtitle="Conversa com a professora"
        />
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
      badgeBrand="Unoochat"
      category="Componentes • Extensões"
      title="BottomSheet"
      description="Folha inferior modal com puxador, título, corpo livre e rodapé, sobre o véu do módulo. Extensão própria do Unoochat: a folha de anexos tem vocabulário fechado, e esta usa a mesma superfície (--unc-color-surface-sheet) com conteúdo livre."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="📤" title="Escolher um destino">
        “Encaminhar para...”: a lista de conversas de destino e o botão de enviar.
      </UncDocCard>
      <UncDocCard icon="⌨️" title="Modal de verdade">
        Prende o foco, fecha no ESC e no toque no véu, e devolve o foco a quem abriu — o mesmo
        comportamento do <code>Dialog</code>.
      </UncDocCard>
      <UncDocCard icon="🧩" title="Corpo livre">
        As linhas são <code>ListItem</code> do pacote; a folha só dá a superfície.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="BottomSheet"
      layout="Folha modal · até 85% do contêiner"
      specs={[
        { label: 'Superfície', value: '--unc-color-surface-sheet' },
        { label: 'Véu', value: 'rgba(14,16,57,0.6) (--unc-color-scrim)' },
        { label: 'Raio superior', value: '8px (--unc-radius-xl)' },
        { label: 'Puxador', value: '32 × 4px · --unc-color-text-secondary' },
        { label: 'Título', value: 'Open Sans 600 · 18px' },
        { label: 'Elevação', value: '--unc-elevation-overlay' },
        { label: 'Altura máxima', value: '85% do contêiner' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Extensão do módulo',
          detail:
            'as medidas vêm dos componentes vizinhos do Unoochat: a superfície e o raio superior, da AttachmentSheet; o véu, do Dialog; a calha lateral, de --unc-gutter (19px). O título usa o degrau title-sm (Open Sans 600, 18px) do módulo, e o espaçamento vem dos degraus da Unooria (8, 10, 12 e 16px). A AttachmentSheet segue existindo para a grade de anexos, que tem vocabulário próprio.',
        },
        {
          subject: 'Elevação por tema',
          detail:
            '--unc-elevation-overlay é a mesma dos menus e diálogos: sombra roxa difusa no claro (brand-secondary da Unooria) e brilho branco tênue no escuro (neutral-2), onde sombra escura não seria vista sobre um fundo já escuro.',
        },
        {
          subject: 'Véu invariante',
          detail:
            'o véu é --unc-color-scrim nos dois temas (brandpurple-900 a 60%), o mesmo do Dialog.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Véu', role: 'Cobre o contêiner; o toque nele fecha a folha.', token: '--unc-color-scrim' },
        { name: 'Puxador', role: 'Pílula de 32 × 4px, decorativa.', token: '--unc-color-text-secondary' },
        { name: 'Título', role: 'Nome acessível da folha.', token: '--unc-color-text-primary · --unc-font-title-sm-*' },
        { name: 'Corpo', role: 'Conteúdo livre, com rolagem própria.', token: '—' },
        { name: 'Rodapé', role: 'Ações alinhadas à direita.', token: '—' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Em contexto" description="A folha abre sobre a conversa; toque no véu para fechar e no botão para reabrir." />
    <UncDocStage surface="base" padding={20}>
      <FolhaDeEncaminhar />
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Renderizar dentro de um contêiner posicionado (position: relative).',
        'Dar um título: é ele que nomeia a folha para o leitor de tela.',
        'Usar ListItem para as linhas de destino.',
      ]}
      donts={[
        'Usar para a grade de anexos: essa é a AttachmentSheet.',
        'Abrir duas folhas ao mesmo tempo.',
        'Trocar a elevação por outra sombra: --unc-elevation-overlay já muda com o tema.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: superfície, títulos, elevação e o fundo da conversa acompanham o tema; o véu é o mesmo nos dois."
    />
    <UncDocThemeSwitcher surface="base" padding={20}>
      {(theme) => <FolhaDeEncaminhar key={theme} theme={theme} />}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="BottomSheet"
      rows={[
        { name: 'open', type: 'boolean', default: 'true', description: 'Visibilidade. Fechada, não renderiza nada.' },
        { name: 'title', type: 'React.ReactNode', description: 'Título e nome acessível.' },
        { name: 'children', type: 'React.ReactNode', description: 'Corpo da folha.' },
        { name: 'footer', type: 'React.ReactNode', description: 'Ações do rodapé.' },
        { name: 'onClose', type: '() => void', description: 'ESC ou toque no véu.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Repassados ao painel.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof BottomSheet> = {
  title: 'Unoochat/Componentes/BottomSheet',
  component: BottomSheet,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Visibilidade.' },
    title: { control: 'text', description: 'Título.' },
    onClose: { action: 'onClose' },
  },
  args: { open: true, title: 'Encaminhar para...' },
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
 * Playground com 100% das props do BottomSheet expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do BottomSheet',
  render: (args) => (
    <div style={{ position: 'relative', width: 375, height: 360, background: 'var(--unc-color-surface-canvas)' }}>
      <BottomSheet {...args} footer={<Button>Enviar</Button>}>
        <ListItem leading={<Avatar initials="MT" size="md" />} title="Mural da Turma" subtitle="Conversa com a professora" />
      </BottomSheet>
    </div>
  ),
};

/**
 * O ESC fecha a folha e o botão a reabre.
 */
export const Estados: Story = {
  render: () => <FolhaDeEncaminhar />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('dialog', { name: 'Encaminhar para...' })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await expect(tela.queryByRole('dialog')).not.toBeInTheDocument();
    await userEvent.click(tela.getByRole('button', { name: 'Abrir a folha' }));
    await expect(tela.getByRole('dialog', { name: 'Encaminhar para...' })).toBeInTheDocument();
  },
};
