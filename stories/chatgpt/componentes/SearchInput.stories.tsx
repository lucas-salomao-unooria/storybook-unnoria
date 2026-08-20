import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from '../../../src/chatgpt/components/SearchInput';
import { NavItem, Sidebar } from '../../../src/chatgpt/components';
import { gptGlyphs } from '../../../src/chatgpt/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  GptDocCard,
  GptDocGrid,
  GptDocFigmaSpecs,
  GptDocPractices,
  GptDocPropsTable,
  GptDocStage,
  GptDocThemeSwitcher,
} from '../../../.storybook/components';
import { gptConversations, gptFigmaNodes } from '../fixtures';

/**
 * Página de documentação rica do componente SearchInput.
 */
const SearchInputDocumentationPage = () => {
  const [busca, setBusca] = React.useState('');
  const filtradas = gptConversations.filter((item) =>
    item.toLowerCase().includes(busca.trim().toLowerCase())
  );

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="ChatGPT"
        category="Componentes • Formulário"
        title="SearchInput"
        description="Réplica do componente SearchInput da página 🟡 Design system: campo de 260 × 36 com padding 8/12, gap 8, raio 8 e superfície translúcida de 4%. Glifo e placeholder compartilham o texto a 40% de opacidade. É o campo de busca de conversas no topo da barra lateral."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Um campo de filtro sem contorno, desenhado para viver dentro da barra lateral."
        barColor="#5856D6"
      />
      <GptDocGrid>
        <GptDocCard icon="🔍" title="Busca de conversas">
          O uso canônico: filtrar a lista de conversas conforme o usuário digita, sem botão de
          submissão.
        </GptDocCard>
        <GptDocCard icon="🫥" title="Sem contorno">
          A separação vem da superfície translúcida de 4%, não de borda — é o que o distingue do{' '}
          <code>Input</code>, que tem contorno de 1px.
        </GptDocCard>
        <GptDocCard icon="📐" title="Compacto">
          36px de altura contra os 44 do <code>Input</code>: a barra lateral é densa e o campo
          precisa ceder espaço às conversas.
        </GptDocCard>
        <GptDocCard icon="🔤" title="type=search">
          O elemento nativo é <code>type="search"</code>, com o botão de limpar do navegador
          neutralizado para preservar o desenho.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Medidas lidas do componente via Plugin API."
        barColor="#5856D6"
      />
      <GptDocFigmaSpecs
        nodeId={gptFigmaNodes.searchInput}
        frameName="SearchInput (componente único)"
        specs={[
          { label: 'Dimensões', value: '260 × 36' },
          { label: 'Padding', value: '8/12' },
          { label: 'Gap', value: '8px · spacing/4' },
          { label: 'Raio', value: '8px · radius/md' },
          { label: 'Superfície', value: 'preto a 4% · --gpt-fill-4' },
          { label: 'Glifo e placeholder', value: 'preto a 40% · 14px' },
        ]}
        deviations={[
          'A altura de 36px é literal: não há degrau equivalente em Primitives/Spacing nem em Primitives/Sizing.',
          'O arquivo não publica estado de foco. O componente escurece a superfície para --gpt-fill-10 em :focus-within, degrau vizinho na mesma escada.',
          'O glifo ⌕ é um caractere tipográfico da camada de texto do arquivo, não um ícone vetorial — ver a seção Fundamentos › Glifos.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Superfície translúcida, glifo fixo e campo elástico."
        barColor="#5856D6"
      />
      <GptDocGrid min={260}>
        <GptDocCard icon="▭" title="Superfície">
          Retângulo de raio 8 preenchido a 4%, sem contorno. Reage ao foco por{' '}
          <code>:focus-within</code>.
        </GptDocCard>
        <GptDocCard icon="⌕" title="glyph">
          Slot antes do campo, marcado <code>aria-hidden</code>, a 40% de opacidade.
        </GptDocCard>
        <GptDocCard icon="🔤" title="Campo">
          <code>flex: 1 1 auto</code> com <code>min-width: 0</code>. Todas as props nativas passam
          por spread.
        </GptDocCard>
        <GptDocCard icon="↔️" title="block">
          Ocupa 100% da largura — o modo usado dentro da <code>Sidebar</code>, onde a calha já
          define a medida.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="4. Matriz de Estados e Composição"
        description="Repouso, com valor, em largura total e filtrando uma lista real."
        barColor="#5856D6"
      />
      <GptDocStage label="Estados" direction="column" align="flex-start">
        <SearchInput readOnly />
        <SearchInput defaultValue="tokens" />
        <SearchInput disabled />
        <div style={{ width: '100%' }}>
          <SearchInput block placeholder="Ocupa a largura toda" />
        </div>
      </GptDocStage>
      <GptDocStage label="Filtro funcional sobre a lista de conversas" direction="column" align="flex-start">
        <SearchInput value={busca} onChange={(event) => setBusca(event.target.value)} block />
        <div style={{ width: '100%', display: 'grid', gap: 4 }}>
          {filtradas.length === 0 ? (
            <span style={{ fontSize: 13, color: '#475157' }}>Nenhuma conversa encontrada.</span>
          ) : (
            filtradas.map((item) => (
              <NavItem key={item} glyph={gptGlyphs.chat}>
                {item}
              </NavItem>
            ))
          )}
        </div>
      </GptDocStage>
      <GptDocStage label="Dentro da barra lateral">
        <Sidebar height={320}>
          <Sidebar.NewChatButton />
          <SearchInput block />
          <Sidebar.SectionLabel>Today</Sidebar.SectionLabel>
          {gptConversations.slice(0, 3).map((item, index) => (
            <NavItem key={item} glyph={gptGlyphs.chat} state={index === 0 ? 'active' : 'default'}>
              {item}
            </NavItem>
          ))}
        </Sidebar>
      </GptDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas Práticas"
        description="Regras de busca."
        barColor="#5856D6"
      />
      <GptDocPractices
        dos={[
          'Filtrar conforme o usuário digita, sem exigir submissão.',
          'Passar block quando o campo estiver dentro da Sidebar, deixando a calha definir a largura.',
          'Manter aria-label ou um rótulo associado quando o placeholder não bastar como nome.',
          'Exibir estado vazio explícito quando o filtro não retorna nada.',
        ]}
        donts={[
          'Usar o SearchInput em formulário — para isso existe o Input, com contorno e 44px.',
          'Adicionar botão de submissão: a busca é incremental.',
          'Trocar a superfície translúcida por contorno, o que o transforma visualmente em Input.',
          'Colocar o glifo depois do campo: o arquivo o fixa antes.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a Temas"
        description="A superfície e o texto seguem a escada translúcida, espelhada em branco no Dark."
        barColor="#5856D6"
      />
      <GptDocThemeSwitcher direction="column">
        {() => (
          <>
            <SearchInput block readOnly />
            <SearchInput block defaultValue="design system" />
          </>
        )}
      </GptDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente SearchInput."
        barColor="#5856D6"
      />
      <GptDocPropsTable
        title="SearchInput"
        rows={[
          {
            name: 'glyph',
            type: 'React.ReactNode',
            default: 'gptGlyphs.search',
            description: 'Glifo renderizado antes do campo, marcado como aria-hidden.',
          },
          {
            name: 'block',
            type: 'boolean',
            default: 'false',
            description: 'Ocupa toda a largura disponível em vez dos 260px do arquivo.',
          },
          {
            name: 'placeholder',
            type: 'string',
            default: "'Search chats'",
            description: 'Texto do placeholder, a 40% de opacidade.',
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
              'Todas as props nativas de input (value, onChange, disabled, readOnly…) são repassadas ao campo interno.',
          },
          { name: 'className', type: 'string', description: 'Classe CSS adicional do contêiner.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof SearchInput> = {
  title: 'ChatGPT/Componentes/SearchInput',
  component: SearchInput,
  parameters: { layout: 'padded' },
  argTypes: {
    glyph: { control: 'text', description: 'Glifo antes do campo.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura do contêiner.' },
    placeholder: { control: 'text', description: 'Texto do placeholder.' },
    defaultValue: { control: 'text', description: 'Valor inicial do campo.' },
    disabled: { control: 'boolean', description: 'Desabilita o campo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    glyph: gptGlyphs.search,
    block: false,
    placeholder: 'Search chats',
    defaultValue: '',
    disabled: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof SearchInput>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <SearchInput {...args} />
    </div>
  ),
};

/**
 * Réplica visual do componente publicado no Figma — 260 × 36.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ padding: 16, border: '1px solid #E4E8E9', borderRadius: 5, width: 292 }}>
      <SearchInput readOnly />
    </div>
  ),
};

/**
 * Filtro funcional sobre a lista de conversas.
 */
export const Estados: Story = {
  render: function FiltroFuncional() {
    const [busca, setBusca] = React.useState('');
    const filtradas = gptConversations.filter((item) =>
      item.toLowerCase().includes(busca.trim().toLowerCase())
    );
    return (
      <div style={{ width: 300, display: 'grid', gap: 12 }}>
        <SearchInput value={busca} onChange={(event) => setBusca(event.target.value)} block />
        <div style={{ display: 'grid', gap: 4 }}>
          {filtradas.length === 0 ? (
            <span style={{ fontSize: 13, color: '#475157' }}>Nenhuma conversa encontrada.</span>
          ) : (
            filtradas.map((item) => (
              <NavItem key={item} glyph={gptGlyphs.chat}>
                {item}
              </NavItem>
            ))
          )}
        </div>
      </div>
    );
  },
};
