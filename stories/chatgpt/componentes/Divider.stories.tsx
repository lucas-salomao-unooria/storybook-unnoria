import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../../../src/chatgpt/components/Divider';
import { SettingsRow } from '../../../src/chatgpt/components';
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
import { gptFigmaNodes, gptSettings } from '../fixtures';

/**
 * Página de documentação rica do componente Divider.
 */
const DividerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Componentes • Estrutura"
      title="Divider"
      description="Réplica do componente Divider da página 🟡 Design system: traço de 1px preenchido com a escada translúcida de 10% — o mesmo valor de Overlay/Black 10% no modo Light. É o único separador da biblioteca, usado entre linhas de configuração e entre blocos de uma mesma seção."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Um traço translúcido que funciona sobre qualquer superfície da biblioteca."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="➖" title="Separação de linhas">
        O uso canônico: entre <code>SettingsRow</code> consecutivos, marcando a fronteira sem
        introduzir superfície nova.
      </GptDocCard>
      <GptDocCard icon="🧱" title="Blocos de seção">
        Entre grupos de uma mesma tela — por exemplo, separando as preferências gerais das de
        privacidade.
      </GptDocCard>
      <GptDocCard icon="↕️" title="Orientação vertical">
        A prop <code>orientation="vertical"</code> gira o traço para separar controles em uma barra
        horizontal. Não existe como variante no Figma; é extensão registrada.
      </GptDocCard>
      <GptDocCard icon="🫥" title="Translucidez">
        Por usar opacidade em vez de cor sólida, o traço mantém a mesma leitura sobre{' '}
        <code>bg/primary</code>, <code>bg/secondary</code> e <code>bg/tertiary</code>.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do componente via Plugin API."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.divider}
      frameName="Divider (componente único)"
      specs={[
        { label: 'Dimensões', value: '320 × 1px' },
        { label: 'Preenchimento', value: 'preto a 10% · --gpt-fill-10' },
        { label: 'Raio', value: 'nenhum' },
        { label: 'Contorno', value: 'nenhum' },
        { label: 'Elemento', value: '<hr> com aria-orientation' },
        { label: 'Variantes', value: 'nenhuma no arquivo' },
      ]}
      deviations={[
        'A largura de 320px do arquivo não é fixada no CSS: o traço ocupa 100% do contêiner, como acontece nas listas de configuração das telas do produto.',
        'A orientação vertical não existe no arquivo — foi adicionada como extensão para separar controles em barras horizontais, mantendo o mesmo preenchimento de 10%.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Um único traço, sem conteúdo."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="➖" title="Traço horizontal">
        <code>width: 100%</code> e <code>height: 1px</code>. Nunca encolhe
        (<code>flex-shrink: 0</code>).
      </GptDocCard>
      <GptDocCard icon="↕️" title="Traço vertical">
        <code>width: 1px</code> com <code>align-self: stretch</code>, acompanhando a altura da
        linha de controles.
      </GptDocCard>
      <GptDocCard icon="♿" title="Semântica">
        Renderizado como <code>&lt;hr&gt;</code> — separador temático nativo — com{' '}
        <code>aria-orientation</code> explícito.
      </GptDocCard>
      <GptDocCard icon="📐" title="Margens">
        O componente não aplica margem: o espaçamento fica com o contêiner, usando a escala{' '}
        <code>--gpt-spacing-*</code>.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Orientações e Superfícies"
      description="O traço sobre as três superfícies semânticas e nas duas orientações."
      barColor="#5856D6"
    />
    <GptDocStage label="Horizontal — em uma lista de configurações" direction="column" align="flex-start">
      <div style={{ width: 400 }}>
        {gptSettings.slice(0, 4).map((row, index) => (
          <React.Fragment key={row.label}>
            <SettingsRow label={row.label} value={row.value} block />
            {index < 3 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </GptDocStage>
    <GptDocStage label="Vertical — separando controles em uma barra">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          height: 32,
          fontSize: 13,
          color: '#475157',
        }}
      >
        <span>Compartilhar</span>
        <Divider orientation="vertical" />
        <span>Renomear</span>
        <Divider orientation="vertical" />
        <span>Arquivar</span>
      </div>
    </GptDocStage>
    <GptDocStage label="Sobre as três superfícies semânticas" direction="column" align="flex-start">
      {(['--gpt-bg-primary', '--gpt-bg-secondary', '--gpt-bg-tertiary'] as const).map((surface) => (
        <div
          key={surface}
          style={{
            width: '100%',
            padding: 20,
            background: `var(${surface})`,
            borderRadius: 8,
            border: '1px solid #E4E8E9',
          }}
        >
          <div style={{ fontSize: 11, color: '#475157', marginBottom: 12 }}>{surface}</div>
          <Divider />
        </div>
      ))}
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de separação."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Deixar o espaçamento ao redor do traço com o contêiner, usando a escala de espaçamento.',
        'Preferir o Divider a uma borda no item de lista, o que evita traço duplicado entre linhas vizinhas.',
        'Usar a orientação vertical apenas em barras de altura definida.',
        'Manter o preenchimento translúcido para que o traço funcione nas três superfícies.',
      ]}
      donts={[
        'Empilhar dois Divider consecutivos.',
        'Colocar traço antes do primeiro e depois do último item de uma lista.',
        'Trocar o preenchimento por uma cor sólida como border/default: o traço fica pesado demais no Dark.',
        'Aumentar a espessura para dar destaque — para hierarquia use um cabeçalho de seção.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A escada translúcida se espelha em branco no Dark, mantendo o mesmo contraste relativo."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher direction="column">
      {() => (
        <div style={{ width: '100%' }}>
          <SettingsRow label="Theme" value="System" block />
          <Divider />
          <SettingsRow label="Language" value="Auto-detect" block />
          <Divider />
          <SettingsRow label="Archived chats" value="Manage" block />
        </div>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Divider."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="Divider"
      rows={[
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description:
            'Orientação do traço. A vertical é extensão registrada — não existe no arquivo de design.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Divider> = {
  title: 'ChatGPT/Componentes/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientação do traço.',
    },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: { orientation: 'horizontal', theme: 'light' },
};

export default meta;

type Story = StoryObj<typeof Divider>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <DividerDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Divider expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Divider',
  render: (args) => (
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 420,
        height: 120,
        padding: 24,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <Divider {...args} />
    </div>
  ),
};

/**
 * Réplica visual do componente publicado no Figma — 320 × 1px.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 320, padding: 16, border: '1px solid #E4E8E9', borderRadius: 5 }}>
      <Divider />
    </div>
  ),
};

/**
 * Lista de configurações separada por traços.
 */
export const EmLista: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      {gptSettings.map((row, index) => (
        <React.Fragment key={row.label}>
          <SettingsRow label={row.label} value={row.value} block />
          {index < gptSettings.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  ),
};
