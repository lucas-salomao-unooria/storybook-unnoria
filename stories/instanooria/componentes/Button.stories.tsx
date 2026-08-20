import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '../../../src/instanooria/components/Button';
import { Icon } from '../../../src/instanooria/components/Icon';
import { Logo } from '../../../src/instanooria/components/Logo';
import { Avatar } from '../../../src/instanooria/components/Avatar';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaAvatars } from '../fixtures';

/**
 * Página de documentação rica do componente Button.
 */
const ButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Ações"
      title="Button"
      description="Reúne as quatro ações canônicas do arquivo de design: a ação primária azul (“Log in”, “Follow”), a ação secundária contornada (“Edit Profile”, “Message”), o link textual azul (“Switch accounts”, “Forgot password?”) e a ação social do Facebook."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Quando escolher cada variante e por que a hierarquia é tão enxuta."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🔵" title="Primária">
        Azul <code>--insta-color-action-primary</code>, uma por tela. É a ação que faz a pessoa
        avançar: entrar, seguir, publicar.
      </InstaDocCard>
      <InstaDocCard icon="⬜" title="Secundária">
        Contorno de 1px e fundo transparente. Usada em ações reversíveis e de baixo compromisso, como
        “Editar perfil” e “Mensagem”.
      </InstaDocCard>
      <InstaDocCard icon="🔗" title="Link">
        Texto azul sem contêiner, para ações terciárias dentro de um fluxo — trocar de conta,
        recuperar senha, cadastrar-se.
      </InstaDocCard>
      <InstaDocCard icon="📘" title="Facebook">
        Variante social com o glifo do Facebook à esquerda. Aparece uma única vez no arquivo, na tela
        de login por credenciais.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas dos frames de autenticação e de perfil."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2740"
      frameName="Account Info → Edit Profile Button"
      specs={[
        { label: 'Altura lg', value: '44px (login)' },
        { label: 'Altura sm', value: '29–30px (perfil)' },
        { label: 'Raio', value: '4px' },
        { label: 'Tipografia', value: 'Title/Small · 14px · 590' },
        { label: 'Ação primária', value: '#3897F0' },
        { label: 'Ação desabilitada', value: '#9FC4F2' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Ícone opcional à esquerda, rótulo e ícone opcional à direita, com gap de 8px."
    />
    <InstaDocStage label="Composição interna">
      <Button variant="primary">Somente rótulo</Button>
      <Button variant="secondary" leadingIcon={<Icon name="share" size={16} tone="inherit" />}>
        Com ícone à esquerda
      </Button>
      <Button
        variant="secondary"
        trailingIcon={<Icon name="chevronDown" size={12} tone="inherit" />}
      >
        Com ícone à direita
      </Button>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes, Tamanhos e Estados"
      description="Combinações completas renderizadas pelo componente real de produção."
    />
    <InstaDocStage label="Variantes">
      <Button variant="primary">Entrar</Button>
      <Button variant="secondary">Editar perfil</Button>
      <Button variant="link">Trocar de conta</Button>
      <Button variant="facebook" leadingIcon={<Icon name="facebook" size={18} tone="inherit" />}>
        Entrar com Facebook
      </Button>
    </InstaDocStage>

    <InstaDocStage label="Tamanhos">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Button key={size} variant="primary" size={size}>
          Seguir ({size})
        </Button>
      ))}
    </InstaDocStage>

    <InstaDocStage label="Estados">
      <Button variant="primary">Padrão</Button>
      <Button variant="primary" disabled>
        Desabilitado
      </Button>
      <Button variant="secondary">Secundária</Button>
      <Button variant="secondary" disabled>
        Secundária desabilitada
      </Button>
      <Button variant="link" disabled>
        Link desabilitado
      </Button>
    </InstaDocStage>

    <InstaDocStage label="Largura total (block)" align="flex-start">
      <div style={{ width: 320, display: 'grid', gap: 10 }}>
        <Button variant="primary" size="lg" block>
          Entrar
        </Button>
        <Button variant="secondary" size="sm" block>
          Editar perfil
        </Button>
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de hierarquia de ação verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Manter apenas uma ação primária visível por tela.',
        'Usar size="lg" com block nas telas de autenticação, como no arquivo original.',
        'Preferir a variante link para ações que não alteram dados.',
        'Desabilitar a ação primária enquanto o formulário estiver incompleto.',
      ]}
      donts={[
        'Colocar duas ações primárias lado a lado.',
        'Usar a variante link como ação principal de uma tela.',
        'Substituir o azul de ação pelo vermelho de curtida em ações destrutivas.',
        'Criar alturas intermediárias fora dos três tamanhos definidos.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A borda da variante secundária escurece no tema Dark, preservando o contraste."
    />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <>
          <Button variant="primary" theme={activeTheme}>
            Seguir
          </Button>
          <Button variant="secondary" theme={activeTheme}>
            Mensagem
          </Button>
          <Button variant="link" theme={activeTheme}>
            Trocar de conta
          </Button>
          <Button variant="primary" theme={activeTheme} disabled>
            Entrar
          </Button>
        </>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Button."
    />
    <InstaDocPropsTable
      title="Button"
      rows={[
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'link' | 'facebook'",
          default: "'primary'",
          description: 'Variante visual da ação.',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: 'Altura do botão: 30, 36 ou 44px. Ignorada nas variantes link e facebook.',
        },
        {
          name: 'block',
          type: 'boolean',
          default: 'false',
          description: 'Ocupa toda a largura disponível do contêiner.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Desabilita a interação e aplica --insta-color-action-disabled.',
        },
        {
          name: 'leadingIcon',
          type: 'React.ReactNode',
          description: 'Ícone renderizado antes do rótulo.',
        },
        {
          name: 'trailingIcon',
          type: 'React.ReactNode',
          description: 'Ícone renderizado após o rótulo.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
        {
          name: 'as',
          type: 'React.ElementType',
          default: "'button'",
          description: 'Elemento raiz, permitindo renderizar a ação como âncora.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Button> = {
  title: 'Instanooria/Componentes/Button',
  component: Button,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'link', 'facebook'],
      description: 'Variante visual da ação.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Altura do botão (30 / 36 / 44px).',
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
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ButtonDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Button expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Button',
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <Button {...args} />
    </div>
  ),
};

/**
 * Réplica da tela de autenticação do arquivo oficial do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        width: 375,
        padding: '48px 28px',
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        display: 'grid',
        justifyItems: 'center',
        gap: 24,
      }}
    >
      <Logo height={44} />
      <Avatar src={instaAvatars.jacob_w} alt="jacob_w" size={72} />
      <span style={{ fontSize: 13, fontWeight: 590, color: '#262626' }}>jacob_w</span>
      <div style={{ width: '100%', display: 'grid', gap: 18, justifyItems: 'center' }}>
        <Button variant="primary" size="lg" block>
          Entrar
        </Button>
        <Button variant="link">Trocar de conta</Button>
      </div>
    </div>
  ),
};

/**
 * Matriz completa de variantes.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Entrar</Button>
      <Button variant="secondary">Editar perfil</Button>
      <Button variant="link">Trocar de conta</Button>
      <Button variant="facebook" leadingIcon={<Icon name="facebook" size={18} tone="inherit" />}>
        Entrar com Facebook
      </Button>
    </div>
  ),
};

/**
 * Comparação das três alturas suportadas.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Button key={size} variant="primary" size={size}>
          Seguir ({size})
        </Button>
      ))}
    </div>
  ),
};

/**
 * Estados interativos e desabilitados.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Padrão</Button>
      <Button variant="primary" disabled>
        Desabilitado
      </Button>
      <Button variant="secondary">Secundária</Button>
      <Button variant="secondary" disabled>
        Secundária desabilitada
      </Button>
      <Button variant="link">Link</Button>
      <Button variant="link" disabled>
        Link desabilitado
      </Button>
    </div>
  ),
};
