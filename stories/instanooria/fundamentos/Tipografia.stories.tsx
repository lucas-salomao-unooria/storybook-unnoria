import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  instaTypography,
  instaTypographyOrder,
  instaFontFamily,
  instaFontWeights,
  type InstaTypographyToken,
} from '../../../src/instanooria/tokens/typography';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
  InstaDocThemeSwitcher,
} from '../../../.storybook/components';
import { PostCard, ListItem, Avatar } from '../../../src/instanooria/components';
import { instaAvatars, instaPhotos } from '../fixtures';

/**
 * Renderiza uma amostra da escala tipográfica com suas especificações.
 */
const TypeSpecimen: React.FC<{ token: InstaTypographyToken; sample?: string }> = ({
  token,
  sample,
}) => {
  const style = instaTypography[token];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard?.writeText(style.className);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div
      style={{
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        padding: '18px 20px',
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
          gap: 12,
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: '#6487C2' }}>{style.figmaName}</span>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            fontSize: 11,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            color: copied ? '#01B574' : '#475157',
            border: '1px solid #E4E8E9',
            borderRadius: 999,
            padding: '4px 10px',
            background: '#F5F5F5',
            cursor: 'pointer',
          }}
        >
          {copied ? '✓ Copiado' : `.${style.className}`}
        </button>
      </div>

      <p
        style={{
          margin: '0 0 12px 0',
          fontFamily: instaFontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: typeof style.lineHeight === 'number' && style.lineHeight > 3
            ? `${style.lineHeight}px`
            : String(style.lineHeight),
          letterSpacing: `${style.letterSpacing}px`,
          color: '#22272A',
        }}
      >
        {sample ?? 'Instanooria — a rede visual da Unooria'}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
        {[
          `${style.fontSize}px`,
          `peso ${style.fontWeight}`,
          `linha ${typeof style.lineHeight === 'number' && style.lineHeight > 3 ? `${style.lineHeight}px` : '100%'}`,
          `tracking ${style.letterSpacing}px`,
        ].map((chip) => (
          <span
            key={chip}
            style={{
              fontSize: 11,
              color: '#475157',
              backgroundColor: '#F5F5F5',
              borderRadius: 999,
              padding: '3px 10px',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            }}
          >
            {chip}
          </span>
        ))}
      </div>

      <p style={{ margin: 0, fontSize: 12.5, color: '#475157', lineHeight: 1.6 }}>{style.usage}</p>
    </div>
  );
};

/**
 * Página de documentação rica da escala tipográfica do Instanooria.
 */
const TipografiaDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Fundamentos • Tipografia"
      title="Tipografia"
      description="Escala tipográfica do Instanooria na família SF Pro, extraída dos estilos de texto do arquivo Figma. São 14 estilos organizados em cinco famílias semânticas — Heading, Title, Body, Label e Caption — mais dois estilos de navegação usados sobre mídia."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Como a escala está estruturada e como escolher o estilo correto."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🔤" title="SF Pro com fallback nativo">
        A família de origem é a SF Pro do iOS. A cadeia de fallback começa em{' '}
        <code>-apple-system</code>, cobrindo macOS e iOS nativamente e degradando para Segoe UI e
        Roboto nas demais plataformas.
      </InstaDocCard>
      <InstaDocCard icon="⚖️" title="Três pesos, não nove">
        A SF Pro usa eixos variáveis: 400 (Regular), 510 (Medium) e 590 (Semibold). Não existem
        pesos 700 ou 800 no arquivo — hierarquia se resolve por tamanho e cor, não por peso.
      </InstaDocCard>
      <InstaDocCard icon="📐" title="Tracking negativo">
        Quase todos os estilos aplicam tracking negativo (de -0.1px a -0.5px). Ignorar esse ajuste
        deixa o texto visivelmente mais largo do que no design.
      </InstaDocCard>
      <InstaDocCard icon="🧩" title="Pares canônicos">
        Cabeçalho de post usa Label/Large + Overline/Small; linhas de lista usam Title/Small +
        Label/Medium; overlays sobre mídia usam Navigation/Title.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Estilos de texto lidos diretamente das variáveis do arquivo de design."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1646"
      frameName="Instagram Main (Classic)"
      specs={[
        { label: 'Família', value: 'SF Pro' },
        { label: 'Estilos mapeados', value: '14' },
        { label: 'Pesos', value: '400 / 510 / 590' },
        { label: 'Menor tamanho', value: '8px (Navigation/Badge)' },
        { label: 'Maior tamanho', value: '17px (Heading/H3)' },
        { label: 'Tracking', value: '-0.5px a +0.5px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia da Escala"
      description="Clique na etiqueta de cada amostra para copiar a classe utilitária correspondente."
    />
    {instaTypographyOrder.map((token) => (
      <TypeSpecimen key={token} token={token} />
    ))}

    <UnooriaDocSectionHeader
      title="4. Matriz de Pesos"
      description="Os três eixos de peso disponíveis na família, aplicados ao mesmo tamanho."
    />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}
    >
      {Object.entries(instaFontWeights).map(([name, weight]) => (
        <div
          key={name}
          style={{ border: '1px solid #E4E8E9', borderRadius: 12, padding: 18, background: '#FFF' }}
        >
          <div
            style={{
              fontFamily: instaFontFamily,
              fontSize: 20,
              fontWeight: weight,
              color: '#22272A',
              marginBottom: 8,
            }}
          >
            instanooria
          </div>
          <div style={{ fontSize: 12, color: '#475157' }}>
            {name} · <code>{weight}</code>
          </div>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de aplicação tipográfica verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Aplicar as classes utilitárias .insta-text--* ou as variáveis --insta-font-* diretamente.',
        'Manter o tracking negativo declarado em cada estilo — ele faz parte da identidade.',
        'Usar Label/Large para o nome do autor e Label/Medium para o corpo da legenda.',
        'Reservar Navigation/Title e Navigation/Badge para conteúdo sobreposto a mídia.',
      ]}
      donts={[
        'Introduzir tamanhos fora da escala (14.5px, 18px) para "encaixar" um layout.',
        'Usar font-weight 700 ou bold: a SF Pro do arquivo vai só até 590.',
        'Aplicar a fonte da Plataforma Unooria (Open Sans) dentro do Instanooria.',
        'Compensar hierarquia com maiúsculas: o arquivo só usa caixa alta na etiqueta LIVE.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A escala é idêntica nos dois temas; apenas a cor do texto muda."
    />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <div style={{ width: 340 }}>
          <PostCard theme={activeTheme}>
            <PostCard.Header
              username="joshua_l"
              location="Tóquio, Japão"
              avatarSrc={instaAvatars.joshua_l}
              verified
              theme={activeTheme}
              onMore={() => undefined}
            />
            <PostCard.Media src={instaPhotos.tokyo} alt="Cruzamento de Shibuya" theme={activeTheme} />
            <PostCard.Caption username="joshua_l" theme={activeTheme}>
              O jogo no Japão foi incrível e eu quero compartilhar algumas fotos.
            </PostCard.Caption>
            <PostCard.Timestamp theme={activeTheme}>19 de setembro</PostCard.Timestamp>
          </PostCard>
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa da Escala"
      description="Todos os estilos com suas medidas exatas e a classe utilitária correspondente."
    />
    <div style={{ border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: '#F5F5F5' }}>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Figma</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Classe</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Tamanho</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Peso</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Linha</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: '#22272A' }}>Tracking</th>
          </tr>
        </thead>
        <tbody>
          {instaTypographyOrder.map((token) => {
            const style = instaTypography[token];
            return (
              <tr key={token} style={{ borderTop: '1px solid #E4E8E9' }}>
                <td style={{ padding: '10px 14px', color: '#22272A', fontWeight: 600 }}>
                  {style.figmaName}
                </td>
                <td
                  style={{
                    padding: '10px 14px',
                    color: '#6487C2',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 12,
                  }}
                >
                  .{style.className}
                </td>
                <td style={{ padding: '10px 14px', color: '#475157' }}>{style.fontSize}px</td>
                <td style={{ padding: '10px 14px', color: '#475157' }}>{style.fontWeight}</td>
                <td style={{ padding: '10px 14px', color: '#475157' }}>
                  {typeof style.lineHeight === 'number' && style.lineHeight > 3
                    ? `${style.lineHeight}px`
                    : '100%'}
                </td>
                <td style={{ padding: '10px 14px', color: '#475157' }}>{style.letterSpacing}px</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Instanooria/Fundamentos/Tipografia',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Escala tipográfica do Instanooria na família SF Pro, com 14 estilos extraídos dos estilos de texto do arquivo Figma.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa da escala tipográfica baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TipografiaDocumentationPage />,
};

/**
 * Pares tipográficos canônicos aplicados a componentes reais de produção.
 */
export const ParesCanonicos: Story = {
  name: '🎨 Pares Canônicos do Figma',
  render: () => (
    <div style={{ display: 'grid', gap: 24, maxWidth: 420 }}>
      <div style={{ border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <ListItem
          leading={<Avatar src={instaAvatars.karennne} alt="" size={56} ring="story" />}
          title="karennne"
          subtitle="Ouvi dizer que esse filme é bom, você viu?"
          meta="· agora"
          bordered
        />
        <ListItem
          leading={<Avatar src={instaAvatars.kieron_d} alt="" size={56} />}
          title="kiero_d"
          subtitle="O novo design ficou incrível"
          meta="· 1m"
        />
      </div>
      <p style={{ fontSize: 13, color: '#475157', margin: 0, lineHeight: 1.6 }}>
        Linha de lista: <strong>Title/Small</strong> no nome e <strong>Label/Medium</strong> na
        prévia da mensagem, com o horário em <code>--insta-color-text-secondary</code>.
      </p>
    </div>
  ),
};
