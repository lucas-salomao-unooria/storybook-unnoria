import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { EditionBar } from '../../../src/unoojornal/components/EditionBar';
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
import { ujnPublication } from '../fixtures';

const BAR = '#716C98';

const DATA = 'sexta-feira, 20 de março de 2026';

/** Largura dos quadros de documentação: larga, média e compacta (contêiner). */
const LARGURAS = [
  { rotulo: 'Largo (1280px)', largura: 1280 },
  { rotulo: 'Médio (720px)', largura: 720 },
  { rotulo: 'Compacto (390px)', largura: 390 },
] as const;

/**
 * Página de documentação rica do componente EditionBar.
 */
const EditionBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Cabeçalho e navegação"
      title="EditionBar"
      description="Faixa fina no topo do jornal: a instituição que publica, a edição, a data e o horário da última atualização — com um ponto de status quando o conteúdo está ao vivo. É a primeira coisa que o leitor vê e a última que o jornal precisa explicar."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Contexto editorial em uma linha."
    />
    <UjnDocGrid>
      <UjnDocCard icon="🏫" title="Quem publica">
        A instituição fica à esquerda, em semibold: é a assinatura do jornal, antes mesmo do nome da
        publicação.
      </UjnDocCard>
      <UjnDocCard icon="📅" title="Qual edição e de quando">
        A edição fica ao centro e a data à direita. Os dois dão ao leitor a medida do quanto o conteúdo é
        recente.
      </UjnDocCard>
      <UjnDocCard icon="🟢" title="Atualização ao vivo">
        Com <code>live</code>, um ponto na cor de status acompanha o texto &quot;Atualizado às 14:32
        BRT&quot;. O ponto nunca vai sozinho: quem comunica o estado é o texto.
      </UjnDocCard>
      <UjnDocCard icon="📱" title="Compacta sem perder o essencial">
        Abaixo de 640px de contêiner a edição se esconde e a faixa empilha a instituição sobre a data e a
        atualização.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura herdada do cabeçalho `homepage-default` (`3:7`) do arquivo de referência."
    />
    <UjnDocSpecs
      component="EditionBar"
      layout="Grade de 3 zonas (1fr · auto · 1fr) · mínimo de 40px · fio inferior de 1px"
      specs={[
        { label: 'Superfície', value: '--ujn-color-background-subtle' },
        { label: 'Fio inferior', value: '--ujn-elevation-hairline-bottom' },
        { label: 'Altura mínima', value: '--ujn-edition-bar-height (40px)' },
        { label: 'Texto', value: 'Caption (12/18, 400) em --ujn-color-text-secondary' },
        { label: 'Instituição', value: '--ujn-color-text-primary, peso 600' },
        { label: 'Ponto de status', value: '8px · --ujn-color-status-live' },
        { label: 'Quebras', value: '@container: largo ≥ 960px · médio ≥ 640px · compacto abaixo' },
        { label: 'Fronteira', value: 'Server Component (sem hooks nem funções repassadas)' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Superfície sutil, não escura',
          detail:
            'a faixa do arquivo de referência é um bloco de cor chapada; aqui ela é a camada sutil da página (lavanda no claro, roxo profundo no escuro), separada por fio de 1px. O rodapé é a única superfície escura invariante do jornal.',
        },
        {
          subject: 'Ponto de status com texto',
          detail:
            'o ponto verde só aparece junto do texto de atualização, e o texto sempre existe. O tom de --ujn-color-status-live muda por tema para manter 3:1 sobre a camada sutil.',
        },
        {
          subject: 'Edição escondida no compacto',
          detail:
            'abaixo de 640px a edição sai da árvore de acessibilidade (display: none) para a faixa caber em duas linhas; ela continua no cabeçalho da publicação. Alternativa descartada: três linhas empilhadas, que empurram o conteúdo para baixo da dobra.',
        },
        {
          subject: 'Sem token novo',
          detail:
            'todas as medidas são tokens do módulo; o ponto de 8px é --ujn-spacing-xs.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Três zonas sobre uma grade."
    />
    <UjnDocStage surface="page" align="stretch" direction="column" padding={16}>
      <EditionBar
        institution={ujnPublication.institution}
        edition={ujnPublication.edition}
        date={DATA}
        updatedLabel={ujnPublication.updatedLabel}
        live
      />
      <UjnDocAnatomy
        zones={[
          { name: 'Instituição', role: 'Assinatura de quem publica, à esquerda, em semibold.', token: '--ujn-color-text-primary' },
          { name: 'Edição', role: 'Número e ano da edição, centrada. Some no compacto.', token: 'Caption' },
          { name: 'Data', role: 'Data da edição, alinhada à direita.', token: '--ujn-color-text-secondary' },
          { name: 'Atualização', role: 'Texto do horário, com ponto de status quando live.', token: '--ujn-color-status-live' },
          { name: 'Fio inferior', role: 'Separa a faixa do cabeçalho da publicação.', token: '--ujn-elevation-hairline-bottom' },
        ]}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real em três larguras de contêiner e com cada combinação de atualização."
    />
    {LARGURAS.map(({ rotulo, largura }) => (
      <UjnDocStage key={rotulo} label={rotulo} surface="page" align="flex-start" padding={16}>
        <div style={{ width: largura, maxWidth: '100%' }}>
          <EditionBar
            institution={ujnPublication.institution}
            edition={ujnPublication.edition}
            date={DATA}
            updatedLabel={ujnPublication.updatedLabel}
            live
          />
        </div>
      </UjnDocStage>
    ))}
    <UjnDocStage label="Estados da atualização" surface="page" align="stretch" direction="column" padding={16}>
      <EditionBar
        institution={ujnPublication.institution}
        edition={ujnPublication.edition}
        date={DATA}
        updatedLabel={ujnPublication.updatedLabel}
        live
      />
      <EditionBar
        institution={ujnPublication.institution}
        edition={ujnPublication.edition}
        date={DATA}
        updatedLabel={ujnPublication.updatedLabel}
      />
      <EditionBar institution={ujnPublication.institution} edition={ujnPublication.edition} date={DATA} />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Informação compacta e honesta." />
    <UjnDocPractices
      dos={[
        'Escrever o horário com fuso (“14:32 BRT”): atualização sem fuso é ambígua.',
        'Ligar live só quando a edição de fato recebe atualizações; o ponto promete movimento.',
        'Manter a edição curta (“Ano XII · Edição nº 214”), para a faixa não quebrar de linha.',
        'Usar a EditionBar uma vez por página, acima do Masthead.',
      ]}
      donts={[
        'Pôr links ou botões na faixa: ela informa, não navega — a navegação é da MainNav.',
        'Usar o ponto de status sem texto: quem não distingue cor perderia a informação.',
        'Repetir a data da edição no Masthead e na faixa.',
        'Forçar a edição no compacto com CSS próprio: o componente já a esconde.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="A faixa acompanha o tema." />
    <UjnDocThemeSwitcher surface="page" padding={16}>
      {(tema) => (
        <div style={{ width: '100%' }}>
          <EditionBar
            theme={tema}
            institution={ujnPublication.institution}
            edition={ujnPublication.edition}
            date={DATA}
            updatedLabel={ujnPublication.updatedLabel}
            live
          />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público da EditionBar. Os demais atributos vão ao invólucro."
    />
    <UjnDocPropsTable
      title="EditionBar"
      rows={[
        { name: 'institution', type: 'ReactNode', description: 'Instituição que publica, à esquerda. Obrigatório.' },
        { name: 'edition', type: 'ReactNode', description: 'Identificação da edição, ao centro. Some no compacto. Obrigatório.' },
        { name: 'date', type: 'ReactNode', description: 'Data da edição, à direita. Obrigatório.' },
        { name: 'updatedLabel', type: 'ReactNode', description: 'Texto de atualização (ex.: “Atualizado às 14:32 BRT”).' },
        { name: 'live', type: 'boolean', default: 'false', description: 'Ponto de status ao lado do texto de atualização.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional no invólucro.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof EditionBar> = {
  title: 'Unoojornal/Componentes/EditionBar',
  component: EditionBar,
  parameters: { layout: 'padded' },
  argTypes: {
    institution: { control: 'text', description: 'Instituição que publica, à esquerda.' },
    edition: { control: 'text', description: 'Identificação da edição, ao centro.' },
    date: { control: 'text', description: 'Data da edição, à direita.' },
    updatedLabel: { control: 'text', description: 'Texto de atualização.' },
    live: { control: 'boolean', description: 'Ponto de status ao lado do texto de atualização.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    institution: ujnPublication.institution,
    edition: ujnPublication.edition,
    date: DATA,
    updatedLabel: ujnPublication.updatedLabel,
    live: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof EditionBar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <EditionBarDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da EditionBar',
  render: (args) => (
    <div data-ujn-theme={args.theme} style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <EditionBar {...args} />
    </div>
  ),
};

/**
 * Composição fiel à estrutura do cabeçalho do jornal: a faixa sobre a largura
 * de página.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: faixa de edição',
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)' }}>
      <EditionBar
        institution={ujnPublication.institution}
        edition={ujnPublication.edition}
        date={DATA}
        updatedLabel={ujnPublication.updatedLabel}
        live
      />
    </div>
  ),
};

/**
 * As três larguras de contêiner: largo, médio e compacto.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      {LARGURAS.map(({ rotulo, largura }) => (
        <div key={rotulo} style={{ width: largura, maxWidth: '100%' }}>
          <p style={{ margin: '0 0 4px', fontFamily: 'var(--ujn-font-sans)', fontSize: 12, color: 'var(--ujn-color-text-secondary)' }}>
            {rotulo}
          </p>
          <EditionBar
            institution={ujnPublication.institution}
            edition={ujnPublication.edition}
            date={DATA}
            updatedLabel={ujnPublication.updatedLabel}
            live
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * Com e sem atualização; com e sem ponto de status.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <EditionBar institution={ujnPublication.institution} edition={ujnPublication.edition} date={DATA} updatedLabel={ujnPublication.updatedLabel} live />
      <EditionBar institution={ujnPublication.institution} edition={ujnPublication.edition} date={DATA} updatedLabel={ujnPublication.updatedLabel} />
      <EditionBar institution={ujnPublication.institution} edition={ujnPublication.edition} date={DATA} />
    </div>
  ),
};

/**
 * O estado ao vivo e o estado sem atualização: o ponto só existe com o texto.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <EditionBar institution={ujnPublication.institution} edition={ujnPublication.edition} date={DATA} updatedLabel="Atualizado agora" live />
      <EditionBar institution={ujnPublication.institution} edition={ujnPublication.edition} date={DATA} updatedLabel="Atualizado às 09:10 BRT" />
      <EditionBar institution={ujnPublication.institution} edition={ujnPublication.edition} date={DATA} live />
    </div>
  ),
};

/**
 * A faixa nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} data-ujn-theme={tema} style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
          <EditionBar
            institution={ujnPublication.institution}
            edition={ujnPublication.edition}
            date={DATA}
            updatedLabel={ujnPublication.updatedLabel}
            live
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * O ponto de status acompanha o texto, e o texto fica acessível.
 */
export const StatusComTexto: Story = {
  name: 'Ponto de status sempre com texto',
  render: () => (
    <EditionBar
      institution={ujnPublication.institution}
      edition={ujnPublication.edition}
      date={DATA}
      updatedLabel={ujnPublication.updatedLabel}
      live
    />
  ),
  play: async ({ canvasElement }) => {
    const faixa = within(canvasElement);
    await expect(faixa.getByText(ujnPublication.institution)).toBeVisible();
    await expect(faixa.getByText(ujnPublication.updatedLabel)).toBeVisible();
    // O ponto é decorativo: nunca entra na árvore de acessibilidade.
    await expect(canvasElement.querySelector('.ujn-edition-bar__dot')).toHaveAttribute('aria-hidden', 'true');
  },
};
