import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextField } from '../../../src/instanooria/components/TextField';
import { Button } from '../../../src/instanooria/components/Button';
import { Logo } from '../../../src/instanooria/components/Logo';
import { Icon } from '../../../src/instanooria/components/Icon';
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

/**
 * Página de documentação rica do componente TextField.
 */
const TextFieldDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Entrada de Dados"
      title="TextField"
      description="Cobre as duas formas de entrada do arquivo de design: a caixa preenchida de 44px das telas de autenticação e a linha com rótulo à esquerda da tela “Edit Profile”, separada por um divisor hairline."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Duas variantes com propósitos claramente distintos."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🔐" title="Variante filled">
        Caixa de 44px com fundo <code>background-secondary</code> e contorno de 1px. Usada em login e
        cadastro, onde o campo precisa de presença visual forte.
      </InstaDocCard>
      <InstaDocCard icon="✏️" title="Variante underline">
        Rótulo fixo de 82px à esquerda, valor à direita e hairline na base. É a linha de formulário
        de “Editar perfil”, otimizada para leitura em bloco.
      </InstaDocCard>
      <InstaDocCard icon="⚠️" title="Estados de validação">
        <code>error</code> aplica o vermelho de marca ao contorno e à mensagem, além de{' '}
        <code>aria-invalid</code> e <code>aria-describedby</code>.
      </InstaDocCard>
      <InstaDocCard icon="🔗" title="Ação de apoio">
        O slot <code>trailing</code> ancora ações contextuais como “Esqueceu a senha?”, alinhadas à
        direita abaixo do campo.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas dos frames de autenticação e de edição de perfil."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1846"
      frameName="Instagram Authorization / Instagram Profile Edit"
      specs={[
        { label: 'Altura filled', value: '44px' },
        { label: 'Raio', value: '4px' },
        { label: 'Fundo filled', value: 'background-secondary' },
        { label: 'Tipografia filled', value: 'Body/Large · 16px' },
        { label: 'Rótulo underline', value: '82px · Body/Medium' },
        { label: 'Divisor underline', value: 'hairline 0.33px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Rótulo, controle, mensagem de apoio e slot de ação."
    />
    <InstaDocStage label="Estrutura das duas variantes" align="flex-start">
      <div style={{ width: 320, display: 'grid', gap: 18 }}>
        <TextField
          variant="filled"
          label="Nome de usuário"
          hideLabel
          placeholder="Nome de usuário"
          defaultValue="asad_khasanov"
        />
        <TextField
          variant="filled"
          label="Senha"
          hideLabel
          type="password"
          placeholder="Senha"
          hint="Mínimo de 8 caracteres."
        />
      </div>
      <div style={{ width: 320 }}>
        <TextField variant="underline" label="Nome" defaultValue="Jacob West" />
        <TextField variant="underline" label="Usuário" defaultValue="jacob_w" />
        <TextField variant="underline" label="Site" placeholder="Site" />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Todos os estados suportados pelas duas variantes."
    />
    <InstaDocStage label="Estados da variante filled" align="flex-start">
      <div style={{ width: 320, display: 'grid', gap: 16 }}>
        <TextField label="Padrão" hideLabel placeholder="Nome de usuário" />
        <TextField label="Preenchido" hideLabel defaultValue="asad_khasanov" />
        <TextField label="Erro" hideLabel defaultValue="asad" error="Usuário não encontrado." />
        <TextField label="Desabilitado" hideLabel placeholder="Indisponível" disabled />
        <TextField
          label="Com ação"
          hideLabel
          type="password"
          placeholder="Senha"
          trailing={<Button variant="link">Esqueceu a senha?</Button>}
        />
      </div>
    </InstaDocStage>

    <InstaDocStage label="Estados da variante underline" align="flex-start">
      <div style={{ width: 340 }}>
        <TextField variant="underline" label="Nome" defaultValue="Jacob West" />
        <TextField variant="underline" label="Site" placeholder="Site" />
        <TextField variant="underline" label="E-mail" defaultValue="jacob@unooria.com" disabled />
        <TextField
          variant="underline"
          label="Telefone"
          defaultValue="+55 11"
          error="Número incompleto."
        />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de formulário verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Sempre informar label, usando hideLabel quando o placeholder já comunica o campo.',
        'Usar a variante underline em formulários longos de edição de perfil.',
        'Colocar a ação "Esqueceu a senha?" no slot trailing, alinhada à direita.',
        'Descrever o erro de forma acionável, não apenas "campo inválido".',
      ]}
      donts={[
        'Usar placeholder como substituto do rótulo acessível.',
        'Misturar as duas variantes no mesmo formulário.',
        'Aplicar o vermelho de erro antes de a pessoa terminar de digitar.',
        'Alterar a largura fixa de 82px do rótulo na variante underline.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Fundo, contorno e placeholder invertem juntos, preservando a leitura."
    />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <div style={{ width: 320, display: 'grid', gap: 16 }}>
          <TextField
            label="Nome de usuário"
            hideLabel
            placeholder="Nome de usuário"
            theme={activeTheme}
          />
          <TextField label="Senha" hideLabel type="password" placeholder="Senha" theme={activeTheme} />
          <TextField variant="underline" label="Nome" defaultValue="Jacob West" theme={activeTheme} />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente TextField."
    />
    <InstaDocPropsTable
      title="TextField"
      rows={[
        {
          name: 'variant',
          type: "'filled' | 'underline'",
          default: "'filled'",
          description: 'Forma visual do campo.',
        },
        { name: 'label', type: 'string', description: 'Rótulo do campo.' },
        {
          name: 'hideLabel',
          type: 'boolean',
          default: 'false',
          description: 'Oculta o rótulo visualmente, mantendo-o acessível.',
        },
        { name: 'hint', type: 'React.ReactNode', description: 'Texto de apoio abaixo do campo.' },
        {
          name: 'error',
          type: 'React.ReactNode',
          description: 'Mensagem de erro; ativa o estado inválido e aria-invalid.',
        },
        {
          name: 'trailing',
          type: 'React.ReactNode',
          description: 'Ação alinhada à direita abaixo do campo.',
        },
        {
          name: 'block',
          type: 'boolean',
          default: 'true',
          description: 'Ocupa toda a largura do contêiner.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TextField> = {
  title: 'Instanooria/Componentes/TextField',
  component: TextField,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['filled', 'underline'],
      description: 'Forma visual do campo.',
    },
    label: { control: 'text', description: 'Rótulo do campo.' },
    hideLabel: { control: 'boolean', description: 'Oculta o rótulo visualmente.' },
    placeholder: { control: 'text', description: 'Texto exibido com o campo vazio.' },
    hint: { control: 'text', description: 'Texto de apoio abaixo do campo.' },
    error: { control: 'text', description: 'Mensagem de erro.' },
    disabled: { control: 'boolean', description: 'Desabilita o campo.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura disponível.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    variant: 'filled',
    label: 'Nome de usuário',
    hideLabel: true,
    placeholder: 'Nome de usuário',
    hint: '',
    error: '',
    disabled: false,
    block: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TextFieldDocumentationPage />,
};

/**
 * Playground com todas as propriedades do TextField expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TextField',
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{
        width: 360,
        padding: 32,
        borderRadius: 12,
        border: '1px solid #E4E8E9',
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
      }}
    >
      <TextField
        {...args}
        hint={args.hint || undefined}
        error={args.error || undefined}
      />
    </div>
  ),
};

/**
 * Réplica do formulário de login do frame oficial do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => {
    const LoginForm = () => {
      const [user, setUser] = useState('asad_khasanov');
      const [password, setPassword] = useState('');

      return (
        <div
          style={{
            width: 375,
            padding: '40px 20px',
            border: '1px solid #E4E8E9',
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
            display: 'grid',
            gap: 20,
            justifyItems: 'center',
          }}
        >
          <Logo height={44} />
          <div style={{ width: '100%', display: 'grid', gap: 10 }}>
            <TextField
              label="Nome de usuário"
              hideLabel
              placeholder="Nome de usuário"
              value={user}
              onChange={(event) => setUser(event.target.value)}
            />
            <TextField
              label="Senha"
              hideLabel
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              trailing={<Button variant="link">Esqueceu a senha?</Button>}
            />
          </div>
          <Button variant="primary" size="lg" block disabled={!user || !password}>
            Entrar
          </Button>
          <Button variant="facebook" leadingIcon={<Icon name="facebook" size={18} tone="inherit" />}>
            Entrar com Facebook
          </Button>
        </div>
      );
    };

    return <LoginForm />;
  },
};

/**
 * Matriz completa de variantes e estados.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ width: 320, display: 'grid', gap: 16 }}>
        <TextField label="Padrão" hideLabel placeholder="Nome de usuário" />
        <TextField label="Preenchido" hideLabel defaultValue="asad_khasanov" />
        <TextField label="Erro" hideLabel defaultValue="asad" error="Usuário não encontrado." />
        <TextField label="Desabilitado" hideLabel placeholder="Indisponível" disabled />
      </div>
      <div style={{ width: 340 }}>
        <TextField variant="underline" label="Nome" defaultValue="Jacob West" />
        <TextField variant="underline" label="Usuário" defaultValue="jacob_w" />
        <TextField variant="underline" label="Site" placeholder="Site" />
        <TextField variant="underline" label="Bio" defaultValue="Designer de produtos digitais." />
      </div>
    </div>
  ),
};
