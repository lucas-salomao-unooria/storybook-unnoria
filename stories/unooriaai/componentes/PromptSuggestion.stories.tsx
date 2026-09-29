import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PromptSuggestion } from '../../../src/unooriaai/components/PromptSuggestion';
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
import { uaiTopicColumns } from '../fixtures';

const BAR = '#716C98';

/**
 * As três colunas de cartões da tela vazia, montadas com o componente real.
 */
const ColunasDeCartoes = () => (
  <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
    {uaiTopicColumns.map((column, index) => (
      <div key={column.title} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {column.items.map((item) => (
          <PromptSuggestion key={item} as={index === 0 ? 'button' : 'div'}>
            {item}
          </PromptSuggestion>
        ))}
      </div>
    ))}
  </div>
);

/**
 * Página de documentação rica do componente PromptSuggestion.
 */
const PromptSuggestionDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Conteúdo"
      title="PromptSuggestion"
      description="Cartão de 280 × 48 com padding 4/8, raio 8 e texto Open Sans de 14/20, sobre a superfície de sugestão do cliente web. O mesmo cartão serve às três colunas da tela vazia: acionável em “Exemplos” e informativo em “Capacidades” e “Limitações”."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Um cartão, três papéis."
      barColor={BAR}
    />
    <UaiDocGrid>
      <UaiDocCard icon="💡" title="Sugestão acionável">
        Na coluna “Exemplos” o cartão é um ponto de partida — clicar preenche o compositor. Use{' '}
        <code>as=&quot;button&quot;</code>.
      </UaiDocCard>
      <UaiDocCard icon="📄" title="Frase informativa">
        Em “Capacidades” e “Limitações” o mesmo cartão apenas informa. Mantenha{' '}
        <code>as=&quot;div&quot;</code> — um botão que não faz nada é ruído para o leitor de tela.
      </UaiDocCard>
      <UaiDocCard icon="📐" title="Duas linhas">
        Os 48px cabem duas linhas de 20px. A altura é <code>min-height</code>, para que uma linha
        só mantenha a caixa e um texto maior cresça em vez de vazar.
      </UaiDocCard>
      <UaiDocCard icon="🌗" title="Superfície por tema">
        <code>--uai-web-suggestion</code> tem um valor nomeado em cada tema: lavanda clara no claro
        e branco translúcido sobre o roxo profundo no escuro.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações técnicas"
      description="Medidas e tokens consumidos pelo cartão."
      barColor={BAR}
    />
    <UaiDocSpecs
      component="PromptSuggestion"
      layout="Cartão · 280 × 48"
      specs={[
        { label: 'Medidas', value: '280 × 48 (altura mínima)' },
        { label: 'Padding', value: '4/8 · --uai-spacing-2 e --uai-spacing-4' },
        { label: 'Raio', value: '8px · --uai-radius-md' },
        { label: 'Tipografia', value: 'Open Sans · 14/20 · --uai-font-body-sm-*' },
        { label: 'Superfície', value: '--uai-web-suggestion' },
        { label: 'Hover (botão)', value: '--uai-fill-8' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Altura mínima, não fixa',
          detail:
            'Os 48px viraram `min-height`. As sugestões cabem em duas linhas, mas um texto mais longo em produção cortaria se a altura fosse fixa.',
        },
        {
          subject: 'Hover e foco',
          detail:
            'Quando renderizado como botão ou âncora, o cartão realça para `--uai-fill-8` e recebe anel de foco de 2px em `--uai-border-brand`. Desabilitado, cai a 40% de opacidade.',
        },
        {
          subject: 'Elemento raiz por prop',
          detail:
            'O elemento é escolhido por `as` (`div`, `button` ou `a`), de modo que só o cartão que faz algo seja focável.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Uma caixa de texto com superfície própria."
      barColor={BAR}
    />
    <UaiDocAnatomy
      zones={[
        { name: 'children', role: 'Texto do cartão, no degrau body-sm, alinhado à esquerda e centrado na vertical.', token: '--uai-font-body-sm-size' },
        { name: 'as', role: "'div' por padrão; 'button' ou 'a' quando o cartão for acionável." },
        { name: 'block', role: 'Sem ela o cartão mantém 280px; com ela acompanha a largura da coluna.' },
        { name: 'Superfície', role: 'Fundo do cartão, com um valor em cada tema.', token: '--uai-web-suggestion' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes, Tamanhos e Estados"
      description="Os dois papéis e os estados interativos."
      barColor={BAR}
    />
    <UaiDocStage label="Informativo (div), acionável (button) e desabilitado" direction="column" align="flex-start">
      <PromptSuggestion>Lembra o que a pessoa disse antes na conversa.</PromptSuggestion>
      <PromptSuggestion as="button">
        &quot;Explique como funciona a fotossíntese em poucas palavras&quot;
      </PromptSuggestion>
      <PromptSuggestion as="button" disabled>
        Sugestão desabilitada
      </PromptSuggestion>
    </UaiDocStage>
    <UaiDocStage label="block — o cartão acompanha a largura do contêiner" direction="column">
      <div style={{ width: '100%', maxWidth: 620 }}>
        <PromptSuggestion block>
          Um texto bem mais longo que as duas linhas previstas, para mostrar que a caixa cresce em
          vez de cortar o conteúdo quando ele não cabe nos 48px de altura mínima.
        </PromptSuggestion>
      </div>
    </UaiDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de composição das colunas."
      barColor={BAR}
    />
    <UaiDocPractices
      dos={[
        'Usar as="button" apenas nas colunas em que clicar faz alguma coisa.',
        'Manter três cartões por coluna, com 16px de intervalo.',
        'Deixar a altura crescer com o conteúdo em vez de truncar o texto.',
        'Usar block quando a coluna for responsiva e os 280px fixos não couberem.',
      ]}
      donts={[
        'Renderizar como botão um cartão que apenas informa.',
        'Fixar height em 48px: qualquer texto de três linhas vaza.',
        'Trocar a superfície por --uai-bg-secondary — o cartão perderia o contraste com a tela.',
        'Empilhar mais de três cartões por coluna sem revisar a grade da tela.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A superfície tem um valor nomeado em cada tema, e não uma derivação."
      barColor={BAR}
    />
    <UaiDocThemeSwitcher>
      {() => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {uaiTopicColumns[1].items.map((item) => (
            <PromptSuggestion key={item}>{item}</PromptSuggestion>
          ))}
          <PromptSuggestion as="button">{uaiTopicColumns[0].items[0]}</PromptSuggestion>
        </div>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente PromptSuggestion."
      barColor={BAR}
    />
    <UaiDocPropsTable
      title="PromptSuggestion"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Texto do cartão.' },
        {
          name: 'as',
          type: 'React.ElementType',
          default: "'div'",
          description:
            "Elemento raiz. Use 'button' nas colunas acionáveis e mantenha 'div' nas informativas.",
        },
        {
          name: 'block',
          type: 'boolean',
          default: 'false',
          description: 'Ocupa toda a largura do contêiner em vez dos 280px do cartão.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Desabilita a interação quando as renderiza um button.',
        },
        {
          name: 'type',
          type: "'button' | 'submit' | 'reset'",
          description: 'Tipo do botão quando as renderiza um button.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PromptSuggestion> = {
  title: 'UnooriaAI/Componentes/PromptSuggestion',
  component: PromptSuggestion,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Texto do cartão.' },
    as: { control: 'radio', options: ['div', 'button'], description: 'Elemento raiz.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura.' },
    disabled: { control: 'boolean', description: 'Desabilita a interação.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    children: '"Explique como funciona a fotossíntese em poucas palavras"',
    as: 'div',
    block: false,
    disabled: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof PromptSuggestion>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PromptSuggestionDocumentationPage />,
};

/**
 * Playground com todas as propriedades do PromptSuggestion expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PromptSuggestion',
  render: (args) => (
    <UaiDocStage theme={args.theme ?? 'light'} padding={48}>
      <PromptSuggestion {...args} />
    </UaiDocStage>
  ),
};

/**
 * As três colunas de cartões da tela de nova conversa.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UaiDocStage align="flex-start">
      <ColunasDeCartoes />
    </UaiDocStage>
  ),
};

/**
 * Os dois papéis do cartão — informativo e acionável — e o estado desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <UaiDocStage direction="column" align="flex-start">
      <PromptSuggestion>{uaiTopicColumns[1].items[0]}</PromptSuggestion>
      <PromptSuggestion as="button">{uaiTopicColumns[0].items[0]}</PromptSuggestion>
      <PromptSuggestion as="button" disabled>
        {uaiTopicColumns[0].items[1]}
      </PromptSuggestion>
    </UaiDocStage>
  ),
};
