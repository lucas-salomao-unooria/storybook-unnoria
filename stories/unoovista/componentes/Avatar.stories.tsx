import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar } from '../../../src/unoovista/components/Avatar';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import { unvAvatars } from '../fixtures';

const BAR = '#716C98';
const CAPTION: React.CSSProperties = { fontSize: 12, color: '#475157', marginTop: 10 };
const CAPTION_LIVE: React.CSSProperties = { ...CAPTION, marginTop: 16 };

/** Retratos de demonstração, na ordem do fixture. */
const portraits = Object.values(unvAvatars) as string[];
const portrait = (index: number) => portraits[index % portraits.length];

const SIZES = [
  { size: 'xs' as const, label: 'xs · 20px', usage: 'Prova social ("curtido por")' },
  { size: 'sm' as const, label: 'sm · 24px', usage: 'Aba de perfil da doca' },
  { size: 'md' as const, label: 'md · 32px', usage: 'Cabeçalho da publicação' },
  { size: 'lg' as const, label: 'lg · 56px', usage: 'Bandeja de histórias' },
  { size: 'xl' as const, label: 'xl · 80px', usage: 'Cabeçalho do perfil' },
];

/**
 * Página de documentação rica do componente Avatar.
 */
const AvatarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Identidade"
      title="Avatar"
      description="Retrato do usuário e principal portador de estado social do Unoovista. Sem anel, é um círculo. Com anel — história não vista, transmissão ao vivo ou já vista —, vira um squircle, e a mudança de forma é uma pista que não depende de cor. O anel é um gradiente de dois roxos e um azul, e a folga entre ele e a fotografia acompanha o fundo da tela."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Onde o avatar aparece e o que cada forma e cada anel comunicam."
    />
    <UnvDocGrid>
      <UnvDocCard icon="⚪" title="Círculo é retrato comum">
        Sem anel, o avatar é um círculo perfeito: autor de comentário, linha de lista, aba de perfil.
        Nada de novo a ver.
      </UnvDocCard>
      <UnvDocCard icon="🟪" title="Squircle é “tem novidade”">
        Com anel, os cantos passam a 32% do lado. Quem não distingue o gradiente do anel ainda percebe
        que aquele perfil tem uma história ou uma transmissão.
      </UnvDocCard>
      <UnvDocCard icon="🔴" title="Ao vivo prevalece">
        O gradiente <code>--unv-gradient-live</code> vai do vermelho ao roxo, combinado à etiqueta LIVE,
        e tem precedência sobre o anel de história.
      </UnvDocCard>
      <UnvDocCard icon="👁️" title="Visto e destaques">
        O anel <code>seen</code> é um traço neutro em <code>--unv-color-border-control</code>: história já
        vista e destaques fixos do perfil.
      </UnvDocCard>
      <UnvDocCard icon="⌨️" title="Semântica adaptativa">
        Sem <code>onClick</code> é um <code>span</code> decorativo; com <code>onClick</code> vira{' '}
        <code>button</code>, com foco visível de 2px e alvo de toque de 44px.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="Avatar"
      layout="Círculo ou squircle · 20 a 80px"
      specs={[
        { label: 'Diâmetros nomeados', value: '20 · 24 · 32 · 56 · 80 px' },
        { label: 'Traço do anel', value: '2px (--unv-avatar-ring-width)' },
        { label: 'Folga anel → retrato', value: '3px (--unv-avatar-ring-gap)' },
        { label: 'Caixa externa do lg', value: '56 + 2×3 + 2×2 = 66px' },
        { label: 'Forma sem anel', value: 'Círculo · --unv-radius-full' },
        { label: 'Forma com anel', value: 'Squircle · 32% do lado' },
        { label: 'Iniciais', value: 'Open Sans 600 · 36% do diâmetro, mín. 12px' },
        { label: 'Alvo de toque', value: '44px (área invisível)' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Squircle só com anel',
          detail:
            'a forma é o sinal principal de "tem história ou transmissão" e serve a quem não distingue cor. Os raios das três camadas são concêntricos: a camada externa soma a espessura da interna ao raio.',
        },
        {
          subject: 'Anel "visto" em border-control',
          detail:
            'o traço neutro usa --unv-color-border-control (4,96:1 no claro e 8,64:1 no escuro sobre a tela), o mesmo valor de --unv-color-highlight-ring, que o StoryBubble usa: os dois passam dos 3:1 de gráfico.',
        },
        {
          subject: 'Folga na cor do fundo',
          detail:
            'a folga usa --unv-color-ring-inner por padrão, igual à superfície de conteúdo. Sobre outra camada (a tela em background-secondary), o consumidor troca o valor de --unv-avatar-gap-color.',
        },
        {
          subject: 'Etiqueta LIVE em cápsula',
          detail:
            'gradiente --unv-gradient-livebadge, texto em --unv-color-text-on-media e contorno na cor da folga; corpo de 10px (o degrau nav-badge, o único abaixo de 12px do módulo).',
        },
        {
          subject: 'Iniciais nunca abaixo de 12px',
          detail:
            'em avatares pequenos a fórmula de 36% cairia abaixo do corpo mínimo do módulo; o CSS aplica max(12px, 36% do diâmetro).',
        },
        {
          subject: 'Diâmetros próprios do módulo',
          detail:
            'xs 20, sm 24, md 32, lg 56 e xl 80px são degraus de --unv-avatar-*; o tamanho numérico (prop size) aceita qualquer valor em pixels.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Três camadas concêntricas: anel, folga e retrato."
    />
    <UnvDocAnatomy
      zones={[
        {
          name: 'Anel',
          role: 'Traço de 2px em gradiente de história, de transmissão ou neutro. Só existe com ring diferente de none.',
          token: '--unv-gradient-story · --unv-gradient-live · --unv-color-border-control',
        },
        {
          name: 'Folga',
          role: 'Respiro de 3px entre o anel e o retrato, na cor do fundo.',
          token: '--unv-color-ring-inner · --unv-avatar-gap-color',
        },
        {
          name: 'Retrato',
          role: 'Imagem com object-fit: cover, ou iniciais sobre superfície terciária.',
          token: '--unv-color-background-tertiary · --unv-color-text-secondary',
        },
        {
          name: 'Selo',
          role: 'Glifo "+" centralizado (badge="add") ou etiqueta LIVE ancorada na base (badge="live").',
          token: '--unv-gradient-livebadge · --unv-color-text-on-media',
        },
      ]}
    />
    <UnvDocStage label="Camadas do avatar com anel de história">
      <div style={{ textAlign: 'center' }}>
        <Avatar src={portrait(0)} alt="" />
        <div style={CAPTION}>1. Retrato (56px, círculo)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={portrait(0)} alt="" ring="seen" />
        <div style={CAPTION}>2. + folga e traço (squircle)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={portrait(0)} alt="" ring="story" />
        <div style={CAPTION}>3. + gradiente (66px)</div>
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Combinações completas renderizadas pelo componente real de produção."
    />
    <UnvDocStage label="Anéis">
      {(['none', 'story', 'live', 'seen'] as const).map((ring) => (
        <div key={ring} style={{ textAlign: 'center' }}>
          <Avatar
            src={portrait(1)}
            alt=""
            ring={ring}
            badge={ring === 'live' ? 'live' : 'none'}
          />
          <div style={ring === 'live' ? CAPTION_LIVE : CAPTION}>{ring}</div>
        </div>
      ))}
    </UnvDocStage>
    <UnvDocStage label="Tamanhos nomeados (com anel de história)">
      {SIZES.map(({ size, label, usage }) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Avatar src={portrait(2)} alt="" size={size} ring="story" />
          <div style={CAPTION}>{label}</div>
          <div style={{ fontSize: 11, color: '#475157' }}>{usage}</div>
        </div>
      ))}
    </UnvDocStage>
    <UnvDocStage label="Selos, iniciais e interação">
      <div style={{ textAlign: 'center' }}>
        <Avatar ring="seen" badge="add" size={64} />
        <div style={CAPTION}>badge=&quot;add&quot;</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={portrait(1)} alt="" ring="live" badge="live" />
        <div style={CAPTION_LIVE}>badge=&quot;live&quot;</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar initials="LS" />
        <div style={CAPTION}>iniciais</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={portrait(3)} alt="Abrir história" ring="story" onClick={() => undefined} />
        <div style={CAPTION}>interativo (Tab para ver o foco)</div>
      </div>
    </UnvDocStage>
    <UnvDocStage label="Sobre a tela (background-secondary), com a folga na cor da camada" surface="secondary">
      <Avatar
        src={portrait(4)}
        alt=""
        ring="story"
        style={{ '--unv-avatar-gap-color': 'var(--unv-color-background-secondary)' } as React.CSSProperties}
      />
      <Avatar
        src={portrait(5)}
        alt=""
        ring="live"
        badge="live"
        style={{ '--unv-avatar-gap-color': 'var(--unv-color-background-secondary)' } as React.CSSProperties}
      />
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Usar ring="live" com badge="live": o anel sozinho não comunica transmissão.',
        'Aplicar ring="seen" a destaques do perfil, que nunca usam gradiente.',
        'Informar alt descritivo quando o avatar identificar uma pessoa específica.',
        'Passar onClick quando o avatar abrir uma história ou um perfil: ele vira <button> acessível.',
        'Trocar --unv-avatar-gap-color quando o avatar estiver sobre uma camada que não seja a de conteúdo.',
      ]}
      donts={[
        'Combinar ring="story" com badge="live": os dois sinais competem entre si.',
        'Aplicar squircle a avatar sem anel, ou círculo a avatar com anel: a forma é o sinal.',
        'Usar o gradiente de história como fundo do avatar em vez de anel.',
        'Depender só da cor do anel para indicar novidade.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: gradientes, folga e iniciais seguem os tokens do tema."
    />
    <UnvDocThemeSwitcher>
      {() => (
        <>
          <Avatar src={portrait(0)} alt="" ring="story" />
          <Avatar src={portrait(1)} alt="" ring="live" badge="live" />
          <Avatar src={portrait(2)} alt="" ring="seen" />
          <Avatar ring="seen" badge="add" />
          <Avatar initials="LS" />
        </>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UnvDocPropsTable
      title="Avatar"
      rows={[
        { name: 'src', type: 'string', description: 'URL da imagem de perfil. Sem ela, exibe as iniciais.' },
        {
          name: 'alt',
          type: 'string',
          default: "''",
          description: 'Texto alternativo da imagem. Vazio quando o avatar é decorativo.',
        },
        {
          name: 'initials',
          type: 'string',
          description: 'Iniciais exibidas quando não há imagem disponível.',
        },
        {
          name: 'size',
          type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
          default: "'lg'",
          description: 'Diâmetro do recorte interno (20/24/32/56/80px) ou valor livre em pixels.',
        },
        {
          name: 'ring',
          type: "'none' | 'story' | 'live' | 'seen'",
          default: "'none'",
          description: 'Anel ao redor do retrato. Qualquer valor diferente de none troca o círculo por squircle.',
        },
        {
          name: 'badge',
          type: "'none' | 'add' | 'live'",
          default: "'none'",
          description: 'Selo sobreposto: glifo "+" centralizado ou etiqueta LIVE na base.',
        },
        {
          name: 'badgeLabel',
          type: 'string',
          default: "'AO VIVO'",
          description: 'Rótulo da etiqueta quando badge é "live".',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Força o tema. Sem valor, herda o de data-unv-theme do contêiner.',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLElement>) => void',
          description: 'Quando informado, o avatar é renderizado como <button> acessível.',
        },
        {
          name: 'as',
          type: 'React.ElementType',
          default: "'span'",
          description: 'Elemento HTML raiz renderizado.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Avatar> = {
  title: 'Unoovista/Componentes/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: { control: 'text', description: 'URL da imagem de perfil.' },
    alt: { control: 'text', description: 'Texto alternativo da imagem.' },
    initials: { control: 'text', description: 'Iniciais exibidas quando não há imagem.' },
    size: {
      control: { type: 'range', min: 16, max: 120, step: 1 },
      description: 'Diâmetro do recorte interno em pixels.',
    },
    ring: {
      control: 'radio',
      options: ['none', 'story', 'live', 'seen'],
      description: 'Anel ao redor do retrato (troca o círculo por squircle).',
    },
    badge: {
      control: 'radio',
      options: ['none', 'add', 'live'],
      description: 'Selo sobreposto ao avatar.',
    },
    badgeLabel: { control: 'text', description: 'Rótulo da etiqueta LIVE.' },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual do componente.',
    },
  },
  args: {
    src: portrait(1),
    alt: 'Retrato de demonstração',
    initials: '',
    size: 56,
    ring: 'story',
    badge: 'none',
    badgeLabel: 'AO VIVO',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AvatarDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Avatar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Avatar',
  render: (args) => (
    <UnvDocStage theme={args.theme ?? 'light'} padding={56}>
      <Avatar {...args} initials={args.initials || undefined} src={args.src || undefined} />
    </UnvDocStage>
  ),
};

/**
 * Bandeja de histórias: o uso canônico do avatar com anel.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UnvDocStage align="flex-start" gap={20} padding={16}>
      <Avatar src={portrait(0)} alt="Sua história" ring="seen" badge="add" />
      <Avatar src={portrait(1)} alt="Transmissão ao vivo" ring="live" badge="live" />
      <Avatar src={portrait(2)} alt="História nova" ring="story" />
      <Avatar src={portrait(3)} alt="História nova" ring="story" />
      <Avatar src={portrait(4)} alt="História vista" ring="seen" />
    </UnvDocStage>
  ),
};

/**
 * Matriz completa de anéis suportados.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UnvDocStage gap={32}>
      {(['none', 'story', 'live', 'seen'] as const).map((ring) => (
        <div key={ring} style={{ textAlign: 'center' }}>
          <Avatar
            src={portrait(1)}
            alt=""
            ring={ring}
            badge={ring === 'live' ? 'live' : 'none'}
          />
          <div style={ring === 'live' ? CAPTION_LIVE : CAPTION}>{ring}</div>
        </div>
      ))}
    </UnvDocStage>
  ),
};

/**
 * Comparação dos cinco diâmetros nomeados.
 */
export const Tamanhos: Story = {
  render: () => (
    <UnvDocStage gap={32}>
      {SIZES.map(({ size, label }) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Avatar src={portrait(2)} alt="" size={size} ring="story" />
          <div style={CAPTION}>{label}</div>
        </div>
      ))}
    </UnvDocStage>
  ),
};

/**
 * Estados de selo, retrato ausente e interação.
 */
export const Estados: Story = {
  render: () => (
    <UnvDocStage gap={32}>
      <div style={{ textAlign: 'center' }}>
        <Avatar ring="seen" badge="add" />
        <div style={CAPTION}>Novo destaque</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={portrait(1)} alt="" ring="live" badge="live" />
        <div style={CAPTION_LIVE}>Ao vivo</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar initials="LS" />
        <div style={CAPTION}>Sem imagem</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={portrait(3)} alt="Abrir história" ring="story" onClick={() => undefined} />
        <div style={CAPTION}>Clicável (foco visível)</div>
      </div>
    </UnvDocStage>
  ),
};
