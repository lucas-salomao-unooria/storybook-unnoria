import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { TypingIndicator } from '../../../src/unooria/components/TypingIndicator';
import type { UnooriaTheme } from '../../../src/unooria/tokens';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';
import { AlternadorDeTema, Cartao, Grade, Palco, Praticas, TabelaDeProps } from './agente/docKit';

const Matriz: React.FC<{ tema?: UnooriaTheme }> = ({ tema = 'light' }) => (
  <>
    <TypingIndicator theme={tema} />
    <TypingIndicator theme={tema} showLabel />
    <TypingIndicator theme={tema} showLabel label="Procurando no material da rede" />
  </>
);

const TypingIndicatorDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<UnooriaTheme>('light');
  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Agente de IA do professor"
        title="TypingIndicator"
        description="“O agente de IA do professor está escrevendo”: três pontos que pulsam enquanto a resposta não começou a chegar. Com movimento reduzido, os pontos param e a frase aparece."
      />

      <UnooriaDocSectionHeader title="1. Visão Geral & Casos de Uso" description="Entre o envio e o primeiro trecho da resposta." />
      <Grade>
        <Cartao icone="⏳" titulo="Esperando a resposta">
          O <code>ChatMessage</code> do agente em <code>estado=&quot;enviando&quot;</code> e sem conteúdo mostra o
          indicador sozinho.
        </Cartao>
        <Cartao icone="🗣️" titulo="Anúncio único">
          <code>role=&quot;status&quot;</code>: o leitor de tela diz a frase uma vez, quando o indicador aparece. Os
          pontos são <code>aria-hidden</code>.
        </Cartao>
        <Cartao icone="🧘" titulo="Movimento reduzido">
          Com <code>prefers-reduced-motion: reduce</code>, sem animação: os pontos ficam parados e a frase aparece.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="2. Figma & Especificações Técnicas" description="Design próprio." />
      <Grade>
        <Cartao icone="📐" titulo="Medidas">
          Pontos de 8px com 4px entre eles, em <code>brandpurple-500</code> (<code>brandpurple-400</code> no escuro);
          frase em <code>body-xs</code> (14/20) <code>neutral-700</code>. Pulsação de 1,2s, 150ms entre pontos.
        </Cartao>
        <Cartao icone="🖥️" titulo="Server Component">Sem hook e sem função: roda no servidor.</Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="3. Anatomia do Componente" description="Pontos e frase." />
      <Grade>
        <Cartao icone="1" titulo="Pontos">Três <code>span</code> decorativos.</Cartao>
        <Cartao icone="2" titulo="Frase">
          O <code>label</code>: fora da tela por padrão; visível com <code>showLabel</code> ou movimento reduzido.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="4. Matriz de Variantes, Tamanhos e Estados" description="Só pontos, com frase e com frase própria." />
      <Palco rotulo="Claro" direcao="row">
        <Matriz />
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso do indicador." />
      <Praticas
        fazer={['Tirar o indicador quando o primeiro trecho chegar.', 'Escrever o label com o nome do agente.']}
        evitar={['Deixar o indicador junto do texto que já está chegando.', 'Dois indicadores na mesma conversa.']}
      />

      <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Claro e escuro, em tempo real." />
      <AlternadorDeTema tema={tema} aoMudar={setTema} />
      <Palco rotulo={`Tema ${tema === 'light' ? 'claro' : 'escuro'}`} tema={tema} direcao="row">
        <Matriz tema={tema} />
      </Palco>

      <UnooriaDocSectionHeader title="7. Referência Completa de Props da API" description="Contrato público do TypingIndicator." />
      <TabelaDeProps
        linhas={[
          { nome: 'label', tipo: 'string', padrao: "'O agente de IA do professor está escrevendo'", descricao: 'A frase: nome acessível e texto visível.' },
          { nome: 'showLabel', tipo: 'boolean', padrao: 'false', descricao: 'Mostra a frase ao lado dos pontos.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof TypingIndicator> = {
  title: 'Plataforma Unooria/Componentes/TypingIndicator',
  component: TypingIndicator,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'A frase.' },
    showLabel: { control: 'boolean', description: 'Mostra a frase.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    label: 'O agente de IA do professor está escrevendo',
    showLabel: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof TypingIndicator>;

/** Documentação rica e completa do componente. */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TypingIndicatorDocumentationPage />,
};

/** Playground com todas as propriedades. */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TypingIndicator',
  render: (args) => (
    <Palco rotulo="TypingIndicator" tema={args.theme} largura="fit-content">
      <TypingIndicator {...args} />
    </Palco>
  ),
};

/** As variantes nos dois temas. */
export const TodasVariantes: Story = {
  name: '🎨 Todas as Variantes',
  render: () => (
    <>
      <Palco rotulo="Claro" direcao="row">
        <Matriz />
      </Palco>
      <Palco rotulo="Escuro" tema="dark" direcao="row">
        <Matriz tema="dark" />
      </Palco>
    </>
  ),
};

/** As garantias: região de status nomeada pela frase; pontos fora da árvore acessível. */
export const Estados: Story = {
  render: () => <TypingIndicator data-testid="indicador" />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const status = tela.getByRole('status');
    await expect(status).toHaveTextContent('O agente de IA do professor está escrevendo');
    const pontos = tela.getByTestId('indicador').querySelector('.unooria-typing-indicator__dots');
    await expect(pontos).toHaveAttribute('aria-hidden', 'true');
    await expect(pontos?.children).toHaveLength(3);
  },
};
