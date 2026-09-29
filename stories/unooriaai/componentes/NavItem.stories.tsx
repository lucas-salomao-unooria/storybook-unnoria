import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { NavItem } from '../../../src/unooriaai/components/NavItem';
import { Sidebar, uaiIconNames } from '../../../src/unooriaai/components';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocCard,
  UaiDocGrid,
  UaiDocSpecs,
  UaiDocDecisions,
  UaiDocAnatomy,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';
import { uaiConversations } from '../fixtures';

const BAR = '#716C98';
const ESTADOS = ['default', 'active', 'hover'] as const;

/**
 * Página de documentação rica do componente NavItem.
 */
const NavItemDocumentationPage = () => {
  const [ativa, setAtiva] = React.useState<string>(uaiConversations[0]);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="UnooriaAI"
        category="Componentes • Navegação"
        title="NavItem"
        description="Linha de 240 × 36 com padding 8/12, gap 8 e raio 8, em três estados. A hierarquia vem da cor do texto (apoio em repouso, mais forte em hover e primária quando ativo) combinada com a escada translúcida de superfície."
      />

      <UnooriaDocSectionHeader
        title="1. Visão geral e casos de uso"
        description="A linha de conversa da barra lateral, em três estados."
        barColor={BAR}
      />
      <UaiDocGrid>
        <UaiDocCard icon="💬" title="Lista de conversas">
          O uso canônico: cada conversa do histórico é um <code>NavItem</code>, agrupado por rótulos
          temporais na <code>Sidebar</code>.
        </UaiDocCard>
        <UaiDocCard icon="⚫" title="Estado active">
          Superfície <code>--uai-fill-4</code> e texto primário. Aplica{' '}
          <code>aria-current=&quot;page&quot;</code> automaticamente, o que dá ao leitor de tela a
          posição atual.
        </UaiDocCard>
        <UaiDocCard icon="🖱️" title="Estado hover">
          Superfície <code>--uai-fill-2</code> e texto mais forte. Aparece naturalmente no ponteiro e
          pode ser fixado por <code>state=&quot;hover&quot;</code> para matrizes.
        </UaiDocCard>
        <UaiDocCard icon="✂️" title="Truncamento">
          O rótulo é truncado com reticências em uma linha: títulos de conversa são gerados e podem
          ser longos.
        </UaiDocCard>
      </UaiDocGrid>

      <UnooriaDocSectionHeader
        title="2. Especificações técnicas"
        description="Medidas e tokens do componente."
        barColor={BAR}
      />
      <UaiDocSpecs
        component="NavItem"
        layout="Linha · 240 × 36"
        specs={[
          { label: 'Dimensões', value: '240 × 36' },
          { label: 'Padding', value: '8/12 · --uai-spacing-4 e --uai-spacing-5' },
          { label: 'Gap', value: '8px · --uai-spacing-4' },
          { label: 'Raio', value: '8px · --uai-radius-md' },
          { label: 'Glifo', value: 'ícone da biblioteca · 16px' },
          { label: 'Texto', value: 'Open Sans 400 · 14/20px (body-sm)' },
          { label: 'default', value: 'texto --uai-text-soft-60 · sem superfície' },
          { label: 'hover', value: 'texto --uai-text-soft-80 · --uai-fill-2' },
          { label: 'active', value: 'texto --uai-text-primary · --uai-fill-4' },
        ]}
      />
      <UaiDocDecisions
        items={[
          {
            subject: 'Largura definida pelo contêiner',
            detail:
              'a largura de 240px não é fixada no CSS: a linha ocupa 100% do contêiner, como acontece dentro da Sidebar, cuja calha já reserva 244px.',
          },
          {
            subject: 'Glifo por nome de ícone',
            detail:
              'a prop icon recebe o nome de um glifo da biblioteca do módulo (por exemplo chatBubble) e o renderiza em 16px. A prop glyph continua aceitando qualquer nó React e tem precedência. O glifo é sempre opcional e decorativo (aria-hidden): o rótulo carrega o significado.',
          },
          {
            subject: 'Contraste nos três estados',
            detail:
              'o texto de apoio mede de 7,1:1 a 8,1:1 sobre as superfícies claras e de 9,3:1 sobre o roxo profundo; hover e ativo passam de 8,5:1 nos dois temas. Não há ressalva de contraste aberta.',
          },
          {
            subject: 'Anel de foco',
            detail: 'anel de 2px em --uai-border-brand, com afastamento de 2px, em ambos os temas.',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do componente"
        description="Glifo opcional, rótulo truncado e superfície de estado."
        barColor={BAR}
      />
      <UaiDocAnatomy
        zones={[
          {
            name: 'icon / glyph',
            role: 'Slot antes do rótulo, de 16px e marcado aria-hidden. Nunca encolhe.',
            token: '--uai-size-icon-sm',
          },
          {
            name: 'Rótulo',
            role: 'children em body-sm, com text-overflow: ellipsis em uma única linha.',
            token: '--uai-font-body-sm-*',
          },
          {
            name: 'Estado',
            role: 'state define superfície e cor do texto simultaneamente.',
            token: '--uai-fill-2 · --uai-fill-4 · --uai-text-soft-*',
          },
          {
            name: 'as',
            role: "Renderize como 'a' para navegação real, preservando o comportamento nativo do link.",
          },
        ]}
      />

      <UnooriaDocSectionHeader
        title="4. Matriz de variantes, tamanhos e estados"
        description="Os três estados e uma lista com seleção interativa."
        barColor={BAR}
      />
      <UaiDocStage label="state = default · active · hover" direction="column" align="flex-start">
        {ESTADOS.map((state) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%' }}>
            <span style={{ width: 70, fontSize: 12, color: 'var(--uai-text-secondary)' }}>{state}</span>
            <div style={{ width: 240 }}>
              <NavItem icon="chatBubble" state={state}>
                Conversa de exemplo
              </NavItem>
            </div>
          </div>
        ))}
      </UaiDocStage>
      <UaiDocStage label="Rótulo longo: truncamento em uma linha">
        <div style={{ width: 240 }}>
          <NavItem icon="chatBubble" state="active">
            Revisão completa dos tokens semânticos do sistema de design
          </NavItem>
        </div>
      </UaiDocStage>
      <UaiDocStage label="Seleção interativa: clique para trocar de conversa">
        <div style={{ width: 244, display: 'grid', gap: 4 }}>
          {uaiConversations.map((item) => (
            <NavItem
              key={item}
              icon="chatBubble"
              state={ativa === item ? 'active' : 'default'}
              onClick={() => setAtiva(item)}
            >
              {item}
            </NavItem>
          ))}
        </div>
      </UaiDocStage>
      <UaiDocStage label="Dentro da barra lateral">
        <Sidebar height={300}>
          <Sidebar.NewChatButton />
          <Sidebar.SectionLabel>Hoje</Sidebar.SectionLabel>
          {uaiConversations.slice(0, 3).map((item) => (
            <NavItem
              key={item}
              icon="chatBubble"
              state={ativa === item ? 'active' : 'default'}
              onClick={() => setAtiva(item)}
            >
              {item}
            </NavItem>
          ))}
        </Sidebar>
      </UaiDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas práticas"
        description="Regras de navegação."
        barColor={BAR}
      />
      <UaiDocPractices
        dos={[
          'Marcar exatamente um item como active por lista: o aria-current sai automaticamente.',
          'Deixar o hover natural funcionar; reservar state="hover" às matrizes de documentação.',
          'Usar as="a" com href quando o item navegar de verdade.',
          'Manter o item dentro de um contêiner que defina a largura, deixando o rótulo truncar.',
        ]}
        donts={[
          'Marcar dois itens como active na mesma lista.',
          'Quebrar o rótulo em duas linhas: a altura de 36px foi medida para uma.',
          'Confiar só no ícone para transmitir significado: ele é decorativo.',
          'Usar o NavItem como botão de ação: para isso existem Button e IconButton.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a temas"
        description="Superfície e texto vêm da escada translúcida: tinta roxa no claro e branco no escuro."
        barColor={BAR}
      />
      <UaiDocThemeSwitcher direction="column">
        {() => (
          <div style={{ width: 244, display: 'grid', gap: 4 }}>
            {ESTADOS.map((state) => (
              <NavItem key={state} icon="chatBubble" state={state}>
                Conversa de exemplo ({state})
              </NavItem>
            ))}
          </div>
        )}
      </UaiDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência completa de props da API"
        description="Contrato público do componente NavItem."
        barColor={BAR}
      />
      <UaiDocPropsTable
        title="NavItem"
        rows={[
          {
            name: 'state',
            type: "'default' | 'active' | 'hover'",
            default: "'default'",
            description: 'Estado visual. active aplica aria-current="page".',
          },
          {
            name: 'icon',
            type: 'UaiIconName',
            description:
              'Nome de um ícone da biblioteca do módulo (por exemplo chatBubble), renderizado em 16px antes do rótulo.',
          },
          {
            name: 'glyph',
            type: 'React.ReactNode',
            description: 'Glifo arbitrário antes do rótulo. Tem precedência sobre icon.',
          },
          {
            name: 'as',
            type: 'React.ElementType',
            default: "'button'",
            description: 'Elemento raiz renderizado: permite usar o item como âncora.',
          },
          { name: 'href', type: 'string', description: 'URL de destino quando as renderiza uma âncora.' },
          {
            name: 'target',
            type: 'React.HTMLAttributeAnchorTarget',
            description: 'Alvo de navegação quando as renderiza uma âncora.',
          },
          {
            name: 'rel',
            type: 'string',
            description: 'Relação do link quando as renderiza uma âncora.',
          },
          {
            name: 'theme',
            type: "'light' | 'dark'",
            description:
              'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
          },
          { name: 'children', type: 'React.ReactNode', description: 'Rótulo da conversa.' },
          { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof NavItem> = {
  title: 'UnooriaAI/Componentes/NavItem',
  component: NavItem,
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'radio', options: ESTADOS, description: 'Estado visual da linha.' },
    icon: {
      control: 'select',
      options: [undefined, ...uaiIconNames],
      description: 'Ícone da biblioteca antes do rótulo.',
    },
    glyph: {
      control: false,
      description: 'Glifo arbitrário (nó React); tem precedência sobre icon.',
    },
    as: { control: false, description: 'Elemento raiz (button ou a).' },
    href: { control: 'text', description: 'Destino quando renderizado como âncora.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Rótulo da conversa.' },
  },
  args: {
    state: 'default',
    icon: 'chatBubble',
    theme: 'light',
    children: 'Conversa de exemplo',
  },
};

export default meta;

type Story = StoryObj<typeof NavItem>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <NavItemDocumentationPage />,
};

/**
 * Playground com todas as propriedades do NavItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do NavItem',
  render: (args) => (
    <div
      data-uai-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        background: 'var(--uai-bg-secondary)',
        border: '1px solid var(--uai-border-default)',
      }}
    >
      <div style={{ width: 240 }}>
        <NavItem {...args} />
      </div>
    </div>
  ),
};

/**
 * Os três estados na medida canônica.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 4,
        width: 272,
        padding: 16,
        boxSizing: 'border-box',
        border: '1px solid var(--uai-border-default)',
        borderRadius: 8,
      }}
    >
      {ESTADOS.map((state) => (
        <NavItem key={state} icon="chatBubble" state={state}>
          Conversa de exemplo
        </NavItem>
      ))}
    </div>
  ),
};

/**
 * Lista de conversas com seleção única. O `play` confere que só o item
 * clicado passa a `aria-current="page"`.
 */
export const Estados: Story = {
  render: function ListaDeConversas() {
    const [ativa, setAtiva] = React.useState<string>(uaiConversations[1]);
    return (
      <div style={{ width: 260, display: 'grid', gap: 4 }}>
        {uaiConversations.map((item) => (
          <NavItem
            key={item}
            icon="chatBubble"
            state={ativa === item ? 'active' : 'default'}
            onClick={() => setAtiva(item)}
          >
            {item}
          </NavItem>
        ))}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const primeira = canvas.getByRole('button', { name: uaiConversations[0] });
    const segunda = canvas.getByRole('button', { name: uaiConversations[1] });

    await expect(segunda).toHaveAttribute('aria-current', 'page');
    await userEvent.click(primeira);
    await expect(primeira).toHaveAttribute('aria-current', 'page');
    await expect(segunda).not.toHaveAttribute('aria-current');
  },
};
