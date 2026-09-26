import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import { GestureHint } from '../../../src/instanooria/components/GestureHint';
import { MediaGrid } from '../../../src/instanooria/components/MediaGrid';
import { Button } from '../../../src/instanooria/components/Button';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocDeviations,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaGridItems } from '../fixtures';

type Gesto = 'swipe-up' | 'swipe-left' | 'tap';

/**
 * Uma tela posicionada, com a grade por baixo e a dica por cima. A chave
 * remonta a dica para ela tocar de novo.
 */
const TelaComGesto: React.FC<{ theme?: 'light' | 'dark'; gesture?: Gesto; iterations?: number }> = ({
  theme = 'light',
  gesture = 'swipe-up',
  iterations = 2,
}) => {
  const [vez, setVez] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
      <div
        data-insta-theme={theme}
        style={{
          position: 'relative',
          width: 240,
          height: 260,
          overflow: 'hidden',
          backgroundColor: 'var(--insta-color-background-primary)',
        }}
      >
        <MediaGrid items={instaGridItems} theme={theme} />
        <GestureHint key={vez} gesture={gesture} iterations={iterations} theme={theme} />
      </div>
      <Button variant="secondary" onClick={() => setVez((valor) => valor + 1)}>
        Repetir {gesture}
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
    <div style={{ position: 'relative', width: 240, height: 160, background: 'var(--insta-color-background-tertiary)' }}>
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
      badgeBrand="Instanooria"
      category="Componentes • Extensões"
      title="GestureHint"
      description="A marca de toque que demonstra um gesto uma vez — rolar, deslizar ou tocar —, como nas dicas de primeiro uso do app real. Decorativa: o que ela ensina está também em texto na tela. Extensão: o arquivo não publica dica de gesto."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Mostrar o gesto a quem ainda não o fez."
    />
    <InstaDocGrid>
      <InstaDocCard icon="👆" title="Três gestos">
        <code>swipe-up</code> (rolar o feed), <code>swipe-left</code> (o próximo item do carrossel)
        e <code>tap</code> (tocar num ponto).
      </InstaDocCard>
      <InstaDocCard icon="1️⃣" title="Uma vez só">
        <code>iterations</code> é 1 por padrão: a dica aparece, mostra e vai embora. Ela não fica
        piscando.
      </InstaDocCard>
      <InstaDocCard icon="🙈" title="Decorativa">
        Sempre <code>aria-hidden</code>. A instrução precisa estar em texto — a dica é redundância
        visual dela.
      </InstaDocCard>
      <InstaDocCard icon="🐢" title="Movimento reduzido">
        Com <code>prefers-reduced-motion</code>, a dica não aparece e <code>onEnd</code> não é
        chamado.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="O círculo empresta o alvo de toque e o contorno do anel de avatar."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1698"
      frameName="Stories → Avatar Ring (medida emprestada)"
      specs={[
        { label: 'Diâmetro', value: '44px (--insta-touch-target)' },
        { label: 'Contorno', value: '2px · --insta-color-background-primary' },
        { label: 'Véu', value: '--insta-color-overlay-scrim' },
        { label: 'Duração', value: '1,8s por repetição' },
        { label: 'Percurso (rolar/deslizar)', value: '160px' },
      ]}
    />
    <InstaDocDeviations
      items={[
        {
          subject: 'Sem quadro de dica de gesto',
          detail:
            'o arquivo não publica dica de primeiro uso. O círculo tem o alvo de toque do arquivo (44px) e o contorno de 2px do anel de avatar sobre mídia; sem sombra (seção 2.3).',
        },
        {
          subject: 'Origem do pedido',
          detail:
            'a A Seleção (exp07ef1b) demonstrava o gesto de rolar o feed com CSS local, depois de 10s parada na entrada. Esta extensão substitui a compensação.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="O círculo posicionado sobre o contêiner da tela."
    />
    <InstaDocStage label="swipe-up sobre a grade" align="flex-start">
      <TelaComGesto />
    </InstaDocStage>

    <UnooriaDocSectionHeader title="4. Matriz de Variantes e Estados" description="Os três gestos." />
    <InstaDocStage label="gesture" align="flex-start">
      <TelaComGesto gesture="swipe-up" />
      <TelaComGesto gesture="swipe-left" />
      <TelaComGesto gesture="tap" />
    </InstaDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da dica." />
    <InstaDocPractices
      dos={[
        'Mostrar a dica só depois de a pessoa ficar parada — não na entrada da tela.',
        'Desmontar a dica em onEnd.',
        'Escrever a instrução em texto na tela, além da dica.',
        'Posicionar o contêiner da TELA, não o da rolagem.',
      ]}
      donts={[
        'Repetir a dica em laço: ela vira ruído.',
        'Usar a dica como único meio de ensinar o gesto.',
        'Ignorar prefers-reduced-motion forçando a animação.',
        'Acrescentar sombra para destacar o círculo.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a Temas" description="O contorno acompanha a superfície." />
    <InstaDocThemeSwitcher>
      {(activeTheme) => <TelaComGesto theme={activeTheme} />}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente GestureHint."
    />
    <InstaDocPropsTable
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
        { name: 'theme', type: "'light' | 'dark'", default: "'light'", description: 'Tema visual.' },
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
  title: 'Instanooria/Componentes/GestureHint',
  component: GestureHint,
  parameters: { layout: 'padded' },
  argTypes: {
    gesture: { control: 'radio', options: ['swipe-up', 'swipe-left', 'tap'], description: 'Gesto.' },
    iterations: { control: { type: 'number', min: 1, max: 10 }, description: 'Repetições.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onEnd: { action: 'onEnd' },
  },
  args: {
    gesture: 'swipe-up',
    iterations: 3,
    theme: 'light',
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
    <div
      data-insta-theme={args.theme}
      style={{
        position: 'relative',
        width: 320,
        height: 320,
        overflow: 'hidden',
        backgroundColor: 'var(--insta-color-background-primary)',
      }}
    >
      <MediaGrid items={instaGridItems} theme={args.theme} />
      <GestureHint {...args} />
    </div>
  ),
};

/**
 * A dica do feed da cobertura: rolar, uma vez.
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
