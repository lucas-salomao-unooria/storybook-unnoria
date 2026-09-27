import React, { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { BottomSheet } from '../../../src/unooria/components/BottomSheet';
import type { BottomSheetProps } from '../../../src/unooria/components/BottomSheet';
import { RevealClue } from '../../../src/unooria/components/RevealClue';
import { Button } from '../../../src/unooria/components/Button';
import '../../../src/unooria/tokens/icons.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

type Tema = 'light' | 'dark';

/* ---------------------------------------------------------------------------
   Conteúdo de demonstração — a mesa da redação da missão "Jornal da Escola"
   (4º ano). As pistas não dizem se a notícia é boa ou ruim: só mostram.
   ------------------------------------------------------------------------- */

interface Noticia {
  id: string;
  chapeu: string;
  titulo: string;
  texto: string;
  fonte: string;
  data: string;
  autoria: string;
}

const NOTICIAS: Noticia[] = [
  {
    id: 'horta',
    chapeu: 'Bairro',
    titulo: 'Horta nova no parque do bairro',
    texto:
      'Alunos do 4º ano da Escola Municipal Vila Serena plantaram alface, cenoura e girassol num canteiro da praça. A horta vai ser cuidada pelas famílias do bairro, em turnos, aos sábados de manhã. Quem quiser ajudar pode levar mudas e um regador.',
    fonte: 'Site da Prefeitura de Vila Serena, na página de notícias da cidade.',
    data: 'Publicada em 12 de setembro de 2026, um sábado.',
    autoria: 'Texto de Marina Lopes, jornalista da Secretaria de Meio Ambiente.',
  },
  {
    id: 'biblioteca',
    chapeu: 'Escola',
    titulo: 'Biblioteca ganha 200 livros novos',
    texto:
      'A biblioteca da escola recebeu 200 livros doados por uma editora da região. Tem gibi, livro de receitas e histórias de aventura. Os livros já podem ser emprestados na hora do recreio.',
    fonte: 'Jornal Voz de Vila Serena, edição impressa.',
    data: 'Publicada em 3 de setembro de 2026.',
    autoria: 'Reportagem de Paulo Mendes.',
  },
  {
    id: 'caramelo',
    chapeu: 'Curiosidade',
    titulo: 'Cachorro caramelo vira mascote da feira',
    texto:
      'Um cachorro caramelo aparece toda quarta-feira na feira livre e ganha carinho dos feirantes. Dizem que ele já sabe o horário da barraca de pastel.',
    fonte: 'Mensagem encaminhada num grupo de conversa.',
    data: 'A mensagem não diz quando foi escrita.',
    autoria: 'Não tem assinatura.',
  },
];

const DESCRICAO_DA_GAVETA = 'Toque nas pistas para investigar a notícia.';

/** O corpo da gaveta: a matéria original e as três pistas. */
const ConteudoDaNoticia: React.FC<{ noticia: Noticia; theme?: Tema }> = ({ noticia, theme = 'light' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--unooria-spacing-s)' }}>
    <p style={{ margin: 0 }}>{noticia.texto}</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--unooria-spacing-xs)' }}>
      <RevealClue label="Fonte" question="De onde veio?" icon="account_balance" theme={theme}>
        {noticia.fonte}
      </RevealClue>
      <RevealClue label="Data" question="Quando aconteceu?" icon="calendar_month" theme={theme}>
        {noticia.data}
      </RevealClue>
      <RevealClue label="Autoria" question="Quem assina?" icon="history_edu" theme={theme}>
        {noticia.autoria}
      </RevealClue>
    </div>
  </div>
);

/** Texto comprido o bastante para o corpo rolar por dentro da folha. */
const TextoLongo: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--unooria-spacing-s)' }}>
    {Array.from({ length: 8 }, (_, i) => (
      <p key={i} style={{ margin: 0 }}>
        Parágrafo {i + 1}. {NOTICIAS[0].texto}
      </p>
    ))}
  </div>
);

/**
 * A mesa da redação num aparelho de 375×812. A gaveta é montada DENTRO da
 * moldura (`portalContainer`), e a moldura tem `contain: layout paint`: com
 * isso o `position: fixed` do véu passa a medir a moldura, e não a janela.
 * Numa experiência de verdade, que roda num iframe do tamanho do aparelho,
 * nada disso é preciso — o portal vai para o `document.body`.
 */
