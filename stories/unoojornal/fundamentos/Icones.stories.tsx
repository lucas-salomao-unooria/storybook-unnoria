import React, { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Icon, ujnIcons, ujnIconNames } from '../../../src/unoojornal/components/Icon';
import type {
  UjnIconDefinition,
  UjnIconName,
  UjnIconProps,
  UjnIconSize,
  UjnIconTone,
} from '../../../src/unoojornal/components/Icon';
import { ujnIconSizes, type UjnTheme } from '../../../src/unoojornal/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocAnatomy,
  UjnDocCard,
  UjnDocDecisions,
  UjnDocGrid,
  UjnDocPractices,
  UjnDocPropsTable,
  UjnDocSpecs,
  UjnDocStage,
  UjnDocThemeSwitcher,
} from '../../../.storybook/components';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const PHOTO = '/unoojornal/foto-01.svg';

const DOC = {
  text: 'var(--ujn-color-text-primary)',
  muted: 'var(--ujn-color-text-secondary)',
  accent: 'var(--ujn-color-text-accent)',
  border: 'var(--ujn-color-border-subtle)',
  surface: 'var(--ujn-color-background-card)',
  subtle: 'var(--ujn-color-background-subtle)',
} as const;

const THEME_LABEL: Record<UjnTheme, string> = { light: 'Tema claro', dark: 'Tema escuro' };

const definitionOf = (name: UjnIconName) => ujnIcons[name] as UjnIconDefinition;

/**
 * Grupos do registro, na ordem dos blocos de `IconGlyphs.ts`. A tipagem garante
 * que todo nome existe; `Outros` recolhe o que for acrescentado ao registro sem
 * entrar aqui, para que o catálogo mostre sempre TODOS os glifos.
 */
const GROUPS: { title: string; names: UjnIconName[] }[] = [
  {
    title: 'Navegação',
    names: [
      'home', 'homeFilled', 'latest', 'latestFilled', 'opinion', 'opinionFilled', 'agenda', 'agendaFilled',
      'gallery', 'galleryFilled', 'menu', 'search', 'close', 'arrowBack', 'arrowForward', 'chevronLeft',
      'chevronRight', 'chevronDown', 'chevronUp',
    ],
  },
  {
    title: 'Ações',
    names: [
      'bookmark', 'bookmarkFilled', 'share', 'link', 'copy', 'print', 'openInNew', 'send', 'undo', 'add',
      'remove', 'edit', 'delete', 'check', 'filter', 'sort', 'moreHorizontal',
    ],
  },
  {
    title: 'Conteúdo',
    names: [
      'schedule', 'calendar', 'history', 'person', 'group', 'mail', 'letters', 'quote', 'textSize', 'edition',
      'info', 'warning', 'error', 'checkCircle', 'lock',
    ],
  },
  { title: 'Tema', names: ['darkMode', 'lightMode'] },
  { title: 'Barra de status', names: ['signal', 'wifi', 'batteryHigh', 'batteryMedium', 'batteryLow'] },
];

const listed = new Set(GROUPS.flatMap((group) => group.names));
const unlisted = ujnIconNames.filter((name) => !listed.has(name));
const ALL_GROUPS = unlisted.length ? [...GROUPS, { title: 'Outros', names: unlisted }] : GROUPS;

/**
 * Substitutos, porque o quadro `6024:2923` da Plataforma Unooria não publica o
 * glifo desejado. O nome desejado é o da ligadura que seria a escolha natural.
 */
const SUBSTITUTES: { name: UjnIconName; wanted: string; why: string }[] = [
  { name: 'lightMode', wanted: 'light_mode', why: 'o quadro não publica "light_mode"; "wb_sunny" é o sol, o par natural de "dark_mode".' },
  { name: 'chevronDown', wanted: 'expand_more', why: 'o quadro não publica "expand_more"; "keyboard_arrow_down" é a mesma seta para baixo e serve à alça da folha e ao recolher/expandir.' },
  { name: 'undo', wanted: 'undo', why: 'o quadro não publica "undo"; "replay" é a seta circular mais próxima e é o mesmo substituto das demais marcas da plataforma.' },
  { name: 'bookmark', wanted: 'bookmark_border', why: 'o quadro não publica "bookmark_border"; a matéria não salva é "bookmark" em contorno (FILL 0) e a salva é o mesmo glifo com FILL 1.' },
  { name: 'textSize', wanted: 'text_increase', why: 'o quadro não publica "text_increase"; "format_size" (a letra com tamanhos) é o glifo do tamanho do texto.' },
];

