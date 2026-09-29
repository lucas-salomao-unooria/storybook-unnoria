import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
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
  AttachmentSheet,
  ChatHeader,
  ChatWallpaper,
  DateChip,
  EncryptionNotice,
  MessageComposer,
  PhoneFrame,
  StatusBar,
} from '../../../src/unoochat';
import { uncAttachmentActions, uncAvatarPrincipal, uncWallpaperFor } from '../fixtures';

/**
 * Cena de conversa com a folha aberta, no tema em que for montada.
 */
const ConversaComFolha = ({ theme, caption }: { theme: 'light' | 'dark'; caption?: string }) => (
  <PhoneFrame caption={caption}>
    <StatusBar height={22} />
    <ChatHeader name="Amara Lima" avatarSrc={uncAvatarPrincipal} />
    <ChatWallpaper src={uncWallpaperFor(theme)}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 12 }}>
        <DateChip>HOJE</DateChip>
        <EncryptionNotice />
      </div>
      <div style={{ marginTop: 'auto', padding: '0 12px 8px' }}>
        <AttachmentSheet actions={uncAttachmentActions} />
      </div>
    </ChatWallpaper>
    <MessageComposer focused />
  </PhoneFrame>
);

const BAR = '#716C98';

/**
 * Página de documentação rica do componente AttachmentSheet.
 */
const AttachmentSheetDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Sobreposição"
      title="AttachmentSheet"
      description="Folha de anexos aberta pelo clipe do compositor. Superfície --unc-color-surface-sheet com grade de três colunas e círculos de 56px nas seis cores de ação, invariantes entre temas: documento, câmera, galeria, áudio, localização e contato."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="📎" title="Seis ações fixas">
        A folha oferece exatamente seis ações em duas fileiras de três. É o único lugar do
        produto com uma paleta multicolorida.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Cores próprias da folha">
        As seis cores não pertencem a nenhuma outra parte do produto. São tokens dedicados
        (<code>--unc-color-attach-*</code>), iguais nos dois temas, e não devem ser reaproveitadas.
      </UncDocCard>
      <UncDocCard icon="⭕" title="Círculos de 56px">
        Cada ação é um círculo preenchido com o glifo Material Symbols ao centro e o rótulo de 12px abaixo.
      </UncDocCard>
      <UncDocCard icon="📍" title="Ancorada ao compositor">
        Aparece imediatamente acima da barra de composição, ocupando a largura útil menos as
        margens laterais.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="AttachmentSheet"
      layout="Grade · 3 colunas × 2 linhas"
      specs={[
        { label: 'Superfície', value: '--unc-color-surface-sheet' },
        { label: 'Grade', value: '3 colunas × 2 linhas' },
        { label: 'Círculo', value: '56 px' },
        { label: 'Rótulo', value: 'Open Sans 400 · 12px' },
        { label: 'Glifo', value: '24 px · Material Symbols Rounded' },
        { label: 'Cores de ação', value: '6 tokens dedicados, invariantes' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Cores invariantes entre temas',
          detail:
            'as seis ações usam --unc-color-attach-* com o mesmo valor no claro e no escuro: documento brandpurple-600, câmera danger-500, galeria brandnavy-700, áudio warning-600, localização success-600 e contato info-500. O glifo branco (--unc-color-icon-on-accent) é o mesmo nos dois temas nos círculos; só a superfície da folha e o rótulo acompanham o tema.',
        },
        {
          subject: 'Glifos das ações',
          detail:
            'document, cameraFilled, gallery, audio, location e contact vêm do registro de ícones do módulo (Material Symbols Rounded, peso 300, por ligadura). Nenhum vetor foi desenhado à mão.',
        },
        {
          subject: 'Raio da folha',
          detail:
            'a folha adota --unc-radius-xl (8px), o degrau de raio maior da escala do módulo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Folha', role: 'Superfície com grade de três colunas.', token: '--unc-color-surface-sheet · --unc-radius-xl' },
        { name: 'Círculo', role: 'Botão circular de 56px preenchido pela cor da ação.', token: '--unc-color-attach-*' },
        { name: 'Glifo', role: 'Ícone branco centralizado no círculo.', token: '--unc-color-icon-on-accent' },
        { name: 'Rótulo', role: 'Nome da ação abaixo do círculo.', token: '--unc-font-caption-* · --unc-color-text-primary' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Variantes e contexto" description="Folha aberta sobre a conversa e variações de conteúdo." />
    <UncDocStage surface="base" padding={20}>
      <ConversaComFolha theme="light" caption="Folha de anexos" />
    </UncDocStage>

    <UncDocStage surface="base" direction="column" align="stretch" gap={20} padding={20}>
      <div style={{ width: 387 }}>
        <AttachmentSheet actions={uncAttachmentActions} />
      </div>
      <div style={{ width: 387 }}>
        <AttachmentSheet actions={uncAttachmentActions.slice(0, 3)} />
      </div>
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Ancorar a folha imediatamente acima do compositor.',
        'Manter as seis ações na ordem padrão: documento, câmera, galeria, áudio, localização e contato.',
        'Usar os tokens --unc-color-attach-* exclusivamente aqui.',
        'Fechar a folha ao escolher uma ação.',
      ]}
      donts={[
        'Reaproveitar as cores de anexo em selos, FABs ou chips.',
        'Adicionar uma sétima ação, rompendo a grade de duas fileiras.',
        'Desenhar glifos à mão ou trazer outra biblioteca de ícones para as ações.',
        'Exibir a folha e o teclado simultaneamente.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: a folha e os rótulos acompanham o tema; os círculos de ação são invariantes."
    />
    <UncDocThemeSwitcher surface="base">
      {() => (
        <div style={{ width: 360 }}>
          <AttachmentSheet actions={uncAttachmentActions} />
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="AttachmentSheet"
      rows={[
        { name: 'actions', type: 'UncAttachmentAction[]', description: 'Ações exibidas na grade. Obrigatório.' },
        { name: 'onSelect', type: '(kind: UncAttachmentKind) => void', description: 'Callback disparado ao escolher uma ação.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UncDocPropsTable
      title="UncAttachmentAction"
      rows={[
        { name: 'kind', type: "'document' | 'camera' | 'gallery' | 'audio' | 'location' | 'contact'", description: 'Tipo da ação, que define a cor do círculo.' },
        { name: 'label', type: 'string', description: 'Rótulo exibido abaixo do círculo.' },
        { name: 'icon', type: 'UncIconName', description: 'Glifo exibido dentro do círculo.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof AttachmentSheet> = {
  title: 'Unoochat/Componentes/AttachmentSheet',
  component: AttachmentSheet,
  parameters: { layout: 'padded' },
  argTypes: { actions: { control: 'object', description: 'Ações exibidas na grade.' } },
  args: { actions: uncAttachmentActions },
};

export default meta;

type Story = StoryObj<typeof AttachmentSheet>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AttachmentSheetDocumentationPage />,
};

/**
 * Playground com 100% das props do AttachmentSheet expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do AttachmentSheet',
  render: (args) => (
    <UncDocStage surface="base" padding={20}>
      <div style={{ width: 387 }}>
        <AttachmentSheet {...args} />
      </div>
    </UncDocStage>
  ),
};

/**
 * A folha sobre a conversa, no tema claro e no escuro.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <>
      <UncDocStage label="Tema claro" surface="base" padding={20}>
        <ConversaComFolha theme="light" caption="Tema claro" />
      </UncDocStage>
      <UncDocStage label="Tema escuro" theme="dark" surface="base" padding={20}>
        <ConversaComFolha theme="dark" caption="Tema escuro" />
      </UncDocStage>
    </>
  ),
};

/**
 * Matriz de conteúdo completo e reduzido.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UncDocStage surface="base" direction="column" align="stretch" gap={20} padding={20}>
      <div style={{ width: 387 }}>
        <AttachmentSheet actions={uncAttachmentActions} />
      </div>
      <div style={{ width: 387 }}>
        <AttachmentSheet actions={uncAttachmentActions.slice(0, 3)} />
      </div>
    </UncDocStage>
  ),
};
