import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { BottomSheet } from '../../../src/unoojornal/components/BottomSheet';
import type { UjnBottomSheetHeight } from '../../../src/unoojornal/components/BottomSheet';
import { Button } from '../../../src/unoojornal/components/Button';
import { PhoneFrame } from '../../../src/unoojornal/components/PhoneFrame';
import type { UjnIconName } from '../../../src/unoojornal/components/Icon';
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
import { ujnArticles, ujnSections } from '../fixtures';
import { PaginaDeFundo, notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Matéria cujas ações a folha oferece. */
const MATERIA = ujnArticles[0];

/** Ações de uma matéria, na ordem em que a folha as lista. */
const ACOES: { rotulo: string; icone: UjnIconName }[] = [
  { rotulo: 'Salvar para ler depois', icone: 'bookmark' },
  { rotulo: 'Compartilhar', icone: 'share' },
  { rotulo: 'Copiar o link', icone: 'link' },
  { rotulo: 'Imprimir', icone: 'print' },
];

/**
 * Conteúdo de demonstração: as ações da matéria e, na versão longa, as seções
 * do jornal para rolar dentro da folha.
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
      [...ujnSections, ...ujnSections].map((secao, indice) => (
        <Button
          key={`${secao.id}-${indice}`}
          variant="ghost"
          fullWidth
          iconStart="edition"
          onClick={() => aoEscolher?.(secao.label)}
        >
          {secao.label}
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
  height?: UjnBottomSheetHeight;
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
          title="Opções da matéria"
          description={comDescricao ? MATERIA.title : undefined}
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
      badgeBrand="Unoojornal"
      category="Componentes • Camadas"
      title="BottomSheet"
      description="Folha inferior modal do jornal no celular: sobe da base da tela do aparelho sobre o véu, com cantos de 12px no topo, alça que expande e recolhe, título, conteúdo rolável e rodapé opcional. Abriga o menu de seções, os filtros e as ações de uma matéria."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma camada da tela, não da janela."
    />
    <UjnDocGrid>
      <UjnDocCard icon="📱" title="Presa à tela do aparelho">
        A folha é <code>position: absolute; inset: 0</code> no contêiner posicionado mais próximo —
        dentro do <code>PhoneFrame</code>, a tela. Nunca portal, nunca <code>position: fixed</code>.
      </UjnDocCard>
      <UjnDocCard icon="🧭" title="Foco de camada">
        O <code>useModalFocus</code> prende o Tab, fecha no Esc, marca o fundo com{' '}
        <code>aria-hidden</code> (restaurando o que havia) e devolve o foco a quem abriu.
      </UjnDocCard>
      <UjnDocCard icon="↕️" title="Alça que expande">
        A alça é um botão &quot;Expandir&quot;/&quot;Recolher&quot; com <code>aria-expanded</code>:
        alterna entre a altura pedida e a tela inteira, sem gesto obrigatório.
      </UjnDocCard>
      <UjnDocCard icon="🏷️" title="Se nomeia sozinha">
        O título renderizado vira o <code>aria-labelledby</code>; <code>aria-label</code> explícito
        vence e então não há <code>aria-labelledby</code>.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UjnDocSpecs
      component="BottomSheet"
      layout="Camada absoluta · painel na base · cantos de 12px no topo"
      specs={[
        { label: 'Véu', value: '--ujn-color-overlay-scrim' },
        { label: 'Painel', value: '--ujn-color-background-elevated · --ujn-elevation-overlay' },
        { label: 'Raio', value: '--ujn-radius-l (12px) só no topo' },
        { label: 'Camada', value: '--ujn-z-sheet (30)' },
        { label: 'Alturas', value: 'auto (até a barra de status) · half 50% · full' },
        { label: 'Recuo inferior', value: '--ujn-safe-area-bottom' },
        { label: 'Alça', value: '36×5px num alvo de 44px' },
        { label: 'Título', value: 'Title/Medium (20/28, 700)' },
      ]}
    />
    <UjnDocDecisions
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
          subject: 'Raio de 12px no topo, e não o arredondado do app de galeria',
          detail:
            'o jornal é reto: só pílula e avatar arredondam. A folha usa o maior raio da escala (--ujn-radius-l), o mesmo dos cartões elevados, em vez de cantos de 24px.',
        },
        {
          subject: 'Fecha pelo véu só se o gesto inteiro foi no véu',
          detail:
            'pressionar dentro da folha e soltar sobre o véu (arrastar uma seleção de texto) não fecha. O toque no véu fecha por padrão e se desliga com dismissOnScrim={false}.',
        },
        {
          subject: 'Medidas locais',
          detail:
            '--ujn-bottom-sheet-grip-width (36px) e -grip-height (5px) desenham a alça, sem token equivalente; --ujn-bottom-sheet-top-gap (8px, --ujn-spacing-xs) é a folga entre a folha cheia e a barra de status.',
        },
        {
          subject: 'Movimento',
          detail:
            'o véu esmaece e o painel sobe em --ujn-transition-slow; a troca de altura também anima. Em prefers-reduced-motion as duas animações e a transição são desligadas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Toque em “Abrir a folha” para ver cada zona no aparelho."
    />
    <UjnDocStage surface="subtle" align="flex-start" padding={16}>
      <FolhaDemo comRodape scale={0.6} />
      <div style={{ flex: '1 1 320px' }}>
        <UjnDocAnatomy
          zones={[
            { name: 'Véu', role: 'Cobre a tela; o toque fecha (dismissOnScrim).', token: '--ujn-color-overlay-scrim' },
            { name: 'Alça', role: 'Botão Expandir/Recolher com aria-expanded.', token: '--ujn-color-border-control' },
            { name: 'Cabeçalho', role: 'Título (nomeia o diálogo), descrição e botão Fechar.', token: 'Title/Medium · Body/Medium' },
            { name: 'Corpo', role: 'Conteúdo rolável, com barra fina.', token: '--ujn-gutter' },
            { name: 'Rodapé', role: 'Ações fixas, separadas por fio.', token: '--ujn-elevation-hairline-top' },
            { name: 'Área segura', role: 'Recuo inferior da barra de gesto.', token: '--ujn-safe-area-bottom' },
          ]}
        />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada aparelho abre a folha real; as estórias Tamanhos, TodasVariantes e Estados mostram as mesmas combinações já abertas."
    />
    <UjnDocStage label="Alturas" surface="subtle" align="flex-start" padding={16}>
      {(['auto', 'half', 'full'] as const).map((altura) => (
        <div key={altura} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>height=&quot;{altura}&quot;</p>
          <FolhaDemo height={altura} longo={altura !== 'auto'} scale={0.5} />
        </div>
      ))}
    </UjnDocStage>
    <UjnDocStage label="Estados" surface="subtle" align="flex-start" padding={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>sem alça e sem Fechar</p>
        <FolhaDemo handle={false} showClose={false} scale={0.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>véu que não fecha, com rodapé</p>
        <FolhaDemo dismissOnScrim={false} comRodape scale={0.5} />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando usar uma folha." />
    <UjnDocPractices
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
    <UjnDocThemeSwitcher surface="subtle" padding={16}>
      {(tema) => <FolhaDemo key={tema} theme={tema} inicialAberta comRodape scale={0.6} />}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do BottomSheet. Os demais atributos vão ao painel (role=dialog)."
    />
    <UjnDocPropsTable
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
    <UjnDocPropsTable
      title="UjnBottomSheetHeight"
      rows={[
        { name: "'auto'", type: 'UjnBottomSheetHeight', description: 'Acompanha o conteúdo, até a barra de status.' },
        { name: "'half'", type: 'UjnBottomSheetHeight', description: 'Metade da tela.' },
        { name: "'full'", type: 'UjnBottomSheetHeight', description: 'A tela inteira, abaixo da barra de status.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof BottomSheet> = {
  title: 'Unoojornal/Componentes/BottomSheet',
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
    children: { control: false, description: 'Conteúdo rolável (a estória usa as ações da matéria).' },
    footer: { control: false, description: 'Rodapé fixo (a estória usa “Concluído”).' },
    initialFocusRef: { control: false, description: 'Elemento que recebe o foco ao abrir.' },
    onClose: { action: 'onClose' },
  },
  args: {
    open: true,
    title: 'Opções da matéria',
    description: MATERIA.title,
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
 * Composição realista: as ações de uma matéria sobre a página do jornal, com o
 * botão que abre e fecha.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: ações da matéria',
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
    const folha = await tela.findByRole('dialog', { name: 'Opções da matéria' });
    await expect(folha).toHaveAttribute('aria-modal', 'true');
    await expect(folha).toHaveAccessibleDescription(MATERIA.title);
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
    const folha = await tela.findByRole('dialog', { name: 'Opções da matéria' });
    await userEvent.click(within(folha).getByRole('button', { name: 'Compartilhar' }));

    await waitFor(() => expect(tela.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(await tela.findByText('Última escolha: Compartilhar')).toBeInTheDocument();
    await waitFor(() => expect(abrir).toHaveFocus());
  },
};
