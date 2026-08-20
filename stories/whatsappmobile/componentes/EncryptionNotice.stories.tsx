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
import { EncryptionNotice, ChatWallpaper, DateChip } from '../../../src/whatsappmobile';
import { waWallpaper } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente EncryptionNotice.
 */
const EncryptionNoticeDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Conversa"
      title="EncryptionNotice"
      description="Aviso de criptografia ponta a ponta exibido no topo de toda conversa. Reproduz o cartão de 347px com raio de 5px em --wa-color-surface-notice, o cadeado de 11×14px e o texto centralizado de 14px na cor bege --wa-color-text-notice, exclusiva deste componente em todo o arquivo."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🔒" title="Cor exclusiva">
        <code>#C7BE8A</code> aparece unicamente aqui em todo o arquivo. É um bege quente que
        distingue o aviso de sistema das mensagens dos participantes.
      </WaDocCard>
      <WaDocCard icon="📄" title="Texto fixo do produto">
        O arquivo escreve a mensagem completa em três linhas. O componente usa esse texto como
        padrão e permite substituí-lo por <code>children</code>.
      </WaDocCard>
      <WaDocCard icon="👆" title="Toque para saber mais">
        A última frase convida ao toque. Com <code>onClick</code>, o cartão recebe semântica de
        botão; sem ele, é anunciado como <code>note</code>.
      </WaDocCard>
      <WaDocCard icon="📍" title="Sempre no topo">
        Aparece imediatamente abaixo do <code>DateChip</code>, antes de qualquer mensagem.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3013"
      frameName="Direct Message · aviso de criptografia"
      specs={[
        { label: 'Largura', value: '347 px' },
        { label: 'Altura', value: '58 px' },
        { label: 'Raio', value: '5 px' },
        { label: 'Superfície', value: '#1E2A31' },
        { label: 'Texto', value: 'PT Sans 400 · 14px · #C7BE8A' },
        { label: 'Cadeado', value: '11 × 14 px' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Quebra de linha',
          detail:
            'o arquivo desenha três blocos de texto posicionados manualmente, com quebras fixas. O componente usa um único parágrafo com quebra automática, preservando o mesmo texto e a mesma largura máxima.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Cartão', role: 'Superfície de 347px com raio de 5px.', token: '--wa-color-surface-notice · --wa-radius-m' },
        { name: 'Cadeado', role: 'Glifo de 11×14px alinhado ao topo do texto.', token: 'Icon lock · --wa-color-text-notice' },
        { name: 'Texto', role: 'Mensagem centralizada em bege.', token: '--wa-font-label-sm-* · --wa-color-text-notice' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <WaDocStage surface="canvas" direction="column" align="center" gap={16} padding={24}>
      <EncryptionNotice />
      <EncryptionNotice onClick={() => undefined} />
      <EncryptionNotice>Esta conversa é protegida por criptografia ponta a ponta.</EncryptionNotice>
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Em contexto"
      description="Sobre a textura oficial da conversa, abaixo do separador de data."
    />
    <div style={{ width: 411, marginBottom: 32 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '18px 0 200px' }}>
          <DateChip>TODAY</DateChip>
          <EncryptionNotice />
        </div>
      </ChatWallpaper>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Renderizar uma única vez, no topo do fluxo de mensagens.',
        'Manter o texto padrão salvo por exigência de localização.',
        'Passar onClick quando houver destino para "Tap to learn more".',
        'Centralizar horizontalmente com largura máxima de 347px.',
      ]}
      donts={[
        'Repetir o aviso ao longo da conversa.',
        'Usar a cor bege --wa-color-text-notice em qualquer outro componente.',
        'Aumentar a largura além dos 347px do arquivo.',
        'Remover o cadeado: ele é o marcador visual do aviso.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['base', 'canvas']} initial="base">
      {() => <EncryptionNotice />}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="EncryptionNotice"
      rows={[
        { name: 'children', type: 'React.ReactNode', default: 'texto oficial do arquivo', description: 'Texto do aviso.' },
        { name: 'onClick', type: '(event) => void', description: 'Callback de toque; quando informado, o cartão vira button.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof EncryptionNotice> = {
  title: 'Whatsapp Mobile/Componentes/EncryptionNotice',
  component: EncryptionNotice,
  parameters: { layout: 'padded' },
  argTypes: { children: { control: 'text', description: 'Texto do aviso.' } },
  args: {},
};

export default meta;

type Story = StoryObj<typeof EncryptionNotice>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
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
    <WaDocStage surface="base" padding={32}>
      <EncryptionNotice {...args} />
    </WaDocStage>
  ),
};

/**
 * Réplica do topo do frame "Direct Message".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 411, height: 280 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 18 }}>
          <DateChip>TODAY</DateChip>
          <EncryptionNotice />
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
    <WaDocStage surface="base" direction="column" align="center" gap={16} padding={28}>
      <EncryptionNotice />
      <EncryptionNotice onClick={() => undefined} />
    </WaDocStage>
  ),
};
