import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { DesktopFrame } from '../../../src/unoojornal/components/DesktopFrame';
import { Button } from '../../../src/unoojornal/components/Button';
import { Modal } from '../../../src/unoojornal/components/Modal';
import { Toast } from '../../../src/unoojornal/components/Toast';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocGrid,
  UjnDocCard,
  UjnDocSpecs,
  UjnDocDecisions,
  UjnDocAnatomy,
  UjnDocPractices,
  UjnDocStage,
  UjnDocThemeSwitcher,
  UjnDocPropsTable,
} from '../../../.storybook/components';
import { ujnPublication } from '../fixtures';
import { PaginaDeFundo, notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Endereço fictício da publicação de demonstração. */
const URL_DEMO = 'gazetadopatio.escola.br';

/**
 * Quadro com a página do jornal e, quando pedido, uma camada aberta sobre ela
 * (o diálogo e o aviso), para mostrar que a tela é o bloco de contenção.
 */
const QuadroDemo: React.FC<{
  theme?: 'light' | 'dark';
  url?: string;
  width?: number;
  height?: number;
  scale?: number;
  comCamadas?: boolean;
  ariaLabel?: string;
}> = ({ theme, url = URL_DEMO, width, height, scale = 0.5, comCamadas = false, ariaLabel = 'Navegador de demonstração' }) => {
  const [dialogo, setDialogo] = useState(comCamadas);
  const [aviso, setAviso] = useState(comCamadas);

  return (
    <DesktopFrame url={url} width={width} height={height} scale={scale} theme={theme} ariaLabel={ariaLabel}>
      <PaginaDeFundo
        formato="desktop"
        faixa={
          comCamadas ? (
            <Button size="sm" iconStart="info" onClick={() => setDialogo(true)}>
              Abrir o diálogo
            </Button>
          ) : undefined
        }
      >
        {comCamadas && (
          <>
            <Modal
              open={dialogo}
              onClose={() => setDialogo(false)}
              title="Correções e cartas"
              description={ujnPublication.name}
              size="sm"
              footer={<Button onClick={() => setDialogo(false)}>Entendi</Button>}
            >
              Escreva à redação por e-mail ou pelo formulário da edição.
            </Modal>
            <Toast
              open={aviso}
              message="Matéria salva para ler depois"
              icon="bookmarkFilled"
              actionLabel="Desfazer"
              onAction={() => undefined}
              onClose={() => setAviso(false)}
              duration={0}
            />
          </>
        )}
      </PaginaDeFundo>
    </DesktopFrame>
  );
};

/**
 * Página de documentação rica do componente DesktopFrame.
 */
const DesktopFrameDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Documentação"
      title="DesktopFrame"
      description="Quadro de documentação: janela de navegador de 1440×1024px onde a página do jornal roda, com barra de três pontos de janela, campo de endereço e tela que é o bloco de contenção das sobreposições. O irmão largo do PhoneFrame."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Contêiner de documentação, não de produção."
    />
    <UjnDocGrid>
      <UjnDocCard icon="🖥️" title="A página inteira, na escala certa">
        As páginas do jornal se desenham para 1440px. O quadro as mostra nessa largura e, com{' '}
        <code>scale</code>, encolhe tudo para caber na página de documentação.
      </UjnDocCard>
      <UjnDocCard icon="🧱" title="Tela como bloco de contenção">
        A tela tem <code>position: relative</code> e <code>transform</code>: <code>Modal</code>,{' '}
        <code>BottomSheet</code> e <code>Toast</code> (<code>position: absolute</code>) se prendem a ela,
        e não à janela do Storybook. Até um <code>position: fixed</code> interno fica preso.
      </UjnDocCard>
      <UjnDocCard icon="🌐" title="Campo de endereço">
        <code>url</code> aparece na barra, com um cadeado, e dá ao mockup o ar de página publicada.
        Sem <code>url</code>, a barra mostra só os pontos de janela.
      </UjnDocCard>
      <UjnDocCard icon="🎨" title="Cores do aparelho">
        A barra usa as cores invariantes <code>--ujn-color-device-*</code>, sem imitar nenhum navegador
        de mercado. O tema só muda a tela.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UjnDocSpecs
      component="DesktopFrame"
      layout="Barra de 40px + tela de 1440×1024px"
      specs={[
        { label: 'Tela', value: '--ujn-desktop-width × --ujn-desktop-height (1440×1024)' },
        { label: 'Barra', value: '--ujn-desktop-chrome-height (40px) · --ujn-color-device-chrome' },
        { label: 'Campo de endereço', value: '--ujn-color-device-chrome-field · --ujn-color-device-chrome-text' },
        { label: 'Pontos de janela', value: '3 × 12px · --ujn-color-device-button' },
        { label: 'Borda', value: '2px · --ujn-color-device-edge' },
        { label: 'Raio', value: '--ujn-radius-m (8px)' },
        { label: 'Escala', value: 'transform: scale() no quadro todo; ocupa o espaço já escalado' },
        { label: 'Servidor', value: 'Server Component: só recebe props' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Pontos de janela neutros',
          detail:
            'os três pontos da barra usam --ujn-color-device-button, e não o vermelho, o amarelo e o verde dos navegadores de mercado: a paleta do módulo não tem cor de semáforo, e o quadro não imita nenhum navegador. Chrome e borda do quadro têm o mesmo tom (--ujn-color-device-chrome e -edge), então os pontos usam o degrau acima para aparecer.',
        },
        {
          subject: 'Tela que não rola',
          detail:
            'como a tela do PhoneFrame, a do DesktopFrame tem overflow: hidden: o conteúdo cuida da própria rolagem. Assim as sobreposições (position: absolute, inset: 0) cobrem a tela inteira e não correm junto com o texto.',
        },
        {
          subject: 'Tela como bloco de contenção',
          detail:
            'transform: translateZ(0) e isolation: isolate tornam a tela o bloco de contenção até de position: fixed, e isolam o z-index das camadas da página do Storybook. Sem portal: Modal, BottomSheet e Toast ficam presos ao quadro.',
        },
        {
          subject: 'Escala pelo quadro todo',
          detail:
            'com scale ≠ 1, o quadro é desenhado no tamanho real e encolhido por transform, e o contêiner externo ocupa o espaço já escalado (largura × scale, (altura + 40px de barra) × scale) — a página não reserva o espaço do tamanho cheio.',
        },
        {
          subject: 'Medidas por propriedade, não por token fixo',
          detail:
            'width e height entram por propriedades CSS locais (--ujn-desktop-frame-width e -height) e valem 1440 e 1024 por padrão, os mesmos de --ujn-desktop-width e -height. Quadros menores (1024×768) servem a testes de ponto de quebra por contêiner.',
        },
        {
          subject: 'Sem rótulo implícito',
          detail:
            'o quadro só vira role="group" quando recebe ariaLabel. Sem ele, é um invólucro neutro, para não poluir a árvore de acessibilidade da página de documentação.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Cada zona do quadro." />
    <UjnDocStage surface="subtle" align="flex-start" padding={16}>
      <QuadroDemo scale={0.4} />
      <div style={{ flex: '1 1 320px' }}>
        <UjnDocAnatomy
          zones={[
            { name: 'Barra', role: 'Pontos de janela e campo de endereço, nas cores do aparelho.', token: '--ujn-color-device-chrome' },
            { name: 'Pontos de janela', role: 'Três círculos neutros, decorativos.', token: '--ujn-color-device-button' },
            { name: 'Endereço', role: 'Campo em cápsula com cadeado e a url.', token: '--ujn-color-device-chrome-field' },
            { name: 'Tela', role: 'Bloco de contenção das sobreposições; fundo da página.', token: '--ujn-color-background-page' },
            { name: 'Escala', role: 'transform: scale() no quadro; o contêiner ocupa o espaço escalado.', token: 'scale' },
          ]}
        />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O quadro real, em escalas e dimensões diferentes, e com camadas abertas."
    />
    <UjnDocStage label="Escalas" surface="subtle" align="flex-start" padding={16}>
      {[0.3, 0.45].map((escala) => (
        <div key={escala} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>scale={escala}</p>
          <QuadroDemo scale={escala} />
        </div>
      ))}
    </UjnDocStage>
    <UjnDocStage label="Dimensões" surface="subtle" align="flex-start" padding={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>width=1024 · height=768</p>
        <QuadroDemo width={1024} height={768} scale={0.4} />
      </div>
    </UjnDocStage>
    <UjnDocStage label="Estados" surface="subtle" align="flex-start" padding={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>com diálogo e aviso, presos à tela</p>
        <QuadroDemo comCamadas scale={0.45} />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar o quadro." />
    <UjnDocPractices
      dos={[
        'Usar o DesktopFrame só em estórias e documentação: é um andaime, não parte do produto.',
        'Escolher scale para a página caber, sem mudar width e height da tela.',
        'Renderizar Modal, BottomSheet e Toast dentro do quadro, irmãos do conteúdo.',
        'Passar url para dar contexto de página publicada.',
        'Passar ariaLabel quando o quadro for o assunto da estória.',
      ]}
      donts={[
        'Levar o quadro para a aplicação real.',
        'Pintar os pontos de janela de vermelho, amarelo e verde: a paleta do módulo não tem semáforo.',
        'Pôr overflow: auto no conteúdo do quadro e uma sobreposição dentro do que rola.',
        'Redimensionar a tela por CSS externo: use width e height.',
        'Usar o DesktopFrame no lugar do PhoneFrame para testar o celular: as medidas e as áreas seguras são outras.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A tela acompanha o tema; a barra do navegador é invariante."
    />
    <UjnDocThemeSwitcher surface="subtle" padding={16}>
      {(tema) => <QuadroDemo key={tema} theme={tema} scale={0.4} />}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UjnDocPropsTable
      title="DesktopFrame"
      rows={[
        { name: 'url', type: 'string', description: 'Endereço exibido no campo da barra. Sem ele, o campo não é renderizado.' },
        { name: 'width', type: 'number', default: '1440', description: 'Largura da tela, em pixels.' },
        { name: 'height', type: 'number', default: '1024', description: 'Altura da tela, em pixels, sem a barra de 40px.' },
        { name: 'scale', type: 'number', default: '1', description: 'Escala de exibição; o quadro encolhe inteiro e ocupa o espaço escalado.' },
        { name: 'children', type: 'ReactNode', description: 'Conteúdo da tela; sobreposições se prendem a ela.' },
        { name: 'ariaLabel', type: 'string', description: 'Rótulo acessível do quadro (vira role="group").' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema da tela. Sem valor, herda o do contêiner.' },
        { name: 'className / style / ref', type: 'string / CSSProperties / Ref<HTMLDivElement>', description: 'Classe, estilo e ref (do quadro, ou do contêiner escalado quando scale ≠ 1).' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof DesktopFrame> = {
  title: 'Unoojornal/Componentes/DesktopFrame',
  component: DesktopFrame,
  parameters: { layout: 'padded' },
  argTypes: {
    url: { control: 'text', description: 'Endereço exibido na barra do navegador.' },
    width: { control: { type: 'number', min: 640, max: 1920, step: 80 }, description: 'Largura da tela, em pixels.' },
    height: { control: { type: 'number', min: 480, max: 1440, step: 64 }, description: 'Altura da tela, em pixels.' },
    scale: { control: { type: 'range', min: 0.2, max: 1, step: 0.05 }, description: 'Escala de exibição.' },
    ariaLabel: { control: 'text', description: 'Rótulo acessível do quadro.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual da tela.' },
    children: { control: false, description: 'Conteúdo da tela (a estória usa a página do jornal).' },
  },
  args: {
    url: URL_DEMO,
    width: 1440,
    height: 1024,
    scale: 0.5,
    ariaLabel: 'Navegador de demonstração',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof DesktopFrame>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <DesktopFrameDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do DesktopFrame',
  render: (args) => (
    <DesktopFrame {...args}>
      <PaginaDeFundo formato="desktop" />
    </DesktopFrame>
  ),
};

/**
 * Composição realista: a página do jornal com um diálogo e um aviso abertos,
 * presos à tela do quadro.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: página com diálogo e aviso',
  render: () => <QuadroDemo comCamadas scale={0.55} />,
};

/**
 * Três escalas do mesmo quadro.
 */
export const Tamanhos: Story = {
  name: 'Escalas e dimensões',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {[0.25, 0.35, 0.5].map((escala) => (
        <div key={escala} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>scale={escala}</p>
          <QuadroDemo scale={escala} />
        </div>
      ))}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>1024×768 · scale=0.4</p>
        <QuadroDemo width={1024} height={768} scale={0.4} />
      </div>
    </div>
  ),
};

/**
 * Com e sem endereço.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>com url</p>
        <QuadroDemo scale={0.4} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>sem url</p>
        <DesktopFrame scale={0.4} ariaLabel="Navegador sem endereço">
          <PaginaDeFundo formato="desktop" />
        </DesktopFrame>
      </div>
    </div>
  ),
};

/**
 * Sem camadas e com camadas abertas.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>só a página</p>
        <QuadroDemo scale={0.4} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>diálogo e aviso abertos</p>
        <QuadroDemo comCamadas scale={0.4} />
      </div>
    </div>
  ),
};

/**
 * O quadro nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>{tema === 'light' ? 'Tema claro' : 'Tema escuro'}</p>
          <QuadroDemo theme={tema} comCamadas scale={0.4} />
        </div>
      ))}
    </div>
  ),
};

/**
 * A tela é o bloco de contenção: o diálogo e o aviso ficam dentro dela, e o
 * escalonamento ocupa só o espaço escalado.
 */
export const TelaContemASobreposicoes: Story = {
  name: 'A tela contém as sobreposições',
  render: () => <QuadroDemo comCamadas scale={0.4} />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const quadro = tela.getByRole('group', { name: 'Navegador de demonstração' });
    const area = quadro.querySelector('.ujn-desktop-frame__screen') as HTMLElement;

    // O endereço aparece na barra.
    await expect(within(quadro).getByText(URL_DEMO)).toBeInTheDocument();

    // O diálogo nasce aberto e o foco entra nele; o aviso está na região viva.
    const dialogo = await tela.findByRole('dialog', { name: 'Correções e cartas' });
    await expect(area.contains(dialogo)).toBe(true);
    // (o diálogo marca os irmãos com aria-hidden, então a região viva se acha pelo papel, sem a árvore de acessibilidade)
    await expect(area.contains(tela.getByRole('status', { hidden: true }))).toBe(true);

    // O diálogo cabe dentro da tela do quadro, e não na janela do Storybook.
    const caixaDaTela = area.getBoundingClientRect();
    const caixaDoDialogo = dialogo.getBoundingClientRect();
    await expect(caixaDoDialogo.left).toBeGreaterThanOrEqual(caixaDaTela.left);
    await expect(caixaDoDialogo.right).toBeLessThanOrEqual(caixaDaTela.right + 1);
    await expect(caixaDoDialogo.top).toBeGreaterThanOrEqual(caixaDaTela.top);
    await expect(caixaDoDialogo.bottom).toBeLessThanOrEqual(caixaDaTela.bottom + 1);

    // Esc fecha o diálogo e o foco volta à página.
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tela.queryByRole('dialog')).not.toBeInTheDocument());
  },
};

/**
 * Com `scale`, o contêiner ocupa só o espaço escalado.
 */
export const OcupaOEspacoEscalado: Story = {
  name: 'Ocupa o espaço escalado',
  render: () => <QuadroDemo scale={0.5} />,
  play: async ({ canvasElement }) => {
    const quadro = within(canvasElement).getByRole('group', { name: 'Navegador de demonstração' });
    const contentor = quadro.closest('.ujn-desktop-frame-scaler') as HTMLElement;

    // 1440 × 0,5 = 720 de largura; (1024 + 40 de barra) × 0,5 = 532 de altura.
    await expect(contentor).not.toBeNull();
    await expect(contentor.style.width).toBe('720px');
    await expect(contentor.style.height).toBe('532px');
  },
};
