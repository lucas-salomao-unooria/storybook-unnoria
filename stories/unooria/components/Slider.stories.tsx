import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Slider } from '../../../src/unooria/components/Slider';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/* ---------------------------------------------------------------------------
   Conteúdo de demonstração — a régua do eixo vertical da missão "O Porta-Voz
   dos Dados" (1º ano do Ensino Médio). O texto de verdade mora na experiência.
   ------------------------------------------------------------------------- */

const ROTULO = 'Início do eixo vertical';
const PONTA_MIN = 'Eixo em 0% (proporcional)';
const PONTA_MAX = 'Eixo em 80% (truncado)';
const formatarEixo = (valor: number) => `Eixo em ${valor}%`;

/* ---------------------------------------------------------------------------
   Peças da página de documentação — só tokens, nenhuma cor avulsa (seção 2).
   ------------------------------------------------------------------------- */

const Cartao: React.FC<{ icone: string; titulo: string; children: React.ReactNode }> = ({
  icone,
  titulo,
  children,
}) => (
  <div
    style={{
      padding: 'var(--unooria-spacing-s)',
      border: '1px solid var(--unooria-color-neutral-150)',
      borderRadius: 12,
      background: 'var(--unooria-color-neutral-50)',
      color: 'var(--unooria-color-neutral-700)',
      fontSize: 14,
      lineHeight: 1.6,
    }}
  >
    <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--unooria-color-neutral-950)' }}>
      {icone} {titulo}
    </p>
    {children}
  </div>
);

