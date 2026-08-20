import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Avatar, Icon, ListRow, SocialLogo } from '../../../src/tiktooria';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocAnatomy,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocPropsTable,
  TikDocStage,
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';

const meta: Meta<typeof ListRow> = {
  title: 'Tik Tooria/Componentes/ListRow',
  component: ListRow,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    showChevron: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
  args: {
    label: 'Invite friends',
    showChevron: true,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof ListRow>;


const ListRowDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Listas"
      title="ListRow"
      description="Linha de 414×76 da tela “Find friends”. Difere do SettingsRow por acomodar um disco de 56px no lugar do glifo de 16px, o que eleva a altura da linha e desloca o rótulo para 84px a partir da borda."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="👥" title="Linha com avatar">
        Os 76px acomodam o disco de 56px com 10px de respiro acima e abaixo, medida literal do arquivo.
      </TikDocCard>
      <TikDocCard icon="🎨" title="Discos coloridos">
        “Invite friends” usa #ED7360 e “Find contacts” usa #67DDA0 — dois tokens exclusivos desta tela.
      </TikDocCard>
      <TikDocCard icon="🔗" title="Logotipo de terceiro">
        “Find Facebook friends” usa o logotipo do Facebook de 54px no lugar do disco colorido.
      </TikDocCard>
      <TikDocCard icon="↔️" title="Rótulo em 84px">
        O slot esquerdo tem 68px de largura, o que soma com a calha de 16px e alinha o rótulo em 84px.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:198"
      frameName="Row — TikTok Find Friends"
      specs={[
        { label: 'Dimensões', value: '414 × 76' },
        { label: 'Disco', value: '56px (Facebook: 54px)' },
        { label: 'Rótulo', value: 'Regular 15 em 84px' },
        { label: 'Divisa', value: 'centralizada verticalmente' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Estados de interação',
          detail:
            'ausentes no arquivo. Realce em --tik-color-surface-sheet e foco com anel de 2px em --tik-color-brand-button.',
        },
        {
          subject: 'Elemento button',
          detail:
            'no arquivo a linha é um frame. Foi promovida a <button>, já que as três linhas avançam para outra tela.',
        },
        {
          subject: 'Facebook a 54px',
          detail:
            'o logotipo do Facebook mede 54px e é recuado 17px, contra 56px e 16px dos outros dois discos. A diferença de 1px é do arquivo; o slot de 68px acomoda os dois sem deslocar o rótulo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Slot esquerdo', role: 'Coluna de 68px com o disco centralizado.', token: '--tik-avatar-lg' },
        { name: 'Rótulo', role: 'Regular 15 alinhado em 84px.', token: '--tik-font-body-* · --tik-color-text-primary' },
        { name: 'Divisa', role: 'Glifo chevron de 10,5px centralizado verticalmente.', token: 'glifo chevron' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="As três linhas de “Find friends”" surface="chrome" align="stretch" direction="column" width={414} gap={0}>
      <ListRow
        label="Invite friends"
        leading={
          <Avatar
            size="lg"
            background="var(--tik-color-avatar-invite)"
            icon={<Icon name="addAccountStroke" size={25} tone="onImmersive" />}
          />
        }
      />
      <ListRow
        label="Find contacts"
        leading={
          <Avatar
            size="lg"
            background="var(--tik-color-avatar-contacts)"
            icon={<Icon name="contacts" size={21} tone="onImmersive" />}
          />
        }
      />
      <ListRow
        label="Find Facebook friends"
        leading={<SocialLogo brand="facebook" size={54} />}
      />
    </TikDocStage>
    <TikDocStage label="Sem divisa e desabilitada" surface="chrome" align="stretch" direction="column" width={414} gap={0}>
      <ListRow label="Sem divisa" leading={<Avatar size="lg" />} showChevron={false} />
      <ListRow label="Desabilitada" leading={<Avatar size="lg" />} disabled />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use o ListRow quando o item tiver avatar ou logotipo; use o SettingsRow para glifos de 16px.',
        'Passe um Avatar ou um SocialLogo no slot leading.',
        'Mantenha o rótulo em uma linha.',
      ]}
      donts={[
        'Não use o ListRow para linhas de configuração — a altura de 76px quebra o ritmo da lista.',
        'Não acrescente borda ou sombra à linha.',
        'Não reaproveite os discos coloridos desta tela em outros componentes.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome', 'sheet']}>
      {() => (
        <div style={{ width: 414 }}>
          <ListRow
            label="Invite friends"
            leading={
              <Avatar
                size="lg"
                background="var(--tik-color-avatar-invite)"
                icon={<Icon name="addAccountStroke" size={25} tone="onImmersive" />}
              />
            }
          />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="ListRow"
      rows={[
        {
          name: 'label',
          type: "React.ReactNode",
          description:
            'Rótulo da linha, em Regular 15.',
        },
        {
          name: 'leading',
          type: "React.ReactNode",
          description:
            'Elemento à esquerda — no arquivo, sempre um disco de 56px. Aceita Avatar ou SocialLogo.',
        },
        {
          name: 'showChevron',
          type: "boolean",
          default: "true",
          description:
            'Exibe a divisa de avanço à direita.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "React.ButtonHTMLAttributes<HTMLButtonElement>",
          description:
            'Demais atributos são repassados ao <button>, incluindo onClick e disabled.',
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
  render: () => <ListRowDocumentationPage />,
};

/**
 * Playground com 100% das props do ListRow expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ListRow',
  render: (args) => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <ListRow
        {...args}
        leading={
          <Avatar
            size="lg"
            background="var(--tik-color-avatar-invite)"
            icon={<Icon name="addAccountStroke" size={25} tone="onImmersive" />}
          />
        }
      />
    </div>
  ),
};

/**
 * Réplica visual da tela “Find friends” do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <ListRow
        label="Invite friends"
        leading={
          <Avatar
            size="lg"
            background="var(--tik-color-avatar-invite)"
            icon={<Icon name="addAccountStroke" size={25} tone="onImmersive" />}
          />
        }
      />
      <ListRow
        label="Find contacts"
        leading={
          <Avatar
            size="lg"
            background="var(--tik-color-avatar-contacts)"
            icon={<Icon name="contacts" size={21} tone="onImmersive" />}
          />
        }
      />
      <ListRow label="Find Facebook friends" leading={<SocialLogo brand="facebook" size={54} />} />
    </div>
  ),
};

/**
 * Variações de conteúdo do slot esquerdo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <ListRow label="Com disco colorido" leading={<Avatar size="lg" background="var(--tik-color-avatar-invite)" icon={<Icon name="addAccountStroke" size={25} tone="onImmersive" />} />} />
      <ListRow label="Com logotipo" leading={<SocialLogo brand="whatsapp" size={54} />} />
      <ListRow label="Com reserva de mídia" leading={<Avatar size="lg" />} />
      <ListRow label="Sem elemento à esquerda" />
      <ListRow label="Sem divisa" leading={<Avatar size="lg" />} showChevron={false} />
    </div>
  ),
};

/**
 * Estados interativos.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <ListRow label="Repouso" leading={<Avatar size="lg" />} />
      <ListRow label="Desabilitada" leading={<Avatar size="lg" />} disabled />
    </div>
  ),
};
