import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { EmptyState } from '../../../src/unoogaleria/components/EmptyState';
import { Button } from '../../../src/unoogaleria/components/Button';
import { IconButton } from '../../../src/unoogaleria/components/IconButton';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocGrid,
  UglDocCard,
  UglDocSpecs,
  UglDocDecisions,
  UglDocAnatomy,
  UglDocStage,
  UglDocPractices,
  UglDocThemeSwitcher,
  UglDocPropsTable,
} from '../../../.storybook/components';
import { uglAlbums } from '../fixtures';

const BAR = '#716C98';

/** Espião da ação "Adicionar fotos" da estória de interação. */
const addPhotosSpy = fn();

/** O álbum vazio das fixtures ("Feira de ciências"). */
const emptyAlbum = uglAlbums.find((album) => album.count === 0) ?? uglAlbums[uglAlbums.length - 1];

/**
 * Álbum vazio aberto no aparelho.
 */
const EmptyAlbumScreen: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--ugl-color-background-primary)' }}>
    <header
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: 'var(--ugl-safe-area-top) var(--ugl-spacing-3xs) 0',
        minHeight: 'calc(var(--ugl-safe-area-top) + var(--ugl-topbar-height))',
        boxSizing: 'border-box',
      }}
    >
      <IconButton icon="back" label="Voltar para Álbuns" style={{ justifySelf: 'start' }} />
      <h1 className="ugl-text ugl-text--title-md">{emptyAlbum.title}</h1>
      <IconButton icon="more" label="Mais opções do álbum" style={{ justifySelf: 'end' }} />
    </header>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <EmptyState
        icon="addPhoto"
        title="Este álbum está vazio"
        description="Adicione fotos e vídeos da biblioteca para reunir tudo da feira num lugar só."
        action={
          <Button iconStart="add" onClick={() => undefined}>
            Adicionar fotos
          </Button>
        }
      />
    </div>
  </div>
);

/**
 * Página de documentação rica do componente EmptyState.
 */
const EmptyStateDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Retorno"
      title="EmptyState"
      description="O que a tela mostra quando não há o que mostrar: glifo de 48px num medalhão, título, texto de apoio e a ação que resolve o vazio."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Todo vazio da galeria diz o que é e como sair dele."
    />
    <UglDocGrid>
      <UglDocCard icon="🖼️" title="Álbum vazio">
        “Este álbum está vazio” com a ação “Adicionar fotos”.
      </UglDocCard>
      <UglDocCard icon="🔎" title="Busca sem resultado">
        Repete o termo buscado e sugere o que tentar — sem ação, porque o campo continua acima.
      </UglDocCard>
      <UglDocCard icon="🗑️" title="Lixeira e Ocultos vazios">
        Explica o que costuma aparecer ali (“Itens excluídos ficam aqui por 30 dias”).
      </UglDocCard>
      <UglDocCard icon="🎬" title="Sobre o visualizador">
        A variante <code>immersive</code> vive sobre a superfície imersiva — um vídeo que não
        carregou, por exemplo.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="EmptyState"
      layout="Coluna centralizada"
      specs={[
        { label: 'Medalhão', value: '96px (local) · --ugl-color-fill-field' },
        { label: 'Glifo', value: 'xl 48px · --ugl-color-icon-accent' },
        { label: 'Título', value: 'title-md · Open Sans 600 · 18/28px' },
        { label: 'Apoio', value: 'body-md · 14/20px · text-secondary' },
        { label: 'Largura de leitura', value: '300px (local)' },
        { label: 'Recuo', value: '32px vertical · --ugl-gutter lateral' },
        { label: 'Ação', value: '20px abaixo do texto' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Medalhão de 96px',
          detail:
            'o glifo xl (48px) sozinho some numa tela vazia; o medalhão em fill-field, com o glifo em icon-accent (≥ 3:1 sobre ele nos dois temas), dá peso sem ilustração. Vira --ugl-empty-state-medallion no topo do CSS.',
        },
        {
          subject: 'Glifo decorativo',
          detail: 'o medalhão é aria-hidden: quem nomeia o vazio é o título, que é um <h2> (ou <h3> com headingLevel).',
        },
        {
          subject: 'Largura de leitura local',
          detail:
            '--ugl-empty-state-measure (300px) mantém título e apoio em linhas curtas, centralizadas, dentro da tela de 390px.',
        },
        {
          subject: 'Server Component',
          detail: 'só recebe props e renderiza; a ação é um nó pronto (em geral um Button).',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UglDocAnatomy
      zones={[
        { name: 'Medalhão', role: 'Círculo decorativo com o glifo.', token: '--ugl-color-fill-field · --ugl-color-icon-accent' },
        { name: 'Título', role: 'Heading que nomeia o vazio.', token: '--ugl-font-title-md-*' },
        { name: 'Apoio', role: 'O que aparece aqui e como preencher.', token: '--ugl-font-body-md-* · --ugl-color-text-secondary' },
        { name: 'Ação', role: 'Slot livre, em geral um Button.', token: '--ugl-spacing-xl' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Com e sem ação, com e sem apoio, e imersivo."
    />
    <UglDocGrid min={320}>
      <UglDocStage label="Com ação" padding={0}>
        <EmptyState
          icon="addPhoto"
          title="Este álbum está vazio"
          description="Adicione fotos e vídeos da biblioteca."
          action={<Button iconStart="add">Adicionar fotos</Button>}
        />
      </UglDocStage>
      <UglDocStage label="Sem ação" padding={0}>
        <EmptyState icon="imageSearch" title="Nenhum resultado" description="Tente um lugar, uma pessoa ou uma categoria." />
      </UglDocStage>
      <UglDocStage label="Só título" padding={0}>
        <EmptyState icon="favorite" title="Nenhum favorito ainda" />
      </UglDocStage>
      <UglDocStage label="Imersivo" surface="immersive" padding={0}>
        <EmptyState
          variant="immersive"
          icon="brokenImage"
          title="Não foi possível abrir o vídeo"
          description="O arquivo pode ter sido movido."
          action={<Button variant="immersive" iconStart="replay">Tentar de novo</Button>}
        />
      </UglDocStage>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Escrever o título como fato (“Nenhum favorito ainda”) e o apoio como caminho.',
        'Oferecer uma ação só quando ela resolve o vazio ali mesmo.',
        'Escolher um glifo que nomeie o lugar (favorite, delete, imageSearch).',
        'Usar headingLevel 3 quando o vazio estiver dentro de uma seção com h2.',
      ]}
      donts={[
        'Culpar a pessoa (“Você não tem fotos”).',
        'Colocar mais de duas ações.',
        'Usar o EmptyState para erro que bloqueia a tela inteira sem saída.',
        'Trocar o glifo por ilustração de terceiros.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Medalhão, glifo e textos acompanham data-ugl-theme."
    />
    <UglDocThemeSwitcher padding={0}>
      {() => (
        <EmptyState
          icon="delete"
          title="Nenhum item excluído"
          description="Itens excluídos ficam aqui por 30 dias antes de sair de vez."
        />
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UglDocPropsTable
      title="EmptyState"
      rows={[
        { name: 'icon', type: 'UglIconName', description: 'Glifo do medalhão (48px). Obrigatório.' },
        { name: 'title', type: 'React.ReactNode', description: 'Título do vazio. Obrigatório.' },
        { name: 'description', type: 'React.ReactNode', description: 'Texto de apoio.' },
        { name: 'action', type: 'React.ReactNode', description: 'Ação que resolve o vazio.' },
        { name: 'headingLevel', type: '2 | 3', default: '2', description: 'Nível do título.' },
        { name: 'variant', type: "'default' | 'immersive'", default: "'default'", description: 'Superfície do tema ou imersiva.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className / style', type: 'string / CSSProperties', description: 'Classe e estilo da raiz.' },
        { name: '...div', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos da raiz.' },
      ]}
    />
    <UglDocPropsTable
      title="Tipos públicos"
      rows={[{ name: 'UglEmptyStateVariant', type: "'default' | 'immersive'", description: 'Variantes.' }]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof EmptyState> = {
  title: 'Unoogaleria/Componentes/EmptyState',
  component: EmptyState,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: {
      control: 'select',
      options: ['addPhoto', 'imageSearch', 'favorite', 'delete', 'hide', 'people', 'location', 'brokenImage', 'albums'],
      description: 'Glifo do medalhão.',
    },
    title: { control: 'text', description: 'Título.' },
    description: { control: 'text', description: 'Texto de apoio.' },
    action: {
      control: 'select',
      options: ['nenhuma', 'adicionar', 'duas ações'],
      mapping: {
        nenhuma: undefined,
        adicionar: <Button iconStart="add">Adicionar fotos</Button>,
        'duas ações': (
          <>
            <Button iconStart="add">Adicionar fotos</Button>
            <Button variant="secondary">Importar</Button>
          </>
        ),
      },
      description: 'Ação.',
    },
    headingLevel: { control: 'radio', options: [2, 3], description: 'Nível do título.' },
    variant: { control: 'radio', options: ['default', 'immersive'], description: 'Variante.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    icon: 'addPhoto',
    title: 'Este álbum está vazio',
    description: 'Adicione fotos e vídeos da biblioteca.',
    action: 'adicionar' as never,
    headingLevel: 2,
    variant: 'default',
  },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <EmptyStateDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do EmptyState',
  render: (args) => (
    <UglDocStage theme={args.theme ?? 'light'} surface={args.variant === 'immersive' ? 'immersive' : 'primary'} width={390} padding={0}>
      <EmptyState {...args} />
    </UglDocStage>
  ),
};

/**
 * O álbum vazio aberto no aparelho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: álbum vazio',
  parameters: { layout: 'centered' },
  render: () => (
    <PhoneFrame scale={0.75} ariaLabel="Galeria — álbum vazio">
      <EmptyAlbumScreen />
    </PhoneFrame>
  ),
};

/**
 * Padrão e imersivo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UglDocGrid min={320}>
      <UglDocStage label="default" padding={0}>
        <EmptyState icon="hide" title="Nenhum item oculto" description="Itens ocultos saem da biblioteca e só aparecem aqui." />
      </UglDocStage>
      <UglDocStage label="immersive" surface="immersive" padding={0}>
        <EmptyState variant="immersive" icon="brokenImage" title="Não foi possível abrir a foto" />
      </UglDocStage>
    </UglDocGrid>
  ),
};

/**
 * Com ação, sem ação e só com título.
 */
export const Estados: Story = {
  render: () => (
    <UglDocGrid min={320}>
      <UglDocStage label="Com ação" padding={0}>
        <EmptyState icon="people" title="Nenhuma pessoa reconhecida" description="As pessoas aparecem aqui quando a galeria as reconhece." action={<Button variant="secondary">Saiba mais</Button>} />
      </UglDocStage>
      <UglDocStage label="Sem ação" padding={0}>
        <EmptyState icon="location" title="Nenhum lugar" description="Fotos com localização aparecem aqui." />
      </UglDocStage>
      <UglDocStage label="Só título" padding={0}>
        <EmptyState icon="favorite" title="Nenhum favorito ainda" />
      </UglDocStage>
    </UglDocGrid>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <UglDocGrid min={320}>
      {(['light', 'dark'] as const).map((theme) => (
        <UglDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} padding={0}>
          <EmptyState icon="delete" title="Nenhum item excluído" description="Itens excluídos ficam aqui por 30 dias." action={<Button variant="secondary">Voltar à biblioteca</Button>} />
        </UglDocStage>
      ))}
    </UglDocGrid>
  ),
};

/**
 * O título é um heading do nível pedido, o glifo não é lido e a ação responde.
 */
export const Semantica: Story = {
  name: 'Interação: título e ação',
  render: () => (
    <UglDocStage padding={0} width={390}>
      <EmptyState
        icon="addPhoto"
        headingLevel={3}
        title="Este álbum está vazio"
        description={`Nada em ${emptyAlbum.title} ainda.`}
        action={<Button onClick={addPhotosSpy}>Adicionar fotos</Button>}
      />
    </UglDocStage>
  ),
  play: async ({ canvasElement }) => {
    addPhotosSpy.mockClear();
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { level: 3, name: 'Este álbum está vazio' })).toBeInTheDocument();
    await expect(canvas.queryByRole('img')).toBeNull();
    await userEvent.click(canvas.getByRole('button', { name: 'Adicionar fotos' }));
    await expect(addPhotosSpy).toHaveBeenCalledTimes(1);
  },
};
