import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Avatar } from '../../../src/unootube';
import { uniAvatarSizes } from '../../../src/unootube/tokens';
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

const meta: Meta<typeof Avatar> = {
  title: 'Unootube/Componentes/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 64, 120] },
    initials: { control: 'text' },
    className: { control: 'text' },
  },
  args: { src: avatars.marcusLevin, alt: 'Marcus Levin', size: 'lg', initials: 'ML' },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

const AvatarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Fundação"
      title="Avatar"
      description="Reprodução do nó Avatar/UserAvatar (7:58): um quadrado com raio total preenchido por bitmap. O arquivo instancia o mesmo componente em seis diâmetros distintos — 24, 32, 36, 40, 48 e 80 pixels —, cada um medido em um contexto diferente e todos preservados como tokens literais."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Onde cada diâmetro aparece."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="📏" title="Seis diâmetros literais">
        <code>xs</code> 24px é o componente base; <code>sm</code> 32px é o perfil da barra superior;{' '}
        <code>md</code> 36px é o cartão da grade; <code>lg</code> 40px é o comentário;{' '}
        <code>xl</code> 48px é a descrição do vídeo; <code>2xl</code> 80px é o cabeçalho de canal.
      </UniDocCard>
      <UniDocCard icon="🖼️" title="Bitmaps ficam fora do pacote">
        Os retratos são imagens coladas nos frames do arquivo. Nenhum integra a biblioteca — todos
        entram por <code>src</code>.
      </UniDocCard>
      <UniDocCard icon="⭕" title="Raio total, sempre">
        O arquivo aplica <code>--uni-radius-full</code> (80px) em todas as instâncias. Não existe
        avatar quadrado nem de canto arredondado no arquivo.
      </UniDocCard>
      <UniDocCard icon="🔤" title="Substituto por iniciais">
        O arquivo não publica estado vazio. O substituto tipográfico foi acrescentado com a
        superfície interativa e o texto secundário da própria marca, para que o avatar nunca
        renderize um vazio quebrado.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="7:58"
      frameName="Avatar/UserAvatar"
      specs={[
        { label: 'Dimensão base', value: '24 × 24' },
        { label: 'Raio', value: '--uni-radius-full (80px)' },
        { label: 'Diâmetros aplicados', value: '24 · 32 · 36 · 40 · 48 · 80' },
        { label: 'Preenchimento', value: 'bitmap (IMAGE)' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Retratos não redistribuídos',
          detail:
            'os bitmaps colados nos frames são retratos de pessoas. Não foram exportados nem embutidos no pacote; as estórias usam retratos sintéticos com iniciais, gerados em SVG a partir da própria paleta.',
        },
        {
          subject: 'Estado vazio',
          detail:
            'o arquivo não publica avatar sem imagem. O substituto por iniciais foi acrescentado usando --uni-color-background-surface e --uni-color-text-secondary, para que uma falha de carregamento não deixe um buraco na composição.',
        },
        {
          subject: 'Raio declarado por instância',
          detail:
            'algumas instâncias do arquivo declaram cornerRadius igual ao próprio diâmetro (24, 32, 40, 80) em vez de um valor único. Todas produzem o mesmo círculo; o componente usa --uni-radius-full em todos os tamanhos.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Contêiner',
          role: 'Quadrado com raio total, recortando o conteúdo.',
          token: '--uni-radius-full · --uni-color-background-surface',
        },
        {
          name: 'Imagem',
          role: 'Bitmap informado por prop, recortado com object-fit: cover.',
          token: 'prop src',
        },
        {
          name: 'Substituto',
          role: 'Iniciais em Caption/Default Bold quando não há imagem.',
          token: '--uni-color-text-secondary',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de tamanhos e estados" barColor="#EE1A26" />
    <UniDocStage label="Os seis diâmetros do arquivo" surface="primary" gap={20}>
      {Object.entries(uniAvatarSizes).map(([key, token]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <Avatar src={avatars.marcusLevin} alt="" size={key as never} />
          <div
            style={{
              fontSize: 11,
              color: 'var(--uni-color-text-secondary)',
              marginTop: 6,
              fontFamily: 'var(--uni-font-sans)',
            }}
          >
            {key} · {token.value}px
          </div>
        </div>
      ))}
    </UniDocStage>
    <UniDocStage label="Sem imagem: substituto por iniciais" surface="primary" gap={20}>
      <Avatar size="sm" initials="JG" />
      <Avatar size="md" initials="AC" />
      <Avatar size="lg" initials="ML" />
      <Avatar size="xl" initials="AW" />
      <Avatar size="2xl" initials="SD" />
    </UniDocStage>
    <UniDocStage label="Sem imagem e sem iniciais: apenas a superfície" surface="primary" gap={20}>
      <Avatar size="lg" />
      <Avatar size="xl" />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Escolha o diâmetro pelo contexto, usando os seis tokens publicados.',
        'Informe alt quando o avatar carregar informação — o nome do canal, por exemplo.',
        'Passe alt vazio quando o nome já aparecer como texto ao lado, para não duplicar a leitura.',
        'Forneça initials como reserva para o caso de a imagem não carregar.',
      ]}
      donts={[
        'Não derive diâmetros por cálculo: os seis do arquivo são literais.',
        'Não embuta retratos no pacote — eles entram sempre por prop.',
        'Não aplique raio parcial: o arquivo usa raio total em todas as instâncias.',
        'Não use o avatar como botão sem envolvê-lo em um alvo rotulado, como o ProfileCompact faz.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O avatar sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'surface', 'field']}>
      {() => (
        <>
          <Avatar src={avatars.jamesGouse} alt="" size="xl" />
          <Avatar size="xl" initials="JG" />
          <Avatar size="xl" />
        </>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="Avatar"
      rows={[
        {
          name: 'src',
          type: 'string',
          description:
            'Endereço do retrato. Os bitmaps do arquivo não integram o pacote: são sempre informados por prop.',
        },
        {
          name: 'alt',
          type: 'string',
          default: "''",
          description:
            'Texto alternativo da imagem. Use vazio quando o nome já aparecer como texto adjacente.',
        },
        {
          name: 'size',
          type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number",
          default: "'xs'",
          description:
            'Diâmetro. Os seis tokens nomeados correspondem aos seis diâmetros literais do arquivo; um número aplica um diâmetro arbitrário.',
        },
        {
          name: 'initials',
          type: 'string',
          description:
            'Iniciais exibidas quando src não é informado. Substituto acrescentado pela biblioteca — o arquivo não publica estado vazio.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLSpanElement>',
          description: 'Demais atributos são repassados ao elemento raiz <span>.',
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
  render: () => <AvatarDocumentationPage />,
};

/**
 * Playground com 100% das props do Avatar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Avatar',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <Avatar {...args} />
    </div>
  ),
};

/**
 * Réplica visual do nó `Avatar/UserAvatar` (7:58), 24×24.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 40, background: 'var(--uni-color-background-primary)' }}
    >
      <Avatar src={avatars.marcusLevin} alt="Marcus Levin" size="xs" />
    </div>
  ),
};

/**
 * Os seis diâmetros publicados pelo arquivo.
 */
export const Tamanhos: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 24,
        alignItems: 'flex-end',
        padding: 40,
        background: 'var(--uni-color-background-primary)',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {Object.entries(uniAvatarSizes).map(([key, token]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <Avatar src={avatars.annaWhite} alt="" size={key as never} />
          <div style={{ fontSize: 11, color: 'var(--uni-color-text-secondary)', marginTop: 8 }}>
            {key} · {token.value}px
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Com imagem, com iniciais e vazio.
 */
export const Estados: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 24,
        alignItems: 'center',
        padding: 40,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <Avatar src={avatars.skylarDias} alt="Skylar Dias" size="xl" />
      <Avatar size="xl" initials="SD" />
      <Avatar size="xl" />
    </div>
  ),
};
