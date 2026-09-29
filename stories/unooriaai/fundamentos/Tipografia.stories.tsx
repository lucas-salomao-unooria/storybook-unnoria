import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  uaiFontFamily,
  uaiFontWeights,
  uaiTextStyles,
  type UaiTextStyleName,
} from '../../../src/unooriaai/tokens/typography';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocCard,
  UaiDocDecisions,
  UaiDocGrid,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocSpecs,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';
import { AssistantCard, Button, ChatBubble } from '../../../src/unooriaai/components';

const BAR = '#716C98';
const DOC_TEXT = '#22272A';
const DOC_MUTED = '#475157';
const DOC_BORDER = '#E4E8E9';
const DOC_ACCENT = '#57547D';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** Variável CSS de cada estilo, no formato `--uai-font-<slug>-*`. */
const SLUGS: Record<UaiTextStyleName, string> = {
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
const AMOSTRAS: Record<UaiTextStyleName, string> = {
  displayXl: 'Aa',
  displayLg: 'Título de destaque',
  headingH1: 'Título de página',
  headingH2: 'Título de diálogo e de seção',
  headingH3: 'Subtítulo e título de coluna',
  bodyLg: 'Texto de leitura ampliado — o assistente explica com calma',
  bodyMd: 'Texto de leitura — o assistente explica com calma',
  bodySm: 'Corpo padrão da interface — o assistente explica com calma',
  bodyXs: 'Texto auxiliar — o assistente explica com calma',
  labelLg: 'Rótulo grande',
  labelMd: 'Rótulo médio',
  labelSm: 'Rótulo pequeno',
  caption: 'Legenda — informação complementar',
};

const ORDEM: UaiTextStyleName[] = [
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
const LinhaDeEscala: React.FC<{ name: UaiTextStyleName }> = ({ name }) => {
  const style = uaiTextStyles[name];
  const slug = SLUGS[name];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(200px, 260px) 1fr',
        gap: 24,
        alignItems: 'baseline',
        padding: '18px 0',
        borderTop: `1px solid ${DOC_BORDER}`,
      }}
    >
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: DOC_ACCENT }}>{style.styleName}</div>
        <div
          style={{
            fontSize: 11,
            color: DOC_MUTED,
            fontFamily: MONO,
            marginTop: 4,
            lineHeight: 1.6,
          }}
        >
          {style.fontSize}px / {style.lineHeight}px
          <br />
          peso {style.fontWeight}
          <br />
          --uai-font-{slug}-size
          <br />
          origem {style.unooria}
        </div>
      </div>
      <div
        style={{
          fontFamily: 'var(--uai-font-sans)',
          fontSize: `var(--uai-font-${slug}-size)`,
          lineHeight: `var(--uai-font-${slug}-line)`,
          fontWeight: `var(--uai-font-${slug}-weight)` as React.CSSProperties['fontWeight'],
          color: DOC_TEXT,
          overflow: 'hidden',
        }}
      >
        {AMOSTRAS[name]}
      </div>
    </div>
  );
};

const tamanhos = Array.from(new Set(ORDEM.map((name) => uaiTextStyles[name].fontSize)));

/**
 * Página de documentação rica dos tokens de tipografia.
 */
const TipografiaDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Fundamentos • Tipografia"
      title="Tipografia"
      description={`${ORDEM.length} estilos de texto na família Open Sans da Plataforma Unooria, nos degraus e nas alturas de linha da escala da plataforma, em quatro pesos (400, 500, 600 e 700). A escala se organiza em quatro faixas — Display, Heading, Body e Label — mais a Legenda, e cobre de ${Math.max(...tamanhos)}px a ${Math.min(...tamanhos)}px.`}
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Quatro faixas com responsabilidades distintas dentro do cliente de conversa."
      barColor={BAR}
    />
    <UaiDocGrid>
      <UaiDocCard icon="🅰️" title="Display">
        <code>Display/XL</code> (60/78) e <code>Display/LG</code> (48/64) para a saudação da tela
        vazia e para peças de marca. Nunca em texto corrido.
      </UaiDocCard>
      <UaiDocCard icon="📰" title="Heading">
        <code>H1</code> 34/48 em Bold, <code>H2</code> 24/34 e <code>H3</code> 18/28 em Semi Bold.
        O <code>H3</code> é o título do <code>Modal</code>.
      </UaiDocCard>
      <UaiDocCard icon="📄" title="Body">
        <code>Body/SM</code> (14/20) é a régua da interface: mensagens, linhas de navegação, campos
        e valores de configuração. <code>LG</code>, <code>MD</code> e <code>XS</code> cobrem os
        degraus vizinhos.
      </UaiDocCard>
      <UaiDocCard icon="🏷️" title="Label & Legenda">
        <code>Label/*</code> em Semi Bold para rótulos de botão e nomes de cartão;{' '}
        <code>Caption</code> de 12px para metadados. Nenhum corpo do módulo fica abaixo de 12px.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações Técnicas"
      description="Família, degraus e regras de medida."
      barColor={BAR}
    />
    <UaiDocSpecs
      component="../tokens"
      layout="Escala de 13 estilos"
      specs={[
        { label: 'Família', value: 'Open Sans' },
        { label: 'Variável da família', value: '--uai-font-sans' },
        { label: 'Estilos', value: String(ORDEM.length) },
        { label: 'Pesos usados', value: '400 · 500 · 600 · 700' },
        { label: 'Maior degrau', value: 'Display/XL · 60/78' },
        { label: 'Menor degrau', value: 'Caption · 12/18' },
        { label: 'Tracking', value: '0px em todos os estilos' },
        { label: 'Origem dos degraus', value: '--unooria-size-*' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Degraus e alturas de linha da Unooria',
          detail:
            'Cada estilo copia o tamanho, o peso e a altura de linha de um degrau nomeado da escala da plataforma; o token --unooria-size-* de origem está no comentário de cada linha de typography.css e na tabela abaixo.',
        },
        {
          subject: 'Sem letter-spacing',
          detail:
            'A escala da plataforma não usa espaçamento entre letras; as variáveis -tracking valem 0px só para que nenhum componente invente um valor.',
        },
        {
          subject: 'Fonte como opt-in',
          detail:
            'A folha de componentes cita apenas var(--uai-font-sans), com pilha de fallback do sistema; quem quiser a Open Sans embutida importa fonts/unooriaai.css ou resolve a fonte pelo próprio aplicativo.',
        },
        {
          subject: 'Peso 500 tokenizado',
          detail:
            'O peso Medium não é usado por nenhum estilo nomeado, mas serve a rótulos de selo e do botão de nova conversa; vive em --uai-font-weight-medium.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia da Escala"
      description="Cada linha é renderizada com as variáveis CSS reais do token, não com valores repetidos à mão."
      barColor={BAR}
    />
    <div style={{ marginBottom: 32 }}>
      {ORDEM.map((name) => (
        <LinhaDeEscala key={name} name={name} />
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="4. Matriz de Pesos"
      description="Os quatro pesos aplicados ao mesmo corpo de 14px, o degrau mais usado da interface."
      barColor={BAR}
    />
    <UaiDocStage label="Body/SM em 400, 500, 600 e 700">
      {(Object.entries(uaiFontWeights) as [keyof typeof uaiFontWeights, number][]).map(
        ([nome, weight]) => (
          <div key={nome} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: uaiFontFamily,
                fontSize: 14,
                lineHeight: '20px',
                fontWeight: weight,
                color: DOC_TEXT,
              }}
            >
              Escreva uma mensagem
            </div>
            <div style={{ fontSize: 11, color: DOC_MUTED, marginTop: 8 }}>
              peso {weight} · --uai-font-weight-{nome}
            </div>
          </div>
        )
      )}
    </UaiDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de aplicação da escala."
      barColor={BAR}
    />
    <UaiDocPractices
      dos={[
        'Consumir os pares size/line/weight do mesmo token: eles foram copiados juntos da escala da Unooria.',
        'Usar Body/SM como padrão da interface e reservar Display para superfícies de marca.',
        'Aplicar Label/* sempre que o texto rotula um controle, mantendo o peso 600.',
        'Manter a família via var(--uai-font-sans), que já declara a cadeia de fallback do sistema.',
      ]}
      donts={[
        'Misturar o corpo de um estilo com a altura de linha de outro.',
        'Introduzir tamanhos intermediários fora dos degraus da escala.',
        'Aplicar tracking negativo ou positivo: nenhum estilo do módulo usa letter-spacing.',
        'Usar corpo abaixo de 12px em texto que a pessoa precisa ler.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A escala é invariante entre os temas; apenas a cor do texto muda."
      barColor={BAR}
    />
    <UaiDocThemeSwitcher direction="column">
      {() => (
        <>
          <ChatBubble role="assistant">
            Posso ajudar com muitas coisas! Fique à vontade para perguntar o que quiser.
          </ChatBubble>
          <AssistantCard
            name="Analista de dados"
            description="Lê planilhas, gera gráficos e explica os achados"
          />
          <Button variant="primary" size="lg">
            Continuar
          </Button>
        </>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa dos Estilos"
      description="Nome, medidas, variável CSS e token de origem na Unooria de cada degrau."
      barColor={BAR}
    />
    <UaiDocPropsTable
      title="Escala tipográfica"
      rows={ORDEM.map((name) => {
        const style = uaiTextStyles[name];
        return {
          name: style.styleName,
          type: `--uai-font-${SLUGS[name]}-{size,line,weight}`,
          default: `${style.fontSize}px / ${style.lineHeight}px`,
          description: `Peso ${style.fontWeight}. Origem: ${style.unooria}. ${style.usage}. Token TypeScript: uaiTextStyles.${name}.`,
        };
      })}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'UnooriaAI/Fundamentos/Tipografia',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Escala tipográfica do UnooriaAI — 13 estilos de texto em Open Sans, nos degraus da Plataforma Unooria.',
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
