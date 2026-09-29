import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Divider } from '../../../src/unooriaai/components/Divider';
import { SettingsRow } from '../../../src/unooriaai/components';
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

const BAR = '#716C98';

/** Linhas de configuração de demonstração. */
const CONFIGURACOES = [
  { label: 'Aparência', value: 'Sistema' },
  { label: 'Idioma', value: 'Detectar automaticamente' },
  { label: 'Conversas arquivadas', value: 'Gerenciar' },
  { label: 'Exportar dados', value: 'Solicitar' },
] as const;

/**
 * Página de documentação rica do componente Divider.
 */
const DividerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Estrutura"
      title="Divider"
      description="Traço de 1px preenchido com a escada translúcida --uai-fill-10: tinta roxa no tema claro, branco translúcido no escuro. É o único separador da biblioteca, usado entre linhas de configuração e entre blocos de uma mesma seção."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão Geral & Casos de Uso"
      description="Um traço translúcido que funciona sobre qualquer superfície da biblioteca."
    />
    <UaiDocGrid>
      <UaiDocCard icon="➖" title="Separação de linhas">
        O uso canônico: entre <code>SettingsRow</code> consecutivos, marcando a fronteira sem
        introduzir superfície nova.
      </UaiDocCard>
      <UaiDocCard icon="🧱" title="Blocos de seção">
        Entre grupos de uma mesma tela — por exemplo, separando as preferências gerais das de
        privacidade.
      </UaiDocCard>
      <UaiDocCard icon="↕️" title="Orientação vertical">
        A prop <code>orientation=&quot;vertical&quot;</code> gira o traço para separar controles em
        uma barra horizontal.
      </UaiDocCard>
      <UaiDocCard icon="🫥" title="Translucidez">
        Por usar opacidade em vez de cor sólida, o traço mantém a mesma leitura sobre{' '}
        <code>--uai-bg-primary</code>, <code>--uai-bg-secondary</code> e{' '}
        <code>--uai-bg-tertiary</code>.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações Técnicas"
      description="Medidas e decisões de identidade do módulo."
    />
    <UaiDocSpecs
      component="Divider"
      layout="Traço · 1px de espessura"
      specs={[
        { label: 'Espessura', value: '1px' },
        { label: 'Comprimento', value: '100% do contêiner' },
        { label: 'Preenchimento', value: '--uai-fill-10' },
        { label: 'Raio', value: 'nenhum' },
        { label: 'Elemento', value: '<hr> com aria-orientation' },
        { label: 'Orientações', value: 'horizontal · vertical' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Traço translúcido, não cor sólida',
          detail:
            '--uai-fill-10 é a tinta brandpurple a 30% no tema claro e o branco a 30% no escuro (tokens de opacidade da Unooria). É um separador decorativo, isento de contraste, e continua visível sobre as três camadas de superfície nos dois temas.',
        },
        {
          subject: 'Largura acompanha o contêiner',
          detail:
            'o traço ocupa 100% da largura disponível, sem medida fixa, como nas listas de configuração.',
        },
        {
          subject: 'Orientação vertical',
          detail:
            'usada para separar controles em barras horizontais de altura definida, com o mesmo preenchimento do traço horizontal.',
        },
        {
          subject: 'Sem margem própria',
          detail:
            'o espaçamento ao redor fica com o contêiner, na escala --uai-spacing-*, para que o mesmo traço sirva a listas densas e a blocos de seção.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do Componente"
      description="Um único traço, sem conteúdo."
    />
    <UaiDocAnatomy
      zones={[
        {
          name: 'Traço horizontal',
          role: 'width: 100% e height: 1px. Nunca encolhe (flex-shrink: 0).',
        },
        {
          name: 'Traço vertical',
          role: 'width: 1px com align-self: stretch, acompanhando a altura da linha de controles.',
        },
        {
          name: 'Semântica',
          role: 'Renderizado como <hr> — separador temático nativo — com aria-orientation explícito.',
        },
        {
          name: 'Margens',
          role: 'O componente não aplica margem: o espaçamento fica com o contêiner.',
          token: '--uai-spacing-*',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de Orientações e Superfícies"
      description="O traço sobre as três superfícies semânticas e nas duas orientações."
    />
    <UaiDocStage
      label="Horizontal — em uma lista de configurações"
      direction="column"
      align="flex-start"
    >
      <div style={{ width: 400 }}>
        {CONFIGURACOES.map((row, index) => (
          <React.Fragment key={row.label}>
            <SettingsRow label={row.label} value={row.value} block />
            {index < CONFIGURACOES.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </UaiDocStage>
    <UaiDocStage label="Vertical — separando controles em uma barra">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          height: 32,
          fontSize: 13,
          color: 'var(--uai-text-secondary)',
        }}
      >
        <span>Compartilhar</span>
        <Divider orientation="vertical" />
        <span>Renomear</span>
        <Divider orientation="vertical" />
        <span>Arquivar</span>
      </div>
    </UaiDocStage>
    <UaiDocStage label="Sobre as três superfícies semânticas" direction="column" align="flex-start">
      {(['--uai-bg-primary', '--uai-bg-secondary', '--uai-bg-tertiary'] as const).map((surface) => (
        <div
          key={surface}
          style={{
            width: '100%',
            padding: 20,
            background: `var(${surface})`,
            borderRadius: 8,
            border: '1px solid var(--uai-border-default)',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ fontSize: 11, color: 'var(--uai-text-secondary)', marginBottom: 12 }}>
            {surface}
          </div>
          <Divider />
        </div>
      ))}
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Boas Práticas"
      description="Regras de separação."
    />
    <UaiDocPractices
      dos={[
        'Deixar o espaçamento ao redor do traço com o contêiner, usando a escala de espaçamento.',
        'Preferir o Divider a uma borda no item de lista, o que evita traço duplicado entre linhas vizinhas.',
        'Usar a orientação vertical apenas em barras de altura definida.',
        'Manter o preenchimento translúcido para que o traço funcione nas três superfícies.',
      ]}
      donts={[
        'Empilhar dois Divider consecutivos.',
        'Colocar traço antes do primeiro e depois do último item de uma lista.',
        'Trocar o preenchimento por uma cor sólida de alto contraste: o traço fica pesado demais, sobretudo no tema escuro.',
        'Aumentar a espessura para dar destaque — para hierarquia use um cabeçalho de seção.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a Temas"
      description="A tinta do traço troca de roxo para branco no tema escuro, mantendo a mesma leitura relativa."
    />
    <UaiDocThemeSwitcher direction="column">
      {() => (
        <div style={{ width: '100%' }}>
          {CONFIGURACOES.slice(0, 3).map((row, index) => (
            <React.Fragment key={row.label}>
              <SettingsRow label={row.label} value={row.value} block />
              {index < 2 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Divider."
    />
    <UaiDocPropsTable
      title="Divider"
      rows={[
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'Orientação do traço. A vertical exige um contêiner de altura definida.',
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
  title: 'UnooriaAI/Componentes/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientação do traço.',
    },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: { orientation: 'horizontal', theme: 'light', className: '' },
};

export default meta;

type Story = StoryObj<typeof Divider>;

/**
 * Documentação rica e completa do componente.
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
      data-uai-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 420,
        height: 120,
        padding: 24,
        borderRadius: 12,
        backgroundColor: 'var(--uai-bg-primary)',
        border: '1px solid var(--uai-border-default)',
        boxSizing: 'border-box',
      }}
    >
      <Divider {...args} />
    </div>
  ),
};

/**
 * O traço horizontal em um contêiner de 320px.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UaiDocStage width={368} align="stretch">
      <Divider />
    </UaiDocStage>
  ),
};

/**
 * Lista de configurações separada por traços.
 */
export const EmLista: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      {CONFIGURACOES.map((row, index) => (
        <React.Fragment key={row.label}>
          <SettingsRow label={row.label} value={row.value} block />
          {index < CONFIGURACOES.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  ),
};
