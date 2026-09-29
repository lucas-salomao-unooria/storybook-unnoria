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
import { ChatBanner, ChatHeader, ChatWallpaper, MessageBubble } from '../../../src/unoochat';
import { uncWallpaperFor } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente ChatBanner.
 */
const ChatBannerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Extensões"
      title="ChatBanner"
      description="Faixa fixa sob o cabeçalho da conversa, com o enunciado ou a mensagem fixada e um conteúdo opcional à direita (um contador). Continua a barra superior: mesma superfície, separada da conversa por um fio de 1px, sem sombra."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="📌" title="O enunciado que fica">
        A faixa não rola com as mensagens: o que a pessoa veio fazer continua à vista depois que
        ela desce pelo histórico.
      </UncDocCard>
      <UncDocCard icon="🔢" title="Contador à direita">
        <code>trailing</code> mostra o progresso, como “0/3”, em números tabulares e em negrito, na
        cor de acento do tema.
      </UncDocCard>
      <UncDocCard icon="🌓" title="Claro e escuro">
        Superfície, texto e acento acompanham <code>data-unc-theme</code>; nenhum valor é fixado no
        componente.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="ChatBanner"
      layout="Faixa · altura mínima de 44px"
      specs={[
        { label: 'Superfície', value: '--unc-color-surface-appbar' },
        { label: 'Fio inferior', value: '1px · --unc-color-border-divider' },
        { label: 'Texto', value: 'Open Sans 14px · --unc-color-text-primary' },
        { label: 'Contador', value: 'Open Sans 14px negrito · --unc-color-accent' },
        { label: 'Recuo', value: '8px vertical · 16px horizontal' },
        { label: 'Altura mínima', value: '44px' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Extensão sem par na Plataforma Unooria',
          detail:
            'a Unooria não tem faixa fixa de conversa. A faixa continua a barra superior (--unc-color-surface-appbar) e se separa da conversa pelo divisor das listas, sem sombra.',
        },
        {
          subject: 'Separação no tema escuro',
          detail:
            'no escuro a superfície e o fio usam o mesmo tom (--unooria-color-brandpurple-800); a separação da conversa vem da diferença de luminância contra o fundo.',
        },
        {
          subject: 'Altura de linha própria',
          detail:
            'o texto usa altura de linha proporcional (1,3) em vez de um degrau absoluto, para o enunciado poder quebrar em duas linhas sem estourar a faixa.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Texto', role: 'O enunciado, que pode quebrar linha.', token: '--unc-color-text-primary' },
        { name: 'Contador', role: 'Conteúdo opcional à direita.', token: '--unc-color-accent' },
        { name: 'Fio inferior', role: 'Divisor que separa a faixa da conversa.', token: '--unc-color-border-divider' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes" />
    <UncDocStage label="Tema claro" theme="light" surface="canvas" padding={0} direction="column" align="stretch" width={375}>
      <ChatBanner>Encaminhe 3 mensagens para o Mural da Turma</ChatBanner>
      <ChatBanner trailing="2/3">Mensagens selecionadas para o Mural</ChatBanner>
    </UncDocStage>
    <UncDocStage label="Tema escuro" theme="dark" surface="canvas" padding={0} direction="column" align="stretch" width={375}>
      <ChatBanner>Encaminhe 3 mensagens para o Mural da Turma</ChatBanner>
      <ChatBanner trailing="2/3">Mensagens selecionadas para o Mural</ChatBanner>
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Em contexto" />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <div key={theme} data-unc-theme={theme} style={{ width: 375 }}>
          <ChatHeader name="Turma 5ºB" presence="você e mais 24 participantes" initials="5B" />
          <ChatBanner trailing="0/3">Encaminhe 3 mensagens para o Mural da Turma</ChatBanner>
          <ChatWallpaper src={uncWallpaperFor(theme)}>
            <div style={{ padding: '18px 12px 120px' }}>
              <MessageBubble direction="in" sender="Pedro Henrique" time="08:12">
                O ônibus furou o pneu perto da praça.
              </MessageBubble>
            </div>
          </ChatWallpaper>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={['Uma faixa por conversa.', 'Frase curta: é lida a cada olhada.', 'Contador só quando houver progresso real.']}
      donts={['Empilhar duas faixas.', 'Colocar ação tocável dentro da faixa.', 'Usar para aviso de erro: esse é o Toast.']}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre claro e escuro: a faixa acompanha a barra superior nos dois."
    />
    <UncDocThemeSwitcher surface="canvas" padding={0}>
      {(theme) => (
        <div style={{ width: 375 }}>
          <ChatHeader name="Turma 5ºB" presence="você e mais 24 participantes" initials="5B" />
          <ChatBanner trailing="1/3">Encaminhe 3 mensagens para o Mural da Turma</ChatBanner>
          <ChatWallpaper src={uncWallpaperFor(theme)}>
            <div style={{ height: 96 }} />
          </ChatWallpaper>
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
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
  title: 'Unoochat/Componentes/ChatBanner',
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
