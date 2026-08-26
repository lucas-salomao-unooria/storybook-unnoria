import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Button, uniIconNames } from '../../../src/unootube';
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

const meta: Meta<typeof Button> = {
  title: 'Unootube/Componentes/Button',
  component: Button,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: { control: 'select', options: [undefined, ...uniIconNames] },
    pressed: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    className: { control: 'text' },
  },
  args: { icon: 'liked', pressed: false, disabled: false, children: '1.7 K' },
};

export default meta;

type Story = StoryObj<typeof Button>;

const ButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Ação"
      title="Button"
      description="Reprodução do nó Action/Button (20:2758), o botão da barra de ações da tela de vídeo. É o único botão do arquivo sem preenchimento nem contorno: glifo de 24px em um alvo de 36×36, seguido do rótulo em Label/Large — a separação vem apenas do peso tipográfico."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Onde o botão aparece e por que ele é transparente."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="👍" title="Barra de ações do vídeo">
        O arquivo instancia cinco: curtir com contagem, não curtir com contagem, compartilhar,
        salvar e mais ações — este último sem rótulo. Todos com 8px de intervalo.
      </UniDocCard>
      <UniDocCard icon="👻" title="Sem preenchimento nem contorno">
        Diferente do <code>SubscribeButton</code>, que é sólido, este botão não tem superfície
        própria. A hierarquia vem do peso Bold do rótulo sobre o texto primário.
      </UniDocCard>
      <UniDocCard icon="🔢" title="Rótulo é contagem ou verbo">
        Nas duas primeiras instâncias o rótulo é um número (“1.7 K”, “632”); nas outras é um verbo
        em caixa alta (“SHARE”, “SAVE”). O componente aceita qualquer nó React.
      </UniDocCard>
      <UniDocCard icon="⭕" title="Variante somente ícone">
        A quinta instância do arquivo não tem quadro de rótulo. Omitir <code>children</code>{' '}
        reproduz esse caso, e o recuo do glifo passa a garantir o alvo de toque.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="20:2758"
      frameName="Action/Button"
      specs={[
        { label: 'Dimensões', value: '97 × 40 (com rótulo)' },
        { label: 'Quadro de ícone', value: '36 × 36 · recuo 6' },
        { label: 'Quadro de rótulo', value: 'recuo 10/6/10/0' },
        { label: 'Rótulo', value: 'Label/Large · #FFFFFF' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Estado pressionado',
          detail:
            'o arquivo é estático e mostra apenas o repouso. A prop pressed foi acrescentada com --uni-color-state-hover no fundo e aria-pressed no elemento, porque um botão de curtir sem estado não comunica se a ação já foi tomada.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'hover, foco e desabilitado não existem no arquivo. Foram construídos com --uni-color-state-hover e -active, anel de foco de 2px no vermelho semântico e 40% de opacidade no desabilitado.',
        },
        {
          subject: 'Glifo preenchido no estado pressionado',
          detail:
            'o arquivo publica os glifos liked e likedFill separadamente, mas não os relaciona ao botão de ação. Trocar o glifo ao pressionar é responsabilidade do consumidor, que informa o nome apropriado na prop icon.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Alvo',
          role: 'Linha de 40px de altura, transparente, com recuo vertical de 2px.',
          token: '--uni-icon-button-size',
        },
        {
          name: 'Quadro de ícone',
          role: 'Quadrado de 36px com recuo de 6px, resultando em glifo de 24px.',
          token: '--uni-spacing-6',
        },
        {
          name: 'Rótulo',
          role: 'Label/Large em texto primário, com recuo 10/6/10/0.',
          token: '--uni-font-label-lg-*',
        },
        {
          name: 'Realce',
          role: 'Fundo translúcido no hover e no estado pressionado.',
          token: '--uni-color-state-hover',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: as cinco ações da tela de vídeo" surface="primary" gap={8}>
      <Button icon="liked">1.7 K</Button>
      <Button icon="disliked">632</Button>
      <Button icon="share">SHARE</Button>
      <Button icon="save">SAVE</Button>
      <Button icon="more" aria-label="Mais ações" />
    </UniDocStage>
    <UniDocStage label="Estados" surface="primary" gap={8}>
      <Button icon="liked">Repouso</Button>
      <Button icon="likedFill" pressed>
        Pressionado
      </Button>
      <Button icon="liked" disabled>
        Desabilitado
      </Button>
    </UniDocStage>
    <UniDocStage label="Somente ícone e somente rótulo" surface="primary" gap={8}>
      <Button icon="more" aria-label="Mais ações" />
      <Button icon="dropdown" aria-label="Ordenar" />
      <Button>SORT BY</Button>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use este botão para ações secundárias que acompanham conteúdo, não para confirmar.',
        'Informe aria-label quando o botão for somente ícone.',
        'Troque o glifo por sua versão preenchida ao marcar pressed, como o arquivo faz na barra lateral.',
        'Mantenha o intervalo de 8px entre botões da mesma barra.',
      ]}
      donts={[
        'Não adicione preenchimento nem contorno: o arquivo publica o botão transparente.',
        'Não use este botão como chamada principal — o SubscribeButton é o único sólido do arquivo.',
        'Não substitua o rótulo Bold por regular: o peso é o que dá hierarquia ao botão.',
        'Não omita o rótulo acessível em um botão somente ícone.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O botão sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'surface']}>
      {() => (
        <>
          <Button icon="liked">1.7 K</Button>
          <Button icon="share">SHARE</Button>
          <Button icon="more" aria-label="Mais ações" />
        </>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="Button"
      rows={[
        {
          name: 'icon',
          type: 'UniIconName',
          description: 'Glifo exibido antes do rótulo, em um quadro de 36px.',
        },
        {
          name: 'pressed',
          type: 'boolean',
          default: 'false',
          description:
            'Marca o botão como acionado. Aplica o realce translúcido e define aria-pressed. Estado acrescentado pela biblioteca.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description:
            'Rótulo do botão. Quando omitido, o botão fica somente com o glifo e o recuo garante o alvo de toque.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
          description:
            'Demais atributos são repassados ao <button>, incluindo onClick, disabled e aria-label.',
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
  render: () => <ButtonDocumentationPage />,
};

/**
 * Playground com 100% das props do Button expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Button',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <Button {...args} />
    </div>
  ),
};

/**
 * Réplica visual da barra de ações do frame `Video` (19:1900).
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 8,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <Button icon="liked">1.7 K</Button>
      <Button icon="disliked">632</Button>
      <Button icon="share">SHARE</Button>
      <Button icon="save">SAVE</Button>
      <Button icon="more" aria-label="Mais ações" />
    </div>
  ),
};

/**
 * Com rótulo, somente ícone e somente rótulo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <Button icon="liked">Com rótulo</Button>
      <Button icon="more" aria-label="Somente ícone" />
      <Button>Somente rótulo</Button>
    </div>
  ),
};

/**
 * Estados interativos, todos acrescentados pela biblioteca.
 */
export const Estados: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 16,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <Button icon="liked">Repouso</Button>
      <Button icon="likedFill" pressed>
        Pressionado
      </Button>
      <Button icon="liked" disabled>
        Desabilitado
      </Button>
    </div>
  ),
};
