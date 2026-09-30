import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import type { UglPhoneFrameProps } from '../../../src/unoogaleria/components/PhoneFrame';
import { Icon } from '../../../src/unoogaleria/components/Icon';
import { IconButton } from '../../../src/unoogaleria/components/IconButton';
import { uglInvariantColors, uglLayout } from '../../../src/unoogaleria/tokens';
import {
  uglFormatCount,
  uglFormatDayLabel,
  uglFormatDuration,
  uglFormatTime,
  uglGroupMedia,
} from '../../../src/unoogaleria/media';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocAnatomy,
  UglDocCard,
  UglDocDecisions,
  UglDocGrid,
  UglDocPractices,
  UglDocPropsTable,
  UglDocSpecs,
  UglDocStage,
  UglDocThemeSwitcher,
} from '../../../.storybook/components';
import { uglDemoNow, uglMediaItems, uglPhotos } from '../fixtures';

const BAR = '#716C98';

/** Três níveis de carga, um por glifo de bateria (≥ 60%, ≥ 30% e abaixo). */
const BATTERY_LEVELS = [82, 45, 12] as const;

/** Os três primeiros grupos da biblioteca ("Hoje", "Ontem"…), para a tela de demonstração. */
const sections = uglGroupMedia(uglMediaItems, 'day', { now: uglDemoNow }).slice(0, 3);
const viewerItem = uglPhotos[0];

const textStyle = (
  size: 'display' | 'title-md' | 'title-sm' | 'label' | 'body-md' | 'caption' | 'caption-strong'
): React.CSSProperties => ({
  margin: 0,
  fontFamily: 'var(--ugl-font-sans)',
  fontSize: `var(--ugl-font-${size}-size)`,
  lineHeight: `var(--ugl-font-${size}-line)`,
  fontWeight: `var(--ugl-font-${size}-weight)` as React.CSSProperties['fontWeight'],
});

/**
 * Tela de demonstração: título grande, a grade do primeiro dia e uma faixa de
 * abas, compostas só com Icon, IconButton e tokens. As barras somam a área
 * segura ao próprio recuo, como as barras reais da galeria.
 */
