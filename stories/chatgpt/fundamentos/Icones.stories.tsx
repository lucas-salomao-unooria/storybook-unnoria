import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon, gptIcons, gptIconNames } from '../../../src/chatgpt/components/Icon';
import type { GptIconName } from '../../../src/chatgpt/components/Icon';
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
import { gptWebClientNodes } from '../fixtures';

const SIZES: (16 | 24 | 32)[] = [16, 24, 32];

/**
 * Célula de um ícone na grade do catálogo.
 */
const IconCell: React.FC<{ name: GptIconName }> = ({ name }) => {
  const definition = gptIcons[name];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: 16,
        borderRadius: 12,
        border: '1px solid var(--gpt-fill-8)',
        backgroundColor: 'var(--gpt-bg-primary)',
      }}
    >
      <Icon name={name} size={32} />
      <code style={{ fontSize: 12, color: 'var(--gpt-text-primary)' }}>{name}</code>
      <span style={{ fontSize: 11, color: 'var(--gpt-text-soft-50)' }}>
        {definition.figmaName} · {definition.viewBox.replace('0 0 ', '')}
      </span>
    </div>
  );
};

/**
 * Página de documentação rica da biblioteca de ícones.
 */
const IconesDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Fundamentos • Iconografia"
      title="Ícones"
      description="Treze vetores literais exportados da tela New chat - V1 - A da página 🟪 ChatGPT UI Kit. Cada atributo d é o export SVG do nó, com o viewBox original preservado — 16 para os alvos do compositor, 24 para as linhas da barra lateral e 32 para os cabeçalhos de coluna. Nenhum foi normalizado para 24 × 24."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Por que existe uma biblioteca vetorial além dos glifos tipográficos."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="🧭" title="Duas iconografias, uma marca">
        A página <code>🟡 Design system</code> de fato não publica ícones — seus componentes usam
        caracteres tipográficos, e é isso que <code>gptGlyphs</code> registra. Estes treze vetores
        vêm de outra superfície do mesmo arquivo: as telas do <code>🟪 ChatGPT UI Kit</code>.
      </GptDocCard>
      <GptDocCard icon="📐" title="viewBox preservado">
        Os glifos foram desenhados em três grades distintas. Normalizar todos para 24 × 24
        deformaria os de 16 e os de 32, então cada um mantém o <code>viewBox</code> do nó e a prop{' '}
        <code>size</code> governa a aresta renderizada.
      </GptDocCard>
      <GptDocCard icon="🎨" title="currentColor">
        O arquivo pinta cada glifo com a cor do contexto — preto nas linhas, branco sobre o botão
        de nova conversa, preto a 40% no envio. O preenchimento virou{' '}
        <code>currentColor</code> para que um único vetor sirva aos três.
      </GptDocCard>
      <GptDocCard icon="♿" title="Decorativo por padrão">
        Sem <code>title</code>, o ícone recebe <code>aria-hidden</code> — o correto ao lado de um
        rótulo. Com <code>title</code>, vira <code>role=&quot;img&quot;</code> com nome acessível.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Vetores lidos nó a nó via Plugin API e exportados como SVG literal."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptWebClientNodes.screenLight}
      frameName="New chat - V1 - A (681:2796)"
      specs={[
        { label: 'Total de ícones', value: '13 vetores literais' },
        { label: 'viewBox 16', value: 'microphone · image · paperPlaneRight · add' },
        { label: 'viewBox 24', value: 'chatText · trash · sun · user · arrowSquareOut · signOut' },
        { label: 'viewBox 32', value: 'chats · stars · shieldWarning' },
        { label: 'Formas', value: '1 caminho por glifo, exceto stars (2)' },
        { label: 'Preenchimento', value: 'currentColor (literal do arquivo: preto)' },
      ]}
      deviations={[
        'A página `🟡 Design system` não publica ícones — o registro `gptGlyphs` continua sendo a iconografia daquela página, e estes vetores NÃO a substituem. São duas superfícies do mesmo arquivo, com iconografias diferentes.',
        'O `paperPlaneRight` é exportado com `fill-opacity="0.4"` porque a instância de origem está a 40% de opacidade — o alvo de envio em repouso. O vetor foi registrado sem opacidade e o valor virou responsabilidade do CSS do Composer.',
        'O `add` é exportado com preenchimento branco porque a instância vive sobre o botão preto de nova conversa. O preenchimento literal foi trocado por `currentColor`.',
        'O `viewBox` é o do contorno da instância no arquivo, e não uma caixa canônica de 24 × 24. Os treze glifos são quadrados, então `size` mapeia direto para largura e altura.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Catálogo Completo"
      description="Os treze glifos, com o nome da camada e o viewBox de origem."
      barColor="#5856D6"
    />
    <GptDocGrid min={180}>
      {gptIconNames.map((name) => (
        <IconCell key={name} name={name} />
      ))}
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Tamanhos"
      description="Os três degraus publicados pelo componente Icon do Figma."
      barColor="#5856D6"
    />
    {SIZES.map((size) => (
      <GptDocStage key={size} label={`Size=${size} — ${size} × ${size}px`}>
        {gptIconNames.map((name) => (
          <Icon key={name} name={name} size={size} />
        ))}
      </GptDocStage>
    ))}

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de uso da biblioteca vetorial."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Usar os três degraus publicados — 16 nos alvos do compositor, 24 nas linhas e 32 nos cabeçalhos de coluna.',
        'Deixar o ícone decorativo quando houver rótulo visível ao lado; informar title apenas quando o ícone for a única pista.',
        'Controlar a cor pelo texto do contêiner, já que o preenchimento é currentColor.',
        'Exportar do Figma e colar o atributo d sem edição ao acrescentar um glifo novo.',
      ]}
      donts={[
        'Normalizar o viewBox para 24 × 24 — os glifos de 16 e 32 foram desenhados em outra grade.',
        'Desenhar à mão ou substituir por outra biblioteca de ícones.',
        'Usar estes vetores no lugar dos glifos tipográficos dos componentes da página 🟡 Design system.',
        'Fixar a cor no atributo fill do caminho, o que quebraria a troca de tema.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Os vetores herdam a cor do texto e acompanham a troca de tema sem um segundo ativo."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher>
      {() => (
        <>
          {gptIconNames.slice(0, 8).map((name) => (
            <Icon key={name} name={name} size={24} />
          ))}
        </>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente Icon."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="Icon"
      rows={[
        {
          name: 'name',
          type: 'GptIconName',
          description:
            'Nome do ícone no registro gptIcons. Os treze nomes estão em gptIconNames.',
        },
        {
          name: 'size',
          type: '16 | 24 | 32 | number',
          default: '24',
          description:
            'Aresta do alvo quadrado em pixels. Os três degraus publicados são 16, 24 e 32.',
        },
        {
          name: 'title',
          type: 'string',
          description:
            'Rótulo acessível. Quando informado, o ícone expõe role="img" com um <title>; quando omitido, recebe aria-hidden.',
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

const meta: Meta<typeof Icon> = {
  title: 'ChatGPT/Fundamentos/Ícones',
  component: Icon,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'select', options: gptIconNames, description: 'Ícone do registro.' },
    size: { control: { type: 'range', min: 12, max: 64, step: 2 }, description: 'Aresta em px.' },
    title: { control: 'text', description: 'Rótulo acessível.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    name: 'chats',
    size: 32,
    title: '',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

/**
 * Documentação rica e completa da biblioteca de ícones.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <IconesDocumentationPage />,
};

/**
 * Playground com todas as propriedades do Icon expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Icon',
  render: (args) => (
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        color: args.theme === 'dark' ? '#FFFFFF' : '#000000',
        backgroundColor: args.theme === 'dark' ? '#333333' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <Icon {...args} title={args.title || undefined} />
    </div>
  ),
};

/**
 * Réplica dos ícones exatamente como o arquivo os aplica na tela.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 24,
        border: '1px solid #E4E8E9',
        borderRadius: 5,
      }}
    >
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <Icon name="chats" size={32} />
        <Icon name="stars" size={32} />
        <Icon name="shieldWarning" size={32} />
        <span style={{ fontSize: 12, color: '#617379' }}>Cabeçalhos de coluna · 32px</span>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Icon name="chatText" size={24} />
        <Icon name="trash" size={24} />
        <Icon name="sun" size={24} />
        <Icon name="user" size={24} />
        <Icon name="arrowSquareOut" size={24} />
        <Icon name="signOut" size={24} />
        <span style={{ fontSize: 12, color: '#617379' }}>Linhas da barra lateral · 24px</span>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Icon name="microphone" size={16} />
        <Icon name="image" size={16} />
        <Icon name="paperPlaneRight" size={16} />
        <Icon name="add" size={16} />
        <span style={{ fontSize: 12, color: '#617379' }}>Alvos do compositor · 16px</span>
      </div>
    </div>
  ),
};

/**
 * Catálogo completo dos treze glifos.
 */
export const Catalogo: Story = {
  name: 'Catálogo Completo',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 16,
      }}
    >
      {gptIconNames.map((name) => (
        <IconCell key={name} name={name} />
      ))}
    </div>
  ),
};
