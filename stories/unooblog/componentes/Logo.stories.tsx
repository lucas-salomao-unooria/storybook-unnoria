import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Logo } from '../../../src/unooblog/components/Logo';
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

const BAR = '#716C98';

const HEIGHTS = [24, 32, 48, 64] as const;

/**
 * Página de documentação rica do componente Logo.
 */
const LogoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Fundação"
      title="Logo"
      description="Marca original do Unooblog, montada como a da Plataforma Unooria: o símbolo oficial é o “oo” da palavra (“Un∞blog”) e as demais letras são contornos de Open Sans Bold. Em duas composições — lockup e só o símbolo — e dois tons."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Onde a marca aparece."
    />
    <UblDocGrid>
      <UblDocCard icon="✍️" title="lockup">
        “Un” + símbolo + “blog”, no cabeçalho do site e no rodapé. É a composição
        padrão.
      </UblDocCard>
      <UblDocCard icon="♾️" title="mark">
        Só o símbolo (o anel em forma de amendoim da Unooria), para espaços estreitos: ícone do
        aplicativo, favicon e avatar do blog.
      </UblDocCard>
      <UblDocCard icon="🎨" title="Dois tons">
        <code>primary</code> pinta o símbolo de roxo de ação e as letras na cor do texto, e
        acompanha o tema; <code>inherit</code> usa a cor do contêiner, numa tinta só.
      </UblDocCard>
      <UblDocCard icon="🔒" title="Sem texto vivo">
        As letras são contornos, nunca <code>&lt;text&gt;</code>: uma fonte ausente não deforma a
        marca.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="Logo"
      layout="SVG · lockup 117 × 25 · símbolo 100 × 49,13"
      specs={[
        { label: 'viewBox do lockup', value: '0 0 117 25 (largura derivada da altura)' },
        { label: 'viewBox do símbolo', value: '0 0 100 49.13 (variant="mark")' },
        { label: 'Altura padrão', value: '32px; a largura segue a proporção do viewBox' },
        { label: 'Símbolo', value: 'isótipo oficial da Unooria, traçado do PNG; preenchimento evenodd' },
        { label: 'Letras', value: '“Un” e “blog” em contornos de Open Sans Bold (corpo 25, sem tracking)' },
        { label: 'tone primary', value: 'símbolo em action-primary · letras em text-primary' },
        { label: 'tone inherit', value: 'currentColor, uma tinta só' },
        { label: 'Acessibilidade', value: 'role="img" com aria-label e <title>; decorative esconde' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Marca original',
          detail:
            'não há arquivo de design: o nome “Unooblog” e a composição seguem a da Plataforma Unooria. O nome do blog de demonstração (“Caderno Aberto”) só vive nas fixtures.',
        },
        {
          subject: 'O símbolo é o “oo”',
          detail:
            'como no Unoovista e no UnooriaAI, o isótipo ocupa o vão dos dois primeiros “o” de “Unooblog”: “Un” + símbolo + “blog”. O “o” de “blog” é desenhado como letra.',
        },
        {
          subject: 'Vetor copiado do Unoovista',
          detail:
            'o caminho do símbolo é um literal copiado de src/unoovista/components/Logo/LogoVector.ts (traçado do PNG oficial). Copiar o literal não viola a regra 1.3: o módulo não lê tokens de outro, e literais são copiáveis como as cores.',
        },
        {
          subject: 'Letras contornadas pela técnica do módulo-irmão',
          detail:
            'eixo wght fixado em 700 (fontTools), texto posicionado com HarfBuzz (kern ligado, sem tracking), cada contorno do glyf transformado uma única vez e sem nenhuma coordenada redesenhada à mão. A técnica está no comentário de LogoVector.ts.',
        },
        {
          subject: 'viewBox medido pela caixa de tinta',
          detail:
            'o “g” desce abaixo da linha de base e o “b” e o “l” sobem acima das caixas-baixas, então o viewBox é medido pela caixa de tinta inteira (25px de altura), e não pelo corpo da fonte. A altura padrão de 32px do contrato dá, portanto, letras um pouco menores que as de um lockup medido pelo corpo — é a proporção da marca, não um defeito.',
        },
        {
          subject: 'Sem tom invertido',
          detail:
            'o contrato prevê só primary e inherit; para uso sobre fotografia, passe tone="inherit" e a cor por currentColor.',
        },
        {
          subject: 'Server Component',
          detail: 'só recebe props e renderiza um SVG.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocAnatomy
      zones={[
        { name: 'SVG', role: 'Caixa com viewBox próprio de cada composição; role="img" e <title>.', token: 'height × viewBox' },
        { name: 'Símbolo', role: 'Anel em forma de amendoim; no lockup ocupa o vão dos dois primeiros “o”.', token: '--ubl-color-action-primary' },
        { name: 'Letras', role: 'Um caminho com os contornos de “Un” e “blog”.', token: '--ubl-color-text-primary' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real: duas composições, dois tons e quatro alturas."
    />
    <UblDocStage label="Composições" surface="card" gap={40} padding={32}>
      <Logo variant="lockup" />
      <Logo variant="mark" />
    </UblDocStage>
    <UblDocStage label="Alturas: 24, 32, 48 e 64px" surface="card" gap={40} padding={32}>
      {HEIGHTS.map((height) => (
        <Logo key={height} height={height} />
      ))}
    </UblDocStage>
    <UblDocStage label="Só o símbolo nas mesmas alturas" surface="card" gap={40} padding={32}>
      {HEIGHTS.map((height) => (
        <Logo key={height} variant="mark" height={height} />
      ))}
    </UblDocStage>
    <UblDocStage label="tone=&quot;inherit&quot;: tinta única herdada do contêiner" surface="code" gap={40} padding={32}>
      <div style={{ color: 'var(--ubl-color-code-text)' }}>
        <Logo tone="inherit" />
      </div>
      <div style={{ color: 'var(--ubl-color-code-accent)' }}>
        <Logo tone="inherit" variant="mark" />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Informar só height: a largura acompanha o viewBox.',
        'Usar o lockup sempre que houver espaço e o mark nos espaços estreitos.',
        'Dar respiro ao redor da marca, de pelo menos a altura do símbolo.',
        'Usar tone="inherit" sobre superfícies de cor fixa, como o bloco de código escuro.',
      ]}
      donts={[
        'Redesenhar a marca com <text>: a fonte ausente a deformaria.',
        'Esticar a marca informando width e height fora da proporção.',
        'Pintar o símbolo e as letras com cores soltas: use os tons.',
        'Usar a marca como ícone decorativo repetido na página.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="No tom primary, o símbolo e as letras acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher surface="card">
      {() => (
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <Logo height={48} />
          <Logo height={48} variant="mark" />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="Logo"
      rows={[
        { name: 'variant', type: "'lockup' | 'mark'", default: "'lockup'", description: 'Lockup completo ou só o símbolo.' },
        { name: 'height', type: 'number', default: '32', description: 'Altura em pixels; a largura é derivada do viewBox.' },
        { name: 'tone', type: "'primary' | 'inherit'", default: "'primary'", description: 'Cores do tema ou tinta única herdada.' },
        { name: 'title', type: 'string', default: "'Unooblog'", description: 'Rótulo acessível do SVG.' },
        { name: 'decorative', type: 'boolean', default: 'false', description: 'Remove a marca da árvore de acessibilidade.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...rest', type: 'React.SVGProps<SVGSVGElement>', description: 'Demais atributos do <svg> (className, style, data-*).' },
      ]}
    />
    <UblDocPropsTable
      title="Tipos e constantes públicos"
      rows={[
        { name: 'UblLogoVariant', type: "'lockup' | 'mark'", description: 'As duas composições.' },
        { name: 'UblLogoTone', type: "'primary' | 'inherit'", description: 'Os dois tons.' },
        { name: 'ublLogoPath', type: 'string', description: 'Contornos de “Un” e “blog”.' },
        { name: 'ublLogoSymbolPath', type: 'string', description: 'Símbolo da Unooria, traçado do PNG oficial.' },
        { name: 'ublLogoViewBox · ublLogoMarkViewBox', type: 'string', description: 'viewBox do lockup e do símbolo isolado.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Logo> = {
  title: 'Unooblog/Componentes/Logo',
  component: Logo,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['lockup', 'mark'], description: 'Composição da marca.' },
    height: { control: { type: 'range', min: 16, max: 96, step: 4 }, description: 'Altura em pixels.' },
    tone: { control: 'radio', options: ['primary', 'inherit'], description: 'Tom cromático.' },
    title: { control: 'text', description: 'Rótulo acessível.' },
    decorative: { control: 'boolean', description: 'Decorativo (fora da árvore de acessibilidade).' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    variant: 'lockup',
    height: 48,
    tone: 'primary',
    title: 'Unooblog',
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
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Logo',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} surface="card" padding={48}>
      <Logo {...args} />
    </UblDocStage>
  ),
};

/**
 * A marca sobre a superfície escura invariante, em tinta única.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: marca sobre superfície escura',
  render: () => (
    <UblDocStage surface="code" padding={48} gap={32}>
      <div style={{ color: 'var(--ubl-color-code-text)' }}>
        <Logo tone="inherit" height={40} />
      </div>
      <div style={{ color: 'var(--ubl-color-code-accent)' }}>
        <Logo tone="inherit" variant="mark" height={40} />
      </div>
    </UblDocStage>
  ),
};

/**
 * Lockup e símbolo, nos dois tons.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UblDocStage surface="card" gap={40} padding={32}>
      <Logo variant="lockup" tone="primary" />
      <Logo variant="mark" tone="primary" />
      <div style={{ color: 'var(--ubl-color-text-secondary)' }}>
        <Logo variant="lockup" tone="inherit" />
      </div>
      <div style={{ color: 'var(--ubl-color-text-secondary)' }}>
        <Logo variant="mark" tone="inherit" />
      </div>
    </UblDocStage>
  ),
};

/**
 * Quatro alturas, nas duas composições.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UblDocStage label="lockup" surface="card" gap={40} padding={32}>
        {HEIGHTS.map((height) => (
          <Logo key={height} height={height} />
        ))}
      </UblDocStage>
      <UblDocStage label="mark" surface="card" gap={40} padding={32}>
        {HEIGHTS.map((height) => (
          <Logo key={height} variant="mark" height={height} />
        ))}
      </UblDocStage>
    </div>
  ),
};

/**
 * Nome acessível e decorativo.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="card" gap={40} padding={32}>
      <Logo />
      <Logo title="Caderno Aberto" />
      <Logo decorative />
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
        <UblDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="card" gap={40} padding={32}>
          <Logo height={48} />
          <Logo height={48} variant="mark" />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: nome acessível, proporção do viewBox e marca decorativa.
 */
export const Acessibilidade: Story = {
  name: 'Interação: nome acessível e proporção',
  render: () => (
    <UblDocStage surface="card" gap={40} padding={32}>
      <Logo height={50} />
      <Logo height={50} variant="mark" title="Símbolo do blog" />
      <Logo height={50} decorative data-testid="decorativo" />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const lockup = canvas.getByRole('img', { name: 'Unooblog' });
    await expect(lockup).toHaveAttribute('viewBox', '0 0 117 25');
    // A largura acompanha a proporção do viewBox: 50 × 117 / 25
    await expect(Number(lockup.getAttribute('width'))).toBeCloseTo(234, 1);

    const mark = canvas.getByRole('img', { name: 'Símbolo do blog' });
    await expect(mark).toHaveAttribute('viewBox', '0 0 100 49.13');

    // Contornos, nunca texto vivo
    await expect(canvasElement.querySelectorAll('svg text')).toHaveLength(0);

    // O decorativo sai da árvore de acessibilidade
    await expect(canvas.getByTestId('decorativo')).toHaveAttribute('aria-hidden', 'true');
    await expect(canvas.getAllByRole('img')).toHaveLength(2);
  },
};