const MesaDaRedacao: React.FC<{ theme?: Tema }> = ({ theme = 'light' }) => {
  const [moldura, setMoldura] = useState<HTMLDivElement | null>(null);
  const [abertaId, setAbertaId] = useState<string | null>(null);
  const [noJornal, setNoJornal] = useState<string[]>([]);
  const escuro = theme === 'dark';
  const noticia = NOTICIAS.find((n) => n.id === abertaId);
  const fechar = useCallback(() => setAbertaId(null), []);

  return (
    <div
      ref={setMoldura}
      style={{
        position: 'relative',
        width: 375,
        maxWidth: '100%',
        height: 812,
        margin: '0 auto',
        overflow: 'hidden',
        contain: 'layout paint',
        border: `1px solid ${escuro ? 'var(--unooria-color-neutraldark-200)' : 'var(--unooria-color-neutral-200)'}`,
        borderRadius: 32,
        background: escuro ? 'var(--unooria-color-neutraldark-100)' : 'var(--unooria-color-neutral-100)',
        color: escuro ? 'var(--unooria-color-neutraldark-950)' : 'var(--unooria-color-neutral-950)',
        fontFamily: 'var(--unooria-font-sans)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '32px 16px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700 }}>Mesa da redação</p>
        {NOTICIAS.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setAbertaId(n.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minHeight: 88,
              padding: 16,
              border: `1px solid ${escuro ? 'var(--unooria-color-neutraldark-200)' : 'var(--unooria-color-neutral-150)'}`,
              borderRadius: 12,
              background: escuro ? 'var(--unooria-color-neutraldark-50)' : 'var(--unooria-color-neutral-50)',
              color: 'inherit',
              font: 'inherit',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: escuro ? 'var(--unooria-color-neutraldark-900)' : 'var(--unooria-color-neutral-700)',
              }}
            >
              {n.chapeu}
              {noJornal.includes(n.id) ? ' · no jornal' : ''}
            </span>
            <span style={{ fontSize: 16, fontWeight: 600 }}>{n.titulo}</span>
          </button>
        ))}
      </div>

      <BottomSheet
        isOpen={Boolean(noticia)}
        onClose={fechar}
        title={noticia?.titulo}
        description={DESCRICAO_DA_GAVETA}
        portalContainer={moldura}
        theme={theme}
        footer={
          <Button
            variant="primary"
            theme={theme}
            fullWidth
            onClick={() => {
              if (noticia) setNoJornal((atual) => (atual.includes(noticia.id) ? atual : [...atual, noticia.id]));
              fechar();
            }}
          >
            Adicionar ao jornal
          </Button>
        }
      >
        {noticia && <ConteudoDaNoticia noticia={noticia} theme={theme} />}
      </BottomSheet>
    </div>
  );
};

