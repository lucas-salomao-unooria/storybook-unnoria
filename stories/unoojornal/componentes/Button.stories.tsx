import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from '../../../src/unoojornal/components/Button';
import type { UjnButtonVariant } from '../../../src/unoojornal/components/Button';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocGrid,
  UjnDocCard,
  UjnDocSpecs,
  UjnDocDecisions,
  UjnDocAnatomy,
  UjnDocStage,
  UjnDocPractices,
  UjnDocThemeSwitcher,
  UjnDocPropsTable,
} from '../../../.storybook/components';

const BAR = '#716C98';

const VARIANTS: { variant: UjnButtonVariant; label: string }[] = [
  { variant: 'primary', label: 'Ler a reportagem' },
  { variant: 'secondary', label: 'Escrever uma carta' },
  { variant: 'ghost', label: 'Ver todas as matérias' },
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
 * que a matriz do quadro `5:37` possa ser vista de uma vez, sem o ponteiro.
 */
const ForcedStateStyles: React.FC = () => (
  <style>{`
    .ujn-doc-state--hover::after { background-color: var(--ujn-color-state-hover); }
    .ujn-doc-state--hover.ujn-button--ghost .ujn-button__label {
      text-decoration: underline;
      text-underline-offset: var(--ujn-spacing-3xs);
    }
    .ujn-doc-state--focus { outline: 2px solid var(--ujn-color-focus-ring); outline-offset: 2px; }
    .ujn-doc-state--active::after { background-color: var(--ujn-color-state-pressed); }
    .ujn-doc-state--active.ujn-button--primary { background-color: var(--ujn-color-action-pressed); }
  `}</style>
);

/**
 * Matriz do quadro `5:37`: três variantes (linhas) por cinco estados (colunas),
 * com o componente real.
 */
const StateMatrix: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => (
  <div
    data-ujn-theme={theme}
    style={{ display: 'grid', gridTemplateColumns: 'repeat(5, max-content)', gap: '16px 24px', alignItems: 'center' }}
  >
    <ForcedStateStyles />
    {STATES.map(({ state, label }) => (
      <div
        key={state}
        style={{ fontFamily: 'var(--ujn-font-sans)', fontSize: 'var(--ujn-font-caption-size)', fontWeight: 600, color: 'var(--ujn-color-text-secondary)' }}
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
            className={state === 'default' || state === 'disabled' ? undefined : `ujn-doc-state--${state}`}
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
      badgeBrand="Unoojornal"
      category="Componentes • Fundação"
      title="Button"
      description="Botão de texto do jornal, em três variantes — preenchido, contorno e texto sublinhado no hover — e três alturas: 32, 44 e 52px. Com href vira um link com o mesmo desenho. Cinco estados: padrão, hover, foco, ativo e desabilitado."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma variante por papel, não por gosto."
    />
    <UjnDocGrid>
      <UjnDocCard icon="🟣" title="primary">
        A ação principal do bloco: “Ler a reportagem”, “Enviar carta”. Uma por tela ou por
        cartão de destaque.
      </UjnDocCard>
      <UjnDocCard icon="⚪" title="secondary">
        A ação alternativa, com contorno: “Escrever uma carta”, “Ver agenda completa”.
      </UjnDocCard>
      <UjnDocCard icon="✍️" title="ghost">
        Só texto, sublinhado no hover: ações de apoio como “Ver todas as matérias” e links
        de rodapé de seção.
      </UjnDocCard>
      <UjnDocCard icon="🔗" title="Botão-link">
        Com <code>href</code>, o componente é um <code>&lt;a&gt;</code> com o visual de botão
        — navegação continua sendo link para o leitor de tela e para o teclado.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="Button"
      layout="Retângulo de raio 4px · 32/44/52px"
      specs={[
        { label: 'Alturas', value: 'sm 32px · md 44px (--ujn-touch-target) · lg 52px' },
        { label: 'Recuo lateral', value: 'sm 12px · md 16px · lg 20px' },
        { label: 'Forma', value: '--ujn-radius-s (o jornal é reto)' },
        { label: 'Rótulo', value: 'sm label 14/20px · md e lg label-lg 16/24px' },
        { label: 'Glifo', value: 'xs 16px · sm 20px · md 24px, por altura' },
        { label: 'primary', value: 'action-primary · rótulo text-on-action · ativo: action-pressed' },
        { label: 'secondary', value: 'contorno border-control · rótulo text-accent' },
        { label: 'ghost', value: 'rótulo text-accent · sublinhado no hover e no foco' },
        { label: 'Foco', value: 'contorno de 2px em focus-ring, afastado 2px' },
        { label: 'Estrutura herdada', value: 'Figma “Jornal da Escola”, quadro de botões 5:37 (sem valores de cor ou fonte)' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Dourado do Figma → roxo de ação',
          detail:
            'o quadro 5:37 pinta o primário de dourado; a identidade do módulo é a da Plataforma Unooria. Só a estrutura (três variantes, cinco estados, proporções) vem do arquivo; a cor é action-primary, com text-on-action de contraste medido nos dois temas.',
        },
        {
          subject: 'Realce em camada',
          detail:
            'hover e pressionado são uma camada ::after em state-hover/state-pressed, que vale sobre qualquer preenchimento sem derivar cor por cálculo; o primário ainda troca para action-pressed.',
        },
        {
          subject: 'Desabilitado',
          detail:
            'o primário usa action-disabled; o contorno e o texto esmaecem a 40%. O estado é isento de contraste pela WCAG. O botão-link desabilitado perde o href e ganha aria-disabled, porque <a> não tem disabled.',
        },
        {
          subject: 'type="button" por padrão',
          detail: 'nenhum Button dentro de um formulário envia sem querer; passe type="submit" quando for a intenção.',
        },
        {
          subject: 'Alturas de 32 e 52px como medidas locais',
          detail:
            'a régua do módulo só publica o alvo de 44px (--ujn-touch-target); o pequeno e o grande são as propriedades locais --ujn-button-height-sm e --ujn-button-height-lg, no topo do Button.css.',
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
    <UjnDocAnatomy
      zones={[
        { name: 'Contêiner (button ou a)', role: 'Alvo com type="button" (ou href) e o preenchimento da variante.', token: '--ujn-radius-s' },
        { name: 'Glifo inicial', role: 'iconStart, decorativo, na cor do rótulo.', token: 'currentColor' },
        { name: 'Rótulo', role: 'Nome acessível; trunca com reticências.', token: '--ujn-font-label-*' },
        { name: 'Glifo final', role: 'iconEnd, decorativo.', token: 'currentColor' },
        { name: 'Camada de realce', role: '::after com state-hover e state-pressed.', token: '--ujn-color-state-*' },
        { name: 'Anel de foco', role: 'Contorno de 2px, afastado 2px, só no foco por teclado.', token: '--ujn-color-focus-ring' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real: 3 variantes × 5 estados (hover, foco e ativo forçados só na documentação), alturas, glifos e largura total."
    />
    <UjnDocStage label="Variantes × estados (quadro 5:37)" align="flex-start" padding={24}>
      <StateMatrix />
    </UjnDocStage>
    <UjnDocStage label="Alturas e glifos" gap={12}>
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
        Ver agenda
      </Button>
      <Button variant="ghost" iconEnd="chevronRight">
        Ver todas
      </Button>
    </UjnDocStage>
    <UjnDocStage label="Botão-link e botão-link desabilitado" gap={12}>
      <Button href="#materia">Abrir a matéria</Button>
      <Button href="#materia" variant="secondary" disabled>
        Link desabilitado
      </Button>
    </UjnDocStage>
    <UjnDocStage label="fullWidth" align="stretch" direction="column" gap={12} width={390}>
      <Button fullWidth size="lg">
        Enviar carta à redação
      </Button>
      <Button fullWidth size="lg" variant="secondary">
        Cancelar
      </Button>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Usar um único primary por bloco de decisão.',
        'Escrever o rótulo como verbo: “Ler a reportagem”, “Enviar carta”.',
        'Usar href quando o clique navega; onClick quando executa uma ação.',
        'Usar ghost para ações de apoio que não devem competir com o título.',
      ]}
      donts={[
        'Pôr só um glifo num Button: isso é o IconButton, com nome acessível.',
        'Usar dois primary lado a lado.',
        'Simular um link com onClick e window.location: use href.',
        'Cortar o rótulo de propósito com reticências.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Todas as variantes acompanham data-ujn-theme."
    />
    <UjnDocThemeSwitcher>
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
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="Button"
      rows={[
        { name: 'variant', type: "'primary' | 'secondary' | 'ghost'", default: "'primary'", description: 'Variante visual.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Altura de 32, 44 ou 52px.' },
        { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Ocupa toda a largura.' },
        { name: 'iconStart', type: 'UjnIconName', description: 'Glifo antes do rótulo.' },
        { name: 'iconEnd', type: 'UjnIconName', description: 'Glifo depois do rótulo.' },
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo.' },
        { name: 'href', type: 'string', description: 'Com href, renderiza um <a> com o visual de botão.' },
        { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Tipo nativo (só sem href).' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o botão; no link, remove o href e marca aria-disabled.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...rest', type: 'ButtonHTMLAttributes | AnchorHTMLAttributes', description: 'Demais atributos nativos (onClick, aria-*, target, rel).' },
      ]}
    />
    <UjnDocPropsTable
      title="Tipos públicos"
      rows={[
        { name: 'UjnButtonVariant', type: "'primary' | 'secondary' | 'ghost'", description: 'As três variantes.' },
        { name: 'UjnButtonSize', type: "'sm' | 'md' | 'lg'", description: 'As três alturas.' },
        { name: 'UjnButtonProps', type: 'UjnButtonAsButtonProps | UjnButtonAsLinkProps', description: 'União discriminada por href.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Button> = {
  title: 'Unoojornal/Componentes/Button',
  component: Button,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Rótulo.' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Variante visual.',
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Altura.' },
    fullWidth: { control: 'boolean', description: 'Largura total.' },
    iconStart: {
      control: 'select',
      options: [undefined, 'add', 'bookmark', 'share', 'edit', 'send', 'mail'],
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
    children: 'Ler a reportagem',
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
    <UjnDocStage theme={args.theme ?? 'light'} padding={40}>
      <Button {...args} />
    </UjnDocStage>
  ),
};

/**
 * Matriz do quadro de botões `5:37`: três variantes por cinco estados. Hover,
 * foco e ativo são forçados só aqui, com os mesmos tokens do componente.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial: 3 variantes × 5 estados',
  render: () => (
    <UjnDocStage align="flex-start" padding={32}>
      <StateMatrix />
    </UjnDocStage>
  ),
};

/**
 * As três variantes.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UjnDocStage gap={12}>
      {VARIANTS.map(({ variant, label }) => (
        <Button key={variant} variant={variant}>
          {label}
        </Button>
      ))}
    </UjnDocStage>
  ),
};

/**
 * As três alturas, com glifo.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage gap={12}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Button key={size} size={size} iconStart="add">
          {size === 'sm' ? 'Pequeno · 32px' : size === 'md' ? 'Médio · 44px' : 'Grande · 52px'}
        </Button>
      ))}
    </UjnDocStage>
  ),
};

/**
 * Habilitado e desabilitado em cada variante, mais o botão-link.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="Habilitado" gap={12}>
        {VARIANTS.map(({ variant, label }) => (
          <Button key={variant} variant={variant}>
            {label}
          </Button>
        ))}
      </UjnDocStage>
      <UjnDocStage label="Desabilitado" gap={12}>
        {VARIANTS.map(({ variant, label }) => (
          <Button key={variant} variant={variant} disabled>
            {label}
          </Button>
        ))}
      </UjnDocStage>
      <UjnDocStage label="Botão-link" gap={12}>
        <Button href="#materia">Abrir a matéria</Button>
        <Button href="#materia" variant="secondary" disabled>
          Link desabilitado
        </Button>
      </UjnDocStage>
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
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} align="flex-start">
          <StateMatrix theme={theme} />
        </UjnDocStage>
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
    <UjnDocStage gap={12}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitSpy();
        }}
        style={{ display: 'flex', gap: 12, alignItems: 'center' }}
      >
        <Button onClick={readSpy}>Ler a reportagem</Button>
        <Button variant="secondary" disabled onClick={disabledSpy}>
          Indisponível
        </Button>
        <Button variant="ghost" type="submit">
          Enviar
        </Button>
      </form>
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    readSpy.mockClear();
    disabledSpy.mockClear();
    submitSpy.mockClear();
    const canvas = within(canvasElement);

    const read = canvas.getByRole('button', { name: 'Ler a reportagem' });
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
    <UjnDocStage gap={12}>
      <Button href="#materia">Abrir a matéria</Button>
      <Button href="#materia" variant="secondary" disabled onClick={disabledSpy}>
        Link desabilitado
      </Button>
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    disabledSpy.mockClear();
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link', { name: 'Abrir a matéria' });
    await expect(link).toHaveAttribute('href', '#materia');

    const disabled = canvas.getByText('Link desabilitado').closest('a');
    await expect(disabled).toHaveAttribute('aria-disabled', 'true');
    await expect(disabled).not.toHaveAttribute('href');
    await userEvent.click(disabled as HTMLElement);
    await expect(disabledSpy).not.toHaveBeenCalled();
  },
};
