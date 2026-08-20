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
  PhoneFrame,
  StatusBar,
  TopBar,
  TabBar,
  ChatListItem,
  Fab,
} from '../../../src/whatsappmobile';
import { waChats, waTabs } from '../fixtures';

const BAR = '#0CA996';

/**
 * Tela de conversas usada como conteúdo de demonstração.
 */
const ChatsScreen: React.FC = () => (
  <>
    <StatusBar />
    <TopBar title="WhatsApp" footer={<TabBar items={waTabs} activeId="chats" />} />
    <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {waChats.slice(0, 9).map((chat) => (
          <ChatListItem
            key={chat.id}
            name={chat.name}
            time={chat.time}
            avatarSrc={chat.avatarSrc}
            unread={chat.unread}
            muted={chat.muted}
            compact={chat.compact}
          />
        ))}
      </ul>
      <div style={{ position: 'absolute', right: 32, bottom: 26 }}>
        <Fab variant="chat" label="Nova conversa" />
      </div>
    </div>
  </>
);

/**
 * Página de documentação rica do componente PhoneFrame.
 */
const PhoneFrameDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Documentação"
      title="PhoneFrame"
      description="Contêiner de documentação que reproduz as medidas exatas dos frames do arquivo: 411×823, o tamanho do Google Pixel 2 XL usado nas setenta e cinco telas. Serve para apresentar telas compostas nas estórias — não é um componente de produção."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="📱" title="Medidas do arquivo">
        411×823 é a única resolução do arquivo. Reproduzi-la garante que qualquer comparação com o
        Dev Mode coincida pixel a pixel.
      </WaDocCard>
      <WaDocCard icon="🔍" title="Escala para comparações">
        A prop <code>scale</code> reduz o aparelho para exibir várias telas lado a lado sem alterar
        as medidas internas.
      </WaDocCard>
      <WaDocCard icon="🖼️" title="Moldura opcional">
        <code>bordered</code> desenha um contorno de 1px em <code>--wa-color-border-divider</code>{' '}
        com raio de 8px, útil para destacar o limite da tela sobre fundos claros.
      </WaDocCard>
      <WaDocCard icon="🏷️" title="Legenda de rastreabilidade">
        <code>caption</code> registra o nome e o node do frame reproduzido, mantendo a
        documentação auditável.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2024"
      frameName="Chats Main Page · frame do dispositivo"
      specs={[
        { label: 'Dispositivo', value: 'Google Pixel 2 XL' },
        { label: 'Dimensões', value: '411 × 823 px' },
        { label: 'Frames no arquivo', value: '75' },
        { label: 'Fundo padrão', value: '#101D25' },
        { label: 'Recorte', value: 'overflow: hidden' },
        { label: 'Natureza', value: 'contêiner de documentação' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Moldura e raio',
          detail:
            'os frames do Figma não têm borda nem raio. A moldura de 1px com raio de 8px é um recurso da documentação para delimitar a tela; desative com bordered={false} ao comparar diretamente com o arquivo.',
        },
        {
          subject: 'Não é componente de produção',
          detail:
            'o PhoneFrame existe apenas para as estórias, no mesmo papel do PhoneFrame do Instanooria. Não deve ser usado em aplicações reais.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Aparelho', role: 'Caixa de 411×823 com recorte e fundo de canvas.', token: '--wa-device-width · --wa-device-height' },
        { name: 'Moldura', role: 'Contorno opcional de 1px com raio de 8px.', token: '--wa-color-border-divider · --wa-radius-xl' },
        { name: 'Legenda', role: 'Texto de rastreabilidade abaixo do aparelho.', token: '--wa-font-caption-* · --wa-color-text-meta' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e escalas" />
    <WaDocStage surface="base" padding={20} gap={24} align="flex-start">
      <PhoneFrame caption="bordered · scale 1">
        <ChatsScreen />
      </PhoneFrame>
      <PhoneFrame bordered={false} caption="sem moldura · scale 1">
        <ChatsScreen />
      </PhoneFrame>
      <PhoneFrame scale={0.7} caption="scale 0,7">
        <ChatsScreen />
      </PhoneFrame>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Registrar o nome e o node do frame na legenda.',
        'Usar scale para comparar várias telas lado a lado.',
        'Manter a StatusBar como primeiro filho do aparelho.',
        'Desativar a moldura ao comparar diretamente com o Dev Mode.',
      ]}
      donts={[
        'Usar o PhoneFrame em código de produção.',
        'Alterar as dimensões de 411×823.',
        'Colocar conteúdo fora do aparelho esperando que ele participe do recorte.',
        'Aplicar sombra à moldura.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne a superfície ao redor do aparelho."
    />
    <WaDocSurfaceSwitcher surfaces={['base', 'canvas']} initial="base">
      {() => (
        <PhoneFrame scale={0.5} caption="Chats Main Page">
          <ChatsScreen />
        </PhoneFrame>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="PhoneFrame"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo da tela.' },
        { name: 'caption', type: 'string', description: 'Legenda exibida abaixo do aparelho.' },
        { name: 'scale', type: 'number', default: '1', description: 'Fator de escala aplicado ao aparelho.' },
        { name: 'bordered', type: 'boolean', default: 'true', description: 'Desenha a moldura arredondada.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PhoneFrame> = {
  title: 'Whatsapp Mobile/Componentes/PhoneFrame',
  component: PhoneFrame,
  parameters: { layout: 'padded' },
  argTypes: {
    caption: { control: 'text', description: 'Legenda exibida abaixo do aparelho.' },
    scale: { control: { type: 'range', min: 0.3, max: 1.2, step: 0.05 }, description: 'Fator de escala.' },
    bordered: { control: 'boolean', description: 'Desenha a moldura arredondada.' },
  },
  args: { caption: 'Chats Main Page · node 1:2024', scale: 1, bordered: true },
};

export default meta;

type Story = StoryObj<typeof PhoneFrame>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PhoneFrameDocumentationPage />,
};

/**
 * Playground com 100% das props do PhoneFrame expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PhoneFrame',
  render: (args) => (
    <WaDocStage surface="base" padding={20}>
      <PhoneFrame {...args}>
        <ChatsScreen />
      </PhoneFrame>
    </WaDocStage>
  ),
};

/**
 * Réplica do frame "Chats Main Page" nas medidas exatas do arquivo.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="base" padding={20}>
      <PhoneFrame caption="Chats Main Page · node 1:2024">
        <ChatsScreen />
      </PhoneFrame>
    </WaDocStage>
  ),
};

/**
 * Comparação de escalas e de moldura.
 */
export const Tamanhos: Story = {
  render: () => (
    <WaDocStage surface="base" padding={20} gap={24} align="flex-start">
      <PhoneFrame scale={1} caption="scale 1">
        <ChatsScreen />
      </PhoneFrame>
      <PhoneFrame scale={0.75} caption="scale 0,75">
        <ChatsScreen />
      </PhoneFrame>
      <PhoneFrame scale={0.5} bordered={false} caption="scale 0,5 sem moldura">
        <ChatsScreen />
      </PhoneFrame>
    </WaDocStage>
  ),
};
