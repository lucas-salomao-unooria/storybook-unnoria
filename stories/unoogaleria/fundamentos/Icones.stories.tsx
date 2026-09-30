import React, { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Icon, uglIcons, uglIconNames } from '../../../src/unoogaleria/components/Icon';
import type {
  UglIconDefinition,
  UglIconName,
  UglIconProps,
  UglIconSize,
  UglIconTone,
} from '../../../src/unoogaleria/components/Icon';
import { uglIconSizes, type UglTheme } from '../../../src/unoogaleria/tokens';
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

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const DOC = {
  text: 'var(--ugl-color-text-primary)',
  muted: 'var(--ugl-color-text-secondary)',
  accent: 'var(--ugl-color-text-accent)',
  border: 'var(--ugl-color-border-subtle)',
  surface: 'var(--ugl-color-background-primary)',
  subtle: 'var(--ugl-color-background-secondary)',
} as const;

const THEME_LABEL: Record<UglTheme, string> = { light: 'Tema claro', dark: 'Tema escuro' };

const definitionOf = (name: UglIconName) => uglIcons[name] as UglIconDefinition;

/**
 * Grupos do registro, na ordem dos blocos de `IconGlyphs.ts`. A tipagem garante
 * que todo nome existe; `Outros` recolhe o que for acrescentado ao registro sem
 * entrar aqui, para que o catálogo mostre sempre TODOS os glifos.
 */
const GROUPS: { title: string; names: UglIconName[] }[] = [
  { title: 'Abas', names: ['library', 'libraryFilled', 'albums', 'albumsFilled', 'memories', 'memoriesFilled', 'search'] },
  { title: 'Navegação', names: ['back', 'close', 'chevronRight', 'expand', 'collapse', 'more', 'moreVertical'] },
  {
    title: 'Ações de mídia',
    names: [
      'share', 'favorite', 'favoriteFilled', 'info', 'infoFilled', 'edit', 'pencil', 'delete', 'deleteForever',
      'restore', 'addToAlbum', 'add', 'addPhoto', 'newAlbum', 'duplicate', 'copy', 'download', 'upload',
      'cloudDone', 'link', 'send', 'print', 'slideshow', 'hide', 'show', 'lock', 'unlock', 'keep',
    ],
  },
  { title: 'Seleção', names: ['check', 'checkCircle', 'circle', 'selectAll'] },
  {
    title: 'Organização',
    names: ['grid', 'zoomIn', 'zoomOut', 'sort', 'filter', 'calendar', 'today', 'recent', 'history', 'timer'],
  },
  {
    title: 'Tipos de mídia',
    names: ['photo', 'brokenImage', 'video', 'movie', 'selfie', 'livePhoto', 'screenshot', 'panorama', 'burst', 'hdr', 'gif', 'imported'],
  },
  { title: 'Metadados', names: ['camera', 'aspectRatio', 'location', 'people', 'person', 'personAdd', 'face', 'label'] },
  {
    title: 'Categorias de busca',
    names: ['pets', 'food', 'landscape', 'city', 'nature', 'travel', 'birthday', 'car', 'document', 'explore', 'imageSearch'],
  },
  { title: 'Vídeo', names: ['play', 'pause', 'replay', 'volume', 'volumeOff', 'fullscreen', 'fullscreenExit'] },
  {
    title: 'Editor',
    names: [
      'crop', 'cropRotate', 'cropFree', 'cropSquare', 'cropWide', 'cropClassic', 'cropPortrait', 'rotate', 'flip',
      'straighten', 'adjust', 'filters', 'exposure', 'brightness', 'contrast', 'saturation', 'warmth', 'shadows',
      'vignette', 'compare', 'undo',
    ],
  },
  {
    title: 'Sistema',
    names: ['signal', 'wifi', 'batteryHigh', 'batteryMedium', 'batteryLow', 'settings', 'account', 'darkMode', 'lightMode'],
  },
];

