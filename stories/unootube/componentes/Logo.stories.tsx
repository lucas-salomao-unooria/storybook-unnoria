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
      description="Reprodução do nó Brand/YoutubeLogo (2:88), 90×20, com os nove caminhos literais do export SVG. O emblema preserva o vermelho literal do arquivo — a primitiva red/800, e não o vermelho semântico — enquanto o logotipo tipográfico herda a cor do token de texto."
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
      <UniDocCard icon="🔴" title="Vermelho literal, não semântico">
        O emblema usa <code>#FF0000</code> — a primitiva <code>red/800</code>. O vermelho semântico
        da marca é <code>#EE1A26</code>, e não é usado aqui. Os dois valores foram preservados
        separados.
      </UniDocCard>
      <UniDocCard icon="🔤" title="Sete caminhos no logotipo tipográfico">
        Cada letra é um caminho vetorial independente, não texto. O logotipo é imune a fallback de
        fonte — o que é correto para uma marca.
      </UniDocCard>
      <UniDocCard icon="⚖️" title="Marca de terceiro">
        O logotipo do YouTube é marca registrada do Google LLC e está presente por fidelidade ao
        arquivo comunitário de origem. Um produto que publique esta biblioteca deve substituir os
        caminhos pela própria marca.
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
        { label: 'Dimensões', value: '90 × 20' },
        { label: 'Emblema', value: '28,57 × 20 · #FF0000' },
        { label: 'Triângulo', value: '7,42 × 8,57 · #FFFFFF' },
        { label: 'Logotipo tipográfico', value: '7 caminhos' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Logotipo tipográfico declarado preto',
          detail:
            'o arquivo pinta os sete caminhos do logotipo tipográfico com preto puro no quadro de componentes, mas o aplica em branco em todas as três telas escuras. O padrão do componente é --uni-color-text-primary, que reproduz o que as telas mostram.',
        },
        {
          subject: 'Variante badge',
          detail:
            'o arquivo publica apenas a composição completa. A variante que exibe só o emblema foi acrescentada recortando o viewBox nos 28,57px do grupo esquerdo, sem alterar nenhum caminho — necessária para alvos quadrados como favicon e avatar de aplicação.',
        },
        {
          subject: 'Marca de terceiro',
          detail:
            'os caminhos reproduzem o logotipo do YouTube, marca registrada do Google LLC. As props do componente não permitem trocar o vetor; um produto que precise da própria marca deve substituir LogoVector.ts.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Emblema',
          role: 'Retângulo arredondado de 28,57 × 20 no vermelho literal do arquivo.',
          token: '--uni-color-brand-logo · #FF0000',
        },
        {
          name: 'Triângulo de reprodução',
          role: 'Glifo branco puro sobreposto ao emblema.',
          token: '--uni-color-white',
        },
        {
          name: 'Logotipo tipográfico',
          role: 'Sete caminhos vetoriais que herdam a cor do token de texto.',
          token: '--uni-color-text-primary',
        },
        {
          name: 'Proporção',
          role: 'A largura é derivada do viewBox 90×20 a partir da altura informada.',
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
        'Não troque o vermelho do emblema pelo vermelho semântico da marca: são valores distintos.',
        'Não distorça a proporção 90×20 definindo largura e altura independentes.',
        'Não recolora o emblema nem o triângulo: os dois são literais do arquivo.',
        'Não use o logotipo de terceiro em produto sem verificar as próprias permissões de uso.',
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
            'Altura em pixels. A largura é derivada do viewBox original para preservar a proporção do arquivo.',
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
 * Réplica visual do nó `Brand/YoutubeLogo` (2:88).
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
 * A proporção 90×20 preservada em quatro alturas.
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
