import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  Badge,
  Button,
  ChatBubble,
  ChatInput,
  Divider,
  FeatureCard,
  GPTCard,
  IconButton,
  Input,
  Modal,
  NavItem,
  SearchInput,
  SettingsRow,
  Sidebar,
  Tag,
  Toggle,
} from '../../../src/chatgpt/components';
import { gptGlyphs, type GptTheme } from '../../../src/chatgpt/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  GptDocCard,
  GptDocGrid,
  GptDocFigmaSpecs,
  GptDocPractices,
  GptDocPropsTable,
} from '../../../.storybook/components';
import {
  gptCatalog,
  gptConversations,
  gptFeatures,
  gptFigmaNodes,
  gptPromptSuggestions,
  gptSettings,
  gptSidebarFooter,
  gptTranscript,
} from '../fixtures';

/**
 * Moldura de janela usada pelas telas compostas — reproduz o recorte de 1440px
 * das telas da página `🟪 ChatGPT Web Client`, com a barra lateral de 260px à
 * esquerda e a área de conteúdo à direita.
 */
const Janela: React.FC<{
  theme?: GptTheme;
  altura?: number;
  aside: React.ReactNode;
  children: React.ReactNode;
}> = ({ theme, altura = 640, aside, children }) => (
  <div
    data-gpt-theme={theme}
    style={{
      display: 'flex',
      width: '100%',
      maxWidth: 1180,
      height: altura,
      overflow: 'hidden',
      borderRadius: 'var(--gpt-radius-lg)',
      border: '1px solid var(--gpt-border-default)',
      background: 'var(--gpt-bg-primary)',
      fontFamily: 'var(--gpt-font-sans)',
    }}
  >
    {aside}
    <div style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  </div>
);

/**
 * Cabeçalho da área de conteúdo, com título e ações à direita.
 */
const TopoDaArea: React.FC<{ titulo: string; acoes?: React.ReactNode }> = ({ titulo, acoes }) => (
  <>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--gpt-spacing-5)',
        padding: 'var(--gpt-spacing-5) var(--gpt-spacing-8)',
      }}
    >
      <span
        style={{
          fontSize: 'var(--gpt-font-heading-h3-size)',
          fontWeight: 'var(--gpt-font-weight-semibold)' as React.CSSProperties['fontWeight'],
          lineHeight: 'var(--gpt-font-heading-h3-line)',
          color: 'var(--gpt-text-primary)',
        }}
      >
        {titulo}
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--gpt-spacing-4)' }}>
        {acoes}
      </span>
    </div>
    <Divider />
  </>
);

/**
 * Barra lateral compartilhada por todas as telas.
 */
const BarraLateral: React.FC<{
  ativa: string;
  onSelecionar: (item: string) => void;
  comBusca?: boolean;
}> = ({ ativa, onSelecionar, comBusca = false }) => (
  <Sidebar height="100%">
    <Sidebar.NewChatButton />
    {comBusca && <SearchInput block />}
    <Sidebar.SectionLabel>Today</Sidebar.SectionLabel>
    {gptConversations.slice(0, 3).map((item) => (
      <NavItem
        key={item}
        glyph={gptGlyphs.chat}
        state={ativa === item ? 'active' : 'default'}
        onClick={() => onSelecionar(item)}
      >
        {item}
      </NavItem>
    ))}
    <Sidebar.SectionLabel>Previous 7 days</Sidebar.SectionLabel>
    {gptConversations.slice(3).map((item) => (
      <NavItem
        key={item}
        glyph={gptGlyphs.chat}
        state={ativa === item ? 'active' : 'default'}
        onClick={() => onSelecionar(item)}
      >
        {item}
      </NavItem>
    ))}
    <Sidebar.Spacer />
    {gptSidebarFooter.map((item) => (
      <Sidebar.FooterItem key={item}>{item}</Sidebar.FooterItem>
    ))}
  </Sidebar>
);

/**
 * Tela de nova conversa — grade de capacidades, sugestões de prompt e compositor.
 */
