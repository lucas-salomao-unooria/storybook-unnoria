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
import { EncryptionNotice, ChatWallpaper, DateChip } from '../../../src/unoochat';
import { uncWallpaperFor, uncWallpaperLight } from '../fixtures';

const BAR = '#716C98';

/**
 * Texto padrão do aviso, passado de forma explícita nas estórias.
 */
const AVISO =
  'As mensagens e as chamadas são protegidas com criptografia de ponta a ponta. Ninguém de fora desta conversa, nem mesmo a Unooria, pode lê-las ou ouvi-las. Toque para saber mais.';

/**
 * Página de documentação rica do componente EncryptionNotice.
 */
const EncryptionNoticeDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Conversa"
      title="EncryptionNotice"
      description="Aviso de criptografia ponta a ponta exibido no topo de toda conversa: cartão de até 347px com raio de 5px em --unc-color-surface-notice, cadeado (glifo lock) e texto centralizado de 12px em --unc-color-text-notice, cor exclusiva deste componente."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🔒" title="Cor exclusiva">
        <code>--unc-color-text-notice</code> (#34375C no claro, #DFDDEB no escuro) só aparece aqui.
        Distingue o aviso de sistema das mensagens dos participantes.
      </UncDocCard>
      <UncDocCard icon="📄" title="Texto padrão do produto">
        O componente traz a mensagem completa de criptografia em pt-BR como padrão e permite
        substituí-la por <code>children</code>.
      </UncDocCard>
      <UncDocCard icon="👆" title="Toque para saber mais">
        A última frase convida ao toque. Com <code>onClick</code>, o cartão vira um{' '}
        <code>&lt;button&gt;</code> real (Enter e Espaço funcionam); sem ele, é anunciado como{' '}
        <code>note</code>.
      </UncDocCard>
      <UncDocCard icon="📍" title="Sempre no topo">
        Aparece imediatamente abaixo do <code>DateChip</code>, antes de qualquer mensagem.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="EncryptionNotice"
      layout="Cartão · largura máxima de 347px"
      specs={[
        { label: 'Largura máxima', value: '347px' },
        { label: 'Raio', value: '5px (--unc-radius-m)' },
        { label: 'Superfície', value: '--unc-color-surface-notice' },
        { label: 'Texto', value: 'Open Sans 400 · 12px · text-notice' },
        { label: 'Cadeado', value: 'glifo lock · 14px' },
        { label: 'Recuo interno', value: '10px × 12px' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Cores por tema',
          detail:
            'no claro, brandpurple 800 (#34375C) sobre brandpurple 100 (#EFEEF5); no escuro, brandpurple 200 (#DFDDEB) sobre brandpurple 800 (#34375C). Os dois pares passam de 7:1 de contraste.',
        },
        {
          subject: 'Cadeado do registro de ícones',
          detail:
            'o glifo lock é a ligadura lock do Material Symbols Rounded, na mesma cor do texto do aviso.',
        },
        {
          subject: 'Quebra automática',
          detail:
            'o texto é um único parágrafo com quebra automática, sem quebras de linha fixas, para acompanhar a largura disponível e a tradução.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Cartão', role: 'Superfície de até 347px com raio de 5px.', token: '--unc-color-surface-notice · --unc-radius-m' },
        { name: 'Cadeado', role: 'Glifo lock alinhado ao topo do texto.', token: 'Icon lock · --unc-color-text-notice' },
        { name: 'Texto', role: 'Mensagem centralizada.', token: '--unc-font-label-sm-* · --unc-color-text-notice' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    {(['light', 'dark'] as const).map((theme) => (
      <UncDocStage
        key={theme}
        label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
        theme={theme}
        surface="canvas"
        direction="column"
        align="center"
        gap={16}
        padding={24}
      >
        <EncryptionNotice>{AVISO}</EncryptionNotice>
        <EncryptionNotice onClick={() => undefined}>{AVISO}</EncryptionNotice>
        <EncryptionNotice>Esta conversa é protegida por criptografia ponta a ponta.</EncryptionNotice>
      </UncDocStage>
    ))}

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Em contexto"
      description="Abaixo do separador de data, sobre o fundo da conversa, nos dois temas."
    />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <div key={theme} data-unc-theme={theme} style={{ width: 411, display: 'flex' }}>
          <ChatWallpaper src={uncWallpaperFor(theme)}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '18px 0 200px' }}>
              <DateChip>HOJE</DateChip>
              <EncryptionNotice>{AVISO}</EncryptionNotice>
            </div>
          </ChatWallpaper>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={[
        'Renderizar uma única vez, no topo do fluxo de mensagens.',
        'Manter o texto padrão, salvo por exigência de localização.',
        'Passar onClick quando houver destino para “Toque para saber mais”.',
        'Centralizar horizontalmente, respeitando a largura máxima de 347px.',
      ]}
      donts={[
        'Repetir o aviso ao longo da conversa.',
        'Usar --unc-color-text-notice em qualquer outro componente.',
        'Aumentar a largura além dos 347px do módulo.',
        'Remover o cadeado: ele é o marcador visual do aviso.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre claro e escuro: superfície e texto do aviso acompanham data-unc-theme."
    />
    <UncDocThemeSwitcher surface="base" padding={32}>
      {() => <EncryptionNotice>{AVISO}</EncryptionNotice>}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
      title="EncryptionNotice"
      rows={[
        { name: 'children', type: 'React.ReactNode', default: 'texto de criptografia em pt-BR', description: 'Texto do aviso.' },
        { name: 'onClick', type: '(event) => void', description: 'Callback de toque; quando informado, o cartão vira button.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof EncryptionNotice> = {
  title: 'Unoochat/Componentes/EncryptionNotice',
  component: EncryptionNotice,
  parameters: { layout: 'padded' },
  argTypes: { children: { control: 'text', description: 'Texto do aviso.' } },
  args: { children: AVISO },
};

export default meta;

type Story = StoryObj<typeof EncryptionNotice>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <EncryptionNoticeDocumentationPage />,
};

/**
 * Playground com 100% das props do EncryptionNotice expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do EncryptionNotice',
  render: (args) => (
    <UncDocStage surface="base" padding={32}>
      <EncryptionNotice {...args} />
    </UncDocStage>
  ),
};

/**
 * Topo de uma conversa: separador de data e aviso de criptografia.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <div style={{ width: 411, height: 280, display: 'flex' }}>
      <ChatWallpaper src={uncWallpaperLight}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 18 }}>
          <DateChip>HOJE</DateChip>
          <EncryptionNotice>{AVISO}</EncryptionNotice>
        </div>
      </ChatWallpaper>
    </div>
  ),
};

/**
 * Estados de leitura e de toque.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="base" direction="column" align="center" gap={16} padding={28}>
      <EncryptionNotice>{AVISO}</EncryptionNotice>
      <EncryptionNotice onClick={() => undefined}>{AVISO}</EncryptionNotice>
    </UncDocStage>
  ),
};
