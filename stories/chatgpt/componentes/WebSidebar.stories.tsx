import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WebSidebar } from '../../../src/chatgpt/components/WebSidebar';
import { SidebarRow } from '../../../src/chatgpt/components/SidebarRow';
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
 * A barra lateral do arquivo, montada com os componentes reais.
 */
const BarraOficial: React.FC<{ height?: number | string }> = ({ height = 600 }) => (
  <WebSidebar height={height}>
    <WebSidebar.Section>
      <WebSidebar.NewChat>New chat</WebSidebar.NewChat>
      {gptWebHistory.map((title) => (
        <SidebarRow key={title} icon="chatText">
          {title}
        </SidebarRow>
      ))}
    </WebSidebar.Section>
    <WebSidebar.Section bordered>
      {gptWebFooterActions.map((action) => (
        <SidebarRow key={action.label} icon={action.icon}>
          {action.label}
        </SidebarRow>
      ))}
    </WebSidebar.Section>
  </WebSidebar>
);

/**
 * Página de documentação rica do componente WebSidebar.
 */
const WebSidebarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Componentes • Navegação"
      title="WebSidebar"
      description="Réplica da AIChatSidebar da tela New chat - V1 - A: 282px de largura, seções com padding 20 e intervalo 4, distribuídas entre o topo e a base, e fios de 1px à direita da coluna e acima da seção de rodapé."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Uma barra lateral distinta da do Sidebar."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="🧭" title="Duas seções">
        Histórico no topo, ações na base, empurradas pelo <code>space-between</code> — é assim que
        o arquivo distribui a coluna de 1024px.
      </GptDocCard>
      <GptDocCard icon="⚖️" title="Não é o Sidebar">
        O <code>Sidebar</code> vem da página <code>🟡 Design system</code>: 260px, superfície{' '}
        <code>bg/secondary</code> e <code>NavItem</code> de 36px. Este mede 282px, é transparente e
        usa <code>SidebarRow</code> de 48px.
      </GptDocCard>
      <GptDocCard icon="➕" title="WebSidebar.NewChat">
        O botão de 36px com raio 12 — preto no tema claro e <strong>lilás</strong> no escuro. O
        arquivo não inverte esse alvo.
      </GptDocCard>
      <GptDocCard icon="🧵" title="Fios assimétricos">
        <code>--gpt-web-hairline</code> vale 10% no claro e <strong>15%</strong> no escuro. A
        assimetria é do próprio arquivo e foi preservada.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas da instância AIChatSidebar nas duas versões da tela."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptWebClientNodes.sidebar}
      frameName="AIChatSidebar (Property=B)"
      specs={[
        { label: 'Medidas', value: '282 × 1024' },
        { label: 'Distribuição', value: 'space-between · intervalo 20' },
        { label: 'Seção', value: 'padding 20 · intervalo 4' },
        { label: 'Botão', value: '242 × 36 · padding 8/16 · raio 12' },
        { label: 'Fio Light', value: 'preto a 10%' },
        { label: 'Fio Dark', value: 'branco a 15%' },
      ]}
      deviations={[
        'O botão de nova conversa é preto (`color/black`) no quadro claro e lilás (`color/purple/400`) no escuro. Não é uma inversão de `bg/inverse`, que no escuro seria branco — é uma decisão do arquivo, preservada no token `--gpt-web-accent`.',
        'O fio da barra é preto a 10% no claro e branco a **15%** no escuro. Os dois valores foram medidos; nenhum é derivado do outro.',
        'A coluna não pinta fundo: no arquivo ela mostra a mesma superfície da conversa, e a separação vem apenas dos fios.',
        'O arquivo publica a coluna com 1024px de altura fixa. A prop `height` aceita `"100%"` para que a barra acompanhe a altura da aplicação, e a coluna rola quando o histórico não couber — o arquivo é estático e corta o conteúdo na aresta.',
        'O elemento raiz é um `<nav>`. O arquivo não declara semântica; o papel de navegação é inequívoco.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Casca, seções e o botão de nova conversa."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="🧱" title="WebSidebar">
        A casca de 282px, com o fio à direita e as seções distribuídas.
      </GptDocCard>
      <GptDocCard icon="📦" title="WebSidebar.Section">
        Padding 20 e intervalo 4. Com <code>bordered</code>, ganha o fio no topo — o arquivo o
        aplica só ao rodapé.
      </GptDocCard>
      <GptDocCard icon="➕" title="WebSidebar.NewChat">
        Botão de largura total com o ícone <code>add</code> de 16px e o rótulo centralizado.
      </GptDocCard>
      <GptDocCard icon="📏" title="height">
        1024px por padrão; use <code>&quot;100%&quot;</code> para acompanhar a aplicação.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Composição Modular"
      description="A barra completa e as seções isoladas."
      barColor="#5856D6"
    />
    <GptDocStage label="A barra completa do arquivo" align="flex-start">
      <BarraOficial />
    </GptDocStage>
    <GptDocStage label="Botão de nova conversa — estados" direction="column" align="flex-start">
      <div style={{ width: 242 }}>
        <WebSidebar.NewChat>New chat</WebSidebar.NewChat>
      </div>
      <div style={{ width: 242 }}>
        <WebSidebar.NewChat disabled>New chat</WebSidebar.NewChat>
      </div>
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de composição da barra lateral do cliente web."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Usar duas seções — histórico no topo e ações na base, com bordered apenas na de baixo.',
        'Compor as linhas com SidebarRow, que já tem a régua de 48px desta barra.',
        'Passar height="100%" quando a barra viver dentro de um layout de aplicação.',
        'Manter o botão de nova conversa como primeiro item da seção superior.',
      ]}
      donts={[
        'Usar WebSidebar no lugar do Sidebar: são barras distintas, de páginas distintas do arquivo.',
        'Pintar um fundo na coluna — no arquivo ela é transparente.',
        'Aplicar bordered às duas seções: o fio duplicaria a divisão.',
        'Substituir --gpt-web-accent por bg/inverse, o que tornaria o botão branco no tema escuro.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Repare no botão de nova conversa: preto no claro, lilás no escuro."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher direction="column">
      {() => <BarraOficial height={520} />}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público da barra e dos seus subcomponentes."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="WebSidebar"
      rows={[
        {
          name: 'height',
          type: 'number | string',
          default: '1024',
          description: 'Altura da coluna. Use "100%" para acompanhar o contêiner da aplicação.',
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
          description: 'Conteúdo — normalmente duas WebSidebar.Section.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <GptDocPropsTable
      title="WebSidebar.Section"
      rows={[
        {
          name: 'bordered',
          type: 'boolean',
          default: 'false',
          description: 'Desenha o fio de 1px no topo. O arquivo o aplica só à seção de rodapé.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Linhas da seção.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <GptDocPropsTable
      title="WebSidebar.NewChat"
      rows={[
        {
          name: 'children',
          type: 'React.ReactNode',
          default: "'New chat'",
          description: 'Rótulo do botão.',
        },
        {
          name: 'iconNode',
          type: 'React.ReactNode',
          description: 'Substitui o ícone add de 16px por um nó arbitrário.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Desabilita a interação e aplica 40% de opacidade.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof WebSidebar> = {
  title: 'ChatGPT/Componentes/WebSidebar',
  component: WebSidebar,
  parameters: { layout: 'padded' },
  argTypes: {
    height: { control: 'number', description: 'Altura da coluna em pixels.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    height: 600,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof WebSidebar>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <WebSidebarDocumentationPage />,
};

/**
 * Playground com todas as propriedades do WebSidebar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do WebSidebar',
  render: (args) => (
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        padding: 24,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#333333' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <BarraOficial height={args.height} />
    </div>
  ),
};

/**
 * Réplica da barra lateral da tela de nova conversa.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ display: 'flex', border: '1px solid #E4E8E9', borderRadius: 5 }}>
      <BarraOficial height={700} />
    </div>
  ),
};

/**
 * Uso flexível com os subcomponentes.
 */
export const ComposicaoModular: Story = {
  render: function BarraCompacta() {
    const [ativa, setAtiva] = React.useState<string>(gptWebHistory[0]);
    return (
      <div style={{ display: 'flex' }}>
        <WebSidebar height={420}>
          <WebSidebar.Section>
            <WebSidebar.NewChat>New chat</WebSidebar.NewChat>
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
          </WebSidebar.Section>
          <WebSidebar.Section bordered>
            <SidebarRow icon="signOut">Log out</SidebarRow>
          </WebSidebar.Section>
        </WebSidebar>
      </div>
    );
  },
};
