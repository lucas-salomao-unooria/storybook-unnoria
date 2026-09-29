import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
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
} from '../../../src/unoochat';
import { uncAvatarPrincipal, uncWallpaperFor } from '../fixtures';

const BAR = '#716C98';
const DURATIONS = ['8 horas', '1 semana', 'Sempre'];
const AVISO =
  'As mensagens e as chamadas são protegidas com criptografia de ponta a ponta. Ninguém de fora desta conversa, nem mesmo a Unooria, pode lê-las ou ouvi-las. Toque para saber mais.';

/**
 * Diálogo de silenciar notificações, com estado local completo.
 */
const MuteDialog: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [duration, setDuration] = useState('Sempre');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <Dialog
      title="Silenciar notificações por..."
      onClose={onClose}
      footer={
        <Dialog.Footer
          actions={
            <>
              <TextButton onClick={onClose}>CANCELAR</TextButton>
              <TextButton onClick={onClose}>OK</TextButton>
            </>
          }
        >
          <Checkbox
            label="Mostrar notificações"
            checked={showNotifications}
            onChange={(event) => setShowNotifications(event.target.checked)}
          />
        </Dialog.Footer>
      }
    >
      <div role="radiogroup" aria-label="Silenciar notificações por" style={{ display: 'grid' }}>
        {DURATIONS.map((option) => (
          <Radio
            key={option}
            name="unc-mute-duration"
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
const DialogOverChat: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ position: 'relative' }}>
      <PhoneFrame caption="Diálogo sobre a conversa">
        <StatusBar height={22} />
        {/* O véu começa abaixo da barra de status; este contêiner posicionado
            delimita exatamente essa área. */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ChatHeader name="Amara Lima" avatarSrc={uncAvatarPrincipal} />
          <ChatWallpaper src={uncWallpaperFor(theme)}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 12 }}>
              <DateChip>HOJE</DateChip>
              <EncryptionNotice>{AVISO}</EncryptionNotice>
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
 * Diálogo de confirmação de exclusão, sem escolha auxiliar.
 */
const DeleteDialog: React.FC = () => (
  <Dialog
    title="Apagar conversa?"
    footer={
      <Dialog.Footer
        actions={
          <>
            <TextButton>CANCELAR</TextButton>
            <TextButton>APAGAR</TextButton>
          </>
        }
      />
    }
  >
    <p
      style={{
        margin: 0,
        color: 'var(--unc-color-text-primary)',
        fontFamily: 'var(--unc-font-sans)',
        fontSize: 'var(--unc-font-body-sm-size)',
        lineHeight: 'var(--unc-font-body-sm-line)',
      }}
    >
      As mensagens serão removidas apenas deste aparelho.
    </p>
  </Dialog>
);

/**
 * Página de documentação rica do componente Dialog.
 */
const DialogDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Sobreposição"
      title="Dialog"
      description="Diálogo modal de 331px de largura e raio de 4px em --unc-color-surface-dialog, com título em Open Sans 20px, corpo com opções e rodapé separado por um divisor de 1px. O véu usa --unc-color-scrim e cobre o conteúdo abaixo da barra de status. Fecha por ESC e por toque no véu, com foco preso no painel."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🪟" title="Nível mais alto da pilha">
        <code>--unc-color-surface-dialog</code> (#FFFFFF no claro, #34375C no escuro) marca o topo
        da pilha, com a elevação <code>--unc-elevation-overlay</code> do módulo.
      </UncDocCard>
      <UncDocCard icon="🌑" title="Véu abaixo da barra de status">
        O véu cobre o contêiner em que o diálogo é montado, normalmente o <code>PhoneFrame</code>{' '}
        abaixo da StatusBar, que continua visível.
      </UncDocCard>
      <UncDocCard icon="⌨️" title="Foco preso e ESC">
        Tab e Shift+Tab circulam apenas dentro do painel; ESC dispara <code>onClose</code>. O painel
        é anunciado como <code>role=&quot;dialog&quot;</code> com <code>aria-modal</code> e nomeado
        pelo título.
      </UncDocCard>
      <UncDocCard icon="🧩" title="Rodapé componível">
        <code>Dialog.Footer</code> aceita conteúdo à esquerda (a caixa de seleção) e ações
        alinhadas à direita.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="Dialog"
      layout="Painel modal · 331px"
      specs={[
        { label: 'Largura', value: '331px (prop width)' },
        { label: 'Raio', value: '4px (--unc-radius-s)' },
        { label: 'Superfície', value: '--unc-color-surface-dialog' },
        { label: 'Título', value: 'Open Sans 400 · 20px · text-primary' },
        { label: 'Divisor do rodapé', value: '1px · --unc-color-border-dialog' },
        { label: 'Véu', value: '--unc-color-scrim' },
        { label: 'Elevação', value: '--unc-elevation-overlay' },
        { label: 'Recuo interno', value: '20px 24px 12px' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Cores por tema',
          detail:
            'a superfície é branca no claro e brandpurple 800 (#34375C) no escuro; o divisor é #E4E8E9 no claro e #57547D no escuro. O véu (--unc-color-scrim, brandpurple 900 a 60%) é o mesmo nos dois temas.',
        },
        {
          subject: 'Elevação por tema',
          detail:
            'o painel usa --unc-elevation-overlay, definido por tema: sombra roxa difusa no claro e halo claro de 10% no escuro, que é o que separa o painel do véu quando o fundo já é escuro.',
        },
        {
          subject: 'Altura pelo conteúdo',
          detail:
            'o painel cresce conforme o conteúdo, mantendo largura, raio e espaçamentos internos do módulo.',
        },
        {
          subject: 'Foco e ESC',
          detail:
            'foco preso, ESC e devolução do foco ao invocador seguem a seção de acessibilidade do Padrão Ouro; não alteram a aparência.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Véu', role: 'Cobertura que bloqueia o conteúdo abaixo.', token: '--unc-color-scrim' },
        { name: 'Painel', role: 'Caixa de 331px com raio de 4px.', token: '--unc-color-surface-dialog · --unc-radius-s' },
        { name: 'Título', role: 'Pergunta ou instrução do diálogo.', token: '--unc-font-title-lg-* · --unc-color-text-primary' },
        { name: 'Corpo', role: 'Opções ou conteúdo livre.', token: 'prop children' },
        { name: 'Divisor', role: 'Linha de 1px que separa o rodapé.', token: '--unc-color-border-dialog' },
        { name: 'Rodapé', role: 'Caixa de seleção à esquerda e ações à direita.', token: 'Dialog.Footer' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Diálogo de silenciar, nos dois temas"
      description="Opções de duração em Radio e escolha auxiliar em Checkbox, com estado local completo."
    />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <div key={theme} style={{ flex: '1 1 380px' }}>
          <UncDocStage
            label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
            theme={theme}
            surface="base"
            padding={20}
          >
            <div style={{ position: 'relative', width: 380, height: 340 }}>
              <MuteDialog />
            </div>
          </UncDocStage>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Variações de largura e conteúdo" />
    <UncDocStage surface="base" direction="column" align="center" gap={20} padding={20}>
      <div style={{ position: 'relative', width: 411, height: 260 }}>
        <DeleteDialog />
      </div>
      <div style={{ position: 'relative', width: 411, height: 200 }}>
        <Dialog width={280} title="Limpar tudo?" footer={<Dialog.Footer actions={<TextButton>OK</TextButton>} />} />
      </div>
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={[
        'Montar o diálogo dentro do contêiner da tela, abaixo da StatusBar.',
        'Passar onClose para habilitar ESC e o toque no véu.',
        'Colocar a ação de confirmação por último no rodapé.',
        'Usar Dialog.Footer para separar a escolha auxiliar das ações.',
      ]}
      donts={[
        'Empilhar dois diálogos simultâneos.',
        'Trocar a elevação do módulo por sombras próprias.',
        'Cobrir a barra de status com o véu.',
        'Manter o diálogo aberto sem nenhuma ação de fechamento.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre claro e escuro: painel, divisor, véu e a tela por trás acompanham data-unc-theme."
    />
    <UncDocThemeSwitcher surface="base" padding={20}>
      {(theme) => <DialogOverChat key={theme} theme={theme} />}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
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
    <UncDocPropsTable
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
  title: 'Unoochat/Componentes/Dialog',
  component: Dialog,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Visibilidade do diálogo.' },
    title: { control: 'text', description: 'Título do painel.' },
    width: { control: { type: 'range', min: 220, max: 400, step: 1 }, description: 'Largura em pixels.' },
  },
  args: { open: true, title: 'Silenciar notificações por...', width: 331 },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

/**
 * Documentação rica e completa do componente.
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
    <div style={{ position: 'relative', width: 411, height: 340, background: 'var(--unc-color-surface-canvas)' }}>
      <Dialog
        {...args}
        footer={
          <Dialog.Footer
            actions={
              <>
                <TextButton>CANCELAR</TextButton>
                <TextButton>OK</TextButton>
              </>
            }
          >
            <Checkbox label="Mostrar notificações" checked={false} readOnly />
          </Dialog.Footer>
        }
      >
        <div role="radiogroup" aria-label="Silenciar notificações por" style={{ display: 'grid' }}>
          {DURATIONS.map((option) => (
            <Radio
              key={option}
              name="unc-playground-mute"
              label={option}
              checked={option === 'Sempre'}
              readOnly
            />
          ))}
        </div>
      </Dialog>
    </div>
  ),
};

/**
 * Diálogo funcional sobre a tela de conversa completa.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UncDocStage surface="base" padding={20}>
      <DialogOverChat />
    </UncDocStage>
  ),
};

/**
 * Composição modular do rodapé, com e sem escolha auxiliar.
 */
export const ComposicaoModular: Story = {
  name: 'ComposicaoModular',
  render: () => (
    <UncDocStage surface="base" direction="column" align="center" gap={20} padding={20}>
      <div style={{ position: 'relative', width: 380, height: 340 }}>
        <MuteDialog />
      </div>
      <div style={{ position: 'relative', width: 380, height: 200 }}>
        <Dialog width={300} title="Limpar tudo?" footer={<Dialog.Footer actions={<TextButton>OK</TextButton>} />} />
      </div>
    </UncDocStage>
  ),
};
