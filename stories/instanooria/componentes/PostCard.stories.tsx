import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PostCard } from '../../../src/instanooria/components/PostCard';
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
 * Publicação completa de demonstração, usada nas seções de documentação.
 */
const DemoPost: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => (
  <PostCard theme={theme}>
    <PostCard.Header
      username="joshua_l"
      location="Tóquio, Japão"
      avatarSrc={instaAvatars.joshua_l}
      verified
      theme={theme}
      onMore={() => undefined}
    />
    <PostCard.Media
      src={instaPhotos.tokyo}
      alt="Cruzamento de Shibuya ao entardecer"
      currentIndex={1}
      totalCount={3}
      theme={theme}
    />
    <PostCard.Actions liked currentIndex={1} totalCount={3} theme={theme} />
    <PostCard.Likes
      avatarSrc={instaAvatars.craig_love}
      username="craig_love"
      count={44686}
      theme={theme}
    />
    <PostCard.Caption username="joshua_l" theme={theme}>
      O jogo no Japão foi incrível e eu quero compartilhar algumas fotos.
    </PostCard.Caption>
    <PostCard.Timestamp theme={theme}>19 de setembro</PostCard.Timestamp>
  </PostCard>
);

/**
 * Página de documentação rica do componente PostCard.
 */
const PostCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Conteúdo"
      title="PostCard"
      description="Publicação do Feed montada por composição modular, espelhando a anatomia do frame “Post” do Figma: cabeçalho de 54px, mídia quadrada de 375px e rodapé de 147px com ações, prova social, legenda e data. Cada zona é um subcomponente independente, permitindo montar variações sem duplicar código."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Por que a publicação é composta e não configurada por props."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🧩" title="Composição modular">
        Seis subcomponentes — <code>Header</code>, <code>Media</code>, <code>Actions</code>,{' '}
        <code>Likes</code>, <code>Caption</code> e <code>Timestamp</code> — que podem ser omitidos ou
        reordenados conforme o tipo de publicação.
      </InstaDocCard>
      <InstaDocCard icon="🖼️" title="Mídia quadrada por padrão">
        A proporção 1:1 é a do arquivo de design, mas <code>aspectRatio</code> permite retrato ou
        paisagem sem quebrar o restante da estrutura.
      </InstaDocCard>
      <InstaDocCard icon="🎠" title="Carrossel integrado">
        Informando <code>currentIndex</code> e <code>totalCount</code>, o contador aparece sobre a
        mídia e a paginação em pontos surge no centro da barra de ações.
      </InstaDocCard>
      <InstaDocCard icon="❤️" title="Estados de interação">
        <code>liked</code> troca o coração vazado pelo preenchido em vermelho de marca;{' '}
        <code>saved</code> controla o marcador. Ambos expõem <code>aria-pressed</code>.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do frame Post do arquivo."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1647"
      frameName="Instagram Main → Post"
      specs={[
        { label: 'Altura total', value: '576px' },
        { label: 'Post / Top', value: '375 × 54px' },
        { label: 'Mídia', value: '375 × 375px' },
        { label: 'Post / Bottom', value: '375 × 147px' },
        { label: 'Avatar do autor', value: '32px' },
        { label: 'Contador de mídia', value: '34 × 26px · top 14px' },
      ]}
    />
    <p style={{ fontSize: 13, color: '#475157', lineHeight: 1.7, marginTop: -16, marginBottom: 32 }}>
      <strong>Desvio documentado:</strong> no arquivo original a data de publicação está vinculada a{' '}
      <code>color/text/primary</code>. No Instanooria ela usa{' '}
      <code>--insta-color-text-secondary</code>, preservando a hierarquia de leitura entre legenda e
      metadado exigida pelas diretrizes de contraste do design system. Todos os demais vínculos de
      cor são idênticos aos do Figma.
    </p>

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="As seis zonas de customização da publicação."
    />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 375px) 1fr',
        gap: 24,
        alignItems: 'start',
        marginBottom: 32,
      }}
    >
      <div style={{ border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <DemoPost />
      </div>
      <ol style={{ margin: 0, paddingLeft: 20, color: '#475157', fontSize: 13.5, lineHeight: 1.9 }}>
        <li>
          <strong>PostCard.Header</strong> — avatar, nome, selo oficial, localização e menu de opções.
        </li>
        <li>
          <strong>PostCard.Media</strong> — imagem quadrada com contador de carrossel opcional.
        </li>
        <li>
          <strong>PostCard.Actions</strong> — curtir, comentar, compartilhar, salvar e paginação.
        </li>
        <li>
          <strong>PostCard.Likes</strong> — prova social com avatar de 17px e contagem em negrito.
        </li>
        <li>
          <strong>PostCard.Caption</strong> — legenda com o autor em negrito antes do texto.
        </li>
        <li>
          <strong>PostCard.Timestamp</strong> — data de publicação em texto secundário.
        </li>
      </ol>
    </div>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Configurações de conteúdo e de interação da publicação."
    />
    <InstaDocStage label="Estados de curtida e salvamento" align="flex-start">
      <div style={{ width: 340, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <PostCard>
          <PostCard.Header username="zackjohn" avatarSrc={instaAvatars.zackjohn} />
          <PostCard.Media src={instaPhotos.mountains} alt="Montanhas" />
          <PostCard.Actions liked={false} saved={false} />
        </PostCard>
      </div>
      <div style={{ width: 340, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <PostCard>
          <PostCard.Header username="zackjohn" avatarSrc={instaAvatars.zackjohn} />
          <PostCard.Media src={instaPhotos.mountains} alt="Montanhas" />
          <PostCard.Actions liked saved />
        </PostCard>
      </div>
    </InstaDocStage>

    <InstaDocStage label="Publicação simples, sem carrossel nem localização" align="flex-start">
      <div style={{ width: 340, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <PostCard>
          <PostCard.Header
            username="karennne"
            avatarSrc={instaAvatars.karennne}
            ring="story"
            onMore={() => undefined}
          />
          <PostCard.Media src={instaPhotos.coffee} alt="Café da manhã" />
          <PostCard.Actions />
          <PostCard.Caption username="karennne">Sábado devagar ☕</PostCard.Caption>
          <PostCard.Timestamp>Há 2 horas</PostCard.Timestamp>
        </PostCard>
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de composição verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Manter a ordem canônica das zonas: Header, Media, Actions, Likes, Caption, Timestamp.',
        'Informar currentIndex e totalCount juntos — o contador só aparece com os dois.',
        'Descrever a mídia em alt: é o conteúdo principal da publicação.',
        'Usar ring="story" no avatar do autor quando ele tiver story ativo.',
      ]}
      donts={[
        'Colocar a legenda acima da mídia ou as ações abaixo da data.',
        'Exibir o contador de carrossel em publicações de imagem única.',
        'Usar o coração preenchido sem que a pessoa tenha curtido.',
        'Alterar o padding lateral de 15px de forma independente por zona.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Todas as seis zonas respondem simultaneamente à troca de tema."
    />
    <InstaDocThemeSwitcher padding={0}>
      {(activeTheme) => (
        <div style={{ width: 375 }}>
          <DemoPost theme={activeTheme} />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público de cada subcomponente."
    />
    <InstaDocPropsTable
      title="PostCard"
      rows={[
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Zonas compostas da publicação.',
        },
      ]}
    />
    <InstaDocPropsTable
      title="PostCard.Header"
      rows={[
        { name: 'username', type: 'string', description: 'Nome de usuário do autor. Obrigatório.' },
        { name: 'location', type: 'string', description: 'Localização exibida abaixo do nome.' },
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do autor.' },
        { name: 'initials', type: 'string', description: 'Iniciais exibidas sem avatar.' },
        {
          name: 'verified',
          type: 'boolean',
          default: 'false',
          description: 'Exibe o selo azul de conta oficial.',
        },
        {
          name: 'ring',
          type: "'none' | 'story' | 'live' | 'seen'",
          default: "'none'",
          description: 'Anel aplicado ao avatar do autor.',
        },
        {
          name: 'onMore',
          type: '(event: React.MouseEvent) => void',
          description: 'Callback do botão de opções (…). Sem ele, o botão não é renderizado.',
        },
        {
          name: 'moreLabel',
          type: 'string',
          default: "'Opções da publicação'",
          description: 'Rótulo acessível do botão de opções.',
        },
      ]}
    />
    <InstaDocPropsTable
      title="PostCard.Media"
      rows={[
        { name: 'src', type: 'string', description: 'URL da imagem exibida. Obrigatório.' },
        { name: 'alt', type: 'string', description: 'Texto alternativo da imagem. Obrigatório.' },
        {
          name: 'currentIndex',
          type: 'number',
          description: 'Índice do item atual no carrossel, começando em 1.',
        },
        {
          name: 'totalCount',
          type: 'number',
          description: 'Total de itens. Com valor maior que 1, exibe o contador.',
        },
        {
          name: 'aspectRatio',
          type: 'number',
          default: '1',
          description: 'Proporção largura ÷ altura da mídia.',
        },
      ]}
    />
    <InstaDocPropsTable
      title="PostCard.Actions"
      rows={[
        {
          name: 'liked',
          type: 'boolean',
          default: 'false',
          description: 'Estado de curtida; troca o coração e aplica o vermelho de marca.',
        },
        {
          name: 'saved',
          type: 'boolean',
          default: 'false',
          description: 'Estado de salvamento da publicação.',
        },
        {
          name: 'currentIndex',
          type: 'number',
          default: '1',
          description: 'Item atual do carrossel, refletido na paginação.',
        },
        {
          name: 'totalCount',
          type: 'number',
          default: '1',
          description: 'Total de itens; acima de 1, exibe a paginação em pontos.',
        },
        {
          name: 'onLike / onComment / onShare / onSave',
          type: '(event: React.MouseEvent) => void',
          description: 'Callbacks das quatro ações da publicação.',
        },
      ]}
    />
    <InstaDocPropsTable
      title="PostCard.Likes · Caption · Timestamp"
      rows={[
        {
          name: 'Likes.avatarSrc',
          type: 'string',
          description: 'Avatar de 17px do primeiro curtidor.',
        },
        { name: 'Likes.username', type: 'string', description: 'Nome do primeiro curtidor.' },
        { name: 'Likes.count', type: 'number', description: 'Quantidade de curtidas restantes.' },
        {
          name: 'Caption.username',
          type: 'string',
          description: 'Autor exibido em negrito antes do texto da legenda.',
        },
        {
          name: 'Timestamp.children',
          type: 'React.ReactNode',
          description: 'Texto da data de publicação.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PostCard> = {
  title: 'Instanooria/Componentes/PostCard',
  component: PostCard,
  parameters: { layout: 'padded' },
  argTypes: {
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: { theme: 'light' },
};

export default meta;

type Story = StoryObj<typeof PostCard>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PostCardDocumentationPage />,
};

/**
 * Playground com todas as propriedades das seis zonas expostas.
 */
export const Playground: StoryObj<{
  theme: 'light' | 'dark';
  username: string;
  location: string;
  verified: boolean;
  ring: 'none' | 'story' | 'live' | 'seen';
  caption: string;
  timestamp: string;
  likesUsername: string;
  likesCount: number;
  currentIndex: number;
  totalCount: number;
  liked: boolean;
  saved: boolean;
  aspectRatio: number;
}> = {
  name: '🕹️ 1. Playground do PostCard',
  argTypes: {
    theme: { control: 'radio', options: ['light', 'dark'] },
    username: { control: 'text' },
    location: { control: 'text' },
    verified: { control: 'boolean' },
    ring: { control: 'radio', options: ['none', 'story', 'live', 'seen'] },
    caption: { control: 'text' },
    timestamp: { control: 'text' },
    likesUsername: { control: 'text' },
    likesCount: { control: 'number' },
    currentIndex: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    totalCount: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    liked: { control: 'boolean' },
    saved: { control: 'boolean' },
    aspectRatio: { control: { type: 'range', min: 0.6, max: 1.8, step: 0.05 } },
  },
  args: {
    theme: 'light',
    username: 'joshua_l',
    location: 'Tóquio, Japão',
    verified: true,
    ring: 'story',
    caption: 'O jogo no Japão foi incrível e eu quero compartilhar algumas fotos.',
    timestamp: '19 de setembro',
    likesUsername: 'craig_love',
    likesCount: 44686,
    currentIndex: 1,
    totalCount: 3,
    liked: true,
    saved: false,
    aspectRatio: 1,
  },
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}
    >
      <PostCard theme={args.theme}>
        <PostCard.Header
          username={args.username}
          location={args.location || undefined}
          avatarSrc={instaAvatars.joshua_l}
          verified={args.verified}
          ring={args.ring}
          theme={args.theme}
          onMore={() => undefined}
        />
        <PostCard.Media
          src={instaPhotos.tokyo}
          alt="Cruzamento de Shibuya ao entardecer"
          currentIndex={args.currentIndex}
          totalCount={args.totalCount}
          aspectRatio={args.aspectRatio}
          theme={args.theme}
        />
        <PostCard.Actions
          liked={args.liked}
          saved={args.saved}
          currentIndex={args.currentIndex}
          totalCount={args.totalCount}
          theme={args.theme}
        />
        <PostCard.Likes
          avatarSrc={instaAvatars.craig_love}
          username={args.likesUsername}
          count={args.likesCount}
          theme={args.theme}
        />
        <PostCard.Caption username={args.username} theme={args.theme}>
          {args.caption}
        </PostCard.Caption>
        <PostCard.Timestamp theme={args.theme}>{args.timestamp}</PostCard.Timestamp>
      </PostCard>
    </div>
  ),
};

/**
 * Réplica fiel do frame oficial "Post" do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <DemoPost />
    </div>
  ),
};

/**
 * Publicação com interação real de curtir e salvar.
 */
export const Interativa: Story = {
  name: 'Estados',
  render: () => {
    const InteractivePost = () => {
      const [liked, setLiked] = useState(false);
      const [saved, setSaved] = useState(false);
      const [index, setIndex] = useState(1);

      return (
        <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
          <PostCard>
            <PostCard.Header
              username="craig_love"
              location="Lisboa, Portugal"
              avatarSrc={instaAvatars.craig_love}
              ring="story"
              onMore={() => undefined}
            />
            <PostCard.Media
              src={instaPhotos.city}
              alt="Cidade ao entardecer"
              currentIndex={index}
              totalCount={3}
            />
            <PostCard.Actions
              liked={liked}
              saved={saved}
              currentIndex={index}
              totalCount={3}
              onLike={() => setLiked((value) => !value)}
              onSave={() => setSaved((value) => !value)}
              onComment={() => setIndex((value) => (value % 3) + 1)}
            />
            <PostCard.Likes
              avatarSrc={instaAvatars.karennne}
              username="karennne"
              count={liked ? 1281 : 1280}
            />
            <PostCard.Caption username="craig_love">
              Fim de tarde perfeito. Toque no coração para curtir e no balão para avançar o carrossel.
            </PostCard.Caption>
            <PostCard.Timestamp>Há 3 horas</PostCard.Timestamp>
          </PostCard>
        </div>
      );
    };

    return <InteractivePost />;
  },
};

/**
 * Composição modular com zonas omitidas.
 */
export const ComposicaoModular: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ width: 320, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <PostCard>
          <PostCard.Header username="zackjohn" avatarSrc={instaAvatars.zackjohn} />
          <PostCard.Media src={instaPhotos.forest} alt="Floresta" />
          <PostCard.Actions />
        </PostCard>
      </div>
      <div style={{ width: 320, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <PostCard>
          <PostCard.Media src={instaPhotos.desk} alt="Estação de trabalho" aspectRatio={1.4} />
          <PostCard.Actions saved />
          <PostCard.Caption username="kiero_d">Setup novo.</PostCard.Caption>
        </PostCard>
      </div>
    </div>
  ),
};
