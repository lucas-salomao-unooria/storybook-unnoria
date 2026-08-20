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
import { Icon, waIcons, waIconNames } from '../../../src/whatsappmobile';
import type { WaIconName, WaIconTone } from '../../../src/whatsappmobile';

const BAR = '#0CA996';

const TONES: WaIconTone[] = [
  'appbar',
  'camera',
  'back',
  'composerEmoji',
  'composerAttach',
  'composerCamera',
  'onAccent',
  'accent',
  'settings',
  'settingsHelp',
  'settingsQr',
  'tick',
  'star',
  'forward',
  'pin',
  'callIcon',
  'callIconMuted',
  'callOut',
  'callIn',
  'statusBar',
  'notice',
  'ring',
  'inherit',
];

/**
 * Catálogo completo de glifos, com busca e cópia do nome.
 */
const IconCatalog: React.FC = () => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = waIconNames.filter((name) => {
    const definition = waIcons[name];
    const haystack = `${name} ${definition.figmaName} ${definition.usage}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  const handleCopy = (name: string) => {
    void navigator.clipboard?.writeText(`<Icon name="${name}" />`);
    setCopied(name);
    window.setTimeout(() => setCopied(null), 1400);
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filtrar por nome, camada do Figma ou uso…"
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '10px 12px',
          borderRadius: 8,
          border: '1px solid #E4E8E9',
          fontSize: 13,
          marginBottom: 14,
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
          gap: 12,
        }}
      >
        {filtered.map((name) => {
          const definition = waIcons[name];
          return (
            <button
              key={name}
              type="button"
              onClick={() => handleCopy(name)}
              style={{
                border: '1px solid #E4E8E9',
                borderRadius: 12,
                background: '#FFFFFF',
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div
                data-wa-theme="dark"
                style={{
                  background: 'var(--wa-color-surface-canvas)',
                  height: 78,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name={name} size={30} tone="appbar" />
              </div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#22272A' }}>{name}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#6487C2',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    marginTop: 2,
                    wordBreak: 'break-all',
                  }}
                >
                  {definition.figmaName}
                </div>
                <div style={{ fontSize: 11, color: '#475157', marginTop: 4, lineHeight: 1.4 }}>
                  {definition.usage}
                </div>
                <div
                  style={{
                    fontSize: 10.5,
                    color: '#475157',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    marginTop: 4,
                  }}
                >
                  viewBox {definition.viewBox}
                </div>
                <div
                  style={{ fontSize: 11, color: copied === name ? '#01B574' : '#475157', marginTop: 6 }}
                >
                  {copied === name ? '✓ Copiado!' : 'Clique para copiar o JSX'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ fontSize: 13, color: '#475157' }}>Nenhum glifo corresponde ao filtro.</p>
      )}
    </div>
  );
};

/**
 * Playground do componente Icon com todas as props expostas.
 */
const IconPlayground: React.FC<{
  name: WaIconName;
  size: number;
  tone: WaIconTone;
  rotate: number;
  flipX: boolean;
  title?: string;
}> = (props) => (
  <WaDocStage surface="canvas" padding={40}>
    <Icon {...props} />
  </WaDocStage>
);

/**
 * Página de documentação rica da iconografia do WhatsApp Mobile.
 */
const IconesDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Fundamentos • Ícones"
      title="Ícones"
      description={`Biblioteca de ${waIconNames.length} glifos exportados diretamente do arquivo Figma. Todo atributo "d" é literal do export SVG e todo viewBox preserva a proporção original — nenhum caminho foi desenhado à mão, aproximado ou substituído por outra biblioteca. Quando um glifo combina dois nós do Figma posicionados em coordenadas diferentes, o deslocamento é aplicado por transform, jamais reescrevendo as coordenadas do caminho.`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Origem, fidelidade e composição dos glifos."
    />
    <WaDocGrid>
      <WaDocCard icon="🔒" title="Fidelidade literal">
        Cada glifo carrega <code>figmaName</code>, <code>viewBox</code>, <code>usage</code> e o node
        de origem. Alterações exigem reexportar o SVG do arquivo — nunca editar o caminho à mão.
      </WaDocCard>
      <WaDocCard icon="📐" title="viewBox não normalizado">
        Os viewBox variam (20×17,5; 25×25; 26×31; 38,414×35,414). Normalizar para 24×24 distorceria
        as proporções desenhadas, por isso a caixa original é preservada.
      </WaDocCard>
      <WaDocCard icon="🔄" title="Reuso por rotação">
        O arquivo reaproveita glifos girados: <code>overflow</code> a 90°, <code>phone</code> a
        -127,81°, <code>callOut</code>/<code>callIn</code> a -132,75° e <code>phoneFilled</code> a
        -45°. A prop <code>rotate</code> reproduz isso sem duplicar vetor.
      </WaDocCard>
      <WaDocCard icon="🧩" title="Glifos compostos">
        <code>settingsHelp</code> combina o anel e o ponto de interrogação;{' '}
        <code>composerCamera</code> combina corpo e lente. Ambos usam{' '}
        <code>transform=&quot;translate(…)&quot;</code> para manter os caminhos intactos.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Figma e especificações técnicas"
      description="Arquivo de origem, nós de referência e desvios registrados."
    />
    <WaDocFigmaSpecs
      nodeId="1:2138"
      frameName="Chats Main Page · fa-solid:camera"
      specs={[
        { label: 'Glifos registrados', value: String(waIconNames.length) },
        { label: 'Origem dos caminhos', value: 'Export SVG do Figma' },
        { label: 'viewBox', value: 'Original, não normalizado' },
        { label: 'Preenchimento', value: 'currentColor' },
        { label: 'Cores fixas', value: 'filePdf (#F3464A / #FA7A79)' },
        { label: 'Registro', value: 'src/whatsappmobile/components/Icon/IconPaths.tsx' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'icomoon-free:magic-wand',
          detail:
            'presente na barra de status de todos os frames, porém exportado vazio pelo Figma (sem dado vetorial). O glifo não foi registrado; desenhá-lo à mão violaria a regra de fidelidade.',
        },
        {
          subject: 'micBody e micStand',
          detail:
            'no arquivo o microfone do FAB são dois nós independentes. Em vez de fundi-los em um caminho novo, ambos são registrados separadamente e compostos pelo componente Fab nas coordenadas do arquivo.',
        },
        {
          subject: 'Linhas internas do newChat',
          detail:
            'as duas linhas do balão (Line 16 e Line 17, nodes 1:2131 e 1:2132) são nós irmãos do vetor no arquivo, com traços #04A595 e #04AD9C. Foram registradas como formas `line` nas coordenadas originais e pintadas com --wa-color-accent-fab-chat, já que são recortes do próprio círculo do FAB.',
        },
        {
          subject: 'newChat e pencil',
          detail:
            'mantêm o viewBox original do grupo (52×51 e 41×40), incluindo o espaço em volta do vetor. Isso posiciona o glifo dentro do FAB exatamente como no Figma.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Catálogo completo"
      description="Busque por nome, camada do Figma ou uso; clique para copiar o JSX."
    />
    <IconCatalog />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Tamanhos"
      description="Cinco tamanhos nomeados, além de qualquer valor numérico em pixels."
    />
    <WaDocStage surface="canvas" padding={28}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Icon name="search" size={size} tone="appbar" />
          <div
            style={{
              marginTop: 8,
              color: 'var(--wa-color-text-meta)',
              fontFamily: 'var(--wa-font-sans)',
              fontSize: 11,
            }}
          >
            {size}
          </div>
        </div>
      ))}
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Tons semânticos"
      description="Cada tom resolve um token --wa-color-icon-* ou --wa-color-accent-*."
    />
    <WaDocStage surface="canvas" padding={24} gap={20}>
      {TONES.map((tone) => (
        <div key={tone} style={{ textAlign: 'center', width: 92 }}>
          <Icon name="phoneFilled" size={24} tone={tone} />
          <div
            style={{
              marginTop: 6,
              color: 'var(--wa-color-text-meta)',
              fontFamily: 'var(--wa-font-sans)',
              fontSize: 10.5,
              wordBreak: 'break-word',
            }}
          >
            {tone}
          </div>
        </div>
      ))}
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Rotações usadas pelo arquivo"
      description="Os mesmos vetores reaproveitados em ângulos diferentes."
    />
    <WaDocStage surface="canvas" padding={28} gap={32}>
      {[
        { name: 'overflow' as const, rotate: 90, label: 'overflow · 90°' },
        { name: 'phone' as const, rotate: -127.81, label: 'phone · -127,81°' },
        { name: 'callOut' as const, rotate: -132.75, label: 'callOut · -132,75°' },
        { name: 'callIn' as const, rotate: -132.75, label: 'callIn · -132,75°' },
        { name: 'phoneFilled' as const, rotate: -45, label: 'phoneFilled · -45°' },
        { name: 'settingsChats' as const, rotate: 180, label: 'settingsChats · 180°' },
      ].map((item) => (
        <div key={item.label} style={{ textAlign: 'center', width: 130 }}>
          <Icon name={item.name} size={26} tone="appbar" rotate={item.rotate} />
          <div
            style={{
              marginTop: 8,
              color: 'var(--wa-color-text-meta)',
              fontFamily: 'var(--wa-font-sans)',
              fontSize: 11,
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Boas práticas" />
    <WaDocPractices
      dos={[
        'Importar sempre o componente Icon de src/whatsappmobile e escolher o glifo pelo nome.',
        'Reaproveitar um glifo com a prop rotate quando o arquivo faz o mesmo.',
        'Informar `title` quando o ícone carrega significado sozinho; omitir quando é decorativo.',
        'Reexportar o SVG do Figma ao adicionar um glifo, preenchendo figmaName, viewBox e usage.',
      ]}
      donts={[
        'Desenhar, aproximar ou reescrever um caminho SVG à mão.',
        'Normalizar o viewBox para 24×24.',
        'Substituir um glifo por um equivalente de outra biblioteca de ícones.',
        'Fundir dois nós do Figma em um único caminho recalculando coordenadas.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="Icon"
      rows={[
        {
          name: 'name',
          type: 'WaIconName',
          description: 'Nome do glifo na biblioteca oficial exportada do Figma. Obrigatório.',
        },
        {
          name: 'size',
          type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
          default: "'md'",
          description: 'Tamanho nomeado (13, 17, 20, 25 ou 28px) ou valor livre em pixels.',
        },
        {
          name: 'tone',
          type: 'WaIconTone',
          default: "'appbar'",
          description: 'Tom semântico resolvido a partir dos tokens de cor de ícone.',
        },
        {
          name: 'rotate',
          type: 'number',
          default: '0',
          description: 'Rotação em graus, usada para reproduzir os reusos do arquivo.',
        },
        {
          name: 'flipX',
          type: 'boolean',
          default: 'false',
          description: 'Espelha o glifo no eixo horizontal, como no export de cameraFilled.',
        },
        {
          name: 'title',
          type: 'string',
          description:
            'Rótulo acessível. Quando informado o SVG recebe role="img"; quando omitido é decorativo.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Classe CSS adicional aplicada ao elemento SVG.',
        },
      ]}
    />
    <WaDocPropsTable
      title="Estrutura de WaIconDefinition"
      rows={[
        { name: 'figmaName', type: 'string', description: 'Nome da camada correspondente no Figma.' },
        { name: 'viewBox', type: 'string', description: 'viewBox original preservado do export.' },
        {
          name: 'shapes',
          type: "Array<{ type: 'path' | 'circle' | 'line', … }>",
          description:
            'Formas vetoriais literais. `translate` desloca um nó composto sem alterar o atributo d.',
        },
        { name: 'usage', type: 'string', description: 'Contexto de uso do glifo no produto.' },
        { name: 'figmaNode', type: 'string', description: 'Node do Figma em que o glifo foi lido.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Icon> = {
  title: 'Whatsapp Mobile/Fundamentos/Ícones',
  component: Icon,
  parameters: { layout: 'padded' },
  argTypes: {
    name: {
      control: 'select',
      options: waIconNames,
      description: 'Nome do glifo na biblioteca oficial exportada do Figma.',
    },
    size: {
      control: { type: 'range', min: 10, max: 96, step: 1 },
      description: 'Tamanho em pixels.',
    },
    tone: {
      control: 'select',
      options: TONES,
      description: 'Tom semântico aplicado ao preenchimento.',
    },
    rotate: {
      control: { type: 'range', min: -180, max: 180, step: 0.01 },
      description: 'Rotação em graus.',
    },
    flipX: { control: 'boolean', description: 'Espelha o glifo no eixo horizontal.' },
    title: { control: 'text', description: 'Rótulo acessível.' },
  },
  args: {
    name: 'search',
    size: 48,
    tone: 'appbar',
    rotate: 0,
    flipX: false,
    title: '',
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

/**
 * Documentação rica e completa da iconografia, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <IconesDocumentationPage />,
};

/**
 * Playground com 100% das props do componente Icon expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Icon',
  render: (args) => (
    <IconPlayground
      name={args.name as WaIconName}
      size={args.size as number}
      tone={args.tone as WaIconTone}
      rotate={args.rotate as number}
      flipX={args.flipX as boolean}
      title={args.title as string}
    />
  ),
};

/**
 * Catálogo completo dos glifos exportados do Figma.
 */
export const Catalogo: Story = {
  name: '🎨 Catálogo completo',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Catálogo de glifos" />
      <IconCatalog />
    </UnooriaDocShell>
  ),
};

/**
 * Matriz de tamanhos nomeados.
 */
export const Tamanhos: Story = {
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Tamanhos" />
      <WaDocStage surface="canvas" padding={28}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <Icon name="search" size={size} tone="appbar" />
            <div
              style={{
                marginTop: 8,
                color: 'var(--wa-color-text-meta)',
                fontFamily: 'var(--wa-font-sans)',
                fontSize: 11,
              }}
            >
              {size}
            </div>
          </div>
        ))}
      </WaDocStage>
    </UnooriaDocShell>
  ),
};

/**
 * Matriz completa de tons semânticos.
 */
export const Tons: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Tons semânticos" />
      <WaDocStage surface="canvas" padding={24} gap={20}>
        {TONES.map((tone) => (
          <div key={tone} style={{ textAlign: 'center', width: 92 }}>
            <Icon name="phoneFilled" size={24} tone={tone} />
            <div
              style={{
                marginTop: 6,
                color: 'var(--wa-color-text-meta)',
                fontFamily: 'var(--wa-font-sans)',
                fontSize: 10.5,
              }}
            >
              {tone}
            </div>
          </div>
        ))}
      </WaDocStage>
    </UnooriaDocShell>
  ),
};
