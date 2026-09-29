import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { SearchInput } from '../../../src/unooriaai/components/SearchInput';
import { NavItem, Sidebar } from '../../../src/unooriaai/components';
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
import { uaiConversations } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente SearchInput.
 */
const SearchInputDocumentationPage = () => {
  const [busca, setBusca] = React.useState('');
  const filtradas = uaiConversations.filter((item) =>
    item.toLowerCase().includes(busca.trim().toLowerCase())
  );

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="UnooriaAI"
        category="Componentes • Formulário"
        title="SearchInput"
        description="Campo de busca de 260 × 36, com padding 8/12, gap 8, raio 8 e preenchimento suave, sem contorno. Lupa da biblioteca de ícones da Unooria e espaço reservado compartilham a mesma cor de apoio. É o campo de busca de conversas no topo da barra lateral."
      />

      <UnooriaDocSectionHeader
        title="1. Visão geral e casos de uso"
        description="Um campo de filtro sem contorno, desenhado para viver dentro da barra lateral."
        barColor={BAR}
      />
      <UaiDocGrid>
        <UaiDocCard icon="🔍" title="Busca de conversas">
          O uso canônico: filtrar a lista de conversas conforme a pessoa digita, sem botão de
          submissão.
        </UaiDocCard>
        <UaiDocCard icon="🫥" title="Sem contorno">
          A separação vem do preenchimento suave (<code>--uai-fill-4</code>), não de borda: é o que o
          distingue do <code>Input</code>, que tem contorno de 1px.
        </UaiDocCard>
        <UaiDocCard icon="📐" title="Compacto">
          36px de altura contra os 44 do <code>Input</code>: a barra lateral é densa e o campo
          precisa ceder espaço às conversas.
        </UaiDocCard>
        <UaiDocCard icon="🔤" title="type=search">
          O elemento nativo é <code>type=&quot;search&quot;</code>, com o botão de limpar do navegador
          neutralizado para preservar o desenho.
        </UaiDocCard>
      </UaiDocGrid>

      <UnooriaDocSectionHeader
        title="2. Especificações técnicas"
        description="Medidas e tokens do componente."
        barColor={BAR}
      />
      <UaiDocSpecs
        component="SearchInput"
        layout="Campo · 260 × 36"
        specs={[
          { label: 'Dimensões', value: '260 × 36' },
          { label: 'Padding', value: '8/12' },
          { label: 'Gap', value: '8px · --uai-spacing-4' },
          { label: 'Raio', value: '8px · --uai-radius-md' },
          { label: 'Superfície', value: '--uai-fill-4' },
          { label: 'Glifo', value: 'search · 20px · --uai-text-soft-40' },
          { label: 'Espaço reservado', value: '--uai-text-soft-40' },
          { label: 'Foco', value: 'anel de 2px em --uai-border-brand' },
        ]}
      />
      <UaiDocDecisions
        items={[
          {
            subject: 'Altura de 36px',
            detail:
              'é medida literal do módulo: não há degrau equivalente na escala de espaçamento nem na de tamanhos.',
          },
          {
            subject: 'Foco por anel, não por escurecer a superfície',
            detail:
              'escurecer o preenchimento para --uai-fill-10 derrubava o espaço reservado e a lupa a cerca de 3:1 nos dois temas (texto exige 4,5:1). O preenchimento fica em --uai-fill-4 e o anel de 2px em --uai-border-brand (4,9:1 no claro, 7,7:1 no escuro) marca o campo focado.',
          },
          {
            subject: 'Lupa na biblioteca de ícones',
            detail:
              'o slot glyph renderiza o ícone search (Material Symbols Rounded, peso 300) em 20px, a altura exata da linha de texto. Continua aceitando qualquer nó React.',
          },
          {
            subject: 'Contraste do espaço reservado',
            detail:
              'sobre o preenchimento, --uai-text-soft-40 mede de 4,5:1 a 5,2:1 no claro (branco, tela e bloco sutil) e de 6,7:1 a 7,4:1 no escuro.',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do componente"
        description="Superfície suave, glifo fixo e campo elástico."
        barColor={BAR}
      />
      <UaiDocAnatomy
        zones={[
          {
            name: 'Superfície',
            role: 'Retângulo de raio 8 com preenchimento suave, sem contorno. Reage ao foco por :focus-within.',
            token: '--uai-fill-4 · --uai-radius-md',
          },
          {
            name: 'glyph',
            role: 'Slot antes do campo, marcado aria-hidden. Por padrão, o ícone search.',
            token: '--uai-text-soft-40',
          },
          {
            name: 'Campo',
            role: 'flex: 1 1 auto com min-width: 0. Todas as props nativas passam por spread; o campo só é controlado quando value é passado.',
            token: '--uai-font-body-sm-*',
          },
          {
            name: 'block',
            role: 'Ocupa 100% da largura: o modo usado dentro da Sidebar, onde a calha já define a medida.',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        title="4. Matriz de variantes, tamanhos e estados"
        description="Repouso, com valor, em largura total e filtrando uma lista real."
        barColor={BAR}
      />
      <UaiDocStage label="Estados" direction="column" align="flex-start">
        <SearchInput readOnly />
        <SearchInput defaultValue="tokens" />
        <SearchInput disabled />
        <div style={{ width: '100%' }}>
          <SearchInput block placeholder="Ocupa a largura toda" />
        </div>
      </UaiDocStage>
      <UaiDocStage
        label="Filtro funcional sobre a lista de conversas"
        direction="column"
        align="flex-start"
      >
        <SearchInput
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          aria-label="Filtrar conversas"
          block
        />
        <div style={{ width: '100%', display: 'grid', gap: 4 }}>
          {filtradas.length === 0 ? (
            <span style={{ fontSize: 13, color: 'var(--uai-text-secondary)' }}>
              Nenhuma conversa encontrada.
            </span>
          ) : (
            filtradas.map((item) => (
              <NavItem key={item} icon="chatBubble">
                {item}
              </NavItem>
            ))
          )}
        </div>
      </UaiDocStage>
      <UaiDocStage label="Dentro da barra lateral">
        <Sidebar height={320}>
          <Sidebar.NewChatButton />
          <SearchInput block />
          <Sidebar.SectionLabel>Hoje</Sidebar.SectionLabel>
          {uaiConversations.slice(0, 3).map((item, index) => (
            <NavItem key={item} icon="chatBubble" state={index === 0 ? 'active' : 'default'}>
              {item}
            </NavItem>
          ))}
        </Sidebar>
      </UaiDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas práticas"
        description="Regras de busca."
        barColor={BAR}
      />
      <UaiDocPractices
        dos={[
          'Filtrar conforme a pessoa digita, sem exigir submissão.',
          'Passar block quando o campo estiver dentro da Sidebar, deixando a calha definir a largura.',
          'Manter aria-label ou um rótulo associado quando o espaço reservado não bastar como nome.',
          'Exibir estado vazio explícito quando o filtro não retorna nada.',
        ]}
        donts={[
          'Usar o SearchInput em formulário: para isso existe o Input, com contorno e 44px.',
          'Adicionar botão de submissão: a busca é incremental.',
          'Trocar o preenchimento suave por contorno, o que o transforma visualmente em Input.',
          'Colocar o glifo depois do campo: a lupa vem sempre antes.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a temas"
        description="O preenchimento e o texto seguem a escada translúcida: tinta roxa no claro e branco no escuro."
        barColor={BAR}
      />
      <UaiDocThemeSwitcher direction="column">
        {() => (
          <>
            <SearchInput block readOnly />
            <SearchInput block defaultValue="design system" />
          </>
        )}
      </UaiDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência completa de props da API"
        description="Contrato público do componente SearchInput."
        barColor={BAR}
      />
      <UaiDocPropsTable
        title="SearchInput"
        rows={[
          {
            name: 'glyph',
            type: 'React.ReactNode',
            default: '<Icon name="search" size={20} />',
            description: 'Glifo renderizado antes do campo, marcado como aria-hidden.',
          },
          {
            name: 'block',
            type: 'boolean',
            default: 'false',
            description: 'Ocupa toda a largura disponível em vez dos 260px.',
          },
          {
            name: 'placeholder',
            type: 'string',
            default: "'Buscar conversas'",
            description: 'Texto do espaço reservado, em --uai-text-soft-40.',
          },
          {
            name: 'theme',
            type: "'light' | 'dark'",
            description:
              'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
          },
          {
            name: '...props',
            type: 'React.InputHTMLAttributes<HTMLInputElement>',
            description:
              'Todas as props nativas de input (value, defaultValue, onChange, disabled, readOnly…) são repassadas ao campo interno. O campo só é controlado quando value é passado.',
          },
          { name: 'className', type: 'string', description: 'Classe CSS adicional do contêiner.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof SearchInput> = {
  title: 'UnooriaAI/Componentes/SearchInput',
  component: SearchInput,
  parameters: { layout: 'padded' },
  argTypes: {
    glyph: {
      control: false,
      description: 'Glifo antes do campo (nó React). Padrão: ícone search.',
    },
    block: { control: 'boolean', description: 'Ocupa toda a largura do contêiner.' },
    placeholder: { control: 'text', description: 'Texto do espaço reservado.' },
    defaultValue: { control: 'text', description: 'Valor inicial do campo.' },
    disabled: { control: 'boolean', description: 'Desabilita o campo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    block: false,
    placeholder: 'Buscar conversas',
    defaultValue: '',
    disabled: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof SearchInput>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SearchInputDocumentationPage />,
};

/**
 * Playground com todas as propriedades do SearchInput expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SearchInput',
  render: (args) => (
    <div
      data-uai-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        background: 'var(--uai-bg-secondary)',
        border: '1px solid var(--uai-border-default)',
      }}
    >
      <SearchInput {...args} />
    </div>
  ),
};

/**
 * O campo na medida canônica, 260 × 36.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <div
      style={{
        padding: 16,
        border: '1px solid var(--uai-border-default)',
        borderRadius: 8,
        width: 292,
        boxSizing: 'border-box',
      }}
    >
      <SearchInput readOnly />
    </div>
  ),
};

/**
 * Filtro funcional sobre a lista de conversas. O `play` digita no campo e
 * confere que só as conversas que casam permanecem na lista.
 */
export const Estados: Story = {
  render: function FiltroFuncional() {
    const [busca, setBusca] = React.useState('');
    const filtradas = uaiConversations.filter((item) =>
      item.toLowerCase().includes(busca.trim().toLowerCase())
    );
    return (
      <div style={{ width: 300, display: 'grid', gap: 12 }}>
        <SearchInput
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          aria-label="Filtrar conversas"
          block
        />
        <div style={{ display: 'grid', gap: 4 }}>
          {filtradas.length === 0 ? (
            <span style={{ fontSize: 13, color: 'var(--uai-text-secondary)' }}>
              Nenhuma conversa encontrada.
            </span>
          ) : (
            filtradas.map((item) => (
              <NavItem key={item} icon="chatBubble">
                {item}
              </NavItem>
            ))
          )}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const campo = canvas.getByRole('searchbox', { name: 'Filtrar conversas' });

    await expect(canvas.getAllByRole('button')).toHaveLength(uaiConversations.length);

    await userEvent.type(campo, 'código');
    await expect(canvas.getAllByRole('button')).toHaveLength(1);
    await expect(canvas.getByText('Revisão de código')).toBeInTheDocument();

    await userEvent.clear(campo);
    await userEvent.type(campo, 'zzz');
    await expect(canvas.getByText('Nenhuma conversa encontrada.')).toBeInTheDocument();
  },
};
