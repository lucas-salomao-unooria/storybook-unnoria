import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Chip } from '../../../src/instanooria/components/Chip';
import { Icon } from '../../../src/instanooria/components/Icon';
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
 * Página de documentação rica do componente Chip.
 */
const ChipDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Filtros"
      title="Chip"
      description="Cápsula de categoria exibida logo abaixo do campo de busca (IGTV, Loja, Estilo, Esportes, Automóveis). Reproduz o contorno de 1px e o raio total do arquivo de design, com suporte a ícone à esquerda e ao estado selecionado."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Filtro horizontal de escopo, sempre com um item ativo."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🏷️" title="Filtro de escopo">
        Cada chip restringe o conteúdo exibido na grade abaixo. A faixa rola horizontalmente sem
        quebrar linha.
      </InstaDocCard>
      <InstaDocCard icon="🔲" title="Seleção por inversão">
        O estado selecionado inverte fundo e texto, em vez de aplicar uma cor de destaque — o mesmo
        princípio da barra inferior.
      </InstaDocCard>
      <InstaDocCard icon="🎬" title="Ícone contextual">
        Apenas a categoria IGTV carrega ícone no arquivo original; os demais chips são puramente
        textuais.
      </InstaDocCard>
      <InstaDocCard icon="♿" title="Estado anunciado">
        Renderiza <code>aria-pressed</code>, comunicando a seleção a leitores de tela sem depender de
        cor.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas da faixa de categorias da tela Buscar."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1906"
      frameName="Instagram Search → Categorias"
      specs={[
        { label: 'Altura', value: '32px' },
        { label: 'Raio', value: 'total (pílula)' },
        { label: 'Contorno', value: '1px' },
        { label: 'Padding lateral', value: '12px' },
        { label: 'Tipografia', value: 'Title/Small · 14px · 590' },
        { label: 'Gap entre chips', value: '8px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia e Matriz de Estados"
      description="Ícone opcional, rótulo e os três estados suportados."
    />
    <InstaDocStage label="Estados">
      <Chip>Padrão</Chip>
      <Chip selected>Selecionado</Chip>
      <Chip disabled>Desabilitado</Chip>
      <Chip leadingIcon={<Icon name="igtv" size={14} tone="inherit" />}>IGTV</Chip>
      <Chip selected leadingIcon={<Icon name="igtv" size={14} tone="inherit" />}>
        IGTV
      </Chip>
    </InstaDocStage>

    <InstaDocStage label="Faixa completa de categorias" align="flex-start">
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', width: '100%' }}>
        {instaSearchCategories.map((category, index) => (
          <Chip
            key={category}
            selected={index === 0}
            leadingIcon={category === 'IGTV' ? <Icon name="igtv" size={14} tone="inherit" /> : undefined}
          >
            {category}
          </Chip>
        ))}
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Boas Práticas"
      description="Regras de filtro verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Manter sempre exatamente um chip selecionado na faixa.',
        'Usar rótulos de uma única palavra sempre que possível.',
        'Deixar o último chip parcialmente visível para sinalizar rolagem.',
        'Reservar o ícone para categorias que tenham identidade visual própria.',
      ]}
      donts={[
        'Permitir seleção múltipla sem indicar visualmente o comportamento.',
        'Quebrar a faixa em duas linhas.',
        'Usar o chip como botão de ação — ele filtra, não executa.',
        'Aplicar cores de severidade (erro, sucesso) ao chip.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="5. Suporte a Temas"
      description="O estado selecionado inverte corretamente nos dois temas."
    />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <>
          <Chip theme={activeTheme}>Estilo</Chip>
          <Chip theme={activeTheme} selected>
            Esportes
          </Chip>
          <Chip theme={activeTheme} leadingIcon={<Icon name="igtv" size={14} tone="inherit" />}>
            IGTV
          </Chip>
          <Chip theme={activeTheme} disabled>
            Indisponível
          </Chip>
        </>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="6. Referência Completa de Props da API"
      description="Contrato público do componente Chip."
    />
    <InstaDocPropsTable
      title="Chip"
      rows={[
        {
          name: 'leadingIcon',
          type: 'React.ReactNode',
          description: 'Ícone renderizado antes do rótulo.',
        },
        {
          name: 'selected',
          type: 'boolean',
          default: 'false',
          description: 'Marca o chip como selecionado, invertendo o contraste.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Desabilita a interação.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo do chip.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Chip> = {
  title: 'Instanooria/Componentes/Chip',
  component: Chip,
  parameters: { layout: 'padded' },
  argTypes: {
    selected: { control: 'boolean', description: 'Marca o chip como selecionado.' },
    disabled: { control: 'boolean', description: 'Desabilita a interação.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Rótulo do chip.' },
  },
  args: { selected: false, disabled: false, theme: 'light', children: 'Estilo' },
};

export default meta;

type Story = StoryObj<typeof Chip>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChipDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Chip expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Chip',
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
        borderRadius: 12,
        border: '1px solid #E4E8E9',
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
      }}
    >
      <Chip {...args} />
    </div>
  ),
};

/**
 * Faixa interativa de categorias, réplica do arquivo oficial do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => {
    const CategoryRow = () => {
      const [active, setActive] = useState(0);

      return (
        <div
          style={{
            width: 375,
            padding: '16px 14px',
            border: '1px solid #E4E8E9',
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
          }}
        >
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
      );
    };

    return <CategoryRow />;
  },
};

/**
 * Matriz completa de estados.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip>Padrão</Chip>
      <Chip selected>Selecionado</Chip>
      <Chip disabled>Desabilitado</Chip>
      <Chip leadingIcon={<Icon name="igtv" size={14} tone="inherit" />}>Com ícone</Chip>
    </div>
  ),
};