const LibraryScreen: React.FC = () => (
  <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
    <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin' }}>
      <header
        style={{
          padding: 'calc(var(--ugl-safe-area-top) + var(--ugl-spacing-xs)) var(--ugl-gutter) var(--ugl-spacing-xs)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <div>
          <p style={{ ...textStyle('caption-strong'), color: 'var(--ugl-color-text-secondary)' }}>
            {uglFormatCount(uglMediaItems)}
          </p>
          <h1 style={{ ...textStyle('display'), color: 'var(--ugl-color-text-primary)' }}>Biblioteca</h1>
        </div>
        <IconButton icon="search" label="Buscar" variant="tinted" />
      </header>
      {sections.map((section, index) => (
        <section key={section.id} aria-label={section.title}>
          <h2
            style={{
              ...textStyle('title-sm'),
              color: 'var(--ugl-color-text-primary)',
              padding: 'var(--ugl-spacing-xs) var(--ugl-gutter)',
            }}
          >
            {section.title}
          </h2>
          <ul
            aria-label={`Fotos e vídeos de ${section.title}`}
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--ugl-grid-gap)',
              paddingBottom:
                index === sections.length - 1
                  ? 'calc(var(--ugl-tabbar-height) + var(--ugl-safe-area-bottom))'
                  : undefined,
            }}
          >
            {section.items.map((item) => (
              <li key={item.id} style={{ position: 'relative', aspectRatio: '1 / 1', background: 'var(--ugl-color-background-tertiary)' }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {item.type === 'video' && item.duration !== undefined && (
                  <span
                    style={{
                      position: 'absolute',
                      right: 4,
                      bottom: 4,
                      padding: '0 var(--ugl-spacing-3xs)',
                      borderRadius: 'var(--ugl-radius-xs)',
                      background: 'var(--ugl-color-media-scrim)',
                      color: 'var(--ugl-color-media-text)',
                      fontVariantNumeric: 'tabular-nums',
                      ...textStyle('caption-strong'),
                    }}
                  >
                    {uglFormatDuration(item.duration)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
    <nav
      aria-label="Navegação principal"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 'var(--ugl-z-bar)' as unknown as number,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 'var(--ugl-tabbar-height)',
        paddingBottom: 'var(--ugl-safe-area-bottom)',
        background: 'var(--ugl-color-surface-bar)',
        backdropFilter: 'blur(var(--ugl-blur-bar))',
        WebkitBackdropFilter: 'blur(var(--ugl-blur-bar))',
        boxShadow: 'var(--ugl-elevation-hairline-top)',
      }}
    >
      {[
        { icon: 'libraryFilled' as const, label: 'Biblioteca', active: true },
        { icon: 'albums' as const, label: 'Álbuns', active: false },
        { icon: 'memories' as const, label: 'Para você', active: false },
        { icon: 'search' as const, label: 'Busca', active: false },
      ].map((tab) => (
        <span
          key={tab.label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: tab.active ? 'var(--ugl-color-text-accent)' : 'var(--ugl-color-text-secondary)',
            ...textStyle('caption-strong'),
          }}
        >
          <Icon name={tab.icon} tone={tab.active ? 'accent' : 'secondary'} />
          {tab.label}
        </span>
      ))}
    </nav>
  </div>
);

/**
 * Camada imersiva de demonstração: um contêiner com `data-ugl-immersive` e fundo
 * imersivo, como o visualizador declara. Só por existir na tela, a barra de
 * status e a de gesto do aparelho passam a branco.
 */
const ImmersiveLayer: React.FC = () => (
  <div
    data-ugl-immersive=""
    style={{
      position: 'absolute',
      inset: 0,
      zIndex: 'var(--ugl-z-viewer)' as unknown as number,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--ugl-color-immersive-surface)',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: 'var(--ugl-safe-area-top) var(--ugl-spacing-xs) 0',
        minHeight: 'calc(var(--ugl-toolbar-height) + var(--ugl-safe-area-top))',
        boxSizing: 'border-box',
        background: 'var(--ugl-color-immersive-bar)',
      }}
    >
      <IconButton icon="back" label="Fechar visualizador" variant="bar" />
      <div style={{ flex: 1 }}>
        <p style={{ ...textStyle('label'), color: 'var(--ugl-color-immersive-text)' }}>
          {uglFormatDayLabel(viewerItem.takenAt, { now: uglDemoNow })}
        </p>
        <p style={{ ...textStyle('caption'), color: 'var(--ugl-color-immersive-text-secondary)' }}>
          {uglFormatTime(viewerItem.takenAt)}
          {viewerItem.location ? ` · ${viewerItem.location}` : ''}
        </p>
      </div>
      <IconButton icon="more" label="Mais opções" variant="bar" />
    </div>
    <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={viewerItem.src} alt={viewerItem.alt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: 'var(--ugl-toolbar-height)',
        paddingBottom: 'var(--ugl-safe-area-bottom)',
        background: 'var(--ugl-color-immersive-bar)',
      }}
    >
      <IconButton icon="share" label="Compartilhar" variant="bar" />
      <IconButton icon="favorite" label="Favoritar" variant="bar" pressed={false} pressedTone="favorite" />
      <IconButton icon="info" label="Informações" variant="bar" pressed={false} />
      <IconButton icon="delete" label="Excluir" variant="bar" />
    </div>
  </div>
);

/**
 * Caixa que ocupa a tela inteira com o recuo das áreas seguras: a faixa
 * lavanda é o que as barras de sistema cobrem.
 */
const SafeAreaBox: React.FC = () => (
  <div
    data-ugl-safe-area-box=""
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 'var(--ugl-safe-area-top)',
      paddingBottom: 'var(--ugl-safe-area-bottom)',
      background: 'var(--ugl-color-background-tertiary)',
    }}
  >
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        margin: '0 var(--ugl-gutter)',
        borderRadius: 'var(--ugl-radius-l)',
        border: '2px dashed var(--ugl-color-border-control)',
        background: 'var(--ugl-color-background-primary)',
        color: 'var(--ugl-color-text-primary)',
        textAlign: 'center',
      }}
    >
      <p style={textStyle('title-md')}>Área útil</p>
      <p style={{ ...textStyle('body-md'), color: 'var(--ugl-color-text-secondary)', maxWidth: 260 }}>
        padding-top: var(--ugl-safe-area-top)
        <br />
        padding-bottom: var(--ugl-safe-area-bottom)
      </p>
    </div>
  </div>
);

