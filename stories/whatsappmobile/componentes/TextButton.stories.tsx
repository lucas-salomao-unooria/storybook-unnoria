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
import { TextButton } from '../../../src/whatsappmobile';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente TextButton.
 */
const TextButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Controles"
      title="TextButton"
      description="Botão sem preenchimento usado nas ações de diálogo. Reproduz o par CANCEL e OK do frame Mute notif, em PT Sans 15px na cor --wa-color-accent-action (#25AC9D) — um verde-água distinto do usado na barra de abas e nos FABs."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🔤" title="Ação sem superfície">
        O arquivo não desenha nenhum botão com preenchimento. Ações de diálogo são apenas texto
        colorido, alinhado à direita.
      </WaDocCard>
      <WaDocCard icon="🟩" title="Verde de ação próprio">
        <code>#25AC9D</code> é exclusivo destas ações. Reutilizar o verde da aba ativa mudaria a
        hierarquia cromática do arquivo.
      </WaDocCard>
      <WaDocCard icon="🔠" title="Caixa alta do arquivo">
        O rótulo chega pronto em caixa alta (<code>CANCEL</code>, <code>OK</code>); o componente
        não aplica <code>text-transform</code>.
      </WaDocCard>
      <WaDocCard icon="⌨️" title="Botão nativo">
        Renderiza um <code>button</code> real, com anel de foco visível e suporte a{' '}
        <code>disabled</code>.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3516"
      frameName="Mute notif · CANCEL e OK"
      specs={[
        { label: 'Tipografia', value: 'PT Sans 400 · 15px' },
        { label: 'Cor', value: '#25AC9D' },
        { label: 'Alinhamento', value: 'à direita do diálogo' },
        { label: 'Espaço entre ações', value: '16 px' },
        { label: 'Preenchimento', value: 'nenhum' },
        { label: 'Ocorrências', value: '2' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Área de toque',
          detail:
            'o arquivo desenha apenas o texto, sem área de toque declarada. O componente adiciona 8px verticais e 10px horizontais de padding para atingir um alvo utilizável, sem alterar a aparência do rótulo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Área de toque', role: 'Padding invisível que amplia o alvo.', token: '--wa-spacing-xs · --wa-spacing-s' },
        { name: 'Rótulo', role: 'Texto da ação em caixa alta.', token: '--wa-font-body-sm-* · --wa-color-accent-action' },
        { name: 'Anel de foco', role: 'Contorno visível na navegação por teclado.', token: '--wa-color-accent' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de estados" />
    <WaDocStage surface="dialog" padding={28} gap={16}>
      <TextButton>CANCEL</TextButton>
      <TextButton>OK</TextButton>
      <TextButton disabled>OK</TextButton>
      <TextButton>MUTE ALWAYS</TextButton>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Alinhar as ações à direita do rodapé do diálogo.',
        'Colocar a ação de confirmação por último, como em CANCEL · OK.',
        'Passar o rótulo já em caixa alta.',
        'Usar disabled quando a confirmação não estiver disponível.',
      ]}
      donts={[
        'Adicionar preenchimento ou borda ao botão.',
        'Usar o verde da barra de abas em vez de --wa-color-accent-action.',
        'Empilhar mais de duas ações no rodapé.',
        'Aplicar text-transform no CSS.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['dialog', 'sheet', 'canvas']} initial="dialog">
      {() => (
        <>
          <TextButton>CANCEL</TextButton>
          <TextButton>OK</TextButton>
        </>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="TextButton"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo do botão. Obrigatório.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o botão, aplicando opacidade 0,5.' },
        { name: 'onClick', type: '(event) => void', description: 'Callback de ativação.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TextButton> = {
  title: 'Whatsapp Mobile/Componentes/TextButton',
  component: TextButton,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Rótulo do botão.' },
    disabled: { control: 'boolean', description: 'Desabilita o botão.' },
  },
  args: { children: 'OK', disabled: false },
};

export default meta;

type Story = StoryObj<typeof TextButton>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TextButtonDocumentationPage />,
};

/**
 * Playground com 100% das props do TextButton expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TextButton',
  render: (args) => (
    <WaDocStage surface="dialog" padding={32}>
      <TextButton {...args} />
    </WaDocStage>
  ),
};

/**
 * Réplica do par CANCEL · OK do diálogo oficial.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="dialog" padding={24} align="flex-start" gap={16}>
      <TextButton>CANCEL</TextButton>
      <TextButton>OK</TextButton>
    </WaDocStage>
  ),
};

/**
 * Estados padrão e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="dialog" padding={28} gap={16}>
      <TextButton>OK</TextButton>
      <TextButton disabled>OK</TextButton>
    </WaDocStage>
  ),
};
