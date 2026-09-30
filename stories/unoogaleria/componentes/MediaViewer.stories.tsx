import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { MediaViewer } from '../../../src/unoogaleria/components/MediaViewer';
import type { UglMediaViewerProps } from '../../../src/unoogaleria/components/MediaViewer';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { Button } from '../../../src/unoogaleria/components/Button';
import {
  uglDefaultEdit,
  uglDefaultAdjustments,
  uglFormatDateTime,
  uglMediaLabel,
} from '../../../src/unoogaleria/media';
import type { UglMediaItem } from '../../../src/unoogaleria/media';
import type { UglTheme } from '../../../src/unoogaleria/tokens';
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
import { uglDemoNow, uglMediaItems } from '../fixtures';

const BAR = '#716C98';

/** Índice do primeiro vídeo da biblioteca de demonstração. */
const PRIMEIRO_VIDEO = uglMediaItems.findIndex((item) => item.type === 'video');

/** Uma foto com edição não destrutiva (declarada aqui; as fixtures não têm edição). */
const FOTO_EDITADA: UglMediaItem = {
  ...uglMediaItems.find((item) => item.type === 'photo' && item.width > item.height)!,
  id: 'viewer-editada',
  edit: {
    ...uglDefaultEdit,
    filter: 'nostalgia',
    filterIntensity: 80,
    aspect: '4:5',
    adjustments: { ...uglDefaultAdjustments, contrast: 20, vignette: 60 },
  },
};

/** Uma foto cujo arquivo não existe, para o estado de erro. */
const FOTO_QUEBRADA: UglMediaItem = {
  ...uglMediaItems[0],
  id: 'viewer-quebrada',
  src: '/unoogaleria/arquivo-que-nao-existe.svg',
};

const texto = (tamanho: 'title-md' | 'body-md' | 'caption'): React.CSSProperties => ({
  margin: 0,
  fontFamily: 'var(--ugl-font-sans)',
  fontSize: `var(--ugl-font-${tamanho}-size)`,
  fontWeight: `var(--ugl-font-${tamanho}-weight)` as React.CSSProperties['fontWeight'],
  lineHeight: `var(--ugl-font-${tamanho}-line)`,
});

/**
 * Andaime da estória: uma grade simples atrás do visualizador. Não é o
 * `MediaGrid` do módulo — só o contexto para abrir e fechar.
 */
const BibliotecaSimples: React.FC<{ items: UglMediaItem[]; onOpen: (index: number) => void }> = ({
  items,
  onOpen,
}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      paddingTop: 'calc(var(--ugl-safe-area-top) + var(--ugl-spacing-xs))',
      background: 'var(--ugl-color-background-primary)',
    }}
  >
    <h1
      style={{
        margin: '0 var(--ugl-gutter) var(--ugl-spacing-xs)',
        fontFamily: 'var(--ugl-font-sans)',
        fontSize: 'var(--ugl-font-display-size)',
        fontWeight: 'var(--ugl-font-display-weight)' as React.CSSProperties['fontWeight'],
        lineHeight: 'var(--ugl-font-display-line)',
        color: 'var(--ugl-color-text-primary)',
      }}
    >
      Biblioteca
    </h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--ugl-grid-gap)' }}>
      {items.map((item, posicao) => (
        <button
          key={item.id}
          type="button"
          aria-label={uglMediaLabel(item)}
          onClick={() => onOpen(posicao)}
          style={{
            padding: 0,
            border: 0,
            aspectRatio: '1',
            background: 'var(--ugl-color-background-tertiary)',
            cursor: 'pointer',
          }}
        >
          <img src={item.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </button>
      ))}
    </div>
  </div>
);

/**
 * Andaime da estória: um painel simples na camada `children`, para mostrar que
 * folhas do produto vivem DENTRO do visualizador (o `InfoPanel` real mora no
 * `BottomSheet`, que o produto monta aqui).
 */
