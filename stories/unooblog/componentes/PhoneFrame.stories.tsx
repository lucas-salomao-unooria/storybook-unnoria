import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import { BottomSheet } from '../../../src/unooblog/components/BottomSheet';
import { PhoneFrame } from '../../../src/unooblog/components/PhoneFrame';
import type { UblPhoneFrameProps } from '../../../src/unooblog/components/PhoneFrame';
import { Toast } from '../../../src/unooblog/components/Toast';
import { ublInvariantColors, ublLayout } from '../../../src/unooblog/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocAnatomy,
  UblDocCard,
  UblDocDecisions,
  UblDocGrid,
  UblDocPractices,
  UblDocPropsTable,
  UblDocSpecs,
  UblDocStage,
  UblDocThemeSwitcher,
} from '../../../.storybook/components';
import { PaginaDeFundo, notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Três níveis de carga, um por glifo de bateria (≥ 60%, ≥ 30% e abaixo). */
const BATTERY_LEVELS = [82, 45, 12] as const;

/**
 * Tela de demonstração: a página do blog (marca, tópicos e três posts), montada com
 * os componentes reais. O conteúdo corre por baixo da barra de status.
 */
const PaginaDemo: React.FC = () => <PaginaDeFundo formato="celular" posts={3} />;

/**
 * Caixa que ocupa a tela inteira com o recuo das áreas seguras: a faixa sutil é
 * o que as barras de sistema cobrem.
 */
const SafeAreaBox: React.FC = () => (
  <div
    data-ubl-safe-area-box=""
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 'var(--ubl-safe-area-top)',
      paddingBottom: 'var(--ubl-safe-area-bottom)',
      background: 'var(--ubl-color-background-subtle)',
    }}
  >
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--ubl-spacing-xs)',
        margin: '0 var(--ubl-gutter)',
        borderRadius: 'var(--ubl-radius-m)',
        border: '2px dashed var(--ubl-color-border-control)',
        background: 'var(--ubl-color-background-card)',
        color: 'var(--ubl-color-text-primary)',
        fontFamily: 'var(--ubl-font-sans)',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 'var(--ubl-font-heading-4-size)',
          lineHeight: 'var(--ubl-font-heading-4-line)',
          fontWeight: 'var(--ubl-font-heading-4-weight)' as React.CSSProperties['fontWeight'],
        }}
      >
        Área útil
      </p>
      <p
        style={{
          margin: 0,
          maxWidth: 260,
          color: 'var(--ubl-color-text-secondary)',
          fontSize: 'var(--ubl-font-body-md-size)',
          lineHeight: 'var(--ubl-font-body-md-line)',
        }}
      >
        padding-top: var(--ubl-safe-area-top)
        <br />
        padding-bottom: var(--ubl-safe-area-bottom)
      </p>
    </div>
  </div>
);

/** Camadas de demonstração sobre a página: a folha inferior e o aviso, presos à tela. */
const PaginaComCamadas: React.FC = () => (
  <PaginaDeFundo formato="celular" posts={3}>
    <BottomSheet open onClose={() => undefined} title="Ações do post" dismissOnScrim={false}>
      <p style={notaEstilo}>A folha e o aviso se posicionam na tela do aparelho, e não na janela.</p>
    </BottomSheet>
    <Toast open duration={0} message="Post salvo para ler depois" actionLabel="Desfazer" onAction={() => undefined} offset={72} />
  </PaginaDeFundo>
);

/** Rótulo abaixo de cada aparelho numa matriz. */
const FrameCaption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ ...notaEstilo, marginTop: 8, textAlign: 'center' }}>{children}</p>
);

/**
 * Página de documentação rica do PhoneFrame.
 */
const PhoneFrameDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Estrutura"
      title="PhoneFrame"
      description={`Aparelho genérico de ${ublLayout.screenWidth} × ${ublLayout.screenHeight}px onde o blog roda no celular: corpo, aro, botões laterais, ilha da câmera, barra de status e barra de gesto, nas cores invariantes do módulo. Não é só uma moldura — redefine as áreas seguras da tela e é o bloco de contenção de todas as sobreposições (diálogo, folha e aviso).`}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UblDocGrid>
      <UblDocCard icon="📱" title="Palco do blog no celular">
        Toda tela do BlogApp no celular é validada dentro dele, na medida de {ublLayout.screenWidth} ×{' '}
        {ublLayout.screenHeight}px. O contêiner de 390px é o que põe o blog em uma coluna.
      </UblDocCard>
      <UblDocCard icon="📐" title="Áreas seguras">
        Com a barra de status, a tela redefine <code>--ubl-safe-area-top</code> em {ublLayout.statusbarHeight}px; com a
        barra de gesto, <code>--ubl-safe-area-bottom</code> em {ublLayout.homeIndicatorHeight}px. Barras, folhas e
        avisos as somam ao próprio recuo.
      </UblDocCard>
      <UblDocCard icon="🧱" title="Bloco de contenção">
        A tela tem <code>transform</code> e <code>overflow: hidden</code>: folhas, diálogos e avisos ficam presos a ela,
        até um <code>position: fixed</code> interno.
      </UblDocCard>
      <UblDocCard icon="🔋" title="Barra de status com nome">
        Sinal, conexão e bateria são glifos da biblioteca do módulo, com nome acessível; a bateria diz o número
        (&quot;Bateria em 82%&quot;), que o glifo sozinho não diz.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="PhoneFrame"
      layout={`Aparelho · ${ublLayout.screenWidth + 24} × ${ublLayout.screenHeight + 24}px`}
      specs={[
        { label: 'Tela', value: `${ublLayout.screenWidth} × ${ublLayout.screenHeight}px` },
        { label: 'Aro (bezel)', value: '12px · raio 62px' },
        { label: 'Raio da tela', value: '50px' },
        { label: 'Barra de status', value: `${ublLayout.statusbarHeight}px · horário em label-lg` },
        { label: 'Ilha da câmera', value: '124 × 36px' },
        { label: 'Glifos de sistema', value: 'signal e wifi 18px · bateria 24px' },
        { label: 'Barra de gesto', value: `${ublLayout.homeIndicatorHeight}px de zona · 134 × 5px` },
        { label: 'Corpo', value: `${ublInvariantColors.deviceBody.value} · invariante` },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Mesmo aparelho do jornal, tela do blog',
          detail:
            'as medidas do aparelho (390 × 844px, áreas seguras de 47px e 34px) são as mesmas do PhoneFrame do jornal, para que as duas marcas se comparem lado a lado; o que muda é a tela, que abre em background-page (branca no claro) e carrega os tokens --ubl-*.',
        },
        {
          subject: 'Aparelho genérico',
          detail:
            'as proporções lembram um celular atual, mas nenhum detalhe imita um aparelho de mercado: ilha simples com uma lente, quatro botões laterais e cores da própria paleta roxa.',
        },
        {
          subject: 'Medidas locais do aparelho',
          detail:
            'aro de 12px, raio de 62px, raio da tela de 50px, ilha de 124 × 36px, lente de 12px, botões de 3px e barra de gesto de 134 × 5px são custom properties locais (--ubl-phone-frame-*) no topo de PhoneFrame.css, sem token equivalente.',
        },
        {
          subject: 'Cromo na cor do texto do tema',
          detail:
            'a barra de status e a barra de gesto usam a cor de texto primária do tema; o blog não tem camada imersiva (o bloco de código escuro ocupa só uma faixa da leitura), então o cromo nunca vira branco por conta própria.',
        },
        {
          subject: 'Bateria por nível',
          detail:
            'o glifo segue a carga: batteryHigh a partir de 60%, batteryMedium a partir de 30% e batteryLow abaixo.',
        },
        {
          subject: 'Glifos de sistema com nome',
          detail:
            'sinal, conexão e bateria recebem title e viram role="img"; a ilha, os botões laterais e a barra de gesto são decorativos (aria-hidden).',
        },
        {
          subject: 'Escala por transform',
          detail:
            'scale encolhe o aparelho inteiro com transform e reserva o espaço já escalado num invólucro, para caber em páginas de documentação sem alterar nenhuma medida interna — e o contêiner continua com 390px, então o blog continua em uma coluna.',
        },
        {
          subject: 'Contêiner de documentação',
          detail:
            'o PhoneFrame não é peça de produto: um app real já roda num aparelho. Ele existe para validar telas inteiras e demonstrar as áreas seguras.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocAnatomy
      zones={[
        {
          name: 'Corpo e aro',
          role: 'Só em device="bezel": corpo escuro, aro de 2px e botões laterais.',
          token: '--ubl-color-device-body · --ubl-color-device-edge · --ubl-color-device-button',
        },
        {
          name: 'Tela',
          role: 'Bloco de contenção de 390 × 844px, em background-page.',
          token: '--ubl-screen-width · --ubl-screen-height',
        },
        {
          name: 'Barra de status',
          role: 'Horário, ilha da câmera, sinal, conexão e bateria, em --ubl-z-statusbar.',
          token: '--ubl-statusbar-height · --ubl-color-text-primary',
        },
        {
          name: 'Conteúdo',
          role: 'Slot children em coluna; ocupa a tela inteira, por baixo das barras.',
          token: '--ubl-safe-area-top · --ubl-safe-area-bottom',
        },
        { name: 'Barra de gesto', role: 'Pílula decorativa na base.', token: '--ubl-home-indicator-height' },
        { name: 'Invólucro de escala', role: 'Só com scale ≠ 1: reserva a caixa escalada.', token: 'transform: scale()' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes, tamanhos e estados" />
    <UblDocStage label="Aparelho inteiro e só a tela" surface="subtle" align="flex-start" gap={32}>
      <div>
        <PhoneFrame device="bezel" scale={0.45} ariaLabel="Aparelho inteiro">
          <PaginaDemo />
        </PhoneFrame>
        <FrameCaption>device=&quot;bezel&quot;</FrameCaption>
      </div>
      <div>
        <PhoneFrame device="screen" scale={0.45} ariaLabel="Só a tela">
          <PaginaDemo />
        </PhoneFrame>
        <FrameCaption>device=&quot;screen&quot;</FrameCaption>
      </div>
    </UblDocStage>
    <UblDocStage label="Bateria em três níveis" surface="subtle" align="flex-start" gap={32}>
      {BATTERY_LEVELS.map((level) => (
        <div key={level}>
          <PhoneFrame scale={0.45} battery={level} ariaLabel={`Bateria em ${level}%`}>
            <PaginaDemo />
          </PhoneFrame>
          <FrameCaption>battery=&#123;{level}&#125;</FrameCaption>
        </div>
      ))}
    </UblDocStage>
    <UblDocStage label="Barras de sistema e áreas seguras" surface="subtle" align="flex-start" gap={32}>
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
    </UblDocStage>
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14 }}>Sobreposições presas à tela</h4>
    <UblDocStage surface="subtle" align="flex-start" gap={32}>
      <PhoneFrame scale={0.55} ariaLabel="Folha e aviso sobre a página">
        <PaginaComCamadas />
      </PhoneFrame>
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Somar --ubl-safe-area-top e --ubl-safe-area-bottom ao recuo das barras, folhas e avisos.',
        'Deixar o conteúdo correr por baixo das barras de sistema, como num aparelho real.',
        'Posicionar sobreposições com position: absolute; inset: 0 dentro da tela.',
        'Usar scale para caber na página, em vez de mudar as medidas.',
        'Validar o blog no aparelho: é a largura de 390px que o põe em uma coluna.',
      ]}
      donts={[
        'Usar o PhoneFrame em produção: é contêiner de documentação.',
        'Escrever 47px ou 34px no lugar da área segura.',
        'Abrir sobreposição em portal ou com position: fixed na janela.',
        'Pintar a barra de status por conta própria: ela acompanha o tema sozinha.',
        'Imitar um aparelho de mercado (entalhe, botões ou marca reconhecíveis).',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A tela e o cromo seguem data-ubl-theme; o corpo do aparelho é invariante."
    />
    <UblDocThemeSwitcher surface="subtle">
      {() => (
        <>
          <PhoneFrame scale={0.55} ariaLabel="Página no tema ativo">
            <PaginaDemo />
          </PhoneFrame>
          <PhoneFrame scale={0.55} ariaLabel="Folha e aviso no tema ativo">
            <PaginaComCamadas />
          </PhoneFrame>
        </>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UblDocPropsTable
      title="PhoneFrame"
      rows={[
        { name: 'device', type: "'bezel' | 'screen'", default: "'bezel'", description: 'Aparelho inteiro, ou só a tela de cantos arredondados.' },
        { name: 'time', type: 'string', default: "'9:41'", description: 'Horário da barra de status.' },
        { name: 'battery', type: 'number', default: '82', description: 'Carga de 0 a 100; escolhe o glifo e o rótulo "Bateria em N%".' },
        { name: 'statusBar', type: 'boolean', default: 'true', description: 'Barra de status e ilha; liga a área segura superior.' },
        { name: 'homeIndicator', type: 'boolean', default: 'true', description: 'Barra de gesto; liga a área segura inferior.' },
        { name: 'scale', type: 'number', default: '1', description: 'Escala de exibição; o aparelho ocupa o espaço já escalado.' },
        { name: 'ariaLabel', type: 'string', description: 'Rótulo acessível; vira role="group".' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema da tela; sem valor, herda data-ubl-theme.' },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo da tela; as sobreposições se posicionam dentro dela.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional (no invólucro de escala quando scale ≠ 1).' },
        { name: '…HTMLAttributes<HTMLDivElement>', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Repassadas ao nó raiz (o invólucro de escala quando scale ≠ 1).' },
      ]}
    />
    <UblDocPropsTable
      title="Tipos e contrato de CSS"
      rows={[
        { name: 'UblPhoneFrameDevice', type: "'bezel' | 'screen'", description: 'Apresentação do aparelho.' },
        { name: 'UblPhoneFrameProps', type: 'interface', description: 'Props acima.' },
        { name: '--ubl-safe-area-top', type: 'px', default: `${ublLayout.statusbarHeight}px`, description: 'Definida na tela quando statusBar.' },
        { name: '--ubl-safe-area-bottom', type: 'px', default: `${ublLayout.homeIndicatorHeight}px`, description: 'Definida na tela quando homeIndicator.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PhoneFrame> = {
  title: 'Unooblog/Componentes/PhoneFrame',
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
    ariaLabel: 'Blog no aparelho',
    className: '',
  },
};

export default meta;

type Story = StoryObj<UblPhoneFrameProps>;

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
    <UblDocStage theme={args.theme ?? 'light'} surface="subtle" padding={32}>
      <PhoneFrame {...args} className={className || undefined}>
        <PaginaDemo />
      </PhoneFrame>
    </UblDocStage>
  ),
};

/**
 * Composição realista: a página do blog no aparelho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: página do blog no aparelho',
  render: () => (
    <UblDocStage surface="subtle" padding={32}>
      <PhoneFrame scale={0.75} ariaLabel="Página do blog no aparelho">
        <PaginaDemo />
      </PhoneFrame>
    </UblDocStage>
  ),
};

/**
 * Aparelho inteiro e só a tela.
 */
export const TodasVariantes: Story = {
  name: 'Aparelho inteiro e só a tela',
  render: () => (
    <UblDocStage surface="subtle" align="flex-start" gap={32}>
      <PhoneFrame device="bezel" scale={0.6} ariaLabel="Aparelho inteiro">
        <PaginaDemo />
      </PhoneFrame>
      <PhoneFrame device="screen" scale={0.6} ariaLabel="Só a tela">
        <PaginaDemo />
      </PhoneFrame>
    </UblDocStage>
  ),
};

/**
 * Três escalas de exibição.
 */
export const Tamanhos: Story = {
  name: 'Escalas',
  render: () => (
    <UblDocStage surface="subtle" align="flex-start" gap={32}>
      {[0.4, 0.55, 0.75].map((scale) => (
        <div key={scale}>
          <PhoneFrame scale={scale} ariaLabel={`Escala ${scale}`}>
            <PaginaDemo />
          </PhoneFrame>
          <FrameCaption>scale=&#123;{scale}&#125;</FrameCaption>
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * Bateria em três níveis e barras de sistema ligadas e desligadas. O `play`
 * confere o rótulo acessível e o glifo de cada bateria.
 */
export const Estados: Story = {
  name: 'Bateria e barras de sistema',
  render: () => (
    <UblDocStage surface="subtle" align="flex-start" gap={32}>
      {BATTERY_LEVELS.map((level) => (
        <div key={level}>
          <PhoneFrame scale={0.45} battery={level} ariaLabel={`Aparelho com ${level}% de carga`}>
            <PaginaDemo />
          </PhoneFrame>
          <FrameCaption>battery=&#123;{level}&#125;</FrameCaption>
        </div>
      ))}
      <div>
        <PhoneFrame scale={0.45} statusBar={false} homeIndicator={false} ariaLabel="Aparelho sem barras">
          <PaginaDemo />
        </PhoneFrame>
        <FrameCaption>sem barras de sistema</FrameCaption>
      </div>
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const glyphs = BATTERY_LEVELS.map((level) =>
      within(canvas.getByRole('group', { name: `Aparelho com ${level}% de carga` }))
        .getByRole('img', { name: `Bateria em ${level}%` })
        .getAttribute('data-ubl-icon')
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
    <UblDocStage surface="subtle">
      <PhoneFrame scale={0.6} ariaLabel="Aparelho de demonstração">
        <PaginaDemo />
      </PhoneFrame>
    </UblDocStage>
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
    <UblDocStage surface="subtle" align="flex-start" gap={32}>
      <PhoneFrame scale={0.55} ariaLabel="Com as duas barras">
        <SafeAreaBox />
      </PhoneFrame>
      <PhoneFrame scale={0.55} statusBar={false} homeIndicator={false} ariaLabel="Sem barras">
        <SafeAreaBox />
      </PhoneFrame>
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const [withBars, withoutBars] = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('[data-ubl-safe-area-box]')
    );
    await expect(getComputedStyle(withBars).paddingTop).toBe(`${ublLayout.statusbarHeight}px`);
    await expect(getComputedStyle(withBars).paddingBottom).toBe(`${ublLayout.homeIndicatorHeight}px`);
    await expect(getComputedStyle(withoutBars).paddingTop).toBe('0px');
    await expect(getComputedStyle(withoutBars).paddingBottom).toBe('0px');
  },
};

/**
 * Sobreposições presas à tela: a folha e o aviso ficam dentro do aparelho, e não
 * na janela. O `play` confere que as duas camadas estão dentro da caixa do aparelho.
 */
export const SobreposicaoNaTela: Story = {
  name: 'Sobreposições presas à tela',
  render: () => (
    <UblDocStage surface="subtle">
      <PhoneFrame scale={0.7} ariaLabel="Aparelho com folha e aviso">
        <PaginaComCamadas />
      </PhoneFrame>
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aparelho = canvas.getByRole('group', { name: 'Aparelho com folha e aviso' });
    const box = aparelho.getBoundingClientRect();
    const dentro = (node: Element) => {
      const rect = node.getBoundingClientRect();
      return (
        rect.left >= box.left - 1 && rect.right <= box.right + 1 && rect.top >= box.top - 1 && rect.bottom <= box.bottom + 1
      );
    };

    // A folha e o aviso entram com movimento: espera assentarem.
    const folha = within(aparelho).getByRole('dialog', { name: 'Ações do post' });
    await waitFor(() => expect(dentro(folha)).toBe(true));
    // A folha esconde o fundo (aria-hidden), e o aviso é irmão do fundo: acha-se com `hidden`.
    const aviso = within(aparelho).getByRole('status', { hidden: true });
    await waitFor(() => expect(dentro(aviso)).toBe(true));
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
        <UblDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="subtle">
          <PhoneFrame scale={0.6} theme={theme} ariaLabel={theme === 'light' ? 'Tema claro' : 'Tema escuro'}>
            <PaginaDemo />
          </PhoneFrame>
        </UblDocStage>
      ))}
    </div>
  ),
};
