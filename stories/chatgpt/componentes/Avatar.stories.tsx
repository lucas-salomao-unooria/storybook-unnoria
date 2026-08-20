import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar } from '../../../src/chatgpt/components/Avatar';
import { gptSizing } from '../../../src/chatgpt/tokens';
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
import { gptAvatars, gptFigmaNodes } from '../fixtures';

const TAMANHOS = ['sm', 'md', 'lg', 'xl'] as const;
const CORPOS: Record<(typeof TAMANHOS)[number], number> = { sm: 10, md: 13, lg: 16, xl: 19 };

/**
 * Página de documentação rica do componente Avatar.
 */
const AvatarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Componentes • Identidade"
      title="Avatar"
      description="Réplica do conjunto Avatar da página 🟡 Design system: quatro diâmetros circulares alinhados às variáveis size/avatar-sm a size/avatar-xl (24, 32, 40 e 48px), com superfície bg/brand e iniciais em text/inverse. Inclui o tom inverse — o avatar preto do assistente que aparece dentro do ChatBubble."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="O mesmo círculo em quatro escalas, com dois tons de superfície."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="🟪" title="Tom brand">
        Superfície <code>bg/brand</code> — o avatar do usuário e o ícone do <code>GPTCard</code>.
        É o padrão do conjunto no Figma.
      </GptDocCard>
      <GptDocCard icon="⬛" title="Tom inverse">
        Superfície <code>bg/inverse</code>, lida do avatar <code>AI</code> dentro do{' '}
        <code>ChatBubble</code> do assistente.
      </GptDocCard>
      <GptDocCard icon="🖼️" title="Com imagem">
        Passando <code>src</code>, a foto substitui as iniciais e é recortada com{' '}
        <code>object-fit: cover</code>, preservando o círculo.
      </GptDocCard>
      <GptDocCard icon="📐" title="Régua fechada">
        Os quatro diâmetros vêm da coleção <code>Primitives/Sizing</code>; não há tamanho
        intermediário na biblioteca.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do conjunto de variantes via Plugin API."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.avatar}
      frameName="Avatar (Size · 4 variantes)"
      specs={[
        { label: 'SM', value: `${gptSizing.avatarSm}px · iniciais 10px` },
        { label: 'MD', value: `${gptSizing.avatarMd}px · iniciais 13px` },
        { label: 'LG', value: `${gptSizing.avatarLg}px · iniciais 16px` },
        { label: 'XL', value: `${gptSizing.avatarXl}px · iniciais 19px` },
        { label: 'Superfície', value: '#5856D6 · bg/brand' },
        { label: 'Peso das iniciais', value: '600 (Inter Semi Bold)' },
      ]}
      deviations={[
        'Como no IconButton, os frames abraçam a largura do texto — larguras de 8 a 14px contra alturas de 24 a 48. O componente renderiza o círculo, intenção confirmada pelo raio igual à metade da altura em cada variante.',
        'Os corpos das iniciais (10/13/16/19px) são literais das camadas de texto e não correspondem a degraus da escala tipográfica.',
        'O tom inverse não é uma variante do conjunto Avatar: foi extraído do frame Avatar dentro de ChatBubble/Role=Assistant, que repete a mesma geometria com superfície preta.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Um círculo com dois conteúdos mutuamente exclusivos."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="⭕" title="Contêiner">
        Círculo de diâmetro fixo com <code>overflow: hidden</code> e{' '}
        <code>border-radius: var(--gpt-radius-full)</code>.
      </GptDocCard>
      <GptDocCard icon="🔤" title="Iniciais">
        <code>initials</code>, em Inter Semi Bold. Marcadas <code>aria-hidden</code> quando não há{' '}
        <code>alt</code>, para não poluir a leitura de tela.
      </GptDocCard>
      <GptDocCard icon="🖼️" title="Imagem">
        <code>src</code> + <code>alt</code>. A imagem preenche 100% do círculo e é recortada pelo
        centro.
      </GptDocCard>
      <GptDocCard icon="🎨" title="Tom">
        <code>tone</code> escolhe entre <code>bg/brand</code> e <code>bg/inverse</code>; o texto
        usa <code>text/inverse</code> nos dois casos.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Tamanhos e Tons"
      description="As quatro variantes publicadas nos dois tons, renderizadas pelo componente real."
      barColor="#5856D6"
    />
    <GptDocStage label="Tom brand — as 4 variantes do Figma">
      {TAMANHOS.map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Avatar size={size} initials="U" />
          <div style={{ fontSize: 11, color: '#475157', marginTop: 8 }}>
            {size} · {gptSizing[`avatar${size.toUpperCase()}` as keyof typeof gptSizing]}px
          </div>
        </div>
      ))}
    </GptDocStage>
    <GptDocStage label="Tom inverse — avatar do assistente">
      {TAMANHOS.map((size) => (
        <Avatar key={size} size={size} tone="inverse" initials="AI" />
      ))}
    </GptDocStage>
    <GptDocStage label="Com imagem e com iniciais de duas letras">
      <Avatar
        size="xl"
        src={gptAvatars.lucas}
        alt="Retrato de uma pessoa sorrindo"
      />
      <Avatar size="xl" initials="LS" />
      <Avatar size="lg" initials="G" />
      <Avatar size="sm" tone="inverse" initials="AI" />
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de identidade visual."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Preencher alt sempre que houver src — o avatar passa a carregar informação.',
        'Manter no máximo duas letras nas iniciais: os corpos foram medidos para uma.',
        'Usar o tom inverse apenas para o assistente, preservando o contraste de papéis na conversa.',
        'Escolher o tamanho pela densidade da lista: sm em linhas compactas, xl em cabeçalhos de perfil.',
      ]}
      donts={[
        'Definir width/height por fora para criar um diâmetro intermediário.',
        'Colocar imagem sem alt e sem iniciais — o avatar fica sem nenhuma leitura.',
        'Aplicar contorno colorido para indicar estado; a biblioteca não publica anel de avatar.',
        'Usar o tom brand para o assistente, o que apaga a distinção entre usuário e IA.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="bg/brand muda de purple/600 para purple/500 no Dark; bg/inverse inverte por completo."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher>
      {() => (
        <>
          {TAMANHOS.map((size) => (
            <Avatar key={size} size={size} initials="U" />
          ))}
          <Avatar size="lg" tone="inverse" initials="AI" />
        </>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Avatar."
      barColor="#5856D6"
    />
    <GptDocPropsTable
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
          description: 'Superfície do círculo: bg/brand ou bg/inverse.',
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
  title: 'ChatGPT/Componentes/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'radio', options: TAMANHOS, description: 'Diâmetro do avatar.' },
    tone: { control: 'radio', options: ['brand', 'inverse'], description: 'Superfície do círculo.' },
    initials: { control: 'text', description: 'Iniciais exibidas sem imagem.' },
    src: { control: 'text', description: 'URL da imagem de perfil.' },
    alt: { control: 'text', description: 'Texto alternativo da imagem.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    size: 'md',
    tone: 'brand',
    initials: 'U',
    src: '',
    alt: '',
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
      <Avatar {...args} src={args.src || undefined} />
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
        alignItems: 'flex-start',
        gap: 16,
        padding: 16,
        border: '1px solid #E4E8E9',
        borderRadius: 5,
      }}
    >
      {TAMANHOS.map((size) => (
        <Avatar key={size} size={size} initials="U" />
      ))}
    </div>
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
          <div style={{ fontSize: 11, color: '#475157', marginTop: 8 }}>
            {gptSizing[`avatar${size.toUpperCase()}` as keyof typeof gptSizing]}px ·{' '}
            {CORPOS[size]}px
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
      <Avatar size="xl" tone="inverse" initials="AI" />
    </div>
  ),
};