const PainelSimples: React.FC<{ item: UglMediaItem; onClose: () => void }> = ({ item, onClose }) => (
  <section
    aria-label="Informações"
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 'var(--ugl-z-sheet)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ugl-spacing-xs)',
      padding: 'var(--ugl-spacing-l) var(--ugl-gutter) calc(var(--ugl-safe-area-bottom) + var(--ugl-spacing-l))',
      borderRadius: 'var(--ugl-radius-xl) var(--ugl-radius-xl) 0 0',
      background: 'var(--ugl-color-background-elevated)',
      boxShadow: 'var(--ugl-elevation-overlay)',
      color: 'var(--ugl-color-text-primary)',
    }}
  >
    <h2 style={texto('title-md')}>Informações</h2>
    <p style={texto('body-md')}>{uglFormatDateTime(item.takenAt)}</p>
    {item.location && <p style={{ ...texto('body-md'), color: 'var(--ugl-color-text-secondary)' }}>{item.location}</p>}
    {item.camera && <p style={{ ...texto('caption'), color: 'var(--ugl-color-text-secondary)' }}>{item.camera}</p>}
    <Button variant="secondary" size="sm" onClick={onClose}>
      Fechar
    </Button>
  </section>
);

/**
 * Visualizador com estado de produto: favoritar e excluir mudam a lista, o
 * painel de informações abre na camada `children` e fechar volta à grade.
 */
const VisualizadorNaTela: React.FC<
  Partial<Pick<UglMediaViewerProps, 'onClose' | 'onFavorite' | 'onChromeHiddenChange' | 'onIndexChange' | 'showFilmstrip'>> & {
    items?: UglMediaItem[];
    inicial?: number;
    abertoAoIniciar?: boolean;
    infoAoIniciar?: boolean;
    theme?: UglTheme;
    scale?: number;
  }
> = ({
  items: itemsIniciais = uglMediaItems,
  inicial = 0,
  abertoAoIniciar = true,
  infoAoIniciar = false,
  theme,
  scale = 0.75,
  onClose,
  onFavorite,
  onChromeHiddenChange,
  onIndexChange,
  showFilmstrip,
}) => {
  const [items, setItems] = useState(itemsIniciais);
  const [indice, setIndice] = useState(inicial);
  const [aberto, setAberto] = useState(abertoAoIniciar);
  const [info, setInfo] = useState(infoAoIniciar);
  const atual = items[Math.min(indice, items.length - 1)];

  return (
    <PhoneFrame scale={scale} theme={theme} ariaLabel="Aparelho com a galeria">
      <BibliotecaSimples
        items={items}
        onOpen={(posicao) => {
          setIndice(posicao);
          setAberto(true);
        }}
      />
      <MediaViewer
        items={items}
        open={aberto && items.length > 0}
        index={indice}
        onIndexChange={(posicao) => {
          setIndice(posicao);
          onIndexChange?.(posicao);
        }}
        now={uglDemoNow}
        theme={theme}
        infoOpen={info}
        showFilmstrip={showFilmstrip}
        onChromeHiddenChange={onChromeHiddenChange}
        onClose={() => {
          setAberto(false);
          setInfo(false);
          onClose?.();
        }}
        onShare={() => undefined}
        onFavorite={(item, proximo) => {
          setItems((lista) => lista.map((entrada) => (entrada.id === item.id ? { ...entrada, favorite: proximo } : entrada)));
          onFavorite?.(item, proximo);
        }}
        onInfo={() => setInfo((atual) => !atual)}
        onEdit={() => undefined}
        onDelete={(item) => {
          setItems((lista) => lista.filter((entrada) => entrada.id !== item.id));
          setInfo(false);
        }}
        onMore={() => undefined}
      >
        {info && atual && <PainelSimples item={atual} onClose={() => setInfo(false)} />}
      </MediaViewer>
    </PhoneFrame>
  );
};

/** Visualizador estático para matrizes (sem estado de produto). */
const VisualizadorFixo: React.FC<Partial<UglMediaViewerProps> & { scale?: number; rotulo?: string }> = ({
  scale = 0.5,
  rotulo,
  items = uglMediaItems,
  ...props
}) => (
  <PhoneFrame scale={scale} ariaLabel={rotulo ?? 'Aparelho'}>
    <MediaViewer
      items={items}
      now={uglDemoNow}
      onClose={() => undefined}
      onShare={() => undefined}
      onFavorite={() => undefined}
      onInfo={() => undefined}
      onEdit={() => undefined}
      onDelete={() => undefined}
      onMore={() => undefined}
      {...props}
    />
  </PhoneFrame>
);

const Legenda: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ ...texto('caption'), color: 'var(--ugl-color-text-secondary)', marginBottom: 8, maxWidth: 210 }}>{children}</div>
);

