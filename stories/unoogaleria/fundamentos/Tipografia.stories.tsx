import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import {
  uglFontFamily,
  uglFontWeights,
  uglIconFontFamily,
  uglTypography,
  uglTypographyOrder,
  type UglTheme,
  type UglTypographyToken,
} from '../../../src/unoogaleria/tokens';
import { Button } from '../../../src/unoogaleria/components/Button';
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
import { uglAlbums, uglDemoNow, uglMediaItems } from '../fixtures';
import { uglFormatCount, uglFormatDayLabel, uglFormatDuration, uglFormatTime } from '../../../src/unoogaleria/media';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const DOC = {
  text: 'var(--ugl-color-text-primary)',
  muted: 'var(--ugl-color-text-secondary)',
  accent: 'var(--ugl-color-text-accent)',
  border: 'var(--ugl-color-border-subtle)',
} as const;

const firstVideo = uglMediaItems.find((item) => item.type === 'video');
const firstAlbum = uglAlbums[0];

/**
 * Amostra de cada estilo, tirada do conteúdo de demonstração: o texto é o que o
 * produto de fato escreve naquele degrau.
 */
const SAMPLES: Record<UglTypographyToken, string> = {
  display: 'Biblioteca',
  heading: firstAlbum ? firstAlbum.title : 'Álbum',
  titleLarge: uglFormatDayLabel(uglMediaItems[0].takenAt, { now: uglDemoNow }),
  titleMedium: 'Excluídos recentemente',
  titleSmall: 'Tipos de mídia',
  label: 'Selecionar',
  bodyLarge: uglMediaItems[0].alt,
  bodyMedium: `${uglMediaItems[0].location ?? ''} · ${uglFormatTime(uglMediaItems[0].takenAt)}`,
  captionStrong: firstVideo?.duration ? uglFormatDuration(firstVideo.duration) : '0:00',
  caption: uglFormatCount(uglMediaItems),
};

/** Sufixo da variável CSS de cada estilo (`--ugl-font-<slug>-*`). */
const slugOf = (key: UglTypographyToken) =>
  uglTypography[key].cssVar.replace('--ugl-font-', '').replace(/-size$/, '');

/** Uma linha da escala: metadados à esquerda, a amostra real à direita. */
const ScaleRow: React.FC<{ token: UglTypographyToken }> = ({ token }) => {
  const style = uglTypography[token];
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
          --ugl-font-{slug}-*
          <br />.{style.className}
          <br />
          origem {style.unooria}
        </div>
      </div>
      <p
        className={`ugl-text ${style.className}`}
        data-ugl-type={token}
        style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {SAMPLES[token]}
      </p>
    </div>
  );
};

/** A escala inteira, na ordem canônica. */
const Scale: React.FC = () => (
  <div data-ugl-theme="light" style={{ marginBottom: 32 }}>
    {uglTypographyOrder.map((token) => (
      <ScaleRow key={token} token={token} />
    ))}
  </div>
);

/** Amostra compacta da escala num tema, sobre a superfície da tela. */
const ThemedScale: React.FC<{ theme: UglTheme }> = ({ theme }) => (
  <UglDocStage
    label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
    theme={theme}
    direction="column"
    align="flex-start"
    gap={4}
  >
    {uglTypographyOrder.map((token) => (
      <p
        key={token}
        className={`ugl-text ${uglTypography[token].className} ${
          token === 'caption' || token === 'bodyMedium' ? 'ugl-text--secondary' : ''
        } ${token === 'label' ? 'ugl-text--accent' : ''}`}
      >
        {SAMPLES[token]}
      </p>
    ))}
  </UglDocStage>
);

/** Os quatro pesos da família, com o mesmo texto. */
const Weights: React.FC = () => (
  <UglDocStage direction="column" align="flex-start" gap={8}>
    {(Object.entries(uglFontWeights) as [keyof typeof uglFontWeights, number][]).map(([name, weight]) => (
      <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={{ width: 150, fontFamily: MONO, fontSize: 11, color: DOC.muted }}>
          {name} · {weight}
        </span>
        <span
          style={{
            fontFamily: 'var(--ugl-font-sans)',
            fontSize: 'var(--ugl-font-title-md-size)',
            lineHeight: 'var(--ugl-font-title-md-line)',
            fontWeight: `var(--ugl-font-weight-${name})` as React.CSSProperties['fontWeight'],
            color: DOC.text,
          }}
        >
          {SAMPLES.titleMedium}
        </span>
      </div>
    ))}
  </UglDocStage>
);

/** Tamanhos distintos da escala. */
const sizes = Array.from(new Set(uglTypographyOrder.map((token) => uglTypography[token].fontSize)));

/**
 * Página de documentação rica da tipografia.
 */
const TipografiaDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Fundamentos • Tipografia"
      title="Tipografia"
      description={`${uglTypographyOrder.length} estilos de texto na família Open Sans da Plataforma Unooria, nos degraus de tamanho e altura de linha da escala da plataforma (de ${Math.max(...sizes)}px a ${Math.min(...sizes)}px), em quatro pesos e sem letter-spacing. Cada estilo tem variáveis CSS (--ugl-font-*-size|weight|line|tracking) e uma classe utilitária (.ugl-text--*).`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Cinco faixas com responsabilidades distintas na galeria."
    />
    <UglDocGrid>
      <UglDocCard icon="🅰️" title="Display e Heading">
        <code>Display</code> (34/48) é o título grande das telas — Biblioteca, Álbuns, Busca.{' '}
        <code>Heading</code> (24/34) é o título de álbum aberto e de memória sobre a capa.
      </UglDocCard>
      <UglDocCard icon="📰" title="Títulos">
        <code>Title/Large</code> (20/30) nomeia seções e grupos da grade; <code>Title/Medium</code>{' '}
        (18/28) a barra compacta, diálogos e o visualizador; <code>Title/Small</code> (16/24) linhas
        de lista e folhas.
      </UglDocCard>
      <UglDocCard icon="🏷️" title="Label">
        <code>Label</code> (14/20, 600) em botões, chips, segmentos e ações de texto como
        &quot;Selecionar&quot;.
      </UglDocCard>
      <UglDocCard icon="📄" title="Body e Caption">
        <code>Body/Large</code> (16/24) para campos e legendas; <code>Body/Medium</code> (14/20) para
        menus e metadados; <code>Caption</code> (12/18) para contagens, hora e duração. Nenhum corpo
        abaixo de 12px.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="../tokens"
      layout={`Escala de ${uglTypographyOrder.length} estilos`}
      specs={[
        { label: 'Família', value: 'Open Sans' },
        { label: 'Variável da família', value: '--ugl-font-sans' },
        { label: 'Família dos ícones', value: '--ugl-icon-font-family' },
        { label: 'Pesos', value: Object.values(uglFontWeights).join(' · ') },
        { label: 'Maior degrau', value: 'Display · 34/48' },
        { label: 'Menor degrau', value: 'Caption · 12/18' },
        { label: 'Tracking', value: '0px em todos os estilos' },
        { label: 'Origem dos degraus', value: '--unooria-size-*' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Degraus e alturas de linha da Unooria',
          detail:
            'cada estilo copia o tamanho e a altura de linha de um degrau nomeado da escala da plataforma; o token --unooria-size-* de origem está no comentário de typography.css e na coluna "origem" abaixo.',
        },
        {
          subject: 'Sem letter-spacing',
          detail:
            'a escala da Unooria não usa tracking. As variáveis -tracking valem 0px só para que nenhum componente invente um valor.',
        },
        {
          subject: 'Dois estilos por degrau, pelo peso',
          detail:
            'Title/Small e Body/Large dividem 16/24; Label e Body/Medium dividem 14/20; Caption/Strong e Caption dividem 12/18. O que os separa é o peso (600 contra 400), porque a hierarquia de uma linha de lista vem do peso, não do tamanho.',
        },
        {
          subject: 'Números tabulares onde há contagem',
          detail:
            'duração do vídeo, contador do visualizador e horário da barra de status aplicam font-variant-numeric: tabular-nums no componente, para que os dígitos não dancem enquanto mudam. Não é um token: é uma propriedade de quem mostra números vivos.',
        },
        {
          subject: 'Fallback de sistema',
          detail:
            'a pilha é Open Sans e depois as famílias de sistema. A folha fonts/unoogaleria.css é opt-in (seção 4.6), mas na prática obrigatória, porque os ícones são fonte de ligadura.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia de um estilo"
      description="Cada degrau publica quatro variáveis e uma classe utilitária."
    />
    <UglDocAnatomy
      zones={[
        { name: 'Tamanho', role: 'Corpo da fonte em pixels.', token: '--ugl-font-<estilo>-size' },
        { name: 'Peso', role: '400, 500, 600 ou 700.', token: '--ugl-font-<estilo>-weight' },
        { name: 'Altura de linha', role: 'Em pixels absolutos, da escala da Unooria.', token: '--ugl-font-<estilo>-line' },
        { name: 'Tracking', role: 'Sempre 0px.', token: '--ugl-font-<estilo>-tracking' },
        { name: 'Classe utilitária', role: 'Aplica os quatro de uma vez, com .ugl-text (família, cor e margem 0).', token: '.ugl-text.ugl-text--<estilo>' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Escala completa"
      description="Cada amostra usa a classe utilitária real, com o texto que o produto escreve naquele degrau."
    />
    <Scale />
    <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC.text }}>Pesos</h4>
    <Weights />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Famílias</h4>
    <UglDocPropsTable
      rows={[
        { name: '--ugl-font-sans', type: uglFontFamily, description: 'Texto de toda a interface.' },
        { name: '--ugl-icon-font-family', type: uglIconFontFamily, description: 'Glifos do Icon, por ligadura.' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Usar os estilos pelo nome (variáveis --ugl-font-* ou classe .ugl-text--*), nunca um tamanho solto.',
        'Separar título e metadado pelo peso e pela cor (text-primary contra text-secondary), como a escala prevê.',
        'Aplicar tabular-nums em números que mudam na tela (duração, contador, horário).',
        'Carregar fonts/unoogaleria.css ou a Open Sans por next/font.',
      ]}
      donts={[
        'Inventar letter-spacing, nem negativo nos títulos grandes.',
        'Usar corpo abaixo de 12px, nem em selo sobre miniatura.',
        'Usar Display em texto corrido ou em mais de um título por tela.',
        'Truncar o nome de um álbum sem expor o texto completo ao leitor de tela.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A escala não muda com o tema; só a cor do texto acompanha os tokens."
    />
    <UglDocThemeSwitcher>
      {() => (
        <div style={{ display: 'grid', gap: 4, width: '100%' }}>
          <p className="ugl-text ugl-text--display">{SAMPLES.display}</p>
          <p className="ugl-text ugl-text--title-lg">{SAMPLES.titleLarge}</p>
          <p className="ugl-text ugl-text--body-md ugl-text--secondary">{SAMPLES.bodyMedium}</p>
          <p className="ugl-text ugl-text--label ugl-text--accent">{SAMPLES.label}</p>
          <div>
            <Button variant="primary">{SAMPLES.label}</Button>
          </div>
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa da API de tipografia" />
    <UglDocPropsTable
      title="Exportações de tokens/typography.ts"
      rows={[
        { name: 'uglTypography', type: 'Record<UglTypographyToken, UglTypographyStyle>', description: 'A escala completa.' },
        { name: 'uglTypographyOrder', type: 'UglTypographyToken[]', description: 'Ordem canônica de exibição.' },
        { name: 'uglFontFamily', type: 'string', description: 'Pilha da família de texto.' },
        { name: 'uglIconFontFamily', type: 'string', description: 'Família da biblioteca de ícones.' },
        { name: 'uglFontWeights', type: '{ regular: 400; medium: 500; semibold: 600; bold: 700 }', description: 'Pesos disponíveis.' },
        { name: 'UglTypographyToken', type: uglTypographyOrder.map((token) => `'${token}'`).join(' | '), description: 'Chaves da escala.' },
      ]}
    />
    <UglDocPropsTable
      title="UglTypographyStyle"
      rows={[
        { name: 'styleName', type: 'string', description: 'Nome do estilo (ex.: "Title/Large").' },
        { name: 'unooria', type: 'string', description: 'Token da Unooria de onde o tamanho foi copiado.' },
        { name: 'fontSize', type: 'number', description: 'Tamanho em pixels.' },
        { name: 'fontWeight', type: 'number', description: 'Peso (400, 500, 600 ou 700).' },
        { name: 'lineHeight', type: 'number', description: 'Altura de linha em pixels.' },
        { name: 'letterSpacing', type: 'number', description: 'Sempre 0.' },
        { name: 'cssVar', type: 'string', description: 'Variável de tamanho; as demais trocam o sufixo.' },
        { name: 'className', type: 'string', description: 'Classe utilitária correspondente.' },
        { name: 'usage', type: 'string', description: 'Uso recomendado no produto.' },
      ]}
    />
    <UglDocPropsTable
      title="Uso de cada estilo"
      rows={uglTypographyOrder.map((token) => ({
        name: uglTypography[token].styleName,
        type: `${uglTypography[token].fontSize}/${uglTypography[token].lineHeight} · ${uglTypography[token].fontWeight}`,
        default: uglTypography[token].unooria,
        description: uglTypography[token].usage,
      }))}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoogaleria/Fundamentos/Tipografia',
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
    for (const token of uglTypographyOrder) {
      const element = canvasElement.querySelector<HTMLElement>(`[data-ugl-type="${token}"]`);
      await expect(element).not.toBeNull();
      const computed = getComputedStyle(element!);
      const style = uglTypography[token];
      await expect(computed.fontSize).toBe(`${style.fontSize}px`);
      await expect(computed.lineHeight).toBe(`${style.lineHeight}px`);
      await expect(computed.fontWeight).toBe(String(style.fontWeight));
      await expect(['0px', 'normal']).toContain(computed.letterSpacing);
    }
  },
};

/**
 * Os quatro pesos da família.
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
