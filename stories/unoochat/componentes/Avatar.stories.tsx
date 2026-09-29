import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocAnatomy,
  UncDocPractices,
  UncDocPropsTable,
  UncDocStage,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import { Avatar, Icon } from '../../../src/unoochat';
import { uncAvatars } from '../fixtures';

const BAR = '#716C98';

const SIZES = [
  { size: 'xs' as const, label: 'xs · 23px', usage: 'Linha de mensagem favoritada' },
  { size: 'sm' as const, label: 'sm · 32px', usage: 'Cabeçalho de conversa' },
  { size: 'md' as const, label: 'md · 45px', usage: 'Linhas de status' },
  { size: 'lg' as const, label: 'lg · 50px', usage: 'Conversas e chamadas' },
];

/**
 * Página de documentação rica do componente Avatar.
 */
const AvatarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Identidade"
      title="Avatar"
      description="Retrato circular do contato, presente em todas as listas do produto. Quatro diâmetros fixos (23, 32, 45 e 50px) e o anel de status de 2,12px com folga de 3,4px, cuja caixa externa mede exatamente 56px. Também atende aos avatares de ação — círculos preenchidos com um glifo, como em Novo grupo e Novo contato."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Onde cada diâmetro aparece e por que o anel só existe no Status."
    />
    <UncDocGrid>
      <UncDocCard icon="👤" title="Quatro diâmetros absolutos">
        Os tamanhos não derivam de uma escala: cada lista tem seu diâmetro fixo. Os tokens{' '}
        <code>--unc-avatar-xs|sm|md|lg</code> reproduzem exatamente esses valores.
      </UncDocCard>
      <UncDocCard icon="⭕" title="Anel exclusivo do Status">
        Apenas as linhas da aba Status desenham o anel. O recorte interno é de 45px, a folga é de
        3,4px e o traço é de 2,12px — somando 56px de caixa externa. A cor vem de{' '}
        <code>--unc-color-border-status-ring</code>.
      </UncDocCard>
      <UncDocCard icon="🎯" title="Avatar de ação">
        As telas de contatos usam círculos preenchidos com um glifo no lugar do retrato. A prop{' '}
        <code>fill</code> aceita o token de cor e <code>glyph</code> recebe o ícone.
      </UncDocCard>
      <UncDocCard icon="⌨️" title="Semântica adaptativa">
        Sem <code>onClick</code> o avatar é um <code>span</code> decorativo; com{' '}
        <code>onClick</code> vira <code>button</code> focalizável, com anel de foco em{' '}
        <code>--unc-color-accent</code>.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="Avatar"
      layout="Círculo · 23 a 56px"
      specs={[
        { label: 'Anel externo', value: '56 × 56 px' },
        { label: 'Traço do anel', value: '2,12 px' },
        { label: 'Recorte interno', value: '45 px' },
        { label: 'Folga', value: '3,4 px' },
        { label: 'Cor do anel', value: '--unc-color-border-status-ring' },
        { label: 'Diâmetros sem anel', value: '23 · 32 · 50 px' },
        { label: 'Iniciais', value: 'Open Sans 700 · 36% do diâmetro' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Cor do anel',
          detail:
            'um único token para atualizações recentes e já visualizadas: --unc-color-border-status-ring (neutral-300 no claro, neutraldark-700 no escuro). O acento não pinta o anel; o estado de "não visto" fica a cargo da lista.',
        },
        {
          subject: 'Diâmetros próprios do módulo',
          detail:
            'os quatro tamanhos nomeados (23, 32, 45, 50px) e o anel de 56px são medidas do Unoochat, não degraus da escala de avatar da Plataforma Unooria.',
        },
        {
          subject: 'Retratos e fallback',
          detail:
            'as imagens entram por src (ilustrações SVG em public/unoochat/), nunca embutidas no pacote. Sem imagem, as iniciais aparecem sobre --unc-color-surface-appbar, em --unc-color-text-primary.',
        },
        {
          subject: 'Avatar de ação',
          detail:
            'o glifo é um Icon do registro do módulo (Material Symbols Rounded, peso 300), branco no claro e brandpurple-950 no escuro (--unc-color-icon-on-accent), sobre o preenchimento em --unc-color-accent.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Anel', role: 'Traço externo exibido apenas em ring="status".', token: '--unc-color-border-status-ring · --unc-status-ring-width' },
        { name: 'Folga', role: 'Respiro de 3,4px entre o anel e o recorte.', token: 'unc-avatar__gap' },
        { name: 'Recorte', role: 'Imagem circular recortada com object-fit: cover.', token: '--unc-avatar-xs|sm|md|lg' },
        { name: 'Fallback', role: 'Iniciais exibidas quando não há src, sobre --unc-color-surface-appbar.', token: '--unc-color-text-primary' },
        { name: 'Glifo', role: 'Ícone sobreposto nos avatares de ação.', token: '--unc-color-icon-on-accent' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de tamanhos, anéis e estados"
      description="Componentes reais renderizados sobre a superfície canvas, nos dois temas."
    />
    <UncDocStage surface="canvas" padding={28} gap={28}>
      {SIZES.map((item) => (
        <div key={item.size} style={{ textAlign: 'center', width: 130 }}>
          <Avatar size={item.size} src={uncAvatars[0]} alt="Amara Lima" />
          <div style={{ marginTop: 8, color: 'var(--unc-color-text-secondary)', fontFamily: 'var(--unc-font-sans)', fontSize: 11 }}>
            {item.label}
            <br />
            {item.usage}
          </div>
        </div>
      ))}
    </UncDocStage>

    <UncDocStage label="Anéis" surface="canvas" padding={28} gap={28}>
      <div style={{ textAlign: 'center' }}>
        <Avatar size="md" ring="none" src={uncAvatars[1]} alt="Bruno Reis" />
        <div style={{ marginTop: 8, color: 'var(--unc-color-text-secondary)', fontFamily: 'var(--unc-font-sans)', fontSize: 11 }}>{'ring="none"'}</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar size="md" ring="status" src={uncAvatars[2]} alt="Amara Lima" />
        <div style={{ marginTop: 8, color: 'var(--unc-color-text-secondary)', fontFamily: 'var(--unc-font-sans)', fontSize: 11 }}>{'ring="status"'}</div>
      </div>
    </UncDocStage>

    <UncDocStage label="Anel e fallback no tema escuro" theme="dark" surface="canvas" padding={28} gap={28}>
      <Avatar size="md" ring="status" src={uncAvatars[1]} alt="Bruno Reis" />
      <Avatar size="lg" initials="AL" />
      <Avatar
        size="lg"
        fill="var(--unc-color-accent)"
        glyph={<Icon name="settingsInvite" size={24} tone="onAccent" />}
      />
    </UncDocStage>

    <UncDocStage label="Fallback e avatares de ação" surface="canvas" padding={28} gap={28}>
      <Avatar size="lg" initials="AL" />
      <Avatar size="lg" initials="BR" />
      <Avatar
        size="lg"
        fill="var(--unc-color-accent)"
        glyph={<Icon name="settingsInvite" size={24} tone="onAccent" />}
      />
      <Avatar
        size="lg"
        fill="var(--unc-color-accent)"
        glyph={<Icon name="newChat" size={24} tone="onAccent" />}
      />
    </UncDocStage>

    <UncDocStage label="Interativo (recebe foco)" surface="canvas" padding={28} gap={28}>
      <Avatar size="lg" src={uncAvatars[3]} alt="Bruno Reis" onClick={() => undefined} />
      <Avatar size="md" ring="status" src={uncAvatars[4]} alt="Amara Lima" onClick={() => undefined} />
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Escolher o tamanho pelo contexto: lg em conversas, md no Status, sm no cabeçalho de conversa e xs em favoritas.',
        'Aplicar ring="status" apenas nas linhas da aba Status.',
        'Informar alt sempre que houver src e o avatar carregar significado.',
        'Usar fill com um token --unc-color-* nos avatares de ação, nunca com hexadecimal avulso.',
      ]}
      donts={[
        'Aplicar o anel a linhas de conversa ou de chamadas.',
        'Usar um diâmetro intermediário que não exista na escala do módulo.',
        'Passar onClick apenas para obter o cursor — isso muda a semântica para botão.',
        'Substituir o retrato ausente por uma silhueta desenhada à mão.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: o anel, o fallback e o avatar de ação seguem os tokens do tema."
    />
    <UncDocThemeSwitcher>
      {() => (
        <>
          <Avatar size="lg" src={uncAvatars[5]} alt="Bruno Reis" />
          <Avatar size="md" ring="status" src={uncAvatars[6]} alt="Amara Lima" />
          <Avatar size="sm" src={uncAvatars[7]} alt="Amara Lima" />
          <Avatar size="xs" src={uncAvatars[8]} alt="Bruno Reis" />
          <Avatar size="lg" initials="AL" />
          <Avatar
            size="lg"
            fill="var(--unc-color-accent)"
            glyph={<Icon name="settingsInvite" size={24} tone="onAccent" />}
          />
        </>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="Avatar"
      rows={[
        { name: 'src', type: 'string', description: 'URL da imagem de perfil. Sem ela, exibe as iniciais.' },
        { name: 'alt', type: 'string', default: "''", description: 'Texto alternativo da imagem.' },
        { name: 'initials', type: 'string', description: 'Iniciais exibidas quando não há imagem.' },
        { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | number", default: "'lg'", description: 'Diâmetro nomeado (23, 32, 45, 50px) ou valor livre em pixels.' },
        { name: 'ring', type: "'none' | 'status'", default: "'none'", description: 'Anel de status de 2,12px, exibido nas linhas da aba Status.' },
        { name: 'fill', type: 'string', description: 'Preenchimento do círculo em avatares de ação; deve receber um token --unc-color-*.' },
        { name: 'glyph', type: 'React.ReactNode', description: 'Ícone sobreposto ao recorte nos avatares de ação.' },
        { name: 'onClick', type: '(event: React.MouseEvent<HTMLElement>) => void', description: 'Quando informado, o avatar passa a ser um button focalizável.' },
        { name: 'as', type: 'React.ElementType', default: "'span'", description: 'Elemento HTML raiz renderizado.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Avatar> = {
  title: 'Unoochat/Componentes/Avatar',
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
    src: uncAvatars[0],
    alt: 'Amara Lima',
    initials: 'JD',
    size: 'lg',
    ring: 'none',
    fill: '',
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

/**
 * Documentação rica e completa do componente.
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
    <UncDocStage surface="canvas" padding={40}>
      <Avatar {...args} />
    </UncDocStage>
  ),
};

/**
 * Linhas de status com anel e retratos ilustrados.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UncDocStage surface="canvas" padding={24} gap={20}>
      {uncAvatars.slice(0, 5).map((src) => (
        <Avatar key={src} size="md" ring="status" src={src} alt="Contato" />
      ))}
    </UncDocStage>
  ),
};

/**
 * Comparação dos quatro diâmetros nomeados.
 */
export const Tamanhos: Story = {
  render: () => (
    <UncDocStage surface="canvas" padding={28} gap={28}>
      {SIZES.map((item) => (
        <div key={item.size} style={{ textAlign: 'center' }}>
          <Avatar size={item.size} src={uncAvatars[1]} alt="Contato" />
          <div style={{ marginTop: 8, color: 'var(--unc-color-text-secondary)', fontFamily: 'var(--unc-font-sans)', fontSize: 11 }}>
            {item.label}
          </div>
        </div>
      ))}
    </UncDocStage>
  ),
};

/**
 * Matriz de anéis, fallback e avatares de ação.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UncDocStage surface="canvas" padding={28} gap={28}>
      <Avatar size="md" ring="none" src={uncAvatars[2]} alt="Contato" />
      <Avatar size="md" ring="status" src={uncAvatars[3]} alt="Contato" />
      <Avatar size="md" initials="AL" />
      <Avatar
        size="md"
        fill="var(--unc-color-accent)"
        glyph={<Icon name="settingsInvite" size={20} tone="onAccent" />}
      />
    </UncDocStage>
  ),
};
