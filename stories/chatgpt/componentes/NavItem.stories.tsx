import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavItem } from '../../../src/chatgpt/components/NavItem';
import { Sidebar } from '../../../src/chatgpt/components';
import { gptGlyphs } from '../../../src/chatgpt/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  GptDocCard,
  GptDocGrid,
  GptDocFigmaSpecs,
  GptDocPractices,
  GptDocPropsTable,
  GptDocStage,
  GptDocThemeSwitcher,
} from '../../../.storybook/components';
import { gptConversations, gptFigmaNodes } from '../fixtures';

const ESTADOS = ['default', 'active', 'hover'] as const;

/**
 * Página de documentação rica do componente NavItem.
 */
const NavItemDocumentationPage = () => {
  const [ativa, setAtiva] = React.useState<string>(gptConversations[0]);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="ChatGPT"
        category="Componentes • Navegação"
        title="NavItem"
        description="Réplica do conjunto NavItem da página 🟡 Design system: linha de 240 × 36 com padding 8/12, gap 8 e raio 8, nos três estados publicados. A hierarquia é feita por opacidade de texto — 60% em repouso, 80% em hover e 100% quando ativo — combinada com a escada translúcida de superfície."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="A linha de conversa da barra lateral, em três estados."
        barColor="#5856D6"
      />
      <GptDocGrid>
        <GptDocCard icon="💬" title="Lista de conversas">
          O uso canônico: cada conversa do histórico é um <code>NavItem</code>, agrupado por rótulos
          temporais na <code>Sidebar</code>.
        </GptDocCard>
        <GptDocCard icon="⚫" title="Estado Active">
          Superfície a 4% e texto a 100%. Aplica <code>aria-current=&quot;page&quot;</code> automaticamente,
          o que dá ao leitor de tela a posição atual.
        </GptDocCard>
        <GptDocCard icon="🖱️" title="Estado Hover">
          Superfície a 2% e texto a 80%. Aparece naturalmente no ponteiro e pode ser fixado por{' '}
          <code>state=&quot;hover&quot;</code> para matrizes.
        </GptDocCard>
        <GptDocCard icon="✂️" title="Truncamento">
          O rótulo é truncado com reticências em uma linha — títulos de conversa são gerados e podem
          ser longos.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Medidas lidas do conjunto de variantes via Plugin API."
        barColor="#5856D6"
      />
      <GptDocFigmaSpecs
        nodeId={gptFigmaNodes.navItem}
        frameName="NavItem (State · 3 variantes)"
        specs={[
          { label: 'Dimensões', value: '240 × 36' },
          { label: 'Padding', value: '8/12 · spacing/4 e spacing/5' },
          { label: 'Gap', value: '8px · spacing/4' },
          { label: 'Raio', value: '8px · radius/md' },
          { label: 'Default / Hover / Active', value: 'texto a 60% / 80% / 100%' },
          { label: 'Superfície', value: '0% / 2% / 4%' },
        ]}
        deviations={[
          'A largura de 240px não é fixada no CSS: a linha ocupa 100% do contêiner, como acontece dentro do componente Sidebar, cuja calha já reserva 244px.',
          'O glifo 💬 do arquivo é um emoji em camada de texto. Na API ele é opcional (prop glyph), porque emoji colorido varia de renderização entre sistemas e não deve carregar informação essencial.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Glifo opcional, rótulo truncado e superfície de estado."
        barColor="#5856D6"
      />
      <GptDocGrid min={260}>
        <GptDocCard icon="💬" title="glyph">
          Slot antes do rótulo, com 14px de corpo e marcado <code>aria-hidden</code>. Nunca
          encolhe.
        </GptDocCard>
        <GptDocCard icon="🔤" title="Rótulo">
          <code>children</code> em <code>Body/SM</code>, com <code>text-overflow: ellipsis</code> em
          uma única linha.
        </GptDocCard>
        <GptDocCard icon="🎨" title="Estado">
          <code>state</code> define superfície e opacidade do texto simultaneamente — os dois foram
          medidos juntos no arquivo.
        </GptDocCard>
        <GptDocCard icon="🔗" title="as">
          Renderize como <code>&apos;a&apos;</code> para navegação real, preservando o comportamento nativo do
          link.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="4. Matriz de Estados e Composição"
        description="Os três estados publicados e uma lista com seleção interativa."
        barColor="#5856D6"
      />
      <GptDocStage label="State=default · active · hover" direction="column" align="flex-start">
        {ESTADOS.map((state) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%' }}>
            <span style={{ width: 70, fontSize: 12, color: '#475157' }}>{state}</span>
            <div style={{ width: 240 }}>
              <NavItem glyph={gptGlyphs.chat} state={state}>
                Chat conversation
              </NavItem>
            </div>
          </div>
        ))}
      </GptDocStage>
      <GptDocStage label="Rótulo longo — truncamento em uma linha">
        <div style={{ width: 240 }}>
          <NavItem glyph={gptGlyphs.chat} state="active">
            Revisão completa dos tokens semânticos do design system
          </NavItem>
        </div>
      </GptDocStage>
      <GptDocStage label="Seleção interativa — clique para trocar de conversa">
        <div style={{ width: 244, display: 'grid', gap: 4 }}>
          {gptConversations.map((item) => (
            <NavItem
              key={item}
              glyph={gptGlyphs.chat}
              state={ativa === item ? 'active' : 'default'}
              onClick={() => setAtiva(item)}
            >
              {item}
            </NavItem>
          ))}
        </div>
      </GptDocStage>
      <GptDocStage label="Dentro da barra lateral">
        <Sidebar height={300}>
          <Sidebar.NewChatButton />
          <Sidebar.SectionLabel>Today</Sidebar.SectionLabel>
          {gptConversations.slice(0, 3).map((item) => (
            <NavItem
              key={item}
              glyph={gptGlyphs.chat}
              state={ativa === item ? 'active' : 'default'}
              onClick={() => setAtiva(item)}
            >
              {item}
            </NavItem>
          ))}
        </Sidebar>
      </GptDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas Práticas"
        description="Regras de navegação."
        barColor="#5856D6"
      />
      <GptDocPractices
        dos={[
          'Marcar exatamente um item como active por lista — o aria-current sai automaticamente.',
          'Deixar o hover natural funcionar; reservar state="hover" às matrizes de documentação.',
          'Usar as="a" com href quando o item navegar de verdade.',
          'Manter o item dentro de um contêiner que defina a largura, deixando o rótulo truncar.',
        ]}
        donts={[
          'Marcar dois itens como active na mesma lista.',
          'Quebrar o rótulo em duas linhas: a altura de 36px foi medida para uma.',
          'Confiar no emoji 💬 para transmitir significado essencial.',
          'Usar o NavItem como botão de ação — para isso existem Button e IconButton.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a Temas"
        description="Superfície e texto vêm da escada translúcida, espelhada em branco no Dark."
        barColor="#5856D6"
      />
      <GptDocThemeSwitcher direction="column">
        {() => (
          <div style={{ width: 244, display: 'grid', gap: 4 }}>
            {ESTADOS.map((state) => (
              <NavItem key={state} glyph={gptGlyphs.chat} state={state}>
                Chat conversation ({state})
              </NavItem>
            ))}
          </div>
        )}
      </GptDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente NavItem."
        barColor="#5856D6"
      />
      <GptDocPropsTable
        title="NavItem"
        rows={[
          {
            name: 'state',
            type: "'default' | 'active' | 'hover'",
            default: "'default'",
            description:
              'Estado visual, espelhando a propriedade State do conjunto no Figma. active aplica aria-current="page".',
          },
          {
            name: 'glyph',
            type: 'React.ReactNode',
            description: 'Glifo antes do rótulo. O arquivo usa 💬 (gptGlyphs.chat).',
          },
          {
            name: 'as',
            type: 'React.ElementType',
            default: "'button'",
            description: 'Elemento raiz renderizado — permite usar o item como âncora.',
          },
          { name: 'href', type: 'string', description: 'URL de destino quando as renderiza uma âncora.' },
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
  title: 'ChatGPT/Componentes/NavItem',
  component: NavItem,
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'radio', options: ESTADOS, description: 'Estado visual da linha.' },
    glyph: { control: 'text', description: 'Glifo antes do rótulo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Rótulo da conversa.' },
  },
  args: {
    state: 'default',
    glyph: gptGlyphs.chat,
    theme: 'light',
    children: 'Chat conversation',
  },
};

export default meta;

type Story = StoryObj<typeof NavItem>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <div style={{ width: 240 }}>
        <NavItem {...args} />
      </div>
    </div>
  ),
};

/**
 * Réplica visual do conjunto de variantes publicado no Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 4,
        width: 272,
        padding: 16,
        border: '1px solid #E4E8E9',
        borderRadius: 5,
      }}
    >
      {ESTADOS.map((state) => (
        <NavItem key={state} glyph={gptGlyphs.chat} state={state}>
          Chat conversation
        </NavItem>
      ))}
    </div>
  ),
};

/**
 * Lista de conversas com seleção única.
 */
export const Estados: Story = {
  render: function ListaDeConversas() {
    const [ativa, setAtiva] = React.useState<string>(gptConversations[1]);
    return (
      <div style={{ width: 260, display: 'grid', gap: 4 }}>
        {gptConversations.map((item) => (
          <NavItem
            key={item}
            glyph={gptGlyphs.chat}
            state={ativa === item ? 'active' : 'default'}
            onClick={() => setAtiva(item)}
          >
            {item}
          </NavItem>
        ))}
      </div>
    );
  },
};
