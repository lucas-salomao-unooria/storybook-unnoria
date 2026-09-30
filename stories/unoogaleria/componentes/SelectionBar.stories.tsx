import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { SelectionBar } from '../../../src/unoogaleria/components/SelectionBar';
import type { UglSelectionBarAction } from '../../../src/unoogaleria/components/SelectionBar';
import { MediaGrid } from '../../../src/unoogaleria/components/MediaGrid';
import { TopBar } from '../../../src/unoogaleria/components/TopBar';
import { Button } from '../../../src/unoogaleria/components/Button';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { uglFormatSelection } from '../../../src/unoogaleria/media';
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

const semAcao = () => undefined;

/** As ações da seleção na biblioteca. */
const acoes = (onClick: (id: string) => void = semAcao): UglSelectionBarAction[] => [
  { id: 'compartilhar', icon: 'share', label: 'Compartilhar', onClick: () => onClick('compartilhar') },
  { id: 'album', icon: 'addToAlbum', label: 'Adicionar a um álbum', onClick: () => onClick('album') },
  { id: 'excluir', icon: 'delete', label: 'Excluir', tone: 'danger', onClick: () => onClick('excluir') },
];

/** As ações da seleção na lixeira. */
const ACOES_LIXEIRA: UglSelectionBarAction[] = [
  { id: 'recuperar', icon: 'restore', label: 'Recuperar', onClick: semAcao },
  { id: 'apagar', icon: 'deleteForever', label: 'Apagar de vez', tone: 'danger', onClick: semAcao },
];

/**
 * Barra com contagem controlada por botões de demonstração.
 */
