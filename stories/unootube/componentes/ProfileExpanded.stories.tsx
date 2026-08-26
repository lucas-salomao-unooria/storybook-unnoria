import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { ProfileExpanded } from '../../../src/unitube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocAnatomy,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { avatars } from '../fixtures';

const meta: Meta<typeof ProfileExpanded> = {
  title: 'Unitube/Componentes/ProfileExpanded',
  component: ProfileExpanded,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
    notificationCount: { control: { type: 'number', min: 0, max: 200 } },
    className: { control: 'text' },
    onCreate: { action: 'onCreate' },
    onApps: { action: 'onApps' },
    onNotifications: { action: 'onNotifications' },
    onProfile: { action: 'onProfile' },
  },
  args: {
    src: avatars.currentUser,
    alt: 'Perfil',
    initials: 'LS',
    notificationCount: 0,
  },
};

export default meta;

type Story = StoryObj<typeof ProfileExpanded>;

const ProfileExpandedDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Componentes • Navegação"
      title="ProfileExpanded"
      description="Reprodução do nó Navigation/ProfileExpanded (7:93): 204×40, formado por três alvos de ícone de 40px — criar, aplicativos e notificações — seguidos do perfil compacto de 60px, com 8px de intervalo entre eles. É o bloco que fecha a barra superior à direita."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Os quatro alvos do bloco direito."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🧮" title="204px por soma exata">
        Três alvos de 40px, três intervalos de 8px e um perfil de 60px somam exatamente 204. A
        medida do arquivo não é arbitrária — é o resultado da composição.
      </UniDocCard>
      <UniDocCard icon="🎬" title="Criar, aplicativos, notificações">
        Os três glifos são <code>create</code>, <code>apps</code> e <code>notifications</code>, nesta
        ordem da esquerda para a direita.
      </UniDocCard>
      <UniDocCard icon="⭕" title="Alvos circulares de 40px">
        Cada glifo de 24px fica em um alvo de 40px com recuo de 8px e raio total. O realce do hover
        é circular, não retangular.
      </UniDocCard>
      <UniDocCard icon="🔔" title="Selo de notificação opcional">
        Extensão da biblioteca: quando <code>notificationCount</code> é maior que zero, o alvo de
        notificações exibe um selo no vermelho semântico.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="7:93"
      frameName="Navigation/ProfileExpanded"
      specs={[
        { label: 'Dimensões', value: '204 × 40' },
        { label: 'Alvos de ícone', value: '3 × 40px · recuo 8' },
        { label: 'Intervalo', value: '8px' },
        { label: 'Perfil', value: '60 × 40' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Selo de notificação',
          detail:
            'o arquivo não publica contador. O selo foi acrescentado com --uni-color-brand-primary e o degrau Caption/Small, e o rótulo acessível do botão passa a incluir a contagem. Só aparece quando notificationCount é maior que zero.',
        },
        {
          subject: 'Elementos interativos',
          detail:
            'o arquivo publica quadros estáticos. Os três alvos viraram <button> com aria-label e realce circular no hover, porque cada um abre um menu distinto.',
        },
        {
          subject: 'Ordem preservada',
          detail:
            'no arquivo os quadros estão posicionados por coordenada (x = 0, 48, 96, 144), e a ordem no XML não corresponde à ordem visual. O componente segue a ordem visual: criar, aplicativos, notificações e perfil.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Alvo de criar',
          role: 'Botão circular de 40px com o glifo create.',
          token: '--uni-icon-button-size',
        },
        {
          name: 'Alvo de aplicativos',
          role: 'Botão circular de 40px com o glifo apps.',
          token: '--uni-icon-button-size',
        },
        {
          name: 'Alvo de notificações',
          role: 'Botão circular de 40px com o glifo notifications e o selo opcional.',
          token: '--uni-color-brand-primary',
        },
        {
          name: 'Perfil',
          role: 'ProfileCompact com o retrato do usuário.',
          token: '--uni-avatar-sm',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo" surface="secondary">
      <ProfileExpanded src={avatars.currentUser} />
    </UniDocStage>
    <UniDocStage label="Com contadores de notificação" surface="secondary" gap={32}>
      <ProfileExpanded src={avatars.currentUser} notificationCount={1} />
      <ProfileExpanded src={avatars.currentUser} notificationCount={42} />
      <ProfileExpanded src={avatars.currentUser} notificationCount={137} />
    </UniDocStage>
    <UniDocStage label="Sem retrato" surface="secondary">
      <ProfileExpanded initials="LS" notificationCount={5} />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Mantenha o intervalo de 8px entre os quatro alvos.',
        'Passe notificationCount apenas quando houver notificações reais.',
        'Ligue cada manipulador ao menu correspondente: os três alvos abrem painéis distintos.',
        'Preserve a ordem criar, aplicativos, notificações e perfil.',
      ]}
      donts={[
        'Não acrescente um quinto alvo: o bloco tem largura calculada de 204px.',
        'Não use o selo para números que não sejam contagem de notificação.',
        'Não remova os rótulos acessíveis dos botões somente ícone.',
        'Não substitua o realce circular por retangular.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O bloco sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['secondary', 'primary', 'deep']}>
      {() => <ProfileExpanded src={avatars.currentUser} notificationCount={7} />}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="ProfileExpanded"
      rows={[
        { name: 'src', type: 'string', description: 'Endereço do retrato do usuário.' },
        {
          name: 'alt',
          type: 'string',
          default: "'Perfil'",
          description: 'Rótulo acessível do botão de perfil.',
        },
        {
          name: 'initials',
          type: 'string',
          description: 'Iniciais exibidas quando src não é informado.',
        },
        {
          name: 'notificationCount',
          type: 'number',
          default: '0',
          description:
            'Quantidade de notificações não lidas. Maior que zero exibe o selo e inclui a contagem no rótulo acessível.',
        },
        { name: 'onCreate', type: '() => void', description: 'Chamado ao acionar criar vídeo.' },
        {
          name: 'onApps',
          type: '() => void',
          description: 'Chamado ao acionar a grade de aplicativos.',
        },
        {
          name: 'onNotifications',
          type: '() => void',
          description: 'Chamado ao acionar as notificações.',
        },
        { name: 'onProfile', type: '() => void', description: 'Chamado ao acionar o avatar.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Demais atributos são repassados ao elemento raiz.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ProfileExpandedDocumentationPage />,
};

/**
 * Playground com 100% das props do ProfileExpanded expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ProfileExpanded',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
        background: 'var(--uni-color-background-secondary)',
      }}
    >
      <ProfileExpanded {...args} />
    </div>
  ),
};

/**
 * Réplica visual do nó `Navigation/ProfileExpanded` (7:93), 204×40.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-secondary)' }}
    >
      <ProfileExpanded src={avatars.currentUser} />
    </div>
  ),
};

/**
 * Com e sem contador de notificação.
 */
export const Estados: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 32,
        background: 'var(--uni-color-background-secondary)',
      }}
    >
      <ProfileExpanded src={avatars.currentUser} />
      <ProfileExpanded src={avatars.currentUser} notificationCount={3} />
      <ProfileExpanded src={avatars.currentUser} notificationCount={128} />
      <ProfileExpanded initials="LS" />
    </div>
  ),
};
