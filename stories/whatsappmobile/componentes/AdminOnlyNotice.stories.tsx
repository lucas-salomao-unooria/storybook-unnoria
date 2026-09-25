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
} from '../../../.storybook/components';
import { AdminOnlyNotice, ChatWallpaper, MessageBubble } from '../../../src/whatsappmobile';
import { waWallpaper } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente AdminOnlyNotice.
 */
const AdminOnlyNoticeDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Extensões"
      title="AdminOnlyNotice"
      description="Barra que ocupa o lugar do compositor em grupo onde só os administradores escrevem. É texto, e não um compositor desabilitado: não há campo nem glifo que pareçam tocáveis. Extensão sem frame de origem."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🔒" title="Grupo só de leitura">
        Diz, na voz do app, por que não dá para responder — em vez de um teclado que não abre.
      </WaDocCard>
      <WaDocCard icon="🗣️" title="Lida como texto">
        O leitor de tela lê a frase. Um compositor inerte ao lado seria três botões mudos.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2024"
      frameName="Chats Main Page · horário das conversas (a âncora do texto)"
      specs={[
        { label: 'Superfície', value: '--wa-color-surface-appbar' },
        { label: 'Texto', value: 'PT Sans 15px · --wa-color-text-secondary' },
        { label: 'Glifo', value: 'lock (literal do registro)' },
        { label: 'Altura mínima', value: '56px' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Componente sem frame',
          detail:
            'o arquivo não publica grupo restrito. A barra ocupa a faixa do compositor na superfície da app bar, com o texto secundário e o glifo lock.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Glifo', role: 'Cadeado decorativo.', token: 'lock' },
        { name: 'Texto', role: 'A frase de restrição.', token: '--wa-color-text-secondary' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Em contexto" description="No pé da conversa, no lugar do compositor." />
    <div style={{ width: 375, marginBottom: 32 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ padding: '18px 12px 60px' }}>
          <MessageBubble direction="in" sender="Professora Helena" time="08:30">
            Os monitores já aguardam no saguão principal.
          </MessageBubble>
        </div>
      </ChatWallpaper>
      <AdminOnlyNotice>Apenas administradores podem enviar mensagens</AdminOnlyNotice>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={['Substituir o MessageComposer, não sobrepor.', 'Frase única, na voz do app.']}
      donts={['Deixar o compositor visível e desabilitado ao lado.', 'Pôr ação tocável na barra.']}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Superfícies suportadas" />
    <WaDocGrid>
      <WaDocCard icon="🌓" title="Tema único">
        Sempre na superfície da app bar, como o compositor que ela substitui.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="AdminOnlyNotice"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Texto da barra. Obrigatório.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Repassados ao elemento raiz.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof AdminOnlyNotice> = {
  title: 'Whatsapp Mobile/Componentes/AdminOnlyNotice',
  component: AdminOnlyNotice,
  parameters: { layout: 'padded' },
  argTypes: { children: { control: 'text', description: 'Texto da barra.' } },
  args: { children: 'Apenas administradores podem enviar mensagens' },
};

export default meta;

type Story = StoryObj<typeof AdminOnlyNotice>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AdminOnlyNoticeDocumentationPage />,
};

/**
 * Playground com 100% das props do AdminOnlyNotice expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do AdminOnlyNotice',
  render: (args) => (
    <div style={{ width: 375 }}>
      <AdminOnlyNotice {...args} />
    </div>
  ),
};
