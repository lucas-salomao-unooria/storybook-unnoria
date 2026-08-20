import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
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
  WaDocStage,
  WaDocSurfaceSwitcher,
} from '../../../.storybook/components';
import {
  Dialog,
  Radio,
  Checkbox,
  TextButton,
  ChatHeader,
  ChatWallpaper,
  DateChip,
  EncryptionNotice,
  MessageComposer,
  StatusBar,
  PhoneFrame,
} from '../../../src/whatsappmobile';
import { waAvatarJane, waWallpaper } from '../fixtures';

const BAR = '#0CA996';
const DURATIONS = ['8 hours', '1 week', 'Always'];

/**
 * Diálogo de silenciar notificações, com estado local completo.
 */
const MuteDialog: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [duration, setDuration] = useState('Always');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <Dialog
      title="Mute notifications for..."
      onClose={onClose}
      footer={
        <Dialog.Footer
          actions={
            <>
              <TextButton onClick={onClose}>CANCEL</TextButton>
              <TextButton onClick={onClose}>OK</TextButton>
            </>
          }
        >
          <Checkbox
            label="Show notifications"
            checked={showNotifications}
            onChange={(event) => setShowNotifications(event.target.checked)}
          />
        </Dialog.Footer>
      }
    >
      <div role="radiogroup" aria-label="Mute notifications for" style={{ display: 'grid' }}>
        {DURATIONS.map((option) => (
          <Radio
            key={option}
            name="wa-mute-duration"
            label={option}
            value={option}
            checked={duration === option}
            onChange={() => setDuration(option)}
          />
        ))}
      </div>
    </Dialog>
  );
};

/**
 * Demonstração do diálogo sobre a tela de conversa completa.
 */
const DialogOverChat: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ position: 'relative' }}>
      <PhoneFrame caption="Mute notif · node 1:3446">
        <StatusBar height={22} />
        {/* No arquivo o véu começa abaixo da barra de status; este contêiner
            posicionado delimita exatamente essa área. */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ChatHeader name="Jane Doe" avatarSrc={waAvatarJane} />
          <ChatWallpaper src={waWallpaper}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 12 }}>
              <DateChip>TODAY</DateChip>
              <EncryptionNotice />
            </div>
          </ChatWallpaper>
          <MessageComposer focused />
          {open && <MuteDialog onClose={() => setOpen(false)} />}
        </div>
      </PhoneFrame>

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            marginTop: 12,
            padding: '8px 14px',
            borderRadius: 999,
            border: '1px solid #E4E8E9',
            background: '#FFFFFF',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Reabrir diálogo
        </button>
      )}
    </div>
  );
};

/**
 * Página de documentação rica do componente Dialog.
 */
const DialogDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Sobreposição"
      title="Dialog"
      description="Diálogo modal do frame Mute notif: 331px de largura, raio de 4px em --wa-color-surface-dialog, título de 21px, corpo com opções e rodapé separado por um divisor de 1px. O véu usa --wa-color-scrim e cobre todo o conteúdo abaixo da barra de status. Fecha por ESC e por toque no véu, com foco preso no painel."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🪟" title="Nível mais alto da escada">
        <code>--wa-color-surface-dialog</code> (#364147) é a superfície mais clara do arquivo,
        marcando o topo da pilha sem recorrer a sombra.
      </WaDocCard>
      <WaDocCard icon="🌑" title="Véu abaixo da barra de status">
        No arquivo o véu começa em 22px, deixando a barra de status visível. O componente cobre o
        contêiner em que é montado, normalmente o <code>PhoneFrame</code> abaixo da StatusBar.
      </WaDocCard>
      <WaDocCard icon="⌨️" title="Foco preso e ESC">
        Tab e Shift+Tab circulam apenas dentro do painel; ESC dispara <code>onClose</code>. O painel
        é anunciado como <code>role=&quot;dialog&quot;</code> com <code>aria-modal</code>.
      </WaDocCard>
      <WaDocCard icon="🧩" title="Rodapé componível">
        <code>Dialog.Footer</code> aceita conteúdo à esquerda (a caixa de seleção) e ações
        alinhadas à direita.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3504"
      frameName="Mute notif · caixa de diálogo"
      specs={[
        { label: 'Largura', value: '331 px' },
        { label: 'Altura', value: '290 px' },
        { label: 'Raio', value: '4 px' },
        { label: 'Superfície', value: '#364147' },
        { label: 'Título', value: 'PT Sans 400 · 21px · #D7E0E5' },
        { label: 'Divisor', value: '1 px · #4D585E' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Altura fixa',
          detail:
            'o arquivo desenha 290px de altura para três opções. O componente cresce conforme o conteúdo, mantendo largura, raio e espaçamentos internos medidos.',
        },
        {
          subject: 'Foco e ESC',
          detail:
            'comportamentos de acessibilidade não existem no arquivo estático. Foram implementados conforme a seção 4.3 do Padrão Ouro, sem alterar a aparência.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Véu', role: 'Cobertura escura que bloqueia o conteúdo abaixo.', token: '--wa-color-scrim' },
        { name: 'Painel', role: 'Caixa de 331px com raio de 4px.', token: '--wa-color-surface-dialog · --wa-radius-s' },
        { name: 'Título', role: 'Pergunta ou instrução do diálogo.', token: '--wa-font-title-lg-* · --wa-color-text-dialog-title' },
        { name: 'Corpo', role: 'Opções ou conteúdo livre.', token: 'prop children' },
        { name: 'Divisor', role: 'Linha de 1px que separa o rodapé.', token: '--wa-color-border-dialog' },
        { name: 'Rodapé', role: 'Caixa de seleção à esquerda e ações à direita.', token: 'Dialog.Footer' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Réplica do frame oficial"
      description="Diálogo funcional sobre a tela de conversa completa."
    />
    <WaDocStage surface="base" padding={20}>
      <DialogOverChat />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Variações de largura e conteúdo" />
    <WaDocStage surface="base" direction="column" align="center" gap={20} padding={20}>
      <div style={{ position: 'relative', width: 411, height: 260 }}>
        <Dialog
          title="Delete chat?"
          footer={
            <Dialog.Footer
              actions={
                <>
                  <TextButton>CANCEL</TextButton>
                  <TextButton>DELETE</TextButton>
                </>
              }
            />
          }
        >
          <p
            style={{
              margin: 0,
              color: 'var(--wa-color-text-dialog-option)',
              fontFamily: 'var(--wa-font-sans)',
              fontSize: 'var(--wa-font-body-sm-size)',
              lineHeight: 1.5,
            }}
          >
            Messages will be removed from this device only.
          </p>
        </Dialog>
      </div>
      <div style={{ position: 'relative', width: 411, height: 200 }}>
        <Dialog width={280} title="Clear all?" footer={<Dialog.Footer actions={<TextButton>OK</TextButton>} />} />
      </div>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Montar o diálogo dentro do contêiner da tela, abaixo da StatusBar.',
        'Passar onClose para habilitar ESC e o toque no véu.',
        'Colocar a ação de confirmação por último no rodapé.',
        'Usar Dialog.Footer para separar a escolha auxiliar das ações.',
      ]}
      donts={[
        'Empilhar dois diálogos simultâneos.',
        'Adicionar sombra ao painel: o arquivo é plano.',
        'Cobrir a barra de status com o véu.',
        'Manter o diálogo aberto sem nenhuma ação de fechamento.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies sob o véu."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base', 'appbar']}>
      {() => (
        <div style={{ position: 'relative', width: 380, height: 300 }}>
          <MuteDialog />
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="Dialog"
      rows={[
        { name: 'open', type: 'boolean', default: 'true', description: 'Controla a visibilidade do diálogo e do véu.' },
        { name: 'title', type: 'React.ReactNode', description: 'Título exibido no topo do painel.' },
        { name: 'children', type: 'React.ReactNode', description: 'Corpo do diálogo.' },
        { name: 'footer', type: 'React.ReactNode', description: 'Rodapé, normalmente um Dialog.Footer.' },
        { name: 'onClose', type: '() => void', description: 'Callback de ESC e de toque no véu.' },
        { name: 'width', type: 'number', default: '331', description: 'Largura do painel em pixels.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <WaDocPropsTable
      title="Dialog.Footer"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo alinhado à esquerda, como a caixa de seleção.' },
        { name: 'actions', type: 'React.ReactNode', description: 'Ações alinhadas à direita.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Dialog> = {
  title: 'Whatsapp Mobile/Componentes/Dialog',
  component: Dialog,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Visibilidade do diálogo.' },
    title: { control: 'text', description: 'Título do painel.' },
    width: { control: { type: 'range', min: 220, max: 400, step: 1 }, description: 'Largura em pixels.' },
  },
  args: { open: true, title: 'Mute notifications for...', width: 331 },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <DialogDocumentationPage />,
};

/**
 * Playground com 100% das props do Dialog expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Dialog',
  render: (args) => (
    <div style={{ position: 'relative', width: 411, height: 340, background: 'var(--wa-color-surface-canvas)' }}>
      <Dialog
        {...args}
        footer={
          <Dialog.Footer
            actions={
              <>
                <TextButton>CANCEL</TextButton>
                <TextButton>OK</TextButton>
              </>
            }
          >
            <Checkbox label="Show notifications" checked={false} readOnly />
          </Dialog.Footer>
        }
      >
        <div role="radiogroup" aria-label="Mute notifications for" style={{ display: 'grid' }}>
          {DURATIONS.map((option) => (
            <Radio
              key={option}
              name="wa-playground-mute"
              label={option}
              checked={option === 'Always'}
              readOnly
            />
          ))}
        </div>
      </Dialog>
    </div>
  ),
};

/**
 * Réplica funcional do frame "Mute notif".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="base" padding={20}>
      <DialogOverChat />
    </WaDocStage>
  ),
};

/**
 * Composição modular do rodapé, com e sem escolha auxiliar.
 */
export const ComposicaoModular: Story = {
  name: 'ComposicaoModular',
  render: () => (
    <WaDocStage surface="base" direction="column" align="center" gap={20} padding={20}>
      <div style={{ position: 'relative', width: 380, height: 320 }}>
        <MuteDialog />
      </div>
      <div style={{ position: 'relative', width: 380, height: 200 }}>
        <Dialog width={300} title="Clear all?" footer={<Dialog.Footer actions={<TextButton>OK</TextButton>} />} />
      </div>
    </WaDocStage>
  ),
};
