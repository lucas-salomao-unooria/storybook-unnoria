import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { TopicChip } from '../../../src/unooblog/components/TopicChip';
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
import { ublPosts, ublTopics } from '../fixtures';
import { notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Quantidade de posts de cada tópico, contada nas fixtures. */
const contagem = (id: string) => ublPosts.filter((post) => post.topicIds.includes(id)).length;

/** Espiões das estórias de interação. */
const escolherSpy = fn();
const desabilitadoSpy = fn();

/**
 * Filtro de tópicos de um feed: escolha única, com "Todos" e a contagem de cada
 * tópico. O produto guarda a escolha; o chip só anuncia `aria-pressed`.
 */
const FiltroDeTopicos: React.FC<{ aoEscolher?: (id: string) => void }> = ({ aoEscolher }) => {
  const [escolhido, setEscolhido] = useState('todos');
  const escolher = (id: string) => {
    setEscolhido(id);
    aoEscolher?.(id);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--ubl-spacing-m)', maxWidth: 560 }}>
      <div role="group" aria-label="Filtrar por tópico" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ubl-spacing-xs)' }}>
        <TopicChip selected={escolhido === 'todos'} count={ublPosts.length} onClick={() => escolher('todos')}>
          Todos
        </TopicChip>
        {ublTopics.map((topico) => (
          <TopicChip
            key={topico.id}
            selected={escolhido === topico.id}
            count={contagem(topico.id)}
            onClick={() => escolher(topico.id)}
          >
            {topico.label}
          </TopicChip>
        ))}
      </div>
      <p style={notaEstilo} data-testid="eco">
        Filtro ativo: {escolhido === 'todos' ? 'todos os posts' : ublTopics.find((topico) => topico.id === escolhido)?.label}
      </p>
    </div>
  );
};

/**
 * Página de documentação rica do componente TopicChip.
 */
const TopicChipDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Fundação"
      title="TopicChip"
      description="Chip em cápsula de um tópico: filtra o feed, leva à página do tópico ou só rotula um post. O elemento depende das props — link, botão de alternância ou texto —, e o chip escolhido ganha o roxo de ação e um glifo de marcação."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="O tópico é a forma de o blog se organizar."
    />
    <UblDocGrid>
      <UblDocCard icon="🔎" title="Filtro do feed">
        Com <code>onClick</code>, o chip é um botão de alternância: <code>selected</code> vira{' '}
        <code>aria-pressed</code>. Uma fileira deles filtra os posts por tópico.
      </UblDocCard>
      <UblDocCard icon="🔗" title="Link para o tópico">
        Com <code>href</code>, é um <code>&lt;a&gt;</code>: leva à página do tópico. O escolhido
        recebe <code>aria-current</code>.
      </UblDocCard>
      <UblDocCard icon="🏷️" title="Rótulo de um post">
        Sem <code>href</code> nem <code>onClick</code>, é um <code>&lt;span&gt;</code> informativo,
        sem foco: o tópico de um post dentro de um cartão que já é clicável.
      </UblDocCard>
      <UblDocCard icon="🔢" title="Contagem">
        <code>count</code> mostra quantos posts o tópico tem e entra no nome acessível (“Acessibilidade,
        12 posts”).
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="TopicChip"
      layout="Cápsula · 28px (sm) ou 36px (md) · alvo de 44px"
      specs={[
        { label: 'Alturas', value: 'sm 28px · md 36px (medidas locais --ubl-topic-chip-height-*)' },
        { label: 'Alvo de toque', value: '44px (--ubl-touch-target), por pseudoelemento' },
        { label: 'Forma', value: '--ubl-radius-full (cápsula)' },
        { label: 'Contorno', value: '1px · --ubl-color-border-control (≥ 3:1)' },
        { label: 'Texto', value: 'sm caption-strong 12/18 · md label 14/20' },
        { label: 'Escolhido', value: 'action-primary · text-on-action · glifo check' },
        { label: 'Contagem', value: 'caption 12/18 · text-secondary · números tabulares' },
        { label: 'Foco', value: 'contorno de 2px em focus-ring, afastado 2px' },
        { label: 'Servidor', value: 'Server Component: só recebe props (o onClick vem do consumidor)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Elemento conforme a função',
          detail:
            'link, botão ou texto: com href é <a>, com onClick (e sem href) é <button type="button">, e sem nenhum dos dois é <span>. aria-pressed só existe no botão — não é válido em link —, e no link o escolhido usa aria-current.',
        },
        {
          subject: 'Escolhido: cor e glifo',
          detail:
            'o chip escolhido troca o contorno por preenchimento de action-primary e ganha o glifo check. A seleção não depende da cor: quem não distingue o roxo vê a marcação.',
        },
        {
          subject: 'Contorno em border-control',
          detail:
            'o limite do chip é gráfico e precisa de 3:1 (WCAG 1.4.11); border-default reprovaria. Medido: border-control passa de 4,6:1 sobre a página e sobre o cartão, nos dois temas. O jornal usa a Tag, com contorno e caixa alta; o chip do blog é uma cápsula em caixa normal.',
        },
        {
          subject: 'Contagem no nome acessível',
          detail:
            'o número visual é aria-hidden e o leitor de tela recebe um texto equivalente (“, 12 posts”), com o singular em “1 post”. Assim o número não é lido como dado solto.',
        },
        {
          subject: 'Alvo de 44px sem engordar o chip',
          detail:
            'o chip desenha 28 ou 36px, mas um pseudoelemento centralizado estende a área de toque a 44px, como no IconButton pequeno.',
        },
        {
          subject: 'Desabilitado',
          detail:
            'o chip desabilitado perde foco e clique (disabled no botão; sem href e com aria-disabled no link) e troca o contorno para border-default e o texto para text-muted.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocAnatomy
      zones={[
        { name: 'Cápsula (a, button ou span)', role: 'Alvo com contorno de controle e raio total.', token: '--ubl-radius-full' },
        { name: 'Marca de escolha', role: 'Glifo check, só no chip escolhido.', token: '--ubl-icon-size-xs' },
        { name: 'Rótulo', role: 'Nome do tópico; trunca com reticências.', token: '--ubl-font-label-*' },
        { name: 'Contagem', role: 'Número de posts, decorativo (o texto equivalente é lido).', token: '--ubl-font-caption-*' },
        { name: 'Anel de foco', role: 'Contorno de 2px, só no foco por teclado.', token: '--ubl-color-focus-ring' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real: tamanhos, os três elementos e os estados."
    />
    <UblDocStage label="Tamanhos: sm e md" gap={12} padding={24}>
      <TopicChip size="sm" onClick={() => undefined}>
        Acessibilidade
      </TopicChip>
      <TopicChip size="md" onClick={() => undefined}>
        Acessibilidade
      </TopicChip>
      <TopicChip size="sm" selected onClick={() => undefined}>
        Acessibilidade
      </TopicChip>
      <TopicChip size="md" selected onClick={() => undefined}>
        Acessibilidade
      </TopicChip>
    </UblDocStage>
    <UblDocStage label="Elemento: botão, link e texto" gap={12} padding={24}>
      <TopicChip onClick={() => undefined}>Botão</TopicChip>
      <TopicChip href="#acessibilidade">Link</TopicChip>
      <TopicChip>Texto</TopicChip>
    </UblDocStage>
    <UblDocStage label="Com contagem" gap={12} padding={24}>
      <TopicChip count={12} onClick={() => undefined}>
        Acessibilidade
      </TopicChip>
      <TopicChip count={1} selected onClick={() => undefined}>
        Escrita
      </TopicChip>
    </UblDocStage>
    <UblDocStage label="Desabilitado" gap={12} padding={24}>
      <TopicChip disabled onClick={() => undefined}>
        Carreira
      </TopicChip>
      <TopicChip disabled selected onClick={() => undefined}>
        Carreira
      </TopicChip>
    </UblDocStage>
    <UblDocStage label="Filtro de um feed" surface="card" padding={24}>
      <FiltroDeTopicos />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Usar o chip como filtro de escolha única dentro de um role="group" com aria-label.',
        'Incluir uma opção "Todos" para voltar ao feed completo.',
        'Usar href quando o chip leva a outra página, e onClick quando filtra na própria página.',
        'Mostrar a contagem quando ela ajuda a escolher.',
      ]}
      donts={[
        'Pôr um chip clicável dentro de um cartão inteiro clicável: use o chip sem ação (texto).',
        'Usar aria-pressed em link: vale só para botão.',
        'Indicar o chip escolhido só pela cor do fundo: o glifo de marcação acompanha.',
        'Escrever nomes de tópico longos: o chip trunca.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Contorno, preenchimento e glifo acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher surface="card">
      {() => (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <TopicChip count={12} onClick={() => undefined}>
            Acessibilidade
          </TopicChip>
          <TopicChip selected count={4} onClick={() => undefined}>
            Escrita
          </TopicChip>
          <TopicChip disabled onClick={() => undefined}>
            Carreira
          </TopicChip>
          <TopicChip href="#educacao">Educação</TopicChip>
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="TopicChip"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Nome do tópico (obrigatório).' },
        { name: 'selected', type: 'boolean', default: 'false', description: 'Escolhido: aria-pressed no botão, aria-current no link; ganha o glifo check.' },
        { name: 'count', type: 'number', description: 'Quantidade de posts; entra no nome acessível.' },
        { name: 'href', type: 'string', description: 'Com href, renderiza um <a>.' },
        { name: 'onClick', type: 'React.MouseEventHandler<HTMLElement>', description: 'Com onClick (e sem href), renderiza um <button> de alternância.' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Altura de 28 ou 36px.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Chip inativo: sem foco e sem clique.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos (className, aria-*, data-*).' },
      ]}
    />
    <UblDocPropsTable
      title="Tipos públicos"
      rows={[{ name: 'UblTopicChipSize', type: "'sm' | 'md'", description: 'Os dois tamanhos.' }]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TopicChip> = {
  title: 'Unooblog/Componentes/TopicChip',
  component: TopicChip,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Nome do tópico.' },
    selected: { control: 'boolean', description: 'Tópico escolhido.' },
    count: { control: { type: 'number', min: 0, max: 99 }, description: 'Quantidade de posts.' },
    href: { control: 'text', description: 'Com href, vira link (<a>).' },
    onClick: { action: 'onClick', description: 'Com onClick, vira botão de alternância.' },
    size: { control: 'radio', options: ['sm', 'md'], description: 'Tamanho.' },
    disabled: { control: 'boolean', description: 'Desabilita.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    children: 'Acessibilidade',
    selected: false,
    count: 12,
    size: 'md',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof TopicChip>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TopicChipDocumentationPage />,
};

/**
 * Playground com 100% das props expostas. O `onClick` vem das Ações e dá ao
 * chip o papel de botão.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TopicChip',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} padding={40}>
      <TopicChip {...args} />
    </UblDocStage>
  ),
};

/**
 * O filtro de tópicos de um feed, com "Todos" e a contagem de cada tópico.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: filtro de tópicos',
  render: () => (
    <UblDocStage surface="card" padding={32}>
      <FiltroDeTopicos />
    </UblDocStage>
  ),
};

/**
 * Botão, link e texto, escolhidos ou não.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UblDocStage label="Botão (alterna)" gap={12} padding={24}>
        <TopicChip onClick={() => undefined}>Educação</TopicChip>
        <TopicChip selected onClick={() => undefined}>
          Educação
        </TopicChip>
      </UblDocStage>
      <UblDocStage label="Link" gap={12} padding={24}>
        <TopicChip href="#educacao">Educação</TopicChip>
        <TopicChip href="#educacao" selected>
          Educação
        </TopicChip>
      </UblDocStage>
      <UblDocStage label="Texto" gap={12} padding={24}>
        <TopicChip>Educação</TopicChip>
        <TopicChip count={5}>Educação</TopicChip>
      </UblDocStage>
    </div>
  ),
};

/**
 * Os dois tamanhos.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage gap={16} padding={24}>
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
          <TopicChip size={size} count={12} onClick={() => undefined}>
            Acessibilidade
          </TopicChip>
          <span style={notaEstilo}>{size === 'sm' ? 'sm · 28px' : 'md · 36px'}</span>
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * Repouso, escolhido, com contagem e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage gap={12} padding={24}>
      <TopicChip onClick={() => undefined}>Repouso</TopicChip>
      <TopicChip selected onClick={() => undefined}>
        Escolhido
      </TopicChip>
      <TopicChip count={12} onClick={() => undefined}>
        Com contagem
      </TopicChip>
      <TopicChip disabled onClick={() => undefined}>
        Desabilitado
      </TopicChip>
    </UblDocStage>
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
        <UblDocStage
          key={theme}
          label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={theme}
          surface="card"
          gap={12}
          padding={24}
        >
          <TopicChip count={12} onClick={() => undefined}>
            Acessibilidade
          </TopicChip>
          <TopicChip selected count={4} onClick={() => undefined}>
            Escrita
          </TopicChip>
          <TopicChip disabled onClick={() => undefined}>
            Carreira
          </TopicChip>
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: o filtro escolhe um tópico por vez, por clique e por teclado, e o
 * `aria-pressed` acompanha; a contagem entra no nome acessível; o desabilitado
 * não dispara.
 */
export const Filtrar: Story = {
  name: 'Interação: filtro com aria-pressed',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <FiltroDeTopicos aoEscolher={escolherSpy} />
      <TopicChip disabled onClick={desabilitadoSpy}>
        Indisponível
      </TopicChip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    escolherSpy.mockClear();
    desabilitadoSpy.mockClear();
    const canvas = within(canvasElement);

    // "Todos" começa escolhido; o nome acessível leva a contagem
    const todos = canvas.getByRole('button', { name: new RegExp(`^Todos\\s*,\\s*${ublPosts.length} posts$`) });
    await expect(todos).toHaveAttribute('aria-pressed', 'true');

    const total = contagem('acessibilidade');
    const acessibilidade = canvas.getByRole('button', {
      name: new RegExp(`^Acessibilidade\\s*,\\s*${total} ${total === 1 ? 'post' : 'posts'}$`),
    });
    await expect(acessibilidade).toHaveAttribute('aria-pressed', 'false');

    // Clique escolhe e solta o anterior
    await userEvent.click(acessibilidade);
    await expect(acessibilidade).toHaveAttribute('aria-pressed', 'true');
    await expect(todos).toHaveAttribute('aria-pressed', 'false');
    await expect(escolherSpy).toHaveBeenCalledWith('acessibilidade');
    await expect(canvas.getByTestId('eco')).toHaveTextContent('Filtro ativo: Acessibilidade');

    // O escolhido ganha o glifo de marcação: a seleção não é só cor
    await expect(acessibilidade.querySelector('.ubl-topic-chip__check')).not.toBeNull();

    // Teclado: Enter e Espaço acionam
    todos.focus();
    await userEvent.keyboard('{Enter}');
    await expect(todos).toHaveAttribute('aria-pressed', 'true');
    acessibilidade.focus();
    await userEvent.keyboard(' ');
    await expect(acessibilidade).toHaveAttribute('aria-pressed', 'true');

    // O desabilitado não dispara
    const desabilitado = canvas.getByRole('button', { name: 'Indisponível' });
    await expect(desabilitado).toBeDisabled();
    await userEvent.click(desabilitado);
    await expect(desabilitadoSpy).not.toHaveBeenCalled();
  },
};

/**
 * Interação: o elemento depende das props — link com `aria-current`, texto sem
 * foco e botão de alternância.
 */
export const Elementos: Story = {
  name: 'Interação: link, texto e botão',
  render: () => (
    <UblDocStage gap={12} padding={24}>
      <TopicChip href="#escrita" selected>
        Escrita
      </TopicChip>
      <TopicChip data-testid="texto">Carreira</TopicChip>
      <TopicChip onClick={() => undefined}>Educação</TopicChip>
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link', { name: 'Escrita' });
    await expect(link).toHaveAttribute('href', '#escrita');
    await expect(link).toHaveAttribute('aria-current', 'true');
    await expect(link).not.toHaveAttribute('aria-pressed');

    // O texto não é interativo
    await expect(canvas.getByTestId('texto').tagName).toBe('SPAN');
    await expect(canvas.getAllByRole('button')).toHaveLength(1);

    // O botão de alternância declara aria-pressed
    await expect(canvas.getByRole('button', { name: 'Educação' })).toHaveAttribute('aria-pressed', 'false');
  },
};
