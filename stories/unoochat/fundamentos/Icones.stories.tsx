import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocPractices,
  UncDocPropsTable,
  UncDocStage,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import type { UncDocTheme } from '../../../.storybook/components';
import { Icon, uncIcons, uncIconNames } from '../../../src/unoochat';
import type { UncIconName, UncIconTone } from '../../../src/unoochat';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/**
 * Tons semânticos do `Icon`, com o token que cada um resolve e a superfície
 * sobre a qual o tom foi pensado.
 */
const TONES: {
  tone: UncIconTone;
  token: string;
  surface: 'canvas' | 'accent' | 'call';
}[] = [
  { tone: 'appbar', token: '--unc-color-icon-appbar', surface: 'canvas' },
  { tone: 'settingsQr', token: '--unc-color-icon-appbar', surface: 'canvas' },
  { tone: 'forward', token: '--unc-color-icon-appbar', surface: 'canvas' },
  { tone: 'camera', token: '--unc-color-icon-muted', surface: 'canvas' },
  { tone: 'back', token: '--unc-color-icon-muted', surface: 'canvas' },
  { tone: 'composerEmoji', token: '--unc-color-icon-muted', surface: 'canvas' },
  { tone: 'composerAttach', token: '--unc-color-icon-muted', surface: 'canvas' },
  { tone: 'composerCamera', token: '--unc-color-icon-muted', surface: 'canvas' },
  { tone: 'settings', token: '--unc-color-icon-muted', surface: 'canvas' },
  { tone: 'settingsHelp', token: '--unc-color-icon-muted', surface: 'canvas' },
  { tone: 'pin', token: '--unc-color-icon-muted', surface: 'canvas' },
  { tone: 'onAccent', token: '--unc-color-icon-on-accent', surface: 'accent' },
  { tone: 'accent', token: '--unc-color-accent', surface: 'canvas' },
  { tone: 'tick', token: '--unc-color-icon-tick', surface: 'canvas' },
  { tone: 'star', token: '--unc-color-icon-star', surface: 'canvas' },
  { tone: 'callIcon', token: '--unc-color-call-icon', surface: 'call' },
  { tone: 'callIconMuted', token: '--unc-color-call-icon-muted', surface: 'call' },
  { tone: 'callOut', token: '--unc-color-accent-call-out', surface: 'canvas' },
  { tone: 'callIn', token: '--unc-color-danger-call-in', surface: 'canvas' },
  { tone: 'statusBar', token: '--unc-color-statusbar-fg', surface: 'canvas' },
  { tone: 'notice', token: '--unc-color-text-notice', surface: 'canvas' },
  { tone: 'ring', token: '--unc-color-border-status-ring', surface: 'canvas' },
  { tone: 'inherit', token: 'currentColor', surface: 'canvas' },
];

const TONE_NAMES = TONES.map((item) => item.tone);

const TONE_SURFACE_VAR: Record<'canvas' | 'accent' | 'call', string> = {
  canvas: 'var(--unc-color-surface-canvas)',
  accent: 'var(--unc-color-accent)',
  call: 'var(--unc-color-call-surface)',
};

/**
 * Cartão de glifo do catálogo: renderiza o `Icon` real e mostra o nome, a
 * ligadura Material e o uso.
 */
