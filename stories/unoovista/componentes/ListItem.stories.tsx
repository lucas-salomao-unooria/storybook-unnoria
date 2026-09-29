import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ListItem } from '../../../src/unoovista/components/ListItem';
import { Avatar } from '../../../src/unoovista/components/Avatar';
import { Icon } from '../../../src/unoovista/components/Icon';
import { TopBar } from '../../../src/unoovista/components/TopBar';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import { unvAvatars, unvConversations } from '../fixtures';

const BAR = '#716C98';

/**
 * Itens do menu lateral do perfil.
 */
const MENU_ITEMS = [
  { id: 'archive', label: 'Arquivo', icon: 'archive' as const },
  { id: 'activity', label: 'Sua atividade', icon: 'activity' as const },
  { id: 'qr-code', label: 'Meu código', icon: 'qrCode' as const },
  { id: 'saved', label: 'Salvos', icon: 'bookmark' as const },
  { id: 'close-friends', label: 'Amigos próximos', icon: 'closeFriends' as const },
  { id: 'discover', label: 'Descobrir pessoas', icon: 'discover' as const },
  { id: 'external', label: 'Abrir serviço externo', icon: 'external' as const },
];

/**
 * Caixa de 56px para o avatar: com anel de história o avatar cresce, e a caixa
 * mantém os títulos alinhados entre as linhas.
 */
const AvatarSlot: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ display: 'flex', justifyContent: 'center', width: 56 }}>{children}</span>
);

const CameraAction = () => <Icon name="camera" size="md" tone="secondary" />;

/**
 * Lista de conversas: cada linha é um botão, com fio entre as linhas.
 */
const ConversationList: React.FC = () => (
  <div style={{ width: '100%', maxWidth: 375 }}>
    {unvConversations.map((conversation, index) => (
      <ListItem
        key={conversation.id}
        leading={
          <AvatarSlot>
            <Avatar src={conversation.avatarSrc} alt="" size={44} ring={conversation.ring} />
          </AvatarSlot>
        }
        title={conversation.username}
        subtitle={conversation.message}
        meta={`· ${conversation.time}`}
        trailing={<CameraAction />}
        bordered={index < unvConversations.length - 1}
        onClick={() => undefined}
      />
    ))}
  </div>
);

/**
 * Menu lateral do perfil.
 */
const ProfileMenu: React.FC = () => (
  <div style={{ width: 280 }}>
    {MENU_ITEMS.map((item) => (
      <ListItem
        key={item.id}
        size="sm"
        leading={<Icon name={item.icon} size="md" />}
        title={item.label}
        onClick={() => undefined}
      />
    ))}
    <ListItem
      size="sm"
      leading={<Icon name="settings" size="md" />}
      title="Configurações"
      onClick={() => undefined}
    />
  </div>
);

/**
 * Página de documentação rica do componente ListItem.
 */
const ListItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Listas"
      title="ListItem"
      description="Linha genérica de lista: avatar ou glifo à esquerda, título com subtítulo e metadado, ação à direita. A linha de 64px serve às conversas e às sugestões de pessoas; a de 48px, ao menu do perfil. Interativa, ganha um fundo suave no hover, com raio de 12px."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Um componente, duas alturas, quatro slots."
    />
    <UnvDocGrid>
      <UnvDocCard icon="✉️" title="Conversas (md · 64px)">
        Avatar à esquerda, nome em <code>title-md</code>, prévia da mensagem em{' '}
        <code>label-md</code> e horário como metadado; a ação fica à direita.
      </UnvDocCard>
      <UnvDocCard icon="📋" title="Menu do perfil (sm · 48px)">
        Glifo de 24px e rótulo em <code>body-lg</code>, sem subtítulo. A linha toda é o alvo.
      </UnvDocCard>
      <UnvDocCard icon="🧱" title="Quatro slots">
        <code>leading</code>, <code>title</code> com <code>subtitle</code> e <code>meta</code>, e{' '}
        <code>trailing</code> cobrem as combinações do produto.
      </UnvDocCard>
      <UnvDocCard icon="♿" title="Semântica de botão">
        Com <code>onClick</code>, a linha vira um <code>&lt;button&gt;</code> com foco visível de
        2px. Sem ele, é um <code>&lt;div&gt;</code>; use <code>as</code> para trocar o elemento.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="ListItem"
      layout="Linha · 64px (md) e 48px (sm)"
      specs={[
        { label: 'Altura mínima', value: 'md: 64px · sm: 48px' },
        { label: 'Recuo lateral', value: '16px' },
        { label: 'Espaço entre slots', value: 'md: 12px · sm: 16px' },
        { label: 'Raio', value: '12px (0 em bordered)' },
        { label: 'Título', value: 'md: title-md 600 · sm: body-lg 400' },
        { label: 'Subtítulo e metadado', value: 'label-md · --unv-color-text-secondary' },
        { label: 'Hover', value: '--unv-color-fill-field' },
        { label: 'Foco', value: 'anel de 2px em --unv-color-action-primary' },
        { label: 'Fio (bordered)', value: '1px · --unv-color-border-subtle' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Linha transparente',
          detail:
            'a linha não pinta fundo: assenta no cartão, na folha ou na tela em que estiver. O hover é o único preenchimento, em --unv-color-fill-field, com raio de 12px.',
        },
        {
          subject: 'Altura de 64px na linha padrão',
          detail:
            'a linha md passou de 72px para 64px, o que cabe um avatar de 44px com folga; o alvo de toque continua acima de 44px.',
        },
        {
          subject: 'Hierarquia por cor',
          detail:
            'o título fica em text-primary e o subtítulo e o metadado em text-secondary (a prévia deixa de disputar peso com o nome).',
        },
        {
          subject: 'Fio só quando pedido',
          detail:
            'bordered desenha um fio de 1px em border-subtle e zera o raio, para o fio não curvar nas pontas. Por padrão as linhas se separam pelo espaço.',
        },
        {
          subject: 'Sem variante de cartão',
          detail:
            'para uma lista em cartão, envolva as linhas num contêiner com background-primary e --unv-radius-l; a linha continua transparente.',
        },
        {
          subject: 'Tema herdado',
          detail: 'theme deixou de ter padrão "light": sem a prop, herda data-unv-theme do contêiner.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UnvDocAnatomy
      zones={[
        { name: 'Slot inicial (leading)', role: 'Avatar ou glifo.', token: '--unv-color-icon-primary' },
        { name: 'Título', role: 'Uma linha, com reticências.', token: '--unv-font-title-md-* | --unv-font-body-lg-*' },
        { name: 'Subtítulo e metadado', role: 'Prévia e horário, alinhados pela linha de base.', token: '--unv-font-label-md-* · --unv-color-text-secondary' },
        { name: 'Slot final (trailing)', role: 'Ação, miniatura ou glifo.', token: '--unv-spacing-xs' },
        { name: 'Superfície interativa', role: 'Hover e foco da linha inteira.', token: '--unv-color-fill-field · --unv-color-action-primary' },
      ]}
    />
    <UnvDocStage label="Slots identificados" surface="primary" align="stretch" padding={8}>
      <ListItem
        leading={<Avatar src={unvAvatars.caioDev} alt="" size={44} ring="story" />}
        title="caioDev"
        subtitle="Tenha um ótimo dia, cara!"
        meta="· agora"
        trailing={<CameraAction />}
        onClick={() => undefined}
      />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As duas alturas, com e sem fio, nos dois temas."
    />
    <UnvDocStage label="Conversas · tema claro" surface="primary" align="stretch" padding={8}>
      <ConversationList />
    </UnvDocStage>
    <UnvDocStage label="Conversas · tema escuro" theme="dark" surface="primary" align="stretch" padding={8}>
      <ConversationList />
    </UnvDocStage>
    <UnvDocStage label="Menu do perfil · tema claro" surface="elevated" align="flex-start" padding={8}>
      <ProfileMenu />
    </UnvDocStage>
    <UnvDocStage label="Menu do perfil · tema escuro" theme="dark" surface="elevated" align="flex-start" padding={8}>
      <ProfileMenu />
    </UnvDocStage>
    <UnvDocStage label="Estados: repouso, interativa e não interativa" surface="primary" align="stretch" direction="column" gap={4} padding={8}>
      <ListItem
        leading={<Avatar src={unvAvatars.marinaLuz} alt="" size={44} />}
        title="Não interativa"
        subtitle="Sem onClick, é um div"
      />
      <ListItem
        leading={<Avatar src={unvAvatars.marinaLuz} alt="" size={44} />}
        title="Interativa"
        subtitle="Passe o mouse ou use Tab"
        onClick={() => undefined}
      />
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Usar a altura sm para linhas de um só texto e md quando houver subtítulo.',
        'Passar onClick (ou as="a" com href) em toda linha que navega.',
        'Manter título e subtítulo em uma linha; o excesso vira reticências.',
        'Dar aria-label ao trailing quando ele for só um glifo acionável.',
      ]}
      donts={[
        'Pintar o fundo da linha: ela assenta na camada de baixo.',
        'Combinar bordered com cartões de cantos arredondados.',
        'Colocar dois botões na mesma linha sem separá-los do alvo principal.',
        'Usar a linha como cabeçalho de seção (para isso, um título de grupo).',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Texto, hover e fio seguem os tokens do tema ativo."
    />
    <UnvDocThemeSwitcher surface="primary" padding={8}>
      {() => (
        <div style={{ width: '100%', maxWidth: 375 }}>
          {unvConversations.slice(0, 3).map((conversation, index) => (
            <ListItem
              key={conversation.id}
              leading={
          <AvatarSlot>
            <Avatar src={conversation.avatarSrc} alt="" size={44} ring={conversation.ring} />
          </AvatarSlot>
        }
              title={conversation.username}
              subtitle={conversation.message}
              meta={`· ${conversation.time}`}
              bordered={index < 2}
              onClick={() => undefined}
            />
          ))}
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UnvDocPropsTable
      title="ListItem"
      rows={[
        { name: 'leading', type: 'React.ReactNode', description: 'Avatar ou glifo à esquerda.' },
        { name: 'title', type: 'React.ReactNode', description: 'Título da linha. Obrigatório.' },
        { name: 'subtitle', type: 'React.ReactNode', description: 'Texto de apoio abaixo do título.' },
        { name: 'meta', type: 'React.ReactNode', description: 'Metadado ao final do subtítulo (ex.: "· 15 min").' },
        { name: 'trailing', type: 'React.ReactNode', description: 'Ação, miniatura ou glifo à direita.' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Altura da linha: 48px (sm) ou 64px (md).' },
        { name: 'bordered', type: 'boolean', default: 'false', description: 'Fio de 1px na base e raio zero.' },
        { name: 'onClick', type: '(event) => void', description: 'Torna a linha interativa e a renderiza como <button>.' },
        { name: 'as', type: 'React.ElementType', description: "Elemento raiz; padrão 'button' com onClick, 'div' sem." },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ListItem> = {
  title: 'Unoovista/Componentes/ListItem',
  component: ListItem,
  parameters: { layout: 'padded' },
  argTypes: {
    leading: {
      control: 'select',
      options: ['avatar', 'glifo', 'nenhum'],
      mapping: {
        avatar: <Avatar src={unvAvatars.caioDev} alt="" size={44} ring="story" />,
        glifo: <Icon name="archive" size="md" />,
        nenhum: undefined,
      },
      description: 'Slot inicial.',
    },
    title: { control: 'text', description: 'Título da linha.' },
    subtitle: { control: 'text', description: 'Subtítulo.' },
    meta: { control: 'text', description: 'Metadado ao final do subtítulo.' },
    trailing: {
      control: 'select',
      options: ['câmera', 'nenhum'],
      mapping: { câmera: <CameraAction />, nenhum: undefined },
      description: 'Slot final.',
    },
    size: { control: 'radio', options: ['sm', 'md'], description: 'Altura da linha.' },
    bordered: { control: 'boolean', description: 'Fio de 1px na base.' },
    onClick: { action: 'onClick', description: 'Torna a linha interativa.' },
    as: { control: 'text', description: 'Elemento raiz.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    leading: 'avatar' as never,
    title: 'caioDev',
    subtitle: 'Tenha um ótimo dia, cara!',
    meta: '· agora',
    trailing: 'câmera' as never,
    size: 'md',
    bordered: false,
  },
};

export default meta;

type Story = StoryObj<typeof ListItem>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ListItemDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ListItem',
  render: (args) => (
    <UnvDocStage surface="primary" align="stretch" width={375} padding={8} theme={args.theme}>
      <ListItem {...args} />
    </UnvDocStage>
  ),
};

/**
 * Caixa de mensagens: linhas de conversa com fio entre elas.
 */
export const ExemploConversas: Story = {
  name: '🎨 Exemplo da Caixa de Mensagens',
  render: () => (
    <UnvDocStage surface="secondary" align="stretch" direction="column" gap={0} padding={0} width={375}>
      <TopBar withStatusBarInset={false} title="Mensagens" />
      <div style={{ padding: '0 var(--unv-spacing-xs) var(--unv-spacing-xs)' }}>
        <ConversationList />
      </div>
    </UnvDocStage>
  ),
};

/**
 * Comparação das duas alturas suportadas.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <UnvDocStage label="md · 64px" surface="primary" align="stretch" padding={8} width={375}>
        <ListItem
          leading={<Avatar src={unvAvatars.marinaLuz} alt="" size={44} />}
          title="marinaLuz"
          subtitle="Ouvi dizer que esse filme é bom"
          meta="· agora"
        />
      </UnvDocStage>
      <UnvDocStage label="sm · 48px" surface="primary" align="stretch" padding={8} width={280}>
        <ListItem size="sm" leading={<Icon name="archive" size="md" />} title="Arquivo" />
      </UnvDocStage>
    </div>
  ),
};

/**
 * Menu lateral completo do perfil.
 */
export const MenuLateral: Story = {
  name: 'ComposicaoModular',
  render: () => (
    <UnvDocStage surface="elevated" align="flex-start" padding={8}>
      <ProfileMenu />
    </UnvDocStage>
  ),
};

/**
 * Estados: não interativa, interativa e com fio.
 */
export const Estados: Story = {
  render: () => (
    <UnvDocStage surface="primary" align="stretch" direction="column" gap={4} padding={8} width={375}>
      <ListItem leading={<Avatar src={unvAvatars.marinaLuz} alt="" size={44} />} title="Não interativa" subtitle="div" />
      <ListItem
        leading={<Avatar src={unvAvatars.marinaLuz} alt="" size={44} />}
        title="Interativa"
        subtitle="button"
        onClick={() => undefined}
      />
      <ListItem
        leading={<Avatar src={unvAvatars.marinaLuz} alt="" size={44} />}
        title="Com fio"
        subtitle="bordered"
        bordered
        onClick={() => undefined}
      />
    </UnvDocStage>
  ),
};
