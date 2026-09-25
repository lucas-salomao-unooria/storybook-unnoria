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
import { ChatWallpaper, Toast } from '../../../src/whatsappmobile';
import { waWallpaper } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente Toast.
 */
const ToastDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Extensões"
      title="Toast"
      description="Aviso rápido na base da tela, sem ação, anunciado por uma região viva. Não guarda tempo: quem decide quando some é o produto. Extensão sem frame de origem."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="💬" title="Por que não deu">
        “Limite de 3 mensagens atingido”: a recusa fala, em vez de o toque não fazer nada.
      </WaDocCard>
      <WaDocCard icon="🔊" title="Região viva">
        A região fica montada fechada; o texto é anunciado no instante em que aparece.
      </WaDocCard>
      <WaDocCard icon="⏱️" title="Sem relógio próprio">
        Uma criança lê mais devagar que um adulto: o tempo na tela é decisão do produto.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3504"
      frameName="Mute notif · superfície do diálogo (a âncora)"
      specs={[
        { label: 'Superfície', value: '#364147 (--wa-color-surface-dialog)' },
        { label: 'Texto', value: 'PT Sans 15px · --wa-color-text-primary' },
        { label: 'Raio', value: '20px (--wa-radius-pill)' },
        { label: 'Posição', value: '48px acima da base do contêiner' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Componente sem frame',
          detail:
            'o arquivo não publica aviso rápido. A cápsula usa a superfície do diálogo, o degrau mais claro da escada, para se destacar de qualquer fundo — sem sombra.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Região', role: 'role="status", sempre montada.', token: '—' },
        { name: 'Cápsula', role: 'O texto do aviso.', token: '--wa-color-surface-dialog' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Em contexto" />
    <div style={{ position: 'relative', width: 375, height: 260, marginBottom: 32 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ height: 260 }} />
      </ChatWallpaper>
      <Toast>Limite de 3 mensagens atingido. Desmarque uma mensagem para escolher outra.</Toast>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={['Renderizar dentro de um contêiner posicionado.', 'Frase que diga o que fazer.']}
      donts={['Pôr botão no aviso.', 'Fechar em menos tempo do que leva para ler a frase.']}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Superfícies suportadas" />
    <WaDocGrid>
      <WaDocCard icon="🌓" title="Tema único">
        Sempre a superfície do diálogo, sobre qualquer fundo.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="Toast"
      rows={[
        { name: 'open', type: 'boolean', default: 'true', description: 'Exibe o aviso; a região continua montada.' },
        { name: 'children', type: 'React.ReactNode', description: 'Texto do aviso.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Repassados à região.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Toast> = {
  title: 'Whatsapp Mobile/Componentes/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Exibe o aviso.' },
    children: { control: 'text', description: 'Texto.' },
  },
  args: { open: true, children: 'Você precisa selecionar exatamente 3 mensagens antes de continuar.' },
};

export default meta;

type Story = StoryObj<typeof Toast>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ToastDocumentationPage />,
};

/**
 * Playground com 100% das props do Toast expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Toast',
  render: (args) => (
    <div style={{ position: 'relative', width: 375, height: 200, background: 'var(--wa-color-surface-canvas)' }}>
      <Toast {...args} />
    </div>
  ),
};
