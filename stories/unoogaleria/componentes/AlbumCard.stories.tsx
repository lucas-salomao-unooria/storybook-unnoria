import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { AlbumCard } from '../../../src/unoogaleria/components/AlbumCard';
import { IconButton } from '../../../src/unoogaleria/components/IconButton';
import { SectionHeader } from '../../../src/unoogaleria/components/SectionHeader';
import { TopBar } from '../../../src/unoogaleria/components/TopBar';
import { TabBar } from '../../../src/unoogaleria/components/TabBar';
import type { UglTabBarItem } from '../../../src/unoogaleria/components/TabBar';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import type { UglAlbum } from '../../../src/unoogaleria/media';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocCard,
  UglDocGrid,
  UglDocSpecs,
  UglDocDecisions,
  UglDocAnatomy,
  UglDocPractices,
  UglDocStage,
  UglDocThemeSwitcher,
  UglDocPropsTable,
} from '../../../.storybook/components';
import { uglAlbums, uglHiddenItems, uglSmartAlbums, uglTrashItems } from '../fixtures';

const BAR = '#716C98';

const VIAGEM = uglAlbums[0];
const COMPARTILHADO = uglAlbums.find((album) => album.kind === 'shared') ?? uglAlbums[4];
const VAZIO = uglAlbums.find((album) => album.count === 0) ?? uglAlbums[5];

/* Álbuns protegidos declarados aqui: as fixtures trazem só os itens. */
const OCULTOS: UglAlbum = {
  id: 'ocultos',
  title: 'Ocultos',
  kind: 'protected',
  count: uglHiddenItems.length,
  coverSrc: uglHiddenItems[0].src,
  coverAlt: uglHiddenItems[0].alt,
};
const EXCLUIDOS: UglAlbum = {
  id: 'excluidos',
  title: 'Excluídos recentemente',
  kind: 'protected',
  count: uglTrashItems.length,
};

const nomeDoCartao = (album: UglAlbum) =>
  [
    album.title,
    `${album.count.toLocaleString('pt-BR')} ${album.count === 1 ? 'item' : 'itens'}`,
    album.kind === 'shared' ? 'compartilhado' : '',
    album.kind === 'protected' ? 'protegido' : '',
  ]
    .filter(Boolean)
    .join(', ');

const menuDo = (album: UglAlbum) => (
  <IconButton icon="moreVertical" label={`Opções de ${album.title}`} aria-haspopup="menu" aria-expanded={false} />
);

const ABAS: UglTabBarItem[] = [
  { id: 'biblioteca', label: 'Biblioteca', icon: 'library', iconActive: 'libraryFilled' },
  { id: 'para-voce', label: 'Para você', icon: 'memories', iconActive: 'memoriesFilled' },
  { id: 'albuns', label: 'Álbuns', icon: 'albums', iconActive: 'albumsFilled' },
  { id: 'busca', label: 'Busca', icon: 'search' },
];

/**
 * A tela de álbuns no aparelho: prateleira rolável e grade de duas colunas.
 */
const TelaAlbuns: React.FC<{ theme?: 'light' | 'dark'; onOpen?: (album: UglAlbum) => void }> = ({
  theme,
  onOpen,
}) => (
  <PhoneFrame scale={0.75} theme={theme}>
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', background: 'var(--ugl-color-background-primary)', paddingBottom: 'calc(var(--ugl-safe-area-bottom) + 50px)' }}>
      <TopBar title="Álbuns" actions={<IconButton icon="add" label="Novo álbum" />} />
      <SectionHeader title="Meus álbuns" size="lg" action={{ label: 'Ver tudo', onClick: () => undefined }} />
      <div
        role="list"
        aria-label="Meus álbuns"
        style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '4px 16px 16px', scrollbarWidth: 'thin' }}
      >
        {[...uglSmartAlbums, ...uglAlbums].map((album) => (
          <div role="listitem" key={album.id}>
            <AlbumCard album={album} onClick={onOpen ?? (() => undefined)} />
          </div>
        ))}
      </div>
      <SectionHeader title="Utilitários" size="lg" />
      <div role="list" aria-label="Utilitários" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '4px 16px' }}>
        {[OCULTOS, EXCLUIDOS].map((album) => (
          <div role="listitem" key={album.id}>
            <AlbumCard
              album={album}
              size="lg"
              placeholderIcon={album.id === 'excluidos' ? 'delete' : undefined}
              onClick={onOpen ?? (() => undefined)}
              menu={menuDo(album)}
            />
          </div>
        ))}
      </div>
    </div>
    <TabBar items={ABAS} activeId="albuns" floating />
  </PhoneFrame>
);

