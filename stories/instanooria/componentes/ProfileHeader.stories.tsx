import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProfileHeader } from '../../../src/instanooria/components/ProfileHeader';
import { Button } from '../../../src/instanooria/components/Button';
import { StoriesTray } from '../../../src/instanooria/components/StoriesTray';
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
import { instaAvatars, instaHighlightItems } from '../fixtures';

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
      badgeBrand="Instanooria"
      category="Componentes • Perfil"
      title="ProfileHeader"
      description="Bloco “Account Info” da tela de perfil: avatar de 80px com anel, as três estatísticas (publicações, seguidores e seguindo), o nome em negrito, a biografia com menções e o site, além da faixa de ações de largura total."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Identidade, números e ação em um único bloco."
    />
    <InstaDocGrid>
      <InstaDocCard icon="👤" title="Perfil próprio">
        Encerra com a ação secundária “Editar perfil” ocupando toda a largura, seguida da faixa de
        destaques.
      </InstaDocCard>
      <InstaDocCard icon="🤝" title="Perfil de terceiros">
        Encerra com duas ações lado a lado — “Seguir” primária e “Mensagem” secundária — dividindo o
        espaço igualmente.
      </InstaDocCard>
      <InstaDocCard icon="🔢" title="Estatísticas clicáveis">
        Com <code>onStatClick</code>, cada bloco vira um botão focável; sem ele, permanece estático e
        fora da ordem de tabulação.
      </InstaDocCard>
      <InstaDocCard icon="🔗" title="Biografia rica">
        A prop <code>bio</code> aceita nós React, permitindo menções e hashtags coloridas com{' '}
        <code>--insta-color-text-link</code>.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do frame Account Info do perfil."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2706"
      frameName="Instagram Profile → Account Info"
      specs={[
        { label: 'Bloco completo', value: '375 × 403px' },
        { label: 'Avatar', value: '80–86px' },
        { label: 'Valor da estatística', value: 'Title/Medium · 15px' },
        { label: 'Rótulo da estatística', value: 'Label/Medium · 13px' },
        { label: 'Botão de ação', value: '343 × 29px' },
        { label: 'Padding lateral', value: '15px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Três blocos empilhados: identidade, biografia e ações."
    />
    <InstaDocStage label="Bloco completo" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <ProfileHeader
          avatarSrc={instaAvatars.jacob_w}
          name="Jacob West"
          bio={
            <>
              Designer de produtos digitais <span style={{ color: '#3897F0' }}>@unooria</span>
              <br />
              Tudo é design.
            </>
          }
          website="unooria.com"
          stats={DEMO_STATS}
          actions={
            <Button variant="secondary" size="sm" block>
              Editar perfil
            </Button>
          }
        />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes"
      description="As duas configurações de ação presentes no arquivo."
    />
    <InstaDocStage label="Perfil próprio" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <ProfileHeader
          avatarSrc={instaAvatars.jacob_w}
          name="Jacob West"
          bio="Tudo é design."
          stats={DEMO_STATS}
          actions={
            <Button variant="secondary" size="sm" block>
              Editar perfil
            </Button>
          }
        />
        <StoriesTray items={instaHighlightItems} bordered={false} ariaLabel="Destaques" />
      </div>
    </InstaDocStage>

    <InstaDocStage label="Perfil de terceiros" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <ProfileHeader
          avatarSrc={instaAvatars.craig_love}
          avatarRing="story"
          name="Craig Love"
          bio="Fotografia de rua · Lisboa"
          website="craiglove.photo"
          stats={[
            { id: 'posts', value: '212', label: 'Publicações' },
            { id: 'followers', value: '18,4 mil', label: 'Seguidores' },
            { id: 'following', value: '389', label: 'Seguindo' },
          ]}
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
    </InstaDocStage>

    <InstaDocStage label="Sem biografia e sem ações" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <ProfileHeader
          avatarSrc={instaAvatars.zackjohn}
          avatarRing="none"
          stats={DEMO_STATS}
        />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de perfil verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Manter exatamente três estatísticas na ordem publicações, seguidores, seguindo.',
        'Formatar números grandes de forma abreviada antes de passá-los como value.',
        'Usar avatarRing="story" quando o perfil tiver story ativo.',
        'Colocar a ação primária "Seguir" à esquerda em perfis de terceiros.',
      ]}
      donts={[
        'Adicionar uma quarta estatística: a distribuição horizontal quebra.',
        'Colocar mais de duas ações na faixa inferior.',
        'Usar biografia com mais de quatro linhas.',
        'Tornar as estatísticas focáveis sem fornecer onStatClick.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Números, rótulos e biografia invertem juntos, preservando a hierarquia."
    />
    <InstaDocThemeSwitcher padding={0}>
      {(activeTheme) => (
        <div style={{ width: 375 }}>
          <ProfileHeader
            theme={activeTheme}
            avatarSrc={instaAvatars.jacob_w}
            name="Jacob West"
            bio={
              <>
                Designer de produtos digitais{' '}
                <span style={{ color: 'var(--insta-color-text-link)' }}>@unooria</span>
              </>
            }
            website="unooria.com"
            stats={DEMO_STATS}
            actions={
              <Button variant="secondary" size="sm" block theme={activeTheme}>
                Editar perfil
              </Button>
            }
          />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente ProfileHeader."
    />
    <InstaDocPropsTable
      title="ProfileHeader"
      rows={[
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do perfil.' },
        { name: 'initials', type: 'string', description: 'Iniciais exibidas sem avatar.' },
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
        { name: 'name', type: 'string', description: 'Nome completo exibido em negrito.' },
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
          type: 'InstaProfileStat[]',
          default: '[]',
          description: 'Estatísticas exibidas à direita do avatar.',
        },
        {
          name: 'onStatClick',
          type: '(stat: InstaProfileStat, index: number) => void',
          description: 'Callback ao selecionar uma estatística; torna os blocos focáveis.',
        },
        {
          name: 'actions',
          type: 'React.ReactNode',
          description: 'Ações exibidas abaixo da biografia, distribuídas igualmente.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
      ]}
    />
    <InstaDocPropsTable
      title="InstaProfileStat"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único da estatística.' },
        { name: 'value', type: 'React.ReactNode', description: 'Valor já formatado para exibição.' },
        { name: 'label', type: 'string', description: 'Rótulo da estatística.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ProfileHeader> = {
  title: 'Instanooria/Componentes/ProfileHeader',
  component: ProfileHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    avatarSrc: { control: 'text', description: 'URL do avatar do perfil.' },
    avatarRing: {
      control: 'radio',
      options: ['none', 'story', 'live', 'seen'],
      description: 'Anel aplicado ao avatar.',
    },
    avatarSize: {
      control: { type: 'range', min: 56, max: 120, step: 2 },
      description: 'Diâmetro do avatar em pixels.',
    },
    name: { control: 'text', description: 'Nome completo em negrito.' },
    website: { control: 'text', description: 'Endereço do site.' },
    stats: { control: 'object', description: 'Estatísticas exibidas.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    avatarSrc: instaAvatars.jacob_w,
    avatarRing: 'story',
    avatarSize: 80,
    name: 'Jacob West',
    website: 'unooria.com',
    stats: DEMO_STATS,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ProfileHeader>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
      <ProfileHeader
        {...args}
        bio="Designer de produtos digitais. Tudo é design."
        actions={
          <Button variant="secondary" size="sm" block theme={args.theme}>
            Editar perfil
          </Button>
        }
      />
    </div>
  ),
};

/**
 * Réplica do bloco Account Info do arquivo oficial do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <ProfileHeader
        avatarSrc={instaAvatars.jacob_w}
        name="Jacob West"
        bio={
          <>
            Designer de produtos digitais <span style={{ color: '#3897F0' }}>@pixsellz</span>
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
      <StoriesTray items={instaHighlightItems} bordered={false} ariaLabel="Destaques" />
    </div>
  ),
};

/**
 * Matriz de variantes de ação.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, width: 375 }}>
      <ProfileHeader
        avatarSrc={instaAvatars.jacob_w}
        name="Jacob West"
        bio="Tudo é design."
        stats={DEMO_STATS}
        actions={
          <Button variant="secondary" size="sm" block>
            Editar perfil
          </Button>
        }
      />
      <ProfileHeader
        avatarSrc={instaAvatars.craig_love}
        name="Craig Love"
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
      <ProfileHeader avatarSrc={instaAvatars.zackjohn} avatarRing="none" stats={DEMO_STATS} />
    </div>
  ),
};
