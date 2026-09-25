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
import { ChatWallpaper, DateChip, SystemMessage } from '../../../src/whatsappmobile';
import { waWallpaper } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente SystemMessage.
 */
const SystemMessageDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Extensões"
      title="SystemMessage"
      description="Aviso de sistema centrado no fluxo da conversa, com a superfície e o texto da etiqueta de data. Difere do DateChip numa coisa só: quebra linha. Extensão sem frame de origem."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="ℹ️" title="Fala do sistema">
        “Você entrou usando o link de convite deste grupo”: ninguém do grupo escreveu, então não é
        balão.
      </WaDocCard>
      <WaDocCard icon="📅" title="Irmão do DateChip">
        Mesma superfície e texto. O DateChip tem 27px de altura fixa; o aviso tem uma frase.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3011"
      frameName="Direct Message · etiqueta TODAY (a âncora)"
      specs={[
        { label: 'Superfície', value: '#202B31 (--wa-color-surface-datechip)' },
        { label: 'Texto', value: 'PT Sans 14px · --wa-color-text-datechip' },
        { label: 'Raio', value: '6px (--wa-radius-l)' },
        { label: 'Largura máxima', value: '85% da conversa' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Componente sem frame',
          detail:
            'o arquivo não publica aviso de sistema. Os valores são os da etiqueta de data, sem a altura fixa, para que a frase quebre linha.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[{ name: 'Cápsula', role: 'Texto centrado que quebra linha.', token: '--wa-color-surface-datechip · --wa-color-text-datechip' }]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz" />
    <WaDocStage surface="canvas" padding={28} gap={16} direction="column" width={375}>
      <DateChip>HOJE</DateChip>
      <SystemMessage>Você entrou usando o link de convite deste grupo</SystemMessage>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Em contexto" />
    <div style={{ width: 375, marginBottom: 32 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 12px 160px' }}>
          <SystemMessage>Você entrou usando o link de convite deste grupo</SystemMessage>
        </div>
      </ChatWallpaper>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={['Centralizar no fluxo.', 'Usar para o que o sistema diz, nunca para fala de pessoa.']}
      donts={['Usar para data: essa é o DateChip.', 'Pôr ação tocável no aviso.']}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="7. Superfícies suportadas" description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais." />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base', 'appbar']} initial="canvas">
      {() => <SystemMessage>Você entrou usando o link de convite deste grupo</SystemMessage>}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="SystemMessage"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Texto do aviso. Obrigatório.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLParagraphElement>', description: 'Repassados ao elemento raiz.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SystemMessage> = {
  title: 'Whatsapp Mobile/Componentes/SystemMessage',
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
    <WaDocStage surface="canvas" padding={40} width={375}>
      <SystemMessage {...args} />
    </WaDocStage>
  ),
};
