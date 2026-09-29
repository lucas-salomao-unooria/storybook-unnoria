import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '../../../src/unoovista/components/Button';
import { Icon } from '../../../src/unoovista/components/Icon';
import { Logo } from '../../../src/unoovista/components/Logo';
import { Avatar } from '../../../src/unoovista/components/Avatar';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import { unvAvatars } from '../fixtures';

const BAR = '#716C98';
const CAPTION: React.CSSProperties = { fontSize: 12, color: '#475157', marginTop: 10 };

const portraits = Object.values(unvAvatars) as string[];

/**
 * Tela de entrada: a composição canônica de primário, social e link.
 */
const SignInCard = () => (
  <div
    style={{
      width: '100%',
      maxWidth: 320,
      display: 'grid',
      gap: 16,
      justifyItems: 'center',
      padding: 24,
      boxSizing: 'border-box',
      borderRadius: 16,
      background: 'var(--unv-color-background-primary)',
    }}
  >
    <Logo height={32} />
    <Avatar src={portraits[0]} alt="" size="xl" />
    <div style={{ width: '100%', display: 'grid', gap: 12 }}>
      <Button size="lg" block>
        Entrar como Marina
      </Button>
      <Button variant="secondary" size="lg" block>
        Trocar de conta
      </Button>
    </div>
    <Button variant="social" leadingIcon={<Icon name="external" size="sm" tone="inherit" />}>
      Continuar com outra conta
    </Button>
    <Button variant="link">Esqueceu a senha?</Button>
  </div>
);

/**
 * Página de documentação rica do componente Button.
 */
const ButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Ação"
      title="Button"
      description="Ações em cápsula. O botão primário é o único preenchido e leva o roxo de ação; o secundário se contorna; o link e a ação social ficam em tom de link, sem contêiner. Três alturas (30, 36 e 44px) e um alvo de toque de 44px em todas elas."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Qual variante escolher em cada situação."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🟣" title="Primária">
        A ação principal da tela: Entrar, Seguir, Publicar. Cápsula em{' '}
        <code>--unv-color-action-primary</code>, rótulo em <code>--unv-color-text-on-action</code>. Só uma por
        região.
      </UnvDocCard>
      <UnvDocCard icon="⭕" title="Secundária">
        Ação de apoio: Editar perfil, Mensagem. Cápsula transparente com contorno em{' '}
        <code>--unv-color-action-secondary-border</code>.
      </UnvDocCard>
      <UnvDocCard icon="🔗" title="Link">
        Ação textual de baixo peso: Trocar de conta, Esqueceu a senha? Em <code>--unv-color-text-link</code>,
        sublinhada no hover.
      </UnvDocCard>
      <UnvDocCard icon="↗️" title="Social">
        Continuar com outra conta: tom de link, glifo à esquerda (<code>leadingIcon</code>) e a mesma
        semântica de botão.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="Button"
      layout="Cápsula · 30 · 36 · 44px"
      specs={[
        { label: 'Alturas', value: 'sm 30px · md 36px · lg 44px' },
        { label: 'Recuo lateral', value: '12 · 16 · 20px' },
        { label: 'Raio', value: '--unv-radius-full' },
        { label: 'Rótulo', value: 'title-sm · 14px/600' },
        { label: 'Primário', value: 'action-primary · pressed: action-pressed' },
        { label: 'Desabilitado', value: 'action-disabled + text-secondary' },
        { label: 'Foco', value: 'contorno de 2px em action-primary' },
        { label: 'Alvo de toque', value: '44px (área invisível)' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Variante social',
          detail:
            'o vocabulário do módulo descreve a função (continuar com outra conta), não um serviço. O glifo entra por leadingIcon; a estória usa o ícone "external".',
        },
        {
          subject: 'Cápsula em todos os tamanhos',
          detail:
            'o raio é --unv-radius-full, coerente com campos, chips e a doca. O link e a ação social, sem contêiner, mantêm apenas o foco arredondado (--unv-radius-xs).',
        },
        {
          subject: 'Hover e pressed sem filtro',
          detail:
            'o primário troca para --unv-color-action-pressed em hover e em pressed; nada de brightness(), que seria derivar cor por cálculo. O secundário ganha --unv-color-fill-field em hover e --unv-color-background-tertiary em pressed.',
        },
        {
          subject: 'Desabilitado legível',
          detail:
            'o primário usa --unv-color-action-disabled com o rótulo em --unv-color-text-secondary, e não em text-on-action (que ficaria ilegível). O secundário e o link usam --unv-color-text-placeholder.',
        },
        {
          subject: 'Contorno do secundário',
          detail:
            'o contorno usa --unv-color-action-secondary-border, suave, e não border-control: o rótulo (4,5:1) é quem identifica o botão; o contorno é reforço.',
        },
        {
          subject: 'Alvo de 44px sem mudar o desenho',
          detail:
            'as alturas de 30 e 36px permanecem; um pseudo-elemento invisível amplia a área de toque ao mínimo de 44px (--unv-touch-target). Botões vizinhos devem manter pelo menos 8px de distância.',
        },
        {
          subject: 'Feedback de toque',
          detail:
            'o pressionado reduz a escala a 98%; a transição usa --unv-transition-fast e é desligada com prefers-reduced-motion.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Contêiner em cápsula, ícone opcional, rótulo e ícone final."
    />
    <UnvDocAnatomy
      zones={[
        {
          name: 'Contêiner',
          role: 'Cápsula com preenchimento (primário) ou contorno (secundário). Link e social não têm contêiner.',
          token: '--unv-color-action-primary · --unv-color-action-secondary-border',
        },
        {
          name: 'Ícone inicial',
          role: 'Slot leadingIcon, aria-hidden. Na variante social é o glifo da ação.',
        },
        {
          name: 'Rótulo',
          role: 'Texto em title-sm; cor de texto-sobre-ação no primário, de texto primário no secundário e de link nas demais.',
          token: '--unv-color-text-on-action · --unv-color-text-primary · --unv-color-text-link',
        },
        {
          name: 'Ícone final',
          role: 'Slot trailingIcon, aria-hidden.',
        },
        {
          name: 'Anel de foco',
          role: 'Contorno de 2px afastado 2px, visível apenas com o teclado.',
          token: '--unv-color-action-primary',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Combinações completas renderizadas pelo componente real de produção."
    />
    <UnvDocStage label="Variantes" gap={16}>
      <Button>Entrar</Button>
      <Button variant="secondary">Editar perfil</Button>
      <Button variant="link">Trocar de conta</Button>
      <Button variant="social" leadingIcon={<Icon name="external" size="sm" tone="inherit" />}>
        Abrir serviço externo
      </Button>
    </UnvDocStage>
    <UnvDocStage label="Tamanhos" gap={16}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'grid', gap: 12, justifyItems: 'center' }}>
          <Button size={size}>Seguir</Button>
          <Button size={size} variant="secondary">
            Mensagem
          </Button>
          <div style={{ ...CAPTION, marginTop: 0 }}>{size}</div>
        </div>
      ))}
    </UnvDocStage>
    <UnvDocStage label="Estados: repouso, desabilitado e com ícones" gap={16}>
      <Button>Repouso</Button>
      <Button disabled>Desabilitado</Button>
      <Button variant="secondary" disabled>
        Desabilitado
      </Button>
      <Button variant="link" disabled>
        Desabilitado
      </Button>
      <Button leadingIcon={<Icon name="add" size="sm" tone="inherit" />}>Nova publicação</Button>
      <Button
        variant="secondary"
        trailingIcon={<Icon name="chevronDown" size="sm" tone="inherit" />}
      >
        Ordenar
      </Button>
    </UnvDocStage>
    <UnvDocStage label="Sobre a tela (background-secondary)" surface="secondary" gap={16}>
      <Button>Seguir</Button>
      <Button variant="secondary">Mensagem</Button>
      <Button variant="link">Ver tudo</Button>
    </UnvDocStage>
    <UnvDocStage label="Exemplo de composição: entrada" surface="secondary">
      <SignInCard />
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Usar uma única ação primária por região da tela.',
        'Usar block e size="lg" nas ações principais das telas de entrada.',
        'Passar o glifo da ação social por leadingIcon, com o Icon do módulo.',
        'Manter 8px ou mais entre botões vizinhos, por causa da área de toque de 44px.',
        'Usar as="a" quando a ação navega, mantendo a mesma aparência.',
      ]}
      donts={[
        'Empilhar dois botões primários lado a lado.',
        'Usar a variante social com um glifo desenhado à mão ou de outra biblioteca.',
        'Trocar a cor do rótulo do primário: ela é par medido com o preenchimento.',
        'Usar o link para ações destrutivas ou para a ação principal da tela.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="No tema escuro o preenchimento clareia e o rótulo escurece: o par continua acima de 4,5:1."
    />
    <UnvDocThemeSwitcher>
      {() => (
        <>
          <Button>Seguir</Button>
          <Button variant="secondary">Mensagem</Button>
          <Button variant="link">Trocar de conta</Button>
          <Button variant="social" leadingIcon={<Icon name="external" size="sm" tone="inherit" />}>
            Abrir serviço externo
          </Button>
          <Button disabled>Desabilitado</Button>
        </>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UnvDocPropsTable
      title="Button"
      rows={[
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'link' | 'social'",
          default: "'primary'",
          description: 'Variante visual. "social" é a ação em tom de link com glifo à esquerda.',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: 'Altura de 30, 36 ou 44px. Sem efeito em link e social.',
        },
        {
          name: 'block',
          type: 'boolean',
          default: 'false',
          description: 'Ocupa toda a largura do contêiner.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Desabilita a interação e aplica o visual de desabilitado da variante.',
        },
        {
          name: 'leadingIcon',
          type: 'React.ReactNode',
          description: 'Ícone antes do rótulo (aria-hidden).',
        },
        {
          name: 'trailingIcon',
          type: 'React.ReactNode',
          description: 'Ícone depois do rótulo (aria-hidden).',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Força o tema. Sem valor, herda o de data-unv-theme do contêiner.',
        },
        {
          name: 'as',
          type: 'React.ElementType',
          default: "'button'",
          description: 'Elemento raiz; permite usar o botão como âncora.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Rótulo do botão.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Button> = {
  title: 'Unoovista/Componentes/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'link', 'social'],
      description: 'Variante visual do botão.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Altura do botão (30, 36 ou 44px).',
    },
    block: { control: 'boolean', description: 'Ocupa toda a largura do contêiner.' },
    disabled: { control: 'boolean', description: 'Desabilita a interação.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Rótulo do botão.' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    block: false,
    disabled: false,
    theme: 'light',
    children: 'Seguir',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ButtonDocumentationPage />,
};

/**
 * Playground com as propriedades do Button expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Button',
  render: (args) => (
    <UnvDocStage theme={args.theme ?? 'light'} padding={48}>
      <div style={{ width: args.block ? 320 : undefined }}>
        <Button
          {...args}
          leadingIcon={
            args.variant === 'social' ? (
              <Icon name="external" size="sm" tone="inherit" />
            ) : undefined
          }
        />
      </div>
    </UnvDocStage>
  ),
};

/**
 * Tela de entrada: primário, secundário, ação social e link juntos.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UnvDocStage surface="secondary" padding={32}>
      <SignInCard />
    </UnvDocStage>
  ),
};

/**
 * Matriz completa de variantes.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UnvDocStage gap={16}>
      <Button>Entrar</Button>
      <Button variant="secondary">Editar perfil</Button>
      <Button variant="link">Trocar de conta</Button>
      <Button variant="social" leadingIcon={<Icon name="external" size="sm" tone="inherit" />}>
        Abrir serviço externo
      </Button>
    </UnvDocStage>
  ),
};

/**
 * Comparação das três alturas oficiais.
 */
export const Tamanhos: Story = {
  render: () => (
    <UnvDocStage gap={16}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Button key={size} size={size}>
          Seguir · {size}
        </Button>
      ))}
    </UnvDocStage>
  ),
};

/**
 * Estados de repouso e desabilitado de cada variante.
 */
export const Estados: Story = {
  render: () => (
    <UnvDocStage gap={16}>
      <Button>Repouso</Button>
      <Button disabled>Desabilitado</Button>
      <Button variant="secondary">Repouso</Button>
      <Button variant="secondary" disabled>
        Desabilitado
      </Button>
      <Button variant="link">Repouso</Button>
      <Button variant="link" disabled>
        Desabilitado
      </Button>
    </UnvDocStage>
  ),
};
