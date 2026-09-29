import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tag } from '../../../src/unooriaai/components/Tag';
import { Icon } from '../../../src/unooriaai/components/Icon';
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

/** Sugestões de prompt de demonstração. */
const SUGESTOES = ['Gerar ideias', 'Criar uma imagem', 'Pesquisar na web', 'Resumir um texto'];

/** Ícone de 16px dentro da cápsula: o glifo Material ocupa cerca de 83% da caixa. */
const brilho = <Icon name="sparkle" size={16} />;

/**
 * Página de documentação rica do componente Tag.
 */
const TagDocumentationPage = () => {
  const [selecionada, setSelecionada] = React.useState<string>(SUGESTOES[0]);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="UnooriaAI"
        category="Componentes • Seleção"
        title="Tag"
        description="Cápsula selecionável de 36px com padding 8/16, gap 6, raio 20 e rótulo de 14px, em dois estados: padrão (superfície translúcida) e selecionado (superfície invertida, exposta por aria-pressed). É a sugestão de prompt da tela de nova conversa."
      />

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="1. Visão Geral & Casos de Uso"
        description="Um controle de seleção com dois estados."
      />
      <UaiDocGrid>
        <UaiDocCard icon="✨" title="Sugestão de prompt">
          O uso canônico: cápsulas com o ícone <code>sparkle</code> oferecendo pontos de partida na
          tela vazia — <em>Gerar ideias</em>, <em>Criar uma imagem</em>, <em>Pesquisar na web</em>.
        </UaiDocCard>
        <UaiDocCard icon="⚫" title="Estado selecionado">
          Superfície <code>--uai-bg-inverse</code> com rótulo e ícone invertidos. O contraste máximo
          sinaliza que a sugestão passou a filtrar a conversa.
        </UaiDocCard>
        <UaiDocCard icon="🔘" title="Semântica de botão">
          Renderizado como <code>button</code> com <code>aria-pressed</code>, que é a semântica
          correta para um alternador de seleção.
        </UaiDocCard>
        <UaiDocCard icon="🔤" title="Ícone opcional">
          A prop <code>glyph</code> aceita qualquer nó. Sem ela, a cápsula fica só com o rótulo,
          útil em filtros textuais.
        </UaiDocCard>
      </UaiDocGrid>

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="2. Especificações Técnicas"
        description="Medidas e decisões de identidade do módulo."
      />
      <UaiDocSpecs
        component="Tag"
        layout="Cápsula · 36px de altura"
        specs={[
          { label: 'Padding', value: '8/16 · --uai-spacing-4 e -6' },
          { label: 'Gap', value: '6px · --uai-spacing-3' },
          { label: 'Raio', value: '20px · --uai-radius-2xl' },
          { label: 'Altura', value: '36px (derivada)' },
          { label: 'Tipografia', value: 'Open Sans regular · 14/20 (Body/SM)' },
          { label: 'Padrão', value: '--uai-fill-4 · hover --uai-fill-10' },
        ]}
      />
      <UaiDocDecisions
        items={[
          {
            subject: 'Ícone da biblioteca da Unooria',
            detail:
              'o glifo de sugestão é o Icon sparkle (Material Symbols Rounded), de 16px, no lugar do caractere tipográfico usado antes. A prop glyph continua aceitando qualquer ReactNode.',
          },
          {
            subject: 'Estado selecionado em bg-inverse',
            detail:
              'a superfície invertida é brandpurple-900 no claro e brandpurple-50 no escuro, com o rótulo em --uai-text-inverse: o par passa de 4,5:1 nos dois temas.',
          },
          {
            subject: 'Altura de 36px',
            detail:
              'o rótulo usa a altura de linha de 20px do degrau Body/SM da Unooria, somada ao padding vertical de 8px; a cápsula mede 36px.',
          },
          {
            subject: 'Hover e foco acrescentados',
            detail:
              'o hover da cápsula padrão sobe para --uai-fill-10, degrau vizinho da mesma escada, e o selecionado permanece igual (já está no contraste máximo). O foco é um anel de 2px em --uai-border-brand.',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="3. Anatomia do Componente"
        description="Ícone e rótulo em uma cápsula de altura derivada."
      />
      <UaiDocAnatomy
        zones={[
          {
            name: 'glyph',
            role: 'Slot antes do rótulo, marcado aria-hidden. Herda a cor do estado. Use o Icon com 16px.',
          },
          {
            name: 'Rótulo',
            role: 'children em Body/SM, sem quebra de linha.',
            token: '--uai-font-body-sm-*',
          },
          {
            name: 'selected',
            role: 'Alterna entre os dois estados e reflete o valor em aria-pressed.',
          },
          {
            name: 'Foco',
            role: 'Anel de 2px, visível na navegação por teclado.',
            token: '--uai-border-brand',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="4. Matriz de Estados"
        description="Os dois estados e uma trilha de seleção interativa."
      />
      <UaiDocStage label="Padrão e selecionado">
        <Tag glyph={brilho}>Gerar ideias</Tag>
        <Tag glyph={brilho} selected>
          Gerar ideias
        </Tag>
        <Tag>Sem ícone</Tag>
        <Tag selected>Sem ícone selecionada</Tag>
        <Tag glyph={brilho} disabled>
          Desabilitada
        </Tag>
      </UaiDocStage>
      <UaiDocStage label="Seleção única interativa — clique para alternar">
        {SUGESTOES.map((label) => (
          <Tag
            key={label}
            glyph={brilho}
            selected={selecionada === label}
            onClick={() => setSelecionada(label)}
          >
            {label}
          </Tag>
        ))}
      </UaiDocStage>

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="5. Boas Práticas"
        description="Regras de seleção."
      />
      <UaiDocPractices
        dos={[
          'Manter os rótulos curtos — a cápsula não quebra linha.',
          'Usar aria-pressed (já aplicado pelo componente) para que leitores de tela anunciem o estado.',
          'Agrupar as cápsulas em um contêiner com wrap, como faz a tela de nova conversa.',
          'Reservar o estado selecionado a uma cápsula por grupo quando a seleção for única.',
        ]}
        donts={[
          'Usar Tag como indicador de estado passivo — para isso existe o Badge.',
          'Marcar várias cápsulas como selecionadas em um grupo de seleção única.',
          'Colocar mais de um ícone por cápsula.',
          'Trocar o raio de 20px por um valor menor: a cápsula perde a forma da biblioteca.',
        ]}
      />

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="6. Suporte a Temas"
        description="A cápsula padrão acompanha a escada translúcida; a selecionada troca junto com bg-inverse."
      />
      <UaiDocThemeSwitcher>
        {() => (
          <>
            <Tag glyph={brilho}>Gerar ideias</Tag>
            <Tag glyph={brilho} selected>
              Gerar ideias
            </Tag>
            <Tag>Pesquisar</Tag>
          </>
        )}
      </UaiDocThemeSwitcher>

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente Tag."
      />
      <UaiDocPropsTable
        title="Tag"
        rows={[
          {
            name: 'selected',
            type: 'boolean',
            default: 'false',
            description: 'Estado de seleção — true aplica a superfície invertida e aria-pressed.',
          },
          {
            name: 'glyph',
            type: 'React.ReactNode',
            description: 'Ícone antes do rótulo, tipicamente <Icon name="sparkle" size={16} />.',
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
          { name: 'children', type: 'React.ReactNode', description: 'Rótulo da cápsula.' },
          { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Tag> = {
  title: 'UnooriaAI/Componentes/Tag',
  component: Tag,
  parameters: { layout: 'padded' },
  argTypes: {
    selected: { control: 'boolean', description: 'Estado de seleção.' },
    glyph: {
      control: 'boolean',
      description: 'Exibe o ícone sparkle antes do rótulo.',
    },
    disabled: { control: 'boolean', description: 'Desabilita a interação.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Rótulo da cápsula.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    selected: false,
    glyph: true,
    disabled: false,
    theme: 'light',
    children: 'Gerar ideias',
    className: '',
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TagDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Tag expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Tag',
  render: ({ glyph, ...args }) => (
    <div
      data-uai-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: 'var(--uai-bg-primary)',
        border: '1px solid var(--uai-border-default)',
      }}
    >
      <Tag {...args} glyph={glyph ? brilho : undefined} />
    </div>
  ),
};

/**
 * Os dois estados da cápsula.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UaiDocStage gap={12}>
      <Tag glyph={brilho}>Gerar ideias</Tag>
      <Tag glyph={brilho} selected>
        Gerar ideias
      </Tag>
    </UaiDocStage>
  ),
};

/**
 * Grupo de seleção única, como aparece na tela de nova conversa.
 */
export const Estados: Story = {
  render: function GrupoDeSelecao() {
    const [ativa, setAtiva] = React.useState<string>(SUGESTOES[1]);
    return (
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', maxWidth: 620 }}>
        {SUGESTOES.map((label) => (
          <Tag
            key={label}
            glyph={brilho}
            selected={ativa === label}
            onClick={() => setAtiva(label)}
          >
            {label}
          </Tag>
        ))}
      </div>
    );
  },
};
