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
  waTypographyScale,
  waFontFamilies,
} from '../../../src/whatsappmobile/tokens';

const BAR = '#0CA996';

/**
 * Espécime de um estilo tipográfico, com amostra renderizada e metadados.
 */
const Specimen: React.FC<{ index: number }> = ({ index }) => {
  const token = waTypographyScale[index];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard?.writeText(`var(${token.cssVarPrefix}-size)`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        background: '#FFFFFF',
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        marginBottom: 12,
      }}
    >
      <div
        data-wa-theme="dark"
        style={{
          background: 'var(--wa-color-surface-canvas)',
          padding: '20px 18px',
        }}
      >
        <span
          style={{
            color: 'var(--wa-color-text-primary)',
            fontFamily: waFontFamilies[token.family],
            fontSize: token.size,
            fontWeight: token.weight,
            lineHeight: token.line,
          }}
        >
          Jane Doe — 08:34
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          padding: '10px 16px',
          fontSize: 12,
          color: '#475157',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}
      >
        <strong style={{ color: '#22272A', fontFamily: 'inherit' }}>{token.name}</strong>
        <span>{token.size}</span>
        <span>w{token.weight}</span>
        <span>{token.family}</span>
        <span style={{ color: '#6487C2' }}>{token.cssVarPrefix}-*</span>
        {token.figmaNode && <span>node {token.figmaNode}</span>}
        <span style={{ color: copied ? '#01B574' : '#475157' }}>
          {copied ? '✓ Copiado!' : 'Clique para copiar'}
        </span>
      </div>
      <div style={{ padding: '0 16px 12px', fontSize: 12.5, color: '#475157' }}>{token.usage}</div>
    </button>
  );
};

/**
 * Simulador que aplica qualquer estilo da escala a um texto arbitrário.
 */
