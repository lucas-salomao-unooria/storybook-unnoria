import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
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
import { Checkbox } from '../../../src/unoochat';

const BAR = '#716C98';

/**
 * Caixa de seleção controlada.
 */
const ControlledCheckbox: React.FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Mostrar notificações"
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
};

/**
 * Matriz de estados da caixa de seleção.
 */
const StatesMatrix: React.FC = () => (
  <>
    <Checkbox label="Desmarcada" checked={false} readOnly />
    <Checkbox label="Marcada" checked readOnly />
    <Checkbox label="Desabilitada" checked={false} disabled />
    <Checkbox label="Marcada e desabilitada" checked disabled />
    <ControlledCheckbox />
  </>
);

/**
 * Página de documentação rica do componente Checkbox.
 */
const CheckboxDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Controles"
      title="Checkbox"
      description="Caixa de seleção do rodapé do diálogo modal: quadrado de 18px com raio de 3px, preenchimento --unc-color-surface-dialog e contorno de 2px em --unc-color-border-control, com rótulo em Open Sans 14px. Marcada, assume o acento do tema e exibe o glifo tick (check) do Material Symbols Rounded."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="☑️" title="Escolha independente">
        Aparece no rodapé do diálogo de silenciar notificações, como escolha independente das
        opções de duração.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Contorno de 2px">
        O traço em <code>--unc-color-border-control</code> é o mesmo do <code>Radio</code>: os dois
        controles se leem como família, e a forma (quadrado ou círculo) diferencia a escolha
        múltipla da exclusiva.
      </UncDocCard>
      <UncDocCard icon="✔️" title="Tique do registro de ícones">
        O estado marcado usa o glifo <code>tick</code> do registro do módulo, e não um caractere
        tipográfico.
      </UncDocCard>
      <UncDocCard icon="♿" title="Input nativo oculto">
        O controle é um <code>input[type=checkbox]</code> visualmente oculto, preservando teclado e
        leitores de tela.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="Checkbox"
      layout="Controle · 18px"
      specs={[
        { label: 'Dimensões', value: '18 × 18px' },
        { label: 'Raio', value: '3px' },
        { label: 'Preenchimento', value: '--unc-color-surface-dialog' },
        { label: 'Contorno', value: '2px · --unc-color-border-control' },
        { label: 'Marcada', value: 'preenchimento e contorno · --unc-color-accent' },
        { label: 'Rótulo', value: 'Open Sans 400 · 14px · text-primary' },
        { label: 'Recuo do rótulo', value: '16px' },
        { label: 'Desabilitada', value: 'opacidade 50%' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Cores por tema',
          detail:
            'o contorno é #617379 no claro e #A7B5B9 no escuro (--unc-color-border-control); marcada, a caixa usa o acento do tema (#716C98 / #AAA5C2). O rótulo usa --unc-color-text-primary.',
        },
        {
          subject: 'Tique como glifo do registro',
          detail:
            'tick é a ligadura check do Material Symbols Rounded, a mesma usada como confirmação simples de entrega no balão; a leitura no balão usa tickDouble.',
        },
        {
          subject: 'Desabilitado por opacidade',
          detail:
            'o módulo não define cores próprias de desabilitado para este controle: reduz a opacidade a 50% e mostra o cursor not-allowed.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Input', role: 'Controle nativo visualmente oculto.', token: 'unc-checkbox__input' },
        { name: 'Caixa', role: 'Quadrado de 18px com raio de 3px e contorno de 2px.', token: '--unc-color-surface-dialog · --unc-color-border-control' },
        { name: 'Tique', role: 'Glifo exibido no estado marcado, com fundo de acento.', token: 'Icon tick · --unc-color-accent' },
        { name: 'Rótulo', role: 'Texto da escolha, recuado 16px da caixa.', token: '--unc-font-body-sm-* · --unc-color-text-primary' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de estados" />
    {(['light', 'dark'] as const).map((theme) => (
      <UncDocStage
        key={theme}
        label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
        theme={theme}
        surface="dialog"
        direction="column"
        align="flex-start"
        gap={14}
        padding={24}
      >
        <StatesMatrix />
      </UncDocStage>
    ))}

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Usar o Checkbox para escolhas independentes entre si.',
        'Manter o rótulo à direita da caixa.',
        'Controlar checked e onChange no consumidor.',
        'Manter o rótulo clicável envolvendo o input.',
      ]}
      donts={[
        'Usar o Checkbox para seleção exclusiva: nesse caso use o Radio.',
        'Desenhar o tique com um caractere de texto.',
        'Reduzir o contorno abaixo dos 2px do módulo.',
        'Aplicar o preenchimento de acento ao estado desmarcado.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: contorno, acento e rótulo acompanham data-unc-theme."
    />
    <UncDocThemeSwitcher surface="dialog" padding={32}>
      {() => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Checkbox label="Marcada" checked readOnly />
          <Checkbox label="Desmarcada" checked={false} readOnly />
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
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
  title: 'Unoochat/Componentes/Checkbox',
  component: Checkbox,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo exibido.' },
    checked: { control: 'boolean', description: 'Caixa marcada.' },
    disabled: { control: 'boolean', description: 'Desabilita o controle.' },
  },
  args: { label: 'Mostrar notificações', checked: false, disabled: false },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

/**
 * Documentação rica e completa do componente.
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
    <UncDocStage surface="dialog" padding={32}>
      <Checkbox {...args} readOnly />
    </UncDocStage>
  ),
};

/**
 * Caixa “Mostrar notificações” do rodapé do diálogo de silenciar.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UncDocStage surface="dialog" padding={24} align="flex-start">
      <Checkbox label="Mostrar notificações" checked={false} readOnly />
    </UncDocStage>
  ),
};

/**
 * Matriz completa de estados.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="dialog" direction="column" align="flex-start" gap={14} padding={24}>
      <StatesMatrix />
    </UncDocStage>
  ),
};
