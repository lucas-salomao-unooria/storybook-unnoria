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
import { ChatWallpaper, MessageBubble, MessageTag } from '../../../src/whatsappmobile';
import { waWallpaper } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente MessageTag.
 */
const MessageTagDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Extensões"
      title="MessageTag"
      description="Etiqueta de classificação presa a uma mensagem — pictograma mais rótulo, numa cápsula neutra. Não tem variante de cor: quem distingue uma da outra é o rótulo e a forma do pictograma. Extensão sem frame de origem."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🏷️" title="Classificar uma mensagem">
        Como a marca “encaminhada com frequência” do app real: uma afirmação sobre a mensagem, presa
        a ela.
      </WaDocCard>
      <WaDocCard icon="👁️" title="Sem depender de cor">
        Duas etiquetas lado a lado se distinguem pela forma do pictograma e pelo rótulo por
        extenso. Quem não enxerga cor lê a mesma coisa.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2173"
      frameName="General settings · superfície do menu (a âncora da cápsula)"
      specs={[
        { label: 'Superfície', value: '--wa-color-surface-elevated' },
        { label: 'Contorno', value: '1px · --wa-color-border-control' },
        { label: 'Rótulo', value: 'PT Sans 12px bold · --wa-color-text-primary' },
        { label: 'Raio', value: '20px (--wa-radius-pill)' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Componente sem frame',
          detail:
            'o arquivo não publica etiqueta de classificação. A cápsula usa a superfície do menu e o contorno do controle, neutros de propósito.',
        },
        {
          subject: 'Sem escada de severidade',
          detail:
            'a marca publica um vermelho de chamada e nenhum verde de sucesso. Dar cor à etiqueta seria inventar semântica que o arquivo não tem — e esconderia a informação de quem não enxerga cor.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Pictograma', role: 'Caractere ou Icon, decorativo.', token: '—' },
        { name: 'Rótulo', role: 'A afirmação, por extenso.', token: '--wa-color-text-primary' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz" />
    <WaDocStage surface="canvas" padding={28} gap={12}>
      <MessageTag icon="✅">Verdadeira</MessageTag>
      <MessageTag icon="❌">Falsa</MessageTag>
      <MessageTag icon="🔥">Emocional</MessageTag>
      <MessageTag icon="💬">Neutra</MessageTag>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Em contexto" description="Sob o balão, duas etiquetas independentes." />
    <div style={{ width: 411, marginBottom: 32 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, padding: '18px 12px' }}>
          <MessageBubble direction="out" forwardedLabel="Encaminhada" time="09:04" delivery="read">
            Diretoria regional exige autorização com firma reconhecida em cartório.
          </MessageBubble>
          <div style={{ display: 'flex', gap: 6 }}>
            <MessageTag icon="❌">Falsa</MessageTag>
            <MessageTag icon="💬">Neutra</MessageTag>
          </div>
        </div>
      </ChatWallpaper>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={['Rótulo por extenso, sempre.', 'Pictogramas de formas diferentes para classes diferentes.']}
      donts={['Distinguir duas etiquetas só pela cor.', 'Usar como contador: esse é o Badge.']}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="7. Superfícies suportadas" description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais." />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base', 'appbar']} initial="canvas">
      {() => <MessageTag icon="✅">Verdadeira</MessageTag>}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="MessageTag"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo por extenso. Obrigatório.' },
        { name: 'icon', type: 'React.ReactNode', description: 'Pictograma antes do rótulo.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLSpanElement>', description: 'Repassados ao elemento raiz.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MessageTag> = {
  title: 'Whatsapp Mobile/Componentes/MessageTag',
  component: MessageTag,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Rótulo.' },
    icon: { control: 'text', description: 'Pictograma.' },
  },
  args: { children: 'Verdadeira', icon: '✅' },
};

export default meta;

type Story = StoryObj<typeof MessageTag>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MessageTagDocumentationPage />,
};

/**
 * Playground com 100% das props do MessageTag expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do MessageTag',
  render: (args) => (
    <WaDocStage surface="canvas" padding={40}>
      <MessageTag {...args} />
    </WaDocStage>
  ),
};
