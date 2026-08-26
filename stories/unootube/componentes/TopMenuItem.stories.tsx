import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';

import { TopMenuItem } from '../../../src/unootube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocAnatomy,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { categories } from '../fixtures';

const meta: Meta<typeof TopMenuItem> = {
  title: 'Unootube/Componentes/TopMenuItem',
  component: TopMenuItem,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    onClick: { action: 'onClick' },
  },
  args: { label: 'Item', active: true, disabled: false },
};

export default meta;

type Story = StoryObj<typeof TopMenuItem>;

const TopMenuItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Navegação"
      title="TopMenuItem"
      description="Reprodução do nó Navigation/TopMenuItem (10:545), a pílula de categoria da barra de filtros. O arquivo publica os dois estados com valores literais distintos, e não por cálculo: ativo é branco puro com rótulo quase preto, sem contorno; inativo é a superfície interativa com um contorno de 0,3px — espessura fracionária que não pode ser arredondada."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="A inversão completa que marca o estado ativo."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🔄" title="Inversão total no ativo">
        Fundo <code>#FFFFFF</code> e rótulo <code>#030303</code>. Não é um realce sobre o estado
        inativo: é uma troca completa de superfície e de texto.
      </UniDocCard>
      <UniDocCard icon="📏" title="Contorno de 0,3px">
        A pílula inativa tem um fio fracionário em <code>--uni-color-border-active</code>.
        Arredondá-lo para 1px engrossaria visivelmente a pílula em toda a barra.
      </UniDocCard>
      <UniDocCard icon="💊" title="Raio de 32px, não total">
        Sobre uma pílula de 32px de altura, o raio de 32px já produz cápsula perfeita. É o degrau{' '}
        <code>--uni-radius-xl</code>, não o <code>full</code>.
      </UniDocCard>
      <UniDocCard icon="🔤" title="Rótulo em peso regular">
        Body/Medium, e não um degrau Label. A hierarquia vem da inversão de superfície, não do peso.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="10:545"
      frameName="Navigation/TopMenuItem"
      specs={[
        { label: 'Altura da pílula', value: '32px' },
        { label: 'Recuo', value: '8 / 12' },
        { label: 'Raio', value: '32px (--uni-radius-xl)' },
        { label: 'Contorno inativo', value: '0,3px · #AAAAAA' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Contorno fracionário preservado',
          detail:
            'os 0,3px do arquivo foram mantidos literais no CSS. Alguns navegadores arredondam a espessura na renderização, mas o valor declarado é o do arquivo — arredondá-lo na fonte seria uma perda de fidelidade.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'hover e foco não existem no arquivo. O hover da pílula inativa usa --uni-color-state-active, e o foco aplica anel de 2px no vermelho semântico. A pílula ativa não recebe hover, para não competir com a inversão.',
        },
        {
          subject: 'Alvo externo de 56px',
          detail:
            'o componente do arquivo tem 89×56 — a pílula de 32px dentro de um alvo com recuo vertical de 12px. Aqui o componente é a própria pílula, e o recuo fica a cargo do TopMenuBar, para que o intervalo entre pílulas seja controlado em um só lugar.',
        },
        {
          subject: 'aria-pressed em vez de aria-selected',
          detail:
            'o arquivo não descreve semântica. A pílula usa aria-pressed porque é um filtro que se alterna, e não uma aba de um painel — a barra do canal, essa sim, usa role="tab".',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Pílula',
          role: 'Cápsula de 32px de altura com recuo 8/12.',
          token: '--uni-topmenu-pill-height · --uni-radius-xl',
        },
        {
          name: 'Superfície inativa',
          role: 'Superfície interativa com contorno fracionário de 0,3px.',
          token: '--uni-color-background-surface · --uni-color-border-active',
        },
        {
          name: 'Superfície ativa',
          role: 'Branco puro sem contorno, com rótulo quase preto.',
          token: '--uni-color-surface-inverse · --uni-color-text-inverse',
        },
        {
          name: 'Rótulo',
          role: 'Body/Medium em peso regular, sem quebra de linha.',
          token: '--uni-font-body-md-*',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: ativo e inativo" surface="secondary" gap={12}>
      <TopMenuItem label="Item" active />
      <TopMenuItem label="Item" />
      <TopMenuItem label="Item" />
    </UniDocStage>
    <UniDocStage label="Rótulos reais" surface="secondary" gap={12}>
      {categories.slice(0, 8).map((category, index) => (
        <TopMenuItem key={category.id} label={category.label} active={index === 0} />
      ))}
    </UniDocStage>
    <UniDocStage label="Estados" surface="secondary" gap={12}>
      <TopMenuItem label="Ativo" active />
      <TopMenuItem label="Inativo" />
      <TopMenuItem label="Desabilitado" disabled />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Marque uma única pílula como ativa por barra.',
        'Use o TopMenuBar para agrupar as pílulas: ele controla o intervalo e a rolagem.',
        'Mantenha os rótulos curtos — a pílula não quebra linha.',
        'Preserve o contorno de 0,3px na pílula inativa.',
      ]}
      donts={[
        'Não use cor de marca na pílula ativa: o arquivo inverte para branco.',
        'Não arredonde o contorno de 0,3px para 1px.',
        'Não aplique realce de hover na pílula ativa.',
        'Não use esta pílula nas abas do canal — lá o padrão é rótulo com sublinhado.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="A pílula sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['secondary', 'primary', 'deep']}>
      {() => (
        <>
          <TopMenuItem label="Ativo" active />
          <TopMenuItem label="Inativo" />
        </>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="TopMenuItem"
      rows={[
        { name: 'label', type: 'React.ReactNode', description: 'Rótulo da pílula.' },
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description:
            'Marca a pílula como selecionada: inverte a superfície, remove o contorno e define aria-pressed.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
          description: 'Demais atributos são repassados ao <button>, incluindo onClick e disabled.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TopMenuItemDocumentationPage />,
};

/**
 * Playground com 100% das props do TopMenuItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TopMenuItem',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
        background: 'var(--uni-color-background-secondary)',
      }}
    >
      <TopMenuItem {...args} />
    </div>
  ),
};

/**
 * Réplica visual do nó `Navigation/TopMenuItem` (10:545).
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 12,
        padding: 32,
        background: 'var(--uni-color-background-secondary)',
      }}
    >
      <TopMenuItem label="Item" active />
      <TopMenuItem label="Item" />
      <TopMenuItem label="Item" />
      <TopMenuItem label="Item" />
    </div>
  ),
};

/**
 * Seleção interativa entre categorias.
 */
export const Estados: Story = {
  render: () => {
    const SelectionDemo = () => {
      const [activeId, setActiveId] = useState('all');
      return (
        <div
          data-uni-theme="dark"
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            padding: 32,
            background: 'var(--uni-color-background-secondary)',
          }}
        >
          {categories.map((category) => (
            <TopMenuItem
              key={category.id}
              label={category.label}
              active={category.id === activeId}
              onClick={() => setActiveId(category.id)}
            />
          ))}
        </div>
      );
    };
    return <SelectionDemo />;
  },
};
