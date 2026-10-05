import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
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
  UncDocStage,
  UncDocThemeSwitcher,
  type UncDocTheme,
} from '../../../.storybook/components';
import { MessageBubble, ChatWallpaper, DateChip, TypingIndicator } from '../../../src/unoochat';
import type { UncSenderTone } from '../../../src/unoochat';
import { expect, userEvent, within } from 'storybook/test';
import { uncWallpaperFor, uncSamplePhoto } from '../fixtures';

const BAR = '#716C98';

/**
 * Coluna de mensagens usada nas demonstrações.
 */
const Thread: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 340 }}>{children}</div>
);

/**
 * Comunicado DESENHADO a partir do texto: a mídia que um produto sem arquivo de
 * imagem ainda consegue mostrar.
 */
const ComunicadoDesenhado: React.FC = () => (
  <div
    style={{
      padding: 12,
      background: 'var(--unc-color-surface-elevated)',
      color: 'var(--unc-color-text-primary)',
      fontSize: 12,
      lineHeight: 1.4,
    }}
  >
    <strong style={{ display: 'block', marginBottom: 6 }}>COMUNICADO Nº 14</strong>
    Entrada das turmas do 5º ano pelo portão lateral.
  </div>
);

/**
 * Renderiza o mesmo conteúdo sobre a superfície base nos dois temas, lado a
 * lado, para que cada matriz mostre o par medido.
 */
const PorTema: React.FC<{ label: string; children: (theme: UncDocTheme) => React.ReactNode }> = ({
  label,
  children,
}) => (
  <UncDocGrid min={400} marginBottom={0}>
    {(['light', 'dark'] as const).map((theme) => (
      <UncDocStage
        key={theme}
        label={`${label} · ${theme === 'light' ? 'tema claro' : 'tema escuro'}`}
        theme={theme}
        surface="base"
        padding={24}
        align="flex-start"
      >
        {children(theme)}
      </UncDocStage>
    ))}
  </UncDocGrid>
);

/**
 * Variantes de direção, entrega, favorita e cauda.
 */
const VariantesDoBalao: React.FC = () => (
  <Thread>
    <MessageBubble direction="out" time="09:03">
      Mensagem enviada com cauda.
    </MessageBubble>
    <MessageBubble direction="out" time="09:03" delivery="sent">
      Enviada: um tique.
    </MessageBubble>
    <MessageBubble direction="out" time="09:03" delivery="read" starred>
      Lida e favoritada: dois tiques e a estrela.
    </MessageBubble>
    <MessageBubble direction="out" time="09:04" tail={false}>
      Mensagem consecutiva, sem cauda.
    </MessageBubble>
    <MessageBubble direction="in" time="09:05">
      Mensagem recebida.
    </MessageBubble>
    <MessageBubble direction="in" time="09:05" tail={false}>
      Recebida consecutiva.
    </MessageBubble>
  </Thread>
);

/**
 * Anexos de mídia e de documento.
 */
const Anexos: React.FC = () => (
  <Thread>
    <MessageBubble direction="out" time="09:03" delivery="read" maxWidth={250}>
      <MessageBubble.Media src={uncSamplePhoto} alt="Fotografia enviada" />
    </MessageBubble>
    <MessageBubble direction="out" time="09:03" delivery="read" starred maxWidth={250}>
      <MessageBubble.Media src={uncSamplePhoto} alt="Fotografia enviada" />
      <MessageBubble.Document name="Relatório da visita" details={['12 páginas', 'PDF']} />
    </MessageBubble>
    <MessageBubble direction="out" time="09:03" maxWidth={250}>
      <MessageBubble.Document name="Relatório anual" details={['24 páginas', 'PDF']} />
    </MessageBubble>
  </Thread>
);

/**
 * Extensões de conversa de grupo: remetente, encaminhada, mídia desenhada, prévia
 * de link e convite.
 */
