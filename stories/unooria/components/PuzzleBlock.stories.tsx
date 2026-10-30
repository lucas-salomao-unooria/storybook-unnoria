import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { PUZZLE_BLOCK_DRAG_TYPE, PuzzleBlock } from '../../../src/unooria/components/PuzzleBlock';
import type { PuzzleBlockState } from '../../../src/unooria/components/PuzzleBlock';
import '../../../src/unooria/tokens/icons.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/* ---------------------------------------------------------------------------
   Conteúdo de demonstração — os blocos da "Chave do Editor" (Jornal da Escola,
   4º ano). O texto de verdade da missão mora na experiência, não aqui.
   ------------------------------------------------------------------------- */

const FONTE = {
  label: 'Fonte',
  description: 'De onde veio? É canal oficial ou confiável?',
  icon: 'account_balance',
};
const DATA = {
  label: 'Data',
  description: 'Quando aconteceu? É de hoje ou do passado?',
  icon: 'calendar_month',
};
const AUTORIA = {
  label: 'Autoria',
  description: 'Quem assina? Alguém se responsabiliza pelo texto?',
  icon: 'history_edu',
};
const FOTO_BONITA = {
  label: 'Foto bonita',
  description: 'Tem uma imagem caprichada? Parece profissional?',
  icon: 'photo_camera',
};

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

