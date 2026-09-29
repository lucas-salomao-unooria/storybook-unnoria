import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  uaiColorGroups,
  uaiColorTokens,
  uaiContrastPairs,
  uaiInvariantColors,
  type UaiInvariantColorToken,
  uaiLightColors,
  uaiDarkColors,
  uaiOverlays,
  uaiSemanticCssVars,
  uaiSemanticOrigins,
  uaiTranslucentScale,
  type UaiColorKey,
  type UaiContrastPair,
  type UaiSemanticColors,
  type UaiTheme,
} from '../../../src/unooriaai/tokens/colors';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocCard,
  UaiDocDecisions,
  UaiDocGrid,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocSpecs,
  UaiDocStage,
  UaiDocThemeSwitcher,
  UaiDocTokenSwatch,
} from '../../../.storybook/components';
import { Badge, Button, ChatBubble, Icon, Tag } from '../../../src/unooriaai/components';

const BAR = '#716C98';

const DOC_TEXT = '#22272A';
const DOC_MUTED = '#475157';
const DOC_BORDER = '#E4E8E9';
const DOC_SUBTLE = '#F5F5F5';
const DOC_SUCCESS = '#006746';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** Agrupamento semântico dos tokens para exibição em documentação. */
const GRUPOS_SEMANTICOS: {
  title: string;
  description: string;
  keys: (keyof UaiSemanticColors)[];
}[] = [
  {
    title: 'Superfícies',
    description:
      'Hierarquia de profundidade das telas: área de conversa, barra lateral, blocos sutis, superfície invertida dos botões sólidos (com o hover) e superfície de marca.',
    keys: ['bgPrimary', 'bgSecondary', 'bgTertiary', 'bgInverse', 'bgInverseHover', 'bgBrand'],
  },
  {
    title: 'Texto',
    description:
      'Três níveis de contraste, o texto sobre superfície invertida, o texto de marca e o link.',
    keys: ['textPrimary', 'textSecondary', 'textTertiary', 'textInverse', 'textBrand', 'textLink'],
  },
  {
    title: 'Bordas',
    description:
      'Contorno decorativo, o contorno de alto contraste, o contorno de campo e de controle e o anel de foco.',
    keys: ['borderDefault', 'borderStrong', 'borderControl', 'borderBrand'],
  },
  {
    title: 'Ações',
    description: 'Ação primária, seu estado de hover e a ação secundária em azul da marca.',
    keys: ['interactivePrimary', 'interactiveHover', 'interactiveSecondary'],
  },
  {
    title: 'Estados',
    description:
      'Sucesso, erro (com o hover da ação destrutiva), atenção e informação — as severidades do módulo.',
    keys: ['statusSuccess', 'statusError', 'statusErrorHover', 'statusWarning', 'statusInfo'],
  },
];

/** Menor razão medida por tipo de par e por tema, calculada da tabela real. */
const menorRazao = (kind: UaiContrastPair['kind'], theme: UaiTheme): number =>
  Math.min(...uaiContrastPairs.filter((par) => par.kind === kind).map((par) => par[theme]));

/** Rótulo legível de uma chave de token de cor (ou de um composto `frente@fundo`). */
const rotuloDoPar = (chave: string): string =>
  chave
    .split('@')
    .map((parte) => {
      const token =
        uaiColorTokens[parte as UaiColorKey] ??
        (uaiInvariantColors as Record<string, { cssVar: string }>)[parte];
      return token ? token.cssVar : parte;
    })
    .join(' sobre ');

const celula: React.CSSProperties = {
  padding: '9px 12px',
  verticalAlign: 'top',
  borderTop: `1px solid ${DOC_BORDER}`,
};

const cabecalho: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  color: DOC_TEXT,
  backgroundColor: DOC_SUBTLE,
};

