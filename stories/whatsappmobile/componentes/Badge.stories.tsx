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
import { Badge } from '../../../src/whatsappmobile';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente Badge.
 */
const BadgeDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Sinalização"
      title="Badge"
      description="Selo circular de 19px com o número de mensagens não lidas. O arquivo desenha duas ocorrências com verdes distintos: o selo ao lado do rótulo CHATS, em #0CA996 com numeral de 16px, e o selo das linhas de conversa na busca, em #01A590 com numeral de 11px. Ambas as variantes são preservadas."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🔢" title="Duas variantes fiéis">
        <code>tab</code> reproduz o selo da barra de abas; <code>row</code> reproduz o selo das
        linhas de conversa. A diferença de verde e de tamanho de numeral é do próprio arquivo.
      </WaDocCard>
      <WaDocCard icon="🎨" title="Numeral escuro sobre verde">
        O numeral usa <code>--wa-color-text-on-accent</code> (#232D36) — a mesma cor da barra
        superior — garantindo contraste sem recorrer a branco puro.
      </WaDocCard>
      <WaDocCard icon="📏" title="Cápsula adaptativa">
        A largura mínima é o diâmetro de 19px; contagens de dois ou três dígitos alargam a cápsula
        mantendo o raio total.
      </WaDocCard>
      <WaDocCard icon="🗣️" title="Anunciado por leitores de tela">
        A prop <code>label</code> define o texto anunciado; o padrão é{' '}
        <code>&quot;{'{count}'} não lidas&quot;</code>.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2143"
      frameName="Chats Main Page · Ellipse 1 + numeral"
      specs={[
        { label: 'Diâmetro', value: '19 px' },
        { label: 'Verde (tab)', value: '#0CA996' },
        { label: 'Verde (row)', value: '#01A590' },
        { label: 'Numeral (tab)', value: 'PT Sans 700 · 16px' },
        { label: 'Numeral (row)', value: 'PT Sans 700 · 11px' },
        { label: 'Cor do numeral', value: '#232D36' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Contagens de múltiplos dígitos',
          detail:
            'o arquivo desenha apenas o valor 4. O comportamento de cápsula alargada e o corte em 99+ são regras da biblioteca, não do arquivo, expostas nas props max e size.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Cápsula', role: 'Círculo de 19px que se alarga com o número de dígitos.', token: '--wa-color-accent · --wa-color-accent-badge' },
        { name: 'Numeral', role: 'Contagem em PT Sans Bold, centralizada.', token: '--wa-color-text-on-accent' },
        { name: 'Rótulo acessível', role: 'Texto anunciado por leitores de tela via aria-label.', token: 'prop label' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e tamanhos" />
    <WaDocStage surface="appbar" padding={28} gap={24}>
      <Badge count={4} variant="tab" />
      <Badge count={12} variant="tab" />
      <Badge count={128} variant="tab" />
      <Badge count={4} variant="row" />
      <Badge count={12} variant="row" />
      <Badge count={128} variant="row" />
    </WaDocStage>

    <WaDocStage label="Diâmetros" surface="appbar" padding={28} gap={24}>
      {[16, 19, 24, 32].map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Badge count={9} size={size} />
          <div style={{ marginTop: 8, color: 'var(--wa-color-text-meta)', fontFamily: 'var(--wa-font-sans)', fontSize: 11 }}>
            {size}px
          </div>
        </div>
      ))}
    </WaDocStage>

    <WaDocStage label="Corte por max" surface="appbar" padding={28} gap={24}>
      <Badge count={99} max={99} />
      <Badge count={100} max={99} />
      <Badge count={7} max={5} />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Usar variant="tab" na barra de abas e variant="row" nas linhas de conversa.',
        'Ocultar o selo quando a contagem for zero, em vez de renderizar "0".',
        'Descrever o significado em label quando o contexto não for óbvio.',
        'Manter o numeral em --wa-color-text-on-accent para preservar o contraste do arquivo.',
      ]}
      donts={[
        'Usar o selo para transmitir estado que não seja contagem.',
        'Trocar o verde da variante por outro token da família.',
        'Aplicar branco puro ao numeral.',
        'Exibir contagens sem limite: acima de max o selo deixa de caber na barra.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher initial="appbar">
      {() => (
        <>
          <Badge count={4} variant="tab" />
          <Badge count={4} variant="row" />
          <Badge count={99} variant="tab" />
        </>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="Badge"
      rows={[
        { name: 'count', type: 'number', description: 'Quantidade exibida dentro do selo. Obrigatória.' },
        { name: 'max', type: 'number', default: '99', description: 'Valor máximo exibido antes de aplicar o sufixo "+".' },
        { name: 'variant', type: "'tab' | 'row'", default: "'tab'", description: 'Variante visual, que define verde e tamanho do numeral.' },
        { name: 'size', type: 'number', default: '19', description: 'Diâmetro do selo em pixels.' },
        { name: 'label', type: 'string', description: 'Rótulo acessível anunciado por leitores de tela.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Badge> = {
  title: 'Whatsapp Mobile/Componentes/Badge',
  component: Badge,
  parameters: { layout: 'padded' },
  argTypes: {
    count: { control: { type: 'number', min: 0 }, description: 'Quantidade exibida.' },
    max: { control: { type: 'number', min: 1 }, description: 'Valor máximo antes do sufixo "+".' },
    variant: { control: 'radio', options: ['tab', 'row'], description: 'Variante visual.' },
    size: { control: { type: 'range', min: 12, max: 48, step: 1 }, description: 'Diâmetro em pixels.' },
    label: { control: 'text', description: 'Rótulo acessível.' },
  },
  args: { count: 4, max: 99, variant: 'tab', size: 19, label: '' },
};

export default meta;

type Story = StoryObj<typeof Badge>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BadgeDocumentationPage />,
};

/**
 * Playground com 100% das props do Badge expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Badge',
  render: (args) => (
    <WaDocStage surface="appbar" padding={40}>
      <Badge {...args} />
    </WaDocStage>
  ),
};

/**
 * Réplica do selo "4" ao lado do rótulo CHATS.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="appbar" padding={28} gap={8}>
      <span
        style={{
          color: 'var(--wa-color-accent)',
          fontFamily: 'var(--wa-font-sans)',
          fontSize: 'var(--wa-font-body-md-size)',
          fontWeight: 700,
        }}
      >
        CHATS
      </span>
      <Badge count={4} variant="tab" />
    </WaDocStage>
  ),
};

/**
 * Matriz completa das duas variantes.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="appbar" padding={28} gap={24}>
      <Badge count={4} variant="tab" />
      <Badge count={4} variant="row" />
    </WaDocStage>
  ),
};

/**
 * Comparação de diâmetros.
 */
export const Tamanhos: Story = {
  render: () => (
    <WaDocStage surface="appbar" padding={28} gap={24}>
      {[16, 19, 24, 32].map((size) => (
        <Badge key={size} count={9} size={size} />
      ))}
    </WaDocStage>
  ),
};
