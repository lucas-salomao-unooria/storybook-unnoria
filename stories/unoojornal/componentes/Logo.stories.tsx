import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Logo } from '../../../src/unoojornal/components/Logo';
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

const BAR = '#716C98';

const HEIGHTS = [24, 32, 48, 64] as const;

/**
 * Página de documentação rica do componente Logo.
 */
const LogoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Fundação"
      title="Logo"
      description="Marca original do Unoojornal, montada como a da Plataforma Unooria: o símbolo oficial é o “oo” da palavra (“Un∞jornal”) e as demais letras são contornos de Open Sans Bold. Em duas composições — lockup e só o símbolo — e dois tons."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Onde a marca aparece."
    />
    <UjnDocGrid>
      <UjnDocCard icon="📰" title="lockup">
        “Un” + símbolo + “jornal”, na barra de ferramentas do cabeçalho e nas telas de acesso. É
        a composição padrão.
      </UjnDocCard>
      <UjnDocCard icon="♾️" title="mark">
        Só o símbolo (o anel em forma de amendoim da Unooria), para espaços estreitos: ícone do
        aplicativo, favicon e avatar da publicação.
      </UjnDocCard>
      <UjnDocCard icon="🎨" title="Dois tons">
        <code>primary</code> pinta o símbolo de roxo de ação e as letras na cor do texto, e
        acompanha o tema; <code>inherit</code> usa a cor do contêiner, numa tinta só.
      </UjnDocCard>
      <UjnDocCard icon="🔒" title="Sem texto vivo">
        As letras são contornos, nunca <code>&lt;text&gt;</code>: uma fonte ausente não deforma a
        marca.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="Logo"
      layout="SVG · lockup 135,91 × 25 · símbolo 100 × 49,13"
      specs={[
        { label: 'viewBox do lockup', value: '0 0 135.91 25 (largura derivada da altura)' },
        { label: 'viewBox do símbolo', value: '0 0 100 49.13 (variant="mark")' },
        { label: 'Altura padrão', value: '32px; a largura segue a proporção do viewBox' },
        { label: 'Símbolo', value: 'isótipo oficial da Unooria, traçado do PNG; preenchimento evenodd' },
        { label: 'Letras', value: '“Un” e “jornal” em contornos de Open Sans Bold (corpo 25, sem tracking)' },
        { label: 'tone primary', value: 'símbolo em action-primary · letras em text-primary' },
        { label: 'tone inherit', value: 'currentColor, uma tinta só' },
        { label: 'Acessibilidade', value: 'role="img" com aria-label e <title>; decorative esconde' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Marca original, não a do Figma',
          detail:
            'o arquivo “Jornal da Escola” não define a identidade; o nome “Unoojornal” e a composição seguem a da Plataforma Unooria. O nome de uma publicação fictícia (“Gazeta do Pátio”) só vive nas fixtures.',
        },
        {
          subject: 'O símbolo é o “oo”',
          detail:
            'como no Unoovista e no UnooriaAI, o isótipo ocupa o vão dos dois primeiros “o” de “Unoojornal”: “Un” + símbolo + “jornal”. O terceiro “o” (de “jornal”) é desenhado como letra.',
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
          subject: 'viewBox mais alto que o do Unoovista',
          detail:
            'o “j” desce abaixo da linha de base, então o viewBox é medido pela caixa de tinta inteira (25px de altura), e não pelo corpo da fonte (24px). A altura padrão de 32px do contrato dá, portanto, letras um pouco menores que as do Unoovista a 28px — é a proporção da marca, não um defeito.',
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
    <UjnDocAnatomy
      zones={[
        { name: 'SVG', role: 'Caixa com viewBox próprio de cada composição; role="img" e <title>.', token: 'height × viewBox' },
        { name: 'Símbolo', role: 'Anel em forma de amendoim; no lockup ocupa o vão dos dois primeiros “o”.', token: '--ujn-color-action-primary' },
        { name: 'Letras', role: 'Um caminho com os contornos de “Un” e “jornal”.', token: '--ujn-color-text-primary' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real: duas composições, dois tons e quatro alturas."
    />
    <UjnDocStage label="Composições" surface="card" gap={40} padding={32}>
      <Logo variant="lockup" />
      <Logo variant="mark" />
    </UjnDocStage>
    <UjnDocStage label="Alturas: 24, 32, 48 e 64px" surface="card" gap={40} padding={32}>
      {HEIGHTS.map((height) => (
        <Logo key={height} height={height} />
      ))}
    </UjnDocStage>
    <UjnDocStage label="Só o símbolo nas mesmas alturas" surface="card" gap={40} padding={32}>
      {HEIGHTS.map((height) => (
        <Logo key={height} variant="mark" height={height} />
      ))}
    </UjnDocStage>
    <UjnDocStage label="tone=&quot;inherit&quot;: tinta única herdada do contêiner" surface="footer" gap={40} padding={32}>
      <div style={{ color: 'var(--ujn-color-footer-text)' }}>
        <Logo tone="inherit" />
      </div>
      <div style={{ color: 'var(--ujn-color-footer-accent)' }}>
        <Logo tone="inherit" variant="mark" />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Informar só height: a largura acompanha o viewBox.',
        'Usar o lockup sempre que houver espaço e o mark nos espaços estreitos.',
        'Dar respiro ao redor da marca, de pelo menos a altura do símbolo.',
        'Usar tone="inherit" sobre superfícies de cor fixa, como o rodapé escuro.',
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
      description="No tom primary, o símbolo e as letras acompanham data-ujn-theme."
    />
    <UjnDocThemeSwitcher surface="card">
      {() => (
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <Logo height={48} />
          <Logo height={48} variant="mark" />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="Logo"
      rows={[
        { name: 'variant', type: "'lockup' | 'mark'", default: "'lockup'", description: 'Lockup completo ou só o símbolo.' },
        { name: 'height', type: 'number', default: '32', description: 'Altura em pixels; a largura é derivada do viewBox.' },
        { name: 'tone', type: "'primary' | 'inherit'", default: "'primary'", description: 'Cores do tema ou tinta única herdada.' },
        { name: 'title', type: 'string', default: "'Unoojornal'", description: 'Rótulo acessível do SVG.' },
        { name: 'decorative', type: 'boolean', default: 'false', description: 'Remove a marca da árvore de acessibilidade.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...rest', type: 'React.SVGProps<SVGSVGElement>', description: 'Demais atributos do <svg> (className, style, data-*).' },
      ]}
    />
    <UjnDocPropsTable
      title="Tipos e constantes públicos"
      rows={[
        { name: 'UjnLogoVariant', type: "'lockup' | 'mark'", description: 'As duas composições.' },
        { name: 'UjnLogoTone', type: "'primary' | 'inherit'", description: 'Os dois tons.' },
        { name: 'ujnLogoPath', type: 'string', description: 'Contornos de “Un” e “jornal”.' },
        { name: 'ujnLogoSymbolPath', type: 'string', description: 'Símbolo da Unooria, traçado do PNG oficial.' },
        { name: 'ujnLogoViewBox · ujnLogoMarkViewBox', type: 'string', description: 'viewBox do lockup e do símbolo isolado.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Logo> = {
  title: 'Unoojornal/Componentes/Logo',
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
    title: 'Unoojornal',
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
    <UjnDocStage theme={args.theme ?? 'light'} surface="card" padding={48}>
      <Logo {...args} />
    </UjnDocStage>
  ),
};

/**
 * A marca no rodapé escuro, em tinta única.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: marca no rodapé',
  render: () => (
    <UjnDocStage surface="footer" padding={48} gap={32}>
      <div style={{ color: 'var(--ujn-color-footer-text)' }}>
        <Logo tone="inherit" height={40} />
      </div>
      <div style={{ color: 'var(--ujn-color-footer-accent)' }}>
        <Logo tone="inherit" variant="mark" height={40} />
      </div>
    </UjnDocStage>
  ),
};

/**
 * Lockup e símbolo, nos dois tons.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UjnDocStage surface="card" gap={40} padding={32}>
      <Logo variant="lockup" tone="primary" />
      <Logo variant="mark" tone="primary" />
      <div style={{ color: 'var(--ujn-color-text-secondary)' }}>
        <Logo variant="lockup" tone="inherit" />
      </div>
      <div style={{ color: 'var(--ujn-color-text-secondary)' }}>
        <Logo variant="mark" tone="inherit" />
      </div>
    </UjnDocStage>
  ),
};

/**
 * Quatro alturas, nas duas composições.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="lockup" surface="card" gap={40} padding={32}>
        {HEIGHTS.map((height) => (
          <Logo key={height} height={height} />
        ))}
      </UjnDocStage>
      <UjnDocStage label="mark" surface="card" gap={40} padding={32}>
        {HEIGHTS.map((height) => (
          <Logo key={height} variant="mark" height={height} />
        ))}
      </UjnDocStage>
    </div>
  ),
};

/**
 * Nome acessível e decorativo.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="card" gap={40} padding={32}>
      <Logo />
      <Logo title="Gazeta do Pátio" />
      <Logo decorative />
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
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="card" gap={40} padding={32}>
          <Logo height={48} />
          <Logo height={48} variant="mark" />
        </UjnDocStage>
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
    <UjnDocStage surface="card" gap={40} padding={32}>
      <Logo height={50} />
      <Logo height={50} variant="mark" title="Símbolo do jornal" />
      <Logo height={50} decorative data-testid="decorativo" />
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const lockup = canvas.getByRole('img', { name: 'Unoojornal' });
    await expect(lockup).toHaveAttribute('viewBox', '0 0 135.91 25');
    // A largura acompanha a proporção do viewBox: 50 × 135,91 / 25
    await expect(Number(lockup.getAttribute('width'))).toBeCloseTo(271.82, 1);

    const mark = canvas.getByRole('img', { name: 'Símbolo do jornal' });
    await expect(mark).toHaveAttribute('viewBox', '0 0 100 49.13');

    // Contornos, nunca texto vivo
    await expect(canvasElement.querySelectorAll('svg text')).toHaveLength(0);

    // O decorativo sai da árvore de acessibilidade
    await expect(canvas.getByTestId('decorativo')).toHaveAttribute('aria-hidden', 'true');
    await expect(canvas.getAllByRole('img')).toHaveLength(2);
  },
};
