import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { OpinionBox } from '../../../src/unoojornal/components/OpinionBox';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocGrid,
  UjnDocCard,
  UjnDocSpecs,
  UjnDocDecisions,
  UjnDocAnatomy,
  UjnDocStage,
  UjnDocPractices,
  UjnDocThemeSwitcher,
  UjnDocPropsTable,
} from '../../../.storybook/components';
import { autoriaDe, materiaDeOpiniao } from './capa.demo';

const BAR = '#716C98';

/** Espiões das estórias de interação. */
const openSpy = fn();
const linkSpy = fn();

const trechoDaCitacao = materiaDeOpiniao.body.find((block) => block.type === 'quote');

const opiniao = {
  title: materiaDeOpiniao.title,
  quote: trechoDaCitacao && trechoDaCitacao.type === 'quote' ? trechoDaCitacao.text : materiaDeOpiniao.deck,
  author: autoriaDe(materiaDeOpiniao).name,
  meta: 'Espaço Aberto',
};

/**
 * Página de documentação rica do componente OpinionBox.
 */
const OpinionBoxDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Capa"
      title="OpinionBox"
      description="Caixa lateral “Opinião em destaque”: sobrescrito com o glifo de opinião, título, citação em itálico, autoria e o espaço de origem (“Espaço Aberto”). Cartão plano, com a barra de 3px que marca a voz da redação."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="O texto de opinião da edição, na barra lateral da capa."
    />
    <UjnDocGrid>
      <UjnDocCard icon="📣" title="Voz da redação">
        Separa a opinião da reportagem: o sobrescrito e a barra lateral dizem, sem depender de cor,
        que este texto não é notícia.
      </UjnDocCard>
      <UjnDocCard icon="❝" title="Trecho em destaque">
        A citação usa o degrau <code>quote</code>, em itálico, entre aspas tipográficas que o
        próprio componente acrescenta.
      </UjnDocCard>
      <UjnDocCard icon="🎯" title="Um alvo só">
        O título é o alvo e o cartão clica por pseudo-elemento: um ponto de foco, nome acessível
        igual ao título.
      </UjnDocCard>
      <UjnDocCard icon="🏷️" title="Autoria e espaço">
        A autoria em negrito e, ao lado, o espaço (“Espaço Aberto”) em tom discreto.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="OpinionBox"
      layout="Cartão · coluna lateral (384px no jornal)"
      specs={[
        { label: 'Superfície', value: '--ujn-color-background-card · fio de 1px border-subtle' },
        { label: 'Barra lateral', value: '--ujn-rule-thick (3px) em action-primary' },
        { label: 'Raio', value: '--ujn-radius-xs (2px)' },
        { label: 'Sobrescrito', value: 'kicker 12/18px · caixa alta · text-accent · glifo opinion' },
        { label: 'Título', value: 'title-md · Open Sans 600 · 20/30px' },
        { label: 'Citação', value: 'quote 24/34px · itálico · text-secondary' },
        { label: 'Autoria', value: 'body-sm 14/20px · negrito' },
        { label: 'Foco', value: 'anel de 2px em focus-ring, por dentro do cartão' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Barra de 3px como pista não cromática',
          detail:
            'a barra à esquerda e o sobrescrito com glifo distinguem a opinião da notícia. A cor reforça, mas não carrega a informação sozinha.',
        },
        {
          subject: 'Aspas acrescentadas pelo componente',
          detail:
            'quote recebe o texto sem aspas e o componente as acrescenta (“…”): evita aspas retas e dobradas, e o <blockquote> segue o texto puro.',
        },
        {
          subject: 'Citação em itálico, Open Sans',
          detail:
            'o arquivo de origem usa serifa para a citação; aqui é Open Sans em itálico no degrau quote, o que mantém a família da plataforma.',
        },
        {
          subject: 'Fio, não sombra',
          detail: 'o cartão se separa por fio de 1px; o hover é só realce (--ujn-color-state-hover).',
        },
        {
          subject: 'Client Component',
          detail: 'recebe onOpen e o liga ao título; por isso começa com \'use client\'.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocStage label="Largura da coluna lateral" surface="page" align="flex-start" padding={24}>
      <div style={{ width: 384 }}>
        <OpinionBox {...opiniao} href="#opiniao" />
      </div>
    </UjnDocStage>
    <UjnDocAnatomy
      zones={[
        { name: 'Barra lateral', role: 'Marca a voz da redação.', token: '--ujn-rule-thick · --ujn-color-action-primary' },
        { name: 'Sobrescrito', role: 'Glifo e rótulo em caixa alta.', token: '--ujn-font-kicker-* · --ujn-color-text-accent' },
        { name: 'Título (alvo)', role: 'Link ou botão que cobre o cartão.', token: '--ujn-font-title-md-*' },
        { name: 'Citação', role: 'Trecho em itálico, entre aspas.', token: '--ujn-font-quote-*' },
        { name: 'Autoria e espaço', role: 'Nome em negrito; espaço em tom discreto.', token: '--ujn-font-body-sm-*' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Link, botão, só informativo e com sobrescrito próprio."
    />
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      {[
        { label: 'Link', props: { href: '#link' } },
        { label: 'Botão', props: { onOpen: () => undefined } },
        { label: 'Só informa', props: {} },
        { label: 'Sobrescrito próprio', props: { href: '#carta', eyebrow: 'Carta do leitor', meta: undefined } },
      ].map(({ label, props }) => (
        <div key={label} style={{ width: 320 }}>
          <OpinionBox {...opiniao} {...props} />
        </div>
      ))}
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Escolher um trecho curto: duas ou três linhas de citação.',
        'Informar o espaço de origem em meta (“Espaço Aberto”).',
        'Usar href quando o texto tem endereço próprio.',
        'Mantê-lo na barra lateral, longe do destaque de reportagem.',
      ]}
      donts={[
        'Usar o OpinionBox para notícia: a barra e o sobrescrito dizem “opinião”.',
        'Escrever as aspas dentro de quote: o componente já as põe.',
        'Colocar links dentro da citação.',
        'Tirar o sobrescrito: é ele que nomeia o gênero do texto.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfície, barra, texto e citação acompanham data-ujn-theme."
    />
    <UjnDocThemeSwitcher surface="page" padding={24}>
      {() => (
        <div style={{ width: 384 }}>
          <OpinionBox {...opiniao} href="#opiniao" />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="OpinionBox"
      rows={[
        { name: 'eyebrow', type: 'string', default: "'Opinião em destaque'", description: 'Sobrescrito acima do título.' },
        { name: 'title', type: 'string', description: 'Título; é o alvo principal. Obrigatório.' },
        { name: 'quote', type: 'string', description: 'Trecho em destaque, sem aspas. Obrigatório.' },
        { name: 'author', type: 'string', description: 'Autoria. Obrigatória.' },
        { name: 'meta', type: 'string', description: 'Espaço de origem, ao lado da autoria.' },
        { name: 'href', type: 'string', description: 'Faz do título um <a>.' },
        { name: 'onOpen', type: '(event: MouseEvent<HTMLElement>) => void', description: 'Abre o texto; sem href, faz do título um <button>.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos do <article>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof OpinionBox> = {
  title: 'Unoojornal/Componentes/OpinionBox',
  component: OpinionBox,
  parameters: { layout: 'padded' },
  argTypes: {
    eyebrow: { control: 'text', description: 'Sobrescrito.' },
    title: { control: 'text', description: 'Título (alvo principal).' },
    quote: { control: 'text', description: 'Trecho em destaque, sem aspas.' },
    author: { control: 'text', description: 'Autoria.' },
    meta: { control: 'text', description: 'Espaço de origem.' },
    href: { control: 'text', description: 'Endereço (faz do título um link).' },
    onOpen: { action: 'onOpen', description: 'Abre o texto.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    eyebrow: 'Opinião em destaque',
    ...opiniao,
  },
};

export default meta;

type Story = StoryObj<typeof OpinionBox>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <OpinionBoxDocumentationPage />,
};

/**
 * Playground da caixa, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do OpinionBox',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} surface="page" align="flex-start" padding={24}>
      <div style={{ width: 384 }}>
        <OpinionBox {...args} href={args.href || undefined} />
      </div>
    </UjnDocStage>
  ),
};

/**
 * A caixa na barra lateral de 384px da capa.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: barra lateral',
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24}>
      <div style={{ width: 384 }}>
        <OpinionBox {...opiniao} href="#opiniao" />
      </div>
    </UjnDocStage>
  ),
};

/**
 * Larguras de 384, 320 e 260px.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      {[384, 320, 260].map((width) => (
        <div key={width} style={{ width }}>
          <OpinionBox {...opiniao} href="#largura" />
        </div>
      ))}
    </UjnDocStage>
  ),
};

/**
 * Link, botão e só informativo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      <div style={{ width: 320 }}>
        <OpinionBox {...opiniao} href="#link" />
      </div>
      <div style={{ width: 320 }}>
        <OpinionBox {...opiniao} onOpen={() => undefined} />
      </div>
      <div style={{ width: 320 }}>
        <OpinionBox {...opiniao} />
      </div>
    </UjnDocStage>
  ),
};

/**
 * Sem o espaço de origem, com sobrescrito próprio e com citação longa.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      <div style={{ width: 320 }}>
        <OpinionBox {...opiniao} meta={undefined} href="#sem-meta" />
      </div>
      <div style={{ width: 320 }}>
        <OpinionBox {...opiniao} eyebrow="Carta do leitor" href="#carta" />
      </div>
      <div style={{ width: 320 }}>
        <OpinionBox
          {...opiniao}
          quote="Mais conteúdo não significa, necessariamente, mais aprendizagem: estudantes que descansam, se movimentam e conversam voltam à sala mais atentos."
          href="#longa"
        />
      </div>
    </UjnDocStage>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="flex-start" padding={24}>
          <div style={{ width: 360 }}>
            <OpinionBox {...opiniao} href="#tema" />
          </div>
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: o título abre por clique e por Enter, o link mantém o `href` e a
 * citação chega entre aspas.
 */
export const Abrir: Story = {
  name: 'Interação: abrir o texto',
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      <div style={{ width: 340 }}>
        <OpinionBox {...opiniao} onOpen={openSpy} />
      </div>
      <div style={{ width: 340 }}>
        <OpinionBox
          {...opiniao}
          title="Um segundo texto de opinião"
          href="#segundo"
          onOpen={(event) => {
            event.preventDefault();
            linkSpy();
          }}
        />
      </div>
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    openSpy.mockClear();
    linkSpy.mockClear();
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', { name: opiniao.title });
    await userEvent.click(button);
    await expect(openSpy).toHaveBeenCalledTimes(1);
    button.focus();
    await userEvent.keyboard('{Enter}');
    await expect(openSpy).toHaveBeenCalledTimes(2);

    const link = canvas.getByRole('link', { name: 'Um segundo texto de opinião' });
    await expect(link).toHaveAttribute('href', '#segundo');
    await userEvent.click(link);
    await expect(linkSpy).toHaveBeenCalledTimes(1);

    await expect(canvas.getAllByText(`“${opiniao.quote}”`)).toHaveLength(2);
  },
};
