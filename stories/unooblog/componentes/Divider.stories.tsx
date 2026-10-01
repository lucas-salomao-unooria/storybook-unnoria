import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Divider } from '../../../src/unooblog/components/Divider';
import { Button } from '../../../src/unooblog/components/Button';
import { IconButton } from '../../../src/unooblog/components/IconButton';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocStage,
  UblDocPractices,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';
import { notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Coluna de demonstração: a largura de um cartão de post. */
const COLUNA: React.CSSProperties = { width: 360, display: 'grid', gap: 16 };

/**
 * Barra de ações com divisores verticais entre os grupos de controles.
 */
const BarraDeAcoes: React.FC = () => (
  <div
    role="toolbar"
    aria-label="Ações do post"
    style={{ display: 'flex', alignItems: 'center', gap: 'var(--ubl-spacing-xs)' }}
  >
    <IconButton icon="like" label="Curtir" />
    <IconButton icon="comments" label="Comentar" />
    <Divider orientation="vertical" />
    <IconButton icon="bookmark" label="Salvar para ler depois" />
    <IconButton icon="share" label="Compartilhar" />
  </div>
);

/**
 * Página de documentação rica do componente Divider.
 */
const DividerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Fundação"
      title="Divider"
      description="Fio de 1px que separa blocos da página e controles de uma barra, na horizontal ou na vertical. Com label, o texto fica no meio do fio e o divisor passa a ser anunciado como separador."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Separar sem competir com o conteúdo."
    />
    <UblDocGrid>
      <UblDocCard icon="➖" title="Entre blocos">
        Um fio horizontal separa o fim do post dos comentários, ou uma seção da seguinte, quando o
        espaço sozinho não basta.
      </UblDocCard>
      <UblDocCard icon="⏸️" title="Entre controles">
        O divisor vertical agrupa os botões de uma barra: reagir de um lado, guardar e compartilhar do
        outro.
      </UblDocCard>
      <UblDocCard icon="🏷️" title="Com rótulo">
        <code>label</code> põe um texto curto no meio do fio — “ou”, “Comentários” — e o divisor é
        lido como separador com esse nome.
      </UblDocCard>
      <UblDocCard icon="🙈" title="Decorativo por padrão">
        Sem rótulo, o divisor sai da árvore de acessibilidade (<code>aria-hidden</code>). Com{' '}
        <code>decorative=&#123;false&#125;</code> vira <code>role=&quot;separator&quot;</code>.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="Divider"
      layout="Fio de 1px · horizontal ou vertical"
      specs={[
        { label: 'Espessura', value: '1px' },
        { label: 'Cor', value: '--ubl-color-border-subtle' },
        { label: 'Horizontal', value: 'largura do contêiner' },
        { label: 'Vertical', value: 'estica na altura do contêiner (mínimo de 20px, --ubl-spacing-xl)' },
        { label: 'Rótulo', value: 'caption-strong (12/18, 600) · text-secondary · vão de 12px até os fios' },
        { label: 'Semântica', value: 'aria-hidden por padrão; role="separator" com decorative=false ou com label' },
        { label: 'Servidor', value: 'Server Component: só recebe props' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Um só fio, sem “grosso” nem “duplo”',
          detail:
            'o Rule do jornal tem fio fino, grosso e duplo para marcar o ritmo de uma página impressa. O blog separa por camada (página → cartão) e por espaço; quando precisa de fio, é um só, de 1px em border-subtle. Por isso o componente se chama Divider e não tem variantes de espessura.',
        },
        {
          subject: 'Rótulo anunciado, não escondido',
          detail:
            'um texto visível não pode sair da árvore de acessibilidade. Com label, o divisor é role="separator" com aria-label igual ao texto, e o texto e os fios internos são aria-hidden para o leitor de tela não repetir. Por isso label ignora decorative.',
        },
        {
          subject: 'Fio em border-subtle, e não em border-control',
          detail:
            'o fio é decoração de separação, não limite de controle: border-subtle basta (WCAG 1.4.11 só exige 3:1 para fronteiras de componentes). O contorno que delimita campos e chips usa border-control.',
        },
        {
          subject: 'Rótulo só na horizontal',
          detail:
            'um texto no meio de um fio vertical exigiria texto girado, ilegível em muita tela; no divisor vertical, label é ignorado.',
        },
        {
          subject: 'Server Component',
          detail: 'não usa hook nem API de navegador; é markup puro.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocAnatomy
      zones={[
        { name: 'Fio', role: 'Linha de 1px que separa.', token: '--ubl-color-border-subtle' },
        { name: 'Rótulo', role: 'Texto opcional no meio do fio horizontal.', token: '--ubl-font-caption-strong-*' },
        { name: 'Vão', role: 'Espaço entre o rótulo e os dois fios.', token: '--ubl-spacing-m' },
        { name: 'Semântica', role: 'aria-hidden (decorativo) ou role="separator".', token: 'aria-orientation' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real, na horizontal, na vertical e com rótulo."
    />
    <UblDocStage label="Horizontal" align="stretch" direction="column" gap={16} padding={24}>
      <Divider />
    </UblDocStage>
    <UblDocStage label="Com rótulo" align="stretch" direction="column" gap={24} padding={24}>
      <Divider label="ou" />
      <Divider label="Comentários" />
    </UblDocStage>
    <UblDocStage label="Vertical, entre controles" gap={16} padding={24}>
      <BarraDeAcoes />
    </UblDocStage>
    <UblDocStage label="Anunciado (decorative=false, sem rótulo)" align="stretch" direction="column" padding={24}>
      <Divider decorative={false} aria-label="Fim do post" />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Separar com espaço e camada primeiro; usar o fio quando isso não bastar.',
        'Usar o divisor vertical para agrupar controles de uma barra.',
        'Manter o rótulo curto (uma ou duas palavras).',
        'Usar decorative={false} só quando o fio tem sentido de navegação (fim do post, início dos comentários).',
      ]}
      donts={[
        'Empilhar vários divisores seguidos: um basta.',
        'Pôr um divisor entre cada item de uma lista que já tem espaçamento.',
        'Usar o rótulo para um título de seção: para isso há um heading.',
        'Pintar o fio com outra cor: use o token.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O fio e o rótulo acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher>
      {() => (
        <div style={{ ...COLUNA, margin: '0 auto' }}>
          <Divider />
          <Divider label="Comentários" />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BarraDeAcoes />
          </div>
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="Divider"
      rows={[
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Orientação do fio.' },
        { name: 'decorative', type: 'boolean', default: 'true', description: 'Sai da árvore de acessibilidade; com false (ou com label), vira role="separator".' },
        { name: 'label', type: 'string', description: 'Texto no meio do fio horizontal; ignorado no vertical.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos (className, style, aria-label, data-*).' },
      ]}
    />
    <UblDocPropsTable
      title="Tipos públicos"
      rows={[{ name: 'UblDividerOrientation', type: "'horizontal' | 'vertical'", description: 'As duas orientações.' }]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Divider> = {
  title: 'Unooblog/Componentes/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'], description: 'Orientação do fio.' },
    decorative: { control: 'boolean', description: 'Decorativo (fora da árvore de acessibilidade).' },
    label: { control: 'text', description: 'Texto no meio do fio horizontal.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
    label: '',
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <DividerDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Divider',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} padding={40} align="stretch" direction="column">
      <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', minHeight: 48 }}>
        <div style={{ width: args.orientation === 'vertical' ? 'auto' : '100%', display: 'flex' }}>
          <Divider {...args} label={args.label || undefined} />
        </div>
      </div>
    </UblDocStage>
  ),
};

/**
 * A barra de ações de um post, com um divisor vertical entre os grupos.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: barra de ações',
  render: () => (
    <UblDocStage surface="card" padding={24} gap={24}>
      <BarraDeAcoes />
    </UblDocStage>
  ),
};

/**
 * Horizontal, com rótulo e vertical.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UblDocStage label="Horizontal" align="stretch" direction="column" padding={24}>
        <Divider />
      </UblDocStage>
      <UblDocStage label="Com rótulo" align="stretch" direction="column" padding={24}>
        <Divider label="ou" />
      </UblDocStage>
      <UblDocStage label="Vertical" padding={24}>
        <BarraDeAcoes />
      </UblDocStage>
    </div>
  ),
};

/**
 * Comprimentos: o fio horizontal segue a largura do contêiner.
 */
export const Tamanhos: Story = {
  name: 'Larguras do contêiner',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[160, 360, 560].map((largura) => (
        <UblDocStage key={largura} label={`${largura}px`} align="stretch" direction="column" padding={24}>
          <div style={{ width: largura }}>
            <Divider label="Comentários" />
          </div>
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Decorativo, anunciado e com rótulo.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage align="stretch" direction="column" gap={24} padding={24}>
      <p style={notaEstilo}>decorative (padrão): fora da árvore de acessibilidade</p>
      <Divider />
      <p style={notaEstilo}>decorative=false: separador anunciado</p>
      <Divider decorative={false} aria-label="Fim do post" />
      <p style={notaEstilo}>com label: separador com o texto como nome</p>
      <Divider label="Comentários" />
    </UblDocStage>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UblDocStage
          key={theme}
          label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={theme}
          align="stretch"
          direction="column"
          gap={24}
          padding={24}
        >
          <Divider />
          <Divider label="Comentários" />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BarraDeAcoes />
          </div>
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: semântica do divisor — decorativo some da árvore de acessibilidade,
 * o anunciado e o rotulado são separadores com nome.
 */
export const Semantica: Story = {
  name: 'Interação: semântica do separador',
  render: () => (
    <div style={COLUNA}>
      <Divider data-testid="decorativo" />
      <Divider decorative={false} aria-label="Fim do post" />
      <Divider label="Comentários" />
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="ghost">Anterior</Button>
        <Divider orientation="vertical" decorative={false} aria-label="Entre as ações" />
        <Button variant="ghost">Próximo</Button>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // O decorativo sai da árvore de acessibilidade
    await expect(canvas.getByTestId('decorativo')).toHaveAttribute('aria-hidden', 'true');
    await expect(canvas.getAllByRole('separator')).toHaveLength(3);

    // O anunciado e o rotulado são separadores com nome
    await expect(canvas.getByRole('separator', { name: 'Fim do post' })).toHaveAttribute('aria-orientation', 'horizontal');
    const rotulado = canvas.getByRole('separator', { name: 'Comentários' });
    await expect(rotulado).toHaveTextContent('Comentários');

    // O texto e os fios internos não são lidos de novo
    await expect(rotulado.querySelectorAll('[aria-hidden="true"]')).toHaveLength(3);

    // O vertical declara a orientação
    await expect(canvas.getByRole('separator', { name: 'Entre as ações' })).toHaveAttribute('aria-orientation', 'vertical');
  },
};
