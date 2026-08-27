import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PlanTag } from '../../../src/chatgpt/components/PlanTag';
import { Logo } from '../../../src/chatgpt/components/Logo';
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
  GptDocTokenSwatch,
} from '../../../.storybook/components';
import { gptWebClientNodes } from '../fixtures';

/**
 * Página de documentação rica do componente PlanTag.
 */
const PlanTagDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Componentes • Indicadores"
      title="PlanTag"
      description="Réplica da cápsula Tag que segue o logotipo na tela New chat - V1 - A: 32 × 20 com padding 2/4, raio 4 e rótulo Inter Regular de 12/16 em branco sobre color/purple/400. É o único alvo da tela que não muda entre os temas."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Um indicador de plano, não um selo de estado."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="✨" title="Plano da conta">
        O uso canônico do arquivo: a cápsula <code>Plus</code> à direita do logotipo, anunciando a
        assinatura ativa.
      </GptDocCard>
      <GptDocCard icon="🔒" title="Cor invariante">
        O arquivo pinta <code>#ADADFB</code> nas duas versões da tela. A superfície vem da
        primitiva <code>--gpt-color-purple-400</code>, e não de um alias semântico — passar por um
        semântico faria a cápsula trocar de cor junto com o tema.
      </GptDocCard>
      <GptDocCard icon="🏷️" title="Não é o Badge">
        O <code>Badge</code> vem da página <code>🟡 Design system</code>, tem cinco variantes
        semânticas e superfície a 10%. Este é um alvo só, sólido, de outra superfície do arquivo.
      </GptDocCard>
      <GptDocCard icon="📐" title="Medidas próprias">
        Padding 2/4 e raio 4 — mais apertada que qualquer degrau do <code>Badge</code>, cujo padding
        é 2/8.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas da instância via Plugin API, nas duas versões da tela."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptWebClientNodes.screenLight}
      frameName="Tag (Type=Default, State=Default)"
      specs={[
        { label: 'Medidas', value: '32 × 20' },
        { label: 'Padding', value: '2/4 · spacing/1 e spacing/2' },
        { label: 'Raio', value: '4px · radius/sm' },
        { label: 'Tipografia', value: 'Inter Regular · 12/16 (Body/XS)' },
        { label: 'Superfície', value: '#ADADFB · color/purple/400' },
        { label: 'Rótulo', value: '#FFFFFF · color/white' },
      ]}
      deviations={[
        'A superfície consome a primitiva `--gpt-color-purple-400` diretamente, contrariando a regra geral de que componentes citam aliases semânticos. É deliberado: o arquivo mede `#ADADFB` no quadro claro (681:2796) e no escuro (681:3246), e qualquer alias inverteria a cápsula junto com o tema.',
        'O arquivo publica apenas o rótulo `Plus`. A prop `children` aceita qualquer texto para que um produto anuncie outros planos.',
        'A instância de origem declara variantes `Left Icon` e `Right Icon`, ambas em `False` na tela. Como o arquivo nunca as mostra ligadas, nenhum slot de ícone foi modelado.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Uma cápsula, um rótulo."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="🔤" title="children">
        O nome do plano, em <code>Body/XS</code>, sem quebra de linha.
      </GptDocCard>
      <GptDocCard icon="🎨" title="Superfície">
        <code>--gpt-color-purple-400</code> fixo, com rótulo em branco puro.
      </GptDocCard>
      <GptDocCard icon="📏" title="Altura derivada">
        16px de linha mais 2px de padding em cima e embaixo — os 20px do arquivo.
      </GptDocCard>
      <GptDocCard icon="🧱" title="span">
        Elemento não interativo: a cápsula informa, não aciona.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Rótulos"
      description="O rótulo publicado e variações de comprimento."
      barColor="#5856D6"
    />
    <GptDocStage label="Rótulo do arquivo e alternativas">
      <PlanTag>Plus</PlanTag>
      <PlanTag>Pro</PlanTag>
      <PlanTag>Team</PlanTag>
      <PlanTag>Enterprise</PlanTag>
    </GptDocStage>
    <GptDocStage label="Composição da tela — logotipo mais cápsula">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Logo variant="horizontal" height={64} />
        <PlanTag>Plus</PlanTag>
      </div>
    </GptDocStage>
    <GptDocStage label="Token de superfície">
      <GptDocTokenSwatch
        cssVar="--gpt-color-purple-400"
        value="#ADADFB"
        name="Superfície da cápsula"
        figmaName="color/purple/400"
      />
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de uso do indicador de plano."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Manter o rótulo curto — a cápsula não quebra linha.',
        'Usar a cápsula ao lado do logotipo, que é onde o arquivo a coloca.',
        'Preservar a cor invariante: ela é o que identifica o plano nas duas versões da tela.',
        'Reservar a cápsula ao plano da conta, não a estados de conteúdo.',
      ]}
      donts={[
        'Trocar a superfície por um alias semântico — a cápsula passaria a inverter com o tema.',
        'Usar PlanTag como selo de estado: para isso existe o Badge, com suas cinco variantes.',
        'Empilhar várias cápsulas de plano na mesma tela.',
        'Aumentar o padding para o degrau do Badge (2/8): a cápsula perde a forma publicada.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A cápsula é o único alvo da tela que não muda entre claro e escuro."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher>
      {() => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Logo variant="mark" height={32} />
          <PlanTag>Plus</PlanTag>
        </div>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente PlanTag."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="PlanTag"
      rows={[
        {
          name: 'children',
          type: 'React.ReactNode',
          default: "'Plus'",
          description: 'Nome do plano. O arquivo usa Plus.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral. Não altera a superfície da cápsula, que é invariante.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PlanTag> = {
  title: 'ChatGPT/Componentes/PlanTag',
  component: PlanTag,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Nome do plano.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    children: 'Plus',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof PlanTag>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PlanTagDocumentationPage />,
};

/**
 * Playground com todas as propriedades do PlanTag expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PlanTag',
  render: (args) => (
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#333333' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <PlanTag {...args} />
    </div>
  ),
};

/**
 * Réplica do cabeçalho da tela de nova conversa.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: 24,
        border: '1px solid #E4E8E9',
        borderRadius: 5,
      }}
    >
      <Logo variant="horizontal" height={64} />
      <PlanTag>Plus</PlanTag>
    </div>
  ),
};
