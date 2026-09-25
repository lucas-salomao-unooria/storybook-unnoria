import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { MediaGrid } from '../../../src/instanooria/components/MediaGrid';
import { SegmentedTabs } from '../../../src/instanooria/components/SegmentedTabs';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocDeviations,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaGridItems, instaPickerItems } from '../fixtures';

/**
 * Seleção múltipla controlada, com limite de três — como na missão "A Seleção".
 * A grade não guarda seleção: quem decide entrar, sair e o limite é o produto.
 */
const SelecaoMultipla: React.FC<{ theme?: 'light' | 'dark'; limite?: number }> = ({
  theme = 'light',
  limite = 3,
}) => {
  const [ids, setIds] = useState<string[]>([]);

  return (
    <div style={{ width: 375 }}>
      <MediaGrid
        theme={theme}
        items={instaPickerItems}
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
      badgeBrand="Instanooria"
      category="Componentes • Conteúdo"
      title="MediaGrid"
      description="Grade de publicações do perfil e da tela Buscar. Reproduz a estrutura de três colunas com calha de 1px do Figma e o indicador de vídeo sobreposto ao canto superior direito dos blocos correspondentes."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Uma grade, dois contextos, três tipos de mídia."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🔲" title="Blocos quadrados">
        Cada bloco mantém proporção 1:1 com <code>object-fit: cover</code>, garantindo alinhamento
        perfeito independentemente da imagem de origem.
      </InstaDocCard>
      <InstaDocCard icon="📏" title="Calha de 1px">
        A separação é mínima e proposital: a grade lê como um mosaico contínuo, não como uma lista de
        cartões.
      </InstaDocCard>
      <InstaDocCard icon="🎬" title="Indicador de vídeo">
        O tipo <code>video</code> sobrepõe um glifo branco com sombra sutil, legível sobre qualquer
        imagem. O arquivo de design não define indicador de carrossel na grade.
      </InstaDocCard>
      <InstaDocCard icon="♿" title="Lista semântica">
        A grade declara <code>role=&quot;list&quot;</code> e cada bloco{' '}
        <code>role=&quot;listitem&quot;</code>, com o <code>alt</code> descrevendo a mídia.
      </InstaDocCard>
      <InstaDocCard icon="🔢" title="Seleção múltipla">
        Com <code>selectable</code>, é a grade do “SELECT MULTIPLE”: cada bloco vira um botão com{' '}
        <code>aria-pressed</code> e ganha o círculo numerado na ordem de escolha. A ordem vem de{' '}
        <code>selectedIds</code>; o toque chama <code>onToggle</code>.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do frame Posts do perfil."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2663"
      frameName="Instagram Profile → Posts"
      specs={[
        { label: 'Colunas', value: '3' },
        { label: 'Bloco', value: '124 × 124px' },
        { label: 'Calha', value: '1px' },
        { label: 'Largura total', value: '375px' },
        { label: 'Indicador de vídeo', value: '20 × 14px' },
        { label: 'Posição do indicador', value: 'topo-direita · 8px' },
        { label: 'Seleção (0:3163)', value: 'círculo de 24px · topo-direita · 8px' },
        { label: 'Selecionado', value: 'action-primary · número Caption/Large' },
      ]}
    />
    <InstaDocDeviations
      items={[
        {
          subject: 'Círculo de seleção sem quadro',
          detail:
            'a tela de adicionar imagem (0:1366 / 0:3163) publica o botão “Select multiple” (0:3218), não o estado de seleção de cada bloco. O círculo é o do app real: branco de 1px sobre o overlay-scrim quando livre, o azul de ação com o número da ordem quando escolhido.',
        },
        {
          subject: 'Indicador de vídeo desce no modo de seleção',
          detail:
            'o canto superior direito passa ao círculo; o glifo de vídeo vai para o inferior direito, onde o quadro de adicionar imagem põe a duração (0:3182).',
        },
        {
          subject: 'Listitem no invólucro',
          detail:
            'no modo de seleção o bloco mantém o papel de botão — aria-pressed não vale em listitem —, e o item de lista passa a um invólucro. Fora dele, a estrutura é a mesma de antes.',
        },
        {
          subject: 'Contraste do número',
          detail:
            'branco sobre o azul de ação mede 3,06:1, abaixo dos 4,5:1 de texto de 12px. A ordem também chega ao leitor de tela pelo nome do botão (“…, 1ª na seleção”). Ressalva aberta, a mesma do Button primário.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Grade CSS com blocos quadrados e indicador sobreposto."
    />
    <InstaDocStage label="Grade de três colunas (375px)" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <MediaGrid items={instaGridItems} />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes"
      description="Contagem de colunas, calha e tipos de mídia."
    />
    <InstaDocStage label="Colunas" align="flex-start" padding={0}>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {[2, 3, 4].map((columns) => (
          <div key={columns} style={{ width: 240 }}>
            <div style={{ fontSize: 12, color: '#475157', marginBottom: 8 }}>
              columns={columns}
            </div>
            <MediaGrid items={instaGridItems.slice(0, columns * 2)} columns={columns} />
          </div>
        ))}
      </div>
    </InstaDocStage>

    <InstaDocStage label="Calha" align="flex-start" padding={0}>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {[0, 1, 4].map((gap) => (
          <div key={gap} style={{ width: 240 }}>
            <div style={{ fontSize: 12, color: '#475157', marginBottom: 8 }}>gap={gap}px</div>
            <MediaGrid items={instaGridItems.slice(0, 6)} gap={gap} />
          </div>
        ))}
      </div>
    </InstaDocStage>

    <InstaDocStage label="Tipos de mídia" align="flex-start" padding={0}>
      <div style={{ width: 375 }}>
        <MediaGrid
          items={[
            { ...instaGridItems[0], type: 'image' },
            { ...instaGridItems[1], type: 'image' },
            { ...instaGridItems[4], type: 'video' },
          ]}
        />
      </div>
    </InstaDocStage>

    <InstaDocStage label="Modo de seleção — “SELECT MULTIPLE” (limite de três pelo produto)" align="flex-start" padding={0}>
      <SelecaoMultipla />
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de grade verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Manter três colunas no perfil, replicando o arquivo original.',
        'Descrever cada mídia em alt — é a única informação textual do bloco.',
        'Marcar o tipo video para que a pessoa saiba o que esperar ao tocar.',
        'Usar gap=1 para preservar a leitura de mosaico contínuo.',
        'No modo de seleção, guardar selectedIds na ordem de escolha e aplicar o limite em onToggle.',
      ]}
      donts={[
        'Aplicar raio de borda aos blocos: a grade do arquivo é retangular.',
        'Misturar proporções diferentes na mesma grade.',
        'Usar gaps largos, que transformam a grade em uma lista de cartões.',
        'Sobrepor mais de um indicador ao mesmo bloco.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="O fundo da grade acompanha a superfície primary; os indicadores são sempre brancos."
    />
    <InstaDocThemeSwitcher padding={0}>
      {(activeTheme) => (
        <div style={{ width: 375 }}>
          <MediaGrid items={instaGridItems.slice(0, 6)} theme={activeTheme} />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente MediaGrid."
    />
    <InstaDocPropsTable
      title="MediaGrid"
      rows={[
        { name: 'items', type: 'InstaMediaItem[]', description: 'Blocos exibidos. Obrigatório.' },
        {
          name: 'columns',
          type: 'number',
          default: '3',
          description: 'Quantidade de colunas da grade.',
        },
        {
          name: 'gap',
          type: 'number',
          default: '1',
          description: 'Espaço entre os blocos em pixels.',
        },
        {
          name: 'onSelect',
          type: '(item: InstaMediaItem, index: number) => void',
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
          type: '(item: InstaMediaItem, index: number) => void',
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
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
      ]}
    />
    <InstaDocPropsTable
      title="InstaMediaItem"
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
  title: 'Instanooria/Componentes/MediaGrid',
  component: MediaGrid,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Blocos exibidos na grade.' },
    columns: {
      control: { type: 'range', min: 1, max: 6, step: 1 },
      description: 'Quantidade de colunas.',
    },
    gap: {
      control: { type: 'range', min: 0, max: 12, step: 1 },
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
    items: instaGridItems,
    columns: 3,
    gap: 1,
    selectable: false,
    selectedIds: ['3', '1'],
    ariaLabel: 'Publicações',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof MediaGrid>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
    <div
      data-insta-theme={args.theme}
      style={{
        width: 375,
        borderRadius: 12,
        border: '1px solid #E4E8E9',
        overflow: 'hidden',
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
      }}
    >
      <MediaGrid {...args} />
    </div>
  ),
};

/**
 * Réplica da grade do perfil do arquivo oficial do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <SegmentedTabs
        items={[
          { id: 'grid', label: 'Publicações em grade', icon: 'grid' },
          { id: 'tagged', label: 'Marcações', icon: 'tagged' },
        ]}
        activeId="grid"
        variant="icon"
        ariaLabel="Seções do perfil"
      />
      <MediaGrid items={instaGridItems} />
    </div>
  ),
};

/**
 * Matriz de contagem de colunas.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {[2, 3, 4].map((columns) => (
        <div key={columns} style={{ width: 260 }}>
          <div style={{ fontSize: 12, color: '#475157', marginBottom: 8 }}>columns={columns}</div>
          <MediaGrid items={instaGridItems.slice(0, columns * 2)} columns={columns} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Indicadores de tipo de mídia.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <MediaGrid
        items={[
          { ...instaGridItems[0], type: 'image' },
          { ...instaGridItems[1], type: 'image' },
          { ...instaGridItems[4], type: 'video' },
        ]}
      />
    </div>
  ),
};

/**
 * Seleção múltipla: a ordem numera os círculos, sair renumera e o limite é do produto.
 */
export const SelecaoMultiplaInterativa: Story = {
  name: 'Seleção Múltipla',
  render: () => <SelecaoMultipla />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const floresta = tela.getByRole('button', { name: 'Floresta ao amanhecer' });
    const montanhas = tela.getByRole('button', { name: 'Montanhas' });

    await userEvent.click(montanhas);
    await userEvent.click(floresta);
    await expect(montanhas).toHaveAttribute('aria-pressed', 'true');
    await expect(montanhas).toHaveAccessibleName('Montanhas, 1ª na seleção');
    await expect(floresta).toHaveAccessibleName('Floresta ao amanhecer, 2ª na seleção');

    await userEvent.click(tela.getByRole('button', { name: 'Turbinas eólicas' }));
    await userEvent.click(tela.getByRole('button', { name: 'Estação de trabalho' }));
    await expect(tela.getByRole('button', { name: 'Estação de trabalho' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );

    await userEvent.click(montanhas);
    await expect(montanhas).toHaveAttribute('aria-pressed', 'false');
    await expect(floresta).toHaveAccessibleName('Floresta ao amanhecer, 1ª na seleção');
  },
};
