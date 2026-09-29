import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import { GestureHint } from '../../../src/unoovista/components/GestureHint';
import { MediaGrid } from '../../../src/unoovista/components/MediaGrid';
import { Button } from '../../../src/unoovista/components/Button';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import { unvGridItems } from '../fixtures';

const BAR = '#716C98';

type Gesto = 'swipe-up' | 'swipe-left' | 'tap';

/**
 * Uma tela posicionada, com a grade por baixo e a dica por cima. A chave
 * remonta a dica para ela tocar de novo.
 */
const TelaComGesto: React.FC<{ theme?: 'light' | 'dark'; gesture?: Gesto; iterations?: number }> = ({
  theme,
  gesture = 'swipe-up',
  iterations = 2,
}) => {
  const [vez, setVez] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
      <div
        data-unv-theme={theme}
        style={{
          position: 'relative',
          width: 240,
          height: 260,
          overflow: 'hidden',
          borderRadius: 'var(--unv-radius-l)',
          backgroundColor: 'var(--unv-color-background-primary)',
        }}
      >
        <MediaGrid items={unvGridItems} />
        <GestureHint key={vez} gesture={gesture} iterations={iterations} />
      </div>
      <Button variant="secondary" onClick={() => setVez((valor) => valor + 1)}>
        Repetir “{gesture}”
      </Button>
    </div>
  );
};

/**
 * A dica que se desmonta sozinha quando termina.
 */
const DicaQueSeDesmonta: React.FC = () => {
  const [visivel, setVisivel] = useState(true);

  return (
    <div
      style={{
        position: 'relative',
        width: 240,
        height: 160,
        borderRadius: 'var(--unv-radius-l)',
        background: 'var(--unv-color-background-tertiary)',
      }}
    >
      {visivel ? (
        <GestureHint gesture="tap" data-testid="dica" onEnd={() => setVisivel(false)} />
      ) : (
        <p style={{ margin: 16, fontSize: 13 }}>A dica terminou e foi desmontada.</p>
      )}
    </div>
  );
};

/**
 * Página de documentação rica do componente GestureHint.
 */
const GestureHintDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Extensões"
      title="GestureHint"
      description="A marca de toque que demonstra um gesto uma vez — rolar, deslizar ou tocar —, como nas dicas de primeiro uso. Decorativa: o que ela ensina está também em texto na tela. Desligada quando a pessoa pede menos movimento."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Mostrar o gesto a quem ainda não o fez."
    />
    <UnvDocGrid>
      <UnvDocCard icon="👆" title="Três gestos">
        <code>swipe-up</code> (rolar o feed), <code>swipe-left</code> (o próximo item do carrossel)
        e <code>tap</code> (tocar num ponto).
      </UnvDocCard>
      <UnvDocCard icon="1️⃣" title="Uma vez só">
        <code>iterations</code> é 1 por padrão: a dica aparece, mostra e vai embora. Ela não fica
        piscando.
      </UnvDocCard>
      <UnvDocCard icon="🙈" title="Decorativa">
        Sempre <code>aria-hidden</code>. A instrução precisa estar em texto — a dica é a redundância
        visual dela.
      </UnvDocCard>
      <UnvDocCard icon="🐢" title="Movimento reduzido">
        Com <code>prefers-reduced-motion</code>, a dica não aparece e <code>onEnd</code> não é
        chamado.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="GestureHint"
      layout="Círculo · sobreposto ao contêiner"
      specs={[
        { label: 'Diâmetro', value: '44px (--unv-touch-target)' },
        { label: 'Contorno', value: '2px · --unv-color-text-on-media' },
        { label: 'Véu', value: '--unv-color-overlay-scrim' },
        { label: 'Onda', value: 'Pseudo-elemento que se expande e some' },
        { label: 'Duração', value: '1,8s por repetição' },
        { label: 'Percurso', value: '140px (--unv-gesture-hint-travel)' },
        { label: 'Posição', value: 'absolute, contra o contêiner posicionado' },
        { label: 'Movimento reduzido', value: 'display: none' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Extensão sem par na Plataforma Unooria',
          detail:
            'a Plataforma não tem dica de gesto. O círculo usa o alvo de toque do módulo, e a cor vem só de tokens.',
        },
        {
          subject: 'Contorno branco, e não da superfície',
          detail:
            'o contorno usa --unv-color-text-on-media (branco nos dois temas). Com o da superfície, ele sumiria contra o fundo escuro. O véu roxo é o mesmo nos dois temas.',
        },
        {
          subject: 'Onda decorativa',
          detail:
            'um segundo anel se expande a partir do círculo para dar a ideia de toque. Só o círculo avisa o onEnd; a onda termina junto e é ignorada.',
        },
        {
          subject: 'Percurso em variável local',
          detail:
            '--unv-gesture-hint-travel (140px) é local ao componente: o módulo não tem token de deslocamento de animação.',
        },
        {
          subject: 'Sem tema padrão',
          detail:
            'a prop theme deixa de ter padrão claro: sem ela, o componente herda o tema do contêiner.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Um único elemento decorativo, posicionado sobre a tela."
    />
    <UnvDocAnatomy
      zones={[
        { name: 'Círculo', role: 'A marca de toque; sobe, desliza ou pulsa.', token: '--unv-color-overlay-scrim · --unv-touch-target' },
        { name: 'Contorno', role: 'Anel de 2px, legível sobre qualquer superfície.', token: '--unv-color-text-on-media' },
        { name: 'Onda', role: 'Anel que se expande no meio da animação.', token: '::after' },
      ]}
    />
    <UnvDocStage label="Rolar o feed (repete uma vez a cada clique)" surface="secondary" padding={16}>
      <TelaComGesto gesture="swipe-up" iterations={1} />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de gestos"
      description="Os três gestos, cada um sobre a mesma grade."
    />
    <UnvDocStage label="swipe-up · swipe-left · tap" surface="secondary" align="flex-start" padding={16}>
      <TelaComGesto gesture="swipe-up" />
      <TelaComGesto gesture="swipe-left" />
      <TelaComGesto gesture="tap" />
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Dizer o gesto também em texto: a dica é redundância visual.',
        'Mostrar uma vez e desmontar em onEnd.',
        'Renderizar dentro de um contêiner com position: relative.',
        'Usar o gesto que corresponde ao que a tela pede (rolar, deslizar, tocar).',
      ]}
      donts={[
        'Usar a dica como única instrução: ela é aria-hidden.',
        'Repetir a dica em loop: aumente iterations só quando a tela realmente exigir.',
        'Contar com onEnd em movimento reduzido: a dica nem aparece.',
        'Pôr a dica sobre um controle e esperar que ela receba o toque.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O véu e o contorno são iguais nos dois temas; o que muda é a superfície por baixo."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={16}>
      {(theme) => <TelaComGesto key={theme} gesture="tap" iterations={3} />}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UnvDocPropsTable
      title="GestureHint"
      rows={[
        {
          name: 'gesture',
          type: "'swipe-up' | 'swipe-left' | 'tap'",
          default: "'swipe-up'",
          description: 'O gesto demonstrado.',
        },
        { name: 'iterations', type: 'number', default: '1', description: 'Quantas vezes o gesto se repete.' },
        { name: 'onEnd', type: '() => void', description: 'A última repetição terminou.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLSpanElement>',
          description: 'Repassados ao círculo (className, style, data-*). O aria-hidden é fixo.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof GestureHint> = {
  title: 'Unoovista/Componentes/GestureHint',
  component: GestureHint,
  parameters: { layout: 'padded' },
  argTypes: {
    gesture: { control: 'radio', options: ['swipe-up', 'swipe-left', 'tap'], description: 'Gesto.' },
    iterations: { control: { type: 'number', min: 1, max: 10 }, description: 'Repetições.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    onEnd: { action: 'onEnd' },
  },
  args: {
    gesture: 'swipe-up',
    iterations: 3,
  },
};

export default meta;

type Story = StoryObj<typeof GestureHint>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <GestureHintDocumentationPage />,
};

/**
 * Playground com todas as propriedades do GestureHint expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do GestureHint',
  render: (args) => (
    <UnvDocStage theme={args.theme ?? 'light'} surface="secondary" padding={16}>
      <div
        style={{
          position: 'relative',
          width: 320,
          height: 320,
          overflow: 'hidden',
          borderRadius: 'var(--unv-radius-l)',
          backgroundColor: 'var(--unv-color-background-primary)',
        }}
      >
        <MediaGrid items={unvGridItems} />
        <GestureHint {...args} />
      </div>
    </UnvDocStage>
  ),
};

/**
 * A dica do feed: rolar, uma vez.
 */
export const EmContexto: Story = {
  name: '🎨 Em Contexto — rolar o feed',
  render: () => <TelaComGesto gesture="swipe-up" iterations={1} />,
};

/**
 * Decorativa, e se desmonta em onEnd quando a animação termina.
 */
export const Estados: Story = {
  render: () => <DicaQueSeDesmonta />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const dica = tela.getByTestId('dica');

    await expect(dica).toHaveAttribute('aria-hidden', 'true');
    await waitFor(() => expect(tela.getByText('A dica terminou e foi desmontada.')).toBeInTheDocument(), {
      timeout: 4000,
    });
    await expect(tela.queryByTestId('dica')).not.toBeInTheDocument();
  },
};
