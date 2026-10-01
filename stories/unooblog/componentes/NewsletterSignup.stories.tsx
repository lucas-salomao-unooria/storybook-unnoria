import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { NewsletterSignup } from '../../../src/unooblog/components/NewsletterSignup';
import type { UblNewsletterStatus } from '../../../src/unooblog/components/NewsletterSignup';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocPractices,
  UblDocStage,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';
import { ublSite } from '../fixtures';

const BAR = '#716C98';

/** Espião das estórias de interação. */
const subscribeSpy = fn();

const DESCRICAO = `Um e-mail por semana com os novos posts do ${ublSite.name}. Sem propaganda, e você sai quando quiser.`;

/**
 * Cartão cujo estado de inscrição é guardado pelo produto: o e-mail
 * `falha@exemplo.com` simula uma recusa do servidor.
 */
const InscricaoDemo: React.FC<{
  onSubscribe?: (email: string) => void;
  initial?: UblNewsletterStatus;
  width?: number | string;
}> = ({ onSubscribe, initial = 'idle', width = 'min(640px, 100%)' }) => {
  const [status, setStatus] = useState<UblNewsletterStatus>(initial);
  return (
    <div style={{ width }}>
      <NewsletterSignup
        description={DESCRICAO}
        status={status}
        onSubscribe={(email) => {
          onSubscribe?.(email);
          setStatus(email === 'falha@exemplo.com' ? 'error' : 'success');
        }}
      />
    </div>
  );
};

/**
 * Página de documentação rica do componente NewsletterSignup.
 */
const NewsletterSignupDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Feed"
      title="NewsletterSignup"
      description="Cartão de inscrição na newsletter: título, descrição, campo de e-mail e botão. Três estados — idle, success e error — com validação de formato acessível e um campo que nunca é controlado, para o preenchimento automático do navegador valer."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="No fim de um post, no rodapé do site e na página inicial."
    />
    <UblDocGrid>
      <UblDocCard icon="✉️" title="Três estados">
        <code>idle</code> aguarda o e-mail; <code>success</code> troca o formulário pela
        confirmação; <code>error</code> mostra a falha no campo.
      </UblDocCard>
      <UblDocCard icon="✅" title="Erro de formato acessível">
        Um e-mail vazio ou sem forma de e-mail liga <code>aria-invalid</code>, mostra a mensagem
        com glifo e texto e devolve o foco ao campo. O formulário usa <code>noValidate</code>: a
        mensagem é a do blog, não a do navegador.
      </UblDocCard>
      <UblDocCard icon="📣" title="Confirmação anunciada">
        A região <code>aria-live</code> já existe, vazia, antes da troca; é isso que faz o leitor de
        tela anunciar “Inscrição confirmada”.
      </UblDocCard>
      <UblDocCard icon="🔑" title="Campo não controlado">
        O texto mora no DOM e é lido do nó no envio. Preenchimento automático e gerenciadores de
        senha escrevem sem evento do React — e não perdem o e-mail numa re-renderização.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="NewsletterSignup"
      layout="Cartão · largura do contêiner"
      specs={[
        { label: 'Superfície', value: 'background-card (lavanda) + fio de 1px · raio xl (24px) · recuo de 24px' },
        { label: 'Disposição', value: 'coluna abaixo de 640px de contêiner; texto à esquerda e formulário à direita a partir de 640px' },
        { label: 'Título', value: 'heading-3 · 24/34px · 700 · <h2> (nível ajustável)' },
        { label: 'Descrição', value: 'body-lg · 16/24px · text-secondary' },
        { label: 'Campo', value: 'TextField type=email · autocomplete=email · contorno em border-control' },
        { label: 'Botão', value: 'Button primary md · largura total do formulário · type=submit' },
        { label: 'Confirmação', value: 'fill-success + glifo checkCircle em status-success + texto em text-primary' },
        { label: 'Formato válido', value: 'algo@algo.algo, sem espaços (validação mínima)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'O campo nunca é controlado',
          detail:
            'sem value, quem guarda o texto é o DOM (AGENTS.md, 4.5.1): o e-mail é lido do nó no envio, via ref. A estória guarda a regra — um texto escrito direto no nó sobrevive à re-renderização do erro e é o que sai em onSubscribe.',
        },
        {
          subject: 'noValidate e mensagem própria',
          detail:
            'o balão nativo do navegador não é estilizável nem traduzido de forma consistente. A validação mínima (algo@algo.algo) mostra a mensagem no campo, com aria-invalid, e devolve o foco a ele.',
        },
        {
          subject: 'Região viva antes da troca',
          detail:
            'a região role="status" existe vazia desde a primeira renderização; a mensagem de sucesso entra nela. Uma região criada junto com o texto não é anunciada pela maioria dos leitores.',
        },
        {
          subject: 'Erro do servidor no campo',
          detail:
            'em status="error", errorMessage aparece sob o campo como o erro de formato, e o campo mantém o que a pessoa digitou para ela corrigir e tentar de novo.',
        },
        {
          subject: 'Verde de sucesso só no glifo',
          detail:
            'a mensagem de confirmação usa status-success no glifo (gráfico ≥ 3:1) e text-primary no texto (≥ 4,5:1): a cor de estado nunca carrega texto sozinha.',
        },
        {
          subject: 'Botão de largura total',
          detail:
            'no formulário em coluna, campo e botão têm a mesma largura: o alvo é o maior possível no toque e o botão não flutua ao lado de um erro de altura variável.',
        },
        {
          subject: 'Client Component',
          detail: "usa hooks (estado do erro de formato, ref do campo) e repassa funções; por isso começa com 'use client'.",
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocStage label="Cartão em contêiner de 640px" surface="page" align="stretch" direction="column" width={660}>
      <NewsletterSignup description={DESCRICAO} />
    </UblDocStage>
    <UblDocAnatomy
      zones={[
        { name: 'Ícone', role: 'Selo decorativo com o glifo de e-mail.', token: '--ubl-avatar-lg · --ubl-color-background-subtle' },
        { name: 'Título', role: 'Nomeia a seção.', token: '--ubl-font-heading-3-*' },
        { name: 'Descrição', role: 'Texto de apoio.', token: '--ubl-font-body-lg-*' },
        { name: 'Campo de e-mail', role: 'TextField não controlado, com erro acessível.', token: 'TextField' },
        { name: 'Botão', role: 'Envia o formulário.', token: 'Button' },
        { name: 'Confirmação', role: 'Região aria-live com checkCircle.', token: '--ubl-color-fill-success · --ubl-color-status-success' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os três estados e as duas disposições — componentes reais."
    />
    <UblDocStage label="Estado idle · contêiner estreito (400px)" surface="page" align="stretch" direction="column" width={420}>
      <NewsletterSignup description={DESCRICAO} />
    </UblDocStage>
    <UblDocStage label="Estado error" surface="page" align="stretch" direction="column" width={420}>
      <NewsletterSignup description={DESCRICAO} status="error" defaultValue="falha@exemplo.com" />
    </UblDocStage>
    <UblDocStage label="Estado success" surface="page" align="stretch" direction="column" width={420}>
      <NewsletterSignup description={DESCRICAO} status="success" />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Decidir status no produto: success só depois de o servidor aceitar o e-mail.',
        'Passar a mensagem de erro do servidor em errorMessage, em linguagem de gente.',
        'Dar uma descrição que diga a frequência e como sair.',
        'Deixar o campo não controlado: o preenchimento automático continua funcionando.',
      ]}
      donts={[
        'Controlar o campo com value só para limpar depois do envio: use status="success".',
        'Mostrar o sucesso por um toast que desaparece: a confirmação precisa ficar.',
        'Validar com expressão regular longa: o servidor confirma o endereço de verdade.',
        'Esconder o rótulo do campo: ele é o nome acessível.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfície, fio, campo, botão e confirmação acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher surface="page">
      {() => <InscricaoDemo width={620} />}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="NewsletterSignup"
      rows={[
        { name: 'title', type: 'string', default: "'Receba os próximos posts'", description: 'Título do cartão.' },
        { name: 'description', type: 'string', description: 'Texto de apoio abaixo do título.' },
        { name: 'emailLabel', type: 'string', default: "'E-mail'", description: 'Rótulo do campo (nome acessível).' },
        { name: 'buttonLabel', type: 'string', default: "'Assinar'", description: 'Rótulo do botão.' },
        { name: 'onSubscribe', type: '(email: string) => void', description: 'Chamado com o e-mail válido, lido do nó do campo.' },
        { name: 'status', type: "'idle' | 'success' | 'error'", default: "'idle'", description: 'Estado da inscrição, decidido pelo produto.' },
        { name: 'successMessage', type: 'string', default: "'Inscrição confirmada. Você receberá os próximos posts por e-mail.'", description: 'Mensagem do estado success.' },
        { name: 'errorMessage', type: 'string', default: "'Não foi possível concluir a inscrição. Tente novamente em instantes.'", description: 'Mensagem do estado error.' },
        { name: 'invalidMessage', type: 'string', default: "'Informe um e-mail válido, como nome@exemplo.com.'", description: 'Mensagem do erro de formato.' },
        { name: 'defaultValue', type: 'string', description: 'E-mail inicial (campo não controlado).' },
        { name: 'headingLevel', type: '2 | 3 | 4', default: '2', description: 'Nível do título.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos da <section>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof NewsletterSignup> = {
  title: 'Unooblog/Componentes/NewsletterSignup',
  component: NewsletterSignup,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título do cartão.' },
    description: { control: 'text', description: 'Texto de apoio.' },
    emailLabel: { control: 'text', description: 'Rótulo do campo de e-mail.' },
    buttonLabel: { control: 'text', description: 'Rótulo do botão.' },
    onSubscribe: { action: 'onSubscribe', description: 'Chamado com o e-mail válido.' },
    status: { control: 'radio', options: ['idle', 'success', 'error'], description: 'Estado da inscrição.' },
    successMessage: { control: 'text', description: 'Mensagem do estado success.' },
    errorMessage: { control: 'text', description: 'Mensagem do estado error.' },
    invalidMessage: { control: 'text', description: 'Mensagem do erro de formato.' },
    defaultValue: { control: 'text', description: 'E-mail inicial.' },
    headingLevel: { control: 'radio', options: [2, 3, 4], description: 'Nível do título.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: 'Receba os próximos posts',
    description: DESCRICAO,
    emailLabel: 'E-mail',
    buttonLabel: 'Assinar',
    status: 'idle',
    successMessage: 'Inscrição confirmada. Você receberá os próximos posts por e-mail.',
    errorMessage: 'Não foi possível concluir a inscrição. Tente novamente em instantes.',
    invalidMessage: 'Informe um e-mail válido, como nome@exemplo.com.',
    headingLevel: 2,
  },
};

export default meta;

type Story = StoryObj<typeof NewsletterSignup>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <NewsletterSignupDocumentationPage />,
};

/**
 * Playground do cartão, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do NewsletterSignup',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} surface="page" align="stretch" direction="column" width={660}>
      <NewsletterSignup {...args} />
    </UblDocStage>
  ),
};

/**
 * Fluxo completo: o produto guarda o estado e responde ao envio.
 * Use `falha@exemplo.com` para ver a recusa do servidor.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: fluxo de inscrição',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={660}>
      <InscricaoDemo />
    </UblDocStage>
  ),
};

/**
 * Do contêiner largo ao estreito: texto e formulário lado a lado a partir de 640px.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[720, 480, 320].map((width) => (
        <UblDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" width={width}>
          <NewsletterSignup description={DESCRICAO} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Com e sem descrição, e com os rótulos trocados.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={460}>
      <NewsletterSignup description={DESCRICAO} />
      <NewsletterSignup />
      <NewsletterSignup
        title="Fique por dentro"
        emailLabel="Seu e-mail"
        buttonLabel="Quero receber"
        headingLevel={3}
      />
    </UblDocStage>
  ),
};

/**
 * Os três estados: aguardando, falha do servidor e inscrição confirmada.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={460}>
      <NewsletterSignup description={DESCRICAO} status="idle" />
      <NewsletterSignup description={DESCRICAO} status="error" defaultValue="falha@exemplo.com" />
      <NewsletterSignup description={DESCRICAO} status="success" />
    </UblDocStage>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UblDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="stretch" direction="column" width={440}>
          <NewsletterSignup description={DESCRICAO} status="error" defaultValue="falha@exemplo.com" />
          <NewsletterSignup description={DESCRICAO} status="success" />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: e-mail inválido mostra o erro acessível; o texto digitado direto
 * no nó sobrevive à re-renderização e é o que `onSubscribe` recebe; e o sucesso
 * entra na região `aria-live`.
 */
export const EnvioDoFormulario: Story = {
  name: 'Interação: validação e envio',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={460}>
      <InscricaoDemo width={420} onSubscribe={subscribeSpy} />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    subscribeSpy.mockClear();
    const canvas = within(canvasElement);
    const campo = canvas.getByLabelText(/E-mail/) as HTMLInputElement;
    const enviar = canvas.getByRole('button', { name: 'Assinar' });

    // Vazio: erro de formato, aria-invalid, foco devolvido ao campo.
    await userEvent.click(enviar);
    await expect(canvas.getByText(/Informe um e-mail válido/)).toBeInTheDocument();
    await expect(campo).toHaveAttribute('aria-invalid', 'true');
    await expect(campo).toHaveFocus();
    await expect(subscribeSpy).not.toHaveBeenCalled();

    // Inválido, escrito DIRETO no nó (sem evento do React): o erro volta e o
    // texto sobrevive à re-renderização.
    campo.value = 'sem-arroba';
    await userEvent.click(enviar);
    await expect(canvas.getByText(/Informe um e-mail válido/)).toBeInTheDocument();
    await expect(campo.value).toBe('sem-arroba');
    await expect(subscribeSpy).not.toHaveBeenCalled();

    // Digitar limpa o erro.
    await userEvent.type(campo, 'x');
    await expect(campo).not.toHaveAttribute('aria-invalid');

    // Válido, escrito direto no nó: onSubscribe recebe o texto do nó.
    campo.value = '  ana@exemplo.com ';
    await userEvent.click(enviar);
    await expect(subscribeSpy).toHaveBeenCalledTimes(1);
    await expect(subscribeSpy).toHaveBeenCalledWith('ana@exemplo.com');

    // Sucesso: o formulário sai e a mensagem entra na região viva.
    await waitFor(() => expect(canvas.queryByLabelText(/E-mail/)).toBeNull());
    const regiao = canvas.getByRole('status');
    await expect(regiao).toHaveTextContent('Inscrição confirmada');
  },
};

/**
 * Interação: a recusa do servidor aparece no campo, que mantém o texto digitado
 * para a pessoa corrigir.
 */
export const RecusaDoServidor: Story = {
  name: 'Interação: recusa do servidor',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={460}>
      <InscricaoDemo width={420} />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const campo = canvas.getByLabelText(/E-mail/) as HTMLInputElement;

    campo.value = 'falha@exemplo.com';
    await userEvent.click(canvas.getByRole('button', { name: 'Assinar' }));

    await expect(canvas.getByText(/Não foi possível concluir a inscrição/)).toBeInTheDocument();
    await expect(campo).toHaveAttribute('aria-invalid', 'true');
    await expect(campo.value).toBe('falha@exemplo.com');
  },
};
