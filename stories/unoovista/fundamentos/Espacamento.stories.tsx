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
import { Avatar, Icon } from '../../../src/unoovista';
import {
  unvSpacing,
  unvSpacingOrder,
  unvSpacingUsage,
  unvGutter,
  unvRadius,
  unvLayout,
  unvAvatarSizes,
  unvIconSizes,
} from '../../../src/unoovista/tokens';
import type { UnvSpacingToken } from '../../../src/unoovista/tokens';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const DOC_BORDER = '#E4E8E9';
const DOC_MUTED = '#475157';
const DOC_LINK = '#57547D';

const TOUCH_TARGET = 44;

type RadiusKey = keyof typeof unvRadius;

const RADIUS_USAGE: Record<RadiusKey, string> = {
  xs: 'Cantos mínimos e etiquetas pequenas.',
  s: 'Controles pequenos e blocos da grade de mídia.',
  m: 'Mídia das publicações, blocos e cartões compactos.',
  l: 'Cartão de publicação, folhas e cartões de perfil.',
  xl: 'Cartões grandes e campos de mensagem de várias linhas.',
  full: 'Cápsulas: botões, chips, campos, doca e avisos.',
};

/**
 * Dimensões estruturais, com a variável CSS e o papel de cada uma.
 */
const LAYOUT_ROWS: {
  key: keyof typeof unvLayout;
  cssVar: string;
  description: string;
}[] = [
  { key: 'screenWidth', cssVar: '--unv-screen-width', description: 'Largura da tela de referência.' },
  { key: 'screenHeight', cssVar: '--unv-screen-height', description: 'Altura da tela de referência.' },
  { key: 'statusBarHeight', cssVar: '--unv-statusbar-height', description: 'Faixa da barra de status do sistema.' },
  { key: 'topBarHeight', cssVar: '--unv-topbar-height', description: 'Barra superior completa, com o recuo da barra de status.' },
  { key: 'topBarContentHeight', cssVar: '--unv-topbar-content-height', description: 'Altura útil da barra superior, sem o recuo.' },
  { key: 'tabBarHeight', cssVar: '--unv-tabbar-height', description: 'Zona da doca de navegação, com o recuo inferior.' },
  { key: 'tabBarContentHeight', cssVar: '--unv-tabbar-content-height', description: 'Altura da cápsula da doca.' },
  { key: 'homeIndicatorHeight', cssVar: '--unv-home-indicator-height', description: 'Recuo inferior reservado ao indicador de início do sistema.' },
];

/**
 * Régua visual de um degrau da escala de espaçamento.
 */
const SpacingRuler: React.FC<{ token: UnvSpacingToken; showUsage?: boolean }> = ({
  token,
  showUsage = true,
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '170px 60px minmax(0, 1fr)',
      alignItems: 'center',
      gap: 12,
      padding: '8px 0',
      borderBottom: `1px solid ${DOC_BORDER}`,
    }}
  >
    <code style={{ fontSize: 12, color: DOC_LINK }}>--unv-spacing-{token}</code>
    <span style={{ fontSize: 12, color: DOC_MUTED }}>{unvSpacing[token]}px</span>
    <div>
      <span
        style={{
          display: 'block',
          height: 14,
          width: unvSpacing[token],
          borderRadius: 3,
          background: BAR,
        }}
      />
      {showUsage && (
        <span style={{ display: 'block', fontSize: 12, color: DOC_MUTED, marginTop: 4 }}>
          {unvSpacingUsage[token]}
        </span>
      )}
    </div>
  </div>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      marginTop: 6,
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
 * Esquema da estrutura de tela em escala reduzida, com as camadas dos tokens.
 */