/** Ligaduras compartilhadas por mais de um nome do registro. */
const SHARED_LIGATURES = Object.entries(
  ujnIconNames.reduce<Record<string, UjnIconName[]>>((acc, name) => {
    const { ligature } = definitionOf(name);
    (acc[ligature] ??= []).push(name);
    return acc;
  }, {})
).filter(([, names]) => names.length > 1);

const LIGATURE_COUNT = new Set(ujnIconNames.map((name) => definitionOf(name).ligature)).size;

/** Tons do `Icon`, com o token de cada um e onde faz sentido. */
const TONES: { tone: UjnIconTone; token: string; onMedia: boolean }[] = [
  { tone: 'primary', token: '--ujn-color-icon-primary', onMedia: false },
  { tone: 'secondary', token: '--ujn-color-icon-secondary', onMedia: false },
  { tone: 'accent', token: '--ujn-color-icon-accent', onMedia: false },
  { tone: 'danger', token: '--ujn-color-text-danger', onMedia: false },
  { tone: 'on-media', token: '--ujn-color-media-text', onMedia: true },
  { tone: 'inherit', token: 'currentColor', onMedia: false },
];

const SIZE_NAMES = Object.keys(ujnIconSizes) as UjnIconSize[];

/**
 * Filtra os nomes pela busca: casa com o nome funcional, com a ligadura
 * Material e com o texto de uso em pt-BR, sem diferenciar maiúsculas nem
 * acentos.
 */
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const matches = (name: UjnIconName, query: string) => {
  const needle = normalize(query.trim());
  if (!needle) return true;
  const definition = definitionOf(name);
  return normalize(`${name} ${definition.ligature} ${definition.usage}`).includes(needle);
};

const captionStyle: React.CSSProperties = {
  marginTop: 6,
  color: 'var(--ujn-color-text-secondary)',
  fontFamily: 'var(--ujn-font-sans)',
  fontSize: 'var(--ujn-font-caption-size)',
  lineHeight: 'var(--ujn-font-caption-line)',
  wordBreak: 'break-word',
};

