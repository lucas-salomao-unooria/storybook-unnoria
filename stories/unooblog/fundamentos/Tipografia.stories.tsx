import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import {
  ublFontFamily,
  ublFontMono,
  ublFontWeights,
  ublIconFontFamily,
  ublTypography,
  ublTypographyOrder,
  type UblTheme,
  type UblTypographyToken,
} from '../../../src/unooblog/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocAnatomy,
  UblDocCard,
  UblDocDecisions,
  UblDocGrid,
  UblDocPractices,
  UblDocPropsTable,
  UblDocSpecs,
  UblDocStage,
  UblDocThemeSwitcher,
} from '../../../.storybook/components';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const DOC = {
  text: 'var(--ubl-color-text-primary)',
  muted: 'var(--ubl-color-text-secondary)',
  accent: 'var(--ubl-color-text-accent)',
  border: 'var(--ubl-color-border-subtle)',
} as const;

/**
 * Parágrafo de prosa de quatro linhas na coluna de leitura. Conteúdo fictício
 * de demonstração, no tom de um post do "Caderno Aberto".
 */
const PROSE_PARAGRAPH =
  'Um token de cor nasce na paleta, ganha um nome semântico e só então chega ao componente. Esse caminho parece longo, mas é ele que permite trocar o tema inteiro mudando uma linha: o botão não sabe se está no claro ou no escuro, ele só pede a cor de ação.';

/**
 * Amostra de cada estilo, em texto de blog: é o que o produto de fato escreve
 * naquele degrau. Conteúdo fictício de demonstração.
 */
const SAMPLES: Record<UblTypographyToken, string> = {
  display: 'Escrever bem é reescrever',
  heading1: 'Como organizamos os tokens do Caderno Aberto',
  heading2: 'Por que começamos pela paleta',
  heading3: 'Um degrau, dois temas',
  heading4: 'Série: Fundamentos do design system',
  lead: 'Um passeio pelas decisões que sustentam a leitura longa, da coluna ao bloco de código.',
  prose: PROSE_PARAGRAPH,
  bodyLarge: 'Resumo do cartão em até duas linhas, para a pessoa decidir se abre o post.',
  bodyMedium: 'Por Marina Duarte · Design de produto',
  quote: '“Texto longo pede uma coluna estreita e um fundo que não compete com ele.”',
  labelLarge: 'Ler o post',
  label: 'Tópicos',
  caption: '8 min de leitura · 30 de setembro de 2026',
  captionStrong: 'Novo',
  code: 'const gutter = tokens.spacing.l;',
};

/** Estilos cuja amostra é um bloco de código (pilha monoespaçada). */
const isCode = (token: UblTypographyToken) => token === 'code';

/** Sufixo da variável CSS de cada estilo (`--ubl-font-<slug>-*`). */
const slugOf = (key: UblTypographyToken) =>
  ublTypography[key].cssVar.replace('--ubl-font-', '').replace(/-size$/, '');

/** Estilo de uma amostra: a prosa corre na coluna de leitura. */
const sampleStyle = (token: UblTypographyToken): React.CSSProperties => {
  if (token === 'prose') return { maxWidth: 'var(--ubl-reading-width)' };
  if (token === 'code') {
    return {
      whiteSpace: 'pre-wrap',
      justifySelf: 'start',
      padding: 'var(--ubl-spacing-xs) var(--ubl-spacing-m)',
      borderRadius: 'var(--ubl-radius-s)',
      color: 'var(--ubl-color-code-text)',
      background: 'var(--ubl-color-code-surface)',
    };
  }
  return {};
};

/** Uma linha da escala: metadados à esquerda, a amostra real à direita. */
const ScaleRow: React.FC<{ token: UblTypographyToken }> = ({ token }) => {
  const style = ublTypography[token];
  const slug = slugOf(token);
  const className = `ubl-text ${style.className}`;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(200px, 250px) 1fr',
        gap: 24,
        alignItems: 'baseline',
        padding: '16px 0',
        borderTop: `1px solid ${DOC.border}`,
      }}
    >
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: DOC.accent }}>{style.styleName}</div>
        <div style={{ fontSize: 11, color: DOC.muted, fontFamily: MONO, marginTop: 4, lineHeight: 1.6 }}>
          {style.fontSize}px / {style.lineHeight}px · peso {style.fontWeight}
          <br />
          --ubl-font-{slug}-*
          <br />.{style.className}
          <br />
          origem {style.unooria}
        </div>
      </div>
      {isCode(token) ? (
        <pre className={className} data-ubl-type={token} style={sampleStyle(token)}>
          {SAMPLES[token]}
        </pre>
      ) : (
        <p className={className} data-ubl-type={token} style={sampleStyle(token)}>
          {SAMPLES[token]}
        </p>
      )}
    </div>
  );
};

