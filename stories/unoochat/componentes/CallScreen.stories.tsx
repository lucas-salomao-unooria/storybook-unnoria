import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
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
import { CallScreen, PhoneFrame, StatusBar } from '../../../src/unoochat';
import { uncCallPortrait } from '../fixtures';

const BAR = '#716C98';

/**
 * Tela de chamada com controles interativos.
 */
const InteractiveCall: React.FC = () => {
  const [speakerOn, setSpeakerOn] = useState(false);
  const [muted, setMuted] = useState(false);
  const [mode, setMode] = useState<'voice' | 'video'>('voice');

  return (
    <PhoneFrame caption="Chamada de voz">
      <StatusBar variant="call" />
      <CallScreen
        name="Bruno Reis"
        state={muted ? 'Microfone silenciado' : 'Chamando'}
        portraitSrc={uncCallPortrait}
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
      badgeBrand="Unoochat"
      category="Componentes • Telas"
      title="CallScreen"
      description="Tela de chamada em curso. Cabeçalho de 133px em --unc-color-call-surface com o aviso de criptografia, o nome em 24px e o estado em 18px; o retrato em tela cheia; o botão de encerramento de 58px em --unc-color-danger-endcall; e a barra de 87px com alto-falante, vídeo e microfone. A superfície roxa da chamada é a mesma nos dois temas."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="📞" title="Superfície própria, invariante">
        A chamada troca as superfícies por roxos profundos exclusivos —{' '}
        <code>--unc-color-call-surface</code> (<code>brandpurple-800</code>) e{' '}
        <code>--unc-color-call-statusbar</code> (<code>brandpurple-900</code>) —, iguais no tema
        claro e no escuro, inclusive na barra de status.
      </UncDocCard>
      <UncDocCard icon="🔴" title="Um único vermelho de ação">
        <code>--unc-color-danger-endcall</code> (<code>danger-600</code>) aparece somente no botão
        de encerramento, com o glifo <code>callEnd</code>.
      </UncDocCard>
      <UncDocCard icon="🎛️" title="Três controles">
        Alto-falante, vídeo e microfone. Ativos usam <code>--unc-color-call-icon</code>; inativos,{' '}
        <code>--unc-color-call-icon-muted</code>, e cada um reflete o estado em{' '}
        <code>aria-pressed</code>.
      </UncDocCard>
      <UncDocCard icon="🔒" title="Aviso de criptografia">
        Acima do nome, com o cadeado e o texto em <code>--unc-color-call-text-encrypted</code>,
        um lilás claro exclusivo desta tela.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="CallScreen"
      layout="Tela · 411 × 823px"
      specs={[
        { label: 'Barra de status', value: '--unc-color-call-statusbar · #0E1039' },
        { label: 'Cabeçalho', value: '133 px · --unc-color-call-surface · #34375C' },
        { label: 'Nome', value: 'Open Sans 400 · 24/34px · --unc-color-text-inverse' },
        { label: 'Estado', value: 'Open Sans 400 · 18/28px · --unc-color-text-inverse' },
        { label: 'Encerrar', value: '58 px · --unc-color-danger-endcall · #E31A1A' },
        { label: 'Barra de controles', value: '87 px · --unc-color-call-surface' },
        { label: 'Controle ativo · silenciado', value: '#EFEEF5 · #8B85AC' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Superfície invariante entre temas',
          detail:
            'a tela de chamada usa brandpurple-800 (cabeçalho e barra) e brandpurple-900 (barra de status) nos dois temas, como uma tela de imersão; o texto sobre ela é --unc-color-text-inverse (branco) também nos dois. O tema só altera o palco atrás do retrato (--unc-color-surface-base), visível enquanto a imagem não carrega.',
        },
        {
          subject: 'Cor do controle silenciado por contraste',
          detail:
            'os controles inativos usam brandpurple-500 (#8B85AC) sobre a barra: cerca de 3,3:1, acima dos 3:1 exigidos de componente de interface, e ainda distinto do estado ativo (brandpurple-100, cerca de 9,9:1).',
        },
        {
          subject: 'Botão de encerrar ancorado à base do palco',
          detail:
            'o botão flutua sobre o retrato, ancorado à base do palco com 48px de folga (--unc-spacing-4xl), para manter a relação visual em alturas de tela diferentes. A Plataforma Unooria não tem tela de chamada: as medidas de 133px, 87px e 58px são do módulo.',
        },
        {
          subject: 'Uma tela, duas modalidades',
          detail:
            'voz e vídeo usam a mesma estrutura; a prop mode só altera o estado do controle de vídeo, em vez de duplicar a tela.',
        },
        {
          subject: 'Retrato ilustrado',
          detail:
            'o retrato entra por portraitSrc (ilustração SVG em public/unoochat/); nenhuma imagem integra o pacote.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Cabeçalho', role: 'Faixa roxa de 133px com identidade e estado.', token: '--unc-color-call-surface · --unc-callheader-height' },
        { name: 'Aviso de criptografia', role: 'Cadeado e texto acima do nome.', token: '--unc-color-call-text-encrypted' },
        { name: 'Nome', role: 'Contato em chamada, em 24px.', token: '--unc-font-display-* · --unc-color-text-inverse' },
        { name: 'Estado', role: 'Situação da chamada, anunciada como status.', token: '--unc-font-subtitle-* · --unc-color-text-inverse' },
        { name: 'Palco', role: 'Retrato em tela cheia com o botão de encerramento.', token: '--unc-color-surface-base' },
        { name: 'Barra de controles', role: 'Alto-falante, vídeo e microfone em 87px.', token: '--unc-color-call-icon · --unc-color-call-icon-muted' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Variantes e contexto" description="Chamada de voz e de vídeo, nos dois temas." />
    <UncDocStage surface="base" padding={20} gap={24} align="flex-start">
      <PhoneFrame caption="Chamada de voz">
        <StatusBar variant="call" />
        <CallScreen name="Bruno Reis" state="Chamando" portraitSrc={uncCallPortrait} />
      </PhoneFrame>
      <PhoneFrame caption="Chamada de vídeo">
        <StatusBar variant="call" />
        <CallScreen name="Bruno Reis" state="02:14" portraitSrc={uncCallPortrait} mode="video" speakerOn />
      </PhoneFrame>
    </UncDocStage>

    <UncDocStage label="Tema escuro" theme="dark" surface="base" padding={20} gap={24} align="flex-start">
      <PhoneFrame caption="Chamada de voz">
        <StatusBar variant="call" />
        <CallScreen name="Bruno Reis" state="Chamando" portraitSrc={uncCallPortrait} />
      </PhoneFrame>
    </UncDocStage>

    <UncDocStage label="Interativo: alterne alto-falante, vídeo e microfone" surface="base" padding={20}>
      <InteractiveCall />
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
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
        'Aplicar as superfícies roxas da chamada fora da tela de chamada.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: a chamada mantém as próprias superfícies roxas; só o palco atrás do retrato acompanha o tema."
    />
    <UncDocThemeSwitcher surface="base">
      {() => (
        <div style={{ width: 300, height: 420, display: 'flex' }}>
          <CallScreen name="Bruno Reis" state="Chamando" portraitSrc={uncCallPortrait} />
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="CallScreen"
      rows={[
        { name: 'name', type: 'string', description: 'Nome do contato em chamada. Obrigatório.' },
        { name: 'state', type: 'string', default: "'Chamando'", description: 'Estado da chamada, como "Chamando" ou a duração.' },
        { name: 'showEncryptionLabel', type: 'boolean', default: 'true', description: 'Exibe o aviso de criptografia acima do nome.' },
        { name: 'encryptionLabel', type: 'string', default: "'Criptografia de ponta a ponta'", description: 'Texto do aviso de criptografia.' },
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
  title: 'Unoochat/Componentes/CallScreen',
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
    name: 'Bruno Reis',
    state: 'Chamando',
    showEncryptionLabel: true,
    encryptionLabel: 'Criptografia de ponta a ponta',
    portraitSrc: uncCallPortrait,
    mode: 'voice',
    speakerOn: false,
    muted: false,
  },
};

export default meta;

type Story = StoryObj<typeof CallScreen>;

/**
 * Documentação rica e completa do componente.
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
    <UncDocStage surface="base" padding={20}>
      <PhoneFrame>
        <StatusBar variant="call" />
        <CallScreen {...args} />
      </PhoneFrame>
    </UncDocStage>
  ),
};

/**
 * Chamadas de voz e de vídeo, nos dois temas.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <>
      {(['light', 'dark'] as const).map((theme) => (
        <UncDocStage
          key={theme}
          label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={theme}
          surface="base"
          padding={20}
          gap={24}
          align="flex-start"
        >
          <PhoneFrame caption="Chamada de voz">
            <StatusBar variant="call" />
            <CallScreen name="Bruno Reis" state="Chamando" portraitSrc={uncCallPortrait} />
          </PhoneFrame>
          <PhoneFrame caption="Chamada de vídeo">
            <StatusBar variant="call" />
            <CallScreen name="Bruno Reis" state="02:14" portraitSrc={uncCallPortrait} mode="video" speakerOn />
          </PhoneFrame>
        </UncDocStage>
      ))}
    </>
  ),
};

/**
 * Matriz de modalidades e estados dos controles.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="base" padding={20}>
      <InteractiveCall />
    </UncDocStage>
  ),
};
