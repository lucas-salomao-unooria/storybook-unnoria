import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  gptFontFamily,
  gptTextStyles,
  type GptTextStyleName,
} from '../../../src/chatgpt/tokens/typography';
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
import { Button, ChatBubble, GPTCard } from '../../../src/chatgpt/components';
import { gptFigmaNodes } from '../fixtures';

/** Variável CSS de cada estilo, no formato `--gpt-font-<slug>-*`. */
const SLUGS: Record<GptTextStyleName, string> = {
  displayXl: 'display-xl',
  displayLg: 'display-lg',
  headingH1: 'heading-h1',
  headingH2: 'heading-h2',
  headingH3: 'heading-h3',
  bodyLg: 'body-lg',
  bodyMd: 'body-md',
  bodySm: 'body-sm',
  bodyXs: 'body-xs',
  labelLg: 'label-lg',
  labelMd: 'label-md',
  labelSm: 'label-sm',
  caption: 'caption',
};

/** Amostra de texto usada em cada estilo. */
const AMOSTRAS: Record<GptTextStyleName, string> = {
  displayXl: 'Aa',
  displayLg: 'Display Extra Large',
  headingH1: 'Heading 1',
  headingH2: 'Heading 2',
  headingH3: 'Heading 3',
  bodyLg: 'Body Large — Lorem ipsum dolor sit amet',
  bodyMd: 'Body Medium — Lorem ipsum dolor sit amet',
  bodySm: 'Body Small — Lorem ipsum dolor sit amet',
  bodyXs: 'Body Extra Small — Lorem ipsum dolor sit amet',
  labelLg: 'Label Large',
  labelMd: 'Label Medium',
  labelSm: 'Label Small',
  caption: 'Caption text — supplementary info',
};

const ORDEM: GptTextStyleName[] = [
  'displayXl',
  'displayLg',
  'headingH1',
  'headingH2',
  'headingH3',
  'bodyLg',
  'bodyMd',
  'bodySm',
  'bodyXs',
  'labelLg',
  'labelMd',
  'labelSm',
  'caption',
];

/** Linha da escala tipográfica, renderizada com as variáveis CSS reais. */
const LinhaDeEscala: React.FC<{ name: GptTextStyleName }> = ({ name }) => {
  const style = gptTextStyles[name];
  const slug = SLUGS[name];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(180px, 220px) 1fr',
        gap: 24,
        alignItems: 'baseline',
        padding: '18px 0',
        borderTop: '1px solid #E4E8E9',
      }}
    >
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#5856D6' }}>{style.figmaName}</div>
        <div
          style={{
            fontSize: 11,
            color: '#475157',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            marginTop: 4,
            lineHeight: 1.6,
          }}
        >
          {style.fontSize}px / {style.lineHeight === 'auto' ? 'auto' : `${style.lineHeight}px`}
          <br />
          peso {style.fontWeight}
          <br />
          --gpt-font-{slug}-size
        </div>
      </div>
      <div
        style={{
          fontFamily: `var(--gpt-font-sans)`,
          fontSize: `var(--gpt-font-${slug}-size)`,
          lineHeight: `var(--gpt-font-${slug}-line)`,
          fontWeight: `var(--gpt-font-${slug}-weight)` as React.CSSProperties['fontWeight'],
          color: '#000000',
          overflow: 'hidden',
        }}
      >
        {AMOSTRAS[name]}
      </div>
    </div>
  );
};

/**
 * Página de documentação rica dos tokens de tipografia.
 */
const TipografiaDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Fundamentos • Tipografia"
      title="Tipografia"
      description="Os 13 estilos de texto publicados no arquivo Figma, todos na família Inter, em três pesos (400 Regular, 500 Medium, 600 Semi Bold). A escala se organiza em quatro faixas — Display, Heading, Body e Label — mais o Caption de 11px, e cobre de 128px a 11px."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Quatro faixas com responsabilidades distintas dentro do cliente de conversa."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="🅰️" title="Display">
        <code>Display/XL</code> (128px, altura automática) e <code>Display/LG</code> (64/72) para a
        saudação da tela vazia e para peças de marca. Nunca em texto corrido.
      </GptDocCard>
      <GptDocCard icon="📰" title="Heading">
        <code>H1</code> 48/56, <code>H2</code> 24/32 e <code>H3</code> 18/28, sempre em Semi Bold.
        O <code>H3</code> é o título do <code>Modal</code>.
      </GptDocCard>
      <GptDocCard icon="📄" title="Body">
        <code>Body/SM</code> (14/20) é a régua da interface: mensagens, linhas de navegação,
        campos e valores de configuração. <code>LG</code>, <code>MD</code> e <code>XS</code> cobrem
        os degraus vizinhos.
      </GptDocCard>
      <GptDocCard icon="🏷️" title="Label & Caption">
        <code>Label/*</code> em Semi Bold para rótulos de botão e nomes de cartão;{' '}
        <code>Caption</code> de 11px para metadados e para o rótulo do <code>Badge</code>.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Estilos de texto lidos via Plugin API na página 🟡 Design system."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.documentation}
      frameName="📐 Design System Documentation"
      specs={[
        { label: 'Família', value: 'Inter' },
        { label: 'Estilos publicados', value: '13' },
        { label: 'Pesos usados', value: '400 · 500 · 600' },
        { label: 'Maior degrau', value: 'Display/XL · 128px' },
        { label: 'Menor degrau', value: 'Caption · 11/14' },
        { label: 'Tracking', value: '0px em todos os estilos' },
      ]}
      deviations={[
        'Display/XL tem altura de linha automática no Figma; em CSS ela é fixada em 1.21 — a razão que o Inter resolve para esse corpo — para tornar o valor determinístico.',
        'O peso 500 (Medium) não tem estilo de texto publicado, mas é usado pelo Badge (11px) e pelo rótulo do Sidebar.NewChatButton (14px). Foi tokenizado como --gpt-font-weight-medium.',
        'Botões e cartões usam alturas de linha literais (18px no Button MD, 13px no corpo do FeatureCard) que não correspondem a nenhum degrau publicado; estão anotadas no CSS de cada componente.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia da Escala"
      description="Cada linha é renderizada com as variáveis CSS reais do token, não com valores repetidos à mão."
      barColor="#5856D6"
    />
    <div style={{ marginBottom: 32 }}>
      {ORDEM.map((name) => (
        <LinhaDeEscala key={name} name={name} />
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="4. Matriz de Pesos"
      description="Os três pesos aplicados ao mesmo corpo de 14px, o degrau mais usado da interface."
      barColor="#5856D6"
    />
    <GptDocStage label="Body/SM em 400, 500 e 600">
      {([400, 500, 600] as const).map((weight) => (
        <div key={weight} style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: gptFontFamily,
              fontSize: 14,
              lineHeight: '20px',
              fontWeight: weight,
              color: '#000000',
            }}
          >
            Type message
          </div>
          <div style={{ fontSize: 11, color: '#475157', marginTop: 8 }}>peso {weight}</div>
        </div>
      ))}
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de aplicação da escala."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Consumir os pares size/line/weight do mesmo token — eles foram medidos juntos no arquivo.',
        'Usar Body/SM como padrão da interface e reservar Display para superfícies de marca.',
        'Aplicar Label/* sempre que o texto rotula um controle, mantendo o peso 600.',
        'Manter a família via var(--gpt-font-sans), que já declara a cadeia de fallback do sistema.',
      ]}
      donts={[
        'Misturar o corpo de um estilo com a altura de linha de outro.',
        'Introduzir tamanhos intermediários fora dos 13 degraus publicados.',
        'Aplicar tracking negativo ou positivo: todos os estilos do arquivo têm letter-spacing 0.',
        'Usar a fonte Open Sans da Plataforma Unooria dentro do ChatGPT.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A escala é invariante entre os temas; apenas a cor do texto muda."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher direction="column">
      {() => (
        <>
          <ChatBubble role="assistant">
            I can help you with many things! Feel free to ask me anything.
          </ChatBubble>
          <GPTCard name="Data Analyst" description="Lê planilhas, gera gráficos e explica os achados" />
          <Button variant="primary" size="lg">
            Continuar
          </Button>
        </>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa dos Estilos"
      description="Nome no Figma, medidas e variável CSS de cada degrau."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="Escala tipográfica"
      rows={ORDEM.map((name) => {
        const style = gptTextStyles[name];
        return {
          name: style.figmaName,
          type: `--gpt-font-${SLUGS[name]}-{size,line,weight}`,
          default: `${style.fontSize}px / ${
            style.lineHeight === 'auto' ? 'auto' : `${style.lineHeight}px`
          }`,
          description: `Peso ${style.fontWeight}. Token TypeScript: gptTextStyles.${name}.`,
        };
      })}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'ChatGPT/Fundamentos/Tipografia',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Escala tipográfica do ChatGPT — 13 estilos de texto na família Inter, extraídos do arquivo Figma oficial.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa da escala tipográfica.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TipografiaDocumentationPage />,
};

/**
 * A escala completa, do maior ao menor degrau.
 */
export const EscalaCompleta: Story = {
  name: '🅰️ Escala Completa',
  render: () => (
    <div>
      {ORDEM.map((name) => (
        <LinhaDeEscala key={name} name={name} />
      ))}
    </div>
  ),
};
