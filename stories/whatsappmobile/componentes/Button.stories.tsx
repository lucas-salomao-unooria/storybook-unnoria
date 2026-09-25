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
import { Button, TextButton } from '../../../src/whatsappmobile';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente Button.
 */
const ButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Extensões"
      title="Button"
      description="Botão preenchido ou de contorno para a ação que decide a tela. Extensão: o arquivo publica só a ação de texto do diálogo, e este botão deriva dela a cor (--wa-color-accent-action) e, da cápsula do chip de filtro, a forma."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="✅" title="A ação principal">
        Entrar num grupo, confirmar um envio, votar: a ação única da tela, que o{' '}
        <code>TextButton</code> — feito para ficar ao lado de outra no rodapé de um diálogo — não
        sustenta sozinha.
      </WaDocCard>
      <WaDocCard icon="↔️" title="Contorno para a secundária">
        A variante <code>outline</code> fica ao lado da preenchida quando a tela oferece duas
        saídas, sem disputar o olhar com ela.
      </WaDocCard>
      <WaDocCard icon="👆" title="Alvo de toque">
        Nunca abaixo de 44px de altura; <code>lg</code> sobe a 56px para a ação irreversível.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3516"
      frameName="Mute notif · ação CANCEL / OK (a âncora da cor)"
      specs={[
        { label: 'Preenchimento', value: '#25AC9D (--wa-color-accent-action)' },
        { label: 'Rótulo', value: '#232D36 (--wa-color-text-on-accent) · 16px bold' },
        { label: 'Raio', value: '20px (--wa-radius-pill)' },
        { label: 'Altura', value: '44px (md) · 56px (lg)' },
        { label: 'Contraste do rótulo', value: '≈ 4,9:1' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Componente sem frame',
          detail:
            'nenhum dos 73 quadros publica botão preenchido. A cor é a da ação de texto do diálogo; o rótulo sobre ela reaproveita o tom do numeral do selo verde-água; o raio é o do chip de filtro. Nenhum valor novo foi criado.',
        },
        {
          subject: 'Sem sombra',
          detail: 'o arquivo é plano e proíbe box-shadow em controles; o botão também é.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Cápsula', role: 'Fundo preenchido ou contorno de 1px, raio de 20px.', token: '--wa-color-accent-action · --wa-radius-pill' },
        { name: 'Rótulo', role: 'PT Sans 16px em negrito.', token: '--wa-color-text-on-accent · --wa-font-body-md-size' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <WaDocStage surface="canvas" padding={28} gap={16} direction="column" align="flex-start">
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
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Um único botão preenchido por tela.',
        'Usar outline para a saída secundária ao lado da principal.',
        'Usar size="lg" para a ação que não se desfaz.',
        'Manter o TextButton no rodapé do Dialog, como no arquivo.',
      ]}
      donts={[
        'Pôr dois botões preenchidos lado a lado.',
        'Trocar a cor por outro verde-água da família: cada um tem seu papel.',
        'Acrescentar sombra ou gradiente.',
        'Reduzir a altura abaixo de 44px.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base', 'appbar', 'sheet', 'dialog']} initial="canvas">
      {() => (
        <div style={{ display: 'flex', gap: 12 }}>
          <Button>Votar</Button>
          <Button variant="outline">Revisar</Button>
          <TextButton>CANCELAR</TextButton>
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
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
  title: 'Whatsapp Mobile/Componentes/Button',
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
    <WaDocStage surface="canvas" padding={40}>
      <Button {...args} />
    </WaDocStage>
  ),
};

/**
 * Matriz de variantes e tamanhos.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="canvas" padding={28} gap={12}>
      <Button>Preenchido</Button>
      <Button variant="outline">Contorno</Button>
      <Button size="lg">Grande</Button>
      <Button disabled>Desabilitado</Button>
    </WaDocStage>
  ),
};
