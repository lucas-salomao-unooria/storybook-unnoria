import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
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
import { CallScreen, PhoneFrame, StatusBar } from '../../../src/whatsappmobile';
import { waCallPortrait } from '../fixtures';

const BAR = '#0CA996';

/**
 * Tela de chamada com controles interativos.
 */
const InteractiveCall: React.FC = () => {
  const [speakerOn, setSpeakerOn] = useState(false);
  const [muted, setMuted] = useState(false);
  const [mode, setMode] = useState<'voice' | 'video'>('voice');

  return (
    <PhoneFrame caption="Voice call · node 1:4595">
      <StatusBar variant="call" height={27} />
      <CallScreen
        name="John Doe"
        state={muted ? 'Microfone silenciado' : 'Calling'}
        portraitSrc={waCallPortrait}
        mode={mode}
        speakerOn={speakerOn}
        muted={muted}
        onToggleSpeaker={() => setSpeakerOn((value) => !value)}
        onToggleVideo={() => setMode((value) => (value === 'voice' ? 'video' : 'voice'))}
        onToggleMute={() => setMuted((value) => !value)}
      />
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente CallScreen.
 */
const CallScreenDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Telas"
      title="CallScreen"
      description="Tela de chamada em curso. Reproduz o cabeçalho verde de 133px em --wa-color-call-surface com o aviso End-to-end encrypted, o nome em 30px e o estado em 19px; o retrato em tela cheia; o botão de encerramento de 58px em --wa-color-danger-endcall; e a barra de 87px com alto-falante, vídeo e microfone."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="📞" title="Esquema cromático próprio">
        A chamada troca todas as superfícies por verdes escuros exclusivos
        (<code>#04453D</code> e <code>#054C44</code>), inclusive a barra de status.
      </WaDocCard>
      <WaDocCard icon="🔴" title="Vermelho único do arquivo">
        <code>#E91C43</code> aparece somente no botão de encerramento — é a única cor vermelha de
        todo o design system.
      </WaDocCard>
      <WaDocCard icon="🎛️" title="Três controles">
        Alto-falante, vídeo e microfone. Ativos usam <code>--wa-color-call-icon</code>; inativos,{' '}
        <code>--wa-color-call-icon-muted</code>, como o vídeo desligado no frame.
      </WaDocCard>
      <WaDocCard icon="🔒" title="Aviso de criptografia">
        Acima do nome, com o cadeado de 13px e o texto em <code>#8DB5B4</code> — um verde-acinzentado
        exclusivo desta tela.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:4595"
      frameName="Voice call"
      specs={[
        { label: 'Barra de status', value: '27 px · #04453D' },
        { label: 'Cabeçalho', value: '133 px · #054C44' },
        { label: 'Nome', value: 'PT Sans 400 · 30px · #F3FFFF' },
        { label: 'Estado', value: 'PT Sans 400 · 19px · #FFFFFF' },
        { label: 'Encerrar', value: '58 px · #E91C43' },
        { label: 'Barra de controles', value: '87 px · #054C44' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Posição do botão de encerramento',
          detail:
            'no arquivo o botão flutua sobre o retrato, a 100px da barra inferior. O componente o ancora na base do palco com 48px de folga, mantendo a mesma relação visual em alturas de tela diferentes.',
        },
        {
          subject: 'Retrato',
          detail:
            'a fotografia é um bitmap colado no frame. O arquivo exportado foi versionado em public/whatsappmobile/ e é informado via portraitSrc.',
        },
        {
          subject: 'Frame de vídeo',
          detail:
            'o frame Video Call (1:4550) usa a mesma estrutura com o vídeo ativo. O componente cobre os dois casos pela prop mode, em vez de duplicar a tela.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Cabeçalho', role: 'Faixa verde de 133px com identidade e estado.', token: '--wa-color-call-surface · --wa-callheader-height' },
        { name: 'Aviso de criptografia', role: 'Cadeado e texto acima do nome.', token: '--wa-color-call-text-encrypted' },
        { name: 'Nome', role: 'Contato em chamada, em 30px.', token: '--wa-font-display-* · --wa-color-text-inverse' },
        { name: 'Estado', role: 'Situação da chamada, anunciada como status.', token: '--wa-font-subtitle-* · --wa-color-text-inverse-strong' },
        { name: 'Palco', role: 'Retrato em tela cheia com o botão de encerramento.', token: '--wa-color-surface-base' },
        { name: 'Barra de controles', role: 'Alto-falante, vídeo e microfone em 87px.', token: '--wa-color-call-icon · --wa-color-call-icon-muted' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Réplica do frame oficial" />
    <WaDocStage surface="base" padding={20} gap={24} align="flex-start">
      <PhoneFrame caption="Voice call · node 1:4595">
        <StatusBar variant="call" height={27} />
        <CallScreen name="John Doe" state="Calling" portraitSrc={waCallPortrait} />
      </PhoneFrame>
      <PhoneFrame caption="Video Call · node 1:4550">
        <StatusBar variant="call" height={27} />
        <CallScreen name="John Doe" state="02:14" portraitSrc={waCallPortrait} mode="video" speakerOn />
      </PhoneFrame>
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Demonstração interativa"
      description="Alterne alto-falante, vídeo e microfone."
    />
    <WaDocStage surface="base" padding={20}>
      <InteractiveCall />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Trocar a StatusBar para variant="call" ao entrar na chamada.',
        'Anunciar o estado da chamada com role="status", como o componente faz.',
        'Refletir cada controle em aria-pressed.',
        'Informar portraitSrc quando houver imagem do contato.',
      ]}
      donts={[
        'Usar o vermelho de encerramento em qualquer outra ação.',
        'Manter a barra de status na variante app durante a chamada.',
        'Colocar o botão de encerramento na barra de controles.',
        'Aplicar as superfícies verdes fora da tela de chamada.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; a chamada tem superfícies verdes próprias."
    />
    <WaDocSurfaceSwitcher surfaces={['call', 'base']} initial="call">
      {() => (
        <div style={{ width: 300, height: 420, display: 'flex' }}>
          <CallScreen name="John Doe" state="Calling" portraitSrc={waCallPortrait} />
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="CallScreen"
      rows={[
        { name: 'name', type: 'string', description: 'Nome do contato em chamada. Obrigatório.' },
        { name: 'state', type: 'string', default: "'Calling'", description: 'Estado da chamada, como "Calling" ou a duração.' },
        { name: 'showEncryptionLabel', type: 'boolean', default: 'true', description: 'Exibe o aviso de criptografia acima do nome.' },
        { name: 'encryptionLabel', type: 'string', default: "'End-to-end encrypted'", description: 'Texto do aviso de criptografia.' },
        { name: 'portraitSrc', type: 'string', description: 'URL do retrato exibido ao centro.' },
        { name: 'mode', type: "'voice' | 'video'", default: "'voice'", description: 'Modalidade da chamada, que define o estado do controle de vídeo.' },
        { name: 'speakerOn', type: 'boolean', default: 'false', description: 'Indica se o alto-falante está ativo.' },
        { name: 'muted', type: 'boolean', default: 'false', description: 'Indica se o microfone está silenciado.' },
        { name: 'onToggleSpeaker', type: '(event) => void', description: 'Callback do alto-falante.' },
        { name: 'onToggleVideo', type: '(event) => void', description: 'Callback do vídeo.' },
        { name: 'onToggleMute', type: '(event) => void', description: 'Callback do microfone.' },
        { name: 'onEndCall', type: '(event) => void', description: 'Callback de encerramento da chamada.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof CallScreen> = {
  title: 'Whatsapp Mobile/Componentes/CallScreen',
  component: CallScreen,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'text', description: 'Nome do contato.' },
    state: { control: 'text', description: 'Estado da chamada.' },
    showEncryptionLabel: { control: 'boolean', description: 'Exibe o aviso de criptografia.' },
    encryptionLabel: { control: 'text', description: 'Texto do aviso.' },
    portraitSrc: { control: 'text', description: 'URL do retrato.' },
    mode: { control: 'radio', options: ['voice', 'video'], description: 'Modalidade da chamada.' },
    speakerOn: { control: 'boolean', description: 'Alto-falante ativo.' },
    muted: { control: 'boolean', description: 'Microfone silenciado.' },
  },
  args: {
    name: 'John Doe',
    state: 'Calling',
    showEncryptionLabel: true,
    encryptionLabel: 'End-to-end encrypted',
    portraitSrc: waCallPortrait,
    mode: 'voice',
    speakerOn: false,
    muted: false,
  },
};

export default meta;

type Story = StoryObj<typeof CallScreen>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CallScreenDocumentationPage />,
};

/**
 * Playground com 100% das props do CallScreen expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do CallScreen',
  render: (args) => (
    <WaDocStage surface="base" padding={20}>
      <PhoneFrame>
        <StatusBar variant="call" height={27} />
        <CallScreen {...args} />
      </PhoneFrame>
    </WaDocStage>
  ),
};

/**
 * Réplica dos frames "Voice call" e "Video Call".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="base" padding={20} gap={24} align="flex-start">
      <PhoneFrame caption="Voice call · node 1:4595">
        <StatusBar variant="call" height={27} />
        <CallScreen name="John Doe" state="Calling" portraitSrc={waCallPortrait} />
      </PhoneFrame>
      <PhoneFrame caption="Video Call · node 1:4550">
        <StatusBar variant="call" height={27} />
        <CallScreen name="John Doe" state="02:14" portraitSrc={waCallPortrait} mode="video" speakerOn />
      </PhoneFrame>
    </WaDocStage>
  ),
};

/**
 * Matriz de modalidades e estados dos controles.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="base" padding={20}>
      <InteractiveCall />
    </WaDocStage>
  ),
};
