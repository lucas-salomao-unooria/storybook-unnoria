import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
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
import { Checkbox } from '../../../src/whatsappmobile';

const BAR = '#0CA996';

/**
 * Caixa de seleção controlada.
 */
const ControlledCheckbox: React.FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Show notifications"
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
};

/**
 * Página de documentação rica do componente Checkbox.
 */
const CheckboxDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Controles"
      title="Checkbox"
      description="Caixa de seleção do rodapé do diálogo modal. Reproduz o quadrado de 18px com raio de 3px, preenchimento --wa-color-surface-dialog e contorno de 2px em --wa-color-border-control, com rótulo em PT Sans 15px na cor --wa-color-text-dialog-check. O estado marcado usa o glifo tick exportado do Figma."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="☑️" title="Escolha independente">
        Aparece uma única vez no arquivo, no rodapé do diálogo de silenciar notificações, como
        escolha independente das opções de duração.
      </WaDocCard>
      <WaDocCard icon="🎨" title="Contorno de 2px">
        O traço em <code>#A5B0B6</code> é mais claro que o do Radio, distinguindo os dois controles
        mesmo à distância.
      </WaDocCard>
      <WaDocCard icon="✔️" title="Tique do arquivo">
        O estado marcado usa o mesmo vetor <code>teenyicons:tick-solid</code> dos tiques de entrega
        dos balões, e não um caractere tipográfico.
      </WaDocCard>
      <WaDocCard icon="♿" title="Input nativo oculto">
        O controle é um <code>input[type=checkbox]</code> visualmente oculto, preservando teclado e
        leitores de tela.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3515"
      frameName="Mute notif · Component 2"
      specs={[
        { label: 'Dimensões', value: '18 × 18 px' },
        { label: 'Raio', value: '3 px' },
        { label: 'Preenchimento', value: '#364147' },
        { label: 'Contorno', value: '2 px · #A5B0B6' },
        { label: 'Rótulo', value: 'PT Sans 400 · 15px · #F9FFFF' },
        { label: 'Recuo do rótulo', value: '16 px' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Estado marcado',
          detail:
            'o arquivo desenha a caixa apenas desmarcada. O estado marcado (preenchimento em --wa-color-accent-control com o glifo tick) é uma extensão da biblioteca, coerente com o Radio selecionado.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Input', role: 'Controle nativo visualmente oculto.', token: 'wa-checkbox__input' },
        { name: 'Caixa', role: 'Quadrado de 18px com raio de 3px e contorno de 2px.', token: '--wa-color-surface-dialog · --wa-color-border-control' },
        { name: 'Tique', role: 'Glifo exibido no estado marcado.', token: 'Icon tick' },
        { name: 'Rótulo', role: 'Texto da escolha, recuado 16px da caixa.', token: '--wa-font-body-sm-* · --wa-color-text-dialog-check' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de estados" />
    <WaDocStage surface="dialog" direction="column" align="flex-start" gap={14} padding={24}>
      <Checkbox label="Desmarcada" checked={false} readOnly />
      <Checkbox label="Marcada" checked readOnly />
      <Checkbox label="Desabilitada" checked={false} disabled />
      <Checkbox label="Marcada e desabilitada" checked disabled />
      <ControlledCheckbox />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Usar o Checkbox para escolhas independentes entre si.',
        'Manter o rótulo à direita da caixa, como no arquivo.',
        'Controlar checked e onChange no consumidor.',
        'Manter o rótulo clicável envolvendo o input.',
      ]}
      donts={[
        'Usar o Checkbox para seleção exclusiva — nesse caso use o Radio.',
        'Desenhar o tique com um caractere de texto.',
        'Reduzir o contorno abaixo dos 2px do arquivo.',
        'Aplicar o preenchimento verde ao estado desmarcado.',
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
          <Checkbox label="Marcada" checked readOnly />
          <Checkbox label="Desmarcada" checked={false} readOnly />
        </>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="Checkbox"
      rows={[
        { name: 'label', type: 'React.ReactNode', description: 'Rótulo exibido ao lado do controle. Obrigatório.' },
        { name: 'checked', type: 'boolean', description: 'Indica se a caixa está marcada.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o controle.' },
        { name: 'onChange', type: '(event) => void', description: 'Callback de alternância.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Checkbox> = {
  title: 'Whatsapp Mobile/Componentes/Checkbox',
  component: Checkbox,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo exibido.' },
    checked: { control: 'boolean', description: 'Caixa marcada.' },
    disabled: { control: 'boolean', description: 'Desabilita o controle.' },
  },
  args: { label: 'Show notifications', checked: false, disabled: false },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CheckboxDocumentationPage />,
};

/**
 * Playground com 100% das props do Checkbox expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Checkbox',
  render: (args) => (
    <WaDocStage surface="dialog" padding={32}>
      <Checkbox {...args} readOnly />
    </WaDocStage>
  ),
};

/**
 * Réplica da caixa "Show notifications" do diálogo oficial.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="dialog" padding={24} align="flex-start">
      <Checkbox label="Show notifications" checked={false} readOnly />
    </WaDocStage>
  ),
};

/**
 * Matriz completa de estados.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="dialog" direction="column" align="flex-start" gap={14} padding={24}>
      <Checkbox label="Desmarcada" checked={false} readOnly />
      <Checkbox label="Marcada" checked readOnly />
      <Checkbox label="Desabilitada" checked={false} disabled />
      <Checkbox label="Marcada e desabilitada" checked disabled />
      <ControlledCheckbox />
    </WaDocStage>
  ),
};
