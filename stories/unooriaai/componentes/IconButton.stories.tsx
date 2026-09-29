import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IconButton } from '../../../src/unooriaai/components/IconButton';
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
const VARIANTES = ['default', 'filled', 'primary'] as const;
const TAMANHOS = ['sm', 'md', 'lg'] as const;

/** Aresta do ícone dentro do alvo de cada tamanho. */
const ICONE_PX: Record<(typeof TAMANHOS)[number], number> = { sm: 16, md: 20, lg: 24 };

const iconeDoBotao = (nome: UaiIconName, tamanho: (typeof TAMANHOS)[number]) => (
  <Icon name={nome} size={ICONE_PX[tamanho]} />
);

const iconeDaVariante = (variant: (typeof VARIANTES)[number]): UaiIconName =>
  variant === 'primary' ? 'arrowForward' : 'close';

/**
 * Página de documentação rica do componente IconButton.
 */
const IconButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Ações"
      title="IconButton"
      description="Botão sem rótulo visível: 3 variantes (default, filled, primary) × 3 tamanhos (sm 28, md 36, lg 44), com o Icon da biblioteca da Plataforma Unooria dimensionado em 16, 20 e 24px. Como não há texto, aria-label é obrigatório na API."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão Geral & Casos de Uso"
      description="Três pesos visuais para o mesmo alvo de toque quadrado."
    />
    <UaiDocGrid>
      <UaiDocCard icon="👻" title="Default">
        Sem superfície em repouso — o ícone flutua sobre o conteúdo. É o fechar do cabeçalho e as
        ações discretas de barra.
      </UaiDocCard>
      <UaiDocCard icon="🩶" title="Filled">
        Superfície translúcida (<code>--uai-fill-4</code>), suficiente para delimitar o alvo sem
        competir com o conteúdo.
      </UaiDocCard>
      <UaiDocCard icon="🟣" title="Primary">
        Superfície <code>--uai-interactive-primary</code> com ícone invertido. Reservado à ação de
        avanço de um fluxo.
      </UaiDocCard>
      <UaiDocCard icon="♿" title="Rótulo obrigatório">
        A prop <code>aria-label</code> é exigida pelo tipo: sem texto visível, é a única fonte de
        significado para leitores de tela.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações Técnicas"
      description="Medidas de cada tamanho e decisões de identidade do módulo."
    />
    <UaiDocSpecs
      component="IconButton"
      layout="Alvo quadrado · 28 a 44px"
      specs={[
        { label: 'SM', value: '28px · raio 6 · ícone 16' },
        { label: 'MD', value: '36px · raio 8 · ícone 20' },
        { label: 'LG', value: '44px · raio 12 · ícone 24' },
        { label: 'Default', value: 'transparente · --uai-text-primary' },
        { label: 'Filled', value: '--uai-fill-4 · hover --uai-fill-10' },
        { label: 'Primary', value: '--uai-interactive-primary' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Alvo quadrado',
          detail:
            'o componente sempre renderiza um quadrado de 28, 36 ou 44px com raio igual nos quatro cantos; a largura nunca acompanha o glifo.',
        },
        {
          subject: 'Ícones em 16, 20 e 24px',
          detail:
            'o glifo Material ocupa cerca de 83% da caixa do Icon, então a aresta da caixa foi levada aos degraus de --uai-size-icon-* (sm, md, lg). As medidas do alvo não mudaram.',
        },
        {
          subject: 'Medidas próprias do módulo',
          detail:
            'as alturas 28/36/44 e o raio de 6px do tamanho sm não têm degrau nas escalas de espaçamento e de raio, e não seguem a régua --uai-size-button-* do Button; ficam literais e anotadas no CSS.',
        },
        {
          subject: 'Primary com par de contraste medido',
          detail:
            'o ícone usa --uai-text-inverse sobre --uai-interactive-primary (branco sobre roxo no claro, roxo profundo sobre lilás no escuro), acima de 4,5:1 nos dois temas.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'hover troca de degrau na escada translúcida ou em --uai-interactive-hover; foco com anel de 2px em --uai-border-brand; desabilitado a 40% de opacidade.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do Componente"
      description="Um alvo quadrado e um único slot de conteúdo."
    />
    <UaiDocAnatomy
      zones={[
        {
          name: 'Alvo de toque',
          role: 'Quadrado de 28, 36 ou 44px com raio próprio de cada tamanho. Nunca encolhe (flex-shrink: 0).',
        },
        {
          name: 'Ícone',
          role: 'children, envolvido em um span aria-hidden e centralizado nos dois eixos. Use o Icon com 16, 20 ou 24px.',
          token: '--uai-size-icon-sm|md|lg',
        },
        {
          name: 'Foco',
          role: 'Anel de 2px com deslocamento de 2px, visível apenas na navegação por teclado.',
          token: '--uai-border-brand',
        },
        {
          name: 'Desabilitado',
          role: '40% de opacidade e cursor not-allowed, sem alterar as medidas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de Variantes, Tamanhos e Estados"
      description="As 9 combinações, renderizadas pelo componente real."
    />
    {VARIANTES.map((variant) => (
      <UaiDocStage key={variant} label={`variant="${variant}"`} align="flex-start">
        {TAMANHOS.map((size) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <IconButton variant={variant} size={size} aria-label={`${variant} ${size}`}>
              {iconeDoBotao(iconeDaVariante(variant), size)}
            </IconButton>
            <div style={{ fontSize: 11, color: 'var(--uai-text-secondary)', marginTop: 8 }}>{size}</div>
          </div>
        ))}
      </UaiDocStage>
    ))}
    <UaiDocStage label="Estados e ícones do catálogo">
      <IconButton variant="filled" aria-label="Fechar">
        {iconeDoBotao('close', 'md')}
      </IconButton>
      <IconButton variant="filled" aria-label="Enviar">
        {iconeDoBotao('arrowUpward', 'md')}
      </IconButton>
      <IconButton variant="filled" aria-label="Buscar">
        {iconeDoBotao('search', 'md')}
      </IconButton>
      <IconButton variant="filled" aria-label="Nova conversa">
        {iconeDoBotao('add', 'md')}
      </IconButton>
      <IconButton variant="primary" disabled aria-label="Avançar (desabilitado)">
        {iconeDoBotao('arrowForward', 'md')}
      </IconButton>
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Boas Práticas"
      description="Regras de uso do botão sem rótulo."
    />
    <UaiDocPractices
      dos={[
        'Sempre preencher aria-label com o verbo da ação, não com o nome do símbolo.',
        'Usar filled quando o botão fica sobre imagem ou lista densa, onde default perde o alvo.',
        'Manter o tamanho lg em superfícies de toque e reservar sm a barras compactas.',
        'Passar o Icon da biblioteca, no tamanho indicado para cada alvo.',
      ]}
      donts={[
        'Renderizar texto dentro do IconButton — para rótulo visível use Button.',
        'Reduzir o alvo abaixo de 28px, o menor tamanho disponível.',
        'Usar primary em mais de uma ação por barra.',
        'Confiar no ícone como única indicação de estado (ligado/desligado); para isso use Toggle.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a Temas"
      description="Default e filled seguem a escada translúcida, que troca de tinta entre os temas."
    />
    <UaiDocThemeSwitcher>
      {() => (
        <>
          {VARIANTES.map((variant) => (
            <IconButton key={variant} variant={variant} aria-label={variant}>
              {iconeDoBotao(iconeDaVariante(variant), 'md')}
            </IconButton>
          ))}
        </>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente IconButton."
    />
    <UaiDocPropsTable
      title="IconButton"
      rows={[
        {
          name: 'variant',
          type: "'default' | 'filled' | 'primary'",
          default: "'default'",
          description: 'Variante visual do botão.',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: 'Alvo de toque de 28, 36 ou 44px, com o ícone proporcional.',
        },
        {
          name: 'aria-label',
          type: 'string',
          description: 'Rótulo acessível obrigatório — o botão não tem texto visível.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Ícone centralizado, marcado como aria-hidden.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Desabilita a interação e aplica 40% de opacidade.',
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

const meta: Meta<typeof IconButton> = {
  title: 'UnooriaAI/Componentes/IconButton',
  component: IconButton,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: VARIANTES, description: 'Variante visual.' },
    size: { control: 'radio', options: TAMANHOS, description: 'Tamanho do alvo de toque.' },
    disabled: { control: 'boolean', description: 'Desabilita a interação.' },
    'aria-label': { control: 'text', description: 'Rótulo acessível obrigatório.' },
    children: {
      control: 'select',
      options: uaiIconNames,
      description: 'Nome do ícone renderizado no centro.',
    },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    'aria-label': 'Fechar',
    children: 'close',
    theme: 'light',
    className: '',
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <IconButtonDocumentationPage />,
};

/**
 * Playground com todas as propriedades do IconButton expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do IconButton',
  render: ({ children, ...args }) => (
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
      <IconButton {...args}>{iconeDoBotao(children as UaiIconName, args.size ?? 'md')}</IconButton>
    </div>
  ),
};

/**
 * As 9 combinações de variante e tamanho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UaiDocStage align="flex-start" gap={12}>
      {VARIANTES.flatMap((variant) =>
        TAMANHOS.map((size) => (
          <IconButton
            key={`${variant}-${size}`}
            variant={variant}
            size={size}
            aria-label={`${variant} ${size}`}
          >
            {iconeDoBotao(iconeDaVariante(variant), size)}
          </IconButton>
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
          <span style={{ width: 90, fontSize: 12, color: 'var(--uai-text-secondary)' }}>{variant}</span>
          {TAMANHOS.map((size) => (
            <IconButton key={size} variant={variant} size={size} aria-label={`${variant} ${size}`}>
              {iconeDoBotao(iconeDaVariante(variant), size)}
            </IconButton>
          ))}
        </div>
      ))}
    </div>
  ),
};

/**
 * Todos os ícones do catálogo aplicados ao mesmo botão.
 */
export const Icones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {uaiIconNames.map((name) => (
        <IconButton key={name} variant="filled" aria-label={name}>
          {iconeDoBotao(name, 'md')}
        </IconButton>
      ))}
    </div>
  ),
};
