import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { BottomSheet } from '../../../src/unooblog/components/BottomSheet';
import type { UblBottomSheetHeight } from '../../../src/unooblog/components/BottomSheet';
import { Button } from '../../../src/unooblog/components/Button';
import { PhoneFrame } from '../../../src/unooblog/components/PhoneFrame';
import type { UblIconName } from '../../../src/unooblog/components/Icon';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocPractices,
  UblDocStage,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';
import { ublPosts, ublTopics } from '../fixtures';
import { PaginaDeFundo, notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Post cujas ações a folha oferece. */
const POST = ublPosts[0];

/** Ações de um post, na ordem em que a folha as lista. */
const ACOES: { rotulo: string; icone: UblIconName }[] = [
  { rotulo: 'Salvar para ler depois', icone: 'bookmark' },
  { rotulo: 'Compartilhar', icone: 'share' },
  { rotulo: 'Copiar o link', icone: 'link' },
  { rotulo: 'Enviar por e-mail', icone: 'mail' },
];

/**
 * Conteúdo de demonstração: as ações do post e, na versão longa, os tópicos
 * do blog para rolar dentro da folha.
 */
const ConteudoDaFolha: React.FC<{ longo?: boolean; aoEscolher?: (rotulo: string) => void }> = ({
  longo = false,
  aoEscolher,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {ACOES.map((acao) => (
      <Button
        key={acao.rotulo}
        variant="secondary"
        fullWidth
        iconStart={acao.icone}
        onClick={() => aoEscolher?.(acao.rotulo)}
      >
        {acao.rotulo}
      </Button>
    ))}
    {longo &&
      [...ublTopics, ...ublTopics].map((topico, indice) => (
        <Button
          key={`${topico.id}-${indice}`}
          variant="ghost"
          fullWidth
          iconStart="topics"
          onClick={() => aoEscolher?.(topico.label)}
        >
          {topico.label}
        </Button>
      ))}
  </div>
);

/**
 * Folha de demonstração dentro do aparelho, com o botão que abre e fecha. O
 * estado de aberta é do produto (aqui, da estória).
 */
const FolhaDemo: React.FC<{
  theme?: 'light' | 'dark';
  inicialAberta?: boolean;
  height?: UblBottomSheetHeight;
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

  return (
    <PhoneFrame scale={scale} theme={theme} ariaLabel="Aparelho de demonstração">
      <PaginaDeFundo
        faixa={
          <>
            <Button size="sm" iconStart="moreHorizontal" onClick={() => setAberta(true)}>
              Abrir a folha
            </Button>
            {ultima && <p style={notaEstilo}>Última escolha: {ultima}</p>}
          </>
        }
      >
        <BottomSheet
          open={aberta}
          onClose={() => setAberta(false)}
          title="Opções do post"
          description={comDescricao ? POST.title : undefined}
          height={height}
          handle={handle}
          showClose={showClose}
          dismissOnScrim={dismissOnScrim}
          footer={
            comRodape ? (
              <Button fullWidth onClick={() => setAberta(false)}>
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
      </PaginaDeFundo>
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente BottomSheet.
 */
const BottomSheetDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Camadas"
      title="BottomSheet"
      description="Folha inferior modal do blog no celular: sobe da base da tela do aparelho sobre o véu, com cantos de 16px no topo, alça que expande e recolhe, título, conteúdo rolável e rodapé opcional. Abriga o menu de tópicos, o sumário e as ações de um post."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma camada da tela, não da janela."
    />
    <UblDocGrid>
      <UblDocCard icon="📱" title="Presa à tela do aparelho">
        A folha é <code>position: absolute; inset: 0</code> no contêiner posicionado mais próximo —
        dentro do <code>PhoneFrame</code>, a tela. Nunca portal, nunca <code>position: fixed</code>.
      </UblDocCard>
      <UblDocCard icon="🧭" title="Foco de camada">
        O <code>useModalFocus</code> prende o Tab, fecha no Esc, marca o fundo com{' '}
        <code>aria-hidden</code> (restaurando o que havia) e devolve o foco a quem abriu.
      </UblDocCard>
      <UblDocCard icon="↕️" title="Alça que expande">
        A alça é um botão &quot;Expandir&quot;/&quot;Recolher&quot; com <code>aria-expanded</code>:
        alterna entre a altura pedida e a tela inteira, sem gesto obrigatório.
      </UblDocCard>
      <UblDocCard icon="🏷️" title="Se nomeia sozinha">
        O título renderizado vira o <code>aria-labelledby</code>; <code>aria-label</code> explícito
        vence e então não há <code>aria-labelledby</code>.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UblDocSpecs
      component="BottomSheet"
      layout="Camada absoluta · painel na base · cantos de 16px no topo"
      specs={[
        { label: 'Véu', value: '--ubl-color-overlay-scrim' },
        { label: 'Painel', value: '--ubl-color-background-elevated · --ubl-elevation-overlay' },
        { label: 'Raio', value: '--ubl-radius-l (16px; cantos macios) só no topo' },
        { label: 'Camada', value: '--ubl-z-sheet (30)' },
        { label: 'Alturas', value: 'auto (até a barra de status) · half 50% · full' },
        { label: 'Recuo inferior', value: '--ubl-safe-area-bottom' },
        { label: 'Alça', value: '36×5px num alvo de 44px' },
        { label: 'Título', value: 'heading-4 (20/30, 600)' },
      ]}
    />
    <UblDocDecisions
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
          subject: 'Raio de 16px no topo',
          detail:
            'o blog é macio: a folha usa o raio l (--ubl-radius-l), o mesmo dos cartões e do Modal, sem chegar aos 24px do raio xl. No jornal, o raio l mede 12px.',
        },
        {
          subject: 'Fecha pelo véu só se o gesto inteiro foi no véu',
          detail:
            'pressionar dentro da folha e soltar sobre o véu (arrastar uma seleção de texto) não fecha. O toque no véu fecha por padrão e se desliga com dismissOnScrim={false}.',
        },
        {
          subject: 'Medidas locais',
          detail:
            '--ubl-bottom-sheet-grip-width (36px) e -grip-height (5px) desenham a alça, sem token equivalente; --ubl-bottom-sheet-top-gap (8px, --ubl-spacing-xs) é a folga entre a folha cheia e a barra de status.',
        },
        {
          subject: 'Movimento',
          detail:
            'o véu esmaece e o painel sobe em --ubl-transition-slow; a troca de altura também anima. Em prefers-reduced-motion as duas animações e a transição são desligadas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Toque em “Abrir a folha” para ver cada zona no aparelho."
    />
    <UblDocStage surface="subtle" align="flex-start" padding={16}>
      <FolhaDemo comRodape scale={0.6} />
      <div style={{ flex: '1 1 320px' }}>
        <UblDocAnatomy
          zones={[
            { name: 'Véu', role: 'Cobre a tela; o toque fecha (dismissOnScrim).', token: '--ubl-color-overlay-scrim' },
            { name: 'Alça', role: 'Botão Expandir/Recolher com aria-expanded.', token: '--ubl-color-border-control' },
            { name: 'Cabeçalho', role: 'Título (nomeia o diálogo), descrição e botão Fechar.', token: '--ubl-font-heading-4-* · --ubl-font-body-md-*' },
            { name: 'Corpo', role: 'Conteúdo rolável, com barra fina.', token: '--ubl-gutter' },
            { name: 'Rodapé', role: 'Ações fixas, separadas por fio.', token: '--ubl-elevation-hairline-top' },
            { name: 'Área segura', role: 'Recuo inferior da barra de gesto.', token: '--ubl-safe-area-bottom' },
          ]}
        />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada aparelho abre a folha real; as estórias Tamanhos, TodasVariantes e Estados mostram as mesmas combinações já abertas."
    />
    <UblDocStage label="Alturas" surface="subtle" align="flex-start" padding={16}>
      {(['auto', 'half', 'full'] as const).map((altura) => (
        <div key={altura} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>height=&quot;{altura}&quot;</p>
          <FolhaDemo height={altura} longo={altura !== 'auto'} scale={0.5} />
        </div>
      ))}
    </UblDocStage>
    <UblDocStage label="Estados" surface="subtle" align="flex-start" padding={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>sem alça e sem Fechar</p>
        <FolhaDemo handle={false} showClose={false} scale={0.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>véu que não fecha, com rodapé</p>
        <FolhaDemo dismissOnScrim={false} comRodape scale={0.5} />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando usar uma folha." />
    <UblDocPractices
      dos={[
        'Dar um título à folha: é ele que nomeia o diálogo para o leitor de tela.',
        'Renderizar a folha dentro da tela (o PhoneFrame ou o contêiner do produto), irmã do conteúdo de fundo.',
        'Usar a folha para menus e escolhas no celular, onde o polegar alcança a base da tela.',
        'Pôr ações que concluem a tarefa no footer, fora da área que rola.',
        'Deixar dismissOnScrim ligado em folhas de escolha; desligar quando há edição a perder.',
      ]}
      donts={[
        'Levar a folha para um portal no body: ela sairia do aparelho e das áreas seguras.',
        'Abrir folha sobre folha para escolhas simples.',
        'Usar a folha na página larga do navegador — use um Modal.',
        'Esconder o botão de fechar e o véu ao mesmo tempo: restaria só o Esc.',
        'Colocar a folha dentro do nó que ela deve esconder: o fundo precisa ser irmão da camada.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Painel e véu acompanham o tema."
    />
    <UblDocThemeSwitcher surface="subtle" padding={16}>
      {(tema) => <FolhaDemo key={tema} theme={tema} inicialAberta comRodape scale={0.6} />}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do BottomSheet. Os demais atributos vão ao painel (role=dialog)."
    />
    <UblDocPropsTable
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
        { name: 'initialFocusRef', type: 'RefObject<HTMLElement | null>', description: 'Recebe o foco ao abrir (padrão: Fechar).' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'aria-label', type: 'string', description: 'Nome explícito; com ele, o título não vira aria-labelledby.' },
        { name: 'className / ref', type: 'string / Ref<HTMLDivElement>', description: 'Classe e ref do painel (role=dialog).' },
      ]}
    />
    <UblDocPropsTable
      title="UblBottomSheetHeight"
      rows={[
        { name: "'auto'", type: 'UblBottomSheetHeight', description: 'Acompanha o conteúdo, até a barra de status.' },
        { name: "'half'", type: 'UblBottomSheetHeight', description: 'Metade da tela.' },
        { name: "'full'", type: 'UblBottomSheetHeight', description: 'A tela inteira, abaixo da barra de status.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof BottomSheet> = {
  title: 'Unooblog/Componentes/BottomSheet',
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
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: false, description: 'Conteúdo rolável (a estória usa as ações do post).' },
    footer: { control: false, description: 'Rodapé fixo (a estória usa “Concluído”).' },
    initialFocusRef: { control: false, description: 'Elemento que recebe o foco ao abrir.' },
    onClose: { action: 'onClose' },
  },
  args: {
    open: true,
    title: 'Opções do post',
    description: POST.title,
    height: 'auto',
    handle: true,
    closeLabel: 'Fechar',
    showClose: true,
    dismissOnScrim: true,
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
      <PaginaDeFundo>
        <BottomSheet
          {...args}
          footer={
            <Button fullWidth onClick={args.onClose}>
              Concluído
            </Button>
          }
        >
          <ConteudoDaFolha longo={args.height !== 'auto'} />
        </BottomSheet>
      </PaginaDeFundo>
    </PhoneFrame>
  ),
};

/**
 * Composição realista: as ações de um post sobre a página do blog, com o
 * botão que abre e fecha.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: ações do post',
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
 * Com e sem rodapé, com e sem descrição.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>título, descrição e rodapé</p>
        <FolhaDemo inicialAberta comRodape scale={0.6} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>só título</p>
        <FolhaDemo inicialAberta comDescricao={false} scale={0.6} />
      </div>
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
 * Abre, nomeia pelo título, prende o foco, alterna a alça, fecha com Esc e
 * devolve o foco ao botão.
 */
export const AbrirEFechar: Story = {
  name: 'Abrir, prender o foco e fechar',
  render: () => <FolhaDemo />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const abrir = tela.getByRole('button', { name: 'Abrir a folha' });

    await userEvent.click(abrir);
    const folha = await tela.findByRole('dialog', { name: 'Opções do post' });
    await expect(folha).toHaveAttribute('aria-modal', 'true');
    await expect(folha).toHaveAccessibleDescription(POST.title);
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

/**
 * Escolher uma ação fecha a folha e devolve o foco a quem abriu.
 */
export const EscolherUmaAcao: Story = {
  name: 'Escolher uma ação',
  render: () => <FolhaDemo />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const abrir = tela.getByRole('button', { name: 'Abrir a folha' });

    await userEvent.click(abrir);
    const folha = await tela.findByRole('dialog', { name: 'Opções do post' });
    await userEvent.click(within(folha).getByRole('button', { name: 'Compartilhar' }));

    await waitFor(() => expect(tela.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(await tela.findByText('Última escolha: Compartilhar')).toBeInTheDocument();
    await waitFor(() => expect(abrir).toHaveFocus());
  },
};
