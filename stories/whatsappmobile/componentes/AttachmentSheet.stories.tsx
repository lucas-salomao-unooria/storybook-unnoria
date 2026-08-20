import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
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
  AttachmentSheet,
  ChatHeader,
  ChatWallpaper,
  DateChip,
  EncryptionNotice,
  MessageComposer,
  PhoneFrame,
  StatusBar,
} from '../../../src/whatsappmobile';
import { waAttachmentActions, waAvatarJane, waWallpaper } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente AttachmentSheet.
 */
const AttachmentSheetDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Sobreposição"
      title="AttachmentSheet"
      description="Folha de anexos aberta pelo clipe do compositor. Reproduz a superfície --wa-color-surface-sheet com grade de três colunas e círculos de 56px nas seis cores de ação medidas no frame Pin option: documento #5F66CE, câmera #EC407A, galeria #BF57CF, áudio #F78D0D, localização #019D54 e contato #0EAAF4."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="📎" title="Seis ações fixas">
        O arquivo desenha exatamente seis ações em duas fileiras de três. É o único lugar do
        produto com uma paleta multicolorida.
      </WaDocCard>
      <WaDocCard icon="🎨" title="Cores fora da família verde">
        As seis cores não pertencem a nenhuma outra parte do arquivo. São tokens dedicados
        (<code>--wa-color-attach-*</code>) e não devem ser reaproveitadas.
      </WaDocCard>
      <WaDocCard icon="⭕" title="Círculos de 56px">
        Cada ação é um círculo preenchido com o glifo branco ao centro e o rótulo de 13px abaixo.
      </WaDocCard>
      <WaDocCard icon="📍" title="Ancorada ao compositor">
        Aparece imediatamente acima da barra de composição, ocupando a largura útil menos as
        margens laterais.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3943"
      frameName="Pin option · folha de anexos"
      specs={[
        { label: 'Superfície', value: '#2D383E' },
        { label: 'Grade', value: '3 colunas × 2 linhas' },
        { label: 'Círculo', value: '56 px' },
        { label: 'Rótulo', value: 'PT Sans 400 · 13px' },
        { label: 'Glifo', value: '24 px · branco' },
        { label: 'Cores de ação', value: '6 tokens dedicados' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Glifos das ações',
          detail:
            'os seis ícones internos foram achatados no export do arquivo. A prop `icon` recebe glifos do registro oficial que mais se aproximam do significado (filePdf, cameraFilled, composerCamera, micBody, settingsStorage, settingsInvite) em vez de desenhar novos vetores à mão. Desvio registrado.',
        },
        {
          subject: 'Raio da folha',
          detail:
            'o arquivo desenha a folha com cantos levemente arredondados sem valor exportado. O componente adota --wa-radius-xl (8px), o degrau mais próximo da escala.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Folha', role: 'Superfície com grade de três colunas.', token: '--wa-color-surface-sheet · --wa-radius-xl' },
        { name: 'Círculo', role: 'Botão circular de 56px preenchido pela cor da ação.', token: '--wa-color-attach-*' },
        { name: 'Glifo', role: 'Ícone branco centralizado no círculo.', token: '--wa-color-icon-on-accent' },
        { name: 'Rótulo', role: 'Nome da ação abaixo do círculo.', token: '--wa-font-caption-* · --wa-color-text-settings' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Réplica do frame oficial" />
    <WaDocStage surface="base" padding={20}>
      <PhoneFrame caption="Pin option · node 1:3943">
        <StatusBar height={22} />
        <ChatHeader name="Jane Doe" avatarSrc={waAvatarJane} />
        <ChatWallpaper src={waWallpaper}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 12 }}>
            <DateChip>TODAY</DateChip>
            <EncryptionNotice />
          </div>
          <div style={{ marginTop: 'auto', padding: '0 12px 8px' }}>
            <AttachmentSheet actions={waAttachmentActions} />
          </div>
        </ChatWallpaper>
        <MessageComposer focused />
      </PhoneFrame>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Variações de conteúdo" />
    <WaDocStage surface="base" direction="column" align="stretch" gap={20} padding={20}>
      <div style={{ width: 387 }}>
        <AttachmentSheet actions={waAttachmentActions} />
      </div>
      <div style={{ width: 387 }}>
        <AttachmentSheet actions={waAttachmentActions.slice(0, 3)} />
      </div>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Ancorar a folha imediatamente acima do compositor.',
        'Manter as seis ações e a ordem do arquivo.',
        'Usar os tokens --wa-color-attach-* exclusivamente aqui.',
        'Fechar a folha ao escolher uma ação.',
      ]}
      donts={[
        'Reaproveitar as cores de anexo em selos, FABs ou chips.',
        'Adicionar uma sétima ação, rompendo a grade de duas fileiras.',
        'Desenhar glifos à mão para as ações cujo vetor não existe no arquivo.',
        'Exibir a folha e o teclado simultaneamente.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies sob a folha."
    />
    <WaDocSurfaceSwitcher surfaces={['base', 'canvas']} initial="base">
      {() => (
        <div style={{ width: 360 }}>
          <AttachmentSheet actions={waAttachmentActions} />
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="AttachmentSheet"
      rows={[
        { name: 'actions', type: 'WaAttachmentAction[]', description: 'Ações exibidas na grade. Obrigatório.' },
        { name: 'onSelect', type: '(kind: WaAttachmentKind) => void', description: 'Callback disparado ao escolher uma ação.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <WaDocPropsTable
      title="WaAttachmentAction"
      rows={[
        { name: 'kind', type: "'document' | 'camera' | 'gallery' | 'audio' | 'location' | 'contact'", description: 'Tipo da ação, que define a cor do círculo.' },
        { name: 'label', type: 'string', description: 'Rótulo exibido abaixo do círculo.' },
        { name: 'icon', type: 'WaIconName', description: 'Glifo exibido dentro do círculo.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof AttachmentSheet> = {
  title: 'Whatsapp Mobile/Componentes/AttachmentSheet',
  component: AttachmentSheet,
  parameters: { layout: 'padded' },
  argTypes: { actions: { control: 'object', description: 'Ações exibidas na grade.' } },
  args: { actions: waAttachmentActions },
};

export default meta;

type Story = StoryObj<typeof AttachmentSheet>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
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
    <WaDocStage surface="base" padding={20}>
      <div style={{ width: 387 }}>
        <AttachmentSheet {...args} />
      </div>
    </WaDocStage>
  ),
};

/**
 * Réplica da folha do frame "Pin option", na tela completa.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="base" padding={20}>
      <PhoneFrame caption="Pin option · node 1:3943">
        <StatusBar height={22} />
        <ChatHeader name="Jane Doe" avatarSrc={waAvatarJane} />
        <ChatWallpaper src={waWallpaper}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 12 }}>
            <DateChip>TODAY</DateChip>
            <EncryptionNotice />
          </div>
          <div style={{ marginTop: 'auto', padding: '0 12px 8px' }}>
            <AttachmentSheet actions={waAttachmentActions} />
          </div>
        </ChatWallpaper>
        <MessageComposer focused />
      </PhoneFrame>
    </WaDocStage>
  ),
};

/**
 * Matriz de conteúdo completo e reduzido.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="base" direction="column" align="stretch" gap={20} padding={20}>
      <div style={{ width: 387 }}>
        <AttachmentSheet actions={waAttachmentActions} />
      </div>
      <div style={{ width: 387 }}>
        <AttachmentSheet actions={waAttachmentActions.slice(0, 3)} />
      </div>
    </WaDocStage>
  ),
};
