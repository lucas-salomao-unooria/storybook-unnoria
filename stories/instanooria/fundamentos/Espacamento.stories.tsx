import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  instaSpacing,
  instaSpacingOrder,
  instaSpacingUsage,
  instaRadius,
  instaLayout,
  instaAvatarSizes,
  instaGutter,
} from '../../../src/instanooria/tokens/spacing';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
} from '../../../.storybook/components';
import { Avatar, SearchField, Badge, Chip } from '../../../src/instanooria/components';
import { instaAvatars } from '../fixtures';

/**
 * Página de documentação rica dos tokens de espaçamento, raios e layout.
 */
const EspacamentoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Fundamentos • Espaçamento & Layout"
      title="Espaçamento, Raios e Layout"
      description="Sistema de medidas do Instanooria derivado dos frames de 375×812px do arquivo Figma. Reúne a escala de espaçamento, os raios de borda, as dimensões estruturais das barras de sistema e os diâmetros canônicos de avatar."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Como as medidas foram derivadas e por que elas não são múltiplos de 8."
    />
    <InstaDocGrid>
      <InstaDocCard icon="📏" title="Escala derivada, não arbitrária">
        Cada degrau saiu de uma distância real medida nos frames — não de uma grade teórica de 8px.
        Por isso a escala inclui 2, 6 e 10px, presentes no arquivo de design.
      </InstaDocCard>
      <InstaDocCard icon="📐" title="Calha de 15px">
        A margem lateral padrão das telas é de 15px (4% de 375px). É o valor usado pelo cabeçalho do
        post, pela legenda e pelo bloco de perfil.
      </InstaDocCard>
      <InstaDocCard icon="📱" title="Barras de sistema fixas">
        Status bar de 44px, barra superior de 88px, barra inferior de 79px e home indicator de 34px.
        Essas alturas são invariantes em todas as 19 telas.
      </InstaDocCard>
      <InstaDocCard icon="⭕" title="Cinco diâmetros de avatar">
        17, 23, 32, 56 e 80px cobrem 100% das ocorrências de avatar no arquivo, da prova social de
        curtidas ao cabeçalho do perfil.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas estruturais lidas dos frames do arquivo de design."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1646"
      frameName="Instagram Main (Classic)"
      specs={[
        { label: 'Tela', value: `${instaLayout.screenWidth} × ${instaLayout.screenHeight}px` },
        { label: 'Calha lateral', value: `${instaGutter}px` },
        { label: 'Status bar', value: `${instaLayout.statusBarHeight}px` },
        { label: 'Barra superior', value: `${instaLayout.topBarHeight}px` },
        { label: 'Barra inferior', value: `${instaLayout.tabBarHeight}px` },
        { label: 'Home indicator', value: `${instaLayout.homeIndicatorHeight}px` },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia da Escala de Espaçamento"
      description="Onze degraus cobrindo de ajustes ópticos de 2px a blocos isolados de 48px."
    />
    <div style={{ marginBottom: 32 }}>
      {instaSpacingOrder.map((token) => (
        <div
          key={token}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '12px 16px',
            border: '1px solid #E4E8E9',
            borderRadius: 10,
            marginBottom: 8,
            backgroundColor: '#FFFFFF',
          }}
        >
          <code
            style={{
              fontSize: 12,
              color: '#6487C2',
              minWidth: 190,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            }}
          >
            --insta-spacing-{token}
          </code>
          <span style={{ fontSize: 12, color: '#22272A', minWidth: 48, fontWeight: 700 }}>
            {instaSpacing[token]}px
          </span>
          <span
            style={{
              display: 'block',
              height: 16,
              width: instaSpacing[token],
              backgroundColor: '#7FA5E2',
              borderRadius: 3,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 12.5, color: '#475157', lineHeight: 1.5 }}>
            {instaSpacingUsage[token]}
          </span>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="4. Matriz de Raios e Dimensões"
      description="Raios de borda e diâmetros de avatar exatamente como aparecem no arquivo."
    />
    <InstaDocStage label="Raios de borda">
      {Object.entries(instaRadius).map(([name, value]) => (
        <div key={name} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 72,
              height: 72,
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD4D6',
              borderRadius: value,
              marginBottom: 8,
            }}
          />
          <div style={{ fontSize: 12, fontWeight: 700, color: '#22272A' }}>{name}</div>
          <div style={{ fontSize: 11, color: '#475157' }}>{value}px</div>
        </div>
      ))}
    </InstaDocStage>

    <InstaDocStage label="Diâmetros de avatar (componente real)">
      {Object.entries(instaAvatarSizes).map(([name, value]) => (
        <div key={name} style={{ textAlign: 'center' }}>
          <Avatar src={instaAvatars.jacob_w} alt="" size={value} ring="story" />
          <div style={{ fontSize: 12, fontWeight: 700, color: '#22272A', marginTop: 10 }}>
            {name}
          </div>
          <div style={{ fontSize: 11, color: '#475157' }}>{value}px</div>
        </div>
      ))}
    </InstaDocStage>

    <InstaDocStage label="Estrutura vertical das telas" align="flex-start">
      <div style={{ width: '100%', maxWidth: 420 }}>
        {[
          { label: 'Status bar', height: instaLayout.statusBarHeight, color: '#CBD4D6' },
          {
            label: 'Barra superior (conteúdo)',
            height: instaLayout.topBarContentHeight,
            color: '#7FA5E2',
          },
          { label: 'Conteúdo rolável', height: 120, color: '#F5F5F5' },
          {
            label: 'Barra inferior (conteúdo)',
            height: instaLayout.tabBarContentHeight,
            color: '#7FA5E2',
          },
          {
            label: 'Home indicator',
            height: instaLayout.homeIndicatorHeight,
            color: '#CBD4D6',
          },
        ].map((band) => (
          <div
            key={band.label}
            style={{
              height: band.height,
              backgroundColor: band.color,
              border: '1px solid #E4E8E9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 12px',
              fontSize: 12,
              color: '#22272A',
            }}
          >
            <span>{band.label}</span>
            <code style={{ fontSize: 11, color: '#475157' }}>{band.height}px</code>
          </div>
        ))}
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de aplicação das medidas verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Usar var(--insta-gutter) para a margem lateral de qualquer conteúdo de tela.',
        'Reservar --insta-radius-l (10px) exclusivamente ao campo de busca translúcido.',
        'Respeitar as alturas fixas das barras — elas garantem alinhamento entre telas.',
        'Escolher o diâmetro de avatar entre os cinco canônicos, sem interpolar valores.',
      ]}
      donts={[
        'Arredondar a calha de 15px para 16px: quebra o alinhamento com a mídia de largura total.',
        'Aplicar raio total (--insta-radius-full) a cartões ou blocos de mídia.',
        'Criar espaçamentos fora da escala para compensar erros de alinhamento.',
        'Alterar a altura da barra inferior sem ajustar o recuo do home indicator.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Medidas são invariantes entre temas; apenas superfícies e contornos mudam de cor."
    />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <div style={{ width: 340, display: 'grid', gap: 12 }}>
          <SearchField placeholder="Buscar" theme={activeTheme} readOnly />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip theme={activeTheme}>IGTV</Chip>
            <Chip theme={activeTheme} selected>
              Estilo
            </Chip>
            <Badge variant="counter" theme={activeTheme}>
              1/3
            </Badge>
          </div>
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Tokens"
      description="Todas as variáveis CSS de medida disponíveis no namespace --insta-*."
    />
    <div style={{ border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: '#F5F5F5' }}>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Variável</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Valor</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {[
            ...instaSpacingOrder.map((token) => ({
              name: `--insta-spacing-${token}`,
              value: `${instaSpacing[token]}px`,
              group: 'Espaçamento',
            })),
            { name: '--insta-gutter', value: `${instaGutter}px`, group: 'Layout' },
            ...Object.entries(instaRadius).map(([name, value]) => ({
              name: `--insta-radius-${name}`,
              value: `${value}px`,
              group: 'Raio',
            })),
            {
              name: '--insta-screen-width',
              value: `${instaLayout.screenWidth}px`,
              group: 'Layout',
            },
            {
              name: '--insta-screen-height',
              value: `${instaLayout.screenHeight}px`,
              group: 'Layout',
            },
            {
              name: '--insta-statusbar-height',
              value: `${instaLayout.statusBarHeight}px`,
              group: 'Layout',
            },
            {
              name: '--insta-topbar-height',
              value: `${instaLayout.topBarHeight}px`,
              group: 'Layout',
            },
            {
              name: '--insta-tabbar-height',
              value: `${instaLayout.tabBarHeight}px`,
              group: 'Layout',
            },
            {
              name: '--insta-home-indicator-height',
              value: `${instaLayout.homeIndicatorHeight}px`,
              group: 'Layout',
            },
            ...Object.entries(instaAvatarSizes).map(([name, value]) => ({
              name: `--insta-avatar-${name}`,
              value: `${value}px`,
              group: 'Avatar',
            })),
          ].map((row) => (
            <tr key={row.name} style={{ borderTop: '1px solid #E4E8E9' }}>
              <td
                style={{
                  padding: '9px 14px',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: 12,
                  color: '#22272A',
                }}
              >
                {row.name}
              </td>
              <td style={{ padding: '9px 14px', color: '#475157', fontSize: 12 }}>{row.value}</td>
              <td style={{ padding: '9px 14px', color: '#6487C2', fontSize: 12 }}>{row.group}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Instanooria/Fundamentos/Espaçamento & Layout',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Escala de espaçamento, raios de borda, dimensões estruturais e diâmetros de avatar do Instanooria, derivados dos frames de 375×812px do Figma.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa das medidas baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <EspacamentoDocumentationPage />,
};
