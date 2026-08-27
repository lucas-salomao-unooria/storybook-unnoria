import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SidebarRow } from '../../../src/chatgpt/components/SidebarRow';
import { gptIconNames } from '../../../src/chatgpt/components/Icon';
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
import { gptWebClientNodes, gptWebFooterActions, gptWebHistory } from '../fixtures';

/**
 * Página de documentação rica do componente SidebarRow.
 */
const SidebarRowDocumentationPage = () => {
  const [ativa, setAtiva] = React.useState<string>(gptWebHistory[0]);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="ChatGPT"
        category="Componentes • Navegação"
        title="SidebarRow"
        description="Linha de 242 × 48 com padding 12, intervalo 8, raio 12, ícone de 24px e rótulo Inter Regular de 14/20, medida na barra lateral da tela New chat - V1 - A. É a linha do histórico de conversas e também a do rodapé de ações."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Uma régua de linha distinta da do NavItem."
        barColor="#5856D6"
      />
      <GptDocGrid>
        <GptDocCard icon="💬" title="Histórico de conversas">
          Ícone <code>chatText</code> e o título da conversa. É o uso da seção superior da barra.
        </GptDocCard>
        <GptDocCard icon="⚙️" title="Ações do rodapé">
          A mesma linha com <code>trash</code>, <code>sun</code>, <code>user</code>,{' '}
          <code>arrowSquareOut</code> e <code>signOut</code>.
        </GptDocCard>
        <GptDocCard icon="⚖️" title="Não é o NavItem">
          O <code>NavItem</code> vem da página <code>🟡 Design system</code>: 36px de altura, raio
          8, padding 8/12 e glifo tipográfico de 14px. São duas réguas do mesmo arquivo, e nenhuma
          substitui a outra.
        </GptDocCard>
        <GptDocCard icon="🔗" title="button ou âncora">
          A prop <code>as</code> permite renderizar a linha como <code>&lt;a&gt;</code> quando ela
          navegar de fato.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Medidas lidas da instância Frame da barra lateral."
        barColor="#5856D6"
      />
      <GptDocFigmaSpecs
        nodeId={gptWebClientNodes.sidebar}
        frameName="Frame (State=Default, Vertical=False, Flip=False)"
        specs={[
          { label: 'Medidas', value: '242 × 48' },
          { label: 'Padding', value: '12px · spacing/5' },
          { label: 'Intervalo', value: '8px · spacing/4' },
          { label: 'Raio', value: '12px · radius/lg' },
          { label: 'Ícone', value: '24 × 24 · size/icon-lg' },
          { label: 'Rótulo', value: 'Inter Regular · 14/20 (Body/SM)' },
        ]}
        deviations={[
          'O arquivo desenha a linha sem preenchimento e publica apenas o estado `State=Default` — não há hover, foco, pressionado nem selecionado. O hover em `--gpt-fill-4`, o anel de foco de 2px em `border/brand` e o estado `active` em `--gpt-fill-8` foram acrescentados usando exclusivamente tokens da própria marca.',
          'A prop `active` também aplica `aria-current="page"`, que é a semântica de uma conversa aberta. O arquivo não a descreve.',
          'A largura de 242px é a da linha dentro da seção de 282px com padding 20. O componente usa `width: 100%` para acompanhar o contêiner em vez de fixar a medida.',
          'O rótulo é truncado em uma linha com reticências. O arquivo mostra três títulos que cabem; um histórico real não cabe.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Ícone, rótulo e uma superfície de estado."
        barColor="#5856D6"
      />
      <GptDocGrid min={260}>
        <GptDocCard icon="🎯" title="icon">
          Nome do registro <code>gptIcons</code>, renderizado a 24px e marcado{' '}
          <code>aria-hidden</code>.
        </GptDocCard>
        <GptDocCard icon="🔤" title="children">
          O rótulo da linha, truncado em uma linha.
        </GptDocCard>
        <GptDocCard icon="🔁" title="active">
          Superfície de 8% mais <code>aria-current=&quot;page&quot;</code>.
        </GptDocCard>
        <GptDocCard icon="🧩" title="iconNode">
          Substitui o ícone do registro por um nó arbitrário — um avatar, por exemplo.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="4. Matriz de Estados"
        description="Histórico, rodapé e uma trilha de seleção interativa."
        barColor="#5856D6"
      />
      <GptDocStage label="Histórico de conversas" direction="column" align="flex-start">
        <div style={{ width: 242 }}>
          {gptWebHistory.map((title) => (
            <SidebarRow key={title} icon="chatText">
              {title}
            </SidebarRow>
          ))}
        </div>
      </GptDocStage>
      <GptDocStage label="Ações do rodapé" direction="column" align="flex-start">
        <div style={{ width: 242 }}>
          {gptWebFooterActions.map((action) => (
            <SidebarRow key={action.label} icon={action.icon}>
              {action.label}
            </SidebarRow>
          ))}
        </div>
      </GptDocStage>
      <GptDocStage label="Seleção — clique para alternar a conversa aberta" direction="column">
        <div style={{ width: 242 }}>
          {gptWebHistory.map((title) => (
            <SidebarRow
              key={title}
              icon="chatText"
              active={ativa === title}
              onClick={() => setAtiva(title)}
            >
              {title}
            </SidebarRow>
          ))}
        </div>
      </GptDocStage>
      <GptDocStage label="Desabilitada e sem ícone" direction="column" align="flex-start">
        <div style={{ width: 242 }}>
          <SidebarRow icon="trash" disabled>
            Clear conversations
          </SidebarRow>
          <SidebarRow>Linha sem ícone</SidebarRow>
        </div>
      </GptDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas Práticas"
        description="Regras de composição da barra lateral."
        barColor="#5856D6"
      />
      <GptDocPractices
        dos={[
          'Usar SidebarRow dentro de WebSidebar.Section, que já aplica o padding de 20 e o intervalo de 4.',
          'Marcar como active a conversa aberta, e apenas ela.',
          'Renderizar como âncora quando a linha navegar de fato.',
          'Associar a cada ação do rodapé o ícone que o arquivo lhe dá.',
        ]}
        donts={[
          'Usar SidebarRow no lugar do NavItem: são réguas distintas, de páginas distintas do arquivo.',
          'Marcar várias linhas como active na mesma barra.',
          'Deixar o rótulo quebrar em duas linhas — a altura de 48px é fixa por desenho.',
          'Trocar o raio de 12px pelo raio 8 do NavItem.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a Temas"
        description="Ícone e rótulo seguem text/primary; as superfícies de estado vêm da escada translúcida."
        barColor="#5856D6"
      />
      <GptDocThemeSwitcher direction="column">
        {() => (
          <div style={{ width: 242 }}>
            <SidebarRow icon="chatText" active>
              AI Chat Tool Ethics
            </SidebarRow>
            <SidebarRow icon="chatText">Al Chat Tool Impact Writing</SidebarRow>
            <SidebarRow icon="signOut">Log out</SidebarRow>
          </div>
        )}
      </GptDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente SidebarRow."
        barColor="#5856D6"
      />
      <GptDocPropsTable
        title="SidebarRow"
        rows={[
          {
            name: 'icon',
            type: 'GptIconName',
            description: 'Ícone de 24px à esquerda do rótulo.',
          },
          {
            name: 'iconNode',
            type: 'React.ReactNode',
            description: 'Substitui o ícone do registro por um nó arbitrário.',
          },
          {
            name: 'active',
            type: 'boolean',
            default: 'false',
            description: 'Marca a linha como a conversa aberta e aplica aria-current="page".',
          },
          {
            name: 'as',
            type: 'React.ElementType',
            default: "'button'",
            description: "Elemento raiz. Use 'a' quando a linha navegar.",
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Desabilita a interação e aplica 40% de opacidade.',
          },
          {
            name: 'theme',
            type: "'light' | 'dark'",
            description:
              'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
          },
          { name: 'children', type: 'React.ReactNode', description: 'Rótulo da linha.' },
          { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof SidebarRow> = {
  title: 'ChatGPT/Componentes/SidebarRow',
  component: SidebarRow,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: { control: 'select', options: gptIconNames, description: 'Ícone de 24px.' },
    active: { control: 'boolean', description: 'Conversa aberta.' },
    disabled: { control: 'boolean', description: 'Desabilita a interação.' },
    children: { control: 'text', description: 'Rótulo da linha.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    icon: 'chatText',
    active: false,
    disabled: false,
    children: 'AI Chat Tool Ethics',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof SidebarRow>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SidebarRowDocumentationPage />,
};

/**
 * Playground com todas as propriedades do SidebarRow expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SidebarRow',
  render: (args) => (
    <div
      data-gpt-theme={args.theme}
      style={{
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#333333' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <div style={{ width: 242, margin: '0 auto' }}>
        <SidebarRow {...args} />
      </div>
    </div>
  ),
};

/**
 * Réplica da barra lateral da tela de nova conversa.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ padding: 20, border: '1px solid #E4E8E9', borderRadius: 5, width: 282 }}>
      {gptWebHistory.map((title) => (
        <SidebarRow key={title} icon="chatText">
          {title}
        </SidebarRow>
      ))}
    </div>
  ),
};

/**
 * As cinco ações do rodapé, com o ícone que o arquivo dá a cada uma.
 */
export const Estados: Story = {
  render: function TrilhaDeSelecao() {
    const [ativa, setAtiva] = React.useState<string>(gptWebFooterActions[0].label);
    return (
      <div style={{ width: 242 }}>
        {gptWebFooterActions.map((action) => (
          <SidebarRow
            key={action.label}
            icon={action.icon}
            active={ativa === action.label}
            onClick={() => setAtiva(action.label)}
          >
            {action.label}
          </SidebarRow>
        ))}
      </div>
    );
  },
};
