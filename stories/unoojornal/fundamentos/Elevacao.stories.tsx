import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import {
  ujnColorTokens,
  ujnGradients,
  ujnInvariantColors,
  ujnLayout,
  ujnRule,
  type UjnTheme,
} from '../../../src/unoojornal/tokens';
import { Icon } from '../../../src/unoojornal/components/Icon';
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
} as const;

const THEME_LABEL: Record<UjnTheme, string> = { light: 'Tema claro', dark: 'Tema escuro' };

/** Os dois fios de 1px, como declarados em `spacing.css`. */
const HAIRLINES = {
  bottom: '0 1px 0 0 var(--ujn-color-border-subtle)',
  top: '0 -1px 0 0 var(--ujn-color-border-subtle)',
} as const;

/** Definição literal dos dois gradientes, como declarados em `colors.css`. */
const GRADIENT_VALUES = {
  mediaBottom: 'linear-gradient(180deg, transparent 40%, var(--ujn-color-media-scrim) 100%)',
  ruleDouble:
    'linear-gradient(180deg, var(--ujn-color-border-rule) 0 3px, transparent 3px 5px, var(--ujn-color-border-rule) 5px 6px)',
} as const;

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--ujn-font-sans)',
  fontSize: 'var(--ujn-font-label-size)',
  lineHeight: 'var(--ujn-font-label-line)',
  fontWeight: 'var(--ujn-font-label-weight)' as React.CSSProperties['fontWeight'],
  color: 'var(--ujn-color-text-primary)',
};

/**
 * Menu flutuante com a sombra de sobreposição, sobre a superfície do cartão, em
 * um tema. É o que uma folha, um menu ou um diálogo recebem.
 */
const OverlaySample: React.FC<{ theme: UjnTheme }> = ({ theme }) => (
  <UjnDocStage label={THEME_LABEL[theme]} theme={theme} surface="card" padding={32}>
    <div
      data-ujn-overlay-sample={theme}
      style={{
        width: 240,
        padding: 'var(--ujn-spacing-l)',
        borderRadius: 'var(--ujn-radius-m)',
        background: 'var(--ujn-color-background-elevated)',
        boxShadow: 'var(--ujn-elevation-overlay)',
        display: 'grid',
        gap: 'var(--ujn-spacing-xs)',
      }}
    >
      <span style={labelStyle}>Compartilhar a matéria</span>
      {(['share', 'link', 'print'] as const).map((icon) => (
        <span key={icon} style={{ display: 'flex', alignItems: 'center', gap: 10, ...labelStyle, fontWeight: 400 }}>
          <Icon name={icon} size="sm" tone="secondary" />
          {icon === 'share' ? 'Enviar a um colega' : icon === 'link' ? 'Copiar o endereço' : 'Imprimir'}
        </span>
      ))}
    </div>
    <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ujn-color-text-secondary)', maxWidth: 220 }}>
      {ujnColorTokens.elevationOverlay[theme].value}
    </span>
  </UjnDocStage>
);

