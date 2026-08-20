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
  ChatWallpaper,
  DateChip,
  EncryptionNotice,
  MessageBubble,
} from '../../../src/whatsappmobile';
import { waWallpaper, waSamplePhoto } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente ChatWallpaper.
 */
const ChatWallpaperDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Conversa"
      title="ChatWallpaper"
      description="Superfície de fundo da tela de conversa. A textura de rabiscos do arquivo é uma imagem rasterizada colada no frame, não um vetor reconstituível; por isso é recebida pela prop src e versionada em public/whatsappmobile/. Sem textura, o fundo assume --wa-color-surface-base, a cor de base do frame de origem."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🖼️" title="Textura rasterizada">
        Os rabiscos coloridos do fundo são um bitmap. Recriar isso em vetor produziria um desenho
        diferente do original, então o arquivo exportado é usado diretamente.
      </WaDocCard>
      <WaDocCard icon="🌑" title="Fundo sólido como padrão">
        Sem <code>src</code>, o componente aplica <code>--wa-color-surface-base</code> (#090E12),
        que é a cor sob a textura no arquivo.
      </WaDocCard>
      <WaDocCard icon="📐" title="Coluna flexível">
        Ocupa todo o espaço disponível entre o cabeçalho e o compositor, empilhando o conteúdo em
        coluna.
      </WaDocCard>
      <WaDocCard icon="🎨" title="Papel de parede substituível">
        Como o produto permite trocar o papel de parede, a prop <code>src</code> aceita qualquer
        imagem sem alterar o restante da tela.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2974"
      frameName="Direct Message · textura de fundo"
      specs={[
        { label: 'Tipo do recurso', value: 'Imagem rasterizada' },
        { label: 'Export', value: '540 × 1036 · JPEG' },
        { label: 'Ajuste', value: 'cover, centralizado' },
        { label: 'Cor sob a textura', value: '#090E12' },
        { label: 'Arquivo versionado', value: 'public/whatsappmobile/chat-wallpaper.jpg' },
        { label: 'Frames que usam', value: 'Direct Message e derivados' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Textura como prop',
          detail:
            'a imagem não é embutida no pacote NPM para não inflar o bundle. O consumidor informa a URL; a documentação usa o arquivo exportado do Figma e versionado em public/.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Superfície', role: 'Fundo sólido sob a textura.', token: '--wa-color-surface-base' },
        { name: 'Textura', role: 'Imagem de papel de parede em cover.', token: 'prop src' },
        { name: 'Conteúdo', role: 'Coluna flexível que hospeda mensagens e avisos.', token: 'wa-chatwallpaper__content' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes" />
    <WaDocStage surface="canvas" padding={20} gap={20} align="flex-start">
      <div style={{ width: 200, height: 300 }}>
        <ChatWallpaper src={waWallpaper} />
      </div>
      <div style={{ width: 200, height: 300 }}>
        <ChatWallpaper />
      </div>
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Em contexto"
      description="Com separador de data, aviso de criptografia e balões reais."
    />
    <div style={{ width: 411, height: 420, marginBottom: 32 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '18px 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DateChip>TODAY</DateChip>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <EncryptionNotice />
          </div>
          <MessageBubble direction="out" time="9:03 am" delivery="read" maxWidth={250}>
            <MessageBubble.Media src={waSamplePhoto} alt="Fotografia enviada" />
          </MessageBubble>
        </div>
      </ChatWallpaper>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Colocar o ChatWallpaper entre o ChatHeader e o MessageComposer.',
        'Informar src com o arquivo exportado do Figma nas telas de documentação.',
        'Deixar o fundo sólido quando o papel de parede estiver desativado.',
        'Manter o conteúdo dentro do slot children, que já é uma coluna flexível.',
      ]}
      donts={[
        'Reconstruir os rabiscos em SVG desenhado à mão.',
        'Aplicar background-repeat: a textura do arquivo é usada em cover.',
        'Usar --wa-color-surface-canvas como fundo da conversa (é a cor das listagens).',
        'Empilhar dois ChatWallpaper na mesma tela.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['base', 'canvas']} initial="base">
      {() => (
        <div style={{ width: 240, height: 200 }}>
          <ChatWallpaper src={waWallpaper} />
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="ChatWallpaper"
      rows={[
        { name: 'src', type: 'string', description: 'URL da textura de fundo. Sem ela, aplica apenas a cor de base.' },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo empilhado sobre a textura.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ChatWallpaper> = {
  title: 'Whatsapp Mobile/Componentes/ChatWallpaper',
  component: ChatWallpaper,
  parameters: { layout: 'padded' },
  argTypes: { src: { control: 'text', description: 'URL da textura de fundo.' } },
  args: { src: waWallpaper },
};

export default meta;

type Story = StoryObj<typeof ChatWallpaper>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChatWallpaperDocumentationPage />,
};

/**
 * Playground com 100% das props do ChatWallpaper expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChatWallpaper',
  render: (args) => (
    <div style={{ width: 411, height: 420 }}>
      <ChatWallpaper {...args}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 18 }}>
          <DateChip>TODAY</DateChip>
        </div>
      </ChatWallpaper>
    </div>
  ),
};

/**
 * Réplica do fundo do frame "Direct Message".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 411, height: 500 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 18 }}>
          <DateChip>TODAY</DateChip>
          <EncryptionNotice />
        </div>
      </ChatWallpaper>
    </div>
  ),
};

/**
 * Comparação entre fundo com textura e fundo sólido.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="canvas" padding={20} gap={20} align="flex-start">
      <div style={{ width: 200, height: 300 }}>
        <ChatWallpaper src={waWallpaper} />
      </div>
      <div style={{ width: 200, height: 300 }}>
        <ChatWallpaper />
      </div>
    </WaDocStage>
  ),
};
