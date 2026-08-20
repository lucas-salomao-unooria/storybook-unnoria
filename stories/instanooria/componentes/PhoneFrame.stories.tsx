import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PhoneFrame } from '../../../src/instanooria/components/PhoneFrame';
import { TopBar } from '../../../src/instanooria/components/TopBar';
import { TabBar, instaDefaultTabs } from '../../../src/instanooria/components/TabBar';
import { StoriesTray } from '../../../src/instanooria/components/StoriesTray';
import { PostCard } from '../../../src/instanooria/components/PostCard';
import { Logo } from '../../../src/instanooria/components/Logo';
import { Icon } from '../../../src/instanooria/components/Icon';
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
import { instaAvatars, instaPhotos, instaStoryItems } from '../fixtures';

/**
 * Abas com o avatar do usuário na quinta posição.
 */
const DEMO_TABS = instaDefaultTabs.map((tab) =>
  tab.id === 'profile' ? { ...tab, avatarSrc: instaAvatars.jacob_w } : tab
);

/**
 * Tela de Feed usada como conteúdo de demonstração do quadro.
 */
const FeedScreen: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => (
  <>
    <TopBar
      theme={theme}
      withStatusBarInset={false}
      leading={<Icon name="camera" size={24} theme={theme} />}
      title={<Logo height={26} theme={theme} />}
      trailing={
        <>
          <Icon name="igtv" size={24} theme={theme} />
          <Icon name="share" size={22} theme={theme} />
        </>
      }
    />
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <StoriesTray items={instaStoryItems} theme={theme} />
      <PostCard theme={theme}>
        <PostCard.Header
          username="joshua_l"
          location="Tóquio, Japão"
          avatarSrc={instaAvatars.joshua_l}
          verified
          theme={theme}
          onMore={() => undefined}
        />
        <PostCard.Media
          src={instaPhotos.tokyo}
          alt="Cruzamento de Shibuya"
          currentIndex={1}
          totalCount={3}
          theme={theme}
        />
        <PostCard.Actions liked currentIndex={1} totalCount={3} theme={theme} />
        <PostCard.Likes
          avatarSrc={instaAvatars.craig_love}
          username="craig_love"
          count={44686}
          theme={theme}
        />
        <PostCard.Caption username="joshua_l" theme={theme}>
          O jogo no Japão foi incrível e eu quero compartilhar algumas fotos.
        </PostCard.Caption>
      </PostCard>
    </div>
    <TabBar theme={theme} items={DEMO_TABS} activeId="feed" />
  </>
);

/**
 * Página de documentação rica do componente PhoneFrame.
 */
const PhoneFrameDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Estrutura"
      title="PhoneFrame"
      description="Quadro de apresentação de 375 × 812px que replica as barras de sistema do iPhone X presentes em todos os frames do Figma: a status bar de 44px com horário, sinal, Wi-Fi e bateria, e o home indicator de 34px na base. É o contêiner canônico para compor e documentar telas completas."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Um contêiner de composição, não um componente de produto."
    />
    <InstaDocGrid>
      <InstaDocCard icon="📱" title="Dimensão canônica">
        375 × 812px é a medida de todos os 38 frames de tela do arquivo. O quadro garante que
        qualquer composição seja validada nessa mesma caixa.
      </InstaDocCard>
      <InstaDocCard icon="🔋" title="Glifos de sistema reais">
        Sinal, Wi-Fi e bateria são os vetores exportados do frame{' '}
        <code>Bars / Status Bar / iPhone X</code>, e não ícones aproximados.
      </InstaDocCard>
      <InstaDocCard icon="🧱" title="Área útil calculada">
        O slot de conteúdo ocupa o espaço entre a status bar e a base, com rolagem própria — o mesmo
        comportamento das telas reais.
      </InstaDocCard>
      <InstaDocCard icon="🖼️" title="Moldura opcional">
        <code>framed</code> adiciona cantos arredondados e sombra para exibição em galerias; desligue
        ao embutir o quadro em outra composição.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas das barras de sistema lidas do arquivo."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1778"
      frameName="Bars / Status Bar / iPhone X"
      specs={[
        { label: 'Quadro', value: '375 × 812px' },
        { label: 'Status bar', value: '44px' },
        { label: 'Home indicator', value: '34px' },
        { label: 'Barra do indicador', value: '134 × 5px' },
        { label: 'Horário', value: 'Title/Medium · 15px' },
        { label: 'Bateria', value: '24.5 × 10.5px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Status bar, área de conteúdo e home indicator."
    />
    <InstaDocStage label="Quadro com tela de Feed completa">
      <PhoneFrame ariaLabel="Feed do Instanooria">
        <FeedScreen />
      </PhoneFrame>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Configurações"
      description="Combinações de barras de sistema e moldura."
    />
    <InstaDocStage label="Configurações">
      <PhoneFrame height={420} ariaLabel="Quadro completo">
        <div style={{ padding: 20, fontSize: 13, color: '#262626' }}>
          Status bar + home indicator + moldura
        </div>
      </PhoneFrame>
      <PhoneFrame height={420} withHomeIndicator={false} ariaLabel="Sem home indicator">
        <div style={{ padding: 20, fontSize: 13, color: '#262626' }}>Sem home indicator</div>
      </PhoneFrame>
      <PhoneFrame height={420} withStatusBar={false} framed={false} ariaLabel="Sem barras">
        <div style={{ padding: 20, fontSize: 13, color: '#262626' }}>
          Sem status bar e sem moldura
        </div>
      </PhoneFrame>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de composição verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Desligar withStatusBarInset na TopBar quando ela estiver dentro do quadro.',
        'Manter withHomeIndicatorInset na TabBar: os 29px reservados são exatamente a faixa ocupada pelo home indicator.',
        'Manter 9:41 como horário padrão, replicando o arquivo original.',
        'Fornecer ariaLabel descrevendo qual tela está sendo apresentada.',
      ]}
      donts={[
        'Usar o PhoneFrame em produção: ele é um contêiner de documentação.',
        'Duplicar a status bar dentro do conteúdo do quadro.',
        'Alterar a largura de 375px, o que invalida a comparação com o Figma.',
        'Colocar rolagem no quadro em vez de no slot de conteúdo.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="As barras de sistema acompanham o tema junto com o conteúdo."
    />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <PhoneFrame theme={activeTheme} ariaLabel="Feed do Instanooria">
          <FeedScreen theme={activeTheme} />
        </PhoneFrame>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente PhoneFrame."
    />
    <InstaDocPropsTable
      title="PhoneFrame"
      rows={[
        {
          name: 'time',
          type: 'string',
          default: "'9:41'",
          description: 'Horário exibido na status bar.',
        },
        {
          name: 'withStatusBar',
          type: 'boolean',
          default: 'true',
          description: 'Exibe a status bar do iPhone X.',
        },
        {
          name: 'withHomeIndicator',
          type: 'boolean',
          default: 'true',
          description: 'Exibe o home indicator na base.',
        },
        {
          name: 'framed',
          type: 'boolean',
          default: 'true',
          description: 'Aplica cantos arredondados e sombra ao redor do quadro.',
        },
        {
          name: 'statusBarBackground',
          type: 'string',
          description: 'Cor de fundo da status bar. Por padrão acompanha a superfície.',
        },
        {
          name: 'height',
          type: 'number',
          default: '812',
          description: 'Altura útil do quadro em pixels.',
        },
        { name: 'ariaLabel', type: 'string', description: 'Rótulo acessível do quadro.' },
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

const meta: Meta<typeof PhoneFrame> = {
  title: 'Instanooria/Componentes/PhoneFrame',
  component: PhoneFrame,
  parameters: { layout: 'centered' },
  argTypes: {
    time: { control: 'text', description: 'Horário exibido na status bar.' },
    withStatusBar: { control: 'boolean', description: 'Exibe a status bar.' },
    withHomeIndicator: { control: 'boolean', description: 'Exibe o home indicator.' },
    framed: { control: 'boolean', description: 'Aplica moldura e sombra.' },
    height: {
      control: { type: 'range', min: 400, max: 900, step: 4 },
      description: 'Altura útil do quadro em pixels.',
    },
    ariaLabel: { control: 'text', description: 'Rótulo acessível do quadro.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    time: '9:41',
    withStatusBar: true,
    withHomeIndicator: true,
    framed: true,
    height: 812,
    ariaLabel: 'Feed do Instanooria',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof PhoneFrame>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  parameters: { layout: 'padded' },
  render: () => <PhoneFrameDocumentationPage />,
};

/**
 * Playground com todas as propriedades do PhoneFrame expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PhoneFrame',
  render: (args) => (
    <PhoneFrame {...args}>
      <FeedScreen theme={args.theme} />
    </PhoneFrame>
  ),
};

/**
 * Réplica do frame oficial "Instagram Main" do Figma nos dois temas.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
      {(['light', 'dark'] as const).map((activeTheme) => (
        <PhoneFrame key={activeTheme} theme={activeTheme} ariaLabel={`Feed · tema ${activeTheme}`}>
          <FeedScreen theme={activeTheme} />
        </PhoneFrame>
      ))}
    </div>
  ),
};
