import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Toast } from '../../../src/unoogaleria/components/Toast';
import type { UglToastProps } from '../../../src/unoogaleria/components/Toast';
import { Button } from '../../../src/unoogaleria/components/Button';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { uglFormatSelection } from '../../../src/unoogaleria/media';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocGrid,
  UglDocCard,
  UglDocSpecs,
  UglDocDecisions,
  UglDocAnatomy,
  UglDocStage,
  UglDocPractices,
  UglDocThemeSwitcher,
  UglDocPropsTable,
} from '../../../.storybook/components';
import { uglAlbums, uglMediaItems } from '../fixtures';

const BAR = '#716C98';

/** Altura da barra inferior simulada nas composições (a da barra de abas). */
const BAR_OFFSET = 50;

const deletedMessage = (count: number) =>
  `${count === 1 ? '1 item movido' : `${count} itens movidos`} para Excluídos recentemente`;

/**
 * Contêiner posicionado, porque o aviso é absoluto dentro do contêiner.
 */
const Frame: React.FC<{ children: React.ReactNode; height?: number; theme?: 'light' | 'dark' }> = ({
  children,
  height = 180,
  theme,
}) => (
  <div
    data-ugl-theme={theme}
    style={{
      position: 'relative',
      width: 390,
      height,
      overflow: 'hidden',
      borderRadius: 16,
      background: 'var(--ugl-color-background-secondary)',
      border: '1px solid var(--ugl-color-border-subtle)',
    }}
  >
    {children}
  </div>
);

/**
 * Aviso aberto por um botão, com a mensagem e as ações da estória.
 */
const ToastDemo: React.FC<Partial<UglToastProps> & { trigger?: string }> = ({
  trigger = 'Excluir 3 itens',
  onAction,
  onClose,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Frame height={220}>
      <div style={{ padding: 16 }}>
        <Button onClick={() => setOpen(true)}>{trigger}</Button>
      </div>
      <Toast
        open={open}
        message={deletedMessage(3)}
        icon="delete"
        actionLabel="Desfazer"
        {...props}
        onAction={onAction}
        onClose={() => {
          setOpen(false);
          onClose?.();
        }}
      />
    </Frame>
  );
};

/**
 * Biblioteca no aparelho: selecionar, excluir e desfazer.
 */
const LibraryScreen: React.FC = () => {
  const [library, setLibrary] = useState(uglMediaItems.slice(0, 15));
  const [selected, setSelected] = useState<string[]>([]);
  const [removed, setRemoved] = useState<typeof library>([]);
  const [toast, setToast] = useState<'deleted' | 'restored' | null>(null);

  const toggle = (id: string) =>
    setSelected((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

  const remove = () => {
    setRemoved(library.filter((item) => selected.includes(item.id)));
    setLibrary((current) => current.filter((item) => !selected.includes(item.id)));
    setSelected([]);
    setToast('deleted');
  };

  const undo = () => {
    setLibrary((current) =>
      [...current, ...removed].sort((a, b) => b.takenAt.localeCompare(a.takenAt))
    );
    setRemoved([]);
    setToast('restored');
  };

  return (
    <div style={{ position: 'relative', height: '100%', background: 'var(--ugl-color-background-primary)' }}>
      <div style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'thin', paddingTop: 'var(--ugl-safe-area-top)', boxSizing: 'border-box' }}>
        <ul
          aria-label="Fotos e vídeos"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--ugl-grid-gap)', margin: 0, padding: 0, listStyle: 'none' }}
        >
          {library.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <li key={item.id} style={{ aspectRatio: '1 / 1' }}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={item.alt}
                  onClick={() => toggle(item.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    border: 'none',
                    cursor: 'pointer',
                    background: 'var(--ugl-color-background-tertiary)',
                    outlineOffset: -3,
                    opacity: isSelected ? 0.6 : 1,
                  }}
                >
                  <img src={item.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: `calc(${BAR_OFFSET}px + var(--ugl-safe-area-bottom))`,
          padding: '0 var(--ugl-spacing-xs) var(--ugl-safe-area-bottom)',
          boxSizing: 'border-box',
          background: 'var(--ugl-color-surface-bar)',
          boxShadow: 'var(--ugl-elevation-hairline-top)',
          zIndex: 'var(--ugl-z-bar)',
        }}
      >
        <span className="ugl-text ugl-text--caption-strong" style={{ paddingLeft: 8 }} aria-live="polite">
          {uglFormatSelection(selected.length)}
        </span>
        <Button variant="danger-tertiary" iconStart="delete" disabled={selected.length === 0} onClick={remove}>
          Excluir
        </Button>
      </div>

      <Toast
        open={toast !== null}
        offset={BAR_OFFSET}
        icon={toast === 'restored' ? 'restore' : 'delete'}
        message={toast === 'restored' ? 'Itens recuperados' : deletedMessage(removed.length)}
        actionLabel={toast === 'deleted' ? 'Desfazer' : undefined}
        onAction={toast === 'deleted' ? undo : undefined}
        onClose={() => setToast(null)}
      />
    </div>
  );
};

