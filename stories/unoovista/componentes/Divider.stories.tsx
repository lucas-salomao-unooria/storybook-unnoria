import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Divider } from '../../../src/unoovista/components/Divider';
import { Avatar } from '../../../src/unoovista/components/Avatar';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import { unvAvatars } from '../fixtures';

const BAR = '#716C98';
const CAPTION: React.CSSProperties = { fontSize: 12, color: '#475157', marginBottom: 10 };

const portraits = Object.values(unvAvatars) as string[];

const PEOPLE = [
  { name: 'Marina Duarte', note: 'curtiu a sua publicação' },
  { name: 'Caetano Braga', note: 'começou a seguir você' },
  { name: 'Iara Nogueira', note: 'comentou: "Que registro lindo!"' },
];

/**
 * Lista de atividades separada por divisores com recuo alinhado ao texto.
 */
const ActivityList = () => (
  <div
    style={{
      width: '100%',
      maxWidth: 380,
      background: 'var(--unv-color-background-primary)',
      borderRadius: 16,
      padding: '4px 16px',
      boxSizing: 'border-box',
      fontFamily: 'var(--unv-font-sans)',
      color: 'var(--unv-color-text-primary)',
    }}
  >
    {PEOPLE.map((person, index) => (
      <React.Fragment key={person.name}>
        {index > 0 && <Divider inset={48} />}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0' }}>
          <Avatar src={portraits[index]} alt="" size="md" />
          <div style={{ fontSize: 14, lineHeight: '20px' }}>
            <strong>{person.name}</strong>{' '}
            <span style={{ color: 'var(--unv-color-text-secondary)' }}>{person.note}</span>
          </div>
        </div>
      </React.Fragment>
    ))}
  </div>
);

/**
 * Página de documentação rica do componente Divider.
 */
const DividerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Estrutura"
      title="Divider"
      description="Fio de 1px com pontas arredondadas, em tom suave. O Unoovista separa antes por camadas (superfícies diferentes) e por espaço; o divisor é o recurso seguinte, para quando a mudança de superfície não basta — entre linhas de uma lista, entre blocos de uma folha."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Quando um fio ajuda e quando é melhor deixá-lo de fora."
    />
    <UnvDocGrid>
      <UnvDocCard icon="📃" title="Entre linhas de lista">
        Separa atividades, conversas e itens de menu dentro de um mesmo cartão. O recuo (
        <code>inset</code>) alinha o fio ao início do texto, sem cortar o avatar.
      </UnvDocCard>
      <UnvDocCard icon="🧱" title="Entre blocos de uma folha">
        Divide as seções de uma folha inferior ou de um menu, quando o espaço sozinho deixaria a
        hierarquia ambígua.
      </UnvDocCard>
      <UnvDocCard icon="↕️" title="Vertical">
        Separa controles em barras horizontais; ocupa a altura do contêiner, então o contêiner define o
        comprimento.
      </UnvDocCard>
      <UnvDocCard icon="🫧" title="Camadas primeiro">
        Cartões em <code>background-primary</code> sobre a tela em <code>background-secondary</code> já
        se separam sem fio. Reserve o divisor para dentro do cartão.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="Divider"
      layout="Fio · 1px"
      specs={[
        { label: 'Espessura', value: '1px (horizontal e vertical)' },
        { label: 'hairline (padrão)', value: '--unv-color-border-subtle' },
        { label: 'solid', value: '--unv-color-border-default' },
        { label: 'Pontas', value: '--unv-radius-full' },
        { label: 'Recuo', value: 'inset · pixels, do lado do início' },
        { label: 'Semântica', value: 'role="separator" + aria-orientation' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Fio de 1px, sem hairline de 0,33px',
          detail:
            'o fio fino de meio pixel não sobrevive a telas de densidade baixa nem a zoom. A variante hairline mantém o nome, mas é um fio de 1px no tom suave.',
        },
        {
          subject: 'Dois tons, sem terceira espessura',
          detail:
            'hairline usa --unv-color-border-subtle; solid usa --unv-color-border-default, o contorno mais marcado. A hierarquia se faz pelo tom, não pela espessura.',
        },
        {
          subject: 'Não é contorno de controle',
          detail:
            'o divisor é decorativo e não precisa de 3:1 sobre a superfície; contornos de campo e de seleção usam --unv-color-border-control.',
        },
        {
          subject: 'Pontas arredondadas',
          detail:
            'as extremidades seguem --unv-radius-full, coerentes com a linguagem em cápsula do módulo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UnvDocAnatomy
      zones={[
        {
          name: 'Fio',
          role: 'Elemento de 1px com cor de fundo do tom escolhido.',
          token: '--unv-color-border-subtle · --unv-color-border-default',
        },
        {
          name: 'Recuo',
          role: 'Margem do lado do início (esquerda no horizontal, topo no vertical), com o comprimento reduzido na mesma medida.',
        },
        {
          name: 'Semântica',
          role: 'role="separator" com aria-orientation, para que leitores de tela anunciem a divisão.',
        },
      ]}
    />
    <UnvDocStage label="Divisor com recuo em uma lista de atividades" surface="secondary">
      <ActivityList />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os dois tons e as duas orientações, renderizados pelo componente real."
    />
    <UnvDocStage label="Tons (horizontal)" direction="column" align="stretch" width={420}>
      <div>
        <div style={CAPTION}>hairline · border-subtle</div>
        <Divider />
      </div>
      <div>
        <div style={CAPTION}>solid · border-default</div>
        <Divider weight="solid" />
      </div>
      <div>
        <div style={CAPTION}>hairline com inset={48}</div>
        <Divider inset={48} />
      </div>
    </UnvDocStage>
    <UnvDocStage label="Vertical" gap={20}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, height: 48 }}>
        <span style={{ fontSize: 14, color: 'var(--unv-color-text-primary)' }}>Publicações</span>
        <Divider orientation="vertical" />
        <span style={{ fontSize: 14, color: 'var(--unv-color-text-primary)' }}>Seguidores</span>
        <Divider orientation="vertical" weight="solid" />
        <span style={{ fontSize: 14, color: 'var(--unv-color-text-primary)' }}>Seguindo</span>
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Separar por camada e por espaço antes de recorrer a um fio.',
        'Usar inset para alinhar o divisor ao texto, sem passar por baixo do avatar.',
        'Reservar solid para divisões de maior peso, como entre seções de uma folha.',
        'Deixar o contêiner definir a altura do divisor vertical.',
      ]}
      donts={[
        'Colocar um divisor entre cada linha de um feed de cartões: os cartões já são camadas.',
        'Usar o divisor como contorno de campo ou de seleção (isso é border-control).',
        'Empilhar dois divisores seguidos.',
        'Trocar a cor por um hexadecimal avulso.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O tom suave acompanha a superfície: lavanda clara no tema claro e roxo intermediário no escuro."
    />
    <UnvDocThemeSwitcher>
      {() => (
        <div style={{ width: '100%', maxWidth: 380, display: 'grid', gap: 18 }}>
          <Divider />
          <Divider weight="solid" />
          <Divider inset={48} />
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UnvDocPropsTable
      title="Divider"
      rows={[
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'Orientação do divisor.',
        },
        {
          name: 'weight',
          type: "'hairline' | 'solid'",
          default: "'hairline'",
          description: 'Tom do fio de 1px: border-subtle (hairline) ou border-default (solid).',
        },
        {
          name: 'inset',
          type: 'number',
          default: '0',
          description: 'Recuo em pixels do lado do início; o comprimento se reduz na mesma medida.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Força o tema. Sem valor, herda o de data-unv-theme do contêiner.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Divider> = {
  title: 'Unoovista/Componentes/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientação do divisor.',
    },
    weight: {
      control: 'radio',
      options: ['hairline', 'solid'],
      description: 'Tom do fio de 1px.',
    },
    inset: {
      control: { type: 'range', min: 0, max: 96, step: 4 },
      description: 'Recuo lateral em pixels.',
    },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    orientation: 'horizontal',
    weight: 'hairline',
    inset: 0,
    theme: 'light',
  },
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
    <UnvDocStage theme={args.theme ?? 'light'} padding={48} align="stretch" direction="column">
      <div
        style={{
          width: 360,
          height: args.orientation === 'vertical' ? 96 : undefined,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Divider {...args} />
      </div>
    </UnvDocStage>
  ),
};

/**
 * Uso canônico: divisor com recuo numa lista de atividades.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UnvDocStage surface="secondary">
      <ActivityList />
    </UnvDocStage>
  ),
};

/**
 * Tons e orientações lado a lado.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UnvDocStage direction="column" align="stretch" width={420}>
      <Divider />
      <Divider weight="solid" />
      <Divider inset={48} />
      <div style={{ display: 'flex', gap: 20, height: 40, alignItems: 'center' }}>
        <Divider orientation="vertical" />
        <Divider orientation="vertical" weight="solid" />
      </div>
    </UnvDocStage>
  ),
};
