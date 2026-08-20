import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Divider } from '../../../src/instanooria/components/Divider';
import { ListItem } from '../../../src/instanooria/components/ListItem';
import { Avatar } from '../../../src/instanooria/components/Avatar';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaAvatars } from '../fixtures';

/**
 * Página de documentação rica do componente Divider.
 */
const DividerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Estrutura"
      title="Divider"
      description="Traço hairline de 0.33px que separa linhas de lista, blocos do perfil e seções de notificação. Reproduz a sombra `0 0.33px 0` aplicada aos retângulos de fundo do arquivo de design — a única forma de separação usada no Instanooria."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Quando usar um traço e quando deixar a superfície fazer o trabalho."
    />
    <InstaDocGrid>
      <InstaDocCard icon="📏" title="0.33px é intencional">
        Em telas @3x, 0.33px corresponde a um pixel físico. Arredondar para 1px engrossa
        visivelmente todas as listas do produto.
      </InstaDocCard>
      <InstaDocCard icon="🎚️" title="Dois pesos">
        <code>hairline</code> para separações internas de lista e <code>solid</code> de 1px para
        contornos estruturais mais fortes, como o rodapé de formulários.
      </InstaDocCard>
      <InstaDocCard icon="↔️" title="Recuo lateral">
        A prop <code>inset</code> alinha o traço ao conteúdo, e não à borda da tela — o padrão do iOS
        quando há avatar à esquerda.
      </InstaDocCard>
      <InstaDocCard icon="♿" title="Semântica correta">
        Renderiza <code>role=&quot;separator&quot;</code> com <code>aria-orientation</code>,
        anunciando a mudança de contexto a leitores de tela.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Origem do traço dentro do arquivo de design."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1649"
      frameName="Post / Top → Rectangle"
      specs={[
        { label: 'Espessura', value: '0.33px' },
        { label: 'Cor Classic', value: 'rgba(60,60,67,0.29)' },
        { label: 'Cor Dark', value: '#48484A' },
        { label: 'Peso solid', value: '1px · #C7C7CC' },
        { label: 'Implementação', value: 'box-shadow' },
        { label: 'Desfoque', value: '0px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia e Matriz de Variantes"
      description="Orientações, pesos e recuos disponíveis."
    />
    <InstaDocStage label="Horizontal — hairline e solid" align="flex-start">
      <div style={{ width: '100%', maxWidth: 420, display: 'grid', gap: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: '#475157', marginBottom: 8 }}>hairline (0.33px)</div>
          <Divider />
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#475157', marginBottom: 8 }}>solid (1px)</div>
          <Divider weight="solid" />
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#475157', marginBottom: 8 }}>hairline com inset=72</div>
          <Divider inset={72} />
        </div>
      </div>
    </InstaDocStage>

    <InstaDocStage label="Vertical">
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, height: 48 }}>
        <span style={{ fontSize: 13, color: '#262626' }}>54 publicações</span>
        <Divider orientation="vertical" weight="solid" />
        <span style={{ fontSize: 13, color: '#262626' }}>834 seguidores</span>
      </div>
    </InstaDocStage>

    <InstaDocStage label="Aplicado a uma lista real" align="flex-start">
      <div style={{ width: '100%', maxWidth: 420 }}>
        <ListItem
          leading={<Avatar src={instaAvatars.joshua_l} alt="" size={56} ring="story" />}
          title="joshua_l"
          subtitle="Tenha um ótimo dia, cara!"
          meta="· agora"
        />
        <Divider inset={84} />
        <ListItem
          leading={<Avatar src={instaAvatars.karennne} alt="" size={56} />}
          title="karennne"
          subtitle="Ouvi dizer que esse filme é bom"
          meta="· agora"
        />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Boas Práticas"
      description="Regras de separação verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Alinhar o traço ao conteúdo com inset quando houver avatar ou ícone à esquerda.',
        'Preferir a mudança de superfície ao traço quando a separação for entre seções grandes.',
        'Omitir o traço no último item de uma lista.',
        'Usar orientation="vertical" apenas em grupos de métricas na mesma linha.',
      ]}
      donts={[
        'Trocar o Divider por border-bottom de 1px: dobra a espessura percebida.',
        'Empilhar um Divider logo abaixo de um componente que já projeta seu próprio hairline.',
        'Aplicar cor customizada ao traço em vez de usar os tokens de borda.',
        'Usar o traço para separar cada elemento dentro de um mesmo cartão.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="5. Suporte a Temas"
      description="No tema Dark o traço muda para #48484A, mantendo a mesma espessura."
    />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <div style={{ width: 320, display: 'grid', gap: 18 }}>
          <Divider theme={activeTheme} />
          <Divider theme={activeTheme} weight="solid" />
          <Divider theme={activeTheme} inset={60} />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="6. Referência Completa de Props da API"
      description="Contrato público do componente Divider."
    />
    <InstaDocPropsTable
      title="Divider"
      rows={[
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'Orientação do traço.',
        },
        {
          name: 'weight',
          type: "'hairline' | 'solid'",
          default: "'hairline'",
          description: 'Peso visual: 0.33px translúcido ou 1px sólido.',
        },
        {
          name: 'inset',
          type: 'number',
          default: '0',
          description: 'Recuo lateral em pixels, alinhando o traço ao conteúdo.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Divider> = {
  title: 'Instanooria/Componentes/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientação do traço.',
    },
    weight: {
      control: 'radio',
      options: ['hairline', 'solid'],
      description: 'Peso visual do traço.',
    },
    inset: {
      control: { type: 'range', min: 0, max: 120, step: 4 },
      description: 'Recuo lateral em pixels.',
    },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: { orientation: 'horizontal', weight: 'hairline', inset: 0, theme: 'light' },
};

export default meta;

type Story = StoryObj<typeof Divider>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <DividerDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Divider expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Divider',
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
        border: '1px solid #E4E8E9',
        height: args.orientation === 'vertical' ? 160 : undefined,
      }}
    >
      <Divider {...args} />
    </div>
  ),
};

/**
 * Matriz completa de orientações e pesos.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, maxWidth: 420 }}>
      <Divider />
      <Divider weight="solid" />
      <Divider inset={72} />
      <div style={{ display: 'flex', gap: 20, height: 40, alignItems: 'center' }}>
        <span style={{ fontSize: 13 }}>Publicações</span>
        <Divider orientation="vertical" weight="solid" />
        <span style={{ fontSize: 13 }}>Seguidores</span>
      </div>
    </div>
  ),
};
