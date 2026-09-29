import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import type { UnvDocTheme } from '../../../.storybook/components';
import { Icon, unvIcons, unvIconNames } from '../../../src/unoovista';
import type { UnvIconName, UnvIconTone } from '../../../src/unoovista';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const DOC_BORDER = '#E4E8E9';
const DOC_TEXT = '#22272A';
const DOC_MUTED = '#475157';
const DOC_LINK = '#57547D';
const DOC_SUCCESS = '#01B574';

const THEME_LABEL: Record<UnvDocTheme, string> = { light: 'Tema claro', dark: 'Tema escuro' };

/**
 * Tons semânticos do `Icon`, com o token que cada um resolve e a superfície
 * sobre a qual o tom foi pensado.
 */
const TONES: { tone: UnvIconTone; token: string; background: string; note: string }[] = [
  {
    tone: 'primary',
    token: '--unv-color-icon-primary',
    background: 'var(--unv-color-background-primary)',
    note: 'Glifos ativos das barras e das ações da publicação.',
  },
  {
    tone: 'secondary',
    token: '--unv-color-icon-secondary',
    background: 'var(--unv-color-background-primary)',
    note: 'Glifos inativos e de apoio.',
  },
  {
    tone: 'link',
    token: '--unv-color-action-primary',
    background: 'var(--unv-color-background-primary)',
    note: 'Ação, selo e item selecionado.',
  },
  {
    tone: 'like',
    token: '--unv-color-brand-like',
    background: 'var(--unv-color-background-primary)',
    note: 'Coração curtido.',
  },
  {
    tone: 'inverse',
    token: '--unv-color-text-on-media',
    background: 'var(--unv-gradient-livebadge)',
    note: 'Sempre branco, para uso sobre fotografia ou vídeo.',
  },
  {
    tone: 'inherit',
    token: 'currentColor',
    background: 'var(--unv-color-background-primary)',
    note: 'Herda a cor do elemento pai.',
  },
];

const TONE_NAMES = TONES.map((item) => item.tone);

type IconDefinition = { ligature: string; filled?: boolean; usage: string };

const LIGATURE_COUNT = new Set(unvIconNames.map((name) => (unvIcons[name] as IconDefinition).ligature))
  .size;

/**
 * Cartão de glifo do catálogo: renderiza o `Icon` real e mostra o nome, a
 * ligadura Material e o uso.
 */
const IconCard: React.FC<{
  name: UnvIconName;
  copied: boolean;
  onCopy: (name: UnvIconName) => void;
}> = ({ name, copied, onCopy }) => {
  const definition = unvIcons[name] as IconDefinition;

  return (
    <button
      type="button"
      onClick={() => onCopy(name)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        border: `1px solid ${DOC_BORDER}`,
        borderRadius: 12,
        background: '#FFFFFF',
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <div
        data-unv-theme="light"
        style={{
          background: 'var(--unv-color-background-secondary)',
          height: 78,
          flexShrink: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={name} size="lg" />
      </div>
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: DOC_TEXT }}>{name}</div>
        <div
          style={{
            fontSize: 11,
            color: DOC_LINK,
            fontFamily: MONO,
            marginTop: 2,
            wordBreak: 'break-all',
          }}
        >
          {definition.ligature}
        </div>
        {definition.filled && (
          <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 10,
                fontFamily: MONO,
                background: '#EFEEF5',
                color: '#34375C',
                borderRadius: 999,
                padding: '1px 8px',
              }}
            >
              filled
            </span>
          </div>
        )}
        <div style={{ fontSize: 11, color: DOC_MUTED, marginTop: 4, lineHeight: 1.4 }}>
          {definition.usage}
        </div>
        <div style={{ fontSize: 11, color: copied ? DOC_SUCCESS : DOC_MUTED, marginTop: 6 }}>
          {copied ? '✓ Copiado!' : 'Clique para copiar o JSX'}
        </div>
      </div>
    </button>
  );
};

/**
 * Catálogo completo de glifos, com busca e cópia do JSX.
 */
