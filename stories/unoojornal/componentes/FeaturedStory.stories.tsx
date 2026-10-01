import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { FeaturedStory } from '../../../src/unoojornal/components/FeaturedStory';
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
import { materiaPrincipal, propsDoDestaque } from './capa.demo';

const BAR = '#716C98';

/** Espiões das estórias de interação. */
const openSpy = fn();
const linkSpy = fn();

const destaque = propsDoDestaque(materiaPrincipal);

/**
 * Página de documentação rica do componente FeaturedStory.
 */
const FeaturedStoryDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Capa"
      title="FeaturedStory"
      description="A matéria principal da capa: fotografia grande em 3:2 e, ao lado, etiqueta da seção, título em headline, resumo, botão “Ler a reportagem” e a assinatura. No contêiner estreito, a fotografia vai para cima do texto."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma por edição, no alto da capa."
    />
    <UjnDocGrid>
      <UjnDocCard icon="⭐" title="Matéria principal">
        O destaque da edição. O título é o degrau <code>headline</code>; é o maior texto da capa
        depois do título da publicação.
      </UjnDocCard>
      <UjnDocCard icon="📐" title="Duas colunas, uma coluna">
        Responde ao <strong>contêiner</strong>: duas colunas a partir de 640px, empilhado abaixo
        disso — vale também numa coluna estreita de página.
      </UjnDocCard>
      <UjnDocCard icon="🖱️" title="Um alvo só">
        O botão primário é o único ponto de foco do cartão, com o título da matéria no nome
        acessível.
      </UjnDocCard>
      <UjnDocCard icon="✍️" title="Assinatura">
        A <code>Byline</code> na base: autoria em negrito à esquerda e tempo de leitura à
        direita.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="FeaturedStory"
      layout="Imagem 3:2 + coluna de texto"
      specs={[
        { label: 'Estrutura herdada', value: 'quadro homepage-default 3:7 (só a estrutura)' },
        { label: 'Fotografia', value: '3:2 · --ujn-radius-s · cobre a coluna' },
        { label: 'Colunas', value: '≥ 640px de contêiner: 1,15fr + 1fr, vão de 32px · abaixo, empilhado' },
        { label: 'Título', value: 'headline 34/48px (≥ 640px) · title-lg 24/34px no compacto' },
        { label: 'Resumo', value: 'body-lg 18/28px (≥ 640px) · body-md 16/24px no compacto' },
        { label: 'Etiqueta', value: 'Tag outline md' },
        { label: 'Botão', value: 'Button primary md (44px) com seta · “Ler a reportagem”' },
        { label: 'Assinatura', value: 'Byline inline, com fio de 1px acima' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Botão como único alvo',
          detail:
            'a fotografia e o título não são links: o botão primário é o ponto de foco, e seu nome acessível é “Ler a reportagem: título”, para que dois destaques na mesma página não se confundam.',
        },
        {
          subject: 'Contêiner, não janela',
          detail:
            'a disposição em duas colunas usa @container (≥ 640px): o destaque dentro de um quadro de documentação estreito empilha mesmo numa janela larga.',
        },
        {
          subject: 'Dourado e serifa do Figma',
          detail:
            'o arquivo de origem usa serifa e dourado no destaque; aqui o título é Open Sans bold e a ação é o roxo de action-primary.',
        },
        {
          subject: 'Cantos de 4px',
          detail: 'o jornal é reto: a fotografia usa --ujn-radius-s, e só pílula e avatar arredondam.',
        },
        {
          subject: 'Client Component',
          detail: 'repassa onOpen ao Button; por isso o arquivo começa com \'use client\'.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocStage label="Largura de 1000px" surface="page" align="stretch" direction="column" padding={24} width={1000}>
      <FeaturedStory {...destaque} href="#reportagem" />
    </UjnDocStage>
    <UjnDocAnatomy
      zones={[
        { name: 'Fotografia 3:2', role: 'Descrita pelo imageAlt; fundo sutil até carregar.', token: '--ujn-color-background-subtle · --ujn-radius-s' },
        { name: 'Etiqueta', role: 'A seção, numa Tag outline.', token: 'Tag' },
        { name: 'Título', role: 'Heading de nível 2.', token: '--ujn-font-headline-*' },
        { name: 'Resumo', role: 'Duas a quatro linhas.', token: '--ujn-font-body-lg-* · --ujn-color-text-secondary' },
        { name: 'Botão primário', role: 'Único alvo: link com href, botão com onOpen.', token: 'Button primary' },
        { name: 'Assinatura', role: 'Autoria, papel e tempo de leitura.', token: 'Byline' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Largo, médio e compacto, e o destaque sem destino."
    />
    <div style={{ display: 'grid', gap: 16 }}>
      {[1000, 700, 360].map((width) => (
        <UjnDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" padding={24} width={width}>
          <FeaturedStory {...destaque} href="#reportagem" />
        </UjnDocStage>
      ))}
      <UjnDocStage label="Sem href nem onOpen: só informa" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <FeaturedStory {...destaque} authorRole={undefined} readingTime={undefined} />
      </UjnDocStage>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Escolher uma fotografia que ilustre a matéria e descrevê-la em imageAlt.',
        'Manter o resumo em até quatro linhas: ele não é cortado.',
        'Usar href quando a matéria tem endereço, e onOpen quando abre dentro do app.',
        'Colocar o destaque sozinho no alto da capa.',
      ]}
      donts={[
        'Usar dois FeaturedStory na mesma capa: o destaque perde o sentido.',
        'Deixar imageAlt vazio: a fotografia é informação, não enfeite.',
        'Trocar o rótulo do botão por “Clique aqui”.',
        'Pôr a assinatura em outro lugar: ela fecha o bloco.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfícies, fios, texto e botão acompanham data-ujn-theme."
    />
    <UjnDocThemeSwitcher surface="page" padding={24}>
      {() => (
        <div style={{ width: 900 }}>
          <FeaturedStory {...destaque} href="#reportagem" />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="FeaturedStory"
      rows={[
        { name: 'kicker', type: 'string', description: 'Etiqueta da seção. Obrigatória.' },
        { name: 'title', type: 'string', description: 'Título da matéria. Obrigatório.' },
        { name: 'summary', type: 'string', description: 'Resumo. Obrigatório.' },
        { name: 'imageSrc', type: 'string', description: 'Endereço da fotografia. Obrigatório.' },
        { name: 'imageAlt', type: 'string', description: 'Descrição da fotografia. Obrigatória.' },
        { name: 'author', type: 'string', description: 'Nome de quem assina. Obrigatório.' },
        { name: 'authorRole', type: 'string', description: 'Papel ou turma.' },
        { name: 'readingTime', type: 'string', description: 'Tempo de leitura formatado.' },
        { name: 'ctaLabel', type: 'string', default: "'Ler a reportagem'", description: 'Rótulo do botão.' },
        { name: 'href', type: 'string', description: 'Faz do botão um <a>.' },
        { name: 'onOpen', type: '(event: MouseEvent<HTMLElement>) => void', description: 'Abre a matéria; sem href, faz do botão um <button>.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos do <article>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof FeaturedStory> = {
  title: 'Unoojornal/Componentes/FeaturedStory',
  component: FeaturedStory,
  parameters: { layout: 'padded' },
  argTypes: {
    kicker: { control: 'text', description: 'Etiqueta da seção.' },
    title: { control: 'text', description: 'Título.' },
    summary: { control: 'text', description: 'Resumo.' },
    imageSrc: { control: 'text', description: 'Endereço da fotografia.' },
    imageAlt: { control: 'text', description: 'Descrição da fotografia.' },
    author: { control: 'text', description: 'Nome de quem assina.' },
    authorRole: { control: 'text', description: 'Papel ou turma.' },
    readingTime: { control: 'text', description: 'Tempo de leitura.' },
    ctaLabel: { control: 'text', description: 'Rótulo do botão.' },
    href: { control: 'text', description: 'Endereço (faz do botão um link).' },
    onOpen: { action: 'onOpen', description: 'Abre a matéria.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    ...destaque,
    ctaLabel: 'Ler a reportagem',
  },
};

export default meta;

type Story = StoryObj<typeof FeaturedStory>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <FeaturedStoryDocumentationPage />,
};

/**
 * Playground do destaque, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do FeaturedStory',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} surface="page" align="stretch" direction="column" padding={24} width={1000}>
      <FeaturedStory {...args} />
    </UjnDocStage>
  ),
};

/**
 * O destaque da capa, na largura da página.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: destaque da capa',
  render: () => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={32} width={1280}>
      <FeaturedStory {...destaque} href="#reportagem" />
    </UjnDocStage>
  ),
};

/**
 * Largo, médio e compacto: o destaque responde ao contêiner.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[1000, 700, 360].map((width) => (
        <UjnDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" padding={24} width={width}>
          <FeaturedStory {...destaque} href="#reportagem" />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Com link, com botão e só informativo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="Link (href)" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <FeaturedStory {...destaque} href="#reportagem" />
      </UjnDocStage>
      <UjnDocStage label="Botão (onOpen)" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <FeaturedStory {...destaque} onOpen={() => undefined} />
      </UjnDocStage>
      <UjnDocStage label="Só informa" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <FeaturedStory {...destaque} />
      </UjnDocStage>
    </div>
  ),
};

/**
 * Rótulo do botão personalizado e assinatura mínima.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="Rótulo personalizado" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <FeaturedStory {...destaque} ctaLabel="Continuar lendo" href="#reportagem" />
      </UjnDocStage>
      <UjnDocStage label="Assinatura mínima (sem papel nem tempo de leitura)" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <FeaturedStory {...destaque} authorRole={undefined} readingTime={undefined} href="#reportagem" />
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
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="stretch" direction="column" padding={24} width={1000}>
          <FeaturedStory {...destaque} href="#reportagem" />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: o botão abre a matéria por clique e por Enter, e o link mantém o
 * `href`.
 */
export const Abrir: Story = {
  name: 'Interação: abrir a matéria',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="Com onOpen" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <FeaturedStory {...destaque} onOpen={openSpy} />
      </UjnDocStage>
      <UjnDocStage label="Com href" surface="page" align="stretch" direction="column" padding={24} width={1000}>
        <FeaturedStory
          {...destaque}
          ctaLabel="Abrir a reportagem"
          href="#reportagem"
          onOpen={(event) => {
            event.preventDefault();
            linkSpy();
          }}
        />
      </UjnDocStage>
    </div>
  ),
  play: async ({ canvasElement }) => {
    openSpy.mockClear();
    linkSpy.mockClear();
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', { name: new RegExp(`^Ler a reportagem: ${materiaPrincipal.title.slice(0, 20)}`) });
    await userEvent.click(button);
    await expect(openSpy).toHaveBeenCalledTimes(1);
    button.focus();
    await userEvent.keyboard('{Enter}');
    await expect(openSpy).toHaveBeenCalledTimes(2);

    const link = canvas.getByRole('link', { name: /^Abrir a reportagem:/ });
    await expect(link).toHaveAttribute('href', '#reportagem');
    await userEvent.click(link);
    await expect(linkSpy).toHaveBeenCalledTimes(1);

    await expect(canvas.getAllByRole('heading', { level: 2 })).toHaveLength(2);
  },
};
