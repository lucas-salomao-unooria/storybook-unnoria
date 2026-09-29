import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
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
import { SearchField, StatusBar, FilterChip, ChatListItem } from '../../../src/unoochat';
import { uncChats, uncSearchFilters } from '../fixtures';

const BAR = '#716C98';

/**
 * Campo de busca controlado.
 */
const ControlledSearch: React.FC<{ showNavigation?: boolean }> = ({ showNavigation }) => {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: 411 }}>
      <SearchField
        value={value}
        onChange={setValue}
        placeholder="Buscar..."
        showNavigation={showNavigation}
      />
    </div>
  );
};

/**
 * Tela de busca em conversas: campo, filtros por tipo de mídia e resultados.
 */
const SearchInContext: React.FC = () => (
  <div style={{ width: 411 }}>
    <StatusBar />
    <SearchField placeholder="Buscar..." />
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        padding: '12px 19px',
        background: 'var(--unc-color-surface-appbar)',
      }}
    >
      {uncSearchFilters.map((filter) => (
        <FilterChip key={filter.id} label={filter.label} />
      ))}
    </div>
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {uncChats.slice(0, 4).map((chat) => (
        <ChatListItem
          key={chat.id}
          name={chat.name}
          time={chat.time}
          avatarSrc={chat.avatarSrc}
          unread={chat.unread}
          pinned={chat.id === 'c1'}
        />
      ))}
    </ul>
  </div>
);

/**
 * Página de documentação rica do componente SearchField.
 */
const SearchFieldDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Navegação"
      title="SearchField"
      description="Barra de busca que substitui a barra superior nas listas de status, de chamadas e dentro da conversa. Combina a seta de voltar, um campo sublinhado de 16px e, na busca dentro da conversa, os controles de navegação entre resultados. Funciona nos temas claro e escuro."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🔍" title="Substitui a barra superior">
        A busca não abre um painel: ela troca a barra inteira, mantendo a mesma superfície{' '}
        <code>--unc-color-surface-appbar</code> e a mesma altura de 57px.
      </UncDocCard>
      <UncDocCard icon="⬆️" title="Navegação entre resultados">
        Na busca dentro da conversa, duas setas percorrem as ocorrências. Elas reaproveitam os
        glifos <code>callIn</code> e <code>callOut</code> (<code>call_received</code> e{' '}
        <code>call_made</code>), as setas diagonais do histórico de chamadas.
      </UncDocCard>
      <UncDocCard icon="➖" title="Campo sublinhado">
        O campo é apenas uma linha inferior de 1px; ao receber foco, o traço assume{' '}
        <code>--unc-color-accent</code>.
      </UncDocCard>
      <UncDocCard icon="🏷️" title="Chips de filtro">
        Na busca em conversas, uma faixa de chips por tipo de mídia (<code>uncSearchFilters</code>:
        fotos, vídeos, links, GIFs, áudios e documentos) fica sob a barra, coberta pelo componente{' '}
        <code>FilterChip</code>.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="SearchField"
      layout="Barra · 57px"
      specs={[
        { label: 'Altura', value: '57px (--unc-subappbar-height)' },
        { label: 'Superfície', value: '--unc-color-surface-appbar · #F7F6FA · #34375C' },
        { label: 'Placeholder', value: 'Open Sans 400 · 16px · #536167 · #A7B5B9' },
        { label: 'Sublinhado', value: '1px · --unc-color-border-control · #617379 · #A7B5B9' },
        { label: 'Foco', value: '--unc-color-accent · #716C98 · #AAA5C2' },
        { label: 'Glifos', value: 'arrow_back · call_received · call_made' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Glifos de navegação entre resultados',
          detail:
            'o quadro de ícones da Plataforma Unooria não publica um par dedicado de "resultado anterior/próximo". O componente reaproveita callIn e callOut, pintadas com o tom de app bar (--unc-color-icon-appbar); as ligaduras equivalentes estão registradas em IconGlyphs.ts.',
        },
        {
          subject: 'Foco visível',
          detail:
            'em foco o campo troca o sublinhado para --unc-color-accent e desenha um anel de 2px; o sublinhado de 1px sozinho não bastaria como indicação.',
        },
        {
          subject: 'Sublinhado em repouso com contraste de contorno',
          detail:
            'o sublinhado usa --unc-color-border-control, que mede 4,61:1 sobre a barra no tema claro e 5,39:1 no escuro, acima dos 3:1 que a WCAG 1.4.11 pede para o limite de um campo. O divisor --unc-color-border-dialog mediria 1,15:1 e 1,61:1 e não serve a esse papel.',
        },
        {
          subject: 'Cancelar é a saída',
          detail:
            'a seta de voltar (rótulo “Cancelar busca”) é a única saída do modo de busca e usa o tom secundário de ícone, --unc-color-icon-muted.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        {
          name: 'Superfície',
          role: 'Faixa de 57px que substitui a barra superior.',
          token: '--unc-color-surface-appbar',
        },
        {
          name: 'Seta de voltar',
          role: 'Cancela a busca e restaura a barra anterior.',
          token: '--unc-color-icon-muted',
        },
        {
          name: 'Campo',
          role: 'Entrada com sublinhado de 1px.',
          token: '--unc-color-border-control · --unc-color-accent',
        },
        {
          name: 'Navegação',
          role: 'Setas de resultado anterior e próximo.',
          token: '--unc-color-icon-appbar',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, estados e uso em contexto"
      description="Vazio, com navegação, preenchido, com placeholder próprio e controlado; depois, a busca em conversas com filtros e resultados."
    />
    <UncDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <SearchField placeholder="Buscar..." />
      </div>
      <div style={{ width: 411 }}>
        <SearchField placeholder="Buscar..." showNavigation />
      </div>
      <div style={{ width: 411 }}>
        <SearchField value="Amara" />
      </div>
      <div style={{ width: 411 }}>
        <SearchField placeholder="Buscar em conversas…" />
      </div>
      <ControlledSearch showNavigation />
    </UncDocStage>
    <UncDocStage surface="canvas" padding={0} align="stretch" direction="column" gap={0}>
      <SearchInContext />
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Substituir a barra superior pela busca, em vez de empilhar as duas.',
        'Habilitar showNavigation apenas na busca dentro de uma conversa.',
        'Devolver o foco ao campo assim que a busca abrir.',
        'Manter o placeholder curto, como "Buscar...".',
      ]}
      donts={[
        'Renderizar a busca junto com o TopBar.',
        'Exibir os controles de navegação nas buscas de listas.',
        'Trocar a superfície da barra ao entrar em modo de busca.',
        'Ocultar a seta de voltar: é a única saída do modo de busca.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: a barra, o sublinhado, o placeholder e as setas trocam de valor juntos."
    />
    <UncDocThemeSwitcher surface="canvas" padding={0}>
      {() => (
        <div style={{ width: 411 }}>
          <SearchField placeholder="Buscar..." showNavigation />
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="SearchField"
      rows={[
        { name: 'value', type: 'string', description: 'Valor do campo.' },
        {
          name: 'placeholder',
          type: 'string',
          default: "'Buscar...'",
          description: 'Texto de espaço reservado.',
        },
        { name: 'onChange', type: '(value: string) => void', description: 'Callback de digitação.' },
        { name: 'onBack', type: '(event) => void', description: 'Callback da seta de voltar.' },
        {
          name: 'showNavigation',
          type: 'boolean',
          default: 'false',
          description: 'Exibe os controles de navegação entre resultados.',
        },
        { name: 'onPrevious', type: '(event) => void', description: 'Callback de resultado anterior.' },
        { name: 'onNext', type: '(event) => void', description: 'Callback de próximo resultado.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SearchField> = {
  title: 'Unoochat/Componentes/SearchField',
  component: SearchField,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: 'text', description: 'Valor do campo.' },
    placeholder: { control: 'text', description: 'Texto de espaço reservado.' },
    showNavigation: { control: 'boolean', description: 'Exibe navegação entre resultados.' },
    onChange: { action: 'onChange', description: 'Callback de digitação.' },
    onBack: { action: 'onBack', description: 'Callback da seta de voltar.' },
    onPrevious: { action: 'onPrevious', description: 'Callback de resultado anterior.' },
    onNext: { action: 'onNext', description: 'Callback de próximo resultado.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: { value: '', placeholder: 'Buscar...', showNavigation: false },
};

export default meta;

type Story = StoryObj<typeof SearchField>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SearchFieldDocumentationPage />,
};

/**
 * Playground com 100% das props do SearchField expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SearchField',
  render: (args) => (
    <UncDocStage surface="canvas" padding={20}>
      <div style={{ width: 411 }}>
        <SearchField {...args} />
      </div>
    </UncDocStage>
  ),
};

/**
 * Busca em conversas, com chips de filtro e resultados.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <SearchInContext />
    </UncDocStage>
  ),
};

/**
 * Matriz de variantes com e sem navegação.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UncDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <SearchField placeholder="Buscar..." />
      </div>
      <div style={{ width: 411 }}>
        <SearchField placeholder="Buscar..." showNavigation />
      </div>
    </UncDocStage>
  ),
};

/**
 * Estados vazio, preenchido e controlado.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <SearchField placeholder="Buscar..." />
      </div>
      <div style={{ width: 411 }}>
        <SearchField value="Amara" />
      </div>
      <ControlledSearch showNavigation />
    </UncDocStage>
  ),
};
