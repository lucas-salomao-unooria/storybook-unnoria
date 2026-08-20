import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  instaLightColors,
  instaDarkColors,
  instaColorCssVars,
  instaColorFigmaNames,
  instaBrandColors,
  instaGradients,
  type InstaColorTokens,
} from '../../../src/instanooria/tokens/colors';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
  InstaDocTokenSwatch,
  InstaDocThemeSwitcher,
} from '../../../.storybook/components';
import { Avatar, Button, Badge } from '../../../src/instanooria/components';
import { instaAvatars } from '../fixtures';

/**
 * Agrupamento semântico dos tokens de cor para exibição em documentação.
 */
const COLOR_GROUPS: { title: string; description: string; keys: (keyof InstaColorTokens)[] }[] = [
  {
    title: 'Superfícies',
    description:
      'Definem a hierarquia de profundidade das telas: fundo do conteúdo, barras de navegação, cápsulas e camadas elevadas.',
    keys: ['backgroundPrimary', 'backgroundSecondary', 'backgroundTertiary', 'backgroundElevated'],
  },
  {
    title: 'Texto',
    description:
      'Três níveis de contraste — conteúdo principal, apoio e links —, além do placeholder translúcido dos campos.',
    keys: ['textPrimary', 'textSecondary', 'textLink', 'textPlaceholder'],
  },
  {
    title: 'Ícones',
    description:
      'Separam o glifo ativo do inativo nas barras de navegação e nas ações das publicações.',
    keys: ['iconPrimary', 'iconSecondary'],
  },
  {
    title: 'Bordas e divisores',
    description:
      'Contorno de campos, divisor hairline de 0.33px entre linhas de lista e traço das barras de sistema.',
    keys: ['borderDefault', 'borderSubtle', 'borderBar'],
  },
  {
    title: 'Ações e preenchimentos',
    description:
      'Azul de ação das telas de autenticação, seu estado desabilitado e o preenchimento translúcido do campo de busca.',
    keys: ['actionPrimary', 'actionDisabled', 'actionSecondaryBorder', 'fillField'],
  },
  {
    title: 'Overlays',
    description: 'Scrim de leitura sobre mídia e traço translúcido do composer de story.',
    keys: ['overlayScrim', 'overlayOnMedia'],
  },
];

/**
 * Rótulos legíveis para cada chave de token.
 */
const COLOR_LABELS: Record<keyof InstaColorTokens, string> = {
  backgroundPrimary: 'Fundo principal',
  backgroundSecondary: 'Fundo de barras',
  backgroundTertiary: 'Fundo de cápsulas',
  backgroundElevated: 'Camada elevada',
  textPrimary: 'Texto principal',
  textSecondary: 'Texto de apoio',
  textLink: 'Texto de link',
  textPlaceholder: 'Placeholder',
  iconPrimary: 'Ícone ativo',
  iconSecondary: 'Ícone inativo',
  borderDefault: 'Borda padrão',
  borderSubtle: 'Divisor hairline',
  borderBar: 'Traço de barra',
  actionPrimary: 'Ação primária',
  actionDisabled: 'Ação desabilitada',
  actionSecondaryBorder: 'Borda secundária',
  fillField: 'Preenchimento de campo',
  overlayScrim: 'Scrim de mídia',
  overlayOnMedia: 'Traço sobre mídia',
};

/**
 * Página de documentação rica dos tokens de cor do Instanooria.
 */
