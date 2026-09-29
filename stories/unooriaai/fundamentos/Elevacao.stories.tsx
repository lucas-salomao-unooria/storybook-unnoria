import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  uaiElevationThemes,
  uaiElevationTokens,
} from '../../../src/unooriaai/tokens/elevation';
import { uaiOverlays } from '../../../src/unooriaai/tokens/colors';
import type { UaiTheme } from '../../../src/unooriaai/tokens/colors';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocCard,
  UaiDocDecisions,
  UaiDocGrid,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocSpecs,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';
import { Modal, Toggle } from '../../../src/unooriaai/components';

const BAR = '#716C98';
const DOC_MUTED = '#475157';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

type Sombra = keyof typeof uaiElevationTokens;

const SOMBRAS = Object.keys(uaiElevationTokens) as Sombra[];
const TEMAS: UaiTheme[] = ['light', 'dark'];

const NOME_DO_TEMA: Record<UaiTheme, string> = { light: 'Tema claro', dark: 'Tema escuro' };

const DESCRICOES: Record<Sombra, string> = {
  overlay:
    'Sobreposição — menus, avisos e diálogos: sombra escura no tema claro, halo claro no escuro.',
  modal: 'Superfície do Modal, aplicada direto no diálogo.',
  knob: 'Botão deslizante do Toggle.',
};

/** Cartão de amostra de sombra, resolvido no tema do palco em que está. */
const AmostraDeSombra: React.FC<{ token: Sombra; theme: UaiTheme }> = ({ token, theme }) => (
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        width: 168,
        height: 96,
        borderRadius: 12,
        background: 'var(--uai-bg-primary)',
        boxShadow: `var(${uaiElevationTokens[token].cssVar})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: MONO,
        fontSize: 11,
        color: 'var(--uai-text-primary)',
        padding: 8,
        boxSizing: 'border-box',
      }}
    >
      {uaiElevationTokens[token].cssVar}
    </div>
    <div style={{ fontSize: 11, color: DOC_MUTED, marginTop: 10, maxWidth: 168 }}>
      {uaiElevationThemes[theme][token]}
    </div>
  </div>
);

/** Fio de 1px, tal como a barra lateral e as listas separam as seções. */
const AmostraDeFio: React.FC<{ token: 'bottom' | 'top' }> = ({ token }) => (
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        width: 168,
        height: 56,
        background: 'var(--uai-bg-primary)',
        boxShadow: `var(--uai-elevation-hairline-${token})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: MONO,
        fontSize: 11,
        color: 'var(--uai-text-primary)',
      }}
    >
      hairline-{token}
    </div>
  </div>
);

/**
 * Página de documentação rica dos tokens de elevação.
 */
const ElevacaoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Fundamentos • Elevação"
      title="Elevação"
      description="A superfície do UnooriaAI é plana e se organiza por camadas e por fios de 1px. A sombra existe só em sobreposição — diálogo, menu, aviso e o botão deslizante do Toggle — e é definida por tema com os degraus de elevação da Plataforma Unooria: sombra escura no tema claro e halo claro no escuro, onde uma sombra escura não se veria."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="O módulo é plano por padrão: sombra é exceção, reservada a camadas que saem do fluxo."
      barColor={BAR}
    />
    <UaiDocGrid>
      <UaiDocCard icon="🃏" title="Sobreposição">
        <code>--uai-elevation-overlay</code> serve menus, avisos e diálogos. No tema claro é a
        sombra <code>brand-secondary</code> da Unooria; no escuro, o halo claro{' '}
        <code>neutral-2</code>.
      </UaiDocCard>
      <UaiDocCard icon="🪟" title="Diálogo">
        <code>--uai-elevation-modal</code> é aplicada pelo <code>Modal</code> à própria superfície,
        sobre o véu <code>--uai-overlay-scrim</code>.
      </UaiDocCard>
      <UaiDocCard icon="🎛️" title="Botão deslizante">
        <code>--uai-elevation-knob</code> destaca o botão do <code>Toggle</code> sobre o trilho;
        no escuro usa o halo menor, <code>neutral-1</code>.
      </UaiDocCard>
      <UaiDocCard icon="📵" title="Superfícies planas">
        Cartões, campos e linhas se separam por camada de fundo, contorno e fios de 1px
        (<code>--uai-elevation-hairline-*</code>), nunca por sombra.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações Técnicas"
      description="Sombras por tema, fios e véu de sobreposição."
      barColor={BAR}
    />
    <UaiDocSpecs
      component="../tokens"
      layout="Elevação plana · 3 sombras"
      specs={[
        { label: 'Overlay · claro', value: uaiElevationThemes.light.overlay },
        { label: 'Overlay · escuro', value: uaiElevationThemes.dark.overlay },
        { label: 'Knob · claro', value: uaiElevationThemes.light.knob },
        { label: 'Knob · escuro', value: uaiElevationThemes.dark.knob },
        { label: 'Fios', value: '1px · --uai-border-default' },
        { label: 'Véu', value: `${uaiOverlays.scrim} · invariante` },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Sombra definida por tema',
          detail:
            'Cada sombra é declarada no bloco do seu tema, com o degrau de elevação da Unooria de origem no comentário de elevation.css: brand-secondary no claro; neutral-2 (e neutral-1 no botão deslizante) no escuro. Uma sombra escura sobre superfície roxa escura não se veria, por isso o escuro usa halo claro.',
        },
        {
          subject: 'Sem sombras com desfoque em outros alvos',
          detail:
            'Fora de diálogo, menu, aviso e botão deslizante não há sombra: a separação vem das camadas de fundo, dos contornos e dos fios de 1px.',
        },
        {
          subject: 'Fios declarados em todo tema',
          detail:
            'Os fios usam var(--uai-border-default) e por isso são declarados em todo [data-uai-theme], nunca só em :root; declarados só na raiz, ficariam com a cor do tema claro dentro de um contêiner escuro.',
        },
        {
          subject: 'Véu invariante',
          detail:
            '--uai-overlay-scrim é o mesmo nos dois temas (brandpurple-500 a 50%), como o véu do Modal.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia das Sombras"
      description="As três sombras nos dois temas, sobre a superfície secundária de cada um."
      barColor={BAR}
    />
    {TEMAS.map((tema) => (
      <UaiDocStage
        key={tema}
        label={NOME_DO_TEMA[tema]}
        theme={tema}
        surface="secondary"
        padding={40}
        gap={32}
      >
        {SOMBRAS.map((token) => (
          <AmostraDeSombra key={token} token={token} theme={tema} />
        ))}
      </UaiDocStage>
    ))}

    <UaiDocStage label="Fios de 1px" padding={40} gap={32} surface="secondary">
      <AmostraDeFio token="bottom" />
      <AmostraDeFio token="top" />
    </UaiDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz dos Componentes Reais"
      description="Aplicados pelos componentes reais Toggle e Modal."
      barColor={BAR}
    />
    <UaiDocStage label="Nos componentes reais" padding={40} surface="secondary">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <Toggle checked aria-label="Interruptor ligado" />
        <Toggle aria-label="Interruptor desligado" />
        <span style={{ fontSize: 11, color: 'var(--uai-text-secondary)' }}>
          --uai-elevation-knob
        </span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Modal withOverlay={false} title="Título do diálogo" style={{ width: 320 }}>
          <Modal.Body>O conteúdo do diálogo fica aqui.</Modal.Body>
        </Modal>
        <span style={{ fontSize: 11, color: 'var(--uai-text-secondary)' }}>
          --uai-elevation-modal
        </span>
      </div>
    </UaiDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de uso de profundidade."
      barColor={BAR}
    />
    <UaiDocPractices
      dos={[
        'Reservar sombra para camadas que saem do fluxo: diálogos, menus, avisos e o botão deslizante do interruptor.',
        'Separar cartões e campos por camada de fundo, contorno e fios de 1px, sem sombra.',
        'Combinar o véu --uai-overlay-scrim com a superfície do Modal ao cobrir a tela.',
        'Consumir as sombras pelos tokens em vez de repetir o valor no CSS do componente.',
      ]}
      donts={[
        'Empilhar duas sombras na mesma superfície.',
        'Aplicar sombra a cartões de conteúdo: o módulo é plano por padrão.',
        'Trocar a sombra por contorno colorido para simular elevação.',
        'Escrever box-shadow escuro à mão no tema escuro: use os tokens, que já trocam para o halo claro.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A sombra muda com o tema: sombra escura no claro, halo claro no escuro."
      barColor={BAR}
    />
    <UaiDocThemeSwitcher padding={40} surface="secondary">
      {() => (
        <>
          <Toggle checked aria-label="Interruptor ligado" />
          <Modal withOverlay={false} title="Título do diálogo" style={{ width: 300 }}>
            <Modal.Body>O conteúdo do diálogo fica aqui.</Modal.Body>
          </Modal>
        </>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa das Sombras e do Véu"
      description="Valor em cada tema, variável CSS e aplicação de cada token."
      barColor={BAR}
    />
    <UaiDocPropsTable
      title="Sombras"
      rows={SOMBRAS.map((token) => ({
        name: token,
        type: uaiElevationTokens[token].cssVar,
        default: `claro ${uaiElevationThemes.light[token]} · escuro ${uaiElevationThemes.dark[token]}`,
        description: `${DESCRICOES[token]} Origem: ${uaiElevationTokens[token].unooria.light} (claro) · ${uaiElevationTokens[token].unooria.dark} (escuro).`,
      }))}
    />
    <UaiDocPropsTable
      title="Véu de sobreposição"
      rows={(Object.keys(uaiOverlays) as (keyof typeof uaiOverlays)[]).map((key) => ({
        name: key,
        type: `--uai-overlay-${key}`,
        default: uaiOverlays[key],
        description:
          'Véu do Modal — o mesmo nos dois temas. Origem: --unooria-color-opacity-brandpurple-500.',
      }))}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'UnooriaAI/Fundamentos/Elevação',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Elevação do UnooriaAI: superfície plana, fios de 1px e sombra só em sobreposição, definida por tema a partir da Plataforma Unooria.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa da elevação.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ElevacaoDocumentationPage />,
};

/**
 * As sombras do módulo, lado a lado, nos dois temas.
 */
export const TodasAsSombras: Story = {
  name: '🃏 Todas as Sombras',
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {TEMAS.map((tema) => (
        <UaiDocStage
          key={tema}
          label={NOME_DO_TEMA[tema]}
          theme={tema}
          surface="secondary"
          padding={40}
          gap={32}
        >
          {SOMBRAS.map((token) => (
            <AmostraDeSombra key={token} token={token} theme={tema} />
          ))}
        </UaiDocStage>
      ))}
    </div>
  ),
};
