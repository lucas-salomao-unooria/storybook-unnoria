import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { SearchField } from '../../../src/unoovista/components/SearchField';
import { TopBar } from '../../../src/unoovista/components/TopBar';
import { Chip } from '../../../src/unoovista/components/Chip';
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
import { unvSearchCategories } from '../fixtures';

const BAR = '#716C98';

const CodeAction = () => <TopBar.Action icon="qrCode" label="Ler código" />;

/**
 * Campo de busca controlado, com o texto no estado do consumidor.
 */
const ControlledSearch: React.FC = () => {
  const [query, setQuery] = useState('design system');

  return (
    <SearchField
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      onClear={() => undefined}
    />
  );
};

/**
 * Topo da tela Buscar: campo com ação externa e categorias abaixo.
 */
const SearchHeader: React.FC = () => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  return (
    <div style={{ width: 375, padding: 16, display: 'grid', gap: 12, boxSizing: 'border-box' }}>
      <SearchField
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        trailing={<CodeAction />}
      />
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none' }}>
        {unvSearchCategories.map((category, index) => (
          <Chip
            key={category}
            selected={index === active}
            onClick={() => setActive(index)}
          >
            {category}
          </Chip>
        ))}
      </div>
    </div>
  );
};

/**
 * Página de documentação rica do componente SearchField.
 */
const SearchFieldDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Formulários"
      title="SearchField"
      description="Campo de busca em cápsula de 44px, com preenchimento suave, lupa à esquerda e botão de limpar que aparece quando há texto. Uma ação opcional fica fora da cápsula, à direita."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Um campo, dois modos de uso: controlado ou não controlado."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🔎" title="Busca e filtro de listas">
        Tela Buscar, lista de conversas e qualquer lista longa. O componente é só a entrada; o
        filtro fica com o consumidor.
      </UnvDocCard>
      <UnvDocCard icon="🧹" title="Limpar em um toque">
        O botão de 44px esvazia o campo, devolve o foco e dispara <code>onChange</code> e{' '}
        <code>onClear</code>. Some sozinho quando o campo está vazio.
      </UnvDocCard>
      <UnvDocCard icon="➡️" title="Ação fora da cápsula">
        O slot <code>trailing</code> renderiza à direita, fora do campo — por exemplo o leitor do
        código pessoal, com <code>TopBar.Action</code>.
      </UnvDocCard>
      <UnvDocCard icon="✍️" title="Controlado só quando pedido">
        Sem <code>value</code>, o texto mora no DOM e o componente repassa <code>defaultValue</code>
        . O campo nunca passa <code>value</code> por conta própria.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="SearchField"
      layout="Campo · 44px"
      specs={[
        { label: 'Altura', value: '44px (--unv-touch-target)' },
        { label: 'Forma', value: 'Cápsula (--unv-radius-full)' },
        { label: 'Preenchimento', value: '--unv-color-fill-field' },
        { label: 'Lupa', value: 'searchSmall · 20px · --unv-color-text-secondary' },
        { label: 'Texto', value: 'body-lg · Open Sans 400 · 16/24px' },
        { label: 'Espaço reservado', value: '--unv-color-text-placeholder' },
        { label: 'Limpar', value: 'alvo de 44px · glifo close de 20px' },
        { label: 'Foco', value: 'anel de 2px em --unv-color-action-primary' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Cápsula de 44px',
          detail:
            'a altura é o alvo de toque do módulo; o raio total e o preenchimento suave dispensam contorno.',
        },
        {
          subject: 'Botão de limpar próprio',
          detail:
            'o botão nativo do navegador é escondido e substituído por um botão de 44px com nome acessível ("Limpar busca", ajustável em clearLabel). Em modo não controlado, limpar escreve no nó do DOM e avisa o React, porque não há estado que comande o campo.',
        },
        {
          subject: 'Trailing fora da cápsula',
          detail:
            'como no desenho anterior do componente, a ação fica fora do campo, separada por 8px. Dentro da cápsula só cabem a lupa e o limpar.',
        },
        {
          subject: 'Contorno de controle',
          detail:
            'a cápsula tem contorno de 1px em --unv-color-border-control (4,30:1 sobre o preenchimento e 4,96:1 sobre a tela no claro), o que cumpre os 3:1 de limite de componente; o anel de foco de 2px em --unv-color-action-primary marca o uso. Para um campo de formulário com rótulo e mensagem de erro, use o TextField.',
        },
        {
          subject: 'Extensões aditivas e cliente',
          detail:
            'clearable, clearLabel e onClear são opcionais. O componente passou a ser de cliente ("use client"), porque guarda se há texto para mostrar o limpar.',
        },
        {
          subject: 'Tema herdado',
          detail: 'theme deixou de ter padrão "light": sem a prop, herda data-unv-theme do contêiner.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UnvDocAnatomy
      zones={[
        { name: 'Cápsula (box)', role: 'Superfície do campo, com anel de foco.', token: '--unv-color-fill-field · --unv-radius-full' },
        { name: 'Lupa', role: 'Glifo decorativo à esquerda.', token: '--unv-color-text-secondary' },
        { name: 'Entrada (input)', role: 'type="search", role="searchbox", com nome acessível.', token: '--unv-font-body-lg-*' },
        { name: 'Limpar', role: 'Botão de 44px, visível só com texto.', token: '--unv-touch-target' },
        { name: 'Ação (trailing)', role: 'Slot externo, à direita.', token: '--unv-spacing-xs' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Vazio, preenchido, desabilitado e com ação, nos dois temas."
    />
    <UnvDocStage label="Tema claro" surface="secondary" align="stretch" direction="column" gap={16} width={375}>
      <SearchField />
      <SearchField defaultValue="design system" />
      <SearchField disabled placeholder="Indisponível" />
      <SearchField trailing={<CodeAction />} />
    </UnvDocStage>
    <UnvDocStage label="Tema escuro" theme="dark" surface="secondary" align="stretch" direction="column" gap={16} width={375}>
      <SearchField />
      <SearchField defaultValue="design system" />
      <SearchField trailing={<CodeAction />} />
    </UnvDocStage>
    <UnvDocStage label="Topo da tela Buscar" surface="secondary" align="stretch" padding={0}>
      <SearchHeader />
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Manter o espaço reservado curto e descritivo ("Buscar", "Buscar conversas").',
        'Passar value e onChange juntos, ou nenhum dos dois.',
        'Usar TopBar.Action no slot trailing, com nome acessível.',
        'Ajustar ariaLabel ao contexto quando houver mais de uma busca na tela.',
      ]}
      donts={[
        'Passar value sem onChange: o campo fica travado.',
        'Usar o SearchField como campo de formulário; para isso existe o TextField.',
        'Colocar botões dentro da cápsula além do limpar.',
        'Depender só do espaço reservado como nome do campo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Preenchimento, texto, lupa e foco seguem os tokens do tema."
    />
    <UnvDocThemeSwitcher surface="secondary">
      {() => (
        <div style={{ width: 340 }}>
          <SearchField defaultValue="design system" trailing={<CodeAction />} />
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UnvDocPropsTable
      title="SearchField"
      rows={[
        { name: 'placeholder', type: 'string', default: "'Buscar'", description: 'Texto do campo vazio.' },
        { name: 'ariaLabel', type: 'string', default: "'Buscar'", description: 'Nome acessível do campo.' },
        { name: 'trailing', type: 'React.ReactNode', description: 'Ação fora da cápsula, à direita.' },
        { name: 'clearable', type: 'boolean', default: 'true', description: 'Exibe o botão de limpar quando há texto.' },
        { name: 'clearLabel', type: 'string', default: "'Limpar busca'", description: 'Nome acessível do botão de limpar.' },
        { name: 'onClear', type: '() => void', description: 'Chamado depois que o botão esvazia o campo.' },
        { name: 'block', type: 'boolean', default: 'true', description: 'Ocupa toda a largura do contêiner.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'value / defaultValue / onChange', type: 'string | function', description: 'Repassados ao <input>; só há campo controlado com value.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SearchField> = {
  title: 'Unoovista/Componentes/SearchField',
  component: SearchField,
  parameters: { layout: 'padded' },
  argTypes: {
    placeholder: { control: 'text', description: 'Texto do campo vazio.' },
    ariaLabel: { control: 'text', description: 'Nome acessível do campo.' },
    trailing: {
      control: 'select',
      options: ['nenhuma', 'leitor de código'],
      mapping: { nenhuma: undefined, 'leitor de código': <CodeAction /> },
      description: 'Ação fora da cápsula.',
    },
    clearable: { control: 'boolean', description: 'Exibe o botão de limpar.' },
    clearLabel: { control: 'text', description: 'Nome acessível do botão de limpar.' },
    onClear: { action: 'onClear', description: 'Chamado depois de limpar.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    defaultValue: { control: 'text', description: 'Valor inicial (modo não controlado).' },
    disabled: { control: 'boolean', description: 'Desabilita o campo.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    placeholder: 'Buscar',
    ariaLabel: 'Buscar',
    trailing: 'nenhuma' as never,
    clearable: true,
    clearLabel: 'Limpar busca',
    block: true,
    defaultValue: '',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof SearchField>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SearchFieldDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SearchField',
  render: (args) => (
    <UnvDocStage surface="secondary" align="stretch" width={375} theme={args.theme}>
      <SearchField {...args} />
    </UnvDocStage>
  ),
};

/**
 * Topo da tela Buscar: campo controlado, ação externa e categorias.
 */
export const ExemploTelaBuscar: Story = {
  name: '🎨 Exemplo da Tela Buscar',
  render: () => (
    <UnvDocStage surface="secondary" align="stretch" padding={0}>
      <SearchHeader />
    </UnvDocStage>
  ),
};

/**
 * Matriz de estados: vazio, preenchido, desabilitado e com ação.
 */
export const Estados: Story = {
  render: () => (
    <UnvDocStage surface="secondary" align="stretch" direction="column" gap={16} width={375}>
      <SearchField />
      <SearchField defaultValue="design system" />
      <SearchField disabled placeholder="Indisponível" />
      <SearchField trailing={<CodeAction />} />
    </UnvDocStage>
  ),
};

/**
 * Regressão: o botão de limpar esvazia o campo NÃO controlado (o texto mora no
 * DOM) e o controlado (o texto mora no estado do consumidor), devolvendo o foco.
 */
export const LimparCampo: Story = {
  name: 'Limpar (controlado e não controlado)',
  render: () => (
    <UnvDocStage surface="secondary" align="stretch" direction="column" gap={16} width={375}>
      <SearchField ariaLabel="Busca livre" defaultValue="texto solto" />
      <ControlledSearch />
    </UnvDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const free = canvas.getByRole('searchbox', { name: 'Busca livre' }) as HTMLInputElement;
    await expect(free.value).toBe('texto solto');

    await userEvent.click(canvas.getAllByRole('button', { name: 'Limpar busca' })[0]);
    await expect(free.value).toBe('');
    await expect(free).toHaveFocus();
    await expect(canvas.getAllByRole('button', { name: 'Limpar busca' })).toHaveLength(1);

    const controlled = canvas.getByRole('searchbox', { name: 'Buscar' }) as HTMLInputElement;
    await expect(controlled.value).toBe('design system');
    await userEvent.click(canvas.getByRole('button', { name: 'Limpar busca' }));
    await expect(controlled.value).toBe('');
    await expect(canvas.queryByRole('button', { name: 'Limpar busca' })).toBeNull();
  },
};
