import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { RevealClue } from '../../../src/unooria/components/RevealClue';
import { Button } from '../../../src/unooria/components/Button';
import '../../../src/unooria/tokens/icons.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/* ---------------------------------------------------------------------------
   Conteúdo de demonstração — as três pistas de uma notícia da missão
   "Jornal da Escola" (4º ano). Os ícones são todos do quadro 6024:2923.
   ------------------------------------------------------------------------- */

const PISTAS = [
  {
    label: 'Fonte',
    question: 'De onde veio?',
    icon: 'account_balance',
    texto: 'Site da Prefeitura de Vila Serena, na página de notícias da cidade.',
  },
  {
    label: 'Data',
    question: 'Quando aconteceu?',
    icon: 'calendar_month',
    texto: 'Publicada em 12 de setembro de 2026, um sábado.',
  },
  {
    label: 'Autoria',
    question: 'Quem assina?',
    icon: 'history_edu',
    texto: 'Texto de Marina Lopes, jornalista da Secretaria de Meio Ambiente.',
  },
] as const;

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
        maxWidth: 420,
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

/** As três pistas lado a lado, como aparecem na gaveta da notícia. */
const TresPistas: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => (
  <>
    {PISTAS.map((p) => (
      <RevealClue key={p.label} label={p.label} question={p.question} icon={p.icon} theme={theme}>
        {p.texto}
      </RevealClue>
    ))}
  </>
);

/** Modo controlado: quem usa guarda o estado e pode fechar todas de uma vez. */
const PistasControladas: React.FC = () => {
  const [abertas, setAbertas] = useState<Record<string, boolean>>({ Fonte: true });
  return (
    <>
      {PISTAS.map((p) => (
        <RevealClue
          key={p.label}
          label={p.label}
          question={p.question}
          icon={p.icon}
          open={Boolean(abertas[p.label])}
          onOpenChange={(aberta) => setAbertas((atual) => ({ ...atual, [p.label]: aberta }))}
        >
          {p.texto}
        </RevealClue>
      ))}
      <div>
        <Button variant="outline" size="sm" onClick={() => setAbertas({})}>
          Fechar todas as pistas
        </Button>
      </div>
    </>
  );
};

/**
 * Página de documentação rica do componente RevealClue.
 */
const RevealClueDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Jornal"
        title="RevealClue"
        description="A pista que se revela: um botão largo, com rótulo e pergunta de apoio, que abre e fecha um painel logo abaixo. Nasceu na missão Jornal da Escola do 4º ano — Fonte, Data e Autoria de uma notícia —, onde a criança vai buscar cada pista em vez de recebê-la pronta. Fechada, a pista não existe para o teclado nem para o leitor de tela."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Informação que a criança abre quando quer, quantas vezes quiser."
      />
      <Grade>
        <Cartao icone="🔎" titulo="Ir buscar, não receber">
          A notícia chega sem as pistas à vista. Tocar em “Fonte”, “Data” ou “Autoria” é o gesto de
          investigar — a pergunta de apoio diz o que procurar.
        </Cartao>
        <Cartao icone="🔁" titulo="Abre e fecha à vontade">
          Nada avisa se a notícia é boa ou ruim, nem conta quantas vezes a pista foi aberta. O
          componente só guarda o próprio estado.
        </Cartao>
        <Cartao icone="👆" titulo="Alvo de dedo">
          O botão tem no mínimo 64px de altura e ocupa a largura toda: é para o dedo de uma criança
          de 9 anos, num aparelho de 375px.
        </Cartao>
        <Cartao icone="📝" titulo="Quem registra é a missão">
          “A criança abriu a pista” é dado da missão, e sai pelo <code>onOpenChange</code>. O
          componente não chama API nenhuma.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Design próprio: a seção não tem quadro de pista."
      />
      <Grade>
        <Cartao icone="📐" titulo="Medidas">
          Raio de 12px e fio de 1px, os do <code>Card</code>. Altura mínima de 64px — acima dos 52px
          do <code>Button</code> <code>lg</code>, pelo alvo de toque. Ícone de 24px numa pastilha de
          40px; foco de 2px, o do <code>Button</code>.
        </Cartao>
        <Cartao icone="🔤" titulo="Tipografia">
          Rótulo, pergunta e conteúdo em <code>body-m</code>: 16px no celular (o token desce de 18px
          para 16px abaixo de 768px). Nada abaixo de 16px no aparelho de quem está aprendendo a ler
          notícia; a hierarquia vem do peso (600 no rótulo) e da cor.
        </Cartao>
        <Cartao icone="🎨" titulo="Cores">
          Aberta, o botão ganha <code>opacity-brandnavy-100</code> e fio <code>brandnavy-700</code>;
          o painel fica em <code>neutral-100</code>. No escuro, <code>opacity-brandnavy-200</code>{' '}
          com fio <code>brandnavy-600</code>, e o painel em <code>opacity-neutrallight-100</code>.
        </Cartao>
        <Cartao icone="⚠️" titulo="Glifos">
          A seta é <code>keyboard_arrow_down</code>, publicada no quadro de ícones (
          <code>6024:2923</code>). O pedido citava <code>expand_more</code>, que o quadro não publica —
          é o mesmo desenho na biblioteca-base, então ficou o do quadro. Os ícones das pistas desta
          página (<code>account_balance</code>, <code>calendar_month</code>,{' '}
          <code>history_edu</code>) também são do quadro; <code>draw</code> não é.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Pastilha do ícone, rótulo, pergunta de apoio, seta e o painel revelado."
      />
      <Palco rotulo="Aberta (defaultOpen)">
        <RevealClue label="Fonte" question="De onde veio?" icon="account_balance" defaultOpen>
          Site da Prefeitura de Vila Serena, na página de notícias da cidade.
        </RevealClue>
      </Palco>
      <Grade>
        <Cartao icone="①" titulo="Botão">
          <code>&lt;button aria-expanded aria-controls&gt;</code> com a pastilha do ícone (decorativa),
          o rótulo em peso 600, a pergunta em cor secundária e a seta que gira ao abrir.
        </Cartao>
        <Cartao icone="②" titulo="Painel">
          <code>role=&quot;region&quot;</code> nomeada pelo botão (<code>aria-labelledby</code>).
          Fechado, leva o atributo <code>hidden</code>: some do Tab e do leitor de tela.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="4. Matriz de Variantes e Estados"
        description="Fechada, aberta, sem ícone, sem pergunta, com conteúdo interativo e controlada."
      />
      <Palco rotulo="As três pistas da notícia (fechadas)">
        <TresPistas />
      </Palco>
      <Palco rotulo="Sem ícone e sem pergunta">
        <RevealClue label="Autoria">Texto de Marina Lopes, jornalista da Secretaria de Meio Ambiente.</RevealClue>
      </Palco>
      <Palco rotulo="Com um link dentro — fechada, o link não recebe Tab">
        <RevealClue label="Fonte" question="De onde veio?" icon="account_balance">
          <p>Site da Prefeitura de Vila Serena.</p>
          <p>
            <a href="#pagina-original">Ver a página original</a>
          </p>
        </RevealClue>
      </Palco>
      <Palco rotulo="Controlada (open + onOpenChange)">
        <PistasControladas />
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da pista." />
      <Praticas
        fazer={[
          'Escrever a pergunta de apoio no idioma da criança: “De onde veio?”, não “Origem”.',
          'Registrar a abertura pelo onOpenChange, do lado da missão.',
          'Deixar a pista reabrir quantas vezes a criança quiser.',
          'Usar ícones do quadro 6024:2923, pelo nome da ligadura.',
        ]}
        evitar={[
          'Pintar a pista de verde ou vermelho conforme a notícia seja boa ou ruim.',
          'Trocar o hidden por aria-hidden ou opacidade — o conteúdo fechado voltaria a receber Tab.',
          'Esconder a resposta certa da atividade no painel: correção é do servidor.',
          'Empilhar pistas dentro de pistas.',
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
        <RevealClue label="Fonte" question="De onde veio?" icon="account_balance" theme={tema} defaultOpen>
          Site da Prefeitura de Vila Serena, na página de notícias da cidade.
        </RevealClue>
        <RevealClue label="Data" question="Quando aconteceu?" icon="calendar_month" theme={tema}>
          Publicada em 12 de setembro de 2026, um sábado.
        </RevealClue>
      </Palco>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente RevealClue. Os demais atributos HTML vão para a raiz."
      />
      <TabelaDeProps
        linhas={[
          { nome: 'label', tipo: 'React.ReactNode', descricao: 'Nome da pista, sempre visível. Obrigatório.' },
          { nome: 'question', tipo: 'React.ReactNode', descricao: 'Pergunta de apoio sob o rótulo; entra no nome do botão.' },
          { nome: 'icon', tipo: 'string', descricao: 'Ligadura do Material Symbols Rounded (decorativa).' },
          { nome: 'children', tipo: 'React.ReactNode', descricao: 'O que se revela. Obrigatório.' },
          { nome: 'open', tipo: 'boolean', descricao: 'Estado aberto controlado.' },
          { nome: 'defaultOpen', tipo: 'boolean', padrao: 'false', descricao: 'Estado inicial no modo não controlado.' },
          { nome: 'onOpenChange', tipo: '(open: boolean) => void', descricao: 'Chamado a cada toque, com o novo estado.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
          { nome: 'className', tipo: 'string', descricao: 'Classe adicional na raiz.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof RevealClue> = {
  title: 'Plataforma Unooria/Componentes/RevealClue',
  component: RevealClue,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Nome da pista.' },
    question: { control: 'text', description: 'Pergunta de apoio.' },
    icon: { control: 'text', description: 'Ligadura do ícone (ex.: account_balance).' },
    children: { control: 'text', description: 'O que se revela.' },
    open: {
      control: 'boolean',
      description: 'Estado controlado. Mexer neste controle torna a pista controlada.',
    },
    defaultOpen: { control: 'boolean', description: 'Estado inicial (não controlado).' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe adicional na raiz.' },
    onOpenChange: { action: 'onOpenChange' },
  },
  args: {
    label: 'Fonte',
    question: 'De onde veio?',
    icon: 'account_balance',
    children: 'Site da Prefeitura de Vila Serena, na página de notícias da cidade.',
    defaultOpen: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof RevealClue>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <RevealClueDocumentationPage />,
};

/**
 * Playground com todas as propriedades do RevealClue expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do RevealClue',
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <RevealClue {...args} />
    </div>
  ),
};

/**
 * As três pistas de uma notícia da missão, como aparecem na gaveta.
 */
export const PistasDaNoticia: Story = {
  name: '🎨 Pistas da notícia',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 375 }}>
      <TresPistas />
    </div>
  ),
};

/**
 * Fechada não é alcançável; aberta é região nomeada pelo botão; fecha de novo.
 */
export const Estados: Story = {
  args: { onOpenChange: fn() },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 375 }}>
      <RevealClue label="Fonte" question="De onde veio?" icon="account_balance" onOpenChange={args.onOpenChange}>
        <p>Site da Prefeitura de Vila Serena.</p>
        <p>
          <a href="#pagina-original">Ver a página original</a>
        </p>
      </RevealClue>
      <RevealClue label="Data" question="Quando aconteceu?" icon="calendar_month">
        Publicada em 12 de setembro de 2026, um sábado.
      </RevealClue>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const fonte = tela.getByRole('button', { name: /Fonte/ });
    const data = tela.getByRole('button', { name: /Data/ });

    // Fechada: aria-expanded="false", nenhum painel na árvore, conteúdo invisível.
    await expect(fonte).toHaveAttribute('aria-expanded', 'false');
    await expect(fonte).toHaveAttribute('aria-controls');
    await expect(tela.queryByRole('region')).not.toBeInTheDocument();
    await expect(tela.queryByRole('link', { name: 'Ver a página original' })).not.toBeInTheDocument();
    await expect(tela.getByText('Site da Prefeitura de Vila Serena.')).not.toBeVisible();

    // O link de dentro da pista fechada NÃO recebe Tab: do botão Fonte vai direto ao Data.
    fonte.focus();
    await userEvent.tab();
    await expect(data).toHaveFocus();

    // Abre: região nomeada pelo botão, conteúdo visível, onOpenChange(true).
    await userEvent.click(fonte);
    await expect(fonte).toHaveAttribute('aria-expanded', 'true');
    const regiao = tela.getByRole('region', { name: /Fonte/ });
    await expect(regiao).toHaveAttribute('id', fonte.getAttribute('aria-controls'));
    await expect(regiao).toHaveAttribute('aria-labelledby', fonte.id);
    await expect(within(regiao).getByText('Site da Prefeitura de Vila Serena.')).toBeVisible();
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(true);

    // Aberta, o link entra na ordem do Tab.
    fonte.focus();
    await userEvent.tab();
    await expect(tela.getByRole('link', { name: 'Ver a página original' })).toHaveFocus();

    // Clicar de novo fecha: aria-expanded="false" e onOpenChange(false).
    await userEvent.click(fonte);
    await expect(fonte).toHaveAttribute('aria-expanded', 'false');
    await expect(tela.queryByRole('region')).not.toBeInTheDocument();
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false);
    await expect(args.onOpenChange).toHaveBeenCalledTimes(2);
  },
};
