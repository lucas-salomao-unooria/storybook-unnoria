import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ListItem } from '../../../src/instanooria/components/ListItem';
import { Avatar } from '../../../src/instanooria/components/Avatar';
import { Icon } from '../../../src/instanooria/components/Icon';
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
import { instaAvatars, instaConversations } from '../fixtures';

/**
 * Itens do menu lateral do perfil, extraídos do frame Profile Menu.
 */
const MENU_ITEMS = [
  { id: 'archive', label: 'Arquivo', icon: 'archive' as const },
  { id: 'activity', label: 'Sua atividade', icon: 'activity' as const },
  { id: 'nametag', label: 'Nametag', icon: 'nametag' as const },
  { id: 'saved', label: 'Salvos', icon: 'bookmark' as const },
  { id: 'close-friends', label: 'Melhores amigos', icon: 'closeFriends' as const },
  { id: 'discover', label: 'Descobrir pessoas', icon: 'discover' as const },
  { id: 'facebook', label: 'Abrir Facebook', icon: 'facebook' as const },
];

/**
 * Página de documentação rica do componente ListItem.
 */
const ListItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Listas"
      title="ListItem"
      description="Linha genérica de lista usada em três contextos do arquivo de design: as conversas da caixa de mensagens diretas (72px, avatar de 56px, prévia da mensagem e horário), os itens do menu lateral do perfil (48px, glifo de 24px e rótulo Body/Medium) e listas de sugestões de pessoas."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Um componente, duas alturas, quatro slots."
    />
    <InstaDocGrid>
      <InstaDocCard icon="✉️" title="Conversas (md · 72px)">
        Avatar de 56px à esquerda, nome em Title/Small, prévia da mensagem em Label/Medium, horário
        em texto secundário e atalho de câmera à direita.
      </InstaDocCard>
      <InstaDocCard icon="📋" title="Menu lateral (sm · 48px)">
        Glifo de 24px, rótulo em Body/Medium e nenhum subtítulo. Toda a linha é clicável.
      </InstaDocCard>
      <InstaDocCard icon="🧱" title="Quatro slots">
        <code>leading</code>, <code>title</code> + <code>subtitle</code> + <code>meta</code> e{' '}
        <code>trailing</code> cobrem todas as combinações do arquivo.
      </InstaDocCard>
      <InstaDocCard icon="🖱️" title="Interatividade opcional">
        Com <code>onClick</code>, a linha é renderizada como <code>&lt;button&gt;</code> com foco
        visível; sem ele, permanece um contêiner estático.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas dos frames Chat e Profile Menu."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2497"
      frameName="Instagram Direct Messages → Chat"
      specs={[
        { label: 'Altura md', value: '72px' },
        { label: 'Altura sm', value: '48px' },
        { label: 'Avatar da conversa', value: '56–64px' },
        { label: 'Padding lateral', value: '16px' },
        { label: 'Título', value: 'Title/Small · 14px' },
        { label: 'Prévia', value: 'Label/Medium · 13px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Os quatro slots identificados em uma linha de conversa."
    />
    <InstaDocStage label="Slots" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <ListItem
          leading={<Avatar src={instaAvatars.joshua_l} alt="" size={56} ring="story" />}
          title="joshua_l"
          subtitle="Tenha um ótimo dia, cara!"
          meta="· agora"
          trailing={<Icon name="camera" size={22} tone="secondary" />}
          onClick={() => undefined}
        />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Tamanhos"
      description="As duas alturas nos seus contextos reais."
    />
    <InstaDocStage label="Conversas (size md)" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        {instaConversations.slice(0, 4).map((conversation) => (
          <ListItem
            key={conversation.id}
            leading={
              <Avatar src={conversation.avatarSrc} alt="" size={56} ring={conversation.ring} />
            }
            title={conversation.username}
            subtitle={conversation.message}
            meta={`· ${conversation.time}`}
            trailing={<Icon name="camera" size={22} tone="secondary" />}
            onClick={() => undefined}
            bordered
          />
        ))}
      </div>
    </InstaDocStage>

    <InstaDocStage label="Menu lateral (size sm)" align="flex-start" padding={0}>
      <div style={{ width: 251, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        {MENU_ITEMS.map((item) => (
          <ListItem
            key={item.id}
            size="sm"
            leading={<Icon name={item.icon} size={24} />}
            title={item.label}
            onClick={() => undefined}
          />
        ))}
      </div>
    </InstaDocStage>

    <InstaDocStage label="Com ação à direita" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <ListItem
          leading={<Avatar src={instaAvatars.mis_potter} alt="" size={44} />}
          title="mis_potter"
          subtitle="Sugerido para você"
          trailing={<Button variant="primary" size="sm">Seguir</Button>}
          bordered
        />
        <ListItem
          leading={<Avatar src={instaAvatars.martini_rond} alt="" size={44} />}
          title="martini_rond"
          subtitle="Segue você"
          trailing={<Button variant="secondary" size="sm">Mensagem</Button>}
        />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de lista verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Usar size="md" para linhas com avatar e size="sm" para linhas de menu.',
        'Deixar o título e a prévia truncarem em uma linha, preservando o ritmo da lista.',
        'Colocar o horário no slot meta, que já aplica a cor secundária.',
        'Omitir bordered no último item da lista.',
      ]}
      donts={[
        'Colocar mais de uma ação no slot trailing.',
        'Permitir que o subtítulo quebre em várias linhas.',
        'Usar ListItem para itens de grade ou carrossel.',
        'Aninhar botões dentro de uma linha que já é clicável.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Superfície, divisor e texto secundário invertem simultaneamente."
    />
    <InstaDocThemeSwitcher padding={0}>
      {(activeTheme) => (
        <div style={{ width: 375 }}>
          {instaConversations.slice(0, 3).map((conversation) => (
            <ListItem
              key={conversation.id}
              theme={activeTheme}
              leading={
                <Avatar
                  src={conversation.avatarSrc}
                  alt=""
                  size={56}
                  ring={conversation.ring}
                  theme={activeTheme}
                />
              }
              title={conversation.username}
              subtitle={conversation.message}
              meta={`· ${conversation.time}`}
              trailing={<Icon name="camera" size={22} tone="secondary" theme={activeTheme} />}
              bordered
            />
          ))}
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente ListItem."
    />
    <InstaDocPropsTable
      title="ListItem"
      rows={[
        {
          name: 'leading',
          type: 'React.ReactNode',
          description: 'Conteúdo à esquerda: avatar ou glifo.',
        },
        { name: 'title', type: 'React.ReactNode', description: 'Título da linha. Obrigatório.' },
        {
          name: 'subtitle',
          type: 'React.ReactNode',
          description: 'Texto de apoio exibido abaixo do título.',
        },
        {
          name: 'meta',
          type: 'React.ReactNode',
          description: 'Metadado alinhado ao final do subtítulo, em cor secundária.',
        },
        {
          name: 'trailing',
          type: 'React.ReactNode',
          description: 'Conteúdo à direita: ação, miniatura ou glifo.',
        },
        {
          name: 'size',
          type: "'sm' | 'md'",
          default: "'md'",
          description: 'Altura mínima da linha: 48 ou 72px.',
        },
        {
          name: 'bordered',
          type: 'boolean',
          default: 'false',
          description: 'Exibe o divisor hairline na base da linha.',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent) => void',
          description: 'Quando informado, a linha vira um <button> acessível.',
        },
        {
          name: 'as',
          type: 'React.ElementType',
          description: 'Elemento HTML raiz renderizado.',
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

const meta: Meta<typeof ListItem> = {
  title: 'Instanooria/Componentes/ListItem',
  component: ListItem,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título da linha.' },
    subtitle: { control: 'text', description: 'Texto de apoio abaixo do título.' },
    meta: { control: 'text', description: 'Metadado em cor secundária.' },
    size: { control: 'radio', options: ['sm', 'md'], description: 'Altura da linha.' },
    bordered: { control: 'boolean', description: 'Exibe o divisor hairline na base.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    title: 'joshua_l',
    subtitle: 'Tenha um ótimo dia, cara!',
    meta: '· agora',
    size: 'md',
    bordered: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ListItem>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ListItemDocumentationPage />,
};

/**
 * Playground com todas as propriedades do ListItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ListItem',
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{
        width: 375,
        borderRadius: 12,
        border: '1px solid #E4E8E9',
        overflow: 'hidden',
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
      }}
    >
      <ListItem
        {...args}
        leading={
          args.size === 'sm' ? (
            <Icon name="archive" size={24} theme={args.theme} />
          ) : (
            <Avatar src={instaAvatars.joshua_l} alt="" size={56} ring="story" theme={args.theme} />
          )
        }
        trailing={<Icon name="camera" size={22} tone="secondary" theme={args.theme} />}
      />
    </div>
  ),
};

/**
 * Réplica da caixa de mensagens diretas do arquivo oficial do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      {instaConversations.map((conversation, index) => (
        <ListItem
          key={conversation.id}
          leading={<Avatar src={conversation.avatarSrc} alt="" size={56} ring={conversation.ring} />}
          title={conversation.username}
          subtitle={conversation.message}
          meta={`· ${conversation.time}`}
          trailing={<Icon name="camera" size={22} tone="secondary" />}
          bordered={index < instaConversations.length - 1}
          onClick={() => undefined}
        />
      ))}
    </div>
  ),
};

/**
 * Comparação das duas alturas suportadas.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <ListItem
          leading={<Avatar src={instaAvatars.karennne} alt="" size={56} />}
          title="karennne"
          subtitle="Ouvi dizer que esse filme é bom"
          meta="· agora"
        />
      </div>
      <div style={{ width: 251, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <ListItem size="sm" leading={<Icon name="archive" size={24} />} title="Arquivo" />
      </div>
    </div>
  ),
};

/**
 * Menu lateral completo do perfil.
 */
export const MenuLateral: Story = {
  name: 'ComposicaoModular',
  render: () => (
    <div style={{ width: 251, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      {MENU_ITEMS.map((item) => (
        <ListItem
          key={item.id}
          size="sm"
          leading={<Icon name={item.icon} size={24} />}
          title={item.label}
          onClick={() => undefined}
        />
      ))}
      <ListItem
        size="sm"
        leading={<Icon name="settings" size={24} />}
        title="Configurações"
        onClick={() => undefined}
      />
    </div>
  ),
};
