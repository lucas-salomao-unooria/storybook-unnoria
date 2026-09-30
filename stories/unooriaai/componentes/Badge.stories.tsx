import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '../../../src/unooriaai/components/Badge';
import { AssistantCard, SettingsRow } from '../../../src/unooriaai/components';
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
const VARIANTES = ['default', 'primary', 'success', 'error', 'warning'] as const;

const SEMANTICA: Record<(typeof VARIANTES)[number], string> = {
  default: 'Rótulo neutro — categoria, contagem, tipo de arquivo',
  primary: 'Recurso da marca — "Beta", "Novo", "Pro"',
  success: 'Operação concluída — "Sincronizado", "Ativo"',
  error: 'Falha ou bloqueio — "Expirado", "Limite atingido"',
  warning: 'Atenção sem bloqueio — "Prévia", "Descontinuado"',
};

/**
 * Página de documentação rica do componente Badge.
 */
const BadgeDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Indicadores"
      title="Badge"
      description="Selo compacto de 22px com padding 2/8, raio 4 e rótulo medium de 12px, nas cinco variantes semânticas (default, primary, success, error, warning). Cada variante usa a cor semântica sobre o próprio preenchimento translúcido de 10%; a exceção é default, que usa a escada neutra. Marca estado ou novidade — “Beta”, “Novo” — sem disputar a atenção com o conteúdo."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão Geral & Casos de Uso"
      description="Cinco severidades, um único formato."
    />
    <UaiDocGrid>
      <UaiDocCard icon="⚪" title="Default">
        Superfície <code>--uai-fill-4</code> e texto <code>--uai-text-primary</code>. É o rótulo
        sem carga semântica.
      </UaiDocCard>
      <UaiDocCard icon="🟣" title="Primary">
        Preenchimento <code>--uai-fill-brand</code> com texto <code>--uai-text-brand</code>. Marca
        recursos da própria plataforma — “Beta”, “Novo” — em catálogos de assistentes e nas
        configurações.
      </UaiDocCard>
      <UaiDocCard icon="🟩🟥" title="Success & Error">
        <code>--uai-status-success</code> e <code>--uai-status-error</code> sobre o preenchimento a
        10%. Estado terminal de uma operação — nunca ação clicável.
      </UaiDocCard>
      <UaiDocCard icon="🟧" title="Warning">
        <code>--uai-status-warning</code> sobre o preenchimento a 10%. Chama atenção sem bloquear:
        recursos em prévia e avisos de descontinuação.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações Técnicas"
      description="Medidas e decisões de identidade do módulo."
    />
    <UaiDocSpecs
      component="Badge"
      layout="Selo · 22px de altura"
      specs={[
        { label: 'Padding', value: '2/8 · --uai-spacing-1 e -4' },
        { label: 'Raio', value: '4px · --uai-radius-sm' },
        { label: 'Altura', value: '22px (derivada)' },
        { label: 'Tipografia', value: 'Open Sans medium · 12/18' },
        { label: 'Superfície', value: '--uai-fill-* a 10%' },
        { label: 'Default', value: '--uai-fill-4 · --uai-text-primary' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Cor semântica com texto legível',
          detail:
            'no tema claro o texto usa os degraus 700–800 das escalas success, danger e warning; no escuro, os degraus 400. Sobre a superfície primária e a secundária, todos os pares texto/preenchimento medem 4,9:1 ou mais nos dois temas (a superfície primária chega a 12,9:1 no selo default).',
        },
        {
          subject: 'Camada de uso: primária e secundária',
          detail:
            'O selo é medido sobre --uai-bg-primary e --uai-bg-secondary, onde todos os pares passam de 4,5:1 nos dois temas. Sobre --uai-bg-tertiary, error, success e warning também passam (o error mede 4,6:1 no claro e 5,8:1 no escuro); o info não (4,4:1 no claro e 4,2:1 no escuro), então essa combinação fica fora de uso.',
        },
        {
          subject: 'Corpo de 12px e altura de 22px',
          detail:
            'o rótulo usa o degrau Caption da Unooria (12/18) com peso medium (500), sem estilo próprio na escala. A altura passou de 17 para 22px por consequência da altura de linha de 18px; nenhum corpo fica abaixo de 12px.',
        },
        {
          subject: 'Sem interação',
          detail:
            'o Badge é um indicador. Para ação clicável use Tag, que expõe estado de seleção e foco.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do Componente"
      description="Uma cápsula de altura derivada, sem slot de ícone."
    />
    <UaiDocAnatomy
      zones={[
        {
          name: 'Cápsula',
          role: 'inline-flex com padding 2/8 e raio 4. A altura de 22px resulta do padding mais a altura de linha de 18px.',
          token: '--uai-radius-sm',
        },
        {
          name: 'Rótulo',
          role: 'children, sem quebra de linha. Textos curtos — uma ou duas palavras.',
          token: '--uai-font-caption-*',
        },
        {
          name: 'Par de cores',
          role: 'Superfície e texto derivam do mesmo token semântico, garantindo contraste consistente entre as cinco variantes.',
          token: '--uai-fill-* · --uai-status-*',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de Variantes e Aplicações"
      description="As cinco variantes e o selo em contexto real."
    />
    <UaiDocStage label="variant: default · primary · success · error · warning">
      {VARIANTES.map((variant) => (
        <Badge key={variant} variant={variant}>
          Selo
        </Badge>
      ))}
    </UaiDocStage>
    <UaiDocStage label="Rótulos reais">
      <Badge variant="primary">Beta</Badge>
      <Badge variant="primary">Novo</Badge>
      <Badge variant="success">Sincronizado</Badge>
      <Badge variant="error">Expirado</Badge>
      <Badge variant="warning">Prévia</Badge>
      <Badge>PDF</Badge>
    </UaiDocStage>
    <UaiDocStage
      label="Em contexto — catálogo de assistentes e linha de configuração"
      direction="column"
      align="flex-start"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <AssistantCard
          name="Analista de dados"
          description="Lê planilhas e explica os achados"
          initial="A"
        />
        <Badge variant="primary">Beta</Badge>
      </div>
      <div style={{ width: 400 }}>
        <SettingsRow label="Plano" value={<Badge variant="primary">Pro</Badge>} block />
        <SettingsRow label="Sessão" value={<Badge variant="success">Ativa</Badge>} block />
      </div>
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Boas Práticas"
      description="Regras de sinalização."
    />
    <UaiDocPractices
      dos={[
        'Manter o rótulo em uma ou duas palavras — a cápsula não quebra linha.',
        'Escolher a variante pela semântica do estado, não pela cor desejada.',
        'Usar default quando o rótulo é apenas classificatório, sem urgência.',
        'Exibir no máximo um Badge por linha de lista.',
        'Posicionar o selo sobre --uai-bg-primary ou --uai-bg-secondary, onde todos os pares passam de 4,5:1 nos dois temas.',
      ]}
      donts={[
        'Colocar o selo info sobre --uai-bg-tertiary: o par mede 4,4:1 no claro e 4,2:1 no escuro.',
        'Tornar o Badge clicável — para isso existe o Tag.',
        'Usar error como destaque estético em conteúdo saudável.',
        'Aplicar o Badge a texto longo, o que estoura a linha do contêiner.',
        'Repetir a mesma informação no rótulo do item e no selo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a Temas"
      description="Superfície e texto trocam de degrau entre os temas, mantendo o contraste."
    />
    <UaiDocThemeSwitcher>
      {() => (
        <>
          {VARIANTES.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Badge."
    />
    <UaiDocPropsTable
      title="Badge"
      rows={[
        {
          name: 'variant',
          type: "'default' | 'primary' | 'success' | 'error' | 'warning'",
          default: "'default'",
          description: 'Variante semântica do selo.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo do selo.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Badge> = {
  title: 'UnooriaAI/Componentes/Badge',
  component: Badge,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: VARIANTES, description: 'Variante semântica.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Rótulo do selo.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: { variant: 'primary', theme: 'light', children: 'Beta', className: '' },
};

export default meta;

type Story = StoryObj<typeof Badge>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BadgeDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Badge expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Badge',
  render: (args) => (
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
      <Badge {...args} />
    </div>
  ),
};

/**
 * As cinco variantes semânticas.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UaiDocStage gap={12}>
      {VARIANTES.map((variant) => (
        <Badge key={variant} variant={variant}>
          Selo
        </Badge>
      ))}
    </UaiDocStage>
  ),
};

/**
 * Matriz das cinco severidades com a semântica de cada uma.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 14 }}>
      {VARIANTES.map((variant) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 90 }}>
            <Badge variant={variant}>{variant}</Badge>
          </span>
          <span style={{ fontSize: 13, color: 'var(--uai-text-secondary)' }}>{SEMANTICA[variant]}</span>
        </div>
      ))}
    </div>
  ),
};
