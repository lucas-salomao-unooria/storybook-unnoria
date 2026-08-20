import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { SectionLabel, Separator, SettingsRow } from '../../../src/tiktooria';
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
import { tikEditProfileRows, tikSettingsSections } from '../fixtures';

const meta: Meta<typeof SettingsRow> = {
  title: 'Tik Tooria/Componentes/SettingsRow',
  component: SettingsRow,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    icon: {
      control: 'select',
      options: [
        undefined,
        'accountStroke',
        'lock',
        'camera',
        'wallet',
        'share',
        'qrCode',
        'bell',
        'book',
        'umbrella',
        'accessibility',
        'drop',
        'pen',
        'question',
      ],
    },
    value: { control: 'text' },
    showChevron: { control: 'boolean' },
    trailingIcon: { control: 'select', options: [undefined, 'clipboard'] },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
  args: {
    label: 'Manage my account',
    icon: 'accountStroke',
    showChevron: true,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof SettingsRow>;


const SettingsRowDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Listas"
      title="SettingsRow"
      description="Linha de 414×52 das telas “Privacy and settings” e “Edit profile”. Reúne quatro zonas: glifo à esquerda a 16–19px da borda, rótulo em Regular 15, valor opcional alinhado à direita a 36px e divisa de avanço a 19,45px da borda direita. A linha não tem fio próprio nem sombra — a separação vem do Separator entre seções, exatamente como no arquivo."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="⚙️" title="Duas configurações de recuo">
        Com glifo, o rótulo alinha em 48px; sem glifo, em 16px. As duas existem no arquivo — a primeira em “Privacy and settings”, a segunda em “Edit profile”.
      </TikDocCard>
      <TikDocCard icon="🔤" title="Valor à direita">
        Regular 15 em <code>--tik-color-text-secondary</code>, recuado 36px da borda. Usado nas linhas de edição de perfil.
      </TikDocCard>
      <TikDocCard icon="📋" title="Glifo de ação alternativo">
        <code>trailingIcon</code> substitui a divisa, como na linha <code>tiktok.com@jacob_w</code>, que oferece copiar em vez de avançar.
      </TikDocCard>
      <TikDocCard icon="🫥" title="Sem fio próprio">
        A linha é plana. O fio entre grupos é responsabilidade do <code>Separator</code>.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:255"
      frameName="Row — TikTok Privacy and settings"
      specs={[
        { label: 'Dimensões', value: '414 × 52' },
        { label: 'Rótulo', value: 'Regular 15 · #161722' },
        { label: 'Recuo com glifo', value: '48px' },
        { label: 'Divisa', value: '5,8 × 10,5 a 19,45px da borda' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Estados de interação',
          detail:
            'o arquivo não descreve hover, foco nem desabilitado. O realce reaproveita --tik-color-surface-sheet, o foco usa anel de 2px em --tik-color-brand-button e o desabilitado aplica 40% de opacidade — todos com tokens da própria marca.',
        },
        {
          subject: 'Elemento button',
          detail:
            'no arquivo a linha é um frame com fundo branco. Foi promovida a <button> porque toda linha avança para outra tela; isso dá foco por teclado e papel correto.',
        },
        {
          subject: 'Glifos de tamanhos variados',
          detail:
            'os glifos das linhas medem entre 12,5 e 19,25px no arquivo. O componente os renderiza no degrau sm (16px de altura), preservando a proporção de cada viewBox — a diferença é sub-pixel na maioria dos casos.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Glifo', role: 'Coluna fixa de 48px com o ícone centralizado.', token: '--tik-row-inset · --tik-color-icon-default' },
        { name: 'Rótulo', role: 'Regular 15 ocupando o espaço restante.', token: '--tik-font-body-* · --tik-color-text-primary' },
        { name: 'Valor', role: 'Regular 15 alinhado à direita, em tom secundário.', token: '--tik-color-text-secondary' },
        { name: 'Divisa', role: 'Glifo chevron de 10,5px, ou trailingIcon no seu lugar.', token: 'glifo chevron' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Com glifo — “Privacy and settings”" surface="chrome" align="stretch" direction="column" width={414} gap={0}>
      {tikSettingsSections[0].rows.map((row) => (
        <SettingsRow key={row.label} label={row.label} icon={row.icon} />
      ))}
    </TikDocStage>
    <TikDocStage label="Sem glifo, com valor — “Edit profile”" surface="chrome" align="stretch" direction="column" width={414} gap={0}>
      {tikEditProfileRows.map((row) => (
        <SettingsRow key={row.label} label={row.label} value={row.value} />
      ))}
    </TikDocStage>
    <TikDocStage label="Glifo de ação no lugar da divisa" surface="chrome" align="stretch" direction="column" width={414} gap={0}>
      <SettingsRow label="" value="tiktok.com@jacob_w" showChevron={false} trailingIcon="clipboard" />
    </TikDocStage>
    <TikDocStage label="Estados" surface="chrome" align="stretch" direction="column" width={414} gap={0}>
      <SettingsRow label="Repouso" icon="bell" />
      <SettingsRow label="Desabilitada" icon="bell" disabled />
      <SettingsRow label="Sem divisa" icon="bell" showChevron={false} />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use icon nas telas de configuração e omita-o nas linhas de edição de perfil.',
        'Agrupe linhas com SectionLabel e separe grupos com Separator.',
        'Use trailingIcon quando a ação não for avançar de tela.',
        'Mantenha o rótulo curto: a linha não quebra em duas linhas no arquivo.',
      ]}
      donts={[
        'Não acrescente borda ou sombra à linha.',
        'Não use icon e trailingIcon para representar a mesma ação.',
        'Não coloque a linha sobre superfície imersiva.',
        'Não use a linha de 52px para conteúdo com avatar — para isso existe o ListRow de 76px.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome', 'sheet']}>
      {() => (
        <div style={{ width: 414 }}>
          <SettingsRow label="Manage my account" icon="accountStroke" />
          <SettingsRow label="Privacy and safety" icon="lock" />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="SettingsRow"
      rows={[
        {
          name: 'label',
          type: "React.ReactNode",
          description:
            'Rótulo da linha, em Regular 15.',
        },
        {
          name: 'icon',
          type: "TikIconName",
          description:
            'Glifo à esquerda. Quando informado, o rótulo recua 48px; quando omitido, 16px.',
        },
        {
          name: 'value',
          type: "React.ReactNode",
          description:
            'Valor alinhado à direita, em tom secundário.',
        },
        {
          name: 'showChevron',
          type: "boolean",
          default: "true",
          description:
            'Exibe a divisa de avanço à direita.',
        },
        {
          name: 'trailingIcon',
          type: "TikIconName",
          description:
            'Glifo de ação à direita, no lugar da divisa.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'>",
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
  render: () => <SettingsRowDocumentationPage />,
};

/**
 * Playground com 100% das props do SettingsRow expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SettingsRow',
  render: (args) => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <SettingsRow {...args} />
    </div>
  ),
};

/**
 * Réplica visual da tela “Privacy and settings” do Figma, com as três seções.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      {tikSettingsSections.map((section, index) => (
        <React.Fragment key={section.label}>
          {index > 0 && <Separator />}
          <SectionLabel>{section.label}</SectionLabel>
          {section.rows.map((row) => (
            <SettingsRow key={row.label} label={row.label} icon={row.icon} />
          ))}
        </React.Fragment>
      ))}
    </div>
  ),
};

/**
 * Réplica visual da tela “Edit profile” do Figma.
 */
export const ExemploEditProfile: Story = {
  name: '🎨 Exemplo Oficial — Edit profile',
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <SettingsRow label={tikEditProfileRows[0].label} value={tikEditProfileRows[0].value} />
      <SettingsRow label={tikEditProfileRows[1].label} value={tikEditProfileRows[1].value} />
      <SettingsRow label="" value="tiktok.com@jacob_w" showChevron={false} trailingIcon="clipboard" />
      <SettingsRow label={tikEditProfileRows[2].label} value={tikEditProfileRows[2].value} />
      <Separator />
      <SettingsRow label={tikEditProfileRows[3].label} value={tikEditProfileRows[3].value} />
      <SettingsRow label={tikEditProfileRows[4].label} value={tikEditProfileRows[4].value} />
    </div>
  ),
};

/**
 * Todas as combinações de zonas.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <SettingsRow label="Com glifo e divisa" icon="bell" />
      <SettingsRow label="Sem glifo, com valor" value="Jacob West" />
      <SettingsRow label="Com glifo e valor" icon="book" value="Português" />
      <SettingsRow label="Sem divisa" icon="wallet" showChevron={false} />
      <SettingsRow label="Com glifo de ação" value="tiktok.com@jacob_w" showChevron={false} trailingIcon="clipboard" />
    </div>
  ),
};

/**
 * Estados interativos.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <SettingsRow label="Repouso" icon="accountStroke" />
      <SettingsRow label="Desabilitada" icon="accountStroke" disabled />
      <SettingsRow label="Passe o cursor para ver o realce" icon="accountStroke" />
      <SettingsRow label="Navegue com Tab para ver o foco" icon="accountStroke" />
    </div>
  ),
};
