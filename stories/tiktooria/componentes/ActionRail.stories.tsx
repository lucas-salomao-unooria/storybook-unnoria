import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { ActionRail, Avatar, MusicDisc } from '../../../src/tiktooria';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocAnatomy,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocPropsTable,
  TikDocStage,
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { tikAvatarCraig, tikFeedForYou } from '../fixtures';

const meta: Meta<typeof ActionRail> = {
  title: 'Tik Tooria/Componentes/ActionRail',
  component: ActionRail,
  parameters: { layout: 'padded' },
  argTypes: { className: { control: 'text' } },
};

export default meta;

type Story = StoryObj<typeof ActionRail>;

const Rail: React.FC<{ likes?: string; comments?: string }> = ({
  likes = '328.7K',
  comments = '578',
}) => (
  <ActionRail>
    <ActionRail.Item icon="heart" label={likes} actionLabel="Curtir vídeo" />
    <ActionRail.Item icon="comment" label={comments} actionLabel="Ver comentários" />
    <ActionRail.Item icon="shareArrow" label="Share" actionLabel="Compartilhar vídeo" />
  </ActionRail>
);

const ActionRailDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Feed"
      title="ActionRail"
      description="Trilha vertical de 208px na borda direita do feed, com curtidas, comentários e compartilhamento. Os glifos são multicoloridos no arquivo — duas camadas cada — e os contadores usam Semibold 13 em branco com o estilo de efeito “Text Drop”, o único recurso de legibilidade que o arquivo aplica sobre o vídeo."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="❤️" title="Três ações fixas">
        Curtir, comentar e compartilhar. O arquivo não publica uma quarta ação nesta trilha.
      </TikDocCard>
      <TikDocCard icon="🎨" title="Glifos de duas camadas">
        Coração, comentário e seta empilham uma camada de sombra e uma de destaque, o que dá volume
        sobre qualquer vídeo. As duas cores são literais.
      </TikDocCard>
      <TikDocCard icon="✍️" title="Text Drop no contador">
        O rótulo herda <code>--tik-text-drop</code> automaticamente, para não desaparecer em quadros
        claros.
      </TikDocCard>
      <TikDocCard icon="🫥" title="90% de opacidade">
        O arquivo aplica opacidade de 90% ao conjunto glifo + rótulo de cada item.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:1069"
      frameName="Action Buttons — TikTok Home (For You)"
      specs={[
        { label: 'Dimensões', value: '41 × 208' },
        { label: 'Glifo', value: '≈35px de altura' },
        { label: 'Contador', value: 'Semibold 13 · Text Drop' },
        { label: 'Distância entre centros', value: '80px' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Espaçamento por coordenada',
          detail:
            'o arquivo posiciona os três itens em y=514, 590,5 e 670,5 — intervalos de 76,5 e 80px. O componente usa um gap único de 22px entre itens, o que reproduz a distância média sem coordenada fixa.',
        },
        {
          subject: 'Rótulo “Share” sem contador',
          detail:
            'os dois primeiros itens exibem número; o terceiro exibe a palavra “Share”. O componente aceita qualquer ReactNode em label, cobrindo os dois casos com a mesma API.',
        },
        {
          subject: 'Estado curtido',
          detail:
            'o arquivo mostra o coração sempre preenchido em vermelho, sem variante vazia. Não foi criado um estado “não curtido” — quem precisar dele deve trocar o glifo por heartStroke explicitamente.',
        },
        {
          subject: 'Realce ao pressionar',
          detail:
            'o arquivo é estático. Foi acrescentada uma redução de escala de 6% no :active, sem introduzir cor nova.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Trilha', role: 'Coluna centralizada com 22px entre itens.' },
        {
          name: 'Glifo',
          role: 'Ícone multicolorido de ~35px, a 90% de opacidade.',
          token: '--tik-icon-size-xl',
        },
        {
          name: 'Contador',
          role: 'Semibold 13 em branco com Text Drop.',
          token: '--tik-font-meta-strong-* · --tik-text-drop',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Trilha completa — “Home (For You)”" surface="immersive" gap={40}>
      <Rail />
      <Rail likes="4445" comments="64" />
    </TikDocStage>
    <TikDocStage label="Item isolado, com e sem contador" surface="immersive" gap={40}>
      <ActionRail>
        <ActionRail.Item icon="heart" label="328.7K" actionLabel="Curtir" />
      </ActionRail>
      <ActionRail>
        <ActionRail.Item icon="shareArrow" label="Share" actionLabel="Compartilhar" />
      </ActionRail>
      <ActionRail>
        <ActionRail.Item icon="comment" actionLabel="Comentar" />
      </ActionRail>
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Mantenha a ordem curtir → comentar → compartilhar.',
        'Informe actionLabel sempre que label for apenas um número.',
        'Posicione a trilha sobre o vídeo, acima do bloco de metadados.',
        'Use o glifo heartStroke quando precisar representar “não curtido”.',
      ]}
      donts={[
        'Não use a trilha sobre cromo claro: os glifos são desenhados para fundo escuro.',
        'Não acrescente uma quarta ação — o arquivo publica três.',
        'Não recolora os glifos multicoloridos com a prop tone.',
        'Não remova o Text Drop do contador.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher initial="immersive">{() => <Rail />}</TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="ActionRail"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Itens da trilha.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Demais atributos HTML são repassados ao contêiner.',
        },
      ]}
    />
    <TikDocPropsTable
      title="ActionRail.Item"
      rows={[
        {
          name: 'icon',
          type: 'TikIconName',
          description: 'Glifo da ação. heart, comment e shareArrow são multicoloridos.',
        },
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Contador ou rótulo sob o glifo, em Semibold 13.',
        },
        {
          name: 'actionLabel',
          type: 'string',
          description: 'Rótulo acessível, obrigatório quando label é apenas um número.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: "Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>",
          description: 'Demais atributos são repassados ao <button>, incluindo onClick.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ActionRailDocumentationPage />,
};

/**
 * Playground com 100% das props da ActionRail expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da ActionRail',
  render: (args) => (
    <div style={{ background: 'var(--tik-color-surface-immersive)', padding: 32 }}>
      <ActionRail {...args}>
        <ActionRail.Item icon="heart" label="328.7K" actionLabel="Curtir" />
        <ActionRail.Item icon="comment" label="578" actionLabel="Comentar" />
        <ActionRail.Item icon="shareArrow" label="Share" actionLabel="Compartilhar" />
      </ActionRail>
    </div>
  ),
};

/**
 * Playground do item, com todas as props expostas.
 */
export const PlaygroundItem: StoryObj<typeof ActionRail.Item> = {
  name: '🕹️ 2. Playground do ActionRail.Item',
  argTypes: {
    icon: {
      control: 'select',
      options: ['heart', 'comment', 'shareArrow', 'heartStroke', 'bookmark'],
    },
    label: { control: 'text' },
    actionLabel: { control: 'text' },
  },
  args: { icon: 'heart', label: '328.7K', actionLabel: 'Curtir vídeo' },
  render: (args) => (
    <div style={{ background: 'var(--tik-color-surface-immersive)', padding: 32 }}>
      <ActionRail>
        <ActionRail.Item {...args} />
      </ActionRail>
    </div>
  ),
};

/**
 * Réplica visual do frame oficial do Figma, sobre o quadro de vídeo exportado.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        position: 'relative',
        width: 414,
        height: 500,
        overflow: 'hidden',
        background: `center/cover no-repeat url(${tikFeedForYou})`,
      }}
    >
      <div style={{ position: 'absolute', right: 10, top: 40 }}>
        <Avatar size="sm" src={tikAvatarCraig} alt="" ring followable />
      </div>
      <div style={{ position: 'absolute', right: 13, top: 150 }}>
        <Rail />
      </div>
      <div style={{ position: 'absolute', right: 8, bottom: 20 }}>
        <MusicDisc spinning />
      </div>
    </div>
  ),
};

/**
 * Cada item da trilha isolado.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 40,
        background: 'var(--tik-color-surface-immersive)',
        padding: 32,
      }}
    >
      {(
        [
          { icon: 'heart' as const, label: '328.7K' },
          { icon: 'comment' as const, label: '578' },
          { icon: 'shareArrow' as const, label: 'Share' },
          { icon: 'heartStroke' as const, label: '0' },
        ]
      ).map((item) => (
        <ActionRail key={item.icon}>
          <ActionRail.Item icon={item.icon} label={item.label} actionLabel={item.icon} />
        </ActionRail>
      ))}
    </div>
  ),
};

/**
 * Composição modular com ActionRail.Item.
 */
export const ComposicaoModular: Story = {
  render: () => (
    <div style={{ background: 'var(--tik-color-surface-immersive)', padding: 32 }}>
      <ActionRail>
        <ActionRail.Item icon="heart" label="12.4K" actionLabel="Curtir" />
        <ActionRail.Item icon="comment" label="204" actionLabel="Comentar" />
        <ActionRail.Item icon="bookmark" label="Salvar" />
        <ActionRail.Item icon="shareArrow" label="Share" actionLabel="Compartilhar" />
      </ActionRail>
    </div>
  ),
};
