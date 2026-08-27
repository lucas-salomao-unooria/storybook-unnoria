import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Logo } from '../../../src/chatgpt/components/Logo';
import { PlanTag } from '../../../src/chatgpt/components/PlanTag';
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
import { gptWebClientNodes } from '../fixtures';

/**
 * Página de documentação rica do componente Logo.
 */
const LogoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Componentes • Marca"
      title="Logo"
      description="Réplica da instância ChatGPTLogo da tela New chat - V1 - A: a marca de 64,39 × 64 e o wordmark de 139,51 × 24, separados por 16,1px e centrados na altura da marca. Os dois vetores são o export literal do arquivo e usam currentColor."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Três composições a partir de dois vetores."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="🪧" title="horizontal">
        A composição publicada — 220 × 64. É como o arquivo abre a tela de nova conversa, com a
        cápsula <code>PlanTag</code> à direita.
      </GptDocCard>
      <GptDocCard icon="⚫" title="mark">
        Só a marca, 64,39 × 64. Usada onde não cabe o texto — favicon, avatar do assistente, canto
        de uma barra estreita.
      </GptDocCard>
      <GptDocCard icon="🔤" title="wordmark">
        Só o texto, 139,51 × 24, em sete caminhos. Útil em rodapés e assinaturas onde a marca já
        aparece em outro lugar.
      </GptDocCard>
      <GptDocCard icon="🌗" title="Uma cor só">
        O arquivo pinta os dois vetores de preto no tema claro e de branco no escuro. Com{' '}
        <code>currentColor</code>, a troca acontece pela cor herdada — sem um segundo ativo.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Geometria lida da instância via Plugin API."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptWebClientNodes.logo}
      frameName="ChatGPTLogo (Property 1=Horizontal)"
      specs={[
        { label: 'Composição', value: '220 × 64' },
        { label: 'Marca', value: '64,39 × 64 · viewBox 0 0 65 64' },
        { label: 'Wordmark', value: '139,51 × 24 · viewBox 0 0 140 24 · 7 caminhos' },
        { label: 'Intervalo', value: '16,1px (x = 80,49 − 64,39)' },
        { label: 'Alinhamento', value: 'wordmark centrado em y = 20, altura 24' },
        { label: 'Preenchimento', value: 'currentColor (literal: preto / branco)' },
      ]}
      deviations={[
        'MARCA REGISTRADA — o logotipo é marca da OpenAI OpCo, LLC, e está presente por fidelidade ao arquivo comunitário. Um produto que publique esta biblioteca deve substituir `LogoVector.ts` pela própria marca.',
        'O arquivo publica apenas a composição horizontal. As variantes `mark` e `wordmark` isolam nós que já existem na instância — nenhum vetor novo foi desenhado.',
        'O intervalo de 16,1px é literal e não foi arredondado para o degrau `spacing/6` (16px).',
        'O `viewBox` da marca é `0 0 65 64` porque o exportador do Figma arredonda a largura de 64,39 para inteiro. O caminho é literal; a diferença é sub-pixel.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Dois vetores, uma proporção derivada."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="📏" title="height">
        A prop é a altura. A largura vem da proporção do <code>viewBox</code>, o que preserva a
        forma das três composições em qualquer escala.
      </GptDocCard>
      <GptDocCard icon="🧩" title="variant">
        Escolhe quais caminhos entram no <code>&lt;svg&gt;</code> e qual <code>viewBox</code> o
        envolve.
      </GptDocCard>
      <GptDocCard icon="♿" title="title / decorative">
        Por padrão o logotipo é anunciado como <code>ChatGPT</code>. Com{' '}
        <code>decorative</code>, some do leitor de tela — o certo quando um título textual já o
        acompanha.
      </GptDocCard>
      <GptDocCard icon="🎨" title="Cor herdada">
        A folha define <code>color: var(--gpt-text-primary)</code>; qualquer contêiner pode
        sobrescrever.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Tamanhos"
      description="As três composições e a escala de alturas."
      barColor="#5856D6"
    />
    <GptDocStage label="variant=horizontal · mark · wordmark" direction="column" align="flex-start">
      <Logo variant="horizontal" height={64} />
      <Logo variant="mark" height={64} />
      <Logo variant="wordmark" height={24} />
    </GptDocStage>
    <GptDocStage label="Escala — height 24 · 32 · 48 · 64">
      <Logo variant="mark" height={24} />
      <Logo variant="mark" height={32} />
      <Logo variant="mark" height={48} />
      <Logo variant="mark" height={64} />
    </GptDocStage>
    <GptDocStage label="Composição da tela — logotipo mais cápsula de plano">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Logo variant="horizontal" height={64} />
        <PlanTag>Plus</PlanTag>
      </div>
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de aplicação da marca."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Usar height para escalar — a largura acompanha sozinha e a forma é preservada.',
        'Deixar o logotipo decorativo quando um título textual já nomeia a tela.',
        'Trocar a cor pelo contêiner, não pelo atributo fill do caminho.',
        'Substituir LogoVector.ts pela própria marca ao publicar um produto derivado.',
      ]}
      donts={[
        'Esticar largura e altura de forma independente.',
        'Recolorir a marca com um segundo ativo por tema — currentColor já resolve.',
        'Redesenhar ou aproximar o vetor: os caminhos são o export literal do arquivo.',
        'Aplicar a variante wordmark sozinha onde a marca ainda não apareceu na tela.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="O arquivo pinta o logotipo de preto no claro e de branco no escuro."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher>
      {() => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Logo variant="horizontal" height={48} />
          <PlanTag>Plus</PlanTag>
        </div>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Logo."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="Logo"
      rows={[
        {
          name: 'variant',
          type: "'horizontal' | 'mark' | 'wordmark'",
          default: "'horizontal'",
          description: 'Composição renderizada.',
        },
        {
          name: 'height',
          type: 'number',
          default: '64',
          description: 'Altura em pixels. A largura é derivada da proporção do viewBox.',
        },
        {
          name: 'title',
          type: 'string',
          default: "'ChatGPT'",
          description: 'Rótulo acessível anunciado por leitores de tela.',
        },
        {
          name: 'decorative',
          type: 'boolean',
          default: 'false',
          description: 'Suprime o <title> e expõe aria-hidden.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Logo> = {
  title: 'ChatGPT/Componentes/Logo',
  component: Logo,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['horizontal', 'mark', 'wordmark'],
      description: 'Composição renderizada.',
    },
    height: {
      control: { type: 'range', min: 16, max: 160, step: 4 },
      description: 'Altura em pixels.',
    },
    title: { control: 'text', description: 'Rótulo acessível.' },
    decorative: { control: 'boolean', description: 'Torna o logotipo decorativo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    variant: 'horizontal',
    height: 64,
    title: 'ChatGPT',
    decorative: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <LogoDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Logo expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Logo',
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
      <Logo {...args} />
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

/**
 * As três composições publicadas.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
      <Logo variant="horizontal" height={64} />
      <Logo variant="mark" height={64} />
      <Logo variant="wordmark" height={24} />
    </div>
  ),
};
