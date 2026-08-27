import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Composer } from '../../../src/chatgpt/components/Composer';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  GptDocCard,
  GptDocGrid,
  GptDocFigmaSpecs,
  GptDocPractices,
  GptDocPropsTable,
  GptDocStage,
  GptDocThemeSwitcher,
} from '../../../.storybook/components';
import { gptWebClientNodes } from '../fixtures';

/**
 * Página de documentação rica do componente Composer.
 */
const ComposerDocumentationPage = () => {
  const [enviadas, setEnviadas] = React.useState<string[]>([]);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="ChatGPT"
        category="Componentes • Conversa"
        title="Composer"
        description="Compositor translúcido de 760 × 56 com padding 16/20, raio 16 e contorno de 0,5px, medido nas duas versões do quadro New chat - V1 - A. A trilha interna tem quatro alvos com 8px de intervalo: voz, anexo, campo e envio."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="O compositor do cliente web, distinto do ChatInput."
        barColor="#5856D6"
      />
      <GptDocGrid>
        <GptDocCard icon="⌨️" title="Quatro alvos">
          Voz e anexo antes do campo, envio depois. O <code>ChatInput</code> da página{' '}
          <code>🟡 Design system</code> tem um só, e é redondo.
        </GptDocCard>
        <GptDocCard icon="🫧" title="Translúcido">
          Superfície a 80% no claro e a 4% no escuro, com contorno de <strong>0,5px</strong> —
          medida literal do arquivo, não um fio de 1px arredondado.
        </GptDocCard>
        <GptDocCard icon="🌊" title="Composer.Dock">
          A faixa de 116px com véu translúcido e <code>backdrop-filter: blur(40px)</code>, tradução
          do efeito <code>BACKGROUND_BLUR</code> declarado no nó.
        </GptDocCard>
        <GptDocCard icon="🧾" title="form">
          O elemento raiz é um <code>&lt;form&gt;</code>: <code>Enter</code> envia sem que seja
          preciso escutar tecla.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Medidas lidas da instância Input nas duas versões da tela."
        barColor="#5856D6"
      />
      <GptDocFigmaSpecs
        nodeId={gptWebClientNodes.composer}
        frameName="Input (Type=1 row, State=Default)"
        specs={[
          { label: 'Medidas', value: '760 × 56' },
          { label: 'Padding', value: '16/20 · spacing/6 e spacing/7' },
          { label: 'Raio', value: '16px · radius/xl' },
          { label: 'Contorno', value: '0,5px — preto a 20% / branco a 20%' },
          { label: 'Alvos', value: '24 × 24 · padding 4 · raio 12' },
          { label: 'Doca', value: 'padding 20/0/40 · véu 10% · blur 40' },
        ]}
        deviations={[
          'Os alvos de 24 × 24 com padding 4 e raio 12 são o `Button` (`Size=Small, Variant=Borderless`) da biblioteca de origem, e **não** o `IconButton` da página `🟡 Design system`, cujo menor degrau é 28px com raio 6. São réguas distintas.',
          'O arquivo pinta o avião de papel a 40% de opacidade — o alvo em repouso, sem texto para enviar. O vetor foi registrado sem opacidade e o valor virou responsabilidade do CSS, que devolve 100% no hover e no foco.',
          'O arquivo publica apenas `State=Default`. Foco, hover e desabilitado foram acrescentados com tokens da própria marca: anel de 2px em `border/brand` no contorno, `--gpt-fill-8` no realce dos alvos e 40% de opacidade no desabilitado.',
          'Abaixo de 800px o compositor passa a ocupar toda a largura. O arquivo publica apenas o quadro de 1440px, e os 760px fixos não cabem em uma janela estreita.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Trilha de quatro alvos e uma doca opcional."
        barColor="#5856D6"
      />
      <GptDocGrid min={260}>
        <GptDocCard icon="🎙️" title="onVoice">
          O primeiro alvo, com o ícone <code>microphone</code>.
        </GptDocCard>
        <GptDocCard icon="🖼️" title="onAttach">
          O segundo alvo, com o ícone <code>image</code>.
        </GptDocCard>
        <GptDocCard icon="✈️" title="onSend">
          O alvo de envio, com <code>paperPlaneRight</code>. Recebe o texto atual do campo.
        </GptDocCard>
        <GptDocCard icon="🧩" title="leadingActions">
          Substitui os dois alvos iniciais por nós arbitrários;{' '}
          <code>hideLeadingActions</code> remove ambos.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="4. Matriz de Estados"
        description="Os estados do compositor e a doca com desfoque."
        barColor="#5856D6"
      />
      <GptDocStage label="Padrão · desabilitado · sem alvos iniciais" direction="column">
        <Composer block onSend={(v) => setEnviadas((prev) => [...prev, v])} />
        <Composer block disabled />
        <Composer block hideLeadingActions />
      </GptDocStage>
      <GptDocStage label="Doca — véu translúcido com desfoque de fundo" direction="column">
        <div
          style={{
            width: '100%',
            borderRadius: 12,
            overflow: 'hidden',
            background:
              'linear-gradient(135deg, #5856D6 0%, #9F9FF8 40%, #FF32C6 100%)',
          }}
        >
          <div style={{ height: 80 }} />
          <Composer.Dock>
            <Composer block />
          </Composer.Dock>
        </div>
      </GptDocStage>
      {enviadas.length > 0 && (
        <GptDocStage label="Mensagens enviadas nesta sessão" direction="column" align="flex-start">
          {enviadas.map((mensagem, index) => (
            <code key={`${mensagem}-${index}`} style={{ fontSize: 13 }}>
              {mensagem || '(vazio)'}
            </code>
          ))}
        </GptDocStage>
      )}

      <UnooriaDocSectionHeader
        title="5. Boas Práticas"
        description="Regras de uso do compositor."
        barColor="#5856D6"
      />
      <GptDocPractices
        dos={[
          'Envolver o compositor em Composer.Dock quando ele flutuar sobre o conteúdo — é o que o arquivo faz.',
          'Usar onSend em vez de escutar Enter: o elemento raiz já é um formulário.',
          'Manter os quatro alvos na ordem publicada — voz, anexo, campo e envio.',
          'Passar value e onValueChange quando o texto for controlado por fora.',
        ]}
        donts={[
          'Substituir o compositor pelo ChatInput: são componentes de páginas diferentes do arquivo, com medidas e alvos diferentes.',
          'Arredondar o contorno de 0,5px para 1px.',
          'Usar a doca sobre um fundo opaco — o desfoque de fundo não teria o que desfocar.',
          'Acrescentar um quinto alvo à trilha sem revisar a largura de 720px do trilho interno.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a Temas"
        description="Preenchimento, contorno e placeholder têm um valor medido em cada tema."
        barColor="#5856D6"
      />
      <GptDocThemeSwitcher direction="column">
        {() => <Composer block />}
      </GptDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do Composer e da doca."
        barColor="#5856D6"
      />
      <GptDocPropsTable
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
            default: "'Type message'",
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
            description: 'Ocupa toda a largura em vez dos 760px do arquivo.',
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
      <GptDocPropsTable
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
  title: 'ChatGPT/Componentes/Composer',
  component: Composer,
  parameters: { layout: 'padded' },
  argTypes: {
    placeholder: { control: 'text', description: 'Texto do placeholder.' },
    hideLeadingActions: { control: 'boolean', description: 'Oculta voz e anexo.' },
    disabled: { control: 'boolean', description: 'Desabilita o campo e os alvos.' },
    readOnly: { control: 'boolean', description: 'Somente leitura.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    placeholder: 'Type message',
    hideLeadingActions: false,
    disabled: false,
    readOnly: false,
    block: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Composer>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#333333' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <Composer {...args} />
    </div>
  ),
};

/**
 * Réplica do compositor ancorado na base da tela, com a doca desfocada.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        width: '100%',
        maxWidth: 1158,
        borderRadius: 5,
        overflow: 'hidden',
        border: '1px solid #E4E8E9',
      }}
    >
      <div style={{ height: 160, backgroundColor: '#FFFFFF' }} />
      <Composer.Dock>
        <Composer />
      </Composer.Dock>
    </div>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760 }}>
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
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: '#475157' }}>
          {historico.map((mensagem, index) => (
            <li key={`${mensagem}-${index}`}>{mensagem}</li>
          ))}
        </ul>
      </div>
    );
  },
};
