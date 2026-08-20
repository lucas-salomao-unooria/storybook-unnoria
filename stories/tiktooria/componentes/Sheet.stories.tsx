import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { CommentItem, Separator, ShareAction, Sheet, SocialLogo } from '../../../src/tiktooria';
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
import { tikComments, tikShareActions } from '../fixtures';

const meta: Meta<typeof Sheet> = {
  title: 'Tik Tooria/Componentes/Sheet',
  component: Sheet,
  parameters: { layout: 'padded' },
  argTypes: {
    ariaLabel: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    ariaLabel: 'Comentários',
  },
};

export default meta;

type Story = StoryObj<typeof Sheet>;


const SheetDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Folha"
      title="Sheet"
      description="Folha inferior das telas “TikTok Comments” e “TikTok Share to”. Superfície #F5F5F4 com raio de 8px apenas nos cantos superiores e sem sombra — o arquivo separa a folha do vídeo apenas pelo contraste de luminância. O corpo rola com barra fina e trilho transparente."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="📄" title="Sem sombra">
        A folha se separa do vídeo por luminância, não por elevação. Acrescentar sombra seria desvio.
      </TikDocCard>
      <TikDocCard icon="📐" title="Raio só no topo">
        8px nos cantos superiores e 0 nos inferiores, porque a folha encosta na barra inferior.
      </TikDocCard>
      <TikDocCard icon="🧩" title="Três partes">
        <code>Sheet</code>, <code>Sheet.Header</code> e <code>Sheet.Body</code>. O cabeçalho traz título centralizado e botão de fechar opcional.
      </TikDocCard>
      <TikDocCard icon="📜" title="Rolagem discreta">
        O corpo usa <code>scrollbar-width: thin</code> com trilho transparente, eliminando a barra cinza do Windows.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:964"
      frameName="Comments — TikTok Comments"
      specs={[
        { label: 'Superfície', value: '#F5F5F4' },
        { label: 'Raio superior', value: '8px' },
        { label: 'Título', value: 'Semibold 13 centralizado' },
        { label: 'Fechar', value: 'glifo de 9,5px a 19,25px da borda' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Altura por conteúdo',
          detail:
            'o arquivo fixa 571px na folha de comentários e 226px na de compartilhamento. O componente calcula a altura pelo conteúdo, para que a folha funcione com listas de tamanhos diferentes.',
        },
        {
          subject: 'Papel de diálogo não modal',
          detail:
            'o arquivo não descreve comportamento de foco nem véu atrás da folha. O componente declara role="dialog" com aria-modal="false", que descreve o que o design mostra: uma folha sobre o conteúdo, sem bloquear o que está atrás.',
        },
        {
          subject: 'Barra de rolagem',
          detail:
            'não existe no arquivo. A barra fina com trilho transparente foi acrescentada seguindo a diretriz de scrollbars sutis do design system.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Folha', role: 'Superfície de folha com raio superior de 8px, sem sombra.', token: '--tik-color-surface-sheet · --tik-radius-xxl' },
        { name: 'Cabeçalho', role: 'Título em Semibold 13 centralizado e botão de fechar opcional.', token: '--tik-font-meta-strong-*' },
        { name: 'Corpo', role: 'Área rolável com barra fina e trilho transparente.', token: '--tik-color-border-hairline' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Folha de comentários — como no arquivo" surface="immersive" align="stretch" direction="column" width={414}>
      <Sheet ariaLabel="Comentários">
        <Sheet.Header title="579 comments" showClose />
        <Sheet.Body style={{ maxHeight: 320 }}>
          {tikComments.map((comment) => (
            <CommentItem key={comment.author} {...comment} />
          ))}
        </Sheet.Body>
      </Sheet>
    </TikDocStage>
    <TikDocStage label="Folha de compartilhamento — como no arquivo" surface="immersive" align="stretch" direction="column" width={414}>
      <Sheet ariaLabel="Compartilhar">
        <Sheet.Header title="Share to" />
        <Sheet.Body>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
            <ShareAction label="WhatsApp" media={<SocialLogo brand="whatsapp" />} />
            <ShareAction label="Message" media={<SocialLogo brand="message" size={49} />} />
            <ShareAction label="SMS" media={<SocialLogo brand="sms" size={49} />} />
            <ShareAction label="Instagram" media={<SocialLogo brand="instagram" size={49} />} />
          </div>
          <div style={{ padding: '16px 0' }}>
            <Separator tone="sheet" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px 20px' }}>
            {tikShareActions.slice(0, 4).map((action) => (
              <ShareAction key={action.label} label={action.label} icon={action.icon} />
            ))}
          </div>
        </Sheet.Body>
      </Sheet>
    </TikDocStage>
    <TikDocStage label="Sem cabeçalho" surface="immersive" align="stretch" direction="column" width={414}>
      <Sheet ariaLabel="Folha sem cabeçalho">
        <Sheet.Body>
          <div style={{ padding: 20, fontFamily: 'var(--tik-font-sans)', fontSize: 15 }}>
            Corpo sem cabeçalho
          </div>
        </Sheet.Body>
      </Sheet>
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use Sheet.Header com título curto e centralizado.',
        'Ligue showClose apenas quando houver como fechar a folha.',
        'Limite a altura do Sheet.Body para que a rolagem aconteça dentro da folha.',
        'Coloque a folha sobre o conteúdo, encostada na barra inferior.',
      ]}
      donts={[
        'Não acrescente sombra à folha.',
        'Não arredonde os cantos inferiores.',
        'Não use a folha como diálogo modal: o arquivo não descreve véu nem confinamento de foco.',
        'Não role a página inteira quando a lista crescer — role o corpo.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher initial="immersive" padding={0}>
      {() => (
        <div style={{ width: 414 }}>
          <Sheet ariaLabel="Comentários">
            <Sheet.Header title="579 comments" showClose />
            <Sheet.Body style={{ maxHeight: 200 }}>
              {tikComments.slice(0, 3).map((comment) => (
                <CommentItem key={comment.author} {...comment} />
              ))}
            </Sheet.Body>
          </Sheet>
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="Sheet"
      rows={[
        {
          name: 'ariaLabel',
          type: "string",
          description:
            'Rótulo acessível da folha, quando não há cabeçalho com título.',
        },
        {
          name: 'children',
          type: "React.ReactNode",
          description:
            'Cabeçalho e corpo da folha.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "React.HTMLAttributes<HTMLDivElement>",
          description:
            'Demais atributos HTML são repassados ao contêiner.',
        },
      ]}
    />
    <TikDocPropsTable
      title="Sheet.Header"
      rows={[
        {
          name: 'title',
          type: "React.ReactNode",
          description:
            'Título centralizado, em Semibold 13.',
        },
        {
          name: 'showClose',
          type: "boolean",
          default: "false",
          description:
            'Exibe o botão de fechar à direita.',
        },
        {
          name: 'closeLabel',
          type: "string",
          default: "Fechar",
          description:
            'Rótulo acessível do botão de fechar.',
        },
        {
          name: 'onClose',
          type: "() => void",
          description:
            'Acionado ao clicar no botão de fechar.',
        },
        {
          name: 'children',
          type: "React.ReactNode",
          description:
            'Conteúdo livre no cabeçalho.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
      ]}
    />
    <TikDocPropsTable
      title="Sheet.Body"
      rows={[
        {
          name: 'children',
          type: "React.ReactNode",
          description:
            'Conteúdo rolável.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "React.HTMLAttributes<HTMLDivElement>",
          description:
            'Demais atributos HTML, incluindo style para limitar a altura.',
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
  render: () => <SheetDocumentationPage />,
};

/**
 * Playground com 100% das props do Sheet expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Sheet',
  render: (args) => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-immersive)', padding: '40px 0 0' }}>
      <Sheet {...args}>
        <Sheet.Header title="579 comments" showClose />
        <Sheet.Body style={{ maxHeight: 280 }}>
          {tikComments.map((comment) => (
            <CommentItem key={comment.author} {...comment} />
          ))}
        </Sheet.Body>
      </Sheet>
    </div>
  ),
};

/**
 * Réplica visual das duas folhas publicadas pelo Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ width: 414, background: 'var(--tik-color-surface-immersive)', paddingTop: 40 }}>
        <Sheet ariaLabel="Comentários">
          <Sheet.Header title="579 comments" showClose />
          <Sheet.Body style={{ maxHeight: 420 }}>
            {tikComments.map((comment) => (
              <CommentItem key={comment.author} {...comment} />
            ))}
          </Sheet.Body>
        </Sheet>
      </div>
      <div style={{ width: 414, background: 'var(--tik-color-surface-immersive)', paddingTop: 40 }}>
        <Sheet ariaLabel="Compartilhar">
          <Sheet.Header title="Share to" />
          <Sheet.Body>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
              <ShareAction label="WhatsApp" media={<SocialLogo brand="whatsapp" />} />
              <ShareAction label="WhatsApp status" media={<SocialLogo brand="whatsapp" />} />
              <ShareAction label="Message" media={<SocialLogo brand="message" size={49} />} />
              <ShareAction label="SMS" media={<SocialLogo brand="sms" size={49} />} />
              <ShareAction label="Messenger" media={<SocialLogo brand="messenger" />} />
              <ShareAction label="Instagram" media={<SocialLogo brand="instagram" size={49} />} />
            </div>
            <div style={{ padding: '16px 0' }}>
              <Separator tone="sheet" />
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px 20px' }}
            >
              {tikShareActions.map((action) => (
                <ShareAction key={action.label} label={action.label} icon={action.icon} />
              ))}
            </div>
          </Sheet.Body>
        </Sheet>
      </div>
    </div>
  ),
};

/**
 * Com cabeçalho, com fechar e sem cabeçalho.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(
        [
          { label: 'Com título', header: <Sheet.Header title="Share to" /> },
          { label: 'Com fechar', header: <Sheet.Header title="579 comments" showClose /> },
          { label: 'Sem cabeçalho', header: null },
        ] as const
      ).map((variant) => (
        <div key={variant.label} style={{ width: 300 }}>
          <Sheet ariaLabel={variant.label}>
            {variant.header}
            <Sheet.Body>
              <div
                style={{
                  padding: 20,
                  fontFamily: 'var(--tik-font-sans)',
                  fontSize: 'var(--tik-font-body-size)',
                  color: 'var(--tik-color-text-secondary)',
                }}
              >
                {variant.label}
              </div>
            </Sheet.Body>
          </Sheet>
        </div>
      ))}
    </div>
  ),
};

/**
 * Composição modular com Sheet.Header e Sheet.Body.
 */
export const ComposicaoModular: Story = {
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-immersive)', paddingTop: 40 }}>
      <Sheet ariaLabel="Comentários">
        <Sheet.Header title="579 comments" showClose onClose={() => undefined} />
        <Sheet.Body style={{ maxHeight: 240 }}>
          {tikComments.map((comment) => (
            <CommentItem key={comment.author} {...comment} />
          ))}
        </Sheet.Body>
      </Sheet>
    </div>
  ),
};
