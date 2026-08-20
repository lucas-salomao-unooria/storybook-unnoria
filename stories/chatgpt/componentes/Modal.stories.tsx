import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../../../src/chatgpt/components/Modal';
import { Button, Divider, Input, SettingsRow, Toggle } from '../../../src/chatgpt/components';
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
 * Página de documentação rica do componente Modal.
 */
const ModalDocumentationPage = () => {
  const [aberto, setAberto] = React.useState(false);
  const [compartilhar, setCompartilhar] = React.useState(true);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="ChatGPT"
        category="Componentes • Superfícies"
        title="Modal"
        description="Réplica do componente Modal da página 🟡 Design system: superfície de 480px com padding 24, gap 16, raio 16 e a sombra local 0 8 32 -4 · preto 15%. O cabeçalho traz o título em Heading/H3 e o glifo ✕ a 50% de opacidade; o corpo usa Body/SM a 70%. Acessibilidade completa: role=dialog com aria-modal, fechamento por ESC, confinamento de foco com Tab e devolução do foco ao elemento de origem."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="A única superfície da biblioteca que sai do fluxo da página."
        barColor="#5856D6"
      />
      <GptDocGrid>
        <GptDocCard icon="🪟" title="Diálogo">
          Confirmação de ação destrutiva, compartilhamento de conversa, edição de instruções de um
          GPT — o que exige atenção exclusiva.
        </GptDocCard>
        <GptDocCard icon="🧩" title="Composição">
          <code>Modal.Header</code>, <code>Modal.Body</code> e <code>Modal.Footer</code>. Passar a
          prop <code>title</code> monta o cabeçalho padrão sem composição manual.
        </GptDocCard>
        <GptDocCard icon="♿" title="Acessibilidade">
          <code>role="dialog"</code> com <code>aria-modal</code>, foco inicial no primeiro elemento
          focável, <code>Tab</code>/<code>Shift+Tab</code> circulando dentro do diálogo e{' '}
          <code>ESC</code> fechando.
        </GptDocCard>
        <GptDocCard icon="🫥" title="Scrim">
          <code>Overlay/Black 40%</code> — o único overlay publicado que um componente da biblioteca
          aplica. Pode ser desligado com <code>withOverlay={'{false}'}</code>.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Medidas lidas do componente via Plugin API."
        barColor="#5856D6"
      />
      <GptDocFigmaSpecs
        nodeId={gptFigmaNodes.modal}
        frameName="Modal (componente único)"
        specs={[
          { label: 'Dimensões', value: '480 × 300' },
          { label: 'Padding', value: '24px · spacing/8' },
          { label: 'Gap', value: '16px · spacing/6' },
          { label: 'Raio', value: '16px · radius/xl' },
          { label: 'Sombra', value: '0 8 32 -4 · preto 15%' },
          { label: 'Título / corpo', value: 'Heading/H3 · Body/SM a 70%' },
        ]}
        deviations={[
          'A altura de 300px do arquivo não é fixada: a superfície abraça o conteúdo, o comportamento esperado de um diálogo com corpo variável.',
          'A sombra (raio 32) fica entre Shadow/LG (24) e Shadow/XL (48) e não corresponde a nenhum estilo publicado. Foi tokenizada como --gpt-elevation-modal.',
          'O arquivo não descreve scrim, foco, ESC nem rodapé. Todos foram acrescentados: o scrim usa o overlay publicado a 40% e o rodapé é um slot opcional alinhado à direita.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Quatro peças compostas, três delas opcionais."
        barColor="#5856D6"
      />
      <GptDocGrid min={260}>
        <GptDocCard icon="🎩" title="Modal.Header">
          Título em <code>Heading/H3</code> e botão de fechar opcional. Renderizado
          automaticamente quando a prop <code>title</code> é passada.
        </GptDocCard>
        <GptDocCard icon="📄" title="Modal.Body">
          Corpo em <code>Body/SM</code> a 70% de opacidade. Aceita qualquer conteúdo — formulários,
          listas, campos.
        </GptDocCard>
        <GptDocCard icon="🦶" title="Modal.Footer">
          Faixa de ações alinhada à direita, com gap de 12px. Empurrada para a base por{' '}
          <code>margin-top: auto</code>.
        </GptDocCard>
        <GptDocCard icon="🫥" title="Scrim">
          Cobre a viewport e fecha o diálogo ao clique, controlado por{' '}
          <code>closeOnOverlayClick</code>.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="4. Matriz de Composições"
        description="Superfície isolada, diálogo completo e formulário — renderizados pelo componente real."
        barColor="#5856D6"
      />
      <GptDocStage label="Superfície sem scrim — como publicada no Figma">
        <Modal withOverlay={false} title="Modal Title">
          <Modal.Body>Modal body content goes here.</Modal.Body>
        </Modal>
      </GptDocStage>
      <GptDocStage label="Com rodapé de ações">
        <Modal withOverlay={false} title="Apagar conversa">
          <Modal.Body>
            Esta ação não pode ser desfeita. A conversa e todos os anexos serão removidos
            permanentemente.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost">Cancelar</Button>
            <Button variant="destructive">Apagar</Button>
          </Modal.Footer>
        </Modal>
      </GptDocStage>
      <GptDocStage label="Com formulário e controles">
        <Modal withOverlay={false} title="Compartilhar conversa">
          <Modal.Body>
            Qualquer pessoa com o link poderá ver esta conversa, mas não continuá-la.
          </Modal.Body>
          <Input block defaultValue="https://chat.unooria.com/s/9f2a41" readOnly />
          <SettingsRow
            label="Incluir mensagens futuras"
            block
            value={
              <Toggle
                checked={compartilhar}
                onCheckedChange={setCompartilhar}
                aria-label="Incluir mensagens futuras"
              />
            }
          />
          <Divider />
          <Modal.Footer>
            <Button variant="outline">Copiar link</Button>
            <Button variant="primary">Compartilhar</Button>
          </Modal.Footer>
        </Modal>
      </GptDocStage>
      <GptDocStage label="Diálogo real com scrim — ESC, clique no scrim ou ✕ fecham">
        <Button onClick={() => setAberto(true)}>Abrir diálogo</Button>
        <Modal open={aberto} onClose={() => setAberto(false)} title="Modal Title">
          <Modal.Body>
            Pressione ESC, clique fora ou use o ✕ para fechar. O foco circula apenas dentro do
            diálogo e volta ao botão de origem ao fechar.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setAberto(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => setAberto(false)}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </GptDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas Práticas"
        description="Regras de diálogo."
        barColor="#5856D6"
      />
      <GptDocPractices
        dos={[
          'Manter uma única ação primária no rodapé, acompanhada de um caminho de saída.',
          'Deixar ESC e o clique no scrim habilitados, salvo em fluxos com dados não salvos.',
          'Usar Modal.Footer para as ações, preservando o alinhamento à direita.',
          'Descrever a consequência no corpo quando a ação for destrutiva.',
        ]}
        donts={[
          'Abrir um diálogo a partir de outro.',
          'Usar o Modal para conteúdo longo de leitura — ele não rola por si.',
          'Remover o botão de fechar e desligar ESC ao mesmo tempo, o que aprisiona o usuário.',
          'Substituir a sombra por contorno: a superfície precisa se destacar do scrim.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a Temas"
        description="A superfície segue bg/primary; a sombra é invariante, como no arquivo."
        barColor="#5856D6"
      />
      <GptDocThemeSwitcher padding={40}>
        {() => (
          <Modal withOverlay={false} title="Modal Title" style={{ width: 360 }}>
            <Modal.Body>Modal body content goes here.</Modal.Body>
            <Modal.Footer>
              <Button variant="ghost">Cancelar</Button>
              <Button variant="primary">Confirmar</Button>
            </Modal.Footer>
          </Modal>
        )}
      </GptDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do Modal e de seus subcomponentes."
        barColor="#5856D6"
      />
      <GptDocPropsTable
        title="Modal"
        rows={[
          {
            name: 'open',
            type: 'boolean',
            default: 'true',
            description: 'Controla a visibilidade. Quando false, nada é renderizado.',
          },
          {
            name: 'onClose',
            type: '() => void',
            description: 'Chamado ao fechar por ESC, clique no scrim ou botão de fechar.',
          },
          {
            name: 'title',
            type: 'React.ReactNode',
            description:
              'Título do cabeçalho padrão. Quando omitido, use Modal.Header para compor um cabeçalho próprio.',
          },
          {
            name: 'withOverlay',
            type: 'boolean',
            default: 'true',
            description: 'Renderiza o scrim translúcido atrás da superfície.',
          },
          {
            name: 'closeOnOverlayClick',
            type: 'boolean',
            default: 'true',
            description: 'Fecha o diálogo ao clicar no scrim.',
          },
          {
            name: 'closeOnEscape',
            type: 'boolean',
            default: 'true',
            description: 'Fecha o diálogo ao pressionar ESC.',
          },
          {
            name: 'closeLabel',
            type: 'string',
            default: "'Fechar'",
            description: 'Rótulo acessível do botão de fechar do cabeçalho padrão.',
          },
          {
            name: 'theme',
            type: "'light' | 'dark'",
            description:
              'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
          },
          { name: 'children', type: 'React.ReactNode', description: 'Conteúdo do diálogo.' },
          { name: 'className', type: 'string', description: 'Classe CSS adicional da superfície.' },
        ]}
      />
      <GptDocPropsTable
        title="Modal.Header"
        rows={[
          {
            name: 'onClose',
            type: '() => void',
            description: 'Chamado ao acionar o botão de fechar. Sem ela, o botão não é renderizado.',
          },
          {
            name: 'closeLabel',
            type: 'string',
            default: "'Fechar'",
            description: 'Rótulo acessível do botão de fechar.',
          },
          { name: 'children', type: 'React.ReactNode', description: 'Título em Heading/H3.' },
        ]}
      />
      <GptDocPropsTable
        title="Modal.Body e Modal.Footer"
        rows={[
          {
            name: 'children (Body)',
            type: 'React.ReactNode',
            description: 'Corpo do diálogo, em Body/SM a 70% de opacidade.',
          },
          {
            name: 'children (Footer)',
            type: 'React.ReactNode',
            description: 'Ações do diálogo, alinhadas à direita com gap de 12px.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'Classe CSS adicional em qualquer um dos dois.',
          },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Modal> = {
  title: 'ChatGPT/Componentes/Modal',
  component: Modal,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Controla a visibilidade.' },
    title: { control: 'text', description: 'Título do cabeçalho padrão.' },
    withOverlay: { control: 'boolean', description: 'Renderiza o scrim translúcido.' },
    closeOnOverlayClick: { control: 'boolean', description: 'Fecha ao clicar no scrim.' },
    closeOnEscape: { control: 'boolean', description: 'Fecha ao pressionar ESC.' },
    closeLabel: { control: 'text', description: 'Rótulo acessível do botão de fechar.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    open: true,
    title: 'Modal Title',
    withOverlay: false,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    closeLabel: 'Fechar',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ModalDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Modal expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Modal',
  render: (args) => (
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 360,
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <Modal {...args}>
        <Modal.Body>Modal body content goes here.</Modal.Body>
        <Modal.Footer>
          <Button variant="ghost">Cancelar</Button>
          <Button variant="primary">Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ),
};

/**
 * Réplica visual do componente publicado no Figma — 480 × 300, sem scrim.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ padding: 32, border: '1px solid #E4E8E9', borderRadius: 5, width: 544 }}>
      <Modal withOverlay={false} title="Modal Title" style={{ height: 300 }}>
        <Modal.Body>Modal body content goes here.</Modal.Body>
      </Modal>
    </div>
  ),
};

/**
 * Diálogo real com scrim, ESC e confinamento de foco.
 */
export const ComScrim: Story = {
  name: 'Estados',
  render: function DialogoReal() {
    const [aberto, setAberto] = React.useState(false);
    return (
      <div style={{ display: 'flex', gap: 12 }}>
        <Button onClick={() => setAberto(true)}>Abrir diálogo</Button>
        <Modal open={aberto} onClose={() => setAberto(false)} title="Apagar conversa">
          <Modal.Body>
            Esta ação não pode ser desfeita. A conversa e todos os anexos serão removidos
            permanentemente.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setAberto(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setAberto(false)}>
              Apagar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

/**
 * Uso com os subcomponentes compostos, sem a prop title.
 */
export const ComposicaoModular: Story = {
  render: () => (
    <Modal withOverlay={false}>
      <Modal.Header onClose={() => undefined}>Cabeçalho composto</Modal.Header>
      <Modal.Body>
        Quando a prop title é omitida, o cabeçalho é montado manualmente com Modal.Header — útil
        quando o título precisa de conteúdo próprio.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline">Voltar</Button>
        <Button variant="primary">Continuar</Button>
      </Modal.Footer>
    </Modal>
  ),
};
