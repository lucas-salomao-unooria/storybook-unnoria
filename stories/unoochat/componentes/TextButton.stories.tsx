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
import { TextButton } from '../../../src/unoochat';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente TextButton.
 */
const TextButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Controles"
      title="TextButton"
      description="Botão sem preenchimento usado nas ações de diálogo, como o par CANCELAR e OK. Rótulo em Open Sans 14px na cor de acento do tema (--unc-color-accent), com anel de foco visível e alvo de toque ampliado."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🔤" title="Ação sem superfície">
        As ações de diálogo são apenas texto colorido, alinhado à direita, sem preenchimento nem
        contorno.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Acento do tema">
        A cor é <code>--unc-color-accent</code>: <code>#716C98</code> no claro e{' '}
        <code>#AAA5C2</code> no escuro, o mesmo acento da aba ativa e dos botões flutuantes.
      </UncDocCard>
      <UncDocCard icon="🔠" title="Caixa alta no rótulo">
        O rótulo chega pronto em caixa alta (<code>CANCELAR</code>, <code>OK</code>); o componente
        não aplica <code>text-transform</code>.
      </UncDocCard>
      <UncDocCard icon="⌨️" title="Botão nativo">
        Renderiza um <code>button</code> real, com anel de foco visível e suporte a{' '}
        <code>disabled</code>.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="TextButton"
      layout="Texto · alvo de 36px"
      specs={[
        { label: 'Tipografia', value: 'Open Sans 400 · 14px' },
        { label: 'Cor', value: '--unc-color-accent' },
        { label: 'Alinhamento', value: 'à direita do diálogo' },
        { label: 'Espaço entre ações', value: '16 px' },
        { label: 'Preenchimento', value: 'nenhum' },
        { label: 'Desabilitado', value: 'opacidade 0,5' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Área de toque',
          detail:
            'o rótulo recebe 8px verticais e 10px horizontais de padding (--unc-spacing-xs e --unc-spacing-s) para formar um alvo utilizável, sem alterar a aparência do texto.',
        },
        {
          subject: 'Acento único',
          detail:
            'as ações usam o mesmo --unc-color-accent da aba ativa (de --unooria-color-brandpurple-600 no claro e -400 no escuro), sem um segundo tom próprio.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Área de toque', role: 'Padding invisível que amplia o alvo.', token: '--unc-spacing-xs · --unc-spacing-s' },
        { name: 'Rótulo', role: 'Texto da ação em caixa alta.', token: '--unc-font-body-sm-* · --unc-color-accent' },
        { name: 'Anel de foco', role: 'Contorno visível na navegação por teclado.', token: '--unc-color-accent' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de estados" />
    <UncDocStage label="Tema claro" theme="light" surface="dialog" padding={28} gap={16}>
      <TextButton>CANCELAR</TextButton>
      <TextButton>OK</TextButton>
      <TextButton disabled>OK</TextButton>
      <TextButton>SILENCIAR SEMPRE</TextButton>
    </UncDocStage>
    <UncDocStage label="Tema escuro" theme="dark" surface="dialog" padding={28} gap={16}>
      <TextButton>CANCELAR</TextButton>
      <TextButton>OK</TextButton>
      <TextButton disabled>OK</TextButton>
      <TextButton>SILENCIAR SEMPRE</TextButton>
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Alinhar as ações à direita do rodapé do diálogo.',
        'Colocar a ação de confirmação por último, como em CANCELAR · OK.',
        'Passar o rótulo já em caixa alta.',
        'Usar disabled quando a confirmação não estiver disponível.',
      ]}
      donts={[
        'Adicionar preenchimento ou borda ao botão.',
        'Trocar --unc-color-accent por outra cor da paleta.',
        'Empilhar mais de duas ações no rodapé.',
        'Aplicar text-transform no CSS.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: o rótulo e o anel de foco seguem o acento do tema."
    />
    <UncDocThemeSwitcher surface="dialog">
      {() => (
        <>
          <TextButton>CANCELAR</TextButton>
          <TextButton>OK</TextButton>
        </>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
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
  title: 'Unoochat/Componentes/TextButton',
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
 * Documentação rica e completa do componente.
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
    <UncDocStage surface="dialog" padding={32}>
      <TextButton {...args} />
    </UncDocStage>
  ),
};

/**
 * Par CANCELAR · OK no rodapé de um diálogo.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo no Rodapé do Diálogo',
  render: () => (
    <UncDocStage surface="dialog" padding={24} align="flex-start" gap={16}>
      <TextButton>CANCELAR</TextButton>
      <TextButton>OK</TextButton>
    </UncDocStage>
  ),
};

/**
 * Estados padrão e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="dialog" padding={28} gap={16}>
      <TextButton>OK</TextButton>
      <TextButton disabled>OK</TextButton>
    </UncDocStage>
  ),
};
