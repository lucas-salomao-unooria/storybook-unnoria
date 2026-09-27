import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { PuzzleBlock } from '../../../src/unooria/components/PuzzleBlock';
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
          <code>locked</code> em <code>success-100</code> com fio <code>success-700</code>.
        </Cartao>
        <Cartao icone="🔣" titulo="Glifos: todos do quadro">
          Todos os glifos vêm do quadro de ícones da seção (<code>6024:2923</code>), pelo nome da
          ligadura do Material Symbols Rounded, peso 300 — nada desenhado, nada de outra biblioteca: o
          aviso de volta usa <code>replay</code>, o travado usa <code>lock</code>, e os blocos da
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
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
          { nome: 'className', tipo: 'string', descricao: 'Classe CSS adicional.' },
          { nome: 'onClick', tipo: '(e) => void', descricao: 'O toque. Não é chamado em locked.' },
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
