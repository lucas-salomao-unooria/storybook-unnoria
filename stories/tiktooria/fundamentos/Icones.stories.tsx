import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Icon, tikIconNames, tikIconRegistry } from '../../../src/tiktooria';
import type { TikIconName, TikIconTone } from '../../../src/tiktooria';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocPropsTable,
  TikDocStage,
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';

const meta: Meta<typeof Icon> = {
  title: 'Tik Tooria/Fundamentos/Ícones',
  component: Icon,
  parameters: { layout: 'padded' },
  argTypes: {
    name: {
      control: 'select',
      options: tikIconNames,
      description: 'Nome do glifo na biblioteca oficial exportada do Figma.',
    },
    size: {
      control: { type: 'number', min: 8, max: 96, step: 1 },
      description: 'Altura do glifo em pixels; a largura vem do viewBox.',
    },
    tone: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'tabInactive',
        'tabActive',
        'tabDisabled',
        'onImmersive',
        'onImmersiveMuted',
        'brand',
        'empty',
        'emptyAlt',
        'statusBar',
        'inherit',
      ] satisfies TikIconTone[],
      description: 'Tom semântico; ignorado por glifos multicoloridos.',
    },
    rotate: { control: { type: 'range', min: -180, max: 180, step: 1 } },
    flipX: { control: 'boolean' },
    title: { control: 'text' },
  },
  args: {
    name: 'heart',
    size: 35,
    tone: 'default',
    rotate: 0,
    flipX: false,
    title: '',
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

const GROUPS: { title: string; description: string; names: TikIconName[] }[] = [
  {
    title: 'Navegação e cromo',
    description: 'Divisa, retorno, fechamento, busca e códigos.',
    names: [
      'chevron',
      'arrowBack',
      'close',
      'closeSmall',
      'caretDown',
      'menu',
      'plus',
      'search',
      'scanner',
      'qrCode',
      'tikCode',
      'scannerBrackets',
      'send',
      'share',
    ],
  },
  {
    title: 'Barra de abas',
    description: 'Os pares contorno/preenchido de cada aba.',
    names: [
      'homeStroke',
      'homeSolid',
      'messageStroke',
      'messageSolid',
      'accountStroke',
      'accountSolid',
    ],
  },
  {
    title: 'Trilha de ações do feed',
    description: 'Glifos multicoloridos sobre o vídeo — ignoram a prop tone.',
    names: ['heart', 'comment', 'shareArrow', 'followPlus', 'musicNote', 'floatingTones'],
  },
  {
    title: 'Comentários e compositor',
    description: 'Curtida, respostas, selo verificado e ações do compositor.',
    names: ['heartStroke', 'caretReplies', 'verified', 'emoji', 'adSign'],
  },
  {
    title: 'Linhas de configuração e perfil',
    description: 'Um glifo por linha das telas de configuração e edição.',
    names: [
      'pen',
      'question',
      'bell',
      'book',
      'umbrella',
      'accessibility',
      'drop',
      'lock',
      'camera',
      'wallet',
      'clipboard',
      'videoCamera',
      'videoCameraSolid',
    ],
  },
  {
    title: 'Descoberta e perfil',
    description: 'Convites, contatos, salvos e abas do perfil.',
    names: [
      'addAccountStroke',
      'contacts',
      'addAccount',
      'bookmark',
      'bookmarkSmall',
      'bookmarkMedium',
      'gridTabs',
      'heartHide',
      'calloutBubble',
    ],
  },
  {
    title: 'Folha de compartilhamento',
    description: 'As seis ações do produto na folha.',
    names: ['report', 'download', 'brokenHeart', 'duet', 'react', 'messageArrow'],
  },
  {
    title: 'Câmera',
    description: 'As seis ferramentas da coluna, o atalho de sons e as ilustrações.',
    names: [
      'flip',
      'speed',
      'magicPen',
      'filters',
      'timer',
      'flash',
      'doubleTone',
      'play',
      'effectsIllustration',
      'uploadIllustration',
    ],
  },
  {
    title: 'Estados vazios e barra de status',
    description: 'Ilustrações de lista vazia e os três glifos de sistema.',
    names: ['emptyInbox', 'emptyMessages', 'battery', 'wifi', 'mobileSignal'],
  },
];

const IconCell: React.FC<{ name: TikIconName; onImmersive?: boolean }> = ({
  name,
  onImmersive = false,
}) => {
  const definition = tikIconRegistry[name];

  return (
    <div
      style={{
        border: '1px solid #E4E8E9',
        borderRadius: 10,
        padding: 14,
        textAlign: 'center',
        background: onImmersive ? 'var(--tik-color-surface-immersive)' : '#FFFFFF',
      }}
    >
      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        <Icon name={name} size={definition.viewBox.includes('250') ? 40 : 28} tone={onImmersive ? 'onImmersive' : 'primary'} />
      </div>
      <div
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          color: onImmersive ? '#FFFFFF' : '#22272A',
          wordBreak: 'break-all',
        }}
      >
        {name}
      </div>
      <div style={{ fontSize: 10.5, color: onImmersive ? '#8A8B8F' : '#475157', marginTop: 2 }}>
        {definition.figmaName}
      </div>
      <div style={{ fontSize: 10, color: '#6487C2', marginTop: 2 }}>
        {definition.figmaNode} · {definition.viewBox}
      </div>
      {definition.multicolor && (
        <div style={{ fontSize: 10, color: '#EA4359', marginTop: 2 }}>multicolorido</div>
      )}
    </div>
  );
};

const IconsDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Fundamentos • Ícones"
      title="Ícones"
      description={`Biblioteca de ${tikIconNames.length} glifos exportados literalmente do arquivo Figma. Nenhum caminho foi desenhado à mão, aproximado ou substituído por outra biblioteca: cada atributo d é o export SVG do nó, e o viewBox original é preservado — não normalizado para 24×24 — de modo que as proporções sejam idênticas às do arquivo.`}
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🔒" title="Vetores literais">
        Todo glifo vive em <code>src/tiktooria/components/Icon/IconPaths.tsx</code> com{' '}
        <code>figmaName</code>, <code>figmaNode</code>, <code>viewBox</code> e <code>usage</code>{' '}
        preenchidos. É proibido acrescentar um símbolo que não exista no arquivo.
      </TikDocCard>
      <TikDocCard icon="📐" title="Altura governa o tamanho">
        A prop <code>size</code> define a <strong>altura</strong>; a largura é derivada da razão do{' '}
        <code>viewBox</code>. Isso preserva glifos não quadrados como <code>menu</code> (18×4) e{' '}
        <code>chevron</code> (6×11).
      </TikDocCard>
      <TikDocCard icon="🎨" title="Oito glifos multicoloridos">
        Coração, comentário, seta de compartilhamento, botão de seguir, selo verificado, bateria e as
        duas ilustrações da câmera têm cores literais do arquivo e ignoram <code>tone</code>.
      </TikDocCard>
      <TikDocCard icon="♻️" title="Rotação em vez de duplicação">
        Quando o arquivo reaproveita um vetor girado, use a prop <code>rotate</code> — nunca duplique
        o caminho com coordenadas reescritas.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:171"
      frameName="Página TikTok — exports SVG por nó"
      specs={[
        { label: 'Glifos registrados', value: String(tikIconNames.length) },
        { label: 'Glifos multicoloridos', value: '8' },
        { label: 'viewBox preservado', value: 'sim, sem normalização' },
        { label: 'Biblioteca de ícones publicada', value: 'nenhuma' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Ausência de biblioteca de ícones',
          detail:
            'o arquivo comunitário não publica um conjunto de componentes de ícone: cada glifo é um nó VECTOR ou BOOLEAN_OPERATION solto dentro de um frame de tela. A biblioteca foi montada nó a nó, deduplicando por forma idêntica.',
        },
        {
          subject: 'viewBox arredondado pelo export',
          detail:
            'o export SVG do Figma arredonda o viewBox para inteiros (por exemplo 24×21 para um nó de 23,242×20,925). O caminho é literal; o arredondamento é do exportador e produz uma diferença sub-pixel.',
        },
        {
          subject: 'Glifos reaproveitados em escalas diferentes',
          detail:
            'search, accountStroke e messageStroke aparecem em dois tamanhos no arquivo (campo de busca e barra de abas). São o mesmo vetor, registrado uma única vez — não duplicado.',
        },
        {
          subject: 'calloutBubble e scannerBrackets',
          detail:
            'não são ícones de interface, mas vetores literais de contorno (balão da chamada e cantoneiras do leitor). Estão no registro porque é o único lugar onde dado vetorial literal pode viver, conforme a regra de iconografia.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia da biblioteca"
      description="Os glifos agrupados pela função no produto, com nome no Figma, nó de origem e viewBox."
      barColor="#65D2E9"
    />
    {GROUPS.map((group) => (
      <div key={group.title} style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 15, margin: '0 0 4px 0', color: '#22272A' }}>{group.title}</h3>
        <p style={{ fontSize: 13, margin: '0 0 12px 0', color: '#475157' }}>{group.description}</p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 12,
          }}
        >
          {group.names.map((name) => (
            <IconCell key={name} name={name} />
          ))}
        </div>
      </div>
    ))}

    <UnooriaDocSectionHeader
      title="4. Matriz de tamanhos e tons"
      barColor="#161722"
    />
    <TikDocStage label="Os cinco tamanhos nomeados" surface="chrome" gap={24}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Icon name="heartStroke" size={size} tone="primary" />
          <div style={{ fontSize: 11, color: 'var(--tik-color-text-secondary)', marginTop: 6 }}>
            {size}
          </div>
        </div>
      ))}
    </TikDocStage>
    <TikDocStage label="Tons sobre cromo claro" surface="chrome" gap={20}>
      {(['default', 'primary', 'secondary', 'tabInactive', 'tabDisabled', 'brand', 'empty'] as const).map(
        (tone) => (
          <div key={tone} style={{ textAlign: 'center' }}>
            <Icon name="bell" size={24} tone={tone} />
            <div style={{ fontSize: 11, color: 'var(--tik-color-text-secondary)', marginTop: 6 }}>
              {tone}
            </div>
          </div>
        )
      )}
    </TikDocStage>
    <TikDocStage label="Glifos multicoloridos — cores literais do arquivo" surface="immersive" gap={24}>
      {(['heart', 'comment', 'shareArrow', 'followPlus', 'verified'] as const).map((name) => (
        <Icon key={name} name={name} size={35} />
      ))}
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use size para definir a altura e deixe a largura ser derivada do viewBox.',
        'Informe title quando o ícone for a única indicação da ação; omita quando for decorativo.',
        'Use rotate para reaproveitar um vetor girado, em vez de registrar um glifo novo.',
        'Deixe os glifos multicoloridos sem tone: eles carregam as cores do arquivo.',
      ]}
      donts={[
        'Não desenhe um <path> aproximado para substituir um glifo ausente.',
        'Não normalize o viewBox para 24×24 — isso distorce menu, chevron e caretReplies.',
        'Não force width e height iguais em glifos não quadrados.',
        'Não substitua um glifo do arquivo por um equivalente de outra biblioteca de ícones.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="Os mesmos glifos nos dois contextos, com o tom apropriado a cada um."
      barColor="#65D2E9"
    />
    <TikDocSurfaceSwitcher>
      {(surface) => (
        <>
          {(['homeSolid', 'search', 'messageStroke', 'accountStroke', 'bookmark'] as const).map(
            (name) => (
              <Icon
                key={name}
                name={name}
                size={26}
                tone={surface === 'immersive' ? 'onImmersive' : 'primary'}
              />
            )
          )}
        </>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="Icon"
      rows={[
        {
          name: 'name',
          type: 'TikIconName',
          description: `Nome do glifo. ${tikIconNames.length} valores possíveis, todos exportados do arquivo.`,
        },
        {
          name: 'size',
          type: "TikIconSize | number",
          default: "'md'",
          description: 'Altura do glifo; a largura é derivada do viewBox. Tokens: xs 12, sm 16, md 20, lg 24, xl 35.',
        },
        {
          name: 'tone',
          type: 'TikIconTone',
          default: "'default'",
          description: 'Tom semântico aplicado ao preenchimento. Ignorado por glifos multicoloridos.',
        },
        {
          name: 'rotate',
          type: 'number',
          default: '0',
          description: 'Rotação em graus, para reaproveitar um vetor girado.',
        },
        {
          name: 'flipX',
          type: 'boolean',
          default: 'false',
          description: 'Espelha o glifo no eixo horizontal.',
        },
        {
          name: 'title',
          type: 'string',
          description:
            'Rótulo acessível. Quando informado, o SVG recebe role="img" e um <title>; quando omitido, o ícone é decorativo (aria-hidden).',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Classe CSS adicional aplicada ao <svg>.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa da iconografia, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <IconsDocumentationPage />,
};

/**
 * Playground com 100% das props do Icon expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Icon',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
        background: 'var(--tik-color-surface-primary)',
      }}
    >
      <Icon {...args} title={args.title || undefined} />
    </div>
  ),
};

/**
 * A biblioteca inteira em uma grade única.
 */
export const TodosOsGlifos: Story = {
  name: '🔎 Todos os glifos',
  render: () => (
    <UnooriaDocShell>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 12,
        }}
      >
        {tikIconNames.map((name) => (
          <IconCell key={name} name={name} />
        ))}
      </div>
    </UnooriaDocShell>
  ),
};

/**
 * Os oito glifos que preservam as cores literais do arquivo.
 */
export const GlifosMulticoloridos: Story = {
  name: '🎨 Glifos multicoloridos',
  render: () => (
    <UnooriaDocShell>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: 12,
        }}
      >
        {tikIconNames
          .filter((name) => tikIconRegistry[name].multicolor)
          .map((name) => (
            <IconCell key={name} name={name} onImmersive />
          ))}
      </div>
    </UnooriaDocShell>
  ),
};
