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
import { MessageComposer, ChatWallpaper } from '../../../src/whatsappmobile';
import { waWallpaper } from '../fixtures';

const BAR = '#0CA996';

/**
 * Compositor controlado usado nas demonstrações interativas.
 */
const ControlledComposer: React.FC<{ initial?: string }> = ({ initial = '' }) => {
  const [value, setValue] = useState(initial);
  return (
    <div style={{ width: 411 }}>
      <MessageComposer value={value} onChange={setValue} focused={!value} />
    </div>
  );
};

/**
 * Página de documentação rica do componente MessageComposer.
 */
const MessageComposerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Conversa"
      title="MessageComposer"
      description="Barra de composição da conversa. Reproduz o campo em cápsula de 333×41px com raio de 20px em --wa-color-surface-sheet, os três glifos de emoji, anexo e câmera em suas cores exatas, o cursor sublinhado de 25×2px em --wa-color-accent-underline e o FAB de microfone de 43px."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="⌨️" title="Campo em cápsula">
        O raio de 20px é o único uso de <code>--wa-radius-pill</code> em todo o arquivo, exclusivo
        deste componente.
      </WaDocCard>
      <WaDocCard icon="🎨" title="Três cinzas distintos">
        Emoji <code>#A6ABAF</code>, clipe <code>#A7ACB0</code> e câmera <code>#9FA5A9</code>. São
        tons quase idênticos, preservados como tokens separados.
      </WaDocCard>
      <WaDocCard icon="🎙️" title="Ação fora da cápsula">
        O FAB de microfone fica ao lado do campo, não dentro dele, com 43px de diâmetro em{' '}
        <code>--wa-color-accent-fab-mic</code>.
      </WaDocCard>
      <WaDocCard icon="✏️" title="Cursor desenhado">
        O arquivo desenha um traço verde de 25×2px representando o cursor. A prop{' '}
        <code>focused</code> reproduz esse detalhe quando o campo está vazio.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3020"
      frameName="Direct Message · compositor"
      specs={[
        { label: 'Campo', value: '333 × 41 px' },
        { label: 'Raio', value: '20 px' },
        { label: 'Superfície', value: '#2D383E' },
        { label: 'Placeholder', value: 'PT Sans 400 · 20px · #707980' },
        { label: 'Cursor', value: '25 × 2 px · #20A497' },
        { label: 'FAB', value: '43 px · #02AF9C' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Glifo de emoji',
          detail:
            'o nó bi:emoji-smile-fill do compositor foi exportado com viewBox 1×1 (colapsado). O componente usa o vetor equivalente do mesmo frame (node 1:3497, 20,5556 × 20), que é o glifo realmente visível na captura.',
        },
        {
          subject: 'Alternância enviar/gravar',
          detail:
            'o arquivo desenha somente o microfone. A troca por um botão de enviar quando há texto não existe nos frames e não foi implementada; onAction cobre a ação única.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Cápsula', role: 'Campo de 41px com raio de 20px.', token: '--wa-color-surface-sheet · --wa-radius-pill' },
        { name: 'Emoji', role: 'Seletor de emoji à esquerda do campo.', token: '--wa-color-icon-composer-emoji' },
        { name: 'Entrada', role: 'Campo de texto com placeholder de 20px.', token: '--wa-color-text-placeholder' },
        { name: 'Cursor', role: 'Traço verde de 25×2px quando o campo está focado e vazio.', token: '--wa-color-accent-underline' },
        { name: 'Anexo e câmera', role: 'Atalhos à direita dentro da cápsula.', token: '--wa-color-icon-composer-attach · --wa-color-icon-composer-camera' },
        { name: 'FAB', role: 'Botão de áudio fora da cápsula.', token: '--wa-color-accent-fab-mic' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de estados" />
    <WaDocStage surface="base" direction="column" align="stretch" gap={14} padding={20}>
      <div style={{ width: 411 }}>
        <MessageComposer />
      </div>
      <div style={{ width: 411 }}>
        <MessageComposer focused />
      </div>
      <div style={{ width: 411 }}>
        <MessageComposer value="Já estou a caminho" />
      </div>
      <div style={{ width: 411 }}>
        <MessageComposer placeholder="Adicionar legenda…" />
      </div>
      <ControlledComposer />
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Em contexto"
      description="Ancorado ao rodapé da conversa, sobre a textura oficial."
    />
    <div style={{ width: 411, height: 300, marginBottom: 32, display: 'flex', flexDirection: 'column' }}>
      <ChatWallpaper src={waWallpaper} />
      <MessageComposer focused />
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Ancorar o compositor ao rodapé da tela, após o ChatWallpaper.',
        'Controlar value e onChange no consumidor para habilitar o envio.',
        'Manter os quatro rótulos acessíveis distintos entre si.',
        'Usar focused apenas quando o campo estiver realmente em foco e vazio.',
      ]}
      donts={[
        'Colocar o FAB dentro da cápsula.',
        'Aplicar --wa-radius-pill a outros componentes.',
        'Uniformizar os três cinzas dos glifos.',
        'Substituir o microfone por um botão de enviar: não existe no arquivo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['base', 'canvas']} initial="base">
      {() => (
        <div style={{ width: 411 }}>
          <MessageComposer focused />
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="MessageComposer"
      rows={[
        { name: 'value', type: 'string', description: 'Valor do campo de texto.' },
        { name: 'placeholder', type: 'string', default: "'Type a message'", description: 'Texto de espaço reservado.' },
        { name: 'onChange', type: '(value: string) => void', description: 'Callback de digitação.' },
        { name: 'onEmoji', type: '(event) => void', description: 'Callback do seletor de emoji.' },
        { name: 'onAttach', type: '(event) => void', description: 'Callback do clipe de anexo.' },
        { name: 'onCamera', type: '(event) => void', description: 'Callback do atalho de câmera.' },
        { name: 'onAction', type: '(event) => void', description: 'Callback do FAB de microfone.' },
        { name: 'focused', type: 'boolean', default: 'false', description: 'Exibe o cursor sublinhado do arquivo.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MessageComposer> = {
  title: 'Whatsapp Mobile/Componentes/MessageComposer',
  component: MessageComposer,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: 'text', description: 'Valor do campo de texto.' },
    placeholder: { control: 'text', description: 'Texto de espaço reservado.' },
    focused: { control: 'boolean', description: 'Exibe o cursor sublinhado.' },
  },
  args: { value: '', placeholder: 'Type a message', focused: true },
};

export default meta;

type Story = StoryObj<typeof MessageComposer>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MessageComposerDocumentationPage />,
};

/**
 * Playground com 100% das props do MessageComposer expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do MessageComposer',
  render: (args) => (
    <WaDocStage surface="base" padding={20}>
      <div style={{ width: 411 }}>
        <MessageComposer {...args} />
      </div>
    </WaDocStage>
  ),
};

/**
 * Réplica do rodapé do frame "Direct Message".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 411, height: 300, display: 'flex', flexDirection: 'column' }}>
      <ChatWallpaper src={waWallpaper} />
      <MessageComposer focused />
    </div>
  ),
};

/**
 * Estados vazio, focado e preenchido.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="base" direction="column" align="stretch" gap={14} padding={20}>
      <div style={{ width: 411 }}>
        <MessageComposer />
      </div>
      <div style={{ width: 411 }}>
        <MessageComposer focused />
      </div>
      <div style={{ width: 411 }}>
        <MessageComposer value="Já estou a caminho" />
      </div>
      <ControlledComposer />
    </WaDocStage>
  ),
};
