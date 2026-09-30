import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Avatar,
  Badge,
  Button,
  ChatBubble,
  ChatInput,
  Composer,
  Divider,
  FeatureCard,
  AssistantCard,
  Icon,
  IconButton,
  Input,
  Modal,
  NavItem,
  SearchInput,
  Logo,
  PlanTag,
  PromptSuggestion,
  SettingsRow,
  Sidebar,
  SidebarRow,
  Tag,
  Toggle,
  TopicColumn,
  WebSidebar,
} from '../../../src/unooriaai/components';
import type { UaiTheme } from '../../../src/unooriaai/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocCard,
  UaiDocDecisions,
  UaiDocGrid,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocSpecs,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';
import {
  uaiCatalog,
  uaiConversations,
  uaiFeatures,
  uaiPromptSuggestions,
  uaiSettings,
  uaiSidebarFooter,
  uaiTopicColumns,
  uaiTranscript,
  uaiWebFooterActions,
  uaiWebHistory,
} from '../fixtures';

/**
 * Moldura de janela usada pelas telas compostas — andaime de documentação,
 * restrito a `stories/`: a barra lateral de 260px fica à esquerda e a área de
 * conteúdo à direita.
 */
const Janela: React.FC<{
  theme?: UaiTheme;
  altura?: number;
  aside: React.ReactNode;
  children: React.ReactNode;
}> = ({ theme, altura = 640, aside, children }) => (
  <div
    data-uai-theme={theme}
    style={{
      display: 'flex',
      width: '100%',
      maxWidth: 1180,
      height: altura,
      overflow: 'hidden',
      borderRadius: 'var(--uai-radius-lg)',
      border: '1px solid var(--uai-border-default)',
      background: 'var(--uai-bg-primary)',
      fontFamily: 'var(--uai-font-sans)',
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
        gap: 'var(--uai-spacing-5)',
        padding: 'var(--uai-spacing-5) var(--uai-spacing-8)',
      }}
    >
      <span
        style={{
          fontSize: 'var(--uai-font-heading-h3-size)',
          fontWeight: 'var(--uai-font-weight-semibold)' as React.CSSProperties['fontWeight'],
          lineHeight: 'var(--uai-font-heading-h3-line)',
          color: 'var(--uai-text-primary)',
        }}
      >
        {titulo}
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--uai-spacing-4)' }}>
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
    <Sidebar.NewChatButton>Nova conversa</Sidebar.NewChatButton>
    {comBusca && <SearchInput block placeholder="Buscar conversas" />}
    <Sidebar.SectionLabel>Hoje</Sidebar.SectionLabel>
    {uaiConversations.slice(0, 3).map((item) => (
      <NavItem
        key={item}
        glyph={<Icon name="chatBubble" size={16} />}
        state={ativa === item ? 'active' : 'default'}
        onClick={() => onSelecionar(item)}
      >
        {item}
      </NavItem>
    ))}
    <Sidebar.SectionLabel>Últimos 7 dias</Sidebar.SectionLabel>
    {uaiConversations.slice(3).map((item) => (
      <NavItem
        key={item}
        glyph={<Icon name="chatBubble" size={16} />}
        state={ativa === item ? 'active' : 'default'}
        onClick={() => onSelecionar(item)}
      >
        {item}
      </NavItem>
    ))}
    <Sidebar.Spacer />
    {uaiSidebarFooter.map((item) => (
      <Sidebar.FooterItem key={item}>{item}</Sidebar.FooterItem>
    ))}
  </Sidebar>
);

/**
 * Tela de nova conversa — grade de capacidades, sugestões de prompt e compositor.
 */
const TelaNovaConversa: React.FC<{ theme?: UaiTheme }> = ({ theme }) => {
  const [ativa, setAtiva] = React.useState<string>(uaiConversations[0]);
  const [sugestao, setSugestao] = React.useState<string>('');

  return (
    <Janela theme={theme} aside={<BarraLateral ativa={ativa} onSelecionar={setAtiva} />}>
      <TopoDaArea
        titulo="Nova conversa"
        acoes={
          <>
            <Badge variant="primary">Beta</Badge>
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
          gap: 'var(--uai-spacing-8)',
          padding: 'var(--uai-spacing-8)',
          overflow: 'auto',
        }}
      >
        <span
          style={{
            fontSize: 'var(--uai-font-heading-h2-size)',
            fontWeight: 'var(--uai-font-weight-semibold)' as React.CSSProperties['fontWeight'],
            lineHeight: 'var(--uai-font-heading-h2-line)',
            color: 'var(--uai-text-primary)',
          }}
        >
          Como posso ajudar hoje?
        </span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--uai-spacing-5)',
            width: '100%',
            maxWidth: 760,
          }}
        >
          {uaiFeatures.map((item) => (
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
            gap: 'var(--uai-spacing-5)',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: 760,
          }}
        >
          {uaiPromptSuggestions.map((item) => (
            <Tag
              key={item}
              glyph={<Icon name="sparkle" size={16} />}
              selected={sugestao === item}
              onClick={() => setSugestao(item)}
            >
              {item}
            </Tag>
          ))}
        </div>
      </div>
      <div style={{ padding: 'var(--uai-spacing-8)', display: 'flex', justifyContent: 'center' }}>
        <ChatInput block value={sugestao} onValueChange={setSugestao} />
      </div>
    </Janela>
  );
};

