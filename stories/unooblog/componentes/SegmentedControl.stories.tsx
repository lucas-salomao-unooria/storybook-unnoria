import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SegmentedControl } from '../../../src/unooblog/components/SegmentedControl';
import type { UblSegmentedItem } from '../../../src/unooblog/components/SegmentedControl';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocStage,
  UblDocPractices,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';
import { notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Ordem dos comentários de um post. */
const ORDEM: UblSegmentedItem[] = [
  { id: 'recentes', label: 'Recentes', icon: 'schedule' },
  { id: 'populares', label: 'Populares', icon: 'like' },
];

/** Tamanho do texto da leitura. */
const TEXTO: UblSegmentedItem[] = [
  { id: 'sm', label: 'Pequeno' },
  { id: 'md', label: 'Médio' },
  { id: 'lg', label: 'Grande' },
];

/** Visões do feed, sem glifo. */
const VISOES: UblSegmentedItem[] = [
  { id: 'cartoes', label: 'Cartões' },
  { id: 'lista', label: 'Lista' },
];

/** Espião das estórias de interação. */
const mudouSpy = fn();

/**
 * Controle controlado: o produto guarda a escolha e mostra o eco abaixo.
 */
const OrdemDosComentarios: React.FC = () => {
  const [ordem, setOrdem] = useState('recentes');
  return (
    <div style={{ display: 'grid', gap: 'var(--ubl-spacing-m)', justifyItems: 'start' }}>
      <SegmentedControl items={ORDEM} value={ordem} onValueChange={setOrdem} ariaLabel="Ordenar comentários" />
      <p style={notaEstilo} data-testid="eco">
        Ordem escolhida: {ORDEM.find((item) => item.id === ordem)?.label}
      </p>
    </div>
  );
};

/**
 * Página de documentação rica do componente SegmentedControl.
 */
const SegmentedControlDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Fundação"
      title="SegmentedControl"
      description="Escolha única entre poucas opções de mesmo peso — “Recentes | Populares”, “Pequeno | Médio | Grande” —, numa trilha em cápsula com indicador deslizante. É um grupo de rádio: as setas, Home e End movem a escolha."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Quando a pessoa escolhe uma entre duas ou quatro opções e vê o resultado na hora."
    />
    <UblDocGrid>
      <UblDocCard icon="💬" title="Ordem dos comentários">
        “Recentes | Populares”: a lista muda no mesmo lugar, sem trocar de página.
      </UblDocCard>
      <UblDocCard icon="🔠" title="Tamanho do texto">
        “Pequeno | Médio | Grande” controla o corpo da prosa do post (16, 18 e 20px).
      </UblDocCard>
      <UblDocCard icon="⌨️" title="Grupo de rádio">
        <code>role=&quot;radiogroup&quot;</code> com segmentos <code>role=&quot;radio&quot;</code>. Só o escolhido
        entra no Tab; ←/→ (e ↑/↓), Home e End movem o foco e a escolha juntos.
      </UblDocCard>
      <UblDocCard icon="🎚️" title="Controlado ou não">
        Com <code>value</code>, o produto guarda a escolha; com <code>defaultValue</code> (ou nada, e vale a
        primeira opção), o componente guarda e avisa por <code>onValueChange</code>.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="SegmentedControl"
      layout="Trilha em cápsula · segmentos de mesma largura"
      specs={[
        { label: 'Alturas', value: 'sm 32px · md 40px (medidas locais --ubl-segmented-height-*)' },
        { label: 'Trilha', value: 'fill-field · contorno de 1px em border-control · --ubl-radius-full' },
        { label: 'Indicador', value: 'action-primary · cápsula 2px (--ubl-spacing-4xs) para dentro da trilha' },
        { label: 'Escolhido', value: 'text-on-action sobre o indicador' },
        { label: 'Segmento', value: 'label 14/20, 600 · recuo sm 12px, md 16px' },
        { label: 'Alvo de toque', value: '44px de altura, por pseudoelemento' },
        { label: 'Glifo', value: 'Icon xs (sm) ou sm (md), herdando a cor do rótulo' },
        { label: 'Movimento', value: 'translateX em --ubl-transition-slow; desligado com movimento reduzido' },
        { label: 'Cliente', value: "'use client': useControllableState e foco por teclado" },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Indicador em action-primary, não um segmento elevado',
          detail:
            'um segmento branco elevado sobre a trilha lavanda mediria perto de 1,1:1 contra a trilha, ilegível como limite. O indicador em roxo de ação, com text-on-action, passa de 4,8:1 no claro e 8,2:1 no escuro, e o contorno de border-control fecha a trilha com 4,3:1 ou mais nos dois temas.',
        },
        {
          subject: 'Todos os segmentos têm a mesma largura',
          detail:
            'é o que permite ao indicador deslizar por CSS puro, com --ubl-segmented-count e --ubl-segmented-index vindos do componente, sem medir o DOM. O rótulo mais comprido não alarga o segmento: ele trunca com reticências.',
        },
        {
          subject: 'Foco móvel de grupo de rádio',
          detail:
            'só o segmento escolhido tem tabIndex 0; os demais, -1. As setas movem o foco e a escolha juntas (e dão a volta nas pontas), Home e End vão ao primeiro e ao último. Quando o valor não bate com nenhum segmento, o primeiro entra no Tab.',
        },
        {
          subject: 'Nome do grupo obrigatório',
          detail:
            'ariaLabel é obrigatório: um grupo de rádio sem nome não diz ao leitor de tela o que está sendo escolhido (“Ordenar comentários”).',
        },
        {
          subject: 'Contrato do blog: items e onValueChange',
          detail:
            'a Unoogaleria chama as opções de options e o callback de onChange e tem a variante flutuante; o blog usa items e onValueChange, do contrato do módulo, e não tem a variante floating, que depende de desfoque de fundo sobre mídia.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocAnatomy
      zones={[
        { name: 'Trilha (radiogroup)', role: 'Cápsula com o contorno de controle e o nome do grupo.', token: '--ubl-color-border-control' },
        { name: 'Indicador', role: 'Cápsula que desliza sob o segmento escolhido.', token: '--ubl-color-action-primary' },
        { name: 'Segmento (radio)', role: 'Botão de mesma largura, com aria-checked.', token: '--ubl-font-label-*' },
        { name: 'Glifo', role: 'Ícone opcional antes do rótulo.', token: '--ubl-icon-size-*' },
        { name: 'Anel de foco', role: 'Contorno de 2px no segmento focado por teclado.', token: '--ubl-color-focus-ring' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real: dois tamanhos, com e sem glifo, em largura natural e total."
    />
    <UblDocStage label="Tamanhos: sm e md" gap={16} padding={24}>
      <SegmentedControl items={ORDEM} ariaLabel="Ordenar (pequeno)" size="sm" />
      <SegmentedControl items={ORDEM} ariaLabel="Ordenar (médio)" size="md" />
    </UblDocStage>
    <UblDocStage label="Com e sem glifo" gap={16} padding={24}>
      <SegmentedControl items={TEXTO} ariaLabel="Tamanho do texto" defaultValue="md" />
      <SegmentedControl items={VISOES} ariaLabel="Visão do feed" defaultValue="lista" />
    </UblDocStage>
    <UblDocStage label="fullWidth" align="stretch" direction="column" gap={16} padding={24} width={390}>
      <SegmentedControl items={TEXTO} ariaLabel="Tamanho do texto (largura total)" fullWidth defaultValue="lg" />
    </UblDocStage>
    <UblDocStage label="Controlado: o produto guarda a escolha" surface="card" padding={24}>
      <OrdemDosComentarios />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Usar para duas a quatro opções de mesmo peso, com rótulos curtos.',
        'Dar sempre um ariaLabel que diga o que o grupo escolhe.',
        'Mostrar o efeito da escolha no mesmo lugar, na hora.',
        'Usar fullWidth no celular para o alvo de toque ocupar a largura.',
      ]}
      donts={[
        'Usar para navegar entre páginas: para isso há links ou abas.',
        'Passar de quatro opções: use um menu ou chips.',
        'Misturar segmentos com e sem glifo no mesmo grupo.',
        'Esperar que um rótulo longo alargue o segmento: todos têm a mesma largura.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Trilha, contorno, indicador e rótulo acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher surface="card">
      {() => (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <SegmentedControl items={ORDEM} ariaLabel="Ordenar comentários" />
          <SegmentedControl items={TEXTO} ariaLabel="Tamanho do texto" defaultValue="md" size="sm" />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="SegmentedControl"
      rows={[
        { name: 'items', type: '{ id: string; label: string; icon?: UblIconName }[]', description: 'Segmentos, na ordem de exibição (obrigatório).' },
        { name: 'value', type: 'string', description: 'Segmento escolhido (modo controlado).' },
        { name: 'defaultValue', type: 'string', description: 'Escolha inicial (modo não controlado); sem ela, o primeiro.' },
        { name: 'onValueChange', type: '(id: string) => void', description: 'Chamado com o id escolhido, por clique ou teclado.' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Altura de 32 ou 40px.' },
        { name: 'ariaLabel', type: 'string', description: 'Nome acessível do grupo (obrigatório).' },
        { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Ocupa toda a largura do contêiner.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos do radiogroup (className, style, data-*).' },
      ]}
    />
    <UblDocPropsTable
      title="Tipos públicos"
      rows={[
        { name: 'UblSegmentedItem', type: '{ id: string; label: string; icon?: UblIconName }', description: 'Um segmento.' },
        { name: 'UblSegmentedControlSize', type: "'sm' | 'md'", description: 'As duas alturas.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SegmentedControl> = {
  title: 'Unooblog/Componentes/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Segmentos: { id, label, icon? }.' },
    value: { control: false, description: 'Escolha controlada (a estória Controlado a usa).' },
    defaultValue: { control: 'text', description: 'Escolha inicial (id).' },
    onValueChange: { action: 'onValueChange', description: 'Chamado com o id escolhido.' },
    size: { control: 'radio', options: ['sm', 'md'], description: 'Altura.' },
    ariaLabel: { control: 'text', description: 'Nome acessível do grupo.' },
    fullWidth: { control: 'boolean', description: 'Largura total.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    items: ORDEM,
    defaultValue: 'recentes',
    size: 'md',
    ariaLabel: 'Ordenar comentários',
    fullWidth: false,
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SegmentedControlDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SegmentedControl',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} padding={40} align={args.fullWidth ? 'stretch' : 'center'} direction="column">
      <SegmentedControl key={`${args.defaultValue}-${args.items.length}`} {...args} />
    </UblDocStage>
  ),
};

/**
 * A ordem dos comentários de um post, com o eco da escolha.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: ordem dos comentários',
  render: () => (
    <UblDocStage surface="card" padding={32}>
      <OrdemDosComentarios />
    </UblDocStage>
  ),
};

/**
 * Duas, três e quatro opções.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UblDocStage label="Duas opções, com glifo" gap={16} padding={24}>
        <SegmentedControl items={ORDEM} ariaLabel="Ordenar comentários" />
      </UblDocStage>
      <UblDocStage label="Três opções" gap={16} padding={24}>
        <SegmentedControl items={TEXTO} ariaLabel="Tamanho do texto" defaultValue="md" />
      </UblDocStage>
      <UblDocStage label="Quatro opções" gap={16} padding={24}>
        <SegmentedControl
          items={[...TEXTO, { id: 'xl', label: 'Enorme' }]}
          ariaLabel="Tamanho do texto, com quatro opções"
          defaultValue="lg"
        />
      </UblDocStage>
    </div>
  ),
};

/**
 * As duas alturas e a largura total.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UblDocStage label="sm · 32px" gap={16} padding={24}>
        <SegmentedControl items={TEXTO} ariaLabel="Tamanho do texto (sm)" size="sm" defaultValue="md" />
      </UblDocStage>
      <UblDocStage label="md · 40px" gap={16} padding={24}>
        <SegmentedControl items={TEXTO} ariaLabel="Tamanho do texto (md)" size="md" defaultValue="md" />
      </UblDocStage>
      <UblDocStage label="fullWidth" align="stretch" direction="column" padding={24} width={390}>
        <SegmentedControl items={TEXTO} ariaLabel="Tamanho do texto (largura total)" fullWidth defaultValue="md" />
      </UblDocStage>
    </div>
  ),
};

/**
 * Cada segmento escolhido, um por vez.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {TEXTO.map((item) => (
        <UblDocStage key={item.id} label={`Escolhido: ${item.label}`} padding={24}>
          <SegmentedControl items={TEXTO} ariaLabel={`Tamanho do texto, ${item.label} escolhido`} defaultValue={item.id} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UblDocStage
          key={theme}
          label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={theme}
          surface="card"
          gap={16}
          padding={24}
        >
          <SegmentedControl items={ORDEM} ariaLabel="Ordenar comentários" />
          <SegmentedControl items={TEXTO} ariaLabel="Tamanho do texto" defaultValue="md" size="sm" />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: o clique escolhe, o `radiogroup` tem nome, as setas movem o foco e
 * a escolha juntos (com volta nas pontas) e Home e End vão às pontas.
 */
export const Teclado: Story = {
  name: 'Interação: setas, Home e End',
  render: () => (
    <UblDocStage padding={24}>
      <SegmentedControl items={TEXTO} ariaLabel="Tamanho do texto" defaultValue="md" onValueChange={mudouSpy} />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    mudouSpy.mockClear();
    const canvas = within(canvasElement);

    const grupo = canvas.getByRole('radiogroup', { name: 'Tamanho do texto' });
    const pequeno = within(grupo).getByRole('radio', { name: 'Pequeno' });
    const medio = within(grupo).getByRole('radio', { name: 'Médio' });
    const grande = within(grupo).getByRole('radio', { name: 'Grande' });

    // O escolhido é o único que entra no Tab
    await expect(medio).toHaveAttribute('aria-checked', 'true');
    await expect(medio).toHaveAttribute('tabindex', '0');
    await expect(pequeno).toHaveAttribute('tabindex', '-1');

    // Tab chega ao escolhido
    await userEvent.tab();
    await expect(medio).toHaveFocus();

    // → move o foco e a escolha
    await userEvent.keyboard('{ArrowRight}');
    await expect(grande).toHaveFocus();
    await expect(grande).toHaveAttribute('aria-checked', 'true');
    await expect(mudouSpy).toHaveBeenLastCalledWith('lg');

    // → na ponta dá a volta
    await userEvent.keyboard('{ArrowRight}');
    await expect(pequeno).toHaveFocus();
    await expect(pequeno).toHaveAttribute('aria-checked', 'true');

    // ← na primeira dá a volta para a última
    await userEvent.keyboard('{ArrowLeft}');
    await expect(grande).toHaveFocus();

    // Home e End vão às pontas
    await userEvent.keyboard('{Home}');
    await expect(pequeno).toHaveAttribute('aria-checked', 'true');
    await userEvent.keyboard('{End}');
    await expect(grande).toHaveAttribute('aria-checked', 'true');

    // Clique escolhe
    await userEvent.click(medio);
    await expect(medio).toHaveAttribute('aria-checked', 'true');
    await expect(mudouSpy).toHaveBeenLastCalledWith('md');
  },
};

/**
 * Interação: controlado, o produto guarda a escolha; o glifo e o rótulo nomeiam
 * o segmento.
 */
export const Controlado: Story = {
  name: 'Interação: controlado com value',
  render: () => (
    <UblDocStage surface="card" padding={24}>
      <OrdemDosComentarios />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId('eco')).toHaveTextContent('Ordem escolhida: Recentes');
    await userEvent.click(canvas.getByRole('radio', { name: 'Populares' }));
    await expect(canvas.getByTestId('eco')).toHaveTextContent('Ordem escolhida: Populares');
    await expect(canvas.getByRole('radio', { name: 'Populares' })).toHaveAttribute('aria-checked', 'true');
    await expect(canvas.getByRole('radio', { name: 'Recentes' })).toHaveAttribute('aria-checked', 'false');

    // O glifo é decorativo: o nome acessível é só o rótulo
    await expect(canvas.getByRole('radio', { name: 'Populares' })).toHaveAccessibleName('Populares');
  },
};
