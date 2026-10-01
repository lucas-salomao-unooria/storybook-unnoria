import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import { ReadingProgress } from '../../../src/unooblog/components/ReadingProgress';
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

/** Os quatro valores de referência da matriz. */
const ESTADOS = [0, 25, 50, 100] as const;

const rotuloEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ubl-font-sans)',
  fontSize: 'var(--ubl-font-caption-size)',
  lineHeight: 'var(--ubl-font-caption-line)',
  color: 'var(--ubl-color-text-secondary)',
};

/**
 * Faixa com a legenda do valor, para as matrizes de estados.
 */
const FaixaRotulada: React.FC<{ valor: number; theme?: 'light' | 'dark'; largura?: number | string }> = ({
  valor,
  theme,
  largura = 320,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: largura }}>
    <p style={rotuloEstilo}>{valor}%</p>
    <ReadingProgress value={valor} theme={theme} label={`Progresso de leitura: ${valor}%`} />
  </div>
);

/**
 * Parágrafos de enchimento para dar altura ao contêiner rolável.
 */
const ENCHIMENTO = Array.from({ length: 14 }, (_, indice) => (
  <p key={indice} style={{ margin: '0 0 12px' }}>
    Trecho {indice + 1} do post: a rolagem do contêiner é o que a faixa acompanha, do topo até o
    último parágrafo.
  </p>
));

/**
 * Contêiner rolável com a faixa ligada a ele por `targetRef`.
 */
const LeituraPelaRolagem: React.FC<{ theme?: 'light' | 'dark'; label?: string }> = ({ theme, label }) => {
  const alvo = useRef<HTMLDivElement>(null);

  return (
    <div
      data-ubl-theme={theme}
      style={{
        width: 360,
        border: '1px solid var(--ubl-color-border-subtle)',
        background: 'var(--ubl-color-background-card)',
      }}
    >
      <ReadingProgress targetRef={alvo} label={label} />
      <div
        ref={alvo}
        data-testid="area-de-leitura"
        tabIndex={0}
        role="region"
        aria-label="Texto do post"
        style={{
          height: 200,
          overflowY: 'auto',
          padding: 16,
          boxSizing: 'border-box',
          fontFamily: 'var(--ubl-font-sans)',
          fontSize: 'var(--ubl-font-body-md-size)',
          lineHeight: 'var(--ubl-font-body-md-line)',
          color: 'var(--ubl-color-text-primary)',
        }}
      >
        {ENCHIMENTO}
      </div>
    </div>
  );
};

/**
 * Página de documentação rica do componente ReadingProgress.
 */
const ReadingProgressDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Navegação"
      title="ReadingProgress"
      description="Faixa de 3px que acompanha a leitura do post: trilha sutil, preenchimento na cor de ação e valor anunciado como barra de progresso. Recebe o valor pronto ou lê a rolagem de um elemento."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Dizer, sem texto, quanto falta."
    />
    <UblDocGrid>
      <UblDocCard icon="📏" title="Faixa no topo do post">
        Cola logo abaixo do <code>SiteHeader</code> (ou no topo da página, em <code>position: sticky</code>)
        enquanto a pessoa lê o post.
      </UblDocCard>
      <UblDocCard icon="🧮" title="Dois modos">
        <code>value</code> quando o produto já calcula o progresso; <code>targetRef</code> quando o
        componente deve ler a rolagem do elemento.
      </UblDocCard>
      <UblDocCard icon="♿" title="Barra de progresso de verdade">
        <code>role=&quot;progressbar&quot;</code> com <code>aria-valuemin</code>,{' '}
        <code>aria-valuemax</code>, <code>aria-valuenow</code> e <code>aria-valuetext</code> em
        porcentagem — o leitor de tela anuncia &quot;50%&quot;.
      </UblDocCard>
      <UblDocCard icon="🌗" title="Claro e escuro">
        Trilha e preenchimento usam só <code>border-subtle</code> e <code>action-primary</code>, que
        mudam com o tema.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Faixa de 3px do módulo; cores e fontes são as da Plataforma Unooria."
    />
    <UblDocSpecs
      component="ReadingProgress"
      layout="Faixa horizontal · 100% da largura · 3px de altura"
      specs={[
        { label: 'Altura', value: '--ubl-progress-height (3px)' },
        { label: 'Trilha', value: '--ubl-color-border-subtle' },
        { label: 'Preenchimento', value: '--ubl-color-action-primary' },
        { label: 'Camada', value: '--ubl-z-progress (15), quando colada sob o cabeçalho' },
        { label: 'Movimento', value: '--ubl-transition-fast na largura; nenhuma em prefers-reduced-motion' },
        { label: 'Fronteira', value: 'Client Component (estado e efeito do modo targetRef)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Origem no jornal e faixa de 3px',
          detail:
            'o componente parte do ReadingProgress validado do Unoojornal (mesmo contrato, mesmos dois modos); a faixa passou de 4px para 3px (--ubl-progress-height do blog), com o preenchimento em --ubl-color-action-primary, a cor de ação da Plataforma Unooria nos dois temas.',
        },
        {
          subject: 'Sem texto na faixa',
          detail:
            'a faixa é só gráfica. O valor chega ao leitor de tela por aria-valuenow e aria-valuetext, e quem precisa ver o número usa outro componente.',
        },
        {
          subject: 'value vence targetRef',
          detail:
            'com os dois, a faixa mostra o valor informado e não escuta a rolagem. É a regra que deixa o produto assumir o cálculo sem desligar nada.',
        },
        {
          subject: 'Ouvinte passivo, com limpeza',
          detail:
            'o modo targetRef escuta a rolagem com { passive: true } e um ResizeObserver, e remove os dois ao desmontar. Sem rolagem possível, o progresso é 0%.',
        },
        {
          subject: 'Arquivo único, marcado como cliente',
          detail:
            'o modo value sozinho seria Server Component, mas os dois modos vivem no mesmo arquivo e o targetRef usa estado e efeito; o arquivo inteiro é Client Component.',
        },
        {
          subject: 'Movimento reduzido',
          detail:
            'em prefers-reduced-motion o preenchimento muda de largura sem transição.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Duas camadas: a trilha e o preenchimento."
    />
    <UblDocStage surface="page" align="stretch" direction="column" padding={24}>
      <ReadingProgress value={50} />
      <UblDocAnatomy
        zones={[
          { name: 'Trilha', role: 'Faixa inteira, a largura do contêiner.', token: '--ubl-color-border-subtle' },
          { name: 'Preenchimento', role: 'Cresce da esquerda para a direita até o valor.', token: '--ubl-color-action-primary' },
          { name: 'Papel', role: 'progressbar com valor mínimo, máximo, atual e texto.', token: 'aria-valuenow · aria-valuetext' },
        ]}
      />
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Quatro valores de referência, e a leitura pela rolagem."
    />
    <UblDocStage label="Quatro valores (value)" surface="page" align="flex-start" padding={24}>
      {ESTADOS.map((valor) => (
        <FaixaRotulada key={valor} valor={valor} />
      ))}
    </UblDocStage>
    <UblDocStage label="Pelo targetRef: role o texto" surface="page" align="flex-start" padding={24}>
      <LeituraPelaRolagem />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando usar a faixa." />
    <UblDocPractices
      dos={[
        'Dar à faixa um rótulo que diga o que ela mede, se houver mais de uma na página.',
        'Usar targetRef quando a leitura acontece dentro de um contêiner rolável.',
        'Posicioná-la no topo da página ou da barra, onde o olhar já passa.',
        'Passar value quando o produto já conhece o progresso (por seção, por exemplo).',
      ]}
      donts={[
        'Usar a faixa como indicador de carregamento: ela mede leitura, não espera.',
        'Informar value e targetRef esperando que os dois somem: vale o value.',
        'Esconder a faixa para quem prefere menos movimento: o componente já tira a transição.',
        'Pôr texto sobre a faixa: o número vai no aria-valuetext.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Trilha e preenchimento acompanham o tema."
    />
    <UblDocThemeSwitcher surface="page" padding={24}>
      {(tema) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          {ESTADOS.map((valor) => (
            <FaixaRotulada key={valor} valor={valor} theme={tema} largura="100%" />
          ))}
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do ReadingProgress. Os demais atributos vão à raiz."
    />
    <UblDocPropsTable
      title="ReadingProgress"
      rows={[
        { name: 'value', type: 'number', description: 'Progresso de 0 a 100. Fora do intervalo é limitado. Vale sobre targetRef.' },
        { name: 'targetRef', type: 'RefObject<HTMLElement | null>', description: 'Elemento rolável que define o progresso (0% no topo, 100% no fim).' },
        { name: 'label', type: 'string', default: "'Progresso de leitura'", description: 'Nome acessível da barra (aria-label).' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ReadingProgress> = {
  title: 'Unooblog/Componentes/ReadingProgress',
  component: ReadingProgress,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: 'Progresso de 0 a 100.' },
    targetRef: { control: false, description: 'Elemento rolável lido pelo componente (modo targetRef).' },
    label: { control: 'text', description: 'Nome acessível da barra.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    value: 40,
    label: 'Progresso de leitura',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ReadingProgress>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ReadingProgressDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. O modo `targetRef` tem a
 * estória própria `Pela rolagem`.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ReadingProgress',
  render: (args) => (
    <UblDocStage surface="page" theme={args.theme} align="stretch" direction="column" padding={24}>
      <ReadingProgress {...args} />
    </UblDocStage>
  ),
};

/**
 * Quatro valores de referência, com o componente real.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: progresso de leitura',
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={24}>
      {ESTADOS.map((valor) => (
        <FaixaRotulada key={valor} valor={valor} />
      ))}
    </UblDocStage>
  ),
};

/**
 * A faixa ocupa a largura do contêiner: a mesma altura de 3px em três larguras.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" direction="column" padding={24}>
      {[360, 640, 960].map((largura) => (
        <FaixaRotulada key={largura} valor={50} largura={largura} />
      ))}
    </UblDocStage>
  ),
};

/**
 * O componente tem uma única forma; as variações são os valores.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={24}>
      {[0, 10, 25, 50, 75, 100].map((valor) => (
        <FaixaRotulada key={valor} valor={valor} />
      ))}
    </UblDocStage>
  ),
};

/**
 * Os estados do quadro, e o valor fora do intervalo, que é limitado.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={24}>
      {ESTADOS.map((valor) => (
        <FaixaRotulada key={valor} valor={valor} />
      ))}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 320 }}>
        <p style={rotuloEstilo}>value=150 (limitado a 100%)</p>
        <ReadingProgress value={150} label="Progresso de leitura: acima do limite" />
      </div>
    </UblDocStage>
  ),
};

/**
 * A faixa nos dois temas.
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
          width={360}
        >
          {ESTADOS.map((valor) => (
            <FaixaRotulada key={valor} valor={valor} theme={tema} largura="100%" />
          ))}
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Cada valor (0, 25, 50 e 100) aparece em `aria-valuenow` e `aria-valuetext`,
 * com os limites 0 e 100 declarados.
 */
export const Valores: Story = {
  name: 'Valores anunciados',
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={24}>
      {ESTADOS.map((valor) => (
        <FaixaRotulada key={valor} valor={valor} />
      ))}
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    for (const valor of ESTADOS) {
      const barra = tela.getByRole('progressbar', { name: `Progresso de leitura: ${valor}%` });
      await expect(barra).toHaveAttribute('aria-valuemin', '0');
      await expect(barra).toHaveAttribute('aria-valuemax', '100');
      await expect(barra).toHaveAttribute('aria-valuenow', String(valor));
      await expect(barra).toHaveAttribute('aria-valuetext', `${valor}%`);
    }
  },
};

/**
 * Modo `targetRef`: a faixa lê a rolagem do contêiner. Rolar até o fim vai a
 * 100%, voltar ao topo vai a 0%, e a metade do caminho fica em torno de 50%.
 */
export const PelaRolagem: Story = {
  name: 'Pela rolagem (targetRef)',
  render: () => <LeituraPelaRolagem />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const barra = tela.getByRole('progressbar', { name: 'Progresso de leitura' });
    const area = tela.getByTestId('area-de-leitura');
    const alcance = area.scrollHeight - area.clientHeight;

    await expect(alcance).toBeGreaterThan(0);
    await waitFor(() => expect(barra).toHaveAttribute('aria-valuenow', '0'));

    area.scrollTop = alcance / 2;
    await waitFor(() => {
      const atual = Number(barra.getAttribute('aria-valuenow'));
      expect(atual).toBeGreaterThanOrEqual(49);
      expect(atual).toBeLessThanOrEqual(51);
    });

    area.scrollTop = alcance;
    await waitFor(() => expect(barra).toHaveAttribute('aria-valuenow', '100'));

    area.scrollTop = 0;
    await waitFor(() => expect(barra).toHaveAttribute('aria-valuenow', '0'));
  },
};