/** Um botão que abre uma gaveta com as props dadas. */
const Demonstracao: React.FC<{
  rotulo: string;
  theme?: Tema;
  props?: Omit<BottomSheetProps, 'isOpen' | 'onClose' | 'children'>;
  children: React.ReactNode;
}> = ({ rotulo, theme = 'light', props, children }) => {
  const [aberta, setAberta] = useState(false);
  return (
    <>
      <div>
        <Button variant="outline" size="sm" theme={theme} onClick={() => setAberta(true)}>
          {rotulo}
        </Button>
      </div>
      <BottomSheet isOpen={aberta} onClose={() => setAberta(false)} theme={theme} {...props}>
        {children}
      </BottomSheet>
    </>
  );
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
        flexWrap: 'wrap',
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
 * Página de documentação rica do componente BottomSheet.
 */
const BottomSheetDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<Tema>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Sobreposição"
        title="BottomSheet"
        description="A gaveta: uma folha que sobe de baixo, sobre um véu, com alça, cabeçalho (título e X), corpo que rola por dentro e rodapé fixo para a ação principal. É um diálogo modal completo — Esc, trava de rolagem, prisão do Tab e o foco que volta ao cartão que a abriu. Fecha pelo X, pelo Esc ou pelo véu, nunca só por gesto."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Detalhe de um item sem sair da tela em que ele está."
      />
      <Grade>
        <Cartao icone="🗞️" titulo="A gaveta da mesa">
          Na missão Jornal da Escola, tocar num cartão de notícia abre a gaveta com a matéria
          original, as pistas e o botão “Adicionar ao jornal”. A mesa continua ali, atrás do véu.
        </Cartao>
        <Cartao icone="🗣️" titulo="Diálogo de verdade">
          <code>role=&quot;dialog&quot;</code> com <code>aria-modal</code>, nomeado pelo título e
          descrito pela linha de apoio — o leitor de tela anuncia “Horta nova no parque do bairro,
          diálogo”.
        </Cartao>
        <Cartao icone="✋" titulo="Fecha sem gesto">
          Nada de arrastar para baixo: no Chromebook, com leitor de tela, o gesto não existe. Fechar
          é pelo X, pelo Esc ou pelo véu.
        </Cartao>
        <Cartao icone="↩️" titulo="O foco volta ao cartão">
          Ao fechar, o foco volta a quem abriu (ou ao <code>finalFocusRef</code>). Quem navega por
          teclado não perde o lugar na mesa.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Design próprio: a seção não tem quadro de folha inferior."
      />
      <Grade>
        <Cartao icone="📐" titulo="Medidas">
          Raio de 16px nos cantos de cima e véu na cor do <code>Modal</code> (
          <code>opacity-neutraldark-400</code>). Título em <code>title-l</code>, como o do{' '}
          <code>Modal</code>; corpo em <code>body-m</code> (16px no celular). Largura 100% até 560px,
          centralizada; altura máxima de 85% da janela.
        </Cartao>
        <Cartao icone="👆" titulo="Alvo de toque">
          O X tem 48px — o do <code>Modal</code> tem 32px, pensado para ponteiro. O rodapé segue o
          divisor do <code>Modal.Footer</code> (fio de 1px) e recebe o <code>Button</code> do pacote.
        </Cartao>
        <Cartao icone="🎨" titulo="Diferenças do Modal, e por quê">
          Sem o desfoque do véu: <code>backdrop-filter</code> custa caro no Chromebook de entrada, e a
          gaveta abre e fecha o tempo todo na mesa. No escuro, o véu é{' '}
          <code>opacity-brandpurple-700</code>: o <code>Modal</code> usa preto a 65%, que a seção não
          publica como token.
        </Cartao>
        <Cartao icone="⚠️" titulo="Glifo">
          O X é <code>close</code>, publicado no quadro de ícones (<code>6024:2923</code>), pelo nome da
          ligadura. A alça é um traço de 40×4px, decorativo (<code>aria-hidden</code>).
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Véu, alça, cabeçalho (título, apoio e X), corpo rolável e rodapé fixo."
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--unooria-spacing-l)', marginBottom: 32 }}>
        <MesaDaRedacao />
        <div style={{ flex: '1 1 260px', minWidth: 0 }}>
          <Grade>
            <Cartao icone="①" titulo="Véu">
              Cobre a tela (ou a moldura do portal). Clicar nele fecha — só se o gesto começou e
              terminou nele, para não fechar ao soltar uma seleção de texto.
            </Cartao>
            <Cartao icone="②" titulo="Alça">
              Sinal visual de gaveta. Não arrasta nada e não é lida pelo leitor de tela.
            </Cartao>
            <Cartao icone="③" titulo="Cabeçalho">
              Título (<code>h2</code>, nomeia o diálogo), linha de apoio (descreve) e o X, com nome
              acessível “Fechar”.
            </Cartao>
            <Cartao icone="④" titulo="Corpo">
              Rola por dentro quando passa da altura, com barra fina. O cabeçalho e o rodapé ficam.
            </Cartao>
            <Cartao icone="⑤" titulo="Rodapé">
              Área fixa para a ação principal, com fio superior e a área segura do aparelho.
            </Cartao>
          </Grade>
        </div>
      </div>

      <UnooriaDocSectionHeader
        title="4. Matriz de Variantes e Estados"
        description="Cada botão abre uma gaveta com uma combinação de props."
      />
      <Palco rotulo="Combinações">
        <Demonstracao
          rotulo="Título, apoio e rodapé"
          props={{
            title: NOTICIAS[0].titulo,
            description: DESCRICAO_DA_GAVETA,
            footer: (
              <Button variant="primary" fullWidth>
                Adicionar ao jornal
              </Button>
            ),
          }}
        >
          <ConteudoDaNoticia noticia={NOTICIAS[0]} />
        </Demonstracao>
        <Demonstracao rotulo="Sem rodapé" props={{ title: NOTICIAS[1].titulo }}>
          <ConteudoDaNoticia noticia={NOTICIAS[1]} />
        </Demonstracao>
        <Demonstracao
          rotulo="Sem o X (Esc e véu fecham)"
          props={{ title: NOTICIAS[2].titulo, showCloseButton: false }}
        >
          <ConteudoDaNoticia noticia={NOTICIAS[2]} />
        </Demonstracao>
        <Demonstracao rotulo="Conteúdo longo (rola por dentro)" props={{ title: 'Texto comprido', maxHeight: '60%' }}>
          <TextoLongo />
        </Demonstracao>
        <Demonstracao
          rotulo="Véu que não fecha"
          props={{ title: NOTICIAS[0].titulo, closeOnOverlayClick: false }}
        >
          <ConteudoDaNoticia noticia={NOTICIAS[0]} />
        </Demonstracao>
        <Demonstracao rotulo="Sem título (aria-label)" props={{ 'aria-label': 'Detalhes da notícia' }}>
          <ConteudoDaNoticia noticia={NOTICIAS[1]} />
        </Demonstracao>
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da gaveta." />
      <Praticas
        fazer={[
          'Dar um título que nomeie o conteúdo — ele é o nome do diálogo.',
          'Pôr a ação principal no footer, com Button fullWidth no celular.',
          'Deixar o foco voltar sozinho ao cartão que abriu (ou apontar finalFocusRef).',
          'Sem título visível, passar aria-label.',
        ]}
        evitar={[
          'Depender de gesto de arrastar para fechar.',
          'Abrir uma gaveta de dentro da outra.',
          'Esconder o X e desligar Esc e véu ao mesmo tempo: a gaveta vira armadilha.',
          'Usar a gaveta para aviso curto: aí é Snackbar ou FeedbackAlert.',
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
        <Demonstracao
          rotulo={`Abrir a gaveta no tema ${tema === 'light' ? 'claro' : 'escuro'}`}
          theme={tema}
          props={{
            title: NOTICIAS[0].titulo,
            description: DESCRICAO_DA_GAVETA,
            footer: (
              <Button variant="primary" theme={tema} fullWidth>
                Adicionar ao jornal
              </Button>
            ),
          }}
        >
          <ConteudoDaNoticia noticia={NOTICIAS[0]} theme={tema} />
        </Demonstracao>
      </Palco>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente BottomSheet. Os demais atributos HTML vão para a folha (o elemento com role dialog)."
      />
      <TabelaDeProps
        linhas={[
          { nome: 'isOpen', tipo: 'boolean', descricao: 'Aberta ou fechada. Fechada, nada é renderizado. Obrigatório.' },
          { nome: 'onClose', tipo: '() => void', descricao: 'Pedido de fechar: X, Esc ou véu. Obrigatório.' },
          { nome: 'title', tipo: 'React.ReactNode', descricao: 'Título visível; nomeia o diálogo (aria-labelledby).' },
          { nome: 'description', tipo: 'React.ReactNode', descricao: 'Linha de apoio; liga aria-describedby.' },
          { nome: 'children', tipo: 'React.ReactNode', descricao: 'O corpo, que rola por dentro. Obrigatório.' },
          { nome: 'footer', tipo: 'React.ReactNode', descricao: 'Área fixa embaixo, para a ação principal.' },
          { nome: 'maxHeight', tipo: 'string', padrao: "'85%'", descricao: 'Altura máxima, relativa à janela ou ao contêiner.' },
          { nome: 'closeLabel', tipo: 'string', padrao: "'Fechar'", descricao: 'Nome acessível do X.' },
          { nome: 'showCloseButton', tipo: 'boolean', padrao: 'true', descricao: 'Exibe o X.' },
          { nome: 'closeOnOverlayClick', tipo: 'boolean', padrao: 'true', descricao: 'Fecha ao clicar no véu.' },
          { nome: 'closeOnEsc', tipo: 'boolean', padrao: 'true', descricao: 'Fecha com Esc.' },
          { nome: 'initialFocusRef', tipo: 'RefObject<HTMLElement | null>', descricao: 'Foco ao abrir (padrão: primeiro focável).' },
          { nome: 'finalFocusRef', tipo: 'RefObject<HTMLElement | null>', descricao: 'Foco ao fechar (padrão: quem abriu).' },
          { nome: 'portalContainer', tipo: 'HTMLElement | null', padrao: 'document.body', descricao: 'Onde o portal é montado.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
          { nome: 'className', tipo: 'string', descricao: 'Classe adicional na folha.' },
          { nome: 'aria-label', tipo: 'string', descricao: 'Nome direto; com ele, o diálogo não recebe aria-labelledby.' },
          { nome: 'aria-labelledby', tipo: 'string', descricao: 'Id de quem nomeia o diálogo; vence título e aria-label.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

/**
 * O playground guarda o próprio estado; mudar `isOpen` no controle o recria.
 * `children` e `footer` chegam como nome de exemplo ('noticia', 'longo',
 * 'botao', 'nenhum') e viram conteúdo AQUI, e não por `mapping`: o conteúdo
 * precisa acompanhar o `theme` escolhido no controle.
 */
const PlaygroundDaGaveta: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  footer,
  theme = 'light',
  ...props
}) => {
  const [aberta, setAberta] = useState(isOpen);
  const corpo =
    children === 'longo' ? (
      <TextoLongo />
    ) : children === 'noticia' ? (
      <ConteudoDaNoticia noticia={NOTICIAS[0]} theme={theme} />
    ) : (
      children
    );
  const rodape =
    footer === 'botao' ? (
      <Button variant="primary" theme={theme} fullWidth>
        Adicionar ao jornal
      </Button>
    ) : footer === 'nenhum' ? undefined : (
      footer
    );
  return (
    <>
      <Button variant="primary" theme={theme} onClick={() => setAberta(true)}>
        Abrir a gaveta
      </Button>
      <BottomSheet
        {...props}
        theme={theme}
        footer={rodape}
        isOpen={aberta}
        onClose={() => {
          setAberta(false);
          onClose();
        }}
      >
        {corpo}
      </BottomSheet>
    </>
  );
};

const meta: Meta<typeof BottomSheet> = {
  title: 'Plataforma Unooria/Componentes/BottomSheet',
  component: BottomSheet,
  parameters: { layout: 'padded' },
  argTypes: {
    isOpen: { control: 'boolean', description: 'Aberta ou fechada.' },
    title: { control: 'text', description: 'Título visível; nomeia o diálogo.' },
    description: { control: 'text', description: 'Linha de apoio; descreve o diálogo.' },
    children: {
      control: 'select',
      options: ['noticia', 'longo'],
      description: 'O corpo da gaveta: a notícia com as pistas, ou um texto longo que rola.',
    },
    footer: {
      control: 'select',
      options: ['botao', 'nenhum'],
      description: 'Área fixa embaixo: o botão “Adicionar ao jornal”, ou nada.',
    },
    maxHeight: { control: 'text', description: 'Altura máxima da folha.' },
    closeLabel: { control: 'text', description: 'Nome acessível do X.' },
    showCloseButton: { control: 'boolean', description: 'Exibe o X.' },
    closeOnOverlayClick: { control: 'boolean', description: 'Fecha ao clicar no véu.' },
    closeOnEsc: { control: 'boolean', description: 'Fecha com Esc.' },
    initialFocusRef: { control: false, description: 'Ref do elemento focado ao abrir.' },
    finalFocusRef: { control: false, description: 'Ref do elemento focado ao fechar.' },
    portalContainer: { control: false, description: 'Elemento do portal (padrão: document.body).' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe adicional na folha.' },
    'aria-label': { control: 'text', description: 'Nome acessível direto.' },
    'aria-labelledby': { control: 'text', description: 'Id de quem nomeia o diálogo.' },
    onClose: { action: 'onClose' },
  },
  args: {
    isOpen: false,
    onClose: fn(),
    title: NOTICIAS[0].titulo,
    description: DESCRICAO_DA_GAVETA,
    children: 'noticia',
    footer: 'botao',
    maxHeight: '85%',
    closeLabel: 'Fechar',
    showCloseButton: true,
    closeOnOverlayClick: true,
    closeOnEsc: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BottomSheetDocumentationPage />,
};

/**
 * Playground com todas as propriedades do BottomSheet expostas. A gaveta
 * começa fechada (não prende o foco da página); o botão a abre.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do BottomSheet',
  render: (args) => <PlaygroundDaGaveta key={String(args.isOpen)} {...args} />,
};

/**
 * A mesa da redação num aparelho de 375×812: tocar num cartão abre a gaveta
 * com a matéria original, as três pistas e o "Adicionar ao jornal".
 */
export const NaMesaDaRedacao: Story = {
  name: '🎨 Na mesa da redação (375×812)',
  render: () => <MesaDaRedacao />,
};

/**
 * Abre pelo botão; é um diálogo nomeado pelo título; o X, o Esc e o véu
 * fecham; e o foco volta ao botão que abriu.
 */
export const Estados: Story = {
  args: { onClose: fn() },
  render: function EstadosRender(args) {
    const [aberta, setAberta] = useState(false);
    const fechar = () => {
      setAberta(false);
      args.onClose();
    };
    return (
      <div>
        <Button variant="primary" onClick={() => setAberta(true)}>
          Abrir a notícia
        </Button>
        <BottomSheet
          isOpen={aberta}
          onClose={fechar}
          title={NOTICIAS[0].titulo}
          description={DESCRICAO_DA_GAVETA}
          footer={
            <Button variant="primary" fullWidth onClick={() => setAberta(false)}>
              Adicionar ao jornal
            </Button>
          }
        >
          <ConteudoDaNoticia noticia={NOTICIAS[0]} />
        </BottomSheet>
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    // O diálogo vive num portal em `document.body`, fora do `canvasElement`.
    const corpo = within(canvasElement.ownerDocument.body);
    const abrir = tela.getByRole('button', { name: 'Abrir a notícia' });

    await expect(corpo.queryByRole('dialog')).not.toBeInTheDocument();

    // Abre: diálogo modal nomeado pelo título e descrito pela linha de apoio.
    await userEvent.click(abrir);
    const dialogo = await corpo.findByRole('dialog', { name: 'Horta nova no parque do bairro' });
    await expect(dialogo).toHaveAttribute('aria-modal', 'true');
    await expect(dialogo).toHaveAccessibleDescription(DESCRICAO_DA_GAVETA);
    await expect(canvasElement.ownerDocument.body.style.overflow).toBe('hidden');

    // Foco inicial no primeiro focável: o X.
    const gaveta = within(dialogo);
    const fechar = gaveta.getByRole('button', { name: 'Fechar' });
    await waitFor(() => expect(fechar).toHaveFocus());

    // As pistas chegam fechadas.
    await expect(gaveta.getByRole('button', { name: /Fonte/ })).toHaveAttribute('aria-expanded', 'false');

    // Prisão do Tab: do último volta ao X; Shift+Tab do X vai ao último.
    const adicionar = gaveta.getByRole('button', { name: 'Adicionar ao jornal' });
    adicionar.focus();
    await userEvent.tab();
    await expect(fechar).toHaveFocus();
    await userEvent.tab({ shift: true });
    await expect(adicionar).toHaveFocus();

    // O X fecha e o foco volta ao botão que abriu.
    await userEvent.click(fechar);
    await waitFor(() => expect(corpo.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(abrir).toHaveFocus());
    await expect(args.onClose).toHaveBeenCalledTimes(1);
    await expect(canvasElement.ownerDocument.body.style.overflow).not.toBe('hidden');

    // O Esc fecha e o foco volta.
    await userEvent.click(abrir);
    await corpo.findByRole('dialog', { name: 'Horta nova no parque do bairro' });
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(corpo.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(abrir).toHaveFocus());
    await expect(args.onClose).toHaveBeenCalledTimes(2);

    // O clique no véu fecha e o foco volta.
    await userEvent.click(abrir);
    const deNovo = await corpo.findByRole('dialog', { name: 'Horta nova no parque do bairro' });
    const veu = deNovo.parentElement as HTMLElement;
    await userEvent.click(veu);
    await waitFor(() => expect(corpo.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(abrir).toHaveFocus());
    await expect(args.onClose).toHaveBeenCalledTimes(3);
  },
};
