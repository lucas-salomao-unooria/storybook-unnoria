import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { MediaGrid } from '../../../src/unoogaleria/components/MediaGrid';
import { TopBar } from '../../../src/unoogaleria/components/TopBar';
import { TabBar } from '../../../src/unoogaleria/components/TabBar';
import type { UglTabBarItem } from '../../../src/unoogaleria/components/TabBar';
import { SelectionBar } from '../../../src/unoogaleria/components/SelectionBar';
import { Button } from '../../../src/unoogaleria/components/Button';
import { IconButton } from '../../../src/unoogaleria/components/IconButton';
import { Icon } from '../../../src/unoogaleria/components/Icon';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import {
  uglDaysLeft,
  uglFormatCount,
  uglFormatSelection,
  uglGroupMedia,
  uglMediaLabel,
} from '../../../src/unoogaleria/media';
import type { UglGroupBy, UglMediaItem } from '../../../src/unoogaleria/media';
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
import { uglDemoNow, uglMediaItems, uglTrashItems } from '../fixtures';

const BAR = '#716C98';

/** A biblioteca agrupada por dia, na ordem da grade. */
const GRUPOS = uglGroupMedia(uglMediaItems, 'day', { now: uglDemoNow });
const PLANA = GRUPOS.flatMap((grupo) => grupo.items);
const nomeDe = (item: UglMediaItem) => uglMediaLabel(item, { now: uglDemoNow });

const ABAS: UglTabBarItem[] = [
  { id: 'biblioteca', label: 'Biblioteca', icon: 'library', iconActive: 'libraryFilled' },
  { id: 'para-voce', label: 'Para você', icon: 'memories', iconActive: 'memoriesFilled' },
  { id: 'albuns', label: 'Álbuns', icon: 'albums', iconActive: 'albumsFilled' },
  { id: 'busca', label: 'Busca', icon: 'search' },
];

const NIVEIS = [3, 5, 7];

/** Centenas de itens, repetindo a biblioteca com ids únicos, para medir a fluidez. */
const MUITOS: UglMediaItem[] = Array.from({ length: 12 }, (_, volta) =>
  uglMediaItems.map((item) => ({
    ...item,
    id: `${item.id}-v${volta}`,
    takenAt: new Date(new Date(item.takenAt).getTime() - volta * 45 * 86_400_000).toISOString(),
  }))
).flat();

const Legenda: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ margin: '8px 0 0', fontFamily: 'var(--ugl-font-sans)', fontSize: 12, color: 'var(--ugl-color-text-secondary)' }}>
    {children}
  </p>
);

/**
 * A biblioteca completa no aparelho: zoom controlado, abrir, pressão longa para
 * entrar na seleção, "Selecionar" por dia, arraste de intervalo e excluir.
 * Tudo o que a grade pede, o produto aplica aqui.
 */
