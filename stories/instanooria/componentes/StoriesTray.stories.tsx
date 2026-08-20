import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StoriesTray } from '../../../src/instanooria/components/StoriesTray';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaStoryItems, instaHighlightItems } from '../fixtures';

/**
 * Página de documentação rica do componente StoriesTray.
 */
const StoriesTrayDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Stories"
      title="StoriesTray"
      description="Faixa horizontal rolável exibida logo abaixo da barra superior do Feed. Reproduz o frame “Stories” de 375 × 98px do Figma, incluindo o divisor hairline na base e a rolagem sem barra visível característica do iOS. A mesma faixa, sem borda e com anéis neutros, forma os destaques do perfil."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Dois contextos, um componente, configurações distintas."
    />
    <InstaDocGrid>
      <InstaDocCard icon="📰" title="Bandeja do Feed">
        Com <code>bordered</code>, altura mínima de 98px e itens em estados <code>live</code> /{' '}
        <code>unseen</code> / <code>seen</code>.
      </InstaDocCard>
      <InstaDocCard icon="👤" title="Destaques do perfil">
        Com <code>bordered=false</code> e todos os itens em <code>seen</code>, precedidos do atalho{' '}
        <code>add</code>. Nenhum componente novo é necessário.
      </InstaDocCard>
      <InstaDocCard icon="🖱️" title="Rolagem invisível">
        A barra de rolagem é ocultada em todos os navegadores, preservando a estética do iOS sem
        impedir o gesto de arrastar.
      </InstaDocCard>
      <InstaDocCard icon="🧩" title="Aberto à composição">
        Aceita <code>items</code> para o caminho declarativo ou <code>children</code> quando a faixa
        precisar de células customizadas.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas da faixa lidas dos frames Stories e Account Info."
    />
    <InstaDocFigmaSpecs
      nodeId="0:1694"
      frameName="Instagram Main → Stories"
      specs={[
        { label: 'Altura no Feed', value: '98px' },
        { label: 'Altura no perfil', value: '83px' },
        { label: 'Padding lateral', value: '10px' },
        { label: 'Gap entre células', value: '20px' },
        { label: 'Divisor', value: 'hairline inferior' },
        { label: 'Rolagem', value: 'horizontal, sem barra' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Região rolável com rótulo acessível, contendo N células StoryBubble."
    />
    <InstaDocStage label="Bandeja do Feed (375px)" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <StoriesTray items={instaStoryItems} />
      </div>
    </InstaDocStage>

    <InstaDocStage label="Destaques do perfil (sem borda, anéis neutros)" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <StoriesTray items={instaHighlightItems} bordered={false} avatarSize={56} ariaLabel="Destaques" />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes"
      description="Configurações de borda, diâmetro e volume de conteúdo."
    />
    <InstaDocStage label="Com e sem divisor" align="flex-start" padding={0}>
      <div style={{ width: 375, display: 'grid', gap: 24 }}>
        <StoriesTray items={instaStoryItems.slice(0, 4)} />
        <StoriesTray items={instaStoryItems.slice(0, 4)} bordered={false} />
      </div>
    </InstaDocStage>

    <InstaDocStage label="Diâmetros de avatar" align="flex-start" padding={0}>
      <div style={{ width: 375, display: 'grid', gap: 16 }}>
        {[48, 56, 64].map((size) => (
          <StoriesTray
            key={size}
            items={instaStoryItems.slice(0, 4)}
            avatarSize={size}
            bordered={false}
          />
        ))}
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de uso verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Colocar o próprio usuário na primeira posição da bandeja do Feed.',
        'Usar bordered={false} nos destaques do perfil, que já ficam dentro de um bloco.',
        'Fornecer ariaLabel específico quando houver mais de uma faixa na mesma tela.',
        'Deixar a última célula parcialmente visível para sinalizar que há mais conteúdo.',
      ]}
      donts={[
        'Quebrar as células em duas linhas: a faixa é sempre horizontal.',
        'Exibir barra de rolagem visível na faixa.',
        'Misturar destaques permanentes e stories efêmeros na mesma bandeja.',
        'Ultrapassar 98px de altura no Feed, o que desloca o primeiro post.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A faixa acompanha a superfície primary e o divisor troca de cor automaticamente."
    />
    <InstaDocThemeSwitcher padding={0}>
      {(activeTheme) => (
        <div style={{ width: 375 }}>
          <StoriesTray items={instaStoryItems} theme={activeTheme} />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente StoriesTray."
    />
    <InstaDocPropsTable
      title="StoriesTray"
      rows={[
        {
          name: 'items',
          type: 'InstaStoryItem[]',
          default: '[]',
          description: 'Itens renderizados. Ignorado quando children é informado.',
        },
        {
          name: 'avatarSize',
          type: 'number',
          default: '56',
          description: 'Diâmetro do recorte interno de cada avatar.',
        },
        {
          name: 'bordered',
          type: 'boolean',
          default: 'true',
          description: 'Exibe o divisor hairline na base da faixa.',
        },
        {
          name: 'ariaLabel',
          type: 'string',
          default: "'Stories'",
          description: 'Rótulo acessível da região.',
        },
        {
          name: 'onSelect',
          type: '(item: InstaStoryItem, index: number) => void',
          description: 'Callback disparado ao selecionar um item.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Conteúdo customizado que substitui a renderização de items.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="8. Estrutura de InstaStoryItem"
      description="Formato de cada item aceito pela prop items."
    />
    <InstaDocPropsTable
      title="InstaStoryItem"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único do item.' },
        { name: 'username', type: 'string', description: 'Nome exibido abaixo do avatar.' },
        { name: 'avatarSrc', type: 'string', description: 'URL da imagem do avatar.' },
        { name: 'initials', type: 'string', description: 'Iniciais exibidas sem imagem.' },
        {
          name: 'state',
          type: "'unseen' | 'seen' | 'live' | 'add'",
          default: "'unseen'",
          description: 'Estado do story.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof StoriesTray> = {
  title: 'Instanooria/Componentes/StoriesTray',
  component: StoriesTray,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Itens renderizados na bandeja.' },
    avatarSize: {
      control: { type: 'range', min: 40, max: 80, step: 2 },
      description: 'Diâmetro de cada avatar em pixels.',
    },
    bordered: { control: 'boolean', description: 'Exibe o divisor hairline na base.' },
    ariaLabel: { control: 'text', description: 'Rótulo acessível da região.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    items: instaStoryItems,
    avatarSize: 56,
    bordered: true,
    ariaLabel: 'Stories',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof StoriesTray>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <StoriesTrayDocumentationPage />,
};

/**
 * Playground com todas as propriedades da StoriesTray expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da StoriesTray',
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{
        width: 375,
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #E4E8E9',
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
      }}
    >
      <StoriesTray {...args} />
    </div>
  ),
};

/**
 * Réplica da bandeja do frame oficial "Instagram Main" do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <StoriesTray items={instaStoryItems} />
    </div>
  ),
};

/**
 * Faixa de destaques do perfil, sem divisor e com anéis neutros.
 */
export const DestaquesDoPerfil: Story = {
  render: () => (
    <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <StoriesTray items={instaHighlightItems} bordered={false} ariaLabel="Destaques" />
    </div>
  ),
};
