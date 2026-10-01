import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { TextField } from '../../../src/unoojornal/components/TextField';
import { Button } from '../../../src/unoojornal/components/Button';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocGrid,
  UjnDocCard,
  UjnDocSpecs,
  UjnDocDecisions,
  UjnDocAnatomy,
  UjnDocPractices,
  UjnDocStage,
  UjnDocThemeSwitcher,
  UjnDocPropsTable,
} from '../../../.storybook/components';
import { notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Largura de uma coluna de formulário de demonstração. */
const COLUNA: React.CSSProperties = { width: 360, display: 'grid', gap: 20 };

/**
 * Campo de demonstração controlado: o produto guarda o texto.
 */
const CampoControlado: React.FC = () => {
  const [texto, setTexto] = useState('');
  return (
    <div style={COLUNA}>
      <TextField
        label="Seu nome"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        hint="Aparece junto da sua carta."
      />
      <p style={notaEstilo} data-testid="eco">
        Texto guardado pelo produto: {texto || '(vazio)'}
      </p>
    </div>
  );
};

/**
 * Harness da regressão da seção 4.5.1: um campo NÃO controlado cuja página
 * re-renderiza. O texto que o navegador ou um gerenciador de senhas escreve
 * direto no nó, sem evento do React, não pode sumir.
 */
const CampoNaoControladoComRerender: React.FC = () => {
  const [rodadas, setRodadas] = useState(0);
  return (
    <div style={COLUNA}>
      <TextField
        label="E-mail para resposta"
        type="email"
        autoComplete="email"
        hint={`Re-renderizações: ${rodadas}`}
      />
      <Button variant="secondary" onClick={() => setRodadas((atual) => atual + 1)}>
        Forçar re-renderização
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
      badgeBrand="Unoojornal"
      category="Componentes • Formulário"
      title="TextField"
      description="Campo de texto de uma linha da carta à redação e da busca de autoria. Rótulo ligado por htmlFor, texto de apoio e erro ligados por aria-describedby, contorno de controle com contraste mínimo de 3:1 e anel de foco. Controlado só quando o consumidor passa value."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Nome, e-mail e qualquer texto curto."
    />
    <UjnDocGrid>
      <UjnDocCard icon="✉️" title="Carta à redação">
        Nome e e-mail de quem escreve. <code>required</code> liga o atributo nativo e acrescenta o
        asterisco ao rótulo.
      </UjnDocCard>
      <UjnDocCard icon="🏷️" title="Rótulo que nomeia">
        O <code>&lt;label&gt;</code> é ligado ao campo por <code>htmlFor</code> (<code>useId</code>, com o{' '}
        <code>id</code> do consumidor vencendo): clicar no rótulo foca o campo e o leitor de tela o lê.
      </UjnDocCard>
      <UjnDocCard icon="⚠️" title="Erro com texto e glifo">
        <code>error</code> liga <code>aria-invalid</code>, entra no <code>aria-describedby</code> e vem
        com glifo e a palavra &quot;Erro&quot; para leitor de tela — nunca só a cor.
      </UjnDocCard>
      <UjnDocCard icon="🔐" title="Texto que não some">
        Sem <code>value</code>, o texto mora no DOM. O preenchimento automático e os gerenciadores de
        senha sobrevivem a qualquer re-renderização (AGENTS.md, 4.5.1).
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UjnDocSpecs
      component="TextField"
      layout="Coluna · rótulo · campo de 44px · mensagem"
      specs={[
        { label: 'Contorno', value: '1px · --ujn-color-border-control (≥ 3:1)' },
        { label: 'Fundo', value: '--ujn-color-background-card' },
        { label: 'Raio', value: '--ujn-radius-s (4px)' },
        { label: 'Altura mínima', value: '--ujn-touch-target (44px)' },
        { label: 'Foco', value: 'contorno + 1px de sombra em --ujn-color-focus-ring (anel de 2px)' },
        { label: 'Erro', value: '--ujn-color-text-danger · glifo error' },
        { label: 'Rótulo', value: 'Label (14/20, 700)' },
        { label: 'Texto do campo', value: 'Body/Large' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Controlado só com value (regra 4.5.1)',
          detail:
            'o elemento nativo recebe value apenas se o consumidor passou value; senão, defaultValue. Medido na Plataforma Unooria (0.2.1): um campo que sempre repassava value voltava a vazio na primeira re-renderização depois de um preenchimento automático — "minha senha salva não funciona". A estória "Texto escrito sem evento sobrevive" guarda a regra.',
        },
        {
          subject: 'onChange é o do elemento nativo',
          detail:
            'o campo repassa o onChange nativo do <input>, que recebe o evento (event.target.value). O TextArea mantém a mesma assinatura, de modo que os dois se trocam sem reescrever o manipulador.',
        },
        {
          subject: 'Contorno em border-control, não em border-default',
          detail:
            'o limite de um campo é gráfico e precisa de 3:1 contra o fundo (WCAG 1.4.11). border-default e border-subtle são fios de separação e reprovariam. O hover escurece o contorno para icon-primary.',
        },
        {
          subject: 'Erro substitui o apoio',
          detail:
            'com error, a mensagem de erro ocupa o lugar do hint, e só uma das duas entra no aria-describedby. A palavra "Erro:" é lida por leitor de tela e o glifo error a acompanha para quem vê.',
        },
        {
          subject: 'Sem os atributos nativos de limite',
          detail:
            'o TextField não aceita maxLength nem minLength: medem unidades UTF-16 e cortariam um emoji ao meio. Para limite de caracteres, use o TextArea, que conta code points.',
        },
        {
          subject: 'Desabilitado sem opacidade',
          detail:
            'o campo desabilitado troca fundo e texto para background-subtle e text-muted, em vez de esmaecer com opacity: o contorno e o texto continuam legíveis.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Cada zona do campo." />
    <UjnDocStage surface="card" align="flex-start" padding={16}>
      <div style={COLUNA}>
        <TextField label="Seu nome" required hint="Aparece junto da sua carta." iconStart="person" />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UjnDocAnatomy
          zones={[
            { name: 'Rótulo', role: 'label com htmlFor; o asterisco é decorativo.', token: 'Label' },
            { name: 'Glifo', role: 'Ícone opcional à esquerda (iconStart).', token: '--ujn-color-icon-secondary' },
            { name: 'Campo', role: '<input> com contorno de controle.', token: '--ujn-color-border-control' },
            { name: 'Anel de foco', role: 'Contorno + sombra de 1px.', token: '--ujn-color-focus-ring' },
            { name: 'Mensagem', role: 'Apoio ou erro, ligada por aria-describedby.', token: 'Caption' },
          ]}
        />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada campo é o componente real."
    />
    <UjnDocStage label="Composições" surface="card" align="flex-start" padding={16}>
      <div style={COLUNA}>
        <TextField label="Padrão" placeholder="Digite aqui" />
        <TextField label="Com texto de apoio" hint="Aparece junto da sua carta." defaultValue="Beatriz Salgado" />
        <TextField label="Obrigatório" required />
        <TextField label="Com glifo" iconStart="search" placeholder="Buscar autoria" />
      </div>
      <div style={COLUNA}>
        <TextField label="E-mail" type="email" defaultValue="beatriz@anisiobastos.escola.br" />
        <TextField label="Com erro" defaultValue="beatriz@" error="Informe um e-mail completo, como nome@escola.br." />
        <TextField label="Desabilitado" defaultValue="Somente leitura" disabled />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como compor um campo." />
    <UjnDocPractices
      dos={[
        'Dar sempre um label: é o nome acessível do campo.',
        'Usar o type certo (email, tel, url) para o teclado e a validação do navegador.',
        'Dizer no erro o que corrigir, não só que está errado.',
        'Deixar o campo não controlado quando o produto só lê o texto no envio.',
        'Passar autoComplete (name, email) para o preenchimento automático funcionar.',
      ]}
      donts={[
        'Trocar o rótulo por placeholder: ele some ao digitar e não nomeia o campo.',
        'Passar value sem onChange: o campo fica travado.',
        'Indicar o erro só pela cor do contorno.',
        'Usar o TextField para texto longo — use o TextArea.',
        'Passar maxLength: o campo não conta code points, o TextArea sim.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Campo, contorno e mensagens acompanham o tema."
    />
    <UjnDocThemeSwitcher surface="card" padding={16}>
      {(tema) => (
        <div key={tema} style={COLUNA}>
          <TextField label="Seu nome" required hint="Aparece junto da sua carta." defaultValue="Beatriz Salgado" iconStart="person" />
          <TextField label="E-mail" error="Informe um e-mail completo." defaultValue="beatriz@" />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UjnDocPropsTable
      title="TextField"
      rows={[
        { name: 'label', type: 'ReactNode', description: 'Rótulo e nome acessível. Obrigatório.' },
        { name: 'hint', type: 'ReactNode', description: 'Texto de apoio abaixo do campo.' },
        { name: 'error', type: 'ReactNode', description: 'Mensagem de erro; substitui o apoio e liga aria-invalid.' },
        { name: 'value', type: 'string', description: 'Texto (modo controlado). Só vai ao elemento quando definido.' },
        { name: 'defaultValue', type: 'string', description: 'Texto inicial (modo não controlado).' },
        { name: 'onChange', type: 'ChangeEventHandler<HTMLInputElement>', description: 'A cada alteração, com o evento nativo.' },
        { name: 'iconStart', type: 'UjnIconName', description: 'Glifo do registro à esquerda, dentro do campo.' },
        { name: 'type', type: 'HTMLInputTypeAttribute', default: "'text'", description: 'Tipo do <input>.' },
        { name: 'required', type: 'boolean', description: 'Liga o atributo nativo e acrescenta o asterisco ao rótulo.' },
        { name: 'id', type: 'string', default: 'useId()', description: 'Id do campo; o do consumidor vence.' },
        { name: 'disabled', type: 'boolean', description: 'Campo desabilitado.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className / style', type: 'string / CSSProperties', description: 'Classe e estilo do invólucro.' },
        { name: '...input', type: 'React.InputHTMLAttributes<HTMLInputElement>', description: 'Demais atributos (name, placeholder, autoComplete, aria-*…), repassados ao <input> (com a ref). maxLength e minLength não são aceitos.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TextField> = {
  title: 'Unoojornal/Componentes/TextField',
  component: TextField,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo e nome acessível.' },
    hint: { control: 'text', description: 'Texto de apoio.' },
    error: { control: 'text', description: 'Mensagem de erro.' },
    defaultValue: { control: 'text', description: 'Texto inicial (não controlado).' },
    value: { control: false, description: 'Texto controlado; use na estória de campo controlado.' },
    placeholder: { control: 'text', description: 'Texto do campo vazio.' },
    iconStart: { control: 'text', description: 'Glifo do registro à esquerda (ex.: search, person, mail).' },
    type: { control: 'select', options: ['text', 'email', 'tel', 'url', 'search', 'password'], description: 'Tipo do <input>.' },
    required: { control: 'boolean', description: 'Campo obrigatório.' },
    disabled: { control: 'boolean', description: 'Campo desabilitado.' },
    id: { control: 'text', description: 'Id do campo (padrão: useId).' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'Seu nome',
    hint: 'Aparece junto da sua carta.',
    placeholder: 'Nome e sobrenome',
    type: 'text',
    required: false,
    disabled: false,
    theme: 'light',
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
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TextField',
  render: (args) => (
    <div style={{ ...COLUNA, padding: 16, background: 'var(--ujn-color-background-card)' }} data-ujn-theme={args.theme}>
      <TextField {...args} />
    </div>
  ),
};

/**
 * Composição realista: a identificação de quem escreve à redação.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: identificação da carta',
  render: () => (
    <form
      onSubmit={(evento) => evento.preventDefault()}
      aria-label="Identificação"
      style={{ ...COLUNA, padding: 16, background: 'var(--ujn-color-background-card)' }}
    >
      <TextField label="Seu nome" required autoComplete="name" iconStart="person" />
      <TextField label="E-mail para resposta" type="email" autoComplete="email" iconStart="mail" hint="Não será publicado." />
    </form>
  ),
};

/**
 * Tipos de campo com glifo.
 */
export const Tamanhos: Story = {
  name: 'Tipos de campo',
  render: () => (
    <div style={{ ...COLUNA, padding: 16, background: 'var(--ujn-color-background-card)' }}>
      <TextField label="Texto" placeholder="Nome e sobrenome" iconStart="person" />
      <TextField label="E-mail" type="email" placeholder="nome@escola.br" iconStart="mail" />
      <TextField label="Busca" type="search" placeholder="Buscar autoria" iconStart="search" />
      <TextField label="Endereço" type="url" placeholder="https://" iconStart="link" />
    </div>
  ),
};

/**
 * Padrão, com apoio, obrigatório e com erro.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ ...COLUNA, padding: 16, background: 'var(--ujn-color-background-card)' }}>
      <TextField label="Padrão" placeholder="Digite aqui" />
      <TextField label="Com apoio" hint="Aparece junto da sua carta." />
      <TextField label="Obrigatório" required />
      <TextField label="Com erro" defaultValue="beatriz@" error="Informe um e-mail completo, como nome@escola.br." />
    </div>
  ),
};

/**
 * Vazio, preenchido, com erro e desabilitado (o foco aparece ao tocar num campo).
 */
export const Estados: Story = {
  render: () => (
    <div style={{ ...COLUNA, padding: 16, background: 'var(--ujn-color-background-card)' }}>
      <TextField label="Vazio" placeholder="Digite aqui" />
      <TextField label="Preenchido" defaultValue="Beatriz Salgado" />
      <TextField label="Com erro" defaultValue="beatriz@" error="Informe um e-mail completo." />
      <TextField label="Desabilitado" defaultValue="Somente leitura" disabled />
    </div>
  ),
};

/**
 * O campo nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div
          key={tema}
          data-ujn-theme={tema}
          style={{ ...COLUNA, padding: 16, background: 'var(--ujn-color-background-card)' }}
        >
          <p style={notaEstilo}>{tema === 'light' ? 'Tema claro' : 'Tema escuro'}</p>
          <TextField label="Seu nome" required hint="Aparece junto da sua carta." defaultValue="Beatriz Salgado" iconStart="person" />
          <TextField label="E-mail" defaultValue="beatriz@" error="Informe um e-mail completo." />
        </div>
      ))}
    </div>
  ),
};

/**
 * Digitar, clicar no rótulo para focar e ler o texto de apoio como descrição.
 */
export const DigitarComRotulo: Story = {
  name: 'Digitar e ligar o rótulo',
  render: () => (
    <div style={COLUNA}>
      <TextField label="Seu nome" hint="Aparece junto da sua carta." />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox', { name: 'Seu nome' });

    // O rótulo é ligado ao campo: clicar nele leva o foco.
    await userEvent.click(tela.getByText('Seu nome'));
    await expect(campo).toHaveFocus();

    await userEvent.type(campo, 'Beatriz Salgado');
    await expect(campo).toHaveValue('Beatriz Salgado');
    await expect(campo).toHaveAccessibleDescription('Aparece junto da sua carta.');
  },
};

/**
 * O erro liga aria-invalid e entra na descrição, com a palavra "Erro".
 */
export const ErroAcessivel: Story = {
  name: 'Erro acessível',
  render: () => (
    <div style={COLUNA}>
      <TextField label="E-mail" hint="Este apoio não aparece." error="Informe um e-mail completo." defaultValue="beatriz@" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const campo = within(canvasElement).getByRole('textbox', { name: 'E-mail' });
    await expect(campo).toBeInvalid();
    await expect(campo).toHaveAccessibleDescription('Erro: Informe um e-mail completo.');
  },
};

/**
 * Regressão da seção 4.5.1: um campo não controlado guarda o texto no DOM. O que
 * o navegador escreve sem evento sobrevive a uma re-renderização forçada.
 */
export const TextoSemEventoSobrevive: Story = {
  name: 'Texto escrito sem evento sobrevive',
  render: () => <CampoNaoControladoComRerender />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox', { name: 'E-mail para resposta' }) as HTMLInputElement;

    await userEvent.type(campo, 'beatriz@anisiobastos.escola.br');

    // Preenchimento automático: escreve direto no nó, sem passar pelo React.
    campo.value = 'preenchido@automaticamente.br';

    await userEvent.click(tela.getByRole('button', { name: 'Forçar re-renderização' }));
    await userEvent.click(tela.getByRole('button', { name: 'Forçar re-renderização' }));

    await expect(tela.getByText('Re-renderizações: 2')).toBeInTheDocument();
    // A re-renderização não reconcilia o campo de volta para vazio.
    await expect(campo).toHaveValue('preenchido@automaticamente.br');
  },
};

/**
 * Com `value`, o produto guarda o texto e o campo o acompanha.
 */
export const Controlado: Story = {
  name: 'Controlado com value',
  render: () => <CampoControlado />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox', { name: 'Seu nome' });

    await userEvent.type(campo, 'Mateus');
    await expect(campo).toHaveValue('Mateus');
    await expect(tela.getByTestId('eco')).toHaveTextContent('Texto guardado pelo produto: Mateus');
  },
};
