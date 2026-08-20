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
import { Radio } from '../../../src/whatsappmobile';

const BAR = '#0CA996';
const OPTIONS = ['8 hours', '1 week', 'Always'];

/**
 * Grupo de opções controlado, como no diálogo de silenciar notificações.
 */
const RadioGroup: React.FC = () => {
  const [selected, setSelected] = useState('Always');

  return (
    <div role="radiogroup" aria-label="Mute notifications for" style={{ display: 'grid' }}>
      {OPTIONS.map((option) => (
        <Radio
          key={option}
          name="wa-mute"
          label={option}
          value={option}
          checked={selected === option}
          onChange={() => setSelected(option)}
        />
      ))}
    </div>
  );
};

/**
 * Página de documentação rica do componente Radio.
 */
const RadioDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Controles"
      title="Radio"
      description="Botão de opção do diálogo modal. Ambos os estados usam vetores exportados do Figma: radioOn (Group 238, anel e disco em #05AD9C) e radioOff (Ellipse 55, traço de 2px sobre a superfície do diálogo). O rótulo usa PT Sans 17px em --wa-color-text-dialog-option, com passo vertical de 44px."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🔘" title="Seleção exclusiva">
        Aparece uma única vez no arquivo, no diálogo &quot;Mute notifications for…&quot;, com três
        opções mutuamente exclusivas.
      </WaDocCard>
      <WaDocCard icon="🖼️" title="Vetores do Figma">
        Nenhum dos estados é desenhado com CSS: ambos vêm dos vetores exportados, preservando a
        espessura de traço e o diâmetro do disco interno.
      </WaDocCard>
      <WaDocCard icon="📏" title="Passo de 44px">
        A distância vertical entre opções no arquivo é de 44px, refletida na altura mínima do
        rótulo.
      </WaDocCard>
      <WaDocCard icon="♿" title="Input nativo oculto">
        O controle é um <code>input[type=radio]</code> visualmente oculto, preservando teclado,
        agrupamento por <code>name</code> e leitores de tela.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3510"
      frameName="Mute notif · Group 238"
      specs={[
        { label: 'Diâmetro', value: '20 px' },
        { label: 'Selecionado', value: '#05AD9C · disco r=5' },
        { label: 'Não selecionado', value: 'traço 2px · #C4C4C4' },
        { label: 'Recuo do rótulo', value: '21 px' },
        { label: 'Rótulo', value: 'PT Sans 400 · 17px · #FBFEFF' },
        { label: 'Passo vertical', value: '44 px' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Preenchimento do estado não selecionado',
          detail:
            'o vetor Ellipse 55 traz fill #364147 embutido, que é a superfície do diálogo. O glifo declara esse valor como var(--wa-color-surface-dialog), de modo que o controle continue coerente se o diálogo mudar de superfície.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Input', role: 'Controle nativo visualmente oculto.', token: 'wa-radio__input' },
        { name: 'Glifo', role: 'Vetor radioOn ou radioOff exportado do Figma.', token: '--wa-color-accent-control · --wa-color-border-status-ring' },
        { name: 'Rótulo', role: 'Texto da opção, recuado 21px do controle.', token: '--wa-font-body-lg-* · --wa-color-text-dialog-option' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de estados" />
    <WaDocStage surface="dialog" direction="column" align="flex-start" gap={0} padding={24}>
      <Radio name="wa-demo-a" label="Não selecionado" checked={false} readOnly />
      <Radio name="wa-demo-b" label="Selecionado" checked readOnly />
      <Radio name="wa-demo-c" label="Desabilitado" checked={false} disabled />
      <Radio name="wa-demo-d" label="Selecionado e desabilitado" checked disabled />
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Grupo interativo"
      description="Reprodução do agrupamento do diálogo oficial."
    />
    <WaDocStage surface="dialog" align="flex-start" padding={24}>
      <RadioGroup />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Agrupar as opções com o mesmo atributo name e um role="radiogroup" com rótulo.',
        'Manter uma opção selecionada por padrão, como no diálogo do arquivo.',
        'Usar rótulos curtos, de uma ou duas palavras.',
        'Deixar o rótulo clicável envolvendo o input, como o componente já faz.',
      ]}
      donts={[
        'Usar o Radio para seleção múltipla — nesse caso use o Checkbox.',
        'Desenhar os estados com border-radius e background em vez dos vetores do Figma.',
        'Reduzir o passo vertical abaixo dos 44px do arquivo.',
        'Omitir o atributo name: sem ele o teclado não navega o grupo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['dialog', 'sheet', 'canvas']} initial="dialog">
      {() => (
        <div style={{ display: 'grid' }}>
          <Radio name="wa-surface" label="Selecionado" checked readOnly />
          <Radio name="wa-surface-2" label="Não selecionado" checked={false} readOnly />
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="Radio"
      rows={[
        { name: 'label', type: 'React.ReactNode', description: 'Rótulo exibido ao lado do controle. Obrigatório.' },
        { name: 'checked', type: 'boolean', description: 'Indica se a opção está selecionada.' },
        { name: 'name', type: 'string', description: 'Agrupa opções mutuamente exclusivas.' },
        { name: 'value', type: 'string', description: 'Valor submetido pelo controle nativo.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o controle, aplicando opacidade 0,5.' },
        { name: 'onChange', type: '(event) => void', description: 'Callback de seleção.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Radio> = {
  title: 'Whatsapp Mobile/Componentes/Radio',
  component: Radio,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo exibido.' },
    checked: { control: 'boolean', description: 'Opção selecionada.' },
    disabled: { control: 'boolean', description: 'Desabilita o controle.' },
  },
  args: { label: 'Always', checked: true, disabled: false },
};

export default meta;

type Story = StoryObj<typeof Radio>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <RadioDocumentationPage />,
};

/**
 * Playground com 100% das props do Radio expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Radio',
  render: (args) => (
    <WaDocStage surface="dialog" padding={32}>
      <Radio {...args} name="wa-playground" readOnly />
    </WaDocStage>
  ),
};

/**
 * Réplica do agrupamento do diálogo "Mute notifications for…".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="dialog" align="flex-start" padding={24}>
      <RadioGroup />
    </WaDocStage>
  ),
};

/**
 * Matriz completa de estados.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="dialog" direction="column" align="flex-start" gap={0} padding={24}>
      <Radio name="wa-e-1" label="Não selecionado" checked={false} readOnly />
      <Radio name="wa-e-2" label="Selecionado" checked readOnly />
      <Radio name="wa-e-3" label="Desabilitado" checked={false} disabled />
      <Radio name="wa-e-4" label="Selecionado e desabilitado" checked disabled />
    </WaDocStage>
  ),
};