/** Tabela de contraste medido, com o par, o uso e a razão nos dois temas. */
const TabelaDeContraste: React.FC<{ pares: readonly UaiContrastPair[] }> = ({ pares }) => (
  <div
    style={{
      border: `1px solid ${DOC_BORDER}`,
      borderRadius: 12,
      overflow: 'auto',
      marginBottom: 28,
    }}
  >
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
      <thead>
        <tr>
          <th style={cabecalho}>Par (frente sobre fundo)</th>
          <th style={cabecalho}>Uso</th>
          <th style={cabecalho}>Mínimo</th>
          <th style={cabecalho}>Claro</th>
          <th style={cabecalho}>Escuro</th>
        </tr>
      </thead>
      <tbody>
        {pares.map((par, indice) => {
          const passa = par.light >= par.minimum && par.dark >= par.minimum;
          return (
            <tr key={`${par.foreground}-${par.background}-${par.usage}-${indice}`}>
              <td style={{ ...celula, fontFamily: MONO, fontSize: 11.5, color: DOC_TEXT }}>
                {rotuloDoPar(par.foreground)} <span style={{ color: DOC_MUTED }}>sobre</span>{' '}
                {rotuloDoPar(par.background)}
              </td>
              <td style={{ ...celula, color: DOC_MUTED }}>{par.usage}</td>
              <td style={{ ...celula, color: DOC_MUTED, fontFamily: MONO }}>
                {par.minimum.toString().replace('.', ',')}:1{' '}
                {par.kind === 'text' ? '(texto)' : '(gráfico)'}
              </td>
              <td style={{ ...celula, fontFamily: MONO, color: passa ? DOC_SUCCESS : '#C11414' }}>
                {par.light.toFixed(2).replace('.', ',')}:1
              </td>
              <td style={{ ...celula, fontFamily: MONO, color: passa ? DOC_SUCCESS : '#C11414' }}>
                {par.dark.toFixed(2).replace('.', ',')}:1
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

/** Grade de amostras de um conjunto de tokens. */
const GradeDeAmostras: React.FC<{ children: React.ReactNode; min?: number }> = ({
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
 * Página de documentação rica dos tokens de cor.
 */
const CoresDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Fundamentos • Cores"
      title="Cores"
      description={`Paleta do UnooriaAI em dois temas, claro e escuro, ambos sobre a escala roxa da Plataforma Unooria. São ${Object.keys(uaiColorTokens).length} tokens que variam com o tema e ${Object.keys(uaiInvariantColors).length} invariantes; cada valor é um degrau nomeado da Unooria, com o token de origem registrado, e o contraste de todo par de uso real foi medido nos dois temas.`}
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Os componentes consomem nomes semânticos; o tema decide qual degrau da Unooria cada nome resolve."
      barColor={BAR}
    />
    <UaiDocGrid>
      <UaiDocCard icon="🎨" title="Semânticos">
        Superfícies, texto, bordas, ações e estados (<code>--uai-bg-*</code>,{' '}
        <code>--uai-text-*</code>, <code>--uai-border-*</code>, <code>--uai-interactive-*</code> e{' '}
        <code>--uai-status-*</code>). São a única camada que um componente cita.
      </UaiDocCard>
      <UaiDocCard icon="🌗" title="Dois temas">
        O tema claro usa superfícies em branco e lavanda com acento no degrau 600 do roxo; o escuro
        usa roxo profundo com acento no degrau 400. O tema é escolhido pelo atributo{' '}
        <code>data-uai-theme</code> (padrão claro), sem <code>prefers-color-scheme</code>.
      </UaiDocCard>
      <UaiDocCard icon="📉" title="Escadas translúcidas">
        <code>--uai-fill-*</code> (superfícies) e <code>--uai-text-soft-*</code> (hierarquia de
        texto) sustentam hover, item ativo, contornos suaves e níveis de ênfase, com degraus
        nomeados em cada tema.
      </UaiDocCard>
      <UaiDocCard icon="🖥️" title="Superfícies do cliente web">
        <code>--uai-web-*</code> cobre a área de conversa, o cartão de sugestão, o compositor, o
        véu, o fio da barra lateral e o botão de nova conversa.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações Técnicas"
      description="Origem, temas e método de medição dos tokens de cor."
      barColor={BAR}
    />
    <UaiDocSpecs
      component="../tokens"
      layout="Tokens de cor · 2 temas"
      specs={[
        { label: 'Origem', value: 'Plataforma Unooria' },
        { label: 'Escala de marca', value: 'brandpurple' },
        { label: 'Acento claro', value: '#716C98 · brandpurple-600' },
        { label: 'Acento escuro', value: '#AAA5C2 · brandpurple-400' },
        { label: 'Superfície escura', value: '#0E1039 · brandpurple-900' },
        { label: 'Atributo de tema', value: 'data-uai-theme' },
        {
          label: 'Menor contraste de texto',
          value: `${menorRazao('text', 'light').toFixed(2)} · ${menorRazao('text', 'dark').toFixed(2)}`,
        },
        {
          label: 'Menor contraste gráfico',
          value: `${menorRazao('graphic', 'light').toFixed(2)} · ${menorRazao('graphic', 'dark').toFixed(2)}`,
        },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Sem tema por cálculo',
          detail:
            'O tema escuro não é o claro invertido, clareado ou com opacidade calculada: cada valor de cada tema é um degrau nomeado da Unooria, e o token de origem está no comentário de cada linha de colors.css.',
        },
        {
          subject: 'Sem leitura em tempo de execução',
          detail:
            'O módulo copia os literais e nunca lê --unooria-* em tempo de execução; scripts/verificar-paridade-unooriaai.mjs reprova o build se um literal se afastar da origem.',
        },
        {
          subject: 'Cor por contraste, não por analogia',
          detail:
            'Onde um degrau translúcido não tem par exato, o token usa o degrau nomeado mais próximo que passa o contraste (texto ≥ 4,5:1; gráfico ≥ 3:1). O contorno de campo e de controle usa --uai-border-control, e o anel de foco, --uai-border-brand.',
        },
        {
          subject: 'Superfície escura elevada',
          detail:
            'No tema escuro a tela é brandpurple-900 e a barra lateral, brandpurple-950; o tertiary é brandpurple-800. Um degrau mais claro derrubaria o acento abaixo de 3:1.',
        },
        {
          subject: 'Tokens compostos por tema',
          detail:
            'Tokens que combinam var() (fios de 1px) são declarados em todo [data-uai-theme], nunca só em :root; declarados só na raiz, congelariam os valores do tema claro dentro de um contêiner escuro.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia dos Tokens Semânticos"
      description="Cada cartão mostra o valor nos dois temas (metade clara, metade escura), a variável CSS e o degrau de origem na Unooria. Clique para copiar."
      barColor={BAR}
    />
    {GRUPOS_SEMANTICOS.map((grupo) => (
      <div key={grupo.title} style={{ marginBottom: 28 }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: 14, color: DOC_TEXT }}>{grupo.title}</h4>
        <p style={{ margin: '0 0 12px 0', fontSize: 13, color: DOC_MUTED, lineHeight: 1.6 }}>
          {grupo.description}
        </p>
        <GradeDeAmostras>
          {grupo.keys.map((key) => (
            <UaiDocTokenSwatch
              key={key}
              name={key}
              cssVar={uaiSemanticCssVars[key]}
              light={uaiLightColors[key]}
              dark={uaiDarkColors[key]}
              unooria={[uaiSemanticOrigins[key].light, uaiSemanticOrigins[key].dark]}
            />
          ))}
        </GradeDeAmostras>
      </div>
    ))}

    <UnooriaDocSectionHeader
      title="4. Matriz de Tokens"
      description="Todos os tokens que variam com o tema, por grupo, mais os invariantes. Cada amostra é metade claro, metade escuro."
      barColor={BAR}
    />
    {uaiColorGroups.map((grupo) => (
      <div key={grupo} style={{ marginBottom: 20 }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC_TEXT }}>{grupo}</h4>
        <GradeDeAmostras>
          {Object.entries(uaiColorTokens)
            .filter(([, token]) => token.group === grupo)
            .map(([key, token]) => (
              <UaiDocTokenSwatch
                key={key}
                name={key}
                cssVar={token.cssVar}
                light={token.light.value}
                dark={token.dark.value}
                unooria={[token.light.unooria, token.dark.unooria]}
                checkerboard={/rgba/.test(token.light.value) || /rgba/.test(token.dark.value)}
              />
            ))}
        </GradeDeAmostras>
      </div>
    ))}
    {Object.keys(uaiInvariantColors).length > 0 && (
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC_TEXT }}>
          Invariantes entre temas
        </h4>
        <GradeDeAmostras>
          {Object.entries(uaiInvariantColors as Record<string, UaiInvariantColorToken>).map(([key, token]) => (
            <UaiDocTokenSwatch
              key={key}
              name={key}
              cssVar={token.cssVar}
              value={token.value}
              unooria={[token.unooria]}
            />
          ))}
        </GradeDeAmostras>
      </div>
    )}

    <UnooriaDocSectionHeader
      title="5. Contraste Medido"
      description={`${uaiContrastPairs.length} pares de uso real, medidos nos dois temas (razão WCAG 2.x; preenchimentos translúcidos compostos sobre a superfície). Texto exige 4,5:1 e gráfico (contorno, foco, controle) exige 3:1.`}
      barColor={BAR}
    />
    <UaiDocGrid min={220}>
      <UaiDocCard icon="🔤" title="Texto">
        Menor razão: <strong>{menorRazao('text', 'light').toFixed(2).replace('.', ',')}:1</strong> no
        tema claro e <strong>{menorRazao('text', 'dark').toFixed(2).replace('.', ',')}:1</strong> no
        escuro. Nenhum par abaixo de 4,5:1.
      </UaiDocCard>
      <UaiDocCard icon="⭕" title="Gráfico">
        Menor razão:{' '}
        <strong>{menorRazao('graphic', 'light').toFixed(2).replace('.', ',')}:1</strong> no claro e{' '}
        <strong>{menorRazao('graphic', 'dark').toFixed(2).replace('.', ',')}:1</strong> no escuro.
        Nenhum par abaixo de 3:1.
      </UaiDocCard>
      <UaiDocCard icon="🚫" title="Isenção">
        O texto de campo desabilitado (<code>--uai-text-soft-30</code>) é isento pela WCAG 1.4.3 e
        por isso não entra na tabela.
      </UaiDocCard>
    </UaiDocGrid>
    <TabelaDeContraste pares={uaiContrastPairs} />

    <UnooriaDocSectionHeader
      title="6. Boas Práticas"
      description="Regras de consumo das cores do módulo."
      barColor={BAR}
    />
    <UaiDocPractices
      dos={[
        'Consumir sempre os tokens semânticos (--uai-bg-*, --uai-text-*, --uai-border-*) nos componentes: eles já resolvem os dois temas.',
        'Usar a escada --uai-fill-* para superfícies translúcidas e --uai-text-soft-* para hierarquia de texto.',
        'Usar --uai-border-control no contorno de campo e de controle e --uai-border-brand no anel de foco: os dois passam de 3:1.',
        'Trocar o tema pelo atributo data-uai-theme no contêiner mais externo possível, deixando os componentes herdarem.',
      ]}
      donts={[
        'Derivar um tema por cálculo (inverter, clarear, aplicar opacidade): cada valor precisa ser um degrau nomeado da Unooria.',
        'Usar var(--unooria-*) ou variáveis de outra marca dentro do UnooriaAI: o módulo copia os literais.',
        'Escrever hexadecimais avulsos em CSS ou em estilo inline de componente de produção.',
        'Comunicar estado só pela cor: acompanhe sempre de rótulo, ícone ou forma.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="7. Suporte a Temas"
      description="Componentes reais resolvendo as mesmas variáveis nos dois temas."
      barColor={BAR}
    />
    <UaiDocThemeSwitcher>
      {() => (
        <>
          <Button variant="primary">Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="outline">Contorno</Button>
          <Tag glyph={<Icon name="sparkle" size={16} />}>Gerar ideias</Tag>
          <Badge variant="primary">Selo</Badge>
          <ChatBubble role="user">Olá, como você pode me ajudar?</ChatBubble>
        </>
      )}
    </UaiDocThemeSwitcher>

    <UaiDocStage label="Véu de sobreposição (sobre xadrez, para mostrar a transparência)">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 14,
          width: '100%',
        }}
      >
        {(Object.keys(uaiOverlays) as (keyof typeof uaiOverlays)[]).map((key) => (
          <UaiDocTokenSwatch
            key={key}
            name={key}
            cssVar={`--uai-overlay-${key}`}
            value={uaiOverlays[key]}
            checkerboard
          />
        ))}
      </div>
    </UaiDocStage>

    <UnooriaDocSectionHeader
      title="8. Referência Completa da Escada Translúcida"
      description="Onde cada degrau é aplicado, o valor em cada tema e o token de origem na Unooria."
      barColor={BAR}
    />
    <UaiDocPropsTable
      title="Superfícies e textos translúcidos"
      rows={uaiTranslucentScale.map((item) => ({
        name: item.cssVar,
        type: `claro ${item.light} · escuro ${item.dark}`,
        default: item.unooria.join(' · '),
        description: item.usage,
      }))}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'UnooriaAI/Fundamentos/Cores',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tokens de cor do UnooriaAI, com identidade da Plataforma Unooria: paleta roxa em tema claro e escuro, contraste medido nos dois temas.',
      },
    },
  },
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
 * Grade de todos os tokens de cor, com os dois temas lado a lado em cada amostra.
 */
export const TodosOsTokens: Story = {
  name: '🎨 Todos os Tokens',
  render: () => (
    <GradeDeAmostras>
      {Object.entries(uaiColorTokens).map(([key, token]) => (
        <UaiDocTokenSwatch
          key={key}
          name={key}
          cssVar={token.cssVar}
          light={token.light.value}
          dark={token.dark.value}
          unooria={[token.light.unooria, token.dark.unooria]}
        />
      ))}
    </GradeDeAmostras>
  ),
};

/**
 * Comparação direta entre os dois temas, com os tokens semânticos resolvidos.
 */
export const ComparativoDeTemas: Story = {
  name: '🌗 Comparativo Claro × Escuro',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 24,
      }}
    >
      {(['light', 'dark'] as const).map((tema) => (
        <div
          key={tema}
          data-uai-theme={tema}
          style={{
            padding: 24,
            borderRadius: 12,
            border: '1px solid var(--uai-border-default)',
            backgroundColor: 'var(--uai-bg-primary)',
          }}
        >
          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: 14,
              color: 'var(--uai-text-primary)',
              fontFamily: 'var(--uai-font-sans)',
            }}
          >
            {tema === 'dark' ? 'Tema escuro' : 'Tema claro'}
          </h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {(Object.keys(uaiLightColors) as (keyof UaiSemanticColors)[]).map((key) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    width: 28,
                    height: 20,
                    borderRadius: 4,
                    border: '1px solid var(--uai-border-control)',
                    background: `var(${uaiSemanticCssVars[key]})`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    color: 'var(--uai-text-secondary)',
                    fontFamily: MONO,
                  }}
                >
                  {uaiSemanticCssVars[key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Tabela completa de contraste medido nos dois temas.
 */
export const ContrasteMedido: Story = {
  name: '🔍 Contraste Medido',
  render: () => <TabelaDeContraste pares={uaiContrastPairs} />,
};
