import React, { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ConfirmDialog } from '../../../src/unoogaleria/components/ConfirmDialog';
import { Button } from '../../../src/unoogaleria/components/Button';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { UGL_TRASH_RETENTION_DAYS } from '../../../src/unoogaleria/media';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocCard,
  UglDocGrid,
  UglDocSpecs,
  UglDocDecisions,
  UglDocAnatomy,
  UglDocPractices,
  UglDocStage,
  UglDocThemeSwitcher,
  UglDocPropsTable,
} from '../../../.storybook/components';
import { uglTrashItems } from '../fixtures';
import { TelaDeFundo, notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Textos das duas perguntas de demonstração. */
const EXCLUIR = {
  gatilho: 'Excluir foto',
  titulo: 'Excluir esta foto?',
  descricao: `A foto vai para Excluídos recentemente e sai de vez em ${UGL_TRASH_RETENTION_DAYS} dias.`,
  confirmar: 'Excluir',
};

const APAGAR_TUDO = {
  gatilho: 'Apagar tudo',
  titulo: `Apagar ${uglTrashItems.length} itens de vez?`,
  descricao: 'Esta ação não pode ser desfeita.',
  confirmar: 'Apagar tudo',
};

const NOVO_ALBUM = {
  gatilho: 'Novo álbum',
  titulo: 'Novo álbum',
  descricao: 'Dê um nome ao álbum.',
  confirmar: 'Criar',
};

/**
 * Campo de nome do álbum. É um `<input>` nativo com os tokens do módulo: o
 * `TextField` da Unoogaleria é escrito em paralelo e não é importado aqui.
 */
const CampoDeNome: React.FC<{ valor: string; aoMudar: (valor: string) => void }> = ({ valor, aoMudar }) => {
  const id = useId();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: 'var(--ugl-font-sans)',
          fontSize: 'var(--ugl-font-caption-strong-size)',
          fontWeight: 'var(--ugl-font-caption-strong-weight)',
          lineHeight: 'var(--ugl-font-caption-strong-line)',
          color: 'var(--ugl-color-text-secondary)',
        }}
      >
        Nome do álbum
      </label>
      <input
        id={id}
        value={valor}
        onChange={(event) => aoMudar(event.target.value)}
        placeholder="Título"
        autoComplete="off"
        style={{
          boxSizing: 'border-box',
          width: '100%',
          height: 44,
          padding: '0 12px',
          border: '1px solid var(--ugl-color-border-control)',
          borderRadius: 'var(--ugl-radius-s)',
          background: 'var(--ugl-color-background-primary)',
          color: 'var(--ugl-color-text-primary)',
          fontFamily: 'var(--ugl-font-sans)',
          fontSize: 'var(--ugl-font-body-lg-size)',
        }}
      />
    </div>
  );
};

/**
 * Diálogo de demonstração dentro do aparelho, com o botão que abre. O estado
 * é do produto (aqui, da estória), que também mostra o último resultado.
 */
