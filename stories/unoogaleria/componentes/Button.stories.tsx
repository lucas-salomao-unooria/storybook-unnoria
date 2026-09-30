import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from '../../../src/unoogaleria/components/Button';
import type { UglButtonVariant } from '../../../src/unoogaleria/components/Button';
import { EmptyState } from '../../../src/unoogaleria/components/EmptyState';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { uglDaysLeft, uglFormatCount } from '../../../src/unoogaleria/media';
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
import { uglDemoNow, uglTrashItems } from '../fixtures';

const BAR = '#716C98';

const VARIANTS: { variant: UglButtonVariant; label: string }[] = [
  { variant: 'primary', label: 'Adicionar fotos' },
  { variant: 'secondary', label: 'Importar' },
  { variant: 'tertiary', label: 'Selecionar' },
  { variant: 'danger', label: 'Apagar de vez' },
  { variant: 'danger-tertiary', label: 'Apagar tudo' },
];

/** Espiões da estória de interação. */
const saveSpy = fn();
const submitSpy = fn();

/**
 * "Excluídos recentemente" no aparelho: ações de barra em texto e as duas
 * ações de lote no rodapé.
 */
const TrashScreen: React.FC = () => (
  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--ugl-color-background-primary)' }}>
    <header
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 'calc(var(--ugl-safe-area-top) + var(--ugl-spacing-xs)) var(--ugl-gutter) var(--ugl-spacing-xs)',
      }}
    >
      <div>
        <p className="ugl-text ugl-text--caption-strong ugl-text--secondary">{uglFormatCount(uglTrashItems)}</p>
        <h1 className="ugl-text ugl-text--heading">Excluídos recentemente</h1>
      </div>
      <Button variant="tertiary" size="sm">
        Selecionar
      </Button>
    </header>
    <ul
      aria-label="Itens excluídos"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--ugl-grid-gap)', margin: 0, padding: 0, listStyle: 'none' }}
    >
      {uglTrashItems.map((item) => {
        const days = uglDaysLeft(item.deletedAt ?? uglDemoNow, { now: uglDemoNow });
        return (
          <li key={item.id} style={{ position: 'relative', aspectRatio: '1 / 1', background: 'var(--ugl-color-background-tertiary)' }}>
            <img src={item.src} alt={`${item.alt}, ${days} ${days === 1 ? 'dia restante' : 'dias restantes'}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </li>
        );
      })}
    </ul>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <EmptyState
        icon="delete"
        headingLevel={2}
        title="Itens ficam aqui por 30 dias"
        description="Depois disso, saem de vez. Recupere o que quiser manter."
        action={
          <Button variant="secondary" iconStart="restore">
            Recuperar tudo
          </Button>
        }
      />
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 'var(--ugl-spacing-xs) var(--ugl-spacing-xs) calc(var(--ugl-safe-area-bottom) + var(--ugl-spacing-xs))',
        background: 'var(--ugl-color-surface-bar)',
        boxShadow: 'var(--ugl-elevation-hairline-top)',
      }}
    >
      <Button variant="tertiary">Recuperar tudo</Button>
      <Button variant="danger-tertiary">Apagar tudo</Button>
    </div>
  </div>
);

/**
 * Página de documentação rica do componente Button.
 */
const ButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Ações"
      title="Button"
      description="Botão de texto em cápsula, com glifo opcional antes ou depois do rótulo, em seis variantes — incluindo as duas destrutivas e a imersiva, que vive sobre o visualizador e o editor — e três alturas: 32, 44 e 52px."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma variante por papel, não por gosto."
    />
    <UglDocGrid>
      <UglDocCard icon="🟣" title="primary">
        A ação principal da tela: “Adicionar fotos”, “Criar álbum”. Uma por tela.
      </UglDocCard>
      <UglDocCard icon="⚪" title="secondary e tertiary">
        O contorno para a ação alternativa; o texto puro para as ações de barra (“Selecionar”,
        “Cancelar”, “Concluído”).
      </UglDocCard>
      <UglDocCard icon="🟥" title="danger e danger-tertiary">
        Preenchido para “Apagar de vez” num diálogo; texto para “Apagar tudo” e “Excluir” em
        barras e folhas.
      </UglDocCard>
      <UglDocCard icon="🌑" title="immersive">
        Sobre a superfície imersiva em qualquer tema: “Tentar de novo” num vídeo que não abriu,
        “Editar” no visualizador.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="Button"
      layout="Cápsula · 32/44/52px"
      specs={[
        { label: 'Alturas', value: 'sm 32px · md 44px (--ugl-touch-target) · lg 52px' },
        { label: 'Recuo lateral', value: 'sm 12px · md 16px · lg 20px' },
        { label: 'Forma', value: '--ugl-radius-full' },
        { label: 'Rótulo', value: 'label 14/20px (lg: title-sm 16/24px)' },
        { label: 'Glifo', value: 'xs 16px · sm 20px · md 24px, por altura' },
        { label: 'primary', value: 'action-primary · pressed: action-pressed' },
        { label: 'secondary', value: 'contorno border-default · rótulo text-accent' },
        { label: 'danger', value: 'action-danger · rótulo text-on-danger' },
        { label: 'immersive', value: 'immersive-control · immersive-text' },
        { label: 'Foco', value: 'contorno de 2px em focus-ring (immersive-accent no imersivo)' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Realce em camada',
          detail:
            'hover e pressionado são uma camada ::after em state-hover/state-pressed, que vale sobre qualquer preenchimento sem derivar cor por cálculo; o primário ainda troca para action-pressed.',
        },
        {
          subject: 'type="button" por padrão',
          detail: 'nenhum Button dentro de um formulário envia sem querer; passe type="submit" quando for a intenção.',
        },
        {
          subject: 'Desabilitado',
          detail:
            'o primário usa action-disabled; as demais variantes esmaecem a 40%. O estado é isento de contraste pela WCAG, mas o rótulo continua legível o bastante para dizer o que falta.',
        },
        {
          subject: 'Alturas de 32 e 52px como medidas locais',
          detail:
            'a régua do módulo só publica o alvo de 44px (--ugl-touch-target); o pequeno e o grande são as propriedades locais --ugl-button-height-sm e --ugl-button-height-lg, declaradas no topo do Button.css.',
        },
        {
          subject: 'Server Component',
          detail: 'só recebe props e renderiza; onClick vai direto ao <button> nativo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UglDocAnatomy
      zones={[
        { name: 'Cápsula (button)', role: 'Alvo com type="button" e o preenchimento da variante.', token: '--ugl-radius-full' },
        { name: 'Glifo inicial', role: 'iconStart, decorativo, na cor do rótulo.', token: 'currentColor' },
        { name: 'Rótulo', role: 'Nome acessível; trunca com reticências.', token: '--ugl-font-label-*' },
        { name: 'Glifo final', role: 'iconEnd, decorativo.', token: 'currentColor' },
        { name: 'Camada de realce', role: '::after com state-hover e state-pressed.', token: '--ugl-color-state-*' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real, em todas as variantes, alturas e estados."
    />
    <UglDocStage label="Variantes" gap={12}>
      {VARIANTS.map(({ variant, label }) => (
        <Button key={variant} variant={variant}>
          {label}
        </Button>
      ))}
    </UglDocStage>
    <UglDocStage label="immersive" surface="immersive" gap={12}>
      <Button variant="immersive" iconStart="edit">
        Editar
      </Button>
      <Button variant="immersive" iconStart="replay">
        Tentar de novo
      </Button>
      <Button variant="immersive" disabled>
        Indisponível
      </Button>
    </UglDocStage>
    <UglDocStage label="Alturas e glifos" gap={12}>
      <Button size="sm" iconStart="add">
        Pequeno
      </Button>
      <Button size="md" iconStart="add">
        Médio
      </Button>
      <Button size="lg" iconStart="add">
        Grande
      </Button>
      <Button variant="secondary" iconEnd="chevronRight">
        Ver tudo
      </Button>
    </UglDocStage>
    <UglDocStage label="Desabilitados" gap={12}>
      {VARIANTS.map(({ variant, label }) => (
        <Button key={variant} variant={variant} disabled>
          {label}
        </Button>
      ))}
    </UglDocStage>
    <UglDocStage label="fullWidth" align="stretch" direction="column" gap={12} width={390}>
      <Button fullWidth size="lg">
        Criar álbum
      </Button>
      <Button fullWidth size="lg" variant="secondary">
        Cancelar
      </Button>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Usar um único primary por tela.',
        'Escrever o rótulo como verbo: “Recuperar tudo”, “Apagar de vez”.',
        'Usar tertiary nas barras, onde o texto já é a ação.',
        'Usar immersive sobre o visualizador e o editor, em qualquer tema.',
      ]}
      donts={[
        'Usar danger para ações reversíveis: aí é danger-tertiary com “Desfazer” no aviso.',
        'Colocar só um glifo num Button: isso é o IconButton, com nome acessível.',
        'Usar primary sobre a superfície imersiva.',
        'Trocar o rótulo por reticências de propósito.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Todas as variantes, menos immersive, acompanham data-ugl-theme."
    />
    <UglDocThemeSwitcher>
      {() => (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {VARIANTS.map(({ variant, label }) => (
            <Button key={variant} variant={variant}>
              {label}
            </Button>
          ))}
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UglDocPropsTable
      title="Button"
      rows={[
        { name: 'variant', type: "'primary' | 'secondary' | 'tertiary' | 'danger' | 'danger-tertiary' | 'immersive'", default: "'primary'", description: 'Variante visual.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Altura de 32, 44 ou 52px.' },
        { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Ocupa toda a largura.' },
        { name: 'iconStart', type: 'UglIconName', description: 'Glifo antes do rótulo.' },
        { name: 'iconEnd', type: 'UglIconName', description: 'Glifo depois do rótulo.' },
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo.' },
        { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Tipo nativo.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o botão.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...button', type: 'React.ButtonHTMLAttributes<HTMLButtonElement>', description: 'Demais atributos nativos (onClick, aria-*).' },
      ]}
    />
    <UglDocPropsTable
      title="Tipos públicos"
      rows={[
        { name: 'UglButtonVariant', type: 'union', description: 'As seis variantes.' },
        { name: 'UglButtonSize', type: "'sm' | 'md' | 'lg'", description: 'As três alturas.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Button> = {
  title: 'Unoogaleria/Componentes/Button',
  component: Button,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Rótulo.' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'danger-tertiary', 'immersive'],
      description: 'Variante visual.',
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Altura.' },
    fullWidth: { control: 'boolean', description: 'Largura total.' },
    iconStart: {
      control: 'select',
      options: [undefined, 'add', 'addPhoto', 'share', 'edit', 'delete', 'restore', 'download'],
      description: 'Glifo antes.',
    },
    iconEnd: { control: 'select', options: [undefined, 'chevronRight', 'expand'], description: 'Glifo depois.' },
    type: { control: 'radio', options: ['button', 'submit', 'reset'], description: 'Tipo nativo.' },
    disabled: { control: 'boolean', description: 'Desabilita.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    onClick: { action: 'onClick', description: 'Clique.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    children: 'Adicionar fotos',
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    iconStart: 'addPhoto',
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
    <UglDocStage theme={args.theme ?? 'light'} surface={args.variant === 'immersive' ? 'immersive' : 'primary'} padding={40}>
      <Button {...args} />
    </UglDocStage>
  ),
};

/**
 * "Excluídos recentemente" no aparelho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: excluídos recentemente',
  parameters: { layout: 'centered' },
  render: () => (
    <PhoneFrame scale={0.75} ariaLabel="Galeria — excluídos recentemente">
      <TrashScreen />
    </PhoneFrame>
  ),
};

/**
 * As seis variantes.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UglDocStage gap={12}>
        {VARIANTS.map(({ variant, label }) => (
          <Button key={variant} variant={variant}>
            {label}
          </Button>
        ))}
      </UglDocStage>
      <UglDocStage surface="immersive" gap={12}>
        <Button variant="immersive" iconStart="edit">
          Editar
        </Button>
      </UglDocStage>
    </div>
  ),
};

/**
 * As três alturas, com glifo.
 */
export const Tamanhos: Story = {
  render: () => (
    <UglDocStage gap={12}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Button key={size} size={size} iconStart="add">
          {size === 'sm' ? 'Pequeno · 32px' : size === 'md' ? 'Médio · 44px' : 'Grande · 52px'}
        </Button>
      ))}
    </UglDocStage>
  ),
};

/**
 * Habilitado e desabilitado em cada variante.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UglDocStage label="Habilitado" gap={12}>
        {VARIANTS.map(({ variant, label }) => (
          <Button key={variant} variant={variant}>
            {label}
          </Button>
        ))}
      </UglDocStage>
      <UglDocStage label="Desabilitado" gap={12}>
        {VARIANTS.map(({ variant, label }) => (
          <Button key={variant} variant={variant} disabled>
            {label}
          </Button>
        ))}
      </UglDocStage>
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
        <UglDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} gap={12}>
          {VARIANTS.map(({ variant, label }) => (
            <Button key={variant} variant={variant}>
              {label}
            </Button>
          ))}
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: clique e teclado acionam; desabilitado não; dentro de um
 * formulário o padrão `type="button"` não envia.
 */
export const Acionamento: Story = {
  name: 'Interação: clique, teclado e formulário',
  render: () => (
    <UglDocStage gap={12}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitSpy();
        }}
        style={{ display: 'flex', gap: 12 }}
      >
        <Button onClick={saveSpy}>Salvar</Button>
        <Button variant="secondary" disabled onClick={saveSpy}>
          Indisponível
        </Button>
        <Button variant="tertiary" type="submit">
          Enviar
        </Button>
      </form>
    </UglDocStage>
  ),
  play: async ({ canvasElement }) => {
    saveSpy.mockClear();
    submitSpy.mockClear();
    const canvas = within(canvasElement);

    const save = canvas.getByRole('button', { name: 'Salvar' });
    await expect(save).toHaveAttribute('type', 'button');
    await userEvent.click(save);
    await expect(saveSpy).toHaveBeenCalledTimes(1);
    await expect(submitSpy).not.toHaveBeenCalled();

    save.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(saveSpy).toHaveBeenCalledTimes(3);

    const disabled = canvas.getByRole('button', { name: 'Indisponível' });
    await expect(disabled).toBeDisabled();
    await userEvent.click(disabled);
    await expect(saveSpy).toHaveBeenCalledTimes(3);

    await userEvent.click(canvas.getByRole('button', { name: 'Enviar' }));
    await expect(submitSpy).toHaveBeenCalledTimes(1);
  },
};
