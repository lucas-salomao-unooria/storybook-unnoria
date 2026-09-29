import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { MediaGrid } from '../../../src/unoovista/components/MediaGrid';
import { SegmentedTabs } from '../../../src/unoovista/components/SegmentedTabs';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocCard,
  UnvDocGrid,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocStage,
  UnvDocThemeSwitcher,
  UnvDocPropsTable,
} from '../../../.storybook/components';
import { unvGridItems, unvPickerItems } from '../fixtures';

const BAR = '#716C98';

/**
 * Seleção múltipla controlada, com limite de três. A grade não guarda seleção:
 * quem decide entrar, sair e o limite é o produto.
 */
const SelecaoMultipla: React.FC<{ theme?: 'light' | 'dark'; limite?: number }> = ({
  theme,
  limite = 3,
}) => {
  const [ids, setIds] = useState<string[]>([]);

  return (
    <div style={{ width: 375 }}>
      <MediaGrid
        theme={theme}
        items={unvPickerItems}
        columns={4}
        ariaLabel="Recentes"
        selectable
        selectedIds={ids}
        onToggle={(item) =>
          setIds((atual) =>
            atual.includes(item.id)
              ? atual.filter((id) => id !== item.id)
              : atual.length >= limite
                ? atual
                : [...atual, item.id]
          )
        }
      />
    </div>
  );
};

/**
 * Página de documentação rica do componente MediaGrid.
 */
const MediaGridDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Conteúdo"
      title="MediaGrid"
      description="Grade de publicações do perfil e da busca: três colunas com espaço de 4px entre blocos de cantos arredondados, no lugar de um mosaico colado. O indicador de vídeo é uma cápsula translúcida no canto inferior, e o modo de seleção acrescenta o círculo numerado na ordem de escolha."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma grade, dois contextos, dois tipos de mídia."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🔲" title="Blocos quadrados e arredondados">
        Cada bloco mantém proporção 1:1 com <code>object-fit: cover</code> e raio de{' '}
        <code>--unv-radius-s</code>, alinhado independentemente da imagem de origem.
      </UnvDocCard>
      <UnvDocCard icon="📏" title="Espaço de 4px">
        Os blocos respiram: o espaço vem de <code>--unv-spacing-3xs</code> e mostra a superfície da
        tela. A prop <code>gap</code> ajusta o valor em pixels quando a tela pede outro.
      </UnvDocCard>
      <UnvDocCard icon="🎬" title="Indicador de vídeo">
        O tipo <code>video</code> sobrepõe uma cápsula de véu translúcido com o glifo em branco de
        mídia, legível sobre qualquer imagem.
      </UnvDocCard>
      <UnvDocCard icon="♿" title="Lista semântica">
        A grade declara <code>role=&quot;list&quot;</code> e cada bloco{' '}
        <code>role=&quot;listitem&quot;</code>, com o <code>alt</code> descrevendo a mídia.
      </UnvDocCard>
      <UnvDocCard icon="🔢" title="Seleção múltipla">
        Com <code>selectable</code>, cada bloco vira um botão com <code>aria-pressed</code> e ganha o
        círculo numerado na ordem de escolha, sobre o roxo de ação. A ordem vem de{' '}
        <code>selectedIds</code>; o toque chama <code>onToggle</code>.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UnvDocSpecs
      component="MediaGrid"
      layout="Grade · 3 colunas · espaço 4px"
      specs={[
        { label: 'Colunas', value: '3 (ajustável)' },
        { label: 'Espaço entre blocos', value: '--unv-spacing-3xs (4px)' },
        { label: 'Raio dos blocos', value: '--unv-radius-s (8px)' },
        { label: 'Indicador de vídeo', value: 'cápsula · base-esquerda · 8px' },
        { label: 'Círculo de seleção', value: '24px · topo-direita · 8px' },
        { label: 'Selecionado', value: 'action-primary · text-on-action' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Grade com espaço e cantos',
          detail:
            'os blocos têm raio de 8px e 4px entre si; a grade não pinta fundo, então os espaços mostram a superfície da tela (secundária) e cada bloco se destaca dela. O padrão da prop gap deixou de ser 1px: sem valor, vale o token de espaçamento.',
        },
        {
          subject: 'Indicador de vídeo em cápsula no canto inferior',
          detail:
            'no lugar de um glifo solto com sombra, o glifo (branco de mídia) fica numa cápsula de --unv-color-overlay-scrim, no canto inferior esquerdo, nos dois modos. Mesmo sobre uma fotografia branca o glifo mede 3,5:1, acima dos 3:1 de gráfico.',
        },
        {
          subject: 'Círculo de seleção com número em text-on-action',
          detail:
            'livre, o círculo é branco de mídia de 2px sobre o véu; escolhido, preenche com action-primary e mostra a ordem em text-on-action. O par mede 4,88:1 no tema claro (branco sobre #716C98) e 8,27:1 no escuro (#080922 sobre #AAA5C2). O branco de mídia sobre o roxo do tema escuro mediria 2,37:1 e por isso não é usado.',
        },
        {
          subject: 'Contorno de destaque no bloco escolhido',
          detail:
            'além do círculo, o bloco selecionado ganha um contorno interno de 3px em action-primary. O foco por teclado é um anel externo de 2px e prevalece sobre o contorno de seleção enquanto o bloco está focado.',
        },
        {
          subject: 'Listitem no invólucro',
          detail:
            'no modo de seleção o bloco mantém o papel de botão — aria-pressed não vale em listitem —, e o item de lista passa a um invólucro. A ordem também chega ao leitor de tela pelo nome do botão (“…, 1ª na seleção”). Fora do modo de seleção, a estrutura é a de sempre.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Grade CSS com blocos quadrados e indicadores sobrepostos."
    />
    <UnvDocStage label="Grade de três colunas (375px)" surface="secondary" align="flex-start" padding={16}>
      <div style={{ width: 375 }}>
        <MediaGrid items={unvGridItems} />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UnvDocAnatomy
          zones={[
            {
              name: 'Bloco',
              role: 'Botão quadrado com a imagem de capa, de cantos arredondados.',
              token: '--unv-radius-s · --unv-color-background-tertiary',
            },
            {
              name: 'Indicador de vídeo',
              role: 'Cápsula translúcida com o glifo de vídeo, no canto inferior esquerdo.',
              token: '--unv-color-overlay-scrim · --unv-color-text-on-media',
            },
            {
              name: 'Círculo de seleção',
              role: 'Só no modo de seleção: número da ordem sobre o roxo de ação.',
              token: '--unv-color-action-primary · --unv-color-text-on-action',
            },
            {
              name: 'Contorno de destaque',
              role: 'Contorno interno de 3px no bloco selecionado.',
              token: '--unv-color-action-primary',
            },
          ]}
        />
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Contagem de colunas, espaço e tipos de mídia."
    />
    <UnvDocStage label="Colunas" surface="secondary" align="flex-start" padding={16}>
      {[2, 3, 4].map((columns) => (
        <div key={columns} style={{ width: 240 }}>
          <div
            style={{
              fontSize: 12,
              color: 'var(--unv-color-text-secondary)',
              fontFamily: 'var(--unv-font-sans)',
              marginBottom: 8,
            }}
          >
            columns={columns}
          </div>
          <MediaGrid items={unvGridItems.slice(0, columns * 2)} columns={columns} />
        </div>
      ))}
    </UnvDocStage>

    <UnvDocStage label="Espaço entre blocos" surface="secondary" align="flex-start" padding={16}>
      {[0, 4, 8].map((gap) => (
        <div key={gap} style={{ width: 240 }}>
          <div
            style={{
              fontSize: 12,
              color: 'var(--unv-color-text-secondary)',
              fontFamily: 'var(--unv-font-sans)',
              marginBottom: 8,
            }}
          >
            gap={gap}px {gap === 4 ? '(padrão)' : ''}
          </div>
          <MediaGrid items={unvGridItems.slice(0, 6)} gap={gap} />
        </div>
      ))}
    </UnvDocStage>

    <UnvDocStage label="Tipos de mídia" surface="secondary" align="flex-start" padding={16}>
      <div style={{ width: 375 }}>
        <MediaGrid
          items={[
            { ...unvGridItems[0], type: 'image' },
            { ...unvGridItems[1], type: 'image' },
            { ...unvGridItems[4], type: 'video' },
          ]}
        />
      </div>
    </UnvDocStage>

    <UnvDocStage
      label="Modo de seleção (limite de três, definido pelo produto)"
      surface="secondary"
      align="flex-start"
      padding={16}
    >
      <SelecaoMultipla />
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso da grade." />
    <UnvDocPractices
      dos={[
        'Manter três colunas no perfil e quatro na escolha de imagens.',
        'Descrever cada mídia em alt: é a única informação textual do bloco.',
        'Marcar o tipo video para que a pessoa saiba o que esperar ao tocar.',
        'Deixar a grade sobre a superfície secundária, para os blocos se destacarem dela.',
        'No modo de seleção, guardar selectedIds na ordem de escolha e aplicar o limite em onToggle.',
      ]}
      donts={[
        'Colar os blocos (gap=0) e perder os cantos arredondados: vira um mosaico contínuo.',
        'Misturar proporções diferentes na mesma grade.',
        'Usar espaços largos, que transformam a grade em uma lista de cartões.',
        'Sobrepor mais de um indicador ao mesmo bloco.',
        'Pintar o número do círculo com o branco de mídia: no tema escuro o contraste cai a 2,4:1.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Os blocos e a seleção acompanham o tema; o véu do indicador é invariante."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={16}>
      {(activeTheme) => (
        <div style={{ width: 375 }}>
          <MediaGrid items={unvGridItems.slice(0, 6)} theme={activeTheme} />
          <div style={{ height: 16 }} />
          <MediaGrid
            items={unvGridItems.slice(0, 3)}
            theme={activeTheme}
            selectable
            selectedIds={['2', '1']}
            ariaLabel="Seleção de exemplo"
          />
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do componente MediaGrid."
    />
    <UnvDocPropsTable
      title="MediaGrid"
      rows={[
        { name: 'items', type: 'UnvMediaItem[]', description: 'Blocos exibidos. Obrigatório.' },
        {
          name: 'columns',
          type: 'number',
          default: '3',
          description: 'Quantidade de colunas da grade.',
        },
        {
          name: 'gap',
          type: 'number',
          default: '4 (token)',
          description: 'Espaço entre os blocos em pixels. Sem valor, usa --unv-spacing-3xs.',
        },
        {
          name: 'onSelect',
          type: '(item: UnvMediaItem, index: number) => void',
          description: 'Callback disparado ao selecionar um bloco.',
        },
        {
          name: 'selectable',
          type: 'boolean',
          default: 'false',
          description: 'Modo de seleção múltipla: botões com aria-pressed e círculo numerado.',
        },
        {
          name: 'selectedIds',
          type: 'string[]',
          default: '[]',
          description: 'Selecionados, na ordem de seleção — é ela que numera os círculos.',
        },
        {
          name: 'onToggle',
          type: '(item: UnvMediaItem, index: number) => void',
          description: 'Toque no modo de seleção. O produto decide entrar, sair e o limite.',
        },
        {
          name: 'ariaLabel',
          type: 'string',
          default: "'Publicações'",
          description: 'Rótulo acessível da grade.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Tema usado para resolver as variáveis de cor. Sem valor, herda o do contêiner.',
        },
      ]}
    />
    <UnvDocPropsTable
      title="UnvMediaItem"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único do bloco.' },
        { name: 'src', type: 'string', description: 'URL da imagem de capa.' },
        { name: 'alt', type: 'string', description: 'Texto alternativo da imagem.' },
        {
          name: 'type',
          type: "'image' | 'video'",
          default: "'image'",
          description: 'Tipo de mídia. O valor "video" exibe o indicador sobreposto.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MediaGrid> = {
  title: 'Unoovista/Componentes/MediaGrid',
  component: MediaGrid,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Blocos exibidos na grade.' },
    columns: {
      control: { type: 'range', min: 1, max: 6, step: 1 },
      description: 'Quantidade de colunas.',
    },
    gap: {
      control: { type: 'range', min: 0, max: 16, step: 1 },
      description: 'Espaço entre os blocos em pixels.',
    },
    selectable: { control: 'boolean', description: 'Modo de seleção múltipla.' },
    selectedIds: { control: 'object', description: 'Selecionados, na ordem de seleção.' },
    ariaLabel: { control: 'text', description: 'Rótulo acessível da grade.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onSelect: { action: 'onSelect' },
    onToggle: { action: 'onToggle' },
  },
  args: {
    items: unvGridItems,
    columns: 3,
    gap: 4,
    selectable: false,
    selectedIds: ['3', '1'],
    ariaLabel: 'Publicações',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof MediaGrid>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MediaGridDocumentationPage />,
};

/**
 * Playground com todas as propriedades da MediaGrid expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da MediaGrid',
  render: (args) => (
    <UnvDocStage theme={args.theme} surface="secondary" align="flex-start" padding={16}>
      <div style={{ width: 375 }}>
        <MediaGrid {...args} />
      </div>
    </UnvDocStage>
  ),
};

/**
 * A grade do perfil, sob as abas de seção.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial: grade do perfil',
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={16}>
      <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SegmentedTabs
          items={[
            { id: 'grid', label: 'Publicações em grade', icon: 'grid' },
            { id: 'tagged', label: 'Marcações', icon: 'tagged' },
          ]}
          activeId="grid"
          variant="icon"
          ariaLabel="Seções do perfil"
        />
        <MediaGrid items={unvGridItems} />
      </div>
    </UnvDocStage>
  ),
};

/**
 * Matriz de contagem de colunas.
 */
export const Tamanhos: Story = {
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={16}>
      {[2, 3, 4].map((columns) => (
        <div key={columns} style={{ width: 260 }}>
          <div
            style={{
              fontSize: 12,
              color: 'var(--unv-color-text-secondary)',
              fontFamily: 'var(--unv-font-sans)',
              marginBottom: 8,
            }}
          >
            columns={columns}
          </div>
          <MediaGrid items={unvGridItems.slice(0, columns * 2)} columns={columns} />
        </div>
      ))}
    </UnvDocStage>
  ),
};

/**
 * Indicadores de tipo de mídia.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={16}>
      <div style={{ width: 375 }}>
        <MediaGrid
          items={[
            { ...unvGridItems[0], type: 'image' },
            { ...unvGridItems[1], type: 'image' },
            { ...unvGridItems[4], type: 'video' },
          ]}
        />
      </div>
    </UnvDocStage>
  ),
};

/**
 * A grade nos dois temas, com e sem seleção.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UnvDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={tema}
          surface="secondary"
          align="flex-start"
          direction="column"
          padding={16}
        >
          <div style={{ width: 340 }}>
            <MediaGrid items={unvGridItems.slice(0, 6)} />
          </div>
          <div style={{ width: 340 }}>
            <MediaGrid
              items={unvGridItems.slice(0, 3)}
              selectable
              selectedIds={['2', '1']}
              ariaLabel="Seleção de exemplo"
            />
          </div>
        </UnvDocStage>
      ))}
    </div>
  ),
};

/**
 * Seleção múltipla: a ordem numera os círculos, sair renumera e o limite é do produto.
 */
export const SelecaoMultiplaInterativa: Story = {
  name: 'Seleção Múltipla',
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={16}>
      <SelecaoMultipla />
    </UnvDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    // Os nomes vêm das fixtures: o teste não quebra quando a demonstração muda.
    const [primeira, segunda, terceira, quarta] = unvPickerItems
      .filter((item) => item.type === 'image')
      .map((item) => item.alt);
    const bloco = (nome: string) => tela.getByRole('button', { name: nome });
    const a = bloco(primeira);
    const b = bloco(segunda);

    await userEvent.click(a);
    await userEvent.click(b);
    await expect(a).toHaveAttribute('aria-pressed', 'true');
    await expect(a).toHaveAccessibleName(`${primeira}, 1ª na seleção`);
    await expect(b).toHaveAccessibleName(`${segunda}, 2ª na seleção`);

    await userEvent.click(bloco(terceira));
    await userEvent.click(bloco(quarta));
    // Limite de 3: o quarto bloco não entra na seleção.
    await expect(bloco(quarta)).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(a);
    await expect(a).toHaveAttribute('aria-pressed', 'false');
    await expect(b).toHaveAccessibleName(`${segunda}, 1ª na seleção`);
  },
};