/** A escala inteira, na ordem canônica. */
const Scale: React.FC = () => (
  <div data-ubl-theme="light" style={{ marginBottom: 32 }}>
    {ublTypographyOrder.map((token) => (
      <ScaleRow key={token} token={token} />
    ))}
  </div>
);

/** Classes de cor de cada estilo na amostra compacta. */
const toneOf = (token: UblTypographyToken): string => {
  if (token === 'bodyMedium' || token === 'caption' || token === 'lead') return 'ubl-text--secondary';
  if (token === 'label' || token === 'captionStrong') return 'ubl-text--accent';
  return '';
};

/** Amostra compacta da escala num tema, sobre a superfície da página. */
const ThemedScale: React.FC<{ theme: UblTheme }> = ({ theme }) => (
  <UblDocStage
    label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
    theme={theme}
    direction="column"
    align="flex-start"
    gap={4}
  >
    {ublTypographyOrder
      .filter((token) => !['display', 'heading1', 'prose', 'code'].includes(token))
      .map((token) => (
        <p key={token} className={`ubl-text ${ublTypography[token].className} ${toneOf(token)}`}>
          {SAMPLES[token]}
        </p>
      ))}
  </UblDocStage>
);

/** Código em linha: a mesma pilha monoespaçada, sobre o preenchimento de campo. */
const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code
    className="ubl-text ubl-text--code"
    style={{
      padding: '0 var(--ubl-spacing-xxs)',
      borderRadius: 'var(--ubl-radius-xs)',
      background: 'var(--ubl-color-fill-field)',
    }}
  >
    {children}
  </code>
);

/**
 * Post em miniatura na coluna de leitura: tópico, título, subtítulo, autoria,
 * parágrafo de quatro linhas com código em linha, título de seção, citação em
 * itálico, bloco de código e legenda. Mostra a escala trabalhando junta.
 */
const PostSample: React.FC = () => (
  <article
    data-ubl-post-sample=""
    style={{
      width: 'min(100%, var(--ubl-reading-width))',
      boxSizing: 'border-box',
      display: 'grid',
      gap: 'var(--ubl-spacing-l)',
    }}
  >
    <p className="ubl-text ubl-text--label ubl-text--accent">Design system</p>
    <h3 className="ubl-text ubl-text--heading-1">{SAMPLES.heading1}</h3>
    <p className="ubl-text ubl-text--lead ubl-text--secondary">{SAMPLES.lead}</p>
    <p className="ubl-text ubl-text--body-md ubl-text--secondary">{SAMPLES.bodyMedium}</p>
    <p className="ubl-text ubl-text--prose" data-ubl-prose="">
      {PROSE_PARAGRAPH} Veja o exemplo com <InlineCode>var(--ubl-color-action-primary)</InlineCode>.
    </p>
    <h4 className="ubl-text ubl-text--heading-2">{SAMPLES.heading2}</h4>
    <blockquote
      style={{
        margin: 0,
        paddingLeft: 'var(--ubl-spacing-l)',
        borderLeft: '3px solid var(--ubl-color-action-primary)',
      }}
    >
      <p className="ubl-text ubl-text--quote">{SAMPLES.quote}</p>
    </blockquote>
    <pre
      className="ubl-text ubl-text--code"
      style={{
        ...sampleStyle('code'),
        justifySelf: 'stretch',
        margin: 0,
        padding: 'var(--ubl-spacing-l)',
        borderRadius: 'var(--ubl-radius-m)',
      }}
    >
      {`.botao {\n  background: var(--ubl-color-action-primary);\n  color: var(--ubl-color-text-on-action);\n}`}
    </pre>
    <p className="ubl-text ubl-text--caption ubl-text--secondary">{SAMPLES.caption}</p>
  </article>
);

