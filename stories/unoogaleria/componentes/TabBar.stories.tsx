import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { TabBar } from '../../../src/unoogaleria/components/TabBar';
import type { UglTabBarItem } from '../../../src/unoogaleria/components/TabBar';
import { MediaGrid } from '../../../src/unoogaleria/components/MediaGrid';
import { TopBar } from '../../../src/unoogaleria/components/TopBar';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { uglFormatCount } from '../../../src/unoogaleria/media';
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

/** Os quatro destinos da galeria. */
const ABAS: UglTabBarItem[] = [
  { id: 'biblioteca', label: 'Biblioteca', icon: 'library', iconActive: 'libraryFilled' },
  { id: 'para-voce', label: 'Para você', icon: 'memories', iconActive: 'memoriesFilled', badge: 2 },
  { id: 'albuns', label: 'Álbuns', icon: 'albums', iconActive: 'albumsFilled' },
  { id: 'busca', label: 'Busca', icon: 'search' },
];

/**
 * Barra controlada: o produto guarda o destino ativo.
 */
const BarraControlada: React.FC<{
  theme?: 'light' | 'dark';
  inicial?: string;
  onChange?: (id: string) => void;
}> = ({ theme, inicial = 'biblioteca', onChange }) => {
  const [ativa, setAtiva] = useState(inicial);
  return (
    <div style={{ width: 390, display: 'grid', gap: 8 }}>
      <TabBar
        theme={theme}
        items={ABAS}
        activeId={ativa}
        onChange={(id) => {
          setAtiva(id);
          onChange?.(id);
        }}
      />
      <p style={{ margin: 0, fontFamily: 'var(--ugl-font-sans)', fontSize: 12, color: 'var(--ugl-color-text-secondary)' }}>
        Destino ativo: <output>{ABAS.find((aba) => aba.id === ativa)?.label}</output>
      </p>
    </div>
  );
};

/**
 * A tela da biblioteca: a grade corre por baixo da barra superior e das abas.
 */
