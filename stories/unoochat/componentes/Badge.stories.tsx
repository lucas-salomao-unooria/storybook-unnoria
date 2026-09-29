import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocAnatomy,
  UncDocPractices,
  UncDocPropsTable,
  UncDocStage,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import { Badge } from '../../../src/unoochat';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente Badge.
 */
const BadgeDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Sinalização"
      title="Badge"
      description="Selo circular de 19px com o número de mensagens não lidas, pintado com o acento do módulo (--unc-color-accent) e numeral em --unc-color-text-on-accent. Duas variantes — tab, na barra de abas, e row, nas linhas de conversa — que diferem apenas no tamanho do numeral."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🔢" title="Duas variantes">
        <code>tab</code> é o selo da barra de abas, com numeral de 16px; <code>row</code> é o selo
        das linhas de conversa, com numeral de 10px. As duas usam a mesma cor de acento.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Numeral por contraste">
        O numeral usa <code>--unc-color-text-on-accent</code>: branco no tema claro e{' '}
        <code>brandpurple-950</code> no escuro, onde o acento é um roxo claro. Nos dois temas o
        contraste passa de 4,5:1.
      </UncDocCard>
      <UncDocCard icon="📏" title="Cápsula adaptativa">
        A largura mínima é o diâmetro de 19px; contagens de dois ou três dígitos alargam a cápsula
        mantendo o raio total.
      </UncDocCard>
      <UncDocCard icon="🗣️" title="Anunciado por leitores de tela">
        A prop <code>label</code> define o texto anunciado; o padrão é{' '}
        <code>&quot;{'{count}'} não lidas&quot;</code>.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="Badge"
      layout="Selo · 19px"
      specs={[
        { label: 'Diâmetro', value: '19 px' },
        { label: 'Fundo (claro · escuro)', value: '#716C98 · #AAA5C2' },
        { label: 'Numeral (claro · escuro)', value: '#FFFFFF · #080922' },
        { label: 'Numeral (tab)', value: 'Open Sans 700 · 16px' },
        { label: 'Numeral (row)', value: 'Open Sans 700 · 10px' },
        { label: 'Padding horizontal', value: '4 px' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Um único acento',
          detail:
            'as duas variantes usam --unc-color-accent (brandpurple-600 no claro, brandpurple-400 no escuro). O que distingue tab de row é só o tamanho do numeral: o token de 16px (body-md) na barra de abas e o de 10px (badge) nas linhas.',
        },
        {
          subject: 'Numeral trocado por contraste',
          detail:
            '--unc-color-text-on-accent é branco sobre o roxo do tema claro (cerca de 4,9:1) e brandpurple-950 sobre o roxo claro do tema escuro (cerca de 8,2:1). Branco puro no escuro cairia abaixo de 3:1.',
        },
        {
          subject: 'Contagens de múltiplos dígitos',
          detail:
            'a cápsula alargada e o corte em 99+ são regras do módulo, expostas nas props max e size.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Cápsula', role: 'Círculo de 19px que se alarga com o número de dígitos.', token: '--unc-color-accent' },
        { name: 'Numeral', role: 'Contagem em Open Sans Bold, centralizada.', token: '--unc-color-text-on-accent' },
        { name: 'Rótulo acessível', role: 'Texto anunciado por leitores de tela via aria-label.', token: 'prop label' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e tamanhos" />
    <UncDocStage surface="appbar" padding={28} gap={24}>
      <Badge count={4} variant="tab" />
      <Badge count={12} variant="tab" />
      <Badge count={128} variant="tab" />
      <Badge count={4} variant="row" />
      <Badge count={12} variant="row" />
      <Badge count={128} variant="row" />
    </UncDocStage>

    <UncDocStage label="Tema escuro" theme="dark" surface="appbar" padding={28} gap={24}>
      <Badge count={4} variant="tab" />
      <Badge count={12} variant="tab" />
      <Badge count={4} variant="row" />
      <Badge count={128} variant="row" />
    </UncDocStage>

    <UncDocStage label="Diâmetros" surface="appbar" padding={28} gap={24}>
      {[16, 19, 24, 32].map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Badge count={9} size={size} />
          <div style={{ marginTop: 8, color: 'var(--unc-color-text-secondary)', fontFamily: 'var(--unc-font-sans)', fontSize: 11 }}>
            {size}px
          </div>
        </div>
      ))}
    </UncDocStage>

    <UncDocStage label="Corte por max" surface="appbar" padding={28} gap={24}>
      <Badge count={99} max={99} />
      <Badge count={100} max={99} />
      <Badge count={7} max={5} />
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Usar variant="tab" na barra de abas e variant="row" nas linhas de conversa.',
        'Ocultar o selo quando a contagem for zero, em vez de renderizar "0".',
        'Descrever o significado em label quando o contexto não for óbvio.',
        'Manter o numeral em --unc-color-text-on-accent, que troca de cor com o tema para preservar o contraste.',
      ]}
      donts={[
        'Usar o selo para transmitir estado que não seja contagem.',
        'Trocar o acento da variante por outra cor da escala roxa.',
        'Aplicar branco puro ao numeral no tema escuro.',
        'Exibir contagens sem limite: acima de max o selo deixa de caber na barra.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: fundo e numeral trocam juntos para manter o contraste."
    />
    <UncDocThemeSwitcher surface="appbar">
      {() => (
        <>
          <Badge count={4} variant="tab" />
          <Badge count={4} variant="row" />
          <Badge count={99} variant="tab" />
        </>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="Badge"
      rows={[
        { name: 'count', type: 'number', description: 'Quantidade exibida dentro do selo. Obrigatória.' },
        { name: 'max', type: 'number', default: '99', description: 'Valor máximo exibido antes de aplicar o sufixo "+".' },
        { name: 'variant', type: "'tab' | 'row'", default: "'tab'", description: 'Variante visual, que define o tamanho do numeral.' },
        { name: 'size', type: 'number', default: '19', description: 'Diâmetro do selo em pixels.' },
        { name: 'label', type: 'string', description: 'Rótulo acessível anunciado por leitores de tela.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Badge> = {
  title: 'Unoochat/Componentes/Badge',
  component: Badge,
  parameters: { layout: 'padded' },
  argTypes: {
    count: { control: { type: 'number', min: 0 }, description: 'Quantidade exibida.' },
    max: { control: { type: 'number', min: 1 }, description: 'Valor máximo antes do sufixo "+".' },
    variant: { control: 'radio', options: ['tab', 'row'], description: 'Variante visual.' },
    size: { control: { type: 'range', min: 12, max: 48, step: 1 }, description: 'Diâmetro em pixels.' },
    label: { control: 'text', description: 'Rótulo acessível.' },
  },
  args: { count: 4, max: 99, variant: 'tab', size: 19, label: '' },
};

export default meta;

type Story = StoryObj<typeof Badge>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BadgeDocumentationPage />,
};

/**
 * Playground com 100% das props do Badge expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Badge',
  render: (args) => (
    <UncDocStage surface="appbar" padding={40}>
      <Badge {...args} />
    </UncDocStage>
  ),
};

/**
 * Selo "4" ao lado do rótulo CONVERSAS, nos dois temas.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <>
      {(['light', 'dark'] as const).map((theme) => (
        <UncDocStage
          key={theme}
          label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={theme}
          surface="appbar"
          padding={28}
          gap={8}
        >
          <span
            style={{
              color: 'var(--unc-color-accent)',
              fontFamily: 'var(--unc-font-sans)',
              fontSize: 'var(--unc-font-body-md-size)',
              fontWeight: 700,
            }}
          >
            CONVERSAS
          </span>
          <Badge count={4} variant="tab" />
        </UncDocStage>
      ))}
    </>
  ),
};

/**
 * Matriz completa das duas variantes.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UncDocStage surface="appbar" padding={28} gap={24}>
      <Badge count={4} variant="tab" />
      <Badge count={4} variant="row" />
    </UncDocStage>
  ),
};

/**
 * Comparação de diâmetros.
 */
export const Tamanhos: Story = {
  render: () => (
    <UncDocStage surface="appbar" padding={28} gap={24}>
      {[16, 19, 24, 32].map((size) => (
        <Badge key={size} count={9} size={size} />
      ))}
    </UncDocStage>
  ),
};
