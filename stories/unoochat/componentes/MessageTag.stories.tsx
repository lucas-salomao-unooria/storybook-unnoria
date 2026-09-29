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
} from '../../../.storybook/components';
import { ChatWallpaper, MessageBubble, MessageTag } from '../../../src/unoochat';
import { uncWallpaper, uncWallpaperFor } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente MessageTag.
 */
const MessageTagDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Extensões"
      title="MessageTag"
      description="Etiqueta de classificação presa a uma mensagem: pictograma mais rótulo, numa cápsula neutra. Não tem variante de cor: quem distingue uma etiqueta da outra é o rótulo e a forma do pictograma. Extensão do módulo, sem par na Plataforma Unooria."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🏷️" title="Classificar uma mensagem">
        Uma afirmação sobre a mensagem, presa a ela: “falsa”, “verdadeira”, “emocional”. A etiqueta
        não altera o balão, apenas o acompanha.
      </UncDocCard>
      <UncDocCard icon="👁️" title="Sem depender de cor">
        Duas etiquetas lado a lado se distinguem pela forma do pictograma e pelo rótulo por extenso.
        Quem não enxerga cor lê a mesma coisa.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="MessageTag"
      layout="Cápsula · 24px de altura mínima"
      specs={[
        { label: 'Superfície', value: '--unc-color-surface-elevated · #FFFFFF · #57547D' },
        { label: 'Contorno', value: '1px · --unc-color-border-control · #617379 · #A7B5B9' },
        { label: 'Rótulo', value: 'Open Sans 700 · 12px · --unc-color-text-primary' },
        { label: 'Raio', value: '20px (--unc-radius-pill)' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Extensão sem par na Plataforma Unooria',
          detail:
            'a Plataforma não publica uma etiqueta de classificação de mensagem. A cápsula usa a superfície elevada do menu e o contorno do controle, neutros de propósito, e o tamanho de 12px dos horários (Caption/Bold) em peso 700.',
        },
        {
          subject: 'Sem escada de severidade',
          detail:
            'a conversa não tem escada de cores de sucesso e alerta. Dar cor à etiqueta seria inventar semântica e esconderia a informação de quem não enxerga cor.',
        },
        {
          subject: 'Pictograma é caractere, não desenho',
          detail:
            'o slot icon aceita um caractere ou um Icon do módulo. Nenhum vetor foi desenhado para as etiquetas; quem precisar de glifos próprios injeta o seu.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Pictograma', role: 'Caractere ou Icon, decorativo (aria-hidden).', token: '—' },
        { name: 'Rótulo', role: 'A afirmação, por extenso.', token: '--unc-color-text-primary' },
        {
          name: 'Cápsula',
          role: 'Contorno neutro sobre a superfície elevada.',
          token: '--unc-color-surface-elevated · --unc-color-border-control',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de uso"
      description="As quatro classes de exemplo e, abaixo, duas etiquetas independentes sob um balão."
    />
    <UncDocStage surface="canvas" padding={28} gap={12}>
      <MessageTag icon="✅">Verdadeira</MessageTag>
      <MessageTag icon="❌">Falsa</MessageTag>
      <MessageTag icon="🔥">Emocional</MessageTag>
      <MessageTag icon="💬">Neutra</MessageTag>
    </UncDocStage>
    <div style={{ width: 411, marginBottom: 32 }}>
      <ChatWallpaper src={uncWallpaper}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 6,
            padding: '18px 12px',
          }}
        >
          <MessageBubble
            direction="out"
            forwardedLabel="Encaminhada"
            time="09:04"
            delivery="read"
          >
            A diretoria regional exige autorização com firma reconhecida em cartório.
          </MessageBubble>
          <div style={{ display: 'flex', gap: 6 }}>
            <MessageTag icon="❌">Falsa</MessageTag>
            <MessageTag icon="💬">Neutra</MessageTag>
          </div>
        </div>
      </ChatWallpaper>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Escrever o rótulo por extenso, sempre.',
        'Usar pictogramas de formas diferentes para classes diferentes.',
        'Manter a etiqueta junto à mensagem que ela classifica.',
      ]}
      donts={[
        'Distinguir duas etiquetas apenas pela cor.',
        'Usar como contador: para isso existe o Badge.',
        'Esconder o rótulo e deixar só o pictograma.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A cápsula usa a superfície elevada de cada tema, de modo que o contorno e o rótulo mantêm o contraste."
    />
    <UncDocThemeSwitcher surface="base">
      {(theme) => (
        <div style={{ width: 411 }}>
          <ChatWallpaper src={uncWallpaperFor(theme)}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 6,
                padding: '18px 12px',
              }}
            >
              <MessageBubble direction="out" time="09:04" delivery="read">
                Amanhã não haverá aula por causa da manutenção do prédio.
              </MessageBubble>
              <div style={{ display: 'flex', gap: 6 }}>
                <MessageTag icon="✅">Verdadeira</MessageTag>
                <MessageTag icon="💬">Neutra</MessageTag>
              </div>
            </div>
          </ChatWallpaper>
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="MessageTag"
      rows={[
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Rótulo por extenso. Obrigatório: é ele, e não a cor, que diz o que a etiqueta afirma.',
        },
        { name: 'icon', type: 'React.ReactNode', description: 'Pictograma antes do rótulo, decorativo.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLSpanElement>',
          description: 'Repassados ao elemento raiz.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MessageTag> = {
  title: 'Unoochat/Componentes/MessageTag',
  component: MessageTag,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Rótulo por extenso.' },
    icon: { control: 'text', description: 'Pictograma antes do rótulo.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: { children: 'Verdadeira', icon: '✅' },
};

export default meta;

type Story = StoryObj<typeof MessageTag>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MessageTagDocumentationPage />,
};

/**
 * Playground com 100% das props do MessageTag expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do MessageTag',
  render: (args) => (
    <UncDocStage surface="canvas" padding={40}>
      <MessageTag {...args} />
    </UncDocStage>
  ),
};