/**
 * Página de documentação rica do componente MediaViewer.
 */
const MediaViewerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Visualizador"
      title="MediaViewer"
      description="Visualizador de fotos e vídeos em tela cheia: fundo imersivo nos dois temas, barras translúcidas que respeitam as áreas seguras e somem com um toque, gestos de verdade (deslizar com mola, duplo toque, pinça, arrastar para fechar), teclado completo, vídeo real e a edição não destrutiva aplicada. A raiz declara data-ugl-immersive, e a barra de status do aparelho clareia sozinha."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="A mídia em primeiro plano, e todo o resto sob demanda."
    />
    <UglDocGrid>
      <UglDocCard icon="👆" title="Gestos por Pointer Events">
        Deslizar entre mídias acompanhando o dedo, com mola de volta; duplo toque amplia 2,5× no ponto;
        pinça de 1× a 4×; arrastar move a mídia ampliada até as bordas; arrastar para baixo em 1× fecha,
        esmaecendo o fundo; deslizar para cima abre as informações.
      </UglDocCard>
      <UglDocCard icon="⌨️" title="Teclado completo">
        ← e → navegam, Home e End vão às pontas, + e − (ou Ctrl/⌘ + roda) ampliam, 0 volta a 1×,
        Espaço toca ou pausa o vídeo e Esc fecha. O foco nasce no próprio diálogo.
      </UglDocCard>
      <UglDocCard icon="🎬" title="Vídeo real">
        <code>&lt;video&gt;</code> com <code>playsInline</code> e o quadro de capa como pôster, lido pelo{' '}
        <code>useVideoPlayback</code> e comandado pelo <code>VideoControls</code> e pelo botão central.
        Trocar de mídia para o vídeo anterior.
      </UglDocCard>
      <UglDocCard icon="📱" title="Imersivo no aparelho">
        Sobreposição da TELA (<code>position: absolute; inset: 0</code>), na camada{' '}
        <code>--ugl-z-viewer</code>. As barras somam as áreas seguras, e o <code>PhoneFrame</code> clareia
        a barra de status ao ver <code>data-ugl-immersive</code>.
      </UglDocCard>
      <UglDocCard icon="🧩" title="Camada do produto">
        <code>children</code> é renderizado dentro do diálogo, por cima de tudo: folha de informações,
        compartilhar, menu de opções e confirmação de exclusão vivem ali.
      </UglDocCard>
      <UglDocCard icon="🪄" title="Edição aplicada">
        Filtro, ajustes, rotação, corte e vinheta da edição não destrutiva aparecem na exibição; a
        mídia original não é tocada.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas, camadas e todas as escolhas de comportamento."
    />
    <UglDocSpecs
      component="MediaViewer"
      layout="Tela cheia · barra superior · palco · barra inferior"
      specs={[
        { label: 'Camada', value: '--ugl-z-viewer (20)' },
        { label: 'Fundo', value: '--ugl-color-immersive-surface' },
        { label: 'Barras', value: 'immersive-bar · blur 16px' },
        { label: 'Barra superior', value: 'safe-area-top + 50px' },
        { label: 'Barra inferior', value: 'vídeo + tira + 50px + safe-area-bottom' },
        { label: 'Espaço entre mídias', value: '--ugl-spacing-l (16px)' },
        { label: 'Ampliação', value: '1× a 4× · duplo toque 2,5×' },
        { label: 'Limiar do deslize', value: '20% da largura ou 0,5 px/ms' },
        { label: 'Arrastar para fechar', value: '25% da altura ou 0,6 px/ms' },
        { label: 'Botão central', value: 'IconButton immersive lg (56px)' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Duas camadas: raiz e diálogo',
          detail:
            'a raiz (data-ugl-immersive, z-viewer) contém o fundo e o painel role="dialog". O useModalFocus esconde (aria-hidden) os irmãos do PAI do painel — ou seja, a grade atrás —, e o fundo separado permite esmaecê-lo no arraste para fechar sem mexer no painel.',
        },
        {
          subject: 'Foco inicial no próprio diálogo',
          detail:
            'o painel tem tabIndex=-1 e recebe o foco ao abrir. Com o foco no botão voltar, Espaço fecharia o visualizador em vez de tocar o vídeo; no diálogo, setas e Espaço já são do visualizador. O Tab segue para o primeiro botão.',
        },
        {
          subject: 'Cromo escondido continua acessível',
          detail:
            'esconder o cromo só zera a opacidade e o alvo de ponteiro das barras, setas e tira — nada sai da árvore acessível nem do Tab. O foco por teclado (:focus-visible) num controle escondido traz o cromo de volta. Esconder com aria-hidden deixaria botões focáveis sem nome, e inert tiraria o teclado de quem não vê a tela.',
        },
        {
          subject: 'Ações só com callback',
          detail:
            'Compartilhar, Favoritar, Informações, Editar (só fotos) e Excluir aparecem quando o callback correspondente existe; "Mais opções" idem, com aria-haspopup="menu" e o botão como âncora. Um produto sem exclusão não mostra a lixeira.',
        },
        {
          subject: 'Favoritar sem estado próprio',
          detail:
            'o botão reflete item.favorite (aria-pressed, coração preenchido em immersive-favorite) e pede o próximo estado em onFavorite. Quem muda a biblioteca é o produto.',
        },
        {
          subject: 'Só vizinhas montam conteúdo; só a aberta monta vídeo',
          detail:
            'o trilho tem uma posição por mídia, mas só a aberta e as duas vizinhas montam a imagem (pré-carregadas para o deslize). O <video> existe só na aberta: trocar de mídia desmonta e, portanto, para o vídeo anterior.',
        },
        {
          subject: 'Mola do trilho',
          detail:
            'o trilho assenta com --ugl-media-viewer-spring (380ms, cubic-bezier(0.34, 1.26, 0.64, 1)): uma ultrapassagem leve, a sensação de "volta" do deslize que não chegou ao limiar. A ampliação usa --ugl-transition-slow, sem ultrapassagem. Movimento reduzido desliga as duas.',
        },
        {
          subject: 'Limiar, resistência e decisão do gesto',
          detail:
            'o gesto só é decidido depois de 8px: horizontal desliza; para baixo fecha; para cima pede informações; ampliado, move. Solto além de 20% da largura (ou a 0,5 px/ms), passa à vizinha. Nas pontas o deslize resiste a 35% do percurso.',
        },
        {
          subject: 'Toque simples espera 280ms',
          detail:
            'para distinguir do duplo toque, o toque simples só alterna o cromo depois de 280ms sem segundo toque. O duplo toque (segundo toque em até 280ms, a menos de 30px) alterna 1× ↔ 2,5× mantendo o ponto tocado sob o dedo.',
        },
        {
          subject: 'Ampliado não troca de mídia pelo gesto',
          detail:
            'com a mídia ampliada, o dedo move a imagem (limitada às bordas) e não desliza para a vizinha — confundir os dois é o erro mais comum de visualizadores. Para seguir, volte a 1× (duplo toque, pinça ou 0) ou use setas e tira; teclas e tira sempre navegam.',
        },
        {
          subject: 'Deslizar para cima abre informações',
          detail:
            'extensão do contrato: um deslize vertical para cima em 1× (12% da altura ou 0,5 px/ms) chama onInfo, como nos aparelhos. Sem onInfo, o gesto não faz nada.',
        },
        {
          subject: 'Arrastar para fechar',
          detail:
            'a mídia acompanha o dedo, encolhe até 75% e o fundo esmaece até 10% — a grade aparece por baixo. Soltar além de 25% da altura (ou a 0,6 px/ms) chama onClose; senão tudo volta. O cromo some durante o arraste.',
        },
        {
          subject: 'Medidas locais sob a escala do aparelho',
          detail:
            'o PhoneFrame em scale 0,75 encolhe a tela com transform. Os deslocamentos do ponteiro são divididos pela escala visual (offsetWidth ÷ largura na tela), para que a mídia acompanhe o dedo exatamente em qualquer escala.',
        },
        {
          subject: 'Ctrl/⌘ + roda por listener nativo',
          detail:
            'o onWheel do React é passivo e não consegue impedir a ampliação da página; a roda é assinada no palco com passive: false. Sem Ctrl/⌘, a roda não faz nada.',
        },
        {
          subject: 'Setas laterais só com ponteiro fino',
          detail:
            'os botões Anterior/Próxima aparecem no hover apenas em (hover: hover) and (pointer: fine); no toque, o deslize é o caminho. Usam back (chevron_left) e chevronRight, os glifos de navegação do registro.',
        },
        {
          subject: 'Contador falado',
          detail:
            '"3 de 25" vive numa região aria-live polida visualmente oculta, e cada posição do trilho é um grupo com aria-roledescription="slide" e o mesmo rótulo. As não abertas levam aria-hidden.',
        },
        {
          subject: 'Barra superior sólida translúcida',
          detail:
            'immersive-bar com desfoque, e não um degradê sobre a mídia: o título e a hora precisam de contraste garantido sobre qualquer fotografia. O título é o dia (uglFormatDayLabel); a segunda linha, hora e lugar.',
        },
        {
          subject: 'Vinheta na cor da superfície imersiva',
          detail:
            'a camada de vinheta é um radial-gradient de transparente a --ugl-color-immersive-surface, com a opacidade de uglVignetteOpacity. Vídeos não recebem edição: o editor só edita fotos.',
        },
        {
          subject: 'Duração conhecida antes dos metadados',
          detail:
            'enquanto o <video> não publica a duração, os controles usam item.duration — a trilha já nasce habilitada e o tempo total certo.',
        },
        {
          subject: 'Erro de imagem',
          detail:
            'se a imagem falhar, o quadro mostra brokenImage (xl) e "Não foi possível carregar" sobre immersive-control; o nome acessível mantém o alt.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Raiz imersiva, palco com trilho, cromo e a camada do produto."
    />
    <UglDocStage label="Foto com o cromo visível" surface="secondary" align="flex-start">
      <VisualizadorFixo rotulo="Aparelho de anatomia" scale={0.6} defaultIndex={0} />
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Raiz imersiva', role: 'Camada absoluta da tela com data-ugl-immersive; esmaece no arraste.', token: '--ugl-z-viewer · --ugl-color-immersive-surface' },
            { name: 'Barra superior', role: 'Fechar, dia, hora e lugar, Mais opções. Recuo da área segura.', token: '--ugl-color-immersive-bar · --ugl-safe-area-top' },
            { name: 'Palco e trilho', role: 'Recebe os ponteiros; o trilho desliza entre as mídias.', token: '--ugl-media-viewer-gap · --ugl-media-viewer-spring' },
            { name: 'Quadro da mídia', role: 'Proporção editada, contida na tela; imagem ou vídeo com a edição.', token: 'container-type: size' },
            { name: 'Botão central', role: 'Reproduzir o vídeo pausado.', token: '--ugl-color-immersive-control' },
            { name: 'Barra inferior', role: 'VideoControls, Filmstrip e ações. Recuo da área segura.', token: '--ugl-color-immersive-bar · --ugl-safe-area-bottom' },
            { name: 'Camada do produto', role: 'children: folhas e menus por cima de tudo.', token: '--ugl-z-sheet' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Foto, vídeo, edição, cromo escondido, informações e erro."
    />
    <UglDocStage surface="secondary" align="flex-start">
      <div>
        <Legenda>Foto (início: sem seta Anterior)</Legenda>
        <VisualizadorFixo rotulo="Foto" defaultIndex={0} />
      </div>
      <div>
        <Legenda>Vídeo pausado, com controles</Legenda>
        <VisualizadorFixo rotulo="Vídeo" defaultIndex={PRIMEIRO_VIDEO} />
      </div>
      <div>
        <Legenda>Foto editada (Nostalgia, 4:5, vinheta)</Legenda>
        <VisualizadorFixo rotulo="Foto editada" items={[FOTO_EDITADA]} />
      </div>
      <div>
        <Legenda>Cromo escondido</Legenda>
        <VisualizadorFixo rotulo="Cromo escondido" defaultIndex={2} defaultChromeHidden />
      </div>
      <div>
        <Legenda>Informações abertas (botão pressionado)</Legenda>
        <VisualizadorFixo rotulo="Informações" defaultIndex={3} infoOpen />
      </div>
      <div>
        <Legenda>Imagem que não carregou</Legenda>
        <VisualizadorFixo rotulo="Erro" items={[FOTO_QUEBRADA]} />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso do visualizador." />
    <UglDocPractices
      dos={[
        'Renderizar o visualizador dentro da tela (PhoneFrame ou contêiner posicionado), nunca num portal.',
        'Passar os mesmos itens, na mesma ordem, que a grade mostra — o deslize percorre essa lista.',
        'Montar folhas, menus e diálogos do produto em children, para ficarem por cima e dentro do foco preso.',
        'Informar now e timeZone, para "Hoje" e "Ontem" não variarem entre máquinas.',
        'Fechar o visualizador quando a lista esvaziar (depois de excluir a última mídia).',
      ]}
      donts={[
        'Renderizar o visualizador com position: fixed na janela: ele sairia do aparelho.',
        'Montar um <video> por mídia: só a aberta toca; as outras só gastam memória e rede.',
        'Guardar favorito ou exclusão dentro do visualizador: ele devolve intenções, o produto decide.',
        'Esconder o cromo com display: none ou aria-hidden: o teclado e o leitor de tela perderiam as ações.',
        'Usar o visualizador sobre fundo claro no tema claro: a mídia se vê sobre o imersivo nos dois temas.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O visualizador é invariante; o tema chega à camada do produto (o painel de informações)."
    />
    <UglDocThemeSwitcher surface="secondary">
      {(tema) => <VisualizadorNaTela key={tema} theme={tema} scale={0.6} inicial={3} infoAoIniciar />}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do componente MediaViewer."
    />
    <UglDocPropsTable
      title="MediaViewer"
      rows={[
        { name: 'items', type: 'UglMediaItem[]', description: 'Mídias navegáveis. Vazio não renderiza nada. Obrigatório.' },
        { name: 'index', type: 'number', description: 'Índice aberto (controlado). Fora da lista, é limitado às pontas.' },
        { name: 'defaultIndex', type: 'number', default: '0', description: 'Índice inicial quando não controlado.' },
        { name: 'onIndexChange', type: '(index: number) => void', description: 'Deslize, setas, Home/End e tira.' },
        { name: 'open', type: 'boolean', default: 'true', description: 'Fechado, não renderiza nada (o estado de gesto recomeça ao abrir).' },
        { name: 'onClose', type: '() => void', description: 'Voltar, Esc e arrastar para baixo. Obrigatório.' },
        { name: 'now', type: 'Date | string', description: 'Referência para "Hoje" e "Ontem".' },
        { name: 'timeZone', type: 'string', default: "'America/Sao_Paulo'", description: 'Fuso das datas.' },
        { name: 'onShare', type: '(item) => void', description: 'Mostra Compartilhar.' },
        { name: 'onFavorite', type: '(item, next: boolean) => void', description: 'Mostra Favoritar (aria-pressed = item.favorite).' },
        { name: 'onInfo', type: '(item) => void', description: 'Mostra Informações e liga o deslize para cima.' },
        { name: 'onEdit', type: '(item) => void', description: 'Mostra Editar em fotos.' },
        { name: 'onDelete', type: '(item) => void', description: 'Mostra Excluir, em immersive-danger.' },
        { name: 'onMore', type: '(item, anchorEl: HTMLButtonElement) => void', description: 'Mostra Mais opções (aria-haspopup="menu").' },
        { name: 'infoOpen', type: 'boolean', default: 'false', description: 'Pressiona o botão de informações.' },
        { name: 'chromeHidden', type: 'boolean', description: 'Cromo escondido (controlado).' },
        { name: 'defaultChromeHidden', type: 'boolean', default: 'false', description: 'Cromo escondido ao abrir.' },
        { name: 'onChromeHiddenChange', type: '(hidden: boolean) => void', description: 'Toque na mídia ou foco por teclado no cromo.' },
        { name: 'showFilmstrip', type: 'boolean', default: 'true', description: 'Tira de miniaturas (a partir de dois itens).' },
        { name: 'ariaLabel', type: 'string', default: "'Visualizador de fotos'", description: 'Nome do diálogo.' },
        { name: 'children', type: 'ReactNode', description: 'Camada do produto, por cima, dentro do diálogo.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema da camada do produto. O visualizador é invariante.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional na raiz.' },
      ]}
    />
    <UglDocPropsTable
      title="Teclado"
      rows={[
        { name: '← / →', type: 'tecla', description: 'Mídia anterior / próxima.' },
        { name: 'Home / End', type: 'tecla', description: 'Primeira / última mídia.' },
        { name: '+ / −', type: 'tecla', description: 'Amplia / reduz 1,5× em torno do centro (1× a 4×).' },
        { name: '0', type: 'tecla', description: 'Volta a 1×.' },
        { name: 'Ctrl/⌘ + roda', type: 'roda', description: 'Amplia em torno do cursor.' },
        { name: 'Espaço', type: 'tecla', description: 'Toca ou pausa o vídeo (com o foco no diálogo).' },
        { name: 'Esc', type: 'tecla', description: 'Fecha (só a camada do topo).' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MediaViewer> = {
  title: 'Unoogaleria/Componentes/MediaViewer',
  component: MediaViewer,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Mídias navegáveis.' },
    index: { control: { type: 'number', min: 0 }, description: 'Índice aberto (controlado).' },
    defaultIndex: {
      control: { type: 'range', min: 0, max: uglMediaItems.length - 1, step: 1 },
      description: 'Índice inicial.',
    },
    open: { control: 'boolean', description: 'Visualizador aberto.' },
    now: { control: 'text', description: 'Referência para "Hoje" e "Ontem".' },
    timeZone: { control: 'text', description: 'Fuso das datas.' },
    infoOpen: { control: 'boolean', description: 'Botão de informações pressionado.' },
    chromeHidden: { control: 'boolean', description: 'Cromo escondido (controlado).' },
    defaultChromeHidden: { control: 'boolean', description: 'Cromo escondido ao abrir.' },
    showFilmstrip: { control: 'boolean', description: 'Tira de miniaturas.' },
    ariaLabel: { control: 'text', description: 'Nome do diálogo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema da camada do produto.' },
    children: { control: false, description: 'Camada do produto.' },
    onIndexChange: { action: 'onIndexChange' },
    onClose: { action: 'onClose' },
    onShare: { action: 'onShare' },
    onFavorite: { action: 'onFavorite' },
    onInfo: { action: 'onInfo' },
    onEdit: { action: 'onEdit' },
    onDelete: { action: 'onDelete' },
    onMore: { action: 'onMore' },
    onChromeHiddenChange: { action: 'onChromeHiddenChange' },
  },
  args: {
    items: uglMediaItems,
    defaultIndex: 0,
    open: true,
    now: uglDemoNow,
    timeZone: 'America/Sao_Paulo',
    infoOpen: false,
    defaultChromeHidden: false,
    showFilmstrip: true,
    ariaLabel: 'Visualizador de fotos',
  },
};

export default meta;

type Story = StoryObj<typeof MediaViewer>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MediaViewerDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas, dentro do aparelho.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do MediaViewer',
  render: (args) => (
    <PhoneFrame scale={0.75} ariaLabel="Aparelho do playground">
      <MediaViewer {...args} />
    </PhoneFrame>
  ),
};

/**
 * A galeria no aparelho: toque numa miniatura, deslize, amplie, favorite,
 * abra as informações e arraste para baixo para voltar.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: galeria com visualizador',
  render: () => <VisualizadorNaTela inicial={0} />,
};

/**
 * Um vídeo real: botão central, controles na barra inferior e Espaço para tocar.
 */
export const ExemploVideo: Story = {
  name: '🎨 Exemplo de composição: vídeo',
  render: () => <VisualizadorNaTela inicial={PRIMEIRO_VIDEO} />,
};

/**
 * Foto, vídeo, foto editada e mídia única (sem tira).
 */
export const TodasVariantes: Story = {
  render: () => (
    <UglDocStage surface="secondary" align="flex-start">
      <div>
        <Legenda>Foto</Legenda>
        <VisualizadorFixo rotulo="Foto" defaultIndex={0} />
      </div>
      <div>
        <Legenda>Vídeo</Legenda>
        <VisualizadorFixo rotulo="Vídeo" defaultIndex={PRIMEIRO_VIDEO} />
      </div>
      <div>
        <Legenda>Foto editada</Legenda>
        <VisualizadorFixo rotulo="Foto editada" items={[FOTO_EDITADA]} />
      </div>
      <div>
        <Legenda>Sem tira de miniaturas</Legenda>
        <VisualizadorFixo rotulo="Sem tira" defaultIndex={4} showFilmstrip={false} />
      </div>
    </UglDocStage>
  ),
};

/**
 * Cromo escondido, informações abertas, última mídia e erro de imagem.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage surface="secondary" align="flex-start">
      <div>
        <Legenda>Cromo escondido</Legenda>
        <VisualizadorFixo rotulo="Cromo escondido" defaultIndex={2} defaultChromeHidden />
      </div>
      <div>
        <Legenda>Informações abertas</Legenda>
        <VisualizadorFixo rotulo="Informações abertas" defaultIndex={3} infoOpen />
      </div>
      <div>
        <Legenda>Última mídia (sem seta Próxima)</Legenda>
        <VisualizadorFixo rotulo="Última mídia" defaultIndex={uglMediaItems.length - 1} />
      </div>
      <div>
        <Legenda>Imagem que não carregou</Legenda>
        <VisualizadorFixo rotulo="Erro" items={[FOTO_QUEBRADA]} />
      </div>
    </UglDocStage>
  ),
};

/**
 * Os dois temas: o visualizador não muda; o painel do produto acompanha.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UglDocStage key={tema} label={tema === 'light' ? 'Tema claro' : 'Tema escuro'} theme={tema} surface="secondary">
          <VisualizadorNaTela theme={tema} scale={0.6} inicial={3} infoAoIniciar />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * → avança (o contador falado vira "2 de N"), ← volta e Esc fecha.
 */
export const NavegacaoPorTeclado: Story = {
  name: 'Teclado: setas e Esc',
  args: { onClose: fn(), onIndexChange: fn() },
  render: (args) => <VisualizadorNaTela onClose={args.onClose} onIndexChange={args.onIndexChange} />,
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const total = uglMediaItems.length;
    const dialogo = tela.getByRole('dialog', { name: 'Visualizador de fotos' });

    await waitFor(() => expect(dialogo).toHaveFocus());
    await expect(tela.getByText(`1 de ${total}`)).toBeInTheDocument();

    await userEvent.keyboard('{ArrowRight}');
    await expect(args.onIndexChange).toHaveBeenLastCalledWith(1);
    await expect(tela.getByText(`2 de ${total}`)).toBeInTheDocument();

    await userEvent.keyboard('{ArrowLeft}');
    await expect(tela.getByText(`1 de ${total}`)).toBeInTheDocument();

    await userEvent.keyboard('{End}');
    await expect(tela.getByText(`${total} de ${total}`)).toBeInTheDocument();
    await userEvent.keyboard('{Home}');

    await userEvent.keyboard('{Escape}');
    await expect(args.onClose).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(tela.queryByRole('dialog', { name: 'Visualizador de fotos' })).not.toBeInTheDocument());
  },
};

/**
 * Favoritar alterna aria-pressed (o produto atualiza a lista).
 */
export const Favoritar: Story = {
  name: 'Favoritar alterna o estado',
  args: { onFavorite: fn() },
  render: (args) => <VisualizadorNaTela onFavorite={args.onFavorite} />,
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const favoritar = tela.getByRole('button', { name: 'Favoritar' });
    const inicial = Boolean(uglMediaItems[0].favorite);

    await expect(favoritar).toHaveAttribute('aria-pressed', String(inicial));
    await userEvent.click(favoritar);
    await expect(args.onFavorite).toHaveBeenCalledWith(expect.objectContaining({ id: uglMediaItems[0].id }), !inicial);
    await expect(favoritar).toHaveAttribute('aria-pressed', String(!inicial));
    await userEvent.click(favoritar);
    await expect(favoritar).toHaveAttribute('aria-pressed', String(inicial));
  },
};

/**
 * Um toque na mídia esconde o cromo; outro o traz de volta.
 */
export const CromoAoTocar: Story = {
  name: 'Toque esconde o cromo',
  args: { onChromeHiddenChange: fn() },
  render: (args) => <VisualizadorNaTela onChromeHiddenChange={args.onChromeHiddenChange} />,
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const dialogo = tela.getByRole('dialog', { name: 'Visualizador de fotos' });
    const palco = tela.getByRole('group', { name: 'Mídias' });

    await expect(dialogo).toHaveAttribute('data-ugl-chrome', 'visible');
    await userEvent.click(palco);
    await waitFor(() => expect(dialogo).toHaveAttribute('data-ugl-chrome', 'hidden'));
    await expect(args.onChromeHiddenChange).toHaveBeenLastCalledWith(true);

    await userEvent.click(palco);
    await waitFor(() => expect(dialogo).toHaveAttribute('data-ugl-chrome', 'visible'));
    await expect(args.onChromeHiddenChange).toHaveBeenLastCalledWith(false);
  },
};
