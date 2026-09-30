import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Filmstrip } from '../../../src/unoogaleria/components/Filmstrip';
import type { UglFilmstripProps } from '../../../src/unoogaleria/components/Filmstrip';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { uglDefaultEdit, uglMediaLabel } from '../../../src/unoogaleria/media';
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
import { uglMediaItems } from '../fixtures';

const BAR = '#716C98';

/** Uma foto das fixtures com edição não destrutiva, declarada só aqui. */
const FOTO_EDITADA: UglMediaItem = {
  ...uglMediaItems.find((item) => item.type === 'photo' && item.width > item.height)!,
  id: 'filmstrip-editada',
  edit: { ...uglDefaultEdit, filter: 'mono', aspect: '1:1' },
};

/**
 * Tira com estado local: quem guarda o índice é quem usa a tira.
 */
const TiraComEstado: React.FC<Partial<UglFilmstripProps> & { inicial?: number }> = ({
  items = uglMediaItems,
  inicial = 0,
  onSelect,
  ...props
}) => {
  const [ativo, setAtivo] = useState(inicial);
  return (
    <Filmstrip
      {...props}
      items={items}
      activeIndex={ativo}
      onSelect={(indice) => {
        setAtivo(indice);
        onSelect?.(indice);
      }}
    />
  );
};

/**
 * A tira dentro do aparelho, sob uma prévia da mídia escolhida.
 */
const TiraNoAparelho: React.FC = () => {
  const [ativo, setAtivo] = useState(2);
  const item = uglMediaItems[ativo];
  return (
    <PhoneFrame scale={0.75} ariaLabel="Aparelho com tira de miniaturas">
      <div
        data-ugl-immersive=""
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--ugl-color-immersive-surface)',
        }}
      >
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
          <img src={item.src} alt={item.alt} style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }} />
        </div>
        <div
          style={{
            background: 'var(--ugl-color-immersive-bar)',
            paddingBottom: 'calc(var(--ugl-safe-area-bottom) + var(--ugl-spacing-xs))',
            paddingTop: 'var(--ugl-spacing-xs)',
          }}
        >
          <Filmstrip items={uglMediaItems} activeIndex={ativo} onSelect={setAtivo} />
        </div>
      </div>
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente Filmstrip.
 */
const FilmstripDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Visualizador"
      title="Filmstrip"
      description="Tira de miniaturas do visualizador. Todas medem 36×44px; a da mídia aberta se alarga para a proporção dela (de 44px, quadrada, a 64px), ganha contorno de acento e fica no centro. Toque, clique e setas escolhem outra mídia."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Saltar para uma mídia sem deslizar uma a uma."
    />
    <UglDocGrid>
      <UglDocCard icon="🎞️" title="Barra inferior do visualizador">
        O <code>MediaViewer</code> a coloca acima das ações quando há mais de uma mídia. A tira
        acompanha o deslize: a ativa sempre volta ao centro.
      </UglDocCard>
      <UglDocCard icon="↔️" title="Proporção na ativa">
        As miniaturas em repouso são todas iguais, para a tira ler como um rolo; a ativa mostra a
        proporção da mídia: retrato e quadrada ficam em 44px (sempre mais larga que as outras),
        paisagem se alarga até 64px.
      </UglDocCard>
      <UglDocCard icon="⌨️" title="Seleção que acompanha o foco">
        Só a ativa entra no Tab. Setas, Home e End movem o foco e já abrem a mídia — como numa tira
        de verdade, não há &quot;confirmar&quot;.
      </UglDocCard>
      <UglDocCard icon="🪄" title="Edição aplicada">
        A miniatura aplica a edição não destrutiva da foto (filtro, ajustes, rotação e corte), a
        mesma que o visualizador mostra.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UglDocSpecs
      component="Filmstrip"
      layout="Faixa horizontal · 36×44 · espaço 2px"
      specs={[
        { label: 'Miniatura', value: '36 × 44px · --ugl-radius-xs' },
        { label: 'Ativa', value: '44 a 64 × 44px' },
        { label: 'Espaço', value: '--ugl-spacing-4xs (2px)' },
        { label: 'Contorno da ativa', value: '2px · --ugl-color-immersive-accent' },
        { label: 'Foco', value: '2px · offset 2px · immersive-accent' },
        { label: 'Recuo das pontas', value: 'calc(50% − 18px)' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'listbox, não lista de botões',
          detail:
            'a tira escolhe QUAL mídia está aberta — é um seletor de valor único. Por isso role="listbox" horizontal com role="option" e aria-selected, seleção acompanhando o foco e foco móvel (roving tabindex). O leitor de tela anuncia a posição ("3 de 25") sem texto extra.',
        },
        {
          subject: 'Centralização calculada, sem scrollIntoView',
          detail:
            'scrollIntoView rola também os ancestrais — numa página de documentação, a página inteira pularia até a tira. A tira rola só a si mesma (scrollTo), e a posição é calculada a partir das medidas (36px + 2px por miniatura, meia ativa), e não medida: durante a animação de largura, a medição estaria errada. Em movimento reduzido, a rolagem é instantânea.',
        },
        {
          subject: 'Recuo de meia tira nas pontas',
          detail:
            'padding horizontal de calc(50% − 18px): sem ele a primeira e a última miniatura nunca chegariam ao centro.',
        },
        {
          subject: 'Contorno por dentro e foco por fora',
          detail:
            'a ativa tem contorno interno de 2px (não soma largura nem é cortado pela rolagem); o foco por teclado é um anel externo com 2px de afastamento. Os dois podem aparecer juntos sem se confundir.',
        },
        {
          subject: 'Medidas locais',
          detail:
            '36×44, 44 e 64px não têm degrau na escala: são custom properties do bloco (--ugl-filmstrip-*) espelhadas em constantes no componente, que calcula a centralização.',
        },
        {
          subject: 'Sem selo de vídeo na miniatura',
          detail:
            'numa caixa de 36px, um glifo de vídeo cobriria metade da imagem. O tipo chega pelo nome acessível ("…, vídeo de 8 segundos, …") e, ao abrir, pelos controles do vídeo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Faixa rolável com miniaturas de largura fixa e uma ativa mais larga."
    />
    <UglDocStage label="Tira com a terceira mídia aberta" surface="immersive" align="flex-start">
      <div style={{ width: 358 }}>
        <TiraComEstado inicial={2} />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Faixa', role: 'listbox horizontal rolável, sem barra de rolagem visível.', token: '--ugl-spacing-4xs' },
            { name: 'Miniatura', role: 'option de 36×44 com a imagem editada em object-fit: cover.', token: '--ugl-radius-xs' },
            { name: 'Ativa', role: 'option selecionada, de 44 a 64px, sempre centralizada.', token: '--ugl-color-immersive-accent' },
            { name: 'Anel de foco', role: 'Contorno externo de 2px no foco por teclado.', token: '--ugl-color-immersive-accent' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Posição da ativa, proporções e edição."
    />
    <UglDocStage label="Ativa na primeira, no meio e na última" surface="immersive" direction="column" align="stretch">
      <TiraComEstado inicial={0} ariaLabel="Miniaturas — início" />
      <TiraComEstado inicial={12} ariaLabel="Miniaturas — meio" />
      <TiraComEstado inicial={uglMediaItems.length - 1} ariaLabel="Miniaturas — fim" />
    </UglDocStage>
    <UglDocStage label="Proporções da ativa: retrato, quadrada, paisagem e foto editada (Mono, 1:1)" surface="immersive" direction="column" align="stretch">
      {[
        uglMediaItems.find((item) => item.height > item.width)!,
        uglMediaItems.find((item) => item.height === item.width)!,
        uglMediaItems.find((item) => item.width > item.height)!,
        FOTO_EDITADA,
      ].map((item) => (
        <Filmstrip key={item.id} items={[item]} activeIndex={0} onSelect={() => undefined} ariaLabel={`Miniatura de ${item.alt}`} />
      ))}
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso da tira." />
    <UglDocPractices
      dos={[
        'Usar a tira sobre a superfície imersiva, dentro da barra inferior do visualizador.',
        'Passar os mesmos itens, na mesma ordem, que o visualizador desliza.',
        'Guardar o índice fora da tira e repassá-lo em activeIndex.',
        'Esconder a tira quando houver uma mídia só.',
      ]}
      donts={[
        'Usar a tira como galeria de escolha múltipla: ela seleciona uma mídia de cada vez.',
        'Aumentar as miniaturas: a tira compete com a mídia pela atenção.',
        'Pôr a tira sobre fundo claro: o contorno de acento foi medido sobre o imersivo.',
        'Animar a rolagem com movimento reduzido ativo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A tira é imersiva: igual nos dois temas, sobre o mesmo fundo escuro."
    />
    <UglDocThemeSwitcher surface="immersive">
      {(tema) => (
        <div style={{ width: 358 }}>
          <TiraComEstado theme={tema} inicial={4} />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do componente Filmstrip."
    />
    <UglDocPropsTable
      title="Filmstrip"
      rows={[
        { name: 'items', type: 'UglMediaItem[]', description: 'Mídias da tira, na ordem do visualizador. Obrigatório.' },
        { name: 'activeIndex', type: 'number', description: 'Índice da mídia aberta. Obrigatório.' },
        { name: 'onSelect', type: '(index: number) => void', description: 'Pedido de abrir outra mídia (toque, clique, setas, Home, End). Obrigatório.' },
        { name: 'ariaLabel', type: 'string', default: "'Miniaturas'", description: 'Nome acessível da tira.' },
        { name: 'timeZone', type: 'string', default: "'America/Sao_Paulo'", description: 'Fuso das datas nos nomes acessíveis.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema do contêiner. A tira é invariante.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Filmstrip> = {
  title: 'Unoogaleria/Componentes/Filmstrip',
  component: Filmstrip,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Mídias da tira.' },
    activeIndex: {
      control: { type: 'range', min: 0, max: uglMediaItems.length - 1, step: 1 },
      description: 'Índice da mídia aberta.',
    },
    ariaLabel: { control: 'text', description: 'Nome acessível da tira.' },
    timeZone: { control: 'text', description: 'Fuso das datas.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema do contêiner.' },
    onSelect: { action: 'onSelect' },
  },
  args: {
    items: uglMediaItems,
    activeIndex: 3,
    ariaLabel: 'Miniaturas',
    timeZone: 'America/Sao_Paulo',
  },
};

export default meta;

type Story = StoryObj<typeof Filmstrip>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <FilmstripDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas (índice controlado pelo painel).
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da Filmstrip',
  render: (args) => (
    <UglDocStage surface="immersive" align="flex-start">
      <div style={{ width: 358 }}>
        <Filmstrip {...args} />
      </div>
    </UglDocStage>
  ),
};

/**
 * A tira no aparelho, sob a prévia da mídia escolhida.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: tira sob a mídia',
  render: () => <TiraNoAparelho />,
};

/**
 * Proporções da miniatura ativa e foto editada.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UglDocStage surface="immersive" direction="column" align="stretch" width={400}>
      {[
        uglMediaItems.find((item) => item.height > item.width)!,
        uglMediaItems.find((item) => item.height === item.width)!,
        uglMediaItems.find((item) => item.width > item.height)!,
        FOTO_EDITADA,
      ].map((item) => (
        <Filmstrip key={item.id} items={[item]} activeIndex={0} onSelect={() => undefined} ariaLabel={`Miniatura de ${item.alt}`} />
      ))}
    </UglDocStage>
  ),
};

/**
 * Ativa na primeira, no meio e na última posição.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage surface="immersive" direction="column" align="stretch" width={400}>
      <TiraComEstado inicial={0} ariaLabel="Miniaturas — início" />
      <TiraComEstado inicial={12} ariaLabel="Miniaturas — meio" />
      <TiraComEstado inicial={uglMediaItems.length - 1} ariaLabel="Miniaturas — fim" />
    </UglDocStage>
  ),
};

/**
 * A tira nos dois temas: não muda.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UglDocStage key={tema} label={tema === 'light' ? 'Tema claro' : 'Tema escuro'} theme={tema} surface="immersive" width={400}>
          <TiraComEstado theme={tema} inicial={5} ariaLabel={`Miniaturas — ${tema === 'light' ? 'claro' : 'escuro'}`} />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Escolher por clique e por setas; Home e End vão às pontas.
 */
export const SelecaoInterativa: Story = {
  name: 'Seleção por clique e por setas',
  args: { onSelect: fn() },
  render: (args) => (
    <UglDocStage surface="immersive" width={400}>
      <TiraComEstado onSelect={args.onSelect} />
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const nome = (posicao: number) => uglMediaLabel(uglMediaItems[posicao]);
    const opcao = (posicao: number) => tela.getByRole('option', { name: nome(posicao) });

    await expect(opcao(0)).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(opcao(3));
    await expect(args.onSelect).toHaveBeenLastCalledWith(3);
    await expect(opcao(3)).toHaveAttribute('aria-selected', 'true');
    await expect(opcao(0)).toHaveAttribute('aria-selected', 'false');
    await expect(opcao(3)).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    await expect(args.onSelect).toHaveBeenLastCalledWith(4);
    await expect(opcao(4)).toHaveAttribute('aria-selected', 'true');
    await expect(opcao(4)).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
    await expect(opcao(2)).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{End}');
    await expect(opcao(uglMediaItems.length - 1)).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{Home}');
    await expect(opcao(0)).toHaveAttribute('aria-selected', 'true');
  },
};
