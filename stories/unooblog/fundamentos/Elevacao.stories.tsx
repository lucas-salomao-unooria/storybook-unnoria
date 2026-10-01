import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import {
  ublColorTokens,
  ublGradients,
  ublInvariantColors,
  ublLayout,
  type UblTheme,
} from '../../../src/unooblog/tokens';
import { Icon } from '../../../src/unooblog/components/Icon';
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
const COVER = '/unooblog/capa-01.svg';

const DOC = {
  text: 'var(--ubl-color-text-primary)',
  muted: 'var(--ubl-color-text-secondary)',
} as const;

const THEME_LABEL: Record<UblTheme, string> = { light: 'Tema claro', dark: 'Tema escuro' };

/** Os dois fios de 1px, como declarados em `spacing.css`. */
const HAIRLINES = {
  bottom: '0 1px 0 0 var(--ubl-color-border-subtle)',
  top: '0 -1px 0 0 var(--ubl-color-border-subtle)',
} as const;

/** Definição literal do gradiente, como declarado em `colors.css`. */
const GRADIENT_VALUES = {
  mediaBottom: 'linear-gradient(180deg, transparent 40%, var(--ubl-color-media-scrim) 100%)',
} as const;

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--ubl-font-sans)',
  fontSize: 'var(--ubl-font-label-size)',
  lineHeight: 'var(--ubl-font-label-line)',
  fontWeight: 'var(--ubl-font-label-weight)' as React.CSSProperties['fontWeight'],
  color: 'var(--ubl-color-text-primary)',
};

/**
 * Menu flutuante com a sombra de sobreposição, sobre a superfície da página, em
 * um tema. É o que uma folha, um menu ou um diálogo recebem.
 */
const OverlaySample: React.FC<{ theme: UblTheme }> = ({ theme }) => (
  <UblDocStage label={THEME_LABEL[theme]} theme={theme} surface="page" padding={32}>
    <div
      data-ubl-overlay-sample={theme}
      style={{
        width: 240,
        padding: 'var(--ubl-spacing-l)',
        borderRadius: 'var(--ubl-radius-m)',
        background: 'var(--ubl-color-background-elevated)',
        boxShadow: 'var(--ubl-elevation-overlay)',
        display: 'grid',
        gap: 'var(--ubl-spacing-xs)',
      }}
    >
      <span style={labelStyle}>Compartilhar o post</span>
      {(['share', 'link', 'copy'] as const).map((icon) => (
        <span key={icon} style={{ display: 'flex', alignItems: 'center', gap: 10, ...labelStyle, fontWeight: 400 }}>
          <Icon name={icon} size="sm" tone="secondary" />
          {icon === 'share' ? 'Enviar a um colega' : icon === 'link' ? 'Copiar o endereço' : 'Copiar o código'}
        </span>
      ))}
    </div>
    <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ubl-color-text-secondary)', maxWidth: 220 }}>
      {ublColorTokens.elevationOverlay[theme].value}
    </span>
  </UblDocStage>
);

/** Diálogo de confirmação sobre o véu, com a sombra de sobreposição. */
const DialogSample: React.FC<{ theme: UblTheme }> = ({ theme }) => (
  <UblDocStage label={THEME_LABEL[theme]} theme={theme} surface="page" padding={0} align="stretch">
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        padding: 32,
        background: 'var(--ubl-color-overlay-scrim)',
        borderRadius: 12,
      }}
    >
      <div
        role="group"
        aria-label="Exemplo de diálogo"
        data-ubl-dialog-sample={theme}
        style={{
          width: 280,
          boxSizing: 'border-box',
          padding: 'var(--ubl-spacing-xl)',
          borderRadius: 'var(--ubl-radius-l)',
          background: 'var(--ubl-color-background-elevated)',
          boxShadow: 'var(--ubl-elevation-overlay)',
          display: 'grid',
          gap: 'var(--ubl-spacing-s)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--ubl-font-sans)',
            fontSize: 'var(--ubl-font-heading-4-size)',
            lineHeight: 'var(--ubl-font-heading-4-line)',
            fontWeight: 'var(--ubl-font-heading-4-weight)' as React.CSSProperties['fontWeight'],
            color: 'var(--ubl-color-text-primary)',
          }}
        >
          Excluir comentário?
        </span>
        <span
          style={{
            fontFamily: 'var(--ubl-font-sans)',
            fontSize: 'var(--ubl-font-body-md-size)',
            lineHeight: 'var(--ubl-font-body-md-line)',
            color: 'var(--ubl-color-text-secondary)',
          }}
        >
          As respostas a ele também saem do fio.
        </span>
      </div>
    </div>
  </UblDocStage>
);

