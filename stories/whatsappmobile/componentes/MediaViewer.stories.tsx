import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  WaDocGrid,
  WaDocCard,
  WaDocFigmaSpecs,
  WaDocDeviations,
  WaDocAnatomy,
  WaDocPractices,
  WaDocPropsTable,
} from '../../../.storybook/components';
import { Button, MediaViewer } from '../../../src/whatsappmobile';
import { waSamplePhoto } from '../fixtures';

const BAR = '#0CA996';

/**
 * Um comunicado DESENHADO a partir do texto — a mídia que um produto sem arquivo
 * de imagem ainda consegue mostrar.
 */
const ComunicadoDesenhado: React.FC = () => (
  <div
    style={{
      aspectRatio: '4 / 3',
      padding: 16,
      background: 'var(--wa-color-surface-elevated)',
      color: 'var(--wa-color-text-primary)',
      fontFamily: 'var(--wa-font-sans)',
      fontSize: 13,
      lineHeight: 1.4,
    }}
  >
    <strong style={{ display: 'block', marginBottom: 8 }}>COMUNICADO Nº 14</strong>
    Entrada das turmas do 5º ano pelo portão lateral durante a visita ao museu.
  </div>
);

/**
 * O visualizador aberto sobre um contêiner de 375px, com reabertura.
 */
const VisualizadorEmTela: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ position: 'relative', width: 375, height: 560, background: 'var(--wa-color-surface-canvas)' }}>
      <div style={{ padding: 16 }}>
        <Button onClick={() => setOpen(true)}>Abrir o comunicado</Button>
      </div>
      <MediaViewer
        open={open}
        title="Coordenação Pedagógica"
        subtitle="comunicado_oficial.jpg"
        onClose={() => setOpen(false)}
        caption="Texto do comunicado: entrada das turmas do 5º ano pelo portão lateral durante a visita ao museu."
      >
        <ComunicadoDesenhado />
      </MediaViewer>
    </div>
  );
};

/**
 * Página de documentação rica do componente MediaViewer.
 */
const MediaViewerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Extensões"
      title="MediaViewer"
      description="Visualizador de mídia em tela cheia: barra com a seta de voltar, a mídia ampliada e o texto de apoio abaixo dela. Extensão: o arquivo mostra a imagem só dentro do balão."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🔍" title="Ler de perto">
        Um comunicado ou uma prévia de link aberta em tela cheia, com o texto por inteiro.
      </WaDocCard>
      <WaDocCard icon="📝" title="Texto de apoio">
        <code>caption</code> carrega a transcrição: a mídia é lida por quem não a enxerga.
      </WaDocCard>
      <WaDocCard icon="⬅️" title="Voltar, não fechar">
        A seta é o glifo <code>back</code> do arquivo. O arquivo não publica um “fechar”, e
        desenhar um seria inventar glifo.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:4043"
      frameName="Picture sent (a âncora: a imagem dentro do balão)"
      specs={[
        { label: 'Fundo', value: '#090E12 (--wa-color-surface-base)' },
        { label: 'Barra', value: '--wa-color-surface-appbar · 52px (--wa-appbar-title-height)' },
        { label: 'Seta', value: 'glifo back · --wa-color-icon-back · alvo de 44px' },
        { label: 'Legenda', value: 'PT Sans 15px · --wa-color-text-primary' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Componente sem frame',
          detail:
            'o arquivo não publica o visualizador em tela cheia. O fundo é o degrau mais escuro da escada, a barra reaproveita a altura do título da app bar e a seta é o glifo back literal.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Barra', role: 'Seta de voltar, título e subtítulo.', token: '--wa-color-surface-appbar' },
        { name: 'Mídia', role: 'Imagem ou mídia desenhada, raio de 5px.', token: '--wa-radius-m' },
        { name: 'Legenda', role: 'Texto de apoio, como a transcrição.', token: '--wa-color-text-primary' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Em contexto" description="A seta e o ESC fecham; o botão reabre." />
    <VisualizadorEmTela />

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Renderizar dentro do contêiner do dispositivo (position: relative).',
        'Passar a transcrição em caption sempre que a mídia tiver texto.',
        'Usar o título para quem enviou e o subtítulo para o arquivo.',
      ]}
      donts={[
        'Desenhar um X à mão para fechar.',
        'Deixar a mídia com texto sem transcrição.',
        'Usar como diálogo de confirmação: esse é o Dialog.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Superfícies suportadas" />
    <WaDocGrid>
      <WaDocCard icon="🌓" title="Tema único">
        Sempre sobre a superfície base: é o fundo que faz a mídia saltar.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="MediaViewer"
      rows={[
        { name: 'open', type: 'boolean', default: 'true', description: 'Visibilidade.' },
        { name: 'title', type: 'React.ReactNode', description: 'Título e nome acessível. Obrigatório.' },
        { name: 'subtitle', type: 'React.ReactNode', description: 'Linha abaixo do título.' },
        { name: 'children', type: 'React.ReactNode', description: 'A mídia ampliada. Obrigatório.' },
        { name: 'caption', type: 'React.ReactNode', description: 'Texto de apoio abaixo da mídia.' },
        { name: 'onClose', type: '() => void', description: 'Seta de voltar e ESC.' },
        { name: 'backLabel', type: 'string', default: "'Voltar'", description: 'Nome acessível da seta.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MediaViewer> = {
  title: 'Whatsapp Mobile/Componentes/MediaViewer',
  component: MediaViewer,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Visibilidade.' },
    title: { control: 'text', description: 'Título.' },
    subtitle: { control: 'text', description: 'Subtítulo.' },
    caption: { control: 'text', description: 'Texto de apoio.' },
    backLabel: { control: 'text', description: 'Nome acessível da seta.' },
    onClose: { action: 'onClose' },
  },
  args: {
    open: true,
    title: 'Coordenação Pedagógica',
    subtitle: 'foto.jpg',
    caption: 'Fotografia enviada no grupo.',
    backLabel: 'Voltar',
  },
};

export default meta;

type Story = StoryObj<typeof MediaViewer>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MediaViewerDocumentationPage />,
};

/**
 * Playground com 100% das props do MediaViewer expostas, com uma fotografia.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do MediaViewer',
  render: (args) => (
    <div style={{ position: 'relative', width: 375, height: 560 }}>
      <MediaViewer {...args}>
        <img src={waSamplePhoto} alt="Fotografia enviada" style={{ width: '100%', display: 'block' }} />
      </MediaViewer>
    </div>
  ),
};

/**
 * Mídia desenhada com transcrição.
 */
export const MidiaDesenhada: Story = {
  name: 'Mídia desenhada',
  render: () => <VisualizadorEmTela />,
};
