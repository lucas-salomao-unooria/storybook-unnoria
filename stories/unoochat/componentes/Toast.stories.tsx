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
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import { ChatWallpaper, Toast } from '../../../src/unoochat';
import { uncWallpaperFor } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente Toast.
 */
const ToastDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Extensões"
      title="Toast"
      description="Aviso rápido na base da tela, sem ação, anunciado por uma região viva. Não guarda tempo: quem decide quando some é o produto. Extensão do módulo, sem par na Plataforma Unooria."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="💬" title="Por que não deu">
        “Limite de 3 mensagens atingido”: a recusa fala, em vez de o toque não fazer nada.
      </UncDocCard>
      <UncDocCard icon="🔊" title="Região viva">
        A região fica montada fechada; o texto é anunciado no instante em que aparece.
      </UncDocCard>
      <UncDocCard icon="⏱️" title="Sem relógio próprio">
        Uma criança lê mais devagar que um adulto: o tempo na tela é decisão do produto.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="Toast"
      layout="Cápsula · base da tela"
      specs={[
        { label: 'Superfície', value: '--unc-color-surface-dialog' },
        { label: 'Texto', value: 'Open Sans 400 · 14px · --unc-color-text-primary' },
        { label: 'Raio', value: '20px (--unc-radius-pill)' },
        { label: 'Elevação', value: '--unc-elevation-overlay' },
        { label: 'Posição', value: '48px acima da base do contêiner' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Extensão sem par na Plataforma Unooria',
          detail:
            'a Plataforma não tem aviso rápido de base de tela. A cápsula usa a superfície do diálogo, a mesma dos demais elementos sobrepostos do módulo.',
        },
        {
          subject: 'Elevação de sobreposição',
          detail:
            'a cápsula usa --unc-elevation-overlay, o mesmo token de Menu, Dialog, BottomSheet e Fab: um contorno difuso de tom roxo no claro (--unooria-elevation-brand-secondary) e um halo branco a 10% no escuro (--unooria-elevation-neutral-2). Sem ele, a cápsula clara se perderia sobre a textura da conversa.',
        },
        {
          subject: 'Sem ação e sem tempo',
          detail:
            'o aviso não tem botão nem temporizador: o produto controla quando some, e quem precisa de ação usa o Dialog.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Região', role: 'role="status", sempre montada.', token: '—' },
        { name: 'Cápsula', role: 'O texto do aviso.', token: '--unc-color-surface-dialog · --unc-elevation-overlay' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Em contexto" />
    <div data-unc-theme="light" style={{ position: 'relative', width: 375, height: 260, marginBottom: 32 }}>
      <ChatWallpaper src={uncWallpaperFor('light')}>
        <div style={{ height: 260 }} />
      </ChatWallpaper>
      <Toast>Limite de 3 mensagens atingido. Desmarque uma mensagem para escolher outra.</Toast>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={['Renderizar dentro de um contêiner posicionado.', 'Frase que diga o que fazer.']}
      donts={['Pôr botão no aviso.', 'Fechar em menos tempo do que leva para ler a frase.']}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: superfície, texto, elevação e textura de fundo seguem os tokens."
    />
    <UncDocThemeSwitcher surface="canvas" padding={0}>
      {(theme) => (
        <div style={{ position: 'relative', width: 375, height: 200 }}>
          <ChatWallpaper src={uncWallpaperFor(theme)}>
            <div style={{ height: 200 }} />
          </ChatWallpaper>
          <Toast>Você precisa selecionar exatamente 3 mensagens antes de continuar.</Toast>
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
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
  title: 'Unoochat/Componentes/Toast',
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
    <div style={{ position: 'relative', width: 375, height: 200, background: 'var(--unc-color-surface-canvas)' }}>
      <Toast {...args} />
    </div>
  ),
};
