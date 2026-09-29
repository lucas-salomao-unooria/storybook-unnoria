import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Composer } from '../../../src/unooriaai/components/Composer';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocCard,
  UaiDocGrid,
  UaiDocSpecs,
  UaiDocDecisions,
  UaiDocAnatomy,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';

const BAR = '#716C98';

/**
 * Fundo de demonstração da doca: um gradiente entre duas superfícies de marca
 * do módulo, para que o desfoque de fundo tenha o que desfocar.
 */
const dockBackdrop: React.CSSProperties = {
  width: '100%',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'linear-gradient(135deg, var(--uai-bg-brand) 0%, var(--uai-bg-tertiary) 100%)',
};

/**
 * Página de documentação rica do componente Composer.
 */
const ComposerDocumentationPage = () => {
  const [enviadas, setEnviadas] = React.useState<string[]>([]);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="UnooriaAI"
        category="Componentes • Conversa"
        title="Composer"
        description="Compositor translúcido de 760 × 56 com padding 16/20, raio 16 e contorno de 1px, que ancora a base do cliente web. A trilha interna tem quatro alvos com 8px de intervalo: voz, anexo, campo e envio."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="O compositor do cliente web, distinto do ChatInput."
        barColor={BAR}
      />
      <UaiDocGrid>
        <UaiDocCard icon="⌨️" title="Quatro alvos">
          Voz e anexo antes do campo, envio depois. O <code>ChatInput</code> da conversa padrão tem
          um só alvo, e é redondo.
        </UaiDocCard>
        <UaiDocCard icon="🫧" title="Translúcido">
          Superfície branca a 80% no claro e branca a 5% no escuro, com contorno de 1px em uma
          cor que passa de 3:1 sobre a tela nos dois temas.
        </UaiDocCard>
        <UaiDocCard icon="🌊" title="Composer.Dock">
          A faixa de 116px com véu translúcido e <code>backdrop-filter: blur(40px)</code>, para o
          compositor flutuar sobre o conteúdo da conversa.
        </UaiDocCard>
        <UaiDocCard icon="🧾" title="form">
          O elemento raiz é um <code>&lt;form&gt;</code>: <code>Enter</code> envia sem que seja
          preciso escutar tecla.
        </UaiDocCard>
      </UaiDocGrid>

      <UnooriaDocSectionHeader
        title="2. Especificações técnicas"
        description="Medidas e tokens consumidos pelo compositor e pela doca."
        barColor={BAR}
      />
      <UaiDocSpecs
        component="Composer"
        layout="Formulário · 760 × 56"
        specs={[
          { label: 'Medidas', value: '760 × 56' },
          { label: 'Padding', value: '16/20 · --uai-spacing-6 e --uai-spacing-7' },
          { label: 'Raio', value: '16px · --uai-radius-xl' },
          { label: 'Contorno', value: '1px · --uai-web-composer-border' },
          { label: 'Preenchimento', value: '--uai-web-composer-fill' },
          { label: 'Alvos', value: '24 × 24 · raio 12 · glifo de 20px' },
          { label: 'Doca', value: 'padding 20/0/40 · --uai-web-veil · blur 40' },
        ]}
      />
      <UaiDocDecisions
        items={[
          {
            subject: 'Composer ≠ ChatInput',
            detail:
              'O `Composer` (760 × 56, quatro alvos, contorno de 1px) é o compositor do cliente web; o `ChatInput` (600 × 48, um alvo redondo) é o da conversa padrão. Consolidá-los apagaria uma medida real do módulo.',
          },
          {
            subject: 'Contorno de 1px',
            detail:
              'O contorno é de 1px, e não de meio pixel: um traço de 0,5px some ou engrossa conforme a densidade da tela. `--uai-web-composer-border` mede 5,0:1 sobre a tela no claro e 8,6:1 no escuro (mínimo de 3:1 para limite de componente). O pixel do contorno é descontado do padding vertical, e a caixa continua com 56px.',
          },
          {
            subject: 'Alvos de 24px',
            detail:
              'Os alvos de voz, anexo e envio medem 24 × 24, menores que o `IconButton` (28px), porque a trilha do compositor é mais densa. O glifo é de 20px dentro da caixa, para que o traço visível do Material Symbols chegue a ~16px.',
          },
          {
            subject: 'Alvo de envio em repouso',
            detail:
              'Sem texto para enviar, o alvo de envio fica num tom mais suave (`--uai-text-soft-40`) e volta ao texto primário no hover e no foco.',
          },
          {
            subject: 'Estados e responsividade',
            detail:
              'Foco no compositor troca o contorno para `--uai-border-brand`; hover nos alvos usa `--uai-fill-8`; anel de foco de 2px; desabilitado a 40%. Abaixo de 800px o compositor ocupa toda a largura, porque os 760px fixos não cabem.',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Trilha de quatro alvos e uma doca opcional."
        barColor={BAR}
      />
      <UaiDocAnatomy
        zones={[
          { name: 'onVoice', role: 'O primeiro alvo, com o ícone microphone.' },
          { name: 'onAttach', role: 'O segundo alvo, com o ícone image.' },
          { name: 'Campo', role: 'Entrada de texto; controlada só quando o consumidor passa value.', token: '--uai-web-composer-placeholder' },
          { name: 'onSend', role: 'O alvo de envio, com paperPlaneRight. Recebe o texto atual do campo.' },
          { name: 'leadingActions', role: 'Substitui os dois alvos iniciais por nós arbitrários; hideLeadingActions remove ambos.' },
          { name: 'Composer.Dock', role: 'Faixa de 116px com véu e desfoque de fundo atrás do compositor.', token: '--uai-web-veil' },
        ]}
      />

      <UnooriaDocSectionHeader
        title="4. Matriz de Variantes, Tamanhos e Estados"
        description="Os estados do compositor e a doca com desfoque."
        barColor={BAR}
      />
      <UaiDocStage label="Padrão · desabilitado · sem alvos iniciais" direction="column">
        <Composer block onSend={(v) => setEnviadas((prev) => [...prev, v])} />
        <Composer block disabled />
        <Composer block hideLeadingActions />
      </UaiDocStage>
      <UaiDocStage label="Doca — véu translúcido com desfoque de fundo" direction="column">
        <div style={dockBackdrop}>
          <div style={{ height: 80 }} />
          <Composer.Dock>
            <Composer block />
          </Composer.Dock>
        </div>
      </UaiDocStage>
      {enviadas.length > 0 && (
        <UaiDocStage label="Mensagens enviadas nesta sessão" direction="column" align="flex-start">
          {enviadas.map((mensagem, index) => (
            <code key={`${mensagem}-${index}`} style={{ fontSize: 13 }}>
              {mensagem || '(vazio)'}
            </code>
          ))}
        </UaiDocStage>
      )}

      <UnooriaDocSectionHeader
        title="5. Boas Práticas"
        description="Regras de uso do compositor."
        barColor={BAR}
      />
      <UaiDocPractices
        dos={[
          'Envolver o compositor em Composer.Dock quando ele flutuar sobre o conteúdo.',
          'Usar onSend em vez de escutar Enter: o elemento raiz já é um formulário.',
          'Manter os quatro alvos na ordem voz, anexo, campo e envio.',
          'Passar value e onValueChange quando o texto for controlado por fora.',
        ]}
        donts={[
          'Substituir o compositor pelo ChatInput: são componentes com medidas e alvos diferentes.',
          'Afinar o contorno para menos de 1px: o limite do campo deixa de ser legível em telas de baixa densidade.',
          'Usar a doca sobre um fundo opaco — o desfoque de fundo não teria o que desfocar.',
          'Acrescentar um quinto alvo à trilha sem revisar a largura do campo.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a Temas"
        description="Preenchimento, contorno e placeholder têm um valor nomeado em cada tema."
        barColor={BAR}
      />
      <UaiDocThemeSwitcher direction="column">
        {() => (
          <>
            <Composer block />
            <div style={dockBackdrop}>
              <div style={{ height: 60 }} />
              <Composer.Dock>
                <Composer block />
              </Composer.Dock>
            </div>
          </>
        )}
      </UaiDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do Composer e da doca."
        barColor={BAR}
      />
      <UaiDocPropsTable
        title="Composer"
        rows={[
          { name: 'value', type: 'string', description: 'Texto do campo (uso controlado).' },
          {
            name: 'onValueChange',
            type: '(value: string) => void',
            description: 'Notifica cada alteração do texto.',
          },
          {
            name: 'placeholder',
            type: 'string',
            default: "'Escreva uma mensagem'",
            description: 'Texto do placeholder.',
          },
          {
            name: 'onSend',
            type: '(value: string) => void',
            description: 'Chamado ao enviar, com o texto atual do campo.',
          },
          { name: 'onVoice', type: '() => void', description: 'Aciona o alvo de entrada de voz.' },
          { name: 'onAttach', type: '() => void', description: 'Aciona o alvo de anexar imagem.' },
          {
            name: 'leadingActions',
            type: 'React.ReactNode',
            description: 'Substitui os dois alvos que antecedem o campo.',
          },
          {
            name: 'hideLeadingActions',
            type: 'boolean',
            default: 'false',
            description: 'Oculta os dois alvos que antecedem o campo.',
          },
          {
            name: 'voiceLabel / attachLabel / sendLabel',
            type: 'string',
            description: 'Rótulos acessíveis dos três alvos.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Desabilita o campo e todos os alvos.',
          },
          {
            name: 'readOnly',
            type: 'boolean',
            default: 'false',
            description: 'Torna o campo somente leitura.',
          },
          {
            name: 'block',
            type: 'boolean',
            default: 'false',
            description: 'Ocupa toda a largura em vez dos 760px do compositor.',
          },
          {
            name: 'theme',
            type: "'light' | 'dark'",
            description:
              'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
          },
          { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        ]}
      />
      <UaiDocPropsTable
        title="Composer.Dock"
        rows={[
          {
            name: 'children',
            type: 'React.ReactNode',
            description: 'Conteúdo da faixa — normalmente o próprio Composer.',
          },
          {
            name: 'theme',
            type: "'light' | 'dark'",
            description: 'Tema usado para resolver as variáveis de cor.',
          },
          { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Composer> = {
  title: 'UnooriaAI/Componentes/Composer',
  component: Composer,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: 'text', description: 'Texto do campo (uso controlado).' },
    placeholder: { control: 'text', description: 'Texto do placeholder.' },
    hideLeadingActions: { control: 'boolean', description: 'Oculta voz e anexo.' },
    voiceLabel: { control: 'text', description: 'Rótulo acessível do alvo de voz.' },
    attachLabel: { control: 'text', description: 'Rótulo acessível do alvo de anexo.' },
    sendLabel: { control: 'text', description: 'Rótulo acessível do alvo de envio.' },
    disabled: { control: 'boolean', description: 'Desabilita o campo e os alvos.' },
    readOnly: { control: 'boolean', description: 'Somente leitura.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    placeholder: 'Escreva uma mensagem',
    hideLeadingActions: false,
    voiceLabel: 'Entrada de voz',
    attachLabel: 'Anexar imagem',
    sendLabel: 'Enviar mensagem',
    disabled: false,
    readOnly: false,
    block: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Composer>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ComposerDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Composer expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Composer',
  render: (args) => (
    <UaiDocStage theme={args.theme ?? 'light'} padding={48}>
      <Composer {...args} />
    </UaiDocStage>
  ),
};

/**
 * Compositor ancorado na base da tela, com a doca desfocada.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UaiDocStage direction="column" padding={0} align="stretch" gap={0}>
      <div style={{ height: 160 }} />
      <Composer.Dock>
        <Composer />
      </Composer.Dock>
    </UaiDocStage>
  ),
};

/**
 * Compositor controlado, com a lista das mensagens enviadas.
 */
export const Estados: Story = {
  render: function CompositorControlado() {
    const [texto, setTexto] = React.useState('');
    const [historico, setHistorico] = React.useState<string[]>([]);

    return (
      <UaiDocStage direction="column" align="flex-start" width={800}>
        <Composer
          block
          value={texto}
          onValueChange={setTexto}
          onSend={(valor) => {
            if (!valor.trim()) return;
            setHistorico((prev) => [...prev, valor]);
            setTexto('');
          }}
        />
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            fontSize: 14,
            fontFamily: 'var(--uai-font-sans)',
            color: 'var(--uai-text-secondary)',
          }}
        >
          {historico.map((mensagem, index) => (
            <li key={`${mensagem}-${index}`}>{mensagem}</li>
          ))}
        </ul>
      </UaiDocStage>
    );
  },
};
