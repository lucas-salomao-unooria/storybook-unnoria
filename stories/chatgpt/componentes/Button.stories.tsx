import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '../../../src/chatgpt/components/Button';
import { gptGlyphs } from '../../../src/chatgpt/tokens';
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

const VARIANTES = ['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const;
const TAMANHOS = ['sm', 'md', 'lg'] as const;

/**
 * Página de documentação rica do componente Button.
 */
const ButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Componentes • Ações"
      title="Button"
      description="Réplica do conjunto de variantes Button da página 🟡 Design system: 5 variantes (Primary, Secondary, Outline, Ghost, Destructive) × 3 tamanhos (SM, MD, LG), totalizando as 15 combinações publicadas no arquivo Figma. O rótulo é sempre Inter Semi Bold, e a altura resulta do padding somado à altura de linha — não de uma altura fixa."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Cada variante ocupa um lugar distinto na hierarquia de ação da tela."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="🟪" title="Primary">
        Superfície <code>interactive/primary</code> (#5856D6). Uma por tela: a ação que faz a
        conversa avançar. Em hover troca para <code>interactive/hover</code>.
      </GptDocCard>
      <GptDocCard icon="⬛" title="Secondary">
        Superfície <code>bg/inverse</code> — preta no Light, branca no Dark. É o botão de alto
        contraste usado em confirmações e no compositor.
      </GptDocCard>
      <GptDocCard icon="⬜" title="Outline & Ghost">
        <code>Outline</code> carrega contorno de 1px <code>border/default</code> sobre{' '}
        <code>bg/primary</code>; <code>Ghost</code> descarta superfície e contorno, restando o
        rótulo. Ambos são ações de apoio.
      </GptDocCard>
      <GptDocCard icon="🟥" title="Destructive">
        Superfície <code>status/error</code> para ações irreversíveis — apagar conversa, revogar
        acesso. Sempre acompanhada de confirmação.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do conjunto de variantes via Plugin API."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.button}
      frameName="Button (Variant × Size · 15 variantes)"
      specs={[
        { label: 'SM', value: 'pad 6/12 · raio 8 · 12/16 · alt. 28' },
        { label: 'MD', value: 'pad 8/16 · raio 8 · 14/18 · alt. 34' },
        { label: 'LG', value: 'pad 12/24 · raio 12 · 16/20 · alt. 44' },
        { label: 'Peso do rótulo', value: '600 (Inter Semi Bold)' },
        { label: 'Contorno Outline', value: '1px interno · border/default' },
        { label: 'Ghost', value: 'preenchimento preto a 0% de opacidade' },
      ]}
      deviations={[
        'As alturas de linha 18px (MD) e 20px (LG) são literais das camadas de texto e não correspondem a nenhum estilo publicado — Label/MD usa 20 e Label/LG usa 24.',
        'O arquivo não publica estado de hover, foco ou desabilitado. Hover usa interactive/hover no Primary e a escada --gpt-fill-4 nas variantes translúcidas; foco usa anel de 2px em border/brand; desabilitado aplica 40% de opacidade. Todos anotados no CSS.',
        'Os slots de ícone (leadingIcon/trailingIcon) não existem no conjunto do Figma; o gap de 6px adotado é o mesmo do glifo do componente Tag.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Três zonas de customização em um contêiner de altura derivada."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="🔤" title="Rótulo">
        <code>children</code>. Inter Semi Bold no corpo do tamanho escolhido, sem quebra de linha
        (<code>white-space: nowrap</code>).
      </GptDocCard>
      <GptDocCard icon="◀️" title="leadingIcon">
        Glifo antes do rótulo, marcado <code>aria-hidden</code>. Use <code>gptGlyphs</code>.
      </GptDocCard>
      <GptDocCard icon="▶️" title="trailingIcon">
        Glifo após o rótulo — típico do <code>→</code> em fluxos de vários passos.
      </GptDocCard>
      <GptDocCard icon="↔️" title="block">
        Faz o botão ocupar 100% da largura do contêiner, mantendo padding e raio.
      </GptDocCard>
    </GptDocGrid>
    <GptDocStage label="Zonas em um mesmo botão">
      <Button leadingIcon={gptGlyphs.sparkle} trailingIcon={gptGlyphs.arrowRight} size="lg">
        Continuar
      </Button>
      <div style={{ width: 260 }}>
        <Button block>Ocupa a largura toda</Button>
      </div>
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes, Tamanhos e Estados"
      description="As 15 combinações publicadas, renderizadas pelo componente real."
      barColor="#5856D6"
    />
    {VARIANTES.map((variant) => (
      <GptDocStage key={variant} label={`Variant=${variant}`} align="flex-start">
        {TAMANHOS.map((size) => (
          <Button key={size} variant={variant} size={size}>
            Button
          </Button>
        ))}
      </GptDocStage>
    ))}
    <GptDocStage label="Estados — repouso, foco por teclado, desabilitado">
      <Button>Repouso</Button>
      <Button autoFocus>Foco</Button>
      <Button disabled>Desabilitado</Button>
      <Button variant="outline" disabled>
        Outline desabilitado
      </Button>
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de hierarquia de ação verificadas contra o arquivo."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Manter uma única ação Primary por tela ou por diálogo.',
        'Usar Ghost para ações de apoio dentro de listas e cabeçalhos, onde o contorno competiria com o conteúdo.',
        'Reservar Destructive para ações irreversíveis, sempre com confirmação em Modal.',
        'Passar as/anchor quando o botão navegar, preservando o comportamento nativo do link.',
      ]}
      donts={[
        'Empilhar dois Primary lado a lado — a hierarquia se perde.',
        'Reduzir o padding para encaixar o botão em um espaço apertado; troque de tamanho.',
        'Usar Destructive como destaque estético em ação inofensiva.',
        'Colocar rótulo com mais de três palavras: o botão não quebra linha.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Alternador em tempo real — Secondary e Outline são os que mais mudam entre os modos."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher>
      {() => (
        <>
          {VARIANTES.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Button."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="Button"
      rows={[
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
          default: "'primary'",
          description: 'Variante visual, espelhando a propriedade Variant do conjunto no Figma.',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: 'Tamanho do botão, espelhando a propriedade Size do conjunto no Figma.',
        },
        {
          name: 'block',
          type: 'boolean',
          default: 'false',
          description: 'Ocupa toda a largura disponível do contêiner.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Desabilita a interação e aplica 40% de opacidade.',
        },
        {
          name: 'leadingIcon',
          type: 'React.ReactNode',
          description: 'Glifo renderizado antes do rótulo, marcado como aria-hidden.',
        },
        {
          name: 'trailingIcon',
          type: 'React.ReactNode',
          description: 'Glifo renderizado após o rótulo, marcado como aria-hidden.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
        },
        {
          name: 'as',
          type: 'React.ElementType',
          default: "'button'",
          description: 'Elemento raiz renderizado — permite usar o botão como âncora.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo do botão.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Button> = {
  title: 'ChatGPT/Componentes/Button',
  component: Button,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'radio',
      options: VARIANTES,
      description: 'Variante visual do botão.',
    },
    size: { control: 'radio', options: TAMANHOS, description: 'Tamanho do botão.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura do contêiner.' },
    disabled: { control: 'boolean', description: 'Desabilita a interação.' },
    leadingIcon: { control: 'text', description: 'Glifo antes do rótulo.' },
    trailingIcon: { control: 'text', description: 'Glifo após o rótulo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Rótulo do botão.' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    block: false,
    disabled: false,
    leadingIcon: '',
    trailingIcon: '',
    theme: 'light',
    children: 'Button',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ButtonDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Button expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Button',
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
      <Button {...args} />
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
        flexWrap: 'wrap',
        gap: 16,
        padding: 24,
        border: '1px solid #E4E8E9',
        borderRadius: 5,
      }}
    >
      {VARIANTES.flatMap((variant) =>
        TAMANHOS.map((size) => (
          <Button key={`${variant}-${size}`} variant={variant} size={size}>
            Button
          </Button>
        ))
      )}
    </div>
  ),
};

/**
 * Matriz completa de variantes por tamanho.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      {VARIANTES.map((variant) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 110, fontSize: 12, color: '#475157' }}>{variant}</span>
          {TAMANHOS.map((size) => (
            <Button key={size} variant={variant} size={size}>
              Button
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

/**
 * Comparação dos três tamanhos suportados.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {TAMANHOS.map((size) => (
        <Button key={size} size={size}>
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  ),
};

/**
 * Estados interativos, incluindo o botão desabilitado e o de largura total.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Button>Repouso</Button>
      <Button disabled>Desabilitado</Button>
      <Button leadingIcon="✦">Com glifo à esquerda</Button>
      <Button trailingIcon="→">Com glifo à direita</Button>
      <Button block>Largura total</Button>
      <Button as="a" href="#modal" variant="outline">
        Renderizado como âncora
      </Button>
    </div>
  ),
};
