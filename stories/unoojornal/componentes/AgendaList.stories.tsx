import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { AgendaList } from '../../../src/unoojornal/components/AgendaList';
import { ujnDayMonth } from '../../../src/unoojornal/edition';
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
import { ujnAgenda } from '../fixtures';

const BAR = '#716C98';

/**
 * Os compromissos das fixtures, com data lida em fuso explícito.
 */
const AgendaFromFixtures: React.FC<{ linked?: boolean; title?: string }> = ({ linked = false, title }) => (
  <AgendaList title={title}>
    {ujnAgenda.map((event) => {
      const { day, month } = ujnDayMonth(event.date);
      return (
        <AgendaList.Item
          key={event.id}
          day={day}
          month={month}
          title={event.title}
          time={event.time}
          href={linked ? `#${event.id}` : undefined}
        />
      );
    })}
  </AgendaList>
);

/**
 * Página de documentação rica dos componentes AgendaList e AgendaList.Item.
 */
const AgendaListDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Capa"
      title="AgendaList"
      description="Cartão “Agenda da escola” da barra lateral: título e uma lista de compromissos, cada um com tarja de data (dia grande, mês em caixa alta), título e horário."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Os próximos compromissos da comunidade escolar."
    />
    <UjnDocGrid>
      <UjnDocCard icon="📅" title="Agenda na lateral">
        Quatro a seis compromissos, do mais próximo ao mais distante, ao lado da opinião em
        destaque.
      </UjnDocCard>
      <UjnDocCard icon="🗓️" title="Tarja de data">
        O dia em destaque e o mês em caixa alta sobre <code>background-subtle</code>: legível de
        relance, sem depender de cor.
      </UjnDocCard>
      <UjnDocCard icon="🔗" title="Link ou informação">
        Com <code>href</code> o título é um link e o item inteiro clica; sem ele, o compromisso só
        informa.
      </UjnDocCard>
      <UjnDocCard icon="🧾" title="Lista de verdade">
        É uma região nomeada pelo título, com um <code>&lt;ul&gt;</code> e um{' '}
        <code>&lt;li&gt;</code> por compromisso.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="AgendaList · AgendaList.Item"
      layout="Cartão · lista vertical"
      specs={[
        { label: 'Cartão', value: 'background-card · fio de 1px border-subtle · raio xs · recuo de 20px' },
        { label: 'Título do cartão', value: 'title-md · 20/30px' },
        { label: 'Tarja de data', value: '56px × 56px (local) · background-subtle · raio s' },
        { label: 'Dia', value: 'title-md em negrito · números tabulares' },
        { label: 'Mês', value: 'kicker 12/18px · caixa alta · text-accent' },
        { label: 'Título do compromisso', value: 'body-sm · 14/20px · semibold' },
        { label: 'Horário', value: 'caption 12/18px · text-secondary · glifo schedule' },
        { label: 'Vão entre itens', value: '--ujn-spacing-m (12px)' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Medida local da tarja',
          detail:
            '--ujn-agenda-date-size (56px) no topo do AgendaList.css: a escala de espaçamento não tem esse degrau, e a tarja precisa ser quadrada.',
        },
        {
          subject: 'Mês em texto, não só em cor',
          detail:
            'o mês é escrito (“MAR”) na tarja; o roxo do texto é reforço. O dia e o mês entram no texto lido pelo leitor de tela antes do título.',
        },
        {
          subject: 'Item é <li>, lista é <ul>',
          detail:
            'AgendaList.Item renderiza um <li> e a lista, o <ul role="list">: o role explícito sobrevive ao list-style: none no Safari.',
        },
        {
          subject: 'Server Component',
          detail:
            'só recebe props e renderiza; o título nomeia a região por aria-label, sem useId, e o link usa apenas href — nenhuma função passa a filho.',
        },
        {
          subject: 'Dourado do Figma → roxo de acento',
          detail: 'a tarja de data do arquivo de origem usa dourado; aqui o mês usa --ujn-color-text-accent.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocStage label="Cartão na largura da coluna lateral" surface="page" align="flex-start" padding={24}>
      <div style={{ width: 384 }}>
        <AgendaFromFixtures linked />
      </div>
    </UjnDocStage>
    <UjnDocAnatomy
      zones={[
        { name: 'Título do cartão', role: 'Heading de nível 3; nomeia a região.', token: '--ujn-font-title-md-*' },
        { name: 'Tarja de data', role: 'Dia e mês, quadrada.', token: '--ujn-color-background-subtle · --ujn-agenda-date-size' },
        { name: 'Dia', role: 'Número em destaque.', token: '--ujn-font-title-md-*' },
        { name: 'Mês', role: 'Abreviação em caixa alta.', token: '--ujn-font-kicker-* · --ujn-color-text-accent' },
        { name: 'Título do compromisso', role: 'Texto ou link.', token: '--ujn-font-body-sm-*' },
        { name: 'Horário', role: 'Glifo e intervalo.', token: '--ujn-font-caption-* · --ujn-color-text-secondary' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Com links, só informativa, com título próprio e sem horário."
    />
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      <div style={{ width: 340 }}>
        <AgendaFromFixtures linked />
      </div>
      <div style={{ width: 340 }}>
        <AgendaFromFixtures title="Próximas provas" />
      </div>
      <div style={{ width: 340 }}>
        <AgendaList>
          <AgendaList.Item day="02" month="ABR" title="Sem horário definido" />
          <AgendaList.Item day="09" month="ABR" title="Com horário e link" time="19h" href="#com-link" />
        </AgendaList>
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Listar do compromisso mais próximo ao mais distante.',
        'Obter dia e mês com ujnDayMonth, em fuso explícito.',
        'Informar o horário com o intervalo (“8h às 12h”).',
        'Manter os títulos curtos: duas linhas no máximo.',
      ]}
      donts={[
        'Formatar a data com o fuso da máquina: o mesmo dia vira outro no CI.',
        'Passar filhos que não sejam AgendaList.Item.',
        'Usar a agenda para notícia: ela é para datas.',
        'Esconder o mês: o dia sozinho não diz quando.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Cartão, tarja, textos e fios acompanham data-ujn-theme."
    />
    <UjnDocThemeSwitcher surface="page" padding={24}>
      {() => (
        <div style={{ width: 384 }}>
          <AgendaFromFixtures linked />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="AgendaList"
      rows={[
        { name: 'title', type: 'string', default: "'Agenda da escola'", description: 'Título do cartão; também nomeia a região.' },
        { name: 'children', type: 'React.ReactNode', description: 'Os compromissos: um AgendaList.Item por evento.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos do <section>.' },
      ]}
    />
    <UjnDocPropsTable
      title="AgendaList.Item"
      rows={[
        { name: 'day', type: 'string | number', description: 'Dia do mês. Obrigatório.' },
        { name: 'month', type: 'string', description: 'Mês; a tarja o mostra em caixa alta. Obrigatório.' },
        { name: 'title', type: 'string', description: 'Nome do compromisso. Obrigatório.' },
        { name: 'time', type: 'string', description: 'Horário ou intervalo.' },
        { name: 'href', type: 'string', description: 'Faz do título um <a> e o item inteiro clicável.' },
        { name: 'className / ...', type: 'React.LiHTMLAttributes<HTMLLIElement>', description: 'Demais atributos do <li>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof AgendaList> = {
  title: 'Unoojornal/Componentes/AgendaList',
  component: AgendaList,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título do cartão.' },
    children: { control: false, description: 'Os compromissos (AgendaList.Item).' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: 'Agenda da escola',
  },
};

export default meta;

type Story = StoryObj<typeof AgendaList>;

/**
 * Documentação rica e completa dos componentes.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AgendaListDocumentationPage />,
};

/**
 * Playground do cartão, com as props do AgendaList expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do AgendaList',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} surface="page" align="flex-start" padding={24}>
      <div style={{ width: 384 }}>
        <AgendaList title={args.title} theme={args.theme} className={args.className}>
          {ujnAgenda.map((event) => {
            const { day, month } = ujnDayMonth(event.date);
            return <AgendaList.Item key={event.id} day={day} month={month} title={event.title} time={event.time} />;
          })}
        </AgendaList>
      </div>
    </UjnDocStage>
  ),
};

type ItemArgs = React.ComponentProps<typeof AgendaList.Item>;

/**
 * Playground do compromisso, com 100% das props do AgendaList.Item expostas.
 */
export const PlaygroundItem: StoryObj<ItemArgs> = {
  name: '🕹️ 2. Playground do AgendaList.Item',
  argTypes: {
    day: { control: 'text', description: 'Dia do mês.' },
    month: { control: 'text', description: 'Mês (a tarja o mostra em caixa alta).' },
    title: { control: 'text', description: 'Nome do compromisso.' },
    time: { control: 'text', description: 'Horário ou intervalo.' },
    href: { control: 'text', description: 'Endereço (faz do título um link).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    day: '24',
    month: 'mar',
    title: 'Roda de Conversa: Saúde Mental e Pressão Acadêmica no Ensino Médio',
    time: '18h30',
    href: '',
  },
  render: ({ href, ...args }) => (
    <UjnDocStage surface="page" align="flex-start" padding={24}>
      <div style={{ width: 384 }}>
        <AgendaList>
          <AgendaList.Item {...args} href={href || undefined} />
        </AgendaList>
      </div>
    </UjnDocStage>
  ),
};

/**
 * A agenda na barra lateral de 384px da capa.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: barra lateral',
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24}>
      <div style={{ width: 384 }}>
        <AgendaFromFixtures linked />
      </div>
    </UjnDocStage>
  ),
};

/**
 * Larguras de 384, 320 e 260px.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      {[384, 320, 260].map((width) => (
        <div key={width} style={{ width }}>
          <AgendaFromFixtures />
        </div>
      ))}
    </UjnDocStage>
  ),
};

/**
 * Com links e só informativa.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      <div style={{ width: 340 }}>
        <AgendaFromFixtures linked title="Com links" />
      </div>
      <div style={{ width: 340 }}>
        <AgendaFromFixtures title="Só informativa" />
      </div>
    </UjnDocStage>
  ),
};

/**
 * Item sem horário, com título longo e lista de um item só.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      <div style={{ width: 340 }}>
        <AgendaList title="Sem horário">
          <AgendaList.Item day="02" month="abr" title="Início do torneio de xadrez rápido" />
        </AgendaList>
      </div>
      <div style={{ width: 340 }}>
        <AgendaList title="Título longo">
          <AgendaList.Item
            day="27"
            month="mar"
            title="Entrega dos boletins do 1º bimestre e reunião de pais e professores com a coordenação"
            time="8h às 12h"
            href="#longo"
          />
        </AgendaList>
      </div>
    </UjnDocStage>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="flex-start" padding={24}>
          <div style={{ width: 340 }}>
            <AgendaFromFixtures linked />
          </div>
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Estrutura: a agenda é uma região nomeada com uma lista, um item por
 * compromisso, e só os itens com `href` têm link.
 */
export const Estrutura: Story = {
  name: 'Interação: estrutura e links',
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24}>
      <div style={{ width: 384 }}>
        <AgendaList>
          <AgendaList.Item day="24" month="mar" title="Roda de Conversa" time="18h30" href="#roda" />
          <AgendaList.Item day="27" month="mar" title="Entrega dos boletins" time="8h às 12h" />
        </AgendaList>
      </div>
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const region = canvas.getByRole('region', { name: 'Agenda da escola' });
    const list = within(region).getByRole('list');
    await expect(within(list).getAllByRole('listitem')).toHaveLength(2);

    const link = canvas.getByRole('link', { name: 'Roda de Conversa' });
    await expect(link).toHaveAttribute('href', '#roda');
    await expect(canvas.queryByRole('link', { name: 'Entrega dos boletins' })).toBeNull();

    await expect(canvas.getAllByText('mar', { selector: '.ujn-agenda-item__month' })).toHaveLength(2);
    await expect(canvas.getByText('18h30')).toBeInTheDocument();
  },
};