const BarraComContagem: React.FC<{ theme?: 'light' | 'dark'; onAction?: (id: string) => void }> = ({
  theme,
  onAction,
}) => {
  const [contagem, setContagem] = useState(0);
  const [ultima, setUltima] = useState('nenhuma');
  return (
    <div style={{ width: 390, display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="secondary" size="sm" onClick={() => setContagem((atual) => atual + 1)}>
          Selecionar mais um
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setContagem(0)}>
          Limpar
        </Button>
      </div>
      <SelectionBar
        theme={theme}
        count={contagem}
        actions={acoes((id) => {
          setUltima(id);
          onAction?.(id);
        })}
      />
      <p style={{ margin: 0, fontFamily: 'var(--ugl-font-sans)', fontSize: 12, color: 'var(--ugl-color-text-secondary)' }}>
        Última ação: <output aria-label="Última ação">{ultima}</output>
      </p>
    </div>
  );
};

/**
 * A biblioteca em modo de seleção no aparelho.
 */
const TelaSelecao: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => {
  const [ids, setIds] = useState<string[]>(uglMediaItems.slice(0, 3).map((item) => item.id));
  const alternar = (item: UglMediaItem) =>
    setIds((atual) => (atual.includes(item.id) ? atual.filter((id) => id !== item.id) : [...atual, item.id]));
  return (
    <PhoneFrame scale={0.75} theme={theme}>
      <TopBar
        variant="overlay"
        title={uglFormatSelection(ids.length)}
        actions={
          <Button variant="tertiary" onClick={() => setIds([])}>
            Cancelar
          </Button>
        }
      />
      <MediaGrid
        items={uglMediaItems}
        now={uglDemoNow}
        selectable
        selectedIds={ids}
        onToggle={alternar}
        onToggleSection={(grupo, todos) => {
          const doGrupo = grupo.items.map((item) => item.id);
          setIds((atual) =>
            todos ? atual.filter((id) => !doGrupo.includes(id)) : Array.from(new Set([...atual, ...doGrupo]))
          );
        }}
        onRangeSelect={(intervalo) => setIds((atual) => Array.from(new Set([...atual, ...intervalo.map((item) => item.id)])))}
        topInset={44}
        bottomInset={50}
      />
      <SelectionBar floating count={ids.length} actions={acoes()} />
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente SelectionBar.
 */
const SelectionBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Seleção"
      title="SelectionBar"
      description="Barra inferior do modo de seleção: a contagem no centro (“3 itens selecionados”, anunciada a cada troca) e as ações dos dois lados. Com nada selecionado, as ações ficam desabilitadas. Translúcida com desfoque, no lugar das abas enquanto a seleção dura."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="O que fazer com o que foi marcado." />
    <UglDocGrid>
      <UglDocCard icon="🔢" title="Contagem viva">
        O rótulo padrão é <code>uglFormatSelection(count)</code> e é uma região viva educada: marcar
        e desmarcar é anunciado sem roubar o foco.
      </UglDocCard>
      <UglDocCard icon="🚫" title="Nada selecionado">
        Com <code>count=0</code>, todas as ações ficam <code>disabled</code> e o rótulo diz
        “Selecionar itens”.
      </UglDocCard>
      <UglDocCard icon="🧰" title="Barra de ferramentas">
        <code>role=&quot;toolbar&quot;</code> com um só ponto de Tab; as setas, Home e End andam entre as
        ações habilitadas.
      </UglDocCard>
      <UglDocCard icon="🗑️" title="Tom de perigo">
        <code>tone=&quot;danger&quot;</code> pinta o glifo em <code>text-danger</code> — Excluir,
        Apagar de vez.
      </UglDocCard>
      <UglDocCard icon="📱" title="No lugar das abas">
        Com <code>floating</code>, fica absoluta na base, somando a área segura; a grade recebe{' '}
        <code>bottomInset=50</code>.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" description="Medidas e escolhas de composição." />
    <UglDocSpecs
      component="SelectionBar"
      layout="Barra · 50px + área segura"
      specs={[
        { label: 'Altura do conteúdo', value: '--ugl-toolbar-height (50px)' },
        { label: 'Recuo inferior', value: '--ugl-safe-area-bottom' },
        { label: 'Superfície', value: '--ugl-color-surface-bar + blur 16px' },
        { label: 'Fio', value: '--ugl-elevation-hairline-top' },
        { label: 'Ações', value: 'IconButton md (44px) · icon-accent' },
        { label: 'Perigo', value: '--ugl-color-text-danger' },
        { label: 'Rótulo', value: 'label · 14/20 · centro' },
        { label: 'Camada', value: '--ugl-z-bar' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Ações divididas ao redor do rótulo',
          detail:
            'a primeira metade das ações (arredondada para baixo) fica à esquerda do rótulo e o resto à direita: com três, Compartilhar à esquerda e Adicionar e Excluir à direita. Os dois lados crescem por igual, então o rótulo fica no centro da barra.',
        },
        {
          subject: 'disabled nativo, e não aria-disabled',
          detail:
            'sem nada selecionado não há o que fazer: as ações saem da ordem de Tab e ficam esmaecidas pelo IconButton. O rótulo "Selecionar itens" explica por quê.',
        },
        {
          subject: 'Roving tabindex só entre habilitadas',
          detail:
            'o ponto de Tab é a última ação focada ou a primeira habilitada; as setas dão a volta nas pontas e pulam as desabilitadas.',
        },
        {
          subject: 'Glifo em icon-accent',
          detail:
            'as ações usam o roxo de acento (4,9:1 no claro sobre a barra) para ler como ações, e o perigo usa text-danger, que é texto e passa 4,5:1 nos dois temas.',
        },
        {
          subject: 'floating e ariaLabel',
          detail: 'extensões do contrato: floating posiciona na base do contêiner; ariaLabel troca o nome padrão "Ações da seleção".',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Ações, rótulo vivo e área segura." />
    <UglDocStage label="Três itens selecionados (390px)" surface="secondary" align="flex-start" padding={16}>
      <div style={{ width: 390 }}>
        <SelectionBar count={3} actions={acoes()} />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Barra', role: 'Translúcida com desfoque e fio superior.', token: '--ugl-color-surface-bar · --ugl-elevation-hairline-top' },
            { name: 'Ações', role: 'IconButton de 44px com nome e dica.', token: '--ugl-color-icon-accent' },
            { name: 'Ação de perigo', role: 'Mesmo botão, no tom destrutivo.', token: '--ugl-color-text-danger' },
            { name: 'Rótulo', role: 'Contagem ao centro, região viva educada.', token: '--ugl-font-label-* · --ugl-color-text-primary' },
            { name: 'Área segura', role: 'Recuo inferior para a barra de gesto.', token: '--ugl-safe-area-bottom' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes, tamanhos e estados" description="Contagens, conjuntos de ações e desabilitada." />
    <UglDocStage label="Contagens" surface="secondary" direction="column" align="flex-start" padding={16} gap={12}>
      {[0, 1, 12].map((contagem) => (
        <div key={contagem} style={{ width: 390 }}>
          <SelectionBar count={contagem} actions={acoes()} ariaLabel={`Ações com ${contagem} selecionados`} />
        </div>
      ))}
    </UglDocStage>
    <UglDocStage label="Lixeira e ação indisponível" surface="secondary" direction="column" align="flex-start" padding={16} gap={12}>
      <div style={{ width: 390 }}>
        <SelectionBar count={2} actions={ACOES_LIXEIRA} ariaLabel="Ações da lixeira" />
      </div>
      <div style={{ width: 390 }}>
        <SelectionBar
          count={2}
          actions={acoes().map((acao) => (acao.id === 'album' ? { ...acao, disabled: true } : acao))}
          ariaLabel="Ações com um álbum indisponível"
        />
      </div>
    </UglDocStage>
    <UglDocStage label="No aparelho" surface="secondary" padding={16}>
      <TelaSelecao />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso da barra de seleção." />
    <UglDocPractices
      dos={[
        'Trocar a TabBar pela SelectionBar enquanto a seleção dura, e voltar ao sair.',
        'Manter de duas a quatro ações; as demais vão num menu "Mais".',
        'Marcar tone="danger" nas ações destrutivas e confirmar Apagar de vez com um diálogo.',
        'Deixar o rótulo padrão, que já trata singular, plural e zero.',
      ]}
      donts={[
        'Esconder a barra com zero selecionados: ela explica o estado e continua sendo a saída.',
        'Usar texto nas ações: são glifos com nome acessível e dica.',
        'Pôr Cancelar na barra de ações: ele vai na barra superior.',
        'Somar a área segura por fora: a barra já soma.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Superfície, acento e perigo acompanham o tema." />
    <UglDocThemeSwitcher surface="secondary" padding={16}>
      {(tema) => <BarraComContagem theme={tema} />}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" description="Contrato público do componente SelectionBar." />
    <UglDocPropsTable
      title="SelectionBar"
      rows={[
        { name: 'count', type: 'number', description: 'Itens selecionados; zero desabilita as ações. Obrigatório.' },
        { name: 'label', type: 'string', default: 'uglFormatSelection(count)', description: 'Rótulo central, anunciado a cada troca.' },
        { name: 'actions', type: 'UglSelectionBarAction[]', description: 'Ações, na ordem da barra. Obrigatório.' },
        { name: 'ariaLabel', type: 'string', default: "'Ações da seleção'", description: 'Nome da barra de ferramentas (extensão).' },
        { name: 'floating', type: 'boolean', default: 'false', description: 'Absoluta na base do contêiner (extensão).' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: '...rest', type: 'HTMLAttributes<HTMLDivElement>', description: 'Atributos nativos da barra.' },
      ]}
    />
    <UglDocPropsTable
      title="UglSelectionBarAction"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único.' },
        { name: 'icon', type: 'UglIconName', description: 'Glifo do botão.' },
        { name: 'label', type: 'string', description: 'Nome acessível e dica.' },
        { name: 'onClick', type: '() => void', description: 'Acionamento.' },
        { name: 'tone', type: "'default' | 'danger'", default: "'default'", description: 'Tom do glifo.' },
        { name: 'disabled', type: 'boolean', description: 'Desabilita mesmo com itens selecionados.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SelectionBar> = {
  title: 'Unoogaleria/Componentes/SelectionBar',
  component: SelectionBar,
  parameters: { layout: 'padded' },
  argTypes: {
    count: { control: { type: 'number', min: 0, max: 500 }, description: 'Itens selecionados.' },
    label: { control: 'text', description: 'Rótulo central.' },
    actions: { control: 'object', description: 'Ações.' },
    ariaLabel: { control: 'text', description: 'Nome da barra.' },
    floating: { control: 'boolean', description: 'Absoluta na base.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    count: 3,
    actions: acoes(),
    ariaLabel: 'Ações da seleção',
    floating: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof SelectionBar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SelectionBarDocumentationPage />,
};

/**
 * Playground com todas as propriedades da SelectionBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da SelectionBar',
  render: (args) => (
    <UglDocStage theme={args.theme} surface="secondary" padding={16}>
      <div style={{ width: 390, position: 'relative', minHeight: args.floating ? 120 : undefined }}>
        <SelectionBar {...args} label={args.label || undefined} />
      </div>
    </UglDocStage>
  ),
};

/**
 * A biblioteca em modo de seleção no aparelho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: seleção na biblioteca',
  parameters: { layout: 'centered' },
  render: () => <TelaSelecao />,
};

/**
 * Biblioteca e lixeira.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UglDocStage surface="secondary" direction="column" align="flex-start" padding={16} gap={12}>
      <div style={{ width: 390 }}>
        <SelectionBar count={3} actions={acoes()} ariaLabel="Ações da biblioteca" />
      </div>
      <div style={{ width: 390 }}>
        <SelectionBar count={2} actions={ACOES_LIXEIRA} ariaLabel="Ações da lixeira" />
      </div>
      <div style={{ width: 390 }}>
        <SelectionBar count={3} label="3 de 12 escolhidos" actions={acoes().slice(0, 1)} ariaLabel="Ação única" />
      </div>
    </UglDocStage>
  ),
};

/**
 * Nenhum, um e muitos selecionados; ação indisponível.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage surface="secondary" direction="column" align="flex-start" padding={16} gap={12}>
      {[0, 1, 1250].map((contagem) => (
        <div key={contagem} style={{ width: 390 }}>
          <SelectionBar count={contagem} actions={acoes()} ariaLabel={`Ações com ${contagem} selecionados`} />
        </div>
      ))}
      <div style={{ width: 390 }}>
        <SelectionBar
          count={2}
          actions={acoes().map((acao) => (acao.id === 'album' ? { ...acao, disabled: true } : acao))}
          ariaLabel="Ações com um álbum indisponível"
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
          <TelaSelecao theme={tema} />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Ações só com contagem maior que zero, setas entre elas e o rótulo vivo.
 */
export const HabilitacaoETeclado: Story = {
  name: 'Habilitação e teclado',
  render: () => (
    <UglDocStage surface="secondary" padding={16}>
      <BarraComContagem />
    </UglDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const barra = tela.getByRole('toolbar', { name: 'Ações da seleção' });
    const [compartilhar, album, excluir] = ['Compartilhar', 'Adicionar a um álbum', 'Excluir'].map((nome) =>
      within(barra).getByRole('button', { name: nome })
    );

    // Nada selecionado: tudo desabilitado e o rótulo explica.
    for (const botao of [compartilhar, album, excluir]) await expect(botao).toBeDisabled();
    await expect(within(barra).getByText(uglFormatSelection(0))).toHaveAttribute('aria-live', 'polite');

    await userEvent.click(tela.getByRole('button', { name: 'Selecionar mais um' }));
    for (const botao of [compartilhar, album, excluir]) await expect(botao).toBeEnabled();
    await expect(within(barra).getByText(uglFormatSelection(1))).toBeInTheDocument();

    // Um só ponto de Tab; as setas andam e dão a volta.
    await expect(compartilhar).toHaveAttribute('tabindex', '0');
    await expect(album).toHaveAttribute('tabindex', '-1');
    compartilhar.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(album).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(excluir).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(compartilhar).toHaveFocus();
    await userEvent.keyboard('{ArrowLeft}');
    await expect(excluir).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await expect(tela.getByRole('status', { name: 'Última ação' })).toHaveTextContent('excluir');

    await userEvent.click(tela.getByRole('button', { name: 'Limpar' }));
    await expect(excluir).toBeDisabled();
  },
};
