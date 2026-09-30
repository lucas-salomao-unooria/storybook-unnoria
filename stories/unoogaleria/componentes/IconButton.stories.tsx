import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { IconButton } from '../../../src/unoogaleria/components/IconButton';
import type { UglIconButtonVariant } from '../../../src/unoogaleria/components/IconButton';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { uglFormatDayLabel, uglFormatTime } from '../../../src/unoogaleria/media';
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
import { uglDemoNow, uglPhotos } from '../fixtures';

const BAR = '#716C98';

/** Foto do exemplo do visualizador. */
const photo = uglPhotos[0];

/** Espião da estória de interação. */
const shareSpy = fn();

/**
 * Botão de favoritar com estado local.
 */
const FavoriteToggle: React.FC<{ variant?: UglIconButtonVariant; initial?: boolean }> = ({
  variant = 'plain',
  initial = false,
}) => {
  const [favorite, setFavorite] = useState(initial);

  return (
    <IconButton
      icon="favorite"
      label={favorite ? 'Remover dos favoritos' : 'Favoritar'}
      variant={variant}
      pressed={favorite}
      pressedTone="favorite"
      onClick={() => setFavorite((current) => !current)}
    />
  );
};

/**
 * Visualizador simplificado no aparelho: barra superior e barra de ações.
 */
const ViewerScreen: React.FC = () => {
  const [favorite, setFavorite] = useState(Boolean(photo.favorite));
  const [info, setInfo] = useState(false);

  return (
    <div
      data-ugl-immersive=""
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--ugl-color-immersive-surface)' }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ugl-spacing-3xs)',
          padding: 'var(--ugl-safe-area-top) var(--ugl-spacing-3xs) var(--ugl-spacing-3xs)',
          background: 'var(--ugl-color-immersive-bar)',
          color: 'var(--ugl-color-immersive-text)',
        }}
      >
        <IconButton icon="back" label="Fechar visualizador" variant="bar" />
        <div style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--ugl-font-sans)' }}>
          <div style={{ fontSize: 'var(--ugl-font-label-size)', fontWeight: 'var(--ugl-font-label-weight)' }}>
            {uglFormatDayLabel(photo.takenAt, { now: uglDemoNow })}
          </div>
          <div style={{ fontSize: 'var(--ugl-font-caption-size)', color: 'var(--ugl-color-immersive-text-secondary)' }}>
            {uglFormatTime(photo.takenAt)}
            {photo.location ? ` · ${photo.location}` : ''}
          </div>
        </div>
        <IconButton icon="more" label="Mais opções" variant="bar" aria-haspopup="menu" />
      </header>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center' }}>
        <img src={photo.src} alt={photo.alt} style={{ width: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
      <div
        role="toolbar"
        aria-label="Ações da foto"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 'var(--ugl-spacing-3xs) var(--ugl-spacing-xs) calc(var(--ugl-safe-area-bottom) + var(--ugl-spacing-3xs))',
          background: 'var(--ugl-color-immersive-bar)',
        }}
      >
        <IconButton icon="share" label="Compartilhar" variant="bar" />
        <IconButton
          icon="favorite"
          label={favorite ? 'Remover dos favoritos' : 'Favoritar'}
          variant="bar"
          pressed={favorite}
          pressedTone="favorite"
          onClick={() => setFavorite((current) => !current)}
        />
        <IconButton
          icon="info"
          label="Informações"
          variant="bar"
          pressed={info}
          pressedTone="accent"
          onClick={() => setInfo((current) => !current)}
        />
        <IconButton icon="edit" label="Editar" variant="bar" />
        <IconButton icon="delete" label="Excluir" variant="bar" />
      </div>
    </div>
  );
};

/**
 * Página de documentação rica do componente IconButton.
 */
const IconButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Ações"
      title="IconButton"
      description="Botão quadrado e redondo só com glifo, com nome acessível obrigatório (que também vira a dica). Com pressed, é de alternância — favoritar, informações abertas, som ligado. Quatro variantes, duas delas para a superfície imersiva."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Ações de barra onde o glifo é conhecido."
    />
    <UglDocGrid>
      <UglDocCard icon="🔲" title="plain e tinted">
        <code>plain</code> nas barras claras (voltar, mais opções); <code>tinted</code> quando a
        ação precisa se destacar do fundo sem ser primária.
      </UglDocCard>
      <UglDocCard icon="🌑" title="immersive e bar">
        <code>immersive</code> é o círculo translúcido com desfoque sobre a mídia;{' '}
        <code>bar</code> é o glifo branco das barras do visualizador.
      </UglDocCard>
      <UglDocCard icon="❤️" title="Alternância">
        <code>pressed</code> vira <code>aria-pressed</code>, preenche o glifo e, com{' '}
        <code>pressedTone</code>, pinta de favorito ou de acento.
      </UglDocCard>
      <UglDocCard icon="🏷️" title="Nome obrigatório">
        <code>label</code> é o <code>aria-label</code> e o <code>title</code>: um botão só com
        glifo não tem outro nome.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="IconButton"
      layout="Quadrado redondo · 32/44/56px"
      specs={[
        { label: 'Alvos', value: 'sm 32px · md 44px (--ugl-touch-target) · lg 56px' },
        { label: 'Glifo', value: 'sm 20px · md 24px · lg 32px' },
        { label: 'plain', value: 'icon-primary · hover state-hover' },
        { label: 'tinted', value: 'fill-field · icon-accent' },
        { label: 'immersive', value: 'immersive-control + blur(--ugl-blur-bar)' },
        { label: 'bar', value: 'immersive-text · hover immersive-control' },
        { label: 'Favorito', value: 'brand-favorite (immersive-favorite no imersivo)' },
        { label: 'Foco', value: '2px focus-ring (immersive-accent no imersivo)' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Glifo preenchido quando pressionado',
          detail:
            'sem filled explícito, pressed liga o eixo FILL: o coração cheio distingue o estado pela forma, não só pela cor de pressedTone.',
        },
        {
          subject: 'Nome muda com o estado',
          detail:
            'nas composições, o favoritar troca o label para “Remover dos favoritos” quando ligado, além do aria-pressed — os dois padrões convivem nos leitores de tela.',
        },
        {
          subject: 'Alvo de 32px com área de toque de 44px',
          detail:
            'o tamanho sm desenha 32px (--ugl-icon-button-size-sm), mas uma camada invisível estende o alvo de toque até os 44px de --ugl-touch-target. Mesmo assim, prefira-o dentro de campos e selos, onde não há alvo vizinho colado.',
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
        { name: 'Alvo (button)', role: 'Círculo com aria-label, title e aria-pressed opcional.', token: '--ugl-radius-full · --ugl-touch-target' },
        { name: 'Glifo', role: 'Icon decorativo, preenchido quando pressionado.', token: '--ugl-icon-size-*' },
        { name: 'Fundo da variante', role: 'Nenhum, fill-field ou immersive-control.', token: '--ugl-color-fill-field · --ugl-color-immersive-control' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real, nas quatro variantes, três tamanhos e estados."
    />
    <UglDocStage label="plain e tinted" gap={12}>
      <IconButton icon="back" label="Voltar" />
      <IconButton icon="more" label="Mais opções" />
      <IconButton icon="share" label="Compartilhar" variant="tinted" />
      <FavoriteToggle initial />
      <IconButton icon="info" label="Informações" pressed pressedTone="accent" />
      <IconButton icon="delete" label="Excluir" disabled />
    </UglDocStage>
    <UglDocStage label="immersive e bar" surface="immersive" gap={12}>
      <IconButton icon="close" label="Fechar" variant="immersive" />
      <IconButton icon="play" label="Reproduzir" variant="immersive" size="lg" />
      <IconButton icon="share" label="Compartilhar" variant="bar" />
      <FavoriteToggle variant="bar" initial />
      <IconButton icon="info" label="Informações" variant="bar" pressed pressedTone="accent" />
      <IconButton icon="delete" label="Excluir" variant="bar" disabled />
    </UglDocStage>
    <UglDocStage label="Tamanhos" gap={12}>
      <IconButton icon="add" label="Adicionar (pequeno)" size="sm" variant="tinted" />
      <IconButton icon="add" label="Adicionar (médio)" size="md" variant="tinted" />
      <IconButton icon="add" label="Adicionar (grande)" size="lg" variant="tinted" />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Dar um label que diga a ação (“Compartilhar”), não o glifo (“Seta”).',
        'Usar pressed só em ações de alternância.',
        'Usar bar e immersive sobre o visualizador e o editor.',
        'Ligar aria-haspopup e aria-expanded quando o botão abrir um menu.',
      ]}
      donts={[
        'Usar um glifo pouco conhecido sem rótulo visível por perto.',
        'Usar o tamanho sm como alvo principal de toque.',
        'Mudar o glifo para indicar estado quando pressed resolve.',
        'Usar plain sobre a mídia: o glifo some.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="plain e tinted acompanham data-ugl-theme; immersive e bar são invariantes."
    />
    <UglDocThemeSwitcher>
      {() => (
        <div style={{ display: 'flex', gap: 12 }}>
          <IconButton icon="back" label="Voltar" />
          <IconButton icon="share" label="Compartilhar" variant="tinted" />
          <FavoriteToggle initial />
          <IconButton icon="info" label="Informações" pressed pressedTone="accent" />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UglDocPropsTable
      title="IconButton"
      rows={[
        { name: 'icon', type: 'UglIconName', description: 'Glifo. Obrigatório.' },
        { name: 'label', type: 'string', description: 'Nome acessível e dica. Obrigatório.' },
        { name: 'variant', type: "'plain' | 'tinted' | 'immersive' | 'bar'", default: "'plain'", description: 'Variante visual.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Alvo de 32, 44 ou 56px.' },
        { name: 'pressed', type: 'boolean', description: 'Alternância; vira aria-pressed e preenche o glifo.' },
        { name: 'pressedTone', type: "'favorite' | 'accent'", description: 'Cor do glifo quando pressionado.' },
        { name: 'filled', type: 'boolean', description: 'Força o eixo FILL do glifo.' },
        { name: 'title', type: 'string', default: 'label', description: 'Dica de ferramenta.' },
        { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Tipo nativo.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...button', type: 'React.ButtonHTMLAttributes<HTMLButtonElement>', description: 'Demais atributos (onClick, disabled, aria-*).' },
      ]}
    />
    <UglDocPropsTable
      title="Tipos públicos"
      rows={[
        { name: 'UglIconButtonVariant', type: "'plain' | 'tinted' | 'immersive' | 'bar'", description: 'Variantes.' },
        { name: 'UglIconButtonSize', type: "'sm' | 'md' | 'lg'", description: 'Tamanhos.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof IconButton> = {
  title: 'Unoogaleria/Componentes/IconButton',
  component: IconButton,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: {
      control: 'select',
      options: ['favorite', 'share', 'info', 'edit', 'delete', 'back', 'more', 'close', 'play', 'add'],
      description: 'Glifo.',
    },
    label: { control: 'text', description: 'Nome acessível.' },
    variant: { control: 'radio', options: ['plain', 'tinted', 'immersive', 'bar'], description: 'Variante.' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Tamanho do alvo.' },
    pressed: {
      control: 'select',
      options: ['indefinido', 'ligado', 'desligado'],
      mapping: { indefinido: undefined, ligado: true, desligado: false },
      description: 'Alternância.',
    },
    pressedTone: { control: 'radio', options: [undefined, 'favorite', 'accent'], description: 'Cor quando pressionado.' },
    filled: { control: 'boolean', description: 'Força o glifo preenchido.' },
    title: { control: 'text', description: 'Dica (padrão: label).' },
    disabled: { control: 'boolean', description: 'Desabilita.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    onClick: { action: 'onClick', description: 'Clique.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    icon: 'favorite',
    label: 'Favoritar',
    variant: 'plain',
    size: 'md',
    pressed: 'desligado' as never,
    pressedTone: 'favorite',
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
    <UglDocStage
      theme={args.theme ?? 'light'}
      surface={args.variant === 'immersive' || args.variant === 'bar' ? 'immersive' : 'primary'}
      padding={40}
    >
      <IconButton {...args} />
    </UglDocStage>
  ),
};

/**
 * O visualizador no aparelho, com as ações de barra.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: barras do visualizador',
  parameters: { layout: 'centered' },
  render: () => (
    <PhoneFrame scale={0.75} ariaLabel="Galeria — visualizador">
      <ViewerScreen />
    </PhoneFrame>
  ),
};

/**
 * As quatro variantes.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UglDocStage label="plain · tinted" gap={12}>
        <IconButton icon="more" label="Mais opções" />
        <IconButton icon="share" label="Compartilhar" variant="tinted" />
      </UglDocStage>
      <UglDocStage label="immersive · bar" surface="immersive" gap={12}>
        <IconButton icon="close" label="Fechar" variant="immersive" />
        <IconButton icon="share" label="Compartilhar" variant="bar" />
      </UglDocStage>
    </div>
  ),
};

/**
 * Os três tamanhos.
 */
export const Tamanhos: Story = {
  render: () => (
    <UglDocStage gap={12}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <IconButton key={size} icon="add" label={`Adicionar (${size})`} size={size} variant="tinted" />
      ))}
    </UglDocStage>
  ),
};

/**
 * Repouso, pressionado nos dois tons e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UglDocStage label="Sobre a superfície" gap={12}>
        <IconButton icon="favorite" label="Favoritar" pressed={false} pressedTone="favorite" />
        <IconButton icon="favorite" label="Remover dos favoritos" pressed pressedTone="favorite" />
        <IconButton icon="info" label="Informações" pressed pressedTone="accent" />
        <IconButton icon="delete" label="Excluir" disabled />
      </UglDocStage>
      <UglDocStage label="Sobre a superfície imersiva" surface="immersive" gap={12}>
        <IconButton icon="favorite" label="Favoritar" variant="bar" pressed={false} pressedTone="favorite" />
        <IconButton icon="favorite" label="Remover dos favoritos" variant="bar" pressed pressedTone="favorite" />
        <IconButton icon="info" label="Informações" variant="bar" pressed pressedTone="accent" />
        <IconButton icon="volumeOff" label="Ativar som" variant="immersive" pressed={false} />
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
          <IconButton icon="back" label="Voltar" />
          <IconButton icon="share" label="Compartilhar" variant="tinted" />
          <IconButton icon="favorite" label="Remover dos favoritos" pressed pressedTone="favorite" />
          <IconButton icon="info" label="Informações" pressed pressedTone="accent" />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: nome e dica vêm de `label`; o favoritar alterna `aria-pressed`
 * por clique e teclado; o botão comum não anuncia estado.
 */
export const Alternancia: Story = {
  name: 'Interação: alternar favorito',
  render: () => (
    <UglDocStage gap={12}>
      <FavoriteToggle />
      <IconButton icon="share" label="Compartilhar" onClick={shareSpy} />
    </UglDocStage>
  ),
  play: async ({ canvasElement }) => {
    shareSpy.mockClear();
    const canvas = within(canvasElement);

    const favorite = canvas.getByRole('button', { name: 'Favoritar' });
    await expect(favorite).toHaveAttribute('aria-pressed', 'false');
    await expect(favorite).toHaveAttribute('title', 'Favoritar');

    await userEvent.click(favorite);
    await expect(favorite).toHaveAttribute('aria-pressed', 'true');
    await expect(favorite).toHaveAccessibleName('Remover dos favoritos');

    favorite.focus();
    await userEvent.keyboard(' ');
    await expect(favorite).toHaveAttribute('aria-pressed', 'false');
    await expect(favorite).toHaveAccessibleName('Favoritar');

    const share = canvas.getByRole('button', { name: 'Compartilhar' });
    await expect(share).not.toHaveAttribute('aria-pressed');
    await userEvent.click(share);
    await expect(shareSpy).toHaveBeenCalledTimes(1);
  },
};
