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
  WaDocStage,
  WaDocTokenSwatch,
} from '../../../.storybook/components';
import {
  waSurfaceColors,
  waAccentColors,
  waStatusColors,
  waTextColors,
  waIconColors,
  waBorderColors,
  waAttachmentColors,
} from '../../../src/whatsappmobile/tokens';
import type { WaColorToken } from '../../../src/whatsappmobile/tokens';

const BAR = '#0CA996';

/**
 * Grade de amostras de cor para um grupo de tokens.
 */
const SwatchGroup: React.FC<{ tokens: Record<string, WaColorToken>; textPreview?: boolean }> = ({
  tokens,
  textPreview = false,
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
      gap: 14,
      marginBottom: 32,
    }}
  >
    {Object.entries(tokens).map(([key, token]) => (
      <WaDocTokenSwatch
        key={key}
        name={key}
        cssVar={token.cssVar}
        value={textPreview ? '#101D25' : token.value}
        figmaName={token.figmaNode ? `${token.usage} · ${token.figmaNode}` : token.usage}
        preview={
          textPreview ? (
            <span
              style={{
                color: token.value,
                fontFamily: "'PT Sans', sans-serif",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Aa 08:34
            </span>
          ) : undefined
        }
      />
    ))}
  </div>
);

/**
 * Comparador interativo de contraste entre uma cor de texto e uma superfície.
 */
const ContrastLab: React.FC = () => {
  const surfaces = Object.entries(waSurfaceColors).filter(([, token]) =>
    token.value.startsWith('#')
  );
  const texts = Object.entries(waTextColors);

  const [surfaceKey, setSurfaceKey] = useState('canvas');
  const [textKey, setTextKey] = useState('primary');

  const surface = waSurfaceColors[surfaceKey];
  const text = waTextColors[textKey];

  const luminance = (hex: string) => {
    const value = hex.replace('#', '');
    const channels = [0, 2, 4].map((offset) => {
      const channel = parseInt(value.slice(offset, offset + 2), 16) / 255;
      return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };

  const ratio = (() => {
    const a = luminance(surface.value);
    const b = luminance(text.value);
    const lighter = Math.max(a, b);
    const darker = Math.min(a, b);
    return (lighter + 0.05) / (darker + 0.05);
  })();

  const selectStyle: React.CSSProperties = {
    padding: '8px 10px',
    borderRadius: 8,
    border: '1px solid #E4E8E9',
    fontSize: 13,
    color: '#22272A',
    background: '#FFFFFF',
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <label style={{ fontSize: 12, color: '#475157', display: 'grid', gap: 4 }}>
          Superfície
          <select
            style={selectStyle}
            value={surfaceKey}
            onChange={(event) => setSurfaceKey(event.target.value)}
          >
            {surfaces.map(([key, token]) => (
              <option key={key} value={key}>
                {key} · {token.value}
              </option>
            ))}
          </select>
        </label>

        <label style={{ fontSize: 12, color: '#475157', display: 'grid', gap: 4 }}>
          Texto
          <select
            style={selectStyle}
            value={textKey}
            onChange={(event) => setTextKey(event.target.value)}
          >
            {texts.map(([key, token]) => (
              <option key={key} value={key}>
                {key} · {token.value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        style={{
          background: surface.value,
          border: '1px solid #E4E8E9',
          borderRadius: 12,
          padding: 28,
        }}
      >
        <p
          style={{
            margin: 0,
            color: text.value,
            fontFamily: "'PT Sans', sans-serif",
            fontSize: 21,
          }}
        >
          Jane Doe — Messages and calls are end-to-end encrypted.
        </p>
        <p
          style={{
            margin: '10px 0 0',
            color: text.value,
            fontFamily: "'PT Sans', sans-serif",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          3:14 pm · contraste {ratio.toFixed(2)}:1{' '}
          {ratio >= 4.5 ? '✅ AA' : ratio >= 3 ? '⚠️ AA Large' : '🚫 abaixo de AA'}
        </p>
      </div>
    </div>
  );
};

/**
 * Página de documentação rica dos tokens de cor do WhatsApp Mobile.
 */
const CoresDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Fundamentos • Cores"
      title="Cores"
      description="Paleta completa do clone do WhatsApp em tema escuro. Todos os valores foram lidos diretamente dos exports SVG e do contexto de design dos frames de 411×823 do arquivo Figma de origem — nenhum tom foi estimado a partir de captura de tela. A paleta cobre seis superfícies empilhadas, uma família de onze verdes-água, as superfícies verdes da tela de chamada, vinte e cinco cores de texto, dezesseis de ícone, quatro de borda e as seis cores de ação da folha de anexos."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Como a paleta se organiza e quando aplicar cada família."
    />
    <WaDocGrid>
      <WaDocCard icon="🌒" title="Tema único: escuro">
        O arquivo de origem é o <strong>WhatsApp Clone — Dark mode</strong> e publica apenas o
        tema escuro. Os tokens vivem em <code>:root</code> e também sob{' '}
        <code>[data-wa-theme=&quot;dark&quot;]</code>, permitindo escopar uma região sem depender
        de tema global.
      </WaDocCard>
      <WaDocCard icon="🧱" title="Seis superfícies empilhadas">
        <code>base</code> (#090E12) → <code>canvas</code> (#101D25) → <code>appbar</code>{' '}
        (#232D36) → <code>sheet</code> (#2D383E) → <code>elevated</code> (#313C42) →{' '}
        <code>dialog</code> (#364147). A profundidade é comunicada por luminância crescente, não
        por sombra.
      </WaDocCard>
      <WaDocCard icon="🟩" title="Família de verdes-água">
        O arquivo comunitário usa onze verdes ligeiramente distintos para aba ativa, selos, FABs,
        ícones de chamada e botões de texto. Cada um é preservado como token nomeado pelo seu uso,
        garantindo reprodução fiel em vez de consolidação arbitrária.
      </WaDocCard>
      <WaDocCard icon="📞" title="Superfícies de chamada">
        A tela de chamada troca todo o esquema por verdes escuros próprios
        (<code>--wa-color-call-*</code>), com o vermelho <code>#E91C43</code> reservado
        exclusivamente ao encerramento.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Figma e especificações técnicas"
      description="Arquivo de origem, nós de referência e desvios registrados."
    />
    <WaDocFigmaSpecs
      nodeId="1:2024"
      frameName="Chats Main Page"
      specs={[
        { label: 'File key', value: 'MSEV2CgXr84WwOyMauIBy2' },
        { label: 'Página', value: '0:1 — Design' },
        { label: 'Frames analisados', value: '75 × 411×823' },
        { label: 'Prefixo de tokens', value: '--wa-color-*' },
        { label: 'Atributo de tema', value: 'data-wa-theme="dark"' },
        { label: 'Total de tokens de cor', value: '72' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Variáveis do Figma',
          detail:
            'o arquivo comunitário não publica variáveis de cor (get_variable_defs retorna vazio). Os tokens foram derivados dos preenchimentos literais dos nós, com o node de origem registrado em cada token.',
        },
        {
          subject: 'Tema claro',
          detail:
            'ausente no arquivo. Nenhum valor claro foi inventado; a documentação demonstra o comportamento sobre cada superfície escura oficial em vez de simular um tema inexistente.',
        },
        {
          subject: '--wa-color-accent vs. --wa-color-accent-status',
          detail:
            'a aba CHATS ativa usa #0CA996 (node 1:2140) e a aba STATUS ativa usa #189C87 (node 1:151). A divergência é do próprio arquivo e foi preservada em dois tokens distintos.',
        },
        {
          subject: '--wa-color-surface-bubble-in',
          detail:
            'nenhum frame do arquivo publica um balão de mensagem recebida. O token adota #232D36, a superfície de app bar, para manter a hierarquia de luminância contra o balão enviado #054640.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Superfícies"
      description="Clique em qualquer amostra para copiar a variável CSS."
    />
    <SwatchGroup tokens={waSurfaceColors} />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Família de verdes-água da marca"
      description="Onze tons distintos, cada um nomeado pelo uso original no arquivo."
    />
    <SwatchGroup tokens={waAccentColors} />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Severidades e superfícies de chamada"
      description="Vermelho de encerramento, amarelo de bateria e os verdes exclusivos da chamada."
    />
    <SwatchGroup tokens={waStatusColors} />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Texto"
      description="Cada amostra renderiza o tom sobre --wa-color-surface-canvas."
    />
    <SwatchGroup tokens={waTextColors} textPreview />

    <UnooriaDocSectionHeader barColor={BAR} title="7. Ícones" />
    <SwatchGroup tokens={waIconColors} textPreview />

    <UnooriaDocSectionHeader barColor={BAR} title="8. Bordas, divisores e anéis" />
    <SwatchGroup tokens={waBorderColors} />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="9. Ações da folha de anexos"
      description="Seis cores medidas no frame Pin option (node 1:3943)."
    />
    <SwatchGroup tokens={waAttachmentColors} />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="10. Laboratório de contraste"
      description="Combine qualquer superfície com qualquer cor de texto e verifique a razão de contraste WCAG em tempo real."
    />
    <ContrastLab />

    <UnooriaDocSectionHeader barColor={BAR} title="11. Boas práticas" />
    <WaDocPractices
      dos={[
        'Consumir sempre var(--wa-color-*); nunca repetir o hexadecimal no componente.',
        'Empilhar superfícies em ordem crescente de luminância para comunicar profundidade.',
        'Usar o token de verde-água correspondente ao contexto (FAB, selo, aba, botão de texto).',
        'Reservar --wa-color-danger-endcall exclusivamente para encerrar chamadas.',
        'Escopar regiões com data-wa-theme="dark" quando o componente conviver com outra marca.',
      ]}
      donts={[
        'Misturar tokens de outra marca (--unooria-*, --insta-*) dentro do WhatsApp Mobile.',
        'Consolidar os onze verdes-água em um único token: a fidelidade ao arquivo seria perdida.',
        'Introduzir um tema claro derivado por cálculo — não existe no arquivo de origem.',
        'Aplicar sombras para separar superfícies; o arquivo é inteiramente plano.',
        'Usar --wa-color-text-on-accent sobre superfícies escuras (é a cor do numeral no selo verde).',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="12. Superfícies em conjunto"
      description="Pilha completa renderizada com os tokens reais."
    />
    <WaDocStage surface="base" direction="column" align="stretch" padding={0} gap={0}>
      {(
        [
          ['--wa-color-surface-base', 'base · #090E12'],
          ['--wa-color-surface-canvas', 'canvas · #101D25'],
          ['--wa-color-surface-appbar', 'appbar · #232D36'],
          ['--wa-color-surface-sheet', 'sheet · #2D383E'],
          ['--wa-color-surface-elevated', 'elevated · #313C42'],
          ['--wa-color-surface-dialog', 'dialog · #364147'],
          ['--wa-color-call-surface', 'call · #054C44'],
          ['--wa-color-surface-bubble-out', 'bubble-out · #054640'],
        ] as const
      ).map(([cssVar, label]) => (
        <div
          key={cssVar}
          style={{
            background: `var(${cssVar})`,
            color: 'var(--wa-color-text-primary)',
            fontFamily: 'var(--wa-font-sans)',
            fontSize: 13,
            padding: '16px 20px',
          }}
        >
          {label}
        </div>
      ))}
    </WaDocStage>
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Whatsapp Mobile/Fundamentos/Cores',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa dos tokens de cor, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CoresDocumentationPage />,
};

/**
 * Catálogo compacto de todas as superfícies do arquivo.
 */
export const Superficies: Story = {
  name: '🎨 Superfícies',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Superfícies" />
      <SwatchGroup tokens={waSurfaceColors} />
    </UnooriaDocShell>
  ),
};

/**
 * Catálogo compacto da família de verdes-água da marca.
 */
export const VerdesDaMarca: Story = {
  name: '🟩 Verdes da marca',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Família de verdes-água" />
      <SwatchGroup tokens={waAccentColors} />
    </UnooriaDocShell>
  ),
};

/**
 * Laboratório interativo de contraste entre superfícies e cores de texto.
 */
export const Contraste: Story = {
  name: '🕹️ Laboratório de contraste',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader
        barColor={BAR}
        title="Laboratório de contraste"
        description="Combine superfície e texto e verifique a razão WCAG em tempo real."
      />
      <ContrastLab />
    </UnooriaDocShell>
  ),
};
