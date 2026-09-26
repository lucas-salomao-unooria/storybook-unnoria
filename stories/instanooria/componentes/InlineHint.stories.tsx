import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { InlineHint } from '../../../src/instanooria/components/InlineHint';
import { TopBar } from '../../../src/instanooria/components/TopBar';
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

/**
 * Uma tela com a barra superior e a faixa logo abaixo, como no app.
 */
const TelaComDica: React.FC<{
  theme?: 'light' | 'dark';
  tone?: 'neutral' | 'friction';
  texto?: string;
}> = ({
  theme = 'light',
  tone = 'neutral',
  texto = 'Salve os posts que você achar mais completos para a cobertura.',
}) => (
  <div
    data-insta-theme={theme}
    style={{
      width: 320,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--insta-color-background-primary)',
      border: '1px solid #E4E8E9',
    }}
  >
    <TopBar variant="plain" title="Salvos" theme={theme} withStatusBarInset={false} />
    <InlineHint tone={tone} theme={theme}>
      {texto}
    </InlineHint>
    <div style={{ height: 120 }} />
  </div>
);

/**
 * O aviso de atrito que nasce de um toque — e é anunciado.
 */
const AvisoQueNasce: React.FC = () => {
  const [excesso, setExcesso] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      <Button variant="secondary" onClick={() => setExcesso((valor) => valor + 1)}>
        Salvar mais um post
      </Button>
      {excesso > 0 && (
        <InlineHint tone="friction" announce>
          {excesso === 1 ? 'Remova 1 post para continuar.' : `Remova ${excesso} posts para continuar.`}
        </InlineHint>
      )}
    </div>
  );
};

/**
 * Página de documentação rica do componente InlineHint.
 */
const InlineHintDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Extensões"
      title="InlineHint"
      description="A faixa de dica sob a barra superior, como no app real: uma ou duas linhas de texto numa superfície secundária, com o fio da barra. Orienta ou avisa de um atrito sem cobrir a tela e sem pedir toque. Extensão: o arquivo não publica tooltip nem faixa inline."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Texto que acompanha a tela, sem interromper."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🧭" title="Orientação (neutral)">
        O que fazer nesta tela: “Salve os posts que você achar mais completos”. Fica na ordem da
        página e é lida como o resto do conteúdo.
      </InstaDocCard>
      <InstaDocCard icon="✋" title="Atrito (friction)">
        Algo impede seguir: “Remova 1 post para continuar”. A cor de alerta vai na BORDA; o texto
        continua primário.
      </InstaDocCard>
      <InstaDocCard icon="📣" title="Anúncio (announce)">
        Quando a faixa aparece por causa de um toque, <code>announce</code> a torna uma região{' '}
        <code>role=&quot;status&quot;</code>: o leitor de tela diz o aviso.
      </InstaDocCard>
      <InstaDocCard icon="📏" title="Medida das barras">
        Calha de 15px, fio de 0,33px por baixo e Label/Medium de 13px — sem sombra.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="A faixa empresta a medida da barra superior do Feed."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1752"
      frameName="Feed → Top Bar (medida emprestada)"
      specs={[
        { label: 'Recuo lateral', value: '15px (--insta-gutter)' },
        { label: 'Recuo vertical', value: '10px (--insta-spacing-s)' },
        { label: 'Fio inferior', value: '0,33px (--insta-elevation-hairline-bottom)' },
        { label: 'Superfície', value: '--insta-color-background-secondary' },
        { label: 'Texto', value: 'Label/Medium · 13px · text-primary' },
        { label: 'Atrito', value: 'borda esquerda de 3px · --insta-color-brand-like' },
      ]}
    />
    <InstaDocDeviations
      items={[
        {
          subject: 'Sem quadro de faixa de dica',
          detail:
            'o arquivo não publica tooltip nem aviso inline. A faixa usa a calha e o fio da Top Bar (0:1752) e a superfície secundária; o texto é o Label/Medium.',
        },
        {
          subject: 'Texto sempre primário',
          detail:
            'o secundário do arquivo (#8E8E93 sobre branco) mede 3,5:1, abaixo dos 4,5:1 de corpo de 13px. A faixa de orientação usa o primário.',
        },
        {
          subject: 'Atrito na borda, não no texto',
          detail:
            'o vermelho da marca (#ED4956) sobre branco mede 3,7:1 como texto. A cor fica na borda esquerda de 3px, e a mensagem continua primária.',
        },
        {
          subject: 'Origem do pedido',
          detail:
            'a A Seleção (exp07ef1b) compensava a dica do feed e o aviso da poda na aba Salvos com CSS local. Esta extensão substitui a compensação.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="A barra, a faixa e o conteúdo que rola por baixo."
    />
    <InstaDocStage label="Faixa sob a Top Bar" align="flex-start">
      <TelaComDica />
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Os dois tons e o aviso que nasce de um toque."
    />
    <InstaDocStage label="tone" align="flex-start">
      <TelaComDica tone="neutral" />
      <TelaComDica tone="friction" texto="Você salvou 5 posts. Remova 2 para ficar com 3." />
    </InstaDocStage>
    <InstaDocStage label="announce — aviso que aparece depois do toque" align="flex-start">
      <AvisoQueNasce />
    </InstaDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da faixa." />
    <InstaDocPractices
      dos={[
        'Escrever uma instrução curta, de uma ou duas linhas.',
        'Ligar announce no aviso que nasce de uma ação da pessoa.',
        'Usar friction só quando algo impede seguir — e dizer o que fazer.',
        'Colocar a faixa logo abaixo da barra superior, fora da área que rola.',
      ]}
      donts={[
        'Pintar o texto de vermelho: a cor de atrito vai na borda.',
        'Empilhar duas faixas na mesma tela.',
        'Usar a faixa para confirmação passageira — isso é Snackbar.',
        'Ligar announce na orientação fixa da tela: ela seria anunciada de novo a cada render.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Os dois tons nos dois temas." />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <>
          <TelaComDica theme={activeTheme} />
          <TelaComDica
            theme={activeTheme}
            tone="friction"
            texto="Você salvou 5 posts. Remova 2 para ficar com 3."
          />
        </>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente InlineHint."
    />
    <InstaDocPropsTable
      title="InlineHint"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'O texto da dica. Obrigatório.' },
        { name: 'tone', type: "'neutral' | 'friction'", default: "'neutral'", description: 'Orientação ou atrito.' },
        {
          name: 'announce',
          type: 'boolean',
          default: 'false',
          description: 'Torna a faixa uma região role="status", anunciada ao aparecer ou mudar.',
        },
        { name: 'theme', type: "'light' | 'dark'", default: "'light'", description: 'Tema visual.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Repassados à faixa (id, aria-*).',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof InlineHint> = {
  title: 'Instanooria/Componentes/InlineHint',
  component: InlineHint,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'O texto da dica.' },
    tone: { control: 'radio', options: ['neutral', 'friction'], description: 'Tom.' },
    announce: { control: 'boolean', description: 'Anuncia ao leitor de tela.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    children: 'Salve os posts que você achar mais completos para a cobertura.',
    tone: 'neutral',
    announce: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof InlineHint>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <InlineHintDocumentationPage />,
};

/**
 * Playground com todas as propriedades do InlineHint expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do InlineHint',
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{ width: 375, backgroundColor: 'var(--insta-color-background-primary)' }}
    >
      <InlineHint {...args} />
    </div>
  ),
};

/**
 * A faixa sob a Top Bar da aba Salvos, nos dois tons.
 */
export const EmContexto: Story = {
  name: '🎨 Em Contexto — a aba Salvos',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <TelaComDica />
      <TelaComDica tone="friction" texto="Você salvou 5 posts. Remova 2 para ficar com 3." />
    </div>
  ),
};

/**
 * O aviso de atrito que nasce de um toque é uma região de status; a orientação não.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InlineHint>Salve os posts que você achar mais completos.</InlineHint>
      <AvisoQueNasce />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.queryByRole('status')).not.toBeInTheDocument();
    await userEvent.click(tela.getByRole('button', { name: 'Salvar mais um post' }));
    await expect(tela.getByRole('status')).toHaveTextContent('Remova 1 post para continuar.');
    await userEvent.click(tela.getByRole('button', { name: 'Salvar mais um post' }));
    await expect(tela.getByRole('status')).toHaveTextContent('Remova 2 posts para continuar.');
  },
};
