import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  WaDocGrid,
  WaDocCard,
  WaDocFigmaSpecs,
  WaDocDeviations,
  WaDocAnatomy,
  WaDocPractices,
  WaDocPropsTable,
} from '../../../.storybook/components';
import {
  BottomSheet,
  Button,
  ChatWallpaper,
  ListItem,
  Avatar,
  MessageBubble,
} from '../../../src/whatsappmobile';
import { waWallpaper } from '../fixtures';

const BAR = '#0CA996';

/**
 * A folha "Encaminhar para..." sobre uma conversa, com reabertura.
 */
const FolhaDeEncaminhar: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ position: 'relative', width: 375, height: 480, overflow: 'hidden' }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '18px 12px' }}>
          <MessageBubble direction="in" sender="Pedro Henrique" time="08:12">
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
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Extensões"
      title="BottomSheet"
      description="Folha inferior modal com puxador, título, corpo livre e rodapé, sobre o véu do diálogo. Extensão: o arquivo publica só a folha de anexos, de vocabulário fechado; esta usa a mesma superfície com conteúdo livre."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="📤" title="Escolher um destino">
        “Encaminhar para...”: a lista de conversas de destino e o botão de enviar.
      </WaDocCard>
      <WaDocCard icon="⌨️" title="Modal de verdade">
        Prende o foco, fecha no ESC e no toque no véu, e devolve o foco a quem abriu — o mesmo
        comportamento do <code>Dialog</code>.
      </WaDocCard>
      <WaDocCard icon="🧩" title="Corpo livre">
        As linhas são <code>ListItem</code> do pacote; a folha só dá a superfície.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3021"
      frameName="Folha de anexos (a âncora da superfície)"
      specs={[
        { label: 'Superfície', value: '#2D383E (--wa-color-surface-sheet)' },
        { label: 'Véu', value: 'rgba(0,0,0,0.6) (--wa-color-scrim)' },
        { label: 'Raio superior', value: '8px (--wa-radius-xl)' },
        { label: 'Puxador', value: '32 × 4px · --wa-color-text-secondary' },
        { label: 'Altura máxima', value: '85% do contêiner' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Componente sem frame',
          detail:
            'o arquivo não publica folha genérica. A superfície é a da folha de anexos e o véu é o do diálogo; o puxador usa o texto secundário. AttachmentSheet segue existindo para a grade de anexos, que tem vocabulário próprio.',
        },
        {
          subject: 'Sem sombra',
          detail: 'a separação da conversa vem do véu, não de sombra — o arquivo é plano.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Véu', role: 'Cobre o contêiner; o toque nele fecha a folha.', token: '--wa-color-scrim' },
        { name: 'Puxador', role: 'Pílula de 32 × 4px, decorativa.', token: '--wa-color-text-secondary' },
        { name: 'Título', role: 'Nome acessível da folha.', token: '--wa-color-text-title · --wa-font-title-sm-*' },
        { name: 'Corpo', role: 'Conteúdo livre, com rolagem própria.', token: '—' },
        { name: 'Rodapé', role: 'Ações alinhadas à direita.', token: '—' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Em contexto" description="A folha abre sobre a conversa; toque no véu para fechar e no botão para reabrir." />
    <FolhaDeEncaminhar />

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Renderizar dentro de um contêiner posicionado (position: relative).',
        'Dar um título: é ele que nomeia a folha para o leitor de tela.',
        'Usar ListItem para as linhas de destino.',
      ]}
      donts={[
        'Usar para a grade de anexos: essa é a AttachmentSheet.',
        'Abrir duas folhas ao mesmo tempo.',
        'Acrescentar sombra para separá-la do fundo.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Superfícies suportadas" description="A folha tem superfície própria e véu próprio; o fundo é qualquer conversa." />
    <WaDocGrid>
      <WaDocCard icon="🌓" title="Tema único">
        O arquivo publica só o tema escuro. A folha não tem variante: é sempre a superfície de
        anexos sobre o véu.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
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
  title: 'Whatsapp Mobile/Componentes/BottomSheet',
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
    <div style={{ position: 'relative', width: 375, height: 360, background: 'var(--wa-color-surface-canvas)' }}>
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
