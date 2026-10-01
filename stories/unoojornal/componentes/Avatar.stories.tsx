import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import { Avatar, ujnInitials } from '../../../src/unoojornal/components/Avatar';
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
import { ujnAuthors } from '../fixtures';

const BAR = '#716C98';

const SIZES = ['sm', 'md', 'lg'] as const;
const SIZE_LABEL = { sm: 'sm · 24px', md: 'md · 32px', lg: 'lg · 48px' } as const;

const [beatriz, juliana, mateus] = ujnAuthors;

/**
 * Assinatura de uma matéria: retrato, nome e turma, como no cabeçalho de matéria.
 */
const BylineSample: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ujn-spacing-m)', fontFamily: 'var(--ujn-font-sans)' }}>
    <Avatar src={beatriz.avatarSrc} name={beatriz.name} size="lg" alt="" />
    <div>
      <p style={{ margin: 0, fontSize: 'var(--ujn-font-label-lg-size)', lineHeight: 'var(--ujn-font-label-lg-line)', fontWeight: 'var(--ujn-font-label-lg-weight)', color: 'var(--ujn-color-text-primary)' }}>
        {beatriz.name}
      </p>
      <p style={{ margin: 0, fontSize: 'var(--ujn-font-body-sm-size)', lineHeight: 'var(--ujn-font-body-sm-line)', color: 'var(--ujn-color-text-secondary)' }}>
        {beatriz.role}
      </p>
    </div>
  </div>
);

/**
 * Página de documentação rica do componente Avatar.
 */
const AvatarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Fundação"
      title="Avatar"
      description="Retrato redondo de quem assina a matéria, em três diâmetros. Sem retrato — ou se ele falhar ao carregar —, mostra as iniciais com o mesmo nome acessível."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Quem escreveu, em qualquer lugar em que a autoria aparece."
    />
    <UjnDocGrid>
      <UjnDocCard icon="✍️" title="Assinatura">
        O retrato de quem escreveu, ao lado do nome e da turma, no cabeçalho da matéria e nos
        cartões de destaque.
      </UjnDocCard>
      <UjnDocCard icon="🔤" title="Iniciais">
        Sem retrato, a primeira letra de até duas palavras do nome (“Beatriz Salgado” → “BS”).
      </UjnDocCard>
      <UjnDocCard icon="🛟" title="Falha de carga">
        Se a imagem não carregar, o avatar cai nas iniciais sozinho, sem ícone de imagem
        quebrada.
      </UjnDocCard>
      <UjnDocCard icon="♿" title="Nome acessível">
        O nome é o texto alternativo; <code>alt=&quot;&quot;</code> o tira da árvore de
        acessibilidade quando o nome já está escrito ao lado.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="Avatar"
      layout="Círculo · 24/32/48px"
      specs={[
        { label: 'Diâmetros', value: 'sm 24px (--ujn-avatar-sm) · md 32px (--ujn-avatar-md) · lg 48px (--ujn-avatar-lg)' },
        { label: 'size numérico', value: 'qualquer valor em pixels; as iniciais acompanham (metade do diâmetro)' },
        { label: 'Forma', value: '--ujn-radius-full (círculo)' },
        { label: 'Imagem', value: 'object-fit: cover, carregamento preguiçoso' },
        { label: 'Iniciais', value: 'text-accent sobre background-subtle · 600 · nunca abaixo de 12px' },
        { label: 'Contraste das iniciais', value: 'texto de destaque sobre a superfície sutil, nos dois temas' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Iniciais: as duas primeiras palavras',
          detail:
            'a primeira letra de até duas palavras, por code point — um nome que começa com letra acentuada ou emoji não é cortado. “Maria da Silva” vira “MD”: previsível, e não depende de saber o que é sobrenome.',
        },
        {
          subject: 'Corpo das iniciais: metade do diâmetro, mínimo de 12px',
          detail:
            'em 24px e 32px o corpo é 12px (o mínimo da escala), em 48px é 19,2px; um size numérico segue a mesma regra por uma propriedade local (--ujn-avatar-size).',
        },
        {
          subject: 'Cliente só pela falha de carga',
          detail:
            "o componente guarda qual src falhou (useState) para cair nas iniciais; é o único motivo de ser 'use client'.",
        },
        {
          subject: 'alt sobrescreve o nome',
          detail:
            'sem alt, vale o name. Com alt="" o avatar fica decorativo — a assinatura já tem o nome escrito. O retrato nunca repete o nome que está logo ao lado.',
        },
        {
          subject: 'Sem anel nem selo',
          detail:
            'o contrato da fundação não prevê anel de destaque; quem precisar de estado compõe por fora.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocAnatomy
      zones={[
        { name: 'Círculo (span)', role: 'Caixa de diâmetro fixo com corte circular.', token: '--ujn-avatar-*' },
        { name: 'Retrato (img)', role: 'Imagem com alt; cobre o círculo.', token: 'object-fit: cover' },
        { name: 'Iniciais', role: 'Fallback com role="img" e aria-label (ou aria-hidden).', token: '--ujn-color-text-accent' },
        { name: 'Fundo', role: 'Superfície sutil atrás das iniciais.', token: '--ujn-color-background-subtle' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real: três diâmetros, com retrato e com iniciais, e um tamanho numérico."
    />
    <UjnDocStage label="Com retrato" gap={16}>
      {SIZES.map((size) => (
        <Avatar key={size} src={beatriz.avatarSrc} name={beatriz.name} size={size} />
      ))}
    </UjnDocStage>
    <UjnDocStage label="Iniciais (sem retrato)" gap={16}>
      {SIZES.map((size) => (
        <Avatar key={size} name={juliana.name} size={size} />
      ))}
      <Avatar name="Mateus" size="lg" />
      <Avatar name="Redação do Jornal" size="lg" />
    </UjnDocStage>
    <UjnDocStage label="Retrato que falha ao carregar cai nas iniciais" gap={16}>
      <Avatar src="/unoojornal/nao-existe.svg" name={mateus.name} size="lg" />
    </UjnDocStage>
    <UjnDocStage label="Diâmetro numérico: 20, 40 e 64px" gap={16}>
      <Avatar src={beatriz.avatarSrc} name={beatriz.name} size={20} />
      <Avatar src={beatriz.avatarSrc} name={beatriz.name} size={40} />
      <Avatar name={juliana.name} size={64} />
    </UjnDocStage>
    <UjnDocStage label="Na assinatura de uma matéria" surface="card" padding={24}>
      <BylineSample />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Passar o nome completo em name: ele gera as iniciais e o texto alternativo.',
        'Usar alt="" quando o nome está escrito ao lado do retrato.',
        'Usar retratos quadrados: o corte é circular e o centro da imagem fica.',
        'Escolher o degrau pelo contexto: sm em linhas densas, lg no cabeçalho da matéria.',
      ]}
      donts={[
        'Repetir o nome no alt quando ele já está ao lado: o leitor de tela lê duas vezes.',
        'Usar o Avatar para imagens que não são de pessoas.',
        'Passar só o primeiro nome esperando as duas iniciais.',
        'Escrever iniciais à mão no lugar de name.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="As iniciais e o fundo acompanham data-ujn-theme."
    />
    <UjnDocThemeSwitcher surface="card">
      {() => (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <Avatar src={beatriz.avatarSrc} name={beatriz.name} size="lg" />
          <Avatar name={juliana.name} size="lg" />
          <Avatar name={mateus.name} size="md" />
          <Avatar name="Redação" size="sm" />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="Avatar"
      rows={[
        { name: 'src', type: 'string', description: 'Retrato. Sem ele, ou se falhar ao carregar, mostra as iniciais.' },
        { name: 'name', type: 'string', description: 'Nome da pessoa: origem das iniciais e, sem alt, do texto alternativo (obrigatório).' },
        { name: 'size', type: "'sm' | 'md' | 'lg' | number", default: "'md'", description: 'Diâmetro: 24, 32, 48px ou um valor em pixels.' },
        { name: 'alt', type: 'string', description: 'Texto alternativo. Vazio ("") deixa o avatar decorativo; ausente vale o name.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLSpanElement>', description: 'Demais atributos (className, style, data-*).' },
      ]}
    />
    <UjnDocPropsTable
      title="Utilitários e tipos públicos"
      rows={[
        { name: 'ujnInitials', type: '(name: string) => string', description: 'As iniciais usadas pelo componente: a primeira letra de até duas palavras.' },
        { name: 'UjnAvatarSize', type: "'sm' | 'md' | 'lg'", description: 'Os três diâmetros nomeados.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Avatar> = {
  title: 'Unoojornal/Componentes/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text', description: 'Retrato (vazio mostra as iniciais).' },
    name: { control: 'text', description: 'Nome da pessoa (iniciais e alt).' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 20, 40, 64],
      description: 'Diâmetro nomeado ou numérico.',
    },
    alt: { control: 'text', description: 'Texto alternativo (vazio deixa decorativo).' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    src: beatriz.avatarSrc,
    name: beatriz.name,
    size: 'lg',
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AvatarDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Avatar',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} padding={40}>
      <Avatar {...args} />
    </UjnDocStage>
  ),
};

/**
 * Assinatura de uma matéria, com o retrato decorativo ao lado do nome.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: assinatura da matéria',
  render: () => (
    <UjnDocStage surface="card" padding={32}>
      <BylineSample />
    </UjnDocStage>
  ),
};

/**
 * Retrato e iniciais.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="Com retrato" gap={16}>
        {ujnAuthors.slice(0, 5).map((author) => (
          <Avatar key={author.id} src={author.avatarSrc} name={author.name} size="lg" />
        ))}
      </UjnDocStage>
      <UjnDocStage label="Iniciais" gap={16}>
        {ujnAuthors.slice(0, 5).map((author) => (
          <Avatar key={author.id} name={author.name} size="lg" />
        ))}
      </UjnDocStage>
    </div>
  ),
};

/**
 * Os três diâmetros e um numérico.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage gap={16}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
          <Avatar src={beatriz.avatarSrc} name={beatriz.name} size={size} />
          <span style={{ fontFamily: 'var(--ujn-font-sans)', fontSize: 'var(--ujn-font-caption-size)', color: 'var(--ujn-color-text-secondary)' }}>
            {SIZE_LABEL[size]}
          </span>
        </div>
      ))}
      <div style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
        <Avatar src={beatriz.avatarSrc} name={beatriz.name} size={64} />
        <span style={{ fontFamily: 'var(--ujn-font-sans)', fontSize: 'var(--ujn-font-caption-size)', color: 'var(--ujn-color-text-secondary)' }}>
          64px
        </span>
      </div>
    </UjnDocStage>
  ),
};

/**
 * Retrato, iniciais, falha de carga e decorativo.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage gap={24}>
      <Avatar src={beatriz.avatarSrc} name={beatriz.name} size="lg" />
      <Avatar name={juliana.name} size="lg" />
      <Avatar src="/unoojornal/nao-existe.svg" name={mateus.name} size="lg" />
      <Avatar src={beatriz.avatarSrc} name={beatriz.name} size="lg" alt="" />
    </UjnDocStage>
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
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="card" gap={16}>
          <Avatar src={beatriz.avatarSrc} name={beatriz.name} size="lg" />
          <Avatar name={juliana.name} size="lg" />
          <Avatar name={mateus.name} size="md" />
          <Avatar name="Redação" size="sm" />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: iniciais por nome, nome acessível, avatar decorativo e queda do
 * retrato que falha ao carregar.
 */
export const Fallback: Story = {
  name: 'Interação: iniciais, alt e falha de carga',
  render: () => (
    <UjnDocStage gap={24}>
      <Avatar src={beatriz.avatarSrc} name={beatriz.name} />
      <Avatar name="Juliana Mendes Costa" />
      <Avatar name="Mateus" />
      <Avatar src={beatriz.avatarSrc} name="Clarissa Vaz" alt="" data-testid="decorativo" />
      <Avatar src="/unoojornal/nao-existe.svg" name="Thiago Santos" />
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Com retrato: a imagem tem o nome como texto alternativo
    await expect(canvas.getByRole('img', { name: beatriz.name })).toBeInTheDocument();

    // Iniciais: a primeira letra de até duas palavras
    await expect(canvas.getByRole('img', { name: 'Juliana Mendes Costa' })).toHaveTextContent('JM');
    await expect(canvas.getByRole('img', { name: 'Mateus' })).toHaveTextContent('M');
    await expect(ujnInitials('  ana   maria  ')).toBe('AM');

    // alt="" deixa o avatar fora da árvore de acessibilidade
    await expect(canvas.queryByRole('img', { name: 'Clarissa Vaz' })).not.toBeInTheDocument();

    // O retrato que falha cai nas iniciais, com o mesmo nome acessível
    await waitFor(() => expect(canvas.getByRole('img', { name: 'Thiago Santos' })).toHaveTextContent('TS'));
  },
};
