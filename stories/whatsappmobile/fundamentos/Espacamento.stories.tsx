import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  WaDocGrid,
  WaDocCard,
  WaDocFigmaSpecs,
  WaDocDeviations,
  WaDocPractices,
  WaDocPropsTable,
  WaDocStage,
} from '../../../.storybook/components';
import {
  waSpacing,
  waRadii,
  waLayout,
  waAvatarSizes,
  waFabSizes,
} from '../../../src/whatsappmobile/tokens';

const BAR = '#0CA996';

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
    <code style={{ fontSize: 12, color: '#6487C2' }}>--wa-spacing-{token}</code>
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
 * Simulador que aplica raio e espaçamento a uma superfície de exemplo.
 */
const BoxLab: React.FC = () => {
  const [radius, setRadius] = useState<keyof typeof waRadii>('xl');
  const [padding, setPadding] = useState<keyof typeof waSpacing>('l');

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <label style={{ fontSize: 12, color: '#475157', display: 'grid', gap: 4 }}>
          Raio
          <select
            value={radius}
            onChange={(event) => setRadius(event.target.value as keyof typeof waRadii)}
            style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #E4E8E9', fontSize: 13 }}
          >
            {Object.entries(waRadii).map(([key, value]) => (
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
            onChange={(event) => setPadding(event.target.value as keyof typeof waSpacing)}
            style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #E4E8E9', fontSize: 13 }}
          >
            {Object.entries(waSpacing).map(([key, value]) => (
              <option key={key} value={key}>
                {key} · {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <WaDocStage surface="canvas" padding={24}>
        <div
          style={{
            background: 'var(--wa-color-surface-sheet)',
            color: 'var(--wa-color-text-primary)',
            fontFamily: 'var(--wa-font-sans)',
            fontSize: 15,
            borderRadius: waRadii[radius],
            padding: waSpacing[padding],
          }}
        >
          raio {waRadii[radius]} · padding {waSpacing[padding]}
        </div>
      </WaDocStage>
    </div>
  );
};

/**
 * Página de documentação rica de espaçamento, raios e layout.
 */
const EspacamentoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Fundamentos • Espaçamento & Layout"
      title="Espaçamento & Layout"
      description="Sistema de medidas derivado dos setenta e cinco frames de 411×823 (Google Pixel 2 XL) do arquivo Figma. Cobre a escala de espaçamento de 2px a 48px, sete raios de borda, as calhas laterais de 19px e 24px, as alturas estruturais das barras e as medidas fixas de avatares e botões flutuantes."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Como o arquivo organiza a grade vertical e horizontal."
    />
    <WaDocGrid>
      <WaDocCard icon="📐" title="Duas calhas laterais">
        As listas usam <code>--wa-gutter</code> (19px), medida do contêiner de conteúdo do frame
        &quot;Chats Main Page&quot;. As barras superiores usam <code>--wa-gutter-appbar</code>{' '}
        (24px), alinhado à marca &quot;WhatsApp&quot;.
      </WaDocCard>
      <WaDocCard icon="↕️" title="Passos de linha por lista">
        Cada lista tem sua própria densidade: conversas 70px, status 68px, chamadas 69px, contatos
        63px e configurações 72px. Os tokens de densidade do <code>ListItem</code> preservam essa
        diferença.
      </WaDocCard>
      <WaDocCard icon="🏛️" title="Alturas estruturais">
        Barra de status 21px, barra principal 100px (69px de título + 31px de abas), cabeçalho de
        conversa 52px, sub app bar 57px, cabeçalho de chamada 133px e barra de controles 87px.
      </WaDocCard>
      <WaDocCard icon="⭕" title="Medidas fixas">
        Avatares de 23, 32, 45 e 50px (mais o anel de 56px) e FABs de 41, 43, 52, 54 e 58px. São
        valores absolutos do arquivo, não múltiplos de uma grade.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Figma e especificações técnicas"
      description="Arquivo de origem, nós de referência e desvios registrados."
    />
    <WaDocFigmaSpecs
      nodeId="1:2025"
      frameName="Chats Main Page · contêiner de conteúdo"
      specs={[
        { label: 'Dispositivo', value: 'Google Pixel 2 XL' },
        { label: 'Frame', value: '411 × 823 px' },
        { label: 'Calha de lista', value: '19px' },
        { label: 'Calha de barra', value: '24px' },
        { label: 'Passo de conversa', value: '70px' },
        { label: 'Divisor', value: '1px · #18252D' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Auto layout',
          detail:
            'o arquivo é quase inteiramente posicionado em coordenadas absolutas, sem auto layout. As medidas foram lidas de cada nó e convertidas em uma escala coerente; a escala em si é um agrupamento da biblioteca, não um artefato do Figma.',
        },
        {
          subject: 'Altura da barra de status',
          detail:
            'varia entre 21px, 22px, 24px, 25px e 27px conforme o frame. O token adota 21px (frame "Chats Main Page") e o componente aceita `height` para reproduzir os demais.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Escala de espaçamento"
      description="Onze degraus de 2px a 48px."
    />
    <div style={{ marginBottom: 32 }}>
      {Object.entries(waSpacing).map(([key, value]) => (
        <SpacingRuler key={key} token={key} value={value} />
      ))}
    </div>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Raios de borda"
      description="Sete raios, todos observados diretamente nos frames."
    />
    <WaDocStage surface="canvas" padding={24}>
      {Object.entries(waRadii).map(([key, value]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: value,
              background: 'var(--wa-color-surface-sheet)',
              border: '1px solid var(--wa-color-border-dialog)',
            }}
          />
          <div
            style={{
              marginTop: 6,
              color: 'var(--wa-color-text-meta)',
              fontFamily: 'var(--wa-font-sans)',
              fontSize: 12,
            }}
          >
            {key} · {value}
          </div>
        </div>
      ))}
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Avatares e botões flutuantes"
      description="Diâmetros absolutos medidos no arquivo."
    />
    <WaDocStage surface="canvas" padding={24}>
      {[
        ...Object.entries(waAvatarSizes).map(([key, value]) => ({
          key: `avatar-${key}`,
          label: `avatar ${key}`,
          value,
          color: 'var(--wa-color-surface-appbar)',
        })),
        ...Object.entries(waFabSizes).map(([key, value]) => ({
          key: `fab-${key}`,
          label: `fab ${key}`,
          value,
          color: 'var(--wa-color-accent-fab)',
        })),
      ].map((item) => (
        <div key={item.key} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: item.value,
              height: item.value,
              borderRadius: '50%',
              background: item.color,
            }}
          />
          <div
            style={{
              marginTop: 6,
              color: 'var(--wa-color-text-meta)',
              fontFamily: 'var(--wa-font-sans)',
              fontSize: 11,
            }}
          >
            {item.label}
            <br />
            {item.value}
          </div>
        </div>
      ))}
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Laboratório de caixa"
      description="Combine raio e espaçamento interno sobre a superfície canvas."
    />
    <BoxLab />

    <UnooriaDocSectionHeader barColor={BAR} title="7. Boas práticas" />
    <WaDocPractices
      dos={[
        'Usar --wa-gutter (19px) nas listas e --wa-gutter-appbar (24px) nas barras.',
        'Respeitar a densidade específica de cada lista via a prop `density` do ListItem.',
        'Aplicar --wa-radius-pill (20px) apenas ao campo do compositor.',
        'Reproduzir os diâmetros exatos de avatar e FAB em vez de arredondar.',
      ]}
      donts={[
        'Aplicar uma grade uniforme de 8px: o arquivo não segue essa métrica.',
        'Usar a mesma altura de linha em todas as listas.',
        'Introduzir raios intermediários que não existem no arquivo.',
        'Alterar a altura da barra principal de 100px sem recalcular título e abas.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa dos tokens" />
    <WaDocPropsTable
      title="Escala de espaçamento"
      rows={Object.entries(waSpacing).map(([key, value]) => ({
        name: key,
        type: `--wa-spacing-${key}`,
        default: value,
        description: 'Degrau da escala de espaçamento.',
      }))}
    />
    <WaDocPropsTable
      title="Raios de borda"
      rows={Object.entries(waRadii).map(([key, value]) => ({
        name: key,
        type: `--wa-radius-${key}`,
        default: value,
        description: 'Raio observado nos frames do arquivo.',
      }))}
    />
    <WaDocPropsTable
      title="Dimensões estruturais"
      rows={[
        { name: 'deviceWidth', type: '--wa-device-width', default: waLayout.deviceWidth, description: 'Largura do frame de referência.' },
        { name: 'deviceHeight', type: '--wa-device-height', default: waLayout.deviceHeight, description: 'Altura do frame de referência.' },
        { name: 'gutter', type: '--wa-gutter', default: waLayout.gutter, description: 'Calha lateral das listas.' },
        { name: 'gutterAppbar', type: '--wa-gutter-appbar', default: waLayout.gutterAppbar, description: 'Calha lateral das barras superiores.' },
        { name: 'statusBarHeight', type: '--wa-statusbar-height', default: waLayout.statusBarHeight, description: 'Altura da barra de status do Android.' },
        { name: 'appBarHeight', type: '--wa-appbar-height', default: waLayout.appBarHeight, description: 'Barra principal com título e abas.' },
        { name: 'appBarTitleHeight', type: '--wa-appbar-title-height', default: waLayout.appBarTitleHeight, description: 'Cabeçalho da tela de conversa.' },
        { name: 'subAppBarHeight', type: '--wa-subappbar-height', default: waLayout.subAppBarHeight, description: 'Barra de páginas internas.' },
        { name: 'tabRowHeight', type: '--wa-tabrow-height', default: waLayout.tabRowHeight, description: 'Faixa de abas com indicador.' },
        { name: 'callHeaderHeight', type: '--wa-callheader-height', default: waLayout.callHeaderHeight, description: 'Cabeçalho verde da chamada.' },
        { name: 'callBarHeight', type: '--wa-callbar-height', default: waLayout.callBarHeight, description: 'Barra de controles da chamada.' },
      ]}
    />
    <WaDocPropsTable
      title="Avatares e botões flutuantes"
      rows={[
        ...Object.entries(waAvatarSizes).map(([key, value]) => ({
          name: `avatar ${key}`,
          type: `--wa-avatar-${key}`,
          default: value,
          description: 'Diâmetro de avatar medido no arquivo.',
        })),
        ...Object.entries(waFabSizes).map(([key, value]) => ({
          name: `fab ${key}`,
          type: `--wa-fab-${key === 'endCall' ? 'endcall' : key}`,
          default: value,
          description: 'Diâmetro de botão flutuante medido no arquivo.',
        })),
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Whatsapp Mobile/Fundamentos/Espaçamento & Layout',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa do sistema de medidas, baseada nas especificações do Figma.
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
      {Object.entries(waSpacing).map(([key, value]) => (
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
