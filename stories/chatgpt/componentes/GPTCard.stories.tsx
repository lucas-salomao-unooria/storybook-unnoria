import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GPTCard } from '../../../src/chatgpt/components/GPTCard';
import { Avatar, Badge, SearchInput } from '../../../src/chatgpt/components';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  GptDocCard,
  GptDocGrid,
  GptDocFigmaSpecs,
  GptDocPractices,
  GptDocPropsTable,
  GptDocStage,
  GptDocThemeSwitcher,
} from '../../../.storybook/components';
import { gptAvatars, gptCatalog, gptFigmaNodes } from '../fixtures';

/**
 * Página de documentação rica do componente GPTCard.
 */
const GPTCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Componentes • Catálogo"
      title="GPTCard"
      description="Réplica do componente GPTCard da página 🟡 Design system: cartão de 320 × 64 com padding 12/16, gap 12, raio 12 e contorno translúcido de 8%, composto por avatar circular de 40px em bg/brand, nome em Label/MD e descrição em Body/XS a 50% de opacidade. É a linha do catálogo da tela Explore GPTs."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Uma linha de catálogo com identidade, nome e resumo."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="🗂️" title="Catálogo de GPTs">
        O uso canônico: grade de assistentes na tela <em>Explore GPTs</em>, com nome e uma linha de
        resumo das capacidades.
      </GptDocCard>
      <GptDocCard icon="🟪" title="Avatar de marca">
        Por padrão, um <code>Avatar</code> de 40px em <code>bg/brand</code> com a inicial. A prop{' '}
        <code>icon</code> troca por imagem ou logotipo próprio.
      </GptDocCard>
      <GptDocCard icon="🖱️" title="Acionável">
        Passando <code>as="button"</code> ou <code>as="a"</code>, o cartão ganha cursor, hover a 2% e
        anel de foco — sem alterar a geometria.
      </GptDocCard>
      <GptDocCard icon="✂️" title="Descrição em uma linha">
        Truncada com reticências, como no arquivo. O nome do GPT nunca é truncado.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do componente via Plugin API."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.gptCard}
      frameName="GPTCard (componente único)"
      specs={[
        { label: 'Dimensões', value: '320 × 64' },
        { label: 'Padding', value: '12/16 · spacing/5 e spacing/6' },
        { label: 'Gap', value: '12px · spacing/5' },
        { label: 'Raio', value: '12px · radius/lg' },
        { label: 'Contorno', value: '1px · preto a 8%' },
        { label: 'Avatar', value: '40px · size/avatar-lg · bg/brand' },
      ]}
      deviations={[
        'O frame Icon abraça a largura da letra (11px) contra a altura de 40px; o componente reutiliza o Avatar size="lg", que produz o círculo de 40px com o mesmo raio do arquivo.',
        'O arquivo não publica estado de hover nem de foco. Quando o cartão é renderizado como button ou âncora, o hover usa --gpt-fill-2 e o foco um anel de 2px em border/brand. Ambos anotados no CSS.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Avatar, coluna de conteúdo com gap de 2px, e o contorno translúcido."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="⭕" title="icon">
        Slot do avatar. Nunca encolhe; por padrão um <code>Avatar</code> com a prop{' '}
        <code>initial</code>.
      </GptDocCard>
      <GptDocCard icon="🅰️" title="name">
        <code>Label/MD</code> em <code>text/primary</code>. É a identidade do assistente.
      </GptDocCard>
      <GptDocCard icon="📄" title="description">
        <code>Body/XS</code> a 50% de opacidade, truncada em uma linha.
      </GptDocCard>
      <GptDocCard icon="▭" title="Contorno">
        1px a 8% de opacidade — o mesmo tratamento do <code>FeatureCard</code>. A biblioteca separa
        cartões por contorno, não por sombra.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Composições"
      description="Padrão, com imagem, acionável e em grade de catálogo."
      barColor="#5856D6"
    />
    <GptDocStage label="Variações do slot de identidade" direction="column" align="flex-start">
      <GPTCard name="GPT Name" description="Short description of the GPT capabilities" />
      <GPTCard
        name="Data Analyst"
        description="Lê planilhas, gera gráficos e explica os achados"
        icon={<Avatar size="lg" src={gptAvatars.rafael} alt="Avatar do Data Analyst" />}
      />
      <GPTCard
        name="Writing Coach"
        description="Revisa textos e sugere reescritas com tom consistente"
        icon={<Avatar size="lg" tone="inverse" initials="W" />}
      />
    </GptDocStage>
    <GptDocStage label="Acionável — cursor, hover e anel de foco" direction="column" align="flex-start">
      <GPTCard
        as="button"
        name="Code Copilot"
        description="Escreve, revisa e refatora código em vários idiomas"
        initial="C"
      />
      <GPTCard
        as="a"
        href="#catalogo"
        name="Research Assistant"
        description="Busca fontes atualizadas e cita o que encontrou"
        initial="R"
      />
    </GptDocStage>
    <GptDocStage label="Grade de catálogo com busca" direction="column" align="flex-start">
      <SearchInput placeholder="Search GPTs" block />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 12,
          width: '100%',
        }}
      >
        {gptCatalog.map((item) => (
          <GPTCard
            key={item.name}
            as="button"
            block
            name={item.name}
            description={item.description}
            initial={item.initial}
          />
        ))}
      </div>
    </GptDocStage>
    <GptDocStage label="Com selo de recurso ao lado">
      <GPTCard name="Data Analyst" description="Lê planilhas e explica os achados" initial="D" />
      <Badge variant="primary">GPT-4</Badge>
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de catálogo."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Manter a descrição em uma linha curta — ela é truncada por design.',
        'Passar as="button" ou as="a" sempre que o cartão for acionável, para ganhar foco e semântica.',
        'Usar block dentro de grades responsivas, deixando a coluna definir a largura.',
        'Preencher alt quando o slot de identidade receber uma imagem.',
      ]}
      donts={[
        'Colocar dois parágrafos de descrição: a altura de 64px foi medida para uma linha.',
        'Renderizar como div e adicionar onClick — o cartão fica inacessível por teclado.',
        'Substituir o contorno de 8% por sombra: a biblioteca separa cartões por contorno.',
        'Aumentar o avatar além de 40px, o que rompe a altura publicada.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A superfície segue bg/primary, o contorno a escada translúcida e o avatar bg/brand."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher direction="column">
      {() => (
        <>
          {gptCatalog.slice(0, 3).map((item) => (
            <GPTCard
              key={item.name}
              name={item.name}
              description={item.description}
              initial={item.initial}
            />
          ))}
        </>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente GPTCard."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="GPTCard"
      rows={[
        { name: 'name', type: 'React.ReactNode', description: 'Nome do GPT, em Label/MD.' },
        {
          name: 'description',
          type: 'React.ReactNode',
          description: 'Descrição curta em Body/XS a 50% de opacidade, truncada em uma linha.',
        },
        {
          name: 'initial',
          type: 'string',
          default: "'G'",
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
          name: 'block',
          type: 'boolean',
          default: 'false',
          description: 'Ocupa toda a largura disponível em vez dos 320px do arquivo.',
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

const meta: Meta<typeof GPTCard> = {
  title: 'ChatGPT/Componentes/GPTCard',
  component: GPTCard,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'text', description: 'Nome do GPT.' },
    description: { control: 'text', description: 'Descrição curta das capacidades.' },
    initial: { control: 'text', description: 'Inicial exibida no avatar.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura do contêiner.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    name: 'GPT Name',
    description: 'Short description of the GPT capabilities',
    initial: 'G',
    block: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof GPTCard>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <GPTCardDocumentationPage />,
};

/**
 * Playground com todas as propriedades do GPTCard expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do GPTCard',
  render: (args) => (
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <GPTCard {...args} />
    </div>
  ),
};

/**
 * Réplica visual do componente publicado no Figma — 320 × 64.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ padding: 16, border: '1px solid #E4E8E9', borderRadius: 5, width: 352 }}>
      <GPTCard name="GPT Name" description="Short description of the GPT capabilities" />
    </div>
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
      {gptCatalog.map((item) => (
        <GPTCard
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
