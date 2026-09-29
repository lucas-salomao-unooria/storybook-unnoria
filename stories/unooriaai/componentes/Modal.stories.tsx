import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Modal } from '../../../src/unooriaai/components/Modal';
import { Button, Divider, Input, SettingsRow, Toggle } from '../../../src/unooriaai/components';
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
 * Página de documentação rica do componente Modal.
 */
const ModalDocumentationPage = () => {
  const [aberto, setAberto] = React.useState(false);
  const [compartilhar, setCompartilhar] = React.useState(true);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="UnooriaAI"
        category="Componentes • Superfícies"
        title="Modal"
        description="Superfície de 480px com padding 24, gap 16, raio 16 e a sombra de sobreposição do tema. O cabeçalho traz o título em heading-h3 e o ícone de fechar da biblioteca da Unooria; o corpo usa body-sm. Acessibilidade completa: role=dialog com aria-modal, fechamento por ESC, confinamento de foco com Tab e devolução do foco ao elemento de origem."
      />

      <UnooriaDocSectionHeader
        title="1. Visão geral e casos de uso"
        description="A única superfície da biblioteca que sai do fluxo da página."
        barColor={BAR}
      />
      <UaiDocGrid>
        <UaiDocCard icon="🪟" title="Diálogo">
          Confirmação de ação destrutiva, compartilhamento de conversa, edição das instruções de um
          assistente: o que exige atenção exclusiva.
        </UaiDocCard>
        <UaiDocCard icon="🧩" title="Composição">
          <code>Modal.Header</code>, <code>Modal.Body</code> e <code>Modal.Footer</code>. Passar a
          prop <code>title</code> monta o cabeçalho padrão sem composição manual.
        </UaiDocCard>
        <UaiDocCard icon="♿" title="Acessibilidade">
          <code>role=&quot;dialog&quot;</code> com <code>aria-modal</code> e nome acessível pelo título do
          cabeçalho (<code>aria-labelledby</code>, composto ou pelo atalho <code>title</code>; um{' '}
          <code>aria-label</code> ou <code>aria-labelledby</code> explícito vence), foco inicial no
          primeiro elemento focável, <code>Tab</code>/<code>Shift+Tab</code> circulando dentro do
          diálogo e <code>ESC</code> fechando.
        </UaiDocCard>
        <UaiDocCard icon="🫥" title="Véu">
          <code>--uai-overlay-scrim</code>, o véu roxo a 50%, igual nos dois temas. Pode ser
          desligado com <code>withOverlay={'{false}'}</code>.
        </UaiDocCard>
      </UaiDocGrid>

      <UnooriaDocSectionHeader
        title="2. Especificações técnicas"
        description="Medidas e tokens do componente."
        barColor={BAR}
      />
      <UaiDocSpecs
        component="Modal"
        layout="Diálogo · 480px"
        specs={[
          { label: 'Largura', value: '480px · máx. 100% do contêiner' },
          { label: 'Padding', value: '24px · --uai-spacing-8' },
          { label: 'Gap', value: '16px · --uai-spacing-6' },
          { label: 'Raio', value: '16px · --uai-radius-xl' },
          { label: 'Superfície', value: '--uai-bg-primary' },
          { label: 'Sombra', value: '--uai-elevation-modal (por tema)' },
          { label: 'Título', value: 'heading-h3 · Open Sans 600 · 18/28px' },
          { label: 'Corpo', value: 'body-sm · --uai-text-soft-70' },
          { label: 'Fechar', value: 'ícone close · 20px · alvo de 24px' },
          { label: 'Véu', value: '--uai-overlay-scrim' },
        ]}
      />
      <UaiDocDecisions
        items={[
          {
            subject: 'Altura pelo conteúdo',
            detail:
              'a superfície abraça o conteúdo, o comportamento esperado de um diálogo com corpo variável; nenhuma altura é fixada.',
          },
          {
            subject: 'Sombra por tema',
            detail:
              '--uai-elevation-modal é sombra roxa no claro e halo claro no escuro, porque uma sombra escura não se vê sobre superfície roxa profunda. A separação continua principalmente pela diferença entre a superfície e o véu.',
          },
          {
            subject: 'Foco, ESC e rodapé',
            detail:
              'o foco inicial vai ao primeiro elemento focável, Tab e Shift+Tab circulam dentro do diálogo, ESC fecha e o foco volta a quem abriu. O rodapé é um slot opcional alinhado à direita.',
          },
          {
            subject: 'Nome acessível pelo título',
            detail:
              'o título do Modal.Header (composto ou pelo atalho title) liga aria-labelledby ao diálogo. aria-labelledby explícito manda; com aria-label explícito o diálogo não recebe aria-labelledby, que venceria o aria-label no cálculo do nome. As estórias com play guardam a regra.',
          },
          {
            subject: 'Fechar em ícone, com alvo de 24px',
            detail:
              'o botão de fechar renderiza o ícone close da biblioteca em 20px, dentro de um alvo de 24px (mínimo da WCAG 2.5.8). Cor de apoio em repouso (6,4:1 no claro, 8,6:1 no escuro) e primária no hover.',
          },
          {
            subject: 'Contraste',
            detail:
              'o corpo em --uai-text-soft-70 mede 9,9:1 no claro e 12,1:1 no escuro sobre a superfície do diálogo. Não há ressalva aberta.',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do componente"
        description="Quatro peças compostas, três delas opcionais."
        barColor={BAR}
      />
      <UaiDocAnatomy
        zones={[
          {
            name: 'Modal.Header',
            role: 'Título em heading-h3 e botão de fechar opcional. Renderizado automaticamente quando a prop title é passada.',
            token: '--uai-font-heading-h3-*',
          },
          {
            name: 'Modal.Body',
            role: 'Corpo em body-sm. Aceita qualquer conteúdo: formulários, listas, campos.',
            token: '--uai-text-soft-70',
          },
          {
            name: 'Modal.Footer',
            role: 'Faixa de ações alinhada à direita, com gap de 12px. Empurrada para a base por margin-top: auto.',
            token: '--uai-spacing-5',
          },
          {
            name: 'Véu',
            role: 'Cobre a viewport e fecha o diálogo ao clique, controlado por closeOnOverlayClick.',
            token: '--uai-overlay-scrim',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        title="4. Matriz de variantes, tamanhos e estados"
        description="Superfície isolada, diálogo completo e formulário, renderizados pelo componente real."
        barColor={BAR}
      />
      <UaiDocStage label="Superfície sem véu">
        <Modal withOverlay={false} title="Título do diálogo">
          <Modal.Body>O conteúdo do diálogo entra aqui.</Modal.Body>
        </Modal>
      </UaiDocStage>
      <UaiDocStage label="Com rodapé de ações">
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
      </UaiDocStage>
      <UaiDocStage label="Com formulário e controles">
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
      </UaiDocStage>
      <UaiDocStage label="Diálogo real com véu: ESC, clique no véu ou o botão de fechar fecham">
        <Button onClick={() => setAberto(true)}>Abrir diálogo</Button>
        <Modal open={aberto} onClose={() => setAberto(false)} title="Título do diálogo">
          <Modal.Body>
            Pressione ESC, clique fora ou use o botão de fechar. O foco circula apenas dentro do
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
      </UaiDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas práticas"
        description="Regras de diálogo."
        barColor={BAR}
      />
      <UaiDocPractices
        dos={[
          'Manter uma única ação primária no rodapé, acompanhada de um caminho de saída.',
          'Deixar ESC e o clique no véu habilitados, salvo em fluxos com dados não salvos.',
          'Usar Modal.Footer para as ações, preservando o alinhamento à direita.',
          'Descrever a consequência no corpo quando a ação for destrutiva.',
        ]}
        donts={[
          'Abrir um diálogo a partir de outro.',
          'Usar o Modal para conteúdo longo de leitura: ele não rola por si.',
          'Remover o botão de fechar e desligar ESC ao mesmo tempo, o que aprisiona a pessoa.',
          'Substituir a sombra por contorno: a superfície precisa se destacar do véu.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a temas"
        description="A superfície segue --uai-bg-primary e a sombra tem valor próprio em cada tema: sombra roxa no claro, halo claro no escuro."
        barColor={BAR}
      />
      <UaiDocThemeSwitcher padding={40}>
        {() => (
          <Modal withOverlay={false} title="Título do diálogo" style={{ width: 360 }}>
            <Modal.Body>O conteúdo do diálogo entra aqui.</Modal.Body>
            <Modal.Footer>
              <Button variant="ghost">Cancelar</Button>
              <Button variant="primary">Confirmar</Button>
            </Modal.Footer>
          </Modal>
        )}
      </UaiDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência completa de props da API"
        description="Contrato público do Modal e de seus subcomponentes."
        barColor={BAR}
      />
      <UaiDocPropsTable
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
            description: 'Chamado ao fechar por ESC, clique no véu ou botão de fechar.',
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
            description: 'Renderiza o véu translúcido atrás da superfície.',
          },
          {
            name: 'closeOnOverlayClick',
            type: 'boolean',
            default: 'true',
            description: 'Fecha o diálogo ao clicar no véu.',
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
            name: 'aria-label / aria-labelledby',
            type: 'string',
            description:
              'Nome acessível explícito. aria-labelledby manda; com aria-label, o título não é ligado por aria-labelledby.',
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
      <UaiDocPropsTable
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
          { name: 'children', type: 'React.ReactNode', description: 'Título em heading-h3.' },
        ]}
      />
      <UaiDocPropsTable
        title="Modal.Body e Modal.Footer"
        rows={[
          {
            name: 'children (Body)',
            type: 'React.ReactNode',
            description: 'Corpo do diálogo, em body-sm na cor --uai-text-soft-70.',
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
  title: 'UnooriaAI/Componentes/Modal',
  component: Modal,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Controla a visibilidade.' },
    title: { control: 'text', description: 'Título do cabeçalho padrão.' },
    withOverlay: { control: 'boolean', description: 'Renderiza o véu translúcido.' },
    closeOnOverlayClick: { control: 'boolean', description: 'Fecha ao clicar no véu.' },
    closeOnEscape: { control: 'boolean', description: 'Fecha ao pressionar ESC.' },
    closeLabel: { control: 'text', description: 'Rótulo acessível do botão de fechar.' },
    'aria-label': { control: 'text', description: 'Nome acessível explícito (vence o título).' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    open: true,
    title: 'Título do diálogo',
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
 * Documentação rica e completa do componente.
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
      data-uai-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 360,
        padding: 48,
        borderRadius: 12,
        background: 'var(--uai-bg-secondary)',
        border: '1px solid var(--uai-border-default)',
      }}
    >
      <Modal {...args}>
        <Modal.Body>O conteúdo do diálogo entra aqui.</Modal.Body>
        <Modal.Footer>
          <Button variant="ghost">Cancelar</Button>
          <Button variant="primary">Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ),
};

/**
 * A superfície em sua medida canônica, 480px, sem véu.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <div
      style={{
        padding: 32,
        border: '1px solid var(--uai-border-default)',
        borderRadius: 8,
        width: 544,
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Modal withOverlay={false} title="Título do diálogo" style={{ minHeight: 300 }}>
        <Modal.Body>O conteúdo do diálogo entra aqui.</Modal.Body>
      </Modal>
    </div>
  ),
};

/**
 * Diálogo real com véu, ESC e confinamento de foco. O `play` abre o diálogo,
 * confere que o foco entra nele, fecha com ESC e confere a devolução do foco
 * ao botão que o abriu.
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
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const abrir = tela.getByRole('button', { name: 'Abrir diálogo' });

    await userEvent.click(abrir);
    const dialogo = await tela.findByRole('dialog', { name: 'Apagar conversa' });
    await waitFor(() => expect(dialogo.contains(document.activeElement)).toBe(true));

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tela.queryByRole('dialog')).toBeNull());
    await expect(abrir).toHaveFocus();
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
        Quando a prop title é omitida, o cabeçalho é montado manualmente com Modal.Header, útil
        quando o título precisa de conteúdo próprio.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline">Voltar</Button>
        <Button variant="primary">Continuar</Button>
      </Modal.Footer>
    </Modal>
  ),
};

/**
 * REDE PARA O NOME ACESSÍVEL DO DIÁLOGO.
 *
 * O defeito que esta estória guarda (medido em 25/09/2026, na 0.2.2): o
 * título do `Modal.Header` saía num `h2` sem id, e a superfície com
 * `role="dialog"` não tinha `aria-labelledby`, nem composta, nem pelo atalho
 * `title=`. O leitor de tela anunciava apenas "diálogo".
 *
 * O teste cobra os DOIS caminhos que montam o cabeçalho, e que o
 * `aria-labelledby` aponta para o nó do título.
 */
export const NomeAcessivelDoCabecalho: Story = {
  name: 'O título do cabeçalho nomeia o diálogo, composto ou pelo atalho',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Modal withOverlay={false}>
        <Modal.Header onClose={() => undefined}>Cabeçalho composto</Modal.Header>
        <Modal.Body>O título vem de Modal.Header.</Modal.Body>
      </Modal>
      <Modal withOverlay={false} title="Cabeçalho pelo atalho" onClose={() => undefined}>
        <Modal.Body>O título vem da prop title.</Modal.Body>
      </Modal>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    for (const nome of ['Cabeçalho composto', 'Cabeçalho pelo atalho']) {
      const dialogo = await tela.findByRole('dialog', { name: nome });
      const titulo = within(dialogo).getByRole('heading', { name: nome });
      await expect(dialogo).toHaveAttribute('aria-labelledby', titulo.id);
    }
  },
};

/**
 * REDE PARA A PRECEDÊNCIA DO RÓTULO EXPLÍCITO.
 *
 * A ligação automática é o padrão, não uma imposição. `aria-labelledby`
 * explícito continua mandando; e, com `aria-label` explícito, o diálogo não
 * recebe `aria-labelledby` nenhum, senão a ligação automática, que vence
 * `aria-label` no cálculo do nome, o calaria sem aviso.
 */
export const RotuloExplicitoVence: Story = {
  name: 'aria-label e aria-labelledby explícitos vencem o título',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <span id="uai-rotulo-externo-do-dialogo">Nome vindo de fora</span>
      <Modal withOverlay={false} aria-labelledby="uai-rotulo-externo-do-dialogo">
        <Modal.Header>Título interno citado por ninguém</Modal.Header>
        <Modal.Body>O nome vem do nó citado.</Modal.Body>
      </Modal>
      <Modal withOverlay={false} aria-label="Rótulo escrito pelo consumidor" title="Título visível">
        <Modal.Body>O nome é o aria-label.</Modal.Body>
      </Modal>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const citado = await tela.findByRole('dialog', { name: 'Nome vindo de fora' });
    await expect(citado).toHaveAttribute('aria-labelledby', 'uai-rotulo-externo-do-dialogo');
    const rotulado = await tela.findByRole('dialog', { name: 'Rótulo escrito pelo consumidor' });
    await expect(rotulado).not.toHaveAttribute('aria-labelledby');
  },
};