const TelaNovaConversa: React.FC<{ theme?: GptTheme }> = ({ theme }) => {
  const [ativa, setAtiva] = React.useState<string>(gptConversations[0]);
  const [sugestao, setSugestao] = React.useState<string>('');

  return (
    <Janela theme={theme} aside={<BarraLateral ativa={ativa} onSelecionar={setAtiva} />}>
      <TopoDaArea
        titulo="New chat"
        acoes={
          <>
            <Badge variant="primary">GPT-4</Badge>
            <Avatar size="md" initials="LS" />
          </>
        }
      />
      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--gpt-spacing-8)',
          padding: 'var(--gpt-spacing-8)',
          overflow: 'auto',
        }}
      >
        <span
          style={{
            fontSize: 'var(--gpt-font-heading-h2-size)',
            fontWeight: 'var(--gpt-font-weight-semibold)' as React.CSSProperties['fontWeight'],
            lineHeight: 'var(--gpt-font-heading-h2-line)',
            color: 'var(--gpt-text-primary)',
          }}
        >
          Como posso ajudar hoje?
        </span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--gpt-spacing-5)',
            width: '100%',
            maxWidth: 760,
          }}
        >
          {gptFeatures.map((item) => (
            <FeatureCard
              key={item.title}
              as="button"
              block
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            gap: 'var(--gpt-spacing-5)',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: 760,
          }}
        >
          {gptPromptSuggestions.map((item) => (
            <Tag
              key={item}
              glyph={gptGlyphs.sparkle}
              selected={sugestao === item}
              onClick={() => setSugestao(item)}
            >
              {item}
            </Tag>
          ))}
        </div>
      </div>
      <div style={{ padding: 'var(--gpt-spacing-8)', display: 'flex', justifyContent: 'center' }}>
        <ChatInput block value={sugestao} onValueChange={setSugestao} />
      </div>
    </Janela>
  );
};

/**
 * Tela de conversa — transcrição com os dois papéis e compositor ancorado.
 */
