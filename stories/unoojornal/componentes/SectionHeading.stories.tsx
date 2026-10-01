import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SectionHeading } from '../../../src/unoojornal/components/SectionHeading';
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

/** Espiões das estórias de interação. */
const actionSpy = fn();
const linkSpy = fn();

/**
 * Página de documentação rica do componente SectionHeading.
 */
const SectionHeadingDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Capa"
      title="SectionHeading"
      description="Cabeçalho de bloco da capa: título em title-lg à esquerda e, à direita, um texto de apoio ou uma ação com seta (“Ver todas →”). Um fio fino por baixo é opcional."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Abre cada bloco da capa."
    />
    <UjnDocGrid>
      <UjnDocCard icon="🏷️" title="Título de bloco">
        “Últimas notícias”, “Galeria”, “Leia também”: o heading do bloco, em nível 2 ou 3 conforme
        o lugar na página.
      </UjnDocCard>
      <UjnDocCard icon="ℹ️" title="Texto de apoio">
        <code>meta</code> mostra uma informação discreta à direita: “12 matérias”, “Edição nº
        214”.
      </UjnDocCard>
      <UjnDocCard icon="➡️" title="Ação com seta">
        <code>actionLabel</code> com <code>href</code> é um link; com <code>onAction</code>, um
        botão. O alvo tem 44px de altura.
      </UjnDocCard>
      <UjnDocCard icon="➖" title="Fio opcional">
        <code>rule</code> acrescenta o fio de 1px sob o cabeçalho, para blocos sem cartão.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="SectionHeading"
      layout="Linha · título à esquerda, apoio à direita"
      specs={[
        { label: 'Título', value: 'title-lg · Open Sans 700 · 24/34px' },
        { label: 'Texto de apoio', value: 'body-sm · 14/20px · text-secondary' },
        { label: 'Ação', value: 'label · 14/20px · text-accent · seta xs · alvo de 44px' },
        { label: 'Fio', value: '1px --ujn-color-border-subtle · recuo de 12px' },
        { label: 'Nível', value: 'h2 (padrão) ou h3' },
        { label: 'Foco da ação', value: 'anel de 2px em focus-ring, por fora' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Meta ou ação, nunca as duas',
          detail:
            'quando há actionLabel (com href ou onAction), o texto de apoio não é exibido: duas informações à direita competem pela mesma coluna, e a ação é a que o leitor precisa encontrar.',
        },
        {
          subject: '<div>, não <header>',
          detail:
            'um <header> fora de sectioning content vira o landmark “banner”; vários cabeçalhos de bloco criariam vários banners na página.',
        },
        {
          subject: 'Fio é opcional e fino',
          detail: 'o fio de 1px em border-subtle é só estrutura; o fio grosso e o duplo são do título da publicação.',
        },
        {
          subject: 'Serifa do Figma → Open Sans bold',
          detail: 'o título de seção do arquivo de origem usa serifa; aqui é title-lg em Open Sans bold.',
        },
        {
          subject: 'Client Component',
          detail: 'repassa onAction ao botão; por isso o arquivo começa com \'use client\'.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocStage label="Com ação e fio" surface="page" align="stretch" direction="column" padding={24} width={720}>
      <SectionHeading title="Últimas notícias" actionLabel="Ver todas" href="#todas" rule />
    </UjnDocStage>
    <UjnDocAnatomy
      zones={[
        { name: 'Título', role: 'Heading de nível 2 ou 3.', token: '--ujn-font-title-lg-*' },
        { name: 'Texto de apoio (meta)', role: 'Informação discreta à direita.', token: '--ujn-color-text-secondary' },
        { name: 'Ação', role: 'Link ou botão com seta, no lugar do apoio.', token: '--ujn-color-text-accent · --ujn-touch-target' },
        { name: 'Fio', role: 'Opcional; separa o cabeçalho do bloco.', token: '--ujn-color-border-subtle' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Só título, com apoio, com link, com botão, com fio e em nível 3."
    />
    <UjnDocStage surface="page" align="stretch" direction="column" padding={24} gap={20} width={720}>
      <SectionHeading title="Só o título" />
      <SectionHeading title="Com texto de apoio" meta="12 matérias" />
      <SectionHeading title="Com link" actionLabel="Ver todas" href="#link" />
      <SectionHeading title="Com botão" actionLabel="Ver agenda completa" onAction={() => undefined} />
      <SectionHeading title="Com fio" meta="Edição nº 214" rule />
      <SectionHeading title="Em nível 3" as="h3" meta="Subseção" />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Escolher o nível do heading pelo lugar na página: h2 para blocos, h3 para subblocos.',
        'Escrever o rótulo da ação com verbo e objeto: “Ver todas as matérias”.',
        'Usar href quando a ação muda de página e onAction quando age na mesma.',
        'Usar rule em blocos sem cartão, para marcar o começo do bloco.',
      ]}
      donts={[
        'Pular níveis de heading só pelo tamanho do texto.',
        'Passar meta e actionLabel esperando ver os dois.',
        'Usar “Clique aqui” como rótulo da ação.',
        'Colocar o cabeçalho dentro de um <header> da página.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Título, apoio, ação e fio acompanham data-ujn-theme."
    />
    <UjnDocThemeSwitcher surface="page" padding={24}>
      {() => (
        <div style={{ width: 640 }}>
          <SectionHeading title="Últimas notícias" actionLabel="Ver todas" href="#todas" rule />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="SectionHeading"
      rows={[
        { name: 'title', type: 'string', description: 'Título da seção. Obrigatório.' },
        { name: 'meta', type: 'React.ReactNode', description: 'Texto de apoio à direita; ignorado quando há ação.' },
        { name: 'actionLabel', type: 'string', description: 'Rótulo da ação, seguido de seta.' },
        { name: 'href', type: 'string', description: 'Faz da ação um <a>.' },
        { name: 'onAction', type: '(event: MouseEvent<HTMLElement>) => void', description: 'Chamada da ação; sem href, faz dela um <button>.' },
        { name: 'as', type: "'h2' | 'h3'", default: "'h2'", description: 'Nível do heading.' },
        { name: 'rule', type: 'boolean', default: 'false', description: 'Fio de 1px por baixo.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos do <div>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SectionHeading> = {
  title: 'Unoojornal/Componentes/SectionHeading',
  component: SectionHeading,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título da seção.' },
    meta: { control: 'text', description: 'Texto de apoio à direita.' },
    actionLabel: { control: 'text', description: 'Rótulo da ação com seta.' },
    href: { control: 'text', description: 'Endereço da ação (vira link).' },
    onAction: { action: 'onAction', description: 'Chamada da ação (vira botão sem href).' },
    as: { control: 'radio', options: ['h2', 'h3'], description: 'Nível do heading.' },
    rule: { control: 'boolean', description: 'Fio por baixo.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: 'Últimas notícias',
    meta: '12 matérias',
    actionLabel: '',
    as: 'h2',
    rule: false,
  },
};

export default meta;

type Story = StoryObj<typeof SectionHeading>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SectionHeadingDocumentationPage />,
};

/**
 * Playground do cabeçalho, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SectionHeading',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} surface="page" align="stretch" direction="column" padding={24} width={720}>
      <SectionHeading {...args} actionLabel={args.actionLabel || undefined} href={args.href || undefined} />
    </UjnDocStage>
  ),
};

/**
 * Os blocos da capa: lista, agenda e galeria.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: blocos da capa',
  render: () => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={32} gap={32} width={900}>
      <SectionHeading title="Últimas notícias" actionLabel="Ver todas" href="#todas" rule />
      <SectionHeading title="Agenda da escola" meta="Março e abril" rule />
      <SectionHeading title="Galeria" actionLabel="Ver todas as fotos" href="#fotos" rule />
    </UjnDocStage>
  ),
};

/**
 * Em contêineres de 720, 480 e 320px.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[720, 480, 320].map((width) => (
        <UjnDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" padding={24} width={width}>
          <SectionHeading title="Últimas notícias" actionLabel="Ver todas" href="#todas" rule />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Só título, apoio, link, botão e fio.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={24} gap={20} width={720}>
      <SectionHeading title="Só o título" />
      <SectionHeading title="Com texto de apoio" meta="12 matérias" />
      <SectionHeading title="Com link" actionLabel="Ver todas" href="#link" />
      <SectionHeading title="Com botão" actionLabel="Ver agenda completa" onAction={() => undefined} />
      <SectionHeading title="Com fio" meta="Edição nº 214" rule />
    </UjnDocStage>
  ),
};

/**
 * Nível 2 e nível 3 do heading, e um título longo.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={24} gap={20} width={480}>
      <SectionHeading title="Heading de nível 2" as="h2" meta="Padrão" />
      <SectionHeading title="Heading de nível 3" as="h3" meta="Subseção" />
      <SectionHeading
        title="Um título de bloco bem longo para mostrar a quebra de linha ao lado da ação"
        actionLabel="Ver todas"
        href="#longo"
      />
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
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="stretch" direction="column" padding={24} width={480}>
          <SectionHeading title="Últimas notícias" actionLabel="Ver todas" href="#todas" rule />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: a ação é botão com `onAction` e link com `href`, e o título tem o
 * nível pedido.
 */
export const Acao: Story = {
  name: 'Interação: a ação',
  render: () => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={24} gap={20} width={720}>
      <SectionHeading title="Agenda da escola" actionLabel="Ver agenda completa" onAction={actionSpy} />
      <SectionHeading
        title="Galeria"
        as="h3"
        actionLabel="Ver todas as fotos"
        href="#fotos"
        onAction={(event) => {
          event.preventDefault();
          linkSpy();
        }}
      />
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    actionSpy.mockClear();
    linkSpy.mockClear();
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('heading', { level: 2, name: 'Agenda da escola' })).toBeInTheDocument();
    await expect(canvas.getByRole('heading', { level: 3, name: 'Galeria' })).toBeInTheDocument();

    const button = canvas.getByRole('button', { name: 'Ver agenda completa' });
    await userEvent.click(button);
    await expect(actionSpy).toHaveBeenCalledTimes(1);
    button.focus();
    await userEvent.keyboard('{Enter}');
    await expect(actionSpy).toHaveBeenCalledTimes(2);

    const link = canvas.getByRole('link', { name: 'Ver todas as fotos' });
    await expect(link).toHaveAttribute('href', '#fotos');
    await userEvent.click(link);
    await expect(linkSpy).toHaveBeenCalledTimes(1);
  },
};
