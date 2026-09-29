import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocAnatomy,
  UncDocPractices,
  UncDocPropsTable,
  UncDocStage,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import { ChatWallpaper, ForwardButton, MessageBubble, SystemMessage } from '../../../src/unoochat';
import { uncWallpaperFor } from '../fixtures';

type Tema = 'light' | 'dark';

const BAR = '#716C98';

/**
 * Trecho de conversa com fundo do tema: um contêiner de 411px sobre a textura
 * correspondente.
 */
const Conversa: React.FC<{ tema: Tema; children: React.ReactNode }> = ({ tema, children }) => (
  <div data-unc-theme={tema} style={{ width: 411 }}>
    <ChatWallpaper src={uncWallpaperFor(tema)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '18px 12px' }}>
        {children}
      </div>
    </ChatWallpaper>
  </div>
);

/**
 * Um balão recebido com o atalho de encaminhar ao lado, alternando a escolha.
 * Esgotado, o toque não escolhe: explica a recusa.
 */
const BalaoComAtalho: React.FC<{ texto: string; remetente: string; esgotado?: boolean }> = ({
  texto,
  remetente,
  esgotado = false,
}) => {
  const [escolhida, setEscolhida] = useState(false);
  const [aviso, setAviso] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <MessageBubble direction="in" sender={remetente} time="08:12" maxWidth={250}>
          {texto}
        </MessageBubble>
        <ForwardButton
          label={`Encaminhar mensagem de ${remetente}`}
          selected={escolhida}
          exhausted={esgotado}
          onClick={() => (esgotado && !escolhida ? setAviso(true) : setEscolhida((valor) => !valor))}
        />
      </div>
      <div role="status">{aviso && <SystemMessage>Limite de 3 mensagens atingido.</SystemMessage>}</div>
    </div>
  );
};

/**
 * Página de documentação rica do componente ForwardButton.
 */
const ForwardButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Extensões"
      title="ForwardButton"
      description="Atalho circular de encaminhar, ao lado do balão. Em repouso mostra o glifo forward, na superfície da app bar; escolhido, mostra o tick sobre a cor de acento. Extensão do módulo, sem par na Plataforma Unooria: ela compõe as medidas do avatar, da app bar e do selo de acento."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="↪️" title="Encaminhar sem abrir menu">
        Um toque escolhe a mensagem. É o gesto do app real para mídia e link, e dispensa o toque
        longo — que numa sala de aula se confunde com a rolagem.
      </UncDocCard>
      <UncDocCard icon="✔️" title="Estado escolhido">
        <code>selected</code> troca o glifo pelo tique (<code>tick</code>) e anuncia <code>aria-pressed</code>: o
        estado é lido, não só visto.
      </UncDocCard>
      <UncDocCard icon="🚫" title="Cota esgotada">
        <code>exhausted</code> esmaece a 30% e anuncia <code>aria-disabled</code>, mas o toque
        continua chegando: é ele que explica a recusa. <code>disabled</code>, que engole o toque, fica
        para quando não há o que explicar.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="ForwardButton"
      layout="Círculo · 32px"
      specs={[
        { label: 'Diâmetro', value: '32px (--unc-avatar-sm)' },
        { label: 'Alvo de toque', value: '44 × 44px' },
        { label: 'Glifo', value: '16px · forward / tick' },
        { label: 'Repouso', value: '--unc-color-surface-appbar · glifo --unc-color-icon-appbar' },
        { label: 'Escolhido', value: '--unc-color-accent · glifo --unc-color-icon-on-accent' },
        { label: 'Desabilitado', value: 'opacidade 30%' },
        { label: 'Esgotado', value: 'opacidade 30% · aria-disabled · continua acionável' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Extensão sem par na Unooria',
          detail:
            'a Plataforma Unooria não tem atalho de encaminhar. O diâmetro é o do avatar do cabeçalho de conversa (`--unc-avatar-sm`); as cores são a da app bar, a do glifo de encaminhar e a do selo de acento; os glifos vêm do registro: `forward` (`reply` espelhado) e `tick` (`check`).',
        },
        {
          subject: 'Glifo de encaminhar',
          detail:
            'o quadro de ícones da Unooria não publica `forward`. O equivalente é `reply` espelhado no eixo horizontal (`flipX`), registrado em `uncIcons`, e não um vetor desenhado à mão.',
        },
        {
          subject: 'Estado esgotado',
          detail:
            'o produto limita quantas mensagens podem ser escolhidas e precisa dizer por quê: o mesmo esmaecimento do desabilitado, sem engolir o toque, que é o que dispara a explicação da recusa.',
        },
        {
          subject: 'Escolhido em roxo, nos dois temas',
          detail:
            'o círculo escolhido usa `--unc-color-accent` (`#716C98` no claro, `#AAA5C2` no escuro) e o tique usa `--unc-color-icon-on-accent` (branco no claro, `#080922` no escuro), com contraste acima de 4,5:1.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Círculo', role: 'Botão de 32px com alvo de toque de 44px.', token: '--unc-avatar-sm · --unc-color-surface-appbar' },
        { name: 'Glifo', role: 'forward em repouso, tick quando escolhido (16px).', token: '--unc-color-icon-appbar · --unc-color-icon-on-accent' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de estados" />
    {(['light', 'dark'] as const).map((tema) => (
      <UncDocStage
        key={tema}
        label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
        theme={tema}
        surface="canvas"
        padding={28}
        gap={24}
      >
        <ForwardButton label={`Encaminhar (repouso, ${tema})`} />
        <ForwardButton label={`Encaminhar (escolhida, ${tema})`} selected />
        <ForwardButton label={`Encaminhar (esgotada, explica, ${tema})`} exhausted />
        <ForwardButton label={`Encaminhar (desabilitada, ${tema})`} disabled />
      </UncDocStage>
    ))}

    <UnooriaDocSectionHeader barColor={BAR} title="5. Em contexto" description="Toque no atalho para escolher e desfazer." />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <Conversa key={tema} tema={tema}>
          <BalaoComAtalho remetente="Bruno Reis" texto="O ônibus furou o pneu perto da praça. Já chamaram o socorro." />
          <BalaoComAtalho remetente="Carla Nogueira" texto="O lanche foi antecipado para antes da visita." esgotado />
        </Conversa>
      ))}
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={[
        'Dar um label que diga QUAL mensagem é encaminhada.',
        'Posicionar ao lado do balão, alinhado ao centro dele.',
        'Esmaecer, e não esconder, quando a cota acabar.',
        'Usar exhausted quando o toque precisa explicar a recusa; disabled só quando não há o que explicar.',
      ]}
      donts={[
        'Usar sem label: o botão é só um glifo.',
        'Trocar o tique por outro glifo desenhado à mão.',
        'Remover o atalho escolhido quando a cota acaba — ele precisa continuar desfazível.',
        'Usar disabled na cota que pede aviso: o toque some e a recusa fica muda.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: a superfície do círculo, o glifo e o acento acompanham."
    />
    <UncDocThemeSwitcher surface="canvas">
      {() => (
        <div style={{ display: 'flex', gap: 16 }}>
          <ForwardButton label="Repouso" />
          <ForwardButton label="Escolhida" selected />
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
      title="ForwardButton"
      rows={[
        { name: 'label', type: 'string', description: 'Nome acessível. Obrigatório.' },
        { name: 'selected', type: 'boolean', default: 'false', description: 'Mensagem escolhida: mostra o tique e anuncia aria-pressed.' },
        { name: 'exhausted', type: 'boolean', default: 'false', description: 'Cota esgotada: 30% de opacidade e aria-disabled, mas o toque continua chegando. Ignorado quando selected.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o atalho (30% de opacidade) e engole o toque.' },
        { name: '...rest', type: 'React.ButtonHTMLAttributes<HTMLButtonElement>', description: 'Demais atributos nativos, como onClick.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ForwardButton> = {
  title: 'Unoochat/Componentes/ForwardButton',
  component: ForwardButton,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Nome acessível.' },
    selected: { control: 'boolean', description: 'Mensagem escolhida.' },
    exhausted: { control: 'boolean', description: 'Cota esgotada, o toque explica a recusa.' },
    disabled: { control: 'boolean', description: 'Desabilitado, sem toque.' },
    onClick: { action: 'onClick' },
  },
  args: { label: 'Encaminhar mensagem', selected: false, exhausted: false, disabled: false },
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
    <UncDocStage surface="canvas" padding={40}>
      <ForwardButton {...args} />
    </UncDocStage>
  ),
};

/**
 * O atalho alterna a escolha e o anuncia por aria-pressed.
 */
export const Estados: Story = {
  render: () => (
    <Conversa tema="light">
      <BalaoComAtalho remetente="Bruno Reis" texto="O ônibus furou o pneu perto da praça." />
    </Conversa>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const atalho = tela.getByRole('button', { name: 'Encaminhar mensagem de Bruno Reis' });

    await expect(atalho).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(atalho);
    await expect(atalho).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(atalho);
    await expect(atalho).toHaveAttribute('aria-pressed', 'false');
  },
};

/**
 * Esgotado: o atalho esmaece e se anuncia desabilitado, mas o toque chega — e
 * é ele que diz por que a mensagem não entra.
 */
export const Esgotado: Story = {
  render: () => (
    <Conversa tema="light">
      <BalaoComAtalho remetente="Carla Nogueira" texto="O lanche foi antecipado para antes da visita." esgotado />
    </Conversa>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const atalho = tela.getByRole('button', { name: 'Encaminhar mensagem de Carla Nogueira' });

    await expect(atalho).toHaveAttribute('aria-disabled', 'true');
    await expect(atalho).toBeEnabled();
    await userEvent.click(atalho);
    await expect(tela.getByRole('status')).toHaveTextContent('Limite de 3 mensagens atingido.');
    await expect(atalho).toHaveAttribute('aria-pressed', 'false');
  },
};
