import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
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
  WaDocStage,
  WaDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { MessageBubble, ChatWallpaper, DateChip } from '../../../src/whatsappmobile';
import { waWallpaper, waSamplePhoto } from '../fixtures';

const BAR = '#0CA996';

/**
 * Coluna de mensagens usada nas demonstrações.
 */
const Thread: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 340 }}>{children}</div>
);

/**
 * Página de documentação rica do componente MessageBubble.
 */
const MessageBubbleDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Conversa"
      title="MessageBubble"
      description="Balão de mensagem com composição modular. O balão enviado reproduz o preenchimento #054640 e a cauda inferior direita do vetor original do frame Starred messages, além da faixa de documento #043D36, do texto em #C3DDDC e dos metadados em #80B3AE. Os subcomponentes Media e Document cobrem anexos de imagem e de arquivo."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="💬" title="Composição modular">
        <code>MessageBubble.Media</code> e <code>MessageBubble.Document</code> se empilham dentro do
        mesmo balão, reproduzindo o anexo composto do frame de mensagens favoritadas.
      </WaDocCard>
      <WaDocCard icon="✅" title="Rodapé de metadados">
        Estrela de favorita, horário e tiques de entrega compartilham a linha inferior, em 13px na
        cor <code>--wa-color-text-bubble-meta</code>.
      </WaDocCard>
      <WaDocCard icon="🪝" title="Cauda direcional">
        O vetor do arquivo tem a cauda na base direita do balão enviado. A prop <code>tail</code>{' '}
        permite suprimi-la em mensagens consecutivas do mesmo autor.
      </WaDocCard>
      <WaDocCard icon="📥" title="Balão recebido">
        Nenhum frame do arquivo publica mensagem recebida. A variante <code>in</code> usa a
        superfície de app bar, escolha registrada como desvio.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2930"
      frameName="Starred messages · balão enviado"
      specs={[
        { label: 'Preenchimento (enviado)', value: '#054640' },
        { label: 'Faixa de documento', value: '#043D36' },
        { label: 'Texto', value: 'PT Sans 400 · 16px · #C3DDDC' },
        { label: 'Metadados', value: 'PT Sans 400 · 13px · #80B3AE' },
        { label: 'Tique', value: '#82B4B3' },
        { label: 'Estrela', value: '#5B8583' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Balão recebido',
          detail:
            'os frames de conversa do arquivo estão vazios: não há nenhuma mensagem recebida desenhada. A variante in adota --wa-color-surface-bubble-in (#232D36), a superfície de app bar, preservando a hierarquia de luminância contra o balão enviado.',
        },
        {
          subject: 'Raio e cauda',
          detail:
            'o vetor do balão é um caminho único com cantos arredondados e cauda integrada. O componente reproduz o resultado com border-radius de 8px e um triângulo CSS de 8×10px, mantendo a mesma silhueta.',
        },
        {
          subject: 'Texto de mensagem',
          detail:
            'o arquivo só desenha texto dentro do cartão de documento. O estilo do parágrafo (PT Sans 16px em #C3DDDC) foi derivado desse cartão, o único texto de balão existente.',
        },
        {
          subject: 'Extensões de conversa de grupo',
          detail:
            'sender (remetente no verde-água da aba ativa) e forwardedLabel (selo "Encaminhada" com o glifo forward, nos metadados do balão) não têm frame: o arquivo não publica conversa de grupo nem mensagem encaminhada.',
        },
        {
          subject: 'Mídia desenhada',
          detail:
            'sem src, MessageBubble.Media exibe os children na moldura e se anuncia como imagem pelo alt. É para o produto que desenha a mídia a partir do texto em vez de servir arquivo.',
        },
        {
          subject: 'LinkPreview e Invite',
          detail:
            'a prévia de link e o convite para grupo usam a faixa #043D36 do documento anexado; a ação do convite é a ação de texto do diálogo (#25AC9D) sobre o divisor. Nenhum dos dois tem frame no arquivo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Balão', role: 'Superfície com raio de 8px e alinhamento pela direção.', token: '--wa-color-surface-bubble-out · --wa-color-surface-bubble-in' },
        { name: 'Cauda', role: 'Triângulo na base, do lado correspondente à direção.', token: 'prop tail' },
        { name: 'Conteúdo', role: 'Texto simples ou os subcomponentes Media e Document.', token: '--wa-color-text-bubble' },
        { name: 'Media', role: 'Miniatura com raio de 5px e proporção configurável.', token: 'MessageBubble.Media' },
        { name: 'Document', role: 'Faixa com ícone de PDF, nome e metadados.', token: '--wa-color-surface-bubble-out-strip' },
        { name: 'Rodapé', role: 'Estrela, horário e tiques de entrega.', token: '--wa-color-text-bubble-meta · --wa-color-icon-tick' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <WaDocStage surface="base" padding={24} align="flex-start">
      <Thread>
        <MessageBubble direction="out" time="9:03 am">
          Mensagem enviada com cauda.
        </MessageBubble>
        <MessageBubble direction="out" time="9:03 am" delivery="sent">
          Entregue — um tique.
        </MessageBubble>
        <MessageBubble direction="out" time="9:03 am" delivery="read" starred>
          Lida e favoritada — dois tiques e a estrela.
        </MessageBubble>
        <MessageBubble direction="out" time="9:04 am" tail={false}>
          Mensagem consecutiva, sem cauda.
        </MessageBubble>
        <MessageBubble direction="in" time="9:05 am">
          Mensagem recebida (desvio registrado).
        </MessageBubble>
        <MessageBubble direction="in" time="9:05 am" tail={false}>
          Recebida consecutiva.
        </MessageBubble>
      </Thread>
    </WaDocStage>

    <WaDocStage label="Anexos" surface="base" padding={24} align="flex-start">
      <Thread>
        <MessageBubble direction="out" time="9:03 am" delivery="read" maxWidth={250}>
          <MessageBubble.Media src={waSamplePhoto} alt="Fotografia enviada" />
        </MessageBubble>
        <MessageBubble direction="out" time="9:03 am" delivery="read" starred maxWidth={250}>
          <MessageBubble.Media src={waSamplePhoto} alt="Fotografia enviada" />
          <MessageBubble.Document name="Bleh blah blue" details={['1090 pages', 'PDF']} />
        </MessageBubble>
        <MessageBubble direction="out" time="9:03 am" maxWidth={250}>
          <MessageBubble.Document name="Relatório anual" details={['24 pages', 'PDF']} />
        </MessageBubble>
      </Thread>
    </WaDocStage>

    <WaDocStage label="Extensões (conversa de grupo)" surface="base" padding={24} align="flex-start">
      <Thread>
        <MessageBubble direction="in" sender="Pedro Henrique" time="08:12">
          O ônibus furou o pneu perto da praça. Já chamaram o socorro.
        </MessageBubble>
        <MessageBubble direction="out" forwardedLabel="Encaminhada" time="09:04" delivery="read">
          Monitores da exposição já aguardam no saguão principal.
        </MessageBubble>
        <MessageBubble direction="in" sender="Coordenação Pedagógica" time="08:20" maxWidth={260}>
          <MessageBubble.Media alt="Comunicado oficial sobre a entrada pelo portão lateral" ratio="4 / 3">
            <div
              style={{
                padding: 12,
                background: 'var(--wa-color-surface-elevated)',
                color: 'var(--wa-color-text-primary)',
                fontSize: 12,
                lineHeight: 1.4,
              }}
            >
              <strong style={{ display: 'block', marginBottom: 6 }}>COMUNICADO Nº 14</strong>
              Entrada das turmas do 5º ano pelo portão lateral.
            </div>
          </MessageBubble.Media>
          Orientações sobre a bilheteria do museu.
        </MessageBubble>
        <MessageBubble direction="in" sender="Camila Duarte" time="08:25" maxWidth={260}>
          <MessageBubble.LinkPreview
            title="Prefeitura suspende visitas escolares aos museus"
            description="Medida valeria para todo o mês de outubro."
            domain="noticiaslocais.edu.br"
          />
          Olhem isso!
        </MessageBubble>
        <MessageBubble direction="in" time="08:00" maxWidth={260}>
          <MessageBubble.Invite
            title="Turma 5ºB"
            subtitle="Convite para grupo de conversa"
            initials="5B"
            actionLabel="Entrar no grupo"
          />
        </MessageBubble>
      </Thread>
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Em contexto"
      description="Sobre a textura oficial da conversa."
    />
    <div style={{ width: 411, height: 460, marginBottom: 32 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '18px 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DateChip>TODAY</DateChip>
          </div>
          <MessageBubble direction="in" time="9:01 am">
            Você viu as fotos do sítio?
          </MessageBubble>
          <MessageBubble direction="out" time="9:03 am" delivery="read" maxWidth={250}>
            <MessageBubble.Media src={waSamplePhoto} alt="Fotografia enviada" />
          </MessageBubble>
        </div>
      </ChatWallpaper>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Suprimir a cauda em mensagens consecutivas do mesmo autor.',
        'Empilhar Media e Document dentro de um único balão quando o anexo for composto.',
        'Usar delivery="read" apenas quando houver confirmação de leitura.',
        'Limitar maxWidth para que o balão não atravesse a largura útil de 411px.',
      ]}
      donts={[
        'Aplicar a cor do balão enviado a mensagens recebidas.',
        'Colocar o horário fora do rodapé do balão.',
        'Usar a estrela para outro significado que não "mensagem favoritada".',
        'Estender o balão até as bordas da tela: o arquivo mantém margem lateral.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['base', 'canvas']} initial="base">
      {() => (
        <Thread>
          <MessageBubble direction="out" time="9:03 am" delivery="read">
            Mensagem enviada
          </MessageBubble>
          <MessageBubble direction="in" time="9:05 am">
            Mensagem recebida
          </MessageBubble>
        </Thread>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="MessageBubble"
      rows={[
        { name: 'direction', type: "'out' | 'in'", default: "'out'", description: 'Direção do balão, que define cor, alinhamento e lado da cauda.' },
        { name: 'children', type: 'React.ReactNode', description: 'Texto simples ou os subcomponentes Media e Document.' },
        { name: 'time', type: 'string', description: 'Horário exibido no rodapé.' },
        { name: 'delivery', type: "'none' | 'sent' | 'read'", default: "'none'", description: 'Estado de entrega exibido em tiques.' },
        { name: 'starred', type: 'boolean', default: 'false', description: 'Exibe a estrela de mensagem favoritada.' },
        { name: 'tail', type: 'boolean', default: 'true', description: 'Desenha a cauda triangular na base do balão.' },
        { name: 'maxWidth', type: 'number', default: '240', description: 'Largura máxima do balão em pixels.' },
        { name: 'sender', type: 'React.ReactNode', description: 'Extensão: remetente no topo do balão, em conversa de grupo.' },
        { name: 'forwardedLabel', type: 'React.ReactNode', description: 'Extensão: selo de mensagem encaminhada, como "Encaminhada".' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <WaDocPropsTable
      title="MessageBubble.Media"
      rows={[
        { name: 'src', type: 'string', description: 'URL da imagem anexada. Ausente, a moldura exibe os children.' },
        { name: 'alt', type: 'string', description: 'Texto alternativo. Obrigatório; sem src, vira o nome acessível da moldura.' },
        { name: 'ratio', type: 'string', default: "'16 / 9'", description: 'Proporção da miniatura, em formato CSS aspect-ratio.' },
        { name: 'children', type: 'React.ReactNode', description: 'Extensão: a mídia desenhada, exibida quando não há src.' },
      ]}
    />
    <WaDocPropsTable
      title="MessageBubble.LinkPreview"
      rows={[
        { name: 'title', type: 'React.ReactNode', description: 'Manchete da página. Obrigatório.' },
        { name: 'description', type: 'React.ReactNode', description: 'Resumo abaixo da manchete.' },
        { name: 'domain', type: 'React.ReactNode', description: 'Domínio no rodapé do cartão. Obrigatório.' },
        { name: 'thumbnail', type: 'React.ReactNode', description: 'Miniatura acima da manchete.' },
        { name: 'onClick', type: '(event) => void', description: 'Torna o cartão um botão.' },
      ]}
    />
    <WaDocPropsTable
      title="MessageBubble.Invite"
      rows={[
        { name: 'title', type: 'React.ReactNode', description: 'Nome do grupo. Obrigatório.' },
        { name: 'subtitle', type: 'React.ReactNode', description: 'Linha abaixo do nome.' },
        { name: 'avatarSrc', type: 'string', description: 'Avatar do grupo.' },
        { name: 'initials', type: 'string', description: 'Iniciais quando não há avatar.' },
        { name: 'actionLabel', type: 'React.ReactNode', description: 'Rótulo do botão de entrar. Obrigatório.' },
        { name: 'onAction', type: '(event) => void', description: 'Callback do botão de entrar.' },
        { name: 'actionDisabled', type: 'boolean', default: 'false', description: 'Desabilita o botão de entrar.' },
      ]}
    />
    <WaDocPropsTable
      title="MessageBubble.Document"
      rows={[
        { name: 'name', type: 'string', description: 'Nome do arquivo anexado. Obrigatório.' },
        { name: 'details', type: 'string[]', default: '[]', description: 'Metadados exibidos abaixo, separados por um ponto.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MessageBubble> = {
  title: 'Whatsapp Mobile/Componentes/MessageBubble',
  component: MessageBubble,
  parameters: { layout: 'padded' },
  argTypes: {
    direction: { control: 'radio', options: ['out', 'in'], description: 'Direção do balão.' },
    children: { control: 'text', description: 'Conteúdo do balão.' },
    time: { control: 'text', description: 'Horário exibido no rodapé.' },
    delivery: { control: 'radio', options: ['none', 'sent', 'read'], description: 'Estado de entrega.' },
    starred: { control: 'boolean', description: 'Exibe a estrela de favorita.' },
    tail: { control: 'boolean', description: 'Desenha a cauda triangular.' },
    maxWidth: { control: { type: 'range', min: 120, max: 360, step: 5 }, description: 'Largura máxima em pixels.' },
    sender: { control: 'text', description: 'Extensão: remetente em conversa de grupo.' },
    forwardedLabel: { control: 'text', description: 'Extensão: selo de encaminhada.' },
  },
  args: {
    direction: 'out',
    children: 'Messages and calls are end-to-end encrypted.',
    time: '9:03 am',
    delivery: 'read',
    starred: false,
    tail: true,
    maxWidth: 240,
  },
};

export default meta;

type Story = StoryObj<typeof MessageBubble>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MessageBubbleDocumentationPage />,
};

/**
 * Playground com 100% das props do MessageBubble expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do MessageBubble',
  render: (args) => (
    <WaDocStage surface="base" padding={32} align="flex-start">
      <Thread>
        <MessageBubble {...args} />
      </Thread>
    </WaDocStage>
  ),
};

/**
 * Playground dedicado ao subcomponente Media.
 */
export const PlaygroundMedia: Story = {
  name: '🕹️ 2. Playground do MessageBubble.Media',
  argTypes: {
    maxWidth: { control: { type: 'range', min: 140, max: 340, step: 5 } },
  },
  args: { maxWidth: 250, time: '9:03 am', delivery: 'read', starred: false, tail: true, direction: 'out' },
  render: (args) => (
    <WaDocStage surface="base" padding={32} align="flex-start">
      <Thread>
        <MessageBubble {...args}>
          <MessageBubble.Media src={waSamplePhoto} alt="Fotografia enviada" />
        </MessageBubble>
      </Thread>
    </WaDocStage>
  ),
};

/**
 * Playground dedicado ao subcomponente Document.
 */
export const PlaygroundDocument: Story = {
  name: '🕹️ 3. Playground do MessageBubble.Document',
  args: { maxWidth: 250, time: '9:03 am', delivery: 'read', starred: true, tail: true, direction: 'out' },
  render: (args) => (
    <WaDocStage surface="base" padding={32} align="flex-start">
      <Thread>
        <MessageBubble {...args}>
          <MessageBubble.Document name="Bleh blah blue" details={['1090 pages', 'PDF']} />
        </MessageBubble>
      </Thread>
    </WaDocStage>
  ),
};

/**
 * Réplica do balão composto do frame "Starred messages".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="base" padding={32} align="flex-start">
      <Thread>
        <MessageBubble direction="out" time="9:03 am" delivery="read" starred maxWidth={250}>
          <MessageBubble.Media src={waSamplePhoto} alt="Fotografia enviada" />
          <MessageBubble.Document name="Bleh blah blue" details={['1090 pages', 'PDF']} />
        </MessageBubble>
      </Thread>
    </WaDocStage>
  ),
};

/**
 * Matriz completa de direções e anexos.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="base" padding={24} align="flex-start">
      <Thread>
        <MessageBubble direction="out" time="9:03 am">
          Enviada
        </MessageBubble>
        <MessageBubble direction="in" time="9:05 am">
          Recebida
        </MessageBubble>
        <MessageBubble direction="out" time="9:06 am" maxWidth={250}>
          <MessageBubble.Media src={waSamplePhoto} alt="Fotografia" />
        </MessageBubble>
        <MessageBubble direction="out" time="9:07 am" maxWidth={250}>
          <MessageBubble.Document name="Relatório" details={['24 pages', 'PDF']} />
        </MessageBubble>
      </Thread>
    </WaDocStage>
  ),
};

/**
 * Estados de entrega, favorita e cauda.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="base" padding={24} align="flex-start">
      <Thread>
        <MessageBubble direction="out" time="9:03 am" delivery="none">
          Sem indicador
        </MessageBubble>
        <MessageBubble direction="out" time="9:03 am" delivery="sent">
          Entregue
        </MessageBubble>
        <MessageBubble direction="out" time="9:03 am" delivery="read">
          Lida
        </MessageBubble>
        <MessageBubble direction="out" time="9:03 am" delivery="read" starred>
          Favoritada
        </MessageBubble>
        <MessageBubble direction="out" time="9:04 am" tail={false}>
          Sem cauda
        </MessageBubble>
      </Thread>
    </WaDocStage>
  ),
};

/**
 * Composição modular dos subcomponentes dentro de um mesmo balão.
 */
export const ComposicaoModular: Story = {
  name: 'ComposicaoModular',
  render: () => (
    <WaDocStage surface="base" padding={24} align="flex-start">
      <Thread>
        <MessageBubble direction="out" time="9:03 am" delivery="read" maxWidth={250}>
          <MessageBubble.Media src={waSamplePhoto} alt="Fotografia" />
          <MessageBubble.Document name="Bleh blah blue" details={['1090 pages', 'PDF']} />
          Legenda da mídia enviada.
        </MessageBubble>
      </Thread>
    </WaDocStage>
  ),
};
