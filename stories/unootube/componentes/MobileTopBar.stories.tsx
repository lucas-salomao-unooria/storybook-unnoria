import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { MobileTopBar, TopMenuBar } from '../../../src/unootube';
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
  UniDocThemeSwitcher,
} from '../../../.storybook/components';
import { avatars, categories } from '../fixtures';

const SHORTS_FILE =
  'https://www.figma.com/design/FlqnnoY0Mqdjic53twLAC1/Free-YouTube-Shorts-Mockups--Community-';

const meta: Meta<typeof MobileTopBar> = {
  title: 'Unootube/Componentes/MobileTopBar',
  component: MobileTopBar,
  parameters: { layout: 'padded' },
  argTypes: {
    avatarSrc: { control: 'text' },
    avatarInitials: { control: 'text' },
    className: { control: 'text' },
    onCast: { action: 'onCast' },
    onNotifications: { action: 'onNotifications' },
    onSearch: { action: 'onSearch' },
    onProfile: { action: 'onProfile' },
  },
  args: {
    avatarSrc: avatars.currentUser,
  },
};

export default meta;

type Story = StoryObj<typeof MobileTopBar>;

const Phone: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ width: 390, maxWidth: '100%' }}>{children}</div>
);

const MobileTopBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Navegação"
      title="MobileTopBar"
      description="Reprodução da barra superior das telas móveis do arquivo Free YouTube Shorts Mockups (Community) (1:201): a marca à esquerda e quatro alvos de 24px à direita, com 12px entre eles. É o primeiro componente de navegação móvel da biblioteca, que até então só publicava o cromo de 1440px."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Quatro alvos, e a conferência que evitou duplicar dois glifos."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="📱" title="O cromo que faltava">
        A biblioteca nasceu do arquivo de 1440px e só tinha <code>TopBar</code>. Esta é a barra
        equivalente nas telas de 390 e 360px, com marca, transmissão, notificações, busca e perfil.
      </UniDocCard>
      <UniDocCard icon="🔍" title="Glifos conferidos, não reexportados">
        A lupa e o sino do arquivo de Shorts são o <strong>mesmo vetor</strong> de{' '}
        <code>search</code> e <code>notifications</code>, apenas exportados no contorno justo do nó.
        A conferência caminho a caminho está anotada no registro de ícones.
      </UniDocCard>
      <UniDocCard icon="📡" title="Transmitir é novo">
        O glifo <code>cast</code> — quatro caminhos com regra par-ímpar — não tem equivalente no
        arquivo original e entrou no registro.
      </UniDocCard>
      <UniDocCard icon="🎛️" title="Ações por composição">
        A prop <code>actions</code> substitui o conjunto inteiro, e <code>filters</code> encaixa uma
        faixa de pílulas abaixo da barra.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="1:201"
      frameName="Frame 23"
      fileUrl={SHORTS_FILE}
      specs={[
        { label: 'Dimensões', value: '390 × 50' },
        { label: 'Recuos', value: '10 em cima · 13 embaixo · 12 à esquerda · 15 à direita' },
        { label: 'Marca', value: '90 × 20' },
        { label: 'Alvos', value: '24px · 12px entre eles' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Faixa de filtros recolhida',
          detail:
            'o arquivo desenha a régua de pílulas abaixo da barra (node 1:219) com altura zero e recorte — ou seja, recolhida. O componente a expõe como slot filters, para que o produto decida quando exibi-la, composta com TopMenuBar.',
        },
        {
          subject: 'Pílula móvel com raio de 4px',
          detail:
            'a pílula "Explore" da faixa recolhida usa raio de 4px (node 1:220), um degrau ausente da coleção Radius do arquivo original. Foi tokenizado como --uni-radius-control.',
        },
        {
          subject: 'Retrato como bitmap',
          detail:
            'o arquivo cola uma fotografia no alvo do perfil (node 1:217). Nenhuma foi redistribuída: o retrato entra por avatarSrc.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'o arquivo é estático. Hover e foco foram acrescentados como redução de opacidade e anel de foco em tokens da própria marca.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        { name: 'Marca', role: 'Logo de 90×20 à esquerda.', token: '--uni-color-text-primary' },
        {
          name: 'Alvos',
          role: 'Transmitir, notificações, busca e perfil, com 12px entre eles.',
          token: '--uni-spacing-12',
        },
        {
          name: 'Perfil',
          role: 'Retrato de 24px, o menor diâmetro da escala.',
          token: '--uni-avatar-xs',
        },
        {
          name: 'Faixa de filtros',
          role: 'Slot abaixo da barra. Componha com TopMenuBar.',
          token: '--uni-spacing-10',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: 390px" surface="secondary" align="stretch" padding={0}>
      <Phone>
        <MobileTopBar avatarSrc={avatars.currentUser} />
      </Phone>
    </UniDocStage>
    <UniDocStage label="Sem retrato, com iniciais" surface="secondary" align="stretch" padding={0}>
      <Phone>
        <MobileTopBar avatarInitials="LS" />
      </Phone>
    </UniDocStage>
    <UniDocStage label="Com a faixa de filtros" surface="secondary" align="stretch" padding={0}>
      <Phone>
        <MobileTopBar
          avatarSrc={avatars.currentUser}
          filters={
            <TopMenuBar options={categories.slice(0, 6)} activeId="all" showOverflow={false} />
          }
        />
      </Phone>
    </UniDocStage>
    <UniDocStage label="Largura do Android: 360px" surface="secondary" align="stretch" padding={0}>
      <div style={{ width: 360, maxWidth: '100%' }}>
        <MobileTopBar avatarSrc={avatars.currentUser} />
      </div>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use esta barra nas telas móveis e a TopBar nas de 1440px — são cromos de arquivos diferentes.',
        'Componha a faixa de filtros com TopMenuBar em vez de montar pílulas soltas.',
        'Informe avatarSrc ou avatarInitials: o alvo do perfil nunca deve renderizar vazio.',
        'Substitua o conjunto inteiro por actions quando o produto tiver outra combinação de alvos.',
      ]}
      donts={[
        'Não registre outro glifo de lupa ou de sino: os existentes são os mesmos vetores.',
        'Não empilhe mais de quatro alvos — a 360px eles começam a colidir com a marca.',
        'Não embuta o retrato no pacote; ele entra por prop.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="A barra é superfície de navegação e muda inteira com o tema. O valor claro (#F6F6F6) foi medido no nó 1:596."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher align="stretch">
      {() => (
        <Phone>
          <MobileTopBar avatarSrc={avatars.currentUser} />
        </Phone>
      )}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="MobileTopBar"
      rows={[
        {
          name: 'logo',
          type: 'React.ReactNode',
          description: 'Marca à esquerda. Sem ela, o Logo padrão é montado com 20px de altura.',
        },
        {
          name: 'onCast · onNotifications · onSearch · onProfile',
          type: '() => void',
          description: 'Manipuladores dos quatro alvos, na ordem em que o arquivo os desenha.',
        },
        {
          name: 'avatarSrc · avatarInitials',
          type: 'string',
          description: 'Retrato do perfil, ou as iniciais exibidas quando não há retrato.',
        },
        {
          name: 'actions',
          type: 'React.ReactNode',
          description: 'Substitui o conjunto inteiro de ações à direita.',
        },
        {
          name: 'filters',
          type: 'React.ReactNode',
          description: 'Faixa exibida abaixo da barra. Componha com TopMenuBar.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
          description: 'Demais atributos são repassados ao <header>.',
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
  render: () => <MobileTopBarDocumentationPage />,
};

/**
 * Playground com 100% das props do MobileTopBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do MobileTopBar',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-primary)' }}
    >
      <Phone>
        <MobileTopBar {...args} />
      </Phone>
    </div>
  ),
};

/**
 * Réplica visual do nó `1:201`, 390×50.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-primary)' }}
    >
      <Phone>
        <MobileTopBar avatarSrc={avatars.currentUser} />
      </Phone>
    </div>
  ),
};

/**
 * As duas larguras de dispositivo publicadas pelo arquivo.
 */
export const Tamanhos: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {[390, 360].map((width) => (
        <div key={width}>
          <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 8 }}>
            {width}px
          </div>
          <div style={{ width, maxWidth: '100%' }}>
            <MobileTopBar avatarSrc={avatars.currentUser} />
          </div>
        </div>
      ))}
    </div>
  ),
};
