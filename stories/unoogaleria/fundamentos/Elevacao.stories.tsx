import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import {
  uglBlurBar,
  uglColorTokens,
  uglElevation,
  uglInvariantColors,
  type UglTheme,
} from '../../../src/unoogaleria/tokens';
import { Icon } from '../../../src/unoogaleria/components/Icon';
import { IconButton } from '../../../src/unoogaleria/components/IconButton';
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
import { uglDemoNow, uglPhotos } from '../fixtures';
import { uglFormatDayLabel, uglFormatTime } from '../../../src/unoogaleria/media';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const DOC = {
  text: 'var(--ugl-color-text-primary)',
  muted: 'var(--ugl-color-text-secondary)',
} as const;

const THEME_LABEL: Record<UglTheme, string> = { light: 'Tema claro', dark: 'Tema escuro' };

const viewerItem = uglPhotos[1];

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--ugl-font-sans)',
  fontSize: 'var(--ugl-font-label-size)',
  lineHeight: 'var(--ugl-font-label-line)',
  fontWeight: 'var(--ugl-font-label-weight)' as React.CSSProperties['fontWeight'],
  color: 'var(--ugl-color-text-primary)',
};

/**
 * Cartão flutuante com a sombra de sobreposição, sobre a superfície da tela, em
 * um tema. É o que uma folha, um menu ou um aviso recebem.
 */
const OverlaySample: React.FC<{ theme: UglTheme }> = ({ theme }) => (
  <UglDocStage label={THEME_LABEL[theme]} theme={theme} surface="primary" padding={32}>
    <div
      data-ugl-overlay-sample={theme}
      style={{
        width: 240,
        padding: 'var(--ugl-spacing-l)',
        borderRadius: 'var(--ugl-radius-l)',
        background: 'var(--ugl-color-background-elevated)',
        boxShadow: 'var(--ugl-elevation-overlay)',
        display: 'grid',
        gap: 'var(--ugl-spacing-xs)',
      }}
    >
      <span style={labelStyle}>Menu de opções</span>
      {(['addToAlbum', 'duplicate', 'hide'] as const).map((icon) => (
        <span key={icon} style={{ display: 'flex', alignItems: 'center', gap: 10, ...labelStyle, fontWeight: 400 }}>
          <Icon name={icon} size="sm" tone="secondary" />
          {icon === 'addToAlbum' ? 'Adicionar a um álbum' : icon === 'duplicate' ? 'Duplicar' : 'Ocultar'}
        </span>
      ))}
    </div>
    <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ugl-color-text-secondary)', maxWidth: 220 }}>
      {uglColorTokens.elevationOverlay[theme].value}
    </span>
  </UglDocStage>
);

/** Os dois fios de 1px, numa lista agrupada, em um tema. */
const HairlineSample: React.FC<{ theme: UglTheme }> = ({ theme }) => (
  <UglDocStage label={THEME_LABEL[theme]} theme={theme} surface="secondary" direction="column" align="stretch" gap={0} padding={0}>
    <div
      style={{
        height: 'var(--ugl-topbar-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ugl-color-surface-bar)',
        boxShadow: 'var(--ugl-elevation-hairline-bottom)',
        ...labelStyle,
      }}
    >
      Barra superior · hairline-bottom
    </div>
    <div style={{ height: 80 }} />
    <div
      style={{
        height: 'var(--ugl-tabbar-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ugl-color-surface-bar)',
        boxShadow: 'var(--ugl-elevation-hairline-top)',
        ...labelStyle,
      }}
    >
      Barra de abas · hairline-top
    </div>
  </UglDocStage>
);

/**
 * Barra translúcida com desfoque sobre a grade: a foto passa por baixo e a
 * barra continua legível.
 */