/** Aviso passageiro em cores invertidas, com a sombra de sobreposição. */
const ToastSample: React.FC<{ theme: UblTheme }> = ({ theme }) => (
  <UblDocStage label={THEME_LABEL[theme]} theme={theme} surface="page" padding={32}>
    <div
      data-ubl-toast-sample={theme}
      role="status"
      style={{
        padding: 'var(--ubl-spacing-m) var(--ubl-spacing-l)',
        borderRadius: 'var(--ubl-radius-s)',
        background: 'var(--ubl-color-toast-surface)',
        color: 'var(--ubl-color-toast-text)',
        boxShadow: 'var(--ubl-elevation-overlay)',
        fontFamily: 'var(--ubl-font-sans)',
        fontSize: 'var(--ubl-font-body-md-size)',
        lineHeight: 'var(--ubl-font-body-md-line)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Icon name="bookmarkFilled" size="sm" tone="inherit" />
      Post salvo
      <span
        style={{
          color: 'var(--ubl-color-toast-action)',
          fontWeight: 'var(--ubl-font-label-weight)' as React.CSSProperties['fontWeight'],
          marginLeft: 'var(--ubl-spacing-s)',
        }}
      >
        Desfazer
      </span>
    </div>
  </UblDocStage>
);

/**
 * Superfícies planas: o cartão de post e o bloco sutil se separam da página
 * por camada e por fio de 1px, sem nenhuma sombra.
 */
const FlatSample: React.FC<{ theme: UblTheme }> = ({ theme }) => (
  <UblDocStage label={THEME_LABEL[theme]} theme={theme} surface="page" direction="column" align="stretch" gap={12} padding={24}>
    <article
      data-ubl-flat-sample={theme}
      style={{
        padding: 'var(--ubl-spacing-l)',
        borderRadius: 'var(--ubl-radius-l)',
        background: 'var(--ubl-color-background-card)',
        border: '1px solid var(--ubl-color-border-subtle)',
        display: 'grid',
        gap: 'var(--ubl-spacing-xs)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--ubl-font-sans)',
          fontSize: 'var(--ubl-font-heading-4-size)',
          lineHeight: 'var(--ubl-font-heading-4-line)',
          fontWeight: 'var(--ubl-font-heading-4-weight)' as React.CSSProperties['fontWeight'],
          color: 'var(--ubl-color-text-primary)',
        }}
      >
        Como organizamos os tokens
      </span>
      <div
        style={{
          padding: 'var(--ubl-spacing-s) var(--ubl-spacing-m)',
          borderRadius: 'var(--ubl-radius-m)',
          background: 'var(--ubl-color-background-subtle)',
          fontFamily: 'var(--ubl-font-sans)',
          fontSize: 'var(--ubl-font-body-md-size)',
          lineHeight: 'var(--ubl-font-body-md-line)',
          color: 'var(--ubl-color-text-secondary)',
        }}
      >
        Capa ainda não carregada, bloco sutil
      </div>
    </article>
    <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ubl-color-text-secondary)' }}>
      página → cartão → sutil · fio de 1px · box-shadow: none
    </span>
  </UblDocStage>
);

/** Os dois fios de 1px, entre o cabeçalho e o conteúdo e no fim de uma lista. */
const HairlineSample: React.FC<{ theme: UblTheme }> = ({ theme }) => (
  <UblDocStage label={THEME_LABEL[theme]} theme={theme} surface="page" direction="column" align="stretch" gap={0} padding={0}>
    <div
      data-ubl-hairline="bottom"
      style={{
        height: 'var(--ubl-site-header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ubl-color-surface-bar)',
        boxShadow: 'var(--ubl-elevation-hairline-bottom)',
        ...labelStyle,
      }}
    >
      Cabeçalho do site · hairline-bottom
    </div>
    <div style={{ height: 80 }} />
    <div
      data-ubl-hairline="top"
      style={{
        height: 'var(--ubl-site-header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ubl-color-background-page)',
        boxShadow: 'var(--ubl-elevation-hairline-top)',
        ...labelStyle,
      }}
    >
      Fim da lista de posts · hairline-top
    </div>
  </UblDocStage>
);

/**
 * O véu da base da capa: o texto branco do título segue legível sobre qualquer
 * imagem. Invariante entre temas. O fundo sutil atrás da imagem mantém a amostra
 * legível mesmo enquanto a capa não carrega.
 */
const MediaVeilSample: React.FC<{ theme: UblTheme }> = ({ theme }) => (
  <UblDocStage label={`${THEME_LABEL[theme]} (o véu não muda)`} theme={theme} surface="card" padding={24} align="stretch">
    <figure
      data-ubl-media-sample={theme}
      style={{
        position: 'relative',
        margin: 0,
        width: '100%',
        height: 240,
        overflow: 'hidden',
        borderRadius: 'var(--ubl-radius-m)',
        background: 'var(--ubl-color-background-subtle)',
      }}
    >
      <img
        src={COVER}
        alt="Capa de demonstração do blog"
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        data-ubl-media-veil=""
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, background: 'var(--ubl-gradient-media-bottom)' }}
      />
      <figcaption
        style={{
          position: 'absolute',
          left: 'var(--ubl-spacing-l)',
          right: 'var(--ubl-spacing-l)',
          bottom: 'var(--ubl-spacing-l)',
          color: 'var(--ubl-color-media-text)',
          display: 'grid',
          gap: 'var(--ubl-spacing-3xs)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--ubl-font-sans)',
            fontSize: 'var(--ubl-font-heading-3-size)',
            lineHeight: 'var(--ubl-font-heading-3-line)',
            fontWeight: 'var(--ubl-font-heading-3-weight)' as React.CSSProperties['fontWeight'],
          }}
        >
          Como escrevemos o Caderno Aberto
        </span>
        <span
          style={{
            fontFamily: 'var(--ubl-font-sans)',
            fontSize: 'var(--ubl-font-body-md-size)',
            lineHeight: 'var(--ubl-font-body-md-line)',
          }}
        >
          Marina Duarte · 8 min de leitura
        </span>
      </figcaption>
    </figure>
  </UblDocStage>
);

