import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { InlineHint } from '../../../src/unoovista/components/InlineHint';
import { TopBar } from '../../../src/unoovista/components/TopBar';
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

const BAR = '#716C98';

/**
 * Uma tela com a barra superior e a faixa logo abaixo.
 */
const TelaComDica: React.FC<{
  theme?: 'light' | 'dark';
  tone?: 'neutral' | 'friction';
  texto?: string;
}> = ({
  theme,
  tone = 'neutral',
  texto = 'Salve as publicações que você achar mais completas para a cobertura.',
}) => (
  <div
    data-unv-theme={theme}
    style={{
      width: 320,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--unv-spacing-m)',
      paddingBottom: 'var(--unv-spacing-l)',
      borderRadius: 'var(--unv-radius-l)',
      backgroundColor: 'var(--unv-color-background-secondary)',
    }}
  >
    <TopBar variant="feed" title="Salvos" withStatusBarInset={false} />
    <div style={{ padding: '0 var(--unv-gutter)' }}>
      <InlineHint tone={tone}>{texto}</InlineHint>
    </div>
    <div style={{ height: 96 }} />
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
        Salvar mais uma publicação
      </Button>
      {excesso > 0 && (
        <InlineHint tone="friction" announce>
          {excesso === 1
            ? 'Remova 1 publicação para continuar.'
            : `Remova ${excesso} publicações para continuar.`}
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
      badgeBrand="Unoovista"
      category="Componentes • Extensões"
      title="InlineHint"
      description="A faixa de dica sob a barra superior: um cartão macio de uma ou duas linhas, com glifo à esquerda. Orienta ou avisa de um atrito sem cobrir a tela e sem pedir toque. O atrito nunca depende só da cor."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Dizer o que fazer, ou por que não dá, sem interromper."
    />
    <UnvDocGrid>
      <UnvDocCard icon="💡" title="Orientação (neutral)">
        O que fazer nesta tela: “Salve as publicações que você achar mais completas”. Lida na ordem
        da página, sem anúncio.
      </UnvDocCard>
      <UnvDocCard icon="⚠️" title="Atrito (friction)">
        Algo impede seguir: “Remova 1 publicação para continuar”. Glifo de atenção, contorno de
        controle e o prefixo “Atenção:” para leitor de tela.
      </UnvDocCard>
      <UnvDocCard icon="🔊" title="Anúncio sob demanda">
        Com <code>announce</code>, a faixa vira <code>role=&quot;status&quot;</code> e é lida quando
        nasce ou muda por causa de uma ação da pessoa.
      </UnvDocCard>
      <UnvDocCard icon="📖" title="Sempre legível">
        O texto é o primário sobre a superfície: passa de 4,5:1 nos dois temas, nos dois tons.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="InlineHint"
      layout="Cartão · glifo + texto"
      specs={[
        { label: 'Superfície (neutral)', value: '--unv-color-background-tertiary' },
        { label: 'Superfície (friction)', value: '--unv-color-background-primary' },
        { label: 'Contorno (friction)', value: '1px · --unv-color-border-control' },
        { label: 'Raio', value: '--unv-radius-m · 12px' },
        { label: 'Recuo', value: '12px vertical · 16px horizontal' },
        { label: 'Texto', value: 'label-md · Open Sans 400 · 14/20px' },
        { label: 'Glifo', value: 'info (neutral) · warning (friction) · 24px' },
        { label: 'Fio e sombra', value: 'nenhum' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Extensão sem par na Plataforma Unooria',
          detail:
            'a Plataforma não tem faixa de dica. O cartão usa as superfícies e o raio do módulo, e o texto usa os degraus de tipografia existentes.',
        },
        {
          subject: 'O atrito não depende só de cor',
          detail:
            'além do glifo “warning” em brand-like, ele troca a superfície e ganha contorno de controle (4,96:1 no claro, 8,64:1 no escuro) e o prefixo “Atenção:” lido por leitor de tela (frictionLabel, extensão aditiva e opcional).',
        },
        {
          subject: 'Glifos info e warning',
          detail:
            'os dois existem no quadro de ícones da Plataforma Unooria e entram no registro do módulo. O glifo neutro usa icon-secondary (4,3:1 e 5,4:1 sobre o cartão).',
        },
        {
          subject: 'Texto sempre primário',
          detail:
            'o tom de atrito não colore o texto: brand-like sobre a superfície mede 4,74:1 no claro, mas o texto primário mede 15,1:1 e 16,7:1. A cor de alerta fica no glifo.',
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
      description="Um cartão com o glifo do tom e o texto da dica."
    />
    <UnvDocAnatomy
      zones={[
        { name: 'Cartão', role: 'Superfície macia; friction leva contorno de controle.', token: '--unv-color-background-tertiary · --unv-color-border-control' },
        { name: 'Glifo', role: 'info na orientação, warning no atrito.', token: '--unv-color-icon-secondary · --unv-color-brand-like' },
        { name: 'Prefixo', role: '“Atenção:” só para leitor de tela, no atrito.', token: 'frictionLabel' },
        { name: 'Texto', role: 'A dica, em texto primário.', token: '--unv-color-text-primary' },
      ]}
    />
    <UnvDocStage label="Os dois tons" surface="secondary" direction="column" align="stretch" padding={16}>
      <InlineHint>Salve as publicações que você achar mais completas.</InlineHint>
      <InlineHint tone="friction">Você salvou 5 publicações. Remova 2 para ficar com 3.</InlineHint>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de tons e comprimentos"
      description="Uma linha, duas linhas e o atrito."
    />
    <UnvDocStage label="Comprimentos" surface="secondary" direction="column" align="stretch" padding={16} width={360}>
      <InlineHint>Escolha três.</InlineHint>
      <InlineHint>
        Salve as publicações que você achar mais completas e depois escolha exatamente três para
        levar à cobertura da turma.
      </InlineHint>
      <InlineHint tone="friction">Remova 1 publicação para continuar.</InlineHint>
      <InlineHint tone="friction">
        Você passou do limite de publicações: remova as que mais repetem o assunto antes de
        continuar para a próxima etapa.
      </InlineHint>
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Dizer o que fazer, e não só o que está errado.',
        'Ligar announce quando o aviso nasce de um toque da pessoa.',
        'Manter o texto em uma ou duas linhas.',
        'Pôr a faixa logo abaixo da barra superior, dentro da calha lateral.',
      ]}
      donts={[
        'Sinalizar o atrito só pela cor do glifo.',
        'Usar a faixa para pedir uma decisão: isso é um diálogo de confirmação.',
        'Deixar announce ligado em orientação fixa: ela seria lida duas vezes.',
        'Pintar o texto de vermelho: a cor de alerta fica no glifo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfícies, glifos e contorno trocam de degrau; o texto continua passando de 4,5:1."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={16}>
      {() => (
        <div style={{ display: 'grid', gap: 12, width: 320 }}>
          <InlineHint>Salve as publicações que você achar mais completas.</InlineHint>
          <InlineHint tone="friction">Remova 1 publicação para continuar.</InlineHint>
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UnvDocPropsTable
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
        {
          name: 'frictionLabel',
          type: 'string',
          default: "'Atenção:'",
          description: 'Prefixo lido por leitor de tela antes de uma dica de atrito.',
        },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
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
  title: 'Unoovista/Componentes/InlineHint',
  component: InlineHint,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'O texto da dica.' },
    tone: { control: 'radio', options: ['neutral', 'friction'], description: 'Tom.' },
    announce: { control: 'boolean', description: 'Anuncia ao leitor de tela.' },
    frictionLabel: { control: 'text', description: 'Prefixo lido no atrito.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
  },
  args: {
    children: 'Salve as publicações que você achar mais completas para a cobertura.',
    tone: 'neutral',
    announce: false,
    frictionLabel: 'Atenção:',
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
    <UnvDocStage
      theme={args.theme ?? 'light'}
      surface="secondary"
      align="stretch"
      padding={16}
      width={375}
    >
      <InlineHint {...args} />
    </UnvDocStage>
  ),
};

/**
 * A faixa sob a barra superior da aba Salvos, nos dois tons.
 */
export const EmContexto: Story = {
  name: '🎨 Em Contexto — a aba Salvos',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <TelaComDica />
      <TelaComDica tone="friction" texto="Você salvou 5 publicações. Remova 2 para ficar com 3." />
    </div>
  ),
};

/**
 * Os dois tons, nos dois temas.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UnvDocStage
          key={theme}
          label={`Tema ${theme}`}
          theme={theme}
          surface="secondary"
          direction="column"
          align="stretch"
          padding={16}
          width={375}
        >
          <InlineHint>Salve as publicações que você achar mais completas.</InlineHint>
          <InlineHint tone="friction">Remova 1 publicação para continuar.</InlineHint>
        </UnvDocStage>
      ))}
    </div>
  ),
};

/**
 * O aviso de atrito que nasce de um toque é uma região de status, lida com o
 * prefixo “Atenção:”; a orientação não é região.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InlineHint>Salve as publicações que você achar mais completas.</InlineHint>
      <AvisoQueNasce />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.queryByRole('status')).not.toBeInTheDocument();
    await userEvent.click(tela.getByRole('button', { name: 'Salvar mais uma publicação' }));
    await expect(tela.getByRole('status')).toHaveTextContent('Atenção: Remova 1 publicação para continuar.');
    await userEvent.click(tela.getByRole('button', { name: 'Salvar mais uma publicação' }));
    await expect(tela.getByRole('status')).toHaveTextContent('Remova 2 publicações para continuar.');
  },
};