const DialogoDemo: React.FC<{
  tipo?: 'excluir' | 'apagar-tudo' | 'novo-album';
  theme?: 'light' | 'dark';
  inicialAberto?: boolean;
  busy?: boolean;
  scale?: number;
}> = ({ tipo = 'excluir', theme, inicialAberto = false, busy = false, scale = 0.75 }) => {
  const [aberto, setAberto] = useState(inicialAberto);
  const [resultado, setResultado] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const textos = tipo === 'novo-album' ? NOVO_ALBUM : tipo === 'apagar-tudo' ? APAGAR_TUDO : EXCLUIR;
  const destrutivo = tipo !== 'novo-album';

  return (
    <PhoneFrame scale={scale} theme={theme} ariaLabel="Aparelho de demonstração">
      <TelaDeFundo
        titulo={tipo === 'apagar-tudo' ? 'Excluídos' : 'Biblioteca'}
        faixa={
          <>
            <Button
              size="sm"
              variant={destrutivo ? 'danger-tertiary' : 'tertiary'}
              iconStart={destrutivo ? 'delete' : 'newAlbum'}
              onClick={() => {
                setNome('');
                setAberto(true);
              }}
            >
              {textos.gatilho}
            </Button>
            <p style={notaEstilo} role="status">
              {resultado ?? 'Nenhuma decisão ainda'}
            </p>
          </>
        }
      >
        <ConfirmDialog
          open={aberto}
          title={textos.titulo}
          description={textos.descricao}
          confirmLabel={busy ? 'Apagando…' : textos.confirmar}
          tone={destrutivo ? 'danger' : 'default'}
          busy={busy}
          confirmDisabled={tipo === 'novo-album' && nome.trim() === ''}
          onCancel={() => {
            setResultado('Cancelado');
            setAberto(false);
          }}
          onConfirm={() => {
            setResultado(tipo === 'novo-album' ? `Álbum criado: ${nome.trim()}` : 'Confirmado');
            setAberto(false);
          }}
        >
          {tipo === 'novo-album' ? <CampoDeNome valor={nome} aoMudar={setNome} /> : undefined}
        </ConfirmDialog>
      </TelaDeFundo>
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente ConfirmDialog.
 */
const ConfirmDialogDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Sobreposições"
      title="ConfirmDialog"
      description="Alerta central de 300px: a pergunta, a consequência, um espaço opcional para campo e duas ações lado a lado. No tom destrutivo abre com o foco em “Cancelar”, para que um Enter reflexo não apague nada."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="Uma interrupção deliberada." />
    <UglDocGrid>
      <UglDocCard icon="🗑️" title="Excluir e apagar de vez">
        <code>tone=&quot;danger&quot;</code>: confirmação vermelha, <code>role=&quot;alertdialog&quot;</code>{' '}
        e foco inicial em Cancelar.
      </UglDocCard>
      <UglDocCard icon="📁" title="Novo álbum">
        O <code>children</code> recebe o campo; o primeiro campo ganha o foco e Enter confirma, porque o
        painel é um <code>&lt;form&gt;</code>.
      </UglDocCard>
      <UglDocCard icon="⏳" title="Operação em andamento">
        Com <code>busy</code>, as ações ficam indisponíveis sem perder o foco e o Esc deixa de cancelar.
      </UglDocCard>
      <UglDocCard icon="🛡️" title="Véu que não fecha">
        O toque no véu não cancela: uma decisão destrutiva não se desfaz por toque acidental. Esc e
        Cancelar, sim.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" description="Medidas do módulo e escolhas de composição." />
    <UglDocSpecs
      component="ConfirmDialog"
      layout="Camada absoluta · alerta central de 300px · ações em duas colunas"
      specs={[
        { label: 'Largura', value: '300px (local)' },
        { label: 'Painel', value: '--ugl-color-background-elevated · --ugl-radius-l' },
        { label: 'Elevação', value: '--ugl-elevation-overlay' },
        { label: 'Camada', value: '--ugl-z-dialog (40)' },
        { label: 'Véu', value: '--ugl-color-overlay-scrim' },
        { label: 'Título', value: 'Title/Medium · centralizado' },
        { label: 'Ações', value: 'Button secondary + primary/danger · 44px' },
        { label: 'Foco inicial', value: 'Cancelar (danger) · 1º campo (default)' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Foco inicial por tom',
          detail:
            'no tom danger o foco abre SEMPRE em Cancelar, mesmo que o children tenha campo; no tom default, no primeiro campo do children e, sem campo, em Cancelar. A escolha é feita num efeito de layout, antes do efeito do hook de foco.',
        },
        {
          subject: 'Painel é um <form>',
          detail:
            'a confirmação é o botão de envio: Enter num campo confirma sem escuta de tecla, e confirmDisabled bloqueia também o Enter.',
        },
        {
          subject: 'Ocupado sem disabled',
          detail:
            'com busy, as ações recebem aria-disabled (não disabled), para o foco não cair no corpo da página no meio da operação; o painel declara aria-busy.',
        },
        {
          subject: 'Sem desfoque atrás do véu',
          detail: 'o alerta interrompe; o fundo continua reconhecível pelo véu, sem o custo do backdrop-filter.',
        },
        {
          subject: 'Largura local',
          detail: '--ugl-confirm-dialog-width: 300px, fixa para a pergunta quebrar sempre no mesmo lugar; sem token equivalente.',
        },
        {
          subject: 'Movimento',
          detail: 'o véu esmaece e o alerta assenta de 106% para 100%. Em prefers-reduced-motion, ambos desligados.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Toque em “Excluir foto” no aparelho." />
    <UglDocStage surface="secondary" align="flex-start" padding={16}>
      <DialogoDemo scale={0.6} />
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Véu', role: 'Cobre a tela; o toque NÃO cancela.', token: '--ugl-color-overlay-scrim' },
            { name: 'Título', role: 'A pergunta; nomeia o diálogo.', token: 'Title/Medium' },
            { name: 'Descrição', role: 'A consequência; descreve o diálogo.', token: 'Body/Medium · --ugl-color-text-secondary' },
            { name: 'Conteúdo', role: 'Slot opcional (campo de nome).', token: 'children' },
            { name: 'Cancelar', role: 'Contorno; foco inicial no destrutivo.', token: 'Button secondary' },
            { name: 'Confirmar', role: 'Envio do formulário; vermelho no destrutivo.', token: 'Button primary · danger' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada aparelho abre o diálogo real; as estórias TodasVariantes e Estados os mostram já abertos."
    />
    <UglDocStage label="Tons e conteúdo" surface="secondary" align="flex-start" padding={16}>
      {(['excluir', 'apagar-tudo', 'novo-album'] as const).map((tipo) => (
        <div key={tipo} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>{tipo === 'novo-album' ? 'tone="default" + campo' : 'tone="danger"'}</p>
          <DialogoDemo tipo={tipo} scale={0.5} />
        </div>
      ))}
    </UglDocStage>
    <UglDocStage label="Ocupado" surface="secondary" align="flex-start" padding={16}>
      <DialogoDemo tipo="apagar-tudo" busy scale={0.5} />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando interromper." />
    <UglDocPractices
      dos={[
        'Escrever o título como pergunta e nomear a ação no botão (“Excluir”, não “Sim”).',
        'Dizer a consequência na descrição, com o prazo quando houver.',
        'Usar tone="danger" em tudo que apaga.',
        'Desabilitar a confirmação enquanto o campo obrigatório estiver vazio.',
        'Renderizar o diálogo dentro da tela do aparelho, irmão do fundo.',
      ]}
      donts={[
        'Confirmar ações reversíveis com diálogo — prefira um aviso com “Desfazer”.',
        'Fechar o diálogo no toque do véu.',
        'Pôr mais de duas ações.',
        'Usar “OK” e “Cancelar”: a pessoa precisa ler a pergunta para saber o que OK faz.',
        'Focar a confirmação ao abrir um diálogo destrutivo.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Painel, véu e ações acompanham o tema." />
    <UglDocThemeSwitcher surface="secondary" padding={16}>
      {(tema) => <DialogoDemo key={tema} theme={tema} scale={0.6} />}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do ConfirmDialog. Os demais atributos vão ao painel (<form>)."
    />
    <UglDocPropsTable
      title="ConfirmDialog"
      rows={[
        { name: 'open', type: 'boolean', description: 'Diálogo aberto. Fechado, não renderiza nada. Obrigatório.' },
        { name: 'title', type: 'ReactNode', description: 'A pergunta; nomeia o diálogo. Obrigatório.' },
        { name: 'description', type: 'ReactNode', description: 'A consequência; descreve o diálogo.' },
        { name: 'confirmLabel', type: 'string', default: "'Confirmar'", description: 'Rótulo da confirmação.' },
        { name: 'cancelLabel', type: 'string', default: "'Cancelar'", description: 'Rótulo de cancelar.' },
        { name: 'tone', type: "'default' | 'danger'", default: "'default'", description: 'danger: vermelho, alertdialog e foco em Cancelar.' },
        { name: 'onConfirm', type: '() => void', description: 'Confirmar ou Enter num campo. Obrigatório.' },
        { name: 'onCancel', type: '() => void', description: 'Cancelar ou Esc. Obrigatório.' },
        { name: 'children', type: 'ReactNode', description: 'Slot entre a descrição e as ações.' },
        { name: 'confirmDisabled', type: 'boolean', default: 'false', description: 'Bloqueia a confirmação (e o Enter).' },
        { name: 'busy', type: 'boolean', default: 'false', description: 'Ações indisponíveis e Esc inativo.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
      ]}
    />
    <UglDocPropsTable
      title="UglConfirmDialogTone"
      rows={[
        { name: "'default'", type: 'UglConfirmDialogTone', description: 'Confirmação comum: role="dialog", botão primário.' },
        { name: "'danger'", type: 'UglConfirmDialogTone', description: 'Ação destrutiva: role="alertdialog", botão vermelho.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Unoogaleria/Componentes/ConfirmDialog',
  component: ConfirmDialog,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Diálogo aberto.' },
    title: { control: 'text', description: 'A pergunta.' },
    description: { control: 'text', description: 'A consequência.' },
    confirmLabel: { control: 'text', description: 'Rótulo da confirmação.' },
    cancelLabel: { control: 'text', description: 'Rótulo de cancelar.' },
    tone: { control: 'radio', options: ['default', 'danger'], description: 'Tom do diálogo.' },
    confirmDisabled: { control: 'boolean', description: 'Bloqueia a confirmação.' },
    busy: { control: 'boolean', description: 'Operação em andamento.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: false, description: 'Slot entre a descrição e as ações.' },
    onConfirm: { action: 'onConfirm' },
    onCancel: { action: 'onCancel' },
  },
  args: {
    open: true,
    title: EXCLUIR.titulo,
    description: EXCLUIR.descricao,
    confirmLabel: EXCLUIR.confirmar,
    cancelLabel: 'Cancelar',
    tone: 'danger',
    confirmDisabled: false,
    busy: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmDialog>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ConfirmDialogDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ConfirmDialog',
  render: (args) => (
    <PhoneFrame scale={0.75} theme={args.theme}>
      <TelaDeFundo>
        <ConfirmDialog {...args} />
      </TelaDeFundo>
    </PhoneFrame>
  ),
};

/**
 * Composição realista: excluir uma foto da biblioteca.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: excluir uma foto',
  render: () => <DialogoDemo inicialAberto />,
};

/**
 * Destrutivo, apagar de vez e novo álbum com campo, abertos.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['excluir', 'apagar-tudo', 'novo-album'] as const).map((tipo) => (
        <div key={tipo} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>{tipo === 'novo-album' ? 'tone="default" + campo' : 'tone="danger"'}</p>
          <DialogoDemo tipo={tipo} inicialAberto scale={0.55} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Confirmação bloqueada (campo vazio) e operação em andamento.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>confirmDisabled (nome vazio)</p>
        <DialogoDemo tipo="novo-album" inicialAberto scale={0.6} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>busy</p>
        <DialogoDemo tipo="apagar-tudo" busy inicialAberto scale={0.6} />
      </div>
    </div>
  ),
};

/**
 * O diálogo nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>{tema === 'light' ? 'Tema claro' : 'Tema escuro'}</p>
          <DialogoDemo theme={tema} inicialAberto scale={0.6} />
        </div>
      ))}
    </div>
  ),
};

/**
 * O destrutivo abre com o foco em Cancelar; Esc cancela e devolve o foco;
 * Excluir confirma.
 */
export const FocoEmCancelar: Story = {
  name: 'Foco em Cancelar e Esc',
  render: () => <DialogoDemo />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const abrir = tela.getByRole('button', { name: EXCLUIR.gatilho });

    await userEvent.click(abrir);
    const dialogo = await tela.findByRole('alertdialog', { name: EXCLUIR.titulo });
    await expect(dialogo).toHaveAccessibleDescription(EXCLUIR.descricao);
    await waitFor(() => expect(within(dialogo).getByRole('button', { name: 'Cancelar' })).toHaveFocus());

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tela.queryByRole('alertdialog')).not.toBeInTheDocument());
    await expect(tela.getByRole('status')).toHaveTextContent('Cancelado');
    await waitFor(() => expect(abrir).toHaveFocus());

    await userEvent.click(abrir);
    const deNovo = await tela.findByRole('alertdialog', { name: EXCLUIR.titulo });
    await userEvent.click(within(deNovo).getByRole('button', { name: EXCLUIR.confirmar }));
    await waitFor(() => expect(tela.queryByRole('alertdialog')).not.toBeInTheDocument());
    await expect(tela.getByRole('status')).toHaveTextContent('Confirmado');
  },
};

/**
 * No tom comum com campo, o campo recebe o foco, a confirmação espera o nome e
 * Enter confirma.
 */
export const NovoAlbumComCampo: Story = {
  name: 'Novo álbum: foco no campo e Enter',
  render: () => <DialogoDemo tipo="novo-album" />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(tela.getByRole('button', { name: NOVO_ALBUM.gatilho }));

    const dialogo = await tela.findByRole('dialog', { name: NOVO_ALBUM.titulo });
    const campo = within(dialogo).getByRole('textbox', { name: 'Nome do álbum' });
    await waitFor(() => expect(campo).toHaveFocus());
    await expect(within(dialogo).getByRole('button', { name: NOVO_ALBUM.confirmar })).toBeDisabled();

    await userEvent.type(campo, 'Viagem à serra{Enter}');
    await waitFor(() => expect(tela.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(tela.getByRole('status')).toHaveTextContent('Álbum criado: Viagem à serra');
  },
};
