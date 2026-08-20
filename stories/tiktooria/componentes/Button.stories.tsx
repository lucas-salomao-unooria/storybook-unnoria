import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Button } from '../../../src/tiktooria';
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

const meta: Meta<typeof Button> = {
  title: 'Tik Tooria/Componentes/Button',
  component: Button,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'outline', 'floating'] },
    icon: {
      control: 'select',
      options: [undefined, 'videoCameraSolid', 'bookmarkSmall', 'plus', 'download'],
    },
    fixedWidth: { control: 'boolean' },
    block: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    variant: 'outline',
    fixedWidth: true,
    block: false,
    disabled: false,
    children: 'Edit profile',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;


const ButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Ações"
      title="Button"
      description="As três variantes de botão do arquivo: primary (cápsula de 270×44 em #EA4359 com rótulo Bold 15 branco), outline (164×44 com contorno de 1px #E3E3E4, raio 2px e rótulo Semibold 15) e floating (cápsula branca de 178×52 com sombra e rótulo Semibold 16 com tracking de -0,25px). As dimensões fixas de cada variante são as literais do Figma e podem ser liberadas com fixedWidth={false}."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🔴" title="Primary é a única cápsula colorida">
        Aparece uma única vez no arquivo, em “Select photos”. É o alvo de confirmação mais forte do módulo.
      </TikDocCard>
      <TikDocCard icon="⬜" title="Outline com raio de 2px">
        Não é uma cápsula: o raio de 2px é quase reto, o que distingue o botão de perfil de qualquer alvo arredondado.
      </TikDocCard>
      <TikDocCard icon="☁️" title="Floating com sombra">
        Único botão com desfoque, em “Use this sound”. A sombra é o que o separa da grade de miniaturas atrás.
      </TikDocCard>
      <TikDocCard icon="📐" title="Larguras literais">
        270, 164 e 178px. <code>fixedWidth={false}</code> libera a largura para conteúdo variável.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:621"
      frameName="Button — TikTok Upload photos / TikTok User / TikTok Album"
      specs={[
        { label: 'Primary', value: '270 × 44 · raio 22 · Bold 15' },
        { label: 'Outline', value: '164 × 44 · raio 2 · Semibold 15' },
        { label: 'Floating', value: '178 × 52 · raio 26 · Semibold 16' },
        { label: 'Contorno', value: '1px #E3E3E4' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Estados de interação',
          detail:
            'o arquivo não descreve hover, foco nem desabilitado. O hover de primary usa --tik-color-accent-heart-shadow (o tom vizinho da própria escala), o de outline e floating usa --tik-color-surface-sheet, o foco é anel de 2px em --tik-color-brand-button e o desabilitado aplica 40% de opacidade.',
        },
        {
          subject: 'Rótulo de outline em preto puro',
          detail:
            'o arquivo pinta “Edit profile” em #000000, não em #161722 como o resto do texto primário. O valor literal foi preservado em --tik-color-text-callout.',
        },
        {
          subject: 'Raios expressos como valor absoluto',
          detail:
            'primary e floating são cápsulas cujo raio é metade da altura (22 e 26). Foram declarados como valor absoluto, e não como radius-full, para preservar o número do arquivo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Superfície', role: 'Preenchimento ou contorno, conforme a variante.', token: '--tik-color-brand-button / --tik-color-border-outline' },
        { name: 'Glifo', role: 'Ícone opcional de 14px antes do rótulo.', token: 'prop icon' },
        { name: 'Rótulo', role: 'Degrau tipográfico específico de cada variante.', token: '--tik-font-body-bold-* / -body-strong-* / -pill-*' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="As três variantes, nas larguras do arquivo" surface="chrome" gap={24}>
      <Button variant="primary">Select photos</Button>
      <Button variant="outline">Edit profile</Button>
      <Button variant="floating" icon="videoCameraSolid">
        Use this sound
      </Button>
    </TikDocStage>
    <TikDocStage label="Com largura livre" surface="chrome" gap={24}>
      <Button variant="primary" fixedWidth={false}>
        Confirmar
      </Button>
      <Button variant="outline" fixedWidth={false}>
        Seguir
      </Button>
      <Button variant="floating" fixedWidth={false} icon="bookmarkSmall">
        Salvar
      </Button>
    </TikDocStage>
    <TikDocStage label="Estados" surface="chrome" gap={24}>
      <Button variant="primary">Repouso</Button>
      <Button variant="primary" disabled>
        Desabilitado
      </Button>
      <Button variant="outline" disabled>
        Desabilitado
      </Button>
    </TikDocStage>
    <TikDocStage label="Ocupando toda a largura" surface="chrome" align="stretch" direction="column" width={382}>
      <Button variant="primary" block>
        Select photos
      </Button>
      <Button variant="outline" block>
        Edit profile
      </Button>
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Reserve primary para a confirmação principal da tela.',
        'Use outline nas ações de perfil, onde o arquivo o aplica.',
        'Use floating apenas sobre conteúdo, onde a sombra tem função.',
        'Libere fixedWidth quando o rótulo for localizado e puder crescer.',
      ]}
      donts={[
        'Não use mais de um primary por tela.',
        'Não arredonde o outline: o raio de 2px é o que o caracteriza.',
        'Não aplique a sombra do floating às outras variantes.',
        'Não use primary sobre superfície imersiva — o arquivo o aplica sobre preto apenas no seletor de upload, onde a cápsula já tem contraste próprio.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher>
      {() => (
        <>
          <Button variant="primary" fixedWidth={false}>
            Select photos
          </Button>
          <Button variant="outline" fixedWidth={false}>
            Edit profile
          </Button>
          <Button variant="floating" fixedWidth={false} icon="videoCameraSolid">
            Use this sound
          </Button>
        </>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="Button"
      rows={[
        {
          name: 'variant',
          type: "'primary' | 'outline' | 'floating'",
          default: "outline",
          description:
            'Variante visual, cada uma com sua própria dimensão, raio e degrau tipográfico.',
        },
        {
          name: 'icon',
          type: "TikIconName",
          description:
            'Glifo exibido antes do rótulo, em 14px.',
        },
        {
          name: 'fixedWidth',
          type: "boolean",
          default: "true",
          description:
            'Aplica a largura literal da variante: 270, 164 ou 178px.',
        },
        {
          name: 'block',
          type: "boolean",
          default: "false",
          description:
            'Ocupa toda a largura disponível, ignorando fixedWidth.',
        },
        {
          name: 'children',
          type: "React.ReactNode",
          description:
            'Rótulo do botão.',
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
  render: () => <ButtonDocumentationPage />,
};

/**
 * Playground com 100% das props do Button expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Button',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
        background: 'var(--tik-color-surface-primary)',
      }}
    >
      <Button {...args} />
    </div>
  ),
};

/**
 * Réplica visual dos três frames de botão do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        alignItems: 'center',
        width: 414,
        padding: 32,
        background: 'var(--tik-color-surface-primary)',
      }}
    >
      <Button variant="primary">Select photos</Button>
      <div style={{ display: 'flex', gap: 4 }}>
        <Button variant="outline">Edit profile</Button>
      </div>
      <Button variant="floating" icon="videoCameraSolid">
        Use this sound
      </Button>
    </div>
  ),
};

/**
 * As três variantes.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 24 }}>
      <Button variant="primary">Select photos</Button>
      <Button variant="outline">Edit profile</Button>
      <Button variant="floating" icon="videoCameraSolid">
        Use this sound
      </Button>
    </div>
  ),
};

/**
 * Largura fixa do arquivo, largura por conteúdo e largura total.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 382, padding: 24 }}>
      <Button variant="primary">Largura do arquivo (270px)</Button>
      <Button variant="primary" fixedWidth={false}>
        Largura por conteúdo
      </Button>
      <Button variant="primary" block>
        Largura total
      </Button>
    </div>
  ),
};

/**
 * Estados interativos das três variantes.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 24 }}>
      {(['primary', 'outline', 'floating'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Button variant={variant} fixedWidth={false}>
            Repouso
          </Button>
          <Button variant={variant} fixedWidth={false} disabled>
            Desabilitado
          </Button>
        </div>
      ))}
    </div>
  ),
};
