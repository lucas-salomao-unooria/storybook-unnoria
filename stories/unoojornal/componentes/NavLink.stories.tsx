import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { NavLink } from '../../../src/unoojornal/components/NavLink';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocGrid,
  UjnDocCard,
  UjnDocSpecs,
  UjnDocDecisions,
  UjnDocAnatomy,
  UjnDocStage,
  UjnDocPractices,
  UjnDocThemeSwitcher,
  UjnDocPropsTable,
} from '../../../.storybook/components';

const BAR = '#716C98';

type ForcedState = 'default' | 'hover' | 'focus' | 'active';

const STATES: { state: ForcedState; label: string }[] = [
  { state: 'default', label: 'Padrão' },
  { state: 'hover', label: 'Hover' },
  { state: 'focus', label: 'Foco' },
  { state: 'active', label: 'Ativo' },
];

/**
 * Estados forçados SÓ para a documentação (quadro `5:9` do arquivo de
 * referência): uma classe repete o efeito do pseudo-estado, com os mesmos
 * tokens do NavLink.css, para ver a matriz de uma vez, sem o ponteiro.
 */
const ForcedStateStyles: React.FC = () => (
  <style>{`
    .ujn-doc-state--hover {
      border-bottom-color: var(--ujn-color-action-primary);
      background-color: var(--ujn-color-state-hover);
      color: var(--ujn-color-text-primary);
    }
    .ujn-doc-state--focus { outline: 2px solid var(--ujn-color-focus-ring); outline-offset: -2px; }
  `}</style>
);

/**
 * Matriz do quadro `5:9`: os quatro estados com o componente real.
 */
const StateMatrix: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => (
  <div data-ujn-theme={theme} style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
    <ForcedStateStyles />
    {STATES.map(({ state, label }) => (
      <NavLink
        key={state}
        href="#"
        icon="gallery"
        active={state === 'active'}
        className={state === 'hover' || state === 'focus' ? `ujn-doc-state--${state}` : undefined}
        tabIndex={-1}
        onClick={(event) => event.preventDefault()}
      >
        {label}
      </NavLink>
    ))}
  </div>
);

/**
 * Página de documentação rica do componente NavLink.
 */
const NavLinkDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Cabeçalho e navegação"
      title="NavLink"
      description="Um item da navegação principal do jornal: rótulo, glifo opcional e sublinhado de 2px na cor de ação no hover e na seção atual. Com href é um link; sem href, um botão."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="O bloco de construção da MainNav." />
    <UjnDocGrid>
      <UjnDocCard icon="🔗" title="Link ou botão">
        Com <code>href</code> o item é um <code>&lt;a&gt;</code>. Sem ele, um{' '}
        <code>&lt;button type=&quot;button&quot;&gt;</code> — para navegação feita por estado, não por
        endereço.
      </UjnDocCard>
      <UjnDocCard icon="📍" title="Onde estou">
        <code>active</code> marca a seção atual com <code>aria-current=&quot;page&quot;</code>, sublinhado,
        peso de destaque e glifo preenchido — a cor nunca é o único sinal.
      </UjnDocCard>
      <UjnDocCard icon="⌨️" title="Foco visível">
        O anel de foco de 2px aparece no teclado (<code>:focus-visible</code>) e nunca no clique.
      </UjnDocCard>
      <UjnDocCard icon="👆" title="Alvo de 44px">
        A altura mínima é o alvo de toque do módulo, em qualquer largura.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estados herdados do quadro de links `5:9` do arquivo de referência: padrão, hover, foco e ativo."
    />
    <UjnDocSpecs
      component="NavLink"
      layout="Linha com glifo e rótulo · mínimo de 44px · borda inferior de 2px"
      specs={[
        { label: 'Rótulo', value: 'Label/Large (16/24, 500; ativo 700)' },
        { label: 'Cor em repouso', value: '--ujn-color-text-secondary' },
        { label: 'Sublinhado (hover e ativo)', value: '2px · --ujn-color-action-primary' },
        { label: 'Realce de hover', value: '--ujn-color-state-hover' },
        { label: 'Realce de pressionado', value: '--ujn-color-state-pressed' },
        { label: 'Foco', value: 'Anel de 2px · --ujn-color-focus-ring' },
        { label: 'Glifo', value: 'Icon sm (20px), preenchido no ativo' },
        { label: 'Fronteira', value: 'Server Component (não declara hooks nem repassa funções)' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Dourado do Figma → roxo de ação',
          detail:
            'o sublinhado do arquivo de referência é dourado; aqui é --ujn-color-action-primary, que mede ≥ 3:1 sobre a página nos dois temas.',
        },
        {
          subject: 'Sublinhado em borda, não em sombra',
          detail:
            'a borda de 2px entra no cálculo de altura e não depende de box-shadow, que o módulo reserva a sobreposições e fios de 1px.',
        },
        {
          subject: 'Ativo por mais de uma pista',
          detail:
            'além do sublinhado, o ativo ganha peso 700, glifo preenchido e aria-current. Quem não distingue cor reconhece a seção pelo peso e pelo anúncio do leitor de tela.',
        },
        {
          subject: 'Botão sem href',
          detail:
            'o contrato do módulo só pede href opcional: o NavLink vira botão quando não há endereço, em vez de um <a> sem destino (inacessível por teclado).',
        },
        {
          subject: 'Server Component com onClick',
          detail:
            'o componente só repassa o onClick do consumidor ao elemento nativo; quem o declara é o próprio consumidor (client). Por isso não leva a diretiva.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Glifo, rótulo e sublinhado." />
    <UjnDocStage surface="page" align="center" padding={16}>
      <NavLink href="#" icon="agenda" active onClick={(event) => event.preventDefault()}>
        Agenda
      </NavLink>
      <div style={{ flex: '1 1 320px' }}>
        <UjnDocAnatomy
          zones={[
            { name: 'Glifo', role: 'Opcional; preenchido quando a seção está ativa.', token: 'Icon sm · tone inherit' },
            { name: 'Rótulo', role: 'Nome da seção, em uma linha.', token: 'Label/Large' },
            { name: 'Sublinhado', role: '2px na cor de ação: hover e seção atual.', token: '--ujn-color-action-primary' },
            { name: 'Anel de foco', role: 'Contorno de 2px por teclado.', token: '--ujn-color-focus-ring' },
          ]}
        />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os quatro estados do quadro `5:9`, com e sem glifo, como link e como botão."
    />
    <UjnDocStage label="Estados (com glifo)" surface="page" align="flex-start" padding={16}>
      <StateMatrix />
    </UjnDocStage>
    <UjnDocStage label="Sem glifo" surface="page" align="flex-start" padding={16}>
      <NavLink href="#" onClick={(event) => event.preventDefault()}>Início</NavLink>
      <NavLink href="#" active onClick={(event) => event.preventDefault()}>Últimas</NavLink>
    </UjnDocStage>
    <UjnDocStage label="Como botão (sem href)" surface="page" align="flex-start" padding={16}>
      <NavLink icon="opinion">Opinião</NavLink>
      <NavLink icon="opinion" active>Opinião</NavLink>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Navegar sem ambiguidade." />
    <UjnDocPractices
      dos={[
        'Marcar active só em um item da navegação: a seção em que a pessoa está.',
        'Usar href sempre que a seção tem endereço; o botão é para navegação por estado.',
        'Manter o rótulo em uma palavra ou duas, sem quebrar de linha.',
        'Usar o glifo do registro com a variante preenchida (o NavLink já a aplica no ativo).',
      ]}
      donts={[
        'Marcar a seção ativa só mudando a cor: o peso e o aria-current são parte do estado.',
        'Pôr dois itens ativos: o leitor de tela anuncia “página atual” duas vezes.',
        'Usar o NavLink para ações (salvar, compartilhar): são botões da barra de ações.',
        'Reduzir a altura abaixo de 44px: é o alvo de toque do jornal.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Sublinhado e realces acompanham o tema." />
    <UjnDocThemeSwitcher surface="page" padding={16}>
      {(tema) => <StateMatrix theme={tema} />}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do NavLink. Os demais atributos vão ao link ou ao botão."
    />
    <UjnDocPropsTable
      title="NavLink"
      rows={[
        { name: 'href', type: 'string', description: 'Endereço do destino. Sem ele, o item é um botão.' },
        { name: 'active', type: 'boolean', default: 'false', description: 'Seção atual: aria-current="page", sublinhado, peso e glifo preenchido.' },
        { name: 'icon', type: 'UjnIconName', description: 'Glifo antes do rótulo.' },
        { name: 'children', type: 'ReactNode', description: 'Rótulo do item. Obrigatório.' },
        { name: 'onClick', type: '(event: MouseEvent<HTMLElement>) => void', description: 'Chamado no clique.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof NavLink> = {
  title: 'Unoojornal/Componentes/NavLink',
  component: NavLink,
  parameters: { layout: 'padded' },
  argTypes: {
    href: { control: 'text', description: 'Endereço do destino. Sem ele, o item é um botão.' },
    active: { control: 'boolean', description: 'Seção atual.' },
    icon: {
      control: 'select',
      options: [undefined, 'home', 'latest', 'opinion', 'agenda', 'gallery'],
      description: 'Glifo antes do rótulo.',
    },
    children: { control: 'text', description: 'Rótulo do item.' },
    onClick: { action: 'onClick', description: 'Chamado no clique.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    href: '#',
    active: false,
    children: 'Galeria',
    icon: 'gallery',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof NavLink>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <NavLinkDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do NavLink',
  render: (args) => (
    <div data-ujn-theme={args.theme} style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <NavLink {...args} onClick={(event) => { event.preventDefault(); args.onClick?.(event); }} />
    </div>
  ),
};

/**
 * Composição fiel ao quadro de links `5:9`: os quatro estados lado a lado.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: estados do link (5:9)',
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <StateMatrix />
    </div>
  ),
};

/**
 * Com glifo e sem glifo.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <NavLink href="#" icon="home" onClick={(event) => event.preventDefault()}>Com glifo</NavLink>
      <NavLink href="#" onClick={(event) => event.preventDefault()}>Sem glifo</NavLink>
    </div>
  ),
};

/**
 * Link e botão, ativo e inativo.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <NavLink href="#" onClick={(event) => event.preventDefault()}>Link</NavLink>
      <NavLink href="#" active onClick={(event) => event.preventDefault()}>Link ativo</NavLink>
      <NavLink>Botão</NavLink>
      <NavLink active>Botão ativo</NavLink>
    </div>
  ),
};

/**
 * Padrão, hover, foco e ativo, forçados para a documentação.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <StateMatrix />
    </div>
  ),
};

/**
 * O item nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} data-ujn-theme={tema} style={{ background: 'var(--ujn-color-background-page)', padding: 16 }}>
          <StateMatrix theme={tema} />
        </div>
      ))}
    </div>
  ),
};

const aoClicar = fn();

/**
 * Link com aria-current e clique; botão que também responde ao teclado.
 */
export const Interacao: Story = {
  name: 'Seção atual, clique e teclado',
  render: () => (
    <div style={{ display: 'flex', gap: 16, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      <NavLink href="#inicio" active onClick={(event) => event.preventDefault()}>
        Início
      </NavLink>
      <NavLink
        href="#agenda"
        onClick={(event) => {
          event.preventDefault();
          aoClicar('agenda');
        }}
      >
        Agenda
      </NavLink>
      <NavLink onClick={() => aoClicar('botao')}>Galeria</NavLink>
    </div>
  ),
  play: async ({ canvasElement }) => {
    aoClicar.mockClear();
    const nav = within(canvasElement);
    await expect(nav.getByRole('link', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
    await expect(nav.getByRole('link', { name: 'Agenda' })).not.toHaveAttribute('aria-current');

    await userEvent.click(nav.getByRole('link', { name: 'Agenda' }));
    await expect(aoClicar).toHaveBeenLastCalledWith('agenda');

    // Sem href, o item é um botão e responde a Enter e Espaço.
    const botao = nav.getByRole('button', { name: 'Galeria' });
    botao.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(aoClicar).toHaveBeenLastCalledWith('botao');
    await expect(aoClicar).toHaveBeenCalledTimes(3);
  },
};
