import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { CommentComposer } from '../../../src/unooblog/components/CommentComposer';
import { Button } from '../../../src/unooblog/components/Button';
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

const BAR = '#716C98';

/** Largura de uma coluna de formulário de demonstração. */
const COLUNA: React.CSSProperties = { width: 'min(560px, 100%)', boxSizing: 'border-box' };

/** Estilo das notas de apoio das estórias de interação. */
const NOTA: React.CSSProperties = {
  margin: '12px 0 0',
  color: 'var(--ubl-color-text-secondary)',
  fontFamily: 'var(--ubl-font-sans)',
  fontSize: 'var(--ubl-font-caption-size)',
  lineHeight: 'var(--ubl-font-caption-line)',
};

/**
 * Compositor controlado: o produto guarda o texto, publica e limpa.
 */
const ComposerControlado: React.FC = () => {
  const [texto, setTexto] = useState('');
  const [publicados, setPublicados] = useState<string[]>([]);
  return (
    <div style={COLUNA}>
      <CommentComposer
        value={texto}
        onValueChange={setTexto}
        onSubmit={(enviado) => {
          setPublicados((atuais) => [...atuais, enviado]);
          setTexto('');
        }}
      />
      <p style={NOTA} data-testid="publicados">
        Publicados: {publicados.length === 0 ? '(nenhum)' : publicados.join(' | ')}
      </p>
    </div>
  );
};

/**
 * Harness da regressão da seção 4.5.1: um compositor NÃO controlado cuja página
 * re-renderiza. O texto escrito direto no nó, sem evento do React, não pode sumir.
 */
const ComposerComRerender: React.FC = () => {
  const [rodadas, setRodadas] = useState(0);
  return (
    <div style={COLUNA}>
      <CommentComposer hint={`Re-renderizações: ${rodadas}`} />
      <div style={{ marginTop: 12 }}>
        <Button variant="secondary" onClick={() => setRodadas((atual) => atual + 1)}>
          Forçar re-renderização
        </Button>
      </div>
    </div>
  );
};

/**
 * Página de documentação rica do componente CommentComposer.
 */
const CommentComposerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Comentários"
      title="CommentComposer"
      description="Compositor de comentário: avatar, área de texto com contador em code points, “Comentar” e “Cancelar”. Ctrl ou ⌘ + Enter envia, o botão espera texto de verdade e o campo só é controlado quando o consumidor passa value."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Escrever um comentário novo ou uma resposta."
    />
    <UblDocGrid>
      <UblDocCard icon="✍️" title="Comentário novo">
        Avatar de quem comenta, campo de três linhas e o botão “Comentar”, desabilitado enquanto não
        houver texto.
      </UblDocCard>
      <UblDocCard icon="↩️" title="Resposta">
        Com <code>replyingTo</code>, o rótulo vira “Respondendo a Beatriz” e “Cancelar” fecha o
        compositor sob o comentário respondido.
      </UblDocCard>
      <UblDocCard icon="🔢" title="Contador honesto">
        O limite de 1000 conta <strong>code points</strong>: 🌊 vale um. O campo corta o excesso
        colado no limite, sem partir o emoji.
      </UblDocCard>
      <UblDocCard icon="⌨️" title="Teclado">
        Ctrl ou ⌘ + Enter envia; após o envio o campo é limpo e o foco volta a ele para o próximo
        comentário.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UblDocSpecs
      component="CommentComposer"
      layout="Formulário em grade · avatar (32px) · campo e ações"
      specs={[
        { label: 'Avatar', value: 'Avatar md · 32px · decorativo (alt vazio)' },
        { label: 'Campo', value: 'TextArea · 3 linhas · contador N/1000 em code points' },
        { label: 'Apoio', value: '“Ctrl ou ⌘ + Enter para enviar.” (padrão; null suprime)' },
        { label: 'Ações', value: 'Button primary “Comentar” e ghost “Cancelar”, alinhados ao fim' },
        { label: 'Compacto', value: 'abaixo de 320px de contêiner o avatar sai da frente do campo' },
        { label: 'Raiz', value: '<form aria-label> · onSubmit com preventDefault' },
        { label: 'Controle', value: 'controlado só com value; senão defaultValue (AGENTS.md, 4.5.1)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Controlado só com value (regra 4.5.1)',
          detail:
            'o campo nativo recebe value apenas se o consumidor o passou; senão, defaultValue. O estado interno guarda só se há texto, para habilitar o botão — pode ficar defasado diante de um preenchimento sem evento, o que custa um botão que demora a habilitar, nunca um texto que some. A estória “Texto escrito sem evento sobrevive” guarda a regra.',
        },
        {
          subject: 'Limpar troca o campo por um novo',
          detail:
            'em modo não controlado não há estado que comande o texto, e o contador do TextArea só acompanha eventos de alteração. Escrever vazio no nó por fora deixava o contador defasado e, num teste com user-event, a próxima digitação voltava a anexar ao texto antigo (medido). Por isso, ao enviar, o campo é remontado vazio (key) e o foco volta a ele. Em modo controlado, quem limpa é o consumidor, ao receber onSubmit.',
        },
        {
          subject: 'Foco devolvido ao campo',
          detail:
            'depois de enviar, o foco volta à área de texto: quem acabou de comentar costuma continuar a conversa, e o foco não pode se perder no botão que acabou de ser desabilitado.',
        },
        {
          subject: 'Limite de 1000 em code points, sem atributos nativos',
          detail:
            'minLength e maxLength nativos medem UTF-16 e cortariam um emoji ao meio; o TextArea corta por code points no onChange. Um valor controlado acima do limite desabilita o envio e marca o contador.',
        },
        {
          subject: 'Botão desabilitado com texto vazio ou só de espaços',
          detail:
            'o texto enviado é sempre aparado; uma mensagem de espaços não vira comentário. O botão desabilitado perde o foco do Tab, mas o Ctrl/⌘ + Enter também é recusado nesses casos.',
        },
        {
          subject: 'Rótulo visível, em vez de só placeholder',
          detail:
            'o campo tem rótulo — “Seu comentário” ou “Respondendo a nome” — porque o placeholder some ao digitar e não é nome acessível confiável.',
        },
        {
          subject: 'Atalho de envio ignora composição de texto',
          detail:
            'Ctrl/⌘ + Enter durante a composição de um método de entrada (IME) não envia: o Enter ali confirma o caractere.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Cada zona do compositor." />
    <UblDocStage surface="page" align="flex-start" padding={16}>
      <div style={COLUNA}>
        <CommentComposer replyingTo="Beatriz Nogueira" onCancel={() => undefined} onSubmit={() => undefined} />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UblDocAnatomy
          zones={[
            { name: 'Avatar', role: 'Quem comenta; decorativo.', token: '--ubl-avatar-md' },
            { name: 'Rótulo', role: '“Seu comentário” ou “Respondendo a nome”, ligado por htmlFor.', token: 'Label' },
            { name: 'Área de texto', role: 'TextArea de três linhas, com contorno de controle.', token: '--ubl-color-border-control' },
            { name: 'Apoio e contador', role: 'Atalho de envio e N/1000 em code points.', token: 'Caption' },
            { name: 'Cancelar', role: 'Só com onCancel; botão discreto.', token: 'Button ghost' },
            { name: 'Comentar', role: 'Envia; desabilitado sem texto.', token: 'Button primary' },
          ]}
        />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada compositor é o componente real."
    />
    <UblDocStage label="Novo, resposta e preenchido" surface="page" direction="column" align="stretch" padding={16}>
      <CommentComposer onSubmit={() => undefined} />
      <CommentComposer replyingTo="Beatriz Nogueira" onCancel={() => undefined} onSubmit={() => undefined} />
      <CommentComposer defaultValue="Ótimo texto! Vou aplicar na minha página 🌱" onSubmit={() => undefined} />
    </UblDocStage>
    <UblDocStage label="Erro de envio e acima do limite" surface="page" direction="column" align="stretch" padding={16}>
      <CommentComposer defaultValue="Não foi possível publicar." error="Não conseguimos enviar o comentário. Tente de novo." />
      <CommentComposer maxLength={20} value="Este texto passa do limite de vinte caracteres" onValueChange={() => undefined} />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como compor um compositor." />
    <UblDocPractices
      dos={[
        'Passar replyingTo ao responder: o rótulo diz com quem a pessoa conversa.',
        'Mostrar o compositor sob o comentário respondido e oferecer “Cancelar”.',
        'Deixar o campo não controlado quando o produto só lê o texto no envio.',
        'Em modo controlado, limpar o valor ao receber onSubmit.',
        'Mostrar a falha do envio em error, sem apagar o que a pessoa escreveu.',
      ]}
      donts={[
        'Passar value sem onValueChange: o campo fica travado.',
        'Contar caracteres por .length: 🌊 contaria dois.',
        'Passar minLength ou maxLength nativos: não são aceitos.',
        'Habilitar “Comentar” com texto vazio ou só de espaços.',
        'Limpar o campo antes de o envio dar certo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Campo, contador e botões acompanham o tema."
    />
    <UblDocThemeSwitcher surface="page" padding={16}>
      {(tema) => (
        <div key={tema} style={COLUNA}>
          <CommentComposer replyingTo="Beatriz Nogueira" defaultValue="Concordo 🌱" onCancel={() => undefined} onSubmit={() => undefined} />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UblDocPropsTable
      title="CommentComposer"
      rows={[
        { name: 'avatarSrc', type: 'string', description: 'Retrato de quem comenta; sem ele, mostra as iniciais.' },
        { name: 'name', type: 'string', default: "'Você'", description: 'Nome de quem comenta (iniciais do avatar).' },
        { name: 'placeholder', type: 'string', default: "'Escreva um comentário'", description: 'Texto do campo vazio.' },
        { name: 'value', type: 'string', description: 'Texto (modo controlado). Só vai ao campo quando definido.' },
        { name: 'defaultValue', type: 'string', description: 'Texto inicial (modo não controlado).' },
        { name: 'onValueChange', type: '(text: string) => void', description: 'A cada alteração, com o texto já limitado.' },
        { name: 'onSubmit', type: '(text: string) => void', description: 'Ao enviar, com o texto aparado. Em modo não controlado, o campo é limpo em seguida.' },
        { name: 'onCancel', type: '() => void', description: 'Ao cancelar; quando existe, “Cancelar” aparece.' },
        { name: 'maxLength', type: 'number', default: '1000', description: 'Limite em code points; sem os atributos nativos.' },
        { name: 'submitLabel', type: 'string', default: "'Comentar'", description: 'Rótulo do botão de enviar.' },
        { name: 'cancelLabel', type: 'string', default: "'Cancelar'", description: 'Rótulo do botão de cancelar.' },
        { name: 'replyingTo', type: 'string', description: 'Nome de quem é respondido; o rótulo vira “Respondendo a nome”.' },
        { name: 'hint', type: 'ReactNode', default: "'Ctrl ou ⌘ + Enter para enviar.'", description: 'Apoio abaixo do campo; null suprime.' },
        { name: 'error', type: 'ReactNode', description: 'Erro de envio; substitui o apoio e liga aria-invalid.' },
        { name: 'rows', type: 'number', default: '3', description: 'Linhas visíveis.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className / style', type: 'string / CSSProperties', description: 'Classe e estilo da raiz.' },
        { name: '...form', type: 'React.FormHTMLAttributes<HTMLFormElement>', description: 'Demais atributos, repassados ao <form> (com a ref).' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof CommentComposer> = {
  title: 'Unooblog/Componentes/CommentComposer',
  component: CommentComposer,
  parameters: { layout: 'padded' },
  argTypes: {
    avatarSrc: { control: 'text', description: 'Retrato de quem comenta.' },
    name: { control: 'text', description: 'Nome de quem comenta (iniciais).' },
    placeholder: { control: 'text', description: 'Texto do campo vazio.' },
    value: { control: false, description: 'Texto controlado; use a estória de campo controlado.' },
    defaultValue: { control: 'text', description: 'Texto inicial (não controlado).' },
    maxLength: { control: { type: 'number', min: 1 }, description: 'Limite em code points.' },
    submitLabel: { control: 'text', description: 'Rótulo de enviar.' },
    cancelLabel: { control: 'text', description: 'Rótulo de cancelar.' },
    replyingTo: { control: 'text', description: 'Nome de quem é respondido.' },
    hint: { control: 'text', description: 'Apoio abaixo do campo.' },
    error: { control: 'text', description: 'Erro de envio.' },
    rows: { control: { type: 'number', min: 1, max: 12 }, description: 'Linhas visíveis.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onValueChange: { action: 'onValueChange' },
    onSubmit: { action: 'onSubmit' },
    onCancel: { action: 'onCancel' },
  },
  args: {
    name: 'Você',
    placeholder: 'Escreva um comentário',
    maxLength: 1000,
    submitLabel: 'Comentar',
    cancelLabel: 'Cancelar',
    rows: 3,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof CommentComposer>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CommentComposerDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do CommentComposer',
  render: (args) => (
    <div
      data-ubl-theme={args.theme}
      style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-page)' }}
    >
      <CommentComposer {...args} />
    </div>
  ),
};

/**
 * Composição realista: responder a um comentário, com “Cancelar”.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: responder a um comentário',
  render: () => (
    <div style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-page)' }}>
      <CommentComposer
        replyingTo="Beatriz Nogueira"
        defaultValue="Também achei! Quer testar juntas?"
        onCancel={() => undefined}
        onSubmit={() => undefined}
      />
    </div>
  ),
};

/**
 * O compositor em contêineres estreito, médio e largo.
 */
export const Tamanhos: Story = {
  name: 'Larguras',
  render: () => (
    <div style={{ display: 'grid', gap: 24, padding: 16, background: 'var(--ubl-color-background-page)' }}>
      {[300, 420, 680].map((largura) => (
        <div key={largura} style={{ width: largura, maxWidth: '100%' }}>
          <CommentComposer onCancel={() => undefined} onSubmit={() => undefined} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Comentário novo, resposta, com “Cancelar” e sem o texto de apoio.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ ...COLUNA, display: 'grid', gap: 24, padding: 16, background: 'var(--ubl-color-background-page)' }}>
      <CommentComposer onSubmit={() => undefined} />
      <CommentComposer replyingTo="Beatriz Nogueira" onCancel={() => undefined} onSubmit={() => undefined} />
      <CommentComposer hint={null} placeholder="Sem texto de apoio" onSubmit={() => undefined} />
      <CommentComposer submitLabel="Publicar" cancelLabel="Descartar" onCancel={() => undefined} onSubmit={() => undefined} />
    </div>
  ),
};

/**
 * Vazio (botão desabilitado), preenchido, com erro e acima do limite.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ ...COLUNA, display: 'grid', gap: 24, padding: 16, background: 'var(--ubl-color-background-page)' }}>
      <CommentComposer onSubmit={() => undefined} />
      <CommentComposer defaultValue="Ótimo texto! 🌱" onSubmit={() => undefined} />
      <CommentComposer defaultValue="Não foi possível publicar." error="Não conseguimos enviar o comentário. Tente de novo." />
      <CommentComposer maxLength={20} value="Este texto passa do limite de vinte caracteres" onValueChange={() => undefined} />
    </div>
  ),
};

/**
 * O compositor nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div
          key={tema}
          data-ubl-theme={tema}
          style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-page)' }}
        >
          <CommentComposer replyingTo="Beatriz Nogueira" defaultValue="Concordo 🌱" onCancel={() => undefined} onSubmit={() => undefined} />
        </div>
      ))}
    </div>
  ),
};

/**
 * O botão espera texto de verdade; clicar envia o texto aparado, limpa o campo e devolve o foco.
 */
export const EnviarPorClique: Story = {
  name: 'Enviar por clique',
  args: { onSubmit: fn(), onCancel: fn() },
  render: (args) => (
    <div style={COLUNA}>
      <CommentComposer {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox') as HTMLTextAreaElement;
    const enviar = tela.getByRole('button', { name: 'Comentar' });

    // Vazio e só de espaços: desabilitado.
    await expect(enviar).toBeDisabled();
    await userEvent.type(campo, '   ');
    await expect(enviar).toBeDisabled();

    await userEvent.type(campo, 'Muito bom!  ');
    await expect(enviar).toBeEnabled();

    await userEvent.click(enviar);
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
    await expect(args.onSubmit).toHaveBeenCalledWith('Muito bom!');

    // Campo limpo, contador zerado, botão desabilitado e foco de volta no campo.
    const novoCampo = tela.getByRole('textbox');
    await expect(novoCampo).toHaveValue('');
    await expect(tela.getByText('0/1000')).toBeInTheDocument();
    await expect(enviar).toBeDisabled();
    await expect(novoCampo).toHaveFocus();

    await userEvent.click(tela.getByRole('button', { name: 'Cancelar' }));
    await expect(args.onCancel).toHaveBeenCalledTimes(1);
  },
};

/**
 * Ctrl + Enter envia como o clique; sem texto, o atalho é recusado.
 */
export const EnviarPorAtalho: Story = {
  name: 'Enviar com Ctrl + Enter',
  args: { onSubmit: fn() },
  render: (args) => (
    <div style={COLUNA}>
      <CommentComposer {...args} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox') as HTMLTextAreaElement;

    await userEvent.click(campo);
    // Sem texto, o atalho não envia.
    await userEvent.keyboard('{Control>}{Enter}{/Control}');
    await expect(args.onSubmit).not.toHaveBeenCalled();

    await userEvent.type(campo, '  Primeira linha');
    await userEvent.keyboard('{Control>}{Enter}{/Control}');
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
    await expect(args.onSubmit).toHaveBeenLastCalledWith('Primeira linha');
    const novoCampo = tela.getByRole('textbox');
    await expect(novoCampo).toHaveValue('');
    await expect(novoCampo).toHaveFocus();

    // Com ⌘ (Meta) também.
    await userEvent.type(novoCampo, 'Segundo comentário');
    await userEvent.keyboard('{Meta>}{Enter}{/Meta}');
    await expect(args.onSubmit).toHaveBeenCalledTimes(2);
    await expect(args.onSubmit).toHaveBeenLastCalledWith('Segundo comentário');
  },
};

/**
 * Contador por code points: um emoji conta um, e o excesso colado é cortado no limite.
 */
export const ContadorPorCodePoints: Story = {
  name: 'Contador por code points',
  args: { maxLength: 10 },
  render: (args) => (
    <div style={COLUNA}>
      <CommentComposer {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox') as HTMLTextAreaElement;

    // Um emoji tem duas unidades UTF-16 e conta um.
    await userEvent.click(campo);
    await userEvent.paste('🌊');
    await expect(tela.getByText('1/10')).toBeInTheDocument();
    await expect(campo).toHaveAccessibleDescription(/1 de 10 caracteres/);
    await expect(campo).not.toHaveAttribute('maxlength');

    // Colar 15 emojis: o campo corta em 10 code points, sem partir nenhum.
    await userEvent.paste('🌊'.repeat(15));
    await expect(Array.from(campo.value).length).toBe(10);
    await expect(campo.value).toBe('🌊'.repeat(10));
    await expect(tela.getByText('10/10')).toBeInTheDocument();
  },
};

/**
 * Com replyingTo, o rótulo do campo diz com quem a pessoa conversa.
 */
export const Respondendo: Story = {
  name: 'Respondendo a alguém',
  render: () => (
    <div style={COLUNA}>
      <CommentComposer replyingTo="Beatriz Nogueira" onCancel={() => undefined} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('textbox', { name: 'Respondendo a Beatriz Nogueira' })).toBeInTheDocument();
    await expect(tela.getByRole('form', { name: 'Responder a Beatriz Nogueira' })).toBeInTheDocument();
  },
};

/**
 * Com `value`, o produto guarda o texto, publica e limpa.
 */
export const Controlado: Story = {
  name: 'Controlado com value',
  render: () => <ComposerControlado />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox');

    await userEvent.type(campo, 'Comentário controlado');
    await expect(campo).toHaveValue('Comentário controlado');

    await userEvent.click(tela.getByRole('button', { name: 'Comentar' }));
    await waitFor(() => expect(campo).toHaveValue(''));
    await expect(tela.getByTestId('publicados')).toHaveTextContent('Publicados: Comentário controlado');
  },
};

/**
 * Regressão da seção 4.5.1: um compositor não controlado guarda o texto no DOM. O
 * que o navegador escreve sem evento sobrevive a uma re-renderização forçada.
 */
export const TextoSemEventoSobrevive: Story = {
  name: 'Texto escrito sem evento sobrevive',
  render: () => <ComposerComRerender />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox') as HTMLTextAreaElement;

    await userEvent.type(campo, 'Primeira versão');

    // Escrita direta no nó, sem passar pelo React.
    campo.value = 'Texto preenchido sem evento';

    await userEvent.click(tela.getByRole('button', { name: 'Forçar re-renderização' }));
    await userEvent.click(tela.getByRole('button', { name: 'Forçar re-renderização' }));

    await expect(tela.getByText('Re-renderizações: 2')).toBeInTheDocument();
    // A re-renderização não reconcilia o campo de volta para vazio.
    await expect(campo).toHaveValue('Texto preenchido sem evento');
  },
};