const BlurSample: React.FC<{ theme: UglTheme }> = ({ theme }) => (
  <UglDocStage label={THEME_LABEL[theme]} theme={theme} padding={0} align="stretch">
    <div style={{ position: 'relative', width: '100%', height: 220, overflow: 'hidden', borderRadius: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--ugl-grid-gap)' }}>
        {uglPhotos.slice(0, 9).map((item) => (
          <img
            key={item.id}
            src={item.src}
            alt=""
            style={{ display: 'block', width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', background: 'var(--ugl-color-background-tertiary)' }}
          />
        ))}
      </div>
      <div
        data-ugl-blur-sample={theme}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 'var(--ugl-tabbar-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          background: 'var(--ugl-color-surface-bar)',
          backdropFilter: 'blur(var(--ugl-blur-bar))',
          WebkitBackdropFilter: 'blur(var(--ugl-blur-bar))',
          boxShadow: 'var(--ugl-elevation-hairline-top)',
        }}
      >
        <Icon name="libraryFilled" tone="accent" />
        <Icon name="albums" tone="secondary" />
        <Icon name="memories" tone="secondary" />
        <Icon name="search" tone="secondary" />
      </div>
    </div>
  </UglDocStage>
);

/**
 * A superfície imersiva do visualizador: fundo escuro invariante, barras
 * translúcidas e controles circulares sobre a foto. `data-ugl-immersive`
 * declara o contexto, como o visualizador faz.
 */
const ImmersiveSample: React.FC<{ theme: UglTheme }> = ({ theme }) => (
  <UglDocStage label={`${THEME_LABEL[theme]} (a superfície imersiva não muda)`} theme={theme} padding={0} align="stretch">
    <div
      data-ugl-immersive=""
      style={{
        position: 'relative',
        width: '100%',
        height: 300,
        overflow: 'hidden',
        borderRadius: 12,
        background: 'var(--ugl-color-immersive-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={viewerItem.src}
        alt={viewerItem.alt}
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 var(--ugl-spacing-xs)',
          height: 'var(--ugl-toolbar-height)',
          background: 'var(--ugl-color-immersive-bar)',
          backdropFilter: 'blur(var(--ugl-blur-bar))',
          WebkitBackdropFilter: 'blur(var(--ugl-blur-bar))',
        }}
      >
        <IconButton icon="back" label="Fechar visualizador" variant="bar" />
        <div style={{ flex: 1, fontFamily: 'var(--ugl-font-sans)' }}>
          <div
            style={{
              color: 'var(--ugl-color-immersive-text)',
              fontSize: 'var(--ugl-font-label-size)',
              fontWeight: 'var(--ugl-font-label-weight)' as React.CSSProperties['fontWeight'],
            }}
          >
            {uglFormatDayLabel(viewerItem.takenAt, { now: uglDemoNow })}
          </div>
          <div style={{ color: 'var(--ugl-color-immersive-text-secondary)', fontSize: 'var(--ugl-font-caption-size)' }}>
            {uglFormatTime(viewerItem.takenAt)}
            {viewerItem.location ? ` · ${viewerItem.location}` : ''}
          </div>
        </div>
        <IconButton icon="more" label="Mais opções" variant="immersive" />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 'var(--ugl-toolbar-height)',
          background: 'var(--ugl-color-immersive-bar)',
          backdropFilter: 'blur(var(--ugl-blur-bar))',
          WebkitBackdropFilter: 'blur(var(--ugl-blur-bar))',
        }}
      >
        <IconButton icon="share" label="Compartilhar" variant="bar" />
        <IconButton icon="favoriteFilled" label="Favoritar" variant="bar" pressed pressedTone="favorite" />
        <IconButton icon="info" label="Informações" variant="bar" pressed={false} />
        <IconButton icon="edit" label="Editar" variant="bar" />
        <IconButton icon="delete" label="Excluir" variant="bar" />
      </div>
    </div>
  </UglDocStage>
);

/**
 * Página de documentação rica de elevação.
 */
const ElevacaoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Fundamentos • Elevação"
      title="Elevação"
      description="A galeria é plana: a grade, as listas e as barras se separam por camada de superfície, por fios de 1px e por desfoque. Há uma única sombra — --ugl-elevation-overlay, definida por tema — e ela é reservada às camadas que flutuam sobre a tela. O visualizador e o editor não sobem por sombra: trocam de superfície para o imersivo."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UglDocGrid>
      <UglDocCard icon="🪟" title="Sobreposição">
        <code>--ugl-elevation-overlay</code> em folhas, menus, diálogos, avisos e no controle
        segmentado flutuante. Nenhum outro elemento recebe sombra.
      </UglDocCard>
      <UglDocCard icon="➖" title="Fios">
        <code>--ugl-elevation-hairline-bottom</code> sob a barra superior e{' '}
        <code>-top</code> sobre a barra de abas e a de seleção.
      </UglDocCard>
      <UglDocCard icon="🌫️" title="Desfoque">
        Barras translúcidas em <code>--ugl-color-surface-bar</code> com{' '}
        <code>blur(var(--ugl-blur-bar))</code>: a grade corre por baixo e a barra continua legível.
      </UglDocCard>
      <UglDocCard icon="🌌" title="Imersivo">
        Visualizador e editor trocam a superfície para <code>--ugl-color-immersive-surface</code>,
        com barras em <code>--ugl-color-immersive-bar</code>. A camada vem de{' '}
        <code>--ugl-z-viewer</code>, não de sombra.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="../tokens"
      layout="Uma sombra · dois fios · um desfoque"
      specs={[
        { label: 'Sombra no claro', value: uglColorTokens.elevationOverlay.light.value },
        { label: 'Sombra no escuro', value: uglColorTokens.elevationOverlay.dark.value },
        { label: 'Origem (claro)', value: uglColorTokens.elevationOverlay.light.unooria },
        { label: 'Origem (escuro)', value: uglColorTokens.elevationOverlay.dark.unooria },
        { label: 'Fio inferior', value: uglElevation.hairlineBottom },
        { label: 'Fio superior', value: uglElevation.hairlineTop },
        { label: 'Desfoque das barras', value: `${uglBlurBar}px · --unooria-blur-400` },
        { label: 'Barra imersiva', value: uglInvariantColors.immersiveBar.value },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Uma sombra só',
          detail:
            'a grade e as listas não têm sombra; a hierarquia vem da camada (primária, secundária, elevada). Sombra em miniatura faria o mosaico parecer uma pilha de cartões.',
        },
        {
          subject: 'Halo claro no escuro',
          detail:
            'uma sombra escura some sobre roxo profundo; no tema escuro o overlay é o halo claro --unooria-elevation-neutral-2, e a camada elevada (brandpurple-800) já se distingue da tela (brandpurple-900).',
        },
        {
          subject: 'Fios por box-shadow',
          detail:
            'os fios de 1px são box-shadow sem desfoque, e não border: não ocupam altura e não deslocam o conteúdo das barras de altura fixa.',
        },
        {
          subject: 'Desfoque de 16px',
          detail:
            'o degrau --unooria-blur-400 é o menor em que a miniatura por baixo deixa de competir com o rótulo da aba. Componentes que usam backdrop-filter também declaram o prefixo -webkit-.',
        },
        {
          subject: 'Imersivo por superfície, não por sombra',
          detail:
            'o visualizador ocupa a tela inteira e declara data-ugl-immersive; o PhoneFrame lê o atributo e passa a barra de status e a de gesto para branco.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia da profundidade"
      description="De baixo para cima, dentro da tela."
    />
    <UglDocAnatomy
      zones={[
        { name: 'Tela e grade', role: 'Plana, sem sombra.', token: '--ugl-color-background-primary' },
        { name: 'Barras translúcidas', role: 'Desfoque e fio de 1px, na camada --ugl-z-bar.', token: '--ugl-color-surface-bar · --ugl-elevation-hairline-*' },
        { name: 'Visualizador e editor', role: 'Superfície imersiva em --ugl-z-viewer.', token: '--ugl-color-immersive-surface · --ugl-color-immersive-bar' },
        { name: 'Folhas e menus', role: 'Sobre o véu, com a sombra de sobreposição, em --ugl-z-sheet.', token: '--ugl-elevation-overlay · --ugl-color-overlay-scrim' },
        { name: 'Diálogos e avisos', role: 'A mesma sombra, em --ugl-z-dialog e --ugl-z-toast.', token: '--ugl-elevation-overlay' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz" />
    <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC.text }}>Sombra de sobreposição</h4>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <OverlaySample theme="light" />
      <OverlaySample theme="dark" />
    </div>
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Fios de 1px</h4>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <HairlineSample theme="light" />
      <HairlineSample theme="dark" />
    </div>
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Desfoque das barras</h4>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <BlurSample theme="light" />
      <BlurSample theme="dark" />
    </div>
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Superfície imersiva</h4>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <ImmersiveSample theme="light" />
      <ImmersiveSample theme="dark" />
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Aplicar --ugl-elevation-overlay só a folhas, menus, diálogos, avisos e ao controle flutuante.',
        'Separar barras da grade com os fios --ugl-elevation-hairline-* e com o desfoque.',
        'Declarar data-ugl-immersive no contêiner do visualizador e do editor, para o cromo do aparelho acompanhar.',
        'Declarar backdrop-filter com o prefixo -webkit- junto.',
      ]}
      donts={[
        'Dar sombra a miniatura, cartão de álbum, linha de lista ou barra.',
        'Inventar uma segunda sombra ou uma sombra por componente.',
        'Usar border no lugar do fio em barras de altura fixa.',
        'Escurecer a tela com a sombra em vez de usar o véu --ugl-color-overlay-scrim.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A sombra muda de natureza com o tema; a superfície imersiva não muda."
    />
    <UglDocThemeSwitcher surface="secondary">
      {() => (
        <>
          <div
            style={{
              padding: 'var(--ugl-spacing-l)',
              borderRadius: 'var(--ugl-radius-l)',
              background: 'var(--ugl-color-background-elevated)',
              boxShadow: 'var(--ugl-elevation-overlay)',
              display: 'flex',
              gap: 12,
            }}
          >
            <Button variant="secondary">Cancelar</Button>
            <Button variant="danger">Excluir</Button>
          </div>
          <div
            style={{
              padding: 'var(--ugl-spacing-m) var(--ugl-spacing-l)',
              borderRadius: 'var(--ugl-radius-m)',
              background: 'var(--ugl-color-toast-surface)',
              color: 'var(--ugl-color-toast-text)',
              boxShadow: 'var(--ugl-elevation-overlay)',
              fontFamily: 'var(--ugl-font-sans)',
              fontSize: 'var(--ugl-font-body-md-size)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Icon name="checkCircle" size="sm" tone="inherit" />
            Adicionada a Favoritos
          </div>
        </>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa da API de elevação" />
    <UglDocPropsTable
      title="Tokens"
      rows={[
        {
          name: '--ugl-elevation-overlay',
          type: 'box-shadow',
          default: uglColorTokens.elevationOverlay.light.value,
          description: `Sombra de sobreposição. No escuro: ${uglColorTokens.elevationOverlay.dark.value}.`,
        },
        { name: '--ugl-elevation-hairline-bottom', type: 'box-shadow', default: uglElevation.hairlineBottom, description: 'Fio sob a barra superior.' },
        { name: '--ugl-elevation-hairline-top', type: 'box-shadow', default: uglElevation.hairlineTop, description: 'Fio sobre a barra de abas e a de seleção.' },
        { name: '--ugl-blur-bar', type: 'px', default: `${uglBlurBar}px`, description: 'Desfoque das barras translúcidas.' },
        { name: '--ugl-color-surface-bar', type: 'cor', default: uglColorTokens.surfaceBar.light.value, description: `Fundo das barras translúcidas. No escuro: ${uglColorTokens.surfaceBar.dark.value}.` },
        { name: '--ugl-color-immersive-bar', type: 'cor', default: uglInvariantColors.immersiveBar.value, description: 'Barras do visualizador e do editor (invariante).' },
      ]}
    />
    <UglDocPropsTable
      title="Exportações"
      rows={[
        { name: 'uglColorTokens.elevationOverlay', type: 'UglColorToken', description: 'A sombra de sobreposição por tema, com a origem.' },
        { name: 'uglElevation', type: '{ hairlineBottom; hairlineTop }', description: 'Os dois fios, como declarados em spacing.css.' },
        { name: 'uglBlurBar', type: 'number', description: 'Desfoque das barras, em pixels.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoogaleria/Fundamentos/Elevação',
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa de elevação.
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <OverlaySample theme="light" />
      <OverlaySample theme="dark" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const shadowOf = (theme: UglTheme) =>
      getComputedStyle(canvasElement.querySelector<HTMLElement>(`[data-ugl-overlay-sample="${theme}"]`)!).boxShadow;
    await expect(shadowOf('light')).not.toBe('none');
    await expect(shadowOf('dark')).not.toBe('none');
    await expect(shadowOf('light')).not.toBe(shadowOf('dark'));
  },
};

/**
 * Fios e desfoque das barras translúcidas.
 */
export const Barras: Story = {
  name: 'Fios e desfoque',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <HairlineSample theme="light" />
      <HairlineSample theme="dark" />
      <BlurSample theme="light" />
      <BlurSample theme="dark" />
    </div>
  ),
};

/**
 * A superfície imersiva do visualizador, igual nos dois temas.
 */
export const Imersivo: Story = {
  name: 'Superfície imersiva',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <ImmersiveSample theme="light" />
      <ImmersiveSample theme="dark" />
    </div>
  ),
};
