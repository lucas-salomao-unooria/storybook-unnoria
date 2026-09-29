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
import { MessageComposer, ChatWallpaper } from '../../../src/unoochat';
import { uncWallpaper, uncWallpaperFor } from '../fixtures';

const BAR = '#716C98';

/**
 * Compositor controlado usado nas demonstrações interativas.
 */
const ControlledComposer: React.FC<{ initial?: string }> = ({ initial = '' }) => {
  const [value, setValue] = useState(initial);
  return (
    <div style={{ width: 411 }}>
      <MessageComposer
        value={value}
        onChange={setValue}
        placeholder="Digite uma mensagem"
        focused={!value}
      />
    </div>
  );
};

/**
 * Página de documentação rica do componente MessageComposer.
 */
const MessageComposerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Conversa"
      title="MessageComposer"
      description="Barra de composição da conversa: campo em cápsula de 41px com raio de 20px sobre --unc-color-surface-sheet, atalhos de emoji, anexo e câmera, cursor de 2×25px em --unc-color-accent e o botão de microfone de 43px fora da cápsula. Funciona nos temas claro e escuro."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="⌨️" title="Campo em cápsula">
        O raio de 20px (<code>--unc-radius-pill</code>) é de uso exclusivo deste componente: é ele
        que distingue o campo de digitação dos demais campos do módulo.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Um só tom para os três atalhos">
        Emoji, anexo e câmera usam <code>--unc-color-icon-muted</code> (#475157 no claro, #CBD4D6
        no escuro), o mesmo tom dos glifos secundários do módulo.
      </UncDocCard>
      <UncDocCard icon="🎙️" title="Ação fora da cápsula">
        O botão de microfone fica ao lado do campo, com 43px de diâmetro em{' '}
        <code>--unc-color-accent</code>. Ele nunca é embutido na cápsula.
      </UncDocCard>
      <UncDocCard icon="✏️" title="Cursor desenhado">
        Um traço de 2×25px em <code>--unc-color-accent</code> indica o foco enquanto o campo está
        vazio. A prop <code>focused</code> o exibe.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="MessageComposer"
      layout="Barra · campo de 41px"
      specs={[
        { label: 'Campo', value: '41px de altura · raio 20px' },
        { label: 'Superfície', value: '--unc-color-surface-sheet · #EFEEF5 · #34375C' },
        { label: 'Placeholder', value: 'Open Sans 400 · 16/24px · #536167 · #A7B5B9' },
        { label: 'Cursor', value: '2 × 25px · --unc-color-accent · #716C98 · #AAA5C2' },
        { label: 'Glifos', value: 'mood · attach_file · photo_camera · #475157 · #CBD4D6' },
        { label: 'Microfone', value: '43px · Fab mic · glifo mic' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Glifos do quadro de ícones',
          detail:
            'emoji, anexo, câmera e microfone são as ligaduras mood, attach_file, photo_camera e mic do Material Symbols Rounded (peso 300), a biblioteca da Plataforma Unooria. Nenhum glifo foi desenhado à mão.',
        },
        {
          subject: 'Contraste do texto de apoio',
          detail:
            '--unc-color-text-placeholder mede 5,57:1 sobre a cápsula no tema claro e 5,39:1 no escuro, acima dos 4,5:1 exigidos para texto normal.',
        },
        {
          subject: 'Foco visível na cápsula',
          detail:
            'o campo de texto suprime o próprio contorno; a indicação de foco é um anel de 2px em --unc-color-accent ao redor da cápsula inteira (:focus-within).',
        },
        {
          subject: 'Sem alternância enviar/gravar',
          detail:
            'o componente expõe uma ação única (onAction), o microfone. A troca por um botão de enviar quando há texto fica a cargo do produto, que decide o que fazer com o valor.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        {
          name: 'Cápsula',
          role: 'Campo de 41px com raio de 20px.',
          token: '--unc-color-surface-sheet · --unc-radius-pill',
        },
        { name: 'Emoji', role: 'Seletor de emoji à esquerda do campo.', token: '--unc-color-icon-muted' },
        {
          name: 'Entrada',
          role: 'Campo de texto com placeholder de 16px.',
          token: '--unc-color-text-placeholder',
        },
        {
          name: 'Cursor',
          role: 'Traço de 2×25px quando o campo está focado e vazio.',
          token: '--unc-color-accent',
        },
        {
          name: 'Anexo e câmera',
          role: 'Atalhos à direita, dentro da cápsula.',
          token: '--unc-color-icon-muted',
        },
        { name: 'Microfone', role: 'Botão de áudio fora da cápsula.', token: '--unc-color-accent' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de estados e uso em contexto"
      description="Vazio, focado, preenchido, com placeholder próprio e controlado; depois, ancorado ao rodapé da conversa."
    />
    <UncDocStage surface="base" direction="column" align="stretch" gap={14} padding={20}>
      <div style={{ width: 411 }}>
        <MessageComposer placeholder="Digite uma mensagem" />
      </div>
      <div style={{ width: 411 }}>
        <MessageComposer placeholder="Digite uma mensagem" focused />
      </div>
      <div style={{ width: 411 }}>
        <MessageComposer value="Já estou a caminho" />
      </div>
      <div style={{ width: 411 }}>
        <MessageComposer placeholder="Adicionar legenda…" />
      </div>
      <ControlledComposer />
    </UncDocStage>
    <div
      style={{
        width: 411,
        height: 300,
        marginBottom: 32,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ChatWallpaper src={uncWallpaper} />
      <MessageComposer placeholder="Digite uma mensagem" focused />
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Ancorar o compositor ao rodapé da tela, logo após o ChatWallpaper.',
        'Controlar value e onChange no consumidor para decidir quando e como enviar.',
        'Manter distintos os rótulos acessíveis dos quatro botões.',
        'Usar focused apenas quando o campo estiver realmente em foco e vazio.',
      ]}
      donts={[
        'Colocar o botão de microfone dentro da cápsula.',
        'Aplicar --unc-radius-pill a outros componentes.',
        'Pintar os três atalhos com tons diferentes.',
        'Reduzir o placeholder abaixo de 16px: a leitura em telas pequenas se perde.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: a cápsula, o placeholder, os atalhos e o cursor trocam de valor juntos."
    />
    <UncDocThemeSwitcher surface="base">
      {(theme) => (
        <div style={{ width: 411, height: 220, display: 'flex', flexDirection: 'column' }}>
          <ChatWallpaper src={uncWallpaperFor(theme)} />
          <MessageComposer placeholder="Digite uma mensagem" focused />
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="MessageComposer"
      rows={[
        { name: 'value', type: 'string', description: 'Valor do campo de texto.' },
        {
          name: 'placeholder',
          type: 'string',
          default: "'Digite uma mensagem'",
          description: 'Texto de espaço reservado.',
        },
        { name: 'onChange', type: '(value: string) => void', description: 'Callback de digitação.' },
        { name: 'onEmoji', type: '(event) => void', description: 'Callback do seletor de emoji.' },
        { name: 'onAttach', type: '(event) => void', description: 'Callback do clipe de anexo.' },
        { name: 'onCamera', type: '(event) => void', description: 'Callback do atalho de câmera.' },
        { name: 'onAction', type: '(event) => void', description: 'Callback do botão de microfone.' },
        {
          name: 'focused',
          type: 'boolean',
          default: 'false',
          description: 'Exibe o cursor de 2×25px enquanto o campo está vazio.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MessageComposer> = {
  title: 'Unoochat/Componentes/MessageComposer',
  component: MessageComposer,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: 'text', description: 'Valor do campo de texto.' },
    placeholder: { control: 'text', description: 'Texto de espaço reservado.' },
    focused: { control: 'boolean', description: 'Exibe o cursor de 2×25px.' },
    onChange: { action: 'onChange', description: 'Callback de digitação.' },
    onEmoji: { action: 'onEmoji', description: 'Callback do seletor de emoji.' },
    onAttach: { action: 'onAttach', description: 'Callback do clipe de anexo.' },
    onCamera: { action: 'onCamera', description: 'Callback do atalho de câmera.' },
    onAction: { action: 'onAction', description: 'Callback do botão de microfone.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: { value: '', placeholder: 'Digite uma mensagem', focused: true },
};

export default meta;

type Story = StoryObj<typeof MessageComposer>;

/**
 * Documentação rica e completa do componente.
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
    <UncDocStage surface="base" padding={20}>
      <div style={{ width: 411 }}>
        <MessageComposer {...args} />
      </div>
    </UncDocStage>
  ),
};

/**
 * Rodapé de uma conversa: compositor sobre a textura do fundo.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <div style={{ width: 411, height: 300, display: 'flex', flexDirection: 'column' }}>
      <ChatWallpaper src={uncWallpaper} />
      <MessageComposer placeholder="Digite uma mensagem" focused />
    </div>
  ),
};

/**
 * Estados vazio, focado e preenchido, nos dois temas.
 */
export const Estados: Story = {
  render: () => (
    <>
      <UncDocStage
        label="Tema claro"
        theme="light"
        surface="base"
        direction="column"
        align="stretch"
        gap={14}
        padding={20}
      >
        <div style={{ width: 411 }}>
          <MessageComposer placeholder="Digite uma mensagem" />
        </div>
        <div style={{ width: 411 }}>
          <MessageComposer placeholder="Digite uma mensagem" focused />
        </div>
        <div style={{ width: 411 }}>
          <MessageComposer value="Já estou a caminho" />
        </div>
        <ControlledComposer />
      </UncDocStage>
      <UncDocStage
        label="Tema escuro"
        theme="dark"
        surface="base"
        direction="column"
        align="stretch"
        gap={14}
        padding={20}
      >
        <div style={{ width: 411 }}>
          <MessageComposer placeholder="Digite uma mensagem" />
        </div>
        <div style={{ width: 411 }}>
          <MessageComposer placeholder="Digite uma mensagem" focused />
        </div>
        <div style={{ width: 411 }}>
          <MessageComposer value="Já estou a caminho" />
        </div>
      </UncDocStage>
    </>
  ),
};
