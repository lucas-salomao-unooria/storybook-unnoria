import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { StoryViewer } from '../../../src/unoovista/components/StoryViewer';
import { PhoneFrame } from '../../../src/unoovista/components/PhoneFrame';
import { BottomSheet } from '../../../src/unoovista/components/BottomSheet';
import { Button } from '../../../src/unoovista/components/Button';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import { unvAvatars, unvStoryFrames } from '../fixtures';

const BAR = '#716C98';

const MURAL = [
  { mediaSrc: unvStoryFrames.aurora, mediaAlt: 'Ilustração de uma aurora em roxo', local: 'Pátio da escola' },
  { mediaSrc: unvStoryFrames.mar, mediaAlt: 'Ilustração de um mar ao entardecer', local: 'Feira de ciências' },
  { mediaSrc: unvStoryFrames.formas, mediaAlt: 'Ilustração de formas geométricas', local: 'Sala de artes' },
];

/**
 * A história do mural: zonas de toque, ficha técnica sobre a mídia e rodapé próprio.
 */
const HistoriaDoMural: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => {
  const [indice, setIndice] = useState(0);
  const atual = MURAL[indice];

  return (
    <StoryViewer
      theme={theme}
      mediaSrc={atual.mediaSrc}
      mediaAlt={atual.mediaAlt}
      username="jacob.w"
      avatarSrc={unvAvatars.lucasMar}
      timestamp="agora"
      segments={MURAL.length}
      currentSegment={indice + 1}
      segmentProgress={1}
      onPrev={() => setIndice((valor) => Math.max(valor - 1, 0))}
      onNext={() => setIndice((valor) => Math.min(valor + 1, MURAL.length - 1))}
      footer={
        <Button block theme={theme} variant="secondary">
          Ver a história da colega
        </Button>
      }
    >
      <BottomSheet
        modal={false}
        theme={theme}
        maxHeight="45%"
        collapsedLabel="Ver detalhes da publicação"
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
      badgeBrand="Unoovista"
      category="Componentes • Histórias"
      title="StoryViewer"
      description="Visualizador de história em tela cheia: a mídia num palco de cantos arredondados, barras de progresso em cápsula, cabeçalho em texto sobre mídia e uma doca de resposta em cápsula elevada sob o palco."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma tela imersiva com camadas sobrepostas à mídia e uma doca embaixo."
    />
    <UnvDocGrid>
      <UnvDocCard icon="⏱️" title="Progresso em cápsulas">
        Um segmento por mídia da história. Os anteriores ficam cheios, o atual reflete{' '}
        <code>segmentProgress</code> e os seguintes ficam vazios.
      </UnvDocCard>
      <UnvDocCard icon="🌗" title="Véu de leitura">
        Um gradiente de <code>overlay-scrim</code> no topo garante o contraste do texto sobre
        qualquer fotografia, e outro mais leve na base.
      </UnvDocCard>
      <UnvDocCard icon="💬" title="Doca de resposta">
        Cápsula elevada sob o palco, com o campo de resposta e os botões de compartilhar e de
        opções.
      </UnvDocCard>
      <UnvDocCard icon="♿" title="Progresso anunciado">
        A barra declara <code>role=&quot;progressbar&quot;</code> com <code>aria-valuenow</code>,
        comunicando a posição na sequência de histórias.
      </UnvDocCard>
      <UnvDocCard icon="👆" title="Zonas de toque">
        <code>onPrev</code> e <code>onNext</code> acendem as zonas: um terço à esquerda volta, o
        resto avança. São botões: Tab, Enter e Espaço funcionam.
      </UnvDocCard>
      <UnvDocCard icon="🗂️" title="Camada e rodapé">
        <code>children</code> renderiza sobre a mídia (a ficha técnica numa <code>BottomSheet</code>{' '}
        não modal); <code>footer</code> troca o campo “Enviar mensagem”.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="StoryViewer"
      layout="Palco de mídia + doca"
      specs={[
        { label: 'Palco', value: 'Cantos inferiores · --unv-radius-xl (24px)' },
        { label: 'Progresso', value: 'Cápsulas de 4px · overlay-onmedia / text-on-media' },
        { label: 'Cabeçalho', value: 'label-lg 700 · caption-md · text-on-media' },
        { label: 'Botão de fechar', value: '44px · fundo overlay-scrim' },
        { label: 'Véu', value: 'overlay-scrim em duas camadas no topo, uma na base' },
        { label: 'Doca', value: 'Cápsula · background-elevated · elevation-overlay' },
        { label: 'Campo de resposta', value: '44px · fill-field · body-md' },
        { label: 'Zonas de toque', value: '33% voltar · 67% avançar' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Véu de leitura só com token',
          detail:
            'o topo empilha duas camadas de --unv-color-overlay-scrim (cerca de 75% de opacidade) até 96px, onde estão as barras e o cabeçalho. Branco sobre uma fotografia totalmente branca mede 8,3:1; com uma camada só, mediria 3,5:1.',
        },
        {
          subject: 'Texto sobre mídia sem transparência',
          detail:
            'nome e horário usam --unv-color-text-on-media (branco pleno) nos dois temas. Nenhum texto sobre mídia usa opacidade para hierarquia: o horário se distingue pelo corpo, não pela transparência.',
        },
        {
          subject: 'Foco branco sobre a mídia',
          detail:
            'o botão de fechar e as zonas de toque usam anel de 2px em --unv-color-text-on-media, e não em action-primary, que se confunde com uma fotografia escura. Os controles da doca, sobre superfície, usam action-primary.',
        },
        {
          subject: 'Doca elevada em vez de barra colada',
          detail:
            'a resposta fica numa cápsula elevada, afastada das bordas, com a elevação de sobreposição — a mesma linguagem da doca de navegação.',
        },
        {
          subject: 'Botões de 44px',
          detail:
            'fechar, compartilhar, opções e o campo de resposta têm 44px de altura, o alvo de toque do módulo.',
        },
        {
          subject: 'Rótulos em pt-BR e sem tema padrão',
          detail:
            'nextLabel passa a “Próxima história”, prevLabel a “História anterior”. A prop theme deixa de ter padrão escuro: sem ela, o componente herda o tema do contêiner.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Palco de mídia com camadas sobrepostas e a doca de resposta."
    />
    <UnvDocAnatomy
      zones={[
        { name: 'Mídia', role: 'Imagem cobrindo o palco, com o texto alternativo obrigatório.', token: 'mediaSrc · mediaAlt' },
        { name: 'Véu de leitura', role: 'Gradientes de scrim no topo e na base.', token: '--unv-color-overlay-scrim' },
        { name: 'Progresso', role: 'Cápsulas de 4px; a atual reflete o andamento.', token: '--unv-color-overlay-onmedia · --unv-color-text-on-media' },
        { name: 'Cabeçalho', role: 'Avatar, nome, horário e botão de fechar.', token: '--unv-color-text-on-media' },
        { name: 'Zonas de toque', role: 'Botões transparentes de voltar e avançar.', token: 'onPrev · onNext' },
        { name: 'Camada (children)', role: 'Conteúdo sobre a mídia; deixa o toque passar.', token: 'children' },
        { name: 'Doca de resposta', role: 'Campo, compartilhar e opções, ou o footer do produto.', token: '--unv-color-background-elevated · --unv-elevation-overlay' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes"
      description="Progresso em vários segmentos, com e sem ações, e a réplica estática."
    />
    <UnvDocStage label="Cinco segmentos, terceiro em andamento" surface="secondary" padding={16}>
      <div style={{ width: 375 }}>
        <PhoneFrame height={560} withStatusBar={false} framed={false}>
          <StoryViewer
            mediaSrc={unvStoryFrames.aurora}
            mediaAlt="Ilustração de uma aurora em roxo"
            username="marina.luz"
            avatarSrc={unvAvatars.marinaLuz}
            timestamp="4 h"
            segments={5}
            currentSegment={3}
            segmentProgress={0.6}
            onClose={() => undefined}
            onShare={() => undefined}
            onMore={() => undefined}
          />
        </PhoneFrame>
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Sempre informar mediaAlt: a mídia é o conteúdo da tela.',
        'Ligar onPrev e onNext juntos, para a navegação por teclado ser completa.',
        'Usar footer quando a resposta não for uma mensagem de texto.',
        'Pôr texto sobre uma superfície própria (a BottomSheet), não direto sobre a mídia.',
      ]}
      donts={[
        'Escrever texto solto sobre a mídia na camada children: o véu só cobre o topo.',
        'Trocar o branco do cabeçalho por outro tom: a mídia é imprevisível.',
        'Remover o botão de fechar de uma história em tela cheia.',
        'Usar segmentos demais: cada barra fica estreita e o progresso deixa de ser lido.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O palco não muda com o tema; a tela e a doca de resposta, sim."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={16}>
      {(theme) => (
        <div style={{ width: 375 }}>
          <PhoneFrame height={560} withStatusBar={false} framed={false}>
            <StoryViewer
              key={theme}
              mediaSrc={unvStoryFrames.mar}
              mediaAlt="Ilustração de um mar ao entardecer"
              username="marina.luz"
              avatarSrc={unvAvatars.marinaLuz}
              timestamp="4 h"
              segments={3}
              currentSegment={2}
              segmentProgress={0.5}
              onClose={() => undefined}
              onShare={() => undefined}
              onMore={() => undefined}
            />
          </PhoneFrame>
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UnvDocPropsTable
      title="StoryViewer"
      rows={[
        { name: 'mediaSrc', type: 'string', description: 'URL da mídia em tela cheia. Obrigatório.' },
        { name: 'mediaAlt', type: 'string', description: 'Texto alternativo da mídia. Obrigatório.' },
        { name: 'username', type: 'string', description: 'Nome do autor da história. Obrigatório.' },
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do autor.' },
        { name: 'timestamp', type: 'string', description: 'Tempo decorrido desde a publicação.' },
        { name: 'segments', type: 'number', default: '1', description: 'Quantidade de segmentos de progresso.' },
        { name: 'currentSegment', type: 'number', default: '1', description: 'Segmento atual, a partir de 1.' },
        { name: 'segmentProgress', type: 'number', default: '0.5', description: 'Progresso do segmento atual, de 0 a 1.' },
        { name: 'composerPlaceholder', type: 'string', default: "'Enviar mensagem'", description: 'Texto do campo de resposta.' },
        { name: 'onClose', type: '(event) => void', description: 'Botão de fechar; sem ele, o botão não aparece.' },
        { name: 'onShare', type: '(event) => void', description: 'Botão de compartilhar da doca.' },
        { name: 'onMore', type: '(event) => void', description: 'Botão de opções da doca.' },
        { name: 'onComposerClick', type: '(event) => void', description: 'Campo de resposta.' },
        { name: 'onNext', type: '(event) => void', description: 'Zona de avançar; sem ela, a zona não é renderizada.' },
        { name: 'onPrev', type: '(event) => void', description: 'Zona de voltar; sem ela, a zona não é renderizada.' },
        { name: 'nextLabel', type: 'string', default: "'Próxima história'", description: 'Nome acessível da zona de avançar.' },
        { name: 'prevLabel', type: 'string', default: "'História anterior'", description: 'Nome acessível da zona de voltar.' },
        { name: 'children', type: 'React.ReactNode', description: 'Camada sobre a mídia, acima das zonas de toque.' },
        { name: 'footer', type: 'React.ReactNode', description: 'Substitui o campo de resposta da doca.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof StoryViewer> = {
  title: 'Unoovista/Componentes/StoryViewer',
  component: StoryViewer,
  parameters: { layout: 'padded' },
  argTypes: {
    mediaSrc: { control: 'text', description: 'URL da mídia exibida.' },
    mediaAlt: { control: 'text', description: 'Texto alternativo da mídia.' },
    username: { control: 'text', description: 'Nome do autor.' },
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
    nextLabel: { control: 'text', description: 'Nome acessível da zona de avançar.' },
    prevLabel: { control: 'text', description: 'Nome acessível da zona de voltar.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    onClose: { action: 'onClose' },
    onShare: { action: 'onShare' },
    onMore: { action: 'onMore' },
    onComposerClick: { action: 'onComposerClick' },
    onNext: { action: 'onNext' },
    onPrev: { action: 'onPrev' },
  },
  args: {
    mediaSrc: unvStoryFrames.aurora,
    mediaAlt: 'Ilustração de uma aurora em roxo',
    username: 'marina.luz',
    avatarSrc: unvAvatars.marinaLuz,
    timestamp: '4 h',
    segments: 5,
    currentSegment: 3,
    segmentProgress: 0.6,
    composerPlaceholder: 'Enviar mensagem',
    nextLabel: 'Próxima história',
    prevLabel: 'História anterior',
  },
};

export default meta;

type Story = StoryObj<typeof StoryViewer>;

/**
 * Documentação rica e completa do componente.
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
    <PhoneFrame theme={args.theme} ariaLabel={`História de ${args.username}`}>
      <StoryViewer
        {...args}
        onClose={args.onClose ?? (() => undefined)}
        onShare={args.onShare ?? (() => undefined)}
        onMore={args.onMore ?? (() => undefined)}
        onComposerClick={args.onComposerClick ?? (() => undefined)}
      />
    </PhoneFrame>
  ),
};

/**
 * A história completa, com avanço interativo pela doca.
 */
export const ExemploCompleto: Story = {
  name: '🎨 Exemplo Completo',
  render: () => {
    const HistoriaInterativa = () => {
      const [segmento, setSegmento] = useState(1);

      return (
        <PhoneFrame ariaLabel="História de marina.luz">
          <StoryViewer
            mediaSrc={unvStoryFrames.mar}
            mediaAlt="Ilustração de um mar ao entardecer"
            username="marina.luz"
            avatarSrc={unvAvatars.marinaLuz}
            timestamp="4 h"
            segments={5}
            currentSegment={segmento}
            segmentProgress={0.5}
            onClose={() => setSegmento(1)}
            onShare={() => setSegmento((valor) => (valor % 5) + 1)}
            onMore={() => undefined}
            onComposerClick={() => setSegmento((valor) => (valor % 5) + 1)}
          />
        </PhoneFrame>
      );
    };

    return <HistoriaInterativa />;
  },
};

/**
 * As zonas de toque navegam, a ficha técnica abre sobre a mídia e o rodapé do
 * produto substitui o campo de resposta.
 */
export const NavegacaoEFichaTecnica: Story = {
  name: 'Navegação e Ficha Técnica',
  render: () => (
    <PhoneFrame ariaLabel="Mural">
      <HistoriaDoMural />
    </PhoneFrame>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const progresso = tela.getByRole('progressbar', { name: 'Progresso da história' });

    await expect(tela.queryByRole('button', { name: 'Enviar mensagem' })).not.toBeInTheDocument();
    await expect(tela.getByRole('button', { name: 'Ver a história da colega' })).toBeInTheDocument();

    await userEvent.click(tela.getByRole('button', { name: 'Próxima história' }));
    await expect(progresso).toHaveAttribute('aria-valuenow', '2');
    await userEvent.click(tela.getByRole('button', { name: 'História anterior' }));
    await expect(progresso).toHaveAttribute('aria-valuenow', '1');

    const ficha = tela.getByRole('button', { name: 'Ver detalhes da publicação' });
    await userEvent.click(ficha);
    await expect(ficha).toHaveAttribute('aria-expanded', 'true');
    await expect(tela.getByText('Onde: Pátio da escola')).toBeVisible();
  },
};
