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
import { Fab } from '../../../src/unoochat';

const BAR = '#716C98';

const VARIANTS = [
  { variant: 'chat' as const, label: 'chat · 52px · accent', usage: 'Nova conversa' },
  { variant: 'camera' as const, label: 'camera · 54px · accent', usage: 'Novo status' },
  { variant: 'call' as const, label: 'call · 54px · accent', usage: 'Nova chamada' },
  { variant: 'mic' as const, label: 'mic · 43px · accent', usage: 'Gravar áudio' },
  { variant: 'edit' as const, label: 'edit · 41px · elevated', usage: 'Escrever status' },
  { variant: 'endCall' as const, label: 'endCall · 58px · danger', usage: 'Encerrar chamada' },
];

/**
 * Página de documentação rica do componente Fab.
 */
const FabDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Ações"
      title="Fab"
      description="Botão de ação flutuante circular. Cada variante define o diâmetro, a cor de preenchimento e o glifo da biblioteca de ícones da Plataforma Unooria: de 41px a 58px, em roxo de acento, na superfície elevada ou em vermelho de perigo. O glifo ocupa metade do diâmetro (o microfone, 55%) e o círculo recebe a elevação de sobreposição do tema."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="➕" title="Uma ação primária por tela">
        Cada aba tem seu FAB: nova conversa em Conversas, câmera em Status e nova chamada em
        Chamadas. Nunca empilhe dois FABs de mesma hierarquia.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Acento que acompanha o tema">
        As variantes <code>chat</code>, <code>camera</code>, <code>call</code> e <code>mic</code>{' '}
        usam <code>--unc-color-accent</code> (<code>#716C98</code> no claro,{' '}
        <code>#AAA5C2</code> no escuro), com o glifo em <code>--unc-color-icon-on-accent</code>.
      </UncDocCard>
      <UncDocCard icon="✨" title="Elevação de sobreposição">
        O círculo usa <code>--unc-elevation-overlay</code>, o mesmo degrau de menus, diálogos,
        folhas e avisos: um halo roxo no claro e um brilho suave no escuro.
      </UncDocCard>
      <UncDocCard icon="🎙️" title="Glifos da biblioteca Unooria">
        Todos os glifos vêm do registro <code>uncIcons</code> (Material Symbols Rounded, peso 300):
        <code> add_comment</code>, <code>photo_camera</code>, <code>add_call</code>,{' '}
        <code>mic</code>, <code>edit</code> e <code>call_end</code>.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="Fab"
      layout="Círculo · 41 a 58px"
      specs={[
        { label: 'Diâmetros', value: '41 · 43 · 52 · 54 · 58 px' },
        { label: 'Elevação', value: '--unc-elevation-overlay' },
        { label: 'Glifo', value: '50% do diâmetro (mic 55%)' },
        { label: 'Nova conversa', value: '52 px · --unc-color-accent' },
        { label: 'Ação secundária', value: '41 px · --unc-color-surface-elevated' },
        { label: 'Encerrar chamada', value: '58 px · --unc-color-danger-endcall' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Círculos perfeitos',
          detail:
            'os diâmetros são literais do módulo (41, 43, 52, 54 e 58px) e o círculo é sempre exato, sem variações de 1px entre largura e altura.',
        },
        {
          subject: 'Elevação no círculo',
          detail:
            '`--unc-elevation-overlay` é aplicada ao círculo, e não ao glifo: é o mesmo token de menus, diálogos e folhas, definido por tema (halo roxo no claro, brilho branco a 10% no escuro).',
        },
        {
          subject: 'Glifo de microfone',
          detail:
            'a variante `mic` usa o glifo `mic` do registro, a 55% do diâmetro, para compensar o corpo estreito do símbolo; as demais variantes usam 50%.',
        },
        {
          subject: 'Encerrar chamada invariante',
          detail:
            'a variante `endCall` mantém `--unc-color-danger-endcall` (`#E31A1A`, `--unooria-color-danger-600`) nos dois temas: o vermelho de encerrar não muda com a superfície.',
        },
        {
          subject: 'Glifos da biblioteca Unooria',
          detail:
            '`newChat` = `add_comment`, `cameraFilled` = `photo_camera` preenchido, `phoneAdd` = `add_call`, `pencil` = `edit` e `endCall` = `call_end`, todos por ligadura da fonte, sem vetor desenhado à mão.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Círculo', role: 'Superfície circular preenchida pela cor da variante, com a elevação de sobreposição.', token: '--unc-color-accent · --unc-color-surface-elevated · --unc-color-danger-endcall · --unc-elevation-overlay' },
        { name: 'Glifo', role: 'Glifo Material Symbols Rounded centralizado, a 50% do diâmetro (microfone a 55%).', token: '--unc-color-icon-on-accent' },
        { name: 'Rótulo acessível', role: 'Texto obrigatório anunciado por leitores de tela.', token: 'prop label' },
        { name: 'Anel de foco', role: 'Contorno visível na navegação por teclado.', token: '--unc-color-icon-appbar' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes, tamanhos e estados" />
    {(['light', 'dark'] as const).map((theme) => (
      <UncDocStage
        key={theme}
        label={theme === 'light' ? 'Variantes · tema claro' : 'Variantes · tema escuro'}
        theme={theme}
        surface="canvas"
        padding={32}
        gap={36}
      >
        {VARIANTS.map((item) => (
          <div key={item.variant} style={{ textAlign: 'center', width: 150 }}>
            <Fab variant={item.variant} label={item.usage} />
            <div style={{ marginTop: 10, color: 'var(--unc-color-text-secondary)', fontFamily: 'var(--unc-font-sans)', fontSize: 12 }}>
              {item.label}
              <br />
              {item.usage}
            </div>
          </div>
        ))}
      </UncDocStage>
    ))}

    <UncDocStage label="Tamanho livre" surface="canvas" padding={32} gap={28}>
      {[32, 43, 52, 64, 80].map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Fab variant="chat" size={size} label={`Nova conversa ${size}px`} />
          <div style={{ marginTop: 8, color: 'var(--unc-color-text-secondary)', fontFamily: 'var(--unc-font-sans)', fontSize: 12 }}>
            {size}px
          </div>
        </div>
      ))}
    </UncDocStage>

    <UncDocStage label="Estados" surface="canvas" padding={32} gap={28}>
      <Fab variant="chat" label="Padrão" />
      <Fab variant="chat" label="Desabilitado" disabled />
      <Fab variant="endCall" label="Encerrar" />
      <Fab variant="endCall" label="Encerrar desabilitado" disabled />
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Informar sempre label: o botão exibe apenas um glifo.',
        'Usar uma única ação primária por tela.',
        'Combinar edit e camera na aba Status, empilhados: a ação secundária acima da primária.',
        'Reservar endCall exclusivamente para encerrar chamadas.',
      ]}
      donts={[
        'Substituir --unc-elevation-overlay por sombras avulsas no círculo.',
        'Trocar a cor de uma variante pela de outra: o tom comunica o papel da ação.',
        'Usar o FAB para ações secundárias que caberiam na barra superior.',
        'Renderizar o FAB sem rótulo acessível.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: o acento, a superfície elevada e a elevação acompanham; o vermelho de encerrar chamada é invariante."
    />
    <UncDocThemeSwitcher surface="canvas">
      {() => (
        <>
          <Fab variant="chat" label="Nova conversa" />
          <Fab variant="camera" label="Novo status" />
          <Fab variant="mic" label="Gravar áudio" />
          <Fab variant="edit" label="Escrever status" />
          <Fab variant="endCall" label="Encerrar chamada" />
        </>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="Fab"
      rows={[
        { name: 'variant', type: "'chat' | 'camera' | 'call' | 'mic' | 'edit' | 'endCall'", default: "'chat'", description: 'Variante visual, que define diâmetro, cor e glifo.' },
        { name: 'size', type: 'number', description: 'Diâmetro em pixels. Sem ela, usa a medida oficial da variante.' },
        { name: 'label', type: 'string', description: 'Rótulo acessível. Obrigatório.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o botão, aplicando opacidade 0,5.' },
        { name: 'onClick', type: '(event) => void', description: 'Callback de ativação.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Fab> = {
  title: 'Unoochat/Componentes/Fab',
  component: Fab,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['chat', 'camera', 'call', 'mic', 'edit', 'endCall'], description: 'Variante visual.' },
    size: { control: { type: 'range', min: 24, max: 120, step: 1 }, description: 'Diâmetro em pixels.' },
    label: { control: 'text', description: 'Rótulo acessível.' },
    disabled: { control: 'boolean', description: 'Desabilita o botão.' },
  },
  args: { variant: 'chat', size: 52, label: 'Nova conversa', disabled: false },
};

export default meta;

type Story = StoryObj<typeof Fab>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <FabDocumentationPage />,
};

/**
 * Playground com 100% das props do Fab expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Fab',
  render: (args) => (
    <UncDocStage surface="canvas" padding={40}>
      <Fab {...args} />
    </UncDocStage>
  ),
};

/**
 * Par de FABs da aba Status, empilhados: escrever status e novo status.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial: aba Status',
  render: () => (
    <UncDocStage surface="canvas" padding={32} direction="column" gap={14}>
      <Fab variant="edit" label="Escrever status" />
      <Fab variant="camera" label="Novo status" />
    </UncDocStage>
  ),
};

/**
 * Matriz completa das seis variantes.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UncDocStage surface="canvas" padding={32} gap={32}>
      {VARIANTS.map((item) => (
        <Fab key={item.variant} variant={item.variant} label={item.usage} />
      ))}
    </UncDocStage>
  ),
};

/**
 * Comparação de diâmetros.
 */
export const Tamanhos: Story = {
  render: () => (
    <UncDocStage surface="canvas" padding={32} gap={28}>
      {[32, 43, 52, 64, 80].map((size) => (
        <Fab key={size} variant="chat" size={size} label={`Nova conversa ${size}px`} />
      ))}
    </UncDocStage>
  ),
};

/**
 * Estados padrão e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="canvas" padding={32} gap={28}>
      <Fab variant="chat" label="Padrão" />
      <Fab variant="chat" label="Desabilitado" disabled />
      <Fab variant="endCall" label="Encerrar" />
      <Fab variant="endCall" label="Encerrar desabilitado" disabled />
    </UncDocStage>
  ),
};
