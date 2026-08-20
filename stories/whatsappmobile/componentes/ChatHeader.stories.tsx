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
import { ChatHeader, StatusBar } from '../../../src/whatsappmobile';
import { waAvatarJane, waAvatars } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente ChatHeader.
 */
const ChatHeaderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Navegação"
      title="ChatHeader"
      description="Cabeçalho da tela de conversa. Reproduz a faixa de 52px do frame Direct Message: seta de voltar de 38px, avatar de 32px, nome em PT Sans 21px e as três ações de vídeo, voz e menu separadas por 24px — com o telefone girado -127,81° e o menu girado 90°, exatamente como no arquivo."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="↩️" title="Sempre com retorno">
        A conversa é uma tela empilhada; o cabeçalho sempre expõe a seta de voltar em{' '}
        <code>--wa-color-icon-back</code>.
      </WaDocCard>
      <WaDocCard icon="👤" title="Identidade clicável">
        Avatar e nome formam um único alvo que abre o perfil do contato — comportamento do produto
        reproduzido pela prop <code>onOpenProfile</code>.
      </WaDocCard>
      <WaDocCard icon="📞" title="Três ações fixas">
        Vídeo (19×12), voz (20×8 girado) e menu (26×31 girado 90°), com espaçamento de 24px entre
        elas, medido no node 1:3003.
      </WaDocCard>
      <WaDocCard icon="🟢" title="Presença opcional">
        A prop <code>presence</code> acrescenta a segunda linha (&quot;online&quot;,{' '}
        &quot;typing…&quot;) em{' '}
        <code>--wa-color-text-meta</code>.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2997"
      frameName="Direct Message · cabeçalho"
      specs={[
        { label: 'Altura', value: '52 px' },
        { label: 'Superfície', value: '#232D36' },
        { label: 'Avatar', value: '32 px' },
        { label: 'Nome', value: 'PT Sans 400 · 21px · #D3DAE0' },
        { label: 'Espaço entre ações', value: '24 px' },
        { label: 'Rotação do telefone', value: '-127,81°' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Linha de presença',
          detail:
            'o frame Direct Message não desenha presença sob o nome. A prop presence usa PT Sans 13px em --wa-color-text-meta, valor derivado da hierarquia do produto e não medido no arquivo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Superfície', role: 'Faixa de 52px compartilhada com a barra superior.', token: '--wa-color-surface-appbar' },
        { name: 'Seta de voltar', role: 'Botão de retorno de 38px.', token: '--wa-color-icon-back' },
        { name: 'Identidade', role: 'Avatar de 32px e nome, em um único alvo clicável.', token: '--wa-avatar-sm · --wa-color-text-primary' },
        { name: 'Presença', role: 'Segunda linha opcional de estado.', token: '--wa-color-text-meta' },
        { name: 'Ações', role: 'Vídeo, voz e menu com espaçamento de 24px.', token: '--wa-color-icon-appbar' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <WaDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <ChatHeader name="Jane Doe" avatarSrc={waAvatarJane} />
      </div>
      <div style={{ width: 411 }}>
        <ChatHeader name="Jane Doe" presence="online" avatarSrc={waAvatarJane} />
      </div>
      <div style={{ width: 411 }}>
        <ChatHeader name="John Doe" presence="typing…" avatarSrc={waAvatars[1]} />
      </div>
      <div style={{ width: 411 }}>
        <ChatHeader name="Sem avatar" initials="SA" />
      </div>
      <div style={{ width: 411 }}>
        <ChatHeader name="Nome muito longo de um grupo de trabalho" avatarSrc={waAvatars[3]} />
      </div>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Empilhar a StatusBar acima do ChatHeader, como no frame de origem.',
        'Manter avatar e nome no mesmo alvo, apontando para o perfil do contato.',
        'Descrever cada ação em aria-label, já que todas exibem apenas um glifo.',
        'Truncar nomes longos com reticências em vez de quebrar a faixa de 52px.',
      ]}
      donts={[
        'Adicionar uma quarta ação: o espaçamento de 24px deixa de caber.',
        'Usar o cabeçalho de página (TopBar variant="page") na tela de conversa.',
        'Ocultar a seta de voltar em uma tela empilhada.',
        'Substituir o vetor parcial do fone por um telefone completo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base']}>
      {() => (
        <div style={{ width: 411 }}>
          <ChatHeader name="Jane Doe" avatarSrc={waAvatarJane} />
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="ChatHeader"
      rows={[
        { name: 'name', type: 'string', description: 'Nome do contato ou do grupo. Obrigatório.' },
        { name: 'presence', type: 'string', description: 'Linha de presença exibida abaixo do nome.' },
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do contato.' },
        { name: 'initials', type: 'string', description: 'Iniciais usadas quando não há avatar.' },
        { name: 'onBack', type: '(event) => void', description: 'Callback da seta de voltar.' },
        { name: 'onVideoCall', type: '(event) => void', description: 'Callback da chamada de vídeo.' },
        { name: 'onVoiceCall', type: '(event) => void', description: 'Callback da chamada de voz.' },
        { name: 'onMenu', type: '(event) => void', description: 'Callback do menu de opções.' },
        { name: 'onOpenProfile', type: '(event) => void', description: 'Callback de toque no avatar ou no nome.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ChatHeader> = {
  title: 'Whatsapp Mobile/Componentes/ChatHeader',
  component: ChatHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'text', description: 'Nome do contato ou do grupo.' },
    presence: { control: 'text', description: 'Linha de presença.' },
    avatarSrc: { control: 'select', options: [waAvatarJane, ...waAvatars], description: 'URL do avatar.' },
    initials: { control: 'text', description: 'Iniciais sem avatar.' },
  },
  args: { name: 'Jane Doe', presence: '', avatarSrc: waAvatarJane, initials: 'JD' },
};

export default meta;

type Story = StoryObj<typeof ChatHeader>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChatHeaderDocumentationPage />,
};

/**
 * Playground com 100% das props do ChatHeader expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChatHeader',
  render: (args) => (
    <WaDocStage surface="canvas" padding={20}>
      <div style={{ width: 411 }}>
        <ChatHeader {...args} />
      </div>
    </WaDocStage>
  ),
};

/**
 * Réplica do topo do frame "Direct Message", com a barra de status.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="canvas" padding={20}>
      <div style={{ width: 411 }}>
        <StatusBar height={22} />
        <ChatHeader name="Jane Doe" avatarSrc={waAvatarJane} />
      </div>
    </WaDocStage>
  ),
};

/**
 * Estados com e sem presença e sem avatar.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <ChatHeader name="Jane Doe" avatarSrc={waAvatarJane} />
      </div>
      <div style={{ width: 411 }}>
        <ChatHeader name="Jane Doe" presence="online" avatarSrc={waAvatarJane} />
      </div>
      <div style={{ width: 411 }}>
        <ChatHeader name="Sem avatar" initials="SA" />
      </div>
    </WaDocStage>
  ),
};
