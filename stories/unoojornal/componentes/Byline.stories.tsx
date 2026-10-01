import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Byline } from '../../../src/unoojornal/components/Byline';
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
import { ujnAuthors } from '../fixtures';

const BAR = '#716C98';

const autoria = ujnAuthors[0];

/**
 * Página de documentação rica do componente Byline.
 */
const BylineDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Capa"
      title="Byline"
      description="Assinatura da matéria: autoria em negrito, papel ou turma, data e tempo de leitura. Em linha na capa, empilhada ao lado do retrato no cabeçalho da matéria."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Quem escreveu, e quanto tempo leva para ler."
    />
    <UjnDocGrid>
      <UjnDocCard icon="✍️" title="Na capa">
        Disposição <code>inline</code>: autoria à esquerda e tempo de leitura à direita, dentro do
        destaque e dos itens de lista.
      </UjnDocCard>
      <UjnDocCard icon="🧑‍🎓" title="No cabeçalho da matéria">
        Disposição <code>stacked</code>, com retrato: nome, papel, data e tempo de leitura em
        coluna.
      </UjnDocCard>
      <UjnDocCard icon="🖼️" title="Retrato opcional">
        O avatar só aparece quando há <code>avatarSrc</code>; sem ele, a assinatura é só texto.
      </UjnDocCard>
      <UjnDocCard icon="⏱️" title="Tempo de leitura">
        Texto já formatado (“7 min de leitura”), com glifo de relógio, em tom discreto.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="Byline"
      layout="Linha ou coluna · largura do contêiner"
      specs={[
        { label: 'Autoria', value: 'label · Open Sans 700 · 14/20px · text-primary' },
        { label: 'Papel e data', value: 'body-sm · 14/20px · text-secondary · separados por “ · ”' },
        { label: 'Tempo de leitura', value: 'caption · 12/18px · text-muted · glifo schedule xs' },
        { label: 'Avatar', value: 'Avatar md (32px), decorativo (alt vazio)' },
        { label: 'Vão', value: '--ujn-spacing-m (12px)' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Avatar decorativo',
          detail:
            'o nome já está escrito ao lado do retrato; um alt repetiria o nome para o leitor de tela. O Avatar recebe alt vazio.',
        },
        {
          subject: 'Separador fora do alcance do leitor de tela',
          detail: 'o “ · ” entre papel e data é aria-hidden, e cada parte é lida separada.',
        },
        {
          subject: 'Tempo de leitura à direita só na disposição inline',
          detail:
            'na stacked ele desce para uma linha própria, alinhado ao texto; a capa ganha a leitura de relance e o cabeçalho, a leitura em coluna.',
        },
        {
          subject: 'Server Component',
          detail: 'só recebe props e renderiza markup; nenhuma função é repassada a filho.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocStage label="Disposição stacked, com retrato" surface="card" align="flex-start" padding={24}>
      <Byline layout="stacked" author={autoria.name} role={autoria.role} avatarSrc={autoria.avatarSrc} date="20 de março de 2026" readingTime="7 min de leitura" />
    </UjnDocStage>
    <UjnDocAnatomy
      zones={[
        { name: 'Avatar', role: 'Retrato quadrado; opcional.', token: 'Avatar md' },
        { name: 'Autoria', role: 'Nome em negrito.', token: '--ujn-font-label-* · --ujn-color-text-primary' },
        { name: 'Papel e data', role: 'Turma e publicação, com separador.', token: '--ujn-font-body-sm-*' },
        { name: 'Tempo de leitura', role: 'Glifo e texto discreto.', token: '--ujn-font-caption-* · --ujn-color-text-muted' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Disposições inline e stacked, com e sem retrato."
    />
    <UjnDocStage surface="card" align="stretch" direction="column" padding={24} gap={20} width={640}>
      <Byline author={autoria.name} role={autoria.role} readingTime="7 min de leitura" />
      <Byline author={autoria.name} role={autoria.role} avatarSrc={autoria.avatarSrc} readingTime="7 min de leitura" />
      <Byline layout="stacked" author={autoria.name} role={autoria.role} date="20 de março de 2026" readingTime="7 min de leitura" />
      <Byline layout="stacked" author={autoria.name} role={autoria.role} avatarSrc={autoria.avatarSrc} date="20 de março de 2026" readingTime="7 min de leitura" />
      <Byline author={autoria.name} />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Informar papel ou turma: é o que situa quem lê a autoria.',
        'Passar a data já formatada com ujnFormatDate, em fuso explícito.',
        'Usar stacked quando a assinatura tem retrato.',
        'Manter o tempo de leitura em minutos inteiros.',
      ]}
      donts={[
        'Pôr alt com o nome no retrato: o nome já é lido ao lado.',
        'Concatenar papel e data numa string só: o separador já existe.',
        'Esconder o tempo de leitura em telas estreitas: ele quebra de linha.',
        'Usar a Byline como título de seção.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Textos e glifo acompanham data-ujn-theme."
    />
    <UjnDocThemeSwitcher surface="card" padding={24}>
      {() => (
        <div style={{ width: 560 }}>
          <Byline author={autoria.name} role={autoria.role} avatarSrc={autoria.avatarSrc} readingTime="7 min de leitura" />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="Byline"
      rows={[
        { name: 'author', type: 'string', description: 'Nome de quem assina, em negrito. Obrigatório.' },
        { name: 'role', type: 'string', description: 'Papel ou turma.' },
        { name: 'avatarSrc', type: 'string', description: 'Retrato quadrado; sem ele, não há avatar.' },
        { name: 'date', type: 'string', description: 'Data ou tempo desde a publicação, já formatados.' },
        { name: 'readingTime', type: 'string', description: 'Tempo de leitura, já formatado.' },
        { name: 'layout', type: "'inline' | 'stacked'", default: "'inline'", description: 'Disposição da assinatura.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos do <div>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Byline> = {
  title: 'Unoojornal/Componentes/Byline',
  component: Byline,
  parameters: { layout: 'padded' },
  argTypes: {
    author: { control: 'text', description: 'Nome de quem assina.' },
    role: { control: 'text', description: 'Papel ou turma.' },
    avatarSrc: { control: 'text', description: 'Retrato quadrado.' },
    date: { control: 'text', description: 'Data ou tempo desde a publicação.' },
    readingTime: { control: 'text', description: 'Tempo de leitura.' },
    layout: { control: 'radio', options: ['inline', 'stacked'], description: 'Disposição.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    author: autoria.name,
    role: autoria.role,
    avatarSrc: autoria.avatarSrc,
    date: '20 de março de 2026',
    readingTime: '7 min de leitura',
    layout: 'inline',
  },
};

export default meta;

type Story = StoryObj<typeof Byline>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BylineDocumentationPage />,
};

/**
 * Playground da assinatura, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Byline',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} surface="card" align="stretch" direction="column" padding={24} width={640}>
      <Byline {...args} />
    </UjnDocStage>
  ),
};

/**
 * A assinatura do cabeçalho da matéria.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: cabeçalho da matéria',
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={32}>
      <Byline layout="stacked" author={autoria.name} role={autoria.role} avatarSrc={autoria.avatarSrc} date="20 de março de 2026" readingTime="7 min de leitura" />
    </UjnDocStage>
  ),
};

/**
 * Em contêineres de 640, 400 e 280px: a assinatura quebra de linha.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[640, 400, 280].map((width) => (
        <UjnDocStage key={width} label={`Contêiner de ${width}px`} surface="card" align="stretch" direction="column" padding={24} width={width}>
          <Byline author={autoria.name} role={autoria.role} avatarSrc={autoria.avatarSrc} readingTime="7 min de leitura" />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Inline e stacked, com e sem retrato.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UjnDocStage surface="card" align="stretch" direction="column" padding={24} gap={20} width={640}>
      <Byline author={autoria.name} role={autoria.role} readingTime="7 min de leitura" />
      <Byline author={autoria.name} role={autoria.role} avatarSrc={autoria.avatarSrc} readingTime="7 min de leitura" />
      <Byline layout="stacked" author={autoria.name} role={autoria.role} date="20 de março de 2026" readingTime="7 min de leitura" />
      <Byline layout="stacked" author={autoria.name} role={autoria.role} avatarSrc={autoria.avatarSrc} date="20 de março de 2026" readingTime="7 min de leitura" />
    </UjnDocStage>
  ),
};

/**
 * Assinatura mínima, só autoria e papel, e só tempo de leitura.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="card" align="stretch" direction="column" padding={24} gap={20} width={640}>
      <Byline author={autoria.name} />
      <Byline author={autoria.name} role={autoria.role} />
      <Byline author={autoria.name} readingTime="3 min de leitura" />
      <Byline author="Editorial da Redação" role="Conselho editorial" date="Há 2 horas" />
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
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="card" align="stretch" direction="column" padding={24} width={440}>
          <Byline author={autoria.name} role={autoria.role} avatarSrc={autoria.avatarSrc} readingTime="7 min de leitura" />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Estrutura: a autoria, o papel, a data e o tempo de leitura chegam ao
 * leitor de tela como texto separado, e o retrato é decorativo.
 */
export const Estrutura: Story = {
  name: 'Interação: estrutura',
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      <Byline layout="stacked" author={autoria.name} role={autoria.role} avatarSrc={autoria.avatarSrc} date="20 de março de 2026" readingTime="7 min de leitura" />
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(autoria.name)).toBeInTheDocument();
    await expect(canvas.getByText(autoria.role, { exact: false })).toBeInTheDocument();
    await expect(canvas.getByText('7 min de leitura')).toBeInTheDocument();

    // O retrato é decorativo: o nome já está escrito ao lado.
    await expect(canvas.queryByRole('img', { name: autoria.name })).toBeNull();
  },
};
