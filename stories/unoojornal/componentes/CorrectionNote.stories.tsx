import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { CorrectionNote } from '../../../src/unoojornal/components/CorrectionNote';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocGrid,
  UjnDocCard,
  UjnDocSpecs,
  UjnDocDecisions,
  UjnDocAnatomy,
  UjnDocStage,
  UjnDocPractices,
  UjnDocThemeSwitcher,
  UjnDocPropsTable,
} from '../../../.storybook/components';

const BAR = '#716C98';

/** O texto da nota de contato da matéria de demonstração. */
const CONTATO = 'Correções e cartas: sala 12, bloco B ou redação@gazetadopatio.com.br';

/** Um exemplo de correção publicada depois da matéria. */
const CORRECAO =
  'Uma versão anterior desta matéria informava 80 projetos na Feira de Ciências. O número correto é 120. O texto foi corrigido às 15h10.';

const rotuloEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ujn-font-sans)',
  fontSize: 'var(--ujn-font-caption-size)',
  lineHeight: 'var(--ujn-font-caption-line)',
  color: 'var(--ujn-color-text-secondary)',
};

/**
 * Nota com legenda, na largura pedida.
 */
const NotaRotulada: React.FC<{
  rotulo: string;
  largura?: number | string;
  props?: Partial<React.ComponentProps<typeof CorrectionNote>>;
}> = ({ rotulo, largura = 480, props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: largura }}>
    <p style={rotuloEstilo}>{rotulo}</p>
    <CorrectionNote {...props}>{props?.children ?? CONTATO}</CorrectionNote>
  </div>
);

/**
 * Nota que conta quantas vezes a ação foi acionada.
 */
const NotaComAcao: React.FC = () => {
  const [envios, setEnvios] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 480 }}>
      <CorrectionNote actionLabel="Escrever à redação" onAction={() => setEnvios((atual) => atual + 1)}>
        {CONTATO}
      </CorrectionNote>
      <p style={rotuloEstilo} data-testid="contagem">
        Escreveu {envios} {envios === 1 ? 'vez' : 'vezes'}
      </p>
    </div>
  );
};

/**
 * Página de documentação rica do componente CorrectionNote.
 */
const CorrectionNoteDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Matéria"
      title="CorrectionNote"
      description="Nota ao fim da matéria: como falar com a redação, ou o aviso de que um erro foi corrigido depois da publicação. Caixa discreta com filete, glifo, título, texto e, se quiser, uma ação."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Honestidade editorial, ao alcance."
    />
    <UjnDocGrid>
      <UjnDocCard icon="✉️" title="Contato com a redação">
        Variante <code>contact</code>: onde mandar correções e cartas — sala, bloco, e-mail — com a
        ação opcional &quot;Escrever à redação&quot;.
      </UjnDocCard>
      <UjnDocCard icon="⚠️" title="Correção publicada">
        Variante <code>correction</code>: o que foi corrigido e quando, com o glifo de alerta e o
        filete na cor de atenção.
      </UjnDocCard>
      <UjnDocCard icon="🔠" title="Não depende só da cor">
        A variante muda o glifo (carta ou alerta) e o título, além do filete: a diferença chega a
        quem não distingue cores.
      </UjnDocCard>
      <UjnDocCard icon="🏷️" title="Nomeada pelo título">
        É um <code>&lt;aside&gt;</code> ligado ao próprio título por <code>aria-labelledby</code>:
        o leitor de tela anuncia &quot;Correções e cartas&quot;.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura herdada da tela da matéria; cores e fontes são as da Plataforma Unooria."
    />
    <UjnDocSpecs
      component="CorrectionNote"
      layout="Linha · filete | glifo | título, texto e ação"
      specs={[
        { label: 'Estrutura herdada', value: 'Tela article-detail 3:363 (nota de correções)' },
        { label: 'Superfície', value: '--ujn-color-background-subtle' },
        { label: 'Filete', value: '--ujn-rule-thick (3px) · action-primary (contact) · status-warning (correction)' },
        { label: 'Glifo', value: 'mail (contact) · warning (correction), 24px' },
        { label: 'Título', value: 'Label/Large (16/24, 600)' },
        { label: 'Texto', value: 'Body/Medium (16/24, 400) em --ujn-color-text-secondary' },
        { label: 'Recuo', value: '--ujn-spacing-xl × --ujn-spacing-xxl' },
        { label: 'Ação', value: 'Button secondary md, com o glifo edit' },
        { label: 'Fronteira', value: 'Client Component (useId e onAction)' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Dourado → roxo de ação',
          detail:
            'o quadro de origem usa fio e ícone dourados; a nota de contato usa --ujn-color-action-primary, e a de correção, --ujn-color-status-warning (existe nos dois temas e passa de 3:1 sobre a superfície sutil).',
        },
        {
          subject: 'Dois glifos, não duas cores',
          detail:
            'a correção ganhou um glifo próprio (warning) e o título é escolhido pelo produto. Quem não vê a cor ainda distingue as variantes pelo ícone e pelo texto.',
        },
        {
          subject: 'Texto por children',
          detail:
            'o conteúdo ("Correções e cartas: sala 12…") vem como filho, para o produto escrever links e quebras. O título é uma prop à parte.',
        },
        {
          subject: 'Ação só com os dois',
          detail:
            'o botão aparece quando há actionLabel E onAction: um rótulo sem manipulador seria um botão morto.',
        },
        {
          subject: 'Aside nomeado por useId',
          detail:
            'o <aside> usa aria-labelledby apontando para o título, com id de useId — por isso o arquivo é Client Component. Um aria-label passado pelo consumidor, se houver, é aplicado depois e vence.',
        },
        {
          subject: 'Raios só no lado de fora',
          detail:
            'o canto ao lado do filete é reto (o filete é uma borda), e os da direita usam --ujn-radius-s.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Filete, glifo, título, texto e ação."
    />
    <UjnDocStage surface="card" align="stretch" direction="column" padding={32}>
      <CorrectionNote actionLabel="Escrever à redação" onAction={() => undefined}>
        {CONTATO}
      </CorrectionNote>
      <UjnDocAnatomy
        zones={[
          { name: 'Filete', role: 'Borda à esquerda na cor da variante.', token: '--ujn-rule-thick' },
          { name: 'Glifo', role: 'Carta (contact) ou alerta (correction).', token: 'mail · warning' },
          { name: 'Título', role: 'Nomeia a nota para o leitor de tela.', token: '--ujn-font-label-lg-*' },
          { name: 'Texto', role: 'O conteúdo, em secundário.', token: '--ujn-font-body-md-*' },
          { name: 'Ação', role: 'Botão secundário opcional.', token: 'Button secondary' },
        ]}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As duas variantes, com e sem ação, em três larguras."
    />
    <UjnDocStage label="Variantes" surface="card" align="flex-start" padding={24}>
      <NotaRotulada rotulo="contact" />
      <NotaRotulada
        rotulo="correction"
        props={{ variant: 'correction', title: 'Correção', children: CORRECAO }}
      />
    </UjnDocStage>
    <UjnDocStage label="Estados" surface="card" align="flex-start" padding={24}>
      <NotaRotulada rotulo="Sem ação" />
      <NotaRotulada
        rotulo="Com ação"
        props={{ actionLabel: 'Escrever à redação', onAction: () => undefined }}
      />
    </UjnDocStage>
    <UjnDocStage label="Larguras" surface="card" align="flex-start" padding={24}>
      <NotaRotulada rotulo="320px" largura={320} />
      <NotaRotulada rotulo="480px" largura={480} />
      <NotaRotulada rotulo="740px" largura={740} />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando usar a nota." />
    <UjnDocPractices
      dos={[
        'Dizer o que mudou e quando, na variante correction.',
        'Dar um endereço e um local físico de contato: nem todo leitor usa e-mail.',
        'Manter o título curto: ele é o nome da nota para o leitor de tela.',
        'Posicionar a nota ao fim da matéria, depois do último parágrafo.',
      ]}
      donts={[
        'Esconder uma correção em texto corrido: o leitor precisa encontrá-la.',
        'Usar a variante correction para avisos gerais: ela é para erros corrigidos.',
        'Passar actionLabel sem onAction: o botão não apareceria.',
        'Depender só do filete para distinguir as variantes.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfície, filete, glifo e textos acompanham o tema."
    />
    <UjnDocThemeSwitcher surface="card" padding={32}>
      {(tema) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <CorrectionNote theme={tema} actionLabel="Escrever à redação" onAction={() => undefined}>
            {CONTATO}
          </CorrectionNote>
          <CorrectionNote theme={tema} variant="correction" title="Correção">
            {CORRECAO}
          </CorrectionNote>
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do CorrectionNote. Os demais atributos vão ao <aside>."
    />
    <UjnDocPropsTable
      title="CorrectionNote"
      rows={[
        { name: 'title', type: 'string', default: "'Correções e cartas'", description: 'Título da nota; nomeia o <aside>.' },
        { name: 'children', type: 'ReactNode', description: 'Texto da nota. Obrigatório.' },
        { name: 'actionLabel', type: 'string', description: 'Rótulo da ação ("Escrever à redação"). Sem ele, não há botão.' },
        { name: 'onAction', type: '() => void', description: 'Chamado ao acionar a ação. Sem ele, a ação não aparece.' },
        { name: 'variant', type: "'contact' | 'correction'", default: "'contact'", description: 'Carta e filete de ação, ou alerta e filete de atenção.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UjnDocPropsTable
      title="UjnCorrectionNoteVariant"
      rows={[
        { name: "'contact'", type: 'UjnCorrectionNoteVariant', description: 'Contato com a redação: glifo de carta, filete na cor de ação.' },
        { name: "'correction'", type: 'UjnCorrectionNoteVariant', description: 'Correção publicada: glifo de alerta, filete na cor de atenção.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof CorrectionNote> = {
  title: 'Unoojornal/Componentes/CorrectionNote',
  component: CorrectionNote,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título da nota; nomeia o <aside>.' },
    children: { control: 'text', description: 'Texto da nota.' },
    actionLabel: { control: 'text', description: 'Rótulo da ação opcional.' },
    onAction: { action: 'onAction', description: 'Chamado ao acionar a ação.' },
    variant: { control: 'radio', options: ['contact', 'correction'], description: 'Variante da nota.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: 'Correções e cartas',
    children: CONTATO,
    actionLabel: 'Escrever à redação',
    variant: 'contact',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof CorrectionNote>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CorrectionNoteDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da CorrectionNote',
  render: (args) => (
    <UjnDocStage surface="card" theme={args.theme} align="stretch" direction="column" padding={32}>
      <CorrectionNote {...args} />
    </UjnDocStage>
  ),
};

/**
 * A nota ao fim da matéria (tela `article-detail`, `3:363`): onde mandar
 * correções e cartas, com a ação para escrever à redação.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: correções e cartas',
  render: () => (
    <UjnDocStage surface="card" align="stretch" direction="column" padding={32}>
      <CorrectionNote actionLabel="Escrever à redação" onAction={() => undefined}>
        {CONTATO}
      </CorrectionNote>
    </UjnDocStage>
  ),
};

/**
 * A nota em três larguras de coluna.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      <NotaRotulada rotulo="320px" largura={320} props={{ actionLabel: 'Escrever à redação', onAction: () => undefined }} />
      <NotaRotulada rotulo="480px" largura={480} props={{ actionLabel: 'Escrever à redação', onAction: () => undefined }} />
      <NotaRotulada rotulo="740px" largura={740} props={{ actionLabel: 'Escrever à redação', onAction: () => undefined }} />
    </UjnDocStage>
  ),
};

/**
 * As duas variantes.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      <NotaRotulada rotulo="contact" />
      <NotaRotulada
        rotulo="correction"
        props={{ variant: 'correction', title: 'Correção', children: CORRECAO }}
      />
    </UjnDocStage>
  ),
};

/**
 * Com ação e sem ação; título personalizado.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      <NotaRotulada rotulo="Sem ação" />
      <NotaRotulada
        rotulo="Com ação"
        props={{ actionLabel: 'Escrever à redação', onAction: () => undefined }}
      />
      <NotaRotulada rotulo="Título próprio" props={{ title: 'Fale com a redação' }} />
    </UjnDocStage>
  ),
};

/**
 * A nota nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UjnDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          surface="card"
          theme={tema}
          align="stretch"
          direction="column"
          padding={24}
          width={480}
        >
          <CorrectionNote theme={tema} actionLabel="Escrever à redação" onAction={() => undefined}>
            {CONTATO}
          </CorrectionNote>
          <CorrectionNote theme={tema} variant="correction" title="Correção">
            {CORRECAO}
          </CorrectionNote>
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * A nota se nomeia pelo título e a ação é um botão que chama `onAction`.
 */
export const AcionarAAcao: Story = {
  name: 'A ação chama onAction',
  render: () => <NotaComAcao />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('complementary', { name: 'Correções e cartas' })).toBeInTheDocument();

    const acao = tela.getByRole('button', { name: 'Escrever à redação' });
    await userEvent.click(acao);
    await expect(tela.getByTestId('contagem')).toHaveTextContent('Escreveu 1 vez');

    acao.focus();
    await userEvent.keyboard('{Enter}');
    await expect(tela.getByTestId('contagem')).toHaveTextContent('Escreveu 2 vezes');
  },
};

/**
 * Sem `onAction`, o rótulo sozinho não cria botão.
 */
export const SemManipuladorSemBotao: Story = {
  name: 'Sem onAction, sem botão',
  render: () => (
    <UjnDocStage surface="card" align="stretch" direction="column" padding={32}>
      <CorrectionNote actionLabel="Escrever à redação">{CONTATO}</CorrectionNote>
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await expect(tela.queryByRole('button')).toBeNull();
    await expect(tela.getByText(/sala 12, bloco B/)).toBeInTheDocument();
  },
};

/**
 * `onAction` dos controles é chamado uma vez por clique.
 */
export const ChamaOnActionDosControles: Story = {
  name: 'A ação chama o onAction dos controles',
  args: { onAction: fn() },
  render: (args) => (
    <UjnDocStage surface="card" align="stretch" direction="column" padding={32}>
      <CorrectionNote {...args} />
    </UjnDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    await userEvent.click(tela.getByRole('button', { name: 'Escrever à redação' }));
    await expect(args.onAction).toHaveBeenCalledTimes(1);
  },
};
