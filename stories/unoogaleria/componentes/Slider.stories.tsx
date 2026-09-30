import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Slider } from '../../../src/unoogaleria/components/Slider';
import type { UglSliderProps } from '../../../src/unoogaleria/components/Slider';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocCard,
  UglDocGrid,
  UglDocSpecs,
  UglDocDecisions,
  UglDocAnatomy,
  UglDocPractices,
  UglDocStage,
  UglDocThemeSwitcher,
  UglDocPropsTable,
} from '../../../.storybook/components';

const BAR = '#716C98';

const formatDegrees = (value: number) =>
  value === 0 ? '0°' : `${value > 0 ? '+' : '−'}${Math.abs(value)}°`;

/**
 * Deslizador controlado pela estória: guarda o valor e repassa os avisos.
 */
const SliderControlado: React.FC<Omit<UglSliderProps, 'value'> & { inicial?: number }> = ({
  inicial = 0,
  onChange,
  ...props
}) => {
  const [valor, setValor] = useState(inicial);
  return (
    <Slider
      {...props}
      value={valor}
      onChange={(proximo) => {
        setValor(proximo);
        onChange?.(proximo);
      }}
    />
  );
};

const legenda: React.CSSProperties = {
  fontFamily: 'var(--ugl-font-sans)',
  fontSize: 12,
  color: 'var(--ugl-color-text-secondary)',
  margin: '0 0 8px',
};

const legendaImersiva: React.CSSProperties = {
  ...legenda,
  color: 'var(--ugl-color-immersive-text-secondary)',
};

/**
 * Página de documentação rica do componente Slider.
 */
const SliderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Controles"
      title="Slider"
      description="Deslizador de um valor, com o input de faixa nativo por baixo e a trilha desenhada por cima. A origem configurável faz o preenchimento crescer a partir do centro nos ajustes que vão de -100 a 100, e o duplo clique volta a ela. É o deslizador do editor de fotos e serve também fora dele, na variante padrão."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Um controle, dois pontos de partida, duas superfícies."
    />
    <UglDocGrid>
      <UglDocCard icon="🎚️" title="Origem configurável">
        Com <code>origin</code> no mínimo, o preenchimento cresce da esquerda (intensidade,
        vinheta). Com <code>origin=&#123;0&#125;</code> numa faixa de -100 a 100, cresce do centro
        para os dois lados, e uma marca mostra onde fica o neutro.
      </UglDocCard>
      <UglDocCard icon="⌨️" title="Teclado próprio">
        Setas andam um passo, Page Up/Down um décimo da faixa, Home e End vão às pontas. O
        componente trata as teclas em vez de deixar para o navegador: o passo é o mesmo em
        qualquer um.
      </UglDocCard>
      <UglDocCard icon="✋" title="Fim de gesto">
        <code>onChange</code> sai a cada passo; <code>onChangeEnd</code>, uma vez só, ao soltar o
        ponteiro ou a tecla. É o que o editor usa para gravar um passo de histórico por gesto.
      </UglDocCard>
      <UglDocCard icon="↩️" title="Duplo clique volta à origem">
        O duplo clique leva o valor de volta a <code>origin</code> — o jeito rápido de zerar um
        ajuste — e dispara <code>onChangeEnd</code>.
      </UglDocCard>
      <UglDocCard icon="🌗" title="Duas superfícies">
        <code>default</code> acompanha o tema; <code>immersive</code> usa os tokens invariantes do
        editor, legíveis sobre o fundo escuro em qualquer tema.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de comportamento."
    />
    <UglDocSpecs
      component="Slider"
      layout="Rótulo e valor · faixa de 44px"
      specs={[
        { label: 'Alvo de toque', value: '--ugl-touch-target (44px), a faixa inteira' },
        { label: 'Trilha', value: '4px · --ugl-radius-full' },
        { label: 'Botão', value: '20px · --ugl-elevation-overlay' },
        { label: 'Rótulo e valor', value: 'label (14/20, 600) · tabular-nums' },
        { label: 'Preenchido', value: 'action-primary · immersive-accent' },
        { label: 'Foco', value: '2px em focus-ring · immersive-accent' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Input nativo transparente por cima',
          detail:
            'o <input type="range"> recebe o ponteiro, o foco e é o que o leitor de tela lê (papel slider, aria-valuetext); a trilha, o preenchimento e o botão são desenhados por baixo. A trilha é recuada meia largura do botão de cada lado — exatamente onde o navegador centraliza o botão nativo nas pontas —, então as duas camadas coincidem em qualquer valor.',
        },
        {
          subject: 'Teclado tratado pelo componente',
          detail:
            'setas, Page Up/Down (um décimo da faixa), Home e End chamam preventDefault e aplicam o passo; a ação padrão do navegador não roda. Isso uniformiza o passo e permite emitir onChangeEnd no keyup, como no pointerup.',
        },
        {
          subject: 'Medidas locais',
          detail:
            '--ugl-slider-thumb-size (20px), --ugl-slider-track-height (4px) e as marcas de 2 × 12px não têm token equivalente e ficam declaradas no topo do bloco do componente.',
        },
        {
          subject: 'Trilha vazia sem contraste de 3:1',
          detail:
            'a trilha vazia usa border-default (claro) e immersive-track (imersivo), abaixo de 3:1. O estado se lê pelo preenchimento e pelo botão, ambos acima de 3:1 contra a superfície (action-primary 4,88:1 no claro; o branco imersivo sobre a superfície imersiva passa de 18:1).',
        },
        {
          subject: 'Valor com sinal quando a origem não é o mínimo',
          detail:
            'sem formatValue, o valor sai em pt-BR com “+” e “−” (sinal de menos tipográfico) quando origin ≠ min, porque ali o neutro é o meio. O mesmo texto vira o aria-valuetext; o valor visível é aria-hidden para não ser lido duas vezes.',
        },
        {
          subject: 'hideLabel',
          detail:
            'a prop não estava no contrato: acrescentada para os casos em que o rótulo aparece em outro lugar (por exemplo, acima de um grupo). O rótulo continua ligado por htmlFor e só sai da tela.',
        },
        {
          subject: 'Marcas não prendem o valor',
          detail:
            'ticks desenha referências sobre a trilha, sem ímã: prender o valor num editor fino atrapalharia o ajuste de um grau.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Rótulo, valor, trilha, preenchimento, marca de origem e botão."
    />
    <UglDocStage label="Brilho de -100 a 100, origem no centro" align="flex-start">
      <div style={{ width: 320 }}>
        <SliderControlado label="Brilho" min={-100} max={100} origin={0} inicial={36} showValue />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Rótulo', role: 'Nome visível e acessível, ligado ao input por htmlFor.', token: '--ugl-font-label-*' },
            { name: 'Valor', role: 'Valor formatado, com sinal quando a origem não é o mínimo.', token: '--ugl-color-text-secondary' },
            { name: 'Trilha', role: 'Faixa vazia de 4px, recuada meia largura do botão.', token: '--ugl-color-border-default' },
            { name: 'Preenchimento', role: 'Da origem até o valor, para um lado ou para o outro.', token: '--ugl-color-action-primary' },
            { name: 'Marca de origem', role: 'Só quando origin ≠ min: onde fica o neutro.', token: '--ugl-color-icon-secondary' },
            { name: 'Botão', role: 'Posição atual; recebe o anel de foco do input.', token: '--ugl-color-action-primary · --ugl-elevation-overlay' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Variantes, origem, marcas e estados — o componente real."
    />
    <UglDocStage label="Variante default (tema claro)" direction="column" align="stretch">
      <SliderControlado label="Tamanho das miniaturas" inicial={40} showValue />
      <SliderControlado label="Brilho" min={-100} max={100} origin={0} inicial={-24} showValue />
      <SliderControlado label="Com marcas" inicial={50} ticks={[25, 50, 75]} showValue />
    </UglDocStage>
    <UglDocStage label="Variante immersive" surface="immersive" direction="column" align="stretch">
      <SliderControlado variant="immersive" label="Intensidade" inicial={80} showValue />
      <SliderControlado
        variant="immersive"
        label="Endireitar"
        min={-45}
        max={45}
        origin={0}
        inicial={6}
        ticks={[-30, -15, 15, 30]}
        formatValue={formatDegrees}
        showValue
      />
    </UglDocStage>
    <UglDocStage label="Estados" direction="column" align="stretch">
      <SliderControlado label="Desabilitado" inicial={30} showValue disabled />
      <SliderControlado label="Rótulo só para o leitor de tela" hideLabel inicial={60} />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando e como usar." />
    <UglDocPractices
      dos={[
        'Usar origin={0} em ajustes que têm um neutro no meio da faixa.',
        'Gravar histórico ou salvar em onChangeEnd, e só pré-visualizar em onChange.',
        'Dar um label que descreva o que muda ("Brilho", "Intensidade"), mesmo com hideLabel.',
        'Informar formatValue quando a unidade importa (graus, porcentagem).',
        'Usar a variante immersive sobre a superfície escura do editor e do visualizador.',
      ]}
      donts={[
        'Salvar a cada onChange: um arraste viraria centenas de gravações.',
        'Usar o deslizador para escolher entre opções discretas — use um grupo de rádios.',
        'Esconder o valor quando o número exato importa para a decisão.',
        'Pôr a variante default sobre a mídia ou sobre a superfície imersiva.',
        'Contar com as marcas para prender o valor: elas são só referência.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A variante default acompanha o tema; a immersive é invariante."
    />
    <UglDocThemeSwitcher>
      {(tema) => (
        <div style={{ width: 320 }}>
          <SliderControlado theme={tema} label="Brilho" min={-100} max={100} origin={0} inicial={24} showValue />
          <SliderControlado theme={tema} label="Tamanho das miniaturas" inicial={60} showValue />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do Slider. Os demais atributos vão para o invólucro; a ref aponta para o input."
    />
    <UglDocPropsTable
      title="Slider"
      rows={[
        { name: 'label', type: 'string', description: 'Nome acessível e rótulo visível. Obrigatório.' },
        { name: 'value', type: 'number', description: 'Valor controlado.' },
        { name: 'defaultValue', type: 'number', default: 'origin', description: 'Valor inicial em modo não controlado.' },
        { name: 'onChange', type: '(value: number) => void', description: 'A cada passo (arraste ou teclado).' },
        { name: 'onChangeEnd', type: '(value: number) => void', description: 'Ao soltar o ponteiro ou a tecla, e no duplo clique; só se o valor mudou.' },
        { name: 'min', type: 'number', default: '0', description: 'Valor mínimo.' },
        { name: 'max', type: 'number', default: '100', description: 'Valor máximo.' },
        { name: 'step', type: 'number', default: '1', description: 'Passo entre valores.' },
        { name: 'origin', type: 'number', default: 'min', description: 'De onde parte o preenchimento e para onde volta o duplo clique.' },
        { name: 'showValue', type: 'boolean', default: 'false', description: 'Mostra o valor formatado à direita do rótulo.' },
        { name: 'hideLabel', type: 'boolean', default: 'false', description: 'Esconde o rótulo visualmente, mantendo-o acessível.' },
        { name: 'variant', type: "'default' | 'immersive'", default: "'default'", description: 'Superfície de uso.' },
        { name: 'ticks', type: 'number[]', description: 'Marcas de referência sobre a trilha.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o controle.' },
        { name: 'formatValue', type: '(value: number) => string', description: 'Formata o valor visível e o aria-valuetext.' },
        { name: 'name', type: 'string', description: 'Nome do campo em formulário.' },
        { name: 'id', type: 'string', default: 'useId', description: 'Id do input (o do consumidor vence).' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className / style', type: 'string / CSSProperties', description: 'Aplicados ao invólucro.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Slider> = {
  title: 'Unoogaleria/Componentes/Slider',
  component: Slider,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Nome acessível e rótulo visível.' },
    value: { control: { type: 'number' }, description: 'Valor controlado.' },
    defaultValue: { control: { type: 'number' }, description: 'Valor inicial não controlado.' },
    min: { control: { type: 'number' }, description: 'Valor mínimo.' },
    max: { control: { type: 'number' }, description: 'Valor máximo.' },
    step: { control: { type: 'number', min: 0.1, step: 0.1 }, description: 'Passo.' },
    origin: { control: { type: 'number' }, description: 'Origem do preenchimento.' },
    showValue: { control: 'boolean', description: 'Mostra o valor.' },
    hideLabel: { control: 'boolean', description: 'Rótulo só para o leitor de tela.' },
    variant: { control: 'radio', options: ['default', 'immersive'], description: 'Superfície de uso.' },
    ticks: { control: 'object', description: 'Marcas de referência.' },
    disabled: { control: 'boolean', description: 'Desabilitado.' },
    name: { control: 'text', description: 'Nome do campo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    formatValue: { control: false, description: 'Formatação do valor.' },
    onChange: { action: 'onChange' },
    onChangeEnd: { action: 'onChangeEnd' },
  },
  args: {
    label: 'Brilho',
    defaultValue: 20,
    min: -100,
    max: 100,
    step: 1,
    origin: 0,
    showValue: true,
    hideLabel: false,
    variant: 'default',
    ticks: [],
    disabled: false,
    name: 'brilho',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SliderDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Slider expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Slider',
  render: (args) => (
    <UglDocStage
      theme={args.theme}
      surface={args.variant === 'immersive' ? 'immersive' : 'primary'}
      align="stretch"
      direction="column"
    >
      <div style={{ width: 320 }}>
        <Slider {...args} />
      </div>
    </UglDocStage>
  ),
};

/**
 * Os três deslizadores do painel de ajuste de uma foto, sobre a superfície imersiva.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: painel de ajustes',
  render: () => (
    <UglDocStage surface="immersive" direction="column" align="stretch">
      <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SliderControlado variant="immersive" label="Exposição" min={-100} max={100} origin={0} inicial={12} showValue />
        <SliderControlado variant="immersive" label="Contraste" min={-100} max={100} origin={0} inicial={-18} showValue />
        <SliderControlado variant="immersive" label="Vinheta" inicial={35} showValue />
      </div>
    </UglDocStage>
  ),
};

/**
 * As duas variantes, com origem no mínimo e no centro.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <UglDocStage label="default" direction="column" align="stretch" width={340}>
        <p style={legenda}>origin = min</p>
        <SliderControlado label="Tamanho das miniaturas" inicial={40} showValue />
        <p style={legenda}>origin = 0 (centro)</p>
        <SliderControlado label="Saturação" min={-100} max={100} origin={0} inicial={-40} showValue />
      </UglDocStage>
      <UglDocStage label="immersive" surface="immersive" direction="column" align="stretch" width={340}>
        <p style={legendaImersiva}>origin = min</p>
        <SliderControlado variant="immersive" label="Intensidade" inicial={70} showValue />
        <p style={legendaImersiva}>origin = 0 (centro), com marcas</p>
        <SliderControlado
          variant="immersive"
          label="Endireitar"
          min={-45}
          max={45}
          origin={0}
          inicial={-12}
          ticks={[-30, -15, 15, 30]}
          formatValue={formatDegrees}
          showValue
        />
      </UglDocStage>
    </div>
  ),
};

/**
 * Padrão, na origem, nas pontas, desabilitado e com rótulo escondido.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage direction="column" align="stretch" width={340}>
      <SliderControlado label="Na origem" min={-100} max={100} origin={0} inicial={0} showValue />
      <SliderControlado label="No mínimo" min={-100} max={100} origin={0} inicial={-100} showValue />
      <SliderControlado label="No máximo" min={-100} max={100} origin={0} inicial={100} showValue />
      <SliderControlado label="Desabilitado" inicial={30} showValue disabled />
      <SliderControlado label="Rótulo escondido" hideLabel inicial={50} />
    </UglDocStage>
  ),
};

/**
 * A variante default nos dois temas, ao lado da immersive.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UglDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={tema}
          direction="column"
          align="stretch"
          width={320}
        >
          <SliderControlado label="Brilho" min={-100} max={100} origin={0} inicial={30} showValue />
          <SliderControlado label="Tamanho das miniaturas" inicial={60} showValue />
          <SliderControlado label="Desabilitado" inicial={30} showValue disabled />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Teclado, fim de gesto e duplo clique de volta à origem.
 */
export const TecladoEOrigem: Story = {
  name: 'Teclado e volta à origem',
  args: { onChange: fn(), onChangeEnd: fn() },
  render: (args) => (
    <UglDocStage direction="column" align="stretch" width={340}>
      <SliderControlado
        label="Brilho"
        min={-100}
        max={100}
        origin={0}
        showValue
        onChange={args.onChange}
        onChangeEnd={args.onChangeEnd}
      />
    </UglDocStage>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const brilho = tela.getByRole('slider', { name: 'Brilho' });

    brilho.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(brilho).toHaveValue('1');
    await expect(brilho).toHaveAttribute('aria-valuetext', '+1');
    await expect(args.onChange).toHaveBeenLastCalledWith(1);
    // Um passo de teclado é um gesto: o fim sai ao soltar a tecla.
    await expect(args.onChangeEnd).toHaveBeenLastCalledWith(1);

    await userEvent.keyboard('{PageUp}');
    await expect(brilho).toHaveValue('21');

    await userEvent.keyboard('{ArrowLeft}');
    await expect(brilho).toHaveValue('20');

    await userEvent.keyboard('{Home}');
    await expect(brilho).toHaveAttribute('aria-valuetext', '−100');

    await userEvent.keyboard('{End}');
    await expect(brilho).toHaveValue('100');

    // O duplo clique volta à origem e encerra o gesto.
    await userEvent.dblClick(brilho);
    await expect(brilho).toHaveValue('0');
    await expect(args.onChangeEnd).toHaveBeenLastCalledWith(0);
  },
};
