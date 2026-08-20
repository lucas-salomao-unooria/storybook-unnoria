import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { instaElevation } from '../../../src/instanooria/tokens/spacing';
import { instaGradients } from '../../../src/instanooria/tokens/colors';
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
import { TopBar, TabBar, Divider, Avatar, Logo, Icon } from '../../../src/instanooria/components';
import { instaAvatars } from '../fixtures';

/**
 * Elevações oficiais com sua origem no arquivo de design.
 */
const ELEVATIONS = [
  {
    name: 'Hairline inferior',
    cssVar: '--insta-elevation-hairline-bottom',
    value: instaElevation.hairlineBottom,
    usage: 'Divisor entre o cabeçalho do post e a mídia, e entre linhas de lista.',
    figma: 'Post / Top → Rectangle',
  },
  {
    name: 'Hairline superior',
    cssVar: '--insta-elevation-hairline-top',
    value: instaElevation.hairlineTop,
    usage: 'Divisor acima das abas segmentadas do perfil.',
    figma: 'Tabs → Mask',
  },
  {
    name: 'Barra inferior (base)',
    cssVar: '--insta-elevation-bar-bottom',
    value: instaElevation.barBottom,
    usage: 'Traço na base da barra superior de navegação.',
    figma: 'Top Bar → Rectangle',
  },
  {
    name: 'Barra superior (topo)',
    cssVar: '--insta-elevation-bar-top',
    value: instaElevation.barTop,
    usage: 'Traço no topo da barra inferior de navegação.',
    figma: 'Tab Bar → Rectangle',
  },
  {
    name: 'Menu lateral',
    cssVar: '--insta-elevation-drawer',
    value: instaElevation.drawer,
    usage: 'Traço na borda esquerda do menu lateral do perfil.',
    figma: 'Profile Menu → Rectangle',
  },
];

/**
 * Página de documentação rica das elevações e gradientes do Instanooria.
 */
const ElevacaoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Fundamentos • Elevação & Gradientes"
      title="Elevação e Gradientes"
      description="O Instanooria não usa sombras difusas. Toda separação entre camadas é feita por traços hairline de 0.33px — o mesmo recurso que o iOS aplica em barras de navegação. Os únicos elementos com profundidade cromática são os três gradientes de marca."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Por que o sistema é plano e onde a profundidade realmente aparece."
    />
    <InstaDocGrid>
      <InstaDocCard icon="📏" title="Hairline de 0.33px">
        Todas as cinco elevações do arquivo são sombras de deslocamento 0.33px sem desfoque. Em
        telas @3x isso corresponde a exatamente um pixel físico.
      </InstaDocCard>
      <InstaDocCard icon="🚫" title="Nenhuma sombra difusa">
        Não existe blur em nenhum frame do arquivo. Hierarquia é resolvida por superfície
        (primary/secondary/tertiary) e não por profundidade simulada.
      </InstaDocCard>
      <InstaDocCard icon="🌈" title="Gradientes são identidade">
        Os três gradientes — anel de story, anel ao vivo e etiqueta LIVE — são os únicos elementos
        com variação cromática contínua, e existem apenas ao redor de avatares.
      </InstaDocCard>
      <InstaDocCard icon="🎞️" title="Scrim sobre mídia">
        Story e Live aplicam dois gradientes pretos a 30% no topo e na base da mídia para garantir
        contraste do texto sobreposto, sem escurecer o centro da imagem.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Sombras e gradientes lidos diretamente das camadas do arquivo."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1694"
      frameName="Stories / Post / Tab Bar"
      specs={[
        { label: 'Elevações', value: '5 hairlines' },
        { label: 'Deslocamento', value: '0.33px' },
        { label: 'Desfoque', value: '0px (nenhum)' },
        { label: 'Cor hairline', value: 'rgba(60,60,67,0.29)' },
        { label: 'Cor de barra', value: '#A6A6AA' },
        { label: 'Gradientes', value: '3 lineares' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia das Elevações"
      description="Cada traço com sua variável CSS, valor exato e camada de origem."
    />
    <div style={{ marginBottom: 32 }}>
      {ELEVATIONS.map((elevation) => (
        <div
          key={elevation.cssVar}
          style={{
            border: '1px solid #E4E8E9',
            borderRadius: 12,
            padding: 18,
            marginBottom: 12,
            backgroundColor: '#FFFFFF',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 12,
            }}
          >
            <strong style={{ fontSize: 14, color: '#22272A' }}>{elevation.name}</strong>
            <code style={{ fontSize: 11, color: '#6487C2' }}>{elevation.figma}</code>
          </div>

          <div
            style={{
              height: 56,
              backgroundColor: '#FAFAFA',
              boxShadow: elevation.value,
              borderRadius: 6,
              marginBottom: 12,
            }}
          />

          <div
            style={{
              fontSize: 11.5,
              color: '#475157',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              marginBottom: 6,
              wordBreak: 'break-all',
            }}
          >
            {elevation.cssVar}: {elevation.value};
          </div>
          <p style={{ margin: 0, fontSize: 12.5, color: '#475157', lineHeight: 1.6 }}>
            {elevation.usage}
          </p>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="4. Matriz de Gradientes"
      description="Os três gradientes de marca aplicados aos componentes reais de produção."
    />
    <InstaDocStage label="Anéis e etiqueta renderizados pelo componente Avatar">
      <div style={{ textAlign: 'center' }}>
        <Avatar src={instaAvatars.zackjohn} alt="" ring="story" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>ring=&quot;story&quot;</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={instaAvatars.karennne} alt="" ring="live" badge="live" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 14 }}>ring=&quot;live&quot;</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src={instaAvatars.craig_love} alt="" ring="seen" />
        <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>ring=&quot;seen&quot;</div>
      </div>
    </InstaDocStage>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}
    >
      {[
        { name: 'Story', cssVar: '--insta-gradient-story', stops: instaGradients.story, angle: 204 },
        { name: 'Ao vivo', cssVar: '--insta-gradient-live', stops: instaGradients.live, angle: 136 },
        {
          name: 'Etiqueta LIVE',
          cssVar: '--insta-gradient-livebadge',
          stops: instaGradients.liveBadge,
          angle: 139.58,
        },
      ].map((gradient) => (
        <div
          key={gradient.name}
          style={{ border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}
        >
          <div
            style={{
              height: 84,
              background: `linear-gradient(${gradient.angle}deg, ${gradient.stops.join(', ')})`,
            }}
          />
          <div style={{ padding: '12px 14px' }}>
            <strong style={{ fontSize: 13, color: '#22272A' }}>{gradient.name}</strong>
            <div
              style={{
                fontSize: 11,
                color: '#475157',
                marginTop: 4,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              }}
            >
              {gradient.cssVar}
            </div>
            <div style={{ fontSize: 11, color: '#475157', marginTop: 4 }}>
              {gradient.stops.join(' → ')}
            </div>
          </div>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de separação de camadas verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Usar box-shadow com as variáveis --insta-elevation-* em vez de border-bottom.',
        'Separar blocos por mudança de superfície antes de recorrer a um traço.',
        'Reservar os gradientes para anéis de avatar e para a etiqueta LIVE.',
        'Aplicar o scrim duplo em mídia sempre que houver texto sobreposto.',
      ]}
      donts={[
        'Introduzir sombras com desfoque: não existem no arquivo de design.',
        'Usar o gradiente de story como fundo de botão, cartão ou cabeçalho.',
        'Empilhar dois hairlines adjacentes — o traço dobra e vira uma linha de 0.66px.',
        'Escurecer a mídia inteira em vez de aplicar o scrim apenas nas extremidades.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="No tema Dark os hairlines mudam para #48484A, mantendo a mesma geometria."
    />
    <InstaDocThemeSwitcher padding={0}>
      {(activeTheme) => (
        <div style={{ width: 375 }}>
          <TopBar
            theme={activeTheme}
            withStatusBarInset={false}
            leading={<Icon name="camera" size={24} theme={activeTheme} />}
            title={<Logo height={26} theme={activeTheme} />}
            trailing={<Icon name="share" size={22} theme={activeTheme} />}
          />
          <div
            style={{
              height: 90,
              backgroundColor: activeTheme === 'dark' ? '#000000' : '#FFFFFF',
            }}
          />
          <Divider theme={activeTheme} />
          <div
            style={{
              height: 40,
              backgroundColor: activeTheme === 'dark' ? '#000000' : '#FFFFFF',
            }}
          />
          <TabBar theme={activeTheme} activeId="feed" withHomeIndicatorInset={false} />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Tokens"
      description="Todas as variáveis de elevação e gradiente disponíveis."
    />
    <div style={{ border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: '#F5F5F5' }}>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Variável</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Valor</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Uso</th>
          </tr>
        </thead>
        <tbody>
          {ELEVATIONS.map((elevation) => (
            <tr key={elevation.cssVar} style={{ borderTop: '1px solid #E4E8E9' }}>
              <td
                style={{
                  padding: '10px 14px',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: 12,
                  color: '#22272A',
                }}
              >
                {elevation.cssVar}
              </td>
              <td
                style={{
                  padding: '10px 14px',
                  fontSize: 11.5,
                  color: '#475157',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                }}
              >
                {elevation.value}
              </td>
              <td style={{ padding: '10px 14px', fontSize: 12.5, color: '#475157' }}>
                {elevation.usage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Instanooria/Fundamentos/Elevação & Gradientes',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Sistema de separação de camadas do Instanooria: cinco traços hairline de 0.33px e os três gradientes de marca extraídos do Figma.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa das elevações baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ElevacaoDocumentationPage />,
};