/** A mesma tela, com e sem a camada imersiva, lado a lado. */
const ChromeComparison: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => (
  <UglDocStage theme={theme ?? 'light'} surface="secondary" align="flex-start" gap={32}>
    <PhoneFrame scale={0.6} theme={theme} ariaLabel="Biblioteca, cromo do tema">
      <LibraryScreen />
    </PhoneFrame>
    <PhoneFrame scale={0.6} theme={theme} ariaLabel="Visualizador, cromo imersivo">
      <LibraryScreen />
      <ImmersiveLayer />
    </PhoneFrame>
  </UglDocStage>
);

/** Rótulo abaixo de cada aparelho numa matriz. */
const FrameCaption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    style={{
      ...textStyle('caption'),
      marginTop: 8,
      textAlign: 'center',
      color: 'var(--ugl-color-text-secondary)',
    }}
  >
    {children}
  </p>
);

/**
 * Página de documentação rica do PhoneFrame.
 */
const PhoneFrameDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Estrutura"
      title="PhoneFrame"
      description={`Aparelho genérico de ${uglLayout.screenWidth} × ${uglLayout.screenHeight}px onde a galeria roda: corpo, aro, botões laterais, ilha da câmera, barra de status e barra de gesto, nas cores invariantes do módulo. Não é só uma moldura — redefine as áreas seguras da tela, é o bloco de contenção de todas as sobreposições e passa o cromo de sistema para branco quando algo imersivo abre dentro dele.`}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UglDocGrid>
      <UglDocCard icon="📱" title="Palco da galeria">
        Toda tela composta da Unoogaleria é validada dentro dele, na medida de{' '}
        {uglLayout.screenWidth} × {uglLayout.screenHeight}px.
      </UglDocCard>
      <UglDocCard icon="📐" title="Áreas seguras">
        Com a barra de status, a tela redefine <code>--ugl-safe-area-top</code> em{' '}
        {uglLayout.statusBarHeight}px; com a barra de gesto, <code>--ugl-safe-area-bottom</code> em{' '}
        {uglLayout.homeIndicatorHeight}px. O conteúdo corre por baixo das duas.
      </UglDocCard>
      <UglDocCard icon="🌗" title="Cromo que acompanha a tela">
        A barra de status usa a cor de texto do tema; quando um descendente declara{' '}
        <code>data-ugl-immersive</code>, ela e a barra de gesto passam a branco sem prop nem estado.
      </UglDocCard>
      <UglDocCard icon="🧱" title="Bloco de contenção">
        A tela tem <code>transform</code> e <code>overflow: hidden</code>: folhas, diálogos, avisos e
        o visualizador ficam presos a ela, até um <code>position: fixed</code> interno.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="PhoneFrame"
      layout={`Aparelho · ${uglLayout.screenWidth + 24} × ${uglLayout.screenHeight + 24}px`}
      specs={[
        { label: 'Tela', value: `${uglLayout.screenWidth} × ${uglLayout.screenHeight}px` },
        { label: 'Aro (bezel)', value: '12px · raio 62px' },
        { label: 'Raio da tela', value: '50px' },
        { label: 'Barra de status', value: `${uglLayout.statusBarHeight}px · horário em title-sm` },
        { label: 'Ilha da câmera', value: '124 × 36px' },
        { label: 'Glifos de sistema', value: 'signal e wifi 18px · bateria 24px' },
        { label: 'Barra de gesto', value: `${uglLayout.homeIndicatorHeight}px de zona · 134 × 5px` },
        { label: 'Corpo', value: `${uglInvariantColors.deviceBody.value} · invariante` },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Aparelho genérico',
          detail:
            'as proporções lembram um celular atual, mas nenhum detalhe imita um aparelho de mercado: ilha simples com uma lente, quatro botões laterais e cores da própria paleta roxa.',
        },
        {
          subject: 'Medidas locais do aparelho',
          detail:
            'aro de 12px, raio de 62px, raio da tela de 50px, ilha de 124 × 36px, lente de 12px, botões de 3px e barra de gesto de 134 × 5px são custom properties locais (--ugl-phone-frame-*) no topo de PhoneFrame.css, sem token equivalente.',
        },
        {
          subject: 'Cromo imersivo por :has()',
          detail:
            'a tela observa [data-ugl-immersive] em qualquer descendente e passa a barra de status e a de gesto para --ugl-color-immersive-text. Quem abre o visualizador não precisa avisar o aparelho.',
        },
        {
          subject: 'Bateria por nível',
          detail:
            'o glifo segue a carga: batteryHigh a partir de 60%, batteryMedium a partir de 30% e batteryLow abaixo. O nome acessível ("Bateria em 82%") diz o número, que o glifo sozinho não diz.',
        },
        {
          subject: 'Glifos de sistema com nome',
          detail:
            'sinal, conexão e bateria recebem title e viram role="img"; a ilha, os botões laterais e a barra de gesto são decorativos (aria-hidden).',
        },
        {
          subject: 'Escala por transform',
          detail:
            'scale encolhe o aparelho inteiro com transform e reserva o espaço já escalado num invólucro, para caber em páginas de documentação sem alterar nenhuma medida interna.',
        },
        {
          subject: 'Contêiner de documentação',
          detail:
            'o PhoneFrame não é peça de produto: um app real já roda num aparelho. Ele existe para validar telas inteiras e demonstrar as áreas seguras.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UglDocAnatomy
      zones={[
        { name: 'Corpo e aro', role: 'Só em device="bezel": corpo escuro, aro de 2px e botões laterais.', token: '--ugl-color-device-body · --ugl-color-device-edge · --ugl-color-device-button' },
        { name: 'Tela', role: 'Bloco de contenção de 390 × 844px, em background-primary.', token: '--ugl-screen-width · --ugl-screen-height' },
        { name: 'Barra de status', role: 'Horário, ilha da câmera, sinal, conexão e bateria, em --ugl-z-statusbar.', token: '--ugl-statusbar-height · --ugl-color-text-primary' },
        { name: 'Conteúdo', role: 'Slot children em coluna; ocupa a tela inteira, por baixo das barras.', token: '--ugl-safe-area-top · --ugl-safe-area-bottom' },
        { name: 'Barra de gesto', role: 'Pílula decorativa na base.', token: '--ugl-home-indicator-height' },
        { name: 'Invólucro de escala', role: 'Só com scale ≠ 1: reserva a caixa escalada.', token: 'transform: scale()' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes, tamanhos e estados" />
    <UglDocStage label="Aparelho inteiro e só a tela" surface="secondary" align="flex-start" gap={32}>
      <div>
        <PhoneFrame device="bezel" scale={0.45} ariaLabel="Aparelho inteiro">
          <LibraryScreen />
        </PhoneFrame>
        <FrameCaption>device=&quot;bezel&quot;</FrameCaption>
      </div>
      <div>
        <PhoneFrame device="screen" scale={0.45} ariaLabel="Só a tela">
          <LibraryScreen />
        </PhoneFrame>
        <FrameCaption>device=&quot;screen&quot;</FrameCaption>
      </div>
    </UglDocStage>
    <UglDocStage label="Bateria em três níveis" surface="secondary" align="flex-start" gap={32}>
      {BATTERY_LEVELS.map((level) => (
        <div key={level}>
          <PhoneFrame scale={0.45} battery={level} ariaLabel={`Bateria em ${level}%`}>
            <LibraryScreen />
          </PhoneFrame>
          <FrameCaption>battery=&#123;{level}&#125;</FrameCaption>
        </div>
      ))}
    </UglDocStage>
    <UglDocStage label="Barras de sistema e áreas seguras" surface="secondary" align="flex-start" gap={32}>
      <div>
        <PhoneFrame scale={0.45} ariaLabel="Com as duas barras">
          <SafeAreaBox />
        </PhoneFrame>
        <FrameCaption>com as duas barras</FrameCaption>
      </div>
      <div>
        <PhoneFrame scale={0.45} statusBar={false} ariaLabel="Sem barra de status">
          <SafeAreaBox />
        </PhoneFrame>
        <FrameCaption>statusBar=&#123;false&#125;</FrameCaption>
      </div>
      <div>
        <PhoneFrame scale={0.45} homeIndicator={false} time="18:30" ariaLabel="Sem barra de gesto">
          <SafeAreaBox />
        </PhoneFrame>
        <FrameCaption>homeIndicator=&#123;false&#125; · time=&quot;18:30&quot;</FrameCaption>
      </div>
    </UglDocStage>
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14 }}>Cromo do tema e cromo imersivo</h4>
    <ChromeComparison />

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Somar --ugl-safe-area-top e --ugl-safe-area-bottom ao recuo das barras, folhas e do visualizador.',
        'Deixar o conteúdo correr por baixo das barras de sistema, como num aparelho real.',
        'Declarar data-ugl-immersive no contêiner do visualizador e do editor.',
        'Posicionar sobreposições com position: absolute; inset: 0 dentro da tela.',
        'Usar scale para caber na página, em vez de mudar as medidas.',
      ]}
      donts={[
        'Usar o PhoneFrame em produção: é contêiner de documentação.',
        'Escrever 47px ou 34px no lugar da área segura.',
        'Abrir sobreposição em portal ou com position: fixed na janela.',
        'Pintar a barra de status por conta própria: ela acompanha o tema e o imersivo sozinha.',
        'Imitar um aparelho de mercado (entalhe, botões ou marca reconhecíveis).',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A tela e o cromo seguem data-ugl-theme; o corpo do aparelho e o imersivo são invariantes."
    />
    <UglDocThemeSwitcher surface="secondary">
      {() => (
        <>
          <PhoneFrame scale={0.55} ariaLabel="Biblioteca no tema ativo">
            <LibraryScreen />
          </PhoneFrame>
          <PhoneFrame scale={0.55} ariaLabel="Visualizador no tema ativo">
            <LibraryScreen />
            <ImmersiveLayer />
          </PhoneFrame>
        </>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UglDocPropsTable
      title="PhoneFrame"
      rows={[
        { name: 'device', type: "'bezel' | 'screen'", default: "'bezel'", description: 'Aparelho inteiro, ou só a tela de cantos arredondados.' },
        { name: 'time', type: 'string', default: "'9:41'", description: 'Horário da barra de status.' },
        { name: 'battery', type: 'number', default: '82', description: 'Carga de 0 a 100; escolhe o glifo e o rótulo "Bateria em N%".' },
        { name: 'statusBar', type: 'boolean', default: 'true', description: 'Barra de status e ilha; liga a área segura superior.' },
        { name: 'homeIndicator', type: 'boolean', default: 'true', description: 'Barra de gesto; liga a área segura inferior.' },
        { name: 'scale', type: 'number', default: '1', description: 'Escala de exibição; o aparelho ocupa o espaço já escalado.' },
        { name: 'ariaLabel', type: 'string', description: 'Rótulo acessível; vira role="group".' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema da tela; sem valor, herda data-ugl-theme.' },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo da tela; as sobreposições se posicionam dentro dela.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional (no invólucro de escala quando scale ≠ 1).' },
        { name: '…HTMLAttributes<HTMLDivElement>', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Repassadas ao nó raiz (o invólucro de escala quando scale ≠ 1).' },
      ]}
    />
    <UglDocPropsTable
      title="Tipos e contrato de CSS"
      rows={[
        { name: 'UglPhoneFrameDevice', type: "'bezel' | 'screen'", description: 'Apresentação do aparelho.' },
        { name: 'UglPhoneFrameProps', type: 'interface', description: 'Props acima.' },
        { name: '--ugl-safe-area-top', type: 'px', default: `${uglLayout.statusBarHeight}px`, description: 'Definida na tela quando statusBar.' },
        { name: '--ugl-safe-area-bottom', type: 'px', default: `${uglLayout.homeIndicatorHeight}px`, description: 'Definida na tela quando homeIndicator.' },
        { name: '[data-ugl-immersive]', type: 'atributo', description: 'Em qualquer descendente, passa o cromo do aparelho para branco.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PhoneFrame> = {
  title: 'Unoogaleria/Componentes/PhoneFrame',
  component: PhoneFrame,
  parameters: { layout: 'padded' },
  argTypes: {
    device: { control: 'inline-radio', options: ['bezel', 'screen'], description: 'Aparelho inteiro ou só a tela.' },
    theme: { control: 'inline-radio', options: ['light', 'dark'], description: 'Tema da tela.' },
    time: { control: 'text', description: 'Horário da barra de status.' },
    battery: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: 'Carga da bateria.' },
    statusBar: { control: 'boolean', description: 'Exibe a barra de status.' },
    homeIndicator: { control: 'boolean', description: 'Exibe a barra de gesto.' },
    scale: { control: { type: 'range', min: 0.3, max: 1, step: 0.05 }, description: 'Escala de exibição.' },
    ariaLabel: { control: 'text', description: 'Rótulo acessível do aparelho.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    device: 'bezel',
    theme: 'light',
    time: '9:41',
    battery: 82,
    statusBar: true,
    homeIndicator: true,
    scale: 0.75,
    ariaLabel: 'Galeria no aparelho',
    className: '',
  },
};

export default meta;

type Story = StoryObj<UglPhoneFrameProps>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PhoneFrameDocumentationPage />,
};

/**
 * Playground com todas as props.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PhoneFrame',
  render: ({ className, ...args }) => (
    <UglDocStage theme={args.theme ?? 'light'} surface="secondary" padding={32}>
      <PhoneFrame {...args} className={className || undefined}>
        <LibraryScreen />
      </PhoneFrame>
    </UglDocStage>
  ),
};

/**
 * Composição realista: a biblioteca no aparelho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: biblioteca no aparelho',
  render: () => (
    <UglDocStage surface="secondary" padding={32}>
      <PhoneFrame scale={0.75} ariaLabel="Biblioteca no aparelho">
        <LibraryScreen />
      </PhoneFrame>
    </UglDocStage>
  ),
};

/**
 * Aparelho inteiro e só a tela.
 */
export const TodasVariantes: Story = {
  name: 'Aparelho inteiro e só a tela',
  render: () => (
    <UglDocStage surface="secondary" align="flex-start" gap={32}>
      <PhoneFrame device="bezel" scale={0.6} ariaLabel="Aparelho inteiro">
        <LibraryScreen />
      </PhoneFrame>
      <PhoneFrame device="screen" scale={0.6} ariaLabel="Só a tela">
        <LibraryScreen />
      </PhoneFrame>
    </UglDocStage>
  ),
};

/**
 * Três escalas de exibição.
 */
export const Tamanhos: Story = {
  name: 'Escalas',
  render: () => (
    <UglDocStage surface="secondary" align="flex-start" gap={32}>
      {[0.4, 0.55, 0.75].map((scale) => (
        <div key={scale}>
          <PhoneFrame scale={scale} ariaLabel={`Escala ${scale}`}>
            <LibraryScreen />
          </PhoneFrame>
          <FrameCaption>scale=&#123;{scale}&#125;</FrameCaption>
        </div>
      ))}
    </UglDocStage>
  ),
};

/**
 * Bateria em três níveis e barras de sistema ligadas e desligadas. O `play`
 * confere o rótulo acessível de cada bateria.
 */
export const Estados: Story = {
  name: 'Bateria e barras de sistema',
  render: () => (
    <UglDocStage surface="secondary" align="flex-start" gap={32}>
      {BATTERY_LEVELS.map((level) => (
        <div key={level}>
          <PhoneFrame scale={0.45} battery={level} ariaLabel={`Aparelho com ${level}% de carga`}>
            <LibraryScreen />
          </PhoneFrame>
          <FrameCaption>battery=&#123;{level}&#125;</FrameCaption>
        </div>
      ))}
      <div>
        <PhoneFrame scale={0.45} statusBar={false} homeIndicator={false} ariaLabel="Aparelho sem barras">
          <LibraryScreen />
        </PhoneFrame>
        <FrameCaption>sem barras de sistema</FrameCaption>
      </div>
    </UglDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const level of BATTERY_LEVELS) {
      const device = canvas.getByRole('group', { name: `Aparelho com ${level}% de carga` });
      await expect(within(device).getByRole('img', { name: `Bateria em ${level}%` })).toBeInTheDocument();
    }
    const glyphs = BATTERY_LEVELS.map((level) =>
      within(canvas.getByRole('group', { name: `Aparelho com ${level}% de carga` }))
        .getByRole('img', { name: `Bateria em ${level}%` })
        .getAttribute('data-ugl-icon')
    );
    await expect(glyphs).toEqual(['batteryHigh', 'batteryMedium', 'batteryLow']);
    const bare = canvas.getByRole('group', { name: 'Aparelho sem barras' });
    await expect(within(bare).queryByRole('img', { name: /Bateria/ })).toBeNull();
  },
};

/**
 * O rótulo acessível da bateria no valor padrão.
 */
export const BateriaAcessivel: Story = {
  name: 'Bateria acessível',
  render: () => (
    <UglDocStage surface="secondary">
      <PhoneFrame scale={0.6} ariaLabel="Aparelho de demonstração">
        <LibraryScreen />
      </PhoneFrame>
    </UglDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('img', { name: 'Bateria em 82%' })).toBeInTheDocument();
    await expect(canvas.getByRole('img', { name: 'Sinal móvel' })).toBeInTheDocument();
    await expect(canvas.getByRole('img', { name: 'Conectado à rede sem fio' })).toBeInTheDocument();
  },
};

/**
 * Áreas seguras: a caixa com o recuo das duas barras. O `play` confere que o
 * recuo vale a altura de cada barra e some quando ela é desligada.
 */
export const AreasSeguras: Story = {
  name: 'Áreas seguras',
  render: () => (
    <UglDocStage surface="secondary" align="flex-start" gap={32}>
      <PhoneFrame scale={0.55} ariaLabel="Com as duas barras">
        <SafeAreaBox />
      </PhoneFrame>
      <PhoneFrame scale={0.55} statusBar={false} homeIndicator={false} ariaLabel="Sem barras">
        <SafeAreaBox />
      </PhoneFrame>
    </UglDocStage>
  ),
  play: async ({ canvasElement }) => {
    const [withBars, withoutBars] = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('[data-ugl-safe-area-box]')
    );
    await expect(getComputedStyle(withBars).paddingTop).toBe(`${uglLayout.statusBarHeight}px`);
    await expect(getComputedStyle(withBars).paddingBottom).toBe(`${uglLayout.homeIndicatorHeight}px`);
    await expect(getComputedStyle(withoutBars).paddingTop).toBe('0px');
    await expect(getComputedStyle(withoutBars).paddingBottom).toBe('0px');
  },
};

/**
 * Cromo imersivo: a mesma tela sem e com uma camada `data-ugl-immersive`. O
 * `play` confere que a barra de status fica branca só no segundo aparelho.
 */
export const CromoImersivo: Story = {
  name: 'Cromo imersivo',
  render: () => <ChromeComparison />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const statusColor = (name: string) =>
      getComputedStyle(
        canvas.getByRole('group', { name }).querySelector<HTMLElement>('.ugl-phone-frame__status-bar')!
      ).color;
    // O valor do token imersivo, no formato que getComputedStyle devolve.
    const hex = uglInvariantColors.immersiveText.value.replace('#', '');
    const white = `rgb(${[0, 2, 4].map((at) => parseInt(hex.slice(at, at + 2), 16)).join(', ')})`;
    await waitFor(() => expect(statusColor('Visualizador, cromo imersivo')).toBe(white));
    await expect(statusColor('Biblioteca, cromo do tema')).not.toBe(white);
  },
};

/**
 * Os dois temas lado a lado.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UglDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="secondary">
          <PhoneFrame scale={0.6} theme={theme} ariaLabel={theme === 'light' ? 'Tema claro' : 'Tema escuro'}>
            <LibraryScreen />
          </PhoneFrame>
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Cromo imersivo nos dois temas: a camada imersiva é igual; só a biblioteca muda.
 */
export const CromoImersivoEscuro: Story = {
  name: 'Cromo imersivo no tema escuro',
  render: () => <ChromeComparison theme="dark" />,
};
