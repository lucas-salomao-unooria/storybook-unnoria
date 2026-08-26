import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';

import { Icon, uniIconRegistry, uniIcons, uniIconNames } from '../../../src/unootube';
import type { UniIconName } from '../../../src/unootube';
import { uniPlayerGlyphs } from '../../../src/unootube';
import { PlayerGlyph } from '../../../src/unootube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocSurfaceSwitcher,
} from '../../../.storybook/components';

const meta: Meta = {
  title: 'Unootube/Fundamentos/Ícones',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

const GROUP_LABELS: Record<string, string> = {
  navegacao: 'Barra superior — frame Navigations-Icons (7:184)',
  menu: 'Barra lateral, contorno — frame Sidebar-Icons (7:185)',
  menuPreenchido: 'Barra lateral, preenchidos — frame sidebar-Icons-Fill (7:186)',
  acao: 'Ações da tela de vídeo — nós soltos da página Component',
};

const GROUP_ORDER = ['navegacao', 'menu', 'menuPreenchido', 'acao'] as const;

/** Célula de um glifo, com nome, nó de origem e cópia do nome para uso em código. */
const GlyphCell: React.FC<{ name: UniIconName }> = ({ name }) => {
  const definition = uniIconRegistry[name];
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(name);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
      title={`Copiar "${name}"`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '16px 8px',
        background: 'var(--uni-color-background-secondary)',
        border: '1px solid var(--uni-color-border-subtle)',
        borderRadius: 8,
        cursor: 'pointer',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      <Icon name={name} size="lg" tone="primary" />
      <span
        style={{
          fontSize: 11,
          color: 'var(--uni-color-text-primary)',
          wordBreak: 'break-word',
          textAlign: 'center',
        }}
      >
        {name}
      </span>
      <span style={{ fontSize: 10, color: 'var(--uni-color-text-secondary)' }}>
        {definition.figmaNode}
      </span>
      <span style={{ fontSize: 10, color: copied ? '#01B574' : 'var(--uni-color-text-secondary)' }}>
        {copied ? '✓ Copiado' : 'Clique para copiar'}
      </span>
    </button>
  );
};

const IconsDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Fundamentos • Ícones"
      title="Ícones"
      description="Quarenta e cinco glifos, todos desenhados em quadros de 24×24 e exportados literalmente do arquivo Figma. Treze deles existem em duas versões — contorno e preenchido —, e é essa dupla que marca o item ativo da barra lateral. Nenhum caminho foi desenhado à mão ou substituído por outra biblioteca."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Como a biblioteca se organiza e de onde cada glifo vem."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🔒" title="Vetores literais do Figma">
        Cada glifo carrega o atributo <code>d</code> exatamente como o exportador do Figma o emitiu,
        e registra <code>figmaName</code> e <code>figmaNode</code>. É proibido desenhar, aproximar
        ou substituir um glifo por outra biblioteca de ícones.
      </UniDocCard>
      <UniDocCard icon="📐" title="Todos 24×24">
        Ao contrário do Tik Tooria, cujos glifos têm proporções variadas, aqui os 45 quadros são
        quadrados de 24. O alvo é sempre quadrado, e a prop <code>size</code> governa a aresta.
      </UniDocCard>
      <UniDocCard icon="🎯" title="Ativo por peso, não por cor">
        O arquivo publica treze glifos preenchidos para marcar o item ativo da barra lateral. A cor
        do glifo não muda entre ativo e inativo — o que muda é o peso do vetor e o fundo da linha.
      </UniDocCard>
      <UniDocCard icon="🎨" title="Monocromáticos, herdam a cor">
        O arquivo pinta todos os 45 de branco puro. O preenchimento literal foi trocado por{' '}
        <code>currentColor</code> para que o mesmo vetor sirva ao texto primário, ao secundário e ao
        cromo do reprodutor — as três cores em que as telas os aplicam.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="7:182"
      frameName="Component — frames 7:184, 7:185 e 7:186"
      specs={[
        { label: 'Glifos de ícone', value: '45' },
        { label: 'viewBox', value: '0 0 24 24 (todos)' },
        { label: 'Pares contorno/preenchido', value: '13' },
        { label: 'Glifos de reprodutor', value: '9 (registro à parte)' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Preenchimento literal trocado por currentColor',
          detail:
            'o arquivo declara fill="white" em todos os 45 glifos. O valor foi removido do registro para que o vetor herde a cor do ancestral — sem isso, o mesmo glifo não poderia servir ao texto secundário da barra do comentário nem ao cromo do reprodutor, como as telas exigem.',
        },
        {
          subject: 'Glifos de controle do reprodutor em registro separado',
          detail:
            'os nove controles de vídeo (play, next, sound, titles, hd, theater, tv, fullscreen, info) não são componentes no arquivo: são nós VECTOR, GROUP e BOOLEAN_OPERATION soltos dentro do quadro do reprodutor. Vivem em PlayerGlyphs.ts, e não no registro de ícones.',
        },
        {
          subject: 'Geometria resolvida das operações booleanas',
          detail:
            'os controles do reprodutor são operações booleanas cujo export SVG vem dominado pela máscara do traço decorativo. Foi usada a geometria de preenchimento resolvida (node.fillGeometry), que é o resultado literal da operação, e o traço de 1px em preto a 10% foi reproduzido separadamente.',
        },
        {
          subject: 'Nomes normalizados',
          detail:
            'os nomes de camada do arquivo (“Icon/LikedOutline”, “Icon/HomeFill”) foram normalizados para camelCase no registro (likedOutline, homeFill). O nome original é preservado em figmaName.',
        },
        {
          subject: 'arrowTop no grupo dos preenchidos',
          detail:
            'o arquivo coloca Icon/ArrowTop no frame sidebar-Icons-Fill, embora seja um glifo de contorno como o arrowBottom. O agrupamento do arquivo foi preservado no registro.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia da biblioteca"
      description="Os 45 glifos, agrupados como o arquivo os organiza."
      barColor="#9EBFD0"
    />
    {GROUP_ORDER.map((group) => {
      const names = uniIconNames.filter((name) => uniIconRegistry[name].group === group);
      return (
        <div key={group} style={{ marginBottom: 32 }}>
          <h4 style={{ margin: '0 0 4px 0', fontSize: 15, color: '#22272A' }}>
            {GROUP_LABELS[group]}
          </h4>
          <p style={{ margin: '0 0 14px 0', fontSize: 13, color: '#475157' }}>
            {names.length} glifos
          </p>
          <div
            data-uni-theme="dark"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: 12,
              background: 'var(--uni-color-background-primary)',
              border: '1px solid #E4E8E9',
              borderRadius: 12,
              padding: 20,
            }}
          >
            {names.map((name) => (
              <GlyphCell key={name} name={name} />
            ))}
          </div>
        </div>
      );
    })}

    <h4 style={{ margin: '0 0 4px 0', fontSize: 15, color: '#22272A' }}>
      Controles do reprodutor — registro à parte (18:1295)
    </h4>
    <p style={{ margin: '0 0 14px 0', fontSize: 13, color: '#475157' }}>
      Nove glifos que não são componentes no arquivo e por isso vivem em{' '}
      <code>PlayerGlyphs.ts</code>.
    </p>
    <div
      data-uni-theme="dark"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 12,
        background: 'var(--uni-color-background-primary)',
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        padding: 20,
        marginBottom: 32,
      }}
    >
      {Object.entries(uniPlayerGlyphs).map(([key, glyph]) => (
        <div
          key={key}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: '16px 8px',
            background: 'var(--uni-color-background-secondary)',
            border: '1px solid var(--uni-color-border-subtle)',
            borderRadius: 8,
            color: 'var(--uni-color-player-chrome)',
            fontFamily: 'var(--uni-font-sans)',
          }}
        >
          <PlayerGlyph name={key as keyof typeof uniPlayerGlyphs} height={20} />
          <span
            style={{
              fontSize: 11,
              color: 'var(--uni-color-text-primary)',
              textAlign: 'center',
              wordBreak: 'break-word',
            }}
          >
            {key}
          </span>
          <span style={{ fontSize: 10, color: 'var(--uni-color-text-secondary)' }}>
            {glyph.width} × {glyph.height}
          </span>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="4. Matriz de tamanhos e tons"
      description="Os três tamanhos aplicados pelo arquivo e os tons semânticos disponíveis."
      barColor="#EE1A26"
    />
    <UniDocStage label="Tamanhos: sm 16px, md 20px, lg 24px (nativo)" surface="primary" gap={24}>
      <Icon name="home" size="sm" tone="primary" />
      <Icon name="home" size="md" tone="primary" />
      <Icon name="home" size="lg" tone="primary" />
      <Icon name="home" size={40} tone="primary" />
    </UniDocStage>
    <UniDocStage label="Tons semânticos" surface="primary" gap={24}>
      <Icon name="notifications" size="lg" tone="primary" />
      <Icon name="notifications" size="lg" tone="secondary" />
      <Icon name="notifications" size="lg" tone="tertiary" />
      <Icon name="notifications" size="lg" tone="brand" />
      <Icon name="notifications" size="lg" tone="playerChrome" />
    </UniDocStage>
    <UniDocStage label="Pares contorno / preenchido: o par que marca o item ativo" surface="primary" gap={24}>
      {(
        [
          ['home', 'homeFill'],
          ['explore', 'exploreFill'],
          ['subscriptions', 'subscriptionsFill'],
          ['library', 'libraryFill'],
          ['likedOutline', 'likedFill'],
        ] as [UniIconName, UniIconName][]
      ).map(([outline, filled]) => (
        <div key={outline} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Icon name={outline} size="lg" tone="secondary" />
          <Icon name={filled} size="lg" tone="primary" />
        </div>
      ))}
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use o par contorno/preenchido para marcar o item ativo, como o arquivo faz.',
        'Deixe o glifo herdar a cor do ancestral (tone="inherit") quando ele estiver dentro de um botão que já define a cor.',
        'Informe title quando o ícone for a única indicação da ação; omita quando houver rótulo visível ao lado.',
        'Exporte o SVG do Figma e copie o atributo d sem edição ao registrar um glifo novo.',
      ]}
      donts={[
        'Não desenhe, aproxime ou substitua um glifo por outra biblioteca de ícones.',
        'Não normalize o viewBox de um glifo novo: preserve o do export.',
        'Não pinte o glifo com valor hexadecimal avulso — use os tons semânticos.',
        'Não use os glifos de controle do reprodutor fora do reprodutor: eles carregam um traço próprio.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="Os glifos sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'surface', 'field']}>
      {() => (
        <>
          {(['home', 'search', 'notifications', 'liked', 'share', 'save'] as UniIconName[]).map(
            (name) => (
              <Icon key={name} name={name} size="lg" tone="primary" />
            )
          )}
        </>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência completa de props"
      description="A API do componente Icon."
      barColor="#EE1A26"
    />
    <UniDocPropsTable
      title="Icon"
      rows={[
        {
          name: 'name',
          type: 'UniIconName',
          description: 'Nome do glifo na biblioteca oficial. São 45 valores possíveis.',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg' | number",
          default: "'lg'",
          description:
            'Aresta do glifo. sm = 16px (menu superior e barra do comentário), md = 20px, lg = 24px (nativo). Aceita também um valor em pixels.',
        },
        {
          name: 'tone',
          type: "'primary' | 'secondary' | 'tertiary' | 'inverse' | 'brand' | 'playerChrome' | 'inherit'",
          default: "'inherit'",
          description:
            'Tom semântico do preenchimento. O padrão herda a cor do ancestral, que é o comportamento correto dentro de botões.',
        },
        {
          name: 'title',
          type: 'string',
          description:
            'Rótulo acessível. Quando informado, o SVG recebe role="img" e um <title>; quando omitido, é tratado como decorativo com aria-hidden.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: 'React.SVGProps<SVGSVGElement>',
          description: 'Demais atributos são repassados ao elemento <svg>.',
        },
      ]}
    />
    <UniDocPropsTable
      title="PlayerGlyph"
      rows={[
        {
          name: 'name',
          type: 'UniPlayerGlyphName',
          description:
            'Nome do controle do reprodutor: play, next, sound, titles, quality, theater, tv, fullscreen ou info.',
        },
        {
          name: 'height',
          type: 'number',
          description:
            'Altura do glifo em pixels. A largura é derivada da proporção medida no arquivo, que varia por controle.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Classe CSS adicional.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa da biblioteca de ícones baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <IconsDocumentationPage />,
};

/**
 * Playground com 100% das props do Icon expostas.
 */
export const Playground: StoryObj<typeof Icon> = {
  name: '🕹️ 1. Playground do Icon',
  argTypes: {
    name: { control: 'select', options: uniIconNames },
    size: { control: 'select', options: ['sm', 'md', 'lg', 16, 24, 32, 48] },
    tone: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'inverse', 'brand', 'playerChrome', 'inherit'],
    },
    title: { control: 'text' },
    className: { control: 'text' },
  },
  args: { name: 'home', size: 'lg', tone: 'primary', title: '' },
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <Icon {...args} title={args.title || undefined} />
    </div>
  ),
};

/**
 * Todos os 45 glifos da biblioteca, em uma única grade.
 */
export const TodosOsGlifos: Story = {
  name: 'Todos os 45 glifos',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 12,
        background: 'var(--uni-color-background-primary)',
        padding: 32,
      }}
    >
      {uniIconNames.map((name) => (
        <GlyphCell key={name} name={name} />
      ))}
    </div>
  ),
};

/**
 * Os treze pares de contorno e preenchimento que marcam o item ativo.
 */
export const ParesContornoPreenchido: Story = {
  name: 'Pares contorno / preenchido',
  render: () => {
    const pairs = uniIconNames
      .filter((name) => uniIcons[name].outlineOf)
      .map((filled) => ({ filled, outline: uniIcons[filled].outlineOf as UniIconName }));

    return (
      <div
        data-uni-theme="dark"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
          background: 'var(--uni-color-background-primary)',
          padding: 32,
          fontFamily: 'var(--uni-font-sans)',
        }}
      >
        {pairs.map(({ filled, outline }) => (
          <div
            key={filled}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: 16,
              background: 'var(--uni-color-background-secondary)',
              border: '1px solid var(--uni-color-border-subtle)',
              borderRadius: 8,
            }}
          >
            <Icon name={outline} size="lg" tone="secondary" />
            <Icon name={filled} size="lg" tone="primary" />
            <span style={{ fontSize: 11, color: 'var(--uni-color-text-secondary)' }}>
              {outline} → {filled}
            </span>
          </div>
        ))}
      </div>
    );
  },
};
