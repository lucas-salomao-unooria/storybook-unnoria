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
import { Radio } from '../../../src/unoochat';

const BAR = '#716C98';
const OPTIONS = ['8 horas', '1 semana', 'Sempre'];

/**
 * Grupo de opções controlado, como no diálogo de silenciar notificações.
 */
const RadioGroup: React.FC<{ name?: string }> = ({ name = 'unc-silenciar' }) => {
  const [selected, setSelected] = useState('Sempre');

  return (
    <div role="radiogroup" aria-label="Silenciar notificações por" style={{ display: 'grid' }}>
      {OPTIONS.map((option) => (
        <Radio
          key={option}
          name={name}
          label={option}
          value={option}
          checked={selected === option}
          onChange={() => setSelected(option)}
        />
      ))}
    </div>
  );
};

/**
 * Página de documentação rica do componente Radio.
 */
const RadioDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Controles"
      title="Radio"
      description="Botão de opção do diálogo modal. O controle de 20px é desenhado em CSS: contorno de 2px em --unc-color-border-control quando desmarcado e, marcado, contorno e ponto de 10px em --unc-color-accent. O rótulo usa Open Sans 16px em --unc-color-text-primary, com passo vertical de 44px."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🔘" title="Seleção exclusiva">
        Serve a grupos de opções mutuamente exclusivas, como o diálogo “Silenciar notificações por…”
        e as opções da enquete da conversa.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Desenhado em CSS">
        O quadro de ícones da Plataforma Unooria não publica <code>radio_button_checked</code> nem{' '}
        <code>radio_button_unchecked</code>. Em vez de trazer outra biblioteca ou desenhar um vetor
        à mão, o controle é um círculo de CSS com os mesmos tokens de contorno e acento do resto do
        módulo.
      </UncDocCard>
      <UncDocCard icon="📏" title="Passo de 44px">
        A altura mínima de 44px por opção garante o alvo de toque confortável e o passo vertical
        entre opções.
      </UncDocCard>
      <UncDocCard icon="♿" title="Input nativo oculto">
        O controle é um <code>input[type=radio]</code> visualmente oculto, preservando teclado,
        agrupamento por <code>name</code> e leitores de tela.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="Radio"
      layout="Linha · 44px de altura mínima"
      specs={[
        { label: 'Diâmetro', value: '20px' },
        { label: 'Marcado', value: 'contorno 2px + ponto 10px · #716C98 · #AAA5C2' },
        { label: 'Desmarcado', value: 'contorno 2px · #617379 · #A7B5B9' },
        { label: 'Recuo do rótulo', value: '21px' },
        { label: 'Rótulo', value: 'Open Sans 400 · 16px · --unc-color-text-primary' },
        { label: 'Passo vertical', value: '44px' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Controle desenhado em CSS',
          detail:
            'o quadro de ícones da Plataforma Unooria não publica radio_button_*. O círculo é CSS puro: contorno de 2px em --unc-color-border-control, e, marcado, contorno em --unc-color-accent com ponto de 10px da mesma cor. Nenhum glifo foi desenhado nem importado de outra biblioteca.',
        },
        {
          subject: 'Contraste do contorno',
          detail:
            '--unc-color-border-control mede 4,96:1 sobre o diálogo no tema claro e 5,39:1 no escuro; o acento mede 4,88:1 e 4,80:1. Ambos passam dos 3:1 exigidos para componentes de interface.',
        },
        {
          subject: 'Desmarcado sem preenchimento',
          detail:
            'o interior do círculo é transparente, e não uma cor de superfície fixa: o controle continua coerente sobre o diálogo, a folha ou o balão em que aparecer.',
        },
        {
          subject: 'Desabilitado a 50% de opacidade',
          detail:
            'o estado desabilitado reduz a linha inteira (controle e rótulo) a 50% e troca o cursor para not-allowed.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Input', role: 'Controle nativo visualmente oculto.', token: 'unc-radio__input' },
        {
          name: 'Círculo',
          role: 'Anel de 20px com ponto de 10px quando marcado, desenhado em CSS.',
          token: '--unc-color-border-control · --unc-color-accent',
        },
        {
          name: 'Rótulo',
          role: 'Texto da opção, recuado 21px do controle.',
          token: '--unc-font-body-lg-size · --unc-color-text-primary',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de estados e grupo interativo"
      description="Os quatro estados, e o agrupamento do diálogo de silenciar notificações."
    />
    <UncDocStage surface="dialog" direction="column" align="flex-start" gap={0} padding={24}>
      <Radio name="unc-demo-a" label="Não selecionado" checked={false} readOnly />
      <Radio name="unc-demo-b" label="Selecionado" checked readOnly />
      <Radio name="unc-demo-c" label="Desabilitado" checked={false} disabled />
      <Radio name="unc-demo-d" label="Selecionado e desabilitado" checked disabled />
    </UncDocStage>
    <UncDocStage surface="dialog" align="flex-start" padding={24}>
      <RadioGroup name="unc-doc-grupo" />
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Agrupar as opções com o mesmo atributo name e um role="radiogroup" com rótulo.',
        'Manter uma opção selecionada por padrão quando houver uma escolha razoável.',
        'Usar rótulos curtos, de uma ou duas palavras.',
        'Deixar o rótulo clicável envolvendo o input, como o componente já faz.',
      ]}
      donts={[
        'Usar o Radio para seleção múltipla: nesse caso use o Checkbox.',
        'Redesenhar o círculo com outros tokens de cor ou com um glifo de outra biblioteca.',
        'Reduzir o passo vertical abaixo de 44px.',
        'Omitir o atributo name: sem ele o teclado não navega o grupo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: contorno, ponto e rótulo trocam de valor; o desenho em CSS não depende de imagem."
    />
    <UncDocThemeSwitcher surface="dialog">
      {() => (
        <div style={{ display: 'grid' }}>
          <Radio name="unc-tema-1" label="Selecionado" checked readOnly />
          <Radio name="unc-tema-2" label="Não selecionado" checked={false} readOnly />
          <Radio name="unc-tema-3" label="Desabilitado" checked={false} disabled />
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="Radio"
      rows={[
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Rótulo exibido ao lado do controle. Obrigatório.',
        },
        { name: 'checked', type: 'boolean', description: 'Indica se a opção está selecionada.' },
        { name: 'name', type: 'string', description: 'Agrupa opções mutuamente exclusivas.' },
        { name: 'value', type: 'string', description: 'Valor submetido pelo controle nativo.' },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Desabilita o controle, aplicando opacidade 0,5.',
        },
        { name: 'onChange', type: '(event) => void', description: 'Callback de seleção.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Radio> = {
  title: 'Unoochat/Componentes/Radio',
  component: Radio,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo exibido.' },
    checked: { control: 'boolean', description: 'Opção selecionada.' },
    disabled: { control: 'boolean', description: 'Desabilita o controle.' },
    name: { control: 'text', description: 'Agrupa opções mutuamente exclusivas.' },
    value: { control: 'text', description: 'Valor submetido pelo controle nativo.' },
    onChange: { action: 'onChange', description: 'Callback de seleção.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: { label: 'Sempre', checked: true, disabled: false, name: 'unc-playground', value: 'sempre' },
};

export default meta;

type Story = StoryObj<typeof Radio>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <RadioDocumentationPage />,
};

/**
 * Playground com 100% das props do Radio expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Radio',
  render: (args) => (
    <UncDocStage surface="dialog" padding={32}>
      <Radio {...args} readOnly />
    </UncDocStage>
  ),
};

/**
 * Agrupamento do diálogo "Silenciar notificações por…".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UncDocStage surface="dialog" align="flex-start" padding={24}>
      <RadioGroup />
    </UncDocStage>
  ),
};

/**
 * Matriz completa de estados.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="dialog" direction="column" align="flex-start" gap={0} padding={24}>
      <Radio name="unc-e-1" label="Não selecionado" checked={false} readOnly />
      <Radio name="unc-e-2" label="Selecionado" checked readOnly />
      <Radio name="unc-e-3" label="Desabilitado" checked={false} disabled />
      <Radio name="unc-e-4" label="Selecionado e desabilitado" checked disabled />
    </UncDocStage>
  ),
};
