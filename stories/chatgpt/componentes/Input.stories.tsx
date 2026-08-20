import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../../src/chatgpt/components/Input';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  GptDocCard,
  GptDocGrid,
  GptDocFigmaSpecs,
  GptDocPractices,
  GptDocPropsTable,
  GptDocStage,
  GptDocThemeSwitcher,
} from '../../../.storybook/components';
import { gptFigmaNodes } from '../fixtures';

const ESTADOS = ['default', 'focus', 'error', 'disabled'] as const;

/**
 * Página de documentação rica do componente Input.
 */
const InputDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Componentes • Formulário"
      title="Input"
      description="Réplica do conjunto Input da página 🟡 Design system: campo de 320 × 44 com padding 10/12, raio 8, superfície bg/primary e contorno de 1px que muda com o estado — border/default em repouso, border/brand em foco, status/error em erro e o contorno a 50% quando desabilitado."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Um campo de texto de linha única, com quatro estados publicados."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="⌨️" title="Formulários">
        Nome de GPT, instruções curtas, chave de API, apelido de conta — os formulários das telas de
        configuração e de criação.
      </GptDocCard>
      <GptDocCard icon="🎯" title="Foco real e forçado">
        O contorno de foco aparece por <code>:focus-within</code> na interação normal. A prop{' '}
        <code>state="focus"</code> fixa o mesmo visual para matrizes de documentação.
      </GptDocCard>
      <GptDocCard icon="🟥" title="Erro">
        <code>state="error"</code> troca o contorno para <code>status/error</code> e aplica{' '}
        <code>aria-invalid</code>, mantendo o contorno vermelho mesmo em foco.
      </GptDocCard>
      <GptDocCard icon="🚫" title="Desabilitado">
        Contorno a 50% e texto a 30%. O atributo <code>disabled</code> nativo é propagado ao
        elemento interno.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do conjunto de variantes via Plugin API."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.input}
      frameName="Input (State · 4 variantes)"
      specs={[
        { label: 'Dimensões', value: '320 × 44 · size/input-height' },
        { label: 'Padding', value: '10/12' },
        { label: 'Raio', value: '8px · radius/md' },
        { label: 'Contorno', value: '1px interno' },
        { label: 'Tipografia', value: 'Inter Regular · 14 (Body/SM)' },
        { label: 'Placeholder', value: 'preto a 40% · --gpt-text-soft-40' },
      ]}
      deviations={[
        'O padding vertical de 10px é literal do arquivo: Primitives/Spacing salta de 8 para 12.',
        'O texto da variante Focus está a 100% de opacidade no arquivo e o da Default a 40% — no arquivo, a mesma camada faz papel de placeholder e de valor digitado. Na implementação, valor e placeholder são propriedades distintas: o valor é sempre text/primary e o placeholder sempre --gpt-text-soft-40.',
        'O contorno da variante Disabled usa border/default a 50% de opacidade, resolvido com color-mix para acompanhar a troca de tema.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Contêiner com contorno e um campo nativo transparente."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="▭" title="Contêiner">
        Guarda superfície, contorno, raio e padding. É ele que reage ao foco por{' '}
        <code>:focus-within</code>.
      </GptDocCard>
      <GptDocCard icon="🔤" title="Campo">
        <code>&lt;input&gt;</code> nativo sem borda nem fundo, herdando toda a tipografia dos
        tokens. Todas as props nativas passam por spread.
      </GptDocCard>
      <GptDocCard icon="↔️" title="block">
        Faz o campo ocupar 100% da largura; sem ela, mantém os 320px do arquivo.
      </GptDocCard>
      <GptDocCard icon="♿" title="aria-invalid">
        Aplicado automaticamente quando <code>state="error"</code>, sem exigir código na aplicação.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Estados"
      description="As quatro variantes publicadas, renderizadas pelo componente real."
      barColor="#5856D6"
    />
    <GptDocStage label="State=default · focus · error · disabled" direction="column" align="flex-start">
      {ESTADOS.map((state) => (
        <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 90, fontSize: 12, color: '#475157' }}>{state}</span>
          <Input state={state} />
        </div>
      ))}
    </GptDocStage>
    <GptDocStage label="Com valor digitado e em largura total" direction="column" align="flex-start">
      <Input defaultValue="Design system tokens" />
      <Input state="error" defaultValue="chave-invalida" />
      <div style={{ width: '100%' }}>
        <Input block placeholder="Ocupa a largura toda" />
      </div>
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de formulário."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Associar um rótulo visível ao campo por id/htmlFor, ou passar aria-label quando o rótulo for implícito.',
        'Usar state="error" junto com uma mensagem de erro em texto — a cor sozinha não comunica.',
        'Deixar o foco natural funcionar; reservar state="focus" às matrizes de documentação.',
        'Passar block quando o campo estiver dentro de um formulário fluido.',
      ]}
      donts={[
        'Usar o Input como compositor de mensagem — para isso existe o ChatInput.',
        'Comunicar erro apenas pela cor do contorno.',
        'Aplicar altura própria por fora: os 44px vêm de size/input-height.',
        'Deixar o placeholder no lugar do rótulo, que desaparece quando o usuário digita.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A superfície segue bg/primary e o contorno segue border/default, ambos invertidos no Dark."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher direction="column">
      {() => (
        <>
          {ESTADOS.map((state) => (
            <Input key={state} state={state} />
          ))}
        </>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Input."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="Input"
      rows={[
        {
          name: 'state',
          type: "'default' | 'focus' | 'error' | 'disabled'",
          default: "'default'",
          description:
            'Estado visual, espelhando a propriedade State do conjunto no Figma. error aplica aria-invalid; disabled propaga o atributo nativo.',
        },
        {
          name: 'block',
          type: 'boolean',
          default: 'false',
          description: 'Ocupa toda a largura disponível em vez dos 320px do arquivo.',
        },
        {
          name: 'placeholder',
          type: 'string',
          default: "'Placeholder'",
          description: 'Texto do placeholder, renderizado a 40% de opacidade.',
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
            'Todas as props nativas de input (value, onChange, type, name, autoComplete…) são repassadas ao campo interno.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Input> = {
  title: 'ChatGPT/Componentes/Input',
  component: Input,
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'radio', options: ESTADOS, description: 'Estado visual do campo.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura do contêiner.' },
    placeholder: { control: 'text', description: 'Texto do placeholder.' },
    defaultValue: { control: 'text', description: 'Valor inicial do campo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    state: 'default',
    block: false,
    placeholder: 'Placeholder',
    defaultValue: '',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <Input {...args} />
    </div>
  ),
};

/**
 * Réplica visual do conjunto de variantes publicado no Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: 352,
        padding: 16,
        border: '1px solid #E4E8E9',
        borderRadius: 5,
      }}
    >
      {ESTADOS.map((state) => (
        <Input key={state} state={state} />
      ))}
    </div>
  ),
};

/**
 * Os quatro estados com rótulo, como aparecem em um formulário real.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 360 }}>
      {ESTADOS.map((state) => (
        <label key={state} style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#22272A' }}>{state}</span>
          <Input state={state} block />
          {state === 'error' && (
            <span style={{ fontSize: 12, color: '#FF4747' }}>
              Informe um valor válido para continuar.
            </span>
          )}
        </label>
      ))}
    </div>
  ),
};
