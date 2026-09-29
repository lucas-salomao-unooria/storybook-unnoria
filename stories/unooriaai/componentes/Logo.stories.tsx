import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Logo,
  uaiLogoViewBox,
  uaiLogoWidth,
  uaiLogoHeight,
  uaiLogoMarkViewBox,
  uaiLogoWordmarkViewBox,
  uaiLogoWordmarkWidth,
} from '../../../src/unooriaai/components/Logo';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocGrid,
  UaiDocCard,
  UaiDocSpecs,
  UaiDocDecisions,
  UaiDocAnatomy,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';

const BAR = '#716C98';
const CAPTION: React.CSSProperties = { fontSize: 12, color: 'var(--uai-text-secondary)', marginTop: 10 };

/**
 * Página de documentação rica do componente Logo.
 */
const LogoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Marca"
      title="Logo"
      description="Marca do UnooriaAI, montada como a da Plataforma Unooria: o símbolo — o anel em forma de amendoim da marca-mãe — é o “oo” de “Un∞riaAI”, e as demais letras são contornos de Open Sans Bold. “AI” e o símbolo levam a tinta de destaque do módulo; “Unooria” segue a cor do texto do tema. Tudo é vetor, sem texto: nenhuma fonte ausente deforma a marca."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Onde a marca aparece e como ela se comporta em cada superfície."
    />
    <UaiDocGrid>
      <UaiDocCard icon="♾️" title="O símbolo da Unooria">
        O anel espesso em forma de amendoim da marca-mãe, com um único miolo. A fonte é o PNG oficial{' '}
        <code>unooria_symbol_navy_fill.png</code>; o vetor foi traçado dele e coincide em 99,6% dos
        pixels. O UnooriaAI é um produto da Unooria e usa o mesmo elemento — aqui, no lugar do “oo”.
      </UaiDocCard>
      <UaiDocCard icon="🤖" title="“AI” em destaque">
        As duas últimas letras vêm no mesmo contorno tipográfico, mas em caminho próprio, com a tinta
        de destaque do símbolo. A cor separa o nome da plataforma da camada de inteligência sem
        alterar a forma das letras.
      </UaiDocCard>
      <UaiDocCard icon="🔤" title="Contornos, não texto">
        O logotipo é Open Sans Bold convertido em caminhos. Uma fonte que não carrega não muda a marca,
        e o corte é idêntico em qualquer plataforma.
      </UaiDocCard>
      <UaiDocCard icon="🎨" title="Destaque e texto do tema">
        Símbolo e “AI” em <code>--uai-text-brand</code>; “Unooria” em <code>--uai-text-primary</code>.
        No tom <code>inherit</code>, uma tinta só, herdada do elemento pai.
      </UaiDocCard>
      <UaiDocCard icon="📐" title="Proporção travada">
        A largura sai da altura pelo <code>viewBox</code>: 121,61 × 24 na composição horizontal, 121,52 × 24
        no logotipo tipográfico e 100 × 49,13 no símbolo. A API só expõe <code>height</code>.
      </UaiDocCard>
      <UaiDocCard icon="♿" title="Acessível por padrão">
        Renderiza <code>role=&quot;img&quot;</code> com o rótulo &quot;UnooriaAI&quot;. Onde o nome já está
        escrito ao lado, <code>decorative</code> tira a marca da árvore de acessibilidade.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UaiDocSpecs
      component="Logo"
      layout="Vetor · horizontal 121,61 × 24"
      specs={[
        { label: 'viewBox horizontal', value: uaiLogoViewBox },
        { label: 'Proporção horizontal', value: `${uaiLogoWidth} ÷ ${uaiLogoHeight}` },
        { label: 'viewBox do logotipo', value: uaiLogoWordmarkViewBox },
        { label: 'viewBox do símbolo', value: uaiLogoMarkViewBox },
        { label: 'Símbolo', value: 'traçado do PNG oficial da Unooria · evenodd · 28,8 × 14,15 na horizontal' },
        { label: 'Logotipo', value: 'Open Sans Bold · corpo 25px · linha de base y = 21' },
        { label: 'Lugar do símbolo', value: 'no lugar dos dois “o” de UnooriaAI' },
        { label: 'Altura padrão', value: '32px' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Marca original da Unooria',
          detail:
            'o símbolo é o da Plataforma Unooria (vetor literal) e o logotipo tipográfico é contornado de Open Sans Bold. Nenhum vetor de terceiro integra o pacote.',
        },
        {
          subject: 'Logotipo contornado da fonte da marca',
          detail:
            'Open Sans Bold, o .woff2 embutido em src/fonts/open-sans/. Técnica: eixo wght fixado em 700; texto “UnooriaAI” posicionado com HarfBuzz (kern ligado, sem tracking); cada contorno transformado uma única vez por (x, y) → (x·s + tx, −y·s + 21), com s = 25/2048. Nenhuma coordenada foi redesenhada à mão. É proibido reescrever como <text>.',
        },
        {
          subject: 'Símbolo traçado do PNG oficial',
          detail:
            'a fonte da verdade é o PNG public/brand/unooria_symbol_navy_fill.png, o mesmo que o LogoSymbol da plataforma renderiza. O vetor foi traçado dele com o potrace (2 subcaminhos, sem cantos) e, renderizado na resolução do PNG, coincide em IoU 0,9962. A cor vem de uma classe CSS que cita token: o vetor não tem preenchimento literal.',
        },
        {
          subject: 'O símbolo é o “oo” da palavra',
          detail:
            'como no logotipo da Unooria (“Un∞ria”), o símbolo ocupa o lugar dos dois “o”: tem a altura de tinta do “o” de Open Sans Bold (14,15px) e a proporção do PNG, portanto 28,8px de largura contra os 28,71px que os dois “o” ocupavam. “ria” e “AI” se deslocam 0,09px, na própria transformação do gerador. A variante wordmark desenha os dois “o” e dispensa o símbolo.',
        },
        {
          subject: '“AI” na tinta de destaque',
          detail:
            'o contorno se divide em dois caminhos por cor: “Un”/“ria” em --uai-text-primary e “AI” em --uai-text-brand, a mesma tinta do símbolo. O significado do nome não depende só da cor: as letras estão lá, e o rótulo acessível é “UnooriaAI”.',
        },
        {
          subject: 'Props: variant, tone e altura padrão',
          detail:
            'variant mantém os três valores do módulo (horizontal, mark, wordmark). tone é aditivo (primary ou inherit; sem tom inverso, porque o módulo não usa a marca sobre mídia). A altura padrão é 32px. A prop theme não tem valor padrão: sem ela, a marca herda o tema do contêiner.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="O símbolo, as letras e o destaque compartilham uma linha de base."
    />
    <UaiDocAnatomy
      zones={[
        {
          name: 'Símbolo',
          role: 'Anel em forma de amendoim da Unooria, na tinta de destaque, no lugar do “oo”.',
          token: '--uai-text-brand',
        },
        {
          name: 'Encaixe',
          role: 'O símbolo ocupa o vão dos dois “o”: sua base e seu topo coincidem com os do “o” da fonte, na mesma linha de base do texto.',
        },
        {
          name: '“Un” e “ria”',
          role: 'Contornos de Open Sans Bold, altura de maiúscula de 17,85px, na cor do texto do tema.',
          token: '--uai-text-primary',
        },
        {
          name: '“AI”',
          role: 'Mesmo contorno tipográfico, em caminho próprio, na tinta de destaque.',
          token: '--uai-text-brand',
        },
      ]}
    />
    <UaiDocStage label="Símbolo, logotipo tipográfico e composição horizontal" gap={40}>
      <div style={{ textAlign: 'center' }}>
        <Logo variant="mark" height={54} />
        <div style={CAPTION}>mark · 54px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo variant="wordmark" height={48} />
        <div style={CAPTION}>wordmark · 48px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo height={48} />
        <div style={CAPTION}>horizontal · 48px</div>
      </div>
    </UaiDocStage>
    <UaiDocStage label="Escala proporcional da composição horizontal">
      {[20, 28, 36, 44, 56].map((height) => (
        <div key={height} style={{ textAlign: 'center' }}>
          <Logo height={height} />
          <div style={CAPTION}>
            {height}px · {Math.round((height * uaiLogoWidth) / uaiLogoHeight)}px
          </div>
        </div>
      ))}
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Composições e tons."
    />
    <UaiDocStage label="Composições" gap={40}>
      <Logo variant="horizontal" height={32} />
      <Logo variant="wordmark" height={32} />
      <Logo variant="mark" height={32} />
    </UaiDocStage>
    <UaiDocStage label="Tons: primary · inherit" gap={40}>
      <div style={{ textAlign: 'center' }}>
        <Logo height={32} tone="primary" />
        <div style={CAPTION}>primary</div>
      </div>
      <div style={{ textAlign: 'center', color: 'var(--uai-text-secondary)' }}>
        <Logo height={32} tone="inherit" />
        <div style={CAPTION}>inherit · cor do elemento pai</div>
      </div>
    </UaiDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UaiDocPractices
      dos={[
        'Definir só a altura: a largura acompanha a proporção do viewBox.',
        'Usar a composição horizontal como padrão e o símbolo isolado só em espaços estreitos, como o ícone do aplicativo.',
        'Manter o rótulo “UnooriaAI” quando a marca é o único nome visível; usar decorative quando o nome já está escrito ao lado.',
        'Deixar o tema vir do contêiner (data-uai-theme) em vez de fixar theme em cada marca.',
        'Usar tone="inherit" quando a marca precisa de uma tinta só, como em um rodapé monocromático.',
      ]}
      donts={[
        'Reescrever a marca como <text>: o fallback de fonte deformaria as letras.',
        'Alterar a cor do símbolo ou de “AI” com estilo avulso: as duas seguem --uai-text-brand.',
        'Esticar a marca ou definir largura e altura independentes.',
        'Usar o símbolo isolado como substituto do nome onde o produto precisa ser reconhecido só pelo texto.',
        'Trocar o símbolo por outro desenho: o oficial é o isótipo da Unooria.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O símbolo e o “AI” acompanham o destaque do tema; “Unooria” passa a claro no escuro."
    />
    <UaiDocThemeSwitcher>
      {() => (
        <>
          <Logo height={36} />
          <Logo height={36} variant="wordmark" />
          <Logo height={36} variant="mark" />
        </>
      )}
    </UaiDocThemeSwitcher>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}
    >
      <UaiDocStage label="Tema claro" theme="light" padding={32}>
        <Logo height={36} />
      </UaiDocStage>
      <UaiDocStage label="Tema escuro" theme="dark" padding={32}>
        <Logo height={36} />
      </UaiDocStage>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UaiDocPropsTable
      title="Logo"
      rows={[
        {
          name: 'height',
          type: 'number',
          default: '32',
          description:
            'Altura em pixels. A largura é derivada do viewBox (horizontal 121,61 × 24; logotipo 121,52 × 24; símbolo 100 × 49,13).',
        },
        {
          name: 'variant',
          type: "'horizontal' | 'mark' | 'wordmark'",
          default: "'horizontal'",
          description:
            'Composição horizontal (símbolo no lugar do “oo”), só o símbolo, ou só o logotipo tipográfico com os dois “o” desenhados.',
        },
        {
          name: 'tone',
          type: "'primary' | 'inherit'",
          default: "'primary'",
          description: 'Tom cromático: destaque + texto do tema, ou uma tinta só herdada.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Força o tema. Sem valor, herda o de data-uai-theme do contêiner.',
        },
        {
          name: 'title',
          type: 'string',
          default: "'UnooriaAI'",
          description: 'Rótulo acessível da marca.',
        },
        {
          name: 'decorative',
          type: 'boolean',
          default: 'false',
          description: 'Remove a marca da árvore de acessibilidade.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Logo> = {
  title: 'UnooriaAI/Componentes/Logo',
  component: Logo,
  parameters: { layout: 'padded' },
  argTypes: {
    height: {
      control: { type: 'range', min: 16, max: 96, step: 1 },
      description: 'Altura da marca em pixels.',
    },
    variant: {
      control: 'radio',
      options: ['horizontal', 'mark', 'wordmark'],
      description: 'Composição horizontal, só o símbolo ou só o logotipo tipográfico.',
    },
    tone: {
      control: 'radio',
      options: ['primary', 'inherit'],
      description: 'Tom cromático da marca.',
    },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    title: { control: 'text', description: 'Rótulo acessível.' },
    decorative: { control: 'boolean', description: 'Remove da árvore de acessibilidade.' },
  },
  args: {
    height: 40,
    variant: 'horizontal',
    tone: 'primary',
    theme: 'light',
    title: 'UnooriaAI',
    decorative: false,
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <LogoDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Logo expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Logo',
  render: (args) => (
    <UaiDocStage theme={args.theme ?? 'light'} surface="primary" padding={56}>
      <Logo {...args} />
    </UaiDocStage>
  ),
};

/**
 * Composições e o uso nos dois temas.
 */
export const ComposicoesEDoisTemas: Story = {
  name: '🎨 Composições e os dois temas',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
      }}
    >
      <UaiDocStage label="Tema claro" theme="light" padding={40} direction="column" gap={24}>
        <Logo height={44} />
        <Logo height={44} variant="wordmark" />
        <Logo height={44} variant="mark" />
      </UaiDocStage>
      <UaiDocStage label="Tema escuro" theme="dark" padding={40} direction="column" gap={24}>
        <Logo height={44} />
        <Logo height={44} variant="wordmark" />
        <Logo height={44} variant="mark" />
      </UaiDocStage>
    </div>
  ),
};

/**
 * Escala de tamanhos da composição horizontal.
 */
export const Tamanhos: Story = {
  render: () => (
    <UaiDocStage gap={32} align="center">
      {[20, 28, 34, 44, 56].map((height) => (
        <div key={height} style={{ textAlign: 'center' }}>
          <Logo height={height} />
          <div style={CAPTION}>{height}px</div>
        </div>
      ))}
    </UaiDocStage>
  ),
};

/**
 * Tom herdado: uma tinta só, na cor do elemento pai.
 */
export const TomHerdado: Story = {
  name: 'Tom herdado (inherit)',
  render: () => (
    <UaiDocStage>
      <div style={{ color: 'var(--uai-text-secondary)' }}>
        <Logo height={36} tone="inherit" />
      </div>
    </UaiDocStage>
  ),
};

/**
 * Proporção do logotipo tipográfico isolado.
 */
export const LogotipoTipografico: Story = {
  name: 'Logotipo tipográfico',
  render: () => (
    <UaiDocStage>
      <div style={{ textAlign: 'center' }}>
        <Logo variant="wordmark" height={40} />
        <div style={CAPTION}>{uaiLogoWordmarkWidth} × 24 no viewBox · os dois “o” desenhados</div>
      </div>
    </UaiDocStage>
  ),
};
