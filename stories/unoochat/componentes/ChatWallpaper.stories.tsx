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
  ChatWallpaper,
  DateChip,
  EncryptionNotice,
  MessageBubble,
} from '../../../src/unoochat';
import { uncWallpaperFor, uncWallpaperLight, uncSamplePhoto } from '../fixtures';

const BAR = '#716C98';

/**
 * Conversa de demonstração sobre o papel de parede do tema informado.
 */
const ChatSample: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => (
  <ChatWallpaper src={uncWallpaperFor(theme)}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '18px 12px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DateChip>HOJE</DateChip>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <EncryptionNotice />
      </div>
      <MessageBubble direction="out" time="09:03" delivery="read" maxWidth={250}>
        <MessageBubble.Media src={uncSamplePhoto} alt="Fotografia enviada" />
      </MessageBubble>
    </div>
  </ChatWallpaper>
);

/**
 * Página de documentação rica do componente ChatWallpaper.
 */
const ChatWallpaperDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Conversa"
      title="ChatWallpaper"
      description="Superfície de fundo da tela de conversa. A textura é um ladrilho ilustrado de 320px que se repete, recebido pela prop src (um por tema, gerados a partir da paleta da Unooria e versionados em public/unoochat/). Sem textura, o fundo assume --unc-color-surface-base."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🧩" title="Ladrilho que se repete">
        A textura é um SVG de 320px repetido em mosaico, sem esticar nem cortar: a superfície
        cresce com a conversa sem perder a proporção do desenho.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Fundo sólido como padrão">
        Sem <code>src</code>, o componente aplica <code>--unc-color-surface-base</code> (#EFEEF5 no
        claro, #080922 no escuro), a cor sob a textura.
      </UncDocCard>
      <UncDocCard icon="📐" title="Coluna flexível">
        Ocupa todo o espaço disponível entre o cabeçalho e o compositor, empilhando o conteúdo em
        coluna.
      </UncDocCard>
      <UncDocCard icon="🌓" title="Um ladrilho por tema">
        Cada tema tem o seu ladrilho, com pictogramas de contorno em baixo contraste sobre o fundo (brandpurple 300 no claro, 700 no escuro). No produto, troque{' '}
        <code>src</code> junto com <code>data-unc-theme</code>.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="ChatWallpaper"
      layout="Superfície · coluna flexível"
      specs={[
        { label: 'Tipo do recurso', value: 'Ladrilho SVG ilustrado' },
        { label: 'Ladrilho', value: '320 × 320px' },
        { label: 'Ajuste', value: 'repeat · canto superior esquerdo' },
        { label: 'Cor sob a textura', value: '--unc-color-surface-base' },
        { label: 'Claro', value: 'public/unoochat/chat-wallpaper-light.svg' },
        { label: 'Escuro', value: 'public/unoochat/chat-wallpaper-dark.svg' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Textura como prop',
          detail:
            'a imagem não é embutida no pacote NPM: o consumidor informa a URL. A documentação usa ilustrações SVG geradas a partir da paleta da Unooria, uma para cada tema.',
        },
        {
          subject: 'Sem textura de rabiscos',
          detail:
            'o ladrilho é um padrão próprio do módulo, feito de pictogramas de contorno em baixo contraste para não competir com os balões; nenhuma imagem raster é distribuída.',
        },
        {
          subject: 'Ladrilho em vez de cover',
          detail:
            'a repetição de um ladrilho de 320px evita distorção em telas de alturas diferentes e mantém o arquivo leve.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Superfície', role: 'Fundo sólido sob a textura.', token: '--unc-color-surface-base' },
        { name: 'Textura', role: 'Ladrilho de 320px repetido em mosaico.', token: 'prop src' },
        { name: 'Conteúdo', role: 'Coluna flexível que hospeda mensagens e avisos.', token: 'unc-chatwallpaper__content' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes" />
    {(['light', 'dark'] as const).map((theme) => (
      <UncDocStage
        key={theme}
        label={theme === 'light' ? 'Tema claro · com textura e sem textura' : 'Tema escuro · com textura e sem textura'}
        theme={theme}
        surface="canvas"
        padding={20}
        gap={20}
        align="flex-start"
      >
        <div style={{ width: 200, height: 300 }}>
          <ChatWallpaper src={uncWallpaperFor(theme)} />
        </div>
        <div style={{ width: 200, height: 300 }}>
          <ChatWallpaper />
        </div>
      </UncDocStage>
    ))}

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Em contexto"
      description="Com separador de data, aviso de criptografia e balões reais, nos dois temas."
    />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <div key={theme} data-unc-theme={theme} style={{ width: 411, height: 420, display: 'flex' }}>
          <ChatSample theme={theme} />
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={[
        'Colocar o ChatWallpaper entre o ChatHeader e o MessageComposer.',
        'Informar o ladrilho do tema ativo em src (uncWallpaperFor nas estórias).',
        'Deixar o fundo sólido quando o papel de parede estiver desativado.',
        'Manter o conteúdo dentro do slot children, que já é uma coluna flexível.',
      ]}
      donts={[
        'Redesenhar o padrão à mão dentro do componente.',
        'Usar o mesmo ladrilho nos dois temas: o contorno de um tema não tem o contraste certo sobre o fundo do outro.',
        'Usar --unc-color-surface-canvas como fundo da conversa (é a cor das listagens).',
        'Empilhar dois ChatWallpaper na mesma tela.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre claro e escuro: o fundo sólido muda pelos tokens e o ladrilho é trocado pelo do tema."
    />
    <UncDocThemeSwitcher surface="base" padding={20}>
      {(theme) => (
        <div style={{ width: 260, height: 220, display: 'flex' }}>
          <ChatWallpaper src={uncWallpaperFor(theme)} />
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
      title="ChatWallpaper"
      rows={[
        { name: 'src', type: 'string', description: 'URL do ladrilho de 320px repetido como textura. Sem ela, aplica apenas a cor de base.' },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo empilhado sobre a textura.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ChatWallpaper> = {
  title: 'Unoochat/Componentes/ChatWallpaper',
  component: ChatWallpaper,
  parameters: { layout: 'padded' },
  argTypes: { src: { control: 'text', description: 'URL do ladrilho de 320px usado como textura.' } },
  args: { src: uncWallpaperLight },
};

export default meta;

type Story = StoryObj<typeof ChatWallpaper>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChatWallpaperDocumentationPage />,
};

/**
 * Playground com 100% das props do ChatWallpaper expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChatWallpaper',
  render: (args) => (
    <div style={{ width: 411, height: 420, display: 'flex' }}>
      <ChatWallpaper {...args}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 18 }}>
          <DateChip>HOJE</DateChip>
        </div>
      </ChatWallpaper>
    </div>
  ),
};

/**
 * Fundo de uma conversa, com separador de data e aviso de criptografia.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <div style={{ width: 411, height: 500, display: 'flex' }}>
      <ChatWallpaper src={uncWallpaperLight}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 18 }}>
          <DateChip>HOJE</DateChip>
          <EncryptionNotice />
        </div>
      </ChatWallpaper>
    </div>
  ),
};

/**
 * Comparação entre fundo com textura e fundo sólido, nos dois temas.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <>
      {(['light', 'dark'] as const).map((theme) => (
        <UncDocStage
          key={theme}
          label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={theme}
          surface="canvas"
          padding={20}
          gap={20}
          align="flex-start"
        >
          <div style={{ width: 200, height: 300 }}>
            <ChatWallpaper src={uncWallpaperFor(theme)} />
          </div>
          <div style={{ width: 200, height: 300 }}>
            <ChatWallpaper />
          </div>
        </UncDocStage>
      ))}
    </>
  ),
};
