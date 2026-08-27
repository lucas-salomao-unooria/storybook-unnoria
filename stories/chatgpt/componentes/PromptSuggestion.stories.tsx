import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PromptSuggestion } from '../../../src/chatgpt/components/PromptSuggestion';
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
import { gptTopicColumns, gptWebClientNodes } from '../fixtures';

/**
 * Página de documentação rica do componente PromptSuggestion.
 */
const PromptSuggestionDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Componentes • Conteúdo"
      title="PromptSuggestion"
      description="Cartão de 280 × 48 com padding 4/8, raio 8 e texto Inter Regular de 14/20, medido nas duas versões do quadro New chat - V1 - A: superfície color/gray/50 no tema claro e branco a 4% no escuro. O arquivo usa o mesmo cartão nas três colunas da tela."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Um cartão, três papéis."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="💡" title="Sugestão acionável">
        Na coluna <code>Examples</code> o cartão é um ponto de partida — clicar preenche o
        compositor. Use <code>as=&quot;button&quot;</code>.
      </GptDocCard>
      <GptDocCard icon="📄" title="Frase informativa">
        Em <code>Capabilities</code> e <code>Limitations</code> o mesmo cartão apenas informa.
        Mantenha <code>as=&quot;div&quot;</code> — um botão que não faz nada é ruído para o leitor
        de tela.
      </GptDocCard>
      <GptDocCard icon="📐" title="Duas linhas">
        O arquivo desenha exatamente duas linhas de 20px em todos os nove cartões. Aqui os 48px são{' '}
        <code>min-height</code>, para que uma linha só mantenha a caixa e um texto maior cresça.
      </GptDocCard>
      <GptDocCard icon="🌗" title="Superfícies medidas">
        <code>#F9F9FA</code> no claro e branco a 4% no escuro — dois valores lidos dos respectivos
        quadros, não uma derivação.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do cartão Text das três colunas."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptWebClientNodes.screenLight}
      frameName="Text (Count=1, State=Default, Vertical=True)"
      specs={[
        { label: 'Medidas', value: '280 × 48' },
        { label: 'Padding', value: '4/8 · spacing/2 e spacing/4' },
        { label: 'Raio', value: '8px · radius/md' },
        { label: 'Tipografia', value: 'Inter Regular · 14/20 (Body/SM)' },
        { label: 'Superfície Light', value: '#F9F9FA · color/gray/50' },
        { label: 'Superfície Dark', value: 'branco a 4%' },
      ]}
      deviations={[
        'A altura de 48px virou `min-height`. O arquivo é estático e cabe sempre em duas linhas; fixar a altura cortaria qualquer texto mais longo em produção.',
        'O arquivo não publica hover nem foco — as telas são estáticas. Quando renderizado como botão, o cartão escurece para `--gpt-fill-8`, degrau vizinho da mesma escada, e recebe anel de foco de 2px em `border/brand`.',
        'Nos quadros de origem as quebras de linha estão coladas ("computing insimple terms") porque o texto é uma caixa de largura fixa. As fixtures restauram o espaço.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Uma caixa de texto com superfície própria."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="🔤" title="children">
        O texto do cartão, em <code>Body/SM</code>, alinhado à esquerda e centrado na vertical.
      </GptDocCard>
      <GptDocCard icon="🧱" title="as">
        <code>&apos;div&apos;</code> por padrão; <code>&apos;button&apos;</code> ou{' '}
        <code>&apos;a&apos;</code> quando o cartão for acionável.
      </GptDocCard>
      <GptDocCard icon="↔️" title="block">
        Sem ela o cartão mantém os 280px do arquivo; com ela acompanha a coluna.
      </GptDocCard>
      <GptDocCard icon="🎨" title="Superfície">
        <code>--gpt-web-suggestion</code>, o par medido nos dois quadros.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Estados"
      description="Os dois papéis e os estados interativos."
      barColor="#5856D6"
    />
    <GptDocStage label="Informativo (div) e acionável (button)" direction="column" align="flex-start">
      <PromptSuggestion>Remembers what user said earlier in the conversation.</PromptSuggestion>
      <PromptSuggestion as="button">
        &quot;Explain quantum computing in simple terms&quot;
      </PromptSuggestion>
      <PromptSuggestion as="button" disabled>
        Sugestão desabilitada
      </PromptSuggestion>
    </GptDocStage>
    <GptDocStage label="block — o cartão acompanha a largura do contêiner" direction="column">
      <div style={{ width: '100%', maxWidth: 620 }}>
        <PromptSuggestion block>
          Um texto bem mais longo que as duas linhas do arquivo, para mostrar que a caixa cresce em
          vez de cortar o conteúdo quando o conteúdo real não cabe nos 48px publicados.
        </PromptSuggestion>
      </div>
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de composição das colunas."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Usar as="button" apenas nas colunas em que clicar faz alguma coisa.',
        'Manter três cartões por coluna, com 16px de intervalo, como faz o arquivo.',
        'Deixar a altura crescer com o conteúdo em vez de truncar o texto.',
        'Usar block quando a coluna for responsiva e os 280px fixos não couberem.',
      ]}
      donts={[
        'Renderizar como botão um cartão que apenas informa.',
        'Fixar height em 48px: qualquer texto de três linhas vaza.',
        'Trocar a superfície por --gpt-bg-secondary — no tema escuro o valor é outro.',
        'Empilhar mais de três cartões por coluna sem revisar a grade da tela.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A superfície tem um valor medido em cada tema, e não uma derivação."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher>
      {() => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {gptTopicColumns[1].items.map((item) => (
            <PromptSuggestion key={item}>{item}</PromptSuggestion>
          ))}
        </div>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente PromptSuggestion."
      barColor="#5856D6"
    />
    <GptDocPropsTable
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
          description: 'Ocupa toda a largura do contêiner em vez dos 280px do arquivo.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Desabilita a interação quando as renderiza um button.',
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
  title: 'ChatGPT/Componentes/PromptSuggestion',
  component: PromptSuggestion,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Texto do cartão.' },
    as: { control: 'radio', options: ['div', 'button'], description: 'Elemento raiz.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura.' },
    disabled: { control: 'boolean', description: 'Desabilita a interação.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    children: '"Explain quantum computing in simple terms"',
    as: 'div',
    block: false,
    disabled: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof PromptSuggestion>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#333333' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <PromptSuggestion {...args} />
    </div>
  ),
};

/**
 * Réplica das três colunas de cartões da tela de nova conversa.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 40,
        padding: 24,
        border: '1px solid #E4E8E9',
        borderRadius: 5,
      }}
    >
      {gptTopicColumns.map((column) => (
        <div key={column.title} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {column.items.map((item) => (
            <PromptSuggestion key={item} as={column.title === 'Examples' ? 'button' : 'div'}>
              {item}
            </PromptSuggestion>
          ))}
        </div>
      ))}
    </div>
  ),
};