/** Os quatro pesos da família, com o mesmo texto. */
const Weights: React.FC = () => (
  <UblDocStage direction="column" align="flex-start" gap={8}>
    {(Object.entries(ublFontWeights) as [keyof typeof ublFontWeights, number][]).map(([name, weight]) => (
      <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={{ width: 150, fontFamily: MONO, fontSize: 11, color: DOC.muted }}>
          {name} · {weight}
        </span>
        <span
          style={{
            fontFamily: 'var(--ubl-font-sans)',
            fontSize: 'var(--ubl-font-heading-4-size)',
            lineHeight: 'var(--ubl-font-heading-4-line)',
            fontWeight: `var(--ubl-font-weight-${name})` as React.CSSProperties['fontWeight'],
            color: DOC.text,
          }}
        >
          {SAMPLES.heading3}
        </span>
      </div>
    ))}
  </UblDocStage>
);

/** Tamanhos distintos da escala. */
const sizes = Array.from(new Set(ublTypographyOrder.map((token) => ublTypography[token].fontSize)));

/**
 * Página de documentação rica da tipografia.
 */
const TipografiaDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Fundamentos • Tipografia"
      title="Tipografia"
      description={`${ublTypographyOrder.length} estilos de texto na família Open Sans da Plataforma Unooria, nos degraus de tamanho e altura de linha da escala da plataforma (de ${Math.max(...sizes)}px a ${Math.min(...sizes)}px); só o estilo Code usa a pilha monoespaçada do sistema. Sem letter-spacing. Do título de destaque da capa (60/78) à legenda (12/18), cada estilo tem variáveis CSS (--ubl-font-*-size|weight|line|tracking) e uma classe utilitária (.ubl-text--*). O texto do post corre em Prose, 18/28.`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Cinco faixas com responsabilidades distintas numa página do blog."
    />
    <UblDocGrid>
      <UblDocCard icon="📰" title="Display e títulos de página">
        <code>Display</code> (60/78) é o título do post em destaque na capa. <code>Heading/1</code>{' '}
        (48/64) titula o post aberto; <code>Heading/2</code> (34/48) e <code>Heading/3</code> (24/34)
        titulam as seções do post.
      </UblDocCard>
      <UblDocCard icon="🔖" title="Títulos de cartão e subtítulo">
        <code>Heading/4</code> (20/30, 600) titula cartões de post, série e autor; <code>Lead</code>{' '}
        (20/30, 400) é o subtítulo sob o título do post.
      </UblDocCard>
      <UblDocCard icon="📖" title="Prosa e corpo">
        <code>Prose</code> (18/28) é o texto do post e dos comentários; <code>Body/Large</code>{' '}
        (16/24) o resumo do cartão e os campos; <code>Body/Medium</code> (14/20) autoria e apoio.
      </UblDocCard>
      <UblDocCard icon="💬" title="Citação em itálico">
        <code>Quote</code> (24/34) é a citação em bloco, em itálico — o único estilo itálico da
        escala.
      </UblDocCard>
      <UblDocCard icon="🧑‍💻" title="Código">
        <code>Code</code> (14/20) usa a pilha monoespaçada do sistema, em bloco e em linha.{' '}
        <code>Label</code>, <code>Label/Large</code>, <code>Caption</code> e{' '}
        <code>Caption/Strong</code> cobrem botões, navegação, chips, datas e selos.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="../tokens"
      layout={`Escala de ${ublTypographyOrder.length} estilos`}
      specs={[
        { label: 'Família', value: 'Open Sans' },
        { label: 'Variável da família', value: '--ubl-font-sans' },
        { label: 'Pilha monoespaçada', value: '--ubl-font-mono' },
        { label: 'Família dos ícones', value: '--ubl-icon-font-family' },
        { label: 'Pesos', value: Object.values(ublFontWeights).join(' · ') },
        { label: 'Maior degrau', value: 'Display · 60/78' },
        { label: 'Menor degrau', value: 'Caption e Caption/Strong · 12/18' },
        { label: 'Prosa do post', value: 'Prose · 18/28 · 400' },
        { label: 'Coluna de leitura', value: '--ubl-reading-width · 680px' },
        { label: 'Tracking', value: '0px em todos os estilos' },
        { label: 'Origem dos degraus', value: '--unooria-size-*' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Open Sans, sem serifa de leitura',
          detail:
            'a família é a da Plataforma Unooria em 14 dos 15 estilos (o 15º, Code, é monoespaçado), inclusive na prosa do post. Não há uma segunda família com serifa para o texto longo: a hierarquia vem do peso e do tamanho (títulos em 700, título de cartão em 600, prosa, subtítulo e citação em 400) e o conforto de leitura vem da altura de linha de 28px e da coluna estreita, não de troca de fonte.',
        },
        {
          subject: 'Prosa 18/28 em coluna de 68 caracteres',
          detail:
            'o texto do post usa Prose (18/28) numa coluna de --ubl-reading-width (680px), o que em Open Sans de 18px dá cerca de 68 caracteres por linha — o meio da faixa de 45 a 75 caracteres em que a leitura longa é confortável. PostBody oferece três tamanhos (sm 16/24, md 18/28 e lg 20/30), todos degraus da escala; a coluna não muda com eles.',
        },
        {
          subject: 'Pilha monoespaçada do sistema (a Unooria não publica fonte monoespaçada)',
          detail:
            "o estilo Code usa --ubl-font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace. Cada plataforma resolve a sua própria fonte de código, sem arquivo para baixar e sem inventar uma família que a identidade da Unooria não tem. O tamanho (14/20) é o do degrau body-xs da escala.",
        },
        {
          subject: 'Sem letter-spacing',
          detail:
            'a escala da Unooria não usa tracking. As variáveis -tracking valem 0px só para que nenhum componente invente um valor, nem negativo nos títulos grandes nem positivo nos rótulos.',
        },
        {
          subject: 'Degraus e alturas de linha da Unooria',
          detail:
            'cada estilo copia o tamanho e a altura de linha de um degrau nomeado da escala da plataforma; o token --unooria-size-* de origem está no comentário de typography.css e na coluna "origem" da escala abaixo.',
        },
        {
          subject: 'Estilos pareados no mesmo degrau, separados pelo peso e pelo papel',
          detail:
            'Heading/4 e Lead dividem 20/30 (600 contra 400); Heading/3 e Quote dividem 24/34 (700 contra 400 itálico); Body/Large e Label/Large dividem 16/24 (400 contra 600); Body/Medium, Label e Code dividem 14/20; Caption e Caption/Strong dividem 12/18 (400 contra 600).',
        },
        {
          subject: 'Itálico só na citação',
          detail:
            'a classe .ubl-text--quote aplica font-style: italic; nenhum outro estilo usa itálico. É a pista visual de que o trecho é fala de terceiro.',
        },
        {
          subject: 'Nenhum corpo abaixo de 12px',
          detail:
            'Caption e Caption/Strong, os menores degraus, valem 12/18; não há selo nem legenda menor.',
        },
        {
          subject: 'Fonte opt-in, ícones por ligadura',
          detail:
            'a folha fonts/unooblog.css é opt-in (AGENTS.md, 4.6), mas na prática obrigatória, porque os ícones são fonte de ligadura. A pilha de fallback de texto é Open Sans e depois as famílias de sistema.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia de um estilo"
      description="Cada degrau publica quatro variáveis e uma classe utilitária."
    />
    <UblDocAnatomy
      zones={[
        { name: 'Tamanho', role: 'Corpo da fonte em pixels.', token: '--ubl-font-<estilo>-size' },
        { name: 'Peso', role: '400, 600 ou 700 nos estilos da escala; o 500 existe tokenizado.', token: '--ubl-font-<estilo>-weight' },
        { name: 'Altura de linha', role: 'Em pixels absolutos, da escala da Unooria.', token: '--ubl-font-<estilo>-line' },
        { name: 'Tracking', role: 'Sempre 0px.', token: '--ubl-font-<estilo>-tracking' },
        { name: 'Classe utilitária', role: 'Aplica os quatro de uma vez, com .ubl-text (família, cor e margem 0).', token: '.ubl-text.ubl-text--<estilo>' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Escala completa"
      description="Cada amostra usa a classe utilitária real, com o texto que o blog escreve naquele degrau."
    />
    <Scale />
    <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC.text }}>A escala trabalhando junta, na coluna de leitura</h4>
    <UblDocStage surface="page" align="flex-start" padding={32}>
      <PostSample />
    </UblDocStage>
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Pesos</h4>
    <Weights />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Famílias</h4>
    <UblDocPropsTable
      rows={[
        { name: '--ubl-font-sans', type: ublFontFamily, description: 'Texto de toda a interface, inclusive a prosa do post.' },
        { name: '--ubl-font-mono', type: ublFontMono, description: 'Código em bloco e em linha.' },
        { name: '--ubl-icon-font-family', type: ublIconFontFamily, description: 'Glifos do Icon, por ligadura.' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Usar os estilos pelo nome (variáveis --ubl-font-* ou classe .ubl-text--*), nunca um tamanho solto.',
        'Hierarquizar um post pela escada: título (Heading/1), subtítulo (Lead), autoria (Body/Medium), seções (Heading/2 e 3) e prosa — separando-os por peso, tamanho e cor.',
        'Manter a prosa em Prose (18/28) na coluna de --ubl-reading-width.',
        'Usar --ubl-font-mono só para código, em bloco e em linha.',
        'Reservar o itálico à citação em bloco.',
        'Carregar fonts/unooblog.css ou a Open Sans por next/font.',
      ]}
      donts={[
        'Inventar letter-spacing, nem para rótulos nem para títulos grandes.',
        'Reintroduzir uma fonte com serifa para o texto longo: a família do módulo é uma só, a Open Sans.',
        'Usar corpo abaixo de 12px.',
        'Largar a prosa em coluna mais larga que a de leitura: acima de ~75 caracteres por linha a leitura cansa.',
        'Usar Display ou Heading/1 em texto corrido, ou em mais de um título por tela.',
        'Usar itálico fora da citação, ou negrito na prosa para criar um "título interno".',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A escala não muda com o tema; só a cor do texto acompanha os tokens."
    />
    <UblDocThemeSwitcher surface="page">
      {() => (
        <div style={{ display: 'grid', gap: 4, width: '100%' }}>
          <p className="ubl-text ubl-text--label ubl-text--accent">Design system</p>
          <p className="ubl-text ubl-text--heading-2">{SAMPLES.heading2}</p>
          <p className="ubl-text ubl-text--lead ubl-text--secondary">{SAMPLES.lead}</p>
          <p className="ubl-text ubl-text--quote">{SAMPLES.quote}</p>
          <p className="ubl-text ubl-text--caption ubl-text--secondary">{SAMPLES.caption}</p>
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa da API de tipografia" />
    <UblDocPropsTable
      title="Exportações de tokens/typography.ts"
      rows={[
        { name: 'ublTypography', type: 'Record<UblTypographyToken, UblTypographyStyle>', description: 'A escala completa.' },
        { name: 'ublTypographyOrder', type: 'UblTypographyToken[]', description: 'Ordem canônica de exibição.' },
        { name: 'ublFontFamily', type: 'string', description: 'Pilha da família de texto.' },
        { name: 'ublFontMono', type: 'string', description: 'Pilha monoespaçada do sistema.' },
        { name: 'ublIconFontFamily', type: 'string', description: 'Família da biblioteca de ícones.' },
        { name: 'ublFontWeights', type: '{ regular: 400; medium: 500; semibold: 600; bold: 700 }', description: 'Pesos disponíveis.' },
        { name: 'UblTypographyToken', type: ublTypographyOrder.map((token) => `'${token}'`).join(' | '), description: 'Chaves da escala.' },
      ]}
    />
    <UblDocPropsTable
      title="UblTypographyStyle"
      rows={[
        { name: 'styleName', type: 'string', description: 'Nome do estilo (ex.: "Heading/2").' },
        { name: 'unooria', type: 'string', description: 'Token da Unooria de onde o tamanho foi copiado.' },
        { name: 'fontSize', type: 'number', description: 'Tamanho em pixels.' },
        { name: 'fontWeight', type: 'number', description: 'Peso (400, 600 ou 700).' },
        { name: 'lineHeight', type: 'number', description: 'Altura de linha em pixels.' },
        { name: 'letterSpacing', type: 'number', description: 'Sempre 0.' },
        { name: 'cssVar', type: 'string', description: 'Variável de tamanho; as demais trocam o sufixo.' },
        { name: 'className', type: 'string', description: 'Classe utilitária correspondente.' },
        { name: 'usage', type: 'string', description: 'Uso recomendado no produto.' },
      ]}
    />
    <UblDocPropsTable
      title="Uso de cada estilo"
      rows={ublTypographyOrder.map((token) => ({
        name: ublTypography[token].styleName,
        type: `${ublTypography[token].fontSize}/${ublTypography[token].lineHeight} · ${ublTypography[token].fontWeight}`,
        default: ublTypography[token].unooria,
        description: ublTypography[token].usage,
      }))}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unooblog/Fundamentos/Tipografia',
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa da tipografia.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TipografiaDocumentationPage />,
};

/**
 * A escala completa. O `play` confere que cada classe utilitária resolve o
 * tamanho, a altura de linha e o peso da tabela, e que o tracking é zero.
 */
export const Escala: Story = {
  name: '🎨 Escala completa',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Escala completa" />
      <Scale />
    </UnooriaDocShell>
  ),
  play: async ({ canvasElement }) => {
    for (const token of ublTypographyOrder) {
      const element = canvasElement.querySelector<HTMLElement>(`[data-ubl-type="${token}"]`);
      await expect(element).not.toBeNull();
      const computed = getComputedStyle(element!);
      const style = ublTypography[token];
      await expect(computed.fontSize).toBe(`${style.fontSize}px`);
      await expect(computed.lineHeight).toBe(`${style.lineHeight}px`);
      await expect(computed.fontWeight).toBe(String(style.fontWeight));
      await expect(['0px', 'normal']).toContain(computed.letterSpacing);
    }
    // A citação é o único estilo em itálico; o código, o único monoespaçado.
    const italic = ublTypographyOrder.filter((token) => {
      const element = canvasElement.querySelector<HTMLElement>(`[data-ubl-type="${token}"]`)!;
      return getComputedStyle(element).fontStyle === 'italic';
    });
    await expect(italic).toEqual(['quote']);
    const mono = ublTypographyOrder.filter((token) => {
      const element = canvasElement.querySelector<HTMLElement>(`[data-ubl-type="${token}"]`)!;
      return /monospace/.test(getComputedStyle(element).fontFamily);
    });
    await expect(mono).toEqual(['code']);
  },
};

/**
 * Um post em miniatura na coluna de leitura. O `play` confere que a coluna tem
 * 680px, que o parágrafo de prosa respeita o limite e ocupa de três a seis
 * linhas de 28px — na ordem de 68 caracteres por linha.
 */
export const Post: Story = {
  name: 'Post na coluna de leitura',
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={32}>
      <PostSample />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const article = canvasElement.querySelector<HTMLElement>('[data-ubl-post-sample]')!;
    await expect(article.getBoundingClientRect().width).toBeLessThanOrEqual(680);
    const prose = canvasElement.querySelector<HTMLElement>('[data-ubl-prose]')!;
    const computed = getComputedStyle(prose);
    await expect(computed.fontSize).toBe(`${ublTypography.prose.fontSize}px`);
    await expect(computed.lineHeight).toBe(`${ublTypography.prose.lineHeight}px`);
    const lines = Math.round(prose.getBoundingClientRect().height / ublTypography.prose.lineHeight);
    await expect(lines).toBeGreaterThanOrEqual(3);
    await expect(lines).toBeLessThanOrEqual(6);
    // Código em linha usa a pilha monoespaçada.
    const inline = prose.querySelector('code')!;
    await expect(getComputedStyle(inline).fontFamily).toMatch(/monospace/);
  },
};

/**
 * Os pesos da família.
 */
export const Pesos: Story = {
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Pesos" />
      <Weights />
    </UnooriaDocShell>
  ),
};

/**
 * A escala nos dois temas, lado a lado.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <ThemedScale theme="light" />
      <ThemedScale theme="dark" />
    </div>
  ),
};