/**
 * O pior caso do véu: uma imagem branca (a página clara) por baixo. O título
 * branco ainda mede 4,86:1 contra o véu composto sobre o branco.
 */
const MediaWorstCase: React.FC = () => (
  <UblDocStage label="Pior caso: capa branca (tema claro)" theme="light" surface="page" padding={24} align="stretch">
    <div
      data-ubl-media-worst=""
      style={{
        position: 'relative',
        width: '100%',
        height: 140,
        overflow: 'hidden',
        borderRadius: 'var(--ubl-radius-m)',
        border: '1px solid var(--ubl-color-border-subtle)',
        background: 'var(--ubl-color-background-page)',
      }}
    >
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--ubl-gradient-media-bottom)' }} />
      <span
        style={{
          position: 'absolute',
          left: 'var(--ubl-spacing-l)',
          right: 'var(--ubl-spacing-l)',
          bottom: 'var(--ubl-spacing-m)',
          color: 'var(--ubl-color-media-text)',
          fontFamily: 'var(--ubl-font-sans)',
          fontSize: 'var(--ubl-font-heading-4-size)',
          lineHeight: 'var(--ubl-font-heading-4-line)',
          fontWeight: 'var(--ubl-font-heading-4-weight)' as React.CSSProperties['fontWeight'],
        }}
      >
        Título sobre a capa
      </span>
    </div>
  </UblDocStage>
);

