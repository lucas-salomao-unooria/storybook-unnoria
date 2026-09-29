import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocGrid,
  UaiDocCard,
  UaiDocSpecs,
  UaiDocDecisions,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';
import type { UaiDocTheme } from '../../../.storybook/components';
import { Icon, uaiIcons, uaiIconNames } from '../../../src/unooriaai/components/Icon';
import type { UaiIconName } from '../../../src/unooriaai/components/Icon';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const DOC_BORDER = '#E4E8E9';
const DOC_TEXT = '#22272A';
const DOC_MUTED = '#475157';
const DOC_LINK = '#57547D';
const DOC_SUCCESS = '#01B574';

type IconDefinition = { ligature: string; filled?: boolean; usage: string };

const LIGATURE_COUNT = new Set(uaiIconNames.map((name) => (uaiIcons[name] as IconDefinition).ligature))
  .size;

/**
 * Cartão de glifo do catálogo: renderiza o `Icon` real e mostra o nome, a
 * ligadura Material e o uso.
 */
const IconCard: React.FC<{
  name: UaiIconName;
  copied: boolean;
  onCopy: (name: UaiIconName) => void;
}> = ({ name, copied, onCopy }) => {
  const definition = uaiIcons[name] as IconDefinition;

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
        data-uai-theme="light"
        style={{
          background: 'var(--uai-bg-secondary)',
          color: 'var(--uai-text-primary)',
          height: 78,
          flexShrink: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={name} size={32} />
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

  const filtered = uaiIconNames.filter((name) => {
    const definition = uaiIcons[name] as IconDefinition;
    const haystack = `${name} ${definition.ligature} ${definition.usage}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  const handleCopy = (name: UaiIconName) => {
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
        {filtered.length} de {uaiIconNames.length} glifos
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
      color: 'var(--uai-text-primary)',
    }}
  >
    {uaiIconNames.map((name) => (
      <div key={name} style={{ textAlign: 'center' }}>
        <Icon name={name} size={32} />
        <div
          style={{
            marginTop: 6,
            color: 'var(--uai-text-secondary)',
            fontFamily: 'var(--uai-font-sans)',
            fontSize: 12,
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
      color: 'var(--uai-text-secondary)',
      fontFamily: 'var(--uai-font-sans)',
      fontSize: 12,
      lineHeight: 1.5,
    }}
  >
    {children}
  </div>
);

/**
 * Playground do componente Icon com todas as props expostas.
 */
const IconPlayground: React.FC<{
  name: UaiIconName;
  size: number;
  theme: UaiDocTheme;
  rotate: number;
  flipX: boolean;
  flipY: boolean;
  filled?: boolean;
  title?: string;
}> = ({ title, theme, ...props }) => (
  <UaiDocStage surface="primary" theme={theme} padding={40}>
    <div style={{ color: 'var(--uai-text-primary)' }}>
      <Icon {...props} title={title || undefined} />
    </div>
  </UaiDocStage>
);

/**
 * Página de documentação rica da iconografia do UnooriaAI.
 */
const IconesDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Fundamentos • Ícones"
      title="Ícones"
      description={`Biblioteca de ${uaiIconNames.length} glifos da Plataforma Unooria: Material Symbols Rounded, peso 300, o mesmo conjunto do quadro de ícones do design system da Unooria (6024:2923). Cada glifo é uma ligadura da fonte — nenhum caminho vetorial foi desenhado à mão ou trazido de outra biblioteca — e herda a cor do contexto, nos dois temas.`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Origem, fonte de ligadura e composição dos glifos."
    />
    <UaiDocGrid>
      <UaiDocCard icon="🧬" title="Biblioteca da Unooria">
        Os ícones são os da Plataforma Unooria: Material Symbols Rounded, peso 300, grade normal,
        publicados no quadro <code>6024:2923</code> do design system da Unooria. O registro{' '}
        <code>uaiIcons</code> escolhe o subconjunto que o cliente de conversa usa e dá a cada glifo um
        nome de função.
      </UaiDocCard>
      <UaiDocCard icon="🔤" title="Fonte de ligadura">
        O glifo é o <em>texto</em> de uma ligadura. Sem a fonte carregada, o nome do ícone aparece no
        lugar do desenho. Importe <code>fonts/unooriaai.css</code> — ou carregue o Material Symbols por
        conta própria — antes de renderizar o módulo.
      </UaiDocCard>
      <UaiDocCard icon="📐" title="size é a aresta da caixa">
        A prop <code>size</code> define uma caixa quadrada (16, 24 ou 32px, ou qualquer valor
        numérico); o glifo Material ocupa cerca de 83% dela. O excedente é cortado, para que uma fonte
        ausente não vaze o nome do ícone.
      </UaiDocCard>
      <UaiDocCard icon="🎨" title="Cor herdada">
        O glifo usa <code>currentColor</code>: o mesmo registro serve ao texto primário das linhas, ao
        acento de um botão e ao tom translúcido do envio, sem uma prop de cor. Quem escolhe o token é
        o componente que contém o ícone.
      </UaiDocCard>
      <UaiDocCard icon="🔄" title="Rotação, espelhamento e preenchimento">
        <code>rotate</code>, <code>flipX</code> e <code>flipY</code> reaproveitam um glifo sem
        duplicá-lo. <code>filled</code> liga o eixo <code>FILL</code> da fonte, como no{' '}
        <code>stars</code>.
      </UaiDocCard>
      <UaiDocCard icon="♿" title="Decorativo ou com nome">
        Sem <code>title</code>, o glifo é decorativo (<code>aria-hidden</code>). Com{' '}
        <code>title</code>, recebe <code>role=&quot;img&quot;</code> e <code>aria-label</code>.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Registro, fonte e decisões de nomeação."
    />
    <UaiDocSpecs
      component="Icon"
      layout="Caixa quadrada · glifo de ligadura"
      specs={[
        { label: 'Glifos registrados', value: String(uaiIconNames.length) },
        { label: 'Biblioteca', value: 'Material Symbols Rounded' },
        { label: 'Peso', value: '300 (GRAD 0)' },
        { label: 'Quadro de origem', value: '6024:2923' },
        { label: 'Escala de tamanhos', value: '16 · 24 · 32px' },
        { label: 'Registro', value: 'Icon/IconGlyphs.ts' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Vocabulário do módulo preservado',
          detail:
            'os treze nomes históricos (microphone, image, paperPlaneRight, add, chatText, trash, sun, user, arrowSquareOut, signOut, chats, stars, shieldWarning) continuam valendo, cada um apontando agora para uma ligadura. Nenhum consumidor precisa mudar de nome.',
        },
        {
          subject: 'Todo nome existe no quadro de ícones da Unooria',
          detail: `as ${LIGATURE_COUNT} ligaduras distintas do registro (por exemplo ${uaiIcons.microphone.ligature}, ${uaiIcons.paperPlaneRight.ligature}, ${uaiIcons.chats.ligature} e ${uaiIcons.shieldWarning.ligature}) estão publicadas no quadro 6024:2923. Um nome fora dele só entra com registro da decisão aqui, e a biblioteca nunca é trocada por outra.`,
        },
        {
          subject: 'Substitutos, porque o quadro não publica a ligadura mais óbvia',
          detail:
            'image usa photo (o quadro não publica image), sun usa wb_sunny (sem light_mode), stars usa a ligadura stars, preenchida (o quadro não publica auto_awesome) e sparkle usa flare, a explosão de quatro pontas mais próxima. shieldWarning usa gpp_maybe (escudo com interrogação, o aviso de limitação) e chats usa forum.',
        },
        {
          subject: 'Os antigos glifos tipográficos viraram ícones',
          detail:
            'close, arrowForward, arrowUpward, sparkle, search e chatBubble substituem os caracteres ✕ → ↑ ✦ ⌕ e o emoji de conversa, que os slots de glifo usavam. add substitui o +. Emoji não é aceitável como glifo funcional: renderiza diferente em cada plataforma e não herda a cor.',
        },
        {
          subject: 'Sem glifo desenhado à mão',
          detail:
            'nenhum vetor foi criado, aproximado ou copiado de outra biblioteca. O Icon é o único lugar do módulo que emite glifos.',
        },
        {
          subject: 'Cor herdada, sem prop de tom',
          detail:
            'o módulo usa o glifo em três cores de contexto (texto primário, texto sobre acento e texto translúcido). O Icon herda currentColor em vez de expor tons, e a opacidade fica a cargo do CSS do componente que contém o ícone.',
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
      description="Os três degraus de uso, além de qualquer valor numérico em pixels."
    />
    <UaiDocStage surface="primary" padding={28} gap={32}>
      {[16, 24, 32, 48].map((size) => (
        <div key={size} style={{ textAlign: 'center', color: 'var(--uai-text-primary)' }}>
          <Icon name="search" size={size} />
          <Caption>size=&#123;{size}&#125;</Caption>
        </div>
      ))}
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Rotação, espelhamento e preenchimento"
      description="O mesmo glifo reaproveitado com as props de transformação."
    />
    <UaiDocStage surface="primary" padding={28} gap={32}>
      {[
        { label: 'arrowForward', node: <Icon name="arrowForward" size={32} /> },
        { label: 'arrowForward · rotate 180°', node: <Icon name="arrowForward" size={32} rotate={180} /> },
        { label: 'arrowForward · flipX', node: <Icon name="arrowForward" size={32} flipX /> },
        { label: 'arrowUpward', node: <Icon name="arrowUpward" size={32} /> },
        { label: 'arrowUpward · flipY', node: <Icon name="arrowUpward" size={32} flipY /> },
        { label: 'stars', node: <Icon name="stars" size={32} /> },
        { label: 'stars · filled=false', node: <Icon name="stars" size={32} filled={false} /> },
        { label: 'add · filled', node: <Icon name="add" size={32} filled /> },
      ].map((item) => (
        <div key={item.label} style={{ textAlign: 'center', width: 150, color: 'var(--uai-text-primary)' }}>
          {item.node}
          <Caption>{item.label}</Caption>
        </div>
      ))}
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Acessibilidade"
      description="Decorativo por padrão; com nome quando o glifo carrega significado sozinho."
    />
    <UaiDocStage surface="primary" padding={28} gap={48}>
      <div style={{ textAlign: 'center', color: 'var(--uai-text-primary)' }}>
        <Icon name="search" size={32} />
        <Caption>sem title · aria-hidden</Caption>
      </div>
      <div style={{ textAlign: 'center', color: 'var(--uai-text-primary)' }}>
        <Icon name="search" size={32} title="Buscar" />
        <Caption>title=&quot;Buscar&quot; · role=&quot;img&quot;</Caption>
      </div>
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="A galeria completa nos dois temas: os glifos herdam a cor do contexto, sem alteração no registro."
    />
    <UaiDocThemeSwitcher surface="primary" padding={24}>
      {() => <IconMosaic />}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Boas práticas" />
    <UaiDocPractices
      dos={[
        'Importar o componente Icon de src/unooriaai e escolher o glifo pelo nome do registro.',
        'Carregar fonts/unooriaai.css (ou o Material Symbols do app) antes de renderizar o módulo.',
        'Deixar a cor vir do contexto: o Icon herda currentColor.',
        'Informar title quando o ícone carrega significado sozinho; omitir quando é decorativo.',
        'Acompanhar glifo de ação com rótulo acessível no botão que o contém.',
        'Reaproveitar um glifo com rotate, flipX e filled em vez de registrar um segundo nome.',
      ]}
      donts={[
        'Desenhar, aproximar ou reescrever um caminho SVG à mão.',
        'Substituir um glifo por um equivalente de outra biblioteca de ícones.',
        'Usar uma ligadura que o quadro de ícones da Unooria não publica sem registrar a decisão.',
        'Renderizar sem a fonte: o nome do ícone aparece como texto no lugar do desenho.',
        'Usar emoji ou caractere tipográfico como ícone funcional.',
        'Assumir que size nomeia o traço: é a aresta da caixa, e o glifo ocupa cerca de 83% dela.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="9. Referência completa de props" />
    <UaiDocPropsTable
      title="Icon"
      rows={[
        {
          name: 'name',
          type: 'UaiIconName',
          description: 'Nome do glifo no registro `uaiIcons`. Obrigatório.',
        },
        {
          name: 'size',
          type: '16 | 24 | 32 | number',
          default: '24',
          description: 'Aresta da caixa quadrada, em pixels. 16, 24 e 32 são os degraus de uso; qualquer número é aceito.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Força o tema do glifo. Quando omitido, herda o tema do contêiner por data-uai-theme.',
        },
        {
          name: 'rotate',
          type: 'number',
          default: '0',
          description: 'Rotação em graus.',
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
            'Força o eixo FILL da fonte. Quando omitido, vale o padrão do registro (só stars é preenchido).',
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
    <UaiDocPropsTable
      title="Estrutura de UaiIconDefinition"
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
  title: 'UnooriaAI/Fundamentos/Ícones',
  component: Icon,
  parameters: { layout: 'padded' },
  argTypes: {
    name: {
      control: 'select',
      options: uaiIconNames,
      description: 'Nome do glifo no registro `uaiIcons`.',
    },
    size: {
      control: { type: 'range', min: 12, max: 96, step: 1 },
      description: 'Aresta da caixa do glifo, em pixels.',
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Tema do glifo (data-uai-theme).',
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
 * Documentação rica e completa da iconografia do UnooriaAI.
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
      theme={(args.theme ?? 'light') as UaiDocTheme}
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
 * Tamanhos de uso do módulo.
 */
export const Tamanhos: Story = {
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Tamanhos" />
      <UaiDocStage surface="primary" padding={28}>
        {[16, 24, 32].map((size) => (
          <div key={size} style={{ textAlign: 'center', color: 'var(--uai-text-primary)' }}>
            <Icon name="search" size={size} />
            <Caption>{size}px</Caption>
          </div>
        ))}
      </UaiDocStage>
    </UnooriaDocShell>
  ),
};