const CoresDocumentationPage = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const palette = theme === 'light' ? instaLightColors : instaDarkColors;

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Instanooria"
        category="Fundamentos • Cores"
        title="Cores"
        description="Sistema cromático do Instanooria extraído das variáveis oficiais do arquivo Figma “Instagram UI Screens (Community)”. Cada token existe nos dois temas do arquivo — Classic (Light) e Dark — e é exposto como variável CSS no namespace --insta-*, garantindo troca de tema sem reescrever componentes."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Como o sistema cromático está organizado e por que ele é independente da paleta da Plataforma Unooria."
      />
      <InstaDocGrid>
        <InstaDocCard icon="🎨" title="Semântico, não literal">
          Nenhum componente referencia um hexadecimal. Todos consomem variáveis semânticas como{' '}
          <code>--insta-color-background-primary</code>, o que permite inverter o tema inteiro
          alterando um único atributo <code>data-insta-theme</code>.
        </InstaDocCard>
        <InstaDocCard icon="🌗" title="Dois temas nativos">
          O arquivo Figma entrega 19 telas duplicadas nos temas Classic e Dark. Cada par de valores
          foi lido das variáveis do próprio arquivo, e não estimado a partir de capturas de tela.
        </InstaDocCard>
        <InstaDocCard icon="🧭" title="Namespace isolado">
          O prefixo <code>--insta-</code> convive com <code>--unooria-</code> e com os tokens do
          WhatsApp UI sem colisão, seguindo o modelo já adotado em <code>src/whatsapp/</code>.
        </InstaDocCard>
        <InstaDocCard icon="🔴" title="Cores de marca invariantes">
          O vermelho de curtida, o azul do selo oficial e os três gradientes (story, live e etiqueta
          LIVE) não mudam entre temas — são identidade, não hierarquia.
        </InstaDocCard>
      </InstaDocGrid>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Origem exata de cada valor cromático dentro do arquivo de design."
      />
      <InstaDocFigmaSpecs
        nodeId="0:2"
        frameName="Página “Instagram”"
        specs={[
          { label: 'Telas mapeadas', value: '19 × 2 temas' },
          { label: 'Tokens semânticos', value: '19 por tema' },
          { label: 'Cores de marca', value: '5 invariantes' },
          { label: 'Gradientes', value: '3 (story, live, badge)' },
          { label: 'Tema Classic', value: 'Frames em x ≤ -676' },
          { label: 'Tema Dark', value: 'Frames em x ≥ 299' },
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia da Paleta Semântica"
        description="Clique em qualquer amostra para copiar a variável CSS correspondente. Alterne o tema para comparar os dois valores lado a lado."
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['light', 'dark'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setTheme(option)}
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              border: `1px solid ${theme === option ? '#22272A' : '#E4E8E9'}`,
              backgroundColor: theme === option ? '#22272A' : '#FFFFFF',
              color: theme === option ? '#FFFFFF' : '#475157',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {option === 'light' ? '☀️ Classic (Light)' : '🌙 Dark'}
          </button>
        ))}
      </div>

      {COLOR_GROUPS.map((group) => (
        <div key={group.title} style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, margin: '0 0 4px 0', color: '#22272A' }}>{group.title}</h3>
          <p style={{ fontSize: 13.5, color: '#475157', margin: '0 0 14px 0', lineHeight: 1.6 }}>
            {group.description}
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {group.keys.map((key) => (
              <InstaDocTokenSwatch
                key={key}
                name={COLOR_LABELS[key]}
                cssVar={instaColorCssVars[key]}
                value={palette[key]}
                figmaName={instaColorFigmaNames[key]}
              />
            ))}
          </div>
        </div>
      ))}

      <UnooriaDocSectionHeader
        title="4. Cores de Marca e Gradientes"
        description="Valores idênticos nos dois temas, responsáveis pela identidade visual do produto."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <InstaDocTokenSwatch
          name="Curtida"
          cssVar="--insta-color-brand-like"
          value={instaBrandColors.like}
        />
        <InstaDocTokenSwatch
          name="Selo oficial"
          cssVar="--insta-color-brand-verified"
          value={instaBrandColors.verified}
        />
        <InstaDocTokenSwatch
          name="Notificação"
          cssVar="--insta-color-brand-notification"
          value={instaBrandColors.notification}
        />
        <InstaDocTokenSwatch
          name="Anel de destaque"
          cssVar="--insta-color-highlight-ring"
          value={instaBrandColors.highlightRing}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}
      >
        {[
          {
            name: 'Anel de story',
            cssVar: '--insta-gradient-story',
            stops: instaGradients.story,
            css: 'linear-gradient(204deg, #FBAA47 0%, #D91A46 52%, #A60F93 100%)',
          },
          {
            name: 'Anel ao vivo',
            cssVar: '--insta-gradient-live',
            stops: instaGradients.live,
            css: 'linear-gradient(136deg, #E20337 0%, #C60188 52%, #7700C3 100%)',
          },
          {
            name: 'Etiqueta LIVE',
            cssVar: '--insta-gradient-livebadge',
            stops: instaGradients.liveBadge,
            css: 'linear-gradient(139.58deg, #C90083 10.8%, #D22463 29.3%, #E10038 93.4%)',
          },
        ].map((gradient) => (
          <div
            key={gradient.name}
            style={{ border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}
          >
            <div style={{ height: 90, background: gradient.css }} />
            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#22272A' }}>{gradient.name}</div>
              <div
                style={{
                  fontSize: 11,
                  color: '#475157',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  marginTop: 4,
                }}
              >
                {gradient.cssVar}
              </div>
              <div style={{ fontSize: 11, color: '#475157', marginTop: 6 }}>
                {gradient.stops.join(' → ')}
              </div>
            </div>
          </div>
        ))}
      </div>

      <UnooriaDocSectionHeader
        title="5. Boas Práticas"
        description="Regras de aplicação cromática validadas contra o arquivo de design."
      />
      <InstaDocPractices
        dos={[
          'Consumir sempre var(--insta-color-*) em componentes e telas do Instanooria.',
          'Usar background-secondary nas barras superior e inferior, reservando background-primary ao conteúdo.',
          'Aplicar text-secondary a horários, prévias de mensagem e metadados de baixa prioridade.',
          'Manter os gradientes de story e live exclusivos para anéis de avatar e etiquetas LIVE.',
        ]}
        donts={[
          'Escrever hexadecimais diretamente no CSS de um componente Instanooria.',
          'Reaproveitar tokens --unooria-* dentro do Instanooria: são marcas com hierarquias distintas.',
          'Usar o vermelho de curtida como cor de erro de formulário.',
          'Trocar a cor do selo de conta oficial: ela é fixa nos dois temas.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a Temas em Componentes Reais"
        description="Componentes de produção reagindo à troca de tema apenas pela mudança do atributo data-insta-theme."
      />
      <InstaDocThemeSwitcher>
        {(activeTheme) => (
          <>
            <Avatar
              src={instaAvatars.karennne}
              alt="karennne"
              ring="story"
              badge="live"
              theme={activeTheme}
            />
            <Avatar src={instaAvatars.zackjohn} alt="zackjohn" ring="seen" theme={activeTheme} />
            <Button variant="primary" theme={activeTheme}>
              Seguir
            </Button>
            <Button variant="secondary" theme={activeTheme}>
              Mensagem
            </Button>
            <Badge variant="counter" theme={activeTheme}>
              1/3
            </Badge>
            <Badge variant="live" theme={activeTheme}>
              LIVE
            </Badge>
          </>
        )}
      </InstaDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Tabela Completa de Tokens"
        description="Valores dos dois temas lado a lado, com o nome de origem no Figma."
      />
      <div style={{ border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ backgroundColor: '#F5F5F5' }}>
              <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>
                Variável CSS
              </th>
              <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Figma</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Classic</th>
              <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Dark</th>
            </tr>
          </thead>
          <tbody>
            {(Object.keys(instaLightColors) as (keyof InstaColorTokens)[]).map((key) => (
              <tr key={key} style={{ borderTop: '1px solid #E4E8E9' }}>
                <td
                  style={{
                    padding: '10px 14px',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 12,
                    color: '#22272A',
                  }}
                >
                  {instaColorCssVars[key]}
                </td>
                <td style={{ padding: '10px 14px', color: '#6487C2', fontSize: 12 }}>
                  {instaColorFigmaNames[key] ?? '—'}
                </td>
                <td style={{ padding: '10px 14px', color: '#475157', fontSize: 12 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 12,
                      height: 12,
                      borderRadius: 3,
                      border: '1px solid #E4E8E9',
                      background: instaLightColors[key],
                      marginRight: 8,
                      verticalAlign: 'middle',
                    }}
                  />
                  {instaLightColors[key]}
                </td>
                <td style={{ padding: '10px 14px', color: '#475157', fontSize: 12 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 12,
                      height: 12,
                      borderRadius: 3,
                      border: '1px solid #E4E8E9',
                      background: instaDarkColors[key],
                      marginRight: 8,
                      verticalAlign: 'middle',
                    }}
                  />
                  {instaDarkColors[key]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UnooriaDocShell>
  );
};

const meta: Meta = {
  title: 'Instanooria/Fundamentos/Cores',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tokens de cor do Instanooria extraídos das variáveis do arquivo Figma “Instagram UI Screens (Community)”, com suporte nativo aos temas Classic (Light) e Dark.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa dos tokens de cor baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CoresDocumentationPage />,
};

/**
 * Comparação direta entre os dois temas em uma mesma superfície.
 */
export const ComparativoDeTemas: Story = {
  name: '🌗 Comparativo Classic × Dark',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
      {(['light', 'dark'] as const).map((activeTheme) => (
        <div
          key={activeTheme}
          data-insta-theme={activeTheme}
          style={{
            padding: 24,
            borderRadius: 12,
            border: '1px solid #E4E8E9',
            backgroundColor: activeTheme === 'dark' ? '#000000' : '#FFFFFF',
          }}
        >
          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: 14,
              color: activeTheme === 'dark' ? '#F9F9F9' : '#262626',
            }}
          >
            {activeTheme === 'dark' ? 'Dark' : 'Classic (Light)'}
          </h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {(Object.keys(instaLightColors) as (keyof InstaColorTokens)[]).map((key) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    width: 28,
                    height: 20,
                    borderRadius: 4,
                    border: '1px solid rgba(128,128,128,0.4)',
                    background:
                      activeTheme === 'dark' ? instaDarkColors[key] : instaLightColors[key],
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    color: activeTheme === 'dark' ? '#CBD4D6' : '#475157',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  }}
                >
                  {instaColorCssVars[key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
