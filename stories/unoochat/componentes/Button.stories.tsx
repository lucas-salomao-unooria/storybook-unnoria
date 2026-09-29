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
import { Button, TextButton } from '../../../src/unoochat';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente Button.
 */
const ButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Extensões"
      title="Button"
      description="Botão preenchido ou de contorno para a ação que decide a tela. Extensão própria do módulo: a Plataforma Unooria tem o seu Button, mas ele é retangular e de outra família de cor. Este usa o acento do Unoochat (--unc-color-accent), a cápsula do chip de filtro e o texto de 16px em Open Sans Bold."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="✅" title="A ação principal">
        Entrar num grupo, confirmar um envio, votar: a ação única da tela, que o{' '}
        <code>TextButton</code> — feito para ficar ao lado de outra no rodapé de um diálogo — não
        sustenta sozinha.
      </UncDocCard>
      <UncDocCard icon="↔️" title="Contorno para a secundária">
        A variante <code>outline</code> fica ao lado da preenchida quando a tela oferece duas
        saídas, sem disputar o olhar com ela.
      </UncDocCard>
      <UncDocCard icon="👆" title="Alvo de toque">
        Nunca abaixo de 44px de altura; <code>lg</code> sobe a 56px para a ação irreversível.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="Button"
      layout="Cápsula · 44px ou 56px"
      specs={[
        { label: 'Preenchimento (claro · escuro)', value: '#716C98 · #AAA5C2' },
        { label: 'Rótulo (claro · escuro)', value: '#FFFFFF · #080922' },
        { label: 'Fonte', value: 'Open Sans 700 · 16px' },
        { label: 'Raio', value: '20px (--unc-radius-pill)' },
        { label: 'Altura', value: '44px (md) · 56px (lg)' },
        { label: 'Contraste do rótulo', value: '≈ 4,9:1 claro · ≈ 8,2:1 escuro' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Extensão do módulo',
          detail:
            'o Unoochat só tem o TextButton, feito para o rodapé do diálogo. Este botão deriva dele a cor (--unc-color-accent) e do FilterChip a forma (--unc-radius-pill). Nenhum token novo foi criado.',
        },
        {
          subject: 'Medidas próprias',
          detail:
            'a altura de 44px é o alvo mínimo de toque e a de 56px coincide com a faixa mínima do AdminOnlyNotice, para a ação que decide a tela; o recuo lateral é --unc-spacing-xxl (24px). A Plataforma Unooria usa raio de 8 a 12px no Button; o módulo mantém a cápsula do chip de filtro.',
        },
        {
          subject: 'Rótulo por contraste',
          detail:
            'sobre o acento o rótulo usa --unc-color-text-on-accent, que troca com o tema: branco no claro e brandpurple-950 no escuro. Branco puro no tema escuro ficaria abaixo de 3:1.',
        },
        {
          subject: 'Sem sombra',
          detail: 'controles do módulo são planos; a separação vem da cor e do contorno.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Cápsula', role: 'Fundo preenchido ou contorno de 1px, raio de 20px.', token: '--unc-color-accent · --unc-radius-pill' },
        { name: 'Rótulo', role: 'Open Sans 16px em negrito.', token: '--unc-color-text-on-accent · --unc-font-body-md-size' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <UncDocStage surface="canvas" padding={28} gap={16} direction="column" align="flex-start">
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button>Entrar no grupo</Button>
        <Button variant="outline">Revisar seleção</Button>
        <Button disabled>Votar</Button>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button size="lg">Confirmar envio</Button>
        <Button size="lg" variant="outline">
          Voltar
        </Button>
      </div>
      <div style={{ width: 320 }}>
        <Button block size="lg">
          Ir para o Mural da Turma
        </Button>
      </div>
    </UncDocStage>

    <UncDocStage label="Tema escuro" theme="dark" surface="canvas" padding={28} gap={12}>
      <Button>Entrar no grupo</Button>
      <Button variant="outline">Revisar seleção</Button>
      <Button disabled>Votar</Button>
      <Button size="lg">Confirmar envio</Button>
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Um único botão preenchido por tela.',
        'Usar outline para a saída secundária ao lado da principal.',
        'Usar size="lg" para a ação que não se desfaz.',
        'Manter o TextButton no rodapé do Dialog.',
      ]}
      donts={[
        'Pôr dois botões preenchidos lado a lado.',
        'Trocar o acento por outra cor da escala roxa: o token acompanha o tema.',
        'Acrescentar sombra ou gradiente.',
        'Reduzir a altura abaixo de 44px.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: preenchimento, contorno e rótulo acompanham o acento do tema."
    />
    <UncDocThemeSwitcher>
      {() => (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button>Votar</Button>
          <Button variant="outline">Revisar</Button>
          <Button disabled>Indisponível</Button>
          <TextButton>CANCELAR</TextButton>
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="Button"
      rows={[
        { name: 'variant', type: "'filled' | 'outline'", default: "'filled'", description: 'Variante visual.' },
        { name: 'size', type: "'md' | 'lg'", default: "'md'", description: 'Altura: 44px ou 56px.' },
        { name: 'block', type: 'boolean', default: 'false', description: 'Ocupa toda a largura do contêiner.' },
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo. Obrigatório.' },
        { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Tipo nativo do botão.' },
        { name: '...rest', type: 'React.ButtonHTMLAttributes<HTMLButtonElement>', description: 'Demais atributos nativos, como onClick e disabled.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Button> = {
  title: 'Unoochat/Componentes/Button',
  component: Button,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['filled', 'outline'], description: 'Variante visual.' },
    size: { control: 'radio', options: ['md', 'lg'], description: 'Altura do botão.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura.' },
    disabled: { control: 'boolean', description: 'Desabilita o botão.' },
    children: { control: 'text', description: 'Rótulo.' },
    onClick: { action: 'onClick' },
  },
  args: { variant: 'filled', size: 'md', block: false, disabled: false, children: 'Entrar no grupo' },
};

export default meta;

type Story = StoryObj<typeof Button>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ButtonDocumentationPage />,
};

/**
 * Playground com 100% das props do Button expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Button',
  render: (args) => (
    <UncDocStage surface="canvas" padding={40}>
      <Button {...args} />
    </UncDocStage>
  ),
};

/**
 * Matriz de variantes e tamanhos.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UncDocStage surface="canvas" padding={28} gap={12}>
      <Button>Preenchido</Button>
      <Button variant="outline">Contorno</Button>
      <Button size="lg">Grande</Button>
      <Button disabled>Desabilitado</Button>
    </UncDocStage>
  ),
};
