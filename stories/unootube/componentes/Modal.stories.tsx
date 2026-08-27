import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Button, Modal, SubscribeButton } from '../../../src/unootube';
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
  UniDocThemeSwitcher,
} from '../../../.storybook/components';

const meta: Meta<typeof Modal> = {
  title: 'Unootube/Componentes/Modal',
  component: Modal,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    withOverlay: { control: 'boolean' },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    closeLabel: { control: 'text' },
    theme: { control: 'radio', options: ['dark', 'light'] },
    className: { control: 'text' },
    onClose: { action: 'onClose' },
  },
  args: {
    open: true,
    title: 'Remover da playlist?',
    size: 'md',
    withOverlay: false,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    closeLabel: 'Fechar',
    theme: 'dark',
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

/** Corpo de demonstração reaproveitado pelos palcos. */
const demoBody = (
  <>
    <Modal.Body>
      O vídeo sai da playlist &ldquo;Assistir mais tarde&rdquo;. Isso não apaga o vídeo do canal
      nem cancela a inscrição.
    </Modal.Body>
    <Modal.Footer>
      <Button>Cancelar</Button>
      {/*
        * `SubscribeButton` é o único botão sólido que o arquivo publica — é ele
        * que dá peso à ação primária de um diálogo. O rótulo entra por `label`,
        * porque o componente não aceita `children`.
        */}
      <SubscribeButton label="Remover" />
    </Modal.Footer>
  </>
);

const ModalDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Extensões"
      title="Modal"
      description="Diálogo do Unootube. É uma EXTENSÃO DECLARADA: nenhum dos dois arquivos de origem publica camada modal. A forma foi derivada inteiramente de degraus que eles publicam — a superfície das barras de navegação e o degrau Elevation/High, que o próprio quadro de elevação descreve como “modal: diálogos e folhas”."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Por que este componente existe fora do arquivo, e de onde cada medida veio."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="📐" title="O arquivo previu o uso">
        O quadro <code>Elevation</code> (<code>106:3226</code>) descreve o degrau alto como
        &ldquo;modal: diálogos e folhas&rdquo;. O arquivo nomeou o uso — só não desenhou a tela.
        É esse degrau que o componente aplica.
      </UniDocCard>
      <UniDocCard icon="🎨" title="Um único valor novo">
        Superfície, raio, sombra e tipografia saem todos de degraus publicados. O único valor que
        não existia é o véu, tokenizado como <code>--uni-color-scrim</code>.
      </UniDocCard>
      <UniDocCard icon="🚫" title="Por que não usar o Modal da Plataforma">
        Ele existe e funciona — mas traz Open Sans e a paleta navy para dentro de uma tela Roboto e
        vermelha. Misturar as duas marcas numa mesma camada é visivelmente errado.
      </UniDocCard>
      <UniDocCard icon="⌨️" title="Acessível de verdade">
        <code>role=&quot;dialog&quot;</code> com <code>aria-modal</code>, fechamento por{' '}
        <code>ESC</code>, confinamento de foco com <code>Tab</code>/<code>Shift+Tab</code> e
        devolução do foco a quem abriu.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="A origem de cada medida e o registro completo de desvios."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="106:3214"
      frameName="Elevation (a única âncora publicada)"
      specs={[
        { label: 'Superfície', value: 'background/secondary' },
        { label: 'Sombra', value: 'Elevation/High · 0 8 16 rgba(0,0,0,0.2)' },
        { label: 'Raio', value: '--uni-radius-md (8px)' },
        { label: 'Larguras', value: '320 · 480 · 640' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'O componente inteiro é extensão',
          detail:
            'nem o "YouTube UI Clone Design" nem o "Free YouTube Shorts Mockups" publicam diálogo — as seis telas somadas não abrem nenhuma camada sobreposta. O componente foi acrescentado porque produto precisa de confirmação destrutiva e de formulário sobreposto.',
        },
        {
          subject: 'Véu sem origem no arquivo',
          detail:
            '--uni-color-scrim (preto a 60%) é o único valor novo do componente. Foi construído sobre a primitiva preta da própria escada, na mesma opacidade que os véus do reprodutor usam como parada mais escura.',
        },
        {
          subject: 'Glifo de fechar tipográfico',
          detail:
            'nenhum dos 52 glifos da biblioteca é um "fechar" — desenhar um violaria a regra de iconografia da seção 10.4. O padrão é o caractere ✕ na própria família Roboto, e a prop closeIcon existe para que um produto com família vetorial própria injete a sua.',
        },
        {
          subject: 'Raio de 8px',
          detail:
            'a coleção Radius do arquivo salta de 2px para 8px. O produto de referência usa 12px em diálogo, um degrau que a coleção não tem — foi preferido o degrau publicado a inventar um intermediário.',
        },
        {
          subject: 'Ponto de quebra em 520px',
          detail:
            'abaixo disso o diálogo ocupa a largura da janela e ancora na base. O arquivo não publica ponto de quebra porque não publica diálogo; sem isso, o degrau lg de 640px estouraria a viewport de um telefone.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Véu',
          role: 'Preto a 60% cobrindo a janela. Fecha o diálogo ao ser acionado.',
          token: '--uni-color-scrim',
        },
        {
          name: 'Superfície',
          role: 'A mesma das barras de navegação, com a sombra do degrau alto.',
          token: '--uni-color-background-secondary · --uni-elevation-high',
        },
        {
          name: 'Modal.Header',
          role: 'Título em Heading/H3 e botão de fechar opcional.',
          token: '--uni-font-heading-h3-*',
        },
        {
          name: 'Modal.Body',
          role: 'Texto corrente em Body/Medium, na tinta secundária.',
          token: '--uni-font-body-md-* · --uni-color-text-secondary',
        },
        {
          name: 'Modal.Footer',
          role: 'Faixa de ações alinhada à direita, com intervalo de 8px.',
          token: '--uni-spacing-8',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="As três larguras" surface="primary" direction="column" align="stretch" gap={24}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Modal key={size} size={size} title={`Largura ${size}`} withOverlay={false}>
          <Modal.Body>
            {size === 'sm' ? '320px' : size === 'md' ? '480px' : '640px'} — a superfície não
            escala o conteúdo, só o contêiner.
          </Modal.Body>
        </Modal>
      ))}
    </UniDocStage>
    <UniDocStage label="Com rodapé de ações" surface="primary" align="stretch">
      <Modal title="Remover da playlist?" withOverlay={false} onClose={() => undefined}>
        {demoBody}
      </Modal>
    </UniDocStage>
    <UniDocStage label="Sem cabeçalho automático — componha o seu" surface="primary" align="stretch">
      <Modal withOverlay={false}>
        <Modal.Header onClose={() => undefined}>Cabeçalho composto</Modal.Header>
        <Modal.Body>
          Omita a prop <code>title</code> quando o cabeçalho precisar de mais que um texto.
        </Modal.Body>
      </Modal>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use para confirmação destrutiva e formulário curto — o que exige decisão antes de continuar.',
        'Informe a prop theme quando o diálogo for renderizado fora da árvore da tela, via portal.',
        'Deixe o foco voltar sozinho: o componente devolve para quem abriu ao desmontar.',
        'Prefira Modal.Body e Modal.Footer a montar a estrutura à mão — é o que garante a calha.',
      ]}
      donts={[
        'Não use para avisar: aviso que não exige decisão é Snackbar, que não interrompe.',
        'Não empilhe diálogos. O confinamento de foco é de uma camada só.',
        'Não desative closeOnEscape sem oferecer outro caminho de saída visível.',
        'Não substitua pelo Modal da Plataforma Unooria dentro de telas Unootube: são marcas distintas.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="O diálogo nos dois temas medidos do segundo arquivo de origem."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher>
      {() => (
        <Modal title="Remover da playlist?" withOverlay={false} onClose={() => undefined}>
          {demoBody}
        </Modal>
      )}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="Modal"
      rows={[
        { name: 'open', type: 'boolean', default: 'true', description: 'Controla a visibilidade. Fechado, não renderiza nada.' },
        { name: 'onClose', type: '() => void', description: 'Chamado ao solicitar o fechamento: ESC, véu ou botão de fechar.' },
        { name: 'title', type: 'React.ReactNode', description: 'Monta o cabeçalho automaticamente. Omita para compor com Modal.Header.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Largura da superfície: 320, 480 ou 640 pixels.' },
        { name: 'withOverlay', type: 'boolean', default: 'true', description: 'Desenha o véu atrás do diálogo.' },
        { name: 'closeOnOverlayClick', type: 'boolean', default: 'true', description: 'Fecha ao acionar o véu.' },
        { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Fecha ao pressionar ESC.' },
        { name: 'closeLabel', type: 'string', default: "'Fechar'", description: 'Rótulo acessível do botão de fechar.' },
        { name: 'closeIcon', type: 'React.ReactNode', description: 'Glifo do botão de fechar. Padrão: o caractere tipográfico ✕.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema do nó raiz, para quando o diálogo é renderizado via portal.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos vão para a superfície do diálogo.' },
      ]}
    />
    <UniDocPropsTable
      title="Modal.Header · Modal.Body · Modal.Footer"
      rows={[
        { name: 'Header.onClose', type: '() => void', description: 'Chamado ao acionar o botão de fechar. Sem ele, o botão não é renderizado.' },
        { name: 'Header.closeLabel', type: 'string', default: "'Fechar'", description: 'Rótulo acessível do botão de fechar.' },
        { name: 'Header.closeIcon', type: 'React.ReactNode', description: 'Glifo do botão de fechar.' },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo de cada faixa.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos são repassados à faixa.' },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ModalDocumentationPage />,
};

/**
 * Playground com 100% das props do Modal expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Modal',
  render: (args) => (
    <div
      data-uni-theme={args.theme ?? 'dark'}
      style={{ padding: 40, background: 'var(--uni-color-background-primary)' }}
    >
      <Modal {...args}>{demoBody}</Modal>
    </div>
  ),
};

/**
 * O fluxo real: abrir, confinar o foco e devolvê-lo ao fechar.
 */
export const ComVeu: Story = {
  name: '🎬 Com véu, aberto por um botão',
  render: () => {
    const Demo = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <div
          data-uni-theme="dark"
          style={{
            padding: 40,
            minHeight: 320,
            background: 'var(--uni-color-background-primary)',
          }}
        >
          <Button onClick={() => setOpen(true)}>Remover da playlist</Button>
          <Modal
            open={open}
            title="Remover da playlist?"
            theme="dark"
            onClose={() => setOpen(false)}
          >
            <Modal.Body>
              O vídeo sai da playlist &ldquo;Assistir mais tarde&rdquo;. Isso não apaga o vídeo do
              canal nem cancela a inscrição.
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setOpen(false)}>Cancelar</Button>
              <SubscribeButton label="Remover" onClick={() => setOpen(false)} />
            </Modal.Footer>
          </Modal>
        </div>
      );
    };

    return <Demo />;
  },
};

/**
 * As três larguras publicadas pelo componente.
 */
export const Tamanhos: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Modal key={size} size={size} title={`Largura ${size}`} withOverlay={false}>
          <Modal.Body>
            {size === 'sm' ? '320px' : size === 'md' ? '480px' : '640px'}
          </Modal.Body>
        </Modal>
      ))}
    </div>
  ),
};
