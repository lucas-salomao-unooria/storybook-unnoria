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
import { StatusListItem, SectionLabel } from '../../../src/unoochat';
import { uncAvatars, uncStatusRecent, uncStatusViewed } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente StatusListItem.
 */
const StatusListItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Listas"
      title="StatusListItem"
      description="Linha da aba Status, com três estados: a própria atualização (Meu status, sem anel e com menu de opções), as atualizações recentes (nome em 20px Regular) e as já visualizadas (nome em 18px SemiBold). Atualizações de terceiros usam o anel de 2,12px sobre recorte de 45px, em Open Sans e nas cores dos dois temas."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="⭕" title="Anel como marcador">
        Recentes e visualizadas usam o mesmo anel <code>--unc-color-border-status-ring</code>; a
        distinção entre elas é feita pela tipografia do nome, não pela cor do anel.
      </UncDocCard>
      <UncDocCard icon="👤" title="Meu status é diferente">
        A primeira linha usa avatar sem anel, título em 18px SemiBold na cor{' '}
        <code>--unc-color-text-primary</code> e um menu de opções à direita.
      </UncDocCard>
      <UncDocCard icon="🏷️" title="Agrupada por SectionLabel">
        &quot;Atualizações recentes&quot; e &quot;Atualizações já vistas&quot; são separadas pelo
        componente <code>SectionLabel</code>, em Open Sans 600 e 14px.
      </UncDocCard>
      <UncDocCard icon="⏱️" title="Metadado temporal">
        O horário relativo (&quot;há 30 minutos&quot;) usa 14px em{' '}
        <code>--unc-color-text-secondary</code>, em todos os estados.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="StatusListItem"
      layout="Linha · 68px"
      specs={[
        { label: 'Passo vertical', value: '68 px' },
        { label: 'Anel', value: '56 px · 2,12 px · --unc-color-border-status-ring' },
        { label: 'Recorte', value: '45 px' },
        { label: 'Nome recente', value: 'Open Sans 400 · 20px' },
        { label: 'Nome visualizado', value: 'Open Sans 600 · 18px' },
        { label: 'Metadado', value: 'Open Sans 400 · 14px' },
        { label: 'Menu', value: 'glifo overflow · 24px' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Anel igual em recentes e visualizadas',
          detail:
            'o anel usa --unc-color-border-status-ring (#A7B5B9 no claro, #7C8E94 no escuro, de --unooria-color-neutral-300 e --unooria-color-neutraldark-700) nos dois grupos. A distinção entre eles é só tipográfica, para que o estado não dependa apenas de cor.',
        },
        {
          subject: 'Recuo do divisor em 74px',
          detail:
            'o divisor começa à direita do avatar: a calha de 19px somada ao anel de 56px. É uma medida própria do módulo.',
        },
        {
          subject: 'Menu de opções',
          detail:
            'o glifo é o overflow (more_horiz do Material Symbols Rounded) a 24px, dentro de um botão de 26×31px com nome acessível "Opções do status".',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Avatar com anel', role: 'Recorte de 45px dentro do anel de 56px.', token: 'Avatar size="md" ring="status"' },
        { name: 'Nome', role: 'Autor da atualização; a escala muda conforme o estado.', token: '--unc-color-text-primary' },
        { name: 'Metadado', role: 'Horário relativo da atualização.', token: '--unc-color-text-secondary' },
        { name: 'Menu', role: 'Ações da própria atualização, exclusivo do estado own.', token: '--unc-color-icon-appbar' },
        { name: 'Divisor', role: 'Linha inferior recuada em 74px.', token: '--unc-color-border-divider' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de estados" />
    <UncDocStage label="Tema claro" theme="light" surface="canvas" padding={0} align="stretch" direction="column" gap={0}>
      <div style={{ width: 411 }}>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          <StatusListItem
            state="own"
            name="Meu status"
            timestamp="Ontem, 10:55"
            avatarSrc={uncAvatars[0]}
            showMenu
          />
        </ul>
        <SectionLabel>Atualizações recentes</SectionLabel>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {uncStatusRecent.map((item) => (
            <StatusListItem
              key={item.id}
              name={item.name}
              timestamp={item.timestamp}
              avatarSrc={item.avatarSrc}
            />
          ))}
        </ul>
        <SectionLabel>Atualizações já vistas</SectionLabel>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {uncStatusViewed.map((item, index) => (
            <StatusListItem
              key={item.id}
              state="viewed"
              name={item.name}
              timestamp={item.timestamp}
              avatarSrc={item.avatarSrc}
              divider={index < uncStatusViewed.length - 1}
            />
          ))}
        </ul>
      </div>
    </UncDocStage>
    <UncDocStage label="Tema escuro" theme="dark" surface="canvas" padding={0} align="stretch" direction="column" gap={0}>
      <div style={{ width: 411 }}>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          <StatusListItem
            state="own"
            name="Meu status"
            timestamp="Ontem, 10:55"
            avatarSrc={uncAvatars[0]}
            showMenu
          />
          {uncStatusRecent.slice(0, 2).map((item) => (
            <StatusListItem
              key={item.id}
              name={item.name}
              timestamp={item.timestamp}
              avatarSrc={item.avatarSrc}
            />
          ))}
          <StatusListItem
            state="viewed"
            name={uncStatusViewed[0].name}
            timestamp={uncStatusViewed[0].timestamp}
            avatarSrc={uncStatusViewed[0].avatarSrc}
            divider={false}
          />
        </ul>
      </div>
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Colocar a linha own no topo, antes do primeiro SectionLabel.',
        'Agrupar recentes e visualizadas com SectionLabel.',
        'Exibir o menu de opções apenas na linha own.',
        'Manter o anel em todas as atualizações de terceiros.',
      ]}
      donts={[
        'Colorir o anel com o acento para marcar atualizações não vistas: o estado se distingue pela tipografia.',
        'Aplicar o estado viewed às atualizações recentes só para reduzir contraste.',
        'Renderizar a linha own dentro de um dos agrupamentos.',
        'Substituir o horário relativo por um carimbo absoluto sem necessidade.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: nome, metadado e anel acompanham os tokens do tema."
    />
    <UncDocThemeSwitcher surface="canvas" padding={0}>
      {() => (
        <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
          <StatusListItem name="Elisa Prado" timestamp="há 30 minutos" avatarSrc={uncAvatars[4]} />
          <StatusListItem
            state="viewed"
            name="Bruno Reis"
            timestamp="há 30 minutos"
            avatarSrc={uncAvatars[1]}
            divider={false}
          />
        </ul>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="StatusListItem"
      rows={[
        { name: 'name', type: 'string', description: 'Nome do autor da atualização. Obrigatório.' },
        { name: 'timestamp', type: 'string', description: 'Momento da atualização. Obrigatório.' },
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do autor.' },
        { name: 'initials', type: 'string', description: 'Iniciais usadas quando não há avatar.' },
        { name: 'state', type: "'own' | 'recent' | 'viewed'", default: "'recent'", description: 'Estado da atualização, que define anel e tipografia.' },
        { name: 'showMenu', type: 'boolean', default: 'false', description: 'Exibe o menu de opções à direita.' },
        { name: 'onMenu', type: '(event) => void', description: 'Callback do menu de opções.' },
        { name: 'divider', type: 'boolean', default: 'true', description: 'Desenha o divisor inferior.' },
        { name: 'onClick', type: '(event) => void', description: 'Callback de abertura da atualização.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof StatusListItem> = {
  title: 'Unoochat/Componentes/StatusListItem',
  component: StatusListItem,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'text', description: 'Nome do autor.' },
    timestamp: { control: 'text', description: 'Momento da atualização.' },
    avatarSrc: { control: 'select', options: uncAvatars, description: 'URL do avatar.' },
    initials: { control: 'text', description: 'Iniciais sem avatar.' },
    state: { control: 'radio', options: ['own', 'recent', 'viewed'], description: 'Estado da atualização.' },
    showMenu: { control: 'boolean', description: 'Exibe o menu de opções.' },
    divider: { control: 'boolean', description: 'Desenha o divisor inferior.' },
  },
  args: {
    name: 'Elisa Prado',
    timestamp: 'há 30 minutos',
    avatarSrc: uncAvatars[4],
    initials: 'EP',
    state: 'recent',
    showMenu: false,
    divider: true,
  },
};

export default meta;

type Story = StoryObj<typeof StatusListItem>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <StatusListItemDocumentationPage />,
};

/**
 * Playground com 100% das props do StatusListItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do StatusListItem',
  render: (args) => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <StatusListItem {...args} />
      </ul>
    </UncDocStage>
  ),
};

/**
 * Aba Status completa, com a linha própria e os agrupamentos.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo da Aba Status',
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <div style={{ width: 411 }}>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          <StatusListItem
            state="own"
            name="Meu status"
            timestamp="Ontem, 10:55"
            avatarSrc={uncAvatars[0]}
            showMenu
          />
        </ul>
        <SectionLabel>Atualizações recentes</SectionLabel>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {uncStatusRecent.map((item) => (
            <StatusListItem key={item.id} name={item.name} timestamp={item.timestamp} avatarSrc={item.avatarSrc} />
          ))}
        </ul>
        <SectionLabel>Atualizações já vistas</SectionLabel>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {uncStatusViewed.map((item) => (
            <StatusListItem
              key={item.id}
              state="viewed"
              name={item.name}
              timestamp={item.timestamp}
              avatarSrc={item.avatarSrc}
            />
          ))}
        </ul>
      </div>
    </UncDocStage>
  ),
};

/**
 * Matriz completa dos três estados.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <StatusListItem state="own" name="Meu status" timestamp="Ontem, 10:55" avatarSrc={uncAvatars[0]} showMenu />
        <StatusListItem state="recent" name="Elisa Prado" timestamp="há 30 minutos" avatarSrc={uncAvatars[4]} />
        <StatusListItem state="viewed" name="Bruno Reis" timestamp="há 30 minutos" avatarSrc={uncAvatars[5]} divider={false} />
      </ul>
    </UncDocStage>
  ),
};
