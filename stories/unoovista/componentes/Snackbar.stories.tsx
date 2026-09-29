import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Snackbar } from '../../../src/unoovista/components/Snackbar';
import { MediaGrid } from '../../../src/unoovista/components/MediaGrid';
import { TabBar } from '../../../src/unoovista/components/TabBar';
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

/**
 * Uma tela posicionada com a grade, a doca de navegação e o aviso por cima dela.
 */
const TelaComAviso: React.FC<{
  theme?: 'light' | 'dark';
  message?: string;
  comAcao?: boolean;
}> = ({ theme, message = 'Sem conexão com a internet.', comAcao = false }) => (
  <div
    data-unv-theme={theme}
    style={{
      position: 'relative',
      width: 320,
      height: 420,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--unv-radius-l)',
      backgroundColor: 'var(--unv-color-background-secondary)',
    }}
  >
    <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--unv-spacing-m)' }}>
      <MediaGrid items={unvGridItems} />
    </div>
    <TabBar withHomeIndicatorInset={false} />
    <Snackbar
      open
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
        Salvar a publicação
      </Button>
      <div
        style={{
          position: 'relative',
          width: 320,
          height: 140,
          borderRadius: 'var(--unv-radius-l)',
          background: 'var(--unv-color-background-tertiary)',
        }}
      >
        <Snackbar
          open={aberto}
          message="Publicação salva."
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
      badgeBrand="Unoovista"
      category="Componentes • Extensões"
      title="Snackbar"
      description="O aviso passageiro — “Link copiado”, “Sem conexão com a internet” —, numa cápsula em cores invertidas que flutua acima da doca de navegação, com uma ação opcional em botão contornado. Não empurra o conteúdo e não prende o foco."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Dizer algo sem interromper o que a pessoa está fazendo."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🔁" title="Cores invertidas">
        Fundo na cor do texto primário e texto na cor da superfície: 15,1:1 no tema claro e 16,7:1
        no escuro.
      </UnvDocCard>
      <UnvDocCard icon="📍" title="Fora do fluxo">
        Flutua sobre o contêiner posicionado: aparecer não empurra o conteúdo, e o dedo que mirava
        uma publicação não erra o alvo.
      </UnvDocCard>
      <UnvDocCard icon="⏱️" title="Passageiro ou persistente">
        Com <code>duration</code>, fecha sozinho e chama <code>onClose</code>. Sem ela, fica até o
        consumidor fechar — o caso de um estado que dura, como estar sem conexão.
      </UnvDocCard>
      <UnvDocCard icon="🔊" title="Região de status">
        Fica sempre montada como <code>role=&quot;status&quot;</code>: o leitor de tela anuncia o
        texto quando ele aparece.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="Snackbar"
      layout="Cápsula · sobre a tela"
      specs={[
        { label: 'Fundo', value: '--unv-color-text-primary' },
        { label: 'Texto', value: '--unv-color-background-primary · label-md' },
        { label: 'Raio', value: '--unv-radius-xl · 24px' },
        { label: 'Elevação', value: '--unv-elevation-overlay' },
        { label: 'Ação', value: 'Botão contornado · 44px · title-sm' },
        { label: 'Calha lateral', value: '--unv-gutter · 16px' },
        { label: 'Base', value: 'Acima da doca (tabbar + 20px)' },
        { label: 'Entrada', value: '200ms · desligada com movimento reduzido' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Extensão sem par na Plataforma Unooria',
          detail:
            'a Plataforma não tem aviso transitório. O componente usa os degraus do módulo e a elevação de sobreposição.',
        },
        {
          subject: 'Cores invertidas, medidas',
          detail:
            'o fundo é --unv-color-text-primary e o texto, --unv-color-background-primary. Claro: branco sobre #22272A, 15,1:1. Escuro: #0E1039 sobre #F5F5F5, 16,7:1. Nenhum token novo.',
        },
        {
          subject: 'Ação em botão contornado',
          detail:
            'sobre o fundo invertido, text-link mediria 2,1:1 no claro. A ação usa a mesma cor do texto, com contorno de 1px e 44px de altura: o contorno mede o mesmo 15,1:1 e 16,7:1, e a ação se lê como botão sem depender de cor.',
        },
        {
          subject: 'Cápsula e elevação',
          detail:
            'cantos de 24px e --unv-elevation-overlay, como a doca e os menus. No escuro, o halo claro separa o aviso da tela roxa.',
        },
        {
          subject: 'Posição acima da doca',
          detail:
            'a base usa a variável local --unv-snackbar-inset-bottom (tabbar-height + 20px), que deixa livre a doca flutuante; offset a substitui. O topo usa topbar-height + 12px.',
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
      description="Região de status sempre montada; a cápsula só existe com open."
    />
    <UnvDocAnatomy
      zones={[
        { name: 'Região', role: 'role="status", aria-live polite; posicionada e sem toque.', token: 'open' },
        { name: 'Cápsula', role: 'Fundo invertido com a elevação de sobreposição.', token: '--unv-color-text-primary · --unv-elevation-overlay' },
        { name: 'Mensagem', role: 'O texto do aviso.', token: '--unv-color-background-primary' },
        { name: 'Ação', role: 'Botão contornado; só com actionLabel e onAction.', token: 'actionLabel · onAction' },
      ]}
    />
    <UnvDocStage label="Em contexto: sem conexão" surface="secondary" padding={16}>
      <TelaComAviso message="Sem conexão com a internet. Tentando de novo…" />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes"
      description="Com e sem ação, em cima e embaixo."
    />
    <UnvDocStage label="Sem ação · com ação" surface="secondary" align="flex-start" padding={16}>
      <TelaComAviso />
      <TelaComAviso message="Publicação salva." comAcao />
    </UnvDocStage>
    <UnvDocStage label="Placement top" surface="secondary" align="flex-start" padding={16}>
      <div
        style={{
          position: 'relative',
          width: 320,
          height: 160,
          borderRadius: 'var(--unv-radius-l)',
          background: 'var(--unv-color-background-primary)',
        }}
      >
        <Snackbar open placement="top" offset={16} message="Link copiado." />
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Dar contexto curto: “Publicação salva.” em vez de “Sucesso”.',
        'Oferecer no máximo uma ação.',
        'Deixar o aviso na tela tempo suficiente para ler a frase inteira.',
        'Renderizar dentro de um contêiner com position: relative.',
      ]}
      donts={[
        'Usar o aviso para pedir uma decisão: isso é um diálogo de confirmação.',
        'Empilhar dois avisos ao mesmo tempo.',
        'Pôr informação que a pessoa precisa guardar — ele some.',
        'Acrescentar cor de alerta ao fundo: o aviso é invertido, não semântico.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="As cores invertem com o tema: escuro sobre claro, claro sobre escuro."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={16}>
      {() => (
        <>
          <TelaComAviso />
          <TelaComAviso message="Publicação salva." comAcao />
        </>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UnvDocPropsTable
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
          default: 'acima da doca (embaixo) ou da barra superior (em cima)',
          description: 'Distância da borda.',
        },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
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
  title: 'Unoovista/Componentes/Snackbar',
  component: Snackbar,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Mostra o aviso.' },
    message: { control: 'text', description: 'O texto do aviso.' },
    actionLabel: { control: 'text', description: 'Rótulo da ação.' },
    duration: { control: 'number', description: 'Fecha sozinho depois de tantos ms.' },
    placement: { control: 'radio', options: ['bottom', 'top'], description: 'Borda.' },
    offset: { control: 'number', description: 'Distância da borda, em px.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    onAction: { action: 'onAction' },
    onClose: { action: 'onClose' },
  },
  args: {
    open: true,
    message: 'Sem conexão com a internet.',
    actionLabel: 'Tentar de novo',
    placement: 'bottom',
    offset: 16,
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
    <UnvDocStage theme={args.theme ?? 'light'} surface="secondary" padding={16}>
      <div
        style={{
          position: 'relative',
          width: 375,
          height: 320,
          overflow: 'hidden',
          borderRadius: 'var(--unv-radius-l)',
          backgroundColor: 'var(--unv-color-background-primary)',
        }}
      >
        <MediaGrid items={unvGridItems} />
        <Snackbar {...args} onAction={args.onAction ?? (() => undefined)} />
      </div>
    </UnvDocStage>
  ),
};

/**
 * O aviso de conexão sobre o feed, acima da doca de navegação.
 */
export const EmContexto: Story = {
  name: '🎨 Em Contexto — sem conexão',
  render: () => <TelaComAviso message="Sem conexão com a internet. Tentando de novo…" />,
};

/**
 * Sem ação e com ação, nos dois temas.
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
          align="flex-start"
          padding={16}
        >
          <TelaComAviso />
          <TelaComAviso message="Publicação salva." comAcao />
        </UnvDocStage>
      ))}
    </div>
  ),
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
    await userEvent.click(tela.getByRole('button', { name: 'Salvar a publicação' }));
    await expect(regiao).toHaveTextContent('Publicação salva.');
    await userEvent.click(tela.getByRole('button', { name: 'Desfazer' }));
    await expect(args.onAction).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(regiao).toBeEmptyDOMElement(), { timeout: 3000 });
  },
};
