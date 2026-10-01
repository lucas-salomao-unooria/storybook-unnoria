import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ChatComposer } from '../../../src/unooria/components/ChatComposer';
import type { UnooriaTheme } from '../../../src/unooria/tokens';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';
import { AlternadorDeTema, Cartao, Grade, Palco, Praticas, TabelaDeProps } from './agente/docKit';
import { PERGUNTA_DO_PROFESSOR } from './agente/fixtures';

const nada = () => {};

const Matriz: React.FC<{ tema?: UnooriaTheme }> = ({ tema = 'light' }) => (
  <>
    <ChatComposer theme={tema} onSend={nada} />
    <ChatComposer theme={tema} onSend={nada} defaultValue={PERGUNTA_DO_PROFESSOR} maxLength={4000} />
    <ChatComposer theme={tema} onSend={nada} onStop={nada} transmitindo defaultValue="E como eu avalio" />
    <ChatComposer theme={tema} onSend={nada} disabled placeholder="O agente de IA do professor está indisponível" />
    <ChatComposer theme={tema} onSend={nada} defaultValue={'x'.repeat(200)} maxLength={200} />
  </>
);

const ChatComposerDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<UnooriaTheme>('light');
  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Agente de IA do professor"
        title="ChatComposer"
        description="Onde o professor escreve para o agente de IA do professor: o TextArea do pacote numa linha que cresce com o texto, Enter envia e Shift+Enter quebra a linha, contador opcional e o botão Enviar que vira Parar enquanto a resposta chega. Só texto — sem anexo."
      />

      <UnooriaDocSectionHeader title="1. Visão Geral & Casos de Uso" description="Escrever, enviar e interromper." />
      <Grade>
        <Cartao icone="⌨️" titulo="Teclado">
          Enter envia; Shift+Enter quebra a linha; durante a composição de um acento (IME), Enter não envia. A
          instrução é a descrição do campo para o leitor de tela.
        </Cartao>
        <Cartao icone="⏹️" titulo="Parar">
          Com <code>transmitindo</code>, Enviar vira Parar (<code>onStop</code>) e o Enter não envia: o rascunho que a
          pessoa começou fica.
        </Cartao>
        <Cartao icone="🔢" titulo="Limite">
          <code>maxLength</code> mostra “12/4.000” e bloqueia o excesso; a frase completa (“Você usou 12 de 4000
          caracteres.”) vai para o leitor de tela.
        </Cartao>
        <Cartao icone="🧠" titulo="Controlado só com value">
          Sem <code>value</code>, o texto vive no DOM (seção 4.5.1): o envio lê o nó e o limpa. Com{' '}
          <code>value</code>, o compositor pede <code>onValueChange(&apos;&apos;)</code> depois do envio.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="2. Figma & Especificações Técnicas" description="Design próprio, sobre o TextArea e o Button." />
      <Grade>
        <Cartao icone="📐" titulo="Medidas">
          Campo de 46px numa linha (24px de linha, 10px de recuo, fio 1px), crescendo até <code>maxRows</code> (6) e
          rolando por dentro. Botão quadrado de 44px: o <code>Button</code> <code>md</code> sem rótulo,{' '}
          <code>primary</code> (Enviar, glifo <code>send</code>) ou <code>outline</code> (Parar).
        </Cartao>
        <Cartao icone="⚠️" titulo="Desvios registrados">
          O quadro <code>6024:2923</code> não publica <code>stop</code>: o Parar usa <code>crop_square</code>{' '}
          preenchido, o quadrado do próprio quadro. O contador do <code>TextArea</code> (frase visível) fica
          desligado: numa conversa, a frase pesaria mais que a mensagem; entra o “12/4.000”.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="3. Anatomia do Componente" description="Campo, botão e contador." />
      <Grade>
        <Cartao icone="1" titulo="Campo">
          O <code>TextArea</code>, com <code>aria-label</code> (não há rótulo visível) e <code>aria-describedby</code>{' '}
          na instrução e no contador.
        </Cartao>
        <Cartao icone="2" titulo="Botão">Enviar ou Parar, com <code>Tooltip</code>.</Cartao>
        <Cartao icone="3" titulo="Contador">“12/4.000”, à direita, <code>aria-hidden</code>.</Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="4. Matriz de Variantes, Tamanhos e Estados" description="Vazio, com texto e contador, transmitindo, desligado e no limite." />
      <Palco rotulo="Claro" largura={480}>
        <Matriz />
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso." />
      <Praticas
        fazer={[
          'Passar onStop sempre que houver transmissão — sem ele, o Enviar só fica desligado.',
          'Focar o compositor quando o painel abre.',
          'Deixar o texto no DOM (sem value) quando não precisar controlar.',
        ]}
        evitar={[
          'Botão de anexo: o agente é só texto.',
          'Placeholder como rótulo: o nome do campo é o label.',
          'Limpar o campo no produto em modo não controlado — o compositor já limpa.',
        ]}
      />

      <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Claro e escuro, em tempo real." />
      <AlternadorDeTema tema={tema} aoMudar={setTema} />
      <Palco rotulo={`Tema ${tema === 'light' ? 'claro' : 'escuro'}`} tema={tema} largura={480}>
        <Matriz tema={tema} />
      </Palco>

      <UnooriaDocSectionHeader title="7. Referência Completa de Props da API" description="Contrato público do ChatComposer." />
      <TabelaDeProps
        linhas={[
          { nome: 'onSend', tipo: '(texto: string) => void', descricao: 'Envio (Enter ou botão), sem os espaços das pontas. Obrigatório.' },
          { nome: 'onStop', tipo: '() => void', descricao: 'Parar a resposta (com transmitindo).' },
          { nome: 'transmitindo', tipo: 'boolean', padrao: 'false', descricao: 'Enviar vira Parar; Enter não envia.' },
          { nome: 'value', tipo: 'string', descricao: 'Texto em modo controlado. Só passe se for controlar.' },
          { nome: 'defaultValue', tipo: 'string', descricao: 'Texto inicial, não controlado.' },
          { nome: 'onValueChange', tipo: '(texto: string) => void', descricao: 'A cada mudança, e com "" depois do envio.' },
          { nome: 'disabled', tipo: 'boolean', padrao: 'false', descricao: 'Desliga campo e botões.' },
          { nome: 'maxLength', tipo: 'number', descricao: 'Limite, com contador “12/4.000”.' },
          { nome: 'maxRows', tipo: 'number', padrao: '6', descricao: 'Linhas antes de rolar por dentro.' },
          { nome: 'placeholder', tipo: 'string', padrao: "'Pergunte ao agente de IA do professor'", descricao: 'Texto de exemplo.' },
          { nome: 'label', tipo: 'string', padrao: "'Mensagem para o agente de IA do professor'", descricao: 'Nome acessível do campo.' },
          { nome: 'sendLabel', tipo: 'string', padrao: "'Enviar'", descricao: 'Nome do botão Enviar.' },
          { nome: 'stopLabel', tipo: 'string', padrao: "'Parar'", descricao: 'Nome do botão Parar.' },
          { nome: 'hint', tipo: 'string', padrao: "'Enter envia. Shift + Enter quebra a linha.'", descricao: 'Instrução de teclado (descrição).' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
          { nome: 'className / style', tipo: 'string / CSSProperties', descricao: 'Da raiz.' },
          { nome: '...rest', tipo: 'TextareaHTMLAttributes', descricao: 'name, id, autoFocus… vão ao <textarea>.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof ChatComposer> = {
  title: 'Plataforma Unooria/Componentes/ChatComposer',
  component: ChatComposer,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: false, description: 'Texto controlado (não usado no playground, que é não controlado).' },
    defaultValue: { control: 'text', description: 'Texto inicial.' },
    onValueChange: { action: 'onValueChange', description: 'Mudança do texto.' },
    onSend: { action: 'onSend', description: 'Envio.' },
    onStop: { action: 'onStop', description: 'Parar.' },
    transmitindo: { control: 'boolean', description: 'O agente está respondendo.' },
    disabled: { control: 'boolean', description: 'Desligado.' },
    maxLength: { control: 'number', description: 'Limite de caracteres.' },
    maxRows: { control: { type: 'range', min: 1, max: 12, step: 1 }, description: 'Linhas antes de rolar.' },
    placeholder: { control: 'text', description: 'Texto de exemplo.' },
    label: { control: 'text', description: 'Nome acessível.' },
    sendLabel: { control: 'text', description: 'Nome do Enviar.' },
    stopLabel: { control: 'text', description: 'Nome do Parar.' },
    hint: { control: 'text', description: 'Instrução de teclado.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    defaultValue: '',
    transmitindo: false,
    disabled: false,
    maxLength: 4000,
    maxRows: 6,
    placeholder: 'Pergunte ao agente de IA do professor',
    label: 'Mensagem para o agente de IA do professor',
    sendLabel: 'Enviar',
    stopLabel: 'Parar',
    hint: 'Enter envia. Shift + Enter quebra a linha.',
    theme: 'light',
    onSend: fn(),
    onStop: fn(),
    onValueChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof ChatComposer>;

/** Documentação rica e completa do componente. */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChatComposerDocumentationPage />,
};

/** Playground com todas as propriedades. */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChatComposer',
  render: (args) => (
    <Palco rotulo="ChatComposer" tema={args.theme} largura={480}>
      <ChatComposer {...args} />
    </Palco>
  ),
};

/** Os estados, nos dois temas. */
export const TodasVariantes: Story = {
  name: '🎨 Todas as Variantes',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Palco rotulo="Claro" largura={440}>
        <Matriz />
      </Palco>
      <Palco rotulo="Escuro" tema="dark" largura={440}>
        <Matriz tema="dark" />
      </Palco>
    </div>
  ),
};

const aoEnviar = fn();
const aoParar = fn();

/** O compositor controlado, com o estado do lado de fora. */
const Controlado: React.FC<{ aoEnviar: (t: string) => void }> = ({ aoEnviar: enviar }) => {
  const [texto, setTexto] = useState('');
  return (
    <div>
      <ChatComposer value={texto} onValueChange={setTexto} onSend={enviar} label="Compositor controlado" />
      <p data-testid="espelho">{texto.length}</p>
    </div>
  );
};

/**
 * As garantias: Enter envia e limpa, Shift+Enter quebra a linha, texto vazio
 * não envia, o campo cresce até o teto, transmitindo troca para Parar e não
 * envia, e o modo controlado limpa por onValueChange.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 440 }}>
      <ChatComposer onSend={aoEnviar} maxLength={4000} maxRows={3} label="Compositor livre" />
      <ChatComposer onSend={aoEnviar} onStop={aoParar} transmitindo label="Compositor transmitindo" defaultValue="Rascunho" />
      <Controlado aoEnviar={aoEnviar} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    aoEnviar.mockClear();
    aoParar.mockClear();
    const tela = within(canvasElement);

    // 1. Não controlado: vazio não envia; Shift+Enter quebra; Enter envia e limpa.
    const livre = tela.getByRole('textbox', { name: 'Compositor livre' }) as HTMLTextAreaElement;
    await expect(livre).toHaveAccessibleDescription(/Enter envia\. Shift \+ Enter quebra a linha\./);
    await expect(tela.getAllByRole('button', { name: 'Enviar' })[0]).toBeDisabled();
    await userEvent.click(livre);
    await userEvent.keyboard('{Enter}');
    await expect(aoEnviar).not.toHaveBeenCalled();

    await userEvent.type(livre, 'Linha um');
    await userEvent.keyboard('{Shift>}{Enter}{/Shift}');
    await userEvent.type(livre, 'Linha dois');
    await expect(aoEnviar).not.toHaveBeenCalled();
    await expect(livre.value).toBe('Linha um\nLinha dois');
    await expect(canvasElement).toHaveTextContent('19/4.000');

    // Cresce com o texto, até 3 linhas (3 x 24px + 20px de recuo + 2px de fio).
    const umaLinha = 46;
    await expect(livre.getBoundingClientRect().height).toBeGreaterThan(umaLinha);
    await userEvent.keyboard('{Shift>}{Enter}{/Shift}3{Shift>}{Enter}{/Shift}4{Shift>}{Enter}{/Shift}5');
    await expect(Math.round(livre.getBoundingClientRect().height)).toBe(3 * 24 + 20 + 2);

    await userEvent.keyboard('{Enter}');
    await expect(aoEnviar).toHaveBeenCalledWith('Linha um\nLinha dois\n3\n4\n5');
    await expect(livre.value).toBe('');
    await expect(Math.round(livre.getBoundingClientRect().height)).toBe(umaLinha);

    // 2. Transmitindo: o botão é Parar, e Enter não envia nem apaga o rascunho.
    const transmitindo = tela.getByRole('textbox', { name: 'Compositor transmitindo' }) as HTMLTextAreaElement;
    await userEvent.click(transmitindo);
    await userEvent.keyboard('{Enter}');
    await expect(aoEnviar).toHaveBeenCalledTimes(1);
    await expect(transmitindo.value).toBe('Rascunho');
    await userEvent.click(tela.getByRole('button', { name: 'Parar' }));
    await expect(aoParar).toHaveBeenCalledTimes(1);

    // 3. Controlado: envia pelo botão e limpa via onValueChange('').
    const controlado = tela.getByRole('textbox', { name: 'Compositor controlado' }) as HTMLTextAreaElement;
    await userEvent.type(controlado, '  Olá  ');
    await expect(tela.getByTestId('espelho')).toHaveTextContent('7');
    const enviarControlado = tela.getAllByRole('button', { name: 'Enviar' }).at(-1) as HTMLElement;
    await userEvent.click(enviarControlado);
    await expect(aoEnviar).toHaveBeenLastCalledWith('Olá');
    await expect(controlado.value).toBe('');
    await expect(tela.getByTestId('espelho')).toHaveTextContent('0');
  },
};