const listed = new Set(GROUPS.flatMap((group) => group.names));
const unlisted = uglIconNames.filter((name) => !listed.has(name));
const ALL_GROUPS = unlisted.length ? [...GROUPS, { title: 'Outros', names: unlisted }] : GROUPS;

/** A exceção declarada e os três substitutos do cabeçalho do registro. */
const EXCEPTION: UglIconName = 'play';
const SUBSTITUTES: { name: UglIconName; wanted: string; why: string }[] = [
  { name: 'undo', wanted: 'undo', why: 'o quadro de ícones não publica "undo"; "replay" é a seta circular mais próxima.' },
  { name: 'flip', wanted: 'flip', why: 'o quadro não publica "flip"; "swap_horiz" comunica a troca horizontal.' },
  { name: 'screenshot', wanted: 'screenshot', why: 'o quadro não publica "screenshot"; "stay_current_portrait" é o aparelho em pé.' },
];

/** Ligaduras compartilhadas por mais de um nome do registro. */
const SHARED_LIGATURES = Object.entries(
  uglIconNames.reduce<Record<string, UglIconName[]>>((acc, name) => {
    const { ligature } = definitionOf(name);
    (acc[ligature] ??= []).push(name);
    return acc;
  }, {})
).filter(([, names]) => names.length > 1);

const LIGATURE_COUNT = new Set(uglIconNames.map((name) => definitionOf(name).ligature)).size;

/** Tons do `Icon`, com o token de cada um e a superfície em que faz sentido. */
const TONES: { tone: UglIconTone; token: string; surface: 'primary' | 'immersive' }[] = [
  { tone: 'primary', token: '--ugl-color-icon-primary', surface: 'primary' },
  { tone: 'secondary', token: '--ugl-color-icon-secondary', surface: 'primary' },
  { tone: 'accent', token: '--ugl-color-icon-accent', surface: 'primary' },
  { tone: 'danger', token: '--ugl-color-text-danger', surface: 'primary' },
  { tone: 'favorite', token: '--ugl-color-brand-favorite', surface: 'primary' },
  { tone: 'on-media', token: '--ugl-color-immersive-text', surface: 'immersive' },
  { tone: 'inherit', token: 'currentColor', surface: 'primary' },
];

const SIZE_NAMES = Object.keys(uglIconSizes) as UglIconSize[];

/**
 * Filtra os nomes pela busca: casa com o nome funcional, com a ligadura
 * Material e com o texto de uso em pt-BR, sem diferenciar maiúsculas nem
 * acentos.
 */
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const matches = (name: UglIconName, query: string) => {
  const needle = normalize(query.trim());
  if (!needle) return true;
  const definition = definitionOf(name);
  return normalize(`${name} ${definition.ligature} ${definition.usage}`).includes(needle);
};

const captionStyle: React.CSSProperties = {
  marginTop: 6,
  color: 'var(--ugl-color-text-secondary)',
  fontFamily: 'var(--ugl-font-sans)',
  fontSize: 'var(--ugl-font-caption-size)',
  lineHeight: 'var(--ugl-font-caption-line)',
  wordBreak: 'break-word',
};

/** Cartão de um glifo no catálogo. */
const GlyphCard: React.FC<{ name: UglIconName }> = ({ name }) => {
  const definition = definitionOf(name);
  return (
    <li
      data-ugl-glyph={name}
      style={{
        listStyle: 'none',
        border: `1px solid ${DOC.border}`,
        borderRadius: 12,
        overflow: 'hidden',
        background: DOC.surface,
      }}
    >
      <div
        style={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: DOC.subtle,
        }}
      >
        <Icon name={name} size="lg" />
      </div>
      <div style={{ padding: '8px 10px', fontFamily: 'var(--ugl-font-sans)' }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: DOC.text }}>{name}</div>
        <div style={{ fontSize: 11, fontFamily: MONO, color: DOC.accent, wordBreak: 'break-all' }}>
          {definition.ligature}
          {definition.filled ? ' · filled' : ''}
          {definition.flipX ? ' · flipX' : ''}
        </div>
        <div style={{ fontSize: 11, color: DOC.muted, marginTop: 4, lineHeight: 1.4 }}>{definition.usage}</div>
      </div>
    </li>
  );
};