/** Cartão de um glifo no catálogo. */
const GlyphCard: React.FC<{ name: UjnIconName }> = ({ name }) => {
  const definition = definitionOf(name);
  return (
    <li
      data-ujn-glyph={name}
      style={{
        listStyle: 'none',
        border: `1px solid ${DOC.border}`,
        borderRadius: 'var(--ujn-radius-m)',
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
      <div style={{ padding: '8px 10px', fontFamily: 'var(--ujn-font-sans)' }}>
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
 * é um campo nativo, para o fundamento não depender de nenhum componente de
 * formulário; o total encontrado é anunciado em `aria-live`.
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
    <div data-ujn-theme="light" style={{ marginBottom: 32, fontFamily: 'var(--ujn-font-sans)' }}>
      <div role="search" style={{ marginBottom: 12 }}>
        <label htmlFor={inputId} style={{ display: 'block', fontSize: 13, fontWeight: 600, color: DOC.text, marginBottom: 6 }}>
          Buscar glifo por nome funcional
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ex.: bookmark, imprimir, agenda, bateria…"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            minHeight: 'var(--ujn-touch-target)',
            padding: '0 var(--ujn-spacing-m)',
            borderRadius: 'var(--ujn-radius-s)',
            border: '1px solid var(--ujn-color-border-control)',
            background: 'var(--ujn-color-fill-field)',
            color: 'var(--ujn-color-text-primary)',
            fontFamily: 'var(--ujn-font-sans)',
            fontSize: 'var(--ujn-font-body-lg-size)',
          }}
        />
      </div>
      <p aria-live="polite" data-ujn-glyph-count="" style={{ margin: '0 0 12px 0', fontSize: 12, color: DOC.muted }}>
        {total} de {ujnIconNames.length} glifos
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
  <UjnDocStage padding={28} gap={32} align="flex-start">
    {SIZE_NAMES.map((size) => (
      <div key={size} style={{ textAlign: 'center' }}>
        <Icon name="edition" size={size} />
        <div style={captionStyle}>
          {size} · {ujnIconSizes[size].px}px
          <br />
          {ujnIconSizes[size].unooria}
        </div>
      </div>
    ))}
    <div style={{ textAlign: 'center' }}>
      <Icon name="edition" size={64} />
      <div style={captionStyle}>size=&#123;64&#125;</div>
    </div>
  </UjnDocStage>
);

/** Os tons, cada um sobre a superfície em que é usado, em um tema. */
const TonesRow: React.FC<{ theme: UjnTheme }> = ({ theme }) => (
  <UjnDocStage label={THEME_LABEL[theme]} theme={theme} surface="page" padding={20} gap={12} align="flex-start">
    {TONES.map((item) => (
      <div key={item.tone} style={{ textAlign: 'center', width: 110 }}>
        <div
          style={{
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--ujn-radius-s)',
            border: '1px solid var(--ujn-color-border-default)',
            background: item.onMedia
              ? `var(--ujn-gradient-media-bottom), url(${PHOTO}) center / cover`
              : 'var(--ujn-color-background-card)',
            color: 'var(--ujn-color-text-accent)',
          }}
        >
          <Icon name="bookmarkFilled" size="lg" tone={item.tone} />
        </div>
        <div style={{ ...captionStyle, color: 'var(--ujn-color-text-primary)', fontWeight: 600 }}>{item.tone}</div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: 'var(--ujn-color-text-secondary)', wordBreak: 'break-all' }}>
          {item.token}
        </div>
      </div>
    ))}
  </UjnDocStage>
);

/** Preenchimento, rotação e espelhamento. */
const TransformsRow: React.FC = () => (
  <UjnDocStage padding={28} gap={28} align="flex-start">
    {[
      { label: 'bookmark', node: <Icon name="bookmark" size="lg" /> },
      { label: 'bookmarkFilled', node: <Icon name="bookmarkFilled" size="lg" tone="accent" /> },
      { label: 'bookmark · filled', node: <Icon name="bookmark" size="lg" filled /> },
      { label: 'homeFilled · filled={false}', node: <Icon name="homeFilled" size="lg" filled={false} /> },
      { label: 'chevronRight', node: <Icon name="chevronRight" size="lg" /> },
      { label: 'chevronRight · rotate 90°', node: <Icon name="chevronRight" size="lg" rotate={90} /> },
      { label: 'chevronDown · rotate 180°', node: <Icon name="chevronDown" size="lg" rotate={180} /> },
      { label: 'arrowBack · flipX', node: <Icon name="arrowBack" size="lg" flipX /> },
      { label: 'moreHorizontal · rotate 90°', node: <Icon name="moreHorizontal" size="lg" rotate={90} /> },
    ].map((item) => (
      <div key={item.label} style={{ textAlign: 'center', width: 120 }}>
        {item.node}
        <div style={captionStyle}>{item.label}</div>
      </div>
    ))}
  </UjnDocStage>
);

