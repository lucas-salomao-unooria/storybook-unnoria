import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PlanTag } from '../../../src/unooriaai/components/PlanTag';
import { Logo } from '../../../src/unooriaai/components/Logo';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocAnatomy,
  UaiDocCard,
  UaiDocDecisions,
  UaiDocGrid,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocSpecs,
  UaiDocStage,
  UaiDocThemeSwitcher,
  UaiDocTokenSwatch,
} from '../../../.storybook/components';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente PlanTag.
 */
const PlanTagDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Indicadores"
      title="PlanTag"
      description="Cápsula que acompanha o logotipo e anuncia o plano da conta: padding 2/4, raio 4 e rótulo Open Sans Regular de 12/18 em brandpurple-950 sobre brandpurple-400. É o único alvo da tela de nova conversa que não muda entre os temas."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão Geral & Casos de Uso"
      description="Um indicador de plano, não um selo de estado."
    />
    <UaiDocGrid>
      <UaiDocCard icon="✨" title="Plano da conta">
        O uso canônico: a cápsula <code>Pro</code> à direita do logotipo, anunciando a assinatura
        ativa.
      </UaiDocCard>
      <UaiDocCard icon="🎨" title="Tokens próprios da cápsula">
        A superfície vem do token <code>--uai-color-plan-tag-fill</code> e o rótulo de{' '}
        <code>--uai-color-plan-tag-text</code>, definidos em cada tema: roxo médio com rótulo branco
        no claro, roxo claro com rótulo escuro no escuro.
      </UaiDocCard>
      <UaiDocCard icon="🏷️" title="Não é o Badge">
        O <code>Badge</code> tem cinco variantes semânticas e superfície translúcida. Este é um
        alvo só, sólido, com medidas próprias.
      </UaiDocCard>
      <UaiDocCard icon="📐" title="Medidas próprias">
        Padding 2/4 e raio 4 — mais apertada que qualquer degrau do <code>Badge</code>, cujo padding
        é 2/8.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas e tokens do componente, com o contraste medido nos dois temas."
    />
    <UaiDocSpecs
      component="PlanTag"
      layout="Cápsula · altura 22"
      specs={[
        { label: 'Altura', value: '22px · linha 18 + padding 2/2' },
        { label: 'Padding', value: '2/4 · --uai-spacing-1 e -2' },
        { label: 'Raio', value: '4px · --uai-radius-sm' },
        { label: 'Tipografia', value: 'Open Sans Regular · 12/18 (Body/XS)' },
        { label: 'Superfície', value: '#716C98 claro · #AAA5C2 escuro · --uai-color-plan-tag-fill' },
        { label: 'Rótulo', value: '#FFFFFF claro · #080922 escuro · --uai-color-plan-tag-text' },
        { label: 'Contraste rótulo/superfície', value: '5,0:1 no claro · 8,3:1 no escuro' },
        { label: 'Origem na Unooria', value: 'brandpurple-600 e neutral-50 · brandpurple-400 e brandpurple-950' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Superfície e rótulo por tema',
          detail:
            'Os tokens --uai-color-plan-tag-fill e --uai-color-plan-tag-text são declarados em cada [data-uai-theme]: brandpurple-600 com rótulo neutral-50 no claro, brandpurple-400 com rótulo brandpurple-950 no escuro. Não passam por alias semântico, para que a cápsula mantenha a identidade roxa de plano em vez de seguir a hierarquia de superfícies.',
        },
        {
          subject: 'Contraste medido',
          detail:
            'O rótulo sobre a superfície mede 5,0:1 no claro e 8,3:1 no escuro (mínimo de 4,5:1 para texto). O limite da cápsula sobre a tela e sobre a barra passa de 3:1 nos dois temas (par medido em uaiContrastPairs). Sem ressalva de contraste aberta.',
        },
        {
          subject: 'Rótulo livre',
          detail:
            'O texto padrão é Pro; a prop children aceita qualquer texto, para que o produto anuncie outros planos.',
        },
        {
          subject: 'Sem slot de ícone',
          detail: 'A cápsula mostra só texto: nenhum slot de ícone foi modelado.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do Componente"
      description="Uma cápsula, um rótulo."
    />
    <UaiDocAnatomy
      zones={[
        {
          name: 'children',
          role: 'O nome do plano, em Body/XS, sem quebra de linha.',
          token: '--uai-color-plan-tag-text',
        },
        {
          name: 'Superfície',
          role: 'Cor fixa, igual nos dois temas.',
          token: '--uai-color-plan-tag-fill',
        },
        {
          name: 'Altura derivada',
          role: '18px de linha mais 2px de padding em cima e embaixo: 22px de altura, derivados da escala tipográfica.',
        },
        { name: 'span', role: 'Elemento não interativo: a cápsula informa, não aciona.' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de Variantes e Composição"
      description="O rótulo padrão, variações de comprimento e a composição com o logotipo."
    />
    <UaiDocStage label="Rótulo padrão e alternativas">
      <PlanTag>Pro</PlanTag>
      <PlanTag>Equipe</PlanTag>
      <PlanTag>Escola</PlanTag>
      <PlanTag>Empresas</PlanTag>
    </UaiDocStage>
    <UaiDocStage label="Composição do cabeçalho — logotipo mais cápsula">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Logo variant="horizontal" height={64} />
        <PlanTag>Pro</PlanTag>
      </div>
    </UaiDocStage>
    <UaiDocGrid min={220} marginBottom={16}>
      <UaiDocStage theme="light" label="Tema claro" padding={32}>
        <PlanTag>Pro</PlanTag>
      </UaiDocStage>
      <UaiDocStage theme="dark" label="Tema escuro" padding={32}>
        <PlanTag>Pro</PlanTag>
      </UaiDocStage>
    </UaiDocGrid>
    <UaiDocGrid min={220}>
      <UaiDocTokenSwatch
        cssVar="--uai-color-plan-tag-fill"
        light="#716C98"
        dark="#AAA5C2"
        name="Superfície da cápsula"
        unooria={['--unooria-color-brandpurple-600', '--unooria-color-brandpurple-400']}
      />
      <UaiDocTokenSwatch
        cssVar="--uai-color-plan-tag-text"
        light="#FFFFFF"
        dark="#080922"
        name="Rótulo da cápsula"
        unooria={['--unooria-color-neutral-50', '--unooria-color-brandpurple-950']}
      />
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Boas Práticas"
      description="Regras de uso do indicador de plano."
    />
    <UaiDocPractices
      dos={[
        'Manter o rótulo curto — a cápsula não quebra linha.',
        'Usar a cápsula ao lado do logotipo, no cabeçalho da tela.',
        'Usar os tokens da própria cápsula: eles garantem o contraste do rótulo e do limite nos dois temas.',
        'Reservar a cápsula ao plano da conta, não a estados de conteúdo.',
      ]}
      donts={[
        'Trocar a superfície por um alias semântico — a cápsula perderia o contraste medido do limite e do rótulo.',
        'Usar PlanTag como selo de estado: para isso existe o Badge, com suas cinco variantes.',
        'Empilhar várias cápsulas de plano na mesma tela.',
        'Aumentar o padding para o degrau do Badge (2/8): a cápsula perde a forma.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a Temas"
      description="A cápsula é o único alvo da tela que não muda entre claro e escuro; o logotipo ao lado acompanha o tema."
    />
    <UaiDocThemeSwitcher>
      {() => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Logo variant="mark" height={32} />
          <PlanTag>Pro</PlanTag>
        </div>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente PlanTag."
    />
    <UaiDocPropsTable
      title="PlanTag"
      rows={[
        {
          name: 'children',
          type: 'React.ReactNode',
          default: "'Pro'",
          description: 'Nome do plano.',
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

const meta: Meta<typeof PlanTag> = {
  title: 'UnooriaAI/Componentes/PlanTag',
  component: PlanTag,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Nome do plano.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    children: 'Pro',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof PlanTag>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PlanTagDocumentationPage />,
};

/**
 * Playground com todas as propriedades do PlanTag expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PlanTag',
  render: (args) => (
    <UaiDocStage theme={args.theme ?? 'light'} padding={48}>
      <PlanTag {...args} />
    </UaiDocStage>
  ),
};

/**
 * O cabeçalho da tela de nova conversa: logotipo mais cápsula.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UaiDocStage padding={24}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Logo variant="horizontal" height={64} />
        <PlanTag>Pro</PlanTag>
      </div>
    </UaiDocStage>
  ),
};
