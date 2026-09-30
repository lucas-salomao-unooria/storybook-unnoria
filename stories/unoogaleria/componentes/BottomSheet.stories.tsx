import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { BottomSheet } from '../../../src/unoogaleria/components/BottomSheet';
import type {
  UglBottomSheetHeight,
  UglBottomSheetVariant,
} from '../../../src/unoogaleria/components/BottomSheet';
import { Button } from '../../../src/unoogaleria/components/Button';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
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
import { uglAlbums, uglPhotos } from '../fixtures';
import { TelaDeFundo, notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Foto de demonstração cujas opções a folha oferece. */
const FOTO = uglPhotos[0];

/**
 * Conteúdo de demonstração: as opções de uma foto e, na versão longa, a lista
 * de álbuns para rolar dentro da folha.
 */
const ConteudoDaFolha: React.FC<{ longo?: boolean; aoEscolher?: (rotulo: string) => void }> = ({
  longo = false,
  aoEscolher,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Button variant="secondary" fullWidth iconStart="addToAlbum" onClick={() => aoEscolher?.('Adicionar a um álbum')}>
      Adicionar a um álbum
    </Button>
    <Button variant="secondary" fullWidth iconStart="duplicate" onClick={() => aoEscolher?.('Duplicar')}>
      Duplicar
    </Button>
    <Button variant="secondary" fullWidth iconStart="hide" onClick={() => aoEscolher?.('Ocultar')}>
      Ocultar
    </Button>
    {longo &&
      [...uglAlbums, ...uglAlbums].map((album, index) => (
        <Button
          key={`${album.id}-${index}`}
          variant="tertiary"
          fullWidth
          iconStart="albums"
          onClick={() => aoEscolher?.(album.title)}
        >
          {album.title}
        </Button>
      ))}
  </div>
);

/**
 * Folha de demonstração dentro do aparelho, com o botão que abre e fecha. O
 * estado de aberto é do produto (aqui, da estória).
 */
const FolhaDemo: React.FC<{
  theme?: 'light' | 'dark';
  inicialAberta?: boolean;
  height?: UglBottomSheetHeight;
  variant?: UglBottomSheetVariant;
  handle?: boolean;
  showClose?: boolean;
  dismissOnScrim?: boolean;
  comDescricao?: boolean;
  comRodape?: boolean;
  longo?: boolean;
  scale?: number;
}> = ({
  theme,
  inicialAberta = false,
  height = 'auto',
  variant = 'default',
  handle = true,
  showClose = true,
  dismissOnScrim = true,
  comDescricao = true,
  comRodape = false,
  longo = false,
  scale = 0.75,
}) => {
  const [aberta, setAberta] = useState(inicialAberta);
  const [ultima, setUltima] = useState<string | null>(null);
  const imersiva = variant === 'immersive';

  return (
    <PhoneFrame scale={scale} theme={theme} ariaLabel="Aparelho de demonstração">
      <TelaDeFundo
        imersiva={imersiva}
        titulo={imersiva ? 'Hoje' : 'Biblioteca'}
        faixa={
          <>
            <Button
              variant={imersiva ? 'immersive' : 'primary'}
              size="sm"
              iconStart="more"
              onClick={() => setAberta(true)}
            >
              Abrir a folha
            </Button>
            {ultima && !imersiva && <p style={notaEstilo}>Última escolha: {ultima}</p>}
          </>
        }
      >
        <BottomSheet
          open={aberta}
          onClose={() => setAberta(false)}
          title="Opções da foto"
          description={comDescricao ? FOTO.alt : undefined}
          height={height}
          variant={variant}
          handle={handle}
          showClose={showClose}
          dismissOnScrim={dismissOnScrim}
          footer={
            comRodape ? (
              <Button variant={imersiva ? 'immersive' : 'primary'} fullWidth onClick={() => setAberta(false)}>
                Concluído
              </Button>
            ) : undefined
          }
        >
          <ConteudoDaFolha
            longo={longo}
            aoEscolher={(rotulo) => {
              setUltima(rotulo);
              setAberta(false);
            }}
          />
        </BottomSheet>
      </TelaDeFundo>
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente BottomSheet.
 */
const BottomSheetDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Sobreposições"
      title="BottomSheet"
      description="Folha inferior modal da galeria: sobe da base da tela do aparelho sobre o véu, com cantos de 24px no topo, alça que expande e recolhe, título, conteúdo rolável e rodapé opcional. É a base do compartilhamento e do painel de informações."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma camada da tela, não da janela."
    />
    <UglDocGrid>
      <UglDocCard icon="📱" title="Presa à tela do aparelho">
        A folha é <code>position: absolute; inset: 0</code> no contêiner posicionado mais próximo —
        dentro do <code>PhoneFrame</code>, a tela. Nunca portal, nunca <code>position: fixed</code>.
      </UglDocCard>
      <UglDocCard icon="🧭" title="Foco de camada">
        O <code>useModalFocus</code> do módulo prende o Tab, fecha no Esc, marca o fundo com{' '}
        <code>aria-hidden</code> e devolve o foco a quem abriu. Só a camada do topo responde.
      </UglDocCard>
      <UglDocCard icon="↕️" title="Alça que expande">
        A alça é um botão &quot;Expandir&quot;/&quot;Recolher&quot; com <code>aria-expanded</code>:
        alterna entre a altura pedida e a tela inteira, sem gesto obrigatório.
      </UglDocCard>
      <UglDocCard icon="🌗" title="Comum e imersiva">
        A variante <code>immersive</code> usa a superfície invariante do visualizador, para abrir
        informações e compartilhamento sobre a mídia sem clarear a tela.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UglDocSpecs
      component="BottomSheet"
      layout="Camada absoluta · painel na base · cantos de 24px no topo"
      specs={[
        { label: 'Véu', value: '--ugl-color-overlay-scrim' },
        { label: 'Painel', value: '--ugl-color-background-elevated · --ugl-elevation-overlay' },
        { label: 'Raio', value: '--ugl-radius-xl (24px) só no topo' },
        { label: 'Camada', value: '--ugl-z-sheet (30)' },
        { label: 'Alturas', value: "auto (até a barra de status) · half 50% · full" },
        { label: 'Recuo inferior', value: '--ugl-safe-area-bottom' },
        { label: 'Alça', value: '36×5px num alvo de 44px' },
        { label: 'Título', value: 'Title/Medium (18/28, 600)' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Montar é abrir',
          detail:
            'fechada, a folha não renderiza nada; aberta, monta uma camada interna. Assim a alça volta ao estado inicial a cada abertura e o hook devolve o foco ao desmontar, sem efeito que reinicie estado.',
        },
        {
          subject: 'Alça como botão, sem arrastar',
          detail:
            'a alça alterna a altura por toque, Enter ou Espaço, com aria-expanded. Não há gesto de arrastar: todo caminho é acessível por teclado e leitor de tela. De height="full", a alça recolhe para metade da tela.',
        },
        {
          subject: 'Foco inicial no botão de fechar',
          detail:
            'sem initialFocusRef, o foco vai para "Fechar" — o primeiro elemento focável seria a alça, que não é a ação esperada. Sem o botão de fechar, vale o primeiro focável.',
        },
        {
          subject: 'Medidas locais',
          detail:
            '--ugl-bottom-sheet-grip-width (36px) e -grip-height (5px) desenham a alça, sem token equivalente; --ugl-bottom-sheet-top-gap (8px, --ugl-spacing-xs) é a folga entre a folha cheia e a barra de status.',
        },
        {
          subject: 'Título em Title/Medium',
          detail:
            'a escala reserva Title/Small às folhas, mas a folha tem título de diálogo e botão de fechar de 44px na mesma linha; o degrau médio alinha melhor com o alvo. Registrado para revisão.',
        },
        {
          subject: 'Imersiva sem sombra',
          detail:
            'sobre a superfície imersiva a sombra escura não se vê; a folha imersiva troca a elevação por um fio de 1px em --ugl-color-immersive-border no topo.',
        },
        {
          subject: 'Movimento',
          detail:
            'o véu esmaece e o painel sobe em --ugl-transition-slow; a troca de altura também anima. Em prefers-reduced-motion as duas animações e a transição são desligadas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Toque em “Abrir a folha” para ver cada zona no aparelho."
    />
    <UglDocStage surface="secondary" align="flex-start" padding={16}>
      <FolhaDemo comRodape scale={0.6} />
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Véu', role: 'Cobre a tela; o toque fecha (dismissOnScrim).', token: '--ugl-color-overlay-scrim' },
            { name: 'Alça', role: 'Botão Expandir/Recolher com aria-expanded.', token: '--ugl-color-border-control' },
            { name: 'Cabeçalho', role: 'Título (nomeia o diálogo), descrição e botão Fechar.', token: 'Title/Medium · Body/Medium' },
            { name: 'Corpo', role: 'Conteúdo rolável, com barra fina.', token: '--ugl-gutter' },
            { name: 'Rodapé', role: 'Ações fixas, separadas por fio.', token: '--ugl-elevation-hairline-top' },
            { name: 'Área segura', role: 'Recuo inferior da barra de gesto.', token: '--ugl-safe-area-bottom' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada aparelho abre a folha real; as estórias Tamanhos, TodasVariantes e Estados mostram as mesmas combinações já abertas."
    />
    <UglDocStage label="Alturas" surface="secondary" align="flex-start" padding={16}>
      {(['auto', 'half', 'full'] as const).map((altura) => (
        <div key={altura} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>height=&quot;{altura}&quot;</p>
          <FolhaDemo height={altura} longo={altura !== 'auto'} scale={0.5} />
        </div>
      ))}
    </UglDocStage>
    <UglDocStage label="Variantes" surface="secondary" align="flex-start" padding={16}>
      {(['default', 'immersive'] as const).map((variante) => (
        <div key={variante} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>variant=&quot;{variante}&quot;</p>
          <FolhaDemo variant={variante} scale={0.5} />
        </div>
      ))}
    </UglDocStage>
    <UglDocStage label="Estados" surface="secondary" align="flex-start" padding={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>sem alça e sem Fechar</p>
        <FolhaDemo handle={false} showClose={false} scale={0.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>véu que não fecha, com rodapé</p>
        <FolhaDemo dismissOnScrim={false} comRodape scale={0.5} />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando usar uma folha." />
    <UglDocPractices
      dos={[
        'Dar um título à folha: é ele que nomeia o diálogo para o leitor de tela.',
        'Renderizar a folha dentro da tela (o PhoneFrame ou o contêiner do produto), irmã do conteúdo de fundo.',
        'Usar a variante immersive quando a folha abre sobre o visualizador.',
        'Pôr ações que concluem a tarefa no footer, fora da área que rola.',
        'Deixar dismissOnScrim ligado em folhas de escolha; desligar quando há edição a perder.',
      ]}
      donts={[
        'Levar a folha para um portal no body: ela sairia do aparelho e das áreas seguras.',
        'Abrir folha sobre folha para escolhas simples — use um ActionMenu.',
        'Usar a folha para confirmar exclusão: isso é um ConfirmDialog.',
        'Esconder o botão de fechar e o véu ao mesmo tempo: restaria só o Esc.',
        'Colocar a folha dentro do nó que ela deve esconder: o fundo precisa ser irmão da camada.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Painel e véu acompanham o tema; a variante imersiva é invariante."
    />
    <UglDocThemeSwitcher surface="secondary" padding={16}>
      {(tema) => <FolhaDemo key={tema} theme={tema} comRodape scale={0.6} />}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do BottomSheet. Os demais atributos vão ao painel (role=dialog)."
    />
    <UglDocPropsTable
      title="BottomSheet"
      rows={[
        { name: 'open', type: 'boolean', description: 'Folha aberta. Fechada, não renderiza nada. Obrigatório.' },
        { name: 'onClose', type: '() => void', description: 'Fechar, Esc e toque no véu. Obrigatório.' },
        { name: 'title', type: 'ReactNode', description: 'Título; nomeia o diálogo (aria-labelledby).' },
        { name: 'description', type: 'ReactNode', description: 'Linha de apoio; descreve o diálogo (aria-describedby).' },
        { name: 'children', type: 'ReactNode', description: 'Conteúdo rolável.' },
        { name: 'footer', type: 'ReactNode', description: 'Rodapé fixo abaixo do conteúdo.' },
        { name: 'height', type: "'auto' | 'half' | 'full'", default: "'auto'", description: 'Altura inicial.' },
        { name: 'handle', type: 'boolean', default: 'true', description: 'Alça Expandir/Recolher com aria-expanded.' },
        { name: 'closeLabel', type: 'string', default: "'Fechar'", description: 'Nome acessível do botão de fechar.' },
        { name: 'showClose', type: 'boolean', default: 'true', description: 'Mostra o botão de fechar.' },
        { name: 'dismissOnScrim', type: 'boolean', default: 'true', description: 'Toque no véu fecha.' },
        { name: 'variant', type: "'default' | 'immersive'", default: "'default'", description: 'Superfície elevada do tema ou imersiva invariante.' },
        { name: 'initialFocusRef', type: 'RefObject<HTMLElement | null>', description: 'Recebe o foco ao abrir (padrão: Fechar).' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'aria-label', type: 'string', description: 'Nome explícito; com ele, o título não vira aria-labelledby.' },
      ]}
    />
    <UglDocPropsTable
      title="UglBottomSheetHeight · UglBottomSheetVariant"
      rows={[
        { name: "'auto'", type: 'UglBottomSheetHeight', description: 'Acompanha o conteúdo, até a barra de status.' },
        { name: "'half'", type: 'UglBottomSheetHeight', description: 'Metade da tela.' },
        { name: "'full'", type: 'UglBottomSheetHeight', description: 'A tela inteira, abaixo da barra de status.' },
        { name: "'default'", type: 'UglBottomSheetVariant', description: 'background-elevated com elevação.' },
        { name: "'immersive'", type: 'UglBottomSheetVariant', description: 'immersive-surface com fio superior.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof BottomSheet> = {
  title: 'Unoogaleria/Componentes/BottomSheet',
  component: BottomSheet,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Folha aberta.' },
    title: { control: 'text', description: 'Título; nomeia o diálogo.' },
    description: { control: 'text', description: 'Linha de apoio; descreve o diálogo.' },
    height: { control: 'radio', options: ['auto', 'half', 'full'], description: 'Altura inicial.' },
    handle: { control: 'boolean', description: 'Alça Expandir/Recolher.' },
    closeLabel: { control: 'text', description: 'Nome acessível do botão de fechar.' },
    showClose: { control: 'boolean', description: 'Mostra o botão de fechar.' },
    dismissOnScrim: { control: 'boolean', description: 'Toque no véu fecha.' },
    variant: { control: 'radio', options: ['default', 'immersive'], description: 'Variante visual.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: false, description: 'Conteúdo rolável (a estória usa as opções da foto).' },
    footer: { control: false, description: 'Rodapé fixo (a estória usa “Concluído”).' },
    initialFocusRef: { control: false, description: 'Elemento que recebe o foco ao abrir.' },
    onClose: { action: 'onClose' },
  },
  args: {
    open: true,
    title: 'Opções da foto',
    description: FOTO.alt,
    height: 'auto',
    handle: true,
    closeLabel: 'Fechar',
    showClose: true,
    dismissOnScrim: true,
    variant: 'default',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BottomSheetDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. A abertura vem do controle
 * `open`; o `onClose` é registrado em Ações.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do BottomSheet',
  render: (args) => (
    <PhoneFrame scale={0.75} theme={args.theme}>
      <TelaDeFundo imersiva={args.variant === 'immersive'}>
        <BottomSheet
          {...args}
          footer={
            <Button variant={args.variant === 'immersive' ? 'immersive' : 'primary'} fullWidth onClick={args.onClose}>
              Concluído
            </Button>
          }
        >
          <ConteudoDaFolha longo={args.height !== 'auto'} />
        </BottomSheet>
      </TelaDeFundo>
    </PhoneFrame>
  ),
};

/**
 * Composição realista: as opções de uma foto sobre a biblioteca, com o botão
 * que abre e fecha.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: opções da foto',
  render: () => <FolhaDemo inicialAberta comRodape />,
};

/**
 * As três alturas, abertas.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['auto', 'half', 'full'] as const).map((altura) => (
        <div key={altura} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>height=&quot;{altura}&quot;</p>
          <FolhaDemo inicialAberta height={altura} longo={altura !== 'auto'} scale={0.55} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Comum e imersiva, abertas.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['default', 'immersive'] as const).map((variante) => (
        <div key={variante} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>variant=&quot;{variante}&quot;</p>
          <FolhaDemo inicialAberta variant={variante} comRodape scale={0.6} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Sem alça e sem fechar; véu que não fecha, com rodapé.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>handle=false · showClose=false</p>
        <FolhaDemo inicialAberta handle={false} showClose={false} scale={0.6} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>dismissOnScrim=false · footer</p>
        <FolhaDemo inicialAberta dismissOnScrim={false} comRodape comDescricao={false} scale={0.6} />
      </div>
    </div>
  ),
};

/**
 * A folha nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>{tema === 'light' ? 'Tema claro' : 'Tema escuro'}</p>
          <FolhaDemo inicialAberta theme={tema} comRodape scale={0.6} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Abre, prende o foco, alterna a alça, fecha com Esc e devolve o foco ao botão.
 */
export const AbrirEFechar: Story = {
  name: 'Abrir, prender o foco e fechar',
  render: () => <FolhaDemo />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const abrir = tela.getByRole('button', { name: 'Abrir a folha' });

    await userEvent.click(abrir);
    const folha = await tela.findByRole('dialog', { name: 'Opções da foto' });
    await expect(folha).toHaveAttribute('aria-modal', 'true');
    await expect(folha).toHaveAccessibleDescription(FOTO.alt);
    await waitFor(() => expect(within(folha).getByRole('button', { name: 'Fechar' })).toHaveFocus());

    // O Tab dá a volta dentro da folha e nunca sai para o fundo.
    for (let passo = 0; passo < 7; passo += 1) {
      await userEvent.tab();
      await expect(folha.contains(document.activeElement)).toBe(true);
    }
    await userEvent.tab({ shift: true });
    await expect(folha.contains(document.activeElement)).toBe(true);

    // A alça alterna a altura e anuncia o estado.
    const alca = within(folha).getByRole('button', { name: 'Expandir' });
    await userEvent.click(alca);
    await expect(alca).toHaveAttribute('aria-expanded', 'true');
    await expect(alca).toHaveAccessibleName('Recolher');

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tela.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(abrir).toHaveFocus());
  },
};
