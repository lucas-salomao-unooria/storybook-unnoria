import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Sidebar } from '../../../src/chatgpt/components/Sidebar';
import { NavItem, SearchInput } from '../../../src/chatgpt/components';
import { gptGlyphs, gptSizing } from '../../../src/chatgpt/tokens';
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
import { gptConversations, gptFigmaNodes, gptSidebarFooter } from '../fixtures';

/**
 * Barra lateral completa, montada com os subcomponentes reais.
 */
const BarraCompleta: React.FC<{ altura?: number | string; comBusca?: boolean }> = ({
  altura = 560,
  comBusca = false,
}) => {
  const [ativa, setAtiva] = React.useState<string>(gptConversations[0]);

  return (
    <Sidebar height={altura}>
      <Sidebar.NewChatButton />
      {comBusca && <SearchInput block />}
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
      <Sidebar.SectionLabel>Previous 7 days</Sidebar.SectionLabel>
      {gptConversations.slice(3).map((item) => (
        <NavItem
          key={item}
          glyph={gptGlyphs.chat}
          state={ativa === item ? 'active' : 'default'}
          onClick={() => setAtiva(item)}
        >
          {item}
        </NavItem>
      ))}
      <Sidebar.Spacer />
      {gptSidebarFooter.map((item) => (
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
      badgeBrand="ChatGPT"
      category="Componentes • Navegação"
      title="Sidebar"
      description="Réplica do componente Sidebar da página 🟡 Design system: coluna de 260px (size/sidebar) com padding 12/8, gap 4 e superfície bg/secondary, composta pelo botão de nova conversa em bg/inverse, rótulos de seção temporais, linhas de conversa (NavItem), espaçador elástico e itens de rodapé a 70% de opacidade."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="A coluna de navegação persistente do cliente de conversa."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="➕" title="Nova conversa">
        <code>Sidebar.NewChatButton</code> — superfície <code>bg/inverse</code> de largura total, com
        o glifo <code>+</code> e o rótulo em peso 500. É a única ação de destaque da coluna.
      </GptDocCard>
      <GptDocCard icon="🗓️" title="Agrupamento temporal">
        <code>Sidebar.SectionLabel</code> separa as conversas por período —{' '}
        <em>Today</em>, <em>Previous 7 days</em> — em 11px Semi Bold a 40% de opacidade.
      </GptDocCard>
      <GptDocCard icon="↕️" title="Espaçador">
        <code>Sidebar.Spacer</code> ocupa o espaço restante, empurrando o rodapé para a base sem
        depender de posicionamento absoluto.
      </GptDocCard>
      <GptDocCard icon="👤" title="Rodapé">
        <code>Sidebar.FooterItem</code> — conta, novidades e saída, a 70% de opacidade, com hover a
        2% como as linhas de conversa.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do componente via Plugin API."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.sidebar}
      frameName="Sidebar (componente único)"
      specs={[
        { label: 'Dimensões', value: `${gptSizing.sidebar} × 800 · size/sidebar` },
        { label: 'Padding', value: '12/8 · spacing/5 e spacing/4' },
        { label: 'Gap', value: '4px · spacing/2' },
        { label: 'Superfície', value: '#F9F9FA · bg/secondary' },
        { label: 'NewChatButton', value: 'padding 10/12 · raio 8 · bg/inverse' },
        { label: 'FooterItem', value: 'padding 8/12 · texto a 70%' },
      ]}
      deviations={[
        'O padding vertical de 10px do NewChatButton e o corpo de 11px do SectionLabel são valores literais do arquivo, sem degrau equivalente nas coleções.',
        'No arquivo, as três linhas de conversa são frames NavItem inertes, sem estado. Na implementação elas são o componente NavItem real, com os três estados publicados.',
        'Os itens de rodapé do arquivo não têm raio nem estado de hover. O componente aplica raio 8 (igual às linhas de conversa) e hover a 2%, para dar retorno de interação a um item que é clicável.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Cinco peças compostas dentro de uma coluna de 260px."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="🧱" title="Sidebar">
        <code>&lt;nav&gt;</code> vertical com gap 4 e superfície <code>bg/secondary</code>. A prop{' '}
        <code>height</code> aceita <code>&apos;100%&apos;</code> para acompanhar a aplicação.
      </GptDocCard>
      <GptDocCard icon="➕" title="Sidebar.NewChatButton">
        Botão de largura total. Aceita <code>glyph</code> e <code>children</code> para
        internacionalização.
      </GptDocCard>
      <GptDocCard icon="🗓️" title="Sidebar.SectionLabel">
        Rótulo de agrupamento, com padding próprio alinhado às linhas de conversa.
      </GptDocCard>
      <GptDocCard icon="👤" title="Sidebar.FooterItem">
        Item de rodapé. Aceita <code>as=&quot;a&quot;</code> e <code>href</code> para navegação real.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Composições"
      description="A barra publicada, uma variação com busca e as peças isoladas."
      barColor="#5856D6"
    />
    <GptDocStage label="Barra completa — réplica da composição do arquivo" align="flex-start">
      <BarraCompleta />
    </GptDocStage>
    <GptDocStage label="Com campo de busca no topo" align="flex-start">
      <BarraCompleta comBusca />
    </GptDocStage>
    <GptDocStage label="Peças isoladas" direction="column" align="flex-start">
      <div style={{ width: 244, display: 'grid', gap: 8, background: '#F9F9FA', padding: 8, borderRadius: 8 }}>
        <Sidebar.NewChatButton />
        <Sidebar.SectionLabel>Today</Sidebar.SectionLabel>
        <NavItem glyph={gptGlyphs.chat} state="active">
          Chat conversation one
        </NavItem>
        <Sidebar.FooterItem>My account</Sidebar.FooterItem>
        <Sidebar.FooterItem as="a" href="#faq">
          Updates &amp; FAQ
        </Sidebar.FooterItem>
      </div>
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de navegação persistente."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Manter o NewChatButton como primeiro elemento — é a única ação de destaque da coluna.',
        'Usar Sidebar.Spacer para fixar o rodapé na base, em vez de posicionamento absoluto.',
        'Passar height="100%" quando a barra viver dentro de um layout de aplicação.',
        'Agrupar as conversas por período com SectionLabel, como faz o produto.',
      ]}
      donts={[
        'Fixar a largura em pixel avulso: os 260px vêm de size/sidebar.',
        'Colocar duas ações de destaque na coluna.',
        'Usar Button no lugar do NewChatButton, que tem padding e peso de rótulo próprios.',
        'Aplicar a superfície bg/primary à barra, o que apaga a separação com a área de conversa.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="bg/secondary vai de #F9F9FA para #303030; o botão de nova conversa inverte junto com bg/inverse."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher padding={0}>
      {() => <BarraCompleta altura={480} />}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público da Sidebar e de seus subcomponentes."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="Sidebar"
      rows={[
        {
          name: 'height',
          type: 'number | string',
          default: '800',
          description:
            "Altura da barra. O arquivo publica 800px; use '100%' para ocupar a altura do contêiner da aplicação.",
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
    <GptDocPropsTable
      title="Sidebar.NewChatButton"
      rows={[
        {
          name: 'glyph',
          type: 'React.ReactNode',
          default: 'gptGlyphs.plus',
          description: 'Glifo antes do rótulo.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          default: "'New chat'",
          description: 'Rótulo do botão, em peso 500.',
        },
        {
          name: '...props',
          type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
          description: 'Todas as props nativas de button (onClick, disabled…) são repassadas.',
        },
      ]}
    />
    <GptDocPropsTable
      title="Sidebar.SectionLabel, Sidebar.Spacer e Sidebar.FooterItem"
      rows={[
        {
          name: 'children (SectionLabel)',
          type: 'React.ReactNode',
          description: 'Rótulo de agrupamento temporal, em 11px Semi Bold a 40% de opacidade.',
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
          name: 'href (FooterItem)',
          type: 'string',
          description: 'URL de destino quando as renderiza uma âncora.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Sidebar> = {
  title: 'ChatGPT/Componentes/Sidebar',
  component: Sidebar,
  parameters: { layout: 'padded' },
  argTypes: {
    height: { control: 'number', description: 'Altura da barra em px.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: { height: 560, theme: 'light' },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 24,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <Sidebar {...args}>
        <Sidebar.NewChatButton />
        <Sidebar.SectionLabel>Today</Sidebar.SectionLabel>
        {gptConversations.slice(0, 3).map((item, index) => (
          <NavItem key={item} glyph={gptGlyphs.chat} state={index === 0 ? 'active' : 'default'}>
            {item}
          </NavItem>
        ))}
        <Sidebar.Spacer />
        {gptSidebarFooter.map((item) => (
          <Sidebar.FooterItem key={item}>{item}</Sidebar.FooterItem>
        ))}
      </Sidebar>
    </div>
  ),
};

/**
 * Réplica visual do componente publicado no Figma — 260 × 800.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <Sidebar height={800}>
      <Sidebar.NewChatButton />
      <Sidebar.SectionLabel>Today</Sidebar.SectionLabel>
      <NavItem>Chat conversation one</NavItem>
      <NavItem>AI research discussion</NavItem>
      <NavItem>Code review help</NavItem>
      <Sidebar.Spacer />
      <Sidebar.FooterItem>My account</Sidebar.FooterItem>
      <Sidebar.FooterItem>Updates &amp; FAQ</Sidebar.FooterItem>
      <Sidebar.FooterItem>Log out</Sidebar.FooterItem>
    </Sidebar>
  ),
};

/**
 * Barra completa com seleção interativa e campo de busca.
 */
export const ComposicaoModular: Story = {
  render: () => <BarraCompleta comBusca />,
};
