import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { TextField } from '../../../src/unooria/components/TextField/TextField';
import { PasswordInput } from '../../../src/unooria/components/TextField/PasswordInput';
import { SearchInput } from '../../../src/unooria/components/TextField/SearchInput';
import { TextArea } from '../../../src/unooria/components/TextField/TextArea';
import { Button } from '../../../src/unooria/components/Button/Button';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/TextField/TextField.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Formulário funcional de demonstração
 */
const RegistrationFormDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
  });

  const isEmailValid = !formData.email || formData.email.includes('@');
  const isNameValid = !formData.name || formData.name.length >= 3;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E4E8E9',
        padding: '32px',
        maxWidth: '540px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#22272A' }}>
          Cadastro de Novo Usuário
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
          Preencha os campos abaixo para criar sua conta na plataforma.
        </p>
      </div>

      <TextField
        label="Nome Completo"
        required
        placeholder="Ex: Ana Silva"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={!isNameValid ? 'O nome deve ter pelo menos 3 caracteres.' : undefined}
        success={formData.name.length >= 3 ? 'Nome válido.' : undefined}
        leftIcon="person"
        clearable
      />

      <TextField
        label="E-mail Corporativo"
        required
        type="email"
        placeholder="nome@empresa.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={!isEmailValid ? 'Insira um endereço de e-mail válido.' : undefined}
        success={formData.email.includes('@') && formData.email.length > 5 ? 'E-mail verificado.' : undefined}
        leftIcon="mail"
        clearable
      />

      <PasswordInput
        label="Senha de Acesso"
        required
        placeholder="Mínimo 8 caracteres"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        helperText="A senha deve conter letras, números e caracteres especiais."
        leftIcon="lock"
      />

      <TextArea
        label="Biografia / Apresentação"
        placeholder="Conte um pouco sobre suas experiências..."
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        maxLength={150}
        rows={3}
      />

      <div style={{ marginTop: '8px' }}>
        <Button
          variant="primary"
          onClick={() => {
            alert('Formulário validado com sucesso!');
          }}
          disabled={!formData.name || !formData.email || !formData.password}
        >
          Finalizar Cadastro
        </Button>
      </div>
    </div>
  );
};

/**
 * Página principal de documentação rica do componente TextField (Padrão Ouro)
 */
const TextFieldDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Formulários & Entradas"
        title="TextField"
        description="A família de campos de entrada de texto do Design System Unooria permite aos usuários inserir, editar e buscar informações com clareza visual, validação em tempo real e acessibilidade total."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 6107:729)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 6107:729)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              As 4 famílias de campos de texto do Unooria: Text Input, Password Input, Search Input e Text Area.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=6107-729&m=dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#F1F5F9',
              color: '#0086FF',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid #E2E8F0',
            }}
          >
            <span>Abrir no Figma (Dev Mode)</span>
            <span>↗</span>
          </a>
        </div>

        {/* CONTAINER DO FIGMA */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid #E4E8E9',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          {/* 1. TEXT INPUT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '16px', color: '#475157' }}>Components</span>
              <h3 style={{ fontSize: '32px', fontWeight: 700, color: '#22272A', margin: '0 0 8px 0' }}>
                Text input
              </h3>
              <p style={{ fontSize: '13px', color: '#475157', lineHeight: 1.6, margin: 0 }}>
                <strong>O que são:</strong> Um text input é um campo de entrada que permite ao usuário inserir texto em uma única linha, amplamente utilizado em formulários para coletar informações como nomes, e-mails e telefones.
              </p>
            </div>
            <div style={{ maxWidth: '400px' }}>
              <TextField
                label="Input Label"
                required
                helperIcon
                placeholder="Placeholder"
                defaultValue="Example Text"
                rightIcon="add"
              />
            </div>
          </div>

          {/* 2. PASSWORD INPUT */}
          <div style={{ borderTop: '1px solid #E4E8E9', paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '16px', color: '#475157' }}>Components</span>
              <h3 style={{ fontSize: '32px', fontWeight: 700, color: '#22272A', margin: '0 0 8px 0' }}>
                Password input
              </h3>
              <p style={{ fontSize: '13px', color: '#475157', lineHeight: 1.6, margin: 0 }}>
                <strong>O que são:</strong> Um password input oculta os caracteres digitados por motivos de segurança, substituindo-os por pontos, com recurso de alternância de visibilidade (ícone de olho).
              </p>
            </div>
            <div style={{ maxWidth: '400px' }}>
              <PasswordInput
                label="Input Label"
                required
                helperIcon
                defaultValue="MinhaSenha123"
              />
            </div>
          </div>

          {/* 3. SEARCH INPUT */}
          <div style={{ borderTop: '1px solid #E4E8E9', paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '16px', color: '#475157' }}>Components</span>
              <h3 style={{ fontSize: '32px', fontWeight: 700, color: '#22272A', margin: '0 0 8px 0' }}>
                Search input
              </h3>
              <p style={{ fontSize: '13px', color: '#475157', lineHeight: 1.6, margin: 0 }}>
                <strong>O que são:</strong> Um search input permite ao usuário digitar palavras-chave e realizar buscas rápidas no sistema, acompanhado de ícone de lupa e suporte a autocompletar.
              </p>
            </div>
            <div style={{ maxWidth: '400px' }}>
              <SearchInput
                label="Input Label"
                required
                helperIcon
                placeholder="Buscar cursos..."
              />
            </div>
          </div>

          {/* 4. TEXT AREA */}
          <div style={{ borderTop: '1px solid #E4E8E9', paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '16px', color: '#475157' }}>Components</span>
              <h3 style={{ fontSize: '32px', fontWeight: 700, color: '#22272A', margin: '0 0 8px 0' }}>
                Text area
              </h3>
              <p style={{ fontSize: '13px', color: '#475157', lineHeight: 1.6, margin: 0 }}>
                <strong>O que são:</strong> Uma text area permite a inserção de textos longos ou múltiplas linhas de conteúdo (comentários, observações) com limitador dinâmico de caracteres.
              </p>
            </div>
            <div style={{ maxWidth: '400px' }}>
              <TextArea
                label="Input Label"
                required
                helperIcon
                placeholder="Placeholder"
                maxLength={100}
                rows={3}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: MATRIZ DE TAMANHOS (XS, SM, MD, LG)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Escala Oficial de Tamanhos"
          description="4 alturas do Figma para atender desde barras densas até formulários hero."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF', marginBottom: '8px', display: 'block' }}>
              XS • 32px
            </span>
            <TextField size="xs" label="Tamanho XS" placeholder="Altura 32px" />
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF', marginBottom: '8px', display: 'block' }}>
              SM • 40px
            </span>
            <TextField size="sm" label="Tamanho SM" placeholder="Altura 40px" />
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF', marginBottom: '8px', display: 'block' }}>
              MD • 48px (Padrão)
            </span>
            <TextField size="md" label="Tamanho MD" placeholder="Altura 48px" />
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF', marginBottom: '8px', display: 'block' }}>
              LG • 56px
            </span>
            <TextField size="lg" label="Tamanho LG" placeholder="Altura 56px" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: FORMULÁRIO DE EXEMPLO COM VALIDAÇÃO
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Formulário de Exemplo com Validação"
          description="Demonstração prática de formulário combinando TextField, PasswordInput e TextArea."
        />

        <RegistrationFormDemo />
      </section>

      {/* =========================================================================
          SEÇÃO 4: SUPORTE A TEMAS (LIGHT & DARK)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <UnooriaDocSectionHeader
            title="Suporte a Temas (Light & Dark Mode)"
            description="Contraste adaptativo transparente no fundo escuro (#22272A) e claro (#FFFFFF)."
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTheme('light')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: activeTheme === 'light' ? '1px solid #0086FF' : '1px solid #CBD5E1',
                backgroundColor: activeTheme === 'light' ? '#0086FF' : '#FFFFFF',
                color: activeTheme === 'light' ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Light Mode
            </button>
            <button
              onClick={() => setActiveTheme('dark')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: activeTheme === 'dark' ? '1px solid #7FA5E2' : '1px solid #CBD5E1',
                backgroundColor: activeTheme === 'dark' ? '#22272A' : '#FFFFFF',
                color: activeTheme === 'dark' ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Dark Mode
            </button>
          </div>
        </div>

        <div
          style={{
            backgroundColor: activeTheme === 'dark' ? '#181C1E' : '#F8FAFC',
            borderRadius: '16px',
            border: activeTheme === 'dark' ? '1px solid #383E41' : '1px solid #E4E8E9',
            padding: '32px',
            maxWidth: '520px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            transition: 'all 0.2s ease',
          }}
        >
          <TextField
            theme={activeTheme}
            label="Nome de Usuário"
            placeholder="Digite seu nome..."
            leftIcon="person"
          />
          <PasswordInput
            theme={activeTheme}
            label="Senha"
            placeholder="Digite sua senha..."
            leftIcon="lock"
          />
          <SearchInput
            theme={activeTheme}
            label="Buscar Módulos"
            placeholder="Pesquisar na plataforma..."
          />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: BOAS PRÁTICAS DE USO (DO & DON'T)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Diretrizes para garantir clareza e acessibilidade em formulários."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* DO */}
          <div
            style={{
              backgroundColor: '#F0FDF4',
              borderRadius: '16px',
              border: '1px solid #BBF7D0',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16A34A', fontWeight: 700, fontSize: '16px' }}>
              <span>✓</span> O QUE FAZER (DO)
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534', fontSize: '14px', lineHeight: 1.6 }}>
              <li>
                <strong>Sempre inclua labels visíveis:</strong> O placeholder não substitui um rótulo permanente.
              </li>
              <li>
                <strong>Indique campos obrigatórios com o asterisco (*):</strong> Facilita o preenchimento sem erros.
              </li>
              <li>
                <strong>Forneça mensagens de erro claras e orientadas à solução:</strong> Ex: &quot;Insira um e-mail válido&quot;.
              </li>
            </ul>
          </div>

          {/* DON'T */}
          <div
            style={{
              backgroundColor: '#FEF2F2',
              borderRadius: '16px',
              border: '1px solid #FECACA',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontWeight: 700, fontSize: '16px' }}>
              <span>✕</span> O QUE EVITAR (DON&apos;T)
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#991B1B', fontSize: '14px', lineHeight: 1.6 }}>
              <li>
                <strong>Não use o placeholder como instrução complexa:</strong> Ele desaparece assim que o usuário digita.
              </li>
              <li>
                <strong>Não oculte mensagens de erro em formulários longos:</strong> Exiba o feedback abaixo do campo com falha.
              </li>
              <li>
                <strong>Não desabilite o toggle de visibilidade em senhas:</strong> Permite ao usuário conferir o que digitou.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof TextField> = {
  title: 'Plataforma Unooria/Componentes/TextField',
  component: TextField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamanho visual do campo',
      defaultValue: 'md',
    },
    label: {
      control: 'text',
      description: 'Rótulo superior',
    },
    placeholder: {
      control: 'text',
      description: 'Texto do placeholder',
    },
    required: {
      control: 'boolean',
      description: 'Campo obrigatório (*)',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitado',
      defaultValue: false,
    },
    clearable: {
      control: 'boolean',
      description: 'Botão de limpar texto',
      defaultValue: false,
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro',
    },
    success: {
      control: 'text',
      description: 'Mensagem de sucesso',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual',
      defaultValue: 'light',
    },
  },
  args: {
    size: 'md',
    label: 'Nome Completo',
    placeholder: 'Digite seu nome...',
    required: true,
    disabled: false,
    clearable: true,
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
 * Playground interativo do TextField
 */
export const PlaygroundTextField: Story = {
  name: '🕹️ 1. Playground TextField',
  render: (args) => (
    <div style={{ maxWidth: '420px', padding: '24px', backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF', borderRadius: '16px' }}>
      <TextField {...args} />
    </div>
  ),
};

/**
 * Playground do PasswordInput
 */
export const PlaygroundPasswordInput: Story = {
  name: '🕹️ 2. Playground PasswordInput',
  render: (args) => (
    <div style={{ maxWidth: '420px', padding: '24px', backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF', borderRadius: '16px' }}>
      <PasswordInput
        label="Senha"
        required
        placeholder="Digite sua senha..."
        helperText="Mínimo de 8 caracteres."
        leftIcon="lock"
        theme={args.theme}
        size={args.size}
      />
    </div>
  ),
};

/**
 * Playground do SearchInput
 */
export const PlaygroundSearchInput: Story = {
  name: '🕹️ 3. Playground SearchInput',
  render: (args) => (
    <div style={{ maxWidth: '420px', padding: '24px', backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF', borderRadius: '16px' }}>
      <SearchInput
        label="Buscar Cursos"
        placeholder="Pesquisar na plataforma..."
        theme={args.theme}
        size={args.size}
      />
    </div>
  ),
};

/**
 * Playground do TextArea
 */
export const PlaygroundTextArea: Story = {
  name: '🕹️ 4. Playground TextArea',
  render: (args) => (
    <div style={{ maxWidth: '420px', padding: '24px', backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF', borderRadius: '16px' }}>
      <TextArea
        label="Descrição"
        placeholder="Insira detalhes adicionais..."
        maxLength={120}
        rows={3}
        theme={args.theme}
      />
    </div>
  ),
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 6107:729).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 6107:729)',
  render: () => (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '48px',
        border: '1px solid #E4E8E9',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        maxWidth: '540px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <TextField
        label="Input Label"
        required
        helperIcon
        placeholder="Placeholder"
        defaultValue="Example Text"
        rightIcon="add"
      />

      <PasswordInput
        label="Password Label"
        required
        helperIcon
        defaultValue="MinhaSenha123"
      />

      <SearchInput
        label="Search Label"
        required
        helperIcon
        placeholder="Buscar..."
      />

      <TextArea
        label="Textarea Label"
        required
        helperIcon
        placeholder="Placeholder"
        maxLength={100}
        rows={3}
      />
    </div>
  ),
};

/**
 * REDE CONTRA REGRESSÃO — o campo sem `value` não pode perder o que foi
 * escrito nele por fora do React.
 *
 * O defeito que esta estória guarda (medido em 11/09/2026, na 0.2.1): o
 * `<input>` recebia `value` sempre, mesmo sem o consumidor pedir, e o texto
 * passava a viver num estado que só o `onChange` do React alimenta. Quem
 * escreve no DOM sem disparar evento do React — o preenchimento automático do
 * navegador e todo gerenciador de senhas — era apagado na primeira
 * re-renderização. Na tela de entrada do LMS isso mandava a senha VAZIA ao
 * servidor, e a pessoa via "senha incorreta" tendo preenchido certo.
 *
 * O teste imita exatamente isso: escreve no nó, força uma re-renderização
 * clicando no olho, e cobra que o texto continue lá. Sem esta rede o defeito
 * volta calado — ele não quebra nenhum outro teste.
 */
export const NaoControladoSobrevivePreenchimentoExterno: Story = {
  name: 'Campo não controlado preserva texto escrito por fora',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <TextField label="Usuário" name="usuario" autoComplete="username" />
      <PasswordInput label="Senha" name="senha" autoComplete="current-password" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const usuario = canvasElement.querySelector<HTMLInputElement>('input[name="usuario"]')!;
    const senha = canvasElement.querySelector<HTMLInputElement>('input[name="senha"]')!;

    /* Sem `value` vindo do consumidor, o elemento não pode carregar o
       atributo: é isso que deixa o DOM ser o dono do texto. */
    await expect(usuario).not.toHaveAttribute('value');
    await expect(senha).not.toHaveAttribute('value');

    /* Escrita SEM evento do React — o que o gerenciador de senhas faz. */
    usuario.value = 'prof.horizonte';
    senha.value = 'senha-salva-123';

    /* Uma re-renderização qualquer. O olho é a mais barata de provocar. */
    await userEvent.click(tela.getByRole('button', { name: 'Exibir senha' }));

    await expect(usuario.value).toBe('prof.horizonte');
    await expect(senha.value).toBe('senha-salva-123');
  },
};

/**
 * O rótulo NOMEIA o campo (`htmlFor` + `id`). Antes o `<label>` era texto
 * solto ao lado do campo: aparecia na tela, o leitor de tela anunciava "caixa
 * de edição" sem nome, e clicar nele não focava nada. Pedido da A Seleção
 * (exp07ef1b), que compensava com `aria-label`.
 */
export const RotuloNomeiaOCampo: Story = {
  name: 'O rótulo nomeia o campo',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <TextField label="Nome da turma" name="turma" />
      <TextArea label="Sua reflexão" name="reflexao" maxLength={500} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const turma = tela.getByRole('textbox', { name: 'Nome da turma' });
    const reflexao = tela.getByRole('textbox', { name: 'Sua reflexão' });

    await userEvent.click(tela.getByText('Sua reflexão'));
    await expect(reflexao).toHaveFocus();
    await userEvent.click(tela.getByText('Nome da turma'));
    await expect(turma).toHaveFocus();
  },
};

