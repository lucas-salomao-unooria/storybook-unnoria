import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { StoriesTray } from '../../../src/unoovista/components/StoriesTray';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import { unvStoryItems, unvHighlightItems } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente StoriesTray.
 */
const StoriesTrayDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Histórias"
      title="StoriesTray"
      description="Faixa horizontal de histórias, logo abaixo da barra superior do feed. Rola na horizontal com encaixe, recuo lateral e sem barra visível nem fio. É também como se fazem os destaques do perfil: a mesma bandeja, plana e com anéis neutros."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma região rolável de células StoryBubble."
    />
    <UnvDocGrid>
      <UnvDocCard icon="📱" title="Feed">
        Cartão em camada sobre a tela: superfície primária, cantos arredondados e nenhum fio. A
        separação vem da mudança de superfície.
      </UnvDocCard>
      <UnvDocCard icon="⭐" title="Destaques do perfil">
        Com <code>bordered=&#123;false&#125;</code> a bandeja fica plana e transparente, e os itens
        usam os estados <code>seen</code> e <code>add</code>. Não há componente próprio.
      </UnvDocCard>
      <UnvDocCard icon="↔️" title="Rolagem com encaixe">
        <code>scroll-snap</code> alinha cada célula à margem inicial; o recuo lateral é o{' '}
        <code>--unv-gutter</code>. A rolagem não mostra barra, mas Tab percorre as células.
      </UnvDocCard>
      <UnvDocCard icon="🔊" title="Região nomeada">
        A faixa é uma região com nome (“Histórias”); cada célula anuncia o próprio estado.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="StoriesTray"
      layout="Faixa · rolagem horizontal"
      specs={[
        { label: 'Recuo lateral', value: '--unv-gutter · 16px' },
        { label: 'Recuo vertical', value: '16px no cartão · 8px plana' },
        { label: 'Intervalo entre células', value: '12px' },
        { label: 'Superfície (cartão)', value: '--unv-color-background-primary' },
        { label: 'Raio (cartão)', value: '--unv-radius-l · 16px' },
        { label: 'Encaixe', value: 'scroll-snap-type: x proximity' },
        { label: 'Rolagem', value: 'horizontal, sem barra visível' },
        { label: 'Fio', value: 'nenhum' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Cartão em camada em vez de faixa com fio',
          detail:
            'a bandeja se separa do fundo pela superfície primária sobre a secundária, com cantos de 16px. Não há fio inferior.',
        },
        {
          subject: 'bordered agora liga o cartão',
          detail:
            'o nome da prop foi mantido (API pública). Ligada, a bandeja é o cartão; desligada, é plana e transparente — o arranjo dos destaques do perfil, que já vivem sobre um cartão.',
        },
        {
          subject: 'Encaixe de rolagem',
          detail:
            'scroll-snap com scroll-padding-inline igual à margem lateral: ao soltar, a célula mais próxima alinha-se à margem em vez de parar cortada.',
        },
        {
          subject: 'Nome padrão da região',
          detail:
            'ariaLabel passa de “Stories” para “Histórias”. Os destaques do perfil passam ariaLabel="Destaques".',
        },
        {
          subject: 'Sem barra de rolagem',
          detail:
            'a barra fica oculta, como em telas de toque; o teclado continua alcançando todas as células, e a rolagem acompanha o foco.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Região rolável com rótulo acessível, contendo N células StoryBubble."
    />
    <UnvDocAnatomy
      zones={[
        { name: 'Região', role: 'role="region" com aria-label; contêiner de rolagem.', token: 'ariaLabel' },
        { name: 'Superfície', role: 'Cartão primário com cantos arredondados; plana sem bordered.', token: '--unv-color-background-primary · --unv-radius-l' },
        { name: 'Células', role: 'Uma StoryBubble por item, alinhadas ao início ao rolar.', token: 'items' },
      ]}
    />
    <UnvDocStage
      label="Bandeja do feed (375px)"
      surface="secondary"
      align="flex-start"
      padding={16}
    >
      <div style={{ width: 375 }}>
        <StoriesTray items={unvStoryItems} />
      </div>
    </UnvDocStage>
    <UnvDocStage
      label="Destaques do perfil (plana, anéis neutros)"
      surface="primary"
      align="flex-start"
      padding={16}
    >
      <div style={{ width: 375 }}>
        <StoriesTray items={unvHighlightItems} bordered={false} ariaLabel="Destaques" />
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes"
      description="Cartão e plana, diâmetros de avatar e volume de conteúdo."
    />
    <UnvDocStage label="Cartão e plana" surface="secondary" align="flex-start" padding={16}>
      <div style={{ width: 375, display: 'grid', gap: 16 }}>
        <StoriesTray items={unvStoryItems.slice(0, 4)} />
        <StoriesTray items={unvStoryItems.slice(0, 4)} bordered={false} />
      </div>
    </UnvDocStage>
    <UnvDocStage label="Diâmetros de avatar" surface="primary" align="flex-start" padding={16}>
      <div style={{ width: 375, display: 'grid', gap: 12 }}>
        {[48, 56, 64].map((size) => (
          <StoriesTray
            key={size}
            items={unvStoryItems.slice(0, 4)}
            avatarSize={size}
            bordered={false}
          />
        ))}
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Ordenar os itens por prioridade: ao vivo, novas, vistas.',
        'Usar bordered={false} nos destaques do perfil, dentro de um cartão.',
        'Informar ariaLabel quando a faixa não for de histórias (“Destaques”).',
        'Deixar a faixa rolar: 4 a 6 células cabem, o resto aparece ao deslizar.',
      ]}
      donts={[
        'Empilhar duas bandejas seguidas no mesmo cartão.',
        'Fixar a largura da bandeja: ela ocupa o contêiner e rola.',
        'Acrescentar fio ou sombra à bandeja para destacá-la.',
        'Esconder o rótulo das células para ganhar espaço.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfície, anéis e rótulos acompanham o tema."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={16}>
      {() => (
        <div style={{ width: 375, display: 'grid', gap: 16 }}>
          <StoriesTray items={unvStoryItems} />
          <StoriesTray items={unvHighlightItems} bordered={false} ariaLabel="Destaques" />
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UnvDocPropsTable
      title="StoriesTray"
      rows={[
        { name: 'items', type: 'UnvStoryItem[]', default: '[]', description: 'Itens da bandeja. Ignorado quando children é informado.' },
        { name: 'avatarSize', type: 'number', default: '56', description: 'Aresta do avatar interno de cada célula, em pixels.' },
        { name: 'bordered', type: 'boolean', default: 'true', description: 'Apresenta a bandeja como cartão em camada; falso, plana e transparente.' },
        { name: 'ariaLabel', type: 'string', default: "'Histórias'", description: 'Rótulo acessível da região.' },
        { name: 'onSelect', type: '(item, index) => void', description: 'Chamado ao selecionar uma célula.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo customizado; substitui items.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Repassados à região.' },
      ]}
    />
    <UnvDocPropsTable
      title="UnvStoryItem"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único do item.' },
        { name: 'username', type: 'string', description: 'Nome exibido abaixo do avatar.' },
        { name: 'avatarSrc', type: 'string', description: 'URL da imagem do avatar.' },
        { name: 'initials', type: 'string', description: 'Iniciais exibidas sem imagem.' },
        {
          name: 'state',
          type: "'unseen' | 'seen' | 'live' | 'add'",
          default: "'unseen'",
          description: 'Estado da história.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof StoriesTray> = {
  title: 'Unoovista/Componentes/StoriesTray',
  component: StoriesTray,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Itens renderizados na bandeja.' },
    avatarSize: {
      control: { type: 'range', min: 40, max: 80, step: 2 },
      description: 'Aresta do avatar de cada célula, em pixels.',
    },
    bordered: { control: 'boolean', description: 'Cartão em camada (ligado) ou plana (desligado).' },
    ariaLabel: { control: 'text', description: 'Rótulo acessível da região.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    onSelect: { action: 'onSelect' },
  },
  args: {
    items: unvStoryItems,
    avatarSize: 56,
    bordered: true,
    ariaLabel: 'Histórias',
  },
};

export default meta;

type Story = StoryObj<typeof StoriesTray>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <StoriesTrayDocumentationPage />,
};

/**
 * Playground com todas as propriedades da StoriesTray expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da StoriesTray',
  render: (args) => (
    <UnvDocStage
      theme={args.theme ?? 'light'}
      surface="secondary"
      align="flex-start"
      padding={16}
    >
      <div style={{ width: 375 }}>
        <StoriesTray {...args} />
      </div>
    </UnvDocStage>
  ),
};

/**
 * A bandeja do feed, com um item ao vivo, histórias novas e uma vista.
 */
export const BandejaDoFeed: Story = {
  name: '🎨 Bandeja do Feed',
  args: { onSelect: fn() },
  render: (args) => (
    <UnvDocStage surface="secondary" align="flex-start" padding={16}>
      <div style={{ width: 375 }}>
        <StoriesTray items={unvStoryItems} onSelect={args.onSelect} />
      </div>
    </UnvDocStage>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const regiao = tela.getByRole('region', { name: 'Histórias' });

    await expect(regiao).toBeInTheDocument();
    const celulas = within(regiao).getAllByRole('button');

    await expect(celulas).toHaveLength(unvStoryItems.length);
    await expect(celulas[1]).toHaveAccessibleName(`${unvStoryItems[1].username}, ao vivo`);
    await userEvent.click(celulas[1]);
    await expect(args.onSelect).toHaveBeenCalledTimes(1);
  },
};

/**
 * Faixa de destaques do perfil: plana, sem cartão, com anéis neutros.
 */
export const DestaquesDoPerfil: Story = {
  render: () => (
    <UnvDocStage surface="primary" align="flex-start" padding={16}>
      <div style={{ width: 375 }}>
        <StoriesTray items={unvHighlightItems} bordered={false} ariaLabel="Destaques" />
      </div>
    </UnvDocStage>
  ),
};

/**
 * Cartão e plana, lado a lado, nos dois temas.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UnvDocStage
          key={theme}
          label={`Tema ${theme}`}
          theme={theme}
          surface="secondary"
          align="flex-start"
          padding={16}
        >
          <div style={{ width: 375, display: 'grid', gap: 16 }}>
            <StoriesTray items={unvStoryItems} />
            <StoriesTray items={unvHighlightItems} bordered={false} ariaLabel="Destaques" />
          </div>
        </UnvDocStage>
      ))}
    </div>
  ),
};
