import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Sidebar } from '../../../src/unooriaai/components/Sidebar';
import { Icon, NavItem, SearchInput } from '../../../src/unooriaai/components';
import { uaiSizing } from '../../../src/unooriaai/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocAnatomy,
  UaiDocCard,
  UaiDocDecisions,
  UaiDocGrid,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocSpecs,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';
import { uaiConversations, uaiSidebarFooter } from '../fixtures';

const BAR = '#716C98';

/**
 * Barra lateral completa, montada com os subcomponentes reais.
 */
const BarraCompleta: React.FC<{ altura?: number | string; comBusca?: boolean }> = ({
  altura = 560,
  comBusca = false,
}) => {
  const [ativa, setAtiva] = React.useState<string>(uaiConversations[0]);

  return (
    <Sidebar height={altura}>
      <Sidebar.NewChatButton />
      {comBusca && <SearchInput block />}
      <Sidebar.SectionLabel>Hoje</Sidebar.SectionLabel>
      {uaiConversations.slice(0, 3).map((item) => (
        <NavItem
          key={item}
          glyph={<Icon name="chatBubble" size={16} />}
          state={ativa === item ? 'active' : 'default'}
          onClick={() => setAtiva(item)}
        >
          {item}
        </NavItem>
      ))}
      <Sidebar.SectionLabel>Últimos 7 dias</Sidebar.SectionLabel>
      {uaiConversations.slice(3).map((item) => (
        <NavItem
          key={item}
          glyph={<Icon name="chatBubble" size={16} />}
          state={ativa === item ? 'active' : 'default'}
          onClick={() => setAtiva(item)}
        >
          {item}
        </NavItem>
      ))}
      <Sidebar.Spacer />
      {uaiSidebarFooter.map((item) => (
        <Sidebar.FooterItem key={item}>{item}</Sidebar.FooterItem>
      ))}
    </Sidebar>
  );
};

/**
 * Página de documentação rica do componente Sidebar.
 */
const SidebarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Navegação"
      title="Sidebar"
      description="Coluna de 260px (--uai-size-sidebar) com padding 12/8, gap 4 e superfície --uai-bg-secondary, composta pelo botão de nova conversa em --uai-bg-inverse, rótulos de seção temporais, linhas de conversa (NavItem), espaçador elástico e itens de rodapé."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão Geral & Casos de Uso"
      description="A coluna de navegação persistente do cliente de conversa."
    />
    <UaiDocGrid>
      <UaiDocCard icon="➕" title="Nova conversa">
        <code>Sidebar.NewChatButton</code> — superfície <code>--uai-bg-inverse</code> de largura
        total, com o ícone <code>add</code> da biblioteca da Unooria e o rótulo em peso 500. É a
        única ação de destaque da coluna.
      </UaiDocCard>
      <UaiDocCard icon="🗓️" title="Agrupamento temporal">
        <code>Sidebar.SectionLabel</code> separa as conversas por período — <em>Hoje</em>,{' '}
        <em>Últimos 7 dias</em> — em Label/SM (12px Semi Bold) com <code>--uai-text-soft-40</code>.
      </UaiDocCard>
      <UaiDocCard icon="↕️" title="Espaçador">
        <code>Sidebar.Spacer</code> ocupa o espaço restante, empurrando o rodapé para a base sem
        depender de posicionamento absoluto.
      </UaiDocCard>
      <UaiDocCard icon="👤" title="Rodapé">
        <code>Sidebar.FooterItem</code> — conta, novidades e saída, em{' '}
        <code>--uai-text-soft-70</code>, com realce no hover como as linhas de conversa.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas e tokens do componente."
    />
    <UaiDocSpecs
      component="Sidebar"
      layout={`Coluna · ${uaiSizing.sidebar} × 800`}
      specs={[
        { label: 'Dimensões', value: `${uaiSizing.sidebar} × 800 · --uai-size-sidebar` },
        { label: 'Padding', value: '12/8 · --uai-spacing-5 e -4' },
        { label: 'Gap', value: '4px · --uai-spacing-2' },
        { label: 'Superfície', value: '--uai-bg-secondary' },
        { label: 'NewChatButton', value: 'padding 10/12 · raio 8 · --uai-bg-inverse' },
        { label: 'SectionLabel', value: 'Label/SM · --uai-text-soft-40' },
        { label: 'FooterItem', value: 'padding 8/12 · --uai-text-soft-70' },
        { label: 'Contraste do botão', value: '18,23:1 claro · 18,20:1 escuro' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Padding vertical de 10px no NewChatButton',
          detail:
            'Medida própria da barra, sem degrau equivalente na escala de espaçamento; anotada no CSS.',
        },
        {
          subject: 'Ícone da biblioteca no lugar do "+"',
          detail:
            'O glifo padrão do botão é o Icon add em 16px (Material Symbols Rounded, peso 300); a prop glyph continua aceitando qualquer nó.',
        },
        {
          subject: 'Hover do botão por token, sem opacidade',
          detail:
            'O botão de nova conversa clareia para --uai-bg-inverse-hover (11,37:1 claro, 14,62:1 escuro); nenhuma opacidade é calculada.',
        },
        {
          subject: 'Rótulo de seção em 12px',
          detail:
            'O rótulo usa o degrau Label/SM da escala da Plataforma Unooria (12/18), com contraste de 5,96:1 no claro e 9,28:1 no escuro sobre --uai-bg-secondary.',
        },
        {
          subject: 'Linhas de conversa são NavItem reais',
          detail:
            'As linhas da barra usam o componente NavItem com os três estados (repouso, ativo, hover).',
        },
        {
          subject: 'Rodapé com raio e hover',
          detail:
            'Os itens de rodapé têm raio 8 (igual às linhas de conversa) e realce --uai-fill-2 no hover, para dar retorno de interação a um item clicável.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do Componente"
      description="Cinco peças compostas dentro de uma coluna de 260px."
    />
    <UaiDocAnatomy
      zones={[
        {
          name: 'Sidebar',
          role: '<nav> vertical com gap 4. A prop height aceita "100%" para acompanhar a aplicação.',
          token: '--uai-bg-secondary',
        },
        {
          name: 'Sidebar.NewChatButton',
          role: 'Botão de largura total. Aceita glyph e children para internacionalização.',
          token: '--uai-bg-inverse',
        },
        {
          name: 'Sidebar.SectionLabel',
          role: 'Rótulo de agrupamento, com padding próprio alinhado às linhas de conversa.',
          token: '--uai-text-soft-40',
        },
        { name: 'Sidebar.Spacer', role: 'Elemento elástico que empurra o rodapé para a base.' },
        {
          name: 'Sidebar.FooterItem',
          role: 'Item de rodapé. Aceita as="a" e href para navegação real.',
          token: '--uai-text-soft-70',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de Variantes e Composição"
      description="A barra completa, uma variação com busca e as peças isoladas."
    />
    <UaiDocStage label="Barra completa" align="flex-start">
      <BarraCompleta />
    </UaiDocStage>
    <UaiDocStage label="Com campo de busca no topo" align="flex-start">
      <BarraCompleta comBusca />
    </UaiDocStage>
    <UaiDocStage label="Peças isoladas" direction="column" align="flex-start">
      <div
        style={{
          width: 244,
          display: 'grid',
          gap: 8,
          background: 'var(--uai-bg-secondary)',
          padding: 8,
          borderRadius: 8,
        }}
      >
        <Sidebar.NewChatButton />
        <Sidebar.SectionLabel>Hoje</Sidebar.SectionLabel>
        <NavItem glyph={<Icon name="chatBubble" size={16} />} state="active">
          Primeira conversa
        </NavItem>
        <Sidebar.FooterItem>Minha conta</Sidebar.FooterItem>
        <Sidebar.FooterItem as="a" href="#ajuda">
          Novidades e ajuda
        </Sidebar.FooterItem>
      </div>
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Boas Práticas"
      description="Regras de navegação persistente."
    />
    <UaiDocPractices
      dos={[
        'Manter o NewChatButton como primeiro elemento — é a única ação de destaque da coluna.',
        'Usar Sidebar.Spacer para fixar o rodapé na base, em vez de posicionamento absoluto.',
        'Passar height="100%" quando a barra viver dentro de um layout de aplicação.',
        'Agrupar as conversas por período com SectionLabel.',
      ]}
      donts={[
        'Fixar a largura em pixel avulso: os 260px vêm de --uai-size-sidebar.',
        'Colocar duas ações de destaque na coluna.',
        'Usar Button no lugar do NewChatButton, que tem padding e peso de rótulo próprios.',
        'Aplicar a superfície --uai-bg-primary à barra, o que apaga a separação com a área de conversa.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a Temas"
      description="--uai-bg-secondary vai de lavanda clara para roxo profundo; o botão de nova conversa inverte junto com --uai-bg-inverse."
    />
    <UaiDocThemeSwitcher padding={0}>
      {() => <BarraCompleta altura={480} />}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência Completa de Props da API"
      description="Contrato público da Sidebar e de seus subcomponentes."
    />
    <UaiDocPropsTable
      title="Sidebar"
      rows={[
        {
          name: 'height',
          type: 'number | string',
          default: '800',
          description:
            "Altura da barra. Use '100%' para ocupar a altura do contêiner da aplicação.",
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Conteúdo da barra, normalmente composto com os subcomponentes.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UaiDocPropsTable
      title="Sidebar.NewChatButton"
      rows={[
        {
          name: 'glyph',
          type: 'React.ReactNode',
          default: '<Icon name="add" size={16} />',
          description: 'Glifo antes do rótulo.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          default: "'Nova conversa'",
          description: 'Rótulo do botão, em peso 500.',
        },
        {
          name: '...props',
          type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
          description: 'Todas as props nativas de button (onClick, disabled…) são repassadas.',
        },
      ]}
    />
    <UaiDocPropsTable
      title="Sidebar.SectionLabel, Sidebar.Spacer e Sidebar.FooterItem"
      rows={[
        {
          name: 'children (SectionLabel)',
          type: 'React.ReactNode',
          description: 'Rótulo de agrupamento temporal, em Label/SM (12px Semi Bold).',
        },
        {
          name: '(Spacer)',
          type: '—',
          description: 'Sem props. Ocupa o espaço restante e empurra o rodapé para a base.',
        },
        {
          name: 'as (FooterItem)',
          type: 'React.ElementType',
          default: "'button'",
          description: 'Elemento raiz do item de rodapé — permite usá-lo como âncora.',
        },
        {
          name: 'href / target / rel (FooterItem)',
          type: 'string',
          description: 'Destino, alvo e relação do link quando as renderiza uma âncora.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Argumentos do playground da composição: a Sidebar mais as opções dos
 * subcomponentes.
 */
interface ComposicaoArgs extends React.ComponentProps<typeof Sidebar> {
  rotuloNovaConversa: string;
  rotuloSecao: string;
  itemRodape: string;
  rodapeComoLink: boolean;
  href: string;
}

const meta: Meta<typeof Sidebar> = {
  title: 'UnooriaAI/Componentes/Sidebar',
  component: Sidebar,
  parameters: { layout: 'padded' },
  argTypes: {
    height: { control: 'number', description: 'Altura da barra em px.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
    children: { control: false, description: 'Conteúdo composto com os subcomponentes.' },
  },
  args: { height: 560, theme: 'light' },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SidebarDocumentationPage />,
};

/**
 * Playground com todas as propriedades da Sidebar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da Sidebar',
  render: (args) => (
    <UaiDocStage theme={args.theme ?? 'light'} padding={24}>
      <Sidebar {...args}>
        <Sidebar.NewChatButton />
        <Sidebar.SectionLabel>Hoje</Sidebar.SectionLabel>
        {uaiConversations.slice(0, 3).map((item, index) => (
          <NavItem
            key={item}
            glyph={<Icon name="chatBubble" size={16} />}
            state={index === 0 ? 'active' : 'default'}
          >
            {item}
          </NavItem>
        ))}
        <Sidebar.Spacer />
        {uaiSidebarFooter.map((item) => (
          <Sidebar.FooterItem key={item}>{item}</Sidebar.FooterItem>
        ))}
      </Sidebar>
    </UaiDocStage>
  ),
};

/**
 * Playground dos subcomponentes: rótulo do botão, rótulo de seção e item de
 * rodapé (com ou sem link).
 */
export const PlaygroundComposicao: StoryObj<ComposicaoArgs> = {
  name: '🕹️ 2. Playground dos subcomponentes',
  args: {
    height: 480,
    theme: 'light',
    rotuloNovaConversa: 'Nova conversa',
    rotuloSecao: 'Hoje',
    itemRodape: 'Minha conta',
    rodapeComoLink: false,
    href: '#conta',
  },
  argTypes: {
    rotuloNovaConversa: { control: 'text', description: 'Rótulo do Sidebar.NewChatButton.' },
    rotuloSecao: { control: 'text', description: 'Texto do Sidebar.SectionLabel.' },
    itemRodape: { control: 'text', description: 'Texto do Sidebar.FooterItem.' },
    rodapeComoLink: { control: 'boolean', description: 'Renderiza o FooterItem como âncora.' },
    href: { control: 'text', description: 'Destino do FooterItem quando é âncora.' },
  },
  render: ({ rotuloNovaConversa, rotuloSecao, itemRodape, rodapeComoLink, href, ...args }) => (
    <UaiDocStage theme={args.theme ?? 'light'} padding={24}>
      <Sidebar {...args}>
        <Sidebar.NewChatButton>{rotuloNovaConversa}</Sidebar.NewChatButton>
        <Sidebar.SectionLabel>{rotuloSecao}</Sidebar.SectionLabel>
        {uaiConversations.slice(0, 2).map((item, index) => (
          <NavItem
            key={item}
            glyph={<Icon name="chatBubble" size={16} />}
            state={index === 0 ? 'active' : 'default'}
          >
            {item}
          </NavItem>
        ))}
        <Sidebar.Spacer />
        {rodapeComoLink ? (
          <Sidebar.FooterItem as="a" href={href}>
            {itemRodape}
          </Sidebar.FooterItem>
        ) : (
          <Sidebar.FooterItem>{itemRodape}</Sidebar.FooterItem>
        )}
      </Sidebar>
    </UaiDocStage>
  ),
};

/**
 * A barra na altura padrão de 800px.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <Sidebar height={800}>
      <Sidebar.NewChatButton />
      <Sidebar.SectionLabel>Hoje</Sidebar.SectionLabel>
      <NavItem glyph={<Icon name="chatBubble" size={16} />}>Primeira conversa</NavItem>
      <NavItem glyph={<Icon name="chatBubble" size={16} />}>Pesquisa sobre o projeto</NavItem>
      <NavItem glyph={<Icon name="chatBubble" size={16} />}>Revisão de código</NavItem>
      <Sidebar.Spacer />
      <Sidebar.FooterItem>Minha conta</Sidebar.FooterItem>
      <Sidebar.FooterItem>Novidades e ajuda</Sidebar.FooterItem>
      <Sidebar.FooterItem>Sair</Sidebar.FooterItem>
    </Sidebar>
  ),
};

/**
 * Barra completa com seleção interativa e campo de busca.
 */
export const ComposicaoModular: Story = {
  render: () => <BarraCompleta comBusca />,
};
