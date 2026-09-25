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
} from '../../../.storybook/components';
import { ChatBanner, ChatHeader, ChatWallpaper, MessageBubble } from '../../../src/whatsappmobile';
import { waWallpaper } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente ChatBanner.
 */
const ChatBannerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Extensões"
      title="ChatBanner"
      description="Faixa fixa sob o cabeçalho da conversa, como a mensagem fixada do app real, com um conteúdo opcional à direita (um contador). Extensão sem frame de origem."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="📌" title="O enunciado que fica">
        A faixa não rola com as mensagens: o que a pessoa veio fazer continua à vista depois que
        ela desce pelo histórico.
      </WaDocCard>
      <WaDocCard icon="🔢" title="Contador à direita">
        <code>trailing</code> mostra o progresso, como “0/3”, em números tabulares.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2027"
      frameName="Chats Main Page · divisor das listas (a âncora do fio)"
      specs={[
        { label: 'Superfície', value: '--wa-color-surface-appbar' },
        { label: 'Fio inferior', value: '1px · --wa-color-border-divider' },
        { label: 'Texto', value: 'PT Sans 15px · --wa-color-text-primary' },
        { label: 'Contador', value: 'negrito · --wa-color-accent' },
        { label: 'Altura mínima', value: '44px' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Componente sem frame',
          detail:
            'o arquivo não publica a mensagem fixada. A faixa continua a app bar e se separa da conversa pelo divisor das listas, sem sombra.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Texto', role: 'O enunciado, que pode quebrar linha.', token: '--wa-color-text-primary' },
        { name: 'Contador', role: 'Conteúdo opcional à direita.', token: '--wa-color-accent' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes" />
    <WaDocStage surface="canvas" padding={0} direction="column" align="stretch" width={375}>
      <ChatBanner>Encaminhe 3 mensagens para o Mural da Turma</ChatBanner>
      <ChatBanner trailing="2/3">Mensagens selecionadas para o Mural</ChatBanner>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Em contexto" description="Entre o cabeçalho e a conversa." />
    <div style={{ width: 375, marginBottom: 32 }}>
      <ChatHeader name="Turma 5ºB" presence="você e mais 24 participantes" initials="5B" />
      <ChatBanner trailing="0/3">Encaminhe 3 mensagens para o Mural da Turma</ChatBanner>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ padding: '18px 12px 120px' }}>
          <MessageBubble direction="in" sender="Pedro Henrique" time="08:12">
            O ônibus furou o pneu perto da praça.
          </MessageBubble>
        </div>
      </ChatWallpaper>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={['Uma faixa por conversa.', 'Frase curta: é lida a cada olhada.', 'Contador só quando houver progresso real.']}
      donts={['Empilhar duas faixas.', 'Colocar ação tocável dentro da faixa.', 'Usar para aviso de erro: esse é o Toast.']}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="7. Superfícies suportadas" />
    <WaDocGrid>
      <WaDocCard icon="🌓" title="Tema único">
        A faixa é sempre a continuação da app bar.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="ChatBanner"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Texto da faixa. Obrigatório.' },
        { name: 'trailing', type: 'React.ReactNode', description: 'Conteúdo à direita, como um contador.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Repassados ao elemento raiz.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ChatBanner> = {
  title: 'Whatsapp Mobile/Componentes/ChatBanner',
  component: ChatBanner,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Texto da faixa.' },
    trailing: { control: 'text', description: 'Conteúdo à direita.' },
  },
  args: { children: 'Encaminhe 3 mensagens para o Mural da Turma', trailing: '0/3' },
};

export default meta;

type Story = StoryObj<typeof ChatBanner>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChatBannerDocumentationPage />,
};

/**
 * Playground com 100% das props do ChatBanner expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChatBanner',
  render: (args) => (
    <div style={{ width: 375 }}>
      <ChatBanner {...args} />
    </div>
  ),
};