/**
 * Página de documentação rica do componente AlbumCard.
 */
const AlbumCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Álbuns"
      title="AlbumCard"
      description="Cartão de álbum: capa quadrada de cantos arredondados com o título e a contagem abaixo. Álbum compartilhado ganha o selo de pessoas; álbum protegido nunca mostra a capa. O cartão inteiro é um botão, e o menu opcional fica ao lado, fora dele."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="Prateleiras e grades de álbuns." />
    <UglDocGrid>
      <UglDocCard icon="📚" title="Prateleira">
        Em <code>md</code> (160px), os cartões formam a prateleira rolável de “Meus álbuns”.
      </UglDocCard>
      <UglDocCard icon="🔲" title="Grade">
        Em <code>lg</code>, o cartão ocupa a célula: “Ver tudo” e “Utilitários” em duas colunas.
      </UglDocCard>
      <UglDocCard icon="👥" title="Compartilhado">
        <code>kind=&quot;shared&quot;</code> põe o selo de pessoas sobre a capa e “, compartilhado” no
        nome acessível.
      </UglDocCard>
      <UglDocCard icon="🔒" title="Protegido">
        <code>kind=&quot;protected&quot;</code> (Ocultos, Excluídos recentemente) nunca mostra a capa:
        só o glifo, cadeado por padrão.
      </UglDocCard>
      <UglDocCard icon="⋮" title="Menu">
        <code>menu</code> recebe um <code>IconButton</code> com <code>aria-haspopup=&quot;menu&quot;</code>,
        posto ao lado do título — botão não aninha botão.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" description="Medidas e escolhas de composição." />
    <UglDocSpecs
      component="AlbumCard"
      layout="Coluna · capa 1:1 · título · contagem"
      specs={[
        { label: 'Largura md', value: '160px' },
        { label: 'Largura lg', value: '100% do contêiner' },
        { label: 'Capa', value: '1:1 · --ugl-radius-m (12px)' },
        { label: 'Sem capa', value: 'glifo xl · background-tertiary' },
        { label: 'Título', value: 'title-sm · 16/24 · reticências' },
        { label: 'Contagem', value: 'caption · text-secondary' },
        { label: 'Selo', value: '24px · media-scrim · media-text' },
        { label: 'Espaço capa–texto', value: '--ugl-spacing-xs (8px)' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Protegido não mostra a capa',
          detail:
            'mesmo com coverSrc, um álbum protegido exibe só o glifo: a capa dos Ocultos revelaria justamente o que a pessoa escondeu. O glifo padrão é lock; placeholderIcon troca (delete na lixeira), e então o selo de cadeado aparece no canto.',
        },
        {
          subject: 'Nome acessível completo',
          detail:
            '"Viagem à Chapada, 6 itens" — com ", compartilhado" ou ", protegido" quando cabe. Visível fica só o número; o nome contém o título visível (WCAG 2.5.3) e a imagem da capa é decorativa.',
        },
        {
          subject: 'Menu fora do botão',
          detail:
            'o menu fica absoluto na linha do texto, à direita, e o texto ganha um recuo de 44px para não passar por baixo dele. Sem onClick, o cartão é um role="group" nomeado, e não um botão.',
        },
        {
          subject: 'Tamanho por largura',
          detail:
            'md e lg diferem só na largura (160px fixos ou a célula inteira); a tipografia e o raio são os mesmos, para que a prateleira e a grade leiam como o mesmo objeto.',
        },
        {
          subject: 'Medidas locais',
          detail: '--ugl-album-card-width (160px no md) e --ugl-album-card-badge-size (24px, o mesmo do círculo de seleção da miniatura).',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Capa, selo, título, contagem e menu." />
    <UglDocStage label="Compartilhado com menu" surface="primary" align="flex-start" padding={16}>
      <AlbumCard album={COMPARTILHADO} onClick={() => undefined} menu={menuDo(COMPARTILHADO)} />
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Capa', role: 'Imagem quadrada de cantos arredondados, com realce no hover.', token: '--ugl-radius-m · --ugl-color-background-tertiary' },
            { name: 'Selo', role: 'Pessoas (compartilhado) ou cadeado (protegido), no canto inferior direito.', token: '--ugl-color-media-scrim · --ugl-color-media-text' },
            { name: 'Título', role: 'Uma linha com reticências.', token: '--ugl-font-title-sm-* · --ugl-color-text-primary' },
            { name: 'Contagem', role: 'Número de itens.', token: '--ugl-font-caption-* · --ugl-color-text-secondary' },
            { name: 'Menu', role: 'IconButton opcional, fora do botão principal.', token: '--ugl-color-icon-primary' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes, tamanhos e estados" description="Tipos de álbum, tamanhos e capa ausente." />
    <UglDocStage label="Tipos" surface="primary" align="flex-start" padding={16} gap={16}>
      <AlbumCard album={VIAGEM} onClick={() => undefined} />
      <AlbumCard album={uglSmartAlbums[1]} onClick={() => undefined} />
      <AlbumCard album={COMPARTILHADO} onClick={() => undefined} />
      <AlbumCard album={OCULTOS} onClick={() => undefined} />
      <AlbumCard album={EXCLUIDOS} placeholderIcon="delete" onClick={() => undefined} />
      <AlbumCard album={VAZIO} placeholderIcon="addPhoto" onClick={() => undefined} />
    </UglDocStage>
    <UglDocStage label="Tamanhos" surface="primary" align="flex-start" padding={16} gap={16}>
      <AlbumCard album={VIAGEM} size="md" onClick={() => undefined} />
      <div style={{ width: 240 }}>
        <AlbumCard album={VIAGEM} size="lg" onClick={() => undefined} menu={menuDo(VIAGEM)} />
      </div>
    </UglDocStage>
    <UglDocStage label="No aparelho" surface="secondary" padding={16}>
      <TelaAlbuns />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso do cartão de álbum." />
    <UglDocPractices
      dos={[
        'Usar md em prateleiras roláveis e lg em grades de duas colunas.',
        'Dar ao álbum vazio um placeholderIcon que convide a agir (addPhoto).',
        'Marcar kind="protected" em Ocultos e Excluídos recentemente.',
        'Usar o menu para Renomear, Fixar e Excluir — não um toque longo invisível.',
      ]}
      donts={[
        'Pôr a capa dos Ocultos: o álbum existe para esconder.',
        'Escrever a contagem por extenso no título ("Viagem (6)"): ela tem a própria linha.',
        'Aninhar botões dentro do cartão: use a prop menu.',
        'Misturar md e lg na mesma prateleira.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Texto, superfície da capa vazia e foco acompanham o tema." />
    <UglDocThemeSwitcher padding={16}>
      {(tema) => (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <AlbumCard theme={tema} album={VIAGEM} onClick={() => undefined} />
          <AlbumCard theme={tema} album={COMPARTILHADO} onClick={() => undefined} />
          <AlbumCard theme={tema} album={OCULTOS} onClick={() => undefined} />
          <AlbumCard theme={tema} album={VAZIO} placeholderIcon="addPhoto" onClick={() => undefined} />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" description="Contrato público do componente AlbumCard." />
    <UglDocPropsTable
      title="AlbumCard"
      rows={[
        { name: 'album', type: 'UglAlbum', description: 'O álbum. Obrigatório.' },
        { name: 'onClick', type: '(album: UglAlbum) => void', description: 'Toque no cartão. Sem ele, o cartão não é botão.' },
        { name: 'size', type: "'md' | 'lg'", default: "'md'", description: '160px ou a largura do contêiner.' },
        { name: 'placeholderIcon', type: 'UglIconName', default: "'photo' ('lock' se protegido)", description: 'Glifo sobre a capa vazia.' },
        { name: 'menu', type: 'ReactNode', description: 'Menu do álbum, ao lado do título.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: '...rest', type: 'HTMLAttributes<HTMLDivElement>', description: 'Atributos nativos da raiz.' },
      ]}
    />
    <UglDocPropsTable
      title="UglAlbum"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único.' },
        { name: 'title', type: 'string', description: 'Nome exibido.' },
        { name: 'count', type: 'number', description: 'Quantidade de itens.' },
        { name: 'coverSrc', type: 'string', description: 'Imagem de capa.' },
        { name: 'coverAlt', type: 'string', description: 'Texto alternativo da capa (a capa é decorativa no cartão).' },
        { name: 'kind', type: "'user' | 'smart' | 'shared' | 'protected'", default: "'user'", description: 'Tipo de álbum.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof AlbumCard> = {
  title: 'Unoogaleria/Componentes/AlbumCard',
  component: AlbumCard,
  parameters: { layout: 'padded' },
  argTypes: {
    album: { control: 'object', description: 'O álbum.' },
    size: { control: 'radio', options: ['md', 'lg'], description: 'Tamanho.' },
    placeholderIcon: { control: 'text', description: 'Glifo da capa vazia.' },
    menu: { control: false, description: 'Menu (ReactNode).' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onClick: { action: 'onClick', description: 'Toque no cartão.' },
  },
  args: {
    album: VIAGEM,
    size: 'md',
    theme: 'light',
    menu: menuDo(VIAGEM),
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof AlbumCard>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AlbumCardDocumentationPage />,
};

/**
 * Playground com todas as propriedades do AlbumCard expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do AlbumCard',
  render: (args) => (
    <UglDocStage theme={args.theme} surface="primary" padding={16}>
      <div style={{ width: args.size === 'lg' ? 240 : undefined }}>
        <AlbumCard {...args} />
      </div>
    </UglDocStage>
  ),
};

/**
 * A tela de álbuns no aparelho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: tela de álbuns',
  parameters: { layout: 'centered' },
  render: () => <TelaAlbuns />,
};

/**
 * Todos os tipos de álbum.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UglDocStage surface="primary" align="flex-start" padding={16} gap={16}>
      <AlbumCard album={VIAGEM} onClick={() => undefined} />
      <AlbumCard album={uglSmartAlbums[0]} onClick={() => undefined} />
      <AlbumCard album={COMPARTILHADO} onClick={() => undefined} />
      <AlbumCard album={OCULTOS} onClick={() => undefined} />
      <AlbumCard album={EXCLUIDOS} placeholderIcon="delete" onClick={() => undefined} />
    </UglDocStage>
  ),
};

/**
 * md e lg.
 */
export const Tamanhos: Story = {
  render: () => (
    <UglDocStage surface="primary" align="flex-start" padding={16} gap={16}>
      <AlbumCard album={VIAGEM} size="md" onClick={() => undefined} />
      <div style={{ width: 280 }}>
        <AlbumCard album={VIAGEM} size="lg" onClick={() => undefined} />
      </div>
    </UglDocStage>
  ),
};

/**
 * Vazio, sem ação, com menu e com título longo.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage surface="primary" align="flex-start" padding={16} gap={16}>
      <AlbumCard album={VAZIO} placeholderIcon="addPhoto" onClick={() => undefined} />
      <AlbumCard album={VIAGEM} />
      <AlbumCard album={VIAGEM} onClick={() => undefined} menu={menuDo(VIAGEM)} />
      <AlbumCard
        album={{ ...VIAGEM, id: 'longo', title: 'Viagem de formatura para a Chapada dos Veadeiros', count: 1 }}
        onClick={() => undefined}
      />
    </UglDocStage>
  ),
};

/**
 * Nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UglDocStage key={tema} label={tema === 'light' ? 'Tema claro' : 'Tema escuro'} theme={tema} surface="secondary" padding={16}>
          <TelaAlbuns theme={tema} />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * O cartão é um botão com o nome completo, e devolve o álbum.
 */
export const AbrirAlbum: Story = {
  name: 'Abrir álbum',
  args: { onClick: fn() },
  render: (args) => (
    <UglDocStage surface="primary" padding={16} gap={16}>
      <AlbumCard album={VIAGEM} onClick={args.onClick} menu={menuDo(VIAGEM)} />
      <AlbumCard album={COMPARTILHADO} onClick={args.onClick} />
      <AlbumCard album={OCULTOS} onClick={args.onClick} />
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const viagem = tela.getByRole('button', { name: nomeDoCartao(VIAGEM) });
    await userEvent.click(viagem);
    await expect(args.onClick).toHaveBeenCalledWith(VIAGEM);

    const compartilhado = tela.getByRole('button', { name: nomeDoCartao(COMPARTILHADO) });
    compartilhado.focus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenLastCalledWith(COMPARTILHADO);

    // Protegido: nome com ", protegido" e nenhuma imagem de capa.
    const ocultos = tela.getByRole('button', { name: nomeDoCartao(OCULTOS) });
    await expect(ocultos.querySelector('img')).toBeNull();

    // O menu é um botão à parte, fora do cartão.
    const menu = tela.getByRole('button', { name: `Opções de ${VIAGEM.title}` });
    await expect(viagem.contains(menu)).toBe(false);
    await expect(menu).toHaveAttribute('aria-haspopup', 'menu');
  },
};
