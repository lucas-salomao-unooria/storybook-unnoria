import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { PostCard } from '../../../src/unoovista/components/PostCard';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocCard,
  UnvDocGrid,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocStage,
  UnvDocThemeSwitcher,
  UnvDocPropsTable,
} from '../../../.storybook/components';
import { unvAvatars, unvPhotos } from '../fixtures';

const BAR = '#716C98';

/** Uma `src` que não existe, para demonstrar o estado de erro. */
const IMAGEM_QUEBRADA = '/unoovista/imagem-que-nao-existe.jpg';

type Tema = 'light' | 'dark';

/**
 * Cartão de texto usado como slide quando não há fotografia.
 */
const CartaoDeTexto: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      backgroundColor: 'var(--unv-color-background-secondary)',
      color: 'var(--unv-color-text-primary)',
      fontFamily: 'var(--unv-font-sans)',
      fontSize: 22,
      fontWeight: 600,
      lineHeight: 1.3,
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

/**
 * Carrossel com um slide de texto, sem fotografia, entre duas fotografias.
 */
const CarrosselComCartao: React.FC<{ theme?: Tema }> = ({ theme }) => {
  const [indice, setIndice] = useState(2);

  return (
    <PostCard theme={theme}>
      <PostCard.Header username="gremio.escola" avatarSrc={unvAvatars.lucasMar} theme={theme} />
      {indice === 2 ? (
        <PostCard.Media
          alt="Cartão: o grêmio abriu inscrições"
          currentIndex={2}
          totalCount={3}
          theme={theme}
        >
          <CartaoDeTexto>O grêmio abriu inscrições para a feira de ciências!</CartaoDeTexto>
        </PostCard.Media>
      ) : (
        <PostCard.Media
          src={indice === 1 ? unvPhotos.turbines : unvPhotos.desk}
          alt={indice === 1 ? 'Turbinas eólicas' : 'Estação de trabalho'}
          currentIndex={indice}
          totalCount={3}
          theme={theme}
        />
      )}
      <PostCard.Actions
        currentIndex={indice}
        totalCount={3}
        theme={theme}
        onComment={() => setIndice((valor) => (valor % 3) + 1)}
      />
    </PostCard>
  );
};

/**
 * Publicação completa de demonstração, usada nas seções de documentação.
 */
