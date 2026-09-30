import React, { useId, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ActionMenu } from '../../../src/unoogaleria/components/ActionMenu';
import type {
  UglActionMenuAction,
  UglActionMenuItem,
  UglActionMenuPlacement,
  UglActionMenuVariant,
} from '../../../src/unoogaleria/components/ActionMenu';
import { IconButton } from '../../../src/unoogaleria/components/IconButton';
import type { UglIconName } from '../../../src/unoogaleria/components/Icon';
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
import { TelaDeFundo, notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/**
 * As ações do botão "Mais" de uma foto. Cada `onSelect` só avisa a estória,
 * que mostra a última ação escolhida.
 */
const acoesDaFoto = (aoEscolher: (rotulo: string) => void): UglActionMenuItem[] => {
  const acao = (id: string, label: string, icon: UglIconName): UglActionMenuAction => ({
    id,
    label,
    icon,
    onSelect: () => aoEscolher(label),
  });

  return [
    acao('add-to-album', 'Adicionar a um álbum', 'addToAlbum'),
    acao('duplicate', 'Duplicar', 'duplicate'),
    acao('hide', 'Ocultar', 'hide'),
    acao('slideshow', 'Apresentação', 'slideshow'),
    { ...acao('date', 'Ajustar data e hora', 'calendar'), disabled: true },
    { type: 'divider', id: 'd1' },
    { ...acao('delete', 'Excluir', 'delete'), tone: 'danger' },
  ];
};

/**
 * Menu de demonstração dentro do aparelho: o botão "Mais opções" declara
 * `aria-haspopup`, `aria-expanded` e `aria-controls`, e o menu se ancora nele.
 */
const MenuDemo: React.FC<{
  theme?: 'light' | 'dark';
  inicialAberto?: boolean;
  placement?: UglActionMenuPlacement;
  variant?: UglActionMenuVariant;
  scale?: number;
}> = ({ theme, inicialAberto = false, placement = 'bottom-end', variant = 'default', scale = 0.75 }) => {
  const [aberto, setAberto] = useState(inicialAberto);
  const [ultima, setUltima] = useState<string | null>(null);
  const botaoRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();
  const imersiva = variant === 'immersive';
  const embaixo = placement.startsWith('top');

  const gatilho = (
    <IconButton
      ref={botaoRef}
      icon={embaixo ? 'sort' : 'more'}
      label="Mais opções"
      variant={imersiva ? 'bar' : 'plain'}
      aria-haspopup="menu"
      aria-expanded={aberto}
      aria-controls={aberto ? menuId : undefined}
      onClick={() => setAberto((atual) => !atual)}
    />
  );
  const nota = (
    <p style={imersiva ? { ...notaEstilo, color: 'var(--ugl-color-immersive-text-secondary)' } : notaEstilo}>
      {ultima ? `Última ação: ${ultima}` : 'Nenhuma ação escolhida'}
    </p>
  );

  return (
    <PhoneFrame scale={scale} theme={theme} ariaLabel="Aparelho de demonstração">
      <TelaDeFundo
        imersiva={imersiva}
        titulo={imersiva ? 'Hoje' : 'Biblioteca'}
        acoes={embaixo ? undefined : gatilho}
        faixa={imersiva ? nota : embaixo ? undefined : nota}
        rodape={
          embaixo ? (
            <>
              {placement === 'top-start' ? gatilho : nota}
              {placement === 'top-start' ? nota : gatilho}
            </>
          ) : undefined
        }
      >
        <ActionMenu
          id={menuId}
          open={aberto}
          onClose={() => setAberto(false)}
          items={acoesDaFoto(setUltima)}
          anchorRef={botaoRef}
          placement={placement}
          variant={variant}
          ariaLabel="Opções da foto"
        />
      </TelaDeFundo>
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente ActionMenu.
 */
const ActionMenuDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Sobreposições"
      title="ActionMenu"
      description="Menu suspenso ancorado ao botão que o abriu — o “Mais” da foto, do álbum ou da seleção. Cartão elevado com ações de 44px, glifo à direita, divisores entre grupos e o tom vermelho para excluir."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="Escolhas curtas, perto de quem as pediu." />
    <UglDocGrid>
      <UglDocCard icon="📍" title="Ancorado de verdade">
        Com <code>anchorRef</code>, o menu mede o botão e se posiciona no contêiner — inclusive dentro
        de um <code>PhoneFrame</code> com <code>scale</code>, cuja medida em tela difere da do contêiner.
      </UglDocCard>
      <UglDocCard icon="⌨️" title="Teclado completo">
        Primeiro item focado ao abrir; setas, Home e End movem; Enter e Espaço escolhem; a primeira
        letra salta; Esc e Tab fecham e devolvem o foco.
      </UglDocCard>
      <UglDocCard icon="👆" title="Toque fora fecha">
        Uma camada transparente atrás do menu recebe o toque fora e fecha, sem que o toque atravesse
        para a grade.
      </UglDocCard>
      <UglDocCard icon="🗑️" title="Tom destrutivo">
        A ação <code>tone=&quot;danger&quot;</code> vem por último, depois de um divisor, em{' '}
        <code>--ugl-color-text-danger</code>.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" description="Medidas do módulo e escolhas de composição." />
    <UglDocSpecs
      component="ActionMenu"
      layout="Camada transparente · cartão ancorado · ações de 44px"
      specs={[
        { label: 'Cartão', value: '--ugl-color-background-elevated · --ugl-radius-m' },
        { label: 'Elevação', value: '--ugl-elevation-overlay' },
        { label: 'Camada', value: '--ugl-z-sheet (30)' },
        { label: 'Largura mínima', value: '232px (local)' },
        { label: 'Item', value: '44px · Body/Medium · glifo 20px à direita' },
        { label: 'Distância da âncora', value: '6px' },
        { label: 'Divisor', value: '1px · --ugl-color-border-subtle' },
        { label: 'Imersivo', value: '--ugl-color-immersive-bar + desfoque' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Camada de menu = camada de folha',
          detail:
            'o módulo não tem --ugl-z-menu; o menu usa --ugl-z-sheet (30): fica acima das barras (10) e do visualizador (20), e abaixo de diálogos (40) e avisos (50), que ele pode abrir.',
        },
        {
          subject: 'Não é modal',
          detail:
            'o menu não usa o useModalFocus nem aria-modal: guarda e devolve o foco por conta própria. O Esc e o Tab param a propagação, para que a folha ou o visualizador por baixo — que ouvem o documento — não fechem junto.',
        },
        {
          subject: 'Posição escrita no nó',
          detail:
            'a posição calculada vai direto ao estilo do cartão num efeito de layout, sem estado, para não renderizar duas vezes. A âncora é convertida da escala da tela para a do contêiner (largura medida ÷ largura de layout).',
        },
        {
          subject: 'Glifo à direita do rótulo',
          detail:
            'como nos menus de contexto móveis, o rótulo abre a linha e o glifo fecha — a leitura começa pela palavra, e os glifos formam uma coluna alinhada.',
        },
        {
          subject: 'Desabilitado com aria-disabled',
          detail:
            'a ação indisponível continua na lista (a pessoa sabe que existe) com opacidade de 40%, e as setas a pulam.',
        },
        {
          subject: 'Largura mínima local',
          detail: '--ugl-action-menu-min-width: 232px, para caber “Adicionar a um álbum” sem quebrar; sem token equivalente.',
        },
        {
          subject: 'Movimento',
          detail:
            'o cartão cresce de 92% a partir do canto da âncora (transform-origin por placement). Em prefers-reduced-motion, a animação é desligada.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Toque em “Mais opções” no aparelho." />
    <UglDocStage surface="secondary" align="flex-start" padding={16}>
      <MenuDemo scale={0.6} />
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Gatilho', role: 'IconButton com aria-haspopup="menu" e aria-expanded (do produto).', token: '--ugl-color-icon-primary' },
            { name: 'Camada', role: 'Transparente; o toque fora fecha.', token: '--ugl-z-sheet' },
            { name: 'Cartão', role: 'role="menu" com aria-label.', token: '--ugl-color-background-elevated · --ugl-radius-m' },
            { name: 'Ação', role: 'role="menuitem" · rótulo e glifo.', token: 'Body/Medium · --ugl-icon-size-sm' },
            { name: 'Divisor', role: 'role="separator" entre grupos.', token: '--ugl-color-border-subtle' },
            { name: 'Ação destrutiva', role: 'Por último, depois do divisor.', token: '--ugl-color-text-danger' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada aparelho abre o menu real; as estórias TodasVariantes e Estados mostram as combinações já abertas."
    />
    <UglDocStage label="Posições" surface="secondary" align="flex-start" padding={16}>
      {(['bottom-end', 'bottom-start', 'top-end', 'top-start'] as const).map((posicao) => (
        <div key={posicao} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>placement=&quot;{posicao}&quot;</p>
          <MenuDemo placement={posicao} scale={0.45} />
        </div>
      ))}
    </UglDocStage>
    <UglDocStage label="Variantes" surface="secondary" align="flex-start" padding={16}>
      {(['default', 'immersive'] as const).map((variante) => (
        <div key={variante} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>variant=&quot;{variante}&quot;</p>
          <MenuDemo variant={variante} scale={0.5} />
        </div>
      ))}
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando usar um menu." />
    <UglDocPractices
      dos={[
        'Ancorar o menu ao botão que o abriu, com anchorRef.',
        'Declarar aria-haspopup="menu", aria-expanded e aria-controls no gatilho.',
        'Agrupar ações com divisores e deixar a destrutiva por último.',
        'Usar a variante immersive sobre o visualizador.',
        'Abrir um ConfirmDialog a partir de “Excluir”, e não excluir direto.',
      ]}
      donts={[
        'Pôr mais de sete ações num menu: vire uma folha.',
        'Usar o menu para navegação entre telas.',
        'Esconder ações indisponíveis sem explicação — prefira disabled.',
        'Renderizar o menu fora da tela do aparelho (portal no body).',
        'Pôr controles (campos, alternâncias) dentro do menu.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="O cartão acompanha o tema; o imersivo é invariante." />
    <UglDocThemeSwitcher surface="secondary" padding={16}>
      {(tema) => <MenuDemo key={tema} theme={tema} scale={0.6} />}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do ActionMenu. Os demais atributos vão ao cartão (role=menu)."
    />
    <UglDocPropsTable
      title="ActionMenu"
      rows={[
        { name: 'open', type: 'boolean', description: 'Menu aberto. Fechado, não renderiza nada. Obrigatório.' },
        { name: 'onClose', type: '() => void', description: 'Esc, Tab, toque fora ou escolha. Obrigatório.' },
        { name: 'items', type: 'UglActionMenuItem[]', description: 'Ações e divisores. Obrigatório.' },
        { name: 'placement', type: "'bottom-end' | 'bottom-start' | 'top-end' | 'top-start'", default: "'bottom-end'", description: 'Posição em relação à âncora.' },
        { name: 'anchor', type: '{ top?; right?; bottom?; left? }', description: 'Posição fixa em px no contêiner (sem anchorRef).' },
        { name: 'anchorRef', type: 'RefObject<HTMLElement | null>', description: 'Elemento que abriu o menu; acompanha a escala.' },
        { name: 'ariaLabel', type: 'string', description: 'Nome acessível do menu. Obrigatório.' },
        { name: 'variant', type: "'default' | 'immersive'", default: "'default'", description: 'Superfície elevada ou barra imersiva.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
      ]}
    />
    <UglDocPropsTable
      title="UglActionMenuAction"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único.' },
        { name: 'label', type: 'string', description: 'Rótulo e nome acessível.' },
        { name: 'icon', type: 'UglIconName', description: 'Glifo à direita.' },
        { name: 'tone', type: "'default' | 'danger'", default: "'default'", description: 'Vermelho para excluir.' },
        { name: 'disabled', type: 'boolean', description: 'Indisponível: aria-disabled, pulado pelas setas.' },
        { name: 'onSelect', type: '() => void', description: 'Chamado ao escolher; o menu fecha em seguida.' },
      ]}
    />
    <UglDocPropsTable
      title="UglActionMenuDivider"
      rows={[
        { name: 'type', type: "'divider'", description: 'Marca o item como divisor (role="separator").' },
        { name: 'id', type: 'string', description: 'Identificador único.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ActionMenu> = {
  title: 'Unoogaleria/Componentes/ActionMenu',
  component: ActionMenu,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Menu aberto.' },
    items: { control: 'object', description: 'Ações e divisores.' },
    placement: {
      control: 'radio',
      options: ['bottom-end', 'bottom-start', 'top-end', 'top-start'],
      description: 'Posição em relação à âncora.',
    },
    anchor: { control: 'object', description: 'Posição fixa em px no contêiner.' },
    anchorRef: { control: false, description: 'Elemento que abriu o menu.' },
    ariaLabel: { control: 'text', description: 'Nome acessível do menu.' },
    variant: { control: 'radio', options: ['default', 'immersive'], description: 'Variante visual.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onClose: { action: 'onClose' },
  },
  args: {
    open: true,
    items: acoesDaFoto(() => undefined),
    placement: 'bottom-end',
    anchor: { top: 96, right: 16 },
    ariaLabel: 'Opções da foto',
    variant: 'default',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ActionMenu>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ActionMenuDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. Sem `anchorRef`, a posição vem
 * do controle `anchor`, em px no contêiner.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ActionMenu',
  render: (args) => (
    <PhoneFrame scale={0.75} theme={args.theme}>
      <TelaDeFundo imersiva={args.variant === 'immersive'}>
        <ActionMenu {...args} />
      </TelaDeFundo>
    </PhoneFrame>
  ),
};

/**
 * Composição realista: o "Mais" da biblioteca, com o menu aberto.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: mais opções da foto',
  render: () => <MenuDemo inicialAberto />,
};

/**
 * As quatro posições e as duas variantes, abertas.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['bottom-end', 'bottom-start', 'top-end', 'top-start'] as const).map((posicao) => (
        <div key={posicao} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>placement=&quot;{posicao}&quot;</p>
          <MenuDemo inicialAberto placement={posicao} scale={0.5} />
        </div>
      ))}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>variant=&quot;immersive&quot;</p>
        <MenuDemo inicialAberto variant="immersive" scale={0.5} />
      </div>
    </div>
  ),
};

/**
 * Ação desabilitada e destrutiva, com posição fixa por `anchor`.
 */
export const Estados: Story = {
  render: () => (
    <PhoneFrame scale={0.75}>
      <TelaDeFundo>
        <ActionMenu
          open
          onClose={() => undefined}
          anchor={{ top: 104, right: 16 }}
          ariaLabel="Opções da foto"
          items={acoesDaFoto(() => undefined)}
        />
      </TelaDeFundo>
    </PhoneFrame>
  ),
};

/**
 * O menu nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UglDocStage key={tema} label={tema === 'light' ? 'Tema claro' : 'Tema escuro'} theme={tema} surface="secondary" padding={16}>
          <MenuDemo inicialAberto theme={tema} scale={0.6} />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Navega com as setas, escolhe com Enter, fecha com Esc e devolve o foco.
 */
export const NavegacaoPorTeclado: Story = {
  name: 'Navegação por teclado',
  render: () => <MenuDemo />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const botao = tela.getByRole('button', { name: 'Mais opções' });
    const [primeira, segunda] = acoesDaFoto(() => undefined).filter(
      (item): item is UglActionMenuAction => 'label' in item
    );

    await userEvent.click(botao);
    const menu = await tela.findByRole('menu', { name: 'Opções da foto' });
    await expect(botao).toHaveAttribute('aria-expanded', 'true');
    const itens = within(menu).getAllByRole('menuitem');
    await waitFor(() => expect(itens[0]).toHaveFocus());

    await userEvent.keyboard('{ArrowDown}');
    await expect(itens[1]).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(itens[itens.length - 1]).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(itens[0]).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    await expect(itens[itens.length - 1]).toHaveFocus();
    await userEvent.keyboard('{Home}{ArrowDown}');
    await expect(itens[1]).toHaveFocus();
    await expect(itens[1]).toHaveAccessibleName(segunda.label);

    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(tela.queryByRole('menu')).not.toBeInTheDocument());
    await expect(tela.getByText(`Última ação: ${segunda.label}`)).toBeInTheDocument();
    await waitFor(() => expect(botao).toHaveFocus());

    await userEvent.click(botao);
    await tela.findByRole('menu', { name: 'Opções da foto' });
    await waitFor(() => expect(tela.getByRole('menuitem', { name: primeira.label })).toHaveFocus());
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tela.queryByRole('menu')).not.toBeInTheDocument());
    await waitFor(() => expect(botao).toHaveFocus());
    await expect(botao).toHaveAttribute('aria-expanded', 'false');
  },
};
