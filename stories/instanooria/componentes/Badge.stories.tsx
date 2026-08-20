import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '../../../src/instanooria/components/Badge';
import { Avatar } from '../../../src/instanooria/components/Avatar';
import { Icon } from '../../../src/instanooria/components/Icon';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaAvatars, instaPhotos } from '../fixtures';

/**
 * Página de documentação rica do componente Badge.
 */
const BadgeDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Indicadores"
      title="Badge"
      description="Cobre os três selos do arquivo de design: a etiqueta LIVE com gradiente e contorno branco ancorada nos anéis de story, o contador de mídia exibido sobre carrosséis (“1/3”) e o indicador vermelho de novidades da barra superior."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Cada variante resolve um problema distinto de sinalização."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🔴" title="LIVE">
        Gradiente magenta com contorno branco de 2px, tipografia Navigation/Badge de 8px em caixa
        alta. Sempre ancorada na base de um anel de avatar.
      </InstaDocCard>
      <InstaDocCard icon="🔢" title="Contador de mídia">
        Cápsula neutra de 34 × 26px no canto superior direito do carrossel, indicando a posição
        atual. Aparece apenas quando há mais de um item.
      </InstaDocCard>
      <InstaDocCard icon="🔔" title="Notificação">
        Ponto vermelho de 8px ou cápsula com contagem, sobreposto a glifos de navegação para indicar
        conteúdo não visto.
      </InstaDocCard>
      <InstaDocCard icon="⚪" title="Neutra">
        Cápsula de apoio para rótulos curtos sobre superfícies claras, sem carga semântica de
        urgência.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas dos três selos lidas das camadas do arquivo."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1722"
      frameName="Stories → Live → Rectangle"
      specs={[
        { label: 'LIVE · raio', value: '3px' },
        { label: 'LIVE · contorno', value: '2px · #FEFEFE' },
        { label: 'LIVE · tipografia', value: '8px · 510 · +0.5px' },
        { label: 'Contador', value: '34 × 26px · raio total' },
        { label: 'Contador · tipografia', value: 'Caption/Medium · 12px' },
        { label: 'Ponto', value: '8 × 8px · #ED4956' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Os selos em seus contextos reais de aplicação."
    />
    <InstaDocStage label="Ancoragem de cada variante">
      <div style={{ textAlign: 'center' }}>
        <Avatar src={instaAvatars.karennne} alt="" ring="live" badge="live" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 16 }}>LIVE no anel</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ position: 'relative', width: 140, height: 140, borderRadius: 8, overflow: 'hidden' }}>
          <img
            src={instaPhotos.tokyo}
            alt="Cruzamento de Shibuya"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Badge variant="counter" style={{ position: 'absolute', top: 10, right: 10 }}>
            1/3
          </Badge>
        </div>
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>Contador sobre mídia</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-flex', padding: 4 }}>
          <Icon name="igtv" size={26} />
          <Badge
            variant="notification"
            dot
            style={{ position: 'absolute', top: 2, right: 0 }}
          />
        </div>
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>Ponto sobre glifo</div>
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Todas as variantes, com e sem contagem, renderizadas pelo componente real."
    />
    <InstaDocStage label="Variantes com rótulo">
      <Badge variant="live">LIVE</Badge>
      <Badge variant="counter">1/3</Badge>
      <Badge variant="notification" count={3} />
      <Badge variant="notification" count={128} />
      <Badge variant="neutral">Destaque</Badge>
    </InstaDocStage>

    <InstaDocStage label="Modo ponto (8 × 8px)">
      <Badge variant="notification" dot />
      <Badge variant="live" dot />
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de sinalização verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Exibir o contador de mídia apenas quando houver mais de um item no carrossel.',
        'Usar overflowCount para truncar contagens longas como "99+".',
        'Ancorar a etiqueta LIVE sempre a um anel de avatar com ring="live".',
        'Manter o ponto de notificação em aria-hidden — a informação deve estar no rótulo do botão.',
      ]}
      donts={[
        'Usar a etiqueta LIVE como rótulo genérico de destaque.',
        'Aplicar a variante notification a conteúdo que não seja novidade real.',
        'Empilhar dois badges sobre o mesmo elemento.',
        'Traduzir "LIVE" — é uma marca visual fixa no arquivo de design.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="O contador acompanha a superfície tertiary; LIVE e notificação são invariantes."
    />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <>
          <Badge variant="live" theme={activeTheme}>
            LIVE
          </Badge>
          <Badge variant="counter" theme={activeTheme}>
            1/3
          </Badge>
          <Badge variant="notification" count={5} theme={activeTheme} />
          <Badge variant="neutral" theme={activeTheme}>
            Destaque
          </Badge>
          <Badge variant="notification" dot theme={activeTheme} />
        </>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Badge."
    />
    <InstaDocPropsTable
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
          description: 'Renderiza apenas o ponto de 8 × 8px, sem rótulo.',
        },
        { name: 'count', type: 'number', description: 'Contagem numérica exibida no selo.' },
        {
          name: 'overflowCount',
          type: 'number',
          default: '99',
          description: 'Valor máximo exibido antes de truncar como "99+".',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo textual do selo.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Badge> = {
  title: 'Instanooria/Componentes/Badge',
  component: Badge,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['live', 'counter', 'notification', 'neutral'],
      description: 'Variante visual do selo.',
    },
    dot: { control: 'boolean', description: 'Renderiza apenas o ponto de 8 × 8px.' },
    count: { control: 'number', description: 'Contagem numérica exibida.' },
    overflowCount: { control: 'number', description: 'Limite antes de truncar como "99+".' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Conteúdo textual do selo.' },
  },
  args: {
    variant: 'live',
    dot: false,
    overflowCount: 99,
    theme: 'light',
    children: 'LIVE',
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
      data-insta-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <Badge {...args} />
    </div>
  ),
};

/**
 * Matriz completa de variantes.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="live">LIVE</Badge>
      <Badge variant="counter">1/3</Badge>
      <Badge variant="notification" count={3} />
      <Badge variant="notification" count={128} />
      <Badge variant="neutral">Destaque</Badge>
      <Badge variant="notification" dot />
    </div>
  ),
};

/**
 * Selos aplicados aos seus contextos reais do arquivo de design.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar src={instaAvatars.karennne} alt="karennne" ring="live" badge="live" />
      <div style={{ position: 'relative', width: 180, height: 180, overflow: 'hidden', borderRadius: 8 }}>
        <img
          src={instaPhotos.tokyo}
          alt="Cruzamento de Shibuya"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Badge variant="counter" style={{ position: 'absolute', top: 14, right: 14 }}>
          1/3
        </Badge>
      </div>
      <div style={{ position: 'relative', display: 'inline-flex', padding: 4 }}>
        <Icon name="igtv" size={26} />
        <Badge variant="notification" dot style={{ position: 'absolute', top: 2, right: 0 }} />
      </div>
    </div>
  ),
};
