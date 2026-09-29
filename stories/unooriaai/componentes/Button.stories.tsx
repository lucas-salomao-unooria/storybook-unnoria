import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '../../../src/unooriaai/components/Button';
import { Icon, uaiIconNames } from '../../../src/unooriaai/components/Icon';
import type { UaiIconName } from '../../../src/unooriaai/components/Icon';
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
const VARIANTES = ['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const;
const TAMANHOS = ['sm', 'md', 'lg'] as const;

/** Aresta do ícone recomendada para cada tamanho: a altura de linha do rótulo. */
const ICONE_PX: Record<(typeof TAMANHOS)[number], number> = { sm: 16, md: 20, lg: 24 };

const iconeDoBotao = (nome: UaiIconName, tamanho: (typeof TAMANHOS)[number]) => (
  <Icon name={nome} size={ICONE_PX[tamanho]} />
);

/**
 * Página de documentação rica do componente Button.
 */
const ButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Ações"
      title="Button"
      description="Botão de ação da conversa: 5 variantes (primary, secondary, outline, ghost, destructive) × 3 tamanhos (sm, md, lg), em Open Sans semibold. A altura resulta do padding somado à altura de linha do rótulo, não de um valor fixo, e os slots de ícone recebem o Icon da biblioteca da Plataforma Unooria."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão Geral & Casos de Uso"
      description="Cada variante ocupa um lugar distinto na hierarquia de ação da tela."
    />
    <UaiDocGrid>
      <UaiDocCard icon="🟣" title="Primary">
        Superfície <code>--uai-interactive-primary</code> (roxo da marca). Uma por tela: a ação que
        faz a conversa avançar. Em hover troca para <code>--uai-interactive-hover</code>.
      </UaiDocCard>
      <UaiDocCard icon="⬛" title="Secondary">
        Superfície <code>--uai-bg-inverse</code> — a mais escura no tema claro, a mais clara no
        escuro. É o botão de alto contraste usado em confirmações.
      </UaiDocCard>
      <UaiDocCard icon="⬜" title="Outline & Ghost">
        <code>outline</code> carrega contorno de 1px em <code>--uai-border-control</code> sobre{' '}
        <code>--uai-bg-primary</code>; <code>ghost</code> descarta superfície e contorno, restando o
        rótulo. Ambos são ações de apoio.
      </UaiDocCard>
      <UaiDocCard icon="🟥" title="Destructive">
        Superfície <code>--uai-status-error</code> para ações irreversíveis — apagar conversa,
        revogar acesso. Sempre acompanhada de confirmação.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações Técnicas"
      description="Medidas de cada tamanho e decisões de identidade do módulo."
    />
    <UaiDocSpecs
      component="Button"
      layout="Botão · 30 a 48px de altura"
      specs={[
        { label: 'SM', value: 'pad 6/12 · raio 8 · 12/18 · alt. 30' },
        { label: 'MD', value: 'pad 8/16 · raio 8 · 14/20 · alt. 36' },
        { label: 'LG', value: 'pad 12/24 · raio 12 · 16/24 · alt. 48' },
        { label: 'Peso do rótulo', value: '600 (Open Sans semibold)' },
        { label: 'Contorno outline', value: '1px · --uai-border-control' },
        { label: 'Ícone recomendado', value: '16 (sm) · 20 (md) · 24 (lg)' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Cor de ação em roxo',
          detail:
            'primary usa --uai-interactive-primary (brandpurple-600 no claro, brandpurple-400 no escuro) e o rótulo em --uai-text-inverse; os pares medem acima de 4,5:1 nos dois temas.',
        },
        {
          subject: 'Alturas de linha da escala Unooria',
          detail:
            'o rótulo usa os degraus Label/SM, MD e LG (18, 20 e 24px), no lugar de alturas literais. As alturas resultantes passaram a 30, 36 e 48px, e a do tamanho lg coincide com o botão da Plataforma Unooria.',
        },
        {
          subject: 'Contorno de outline em border-control',
          detail:
            'o contorno usa --uai-border-control, que passa de 3:1 sobre a superfície nos dois temas; o divisor decorativo (--uai-border-default) não bastaria para delimitar um controle.',
        },
        {
          subject: 'Ícones pela biblioteca da Unooria',
          detail:
            'os slots leadingIcon e trailingIcon recebem o componente Icon (Material Symbols Rounded), que substituiu os caracteres tipográficos usados antes. A prop segue aceitando qualquer ReactNode.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'hover usa o degrau seguinte da cor de ação ou a escada translúcida --uai-fill-4; o foco é um anel de 2px em --uai-border-brand; o desabilitado aplica 40% de opacidade.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do Componente"
      description="Três zonas de customização em um contêiner de altura derivada."
    />
    <UaiDocAnatomy
      zones={[
        {
          name: 'Rótulo',
          role: 'children. Open Sans semibold no corpo do tamanho escolhido, sem quebra de linha (white-space: nowrap).',
          token: '--uai-font-label-sm|md|lg-*',
        },
        {
          name: 'leadingIcon',
          role: 'Ícone antes do rótulo, marcado aria-hidden. Use o componente Icon.',
          token: '--uai-spacing-3 (intervalo de 6px)',
        },
        {
          name: 'trailingIcon',
          role: 'Ícone após o rótulo — típico de setas de avanço em fluxos de vários passos.',
        },
        {
          name: 'block',
          role: 'Faz o botão ocupar 100% da largura do contêiner, mantendo padding e raio.',
        },
      ]}
    />
    <UaiDocStage label="Zonas em um mesmo botão">
      <Button
        leadingIcon={iconeDoBotao('sparkle', 'lg')}
        trailingIcon={iconeDoBotao('arrowForward', 'lg')}
        size="lg"
      >
        Continuar
      </Button>
      <div style={{ width: 260 }}>
        <Button block>Ocupa a largura toda</Button>
      </div>
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de Variantes, Tamanhos e Estados"
      description="As 15 combinações, renderizadas pelo componente real."
    />
    {VARIANTES.map((variant) => (
      <UaiDocStage key={variant} label={`variant="${variant}"`} align="flex-start">
        {TAMANHOS.map((size) => (
          <Button key={size} variant={variant} size={size}>
            Botão
          </Button>
        ))}
      </UaiDocStage>
    ))}
    <UaiDocStage label="Estados — repouso, foco por teclado, desabilitado">
      <Button>Repouso</Button>
      <Button autoFocus>Foco</Button>
      <Button disabled>Desabilitado</Button>
      <Button variant="outline" disabled>
        Outline desabilitado
      </Button>
    </UaiDocStage>
    <UaiDocStage label="Com ícone em cada tamanho">
      {TAMANHOS.map((size) => (
        <Button key={size} size={size} leadingIcon={iconeDoBotao('add', size)}>
          Nova conversa
        </Button>
      ))}
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Boas Práticas"
      description="Regras de hierarquia de ação."
    />
    <UaiDocPractices
      dos={[
        'Manter uma única ação primary por tela ou por diálogo.',
        'Usar ghost para ações de apoio dentro de listas e cabeçalhos, onde o contorno competiria com o conteúdo.',
        'Reservar destructive para ações irreversíveis, sempre com confirmação em Modal.',
        'Passar as="a" quando o botão navegar, preservando o comportamento nativo do link.',
        'Dimensionar o Icon pela altura de linha do rótulo: 16, 20 ou 24px.',
      ]}
      donts={[
        'Empilhar dois primary lado a lado — a hierarquia se perde.',
        'Reduzir o padding para encaixar o botão em um espaço apertado; troque de tamanho.',
        'Usar destructive como destaque estético em ação inofensiva.',
        'Colocar rótulo com mais de três palavras: o botão não quebra linha.',
        'Colar um emoji ou caractere tipográfico no slot de ícone no lugar do Icon.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a Temas"
      description="Alternador em tempo real — secondary e outline são os que mais mudam entre os modos."
    />
    <UaiDocThemeSwitcher>
      {() => (
        <>
          {VARIANTES.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Button."
    />
    <UaiDocPropsTable
      title="Button"
      rows={[
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
          default: "'primary'",
          description: 'Variante visual do botão.',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: 'Tamanho do botão (30, 36 ou 48px de altura).',
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
          description: 'Ícone renderizado antes do rótulo, marcado como aria-hidden.',
        },
        {
          name: 'trailingIcon',
          type: 'React.ReactNode',
          description: 'Ícone renderizado após o rótulo, marcado como aria-hidden.',
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
  title: 'UnooriaAI/Componentes/Button',
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
    leadingIcon: {
      control: 'select',
      options: ['', ...uaiIconNames],
      description: 'Nome do ícone antes do rótulo (vazio = sem ícone).',
    },
    trailingIcon: {
      control: 'select',
      options: ['', ...uaiIconNames],
      description: 'Nome do ícone após o rótulo (vazio = sem ícone).',
    },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    as: { control: 'text', description: 'Elemento raiz renderizado.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
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
    as: 'button',
    className: '',
    children: 'Botão',
  },
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
 * Playground com todas as propriedades do Button expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Button',
  render: (args) => {
    const tamanho = args.size ?? 'md';
    const { leadingIcon, trailingIcon, ...resto } = args;
    return (
      <div
        data-uai-theme={args.theme}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
          borderRadius: 12,
          backgroundColor: 'var(--uai-bg-primary)',
          border: '1px solid var(--uai-border-default)',
        }}
      >
        <Button
          {...resto}
          leadingIcon={
            leadingIcon ? iconeDoBotao(leadingIcon as UaiIconName, tamanho) : undefined
          }
          trailingIcon={
            trailingIcon ? iconeDoBotao(trailingIcon as UaiIconName, tamanho) : undefined
          }
        />
      </div>
    );
  },
};

/**
 * As 15 combinações de variante e tamanho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UaiDocStage align="flex-start" gap={16}>
      {VARIANTES.flatMap((variant) =>
        TAMANHOS.map((size) => (
          <Button key={`${variant}-${size}`} variant={variant} size={size}>
            Botão
          </Button>
        ))
      )}
    </UaiDocStage>
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
          <span style={{ width: 110, fontSize: 12, color: 'var(--uai-text-secondary)' }}>{variant}</span>
          {TAMANHOS.map((size) => (
            <Button key={size} variant={variant} size={size}>
              Botão
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
      <Button leadingIcon={iconeDoBotao('sparkle', 'md')}>Com ícone à esquerda</Button>
      <Button trailingIcon={iconeDoBotao('arrowForward', 'md')}>Com ícone à direita</Button>
      <Button block>Largura total</Button>
      <Button as="a" href="#modal" variant="outline">
        Renderizado como âncora
      </Button>
    </div>
  ),
};
