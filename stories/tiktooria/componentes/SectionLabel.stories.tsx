import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { SectionLabel, SettingsRow } from '../../../src/tiktooria';
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

const meta: Meta<typeof SectionLabel> = {
  title: 'Tik Tooria/Componentes/SectionLabel',
  component: SectionLabel,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    children: 'ACCOUNT',
  },
};

export default meta;

type Story = StoryObj<typeof SectionLabel>;


const SectionLabelDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Listas"
      title="SectionLabel"
      description="Rótulo de seção das telas de configuração — “ACCOUNT”, “GENERAL” e “SUPPORT”. Semibold 13 em --tik-color-text-secondary, recuado pela calha de 16px. O arquivo escreve o texto já em caixa alta e não declara text-transform nem letter-spacing; nenhum dos dois foi acrescentado."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🏷️" title="Cabeçalho de grupo">
        Antecede um bloco de linhas de configuração, dando nome à seção sem introduzir uma barra própria.
      </TikDocCard>
      <TikDocCard icon="🔤" title="Caixa alta literal">
        O arquivo grava o texto em maiúsculas no próprio nó. O componente não aplica <code>text-transform</code>, para que um rótulo localizado possa usar outra convenção.
      </TikDocCard>
      <TikDocCard icon="📏" title="Sem tracking">
        Diferente do que rótulos em caixa alta costumam pedir, o arquivo não declara espaçamento entre letras. Inventá-lo seria desvio.
      </TikDocCard>
      <TikDocCard icon="🧱" title="Semântico">
        Renderiza <code>&lt;h2&gt;</code>, o que dá à seção um cabeçalho real na árvore de acessibilidade.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:254"
      frameName="SUPPORT — TikTok Privacy and settings"
      specs={[
        { label: 'Tipografia', value: 'Proxima Nova Semibold 13' },
        { label: 'Cor', value: '#86878B' },
        { label: 'Recuo lateral', value: '16px' },
        { label: 'Tracking', value: '0 (não declarado)' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Elemento h2',
          detail:
            'o arquivo é um nó de texto solto. Foi promovido a cabeçalho de nível 2 para que leitores de tela possam navegar entre as seções — mudança semântica sem efeito visual.',
        },
        {
          subject: 'Respiro inferior',
          detail:
            'o arquivo posiciona o rótulo 20px acima da primeira linha por coordenada absoluta. O componente aplica 4px de padding inferior e deixa o restante ao fluxo, o que preserva o espaço quando o rótulo quebra em duas linhas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Rótulo', role: 'Texto em Semibold 13, recuado pela calha lateral.', token: '--tik-font-meta-strong-* · --tik-color-text-secondary · --tik-gutter' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="As três seções do arquivo" surface="chrome" align="stretch" direction="column" width={414} gap={4}>
      <SectionLabel>ACCOUNT</SectionLabel>
      <SettingsRow label="Manage my account" icon="accountStroke" />
      <SettingsRow label="Privacy and safety" icon="lock" />
      <SectionLabel>GENERAL</SectionLabel>
      <SettingsRow label="Push notifications" icon="bell" />
      <SectionLabel>SUPPORT</SectionLabel>
      <SettingsRow label="Help Center" icon="question" />
    </TikDocStage>
    <TikDocStage label="Rótulo localizado, fora da caixa alta" surface="chrome" align="stretch" direction="column" width={414} gap={4}>
      <SectionLabel>Conta</SectionLabel>
      <SettingsRow label="Gerenciar minha conta" icon="accountStroke" />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use um SectionLabel por bloco de linhas, sempre imediatamente acima do bloco.',
        'Escreva o texto na convenção da língua de destino: o componente não força maiúsculas.',
        'Separe seções consecutivas com um Separator, como o arquivo faz.',
      ]}
      donts={[
        'Não aplique text-transform: uppercase por conta própria.',
        'Não invente tracking para o rótulo em caixa alta.',
        'Não use o SectionLabel como título de tela — para isso existe a NavBar.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome', 'sheet']}>
      {() => (
        <div style={{ width: 414 }}>
          <SectionLabel>ACCOUNT</SectionLabel>
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="SectionLabel"
      rows={[
        {
          name: 'children',
          type: "React.ReactNode",
          description:
            'Texto do rótulo.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "React.HTMLAttributes<HTMLElement>",
          description:
            'Demais atributos HTML são repassados ao <h2>.',
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
  render: () => <SectionLabelDocumentationPage />,
};

/**
 * Playground com 100% das props do SectionLabel expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SectionLabel',
  render: (args) => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <SectionLabel {...args} />
    </div>
  ),
};

/**
 * Réplica visual da tela “Privacy and settings” do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <SectionLabel>ACCOUNT</SectionLabel>
      <SettingsRow label="Manage my account" icon="accountStroke" />
      <SettingsRow label="Privacy and safety" icon="lock" />
      <SettingsRow label="Content preferences" icon="camera" />
      <SectionLabel>GENERAL</SectionLabel>
      <SettingsRow label="Push notifications" icon="bell" />
      <SettingsRow label="Language" icon="book" />
      <SectionLabel>SUPPORT</SectionLabel>
      <SettingsRow label="Report a problem" icon="pen" />
      <SettingsRow label="Help Center" icon="question" />
    </div>
  ),
};

/**
 * Os três rótulos publicados pelo arquivo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <SectionLabel>ACCOUNT</SectionLabel>
      <SectionLabel>GENERAL</SectionLabel>
      <SectionLabel>SUPPORT</SectionLabel>
    </div>
  ),
};
