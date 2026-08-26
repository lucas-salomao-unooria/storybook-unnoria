import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';

import { SearchBox } from '../../../src/unootube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocAnatomy,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocSurfaceSwitcher,
} from '../../../.storybook/components';

const meta: Meta<typeof SearchBox> = {
  title: 'Unootube/Componentes/SearchBox',
  component: SearchBox,
  parameters: { layout: 'padded' },
  argTypes: {
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
    showVoiceSearch: { control: 'boolean' },
    fieldLabel: { control: 'text' },
    className: { control: 'text' },
    onSearch: { action: 'onSearch' },
    onVoiceSearch: { action: 'onVoiceSearch' },
    onValueChange: { action: 'onValueChange' },
  },
  args: {
    placeholder: 'Search',
    defaultValue: '',
    showVoiceSearch: true,
    fieldLabel: 'Buscar',
  },
};

export default meta;

type Story = StoryObj<typeof SearchBox>;

const SearchBoxDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Navegação"
      title="SearchBox"
      description="Reprodução do nó Navigation/SearchBox (7:49), 470×40 no total. Três detalhes do arquivo são literais e fáceis de perder: o campo tem contorno em apenas três arestas, o raio é assimétrico nos dois lados da emenda, e o botão de microfone é preto puro — mais escuro que qualquer superfície da escada semântica."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="A anatomia da cápsula de busca."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="✂️" title="Contorno em três arestas">
        O campo declara fio no topo, na base e à esquerda. A direita fica aberta porque o botão de
        lupa encosta nela — desenhar as quatro arestas produziria um fio duplo na emenda.
      </UniDocCard>
      <UniDocCard icon="🔲" title="Raio assimétrico">
        O campo usa <code>2/0/0/2</code> e o botão <code>0/2/2/0</code>. Juntos formam um retângulo
        de cantos suaves nas extremidades e retos na emenda.
      </UniDocCard>
      <UniDocCard icon="⚫" title="Microfone em preto puro">
        O círculo de busca por voz usa <code>#000000</code>, e não a superfície de campo{' '}
        <code>#121212</code>. É o único elemento preto puro da barra superior.
      </UniDocCard>
      <UniDocCard icon="📏" title="470px de largura total">
        362px de campo, 64px de botão, 4px de folga e 40px de microfone. A caixa fica centrada no
        quadro de 1440px, e não no espaço remanescente entre marca e perfil.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="7:49"
      frameName="Navigation/SearchBox"
      specs={[
        { label: 'Dimensões', value: '470 × 40' },
        { label: 'Campo', value: '362px · #121212' },
        { label: 'Botão de lupa', value: '64px · #303030' },
        { label: 'Microfone', value: '40px · #000000 · raio total' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Campo funcional',
          detail:
            'o arquivo publica apenas o texto de espera “Search” em uma camada de texto. O componente entrega um <input> real dentro de um <form role="search">, com modo controlado e não controlado — sem isso a busca não teria função.',
        },
        {
          subject: 'Estado de foco',
          detail:
            'o arquivo não descreve foco. O fio do campo passa a --uni-color-border-active quando há foco dentro dele, e os dois botões recebem anel de 2px no vermelho semântico.',
        },
        {
          subject: 'Realce dos botões',
          detail:
            'o hover dos botões usa um gradiente translúcido sobreposto ao preenchimento, em vez de trocar a cor de fundo — assim o preto puro do microfone e o cinza da lupa preservam seus valores literais sob o realce.',
        },
        {
          subject: 'Recolhimento em janelas estreitas',
          detail:
            'o arquivo publica apenas o quadro de 1440px. Abaixo de 800px a TopBar oculta a caixa de busca, para que a barra não quebre em duas linhas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Campo',
          role: 'Superfície de 362px com contorno em três arestas e raio à esquerda.',
          token: '--uni-color-background-field · --uni-radius-sm',
        },
        {
          name: 'Texto de espera',
          role: 'Body/Large em texto secundário.',
          token: '--uni-font-body-lg-* · --uni-color-text-secondary',
        },
        {
          name: 'Botão de lupa',
          role: 'Alvo de 64px na superfície interativa, com raio à direita.',
          token: '--uni-color-background-surface',
        },
        {
          name: 'Microfone',
          role: 'Círculo de 40px em preto puro, separado por 4px do conjunto.',
          token: '--uni-color-background-inverse-deep · --uni-radius-full',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo" surface="secondary" align="stretch">
      <SearchBox />
    </UniDocStage>
    <UniDocStage label="Com valor digitado" surface="secondary" align="stretch">
      <SearchBox defaultValue="design system" />
    </UniDocStage>
    <UniDocStage label="Sem busca por voz" surface="secondary" align="stretch">
      <SearchBox showVoiceSearch={false} />
    </UniDocStage>
    <UniDocStage label="Texto de espera localizado" surface="secondary" align="stretch">
      <SearchBox placeholder="Pesquisar" fieldLabel="Pesquisar no Unootube" />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Deixe o formulário enviar por Enter: o componente já trata onSubmit.',
        'Informe fieldLabel para que o campo tenha rótulo acessível sem <label> visível.',
        'Use o modo controlado (value + onValueChange) quando houver sugestões de busca.',
        'Oculte a busca por voz quando o produto não tiver a funcionalidade, em vez de deixar um botão inerte.',
      ]}
      donts={[
        'Não desenhe o contorno nas quatro arestas do campo: produz fio duplo na emenda.',
        'Não troque o preto puro do microfone pela superfície de campo.',
        'Não arredonde a emenda entre campo e botão — o raio assimétrico é literal.',
        'Não remova o role="search" do formulário.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="A caixa de busca sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['secondary', 'primary', 'deep']}>
      {() => <SearchBox />}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="SearchBox"
      rows={[
        {
          name: 'placeholder',
          type: 'string',
          default: "'Search'",
          description: 'Texto de espera do campo, literal do arquivo.',
        },
        {
          name: 'value',
          type: 'string',
          description:
            'Valor do campo. Informe junto de onValueChange para operar de forma controlada.',
        },
        {
          name: 'defaultValue',
          type: 'string',
          default: "''",
          description: 'Valor inicial no modo não controlado.',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Chamado a cada digitação, com o novo valor do campo.',
        },
        {
          name: 'onSearch',
          type: '(value: string) => void',
          description: 'Chamado quando a busca é enviada, pelo botão de lupa ou por Enter.',
        },
        {
          name: 'onVoiceSearch',
          type: '() => void',
          description: 'Chamado ao acionar o botão circular de microfone.',
        },
        {
          name: 'showVoiceSearch',
          type: 'boolean',
          default: 'true',
          description: 'Exibe o botão circular de busca por voz.',
        },
        {
          name: 'fieldLabel',
          type: 'string',
          default: "'Buscar'",
          description: 'Rótulo acessível do campo e do botão de envio.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: 'React.FormHTMLAttributes<HTMLFormElement>',
          description: 'Demais atributos são repassados ao <form>, exceto onSubmit.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SearchBoxDocumentationPage />,
};

/**
 * Playground com 100% das props do SearchBox expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SearchBox',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
        background: 'var(--uni-color-background-secondary)',
      }}
    >
      <SearchBox {...args} />
    </div>
  ),
};

/**
 * Réplica visual do nó `Navigation/SearchBox` (7:49), 470×40.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-secondary)' }}
    >
      <SearchBox />
    </div>
  ),
};

/**
 * Modo controlado, com o valor refletido abaixo do campo.
 */
export const Controlado: Story = {
  name: 'Modo controlado',
  render: () => {
    const ControlledDemo = () => {
      const [value, setValue] = useState('unootube');
      const [submitted, setSubmitted] = useState<string | null>(null);

      return (
        <div
          data-uni-theme="dark"
          style={{
            padding: 32,
            background: 'var(--uni-color-background-secondary)',
            fontFamily: 'var(--uni-font-sans)',
          }}
        >
          <SearchBox value={value} onValueChange={setValue} onSearch={setSubmitted} />
          <p style={{ color: 'var(--uni-color-text-secondary)', fontSize: 13, marginTop: 16 }}>
            Valor atual: <strong style={{ color: 'var(--uni-color-text-primary)' }}>{value}</strong>
          </p>
          <p style={{ color: 'var(--uni-color-text-secondary)', fontSize: 13 }}>
            Última busca enviada:{' '}
            <strong style={{ color: 'var(--uni-color-text-primary)' }}>{submitted ?? '—'}</strong>
          </p>
        </div>
      );
    };
    return <ControlledDemo />;
  },
};

/**
 * Com e sem o botão de busca por voz.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 32,
        background: 'var(--uni-color-background-secondary)',
      }}
    >
      <SearchBox />
      <SearchBox defaultValue="design system" />
      <SearchBox showVoiceSearch={false} />
    </div>
  ),
};
