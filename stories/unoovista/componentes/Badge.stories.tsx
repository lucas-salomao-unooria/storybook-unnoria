import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '../../../src/unoovista/components/Badge';
import { Avatar } from '../../../src/unoovista/components/Avatar';
import { Icon } from '../../../src/unoovista/components/Icon';
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
import { unvAvatars, unvPhotos } from '../fixtures';

const BAR = '#716C98';
const CAPTION: React.CSSProperties = { fontSize: 12, color: '#475157', marginTop: 10 };

const portraits = Object.values(unvAvatars) as string[];
const photos = Object.values(unvPhotos) as string[];

const MediaWithCounter = ({ size = 140, inset = 10 }: { size?: number; inset?: number }) => (
  <div
    style={{
      position: 'relative',
      width: size,
      height: size,
      borderRadius: 12,
      overflow: 'hidden',
    }}
  >
    <img
      src={photos[0]}
      alt="Cruzamento de avenidas ao entardecer"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <Badge variant="counter" style={{ position: 'absolute', top: inset, right: inset }}>
      1/3
    </Badge>
  </div>
);

const IconWithDot = () => (
  <div style={{ position: 'relative', display: 'inline-flex', padding: 4 }}>
    <Icon name="longVideo" size={26} />
    <Badge variant="notification" dot style={{ position: 'absolute', top: 2, right: 0 }} />
  </div>
);

/**
 * Página de documentação rica do componente Badge.
 */
const BadgeDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Sinalização"
      title="Badge"
      description="Selos em cápsula que sinalizam estado sem disputar a atenção com o conteúdo: a etiqueta LIVE ancorada ao anel de transmissão, o contador de mídia sobre carrosséis, o selo de novidades (ponto ou contagem) e a cápsula neutra de rótulo. Todos são arredondados; a cor vem sempre de tokens."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Onde cada selo aparece e o que ele diz."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🔴" title="LIVE">
        Cápsula em <code>--unv-gradient-livebadge</code> com texto em <code>--unv-color-text-on-media</code>,
        ancorada à base de um avatar em transmissão. Seu contorno tem a cor da folga do anel.
      </UnvDocCard>
      <UnvDocCard icon="🖼️" title="Contador de mídia">
        Cápsula em superfície terciária com a posição no carrossel (&quot;1/3&quot;), no canto da
        fotografia. Só aparece quando há mais de um item.
      </UnvDocCard>
      <UnvDocCard icon="🔔" title="Notificação">
        Contagem ou ponto de 8px em <code>--unv-color-brand-notification</code>, com o numeral em{' '}
        <code>--unv-color-text-on-notification</code>. O ponto é decorativo (<code>aria-hidden</code>).
      </UnvDocCard>
      <UnvDocCard icon="🏷️" title="Neutro e wrap">
        Cápsula de rótulo em superfície terciária. Com <code>wrap</code>, o rótulo longo quebra linha e
        o raio desce ao do cartão para não virar bolha.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="Badge"
      layout="Cápsula · 8 a 26px de altura"
      specs={[
        { label: 'LIVE', value: 'nav-badge 10px/700 · caixa alta · contorno 2px' },
        { label: 'Contador', value: '24px de altura · mín. 32px · caption 12px/600' },
        { label: 'Notificação', value: '18px · nav-badge 10px/700' },
        { label: 'Neutro', value: 'caption 12px/600 · recuo 2×8px' },
        { label: 'Ponto', value: '8 × 8px' },
        { label: 'Raio', value: '--unv-radius-full (wrap: --unv-radius-l)' },
        { label: 'Truncamento', value: 'overflowCount (99) → "99+"' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Tudo em cápsula',
          detail:
            'a etiqueta LIVE deixou de ter cantos vivos: as quatro variantes usam --unv-radius-full, coerentes com campos, botões e chips do módulo.',
        },
        {
          subject: 'Selo de notificação',
          detail:
            'fundo --unv-color-brand-notification (vermelho no claro, coral no escuro) com o numeral em --unv-color-text-on-notification, e não em branco fixo: no escuro o texto é o roxo profundo, que mantém ≥ 4,5:1 sobre o coral.',
        },
        {
          subject: 'Tamanho de 18px',
          detail:
            'o selo tem 18px de altura (custom property local --unv-badge-notification-size), o mínimo em que dois dígitos cabem no corpo de 10px do módulo.',
        },
        {
          subject: 'Peso semibold nas cápsulas de texto',
          detail:
            'contador e neutro usam 600 (--unv-font-weight-semibold) no corpo de 12px, para não perder presença sobre a fotografia.',
        },
        {
          subject: 'Corpo de 10px só em LIVE e notificação',
          detail:
            'é o degrau nav-badge, único abaixo de 12px em todo o módulo, reservado a selos de uma palavra ou dois dígitos.',
        },
        {
          subject: 'Sem rótulo acessível no ponto',
          detail:
            'o ponto é aria-hidden; quem precisa anunciar "novidade" o faz no elemento pai (por exemplo, no nome do botão).',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Uma cápsula, um rótulo e, quando há, um contorno."
    />
    <UnvDocAnatomy
      zones={[
        {
          name: 'Cápsula',
          role: 'Contêiner arredondado; o fundo define a variante.',
          token: '--unv-gradient-livebadge · --unv-color-background-tertiary · --unv-color-brand-notification',
        },
        {
          name: 'Rótulo',
          role: 'Texto de uma linha (ou contagem, truncada em overflowCount). Com wrap, quebra linha.',
          token: '--unv-font-nav-badge-* · --unv-font-caption-md-*',
        },
        {
          name: 'Contorno',
          role: 'Só na etiqueta LIVE: 2px na cor da folga do anel, para destacar a cápsula do avatar.',
          token: '--unv-color-ring-inner',
        },
        {
          name: 'Ponto',
          role: 'Com dot, a cápsula vira um círculo de 8px sem rótulo.',
          token: '--unv-color-brand-notification',
        },
      ]}
    />
    <UnvDocStage label="Selos aplicados ao contexto">
      <div style={{ textAlign: 'center' }}>
        <Avatar src={portraits[1]} alt="" ring="live" badge="live" />
        <div style={{ ...CAPTION, marginTop: 16 }}>LIVE ancorado ao anel</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <MediaWithCounter />
        <div style={CAPTION}>Contador sobre mídia</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <IconWithDot />
        <div style={CAPTION}>Ponto sobre glifo</div>
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Todas as variantes, com e sem contagem, renderizadas pelo componente real."
    />
    <UnvDocStage label="Variantes com rótulo">
      <Badge variant="live">LIVE</Badge>
      <Badge variant="counter">1/3</Badge>
      <Badge variant="notification" count={3} />
      <Badge variant="notification" count={128} />
      <Badge variant="neutral">Destaque</Badge>
    </UnvDocStage>
    <UnvDocStage label="Modo ponto (8 × 8px)">
      <Badge variant="notification" dot />
      <Badge variant="live" dot />
    </UnvDocStage>
    <UnvDocStage label="Sobre a tela (background-secondary)" surface="secondary">
      <Badge variant="neutral">Destaque</Badge>
      <Badge variant="counter">2/5</Badge>
      <Badge variant="notification" count={9} />
    </UnvDocStage>
    <UnvDocStage label="Quebra de linha numa largura fixa (wrap)" align="flex-start">
      <div style={{ width: 220, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        <Badge variant="neutral" wrap>
          Fonte ouvida: Secretaria de Obras
        </Badge>
        <Badge variant="neutral" wrap>
          Ângulo da imagem: infográfico comparativo de vagas versus visitantes
        </Badge>
      </div>
      <div style={{ width: 220, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        <Badge variant="neutral">Sem wrap: o rótulo longo segue numa linha só</Badge>
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Exibir o contador de mídia apenas quando houver mais de um item no carrossel.',
        'Usar overflowCount para truncar contagens longas como "99+".',
        'Ancorar a etiqueta LIVE sempre a um avatar com ring="live".',
        'Usar wrap para etiquetas longas em largura fixa, em vez de deixar a cápsula passar da borda.',
        'Anunciar a novidade no elemento pai quando o selo for um ponto.',
      ]}
      donts={[
        'Empilhar dois selos de notificação sobre o mesmo glifo.',
        'Trocar o texto do selo de notificação por branco fixo: no tema escuro o contraste cairia.',
        'Usar a etiqueta LIVE fora de um contexto de transmissão.',
        'Usar rótulo com mais de uma linha sem wrap.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: o selo de notificação e o contador seguem os tokens do tema."
    />
    <UnvDocThemeSwitcher>
      {() => (
        <>
          <Badge variant="live">LIVE</Badge>
          <Badge variant="counter">1/3</Badge>
          <Badge variant="notification" count={3} />
          <Badge variant="notification" dot />
          <Badge variant="neutral">Destaque</Badge>
        </>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UnvDocPropsTable
      title="Badge"
      rows={[
        {
          name: 'variant',
          type: "'live' | 'counter' | 'notification' | 'neutral'",
          default: "'neutral'",
          description: 'Variante visual do selo.',
        },
        {
          name: 'dot',
          type: 'boolean',
          default: 'false',
          description: 'Renderiza apenas o ponto de 8 × 8px, sem rótulo (decorativo).',
        },
        { name: 'count', type: 'number', description: 'Contagem exibida no lugar de children.' },
        {
          name: 'overflowCount',
          type: 'number',
          default: '99',
          description: 'Valor máximo exibido antes de truncar como "99+".',
        },
        {
          name: 'wrap',
          type: 'boolean',
          default: 'false',
          description: 'Permite que o rótulo quebre linha; o raio desce ao do cartão. Sem efeito com dot.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Força o tema. Sem valor, herda o de data-unv-theme do contêiner.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo textual do selo.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Badge> = {
  title: 'Unoovista/Componentes/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['live', 'counter', 'notification', 'neutral'],
      description: 'Variante visual do selo.',
    },
    dot: { control: 'boolean', description: 'Renderiza apenas o ponto de 8 × 8px.' },
    count: { control: 'number', description: 'Contagem numérica exibida no selo.' },
    overflowCount: { control: 'number', description: 'Valor máximo antes de truncar como "99+".' },
    wrap: { control: 'boolean', description: 'Permite que o rótulo quebre linha.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Conteúdo textual do selo.' },
  },
  args: {
    variant: 'neutral',
    dot: false,
    count: undefined,
    overflowCount: 99,
    wrap: false,
    theme: 'light',
    children: 'Destaque',
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
 * Playground com todas as propriedades do Badge expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Badge',
  render: (args) => (
    <UnvDocStage theme={args.theme ?? 'light'} padding={48}>
      <Badge {...args} />
    </UnvDocStage>
  ),
};

/**
 * Matriz completa de variantes.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UnvDocStage gap={20}>
      <Badge variant="live">LIVE</Badge>
      <Badge variant="counter">1/3</Badge>
      <Badge variant="notification" count={3} />
      <Badge variant="notification" count={128} />
      <Badge variant="neutral">Destaque</Badge>
      <Badge variant="notification" dot />
    </UnvDocStage>
  ),
};

/**
 * Selos aplicados aos seus contextos reais.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UnvDocStage gap={40}>
      <Avatar src={portraits[1]} alt="Transmissão ao vivo" ring="live" badge="live" />
      <MediaWithCounter size={180} inset={14} />
      <IconWithDot />
    </UnvDocStage>
  ),
};

/**
 * Etiqueta longa que quebra linha numa largura fixa.
 */
export const QuebraDeLinha: Story = {
  name: 'Quebra de linha (wrap)',
  render: () => (
    <UnvDocStage align="flex-start">
      <div style={{ width: 280, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        <Badge variant="neutral" wrap>
          Fonte ouvida: moradores do entorno
        </Badge>
        <Badge variant="neutral" wrap>
          Ângulo da imagem: infográfico comparativo de vagas versus visitantes
        </Badge>
        <Badge variant="neutral" wrap>
          Enquadramento: dados e números
        </Badge>
      </div>
    </UnvDocStage>
  ),
};