/**
 * Catálogo de todos os glifos, agrupado, com busca por nome funcional. A busca
 * é um campo nativo (o `SearchField` da galeria é outro componente); o total
 * encontrado é anunciado em `aria-live`.
 */
const Catalog: React.FC<{ initialQuery?: string }> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const inputId = useId();
  const visibleGroups = ALL_GROUPS.map((group) => ({
    ...group,
    names: group.names.filter((name) => matches(name, query)),
  })).filter((group) => group.names.length > 0);
  const total = visibleGroups.reduce((sum, group) => sum + group.names.length, 0);

  return (
    <div data-ugl-theme="light" style={{ marginBottom: 32, fontFamily: 'var(--ugl-font-sans)' }}>
      <div role="search" style={{ marginBottom: 12 }}>
        <label htmlFor={inputId} style={{ display: 'block', fontSize: 13, fontWeight: 600, color: DOC.text, marginBottom: 6 }}>
          Buscar glifo por nome funcional
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ex.: favorite, lixeira, cortar, bateria…"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            minHeight: 'var(--ugl-touch-target)',
            padding: '0 var(--ugl-spacing-m)',
            borderRadius: 'var(--ugl-radius-m)',
            border: '1px solid var(--ugl-color-border-control)',
            background: 'var(--ugl-color-fill-field)',
            color: 'var(--ugl-color-text-primary)',
            fontFamily: 'var(--ugl-font-sans)',
            fontSize: 'var(--ugl-font-body-lg-size)',
          }}
        />
      </div>
      <p aria-live="polite" data-ugl-glyph-count="" style={{ margin: '0 0 12px 0', fontSize: 12, color: DOC.muted }}>
        {total} de {uglIconNames.length} glifos
      </p>

      {visibleGroups.map((group) => (
        <section key={group.title} aria-label={group.title} style={{ marginBottom: 20 }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: 14, color: DOC.text }}>
            {group.title} <span style={{ color: DOC.muted, fontWeight: 400 }}>· {group.names.length}</span>
          </h4>
          <ul
            style={{
              margin: 0,
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
              gap: 10,
            }}
          >
            {group.names.map((name) => (
              <GlyphCard key={name} name={name} />
            ))}
          </ul>
        </section>
      ))}

      {total === 0 && (
        <p role="status" style={{ fontSize: 13, color: DOC.muted }}>
          Nenhum glifo corresponde a “{query}”.
        </p>
      )}
    </div>
  );
};

/** Tamanhos nomeados e um numérico. */
const SizesRow: React.FC = () => (
  <UglDocStage padding={28} gap={32} align="flex-start">
    {SIZE_NAMES.map((size) => (
      <div key={size} style={{ textAlign: 'center' }}>
        <Icon name="photo" size={size} />
        <div style={captionStyle}>
          {size} · {uglIconSizes[size].value}px
          <br />
          {uglIconSizes[size].unooria}
        </div>
      </div>
    ))}
    <div style={{ textAlign: 'center' }}>
      <Icon name="photo" size={64} />
      <div style={captionStyle}>size=&#123;64&#125;</div>
    </div>
  </UglDocStage>
);

/** Os tons, cada um sobre a superfície em que é usado, em um tema. */
const TonesRow: React.FC<{ theme: UglTheme }> = ({ theme }) => (
  <UglDocStage label={THEME_LABEL[theme]} theme={theme} surface="secondary" padding={20} gap={12} align="flex-start">
    {TONES.map((item) => (
      <div key={item.tone} style={{ textAlign: 'center', width: 110 }}>
        <div
          style={{
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--ugl-radius-m)',
            border: '1px solid var(--ugl-color-border-default)',
            background:
              item.surface === 'immersive' ? 'var(--ugl-color-immersive-surface)' : 'var(--ugl-color-background-primary)',
            color: 'var(--ugl-color-text-accent)',
          }}
        >
          <Icon name="favoriteFilled" size="lg" tone={item.tone} />
        </div>
        <div style={{ ...captionStyle, color: 'var(--ugl-color-text-primary)', fontWeight: 600 }}>{item.tone}</div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: 'var(--ugl-color-text-secondary)', wordBreak: 'break-all' }}>
          {item.token}
        </div>
      </div>
    ))}
  </UglDocStage>
);

