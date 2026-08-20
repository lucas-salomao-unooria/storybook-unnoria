import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar } from '../../../src/instanooria/components/Avatar';
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
import { instaAvatars } from '../fixtures';

/**
 * Página de documentação rica do componente Avatar.
 */
const AvatarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Identidade"
      title="Avatar"
      description="Retrato circular do usuário e principal portador de estado social do Instanooria. Além da imagem, o avatar comunica se há story novo, se a pessoa está ao vivo e se o conteúdo já foi visto — tudo pela geometria do anel, extraída do export original de 64×64px do Figma."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Onde o avatar aparece e o que cada anel comunica."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🟠" title="Anel de story">
        O gradiente laranja → magenta → roxo indica story ainda não visualizado. É o sinal de maior
        prioridade da bandeja superior do Feed.
      </InstaDocCard>
      <InstaDocCard icon="🔴" title="Anel ao vivo">
        O gradiente vermelho → magenta → violeta, combinado à etiqueta LIVE, indica transmissão em
        andamento e tem precedência sobre o anel de story.
      </InstaDocCard>
      <InstaDocCard icon="⚪" title="Anel visualizado">
        Traço neutro de 1px em <code>--insta-color-highlight-ring</code>, usado tanto para stories já
        vistos quanto para os destaques fixos do perfil.
      </InstaDocCard>
      <InstaDocCard icon="➕" title="Selo de criação">
        O selo <code>add</code> sobrepõe o glifo &quot;+&quot; ao anel neutro, formando o atalho
        &quot;Novo&quot; da faixa de destaques do perfil.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Geometria exata reproduzida a partir do export SVG do anel."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1698"
      frameName="Stories → Your Story → Profile Image"
      specs={[
        { label: 'Caixa externa', value: '64 × 64px' },
        { label: 'Recorte interno', value: '56 × 56px' },
        { label: 'Espessura do anel', value: '2px' },
        { label: 'Folga anel → foto', value: '2px' },
        { label: 'Anel visualizado', value: '1px · #C7C7CC' },
        { label: 'Etiqueta LIVE', value: '8px · raio 3px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Três camadas concêntricas: anel gradiente, folga da cor de fundo e a fotografia."
    />
    <InstaDocStage label="Camadas do avatar com anel de story">
      <div style={{ textAlign: 'center' }}>
        <Avatar src={instaAvatars.zackjohn} alt="zackjohn" ring="none" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>1. Recorte (56px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={instaAvatars.zackjohn} alt="zackjohn" ring="seen" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>2. + folga e traço</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={instaAvatars.zackjohn} alt="zackjohn" ring="story" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>3. + gradiente (64px)</div>
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes, Tamanhos e Estados"
      description="Combinações completas renderizadas pelo componente real de produção."
    />
    <InstaDocStage label="Anéis">
      {(['none', 'story', 'live', 'seen'] as const).map((ring) => (
        <div key={ring} style={{ textAlign: 'center' }}>
          <Avatar
            src={instaAvatars.karennne}
            alt=""
            ring={ring}
            badge={ring === 'live' ? 'live' : 'none'}
          />
          <div style={{ fontSize: 12, color: '#475157', marginTop: ring === 'live' ? 16 : 10 }}>
            {ring}
          </div>
        </div>
      ))}
    </InstaDocStage>

    <InstaDocStage label="Tamanhos nomeados">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Avatar src={instaAvatars.jacob_w} alt="" size={size} ring="story" />
          <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>{size}</div>
        </div>
      ))}
    </InstaDocStage>

    <InstaDocStage label="Selos e fallback">
      <div style={{ textAlign: 'center' }}>
        <Avatar ring="seen" badge="add" size={64} />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>badge=&quot;add&quot;</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={instaAvatars.karennne} alt="" ring="live" badge="live" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 16 }}>badge=&quot;live&quot;</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar initials="LS" ring="none" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>iniciais</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={instaAvatars.craig_love} alt="" ring="story" onClick={() => undefined} />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>interativo</div>
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de uso verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Usar ring="live" com badge="live" — o anel sozinho não comunica transmissão.',
        'Aplicar ring="seen" a destaques do perfil, que nunca usam gradiente.',
        'Informar alt descritivo quando o avatar identificar uma pessoa específica.',
        'Passar onClick quando o avatar abrir um story ou perfil — ele vira <button> acessível.',
      ]}
      donts={[
        'Combinar ring="story" com badge="live": os dois sinais competem entre si.',
        'Usar diâmetros fora dos cinco canônicos do arquivo de design.',
        'Recortar o avatar em quadrado ou com raio parcial.',
        'Aplicar o gradiente de story como fundo do avatar em vez de anel.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A folga entre anel e foto acompanha a superfície, mantendo o recorte limpo nos dois temas."
    />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <>
          <Avatar src={instaAvatars.zackjohn} alt="" ring="story" theme={activeTheme} />
          <Avatar src={instaAvatars.karennne} alt="" ring="live" badge="live" theme={activeTheme} />
          <Avatar src={instaAvatars.craig_love} alt="" ring="seen" theme={activeTheme} />
          <Avatar ring="seen" badge="add" theme={activeTheme} />
          <Avatar initials="LS" theme={activeTheme} />
        </>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Avatar."
    />
    <InstaDocPropsTable
      title="Avatar"
      rows={[
        { name: 'src', type: 'string', description: 'URL da imagem de perfil.' },
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
          description: 'Diâmetro do recorte interno (17/23/32/56/80px) ou valor em pixels.',
        },
        {
          name: 'ring',
          type: "'none' | 'story' | 'live' | 'seen'",
          default: "'none'",
          description: 'Anel renderizado ao redor da imagem.',
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
          default: "'LIVE'",
          description: 'Rótulo exibido quando badge é "live".',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent) => void',
          description: 'Quando informado, o avatar é renderizado como <button> acessível.',
        },
        {
          name: 'as',
          type: 'React.ElementType',
          default: "'span'",
          description: 'Elemento HTML raiz renderizado.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Avatar> = {
  title: 'Instanooria/Componentes/Avatar',
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
      description: 'Anel renderizado ao redor da imagem.',
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
    src: instaAvatars.karennne,
    alt: 'karennne',
    initials: '',
    size: 56,
    ring: 'story',
    badge: 'none',
    badgeLabel: 'LIVE',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
    <div
      data-insta-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 56,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <Avatar {...args} initials={args.initials || undefined} src={args.src || undefined} />
    </div>
  ),
};

/**
 * Réplica da bandeja de stories do frame oficial do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 20,
        padding: '12px 10px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        overflowX: 'auto',
      }}
    >
      <Avatar src={instaAvatars.jacob_w} alt="Seu story" ring="seen" />
      <Avatar src={instaAvatars.karennne} alt="karennne" ring="live" badge="live" />
      <Avatar src={instaAvatars.zackjohn} alt="zackjohn" ring="story" />
      <Avatar src={instaAvatars.kieron_d} alt="kieron_d" ring="story" />
      <Avatar src={instaAvatars.craig_love} alt="craig_love" ring="story" />
    </div>
  ),
};

/**
 * Matriz completa de anéis suportados.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      {(['none', 'story', 'live', 'seen'] as const).map((ring) => (
        <div key={ring} style={{ textAlign: 'center' }}>
          <Avatar
            src={instaAvatars.karennne}
            alt=""
            ring={ring}
            badge={ring === 'live' ? 'live' : 'none'}
          />
          <div style={{ fontSize: 12, color: '#475157', marginTop: ring === 'live' ? 16 : 10 }}>
            {ring}
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Comparação dos cinco diâmetros canônicos do arquivo de design.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Avatar src={instaAvatars.jacob_w} alt="" size={size} ring="story" />
          <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>{size}</div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Estados de selo, fallback e interação.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar ring="seen" badge="add" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>Novo destaque</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={instaAvatars.karennne} alt="" ring="live" badge="live" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 16 }}>Ao vivo</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar initials="LS" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>Sem imagem</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={instaAvatars.craig_love} alt="" ring="story" onClick={() => undefined} />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>Clicável (foco visível)</div>
      </div>
    </div>
  ),
};
