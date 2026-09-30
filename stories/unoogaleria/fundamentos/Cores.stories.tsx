import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import {
  uglColorGroups,
  uglColorTokens,
  uglContrastPairs,
  uglGradients,
  uglInvariantColors,
  type UglColorKey,
  type UglContrastPair,
  type UglInvariantColorKey,
  type UglTheme,
} from '../../../src/unoogaleria/tokens';
import { Button } from '../../../src/unoogaleria/components/Button';
import { IconButton } from '../../../src/unoogaleria/components/IconButton';
import { Icon } from '../../../src/unoogaleria/components/Icon';
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
  UglDocTokenSwatch,
} from '../../../.storybook/components';
import { uglPhotos } from '../fixtures';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/**
 * Cores da própria moldura da documentação, resolvidas no tema claro (a página
 * de documentação é sempre clara; os palcos escolhem o tema).
 */
const DOC = {
  text: 'var(--ugl-color-text-primary)',
  muted: 'var(--ugl-color-text-secondary)',
  border: 'var(--ugl-color-border-subtle)',
  subtle: 'var(--ugl-color-background-secondary)',
  pass: 'var(--ugl-color-status-success)',
  fail: 'var(--ugl-color-text-danger)',
} as const;

type TokenEntry = [UglColorKey, (typeof uglColorTokens)[UglColorKey]];
type InvariantEntry = [UglInvariantColorKey, (typeof uglInvariantColors)[UglInvariantColorKey]];

const tokenEntries = Object.entries(uglColorTokens) as TokenEntry[];
const invariantEntries = Object.entries(uglInvariantColors) as InvariantEntry[];

/** Descrição de cada grupo de tokens, na ordem de `uglColorGroups`. */
const GROUP_NOTES: Record<(typeof uglColorGroups)[number], string> = {
  Superfícies:
    'Quatro camadas e a barra translúcida: a tela, o fundo das listas agrupadas, o bloco sutil (mídia ainda não carregada) e a camada elevada de folhas, menus e diálogos.',
  Texto:
    'Principal, apoio, espaço reservado, ação de texto e destrutivo, mais os dois rótulos que ficam sobre preenchimento (ação e perigo).',
  Ícones: 'Glifo ativo, glifo de apoio e o glifo de destaque da aba ativa e das linhas de álbum.',
  Bordas:
    'Divisor sutil, contorno de cartão e o contorno de campo e de controle — o único dos três que passa de 3:1.',
  Ações:
    'Preenchimento de ação nos três estados, destrutivo, preenchimento de campo, realces de hover e de pressionado e o anel de foco.',
  Marca: 'Coração de favorito, confirmação e o prazo curto da lixeira.',
  Overlays: 'Véu atrás de folhas e diálogos e o aviso passageiro em cores invertidas.',
  Elevação: 'A única sombra do módulo: definida por tema, aplicada só a camadas flutuantes.',
  Imersivo:
    'Visualizador e editor: fundo, barras, texto, acento, controles circulares e trilhas. Invariantes — a fotografia se vê sobre fundo escuro nos dois temas.',
  Mídia: 'Cápsula de duração, véu de seleção e texto sobre a miniatura. Invariantes.',
  Aparelho: 'Corpo, aro, botões laterais e lente do PhoneFrame. Invariantes.',
};

/** Rótulo de uma chave de token (ou de um composto `camada@fundo`). */
const pairLabel = (key: string): string =>
  key
    .split('@')
    .map((part) => {
      const token =
        (uglColorTokens as Record<string, { cssVar: string }>)[part] ??
        (uglInvariantColors as Record<string, { cssVar: string }>)[part];
      return token ? token.cssVar : part;
    })
    .join(' sobre ');

/** Menor razão medida por tipo de par e por tema. */
const lowestRatio = (kind: UglContrastPair['kind'], theme: UglTheme): number =>
  Math.min(...uglContrastPairs.filter((pair) => pair.kind === kind).map((pair) => pair[theme]));