const ExtensoesDeGrupo: React.FC = () => (
  <Thread>
    <MessageBubble direction="in" sender="Pedro Henrique" time="08:12">
      O ônibus furou o pneu perto da praça. Já chamaram o socorro.
    </MessageBubble>
    <MessageBubble direction="out" forwardedLabel="Encaminhada" time="09:04" delivery="read">
      Monitores da exposição já aguardam no saguão principal.
    </MessageBubble>
    <MessageBubble direction="in" sender="Coordenação Pedagógica" time="08:20" maxWidth={260}>
      <MessageBubble.Media alt="Comunicado oficial sobre a entrada pelo portão lateral" ratio="4 / 3">
        <ComunicadoDesenhado />
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
);

/**
 * `#RRGGBB` no formato que `getComputedStyle().color` devolve.
 */
const hexParaRgb = (hex: string): string => {
  const [r, g, b] = [1, 3, 5].map((inicio) => parseInt(hex.slice(inicio, inicio + 2), 16));
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Os oito tons de remetente, com o nome da família de cada um. Nomes fictícios.
 */
const TONS_DO_REMETENTE: { tone: UncSenderTone; nome: string; familia: string }[] = [
  { tone: 1, nome: 'Ana Beatriz', familia: 'roxo' },
  { tone: 2, nome: 'Bruno Reis', familia: 'azul-marinho' },
  { tone: 3, nome: 'Camila Duarte', familia: 'laranja' },
  { tone: 4, nome: 'Davi Lucas', familia: 'vermelho' },
  { tone: 5, nome: 'Elisa Moura', familia: 'azul' },
  { tone: 6, nome: 'Felipe Nunes', familia: 'verde' },
  { tone: 7, nome: 'Gabriela Lima', familia: 'âmbar' },
  { tone: 8, nome: 'Heitor Prado', familia: 'cinza' },
];

/**
 * Um balão recebido por tom, de 1 a 8, mais o balão sem `senderTone`.
 */
const TonsDoRemetente: React.FC = () => (
  <Thread>
    <MessageBubble direction="in" sender="Sem senderTone (acento)" time="08:00">
      Sem a prop, o nome fica no acento.
    </MessageBubble>
    {TONS_DO_REMETENTE.map(({ tone, nome, familia }) => (
      <MessageBubble key={tone} direction="in" sender={nome} senderTone={tone} time={`08:0${tone}`}>
        {`senderTone={${tone}} · ${familia}`}
      </MessageBubble>
    ))}
  </Thread>
);

/**
 * Trecho de conversa sobre a textura do tema.
 */
const ConversaEmContexto: React.FC<{ theme: UncDocTheme }> = ({ theme }) => (
  <div data-unc-theme={theme} style={{ width: 411, height: 460 }}>
    <ChatWallpaper src={uncWallpaperFor(theme)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '18px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <DateChip>HOJE</DateChip>
        </div>
        <MessageBubble direction="in" time="09:01">
          Você viu as fotos do sítio?
        </MessageBubble>
        <MessageBubble direction="out" time="09:03" delivery="read" maxWidth={250}>
          <MessageBubble.Media src={uncSamplePhoto} alt="Fotografia enviada" />
        </MessageBubble>
      </div>
    </ChatWallpaper>
  </div>
);

/**
 * Página de documentação rica do componente MessageBubble.
 */
const MessageBubbleDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Conversa"
      title="MessageBubble"
      description="Balão de mensagem com composição modular. O enviado usa --unc-color-surface-bubble-out (lavanda no tema claro, roxo médio no escuro) e o recebido, --unc-color-surface-bubble-in, ambos com cauda opcional, texto de Open Sans 16px e rodapé de metadados em 12px. Os subcomponentes Media, Document, LinkPreview e Invite cobrem foto, arquivo, prévia de link e convite para grupo."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="💬" title="Composição modular">
        <code>MessageBubble.Media</code> e <code>MessageBubble.Document</code> se empilham dentro do
        mesmo balão: uma foto com o relatório da visita e uma legenda, por exemplo.
      </UncDocCard>
      <UncDocCard icon="✅" title="Rodapé de metadados">
        Estrela de favorita, horário e confirmação de entrega compartilham a linha inferior, em 12px
        na cor <code>--unc-color-text-bubble-meta</code>. Enviada usa o tique simples (
        <code>tick</code>); lida, o duplo (<code>tickDouble</code>).
      </UncDocCard>
      <UncDocCard icon="🪝" title="Cauda direcional">
        A cauda fica na base direita do balão enviado e na base esquerda do recebido. A prop{' '}
        <code>tail</code> permite suprimi-la em mensagens consecutivas do mesmo autor.
      </UncDocCard>
      <UncDocCard icon="👥" title="Grupos, encaminhadas e anexos ricos">
        <code>sender</code> identifica quem escreveu, <code>forwardedLabel</code> marca a mensagem
        como &quot;Encaminhada&quot; e <code>LinkPreview</code> e <code>Invite</code> ampliam o tipo
        de conteúdo, sempre com os mesmos tokens do balão.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="MessageBubble"
      layout="Balão · raio 8px · largura máxima 240px"
      specs={[
        { label: 'Enviado (claro · escuro)', value: '#DFDDEB · #57547D' },
        { label: 'Recebido (claro · escuro)', value: '#FFFFFF · #34375C' },
        { label: 'Faixa de anexo (claro · escuro)', value: '#CCC9DE · #34375C' },
        { label: 'Texto', value: 'Open Sans 400 · 16px · --unc-color-text-bubble' },
        { label: 'Metadados', value: 'Open Sans 400 · 12px · --unc-color-text-bubble-meta' },
        { label: 'Tique · estrela (claro · escuro)', value: '#57547D · #DFDDEB' },
        { label: 'Miniatura', value: 'raio 5px · proporção 16 / 9' },
        { label: 'Padding', value: '8px (--unc-spacing-xs)' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Balão enviado em lavanda, e não em acento',
          detail:
            'o balão enviado é `--unc-color-surface-bubble-out` (`brandpurple-200` no claro, `brandpurple-700` no escuro). Texto primário sobre ele passa de 6:1 nos dois temas; o acento (`brandpurple-600` / `400`) ficou reservado a ações, sem competir com o texto do balão.',
        },
        {
          subject: 'Balão recebido separado do enviado',
          detail:
            'o recebido usa `--unc-color-surface-bubble-in` (branco no claro, `brandpurple-800` no escuro), o degrau que preserva a hierarquia de luminância contra o enviado e contra o canvas em cada tema.',
        },
        {
          subject: 'Raio e cauda',
          detail:
            'o balão usa `border-radius` de 8px (`--unc-radius-xl`) e um triângulo CSS de 8×10px na base, no lado da direção; a cauda é da mesma cor da superfície do balão, então acompanha o tema.',
        },
        {
          subject: 'Confirmação de entrega',
          detail:
            '`delivery="sent"` usa o glifo `tick` (`check`) e `delivery="read"` usa `tickDouble` (`done_all`), ambos em `--unc-color-icon-tick`. Cada um tem título acessível ("Entregue" e "Lida"), para que a informação não dependa só da forma.',
        },
        {
          subject: 'Extensões de conversa de grupo',
          detail:
            '`sender` (remetente em `--unc-color-accent`, em negrito) e `forwardedLabel` (selo "Encaminhada", com o glifo `forward`, nos metadados) não têm par na Plataforma Unooria, que não modela conversa em grupo nem mensagem encaminhada.',
        },
        {
          subject: 'Tons do remetente (`senderTone`)',
          detail:
            'em grupo, a cor distingue quem fala. `senderTone` (1 a 8) troca a cor do nome por `--unc-color-sender-1` a `-8`: uma família da paleta da Unooria por tom (roxo, azul-marinho, laranja, vermelho, azul, verde, âmbar e cinza), no degrau que passa de 4,5:1 sobre o balão recebido em cada tema e mantém os oito distantes entre si. O tom N é da mesma família nos dois temas, então a pessoa não muda de cor quando o tema muda. No claro, as famílias quentes da paleta só passam de 4,5:1 sobre o branco em degraus escuros, e o par mais próximo (vermelho e âmbar) fica em ΔE2000 de 9,6; no escuro, o mais próximo fica em 15,5. Sem a prop, o nome segue em `--unc-color-accent`, como antes. O `TypingIndicator` aceita o mesmo `senderTone`.',
        },
        {
          subject: 'Mídia desenhada',
          detail:
            'sem `src`, `MessageBubble.Media` exibe os `children` na moldura e se anuncia como imagem pelo `alt`. É para o produto que desenha a mídia a partir do texto em vez de servir arquivo.',
        },
        {
          subject: 'Mídia acionável',
          detail:
            'com `onClick`, a moldura vira um `<button>` com o mesmo desenho, como a `LinkPreview` acionável; o nome dele é o `actionLabel` (ou o `alt`).',
        },
        {
          subject: 'LinkPreview e Invite',
          detail:
            'a prévia de link e o convite usam a faixa de anexo do balão (`--unc-color-surface-bubble-out-strip`) e o raio de 5px da miniatura; a ação do convite é texto em `--unc-color-accent` sobre o divisor, com alvo de 48px.',
        },
        {
          subject: 'Glifo de PDF',
          detail:
            'o anexo de documento usa `picture_as_pdf` (`filePdf`) da biblioteca de ícones da Unooria, a 22px, herdando a cor do texto do balão.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Balão', role: 'Superfície com raio de 8px e alinhamento pela direção.', token: '--unc-color-surface-bubble-out · --unc-color-surface-bubble-in' },
        { name: 'Cauda', role: 'Triângulo na base, do lado correspondente à direção.', token: 'prop tail' },
        { name: 'Remetente e encaminhada', role: 'Nome de quem escreveu (com senderTone, num dos oito tons) e selo de mensagem encaminhada, no topo do balão.', token: '--unc-color-accent · --unc-color-sender-1…8 · --unc-color-text-bubble-meta' },
        { name: 'Conteúdo', role: 'Texto simples ou os subcomponentes Media, Document, LinkPreview e Invite.', token: '--unc-color-text-bubble' },
        { name: 'Media', role: 'Miniatura com raio de 5px e proporção configurável, com imagem ou mídia desenhada.', token: 'MessageBubble.Media' },
        { name: 'Document', role: 'Faixa com ícone de PDF, nome e metadados.', token: '--unc-color-surface-bubble-out-strip' },
        { name: 'Rodapé', role: 'Estrela, horário e tiques de entrega.', token: '--unc-color-text-bubble-meta · --unc-color-icon-tick · --unc-color-icon-star' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <PorTema label="Variantes e estados">{() => <VariantesDoBalao />}</PorTema>
    <PorTema label="Anexos">{() => <Anexos />}</PorTema>
    <PorTema label="Extensões de grupo">{() => <ExtensoesDeGrupo />}</PorTema>
    <PorTema label="Tons do remetente (senderTone)">{() => <TonsDoRemetente />}</PorTema>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Em contexto"
      description="Sobre a textura de conversa de cada tema, com a etiqueta de data."
    />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
      <ConversaEmContexto theme="light" />
      <ConversaEmContexto theme="dark" />
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={[
        'Suprimir a cauda em mensagens consecutivas do mesmo autor.',
        'Empilhar Media e Document dentro de um único balão quando o anexo for composto.',
        'Usar delivery="read" apenas quando houver confirmação de leitura.',
        'Limitar maxWidth para que o balão não atravesse a largura útil de 411px.',
        'Passar sempre alt em Media: a mídia de uma mensagem é conteúdo, não decoração.',
      ]}
      donts={[
        'Aplicar a cor do balão enviado a mensagens recebidas.',
        'Colocar o horário fora do rodapé do balão.',
        'Usar a estrela para outro significado que não "mensagem favoritada".',
        'Estender o balão até as bordas da tela: mantenha a margem lateral.',
        'Pintar o balão enviado com a cor de acento: o texto do balão perde contraste.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: superfícies dos balões, texto, tiques e cauda acompanham."
    />
    <UncDocThemeSwitcher surface="base">
      {() => (
        <Thread>
          <MessageBubble direction="out" time="09:03" delivery="read" starred>
            Mensagem enviada
          </MessageBubble>
          <MessageBubble direction="in" sender="Bruno Reis" time="09:05">
            Mensagem recebida
          </MessageBubble>
          <MessageBubble direction="out" time="09:06" maxWidth={250}>
            <MessageBubble.Document name="Relatório anual" details={['24 páginas', 'PDF']} />
          </MessageBubble>
        </Thread>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
      title="MessageBubble"
      rows={[
        { name: 'direction', type: "'out' | 'in'", default: "'out'", description: 'Direção do balão, que define cor, alinhamento e lado da cauda.' },
        { name: 'children', type: 'React.ReactNode', description: 'Texto simples ou os subcomponentes Media, Document, LinkPreview e Invite.' },
        { name: 'time', type: 'string', description: 'Horário exibido no rodapé.' },
        { name: 'delivery', type: "'none' | 'sent' | 'read'", default: "'none'", description: 'Estado de entrega: sent mostra o tique simples e read, o duplo.' },
        { name: 'starred', type: 'boolean', default: 'false', description: 'Exibe a estrela de mensagem favoritada.' },
        { name: 'tail', type: 'boolean', default: 'true', description: 'Desenha a cauda triangular na base do balão.' },
        { name: 'maxWidth', type: 'number', default: '240', description: 'Largura máxima do balão em pixels.' },
        { name: 'sender', type: 'React.ReactNode', description: 'Extensão: remetente no topo do balão, em conversa de grupo.' },
        { name: 'senderTone', type: '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8', description: 'Extensão: cor do nome do remetente (--unc-color-sender-N). Ausente, o nome fica em --unc-color-accent.' },
        { name: 'forwardedLabel', type: 'React.ReactNode', description: 'Extensão: selo de mensagem encaminhada, como "Encaminhada".' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UncDocPropsTable
      title="MessageBubble.Media"
      rows={[
        { name: 'src', type: 'string', description: 'URL da imagem anexada. Ausente, a moldura exibe os children.' },
        { name: 'alt', type: 'string', description: 'Texto alternativo. Obrigatório; sem src, vira o nome acessível da moldura.' },
        { name: 'ratio', type: 'string', default: "'16 / 9'", description: 'Proporção da miniatura, em formato CSS aspect-ratio.' },
        { name: 'children', type: 'React.ReactNode', description: 'Extensão: a mídia desenhada, exibida quando não há src.' },
        { name: 'onClick', type: '(event) => void', description: 'Extensão: torna a moldura um botão (abrir em tela cheia).' },
        { name: 'actionLabel', type: 'string', description: 'Nome acessível da ação quando há onClick. Ausente, vale o alt.' },
      ]}
    />
    <UncDocPropsTable
      title="MessageBubble.LinkPreview"
      rows={[
        { name: 'title', type: 'React.ReactNode', description: 'Manchete da página. Obrigatório.' },
        { name: 'description', type: 'React.ReactNode', description: 'Resumo abaixo da manchete.' },
        { name: 'domain', type: 'React.ReactNode', description: 'Domínio no rodapé do cartão. Obrigatório.' },
        { name: 'thumbnail', type: 'React.ReactNode', description: 'Miniatura acima da manchete.' },
        { name: 'onClick', type: '(event) => void', description: 'Torna o cartão um botão.' },
      ]}
    />
    <UncDocPropsTable
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
    <UncDocPropsTable
      title="MessageBubble.Document"
      rows={[
        { name: 'name', type: 'string', description: 'Nome do arquivo anexado. Obrigatório.' },
        { name: 'details', type: 'string[]', default: '[]', description: 'Metadados exibidos abaixo, separados por um ponto.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MessageBubble> = {
  title: 'Unoochat/Componentes/MessageBubble',
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
    senderTone: {
      control: 'select',
      options: [undefined, 1, 2, 3, 4, 5, 6, 7, 8],
      description: 'Extensão: tom do nome do remetente (1 a 8). Ausente, o acento.',
    },
    forwardedLabel: { control: 'text', description: 'Extensão: selo de encaminhada.' },
  },
  args: {
    direction: 'out',
    children: 'As mensagens e as chamadas são protegidas com criptografia de ponta a ponta.',
    time: '09:03',
    delivery: 'read',
    starred: false,
    tail: true,
    maxWidth: 240,
  },
};

export default meta;

type Story = StoryObj<typeof MessageBubble>;

/**
 * Documentação rica e completa do componente.
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
    <UncDocStage surface="base" padding={32} align="flex-start">
      <Thread>
        <MessageBubble {...args} />
      </Thread>
    </UncDocStage>
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
  args: { maxWidth: 250, time: '09:03', delivery: 'read', starred: false, tail: true, direction: 'out' },
  render: (args) => (
    <UncDocStage surface="base" padding={32} align="flex-start">
      <Thread>
        <MessageBubble {...args}>
          <MessageBubble.Media src={uncSamplePhoto} alt="Fotografia enviada" />
        </MessageBubble>
      </Thread>
    </UncDocStage>
  ),
};

/**
 * Playground dedicado ao subcomponente Document.
 */
export const PlaygroundDocument: Story = {
  name: '🕹️ 3. Playground do MessageBubble.Document',
  args: { maxWidth: 250, time: '09:03', delivery: 'read', starred: true, tail: true, direction: 'out' },
  render: (args) => (
    <UncDocStage surface="base" padding={32} align="flex-start">
      <Thread>
        <MessageBubble {...args}>
          <MessageBubble.Document name="Relatório da visita" details={['12 páginas', 'PDF']} />
        </MessageBubble>
      </Thread>
    </UncDocStage>
  ),
};

/**
 * Balão composto: foto, documento, estrela e confirmação de leitura.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial: balão composto',
  render: () => (
    <UncDocStage surface="base" padding={32} align="flex-start">
      <Thread>
        <MessageBubble direction="out" time="09:03" delivery="read" starred maxWidth={250}>
          <MessageBubble.Media src={uncSamplePhoto} alt="Fotografia enviada" />
          <MessageBubble.Document name="Relatório da visita" details={['12 páginas', 'PDF']} />
        </MessageBubble>
      </Thread>
    </UncDocStage>
  ),
};

/**
 * Matriz completa de direções e anexos, nos dois temas.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <PorTema label="Direções e anexos">
      {() => (
        <Thread>
          <MessageBubble direction="out" time="09:03">
            Enviada
          </MessageBubble>
          <MessageBubble direction="in" time="09:05">
            Recebida
          </MessageBubble>
          <MessageBubble direction="out" time="09:06" maxWidth={250}>
            <MessageBubble.Media src={uncSamplePhoto} alt="Fotografia" />
          </MessageBubble>
          <MessageBubble direction="out" time="09:07" maxWidth={250}>
            <MessageBubble.Document name="Relatório" details={['24 páginas', 'PDF']} />
          </MessageBubble>
        </Thread>
      )}
    </PorTema>
  ),
};

/**
 * Estados de entrega, favorita e cauda, nos dois temas.
 */
export const Estados: Story = {
  render: () => (
    <PorTema label="Entrega, favorita e cauda">
      {() => (
        <Thread>
          <MessageBubble direction="out" time="09:03" delivery="none">
            Sem indicador
          </MessageBubble>
          <MessageBubble direction="out" time="09:03" delivery="sent">
            Enviada
          </MessageBubble>
          <MessageBubble direction="out" time="09:03" delivery="read">
            Lida
          </MessageBubble>
          <MessageBubble direction="out" time="09:03" delivery="read" starred>
            Favoritada
          </MessageBubble>
          <MessageBubble direction="out" time="09:04" tail={false}>
            Sem cauda
          </MessageBubble>
        </Thread>
      )}
    </PorTema>
  ),
};

/**
 * Composição modular dos subcomponentes dentro de um mesmo balão.
 */
export const ComposicaoModular: Story = {
  name: 'ComposicaoModular',
  render: () => (
    <UncDocStage surface="base" padding={24} align="flex-start">
      <Thread>
        <MessageBubble direction="out" time="09:03" delivery="read" maxWidth={250}>
          <MessageBubble.Media src={uncSamplePhoto} alt="Fotografia" />
          <MessageBubble.Document name="Relatório da visita" details={['12 páginas', 'PDF']} />
          Legenda da mídia enviada.
        </MessageBubble>
      </Thread>
    </UncDocStage>
  ),
};

/**
 * A mídia com `onClick`: o comunicado desenhado e a fotografia abrem por toque,
 * Enter e Espaço, sem mudar o desenho.
 */
const MidiaQueAbre: React.FC = () => {
  const [aberturas, setAberturas] = React.useState(0);
  const abrir = () => setAberturas((n) => n + 1);

  return (
    <UncDocStage surface="base" padding={24} align="flex-start">
      <Thread>
        <MessageBubble direction="in" sender="Coordenação Pedagógica" time="08:20" maxWidth={260}>
          <MessageBubble.Media
            alt="Comunicado oficial sobre a entrada pelo portão lateral"
            ratio="4 / 3"
            actionLabel="Abrir imagem de Coordenação Pedagógica"
            onClick={abrir}
          >
            <ComunicadoDesenhado />
          </MessageBubble.Media>
          Toque no comunicado para abrir.
        </MessageBubble>
        <MessageBubble direction="in" sender="Camila Duarte" time="08:22" maxWidth={260}>
          <MessageBubble.Media src={uncSamplePhoto} alt="Fotografia enviada" onClick={abrir} />
        </MessageBubble>
      </Thread>
      <p role="status" style={{ margin: 0, color: 'var(--unc-color-text-secondary)', fontSize: 12 }}>
        Aberturas: {aberturas}
      </p>
    </UncDocStage>
  );
};

/**
 * Mídia acionável: com onClick a moldura vira botão, e o leitor de tela a
 * anuncia pelo actionLabel.
 */
export const MidiaAcionavel: Story = {
  render: () => <MidiaQueAbre />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const comunicado = tela.getByRole('button', { name: 'Abrir imagem de Coordenação Pedagógica' });
    const contador = tela.getByRole('status');

    await userEvent.click(comunicado);
    await expect(contador).toHaveTextContent('Aberturas: 1');
    comunicado.focus();
    await userEvent.keyboard('{Enter}');
    await expect(contador).toHaveTextContent('Aberturas: 2');
    await userEvent.click(tela.getByRole('button', { name: 'Fotografia enviada' }));
    await expect(contador).toHaveTextContent('Aberturas: 3');
  },
};

/**
 * Os oito tons do remetente nos dois temas, mais o balão sem `senderTone`. O
 * `play` confere que cada tom vira a classe do modificador e a cor do token, e
 * que sem a prop o nome continua no acento.
 */
export const TonsDoRemetenteNosDoisTemas: Story = {
  name: 'TonsDoRemetente',
  render: () => <PorTema label="senderTone de 1 a 8">{() => <TonsDoRemetente />}</PorTema>,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    for (const { tone, nome } of TONS_DO_REMETENTE) {
      const nomes = tela.getAllByText(nome);
      await expect(nomes).toHaveLength(2);
      for (const elemento of nomes) {
        await expect(elemento).toHaveClass(`unc-messagebubble__sender--tone-${tone}`);
        const token = getComputedStyle(elemento).getPropertyValue(`--unc-color-sender-${tone}`).trim();
        await expect(token).toMatch(/^#[0-9A-F]{6}$/i);
        await expect(getComputedStyle(elemento).color).toBe(hexParaRgb(token));
      }
    }
    for (const semTom of tela.getAllByText('Sem senderTone (acento)')) {
      await expect(semTom.className).toBe('unc-messagebubble__sender');
      const acento = getComputedStyle(semTom).getPropertyValue('--unc-color-accent').trim();
      await expect(getComputedStyle(semTom).color).toBe(hexParaRgb(acento));
    }
  },
};

/**
 * O balão de grupo seguido do indicador de digitação da mesma pessoa, com o
 * mesmo tom.
 */
export const RemetenteDigitando: Story = {
  name: 'RemetenteDigitando',
  render: () => (
    <PorTema label="Mesmo tom no balão e no indicador">
      {() => (
        <Thread>
          <MessageBubble direction="in" sender="Camila Duarte" senderTone={3} time="08:25">
            Alguém sabe quem mandou essa foto primeiro?
          </MessageBubble>
          <TypingIndicator sender="Felipe Nunes" senderTone={6} />
        </Thread>
      )}
    </PorTema>
  ),
};
