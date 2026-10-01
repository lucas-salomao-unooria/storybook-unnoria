import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import { AgentAvatar } from '../../../src/unooria/components/AgentAvatar';
import { Avatar } from '../../../src/unooria/components/Avatar';
import type { UnooriaTheme } from '../../../src/unooria/tokens';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';
import { AlternadorDeTema, Cartao, Grade, Palco, Praticas, TabelaDeProps } from './agente/docKit';

const TAMANHOS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const PIXELS: Record<(typeof TAMANHOS)[number], number> = { xs: 32, sm: 40, md: 48, lg: 72, xl: 100 };

const Tamanhos: React.FC<{ tema?: UnooriaTheme }> = ({ tema = 'light' }) => (
  <>
    {TAMANHOS.map((t) => (
      <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <AgentAvatar size={t} theme={tema} />
        <code style={{ fontSize: 12, color: tema === 'dark' ? 'var(--unooria-color-neutraldark-900)' : 'var(--unooria-color-neutral-700)' }}>
          {t} · {PIXELS[t]}px
        </code>
      </div>
    ))}
  </>
);

const AgentAvatarDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<UnooriaTheme>('light');
  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Agente de IA do professor"
        title="AgentAvatar"
        description="O rosto do agente de IA do professor: o mascote — a chama lilás com o símbolo do infinito da Unooria no peito — embutido no pacote, na escala de tamanhos do Avatar. É o único bitmap do DS que chega pelo pacote junto com o Logo: é identidade da marca, e o produto não hospeda nem informa a imagem."
      />

      <UnooriaDocSectionHeader title="1. Visão Geral & Casos de Uso" description="Onde o mascote aparece." />
      <Grade>
        <Cartao icone="💬" titulo="Na conversa">
          O <code>ChatMessage</code> do agente usa o <code>xs</code> (32px) ao lado de cada resposta.
        </Cartao>
        <Cartao icone="🪟" titulo="No painel">
          O cabeçalho do <code>ChatPanel</code> usa o <code>sm</code> (40px), decorativo — o título já diz quem é.
        </Cartao>
        <Cartao icone="🔘" titulo="No botão">
          O <code>ChatLauncher</code> estica o <code>md</code> até 56px dentro do círculo de 64px.
        </Cartao>
        <Cartao icone="🚫" titulo="O que ele não é">
          Não é avatar de pessoa: sem iniciais, status, selo nem remover. Para gente, o <code>Avatar</code>.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Design próprio; o bitmap vem do dono do produto."
      />
      <Grade>
        <Cartao icone="🖼️" titulo="O bitmap">
          Original de 1254 × 1254px (843 KB, fundo cinza <code>#F7F7F7</code>). Recortado para transparência e
          reduzido a um busto quadrado (chama, rosto, mãos e tablet) em <strong>WebP de 128px (4,9 KB)</strong> e{' '}
          <strong>256px (11,5 KB)</strong>. O de 128px serve do <code>xs</code> ao <code>md</code>; o de 256px, o{' '}
          <code>lg</code> e o <code>xl</code>. Scripts: <code>scripts/recortar-mascote-agente.py</code> e{' '}
          <code>scripts/embutir-mascote-agente.mjs</code>.
        </Cartao>
        <Cartao icone="⚖️" titulo="Exceção declarada à regra de bitmap">
          A seção 1.2 do AGENTS.md proíbe bitmap no pacote. O mascote é a exceção (com o <code>Logo</code>), por
          decisão do dono do produto: o avatar do agente é identidade da marca. O custo é peso — ~22 KB de base64 em
          cada formato do JS —, por isso o WebP otimizado. O <code>.d.ts</code> não carrega o literal (o tipo é{' '}
          <code>string</code>).
        </Cartao>
        <Cartao icone="🧩" titulo="Componente próprio, não variante do Avatar">
          Composição sobre o <code>Avatar</code>: o base64 só entra no bundle de quem importa o{' '}
          <code>AgentAvatar</code>. Uma variante levaria o mascote a toda tela com a foto de uma pessoa.
        </Cartao>
        <Cartao icone="🎨" titulo="Disco">
          Claro: <code>brandpurple-100</code> com fio <code>brandpurple-200</code>. Escuro: <code>brandpurple-800</code>{' '}
          com fio <code>brandpurple-600</code>. O desenho usa <code>object-fit: contain</code>: a chama não é cortada no
          topo.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="3. Anatomia do Componente" description="Três camadas, todas do Avatar." />
      <Grade>
        <Cartao icone="1" titulo="Disco">O <code>__inner</code> do <code>Avatar</code>, com as cores do agente.</Cartao>
        <Cartao icone="2" titulo="Desenho">
          A <code>&lt;img&gt;</code> com <code>alt</code> “Agente de IA do professor”.
        </Cartao>
        <Cartao icone="3" titulo="Decorativo">
          Com <code>decorative</code>, a raiz leva <code>aria-hidden</code>: o leitor de tela não diz o nome duas vezes.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="4. Matriz de Variantes, Tamanhos e Estados" description="Os cinco tamanhos do Avatar." />
      <Palco rotulo="Tamanhos, com uma pessoa (Avatar md) para comparar" direcao="row">
        <Tamanhos />
        <Avatar name="Lucas Salomão" size="md" />
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso do mascote." />
      <Praticas
        fazer={[
          'Usar decorative quando o nome do agente está escrito ao lado.',
          'Chamá-lo de “agente de IA do professor” no alt e nos textos.',
          'Usar xs na conversa e sm no cabeçalho.',
        ]}
        evitar={[
          'Chamá-lo de “assistente”, “guia” ou “chatbot” em texto visível.',
          'Trocar o desenho por prop ou por URL: ele vem do pacote.',
          'Usar o mascote como avatar de pessoa, ou uma foto como avatar do agente.',
        ]}
      />

      <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Claro e escuro, em tempo real." />
      <AlternadorDeTema tema={tema} aoMudar={setTema} />
      <Palco rotulo={`Tema ${tema === 'light' ? 'claro' : 'escuro'}`} tema={tema} direcao="row">
        <Tamanhos tema={tema} />
      </Palco>

      <UnooriaDocSectionHeader title="7. Referência Completa de Props da API" description="Contrato público do AgentAvatar." />
      <TabelaDeProps
        linhas={[
          { nome: 'size', tipo: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", padrao: "'md'", descricao: 'Tamanho, na escala do Avatar (32/40/48/72/100px).' },
          { nome: 'alt', tipo: 'string', padrao: "'Agente de IA do professor'", descricao: 'Texto alternativo do desenho.' },
          { nome: 'decorative', tipo: 'boolean', padrao: 'false', descricao: 'Tira o avatar da árvore acessível (aria-hidden).' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Cor do disco.' },
          { nome: '...rest', tipo: 'HTMLAttributes<HTMLDivElement>', descricao: 'Vão à raiz (o Avatar).' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof AgentAvatar> = {
  title: 'Plataforma Unooria/Componentes/AgentAvatar',
  component: AgentAvatar,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'radio', options: [...TAMANHOS], description: 'Tamanho, na escala do Avatar.' },
    alt: { control: 'text', description: 'Texto alternativo do desenho.' },
    decorative: { control: 'boolean', description: 'Tira o avatar da árvore acessível.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    size: 'lg',
    alt: 'Agente de IA do professor',
    decorative: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof AgentAvatar>;

/** Documentação rica e completa do componente. */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AgentAvatarDocumentationPage />,
};

/** Playground com todas as propriedades. */
export const Playground: Story = {
  name: '🕹️ 1. Playground do AgentAvatar',
  render: (args) => (
    <Palco rotulo="AgentAvatar" tema={args.theme} largura="fit-content">
      <AgentAvatar {...args} />
    </Palco>
  ),
};

/** Os cinco tamanhos, nos dois temas. */
export const TodasVariantes: Story = {
  name: '🎨 Todas as Variantes',
  render: () => (
    <>
      <Palco rotulo="Claro" direcao="row">
        <Tamanhos />
      </Palco>
      <Palco rotulo="Escuro" tema="dark" direcao="row">
        <Tamanhos tema="dark" />
      </Palco>
    </>
  ),
};

/**
 * As garantias: o desenho carrega do pacote (sem rede), o bitmap de 128px serve
 * o md e o de 256px o xl, o alt padrão é o nome do agente e o decorativo sai
 * da árvore acessível.
 */
export const Estados: Story = {
  render: () => (
    <Palco rotulo="Com nome, decorativo e grande" direcao="row">
      <AgentAvatar size="md" data-testid="com-nome" />
      <AgentAvatar size="md" decorative data-testid="decorativo" />
      <AgentAvatar size="xl" data-testid="grande" />
    </Palco>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    // Só o que não é decorativo aparece como imagem, com o nome do agente.
    const imagens = tela.getAllByRole('img', { name: 'Agente de IA do professor' });
    await expect(imagens).toHaveLength(2);

    const decorativo = tela.getByTestId('decorativo');
    await expect(decorativo).toHaveAttribute('aria-hidden', 'true');

    // O desenho vem embutido (data URI WebP) e decodifica: 128px no md, 256px no xl.
    const imgMd = tela.getByTestId('com-nome').querySelector('img') as HTMLImageElement;
    const imgXl = tela.getByTestId('grande').querySelector('img') as HTMLImageElement;
    await expect(imgMd.src.startsWith('data:image/webp;base64,')).toBe(true);
    await waitFor(() => expect(imgMd.naturalWidth).toBe(128));
    await waitFor(() => expect(imgXl.naturalWidth).toBe(256));
  },
};
