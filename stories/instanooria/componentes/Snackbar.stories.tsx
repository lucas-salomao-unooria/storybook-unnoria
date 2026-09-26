import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Snackbar } from '../../../src/instanooria/components/Snackbar';
import { MediaGrid } from '../../../src/instanooria/components/MediaGrid';
import { TabBar } from '../../../src/instanooria/components/TabBar';
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

/**
 * Uma tela posicionada com a grade, a barra de abas e o aviso por cima dela.
 */
const TelaComAviso: React.FC<{
  theme?: 'light' | 'dark';
  message?: string;
  comAcao?: boolean;
}> = ({ theme = 'light', message = 'Sem conexão com a internet.', comAcao = false }) => (
  <div
    data-insta-theme={theme}
    style={{
      position: 'relative',
      width: 300,
      height: 360,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--insta-color-background-primary)',
    }}
  >
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <MediaGrid items={instaGridItems} theme={theme} />
    </div>
    <TabBar theme={theme} />
    <Snackbar
      open
      theme={theme}
      message={message}
      actionLabel={comAcao ? 'Desfazer' : undefined}
      onAction={comAcao ? () => undefined : undefined}
    />
  </div>
);

/**
 * A confirmação que fecha sozinha, com ação.
 */
const AvisoQueFecha: React.FC<{ onAction: () => void }> = ({ onAction }) => {
  const [aberto, setAberto] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Button variant="secondary" onClick={() => setAberto(true)}>
        Salvar o post
      </Button>
      <div style={{ position: 'relative', width: 300, height: 140, background: 'var(--insta-color-background-tertiary)' }}>
        <Snackbar
          open={aberto}
          message="Post salvo."
          actionLabel="Desfazer"
          onAction={onAction}
          duration={1200}
          onClose={() => setAberto(false)}
          offset={16}
        />
      </div>
    </div>
  );
};

/**
 * Página de documentação rica do componente Snackbar.
 */
const SnackbarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Extensões"
      title="Snackbar"
      description="O aviso passageiro do app real — “Link copiado”, “Sem conexão com a internet” —, em cores invertidas, sobre a tela e acima da barra de abas, com uma ação opcional em texto. Não empurra o conteúdo e não prende o foco. Extensão: o arquivo não publica aviso transitório."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Dizer algo sem interromper o que a pessoa está fazendo."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🔁" title="Cores invertidas">
        Fundo na cor do texto e texto na cor da superfície, como no app — mais de 12:1 nos dois
        temas.
      </InstaDocCard>
      <InstaDocCard icon="📍" title="Fora do fluxo">
        Flutua sobre o contêiner posicionado: aparecer não empurra o feed, e o dedo que mirava um
        post não erra o alvo.
      </InstaDocCard>
      <InstaDocCard icon="⏱️" title="Passageiro ou persistente">
        Com <code>duration</code>, fecha sozinho e chama <code>onClose</code>. Sem ela, fica até
        o consumidor fechar — o caso de um estado que dura, como estar sem conexão.
      </InstaDocCard>
      <InstaDocCard icon="📣" title="Sempre anunciado">
        A região é <code>role=&quot;status&quot;</code> e fica montada mesmo fechada: o leitor de tela diz o
        texto quando ele aparece.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="O aviso se posiciona pela barra de abas do arquivo."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1724"
      frameName="Tab Bar (posição emprestada)"
      specs={[
        { label: 'Distância da base', value: '50px da barra + 16px (--insta-spacing-l)' },
        { label: 'Recuo lateral', value: '15px (--insta-gutter)' },
        { label: 'Raio', value: '8px (--insta-radius-m)' },
        { label: 'Recuo interno', value: '12px × 16px' },
        { label: 'Texto', value: 'Label/Medium · 13px' },
        { label: 'Ação', value: 'Label/Medium · semibold · alvo de 44px' },
      ]}
    />
    <InstaDocDeviations
      items={[
        {
          subject: 'Sem quadro de aviso transitório',
          detail:
            'o arquivo não publica toast nem snackbar. O aviso usa as cores invertidas do app, o raio dos cartões e a calha das barras; sem sombra (seção 2.3).',
        },
        {
          subject: 'Ação na cor do texto',
          detail:
            'o app varia a cor da ação entre telas. Aqui ela herda a cor invertida e ganha o peso semibold: o azul de ação sobre o fundo escuro não passaria o contraste de texto.',
        },
        {
          subject: 'Origem do pedido',
          detail:
            'a A Seleção (exp07ef1b) compensava a tarja “Sem conexão com a rede…” com CSS local. Esta extensão substitui a compensação.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="O aviso sobre a grade, acima da barra de abas."
    />
    <InstaDocStage label="Aviso persistente" align="flex-start">
      <TelaComAviso />
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Só texto, com ação, e o aviso que fecha sozinho."
    />
    <InstaDocStage label="Com e sem ação" align="flex-start">
      <TelaComAviso />
      <TelaComAviso message="Post salvo." comAcao />
    </InstaDocStage>
    <InstaDocStage label="duration — fecha sozinho" align="flex-start">
      <AvisoQueFecha onAction={() => undefined} />
    </InstaDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso do aviso." />
    <InstaDocPractices
      dos={[
        'Escrever uma frase curta, que se lê de relance.',
        'Usar duration para confirmações; deixar sem ela o que dura (sem conexão).',
        'Posicionar o contêiner da TELA, para o aviso não rolar junto.',
        'Oferecer no máximo uma ação.',
      ]}
      donts={[
        'Usar o aviso para pedir uma decisão: isso é ConfirmDialog.',
        'Empilhar dois avisos ao mesmo tempo.',
        'Pôr informação que a pessoa precisa guardar — ele some.',
        'Acrescentar sombra para destacar o aviso.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a Temas" description="As cores invertem com o tema." />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <>
          <TelaComAviso theme={activeTheme} />
          <TelaComAviso theme={activeTheme} message="Post salvo." comAcao />
        </>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Snackbar."
    />
    <InstaDocPropsTable
      title="Snackbar"
      rows={[
        { name: 'open', type: 'boolean', description: 'Mostra o aviso. Obrigatório.' },
        { name: 'message', type: 'React.ReactNode', description: 'O texto do aviso. Obrigatório.' },
        { name: 'actionLabel', type: 'React.ReactNode', description: 'Rótulo da ação opcional.' },
        { name: 'onAction', type: '() => void', description: 'Toque na ação. Sem ele, a ação não aparece.' },
        { name: 'duration', type: 'number', description: 'Fecha sozinho depois de tantos ms, chamando onClose.' },
        { name: 'onClose', type: '() => void', description: 'duration se esgotou.' },
        { name: 'placement', type: "'bottom' | 'top'", default: "'bottom'", description: 'Borda do contêiner.' },
        {
          name: 'offset',
          type: 'number | string',
          default: 'acima da barra de abas (embaixo) ou da barra superior (em cima)',
          description: 'Distância da borda.',
        },
        { name: 'theme', type: "'light' | 'dark'", default: "'light'", description: 'Tema visual.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Repassados à região (className, style, data-*).',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Snackbar> = {
  title: 'Instanooria/Componentes/Snackbar',
  component: Snackbar,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Mostra o aviso.' },
    message: { control: 'text', description: 'O texto do aviso.' },
    actionLabel: { control: 'text', description: 'Rótulo da ação.' },
    duration: { control: 'number', description: 'Fecha sozinho depois de tantos ms.' },
    placement: { control: 'radio', options: ['bottom', 'top'], description: 'Borda.' },
    offset: { control: 'number', description: 'Distância da borda, em px.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onAction: { action: 'onAction' },
    onClose: { action: 'onClose' },
  },
  args: {
    open: true,
    message: 'Sem conexão com a internet.',
    actionLabel: 'Tentar de novo',
    placement: 'bottom',
    offset: 16,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SnackbarDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Snackbar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Snackbar',
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{
        position: 'relative',
        width: 375,
        height: 320,
        overflow: 'hidden',
        backgroundColor: 'var(--insta-color-background-primary)',
      }}
    >
      <MediaGrid items={instaGridItems} theme={args.theme} />
      <Snackbar {...args} />
    </div>
  ),
};

/**
 * A tarja de conexão sobre o feed, acima da barra de abas.
 */
export const EmContexto: Story = {
  name: '🎨 Em Contexto — sem conexão',
  render: () => <TelaComAviso message="Sem conexão com a internet. Tentando de novo…" />,
};

/**
 * Anunciado ao aparecer, a ação responde, e o aviso fecha sozinho com duration.
 */
export const Estados: Story = {
  args: { onAction: fn() },
  render: (args) => <AvisoQueFecha onAction={args.onAction as () => void} />,
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const regiao = tela.getByRole('status');

    await expect(regiao).toBeEmptyDOMElement();
    await userEvent.click(tela.getByRole('button', { name: 'Salvar o post' }));
    await expect(regiao).toHaveTextContent('Post salvo.');
    await userEvent.click(tela.getByRole('button', { name: 'Desfazer' }));
    await expect(args.onAction).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(regiao).toBeEmptyDOMElement(), { timeout: 3000 });
  },
};
