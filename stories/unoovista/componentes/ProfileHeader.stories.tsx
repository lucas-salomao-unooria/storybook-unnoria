import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProfileHeader } from '../../../src/unoovista/components/ProfileHeader';
import { Button } from '../../../src/unoovista/components/Button';
import { StoriesTray } from '../../../src/unoovista/components/StoriesTray';
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
import { unvAvatars, unvHighlightItems } from '../fixtures';

const BAR = '#716C98';

/**
 * Estatísticas de demonstração do perfil.
 */
const DEMO_STATS = [
  { id: 'posts', value: '54', label: 'Publicações' },
  { id: 'followers', value: '834', label: 'Seguidores' },
  { id: 'following', value: '162', label: 'Seguindo' },
];

/**
 * Página de documentação rica do componente ProfileHeader.
 */
const ProfileHeaderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Perfil"
      title="ProfileHeader"
      description="Cabeçalho do perfil numa composição centralizada, em cartão de superfície primária: avatar grande no topo (com anel quando há história), nome com selo de conta oficial, biografia, site, três cartões-pílula de estatística lado a lado e as ações em largura total."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Identidade, números e ação em um único bloco."
    />
    <UnvDocGrid>
      <UnvDocCard icon="👤" title="Perfil próprio">
        Encerra com a ação secundária “Editar perfil” ocupando toda a largura, seguida da faixa de
        destaques.
      </UnvDocCard>
      <UnvDocCard icon="🤝" title="Perfil de terceiros">
        Encerra com duas ações lado a lado — “Seguir” primária e “Mensagem” secundária — dividindo o
        espaço igualmente.
      </UnvDocCard>
      <UnvDocCard icon="🔢" title="Estatísticas clicáveis">
        Com <code>onStatClick</code>, cada cartão-pílula vira um botão focável; sem ele, é só
        informação, fora da ordem de tabulação.
      </UnvDocCard>
      <UnvDocCard icon="✅" title="Conta oficial">
        Com <code>verified</code>, o selo de conta oficial acompanha o nome, na cor{' '}
        <code>--unv-color-brand-verified</code>.
      </UnvDocCard>
      <UnvDocCard icon="🔗" title="Biografia rica">
        A prop <code>bio</code> aceita nós React, permitindo menções e hashtags coloridas com{' '}
        <code>--unv-color-text-link</code>.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UnvDocSpecs
      component="ProfileHeader"
      layout="Cartão centralizado · coluna única"
      specs={[
        { label: 'Cartão', value: 'background-primary · radius-l' },
        { label: 'Avatar', value: '80px (xl) · anel de história' },
        { label: 'Cartão-pílula', value: 'background-tertiary · radius-xl' },
        { label: 'Valor da estatística', value: 'title-lg' },
        { label: 'Rótulo', value: 'caption-md · text-secondary' },
        { label: 'Ações', value: 'largura total · partes iguais' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Composição centralizada',
          detail:
            'as estatísticas deixaram de ficar à direita do avatar: o avatar abre a coluna, seguido de nome, biografia, site, os três cartões e as ações. O bloco vira um cartão de superfície primária com raio de 16px, sobre a tela secundária.',
        },
        {
          subject: 'Estatísticas em cartões-pílula',
          detail:
            'cada número fica em um cartão de raio de 24px em background-tertiary, com valor em title-lg e rótulo em text-secondary (7,1:1 no claro e 7,5:1 no escuro sobre o cartão; o valor em text-primary mede 13,1:1 e 10,4:1). Sem onStatClick os cartões são div, sem papel de botão; com ele, viram botões com anel de foco de 2px em action-primary.',
        },
        {
          subject: 'Prop verified (aditiva)',
          detail:
            'novo e opcional: exibe o selo de conta oficial (glifo verified de 16px, brand-verified, 3,6:1 no claro e 7,3:1 no escuro sobre o cartão) ao lado do nome. Sem ele, nada muda.',
        },
        {
          subject: 'Anel de história como squircle',
          detail:
            'o avatar com anel troca o círculo por um quadrado de cantos a 32%: além de diferenciar a cor do anel, a forma distingue quem tem história ativa para quem não distingue cor. Sem anel, o avatar segue circular.',
        },
        {
          subject: 'Tema herdado',
          detail:
            'theme é opcional e sem valor padrão: sem ele, o cabeçalho herda data-unv-theme do contêiner.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="As zonas do cabeçalho, de cima para baixo."
    />
    <UnvDocStage surface="secondary" align="flex-start" padding={24} gap={32}>
      <div style={{ width: 375 }}>
        <ProfileHeader
          avatarSrc={unvAvatars.lucasMar}
          name="Rafael Andrade"
          verified
          bio="Designer de produtos digitais. Tudo é design."
          website="unooria.com"
          stats={DEMO_STATS}
          actions={
            <Button variant="secondary" size="sm" block>
              Editar perfil
            </Button>
          }
        />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UnvDocAnatomy
          zones={[
            {
              name: 'Avatar',
              role: 'Avatar de 80px no topo, centralizado, com anel de história.',
              token: '--unv-avatar-xl · --unv-gradient-story',
            },
            {
              name: 'Nome e selo',
              role: 'Nome em title-lg e selo de conta oficial opcional.',
              token: '--unv-color-text-primary · --unv-color-brand-verified',
            },
            {
              name: 'Biografia e site',
              role: 'Texto centralizado; o site é um link em text-link.',
              token: '--unv-color-text-link',
            },
            {
              name: 'Cartões-pílula',
              role: 'Três estatísticas lado a lado, valor sobre rótulo.',
              token: '--unv-color-background-tertiary · --unv-radius-xl',
            },
            {
              name: 'Ações',
              role: 'Botões em largura total, distribuídos em partes iguais.',
              token: '--unv-spacing-xs',
            },
          ]}
        />
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Ações, anéis e tamanhos de avatar."
    />
    <UnvDocStage label="Ações: perfil próprio e de terceiros" surface="secondary" align="flex-start" padding={24}>
      <div style={{ width: 375 }}>
        <ProfileHeader
          avatarSrc={unvAvatars.lucasMar}
          name="Rafael Andrade"
          bio="Tudo é design."
          stats={DEMO_STATS}
          actions={
            <Button variant="secondary" size="sm" block>
              Editar perfil
            </Button>
          }
        />
      </div>
      <div style={{ width: 375 }}>
        <ProfileHeader
          avatarSrc={unvAvatars.biaRaiz}
          name="Marina Costa"
          bio="Fotografia de rua · Lisboa"
          stats={DEMO_STATS}
          actions={
            <>
              <Button variant="primary" size="sm">
                Seguir
              </Button>
              <Button variant="secondary" size="sm">
                Mensagem
              </Button>
            </>
          }
        />
      </div>
    </UnvDocStage>

    <UnvDocStage label="Anéis do avatar" surface="secondary" align="flex-start" padding={24}>
      {(['none', 'story', 'live', 'seen'] as const).map((ring) => (
        <div key={ring} style={{ width: 240 }}>
          <ProfileHeader
            avatarSrc={unvAvatars.theoAndrade}
            avatarRing={ring}
            avatarSize={64}
            name={`ring="${ring}"`}
            stats={DEMO_STATS}
          />
        </div>
      ))}
    </UnvDocStage>

    <UnvDocStage label="Estatísticas clicáveis" surface="secondary" align="flex-start" padding={24}>
      <div style={{ width: 375 }}>
        <ProfileHeader
          avatarSrc={unvAvatars.lucasMar}
          name="Rafael Andrade"
          stats={DEMO_STATS}
          onStatClick={() => undefined}
        />
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de composição do cabeçalho." />
    <UnvDocPractices
      dos={[
        'Manter as três estatísticas na mesma ordem: publicações, seguidores, seguindo.',
        'Formatar os valores antes de passá-los (54, 834, 1,2 mil).',
        'Usar ações em largura total: um botão sozinho ou dois em partes iguais.',
        'Ligar verified só para contas oficiais.',
        'Conservar o anel de história apenas quando houver história ativa.',
      ]}
      donts={[
        'Empurrar as estatísticas para o lado do avatar: a composição é centralizada.',
        'Empilhar mais de dois botões na faixa de ações.',
        'Reutilizar o cartão-pílula fora do perfil para informações que não sejam contagens.',
        'Trocar o fundo dos cartões por cor avulsa: eles vêm de background-tertiary.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O cartão, os cartões-pílula e o selo acompanham o tema."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={24}>
      {() => (
        <div style={{ width: 375 }}>
          <ProfileHeader
            avatarSrc={unvAvatars.lucasMar}
            name="Rafael Andrade"
            verified
            bio="Designer de produtos digitais. Tudo é design."
            website="unooria.com"
            stats={DEMO_STATS}
            actions={
              <>
                <Button variant="primary" size="sm">
                  Seguir
                </Button>
                <Button variant="secondary" size="sm">
                  Mensagem
                </Button>
              </>
            }
          />
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do componente ProfileHeader."
    />
    <UnvDocPropsTable
      title="ProfileHeader"
      rows={[
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do perfil.' },
        { name: 'initials', type: 'string', description: 'Iniciais exibidas quando não há avatar.' },
        {
          name: 'avatarRing',
          type: "'none' | 'story' | 'live' | 'seen'",
          default: "'story'",
          description: 'Anel aplicado ao avatar.',
        },
        {
          name: 'avatarSize',
          type: 'number',
          default: '80',
          description: 'Diâmetro do avatar em pixels.',
        },
        { name: 'name', type: 'string', description: 'Nome completo exibido em destaque.' },
        {
          name: 'verified',
          type: 'boolean',
          default: 'false',
          description: 'Exibe o selo de conta oficial ao lado do nome.',
        },
        {
          name: 'bio',
          type: 'React.ReactNode',
          description: 'Biografia. Aceita nós ricos para menções e links.',
        },
        { name: 'website', type: 'string', description: 'Endereço do site exibido como link.' },
        {
          name: 'websiteHref',
          type: 'string',
          description: 'URL de destino do site. Usa website quando ausente.',
        },
        {
          name: 'stats',
          type: 'UnvProfileStat[]',
          default: '[]',
          description: 'Estatísticas exibidas em cartões-pílula lado a lado.',
        },
        {
          name: 'onStatClick',
          type: '(stat: UnvProfileStat, index: number) => void',
          description: 'Callback ao selecionar uma estatística; transforma os cartões em botões.',
        },
        {
          name: 'actions',
          type: 'React.ReactNode',
          description: 'Ações em largura total, distribuídas igualmente.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Tema usado para resolver as variáveis de cor. Sem valor, herda o do contêiner.',
        },
      ]}
    />
    <UnvDocPropsTable
      title="UnvProfileStat"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único da estatística.' },
        { name: 'value', type: 'React.ReactNode', description: 'Valor já formatado para exibição.' },
        { name: 'label', type: 'string', description: 'Rótulo da estatística.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ProfileHeader> = {
  title: 'Unoovista/Componentes/ProfileHeader',
  component: ProfileHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    avatarSrc: { control: 'text', description: 'URL do avatar do perfil.' },
    initials: { control: 'text', description: 'Iniciais exibidas sem avatar.' },
    avatarRing: {
      control: 'radio',
      options: ['none', 'story', 'live', 'seen'],
      description: 'Anel aplicado ao avatar.',
    },
    avatarSize: {
      control: { type: 'range', min: 56, max: 120, step: 2 },
      description: 'Diâmetro do avatar em pixels.',
    },
    name: { control: 'text', description: 'Nome completo em destaque.' },
    verified: { control: 'boolean', description: 'Selo de conta oficial.' },
    bio: { control: 'text', description: 'Biografia.' },
    website: { control: 'text', description: 'Endereço do site.' },
    websiteHref: { control: 'text', description: 'URL de destino do site.' },
    stats: { control: 'object', description: 'Estatísticas exibidas.' },
    onStatClick: { control: false, description: 'Callback que torna os cartões clicáveis.' },
    actions: { control: false, description: 'Ações em largura total.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    avatarSrc: unvAvatars.lucasMar,
    avatarRing: 'story',
    avatarSize: 80,
    name: 'Rafael Andrade',
    verified: true,
    bio: 'Designer de produtos digitais. Tudo é design.',
    website: 'unooria.com',
    stats: DEMO_STATS,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ProfileHeader>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ProfileHeaderDocumentationPage />,
};

/**
 * Playground com todas as propriedades do ProfileHeader expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ProfileHeader',
  render: (args) => (
    <UnvDocStage theme={args.theme} surface="secondary" align="flex-start" padding={24}>
      <div style={{ width: 375 }}>
        <ProfileHeader
          {...args}
          actions={
            <Button variant="secondary" size="sm" block theme={args.theme}>
              Editar perfil
            </Button>
          }
        />
      </div>
    </UnvDocStage>
  ),
};

/**
 * Perfil completo: cabeçalho e faixa de destaques.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial: perfil com destaques',
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={24}>
      <div style={{ width: 375, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <ProfileHeader
          avatarSrc={unvAvatars.lucasMar}
          name="Rafael Andrade"
          verified
          bio={
            <>
              Designer de produtos digitais{' '}
              <span style={{ color: 'var(--unv-color-text-link)', fontWeight: 600 }}>@unooria</span>
              <br />
              Tudo é design.
            </>
          }
          stats={DEMO_STATS}
          actions={
            <Button variant="secondary" size="sm" block>
              Editar perfil
            </Button>
          }
        />
        <StoriesTray items={unvHighlightItems} bordered={false} ariaLabel="Destaques" />
      </div>
    </UnvDocStage>
  ),
};

/**
 * Matriz de variantes de ação.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={24} direction="column" gap={16}>
      <div style={{ width: 375 }}>
        <ProfileHeader
          avatarSrc={unvAvatars.lucasMar}
          name="Rafael Andrade"
          bio="Tudo é design."
          stats={DEMO_STATS}
          actions={
            <Button variant="secondary" size="sm" block>
              Editar perfil
            </Button>
          }
        />
      </div>
      <div style={{ width: 375 }}>
        <ProfileHeader
          avatarSrc={unvAvatars.biaRaiz}
          name="Marina Costa"
          bio="Fotografia de rua · Lisboa"
          stats={DEMO_STATS}
          actions={
            <>
              <Button variant="primary" size="sm">
                Seguir
              </Button>
              <Button variant="secondary" size="sm">
                Mensagem
              </Button>
            </>
          }
        />
      </div>
      <div style={{ width: 375 }}>
        <ProfileHeader avatarSrc={unvAvatars.theoAndrade} avatarRing="none" stats={DEMO_STATS} />
      </div>
    </UnvDocStage>
  ),
};

/**
 * Diâmetros do avatar.
 */
export const Tamanhos: Story = {
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" padding={24}>
      {[56, 80, 104].map((tamanho) => (
        <div key={tamanho} style={{ width: 260 }}>
          <ProfileHeader
            avatarSrc={unvAvatars.marinaLuz}
            avatarSize={tamanho}
            name={`${tamanho}px`}
            stats={DEMO_STATS}
          />
        </div>
      ))}
    </UnvDocStage>
  ),
};

/**
 * O cabeçalho nos dois temas, lado a lado.
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
          <div style={{ width: 340 }}>
            <ProfileHeader
              avatarSrc={unvAvatars.lucasMar}
              name="Rafael Andrade"
              verified
              bio="Designer de produtos digitais."
              stats={DEMO_STATS}
              actions={
                <>
                  <Button variant="primary" size="sm">
                    Seguir
                  </Button>
                  <Button variant="secondary" size="sm">
                    Mensagem
                  </Button>
                </>
              }
            />
          </div>
        </UnvDocStage>
      ))}
    </div>
  ),
};