const TelaBiblioteca: React.FC<{
  theme?: 'light' | 'dark';
  itens?: UglMediaItem[];
  onOpen?: (item: UglMediaItem, index: number) => void;
}> = ({ theme, itens = uglMediaItems, onOpen }) => {
  const [biblioteca, setBiblioteca] = useState(itens);
  const [colunas, setColunas] = useState(3);
  const [selecionando, setSelecionando] = useState(false);
  const [ids, setIds] = useState<string[]>([]);
  const [aberto, setAberto] = useState<string>('nenhuma');

  const alternar = (item: UglMediaItem) =>
    setIds((atual) => (atual.includes(item.id) ? atual.filter((id) => id !== item.id) : [...atual, item.id]));

  const sair = () => {
    setSelecionando(false);
    setIds([]);
  };

  const nivel = NIVEIS.indexOf(colunas);

  return (
    <div>
      <PhoneFrame scale={0.75} theme={theme}>
        <TopBar
          variant="overlay"
          title={selecionando ? uglFormatSelection(ids.length) : 'Biblioteca'}
          leading={
            selecionando ? (
              <Button
                variant="tertiary"
                onClick={() => setIds(ids.length === biblioteca.length ? [] : biblioteca.map((item) => item.id))}
              >
                {ids.length === biblioteca.length ? 'Desmarcar tudo' : 'Selecionar tudo'}
              </Button>
            ) : (
              <>
                <IconButton
                  icon="zoomOut"
                  label="Afastar (mais colunas)"
                  disabled={nivel === NIVEIS.length - 1}
                  onClick={() => setColunas(NIVEIS[nivel + 1])}
                />
                <IconButton
                  icon="zoomIn"
                  label="Aproximar (menos colunas)"
                  disabled={nivel === 0}
                  onClick={() => setColunas(NIVEIS[nivel - 1])}
                />
              </>
            )
          }
          actions={
            <Button variant="tertiary" onClick={() => (selecionando ? sair() : setSelecionando(true))}>
              {selecionando ? 'Cancelar' : 'Selecionar'}
            </Button>
          }
        />
        <MediaGrid
          items={biblioteca}
          now={uglDemoNow}
          columns={colunas}
          onColumnsChange={setColunas}
          selectable={selecionando}
          selectedIds={ids}
          onToggle={alternar}
          onToggleSection={(grupo, todos) => {
            const doGrupo = grupo.items.map((item) => item.id);
            setIds((atual) =>
              todos ? atual.filter((id) => !doGrupo.includes(id)) : Array.from(new Set([...atual, ...doGrupo]))
            );
          }}
          onRangeSelect={(intervalo) =>
            setIds((atual) => Array.from(new Set([...atual, ...intervalo.map((item) => item.id)])))
          }
          onLongPress={(item) => {
            setSelecionando(true);
            setIds((atual) => (atual.includes(item.id) ? atual : [...atual, item.id]));
          }}
          onOpen={(item, index, lista) => {
            setAberto(`${item.alt} (${index + 1} de ${lista.length})`);
            onOpen?.(item, index);
          }}
          topInset={44}
          bottomInset={50}
          footer={uglFormatCount(biblioteca)}
        />
        {selecionando ? (
          <SelectionBar
            floating
            count={ids.length}
            actions={[
              { id: 'compartilhar', icon: 'share', label: 'Compartilhar', onClick: () => undefined },
              { id: 'album', icon: 'addToAlbum', label: 'Adicionar a um álbum', onClick: () => undefined },
              {
                id: 'excluir',
                icon: 'delete',
                label: 'Excluir',
                tone: 'danger',
                onClick: () => {
                  setBiblioteca((atual) => atual.filter((item) => !ids.includes(item.id)));
                  sair();
                },
              },
            ]}
          />
        ) : (
          <TabBar items={ABAS} activeId="biblioteca" floating />
        )}
      </PhoneFrame>
      <Legenda>
        Aberta: <output aria-label="Mídia aberta">{aberto}</output> · {colunas} colunas
      </Legenda>
    </div>
  );
};

/**
 * Trezentos itens em 7 colunas, com o zoom pela pinça e pela roda.
 */
const TelaCentenas: React.FC = () => {
  const [colunas, setColunas] = useState(7);
  const contagem = useMemo(() => uglFormatCount(MUITOS), []);
  return (
    <PhoneFrame scale={0.75}>
      <TopBar variant="overlay" title="Biblioteca" subtitle={`${colunas} colunas`} />
      <MediaGrid items={MUITOS} now={uglDemoNow} columns={colunas} onColumnsChange={setColunas} topInset={46} footer={contagem} />
    </PhoneFrame>
  );
};

/**
 * Grade em moldura simples, para as matrizes.
 */
const Moldura: React.FC<{ rotulo: string; altura?: number; children: React.ReactNode }> = ({
  rotulo,
  altura = 300,
  children,
}) => (
  <div style={{ width: 280 }}>
    <div style={{ height: altura, display: 'flex', borderRadius: 12, overflow: 'hidden', boxShadow: '0 0 0 1px var(--ugl-color-border-subtle)' }}>
      {children}
    </div>
    <Legenda>{rotulo}</Legenda>
  </div>
);

/**
 * Página de documentação rica do componente MediaGrid.
 */
const MediaGridDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Grade"
      title="MediaGrid"
      description="A grade da biblioteca: fotos e vídeos agrupados por dia sob cabeçalhos colantes, com zoom de 3, 5 e 7 colunas pela pinça e por Ctrl/⌘ + roda, abertura no visualizador, pressão longa para entrar na seleção, “Selecionar” por dia e seleção por arraste. Rola sozinha, por baixo das barras sobrepostas e da barra de status."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="A peça central da galeria." />
    <UglDocGrid>
      <UglDocCard icon="📅" title="Agrupada por dia">
        <code>items</code> + <code>groupBy</code> (dia, mês, ano ou nenhum) usa{' '}
        <code>uglGroupMedia</code> com <code>now</code> e <code>timeZone</code>: “Hoje”, “Ontem”, o dia
        da semana, a data. Ou passe <code>sections</code> já montadas.
      </UglDocCard>
      <UglDocCard icon="🔍" title="Zoom de colunas">
        Pinça com dois dedos, Ctrl/⌘ + roda (e a pinça do trackpad) e as teclas <code>+</code> e{' '}
        <code>-</code> andam entre <code>zoomLevels</code>. A primeira miniatura visível continua no
        mesmo ponto depois da troca, e “5 colunas” é anunciado.
      </UglDocCard>
      <UglDocCard icon="☑️" title="Seleção">
        <code>selectable</code> transforma as miniaturas em alternâncias e dá a cada dia “Selecionar”
        / “Desmarcar”. Arrastar o ponteiro sobre as miniaturas pede o intervalo (
        <code>onRangeSelect</code>); o produto aplica.
      </UglDocCard>
      <UglDocCard icon="✋" title="Pressão longa">
        <code>onLongPress</code> recebe a pressão de 500ms, o clique secundário e as teclas ContextMenu
        e Shift+F10 — o jeito comum de entrar no modo de seleção a partir de uma foto.
      </UglDocCard>
      <UglDocCard icon="⌨️" title="Teclado">
        Um só ponto de Tab na grade. ←/→ andam de item em item, ↑/↓ de linha em linha atravessando os
        dias, Home e End vão à primeira e à última mídia. Enter e Espaço abrem ou alternam.
      </UglDocCard>
      <UglDocCard icon="⚡" title="Fluida com centenas">
        Nenhum movimento de ponteiro renderiza a grade; as miniaturas são memoizadas, e cada dia fora da
        tela deixa de pintar (<code>content-visibility: auto</code>) com o tamanho reservado exato.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" description="Medidas, semântica e gestos." />
    <UglDocSpecs
      component="MediaGrid"
      layout="Rolagem própria · 3 / 5 / 7 colunas · 2px"
      specs={[
        { label: 'Colunas', value: 'zoomLevels = [3, 5, 7]' },
        { label: 'Espaço', value: '--ugl-grid-gap (2px)' },
        { label: 'Recuo superior', value: '--ugl-safe-area-top + topInset' },
        { label: 'Recuo inferior', value: '--ugl-safe-area-bottom + bottomInset' },
        { label: 'Cabeçalho colante', value: 'SectionHeader md · surface-bar + blur' },
        { label: 'Superfície', value: '--ugl-color-background-primary' },
        { label: 'Pinça', value: 'razão 1,25 por nível' },
        { label: 'Roda', value: 'ΣdeltaY 40 · 180ms entre níveis' },
        { label: 'Arraste', value: 'limiar 8px · rolagem automática a 48px da borda' },
        { label: 'Semântica', value: 'region › group por dia › list › botões' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Listas por dia, e não role="grid"',
          detail:
            'as colunas mudam com o zoom e os dias quebram as linhas; um role="grid" exigiria recalcular role="row" a cada nível. A grade é uma região rotulada com um role="group" por dia (e não <section>, que viraria um marco por dia) e uma lista de botões em cada um. O cabeçalho é um <h2> real, navegável pelos atalhos de título.',
        },
        {
          subject: 'Widget composto com roving tabindex',
          detail:
            'só uma miniatura tem tabIndex=0 (a última focada, ou a primeira); Tab sai da grade para o próximo controle em vez de atravessar centenas de fotos. As setas seguem a ordem visual: ↑/↓ mantêm a coluna ao passar de um dia para o outro. Home/End vão ao início e ao fim da biblioteca.',
        },
        {
          subject: 'Zoom: aproximar = menos colunas',
          detail:
            'afastar os dedos, rolar para cima com Ctrl/⌘ e a tecla + diminuem as colunas (as fotos crescem). A troca preserva a primeira miniatura visível, anuncia o nível numa região viva e, onde o navegador tem View Transitions, faz um esmaecimento curto — desligado em movimento reduzido. + e - só valem com o foco numa miniatura.',
        },
        {
          subject: 'touch-action: pan-y',
          detail:
            'o navegador rola na vertical; a pinça e o arraste lateral ficam com a grade. Arrastar na vertical com o dedo continua rolando (e cancela o arraste de seleção); com o mouse, arrastar para perto da borda rola sozinho.',
        },
        {
          subject: 'onRangeSelect entrega o intervalo e a âncora',
          detail:
            'a grade não guarda seleção. A cada troca do intervalo (da miniatura em que o arraste começou até a que está sob o ponteiro), chama onRangeSelect(items, anchor); o clique que encerra o arraste é descartado. O segundo argumento é extensão do contrato.',
        },
        {
          subject: 'Tamanho intrínseco exato',
          detail:
            'cada dia usa content-visibility: auto com contain-intrinsic-block-size calculado das colunas, das linhas e do espaço (a grade é container-type: inline-size), então o tamanho reservado de um dia fora da tela é o que ele terá: a barra de rolagem não pula.',
        },
        {
          subject: 'Cabeçalho md e ação nomeada',
          detail:
            'os cabeçalhos são SectionHeader md (16px) para colar tomando pouca altura, com a ação "Selecionar Hoje" / "Desmarcar Hoje" — nome completo porque há um por dia.',
        },
        {
          subject: 'thumbnailProps',
          detail:
            'extensão do contrato para selos por item — a lixeira passa daysLeft com uglDaysLeft. A função deve devolver só primitivos, para que a memoização das miniaturas continue valendo.',
        },
        {
          subject: 'Recuos somados à área segura',
          detail:
            'a grade sempre soma --ugl-safe-area-top/bottom ao próprio recuo e corre por baixo da barra de status. Com barras sobrepostas, passe topInset (44 da TopBar overlay) e bottomInset (50 da TabBar ou da SelectionBar floating).',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Região de rolagem, dias, cabeçalhos e miniaturas." />
    <UglDocStage label="A biblioteca no aparelho" surface="secondary" align="flex-start" padding={16}>
      <TelaBiblioteca />
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Região de rolagem', role: 'role="region" rotulada, com o recuo da área segura e das barras.', token: '--ugl-color-background-primary · --ugl-safe-area-*' },
            { name: 'Dia', role: 'role="group" com o nome do dia e do lugar.', token: 'content-visibility: auto' },
            { name: 'Cabeçalho colante', role: 'SectionHeader md com "Selecionar" / "Desmarcar" no modo de seleção.', token: '--ugl-color-surface-bar · --ugl-section-header-sticky-top' },
            { name: 'Miniaturas', role: 'MediaThumbnail em lista, 3/5/7 por linha.', token: '--ugl-grid-gap' },
            { name: 'Rodapé', role: 'A contagem da biblioteca, depois da última linha.', token: '--ugl-color-text-secondary' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes, tamanhos e estados" description="Agrupamentos, níveis de zoom e estados." />
    <UglDocStage label="Níveis de zoom" surface="secondary" align="flex-start" padding={16} gap={16}>
      {NIVEIS.map((colunas) => (
        <Moldura key={colunas} rotulo={`${colunas} colunas`}>
          <MediaGrid items={uglMediaItems} now={uglDemoNow} columns={colunas} ariaLabel={`Grade com ${colunas} colunas`} />
        </Moldura>
      ))}
    </UglDocStage>
    <UglDocStage label="Agrupamentos" surface="secondary" align="flex-start" padding={16} gap={16}>
      {(['day', 'month', 'year', 'none'] as UglGroupBy[]).map((agrupamento) => (
        <Moldura key={agrupamento} rotulo={`groupBy="${agrupamento}"`}>
          <MediaGrid items={uglMediaItems} now={uglDemoNow} groupBy={agrupamento} columns={agrupamento === 'none' ? 5 : 3} ariaLabel={`Agrupada por ${agrupamento}`} />
        </Moldura>
      ))}
    </UglDocStage>
    <UglDocStage label="Estados" surface="secondary" align="flex-start" padding={16} gap={16}>
      <Moldura rotulo="Seleção com um dia inteiro marcado">
        <MediaGrid
          items={uglMediaItems}
          now={uglDemoNow}
          selectable
          selectedIds={GRUPOS[0].items.map((item) => item.id).concat(GRUPOS[1].items[0].id)}
          onToggleSection={() => undefined}
          ariaLabel="Grade em seleção"
        />
      </Moldura>
      <Moldura rotulo="Lixeira (thumbnailProps → daysLeft)">
        <MediaGrid
          items={uglTrashItems}
          now={uglDemoNow}
          groupBy="none"
          showHeaders={false}
          thumbnailProps={(item) => ({ daysLeft: uglDaysLeft(item.deletedAt!, { now: uglDemoNow }) })}
          footer="Os itens são apagados de vez depois de 30 dias."
          ariaLabel="Excluídos recentemente"
        />
      </Moldura>
      <Moldura rotulo="Vazia (padrão)">
        <MediaGrid items={[]} ariaLabel="Grade vazia" />
      </Moldura>
      <Moldura rotulo="Sem cabeçalhos, espaço de 0px">
        <MediaGrid items={uglMediaItems} now={uglDemoNow} showHeaders={false} gap={0} ariaLabel="Mosaico sem espaço" />
      </Moldura>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso da grade." />
    <UglDocPractices
      dos={[
        'Dar à grade um contêiner de altura definida (a tela do PhoneFrame, um flex com min-height: 0).',
        'Passar now e timeZone: são eles que decidem "Hoje" e "Ontem".',
        'Guardar colunas e seleção no produto quando outras peças dependem delas (zoom na barra, contagem na SelectionBar).',
        'Passar topInset/bottomInset iguais às barras sobrepostas, e deixar a grade correr por baixo.',
        'Entrar na seleção pela pressão longa e sair por uma ação explícita ("Cancelar").',
      ]}
      donts={[
        'Envolver a grade num contêiner que também rola: são duas barras de rolagem e o cabeçalho colante perde a referência.',
        'Criar callbacks que devolvem objetos novos em thumbnailProps: a memoização das miniaturas se perde.',
        'Somar a área segura por fora: a grade já soma.',
        'Desligar os cabeçalhos numa biblioteca por dia: o cabeçalho é a única pista de quando.',
        'Aplicar a seleção por arraste sem mostrar a contagem: a pessoa precisa ver o que marcou.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Superfície, cabeçalhos e seleção acompanham o tema; os selos são invariantes." />
    <UglDocThemeSwitcher surface="secondary" padding={16}>
      {(tema) => <TelaBiblioteca theme={tema} />}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" description="Contrato público do componente MediaGrid." />
    <UglDocPropsTable
      title="MediaGrid"
      rows={[
        { name: 'sections', type: 'UglMediaSection[]', description: 'Grupos já montados (ignora items e groupBy).' },
        { name: 'items', type: 'UglMediaItem[]', description: 'Mídia solta, agrupada com uglGroupMedia.' },
        { name: 'groupBy', type: "'day' | 'month' | 'year' | 'none'", default: "'day'", description: 'Agrupamento de items.' },
        { name: 'columns', type: 'number', description: 'Colunas (controlado).' },
        { name: 'defaultColumns', type: 'number', default: '3', description: 'Colunas iniciais (não controlado).' },
        { name: 'onColumnsChange', type: '(columns: number) => void', description: 'Pedido de troca: pinça, Ctrl/⌘ + roda, + e -.' },
        { name: 'zoomLevels', type: 'number[]', default: '[3, 5, 7]', description: 'Níveis de zoom, em colunas.' },
        { name: 'gap', type: 'number', default: '2 (token)', description: 'Espaço entre miniaturas, em px.' },
        { name: 'selectable', type: 'boolean', default: 'false', description: 'Modo de seleção.' },
        { name: 'selectedIds', type: 'string[]', default: '[]', description: 'Selecionados (guardados pelo produto).' },
        { name: 'onToggle', type: '(item) => void', description: 'Toque numa miniatura no modo de seleção.' },
        { name: 'onToggleSection', type: '(section, allSelected) => void', description: '"Selecionar" / "Desmarcar" do grupo; allSelected diz se o grupo já estava todo marcado.' },
        { name: 'onOpen', type: '(item, index, flatItems) => void', description: 'Toque fora do modo de seleção.' },
        { name: 'onLongPress', type: '(item) => void', description: 'Pressão longa, clique secundário, ContextMenu ou Shift+F10.' },
        { name: 'onRangeSelect', type: '(items, anchor) => void', description: 'Intervalo do arraste de seleção (anchor é extensão).' },
        { name: 'dragSelect', type: 'boolean', default: 'true', description: 'Liga o arraste de seleção.' },
        { name: 'stickyHeaders', type: 'boolean', default: 'true', description: 'Cabeçalhos colantes.' },
        { name: 'showHeaders', type: 'boolean', default: 'true', description: 'Mostra os cabeçalhos.' },
        { name: 'ariaLabel', type: 'string', default: "'Fotos e vídeos'", description: 'Nome da região.' },
        { name: 'emptyState', type: 'ReactNode', description: 'Conteúdo sem mídia.' },
        { name: 'now', type: 'Date | string', description: 'Referência de "Hoje" e "Ontem".' },
        { name: 'timeZone', type: 'string', default: "'America/Sao_Paulo'", description: 'Fuso das datas.' },
        { name: 'footer', type: 'ReactNode', description: 'Rodapé depois da última linha.' },
        { name: 'topInset', type: 'number', default: '0', description: 'Recuo superior em px, somado à área segura.' },
        { name: 'bottomInset', type: 'number', default: '0', description: 'Recuo inferior em px, somado à área segura.' },
        { name: 'thumbnailProps', type: '(item) => UglMediaGridThumbnailOverrides', description: 'Selos por item: daysLeft, dimmed, showSubtype… (extensão).' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: '...rest', type: 'HTMLAttributes<HTMLDivElement>', description: 'Atributos nativos da região.' },
      ]}
    />
    <UglDocPropsTable
      title="UglMediaSection"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador estável do grupo (2026-09-28, 2026-09, 2026).' },
        { name: 'title', type: 'string', description: 'Rótulo do grupo.' },
        { name: 'subtitle', type: 'string', description: 'Lugar mais frequente do grupo.' },
        { name: 'items', type: 'UglMediaItem[]', description: 'Itens, do mais recente ao mais antigo.' },
      ]}
    />
    <UglDocPropsTable
      title="UglMediaGridThumbnailOverrides"
      rows={[
        { name: 'daysLeft', type: 'number', description: 'Dias restantes na lixeira.' },
        { name: 'dimmed', type: 'boolean', description: 'Esmaece a miniatura.' },
        { name: 'showFavorite', type: 'boolean', description: 'Coração de favorito.' },
        { name: 'showDuration', type: 'boolean', description: 'Duração do vídeo.' },
        { name: 'showSubtype', type: 'boolean', description: 'Selos de subtipo.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MediaGrid> = {
  title: 'Unoogaleria/Componentes/MediaGrid',
  component: MediaGrid,
  parameters: { layout: 'padded' },
  argTypes: {
    sections: { control: 'object', description: 'Grupos já montados.' },
    items: { control: 'object', description: 'Mídia solta.' },
    groupBy: { control: 'radio', options: ['day', 'month', 'year', 'none'], description: 'Agrupamento.' },
    columns: { control: { type: 'range', min: 1, max: 9, step: 1 }, description: 'Colunas (controlado).' },
    defaultColumns: { control: { type: 'number', min: 1, max: 9 }, description: 'Colunas iniciais.' },
    zoomLevels: { control: 'object', description: 'Níveis de zoom.' },
    gap: { control: { type: 'range', min: 0, max: 12, step: 1 }, description: 'Espaço em px.' },
    selectable: { control: 'boolean', description: 'Modo de seleção.' },
    selectedIds: { control: 'object', description: 'Selecionados.' },
    dragSelect: { control: 'boolean', description: 'Arraste de seleção.' },
    stickyHeaders: { control: 'boolean', description: 'Cabeçalhos colantes.' },
    showHeaders: { control: 'boolean', description: 'Mostra os cabeçalhos.' },
    ariaLabel: { control: 'text', description: 'Nome da região.' },
    now: { control: 'text', description: 'Referência de "Hoje".' },
    timeZone: { control: 'text', description: 'Fuso.' },
    topInset: { control: { type: 'number', min: 0 }, description: 'Recuo superior.' },
    bottomInset: { control: { type: 'number', min: 0 }, description: 'Recuo inferior.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    emptyState: { control: false },
    footer: { control: 'text', description: 'Rodapé.' },
    thumbnailProps: { control: false },
    onColumnsChange: { action: 'onColumnsChange' },
    onToggle: { action: 'onToggle' },
    onToggleSection: { action: 'onToggleSection' },
    onOpen: { action: 'onOpen' },
    onLongPress: { action: 'onLongPress' },
    onRangeSelect: { action: 'onRangeSelect' },
  },
  args: {
    items: uglMediaItems,
    groupBy: 'day',
    defaultColumns: 3,
    zoomLevels: NIVEIS,
    selectable: false,
    selectedIds: [],
    dragSelect: true,
    stickyHeaders: true,
    showHeaders: true,
    ariaLabel: 'Fotos e vídeos',
    now: uglDemoNow,
    timeZone: 'America/Sao_Paulo',
    topInset: 0,
    bottomInset: 0,
    theme: 'light',
    footer: uglFormatCount(uglMediaItems),
    onColumnsChange: fn(),
    onToggle: fn(),
    onToggleSection: fn(),
    onOpen: fn(),
    onLongPress: fn(),
    onRangeSelect: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof MediaGrid>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MediaGridDocumentationPage />,
};

/**
 * Playground com todas as propriedades da MediaGrid expostas, numa tela de 390×640.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da MediaGrid',
  render: (args) => (
    <UglDocStage theme={args.theme} surface="secondary" padding={16}>
      <div style={{ width: 390, height: 640, display: 'flex', borderRadius: 12, overflow: 'hidden' }}>
        <MediaGrid {...args} />
      </div>
    </UglDocStage>
  ),
};

/**
 * A biblioteca completa no aparelho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: biblioteca com seleção e zoom',
  parameters: { layout: 'centered' },
  render: () => <TelaBiblioteca />,
};

/**
 * Os quatro agrupamentos.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UglDocStage surface="secondary" align="flex-start" padding={16} gap={16}>
      {(['day', 'month', 'year', 'none'] as UglGroupBy[]).map((agrupamento) => (
        <Moldura key={agrupamento} rotulo={`groupBy="${agrupamento}"`}>
          <MediaGrid items={uglMediaItems} now={uglDemoNow} groupBy={agrupamento} ariaLabel={`Agrupada por ${agrupamento}`} />
        </Moldura>
      ))}
    </UglDocStage>
  ),
};

/**
 * Os três níveis de zoom.
 */
export const Tamanhos: Story = {
  render: () => (
    <UglDocStage surface="secondary" align="flex-start" padding={16} gap={16}>
      {NIVEIS.map((colunas) => (
        <Moldura key={colunas} rotulo={`${colunas} colunas`}>
          <MediaGrid items={uglMediaItems} now={uglDemoNow} columns={colunas} ariaLabel={`Grade com ${colunas} colunas`} />
        </Moldura>
      ))}
    </UglDocStage>
  ),
};

/**
 * Seleção, lixeira, vazia e sem cabeçalhos.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage surface="secondary" align="flex-start" padding={16} gap={16}>
      <Moldura rotulo="Em seleção">
        <MediaGrid
          items={uglMediaItems}
          now={uglDemoNow}
          selectable
          selectedIds={GRUPOS[0].items.map((item) => item.id)}
          onToggleSection={() => undefined}
          ariaLabel="Grade em seleção"
        />
      </Moldura>
      <Moldura rotulo="Lixeira">
        <MediaGrid
          items={uglTrashItems}
          now={uglDemoNow}
          groupBy="none"
          showHeaders={false}
          thumbnailProps={(item) => ({ daysLeft: uglDaysLeft(item.deletedAt!, { now: uglDemoNow }) })}
          ariaLabel="Excluídos recentemente"
        />
      </Moldura>
      <Moldura rotulo="Vazia, com estado próprio">
        <MediaGrid
          items={[]}
          ariaLabel="Favoritos vazios"
          emptyState={
            <div style={{ display: 'grid', justifyItems: 'center', gap: 8, fontFamily: 'var(--ugl-font-sans)', color: 'var(--ugl-color-text-secondary)' }}>
              <Icon name="favorite" size="xl" tone="secondary" />
              <span>Nenhum favorito ainda</span>
            </div>
          }
        />
      </Moldura>
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
          <TelaBiblioteca theme={tema} />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * 300 itens em 7 colunas: a rolagem e o zoom continuam leves.
 */
export const CentenasDeItens: Story = {
  name: 'Centenas de itens',
  parameters: { layout: 'centered' },
  render: () => <TelaCentenas />,
};

/**
 * Setas movem o foco entre miniaturas (atravessando os dias) e Enter abre.
 */
export const NavegacaoEAbertura: Story = {
  name: 'Navegação por setas e abertura',
  args: { onOpen: fn() },
  render: (args) => (
    <UglDocStage surface="secondary" padding={16}>
      <div style={{ width: 390, height: 600, display: 'flex', borderRadius: 12, overflow: 'hidden' }}>
        <MediaGrid items={uglMediaItems} now={uglDemoNow} onOpen={args.onOpen} />
      </div>
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const miniatura = (indice: number) => tela.getByRole('button', { name: nomeDe(PLANA[indice]) });
    // "Hoje" tem 4 itens (duas linhas em 3 colunas) e "Ontem", 2.
    await expect(GRUPOS[0].items).toHaveLength(4);

    await expect(miniatura(0)).toHaveAttribute('tabindex', '0');
    await expect(miniatura(1)).toHaveAttribute('tabindex', '-1');

    miniatura(0).focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(miniatura(1)).toHaveFocus();
    await expect(miniatura(1)).toHaveAttribute('tabindex', '0');

    // ↓ na primeira linha de "Hoje" vai à segunda (a última do dia, coluna 1).
    await userEvent.keyboard('{ArrowDown}');
    await expect(miniatura(3)).toHaveFocus();
    // ↓ na última linha do dia passa para "Ontem", na mesma coluna possível.
    await userEvent.keyboard('{ArrowDown}');
    await expect(miniatura(4)).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    await expect(miniatura(3)).toHaveFocus();

    await userEvent.keyboard('{End}');
    await expect(miniatura(PLANA.length - 1)).toHaveFocus();
    await userEvent.keyboard('{Home}');
    await expect(miniatura(0)).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await expect(args.onOpen).toHaveBeenCalledWith(PLANA[0], 0, PLANA);

    await userEvent.click(miniatura(2));
    await expect(args.onOpen).toHaveBeenLastCalledWith(PLANA[2], 2, PLANA);
  },
};

/**
 * Pressão longa entra na seleção; clique alterna; "Selecionar" marca o dia.
 */
export const SelecaoPorGrupo: Story = {
  name: 'Seleção: pressão longa, clique e grupo',
  parameters: { layout: 'centered' },
  render: () => <TelaBiblioteca />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const miniatura = (indice: number) => tela.getByRole('button', { name: nomeDe(PLANA[indice]) });
    const hoje = GRUPOS[0];

    // Fora da seleção, a miniatura não é alternância.
    await expect(miniatura(0)).not.toHaveAttribute('aria-pressed');

    // A pressão longa pelo teclado entra na seleção com o item marcado.
    miniatura(0).focus();
    await userEvent.keyboard('{Shift>}{F10}{/Shift}');
    await waitFor(() => expect(miniatura(0)).toHaveAttribute('aria-pressed', 'true'));
    const barra = tela.getByRole('toolbar', { name: 'Ações da seleção' });
    await expect(within(barra).getByText(uglFormatSelection(1))).toBeInTheDocument();

    // Clique alterna.
    await userEvent.click(miniatura(1));
    await expect(miniatura(1)).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(miniatura(1));
    await expect(miniatura(1)).toHaveAttribute('aria-pressed', 'false');

    // "Selecionar Hoje" marca o dia inteiro e vira "Desmarcar Hoje".
    await userEvent.click(tela.getByRole('button', { name: `Selecionar ${hoje.title}` }));
    for (const item of hoje.items) {
      await expect(tela.getByRole('button', { name: nomeDe(item) })).toHaveAttribute('aria-pressed', 'true');
    }
    await expect(within(barra).getByText(uglFormatSelection(hoje.items.length))).toBeInTheDocument();

    await userEvent.click(tela.getByRole('button', { name: `Desmarcar ${hoje.title}` }));
    await expect(miniatura(0)).toHaveAttribute('aria-pressed', 'false');
    await expect(within(barra).getByRole('button', { name: 'Excluir' })).toBeDisabled();

    // Cancelar sai da seleção e devolve as abas.
    await userEvent.click(tela.getByRole('button', { name: 'Cancelar' }));
    await expect(tela.getByRole('navigation', { name: 'Navegação principal' })).toBeInTheDocument();
  },
};

/**
 * As teclas + e - pedem o nível vizinho de zoom, e o nível é anunciado.
 */
export const ZoomPorTeclado: Story = {
  name: 'Zoom por teclado',
  args: { onColumnsChange: fn() },
  render: (args) => (
    <UglDocStage surface="secondary" padding={16}>
      <div style={{ width: 390, height: 600, display: 'flex', borderRadius: 12, overflow: 'hidden' }}>
        <MediaGrid items={uglMediaItems} now={uglDemoNow} defaultColumns={3} onColumnsChange={args.onColumnsChange} />
      </div>
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const grade = tela.getByRole('region', { name: 'Fotos e vídeos' });
    tela.getByRole('button', { name: nomeDe(PLANA[0]) }).focus();

    await userEvent.keyboard('-');
    await waitFor(() => expect(args.onColumnsChange).toHaveBeenCalledWith(5));
    await waitFor(() => expect(grade.style.getPropertyValue('--ugl-media-grid-columns')).toBe('5'));
    await waitFor(() => expect(within(grade).getByText('5 colunas')).toBeInTheDocument());

    await userEvent.keyboard('+');
    await waitFor(() => expect(args.onColumnsChange).toHaveBeenLastCalledWith(3));
    // No menor nível, + não pede mais nada.
    await userEvent.keyboard('+');
    await expect(args.onColumnsChange).toHaveBeenCalledTimes(2);
  },
};
