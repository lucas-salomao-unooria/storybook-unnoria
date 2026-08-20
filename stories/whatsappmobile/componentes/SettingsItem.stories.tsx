import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  WaDocGrid,
  WaDocCard,
  WaDocFigmaSpecs,
  WaDocDeviations,
  WaDocAnatomy,
  WaDocPractices,
  WaDocPropsTable,
  WaDocStage,
  WaDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { SettingsItem, waIconNames } from '../../../src/whatsappmobile';
import { waSettings } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente SettingsItem.
 */
const SettingsItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Listas"
      title="SettingsItem"
      description="Linha da tela Settings. Reproduz o glifo de 19px na calha de 41px, o título de 17px em --wa-color-text-settings e a descrição de 15px em --wa-color-text-settings-sub, com passo vertical de 72px e sem divisor entre linhas."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="⚙️" title="Sem divisores">
        Diferente das outras listas, a tela Settings não desenha divisores. A separação vem do passo
        vertical de 72px.
      </WaDocCard>
      <WaDocCard icon="🔑" title="Seis glifos dedicados">
        Chave, conversa, campainha, disco de armazenamento, ajuda e contatos, todos exportados do
        arquivo e registrados na biblioteca de ícones.
      </WaDocCard>
      <WaDocCard icon="🔄" title="Rotação preservada">
        O glifo de conversa é desenhado girado 180° no arquivo. A prop <code>iconRotate</code>{' '}
        reproduz isso sem duplicar vetor.
      </WaDocCard>
      <WaDocCard icon="📝" title="Descrição opcional">
        A linha &quot;Invite a friend&quot; não tem descrição no arquivo; a prop é opcional.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2691"
      frameName="Settings"
      specs={[
        { label: 'Passo vertical', value: '72 px' },
        { label: 'Calha do glifo', value: '41 px' },
        { label: 'Glifo', value: '19–20 px' },
        { label: 'Título', value: 'PT Sans 400 · 17px · #C5CED3' },
        { label: 'Descrição', value: 'PT Sans 400 · 15px · #8A9295' },
        { label: 'Divisor', value: 'nenhum' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Cores dos glifos',
          detail:
            'o arquivo pinta cada glifo com um cinza ligeiramente diferente (#979CA2, #9CA4A7, #95A0A6). O componente aplica --wa-color-icon-settings (#979CA2) a todos, uniformização deliberada de uma inconsistência de desenho; os outros dois valores seguem disponíveis como tokens.',
        },
        {
          subject: 'Traços internos do glifo de conversa',
          detail:
            'o vetor bi:chat-right-fill traz duas linhas com stroke #000000 embutido, mantidas literais no registro de ícones para não alterar o export.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Calha do glifo', role: 'Espaço de 41px que alinha todos os ícones.', token: 'padding-left 41px' },
        { name: 'Glifo', role: 'Ícone de 20px exportado do arquivo.', token: '--wa-color-icon-settings' },
        { name: 'Título', role: 'Nome da seção de configuração.', token: '--wa-font-body-lg-* · --wa-color-text-settings' },
        { name: 'Descrição', role: 'Resumo do que a seção contém.', token: '--wa-font-body-sm-* · --wa-color-text-settings-sub' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Réplica do frame oficial" />
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        {waSettings.map((item) => (
          <SettingsItem
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
            iconRotate={item.iconRotate}
          />
        ))}
      </ul>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Estados" />
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <SettingsItem icon="settingsAccount" title="Com descrição" description="Privacy, security, change number" />
        <SettingsItem icon="settingsInvite" title="Sem descrição" />
        <SettingsItem icon="settingsChats" title="Glifo girado 180°" description="Theme, wallpapers, chat history" iconRotate={180} />
        <SettingsItem icon="settingsHelp" title="Interativo" description="Recebe foco pelo teclado" onClick={() => undefined} />
      </ul>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Envolver as linhas em um <ul> e passar onClick para navegar.',
        'Manter a calha de 41px para que todos os glifos se alinhem.',
        'Usar iconRotate quando o arquivo desenha o glifo girado.',
        'Omitir a descrição quando o arquivo também a omite.',
      ]}
      donts={[
        'Adicionar divisores entre as linhas.',
        'Usar glifos de outra biblioteca para as seções de configuração.',
        'Reduzir o passo vertical abaixo dos 72px.',
        'Aplicar o tom de ícone de app bar (#FAFFFF) às linhas de configuração.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base']}>
      {() => (
        <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
          <SettingsItem icon="settingsAccount" title="Account" description="Privacy, security, change number" />
          <SettingsItem icon="settingsNotifications" title="Notifications" description="Message, group & call tones" />
        </ul>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="SettingsItem"
      rows={[
        { name: 'icon', type: 'WaIconName', description: 'Glifo exibido à esquerda. Obrigatório.' },
        { name: 'title', type: 'string', description: 'Título da linha. Obrigatório.' },
        { name: 'description', type: 'string', description: 'Descrição exibida abaixo do título.' },
        { name: 'iconRotate', type: 'number', default: '0', description: 'Rotação aplicada ao glifo, usada por settingsChats (180°).' },
        { name: 'onClick', type: '(event) => void', description: 'Quando informado, a linha vira um button focalizável.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SettingsItem> = {
  title: 'Whatsapp Mobile/Componentes/SettingsItem',
  component: SettingsItem,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: { control: 'select', options: waIconNames, description: 'Glifo exibido à esquerda.' },
    title: { control: 'text', description: 'Título da linha.' },
    description: { control: 'text', description: 'Descrição da linha.' },
    iconRotate: { control: { type: 'range', min: -180, max: 180, step: 1 }, description: 'Rotação do glifo.' },
  },
  args: {
    icon: 'settingsAccount',
    title: 'Account',
    description: 'Privacy, security, change number',
    iconRotate: 0,
  },
};

export default meta;

type Story = StoryObj<typeof SettingsItem>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SettingsItemDocumentationPage />,
};

/**
 * Playground com 100% das props do SettingsItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SettingsItem',
  render: (args) => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <SettingsItem {...args} />
      </ul>
    </WaDocStage>
  ),
};

/**
 * Réplica da lista completa do frame "Settings".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        {waSettings.map((item) => (
          <SettingsItem
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
            iconRotate={item.iconRotate}
          />
        ))}
      </ul>
    </WaDocStage>
  ),
};

/**
 * Estados com e sem descrição, girado e interativo.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <SettingsItem icon="settingsAccount" title="Com descrição" description="Privacy, security, change number" />
        <SettingsItem icon="settingsInvite" title="Sem descrição" />
        <SettingsItem icon="settingsChats" title="Glifo girado" description="Theme, wallpapers" iconRotate={180} />
        <SettingsItem icon="settingsHelp" title="Interativo" description="Recebe foco" onClick={() => undefined} />
      </ul>
    </WaDocStage>
  ),
};
