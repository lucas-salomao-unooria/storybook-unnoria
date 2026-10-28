import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
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
import { Switch } from '../../../src/unoochat';

const BAR = '#716C98';

/* Conteúdo de demonstração — as escolhas do gráfico da missão "O Porta-Voz dos
   Dados". O texto de verdade mora na experiência. */
const ESCALA = 'Anotação de escala';
const ESCALA_DESCRICAO = 'Eixo vertical iniciando em 0%';
const FONTE = 'Fonte dos dados';
const FONTE_DESCRICAO = 'Pesquisa com 1.200 estudantes, setembro de 2026';

/**
 * Interruptor controlado, com o estado escrito ao lado.
 */
const ControlledSwitch: React.FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label={ESCALA}
      description={ESCALA_DESCRICAO}
      labelPosition="left"
      checked={checked}
      onChange={setChecked}
      style={{ width: '100%' }}
    />
  );
};

/**
 * Matriz de estados do interruptor.
 */
const StatesMatrix: React.FC = () => (
  <>
    <Switch label="Desligado" defaultChecked={false} />
    <Switch label="Ligado" defaultChecked />
    <Switch label="Com descrição" description={ESCALA_DESCRICAO} defaultChecked />
    <Switch label="Desabilitado" disabled />
    <Switch label="Ligado e desabilitado" defaultChecked disabled />
    <Switch aria-label="Só o controle, nomeado por aria-label" />
  </>
);

/**
 * As escolhas do gráfico, como linhas de configuração.
 */
const LinhasDoGrafico: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
    <ControlledSwitch />
    <Switch
      label={FONTE}
      description={FONTE_DESCRICAO}
      labelPosition="left"
      defaultChecked
      style={{ width: '100%' }}
    />
  </div>
);

/**
 * Página de documentação rica do componente Switch.
 */
const SwitchDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Controles"
      title="Switch"
      description="Extensão: interruptor de dois estados com rótulo e uma linha de descrição. Trilho de 40 × 24px numa caixa de toque de 44px; desligado, o contorno de 2px em --unc-color-border-control (o traço do Checkbox e do Radio); ligado, o acento do tema. É um button role=switch visível, com aria-checked, e acompanha data-unc-theme."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🎚️" title="Ligar e desligar na hora">
        Para uma escolha que vale assim que é tocada — mostrar a anotação de escala de um gráfico,
        ativar uma opção da conversa. Se a escolha só vale ao confirmar, use o <code>Checkbox</code>.
      </UncDocCard>
      <UncDocCard icon="📝" title="Rótulo e descrição">
        O rótulo diz o que se liga; a descrição, o efeito (“Eixo vertical iniciando em 0%”). Tocar em
        qualquer um dos dois alterna.
      </UncDocCard>
      <UncDocCard icon="👆" title="Alvo de 44px">
        O botão tem caixa própria de 44 × 44px em volta do trilho, e a linha inteira tem 44px de
        altura mínima.
      </UncDocCard>
      <UncDocCard icon="♿" title="Botão visível, não input escondido">
        <code>&lt;button role=&quot;switch&quot; aria-checked&gt;</code>: Enter e Espaço pelo botão
        nativo, e um teste de navegador o encontra visível.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="Switch"
      layout="Controle · 44px"
      specs={[
        { label: 'Caixa de toque', value: '44 × 44px (o <button>)' },
        { label: 'Trilho', value: '40 × 24px · raio total · contorno 2px' },
        { label: 'Botão', value: '18px · desloca 16px ao ligar' },
        { label: 'Desligado', value: 'contorno e botão · --unc-color-border-control' },
        { label: 'Ligado', value: 'trilho · --unc-color-accent · botão · --unc-color-icon-on-accent' },
        { label: 'Rótulo', value: 'Open Sans 600 · 16px / 24px · text-primary' },
        { label: 'Descrição', value: 'Open Sans 400 · 14px / 20px · text-secondary' },
        { label: 'Foco', value: 'anel de 2px no trilho · --unc-color-accent' },
        { label: 'Desabilitado', value: 'opacidade 50%' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Extensão nova (2026-10-28)',
          detail:
            'o conjunto herdado não tinha interruptor. Entrou para a missão "O Porta-Voz dos Dados", que mostra título e texto fixo em cada escolha do gráfico. Não há par em whatsappmobile.',
        },
        {
          subject: 'API do Toggle da Plataforma Unooria',
          detail:
            'checked, defaultChecked, onChange(checked, event), label, description, labelPosition, disabled, name e value têm o mesmo nome e o mesmo papel. Diferenças: não há size (um tamanho só, o de toque), não há theme (o tema vem de data-unc-theme, como em todo o módulo) e o evento do onChange é o clique do botão, não o change de um input.',
        },
        {
          subject: 'Botão visível, não input de largura zero',
          detail:
            'o Toggle esconde o input com largura zero e pointer-events: none, e um teste que espera o controle visível falha. Aqui o controle é o próprio <button role="switch">, com caixa real; o rótulo é um <label for> que também o aciona, e nomeia por aria-labelledby; a descrição entra por aria-describedby.',
        },
        {
          subject: 'Formulário',
          detail:
            'com name, um input hidden leva value ("on" por padrão) só quando ligado — a regra de um checkbox.',
        },
        {
          subject: 'Movimento reduzido',
          detail: 'com prefers-reduced-motion, o botão troca de lado sem transição.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Controle', role: 'Botão role="switch" com aria-checked, caixa de 44px.', token: 'unc-switch__control' },
        { name: 'Trilho', role: 'Cápsula de 40 × 24px com contorno de 2px.', token: '--unc-color-border-control · --unc-color-accent' },
        { name: 'Botão', role: 'Círculo de 18px que desliza 16px ao ligar.', token: '--unc-color-border-control · --unc-color-icon-on-accent' },
        { name: 'Rótulo', role: 'Nome acessível (aria-labelledby).', token: '--unc-font-body-md-* · --unc-color-text-primary' },
        { name: 'Descrição', role: 'Linha secundária (aria-describedby).', token: '--unc-font-body-sm-* · --unc-color-text-secondary' },
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
        gap={8}
        padding={24}
      >
        <StatesMatrix />
      </UncDocStage>
    ))}

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Usar o Switch para o que vale assim que é tocado.',
        'Escrever o rótulo como o que se liga, e a descrição como o efeito.',
        'Usar labelPosition="left" nas linhas de configuração, com o interruptor encostado à direita.',
        'Informar aria-label quando não houver rótulo visível.',
      ]}
      donts={[
        'Usar o Switch numa escolha que só vale ao confirmar: use o Checkbox.',
        'Dizer o estado só pela cor: o botão também muda de lado.',
        'Esconder o botão com largura zero para trocar o desenho.',
        'Encolher a caixa de toque abaixo de 44px.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: contorno, acento e texto acompanham data-unc-theme."
    />
    <UncDocThemeSwitcher surface="dialog" padding={32}>
      {() => (
        <div style={{ width: 343 }}>
          <LinhasDoGrafico />
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="Switch"
      rows={[
        { name: 'checked', type: 'boolean', description: 'Estado ligado/desligado (modo controlado).' },
        { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Estado inicial (modo não controlado).' },
        { name: 'onChange', type: '(checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void', description: 'Novo estado a cada acionamento (clique, toque, Enter, Espaço).' },
        { name: 'label', type: 'React.ReactNode', description: 'Rótulo visível; nome acessível do interruptor.' },
        { name: 'description', type: 'React.ReactNode', description: 'Linha secundária; ligada por aria-describedby.' },
        { name: 'labelPosition', type: "'left' | 'right'", default: "'right'", description: 'Lado do texto em relação ao interruptor.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita a interação.' },
        { name: 'name', type: 'string', description: 'Nome do campo; com ele, um input hidden leva value quando ligado.' },
        { name: 'value', type: 'string', default: "'on'", description: 'Valor enviado no formulário quando ligado.' },
        { name: 'id', type: 'string', description: 'Id do <button>; sem ele, um useId.' },
        { name: 'aria-label', type: 'string', description: 'Nome acessível sem rótulo visível.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional, no invólucro.' },
        { name: 'style', type: 'React.CSSProperties', description: 'Estilos inline, no invólucro.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Switch> = {
  title: 'Unoochat/Componentes/Switch',
  component: Switch,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo exibido.' },
    description: { control: 'text', description: 'Linha secundária.' },
    labelPosition: { control: 'radio', options: ['left', 'right'], description: 'Lado do texto.' },
    defaultChecked: { control: 'boolean', description: 'Estado inicial.' },
    disabled: { control: 'boolean', description: 'Desabilita o controle.' },
    name: { control: 'text', description: 'Nome do campo.' },
    value: { control: 'text', description: 'Valor enviado quando ligado.' },
    onChange: { action: 'onChange' },
  },
  args: {
    label: ESCALA,
    description: ESCALA_DESCRICAO,
    labelPosition: 'left',
    defaultChecked: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SwitchDocumentationPage />,
};

/**
 * Playground com 100% das props do Switch expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Switch',
  render: (args) => (
    <UncDocStage surface="dialog" padding={32}>
      <div style={{ width: 343 }}>
        <Switch {...args} style={{ width: '100%' }} />
      </div>
    </UncDocStage>
  ),
};

/**
 * As escolhas do gráfico da missão, num aparelho de 375px.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UncDocStage surface="dialog" padding={16} align="flex-start">
      <div style={{ width: 343 }}>
        <LinhasDoGrafico />
      </div>
    </UncDocStage>
  ),
};

/**
 * Matriz completa de estados.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="dialog" direction="column" align="flex-start" gap={8} padding={24}>
      <StatesMatrix />
    </UncDocStage>
  ),
};

/**
 * O contrato acessível: papel, nome, descrição, clique no rótulo, Enter e
 * Espaço, desabilitado e alvo de 44px.
 */
export const Acessibilidade: Story = {
  args: { onChange: fn() },
  render: (args) => (
    <UncDocStage surface="dialog" direction="column" align="flex-start" gap={8} padding={24}>
      <Switch label={ESCALA} description={ESCALA_DESCRICAO} onChange={args.onChange} />
      <Switch label="Desabilitado" disabled />
    </UncDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const interruptor = tela.getByRole('switch', { name: ESCALA });

    await expect(interruptor).toBeVisible();
    await expect(interruptor.tagName).toBe('BUTTON');
    await expect(interruptor).toHaveAccessibleDescription(ESCALA_DESCRICAO);
    await expect(interruptor).toHaveAttribute('aria-checked', 'false');
    const caixa = interruptor.getBoundingClientRect();
    await expect(caixa.width).toBeGreaterThanOrEqual(44);
    await expect(caixa.height).toBeGreaterThanOrEqual(44);

    await userEvent.click(interruptor);
    await expect(interruptor).toHaveAttribute('aria-checked', 'true');
    await expect(args.onChange).toHaveBeenLastCalledWith(true, expect.anything());

    // Tocar no texto também alterna.
    await userEvent.click(tela.getByText(ESCALA_DESCRICAO));
    await expect(interruptor).toHaveAttribute('aria-checked', 'false');

    interruptor.focus();
    await userEvent.keyboard('{Enter}');
    await expect(interruptor).toHaveAttribute('aria-checked', 'true');
    await userEvent.keyboard(' ');
    await expect(interruptor).toHaveAttribute('aria-checked', 'false');

    const desabilitado = tela.getByRole('switch', { name: 'Desabilitado' });
    await expect(desabilitado).toBeDisabled();
  },
};
