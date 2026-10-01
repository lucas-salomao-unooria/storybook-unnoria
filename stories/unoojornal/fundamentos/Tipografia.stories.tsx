import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import {
  ujnFontFamily,
  ujnFontWeights,
  ujnIconFontFamily,
  ujnTypography,
  ujnTypographyOrder,
  type UjnTheme,
  type UjnTypographyToken,
} from '../../../src/unoojornal/tokens';
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

const DOC = {
  text: 'var(--ujn-color-text-primary)',
  muted: 'var(--ujn-color-text-secondary)',
  accent: 'var(--ujn-color-text-accent)',
  border: 'var(--ujn-color-border-subtle)',
} as const;

/**
 * Amostra de cada estilo, em texto de jornal: é o que o produto de fato escreve
 * naquele degrau. Conteúdo fictício de demonstração.
 */
const SAMPLES: Record<UjnTypographyToken, string> = {
  masthead: 'Jornal Escolar',
  headlineXl: 'Alunos do 9º ano vencem a Olimpíada de Matemática',
  headline: 'Feira de ciências reúne mil alunos no pátio central',
  titleLarge: 'Agenda da escola',
  titleMedium: 'Biblioteca ganha 800 livros novos',
  deck: 'Doações de famílias e ex-alunos renovaram o acervo e ampliaram o horário de empréstimo.',
  bodyLarge:
    'Os projetos ocuparam o pátio durante toda a manhã. Em cada banca, estudantes explicaram experimentos de física, química e biologia a pais, professores e colegas de outras turmas. Ao final, a comunidade votou nos três trabalhos preferidos, e o resultado será divulgado na próxima edição.',
  bodyMedium: 'Os projetos ocuparam o pátio durante toda a manhã e a comunidade foi convidada a votar.',
  bodySmall: 'Por Marina Duarte · Redação',
  quote: '“A escola é o lugar onde a gente aprende a perguntar.”',
  labelLarge: 'Ler a reportagem',
  label: 'Últimas notícias',
  kicker: 'Esportes',
  caption: '6 min de leitura · 30 de setembro de 2026',
};

/** Estilos cuja amostra precisa de caixa alta, aplicada pelo componente. */
const isUppercase = (token: UjnTypographyToken) => token === 'kicker';

/** Sufixo da variável CSS de cada estilo (`--ujn-font-<slug>-*`). */
const slugOf = (key: UjnTypographyToken) =>
  ujnTypography[key].cssVar.replace('--ujn-font-', '').replace(/-size$/, '');

/** Uma linha da escala: metadados à esquerda, a amostra real à direita. */
const ScaleRow: React.FC<{ token: UjnTypographyToken }> = ({ token }) => {
  const style = ujnTypography[token];
  const slug = slugOf(token);
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
          --ujn-font-{slug}-*
          <br />.{style.className}
          <br />
          origem {style.unooria}
        </div>
      </div>
      <p
        className={`ujn-text ${style.className}`}
        data-ujn-type={token}
        style={isUppercase(token) ? { textTransform: 'uppercase' } : undefined}
      >
        {SAMPLES[token]}
      </p>
    </div>
  );
};

/** A escala inteira, na ordem canônica. */
const Scale: React.FC = () => (
  <div data-ujn-theme="light" style={{ marginBottom: 32 }}>
    {ujnTypographyOrder.map((token) => (
      <ScaleRow key={token} token={token} />
    ))}
  </div>
);

/** Classes de cor de cada estilo na amostra compacta. */
const toneOf = (token: UjnTypographyToken): string => {
  if (token === 'bodySmall' || token === 'caption' || token === 'bodyMedium') return 'ujn-text--secondary';
  if (token === 'kicker' || token === 'label') return 'ujn-text--accent';
  return '';
};

/** Amostra compacta da escala num tema, sobre a superfície da página. */
const ThemedScale: React.FC<{ theme: UjnTheme }> = ({ theme }) => (
  <UjnDocStage
    label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
    theme={theme}
    direction="column"
    align="flex-start"
    gap={4}
  >
    {ujnTypographyOrder
      .filter((token) => token !== 'bodyLarge' && token !== 'masthead' && token !== 'headlineXl')
      .map((token) => (
        <p
          key={token}
          className={`ujn-text ${ujnTypography[token].className} ${toneOf(token)}`}
          style={isUppercase(token) ? { textTransform: 'uppercase' } : undefined}
        >
          {SAMPLES[token]}
        </p>
      ))}
  </UjnDocStage>
);

/**
 * Página de matéria em miniatura: kicker, manchete, linha fina, autoria, corpo
 * de quatro linhas, citação em itálico e legenda. Mostra a escala trabalhando
 * junta, como num jornal.
 */