const DemoPost: React.FC<{ theme?: Tema }> = ({ theme }) => (
  <PostCard theme={theme}>
    <PostCard.Header
      username="joao.lima"
      location="Florianópolis, SC"
      avatarSrc={unvAvatars.caioDev}
      verified
      theme={theme}
      onMore={() => undefined}
    />
    <PostCard.Media
      src={unvPhotos.tokyo}
      alt="Cruzamento movimentado ao entardecer"
      currentIndex={1}
      totalCount={3}
      theme={theme}
    />
    <PostCard.Actions liked currentIndex={1} totalCount={3} theme={theme} />
    <PostCard.Likes
      avatarSrc={unvAvatars.biaRaiz}
      username="marina.costa"
      count={44686}
      theme={theme}
    />
    <PostCard.Caption username="joao.lima" theme={theme}>
      O fim de semana foi incrível e eu quero compartilhar algumas fotos.
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
      badgeBrand="Unoovista"
      category="Componentes • Conteúdo"
      title="PostCard"
      description="Publicação do feed montada por composição modular, num cartão único de superfície primária: cabeçalho do autor, mídia de cantos arredondados, barra de ações em pílula sobreposta à base da mídia, curtidas, legenda e data. Cada zona é um subcomponente independente, e a separação entre elas vem de espaço e de superfície, não de fios de largura total."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Por que a publicação é composta e não configurada por props."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🧩" title="Composição modular">
        Seis subcomponentes — <code>Header</code>, <code>Media</code>, <code>Actions</code>,{' '}
        <code>Likes</code>, <code>Caption</code> e <code>Timestamp</code> — que podem ser omitidos ou
        reordenados conforme o tipo de publicação.
      </UnvDocCard>
      <UnvDocCard icon="💊" title="Ações na pílula">
        Quando <code>PostCard.Actions</code> vem logo depois de <code>PostCard.Media</code>, ela vira
        uma pílula elevada sobre a base da mídia: curtir, comentar e compartilhar à esquerda, salvar
        à direita. Solta, é uma linha simples.
      </UnvDocCard>
      <UnvDocCard icon="🎠" title="Carrossel integrado">
        Informando <code>currentIndex</code> e <code>totalCount</code>, a mídia mostra o contador
        numérico e uma cápsula de pontos acima da pílula. O ponto ativo é mais comprido que os outros.
      </UnvDocCard>
      <UnvDocCard icon="📝" title="Slide sem fotografia">
        Sem <code>src</code>, <code>PostCard.Media</code> exibe <code>children</code> como o slide —
        um cartão de texto ou o desenho do produto quando a imagem não existe.
      </UnvDocCard>
      <UnvDocCard icon="🔁" title="Estado de erro">
        Uma <code>src</code> que não carrega vira a mensagem <code>errorLabel</code>, o que a imagem
        mostrava (<code>errorDescription</code>, por padrão o <code>alt</code>) e o botão “Tentar
        novamente”, que refaz o carregamento e chama <code>onRetry</code>.
      </UnvDocCard>
      <UnvDocCard icon="❤️" title="Curtido e salvo">
        <code>liked</code> troca o coração vazado pelo preenchido em <code>--unv-color-brand-like</code>;{' '}
        <code>saved</code> preenche o marcador. Os dois ganham um círculo de superfície terciária e
        expõem <code>aria-pressed</code>.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UnvDocSpecs
      component="PostCard"
      layout="Cartão · raio 16px · recuo 16px"
      specs={[
        { label: 'Cartão', value: '--unv-color-background-primary · radius-l' },
        { label: 'Mídia', value: 'radius-m (12px) · 1:1 por padrão' },
        { label: 'Pílula de ações', value: 'elevated · radius-full · 52px' },
        { label: 'Botões de ação', value: '44 × 44px (touch-target)' },
        { label: 'Avatar do autor', value: '40px' },
        { label: 'Elevação', value: '--unv-elevation-overlay' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Pílula sobreposta por margem negativa',
          detail:
            'a barra de ações continua um irmão de PostCard.Media; quando vem logo depois dela (seletor de irmão adjacente), uma margem negativa a puxa 12px para dentro da base da mídia. Fora dessa ordem, ou sem mídia, a mesma barra é uma linha simples de botões circulares — o uso solto continua renderizando bem.',
        },
        {
          subject: 'Pontos do carrossel dentro da mídia',
          detail:
            'a mídia desenha uma cápsula de pontos em background-elevated com a elevação de sobreposição, acima da pílula. O ponto ativo é mais comprido (20px contra 8px) — uma pista de forma, não só de cor. Quando a mídia mostra os pontos, a barra de ações não os repete; sem eles na mídia, a barra continua mostrando a paginação como antes. O contador numérico (“2/3”) permanece no canto superior direito.',
        },
        {
          subject: 'Curtido e salvo sobre círculo de fundo',
          detail:
            'o coração de brand-like mede 4,74:1 sobre a pílula no tema claro e 4,07:1 no escuro, acima dos 3:1 de gráfico. O estado é reforçado por um círculo atrás do botão — terciário na linha solta, secundário sobre a pílula (a terciária coincide com a elevada no tema escuro) — e pelo glifo preenchido; aria-pressed já o carrega sem depender da cor.',
        },
        {
          subject: 'Anel de foco',
          detail:
            'o anel de foco é de 2px em action-primary, que mede 4,88:1 sobre a superfície elevada no tema claro e 4,80:1 no escuro.',
        },
        {
          subject: 'Local e data em texto secundário',
          detail:
            'a localização e o carimbo de data usam --unv-color-text-secondary (8,1:1 no claro, 12,1:1 no escuro sobre o cartão), para separar a hierarquia entre nome e metadado.',
        },
        {
          subject: 'Selo e menu de opções',
          detail:
            'o selo de conta oficial (16px) usa --unv-color-brand-verified (3,6:1 no claro, 7,3:1 no escuro sobre o cartão, gráfico ≥ 3:1). O menu de opções é um círculo de 44px em --unv-color-fill-field, o mesmo botão de ação das barras superiores.',
        },
        {
          subject: 'Slide sem fotografia e estado de erro',
          detail:
            'são extensões da mídia. Ocupam a mesma caixa e a mesma superfície terciária; com a pílula por cima, o conteúdo do erro ganha folga na base. A mensagem e a descrição usam text-primary (13,1:1 sobre o terciário no claro, 10,4:1 no escuro).',
        },
        {
          subject: 'Tema herdado',
          detail:
            'theme é opcional e não tem valor padrão: sem ele, a publicação herda data-unv-theme do contêiner e troca de tema sem prop alguma.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="As seis zonas de customização da publicação."
    />
    <UnvDocStage surface="secondary" align="flex-start" padding={24} gap={32}>
      <div style={{ width: 375 }}>
        <DemoPost />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UnvDocAnatomy
          zones={[
            {
              name: 'PostCard.Header',
              role: 'Avatar de 40px (squircle com anel de história), nome, selo de conta oficial, local e menu de opções.',
              token: '--unv-color-text-primary · --unv-color-brand-verified · --unv-color-fill-field',
            },
            {
              name: 'PostCard.Media',
              role: 'Imagem de cantos arredondados, com contador numérico e cápsula de pontos do carrossel.',
              token: '--unv-radius-m · --unv-color-background-tertiary',
            },
            {
              name: 'PostCard.Actions',
              role: 'Pílula elevada sobre a base da mídia: curtir, comentar e compartilhar; salvar à direita.',
              token: '--unv-color-background-elevated · --unv-elevation-overlay',
            },
            {
              name: 'PostCard.Likes',
              role: 'Prova social com avatar pequeno e contagem em negrito.',
              token: '--unv-font-label-md-size',
            },
            {
              name: 'PostCard.Caption',
              role: 'Legenda com o autor em negrito antes do texto.',
              token: '--unv-color-text-primary',
            },
            {
              name: 'PostCard.Timestamp',
              role: 'Data de publicação em texto secundário.',
              token: '--unv-color-text-secondary',
            },
          ]}
        />
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Configurações de conteúdo e de interação da publicação."
    />
    <UnvDocStage label="Estados de curtida e salvamento" surface="secondary" align="flex-start">
      <div style={{ width: 340 }}>
        <PostCard>
          <PostCard.Header username="bruno.alves" avatarSrc={unvAvatars.theoAndrade} />
          <PostCard.Media src={unvPhotos.mountains} alt="Montanhas" />
          <PostCard.Actions liked={false} saved={false} />
        </PostCard>
      </div>
      <div style={{ width: 340 }}>
        <PostCard>
          <PostCard.Header username="bruno.alves" avatarSrc={unvAvatars.theoAndrade} />
          <PostCard.Media src={unvPhotos.mountains} alt="Montanhas" />
          <PostCard.Actions liked saved />
        </PostCard>
      </div>
    </UnvDocStage>

    <UnvDocStage
      label="Publicação simples, sem carrossel nem local"
      surface="secondary"
      align="flex-start"
    >
      <div style={{ width: 340 }}>
        <PostCard>
          <PostCard.Header
            username="camila.reis"
            avatarSrc={unvAvatars.marinaLuz}
            ring="story"
            onMore={() => undefined}
          />
          <PostCard.Media src={unvPhotos.coffee} alt="Café da manhã" />
          <PostCard.Actions />
          <PostCard.Caption username="camila.reis">Sábado devagar.</PostCard.Caption>
          <PostCard.Timestamp>Há 2 horas</PostCard.Timestamp>
        </PostCard>
      </div>
    </UnvDocStage>

    <UnvDocStage label="Barra de ações solta (fora do contexto de mídia)" surface="secondary" align="flex-start">
      <div style={{ width: 340 }}>
        <PostCard>
          <PostCard.Caption username="lucas.prado">Uma publicação só de texto.</PostCard.Caption>
          <PostCard.Actions liked />
          <PostCard.Timestamp>Ontem</PostCard.Timestamp>
        </PostCard>
      </div>
    </UnvDocStage>

    <UnvDocStage label="Slide sem fotografia e estado de erro" surface="secondary" align="flex-start">
      <div style={{ width: 340 }}>
        <CarrosselComCartao />
      </div>
      <div style={{ width: 340 }}>
        <PostCard>
          <PostCard.Header username="bruno.alves" avatarSrc={unvAvatars.theoAndrade} />
          <PostCard.Media src={IMAGEM_QUEBRADA} alt="Publicação que não carregou" />
          <PostCard.Actions />
        </PostCard>
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Boas práticas"
      description="Regras de composição do cartão."
    />
    <UnvDocPractices
      dos={[
        'Manter a ordem canônica das zonas: Header, Media, Actions, Likes, Caption, Timestamp.',
        'Colocar PostCard.Actions imediatamente depois de PostCard.Media para obter a pílula sobreposta.',
        'Informar currentIndex e totalCount juntos: o contador e os pontos só aparecem com os dois.',
        'Descrever a mídia em alt: é o conteúdo principal da publicação.',
        'Usar ring="story" no avatar do autor quando ele tiver história ativa.',
      ]}
      donts={[
        'Colocar a legenda acima da mídia ou as ações abaixo da data.',
        'Inserir outra zona entre Media e Actions, o que desfaz a sobreposição.',
        'Exibir o contador de carrossel em publicações de imagem única.',
        'Usar o coração preenchido sem que a pessoa tenha curtido.',
        'Trocar a elevação da pílula por sombras avulsas.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Todas as seis zonas respondem simultaneamente à troca de tema; a pílula, o círculo de curtido e os pontos usam degraus próprios de cada tema."
    />
    <UnvDocThemeSwitcher surface="secondary">
      {(activeTheme) => (
        <div style={{ width: 375 }}>
          <DemoPost theme={activeTheme} />
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público de cada subcomponente."
    />
    <UnvDocPropsTable
      title="PostCard"
      rows={[
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Tema usado para resolver as variáveis de cor. Sem valor, herda o do contêiner.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Zonas compostas da publicação.',
        },
      ]}
    />
    <UnvDocPropsTable
      title="PostCard.Header"
      rows={[
        { name: 'username', type: 'string', description: 'Nome de usuário do autor. Obrigatório.' },
        { name: 'location', type: 'string', description: 'Local exibido abaixo do nome.' },
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do autor.' },
        { name: 'initials', type: 'string', description: 'Iniciais exibidas sem avatar.' },
        {
          name: 'verified',
          type: 'boolean',
          default: 'false',
          description: 'Exibe o selo de conta oficial.',
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
          description: 'Callback do botão de opções. Sem ele, o botão não é renderizado.',
        },
        {
          name: 'moreLabel',
          type: 'string',
          default: "'Opções da publicação'",
          description: 'Rótulo acessível do botão de opções.',
        },
      ]}
    />
    <UnvDocPropsTable
      title="PostCard.Media"
      rows={[
        { name: 'src', type: 'string', description: 'URL da imagem. Ausente, children é o slide.' },
        {
          name: 'alt',
          type: 'string',
          description: 'Texto alternativo — obrigatório com src. Sem src, nomeia o slide (role="group").',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo do slide quando não há src.' },
        {
          name: 'onRetry',
          type: '() => void',
          description: 'Toque em “Tentar novamente”. A mídia já refaz o carregamento.',
        },
        { name: 'onMediaError', type: '() => void', description: 'A imagem de src falhou ao carregar.' },
        {
          name: 'errorLabel',
          type: 'React.ReactNode',
          default: "'Não foi possível carregar a imagem.'",
          description: 'Texto do estado de erro.',
        },
        {
          name: 'errorDescription',
          type: 'React.ReactNode',
          default: 'alt',
          description: 'O que a imagem mostrava, sob a mensagem de erro. Padrão: o alt; null esconde.',
        },
        {
          name: 'retryLabel',
          type: 'React.ReactNode',
          default: "'Tentar novamente'",
          description: 'Rótulo do botão do estado de erro.',
        },
        {
          name: 'currentIndex',
          type: 'number',
          description: 'Índice do item atual no carrossel, começando em 1.',
        },
        {
          name: 'totalCount',
          type: 'number',
          description: 'Total de itens. Com valor maior que 1, exibe o contador e os pontos.',
        },
        {
          name: 'aspectRatio',
          type: 'number',
          default: '1',
          description: 'Proporção largura ÷ altura da mídia.',
        },
      ]}
    />
    <UnvDocPropsTable
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
          description: 'Item atual do carrossel, refletido na paginação quando a mídia não a mostra.',
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
    <UnvDocPropsTable
      title="PostCard.Likes · Caption · Timestamp"
      rows={[
        {
          name: 'Likes.avatarSrc',
          type: 'string',
          description: 'Avatar de 20px do primeiro curtidor.',
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
  title: 'Unoovista/Componentes/PostCard',
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
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PostCardDocumentationPage />,
};

/**
 * Playground com todas as propriedades das seis zonas expostas.
 */
export const Playground: StoryObj<{
  theme: Tema;
  username: string;
  location: string;
  verified: boolean;
  ring: 'none' | 'story' | 'live' | 'seen';
  moreLabel: string;
  caption: string;
  timestamp: string;
  likesUsername: string;
  likesCount: number;
  currentIndex: number;
  totalCount: number;
  liked: boolean;
  saved: boolean;
  aspectRatio: number;
  errorLabel: string;
  retryLabel: string;
}> = {
  name: '🕹️ 1. Playground do PostCard',
  argTypes: {
    theme: { control: 'radio', options: ['light', 'dark'] },
    username: { control: 'text' },
    location: { control: 'text' },
    verified: { control: 'boolean' },
    ring: { control: 'radio', options: ['none', 'story', 'live', 'seen'] },
    moreLabel: { control: 'text' },
    caption: { control: 'text' },
    timestamp: { control: 'text' },
    likesUsername: { control: 'text' },
    likesCount: { control: 'number' },
    currentIndex: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    totalCount: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    liked: { control: 'boolean' },
    saved: { control: 'boolean' },
    aspectRatio: { control: { type: 'range', min: 0.6, max: 1.8, step: 0.05 } },
    errorLabel: { control: 'text' },
    retryLabel: { control: 'text' },
  },
  args: {
    theme: 'light',
    username: 'joao.lima',
    location: 'Florianópolis, SC',
    verified: true,
    ring: 'story',
    moreLabel: 'Opções da publicação',
    caption: 'O fim de semana foi incrível e eu quero compartilhar algumas fotos.',
    timestamp: '19 de setembro',
    likesUsername: 'marina.costa',
    likesCount: 44686,
    currentIndex: 1,
    totalCount: 3,
    liked: true,
    saved: false,
    aspectRatio: 1,
    errorLabel: 'Não foi possível carregar a imagem.',
    retryLabel: 'Tentar novamente',
  },
  render: (args) => (
    <UnvDocStage theme={args.theme} surface="secondary" padding={24}>
      <div style={{ width: 375 }}>
        <PostCard theme={args.theme}>
          <PostCard.Header
            username={args.username}
            location={args.location || undefined}
            avatarSrc={unvAvatars.caioDev}
            verified={args.verified}
            ring={args.ring}
            moreLabel={args.moreLabel}
            theme={args.theme}
            onMore={() => undefined}
          />
          <PostCard.Media
            src={unvPhotos.tokyo}
            alt="Cruzamento movimentado ao entardecer"
            currentIndex={args.currentIndex}
            totalCount={args.totalCount}
            aspectRatio={args.aspectRatio}
            errorLabel={args.errorLabel}
            retryLabel={args.retryLabel}
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
            avatarSrc={unvAvatars.biaRaiz}
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
    </UnvDocStage>
  ),
};

/**
 * Publicação completa: cabeçalho, mídia com pílula de ações, curtidas, legenda e data.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial: publicação completa',
  render: () => (
    <UnvDocStage surface="secondary" padding={24}>
      <div style={{ width: 375 }}>
        <DemoPost />
      </div>
    </UnvDocStage>
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
        <UnvDocStage surface="secondary" padding={24}>
          <div style={{ width: 375 }}>
            <PostCard>
              <PostCard.Header
                username="marina.costa"
                location="Lisboa, Portugal"
                avatarSrc={unvAvatars.biaRaiz}
                ring="story"
                onMore={() => undefined}
              />
              <PostCard.Media
                src={unvPhotos.city}
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
                avatarSrc={unvAvatars.marinaLuz}
                username="camila.reis"
                count={liked ? 1281 : 1280}
              />
              <PostCard.Caption username="marina.costa">
                Fim de tarde perfeito. Toque no coração para curtir e no balão para avançar o
                carrossel.
              </PostCard.Caption>
              <PostCard.Timestamp>Há 3 horas</PostCard.Timestamp>
            </PostCard>
          </div>
        </UnvDocStage>
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
    <UnvDocStage surface="secondary" align="flex-start" padding={24}>
      <div style={{ width: 320 }}>
        <PostCard>
          <PostCard.Header username="bruno.alves" avatarSrc={unvAvatars.theoAndrade} />
          <PostCard.Media src={unvPhotos.forest} alt="Floresta" />
          <PostCard.Actions />
        </PostCard>
      </div>
      <div style={{ width: 320 }}>
        <PostCard>
          <PostCard.Media src={unvPhotos.desk} alt="Estação de trabalho" aspectRatio={1.4} />
          <PostCard.Actions saved />
          <PostCard.Caption username="diego.nunes">Setup novo.</PostCard.Caption>
        </PostCard>
      </div>
    </UnvDocStage>
  ),
};

/**
 * O mesmo cartão nos dois temas, lado a lado.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UnvDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={tema}
          surface="secondary"
          padding={24}
        >
          <div style={{ width: 340 }}>
            <DemoPost />
          </div>
        </UnvDocStage>
      ))}
    </div>
  ),
};

/**
 * Extensões da mídia: o slide de texto no carrossel e o estado de erro com
 * "Tentar novamente".
 */
export const SlideEErro: StoryObj<{ onRetry: () => void; onMediaError: () => void }> = {
  name: 'Slide sem Fotografia e Erro',
  args: { onRetry: fn(), onMediaError: fn() },
  render: (args) => (
    <UnvDocStage surface="secondary" align="flex-start" padding={24}>
      <div style={{ width: 340 }}>
        <CarrosselComCartao />
      </div>
      <div style={{ width: 340 }}>
        <PostCard>
          <PostCard.Header username="bruno.alves" avatarSrc={unvAvatars.theoAndrade} />
          <PostCard.Media
            src={IMAGEM_QUEBRADA}
            alt="Publicação que não carregou"
            onRetry={args.onRetry}
            onMediaError={args.onMediaError}
          />
        </PostCard>
      </div>
    </UnvDocStage>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);

    await expect(
      tela.getByRole('group', { name: 'Cartão: o grêmio abriu inscrições' })
    ).toHaveTextContent('O grêmio abriu inscrições para a feira de ciências!');
    await expect(tela.getByText('2/3')).toBeInTheDocument();

    const tentar = await tela.findByRole('button', { name: 'Tentar novamente' });
    await expect(tela.getByText('Não foi possível carregar a imagem.')).toBeInTheDocument();
    // A descrição da imagem (o alt) continua na tela depois da falha.
    await expect(tela.getByText('Publicação que não carregou')).toBeInTheDocument();
    await expect(args.onMediaError).toHaveBeenCalled();
    await userEvent.click(tentar);
    await expect(args.onRetry).toHaveBeenCalledTimes(1);
    await expect(await tela.findByRole('button', { name: 'Tentar novamente' })).toBeInTheDocument();
  },
};
