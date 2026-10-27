import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Certificate } from '../../../src/unooria/components/Certificate';
import { Tag } from '../../../src/unooria/components/Tag';
import '../../../src/unooria/tokens/icons.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/* ---------------------------------------------------------------------------
   Conteúdo de demonstração — o fim de uma missão de auditoria algorítmica
   (3º ano do Ensino Médio). O texto de verdade da missão mora na experiência.
   ------------------------------------------------------------------------- */

const TITULO = 'Certificado de Auditoria Algorítmica';
const SALVAGUARDA = 'Direito à Explicação e Revisão Humana';
const RODAPE = 'Resultado congelado: a estação não aceita mais alterações.';
const EQUIPE = 'Estação homologada pela Equipe Aurora';

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
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        alignItems: 'start',
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

/** O certificado completo da demonstração, no tema pedido. */
const CertificadoCompleto: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => (
  <Certificate title={TITULO} icon="balance" safeguard={SALVAGUARDA} footer={RODAPE} theme={theme}>
    <Tag variant="brand" size="sm" theme={theme}>
      {EQUIPE}
    </Tag>
  </Certificate>
);

/**
 * Página de documentação rica do componente Certificate.
 */
const CertificateDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<'light' | 'dark'>('light');
  const escuro = tema === 'dark';

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Conclusão"
        title="Certificate"
        description="O selo de conclusão de uma missão: medalhão com o glifo, título, conteúdo livre, a salvaguarda que a conclusão garante (um Badge de sucesso) e o rodapé. Só desenha — se o certificado aparece, e com qual salvaguarda, é o produto que decide, a partir do que o servidor registrou."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="O fim de uma missão, com o que ela garante por escrito."
      />
      <Grade>
        <Cartao icone="🏅" titulo="Conclusão de missão">
          A tela final da missão mostra o certificado com o que a turma conquistou. Antes, o produto o
          compunha à mão com <code>Card</code> + <code>Icon</code> + <code>Badge</code>.
        </Cartao>
        <Cartao icone="🛡️" titulo="Salvaguarda por escrito">
          A garantia que a conclusão carrega (“Direito à Explicação e Revisão Humana”) sai num{' '}
          <code>Badge</code> de sucesso com o glifo <code>verified_user</code> — texto, não só cor.
        </Cartao>
        <Cartao icone="🔊" titulo="Lê-se sozinho">
          É um <code>&lt;article&gt;</code> nomeado pelo título, com o rodapé no{' '}
          <code>&lt;footer&gt;</code> dele: o leitor de tela anuncia o certificado como uma peça
          inteira.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Design próprio: a seção não tem quadro de certificado."
      />
      <Grade>
        <Cartao icone="📐" titulo="Medidas (do próprio pacote)">
          Fio de 1px e raio de 16px do <code>Card</code>, recuo de 24px, título no degrau{' '}
          <code>title-l</code> em negrito e o <code>Badge</code> <code>md</code> sem alteração. A
          moldura dupla é um <code>outline</code> recuado 9px, sem elemento a mais.
        </Cartao>
        <Cartao icone="🎨" titulo="Cores e contraste">
          Título <code>neutral-950</code> sobre <code>neutral-50</code> (15,09:1); texto{' '}
          <code>neutral-700</code> (8,13:1). Medalhão com glifo <code>brandnavy-800</code> sobre{' '}
          <code>brandnavy-50</code> (5,18:1). No escuro: título 13,84:1, texto 10,01:1, glifo{' '}
          <code>brandnavy-100</code> sobre <code>brandnavy-900</code> 7,13:1.
        </Cartao>
        <Cartao icone="🔣" titulo="Glifos: todos do quadro">
          O padrão do medalhão é <code>workspace_premium</code>; a demonstração usa{' '}
          <code>balance</code>; a salvaguarda usa <code>verified_user</code>. Os três estão no quadro
          de ícones da seção (<code>6024:2923</code>), pelo nome da ligadura do Material Symbols
          Rounded, peso 300.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="3. Anatomia do Componente" description="Cinco zonas, três opcionais." />
      <Palco rotulo="Certificado completo, com as zonas numeradas ao lado">
        <CertificadoCompleto />
        <ol style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.7, color: 'var(--unooria-color-neutral-700)' }}>
          <li>
            <strong>Medalhão</strong> (<code>icon</code>): decorativo, <code>aria-hidden</code>.
          </li>
          <li>
            <strong>Título</strong> (<code>title</code>, <code>titleAs</code>): nomeia o{' '}
            <code>&lt;article&gt;</code>.
          </li>
          <li>
            <strong>Conteúdo</strong> (<code>children</code>): livre — aqui, a <code>Tag</code> da equipe.
          </li>
          <li>
            <strong>Salvaguarda</strong> (<code>safeguard</code>): <code>Badge</code> de sucesso.
          </li>
          <li>
            <strong>Rodapé</strong> (<code>footer</code>): sob fio tracejado, no <code>&lt;footer&gt;</code>.
          </li>
        </ol>
      </Palco>

      <UnooriaDocSectionHeader
        title="4. Matriz de Variantes e Estados"
        description="Do mínimo (só título) ao completo."
      />
      <Palco rotulo="Composição">
        <Certificate title="Missão concluída" />
        <Certificate title={TITULO} icon="balance" footer={RODAPE} />
        <Certificate title={TITULO} icon="balance" safeguard={SALVAGUARDA} />
        <CertificadoCompleto />
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso do certificado." />
      <Praticas
        fazer={[
          'Mostrar a salvaguarda só quando a conclusão de fato a garante — quem sabe é o servidor.',
          'Escrever o título como o nome do certificado ("Certificado de …").',
          'Usar o rodapé para o estado do resultado (congelado, data, quem homologou).',
          'Passar titleAs="h2" quando o certificado fica direto sob o h1 da página.',
        ]}
        evitar={[
          'Usar o certificado como cartão genérico de conteúdo.',
          'Pôr botões dentro do certificado: as ações da tela ficam fora dele.',
          'Trocar o Badge da salvaguarda por cor solta ou ícone sem texto.',
          'Mostrar nota ou gabarito no certificado.',
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
        <CertificadoCompleto theme={tema} />
      </Palco>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente Certificate. Estende os atributos de <article>, menos title."
      />
      <TabelaDeProps
        linhas={[
          { nome: 'title', tipo: 'React.ReactNode', descricao: 'Título visível; nomeia o <article>. Obrigatório.' },
          {
            nome: 'titleAs',
            tipo: "'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'",
            padrao: "'h3'",
            descricao: 'Elemento do título no sumário da página.',
          },
          {
            nome: 'icon',
            tipo: 'string',
            padrao: "'workspace_premium'",
            descricao: 'Ligadura do Material Symbols Rounded no medalhão. Decorativo.',
          },
          { nome: 'safeguard', tipo: 'React.ReactNode', descricao: 'A salvaguarda; sai num Badge de sucesso. Ausente, não aparece.' },
          { nome: 'footer', tipo: 'React.ReactNode', descricao: 'Texto de rodapé, sob fio tracejado, no <footer>.' },
          { nome: 'children', tipo: 'React.ReactNode', descricao: 'Conteúdo livre entre o título e a salvaguarda.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
          { nome: 'className', tipo: 'string', descricao: 'Classe CSS adicional.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Certificate> = {
  title: 'Plataforma Unooria/Componentes/Certificate',
  component: Certificate,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título (nome acessível).' },
    titleAs: {
      control: 'select',
      options: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
      description: 'Elemento do título.',
    },
    icon: { control: 'text', description: 'Ligadura do Material Symbols Rounded no medalhão.' },
    safeguard: { control: 'text', description: 'A salvaguarda (Badge de sucesso).' },
    footer: { control: 'text', description: 'Texto de rodapé.' },
    children: { control: 'text', description: 'Conteúdo livre.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: TITULO,
    titleAs: 'h3',
    icon: 'balance',
    safeguard: SALVAGUARDA,
    footer: RODAPE,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Certificate>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CertificateDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Certificate expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Certificate',
  render: (args) => (
    <div
      style={{
        maxWidth: 400,
        padding: 24,
        borderRadius: 12,
        background:
          args.theme === 'dark' ? 'var(--unooria-color-neutraldark-100)' : 'var(--unooria-color-neutral-100)',
      }}
    >
      <Certificate {...args} />
    </div>
  ),
};

/**
 * O certificado da tela de conclusão, num aparelho de 375px.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <div style={{ width: 343, padding: 16, background: 'var(--unooria-color-neutral-100)', borderRadius: 12 }}>
      <CertificadoCompleto />
    </div>
  ),
};

/**
 * Semântica conferida: `<article>` nomeado pelo título, medalhão decorativo,
 * salvaguarda com texto, rodapé no `<footer>`; e as zonas opcionais somem
 * quando ausentes.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 400 }}>
      <CertificadoCompleto />
      <Certificate title="Missão concluída" titleAs="h2" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    // O certificado completo: um article com o nome do título.
    const completo = tela.getByRole('article', { name: TITULO });
    const noCompleto = within(completo);
    await expect(noCompleto.getByRole('heading', { level: 3, name: TITULO })).toBeVisible();
    await expect(noCompleto.getByText(EQUIPE)).toBeVisible();
    await expect(noCompleto.getByText(SALVAGUARDA)).toBeVisible();
    const rodape = noCompleto.getByText(RODAPE);
    await expect(rodape.tagName).toBe('FOOTER');

    // O medalhão é decorativo.
    const medalhao = completo.querySelector('.unooria-certificate__seal');
    await expect(medalhao).toHaveAttribute('aria-hidden', 'true');

    // O mínimo: sem salvaguarda, sem rodapé, sem corpo — e o título como h2.
    const minimo = tela.getByRole('article', { name: 'Missão concluída' });
    await expect(within(minimo).getByRole('heading', { level: 2 })).toBeVisible();
    await expect(minimo.querySelector('.unooria-certificate__safeguard')).toBeNull();
    await expect(minimo.querySelector('footer')).toBeNull();
    await expect(minimo.querySelector('.unooria-certificate__body')).toBeNull();
  },
};

/**
 * Modo escuro.
 */
export const ModoEscuro: Story = {
  render: () => (
    <div style={{ maxWidth: 400, padding: 24, borderRadius: 12, background: 'var(--unooria-color-neutraldark-100)' }}>
      <CertificadoCompleto theme="dark" />
    </div>
  ),
};
