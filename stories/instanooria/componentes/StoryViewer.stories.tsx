import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { StoryViewer } from '../../../src/instanooria/components/StoryViewer';
import { PhoneFrame } from '../../../src/instanooria/components/PhoneFrame';
import { BottomSheet } from '../../../src/instanooria/components/BottomSheet';
import { Button } from '../../../src/instanooria/components/Button';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocDeviations,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaAvatars, instaPhotos } from '../fixtures';

const MURAL = [
  { mediaSrc: instaPhotos.coffee, mediaAlt: 'Lanche novo na cantina', local: 'Cantina da escola' },
  { mediaSrc: instaPhotos.turbines, mediaAlt: 'Turbinas eólicas', local: 'Feira de ciências' },
  { mediaSrc: instaPhotos.skate, mediaAlt: 'Manobra de skate', local: 'Quadra' },
];

/**
 * O Story do Mural: zonas de toque, ficha técnica sobre a mídia e rodapé próprio.
 */
const StoryDoMural: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const [indice, setIndice] = useState(0);
  const atual = MURAL[indice];

  return (
    <StoryViewer
      theme={theme}
      mediaSrc={atual.mediaSrc}
      mediaAlt={atual.mediaAlt}
      username="jacob_w"
      avatarSrc={instaAvatars.jacob_w}
      timestamp="agora"
      segments={MURAL.length}
      currentSegment={indice + 1}
      segmentProgress={1}
      onPrev={() => setIndice((valor) => Math.max(valor - 1, 0))}
      onNext={() => setIndice((valor) => Math.min(valor + 1, MURAL.length - 1))}
      footer={
        <Button block theme={theme} variant="secondary">
          Ver o Story do colega
        </Button>
      }
    >
      <BottomSheet
        modal={false}
        theme={theme}
        maxHeight="45%"
        collapsedLabel="Ver detalhes da postagem"
        title="Ficha técnica"
      >
        <p style={{ margin: 0 }}>Onde: {atual.local}</p>
      </BottomSheet>
    </StoryViewer>
  );
};

/**
 * Página de documentação rica do componente StoryViewer.
 */
const StoryViewerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Stories"
      title="StoryViewer"
      description="Visualizador de story em tela cheia. Reproduz o frame “Instagram Story” do Figma: mídia de 375 × 667px com raio de 8px, os dois gradientes de leitura (topo e base), a barra de progresso segmentada de 2px e o composer de 43px com contorno translúcido e atalho de câmera."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Uma tela imersiva com três camadas sobrepostas à mídia."
    />
    <InstaDocGrid>
      <InstaDocCard icon="⏱️" title="Progresso segmentado">
        Um segmento por mídia do story. Segmentos anteriores ficam cheios, o atual reflete{' '}
        <code>segmentProgress</code> e os seguintes ficam vazios.
      </InstaDocCard>
      <InstaDocCard icon="🌗" title="Scrim duplo">
        Dois gradientes pretos a 30% — um no topo e outro na base — garantem contraste do texto sem
        escurecer o centro da fotografia.
      </InstaDocCard>
      <InstaDocCard icon="💬" title="Composer translúcido">
        Cápsula de 43px com contorno <code>rgba(255,255,255,0.4)</code> e raio de 21.5px, ancorando
        a resposta direta ao autor.
      </InstaDocCard>
      <InstaDocCard icon="♿" title="Progresso anunciado">
        A barra declara <code>role=&quot;progressbar&quot;</code> com{' '}
        <code>aria-valuenow</code>, comunicando a posição no story.
      </InstaDocCard>
      <InstaDocCard icon="👆" title="Zonas de toque (extensão)">
        <code>onPrev</code> e <code>onNext</code> acendem as zonas do app real — um terço à
        esquerda volta, o resto avança. São botões: Tab, Enter e Espaço funcionam.
      </InstaDocCard>
      <InstaDocCard icon="🗂️" title="Camada e rodapé (extensão)">
        <code>children</code> renderiza sobre a mídia (a ficha técnica numa{' '}
        <code>BottomSheet</code> não modal); <code>footer</code> troca o campo “Enviar mensagem”.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do frame Instagram Story."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2237"
      frameName="Instagram Story → Story"
      specs={[
        { label: 'Mídia', value: '375 × 667px · raio 8px' },
        { label: 'Segmento', value: '2px · raio 1px' },
        { label: 'Avatar do autor', value: '32px' },
        { label: 'Nome do autor', value: 'Navigation/Title · 14px' },
        { label: 'Composer', value: '271 × 43px · raio 21.5px' },
        { label: 'Barra de resposta', value: '94px de altura' },
        { label: 'Zona de voltar', value: '1/3 à esquerda (extensão)' },
        { label: 'Zona de avançar', value: '2/3 à direita (extensão)' },
      ]}
    />
    <InstaDocDeviations
      items={[
        {
          subject: 'Zonas de toque',
          detail:
            'o quadro é estático e não descreve navegação. As zonas de voltar e avançar reproduzem o app real e são botões transparentes, com o anel de foco branco do botão de fechar. Só aparecem com onPrev / onNext.',
        },
        {
          subject: 'Camada sobre a mídia',
          detail:
            'children não existe no quadro. A camada deixa o toque passar para as zonas; cada filho direto volta a recebê-lo. É onde entra a ficha técnica do Mural.',
        },
        {
          subject: 'Rodapé substituível',
          detail:
            'footer troca o campo “Enviar mensagem” (Send Message, 0:2266) por um conteúdo do produto. Compartilhar e opções continuam, se tiverem callback.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Palco com mídia e sobreposições, seguido da barra de resposta."
    />
    <InstaDocStage label="Visualizador completo dentro do PhoneFrame">
      <PhoneFrame theme="light" ariaLabel="Story de craig_love">
        <StoryViewer
          theme="light"
          mediaSrc={instaPhotos.coffee}
          mediaAlt="Café da manhã em um bistrô"
          username="craig_love"
          avatarSrc={instaAvatars.craig_love}
          timestamp="4h"
          segments={5}
          currentSegment={3}
          segmentProgress={0.6}
          onClose={() => undefined}
          onShare={() => undefined}
          onMore={() => undefined}
          onComposerClick={() => undefined}
        />
      </PhoneFrame>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Estados"
      description="Variações da barra de progresso e da quantidade de segmentos."
    />
    <InstaDocStage label="Progresso">
      {[
        { segments: 1, currentSegment: 1, progress: 0.2, label: 'Story único' },
        { segments: 5, currentSegment: 1, progress: 0.1, label: 'Primeiro segmento' },
        { segments: 5, currentSegment: 5, progress: 0.9, label: 'Último segmento' },
      ].map((state) => (
        <div key={state.label} style={{ textAlign: 'center' }}>
          <div style={{ width: 200, height: 380, borderRadius: 12, overflow: 'hidden' }}>
            <StoryViewer
              mediaSrc={instaPhotos.street}
              mediaAlt="Rua movimentada"
              username="craig_love"
              avatarSrc={instaAvatars.craig_love}
              timestamp="4h"
              segments={state.segments}
              currentSegment={state.currentSegment}
              segmentProgress={state.progress}
              onClose={() => undefined}
            />
          </div>
          <div style={{ fontSize: 12, color: '#475157', marginTop: 10 }}>{state.label}</div>
        </div>
      ))}
    </InstaDocStage>

    <InstaDocStage label="Extensões: zonas de toque, ficha técnica (BottomSheet não modal, 45%) e footer">
      <div style={{ width: 300, height: 560, borderRadius: 12, overflow: 'hidden' }}>
        <StoryDoMural />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de visualização verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Manter um segmento por mídia do story, sem agrupar.',
        'Descrever a mídia em mediaAlt — é o conteúdo principal da tela.',
        'Fornecer onClose sempre: a tela é modal e precisa de saída explícita.',
        'Usar o tema dark como padrão, já que a tela é sempre imersiva.',
      ]}
      donts={[
        'Escurecer a mídia inteira em vez de usar o scrim nas extremidades.',
        'Exibir mais de oito segmentos, que ficam ilegíveis em 375px.',
        'Colocar ações permanentes sobre o centro da mídia.',
        'Usar o StoryViewer para conteúdo que não seja efêmero.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A barra de resposta acompanha o tema; as sobreposições sobre mídia são sempre claras."
    />
    <InstaDocThemeSwitcher>
      {(activeTheme) => (
        <div style={{ width: 260, height: 460, borderRadius: 12, overflow: 'hidden' }}>
          <StoryViewer
            theme={activeTheme}
            mediaSrc={instaPhotos.coffee}
            mediaAlt="Café da manhã"
            username="craig_love"
            avatarSrc={instaAvatars.craig_love}
            timestamp="4h"
            segments={5}
            currentSegment={3}
            segmentProgress={0.6}
            onClose={() => undefined}
            onShare={() => undefined}
            onMore={() => undefined}
          />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente StoryViewer."
    />
    <InstaDocPropsTable
      title="StoryViewer"
      rows={[
        { name: 'mediaSrc', type: 'string', description: 'URL da mídia em tela cheia. Obrigatório.' },
        { name: 'mediaAlt', type: 'string', description: 'Texto alternativo da mídia. Obrigatório.' },
        { name: 'username', type: 'string', description: 'Nome de usuário do autor. Obrigatório.' },
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do autor.' },
        { name: 'timestamp', type: 'string', description: 'Tempo decorrido desde a publicação.' },
        {
          name: 'segments',
          type: 'number',
          default: '1',
          description: 'Quantidade total de segmentos da barra de progresso.',
        },
        {
          name: 'currentSegment',
          type: 'number',
          default: '1',
          description: 'Índice do segmento atual, começando em 1.',
        },
        {
          name: 'segmentProgress',
          type: 'number',
          default: '0.5',
          description: 'Progresso do segmento atual, entre 0 e 1.',
        },
        {
          name: 'composerPlaceholder',
          type: 'string',
          default: "'Enviar mensagem'",
          description: 'Texto do campo de resposta.',
        },
        {
          name: 'onClose / onShare / onMore / onComposerClick',
          type: '(event: React.MouseEvent) => void',
          description: 'Callbacks das ações. Cada botão só é renderizado com seu callback.',
        },
        {
          name: 'onNext / onPrev',
          type: '(event: React.MouseEvent) => void',
          description: 'Zonas de toque de avançar (2/3 à direita) e voltar (1/3 à esquerda).',
        },
        {
          name: 'nextLabel / prevLabel',
          type: 'string',
          default: "'Próximo story' / 'Story anterior'",
          description: 'Rótulos acessíveis das zonas de toque.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Camada sobre a mídia; cada filho direto recebe o toque.',
        },
        {
          name: 'footer',
          type: 'React.ReactNode',
          description: 'Substitui o campo “Enviar mensagem” da barra inferior.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'dark'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof StoryViewer> = {
  title: 'Instanooria/Componentes/StoryViewer',
  component: StoryViewer,
  parameters: { layout: 'centered' },
  argTypes: {
    mediaSrc: { control: 'text', description: 'URL da mídia exibida.' },
    mediaAlt: { control: 'text', description: 'Texto alternativo da mídia.' },
    username: { control: 'text', description: 'Nome de usuário do autor.' },
    avatarSrc: { control: 'text', description: 'URL do avatar do autor.' },
    timestamp: { control: 'text', description: 'Tempo decorrido.' },
    segments: {
      control: { type: 'range', min: 1, max: 8, step: 1 },
      description: 'Quantidade de segmentos.',
    },
    currentSegment: {
      control: { type: 'range', min: 1, max: 8, step: 1 },
      description: 'Segmento atual.',
    },
    segmentProgress: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Progresso do segmento atual.',
    },
    composerPlaceholder: { control: 'text', description: 'Texto do campo de resposta.' },
    nextLabel: { control: 'text', description: 'Rótulo da zona de avançar.' },
    prevLabel: { control: 'text', description: 'Rótulo da zona de voltar.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onNext: { action: 'onNext' },
    onPrev: { action: 'onPrev' },
  },
  args: {
    mediaSrc: instaPhotos.coffee,
    mediaAlt: 'Café da manhã em um bistrô',
    username: 'craig_love',
    avatarSrc: instaAvatars.craig_love,
    timestamp: '4h',
    segments: 5,
    currentSegment: 3,
    segmentProgress: 0.6,
    composerPlaceholder: 'Enviar mensagem',
    nextLabel: 'Próximo story',
    prevLabel: 'Story anterior',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof StoryViewer>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  parameters: { layout: 'padded' },
  render: () => <StoryViewerDocumentationPage />,
};

/**
 * Playground com todas as propriedades do StoryViewer expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do StoryViewer',
  render: (args) => (
    <PhoneFrame theme={args.theme} ariaLabel={`Story de ${args.username}`}>
      <StoryViewer
        {...args}
        onClose={() => undefined}
        onShare={() => undefined}
        onMore={() => undefined}
        onComposerClick={() => undefined}
      />
    </PhoneFrame>
  ),
};

/**
 * Réplica do frame oficial "Instagram Story" do Figma, com avanço interativo.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => {
    const InteractiveStory = () => {
      const [segment, setSegment] = useState(1);

      return (
        <PhoneFrame ariaLabel="Story de craig_love">
          <StoryViewer
            mediaSrc={instaPhotos.coffee}
            mediaAlt="Café da manhã em um bistrô"
            username="craig_love"
            avatarSrc={instaAvatars.craig_love}
            timestamp="4h"
            segments={5}
            currentSegment={segment}
            segmentProgress={0.5}
            onClose={() => setSegment(1)}
            onShare={() => setSegment((value) => (value % 5) + 1)}
            onMore={() => undefined}
            onComposerClick={() => setSegment((value) => (value % 5) + 1)}
          />
        </PhoneFrame>
      );
    };

    return <InteractiveStory />;
  },
};

/**
 * Extensões: as zonas de toque navegam, a ficha técnica abre sobre a mídia e o
 * rodapé do produto substitui o campo de resposta.
 */
export const NavegacaoEFichaTecnica: Story = {
  name: 'Navegação e Ficha Técnica',
  render: () => (
    <PhoneFrame theme="dark" ariaLabel="Mural">
      <StoryDoMural />
    </PhoneFrame>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const progresso = tela.getByRole('progressbar', { name: 'Progresso do story' });

    await expect(tela.queryByRole('button', { name: 'Enviar mensagem' })).not.toBeInTheDocument();
    await expect(tela.getByRole('button', { name: 'Ver o Story do colega' })).toBeInTheDocument();

    await userEvent.click(tela.getByRole('button', { name: 'Próximo story' }));
    await expect(progresso).toHaveAttribute('aria-valuenow', '2');
    await userEvent.click(tela.getByRole('button', { name: 'Story anterior' }));
    await expect(progresso).toHaveAttribute('aria-valuenow', '1');

    const ficha = tela.getByRole('button', { name: 'Ver detalhes da postagem' });
    await userEvent.click(ficha);
    await expect(ficha).toHaveAttribute('aria-expanded', 'true');
    await expect(tela.getByText('Onde: Cantina da escola')).toBeVisible();
  },
};