const IconCatalog: React.FC = () => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = unvIconNames.filter((name) => {
    const definition = unvIcons[name] as IconDefinition;
    const haystack = `${name} ${definition.ligature} ${definition.usage}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  const handleCopy = (name: UnvIconName) => {
    void navigator.clipboard?.writeText(`<Icon name="${name}" />`);
    setCopied(name);
    window.setTimeout(() => setCopied(null), 1400);
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filtrar por nome, ligadura Material ou uso…"
        aria-label="Filtrar glifos"
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '10px 12px',
          borderRadius: 8,
          border: `1px solid ${DOC_BORDER}`,
          fontSize: 13,
          marginBottom: 14,
        }}
      />
      <div style={{ fontSize: 12, color: DOC_MUTED, marginBottom: 12 }}>
        {filtered.length} de {unvIconNames.length} glifos
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
          gap: 12,
        }}
      >
        {filtered.map((name) => (
          <IconCard key={name} name={name} copied={copied === name} onCopy={handleCopy} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ fontSize: 13, color: DOC_MUTED }}>Nenhum glifo corresponde ao filtro.</p>
      )}
    </div>
  );
};

/**
 * Galeria compacta de todos os glifos, para ser vista em cada tema.
 */
const IconMosaic: React.FC = () => (
  <div
    style={{
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
      gap: 16,
    }}
  >
    {unvIconNames.map((name) => (
      <div key={name} style={{ textAlign: 'center' }}>
        <Icon name={name} size="lg" />
        <div
          style={{
            marginTop: 6,
            color: 'var(--unv-color-text-secondary)',
            fontFamily: 'var(--unv-font-sans)',
            fontSize: 'var(--unv-font-caption-md-size)',
            wordBreak: 'break-word',
          }}
        >
          {name}
        </div>
      </div>
    ))}
  </div>
);

/**
 * Legenda de uma amostra de glifo.
 */
const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      marginTop: 8,
      color: 'var(--unv-color-text-secondary)',
      fontFamily: 'var(--unv-font-sans)',
      fontSize: 'var(--unv-font-caption-md-size)',
      lineHeight: 'var(--unv-font-caption-md-line)',
    }}
  >
    {children}
  </div>
);

/**
 * Matriz dos tons semânticos em um tema, cada um sobre a superfície em que é usado.
 */
const ToneMatrix: React.FC<{ theme: UnvDocTheme }> = ({ theme }) => (
  <UnvDocStage
    label={THEME_LABEL[theme]}
    theme={theme}
    surface="secondary"
    padding={20}
    gap={12}
    align="flex-start"
  >
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
    {TONES.map((item) => (
      <div key={item.tone} style={{ textAlign: 'center', width: 112 }}>
        <div
          style={{
            height: 56,
            borderRadius: 'var(--unv-radius-m)',
            background: item.background,
            border: '1px solid var(--unv-color-border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--unv-color-text-secondary)',
          }}
        >
          <Icon name="heartFilled" size="lg" tone={item.tone} />
        </div>
        <div
          style={{
            marginTop: 6,
            color: 'var(--unv-color-text-primary)',
            fontFamily: 'var(--unv-font-sans)',
            fontSize: 'var(--unv-font-caption-lg-size)',
            fontWeight: 'var(--unv-font-caption-lg-weight)' as React.CSSProperties['fontWeight'],
          }}
        >
          {item.tone}
        </div>
        <div
          style={{
            color: 'var(--unv-color-text-secondary)',
            fontFamily: MONO,
            fontSize: 10,
            wordBreak: 'break-all',
          }}
        >
          {item.token}
        </div>
      </div>
    ))}
    </div>
  </UnvDocStage>
);

/**
 * Playground do componente Icon com todas as props expostas.
 */
const IconPlayground: React.FC<{
  name: UnvIconName;
  size: number;
  tone: UnvIconTone;
  theme: UnvDocTheme;
  rotate: number;
  flipX: boolean;
  flipY: boolean;
  filled?: boolean;
  title?: string;
}> = ({ title, theme, ...props }) => (
  <UnvDocStage surface="primary" theme={theme} padding={40}>
    <Icon {...props} title={title || undefined} />
  </UnvDocStage>
);

/**
 * Página de documentação rica da iconografia do Unoovista.
 */
const IconesDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Fundamentos • Ícones"
      title="Ícones"
      description={`Biblioteca de ${unvIconNames.length} glifos da Plataforma Unooria: Material Symbols Rounded, peso 300, o mesmo conjunto do quadro de ícones do design system da Unooria (6024:2923). Cada glifo é uma ligadura da fonte — nenhum caminho vetorial foi desenhado à mão ou trazido de outra biblioteca — e herda a cor do tom semântico escolhido, nos dois temas.`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Origem, fonte de ligadura e composição dos glifos."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🧬" title="Biblioteca da Unooria">
        Os ícones são os da Plataforma Unooria: Material Symbols Rounded, peso 300, grade normal,
        publicados no quadro <code>6024:2923</code> do design system da Unooria. O registro{' '}
        <code>unvIcons</code> escolhe o subconjunto que a rede social usa e dá a cada glifo um nome
        de função.
      </UnvDocCard>
      <UnvDocCard icon="🔤" title="Fonte de ligadura">
        O glifo é o <em>texto</em> de uma ligadura. Sem a fonte carregada, o nome do ícone aparece
        no lugar do desenho. Importe <code>fonts/unoovista.css</code> — ou carregue o Material
        Symbols por conta própria — antes de renderizar o módulo.
      </UnvDocCard>
      <UnvDocCard icon="📐" title="size é a aresta da caixa">
        A prop <code>size</code> define uma caixa quadrada (16, 24 ou 32px, ou qualquer valor
        numérico); o glifo Material ocupa cerca de 83% dela. O excedente é cortado, para que uma
        fonte ausente não vaze o nome do ícone.
      </UnvDocCard>
      <UnvDocCard icon="🎨" title="Tons semânticos">
        Cada <code>tone</code> resolve um token de cor do módulo (
        <code>--unv-color-icon-*</code>, <code>--unv-color-action-primary</code>,{' '}
        <code>--unv-color-brand-like</code> e afins), então o mesmo glifo muda de cor com o tema sem
        nenhuma condicional no componente.
      </UnvDocCard>
      <UnvDocCard icon="🔄" title="Rotação, espelhamento e preenchimento">
        <code>rotate</code>, <code>flipX</code> e <code>flipY</code> reaproveitam um glifo sem
        duplicá-lo. <code>filled</code> liga o eixo <code>FILL</code> da fonte: os pares
        contorno/preenchido (<code>heart</code>/<code>heartFilled</code>,{' '}
        <code>bookmark</code>/<code>bookmarkFilled</code>) marcam o estado ativo.
      </UnvDocCard>
      <UnvDocCard icon="♿" title="Decorativo ou com nome">
        Sem <code>title</code>, o glifo é decorativo (<code>aria-hidden</code>). Com{' '}
        <code>title</code>, recebe <code>role=&quot;img&quot;</code> e <code>aria-label</code>.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Registro, fonte e decisões de nomeação."
    />
    <UnvDocSpecs
      component="Icon"
      layout="Caixa quadrada · glifo de ligadura"
      specs={[
        { label: 'Glifos registrados', value: String(unvIconNames.length) },
        { label: 'Biblioteca', value: 'Material Symbols Rounded' },
        { label: 'Peso', value: '300 (GRAD 0)' },
        { label: 'Quadro de origem', value: '6024:2923' },
        { label: 'Escala de tamanhos', value: '16 · 24 · 32px' },
        { label: 'Registro', value: 'Icon/IconGlyphs.ts' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Nomes de função, não de produto',
          detail:
            'o registro descreve o que o glifo faz: longVideo (vídeos longos), qrCode (meu código), external (abre serviço externo), closeFriends (amigos próximos). Nenhum nome remete a produto de terceiros.',
        },
        {
          subject: 'Todo nome existe no quadro de ícones da Unooria',
          detail:
            `as ${LIGATURE_COUNT} ligaduras distintas usadas (por exemplo ${unvIcons.longVideo.ligature}, ${unvIcons.qrCode.ligature}, ${unvIcons.external.ligature}, ${unvIcons.tagged.ligature} e ${unvIcons.closeFriends.ligature}) estão publicadas no quadro 6024:2923. Um nome fora dele só entra com registro da decisão aqui, e a biblioteca nunca é trocada por outra.`,
        },
        {
          subject: 'Uma ligadura, vários nomes',
          detail:
            'alguns nomes repetem a ligadura para que o uso seja rastreável e possa divergir depois sem mudar chamadores: search, searchFilled e searchSmall; heart e heartFilled; bookmark e bookmarkFilled. add (add_box) e plus (add) são glifos distintos: o primeiro é a ação central de criar, o segundo é o sinal simples de novo destaque.',
        },
        {
          subject: 'Pares contorno e preenchido',
          detail:
            'heart, bookmark e search têm versão preenchida (filled) para o estado ativo. A cor não muda entre ativo e inativo; muda o peso do glifo e, na doca, o fundo da cápsula.',
        },
        {
          subject: 'Glifos de sistema no PhoneFrame',
          detail:
            'signalCellular, wifi e battery existem só para a barra de status do PhoneFrame, que é contêiner de documentação. Não fazem parte da interface de produto.',
        },
        {
          subject: 'Glifos de estado e de dica',
          detail:
            'check, info, warning e error atendem à opção votada, à faixa de dica (InlineHint) e aos campos com erro. Usam tons semânticos, e o significado nunca depende só da cor.',
        },
        {
          subject: 'Sem glifo desenhado à mão',
          detail:
            'nenhum vetor foi criado, aproximado ou copiado de outra biblioteca. O Icon é o único lugar do módulo que emite glifos.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Catálogo completo"
      description="Busque por nome, ligadura ou uso; clique para copiar o JSX."
    />
    <IconCatalog />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Tamanhos"
      description="Três tamanhos nomeados, além de qualquer valor numérico em pixels."
    />
    <UnvDocStage surface="primary" padding={28} gap={32}>
      {(['sm', 'md', 'lg'] as const).map((size, index) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Icon name="search" size={size} />
          <Caption>
            {size} · {[16, 24, 32][index]}px
          </Caption>
        </div>
      ))}
      <div style={{ textAlign: 'center' }}>
        <Icon name="search" size={48} />
        <Caption>size=&#123;48&#125;</Caption>
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Tons semânticos"
      description="Cada tom resolve um token de cor do módulo; o inverso só faz sentido sobre mídia."
    />
    <ToneMatrix theme="light" />
    <ToneMatrix theme="dark" />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Rotação, espelhamento e preenchimento"
      description="O mesmo glifo reaproveitado com as props de transformação."
    />
    <UnvDocStage surface="primary" padding={28} gap={32}>
      {[
        { label: 'back', node: <Icon name="back" size="lg" /> },
        { label: 'back · rotate 180°', node: <Icon name="back" size="lg" rotate={180} /> },
        { label: 'back · flipX', node: <Icon name="back" size="lg" flipX /> },
        { label: 'more', node: <Icon name="more" size="lg" /> },
        { label: 'more · rotate 90°', node: <Icon name="more" size="lg" rotate={90} /> },
        { label: 'chevronDown', node: <Icon name="chevronDown" size="lg" /> },
        { label: 'chevronDown · rotate 180°', node: <Icon name="chevronDown" size="lg" rotate={180} /> },
        { label: 'heart', node: <Icon name="heart" size="lg" /> },
        { label: 'heart · filled', node: <Icon name="heart" size="lg" filled tone="like" /> },
        { label: 'heartFilled · filled=false', node: <Icon name="heartFilled" size="lg" filled={false} /> },
      ].map((item) => (
        <div key={item.label} style={{ textAlign: 'center', width: 130 }}>
          {item.node}
          <Caption>{item.label}</Caption>
        </div>
      ))}
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Acessibilidade"
      description="Decorativo por padrão; com nome quando o glifo carrega significado sozinho."
    />
    <UnvDocStage surface="primary" padding={28} gap={48}>
      <div style={{ textAlign: 'center' }}>
        <Icon name="search" size="lg" />
        <Caption>sem title · aria-hidden</Caption>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="search" size="lg" title="Buscar" />
        <Caption>title=&quot;Buscar&quot; · role=&quot;img&quot;</Caption>
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="8. Suporte a temas"
      description="A galeria completa nos dois temas: os glifos herdam o tom do tema, sem alteração no registro."
    />
    <UnvDocThemeSwitcher surface="primary" padding={24}>
      {() => <IconMosaic />}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="9. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Importar o componente Icon de src/unoovista e escolher o glifo pelo nome do registro.',
        'Carregar fonts/unoovista.css (ou o Material Symbols do app) antes de renderizar o módulo.',
        'Escolher o tom semântico em vez de pintar o glifo com uma cor avulsa.',
        'Informar title quando o ícone carrega significado sozinho; omitir quando é decorativo.',
        'Acompanhar glifo de ação com rótulo acessível no botão que o contém.',
        'Reaproveitar um glifo com rotate, flipX e filled em vez de registrar um segundo nome.',
      ]}
      donts={[
        'Desenhar, aproximar ou reescrever um caminho SVG à mão.',
        'Substituir um glifo por um equivalente de outra biblioteca de ícones.',
        'Usar uma ligadura que o quadro de ícones da Unooria não publica sem registrar a decisão.',
        'Renderizar sem a fonte: o nome do ícone aparece como texto no lugar do desenho.',
        'Usar emoji como ícone funcional.',
        'Assumir que size nomeia o traço: é a aresta da caixa, e o glifo ocupa cerca de 83% dela.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="10. Referência completa de props" />
    <UnvDocPropsTable
      title="Icon"
      rows={[
        {
          name: 'name',
          type: 'UnvIconName',
          description: 'Nome do glifo no registro `unvIcons`. Obrigatório.',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg' | number",
          default: "'md'",
          description: 'Aresta da caixa: 16, 24 ou 32px nos degraus nomeados, ou um valor livre em pixels.',
        },
        {
          name: 'tone',
          type: "'primary' | 'secondary' | 'link' | 'like' | 'inverse' | 'inherit'",
          default: "'primary'",
          description: 'Tom semântico, resolvido a partir dos tokens de cor de ícone, ação e marca.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Força o tema do glifo. Quando omitido, herda o tema do contêiner por data-unv-theme.',
        },
        {
          name: 'rotate',
          type: 'number',
          default: '0',
          description: 'Rotação em graus (ex.: 90 para reticências na vertical).',
        },
        {
          name: 'flipX',
          type: 'boolean',
          default: 'false',
          description: 'Espelha o glifo no eixo horizontal.',
        },
        {
          name: 'flipY',
          type: 'boolean',
          default: 'false',
          description: 'Espelha o glifo no eixo vertical.',
        },
        {
          name: 'filled',
          type: 'boolean',
          description:
            'Força o eixo FILL da fonte. Quando omitido, vale o padrão do registro (heartFilled, bookmarkFilled, searchFilled, verified e closeFriends são preenchidos).',
        },
        {
          name: 'title',
          type: 'string',
          description:
            'Rótulo acessível. Quando informado, o glifo recebe role="img" e aria-label; quando omitido, é decorativo (aria-hidden).',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Classe CSS adicional aplicada ao elemento.',
        },
        {
          name: '…HTMLAttributes<HTMLSpanElement>',
          type: 'React.HTMLAttributes<HTMLSpanElement>',
          description: 'As demais propriedades são repassadas ao <span> do glifo.',
        },
      ]}
    />
    <UnvDocPropsTable
      title="Estrutura de UnvIconDefinition"
      rows={[
        {
          name: 'ligature',
          type: 'string',
          description: 'Nome da ligadura no Material Symbols Rounded.',
        },
        {
          name: 'filled',
          type: 'boolean',
          description: 'Liga o eixo FILL por padrão.',
        },
        { name: 'usage', type: 'string', description: 'Contexto de uso do glifo no produto.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Icon> = {
  title: 'Unoovista/Fundamentos/Ícones',
  component: Icon,
  parameters: { layout: 'padded' },
  argTypes: {
    name: {
      control: 'select',
      options: unvIconNames,
      description: 'Nome do glifo no registro `unvIcons`.',
    },
    size: {
      control: { type: 'range', min: 12, max: 96, step: 1 },
      description: 'Aresta da caixa do glifo, em pixels.',
    },
    tone: {
      control: 'select',
      options: TONE_NAMES,
      description: 'Tom semântico aplicado à cor do glifo.',
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Tema do glifo (data-unv-theme).',
    },
    rotate: {
      control: { type: 'range', min: -180, max: 180, step: 1 },
      description: 'Rotação em graus.',
    },
    flipX: { control: 'boolean', description: 'Espelha o glifo no eixo horizontal.' },
    flipY: { control: 'boolean', description: 'Espelha o glifo no eixo vertical.' },
    filled: {
      control: 'boolean',
      description: 'Força o eixo FILL; sem valor, vale o padrão do registro.',
    },
    title: { control: 'text', description: 'Rótulo acessível (vazio = decorativo).' },
  },
  args: {
    name: 'search',
    size: 48,
    tone: 'primary',
    theme: 'light',
    rotate: 0,
    flipX: false,
    flipY: false,
    title: '',
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

/**
 * Documentação rica e completa da iconografia do Unoovista.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <IconesDocumentationPage />,
};

/**
 * Playground com 100% das props do componente Icon expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Icon',
  render: (args) => (
    <IconPlayground
      name={args.name}
      size={args.size as number}
      tone={args.tone as UnvIconTone}
      theme={args.theme as UnvDocTheme}
      rotate={args.rotate as number}
      flipX={args.flipX as boolean}
      flipY={args.flipY as boolean}
      filled={args.filled}
      title={args.title as string}
    />
  ),
};

/**
 * Catálogo completo dos glifos do registro.
 */
export const Catalogo: Story = {
  name: '🎨 Catálogo completo',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Catálogo de glifos" />
      <IconCatalog />
    </UnooriaDocShell>
  ),
};

/**
 * Matriz de tamanhos nomeados.
 */
export const Tamanhos: Story = {
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Tamanhos" />
      <UnvDocStage surface="primary" padding={28}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <Icon name="search" size={size} />
            <Caption>{size}</Caption>
          </div>
        ))}
      </UnvDocStage>
    </UnooriaDocShell>
  ),
};

/**
 * Matriz completa de tons semânticos, nos dois temas.
 */
export const Tons: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Tons semânticos" />
      <ToneMatrix theme="light" />
      <ToneMatrix theme="dark" />
    </UnooriaDocShell>
  ),
};
