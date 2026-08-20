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
import { SectionLabel, StatusListItem } from '../../../src/whatsappmobile';
import { waAvatars } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente SectionLabel.
 */
const SectionLabelDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Estrutura"
      title="SectionLabel"
      description="Rótulo que agrupa blocos de conteúdo em listas. Reproduz os textos Recent updates e Viewed updates da aba Status, em PT Sans Bold 15,54px na cor --wa-color-text-appbar, alinhados à calha de 19px."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🏷️" title="Separador semântico">
        Divide uma mesma lista em blocos com significados diferentes, sem introduzir uma superfície
        nova nem um divisor horizontal.
      </WaDocCard>
      <WaDocCard icon="🎨" title="Mesma cor da barra superior">
        Usa <code>--wa-color-text-appbar</code> (#9DA5AC), o tom apagado que o arquivo reserva a
        elementos de estrutura, não de conteúdo.
      </WaDocCard>
      <WaDocCard icon="📐" title="Alinhado à calha das listas">
        Compartilha <code>--wa-gutter</code> (19px) com o <code>ListItem</code>, de modo que o
        rótulo se alinhe ao avatar das linhas abaixo.
      </WaDocCard>
      <WaDocCard icon="♿" title="Fora da árvore semântica">
        É marcado como <code>role=&quot;presentation&quot;</code>: o agrupamento real deve ser
        expresso por listas separadas com <code>aria-label</code>.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:13"
      frameName="Status Main Page · Recent updates"
      specs={[
        { label: 'Tipografia', value: 'PT Sans 700 · 15,54px' },
        { label: 'Cor', value: '#9DA5AC' },
        { label: 'Calha', value: '19 px' },
        { label: 'Ocorrências', value: '2 (nodes 1:13 e 1:32)' },
        { label: 'Espaço acima', value: '16 px' },
        { label: 'Espaço abaixo', value: '8 px' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Espaçamento vertical',
          detail:
            'o arquivo posiciona os dois rótulos em coordenadas absolutas, sem padding declarado. Os 16px acima e 8px abaixo foram derivados da distância medida até as linhas vizinhas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Contêiner', role: 'Bloco de largura total alinhado à calha das listas.', token: '--wa-gutter' },
        { name: 'Rótulo', role: 'Texto do agrupamento em caixa mista.', token: '--wa-font-section-* · --wa-color-text-appbar' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de uso" />
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <div style={{ width: 411 }}>
        <SectionLabel>Recent updates</SectionLabel>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          <StatusListItem name="Jane Doe" timestamp="30 minutes ago" avatarSrc={waAvatars[4]} />
          <StatusListItem name="John Doe" timestamp="30 minutes ago" avatarSrc={waAvatars[6]} />
        </ul>
        <SectionLabel>Viewed updates</SectionLabel>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          <StatusListItem state="viewed" name="Jane Doe" timestamp="30 minutes ago" avatarSrc={waAvatars[2]} />
          <StatusListItem state="viewed" name="John Doe" timestamp="30 minutes ago" avatarSrc={waAvatars[9]} divider={false} />
        </ul>
      </div>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Colocar o rótulo imediatamente antes da lista que ele descreve.',
        'Usar uma <ul> distinta por agrupamento, com aria-label correspondente.',
        'Manter o texto curto: o arquivo usa duas palavras em ambas as ocorrências.',
        'Preservar a cor --wa-color-text-appbar para diferenciar estrutura de conteúdo.',
      ]}
      donts={[
        'Aplicar o rótulo dentro da mesma <ul> das linhas.',
        'Usar caixa alta: o arquivo escreve "Recent updates", não "RECENT UPDATES".',
        'Substituir por um cabeçalho semântico sem revisar a hierarquia da página.',
        'Adicionar divisor ou superfície própria ao rótulo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base', 'appbar']}>
      {() => (
        <div style={{ width: 411 }}>
          <SectionLabel>Recent updates</SectionLabel>
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="SectionLabel"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Texto do rótulo. Obrigatório.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SectionLabel> = {
  title: 'Whatsapp Mobile/Componentes/SectionLabel',
  component: SectionLabel,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Texto do rótulo.' },
  },
  args: { children: 'Recent updates' },
};

export default meta;

type Story = StoryObj<typeof SectionLabel>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SectionLabelDocumentationPage />,
};

/**
 * Playground com 100% das props do SectionLabel expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SectionLabel',
  render: (args) => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <div style={{ width: 411 }}>
        <SectionLabel {...args} />
      </div>
    </WaDocStage>
  ),
};

/**
 * Réplica dos dois agrupamentos da aba Status.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <div style={{ width: 411 }}>
        <SectionLabel>Recent updates</SectionLabel>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          <StatusListItem name="Jane Doe" timestamp="30 minutes ago" avatarSrc={waAvatars[4]} />
        </ul>
        <SectionLabel>Viewed updates</SectionLabel>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          <StatusListItem state="viewed" name="John Doe" timestamp="30 minutes ago" avatarSrc={waAvatars[1]} divider={false} />
        </ul>
      </div>
    </WaDocStage>
  ),
};
