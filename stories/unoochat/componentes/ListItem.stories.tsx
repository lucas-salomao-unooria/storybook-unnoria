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
import { ListItem, Avatar, Badge, Icon } from '../../../src/unoochat';
import { uncAvatars, uncChats } from '../fixtures';

const BAR = '#716C98';

const DENSITIES = [
  { density: 'chat' as const, label: 'chat · 70px', usage: 'Lista de conversas' },
  { density: 'status' as const, label: 'status · 68px', usage: 'Lista de status' },
  { density: 'call' as const, label: 'call · 69px', usage: 'Lista de chamadas' },
  { density: 'contact' as const, label: 'contact · 63px', usage: 'Seleção de contatos' },
  { density: 'settings' as const, label: 'settings · 72px', usage: 'Ajustes' },
];

/**
 * Página de documentação rica do componente ListItem.
 */
const ListItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Estrutura"
      title="ListItem"
      description="Estrutura de linha compartilhada por todas as listas do produto. Define a calha lateral de 19px, o recuo de 21px entre avatar e texto, a coluna direita de metadados e o divisor inferior recuado que começa alinhado ao título. As cinco densidades (70, 68, 69, 63 e 72px) atendem às listas de conversas, status, chamadas, contatos e ajustes."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🧱" title="Base das listas especializadas">
        <code>ChatListItem</code>, <code>StatusListItem</code> e <code>CallListItem</code> são
        composições sobre este componente. Use o ListItem diretamente para listas sem componente
        especializado, como contatos.
      </UncDocCard>
      <UncDocCard icon="📏" title="Cinco densidades">
        Cada lista tem um passo vertical próprio. A prop <code>density</code>{' '}
        mantém 70, 68, 69, 63 e 72px em vez de uniformizar.
      </UncDocCard>
      <UncDocCard icon="➖" title="Divisor recuado">
        O divisor não atravessa a linha inteira: começa após o avatar, alinhado ao título. A prop{' '}
        <code>dividerInset</code> ajusta o recuo por lista.
      </UncDocCard>
      <UncDocCard icon="⌨️" title="Semântica adaptativa">
        Sem <code>onClick</code> a linha é um <code>li</code>; com <code>onClick</code> vira{' '}
        <code>button</code> focalizável dentro da lista.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="ListItem"
      layout="Linha · 63 a 72px"
      specs={[
        { label: 'Calha lateral', value: '19 px (--unc-gutter)' },
        { label: 'Recuo do texto', value: '21 px' },
        { label: 'Passo de conversa', value: '70 px' },
        { label: 'Recuo do divisor', value: '71 px' },
        { label: 'Divisor', value: '1 px · --unc-color-border-divider' },
        { label: 'Título', value: 'Open Sans 400 · 20px / 30px' },
        { label: 'Subtítulo', value: 'Open Sans 400 · 14px / 20px' },
        { label: 'Meta', value: 'Open Sans 600 · 12px / 18px' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Densidades por lista',
          detail:
            'as cinco alturas mínimas (70, 68, 69, 63 e 72px) são medidas próprias do módulo, uma por tipo de lista; nenhuma foi uniformizada.',
        },
        {
          subject: 'Recuo do divisor',
          detail:
            'o padrão é 71px, que alinha o divisor ao título de uma linha com avatar de 50px; a prop `dividerInset` cobre linhas com outro slot leading.',
        },
        {
          subject: 'Cor do divisor por tema',
          detail:
            '`--unc-color-border-divider` é `#E4E8E9` no claro (`--unooria-color-neutral-150`) e `#34375C` no escuro (`--unooria-color-brandpurple-800`), o mesmo degrau da superfície da barra: o fio separa sem competir com o texto.',
        },
        {
          subject: 'Alvo principal em botão interno',
          detail:
            'com `onClick`, a área principal é um `<button>` interno e a coluna direita continua irmã: o slot `trailing` costuma ter outro botão (rediscar, opções), e botões aninhados são HTML inválido.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Slot leading', role: 'Avatar, ícone ou qualquer elemento à esquerda.', token: 'prop leading' },
        { name: 'Título', role: 'Nome do contato ou rótulo principal.', token: '--unc-font-title-lg-* (20px) · --unc-color-text-primary' },
        { name: 'Subtítulo', role: 'Linha secundária de metadados.', token: '--unc-font-label-md-* (14px) · --unc-color-text-secondary' },
        { name: 'Meta', role: 'Coluna direita superior, tipicamente o horário.', token: '--unc-font-caption-bold-* (12px) · --unc-color-text-secondary' },
        { name: 'Trailing', role: 'Coluna direita inferior: selos e ícones de estado.', token: 'prop trailing' },
        { name: 'Divisor', role: 'Linha inferior recuada e alinhada ao título.', token: '--unc-color-border-divider' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de densidades" />
    {(['light', 'dark'] as const).map((theme) => (
      <UncDocStage
        key={theme}
        label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
        theme={theme}
        surface="canvas"
        direction="column"
        align="stretch"
        gap={0}
        padding={0}
      >
        <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
          {DENSITIES.map((item, index) => (
            <ListItem
              key={item.density}
              density={item.density}
              leading={<Avatar size="lg" src={uncAvatars[index]} alt="Contato" />}
              title="Amara Lima"
              subtitle={item.usage}
              meta="15:14"
            />
          ))}
        </ul>
      </UncDocStage>
    ))}

    <UnooriaDocSectionHeader barColor={BAR} title="5. Composição dos slots" />
    <UncDocStage surface="canvas" direction="column" align="stretch" gap={0} padding={0}>
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <ListItem title="Apenas título" leading={<Avatar size="lg" initials="AL" />} />
        <ListItem
          title="Título e subtítulo"
          subtitle="Olá! Estou usando o Unoochat."
          leading={<Avatar size="lg" src={uncAvatars[0]} alt="Contato" />}
        />
        <ListItem
          title="Com meta"
          meta="15:14"
          leading={<Avatar size="lg" src={uncAvatars[1]} alt="Contato" />}
        />
        <ListItem
          title="Com meta e trailing"
          meta="15:14"
          trailing={<Badge count={4} variant="row" />}
          leading={<Avatar size="lg" src={uncAvatars[2]} alt="Contato" />}
        />
        <ListItem
          title="Com ícone no leading"
          subtitle="Sem avatar"
          leading={<Icon name="settingsInvite" size={24} tone="settings" />}
          dividerInset={19}
        />
        <ListItem title="Sem divisor" divider={false} leading={<Avatar size="lg" initials="BR" />} />
      </ul>
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={[
        'Envolver as linhas em um <ul> para preservar a semântica de lista.',
        'Escolher a densidade correspondente ao tipo de lista: conversas, status, chamadas, contatos ou ajustes.',
        'Ajustar dividerInset quando o slot leading mudar de largura.',
        'Ocultar o divisor da última linha de um agrupamento.',
      ]}
      donts={[
        'Uniformizar a altura de todas as listas em um único valor.',
        'Estender o divisor até a borda esquerda da tela.',
        'Colocar mais de uma ação focalizável dentro de uma linha já clicável.',
        'Usar o slot meta para conteúdo longo: ele não quebra linha.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: texto, divisor e selo acompanham a superfície."
    />
    <UncDocThemeSwitcher surface="canvas" padding={0}>
      {() => (
        <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
          <ListItem
            leading={<Avatar size="lg" src={uncAvatars[3]} alt="Contato" />}
            title="Amara Lima"
            meta="15:14"
            trailing={<Badge count={4} variant="row" />}
          />
          <ListItem
            leading={<Avatar size="lg" src={uncAvatars[4]} alt="Contato" />}
            title="Bruno Reis"
            subtitle="Olá! Estou usando o Unoochat."
            meta="15:14"
          />
        </ul>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
      title="ListItem"
      rows={[
        { name: 'leading', type: 'React.ReactNode', description: 'Conteúdo à esquerda, normalmente um Avatar ou Icon.' },
        { name: 'title', type: 'React.ReactNode', description: 'Título principal da linha. Obrigatório.' },
        { name: 'subtitle', type: 'React.ReactNode', description: 'Linha secundária exibida abaixo do título.' },
        { name: 'meta', type: 'React.ReactNode', description: 'Conteúdo no topo da coluna direita, como o horário.' },
        { name: 'trailing', type: 'React.ReactNode', description: 'Conteúdo na base da coluna direita: selos e ícones.' },
        { name: 'density', type: "'chat' | 'status' | 'call' | 'contact' | 'settings'", default: "'chat'", description: 'Densidade vertical da linha (70, 68, 69, 63 ou 72px).' },
        { name: 'divider', type: 'boolean', default: 'true', description: 'Desenha o divisor inferior.' },
        { name: 'dividerInset', type: 'number', default: '71', description: 'Recuo esquerdo do divisor em pixels.' },
        { name: 'onClick', type: '(event) => void', description: 'Quando informado, a linha passa a ser um button focalizável.' },
        { name: 'as', type: 'React.ElementType', default: "'li'", description: 'Elemento HTML raiz renderizado.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ListItem> = {
  title: 'Unoochat/Componentes/ListItem',
  component: ListItem,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título principal da linha.' },
    subtitle: { control: 'text', description: 'Linha secundária.' },
    meta: { control: 'text', description: 'Conteúdo no topo da coluna direita.' },
    density: { control: 'select', options: ['chat', 'status', 'call', 'contact', 'settings'], description: 'Densidade vertical.' },
    divider: { control: 'boolean', description: 'Desenha o divisor inferior.' },
    dividerInset: { control: { type: 'range', min: 0, max: 120, step: 1 }, description: 'Recuo esquerdo do divisor.' },
  },
  args: {
    title: 'Amara Lima',
    subtitle: '',
    meta: '15:14',
    density: 'chat',
    divider: true,
    dividerInset: 71,
  },
};

export default meta;

type Story = StoryObj<typeof ListItem>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ListItemDocumentationPage />,
};

/**
 * Playground com 100% das props do ListItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ListItem',
  render: (args) => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <ListItem {...args} leading={<Avatar size="lg" src={uncAvatars[0]} alt="Contato" />} />
      </ul>
    </UncDocStage>
  ),
};

/**
 * Linhas de uma lista de conversas, com selo de não lidas na primeira.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial: lista de conversas',
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        {uncAvatars.slice(0, 6).map((src, index) => (
          <ListItem
            key={src}
            leading={<Avatar size="lg" src={src} alt="Contato" />}
            title={uncChats[index].name}
            meta="15:14"
            trailing={index === 0 ? <Badge count={4} variant="row" /> : undefined}
          />
        ))}
      </ul>
    </UncDocStage>
  ),
};

/**
 * Comparação das cinco densidades.
 */
export const Tamanhos: Story = {
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        {DENSITIES.map((item, index) => (
          <ListItem
            key={item.density}
            density={item.density}
            leading={<Avatar size="lg" src={uncAvatars[index]} alt="Contato" />}
            title={item.label}
            subtitle={item.usage}
          />
        ))}
      </ul>
    </UncDocStage>
  ),
};

/**
 * Composição modular dos cinco slots.
 */
export const ComposicaoModular: Story = {
  name: 'ComposicaoModular',
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <ListItem title="Apenas título" leading={<Avatar size="lg" initials="AL" />} />
        <ListItem
          title="Título e subtítulo"
          subtitle="Olá! Estou usando o Unoochat."
          leading={<Avatar size="lg" src={uncAvatars[1]} alt="Contato" />}
        />
        <ListItem
          title="Meta e trailing"
          meta="15:14"
          trailing={<Badge count={12} variant="row" />}
          leading={<Avatar size="lg" src={uncAvatars[2]} alt="Contato" />}
        />
        <ListItem
          title="Ícone no leading"
          leading={<Icon name="settingsInvite" size={24} tone="settings" />}
          dividerInset={19}
          divider={false}
        />
      </ul>
    </UncDocStage>
  ),
};
