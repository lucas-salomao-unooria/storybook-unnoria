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
import { AdminOnlyNotice, ChatWallpaper, MessageBubble } from '../../../src/unoochat';
import { uncWallpaper, uncWallpaperFor } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente AdminOnlyNotice.
 */
const AdminOnlyNoticeDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Extensões"
      title="AdminOnlyNotice"
      description="Barra que ocupa o lugar do compositor em grupo onde só os administradores escrevem. É texto, e não um compositor desabilitado: não há campo nem glifo que pareçam tocáveis. Extensão própria do módulo, sem par direto na Plataforma Unooria."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🔒" title="Grupo só de leitura">
        Diz, na voz do app, por que não dá para responder — em vez de um teclado que não abre.
      </UncDocCard>
      <UncDocCard icon="🗣️" title="Lida como texto">
        O leitor de tela lê a frase. Um compositor inerte ao lado seria três botões mudos.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="AdminOnlyNotice"
      layout="Faixa · 56px mínimo"
      specs={[
        { label: 'Superfície', value: '--unc-color-surface-appbar' },
        { label: 'Texto', value: 'Open Sans 14/20px · --unc-color-text-secondary' },
        { label: 'Glifo', value: 'lock · Material Symbols Rounded, 14px' },
        { label: 'Divisor superior', value: '1px · --unc-color-border-divider' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Componente sem par na Plataforma Unooria',
          detail:
            'a Plataforma não tem grupo restrito. A barra ocupa a faixa do compositor, na superfície da app bar, com o texto secundário e o glifo lock.',
        },
        {
          subject: 'Cor por contraste',
          detail:
            'o texto usa --unc-color-text-secondary (neutral-700 no claro, neutraldark-900 no escuro), que passa de 4,5:1 sobre a superfície da app bar nos dois temas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Glifo', role: 'Cadeado decorativo.', token: 'lock' },
        { name: 'Texto', role: 'A frase de restrição.', token: '--unc-color-text-secondary' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Em contexto" description="No pé da conversa, no lugar do compositor." />
    <div style={{ width: 375, marginBottom: 32 }}>
      <ChatWallpaper src={uncWallpaper}>
        <div style={{ padding: '18px 12px 60px' }}>
          <MessageBubble direction="in" sender="Professora Helena" time="08:30">
            Os monitores já aguardam no saguão principal.
          </MessageBubble>
        </div>
      </ChatWallpaper>
      <AdminOnlyNotice>Apenas administradores podem enviar mensagens</AdminOnlyNotice>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={['Substituir o MessageComposer, não sobrepor.', 'Frase única, na voz do app.']}
      donts={['Deixar o compositor visível e desabilitado ao lado.', 'Pôr ação tocável na barra.']}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: a barra acompanha a superfície da app bar."
    />
    <UncDocThemeSwitcher surface="base">
      {(theme) => (
        <div style={{ width: 375 }}>
          <ChatWallpaper src={uncWallpaperFor(theme)}>
            <div style={{ padding: '18px 12px 60px' }}>
              <MessageBubble direction="in" sender="Professora Helena" time="08:30">
                Os monitores já aguardam no saguão principal.
              </MessageBubble>
            </div>
          </ChatWallpaper>
          <AdminOnlyNotice>Apenas administradores podem enviar mensagens</AdminOnlyNotice>
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="AdminOnlyNotice"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Texto da barra. Obrigatório.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Repassados ao elemento raiz.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof AdminOnlyNotice> = {
  title: 'Unoochat/Componentes/AdminOnlyNotice',
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
