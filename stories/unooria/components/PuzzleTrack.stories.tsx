import React, { useEffect, useId, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { PuzzleTrack } from '../../../src/unooria/components/PuzzleTrack';
import type { PuzzleTrackProps } from '../../../src/unooria/components/PuzzleTrack';
import { PuzzleBlock } from '../../../src/unooria/components/PuzzleBlock';
import { Button } from '../../../src/unooria/components/Button/Button';
import { Icon } from '../../../src/unooria/components/Icon/Icon';
import '../../../src/unooria/tokens/icons.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/* ---------------------------------------------------------------------------
   Conteúdo de demonstração — os 6 blocos da "Chave do Editor" (Jornal da
   Escola, 4º ano): 3 peças certas e 3 iscas, com o MESMO formato, para o visual
   não entregar a resposta. O texto de verdade da missão mora na experiência.
   ------------------------------------------------------------------------- */

interface BlocoDaMissao {
  id: string;
  label: string;
  description: string;
  icon: string;
}

const BLOCOS: BlocoDaMissao[] = [
  { id: 'fonte', label: 'Fonte', description: 'De onde veio? É canal oficial ou confiável?', icon: 'account_balance' },
  { id: 'foto', label: 'Foto bonita', description: 'Tem uma imagem caprichada? Parece profissional?', icon: 'photo_camera' },
  { id: 'data', label: 'Data', description: 'Quando aconteceu? É de hoje ou do passado?', icon: 'calendar_month' },
  { id: 'urgente', label: 'Tem urgente', description: 'O título manda repassar agora? Grita URGENTE?', icon: 'campaign' },
  { id: 'autoria', label: 'Autoria', description: 'Quem assina? Alguém se responsabiliza pelo texto?', icon: 'history_edu' },
  { id: 'repassou', label: 'Muita gente repassou', description: 'Chegou em vários grupos? Todo mundo compartilhou?', icon: 'share' },
];

const bloco = (id: string): BlocoDaMissao => BLOCOS.find((b) => b.id === id) as BlocoDaMissao;

/** As props de um bloco, sem o `id` da demonstração — que viraria um `id` de DOM repetido. */
const propsDoBloco = ({ label, description, icon }: BlocoDaMissao) => ({ label, description, icon });

/**
 * SÓ PARA A DEMONSTRAÇÃO. Na missão, quem diz se a chave abre é a api (regra 3
 * da plataforma): o cliente manda os três blocos e recebe de volta quais eram
 * iscas. Nem o `PuzzleTrack` nem o `PuzzleBlock` conhecem esta lista.
 */
const GABARITO_DE_DEMONSTRACAO = new Set(['fonte', 'data', 'autoria']);

const TOTAL_DE_VAGAS = 3;

/* ---------------------------------------------------------------------------
   A interação completa, montada SÓ na estória, com estado local: bandeja com os
   6 blocos, calha de 3, toque sequencial, envio e a validação de demonstração.
   ------------------------------------------------------------------------- */

const ChaveDoEditorDemo: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => {
  const bandejaId = useId();
  const [vagas, setVagas] = useState<(string | null)[]>(() => Array(TOTAL_DE_VAGAS).fill(null));
  const [voltaram, setVoltaram] = useState<string[]>([]);
  const [formada, setFormada] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  // Foco: o bloco tocado sai de onde estava, e o foco não pode ficar perdido no
  // `body`. Guarda-se o alvo e ele é focado depois da renderização.
  const blocosRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const enviarRef = useRef<HTMLButtonElement | null>(null);
  const calhaRef = useRef<HTMLDivElement | null>(null);
  const focarDepois = useRef<string | null>(null);

  useEffect(() => {
    const alvo = focarDepois.current;
    if (!alvo) return;
    focarDepois.current = null;
    if (alvo === 'enviar') enviarRef.current?.focus();
    else if (alvo === 'calha') calhaRef.current?.focus();
    else blocosRef.current[alvo]?.focus();
  });

  const preenchidas = vagas.filter(Boolean).length;
  const cheia = preenchidas === TOTAL_DE_VAGAS;
  const naCalha = (id: string) => vagas.includes(id);
  const contagem = `${preenchidas} de ${TOTAL_DE_VAGAS} vagas preenchidas.`;

  /** Tocar na bandeja: vai para a PRIMEIRA vaga livre. */
  const encaixar = (id: string) => {
    const livre = vagas.indexOf(null);
    if (livre === -1 || formada) return;
    const proximas = vagas.map((v, i) => (i === livre ? id : v));
    setVagas(proximas);
    setVoltaram([]);
    setMensagem(`Bloco ${bloco(id).label} encaixado.`);

    if (!proximas.includes(null)) {
      focarDepois.current = 'enviar';
    } else {
      // O próximo bloco da bandeja, na ordem, para a criança seguir tocando.
      const ordem = BLOCOS.map((b) => b.id);
      const depois = [...ordem.slice(ordem.indexOf(id) + 1), ...ordem.slice(0, ordem.indexOf(id))];
      focarDepois.current = depois.find((b) => !proximas.includes(b)) ?? null;
    }
  };

  /** Tocar na vaga: volta para a bandeja, no lugar de onde saiu. */
  const devolver = (id: string) => {
    if (formada) return;
    setVagas(vagas.map((v) => (v === id ? null : v)));
    setVoltaram([]);
    setMensagem(`Bloco ${bloco(id).label} devolvido à bandeja.`);
    focarDepois.current = id;
  };

  /** Enviar: aqui a estória imita a api. As iscas voltam; as certas ficam. */
  const enviar = () => {
    const iscas = vagas.filter((v): v is string => v !== null && !GABARITO_DE_DEMONSTRACAO.has(v));
    if (iscas.length === 0) {
      setFormada(true);
      setMensagem(null);
      focarDepois.current = 'calha';
      return;
    }
    setVagas(vagas.map((v) => (v !== null && iscas.includes(v) ? null : v)));
    setVoltaram(iscas);
    setMensagem(
      iscas.length === 1
        ? 'Esse bloco não abre a chave. Tente outro.'
        : 'Esses blocos não abrem a chave. Tente outros.'
    );
    focarDepois.current = iscas[0];
  };

  const recomecar = () => {
    setVagas(Array(TOTAL_DE_VAGAS).fill(null));
    setVoltaram([]);
    setFormada(false);
    setMensagem(null);
    focarDepois.current = BLOCOS[0].id;
  };

  const registrar = (id: string) => (el: HTMLButtonElement | null) => {
    blocosRef.current[id] = el;
  };

  const escuro = theme === 'dark';
  const corDoTexto = escuro ? 'var(--unooria-color-neutraldark-950)' : 'var(--unooria-color-neutral-950)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--unooria-spacing-m)' }}>
      <PuzzleTrack
        ref={calhaRef}
        tabIndex={-1}
        theme={theme}
        label="Chave do Editor"
        complete={formada}
        status={formada ? undefined : mensagem ? `${mensagem} ${contagem}` : contagem}
        slots={vagas.map((id) =>
          id === null ? null : (
            <PuzzleBlock
              key={id}
              ref={registrar(id)}
              {...propsDoBloco(bloco(id))}
              theme={theme}
              state={formada ? 'locked' : 'placed'}
              onClick={() => devolver(id)}
            />
          )
        )}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--unooria-spacing-xs)' }}>
        <Button
          ref={enviarRef}
          variant="primary"
          theme={theme}
          isDisabled={!cheia || formada}
          onClick={enviar}
          leftIcon={<Icon name="key" size="xs" color="currentColor" />}
        >
          Encaixar a chave
        </Button>
        {formada && (
          <Button variant="outline" theme={theme} onClick={recomecar}>
            Recomeçar
          </Button>
        )}
      </div>

      <div role="group" aria-labelledby={bandejaId}>
        <p id={bandejaId} style={{ margin: '0 0 12px', fontWeight: 600, color: corDoTexto }}>
          Bandeja de blocos
        </p>
        {/* Posições fixas: o bloco que sai deixa o lugar vazio, e a bandeja não
            reorganiza a cada toque — quem tem 9 anos procura pelo lugar. */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 15rem), 1fr))',
            gap: 'var(--unooria-spacing-s)',
          }}
        >
          {BLOCOS.map((b) =>
            naCalha(b.id) ? (
              <div
                key={b.id}
                aria-hidden="true"
                style={{
                  minHeight: 64,
                  borderRadius: 12,
                  border: `1px dashed ${escuro ? 'var(--unooria-color-neutraldark-200)' : 'var(--unooria-color-neutral-200)'}`,
                }}
              />
            ) : (
              <div key={b.id} style={{ paddingRight: 8 }}>
                <PuzzleBlock
                  ref={registrar(b.id)}
                  label={b.label}
                  description={b.description}
                  icon={b.icon}
                  theme={theme}
                  state={voltaram.includes(b.id) ? 'returned' : 'idle'}
                  disabled={formada}
                  onClick={() => encaixar(b.id)}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
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

/** As três vagas com os blocos informados; `null` é vaga vazia. */
const vagasCom = (ids: (string | null)[], estado: 'placed' | 'locked', theme: 'light' | 'dark' = 'light') =>
  ids.map((id) => (id === null ? null : <PuzzleBlock key={id} {...propsDoBloco(bloco(id))} state={estado} theme={theme} />));

/**
 * Página de documentação rica do componente PuzzleTrack.
 */
const PuzzleTrackDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<'light' | 'dark'>('light');
  const escuro = tema === 'dark';

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Jornal"
        title="PuzzleTrack"
        description="A calha de vagas da Chave do Editor: uma fileira de encaixes em forma de peça onde os PuzzleBlock entram por toque. Cada vaga vazia é tracejada e numerada; com a chave formada, as vagas se juntam num bloco só, com fundo de sucesso e o glifo key. A calha não tem gabarito: vagas, sucesso e status vêm de quem usa."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Montar uma resposta por partes, em qualquer ordem, e mandar para o servidor conferir."
      />
      <Grade>
        <Cartao icone="🧩" titulo="Vagas em forma de peça">
          A vaga vazia tem a silhueta exata do <code>PuzzleBlock</code> — mesmo raio, mesma altura,
          mesmo encaixe —, tracejada e com o número da posição.
        </Cartao>
        <Cartao icone="🔑" titulo="Chave formada">
          Com <code>complete</code>, as vagas se juntam (a saliência de cada peça entra no recorte da
          seguinte), o fundo vira sucesso e aparece <code>completeLabel</code> com o glifo{' '}
          <code>key</code>.
        </Cartao>
        <Cartao icone="🔊" titulo="Status anunciado">
          A linha de <code>status</code> é <code>aria-live=&quot;polite&quot;</code> e existe sempre,
          mesmo vazia — é o que faz a PRIMEIRA mensagem ser lida.
        </Cartao>
        <Cartao icone="🙈" titulo="Sem gabarito">
          A calha não decide nada: <code>slots</code>, <code>complete</code> e <code>status</code> vêm
          do consumidor, que os recebe da api.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Design próprio: a seção não tem quadro de quebra-cabeça."
      />
      <Grade>
        <Cartao icone="📐" titulo="Medidas (do próprio pacote)">
          Contêiner do <code>Card</code>: fio de 1px, raio de 16px, recuo de 16px (24px à direita, para a
          saliência da última peça). Vaga com a silhueta do <code>PuzzleBlock</code>: raio de 12px (o{' '}
          <code>Button</code> <code>lg</code>), 64px de altura mínima, encaixe de 9px, tracejado de 2px.
        </Cartao>
        <Cartao icone="↔️" titulo="Lado a lado ou empilhadas">
          As vagas ficam TODAS lado a lado ou TODAS empilhadas — nunca 2 em cima e 1 embaixo. O limite é
          de 14rem por vaga (672px para 3); em 375px elas empilham, sem cortar texto.
        </Cartao>
        <Cartao icone="🎨" titulo="Cores">
          Vaga vazia em <code>neutral-100</code> com tracejado <code>neutral-400</code>. Chave formada
          em <code>success-50</code> com fio <code>success-700</code> e texto <code>success-800</code>{' '}
          (6,7:1). No escuro, camada <code>opacity-success-100</code> sobre <code>neutraldark-50</code>.
        </Cartao>
        <Cartao icone="🔣" titulo="Glifos: todos do quadro">
          Todos os glifos vêm do quadro de ícones da seção (<code>6024:2923</code>), pela ligadura do
          Material Symbols Rounded, peso 300: <code>key</code> na calha formada; nos blocos da
          demonstração, <code>account_balance</code>, <code>calendar_month</code>,{' '}
          <code>history_edu</code>, <code>photo_camera</code>, <code>campaign</code> e{' '}
          <code>share</code>; e os do <code>PuzzleBlock</code> (<code>replay</code>, <code>lock</code>).
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Título, a lista de vagas e a linha de status."
      />
      <Palco rotulo="Uma vaga preenchida, duas vazias">
        <PuzzleTrack label="Chave do Editor" slots={vagasCom(['fonte', null, null], 'placed')} status="1 de 3 vagas preenchidas." />
        <ol style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.7, color: 'var(--unooria-color-neutral-700)' }}>
          <li>
            <strong>Título</strong> (<code>label</code>): nomeia o <code>role=&quot;group&quot;</code>.
          </li>
          <li>
            <strong>Vagas</strong> (<code>slots</code>): uma <code>&lt;ol&gt;</code>; a vaga vazia lê{' '}
            <code>emptySlotLabel</code> no lugar do número.
          </li>
          <li>
            <strong>Status</strong> (<code>status</code>, <code>completeLabel</code>): a região{' '}
            <code>aria-live=&quot;polite&quot;</code>.
          </li>
        </ol>
      </Palco>

      <UnooriaDocSectionHeader
        title="4. Matriz de Variantes e Estados"
        description="Vazia, parcial, com isca devolvida, formada — e a interação completa."
      />
      <Palco rotulo="Vazia">
        <PuzzleTrack label="Chave do Editor" slots={[null, null, null]} status="0 de 3 vagas preenchidas." />
      </Palco>
      <Palco rotulo="Depois de uma isca devolvida">
        <PuzzleTrack
          label="Chave do Editor"
          slots={vagasCom(['fonte', null, 'data'], 'placed')}
          status="Esse bloco não abre a chave. Tente outro. 2 de 3 vagas preenchidas."
        />
      </Palco>
      <Palco rotulo="Formada (complete)">
        <PuzzleTrack label="Chave do Editor" slots={vagasCom(['data', 'fonte', 'autoria'], 'locked')} complete />
      </Palco>
      <Palco rotulo="Interação completa — toque sequencial (validação de DEMONSTRAÇÃO, só nesta estória)">
        <ChaveDoEditorDemo />
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da calha." />
      <Praticas
        fazer={[
          'Mandar os blocos para a api conferir e desenhar o que ela devolver: as iscas voltam, as certas ficam.',
          'Escrever no status o que aconteceu na jogada ("Bloco Fonte encaixado. 1 de 3 vagas preenchidas.").',
          'Marcar os blocos como locked quando complete: a chave formada não se mexe mais.',
          'Mover o foco depois de cada toque — para o próximo bloco, para o botão de enviar, ou para a calha.',
          'Deixar a bandeja com posições fixas: o bloco que sai deixa o lugar vazio.',
        ]}
        evitar={[
          'Guardar o gabarito no cliente — nem na calha, nem no bundle da experiência.',
          'Criar a região de status só quando houver mensagem: a primeira não seria anunciada.',
          'Repetir no status o texto do completeLabel: ele já está na região anunciada.',
          'Habilitar o envio antes de todas as vagas estarem cheias.',
          'Esconder a calha em telas estreitas: ela empilha.',
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
        <PuzzleTrack
          theme={tema}
          label="Chave do Editor"
          slots={vagasCom(['fonte', null, null], 'placed', tema)}
          status="1 de 3 vagas preenchidas."
        />
        <PuzzleTrack
          theme={tema}
          label="Chave do Editor"
          slots={vagasCom(['fonte', 'data', 'autoria'], 'locked', tema)}
          complete
        />
      </Palco>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente PuzzleTrack. Estende os atributos de <div>, menos children."
      />
      <TabelaDeProps
        linhas={[
          { nome: 'label', tipo: 'React.ReactNode', descricao: 'Título da calha; nomeia o grupo. Obrigatório.' },
          {
            nome: 'slots',
            tipo: 'React.ReactNode[]',
            descricao: 'Conteúdo de cada vaga, na ordem; null é vaga vazia. O comprimento é o número de vagas. Obrigatório.',
          },
          {
            nome: 'emptySlotLabel',
            tipo: '(index: number) => React.ReactNode',
            padrao: '(i) => `Vaga ${i + 1}, vazia`',
            descricao: 'Texto acessível da vaga vazia (índice base 0).',
          },
          { nome: 'complete', tipo: 'boolean', padrao: 'false', descricao: 'Chave formada: fundo de sucesso, vagas unidas.' },
          {
            nome: 'completeLabel',
            tipo: 'React.ReactNode',
            padrao: "'Chave do Editor formada'",
            descricao: 'Texto do sucesso, dentro da região anunciada, com o glifo key.',
          },
          { nome: 'status', tipo: 'React.ReactNode', descricao: 'Linha de status em aria-live="polite".' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
          { nome: 'className', tipo: 'string', descricao: 'Classe CSS adicional.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof PuzzleTrack> = {
  title: 'Plataforma Unooria/Componentes/PuzzleTrack',
  component: PuzzleTrack,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Título da calha (nomeia o grupo).' },
    slots: { control: false, description: 'Conteúdo de cada vaga; null é vaga vazia.' },
    emptySlotLabel: { control: false, description: 'Texto acessível da vaga vazia, a partir do índice.' },
    complete: { control: 'boolean', description: 'Chave formada.' },
    completeLabel: { control: 'text', description: 'Texto do sucesso.' },
    status: { control: 'text', description: 'Linha de status (aria-live="polite").' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    label: 'Chave do Editor',
    slots: [null, null, null],
    complete: false,
    completeLabel: 'Chave do Editor formada',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof PuzzleTrack>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PuzzleTrackDocumentationPage />,
};

/** Os controles do playground: as props da calha e dois atalhos para montar as vagas. */
type PlaygroundArgs = PuzzleTrackProps & {
  /** Quantas vagas a calha tem. */
  totalDeVagas: number;
  /** Quantas, a partir da primeira, já têm bloco. */
  vagasPreenchidas: number;
};

/**
 * Playground com todas as propriedades do PuzzleTrack. `slots` é uma lista de
 * nós React, que não cabe num controle: ele é montado a partir de "totalDeVagas"
 * e "vagasPreenchidas", com os blocos da missão em ordem.
 */
export const Playground: StoryObj<PlaygroundArgs> = {
  name: '🕹️ 1. Playground do PuzzleTrack',
  argTypes: {
    totalDeVagas: { control: { type: 'range', min: 1, max: 5, step: 1 }, description: 'Número de vagas.' },
    vagasPreenchidas: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'Vagas preenchidas, a partir da primeira.',
    },
  },
  args: {
    totalDeVagas: TOTAL_DE_VAGAS,
    vagasPreenchidas: 1,
    status: '1 de 3 vagas preenchidas.',
  },
  render: ({ totalDeVagas, vagasPreenchidas, ...args }) => {
    const slots = Array.from({ length: totalDeVagas }, (_, i) =>
      i < vagasPreenchidas ? (
        <PuzzleBlock
          key={BLOCOS[i].id}
          {...propsDoBloco(BLOCOS[i])}
          theme={args.theme}
          state={args.complete ? 'locked' : 'placed'}
        />
      ) : null
    );
    return (
      <div
        style={{
          padding: 24,
          borderRadius: 12,
          background:
            args.theme === 'dark' ? 'var(--unooria-color-neutraldark-100)' : 'var(--unooria-color-neutral-100)',
        }}
      >
        <PuzzleTrack {...args} slots={slots} />
      </div>
    );
  },
};

/**
 * A missão inteira: bandeja com 6 blocos, calha de 3, toque sequencial e o
 * envio. A validação é de DEMONSTRAÇÃO e mora nesta estória — na missão, quem
 * confere é a api.
 */
export const ChaveDoEditor: Story = {
  name: 'Chave do Editor (interação completa)',
  render: () => <ChaveDoEditorDemo />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const bandeja = within(tela.getByRole('group', { name: 'Bandeja de blocos' }));
    const calha = within(tela.getByRole('group', { name: 'Chave do Editor' }));
    const enviar = tela.getByRole('button', { name: 'Encaixar a chave' });

    await expect(enviar).toBeDisabled();

    // Toque sequencial: cada bloco vai para a primeira vaga livre.
    await userEvent.click(bandeja.getByRole('button', { name: 'Fonte' }));
    await userEvent.click(bandeja.getByRole('button', { name: 'Foto bonita' }));
    await userEvent.click(bandeja.getByRole('button', { name: 'Data' }));

    await expect(calha.getAllByRole('listitem')).toHaveLength(3);
    await expect(calha.getAllByRole('button')).toHaveLength(3);
    await expect(calha.queryByText(/vazia/)).not.toBeInTheDocument();
    await expect(enviar).toBeEnabled();

    // Envio: a isca volta para a bandeja, com o aviso escrito; as certas ficam.
    await userEvent.click(enviar);
    const foto = bandeja.getByRole('button', { name: 'Foto bonita' });
    await expect(foto).toHaveAttribute('data-state', 'returned');
    await expect(within(foto).getByText('Voltou para a bandeja')).toBeVisible();
    await expect(foto).toHaveAccessibleDescription(/Voltou para a bandeja/);
    await expect(calha.queryByRole('button', { name: 'Foto bonita' })).not.toBeInTheDocument();
    await expect(calha.getByText('Vaga 2, vazia')).toBeInTheDocument();
    await expect(calha.getByText(/Esse bloco não abre a chave/)).toBeInTheDocument();
    await expect(enviar).toBeDisabled();

    // A peça que faltava, em qualquer vaga: a chave se forma.
    await userEvent.click(bandeja.getByRole('button', { name: 'Autoria' }));
    await userEvent.click(enviar);
    await expect(calha.getByText('Chave do Editor formada')).toBeVisible();
    for (const peca of calha.getAllByRole('button')) {
      await expect(peca).toHaveAttribute('aria-disabled', 'true');
    }
  },
};

/**
 * Vazia, parcial e formada — com a semântica conferida: grupo nomeado, vagas
 * vazias anunciadas, região de status educada e o texto do sucesso.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PuzzleTrack label="Chave do Editor" slots={[null, null, null]} status="0 de 3 vagas preenchidas." />
      <PuzzleTrack
        label="Chave do Editor"
        slots={vagasCom(['fonte', null, null], 'placed')}
        status="1 de 3 vagas preenchidas."
      />
      <PuzzleTrack label="Chave do Editor" slots={vagasCom(['fonte', 'data', 'autoria'], 'locked')} complete />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const [vazia, parcial, formada] = tela.getAllByRole('group', { name: 'Chave do Editor' });

    // Vazia: três vagas numa lista, cada uma dizendo o que é.
    const naVazia = within(vazia);
    await expect(naVazia.getAllByRole('listitem')).toHaveLength(3);
    await expect(naVazia.getByText('Vaga 1, vazia')).toBeInTheDocument();
    await expect(naVazia.getByText('Vaga 2, vazia')).toBeInTheDocument();
    await expect(naVazia.getByText('Vaga 3, vazia')).toBeInTheDocument();
    await expect(naVazia.queryByRole('button')).not.toBeInTheDocument();
    const status = naVazia.getByText('0 de 3 vagas preenchidas.').closest('[aria-live]');
    await expect(status).toHaveAttribute('aria-live', 'polite');

    // Parcial: o bloco ocupa a vaga 1; as outras continuam anunciadas.
    const naParcial = within(parcial);
    await expect(naParcial.getByRole('button', { name: 'Fonte' })).toHaveAttribute('data-state', 'placed');
    await expect(naParcial.queryByText('Vaga 1, vazia')).not.toBeInTheDocument();
    await expect(naParcial.getByText('Vaga 2, vazia')).toBeInTheDocument();

    // Formada: o texto do sucesso está na região anunciada, e as peças travaram.
    const naFormada = within(formada);
    const sucesso = naFormada.getByText('Chave do Editor formada');
    await expect(sucesso).toBeVisible();
    await expect(sucesso.closest('[aria-live]')).toHaveAttribute('aria-live', 'polite');
    await expect(formada).toHaveAttribute('data-complete', 'true');
    for (const peca of naFormada.getAllByRole('button')) {
      await expect(peca).toHaveAttribute('aria-disabled', 'true');
    }
  },
};
