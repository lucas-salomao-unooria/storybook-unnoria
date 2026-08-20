import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TopBar } from '../../../src/instanooria/components/TopBar';
import { Icon } from '../../../src/instanooria/components/Icon';
import { Logo } from '../../../src/instanooria/components/Logo';
import { Badge } from '../../../src/instanooria/components/Badge';
import { Button } from '../../../src/instanooria/components/Button';
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

/**
 * Ação de IGTV com indicador de novidade, reproduzindo o topo do Feed.
 */
const IgtvAction: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => (
  <span style={{ position: 'relative', display: 'inline-flex' }}>
    <Icon name="igtv" size={24} theme={theme} />
    <Badge variant="notification" dot theme={theme} style={{ position: 'absolute', top: 0, right: -2 }} />
  </span>
);

/**
 * Página de documentação rica do componente TopBar.
 */
const TopBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Navegação"
      title="TopBar"
      description="Barra de navegação superior de 88px, composta pelo recuo da status bar do iPhone X (44px) e pela faixa de conteúdo (44px). O título é ancorado no centro óptico da tela, independentemente da largura das ações laterais — exatamente como no arquivo de design."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Duas superfícies, três slots, uma regra de ancoragem."
    />
    <InstaDocGrid>
      <InstaDocCard icon="📰" title="Variante feed">
        Fundo <code>background-secondary</code> com traço de barra. É a superfície do Feed e da caixa
        de mensagens diretas.
      </InstaDocCard>
      <InstaDocCard icon="👤" title="Variante plain">
        Fundo <code>background-primary</code> com hairline sutil. Usada no perfil, em “Editar perfil”
        e nas telas de conteúdo.
      </InstaDocCard>
      <InstaDocCard icon="🎯" title="Título centralizado de verdade">
        O título é posicionado em relação à tela, não ao espaço restante entre as ações. Isso mantém
        a logo e o nome de usuário no mesmo eixo em todas as telas.
      </InstaDocCard>
      <InstaDocCard icon="📱" title="Recuo de status bar">
        <code>withStatusBarInset</code> reserva os 44px superiores. Desligue quando a TopBar for
        usada dentro de um PhoneFrame que já desenha a status bar.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas dos frames Top Bar do Feed, do perfil e das mensagens."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1752"
      frameName="Instagram Main → Top Bar"
      specs={[
        { label: 'Altura total', value: '88px' },
        { label: 'Status bar', value: '44px' },
        { label: 'Faixa de conteúdo', value: '44px' },
        { label: 'Padding lateral', value: '12px' },
        { label: 'Logo', value: '105 × 28px, centralizada' },
        { label: 'Gap entre ações', value: '16px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Três slots: leading, title e trailing."
    />
    <InstaDocStage label="Slots identificados" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <TopBar
          withStatusBarInset={false}
          leading={<Icon name="camera" size={24} />}
          title={<Logo height={26} />}
          trailing={
            <>
              <IgtvAction />
              <Icon name="share" size={22} />
            </>
          }
        />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Configurações"
      description="As barras reais das cinco telas principais do arquivo."
    />
    <InstaDocStage label="Feed" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <TopBar
          withStatusBarInset={false}
          leading={<Icon name="camera" size={24} />}
          title={<Logo height={26} />}
          trailing={
            <>
              <IgtvAction />
              <Icon name="share" size={22} />
            </>
          }
        />
      </div>
    </InstaDocStage>

    <InstaDocStage label="Mensagens diretas" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <TopBar
          withStatusBarInset={false}
          leading={<Icon name="back" size={18} />}
          title={
            <>
              jacob_w
              <Icon name="chevronDown" size={11} />
            </>
          }
          trailing={<Icon name="addChat" size={20} />}
        />
      </div>
    </InstaDocStage>

    <InstaDocStage label="Perfil (variante plain)" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <TopBar
          variant="plain"
          withStatusBarInset={false}
          title={
            <>
              <Icon name="lock" size={12} />
              jacob_w
              <Icon name="chevronDown" size={11} />
            </>
          }
          trailing={<Icon name="menu" size={20} />}
        />
      </div>
    </InstaDocStage>

    <InstaDocStage label="Editar perfil (ações textuais)" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <TopBar
          variant="plain"
          withStatusBarInset={false}
          leading={<Button variant="link">Cancelar</Button>}
          title="Editar perfil"
          trailing={<Button variant="link">Concluir</Button>}
        />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de navegação verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Manter no máximo duas ações no slot trailing.',
        'Usar a variante plain quando o conteúdo abaixo já for background-primary.',
        'Fornecer aria-label a toda ação que seja apenas um glifo.',
        'Desligar withStatusBarInset quando a barra estiver dentro de um PhoneFrame.',
      ]}
      donts={[
        'Colocar texto longo no título: ele trunca em 60% da largura da tela.',
        'Usar a logo e um título textual ao mesmo tempo.',
        'Adicionar uma terceira ação à direita, comprimindo o título.',
        'Alterar a altura de 88px, o que desalinha a barra entre telas.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A superfície e o traço de barra invertem juntos, preservando a separação."
    />
    <InstaDocThemeSwitcher padding={0}>
      {(activeTheme) => (
        <div style={{ width: 375 }}>
          <TopBar
            theme={activeTheme}
            withStatusBarInset={false}
            leading={<Icon name="camera" size={24} theme={activeTheme} />}
            title={<Logo height={26} theme={activeTheme} />}
            trailing={
              <>
                <IgtvAction theme={activeTheme} />
                <Icon name="share" size={22} theme={activeTheme} />
              </>
            }
          />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente TopBar."
    />
    <InstaDocPropsTable
      title="TopBar"
      rows={[
        {
          name: 'leading',
          type: 'React.ReactNode',
          description: 'Conteúdo alinhado à esquerda (voltar, câmera, cancelar).',
        },
        {
          name: 'title',
          type: 'React.ReactNode',
          description: 'Conteúdo central: texto simples ou o logotipo.',
        },
        {
          name: 'trailing',
          type: 'React.ReactNode',
          description: 'Conteúdo alinhado à direita (IGTV, mensagens, menu, concluir).',
        },
        {
          name: 'variant',
          type: "'feed' | 'plain'",
          default: "'feed'",
          description: 'Superfície da barra: secondary com traço de barra ou primary com hairline.',
        },
        {
          name: 'withStatusBarInset',
          type: 'boolean',
          default: 'true',
          description: 'Reserva os 44px superiores da status bar do iPhone X.',
        },
        {
          name: 'bordered',
          type: 'boolean',
          default: 'true',
          description: 'Exibe o divisor na base da barra.',
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

const meta: Meta<typeof TopBar> = {
  title: 'Instanooria/Componentes/TopBar',
  component: TopBar,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['feed', 'plain'],
      description: 'Superfície da barra.',
    },
    withStatusBarInset: { control: 'boolean', description: 'Reserva os 44px da status bar.' },
    bordered: { control: 'boolean', description: 'Exibe o divisor na base.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    variant: 'feed',
    withStatusBarInset: false,
    bordered: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof TopBar>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TopBarDocumentationPage />,
};

/**
 * Playground com todas as propriedades da TopBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da TopBar',
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}
    >
      <TopBar
        {...args}
        leading={<Icon name="camera" size={24} theme={args.theme} />}
        title={<Logo height={26} theme={args.theme} />}
        trailing={
          <>
            <IgtvAction theme={args.theme} />
            <Icon name="share" size={22} theme={args.theme} />
          </>
        }
      />
    </div>
  ),
};

/**
 * Réplica do topo do frame oficial "Instagram Main" do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <TopBar
        leading={<Icon name="camera" size={24} />}
        title={<Logo height={28} />}
        trailing={
          <>
            <IgtvAction />
            <Icon name="share" size={22} />
          </>
        }
      />
    </div>
  ),
};

/**
 * Matriz das barras usadas nas telas principais do arquivo.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20, width: 375 }}>
      <TopBar
        withStatusBarInset={false}
        leading={<Icon name="camera" size={24} />}
        title={<Logo height={26} />}
        trailing={<Icon name="share" size={22} />}
      />
      <TopBar
        withStatusBarInset={false}
        leading={<Icon name="back" size={18} />}
        title="jacob_w"
        trailing={<Icon name="addChat" size={20} />}
      />
      <TopBar
        variant="plain"
        withStatusBarInset={false}
        title="jacob_w"
        trailing={<Icon name="menu" size={20} />}
      />
      <TopBar
        variant="plain"
        withStatusBarInset={false}
        leading={<Button variant="link">Cancelar</Button>}
        title="Editar perfil"
        trailing={<Button variant="link">Concluir</Button>}
      />
    </div>
  ),
};
