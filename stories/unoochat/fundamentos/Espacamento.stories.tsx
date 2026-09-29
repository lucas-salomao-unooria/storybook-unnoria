import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocPractices,
  UncDocPropsTable,
  UncDocStage,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import {
  uncSpacing,
  uncRadii,
  uncLayout,
  uncAvatarSizes,
  uncFabSizes,
} from '../../../src/unoochat/tokens';
import { Icon } from '../../../src/unoochat';

const BAR = '#716C98';

const ICON_SIZES = [
  { key: 'xs', value: 16, unooria: '--unooria-icon-size-3xs' },
  { key: 'sm', value: 18, unooria: '--unooria-icon-size-xxs' },
  { key: 'md', value: 20, unooria: '--unooria-icon-size-xs' },
  { key: 'lg', value: 24, unooria: '--unooria-icon-size-s' },
  { key: 'xl', value: 32, unooria: '--unooria-icon-size-m' },
] as const;

/**
 * Régua visual de um degrau da escala de espaçamento.
 */
const SpacingRuler: React.FC<{ token: string; value: string }> = ({ token, value }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '150px 70px 1fr',
      alignItems: 'center',
      gap: 12,
      padding: '8px 0',
      borderBottom: '1px solid #E4E8E9',
    }}
  >
    <code style={{ fontSize: 12, color: '#57547D' }}>--unc-spacing-{token}</code>
    <span style={{ fontSize: 12, color: '#475157' }}>{value}</span>
    <span
      style={{
        display: 'block',
        height: 14,
        width: value,
        borderRadius: 3,
        background: BAR,
      }}
    />
  </div>
);

/**
 * Simulador que aplica raio e espaçamento a uma superfície de exemplo, nos dois temas.
 */
