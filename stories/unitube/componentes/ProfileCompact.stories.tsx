import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { ProfileCompact } from '../../../src/unitube';
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

const meta: Meta<typeof ProfileCompact> = {
  title: 'Unitube/Componentes/ProfileCompact',
  component: ProfileCompact,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    onClick: { action: 'onClick' },
  },
  args: { src: avatars.currentUser, alt: 'Perfil', initials: 'LS', disabled: false },
};

export default meta;

type Story = StoryObj<typeof ProfileCompact>;

const ProfileCompactDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Componentes • Navegação"
      title="ProfileCompact"
      description="Reprodução do nó Navigation/ProfileCompact (7:87): um avatar de 32px dentro de um alvo de 60×40 com recuo lateral de 14px. É o único ponto de todo o arquivo em que o avatar de 32px aparece, e o recuo de 14px também não se repete em nenhum outro nó."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="O alvo de perfil da barra superior."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="👤" title="Um único uso no arquivo">
        Fecha o bloco direito da barra superior, dentro do <code>ProfileExpanded</code>. Não aparece
        em nenhuma outra tela.
      </UniDocCard>
      <UniDocCard icon="📏" title="Medidas exclusivas">
        Avatar de 32px e recuo lateral de 14px — nenhum dos dois valores se repete em outro nó do
        arquivo. Os 14px não estão na escala de espaçamento e ficaram literais no CSS.
      </UniDocCard>
      <UniDocCard icon="🎯" title="Alvo maior que o avatar">
        O quadro de 60×40 dá área de toque confortável sem aumentar o círculo. É o mesmo princípio
        dos alvos de ícone de 40px ao lado.
      </UniDocCard>
      <UniDocCard icon="♿" title="Botão rotulado">
        O componente renderiza um <code>&lt;button&gt;</code> com <code>aria-label</code>, e o
        avatar interno recebe <code>alt</code> vazio para não duplicar a leitura.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="7:87"
      frameName="Navigation/ProfileCompact"
      specs={[
        { label: 'Dimensões', value: '60 × 40' },
        { label: 'Recuo', value: '4 / 14' },
        { label: 'Avatar', value: '32px (--uni-avatar-sm)' },
        { label: 'Superfície', value: 'transparente' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Recuo lateral de 14px fora da escala',
          detail:
            'a escala de espaçamento publica 12 e 16, não 14. O valor literal do arquivo foi preservado e anotado no CSS em vez de arredondado para um degrau da escala.',
        },
        {
          subject: 'Elemento interativo',
          detail:
            'o arquivo publica um quadro estático. O componente renderiza um <button> com aria-label e realce translúcido no hover, porque o alvo abre o menu de conta.',
        },
        {
          subject: 'Estado vazio',
          detail:
            'o avatar interno aceita initials como reserva. O arquivo não publica esse estado — ver o desvio equivalente registrado na estória do Avatar.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Alvo',
          role: 'Botão de 60×40 com recuo 4/14, transparente em repouso.',
          token: '--uni-spacing-4',
        },
        {
          name: 'Avatar',
          role: 'Círculo de 32px com o retrato do usuário.',
          token: '--uni-avatar-sm',
        },
        {
          name: 'Realce',
          role: 'Fundo translúcido no hover e anel de foco no vermelho semântico.',
          token: '--uni-color-state-hover',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo" surface="secondary">
      <ProfileCompact src={avatars.currentUser} />
    </UniDocStage>
    <UniDocStage label="Sem retrato: substituto por iniciais" surface="secondary" gap={16}>
      <ProfileCompact initials="LS" />
      <ProfileCompact initials="AC" />
      <ProfileCompact />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use alt para descrever a ação do botão — “Perfil” ou o nome da conta.',
        'Forneça initials como reserva para o caso de o retrato não carregar.',
        'Mantenha o alvo de 60×40 mesmo que o avatar seja menor: é a área de toque.',
        'Coloque o componente sempre ao final do bloco direito, como o arquivo faz.',
      ]}
      donts={[
        'Não aumente o avatar além de 32px neste contexto: é o diâmetro do arquivo.',
        'Não use este componente fora da barra superior — para outros contextos, use o Avatar direto.',
        'Não remova o rótulo acessível: o botão não tem texto visível.',
        'Não arredonde o recuo de 14px para 12 ou 16.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O alvo sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['secondary', 'primary', 'surface']}>
      {() => (
        <>
          <ProfileCompact src={avatars.currentUser} />
          <ProfileCompact initials="LS" />
        </>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="ProfileCompact"
      rows={[
        { name: 'src', type: 'string', description: 'Endereço do retrato do usuário.' },
        {
          name: 'alt',
          type: 'string',
          default: "'Perfil'",
          description: 'Rótulo acessível do botão, aplicado como aria-label.',
        },
        {
          name: 'initials',
          type: 'string',
          description: 'Iniciais exibidas quando src não é informado.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
          description: 'Demais atributos são repassados ao <button>, incluindo onClick e disabled.',
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
  render: () => <ProfileCompactDocumentationPage />,
};

/**
 * Playground com 100% das props do ProfileCompact expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ProfileCompact',
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
      <ProfileCompact {...args} />
    </div>
  ),
};

/**
 * Réplica visual do nó `Navigation/ProfileCompact` (7:87), 60×40.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-secondary)' }}
    >
      <ProfileCompact src={avatars.currentUser} />
    </div>
  ),
};

/**
 * Com retrato, com iniciais e vazio.
 */
export const Estados: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 16,
        padding: 32,
        background: 'var(--uni-color-background-secondary)',
      }}
    >
      <ProfileCompact src={avatars.currentUser} />
      <ProfileCompact initials="LS" />
      <ProfileCompact />
    </div>
  ),
};
