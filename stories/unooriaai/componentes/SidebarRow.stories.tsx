import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SidebarRow } from '../../../src/unooriaai/components/SidebarRow';
import { uaiIconNames } from '../../../src/unooriaai/components/Icon';
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
import { uaiWebFooterActions, uaiWebHistory } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente SidebarRow.
 */
const SidebarRowDocumentationPage = () => {
  const [ativa, setAtiva] = React.useState<string>(uaiWebHistory[0]);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="UnooriaAI"
        category="Componentes • Navegação"
        title="SidebarRow"
        description="Linha de 242 × 48 com padding 12, intervalo 8, raio 12, ícone de 24px e rótulo de 14/20, usada na barra lateral do cliente web. É a linha do histórico de conversas e também a do rodapé de ações."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Uma régua de linha distinta da do NavItem."
        barColor={BAR}
      />
      <UaiDocGrid>
        <UaiDocCard icon="💬" title="Histórico de conversas">
          Ícone <code>chatText</code> e o título da conversa. É o uso da seção superior da barra.
        </UaiDocCard>
        <UaiDocCard icon="⚙️" title="Ações do rodapé">
          A mesma linha com <code>trash</code>, <code>sun</code>, <code>user</code>,{' '}
          <code>arrowSquareOut</code> e <code>signOut</code>.
        </UaiDocCard>
        <UaiDocCard icon="⚖️" title="Não é o NavItem">
          O <code>NavItem</code> é a linha da barra <code>Sidebar</code>: 36px de altura, raio 8,
          padding 8/12 e ícone de 14px. São duas réguas do módulo, e nenhuma substitui a outra.
        </UaiDocCard>
        <UaiDocCard icon="🔗" title="button ou âncora">
          A prop <code>as</code> permite renderizar a linha como <code>&lt;a&gt;</code> quando ela
          navegar de fato.
        </UaiDocCard>
      </UaiDocGrid>

      <UnooriaDocSectionHeader
        title="2. Especificações técnicas"
        description="Medidas e tokens consumidos pela linha."
        barColor={BAR}
      />
      <UaiDocSpecs
        component="SidebarRow"
        layout="Linha · 242 × 48"
        specs={[
          { label: 'Medidas', value: '242 × 48' },
          { label: 'Padding', value: '12px · --uai-spacing-5' },
          { label: 'Intervalo', value: '8px · --uai-spacing-4' },
          { label: 'Raio', value: '12px · --uai-radius-lg' },
          { label: 'Ícone', value: '24 × 24 · --uai-size-icon-lg' },
          { label: 'Rótulo', value: 'Open Sans · 14/20 · --uai-font-body-sm-*' },
        ]}
      />
      <UaiDocDecisions
        items={[
          {
            subject: 'SidebarRow ≠ NavItem',
            detail:
              'A `SidebarRow` (48px, raio 12, ícone de 24px) é a régua da `WebSidebar`; o `NavItem` (36px, raio 8, ícone de 14px) é a da `Sidebar`. Consolidar os dois apagaria uma medida real do módulo.',
          },
          {
            subject: 'Sem preenchimento em repouso',
            detail:
              'A linha é transparente: a separação vem do fio das seções. O hover usa `--uai-fill-4`, o estado `active` usa `--uai-fill-8`, o foco desenha um anel de 2px em `--uai-border-brand` e o desabilitado cai a 40% de opacidade.',
          },
          {
            subject: 'Conversa aberta na semântica',
            detail:
              'A prop `active` também aplica `aria-current="page"`, que é a semântica de uma conversa aberta.',
          },
          {
            subject: 'Largura e truncamento',
            detail:
              'Os 242px são a largura da linha dentro da seção de 282px com padding 20; o componente usa `width: 100%` para acompanhar o contêiner. O rótulo é truncado em uma linha com reticências, porque um histórico real não cabe.',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Ícone, rótulo e uma superfície de estado."
        barColor={BAR}
      />
      <UaiDocAnatomy
        zones={[
          { name: 'icon', role: 'Nome do registro de ícones, renderizado a 24px e marcado aria-hidden.', token: '--uai-size-icon-lg' },
          { name: 'children', role: 'O rótulo da linha, truncado em uma linha.', token: '--uai-font-body-sm-size' },
          { name: 'active', role: 'Superfície de realce mais aria-current="page".', token: '--uai-fill-8' },
          { name: 'iconNode', role: 'Substitui o ícone do registro por um nó arbitrário — um avatar, por exemplo.' },
        ]}
      />

      <UnooriaDocSectionHeader
        title="4. Matriz de Variantes, Tamanhos e Estados"
        description="Histórico, rodapé e uma trilha de seleção interativa."
        barColor={BAR}
      />
      <UaiDocStage label="Histórico de conversas" direction="column" align="flex-start">
        <div style={{ width: 242 }}>
          {uaiWebHistory.map((title) => (
            <SidebarRow key={title} icon="chatText">
              {title}
            </SidebarRow>
          ))}
        </div>
      </UaiDocStage>
      <UaiDocStage label="Ações do rodapé" direction="column" align="flex-start">
        <div style={{ width: 242 }}>
          {uaiWebFooterActions.map((action) => (
            <SidebarRow key={action.label} icon={action.icon}>
              {action.label}
            </SidebarRow>
          ))}
        </div>
      </UaiDocStage>
      <UaiDocStage label="Seleção — clique para alternar a conversa aberta" direction="column" align="flex-start">
        <div style={{ width: 242 }}>
          {uaiWebHistory.map((title) => (
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
      </UaiDocStage>
      <UaiDocStage label="Desabilitada e sem ícone" direction="column" align="flex-start">
        <div style={{ width: 242 }}>
          <SidebarRow icon="trash" disabled>
            {uaiWebFooterActions[0].label}
          </SidebarRow>
          <SidebarRow>Linha sem ícone</SidebarRow>
        </div>
      </UaiDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas Práticas"
        description="Regras de composição da barra lateral."
        barColor={BAR}
      />
      <UaiDocPractices
        dos={[
          'Usar SidebarRow dentro de WebSidebar.Section, que já aplica o padding de 20 e o intervalo de 4.',
          'Marcar como active a conversa aberta, e apenas ela.',
          'Renderizar como âncora quando a linha navegar de fato.',
          'Associar a cada ação do rodapé um ícone que a descreva.',
        ]}
        donts={[
          'Usar SidebarRow no lugar do NavItem: são réguas distintas, de barras laterais distintas.',
          'Marcar várias linhas como active na mesma barra.',
          'Deixar o rótulo quebrar em duas linhas — a altura de 48px é fixa por desenho.',
          'Trocar o raio de 12px pelo raio 8 do NavItem.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a Temas"
        description="Ícone e rótulo seguem o texto primário; as superfícies de estado vêm da escada translúcida."
        barColor={BAR}
      />
      <UaiDocThemeSwitcher direction="column">
        {() => (
          <div style={{ width: 242 }}>
            <SidebarRow icon="chatText" active>
              {uaiWebHistory[0]}
            </SidebarRow>
            <SidebarRow icon="chatText">{uaiWebHistory[1]}</SidebarRow>
            <SidebarRow icon="signOut">{uaiWebFooterActions[4].label}</SidebarRow>
          </div>
        )}
      </UaiDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente SidebarRow."
        barColor={BAR}
      />
      <UaiDocPropsTable
        title="SidebarRow"
        rows={[
          {
            name: 'icon',
            type: 'UaiIconName',
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
          { name: 'href', type: 'string', description: 'URL de destino quando as renderiza uma âncora.' },
          {
            name: 'target / rel',
            type: 'string',
            description: 'Alvo e relação do link quando as renderiza uma âncora.',
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
  title: 'UnooriaAI/Componentes/SidebarRow',
  component: SidebarRow,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: { control: 'select', options: uaiIconNames, description: 'Ícone de 24px.' },
    active: { control: 'boolean', description: 'Conversa aberta.' },
    disabled: { control: 'boolean', description: 'Desabilita a interação.' },
    children: { control: 'text', description: 'Rótulo da linha.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    icon: 'chatText',
    active: false,
    disabled: false,
    children: 'Ética no uso de assistentes',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof SidebarRow>;

/**
 * Documentação rica e completa do componente.
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
    <UaiDocStage theme={args.theme ?? 'light'} padding={48}>
      <div style={{ width: 242 }}>
        <SidebarRow {...args} />
      </div>
    </UaiDocStage>
  ),
};

/**
 * O histórico de conversas como aparece na barra lateral.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UaiDocStage align="flex-start" padding={20} width={282}>
      <div style={{ width: '100%' }}>
        {uaiWebHistory.map((title) => (
          <SidebarRow key={title} icon="chatText">
            {title}
          </SidebarRow>
        ))}
      </div>
    </UaiDocStage>
  ),
};

/**
 * As cinco ações do rodapé, com seleção interativa.
 */
export const Estados: Story = {
  render: function TrilhaDeSelecao() {
    const [ativa, setAtiva] = React.useState<string>(uaiWebFooterActions[0].label);
    return (
      <UaiDocStage align="flex-start">
        <div style={{ width: 242 }}>
          {uaiWebFooterActions.map((action) => (
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
      </UaiDocStage>
    );
  },
};
