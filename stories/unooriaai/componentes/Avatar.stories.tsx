import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar } from '../../../src/unooriaai/components/Avatar';
import { uaiSizing } from '../../../src/unooriaai/tokens';
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
import { uaiAvatars } from '../fixtures';

const BAR = '#716C98';
const TAMANHOS = ['sm', 'md', 'lg', 'xl'] as const;
const CORPOS: Record<(typeof TAMANHOS)[number], number> = { sm: 10, md: 12, lg: 16, xl: 18 };
const DIAMETROS: Record<(typeof TAMANHOS)[number], number> = {
  sm: uaiSizing.avatarSm,
  md: uaiSizing.avatarMd,
  lg: uaiSizing.avatarLg,
  xl: uaiSizing.avatarXl,
};

/**
 * Página de documentação rica do componente Avatar.
 */
const AvatarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Identidade"
      title="Avatar"
      description="Círculo de identidade em quatro diâmetros (24, 32, 40 e 48px, os tokens --uai-size-avatar-sm a -xl), com iniciais em Open Sans semibold sobre a superfície de marca ou, no tom inverse, sobre a superfície de maior contraste — o avatar do assistente dentro do ChatBubble. Aceita também uma fotografia."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão Geral & Casos de Uso"
      description="O mesmo círculo em quatro escalas, com dois tons de superfície."
    />
    <UaiDocGrid>
      <UaiDocCard icon="🟣" title="Tom brand">
        Superfície <code>--uai-bg-brand</code> — o avatar da pessoa usuária e o ícone do{' '}
        <code>AssistantCard</code>. É o tom padrão.
      </UaiDocCard>
      <UaiDocCard icon="⬛" title="Tom inverse">
        Superfície <code>--uai-bg-inverse</code>, usada no avatar <code>IA</code> dentro do{' '}
        <code>ChatBubble</code> do assistente.
      </UaiDocCard>
      <UaiDocCard icon="🖼️" title="Com imagem">
        Passando <code>src</code>, a fotografia substitui as iniciais e é recortada com{' '}
        <code>object-fit: cover</code>, preservando o círculo.
      </UaiDocCard>
      <UaiDocCard icon="📐" title="Régua fechada">
        Os quatro diâmetros vêm dos tokens <code>--uai-size-avatar-*</code>; não há tamanho
        intermediário na biblioteca.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações Técnicas"
      description="Medidas de cada tamanho e decisões de identidade do módulo."
    />
    <UaiDocSpecs
      component="Avatar"
      layout="Círculo · 24 a 48px"
      specs={[
        { label: 'SM', value: `${uaiSizing.avatarSm}px · iniciais ${CORPOS.sm}px` },
        { label: 'MD', value: `${uaiSizing.avatarMd}px · iniciais ${CORPOS.md}px` },
        { label: 'LG', value: `${uaiSizing.avatarLg}px · iniciais ${CORPOS.lg}px` },
        { label: 'XL', value: `${uaiSizing.avatarXl}px · iniciais ${CORPOS.xl}px` },
        { label: 'Tom brand', value: '--uai-bg-brand · --uai-text-inverse' },
        { label: 'Peso das iniciais', value: '600 (Open Sans semibold)' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Superfície de marca em roxo',
          detail:
            '--uai-bg-brand é brandpurple-600 no tema claro e brandpurple-400 no escuro, com as iniciais em --uai-text-inverse (branco no claro, roxo profundo no escuro): o par mede acima de 4,5:1 nos dois temas.',
        },
        {
          subject: 'Corpos das iniciais na escala Unooria',
          detail:
            'os corpos foram encaixados nos degraus da escala da plataforma (10, 12, 16 e 18px). O de 10px é o degrau de legenda da Unooria e só existe neste componente e no Badge.',
        },
        {
          subject: 'Círculo perfeito',
          detail:
            'o diâmetro é fixo e o raio é --uai-radius-full; o componente não acompanha a largura do texto das iniciais.',
        },
        {
          subject: 'Tom inverse',
          detail:
            'acrescentado para o assistente: usa --uai-bg-inverse, que no tema claro é o roxo mais escuro e no escuro o lavanda mais claro, mantendo a distinção entre pessoa e IA nos dois temas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do Componente"
      description="Um círculo com dois conteúdos mutuamente exclusivos."
    />
    <UaiDocAnatomy
      zones={[
        {
          name: 'Contêiner',
          role: 'Círculo de diâmetro fixo com overflow: hidden.',
          token: '--uai-radius-full',
        },
        {
          name: 'Iniciais',
          role: 'initials, em Open Sans semibold. Marcadas aria-hidden quando não há alt, para não poluir a leitura de tela.',
        },
        {
          name: 'Imagem',
          role: 'src + alt. A imagem preenche 100% do círculo e é recortada pelo centro.',
        },
        {
          name: 'Tom',
          role: 'tone escolhe entre --uai-bg-brand e --uai-bg-inverse; o texto usa --uai-text-inverse nos dois casos.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de Tamanhos e Tons"
      description="Os quatro tamanhos nos dois tons, renderizados pelo componente real."
    />
    <UaiDocStage label="Tom brand — os 4 tamanhos">
      {TAMANHOS.map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Avatar size={size} initials="U" />
          <div style={{ fontSize: 11, color: 'var(--uai-text-secondary)', marginTop: 8 }}>
            {size} · {DIAMETROS[size]}px
          </div>
        </div>
      ))}
    </UaiDocStage>
    <UaiDocStage label="Tom inverse — avatar do assistente">
      {TAMANHOS.map((size) => (
        <Avatar key={size} size={size} tone="inverse" initials="IA" />
      ))}
    </UaiDocStage>
    <UaiDocStage label="Com fotografia e com iniciais de duas letras">
      <Avatar size="xl" src={uaiAvatars.lucas} alt="Retrato ilustrado de uma pessoa" />
      <Avatar size="xl" initials="LS" />
      <Avatar size="lg" initials="G" />
      <Avatar size="sm" tone="inverse" initials="IA" />
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Boas Práticas"
      description="Regras de identidade visual."
    />
    <UaiDocPractices
      dos={[
        'Preencher alt sempre que houver src — o avatar passa a carregar informação.',
        'Manter no máximo duas letras nas iniciais: os corpos foram medidos para uma.',
        'Usar o tom inverse apenas para o assistente, preservando o contraste de papéis na conversa.',
        'Escolher o tamanho pela densidade da lista: sm em linhas compactas, xl em cabeçalhos de perfil.',
      ]}
      donts={[
        'Definir width/height por fora para criar um diâmetro intermediário.',
        'Colocar imagem sem alt e sem iniciais — o avatar fica sem nenhuma leitura.',
        'Aplicar contorno colorido para indicar estado; a biblioteca não tem anel de avatar.',
        'Usar o tom brand para o assistente, o que apaga a distinção entre usuário e IA.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a Temas"
      description="A superfície de marca muda de brandpurple-600 para brandpurple-400 no escuro; o tom inverse troca de extremo da escala."
    />
    <UaiDocThemeSwitcher>
      {() => (
        <>
          {TAMANHOS.map((size) => (
            <Avatar key={size} size={size} initials="U" />
          ))}
          <Avatar size="lg" tone="inverse" initials="IA" />
        </>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Avatar."
    />
    <UaiDocPropsTable
      title="Avatar"
      rows={[
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg' | 'xl'",
          default: "'md'",
          description: 'Diâmetro de 24, 32, 40 ou 48px, com o corpo das iniciais proporcional.',
        },
        {
          name: 'initials',
          type: 'string',
          default: "'U'",
          description: 'Iniciais exibidas quando não há imagem.',
        },
        { name: 'src', type: 'string', description: 'URL da imagem de perfil.' },
        {
          name: 'alt',
          type: 'string',
          default: "''",
          description: 'Texto alternativo da imagem — obrigatório sempre que src é usado.',
        },
        {
          name: 'tone',
          type: "'brand' | 'inverse'",
          default: "'brand'",
          description: 'Superfície do círculo: --uai-bg-brand ou --uai-bg-inverse.',
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

const meta: Meta<typeof Avatar> = {
  title: 'UnooriaAI/Componentes/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'radio', options: TAMANHOS, description: 'Diâmetro do avatar.' },
    tone: { control: 'radio', options: ['brand', 'inverse'], description: 'Superfície do círculo.' },
    initials: { control: 'text', description: 'Iniciais exibidas sem imagem.' },
    src: { control: 'text', description: 'URL da imagem de perfil.' },
    alt: { control: 'text', description: 'Texto alternativo da imagem.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    size: 'md',
    tone: 'brand',
    initials: 'U',
    src: '',
    alt: '',
    theme: 'light',
    className: '',
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
      <Avatar {...args} src={args.src || undefined} />
    </div>
  ),
};

/**
 * Os quatro tamanhos no tom padrão.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UaiDocStage align="flex-start" gap={16}>
      {TAMANHOS.map((size) => (
        <Avatar key={size} size={size} initials="U" />
      ))}
    </UaiDocStage>
  ),
};

/**
 * Comparação dos quatro tamanhos com o corpo das iniciais.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
      {TAMANHOS.map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Avatar size={size} initials="U" />
          <div style={{ fontSize: 11, color: 'var(--uai-text-secondary)', marginTop: 8 }}>
            {DIAMETROS[size]}px · {CORPOS[size]}px
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Os dois tons de superfície, lado a lado.
 */
export const Tons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Avatar size="xl" tone="brand" initials="U" />
      <Avatar size="xl" tone="inverse" initials="IA" />
    </div>
  ),
};
