import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { ShareAction, SocialLogo } from '../../../src/tiktooria';
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
import { tikShareActions } from '../fixtures';

const meta: Meta<typeof ShareAction> = {
  title: 'Tik Tooria/Componentes/ShareAction',
  component: ShareAction,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    icon: {
      control: 'select',
      options: ['report', 'download', 'brokenHeart', 'duet', 'react', 'bookmarkMedium'],
    },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
  args: {
    label: 'Report',
    icon: 'report',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof ShareAction>;


const ShareActionDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Folha"
      title="ShareAction"
      description="Alvo da folha de compartilhamento: disco de 47px sobre rótulo de 11px. As ações do produto usam o disco cinza --tik-color-surface-action com um glifo em tom primário; os alvos de terceiros passam o próprio logotipo pelo slot media. O rótulo quebra em duas linhas quando necessário, como em “Not interested”."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="⚪" title="Disco cinza de 47px">
        <code>--tik-color-surface-action</code> (#E8E8E7) é usado exclusivamente aqui, distinto de qualquer outra superfície do arquivo.
      </TikDocCard>
      <TikDocCard icon="🔤" title="Rótulo de 11px">
        Regular 11 em <code>--tik-color-text-action</code> (#4E4F57), o único uso desse tom no arquivo.
      </TikDocCard>
      <TikDocCard icon="↩️" title="Duas linhas">
        “Not interested” e “Add to Favorites” quebram em duas linhas. A largura de 54px e a altura de linha de 13px reproduzem o arquivo.
      </TikDocCard>
      <TikDocCard icon="🏷️" title="Slot para logotipo">
        Os alvos de terceiros já trazem disco colorido próprio, por isso passam pelo slot <code>media</code> em vez de <code>icon</code>.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:863"
      frameName="Report — TikTok Share to"
      specs={[
        { label: 'Disco', value: '47px' },
        { label: 'Rótulo', value: 'Regular 11 · #4E4F57' },
        { label: 'Largura do alvo', value: '54px' },
        { label: 'Altura de linha', value: '13px' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Largura uniforme de 54px',
          detail:
            'no arquivo os alvos medem entre 47 e 54px, conforme o comprimento do rótulo. O componente fixa 54px, o que alinha os seis alvos em uma faixa regular sem mudar o disco.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'ausentes no arquivo. Foi acrescentado apenas anel de foco de 2px em --tik-color-brand-button.',
        },
        {
          subject: 'Rótulo de duas linhas por quebra natural',
          detail:
            'o arquivo usa dois nós de texto empilhados. O componente deixa a quebra ocorrer naturalmente dentro dos 54px, o que dá o mesmo resultado e funciona com rótulos localizados.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Disco', role: 'Círculo de 47px em cinza, ou logotipo próprio via slot media.', token: '--tik-action-circle · --tik-color-surface-action' },
        { name: 'Glifo', role: 'Ícone de ~21px centralizado no disco.', token: '--tik-color-icon-primary' },
        { name: 'Rótulo', role: 'Regular 11 centralizado, em até duas linhas.', token: '--tik-font-micro-* · --tik-color-text-action' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="As seis ações do produto — como no arquivo" surface="sheet" gap={20}>
      {tikShareActions.map((action) => (
        <ShareAction key={action.label} label={action.label} icon={action.icon} />
      ))}
    </TikDocStage>
    <TikDocStage label="Os seis alvos de terceiros" surface="sheet" gap={20}>
      <ShareAction label="WhatsApp" media={<SocialLogo brand="whatsapp" />} />
      <ShareAction label="WhatsApp status" media={<SocialLogo brand="whatsapp" />} />
      <ShareAction label="Message" media={<SocialLogo brand="message" size={49} />} />
      <ShareAction label="SMS" media={<SocialLogo brand="sms" size={49} />} />
      <ShareAction label="Messenger" media={<SocialLogo brand="messenger" />} />
      <ShareAction label="Instagram" media={<SocialLogo brand="instagram" size={49} />} />
    </TikDocStage>
    <TikDocStage label="Rótulo em duas linhas e estado desabilitado" surface="sheet" gap={20}>
      <ShareAction label="Not interested" icon="brokenHeart" />
      <ShareAction label="Add to Favorites" icon="bookmarkMedium" />
      <ShareAction label="Report" icon="report" disabled />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use icon para ações do produto e media para logotipos de terceiros.',
        'Mantenha os rótulos curtos: no máximo duas linhas dentro de 54px.',
        'Agrupe as ações em uma faixa e os terceiros em outra, separadas por um Separator de folha.',
      ]}
      donts={[
        'Não use o disco cinza atrás de um logotipo colorido.',
        'Não reaproveite --tik-color-surface-action fora da folha de compartilhamento.',
        'Não use o alvo sobre superfície imersiva.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['sheet', 'chrome']}>
      {() => (
        <>
          <ShareAction label="Report" icon="report" />
          <ShareAction label="Save video" icon="download" />
          <ShareAction label="WhatsApp" media={<SocialLogo brand="whatsapp" />} />
        </>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="ShareAction"
      rows={[
        {
          name: 'label',
          type: "React.ReactNode",
          description:
            'Rótulo sob o disco, em Regular 11. Quebra em duas linhas quando necessário.',
        },
        {
          name: 'icon',
          type: "TikIconName",
          description:
            'Glifo exibido dentro do disco cinza de 47px.',
        },
        {
          name: 'media',
          type: "React.ReactNode",
          description:
            'Conteúdo no lugar do disco — usado para logotipos, que já trazem o próprio disco colorido.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>",
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
  render: () => <ShareActionDocumentationPage />,
};

/**
 * Playground com 100% das props do ShareAction expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ShareAction',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 32,
        background: 'var(--tik-color-surface-sheet)',
      }}
    >
      <ShareAction {...args} />
    </div>
  ),
};

/**
 * Réplica visual das duas faixas da folha “Share to” do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        width: 414,
        padding: '20px 16px',
        background: 'var(--tik-color-surface-sheet)',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ShareAction label="WhatsApp" media={<SocialLogo brand="whatsapp" />} />
        <ShareAction label="WhatsApp status" media={<SocialLogo brand="whatsapp" />} />
        <ShareAction label="Message" media={<SocialLogo brand="message" size={49} />} />
        <ShareAction label="SMS" media={<SocialLogo brand="sms" size={49} />} />
        <ShareAction label="Messenger" media={<SocialLogo brand="messenger" />} />
        <ShareAction label="Instagram" media={<SocialLogo brand="instagram" size={49} />} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {tikShareActions.map((action) => (
          <ShareAction key={action.label} label={action.label} icon={action.icon} />
        ))}
      </div>
    </div>
  ),
};

/**
 * Ações do produto e alvos de terceiros.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 20,
        flexWrap: 'wrap',
        padding: 24,
        background: 'var(--tik-color-surface-sheet)',
      }}
    >
      {tikShareActions.map((action) => (
        <ShareAction key={action.label} label={action.label} icon={action.icon} />
      ))}
      <ShareAction label="WhatsApp" media={<SocialLogo brand="whatsapp" />} />
      <ShareAction label="Instagram" media={<SocialLogo brand="instagram" size={49} />} />
    </div>
  ),
};

/**
 * Repouso e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 24,
        padding: 24,
        background: 'var(--tik-color-surface-sheet)',
      }}
    >
      <ShareAction label="Repouso" icon="report" />
      <ShareAction label="Desabilitado" icon="report" disabled />
    </div>
  ),
};