/** Os substitutos, ao lado da ligadura que o quadro oferece. */
const SubstitutesRow: React.FC = () => (
  <UjnDocStage padding={24} gap={28} align="flex-start">
    {SUBSTITUTES.map((item) => (
      <div key={item.name} style={{ textAlign: 'center', width: 170 }}>
        <Icon name={item.name} size="lg" tone="accent" />
        <div style={{ ...captionStyle, color: 'var(--ujn-color-text-primary)', fontWeight: 600 }}>{item.name}</div>
        <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ujn-color-text-secondary)' }}>
          {definitionOf(item.name).ligature}
          <br />
          no lugar de {item.wanted}
        </div>
      </div>
    ))}
  </UjnDocStage>
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
    {ujnIconNames.map((name) => (
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
      badgeBrand="Unoojornal"
      category="Fundamentos • Ícones"
      title="Ícones"
      description={`Biblioteca de ${ujnIconNames.length} glifos (${LIGATURE_COUNT} ligaduras distintas) da Plataforma Unooria: Material Symbols Rounded, peso 300, sem preenchimento, a mesma do quadro de ícones 6024:2923. Nada é desenhado à mão — cada nome do registro aponta para uma ligadura da fonte, com um nome de função em inglês e o uso em pt-BR. O componente Icon é documentado só aqui.`}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UjnDocGrid>
      <UjnDocCard icon="🧬" title="Biblioteca da Unooria">
        O registro <code>ujnIcons</code> (<code>Icon/IconGlyphs.ts</code>) escolhe o subconjunto que o
        jornal usa e dá a cada glifo um nome de função: <code>latest</code>, <code>opinion</code>,{' '}
        <code>letters</code>, <code>textSize</code>.
      </UjnDocCard>
      <UjnDocCard icon="🔤" title="Fonte de ligadura">
        O glifo é o texto de uma ligadura: sem <code>fonts/unoojornal.css</code> (ou o Material
        Symbols do app), aparece o nome do ícone. O <code>Icon</code> corta o excedente à caixa.
      </UjnDocCard>
      <UjnDocCard icon="📐" title="size é a aresta da caixa">
        16, 20, 24 ou 32px nos degraus nomeados, ou um número. O eixo óptico (<code>opsz</code>)
        acompanha o tamanho, entre 20 e 48.
      </UjnDocCard>
      <UjnDocCard icon="🔁" title="Par contorno e preenchido">
        Cinco destinos de navegação (início, últimas, opinião, agenda e galeria) e a matéria salva
        têm par <code>*Filled</code> para o estado ativo.
      </UjnDocCard>
      <UjnDocCard icon="♿" title="Decorativo ou com nome">
        Sem <code>title</code>, <code>aria-hidden</code>. Com <code>title</code>,{' '}
        <code>role=&quot;img&quot;</code> e <code>aria-label</code> — como a bateria do{' '}
        <code>PhoneFrame</code>.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="Icon"
      layout="Caixa quadrada · glifo de ligadura"
      specs={[
        { label: 'Nomes no registro', value: String(ujnIconNames.length) },
        { label: 'Ligaduras distintas', value: String(LIGATURE_COUNT) },
        { label: 'Biblioteca', value: 'Material Symbols Rounded' },
        { label: 'Eixos', value: 'FILL 0|1 · wght 300 · GRAD 0 · opsz' },
        { label: 'Quadro de origem', value: '6024:2923' },
        { label: 'Tamanhos', value: SIZE_NAMES.map((size) => ujnIconSizes[size].px).join(' · ') + 'px' },
        { label: 'Tons', value: String(TONES.length) },
        { label: 'Fronteira', value: 'Server Component' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'O quadro 6024:2923 da Unooria é a fonte',
          detail:
            'todo nome do registro aponta para uma ligadura que existe no quadro de ícones da Plataforma Unooria (src/unooria/tokens/figma_icons_node_6024_2923.json); nenhuma ligadura fica fora dele. Ao acrescentar um glifo, confira-o no quadro antes.',
        },
        ...SUBSTITUTES.map((item) => ({
          subject: `Substituto: ${item.name} → ${definitionOf(item.name).ligature} (no lugar de ${item.wanted})`,
          detail: item.why,
        })),
        {
          subject: 'Uma ligadura, vários nomes',
          detail: `${SHARED_LIGATURES.map(([ligature, names]) => `${ligature} (${names.join(', ')})`).join('; ')}. O nome registra o uso, e cada um pode divergir depois sem mudar quem chama.`,
        },
        {
          subject: 'Pares contorno e preenchido',
          detail:
            'home, latest, opinion, agenda e gallery têm par *Filled para o destino ativo da navegação; bookmark e bookmarkFilled marcam a matéria salva. A cor do glifo acompanha o tom; o peso do desenho é o que marca o estado.',
        },
        {
          subject: 'Glifos de sistema',
          detail:
            'signal, wifi e batteryHigh|Medium|Low existem para a barra de status do PhoneFrame, que escolhe o glifo pela carga (≥ 60%, ≥ 30%, abaixo).',
        },
        {
          subject: 'Tema por dois nomes',
          detail:
            'darkMode (lua) e lightMode (sol) são nomes distintos do registro; quando o glifo vai dentro de um botão, o nome acessível vai no botão (IconButton.label), não no ícone.',
        },
        {
          subject: 'Busca sem componente de formulário',
          detail:
            'o catálogo usa um campo nativo com role="search": o fundamento não depende de nenhum componente do módulo além do Icon.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do glifo" />
    <UjnDocAnatomy
      zones={[
        { name: 'Caixa', role: 'Quadrada, com o excedente cortado.', token: '--ujn-icon-size-xs … lg' },
        { name: 'Ligadura', role: 'Texto do nome no Material Symbols Rounded.', token: '--ujn-icon-font-family' },
        { name: 'Eixos variáveis', role: 'FILL do registro ou de filled; wght 300; GRAD 0; opsz pelo tamanho.', token: 'font-variation-settings' },
        { name: 'Tom', role: 'Cor por token semântico, ou herdada.', token: '--ujn-color-icon-* · currentColor' },
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
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Substitutos</h4>
    <SubstitutesRow />

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Escolher o glifo pelo nome funcional do registro, nunca pela ligadura.',
        'Usar o par *Filled (ou filled) para o estado ativo, sem mudar a cor por conta própria.',
        'Usar tone="on-media" sobre fotografia, junto com o véu --ujn-gradient-media-bottom.',
        'Dar title ao glifo que carrega significado sozinho; num botão, o nome vai no botão (IconButton.label).',
        'Conferir o quadro 6024:2923 antes de acrescentar um nome ao registro.',
      ]}
      donts={[
        'Desenhar um SVG à mão ou trazer um glifo de outra biblioteca.',
        'Renderizar sem a fonte: aparece o nome da ligadura no lugar do glifo.',
        'Usar emoji como ícone funcional.',
        'Registrar um segundo nome para um glifo que só precisa de rotate ou flipX.',
        'Pintar o glifo com cor avulsa em vez de um tom.',
        'Comunicar estado só pelo glifo ou pela cor: acompanhe de rótulo.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" />
    <UjnDocThemeSwitcher surface="card">{() => <Mosaic />}</UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UjnDocPropsTable
      title="Icon"
      rows={[
        { name: 'name', type: 'UjnIconName', description: 'Nome do glifo no registro ujnIcons. Obrigatório.' },
        { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | number", default: "'md'", description: '16, 20, 24 ou 32px, ou um valor em pixels.' },
        { name: 'tone', type: TONES.map((item) => `'${item.tone}'`).join(' | '), default: "'primary'", description: 'Tom semântico da cor do glifo.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda data-ujn-theme do contêiner.' },
        { name: 'filled', type: 'boolean', description: 'Força o eixo FILL; sem valor, vale o do registro.' },
        { name: 'rotate', type: 'number', default: '0', description: 'Rotação em graus.' },
        { name: 'flipX', type: 'boolean', default: 'false', description: 'Espelha na horizontal (combina com o flipX do registro).' },
        { name: 'flipY', type: 'boolean', default: 'false', description: 'Espelha na vertical.' },
        { name: 'title', type: 'string', description: 'Rótulo acessível; sem ele, o glifo é decorativo.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        { name: '…HTMLAttributes<HTMLSpanElement>', type: 'React.HTMLAttributes<HTMLSpanElement>', description: 'Repassadas ao <span> do glifo.' },
      ]}
    />
    <UjnDocPropsTable
      title="UjnIconDefinition (entrada de ujnIcons)"
      rows={[
        { name: 'ligature', type: 'string', description: 'Nome da ligadura no Material Symbols Rounded.' },
        { name: 'filled', type: 'boolean', description: 'Liga o eixo FILL por padrão.' },
        { name: 'flipX', type: 'boolean', description: 'Espelha por padrão.' },
        { name: 'usage', type: 'string', description: 'Uso do glifo no produto, em pt-BR.' },
      ]}
    />
    <UjnDocPropsTable
      title="Exportações"
      rows={[
        { name: 'ujnIcons', type: 'Record<UjnIconName, UjnIconDefinition>', description: 'O registro.' },
        { name: 'ujnIconNames', type: 'UjnIconName[]', description: 'Todos os nomes, na ordem de declaração.' },
        { name: 'UjnIconSize', type: "'xs' | 'sm' | 'md' | 'lg'", description: 'Tamanhos nomeados.' },
        { name: 'UjnIconTone', type: 'union', description: 'Tons semânticos.' },
      ]}
    />
  </UnooriaDocShell>
);

type PlaygroundArgs = Omit<UjnIconProps, 'size'> & { size: number };

const meta: Meta<PlaygroundArgs> = {
  title: 'Unoojornal/Fundamentos/Ícones',
  component: Icon as unknown as React.FC<PlaygroundArgs>,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'select', options: ujnIconNames, description: 'Nome do glifo no registro.' },
    size: { control: { type: 'range', min: 12, max: 96, step: 1 }, description: 'Aresta da caixa, em pixels.' },
    tone: { control: 'select', options: TONES.map((item) => item.tone), description: 'Tom semântico.' },
    theme: { control: 'inline-radio', options: ['light', 'dark'], description: 'Tema (data-ujn-theme).' },
    filled: { control: 'boolean', description: 'Força o eixo FILL.' },
    rotate: { control: { type: 'range', min: -180, max: 180, step: 1 }, description: 'Rotação em graus.' },
    flipX: { control: 'boolean', description: 'Espelha na horizontal.' },
    flipY: { control: 'boolean', description: 'Espelha na vertical.' },
    title: { control: 'text', description: 'Rótulo acessível (vazio = decorativo).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    name: 'bookmarkFilled',
    size: 48,
    tone: 'accent',
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
    <UjnDocStage theme={theme ?? 'light'} surface={args.tone === 'on-media' ? 'footer' : 'card'} padding={40}>
      <Icon {...args} theme={theme} title={title || undefined} className={className || undefined} />
    </UjnDocStage>
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
    const count = () => canvasElement.querySelector('[data-ujn-glyph-count]')!.textContent;
    const shown = () =>
      Array.from(canvasElement.querySelectorAll('[data-ujn-glyph]')).map((node) => node.getAttribute('data-ujn-glyph'));

    // Sem busca: todos os glifos do registro.
    await expect(shown()).toHaveLength(ujnIconNames.length);

    // Pelo nome funcional.
    const target: UjnIconName = 'bookmarkFilled';
    await userEvent.type(field, target);
    await expect(shown()).toEqual([target]);
    await expect(count()).toBe(`1 de ${ujnIconNames.length} glifos`);

    // Pelo uso em pt-BR, sem acento: "imprimir" acha o glifo de impressão.
    await userEvent.clear(field);
    await userEvent.type(field, 'imprimir');
    const printing = ujnIconNames.filter((name) => matches(name, 'imprimir'));
    await expect(printing.length).toBeGreaterThan(0);
    await expect(shown()).toEqual(printing);

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
 * Os seis tons, nos dois temas.
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
 * Preenchimento, rotação e espelhamento, e os substitutos do quadro.
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
      <UjnDocStage label={THEME_LABEL.light} theme="light" surface="card">
        <Mosaic />
      </UjnDocStage>
      <UjnDocStage label={THEME_LABEL.dark} theme="dark" surface="card">
        <Mosaic />
      </UjnDocStage>
    </>
  ),
};
