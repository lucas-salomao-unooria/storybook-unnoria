import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { TextField } from '../../../src/unoovista/components/TextField';
import { Button } from '../../../src/unoovista/components/Button';
import { Icon } from '../../../src/unoovista/components/Icon';
import { Logo } from '../../../src/unoovista/components/Logo';
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

const BAR = '#716C98';

/**
 * Formulário de entrada, com campos controlados.
 */
const LoginForm: React.FC = () => {
  const [user, setUser] = useState('lucasMar');
  const [password, setPassword] = useState('');

  return (
    <div
      style={{
        width: 375,
        padding: '40px 20px',
        display: 'grid',
        gap: 20,
        justifyItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Logo height={44} />
      <div style={{ width: '100%', display: 'grid', gap: 16 }}>
        <TextField
          label="Nome de usuário"
          placeholder="Nome de usuário"
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
        <TextField
          label="Senha"
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
      <Button variant="social" leadingIcon={<Icon name="external" size="sm" tone="inherit" />}>
        Continuar com outra conta
      </Button>
    </div>
  );
};

/**
 * Página de documentação rica do componente TextField.
 */
const TextFieldDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Formulários"
      title="TextField"
      description="Campo de entrada em duas formas: a caixa arredondada, com o rótulo acima, e a linha, com o rótulo à esquerda. O rótulo é ligado ao campo, o contorno de controle mede 3:1 nos dois temas e o erro combina texto, glifo e contorno mais grosso."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Duas variantes para dois tipos de formulário."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🔐" title="filled — autenticação e cadastro">
        Caixa de 48px com raio de 12px e preenchimento suave. O rótulo fica acima e pode ser
        ocultado sem sair da árvore de acessibilidade (<code>hideLabel</code>).
      </UnvDocCard>
      <UnvDocCard icon="📝" title="underline — edição de perfil">
        Linha com rótulo de 96px à esquerda e traço inferior de controle. Empilhadas, formam a
        lista de campos da tela de edição.
      </UnvDocCard>
      <UnvDocCard icon="🏷️" title="Rótulo que nomeia o campo">
        O <code>&lt;label&gt;</code> e o <code>&lt;input&gt;</code> se ligam por{' '}
        <code>htmlFor</code>/<code>useId</code>: clicar no rótulo foca o campo e o leitor de tela
        anuncia o nome.
      </UnvDocCard>
      <UnvDocCard icon="⚠️" title="Erro que não depende da cor">
        Contorno de 2px em <code>brand-like</code>, glifo de alerta, prefixo &quot;Erro:&quot; para
        leitor de tela e <code>aria-invalid</code>.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="TextField"
      layout="Campo · 48px"
      specs={[
        { label: 'Altura', value: '48px' },
        { label: 'Raio (filled)', value: '12px (--unv-radius-m)' },
        { label: 'Preenchimento (filled)', value: '--unv-color-fill-field' },
        { label: 'Contorno', value: '1px · --unv-color-border-control (≥ 3:1)' },
        { label: 'Contorno em erro', value: '2px · --unv-color-brand-like' },
        { label: 'Foco', value: 'contorno em action-primary + anel de 2px' },
        { label: 'Texto', value: 'body-lg · Open Sans 400 · 16/24px' },
        { label: 'Rótulo', value: 'title-sm · Open Sans 600 · 14/20px' },
        { label: 'Rótulo (underline)', value: 'coluna de 96px' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Contorno de controle, não de decoração',
          detail:
            'o contorno usa --unv-color-border-control (contraste gráfico de 3:1 sobre a superfície, nos dois temas), e não --unv-color-border-default, que é só decorativo. O traço da variante underline segue a mesma regra.',
        },
        {
          subject: 'Erro por texto, glifo e espessura',
          detail:
            'o texto da mensagem fica em --unv-color-text-primary, que passa de 4,5:1 (o vermelho de alerta sobre a lavanda do fundo fica em cerca de 4,4:1); o vermelho vai no glifo e no contorno, que engrossa de 1px para 2px. O padding compensa a diferença para o campo não mexer.',
        },
        {
          subject: 'Rótulo visível por padrão',
          detail:
            'o rótulo acima do campo é o padrão do desenho; hideLabel o oculta apenas visualmente.',
        },
        {
          subject: 'Controlado só quando pedido',
          detail:
            'value e defaultValue chegam ao <input> exatamente como vieram (AGENTS.md, 4.5.1). O componente não guarda o texto, então um preenchimento automático que não passa por evento do React nunca é revertido para vazio. A estória "Texto preservado" guarda a regra.',
        },
        {
          subject: 'Glifo de erro',
          detail:
            'o glifo "error" existe no quadro de ícones da Plataforma Unooria (6024:2923) e é usado pelo nome da ligadura, sem desenho próprio.',
        },
        {
          subject: 'Tema herdado',
          detail: 'theme deixou de ter padrão "light": sem a prop, herda data-unv-theme do contêiner.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UnvDocAnatomy
      zones={[
        { name: 'Rótulo', role: 'Ligado ao campo por htmlFor; acima (filled) ou à esquerda (underline).', token: '--unv-font-title-sm-* · --unv-color-text-primary' },
        { name: 'Controle', role: 'O <input>, com contorno de controle e foco em ação.', token: '--unv-color-border-control · --unv-color-action-primary' },
        { name: 'Mensagem', role: 'Apoio (text-secondary) ou erro (glifo + texto), ligada por aria-describedby.', token: '--unv-font-caption-md-* · --unv-color-brand-like' },
        { name: 'Ação (trailing)', role: 'Slot abaixo, alinhado à direita (ex.: "Esqueceu a senha?").', token: '--unv-spacing-xs' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Padrão, preenchido, erro, desabilitado e com ação, nos dois temas."
    />
    <UnvDocStage label="filled · tema claro" surface="secondary" align="flex-start">
      <div style={{ width: 320, display: 'grid', gap: 16 }}>
        <TextField label="Padrão" placeholder="Nome de usuário" />
        <TextField label="Preenchido" defaultValue="lucasMar" hint="Só letras, números e sublinhado." />
        <TextField label="Com erro" defaultValue="jw" error="Use ao menos 3 caracteres." />
        <TextField label="Desabilitado" placeholder="Indisponível" disabled />
        <TextField
          label="Com ação"
          type="password"
          placeholder="Senha"
          trailing={<Button variant="link">Esqueceu a senha?</Button>}
        />
      </div>
    </UnvDocStage>
    <UnvDocStage label="filled · tema escuro" theme="dark" surface="secondary" align="flex-start">
      <div style={{ width: 320, display: 'grid', gap: 16 }}>
        <TextField label="Padrão" placeholder="Nome de usuário" />
        <TextField label="Preenchido" defaultValue="lucasMar" />
        <TextField label="Com erro" defaultValue="jw" error="Use ao menos 3 caracteres." />
      </div>
    </UnvDocStage>
    <UnvDocStage label="underline · claro e escuro" align="flex-start">
      <div style={{ width: 340 }}>
        <TextField variant="underline" label="Nome" defaultValue="Jacob West" />
        <TextField variant="underline" label="Site" placeholder="Site" />
        <TextField variant="underline" label="Telefone" defaultValue="+55 11" error="Número incompleto." />
        <TextField variant="underline" label="E-mail" defaultValue="jacob@unooria.com" disabled />
      </div>
    </UnvDocStage>
    <UnvDocStage label="underline · tema escuro" theme="dark" align="flex-start">
      <div style={{ width: 340 }}>
        <TextField variant="underline" label="Nome" defaultValue="Jacob West" />
        <TextField variant="underline" label="Telefone" defaultValue="+55 11" error="Número incompleto." />
      </div>
    </UnvDocStage>
    <UnvDocStage label="Formulário de entrada" surface="secondary" align="stretch" padding={0}>
      <LoginForm />
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Dar um label a todo campo; use hideLabel só quando o contexto já o mostrar.',
        'Escrever a mensagem de erro dizendo o que fazer, não só o que falhou.',
        'Passar value e onChange juntos, ou apenas defaultValue.',
        'Usar type, autoComplete e inputMode corretos para o navegador ajudar.',
      ]}
      donts={[
        'Trocar o rótulo pelo espaço reservado: ele some ao digitar.',
        'Sinalizar erro só pela cor do contorno.',
        'Passar value sem onChange, travando o campo.',
        'Empilhar underline e filled na mesma tela.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Preenchimento, contorno de controle, texto e erro trocam de degrau; o contorno mantém 3:1."
    />
    <UnvDocThemeSwitcher surface="secondary">
      {() => (
        <div style={{ width: 320, display: 'grid', gap: 16 }}>
          <TextField label="Nome de usuário" defaultValue="lucasMar" />
          <TextField label="E-mail" defaultValue="jacob@" error="Informe um e-mail completo." />
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UnvDocPropsTable
      title="TextField"
      rows={[
        { name: 'variant', type: "'filled' | 'underline'", default: "'filled'", description: 'Caixa com rótulo acima, ou linha com rótulo à esquerda.' },
        { name: 'label', type: 'string', description: 'Rótulo, ligado ao campo por htmlFor.' },
        { name: 'hideLabel', type: 'boolean', default: 'false', description: 'Oculta o rótulo só visualmente (filled).' },
        { name: 'hint', type: 'React.ReactNode', description: 'Texto de apoio abaixo do campo.' },
        { name: 'error', type: 'React.ReactNode', description: 'Mensagem de erro; ativa o estado inválido e substitui o hint.' },
        { name: 'trailing', type: 'React.ReactNode', description: 'Ação abaixo do campo, à direita.' },
        { name: 'block', type: 'boolean', default: 'true', description: 'Ocupa toda a largura do contêiner.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'id', type: 'string', description: 'Id do campo; sem valor, vem de useId.' },
        { name: 'value / defaultValue / onChange', type: 'string | function', description: 'Repassados ao <input>; só há campo controlado com value.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TextField> = {
  title: 'Unoovista/Componentes/TextField',
  component: TextField,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['filled', 'underline'], description: 'Forma do campo.' },
    label: { control: 'text', description: 'Rótulo do campo.' },
    hideLabel: { control: 'boolean', description: 'Oculta o rótulo só visualmente.' },
    hint: { control: 'text', description: 'Texto de apoio.' },
    error: { control: 'text', description: 'Mensagem de erro.' },
    trailing: {
      control: 'select',
      options: ['nenhuma', 'esqueceu a senha'],
      mapping: { nenhuma: undefined, 'esqueceu a senha': <Button variant="link">Esqueceu a senha?</Button> },
      description: 'Ação abaixo do campo.',
    },
    block: { control: 'boolean', description: 'Ocupa toda a largura.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    placeholder: { control: 'text', description: 'Espaço reservado.' },
    defaultValue: { control: 'text', description: 'Valor inicial (modo não controlado).' },
    disabled: { control: 'boolean', description: 'Desabilita o campo.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    variant: 'filled',
    label: 'Nome de usuário',
    hideLabel: false,
    hint: 'Só letras, números e sublinhado.',
    error: '',
    trailing: 'nenhuma' as never,
    block: true,
    placeholder: 'Nome de usuário',
    defaultValue: '',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TextFieldDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TextField',
  render: (args) => (
    <UnvDocStage surface="secondary" align="flex-start" theme={args.theme}>
      <div style={{ width: 340 }}>
        <TextField {...args} />
      </div>
    </UnvDocStage>
  ),
};

/**
 * Formulário de entrada com campos controlados.
 */
export const ExemploFormulario: Story = {
  name: '🎨 Exemplo do Formulário de Entrada',
  render: () => (
    <UnvDocStage surface="secondary" align="stretch" padding={0}>
      <LoginForm />
    </UnvDocStage>
  ),
};

/**
 * Matriz completa de variantes e estados.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UnvDocStage surface="secondary" align="flex-start" gap={32}>
      <div style={{ width: 320, display: 'grid', gap: 16 }}>
        <TextField label="Padrão" placeholder="Nome de usuário" />
        <TextField label="Preenchido" defaultValue="lucasMar" />
        <TextField label="Com erro" defaultValue="jw" error="Use ao menos 3 caracteres." />
        <TextField label="Desabilitado" placeholder="Indisponível" disabled />
      </div>
      <div style={{ width: 340 }}>
        <TextField variant="underline" label="Nome" defaultValue="Jacob West" />
        <TextField variant="underline" label="Usuário" defaultValue="lucasMar" />
        <TextField variant="underline" label="Site" placeholder="Site" />
        <TextField variant="underline" label="Telefone" defaultValue="+55 11" error="Número incompleto." />
      </div>
    </UnvDocStage>
  ),
};

/**
 * Estados: foco e erro nos dois temas.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UnvDocStage key={theme} label={`Tema ${theme === 'light' ? 'claro' : 'escuro'}`} theme={theme} surface="secondary" align="flex-start">
          <div style={{ width: 320, display: 'grid', gap: 16 }}>
            <TextField label="Padrão" placeholder="Nome de usuário" />
            <TextField label="Com erro" defaultValue="jw" error="Use ao menos 3 caracteres." />
            <TextField label="Desabilitado" placeholder="Indisponível" disabled />
          </div>
        </UnvDocStage>
      ))}
    </div>
  ),
};

/**
 * Regressão de a11y e da regra 4.5.1: o rótulo nomeia o campo e o texto que o
 * DOM recebeu (preenchimento automático) sobrevive a uma nova renderização.
 */
export const TextoPreservado: Story = {
  name: 'Rótulo e texto preservado',
  render: () => {
    const Probe: React.FC = () => {
      const [renders, setRenders] = useState(0);

      return (
        <div style={{ width: 320, display: 'grid', gap: 16, padding: 24, background: 'var(--unv-color-background-secondary)' }}>
          <TextField label="Senha" type="password" error={renders > 0 ? 'Confira a senha.' : undefined} />
          <Button variant="secondary" onClick={() => setRenders((value) => value + 1)}>
            Renderizar de novo
          </Button>
        </div>
      );
    };

    return <Probe />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByLabelText('Senha') as HTMLInputElement;

    // Preenchimento automático: escreve no DOM sem passar por evento do React.
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    setter?.call(field, 'segredo-salvo');

    await userEvent.click(canvas.getByRole('button', { name: 'Renderizar de novo' }));

    await expect(field.value).toBe('segredo-salvo');
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    await expect(field).toHaveAccessibleDescription(/Confira a senha/);
  },
};
