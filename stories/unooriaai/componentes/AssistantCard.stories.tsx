import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AssistantCard } from '../../../src/unooriaai/components/AssistantCard';
import { Avatar, Badge, SearchInput } from '../../../src/unooriaai/components';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocAnatomy,
  UaiDocCard,
  UaiDocDecisions,
  UaiDocGrid,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocSpecs,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';
import { uaiAvatars, uaiCatalog } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente AssistantCard.
 */
const AssistantCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Catálogo"
      title="AssistantCard"
      description="Cartão de 320 × 64 com padding 12/16, gap 12, raio 12 e contorno translúcido, composto por avatar circular de 40px em --uai-bg-brand, nome em Label/MD e descrição em Body/XS. É a linha do catálogo de assistentes."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão Geral & Casos de Uso"
      description="Uma linha de catálogo com identidade, nome e resumo."
    />
    <UaiDocGrid>
      <UaiDocCard icon="🗂️" title="Catálogo de assistentes">
        O uso canônico: grade de assistentes na tela de exploração, com nome e uma linha de resumo
        das capacidades.
      </UaiDocCard>
      <UaiDocCard icon="🟣" title="Avatar de marca">
        Por padrão, um <code>Avatar</code> de 40px em <code>--uai-bg-brand</code> com a inicial. A
        prop <code>icon</code> troca por imagem ou logotipo próprio.
      </UaiDocCard>
      <UaiDocCard icon="🖱️" title="Acionável">
        Passando <code>as=&quot;button&quot;</code> ou <code>as=&quot;a&quot;</code>, o cartão ganha
        cursor, realce no hover e anel de foco — sem alterar a geometria.
      </UaiDocCard>
      <UaiDocCard icon="✂️" title="Descrição em uma linha">
        Truncada com reticências. O nome do assistente nunca é truncado.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas e tokens do componente."
    />
    <UaiDocSpecs
      component="AssistantCard"
      layout="Linha · 320 × 64"
      specs={[
        { label: 'Dimensões', value: '320 × 64' },
        { label: 'Padding', value: '12/16 · --uai-spacing-5 e -6' },
        { label: 'Gap', value: '12px · --uai-spacing-5' },
        { label: 'Raio', value: '12px · --uai-radius-lg' },
        { label: 'Contorno', value: '1px · --uai-fill-8' },
        { label: 'Avatar', value: '40px · --uai-size-avatar-lg · --uai-bg-brand' },
        { label: 'Nome', value: 'Label/MD · --uai-text-primary' },
        { label: 'Descrição', value: 'Body/XS · --uai-text-soft-50 (6,42:1 claro · 8,64:1 escuro)' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Avatar reaproveitado',
          detail:
            'O slot de identidade reutiliza o Avatar size="lg", que produz o círculo de 40px; o texto do avatar sobre --uai-bg-brand mede 4,88:1 no claro e 8,27:1 no escuro.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'Quando o cartão é renderizado como button ou âncora, o hover usa --uai-fill-2 (descrição a 5,79:1 claro e 7,71:1 escuro sobre o realce) e o foco, um anel de 2px em --uai-border-brand.',
        },
        {
          subject: 'Contorno em vez de sombra',
          detail:
            'O cartão se separa da superfície por contorno translúcido de 1px; a biblioteca é plana e a única sombra do módulo é a de sobreposição.',
        },
        {
          subject: 'Vocabulário',
          detail:
            'O cartão descreve "assistentes"; a inicial padrão do avatar é A e o texto padrão está em português.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do Componente"
      description="Avatar, coluna de conteúdo com gap de 2px, e o contorno translúcido."
    />
    <UaiDocAnatomy
      zones={[
        {
          name: 'icon',
          role: 'Slot do avatar. Nunca encolhe; por padrão um Avatar com a prop initial.',
          token: '--uai-bg-brand',
        },
        {
          name: 'name',
          role: 'Label/MD em text-primary. É a identidade do assistente.',
          token: '--uai-text-primary',
        },
        {
          name: 'description',
          role: 'Body/XS, truncada em uma linha.',
          token: '--uai-text-soft-50',
        },
        {
          name: 'Contorno',
          role: 'Fio de 1px translúcido — o mesmo tratamento do FeatureCard. A biblioteca separa cartões por contorno, não por sombra.',
          token: '--uai-fill-8',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de Variantes e Composição"
      description="Padrão, com imagem, acionável e em grade de catálogo."
    />
    <UaiDocStage label="Variações do slot de identidade" direction="column" align="flex-start">
      <AssistantCard
        name="Nome do assistente"
        description="Resumo curto das capacidades do assistente"
      />
      <AssistantCard
        name="Analista de dados"
        description="Lê planilhas, gera gráficos e explica os achados"
        icon={<Avatar size="lg" src={uaiAvatars.rafael} alt="Avatar do Analista de dados" />}
      />
      <AssistantCard
        name="Coach de escrita"
        description="Revisa textos e sugere reescritas com tom consistente"
        icon={<Avatar size="lg" tone="inverse" initials="C" />}
      />
    </UaiDocStage>
    <UaiDocStage label="Acionável — cursor, hover e anel de foco" direction="column" align="flex-start">
      <AssistantCard
        as="button"
        name="Copiloto de código"
        description="Escreve, revisa e refatora código em vários idiomas"
        initial="C"
      />
      <AssistantCard
        as="a"
        href="#catalogo"
        name="Assistente de pesquisa"
        description="Busca fontes atualizadas e cita o que encontrou"
        initial="P"
      />
    </UaiDocStage>
    <UaiDocStage label="Grade de catálogo com busca" direction="column" align="flex-start">
      <SearchInput placeholder="Buscar assistentes" block />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 12,
          width: '100%',
        }}
      >
        {uaiCatalog.map((item) => (
          <AssistantCard
            key={item.name}
            as="button"
            block
            name={item.name}
            description={item.description}
            initial={item.initial}
          />
        ))}
      </div>
    </UaiDocStage>
    <UaiDocStage label="Com selo de recurso ao lado">
      <AssistantCard
        name="Analista de dados"
        description="Lê planilhas e explica os achados"
        initial="A"
      />
      <Badge variant="primary">Novo</Badge>
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Boas Práticas"
      description="Regras de catálogo."
    />
    <UaiDocPractices
      dos={[
        'Manter a descrição em uma linha curta — ela é truncada por design.',
        'Passar as="button" ou as="a" sempre que o cartão for acionável, para ganhar foco e semântica.',
        'Usar block dentro de grades responsivas, deixando a coluna definir a largura.',
        'Preencher alt quando o slot de identidade receber uma imagem.',
      ]}
      donts={[
        'Colocar dois parágrafos de descrição: a altura de 64px foi medida para uma linha.',
        'Renderizar como div e adicionar onClick — o cartão fica inacessível por teclado.',
        'Substituir o contorno translúcido por sombra: a biblioteca separa cartões por contorno.',
        'Aumentar o avatar além de 40px, o que rompe a altura de 64px.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a Temas"
      description="A superfície segue --uai-bg-primary, o contorno a escada translúcida e o avatar --uai-bg-brand (lilás no escuro)."
    />
    <UaiDocThemeSwitcher direction="column">
      {() => (
        <>
          {uaiCatalog.slice(0, 3).map((item) => (
            <AssistantCard
              key={item.name}
              name={item.name}
              description={item.description}
              initial={item.initial}
            />
          ))}
        </>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente AssistantCard."
    />
    <UaiDocPropsTable
      title="AssistantCard"
      rows={[
        { name: 'name', type: 'React.ReactNode', description: 'Nome do assistente, em Label/MD.' },
        {
          name: 'description',
          type: 'React.ReactNode',
          description: 'Descrição curta em Body/XS, truncada em uma linha.',
        },
        {
          name: 'initial',
          type: 'string',
          default: "'A'",
          description: 'Inicial exibida no avatar circular de 40px.',
        },
        {
          name: 'icon',
          type: 'React.ReactNode',
          description: 'Substitui o avatar circular por um nó arbitrário (imagem, logotipo).',
        },
        {
          name: 'as',
          type: 'React.ElementType',
          default: "'div'",
          description: "Elemento raiz — use 'button' ou 'a' quando o cartão for acionável.",
        },
        {
          name: 'href / target / rel',
          type: 'string',
          description: 'Destino, alvo e relação do link quando as renderiza uma âncora.',
        },
        {
          name: 'type / disabled',
          type: "'button' | 'submit' | 'reset' / boolean",
          description: 'Tipo e desabilitação quando as renderiza um button.',
        },
        {
          name: 'block',
          type: 'boolean',
          default: 'false',
          description: 'Ocupa toda a largura disponível em vez dos 320px.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof AssistantCard> = {
  title: 'UnooriaAI/Componentes/AssistantCard',
  component: AssistantCard,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'text', description: 'Nome do assistente.' },
    description: { control: 'text', description: 'Descrição curta das capacidades.' },
    initial: { control: 'text', description: 'Inicial exibida no avatar.' },
    icon: { control: false, description: 'Nó que substitui o avatar padrão.' },
    as: {
      control: 'select',
      options: ['div', 'button', 'a'],
      description: 'Elemento raiz renderizado.',
    },
    href: { control: 'text', description: 'Destino do link (quando as="a").' },
    target: {
      control: 'select',
      options: [undefined, '_self', '_blank'],
      description: 'Alvo de navegação (quando as="a").',
    },
    rel: { control: 'text', description: 'Relação do link (quando as="a").' },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      description: 'Tipo do botão (quando as="button").',
    },
    disabled: { control: 'boolean', description: 'Desabilita o botão (quando as="button").' },
    block: { control: 'boolean', description: 'Ocupa toda a largura do contêiner.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    name: 'Nome do assistente',
    description: 'Resumo curto das capacidades do assistente',
    initial: 'A',
    as: 'button',
    type: 'button',
    disabled: false,
    block: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof AssistantCard>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AssistantCardDocumentationPage />,
};

/**
 * Playground com todas as propriedades do AssistantCard expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do AssistantCard',
  render: (args) => (
    <UaiDocStage theme={args.theme ?? 'light'} padding={48}>
      <AssistantCard {...args} />
    </UaiDocStage>
  ),
};

/**
 * O cartão na medida de 320 × 64.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UaiDocStage align="flex-start" width={352} padding={16}>
      <AssistantCard
        name="Nome do assistente"
        description="Resumo curto das capacidades do assistente"
      />
    </UaiDocStage>
  ),
};

/**
 * Grade de catálogo com cartões acionáveis.
 */
export const Catalogo: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 12,
        maxWidth: 680,
      }}
    >
      {uaiCatalog.map((item) => (
        <AssistantCard
          key={item.name}
          as="button"
          block
          name={item.name}
          description={item.description}
          initial={item.initial}
        />
      ))}
    </div>
  ),
};
