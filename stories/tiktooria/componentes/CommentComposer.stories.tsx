import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { CommentComposer, CommentItem, Sheet } from '../../../src/tiktooria';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocAnatomy,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocPropsTable,
  TikDocStage,
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { tikComments } from '../fixtures';

const meta: Meta<typeof CommentComposer> = {
  title: 'Tik Tooria/Componentes/CommentComposer',
  component: CommentComposer,
  parameters: { layout: 'padded' },
  argTypes: {
    placeholder: { control: 'text' },
    ariaLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    defaultValue: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    placeholder: 'Add comment...',
    ariaLabel: 'Adicionar comentário',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof CommentComposer>;


const CommentComposerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Folha"
      title="CommentComposer"
      description="Barra inferior branca de 414×83 da tela de comentários. Não há campo desenhado no arquivo: apenas o texto de reserva em Regular 15 e os dois glifos de 22px na borda direita. Os 83px incluem os 35px do indicador de home, por isso o conteúdo se alinha ao topo da barra."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="⌨️" title="Campo sem moldura">
        O arquivo não desenha caixa nem fundo: o texto de reserva flutua direto sobre o branco da barra.
      </TikDocCard>
      <TikDocCard icon="🎯" title="Dois glifos de 22px">
        Marcação publicitária e seletor de emoji, na borda direita. São os dois maiores glifos de ação do módulo.
      </TikDocCard>
      <TikDocCard icon="📐" title="Altura com indicador">
        Os 83px são os mesmos da barra de abas, e por isso o conteúdo fica no topo.
      </TikDocCard>
      <TikDocCard icon="➖" title="Fio superior">
        Sombra de raio 0 em <code>#D0D1D3</code>, igual à da barra de abas de cromo claro.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:959"
      frameName="Bottom bar — TikTok Comments"
      specs={[
        { label: 'Dimensões', value: '414 × 83' },
        { label: 'Reserva', value: 'Regular 15 · #86878B' },
        { label: 'Glifos', value: '22px' },
        { label: 'Recuo do texto', value: '18px' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Campo de entrada real',
          detail:
            'o arquivo desenha apenas um nó de texto. O componente usa um <input>, porque a barra existe para receber texto; o resultado visual é idêntico em repouso.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'ausentes no arquivo. Foi acrescentado anel de foco de 2px em --tik-color-brand-button no campo e nos dois botões.',
        },
        {
          subject: 'Sem botão de enviar',
          detail:
            'o arquivo não publica ação de envio nesta barra. Nenhuma foi acrescentada.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Barra', role: 'Superfície branca de 83px com fio superior.', token: '--tik-tabbar-height · --tik-elevation-bar-top' },
        { name: 'Campo', role: 'Entrada sem moldura, recuada 18px.', token: '--tik-font-body-*' },
        { name: 'Marcação publicitária', role: 'Glifo adSign de 22px.', token: 'glifo adSign' },
        { name: 'Emoji', role: 'Glifo emoji de 22px na borda.', token: 'glifo emoji' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Como no arquivo" surface="chrome" align="stretch" direction="column" width={414}>
      <CommentComposer />
    </TikDocStage>
    <TikDocStage label="Com valor e desabilitado" surface="chrome" align="stretch" direction="column" width={414}>
      <CommentComposer defaultValue="Que legal!" />
      <CommentComposer disabled placeholder="Comentários desativados" />
    </TikDocStage>
    <TikDocStage label="Reserva localizada" surface="chrome" align="stretch" direction="column" width={414}>
      <CommentComposer placeholder="Adicionar comentário..." ariaLabel="Adicionar comentário" />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Coloque a barra como último elemento da tela de comentários.',
        'Informe ariaLabel: o único rótulo visível é o texto de reserva.',
        'Mantenha os dois glifos de ação, na ordem do arquivo.',
      ]}
      donts={[
        'Não desenhe caixa ou fundo em volta do campo.',
        'Não acrescente botão de enviar: o arquivo não o publica.',
        'Não empilhe um HomeIndicator sob a barra.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome']} padding={0}>
      {() => (
        <div style={{ width: 414 }}>
          <CommentComposer />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="CommentComposer"
      rows={[
        {
          name: 'placeholder',
          type: "string",
          default: "Add comment...",
          description:
            'Texto de reserva.',
        },
        {
          name: 'ariaLabel',
          type: "string",
          default: "Adicionar comentário",
          description:
            'Rótulo acessível do campo.',
        },
        {
          name: 'onTagPress',
          type: "() => void",
          description:
            'Acionado ao clicar no glifo de marcação publicitária.',
        },
        {
          name: 'onEmojiPress',
          type: "() => void",
          description:
            'Acionado ao clicar no seletor de emoji.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional aplicada ao contêiner.',
        },
        {
          name: '...rest',
          type: "Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>",
          description:
            'Demais atributos são repassados ao <input>, incluindo value, onChange e disabled.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CommentComposerDocumentationPage />,
};

/**
 * Playground com 100% das props do CommentComposer expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do CommentComposer',
  render: (args) => (
    <div style={{ width: 414 }}>
      <CommentComposer {...args} />
    </div>
  ),
};

/**
 * Réplica visual da tela “TikTok Comments” do Figma, com folha e compositor.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 414,
        background: 'var(--tik-color-surface-immersive)',
        paddingTop: 40,
      }}
    >
      <Sheet ariaLabel="Comentários">
        <Sheet.Header title="579 comments" showClose />
        <Sheet.Body style={{ maxHeight: 320 }}>
          {tikComments.map((comment) => (
            <CommentItem key={comment.author} {...comment} />
          ))}
        </Sheet.Body>
      </Sheet>
      <CommentComposer />
    </div>
  ),
};

/**
 * Repouso, preenchido e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 414 }}>
      <CommentComposer />
      <CommentComposer defaultValue="Que legal!" />
      <CommentComposer disabled placeholder="Comentários desativados" />
    </div>
  ),
};