const Grade: React.FC<{ children: React.ReactNode; min?: number }> = ({ children, min = 220 }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))`,
      gap: 'var(--unooria-spacing-s)',
      marginBottom: 'var(--unooria-spacing-l)',
    }}
  >
    {children}
  </div>
);

const Palco: React.FC<{ rotulo: string; escuro?: boolean; children: React.ReactNode }> = ({
  rotulo,
  escuro = false,
  children,
}) => (
  <div style={{ marginBottom: 'var(--unooria-spacing-m)' }}>
    <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--unooria-color-neutral-700)' }}>{rotulo}</p>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        alignItems: 'start',
        gap: 'var(--unooria-spacing-l)',
        padding: 'var(--unooria-spacing-m)',
        borderRadius: 12,
        background: escuro ? 'var(--unooria-color-neutraldark-50)' : 'var(--unooria-color-neutral-50)',
        border: '1px solid var(--unooria-color-neutral-150)',
      }}
    >
      {children}
    </div>
  </div>
);

const Praticas: React.FC<{ fazer: string[]; evitar: string[] }> = ({ fazer, evitar }) => (
  <Grade>
    <Cartao icone="✓" titulo="O que fazer">
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {fazer.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Cartao>
    <Cartao icone="✕" titulo="O que evitar">
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {evitar.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Cartao>
  </Grade>
);

const TabelaDeProps: React.FC<{
  linhas: { nome: string; tipo: string; padrao?: string; descricao: string }[];
}> = ({ linhas }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
      <thead>
        <tr style={{ color: 'var(--unooria-color-neutral-950)' }}>
          {['Prop', 'Tipo', 'Padrão', 'Descrição'].map((c) => (
            <th key={c} style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-200)' }}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody style={{ color: 'var(--unooria-color-neutral-700)' }}>
        {linhas.map((l) => (
          <tr key={l.nome}>
            <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
              <code>{l.nome}</code>
            </td>
            <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
              <code>{l.tipo}</code>
            </td>
            <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
              {l.padrao ? <code>{l.padrao}</code> : '—'}
            </td>
            <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>{l.descricao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** A régua do eixo da missão, controlada, no tema pedido. */
const ReguaDoEixo: React.FC<{ theme?: 'light' | 'dark'; inicial?: number }> = ({
  theme = 'light',
  inicial = 0,
}) => {
  const [valor, setValor] = useState(inicial);
  return (
    <Slider
      label={ROTULO}
      min={0}
      max={80}
      step={10}
      ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}
      value={valor}
      onChange={setValor}
      formatValue={formatarEixo}
      minLabel={PONTA_MIN}
      maxLabel={PONTA_MAX}
      theme={theme}
    />
  );
};

/**
 * Página de documentação rica do componente Slider.
 */
const SliderDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<'light' | 'dark'>('light');
  const escuro = tema === 'dark';

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Formulário"
        title="Slider"
        description="Régua de um valor, com input range nativo por baixo: rótulo, valor atual, trilha com preenchimento a partir de uma origem, marcas de referência e os rótulos visíveis das duas pontas. Nasceu da tela de revelação da missão “O Porta-Voz dos Dados”, em que a turma arrasta o início do eixo vertical de 0% a 80% e vê o gráfico exagerar a diferença."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Escolher um valor numa faixa contínua, vendo as duas pontas."
      />
      <Grade>
        <Cartao icone="📊" titulo="Truncar o eixo">
          A régua da missão vai de “Eixo em 0% (proporcional)” a “Eixo em 80% (truncado)”, de 10 em
          10. As pontas ficam escritas abaixo da trilha, e não só no leitor de tela.
        </Cartao>
        <Cartao icone="🎚️" titulo="Ajuste a partir de uma origem">
          Com <code>origin</code> no meio da faixa (de −100 a 100, origem 0), o preenchimento cresce do
          centro para os dois lados — a mecânica do <code>Slider</code> da Unoogaleria.
        </Cartao>
        <Cartao icone="♿" titulo="Teclado e leitor de tela">
          Setas, Page Up/Down, Home e End movem o valor. O <code>aria-valuetext</code> diz o valor
          formatado (“Eixo em 40%”) e as pontas descrevem o campo por <code>aria-describedby</code>.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Design próprio: a seção não tem quadro de régua."
      />
      <Grade>
        <Cartao icone="📐" titulo="Medidas">
          Faixa de controle de 44px (o alvo de toque), trilha de 4px, botão de 20px com anel de 2px,
          marcas de 2 × 6px e origem de 2 × 12px. Rótulo e valor em <code>body-s</code> semibold;
          pontas em <code>body-xs</code>. Mecânica e API vêm do <code>Slider</code> da Unoogaleria.
        </Cartao>
        <Cartao icone="🎨" titulo="Cores e contraste">
          Sobre <code>neutral-50</code>: rótulo <code>neutral-950</code> (15,09:1), valor e pontas{' '}
          <code>neutral-700</code> (8,13:1), trilha <code>neutral-400</code> (3,30:1), preenchimento{' '}
          <code>brandnavy-700</code> (3,62:1, cor de controle) e botão <code>brandnavy-800</code>{' '}
          (5,52:1). No escuro: trilha <code>neutraldark-500</code> (3,07:1), preenchimento{' '}
          <code>brandnavy-600</code> e botão <code>brandnavy-400</code>.
        </Cartao>
        <Cartao icone="🧭" titulo="Decisões">
          O input nativo fica por cima, sem pintura mas com opacidade 1 e caixa real de 44px — um teste
          de navegador o encontra visível, ao contrário do input de largura zero do{' '}
          <code>Toggle</code>. Com <code>prefers-reduced-motion</code>, o botão não anima. O valor
          aparece por padrão (<code>showValue</code>), porque a missão lê o número enquanto arrasta.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="3. Anatomia do Componente" description="Cinco zonas, três opcionais." />
      <Palco rotulo="A régua do eixo, com as zonas numeradas ao lado">
        <ReguaDoEixo inicial={40} />
        <ol style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.7, color: 'var(--unooria-color-neutral-700)' }}>
          <li>
            <strong>Rótulo</strong> (<code>label</code>): nomeia o campo; <code>hideLabel</code> o
            esconde só da vista.
          </li>
          <li>
            <strong>Valor</strong> (<code>showValue</code>, <code>formatValue</code>): o mesmo texto do{' '}
            <code>aria-valuetext</code>.
          </li>
          <li>
            <strong>Trilha e preenchimento</strong> (<code>origin</code>): o preenchimento parte da origem.
          </li>
          <li>
            <strong>Marcas</strong> (<code>ticks</code>): referência visual, não prendem o valor.
          </li>
          <li>
            <strong>Pontas</strong> (<code>minLabel</code>, <code>maxLabel</code>): visíveis e descrevem o campo.
          </li>
        </ol>
      </Palco>

      <UnooriaDocSectionHeader title="4. Matriz de Variantes e Estados" description="Da régua mínima à da missão." />
      <Palco rotulo="Composição e estados">
        <Slider label="Volume" defaultValue={30} />
        <ReguaDoEixo inicial={40} />
        <Slider label="Contraste" min={-100} max={100} origin={0} defaultValue={35} ticks={[-50, 0, 50]} />
        <Slider label="Régua desabilitada" defaultValue={60} disabled minLabel="Mínimo" maxLabel="Máximo" />
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da régua." />
      <Praticas
        fazer={[
          'Escrever as pontas quando elas carregam sentido (“proporcional” × “truncado”).',
          'Usar formatValue para dar unidade ao valor: o leitor de tela lê o mesmo texto.',
          'Gravar a escolha em onChangeEnd, e não a cada passo do onChange.',
          'Usar ticks para marcar os degraus que a pessoa deve notar.',
        ]}
        evitar={[
          'Usar a régua para escolher entre poucas opções sem ordem: use RadioButton ou Selection.',
          'Esconder o rótulo sem que outro texto visível diga o que a régua mede.',
          'Dizer só pela cor qual ponta é a “certa”.',
          'Pôr a correção da resposta no cliente: a régua só informa o valor.',
        ]}
      />

      <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Claro e escuro, em tempo real." />
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {(['light', 'dark'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTema(t)}
            aria-pressed={tema === t}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid var(--unooria-color-neutral-200)',
              background: tema === t ? 'var(--unooria-color-neutral-150)' : 'var(--unooria-color-neutral-50)',
              color: 'var(--unooria-color-neutral-950)',
              cursor: 'pointer',
            }}
          >
            {t === 'light' ? 'Claro' : 'Escuro'}
          </button>
        ))}
      </div>
      <Palco rotulo={`Tema ${escuro ? 'escuro' : 'claro'}`} escuro={escuro}>
        <ReguaDoEixo theme={tema} inicial={50} />
      </Palco>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente Slider. Os atributos nativos vão ao invólucro <div>; a ref aponta para o <input type=range>."
      />
      <TabelaDeProps
        linhas={[
          { nome: 'label', tipo: 'string', descricao: 'Nome acessível e rótulo visível. Obrigatório.' },
          { nome: 'value', tipo: 'number', descricao: 'Valor controlado.' },
          { nome: 'defaultValue', tipo: 'number', padrao: 'origin', descricao: 'Valor inicial em modo não controlado.' },
          { nome: 'onChange', tipo: '(value: number) => void', descricao: 'A cada passo, ao arrastar ou pelo teclado.' },
          { nome: 'onChangeEnd', tipo: '(value: number) => void', descricao: 'Ao fim do gesto (soltar ponteiro ou tecla, perder o foco), se o valor mudou.' },
          { nome: 'min', tipo: 'number', padrao: '0', descricao: 'Valor mínimo.' },
          { nome: 'max', tipo: 'number', padrao: '100', descricao: 'Valor máximo.' },
          { nome: 'step', tipo: 'number', padrao: '1', descricao: 'Passo entre valores.' },
          { nome: 'origin', tipo: 'number', padrao: 'min', descricao: 'De onde o preenchimento parte.' },
          { nome: 'hideLabel', tipo: 'boolean', padrao: 'false', descricao: 'Esconde o rótulo da vista, não do leitor de tela.' },
          { nome: 'showValue', tipo: 'boolean', padrao: 'true', descricao: 'Mostra o valor formatado à direita do rótulo.' },
          { nome: 'minLabel', tipo: 'React.ReactNode', descricao: 'Rótulo visível da ponta mínima; descreve o campo.' },
          { nome: 'maxLabel', tipo: 'React.ReactNode', descricao: 'Rótulo visível da ponta máxima; descreve o campo.' },
          { nome: 'ticks', tipo: 'number[]', descricao: 'Marcas de referência sobre a trilha.' },
          { nome: 'formatValue', tipo: '(value: number) => string', descricao: 'Texto do valor e do aria-valuetext. Sem ela, número em pt-BR (com sinal quando há origem).' },
          { nome: 'disabled', tipo: 'boolean', padrao: 'false', descricao: 'Desabilita o controle.' },
          { nome: 'name', tipo: 'string', descricao: 'Nome do campo em formulário.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual; um ancestral data-theme="dark" também vale.' },
          { nome: 'className', tipo: 'string', descricao: 'Classe CSS adicional, no invólucro.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Slider> = {
  title: 'Plataforma Unooria/Componentes/Slider',
  component: Slider,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo e nome acessível.' },
    defaultValue: { control: 'number', description: 'Valor inicial (não controlado).' },
    min: { control: 'number', description: 'Valor mínimo.' },
    max: { control: 'number', description: 'Valor máximo.' },
    step: { control: 'number', description: 'Passo.' },
    origin: { control: 'number', description: 'Origem do preenchimento.' },
    hideLabel: { control: 'boolean', description: 'Esconde o rótulo da vista.' },
    showValue: { control: 'boolean', description: 'Mostra o valor.' },
    minLabel: { control: 'text', description: 'Rótulo da ponta mínima.' },
    maxLabel: { control: 'text', description: 'Rótulo da ponta máxima.' },
    ticks: { control: 'object', description: 'Marcas de referência.' },
    disabled: { control: 'boolean', description: 'Desabilita o controle.' },
    name: { control: 'text', description: 'Nome do campo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
    onChange: { action: 'onChange' },
    onChangeEnd: { action: 'onChangeEnd' },
  },
  args: {
    label: ROTULO,
    defaultValue: 0,
    min: 0,
    max: 80,
    step: 10,
    hideLabel: false,
    showValue: true,
    minLabel: PONTA_MIN,
    maxLabel: PONTA_MAX,
    ticks: [0, 20, 40, 60, 80],
    disabled: false,
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
    <div
      style={{
        maxWidth: 400,
        padding: 24,
        borderRadius: 12,
        background:
          args.theme === 'dark' ? 'var(--unooria-color-neutraldark-50)' : 'var(--unooria-color-neutral-50)',
      }}
    >
      <Slider {...args} />
    </div>
  ),
};

/**
 * A régua do eixo vertical da tela de revelação, num aparelho de 375px.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <div style={{ width: 343, padding: 16, background: 'var(--unooria-color-neutral-50)', borderRadius: 12 }}>
      <ReguaDoEixo />
    </div>
  ),
};

/**
 * Teclado, valor anunciado, pontas visíveis e `onChangeEnd` por gesto.
 */
export const Estados: Story = {
  args: { onChangeEnd: fn() },
  render: (args) => (
    <div style={{ display: 'grid', gap: 24, maxWidth: 400 }}>
      <Slider
        label={ROTULO}
        min={0}
        max={80}
        step={10}
        defaultValue={0}
        formatValue={formatarEixo}
        minLabel={PONTA_MIN}
        maxLabel={PONTA_MAX}
        onChangeEnd={args.onChangeEnd}
      />
      <Slider label="Régua desabilitada" defaultValue={60} disabled />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const regua = tela.getByRole('slider', { name: ROTULO });

    // Visível de verdade (caixa de 44px), e não um input de largura zero.
    await expect(regua).toBeVisible();
    await expect(regua.getBoundingClientRect().height).toBeGreaterThanOrEqual(44);

    // As pontas estão escritas e descrevem o campo.
    await expect(tela.getByText(PONTA_MIN)).toBeVisible();
    await expect(tela.getByText(PONTA_MAX)).toBeVisible();
    await expect(regua).toHaveAccessibleDescription(`${PONTA_MIN} ${PONTA_MAX}`);
    await expect(regua).toHaveAttribute('aria-valuetext', 'Eixo em 0%');

    // Teclado: um passo, depois o fim; onChangeEnd sai uma vez por tecla solta.
    regua.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(regua).toHaveAttribute('aria-valuetext', 'Eixo em 10%');
    await expect(args.onChangeEnd).toHaveBeenLastCalledWith(10);
    await userEvent.keyboard('{End}');
    await expect(regua).toHaveAttribute('aria-valuetext', 'Eixo em 80%');
    await expect(tela.getByText('Eixo em 80%')).toBeVisible();
    await expect(args.onChangeEnd).toHaveBeenLastCalledWith(80);
    await userEvent.keyboard('{Home}');
    await expect(regua).toHaveValue('0');

    await expect(tela.getByRole('slider', { name: 'Régua desabilitada' })).toBeDisabled();
  },
};

/**
 * Origem no centro: o preenchimento cresce do zero para os dois lados.
 */
export const ComOrigem: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, maxWidth: 400 }}>
      <Slider label="Contraste" min={-100} max={100} origin={0} defaultValue={35} ticks={[-50, 0, 50]} />
      <Slider label="Brilho" min={-100} max={100} origin={0} defaultValue={-40} ticks={[-50, 0, 50]} />
    </div>
  ),
};

/**
 * Modo escuro.
 */
export const ModoEscuro: Story = {
  render: () => (
    <div style={{ maxWidth: 400, padding: 24, borderRadius: 12, background: 'var(--unooria-color-neutraldark-50)' }}>
      <ReguaDoEixo theme="dark" inicial={30} />
    </div>
  ),
};