/**
 * Página de documentação rica do componente Toast.
 */
const ToastDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Retorno"
      title="Toast"
      description="Aviso passageiro em cores invertidas, com glifo, mensagem e uma ação opcional (Desfazer). Flutua dentro da tela, acima da barra de gesto e de offset, e fecha sozinho — pausando enquanto o ponteiro ou o foco estão nele."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Confirmação discreta de uma ação que já aconteceu."
    />
    <UglDocGrid>
      <UglDocCard icon="↩️" title="Desfazer">
        “3 itens movidos para Excluídos recentemente · Desfazer”: a ação chama{' '}
        <code>onAction</code> e depois <code>onClose</code>, fechando o aviso.
      </UglDocCard>
      <UglDocCard icon="✅" title="Confirmação">
        “Adicionado a Favoritos”, “Link copiado” — sem ação, com o glifo que nomeia o que
        aconteceu.
      </UglDocCard>
      <UglDocCard icon="⏱️" title="Tempo que respeita a pessoa">
        4 segundos por padrão, com pausa no hover e no foco; <code>duration={'{0}'}</code> mantém o
        aviso até a pessoa fechar, e aí o botão de fechar aparece sozinho.
      </UglDocCard>
      <UglDocCard icon="📣" title="Anunciado sem roubar o foco">
        A região viva (<code>{'role="status"'}</code>, <code>{'aria-live="polite"'}</code>) existe sempre;
        só a mensagem entra e sai. O foco fica onde a pessoa estava.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="Toast"
      layout="Cápsula flutuante · ≥ 52px"
      specs={[
        { label: 'Superfície', value: '--ugl-color-toast-surface (invertida)' },
        { label: 'Texto e glifo', value: '--ugl-color-toast-text' },
        { label: 'Ação', value: '--ugl-color-toast-action · label 14/20px' },
        { label: 'Forma', value: '--ugl-radius-m' },
        { label: 'Sombra', value: '--ugl-elevation-overlay' },
        { label: 'Camada', value: '--ugl-z-toast' },
        { label: 'Base', value: 'safe-area-bottom + 16px + offset' },
        { label: 'Topo', value: 'safe-area-top + 8px + offset' },
        { label: 'Largura máxima', value: '358px (tela − 2 × --ugl-gutter)' },
        { label: 'Entrada', value: '--ugl-transition-slow, 8px (desligada em movimento reduzido)' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Posição absoluta no contêiner',
          detail:
            'o aviso nunca é portal nem position: fixed: ele se posiciona dentro do contêiner posicionado mais próximo (a tela do PhoneFrame), e soma --ugl-safe-area-* ao recuo. O offset em px (via --ugl-toast-offset) o põe acima de barras.',
        },
        {
          subject: 'Pausa no hover e no foco',
          detail:
            'o tempo restante é guardado ao pausar e retomado depois, para que a pessoa alcance “Desfazer” pelo teclado (WCAG 2.2.1). Esc com o foco no aviso fecha.',
        },
        {
          subject: 'Fechar automático quando não há tempo',
          detail:
            'showClose vem ligado quando duration é 0: um aviso que não fecha sozinho precisa de um jeito de sair. Com tempo, o botão é opcional.',
        },
        {
          subject: 'Realce sobre a superfície invertida',
          detail:
            'a camada state-* do tema seria da cor errada numa superfície invertida; a ação e o fechar usam currentColor a 12% (hover) e 20% (pressionado) como camada, e o foco usa toast-action.',
        },
        {
          subject: 'Medidas locais',
          detail:
            '--ugl-toast-min-height (52px: a ação de 44px com 4px de respiro), --ugl-toast-max-width (a tela menos as margens) e --ugl-toast-travel (8px de entrada).',
        },
        {
          subject: 'Reiniciar a contagem',
          detail:
            'a contagem recomeça quando open volta a true ou quando duration muda. Para trocar a mensagem de um aviso aberto e recomeçar, feche e reabra ou troque a key.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UglDocAnatomy
      zones={[
        { name: 'Região viva', role: 'role="status" + aria-live="polite", sempre presente, sem capturar o ponteiro.', token: '--ugl-z-toast' },
        { name: 'Cápsula', role: 'Superfície invertida com sombra de sobreposição.', token: '--ugl-color-toast-surface · --ugl-elevation-overlay' },
        { name: 'Glifo', role: 'Opcional, decorativo.', token: '--ugl-icon-size-sm' },
        { name: 'Mensagem', role: 'Texto do aviso.', token: '--ugl-font-body-md-*' },
        { name: 'Ação', role: 'Botão de texto de 44px.', token: '--ugl-color-toast-action' },
        { name: 'Fechar', role: 'Botão de 44px com nome acessível.', token: '--ugl-color-toast-text' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os avisos abertos, parados (duration 0) para a inspeção."
    />
    <UglDocStage label="Base, topo, sem ação e com fechar" direction="column" align="flex-start" gap={16}>
      <Frame>
        <Toast open duration={0} icon="delete" message={deletedMessage(3)} actionLabel="Desfazer" onAction={() => undefined} showClose={false} />
      </Frame>
      <Frame>
        <Toast open duration={0} position="top" icon="checkCircle" message={`Adicionado a ${uglAlbums[0].title}`} />
      </Frame>
      <Frame>
        <Toast open duration={0} icon="link" message="Link copiado" onClose={() => undefined} />
      </Frame>
      <Frame>
        <Toast open duration={0} offset={BAR_OFFSET} icon="favoriteFilled" message="Adicionado a Favoritos" actionLabel="Ver" onAction={() => undefined} onClose={() => undefined} />
      </Frame>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Escrever o que já aconteceu, no passado: “Itens recuperados”.',
        'Oferecer “Desfazer” em toda ação destrutiva reversível.',
        'Usar offset para ficar acima da barra de abas ou da barra de seleção.',
        'Manter um único aviso por vez; o novo substitui o anterior.',
      ]}
      donts={[
        'Pedir decisão num aviso: isso é um diálogo de confirmação.',
        'Usar para erro que exige ação: o aviso some.',
        'Colocar mais de uma ação.',
        'Posicionar na janela com position: fixed: o aviso vive dentro da tela.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A superfície se inverte com o tema: roxo profundo no claro, lavanda no escuro."
    />
    <UglDocThemeSwitcher surface="secondary" padding={0}>
      {(theme) => (
        <Frame theme={theme}>
          <Toast open duration={0} icon="delete" message={deletedMessage(1)} actionLabel="Desfazer" onAction={() => undefined} onClose={() => undefined} />
        </Frame>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UglDocPropsTable
      title="Toast"
      rows={[
        { name: 'open', type: 'boolean', description: 'Exibe o aviso. Obrigatório.' },
        { name: 'message', type: 'React.ReactNode', description: 'Mensagem. Obrigatório.' },
        { name: 'icon', type: 'UglIconName', description: 'Glifo antes da mensagem.' },
        { name: 'actionLabel', type: 'string', description: 'Rótulo da ação; aparece com onAction.' },
        { name: 'onAction', type: '() => void', description: 'Ação; em seguida o aviso chama onClose.' },
        { name: 'onClose', type: '() => void', description: 'Fim do tempo, Esc, fechar ou depois da ação.' },
        { name: 'duration', type: 'number', default: '4000', description: 'Milissegundos até fechar; 0 não fecha. Pausa com hover e foco.' },
        { name: 'position', type: "'bottom' | 'top'", default: "'bottom'", description: 'Base ou topo do contêiner.' },
        { name: 'offset', type: 'number', default: '0', description: 'Px somados à área segura.' },
        { name: 'showClose', type: 'boolean', default: 'duration === 0', description: 'Exibe o botão de fechar.' },
        { name: 'closeLabel', type: 'string', default: "'Fechar aviso'", description: 'Nome acessível do fechar.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className / style', type: 'string / CSSProperties', description: 'Classe e estilo da região viva.' },
        { name: '...div', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos da região viva.' },
      ]}
    />
    <UglDocPropsTable
      title="Tipos públicos"
      rows={[{ name: 'UglToastPosition', type: "'bottom' | 'top'", description: 'Posição no contêiner.' }]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Toast> = {
  title: 'Unoogaleria/Componentes/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Exibe o aviso.' },
    message: { control: 'text', description: 'Mensagem.' },
    icon: {
      control: 'select',
      options: [undefined, 'delete', 'checkCircle', 'favoriteFilled', 'link', 'restore', 'hide', 'cloudDone'],
      description: 'Glifo.',
    },
    actionLabel: { control: 'text', description: 'Rótulo da ação.' },
    onAction: { action: 'onAction', description: 'Ação.' },
    onClose: { action: 'onClose', description: 'Fechar.' },
    duration: { control: { type: 'number', min: 0, step: 500 }, description: 'Milissegundos (0 = fica).' },
    position: { control: 'radio', options: ['bottom', 'top'], description: 'Posição.' },
    offset: { control: { type: 'range', min: 0, max: 120, step: 2 }, description: 'Px acima da área segura.' },
    showClose: { control: 'boolean', description: 'Exibe o fechar.' },
    closeLabel: { control: 'text', description: 'Nome acessível do fechar.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    open: true,
    message: deletedMessage(3),
    icon: 'delete',
    actionLabel: 'Desfazer',
    duration: 0,
    position: 'bottom',
    offset: 0,
    showClose: true,
    closeLabel: 'Fechar aviso',
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ToastDocumentationPage />,
};

/**
 * Playground com 100% das props expostas (duration 0, para inspecionar).
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Toast',
  render: (args) => (
    <Frame theme={args.theme} height={240}>
      <Toast {...args} />
    </Frame>
  ),
};

/**
 * Selecionar, excluir e desfazer na biblioteca, com o aviso acima da barra.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: excluir e desfazer',
  parameters: { layout: 'centered' },
  render: () => (
    <PhoneFrame scale={0.75} ariaLabel="Galeria — excluir e desfazer">
      <LibraryScreen />
    </PhoneFrame>
  ),
};

/**
 * Com ação, sem ação, com fechar e no topo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Frame>
        <Toast open duration={0} icon="delete" message={deletedMessage(3)} actionLabel="Desfazer" onAction={() => undefined} showClose={false} />
      </Frame>
      <Frame>
        <Toast open duration={0} icon="cloudDone" message="Cópia salva na nuvem" showClose={false} />
      </Frame>
      <Frame>
        <Toast open duration={0} position="top" icon="hide" message="Foto ocultada" actionLabel="Desfazer" onAction={() => undefined} onClose={() => undefined} />
      </Frame>
    </div>
  ),
};

/**
 * Fechado (só a região viva), aberto e acima de uma barra (`offset`).
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Frame>
        <Toast open={false} message="Invisível" />
      </Frame>
      <Frame>
        <Toast open duration={0} message="Aberto, sem glifo" />
      </Frame>
      <Frame>
        <Toast open duration={0} offset={BAR_OFFSET} icon="checkCircle" message="Acima da barra de 50px" />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: BAR_OFFSET, background: 'var(--ugl-color-surface-bar)', boxShadow: 'var(--ugl-elevation-hairline-top)' }} />
      </Frame>
    </div>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <Frame key={theme} theme={theme}>
          <Toast open duration={0} icon="delete" message={deletedMessage(3)} actionLabel="Desfazer" onAction={() => undefined} onClose={() => undefined} />
        </Frame>
      ))}
    </div>
  ),
};

/**
 * Interação: a região viva existe antes de abrir; "Desfazer" chama `onAction`
 * e fecha; Esc fecha; o fechar aparece quando `duration` é 0.
 */
export const DesfazerEFechar: Story = {
  name: 'Interação: desfazer e fechar',
  args: { onAction: fn(), onClose: fn() },
  render: (args) => <ToastDemo duration={0} onAction={args.onAction} onClose={args.onClose} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByRole('status');
    await expect(region).toHaveAttribute('aria-live', 'polite');
    await expect(region).toBeEmptyDOMElement();

    const trigger = canvas.getByRole('button', { name: 'Excluir 3 itens' });
    await userEvent.click(trigger);
    await expect(region).toHaveTextContent(deletedMessage(3));
    await expect(trigger).toHaveFocus();

    await userEvent.click(within(region).getByRole('button', { name: 'Desfazer' }));
    await expect(args.onAction).toHaveBeenCalledTimes(1);
    await expect(args.onClose).toHaveBeenCalledTimes(1);
    await expect(region).toBeEmptyDOMElement();

    await userEvent.click(trigger);
    const close = within(region).getByRole('button', { name: 'Fechar aviso' });
    close.focus();
    await userEvent.keyboard('{Escape}');
    await expect(args.onClose).toHaveBeenCalledTimes(2);
    await expect(region).toBeEmptyDOMElement();

    await userEvent.click(trigger);
    await userEvent.click(within(region).getByRole('button', { name: 'Fechar aviso' }));
    await expect(args.onClose).toHaveBeenCalledTimes(3);
    await expect(args.onAction).toHaveBeenCalledTimes(1);
  },
};

/**
 * Interação: o aviso fecha sozinho, mas não enquanto o foco está nele.
 */
export const FechaSozinho: Story = {
  name: 'Interação: tempo e pausa no foco',
  args: { onClose: fn() },
  render: (args) => <ToastDemo duration={400} onAction={() => undefined} onClose={args.onClose} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByRole('status');
    const trigger = canvas.getByRole('button', { name: 'Excluir 3 itens' });

    await userEvent.click(trigger);
    await expect(region).toHaveTextContent(deletedMessage(3));
    await waitFor(() => expect(region).toBeEmptyDOMElement(), { timeout: 2000 });
    await expect(args.onClose).toHaveBeenCalledTimes(1);

    await userEvent.click(trigger);
    within(region).getByRole('button', { name: 'Desfazer' }).focus();
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    await expect(region).toHaveTextContent(deletedMessage(3));
    await expect(args.onClose).toHaveBeenCalledTimes(1);

    trigger.focus();
    await waitFor(() => expect(region).toBeEmptyDOMElement(), { timeout: 2000 });
    await expect(args.onClose).toHaveBeenCalledTimes(2);
  },
};