/** Preenchimento, rotação e espelhamento. */
const TransformsRow: React.FC = () => (
  <UglDocStage padding={28} gap={28} align="flex-start">
    {[
      { label: 'favorite', node: <Icon name="favorite" size="lg" /> },
      { label: 'favoriteFilled', node: <Icon name="favoriteFilled" size="lg" tone="favorite" /> },
      { label: 'favorite · filled', node: <Icon name="favorite" size="lg" filled /> },
      { label: 'libraryFilled · filled={false}', node: <Icon name="libraryFilled" size="lg" filled={false} /> },
      { label: 'chevronRight', node: <Icon name="chevronRight" size="lg" /> },
      { label: 'chevronRight · rotate 90°', node: <Icon name="chevronRight" size="lg" rotate={90} /> },
      { label: 'back · flipX', node: <Icon name="back" size="lg" flipX /> },
      { label: 'rotate · flipY', node: <Icon name="rotate" size="lg" flipY /> },
      { label: 'more · rotate 90°', node: <Icon name="more" size="lg" rotate={90} /> },
    ].map((item) => (
      <div key={item.label} style={{ textAlign: 'center', width: 120 }}>
        {item.node}
        <div style={captionStyle}>{item.label}</div>
      </div>
    ))}
  </UglDocStage>
);

/** Exceção `play_arrow` e os três substitutos. */
const SubstitutesRow: React.FC = () => (
  <UglDocStage padding={24} gap={28} align="flex-start">
    {[{ name: EXCEPTION, wanted: 'play_arrow', why: 'fora do quadro' }, ...SUBSTITUTES].map((item) => (
      <div key={item.name} style={{ textAlign: 'center', width: 150 }}>
        <Icon name={item.name} size="xl" tone="accent" />
        <div style={{ ...captionStyle, color: 'var(--ugl-color-text-primary)', fontWeight: 600 }}>{item.name}</div>
        <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ugl-color-text-secondary)' }}>
          {definitionOf(item.name).ligature}
          {item.name === EXCEPTION ? ' (exceção)' : ` no lugar de ${item.wanted}`}
        </div>
      </div>
    ))}
  </UglDocStage>
);

/** Mosaico de todos os glifos, para o alternador de temas. */
const Mosaic: React.FC = () => (
  <div
    style={{
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
      gap: 14,
    }}
  >
    {uglIconNames.map((name) => (
      <div key={name} style={{ textAlign: 'center' }}>
        <Icon name={name} size="md" />
        <div style={{ ...captionStyle, marginTop: 4 }}>{name}</div>
      </div>
    ))}
  </div>
);

/**
 * Página de documentação rica da iconografia. A documentação do `Icon` vive
 * só aqui: não há estória em Componentes.
 */
const IconesDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Fundamentos • Ícones"
      title="Ícones"
      description={`Biblioteca de ${uglIconNames.length} glifos (${LIGATURE_COUNT} ligaduras distintas) da Plataforma Unooria: Material Symbols Rounded, peso 300, sem preenchimento, a mesma do quadro de ícones 6024:2923. Nada é desenhado à mão — cada nome do registro aponta para uma ligadura da fonte, com um nome de função em inglês e o uso em pt-BR. O componente Icon é documentado só aqui.`}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UglDocGrid>
      <UglDocCard icon="🧬" title="Biblioteca da Unooria">
        O registro <code>uglIcons</code> (<code>Icon/IconGlyphs.ts</code>) escolhe o subconjunto
        que a galeria usa e dá a cada glifo um nome de função: <code>addToAlbum</code>,{' '}
        <code>deleteForever</code>, <code>livePhoto</code>.
      </UglDocCard>
      <UglDocCard icon="🔤" title="Fonte de ligadura">
        O glifo é o texto de uma ligadura: sem <code>fonts/unoogaleria.css</code> (ou o Material
        Symbols do app), aparece o nome do ícone. O <code>Icon</code> corta o excedente à caixa.
      </UglDocCard>
      <UglDocCard icon="📐" title="size é a aresta da caixa">
        16, 20, 24, 32 ou 48px nos degraus nomeados, ou um número. O eixo óptico (<code>opsz</code>)
        acompanha o tamanho, entre 20 e 48.
      </UglDocCard>
      <UglDocCard icon="♿" title="Decorativo ou com nome">
        Sem <code>title</code>, <code>aria-hidden</code>. Com <code>title</code>,{' '}
        <code>role=&quot;img&quot;</code> e <code>aria-label</code> — como a bateria do{' '}
        <code>PhoneFrame</code>.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="Icon"
      layout="Caixa quadrada · glifo de ligadura"
      specs={[
        { label: 'Nomes no registro', value: String(uglIconNames.length) },
        { label: 'Ligaduras distintas', value: String(LIGATURE_COUNT) },
        { label: 'Biblioteca', value: 'Material Symbols Rounded' },
        { label: 'Eixos', value: "FILL 0|1 · wght 300 · GRAD 0 · opsz" },
        { label: 'Quadro de origem', value: '6024:2923' },
        { label: 'Tamanhos', value: SIZE_NAMES.map((size) => uglIconSizes[size].value).join(' · ') + 'px' },
        { label: 'Tons', value: String(TONES.length) },
        { label: 'Fronteira', value: 'Server Component' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Exceção: play → play_arrow',
          detail:
            'o quadro 6024:2923 publica "pause" na categoria de áudio e vídeo, mas não o par. "play_arrow" é o mesmo glifo da mesma biblioteca-base, pelo nome da ligadura — o precedente é o AudioPlayer da Plataforma Unooria (AGENTS.md, 5.1). É a única ligadura do registro fora do quadro.',
        },
        ...SUBSTITUTES.map((item) => ({
          subject: `Substituto: ${item.name} → ${definitionOf(item.name).ligature}`,
          detail: item.why,
        })),
        {
          subject: 'Uma ligadura, vários nomes',
          detail: `${SHARED_LIGATURES.map(([ligature, names]) => `${ligature} (${names.join(', ')})`).join('; ')}. O nome registra o uso, e cada um pode divergir depois sem mudar quem chama.`,
        },
        {
          subject: 'Pares contorno e preenchido',
          detail:
            'library, albums, memories, favorite e info têm par *Filled para o estado ativo. A cor do glifo acompanha o tom; o peso do desenho é o que marca a aba ativa e o favorito.',
        },
        {
          subject: 'Glifos de sistema',
          detail:
            'signal, wifi e batteryHigh|Medium|Low existem para a barra de status do PhoneFrame, que escolhe o glifo pela carga (≥ 60%, ≥ 30%, abaixo).',
        },
        {
          subject: 'Busca sem SearchField',
          detail:
            'o catálogo usa um campo nativo com role="search": o SearchField da galeria é peça de outro componente, e o fundamento não depende dele.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do glifo" />
    <UglDocAnatomy
      zones={[
        { name: 'Caixa', role: 'Quadrada, com o excedente cortado.', token: '--ugl-icon-size-xs … xl' },
        { name: 'Ligadura', role: 'Texto do nome no Material Symbols Rounded.', token: '--ugl-icon-font-family' },
        { name: 'Eixos variáveis', role: "FILL do registro ou de filled; wght 300; GRAD 0; opsz pelo tamanho.", token: 'font-variation-settings' },
        { name: 'Tom', role: 'Cor por token semântico, ou herdada.', token: '--ugl-color-icon-* · currentColor' },
        { name: 'Transformação', role: 'rotate, flipX e flipY por transform.', token: 'transform' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Catálogo, tamanhos, tons e estados"
      description="Busque pelo nome funcional, pela ligadura ou pelo uso em pt-BR."
    />
    <Catalog />
    <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC.text }}>Tamanhos</h4>
    <SizesRow />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Tons</h4>
    <TonesRow theme="light" />
    <TonesRow theme="dark" />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Preenchido, rotação e espelhamento</h4>
    <TransformsRow />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Exceção e substitutos</h4>
    <SubstitutesRow />

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Escolher o glifo pelo nome funcional do registro, nunca pela ligadura.',
        'Usar o par *Filled (ou filled) para o estado ativo, sem mudar a cor por conta própria.',
        'Usar tone="on-media" sobre foto e sobre a superfície imersiva.',
        'Dar title ao glifo que carrega significado sozinho; num botão, o nome vai no botão (IconButton.label).',
        'Conferir o quadro 6024:2923 antes de acrescentar um nome ao registro.',
      ]}
      donts={[
        'Desenhar um SVG à mão ou trazer um glifo de outra biblioteca.',
        'Renderizar sem a fonte: aparece o nome da ligadura no lugar do glifo.',
        'Usar emoji como ícone funcional.',
        'Registrar um segundo nome para um glifo que só precisa de rotate ou flipX.',
        'Pintar o glifo com cor avulsa em vez de um tom.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" />
    <UglDocThemeSwitcher>{() => <Mosaic />}</UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UglDocPropsTable
      title="Icon"
      rows={[
        { name: 'name', type: 'UglIconName', description: 'Nome do glifo no registro uglIcons. Obrigatório.' },
        { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number", default: "'md'", description: '16, 20, 24, 32 ou 48px, ou um valor em pixels.' },
        { name: 'tone', type: TONES.map((item) => `'${item.tone}'`).join(' | '), default: "'primary'", description: 'Tom semântico da cor do glifo.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda data-ugl-theme do contêiner.' },
        { name: 'filled', type: 'boolean', description: 'Força o eixo FILL; sem valor, vale o do registro.' },
        { name: 'rotate', type: 'number', default: '0', description: 'Rotação em graus.' },
        { name: 'flipX', type: 'boolean', default: 'false', description: 'Espelha na horizontal (combina com o flipX do registro).' },
        { name: 'flipY', type: 'boolean', default: 'false', description: 'Espelha na vertical.' },
        { name: 'title', type: 'string', description: 'Rótulo acessível; sem ele, o glifo é decorativo.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        { name: '…HTMLAttributes<HTMLSpanElement>', type: 'React.HTMLAttributes<HTMLSpanElement>', description: 'Repassadas ao <span> do glifo.' },
      ]}
    />
    <UglDocPropsTable
      title="UglIconDefinition (entrada de uglIcons)"
      rows={[
        { name: 'ligature', type: 'string', description: 'Nome da ligadura no Material Symbols Rounded.' },
        { name: 'filled', type: 'boolean', description: 'Liga o eixo FILL por padrão.' },
        { name: 'flipX', type: 'boolean', description: 'Espelha por padrão.' },
        { name: 'usage', type: 'string', description: 'Uso do glifo no produto, em pt-BR.' },
      ]}
    />
    <UglDocPropsTable
      title="Exportações"
      rows={[
        { name: 'uglIcons', type: 'Record<UglIconName, UglIconDefinition>', description: 'O registro.' },
        { name: 'uglIconNames', type: 'UglIconName[]', description: 'Todos os nomes, na ordem de declaração.' },
        { name: 'UglIconSize', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", description: 'Tamanhos nomeados.' },
        { name: 'UglIconTone', type: 'union', description: 'Tons semânticos.' },
      ]}
    />
  </UnooriaDocShell>
);

type PlaygroundArgs = Omit<UglIconProps, 'size'> & { size: number };

const meta: Meta<PlaygroundArgs> = {
  title: 'Unoogaleria/Fundamentos/Ícones',
  component: Icon as unknown as React.FC<PlaygroundArgs>,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'select', options: uglIconNames, description: 'Nome do glifo no registro.' },
    size: { control: { type: 'range', min: 12, max: 96, step: 1 }, description: 'Aresta da caixa, em pixels.' },
    tone: { control: 'select', options: TONES.map((item) => item.tone), description: 'Tom semântico.' },
    theme: { control: 'inline-radio', options: ['light', 'dark'], description: 'Tema (data-ugl-theme).' },
    filled: { control: 'boolean', description: 'Força o eixo FILL.' },
    rotate: { control: { type: 'range', min: -180, max: 180, step: 1 }, description: 'Rotação em graus.' },
    flipX: { control: 'boolean', description: 'Espelha na horizontal.' },
    flipY: { control: 'boolean', description: 'Espelha na vertical.' },
    title: { control: 'text', description: 'Rótulo acessível (vazio = decorativo).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    name: 'favoriteFilled',
    size: 48,
    tone: 'favorite',
    theme: 'light',
    filled: undefined,
    rotate: 0,
    flipX: false,
    flipY: false,
    title: '',
    className: '',
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

/**
 * Documentação rica e completa da iconografia.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <IconesDocumentationPage />,
};

/**
 * Playground com todas as props do `Icon`.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Icon',
  render: ({ theme, title, className, ...args }) => (
    <UglDocStage theme={theme ?? 'light'} surface={args.tone === 'on-media' ? 'immersive' : 'primary'} padding={40}>
      <Icon {...args} theme={theme} title={title || undefined} className={className || undefined} />
    </UglDocStage>
  ),
};

/**
 * Catálogo completo com busca. O `play` busca por nome funcional, por uso em
 * pt-BR e por um termo sem resultado.
 */
export const Catalogo: Story = {
  name: '🎨 Catálogo com busca',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Catálogo de glifos" />
      <Catalog />
    </UnooriaDocShell>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole('searchbox', { name: 'Buscar glifo por nome funcional' });
    const count = () => canvasElement.querySelector('[data-ugl-glyph-count]')!.textContent;
    const shown = () =>
      Array.from(canvasElement.querySelectorAll('[data-ugl-glyph]')).map((node) => node.getAttribute('data-ugl-glyph'));

    // Sem busca: todos os glifos do registro.
    await expect(shown()).toHaveLength(uglIconNames.length);

    // Pelo nome funcional.
    const target: UglIconName = 'favoriteFilled';
    await userEvent.type(field, target);
    await expect(shown()).toEqual([target]);
    await expect(count()).toBe(`1 de ${uglIconNames.length} glifos`);

    // Pelo uso em pt-BR, sem acento: "lixeira" acha os glifos da lixeira.
    await userEvent.clear(field);
    await userEvent.type(field, 'lixeira');
    const trash = uglIconNames.filter((name) => matches(name, 'lixeira'));
    await expect(trash.length).toBeGreaterThan(0);
    await expect(shown()).toEqual(trash);

    // Sem resultado.
    await userEvent.clear(field);
    await userEvent.type(field, 'inexistente');
    await expect(shown()).toHaveLength(0);
    await expect(canvas.getByRole('status')).toHaveTextContent('Nenhum glifo');
  },
};

/**
 * Tamanhos nomeados e numérico.
 */
export const Tamanhos: Story = {
  render: () => <SizesRow />,
};

/**
 * Os sete tons, nos dois temas.
 */
export const TodasVariantes: Story = {
  name: 'Tons',
  render: () => (
    <>
      <TonesRow theme="light" />
      <TonesRow theme="dark" />
    </>
  ),
};

/**
 * Preenchimento, rotação e espelhamento, e a exceção com os substitutos.
 */
export const Estados: Story = {
  name: 'Preenchido, transformações e substitutos',
  render: () => (
    <>
      <TransformsRow />
      <SubstitutesRow />
    </>
  ),
};

/**
 * Todos os glifos nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <>
      <UglDocStage label={THEME_LABEL.light} theme="light">
        <Mosaic />
      </UglDocStage>
      <UglDocStage label={THEME_LABEL.dark} theme="dark">
        <Mosaic />
      </UglDocStage>
    </>
  ),
};
