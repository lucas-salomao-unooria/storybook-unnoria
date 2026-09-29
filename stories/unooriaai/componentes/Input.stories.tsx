import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Input } from '../../../src/unooriaai/components/Input';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocCard,
  UaiDocGrid,
  UaiDocSpecs,
  UaiDocDecisions,
  UaiDocAnatomy,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';

const BAR = '#716C98';
const ESTADOS = ['default', 'focus', 'error', 'disabled'] as const;

/**
 * Página de documentação rica do componente Input.
 */
const InputDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Formulário"
      title="Input"
      description="Campo de texto de linha única, de 320 × 44, com padding 10/12, raio 8, superfície primária e contorno de 1px que muda com o estado: contorno de controle em repouso, roxo da marca em foco, vermelho em erro e contorno suave quando desabilitado."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral e casos de uso"
      description="Um campo de texto de linha única, com quatro estados."
      barColor={BAR}
    />
    <UaiDocGrid>
      <UaiDocCard icon="⌨️" title="Formulários">
        Nome do assistente, instruções curtas, chave de API, apelido de conta: os formulários das
        telas de configuração e de criação.
      </UaiDocCard>
      <UaiDocCard icon="🎯" title="Foco real e forçado">
        O contorno de foco aparece por <code>:focus-within</code> na interação normal. A prop{' '}
        <code>state=&quot;focus&quot;</code> fixa o mesmo visual para matrizes de documentação.
      </UaiDocCard>
      <UaiDocCard icon="🟥" title="Erro">
        <code>state=&quot;error&quot;</code> troca o contorno para <code>--uai-status-error</code> e
        aplica <code>aria-invalid</code>, mantendo o contorno vermelho mesmo em foco.
      </UaiDocCard>
      <UaiDocCard icon="🚫" title="Desabilitado">
        Contorno suave e texto em <code>--uai-text-soft-30</code>. O atributo <code>disabled</code>{' '}
        nativo é propagado ao elemento interno.
      </UaiDocCard>
      <UaiDocCard icon="✍️" title="Controlado só quando pedido">
        Sem <code>value</code>, o texto mora no DOM. O componente nunca passa <code>value</code> ao
        campo por conta própria, então o preenchimento automático não é apagado.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações técnicas"
      description="Medidas e tokens do componente."
      barColor={BAR}
    />
    <UaiDocSpecs
      component="Input"
      layout="Campo · 320 × 44"
      specs={[
        { label: 'Dimensões', value: '320 × 44 · --uai-size-input-height' },
        { label: 'Padding', value: '10/12' },
        { label: 'Raio', value: '8px · --uai-radius-md' },
        { label: 'Contorno', value: '1px · --uai-border-control' },
        { label: 'Superfície', value: '--uai-bg-primary' },
        { label: 'Tipografia', value: 'Open Sans 400 · 14/20px (body-sm)' },
        { label: 'Espaço reservado', value: '--uai-text-soft-40' },
        { label: 'Foco', value: 'contorno em --uai-border-brand' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Padding vertical de 10px',
          detail:
            'é medida literal do módulo: a escala de espaçamento salta de 8 para 12. Com a linha de 20px, os 10px de cima e de baixo fecham os 44px do campo.',
        },
        {
          subject: 'Contorno de controle em repouso',
          detail:
            'o contorno usa --uai-border-control, que passa de 3:1 sobre a superfície nos dois temas; o divisor decorativo (--uai-border-default) ficaria abaixo disso e apagaria o limite do campo.',
        },
        {
          subject: 'Valor e espaço reservado são coisas distintas',
          detail:
            'o valor digitado é sempre --uai-text-primary e o espaço reservado é sempre --uai-text-soft-40 (6,4:1 no claro e 8,6:1 no escuro).',
        },
        {
          subject: 'Desabilitado isento de contraste',
          detail:
            'o campo desabilitado usa --uai-border-default e --uai-text-soft-30. Componente inativo é isento pela WCAG e o esmaecimento é o que comunica o estado.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do componente"
      description="Contêiner com contorno e um campo nativo transparente."
      barColor={BAR}
    />
    <UaiDocAnatomy
      zones={[
        {
          name: 'Contêiner',
          role: 'Guarda superfície, contorno, raio e padding. É ele que reage ao foco por :focus-within.',
          token: '--uai-bg-primary · --uai-border-control · --uai-radius-md',
        },
        {
          name: 'Campo',
          role: '<input> nativo sem borda nem fundo, herdando toda a tipografia dos tokens. Todas as props nativas passam por spread.',
          token: '--uai-font-body-sm-*',
        },
        {
          name: 'block',
          role: 'Faz o campo ocupar 100% da largura; sem ela, mantém os 320px.',
        },
        {
          name: 'aria-invalid',
          role: 'Aplicado automaticamente quando state="error", sem exigir código na aplicação.',
          token: '--uai-status-error',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os quatro estados, renderizados pelo componente real."
      barColor={BAR}
    />
    <UaiDocStage label="state = default · focus · error · disabled" direction="column" align="flex-start">
      {ESTADOS.map((state) => (
        <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 90, fontSize: 12, color: 'var(--uai-text-secondary)' }}>{state}</span>
          <Input state={state} />
        </div>
      ))}
    </UaiDocStage>
    <UaiDocStage label="Com valor digitado e em largura total" direction="column" align="flex-start">
      <Input defaultValue="Tokens do sistema de design" />
      <Input state="error" defaultValue="chave-invalida" />
      <div style={{ width: '100%' }}>
        <Input block placeholder="Ocupa a largura toda" />
      </div>
    </UaiDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas práticas"
      description="Regras de formulário."
      barColor={BAR}
    />
    <UaiDocPractices
      dos={[
        'Associar um rótulo visível ao campo por id/htmlFor, ou passar aria-label quando o rótulo for implícito.',
        'Usar state="error" junto com uma mensagem de erro em texto: a cor sozinha não comunica.',
        'Deixar o foco natural funcionar; reservar state="focus" às matrizes de documentação.',
        'Passar block quando o campo estiver dentro de um formulário fluido.',
      ]}
      donts={[
        'Usar o Input como compositor de mensagem: para isso existe o ChatInput.',
        'Comunicar erro apenas pela cor do contorno.',
        'Aplicar altura própria por fora: os 44px vêm de --uai-size-input-height.',
        'Deixar o espaço reservado no lugar do rótulo, que desaparece quando a pessoa digita.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="A superfície segue --uai-bg-primary e o contorno segue --uai-border-control, ambos com valores próprios em cada tema."
      barColor={BAR}
    />
    <UaiDocThemeSwitcher direction="column">
      {() => (
        <>
          {ESTADOS.map((state) => (
            <Input key={state} state={state} />
          ))}
        </>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência completa de props da API"
      description="Contrato público do componente Input."
      barColor={BAR}
    />
    <UaiDocPropsTable
      title="Input"
      rows={[
        {
          name: 'state',
          type: "'default' | 'focus' | 'error' | 'disabled'",
          default: "'default'",
          description:
            'Estado visual. error aplica aria-invalid; disabled propaga o atributo nativo; focus fixa o anel para documentação.',
        },
        {
          name: 'block',
          type: 'boolean',
          default: 'false',
          description: 'Ocupa toda a largura disponível em vez dos 320px.',
        },
        {
          name: 'placeholder',
          type: 'string',
          default: "'Escreva aqui'",
          description: 'Texto do espaço reservado, em --uai-text-soft-40.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
        },
        {
          name: '...props',
          type: 'React.InputHTMLAttributes<HTMLInputElement>',
          description:
            'Todas as props nativas de input (value, defaultValue, onChange, type, name, autoComplete…) são repassadas ao campo interno. O campo só é controlado quando value é passado.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Input> = {
  title: 'UnooriaAI/Componentes/Input',
  component: Input,
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'radio', options: ESTADOS, description: 'Estado visual do campo.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura do contêiner.' },
    placeholder: { control: 'text', description: 'Texto do espaço reservado.' },
    defaultValue: { control: 'text', description: 'Valor inicial do campo.' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'url', 'number'],
      description: 'Tipo nativo do campo.',
    },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    state: 'default',
    block: false,
    placeholder: 'Escreva aqui',
    defaultValue: '',
    type: 'text',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <InputDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Input expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Input',
  render: (args) => (
    <div
      data-uai-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        background: 'var(--uai-bg-secondary)',
        border: '1px solid var(--uai-border-default)',
      }}
    >
      <Input {...args} />
    </div>
  ),
};

/**
 * Os quatro estados do campo, empilhados na medida canônica.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: 352,
        maxWidth: '100%',
        padding: 16,
        boxSizing: 'border-box',
        border: '1px solid var(--uai-border-default)',
        borderRadius: 8,
      }}
    >
      {ESTADOS.map((state) => (
        <Input key={state} state={state} />
      ))}
    </div>
  ),
};

/**
 * Os quatro estados com rótulo, como aparecem em um formulário real. O `play`
 * guarda a regra do campo não controlado: o texto digitado mora no DOM.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 360 }}>
      {ESTADOS.map((state) => (
        <label key={state} style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--uai-text-primary)' }}>
            {state}
          </span>
          <Input state={state} block aria-label={`Campo ${state}`} />
          {state === 'error' && (
            <span style={{ fontSize: 12, color: 'var(--uai-status-error)' }}>
              Informe um valor válido para continuar.
            </span>
          )}
        </label>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const padrao = canvas.getByLabelText('Campo default') as HTMLInputElement;
    const erro = canvas.getByLabelText('Campo error') as HTMLInputElement;
    const desabilitado = canvas.getByLabelText('Campo disabled') as HTMLInputElement;

    await userEvent.type(padrao, 'texto livre');
    await expect(padrao.value).toBe('texto livre');
    await expect(erro).toHaveAttribute('aria-invalid', 'true');
    await expect(desabilitado).toBeDisabled();
  },
};
