import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import { AudioPlayer } from '../../../src/unooria/components/AudioPlayer';
import '../../../src/unooria/tokens/icons.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Um WAV de silêncio, gerado na hora: 8 kHz, mono, 8 bits. Serve para a
 * documentação e o teste terem um áudio de verdade (com duração) sem trazer
 * arquivo nenhum para o repositório.
 */
const wavDeSilencio = (segundos: number): string => {
  const taxa = 8000;
  const amostras = taxa * segundos;
  const buffer = new ArrayBuffer(44 + amostras);
  const v = new DataView(buffer);
  const texto = (pos: number, s: string) => [...s].forEach((c, i) => v.setUint8(pos + i, c.charCodeAt(0)));
  texto(0, 'RIFF');
  v.setUint32(4, 36 + amostras, true);
  texto(8, 'WAVE');
  texto(12, 'fmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, taxa, true);
  v.setUint32(28, taxa, true);
  v.setUint16(32, 1, true);
  v.setUint16(34, 8, true);
  texto(36, 'data');
  v.setUint32(40, amostras, true);
  for (let i = 0; i < amostras; i += 1) v.setUint8(44 + i, 128);
  let binario = '';
  new Uint8Array(buffer).forEach((b) => {
    binario += String.fromCharCode(b);
  });
  return `data:audio/wav;base64,${btoa(binario)}`;
};

/** Um endereço que o navegador não consegue decodificar — o estado de erro. */
const AUDIO_QUEBRADO = 'data:audio/mpeg;base64,AAAA';

const useSilencio = (segundos: number) => useMemo(() => wavDeSilencio(segundos), [segundos]);

/* ---------------------------------------------------------------------------
   Peças da página de documentação — só tokens, nenhuma cor avulsa (seção 2).
   ------------------------------------------------------------------------- */

const Cartao: React.FC<{ icone: string; titulo: string; children: React.ReactNode }> = ({
  icone,
  titulo,
  children,
}) => (
  <div
    style={{
      padding: 'var(--unooria-spacing-s)',
      border: '1px solid var(--unooria-color-neutral-150)',
      borderRadius: 12,
      background: 'var(--unooria-color-neutral-50)',
      color: 'var(--unooria-color-neutral-700)',
      fontSize: 14,
      lineHeight: 1.6,
    }}
  >
    <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--unooria-color-neutral-950)' }}>
      {icone} {titulo}
    </p>
    {children}
  </div>
);

const Grade: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 'var(--unooria-spacing-s)',
      marginBottom: 'var(--unooria-spacing-l)',
    }}
  >
    {children}
  </div>
);

const Palco: React.FC<{ rotulo: string; escuro?: boolean; children: React.ReactNode }> = ({
  rotulo,
  escuro = false,
  children,
}) => (
  <div style={{ marginBottom: 'var(--unooria-spacing-m)' }}>
    <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--unooria-color-neutral-700)' }}>{rotulo}</p>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--unooria-spacing-s)',
        padding: 'var(--unooria-spacing-m)',
        borderRadius: 12,
        background: escuro ? 'var(--unooria-color-neutraldark-100)' : 'var(--unooria-color-neutral-100)',
      }}
    >
      {children}
    </div>
  </div>
);

