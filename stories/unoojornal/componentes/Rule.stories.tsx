import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Rule } from '../../../src/unoojornal/components/Rule';
import type { UjnRuleVariant } from '../../../src/unoojornal/components/Rule';
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

const VARIANTS: { variant: UjnRuleVariant; label: string }[] = [
  { variant: 'thin', label: 'thin · 1px' },
  { variant: 'thick', label: 'thick · 3px' },
  { variant: 'double', label: 'double · 6px (3px + vão de 2px + 1px)' },
];

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    style={{
      margin: '0 0 var(--ujn-spacing-xs)',
      fontFamily: 'var(--ujn-font-sans)',
      fontSize: 'var(--ujn-font-caption-size)',
      lineHeight: 'var(--ujn-font-caption-line)',
      color: 'var(--ujn-color-text-secondary)',
    }}
  >
    {children}
  </p>
);

/**
 * Exemplo de composição: o cabeçalho da publicação, com o fio duplo sob o nome
 * e o fio fino sob a navegação.
 */
const MastheadSample: React.FC = () => (
  <div style={{ width: '100%', maxWidth: 560, fontFamily: 'var(--ujn-font-sans)', color: 'var(--ujn-color-text-primary)' }}>
    <p style={{ margin: 0, textAlign: 'center', fontSize: 'var(--ujn-font-title-lg-size)', lineHeight: 'var(--ujn-font-title-lg-line)', fontWeight: 'var(--ujn-font-title-lg-weight)' }}>
      Gazeta do Pátio
    </p>
    <div style={{ margin: 'var(--ujn-spacing-xs) 0' }}>
      <Rule variant="double" />
    </div>
    <p style={{ margin: 0, textAlign: 'center', fontSize: 'var(--ujn-font-label-size)', lineHeight: 'var(--ujn-font-label-line)', fontWeight: 'var(--ujn-font-label-weight)' }}>
      Capa · Últimas · Opinião · Agenda · Galeria
    </p>
    <div style={{ marginTop: 'var(--ujn-spacing-xs)' }}>
      <Rule variant="thin" tone="ink" />
    </div>
  </div>
);

/**
 * Fios verticais entre colunas.
 */
const ColumnsSample: React.FC = () => (
  <div style={{ display: 'flex', gap: 'var(--ujn-spacing-l)', height: 96, fontFamily: 'var(--ujn-font-sans)', fontSize: 'var(--ujn-font-body-sm-size)', color: 'var(--ujn-color-text-primary)' }}>
    <p style={{ margin: 0 }}>Coluna da capa</p>
    <Rule orientation="vertical" variant="thin" />
    <p style={{ margin: 0 }}>Coluna do meio</p>
    <Rule orientation="vertical" variant="thick" />
    <p style={{ margin: 0 }}>Barra lateral</p>
    <Rule orientation="vertical" variant="double" />
    <p style={{ margin: 0 }}>Rodapé</p>
  </div>
);

/**
 * Página de documentação rica do componente Rule.
 */
const RuleDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Fundação"
      title="Rule"
      description="O fio do jornal: fino para separar itens, grosso para fechar uma seção e duplo para o cabeçalho da publicação. Horizontal ou vertical, decorativo por padrão."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Estrutura de página por tinta, não por caixa."
    />
    <UjnDocGrid>
      <UjnDocCard icon="➖" title="thin">
        O divisor entre itens da lista de matérias e o contorno de blocos: 1px.
      </UjnDocCard>
      <UjnDocCard icon="▬" title="thick">
        Fecha uma seção e abre a matéria: 3px na tinta do jornal.
      </UjnDocCard>
      <UjnDocCard icon="═" title="double">
        O fio duplo sob o nome da publicação: 3px, vão de 2px e 1px, 6px no total.
      </UjnDocCard>
      <UjnDocCard icon="┃" title="vertical">
        Separa colunas lado a lado, esticando-se à altura do contêiner.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="Rule"
      layout="Bloco sem conteúdo · 1px, 3px ou 6px"
      specs={[
        { label: 'thin', value: '--ujn-rule-thin (1px) · border-subtle (tone="ink": border-rule)' },
        { label: 'thick', value: '--ujn-rule-thick (3px) · border-rule' },
        { label: 'double', value: '--ujn-rule-double-height (6px) · --ujn-gradient-rule-double' },
        { label: 'Horizontal', value: 'largura total do contêiner' },
        { label: 'Vertical', value: 'align-self: stretch, na altura do contêiner flex' },
        { label: 'double vertical', value: 'duas bordas: 3px, vão de 2px e 1px' },
        { label: 'Semântica', value: 'decorative (padrão): aria-hidden · senão role="separator"' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Fio duplo por gradiente',
          detail:
            'o desenho 3px + vão + 1px é um único token (--ujn-gradient-rule-double) sobre uma caixa de 6px, e não duas bordas empilhadas: um elemento só, sem margens para acertar.',
        },
        {
          subject: 'Fio vertical duplo por bordas',
          detail:
            'o gradiente do token é de 180° (horizontal); na vertical o mesmo desenho sai de border-left de 3px e border-right de 1px sobre 6px de largura, com os mesmos tokens.',
        },
        {
          subject: 'Prop tone (extensão do contrato)',
          detail:
            'o contrato lista só variant, orientation e decorative; o thin precisa de dois tons — border-subtle para divisor de lista e border-rule para a tinta do cabeçalho —, e a escolha entre eles virou tone="subtle" | "ink". thick e double são sempre tinta.',
        },
        {
          subject: 'Decorativo por padrão',
          detail:
            'um fio é desenho: com decorative={false} vira role="separator" com aria-orientation, para quando ele separa regiões que o leitor de tela deve anunciar.',
        },
        {
          subject: 'Tinta do jornal nos dois temas',
          detail:
            'border-rule é o roxo mais escuro no claro e o lavanda no escuro (≥ 3:1 sobre a página), então o fio duplo se vê nos dois temas.',
        },
        {
          subject: 'Server Component',
          detail: 'só recebe props e renderiza.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocAnatomy
      zones={[
        { name: 'Fio (div)', role: 'Bloco sem conteúdo; aria-hidden ou role="separator".', token: '--ujn-rule-*' },
        { name: 'Tinta', role: 'Cor do fio: border-subtle (divisor) ou border-rule (tinta).', token: '--ujn-color-border-*' },
        { name: 'Vão do duplo', role: '2px transparentes entre o fio de 3px e o de 1px.', token: '--ujn-gradient-rule-double' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real, em cada espessura e em cada direção."
    />
    <UjnDocStage label="Horizontais" direction="column" align="stretch" gap={20}>
      {VARIANTS.map(({ variant, label }) => (
        <div key={variant}>
          <Label>{label}</Label>
          <Rule variant={variant} />
        </div>
      ))}
      <div>
        <Label>thin com tone=&quot;ink&quot;</Label>
        <Rule variant="thin" tone="ink" />
      </div>
    </UjnDocStage>
    <UjnDocStage label="Verticais" align="flex-start">
      <ColumnsSample />
    </UjnDocStage>
    <UjnDocStage label="No cabeçalho da publicação" surface="card" padding={32}>
      <MastheadSample />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Usar o fio duplo uma vez por página, sob o nome da publicação.',
        'Usar o thin entre itens de lista e o thick para fechar uma seção.',
        'Deixar o fio decorativo; só marque decorative={false} quando ele separar regiões.',
        'Pôr o fio vertical num contêiner flex, para ele esticar à altura das colunas.',
      ]}
      donts={[
        'Empilhar dois Rule para imitar o duplo: use variant="double".',
        'Usar o fio como espaçamento: para isso há os tokens de --ujn-spacing-*.',
        'Pintar o fio com uma cor própria: a tinta é um token por tema.',
        'Usar o fio vertical fora de um contêiner com altura.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A tinta do jornal acompanha data-ujn-theme."
    />
    <UjnDocThemeSwitcher surface="card">
      {() => (
        <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 480 }}>
          <Rule variant="double" />
          <Rule variant="thick" />
          <Rule variant="thin" />
          <Rule variant="thin" tone="ink" />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="Rule"
      rows={[
        { name: 'variant', type: "'thin' | 'thick' | 'double'", default: "'thin'", description: 'Espessura: 1px, 3px ou o fio duplo de 6px.' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Direção do fio.' },
        { name: 'decorative', type: 'boolean', default: 'true', description: 'Decorativo (aria-hidden); com false vira role="separator".' },
        { name: 'tone', type: "'subtle' | 'ink'", default: "'subtle'", description: 'Cor do fio thin: divisor de lista ou tinta do jornal.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos (className, style, data-*).' },
      ]}
    />
    <UjnDocPropsTable
      title="Tipos públicos"
      rows={[
        { name: 'UjnRuleVariant', type: "'thin' | 'thick' | 'double'", description: 'As três espessuras.' },
        { name: 'UjnRuleOrientation', type: "'horizontal' | 'vertical'", description: 'As duas direções.' },
        { name: 'UjnRuleTone', type: "'subtle' | 'ink'", description: 'Os dois tons do fio fino.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Rule> = {
  title: 'Unoojornal/Componentes/Rule',
  component: Rule,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['thin', 'thick', 'double'], description: 'Espessura do fio.' },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'], description: 'Direção do fio.' },
    decorative: { control: 'boolean', description: 'Decorativo (aria-hidden) ou separador anunciado.' },
    tone: { control: 'radio', options: ['subtle', 'ink'], description: 'Cor do fio thin.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    variant: 'double',
    orientation: 'horizontal',
    decorative: true,
    tone: 'subtle',
  },
};

export default meta;

type Story = StoryObj<typeof Rule>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <RuleDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Rule',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} surface="card" padding={40} align="stretch">
      <div style={{ display: 'flex', width: '100%', height: args.orientation === 'vertical' ? 120 : undefined, justifyContent: 'center' }}>
        <Rule {...args} />
      </div>
    </UjnDocStage>
  ),
};

/**
 * Cabeçalho da publicação: o fio duplo sob o nome e o fino sob a navegação.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial: cabeçalho da publicação',
  render: () => (
    <UjnDocStage surface="card" padding={40}>
      <MastheadSample />
    </UjnDocStage>
  ),
};

/**
 * As três espessuras.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UjnDocStage direction="column" align="stretch" gap={20}>
      {VARIANTS.map(({ variant, label }) => (
        <div key={variant}>
          <Label>{label}</Label>
          <Rule variant={variant} />
        </div>
      ))}
    </UjnDocStage>
  ),
};

/**
 * As espessuras comparadas lado a lado, nas duas direções.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="Horizontais" direction="column" align="stretch" gap={16}>
        {VARIANTS.map(({ variant }) => (
          <Rule key={variant} variant={variant} />
        ))}
      </UjnDocStage>
      <UjnDocStage label="Verticais" align="flex-start">
        <ColumnsSample />
      </UjnDocStage>
    </div>
  ),
};

/**
 * Tons do fio fino e semântica.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage direction="column" align="stretch" gap={20}>
      <div>
        <Label>thin · subtle (divisor de lista)</Label>
        <Rule variant="thin" tone="subtle" />
      </div>
      <div>
        <Label>thin · ink (tinta do jornal)</Label>
        <Rule variant="thin" tone="ink" />
      </div>
      <div>
        <Label>decorative=false (role=&quot;separator&quot;)</Label>
        <Rule variant="thick" decorative={false} data-testid="separador" />
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
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="card" direction="column" align="stretch" gap={16}>
          <Rule variant="double" />
          <Rule variant="thick" />
          <Rule variant="thin" />
          <Rule variant="thin" tone="ink" />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Semântica: o fio é decorativo por padrão e vira separador anunciado com
 * `decorative={false}`.
 */
export const Semantica: Story = {
  name: 'Interação: semântica do separador',
  render: () => (
    <UjnDocStage direction="column" align="stretch" gap={16}>
      <Rule data-testid="decorativo" variant="double" />
      <Rule data-testid="anunciado" variant="thick" decorative={false} />
      <div style={{ display: 'flex', height: 48 }}>
        <Rule data-testid="vertical" orientation="vertical" decorative={false} />
      </div>
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId('decorativo')).toHaveAttribute('aria-hidden', 'true');
    await expect(canvas.getByTestId('decorativo')).not.toHaveAttribute('role');

    const announced = canvas.getByTestId('anunciado');
    await expect(announced).toHaveAttribute('role', 'separator');
    await expect(announced).toHaveAttribute('aria-orientation', 'horizontal');
    await expect(announced).not.toHaveAttribute('aria-hidden');

    await expect(canvas.getByTestId('vertical')).toHaveAttribute('aria-orientation', 'vertical');
    // Dois separadores anunciados; o decorativo fica fora da árvore de acessibilidade
    await expect(canvas.getAllByRole('separator')).toHaveLength(2);
  },
};