const Grade: React.FC<{ children: React.ReactNode; min?: number }> = ({ children, min = 220 }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))`,
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
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
        gap: 'var(--unooria-spacing-m)',
        padding: 'var(--unooria-spacing-m)',
        borderRadius: 12,
        background: escuro ? 'var(--unooria-color-neutraldark-100)' : 'var(--unooria-color-neutral-100)',
      }}
    >
      {children}
    </div>
  </div>
);

/** Um exemplo com legenda — a legenda diz o estado, o bloco o mostra. */
const Exemplo: React.FC<{ legenda: string; escuro?: boolean; children: React.ReactNode }> = ({
  legenda,
  escuro = false,
  children,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingRight: 8 }}>
    <code
      style={{
        fontSize: 12,
        color: escuro ? 'var(--unooria-color-neutraldark-900)' : 'var(--unooria-color-neutral-700)',
      }}
    >
      {legenda}
    </code>
    {children}
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
  <div style={{ overflowX: 'auto' }}>
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
  </div>
);

const ESTADOS: { estado: PuzzleBlockState; bloco: typeof FONTE; nota: string }[] = [
  { estado: 'idle', bloco: FONTE, nota: 'Na bandeja, esperando o toque.' },
  { estado: 'placed', bloco: DATA, nota: 'Encaixado numa vaga. Tocar devolve.' },
  { estado: 'returned', bloco: FOTO_BONITA, nota: 'Era isca e voltou — aviso escrito, não só cor.' },
  { estado: 'locked', bloco: AUTORIA, nota: 'Chave formada: focável, mas não se mexe.' },
];

/**
 * Página de documentação rica do componente PuzzleBlock.
 */
const PuzzleBlockDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<'light' | 'dark'>('light');
  const escuro = tema === 'dark';

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Jornal"
        title="PuzzleBlock"
        description="A peça de quebra-cabeça da Chave do Editor: um botão com recorte à esquerda e saliência à direita que a criança TOCA para encaixar na calha (PuzzleTrack) e toca de novo para devolver. Não sabe se é peça certa ou isca — só desenha o estado que o consumidor informa, porque o gabarito é do servidor."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Uma escolha que se monta por partes, para quem tem 9 anos e um Chromebook da escola."
      />
      <Grade>
        <Cartao icone="👆" titulo="Toque, não arraste">
          Tocar na bandeja encaixa na primeira vaga livre; tocar na vaga devolve. Arrastar exclui quem
          usa teclado ou leitor de tela, e num touchpad de Chromebook é a interação que mais falha.
        </Cartao>
        <Cartao icone="🔊" titulo="Nome curto, pergunta à parte">
          O nome do botão é só o <code>label</code> (“Fonte”). A pergunta de apoio e o aviso de volta
          vão para a descrição acessível, lida em seguida.
        </Cartao>
        <Cartao icone="🙈" titulo="Não sabe a resposta">
          O bloco não tem prop de “certo”: um componente que soubesse o gabarito o entregaria no bundle.
          Quem corrige é a api (regra 3 da plataforma).
        </Cartao>
        <Cartao icone="☝️" titulo="Escolher antes de encaixar">
          Com <code>selected</code>, o bloco vira botão de alternância (<code>aria-pressed</code>): é o
          primeiro tempo de “toca o cartão, toca a vaga”, quando há mais de uma calha. O segundo é o{' '}
          <code>onSlotActivate</code> do <code>PuzzleTrack</code>.
        </Cartao>
        <Cartao icone="↩️" titulo="Aviso escrito">
          Quando a isca volta para a bandeja, o bloco diz “Voltou para a bandeja” com o glifo{' '}
          <code>replay</code>, e treme uma vez — sem tremida com movimento reduzido.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Design próprio: a seção não tem quadro de quebra-cabeça."
      />
      <Grade>
        <Cartao icone="📐" titulo="Medidas (do próprio pacote)">
          Raio de 12px e rótulo semibold do <code>Button</code> <code>lg</code>; fio de 1px e recuo de
          16px do <code>Card</code>; altura mínima de 64px; o aviso de volta é uma pastilha com as
          medidas da <code>Tag</code> (14px, raio de 8px). Encaixe de 9px de raio.
        </Cartao>
        <Cartao icone="🧩" titulo="A forma, sem imagem">
          O recorte da esquerda é uma máscara CSS — o buraco mostra a superfície de trás, qualquer que
          seja. A saliência da direita é meio círculo com o mesmo fundo e fio. Nada de SVG nem bitmap.
        </Cartao>
        <Cartao icone="🎨" titulo="Cores">
          Repouso em <code>neutral-50</code> com fio <code>neutral-400</code> (3,4:1).{' '}
          <code>placed</code> em <code>brandnavy-600</code>, a cor de destaque da seção 2.1, com rótulo{' '}
          <code>brandpurple-950</code> (7,8:1). <code>returned</code> com fio <code>warning-600</code>;{' '}
          <code>locked</code> em <code>success-100</code> com fio <code>success-700</code>.{' '}
          <code>selected</code>: fio de 2px em <code>brandnavy-800</code> sobre <code>brandnavy-50</code>{' '}
          (5,18:1) e o glifo <code>check_circle</code> preenchido; no escuro, fio{' '}
          <code>brandnavy-400</code> sobre véu <code>opacity-brandnavy-200</code> (5,52:1).
        </Cartao>
        <Cartao icone="🔣" titulo="Glifos: todos do quadro">
          Todos os glifos vêm do quadro de ícones da seção (<code>6024:2923</code>), pelo nome da
          ligadura do Material Symbols Rounded, peso 300 — nada desenhado, nada de outra biblioteca: o
          aviso de volta usa <code>replay</code>, o travado usa <code>lock</code>, o escolhido usa{' '}
          <code>check_circle</code>, e os blocos da
          demonstração usam <code>account_balance</code>, <code>calendar_month</code>,{' '}
          <code>history_edu</code> e <code>photo_camera</code>. <code>undo</code> e{' '}
          <code>draw</code>, os primeiros candidatos, ficaram de fora por não estarem no quadro.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Um botão, três camadas de forma e o texto por cima."
      />
      <Palco rotulo="Bloco em repouso, com as zonas numeradas abaixo">
        <PuzzleBlock {...FONTE} />
        <ol style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.7, color: 'var(--unooria-color-neutral-700)' }}>
          <li>
            <strong>Recorte</strong> (esquerda): máscara no corpo; o fio da curva é o <code>::before</code>.
          </li>
          <li>
            <strong>Ícone</strong> (<code>icon</code>): decorativo, <code>aria-hidden</code>.
          </li>
          <li>
            <strong>Rótulo</strong> (<code>label</code>): caixa alta por CSS, é o NOME do botão.
          </li>
          <li>
            <strong>Pergunta de apoio</strong> (<code>description</code>): a DESCRIÇÃO do botão.
          </li>
          <li>
            <strong>Saliência</strong> (direita): o <code>::after</code>, que sai 8px da caixa.
          </li>
          <li>
            <strong>Aviso</strong> (<code>returnedLabel</code>) e <strong>cadeado</strong>: só em{' '}
            <code>returned</code> e <code>locked</code>.
          </li>
        </ol>
      </Palco>

      <UnooriaDocSectionHeader
        title="4. Matriz de Variantes e Estados"
        description="Os quatro momentos da jogada, e o bloco com e sem apoio."
      />
      <Palco rotulo="state">
        {ESTADOS.map(({ estado, bloco, nota }) => (
          <Exemplo key={estado} legenda={`state="${estado}" — ${nota}`}>
            <PuzzleBlock {...bloco} state={estado} />
          </Exemplo>
        ))}
      </Palco>
      <Palco rotulo="Composição">
        <Exemplo legenda="só label">
          <PuzzleBlock label="Tem urgente" />
        </Exemplo>
        <Exemplo legenda="label + icon">
          <PuzzleBlock label="Muita gente repassou" icon="share" />
        </Exemplo>
        <Exemplo legenda='returnedLabel="Tente outro bloco"'>
          <PuzzleBlock {...FOTO_BONITA} state="returned" returnedLabel="Tente outro bloco" />
        </Exemplo>
      </Palco>
      <Palco rotulo="selected — o primeiro tempo de “toca o cartão, toca a vaga”">
        <Exemplo legenda="sem a prop: sem aria-pressed (o de sempre)">
          <PuzzleBlock {...FONTE} />
        </Exemplo>
        <Exemplo legenda="selected={false}: aria-pressed=false">
          <PuzzleBlock {...FONTE} selected={false} />
        </Exemplo>
        <Exemplo legenda="selected: aria-pressed=true, fio de 2px e check_circle">
          <PuzzleBlock {...FONTE} selected />
        </Exemplo>
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso do bloco." />
      <Praticas
        fazer={[
          'Escrever o label em caixa normal ("Fonte"): o CSS põe em caixa alta e o leitor não soletra.',
          'Dar às iscas o mesmo formato das peças certas — ícone e pergunta de apoio —, para o visual não entregar a resposta.',
          'Voltar o bloco de returned para idle na jogada seguinte: o aviso é breve.',
          'Anunciar a jogada no status do PuzzleTrack (aria-live); o bloco guarda o aviso visível e na descrição.',
          'Mover o foco quando o bloco troca de lugar — para o próximo da bandeja, ou para o botão de enviar.',
        ]}
        evitar={[
          'Decidir no cliente se o bloco é certo: o gabarito é do servidor.',
          'Usar disabled para a chave formada: locked mantém o bloco no Tab e legível.',
          'Implementar arraste por cima do bloco.',
          'Pintar o returned só de laranja, sem o texto.',
          'Pôr o bloco dentro de outro botão ou link.',
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
      <Palco rotulo={`Tema ${escuro ? 'escuro' : 'claro'}`} escuro={escuro}>
        {ESTADOS.map(({ estado, bloco }) => (
          <Exemplo key={estado} legenda={`state="${estado}"`} escuro={escuro}>
            <PuzzleBlock {...bloco} state={estado} theme={tema} />
          </Exemplo>
        ))}
        <Exemplo legenda="selected" escuro={escuro}>
          <PuzzleBlock {...FONTE} selected theme={tema} />
        </Exemplo>
      </Palco>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente PuzzleBlock. Estende os atributos de <button>, menos title."
      />
      <TabelaDeProps
        linhas={[
          { nome: 'label', tipo: 'React.ReactNode', descricao: 'Nome da peça; é o nome acessível do botão. Obrigatório.' },
          { nome: 'description', tipo: 'React.ReactNode', descricao: 'Pergunta de apoio; vira a descrição acessível.' },
          { nome: 'icon', tipo: 'string', descricao: 'Ligadura do Material Symbols Rounded, à esquerda. Decorativo.' },
          {
            nome: 'state',
            tipo: "'idle' | 'placed' | 'returned' | 'locked'",
            padrao: "'idle'",
            descricao: 'Momento da jogada. locked aplica aria-disabled e ignora o onClick.',
          },
          {
            nome: 'returnedLabel',
            tipo: 'string',
            padrao: "'Voltou para a bandeja'",
            descricao: 'Aviso escrito do estado returned, também na descrição acessível.',
          },
          {
            nome: 'selected',
            tipo: 'boolean',
            descricao:
              'Escolhido, à espera da vaga. Presente (true ou false), aplica aria-pressed; ausente, nada muda. Fio de 2px e check_circle quando true.',
          },
          {
            nome: 'dragData',
            tipo: 'string',
            descricao:
              "Torna o bloco arrastável (draggable): o dragstart grava este dado no dataTransfer com o tipo 'application/x-unooria-puzzle-block' (PUZZLE_BLOCK_DRAG_TYPE), que a vaga do PuzzleTrack com onSlotDrop lê. Caminho A MAIS: o toque segue igual. Translúcido enquanto arrastado; cursor grab/grabbing com ponteiro fino. Não arrasta em locked.",
          },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
          { nome: 'className', tipo: 'string', descricao: 'Classe CSS adicional.' },
          { nome: 'onClick', tipo: '(e) => void', descricao: 'O toque. Não é chamado em locked.' },
          {
            nome: 'onDragStart / onDragEnd',
            tipo: '(e: React.DragEvent) => void',
            descricao: 'Repassados ao botão, depois do tratamento do dragData.',
          },
          { nome: 'type', tipo: "'button' | 'submit' | 'reset'", padrao: "'button'", descricao: 'Tipo do botão nativo.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof PuzzleBlock> = {
  title: 'Plataforma Unooria/Componentes/PuzzleBlock',
  component: PuzzleBlock,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Nome da peça (nome acessível).' },
    description: { control: 'text', description: 'Pergunta de apoio (descrição acessível).' },
    icon: { control: 'text', description: 'Ligadura do Material Symbols Rounded.' },
    state: {
      control: 'radio',
      options: ['idle', 'placed', 'returned', 'locked'],
      description: 'Momento da jogada.',
    },
    returnedLabel: { control: 'text', description: 'Aviso do estado returned.' },
    selected: { control: 'boolean', description: 'Escolhido, à espera da vaga (aria-pressed).' },
    dragData: { control: 'text', description: 'Torna o bloco arrastável, com este dado no dataTransfer.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    disabled: { control: 'boolean', description: 'Desabilitado nativo (sai do Tab).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
    onClick: { action: 'onClick' },
  },
  args: {
    label: FONTE.label,
    description: FONTE.description,
    icon: FONTE.icon,
    state: 'idle',
    returnedLabel: 'Voltou para a bandeja',
    theme: 'light',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof PuzzleBlock>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PuzzleBlockDocumentationPage />,
};

/**
 * Playground com todas as propriedades do PuzzleBlock expostas. O fundo acompanha
 * o tema, porque o recorte mostra a superfície de trás.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PuzzleBlock',
  render: (args) => (
    <div
      style={{
        maxWidth: 360,
        padding: 24,
        borderRadius: 12,
        background:
          args.theme === 'dark' ? 'var(--unooria-color-neutraldark-100)' : 'var(--unooria-color-neutral-100)',
      }}
    >
      <PuzzleBlock {...args} />
    </div>
  ),
};

/**
 * Os quatro estados, com o nome e a descrição acessíveis conferidos, e o toque
 * num bloco travado que não chega ao `onClick`.
 */
export const Estados: Story = {
  args: { onClick: fn() },
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
      <PuzzleBlock {...FONTE} onClick={args.onClick} />
      <PuzzleBlock {...DATA} state="placed" onClick={args.onClick} />
      <PuzzleBlock {...FOTO_BONITA} state="returned" onClick={args.onClick} />
      <PuzzleBlock {...AUTORIA} state="locked" onClick={args.onClick} />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);

    // O rótulo é o nome do botão — sozinho —, e a pergunta é a descrição.
    const fonte = tela.getByRole('button', { name: 'Fonte' });
    await expect(fonte).toHaveAttribute('type', 'button');
    await expect(fonte).toHaveAccessibleDescription('De onde veio? É canal oficial ou confiável?');
    await expect(fonte).not.toHaveAttribute('aria-disabled');
    await userEvent.click(fonte);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    await expect(tela.getByRole('button', { name: 'Data' })).toHaveAttribute('data-state', 'placed');

    // Voltou: o aviso está escrito na tela E vem primeiro na descrição.
    const foto = tela.getByRole('button', { name: 'Foto bonita' });
    await expect(within(foto).getByText('Voltou para a bandeja')).toBeVisible();
    await expect(foto).toHaveAccessibleDescription(/^Voltou para a bandeja/);

    // Travado: aria-disabled, continua focável, e o toque não chega ao onClick.
    const autoria = tela.getByRole('button', { name: 'Autoria' });
    await expect(autoria).toHaveAttribute('aria-disabled', 'true');
    await expect(autoria).toBeEnabled();
    await userEvent.click(autoria);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * `selected`: o primeiro tempo de "toca o cartão, toca a vaga". O bloco vira
 * botão de alternância só quando a prop existe — sem ela, nenhum `aria-pressed`.
 */
export const Selecionado: Story = {
  render: () => {
    const Bandeja = () => {
      const [escolhido, setEscolhido] = useState<string | null>(null);
      return (
        <div style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
          {[FONTE, DATA].map((bloco) => (
            <PuzzleBlock
              key={bloco.label}
              {...bloco}
              selected={escolhido === bloco.label}
              onClick={() => setEscolhido((atual) => (atual === bloco.label ? null : bloco.label))}
            />
          ))}
          <PuzzleBlock {...AUTORIA} />
          <PuzzleBlock {...FOTO_BONITA} state="locked" selected />
        </div>
      );
    };
    return <Bandeja />;
  },
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const fonte = tela.getByRole('button', { name: 'Fonte' });
    const data = tela.getByRole('button', { name: 'Data' });

    // Com a prop: botão de alternância, ainda não pressionado.
    await expect(fonte).toHaveAttribute('aria-pressed', 'false');
    await expect(fonte).not.toHaveAttribute('data-selected');

    // Sem a prop: o bloco de antes, sem aria-pressed.
    await expect(tela.getByRole('button', { name: 'Autoria' })).not.toHaveAttribute('aria-pressed');

    // Escolher: pressionado, marcado e com o glifo (não só cor).
    await userEvent.click(fonte);
    await expect(fonte).toHaveAttribute('aria-pressed', 'true');
    await expect(fonte).toHaveAttribute('data-selected', 'true');
    await expect(fonte).toHaveClass('unooria-puzzle-block--selected');
    await expect(fonte.querySelector('.unooria-puzzle-block__check')).not.toBeNull();

    // Escolher outro troca a escolha; o nome continua só o rótulo.
    await userEvent.click(data);
    await expect(fonte).toHaveAttribute('aria-pressed', 'false');
    await expect(data).toHaveAttribute('aria-pressed', 'true');
    await expect(tela.getByRole('button', { name: 'Data', pressed: true })).toBe(data);

    // Teclado: Espaço desfaz a escolha.
    data.focus();
    await userEvent.keyboard(' ');
    await expect(data).toHaveAttribute('aria-pressed', 'false');

    // Travado e escolhido: o visual de travado manda — sem o check e sem a classe.
    const foto = tela.getByRole('button', { name: 'Foto bonita' });
    await expect(foto).toHaveAttribute('aria-disabled', 'true');
    await expect(foto).not.toHaveClass('unooria-puzzle-block--selected');
    await expect(foto.querySelector('.unooria-puzzle-block__check')).toBeNull();

    // Deixa um escolhido à vista, para a inspeção visual da estória.
    await userEvent.click(fonte);
    await expect(fonte).toHaveAttribute('aria-pressed', 'true');
  },
};

/**
 * `size="sm"`: a peça COMPACTA da vaga estreita — a calha em duas colunas da
 * classificação da exp01em1b, num celular de 375px. Rótulo em caixa normal e
 * quebra só entre palavras: "Trilha Avançada" nunca vira "TRILHA AVANÇAD/A".
 */
export const Compacto: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: 300 }}>
      <div style={{ display: 'grid', gap: 8 }}>
        <PuzzleBlock label="Trilha Avançada" state="placed" size="sm" />
        <PuzzleBlock label="Nome e Turma" state="placed" size="sm" />
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        <PuzzleBlock label="Horário (23h45)" state="placed" size="sm" />
        <PuzzleBlock label="Modelo Aparelho" state="placed" size="sm" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const trilha = tela.getByRole('button', { name: 'Trilha Avançada' });
    await expect(trilha).toHaveClass('unooria-puzzle-block--size-sm');
    // Alvo de toque de pelo menos 44px.
    await expect(trilha.getBoundingClientRect().height).toBeGreaterThanOrEqual(44);
    // Caixa normal: o CSS não sobe para maiúsculas.
    const rotulo = trilha.querySelector('.unooria-puzzle-block__label') as HTMLElement;
    await expect(getComputedStyle(rotulo).textTransform).toBe('none');
    await expect(getComputedStyle(rotulo).overflowWrap).toBe('break-word');
    // Sem a prop, o bloco de sempre (md).
  },
};

/** Dispara um evento de arraste com um `DataTransfer` compartilhado (o `userEvent` não arrasta). */
const dispararArraste = (alvo: Element, tipo: string, dados: DataTransfer) =>
  alvo.dispatchEvent(new DragEvent(tipo, { bubbles: true, cancelable: true, dataTransfer: dados }));

/**
 * `dragData`: o bloco ARRASTÁVEL, nos dois temas. O `dragstart` grava o dado com
 * o tipo `application/x-unooria-puzzle-block`, e o bloco fica translúcido até o
 * `dragend`. É um caminho a mais: o toque (`onClick`) segue igual, e em
 * `locked` o bloco não se arrasta. Sem a prop, nada de `draggable`.
 */
export const Arrastavel: Story = {
  name: 'Arrastável (dragData)',
  args: { onClick: fn(), onDragEnd: fn() },
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
      <PuzzleBlock {...FONTE} dragData="fonte" onClick={args.onClick} onDragEnd={args.onDragEnd} />
      <PuzzleBlock label="Data" icon="calendar_month" dragData="data" state="locked" />
      <PuzzleBlock label="Autoria" icon="history_edu" />
      <div style={{ padding: 16, borderRadius: 12, background: 'var(--unooria-color-neutraldark-100)' }}>
        <PuzzleBlock label="Fonte (escuro)" icon="account_balance" dragData="fonte-escuro" theme="dark" />
      </div>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const fonte = tela.getByRole('button', { name: 'Fonte' });
    await expect(fonte).toHaveAttribute('draggable', 'true');
    await expect(fonte).toHaveClass('unooria-puzzle-block--draggable');

    // O arraste grava o dado no tipo do pacote e deixa o bloco translúcido.
    const dados = new DataTransfer();
    dispararArraste(fonte, 'dragstart', dados);
    await expect(dados.getData(PUZZLE_BLOCK_DRAG_TYPE)).toBe('fonte');
    await expect(dados.types).not.toContain('text/plain');
    await waitFor(() => expect(fonte).toHaveAttribute('data-dragging', 'true'));
    await expect(Number(getComputedStyle(fonte).opacity)).toBeLessThan(1);
    dispararArraste(fonte, 'dragend', dados);
    await waitFor(() => expect(fonte).not.toHaveAttribute('data-dragging'));
    await expect(args.onDragEnd).toHaveBeenCalledTimes(1);

    // O toque continua sendo o caminho principal.
    await userEvent.click(fonte);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    // Travado não se arrasta; sem a prop, nenhum atributo novo.
    await expect(tela.getByRole('button', { name: 'Data' })).not.toHaveAttribute('draggable');
    await expect(tela.getByRole('button', { name: 'Autoria' })).not.toHaveAttribute('draggable');
    await expect(tela.getByRole('button', { name: 'Fonte (escuro)' })).toHaveAttribute('draggable', 'true');
  },
};
