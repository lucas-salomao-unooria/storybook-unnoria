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
import { ChatWallpaper, DateChip, SystemMessage } from '../../../src/unoochat';
import { uncWallpaperFor } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente SystemMessage.
 */
const SystemMessageDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Extensões"
      title="SystemMessage"
      description="Aviso de sistema centrado no fluxo da conversa, com a superfície e o texto da etiqueta de data. Difere do DateChip numa coisa só: quebra linha. Extensão do módulo, sem par na Plataforma Unooria."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="ℹ️" title="Fala do sistema">
        “Você entrou usando o link de convite deste grupo”: ninguém do grupo escreveu, então não é
        balão.
      </UncDocCard>
      <UncDocCard icon="📅" title="Irmão do DateChip">
        Mesma superfície e texto. O DateChip tem 27px de altura fixa; o aviso tem uma frase.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="SystemMessage"
      layout="Cápsula · altura livre"
      specs={[
        { label: 'Superfície', value: '--unc-color-surface-datechip' },
        { label: 'Texto', value: 'Open Sans 400 · 12px · --unc-color-text-secondary' },
        { label: 'Raio', value: '6px (--unc-radius-l)' },
        { label: 'Largura máxima', value: '85% da conversa' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Extensão sem par na Plataforma Unooria',
          detail:
            'a Plataforma não tem aviso de sistema de conversa. Os valores são os da etiqueta de data do próprio módulo, sem a altura fixa, para que a frase quebre linha.',
        },
        {
          subject: 'Contraste nos dois temas',
          detail:
            'o texto secundário sobre a superfície da etiqueta mede acima de 4,5:1 no claro (#475157 sobre #DFDDEB) e no escuro (#CBD4D6 sobre #34375C).',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[{ name: 'Cápsula', role: 'Texto centrado que quebra linha.', token: '--unc-color-surface-datechip · --unc-color-text-secondary' }]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz" />
    <UncDocStage label="Tema claro" theme="light" surface="canvas" padding={28} gap={16} direction="column" width={375}>
      <DateChip>HOJE</DateChip>
      <SystemMessage>Você entrou usando o link de convite deste grupo</SystemMessage>
    </UncDocStage>
    <UncDocStage label="Tema escuro" theme="dark" surface="canvas" padding={28} gap={16} direction="column" width={375}>
      <DateChip>HOJE</DateChip>
      <SystemMessage>Você entrou usando o link de convite deste grupo</SystemMessage>
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Em contexto" />
    <div style={{ width: 375, marginBottom: 32 }} data-unc-theme="light">
      <ChatWallpaper src={uncWallpaperFor('light')}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 12px 160px' }}>
          <SystemMessage>Você entrou usando o link de convite deste grupo</SystemMessage>
        </div>
      </ChatWallpaper>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={['Centralizar no fluxo.', 'Usar para o que o sistema diz, nunca para fala de pessoa.']}
      donts={['Usar para data: essa é o DateChip.', 'Pôr ação tocável no aviso.']}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre o tema claro e o escuro, com a textura de fundo correspondente."
    />
    <UncDocThemeSwitcher surface="canvas" padding={0}>
      {(theme) => (
        <div style={{ width: 375 }}>
          <ChatWallpaper src={uncWallpaperFor(theme)}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 12px 80px' }}>
              <SystemMessage>Você entrou usando o link de convite deste grupo</SystemMessage>
            </div>
          </ChatWallpaper>
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
      title="SystemMessage"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Texto do aviso. Obrigatório.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLParagraphElement>', description: 'Repassados ao elemento raiz.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SystemMessage> = {
  title: 'Unoochat/Componentes/SystemMessage',
  component: SystemMessage,
  parameters: { layout: 'padded' },
  argTypes: { children: { control: 'text', description: 'Texto do aviso.' } },
  args: { children: 'Você entrou usando o link de convite deste grupo' },
};

export default meta;

type Story = StoryObj<typeof SystemMessage>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SystemMessageDocumentationPage />,
};

/**
 * Playground com 100% das props do SystemMessage expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SystemMessage',
  render: (args) => (
    <UncDocStage surface="canvas" padding={40} width={375}>
      <SystemMessage {...args} />
    </UncDocStage>
  ),
};
