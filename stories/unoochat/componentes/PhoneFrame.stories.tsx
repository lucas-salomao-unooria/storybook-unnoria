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
  PhoneFrame,
  StatusBar,
  TopBar,
  TabBar,
  ChatListItem,
  Fab,
} from '../../../src/unoochat';
import { uncChats, uncTabs } from '../fixtures';

const BAR = '#716C98';

/**
 * Argumentos do playground: as props do componente mais o tema, que na prática
 * é o atributo `data-unc-theme` repassado ao elemento raiz.
 */
type PhoneFramePlaygroundArgs = React.ComponentProps<typeof PhoneFrame> & {
  tema?: 'light' | 'dark';
};

/**
 * Tela de conversas usada como conteúdo de demonstração.
 */
const ChatsScreen: React.FC = () => (
  <>
    <StatusBar />
    <TopBar title="Unoochat" footer={<TabBar items={uncTabs} activeId="chats" />} />
    <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {uncChats.slice(0, 9).map((chat) => (
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
      badgeBrand="Unoochat"
      category="Componentes • Documentação"
      title="PhoneFrame"
      description="Contêiner de documentação com as medidas do aparelho de referência do módulo: 411×823px. Serve para apresentar telas compostas nas estórias, nos temas claro e escuro. Não é um componente de produção."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="📱" title="Medidas do aparelho de referência">
        Todas as telas do módulo são compostas em 411×823px, definidos por{' '}
        <code>--unc-device-width</code> e <code>--unc-device-height</code>. Manter uma única medida
        faz as telas compostas se compararem sem ajuste.
      </UncDocCard>
      <UncDocCard icon="🔍" title="Escala para comparações">
        A prop <code>scale</code> reduz o aparelho para exibir várias telas lado a lado sem alterar
        as medidas internas.
      </UncDocCard>
      <UncDocCard icon="🖼️" title="Moldura opcional">
        <code>bordered</code> desenha um contorno de 1px em <code>--unc-color-border-divider</code>{' '}
        com raio de 8px, útil para destacar o limite da tela sobre fundos claros.
      </UncDocCard>
      <UncDocCard icon="🌓" title="Tema herdado ou declarado">
        O aparelho não tem prop de tema: ele herda o <code>data-unc-theme</code> do ancestral mais
        próximo. Para fixar um tema, passe <code>data-unc-theme=&quot;dark&quot;</code> ao próprio
        PhoneFrame — o atributo vai ao elemento raiz e vale também para a legenda.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="PhoneFrame"
      layout="Contêiner · 411 × 823px"
      specs={[
        { label: 'Dimensões', value: '411 × 823 px' },
        { label: 'Fundo', value: '--unc-color-surface-canvas · #FFFFFF · #0E1039' },
        { label: 'Moldura', value: '1px · --unc-color-border-divider · raio 8px' },
        { label: 'Recorte', value: 'overflow: hidden' },
        { label: 'Legenda', value: 'Open Sans 400 · 12px · --unc-color-text-secondary' },
        { label: 'Natureza', value: 'contêiner de documentação' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Não é componente de produção',
          detail:
            'o PhoneFrame existe apenas para as estórias, no mesmo papel do PhoneFrame das demais marcas do pacote. Não deve ser usado em aplicações reais.',
        },
        {
          subject: 'Moldura e raio',
          detail:
            'a moldura de 1px com raio de 8px delimita a tela sobre o painel de documentação; desative com bordered={false} para compor sem contorno.',
        },
        {
          subject: 'Tema por atributo, não por prop',
          detail:
            'o tema é decidido por data-unc-theme, como em qualquer produto: no ancestral (por exemplo, o alternador de temas da documentação) ou no próprio PhoneFrame. A prop scale não altera o tema.',
        },
        {
          subject: 'Medidas fixas',
          detail:
            'a caixa é 411×823px, as mesmas dimensões estruturais do módulo (--unc-device-width e --unc-device-height). Escalar o aparelho aplica transform, sem redistribuir o conteúdo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        {
          name: 'Aparelho',
          role: 'Caixa de 411×823 com recorte e fundo de canvas do tema ativo.',
          token: '--unc-device-width · --unc-device-height · --unc-color-surface-canvas',
        },
        {
          name: 'Moldura',
          role: 'Contorno opcional de 1px com raio de 8px.',
          token: '--unc-color-border-divider · --unc-radius-xl',
        },
        {
          name: 'Legenda',
          role: 'Texto de identificação abaixo do aparelho.',
          token: '--unc-font-caption-size · --unc-color-text-secondary',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, escalas e temas"
      description="Com e sem moldura, em escala reduzida e nos dois temas, fixados por data-unc-theme no próprio PhoneFrame."
    />
    <UncDocStage surface="base" padding={20} gap={24} align="flex-start">
      <PhoneFrame caption="bordered · scale 1">
        <ChatsScreen />
      </PhoneFrame>
      <PhoneFrame bordered={false} caption="sem moldura · scale 1">
        <ChatsScreen />
      </PhoneFrame>
      <PhoneFrame scale={0.7} caption="scale 0,7">
        <ChatsScreen />
      </PhoneFrame>
    </UncDocStage>
    <UncDocStage surface="base" padding={20} gap={24} align="flex-start">
      <PhoneFrame data-unc-theme="light" scale={0.6} caption='data-unc-theme="light"'>
        <ChatsScreen />
      </PhoneFrame>
      <PhoneFrame data-unc-theme="dark" scale={0.6} caption='data-unc-theme="dark"'>
        <ChatsScreen />
      </PhoneFrame>
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Registrar na legenda o nome da tela apresentada.',
        'Usar scale para comparar várias telas lado a lado.',
        'Manter a StatusBar como primeiro filho do aparelho.',
        'Fixar o tema com data-unc-theme quando a estória compara claro e escuro na mesma linha.',
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
      title="6. Suporte a temas"
      description="O alternador troca data-unc-theme no contêiner acima do aparelho, e tudo dentro dele — inclusive o fundo do PhoneFrame — acompanha."
    />
    <UncDocThemeSwitcher surface="base">
      {() => (
        <PhoneFrame scale={0.5} caption="Conversas">
          <ChatsScreen />
        </PhoneFrame>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="PhoneFrame"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo da tela.' },
        { name: 'caption', type: 'string', description: 'Legenda exibida abaixo do aparelho.' },
        {
          name: 'scale',
          type: 'number',
          default: '1',
          description: 'Fator de escala aplicado ao aparelho.',
        },
        {
          name: 'bordered',
          type: 'boolean',
          default: 'true',
          description: 'Desenha a moldura arredondada.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: 'data-unc-theme',
          type: "'light' | 'dark'",
          description:
            'Não é uma prop declarada: como qualquer atributo, é repassado ao elemento raiz e fixa o tema do aparelho e da legenda. Ausente, herda do ancestral.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<PhoneFramePlaygroundArgs> = {
  title: 'Unoochat/Componentes/PhoneFrame',
  component: PhoneFrame,
  parameters: { layout: 'padded' },
  argTypes: {
    caption: { control: 'text', description: 'Legenda exibida abaixo do aparelho.' },
    scale: {
      control: { type: 'range', min: 0.3, max: 1.2, step: 0.05 },
      description: 'Fator de escala.',
    },
    bordered: { control: 'boolean', description: 'Desenha a moldura arredondada.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
    tema: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Tema do aparelho, repassado como data-unc-theme.',
    },
  },
  args: { caption: 'Conversas', scale: 1, bordered: true, tema: 'light' },
};

export default meta;

type Story = StoryObj<PhoneFramePlaygroundArgs>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PhoneFrameDocumentationPage />,
};

/**
 * Playground com 100% das props do PhoneFrame expostas, mais o tema.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PhoneFrame',
  render: ({ tema, ...args }) => (
    <UncDocStage surface="base" padding={20}>
      <PhoneFrame {...args} data-unc-theme={tema}>
        <ChatsScreen />
      </PhoneFrame>
    </UncDocStage>
  ),
};

/**
 * A tela de conversas no aparelho de referência, 411×823px.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UncDocStage surface="base" padding={20}>
      <PhoneFrame caption="Conversas">
        <ChatsScreen />
      </PhoneFrame>
    </UncDocStage>
  ),
};

/**
 * Comparação de escalas e de moldura.
 */
export const Tamanhos: Story = {
  render: () => (
    <UncDocStage surface="base" padding={20} gap={24} align="flex-start">
      <PhoneFrame scale={1} caption="scale 1">
        <ChatsScreen />
      </PhoneFrame>
      <PhoneFrame scale={0.75} caption="scale 0,75">
        <ChatsScreen />
      </PhoneFrame>
      <PhoneFrame scale={0.5} bordered={false} caption="scale 0,5 sem moldura">
        <ChatsScreen />
      </PhoneFrame>
    </UncDocStage>
  ),
};

/**
 * O mesmo aparelho nos dois temas, fixados pelo atributo data-unc-theme.
 */
export const Temas: Story = {
  render: () => (
    <UncDocStage surface="base" padding={20} gap={24} align="flex-start">
      <PhoneFrame data-unc-theme="light" scale={0.6} caption="Tema claro">
        <ChatsScreen />
      </PhoneFrame>
      <PhoneFrame data-unc-theme="dark" scale={0.6} caption="Tema escuro">
        <ChatsScreen />
      </PhoneFrame>
    </UncDocStage>
  ),
};
