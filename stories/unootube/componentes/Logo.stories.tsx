import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Logo } from '../../../src/unootube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocAnatomy,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocSurfaceSwitcher,
} from '../../../.storybook/components';

const meta: Meta<typeof Logo> = {
  title: 'Unootube/Componentes/Logo',
  component: Logo,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['full', 'badge'] },
    height: { control: { type: 'range', min: 12, max: 96, step: 2 } },
    title: { control: 'text' },
    className: { control: 'text' },
  },
  args: { variant: 'full', height: 20, title: 'Unootube' },
};

export default meta;

type Story = StoryObj<typeof Logo>;

const LogoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Fundação"
      title="Logo"
      description="Lockup da marca Unooria, 109,83×20. O emblema conserva a geometria literal do nó Brand/YoutubeLogo (2:88) e é pintado com o azul da marca, #005CE6; o logotipo tipográfico “Unootube” são oito contornos de Roboto Bold, um por letra, que herdam a cor do token de texto."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Onde o logotipo aparece e como ele é construído."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🧭" title="Âncora da barra superior">
        Único uso no arquivo: o quadro de marca da <code>TopBar</code>, com recuo{' '}
        <code>18/14/18/16</code>. É o ponto de retorno à tela inicial.
      </UniDocCard>
      <UniDocCard icon="🔵" title="Azul da marca, invariante de tema">
        O emblema usa <code>#005CE6</code> — a primitiva <code>blue/600</code>, extensão da
        biblioteca. Não é o vermelho semântico <code>#EE1A26</code>, que continua governando
        chamadas para ação: cor de marca e cor de ação são papéis distintos.
      </UniDocCard>
      <UniDocCard icon="🔤" title="Oito contornos, não texto">
        Cada letra de <code>Unootube</code> é um caminho vetorial independente, contornado da
        própria Roboto Bold da marca. O logotipo é imune a fallback de fonte — o que é correto
        para uma marca, e é a razão de não ser um <code>&lt;text&gt;</code>.
      </UniDocCard>
      <UniDocCard icon="⚖️" title="Sem marca de terceiro">
        O logotipo tipográfico do YouTube, marca registrada do Google LLC, foi <strong>removido</strong>{' '}
        do pacote. O que resta do arquivo comunitário é a geometria do emblema, agora em azul.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="2:88"
      frameName="Brand/YoutubeLogo"
      specs={[
        { label: 'Dimensões', value: '109,83 × 20' },
        { label: 'Emblema', value: '28,57 × 20 · #005CE6' },
        { label: 'Triângulo', value: '7,42 × 8,57 · #FFFFFF' },
        { label: 'Logotipo tipográfico', value: '8 contornos · Roboto Bold' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Marca substituída',
          detail:
            'o arquivo publica o logotipo do YouTube. Os sete caminhos do wordmark foram removidos e substituídos por “Unootube”, contornado da Roboto Bold embutida no pacote (eixo wght instanciado em 700, altura de maiúscula de 13px, linha de base em y = 16,77). A tinta começa em x = 31,3945 — o mesmo ponto em que começava o “Y” —, o que preserva a folga óptica de 2,82px em relação ao emblema.',
        },
        {
          subject: 'viewBox de 90 para 109,83',
          detail:
            '“Unootube” tem oito letras contra as sete de “YouTube”, e Roboto Bold é bem menos condensada que a face do arquivo. O lockup ficou 22% mais largo. Como o componente deriva a largura do viewBox, quem informa só height acompanha a nova proporção sem alteração.',
        },
        {
          subject: 'Emblema em azul',
          detail:
            'a geometria do emblema é literal do arquivo, mas o preenchimento saiu de #FF0000 (primitiva red/800) para #005CE6 — o azul da Unooria, registrado como a primitiva blue/600. É a única primitiva do módulo sem figmaNode, porque não vem de nenhum dos dois arquivos de origem.',
        },
        {
          subject: 'Logotipo tipográfico acompanha o tema',
          detail:
            'os contornos herdam --uni-color-text-primary: branco sobre o escuro, quase preto sobre o claro. Só o emblema é invariante, como convém a uma cor de marca.',
        },
        {
          subject: 'Variante badge',
          detail:
            'o arquivo publica apenas a composição completa. A variante que exibe só o emblema foi acrescentada recortando o viewBox nos 28,57px do grupo esquerdo, sem alterar nenhum caminho — necessária para alvos quadrados como favicon e avatar de aplicação.',
        },
        {
          subject: 'Geometria remanescente do arquivo',
          detail:
            'o retângulo arredondado e o triângulo continuam sendo os caminhos literais do nó 2:88. É silhueta reconhecível do arquivo comunitário de origem: um produto que queira independência total da referência deve redesenhar também o emblema em LogoVector.ts.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Emblema',
          role: 'Retângulo arredondado de 28,57 × 20 no azul da marca Unooria.',
          token: '--uni-color-brand-logo · #005CE6',
        },
        {
          name: 'Triângulo de reprodução',
          role: 'Glifo branco puro sobreposto ao emblema.',
          token: '--uni-color-white',
        },
        {
          name: 'Logotipo tipográfico',
          role: 'Oito contornos de Roboto Bold, um por letra, que herdam a cor do token de texto.',
          token: '--uni-color-text-primary',
        },
        {
          name: 'Proporção',
          role: 'A largura é derivada do viewBox 109,83×20 a partir da altura informada.',
          token: 'prop height',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e tamanhos" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: 20px de altura" surface="secondary">
      <Logo />
    </UniDocStage>
    <UniDocStage label="Variantes" surface="secondary" gap={32}>
      <Logo variant="full" />
      <Logo variant="badge" />
    </UniDocStage>
    <UniDocStage label="Tamanhos" surface="secondary" gap={32}>
      <Logo height={16} />
      <Logo height={20} />
      <Logo height={32} />
      <Logo height={48} />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Mantenha a altura de 20px na barra superior: é a medida do arquivo.',
        'Use a variante badge quando o alvo precisar ser quadrado.',
        'Deixe o logotipo tipográfico herdar --uni-color-text-primary sobre superfícies escuras.',
        'Informe title quando o logotipo for o próprio link para a página inicial.',
      ]}
      donts={[
        'Não troque o azul do emblema pelo vermelho semântico da marca: são papéis distintos.',
        'Não distorça a proporção 109,83×20 definindo largura e altura independentes.',
        'Não recolora o emblema nem o triângulo fora de --uni-color-brand-logo.',
        'Não redesenhe o logotipo tipográfico como <text>: fallback de fonte deformaria a marca.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O arquivo tem modo único; o logotipo é demonstrado sobre cada superfície escura."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'surface', 'deep']}>
      {() => <Logo height={28} />}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="Logo"
      rows={[
        {
          name: 'variant',
          type: "'full' | 'badge'",
          default: "'full'",
          description:
            'Composição do logotipo. full exibe emblema e logotipo tipográfico; badge exibe apenas o emblema, com o viewBox recortado.',
        },
        {
          name: 'height',
          type: 'number',
          default: '20',
          description:
            'Altura em pixels. A largura é derivada do viewBox para preservar a proporção do lockup (109,83×20 na variante completa, 28,57×20 na badge).',
        },
        {
          name: 'title',
          type: 'string',
          default: "'Unootube'",
          description:
            'Rótulo acessível. Informe string vazia para tratar o logotipo como decorativo quando ele já estiver dentro de um link rotulado.',
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
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <LogoDocumentationPage />,
};

/**
 * Playground com 100% das props do Logo expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Logo',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
        background: 'var(--uni-color-background-secondary)',
      }}
    >
      <Logo {...args} />
    </div>
  ),
};

/**
 * O lockup na medida do arquivo: 20px de altura.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-secondary)' }}
    >
      <Logo height={20} />
    </div>
  ),
};

/**
 * As duas composições do logotipo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 40,
        alignItems: 'center',
        padding: 32,
        background: 'var(--uni-color-background-secondary)',
      }}
    >
      <Logo variant="full" height={28} />
      <Logo variant="badge" height={28} />
    </div>
  ),
};

/**
 * A proporção 109,83×20 preservada em cinco alturas.
 */
export const Tamanhos: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 32,
        alignItems: 'center',
        padding: 32,
        background: 'var(--uni-color-background-secondary)',
      }}
    >
      {[16, 20, 32, 48, 64].map((height) => (
        <Logo key={height} height={height} />
      ))}
    </div>
  ),
};
