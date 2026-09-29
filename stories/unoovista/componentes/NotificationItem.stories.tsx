import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NotificationItem } from '../../../src/unoovista/components/NotificationItem';
import { Button } from '../../../src/unoovista/components/Button';
import { Icon } from '../../../src/unoovista/components/Icon';
import { SegmentedTabs } from '../../../src/unoovista/components/SegmentedTabs';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocCard,
  UnvDocGrid,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocStage,
  UnvDocThemeSwitcher,
  UnvDocPropsTable,
} from '../../../.storybook/components';
import { unvAvatars, unvPhotos } from '../fixtures';

const BAR = '#716C98';

/**
 * Cabeçalho de grupo ("Novas", "Hoje") usado só nas estórias.
 */
const GrupoTitulo: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      padding: '8px 4px 0',
      fontFamily: 'var(--unv-font-sans)',
      fontSize: 'var(--unv-font-title-md-size)',
      fontWeight: 600,
      color: 'var(--unv-color-text-primary)',
    }}
  >
    {children}
  </div>
);

/**
 * Lista de demonstração com os três formatos de encerramento.
 */
const ListaDemo: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => (
  <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <NotificationItem
      theme={theme}
      unread
      avatarSrc={unvAvatars.marinaLuz}
      username="camila.reis"
      action="curtiu sua foto."
      timestamp="1h"
      thumbnailSrc={unvPhotos.mountains}
      thumbnailAlt="Montanhas"
    />
    <NotificationItem
      theme={theme}
      avatarSrc={unvAvatars.paulaNeves}
      username="patricia.melo"
      action="começou a seguir você."
      timestamp="3d"
      trailing={
        <Button variant="primary" size="sm" theme={theme}>
          Seguir
        </Button>
      }
    />
    <NotificationItem
      theme={theme}
      avatarSrc={unvAvatars.biaRaiz}
      avatarRing="story"
      username="marina.costa"
      action="mencionou você em um comentário."
      timestamp="2d"
      footer={
        <>
          <Icon name="heart" size="sm" theme={theme} />
          Responder
        </>
      }
    />
  </div>
);

/**
 * Página de documentação rica do componente NotificationItem.
 */
const NotificationItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Atividade"
      title="NotificationItem"
      description="Linha da tela de atividade, num cartão suave de superfície primária: avatar do autor à esquerda, frase com o nome de usuário em negrito e o tempo decorrido, e, à direita, a miniatura da publicação relacionada ou um botão de ação como “Seguir” e “Mensagem”. Um ponto sobre o avatar marca as ainda não lidas."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma linha, três formatos de encerramento."
    />
    <UnvDocGrid>
      <UnvDocCard icon="❤️" title="Curtida ou comentário">
        Encerra com a miniatura quadrada de 44px da publicação, de cantos arredondados, permitindo
        reconhecer o conteúdo sem abrir a notificação.
      </UnvDocCard>
      <UnvDocCard icon="👤" title="Novo seguidor">
        Encerra com o botão “Seguir” (primário) ou “Mensagem” (secundário), transformando a
        notificação em ponto de ação.
      </UnvDocCard>
      <UnvDocCard icon="💬" title="Menção com resposta">
        O slot <code>footer</code> acomoda a ação “Responder” logo abaixo do texto.
      </UnvDocCard>
      <UnvDocCard icon="🔴" title="Ainda não lida">
        Com <code>unread</code>, um ponto de <code>--unv-color-brand-notification</code> marca o canto
        do avatar e o texto “Não lida” é lido por leitores de tela.
      </UnvDocCard>
      <UnvDocCard icon="🕐" title="Tempo integrado à frase">
        O horário não é uma coluna separada: ele fecha a frase em cor secundária, mantendo a leitura
        contínua.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UnvDocSpecs
      component="NotificationItem"
      layout="Linha em cartão · raio 12px"
      specs={[
        { label: 'Cartão', value: 'background-primary · radius-m' },
        { label: 'Recuo', value: '--unv-spacing-m (12px)' },
        { label: 'Avatar', value: '40px' },
        { label: 'Texto', value: 'label-md · nome em label-lg' },
        { label: 'Miniatura', value: '44px · radius-s' },
        { label: 'Ponto de não lida', value: '12px · brand-notification' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Cartão suave no lugar da linha de largura total',
          detail:
            'cada notificação é um cartão de superfície primária com raio de 12px, e o espaço entre elas vem do contêiner (a estória usa 8px). A lista respira sobre a tela secundária e não há divisor entre linhas.',
        },
        {
          subject: 'Prop unread (aditiva)',
          detail:
            'nova e opcional. O ponto de brand-notification fica no canto do avatar, com recorte na cor do cartão, e mede 4,74:1 sobre o cartão no tema claro e 6,53:1 no escuro. O ponto é decorativo (aria-hidden); o estado chega ao leitor de tela por um texto oculto “Não lida” (unreadLabel), no início da frase.',
        },
        {
          subject: 'Miniatura arredondada',
          detail:
            'a miniatura de 44px ganha raio de 8px, em linha com os blocos da grade de mídia. O tamanho é o do alvo de toque (--unv-touch-target).',
        },
        {
          subject: 'Realce ao passar o ponteiro',
          detail:
            'a linha clicável (com onClick) vira botão e, sob o ponteiro, troca para background-secondary; o foco por teclado é um anel de 2px em action-primary, com afastamento de 2px.',
        },
        {
          subject: 'Tema herdado',
          detail:
            'theme é opcional e sem valor padrão: sem ele, a linha herda data-unv-theme do contêiner.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Avatar, texto e encerramento."
    />
    <UnvDocStage surface="secondary" align="flex-start" padding={24} gap={32}>
      <ListaDemo />
      <div style={{ flex: '1 1 320px' }}>
        <UnvDocAnatomy
          zones={[
            {
              name: 'Avatar e ponto',
              role: 'Avatar de 40px, com anel opcional de história e ponto de não lida no canto.',
              token: '--unv-color-brand-notification',
            },
            {
              name: 'Texto',
              role: 'Nome de usuário em negrito, descrição da atividade e horário em texto secundário.',
              token: '--unv-font-label-md-size · --unv-color-text-secondary',
            },
            {
              name: 'Rodapé',
              role: 'Slot logo abaixo do texto, para ações como “Responder”.',
              token: 'prop footer',
            },
            {
              name: 'Encerramento',
              role: 'Miniatura de 44px da publicação ou um botão de ação (trailing).',
              token: '--unv-radius-s · prop trailing',
            },
          ]}
        />
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Formatos de encerramento e estados da linha."
    />
    <UnvDocStage label="Formatos de encerramento" surface="secondary" align="flex-start" padding={24}>
      <ListaDemo />
    </UnvDocStage>

    <UnvDocStage label="Lida e não lida" surface="secondary" align="flex-start" padding={24}>
      <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <NotificationItem
          unread
          avatarSrc={unvAvatars.daviNogueira}
          username="diego.nunes"
          action="comentou: “Que foto linda!”"
          timestamp="5min"
          thumbnailSrc={unvPhotos.forest}
          thumbnailAlt="Floresta"
        />
        <NotificationItem
          avatarSrc={unvAvatars.daviNogueira}
          username="diego.nunes"
          action="curtiu sua foto."
          timestamp="1d"
          thumbnailSrc={unvPhotos.forest}
          thumbnailAlt="Floresta"
        />
      </div>
    </UnvDocStage>

    <UnvDocStage label="Linha clicável (botão)" surface="secondary" align="flex-start" padding={24}>
      <div style={{ width: 375 }}>
        <NotificationItem
          avatarSrc={unvAvatars.marinaLuz}
          username="camila.reis"
          action="curtiu sua foto."
          timestamp="1h"
          thumbnailSrc={unvPhotos.mountains}
          thumbnailAlt="Montanhas"
          onClick={() => undefined}
        />
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso da linha." />
    <UnvDocPractices
      dos={[
        'Manter o nome de usuário no início da frase, em negrito.',
        'Usar a miniatura para atividades sobre uma publicação e o botão para atividades sobre pessoas.',
        'Ligar unread nas notificações novas e desligar depois da leitura.',
        'Espaçar as linhas no contêiner (8px), sem divisores.',
        'Descrever a miniatura em thumbnailAlt.',
      ]}
      donts={[
        'Colocar miniatura e botão na mesma linha: trailing tem precedência sobre a miniatura.',
        'Marcar como não lida apenas pela cor: o texto oculto “Não lida” é o que chega ao leitor de tela.',
        'Alongar a frase além de três linhas: o cartão perde o ritmo da lista.',
        'Trocar o fundo do cartão por cor avulsa: ele vem de background-primary.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Cartão, ponto e texto acompanham o tema."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={24}>
      {(activeTheme) => <ListaDemo theme={activeTheme} />}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do componente NotificationItem."
    />
    <UnvDocPropsTable
      title="NotificationItem"
      rows={[
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do autor da atividade.' },
        { name: 'initials', type: 'string', description: 'Iniciais exibidas sem avatar.' },
        {
          name: 'avatarRing',
          type: "'none' | 'story' | 'live' | 'seen'",
          default: "'none'",
          description: 'Anel aplicado ao avatar (indica história ativa do autor).',
        },
        { name: 'username', type: 'string', description: 'Nome de usuário em negrito, no início da frase.' },
        { name: 'action', type: 'React.ReactNode', description: 'Descrição da atividade.' },
        { name: 'timestamp', type: 'string', description: 'Tempo decorrido (“3h”, “2d”).' },
        { name: 'thumbnailSrc', type: 'string', description: 'URL da miniatura da publicação, à direita.' },
        { name: 'thumbnailAlt', type: 'string', default: "''", description: 'Texto alternativo da miniatura.' },
        {
          name: 'trailing',
          type: 'React.ReactNode',
          description: 'Ação à direita (botão “Seguir”, “Mensagem”). Tem precedência sobre a miniatura.',
        },
        {
          name: 'footer',
          type: 'React.ReactNode',
          description: 'Conteúdo abaixo do texto (ação “Responder”).',
        },
        {
          name: 'unread',
          type: 'boolean',
          default: 'false',
          description: 'Notificação não lida: ponto sobre o avatar e texto oculto para leitor de tela.',
        },
        {
          name: 'unreadLabel',
          type: 'string',
          default: "'Não lida'",
          description: 'Texto lido por leitores de tela quando unread está ligado.',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent) => void',
          description: 'Clique na linha. Com ele, a linha vira um botão.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Substitui a frase montada por username e action.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Tema usado para resolver as variáveis de cor. Sem valor, herda o do contêiner.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof NotificationItem> = {
  title: 'Unoovista/Componentes/NotificationItem',
  component: NotificationItem,
  parameters: { layout: 'padded' },
  argTypes: {
    avatarSrc: { control: 'text', description: 'URL do avatar do autor.' },
    initials: { control: 'text', description: 'Iniciais exibidas sem avatar.' },
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
    unread: { control: 'boolean', description: 'Notificação não lida.' },
    unreadLabel: { control: 'text', description: 'Texto de leitor de tela para não lida.' },
    trailing: { control: false, description: 'Ação à direita.' },
    footer: { control: false, description: 'Conteúdo abaixo do texto.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    avatarSrc: unvAvatars.marinaLuz,
    avatarRing: 'none',
    username: 'camila.reis',
    action: 'curtiu sua foto.',
    timestamp: '1h',
    thumbnailSrc: unvPhotos.mountains,
    thumbnailAlt: 'Montanhas',
    unread: true,
    unreadLabel: 'Não lida',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof NotificationItem>;

/**
 * Documentação rica e completa do componente.
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
    <UnvDocStage theme={args.theme} surface="secondary" align="flex-start" padding={24}>
      <div style={{ width: 375 }}>
        <NotificationItem {...args} />
      </div>
    </UnvDocStage>
  ),
};

/**
 * Tela de atividade: abas de escopo e grupos por período.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial: tela de atividade',
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={24}>
      <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SegmentedTabs
          items={[
            { id: 'following', label: 'Seguindo' },
            { id: 'you', label: 'Você' },
          ]}
          activeId="you"
          ariaLabel="Atividade"
        />
        <GrupoTitulo>Novas</GrupoTitulo>
        <NotificationItem
          unread
          avatarSrc={unvAvatars.marinaLuz}
          username="camila.reis"
          action="curtiu sua foto."
          timestamp="1h"
          thumbnailSrc={unvPhotos.mountains}
          thumbnailAlt="Montanhas"
        />
        <GrupoTitulo>Hoje</GrupoTitulo>
        <NotificationItem
          avatarSrc={unvAvatars.daviNogueira}
          username="diego.nunes, bruno.alves"
          action="e mais 26 pessoas curtiram sua foto."
          timestamp="3h"
          thumbnailSrc={unvPhotos.forest}
          thumbnailAlt="Floresta"
        />
        <GrupoTitulo>Esta semana</GrupoTitulo>
        <NotificationItem
          avatarSrc={unvAvatars.biaRaiz}
          avatarRing="story"
          username="marina.costa"
          action={
            <>
              mencionou você em um comentário:{' '}
              <span style={{ color: 'var(--unv-color-text-link)', fontWeight: 600 }}>@rafael</span>{' '}
              exatamente isso!
            </>
          }
          timestamp="2d"
          thumbnailSrc={unvPhotos.city}
          thumbnailAlt="Cidade"
          footer={
            <>
              <Icon name="heart" size="sm" />
              Responder
            </>
          }
        />
        <NotificationItem
          avatarSrc={unvAvatars.rafaRondon}
          username="leonardo.faria"
          action="começou a seguir você."
          timestamp="3d"
          trailing={
            <Button variant="secondary" size="sm">
              Mensagem
            </Button>
          }
        />
        <NotificationItem
          avatarSrc={unvAvatars.paulaNeves}
          username="patricia.melo"
          action="começou a seguir você."
          timestamp="3d"
          trailing={
            <Button variant="primary" size="sm">
              Seguir
            </Button>
          }
        />
      </div>
    </UnvDocStage>
  ),
};

/**
 * Matriz completa de formatos de encerramento.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={24}>
      <ListaDemo />
    </UnvDocStage>
  ),
};

/**
 * Lida, não lida e clicável.
 */
export const Estados: Story = {
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={24}>
      <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <NotificationItem
          unread
          avatarSrc={unvAvatars.marinaLuz}
          username="camila.reis"
          action="curtiu sua foto."
          timestamp="1h"
          thumbnailSrc={unvPhotos.mountains}
          thumbnailAlt="Montanhas"
        />
        <NotificationItem
          avatarSrc={unvAvatars.marinaLuz}
          username="camila.reis"
          action="curtiu sua foto."
          timestamp="1d"
          thumbnailSrc={unvPhotos.mountains}
          thumbnailAlt="Montanhas"
        />
        <NotificationItem
          avatarSrc={unvAvatars.marinaLuz}
          username="camila.reis"
          action="curtiu sua foto (linha clicável)."
          timestamp="2d"
          thumbnailSrc={unvPhotos.mountains}
          thumbnailAlt="Montanhas"
          onClick={() => undefined}
        />
      </div>
    </UnvDocStage>
  ),
};

/**
 * A lista nos dois temas, lado a lado.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UnvDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={tema}
          surface="secondary"
          padding={24}
        >
          <ListaDemo />
        </UnvDocStage>
      ))}
    </div>
  ),
};
