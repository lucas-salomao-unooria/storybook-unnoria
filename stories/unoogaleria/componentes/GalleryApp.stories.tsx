import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { GalleryApp } from '../../../src/unoogaleria/components/GalleryApp';
import type { UglGalleryAppProps } from '../../../src/unoogaleria/components/GalleryApp';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocAnatomy,
  UglDocCard,
  UglDocDecisions,
  UglDocGrid,
  UglDocPractices,
  UglDocPropsTable,
  UglDocSpecs,
  UglDocStage,
  UglDocThemeSwitcher,
} from '../../../.storybook/components';
import {
  uglAlbums,
  uglAllItems,
  uglDemoNow,
  uglMediaItems,
  uglPeople,
  uglTrashItems,
} from '../fixtures';

const BAR = '#716C98';

/** O app no aparelho, com as fixtures de demonstração. */
const AppNoAparelho = ({
  scale = 1,
  ariaLabel = 'Galeria no aparelho',
  ...props
}: Partial<UglGalleryAppProps> & { scale?: number; ariaLabel?: string }) => (
  <PhoneFrame scale={scale} theme={props.theme} ariaLabel={ariaLabel}>
    <GalleryApp
      defaultItems={uglAllItems}
      defaultAlbums={uglAlbums}
      people={uglPeople}
      now={uglDemoNow}
      {...props}
    />
  </PhoneFrame>
);

/**
 * Página de documentação rica do GalleryApp.
 */
const GalleryAppDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Aplicativo"
      title="GalleryApp"
      description="A galeria de fotos e vídeos inteira, pronta para rodar dentro do PhoneFrame: Biblioteca, Para você, Álbuns e Busca, com visualizador imersivo, editor, seleção múltipla, álbuns, lixeira e desfazer. É a composição de todos os componentes do módulo, com o estado da biblioteca guardado por um redutor puro que o produto também pode usar."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Tudo o que uma galeria de celular faz, ligado de ponta a ponta."
    />
    <UglDocGrid>
      <UglDocCard icon="🖼️" title="Biblioteca">
        Grade por dia com zoom de 3, 5 e 7 colunas (pinça, Ctrl/⌘ + roda ou o menu), visões por ano e por
        mês, filtros (fotos, vídeos, favoritos) e seleção por toque, por grupo, por arraste ou por pressão
        longa.
      </UglDocCard>
      <UglDocCard icon="🔍" title="Visualizador e editor">
        Deslizar, ampliar, vídeo de verdade, favoritar, painel de informações com legenda editável,
        compartilhar, apresentação, editar (cortar e girar, ajustes, filtros) e excluir.
      </UglDocCard>
      <UglDocCard icon="📚" title="Álbuns">
        Criar, renomear, excluir, adicionar e remover itens; Recentes e Favoritos; tipos de mídia; Ocultos
        protegido; Excluídos recentemente com o prazo de cada item, recuperação e exclusão definitiva.
      </UglDocCard>
      <UglDocCard icon="✨" title="Para você e Busca">
        Memórias montadas por lugar e dia, pessoas e favoritos; busca por conteúdo, lugar, pessoa, legenda e
        arquivo, sem acento e por início de palavra.
      </UglDocCard>
      <UglDocCard icon="↩️" title="Desfazer">
        Toda operação que tira algo do lugar (excluir, ocultar, remover de álbum, recuperar, editar) mostra um
        aviso com &quot;Desfazer&quot;, que devolve a biblioteca exatamente ao estado anterior.
      </UglDocCard>
      <UglDocCard icon="🧪" title="Para missões e testes">
        <code>onAction</code> recebe cada operação antes de ela acontecer, e <code>onStateChange</code> o estado
        inteiro depois. Fixe <code>now</code> para que &quot;Hoje&quot;, &quot;Ontem&quot; e os prazos sejam os
        mesmos em qualquer dia.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Arranjo, estado e decisões de comportamento."
    />
    <UglDocSpecs
      component="GalleryApp"
      layout="Aplicativo · ocupa o contêiner posicionado (a tela do PhoneFrame)"
      specs={[
        { label: 'Abas', value: 'Biblioteca · Para você · Álbuns · Busca' },
        { label: 'Estado', value: 'uglGalleryReducer (galleryState.ts)' },
        { label: 'Zoom da grade', value: '3 · 5 · 7 colunas' },
        { label: 'Lixeira', value: '30 dias (UGL_TRASH_RETENTION_DAYS)' },
        { label: 'Apresentação', value: '3 s por item' },
        { label: 'Camadas', value: '--ugl-z-bar · viewer · sheet · dialog · toast' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Estado no app, regras fora dele',
          detail:
            'o app guarda a biblioteca a partir de defaultItems (não controlado); as operações moram em galleryState.ts, um redutor puro exportado com os seletores, para que um produto monte a própria galeria com as mesmas regras.',
        },
        {
          subject: 'Desfazer por fotografia do estado',
          detail:
            'antes de cada operação destrutiva o app guarda o estado inteiro; "Desfazer" o devolve de uma vez. É mais simples e mais correto que operações inversas, que teriam de lembrar, por exemplo, a que álbuns um item pertencia.',
        },
        {
          subject: 'Excluir pede confirmação e ainda pode ser desfeito',
          detail:
            'mover para Excluídos recentemente passa por um alerta com o foco em "Cancelar"; apagar de vez também, e esse não oferece desfazer.',
        },
        {
          subject: 'O visualizador sabe de onde veio',
          detail:
            'aberto da lixeira, oferece Recuperar e Apagar de vez; de Ocultos, Reexibir; da biblioteca, todas as ações. Se o item aberto sai do contexto (excluído, ocultado), o visualizador passa ao vizinho ou fecha.',
        },
        {
          subject: 'Ocultos com desbloqueio simulado',
          detail:
            'o álbum pede "Ver álbum" antes de mostrar o conteúdo e volta a travar ao sair. É uma demonstração do fluxo, não uma autenticação.',
        },
        {
          subject: 'Memórias por lugar e dia',
          detail:
            'a aba Para você agrupa itens do mesmo lugar no mesmo dia (dois ou mais); abrir uma memória inicia a apresentação, que para com um toque.',
        },
        {
          subject: 'Busca por início de palavra, sem acento',
          detail:
            '"aniversario" acha "Aniversário" e "ana" acha a Ana, mas não a Serra da Canastra: todas as palavras da consulta precisam começar alguma palavra do item.',
        },
        {
          subject: 'Tocar na aba ativa volta à raiz',
          detail: 'cada aba guarda a própria pilha de coleções; tocar na aba já ativa esvazia a pilha.',
        },
        {
          subject: 'Nada é enviado de verdade',
          detail:
            'compartilhar, copiar, imprimir e salvar em arquivos só confirmam com um aviso: a galeria é uma simulação, e quem liga essas ações a um destino real é o produto, por onAction.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="As camadas do app, de baixo para cima."
    />
    <UglDocStage label="Biblioteca no aparelho" surface="secondary" align="flex-start" padding={16}>
      <AppNoAparelho scale={0.6} ariaLabel="Anatomia da galeria" />
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            {
              name: 'Tela da aba',
              role: 'Biblioteca, Para você, Álbuns, Busca ou uma coleção aberta.',
              token: '--ugl-color-background-primary',
            },
            {
              name: 'Barra superior',
              role: 'Translúcida sobre a grade, com Selecionar e o menu de opções.',
              token: '--ugl-color-surface-bar · --ugl-z-bar',
            },
            {
              name: 'Anos | Meses | Todas',
              role: 'Controle flutuante acima da barra de abas.',
              token: 'SegmentedControl variant="floating"',
            },
            {
              name: 'Barra de abas / de seleção',
              role: 'Troca pela barra de ações enquanto há seleção.',
              token: 'TabBar · SelectionBar',
            },
            {
              name: 'Visualizador e editor',
              role: 'Camada imersiva; a barra de status do aparelho fica branca.',
              token: '--ugl-z-viewer · data-ugl-immersive',
            },
            {
              name: 'Folhas, menus e diálogos',
              role: 'Informações, compartilhar, álbuns, confirmação e nome de álbum.',
              token: '--ugl-z-sheet · --ugl-z-dialog',
            },
            { name: 'Aviso', role: 'Confirma a operação e oferece "Desfazer".', token: '--ugl-z-toast' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As quatro abas iniciais e a biblioteca vazia."
    />
    <UglDocStage label="initialTab" surface="secondary" align="flex-start" padding={16} gap={16}>
      <AppNoAparelho scale={0.45} ariaLabel="Aba Biblioteca" />
      <AppNoAparelho scale={0.45} initialTab="foryou" ariaLabel="Aba Para você" />
      <AppNoAparelho scale={0.45} initialTab="albums" ariaLabel="Aba Álbuns" />
      <AppNoAparelho scale={0.45} initialTab="search" ariaLabel="Aba Busca" />
    </UglDocStage>
    <UglDocStage label="initialView e biblioteca vazia" surface="secondary" align="flex-start" padding={16} gap={16}>
      <AppNoAparelho scale={0.45} initialView="months" ariaLabel="Visão por meses" />
      <AppNoAparelho scale={0.45} initialView="years" ariaLabel="Visão por anos" />
      <AppNoAparelho scale={0.45} defaultItems={[]} defaultAlbums={[]} ariaLabel="Biblioteca vazia" />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar o app pronto." />
    <UglDocPractices
      dos={[
        'Rodar o app dentro do PhoneFrame (ou de outro contêiner posicionado com altura definida).',
        'Fixar now em demonstrações, missões e testes.',
        'Passar a biblioteca inteira em defaultItems, com lixeira (deletedAt) e ocultos (hidden).',
        'Ouvir onAction para registrar o que a pessoa fez e onStateChange para persistir.',
        'Usar galleryState.ts quando o produto precisar da própria galeria com os mesmos componentes.',
      ]}
      donts={[
        'Trocar defaultItems depois de montar esperando que o app reinicie: remonte com uma key nova.',
        'Renderizar o app solto na página, sem contêiner posicionado: as camadas se ancoram nele.',
        'Tratar o desbloqueio de Ocultos como segurança: é só o fluxo.',
        'Ligar compartilhar a um destino real sem avisar a pessoa: a galeria só simula.',
        'Esconder a lixeira: é ela que torna excluir reversível por 30 dias.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O app acompanha data-ugl-theme; visualizador e editor são imersivos nos dois temas."
    />
    <UglDocThemeSwitcher surface="secondary" padding={16}>
      {(activeTheme) => <AppNoAparelho scale={0.7} theme={activeTheme} ariaLabel="Galeria no tema escolhido" />}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do GalleryApp e do seu modelo de estado."
    />
    <UglDocPropsTable
      title="GalleryApp"
      rows={[
        { name: 'defaultItems', type: 'UglMediaItem[]', description: 'Biblioteca inicial, com ocultos e lixeira. Obrigatório.' },
        { name: 'defaultAlbums', type: 'UglAlbum[]', default: '[]', description: 'Álbuns iniciais; contagem e capa são recalculadas.' },
        { name: 'people', type: 'UglPerson[]', default: '[]', description: 'Pessoas reconhecidas (resolve item.people).' },
        { name: 'contacts', type: 'UglPerson[]', default: 'people', description: 'Contatos da folha de compartilhamento.' },
        { name: 'now', type: 'Date | string', description: 'Referência de "Hoje", "Ontem" e dos prazos da lixeira.' },
        { name: 'timeZone', type: 'string', default: "'America/Sao_Paulo'", description: 'Fuso de leitura das datas.' },
        { name: 'initialTab', type: "'library' | 'foryou' | 'albums' | 'search'", default: "'library'", description: 'Aba ao montar.' },
        { name: 'initialView', type: "'years' | 'months' | 'all'", default: "'all'", description: 'Visão da biblioteca ao montar.' },
        { name: 'onStateChange', type: '(state: UglGalleryState) => void', description: 'Estado inteiro a cada mudança.' },
        { name: 'onAction', type: '(action: UglGalleryAction) => void', description: 'Cada operação, antes de ser aplicada.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema; sem valor, herda o do contêiner.' },
      ]}
    />
    <UglDocPropsTable
      title="UglGalleryAction (galleryState.ts)"
      rows={[
        { name: 'favorite', type: '{ ids; value }', description: 'Marca ou desmarca favoritos.' },
        { name: 'trash / restore / deleteForever', type: '{ ids; at? }', description: 'Lixeira: mover, recuperar, apagar de vez.' },
        { name: 'emptyTrash / restoreAll', type: '{}', description: 'Esvaziar ou recuperar tudo.' },
        { name: 'hide / unhide', type: '{ ids }', description: 'Ocultar e reexibir.' },
        { name: 'describe', type: '{ id; description }', description: 'Legenda.' },
        { name: 'edit', type: '{ id; edit? }', description: 'Edição não destrutiva (undefined reverte).' },
        { name: 'duplicate', type: '{ id; newId }', description: 'Duplica logo depois do original.' },
        { name: 'createAlbum / renameAlbum / deleteAlbum', type: '{ album | albumId; … }', description: 'Álbuns.' },
        { name: 'addToAlbum / removeFromAlbum', type: '{ albumId; ids }', description: 'Itens de álbum.' },
        { name: 'replace', type: '{ state }', description: 'Troca o estado inteiro (é o "Desfazer").' },
      ]}
    />
    <UglDocPropsTable
      title="Seletores (galleryState.ts)"
      rows={[
        { name: 'uglSelectLibrary', type: '(items) => UglMediaItem[]', description: 'Nem ocultos nem na lixeira, do mais recente ao mais antigo.' },
        { name: 'uglSelectTrash / uglSelectHidden', type: '(items) => UglMediaItem[]', description: 'Lixeira e ocultos.' },
        { name: 'uglSelectFavorites / uglSelectVideos', type: '(items) => UglMediaItem[]', description: 'Coleções inteligentes.' },
        { name: 'uglSelectSubtype', type: '(items, subtype) => UglMediaItem[]', description: 'Tipos de mídia.' },
        { name: 'uglSelectAlbumItems / uglSelectAlbums', type: '(…)', description: 'Itens de um álbum; álbuns com contagem e capa ao vivo.' },
        { name: 'uglSearchMedia', type: '(items, query, people?) => UglMediaItem[]', description: 'Busca por início de palavra, sem acento.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof GalleryApp> = {
  title: 'Unoogaleria/Componentes/GalleryApp',
  component: GalleryApp,
  parameters: { layout: 'centered' },
  argTypes: {
    defaultItems: { control: 'object', description: 'Biblioteca inicial.' },
    defaultAlbums: { control: 'object', description: 'Álbuns iniciais.' },
    people: { control: 'object', description: 'Pessoas reconhecidas.' },
    contacts: { control: 'object', description: 'Contatos do compartilhamento.' },
    now: { control: 'text', description: 'Momento de referência.' },
    timeZone: { control: 'text', description: 'Fuso de leitura das datas.' },
    initialTab: { control: 'radio', options: ['library', 'foryou', 'albums', 'search'], description: 'Aba inicial.' },
    initialView: { control: 'radio', options: ['years', 'months', 'all'], description: 'Visão inicial da biblioteca.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onStateChange: { action: 'onStateChange' },
    onAction: { action: 'onAction' },
  },
  args: {
    defaultItems: uglAllItems,
    defaultAlbums: uglAlbums,
    people: uglPeople,
    now: uglDemoNow,
    timeZone: 'America/Sao_Paulo',
    initialTab: 'library',
    initialView: 'all',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof GalleryApp>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  parameters: { layout: 'padded' },
  render: () => <GalleryAppDocumentationPage />,
};

/**
 * Playground com todas as propriedades do GalleryApp. As props de estado
 * inicial só valem ao montar: troque-as e o app remonta.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do GalleryApp',
  render: (args) => (
    <PhoneFrame theme={args.theme} ariaLabel="Galeria no aparelho">
      <GalleryApp key={`${args.initialTab}-${args.initialView}-${args.theme}`} {...args} />
    </PhoneFrame>
  ),
};

/**
 * A galeria completa no aparelho, em tamanho real.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: galeria completa no aparelho',
  render: () => <AppNoAparelho />,
};

/**
 * As quatro abas lado a lado.
 */
export const TodasVariantes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <AppNoAparelho scale={0.55} ariaLabel="Aba Biblioteca" />
      <AppNoAparelho scale={0.55} initialTab="foryou" ariaLabel="Aba Para você" />
      <AppNoAparelho scale={0.55} initialTab="albums" ariaLabel="Aba Álbuns" />
      <AppNoAparelho scale={0.55} initialTab="search" ariaLabel="Aba Busca" />
    </div>
  ),
};

/**
 * Visões da biblioteca e a biblioteca vazia.
 */
export const Estados: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <AppNoAparelho scale={0.55} initialView="years" ariaLabel="Visão por anos" />
      <AppNoAparelho scale={0.55} initialView="months" ariaLabel="Visão por meses" />
      <AppNoAparelho scale={0.55} defaultItems={[]} defaultAlbums={[]} ariaLabel="Biblioteca vazia" />
    </div>
  ),
};

/**
 * A mesma galeria nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <AppNoAparelho scale={0.7} theme="light" ariaLabel="Galeria no tema claro" />
      <AppNoAparelho scale={0.7} theme="dark" ariaLabel="Galeria no tema escuro" />
    </div>
  ),
};

/* ==========================================================================
   Fluxos testados
   ========================================================================== */

const [primeiro, segundo] = uglMediaItems;
const comeca = (texto: string) => new RegExp(`^${texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);

/**
 * Abrir uma foto, favoritar, passar para a próxima e fechar com Esc.
 */
export const FluxoVisualizador: Story = {
  name: 'Fluxo: abrir, favoritar e fechar',
  args: { onAction: fn() },
  render: (args) => (
    <PhoneFrame ariaLabel="Galeria no aparelho">
      <GalleryApp {...args} />
    </PhoneFrame>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const biblioteca = within(tela.getByRole('region', { name: 'Biblioteca' }));

    await userEvent.click(biblioteca.getByRole('button', { name: comeca(primeiro.alt) }));
    const visualizador = within(await tela.findByRole('dialog', { name: 'Visualizador de fotos' }));

    const favoritar = visualizador.getByRole('button', { name: 'Favoritar' });
    await expect(favoritar).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(favoritar);
    await expect(args.onAction).toHaveBeenCalledWith({ type: 'favorite', ids: [primeiro.id], value: true });
    await waitFor(() => expect(favoritar).toHaveAttribute('aria-pressed', 'true'));

    await userEvent.keyboard('{ArrowRight}');
    await expect(visualizador.getByText(`2 de ${uglMediaItems.length}`)).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(tela.queryByRole('dialog', { name: 'Visualizador de fotos' })).not.toBeInTheDocument()
    );
  },
};

/**
 * Selecionar dois itens, excluir, confirmar e desfazer.
 */
export const FluxoExcluirEDesfazer: Story = {
  name: 'Fluxo: selecionar, excluir e desfazer',
  args: { onStateChange: fn() },
  render: (args) => (
    <PhoneFrame ariaLabel="Galeria no aparelho">
      <GalleryApp {...args} />
    </PhoneFrame>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(tela.getByRole('button', { name: 'Selecionar' }));

    const biblioteca = within(tela.getByRole('region', { name: 'Biblioteca' }));
    await userEvent.click(biblioteca.getByRole('button', { name: comeca(primeiro.alt) }));
    await userEvent.click(biblioteca.getByRole('button', { name: comeca(segundo.alt) }));
    await expect(tela.getByRole('heading', { name: '2 itens selecionados' })).toBeInTheDocument();

    const barra = within(tela.getByRole('toolbar', { name: 'Ações da seleção' }));
    await userEvent.click(barra.getByRole('button', { name: 'Excluir' }));

    const alerta = within(await tela.findByRole('alertdialog', { name: 'Excluir 2 itens?' }));
    await waitFor(() => expect(alerta.getByRole('button', { name: 'Cancelar' })).toHaveFocus());
    await userEvent.click(alerta.getByRole('button', { name: 'Excluir' }));

    await expect(await tela.findByText('2 itens movidos para Excluídos recentemente')).toBeInTheDocument();
    const ultimo = () => {
      const calls = (args.onStateChange as ReturnType<typeof fn>).mock.calls;
      return calls[calls.length - 1][0] as { items: { id: string; deletedAt?: string }[] };
    };
    await waitFor(() =>
      expect(ultimo().items.filter((item) => item.deletedAt).length).toBe(uglTrashItems.length + 2)
    );

    await userEvent.click(tela.getByRole('button', { name: 'Desfazer' }));
    await waitFor(() =>
      expect(ultimo().items.filter((item) => item.deletedAt).length).toBe(uglTrashItems.length)
    );
    await expect(biblioteca.getByRole('button', { name: comeca(primeiro.alt) })).toBeInTheDocument();
  },
};

/**
 * Criar um álbum na aba Álbuns: ele abre vazio, pronto para receber fotos.
 */
export const FluxoNovoAlbum: Story = {
  name: 'Fluxo: criar um álbum',
  args: { onAction: fn() },
  render: (args) => (
    <PhoneFrame ariaLabel="Galeria no aparelho">
      <GalleryApp {...args} />
    </PhoneFrame>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(tela.getByRole('button', { name: 'Álbuns' }));
    await userEvent.click(await tela.findByRole('button', { name: 'Novo álbum' }));

    const dialogo = within(await tela.findByRole('dialog', { name: 'Novo álbum' }));
    const criar = dialogo.getByRole('button', { name: 'Criar' });
    await expect(criar).toBeDisabled();
    await userEvent.type(dialogo.getByRole('textbox', { name: 'Nome do álbum' }), 'Praia');
    await expect(criar).toBeEnabled();
    await userEvent.click(criar);

    await expect(args.onAction).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'createAlbum', album: expect.objectContaining({ title: 'Praia' }) })
    );
    await expect(await tela.findByRole('heading', { name: 'Álbum vazio' })).toBeInTheDocument();
  },
};

/**
 * Buscar por conteúdo, sem acento.
 */
export const FluxoBusca: Story = {
  name: 'Fluxo: buscar',
  render: (args) => (
    <PhoneFrame ariaLabel="Galeria no aparelho">
      <GalleryApp {...args} initialTab="search" />
    </PhoneFrame>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const cachoeira = uglMediaItems.find((item) => item.tags?.includes('cachoeira'))!;
    await userEvent.type(tela.getByRole('searchbox'), 'cachoeira');
    const resultados = within(await tela.findByRole('region', { name: 'Resultados para cachoeira' }));
    await expect(resultados.getByRole('button', { name: comeca(cachoeira.alt) })).toBeInTheDocument();
  },
};

/**
 * Excluídos recentemente: cada item mostra quanto falta até ser apagado.
 */
export const FluxoLixeira: Story = {
  name: 'Fluxo: Excluídos recentemente',
  render: (args) => (
    <PhoneFrame ariaLabel="Galeria no aparelho">
      <GalleryApp {...args} initialTab="albums" />
    </PhoneFrame>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(await tela.findByRole('button', { name: /Excluídos recentemente/ }));
    const lixeira = within(await tela.findByRole('region', { name: 'Excluídos recentemente' }));
    const [vencendo] = uglTrashItems;
    await expect(lixeira.getByRole('button', { name: comeca(vencendo.alt) })).toHaveAccessibleName(/1 dia/);
  },
};