const BoxLab: React.FC = () => {
  const [radius, setRadius] = useState<keyof typeof uncRadii>('xl');
  const [padding, setPadding] = useState<keyof typeof uncSpacing>('l');

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <label style={{ fontSize: 12, color: '#475157', display: 'grid', gap: 4 }}>
          Raio
          <select
            value={radius}
            onChange={(event) => setRadius(event.target.value as keyof typeof uncRadii)}
            style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #E4E8E9', fontSize: 13 }}
          >
            {Object.entries(uncRadii).map(([key, value]) => (
              <option key={key} value={key}>
                {key} · {value}
              </option>
            ))}
          </select>
        </label>
        <label style={{ fontSize: 12, color: '#475157', display: 'grid', gap: 4 }}>
          Espaçamento interno
          <select
            value={padding}
            onChange={(event) => setPadding(event.target.value as keyof typeof uncSpacing)}
            style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #E4E8E9', fontSize: 13 }}
          >
            {Object.entries(uncSpacing).map(([key, value]) => (
              <option key={key} value={key}>
                {key} · {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <UncDocThemeSwitcher surface="canvas" padding={24}>
        {() => (
          <div
            style={{
              background: 'var(--unc-color-surface-sheet)',
              color: 'var(--unc-color-text-primary)',
              fontFamily: 'var(--unc-font-sans)',
              fontSize: 'var(--unc-font-body-lg-size)',
              borderRadius: uncRadii[radius],
              padding: uncSpacing[padding],
            }}
          >
            raio {uncRadii[radius]} · padding {uncSpacing[padding]}
          </div>
        )}
      </UncDocThemeSwitcher>
    </div>
  );
};

/**
 * Página de documentação rica de espaçamento, raios e layout.
 */
const EspacamentoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Fundamentos • Espaçamento & Layout"
      title="Espaçamento & Layout"
      description="Sistema de medidas das telas do Unoochat, pensado para um aparelho de referência de 411×823. Cobre a escala de espaçamento de 2px a 48px, sete raios de borda, as calhas laterais de 19px e 24px, as alturas estruturais das barras, a escala de ícones de 16px a 32px e as medidas fixas de avatares e botões flutuantes."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Como o produto organiza a grade vertical e horizontal."
    />
    <UncDocGrid>
      <UncDocCard icon="📐" title="Duas calhas laterais">
        As listas usam <code>--unc-gutter</code> (19px) como recuo do conteúdo. As barras
        superiores usam <code>--unc-gutter-appbar</code> (24px), alinhado ao título da barra e ao
        recuo dos itens do menu.
      </UncDocCard>
      <UncDocCard icon="↕️" title="Passos de linha por lista">
        Cada lista tem a própria densidade: conversas 70px, status 68px, chamadas 69px, contatos
        63px e configurações 72px. A prop <code>density</code> do <code>ListItem</code> escolhe o
        passo.
      </UncDocCard>
      <UncDocCard icon="🏛️" title="Alturas estruturais">
        Barra de status 21px, barra principal 100px (título e abas), cabeçalho de conversa 52px, sub
        app bar 57px, cabeçalho de chamada 133px e barra de controles 87px.
      </UncDocCard>
      <UncDocCard icon="⭕" title="Medidas fixas">
        Avatares de 23, 32, 45 e 50px (mais o anel de 56px) e FABs de 41, 43, 52, 54 e 58px. São
        diâmetros próprios do módulo, não múltiplos de uma grade.
      </UncDocCard>
      <UncDocCard icon="🔣" title="Escala de ícones">
        Cinco degraus — 16, 18, 20, 24 e 32px —, os mesmos da Plataforma Unooria. O glifo Material
        ocupa cerca de 83% da caixa, então o degrau nomeia a aresta da caixa, não o traço.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas de referência e decisões registradas."
    />
    <UncDocSpecs
      component="../tokens/spacing.css"
      layout="Aparelho de referência · 411 × 823"
      specs={[
        { label: 'Aparelho de referência', value: '411 × 823 px' },
        { label: 'Calha de lista', value: '19px' },
        { label: 'Calha de barra', value: '24px' },
        { label: 'Passo de conversa', value: '70px' },
        { label: 'Divisor', value: '1px · --unc-color-border-divider' },
        { label: 'Escala de ícones', value: '16 · 18 · 20 · 24 · 32px' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Escala própria',
          detail:
            'espaçamento, raios e dimensões estruturais são medidas do módulo, e não os degraus de --unooria-spacing-*: as telas de mensageria usam passos como 6px, 10px e 19px, que a régua da plataforma não tem. Só a escala de ícones é a da Plataforma Unooria.',
        },
        {
          subject: 'Escala de ícones da plataforma',
          detail:
            '--unc-icon-size-xs a -xl reaproveitam os degraus --unooria-icon-size-3xs, -xxs, -xs, -s e -m (16, 18, 20, 24 e 32px). Como o glifo do Material Symbols preenche cerca de 83% da caixa, os tamanhos passados pelos componentes foram recalculados em relação a uma biblioteca vetorial de caixa justa.',
        },
        {
          subject: 'Altura da barra de status',
          detail:
            'o token adota 21px. A tela de chamada e os demais contextos podem pedir outra altura, e o componente aceita `height` para isso.',
        },
        {
          subject: 'Densidades de lista distintas',
          detail:
            'as cinco listas mantêm passos de linha diferentes (63 a 72px) em vez de uma altura única, porque o conteúdo de cada uma — preview de mensagem, seta de chamada, ação de configuração — pede uma respiração diferente.',
        },
        {
          subject: 'Sem grade uniforme de 8px',
          detail:
            'as medidas de tela não seguem uma grade de 8px. A escala de espaçamento é um agrupamento dos valores realmente usados, com degraus finos de 2px, 4px e 6px preservados.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Escala de espaçamento"
      description="Onze degraus de 2px a 48px."
    />
    <div style={{ marginBottom: 32 }}>
      {Object.entries(uncSpacing).map(([key, value]) => (
        <SpacingRuler key={key} token={key} value={value} />
      ))}
    </div>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Raios de borda"
      description="Sete raios, de 2px à pílula e ao círculo completo."
    />
    <UncDocStage surface="canvas" padding={24}>
      {Object.entries(uncRadii).map(([key, value]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: value,
              background: 'var(--unc-color-surface-sheet)',
              border: '1px solid var(--unc-color-border-dialog)',
            }}
          />
          <div
            style={{
              marginTop: 6,
              color: 'var(--unc-color-text-secondary)',
              fontFamily: 'var(--unc-font-sans)',
              fontSize: 12,
            }}
          >
            {key} · {value}
          </div>
        </div>
      ))}
    </UncDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Avatares, botões flutuantes e ícones"
      description="Diâmetros absolutos e a escala de ícones."
    />
    <UncDocStage label="Avatares e botões flutuantes" surface="canvas" padding={24}>
      {[
        ...Object.entries(uncAvatarSizes).map(([key, value]) => ({
          key: `avatar-${key}`,
          label: `avatar ${key}`,
          value,
          color: 'var(--unc-color-surface-appbar)',
        })),
        ...Object.entries(uncFabSizes).map(([key, value]) => ({
          key: `fab-${key}`,
          label: `fab ${key}`,
          value,
          color: 'var(--unc-color-accent)',
        })),
      ].map((item) => (
        <div key={item.key} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: item.value,
              height: item.value,
              borderRadius: '50%',
              background: item.color,
              border: '1px solid var(--unc-color-border-dialog)',
              boxSizing: 'border-box',
            }}
          />
          <div
            style={{
              marginTop: 6,
              color: 'var(--unc-color-text-secondary)',
              fontFamily: 'var(--unc-font-sans)',
              fontSize: 11,
            }}
          >
            {item.label}
            <br />
            {item.value}
          </div>
        </div>
      ))}
    </UncDocStage>
    <UncDocStage label="Escala de ícones (--unc-icon-size-*)" surface="canvas" padding={24} gap={32}>
      {ICON_SIZES.map((item) => (
        <div key={item.key} style={{ textAlign: 'center' }}>
          <Icon name="search" size={item.key} tone="appbar" />
          <div
            style={{
              marginTop: 6,
              color: 'var(--unc-color-text-secondary)',
              fontFamily: 'var(--unc-font-sans)',
              fontSize: 11,
            }}
          >
            {item.key} · {item.value}px
            <br />
            {item.unooria}
          </div>
        </div>
      ))}
    </UncDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Laboratório de caixa e suporte a temas"
      description="Combine raio e espaçamento interno e alterne entre o tema claro e o escuro. As medidas são as mesmas nos dois temas; só as superfícies mudam."
    />
    <BoxLab />

    <UnooriaDocSectionHeader barColor={BAR} title="7. Boas práticas" />
    <UncDocPractices
      dos={[
        'Usar --unc-gutter (19px) nas listas e --unc-gutter-appbar (24px) nas barras.',
        'Respeitar a densidade específica de cada lista via a prop `density` do ListItem.',
        'Aplicar --unc-radius-pill (20px) apenas ao campo do compositor.',
        'Dimensionar ícones pelos degraus --unc-icon-size-* e lembrar que o valor é a aresta da caixa.',
        'Usar os diâmetros exatos de avatar e FAB em vez de arredondar.',
      ]}
      donts={[
        'Aplicar uma grade uniforme de 8px: a escala não segue essa métrica.',
        'Usar a mesma altura de linha em todas as listas.',
        'Introduzir raios intermediários que não existem na escala.',
        'Alterar a altura da barra principal de 100px sem recalcular título e abas.',
        'Consumir --unooria-spacing-* dentro do módulo: o Unoochat tem os próprios tokens.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa dos tokens" />
    <UncDocPropsTable
      title="Escala de espaçamento"
      rows={Object.entries(uncSpacing).map(([key, value]) => ({
        name: key,
        type: `--unc-spacing-${key}`,
        default: value,
        description: 'Degrau da escala de espaçamento.',
      }))}
    />
    <UncDocPropsTable
      title="Raios de borda"
      rows={Object.entries(uncRadii).map(([key, value]) => ({
        name: key,
        type: `--unc-radius-${key}`,
        default: value,
        description: 'Raio de borda da escala do módulo.',
      }))}
    />
    <UncDocPropsTable
      title="Dimensões estruturais"
      rows={[
        { name: 'deviceWidth', type: '--unc-device-width', default: uncLayout.deviceWidth, description: 'Largura do aparelho de referência.' },
        { name: 'deviceHeight', type: '--unc-device-height', default: uncLayout.deviceHeight, description: 'Altura do aparelho de referência.' },
        { name: 'gutter', type: '--unc-gutter', default: uncLayout.gutter, description: 'Calha lateral das listas.' },
        { name: 'gutterAppbar', type: '--unc-gutter-appbar', default: uncLayout.gutterAppbar, description: 'Calha lateral das barras superiores.' },
        { name: 'statusBarHeight', type: '--unc-statusbar-height', default: uncLayout.statusBarHeight, description: 'Altura da barra de status do Android.' },
        { name: 'appBarHeight', type: '--unc-appbar-height', default: uncLayout.appBarHeight, description: 'Barra principal com título e abas.' },
        { name: 'appBarTitleHeight', type: '--unc-appbar-title-height', default: uncLayout.appBarTitleHeight, description: 'Cabeçalho da tela de conversa.' },
        { name: 'subAppBarHeight', type: '--unc-subappbar-height', default: uncLayout.subAppBarHeight, description: 'Barra de páginas internas.' },
        { name: 'tabRowHeight', type: '--unc-tabrow-height', default: uncLayout.tabRowHeight, description: 'Faixa de abas com indicador.' },
        { name: 'callHeaderHeight', type: '--unc-callheader-height', default: uncLayout.callHeaderHeight, description: 'Cabeçalho da tela de chamada.' },
        { name: 'callBarHeight', type: '--unc-callbar-height', default: uncLayout.callBarHeight, description: 'Barra de controles da chamada.' },
      ]}
    />
    <UncDocPropsTable
      title="Avatares e botões flutuantes"
      rows={[
        ...Object.entries(uncAvatarSizes).map(([key, value]) => ({
          name: `avatar ${key}`,
          type: `--unc-avatar-${key}`,
          default: value,
          description: 'Diâmetro fixo de avatar.',
        })),
        ...Object.entries(uncFabSizes).map(([key, value]) => ({
          name: `fab ${key}`,
          type: `--unc-fab-${key === 'endCall' ? 'endcall' : key}`,
          default: value,
          description: 'Diâmetro fixo de botão flutuante.',
        })),
      ]}
    />
    <UncDocPropsTable
      title="Escala de ícones"
      rows={ICON_SIZES.map((item) => ({
        name: item.key,
        type: `--unc-icon-size-${item.key}`,
        default: `${item.value}px`,
        description: `Aresta da caixa do glifo; degrau ${item.unooria} da Plataforma Unooria.`,
      }))}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoochat/Fundamentos/Espaçamento & Layout',
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
      {Object.entries(uncSpacing).map(([key, value]) => (
        <SpacingRuler key={key} token={key} value={value} />
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
