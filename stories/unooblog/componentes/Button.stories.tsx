import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from '../../../src/unooblog/components/Button';
import type { UblButtonVariant } from '../../../src/unooblog/components/Button';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocStage,
  UblDocPractices,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';

const BAR = '#716C98';

const VARIANTS: { variant: UblButtonVariant; label: string }[] = [
  { variant: 'primary', label: 'Assinar a newsletter' },
  { variant: 'secondary', label: 'Seguir autor' },
  { variant: 'ghost', label: 'Ver todos os tópicos' },
  { variant: 'danger', label: 'Excluir comentário' },
];

type ForcedState = 'default' | 'hover' | 'focus' | 'active' | 'disabled';

const STATES: { state: ForcedState; label: string }[] = [
  { state: 'default', label: 'Padrão' },
  { state: 'hover', label: 'Hover' },
  { state: 'focus', label: 'Foco' },
  { state: 'active', label: 'Ativo' },
  { state: 'disabled', label: 'Desabilitado' },
];

/**
 * Estados forçados SÓ para a documentação: o componente real recebe uma classe
 * que repete o efeito do pseudo-estado, com os mesmos tokens do Button.css, para
 * que a matriz de variantes e estados possa ser vista de uma vez, sem o ponteiro.
 */
const ForcedStateStyles: React.FC = () => (
  <style>{`
    .ubl-doc-state--hover::after { background-color: var(--ubl-color-state-hover); }
    .ubl-doc-state--hover.ubl-button--ghost .ubl-button__label {
      text-decoration: underline;
      text-underline-offset: var(--ubl-spacing-3xs);
    }
    .ubl-doc-state--focus { outline: 2px solid var(--ubl-color-focus-ring); outline-offset: 2px; }
    .ubl-doc-state--active::after { background-color: var(--ubl-color-state-pressed); }
    .ubl-doc-state--active.ubl-button--primary { background-color: var(--ubl-color-action-pressed); }
  `}</style>
);

/**
 * Matriz de quatro variantes (linhas) por cinco estados (colunas), com o
 * componente real.
 */
const StateMatrix: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => (
  <div
    data-ubl-theme={theme}
    style={{ display: 'grid', gridTemplateColumns: 'repeat(5, max-content)', gap: '16px 24px', alignItems: 'center' }}
  >
    <ForcedStateStyles />
    {STATES.map(({ state, label }) => (
      <div
        key={state}
        style={{ fontFamily: 'var(--ubl-font-sans)', fontSize: 'var(--ubl-font-caption-size)', fontWeight: 600, color: 'var(--ubl-color-text-secondary)' }}
      >
        {label}
      </div>
    ))}
    {VARIANTS.map(({ variant, label }) => (
      <React.Fragment key={variant}>
        {STATES.map(({ state }) => (
          <Button
            key={state}
            variant={variant}
            disabled={state === 'disabled'}
            className={state === 'default' || state === 'disabled' ? undefined : `ubl-doc-state--${state}`}
            tabIndex={state === 'default' ? undefined : -1}
          >
            {label}
          </Button>
        ))}
      </React.Fragment>
    ))}
  </div>
);

/** Espiões das estórias de interação. */
const readSpy = fn();
const disabledSpy = fn();
const submitSpy = fn();

/**
 * Página de documentação rica do componente Button.
 */
const ButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Fundação"
      title="Button"
      description="Botão em cápsula do blog, em quatro variantes — preenchido, contorno, texto sublinhado no hover e destrutivo — e três alturas: 32, 44 e 52px. Com href vira um link com o mesmo desenho. Cinco estados: padrão, hover, foco, ativo e desabilitado."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma variante por papel, não por gosto."
    />
    <UblDocGrid>
      <UblDocCard icon="🟣" title="primary">
        A ação principal do bloco: “Assinar a newsletter”, “Comentar”. Uma por tela ou por
        cartão.
      </UblDocCard>
      <UblDocCard icon="⚪" title="secondary">
        A ação alternativa, com contorno: “Seguir autor”, “Cancelar”.
      </UblDocCard>
      <UblDocCard icon="✍️" title="ghost">
        Só texto, sublinhado no hover: ações de apoio como “Ver todos os tópicos” e links
        de rodapé de seção.
      </UblDocCard>
      <UblDocCard icon="🔴" title="danger">
        A ação que apaga ou encerra: “Excluir comentário”, “Sair da conta”. O verbo do rótulo
        diz o que acontece; a cor não carrega o aviso sozinha.
      </UblDocCard>
      <UblDocCard icon="🔗" title="Botão-link">
        Com <code>href</code>, o componente é um <code>&lt;a&gt;</code> com o visual de botão
        — navegação continua sendo link para o leitor de tela e para o teclado.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="Button"
      layout="Cápsula · 32/44/52px"
      specs={[
        { label: 'Alturas', value: 'sm 32px · md 44px (--ubl-touch-target) · lg 52px' },
        { label: 'Recuo lateral', value: 'sm 16px · md 20px · lg 24px' },
        { label: 'Forma', value: '--ubl-radius-full (cápsula; o blog é macio)' },
        { label: 'Rótulo', value: 'sm label 14/20px · md e lg label-lg 16/24px' },
        { label: 'Glifo', value: 'xs 16px · sm 20px · md 24px, por altura' },
        { label: 'primary', value: 'action-primary · rótulo text-on-action · ativo: action-pressed' },
        { label: 'secondary', value: 'contorno border-control · rótulo text-accent' },
        { label: 'ghost', value: 'rótulo text-accent · sublinhado no hover e no foco' },
        { label: 'danger', value: 'action-danger · rótulo text-on-danger · pressionado pela camada translúcida' },
        { label: 'Foco', value: 'contorno de 2px em focus-ring, afastado 2px' },
        { label: 'Origem', value: 'sem arquivo de design: parte do Button do Unoojornal, com cápsula e a variante danger' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Cápsula em vez de retângulo',
          detail:
            'o blog é macio: o botão é uma cápsula (--ubl-radius-full), com o recuo lateral crescendo um degrau (16, 20 e 24px) para o rótulo não parecer apertado. O jornal usa raio de 4px; esta é a principal diferença de desenho entre os dois Buttons.',
        },
        {
          subject: 'Variante danger',
          detail:
            'o jornal não tem botão destrutivo; o blog precisa dele (excluir comentário, sair). Usa action-danger e text-on-danger, que existem nos dois temas. Não há token de pressionado para o vermelho, então vale a camada translúcida state-pressed do ::after. O desabilitado cai em action-disabled, como o primário, para não parecer um alerta ativo.',
        },
        {
          subject: 'Realce em camada',
          detail:
            'hover e pressionado são uma camada ::after em state-hover/state-pressed, que vale sobre qualquer preenchimento sem derivar cor por cálculo; o primário ainda troca para action-pressed.',
        },
        {
          subject: 'Desabilitado',
          detail:
            'o primário e o destrutivo usam action-disabled; o contorno e o texto esmaecem a 40%. O estado é isento de contraste pela WCAG. O botão-link desabilitado perde o href e ganha aria-disabled, porque <a> não tem disabled.',
        },
        {
          subject: 'type="button" por padrão',
          detail: 'nenhum Button dentro de um formulário envia sem querer; passe type="submit" quando for a intenção.',
        },
        {
          subject: 'Alturas de 32 e 52px como medidas locais',
          detail:
            'a régua do módulo só publica o alvo de 44px (--ubl-touch-target); o pequeno e o grande são as propriedades locais --ubl-button-height-sm e --ubl-button-height-lg, no topo do Button.css.',
        },
        {
          subject: 'Contorno do secundário em border-control',
          detail:
            'o limite de um controle precisa de 3:1 contra a página (WCAG 1.4.11); border-default media cerca de 1,4:1 e foi trocado por border-control (≥ 4,5:1 nos dois temas). O rótulo continua em text-accent.',
        },
        {
          subject: 'Server Component',
          detail: 'só recebe props e renderiza; onClick vai direto ao elemento nativo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocAnatomy
      zones={[
        { name: 'Contêiner (button ou a)', role: 'Alvo em cápsula com type="button" (ou href) e o preenchimento da variante.', token: '--ubl-radius-full' },
        { name: 'Glifo inicial', role: 'iconStart, decorativo, na cor do rótulo.', token: 'currentColor' },
        { name: 'Rótulo', role: 'Nome acessível; trunca com reticências.', token: '--ubl-font-label-*' },
        { name: 'Glifo final', role: 'iconEnd, decorativo.', token: 'currentColor' },
        { name: 'Camada de realce', role: '::after com state-hover e state-pressed.', token: '--ubl-color-state-*' },
        { name: 'Anel de foco', role: 'Contorno de 2px, afastado 2px, só no foco por teclado.', token: '--ubl-color-focus-ring' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real: 4 variantes × 5 estados (hover, foco e ativo forçados só na documentação), alturas, glifos e largura total."
    />
    <UblDocStage label="Variantes × estados" align="flex-start" padding={24}>
      <StateMatrix />
    </UblDocStage>
    <UblDocStage label="Alturas e glifos" gap={12}>
      <Button size="sm" iconStart="add">
        Pequeno
      </Button>
      <Button size="md" iconStart="add">
        Médio
      </Button>
      <Button size="lg" iconStart="add">
        Grande
      </Button>
      <Button variant="secondary" iconEnd="arrowForward">
        Próximo post
      </Button>
      <Button variant="ghost" iconEnd="chevronRight">
        Ver todos
      </Button>
      <Button variant="danger" iconStart="delete">
        Excluir
      </Button>
    </UblDocStage>
    <UblDocStage label="Botão-link e botão-link desabilitado" gap={12}>
      <Button href="#post">Abrir o post</Button>
      <Button href="#post" variant="secondary" disabled>
        Link desabilitado
      </Button>
    </UblDocStage>
    <UblDocStage label="fullWidth" align="stretch" direction="column" gap={12} width={390}>
      <Button fullWidth size="lg">
        Publicar comentário
      </Button>
      <Button fullWidth size="lg" variant="secondary">
        Cancelar
      </Button>
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Usar um único primary por bloco de decisão.',
        'Escrever o rótulo como verbo: “Assinar a newsletter”, “Publicar comentário”.',
        'Reservar o danger para o que apaga ou encerra, com o verbo no rótulo.',
        'Usar href quando o clique navega; onClick quando executa uma ação.',
        'Usar ghost para ações de apoio que não devem competir com o título.',
      ]}
      donts={[
        'Pôr só um glifo num Button: isso é o IconButton, com nome acessível.',
        'Usar dois primary lado a lado.',
        'Usar o danger como botão de ação comum só porque é vermelho.',
        'Simular um link com onClick e window.location: use href.',
        'Cortar o rótulo de propósito com reticências.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Todas as variantes acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher>
      {() => (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {VARIANTS.map(({ variant, label }) => (
            <Button key={variant} variant={variant}>
              {label}
            </Button>
          ))}
          <Button disabled>Desabilitado</Button>
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="Button"
      rows={[
        { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: 'Variante visual.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Altura de 32, 44 ou 52px.' },
        { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Ocupa toda a largura.' },
        { name: 'iconStart', type: 'UblIconName', description: 'Glifo antes do rótulo.' },
        { name: 'iconEnd', type: 'UblIconName', description: 'Glifo depois do rótulo.' },
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo.' },
        { name: 'href', type: 'string', description: 'Com href, renderiza um <a> com o visual de botão.' },
        { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Tipo nativo (só sem href).' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o botão; no link, remove o href e marca aria-disabled.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...rest', type: 'ButtonHTMLAttributes | AnchorHTMLAttributes', description: 'Demais atributos nativos (onClick, aria-*, target, rel).' },
      ]}
    />
    <UblDocPropsTable
      title="Tipos públicos"
      rows={[
        { name: 'UblButtonVariant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", description: 'As quatro variantes.' },
        { name: 'UblButtonSize', type: "'sm' | 'md' | 'lg'", description: 'As três alturas.' },
        { name: 'UblButtonProps', type: 'UblButtonAsButtonProps | UblButtonAsLinkProps', description: 'União discriminada por href.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Button> = {
  title: 'Unooblog/Componentes/Button',
  component: Button,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Rótulo.' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Variante visual.',
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Altura.' },
    fullWidth: { control: 'boolean', description: 'Largura total.' },
    iconStart: {
      control: 'select',
      options: [undefined, 'add', 'bookmark', 'share', 'edit', 'send', 'mail', 'delete'],
      description: 'Glifo antes.',
    },
    iconEnd: {
      control: 'select',
      options: [undefined, 'arrowForward', 'chevronRight', 'openInNew'],
      description: 'Glifo depois.',
    },
    href: { control: 'text', description: 'Com href, vira link (<a>).' },
    type: { control: 'radio', options: ['button', 'submit', 'reset'], description: 'Tipo nativo (sem href).' },
    disabled: { control: 'boolean', description: 'Desabilita.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    onClick: { action: 'onClick', description: 'Clique.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    children: 'Assinar a newsletter',
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    iconEnd: 'arrowForward',
    type: 'button',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ButtonDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Button',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} padding={40}>
      <Button {...args} />
    </UblDocStage>
  ),
};

/**
 * Matriz de quatro variantes por cinco estados. Hover, foco e ativo são
 * forçados só aqui, com os mesmos tokens do componente.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: 4 variantes × 5 estados',
  render: () => (
    <UblDocStage align="flex-start" padding={32}>
      <StateMatrix />
    </UblDocStage>
  ),
};

/**
 * As quatro variantes.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UblDocStage gap={12}>
      {VARIANTS.map(({ variant, label }) => (
        <Button key={variant} variant={variant}>
          {label}
        </Button>
      ))}
    </UblDocStage>
  ),
};

/**
 * As três alturas, com glifo.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage gap={12}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Button key={size} size={size} iconStart="add">
          {size === 'sm' ? 'Pequeno · 32px' : size === 'md' ? 'Médio · 44px' : 'Grande · 52px'}
        </Button>
      ))}
    </UblDocStage>
  ),
};

/**
 * Habilitado e desabilitado em cada variante, mais o botão-link.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UblDocStage label="Habilitado" gap={12}>
        {VARIANTS.map(({ variant, label }) => (
          <Button key={variant} variant={variant}>
            {label}
          </Button>
        ))}
      </UblDocStage>
      <UblDocStage label="Desabilitado" gap={12}>
        {VARIANTS.map(({ variant, label }) => (
          <Button key={variant} variant={variant} disabled>
            {label}
          </Button>
        ))}
      </UblDocStage>
      <UblDocStage label="Botão-link" gap={12}>
        <Button href="#post">Abrir o post</Button>
        <Button href="#post" variant="secondary" disabled>
          Link desabilitado
        </Button>
      </UblDocStage>
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
        <UblDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} align="flex-start">
          <StateMatrix theme={theme} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: clique e teclado acionam; o foco chega por Tab; desabilitado não
 * dispara `onClick`; dentro de um formulário o padrão `type="button"` não envia.
 */
export const Acionamento: Story = {
  name: 'Interação: foco, teclado e desabilitado',
  render: () => (
    <UblDocStage gap={12}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitSpy();
        }}
        style={{ display: 'flex', gap: 12, alignItems: 'center' }}
      >
        <Button onClick={readSpy}>Ler o post</Button>
        <Button variant="secondary" disabled onClick={disabledSpy}>
          Indisponível
        </Button>
        <Button variant="ghost" type="submit">
          Enviar
        </Button>
      </form>
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    readSpy.mockClear();
    disabledSpy.mockClear();
    submitSpy.mockClear();
    const canvas = within(canvasElement);

    const read = canvas.getByRole('button', { name: 'Ler o post' });
    await expect(read).toHaveAttribute('type', 'button');

    // Foco por teclado: Tab chega ao primeiro botão habilitado
    await userEvent.tab();
    await expect(read).toHaveFocus();

    // Enter e Espaço acionam
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(readSpy).toHaveBeenCalledTimes(2);
    await expect(submitSpy).not.toHaveBeenCalled();

    // O desabilitado não recebe foco nem dispara onClick
    const disabled = canvas.getByRole('button', { name: 'Indisponível' });
    await expect(disabled).toBeDisabled();
    await userEvent.click(disabled);
    await expect(disabledSpy).not.toHaveBeenCalled();

    // Clicar no desabilitado tira o foco do documento; devolve-o ao primeiro botão
    // e então o Tab pula o desabilitado e vai ao "Enviar"
    read.focus();
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Enviar' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(submitSpy).toHaveBeenCalledTimes(1);
  },
};

/**
 * Interação do botão-link: tem papel de link, vai ao destino e, desabilitado,
 * perde o href e fica fora da ordem de tabulação dos links ativos.
 */
export const BotaoLink: Story = {
  name: 'Interação: botão-link',
  render: () => (
    <UblDocStage gap={12}>
      <Button href="#post">Abrir o post</Button>
      <Button href="#post" variant="secondary" disabled onClick={disabledSpy}>
        Link desabilitado
      </Button>
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    disabledSpy.mockClear();
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link', { name: 'Abrir o post' });
    await expect(link).toHaveAttribute('href', '#post');

    const disabled = canvas.getByText('Link desabilitado').closest('a');
    await expect(disabled).toHaveAttribute('aria-disabled', 'true');
    await expect(disabled).not.toHaveAttribute('href');
    await userEvent.click(disabled as HTMLElement);
    await expect(disabledSpy).not.toHaveBeenCalled();
  },
};
