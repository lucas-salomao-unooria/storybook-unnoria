import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { CodeBlock } from '../../../src/unooblog/components/CodeBlock';
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

const CSS = `:where(a, button, input, select, textarea, [tabindex]):focus-visible {
  outline: 3px solid var(--cor-foco);
  outline-offset: 2px;
  border-radius: 4px;
}

@media (forced-colors: active) {
  :where(a, button):focus-visible {
    outline-color: Highlight;
  }
}`;

const TS = `export function abrirComFoco(painel: HTMLElement) {
  const anterior = document.activeElement as HTMLElement | null;
  painel.focus();

  return function fechar() {
    anterior?.focus({ preventScroll: true });
  };
}`;

const LINHA_LONGA = `const mensagem = 'Uma linha de código bem comprida, que não cabe na largura da coluna e por isso rola na horizontal sem quebrar: o bloco precisa ser alcançável pelo teclado.';`;

const COLUNA: React.CSSProperties = { width: 'min(680px, 100%)', boxSizing: 'border-box' };

/**
 * Página de documentação rica do componente CodeBlock.
 */
const CodeBlockDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Leitura"
      title="CodeBlock"
      description="Bloco de código do post, sobre uma superfície escura que não muda com o tema. Barra com o nome do arquivo e o botão de copiar, corpo rolável com foco por teclado, linhas numeradas e destacadas."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Quando o texto traz código que a pessoa vai copiar."
    />
    <UblDocGrid>
      <UblDocCard icon="📋" title="Copiar com um clique">
        O botão copia o trecho inteiro, sem os números de linha, e a confirmação &quot;Copiado&quot;
        é anunciada também por leitor de tela.
      </UblDocCard>
      <UblDocCard icon="🌗" title="Escuro nos dois temas">
        Código se lê melhor sobre fundo escuro. A superfície é invariante: não muda entre o tema claro e
        o escuro, e o contorno delimita o bloco na página escura.
      </UblDocCard>
      <UblDocCard icon="🔦" title="Linhas em destaque">
        Faixa de fundo e barra lateral marcam as linhas que o texto comenta. As linhas também são
        citadas no nome acessível da região.
      </UblDocCard>
      <UblDocCard icon="⌨️" title="Rolável por teclado">
        Linhas longas rolam na horizontal. O corpo é uma região com foco: com as setas, quem navega só
        com o teclado alcança o fim da linha.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura própria do módulo; cores e fontes são as da Plataforma Unooria."
    />
    <UblDocSpecs
      component="CodeBlock"
      layout="Coluna · barra superior (44px) · corpo rolável"
      specs={[
        { label: 'Superfície', value: '--ubl-color-code-surface · invariante entre temas' },
        { label: 'Contorno', value: '1px · --ubl-color-code-border · raio --ubl-radius-m (12px)' },
        { label: 'Barra', value: 'altura mínima 44px · nome em code-text-muted · fio inferior em code-border' },
        { label: 'Botão copiar', value: '44px de alvo · hover em --ubl-color-code-control · glifo copy/check' },
        { label: 'Texto', value: '--ubl-font-mono · code (14/20) · --ubl-color-code-text' },
        { label: 'Linha destacada', value: 'fundo --ubl-color-code-control · barra de 4px em --ubl-color-code-accent' },
        { label: 'Números', value: 'code-text-muted · não selecionáveis · aria-hidden' },
        { label: 'Corpo', value: 'role="region" · tabIndex=0 · aria-label com arquivo, linguagem e linhas destacadas' },
        { label: 'Anúncio', value: 'role="status" aria-live="polite" · "Copiado"' },
        { label: 'Fronteira', value: 'Client Component (estado de cópia e área de transferência)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Sem realce de sintaxe',
          detail:
            'o bloco não colore o código. Realçar exige uma biblioteca de tokens e uma paleta por linguagem, e o módulo não publica cores de sintaxe; todo o texto é code-text, que mede contraste alto sobre a superfície. Um produto que queira realce pode envolver o bloco ou trocar o conteúdo do <code>.',
        },
        {
          subject: 'Superfície invariante',
          detail:
            'código em fundo claro cansa e perde o contraste das cores de destaque. Os tokens --ubl-color-code-* valem nos dois temas; no tema escuro, onde a página tem a mesma cor do bloco, o contorno de 1px em code-border é o que o delimita.',
        },
        {
          subject: 'Barra com nome do arquivo ou linguagem',
          detail:
            'a barra mostra o filename (em fonte monoespaçada) e, quando há os dois, a linguagem ao lado, em tom discreto. Sem filename, mostra só a linguagem.',
        },
        {
          subject: 'Copiar tem estado de sucesso e de falha',
          detail:
            'navigator.clipboard.writeText roda em try/catch. Se der certo, o botão mostra o glifo de confirmação e "Copiado" por dois segundos e onCopy recebe o código; se a área de transferência recusar (contexto sem HTTPS, permissão negada), a mesma região aria-live anuncia "Não foi possível copiar". O texto copiado é a prop code, nunca o conteúdo do DOM.',
        },
        {
          subject: 'Nome do botão não muda',
          detail:
            'o aria-label é sempre "Copiar código"; o texto "Copiado" visível é aria-hidden e o anúncio vai pela região aria-live. Trocar o nome do botão e anunciar a região faria o leitor de tela falar duas vezes.',
        },
        {
          subject: 'Região rolável com foco',
          detail:
            'o corpo é role="region" com tabIndex=0 e nome acessível. Sem isso, o conteúdo que passa da largura não seria alcançável por quem não usa o mouse; o anel de foco é interno (offset negativo) para não ser cortado pelo overflow.',
        },
        {
          subject: 'Números de linha fora do texto',
          detail:
            'os números são spans aria-hidden com user-select: none: não entram na seleção, no texto copiado nem na leitura por leitor de tela.',
        },
        {
          subject: 'Barra lateral e faixa nas linhas destacadas',
          detail:
            'destaque por forma, e não só por cor: barra de 4px e faixa de fundo. O nome acessível da região lista as linhas destacadas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Barra, botão de copiar, corpo e anúncio."
    />
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <div style={COLUNA}>
        <CodeBlock code={CSS} language="css" filename="foco.css" showLineNumbers highlightLines={[2, 3]} />
      </div>
      <UblDocAnatomy
        zones={[
          { name: 'Barra', role: 'Nome do arquivo ou linguagem à esquerda; botão de copiar à direita.', token: 'filename · language' },
          { name: 'Botão de copiar', role: 'Copia o código e confirma com "Copiado".', token: 'copyLabel · copiedLabel' },
          { name: 'Corpo', role: 'Região rolável e focável com o código em fonte monoespaçada.', token: 'role="region" · tabIndex=0' },
          { name: 'Números', role: 'Numeração opcional, não selecionável.', token: 'showLineNumbers' },
          { name: 'Linha destacada', role: 'Faixa de fundo e barra lateral.', token: 'highlightLines' },
          { name: 'Anúncio', role: 'Região aria-live que fala "Copiado".', token: 'role="status"' },
        ]}
      />
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cabeçalho da barra, numeração e destaque."
    />
    <UblDocStage label="Barra: arquivo, linguagem, os dois, nenhum" surface="page" align="stretch" direction="column" padding={24}>
      <div style={COLUNA}>
        <CodeBlock code={TS} filename="abrirComFoco.ts" />
      </div>
      <div style={COLUNA}>
        <CodeBlock code={TS} language="TypeScript" />
      </div>
      <div style={COLUNA}>
        <CodeBlock code={TS} filename="abrirComFoco.ts" language="TypeScript" />
      </div>
      <div style={COLUNA}>
        <CodeBlock code={TS} />
      </div>
    </UblDocStage>
    <UblDocStage label="Numeração e destaque" surface="page" align="stretch" direction="column" padding={24}>
      <div style={COLUNA}>
        <CodeBlock code={TS} filename="abrirComFoco.ts" showLineNumbers />
      </div>
      <div style={COLUNA}>
        <CodeBlock code={TS} filename="abrirComFoco.ts" highlightLines={[2, 6]} />
      </div>
      <div style={COLUNA}>
        <CodeBlock code={TS} filename="abrirComFoco.ts" showLineNumbers highlightLines={[2, 6]} />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar o bloco." />
    <UblDocPractices
      dos={[
        'Dar o nome do arquivo quando o trecho pertence a um arquivo.',
        'Destacar só as linhas que o texto comenta, e citá-las no parágrafo seguinte.',
        'Manter o trecho enxuto: o suficiente para entender e copiar.',
        'Escrever em texto o que o código faz: o bloco não substitui a explicação.',
      ]}
      donts={[
        'Colar capturas de tela de código: não dá para copiar nem ler com leitor de tela.',
        'Destacar quase todas as linhas: o destaque deixa de significar algo.',
        'Contar com cor para diferenciar partes do código: o bloco não colore a sintaxe.',
        'Incluir segredos reais (chaves, senhas) nos exemplos.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O bloco é o mesmo nos dois temas; muda só o fundo da página ao redor."
    />
    <UblDocThemeSwitcher surface="page" padding={32}>
      {(tema) => (
        <div style={COLUNA}>
          <CodeBlock theme={tema} code={CSS} language="css" filename="foco.css" showLineNumbers highlightLines={[2, 3]} />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do CodeBlock. Os demais atributos vão à <div> raiz."
    />
    <UblDocPropsTable
      title="CodeBlock"
      rows={[
        { name: 'code', type: 'string', description: 'Código a exibir, com quebras de linha. É o texto enviado à área de transferência.' },
        { name: 'language', type: 'string', description: 'Linguagem do trecho. Aparece na barra (sem filename) e no nome da região. Não liga realce.' },
        { name: 'filename', type: 'string', description: 'Nome do arquivo. Tem precedência sobre a linguagem na barra.' },
        { name: 'showLineNumbers', type: 'boolean', default: 'false', description: 'Mostra a numeração das linhas (não selecionável).' },
        { name: 'highlightLines', type: 'number[]', description: 'Linhas a destacar, contadas a partir de 1.' },
        { name: 'copyLabel', type: 'string', default: "'Copiar código'", description: 'Nome acessível do botão de copiar.' },
        { name: 'copiedLabel', type: 'string', default: "'Copiado'", description: 'Confirmação mostrada no botão e anunciada na região aria-live.' },
        { name: 'copyFailedLabel', type: 'string', default: "'Não foi possível copiar'", description: 'Anúncio quando a área de transferência recusa a cópia.' },
        { name: 'onCopy', type: '(code: string) => void', description: 'Chamado depois de uma cópia bem-sucedida.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. O bloco é invariante; afeta só o herdado.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof CodeBlock> = {
  title: 'Unooblog/Componentes/CodeBlock',
  component: CodeBlock,
  parameters: { layout: 'padded' },
  argTypes: {
    code: { control: 'text', description: 'Código a exibir.' },
    language: { control: 'text', description: 'Linguagem do trecho.' },
    filename: { control: 'text', description: 'Nome do arquivo.' },
    showLineNumbers: { control: 'boolean', description: 'Mostra a numeração das linhas.' },
    highlightLines: { control: 'object', description: 'Linhas a destacar (a partir de 1).' },
    copyLabel: { control: 'text', description: 'Nome acessível do botão de copiar.' },
    copiedLabel: { control: 'text', description: 'Confirmação de cópia.' },
    copyFailedLabel: { control: 'text', description: 'Anúncio de falha na cópia.' },
    onCopy: { action: 'onCopy', description: 'Chamado depois de uma cópia bem-sucedida.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    code: TS,
    language: 'TypeScript',
    filename: 'abrirComFoco.ts',
    showLineNumbers: true,
    highlightLines: [2, 6],
    copyLabel: 'Copiar código',
    copiedLabel: 'Copiado',
    copyFailedLabel: 'Não foi possível copiar',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof CodeBlock>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CodeBlockDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do CodeBlock',
  render: (args) => (
    <UblDocStage surface="page" theme={args.theme} align="stretch" direction="column" padding={32}>
      <div style={COLUNA}>
        <CodeBlock {...args} />
      </div>
    </UblDocStage>
  ),
};

/**
 * O bloco entre parágrafos, como num post.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: código no post',
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
          Um bom indicador tem espessura, afastamento e cor próprios. Em CSS, três linhas bastam:
        </p>
        <CodeBlock code={CSS} language="css" filename="foco.css" highlightLines={[2, 3, 4]} />
        <p className="ubl-text ubl-text--prose">
          O bloco de mídia forçada devolve a cor do sistema a quem usa alto contraste.
        </p>
      </div>
    </UblDocStage>
  ),
};

/**
 * O bloco em contêineres de larguras diferentes: o código rola, o bloco não estoura.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" direction="column" padding={24}>
      {[260, 420, 680].map((largura) => (
        <div key={largura} style={{ width: largura, maxWidth: '100%' }}>
          <CodeBlock code={LINHA_LONGA} language="TypeScript" showLineNumbers />
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * Com e sem arquivo, linguagem, numeração e destaque.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24}>
      <div style={COLUNA}>
        <CodeBlock code={TS} />
      </div>
      <div style={COLUNA}>
        <CodeBlock code={TS} language="TypeScript" />
      </div>
      <div style={COLUNA}>
        <CodeBlock code={TS} filename="abrirComFoco.ts" language="TypeScript" showLineNumbers />
      </div>
      <div style={COLUNA}>
        <CodeBlock code={TS} filename="abrirComFoco.ts" showLineNumbers highlightLines={[2, 6]} />
      </div>
    </UblDocStage>
  ),
};

/**
 * Linha longa que rola, linha em branco, uma linha só e código vazio.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24}>
      <div style={{ ...COLUNA, width: 'min(360px, 100%)' }}>
        <CodeBlock code={LINHA_LONGA} language="TypeScript" />
      </div>
      <div style={COLUNA}>
        <CodeBlock code={CSS} language="css" showLineNumbers />
      </div>
      <div style={COLUNA}>
        <CodeBlock code="npm install @unooria/design-system" language="bash" />
      </div>
      <div style={COLUNA}>
        <CodeBlock code="" language="texto" />
      </div>
    </UblDocStage>
  ),
};

/**
 * O bloco nos dois temas: a superfície é a mesma, e o contorno delimita-a na página escura.
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
          width={460}
        >
          <CodeBlock theme={tema} code={CSS} language="css" filename="foco.css" showLineNumbers highlightLines={[2, 3]} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Copiar mostra "Copiado" na região aria-live e no botão, chama `onCopy` com o
 * código e depois devolve o botão ao estado inicial.
 */
export const CopiarMostraCopiado: Story = {
  name: 'Copiar mostra "Copiado" e devolve',
  args: { onCopy: fn(), showLineNumbers: true },
  render: (args) => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <div style={COLUNA}>
        <CodeBlock {...args} />
      </div>
    </UblDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const copiar = tela.getByRole('button', { name: 'Copiar código' });
    const anuncio = tela.getByRole('status');
    // A sessão do user-event substitui navigator.clipboard por um stub: não depende da permissão do navegador
    const usuario = userEvent.setup();

    await expect(anuncio).toBeEmptyDOMElement();

    await usuario.click(copiar);
    await waitFor(() => expect(anuncio).toHaveTextContent('Copiado'));
    await expect(args.onCopy).toHaveBeenCalledWith(args.code);
    await expect(copiar).toHaveAccessibleName('Copiar código');
    await expect(await navigator.clipboard.readText()).toBe(args.code);

    // Depois de dois segundos, o anúncio e o texto do botão voltam ao inicial
    await waitFor(() => expect(anuncio).toBeEmptyDOMElement(), { timeout: 4000 });
  },
};

/**
 * O corpo do código é uma região rolável alcançável por teclado, com nome que
 * cita o arquivo e as linhas destacadas; os números de linha ficam fora da leitura.
 */
export const RegiaoPorTeclado: Story = {
  name: 'Região alcançável por teclado',
  args: { showLineNumbers: true, highlightLines: [2, 6] },
  render: (args) => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <div style={{ ...COLUNA, width: 'min(420px, 100%)' }}>
        <CodeBlock {...args} />
      </div>
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const regiao = tela.getByRole('region', {
      name: 'Código do arquivo abrirComFoco.ts, linhas destacadas: 2, 6',
    });

    await expect(regiao).toHaveAttribute('tabindex', '0');

    await userEvent.tab();
    await expect(tela.getByRole('button', { name: 'Copiar código' })).toHaveFocus();
    await userEvent.tab();
    await expect(regiao).toHaveFocus();

    const numeros = canvasElement.querySelectorAll('.ubl-code-block__number');
    await expect(numeros.length).toBeGreaterThan(0);
    for (const numero of Array.from(numeros)) {
      await expect(numero).toHaveAttribute('aria-hidden', 'true');
    }
  },
};