/** Aviso passageiro em cores invertidas, com a sombra de sobreposição. */
const ToastSample: React.FC<{ theme: UjnTheme }> = ({ theme }) => (
  <UjnDocStage label={THEME_LABEL[theme]} theme={theme} surface="page" padding={32}>
    <div
      data-ujn-toast-sample={theme}
      role="status"
      style={{
        padding: 'var(--ujn-spacing-m) var(--ujn-spacing-l)',
        borderRadius: 'var(--ujn-radius-s)',
        background: 'var(--ujn-color-toast-surface)',
        color: 'var(--ujn-color-toast-text)',
        boxShadow: 'var(--ujn-elevation-overlay)',
        fontFamily: 'var(--ujn-font-sans)',
        fontSize: 'var(--ujn-font-body-md-size)',
        lineHeight: 'var(--ujn-font-body-md-line)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Icon name="bookmarkFilled" size="sm" tone="inherit" />
      Matéria salva
      <span
        style={{
          color: 'var(--ujn-color-toast-action)',
          fontWeight: 'var(--ujn-font-label-weight)' as React.CSSProperties['fontWeight'],
          marginLeft: 'var(--ujn-spacing-s)',
        }}
      >
        Desfazer
      </span>
    </div>
  </UjnDocStage>
);

/** Os dois fios de 1px, entre barras e conteúdo, em um tema. */
const HairlineSample: React.FC<{ theme: UjnTheme }> = ({ theme }) => (
  <UjnDocStage label={THEME_LABEL[theme]} theme={theme} surface="page" direction="column" align="stretch" gap={0} padding={0}>
    <div
      data-ujn-hairline="bottom"
      style={{
        height: 'var(--ujn-nav-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ujn-color-background-card)',
        boxShadow: 'var(--ujn-elevation-hairline-bottom)',
        ...labelStyle,
      }}
    >
      Navegação · hairline-bottom
    </div>
    <div style={{ height: 80 }} />
    <div
      data-ujn-hairline="top"
      style={{
        height: 'var(--ujn-nav-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ujn-color-background-card)',
        boxShadow: 'var(--ujn-elevation-hairline-top)',
        ...labelStyle,
      }}
    >
      Fim da lista · hairline-top
    </div>
  </UjnDocStage>
);

/**
 * Os três fios da tinta — fino, grosso e duplo — em um tema. O duplo é o
 * gradiente `--ujn-gradient-rule-double`: 3px, vão de 2px e 1px.
 */
const RulesSample: React.FC<{ theme: UjnTheme }> = ({ theme }) => (
  <UjnDocStage label={THEME_LABEL[theme]} theme={theme} surface="page" direction="column" align="stretch" gap={20} padding={24}>
    {(
      [
        { key: 'thin', name: 'Fio fino', background: 'var(--ujn-color-border-rule)', height: 'var(--ujn-rule-thin)', size: ujnRule.thin, cssVar: '--ujn-rule-thin' },
        { key: 'thick', name: 'Fio grosso', background: 'var(--ujn-color-border-rule)', height: 'var(--ujn-rule-thick)', size: ujnRule.thick, cssVar: '--ujn-rule-thick' },
        { key: 'double', name: 'Fio duplo', background: 'var(--ujn-gradient-rule-double)', height: 'var(--ujn-rule-double-height)', size: ujnRule.doubleHeight, cssVar: '--ujn-gradient-rule-double' },
      ] as const
    ).map((rule) => (
      <div key={rule.key} style={{ display: 'grid', gap: 6 }}>
        <span
          aria-hidden="true"
          data-ujn-rule-sample={`${rule.key}-${theme}`}
          style={{ display: 'block', width: '100%', height: rule.height, background: rule.background }}
        />
        <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ujn-color-text-secondary)' }}>
          {rule.name} · {rule.cssVar} · {rule.size}px
        </span>
      </div>
    ))}
  </UjnDocStage>
);

/**
 * O véu da base da fotografia: o texto branco da legenda segue legível sobre
 * qualquer imagem. Invariante entre temas.
 */
const MediaVeilSample: React.FC<{ theme: UjnTheme }> = ({ theme }) => (
  <UjnDocStage label={`${THEME_LABEL[theme]} (o véu não muda)`} theme={theme} surface="card" padding={24} align="stretch">
    <figure
      data-ujn-media-sample={theme}
      style={{ position: 'relative', margin: 0, width: '100%', height: 220, overflow: 'hidden', borderRadius: 'var(--ujn-radius-xs)' }}
    >
      <img
        src={PHOTO}
        alt="Fotografia de demonstração do jornal"
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', background: 'var(--ujn-color-background-subtle)' }}
      />
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, background: 'var(--ujn-gradient-media-bottom)' }}
      />
      <figcaption
        style={{
          position: 'absolute',
          left: 'var(--ujn-spacing-l)',
          right: 'var(--ujn-spacing-l)',
          bottom: 'var(--ujn-spacing-m)',
          color: 'var(--ujn-color-media-text)',
          fontFamily: 'var(--ujn-font-sans)',
          fontSize: 'var(--ujn-font-body-sm-size)',
          lineHeight: 'var(--ujn-font-body-sm-line)',
        }}
      >
        Estudantes montam as bancas no pátio, na manhã da feira.
      </figcaption>
    </figure>
  </UjnDocStage>
);

const pair = (children: (theme: UjnTheme) => React.ReactNode) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
    {(['light', 'dark'] as const).map((theme) => (
      <React.Fragment key={theme}>{children(theme)}</React.Fragment>
    ))}
  </div>
);

/**
 * Página de documentação rica de elevação.
 */
const ElevacaoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Fundamentos • Elevação & Gradientes"
      title="Elevação & Gradientes"
      description="O jornal é plano: a página, os cartões e as listas se separam por camada de superfície (papel → cartão → sutil), por fios de 1px e pela tinta — fio fino, grosso e duplo. Há uma única sombra, --ujn-elevation-overlay, definida por tema e reservada às camadas que flutuam sobre a tela. Dois gradientes compostos completam o módulo: o fio duplo da tinta e o véu da base da fotografia."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UjnDocGrid>
      <UjnDocCard icon="🪟" title="Sobreposição">
        <code>--ujn-elevation-overlay</code> em menus, folhas, diálogos e avisos. Nenhum outro
        elemento recebe sombra: cartão de matéria, lista e barra ficam planos.
      </UjnDocCard>
      <UjnDocCard icon="➖" title="Fios de 1px">
        <code>--ujn-elevation-hairline-bottom</code> sob a navegação e <code>-top</code> no fim de
        uma lista: separação sem desfoque, em <code>--ujn-color-border-subtle</code>.
      </UjnDocCard>
      <UjnDocCard icon="🖋️" title="Tinta do jornal">
        Fio fino (1px), grosso (3px) e duplo (6px), todos na cor <code>--ujn-color-border-rule</code>.
        O duplo é o gradiente <code>--ujn-gradient-rule-double</code>.
      </UjnDocCard>
      <UjnDocCard icon="🖼️" title="Véu da mídia">
        <code>--ujn-gradient-media-bottom</code> escurece a base da fotografia para a legenda em
        branco ficar legível sobre qualquer imagem.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="../tokens"
      layout="Uma sombra · dois fios de 1px · três fios da tinta · dois gradientes"
      specs={[
        { label: 'Sombra no claro', value: ujnColorTokens.elevationOverlay.light.value },
        { label: 'Sombra no escuro', value: ujnColorTokens.elevationOverlay.dark.value },
        { label: 'Origem (claro)', value: ujnColorTokens.elevationOverlay.light.unooria },
        { label: 'Origem (escuro)', value: ujnColorTokens.elevationOverlay.dark.unooria },
        { label: 'Fio inferior', value: HAIRLINES.bottom },
        { label: 'Fio superior', value: HAIRLINES.top },
        { label: 'Fios da tinta', value: `${ujnRule.thin} · ${ujnRule.thick} · ${ujnRule.doubleHeight}px` },
        { label: 'Véu da mídia', value: GRADIENT_VALUES.mediaBottom },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Plano por padrão',
          detail:
            'cartão de matéria, item de lista, caixa lateral e barra não têm sombra; a hierarquia vem da camada (página, cartão, sutil) e do fio. Sombra em cartão faria a capa parecer uma pilha de papéis soltos em vez de uma página impressa.',
        },
        {
          subject: 'Uma sombra só, com halo claro no escuro',
          detail:
            'uma sombra escura some sobre roxo profundo; no tema escuro o overlay é o halo claro --unooria-elevation-neutral-2, e a camada elevada (brandpurple-800) já se distingue do cartão (brandpurple-900). No claro vale --unooria-elevation-brand-secondary.',
        },
        {
          subject: 'Fios por box-shadow',
          detail:
            'os fios de 1px de --ujn-elevation-hairline-* são box-shadow sem desfoque, e não border: não ocupam altura e não deslocam o conteúdo das barras de altura fixa.',
        },
        {
          subject: 'Fios da tinta pela cor e pela medida',
          detail:
            'fino, grosso e duplo são medidas (--ujn-rule-*) na cor --ujn-color-border-rule — brandpurple-900 no claro e brandpurple-200 no escuro, 16,94:1 e 14,62:1 sobre a página. A tinta é gráfico, não decoração, por isso tem token próprio e não reaproveita border-default.',
        },
        {
          subject: 'Fio duplo por gradiente, não por duas bordas',
          detail:
            '--ujn-gradient-rule-double pinta 3px, deixa 2px transparentes e pinta 1px (altura total de 6px). Um único elemento garante a geometria exata, sem depender de duas bordas empilhadas.',
        },
        {
          subject: 'Véu da mídia invariante',
          detail:
            'o gradiente parte de transparente aos 40% da altura e chega ao brandpurple a 60% na base. Texto e véu valem para os dois temas, porque o fundo é a fotografia: a legenda branca mede 4,86:1 contra uma foto branca, o pior caso.',
        },
        {
          subject: 'Gradientes declarados por tema',
          detail:
            'os dois gradientes compõem var() de cor e por isso são declarados em :root e em todo [data-ujn-theme]; só na raiz, congelariam o valor do tema claro dentro de um contêiner escuro (a lição da seção 2.9 do AGENTS.md). O mesmo vale para os fios de 1px.',
        },
        {
          subject: 'Rodapé separa-se por cor, não por sombra',
          detail:
            'o rodapé escuro invariante (--ujn-color-footer-*) é um bloco de cor própria; nada o eleva.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia da profundidade"
      description="De baixo para cima, dentro da tela."
    />
    <UjnDocAnatomy
      zones={[
        { name: 'Página e cartões', role: 'Planos, sem sombra: papel → cartão → sutil.', token: '--ujn-color-background-page · -card · -subtle' },
        { name: 'Fios de 1px', role: 'Separam navegação e fim de lista do conteúdo, sem ocupar altura.', token: '--ujn-elevation-hairline-bottom · -top' },
        { name: 'Tinta do jornal', role: 'Fio fino, grosso e duplo do cabeçalho e das aberturas.', token: '--ujn-rule-* · --ujn-gradient-rule-double' },
        { name: 'Mídia', role: 'Fotografia com o véu da base atrás da legenda.', token: '--ujn-gradient-media-bottom · --ujn-color-media-text' },
        { name: 'Folhas, menus e diálogos', role: 'Sobre o véu, com a sombra de sobreposição, em --ujn-z-sheet e --ujn-z-dialog.', token: '--ujn-elevation-overlay · --ujn-color-overlay-scrim' },
        { name: 'Avisos', role: 'Cores invertidas e a mesma sombra, em --ujn-z-toast.', token: '--ujn-color-toast-* · --ujn-elevation-overlay' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz" />
    <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC.text }}>Sombra de sobreposição</h4>
    {pair((theme) => (
      <OverlaySample theme={theme} />
    ))}
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Aviso passageiro</h4>
    {pair((theme) => (
      <ToastSample theme={theme} />
    ))}
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Fios de 1px</h4>
    {pair((theme) => (
      <HairlineSample theme={theme} />
    ))}
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Fios da tinta</h4>
    {pair((theme) => (
      <RulesSample theme={theme} />
    ))}
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Véu da base da fotografia</h4>
    {pair((theme) => (
      <MediaVeilSample theme={theme} />
    ))}

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Aplicar --ujn-elevation-overlay só a menus, folhas, diálogos e avisos.',
        'Separar barras e blocos com os fios --ujn-elevation-hairline-* e com a mudança de camada.',
        'Pintar o fio grosso e o fio duplo com --ujn-color-border-rule e as medidas --ujn-rule-*.',
        'Usar --ujn-gradient-media-bottom e --ujn-color-media-text para legenda sobre fotografia.',
        'Declarar token composto com var() em :root e em todo [data-ujn-theme].',
      ]}
      donts={[
        'Dar sombra a cartão de matéria, item de lista, caixa lateral ou barra.',
        'Inventar uma segunda sombra ou uma sombra por componente.',
        'Usar border no lugar do fio de 1px em barras de altura fixa.',
        'Compor o fio duplo com duas bordas ou com um quadro de 6px.',
        'Escurecer a tela com a sombra em vez de usar o véu --ujn-color-overlay-scrim.',
        'Colocar texto sobre fotografia sem o véu da base.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A sombra muda de natureza com o tema, a tinta troca de degrau, e o véu da mídia não muda."
    />
    <UjnDocThemeSwitcher surface="card">
      {() => (
        <>
          <div
            style={{
              padding: 'var(--ujn-spacing-l)',
              borderRadius: 'var(--ujn-radius-m)',
              background: 'var(--ujn-color-background-elevated)',
              boxShadow: 'var(--ujn-elevation-overlay)',
              display: 'grid',
              gap: 'var(--ujn-spacing-s)',
              minWidth: 220,
            }}
          >
            <span style={labelStyle}>Folha elevada</span>
            <span
              aria-hidden="true"
              style={{ display: 'block', height: 'var(--ujn-rule-double-height)', background: 'var(--ujn-gradient-rule-double)' }}
            />
            <span style={{ ...labelStyle, fontWeight: 400 }}>Fio duplo na tinta do tema</span>
          </div>
          <div
            style={{
              padding: 'var(--ujn-spacing-m) var(--ujn-spacing-l)',
              borderRadius: 'var(--ujn-radius-s)',
              background: 'var(--ujn-color-toast-surface)',
              color: 'var(--ujn-color-toast-text)',
              boxShadow: 'var(--ujn-elevation-overlay)',
              fontFamily: 'var(--ujn-font-sans)',
              fontSize: 'var(--ujn-font-body-md-size)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Icon name="checkCircle" size="sm" tone="inherit" />
            Carta enviada à redação
          </div>
        </>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa da API de elevação" />
    <UjnDocPropsTable
      title="Tokens"
      rows={[
        {
          name: '--ujn-elevation-overlay',
          type: 'box-shadow',
          default: ujnColorTokens.elevationOverlay.light.value,
          description: `Sombra de sobreposição. No escuro: ${ujnColorTokens.elevationOverlay.dark.value}.`,
        },
        { name: '--ujn-elevation-hairline-bottom', type: 'box-shadow', default: HAIRLINES.bottom, description: 'Fio sob a navegação.' },
        { name: '--ujn-elevation-hairline-top', type: 'box-shadow', default: HAIRLINES.top, description: 'Fio no fim de uma lista.' },
        { name: '--ujn-rule-thin', type: 'px', default: `${ujnRule.thin}px`, description: 'Fio fino da tinta.' },
        { name: '--ujn-rule-thick', type: 'px', default: `${ujnRule.thick}px`, description: 'Fio grosso da tinta.' },
        { name: '--ujn-rule-double-height', type: 'px', default: `${ujnRule.doubleHeight}px`, description: 'Altura total do fio duplo.' },
        { name: ujnGradients.ruleDouble.cssVar, type: 'gradient', default: GRADIENT_VALUES.ruleDouble, description: ujnGradients.ruleDouble.usage },
        { name: ujnGradients.mediaBottom.cssVar, type: 'gradient', default: GRADIENT_VALUES.mediaBottom, description: ujnGradients.mediaBottom.usage },
        { name: '--ujn-color-border-rule', type: 'cor', default: ujnColorTokens.borderRule.light.value, description: `A tinta do jornal. No escuro: ${ujnColorTokens.borderRule.dark.value}.` },
        { name: '--ujn-color-media-scrim', type: 'cor', default: ujnInvariantColors.mediaScrim.value, description: 'Véu atrás de texto sobre a mídia (invariante).' },
      ]}
    />
    <UjnDocPropsTable
      title="Exportações"
      rows={[
        { name: 'ujnColorTokens.elevationOverlay', type: 'UjnColorToken', description: 'A sombra de sobreposição por tema, com a origem.' },
        { name: 'ujnGradients', type: '{ mediaBottom; ruleDouble }', description: 'Os dois gradientes compostos, com a variável e o uso.' },
        { name: 'ujnRule', type: '{ thin; thick; doubleHeight }', description: 'Medidas dos fios da tinta, em pixels.' },
        { name: 'ujnLayout.navHeight', type: 'number', default: `${ujnLayout.navHeight}`, description: 'Altura da navegação, sobre a qual o fio inferior se apoia.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoojornal/Fundamentos/Elevação & Gradientes',
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa de elevação e gradientes.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ElevacaoDocumentationPage />,
};

/**
 * A sombra de sobreposição nos dois temas. O `play` confere que ela resolve em
 * cada tema e que os dois valores diferem.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <>
      {pair((theme) => (
        <OverlaySample theme={theme} />
      ))}
      {pair((theme) => (
        <ToastSample theme={theme} />
      ))}
    </>
  ),
  play: async ({ canvasElement }) => {
    const shadowOf = (theme: UjnTheme) =>
      getComputedStyle(canvasElement.querySelector<HTMLElement>(`[data-ujn-overlay-sample="${theme}"]`)!).boxShadow;
    await expect(shadowOf('light')).not.toBe('none');
    await expect(shadowOf('dark')).not.toBe('none');
    await expect(shadowOf('light')).not.toBe(shadowOf('dark'));
  },
};

/**
 * Os fios de 1px e os três fios da tinta. O `play` confere que os fios de 1px
 * resolvem uma sombra, que o fio duplo é um gradiente de 6px e que a tinta troca
 * de cor com o tema.
 */
export const Fios: Story = {
  name: 'Fios de 1px e fios da tinta',
  render: () => (
    <>
      {pair((theme) => (
        <HairlineSample theme={theme} />
      ))}
      {pair((theme) => (
        <RulesSample theme={theme} />
      ))}
    </>
  ),
  play: async ({ canvasElement }) => {
    const query = (selector: string) => getComputedStyle(canvasElement.querySelector<HTMLElement>(selector)!);
    const bottom = query('[data-ujn-hairline="bottom"]').boxShadow;
    const top = query('[data-ujn-hairline="top"]').boxShadow;
    await expect(bottom).not.toBe('none');
    await expect(top).not.toBe('none');
    await expect(bottom).not.toBe(top);
    const double = query('[data-ujn-rule-sample="double-light"]');
    await expect(double.height).toBe(`${ujnRule.doubleHeight}px`);
    await expect(double.backgroundImage).toContain('linear-gradient');
    await expect(query('[data-ujn-rule-sample="thick-light"]').backgroundColor).not.toBe(
      query('[data-ujn-rule-sample="thick-dark"]').backgroundColor
    );
  },
};

/**
 * O véu da base da fotografia, igual nos dois temas.
 */
export const VeuDaMidia: Story = {
  name: 'Véu da mídia',
  render: () => (
    <>
      {pair((theme) => (
        <MediaVeilSample theme={theme} />
      ))}
    </>
  ),
};
