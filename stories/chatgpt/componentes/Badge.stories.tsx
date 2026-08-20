import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '../../../src/chatgpt/components/Badge';
import { GPTCard, SettingsRow } from '../../../src/chatgpt/components';
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
import { gptFigmaNodes } from '../fixtures';

const VARIANTES = ['default', 'primary', 'success', 'error', 'warning'] as const;

const SEMANTICA: Record<(typeof VARIANTES)[number], string> = {
  default: 'Rótulo neutro — categoria, contagem, tipo de arquivo',
  primary: 'Recurso de marca — "Plus", "GPT-4", "Beta"',
  success: 'Operação concluída — "Sincronizado", "Ativo"',
  error: 'Falha ou bloqueio — "Expirado", "Limite atingido"',
  warning: 'Atenção sem bloqueio — "Prévia", "Depreciado"',
};

/**
 * Página de documentação rica do componente Badge.
 */
const BadgeDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Componentes • Indicadores"
      title="Badge"
      description="Réplica do conjunto Badge da página 🟡 Design system: cápsula de 17px com padding 2/8, raio 4 e rótulo Inter Medium de 11px, nas cinco variantes semânticas publicadas. Cada variante usa a cor semântica correspondente a 10% de opacidade como superfície e a 100% como texto — a exceção é default, que usa a escada translúcida neutra de 4%."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Cinco severidades, um único formato."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="⚪" title="Default">
        Superfície <code>--gpt-fill-4</code> e texto <code>text/primary</code>. É o rótulo sem
        carga semântica.
      </GptDocCard>
      <GptDocCard icon="🟪" title="Primary">
        <code>interactive/primary</code> a 10%. Marca recursos da própria plataforma dentro de
        listas de GPTs e de configurações.
      </GptDocCard>
      <GptDocCard icon="🟩🟥" title="Success & Error">
        <code>status/success</code> e <code>status/error</code> a 10%. Estado terminal de uma
        operação — nunca ação clicável.
      </GptDocCard>
      <GptDocCard icon="🟧" title="Warning">
        <code>status/warning</code> a 10%. Chama atenção sem bloquear: recursos em prévia e avisos
        de depreciação.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do conjunto de variantes via Plugin API."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.badge}
      frameName="Badge (Variant · 5 variantes)"
      specs={[
        { label: 'Padding', value: '2/8 · spacing/1 e spacing/4' },
        { label: 'Raio', value: '4px · radius/sm' },
        { label: 'Altura', value: '17px (derivada)' },
        { label: 'Tipografia', value: 'Inter Medium · 11px' },
        { label: 'Superfície', value: 'cor semântica a 10%' },
        { label: 'Default', value: 'preto a 4% · --gpt-fill-4' },
      ]}
      deviations={[
        'O rótulo usa peso 500 (Medium) em 11px, combinação que não corresponde a nenhum estilo publicado — Caption tem o mesmo corpo mas peso 400. O peso foi tokenizado como --gpt-font-weight-medium.',
        'As superfícies a 10% aparecem no arquivo como preenchimentos literais. No CSS elas são resolvidas com color-mix sobre o token semântico, de modo que a cápsula acompanha a troca de tema em vez de congelar o valor do Light.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Uma cápsula de altura derivada, sem slot de ícone."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="💊" title="Cápsula">
        <code>inline-flex</code> com padding 2/8 e raio 4. A altura de 17px resulta do padding mais
        a altura de linha de 14px.
      </GptDocCard>
      <GptDocCard icon="🔤" title="Rótulo">
        <code>children</code>, sem quebra de linha. Textos curtos — uma ou duas palavras.
      </GptDocCard>
      <GptDocCard icon="🎨" title="Par de cores">
        Superfície e texto derivam do mesmo token semântico, garantindo contraste consistente entre
        as cinco variantes.
      </GptDocCard>
      <GptDocCard icon="🚫" title="Sem interação">
        O <code>Badge</code> é um indicador. Para ação clicável use <code>Tag</code>, que publica
        estado de seleção.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Aplicações"
      description="As cinco variantes publicadas e o selo em contexto real."
      barColor="#5856D6"
    />
    <GptDocStage label="Variant=default · primary · success · error · warning">
      {VARIANTES.map((variant) => (
        <Badge key={variant} variant={variant}>
          Badge
        </Badge>
      ))}
    </GptDocStage>
    <GptDocStage label="Rótulos reais">
      <Badge variant="primary">GPT-4</Badge>
      <Badge variant="success">Sincronizado</Badge>
      <Badge variant="error">Expirado</Badge>
      <Badge variant="warning">Prévia</Badge>
      <Badge>PDF</Badge>
    </GptDocStage>
    <GptDocStage label="Em contexto — catálogo de GPTs e linha de configuração" direction="column" align="flex-start">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <GPTCard name="Data Analyst" description="Lê planilhas e explica os achados" initial="D" />
        <Badge variant="primary">GPT-4</Badge>
      </div>
      <div style={{ width: 400 }}>
        <SettingsRow label="Plano" value={<Badge variant="primary">Plus</Badge>} block />
        <SettingsRow label="Sessão" value={<Badge variant="success">Ativa</Badge>} block />
      </div>
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de sinalização."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Manter o rótulo em uma ou duas palavras — a cápsula não quebra linha.',
        'Escolher a variante pela semântica do estado, não pela cor desejada.',
        'Usar default quando o rótulo é apenas classificatório, sem urgência.',
        'Exibir no máximo um Badge por linha de lista.',
      ]}
      donts={[
        'Tornar o Badge clicável — para isso existe o Tag.',
        'Usar error como destaque estético em conteúdo saudável.',
        'Aplicar o Badge a texto longo, o que estoura a linha do contêiner.',
        'Repetir a mesma informação no rótulo do item e no selo.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="As superfícies são resolvidas com color-mix sobre o token semântico, acompanhando a troca de modo."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher>
      {() => (
        <>
          {VARIANTES.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Badge."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="Badge"
      rows={[
        {
          name: 'variant',
          type: "'default' | 'primary' | 'success' | 'error' | 'warning'",
          default: "'default'",
          description: 'Variante semântica, espelhando a propriedade Variant do conjunto no Figma.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo do selo.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Badge> = {
  title: 'ChatGPT/Componentes/Badge',
  component: Badge,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: VARIANTES, description: 'Variante semântica.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Rótulo do selo.' },
  },
  args: { variant: 'primary', theme: 'light', children: 'Badge' },
};

export default meta;

type Story = StoryObj<typeof Badge>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BadgeDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Badge expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Badge',
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
      <Badge {...args} />
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
      {VARIANTES.map((variant) => (
        <Badge key={variant} variant={variant}>
          Badge
        </Badge>
      ))}
    </div>
  ),
};

/**
 * Matriz das cinco severidades com a semântica de cada uma.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 14 }}>
      {VARIANTES.map((variant) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 90 }}>
            <Badge variant={variant}>{variant}</Badge>
          </span>
          <span style={{ fontSize: 13, color: '#475157' }}>{SEMANTICA[variant]}</span>
        </div>
      ))}
    </div>
  ),
};
