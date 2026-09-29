import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toggle } from '../../../src/unooriaai/components/Toggle';
import { SettingsRow } from '../../../src/unooriaai/components';
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
 * Página de documentação rica do componente Toggle.
 */
const ToggleDocumentationPage = () => {
  const [ligado, setLigado] = React.useState(true);
  const [memoria, setMemoria] = React.useState(true);
  const [temporario, setTemporario] = React.useState(false);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="UnooriaAI"
        category="Componentes • Controles"
        title="Toggle"
        description="Interruptor de dois estados: trilho de 44 × 24 com raio 12 e botão circular de 20px com sombra. Desligado usa --uai-border-control como trilho; ligado usa --uai-interactive-primary. Exposto como role=switch com aria-checked, acionável por clique, Enter e Espaço."
      />

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="1. Visão Geral & Casos de Uso"
        description="Um interruptor binário de efeito imediato."
      />
      <UaiDocGrid>
        <UaiDocCard icon="⚙️" title="Preferências">
          O uso canônico: linhas de configuração onde a mudança vale na hora, sem botão de salvar —
          memória, conversas temporárias, notificações.
        </UaiDocCard>
        <UaiDocCard icon="🎚️" title="Estado, não ação">
          <code>role=&quot;switch&quot;</code> com <code>aria-checked</code> descreve um estado
          persistente. Para disparar uma ação use <code>Button</code>.
        </UaiDocCard>
        <UaiDocCard icon="⌨️" title="Teclado">
          Como é um <code>button</code> nativo, responde a <code>Enter</code> e{' '}
          <code>Espaço</code> sem código extra, e recebe anel de foco visível.
        </UaiDocCard>
        <UaiDocCard icon="🔗" title="Controlado">
          <code>checked</code> + <code>onCheckedChange</code>. O componente não guarda estado
          próprio, de modo que a fonte da verdade fica na aplicação.
        </UaiDocCard>
      </UaiDocGrid>

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="2. Especificações Técnicas"
        description="Medidas e decisões de identidade do módulo."
      />
      <UaiDocSpecs
        component="Toggle"
        layout="Interruptor · 44 × 24px"
        specs={[
          { label: 'Trilho', value: '44 × 24 · raio 12 (--uai-radius-lg)' },
          { label: 'Botão deslizante', value: '20 × 20 · raio total' },
          { label: 'Folga', value: '2px · --uai-spacing-1' },
          { label: 'Desligado', value: '--uai-border-control' },
          { label: 'Ligado', value: '--uai-interactive-primary' },
          { label: 'Sombra do botão', value: '--uai-elevation-knob (por tema)' },
        ]}
      />
      <UaiDocDecisions
        items={[
          {
            subject: 'Trilho desligado em border-control',
            detail:
              'o trilho desligado usa --uai-border-control (neutral-500 no claro, neutraldark-800 no escuro), que passa de 3:1 sobre a superfície nos dois temas; um cinza decorativo mais claro deixaria o controle quase invisível.',
          },
          {
            subject: 'Botão deslizante em text-inverse',
            detail:
              'o botão é branco no tema claro e roxo profundo (brandpurple-950) no escuro. Nos dois temas ele se destaca do trilho — desligado e ligado — com contraste acima de 3:1, o que um botão branco fixo não garantiria sobre o lilás claro do trilho ligado no escuro.',
          },
          {
            subject: 'Sombra por tema',
            detail:
              '--uai-elevation-knob é a sombra escura da marca no claro e um halo claro no escuro, onde uma sombra escura não se veria. É o único controle da biblioteca com sombra além das sobreposições.',
          },
          {
            subject: 'Animação de deslocamento',
            detail:
              'o botão desliza por transform em --uai-transition-fast; o estado é sempre lido de checked, sem estado interno.',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="3. Anatomia do Componente"
        description="Trilho, botão deslizante e a folga de 2px que define o curso."
      />
      <UaiDocAnatomy
        zones={[
          {
            name: 'Trilho',
            role: '44 × 24 com raio 12. A cor é a única diferença entre os dois estados.',
            token: '--uai-border-control · --uai-interactive-primary',
          },
          {
            name: 'Botão deslizante',
            role: 'Círculo de 20px posicionado com 2px de folga em cima e à esquerda; o curso é de 20px.',
            token: '--uai-text-inverse',
          },
          {
            name: 'Rótulo acessível',
            role: 'aria-label ou aria-labelledby: sem texto visível, o interruptor precisa de nome acessível.',
          },
          {
            name: 'Desabilitado',
            role: '40% de opacidade e cursor not-allowed, preservando a posição do botão.',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="4. Matriz de Estados"
        description="Os dois estados, mais foco e desabilitado."
      />
      <UaiDocStage label="Desligado e ligado">
        <div style={{ textAlign: 'center' }}>
          <Toggle aria-label="Desligado" />
          <div style={{ fontSize: 11, color: 'var(--uai-text-secondary)', marginTop: 8 }}>Desligado</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Toggle checked aria-label="Ligado" />
          <div style={{ fontSize: 11, color: 'var(--uai-text-secondary)', marginTop: 8 }}>Ligado</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Toggle disabled aria-label="Desabilitado desligado" />
          <div style={{ fontSize: 11, color: 'var(--uai-text-secondary)', marginTop: 8 }}>Desabilitado</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Toggle checked disabled aria-label="Desabilitado ligado" />
          <div style={{ fontSize: 11, color: 'var(--uai-text-secondary)', marginTop: 8 }}>Ligado desabilitado</div>
        </div>
      </UaiDocStage>
      <UaiDocStage label="Interativo — clique, Enter ou Espaço">
        <Toggle checked={ligado} onCheckedChange={setLigado} aria-label="Alternar demonstração" />
        <span style={{ fontSize: 13, color: 'var(--uai-text-secondary)' }}>aria-checked = {String(ligado)}</span>
      </UaiDocStage>
      <UaiDocStage label="Em contexto — linhas de configuração" direction="column" align="flex-start">
        <div style={{ width: 400 }}>
          <SettingsRow
            label="Memória"
            block
            value={
              <Toggle checked={memoria} onCheckedChange={setMemoria} aria-label="Alternar memória" />
            }
          />
          <SettingsRow
            label="Conversas temporárias"
            block
            value={
              <Toggle
                checked={temporario}
                onCheckedChange={setTemporario}
                aria-label="Alternar conversas temporárias"
              />
            }
          />
        </div>
      </UaiDocStage>

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="5. Boas Práticas"
        description="Regras de uso do interruptor."
      />
      <UaiDocPractices
        dos={[
          'Aplicar o efeito imediatamente ao alternar, sem exigir confirmação.',
          'Dar nome acessível por aria-label ou aria-labelledby apontando para o rótulo da linha.',
          'Usar o Toggle dentro de SettingsRow, que já reserva a coluna direita para controles.',
          'Manter o estado na aplicação e passá-lo por checked — o componente é controlado.',
        ]}
        donts={[
          'Usar o Toggle para disparar uma ação de efeito único.',
          'Deixar o interruptor sem rótulo acessível.',
          'Alterar a geometria do trilho ou do botão: as duas medidas foram definidas juntas.',
          'Fixar a cor do botão deslizante em branco: no tema escuro ele perderia o contraste com o trilho ligado.',
        ]}
      />

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="6. Suporte a Temas"
        description="O trilho desligado segue border-control e o ligado segue interactive-primary; o botão troca de tinta com o tema."
      />
      <UaiDocThemeSwitcher>
        {() => (
          <>
            <Toggle aria-label="Desligado" />
            <Toggle checked aria-label="Ligado" />
            <Toggle disabled aria-label="Desabilitado" />
          </>
        )}
      </UaiDocThemeSwitcher>

      <UnooriaDocSectionHeader
        barColor={BAR}
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente Toggle."
      />
      <UaiDocPropsTable
        title="Toggle"
        rows={[
          {
            name: 'checked',
            type: 'boolean',
            default: 'false',
            description: 'Estado do interruptor — true é ligado.',
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
  title: 'UnooriaAI/Componentes/Toggle',
  component: Toggle,
  parameters: { layout: 'padded' },
  argTypes: {
    checked: { control: 'boolean', description: 'Estado do interruptor.' },
    onCheckedChange: {
      action: 'onCheckedChange',
      description: 'Notifica o novo estado quando o interruptor é acionado.',
    },
    disabled: { control: 'boolean', description: 'Desabilita a interação.' },
    'aria-label': { control: 'text', description: 'Rótulo acessível.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    checked: false,
    disabled: false,
    'aria-label': 'Alternar preferência',
    theme: 'light',
    className: '',
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ToggleDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Toggle expostas. O estado é
 * controlado pelo painel de controles.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Toggle',
  render: (args) => (
    <div
      data-uai-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: 'var(--uai-bg-primary)',
        border: '1px solid var(--uai-border-default)',
      }}
    >
      <Toggle {...args} />
    </div>
  ),
};

/**
 * Os dois estados do interruptor.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UaiDocStage gap={16}>
      <Toggle aria-label="Desligado" />
      <Toggle checked aria-label="Ligado" />
    </UaiDocStage>
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
          <span style={{ fontSize: 13, color: 'var(--uai-text-secondary)' }}>aria-checked = {String(valor)}</span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <Toggle disabled aria-label="Desligado e desabilitado" />
          <Toggle checked disabled aria-label="Ligado e desabilitado" />
        </div>
      </div>
    );
  },
};
