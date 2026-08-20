import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  WaDocGrid,
  WaDocCard,
  WaDocFigmaSpecs,
  WaDocDeviations,
  WaDocAnatomy,
  WaDocPractices,
  WaDocPropsTable,
  WaDocStage,
  WaDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { Avatar, Icon } from '../../../src/whatsappmobile';
import { waAvatars } from '../fixtures';

const BAR = '#0CA996';

const SIZES = [
  { size: 'xs' as const, label: 'xs · 23px', usage: 'Linha de mensagem favoritada (1:2925)' },
  { size: 'sm' as const, label: 'sm · 32px', usage: 'Cabeçalho de conversa (1:3001)' },
  { size: 'md' as const, label: 'md · 45px', usage: 'Linhas de status (1:93)' },
  { size: 'lg' as const, label: 'lg · 50px', usage: 'Conversas e chamadas (1:2044)' },
];

/**
 * Página de documentação rica do componente Avatar.
 */
const AvatarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Identidade"
      title="Avatar"
      description="Retrato circular do contato, presente em todas as listas do produto. Reproduz os quatro diâmetros do arquivo (23, 32, 45 e 50px) e o anel de status de 2,12px com folga de 3,4px, cuja caixa externa mede exatamente 56px. Também atende aos avatares de ação — círculos preenchidos com um glifo, como em New group e New contact."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Onde cada diâmetro aparece e por que o anel só existe no Status."
    />
    <WaDocGrid>
      <WaDocCard icon="👤" title="Quatro diâmetros absolutos">
        O arquivo não deriva os tamanhos de uma escala: cada lista tem seu diâmetro fixo. Os tokens{' '}
        <code>--wa-avatar-xs|sm|md|lg</code> reproduzem exatamente esses valores.
      </WaDocCard>
      <WaDocCard icon="⭕" title="Anel exclusivo do Status">
        Apenas as linhas da aba Status desenham o anel <code>Ellipse 3</code>. O recorte interno é
        de 45px, a folga é de 3,4px e o traço é de 2,12px — somando os 56px do vetor.
      </WaDocCard>
      <WaDocCard icon="🎯" title="Avatar de ação">
        As telas de contatos usam círculos verde-água com um glifo no lugar do retrato. A prop{' '}
        <code>fill</code> aceita o token de cor e <code>glyph</code> recebe o ícone.
      </WaDocCard>
      <WaDocCard icon="⌨️" title="Semântica adaptativa">
        Sem <code>onClick</code> o avatar é um <code>span</code> decorativo; com{' '}
        <code>onClick</code> vira <code>button</code> focalizável, com anel de foco em{' '}
        <code>--wa-color-accent</code>.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:33"
      frameName="Status Main Page · Ellipse 3"
      specs={[
        { label: 'Anel externo', value: '56 × 56 px' },
        { label: 'Traço do anel', value: '2,1165 px' },
        { label: 'Recorte interno', value: '45 px' },
        { label: 'Folga', value: '3,4 px' },
        { label: 'Cor do anel', value: '#C4C4C4' },
        { label: 'Diâmetros sem anel', value: '23 · 32 · 50 px' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Cor do anel',
          detail:
            'o arquivo usa #C4C4C4 tanto para atualizações recentes quanto para já visualizadas — verificado por amostragem de pixel nos dois grupos. Nenhum anel verde foi introduzido.',
        },
        {
          subject: 'Retratos',
          detail:
            'as imagens são bitmaps colados no arquivo, não componentes. Os arquivos exportados foram versionados em public/whatsappmobile/ e são passados via a prop src.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Anel', role: 'Traço externo exibido apenas em ring="status".', token: '--wa-color-border-status-ring · --wa-status-ring-width' },
        { name: 'Folga', role: 'Respiro de 3,4px entre o anel e o recorte.', token: 'wa-avatar__gap' },
        { name: 'Recorte', role: 'Imagem circular recortada com object-fit: cover.', token: '--wa-avatar-xs|sm|md|lg' },
        { name: 'Fallback', role: 'Iniciais exibidas quando não há src, sobre --wa-color-surface-appbar.', token: '--wa-color-text-primary' },
        { name: 'Glifo', role: 'Ícone sobreposto nos avatares de ação.', token: '--wa-color-icon-on-accent' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de tamanhos, anéis e estados"
      description="Componentes reais renderizados sobre a superfície canvas."
    />
    <WaDocStage surface="canvas" padding={28} gap={28}>
      {SIZES.map((item) => (
        <div key={item.size} style={{ textAlign: 'center', width: 130 }}>
          <Avatar size={item.size} src={waAvatars[0]} alt="Jane Doe" />
          <div style={{ marginTop: 8, color: 'var(--wa-color-text-meta)', fontFamily: 'var(--wa-font-sans)', fontSize: 11 }}>
            {item.label}
            <br />
            {item.usage}
          </div>
        </div>
      ))}
    </WaDocStage>

    <WaDocStage label="Anéis" surface="canvas" padding={28} gap={28}>
      <div style={{ textAlign: 'center' }}>
        <Avatar size="md" ring="none" src={waAvatars[1]} alt="John Doe" />
        <div style={{ marginTop: 8, color: 'var(--wa-color-text-meta)', fontFamily: 'var(--wa-font-sans)', fontSize: 11 }}>{'ring="none"'}</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar size="md" ring="status" src={waAvatars[2]} alt="Jane Doe" />
        <div style={{ marginTop: 8, color: 'var(--wa-color-text-meta)', fontFamily: 'var(--wa-font-sans)', fontSize: 11 }}>{'ring="status"'}</div>
      </div>
    </WaDocStage>

    <WaDocStage label="Fallback e avatares de ação" surface="canvas" padding={28} gap={28}>
      <Avatar size="lg" initials="JD" />
      <Avatar size="lg" initials="JS" />
      <Avatar
        size="lg"
        fill="var(--wa-color-accent-fab)"
        glyph={<Icon name="settingsInvite" size={22} tone="onAccent" />}
      />
      <Avatar
        size="lg"
        fill="var(--wa-color-accent-fab-chat)"
        glyph={<Icon name="newChat" size={50} tone="onAccent" />}
      />
    </WaDocStage>

    <WaDocStage label="Interativo (recebe foco)" surface="canvas" padding={28} gap={28}>
      <Avatar size="lg" src={waAvatars[3]} alt="John Doe" onClick={() => undefined} />
      <Avatar size="md" ring="status" src={waAvatars[4]} alt="Jane Doe" onClick={() => undefined} />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Escolher o tamanho pelo contexto: lg em conversas, md no Status, sm no cabeçalho de conversa e xs em favoritas.',
        'Aplicar ring="status" apenas nas linhas da aba Status.',
        'Informar alt sempre que houver src e o avatar carregar significado.',
        'Usar fill com um token --wa-color-* nos avatares de ação, nunca com hexadecimal avulso.',
      ]}
      donts={[
        'Aplicar o anel a linhas de conversa ou de chamadas.',
        'Usar um diâmetro intermediário que não exista no arquivo.',
        'Passar onClick apenas para obter o cursor — isso muda a semântica para botão.',
        'Substituir o retrato ausente por uma silhueta desenhada à mão.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher>
      {() => (
        <>
          <Avatar size="lg" src={waAvatars[5]} alt="John Doe" />
          <Avatar size="md" ring="status" src={waAvatars[6]} alt="Jane Doe" />
          <Avatar size="sm" src={waAvatars[7]} alt="Jane Doe" />
          <Avatar size="xs" src={waAvatars[8]} alt="John Doe" />
          <Avatar size="lg" initials="JD" />
        </>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="Avatar"
      rows={[
        { name: 'src', type: 'string', description: 'URL da imagem de perfil. Sem ela, exibe as iniciais.' },
        { name: 'alt', type: 'string', default: "''", description: 'Texto alternativo da imagem.' },
        { name: 'initials', type: 'string', description: 'Iniciais exibidas quando não há imagem.' },
        { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | number", default: "'lg'", description: 'Diâmetro nomeado (23, 32, 45, 50px) ou valor livre em pixels.' },
        { name: 'ring', type: "'none' | 'status'", default: "'none'", description: 'Anel de 2,12px exibido nas linhas de status.' },
        { name: 'fill', type: 'string', description: 'Preenchimento do círculo em avatares de ação; deve receber um token --wa-color-*.' },
        { name: 'glyph', type: 'React.ReactNode', description: 'Ícone sobreposto ao recorte nos avatares de ação.' },
        { name: 'onClick', type: '(event: React.MouseEvent<HTMLElement>) => void', description: 'Quando informado, o avatar passa a ser um button focalizável.' },
        { name: 'as', type: 'React.ElementType', default: "'span'", description: 'Elemento HTML raiz renderizado.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Avatar> = {
  title: 'Whatsapp Mobile/Componentes/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text', description: 'URL da imagem de perfil.' },
    alt: { control: 'text', description: 'Texto alternativo da imagem.' },
    initials: { control: 'text', description: 'Iniciais exibidas quando não há imagem.' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'], description: 'Diâmetro do avatar.' },
    ring: { control: 'radio', options: ['none', 'status'], description: 'Anel exibido ao redor da imagem.' },
    fill: { control: 'text', description: 'Preenchimento em avatares de ação.' },
  },
  args: {
    src: waAvatars[0],
    alt: 'Jane Doe',
    initials: 'JD',
    size: 'lg',
    ring: 'none',
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AvatarDocumentationPage />,
};

/**
 * Playground com 100% das props do Avatar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Avatar',
  render: (args) => (
    <WaDocStage surface="canvas" padding={40}>
      <Avatar {...args} />
    </WaDocStage>
  ),
};

/**
 * Réplica das linhas de status do frame oficial, com anel e retratos exportados.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="canvas" padding={24} gap={20}>
      {waAvatars.slice(0, 5).map((src) => (
        <Avatar key={src} size="md" ring="status" src={src} alt="Contato" />
      ))}
    </WaDocStage>
  ),
};

/**
 * Comparação dos quatro diâmetros oficiais.
 */
export const Tamanhos: Story = {
  render: () => (
    <WaDocStage surface="canvas" padding={28} gap={28}>
      {SIZES.map((item) => (
        <div key={item.size} style={{ textAlign: 'center' }}>
          <Avatar size={item.size} src={waAvatars[1]} alt="Contato" />
          <div style={{ marginTop: 8, color: 'var(--wa-color-text-meta)', fontFamily: 'var(--wa-font-sans)', fontSize: 11 }}>
            {item.label}
          </div>
        </div>
      ))}
    </WaDocStage>
  ),
};

/**
 * Matriz de anéis, fallback e avatares de ação.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="canvas" padding={28} gap={28}>
      <Avatar size="md" ring="none" src={waAvatars[2]} alt="Contato" />
      <Avatar size="md" ring="status" src={waAvatars[3]} alt="Contato" />
      <Avatar size="md" initials="JD" />
      <Avatar
        size="md"
        fill="var(--wa-color-accent-fab)"
        glyph={<Icon name="settingsInvite" size={20} tone="onAccent" />}
      />
    </WaDocStage>
  ),
};
