import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Badge } from '../../../src/unooblog/components/Badge';
import type { UblBadgeTone } from '../../../src/unooblog/components/Badge';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocStage,
  UblDocPractices,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';

const BAR = '#716C98';

const TONES: { tone: UblBadgeTone; label: string }[] = [
  { tone: 'neutral', label: 'Rascunho' },
  { tone: 'accent', label: 'Novo' },
  { tone: 'success', label: 'Publicado' },
  { tone: 'warning', label: 'Em revisão' },
  { tone: 'info', label: 'Série' },
];

/**
 * Linha de metadados de um post, com selos de estado ao lado do título.
 */
const LinhaDoPost: React.FC = () => (
  <div style={{ display: 'grid', gap: 'var(--ubl-spacing-xs)', fontFamily: 'var(--ubl-font-sans)', maxWidth: 420 }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ubl-spacing-xs)' }}>
      <Badge tone="accent" size="sm">
        Novo
      </Badge>
      <Badge tone="info" size="sm" icon="series">
        Parte 2 de 4
      </Badge>
      <Badge size="sm" icon="comments">
        12 respostas
      </Badge>
    </div>
    <p
      style={{
        margin: 0,
        color: 'var(--ubl-color-text-primary)',
        fontSize: 'var(--ubl-font-heading-4-size)',
        fontWeight: 'var(--ubl-font-heading-4-weight)',
        lineHeight: 'var(--ubl-font-heading-4-line)',
      }}
    >
      Contraste de cor sem decorar tabelas
    </p>
  </div>
);

/**
 * Página de documentação rica do componente Badge.
 */
const BadgeDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Fundação"
      title="Badge"
      description="Selo em cápsula para estado e contagem — “Novo”, “Rascunho”, “3 respostas” —, em cinco tons e dois tamanhos. Os tons de status trazem um glifo próprio: o estado nunca vive só na cor."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Um selo diz em uma palavra o que o item é."
    />
    <UblDocGrid>
      <UblDocCard icon="🆕" title="Destaque">
        <code>accent</code> pinta o selo de roxo de ação: posts novos, itens em destaque. Use com
        parcimônia: tudo em destaque é nada em destaque.
      </UblDocCard>
      <UblDocCard icon="🔢" title="Contagem e metadado">
        <code>neutral</code> acompanha contagens (“12 respostas”) e estados sem urgência
        (“Rascunho”), com um glifo opcional.
      </UblDocCard>
      <UblDocCard icon="🚦" title="Status">
        <code>success</code>, <code>warning</code> e <code>info</code> usam o fundo translúcido, o
        contorno e o glifo de status do tema — e o texto continua em tom primário.
      </UblDocCard>
      <UblDocCard icon="♿" title="Nunca só a cor">
        Cada tom de status tem um glifo padrão (confirmação, atenção, informação); o texto do selo
        diz o resto.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="Badge"
      layout="Cápsula · 20px (sm) ou 28px (md)"
      specs={[
        { label: 'Alturas', value: 'sm 20px · md 28px (medidas locais --ubl-badge-height-*)' },
        { label: 'Forma', value: '--ubl-radius-full (cápsula)' },
        { label: 'Recuo lateral', value: 'sm 8px · md 12px' },
        { label: 'Texto', value: 'sm caption-strong 12/18 · md label 14/20' },
        { label: 'Glifo', value: 'Icon xs (16px), herdando a cor do tom' },
        { label: 'neutral', value: 'fill-field · text-secondary' },
        { label: 'accent', value: 'action-primary · text-on-action' },
        { label: 'success · warning · info', value: 'fill-* · contorno e glifo em status-* · texto em text-primary' },
        { label: 'Servidor', value: 'Server Component: só recebe props' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Texto em tom primário nos status',
          detail:
            'as cores de status (status-success, -warning, -info) servem de contorno e de glifo, e o texto do selo é text-primary. Medido sobre a página e sobre o cartão, nos dois temas: o texto passa de 12,4:1 e o contorno e o glifo, de 4,1:1 (o mínimo gráfico é 3:1). Pintar o texto com a cor de status reprovaria no claro sobre o cartão (status-success mede 4,1:1, abaixo dos 4,5:1 de texto). A cor informa, o texto confirma.',
        },
        {
          subject: 'Glifo padrão por tom de status',
          detail:
            'success → checkCircle, warning → warning, info → info. O consumidor pode trocar por icon; neutral e accent não têm glifo, a não ser que o consumidor passe um.',
        },
        {
          subject: 'Contorno só nos status',
          detail:
            'o neutral e o accent são preenchimentos cheios; os de status são translúcidos, e sem contorno o limite do selo desapareceria sobre cartões da mesma matiz. O contorno de 1px em status-* devolve o limite sem um token novo.',
        },
        {
          subject: 'Dois tamanhos, sem “lg”',
          detail:
            'sm (20px) cabe em linhas de metadado; md (28px) acompanha os rótulos de botão e de chip. Maior que isso o selo viraria botão.',
        },
        {
          subject: 'Não é interativo',
          detail:
            'o Badge é um <span>: não recebe foco nem clique. Quem precisa filtrar por tópico usa o TopicChip.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocAnatomy
      zones={[
        { name: 'Cápsula (span)', role: 'Caixa em linha com fundo do tom.', token: '--ubl-radius-full' },
        { name: 'Glifo', role: 'Ícone de 16px: padrão nos status, opcional nos demais.', token: '--ubl-icon-size-xs' },
        { name: 'Texto', role: 'Rótulo curto; trunca com reticências.', token: '--ubl-font-label-* · --ubl-font-caption-strong-*' },
        { name: 'Contorno', role: 'Fio de 1px nos tons de status.', token: '--ubl-color-status-*' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real: cinco tons por dois tamanhos, com e sem glifo."
    />
    <UblDocStage label="Tons, tamanho md" gap={12} surface="card" padding={24}>
      {TONES.map(({ tone, label }) => (
        <Badge key={tone} tone={tone}>
          {label}
        </Badge>
      ))}
    </UblDocStage>
    <UblDocStage label="Tons, tamanho sm" gap={12} surface="card" padding={24}>
      {TONES.map(({ tone, label }) => (
        <Badge key={tone} tone={tone} size="sm">
          {label}
        </Badge>
      ))}
    </UblDocStage>
    <UblDocStage label="Com glifo escolhido" gap={12} surface="card" padding={24}>
      <Badge icon="schedule">8 min de leitura</Badge>
      <Badge tone="accent" icon="tip">
        Dica do editor
      </Badge>
      <Badge tone="success" icon="check" size="sm">
        Lido
      </Badge>
    </UblDocStage>
    <UblDocStage label="Na linha de metadados de um post" surface="card" padding={24}>
      <LinhaDoPost />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Escrever o selo em uma ou duas palavras.',
        'Escolher o tom pelo significado: warning para atenção, info para contexto, success para conclusão.',
        'Usar neutral para metadados que não pedem atenção.',
        'Deixar o glifo padrão dos tons de status: ele é o que não depende de cor.',
      ]}
      donts={[
        'Usar o Badge como botão: ele não recebe foco nem clique (use TopicChip ou Button).',
        'Pôr várias frases num selo: ele trunca e perde o sentido.',
        'Usar accent em tudo: perde o destaque.',
        'Comunicar um estado só pela cor, trocando o texto por um selo sem palavra.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Os fundos, os contornos e os glifos de status acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher surface="card">
      {() => (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {TONES.map(({ tone, label }) => (
            <Badge key={tone} tone={tone}>
              {label}
            </Badge>
          ))}
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="Badge"
      rows={[
        { name: 'tone', type: "'neutral' | 'accent' | 'success' | 'warning' | 'info'", default: "'neutral'", description: 'Tom semântico.' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Altura de 20 ou 28px.' },
        { name: 'icon', type: 'UblIconName', description: 'Glifo antes do texto; os tons de status trazem um padrão.' },
        { name: 'children', type: 'React.ReactNode', description: 'Texto do selo (obrigatório).' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLSpanElement>', description: 'Demais atributos (className, style, data-*, aria-*).' },
      ]}
    />
    <UblDocPropsTable
      title="Tipos públicos"
      rows={[
        { name: 'UblBadgeTone', type: "'neutral' | 'accent' | 'success' | 'warning' | 'info'", description: 'Os cinco tons.' },
        { name: 'UblBadgeSize', type: "'sm' | 'md'", description: 'Os dois tamanhos.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Badge> = {
  title: 'Unooblog/Componentes/Badge',
  component: Badge,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Texto do selo.' },
    tone: {
      control: 'select',
      options: ['neutral', 'accent', 'success', 'warning', 'info'],
      description: 'Tom semântico.',
    },
    size: { control: 'radio', options: ['sm', 'md'], description: 'Tamanho.' },
    icon: {
      control: 'select',
      options: [undefined, 'schedule', 'comments', 'series', 'tip', 'check', 'warning', 'info'],
      description: 'Glifo antes do texto (os tons de status trazem um padrão).',
    },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    children: 'Novo',
    tone: 'accent',
    size: 'md',
  },
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
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Badge',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} surface="card" padding={40}>
      <Badge {...args} />
    </UblDocStage>
  ),
};

/**
 * Selos na linha de metadados de um post.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: metadados do post',
  render: () => (
    <UblDocStage surface="card" padding={32}>
      <LinhaDoPost />
    </UblDocStage>
  ),
};

/**
 * Os cinco tons.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UblDocStage surface="card" gap={12} padding={32}>
      {TONES.map(({ tone, label }) => (
        <Badge key={tone} tone={tone}>
          {label}
        </Badge>
      ))}
    </UblDocStage>
  ),
};

/**
 * Os dois tamanhos, nos cinco tons.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['sm', 'md'] as const).map((size) => (
        <UblDocStage key={size} label={size === 'sm' ? 'sm · 20px' : 'md · 28px'} surface="card" gap={12} padding={24}>
          {TONES.map(({ tone, label }) => (
            <Badge key={tone} tone={tone} size={size}>
              {label}
            </Badge>
          ))}
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Com o glifo padrão do tom, com um glifo escolhido e sem glifo.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UblDocStage label="Glifo padrão dos status" surface="card" gap={12} padding={24}>
        <Badge tone="success">Publicado</Badge>
        <Badge tone="warning">Em revisão</Badge>
        <Badge tone="info">Série</Badge>
      </UblDocStage>
      <UblDocStage label="Glifo escolhido" surface="card" gap={12} padding={24}>
        <Badge icon="schedule">8 min de leitura</Badge>
        <Badge tone="info" icon="series">
          Parte 2 de 4
        </Badge>
      </UblDocStage>
      <UblDocStage label="Sem glifo" surface="card" gap={12} padding={24}>
        <Badge>Rascunho</Badge>
        <Badge tone="accent">Novo</Badge>
      </UblDocStage>
      <UblDocStage label="Texto longo trunca" surface="card" padding={24}>
        <div style={{ width: 160 }}>
          <Badge tone="info">Um selo com um texto bem longo demais</Badge>
        </div>
      </UblDocStage>
    </div>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UblDocStage
          key={theme}
          label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={theme}
          surface="card"
          gap={12}
          padding={24}
        >
          {TONES.map(({ tone, label }) => (
            <Badge key={tone} tone={tone}>
              {label}
            </Badge>
          ))}
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: o estado não vive só na cor — cada tom de status tem um glifo —, o
 * selo não é focável e o texto longo é cortado.
 */
export const EstadoSemCor: Story = {
  name: 'Interação: estado além da cor',
  render: () => (
    <UblDocStage surface="card" gap={12} padding={32}>
      <Badge tone="success" data-testid="sucesso">
        Publicado
      </Badge>
      <Badge tone="warning" data-testid="atencao">
        Em revisão
      </Badge>
      <Badge tone="info" icon="series" data-testid="info">
        Série
      </Badge>
      <Badge tone="neutral" data-testid="neutro">
        Rascunho
      </Badge>
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Os tons de status trazem glifo; o glifo padrão vem do tom
    await expect(canvas.getByTestId('sucesso').querySelector('.ubl-icon')).toHaveTextContent('check_circle');
    await expect(canvas.getByTestId('atencao').querySelector('.ubl-icon')).toHaveTextContent('warning');
    // O consumidor pode trocar o glifo
    await expect(canvas.getByTestId('info').querySelector('.ubl-icon')).toHaveTextContent('menu_book');
    // O neutro não tem glifo
    await expect(canvas.getByTestId('neutro').querySelector('.ubl-icon')).toBeNull();

    // O texto é o conteúdo acessível, e o selo não é interativo
    await expect(canvas.getByTestId('atencao')).toHaveTextContent('Em revisão');
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
};