const IconCard: React.FC<{
  name: UncIconName;
  copied: boolean;
  onCopy: (name: UncIconName) => void;
}> = ({ name, copied, onCopy }) => {
  const definition = uncIcons[name] as {
    ligature: string;
    filled?: boolean;
    flipX?: boolean;
    usage: string;
  };

  return (
    <button
      type="button"
      onClick={() => onCopy(name)}
      style={{
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        background: '#FFFFFF',
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <div
        data-unc-theme="light"
        style={{
          background: 'var(--unc-color-surface-canvas)',
          height: 78,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={name} size="xl" tone="appbar" />
      </div>
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#22272A' }}>{name}</div>
        <div
          style={{
            fontSize: 11,
            color: '#57547D',
            fontFamily: MONO,
            marginTop: 2,
            wordBreak: 'break-all',
          }}
        >
          {definition.ligature}
        </div>
        {(definition.filled || definition.flipX) && (
          <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
            {definition.filled && (
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
            )}
            {definition.flipX && (
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
                flipX
              </span>
            )}
          </div>
        )}
        <div style={{ fontSize: 11, color: '#475157', marginTop: 4, lineHeight: 1.4 }}>
          {definition.usage}
        </div>
        <div style={{ fontSize: 11, color: copied ? '#01B574' : '#475157', marginTop: 6 }}>
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

  const filtered = uncIconNames.filter((name) => {
    const definition = uncIcons[name];
    const haystack = `${name} ${definition.ligature} ${definition.usage}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  const handleCopy = (name: UncIconName) => {
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
          border: '1px solid #E4E8E9',
          fontSize: 13,
          marginBottom: 14,
        }}
      />

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
        <p style={{ fontSize: 13, color: '#475157' }}>Nenhum glifo corresponde ao filtro.</p>
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
    {uncIconNames.map((name) => (
      <div key={name} style={{ textAlign: 'center' }}>
        <Icon name={name} size="xl" tone="appbar" />
        <div
          style={{
            marginTop: 6,
            color: 'var(--unc-color-text-secondary)',
            fontFamily: 'var(--unc-font-sans)',
            fontSize: 10.5,
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
 * Matriz dos tons semânticos em um tema, cada um sobre a superfície em que é usado.
 */
const ToneMatrix: React.FC<{ theme: UncDocTheme }> = ({ theme }) => (
  <UncDocStage
    label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
    theme={theme}
    surface="canvas"
    padding={20}
    gap={12}
    align="flex-start"
  >
    {TONES.map((item) => (
      <div key={item.tone} style={{ textAlign: 'center', width: 104 }}>
        <div
          style={{
            height: 48,
            borderRadius: 'var(--unc-radius-xl)',
            background: TONE_SURFACE_VAR[item.surface],
            border: '1px solid var(--unc-color-border-divider)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="phoneFilled" size="lg" tone={item.tone} />
        </div>
        <div
          style={{
            marginTop: 6,
            color: 'var(--unc-color-text-primary)',
            fontFamily: 'var(--unc-font-sans)',
            fontSize: 11,
            fontWeight: 600,
            wordBreak: 'break-word',
          }}
        >
          {item.tone}
        </div>
        <div
          style={{
            color: 'var(--unc-color-text-secondary)',
            fontFamily: MONO,
            fontSize: 9.5,
            wordBreak: 'break-all',
          }}
        >
          {item.token}
        </div>
      </div>
    ))}
  </UncDocStage>
);

/**
 * Legenda de uma amostra de glifo.
 */
const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      marginTop: 8,
      color: 'var(--unc-color-text-secondary)',
      fontFamily: 'var(--unc-font-sans)',
      fontSize: 11,
    }}
  >
    {children}
  </div>
);

/**
 * Playground do componente Icon com todas as props expostas.
 */
const IconPlayground: React.FC<{
  name: UncIconName;
  size: number;
  tone: UncIconTone;
  rotate: number;
  flipX: boolean;
  flipY: boolean;
  filled?: boolean;
  title?: string;
}> = ({ title, ...props }) => (
  <UncDocStage surface="canvas" padding={40}>
    <Icon {...props} title={title || undefined} />
  </UncDocStage>
);

/**
 * Página de documentação rica da iconografia do Unoochat.
 */
const IconesDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Fundamentos • Ícones"
      title="Ícones"
      description={`Biblioteca de ${uncIconNames.length} glifos da Plataforma Unooria: Material Symbols Rounded, peso 300, o mesmo conjunto do quadro de ícones do design system da Unooria (6024:2923). Cada glifo é uma ligadura da fonte — nenhum caminho vetorial foi desenhado à mão ou trazido de outra biblioteca — e herda a cor do tom semântico escolhido, nos dois temas.`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Origem, fonte de ligadura e composição dos glifos."
    />
    <UncDocGrid>
      <UncDocCard icon="🧬" title="Biblioteca da Unooria">
        Os ícones são os da Plataforma Unooria: Material Symbols Rounded, peso 300, grade normal,
        publicados no quadro <code>6024:2923</code> do design system da Unooria. O registro{' '}
        <code>uncIcons</code> escolhe o subconjunto que a mensageria usa e dá a cada glifo um nome
        de produto.
      </UncDocCard>
      <UncDocCard icon="🔤" title="Fonte de ligadura">
        O glifo é o <em>texto</em> de uma ligadura. Sem a fonte carregada, o nome do ícone aparece
        no lugar do desenho. Importe <code>fonts/unoochat.css</code> — ou carregue o Material
        Symbols por conta própria — antes de renderizar o módulo.
      </UncDocCard>
      <UncDocCard icon="📐" title="size é a aresta da caixa">
        A prop <code>size</code> define uma caixa quadrada (16, 18, 20, 24 ou 32px, ou qualquer
        valor numérico); o glifo Material ocupa cerca de 83% dela. O excedente é cortado, para que
        uma fonte ausente não vaze o nome do ícone.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Tons semânticos">
        Cada <code>tone</code> resolve um token de cor do módulo (
        <code>--unc-color-icon-*</code>, <code>--unc-color-accent*</code> e afins), então o mesmo
        glifo muda de cor com o tema sem nenhuma condicional no componente.
      </UncDocCard>
      <UncDocCard icon="🔄" title="Rotação, espelhamento e preenchimento">
        <code>rotate</code>, <code>flipX</code> e <code>flipY</code> reaproveitam um glifo sem
        duplicá-lo — <code>forward</code> é <code>reply</code> espelhado, e o menu vertical é{' '}
        <code>overflow</code> a 90°. <code>filled</code> liga o eixo <code>FILL</code> da fonte.
      </UncDocCard>
      <UncDocCard icon="♿" title="Decorativo ou com nome">
        Sem <code>title</code>, o glifo é decorativo (<code>aria-hidden</code>). Com{' '}
        <code>title</code>, recebe <code>role=&quot;img&quot;</code> e <code>aria-label</code>.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Registro, fonte e decisões de substituição de glifo."
    />
    <UncDocSpecs
      component="Icon"
      layout="Caixa quadrada · glifo de ligadura"
      specs={[
        { label: 'Glifos registrados', value: String(uncIconNames.length) },
        { label: 'Biblioteca', value: 'Material Symbols Rounded' },
        { label: 'Peso', value: '300 (GRAD 0)' },
        { label: 'Quadro de origem', value: '6024:2923' },
        { label: 'Escala de tamanhos', value: '16 · 18 · 20 · 24 · 32px' },
        { label: 'Registro', value: 'Icon/IconGlyphs.ts' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'star → star_rate',
          detail:
            'o quadro de ícones da Unooria não publica `star`. A mensagem favoritada usa `star_rate`, que ele publica, com o eixo FILL ligado por padrão.',
        },
        {
          subject: 'videocam → video_call',
          detail:
            'o quadro não publica `videocam`. As chamadas de vídeo usam `video_call` (`videoCall` e `videoCallLarge`).',
        },
        {
          subject: 'forward → reply espelhado',
          detail:
            'o quadro não publica `forward`. O glifo `forward` é `reply` com `flipX` definido no próprio registro; passar `flipX` de novo o desfaz.',
        },
        {
          subject: 'push_pin → keep',
          detail:
            'o quadro não publica `push_pin`. A conversa fixada usa `keep`, que ele publica.',
        },
        {
          subject: 'Rádio desenhado em CSS',
          detail:
            'o quadro não publica `radio_button_checked` nem `radio_button_unchecked`. O componente `Radio` desenha o controle em CSS, e os antigos `radioOn` e `radioOff` deixaram de existir no registro. Também saíram `micBody`, `micStand` e `statusRing`: o microfone é o glifo único `mic`, e o anel de status é desenhado pelo `Avatar`.',
        },
        {
          subject: 'Glifos novos',
          detail:
            '`callEnd`, `tickDouble`, `pin`, `document`, `gallery`, `audio`, `location`, `contact` e `poll` entraram para cobrir o botão de encerrar chamada, a confirmação de leitura, a conversa fixada, a folha de anexos e a enquete. Todos são ligaduras publicadas no quadro.',
        },
        {
          subject: 'Uma ligadura, vários nomes',
          detail:
            'alguns nomes de produto repetem a ligadura (`camera`, `cameraFilled` e `composerCamera`; `lock` e `lockAlt`; `videoCall` e `videoCallLarge`) para que o uso seja rastreável e possa divergir depois sem mudar chamadores.',
        },
        {
          subject: 'Tick simples e duplo',
          detail:
            '`tick` é `check` (entregue, caixa marcada, opção votada); a leitura no balão é `tickDouble` (`done_all`).',
        },
        {
          subject: 'Sem glifo desenhado à mão',
          detail:
            'nenhum vetor foi criado, aproximado ou copiado de outra biblioteca. Um nome fora do quadro de ícones da Unooria só entra com uma ligadura equivalente e com registro aqui.',
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
      description="Cinco tamanhos nomeados, além de qualquer valor numérico em pixels."
    />
    <UncDocStage surface="canvas" padding={28} gap={32}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size, index) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Icon name="search" size={size} tone="appbar" />
          <Caption>
            {size} · {[16, 18, 20, 24, 32][index]}px
          </Caption>
        </div>
      ))}
      <div style={{ textAlign: 'center' }}>
        <Icon name="search" size={48} tone="appbar" />
        <Caption>size=&#123;48&#125;</Caption>
      </div>
    </UncDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Tons semânticos"
      description="Cada tom resolve um token de cor do módulo; alguns só fazem sentido sobre a superfície de acento ou da chamada."
    />
    <ToneMatrix theme="light" />
    <ToneMatrix theme="dark" />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Rotação, espelhamento e preenchimento"
      description="O mesmo glifo reaproveitado com as props de transformação."
    />
    <UncDocStage surface="canvas" padding={28} gap={32}>
      {[
        { label: 'overflow', node: <Icon name="overflow" size="xl" /> },
        { label: 'overflow · rotate 90°', node: <Icon name="overflow" size="xl" rotate={90} /> },
        { label: 'forward (reply espelhado)', node: <Icon name="forward" size="xl" /> },
        { label: 'forward · flipX', node: <Icon name="forward" size="xl" flipX /> },
        { label: 'back · rotate 180°', node: <Icon name="back" size="xl" rotate={180} /> },
        { label: 'newChat · flipY', node: <Icon name="newChat" size="xl" flipY /> },
        { label: 'camera', node: <Icon name="camera" size="xl" /> },
        { label: 'cameraFilled', node: <Icon name="cameraFilled" size="xl" /> },
        { label: 'phone · filled', node: <Icon name="phone" size="xl" filled /> },
        { label: 'star · filled=false', node: <Icon name="star" size="xl" filled={false} /> },
      ].map((item) => (
        <div key={item.label} style={{ textAlign: 'center', width: 130 }}>
          {item.node}
          <Caption>{item.label}</Caption>
        </div>
      ))}
    </UncDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Acessibilidade"
      description="Decorativo por padrão; com nome quando o glifo carrega significado sozinho."
    />
    <UncDocStage surface="canvas" padding={28} gap={48}>
      <div style={{ textAlign: 'center' }}>
        <Icon name="search" size="lg" />
        <Caption>sem title · aria-hidden</Caption>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="search" size="lg" title="Buscar" />
        <Caption>title=&quot;Buscar&quot; · role=&quot;img&quot;</Caption>
      </div>
    </UncDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="8. Suporte a temas"
      description="A galeria completa nos dois temas: os glifos herdam o tom do tema, sem alteração no registro."
    />
    <UncDocThemeSwitcher surface="canvas" padding={24}>
      {() => <IconMosaic />}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="9. Boas práticas" />
    <UncDocPractices
      dos={[
        'Importar o componente Icon de src/unoochat e escolher o glifo pelo nome do registro.',
        'Carregar fonts/unoochat.css (ou o Material Symbols do app) antes de renderizar o módulo.',
        'Escolher o tom semântico em vez de pintar o glifo com uma cor avulsa.',
        'Informar `title` quando o ícone carrega significado sozinho; omitir quando é decorativo.',
        'Reaproveitar um glifo com rotate, flipX e filled em vez de registrar um segundo nome.',
      ]}
      donts={[
        'Desenhar, aproximar ou reescrever um caminho SVG à mão.',
        'Substituir um glifo por um equivalente de outra biblioteca de ícones.',
        'Usar uma ligadura que o quadro de ícones da Unooria não publica sem registrar a decisão.',
        'Renderizar sem a fonte: o nome do ícone aparece como texto no lugar do desenho.',
        'Assumir que size nomeia o traço: é a aresta da caixa, e o glifo ocupa cerca de 83% dela.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="10. Referência completa de props" />
    <UncDocPropsTable
      title="Icon"
      rows={[
        {
          name: 'name',
          type: 'UncIconName',
          description: 'Nome do glifo no registro `uncIcons`. Obrigatório.',
        },
        {
          name: 'size',
          type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
          default: "'md'",
          description:
            'Aresta da caixa: 16, 18, 20, 24 ou 32px nos degraus nomeados, ou um valor livre em pixels.',
        },
        {
          name: 'tone',
          type: 'UncIconTone',
          default: "'appbar'",
          description: 'Tom semântico, resolvido a partir dos tokens de cor de ícone e de acento.',
        },
        {
          name: 'rotate',
          type: 'number',
          default: '0',
          description: 'Rotação em graus (ex.: 90 para o menu vertical a partir de `overflow`).',
        },
        {
          name: 'flipX',
          type: 'boolean',
          default: 'false',
          description:
            'Espelha o glifo no eixo horizontal. Combina com o espelhamento do registro: `forward` já vem espelhado, e `flipX` o desfaz.',
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
            'Força o eixo FILL da fonte. Quando omitido, vale o padrão do registro (`cameraFilled`, `phoneFilled` e `star` são preenchidos).',
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
    <UncDocPropsTable
      title="Estrutura de UncIconDefinition"
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
        {
          name: 'flipX',
          type: 'boolean',
          description: 'Espelha o glifo no eixo horizontal por padrão.',
        },
        { name: 'usage', type: 'string', description: 'Contexto de uso do glifo no produto.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Icon> = {
  title: 'Unoochat/Fundamentos/Ícones',
  component: Icon,
  parameters: { layout: 'padded' },
  argTypes: {
    name: {
      control: 'select',
      options: uncIconNames,
      description: 'Nome do glifo no registro `uncIcons`.',
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
    tone: 'appbar',
    rotate: 0,
    flipX: false,
    flipY: false,
    title: '',
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

/**
 * Documentação rica e completa da iconografia do Unoochat.
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
      name={args.name as UncIconName}
      size={args.size as number}
      tone={args.tone as UncIconTone}
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
      <UncDocStage surface="canvas" padding={28}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <Icon name="search" size={size} tone="appbar" />
            <Caption>{size}</Caption>
          </div>
        ))}
      </UncDocStage>
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
