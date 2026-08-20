import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import {
  tikAvatarTokens,
  tikDimensionTokens,
  tikIconSizeTokens,
  tikRadiusScale,
  tikSpacingScale,
  tikTargetTokens,
} from '../../../src/tiktooria/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocStage,
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { Avatar, HomeIndicator, StatusBar } from '../../../src/tiktooria';
import { tikAvatarJacob } from '../fixtures';

const meta: Meta = {
  title: 'Tik Tooria/Fundamentos/Espaçamento & Layout',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

const MeasureTable: React.FC<{
  title: string;
  rows: { cssVar: string; value: string; usage: string; figmaNode?: string }[];
  bar?: boolean;
}> = ({ title, rows, bar = false }) => (
  <div style={{ marginBottom: 32 }}>
    <h3 style={{ fontSize: 16, margin: '0 0 12px 0', color: '#22272A' }}>{title}</h3>
    <div style={{ border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      {rows.map((row, index) => (
        <div
          key={row.cssVar}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(220px, 260px) 80px 1fr 120px',
            alignItems: 'center',
            gap: 16,
            padding: '10px 14px',
            fontSize: 13,
            borderTop: index === 0 ? 'none' : '1px solid #E4E8E9',
            background: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5',
          }}
        >
          <code style={{ fontSize: 11.5, color: '#6487C2', wordBreak: 'break-all' }}>
            {row.cssVar}
          </code>
          <span style={{ fontWeight: 700, color: '#22272A' }}>{row.value}</span>
          <span style={{ color: '#475157', lineHeight: 1.5 }}>{row.usage}</span>
          {bar ? (
            <span
              style={{
                display: 'inline-block',
                height: 10,
                width: row.value,
                maxWidth: 110,
                background: '#EA4359',
                borderRadius: 2,
              }}
            />
          ) : (
            <span style={{ fontSize: 11, color: '#6487C2' }}>
              {row.figmaNode ? `node ${row.figmaNode}` : '—'}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

const SpacingDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Fundamentos • Espaçamento & Layout"
      title="Espaçamento & Layout"
      description="Todas as medidas foram lidas da geometria dos 15 frames de 414×896 (iPhone XR/11) do arquivo Figma. O arquivo é posicionado em coordenadas absolutas, sem auto layout — os degraus fracionários de 0,33px (fios das barras) e 0,83px (calha entre miniaturas) são preservados, não arredondados."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      barColor="#EA4359"
    />
    <TikDocGrid>
      <TikDocCard icon="📱" title="Dispositivo de 414×896">
        As 15 telas usam o mesmo frame. Os 44px da barra de status e os 35px do indicador de home são
        reservados por todas elas.
      </TikDocCard>
      <TikDocCard icon="📐" title="Calha de 16px">
        <code>--tik-gutter</code> vale 16px em todas as telas. O recuo de rótulo em linha com ícone é
        48px (<code>--tik-row-inset</code>) e o de valor à direita é 36px.
      </TikDocCard>
      <TikDocCard icon="🔬" title="Fios fracionários">
        O arquivo separa barras com sombra de 0,33px e miniaturas com contorno de 0,83px. Arredondar
        para 1px engrossa visivelmente a grade — os valores literais estão em{' '}
        <code>--tik-hairline</code> e <code>--tik-grid-hairline</code>.
      </TikDocCard>
      <TikDocCard icon="⭕" title="Seis diâmetros de avatar">
        32, 47, 49, 56, 90 e 96px. Nenhum foi consolidado: cada um pertence a um componente distinto.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:171"
      frameName="Página TikTok — 15 frames de 414×896"
      specs={[
        { label: 'Dispositivo', value: '414 × 896 (iPhone XR/11)' },
        { label: 'Calha lateral', value: '16px' },
        { label: 'Degraus de espaçamento', value: '11' },
        { label: 'Raios', value: '8 (1 a 1000px)' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Ausência de auto layout',
          detail:
            'nenhum frame do arquivo usa auto layout; todos os filhos são posicionados por coordenada absoluta. Os componentes reconstroem a mesma geometria com flex e grid, o que muda o mecanismo mas preserva as medidas medidas nó a nó.',
        },
        {
          subject: 'Degraus de espaçamento inferidos',
          detail:
            'a escala de 2 a 48px foi derivada das distâncias recorrentes entre nós; o arquivo não publica uma coleção de espaçamento. Cada degrau que corresponde a uma medida literal traz o node de referência.',
        },
        {
          subject: 'Transições',
          detail:
            '--tik-transition-fast e -medium não existem no arquivo, que é estático. Foram acrescentadas para dar consistência aos estados de interação, também ausentes no arquivo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia das medidas"
      description="Cada tabela lista a variável, o valor literal, o uso e o nó de origem."
      barColor="#65D2E9"
    />
    <MeasureTable title="Escala de espaçamento" rows={tikSpacingScale} bar />
    <MeasureTable title="Raios de borda" rows={tikRadiusScale} />
    <MeasureTable title="Dimensões estruturais" rows={tikDimensionTokens} />
    <MeasureTable title="Diâmetros de avatar" rows={tikAvatarTokens} />
    <MeasureTable title="Alvos e superfícies fixas" rows={tikTargetTokens} />
    <MeasureTable title="Grade de ícones" rows={tikIconSizeTokens} />

    <UnooriaDocSectionHeader
      title="4. Matriz de diâmetros e raios"
      barColor="#161722"
    />
    <TikDocStage label="Os seis diâmetros de avatar do arquivo" surface="chrome" gap={20}>
      {(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Avatar size={size} src={tikAvatarJacob} alt="" />
          <div style={{ fontSize: 11, color: 'var(--tik-color-text-secondary)', marginTop: 6 }}>
            {size}
          </div>
        </div>
      ))}
    </TikDocStage>
    <TikDocStage label="Os oito raios de borda" surface="chrome" gap={16}>
      {tikRadiusScale.map((radius) => (
        <div key={radius.cssVar} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: 'var(--tik-color-surface-field)',
              border: '1px solid var(--tik-color-border-outline)',
              borderRadius: radius.value,
            }}
          />
          <div style={{ fontSize: 11, color: 'var(--tik-color-text-secondary)', marginTop: 6 }}>
            {radius.value}
          </div>
        </div>
      ))}
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Reserve os 44px da barra de status e os 35px do indicador de home em qualquer tela nova.',
        'Use --tik-gutter para a calha lateral e --tik-row-inset para o recuo de rótulo em linha com ícone.',
        'Preserve os fios de 0,33px como box-shadow de raio 0, não como border de 1px.',
        'Escolha o diâmetro de avatar pelo componente de destino, não pelo espaço disponível.',
      ]}
      donts={[
        'Não arredonde 0,33px para 1px nem 0,83px para 1px.',
        'Não use raio 8px em botões: o arquivo reserva 8px para folhas e para o botão de criação, e 2px para alvos contornados.',
        'Não altere a altura de 83px da barra de abas — ela já contém o indicador de home.',
        'Não introduza um degrau de espaçamento novo sem medir o nó correspondente no arquivo.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="Barra de status e indicador de home nos dois contextos, com as mesmas medidas e cores distintas."
      barColor="#65D2E9"
    />
    <TikDocSurfaceSwitcher>
      {(surface) => (
        <div style={{ width: 414 }}>
          <StatusBar surface={surface === 'immersive' ? 'immersive' : 'chrome'} />
          <div style={{ height: 40 }} />
          <HomeIndicator surface={surface === 'immersive' ? 'immersive' : 'chrome'} />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência da API de tokens"
      description="spacing.ts exporta seis listas: tikSpacingScale, tikRadiusScale, tikDimensionTokens, tikAvatarTokens, tikTargetTokens e tikIconSizeTokens."
      barColor="#161722"
    />
    <TikDocCard icon="📦" title="Consumo em CSS">
      <pre style={{ margin: 0, fontSize: 12.5, whiteSpace: 'pre-wrap' }}>{`.minha-tela {
  width: var(--tik-device-width);
  height: var(--tik-device-height);
  padding-inline: var(--tik-gutter);
}

.minha-barra {
  height: var(--tik-navbar-height);
  box-shadow: var(--tik-elevation-bar-bottom);
}`}</pre>
    </TikDocCard>
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa das medidas, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SpacingDocumentationPage />,
};

/**
 * Somente as tabelas de medidas, para consulta rápida.
 */
export const TabelasDeMedidas: Story = {
  name: '📐 Tabelas de medidas',
  render: () => (
    <UnooriaDocShell>
      <MeasureTable title="Escala de espaçamento" rows={tikSpacingScale} bar />
      <MeasureTable title="Raios de borda" rows={tikRadiusScale} />
      <MeasureTable title="Dimensões estruturais" rows={tikDimensionTokens} />
      <MeasureTable title="Diâmetros de avatar" rows={tikAvatarTokens} />
      <MeasureTable title="Alvos e superfícies fixas" rows={tikTargetTokens} />
      <MeasureTable title="Grade de ícones" rows={tikIconSizeTokens} />
    </UnooriaDocShell>
  ),
};

/**
 * A grade de 414×896 com as faixas estruturais destacadas.
 */
export const GradeDoDispositivo: Story = {
  name: '📱 Grade do dispositivo',
  render: () => (
    <UnooriaDocShell>
      <div
        style={{
          position: 'relative',
          width: 414,
          height: 896,
          border: '1px solid #E4E8E9',
          background: '#FFFFFF',
          fontFamily: 'var(--tik-font-sans)',
          fontSize: 11,
          color: '#475157',
        }}
      >
        {[
          { top: 0, height: 44, label: 'Barra de status · 44px' },
          { top: 44, height: 44, label: 'Título da barra superior · 44px (total 88px)' },
          { top: 813, height: 48, label: 'Barra de abas · conteúdo' },
          { top: 861, height: 35, label: 'Indicador de home · 35px' },
        ].map((band) => (
          <div
            key={band.label}
            style={{
              position: 'absolute',
              top: band.top,
              left: 0,
              width: '100%',
              height: band.height,
              background: 'rgba(234, 67, 89, 0.08)',
              borderTop: '1px dashed #EA4359',
              borderBottom: '1px dashed #EA4359',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 16,
              boxSizing: 'border-box',
            }}
          >
            {band.label}
          </div>
        ))}
        <div
          style={{
            position: 'absolute',
            top: 88,
            left: 16,
            right: 16,
            bottom: 83,
            border: '1px dashed #65D2E9',
            display: 'flex',
            alignItems: 'flex-start',
            paddingTop: 8,
          }}
        >
          Conteúdo dentro da calha de 16px
        </div>
      </div>
    </UnooriaDocShell>
  ),
};
