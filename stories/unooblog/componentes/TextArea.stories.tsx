import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { TextArea } from '../../../src/unooblog/components/TextArea';
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
import { notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Largura de uma coluna de formulário de demonstração. */
const COLUNA: React.CSSProperties = { width: 360, display: 'grid', gap: 20 };

/** Limite de caracteres do comentário de demonstração. */
const LIMITE_DO_COMENTARIO = 280;

/**
 * Área de texto controlada: o produto guarda a mensagem.
 */
const MensagemControlada: React.FC = () => {
  const [texto, setTexto] = useState('');
  return (
    <div style={COLUNA}>
      <TextArea
        label="Seu comentário"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        maxLength={LIMITE_DO_COMENTARIO}
      />
      <p style={notaEstilo} data-testid="eco">
        Texto guardado pelo produto: {texto || '(vazio)'}
      </p>
    </div>
  );
};

/**
 * Harness da regressão da seção 4.5.1: uma área NÃO controlada cuja página
 * re-renderiza. O texto escrito direto no nó, sem evento do React, não pode sumir.
 */
const MensagemNaoControladaComRerender: React.FC = () => {
  const [rodadas, setRodadas] = useState(0);
  return (
    <div style={COLUNA}>
      <TextArea label="Seu comentário" maxLength={LIMITE_DO_COMENTARIO} hint={`Re-renderizações: ${rodadas}`} />
      <Button variant="secondary" onClick={() => setRodadas((atual) => atual + 1)}>
        Forçar re-renderização
      </Button>
    </div>
  );
};

/**
 * Página de documentação rica do componente TextArea.
 */
const TextAreaDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Formulário"
      title="TextArea"
      description="Área de texto de comentários e mensagens, com rótulo ligado, texto de apoio, erro com glifo e contador de caracteres em code points. O limite corta o texto no limite, sem os atributos nativos que medem UTF-16. Controlada só quando o consumidor passa value."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Texto de várias linhas, com limite honesto."
    />
    <UblDocGrid>
      <UblDocCard icon="💬" title="Comentários">
        O comentário tem limite de caracteres. O contador mostra quanto já foi escrito e o campo
        corta o que passar.
      </UblDocCard>
      <UblDocCard icon="🔢" title="Contador honesto">
        <code>maxLength</code> conta <strong>code points</strong>: 🌊 conta um. Os atributos nativos
        <code> minLength</code> e <code>maxLength</code> medem UTF-16, contariam dois e cortariam o emoji
        ao meio.
      </UblDocCard>
      <UblDocCard icon="🏷️" title="Rótulo e apoio ligados">
        <code>htmlFor</code> por <code>useId</code>; apoio, erro e contador entram no{' '}
        <code>aria-describedby</code> e o erro liga <code>aria-invalid</code>.
      </UblDocCard>
      <UblDocCard icon="🔐" title="Texto que não some">
        Sem <code>value</code>, o texto mora no DOM e uma re-renderização não o reconcilia de volta
        para vazio (AGENTS.md, 4.5.1).
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UblDocSpecs
      component="TextArea"
      layout="Coluna · rótulo · área de 4 linhas · rodapé com mensagem e contador"
      specs={[
        { label: 'Contorno', value: '1px · --ubl-color-border-control (≥ 3:1)' },
        { label: 'Fundo', value: '--ubl-color-background-card' },
        { label: 'Raio', value: '--ubl-radius-m (12px; cantos macios)' },
        { label: 'Linhas', value: 'rows = 4 (padrão)' },
        { label: 'Foco', value: 'contorno de 1px + outline de 1px em --ubl-color-focus-ring (anel de 2px)' },
        { label: 'Contador', value: 'caption · tabular · --ubl-color-text-danger acima do limite' },
        { label: 'Rolagem', value: 'scrollbar-width: thin' },
        { label: 'Estilos', value: 'compartilha as classes ubl-text-field* com o TextField' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Limite em code points, aplicado no onChange',
          detail:
            'sem minLength/maxLength nativos, o limite é feito pelo componente: no onChange, o texto que passa do limite — digitado ou colado — é cortado por code points (Array.from) e o consumidor já lê o texto limitado. Um valor controlado que já chega acima do limite não é mutilado: marca o campo como inválido e o contador em vermelho.',
        },
        {
          subject: 'Contador anunciado sem ruído',
          detail:
            'o contador visual é aria-hidden; o texto "N de M caracteres" entra no aria-describedby. Só o excesso é anunciado por região viva — uma região viva a cada tecla encheria o leitor de tela de ruído.',
        },
        {
          subject: 'Controlado só com value (regra 4.5.1)',
          detail:
            'o elemento nativo recebe value apenas se o consumidor passou value; senão, defaultValue. O estado interno guarda só a contagem do contador, que pode ficar defasada diante de um preenchimento sem evento — o custo é um número que atrasa, não um texto que some.',
        },
        {
          subject: 'Contorno em border-control',
          detail:
            'o limite do campo é gráfico e precisa de 3:1 (WCAG 1.4.11); border-default reprovaria. Mesmo desenho do TextField, para os dois campos parecerem uma família.',
        },
        {
          subject: 'Cantos macios e foco por outline',
          detail:
            'a área usa raio m (12px), no lugar dos 4px do jornal, e preenche com background-card; o anel de foco de 2px é o contorno de 1px mais um outline de 1px, sem box-shadow.',
        },
        {
          subject: 'Sem redimensionar',
          detail:
            'resize: none — a alça de redimensionar do navegador quebra o ritmo do formulário. A altura vem de rows, e o excesso rola com barra fina.',
        },
        {
          subject: 'Contador por padrão com maxLength',
          detail:
            'showCount vale true quando há maxLength e pode ser desligado. Sem maxLength, showCount mostra só a contagem.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Cada zona da área de texto." />
    <UblDocStage surface="card" align="flex-start" padding={16}>
      <div style={COLUNA}>
        <TextArea label="Seu comentário" required maxLength={LIMITE_DO_COMENTARIO} hint="Seja gentil com quem escreveu." />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UblDocAnatomy
          zones={[
            { name: 'Rótulo', role: 'label com htmlFor; o asterisco é decorativo.', token: '--ubl-font-label-*' },
            { name: 'Área de texto', role: '<textarea> com contorno de controle e rolagem fina.', token: '--ubl-color-border-control' },
            { name: 'Anel de foco', role: 'Contorno + outline de 1px.', token: '--ubl-color-focus-ring' },
            { name: 'Mensagem', role: 'Apoio ou erro, ligada por aria-describedby.', token: '--ubl-font-caption-*' },
            { name: 'Contador', role: 'N/M em code points; vermelho acima do limite.', token: '--ubl-color-text-danger' },
          ]}
        />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada campo é o componente real."
    />
    <UblDocStage label="Composições" surface="card" align="flex-start" padding={16}>
      <div style={COLUNA}>
        <TextArea label="Padrão" placeholder="Escreva aqui" />
        <TextArea label="Com limite" maxLength={LIMITE_DO_COMENTARIO} defaultValue="Ótimo texto sobre contraste 🌊" />
        <TextArea label="Só a contagem" showCount defaultValue="Sem limite, só a contagem." />
      </div>
      <div style={COLUNA}>
        <TextArea label="Com erro" maxLength={LIMITE_DO_COMENTARIO} defaultValue="Oi" error="Escreva ao menos uma frase completa." />
        <TextArea label="Acima do limite (controlado)" maxLength={10} value="Texto bem mais longo que o limite" onChange={() => undefined} />
        <TextArea label="Desabilitado" defaultValue="Somente leitura" disabled rows={2} />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como compor uma área de texto." />
    <UblDocPractices
      dos={[
        'Dar sempre um label: é o nome acessível do campo.',
        'Usar maxLength quando o texto tem limite real: o campo mostra o contador e corta por code points.',
        'Dizer no hint o que acontece com o texto (moderação, publicação).',
        'Ajustar rows ao tamanho esperado da mensagem.',
        'Deixar a área não controlada quando o produto só lê o texto no envio.',
      ]}
      donts={[
        'Passar minLength ou maxLength nativos: não são aceitos, medem UTF-16.',
        'Contar caracteres por .length: 🌊 conta dois e o limite engana a pessoa.',
        'Trocar o rótulo por placeholder.',
        'Passar value sem onChange: o campo fica travado.',
        'Indicar o excesso só pela cor do contador: o contorno e a mensagem de região viva acompanham.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Campo, contador e mensagens acompanham o tema."
    />
    <UblDocThemeSwitcher surface="card" padding={16}>
      {(tema) => (
        <div key={tema} style={COLUNA}>
          <TextArea label="Seu comentário" maxLength={LIMITE_DO_COMENTARIO} defaultValue="Ótimo texto 🌊" hint="Seja gentil com quem escreveu." />
          <TextArea label="Com erro" defaultValue="Oi" error="Escreva ao menos uma frase." />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UblDocPropsTable
      title="TextArea"
      rows={[
        { name: 'label', type: 'ReactNode', description: 'Rótulo e nome acessível. Obrigatório.' },
        { name: 'hint', type: 'ReactNode', description: 'Texto de apoio abaixo do campo.' },
        { name: 'error', type: 'ReactNode', description: 'Mensagem de erro; substitui o apoio e liga aria-invalid.' },
        { name: 'value', type: 'string', description: 'Texto (modo controlado). Só vai ao elemento quando definido.' },
        { name: 'defaultValue', type: 'string', description: 'Texto inicial (modo não controlado).' },
        { name: 'onChange', type: 'ChangeEventHandler<HTMLTextAreaElement>', description: 'A cada alteração, com o evento nativo (já com o texto limitado).' },
        { name: 'rows', type: 'number', default: '4', description: 'Linhas visíveis.' },
        { name: 'maxLength', type: 'number', description: 'Limite em code points; corta o excesso. Sem os atributos nativos.' },
        { name: 'showCount', type: 'boolean', default: 'true com maxLength', description: 'Exibe o contador de code points.' },
        { name: 'required', type: 'boolean', description: 'Liga o atributo nativo e acrescenta o asterisco ao rótulo.' },
        { name: 'id', type: 'string', default: 'useId()', description: 'Id do campo; o do consumidor vence.' },
        { name: 'disabled', type: 'boolean', description: 'Campo desabilitado.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className / style', type: 'string / CSSProperties', description: 'Classe e estilo do invólucro.' },
        { name: '...textarea', type: 'React.TextareaHTMLAttributes<HTMLTextAreaElement>', description: 'Demais atributos (name, placeholder, aria-*…), repassados ao <textarea> (com a ref). minLength e maxLength nativos não são aceitos.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TextArea> = {
  title: 'Unooblog/Componentes/TextArea',
  component: TextArea,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo e nome acessível.' },
    hint: { control: 'text', description: 'Texto de apoio.' },
    error: { control: 'text', description: 'Mensagem de erro.' },
    defaultValue: { control: 'text', description: 'Texto inicial (não controlado).' },
    value: { control: false, description: 'Texto controlado; use na estória de campo controlado.' },
    rows: { control: { type: 'number', min: 1, max: 12 }, description: 'Linhas visíveis.' },
    maxLength: { control: { type: 'number', min: 0 }, description: 'Limite em code points.' },
    showCount: { control: 'boolean', description: 'Exibe o contador.' },
    placeholder: { control: 'text', description: 'Texto do campo vazio.' },
    required: { control: 'boolean', description: 'Campo obrigatório.' },
    disabled: { control: 'boolean', description: 'Campo desabilitado.' },
    id: { control: 'text', description: 'Id do campo (padrão: useId).' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'Seu comentário',
    hint: 'Seja gentil: comentários ofensivos são removidos.',
    placeholder: 'Escreva um comentário',
    rows: 4,
    maxLength: LIMITE_DO_COMENTARIO,
    required: false,
    disabled: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TextAreaDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TextArea',
  render: (args) => (
    <div style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-card)' }} data-ubl-theme={args.theme}>
      <TextArea {...args} />
    </div>
  ),
};

/**
 * Composição realista: o campo de comentário de um post.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: comentário',
  render: () => (
    <form
      onSubmit={(evento) => evento.preventDefault()}
      aria-label="Novo comentário"
      style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-card)' }}
    >
      <TextArea
        label="Seu comentário"
        required
        rows={6}
        maxLength={LIMITE_DO_COMENTARIO}
        hint="Seja gentil: comentários ofensivos são removidos."
        defaultValue="Ótimo texto sobre contraste! Gostaria de sugerir um post sobre testes com leitor de tela."
      />
      <Button iconEnd="send">Comentar</Button>
    </form>
  ),
};

/**
 * Alturas: duas, quatro e oito linhas.
 */
export const Tamanhos: Story = {
  name: 'Alturas',
  render: () => (
    <div style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-card)' }}>
      <TextArea label="rows = 2" rows={2} />
      <TextArea label="rows = 4 (padrão)" />
      <TextArea label="rows = 8" rows={8} />
    </div>
  ),
};

/**
 * Sem limite, com limite, só a contagem e com erro.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-card)' }}>
      <TextArea label="Sem contador" placeholder="Escreva aqui" />
      <TextArea label="Com limite" maxLength={LIMITE_DO_COMENTARIO} defaultValue="Ótimo texto 🌊" />
      <TextArea label="Só a contagem" showCount defaultValue="Sem limite, só a contagem." />
      <TextArea label="Com erro" defaultValue="Oi" error="Escreva ao menos uma frase completa." />
    </div>
  ),
};

/**
 * Vazia, preenchida, acima do limite e desabilitada.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-card)' }}>
      <TextArea label="Vazia" maxLength={LIMITE_DO_COMENTARIO} placeholder="Escreva aqui" />
      <TextArea label="Preenchida" maxLength={LIMITE_DO_COMENTARIO} defaultValue="Ótimo texto sobre contraste." />
      <TextArea label="Acima do limite (controlado)" maxLength={10} value="Texto bem mais longo que o limite" onChange={() => undefined} />
      <TextArea label="Desabilitada" defaultValue="Somente leitura" disabled rows={2} />
    </div>
  ),
};

/**
 * A área de texto nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div
          key={tema}
          data-ubl-theme={tema}
          style={{ ...COLUNA, padding: 16, background: 'var(--ubl-color-background-card)' }}
        >
          <p style={notaEstilo}>{tema === 'light' ? 'Tema claro' : 'Tema escuro'}</p>
          <TextArea label="Seu comentário" maxLength={LIMITE_DO_COMENTARIO} defaultValue="Ótimo texto 🌊" hint="Seja gentil com quem escreveu." />
          <TextArea label="Com erro" defaultValue="Oi" error="Escreva ao menos uma frase." />
        </div>
      ))}
    </div>
  ),
};

/**
 * Contador por code points: um emoji conta um, e o excesso colado é cortado no
 * limite sem partir o emoji.
 */
export const ContadorPorCodePoints: Story = {
  name: 'Contador por code points',
  render: () => (
    <div style={COLUNA}>
      <TextArea label="Com emoji" maxLength={10} defaultValue="Olá 🌊" />
      <TextArea label="Limite curto" maxLength={10} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    // "Olá 🌊" tem 5 code points e 6 unidades UTF-16: o contador diz 5.
    const comEmoji = tela.getByRole('textbox', { name: 'Com emoji' });
    await expect(tela.getAllByText('5/10')[0]).toBeInTheDocument();
    await expect(comEmoji).toHaveAccessibleDescription('5 de 10 caracteres');
    await expect(comEmoji).not.toHaveAttribute('maxlength');

    // Colar 15 emojis (30 unidades UTF-16): o campo corta em 10 code points, sem partir nenhum.
    const curto = tela.getByRole('textbox', { name: 'Limite curto' }) as HTMLTextAreaElement;
    await userEvent.click(curto);
    await userEvent.paste('🌊'.repeat(15));
    await expect(Array.from(curto.value).length).toBe(10);
    await expect(curto.value).toBe('🌊'.repeat(10));
    await expect(curto).toHaveAccessibleDescription('10 de 10 caracteres');
    await expect(tela.getByText('10/10')).toBeInTheDocument();
  },
};

/**
 * Regressão da seção 4.5.1: uma área não controlada guarda o texto no DOM. O que
 * o navegador escreve sem evento sobrevive a uma re-renderização forçada.
 */
export const TextoSemEventoSobrevive: Story = {
  name: 'Texto escrito sem evento sobrevive',
  render: () => <MensagemNaoControladaComRerender />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox', { name: 'Seu comentário' }) as HTMLTextAreaElement;

    await userEvent.type(campo, 'Primeira versão');

    // Escrita direta no nó, sem passar pelo React.
    campo.value = 'Texto preenchido sem evento';

    await userEvent.click(tela.getByRole('button', { name: 'Forçar re-renderização' }));
    await userEvent.click(tela.getByRole('button', { name: 'Forçar re-renderização' }));

    await expect(tela.getByText('Re-renderizações: 2')).toBeInTheDocument();
    // A re-renderização não reconcilia a área de volta para vazio.
    await expect(campo).toHaveValue('Texto preenchido sem evento');
  },
};

/**
 * Com `value`, o produto guarda o texto e a área o acompanha.
 */
export const Controlado: Story = {
  name: 'Controlada com value',
  render: () => <MensagemControlada />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox', { name: 'Seu comentário' });

    await userEvent.type(campo, 'Ótimo post');
    await expect(campo).toHaveValue('Ótimo post');
    await expect(tela.getByTestId('eco')).toHaveTextContent('Texto guardado pelo produto: Ótimo post');
    await expect(tela.getByText('10/280')).toBeInTheDocument();
  },
};

/**
 * Um valor controlado que já chega acima do limite marca o campo como inválido.
 */
export const AcimaDoLimite: Story = {
  name: 'Acima do limite',
  render: () => (
    <div style={COLUNA}>
      <TextArea label="Mensagem" maxLength={10} value="Texto bem mais longo que o limite" onChange={() => undefined} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox', { name: 'Mensagem' });

    await expect(campo).toBeInvalid();
    await expect(tela.getByText('33/10')).toBeInTheDocument();
  },
};