const TelaConversa: React.FC<{ theme?: GptTheme }> = ({ theme }) => {
  const [ativa, setAtiva] = React.useState<string>(gptConversations[1]);
  const [mensagens, setMensagens] = React.useState(
    gptTranscript.map((item) => ({ role: item.role, message: item.message as string }))
  );

  return (
    <Janela theme={theme} aside={<BarraLateral ativa={ativa} onSelecionar={setAtiva} />}>
      <TopoDaArea
        titulo={ativa}
        acoes={
          <>
            <Button variant="outline" size="sm">
              Compartilhar
            </Button>
            <IconButton variant="filled" size="sm" aria-label="Fechar conversa">
              {gptGlyphs.close}
            </IconButton>
          </>
        }
      />
      <div
        style={{
          flex: '1 1 auto',
          overflow: 'auto',
          padding: 'var(--gpt-spacing-8)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--gpt-spacing-5)',
            width: '100%',
            maxWidth: 720,
          }}
        >
          {mensagens.map((item, index) => (
            <div
              key={`${item.role}-${index}`}
              style={{
                display: 'flex',
                justifyContent: item.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <ChatBubble role={item.role}>{item.message}</ChatBubble>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: 'var(--gpt-spacing-8)', display: 'flex', justifyContent: 'center' }}>
        <ChatInput
          block
          onSend={(texto) =>
            texto && setMensagens((atual) => [...atual, { role: 'user', message: texto }])
          }
        />
      </div>
    </Janela>
  );
};

/**
 * Tela de catálogo — busca e grade de GPTs.
 */
const TelaExplorarGPTs: React.FC<{ theme?: GptTheme }> = ({ theme }) => {
  const [ativa, setAtiva] = React.useState<string>(gptConversations[0]);
  const [busca, setBusca] = React.useState('');
  const filtrados = gptCatalog.filter(
    (item) =>
      item.name.toLowerCase().includes(busca.trim().toLowerCase()) ||
      item.description.toLowerCase().includes(busca.trim().toLowerCase())
  );

  return (
    <Janela theme={theme} aside={<BarraLateral ativa={ativa} onSelecionar={setAtiva} />}>
      <TopoDaArea
        titulo="Explore GPTs"
        acoes={
          <>
            <SearchInput
              placeholder="Search GPTs"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
            <Button variant="primary" size="sm" leadingIcon={gptGlyphs.plus}>
              Criar
            </Button>
          </>
        }
      />
      <div style={{ flex: '1 1 auto', overflow: 'auto', padding: 'var(--gpt-spacing-8)' }}>
        {filtrados.length === 0 ? (
          <span style={{ fontSize: 14, color: 'var(--gpt-text-soft-50)' }}>
            Nenhum GPT corresponde à busca.
          </span>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'var(--gpt-spacing-5)',
            }}
          >
            {filtrados.map((item) => (
              <GPTCard
                key={item.name}
                as="button"
                block
                name={item.name}
                description={item.description}
                initial={item.initial}
              />
            ))}
          </div>
        )}
      </div>
    </Janela>
  );
};

/**
 * Tela de configurações — lista de preferências e diálogo de exclusão.
 */
const TelaConfiguracoes: React.FC<{ theme?: GptTheme }> = ({ theme }) => {
  const [ativa, setAtiva] = React.useState<string>(gptConversations[0]);
  const [memoria, setMemoria] = React.useState(true);
  const [temporario, setTemporario] = React.useState(false);
  const [dialogo, setDialogo] = React.useState(false);

  return (
    <Janela theme={theme} aside={<BarraLateral ativa={ativa} onSelecionar={setAtiva} />}>
      <TopoDaArea
        titulo="Settings"
        acoes={<Avatar size="md" initials="LS" />}
      />
      <div style={{ flex: '1 1 auto', overflow: 'auto', padding: 'var(--gpt-spacing-8)' }}>
        <div style={{ maxWidth: 560, display: 'grid', gap: 'var(--gpt-spacing-8)' }}>
          <div>
            <span
              style={{
                display: 'block',
                marginBottom: 'var(--gpt-spacing-4)',
                fontSize: 'var(--gpt-font-label-sm-size)',
                fontWeight: 'var(--gpt-font-weight-semibold)' as React.CSSProperties['fontWeight'],
                color: 'var(--gpt-text-soft-40)',
              }}
            >
              GERAL
            </span>
            {gptSettings.slice(0, 3).map((row, index) => (
              <React.Fragment key={row.label}>
                <SettingsRow label={row.label} value={row.value} block />
                {index < 2 && <Divider />}
              </React.Fragment>
            ))}
          </div>

          <div>
            <span
              style={{
                display: 'block',
                marginBottom: 'var(--gpt-spacing-4)',
                fontSize: 'var(--gpt-font-label-sm-size)',
                fontWeight: 'var(--gpt-font-weight-semibold)' as React.CSSProperties['fontWeight'],
                color: 'var(--gpt-text-soft-40)',
              }}
            >
              PERSONALIZAÇÃO
            </span>
            <SettingsRow
              label="Memória"
              block
              value={
                <Toggle checked={memoria} onCheckedChange={setMemoria} aria-label="Alternar memória" />
              }
            />
            <Divider />
            <SettingsRow
              label="Chats temporários"
              block
              value={
                <Toggle
                  checked={temporario}
                  onCheckedChange={setTemporario}
                  aria-label="Alternar chats temporários"
                />
              }
            />
            <Divider />
            <SettingsRow label="Plano" block value={<Badge variant="primary">Plus</Badge>} />
          </div>

          <div>
            <span
              style={{
                display: 'block',
                marginBottom: 'var(--gpt-spacing-4)',
                fontSize: 'var(--gpt-font-label-sm-size)',
                fontWeight: 'var(--gpt-font-weight-semibold)' as React.CSSProperties['fontWeight'],
                color: 'var(--gpt-text-soft-40)',
              }}
            >
              DADOS
            </span>
            <SettingsRow
              label="Apelido exibido"
              block
              value={<Input defaultValue="Lucas" style={{ width: 200 }} />}
            />
            <Divider />
            <SettingsRow
              label="Apagar todas as conversas"
              block
              value={
                <Button variant="destructive" size="sm" onClick={() => setDialogo(true)}>
                  Apagar
                </Button>
              }
            />
          </div>
        </div>
      </div>

      <Modal
        open={dialogo}
        onClose={() => setDialogo(false)}
        theme={theme}
        title="Apagar todas as conversas"
      >
        <Modal.Body>
          Esta ação não pode ser desfeita. Todas as conversas e seus anexos serão removidos
          permanentemente desta conta.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setDialogo(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={() => setDialogo(false)}>
            Apagar tudo
          </Button>
        </Modal.Footer>
      </Modal>
    </Janela>
  );
};

/**
 * Página de documentação das telas compostas.
 */
const TelasDocumentationPage = () => (
  <UnooriaDocShell maxWidth="1400px">
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Telas • Composição"
      title="Telas Compostas"
      description="Quatro telas do cliente de conversa montadas exclusivamente com os 17 componentes de produção de src/chatgpt/. Nenhum mockup paralelo: cada superfície, campo e linha é o componente real, e todo espaçamento vem das variáveis --gpt-spacing-*."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="As telas servem de prova de composição: se um fluxo não se monta com a biblioteca, falta componente."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="✨" title="Nova conversa">
        <code>Sidebar</code> + <code>FeatureCard</code> em grade + <code>Tag</code> de sugestão +{' '}
        <code>ChatInput</code>. A tela vazia do produto.
      </GptDocCard>
      <GptDocCard icon="💬" title="Conversa">
        <code>ChatBubble</code> nos dois papéis dentro de uma coluna de 720px, com o compositor
        ancorado na base. Envio funcional.
      </GptDocCard>
      <GptDocCard icon="🗂️" title="Explorar GPTs">
        <code>SearchInput</code> filtrando uma grade de <code>GPTCard</code> acionáveis, com estado
        vazio explícito.
      </GptDocCard>
      <GptDocCard icon="⚙️" title="Configurações">
        <code>SettingsRow</code> intercalado com <code>Divider</code>, controles reais
        (<code>Toggle</code>, <code>Input</code>, <code>Badge</code>) e um <code>Modal</code> de
        confirmação destrutiva.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Origem das telas e o que foi possível extrair de cada página do arquivo."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.page}
      frameName="🟡 Design system · 🟪 ChatGPT Web Client"
      specs={[
        { label: 'Componentes usados', value: '17 de 17' },
        { label: 'Barra lateral', value: '260px · size/sidebar' },
        { label: 'Coluna de conversa', value: '720px de largura máxima' },
        { label: 'Calha da área', value: '24px · spacing/8' },
        { label: 'Telas do arquivo', value: '19 × 2 temas' },
        { label: 'Mockups paralelos', value: 'nenhum' },
      ]}
      deviations={[
        'A página 🟪 ChatGPT Web Client contém as 19 telas do produto inteiramente achatadas em 4.516 nós vetoriais, sem camadas de texto, componentes ou variáveis vinculadas. Ela serviu apenas como referência de layout e fluxo; toda a implementação vem da página 🟡 Design system, onde estão as coleções de variáveis e os 17 componentes.',
        'A moldura de janela (Janela) e o cabeçalho de área (TopoDaArea) destas estórias são andaimes de documentação, não componentes de produção — o arquivo não publica nenhum dos dois. Estão restritos a stories/ e consomem apenas tokens --gpt-*.',
        'Os rótulos de seção da tela de configurações (GERAL, PERSONALIZAÇÃO, DADOS) usam Label/SM a 40% de opacidade, o mesmo tratamento do Sidebar.SectionLabel, por não existir componente de cabeçalho de seção na biblioteca.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Tela de Nova Conversa"
      description="Sidebar, grade de capacidades, sugestões de prompt e compositor."
      barColor="#5856D6"
    />
    <div style={{ marginBottom: 32 }}>
      <TelaNovaConversa />
    </div>

    <UnooriaDocSectionHeader
      title="4. Tela de Conversa"
      description="Transcrição com os dois papéis do ChatBubble. Digite no compositor para adicionar uma mensagem."
      barColor="#5856D6"
    />
    <div style={{ marginBottom: 32 }}>
      <TelaConversa />
    </div>

    <UnooriaDocSectionHeader
      title="5. Tela de Explorar GPTs e Boas Práticas"
      description="Busca funcional sobre a grade de catálogo."
      barColor="#5856D6"
    />
    <div style={{ marginBottom: 32 }}>
      <TelaExplorarGPTs />
    </div>
    <GptDocPractices
      dos={[
        'Montar telas apenas com os componentes de src/chatgpt/, sem réplicas locais.',
        'Deixar a barra lateral com height="100%" e a moldura da aplicação definir a altura.',
        'Limitar a coluna de conversa a uma largura máxima, deixando as bolhas abraçarem o conteúdo.',
        'Trocar o tema no contêiner mais externo, deixando todos os componentes herdarem.',
      ]}
      donts={[
        'Criar mockups paralelos em stories/ para simular um componente que já existe em src/.',
        'Escrever pixels avulsos no layout das telas: todo espaçamento vem de --gpt-spacing-*.',
        'Aplicar data-gpt-theme em cada componente quando um contêiner ancestral já define o tema.',
        'Misturar tokens de outra marca (--unooria-*, --insta-*) dentro das telas do ChatGPT.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Tela de Configurações nos Dois Temas"
      description="A mesma composição resolvida por Light e Dark, incluindo o diálogo de confirmação."
      barColor="#5856D6"
    />
    <div style={{ display: 'grid', gap: 24, marginBottom: 32 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#475157', marginBottom: 8 }}>
            {tema === 'light' ? '☀️ Light' : '🌙 Dark'}
          </div>
          <TelaConfiguracoes theme={tema} />
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="7. Referência dos Componentes por Tela"
      description="Quais componentes cada tela consome."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="Composição das telas"
      rows={[
        {
          name: 'Nova conversa',
          type: 'Sidebar · NavItem · FeatureCard · Tag · ChatInput',
          default: 'Avatar · Badge · Divider',
          description:
            'Tela vazia: grade de capacidades e sugestões de prompt acima do compositor. Clicar em uma sugestão preenche o campo.',
        },
        {
          name: 'Conversa',
          type: 'Sidebar · NavItem · ChatBubble · ChatInput',
          default: 'Button · IconButton · Divider',
          description:
            'Transcrição em coluna de 720px, com envio funcional acumulando bolhas de usuário.',
        },
        {
          name: 'Explorar GPTs',
          type: 'Sidebar · NavItem · SearchInput · GPTCard',
          default: 'Button · Divider',
          description: 'Grade de catálogo filtrada em tempo real, com estado vazio explícito.',
        },
        {
          name: 'Configurações',
          type: 'Sidebar · SettingsRow · Toggle · Input · Modal',
          default: 'Badge · Button · Divider · Avatar',
          description:
            'Três seções de preferências e um diálogo de exclusão com foco confinado e fechamento por ESC.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'ChatGPT/Telas/Telas Compostas',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Telas do cliente de conversa montadas exclusivamente com os componentes de produção do Design System ChatGPT.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação completa das telas compostas.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TelasDocumentationPage />,
};

/**
 * Tela de nova conversa.
 */
export const NovaConversa: Story = {
  name: '✨ Nova Conversa',
  render: () => (
    <div style={{ padding: 24 }}>
      <TelaNovaConversa />
    </div>
  ),
};

/**
 * Tela de conversa com transcrição e envio funcional.
 */
export const Conversa: Story = {
  name: '💬 Conversa',
  render: () => (
    <div style={{ padding: 24 }}>
      <TelaConversa />
    </div>
  ),
};

/**
 * Tela de catálogo de GPTs com busca.
 */
export const ExplorarGPTs: Story = {
  name: '🗂️ Explorar GPTs',
  render: () => (
    <div style={{ padding: 24 }}>
      <TelaExplorarGPTs />
    </div>
  ),
};

/**
 * Tela de configurações com diálogo de exclusão.
 */
export const Configuracoes: Story = {
  name: '⚙️ Configurações',
  render: () => (
    <div style={{ padding: 24 }}>
      <TelaConfiguracoes />
    </div>
  ),
};

/**
 * As quatro telas no modo Dark.
 */
export const ModoDark: Story = {
  name: '🌙 Modo Dark',
  render: () => (
    <div style={{ display: 'grid', gap: 24, padding: 24, background: '#111111' }}>
      <TelaNovaConversa theme="dark" />
      <TelaConversa theme="dark" />
      <TelaExplorarGPTs theme="dark" />
      <TelaConfiguracoes theme="dark" />
    </div>
  ),
};
