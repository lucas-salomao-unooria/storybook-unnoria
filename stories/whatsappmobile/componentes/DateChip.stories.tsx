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
import { DateChip, ChatWallpaper } from '../../../src/whatsappmobile';
import { waWallpaper } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente DateChip.
 */
const DateChipDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Conversa"
      title="DateChip"
      description="Separador de data do fluxo de mensagens. Reproduz a etiqueta de 59×27px com raio de 6px em --wa-color-surface-datechip e texto de 14px em --wa-color-text-datechip, centralizada sobre a textura da conversa."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="📅" title="Marcador temporal">
        Separa blocos de mensagens por dia. No arquivo aparece uma única vez, com o rótulo{' '}
        <code>TODAY</code>.
      </WaDocCard>
      <WaDocCard icon="🎨" title="Superfície própria">
        <code>--wa-color-surface-datechip</code> (#202B31) é mais escuro que a app bar, para se
        destacar da textura sem competir com os balões.
      </WaDocCard>
      <WaDocCard icon="📏" title="Largura mínima">
        A etiqueta tem 59px de largura mínima e cresce com o rótulo, mantendo os 27px de altura e o
        raio de 6px.
      </WaDocCard>
      <WaDocCard icon="🔤" title="Caixa alta por convenção">
        O arquivo escreve <code>TODAY</code> em caixa alta. O componente não transforma o texto:
        o rótulo é passado já formatado.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3011"
      frameName="Direct Message · etiqueta TODAY"
      specs={[
        { label: 'Dimensões', value: '59 × 27 px' },
        { label: 'Raio', value: '6 px' },
        { label: 'Superfície', value: '#202B31' },
        { label: 'Texto', value: 'PT Sans 400 · 14px · #9CA7AD' },
        { label: 'Posição', value: 'centralizada, 86px do topo' },
        { label: 'Ocorrências', value: '1' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Espaçamento interno',
          detail:
            'o arquivo posiciona o texto em coordenada absoluta dentro do retângulo. Os 10px laterais foram derivados da distância medida, permitindo que rótulos mais longos que "TODAY" caibam.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Cápsula', role: 'Retângulo de 27px de altura com raio de 6px.', token: '--wa-color-surface-datechip · --wa-radius-l' },
        { name: 'Rótulo', role: 'Data em PT Sans 14px.', token: '--wa-font-label-sm-* · --wa-color-text-datechip' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de rótulos" />
    <WaDocStage surface="canvas" padding={28} gap={16}>
      <DateChip>TODAY</DateChip>
      <DateChip>YESTERDAY</DateChip>
      <DateChip>16/02/2021</DateChip>
      <DateChip>SEGUNDA-FEIRA</DateChip>
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Em contexto"
      description="Sobre a textura oficial da conversa."
    />
    <div style={{ width: 411, marginBottom: 32 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '18px 0 200px' }}>
          <DateChip>TODAY</DateChip>
        </div>
      </ChatWallpaper>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Centralizar horizontalmente no fluxo de mensagens.',
        'Passar o rótulo já formatado, em caixa alta como no arquivo.',
        'Inserir apenas quando a data muda entre mensagens consecutivas.',
        'Manter a etiqueta acima do primeiro balão do dia.',
      ]}
      donts={[
        'Alinhar à esquerda ou à direita.',
        'Usar a superfície de app bar em vez de --wa-color-surface-datechip.',
        'Aplicar text-transform no CSS: o rótulo chega pronto.',
        'Repetir a etiqueta entre mensagens do mesmo dia.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['base', 'canvas', 'appbar']} initial="base">
      {() => <DateChip>TODAY</DateChip>}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="DateChip"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo exibido. Obrigatório.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof DateChip> = {
  title: 'Whatsapp Mobile/Componentes/DateChip',
  component: DateChip,
  parameters: { layout: 'padded' },
  argTypes: { children: { control: 'text', description: 'Rótulo exibido.' } },
  args: { children: 'TODAY' },
};

export default meta;

type Story = StoryObj<typeof DateChip>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <DateChipDocumentationPage />,
};

/**
 * Playground com 100% das props do DateChip expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do DateChip',
  render: (args) => (
    <WaDocStage surface="canvas" padding={40}>
      <DateChip {...args} />
    </WaDocStage>
  ),
};

/**
 * Réplica da etiqueta TODAY sobre a textura oficial da conversa.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 411, height: 260 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 18 }}>
          <DateChip>TODAY</DateChip>
        </div>
      </ChatWallpaper>
    </div>
  ),
};

/**
 * Matriz de rótulos de comprimentos diferentes.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="canvas" padding={28} gap={16}>
      <DateChip>TODAY</DateChip>
      <DateChip>YESTERDAY</DateChip>
      <DateChip>16/02/2021</DateChip>
    </WaDocStage>
  ),
};
