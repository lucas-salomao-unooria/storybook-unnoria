import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NotificationItem } from '../../../src/instanooria/components/NotificationItem';
import { Button } from '../../../src/instanooria/components/Button';
import { Icon } from '../../../src/instanooria/components/Icon';
import { SegmentedTabs } from '../../../src/instanooria/components/SegmentedTabs';
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
import { instaAvatars, instaPhotos } from '../fixtures';

/**
 * Página de documentação rica do componente NotificationItem.
 */
const NotificationItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Atividade"
      title="NotificationItem"
      description="Linha da tela de atividade. Combina o avatar do autor, a frase com o nome de usuário em negrito, o tempo decorrido em cinza e, à direita, a miniatura da publicação relacionada ou um botão de ação como “Seguir” e “Mensagem”."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Uma linha, três formatos de encerramento."
    />
    <InstaDocGrid>
      <InstaDocCard icon="❤️" title="Curtida ou comentário">
        Encerra com a miniatura quadrada de 44px da publicação, permitindo reconhecer o conteúdo sem
        abrir a notificação.
      </InstaDocCard>
      <InstaDocCard icon="👤" title="Novo seguidor">
        Encerra com o botão “Seguir” (primário) ou “Mensagem” (secundário), transformando a
        notificação em ponto de ação.
      </InstaDocCard>
      <InstaDocCard icon="💬" title="Menção com resposta">
        O slot <code>footer</code> acomoda a ação “Responder” logo abaixo do texto, como no frame
        “This Week” do arquivo.
      </InstaDocCard>
      <InstaDocCard icon="🕐" title="Tempo integrado à frase">
        O horário não é uma coluna separada: ele fecha a frase em cor secundária, mantendo a leitura
        contínua.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do frame Instagram Likes."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2334"
      frameName="Instagram Likes → New / Today / This Week"
      specs={[
        { label: 'Avatar', value: '40px' },
        { label: 'Miniatura', value: '44 × 44px' },
        { label: 'Texto', value: 'Label/Medium · 13px' },
        { label: 'Nome de usuário', value: 'Label/Large · 590' },
        { label: 'Padding lateral', value: '15px' },
        { label: 'Botão de ação', value: 'sm · 30px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Avatar, bloco de texto com nome em negrito e slot de encerramento."
    />
    <InstaDocStage label="Estrutura" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <NotificationItem
          avatarSrc={instaAvatars.karennne}
          username="karennne"
          action="curtiu sua foto."
          timestamp="1h"
          thumbnailSrc={instaPhotos.mountains}
          thumbnailAlt="Montanhas"
        />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes"
      description="Os três formatos de encerramento presentes no arquivo."
    />
    <InstaDocStage label="Com miniatura" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <NotificationItem
          avatarSrc={instaAvatars.kieron_d}
          username="kiero_d, zackjohn"
          action="e mais 26 pessoas curtiram sua foto."
          timestamp="3h"
          thumbnailSrc={instaPhotos.forest}
          thumbnailAlt="Floresta"
        />
      </div>
    </InstaDocStage>

    <InstaDocStage label="Com botão de ação" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <NotificationItem
          avatarSrc={instaAvatars.martini_rond}
          username="martini_rond"
          action="começou a seguir você."
          timestamp="3d"
          trailing={<Button variant="secondary" size="sm">Mensagem</Button>}
        />
        <NotificationItem
          avatarSrc={instaAvatars.mis_potter}
          username="mis_potter"
          action="começou a seguir você."
          timestamp="3d"
          trailing={<Button variant="primary" size="sm">Seguir</Button>}
        />
      </div>
    </InstaDocStage>

    <InstaDocStage label="Com menção e ação de resposta" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <NotificationItem
          avatarSrc={instaAvatars.craig_love}
          avatarRing="story"
          username="craig_love"
          action={
            <>
              mencionou você em um comentário: <span style={{ color: '#3897F0' }}>@jacob_w</span>{' '}
              exatamente 👏
            </>
          }
          timestamp="2d"
          thumbnailSrc={instaPhotos.city}
          thumbnailAlt="Cidade"
          footer={
            <>
              <Icon name="heart" size={14} />
              Responder
            </>
          }
        />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de atividade verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Agrupar notificações por período (Novas, Hoje, Esta semana, Este mês).',
        'Usar o botão primário "Seguir" apenas quando a ação ainda não foi executada.',
        'Sempre encerrar a frase com o tempo decorrido em cor secundária.',
        'Descrever a miniatura em thumbnailAlt para leitores de tela.',
      ]}
      donts={[
        'Colocar miniatura e botão simultaneamente na mesma linha.',
        'Usar o avatar com anel de story quando o autor não tiver story ativo.',
        'Escrever frases longas que ocupem mais de três linhas.',
        'Repetir o nome de usuário no texto e no slot de ação.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="O texto principal e o secundário invertem preservando a hierarquia da frase."
    />
    <InstaDocThemeSwitcher padding={0}>
      {(activeTheme) => (
        <div style={{ width: 375 }}>
          <NotificationItem
            theme={activeTheme}
            avatarSrc={instaAvatars.karennne}
            username="karennne"
            action="curtiu sua foto."
            timestamp="1h"
            thumbnailSrc={instaPhotos.mountains}
            thumbnailAlt="Montanhas"
          />
          <NotificationItem
            theme={activeTheme}
            avatarSrc={instaAvatars.mis_potter}
            username="mis_potter"
            action="começou a seguir você."
            timestamp="3d"
            trailing={
              <Button variant="primary" size="sm" theme={activeTheme}>
                Seguir
              </Button>
            }
          />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente NotificationItem."
    />
    <InstaDocPropsTable
      title="NotificationItem"
      rows={[
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do autor da atividade.' },
        { name: 'initials', type: 'string', description: 'Iniciais exibidas sem avatar.' },
        {
          name: 'avatarRing',
          type: "'none' | 'story' | 'live' | 'seen'",
          default: "'none'",
          description: 'Anel aplicado ao avatar.',
        },
        {
          name: 'username',
          type: 'string',
          description: 'Nome de usuário exibido em negrito no início da frase.',
        },
        {
          name: 'action',
          type: 'React.ReactNode',
          description: 'Descrição da atividade. Aceita nós ricos para menções e links.',
        },
        { name: 'timestamp', type: 'string', description: 'Tempo decorrido ("3h", "2d").' },
        {
          name: 'thumbnailSrc',
          type: 'string',
          description: 'URL da miniatura de 44px da publicação relacionada.',
        },
        {
          name: 'thumbnailAlt',
          type: 'string',
          default: "''",
          description: 'Texto alternativo da miniatura.',
        },
        {
          name: 'trailing',
          type: 'React.ReactNode',
          description: 'Ação à direita. Tem precedência sobre thumbnailSrc.',
        },
        {
          name: 'footer',
          type: 'React.ReactNode',
          description: 'Conteúdo adicional abaixo do texto, como a ação "Responder".',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent) => void',
          description: 'Quando informado, a linha vira um <button> acessível.',
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

const meta: Meta<typeof NotificationItem> = {
  title: 'Instanooria/Componentes/NotificationItem',
  component: NotificationItem,
  parameters: { layout: 'padded' },
  argTypes: {
    avatarSrc: { control: 'text', description: 'URL do avatar do autor.' },
    avatarRing: {
      control: 'radio',
      options: ['none', 'story', 'live', 'seen'],
      description: 'Anel aplicado ao avatar.',
    },
    username: { control: 'text', description: 'Nome de usuário em negrito.' },
    action: { control: 'text', description: 'Descrição da atividade.' },
    timestamp: { control: 'text', description: 'Tempo decorrido.' },
    thumbnailSrc: { control: 'text', description: 'URL da miniatura à direita.' },
    thumbnailAlt: { control: 'text', description: 'Texto alternativo da miniatura.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    avatarSrc: instaAvatars.karennne,
    avatarRing: 'none',
    username: 'karennne',
    action: 'curtiu sua foto.',
    timestamp: '1h',
    thumbnailSrc: instaPhotos.mountains,
    thumbnailAlt: 'Montanhas',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof NotificationItem>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <NotificationItemDocumentationPage />,
};

/**
 * Playground com todas as propriedades do NotificationItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do NotificationItem',
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
      <NotificationItem {...args} />
    </div>
  ),
};

/**
 * Réplica da tela de atividade do arquivo oficial do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <SegmentedTabs
        items={[
          { id: 'following', label: 'Seguindo' },
          { id: 'you', label: 'Você' },
        ]}
        activeId="you"
        ariaLabel="Atividade"
      />
      <div style={{ padding: '14px 15px 4px', fontSize: 15, fontWeight: 590, color: '#262626' }}>
        Novas
      </div>
      <NotificationItem
        avatarSrc={instaAvatars.karennne}
        username="karennne"
        action="curtiu sua foto."
        timestamp="1h"
        thumbnailSrc={instaPhotos.mountains}
        thumbnailAlt="Montanhas"
      />
      <div style={{ padding: '14px 15px 4px', fontSize: 15, fontWeight: 590, color: '#262626' }}>
        Hoje
      </div>
      <NotificationItem
        avatarSrc={instaAvatars.kieron_d}
        username="kiero_d, zackjohn"
        action="e mais 26 pessoas curtiram sua foto."
        timestamp="3h"
        thumbnailSrc={instaPhotos.forest}
        thumbnailAlt="Floresta"
      />
      <div style={{ padding: '14px 15px 4px', fontSize: 15, fontWeight: 590, color: '#262626' }}>
        Esta semana
      </div>
      <NotificationItem
        avatarSrc={instaAvatars.craig_love}
        avatarRing="story"
        username="craig_love"
        action={
          <>
            mencionou você em um comentário: <span style={{ color: '#3897F0' }}>@jacob_w</span>{' '}
            exatamente 👏
          </>
        }
        timestamp="2d"
        thumbnailSrc={instaPhotos.city}
        thumbnailAlt="Cidade"
        footer={
          <>
            <Icon name="heart" size={14} />
            Responder
          </>
        }
      />
      <NotificationItem
        avatarSrc={instaAvatars.martini_rond}
        username="martini_rond"
        action="começou a seguir você."
        timestamp="3d"
        trailing={<Button variant="secondary" size="sm">Mensagem</Button>}
      />
      <NotificationItem
        avatarSrc={instaAvatars.mis_potter}
        username="mis_potter"
        action="começou a seguir você."
        timestamp="3d"
        trailing={<Button variant="primary" size="sm">Seguir</Button>}
      />
    </div>
  ),
};

/**
 * Matriz completa de formatos de encerramento.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <NotificationItem
        avatarSrc={instaAvatars.karennne}
        username="karennne"
        action="curtiu sua foto."
        timestamp="1h"
        thumbnailSrc={instaPhotos.mountains}
        thumbnailAlt="Montanhas"
      />
      <NotificationItem
        avatarSrc={instaAvatars.mis_potter}
        username="mis_potter"
        action="começou a seguir você."
        timestamp="3d"
        trailing={<Button variant="primary" size="sm">Seguir</Button>}
      />
      <NotificationItem
        avatarSrc={instaAvatars.craig_love}
        avatarRing="story"
        username="craig_love"
        action="mencionou você em um comentário."
        timestamp="2d"
        footer={
          <>
            <Icon name="heart" size={14} />
            Responder
          </>
        }
      />
    </div>
  ),
};
