import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SearchField } from '../../../src/instanooria/components/SearchField';
import { Icon } from '../../../src/instanooria/components/Icon';
import { Chip } from '../../../src/instanooria/components/Chip';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaSearchCategories } from '../fixtures';

/**
 * Página de documentação rica do componente SearchField.
 */
const SearchFieldDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Entrada de Dados"
      title="SearchField"
      description="Campo de busca translúcido no padrão iOS, presente na tela Buscar e no topo da caixa de mensagens diretas. Reproduz a cápsula de 36px com raio de 10px e preenchimento rgba(118, 118, 128, 0.12) do arquivo de design."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Um único campo, dois contextos, um slot de extensão."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🔍" title="Preenchimento translúcido">
        O fundo é uma cor com alfa sobre a superfície, não um cinza sólido. Isso mantém o campo
        legível tanto sobre branco quanto sobre preto.
      </InstaDocCard>
      <InstaDocCard icon="📷" title="Slot trailing">
        Na tela Buscar, o leitor de nametag fica fora da cápsula, à direita — exatamente o que o slot{' '}
        <code>trailing</code> resolve.
      </InstaDocCard>
      <InstaDocCard icon="✉️" title="Topo das mensagens">
        Na caixa de entrada, o campo aparece sozinho, ocupando toda a largura menos as calhas
        laterais.
      </InstaDocCard>
      <InstaDocCard icon="♿" title="Semântica de busca">
        Renderiza <code>type=&quot;search&quot;</code> com <code>role=&quot;searchbox&quot;</code> e
        rótulo acessível configurável.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do frame Search da caixa de mensagens."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2622"
      frameName="Instagram Direct Messages → Search"
      specs={[
        { label: 'Dimensão', value: '347 × 36px' },
        { label: 'Raio', value: '10px' },
        { label: 'Preenchimento', value: 'rgba(118,118,128,0.12)' },
        { label: 'Lupa', value: '13.68 × 13.68px' },
        { label: 'Placeholder', value: 'rgba(60,60,67,0.6)' },
        { label: 'Tipografia', value: 'Body/Large · 16px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Cápsula com lupa à esquerda, controle flexível e slot trailing externo."
    />
    <InstaDocStage label="Estrutura" align="flex-start">
      <div style={{ width: 347, display: 'grid', gap: 16 }}>
        <SearchField placeholder="Buscar" />
        <SearchField placeholder="Buscar" trailing={<Icon name="nametag" size={22} />} />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Estados"
      description="Vazio, preenchido, desabilitado e com ação à direita."
    />
    <InstaDocStage label="Estados" align="flex-start">
      <div style={{ width: 347, display: 'grid', gap: 16 }}>
        <SearchField placeholder="Buscar" />
        <SearchField placeholder="Buscar" defaultValue="design system" />
        <SearchField placeholder="Buscar" disabled />
        <SearchField placeholder="Buscar" trailing={<Icon name="nametag" size={22} />} />
      </div>
    </InstaDocStage>

    <InstaDocStage label="Com filtros de categoria (tela Buscar)" align="flex-start">
      <div style={{ width: 375, padding: '0 14px', display: 'grid', gap: 12 }}>
        <SearchField placeholder="Buscar" trailing={<Icon name="nametag" size={22} />} />
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {instaSearchCategories.map((category, index) => (
            <Chip
              key={category}
              selected={index === 0}
              leadingIcon={index === 0 ? <Icon name="igtv" size={14} tone="inherit" /> : undefined}
            >
              {category}
            </Chip>
          ))}
        </div>
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de busca verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Manter o placeholder curto — "Buscar" basta.',
        'Colocar ações auxiliares no slot trailing, fora da cápsula.',
        'Fornecer ariaLabel específico quando houver mais de um campo de busca na tela.',
        'Deixar a cápsula ocupar toda a largura disponível entre as calhas.',
      ]}
      donts={[
        'Substituir o preenchimento translúcido por um cinza sólido.',
        'Colocar botões dentro da cápsula, competindo com o texto digitado.',
        'Usar raio total: o arquivo especifica 10px, não uma pílula.',
        'Aplicar o campo de busca como entrada genérica de formulário.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="O alfa do preenchimento aumenta no tema Dark para manter o campo visível."
    />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <div style={{ width: 347, display: 'grid', gap: 16 }}>
          <SearchField placeholder="Buscar" theme={activeTheme} />
          <SearchField
            placeholder="Buscar"
            defaultValue="design system"
            theme={activeTheme}
            trailing={<Icon name="nametag" size={22} theme={activeTheme} />}
          />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente SearchField."
    />
    <InstaDocPropsTable
      title="SearchField"
      rows={[
        {
          name: 'placeholder',
          type: 'string',
          default: "'Search'",
          description: 'Texto exibido quando o campo está vazio.',
        },
        {
          name: 'ariaLabel',
          type: 'string',
          default: "'Buscar'",
          description: 'Rótulo acessível do campo.',
        },
        {
          name: 'trailing',
          type: 'React.ReactNode',
          description: 'Ação renderizada à direita, fora da cápsula.',
        },
        {
          name: 'block',
          type: 'boolean',
          default: 'true',
          description: 'Ocupa toda a largura do contêiner.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SearchField> = {
  title: 'Instanooria/Componentes/SearchField',
  component: SearchField,
  parameters: { layout: 'padded' },
  argTypes: {
    placeholder: { control: 'text', description: 'Texto exibido com o campo vazio.' },
    ariaLabel: { control: 'text', description: 'Rótulo acessível do campo.' },
    disabled: { control: 'boolean', description: 'Desabilita o campo.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura disponível.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    placeholder: 'Buscar',
    ariaLabel: 'Buscar',
    disabled: false,
    block: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof SearchField>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SearchFieldDocumentationPage />,
};

/**
 * Playground com todas as propriedades do SearchField expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SearchField',
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{
        width: 375,
        padding: 24,
        borderRadius: 12,
        border: '1px solid #E4E8E9',
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
      }}
    >
      <SearchField {...args} />
    </div>
  ),
};

/**
 * Réplica do topo da tela Buscar do arquivo oficial do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => {
    const SearchHeader = () => {
      const [query, setQuery] = useState('');
      const [active, setActive] = useState(0);

      return (
        <div
          style={{
            width: 375,
            padding: '16px 14px',
            border: '1px solid #E4E8E9',
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
            display: 'grid',
            gap: 12,
          }}
        >
          <SearchField
            placeholder="Buscar"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            trailing={<Icon name="nametag" size={22} />}
          />
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
            {instaSearchCategories.map((category, index) => (
              <Chip
                key={category}
                selected={index === active}
                onClick={() => setActive(index)}
                leadingIcon={category === 'IGTV' ? <Icon name="igtv" size={14} tone="inherit" /> : undefined}
              >
                {category}
              </Chip>
            ))}
          </div>
        </div>
      );
    };

    return <SearchHeader />;
  },
};

/**
 * Matriz completa de estados.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ width: 347, display: 'grid', gap: 16 }}>
      <SearchField placeholder="Buscar" />
      <SearchField placeholder="Buscar" defaultValue="design system" />
      <SearchField placeholder="Buscar" disabled />
      <SearchField placeholder="Buscar" trailing={<Icon name="nametag" size={22} />} />
    </div>
  ),
};