const Praticas: React.FC<{ fazer: string[]; evitar: string[] }> = ({ fazer, evitar }) => (
  <Grade>
    <Cartao icone="✓" titulo="O que fazer">
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {fazer.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Cartao>
    <Cartao icone="✕" titulo="O que evitar">
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {evitar.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Cartao>
  </Grade>
);

const TabelaDeProps: React.FC<{
  linhas: { nome: string; tipo: string; padrao?: string; descricao: string }[];
}> = ({ linhas }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
    <thead>
      <tr style={{ color: 'var(--unooria-color-neutral-950)' }}>
        {['Prop', 'Tipo', 'Padrão', 'Descrição'].map((c) => (
          <th key={c} style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-200)' }}>
            {c}
          </th>
        ))}
      </tr>
    </thead>
    <tbody style={{ color: 'var(--unooria-color-neutral-700)' }}>
      {linhas.map((l) => (
        <tr key={l.nome}>
          <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
            <code>{l.nome}</code>
          </td>
          <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
            <code>{l.tipo}</code>
          </td>
          <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
            {l.padrao ? <code>{l.padrao}</code> : '—'}
          </td>
          <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>{l.descricao}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

/**
 * Página de documentação rica do componente AudioPlayer.
 */
const AudioPlayerDocumentationPage: React.FC = () => {
  const silencio = useSilencio(3);
  const [tema, setTema] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Mídia"
        title="AudioPlayer"
        description="O player de um áudio longo — o podcast de uma missão, uma gravação de aula: o botão Ouvir/Pausar com rótulo visível, a barra de posição que se arrasta e o tempo decorrido e total. Sem arquivo, ele aparece desabilitado com o motivo à vista, e não some."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Um áudio que a pessoa ouve inteiro ou em partes, com a transcrição ao lado."
      />
      <Grade>
        <Cartao icone="▶️" titulo="Rótulo visível">
          O botão diz Ouvir ou Pausar — não é só um ícone. É o <code>Button</code> primário do
          pacote, com o foco e os estados dele.
        </Cartao>
        <Cartao icone="⏩" titulo="Posição que se arrasta">
          A barra é um <code>input type=&quot;range&quot;</code> nativo: setas do teclado andam de um em um
          segundo, e o leitor de tela ouve “1 min 10 s de 3 min 45 s”.
        </Cartao>
        <Cartao icone="⏸️" titulo="Indisponível, não sumido">
          Sem <code>src</code>, ou com <code>unavailableReason</code>, o botão fica desabilitado e o
          motivo aparece no lugar da barra.
        </Cartao>
        <Cartao icone="📝" titulo="Transcrição por fora">
          O player não carrega a transcrição: quem usa a põe na tela, junto dele. Áudio sem texto
          exclui quem não ouve.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Design próprio: a seção não tem quadro de áudio."
      />
      <Grade>
        <Cartao icone="📐" titulo="Medidas">
          Cartão com fio de 1px e raio de 12px, como o <code>Card</code>; recuo de 16px; trilha de
          4px, a espessura da <code>ProgressBar</code> <code>sm</code>; puxador de 14px.
        </Cartao>
        <Cartao icone="🎨" titulo="Cores">
          Trilha preenchida em <code>brandpurple-950</code>, a cor do <code>Button</code> primário;
          fundo da trilha em <code>neutral-150</code>. No escuro, <code>neutraldark-950</code> sobre{' '}
          <code>neutraldark-200</code>.
        </Cartao>
        <Cartao icone="⚠️" titulo="Desvio registrado">
          O quadro de ícones (<code>6024:2923</code>) publica <code>pause</code> mas não{' '}
          <code>play_arrow</code>. O glifo vem da MESMA biblioteca-base (Material Symbols Rounded,
          peso 300), pelo nome — nada foi desenhado.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Título, apoio, o botão e a barra com o tempo."
      />
      <Palco rotulo="Com um áudio de 3 s (silêncio gerado na hora)">
        <AudioPlayer
          src={silencio}
          title="Podcast de recapitulação — A Seleção"
          description="Lucas e Clara · cerca de 3 min 45 s"
        />
      </Palco>

      <UnooriaDocSectionHeader
        title="4. Matriz de Variantes e Estados"
        description="Pronto, indisponível e com erro de carregamento."
      />
      <Palco rotulo="Indisponível (unavailableReason)">
        <AudioPlayer
          title="Podcast de recapitulação — A Seleção"
          unavailableReason="O áudio ainda não foi gerado. Gere no preparo da aula; a transcrição está logo abaixo."
        />
      </Palco>
      <Palco rotulo="Arquivo que não carrega">
        <AudioPlayer src={AUDIO_QUEBRADO} title="Podcast de recapitulação — A Seleção" />
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso do player." />
      <Praticas
        fazer={[
          'Pôr a transcrição na mesma tela do player.',
          'Dizer em unavailableReason o que falta e o que fazer.',
          'Usar preload="metadata" para mostrar a duração sem baixar o arquivo.',
          'Dar um título que nomeie o áudio — ele nomeia o grupo para o leitor de tela.',
        ]}
        evitar={[
          'Esconder o player quando o áudio não existe.',
          'Tocar sozinho ao carregar a página.',
          'Usar o player para som curto de interface.',
          'Pôr o <audio controls> nativo ao lado: dois conjuntos de controles para a mesma fonte.',
        ]}
      />

      <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Claro e escuro, em tempo real." />
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {(['light', 'dark'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTema(t)}
            aria-pressed={tema === t}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid var(--unooria-color-neutral-200)',
              background: tema === t ? 'var(--unooria-color-neutral-150)' : 'var(--unooria-color-neutral-50)',
              color: 'var(--unooria-color-neutral-950)',
              cursor: 'pointer',
            }}
          >
            {t === 'light' ? 'Claro' : 'Escuro'}
          </button>
        ))}
      </div>
      <Palco rotulo={`Tema ${tema === 'light' ? 'claro' : 'escuro'}`} escuro={tema === 'dark'}>
        <AudioPlayer
          theme={tema}
          src={silencio}
          title="Podcast de recapitulação — A Seleção"
          description="Lucas e Clara · cerca de 3 min 45 s"
        />
        <AudioPlayer theme={tema} title="Podcast de recapitulação" unavailableReason="Ainda não gerado." />
      </Palco>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente AudioPlayer."
      />
      <TabelaDeProps
        linhas={[
          { nome: 'src', tipo: 'string', descricao: 'Endereço do áudio. Ausente, o player fica desabilitado.' },
          { nome: 'title', tipo: 'React.ReactNode', descricao: 'Nome do áudio; nomeia o grupo. Obrigatório.' },
          { nome: 'description', tipo: 'React.ReactNode', descricao: 'Linha de apoio (quem fala, a duração).' },
          { nome: 'unavailableReason', tipo: 'React.ReactNode', descricao: 'Por que não toca agora; desabilita e mostra o motivo.' },
          { nome: 'preload', tipo: "'none' | 'metadata' | 'auto'", padrao: "'metadata'", descricao: 'O que baixar antes do primeiro toque.' },
          { nome: 'playLabel', tipo: 'string', padrao: "'Ouvir'", descricao: 'Rótulo do botão para tocar.' },
          { nome: 'pauseLabel', tipo: 'string', padrao: "'Pausar'", descricao: 'Rótulo do botão para pausar.' },
          { nome: 'seekLabel', tipo: 'string', padrao: "'Posição no áudio'", descricao: 'Nome acessível da barra.' },
          { nome: 'errorLabel', tipo: 'React.ReactNode', padrao: "'Não foi possível carregar o áudio.'", descricao: 'Mensagem de falha.' },
          { nome: 'retryLabel', tipo: 'string', padrao: "'Tentar de novo'", descricao: 'Rótulo do botão que recarrega.' },
          { nome: 'onPlay / onPause / onEnded / onError', tipo: '() => void', descricao: 'Eventos do áudio.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof AudioPlayer> = {
  title: 'Plataforma Unooria/Componentes/AudioPlayer',
  component: AudioPlayer,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text', description: 'Endereço do áudio.' },
    title: { control: 'text', description: 'Nome do áudio.' },
    description: { control: 'text', description: 'Linha de apoio.' },
    unavailableReason: { control: 'text', description: 'Motivo de indisponibilidade.' },
    preload: { control: 'radio', options: ['none', 'metadata', 'auto'], description: 'Pré-carregamento.' },
    playLabel: { control: 'text', description: 'Rótulo de tocar.' },
    pauseLabel: { control: 'text', description: 'Rótulo de pausar.' },
    seekLabel: { control: 'text', description: 'Nome da barra de posição.' },
    errorLabel: { control: 'text', description: 'Mensagem de falha.' },
    retryLabel: { control: 'text', description: 'Rótulo de recarregar.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onPlay: { action: 'onPlay' },
    onPause: { action: 'onPause' },
    onEnded: { action: 'onEnded' },
    onError: { action: 'onError' },
  },
  args: {
    title: 'Podcast de recapitulação — A Seleção',
    description: 'Lucas e Clara · cerca de 3 min 45 s',
    preload: 'metadata',
    playLabel: 'Ouvir',
    pauseLabel: 'Pausar',
    seekLabel: 'Posição no áudio',
    retryLabel: 'Tentar de novo',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof AudioPlayer>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AudioPlayerDocumentationPage />,
};

/**
 * Playground com todas as propriedades do AudioPlayer expostas. Sem `src`, o
 * playground usa um silêncio de 5 s gerado na hora.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do AudioPlayer',
  render: function PlaygroundRender(args) {
    const silencio = useSilencio(5);
    return (
      <div style={{ maxWidth: 560 }}>
        <AudioPlayer {...args} src={args.src || (args.unavailableReason ? undefined : silencio)} />
      </div>
    );
  },
};

/**
 * Indisponível com o motivo, pronto com a duração lida, e o erro de carregamento.
 */
export const Estados: Story = {
  render: function EstadosRender() {
    const silencio = useSilencio(2);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
        <AudioPlayer title="Indisponível" unavailableReason="O áudio ainda não foi gerado." />
        <AudioPlayer title="Pronto" src={silencio} />
        <AudioPlayer title="Quebrado" src={AUDIO_QUEBRADO} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const [indisponivel, pronto, quebrado] = tela.getAllByRole('group');

    const semAudio = within(indisponivel);
    await expect(semAudio.getByRole('button', { name: 'Ouvir' })).toBeDisabled();
    await expect(semAudio.getByText('O áudio ainda não foi gerado.')).toBeInTheDocument();
    await expect(semAudio.queryByRole('slider')).not.toBeInTheDocument();

    const comAudio = within(pronto);
    await expect(comAudio.getByRole('button', { name: 'Ouvir' })).toBeEnabled();
    const barra = comAudio.getByRole('slider', { name: 'Posição no áudio' });
    await waitFor(() => expect(barra).toHaveAttribute('aria-valuetext', '0 s de 2 s'), { timeout: 4000 });
    await expect(comAudio.getByText('0:00 / 0:02')).toBeInTheDocument();

    const comErro = within(quebrado);
    await waitFor(() => expect(comErro.getByRole('alert')).toHaveTextContent('Não foi possível carregar o áudio.'), {
      timeout: 4000,
    });
    await expect(comErro.getByRole('button', { name: 'Tentar de novo' })).toBeInTheDocument();
  },
};
