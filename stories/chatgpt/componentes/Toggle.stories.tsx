import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../../../src/chatgpt/components/Toggle';
import { SettingsRow } from '../../../src/chatgpt/components';
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
import { gptFigmaNodes } from '../fixtures';

/**
 * Página de documentação rica do componente Toggle.
 */
const ToggleDocumentationPage = () => {
  const [ligado, setLigado] = React.useState(true);
  const [memoria, setMemoria] = React.useState(true);
  const [temporario, setTemporario] = React.useState(false);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="ChatGPT"
        category="Componentes • Controles"
        title="Toggle"
        description="Réplica do conjunto Toggle da página 🟡 Design system: trilho de 44 × 24 com raio 12 e knob circular de 20px em branco com sombra local. O estado Off usa border/default como trilho; On usa interactive/primary. Exposto como role=switch com aria-checked, acionável por clique, Enter e Espaço."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Um interruptor binário de efeito imediato."
        barColor="#5856D6"
      />
      <GptDocGrid>
        <GptDocCard icon="⚙️" title="Preferências">
          O uso canônico: linhas de configuração onde a mudança vale na hora, sem botão de salvar —
          memória, chats temporários, notificações.
        </GptDocCard>
        <GptDocCard icon="🎚️" title="Estado, não ação">
          <code>role="switch"</code> com <code>aria-checked</code> descreve um estado persistente.
          Para disparar uma ação use <code>Button</code>.
        </GptDocCard>
        <GptDocCard icon="⌨️" title="Teclado">
          Como é um <code>button</code> nativo, responde a <code>Enter</code> e{' '}
          <code>Espaço</code> sem código extra, e recebe anel de foco visível.
        </GptDocCard>
        <GptDocCard icon="🔗" title="Controlado">
          <code>checked</code> + <code>onCheckedChange</code>. O componente não guarda estado
          próprio, de modo que a fonte da verdade fica na aplicação.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Medidas lidas do conjunto de variantes via Plugin API."
        barColor="#5856D6"
      />
      <GptDocFigmaSpecs
        nodeId={gptFigmaNodes.toggle}
        frameName="Toggle (State · 2 variantes)"
        specs={[
          { label: 'Trilho', value: '44 × 24 · raio 12 (radius/lg)' },
          { label: 'Knob', value: '20 × 20 · raio total' },
          { label: 'Folga', value: '2px · spacing/1' },
          { label: 'Off', value: '#E0E0E0 · border/default' },
          { label: 'On', value: '#5856D6 · interactive/primary' },
          { label: 'Sombra do knob', value: '0 1 3 · preto 15%' },
        ]}
        deviations={[
          'A sombra do knob é um efeito local, sem estilo de efeito publicado. Foi tokenizada como --gpt-elevation-knob para evitar hexadecimal avulso no CSS.',
          'O knob permanece branco puro (#FFFFFF) nos dois temas, como no arquivo — não é var(--gpt-bg-primary), que no Dark seria #1C1C1C e sumiria contra o trilho.',
          'O deslocamento do knob é feito por transform, o que produz a transição animada que o arquivo estático não descreve.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Trilho, knob e a folga de 2px que define o curso."
        barColor="#5856D6"
      />
      <GptDocGrid min={260}>
        <GptDocCard icon="▭" title="Trilho">
          44 × 24 com raio 12. A cor é a única diferença entre as duas variantes publicadas.
        </GptDocCard>
        <GptDocCard icon="⚪" title="Knob">
          Círculo de 20px posicionado com 2px de folga em cima e à esquerda; o curso é de 20px.
        </GptDocCard>
        <GptDocCard icon="♿" title="Rótulo">
          <code>aria-label</code> ou <code>aria-labelledby</code>: sem texto visível, o interruptor
          precisa de nome acessível.
        </GptDocCard>
        <GptDocCard icon="🚫" title="Desabilitado">
          40% de opacidade e cursor <code>not-allowed</code>, preservando a posição do knob.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="4. Matriz de Estados"
        description="As duas variantes publicadas, mais foco e desabilitado."
        barColor="#5856D6"
      />
      <GptDocStage label="State=Off e State=On">
        <div style={{ textAlign: 'center' }}>
          <Toggle aria-label="Desligado" />
          <div style={{ fontSize: 11, color: '#475157', marginTop: 8 }}>Off</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Toggle checked aria-label="Ligado" />
          <div style={{ fontSize: 11, color: '#475157', marginTop: 8 }}>On</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Toggle disabled aria-label="Desabilitado desligado" />
          <div style={{ fontSize: 11, color: '#475157', marginTop: 8 }}>Off desabilitado</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Toggle checked disabled aria-label="Desabilitado ligado" />
          <div style={{ fontSize: 11, color: '#475157', marginTop: 8 }}>On desabilitado</div>
        </div>
      </GptDocStage>
      <GptDocStage label="Interativo — clique, Enter ou Espaço">
        <Toggle checked={ligado} onCheckedChange={setLigado} aria-label="Alternar demonstração" />
        <span style={{ fontSize: 13, color: '#475157' }}>
          aria-checked = {String(ligado)}
        </span>
      </GptDocStage>
      <GptDocStage label="Em contexto — linhas de configuração" direction="column" align="flex-start">
        <div style={{ width: 400 }}>
          <SettingsRow
            label="Memória"
            block
            value={
              <Toggle checked={memoria} onCheckedChange={setMemoria} aria-label="Alternar memória" />
            }
          />
          <SettingsRow
            label="Chats temporários"
            block
            value={
              <Toggle
                checked={temporario}
                onCheckedChange={setTemporario}
                aria-label="Alternar chats temporários"
              />
            }
          />
        </div>
      </GptDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas Práticas"
        description="Regras de uso do interruptor."
        barColor="#5856D6"
      />
      <GptDocPractices
        dos={[
          'Aplicar o efeito imediatamente ao alternar, sem exigir confirmação.',
          'Dar nome acessível por aria-label ou aria-labelledby apontando para o rótulo da linha.',
          'Usar o Toggle dentro de SettingsRow, que já reserva a coluna direita para controles.',
          'Manter o estado na aplicação e passá-lo por checked — o componente é controlado.',
        ]}
        donts={[
          'Usar o Toggle para disparar uma ação de efeito único.',
          'Deixar o interruptor sem rótulo acessível.',
          'Alterar a geometria do trilho ou do knob: as duas medidas foram publicadas juntas.',
          'Trocar o knob branco por bg/primary, o que o faria desaparecer no modo Dark.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a Temas"
        description="O trilho Off segue border/default e o On segue interactive/primary; o knob é invariante."
        barColor="#5856D6"
      />
      <GptDocThemeSwitcher>
        {() => (
          <>
            <Toggle aria-label="Desligado" />
            <Toggle checked aria-label="Ligado" />
            <Toggle disabled aria-label="Desabilitado" />
          </>
        )}
      </GptDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente Toggle."
        barColor="#5856D6"
      />
      <GptDocPropsTable
        title="Toggle"
        rows={[
          {
            name: 'checked',
            type: 'boolean',
            default: 'false',
            description: 'Estado do interruptor — true corresponde à variante State=On.',
          },
          {
            name: 'onCheckedChange',
            type: '(checked: boolean) => void',
            description: 'Notifica o novo estado quando o interruptor é acionado.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Desabilita a interação e aplica 40% de opacidade.',
          },
          {
            name: 'aria-label',
            type: 'string',
            description: 'Rótulo acessível — obrigatório quando não há aria-labelledby.',
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
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Toggle> = {
  title: 'ChatGPT/Componentes/Toggle',
  component: Toggle,
  parameters: { layout: 'padded' },
  argTypes: {
    checked: { control: 'boolean', description: 'Estado do interruptor.' },
    disabled: { control: 'boolean', description: 'Desabilita a interação.' },
    'aria-label': { control: 'text', description: 'Rótulo acessível.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: { checked: false, disabled: false, 'aria-label': 'Alternar preferência', theme: 'light' },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ToggleDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Toggle expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Toggle',
  render: (args) => (
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <Toggle {...args} />
    </div>
  ),
};

/**
 * Réplica visual do conjunto de variantes publicado no Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 16,
        padding: 16,
        border: '1px solid #E4E8E9',
        borderRadius: 5,
      }}
    >
      <Toggle aria-label="Off" />
      <Toggle checked aria-label="On" />
    </div>
  ),
};

/**
 * Estados interativos, incluindo desabilitado.
 */
export const Estados: Story = {
  render: function EstadosInterativos() {
    const [valor, setValor] = React.useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Toggle checked={valor} onCheckedChange={setValor} aria-label="Interativo" />
          <span style={{ fontSize: 13, color: '#475157' }}>aria-checked = {String(valor)}</span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <Toggle disabled aria-label="Off desabilitado" />
          <Toggle checked disabled aria-label="On desabilitado" />
        </div>
      </div>
    );
  },
};
