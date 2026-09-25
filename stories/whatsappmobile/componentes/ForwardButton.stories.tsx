import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  WaDocGrid,
  WaDocCard,
  WaDocFigmaSpecs,
  WaDocDeviations,
  WaDocAnatomy,
  WaDocPractices,
  WaDocPropsTable,
  WaDocStage,
  WaDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { ChatWallpaper, ForwardButton, MessageBubble } from '../../../src/whatsappmobile';
import { waWallpaper } from '../fixtures';

const BAR = '#0CA996';

/**
 * Um balão recebido com o atalho de encaminhar ao lado, alternando a escolha.
 */
const BalaoComAtalho: React.FC<{ texto: string; remetente: string; esgotado?: boolean }> = ({
  texto,
  remetente,
  esgotado = false,
}) => {
  const [escolhida, setEscolhida] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <MessageBubble direction="in" sender={remetente} time="08:12" maxWidth={250}>
        {texto}
      </MessageBubble>
      <ForwardButton
        label={`Encaminhar mensagem de ${remetente}`}
        selected={escolhida}
        disabled={esgotado && !escolhida}
        onClick={() => setEscolhida((valor) => !valor)}
      />
    </div>
  );
};

/**
 * Página de documentação rica do componente ForwardButton.
 */
const ForwardButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Extensões"
      title="ForwardButton"
      description="Atalho circular de encaminhar, ao lado do balão. Em repouso mostra o glifo forward; escolhido, o tick sobre o verde-água do selo. Extensão: o app real tem o atalho, o arquivo publica só os glifos."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="↪️" title="Encaminhar sem abrir menu">
        Um toque escolhe a mensagem. É o gesto do app real para mídia e link, e dispensa o toque
        longo — que numa sala de aula se confunde com a rolagem.
      </WaDocCard>
      <WaDocCard icon="✔️" title="Estado escolhido">
        <code>selected</code> troca o glifo pelo tique e anuncia <code>aria-pressed</code>: o
        estado é lido, não só visto.
      </WaDocCard>
      <WaDocCard icon="🚫" title="Cota esgotada">
        Desabilitado a 30%: a opção que não cabe mais continua visível, para ser lida como esgotada
        e não como sumida.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3001"
      frameName="Direct Message · avatar de 32px (a âncora do diâmetro)"
      specs={[
        { label: 'Diâmetro', value: '32px (--wa-avatar-sm)' },
        { label: 'Alvo de toque', value: '44 × 44px' },
        { label: 'Repouso', value: '--wa-color-surface-appbar · glifo --wa-color-icon-forward' },
        { label: 'Escolhido', value: '--wa-color-accent-badge · glifo --wa-color-icon-on-accent' },
        { label: 'Desabilitado', value: 'opacidade 30%' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Componente sem frame',
          detail:
            'o arquivo não desenha o atalho de encaminhar. O diâmetro é o do avatar do cabeçalho de conversa; as cores são a app bar, o glifo de encaminhar e o selo verde-água. Os glifos forward e tick são literais do registro.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Círculo', role: 'Botão de 32px com alvo de 44px.', token: '--wa-avatar-sm · --wa-color-surface-appbar' },
        { name: 'Glifo', role: 'forward em repouso, tick quando escolhido.', token: '--wa-color-icon-forward · --wa-color-icon-on-accent' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de estados" />
    <WaDocStage surface="canvas" padding={28} gap={24}>
      <ForwardButton label="Encaminhar (repouso)" />
      <ForwardButton label="Encaminhar (escolhida)" selected />
      <ForwardButton label="Encaminhar (esgotada)" disabled />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Em contexto" description="Toque no atalho para escolher e desfazer." />
    <div style={{ width: 411, marginBottom: 32 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '18px 12px' }}>
          <BalaoComAtalho remetente="Pedro Henrique" texto="O ônibus furou o pneu perto da praça. Já chamaram o socorro." />
          <BalaoComAtalho remetente="Mariana Souza" texto="O lanche foi antecipado para antes da visita." esgotado />
        </div>
      </ChatWallpaper>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Dar um label que diga QUAL mensagem é encaminhada.',
        'Posicionar ao lado do balão, alinhado ao centro dele.',
        'Desabilitar, e não esconder, quando a cota acabar.',
      ]}
      donts={[
        'Usar sem label: o botão é só um glifo.',
        'Trocar o tique por outro glifo desenhado à mão.',
        'Remover o atalho escolhido quando a cota acaba — ele precisa continuar desfazível.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base', 'sheet']} initial="canvas">
      {() => (
        <div style={{ display: 'flex', gap: 16 }}>
          <ForwardButton label="Repouso" />
          <ForwardButton label="Escolhida" selected />
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="ForwardButton"
      rows={[
        { name: 'label', type: 'string', description: 'Nome acessível. Obrigatório.' },
        { name: 'selected', type: 'boolean', default: 'false', description: 'Mensagem escolhida: mostra o tique e anuncia aria-pressed.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o atalho (30% de opacidade).' },
        { name: '...rest', type: 'React.ButtonHTMLAttributes<HTMLButtonElement>', description: 'Demais atributos nativos, como onClick.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ForwardButton> = {
  title: 'Whatsapp Mobile/Componentes/ForwardButton',
  component: ForwardButton,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Nome acessível.' },
    selected: { control: 'boolean', description: 'Mensagem escolhida.' },
    disabled: { control: 'boolean', description: 'Cota esgotada.' },
    onClick: { action: 'onClick' },
  },
  args: { label: 'Encaminhar mensagem', selected: false, disabled: false },
};

export default meta;

type Story = StoryObj<typeof ForwardButton>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ForwardButtonDocumentationPage />,
};

/**
 * Playground com 100% das props do ForwardButton expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ForwardButton',
  render: (args) => (
    <WaDocStage surface="canvas" padding={40}>
      <ForwardButton {...args} />
    </WaDocStage>
  ),
};

/**
 * O atalho alterna a escolha e o anuncia por aria-pressed.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ width: 411 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ padding: '18px 12px' }}>
          <BalaoComAtalho remetente="Pedro Henrique" texto="O ônibus furou o pneu perto da praça." />
        </div>
      </ChatWallpaper>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const atalho = tela.getByRole('button', { name: 'Encaminhar mensagem de Pedro Henrique' });

    await expect(atalho).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(atalho);
    await expect(atalho).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(atalho);
    await expect(atalho).toHaveAttribute('aria-pressed', 'false');
  },
};
