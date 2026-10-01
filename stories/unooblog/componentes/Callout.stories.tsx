import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Callout } from '../../../src/unooblog/components/Callout';
import type { UblCalloutTone } from '../../../src/unooblog/components/Callout';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocStage,
  UblDocPractices,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';

const BAR = '#716C98';

const TONES: UblCalloutTone[] = ['info', 'tip', 'warning'];

const TITULO: Record<UblCalloutTone, string> = {
  info: 'Quem depende do foco',
  tip: 'Um anel, vários fundos',
  warning: 'Nunca remova o contorno sem substituir',
};

const TEXTO: Record<UblCalloutTone, string> = {
  info: 'Usuários de leitor de tela, de teclado adaptado e de controle por voz dependem do foco visível para saber onde estão.',
  tip: 'Se o mesmo componente aparece sobre claro e sobre escuro, defina a cor do foco por tema e meça os dois.',
  warning: 'Escrever outline: none em um reset global é o erro mais comum e o mais caro.',
};

const COLUNA: React.CSSProperties = { width: 'min(640px, 100%)', boxSizing: 'border-box' };

/**
 * Página de documentação rica do componente Callout.
 */
const CalloutDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Leitura"
      title="Callout"
      description="Aviso dentro do post, em três tons: informação, dica e atenção. Barra lateral e glifo na cor de status, fundo translúcido e o tom anunciado também em texto, para não depender de cor."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Quando um trecho merece sair do fluxo do texto."
    />
    <UblDocGrid>
      <UblDocCard icon="ℹ️" title="Informação">
        Contexto que ajuda a entender o argumento, mas que não muda o que a pessoa deve fazer.
      </UblDocCard>
      <UblDocCard icon="💡" title="Dica">
        Uma boa prática ou um atalho. Usa o verde de sucesso e a lâmpada.
      </UblDocCard>
      <UblDocCard icon="⚠️" title="Atenção">
        Algo que pode dar errado ou custar caro. Usa o âmbar e o triângulo.
      </UblDocCard>
      <UblDocCard icon="🔊" title="Tom também em texto">
        Além da cor e do glifo, o leitor de tela ouve &quot;Informação:&quot;, &quot;Dica:&quot; ou
        &quot;Atenção:&quot; antes do conteúdo.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura própria do módulo; cores e fontes são as da Plataforma Unooria."
    />
    <UblDocSpecs
      component="Callout"
      layout="Linha · glifo de 24px + conteúdo · barra de 4px à esquerda"
      specs={[
        { label: 'Raiz', value: '<aside role="note"> · raio --ubl-radius-m (12px)' },
        { label: 'Barra', value: '4px (--ubl-spacing-3xs) · --ubl-color-status-info | success | warning' },
        { label: 'Fundo', value: '--ubl-color-fill-info | success | warning (translúcido)' },
        { label: 'Glifo', value: 'info · tip · warning, 24px, na cor de status do tom' },
        { label: 'Título', value: 'heading-4 (20/30) · --ubl-color-text-primary' },
        { label: 'Texto', value: 'body-lg (16/24) · --ubl-color-text-primary' },
        { label: 'Recuo', value: '16px (--ubl-spacing-l) · 20px junto à barra' },
        { label: 'Fronteira', value: 'Server Component' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Dica usa a cor de sucesso',
          detail:
            'o módulo publica três cores de status (info, success, warning). A dica fica com o verde porque é a única que sinaliza algo positivo; o glifo de lâmpada a distingue da informação sem depender da cor.',
        },
        {
          subject: 'Cor só na barra e no glifo',
          detail:
            'o texto continua em text-primary. As cores de status são pensadas como gráfico (≥ 3:1) e não como texto corrido; o fundo translúcido deixa o contraste do texto igual ao da página.',
        },
        {
          subject: 'O tom em texto oculto',
          detail:
            'antes do conteúdo vai "Informação:", "Dica:" ou "Atenção:", visível só para leitores de tela. toneLabel permite trocar a palavra; o tom nunca depende só da cor.',
        },
        {
          subject: 'Título é parágrafo, não cabeçalho',
          detail:
            'o título do aviso é um <p> em negrito. Um <h3> dentro do aviso entraria no sumário do post e na lista de cabeçalhos do leitor de tela, e o aviso não é uma seção.',
        },
        {
          subject: 'role="note" em <aside>',
          detail:
            'o aviso é conteúdo complementar ao texto, não uma mensagem de estado: role="note" (e não "alert") evita que o leitor de tela o interrompa.',
        },
        {
          subject: 'Barra dentro do raio',
          detail:
            'a barra é um pseudo-elemento cortado pelo overflow do contêiner, e não uma border-left: com raio de 12px, a borda formaria uma curva torta.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Barra, glifo, título e texto."
    />
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <div style={COLUNA}>
        <Callout tone="tip" title={TITULO.tip}>
          {TEXTO.tip}
        </Callout>
      </div>
      <UblDocAnatomy
        zones={[
          { name: 'Barra', role: 'Marca o tom com uma faixa de 4px, na cor de status.', token: '--ubl-color-status-*' },
          { name: 'Glifo', role: 'Reforça o tom pela forma: i, lâmpada ou triângulo.', token: 'info · tip · warning' },
          { name: 'Título', role: 'Frase curta em negrito (opcional).', token: 'heading-4' },
          { name: 'Texto', role: 'O conteúdo do aviso, em text-primary.', token: 'body-lg' },
          { name: 'Anúncio do tom', role: 'Texto oculto lido antes do conteúdo.', token: 'toneLabel' },
        ]}
      />
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os três tons, com e sem título."
    />
    <UblDocStage label="Tons com título" surface="page" align="stretch" direction="column" padding={24}>
      {TONES.map((tom) => (
        <div key={tom} style={COLUNA}>
          <Callout tone={tom} title={TITULO[tom]}>
            {TEXTO[tom]}
          </Callout>
        </div>
      ))}
    </UblDocStage>
    <UblDocStage label="Tons sem título" surface="page" align="stretch" direction="column" padding={24}>
      {TONES.map((tom) => (
        <div key={tom} style={COLUNA}>
          <Callout tone={tom}>{TEXTO[tom]}</Callout>
        </div>
      ))}
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar o aviso." />
    <UblDocPractices
      dos={[
        'Usar o tom que corresponde ao peso da informação: atenção só para o que pode dar errado.',
        'Escrever títulos curtos, que dizem o assunto do aviso.',
        'Manter o aviso curto: duas ou três linhas.',
        'Dizer o que fazer, e não só o que evitar.',
      ]}
      donts={[
        'Empilhar vários avisos seguidos: o leitor passa a ignorá-los.',
        'Usar atenção para destaque decorativo.',
        'Esconder informação essencial só dentro do aviso.',
        'Usar o aviso para citações: para isso existe o Blockquote.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="As cores de status mudam por tema para manter o contraste do glifo e da barra."
    />
    <UblDocThemeSwitcher surface="page" padding={32}>
      {(tema) => (
        <div style={{ ...COLUNA, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {TONES.map((tom) => (
            <Callout key={tom} theme={tema} tone={tom} title={TITULO[tom]}>
              {TEXTO[tom]}
            </Callout>
          ))}
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do Callout. Os demais atributos vão ao <aside> raiz."
    />
    <UblDocPropsTable
      title="Callout"
      rows={[
        { name: 'tone', type: "'info' | 'tip' | 'warning'", default: "'info'", description: 'Tom do aviso: glifo, cor da barra e anúncio em texto.' },
        { name: 'title', type: 'string', description: 'Título curto, em negrito.' },
        { name: 'toneLabel', type: 'string', description: 'Texto oculto que anuncia o tom. Padrão: "Informação:", "Dica:" ou "Atenção:".' },
        { name: 'children', type: 'ReactNode', description: 'Conteúdo do aviso.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Callout> = {
  title: 'Unooblog/Componentes/Callout',
  component: Callout,
  parameters: { layout: 'padded' },
  argTypes: {
    tone: { control: 'radio', options: TONES, description: 'Tom do aviso.' },
    title: { control: 'text', description: 'Título curto, em negrito.' },
    toneLabel: { control: 'text', description: 'Texto oculto que anuncia o tom.' },
    children: { control: 'text', description: 'Conteúdo do aviso.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    tone: 'info',
    title: TITULO.info,
    children: TEXTO.info,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Callout>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CalloutDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Callout',
  render: (args) => (
    <UblDocStage surface="page" theme={args.theme} align="stretch" direction="column" padding={32}>
      <div style={COLUNA}>
        <Callout {...args} />
      </div>
    </UblDocStage>
  ),
};

/**
 * Um aviso entre dois parágrafos, como num post.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: aviso no texto',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <div
        style={{
          ...COLUNA,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          fontFamily: 'var(--ubl-font-sans)',
          color: 'var(--ubl-color-text-primary)',
        }}
      >
        <p className="ubl-text ubl-text--prose">
          O navegador já desenha um contorno padrão, mas ele costuma ser fino e some em certos
          fundos.
        </p>
        <Callout tone="warning" title={TITULO.warning}>
          {TEXTO.warning}
        </Callout>
        <p className="ubl-text ubl-text--prose">
          Um bom indicador tem espessura de pelo menos dois pixels.
        </p>
      </div>
    </UblDocStage>
  ),
};

/**
 * O aviso em larguras diferentes: o texto quebra, a barra e o glifo ficam.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={24}>
      {[240, 360, 560].map((largura) => (
        <div key={largura} style={{ width: largura }}>
          <Callout tone="tip" title="Título do aviso">
            {TEXTO.tip}
          </Callout>
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * Os três tons, com título.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24}>
      {TONES.map((tom) => (
        <div key={tom} style={COLUNA}>
          <Callout tone={tom} title={TITULO[tom]}>
            {TEXTO[tom]}
          </Callout>
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * Sem título, com vários parágrafos e com um link e um trecho de código.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24}>
      <div style={COLUNA}>
        <Callout tone="info">Aviso sem título, só com texto.</Callout>
      </div>
      <div style={COLUNA}>
        <Callout tone="tip" title="Dois parágrafos">
          <p>Primeiro parágrafo do aviso.</p>
          <p>Segundo parágrafo do aviso, que continua o raciocínio.</p>
        </Callout>
      </div>
      <div style={COLUNA}>
        <Callout tone="warning" title="Com link e código">
          Troque <code>outline: none</code> por um contorno próprio. <a href="#foco">Veja como</a>.
        </Callout>
      </div>
    </UblDocStage>
  ),
};

/**
 * Os três tons nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UblDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          surface="page"
          theme={tema}
          align="stretch"
          direction="column"
          padding={24}
          width={420}
        >
          {TONES.map((tom) => (
            <Callout key={tom} theme={tema} tone={tom} title={TITULO[tom]}>
              {TEXTO[tom]}
            </Callout>
          ))}
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Cada aviso é um `role="note"` e o tom aparece também em texto, para quem não
 * enxerga a cor nem o glifo.
 */
export const TomEmTexto: Story = {
  name: 'Papel note e tom em texto',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24}>
      {TONES.map((tom) => (
        <div key={tom} style={COLUNA}>
          <Callout tone={tom} title={TITULO[tom]}>
            {TEXTO[tom]}
          </Callout>
        </div>
      ))}
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const avisos = tela.getAllByRole('note');

    await expect(avisos).toHaveLength(3);
    await expect(avisos[0]).toHaveTextContent('Informação:');
    await expect(avisos[1]).toHaveTextContent('Dica:');
    await expect(avisos[2]).toHaveTextContent('Atenção:');

    for (const tom of TONES) {
      await expect(tela.getByText(TITULO[tom])).toBeInTheDocument();
    }
  },
};