/**
 * Tela de conversa — transcrição com os dois papéis e compositor ancorado.
 */
const TelaConversa: React.FC<{ theme?: UaiTheme }> = ({ theme }) => {
  const [ativa, setAtiva] = React.useState<string>(uaiConversations[1]);
  const [mensagens, setMensagens] = React.useState(
    uaiTranscript.map((item) => ({ role: item.role, message: item.message as string }))
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
              <Icon name="close" size={16} />
            </IconButton>
          </>
        }
      />
      <div
        style={{
          flex: '1 1 auto',
          overflow: 'auto',
          padding: 'var(--uai-spacing-8)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--uai-spacing-5)',
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
      <div style={{ padding: 'var(--uai-spacing-8)', display: 'flex', justifyContent: 'center' }}>
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
 * Tela de catálogo — busca e grade de assistentes.
 */
const TelaExplorarAssistentes: React.FC<{ theme?: UaiTheme }> = ({ theme }) => {
  const [ativa, setAtiva] = React.useState<string>(uaiConversations[0]);
  const [busca, setBusca] = React.useState('');
  const filtrados = uaiCatalog.filter(
    (item) =>
      item.name.toLowerCase().includes(busca.trim().toLowerCase()) ||
      item.description.toLowerCase().includes(busca.trim().toLowerCase())
  );

  return (
    <Janela theme={theme} aside={<BarraLateral ativa={ativa} onSelecionar={setAtiva} />}>
      <TopoDaArea
        titulo="Explorar assistentes"
        acoes={
          <>
            <SearchInput
              placeholder="Buscar assistentes"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
            <Button variant="primary" size="sm" leadingIcon={<Icon name="add" size={16} />}>
              Criar
            </Button>
          </>
        }
      />
      <div style={{ flex: '1 1 auto', overflow: 'auto', padding: 'var(--uai-spacing-8)' }}>
        {filtrados.length === 0 ? (
          <span
            style={{ fontSize: 'var(--uai-font-body-sm-size)', color: 'var(--uai-text-soft-50)' }}
          >
            Nenhum assistente corresponde à busca.
          </span>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'var(--uai-spacing-5)',
            }}
          >
            {filtrados.map((item) => (
              <AssistantCard
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
const TelaConfiguracoes: React.FC<{ theme?: UaiTheme }> = ({ theme }) => {
  const [ativa, setAtiva] = React.useState<string>(uaiConversations[0]);
  const [memoria, setMemoria] = React.useState(true);
  const [temporario, setTemporario] = React.useState(false);
  const [dialogo, setDialogo] = React.useState(false);

  return (
    <Janela theme={theme} aside={<BarraLateral ativa={ativa} onSelecionar={setAtiva} />}>
      <TopoDaArea
        titulo="Configurações"
        acoes={<Avatar size="md" initials="LS" />}
      />
      <div style={{ flex: '1 1 auto', overflow: 'auto', padding: 'var(--uai-spacing-8)' }}>
        <div style={{ maxWidth: 560, display: 'grid', gap: 'var(--uai-spacing-8)' }}>
          <div>
            <span
              style={{
                display: 'block',
                marginBottom: 'var(--uai-spacing-4)',
                fontSize: 'var(--uai-font-label-sm-size)',
                fontWeight: 'var(--uai-font-weight-semibold)' as React.CSSProperties['fontWeight'],
                color: 'var(--uai-text-soft-40)',
              }}
            >
              GERAL
            </span>
            {uaiSettings.slice(0, 3).map((row, index) => (
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
                marginBottom: 'var(--uai-spacing-4)',
                fontSize: 'var(--uai-font-label-sm-size)',
                fontWeight: 'var(--uai-font-weight-semibold)' as React.CSSProperties['fontWeight'],
                color: 'var(--uai-text-soft-40)',
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
            <SettingsRow label="Plano" block value={<Badge variant="primary">Pro</Badge>} />
          </div>

          <div>
            <span
              style={{
                display: 'block',
                marginBottom: 'var(--uai-spacing-4)',
                fontSize: 'var(--uai-font-label-sm-size)',
                fontWeight: 'var(--uai-font-weight-semibold)' as React.CSSProperties['fontWeight'],
                color: 'var(--uai-text-soft-40)',
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
 * Tela de nova conversa do cliente web: barra lateral de 282px, três colunas
 * de tópicos, logotipo com selo de plano e compositor de quatro alvos.
 *
 * Usa a família `WebSidebar` / `SidebarRow` / `Composer`, cujas medidas são
 * próprias e não substituem as de `Sidebar` / `NavItem` / `ChatInput`.
 */
const TelaClienteWeb: React.FC<{ theme?: UaiTheme }> = ({ theme = 'light' }) => {
  const [enviadas, setEnviadas] = React.useState<string[]>([]);
  const [ativa, setAtiva] = React.useState<string>(uaiWebHistory[0]);

  return (
    <div
      data-uai-theme={theme}
      style={{
        display: 'flex',
        width: '100%',
        maxWidth: 1440,
        height: 760,
        borderRadius: 'var(--uai-radius-3xl)',
        overflow: 'hidden',
        backgroundColor: 'var(--uai-web-canvas)',
        border: '1px solid var(--uai-web-hairline)',
        fontFamily: 'var(--uai-font-sans)',
      }}
    >
      <WebSidebar height="100%">
        <WebSidebar.Section>
          <WebSidebar.NewChat onClick={() => setEnviadas([])}>Nova conversa</WebSidebar.NewChat>
          {uaiWebHistory.map((title) => (
            <SidebarRow
              key={title}
              icon="chatText"
              active={ativa === title}
              onClick={() => setAtiva(title)}
            >
              {title}
            </SidebarRow>
          ))}
        </WebSidebar.Section>
        <WebSidebar.Section bordered>
          {uaiWebFooterActions.map((action) => (
            <SidebarRow key={action.label} icon={action.icon}>
              {action.label}
            </SidebarRow>
          ))}
        </WebSidebar.Section>
      </WebSidebar>

      <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--uai-spacing-15)',
            flex: '1 1 auto',
            padding: 'var(--uai-spacing-12) var(--uai-spacing-8)',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--uai-spacing-6)' }}>
            <Logo variant="horizontal" height={64} />
            <PlanTag>Pro</PlanTag>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 'var(--uai-spacing-11)',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {uaiTopicColumns.map((column, indice) => (
              <TopicColumn key={column.title} icon={column.icon} title={column.title}>
                {column.items.map((item) =>
                  indice === 0 ? (
                    <PromptSuggestion
                      key={item}
                      as="button"
                      onClick={() => setEnviadas((prev) => [...prev, item])}
                    >
                      {item}
                    </PromptSuggestion>
                  ) : (
                    <PromptSuggestion key={item}>{item}</PromptSuggestion>
                  )
                )}
              </TopicColumn>
            ))}
          </div>

          {enviadas.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--uai-spacing-5)',
                width: '100%',
                maxWidth: 760,
              }}
            >
              {enviadas.map((mensagem, index) => (
                <ChatBubble key={`${mensagem}-${index}`} role="user">
                  {mensagem}
                </ChatBubble>
              ))}
            </div>
          )}
        </div>

        <Composer.Dock>
          <Composer
            onSend={(valor) => {
              if (!valor.trim()) return;
              setEnviadas((prev) => [...prev, valor]);
            }}
          />
        </Composer.Dock>
      </div>
    </div>
  );
};

/**
 * Cor das barras de seção da documentação (`brandpurple-600` da Unooria).
 */
const BAR = '#716C98';

/**
 * Página de documentação das telas compostas.
 */
const TelasDocumentationPage = () => (
  <UnooriaDocShell maxWidth="1400px">
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Telas • Composição"
      title="Telas Compostas"
      description="Cinco telas do cliente de conversa montadas exclusivamente com os componentes de produção de src/unooriaai/. Nenhum mockup paralelo: cada superfície, campo e linha é o componente real, e todo espaçamento vem das variáveis --uai-spacing-*."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="As telas servem de prova de composição: se um fluxo não se monta com a biblioteca, falta componente."
      barColor={BAR}
    />
    <UaiDocGrid>
      <UaiDocCard icon="✨" title="Nova conversa">
        <code>Sidebar</code> + <code>FeatureCard</code> em grade + <code>Tag</code> de sugestão +{' '}
        <code>ChatInput</code>. A tela vazia do produto.
      </UaiDocCard>
      <UaiDocCard icon="💬" title="Conversa">
        <code>ChatBubble</code> nos dois papéis dentro de uma coluna de 720px, com o compositor
        ancorado na base. Envio funcional.
      </UaiDocCard>
      <UaiDocCard icon="🗂️" title="Explorar assistentes">
        <code>SearchInput</code> filtrando uma grade de <code>AssistantCard</code> acionáveis, com
        estado vazio explícito.
      </UaiDocCard>
      <UaiDocCard icon="⚙️" title="Configurações">
        <code>SettingsRow</code> intercalado com <code>Divider</code>, controles reais (
        <code>Toggle</code>, <code>Input</code>, <code>Badge</code>) e um <code>Modal</code> de
        confirmação destrutiva.
      </UaiDocCard>
      <UaiDocCard icon="🖥️" title="Cliente web">
        <code>WebSidebar</code> + <code>TopicColumn</code> + <code>PromptSuggestion</code> +{' '}
        <code>Composer</code>: a tela de nova conversa com a barra lateral de 282px e o compositor
        de quatro alvos.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações Técnicas"
      description="Composição das telas e o que é andaime de documentação."
      barColor={BAR}
    />
    <UaiDocSpecs
      component="(todos os componentes)"
      layout="Janela · barra lateral + área de conteúdo"
      specs={[
        { label: 'Componentes usados', value: 'src/unooriaai/components' },
        { label: 'Barra lateral', value: '260px · Sidebar' },
        { label: 'Barra lateral web', value: '282px · WebSidebar' },
        { label: 'Coluna de conversa', value: '720px de largura máxima' },
        { label: 'Calha da área', value: '24px · --uai-spacing-8' },
        { label: 'Temas', value: 'claro e escuro' },
        { label: 'Mockups paralelos', value: 'nenhum' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Andaimes restritos a stories/',
          detail:
            'A moldura de janela (Janela) e o cabeçalho de área (TopoDaArea) são andaimes de documentação, não componentes de produção: não integram o pacote e consomem apenas tokens --uai-*.',
        },
        {
          subject: 'Rótulos de seção das configurações',
          detail:
            'GERAL, PERSONALIZAÇÃO e DADOS usam o degrau Label/SM em --uai-text-soft-40, o mesmo tratamento do Sidebar.SectionLabel, por não existir componente de cabeçalho de seção na biblioteca.',
        },
        {
          subject: 'Ícones no lugar de caracteres',
          detail:
            'Os slots de glifo das telas recebem o Icon do módulo (ligaduras do Material Symbols Rounded, peso 300): chatBubble nas conversas, sparkle nas sugestões, add no botão de criar e close no botão de fechar.',
        },
        {
          subject: 'Duas réguas de barra lateral',
          detail:
            'As telas de nova conversa, conversa, catálogo e configurações usam Sidebar, NavItem e ChatInput; a tela de cliente web usa WebSidebar, SidebarRow e Composer. As duas famílias têm medidas próprias e não se substituem.',
        },
        {
          subject: 'Selo "Beta" na nova conversa',
          detail:
            'O selo ao lado do avatar sinaliza que o assistente está em fase de testes; é conteúdo de demonstração, não parte do componente.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Tela de Nova Conversa"
      description="Sidebar, grade de capacidades, sugestões de prompt e compositor."
      barColor={BAR}
    />
    <div style={{ marginBottom: 32 }}>
      <TelaNovaConversa />
    </div>

    <UnooriaDocSectionHeader
      title="4. Tela de Conversa"
      description="Transcrição com os dois papéis do ChatBubble. Digite no compositor para adicionar uma mensagem."
      barColor={BAR}
    />
    <div style={{ marginBottom: 32 }}>
      <TelaConversa />
    </div>

    <UnooriaDocSectionHeader
      title="5. Tela de Explorar Assistentes e Boas Práticas"
      description="Busca funcional sobre a grade de catálogo."
      barColor={BAR}
    />
    <div style={{ marginBottom: 32 }}>
      <TelaExplorarAssistentes />
    </div>
    <UaiDocPractices
      dos={[
        'Montar telas apenas com os componentes de src/unooriaai/, sem réplicas locais.',
        'Deixar a barra lateral com height="100%" e a moldura da aplicação definir a altura.',
        'Limitar a coluna de conversa a uma largura máxima, deixando as bolhas abraçarem o conteúdo.',
        'Trocar o tema no contêiner mais externo, deixando todos os componentes herdarem.',
      ]}
      donts={[
        'Criar mockups paralelos em stories/ para simular um componente que já existe em src/.',
        'Escrever pixels avulsos no layout das telas: todo espaçamento vem de --uai-spacing-*.',
        'Aplicar data-uai-theme em cada componente quando um contêiner ancestral já define o tema.',
        'Misturar tokens de outra marca (--unooria-*, --unv-*) dentro das telas do UnooriaAI.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A mesma tela de configurações resolvida pelo tema claro e pelo escuro, incluindo o diálogo de confirmação. Use o alternador para trocar data-uai-theme."
      barColor={BAR}
    />
    <UaiDocThemeSwitcher surface="secondary" direction="column" padding={16}>
      {(tema) => <TelaConfiguracoes theme={tema} />}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Tela de Cliente Web"
      description="Composição de duas colunas com a barra lateral de 282px, três colunas de tópicos e o compositor de quatro alvos."
      barColor={BAR}
    />
    <div style={{ marginBottom: 32 }}>
      <TelaClienteWeb />
    </div>

    <UnooriaDocSectionHeader
      title="8. Referência dos Componentes por Tela"
      description="Quais componentes cada tela consome."
      barColor={BAR}
    />
    <UaiDocPropsTable
      title="Composição das telas"
      rows={[
        {
          name: 'Nova conversa',
          type: 'Sidebar · NavItem · FeatureCard · Tag · ChatInput',
          default: 'Avatar · Badge · Divider · Icon',
          description:
            'Tela vazia: grade de capacidades e sugestões de prompt acima do compositor. Clicar em uma sugestão preenche o campo.',
        },
        {
          name: 'Conversa',
          type: 'Sidebar · NavItem · ChatBubble · ChatInput',
          default: 'Button · IconButton · Divider · Icon',
          description:
            'Transcrição em coluna de 720px, com envio funcional acumulando bolhas de usuário.',
        },
        {
          name: 'Explorar assistentes',
          type: 'Sidebar · NavItem · SearchInput · AssistantCard',
          default: 'Button · Divider · Icon',
          description: 'Grade de catálogo filtrada em tempo real, com estado vazio explícito.',
        },
        {
          name: 'Configurações',
          type: 'Sidebar · SettingsRow · Toggle · Input · Modal',
          default: 'Badge · Button · Divider · Avatar',
          description:
            'Três seções de preferências e um diálogo de exclusão com foco confinado e fechamento por ESC.',
        },
        {
          name: 'Cliente web',
          type: 'WebSidebar · SidebarRow · TopicColumn · PromptSuggestion · Composer',
          default: 'Logo · PlanTag · ChatBubble',
          description:
            'Nova conversa do cliente web: histórico na barra lateral, três colunas de tópicos e compositor ancorado na doca.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'UnooriaAI/Telas/Telas Compostas',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Telas do cliente de conversa montadas exclusivamente com os componentes de produção do Design System UnooriaAI, nos temas claro e escuro.',
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
 * Tela de catálogo de assistentes com busca.
 */
export const ExplorarAssistentes: Story = {
  name: '🗂️ Explorar Assistentes',
  render: () => (
    <div style={{ padding: 24 }}>
      <TelaExplorarAssistentes />
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
 * Tela de nova conversa do cliente web, com a família `WebSidebar` e `Composer`.
 */
export const ClienteWeb: Story = {
  name: '🖥️ Cliente Web — Nova conversa',
  render: () => (
    <div style={{ padding: 24 }}>
      <TelaClienteWeb />
    </div>
  ),
};

/**
 * O cliente web nos dois temas, lado a lado.
 */
export const ClienteWebParDeTemas: Story = {
  name: '🌗 Cliente Web — par claro/escuro',
  render: () => (
    <div style={{ display: 'grid', gap: 24, padding: 24 }}>
      <TelaClienteWeb theme="light" />
      <TelaClienteWeb theme="dark" />
    </div>
  ),
};

/**
 * As quatro telas do cliente de conversa no tema escuro.
 */
export const ModoEscuro: Story = {
  name: '🌙 Modo Escuro',
  render: () => (
    <div
      data-uai-theme="dark"
      style={{
        display: 'grid',
        gap: 24,
        padding: 24,
        background: 'var(--uai-bg-secondary)',
      }}
    >
      <TelaNovaConversa theme="dark" />
      <TelaConversa theme="dark" />
      <TelaExplorarAssistentes theme="dark" />
      <TelaConfiguracoes theme="dark" />
    </div>
  ),
};
