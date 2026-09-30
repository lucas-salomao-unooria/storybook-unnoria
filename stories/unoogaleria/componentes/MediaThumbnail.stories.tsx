import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { MediaThumbnail } from '../../../src/unoogaleria/components/MediaThumbnail';
import {
  uglDaysLeft,
  uglDefaultAdjustments,
  uglDefaultEdit,
  uglMediaLabel,
} from '../../../src/unoogaleria/media';
import type { UglMediaItem } from '../../../src/unoogaleria/media';
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
import { uglDemoNow, uglMediaItems, uglPhotos, uglTrashItems, uglVideos } from '../fixtures';

const BAR = '#716C98';

/* Mídia de demonstração tirada das fixtures. */
const FOTO = uglPhotos[0];
const FAVORITA = uglPhotos.find((item) => item.favorite) ?? uglPhotos[1];
const COM_SUBTIPO = uglMediaItems.find((item) => item.subtypes?.includes('live')) ?? uglPhotos[2];
const VIDEO = uglVideos[0];
const NA_LIXEIRA = uglTrashItems.map((item) => ({
  item,
  dias: uglDaysLeft(item.deletedAt!, { now: uglDemoNow }),
}));

/* Edições não destrutivas declaradas aqui: as fixtures não trazem edição. */
const EDITADAS: { rotulo: string; item: UglMediaItem }[] = [
  {
    rotulo: 'Filtro Mono + vinheta 60',
    item: {
      ...uglPhotos[3],
      id: 'demo-mono',
      edit: { ...uglDefaultEdit, filter: 'mono', adjustments: { ...uglDefaultAdjustments, vignette: 60 } },
    },
  },
  {
    rotulo: 'Quente + temperatura 40',
    item: {
      ...uglPhotos[4],
      id: 'demo-quente',
      edit: { ...uglDefaultEdit, filter: 'quente', adjustments: { ...uglDefaultAdjustments, warmth: 40 } },
    },
  },
  {
    rotulo: 'Girada 90° e espelhada',
    item: { ...uglPhotos[5], id: 'demo-girada', edit: { ...uglDefaultEdit, rotation: 90, flipX: true } },
  },
  {
    rotulo: 'Endireitada 12°',
    item: { ...uglPhotos[6], id: 'demo-endireitada', edit: { ...uglDefaultEdit, straighten: 12 } },
  },
];

const diasTexto = (dias: number) => `${dias} ${dias === 1 ? 'dia' : 'dias'}`;

const QUEBRADA: UglMediaItem = { ...uglPhotos[7], id: 'demo-quebrada', src: '/unoogaleria/arquivo-inexistente.svg' };

const Celula: React.FC<{ rotulo: string; largura?: number; children: React.ReactNode }> = ({
  rotulo,
  largura = 120,
  children,
}) => (
  <div style={{ width: largura, display: 'grid', gap: 6 }}>
    {children}
    <span style={{ fontFamily: 'var(--ugl-font-sans)', fontSize: 12, color: 'var(--ugl-color-text-secondary)' }}>
      {rotulo}
    </span>
  </div>
);

/**
 * Miniatura em modo de seleção controlada pelo produto.
 */
const MiniaturaSelecionavel: React.FC<{
  item: UglMediaItem;
  theme?: 'light' | 'dark';
  onLongPress?: (item: UglMediaItem) => void;
}> = ({ item, theme, onLongPress }) => {
  const [marcada, setMarcada] = useState(false);
  return (
    <Celula rotulo={marcada ? 'Selecionada' : 'Livre'}>
      <MediaThumbnail
        theme={theme}
        item={item}
        now={uglDemoNow}
        selectable
        selected={marcada}
        onClick={() => setMarcada((atual) => !atual)}
        onLongPress={onLongPress}
      />
    </Celula>
  );
};

/**
 * Página de documentação rica do componente MediaThumbnail.
 */
const MediaThumbnailDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Grade"
      title="MediaThumbnail"
      description="Miniatura de uma foto ou de um vídeo: aplica a edição não destrutiva da mídia (filtro, rotação, espelho, endireitamento e vinheta) e mostra os selos sobre a imagem — favorito, duração, subtipos e o prazo da lixeira. No modo de seleção, ganha o círculo, o véu claro e recua de leve."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="A célula da grade, e de onde mais a mídia aparece pequena." />
    <UglDocGrid>
      <UglDocCard icon="🖼️" title="Edição não destrutiva">
        A mídia original nunca é reescrita: <code>item.edit</code> vira <code>filter</code> e{' '}
        <code>transform</code> na imagem (<code>uglEditToFilter</code>,{' '}
        <code>uglEditToTransform</code>) e uma camada de vinheta (<code>uglVignetteOpacity</code>).
      </UglDocCard>
      <UglDocCard icon="🏷️" title="Selos sobre a mídia">
        Coração de favorito (inferior esquerdo), duração do vídeo (inferior direito), subtipos
        (superior esquerdo) e, na lixeira, “N dias”. Todos em branco de mídia sobre o véu invariante.
      </UglDocCard>
      <UglDocCard icon="☑️" title="Seleção">
        Com <code>selectable</code>, é um botão de alternância (<code>aria-pressed</code>) com o
        círculo de 24px; marcada, o círculo preenche no roxo de ação com o visto e a mídia recua.
      </UglDocCard>
      <UglDocCard icon="✋" title="Pressão longa">
        <code>onLongPress</code> dispara após 500ms com o ponteiro parado, no clique secundário e nas
        teclas ContextMenu e Shift+F10. O clique que encerra a pressão não abre a mídia.
      </UglDocCard>
      <UglDocCard icon="♿" title="Nome completo">
        O nome acessível é <code>uglMediaLabel</code>: descrição, tipo e duração, data e favorito —
        mais os subtipos visíveis e os dias restantes na lixeira.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" description="Medidas e escolhas de composição." />
    <UglDocSpecs
      component="MediaThumbnail"
      layout="Botão · quadrado ou proporção original"
      specs={[
        { label: 'Proporção', value: "square (1:1) · original" },
        { label: 'Carregando', value: '--ugl-color-background-tertiary' },
        { label: 'Erro', value: 'glifo brokenImage · icon-secondary' },
        { label: 'Selos', value: 'media-scrim · media-text · 18px' },
        { label: 'Círculo de seleção', value: '24px · anel 2px · topo-direita 6px' },
        { label: 'Marcada', value: 'action-primary · check · véu 30% · escala 0,9' },
        { label: 'Foco', value: 'anel 2px focus-ring + anel claro interno' },
        { label: 'Imagem', value: 'loading="lazy" · decoding="async"' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Selos e mídia recuam juntos',
          detail:
            'marcada, a moldura inteira (mídia, véu e selos) escala para 0,9 e a borda da célula mostra a superfície; só o círculo de seleção fica no lugar. A escala é --ugl-media-thumbnail-selected-scale; em movimento reduzido não há transição.',
        },
        {
          subject: 'Degradê da base sob os selos',
          detail:
            'quando há coração, duração ou prazo, a base ganha o --ugl-gradient-media-bottom: o coração branco solto não teria contraste sobre uma foto clara. A duração e o prazo ainda têm a própria cápsula de media-scrim.',
        },
        {
          subject: 'Prazo curto com glifo, não com cor',
          detail:
            'status-warning sobre o véu escuro mediria abaixo de 3:1 no tema claro. Com 3 dias ou menos, a cápsula ganha o glifo timer e continua em branco de mídia — a pista não depende de cor. Na lixeira, o prazo toma o lugar do coração.',
        },
        {
          subject: 'Subtipo "live" em livePhoto',
          detail:
            'o registro de glifos não tem "live"; o selo de foto com movimento usa livePhoto (motion_photos_on). O rótulo de cada selo (uglSubtypeLabels) vai no title e no nome acessível.',
        },
        {
          subject: 'Imagem decorativa dentro do botão',
          detail:
            'a <img> tem alt vazio: o nome vem do aria-label do botão, que já contém o alt da mídia. Sem nenhum callback nem selectable, a raiz vira role="img" com o mesmo nome.',
        },
        {
          subject: 'Rotação na proporção original',
          detail:
            'em aspect="original" girada 90°, a caixa da imagem troca largura por altura antes de girar, e a célula assume a proporção de uglEditedRatio. Em quadrado, basta girar: o quadrado continua quadrado.',
        },
        {
          subject: 'Carregamento sem esconder a imagem',
          detail:
            'a superfície terciária aparece por baixo até a imagem pintar; a imagem não fica transparente esperando o load, para não sumir se o evento se perder na hidratação. O estado vai no atributo data-state.',
        },
        {
          subject: 'Medidas locais',
          detail:
            '--ugl-media-thumbnail-check-size (24px), --ugl-media-thumbnail-selected-scale (0,9) e --ugl-media-thumbnail-pill-height (18px, a linha de caption-strong). Pressão longa: 500ms, cancelada por 10px de movimento.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Mídia, selos e círculo de seleção." />
    <UglDocStage label="Vídeo favorito com subtipo, marcado (160px)" surface="secondary" align="flex-start" padding={16}>
      <div style={{ width: 160 }}>
        <MediaThumbnail item={{ ...VIDEO, favorite: true }} now={uglDemoNow} selectable selected onClick={() => undefined} />
      </div>
      <div style={{ width: 160 }}>
        <MediaThumbnail item={COM_SUBTIPO} now={uglDemoNow} showSubtype onClick={() => undefined} />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Mídia', role: 'Imagem com a edição aplicada, sobre a superfície de carregamento.', token: '--ugl-color-background-tertiary' },
            { name: 'Subtipos', role: 'Cápsulas redondas no canto superior esquerdo.', token: '--ugl-color-media-scrim · --ugl-color-media-text' },
            { name: 'Favorito', role: 'Coração preenchido no canto inferior esquerdo.', token: '--ugl-color-media-text · --ugl-gradient-media-bottom' },
            { name: 'Duração / prazo', role: 'Cápsula com a duração (ou "N dias" na lixeira).', token: '--ugl-color-media-scrim' },
            { name: 'Círculo de seleção', role: 'Vazio: anel branco sobre o véu. Marcado: roxo de ação com o visto.', token: '--ugl-color-action-primary · --ugl-color-text-on-action' },
            { name: 'Véu', role: 'Camada clara sobre a mídia marcada.', token: '--ugl-color-media-veil-selected' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes, tamanhos e estados" description="Selos, edições, proporções e estados." />
    <UglDocStage label="Selos" surface="secondary" align="flex-start" padding={16} gap={12}>
      <Celula rotulo="Foto">
        <MediaThumbnail item={{ ...FOTO, favorite: false }} now={uglDemoNow} onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Favorita">
        <MediaThumbnail item={FAVORITA} now={uglDemoNow} onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Vídeo">
        <MediaThumbnail item={VIDEO} now={uglDemoNow} onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Subtipos">
        <MediaThumbnail item={COM_SUBTIPO} now={uglDemoNow} showSubtype onClick={() => undefined} />
      </Celula>
      {NA_LIXEIRA.map(({ item, dias }) => (
        <Celula key={item.id} rotulo={`Lixeira · ${diasTexto(dias)}`}>
          <MediaThumbnail item={item} now={uglDemoNow} daysLeft={dias} onClick={() => undefined} />
        </Celula>
      ))}
    </UglDocStage>
    <UglDocStage label="Edição não destrutiva" surface="secondary" align="flex-start" padding={16} gap={12}>
      {EDITADAS.map(({ rotulo, item }) => (
        <Celula key={item.id} rotulo={rotulo}>
          <MediaThumbnail item={item} now={uglDemoNow} onClick={() => undefined} />
        </Celula>
      ))}
    </UglDocStage>
    <UglDocStage label="Proporção original" surface="secondary" align="flex-start" padding={16} gap={12}>
      <Celula rotulo="Vertical" largura={100}>
        <MediaThumbnail item={VIDEO} aspect="original" now={uglDemoNow} onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Quadrada" largura={140}>
        <MediaThumbnail item={FOTO} aspect="original" now={uglDemoNow} onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Girada 90°" largura={140}>
        <MediaThumbnail item={EDITADAS[2].item} aspect="original" now={uglDemoNow} onClick={() => undefined} />
      </Celula>
    </UglDocStage>
    <UglDocStage label="Estados" surface="secondary" align="flex-start" padding={16} gap={12}>
      <Celula rotulo="Seleção livre">
        <MediaThumbnail item={FOTO} now={uglDemoNow} selectable onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Selecionada">
        <MediaThumbnail item={FOTO} now={uglDemoNow} selectable selected onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Esmaecida">
        <MediaThumbnail item={FOTO} now={uglDemoNow} dimmed onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Não carregou">
        <MediaThumbnail item={QUEBRADA} now={uglDemoNow} onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Só imagem (role=img)">
        <MediaThumbnail item={FOTO} now={uglDemoNow} />
      </Celula>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso da miniatura." />
    <UglDocPractices
      dos={[
        'Escrever alt descritivos: ele abre o nome acessível da miniatura.',
        'Passar now e timeZone quando a data do nome importa (e sempre nas estórias).',
        'Calcular daysLeft com uglDaysLeft e passá-lo só na lixeira.',
        'Usar showSubtype em telas de tipo de mídia e na busca, onde o subtipo é a informação.',
      ]}
      donts={[
        'Recriar a edição com outra lógica: use uglEditToFilter e uglEditToTransform.',
        'Colorir o prazo curto de laranja sobre a mídia: o contraste cai abaixo de 3:1.',
        'Pôr texto por cima da miniatura além dos selos: a grade é uma superfície de imagens.',
        'Usar a miniatura como botão sem onClick/selectable: ela vira imagem e não recebe foco.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Os selos são invariantes; o círculo marcado e o carregamento acompanham o tema." />
    <UglDocThemeSwitcher surface="secondary" padding={16}>
      {(tema) => (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <MiniaturaSelecionavel item={FAVORITA} theme={tema} />
          <Celula rotulo="Vídeo">
            <MediaThumbnail theme={tema} item={VIDEO} now={uglDemoNow} onClick={() => undefined} />
          </Celula>
          <Celula rotulo="Não carregou">
            <MediaThumbnail theme={tema} item={QUEBRADA} now={uglDemoNow} onClick={() => undefined} />
          </Celula>
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" description="Contrato público do componente MediaThumbnail." />
    <UglDocPropsTable
      title="MediaThumbnail"
      rows={[
        { name: 'item', type: 'UglMediaItem', description: 'A mídia. item.edit é aplicada na exibição. Obrigatório.' },
        { name: 'aspect', type: "'square' | 'original'", default: "'square'", description: 'Quadrada com corte ao centro, ou na proporção exibida.' },
        { name: 'selectable', type: 'boolean', default: 'false', description: 'Modo de seleção: círculo e aria-pressed.' },
        { name: 'selected', type: 'boolean', default: 'false', description: 'Marcada (com selectable).' },
        { name: 'onClick', type: '(item, event) => void', description: 'Toque: abrir ou alternar.' },
        { name: 'onLongPress', type: '(item) => void', description: 'Pressão longa, clique secundário, ContextMenu ou Shift+F10.' },
        { name: 'showFavorite', type: 'boolean', default: 'true', description: 'Coração quando item.favorite.' },
        { name: 'showDuration', type: 'boolean', default: 'true', description: 'Duração do vídeo.' },
        { name: 'showSubtype', type: 'boolean', default: 'false', description: 'Selos de subtipo.' },
        { name: 'daysLeft', type: 'number', description: 'Dias restantes na lixeira ("1 dia" / "N dias").' },
        { name: 'dimmed', type: 'boolean', default: 'false', description: 'Esmaece a mídia.' },
        { name: 'now', type: 'Date | string', description: 'Referência das datas do nome acessível.' },
        { name: 'timeZone', type: 'string', default: "'America/Sao_Paulo'", description: 'Fuso das datas.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: '...rest', type: 'ButtonHTMLAttributes<HTMLButtonElement>', description: 'Atributos nativos do botão (tabIndex, data-*).' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MediaThumbnail> = {
  title: 'Unoogaleria/Componentes/MediaThumbnail',
  component: MediaThumbnail,
  parameters: { layout: 'padded' },
  argTypes: {
    item: { control: 'object', description: 'A mídia exibida.' },
    aspect: { control: 'radio', options: ['square', 'original'], description: 'Proporção.' },
    selectable: { control: 'boolean', description: 'Modo de seleção.' },
    selected: { control: 'boolean', description: 'Marcada.' },
    showFavorite: { control: 'boolean', description: 'Coração de favorito.' },
    showDuration: { control: 'boolean', description: 'Duração do vídeo.' },
    showSubtype: { control: 'boolean', description: 'Selos de subtipo.' },
    daysLeft: { control: { type: 'number', min: 0, max: 30 }, description: 'Dias restantes na lixeira.' },
    dimmed: { control: 'boolean', description: 'Esmaecida.' },
    now: { control: 'text', description: 'Momento de referência.' },
    timeZone: { control: 'text', description: 'Fuso das datas.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onClick: { action: 'onClick', description: 'Toque.' },
    onLongPress: { action: 'onLongPress', description: 'Pressão longa.' },
  },
  args: {
    item: VIDEO,
    aspect: 'square',
    selectable: false,
    selected: false,
    showFavorite: true,
    showDuration: true,
    showSubtype: false,
    dimmed: false,
    now: uglDemoNow,
    timeZone: 'America/Sao_Paulo',
    theme: 'light',
    onClick: fn(),
    onLongPress: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof MediaThumbnail>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MediaThumbnailDocumentationPage />,
};

/**
 * Playground com todas as propriedades da MediaThumbnail expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da MediaThumbnail',
  render: (args) => (
    <UglDocStage theme={args.theme} surface="secondary" padding={16}>
      <div style={{ width: 180 }}>
        <MediaThumbnail {...args} />
      </div>
    </UglDocStage>
  ),
};

/**
 * Uma linha da grade: foto, favorita, vídeo e uma editada, uma delas marcada.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: linha da grade em seleção',
  render: () => (
    <UglDocStage surface="primary" padding={16}>
      <div style={{ width: 390, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--ugl-grid-gap)' }}>
        {[FOTO, VIDEO, EDITADAS[0].item].map((item, indice) => (
          <MediaThumbnail key={item.id} item={item} now={uglDemoNow} selectable selected={indice === 1} onClick={() => undefined} />
        ))}
      </div>
    </UglDocStage>
  ),
};

/**
 * Todos os selos e as edições.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UglDocStage surface="secondary" align="flex-start" padding={16} gap={12}>
      <Celula rotulo="Favorita">
        <MediaThumbnail item={FAVORITA} now={uglDemoNow} onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Vídeo">
        <MediaThumbnail item={VIDEO} now={uglDemoNow} onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Subtipos">
        <MediaThumbnail item={COM_SUBTIPO} now={uglDemoNow} showSubtype onClick={() => undefined} />
      </Celula>
      {NA_LIXEIRA.map(({ item, dias }) => (
        <Celula key={item.id} rotulo={diasTexto(dias)}>
          <MediaThumbnail item={item} now={uglDemoNow} daysLeft={dias} onClick={() => undefined} />
        </Celula>
      ))}
      {EDITADAS.map(({ rotulo, item }) => (
        <Celula key={item.id} rotulo={rotulo}>
          <MediaThumbnail item={item} now={uglDemoNow} onClick={() => undefined} />
        </Celula>
      ))}
    </UglDocStage>
  ),
};

/**
 * Tamanhos de célula: 7, 5 e 3 colunas numa tela de 390px, e a proporção original.
 */
export const Tamanhos: Story = {
  render: () => (
    <UglDocStage surface="secondary" align="flex-start" padding={16} gap={12}>
      {[54, 76, 128, 180].map((largura) => (
        <Celula key={largura} rotulo={`${largura}px`} largura={largura}>
          <MediaThumbnail item={VIDEO} now={uglDemoNow} onClick={() => undefined} />
        </Celula>
      ))}
      <Celula rotulo="original" largura={100}>
        <MediaThumbnail item={VIDEO} aspect="original" now={uglDemoNow} onClick={() => undefined} />
      </Celula>
    </UglDocStage>
  ),
};

/**
 * Livre, marcada, esmaecida, com erro e não interativa.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage surface="secondary" align="flex-start" padding={16} gap={12}>
      <Celula rotulo="Livre">
        <MediaThumbnail item={FOTO} now={uglDemoNow} selectable onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Marcada">
        <MediaThumbnail item={FOTO} now={uglDemoNow} selectable selected onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Esmaecida">
        <MediaThumbnail item={FOTO} now={uglDemoNow} dimmed onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Não carregou">
        <MediaThumbnail item={QUEBRADA} now={uglDemoNow} onClick={() => undefined} />
      </Celula>
      <Celula rotulo="Só imagem">
        <MediaThumbnail item={FOTO} now={uglDemoNow} />
      </Celula>
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
        <UglDocStage key={tema} label={tema === 'light' ? 'Tema claro' : 'Tema escuro'} theme={tema} surface="secondary" padding={16} gap={12}>
          <Celula rotulo="Marcada">
            <MediaThumbnail item={FAVORITA} now={uglDemoNow} selectable selected onClick={() => undefined} />
          </Celula>
          <Celula rotulo="Livre">
            <MediaThumbnail item={VIDEO} now={uglDemoNow} selectable onClick={() => undefined} />
          </Celula>
          <Celula rotulo="Não carregou">
            <MediaThumbnail item={QUEBRADA} now={uglDemoNow} onClick={() => undefined} />
          </Celula>
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Alternância por clique, pressão longa por teclado e o nome na lixeira.
 */
export const SelecaoEPressaoLonga: Story = {
  name: 'Seleção e pressão longa',
  args: { onLongPress: fn() },
  render: (args) => (
    <UglDocStage surface="secondary" padding={16} gap={12}>
      <MiniaturaSelecionavel item={FAVORITA} onLongPress={args.onLongPress} />
      <Celula rotulo="Lixeira">
        <MediaThumbnail item={NA_LIXEIRA[0].item} now={uglDemoNow} daysLeft={NA_LIXEIRA[0].dias} onClick={() => undefined} />
      </Celula>
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const miniatura = tela.getByRole('button', { name: uglMediaLabel(FAVORITA, { now: uglDemoNow }) });

    await expect(miniatura).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(miniatura);
    await expect(miniatura).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(miniatura);
    await expect(miniatura).toHaveAttribute('aria-pressed', 'false');

    // Shift+F10 é a pressão longa do teclado, e não alterna a seleção.
    miniatura.focus();
    await userEvent.keyboard('{Shift>}{F10}{/Shift}');
    await expect(args.onLongPress).toHaveBeenCalledWith(FAVORITA);
    await expect(miniatura).toHaveAttribute('aria-pressed', 'false');

    const { item, dias } = NA_LIXEIRA[0];
    await expect(
      tela.getByRole('button', {
        name: `${uglMediaLabel(item, { now: uglDemoNow })}, ${dias} ${dias === 1 ? 'dia restante' : 'dias restantes'}`,
      })
    ).toBeInTheDocument();
  },
};
