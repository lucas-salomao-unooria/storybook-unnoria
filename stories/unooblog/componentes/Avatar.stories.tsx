import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import { Avatar, AvatarGroup, ublInitials } from '../../../src/unooblog/components/Avatar';
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
import { ublAuthors } from '../fixtures';

const BAR = '#716C98';

const SIZES = ['sm', 'md', 'lg', 'xl'] as const;
const SIZE_LABEL = { sm: 'sm · 24px', md: 'md · 32px', lg: 'lg · 48px', xl: 'xl · 72px' } as const;

const [marina, caio, renata] = ublAuthors;

/**
 * Assinatura de um post: retrato, nome e cargo, como no cabeçalho do post.
 */
const BylineSample: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ubl-spacing-m)', fontFamily: 'var(--ubl-font-sans)' }}>
    <Avatar src={marina.avatarSrc} name={marina.name} size="lg" alt="" />
    <div>
      <p style={{ margin: 0, fontSize: 'var(--ubl-font-label-lg-size)', lineHeight: 'var(--ubl-font-label-lg-line)', fontWeight: 'var(--ubl-font-label-lg-weight)', color: 'var(--ubl-color-text-primary)' }}>
        {marina.name}
      </p>
      <p style={{ margin: 0, fontSize: 'var(--ubl-font-caption-size)', lineHeight: 'var(--ubl-font-caption-line)', color: 'var(--ubl-color-text-secondary)' }}>
        {marina.role}
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
      badgeBrand="Unooblog"
      category="Componentes • Fundação"
      title="Avatar"
      description="Retrato redondo de quem escreve ou comenta, em quatro diâmetros, mais a pilha de retratos (AvatarGroup). Sem retrato — ou se ele falhar ao carregar —, mostra as iniciais com o mesmo nome acessível."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Quem escreveu, em qualquer lugar em que a autoria aparece."
    />
    <UblDocGrid>
      <UblDocCard icon="✍️" title="Assinatura">
        O retrato de quem escreveu, ao lado do nome e do cargo, no cabeçalho do post, no
        cartão de autor e nos comentários.
      </UblDocCard>
      <UblDocCard icon="🔤" title="Iniciais">
        Sem retrato, a primeira letra de até duas palavras do nome (“Marina Azevedo” → “MA”).
      </UblDocCard>
      <UblDocCard icon="🛟" title="Falha de carga">
        Se a imagem não carregar, o avatar cai nas iniciais sozinho, sem ícone de imagem
        quebrada.
      </UblDocCard>
      <UblDocCard icon="👥" title="Pilha de retratos">
        O <code>AvatarGroup</code> sobrepõe até <code>max</code> retratos e resume o resto em “+N”;
        o grupo é lido uma vez, com o nome de todas as pessoas.
      </UblDocCard>
      <UblDocCard icon="♿" title="Nome acessível">
        O nome é o texto alternativo; <code>alt=&quot;&quot;</code> o tira da árvore de
        acessibilidade quando o nome já está escrito ao lado.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="Avatar"
      layout="Círculo · 24/32/48/72px"
      specs={[
        { label: 'Diâmetros', value: 'sm 24px (--ubl-avatar-sm) · md 32px (--ubl-avatar-md) · lg 48px (--ubl-avatar-lg) · xl 72px (--ubl-avatar-xl)' },
        { label: 'size numérico', value: 'qualquer valor em pixels; as iniciais acompanham (metade do diâmetro)' },
        { label: 'Forma', value: '--ubl-radius-full (círculo)' },
        { label: 'Imagem', value: 'object-fit: cover, carregamento preguiçoso' },
        { label: 'Iniciais', value: 'text-accent sobre background-subtle · 600 · nunca abaixo de 12px' },
        { label: 'Contraste das iniciais', value: 'texto de destaque sobre a superfície sutil, nos dois temas' },
        { label: 'AvatarGroup', value: 'sobreposição de 1/4 do diâmetro · anel de 2px (outline) na cor da página · "+N" em fill-field' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Iniciais: as duas primeiras palavras',
          detail:
            'a primeira letra de até duas palavras, por code point — um nome que começa com letra acentuada ou emoji não é cortado. “Maria da Silva” vira “MD”: previsível, e não depende de saber o que é sobrenome.',
        },
        {
          subject: 'Corpo das iniciais: metade do diâmetro, mínimo de 12px',
          detail:
            'em 24px e 32px o corpo é 12px (o mínimo da escala), em 48px é 19,2px e em 72px, 28,8px; um size numérico segue a mesma regra por uma propriedade local (--ubl-avatar-size).',
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
        {
          subject: 'AvatarGroup lido como um grupo só',
          detail:
            'a pilha é role="group" com o nome de todas as pessoas; cada retrato sai da árvore de acessibilidade (alt vazio) para o leitor de tela não repetir nome. O "+N" é decorativo, porque os nomes ocultos já estão no rótulo do grupo.',
        },
        {
          subject: 'Anel por outline, não por sombra',
          detail:
            'o anel que separa os retratos sobrepostos é um outline de 2px na cor da página (que acompanha o raio): o blog só aceita box-shadow nas camadas flutuantes. Sobre um cartão lavanda, a variável local --ubl-avatar-group-ring troca a cor do anel.',
        },
        {
          subject: 'Diferença em relação ao jornal',
          detail:
            'o jornal tem três diâmetros; o blog ganha o xl (72px) para o perfil de quem escreve, e a pilha de retratos.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocAnatomy
      zones={[
        { name: 'Círculo (span)', role: 'Caixa de diâmetro fixo com corte circular.', token: '--ubl-avatar-*' },
        { name: 'Retrato (img)', role: 'Imagem com alt; cobre o círculo.', token: 'object-fit: cover' },
        { name: 'Iniciais', role: 'Fallback com role="img" e aria-label (ou aria-hidden).', token: '--ubl-color-text-accent' },
        { name: 'Fundo', role: 'Superfície sutil atrás das iniciais.', token: '--ubl-color-background-subtle' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real: três diâmetros, com retrato e com iniciais, e um tamanho numérico."
    />
    <UblDocStage label="Com retrato" gap={16}>
      {SIZES.map((size) => (
        <Avatar key={size} src={marina.avatarSrc} name={marina.name} size={size} />
      ))}
    </UblDocStage>
    <UblDocStage label="Iniciais (sem retrato)" gap={16}>
      {SIZES.map((size) => (
        <Avatar key={size} name={caio.name} size={size} />
      ))}
      <Avatar name="Mateus" size="lg" />
      <Avatar name="Equipe do Blog" size="lg" />
    </UblDocStage>
    <UblDocStage label="Retrato que falha ao carregar cai nas iniciais" gap={16}>
      <Avatar src="/unooblog/nao-existe.svg" name={renata.name} size="lg" />
    </UblDocStage>
    <UblDocStage label="Diâmetro numérico: 20, 40 e 64px" gap={16}>
      <Avatar src={marina.avatarSrc} name={marina.name} size={20} />
      <Avatar src={marina.avatarSrc} name={marina.name} size={40} />
      <Avatar name={caio.name} size={64} />
    </UblDocStage>
    <UblDocStage label="Na assinatura de um post" surface="card" padding={24}>
      <BylineSample />
    </UblDocStage>
    <UblDocStage label="AvatarGroup: até 4 retratos e o resto em “+N”" gap={24}>
      <AvatarGroup avatars={ublAuthors} size="md" />
      <AvatarGroup avatars={[...ublAuthors, ...ublAuthors]} max={3} size="lg" />
      <AvatarGroup avatars={ublAuthors.slice(0, 2).map((author) => ({ name: author.name }))} size="sm" />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Passar o nome completo em name: ele gera as iniciais e o texto alternativo.',
        'Usar alt="" quando o nome está escrito ao lado do retrato.',
        'Usar retratos quadrados: o corte é circular e o centro da imagem fica.',
        'Dar ao AvatarGroup um aria-label próprio quando a pilha tiver um sentido ("Quem comentou").',
        'Escolher o degrau pelo contexto: sm em linhas densas e pilhas, lg no cabeçalho do post, xl no perfil.',
      ]}
      donts={[
        'Repetir o nome no alt quando ele já está ao lado: o leitor de tela lê duas vezes.',
        'Usar o Avatar para imagens que não são de pessoas.',
        'Passar só o primeiro nome esperando as duas iniciais.',
        'Escrever iniciais à mão no lugar de name.',
        'Empilhar mais de 5 retratos: a pilha vira ruído; use max e o contador “+N”.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="As iniciais e o fundo acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher surface="card">
      {() => (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <AvatarGroup avatars={ublAuthors} size="md" />
          <Avatar src={marina.avatarSrc} name={marina.name} size="lg" />
          <Avatar name={caio.name} size="lg" />
          <Avatar name={renata.name} size="md" />
          <Avatar name="Equipe" size="sm" />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="Avatar"
      rows={[
        { name: 'src', type: 'string', description: 'Retrato. Sem ele, ou se falhar ao carregar, mostra as iniciais.' },
        { name: 'name', type: 'string', description: 'Nome da pessoa: origem das iniciais e, sem alt, do texto alternativo (obrigatório).' },
        { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | number", default: "'md'", description: 'Diâmetro: 24, 32, 48, 72px ou um valor em pixels.' },
        { name: 'alt', type: 'string', description: 'Texto alternativo. Vazio ("") deixa o avatar decorativo; ausente vale o name.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLSpanElement>', description: 'Demais atributos (className, style, data-*).' },
      ]}
    />
    <UblDocPropsTable
      title="AvatarGroup"
      rows={[
        { name: 'avatars', type: '{ name: string; src?: string }[]', description: 'Pessoas da pilha, na ordem de exibição (a primeira fica por cima). Obrigatório.' },
        { name: 'max', type: 'number', default: '4', description: 'Quantos retratos aparecem antes do contador “+N”.' },
        { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | number", default: "'md'", description: 'Diâmetro dos retratos.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos; aria-label substitui o rótulo gerado ("Pessoas: …").' },
      ]}
    />
    <UblDocPropsTable
      title="Utilitários e tipos públicos"
      rows={[
        { name: 'ublInitials', type: '(name: string) => string', description: 'As iniciais usadas pelo componente: a primeira letra de até duas palavras.' },
        { name: 'UblAvatarSize', type: "'sm' | 'md' | 'lg' | 'xl'", description: 'Os quatro diâmetros nomeados.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Avatar> = {
  title: 'Unooblog/Componentes/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text', description: 'Retrato (vazio mostra as iniciais).' },
    name: { control: 'text', description: 'Nome da pessoa (iniciais e alt).' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 20, 40, 64],
      description: 'Diâmetro nomeado ou numérico.',
    },
    alt: { control: 'text', description: 'Texto alternativo (vazio deixa decorativo).' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    src: marina.avatarSrc,
    name: marina.name,
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
    <UblDocStage theme={args.theme ?? 'light'} padding={40}>
      <Avatar {...args} />
    </UblDocStage>
  ),
};

/**
 * Assinatura de um post, com o retrato decorativo ao lado do nome.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: assinatura do post',
  render: () => (
    <UblDocStage surface="card" padding={32}>
      <BylineSample />
    </UblDocStage>
  ),
};

/**
 * Retrato e iniciais.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UblDocStage label="Com retrato" gap={16}>
        {ublAuthors.slice(0, 5).map((author) => (
          <Avatar key={author.id} src={author.avatarSrc} name={author.name} size="lg" />
        ))}
      </UblDocStage>
      <UblDocStage label="Iniciais" gap={16}>
        {ublAuthors.slice(0, 5).map((author) => (
          <Avatar key={author.id} name={author.name} size="lg" />
        ))}
      </UblDocStage>
    </div>
  ),
};

/**
 * Os quatro diâmetros e um numérico.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage gap={16}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
          <Avatar src={marina.avatarSrc} name={marina.name} size={size} />
          <span style={{ fontFamily: 'var(--ubl-font-sans)', fontSize: 'var(--ubl-font-caption-size)', color: 'var(--ubl-color-text-secondary)' }}>
            {SIZE_LABEL[size]}
          </span>
        </div>
      ))}
      <div style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
        <Avatar src={marina.avatarSrc} name={marina.name} size={64} />
        <span style={{ fontFamily: 'var(--ubl-font-sans)', fontSize: 'var(--ubl-font-caption-size)', color: 'var(--ubl-color-text-secondary)' }}>
          64px
        </span>
      </div>
    </UblDocStage>
  ),
};

/**
 * Retrato, iniciais, falha de carga e decorativo.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage gap={24}>
      <Avatar src={marina.avatarSrc} name={marina.name} size="lg" />
      <Avatar name={caio.name} size="lg" />
      <Avatar src="/unooblog/nao-existe.svg" name={renata.name} size="lg" />
      <Avatar src={marina.avatarSrc} name={marina.name} size="lg" alt="" />
    </UblDocStage>
  ),
};

/**
 * A pilha de retratos: limite, contador e nome acessível do grupo.
 */
export const Grupo: Story = {
  name: 'Interação: AvatarGroup',
  render: () => (
    <UblDocStage gap={32} surface="card">
      <AvatarGroup avatars={[...ublAuthors, { name: 'Lia Duarte' }, { name: 'Davi Rocha' }]} max={3} data-testid="pilha" />
      <AvatarGroup avatars={ublAuthors.slice(0, 2)} />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pilha = canvas.getByTestId('pilha');

    // Três retratos visíveis e o contador com o restante
    await expect(pilha.querySelectorAll('.ubl-avatar')).toHaveLength(3);
    await expect(pilha).toHaveTextContent('+3');

    // O grupo se anuncia uma vez, com o nome de todas as pessoas
    const grupo = canvas.getByRole('group', { name: /Marina Azevedo.*Davi Rocha/ });
    await expect(grupo).toBe(pilha);

    // Os retratos individuais saem da árvore de acessibilidade
    await expect(within(pilha).queryByRole('img')).not.toBeInTheDocument();
  },
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UblDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="card" gap={16}>
          <Avatar src={marina.avatarSrc} name={marina.name} size="lg" />
          <Avatar name={caio.name} size="lg" />
          <Avatar name={renata.name} size="md" />
          <Avatar name="Equipe" size="sm" />
          <AvatarGroup avatars={ublAuthors} />
        </UblDocStage>
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
    <UblDocStage gap={24}>
      <Avatar src={marina.avatarSrc} name={marina.name} />
      <Avatar name="Juliana Mendes Costa" />
      <Avatar name="Mateus" />
      <Avatar src={marina.avatarSrc} name="Clarissa Vaz" alt="" data-testid="decorativo" />
      <Avatar src="/unooblog/nao-existe.svg" name="Thiago Santos" />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Com retrato: a imagem tem o nome como texto alternativo
    await expect(canvas.getByRole('img', { name: marina.name })).toBeInTheDocument();

    // Iniciais: a primeira letra de até duas palavras
    await expect(canvas.getByRole('img', { name: 'Juliana Mendes Costa' })).toHaveTextContent('JM');
    await expect(canvas.getByRole('img', { name: 'Mateus' })).toHaveTextContent('M');
    await expect(ublInitials('  ana   maria  ')).toBe('AM');

    // alt="" deixa o avatar fora da árvore de acessibilidade
    await expect(canvas.queryByRole('img', { name: 'Clarissa Vaz' })).not.toBeInTheDocument();

    // O retrato que falha cai nas iniciais, com o mesmo nome acessível
    await waitFor(() => expect(canvas.getByRole('img', { name: 'Thiago Santos' })).toHaveTextContent('TS'));
  },
};
