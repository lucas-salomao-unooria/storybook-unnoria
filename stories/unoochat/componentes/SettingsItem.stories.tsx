import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocAnatomy,
  UncDocPractices,
  UncDocPropsTable,
  UncDocStage,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import { SettingsItem, uncIconNames } from '../../../src/unoochat';
import { uncSettings } from '../fixtures';

const BAR = '#716C98';

/**
 * Lista completa de configurações, a partir do conteúdo de demonstração.
 */
const SettingsList: React.FC = () => (
  <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
    {uncSettings.map((item) => (
      <SettingsItem
        key={item.id}
        icon={item.icon}
        title={item.title}
        description={item.description}
      />
    ))}
  </ul>
);

/**
 * Página de documentação rica do componente SettingsItem.
 */
const SettingsItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Listas"
      title="SettingsItem"
      description="Linha da tela de configurações: glifo de 20px na calha de 41px, título de 16px em --unc-color-text-primary e descrição de 14px em --unc-color-text-secondary, com passo vertical mínimo de 72px e sem divisor entre linhas. Funciona nos temas claro e escuro."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="⚙️" title="Sem divisores">
        Diferente das outras listas, a tela de configurações não desenha divisores. A separação vem
        do passo vertical de 72px.
      </UncDocCard>
      <UncDocCard icon="🔑" title="Seis glifos dedicados">
        Chave, conversa, campainha, uso de dados, ajuda e convite, registrados como{' '}
        <code>settingsAccount</code>, <code>settingsChats</code>,{' '}
        <code>settingsNotifications</code>, <code>settingsStorage</code>,{' '}
        <code>settingsHelp</code> e <code>settingsInvite</code> (ligaduras <code>key</code>,{' '}
        <code>chat</code>, <code>notifications</code>, <code>data_usage</code>, <code>help</code> e{' '}
        <code>group_add</code>).
      </UncDocCard>
      <UncDocCard icon="🔄" title="Rotação reservada">
        A prop <code>iconRotate</code> continua existindo, mas nenhum glifo atual precisa dela: o
        glifo de conversa do Material Symbols já vem na orientação certa. Fica reservada para
        glifos futuros que exijam giro, sem duplicar o registro.
      </UncDocCard>
      <UncDocCard icon="📝" title="Descrição opcional">
        A linha “Convidar um amigo” não tem descrição; a prop é opcional.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="SettingsItem"
      layout="Linha · 72px"
      specs={[
        { label: 'Passo vertical', value: '72px (mínimo)' },
        { label: 'Calha do glifo', value: '41px' },
        { label: 'Glifo', value: 'caixa de 20px · --unc-color-icon-muted' },
        { label: 'Tom do glifo', value: '#475157 · #CBD4D6' },
        { label: 'Título', value: 'Open Sans 400 · 16px · --unc-color-text-primary' },
        { label: 'Descrição', value: 'Open Sans 400 · 14px · --unc-color-text-secondary' },
        { label: 'Divisor', value: 'nenhum' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Um só tom para todos os glifos',
          detail:
            'os seis glifos de configuração usam --unc-color-icon-muted (7,05:1 sobre a superfície e 8,13:1 sobre o canvas no claro). A distinção entre linhas vem do título, não da cor.',
        },
        {
          subject: 'Glifos substituídos por ligaduras do Material Symbols',
          detail:
            'a biblioteca é a da Plataforma Unooria (Material Symbols Rounded, peso 300). Os seis glifos são ligaduras da fonte; nenhum desenho foi criado nem trazido de outra biblioteca, e o uso de cada um está registrado em IconGlyphs.ts.',
        },
        {
          subject: 'iconRotate reservada',
          detail:
            'a prop foi mantida na API por compatibilidade e para glifos futuros, mas nenhum glifo atual a usa: settingsChats já não precisa de giro de 180°.',
        },
        {
          subject: 'Sem divisor por escolha',
          detail:
            'as demais listas do módulo separam linhas com divisor de 1px; aqui a separação é o espaço de 72px, o que dá à tela de configurações um ritmo mais arejado.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        {
          name: 'Calha do glifo',
          role: 'Espaço de 41px que alinha todos os ícones.',
          token: 'padding-left 41px',
        },
        {
          name: 'Glifo',
          role: 'Ícone em caixa de 20px, ligadura do Material Symbols Rounded.',
          token: '--unc-color-icon-muted',
        },
        {
          name: 'Título',
          role: 'Nome da seção de configuração.',
          token: '--unc-font-body-lg-size · --unc-color-text-primary',
        },
        {
          name: 'Descrição',
          role: 'Resumo do que a seção contém.',
          token: '--unc-font-body-sm-size · --unc-color-text-secondary',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de estados e lista completa"
      description="A lista de configurações e, abaixo, os estados com e sem descrição e interativo."
    />
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <SettingsList />
    </UncDocStage>
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <SettingsItem
          icon="settingsAccount"
          title="Com descrição"
          description="Privacidade, segurança, trocar número"
        />
        <SettingsItem icon="settingsInvite" title="Sem descrição" />
        <SettingsItem
          icon="settingsHelp"
          title="Interativo"
          description="Recebe foco pelo teclado"
          onClick={() => undefined}
        />
      </ul>
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Envolver as linhas em um <ul> e passar onClick para navegar.',
        'Manter a calha de 41px para que todos os glifos se alinhem.',
        'Usar apenas glifos do registro do módulo (uncIcons).',
        'Omitir a descrição quando ela não acrescentar informação.',
      ]}
      donts={[
        'Adicionar divisores entre as linhas.',
        'Usar glifos de outra biblioteca para as seções de configuração.',
        'Reduzir o passo vertical abaixo dos 72px.',
        'Aplicar o tom de ícone de app bar (--unc-color-icon-appbar) às linhas de configuração.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: glifo, título e descrição trocam de valor juntos."
    />
    <UncDocThemeSwitcher surface="canvas" padding={0}>
      {() => (
        <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
          <SettingsItem
            icon="settingsAccount"
            title="Conta"
            description="Privacidade, segurança, trocar número"
          />
          <SettingsItem
            icon="settingsNotifications"
            title="Notificações"
            description="Sons de mensagens, grupos e chamadas"
          />
        </ul>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="SettingsItem"
      rows={[
        { name: 'icon', type: 'UncIconName', description: 'Glifo exibido à esquerda. Obrigatório.' },
        { name: 'title', type: 'string', description: 'Título da linha. Obrigatório.' },
        {
          name: 'description',
          type: 'string',
          description: 'Descrição exibida abaixo do título.',
        },
        {
          name: 'iconRotate',
          type: 'number',
          default: '0',
          description:
            'Rotação, em graus, aplicada ao glifo. Reservada: nenhum glifo atual precisa dela.',
        },
        {
          name: 'onClick',
          type: '(event) => void',
          description: 'Quando informado, a linha vira um button focalizável.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SettingsItem> = {
  title: 'Unoochat/Componentes/SettingsItem',
  component: SettingsItem,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: { control: 'select', options: uncIconNames, description: 'Glifo exibido à esquerda.' },
    title: { control: 'text', description: 'Título da linha.' },
    description: { control: 'text', description: 'Descrição da linha.' },
    iconRotate: {
      control: { type: 'range', min: -180, max: 180, step: 1 },
      description: 'Rotação do glifo. Reservada: nenhum glifo atual precisa dela.',
    },
    onClick: { action: 'onClick', description: 'Quando informado, a linha vira um button.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    icon: 'settingsAccount',
    title: 'Conta',
    description: 'Privacidade, segurança, trocar número',
    iconRotate: 0,
  },
};

export default meta;

type Story = StoryObj<typeof SettingsItem>;

/**
 * Documentação rica e completa do componente.
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
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <SettingsItem {...args} />
      </ul>
    </UncDocStage>
  ),
};

/**
 * Lista completa da tela de configurações.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <SettingsList />
    </UncDocStage>
  ),
};

/**
 * Estados com e sem descrição e interativo.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <SettingsItem
          icon="settingsAccount"
          title="Com descrição"
          description="Privacidade, segurança, trocar número"
        />
        <SettingsItem icon="settingsInvite" title="Sem descrição" />
        <SettingsItem
          icon="settingsHelp"
          title="Interativo"
          description="Recebe foco"
          onClick={() => undefined}
        />
      </ul>
    </UncDocStage>
  ),
};
