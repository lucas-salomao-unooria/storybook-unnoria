import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Tag } from '../../../src/unoojornal/components/Tag';
import type { UjnTagVariant } from '../../../src/unoojornal/components/Tag';
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

const VARIANTS: { variant: UjnTagVariant; label: string }[] = [
  { variant: 'outline', label: 'Ciência e tecnologia' },
  { variant: 'accent', label: 'Destaque' },
  { variant: 'neutral', label: 'Edição 214' },
];

/** Espiões das estórias de interação. */
const filterSpy = fn();
const disabledSpy = fn();

/**
 * Página de documentação rica do componente Tag.
 */
const TagDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Fundação"
      title="Tag"
      description="Etiqueta em caixa alta para categoria e metadado, em três variantes — contorno, destaque e neutra — e dois tamanhos. É um span quando só informa, um link com href e um botão com onClick."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma etiqueta, três papéis conforme as props."
    />
    <UjnDocGrid>
      <UjnDocCard icon="🏷️" title="Informativa">
        Sem href nem onClick é um <code>&lt;span&gt;</code>: a categoria de uma matéria, a
        edição, o selo de “Destaque”.
      </UjnDocCard>
      <UjnDocCard icon="🔗" title="Link">
        Com <code>href</code> é um <code>&lt;a&gt;</code>: leva à página da seção. O alvo de
        toque cresce para 44px sem mudar o desenho.
      </UjnDocCard>
      <UjnDocCard icon="👆" title="Botão">
        Com <code>onClick</code> é um <code>&lt;button type=&quot;button&quot;&gt;</code>: aplica um
        filtro ou abre um painel.
      </UjnDocCard>
      <UjnDocCard icon="🌗" title="Três tons">
        Contorno para categoria, destaque para ênfase e neutra para metadado — o estado nunca
        é só cor: o texto diz o que a etiqueta é.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="Tag"
      layout="Retângulo de raio 2px · 20/24px"
      specs={[
        { label: 'Alturas', value: 'sm 20px · md 24px (mínimas)' },
        { label: 'Recuo lateral', value: 'sm 8px · md 12px' },
        { label: 'Forma', value: '--ujn-radius-xs (2px, o jornal é reto)' },
        { label: 'Texto', value: 'kicker 12/18px, 600, caixa alta' },
        { label: 'outline', value: 'contorno border-default · texto text-accent' },
        { label: 'accent', value: 'fill-field · texto text-accent' },
        { label: 'neutral', value: 'background-subtle · texto text-secondary' },
        { label: 'Interativa', value: 'hover state-hover · ativo state-pressed · foco de 2px em focus-ring' },
        { label: 'Estrutura herdada', value: 'Figma “Jornal da Escola”, quadro de etiquetas 6:59 (sem valores de cor ou fonte)' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Dourado do Figma → roxo de destaque',
          detail:
            'as etiquetas outline, accent e neutral do quadro 6:59 mantêm a estrutura; as cores são tokens da Unooria (text-accent, fill-field, background-subtle).',
        },
        {
          subject: 'Elemento conforme as props',
          detail:
            'span, a ou button, para que cada uma tenha o papel certo no leitor de tela; só as interativas ganham cursor, realce e foco.',
        },
        {
          subject: 'Alvo de 44px nas interativas',
          detail:
            'o desenho tem 20/24px, mas um ::before de 44px mantém o alvo de toque. O que não é interativo não paga esse custo.',
        },
        {
          subject: 'Desabilitada',
          detail:
            'o botão usa disabled; o link perde o href e ganha aria-disabled; as duas esmaecem a 40%. Num span informativo, disabled não tem efeito.',
        },
        {
          subject: 'Caixa alta por CSS',
          detail:
            'text-transform: uppercase, e não o texto digitado em maiúsculas: o leitor de tela lê a frase normal e a caixa alta não vira soletração.',
        },
        {
          subject: 'Alturas de 20 e 24px locais',
          detail: 'a régua do módulo não publica essas alturas; são --ujn-tag-height-sm e -md, no topo do Tag.css.',
        },
        {
          subject: 'Server Component',
          detail: 'só recebe props e renderiza; onClick vai direto ao <button> nativo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocAnatomy
      zones={[
        { name: 'Contêiner (span, a ou button)', role: 'Define o papel; carrega a variante e o tamanho.', token: '--ujn-radius-xs' },
        { name: 'Texto', role: 'Categoria ou metadado, em caixa alta.', token: '--ujn-font-kicker-*' },
        { name: 'Camada de realce', role: '::after com state-hover e state-pressed (só interativa).', token: '--ujn-color-state-*' },
        { name: 'Área de toque', role: '::before de 44px (só interativa).', token: '--ujn-touch-target' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real: três variantes, dois tamanhos e os três elementos."
    />
    <UjnDocStage label="Variantes (md)" gap={12}>
      {VARIANTS.map(({ variant, label }) => (
        <Tag key={variant} variant={variant}>
          {label}
        </Tag>
      ))}
    </UjnDocStage>
    <UjnDocStage label="Tamanhos (sm e md)" gap={12}>
      {VARIANTS.map(({ variant, label }) => (
        <React.Fragment key={variant}>
          <Tag variant={variant} size="sm">
            {label}
          </Tag>
          <Tag variant={variant} size="md">
            {label}
          </Tag>
        </React.Fragment>
      ))}
    </UjnDocStage>
    <UjnDocStage label="Informativa, link, botão e desabilitadas" gap={12}>
      <Tag>Opinião</Tag>
      <Tag href="#ciencia" variant="accent">
        Ciência
      </Tag>
      <Tag onClick={() => undefined} variant="neutral">
        Filtrar
      </Tag>
      <Tag onClick={() => undefined} disabled>
        Botão desabilitado
      </Tag>
      <Tag href="#ciencia" variant="accent" disabled>
        Link desabilitado
      </Tag>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Usar uma palavra ou duas por etiqueta: “Ciência”, “Edição 214”.',
        'Usar href quando a etiqueta leva a uma página; onClick quando aplica um filtro.',
        'Usar a variante accent com parcimônia, para uma ênfase por bloco.',
        'Escrever o texto em caixa normal: a caixa alta é do CSS.',
      ]}
      donts={[
        'Usar a etiqueta para frases: ela não quebra linha.',
        'Diferenciar etiquetas só pela cor: o texto precisa dizer a diferença.',
        'Pôr onClick e href na mesma etiqueta: o link vence.',
        'Usar a Tag para estados de filtro com seleção: aí é a FilterPill, com aria-pressed.',
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
            <Tag key={variant} variant={variant} href="#secao">
              {label}
            </Tag>
          ))}
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="Tag"
      rows={[
        { name: 'variant', type: "'outline' | 'accent' | 'neutral'", default: "'outline'", description: 'Variante visual.' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Altura de 20 ou 24px.' },
        { name: 'href', type: 'string', description: 'Faz da etiqueta um link (<a>).' },
        { name: 'onClick', type: 'React.MouseEventHandler<HTMLElement>', description: 'Faz da etiqueta um botão (<button>), sem href.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita a etiqueta interativa.' },
        { name: 'children', type: 'React.ReactNode', description: 'Texto da etiqueta.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos (aria-*, id, data-*).' },
      ]}
    />
    <UjnDocPropsTable
      title="Tipos públicos"
      rows={[
        { name: 'UjnTagVariant', type: "'outline' | 'accent' | 'neutral'", description: 'As três variantes.' },
        { name: 'UjnTagSize', type: "'sm' | 'md'", description: 'Os dois tamanhos.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Tag> = {
  title: 'Unoojornal/Componentes/Tag',
  component: Tag,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Texto da etiqueta.' },
    variant: { control: 'radio', options: ['outline', 'accent', 'neutral'], description: 'Variante visual.' },
    size: { control: 'radio', options: ['sm', 'md'], description: 'Tamanho.' },
    href: { control: 'text', description: 'Faz da etiqueta um link.' },
    onClick: { action: 'onClick', description: 'Clique (faz da etiqueta um botão).' },
    disabled: { control: 'boolean', description: 'Desabilita a etiqueta interativa.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    children: 'Ciência e tecnologia',
    variant: 'outline',
    size: 'md',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TagDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Tag',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} padding={40}>
      <Tag {...args} />
    </UjnDocStage>
  ),
};

/**
 * As etiquetas de uma matéria, como no quadro de etiquetas `6:59`.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial: etiquetas do quadro 6:59',
  render: () => (
    <UjnDocStage gap={16} padding={32}>
      <Tag variant="outline">Ciência e tecnologia</Tag>
      <Tag variant="accent">Destaque</Tag>
      <Tag variant="neutral">Edição 214</Tag>
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
        <Tag key={variant} variant={variant}>
          {label}
        </Tag>
      ))}
    </UjnDocStage>
  ),
};

/**
 * Os dois tamanhos.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage gap={12}>
      {(['sm', 'md'] as const).map((size) => (
        <Tag key={size} size={size} variant="accent">
          {size === 'sm' ? 'Pequena · 20px' : 'Média · 24px'}
        </Tag>
      ))}
    </UjnDocStage>
  ),
};

/**
 * Informativa, link, botão e as duas desabilitadas.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="Informativa (span)" gap={12}>
        {VARIANTS.map(({ variant, label }) => (
          <Tag key={variant} variant={variant}>
            {label}
          </Tag>
        ))}
      </UjnDocStage>
      <UjnDocStage label="Link (a)" gap={12}>
        {VARIANTS.map(({ variant, label }) => (
          <Tag key={variant} variant={variant} href="#secao">
            {label}
          </Tag>
        ))}
      </UjnDocStage>
      <UjnDocStage label="Botão (button)" gap={12}>
        {VARIANTS.map(({ variant, label }) => (
          <Tag key={variant} variant={variant} onClick={() => undefined}>
            {label}
          </Tag>
        ))}
      </UjnDocStage>
      <UjnDocStage label="Desabilitadas" gap={12}>
        <Tag onClick={() => undefined} disabled>
          Botão desabilitado
        </Tag>
        <Tag href="#secao" variant="accent" disabled>
          Link desabilitado
        </Tag>
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
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} gap={12}>
          {VARIANTS.map(({ variant, label }) => (
            <Tag key={variant} variant={variant} href="#secao">
              {label}
            </Tag>
          ))}
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: a etiqueta-botão aciona por clique e teclado; a informativa não é
 * focável; a desabilitada não dispara; o link tem papel de link.
 */
export const Acionamento: Story = {
  name: 'Interação: botão, link e desabilitada',
  render: () => (
    <UjnDocStage gap={12}>
      <Tag>Informativa</Tag>
      <Tag onClick={filterSpy}>Filtrar</Tag>
      <Tag onClick={disabledSpy} disabled>
        Indisponível
      </Tag>
      <Tag href="#ciencia" variant="accent">
        Ciência
      </Tag>
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    filterSpy.mockClear();
    disabledSpy.mockClear();
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', { name: 'Filtrar' });
    await userEvent.click(button);
    await expect(filterSpy).toHaveBeenCalledTimes(1);

    // A informativa não é interativa: Tab vai direto à etiqueta-botão
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(filterSpy).toHaveBeenCalledTimes(3);

    const disabled = canvas.getByRole('button', { name: 'Indisponível' });
    await expect(disabled).toBeDisabled();
    await userEvent.click(disabled);
    await expect(disabledSpy).not.toHaveBeenCalled();

    const link = canvas.getByRole('link', { name: 'Ciência' });
    await expect(link).toHaveAttribute('href', '#ciencia');
    await expect(canvas.getByText('Informativa').tagName).toBe('SPAN');
  },
};
