import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { NavBar, SearchField } from '../../../src/tiktooria';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocAnatomy,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocPropsTable,
  TikDocStage,
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';

const meta: Meta<typeof SearchField> = {
  title: 'Tik Tooria/Componentes/SearchField',
  component: SearchField,
  parameters: { layout: 'padded' },
  argTypes: {
    placeholder: { control: 'text' },
    ariaLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    defaultValue: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    placeholder: 'Search',
    ariaLabel: 'Buscar',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof SearchField>;


const SearchFieldDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Entrada"
      title="SearchField"
      description="Campo preenchido de 382×36 com raio de 4px. O fundo é --tik-color-surface-field (#F1F1F2), o glifo de lupa fica a 12px da borda interna e o texto de reserva usa Regular 15 em --tik-color-text-secondary. É o único campo de entrada que o arquivo publica."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🔎" title="Campo preenchido">
        Sem borda: o contraste vem do fundo #F1F1F2 contra o branco da tela. É o mesmo padrão do campo de busca nativo do iOS.
      </TikDocCard>
      <TikDocCard icon="📐" title="Raio de 4px">
        Único uso de <code>--tik-radius-l</code> no arquivo, distinto dos 2px dos botões contornados e dos 8px das folhas.
      </TikDocCard>
      <TikDocCard icon="🔤" title="Reserva em tom secundário">
        O texto de reserva usa <code>--tik-color-text-secondary</code>, e não uma cor de placeholder própria.
      </TikDocCard>
      <TikDocCard icon="⌨️" title="Entrada real">
        Renderiza <code>&lt;input type=&quot;search&quot;&gt;</code> com o botão de limpar nativo suprimido, como no arquivo.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:218"
      frameName="Search Field — TikTok Find Friends"
      specs={[
        { label: 'Dimensões', value: '382 × 36' },
        { label: 'Raio', value: '4px' },
        { label: 'Fundo', value: '#F1F1F2' },
        { label: 'Glifo', value: 'lupa de 14,8px a 12px da borda' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Sem estado de foco no arquivo',
          detail:
            'o arquivo mostra apenas o campo em repouso. Foi acrescentado anel de 2px em --tik-color-brand-button no :focus-within, usando token da própria marca.',
        },
        {
          subject: 'Sem botão de limpar',
          detail:
            'o arquivo não desenha o botão de limpar. O componente suprime o botão nativo do WebKit para manter a fidelidade.',
        },
        {
          subject: 'Largura fluida',
          detail:
            'o arquivo fixa 382px. O componente ocupa a largura do contêiner, o que resulta em 382px quando colocado dentro da calha de 16px de uma tela de 414px.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Campo', role: 'Retângulo preenchido de 36px de altura com raio de 4px.', token: '--tik-color-surface-field · --tik-radius-l' },
        { name: 'Glifo de lupa', role: 'Ícone de 14,8px recuado 12px da borda interna.', token: 'glifo search' },
        { name: 'Entrada', role: 'Texto em Regular 15 com reserva em tom secundário.', token: '--tik-font-body-*' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Dentro da calha de 16px, como no arquivo" surface="chrome" align="stretch" direction="column" width={414}>
      <div style={{ padding: '0 16px' }}>
        <SearchField />
      </div>
    </TikDocStage>
    <TikDocStage label="Com valor preenchido e desabilitado" surface="chrome" align="stretch" direction="column" width={414}>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SearchField defaultValue="craig_love" />
        <SearchField disabled placeholder="Busca indisponível" />
      </div>
    </TikDocStage>
    <TikDocStage label="Reserva localizada" surface="chrome" align="stretch" direction="column" width={414}>
      <div style={{ padding: '0 16px' }}>
        <SearchField placeholder="Buscar amigos" ariaLabel="Buscar amigos" />
      </div>
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Coloque o campo dentro da calha de 16px, o que reproduz os 382px do arquivo.',
        'Informe ariaLabel sempre que o rótulo visível for apenas o texto de reserva.',
        'Use type="search" — o componente já o define.',
      ]}
      donts={[
        'Não acrescente borda ao campo: o contraste é dado pelo fundo.',
        'Não use raio diferente de 4px.',
        'Não use o campo sobre superfície imersiva — o fundo claro não tem contraste ali.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome', 'sheet']}>
      {() => (
        <div style={{ width: 382 }}>
          <SearchField />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="SearchField"
      rows={[
        {
          name: 'placeholder',
          type: "string",
          default: "Search",
          description:
            'Texto de reserva.',
        },
        {
          name: 'ariaLabel',
          type: "string",
          default: "Buscar",
          description:
            'Rótulo acessível do campo.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional aplicada ao contêiner.',
        },
        {
          name: '...rest',
          type: "Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>",
          description:
            'Demais atributos são repassados ao <input>, incluindo value, onChange e disabled.',
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
  render: () => <SearchFieldDocumentationPage />,
};

/**
 * Playground com 100% das props do SearchField expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SearchField',
  render: (args) => (
    <div style={{ width: 414, padding: '24px 16px', background: 'var(--tik-color-surface-primary)' }}>
      <SearchField {...args} />
    </div>
  ),
};

/**
 * Réplica visual do topo da tela “Find friends” do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <NavBar title="Find friends" showBack hairline={false} />
      <div style={{ padding: '16px 16px 0' }}>
        <SearchField />
      </div>
    </div>
  ),
};

/**
 * Repouso, preenchido e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <div
      style={{
        width: 414,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: '24px 16px',
        background: 'var(--tik-color-surface-primary)',
      }}
    >
      <SearchField />
      <SearchField defaultValue="craig_love" />
      <SearchField disabled />
    </div>
  ),
};
