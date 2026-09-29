import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocAnatomy,
  UncDocPractices,
  UncDocPropsTable,
  UncDocThemeSwitcher,
  type UncDocTheme,
} from '../../../.storybook/components';
import { Button, MediaViewer } from '../../../src/unoochat';
import { uncSamplePhoto } from '../fixtures';

const BAR = '#716C98';

/**
 * Um comunicado DESENHADO a partir do texto: a mídia que um produto sem arquivo
 * de imagem ainda consegue mostrar.
 */
const ComunicadoDesenhado: React.FC = () => (
  <div
    style={{
      aspectRatio: '4 / 3',
      padding: 16,
      background: 'var(--unc-color-surface-elevated)',
      color: 'var(--unc-color-text-primary)',
      fontFamily: 'var(--unc-font-sans)',
      fontSize: 14,
      lineHeight: 1.4,
    }}
  >
    <strong style={{ display: 'block', marginBottom: 8 }}>COMUNICADO Nº 14</strong>
    Entrada das turmas do 5º ano pelo portão lateral durante a visita ao museu.
  </div>
);

/**
 * O visualizador aberto sobre um contêiner de 375px, com reabertura, no tema
 * informado.
 */
const VisualizadorEmTela: React.FC<{ theme?: UncDocTheme }> = ({ theme = 'light' }) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      data-unc-theme={theme}
      style={{ position: 'relative', width: 375, height: 560, background: 'var(--unc-color-surface-canvas)' }}
    >
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
      badgeBrand="Unoochat"
      category="Componentes • Extensões"
      title="MediaViewer"
      description="Visualizador de mídia em tela cheia: barra com a seta de voltar, a mídia ampliada e o texto de apoio abaixo dela. Extensão do módulo, sem par na Plataforma Unooria, que compõe a superfície base, a barra de título e o texto primário dos dois temas."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🔍" title="Ler de perto">
        Um comunicado ou uma prévia de link aberta em tela cheia, com o texto por inteiro.
      </UncDocCard>
      <UncDocCard icon="📝" title="Texto de apoio">
        <code>caption</code> carrega a transcrição: a mídia é lida por quem não a enxerga.
      </UncDocCard>
      <UncDocCard icon="⬅️" title="Voltar, não fechar">
        A seta é o glifo <code>back</code> (<code>arrow_back</code>) do registro. Sair de uma
        tela cheia no celular é voltar, e a barra oferece exatamente esse gesto, sem um glifo de
        fechar à parte.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="MediaViewer"
      layout="Tela cheia · barra de 52px"
      specs={[
        { label: 'Fundo', value: '--unc-color-surface-base' },
        { label: 'Barra', value: '--unc-color-surface-appbar · 52px (--unc-appbar-title-height)' },
        { label: 'Seta', value: 'glifo back 20px · --unc-color-icon-muted · alvo de 44px' },
        { label: 'Título', value: 'Open Sans 600 · 18px' },
        { label: 'Legenda', value: 'Open Sans 400 · 14px · --unc-color-text-primary' },
        { label: 'Raio da mídia', value: '5px (--unc-radius-m)' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Extensão sem par na Unooria',
          detail:
            'a Plataforma Unooria não tem visualizador de mídia em tela cheia. O fundo é a superfície base do módulo (`#EFEEF5` no claro, `#080922` no escuro), a barra reaproveita a altura do título da app bar e a seta é o glifo `back` do registro.',
        },
        {
          subject: 'Fundo por tema',
          detail:
            'a superfície base é o degrau mais afastado da barra em cada tema: lavanda no claro, roxo profundo no escuro. A mídia se destaca pelo contraste com ela, e a legenda mantém o texto primário do tema (acima de 12:1 nos dois).',
        },
        {
          subject: 'Foco preso e ESC',
          detail:
            'o painel usa `role="dialog"` com `aria-modal`, nomeado pelo título via `aria-labelledby`, prende o foco e fecha no ESC pelo mesmo `useModalFocus` da folha inferior.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Barra', role: 'Seta de voltar, título e subtítulo.', token: '--unc-color-surface-appbar · --unc-appbar-title-height' },
        { name: 'Mídia', role: 'Imagem ou mídia desenhada, raio de 5px.', token: '--unc-radius-m' },
        { name: 'Legenda', role: 'Texto de apoio, como a transcrição.', token: '--unc-color-text-primary' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Em contexto" description="A seta e o ESC fecham; o botão reabre. Um contêiner por tema." />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
      <VisualizadorEmTela theme="light" />
      <VisualizadorEmTela theme="dark" />
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Renderizar dentro do contêiner do dispositivo (position: relative).',
        'Passar a transcrição em caption sempre que a mídia tiver texto.',
        'Usar o título para quem enviou e o subtítulo para o arquivo.',
      ]}
      donts={[
        'Trocar a seta de voltar por um X desenhado à mão.',
        'Deixar a mídia com texto sem transcrição.',
        'Usar como diálogo de confirmação: esse é o Dialog.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: fundo, barra, título e legenda acompanham."
    />
    <UncDocThemeSwitcher surface="canvas">
      {(theme) => (
        <div
          data-unc-theme={theme}
          style={{ position: 'relative', width: 375, height: 420, overflow: 'hidden' }}
        >
          <MediaViewer
            title="Coordenação Pedagógica"
            subtitle="comunicado_oficial.jpg"
            caption="Entrada das turmas do 5º ano pelo portão lateral durante a visita ao museu."
          >
            <ComunicadoDesenhado />
          </MediaViewer>
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
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
  title: 'Unoochat/Componentes/MediaViewer',
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
        <img src={uncSamplePhoto} alt="Fotografia enviada" style={{ width: '100%', display: 'block' }} />
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