const ArticleSample: React.FC = () => (
  <article
    style={{
      width: 'min(100%, 640px)',
      boxSizing: 'border-box',
      display: 'grid',
      gap: 'var(--ujn-spacing-m)',
      padding: 'var(--ujn-spacing-xxl)',
      background: 'var(--ujn-color-background-card)',
      border: '1px solid var(--ujn-color-border-subtle)',
      borderTop: 'var(--ujn-rule-thick) solid var(--ujn-color-border-rule)',
    }}
  >
    <p className="ujn-text ujn-text--kicker ujn-text--accent" style={{ textTransform: 'uppercase' }}>
      {SAMPLES.kicker}
    </p>
    <h3 className="ujn-text ujn-text--headline">{SAMPLES.headline}</h3>
    <p className="ujn-text ujn-text--deck ujn-text--secondary">{SAMPLES.deck}</p>
    <p className="ujn-text ujn-text--body-sm ujn-text--secondary">{SAMPLES.bodySmall}</p>
    <p className="ujn-text ujn-text--body-lg">{SAMPLES.bodyLarge}</p>
    <blockquote
      style={{
        margin: 0,
        paddingLeft: 'var(--ujn-spacing-l)',
        borderLeft: 'var(--ujn-rule-thick) solid var(--ujn-color-border-rule)',
      }}
    >
      <p className="ujn-text ujn-text--quote">{SAMPLES.quote}</p>
    </blockquote>
    <p className="ujn-text ujn-text--caption ujn-text--secondary">{SAMPLES.caption}</p>
  </article>
);

/** Os quatro pesos da família, com o mesmo texto. */
const Weights: React.FC = () => (
  <UjnDocStage direction="column" align="flex-start" gap={8}>
    {(Object.entries(ujnFontWeights) as [keyof typeof ujnFontWeights, number][]).map(([name, weight]) => (
      <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={{ width: 150, fontFamily: MONO, fontSize: 11, color: DOC.muted }}>
          {name} · {weight}
        </span>
        <span
          style={{
            fontFamily: 'var(--ujn-font-sans)',
            fontSize: 'var(--ujn-font-title-lg-size)',
            lineHeight: 'var(--ujn-font-title-lg-line)',
            fontWeight: `var(--ujn-font-weight-${name})` as React.CSSProperties['fontWeight'],
            color: DOC.text,
          }}
        >
          {SAMPLES.titleMedium}
        </span>
      </div>
    ))}
  </UjnDocStage>
);

/** Tamanhos distintos da escala. */
const sizes = Array.from(new Set(ujnTypographyOrder.map((token) => ujnTypography[token].fontSize)));

/**
 * Página de documentação rica da tipografia.
 */
const TipografiaDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Fundamentos • Tipografia"
      title="Tipografia"
      description={`${ujnTypographyOrder.length} estilos de texto na família Open Sans da Plataforma Unooria, nos degraus de tamanho e altura de linha da escala da plataforma (de ${Math.max(...sizes)}px a ${Math.min(...sizes)}px), em três pesos de uso e sem letter-spacing. Do nome da publicação (60/78) à legenda (12/18), cada estilo tem variáveis CSS (--ujn-font-*-size|weight|line|tracking) e uma classe utilitária (.ujn-text--*).`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Cinco faixas com responsabilidades distintas na página do jornal."
    />
    <UjnDocGrid>
      <UjnDocCard icon="📰" title="Masthead e manchetes">
        <code>Masthead</code> (60/78) é o nome da publicação no cabeçalho. <code>Headline/XL</code>{' '}
        (48/64) titula a matéria aberta e <code>Headline</code> (34/48) a matéria de capa.
      </UjnDocCard>
      <UjnDocCard icon="🔖" title="Títulos e linha fina">
        <code>Title/Large</code> (24/34) nomeia seções e a caixa de opinião; <code>Title/Medium</code>{' '}
        (20/30, 600) titula itens de lista e cartões; <code>Deck</code> (20/30, 400) é a linha fina sob
        a manchete.
      </UjnDocCard>
      <UjnDocCard icon="📄" title="Corpo">
        <code>Body/Large</code> (18/28) é o corpo da matéria aberta; <code>Body/Medium</code> (16/24) o
        resumo da lista e os campos; <code>Body/Small</code> (14/20) a autoria e o apoio.
      </UjnDocCard>
      <UjnDocCard icon="💬" title="Citação">
        <code>Quote</code> (24/34) é a citação em destaque, em itálico — a única família visual
        diferente do texto corrido.
      </UjnDocCard>
      <UjnDocCard icon="🏷️" title="Rótulos e kicker">
        <code>Label/Large</code> (16/24) e <code>Label</code> (14/20) em botões, navegação e pílulas;{' '}
        <code>Kicker</code> (12/18, 600) é a categoria sobre o título, em caixa alta;{' '}
        <code>Caption</code> (12/18) o tempo de leitura e os direitos autorais.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="../tokens"
      layout={`Escala de ${ujnTypographyOrder.length} estilos`}
      specs={[
        { label: 'Família', value: 'Open Sans' },
        { label: 'Variável da família', value: '--ujn-font-sans' },
        { label: 'Família dos ícones', value: '--ujn-icon-font-family' },
        { label: 'Pesos', value: Object.values(ujnFontWeights).join(' · ') },
        { label: 'Maior degrau', value: 'Masthead · 60/78' },
        { label: 'Menor degrau', value: 'Kicker e Caption · 12/18' },
        { label: 'Tracking', value: '0px em todos os estilos' },
        { label: 'Origem dos degraus', value: '--unooria-size-*' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Serifa do Figma → Open Sans bold/regular',
          detail:
            'o arquivo de referência compõe manchetes e corpo em fonte com serifa. Aqui a família é a da Plataforma Unooria, Open Sans, e a hierarquia editorial vem do peso e do tamanho: manchetes e títulos de seção em 700, título de item em 600, linha fina, corpo e citação em 400. A estrutura tipográfica do jornal se preserva; a fonte é a da Unooria.',
        },
        {
          subject: 'Sem letter-spacing',
          detail:
            'a escala da Unooria não usa tracking. As variáveis -tracking valem 0px só para que nenhum componente invente um valor, nem negativo nas manchetes grandes nem positivo no kicker em caixa alta.',
        },
        {
          subject: 'Degraus e alturas de linha da Unooria',
          detail:
            'cada estilo copia o tamanho e a altura de linha de um degrau nomeado da escala da plataforma; o token --unooria-size-* de origem está no comentário de typography.css e na coluna "origem" abaixo.',
        },
        {
          subject: 'Estilos pareados no mesmo degrau, separados pelo peso e pelo papel',
          detail:
            'Title/Large e Quote dividem 24/34; Title/Medium e Deck dividem 20/30; Body/Medium e Label/Large dividem 16/24; Body/Small e Label dividem 14/20; Kicker e Caption dividem 12/18. O que os separa é o peso (700, 600 ou 400) e o papel editorial.',
        },
        {
          subject: 'Itálico só na citação',
          detail:
            'a classe .ujn-text--quote aplica font-style: italic; nenhum outro estilo usa itálico. O itálico é a pista visual de que o trecho é fala de terceiro.',
        },
        {
          subject: 'Caixa alta do kicker aplicada pelo componente',
          detail:
            'o token do Kicker define só tamanho, peso e altura de linha; a caixa alta é um text-transform: uppercase aplicado por quem renderiza o kicker (e pelas amostras desta página). O texto-fonte segue em caixa mista, o que preserva a leitura por leitor de tela.',
        },
        {
          subject: 'Medida de leitura própria',
          detail:
            'o corpo da matéria corre numa coluna de --ujn-reading-width (740px), de modo que as linhas de 18/28 não passem de cerca de 75 caracteres.',
        },
        {
          subject: 'Nenhum corpo abaixo de 12px',
          detail: 'Kicker e Caption, os menores degraus, valem 12/18; não há selo nem legenda menor.',
        },
        {
          subject: 'Fallback de sistema',
          detail:
            'a pilha é Open Sans e depois as famílias de sistema. A folha fonts/unoojornal.css é opt-in (AGENTS.md, 4.6), mas na prática obrigatória, porque os ícones são fonte de ligadura.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia de um estilo"
      description="Cada degrau publica quatro variáveis e uma classe utilitária."
    />
    <UjnDocAnatomy
      zones={[
        { name: 'Tamanho', role: 'Corpo da fonte em pixels.', token: '--ujn-font-<estilo>-size' },
        { name: 'Peso', role: '400, 600 ou 700 nos estilos da escala; o 500 existe tokenizado.', token: '--ujn-font-<estilo>-weight' },
        { name: 'Altura de linha', role: 'Em pixels absolutos, da escala da Unooria.', token: '--ujn-font-<estilo>-line' },
        { name: 'Tracking', role: 'Sempre 0px.', token: '--ujn-font-<estilo>-tracking' },
        { name: 'Classe utilitária', role: 'Aplica os quatro de uma vez, com .ujn-text (família, cor e margem 0).', token: '.ujn-text.ujn-text--<estilo>' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Escala completa"
      description="Cada amostra usa a classe utilitária real, com o texto que o jornal escreve naquele degrau."
    />
    <Scale />
    <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC.text }}>Escala trabalhando junta</h4>
    <UjnDocStage surface="page" align="flex-start" padding={24}>
      <ArticleSample />
    </UjnDocStage>
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Pesos</h4>
    <Weights />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Famílias</h4>
    <UjnDocPropsTable
      rows={[
        { name: '--ujn-font-sans', type: ujnFontFamily, description: 'Texto de toda a interface.' },
        { name: '--ujn-icon-font-family', type: ujnIconFontFamily, description: 'Glifos do Icon, por ligadura.' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Usar os estilos pelo nome (variáveis --ujn-font-* ou classe .ujn-text--*), nunca um tamanho solto.',
        'Hierarquizar pela escada do jornal: kicker, manchete, linha fina, autoria, corpo — separando-os por peso, tamanho e cor (text-primary contra text-secondary).',
        'Aplicar text-transform: uppercase ao kicker, e só a ele.',
        'Reservar o itálico à citação em destaque.',
        'Manter o corpo da matéria na coluna de --ujn-reading-width.',
        'Carregar fonts/unoojornal.css ou a Open Sans por next/font.',
      ]}
      donts={[
        'Inventar letter-spacing, nem para a caixa alta do kicker nem para as manchetes.',
        'Reintroduzir uma fonte com serifa: a família do módulo é uma só, a Open Sans.',
        'Usar corpo abaixo de 12px.',
        'Usar Masthead ou Headline/XL em texto corrido ou em mais de um título por tela.',
        'Usar itálico fora da citação, ou negrito no corpo para criar uma "manchete interna".',
        'Truncar a manchete sem expor o texto completo ao leitor de tela.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A escala não muda com o tema; só a cor do texto acompanha os tokens."
    />
    <UjnDocThemeSwitcher surface="card">
      {() => (
        <div style={{ display: 'grid', gap: 4, width: '100%' }}>
          <p className="ujn-text ujn-text--kicker ujn-text--accent" style={{ textTransform: 'uppercase' }}>
            {SAMPLES.kicker}
          </p>
          <p className="ujn-text ujn-text--headline">{SAMPLES.headline}</p>
          <p className="ujn-text ujn-text--deck ujn-text--secondary">{SAMPLES.deck}</p>
          <p className="ujn-text ujn-text--quote">{SAMPLES.quote}</p>
          <p className="ujn-text ujn-text--caption ujn-text--secondary">{SAMPLES.caption}</p>
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa da API de tipografia" />
    <UjnDocPropsTable
      title="Exportações de tokens/typography.ts"
      rows={[
        { name: 'ujnTypography', type: 'Record<UjnTypographyToken, UjnTypographyStyle>', description: 'A escala completa.' },
        { name: 'ujnTypographyOrder', type: 'UjnTypographyToken[]', description: 'Ordem canônica de exibição.' },
        { name: 'ujnFontFamily', type: 'string', description: 'Pilha da família de texto.' },
        { name: 'ujnIconFontFamily', type: 'string', description: 'Família da biblioteca de ícones.' },
        { name: 'ujnFontWeights', type: '{ regular: 400; medium: 500; semibold: 600; bold: 700 }', description: 'Pesos disponíveis.' },
        { name: 'UjnTypographyToken', type: ujnTypographyOrder.map((token) => `'${token}'`).join(' | '), description: 'Chaves da escala.' },
      ]}
    />
    <UjnDocPropsTable
      title="UjnTypographyStyle"
      rows={[
        { name: 'styleName', type: 'string', description: 'Nome do estilo (ex.: "Title/Large").' },
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
    <UjnDocPropsTable
      title="Uso de cada estilo"
      rows={ujnTypographyOrder.map((token) => ({
        name: ujnTypography[token].styleName,
        type: `${ujnTypography[token].fontSize}/${ujnTypography[token].lineHeight} · ${ujnTypography[token].fontWeight}`,
        default: ujnTypography[token].unooria,
        description: ujnTypography[token].usage,
      }))}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoojornal/Fundamentos/Tipografia',
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
    for (const token of ujnTypographyOrder) {
      const element = canvasElement.querySelector<HTMLElement>(`[data-ujn-type="${token}"]`);
      await expect(element).not.toBeNull();
      const computed = getComputedStyle(element!);
      const style = ujnTypography[token];
      await expect(computed.fontSize).toBe(`${style.fontSize}px`);
      await expect(computed.lineHeight).toBe(`${style.lineHeight}px`);
      await expect(computed.fontWeight).toBe(String(style.fontWeight));
      await expect(['0px', 'normal']).toContain(computed.letterSpacing);
    }
    // A citação é a única em itálico; o kicker, o único em caixa alta.
    await expect(
      getComputedStyle(canvasElement.querySelector<HTMLElement>('[data-ujn-type="quote"]')!).fontStyle
    ).toBe('italic');
    await expect(
      getComputedStyle(canvasElement.querySelector<HTMLElement>('[data-ujn-type="kicker"]')!).textTransform
    ).toBe('uppercase');
  },
};

/**
 * Uma matéria em miniatura: a escala trabalhando junta.
 */
export const Materia: Story = {
  name: 'Matéria em miniatura',
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24}>
      <ArticleSample />
    </UjnDocStage>
  ),
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
