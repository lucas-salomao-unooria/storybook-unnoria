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
  WaDocAnatomy,
  WaDocPractices,
  WaDocPropsTable,
  WaDocStage,
  WaDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { SearchField, StatusBar, FilterChip, ChatListItem } from '../../../src/whatsappmobile';
import { waChats, waSearchFilters } from '../fixtures';

const BAR = '#0CA996';

/**
 * Campo de busca controlado.
 */
const ControlledSearch: React.FC<{ showNavigation?: boolean }> = ({ showNavigation }) => {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: 411 }}>
      <SearchField value={value} onChange={setValue} showNavigation={showNavigation} />
    </div>
  );
};

/**
 * Página de documentação rica do componente SearchField.
 */
const SearchFieldDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Navegação"
      title="SearchField"
      description="Barra de busca que substitui a barra superior nos frames Status search, Call log search e Search in chat. Combina seta de voltar de 38px, campo sublinhado de 17px e, na busca dentro da conversa, os controles de navegação entre resultados — que no arquivo são o mesmo vetor de seta em rotações opostas."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🔍" title="Substitui a barra superior">
        A busca não abre um painel: ela troca a barra inteira, mantendo a mesma superfície{' '}
        <code>--wa-color-surface-appbar</code> e a mesma altura de 57px.
      </WaDocCard>
      <WaDocCard icon="⬆️" title="Navegação entre resultados">
        Na busca dentro da conversa, duas setas percorrem as ocorrências. O arquivo usa o mesmo
        vetor em rotações opostas, reproduzido pelos glifos <code>callIn</code> e{' '}
        <code>callOut</code>.
      </WaDocCard>
      <WaDocCard icon="➖" title="Campo sublinhado">
        O campo é apenas uma linha inferior; ao receber foco, o traço assume{' '}
        <code>--wa-color-accent-underline</code>.
      </WaDocCard>
      <WaDocCard icon="🏷️" title="Chips de filtro">
        Na busca em conversas, o arquivo acrescenta seis chips de tipo de mídia sob a barra,
        cobertos pelo componente <code>FilterChip</code>.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3271"
      frameName="Search in chat"
      specs={[
        { label: 'Altura', value: '57 px' },
        { label: 'Superfície', value: '#232D36' },
        { label: 'Placeholder', value: 'PT Sans 400 · 17px · #707980' },
        { label: 'Sublinhado', value: '1 px · #4D585E' },
        { label: 'Foco', value: '#20A497' },
        { label: 'Setas', value: 'mesmo vetor em rotações opostas' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Glifos de navegação',
          detail:
            'os chevrons do frame Search in chat foram exportados vazios. O componente reaproveita callIn e callOut — as mesmas setas verticais do histórico de chamadas — pintadas com o tom de app bar.',
        },
        {
          subject: 'Estilo do campo',
          detail:
            'o arquivo desenha o campo como um retângulo com linha inferior, sem estado de foco. O realce do sublinhado em foco foi adicionado por acessibilidade, usando um token existente.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Superfície', role: 'Faixa de 57px que substitui a barra superior.', token: '--wa-color-surface-appbar' },
        { name: 'Seta de voltar', role: 'Cancela a busca e restaura a barra anterior.', token: '--wa-color-icon-back' },
        { name: 'Campo', role: 'Entrada com sublinhado de 1px.', token: '--wa-color-border-dialog · --wa-color-accent-underline' },
        { name: 'Navegação', role: 'Setas de resultado anterior e próximo.', token: '--wa-color-icon-appbar' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <WaDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <SearchField />
      </div>
      <div style={{ width: 411 }}>
        <SearchField showNavigation />
      </div>
      <div style={{ width: 411 }}>
        <SearchField value="Jane" />
      </div>
      <div style={{ width: 411 }}>
        <SearchField placeholder="Buscar em conversas…" />
      </div>
      <ControlledSearch showNavigation />
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Em contexto"
      description="Busca em conversas, com chips de filtro e resultados."
    />
    <WaDocStage surface="canvas" padding={0} align="stretch" direction="column" gap={0}>
      <div style={{ width: 411 }}>
        <StatusBar />
        <SearchField />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            padding: '12px 19px',
            background: 'var(--wa-color-surface-appbar)',
          }}
        >
          {waSearchFilters.map((filter) => (
            <FilterChip key={filter.id} label={filter.label} />
          ))}
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {waChats.slice(0, 4).map((chat) => (
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
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Substituir a barra superior pela busca, em vez de empilhar as duas.',
        'Habilitar showNavigation apenas na busca dentro de uma conversa.',
        'Devolver o foco ao campo assim que a busca abrir.',
        'Manter o placeholder curto, como "Search…" no arquivo.',
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
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base']}>
      {() => (
        <div style={{ width: 411 }}>
          <SearchField showNavigation />
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="SearchField"
      rows={[
        { name: 'value', type: 'string', description: 'Valor do campo.' },
        { name: 'placeholder', type: 'string', default: "'Search...'", description: 'Texto de espaço reservado.' },
        { name: 'onChange', type: '(value: string) => void', description: 'Callback de digitação.' },
        { name: 'onBack', type: '(event) => void', description: 'Callback da seta de voltar.' },
        { name: 'showNavigation', type: 'boolean', default: 'false', description: 'Exibe os controles de navegação entre resultados.' },
        { name: 'onPrevious', type: '(event) => void', description: 'Callback de resultado anterior.' },
        { name: 'onNext', type: '(event) => void', description: 'Callback de próximo resultado.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SearchField> = {
  title: 'Whatsapp Mobile/Componentes/SearchField',
  component: SearchField,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: 'text', description: 'Valor do campo.' },
    placeholder: { control: 'text', description: 'Texto de espaço reservado.' },
    showNavigation: { control: 'boolean', description: 'Exibe navegação entre resultados.' },
  },
  args: { value: '', placeholder: 'Search...', showNavigation: false },
};

export default meta;

type Story = StoryObj<typeof SearchField>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
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
    <WaDocStage surface="canvas" padding={20}>
      <div style={{ width: 411 }}>
        <SearchField {...args} />
      </div>
    </WaDocStage>
  ),
};

/**
 * Réplica da busca em conversas, com chips de filtro e resultados.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <div style={{ width: 411 }}>
        <StatusBar />
        <SearchField />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            padding: '12px 19px',
            background: 'var(--wa-color-surface-appbar)',
          }}
        >
          {waSearchFilters.map((filter) => (
            <FilterChip key={filter.id} label={filter.label} />
          ))}
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {waChats.slice(0, 4).map((chat) => (
            <ChatListItem key={chat.id} name={chat.name} time={chat.time} avatarSrc={chat.avatarSrc} unread={chat.unread} />
          ))}
        </ul>
      </div>
    </WaDocStage>
  ),
};

/**
 * Matriz de variantes com e sem navegação.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <SearchField />
      </div>
      <div style={{ width: 411 }}>
        <SearchField showNavigation />
      </div>
    </WaDocStage>
  ),
};

/**
 * Estados vazio, preenchido e controlado.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <SearchField />
      </div>
      <div style={{ width: 411 }}>
        <SearchField value="Jane" />
      </div>
      <ControlledSearch showNavigation />
    </WaDocStage>
  ),
};
