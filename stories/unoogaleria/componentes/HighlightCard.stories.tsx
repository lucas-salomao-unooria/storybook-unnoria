import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { HighlightCard } from '../../../src/unoogaleria/components/HighlightCard';
import { SectionHeader } from '../../../src/unoogaleria/components/SectionHeader';
import { TopBar } from '../../../src/unoogaleria/components/TopBar';
import { TabBar } from '../../../src/unoogaleria/components/TabBar';
import type { UglTabBarItem } from '../../../src/unoogaleria/components/TabBar';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { uglFormatCount, uglGroupMedia } from '../../../src/unoogaleria/media';
import type { UglMediaItem } from '../../../src/unoogaleria/media';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocCard,
  UglDocGrid,
  UglDocSpecs,
  UglDocDecisions,
  UglDocAnatomy,
  UglDocPractices,
  UglDocStage,
  UglDocThemeSwitcher,
  UglDocPropsTable,
} from '../../../.storybook/components';
import { uglDemoNow, uglMediaItems } from '../fixtures';

const BAR = '#716C98';

/** Meses e anos da biblioteca de demonstração. */
const MESES = uglGroupMedia(uglMediaItems, 'month', { now: uglDemoNow });
const ANOS = uglGroupMedia(uglMediaItems, 'year', { now: uglDemoNow });

/** A memória: os itens da viagem à Chapada. */
const VIAGEM = uglMediaItems.filter((item) => item.albumIds?.includes('chapada'));
/** Capas do mosaico: a viagem primeiro, completada pelo resto da biblioteca. */
const ACERVO = [...VIAGEM, ...uglMediaItems.filter((item) => !VIAGEM.includes(item) && item.type === 'photo')];
const capa = (itens: UglMediaItem[]) => itens[0];
const mosaicoDe = (itens: UglMediaItem[], quantos: number) =>
  itens.slice(1, 1 + quantos).map((item) => ({ src: item.src, alt: item.alt }));

const ABAS: UglTabBarItem[] = [
  { id: 'biblioteca', label: 'Biblioteca', icon: 'library', iconActive: 'libraryFilled' },
  { id: 'para-voce', label: 'Para você', icon: 'memories', iconActive: 'memoriesFilled' },
  { id: 'albuns', label: 'Álbuns', icon: 'albums', iconActive: 'albumsFilled' },
  { id: 'busca', label: 'Busca', icon: 'search' },
];

/**
 * "Para você" no aparelho: a memória em destaque e os meses.
 */
const TelaParaVoce: React.FC<{ theme?: 'light' | 'dark'; onOpen?: () => void }> = ({ theme, onOpen }) => (
  <PhoneFrame scale={0.75} theme={theme}>
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', background: 'var(--ugl-color-background-primary)', paddingBottom: 'calc(var(--ugl-safe-area-bottom) + 66px)' }}>
      <TopBar title="Para você" />
      <div style={{ padding: '4px 16px 8px' }}>
        <HighlightCard
          size="lg"
          eyebrow="Memória"
          title="Viagem à Chapada"
          subtitle="Setembro de 2026"
          count={uglFormatCount(VIAGEM)}
          coverSrc={capa(VIAGEM).src}
          coverAlt={capa(VIAGEM).alt}
          mosaic={mosaicoDe(ACERVO, 2)}
          onClick={onOpen ?? (() => undefined)}
        />
      </div>
      <SectionHeader title="Meses" size="lg" />
      <div style={{ display: 'grid', gap: 12, padding: '4px 16px' }}>
        {MESES.map((mes) => (
          <HighlightCard
            key={mes.id}
            title={mes.title}
            subtitle={mes.subtitle}
            count={uglFormatCount(mes.items)}
            coverSrc={capa(mes.items).src}
            coverAlt={capa(mes.items).alt}
            onClick={onOpen ?? (() => undefined)}
          />
        ))}
      </div>
    </div>
    <TabBar items={ABAS} activeId="para-voce" floating />
  </PhoneFrame>
);

/**
 * Página de documentação rica do componente HighlightCard.
 */
const HighlightCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Memórias"
      title="HighlightCard"
      description="Cartão grande de capa para os Meses e Anos da biblioteca e para as Memórias: a capa ocupa o cartão (ou a coluna larga de um mosaico) e o título fica na base, em branco sobre o véu em degradê da mídia."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="Resumos visuais de um período." />
    <UglDocGrid>
      <UglDocCard icon="🗓️" title="Meses e anos">
        Em <code>md</code> (220px), um cartão por mês ou por ano, com a contagem de{' '}
        <code>uglFormatCount</code> na cápsula do canto.
      </UglDocCard>
      <UglDocCard icon="✨" title="Memória em destaque">
        Em <code>lg</code> (320px), com o sobretítulo “Memória” e um mosaico de até três capas extras.
      </UglDocCard>
      <UglDocCard icon="🌗" title="Invariante sobre a capa">
        Texto e cápsula usam <code>--ugl-color-media-text</code> e o véu da mídia: o fundo é a
        fotografia, e não a superfície do tema.
      </UglDocCard>
      <UglDocCard icon="♿" title="Botão ou figura">
        Com <code>onClick</code>, é um botão nomeado pelo texto. Sem, é uma <code>&lt;figure&gt;</code>{' '}
        com as imagens descritas pelo <code>alt</code>.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" description="Medidas e escolhas de composição." />
    <UglDocSpecs
      component="HighlightCard"
      layout="Capa · texto na base"
      specs={[
        { label: 'Altura md', value: '220px' },
        { label: 'Altura lg', value: '320px' },
        { label: 'Raio', value: '--ugl-radius-l (16px)' },
        { label: 'Véu', value: '--ugl-gradient-media-bottom' },
        { label: 'Título md', value: 'title-lg · 20/30' },
        { label: 'Título lg', value: 'heading · 24/34' },
        { label: 'Mosaico', value: 'capa 2fr + até 3 extras 1fr · espaço 2px' },
        { label: 'Contagem', value: 'cápsula media-scrim · caption-strong' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Imagens decorativas no botão',
          detail:
            'com onClick, as imagens ficam com alt vazio e o nome do botão é o próprio texto ("Memória Viagem à Chapada Setembro de 2026 5 fotos"): ler quatro descrições de foto antes do título atrasaria o destino. Sem onClick, é uma figura e cada imagem mantém o alt.',
        },
        {
          subject: 'Contraste sobre qualquer foto',
          detail:
            'o texto fica sobre o degradê que termina em media-scrim (roxo profundo a 60%): sobre uma foto branca, o branco na base mede cerca de 5:1. O título tem no máximo duas linhas.',
        },
        {
          subject: 'Contagem já formatada',
          detail:
            'count recebe texto ("42 fotos, 3 vídeos"), e não número: quem monta o cartão decide entre uglFormatCount, "12 itens" ou nada.',
        },
        {
          subject: 'Mosaico à direita',
          detail:
            'as capas extras empilham numa coluna de um terço, à direita; a base fica livre na capa principal para o texto. Mais de três extras são ignoradas.',
        },
        {
          subject: 'Server Component',
          detail: 'sem hooks nem manipuladores montados: onClick vai direto ao <button> nativo.',
        },
        {
          subject: 'Medida local',
          detail: '--ugl-highlight-card-height (220px no md, 320px no lg).',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Capa, mosaico, véu, cápsula e texto." />
    <UglDocStage label="Memória com mosaico" surface="primary" align="flex-start" padding={16}>
      <div style={{ width: 358 }}>
        <HighlightCard
          size="lg"
          eyebrow="Memória"
          title="Viagem à Chapada"
          subtitle="Setembro de 2026"
          count={uglFormatCount(VIAGEM)}
          coverSrc={capa(VIAGEM).src}
          coverAlt={capa(VIAGEM).alt}
          mosaic={mosaicoDe(ACERVO, 3)}
          onClick={() => undefined}
        />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Capa', role: 'Imagem principal, na coluna larga quando há mosaico.', token: '--ugl-radius-l · --ugl-color-background-tertiary' },
            { name: 'Mosaico', role: 'Até três capas extras empilhadas à direita.', token: '--ugl-grid-gap' },
            { name: 'Véu', role: 'Degradê da base, atrás do texto.', token: '--ugl-gradient-media-bottom' },
            { name: 'Contagem', role: 'Cápsula no canto superior direito.', token: '--ugl-color-media-scrim · --ugl-color-media-text' },
            { name: 'Texto', role: 'Sobretítulo, título (até duas linhas) e linha de apoio.', token: '--ugl-color-media-text' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes, tamanhos e estados" description="Tamanhos, mosaico e composição do texto." />
    <UglDocStage label="Mosaico: 0, 1, 2 e 3 capas extras" surface="primary" align="flex-start" padding={16} gap={16}>
      {[0, 1, 2, 3].map((quantos) => (
        <div key={quantos} style={{ width: 300 }}>
          <HighlightCard
            title="Viagem à Chapada"
            subtitle={`${quantos} extras`}
            coverSrc={capa(VIAGEM).src}
            coverAlt={capa(VIAGEM).alt}
            mosaic={mosaicoDe(ACERVO, quantos)}
            onClick={() => undefined}
          />
        </div>
      ))}
    </UglDocStage>
    <UglDocStage label="Meses e anos" surface="primary" align="flex-start" padding={16} gap={16}>
      {[...MESES.slice(0, 2), ...ANOS].map((grupo) => (
        <div key={grupo.id} style={{ width: 300 }}>
          <HighlightCard
            title={grupo.title}
            subtitle={grupo.subtitle}
            count={uglFormatCount(grupo.items)}
            coverSrc={capa(grupo.items).src}
            coverAlt={capa(grupo.items).alt}
            onClick={() => undefined}
          />
        </div>
      ))}
    </UglDocStage>
    <UglDocStage label="No aparelho" surface="secondary" padding={16}>
      <TelaParaVoce />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso do cartão de capa." />
    <UglDocPractices
      dos={[
        'Escolher uma capa com o assunto no terço de cima: a base fica sob o texto.',
        'Usar lg para uma memória por vez, em destaque, e md para listas de meses e anos.',
        'Formatar a contagem com uglFormatCount.',
        'Dar coverAlt descritivo: sem onClick, é ele que descreve a figura.',
      ]}
      donts={[
        'Pôr ações dentro do cartão: ele inteiro é um botão.',
        'Escrever títulos de mais de duas linhas.',
        'Trocar o branco do texto pela cor do tema: o fundo é a foto nos dois temas.',
        'Usar mais de três capas extras: o mosaico ignora as demais.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="O cartão é invariante; a superfície de carregamento e o foco acompanham o tema." />
    <UglDocThemeSwitcher padding={16}>
      {(tema) => <TelaParaVoce theme={tema} />}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" description="Contrato público do componente HighlightCard." />
    <UglDocPropsTable
      title="HighlightCard"
      rows={[
        { name: 'coverSrc', type: 'string', description: 'Imagem de capa. Obrigatório.' },
        { name: 'coverAlt', type: 'string', description: 'Texto alternativo (decorativo quando é botão). Obrigatório.' },
        { name: 'title', type: 'string', description: 'Título sobre a capa. Obrigatório.' },
        { name: 'subtitle', type: 'string', description: 'Linha sob o título.' },
        { name: 'eyebrow', type: 'string', description: 'Linha acima do título.' },
        { name: 'count', type: 'string', description: 'Contagem já formatada, na cápsula.' },
        { name: 'size', type: "'md' | 'lg'", default: "'md'", description: 'Altura de 220px ou 320px.' },
        { name: 'mosaic', type: 'UglHighlightCardTile[]', description: 'Até três capas extras.' },
        { name: 'onClick', type: 'MouseEventHandler<HTMLButtonElement>', description: 'Toque. Sem ele, o cartão é uma figura.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: '...rest', type: 'ButtonHTMLAttributes<HTMLButtonElement>', description: 'Atributos nativos da raiz.' },
      ]}
    />
    <UglDocPropsTable
      title="UglHighlightCardTile"
      rows={[
        { name: 'src', type: 'string', description: 'Imagem.' },
        { name: 'alt', type: 'string', description: 'Texto alternativo.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof HighlightCard> = {
  title: 'Unoogaleria/Componentes/HighlightCard',
  component: HighlightCard,
  parameters: { layout: 'padded' },
  argTypes: {
    coverSrc: { control: 'text', description: 'Imagem de capa.' },
    coverAlt: { control: 'text', description: 'Texto alternativo.' },
    title: { control: 'text', description: 'Título.' },
    subtitle: { control: 'text', description: 'Linha sob o título.' },
    eyebrow: { control: 'text', description: 'Linha acima do título.' },
    count: { control: 'text', description: 'Contagem formatada.' },
    size: { control: 'radio', options: ['md', 'lg'], description: 'Altura.' },
    mosaic: { control: 'object', description: 'Capas extras.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onClick: { action: 'onClick', description: 'Toque.' },
  },
  args: {
    coverSrc: capa(VIAGEM).src,
    coverAlt: capa(VIAGEM).alt,
    title: 'Viagem à Chapada',
    subtitle: 'Setembro de 2026',
    eyebrow: 'Memória',
    count: uglFormatCount(VIAGEM),
    size: 'lg',
    mosaic: mosaicoDe(ACERVO, 2),
    theme: 'light',
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof HighlightCard>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <HighlightCardDocumentationPage />,
};

/**
 * Playground com todas as propriedades do HighlightCard expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do HighlightCard',
  render: (args) => (
    <UglDocStage theme={args.theme} surface="primary" padding={16}>
      <div style={{ width: 358 }}>
        <HighlightCard {...args} />
      </div>
    </UglDocStage>
  ),
};

/**
 * "Para você" no aparelho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: Para você',
  parameters: { layout: 'centered' },
  render: () => <TelaParaVoce />,
};

/**
 * Com e sem mosaico, sobretítulo e contagem.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UglDocStage surface="primary" align="flex-start" padding={16} gap={16}>
      <div style={{ width: 300 }}>
        <HighlightCard title="Setembro de 2026" coverSrc={capa(VIAGEM).src} coverAlt={capa(VIAGEM).alt} onClick={() => undefined} />
      </div>
      <div style={{ width: 300 }}>
        <HighlightCard eyebrow="Há um ano" title="Natal em família" subtitle="Dezembro de 2025" count="3 fotos" coverSrc={capa(ANOS[1]?.items ?? VIAGEM).src} coverAlt={capa(ANOS[1]?.items ?? VIAGEM).alt} onClick={() => undefined} />
      </div>
      <div style={{ width: 300 }}>
        <HighlightCard title="Viagem à Chapada" count={uglFormatCount(VIAGEM)} coverSrc={capa(VIAGEM).src} coverAlt={capa(VIAGEM).alt} mosaic={mosaicoDe(ACERVO, 3)} onClick={() => undefined} />
      </div>
    </UglDocStage>
  ),
};

/**
 * md (220px) e lg (320px).
 */
export const Tamanhos: Story = {
  render: () => (
    <UglDocStage surface="primary" align="flex-start" padding={16} gap={16}>
      {(['md', 'lg'] as const).map((tamanho) => (
        <div key={tamanho} style={{ width: 300 }}>
          <HighlightCard size={tamanho} eyebrow={`size="${tamanho}"`} title="Viagem à Chapada" coverSrc={capa(VIAGEM).src} coverAlt={capa(VIAGEM).alt} onClick={() => undefined} />
        </div>
      ))}
    </UglDocStage>
  ),
};

/**
 * Botão, figura e título longo.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage surface="primary" align="flex-start" padding={16} gap={16}>
      <div style={{ width: 300 }}>
        <HighlightCard title="Interativo (botão)" coverSrc={capa(VIAGEM).src} coverAlt={capa(VIAGEM).alt} onClick={() => undefined} />
      </div>
      <div style={{ width: 300 }}>
        <HighlightCard title="Estático (figura)" coverSrc={capa(VIAGEM).src} coverAlt={capa(VIAGEM).alt} />
      </div>
      <div style={{ width: 300 }}>
        <HighlightCard
          title="Um fim de semana inteiro de trilhas, cachoeiras e céu estrelado na Chapada dos Veadeiros"
          subtitle="Alto Paraíso de Goiás, GO"
          coverSrc={capa(VIAGEM).src}
          coverAlt={capa(VIAGEM).alt}
          onClick={() => undefined}
        />
      </div>
    </UglDocStage>
  ),
};

/**
 * Nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UglDocStage key={tema} label={tema === 'light' ? 'Tema claro' : 'Tema escuro'} theme={tema} surface="secondary" padding={16}>
          <TelaParaVoce theme={tema} />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Botão nomeado pelo texto; figura com as imagens descritas.
 */
export const AbrirMemoria: Story = {
  name: 'Abrir memória',
  args: { onClick: fn() },
  render: (args) => (
    <UglDocStage surface="primary" padding={16} gap={16}>
      <div style={{ width: 300 }}>
        <HighlightCard eyebrow="Memória" title="Viagem à Chapada" count={uglFormatCount(VIAGEM)} coverSrc={capa(VIAGEM).src} coverAlt={capa(VIAGEM).alt} onClick={args.onClick} />
      </div>
      <div style={{ width: 300 }}>
        <HighlightCard title="Setembro de 2026" coverSrc={capa(VIAGEM).src} coverAlt={capa(VIAGEM).alt} />
      </div>
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const cartao = tela.getByRole('button', { name: /Viagem à Chapada/ });
    await expect(cartao).toHaveAccessibleName(new RegExp(`Memória.*Viagem à Chapada.*${uglFormatCount(VIAGEM)}`));
    await userEvent.click(cartao);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    cartao.focus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledTimes(2);

    // Sem onClick, é uma figura com a imagem descrita.
    await expect(tela.getByRole('figure')).toBeInTheDocument();
    await expect(tela.getByRole('img', { name: capa(VIAGEM).alt })).toBeInTheDocument();
  },
};
