import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tag } from '../../../src/chatgpt/components/Tag';
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
import { gptFigmaNodes, gptPromptSuggestions } from '../fixtures';

/**
 * Página de documentação rica do componente Tag.
 */
const TagDocumentationPage = () => {
  const [selecionada, setSelecionada] = React.useState<string>('Brainstorm');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="ChatGPT"
        category="Componentes • Seleção"
        title="Tag"
        description="Réplica do conjunto Tag da página 🟡 Design system: cápsula de 33px com padding 8/16, gap 6, raio 20 e rótulo Inter Regular de 14px, nos estados Default (superfície translúcida de 4%) e Selected (superfície bg/inverse). É a sugestão de prompt da tela de nova conversa."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Um controle de seleção com dois estados publicados."
        barColor="#5856D6"
      />
      <GptDocGrid>
        <GptDocCard icon="✦" title="Sugestão de prompt">
          O uso canônico do arquivo: cápsulas com o glifo <code>✦</code> oferecendo pontos de
          partida na tela vazia — <em>Brainstorm</em>, <em>Create an image</em>,{' '}
          <em>Search the web</em>.
        </GptDocCard>
        <GptDocCard icon="⚫" title="Estado Selected">
          Superfície <code>bg/inverse</code> com rótulo e glifo invertidos. O contraste máximo
          sinaliza que a sugestão passou a filtrar a conversa.
        </GptDocCard>
        <GptDocCard icon="🔘" title="Semântica de botão">
          Renderizado como <code>button</code> com <code>aria-pressed</code>, que é a semântica
          correta para um alternador de seleção.
        </GptDocCard>
        <GptDocCard icon="🔤" title="Glifo opcional">
          A prop <code>glyph</code> aceita qualquer nó. Sem ela, a cápsula fica só com o rótulo,
          útil em filtros textuais.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Medidas lidas do conjunto de variantes via Plugin API."
        barColor="#5856D6"
      />
      <GptDocFigmaSpecs
        nodeId={gptFigmaNodes.tag}
        frameName="Tag (State · 2 variantes)"
        specs={[
          { label: 'Padding', value: '8/16 · spacing/4 e spacing/6' },
          { label: 'Gap', value: '6px · spacing/3' },
          { label: 'Raio', value: '20px · radius/2xl' },
          { label: 'Altura', value: '33px (derivada)' },
          { label: 'Tipografia', value: 'Inter Regular · 14/20 (Body/SM)' },
          { label: 'Default', value: 'preto a 4% · --gpt-fill-4' },
        ]}
        deviations={[
          'O arquivo não publica estado de hover. O componente escurece a cápsula Default para --gpt-fill-10 em hover, degrau vizinho na mesma escada, e mantém Selected inalterado por já estar no contraste máximo.',
          'O glifo ✦ está fixo na variante do Figma; na API ele é opcional para permitir filtros puramente textuais.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Glifo e rótulo em uma cápsula de altura derivada."
        barColor="#5856D6"
      />
      <GptDocGrid min={260}>
        <GptDocCard icon="✦" title="glyph">
          Slot antes do rótulo, marcado <code>aria-hidden</code>. Herda a cor do estado.
        </GptDocCard>
        <GptDocCard icon="🔤" title="Rótulo">
          <code>children</code> em <code>Body/SM</code>, sem quebra de linha.
        </GptDocCard>
        <GptDocCard icon="🔁" title="selected">
          Alterna entre as duas variantes publicadas e reflete o valor em{' '}
          <code>aria-pressed</code>.
        </GptDocCard>
        <GptDocCard icon="🎯" title="Foco">
          Anel de 2px em <code>border/brand</code>, visível na navegação por teclado.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="4. Matriz de Estados"
        description="As duas variantes publicadas e uma trilha de seleção interativa."
        barColor="#5856D6"
      />
      <GptDocStage label="State=Default e State=Selected">
        <Tag glyph={gptGlyphs.sparkle}>Brainstorm</Tag>
        <Tag glyph={gptGlyphs.sparkle} selected>
          Brainstorm
        </Tag>
        <Tag>Sem glifo</Tag>
        <Tag selected>Sem glifo selecionada</Tag>
        <Tag glyph={gptGlyphs.sparkle} disabled>
          Desabilitada
        </Tag>
      </GptDocStage>
      <GptDocStage label="Seleção única interativa — clique para alternar">
        {gptPromptSuggestions.map((label) => (
          <Tag
            key={label}
            glyph={gptGlyphs.sparkle}
            selected={selecionada === label}
            onClick={() => setSelecionada(label)}
          >
            {label}
          </Tag>
        ))}
      </GptDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas Práticas"
        description="Regras de seleção."
        barColor="#5856D6"
      />
      <GptDocPractices
        dos={[
          'Manter os rótulos curtos — a cápsula não quebra linha.',
          'Usar aria-pressed (já aplicado pelo componente) para que leitores de tela anunciem o estado.',
          'Agrupar as cápsulas em um contêiner com wrap, como faz a tela de nova conversa.',
          'Reservar Selected a uma cápsula por grupo quando a seleção for única.',
        ]}
        donts={[
          'Usar Tag como indicador de estado passivo — para isso existe o Badge.',
          'Aplicar Selected a várias cápsulas em um grupo de seleção única.',
          'Colocar mais de um glifo por cápsula.',
          'Trocar o raio de 20px por um valor menor: a cápsula perde a forma publicada.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a Temas"
        description="Default acompanha a escada translúcida; Selected inverte junto com bg/inverse."
        barColor="#5856D6"
      />
      <GptDocThemeSwitcher>
        {() => (
          <>
            <Tag glyph={gptGlyphs.sparkle}>Brainstorm</Tag>
            <Tag glyph={gptGlyphs.sparkle} selected>
              Brainstorm
            </Tag>
            <Tag>Research</Tag>
          </>
        )}
      </GptDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente Tag."
        barColor="#5856D6"
      />
      <GptDocPropsTable
        title="Tag"
        rows={[
          {
            name: 'selected',
            type: 'boolean',
            default: 'false',
            description: 'Estado de seleção — true corresponde à variante State=Selected.',
          },
          {
            name: 'glyph',
            type: 'React.ReactNode',
            description: 'Glifo antes do rótulo. O arquivo usa ✦ (gptGlyphs.sparkle).',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Desabilita a interação e aplica 40% de opacidade.',
          },
          {
            name: 'theme',
            type: "'light' | 'dark'",
            description:
              'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
          },
          { name: 'children', type: 'React.ReactNode', description: 'Rótulo da cápsula.' },
          { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Tag> = {
  title: 'ChatGPT/Componentes/Tag',
  component: Tag,
  parameters: { layout: 'padded' },
  argTypes: {
    selected: { control: 'boolean', description: 'Estado de seleção.' },
    glyph: { control: 'text', description: 'Glifo antes do rótulo.' },
    disabled: { control: 'boolean', description: 'Desabilita a interação.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Rótulo da cápsula.' },
  },
  args: {
    selected: false,
    glyph: gptGlyphs.sparkle,
    disabled: false,
    theme: 'light',
    children: 'Brainstorm',
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TagDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Tag expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Tag',
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
      <Tag {...args} />
    </div>
  ),
};

/**
 * Réplica visual do conjunto de variantes publicado no Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        padding: 16,
        border: '1px solid #E4E8E9',
        borderRadius: 5,
      }}
    >
      <Tag glyph={gptGlyphs.sparkle}>Brainstorm</Tag>
      <Tag glyph={gptGlyphs.sparkle} selected>
        Brainstorm
      </Tag>
    </div>
  ),
};

/**
 * Grupo de seleção única, como aparece na tela de nova conversa.
 */
export const Estados: Story = {
  render: function GrupoDeSelecao() {
    const [ativa, setAtiva] = React.useState<string>('Create an image');
    return (
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', maxWidth: 620 }}>
        {gptPromptSuggestions.map((label) => (
          <Tag
            key={label}
            glyph={gptGlyphs.sparkle}
            selected={ativa === label}
            onClick={() => setAtiva(label)}
          >
            {label}
          </Tag>
        ))}
      </div>
    );
  },
};
