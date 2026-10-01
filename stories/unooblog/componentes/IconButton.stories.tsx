import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { IconButton } from '../../../src/unooblog/components/IconButton';
import type { UblIconButtonVariant } from '../../../src/unooblog/components/IconButton';
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

const VARIANTS: UblIconButtonVariant[] = ['ghost', 'filled', 'outline'];

const VARIANT_LABEL: Record<UblIconButtonVariant, string> = {
  ghost: 'ghost',
  filled: 'filled',
  outline: 'outline',
};

/** Espiões das estórias de interação. */
const shareSpy = fn();
const disabledSpy = fn();

/**
 * Barra de ações de um post: salvar (alternância), compartilhar, copiar o
 * link e copiar o texto — o mesmo arranjo que a `ShareBar` usa.
 */
const ActionBar: React.FC = () => {
  const [saved, setSaved] = useState(false);
  return (
    <div role="toolbar" aria-label="Ações do post" style={{ display: 'flex', gap: 4 }}>
      <IconButton
        icon={saved ? 'bookmarkFilled' : 'bookmark'}
        label={saved ? 'Remover dos posts salvos' : 'Salvar para ler depois'}
        pressed={saved}
        onClick={() => setSaved((current) => !current)}
      />
      <IconButton icon="share" label="Compartilhar" />
      <IconButton icon="link" label="Copiar o endereço do post" />
      <IconButton icon="copy" label="Copiar o texto" />
    </div>
  );
};

/**
 * Página de documentação rica do componente IconButton.
 */
const IconButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Fundação"
      title="IconButton"
      description="Botão circular só com glifo, em três variantes e três tamanhos. O nome acessível é obrigatório; com pressed vira botão de alternância (aria-pressed) e com badge mostra uma contagem."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Quando o glifo basta e o nome vai no rótulo acessível."
    />
    <UblDocGrid>
      <UblDocCard icon="🔖" title="Alternância">
        Salvar o post, curtir, alternar o tema: com <code>pressed</code>, o glifo vira preenchido,
        ganha o roxo de destaque e o botão anuncia <code>aria-pressed</code>.
      </UblDocCard>
      <UblDocCard icon="🔢" title="Contagem">
        <code>badge</code> mostra, por exemplo, quantos posts estão salvos. O número entra no
        nome acessível — não é só visual.
      </UblDocCard>
      <UblDocCard icon="🧭" title="Barras">
        Voltar, buscar, abrir o menu: ações do cabeçalho do site e da barra de leitura, na variante
        ghost.
      </UblDocCard>
      <UblDocCard icon="📏" title="Alvo de 44px">
        O tamanho pequeno desenha 32px, mas o alvo de toque continua com 44px.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="IconButton"
      layout="Círculo · 32/44/56px"
      specs={[
        { label: 'Arestas', value: 'sm 32px (alvo 44px) · md 44px (--ubl-touch-target) · lg 56px' },
        { label: 'Forma', value: '--ubl-radius-full (círculo; o blog é macio)' },
        { label: 'Glifo', value: 'sm 20px · md 24px · lg 32px' },
        { label: 'ghost', value: 'glifo em icon-primary, sem fundo' },
        { label: 'filled', value: 'fill-field · glifo em icon-accent' },
        { label: 'outline', value: 'contorno de 1px em border-control' },
        { label: 'pressed', value: 'glifo preenchido em icon-accent; aria-pressed' },
        { label: 'badge', value: 'selo de 18px, action-primary com text-on-action; 99+' },
        { label: 'Foco', value: 'contorno de 2px em focus-ring, afastado 2px' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Círculo em vez de quadrado',
          detail:
            'o blog é macio: o alvo é circular (--ubl-radius-full) e o realce de hover e pressionado acompanha a forma. O jornal usa raio de 4px. A aresta é a mesma nos dois eixos, então o alvo de toque não muda.',
        },
        {
          subject: 'label obrigatório',
          detail:
            'um botão só com glifo não tem outro nome; o label vira aria-label e a dica de ferramenta (title). Com badge, a contagem é anexada ao nome (“Salvas, 3”).',
        },
        {
          subject: 'Alternância preenche o glifo',
          detail:
            'o estado pressionado não depende só da cor: o glifo muda para a forma preenchida e aria-pressed o anuncia.',
        },
        {
          subject: 'Selo de 18px e “99+”',
          detail:
            'o selo é local (--ubl-icon-button-badge-size) e o rótulo usa o corpo de 12px, o mínimo da escala. Acima de 99 o número vira “99+”.',
        },
        {
          subject: 'Medidas de 32 e 56px locais',
          detail:
            'a régua do módulo só publica o alvo de 44px; o pequeno e o grande são propriedades locais no topo do IconButton.css.',
        },
        {
          subject: 'Server Component',
          detail: 'só recebe props e renderiza; onClick vai direto ao <button> nativo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocAnatomy
      zones={[
        { name: 'Alvo (button)', role: 'Círculo com type="button", aria-label e title.', token: '--ubl-radius-full' },
        { name: 'Glifo', role: 'Ícone do registro, na cor do botão; preenchido quando pressed.', token: '--ubl-icon-size-*' },
        { name: 'Selo de contagem', role: 'Canto superior direito, decorativo (o número está no nome).', token: '--ubl-color-action-primary' },
        { name: 'Camada de realce', role: 'Fundo translúcido no hover e no pressionado.', token: '--ubl-color-state-*' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real, nas três variantes, nos três tamanhos e nos estados de alternância, contagem e desabilitado."
    />
    <UblDocStage label="Variantes" gap={16}>
      {VARIANTS.map((variant) => (
        <IconButton key={variant} icon="share" label={`Compartilhar (${VARIANT_LABEL[variant]})`} variant={variant} />
      ))}
    </UblDocStage>
    <UblDocStage label="Tamanhos: 32, 44 e 56px" gap={16}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <IconButton key={size} icon="bookmark" label={`Salvar (${size})`} variant="outline" size={size} />
      ))}
    </UblDocStage>
    <UblDocStage label="Alternância (pressed)" gap={16}>
      {VARIANTS.map((variant) => (
        <IconButton key={variant} icon="bookmarkFilled" label={`Salvar (${variant})`} variant={variant} pressed />
      ))}
      {VARIANTS.map((variant) => (
        <IconButton key={`off-${variant}`} icon="bookmark" label={`Salvar (${variant}, desligado)`} variant={variant} pressed={false} />
      ))}
    </UblDocStage>
    <UblDocStage label="Contagem (badge)" gap={16}>
      <IconButton icon="bookmark" label="Posts salvos" badge={3} />
      <IconButton icon="bookmark" label="Posts salvos" badge={42} variant="outline" />
      <IconButton icon="bookmark" label="Posts salvos" badge={120} variant="filled" />
    </UblDocStage>
    <UblDocStage label="Desabilitado" gap={16}>
      {VARIANTS.map((variant) => (
        <IconButton key={variant} icon="copy" label={`Copiar (${variant})`} variant={variant} disabled />
      ))}
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Escrever o label como ação: “Salvar para ler depois”, não “Marcador”.',
        'Usar pressed só em botões de alternância, e trocar o glifo e o label junto.',
        'Agrupar ações relacionadas num role="toolbar" com aria-label.',
        'Usar badge para contagem curta; o número já vai no nome acessível.',
      ]}
      donts={[
        'Deixar o botão sem label: o leitor de tela anuncia só “botão”.',
        'Usar o IconButton para ação principal da tela: aí é o Button com rótulo.',
        'Indicar o estado ligado só pela cor.',
        'Pôr texto no selo além de números.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Todas as variantes acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher>
      {() => (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          {VARIANTS.map((variant) => (
            <IconButton key={variant} icon="bookmarkFilled" label={`Salvar (${variant})`} variant={variant} pressed badge={3} />
          ))}
          <IconButton icon="copy" label="Copiar" disabled />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="IconButton"
      rows={[
        { name: 'icon', type: 'UblIconName', description: 'Glifo do registro (obrigatório).' },
        { name: 'label', type: 'string', description: 'Nome acessível e dica de ferramenta (obrigatório).' },
        { name: 'variant', type: "'ghost' | 'filled' | 'outline'", default: "'ghost'", description: 'Variante visual.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Aresta de 32, 44 ou 56px.' },
        { name: 'pressed', type: 'boolean', description: 'Alternância: vira aria-pressed e preenche o glifo.' },
        { name: 'badge', type: 'number', description: 'Contagem no selo; 0 ou ausente não exibe; acima de 99 vira “99+”.' },
        { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Tipo nativo.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o botão.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...button', type: 'React.ButtonHTMLAttributes<HTMLButtonElement>', description: 'Demais atributos nativos (onClick, aria-*).' },
      ]}
    />
    <UblDocPropsTable
      title="Tipos públicos"
      rows={[
        { name: 'UblIconButtonVariant', type: "'ghost' | 'filled' | 'outline'", description: 'As três variantes.' },
        { name: 'UblIconButtonSize', type: "'sm' | 'md' | 'lg'", description: 'Os três tamanhos.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof IconButton> = {
  title: 'Unooblog/Componentes/IconButton',
  component: IconButton,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: {
      control: 'select',
      options: ['share', 'bookmark', 'bookmarkFilled', 'link', 'copy', 'like', 'search', 'menu', 'close', 'darkMode'],
      description: 'Glifo do registro.',
    },
    label: { control: 'text', description: 'Nome acessível (obrigatório).' },
    variant: { control: 'radio', options: ['ghost', 'filled', 'outline'], description: 'Variante visual.' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Tamanho do alvo.' },
    pressed: { control: 'boolean', description: 'Alternância (aria-pressed).' },
    badge: { control: { type: 'number', min: 0, max: 150 }, description: 'Contagem no selo.' },
    type: { control: 'radio', options: ['button', 'submit', 'reset'], description: 'Tipo nativo.' },
    disabled: { control: 'boolean', description: 'Desabilita.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    onClick: { action: 'onClick', description: 'Clique.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    icon: 'bookmark',
    label: 'Salvar para ler depois',
    variant: 'ghost',
    size: 'md',
    badge: 0,
    type: 'button',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <IconButtonDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do IconButton',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} padding={40}>
      <IconButton {...args} />
    </UblDocStage>
  ),
};

/**
 * Barra de ações de um post, com alternância de salvar.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: ações do post',
  render: () => (
    <UblDocStage surface="card" padding={16}>
      <ActionBar />
    </UblDocStage>
  ),
};

/**
 * As três variantes.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UblDocStage gap={16}>
      {VARIANTS.map((variant) => (
        <IconButton key={variant} icon="share" label={`Compartilhar (${variant})`} variant={variant} />
      ))}
    </UblDocStage>
  ),
};

/**
 * Os três tamanhos.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage gap={16}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <IconButton key={size} icon="bookmark" label={`Salvar (${size})`} variant="outline" size={size} />
      ))}
    </UblDocStage>
  ),
};

/**
 * Repouso, pressionado, com contagem e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UblDocStage label="Repouso e pressionado" gap={16}>
        <IconButton icon="bookmark" label="Salvar" pressed={false} />
        <IconButton icon="bookmarkFilled" label="Salvo" pressed />
      </UblDocStage>
      <UblDocStage label="Com contagem" gap={16}>
        <IconButton icon="bookmark" label="Posts salvos" badge={3} />
        <IconButton icon="bookmark" label="Posts salvos" badge={120} />
      </UblDocStage>
      <UblDocStage label="Desabilitado" gap={16}>
        {VARIANTS.map((variant) => (
          <IconButton key={variant} icon="copy" label={`Copiar (${variant})`} variant={variant} disabled />
        ))}
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
        <UblDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} gap={16}>
          {VARIANTS.map((variant) => (
            <IconButton key={variant} icon="bookmarkFilled" label={`Salvar (${variant})`} variant={variant} pressed badge={3} />
          ))}
          <IconButton icon="copy" label="Copiar" disabled />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: o botão de alternância troca `aria-pressed` a cada clique e por
 * teclado; o selo de contagem entra no nome acessível; desabilitado não dispara.
 */
export const Alternancia: Story = {
  name: 'Interação: aria-pressed alternando',
  render: () => (
    <UblDocStage gap={16}>
      <ActionBar />
      <IconButton icon="share" label="Compartilhar agora" onClick={shareSpy} />
      <IconButton icon="copy" label="Copiar agora" disabled onClick={disabledSpy} />
      <IconButton icon="bookmark" label="Posts salvos" badge={120} />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    shareSpy.mockClear();
    disabledSpy.mockClear();
    const canvas = within(canvasElement);

    const toggle = canvas.getByRole('button', { name: 'Salvar para ler depois' });
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(toggle).toHaveAccessibleName('Remover dos posts salvos');

    toggle.focus();
    await userEvent.keyboard('{Enter}');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await userEvent.keyboard(' ');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(canvas.getByRole('button', { name: 'Compartilhar agora' }));
    await expect(shareSpy).toHaveBeenCalledTimes(1);

    const disabled = canvas.getByRole('button', { name: 'Copiar agora' });
    await expect(disabled).toBeDisabled();
    await userEvent.click(disabled);
    await expect(disabledSpy).not.toHaveBeenCalled();

    // O selo entra no nome acessível e acima de 99 aparece como "99+"
    const counted = canvas.getByRole('button', { name: 'Posts salvos, 120' });
    await expect(counted).toHaveTextContent('99+');
  },
};