const TelaBiblioteca: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => {
  const [ativa, setAtiva] = useState('biblioteca');
  return (
    <PhoneFrame scale={0.75} theme={theme}>
      <TopBar variant="overlay" title="Biblioteca" />
      <MediaGrid
        items={uglMediaItems}
        now={uglDemoNow}
        topInset={44}
        bottomInset={50}
        footer={uglFormatCount(uglMediaItems)}
      />
      <TabBar items={ABAS} activeId={ativa} onChange={setAtiva} floating />
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente TabBar.
 */
const TabBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Navegação"
      title="TabBar"
      description="Abas inferiores da navegação principal da galeria: Biblioteca, Para você, Álbuns e Busca. Translúcida com desfoque sobre a grade, com o fio superior e a área segura da barra de gesto. O destino ativo tem o glifo preenchido, o roxo de acento e aria-current."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma barra, quatro destinos, sempre à mão."
    />
    <UglDocGrid>
      <UglDocCard icon="🧭" title="Navegação principal">
        Um <code>&lt;nav&gt;</code> rotulado com uma lista de botões. O ativo recebe{' '}
        <code>aria-current=&quot;page&quot;</code>, o glifo preenchido (<code>iconActive</code>) e o
        acento; os outros ficam em <code>icon-secondary</code> e <code>text-secondary</code>.
      </UglDocCard>
      <UglDocCard icon="📱" title="Área segura">
        O conteúdo tem <code>--ugl-tabbar-height</code> (50px) e, abaixo dele, o recuo{' '}
        <code>--ugl-safe-area-bottom</code>, que o <code>PhoneFrame</code> define com a altura da
        barra de gesto.
      </UglDocCard>
      <UglDocCard icon="🪟" title="Sobre a grade">
        Com <code>floating</code>, a barra fica absoluta na base e a grade corre por baixo, vista
        através do desfoque. A <code>MediaGrid</code> recebe <code>bottomInset=50</code> para a última
        linha não ficar escondida.
      </UglDocCard>
      <UglDocCard icon="⌨️" title="Teclado">
        Os botões ficam na ordem de Tab — é navegação, não abas de conteúdo — e as setas, Home e End
        movem o foco entre eles, com volta nas pontas.
      </UglDocCard>
      <UglDocCard icon="🔴" title="Selo de novidades">
        <code>badge</code> mostra a contagem num selo roxo sobre o glifo (acima de 99, “99+”). O leitor
        de tela ouve “Para você, 2 novidades”.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas e escolhas de composição."
    />
    <UglDocSpecs
      component="TabBar"
      layout="Barra · 50px + área segura"
      specs={[
        { label: 'Altura do conteúdo', value: '--ugl-tabbar-height (50px)' },
        { label: 'Recuo inferior', value: '--ugl-safe-area-bottom' },
        { label: 'Superfície', value: '--ugl-color-surface-bar + blur 16px' },
        { label: 'Fio', value: '--ugl-elevation-hairline-top' },
        { label: 'Glifo', value: '24px · md' },
        { label: 'Rótulo', value: 'caption-strong · 12/18' },
        { label: 'Selo', value: '18px · action-primary · text-on-action' },
        { label: 'Camada', value: '--ugl-z-bar' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Todos os destinos na ordem de Tab',
          detail:
            'a barra é navegação (aria-current), não um tablist: cada destino é um botão alcançável por Tab, e as setas são um atalho a mais. Trocar de destino só acontece por Enter, Espaço ou toque — mover o foco não navega.',
        },
        {
          subject: 'onChange só na troca',
          detail:
            'tocar no destino que já está ativo não chama onChange. O produto que quiser "tocar de novo para voltar ao topo" escuta o clique no próprio contêiner.',
        },
        {
          subject: 'Glifo ativo preenchido por padrão',
          detail:
            'sem iconActive, o ativo usa o próprio glifo com o eixo FILL ligado; com iconActive, o glifo informado, também preenchido. A cor não é a única pista: o peso do glifo muda junto.',
        },
        {
          subject: 'Selo em action-primary',
          detail:
            'o selo usa o roxo de ação com text-on-action (5,0:1 no claro, 8,3:1 no escuro), e não o vermelho de favorito, que no módulo significa "favorita". O número é aria-hidden e o texto “, N novidades” vai ao nome acessível.',
        },
        {
          subject: 'Medidas locais',
          detail:
            '--ugl-tab-bar-badge-size (18px, a linha de caption-strong) e --ugl-tab-bar-badge-offset (-6px, o selo avança sobre o canto do glifo). A prop floating é extensão do contrato: posiciona a barra na base do contêiner.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Barra translúcida com quatro destinos."
    />
    <UglDocStage label="Barra de abas (390px)" surface="secondary" align="flex-start" padding={16}>
      <div style={{ width: 390 }}>
        <TabBar items={ABAS} activeId="biblioteca" />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Barra', role: 'Superfície translúcida com desfoque e fio superior.', token: '--ugl-color-surface-bar · --ugl-elevation-hairline-top' },
            { name: 'Destino ativo', role: 'Glifo preenchido e rótulo em acento, com aria-current="page".', token: '--ugl-color-icon-accent · --ugl-color-text-accent' },
            { name: 'Destino inativo', role: 'Glifo de contorno e rótulo secundário.', token: '--ugl-color-icon-secondary · --ugl-color-text-secondary' },
            { name: 'Selo', role: 'Contagem de novidades sobre o canto do glifo.', token: '--ugl-color-action-primary · --ugl-color-text-on-action' },
            { name: 'Área segura', role: 'Recuo inferior para a barra de gesto.', token: '--ugl-safe-area-bottom' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada destino ativo, com e sem selo, e dentro do aparelho."
    />
    <UglDocStage label="Destino ativo" surface="secondary" direction="column" align="flex-start" padding={16} gap={12}>
      {ABAS.map((aba) => (
        <div key={aba.id} style={{ width: 390 }}>
          <TabBar items={ABAS} activeId={aba.id} ariaLabel={`Navegação com ${aba.label} ativo`} />
        </div>
      ))}
    </UglDocStage>
    <UglDocStage label="Selo acima de 99" surface="secondary" padding={16}>
      <div style={{ width: 390 }}>
        <TabBar
          items={ABAS.map((aba) => (aba.id === 'para-voce' ? { ...aba, badge: 128 } : aba))}
          activeId="albuns"
          ariaLabel="Navegação com selo grande"
        />
      </div>
    </UglDocStage>
    <UglDocStage label="Dentro do aparelho, sobre a grade" surface="secondary" padding={16}>
      <TelaBiblioteca />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso da barra de abas." />
    <UglDocPractices
      dos={[
        'Manter de três a cinco destinos de primeiro nível, sempre na mesma ordem.',
        'Usar floating quando a grade corre por baixo, e passar bottomInset à MediaGrid.',
        'Informar iconActive quando o registro tem o par contorno/preenchido.',
        'Usar badge para novidades reais (memórias novas), e zerar ao visitar.',
      ]}
      donts={[
        'Pôr ações (Excluir, Compartilhar) na barra de abas: elas vão na SelectionBar.',
        'Esconder o rótulo e deixar só o glifo: o rótulo é a pista principal.',
        'Diferenciar o ativo só pela cor: o glifo preenchido faz parte da regra.',
        'Somar a área segura por fora: a barra já soma --ugl-safe-area-bottom.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfície translúcida, acento e selo acompanham o tema."
    />
    <UglDocThemeSwitcher surface="secondary" padding={16}>
      {(tema) => <BarraControlada theme={tema} />}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do componente TabBar."
    />
    <UglDocPropsTable
      title="TabBar"
      rows={[
        { name: 'items', type: 'UglTabBarItem[]', description: 'Destinos, na ordem da barra. Obrigatório.' },
        { name: 'activeId', type: 'string', description: 'Destino ativo (aria-current="page"). Obrigatório.' },
        { name: 'onChange', type: '(id: string) => void', description: 'Toque num destino diferente do ativo.' },
        { name: 'onReselect', type: '(id: string) => void', description: 'Toque de novo no destino ativo (voltar à raiz da aba).' },
        { name: 'ariaLabel', type: 'string', default: "'Navegação principal'", description: 'Nome acessível do <nav>.' },
        { name: 'floating', type: 'boolean', default: 'false', description: 'Absoluta na base do contêiner, sobre o conteúdo (extensão).' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: '...rest', type: 'HTMLAttributes<HTMLElement>', description: 'Atributos nativos do <nav>.' },
      ]}
    />
    <UglDocPropsTable
      title="UglTabBarItem"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único.' },
        { name: 'label', type: 'string', description: 'Rótulo visível e nome acessível.' },
        { name: 'icon', type: 'UglIconName', description: 'Glifo em repouso.' },
        { name: 'iconActive', type: 'UglIconName', description: 'Glifo do ativo (preenchido). Sem valor, o próprio icon preenchido.' },
        { name: 'badge', type: 'number', description: 'Contagem de novidades. Zero não mostra selo; acima de 99, “99+”.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TabBar> = {
  title: 'Unoogaleria/Componentes/TabBar',
  component: TabBar,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Destinos da barra.' },
    activeId: {
      control: 'radio',
      options: ABAS.map((aba) => aba.id),
      description: 'Destino ativo.',
    },
    ariaLabel: { control: 'text', description: 'Nome acessível da navegação.' },
    floating: { control: 'boolean', description: 'Absoluta na base do contêiner.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onChange: { action: 'onChange', description: 'Troca de destino.' },
    onReselect: { action: 'onReselect', description: 'Toque de novo no destino ativo.' },
  },
  args: {
    items: ABAS,
    activeId: 'biblioteca',
    ariaLabel: 'Navegação principal',
    floating: false,
    theme: 'light',
    onChange: fn(),
    onReselect: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof TabBar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TabBarDocumentationPage />,
};

/**
 * Playground com todas as propriedades da TabBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da TabBar',
  render: (args) => (
    <UglDocStage theme={args.theme} surface="secondary" padding={16}>
      <div style={{ width: 390, position: 'relative', minHeight: args.floating ? 120 : undefined }}>
        <TabBar {...args} />
      </div>
    </UglDocStage>
  ),
};

/**
 * A biblioteca no aparelho, com a grade correndo por baixo das barras.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: biblioteca no aparelho',
  parameters: { layout: 'centered' },
  render: () => <TelaBiblioteca />,
};

/**
 * Cada destino ativo.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UglDocStage surface="secondary" direction="column" align="flex-start" padding={16} gap={12}>
      {ABAS.map((aba) => (
        <div key={aba.id} style={{ width: 390 }}>
          <TabBar items={ABAS} activeId={aba.id} ariaLabel={`Navegação com ${aba.label} ativo`} />
        </div>
      ))}
    </UglDocStage>
  ),
};

/**
 * Selos: sem, com contagem e acima de 99.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage surface="secondary" direction="column" align="flex-start" padding={16} gap={12}>
      {[0, 3, 128].map((contagem) => (
        <div key={contagem} style={{ width: 390 }}>
          <TabBar
            items={ABAS.map((aba) => (aba.id === 'para-voce' ? { ...aba, badge: contagem } : aba))}
            activeId="biblioteca"
            ariaLabel={`Navegação com selo ${contagem}`}
          />
        </div>
      ))}
    </UglDocStage>
  ),
};

/**
 * A barra nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UglDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={tema}
          surface="secondary"
          padding={16}
        >
          <TelaBiblioteca theme={tema} />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Troca de destino por toque e foco pelas setas, Home e End.
 */
export const NavegacaoPorTeclado: Story = {
  name: 'Navegação por teclado',
  args: { onChange: fn() },
  render: (args) => (
    <UglDocStage surface="secondary" padding={16}>
      <BarraControlada onChange={args.onChange} />
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const nav = tela.getByRole('navigation', { name: 'Navegação principal' });
    const [biblioteca, paraVoce, albuns, busca] = ABAS.map((aba) =>
      within(nav).getByRole('button', { name: new RegExp(`^${aba.label}`) })
    );

    await expect(biblioteca).toHaveAttribute('aria-current', 'page');
    await expect(paraVoce).toHaveAccessibleName(/^Para você\s*, 2 novidades$/);

    await userEvent.click(albuns);
    await expect(args.onChange).toHaveBeenCalledWith('albuns');
    await waitFor(() => expect(albuns).toHaveAttribute('aria-current', 'page'));
    await expect(biblioteca).not.toHaveAttribute('aria-current');

    // Setas movem o foco sem trocar de destino.
    await userEvent.keyboard('{ArrowRight}');
    await expect(busca).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(biblioteca).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(busca).toHaveFocus();
    await userEvent.keyboard('{Home}');
    await expect(biblioteca).toHaveFocus();
    await userEvent.keyboard('{ArrowLeft}');
    await expect(busca).toHaveFocus();
    await expect(albuns).toHaveAttribute('aria-current', 'page');

    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(busca).toHaveAttribute('aria-current', 'page'));
  },
};
