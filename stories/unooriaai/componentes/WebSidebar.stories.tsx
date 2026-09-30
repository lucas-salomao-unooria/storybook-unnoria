import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { WebSidebar } from '../../../src/unooriaai/components/WebSidebar';
import { SidebarRow } from '../../../src/unooriaai/components/SidebarRow';
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
 * A barra lateral do cliente web, montada com os componentes reais.
 */
const BarraCompleta: React.FC<{ height?: number | string }> = ({ height = 600 }) => (
  <WebSidebar height={height}>
    <WebSidebar.Section>
      <WebSidebar.NewChat />
      {uaiWebHistory.map((title) => (
        <SidebarRow key={title} icon="chatText">
          {title}
        </SidebarRow>
      ))}
    </WebSidebar.Section>
    <WebSidebar.Section bordered>
      {uaiWebFooterActions.map((action) => (
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
      badgeBrand="UnooriaAI"
      category="Componentes • Navegação"
      title="WebSidebar"
      description="Barra lateral do cliente web: 282px de largura, seções com padding 20 e intervalo 4, distribuídas entre o topo e a base, e fios de 1px à direita da coluna e acima da seção de rodapé."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Uma barra lateral distinta da do Sidebar."
      barColor={BAR}
    />
    <UaiDocGrid>
      <UaiDocCard icon="🧭" title="Duas seções">
        Histórico no topo, ações na base, empurradas pelo <code>space-between</code> ao longo da
        coluna de 1024px.
      </UaiDocCard>
      <UaiDocCard icon="⚖️" title="Não é o Sidebar">
        O <code>Sidebar</code> mede 260px, tem superfície <code>--uai-bg-secondary</code> e usa{' '}
        <code>NavItem</code> de 36px. Este mede 282px, é transparente e usa{' '}
        <code>SidebarRow</code> de 48px.
      </UaiDocCard>
      <UaiDocCard icon="➕" title="WebSidebar.NewChat">
        O botão de 36px com raio 12, em <code>--uai-web-accent</code>: navy profundo no tema claro
        e lilás no escuro.
      </UaiDocCard>
      <UaiDocCard icon="🧵" title="Fios por tema">
        <code>--uai-web-hairline</code> tem um valor nomeado em cada tema: tinta roxa a 20% no
        claro e branco a 20% no escuro.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações técnicas"
      description="Medidas e tokens consumidos pela barra."
      barColor={BAR}
    />
    <UaiDocSpecs
      component="WebSidebar"
      layout="Coluna · 282 × 1024"
      specs={[
        { label: 'Medidas', value: '282 × 1024 (altura configurável)' },
        { label: 'Distribuição', value: 'space-between · intervalo mínimo 20' },
        { label: 'Seção', value: 'padding 20 · intervalo 4' },
        { label: 'Botão', value: '242 × 36 · padding 8/16 · raio 12' },
        { label: 'Botão (cor)', value: '--uai-web-accent · rótulo --uai-text-inverse' },
        { label: 'Fios', value: '1px · --uai-web-hairline' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'WebSidebar ≠ Sidebar',
          detail:
            'A `WebSidebar` (282px, transparente, `SidebarRow` de 48px) é a barra do cliente web; o `Sidebar` (260px, `--uai-bg-secondary`, `NavItem` de 36px) é a da conversa padrão. Consolidá-las apagaria uma medida real do módulo.',
        },
        {
          subject: 'Sem fundo próprio',
          detail:
            'A coluna não pinta fundo: ela mostra a mesma superfície da conversa, e a separação vem só dos fios de 1px.',
        },
        {
          subject: 'Botão de nova conversa por tema',
          detail:
            'O botão usa `--uai-web-accent` (navy profundo no claro, lilás no escuro) com rótulo em `--uai-text-inverse`, e não `--uai-bg-inverse`: nos dois temas o rótulo passa de 8:1 sobre o botão. O hover reduz a opacidade a 85%.',
        },
        {
          subject: 'Altura, rolagem e semântica',
          detail:
            'A altura padrão é 1024px; `height="100%"` acompanha a altura da aplicação, e a coluna rola quando o histórico não couber. O elemento raiz é um `<nav>`.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Casca, seções e o botão de nova conversa."
      barColor={BAR}
    />
    <UaiDocAnatomy
      zones={[
        { name: 'WebSidebar', role: 'A casca de 282px, com o fio à direita e as seções distribuídas.', token: '--uai-web-hairline' },
        { name: 'WebSidebar.Section', role: 'Padding 20 e intervalo 4. Com bordered, ganha o fio no topo — use só no rodapé.' },
        { name: 'WebSidebar.NewChat', role: 'Botão de largura total com o ícone add e o rótulo centralizado.', token: '--uai-web-accent' },
        { name: 'height', role: '1024px por padrão; use "100%" para acompanhar a aplicação.' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes, Tamanhos e Estados"
      description="A barra completa e o botão de nova conversa."
      barColor={BAR}
    />
    <UaiDocStage label="A barra completa" align="flex-start">
      <BarraCompleta />
    </UaiDocStage>
    <UaiDocStage label="Botão de nova conversa — padrão e desabilitado" direction="column" align="flex-start">
      <div style={{ width: 242 }}>
        <WebSidebar.NewChat />
      </div>
      <div style={{ width: 242 }}>
        <WebSidebar.NewChat disabled />
      </div>
    </UaiDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de composição da barra lateral do cliente web."
      barColor={BAR}
    />
    <UaiDocPractices
      dos={[
        'Usar duas seções — histórico no topo e ações na base, com bordered apenas na de baixo.',
        'Compor as linhas com SidebarRow, que já tem a régua de 48px desta barra.',
        'Passar height="100%" quando a barra viver dentro de um layout de aplicação.',
        'Manter o botão de nova conversa como primeiro item da seção superior.',
      ]}
      donts={[
        'Usar WebSidebar no lugar do Sidebar: são barras distintas, com réguas distintas.',
        'Pintar um fundo na coluna — ela é transparente e herda a superfície da conversa.',
        'Aplicar bordered às duas seções: o fio duplicaria a divisão.',
        'Trocar --uai-web-accent por --uai-bg-inverse: o botão perderia o lilás do tema escuro.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Repare no botão de nova conversa: navy profundo no claro, lilás no escuro."
      barColor={BAR}
    />
    <UaiDocThemeSwitcher direction="column">
      {() => <BarraCompleta height={520} />}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público da barra e dos seus subcomponentes."
      barColor={BAR}
    />
    <UaiDocPropsTable
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
    <UaiDocPropsTable
      title="WebSidebar.Section"
      rows={[
        {
          name: 'bordered',
          type: 'boolean',
          default: 'false',
          description: 'Desenha o fio de 1px no topo. Use apenas na seção de rodapé.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Linhas da seção.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UaiDocPropsTable
      title="WebSidebar.NewChat"
      rows={[
        {
          name: 'children',
          type: 'React.ReactNode',
          default: "'Nova conversa'",
          description: 'Rótulo do botão.',
        },
        {
          name: 'iconNode',
          type: 'React.ReactNode',
          description: 'Substitui o ícone add por um nó arbitrário.',
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
  title: 'UnooriaAI/Componentes/WebSidebar',
  component: WebSidebar,
  parameters: { layout: 'padded' },
  argTypes: {
    height: { control: 'number', description: 'Altura da coluna em pixels.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    height: 600,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof WebSidebar>;

/**
 * Documentação rica e completa do componente.
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
    <UaiDocStage theme={args.theme ?? 'light'} padding={24} align="flex-start">
      <WebSidebar height={args.height} className={args.className}>
        <WebSidebar.Section>
          <WebSidebar.NewChat />
          {uaiWebHistory.map((title) => (
            <SidebarRow key={title} icon="chatText">
              {title}
            </SidebarRow>
          ))}
        </WebSidebar.Section>
        <WebSidebar.Section bordered>
          {uaiWebFooterActions.map((action) => (
            <SidebarRow key={action.label} icon={action.icon}>
              {action.label}
            </SidebarRow>
          ))}
        </WebSidebar.Section>
      </WebSidebar>
    </UaiDocStage>
  ),
};

/**
 * A barra lateral completa, como aparece ao lado da conversa.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UaiDocStage align="flex-start" padding={0}>
      <BarraCompleta height={700} />
    </UaiDocStage>
  ),
};

/**
 * Uso flexível com os subcomponentes.
 */
export const ComposicaoModular: Story = {
  render: function BarraCompacta() {
    const [ativa, setAtiva] = React.useState<string>(uaiWebHistory[0]);
    return (
      <UaiDocStage align="flex-start" padding={0}>
        <WebSidebar height={420}>
          <WebSidebar.Section>
            <WebSidebar.NewChat />
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
          </WebSidebar.Section>
          <WebSidebar.Section bordered>
            <SidebarRow icon="signOut">{uaiWebFooterActions[4].label}</SidebarRow>
          </WebSidebar.Section>
        </WebSidebar>
      </UaiDocStage>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // A barra é um <nav>, e só a linha ativa se anuncia como página corrente.
    await expect(canvas.getByRole('navigation')).toBeInTheDocument();
    const primeira = canvas.getByRole('button', { name: uaiWebHistory[0] });
    const segunda = canvas.getByRole('button', { name: uaiWebHistory[1] });
    await expect(primeira).toHaveAttribute('aria-current', 'page');
    await expect(segunda).not.toHaveAttribute('aria-current');

    await userEvent.click(segunda);
    await expect(segunda).toHaveAttribute('aria-current', 'page');
    await expect(primeira).not.toHaveAttribute('aria-current');

    // "Nova conversa" é também o título do último item do histórico de demonstração.
    await expect(canvas.getAllByRole('button', { name: 'Nova conversa' })[0]).toBeInTheDocument();
  },
};