const TypeSimulator: React.FC = () => {
  const [styleIndex, setStyleIndex] = useState(1);
  const [text, setText] = useState('Messages and calls are end-to-end encrypted');
  const token = waTypographyScale[styleIndex];

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <label style={{ fontSize: 12, color: '#475157', display: 'grid', gap: 4 }}>
          Estilo
          <select
            value={styleIndex}
            onChange={(event) => setStyleIndex(Number(event.target.value))}
            style={{
              padding: '8px 10px',
              borderRadius: 8,
              border: '1px solid #E4E8E9',
              fontSize: 13,
            }}
          >
            {waTypographyScale.map((item, index) => (
              <option key={item.name} value={index}>
                {item.name} · {item.size} · w{item.weight}
              </option>
            ))}
          </select>
        </label>

        <label style={{ fontSize: 12, color: '#475157', display: 'grid', gap: 4, flex: 1 }}>
          Texto
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            style={{
              padding: '8px 10px',
              borderRadius: 8,
              border: '1px solid #E4E8E9',
              fontSize: 13,
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
        </label>
      </div>

      <WaDocStage surface="canvas" align="flex-start" padding={24}>
        <span
          style={{
            color: 'var(--wa-color-text-primary)',
            fontFamily: waFontFamilies[token.family],
            fontSize: token.size,
            fontWeight: token.weight,
            lineHeight: token.line,
          }}
        >
          {text}
        </span>
      </WaDocStage>
    </div>
  );
};

/**
 * Página de documentação rica da tipografia do WhatsApp Mobile.
 */
const TipografiaDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Fundamentos • Tipografia"
      title="Tipografia"
      description="Escala de dezoito estilos extraída dos frames do arquivo Figma. A interface usa PT Sans (Regular 400 e Bold 700); a barra de status do Android usa SF Compact Display Semibold; e a assinatura do rodapé das configurações usa Poppins SemiBold. Todos os tamanhos são reproduzidos com a precisão decimal do arquivo — inclusive os degraus fracionários de 18,54px, 15,54px, 14,54px, 16,544px, 14,238px e 13,54px."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Três famílias, dezoito degraus e o papel de cada um."
    />
    <WaDocGrid>
      <WaDocCard icon="🔤" title="PT Sans — interface">
        Família de todo o produto, em dois pesos: <code>400</code> para nomes, corpo e metadados;{' '}
        <code>700</code> para a marca, títulos de página, rótulos de aba, horários e rótulos de
        agrupamento.
      </WaDocCard>
      <WaDocCard icon="📱" title="SF Compact Display — sistema">
        Usada apenas no relógio e no indicador de rede da barra de status, reproduzindo a moldura de
        sistema desenhada no arquivo. Não deve vazar para a interface do aplicativo.
      </WaDocCard>
      <WaDocCard icon="🅕" title="Poppins — assinatura">
        Aparece uma única vez, na palavra <code>FACEBOOK</code> do rodapé das configurações
        (node 1:2751), em SemiBold 14px.
      </WaDocCard>
      <WaDocCard icon="🔢" title="Degraus fracionários">
        O arquivo comunitário foi desenhado com escalas não inteiras. Os valores decimais foram
        preservados em vez de arredondados, para que a documentação corresponda pixel a pixel ao
        Dev Mode.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Figma e especificações técnicas"
      description="Arquivo de origem, nós de referência e desvios registrados."
    />
    <WaDocFigmaSpecs
      nodeId="1:2137"
      frameName="Chats Main Page · WhatsApp"
      specs={[
        { label: 'File key', value: 'MSEV2CgXr84WwOyMauIBy2' },
        { label: 'Famílias', value: 'PT Sans · SF Compact Display · Poppins' },
        { label: 'Pesos', value: '400 · 600 · 700' },
        { label: 'Degraus na escala', value: String(waTypographyScale.length) },
        { label: 'Menor degrau', value: '11px (Badge)' },
        { label: 'Maior degrau', value: '30px (Display/Call)' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Altura de linha',
          detail:
            'todos os textos do arquivo usam line-height "normal" (automático). Nenhum valor numérico foi inventado; os tokens declaram literalmente `normal`.',
        },
        {
          subject: 'Letter-spacing',
          detail:
            'o arquivo não aplica tracking em nenhum estilo. A escala do WhatsApp Mobile, portanto, não declara tokens de tracking.',
        },
        {
          subject: 'SF Compact Display',
          detail:
            'fonte de sistema da Apple, não distribuível. O token declara a família e cai para a pilha de sistema quando indisponível — comportamento idêntico ao do dispositivo real.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Escala completa"
      description="Dezoito degraus em ordem decrescente. Clique em qualquer espécime para copiar a variável de tamanho."
    />
    {waTypographyScale.map((token, index) => (
      <Specimen key={token.name} index={index} />
    ))}

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Simulador interativo"
      description="Aplique qualquer estilo da escala a um texto arbitrário sobre a superfície canvas."
    />
    <TypeSimulator />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Hierarquia em contexto"
      description="Uma linha de conversa combina três degraus distintos."
    />
    <WaDocStage surface="canvas" align="flex-start" padding={24} direction="column" gap={6}>
      <span
        style={{
          color: 'var(--wa-color-text-primary)',
          fontFamily: 'var(--wa-font-sans)',
          fontSize: 'var(--wa-font-title-lg-size)',
          fontWeight: 'var(--wa-font-title-lg-weight)' as never,
        }}
      >
        Jane Doe
      </span>
      <span
        style={{
          color: 'var(--wa-color-text-meta-alt)',
          fontFamily: 'var(--wa-font-sans)',
          fontSize: 'var(--wa-font-label-md-size)',
        }}
      >
        30 minutes ago
      </span>
      <span
        style={{
          color: 'var(--wa-color-text-secondary)',
          fontFamily: 'var(--wa-font-sans)',
          fontSize: 'var(--wa-font-caption-bold-size)',
          fontWeight: 700,
        }}
      >
        3:14 pm
      </span>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Aplicar os tokens --wa-font-* em vez de literais de tamanho e peso.',
        'Preservar os degraus fracionários (18,54px, 14,54px) exatamente como no arquivo.',
        'Reservar --wa-font-statusbar para a moldura de sistema.',
        'Combinar Title/Large com Label/Medium e Caption/Bold nas linhas de lista.',
      ]}
      donts={[
        'Arredondar 18,54px para 18px ou 19px: a régua do Dev Mode deixa de coincidir.',
        'Aplicar letter-spacing — o arquivo não usa tracking em nenhum estilo.',
        'Trocar PT Sans por outra família humanista de aparência semelhante.',
        'Usar Poppins fora da assinatura "FACEBOOK".',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa dos tokens"
      description="Cada degrau expõe as variáveis -size, -weight e -line."
    />
    <WaDocPropsTable
      title="Variáveis CSS da escala tipográfica"
      rows={waTypographyScale.map((token) => ({
        name: token.name,
        type: `${token.cssVarPrefix}-size | -weight | -line`,
        default: `${token.size} / ${token.weight}`,
        description: `${token.usage}${token.figmaNode ? ` (node ${token.figmaNode})` : ''}`,
      }))}
    />
    <WaDocPropsTable
      title="Famílias tipográficas"
      rows={[
        {
          name: 'sans',
          type: '--wa-font-sans',
          default: "'PT Sans'",
          description: 'Família de toda a interface do aplicativo.',
        },
        {
          name: 'statusBar',
          type: '--wa-font-statusbar',
          default: "'SF Compact Display'",
          description: 'Relógio e indicador de rede da barra de status do Android.',
        },
        {
          name: 'brand',
          type: '--wa-font-brand',
          default: "'Poppins'",
          description: 'Assinatura "FACEBOOK" no rodapé das configurações.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Whatsapp Mobile/Fundamentos/Tipografia',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa da tipografia, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TipografiaDocumentationPage />,
};

/**
 * Escala completa em espécimes clicáveis.
 */
export const Escala: Story = {
  name: '🎨 Escala completa',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Escala tipográfica" />
      {waTypographyScale.map((token, index) => (
        <Specimen key={token.name} index={index} />
      ))}
    </UnooriaDocShell>
  ),
};

/**
 * Simulador interativo de estilos tipográficos.
 */
export const Simulador: Story = {
  name: '🕹️ Simulador de estilos',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Simulador de estilos" />
      <TypeSimulator />
    </UnooriaDocShell>
  ),
};