const pair = (children: (theme: UblTheme) => React.ReactNode) => (
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
      badgeBrand="Unooblog"
      category="Fundamentos • Elevação & Gradientes"
      title="Elevação & Gradientes"
      description="O blog é plano: a página, os cartões de post e os comentários se separam por camada de superfície (página → cartão → sutil) e por fios de 1px. Há uma única sombra, --ubl-elevation-overlay, definida por tema e reservada às camadas que flutuam sobre a tela — menu, diálogo e aviso. Um gradiente composto completa o módulo: o véu da base da capa, que mantém legível o título sobre a imagem."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UblDocGrid>
      <UblDocCard icon="🪟" title="Sobreposição">
        <code>--ubl-elevation-overlay</code> em menus, folhas, diálogos e avisos. Nenhum outro
        elemento recebe sombra: cartão de post, comentário e barra ficam planos.
      </UblDocCard>
      <UblDocCard icon="➖" title="Fios de 1px">
        <code>--ubl-elevation-hairline-bottom</code> sob o cabeçalho do site e <code>-top</code> no
        fim de uma lista: separação sem desfoque, em <code>--ubl-color-border-subtle</code>.
      </UblDocCard>
      <UblDocCard icon="🧱" title="Camadas em vez de sombra">
        O cartão lavanda sobre a página branca e o bloco sutil dentro do cartão formam a hierarquia.
        A superfície nunca sobe pela sombra.
      </UblDocCard>
      <UblDocCard icon="🖼️" title="Véu da capa">
        <code>--ubl-gradient-media-bottom</code> escurece a base da capa para o título em branco
        ficar legível sobre qualquer imagem, na variante em destaque do cartão de post.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="../tokens"
      layout="Uma sombra · dois fios de 1px · um gradiente"
      specs={[
        { label: 'Sombra no claro', value: ublColorTokens.elevationOverlay.light.value },
        { label: 'Sombra no escuro', value: ublColorTokens.elevationOverlay.dark.value },
        { label: 'Origem (claro)', value: ublColorTokens.elevationOverlay.light.unooria },
        { label: 'Origem (escuro)', value: ublColorTokens.elevationOverlay.dark.unooria },
        { label: 'Fio inferior', value: HAIRLINES.bottom },
        { label: 'Fio superior', value: HAIRLINES.top },
        { label: 'Véu da capa', value: GRADIENT_VALUES.mediaBottom },
        { label: 'Camadas flutuantes', value: '--ubl-z-sheet · -dialog · -toast' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Plano por padrão',
          detail:
            'cartão de post, comentário, caixa lateral e barra não têm sombra; a hierarquia vem da camada (página, cartão, sutil) e do fio de 1px. Sombra em cartão competiria com a coluna de leitura e faria a lista de posts parecer uma pilha de painéis soltos.',
        },
        {
          subject: 'Uma sombra só, com halo claro no escuro',
          detail:
            'uma sombra escura some sobre roxo profundo; no tema escuro o overlay é o halo claro --unooria-elevation-neutral-2 (0 0 8px 4px, branco a 10%), e é ele que distingue a camada elevada, que no escuro coincide em cor com o bloco sutil (brandpurple-800). No claro vale --unooria-elevation-brand-secondary.',
        },
        {
          subject: 'Fios por box-shadow',
          detail:
            'os fios de 1px de --ubl-elevation-hairline-* são box-shadow sem desfoque, e não border: não ocupam altura e não deslocam o conteúdo das barras de altura fixa, como o cabeçalho de 64px.',
        },
        {
          subject: 'Véu da mídia invariante',
          detail:
            'o gradiente parte de transparente aos 40% da altura e chega ao brandpurple a 60% na base. Texto e véu valem para os dois temas, porque o fundo é a capa: o título branco mede 4,86:1 contra uma capa branca, o pior caso.',
        },
        {
          subject: 'Gradiente e fios declarados por tema',
          detail:
            'o véu e os fios compõem var() de cor e por isso são declarados em :root e em todo [data-ubl-theme]; só na raiz, congelariam o valor do tema claro dentro de um contêiner escuro (a lição da seção 2.9 do AGENTS.md).',
        },
        {
          subject: 'Bloco de código sem sombra',
          detail:
            'o bloco de código é uma superfície escura invariante; o contraste com a prosa já o destaca, e nada o eleva.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia da profundidade"
      description="De baixo para cima, dentro da tela."
    />
    <UblDocAnatomy
      zones={[
        { name: 'Página e cartões', role: 'Planos, sem sombra: página → cartão → sutil.', token: '--ubl-color-background-page · -card · -subtle' },
        { name: 'Fios de 1px', role: 'Separam o cabeçalho e o fim da lista do conteúdo, sem ocupar altura.', token: '--ubl-elevation-hairline-bottom · -top' },
        { name: 'Capa', role: 'Imagem com o véu da base atrás do título, na variante em destaque.', token: '--ubl-gradient-media-bottom · --ubl-color-media-text' },
        { name: 'Folhas e menus', role: 'Sobre o véu, com a sombra de sobreposição, em --ubl-z-sheet.', token: '--ubl-elevation-overlay · --ubl-color-overlay-scrim' },
        { name: 'Diálogos', role: 'Superfície elevada sobre o véu, em --ubl-z-dialog.', token: '--ubl-color-background-elevated · --ubl-elevation-overlay' },
        { name: 'Avisos', role: 'Cores invertidas e a mesma sombra, em --ubl-z-toast.', token: '--ubl-color-toast-* · --ubl-elevation-overlay' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz" />
    <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC.text }}>Superfícies planas</h4>
    {pair((theme) => (
      <FlatSample theme={theme} />
    ))}
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Sombra de sobreposição: menu</h4>
    {pair((theme) => (
      <OverlaySample theme={theme} />
    ))}
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Sombra de sobreposição: diálogo</h4>
    {pair((theme) => (
      <DialogSample theme={theme} />
    ))}
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Sombra de sobreposição: aviso passageiro</h4>
    {pair((theme) => (
      <ToastSample theme={theme} />
    ))}
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Fios de 1px</h4>
    {pair((theme) => (
      <HairlineSample theme={theme} />
    ))}
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Véu da base da capa</h4>
    {pair((theme) => (
      <MediaVeilSample theme={theme} />
    ))}
    <MediaWorstCase />

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Aplicar --ubl-elevation-overlay só a menus, folhas, diálogos e avisos.',
        'Separar o cabeçalho e as listas com os fios --ubl-elevation-hairline-* e com a mudança de camada.',
        'Usar --ubl-gradient-media-bottom e --ubl-color-media-text para texto sobre a capa.',
        'Declarar token composto com var() em :root e em todo [data-ubl-theme].',
        'Dar à camada flutuante o fundo --ubl-color-background-elevated.',
      ]}
      donts={[
        'Dar sombra a cartão de post, comentário, bloco de código ou barra.',
        'Inventar uma segunda sombra ou uma sombra por componente.',
        'Usar border no lugar do fio de 1px em barras de altura fixa.',
        'Escurecer a tela com a sombra em vez de usar o véu --ubl-color-overlay-scrim.',
        'Colocar texto sobre a capa sem o véu da base.',
        'Subir a superfície pela sombra no tema escuro: ali a sombra é um halo claro, e a camada vem da cor.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A sombra muda de natureza com o tema, e o véu da capa não muda."
    />
    <UblDocThemeSwitcher surface="card">
      {() => (
        <>
          <div
            style={{
              padding: 'var(--ubl-spacing-l)',
              borderRadius: 'var(--ubl-radius-m)',
              background: 'var(--ubl-color-background-elevated)',
              boxShadow: 'var(--ubl-elevation-overlay)',
              display: 'grid',
              gap: 'var(--ubl-spacing-s)',
              minWidth: 220,
            }}
          >
            <span style={labelStyle}>Folha elevada</span>
            <span
              aria-hidden="true"
              style={{ display: 'block', height: 1, background: 'var(--ubl-color-border-subtle)' }}
            />
            <span style={{ ...labelStyle, fontWeight: 400 }}>Fio de 1px no tom do tema</span>
          </div>
          <div
            style={{
              padding: 'var(--ubl-spacing-m) var(--ubl-spacing-l)',
              borderRadius: 'var(--ubl-radius-s)',
              background: 'var(--ubl-color-toast-surface)',
              color: 'var(--ubl-color-toast-text)',
              boxShadow: 'var(--ubl-elevation-overlay)',
              fontFamily: 'var(--ubl-font-sans)',
              fontSize: 'var(--ubl-font-body-md-size)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Icon name="checkCircle" size="sm" tone="inherit" />
            Inscrição confirmada
          </div>
        </>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa da API de elevação" />
    <UblDocPropsTable
      title="Tokens"
      rows={[
        {
          name: '--ubl-elevation-overlay',
          type: 'box-shadow',
          default: ublColorTokens.elevationOverlay.light.value,
          description: `Sombra de sobreposição. No escuro: ${ublColorTokens.elevationOverlay.dark.value}.`,
        },
        { name: '--ubl-elevation-hairline-bottom', type: 'box-shadow', default: HAIRLINES.bottom, description: 'Fio sob o cabeçalho do site.' },
        { name: '--ubl-elevation-hairline-top', type: 'box-shadow', default: HAIRLINES.top, description: 'Fio no fim de uma lista.' },
        { name: ublGradients.mediaBottom.cssVar, type: 'gradient', default: GRADIENT_VALUES.mediaBottom, description: ublGradients.mediaBottom.usage },
        { name: '--ubl-color-media-scrim', type: 'cor', default: ublInvariantColors.mediaScrim.value, description: 'Véu atrás de texto sobre a mídia (invariante).' },
        { name: '--ubl-color-media-text', type: 'cor', default: ublInvariantColors.mediaText.value, description: 'Texto sobre a capa, sempre branco.' },
        { name: '--ubl-color-overlay-scrim', type: 'cor', default: ublColorTokens.overlayScrim.light.value, description: `Véu atrás de folhas e diálogos. No escuro: ${ublColorTokens.overlayScrim.dark.value}.` },
      ]}
    />
    <UblDocPropsTable
      title="Exportações"
      rows={[
        { name: 'ublColorTokens.elevationOverlay', type: 'UblColorToken', description: 'A sombra de sobreposição por tema, com a origem.' },
        { name: 'ublGradients', type: '{ mediaBottom }', description: 'O gradiente composto, com a variável e o uso.' },
        { name: 'ublLayout.siteHeaderHeight', type: 'number', default: `${ublLayout.siteHeaderHeight}`, description: 'Altura do cabeçalho, sobre o qual o fio inferior se apoia.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unooblog/Fundamentos/Elevação & Gradientes',
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
 * Superfícies planas e camadas flutuantes. O `play` confere que o cartão de
 * post não tem sombra e que menu, diálogo e aviso têm — uma sombra diferente em
 * cada tema.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <>
      {pair((theme) => (
        <FlatSample theme={theme} />
      ))}
      {pair((theme) => (
        <OverlaySample theme={theme} />
      ))}
      {pair((theme) => (
        <DialogSample theme={theme} />
      ))}
      {pair((theme) => (
        <ToastSample theme={theme} />
      ))}
    </>
  ),
  play: async ({ canvasElement }) => {
    const shadowOf = (name: string, theme: UblTheme) =>
      getComputedStyle(canvasElement.querySelector<HTMLElement>(`[data-ubl-${name}-sample="${theme}"]`)!).boxShadow;
    for (const theme of ['light', 'dark'] as const) {
      await expect(shadowOf('flat', theme)).toBe('none');
      await expect(shadowOf('overlay', theme)).not.toBe('none');
      await expect(shadowOf('dialog', theme)).not.toBe('none');
      await expect(shadowOf('toast', theme)).not.toBe('none');
    }
    await expect(shadowOf('overlay', 'light')).not.toBe(shadowOf('overlay', 'dark'));
    // Uma sombra só: menu, diálogo e aviso resolvem o mesmo valor em cada tema.
    await expect(shadowOf('dialog', 'light')).toBe(shadowOf('overlay', 'light'));
    await expect(shadowOf('toast', 'dark')).toBe(shadowOf('overlay', 'dark'));
  },
};

/**
 * Os fios de 1px, no cabeçalho e no fim da lista. O `play` confere que cada fio
 * resolve uma sombra sem desfoque e que os dois diferem.
 */
export const Fios: Story = {
  name: 'Fios de 1px',
  render: () => (
    <>
      {pair((theme) => (
        <HairlineSample theme={theme} />
      ))}
    </>
  ),
  play: async ({ canvasElement }) => {
    const query = (selector: string) => getComputedStyle(canvasElement.querySelector<HTMLElement>(selector)!);
    const bottom = query('[data-ubl-hairline="bottom"]');
    const top = query('[data-ubl-hairline="top"]');
    await expect(bottom.boxShadow).not.toBe('none');
    await expect(top.boxShadow).not.toBe('none');
    await expect(bottom.boxShadow).not.toBe(top.boxShadow);
    // Os fios não ocupam altura: o cabeçalho mede o token.
    await expect(bottom.height).toBe(`${ublLayout.siteHeaderHeight}px`);
    await expect(bottom.boxShadow).toMatch(/0px 1px 0px 0px/);
    await expect(top.boxShadow).toMatch(/0px -1px 0px 0px/);
  },
};

/**
 * O véu da base da capa, igual nos dois temas, mais o pior caso (capa branca).
 * O `play` confere que o véu é um gradiente e que o título é branco.
 */
export const VeuDaMidia: Story = {
  name: 'Véu da mídia',
  render: () => (
    <>
      {pair((theme) => (
        <MediaVeilSample theme={theme} />
      ))}
      <MediaWorstCase />
    </>
  ),
  play: async ({ canvasElement }) => {
    const veils = Array.from(canvasElement.querySelectorAll<HTMLElement>('[data-ubl-media-veil]'));
    await expect(veils).toHaveLength(2);
    for (const veil of veils) {
      await expect(getComputedStyle(veil).backgroundImage).toContain('linear-gradient');
    }
    // O véu é o mesmo nos dois temas.
    await expect(getComputedStyle(veils[0]).backgroundImage).toBe(getComputedStyle(veils[1]).backgroundImage);
    const caption = canvasElement.querySelector<HTMLElement>('[data-ubl-media-sample="dark"] figcaption')!;
    await expect(getComputedStyle(caption).color).toBe('rgb(255, 255, 255)');
  },
};