const ScreenSchematic: React.FC = () => {
  const scale = 0.42;
  const px = (value: number) => Math.round(value * scale);
  const band = (label: string, height: number, background: string): React.ReactNode => (
    <div
      style={{
        height: px(height),
        background,
        borderRadius: 'var(--unv-radius-xs)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--unv-color-text-secondary)',
        fontFamily: MONO,
        fontSize: 9,
      }}
    >
      {label}
    </div>
  );

  return (
    <UnvDocStage label="Tela de referência 375 × 812 (escala 42%)" surface="secondary" align="flex-start" padding={20} gap={28}>
      <div
        style={{
          width: px(unvLayout.screenWidth),
          height: px(unvLayout.screenHeight),
          background: 'var(--unv-color-background-primary)',
          border: '1px solid var(--unv-color-border-default)',
          borderRadius: 'var(--unv-radius-l)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 4,
        }}
      >
        <div>
          {band('barra de status', unvLayout.statusBarHeight, 'var(--unv-color-background-tertiary)')}
          {band('conteúdo da barra', unvLayout.topBarContentHeight, 'var(--unv-color-fill-field)')}
        </div>
        <div>
          <div
            style={{
              height: px(unvLayout.tabBarContentHeight),
              margin: '0 8px',
              background: 'var(--unv-color-background-elevated)',
              borderRadius: 'var(--unv-radius-full)',
              boxShadow: 'var(--unv-elevation-overlay)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--unv-color-text-secondary)',
              fontFamily: MONO,
              fontSize: 9,
            }}
          >
            doca
          </div>
          {band(
            'recuo inferior',
            unvLayout.tabBarHeight - unvLayout.tabBarContentHeight,
            'transparent'
          )}
        </div>
      </div>
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'grid',
          gap: 6,
          fontSize: 12,
          color: DOC_MUTED,
          fontFamily: MONO,
        }}
      >
        {LAYOUT_ROWS.map((row) => (
          <li key={row.key}>
            <span style={{ color: DOC_LINK }}>{row.cssVar}</span> · {unvLayout[row.key]}px
          </li>
        ))}
        <li>
          <span style={{ color: DOC_LINK }}>--unv-gutter</span> · {unvGutter}px
        </li>
      </ul>
    </UnvDocStage>
  );
};

/**
 * Simulador que aplica raio e espaçamento a uma superfície de exemplo, nos dois temas.
 */
const BoxLab: React.FC = () => {
  const [radius, setRadius] = useState<RadiusKey>('l');
  const [padding, setPadding] = useState<UnvSpacingToken>('l');

  const selectStyle: React.CSSProperties = {
    padding: '8px 10px',
    borderRadius: 8,
    border: `1px solid ${DOC_BORDER}`,
    fontSize: 13,
  };
  const labelStyle: React.CSSProperties = { fontSize: 12, color: DOC_MUTED, display: 'grid', gap: 4 };

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <label style={labelStyle}>
          Raio
          <select
            value={radius}
            onChange={(event) => setRadius(event.target.value as RadiusKey)}
            style={selectStyle}
          >
            {(Object.keys(unvRadius) as RadiusKey[]).map((key) => (
              <option key={key} value={key}>
                {key} · {unvRadius[key]}px
              </option>
            ))}
          </select>
        </label>
        <label style={labelStyle}>
          Espaçamento interno
          <select
            value={padding}
            onChange={(event) => setPadding(event.target.value as UnvSpacingToken)}
            style={selectStyle}
          >
            {unvSpacingOrder.map((key) => (
              <option key={key} value={key}>
                {key} · {unvSpacing[key]}px
              </option>
            ))}
          </select>
        </label>
      </div>

      <UnvDocThemeSwitcher surface="secondary" padding={24}>
        {() => (
          <div
            style={{
              background: 'var(--unv-color-background-primary)',
              color: 'var(--unv-color-text-primary)',
              fontFamily: 'var(--unv-font-sans)',
              fontSize: 'var(--unv-font-body-lg-size)',
              lineHeight: 'var(--unv-font-body-lg-line)',
              borderRadius: Math.min(unvRadius[radius], 60),
              padding: unvSpacing[padding],
              minWidth: 240,
            }}
          >
            raio {unvRadius[radius]}px · recuo {unvSpacing[padding]}px
          </div>
        )}
      </UnvDocThemeSwitcher>
    </div>
  );
};

/**
 * Página de documentação rica de espaçamento, raios e layout.
 */
const EspacamentoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Fundamentos • Espaçamento & Layout"
      title="Espaçamento & Layout"
      description="Sistema de medidas das telas do Unoovista, pensado para uma tela de referência de 375×812. Cobre a escala de espaçamento de 2px a 48px, seis raios de borda mais generosos em degraus de 4px, a calha lateral de 16px, as alturas estruturais da barra superior e da doca flutuante, os diâmetros de avatar, a escala de ícones de 16px a 32px e o alvo mínimo de toque de 44px."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Como o produto organiza a grade vertical e horizontal."
    />
    <UnvDocGrid>
      <UnvDocCard icon="📐" title="Uma calha lateral">
        As telas e os cartões usam <code>--unv-gutter</code> ({unvGutter}px) como recuo lateral. Os
        cartões de publicação recuam o conteúdo em <code>--unv-spacing-l</code> (também 16px).
      </UnvDocCard>
      <UnvDocCard icon="🫧" title="Raios generosos">
        Cartões e mídia usam 12px e 16px; campos, chips, botões e a doca são cápsulas
        (<code>--unv-radius-full</code>); controles pequenos usam 8px. Quem tem story ou transmissão
        usa recorte arredondado de 32%, e o círculo fica para o avatar sem anel.
      </UnvDocCard>
      <UnvDocCard icon="🏛️" title="Alturas estruturais">
        Barra superior de {unvLayout.topBarHeight}px (44px de status mais 44px de conteúdo) e doca
        flutuante em cápsula de {unvLayout.tabBarContentHeight}px, dentro de uma zona de{' '}
        {unvLayout.tabBarHeight}px com o recuo inferior.
      </UnvDocCard>
      <UnvDocCard icon="👆" title="Alvo de toque de 44px">
        Todo controle interativo tem ao menos <code>--unv-touch-target</code> ({TOUCH_TARGET}px) de
        altura e de largura efetiva, mesmo quando o glifo é de 24px.
      </UnvDocCard>
      <UnvDocCard icon="⭕" title="Cinco diâmetros de avatar">
        20, 24, 32, 56 e 80px, medidos no recorte interno. O anel soma 2px de traço e 3px de folga
        (<code>--unv-avatar-ring-width</code> e <code>--unv-avatar-ring-gap</code>) por fora.
      </UnvDocCard>
      <UnvDocCard icon="🔣" title="Escala de ícones da Unooria">
        Três degraus — 16, 24 e 32px —, os mesmos da Plataforma Unooria. O glifo Material ocupa
        cerca de 83% da caixa, então o degrau nomeia a aresta da caixa, não o traço.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas de referência e decisões registradas."
    />
    <UnvDocSpecs
      component="../tokens/spacing.css"
      layout="Tela de referência · 375 × 812"
      specs={[
        { label: 'Tela de referência', value: '375 × 812 px' },
        { label: 'Calha lateral', value: `${unvGutter}px` },
        { label: 'Barra superior', value: `${unvLayout.topBarHeight}px` },
        { label: 'Doca (cápsula)', value: `${unvLayout.tabBarContentHeight}px` },
        { label: 'Alvo de toque', value: `${TOUCH_TARGET}px` },
        { label: 'Fio de separação', value: '1px · --unv-color-border-subtle' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Escala própria de espaçamento',
          detail:
            'os onze degraus (2, 4, 6, 8, 10, 12, 16, 20, 24, 32 e 48px) são medidas do módulo, e não os degraus de --unooria-spacing-*: as linhas de altura fixa pedem passos finos, como 6px e 10px, que a régua de 4 e 8px da plataforma deslocaria.',
        },
        {
          subject: 'Raios mais generosos, em degraus de 4px',
          detail:
            'xs 4, s 8, m 12, l 16, xl 24 e full 1000px. Cartões e mídia partem de 12px, campos e botões viram cápsulas, e o recorte de 32% das molduras com story é uma proporção, não um degrau.',
        },
        {
          subject: 'Doca flutuante em vez de barra de largura total',
          detail:
            'a doca é uma cápsula afastada das bordas dentro de uma zona de 79px, com sombra de sobreposição. A altura estrutural do módulo continua reservando a zona inteira para que o conteúdo role sob a doca sem ser coberto.',
        },
        {
          subject: 'Alvo de toque de 44px',
          detail:
            '--unv-touch-target fixa o mínimo de todo controle interativo. Botões circulares da barra superior, itens da doca e chips respeitam a medida, mesmo com glifos de 24px.',
        },
        {
          subject: 'Fios de 1px no lugar de hairlines finas',
          detail:
            'os divisores e o fio da barra têm 1px em border-subtle ou border-bar. O módulo não usa contornos de 0,33px, e a maior parte da separação vem da mudança de superfície.',
        },
        {
          subject: 'Escala de ícones da plataforma',
          detail:
            '--unv-icon-size-sm, -md e -lg reaproveitam os degraus da Unooria (16, 24 e 32px). O tamanho é a aresta da caixa quadrada, e o glifo Material preenche cerca de 83% dela.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Escala de espaçamento"
      description="Onze degraus de 2px a 48px."
    />
    <div style={{ marginBottom: 32 }}>
      {unvSpacingOrder.map((token) => (
        <SpacingRuler key={token} token={token} />
      ))}
    </div>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Raios de borda"
      description="Seis raios, de 4px à cápsula, e o recorte de 32% das molduras com story ou transmissão."
    />
    <UnvDocStage surface="secondary" padding={24}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 24,
        }}
      >
      {(Object.keys(unvRadius) as RadiusKey[]).map((key) => (
        <div key={key} style={{ textAlign: 'center', maxWidth: 110 }}>
          <div
            style={{
              width: 72,
              height: 72,
              margin: '0 auto',
              borderRadius: `var(--unv-radius-${key})`,
              background: 'var(--unv-color-background-primary)',
              border: '1px solid var(--unv-color-border-default)',
            }}
          />
          <Label>
            {key} · {unvRadius[key]}px
          </Label>
          <div
            style={{
              color: 'var(--unv-color-text-secondary)',
              fontFamily: 'var(--unv-font-sans)',
              fontSize: 'var(--unv-font-caption-md-size)',
              lineHeight: 'var(--unv-font-caption-md-line)',
            }}
          >
            {RADIUS_USAGE[key]}
          </div>
        </div>
      ))}
      <div style={{ textAlign: 'center', maxWidth: 110 }}>
        <div
          style={{
            width: 72,
            height: 72,
            margin: '0 auto',
            borderRadius: '32%',
            background: 'var(--unv-color-background-primary)',
            border: '1px solid var(--unv-color-border-default)',
          }}
        />
        <Label>recorte 32%</Label>
        <div
          style={{
            color: 'var(--unv-color-text-secondary)',
            fontFamily: 'var(--unv-font-sans)',
            fontSize: 'var(--unv-font-caption-md-size)',
            lineHeight: 'var(--unv-font-caption-md-line)',
          }}
        >
          Avatar com anel e bolha de story.
        </div>
      </div>
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Estrutura da tela"
      description="Zonas da tela de referência: barra superior, conteúdo e doca flutuante."
    />
    <ScreenSchematic />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Avatares, ícones e alvo de toque"
      description="Diâmetros do avatar real, escala de ícones e o alvo mínimo de 44px."
    />
    <UnvDocStage label="Avatares sem anel (círculo) e com anel de story (recorte de 32%)" surface="primary" padding={24} gap={28}>
      {(Object.keys(unvAvatarSizes) as (keyof typeof unvAvatarSizes)[]).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              justifyContent: 'center',
              height: 96,
            }}
          >
            <Avatar initials="MC" size={size} />
            <Avatar initials="MC" size={size} ring="story" />
          </div>
          <Label>
            {size} · {unvAvatarSizes[size]}px
            <br />
            --unv-avatar-{size}
          </Label>
        </div>
      ))}
    </UnvDocStage>
    <UnvDocStage label="Escala de ícones (--unv-icon-size-*)" surface="primary" padding={24} gap={40}>
      {(Object.keys(unvIconSizes) as (keyof typeof unvIconSizes)[]).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="search" size={size} />
          </div>
          <Label>
            {size} · {unvIconSizes[size]}px
          </Label>
        </div>
      ))}
    </UnvDocStage>
    <UnvDocStage label="Alvo mínimo de toque (--unv-touch-target)" surface="primary" padding={24} gap={32}>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: TOUCH_TARGET,
            height: TOUCH_TARGET,
            boxSizing: 'border-box',
            border: '1px dashed var(--unv-color-border-control)',
            borderRadius: 'var(--unv-radius-full)',
            background: 'var(--unv-color-fill-field)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="heart" size="md" />
        </div>
        <Label>
          44 × 44px
          <br />
          glifo de 24px
        </Label>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            height: TOUCH_TARGET,
            boxSizing: 'border-box',
            padding: '0 var(--unv-spacing-l)',
            border: '1px dashed var(--unv-color-border-control)',
            borderRadius: 'var(--unv-radius-full)',
            background: 'var(--unv-color-fill-field)',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--unv-color-text-primary)',
            fontFamily: 'var(--unv-font-sans)',
            fontSize: 'var(--unv-font-title-sm-size)',
            fontWeight: 'var(--unv-font-title-sm-weight)' as React.CSSProperties['fontWeight'],
          }}
        >
          Seguir
        </div>
        <Label>44px de altura</Label>
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Laboratório de caixa e suporte a temas"
      description="Combine raio e espaçamento interno e alterne entre o tema claro e o escuro. As medidas são as mesmas nos dois temas; só as superfícies mudam."
    />
    <BoxLab />

    <UnooriaDocSectionHeader barColor={BAR} title="8. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Usar --unv-gutter (16px) como recuo lateral das telas e --unv-spacing-l dentro dos cartões.',
        'Dar a todo controle interativo ao menos --unv-touch-target (44px), mesmo com glifo menor.',
        'Usar cápsula (--unv-radius-full) em botões, chips, campos e na doca.',
        'Dimensionar ícones pelos degraus --unv-icon-size-* e lembrar que o valor é a aresta da caixa.',
        'Usar os diâmetros exatos de avatar em vez de arredondar; o anel é somado por fora.',
        'Reservar o recuo inferior da doca (79px) ao final do conteúdo rolável.',
      ]}
      donts={[
        'Aplicar uma grade uniforme de 8px: a escala tem degraus finos de 2px, 4px e 6px que as linhas exigem.',
        'Introduzir raios intermediários que não existem na escala.',
        'Usar contornos de 0,33px ou fios de largura total para separar barras.',
        'Usar círculo perfeito na moldura de quem tem story ou transmissão: o recorte de 32% é a pista de forma.',
        'Reduzir o alvo de toque abaixo de 44px para caber mais controles.',
        'Consumir --unooria-spacing-* dentro do módulo: o Unoovista tem os próprios tokens.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="9. Referência completa dos tokens" />
    <UnvDocPropsTable
      title="Escala de espaçamento"
      rows={unvSpacingOrder.map((key) => ({
        name: key,
        type: `--unv-spacing-${key}`,
        default: `${unvSpacing[key]}px`,
        description: unvSpacingUsage[key],
      }))}
    />
    <UnvDocPropsTable
      title="Raios de borda"
      rows={(Object.keys(unvRadius) as RadiusKey[]).map((key) => ({
        name: key,
        type: `--unv-radius-${key}`,
        default: `${unvRadius[key]}px`,
        description: RADIUS_USAGE[key],
      }))}
    />
    <UnvDocPropsTable
      title="Dimensões estruturais"
      rows={[
        {
          name: 'gutter',
          type: '--unv-gutter',
          default: `${unvGutter}px`,
          description: 'Calha lateral das telas.',
        },
        ...LAYOUT_ROWS.map((row) => ({
          name: row.key,
          type: row.cssVar,
          default: `${unvLayout[row.key]}px`,
          description: row.description,
        })),
        {
          name: 'touchTarget',
          type: '--unv-touch-target',
          default: `${TOUCH_TARGET}px`,
          description: 'Alvo mínimo de toque de todo controle interativo.',
        },
      ]}
    />
    <UnvDocPropsTable
      title="Avatares"
      rows={[
        ...(Object.keys(unvAvatarSizes) as (keyof typeof unvAvatarSizes)[]).map((key) => ({
          name: key,
          type: `--unv-avatar-${key}`,
          default: `${unvAvatarSizes[key]}px`,
          description: 'Diâmetro do recorte interno do avatar, sem o anel.',
        })),
        {
          name: 'ringWidth',
          type: '--unv-avatar-ring-width',
          default: '2px',
          description: 'Espessura do anel de story ou de transmissão.',
        },
        {
          name: 'ringGap',
          type: '--unv-avatar-ring-gap',
          default: '3px',
          description: 'Folga entre o recorte e o anel, na cor do fundo da tela.',
        },
      ]}
    />
    <UnvDocPropsTable
      title="Escala de ícones"
      rows={(Object.keys(unvIconSizes) as (keyof typeof unvIconSizes)[]).map((key) => ({
        name: key,
        type: `--unv-icon-size-${key}`,
        default: `${unvIconSizes[key]}px`,
        description: 'Aresta da caixa quadrada do glifo; degrau de --unooria-icon-size-* da Plataforma Unooria.',
      }))}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoovista/Fundamentos/Espaçamento & Layout',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa do sistema de medidas, com a escala, os raios, as estruturas e a escala de ícones do módulo.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <EspacamentoDocumentationPage />,
};

/**
 * Escala de espaçamento em réguas visuais.
 */
export const Escala: Story = {
  name: '🎨 Escala de espaçamento',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Escala de espaçamento" />
      {unvSpacingOrder.map((token) => (
        <SpacingRuler key={token} token={token} />
      ))}
    </UnooriaDocShell>
  ),
};

/**
 * Laboratório interativo de raio e espaçamento interno.
 */
export const Laboratorio: Story = {
  name: '🕹️ Laboratório de caixa',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Laboratório de caixa" />
      <BoxLab />
    </UnooriaDocShell>
  ),
};

/**
 * Estrutura da tela de referência com barra superior, conteúdo e doca.
 */
export const EstruturaDaTela: Story = {
  name: '🎨 Estrutura da tela',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Estrutura da tela" />
      <ScreenSchematic />
    </UnooriaDocShell>
  ),
};