/** Razão formatada em pt-BR ("4,88:1"). */
const ratio = (value: number) => `${value.toFixed(2).replace('.', ',')}:1`;

const cell: React.CSSProperties = {
  padding: '9px 12px',
  verticalAlign: 'top',
  borderTop: `1px solid ${DOC.border}`,
};

const headCell: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  color: DOC.text,
  backgroundColor: DOC.subtle,
};

/**
 * Tabela completa de contraste de `uglContrastPairs`: o par, o uso e a razão
 * medida nos dois temas. Cada linha declara se passa, em texto — não só pela cor.
 */
const ContrastTable: React.FC = () => (
  <div
    data-ugl-theme="light"
    style={{
      border: `1px solid ${DOC.border}`,
      borderRadius: 12,
      overflow: 'auto',
      marginBottom: 28,
    }}
  >
    <table
      aria-label="Contraste medido dos pares de uso real"
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 12.5,
        fontFamily: 'var(--ugl-font-sans)',
      }}
    >
      <thead>
        <tr>
          <th scope="col" style={headCell}>
            Par (frente sobre fundo)
          </th>
          <th scope="col" style={headCell}>
            Uso
          </th>
          <th scope="col" style={headCell}>
            Mínimo
          </th>
          <th scope="col" style={headCell}>
            Claro
          </th>
          <th scope="col" style={headCell}>
            Escuro
          </th>
          <th scope="col" style={headCell}>
            Resultado
          </th>
        </tr>
      </thead>
      <tbody>
        {uglContrastPairs.map((pair, index) => {
          const lightPasses = pair.light >= pair.minimum;
          const darkPasses = pair.dark >= pair.minimum;
          const passes = lightPasses && darkPasses;
          return (
            <tr key={`${pair.foreground}-${pair.background}-${index}`} data-ugl-contrast-row="">
              <td style={{ ...cell, fontFamily: MONO, fontSize: 11.5, color: DOC.text }}>
                {pairLabel(pair.foreground)} <span style={{ color: DOC.muted }}>sobre</span>{' '}
                {pairLabel(pair.background)}
              </td>
              <td style={{ ...cell, color: DOC.muted }}>{pair.usage}</td>
              <td style={{ ...cell, color: DOC.muted, fontFamily: MONO }}>
                {ratio(pair.minimum)} {pair.kind === 'text' ? '(texto)' : '(gráfico)'}
              </td>
              <td style={{ ...cell, fontFamily: MONO, color: lightPasses ? DOC.pass : DOC.fail }}>
                {ratio(pair.light)}
              </td>
              <td style={{ ...cell, fontFamily: MONO, color: darkPasses ? DOC.pass : DOC.fail }}>
                {ratio(pair.dark)}
              </td>
              <td
                data-ugl-contrast-result={passes ? 'passa' : 'reprova'}
                style={{ ...cell, fontWeight: 600, color: passes ? DOC.pass : DOC.fail }}
              >
                {passes ? 'Passa' : 'Reprova'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

/** Grade responsiva de amostras. */
const SwatchGrid: React.FC<{ children: React.ReactNode; min?: number }> = ({
  children,
  min = 200,
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`,
      gap: 14,
      marginBottom: 14,
    }}
  >
    {children}
  </div>
);

/**
 * Prévia da sombra de sobreposição: um bloco em cada tema, porque o valor do
 * token é uma sombra e não uma cor — a amostra bicolor não o representaria.
 */
const ElevationPreview: React.FC = () => (
  <div style={{ display: 'flex', width: '100%', height: '100%' }}>
    {(['light', 'dark'] as const).map((theme) => (
      <div
        key={theme}
        data-ugl-theme={theme}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--ugl-color-background-primary)',
        }}
      >
        <span
          style={{
            width: 44,
            height: 28,
            borderRadius: 'var(--ugl-radius-s)',
            background: 'var(--ugl-color-background-elevated)',
            boxShadow: 'var(--ugl-elevation-overlay)',
          }}
        />
      </div>
    ))}
  </div>
);

/** Amostras dos tokens de um grupo que varia com o tema. */
const ThemedGroup: React.FC<{ group: (typeof uglColorGroups)[number] }> = ({ group }) => {
  const entries = tokenEntries.filter(([, token]) => token.group === group);
  if (entries.length === 0) return null;
  return (
    <SwatchGrid>
      {entries.map(([key, token]) => (
        <UglDocTokenSwatch
          key={key}
          name={key}
          cssVar={token.cssVar}
          light={token.light.value}
          dark={token.dark.value}
          unooria={[token.light.unooria, token.dark.unooria]}
          preview={token.group === 'Elevação' ? <ElevationPreview /> : undefined}
        />
      ))}
    </SwatchGrid>
  );
};

/** Amostras dos tokens invariantes de um grupo. */
const InvariantGroup: React.FC<{ group: (typeof uglColorGroups)[number] }> = ({ group }) => {
  const entries = invariantEntries.filter(([, token]) => token.group === group);
  if (entries.length === 0) return null;
  return (
    <SwatchGrid>
      {entries.map(([key, token]) => (
        <UglDocTokenSwatch
          key={key}
          name={key}
          cssVar={token.cssVar}
          light={token.value}
          unooria={[token.unooria]}
        />
      ))}
    </SwatchGrid>
  );
};

/** Os dois gradientes compostos, sobre uma foto de demonstração. */
const GradientSamples: React.FC = () => (
  <SwatchGrid min={240}>
    {(Object.entries(uglGradients) as [keyof typeof uglGradients, (typeof uglGradients)[keyof typeof uglGradients]][]).map(
      ([key, gradient]) => (
        <figure
          key={key}
          style={{
            margin: 0,
            border: `1px solid ${DOC.border}`,
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', height: 140 }}>
            <img
              src={uglPhotos[3].src}
              alt={uglPhotos[3].alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, background: `var(${gradient.cssVar})` }}
            />
            <span
              style={{
                position: 'absolute',
                left: 12,
                [key === 'mediaTop' ? 'top' : 'bottom']: 10,
                color: 'var(--ugl-color-media-text)',
                fontFamily: 'var(--ugl-font-sans)',
                fontSize: 'var(--ugl-font-title-sm-size)',
                fontWeight: 'var(--ugl-font-title-sm-weight)' as React.CSSProperties['fontWeight'],
              }}
            >
              {key === 'mediaTop' ? 'Barra do visualizador' : 'Título da memória'}
            </span>
          </div>
          <figcaption style={{ padding: '10px 12px', fontFamily: 'var(--ugl-font-sans)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: DOC.text }}>{key}</div>
            <div style={{ fontSize: 11, color: DOC.muted, fontFamily: MONO }}>{gradient.cssVar}</div>
            <div style={{ fontSize: 12, color: DOC.muted, marginTop: 4 }}>{gradient.usage}</div>
          </figcaption>
        </figure>
      )
    )}
  </SwatchGrid>
);

/** Todos os grupos, variáveis e invariantes, na ordem de `uglColorGroups`. */
const AllGroups: React.FC = () => (
  <>
    {uglColorGroups.map((group) => (
      <section key={group} aria-label={group} style={{ marginBottom: 24 }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: 14, color: DOC.text }}>{group}</h4>
        <p style={{ margin: '0 0 12px 0', fontSize: 13, color: DOC.muted, lineHeight: 1.6 }}>
          {GROUP_NOTES[group]}
        </p>
        <ThemedGroup group={group} />
        <InvariantGroup group={group} />
      </section>
    ))}
  </>
);

/** Amostra de uso real em um tema, com componentes do módulo. */
const ThemeSample: React.FC = () => (
  <>
    <Button variant="primary" iconStart="addToAlbum">
      Adicionar ao álbum
    </Button>
    <Button variant="secondary">Selecionar</Button>
    <Button variant="tertiary">Ver tudo</Button>
    <Button variant="danger-tertiary" iconStart="delete">
      Excluir
    </Button>
    <IconButton icon="favoriteFilled" label="Favorito" pressed pressedTone="favorite" />
    <IconButton icon="share" label="Compartilhar" variant="tinted" />
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <Icon name="timer" size="sm" tone="inherit" style={{ color: 'var(--ugl-color-status-warning)' }} />
      <span
        style={{
          color: 'var(--ugl-color-status-warning)',
          fontFamily: 'var(--ugl-font-sans)',
          fontSize: 'var(--ugl-font-caption-strong-size)',
          fontWeight: 'var(--ugl-font-caption-strong-weight)' as React.CSSProperties['fontWeight'],
        }}
      >
        1 dia
      </span>
    </span>
  </>
);

/**
 * Página de documentação rica dos tokens de cor.
 */
const CoresDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Fundamentos • Cores"
      title="Cores"
      description={`Paleta da Unoogaleria em dois temas, claro e escuro, ambos sobre a escala roxa (brandpurple) da Plataforma Unooria. São ${tokenEntries.length} tokens que variam com o tema e ${invariantEntries.length} invariantes — a superfície imersiva do visualizador e do editor, a mídia e o aparelho do mockup. Cada valor é um literal copiado de um degrau nomeado da Unooria, com o token de origem registrado, e o contraste de ${uglContrastPairs.length} pares de uso real foi medido nos dois temas.`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Os componentes citam nomes semânticos; o tema decide qual degrau da Unooria cada nome resolve."
    />
    <UglDocGrid>
      <UglDocCard icon="🎨" title="Semânticos">
        Superfícies, texto, ícones, bordas, ações e marca (<code>--ugl-color-background-*</code>,{' '}
        <code>--ugl-color-text-*</code>, <code>--ugl-color-action-*</code> e afins). São a única
        camada que um componente cita.
      </UglDocCard>
      <UglDocCard icon="🌗" title="Dois temas">
        Claro: telas em branco e lavanda, acento em <code>brandpurple-600</code>. Escuro: roxo
        profundo, acento em <code>brandpurple-400</code>. O tema vem do atributo{' '}
        <code>data-ugl-theme</code> (padrão claro).
      </UglDocCard>
      <UglDocCard icon="🌌" title="Imersivo invariante">
        O visualizador e o editor ficam sempre em <code>--ugl-color-immersive-surface</code>:
        fotografia se avalia sobre fundo escuro, qualquer que seja o tema da biblioteca.
      </UglDocCard>
      <UglDocCard icon="🖼️" title="Sobre a mídia">
        <code>--ugl-color-media-*</code> cobre a cápsula de duração, o véu da miniatura selecionada
        e o texto branco sobre capas — medidos contra o pior caso, uma foto branca.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Origem, temas e método de medição."
    />
    <UglDocSpecs
      component="../tokens"
      layout={`Tokens de cor · ${tokenEntries.length} por tema + ${invariantEntries.length} invariantes`}
      specs={[
        { label: 'Origem', value: 'Plataforma Unooria' },
        { label: 'Escala de marca', value: 'brandpurple' },
        { label: 'Acento claro', value: `${uglColorTokens.actionPrimary.light.value} · 600` },
        { label: 'Acento escuro', value: `${uglColorTokens.actionPrimary.dark.value} · 400` },
        { label: 'Superfície imersiva', value: uglInvariantColors.immersiveSurface.value },
        { label: 'Atributo de tema', value: 'data-ugl-theme' },
        {
          label: 'Menor contraste de texto',
          value: `${ratio(lowestRatio('text', 'light'))} · ${ratio(lowestRatio('text', 'dark'))}`,
        },
        {
          label: 'Menor contraste gráfico',
          value: `${ratio(lowestRatio('graphic', 'light'))} · ${ratio(lowestRatio('graphic', 'dark'))}`,
        },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Sem tema por cálculo',
          detail:
            'o tema escuro não é o claro invertido, clareado ou com opacidade calculada: cada valor de cada tema é um degrau nomeado da Unooria, citado no comentário de cada linha de colors.css.',
        },
        {
          subject: 'Sem leitura em tempo de execução',
          detail:
            'o módulo copia os literais e nunca lê --unooria-*; scripts/verificar-paridade-unoogaleria.mjs reprova o build se um literal se afastar da origem.',
        },
        {
          subject: 'Superfície imersiva, mídia e aparelho invariantes',
          detail:
            'o fundo do visualizador (brandpurple-950), as barras translúcidas sobre a foto e o texto branco sobre a miniatura não mudam com o tema. Uma foto avaliada sobre fundo branco engana o olho; o produto de referência também escurece ao abrir a mídia.',
        },
        {
          subject: 'Pior caso da miniatura',
          detail:
            'a duração sobre a miniatura foi medida contra uma foto branca (mediaScrim@branco, 4,86:1): a cápsula brandpurple a 60% garante leitura sobre qualquer imagem.',
        },
        {
          subject: 'Acento do texto um degrau acima do acento gráfico',
          detail:
            'no claro, a ação de texto é brandpurple-700 (7,07:1) enquanto o preenchimento e o glifo de destaque são brandpurple-600 (4,88:1): o 600 serve a gráfico, mas o texto pequeno em "Selecionar" ganha folga no 700.',
        },
        {
          subject: 'Divisor abaixo de 3:1, de propósito',
          detail:
            'border-subtle e border-default são decorativos (separam linhas e cartões) e não delimitam controle. Todo limite de campo ou de controle usa border-control, que passa de 3:1 nos dois temas.',
        },
        {
          subject: 'Gradientes repetidos por tema',
          detail:
            'os véus --ugl-gradient-media-* usam var() e por isso são declarados em :root e em todo [data-ugl-theme]; só na raiz, congelariam o valor dentro de um contêiner com outro tema (a lição da seção 2.9).',
        },
        {
          subject: 'Sombra definida por tema',
          detail:
            'no escuro a sombra escura não se vê sobre roxo profundo, então --ugl-elevation-overlay vira o halo claro --unooria-elevation-neutral-2.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia"
      description="Onde cada família de tokens aparece numa tela da galeria, de baixo para cima."
    />
    <UglDocAnatomy
      zones={[
        {
          name: 'Tela',
          role: 'Fundo da biblioteca, dos álbuns e da busca; listas agrupadas ficam sobre o secundário.',
          token: '--ugl-color-background-primary · --ugl-color-background-secondary',
        },
        {
          name: 'Miniaturas',
          role: 'Bloco terciário enquanto a imagem carrega; cápsula de duração, véu e círculo de seleção por cima.',
          token: '--ugl-color-background-tertiary · --ugl-color-media-*',
        },
        {
          name: 'Barras translúcidas',
          role: 'Barra superior, abas e barra de seleção sobre a grade, com desfoque.',
          token: '--ugl-color-surface-bar',
        },
        {
          name: 'Ações',
          role: 'Botão primário, aba ativa, círculo de seleção marcado e anel de foco.',
          token: '--ugl-color-action-primary · --ugl-color-focus-ring',
        },
        {
          name: 'Camadas flutuantes',
          role: 'Folhas, menus e diálogos sobre o véu; o aviso passageiro em cores invertidas.',
          token: '--ugl-color-background-elevated · --ugl-color-overlay-scrim · --ugl-color-toast-*',
        },
        {
          name: 'Visualizador e editor',
          role: 'Superfície imersiva invariante com barras, controles e acento próprios.',
          token: '--ugl-color-immersive-*',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de tokens"
      description="Todos os tokens por grupo. Nos que variam, a amostra é metade claro, metade escuro; nos invariantes, uma cor só. Clique para copiar a variável."
    />
    <AllGroups />
    <h4 style={{ margin: '8px 0 12px 0', fontSize: 14, color: DOC.text }}>Gradientes compostos</h4>
    <GradientSamples />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Contraste medido"
      description={`${uglContrastPairs.length} pares de uso real (razão WCAG 2.x; camadas translúcidas compostas sobre o fundo indicado). Texto exige 4,5:1 e gráfico — glifo, contorno, foco, controle — exige 3:1.`}
    />
    <UglDocGrid min={220}>
      <UglDocCard icon="🔤" title="Texto">
        Menor razão: <strong>{ratio(lowestRatio('text', 'light'))}</strong> no claro e{' '}
        <strong>{ratio(lowestRatio('text', 'dark'))}</strong> no escuro.
      </UglDocCard>
      <UglDocCard icon="⭕" title="Gráfico">
        Menor razão: <strong>{ratio(lowestRatio('graphic', 'light'))}</strong> no claro e{' '}
        <strong>{ratio(lowestRatio('graphic', 'dark'))}</strong> no escuro.
      </UglDocCard>
      <UglDocCard icon="🚫" title="Fora da tabela">
        Divisores decorativos (<code>border-subtle</code>, <code>border-default</code>) e a ação
        desabilitada, isenta pela WCAG 1.4.3.
      </UglDocCard>
    </UglDocGrid>
    <ContrastTable />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UglDocPractices
      dos={[
        'Consumir só tokens semânticos --ugl-color-* nos componentes: eles já resolvem os dois temas.',
        'Usar --ugl-color-border-control no contorno de campo e de controle, e --ugl-color-focus-ring no anel de 2px.',
        'Usar os tokens imersivos (--ugl-color-immersive-*) em tudo o que fica dentro do visualizador e do editor, nos dois temas.',
        'Usar --ugl-color-media-* para texto e cápsulas sobre miniatura, porque a foto pode ser branca.',
        'Trocar o tema pelo atributo data-ugl-theme no contêiner mais externo, deixando os componentes herdarem.',
      ]}
      donts={[
        'Derivar um tema por cálculo (inverter, clarear, color-mix, opacidade calculada).',
        'Usar var(--unooria-*) ou variáveis de outra marca dentro da Unoogaleria.',
        'Escrever hexadecimal ou rgba() avulso em CSS de componente.',
        'Usar border-subtle como limite de campo: ele não passa de 3:1.',
        'Pintar o visualizador com --ugl-color-background-primary: a foto mudaria de leitura com o tema.',
        'Comunicar estado só pela cor: acompanhe de rótulo, glifo ou forma.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Componentes reais resolvendo as mesmas variáveis nos dois temas."
    />
    <UglDocThemeSwitcher>{() => <ThemeSample />}</UglDocThemeSwitcher>
    <UglDocStage label="Superfície imersiva (invariante)" surface="immersive" theme="light">
      <Button variant="immersive" iconStart="edit">
        Editar
      </Button>
      <IconButton icon="share" label="Compartilhar" variant="bar" />
      <IconButton icon="favoriteFilled" label="Favorito" variant="bar" pressed pressedTone="favorite" />
      <IconButton icon="delete" label="Excluir" variant="immersive" />
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="8. Referência completa da API de cores"
      description="Exportações de src/unoogaleria/tokens/colors.ts."
    />
    <UglDocPropsTable
      title="Exportações"
      rows={[
        { name: 'uglColorTokens', type: 'Record<UglColorKey, UglColorToken>', description: 'Tokens que variam com o tema, com valor e origem em cada um.' },
        { name: 'uglInvariantColors', type: 'Record<UglInvariantColorKey, UglInvariantColorToken>', description: 'Tokens invariantes: imersivo, mídia e aparelho.' },
        { name: 'uglColorGroups', type: 'readonly string[]', description: 'Ordem dos grupos na documentação.' },
        { name: 'uglColorThemes', type: 'Record<UglTheme, Record<UglColorKey, string>>', description: 'Valores resolvidos de cada tema, por chave.' },
        { name: 'uglColorCssVars', type: 'Record<UglColorKey | UglInvariantColorKey, string>', description: 'Referências var(--ugl-…) prontas para estilo inline.' },
        { name: 'uglGradients', type: 'Record<"mediaTop" | "mediaBottom", { cssVar; usage }>', description: 'Os dois véus compostos sobre a mídia.' },
        { name: 'uglContrastPairs', type: 'readonly UglContrastPair[]', description: 'Pares de uso real com a razão medida em cada tema.' },
        { name: 'UglTheme', type: "'light' | 'dark'", description: 'Temas do módulo.' },
      ]}
    />
    <UglDocPropsTable
      title="UglContrastPair"
      rows={[
        { name: 'foreground', type: 'string', description: 'Chave do token de frente.' },
        { name: 'background', type: 'string', description: 'Chave do fundo; "a@b" é a camada a composta sobre b.' },
        { name: 'kind', type: "'text' | 'graphic'", description: "'text' exige 4,5:1; 'graphic', 3:1 (WCAG 1.4.3 e 1.4.11)." },
        { name: 'minimum', type: 'number', description: 'Razão mínima do tipo.' },
        { name: 'light', type: 'number', description: 'Razão medida no tema claro.' },
        { name: 'dark', type: 'number', description: 'Razão medida no tema escuro.' },
        { name: 'usage', type: 'string', description: 'Onde o par aparece no produto.' },
      ]}
    />
    <UglDocPropsTable
      title="UglColorToken e UglInvariantColorToken"
      rows={[
        { name: 'cssVar', type: 'string', description: 'Nome da variável CSS.' },
        { name: 'group', type: 'string', description: 'Grupo de exibição.' },
        { name: 'usage', type: 'string', description: 'Onde o token é aplicado.' },
        { name: 'light / dark', type: 'UglColorValue', description: 'Só em UglColorToken: { value, unooria } de cada tema.' },
        { name: 'value / unooria', type: 'string', description: 'Só em UglInvariantColorToken: literal e token de origem.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoogaleria/Fundamentos/Cores',
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa dos tokens de cor.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CoresDocumentationPage />,
};

/**
 * Todos os tokens, variáveis e invariantes, por grupo.
 */
export const TodasVariantes: Story = {
  name: '🎨 Todos os tokens por grupo',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Todos os tokens por grupo" />
      <AllGroups />
    </UnooriaDocShell>
  ),
};

/**
 * Os dois véus compostos sobre a mídia.
 */
export const Gradientes: Story = {
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Gradientes compostos" />
      <GradientSamples />
    </UnooriaDocShell>
  ),
};

/**
 * Tabela completa de contraste. O `play` confere que a tabela tem todos os
 * pares e que nenhum reprova.
 */
export const ContrasteMedido: Story = {
  name: '🔍 Contraste medido',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Contraste medido" />
      <ContrastTable />
    </UnooriaDocShell>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole('table', { name: 'Contraste medido dos pares de uso real' });
    const rows = within(table).getAllByRole('row');
    // Uma linha de cabeçalho mais uma por par.
    await expect(rows).toHaveLength(uglContrastPairs.length + 1);
    await expect(canvasElement.querySelectorAll('[data-ugl-contrast-result="reprova"]')).toHaveLength(0);
  },
};

/**
 * Os mesmos componentes nos dois temas, lado a lado.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UglDocStage
          key={theme}
          label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={theme}
          gap={12}
        >
          <ThemeSample />
        </UglDocStage>
      ))}
    </div>
  ),
};
