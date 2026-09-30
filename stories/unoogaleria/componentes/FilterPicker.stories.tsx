import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { FilterPicker } from '../../../src/unoogaleria/components/FilterPicker';
import type { UglFilterPickerProps } from '../../../src/unoogaleria/components/FilterPicker';
import { Slider } from '../../../src/unoogaleria/components/Slider';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import {
  uglDefaultEdit,
  uglEditToFilter,
  uglFilters,
} from '../../../src/unoogaleria/media';
import type { UglEditState, UglFilterId } from '../../../src/unoogaleria/media';
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
import { uglPhotos } from '../fixtures';

const BAR = '#716C98';

/** Foto das amostras: a primeira da biblioteca de demonstração. */
const FOTO = uglPhotos[0];

/** Uma edição em curso, para mostrar os ajustes entrando nas amostras. */
const EDICAO_EM_CURSO: UglEditState = {
  ...uglDefaultEdit,
  adjustments: { ...uglDefaultEdit.adjustments, exposure: 20, contrast: 25, vignette: 40 },
};

/**
 * Seletor controlado pela estória.
 */
const SeletorControlado: React.FC<
  Partial<Omit<UglFilterPickerProps, 'value'>> & { inicial?: UglFilterId }
> = ({ inicial = 'original', onChange, ...props }) => {
  const [filtro, setFiltro] = useState<UglFilterId>(inicial);
  return (
    <FilterPicker
      src={FOTO.src}
      alt={FOTO.alt}
      {...props}
      value={filtro}
      onChange={(id) => {
        setFiltro(id);
        onChange?.(id);
      }}
    />
  );
};

/**
 * Pré-visualização grande, o seletor e a intensidade: o painel Filtros do editor.
 */
const PainelDeFiltros: React.FC = () => {
  const [edicao, setEdicao] = useState<UglEditState>({ ...uglDefaultEdit, filter: 'quente' });
  return (
    <div
      data-ugl-immersive=""
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        paddingTop: 'calc(var(--ugl-safe-area-top) + 16px)',
        paddingBottom: 'calc(var(--ugl-safe-area-bottom) + 16px)',
        background: 'var(--ugl-color-immersive-surface)',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ flex: 1, minHeight: 0, display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
        <img
          src={FOTO.src}
          alt={FOTO.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            filter: uglEditToFilter(edicao),
          }}
        />
      </div>
      <FilterPicker
        src={FOTO.src}
        alt={FOTO.alt}
        value={edicao.filter}
        intensity={edicao.filterIntensity}
        edit={edicao}
        onChange={(filter) => setEdicao((atual) => ({ ...atual, filter }))}
      />
      <div style={{ padding: '0 16px', minHeight: 66 }}>
        {edicao.filter !== 'original' && (
          <Slider
            variant="immersive"
            label="Intensidade"
            showValue
            value={edicao.filterIntensity}
            onChange={(filterIntensity) => setEdicao((atual) => ({ ...atual, filterIntensity }))}
          />
        )}
      </div>
    </div>
  );
};

/**
 * Página de documentação rica do componente FilterPicker.
 */
const FilterPickerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Editor"
      title="FilterPicker"
      description="Tira horizontal dos oito filtros predefinidos do editor, cada um numa amostra quadrada da própria foto com o filtro já aplicado. É um grupo de rádios: um toque ou uma seta escolhe, e a amostra escolhida é centralizada na tira."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Escolher um filtro vendo o resultado, não um nome."
    />
    <UglDocGrid>
      <UglDocCard icon="🖼️" title="A própria foto como amostra">
        Cada amostra de 64px é a foto em edição com o filtro aplicado por{' '}
        <code>uglFilterToCss</code> — o que se vê é o que se aplica.
      </UglDocCard>
      <UglDocCard icon="🎛️" title="Ajustes nas amostras">
        Com <code>edit</code>, os ajustes finos, a rotação, o espelho, o endireitamento e a vinheta
        entram em todas as amostras.
      </UglDocCard>
      <UglDocCard icon="🔘" title="Grupo de rádios">
        <code>role=&quot;radiogroup&quot;</code> com <code>role=&quot;radio&quot;</code> e foco
        móvel: um só item na ordem de Tab, setas que movem e escolhem, Home e End.
      </UglDocCard>
      <UglDocCard icon="🎯" title="Centraliza o escolhido">
        A tira rola sozinha para centralizar a amostra escolhida, sem rolar a página e sem
        animação em movimento reduzido.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UglDocSpecs
      component="FilterPicker"
      layout="Tira horizontal · amostras de 64px"
      specs={[
        { label: 'Amostra', value: '64 × 64px · --ugl-radius-s' },
        { label: 'Espaço entre amostras', value: '--ugl-spacing-m (12px)' },
        { label: 'Rótulo', value: 'caption (12/18) · caption-strong no escolhido' },
        { label: 'Escolhida', value: 'anel duplo: surface 2px + immersive-accent 2px' },
        { label: 'Recuo lateral', value: '--ugl-gutter (16px)' },
        { label: 'Rolagem', value: 'scrollbar-width: thin' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Anel duplo na amostra escolhida',
          detail:
            'a escolhida ganha 2px da superfície imersiva e, por fora, 2px de immersive-accent; o rótulo sobe para o branco em peso 600. São três pistas — forma, peso e cor —, e não só a cor. O acento sobre a superfície imersiva mede 8,27:1.',
        },
        {
          subject: 'Foco distinto da escolha',
          detail:
            'o foco por teclado é o contorno de 2px em immersive-accent em volta da opção inteira (amostra e rótulo); a escolha é o anel da amostra. Com o foco móvel, os dois coincidem na maior parte do tempo, mas continuam distinguíveis.',
        },
        {
          subject: 'Amostras decorativas; o alt descreve o grupo',
          detail:
            'as imagens das amostras têm alt vazio: o nome de cada rádio é o do filtro, e repetir a descrição da foto oito vezes só atrasaria a leitura. O alt vira a descrição do grupo (“Amostras de: …”, por aria-describedby).',
        },
        {
          subject: 'Intensidade só na amostra escolhida',
          detail:
            'as outras amostras mostram o filtro em intensidade total, para que a comparação entre filtros seja justa.',
        },
        {
          subject: 'Vinheta sobre a superfície imersiva',
          detail:
            'a vinheta é um gradiente radial até --ugl-color-immersive-surface (o mesmo roxo profundo do fundo do editor), em vez de um preto que o módulo não publica.',
        },
        {
          subject: 'Rolagem só da tira',
          detail:
            'a centralização calcula o scrollLeft da tira em vez de usar scrollIntoView, que rolaria também a página e a tela do aparelho.',
        },
        {
          subject: 'Medida local',
          detail: '--ugl-filter-picker-swatch (64px) não tem token equivalente e fica declarada no topo do bloco.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Tira, opção, amostra, rótulo e anel de escolha."
    />
    <UglDocStage label="Tira de filtros" surface="immersive" align="flex-start" padding={16}>
      <div style={{ width: 360 }}>
        <SeletorControlado inicial="vivido" />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Tira', role: 'Grupo de rádios rolável na horizontal, com recuo lateral.', token: '--ugl-gutter · --ugl-spacing-m' },
            { name: 'Opção', role: 'Botão com papel de rádio: amostra e rótulo.', token: '--ugl-radius-s' },
            { name: 'Amostra', role: 'A foto em 64px com o filtro e os ajustes da edição.', token: '--ugl-filter-picker-swatch' },
            { name: 'Rótulo', role: 'Nome do filtro; branco e em 600 quando escolhido.', token: '--ugl-font-caption-* · --ugl-color-immersive-text-secondary' },
            { name: 'Anel de escolha', role: 'Anel duplo em volta da amostra escolhida.', token: '--ugl-color-immersive-accent' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os oito filtros, a intensidade e os ajustes nas amostras."
    />
    <UglDocStage label="Sem edição (filtro Original escolhido)" surface="immersive" align="flex-start" padding={16}>
      <div style={{ width: 360 }}>
        <SeletorControlado />
      </div>
    </UglDocStage>
    <UglDocStage label="Intensidade de 40 na amostra escolhida" surface="immersive" align="flex-start" padding={16}>
      <div style={{ width: 360 }}>
        <SeletorControlado inicial="mono" intensity={40} />
      </div>
    </UglDocStage>
    <UglDocStage
      label="Com a edição em curso: exposição, contraste e vinheta"
      surface="immersive"
      align="flex-start"
      padding={16}
    >
      <div style={{ width: 360 }}>
        <SeletorControlado inicial="nostalgia" edit={EDICAO_EM_CURSO} />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando e como usar." />
    <UglDocPractices
      dos={[
        'Usar a mesma foto que está sendo editada como src.',
        'Passar edit para que as amostras mostrem o resultado com os ajustes.',
        'Mostrar o deslizador de intensidade só quando o filtro não é o Original.',
        'Manter o seletor sobre a superfície imersiva do editor.',
      ]}
      donts={[
        'Usar uma imagem genérica nas amostras: a escolha deixa de mostrar o resultado.',
        'Aplicar a intensidade às amostras que não estão escolhidas.',
        'Pôr o seletor sobre a superfície clara: as cores são as invariantes do editor.',
        'Acrescentar filtros com cor literal: filtros são funções de filtro CSS.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O seletor usa os tokens invariantes da superfície imersiva: é o mesmo nos dois temas."
    />
    <UglDocThemeSwitcher surface="immersive" padding={16}>
      {(tema) => (
        <div style={{ width: 360 }}>
          <SeletorControlado theme={tema} inicial="frio" />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do FilterPicker. Os demais atributos vão para o grupo."
    />
    <UglDocPropsTable
      title="FilterPicker"
      rows={[
        { name: 'src', type: 'string', description: 'Imagem das amostras. Obrigatório.' },
        { name: 'alt', type: 'string', description: 'Descrição da foto; vira a descrição do grupo. Obrigatório.' },
        { name: 'value', type: 'UglFilterId', description: 'Filtro escolhido. Obrigatório.' },
        { name: 'onChange', type: '(id: UglFilterId) => void', description: 'Escolha por toque ou pelas setas. Obrigatório.' },
        { name: 'intensity', type: 'number', default: '100', description: 'Intensidade da amostra escolhida (0 a 100).' },
        { name: 'edit', type: 'UglEditState', description: 'Edição em curso, aplicada a todas as amostras.' },
        { name: 'ariaLabel', type: 'string', default: "'Filtros'", description: 'Nome acessível do grupo.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. As cores do componente são invariantes.' },
      ]}
    />
    <UglDocPropsTable
      title="UglFilterId e uglFilters"
      rows={uglFilters.map((filtro) => ({
        name: `'${filtro.id}'`,
        type: filtro.steps.length
          ? filtro.steps.map(([nome, valor]) => `${nome}(${valor})`).join(' ')
          : 'none',
        description: `Rótulo “${filtro.label}”.`,
      }))}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof FilterPicker> = {
  title: 'Unoogaleria/Componentes/FilterPicker',
  component: FilterPicker,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text', description: 'Imagem das amostras.' },
    alt: { control: 'text', description: 'Descrição da foto.' },
    value: {
      control: 'select',
      options: uglFilters.map((filtro) => filtro.id),
      description: 'Filtro escolhido.',
    },
    intensity: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: 'Intensidade.' },
    edit: { control: 'object', description: 'Edição em curso.' },
    ariaLabel: { control: 'text', description: 'Nome acessível do grupo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onChange: { action: 'onChange' },
  },
  args: {
    src: FOTO.src,
    alt: FOTO.alt,
    value: 'vivido',
    intensity: 100,
    edit: uglDefaultEdit,
    ariaLabel: 'Filtros',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof FilterPicker>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <FilterPickerDocumentationPage />,
};

/**
 * Playground com todas as propriedades do FilterPicker expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do FilterPicker',
  render: (args) => (
    <UglDocStage theme={args.theme} surface="immersive" align="flex-start" padding={16}>
      <div style={{ width: 360 }}>
        <FilterPicker {...args} />
      </div>
    </UglDocStage>
  ),
};

/**
 * O painel Filtros do editor: pré-visualização, seletor e intensidade, no aparelho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: painel de filtros',
  parameters: { layout: 'centered' },
  render: () => (
    <PhoneFrame scale={0.75}>
      <PainelDeFiltros />
    </PhoneFrame>
  ),
};

/**
 * Cada filtro escolhido, um por linha.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UglDocStage surface="immersive" direction="column" align="flex-start" padding={16}>
      {uglFilters.slice(1, 4).map((filtro) => (
        <div key={filtro.id} style={{ width: 360 }}>
          <SeletorControlado inicial={filtro.id} ariaLabel={`Filtros, ${filtro.label} escolhido`} />
        </div>
      ))}
    </UglDocStage>
  ),
};

/**
 * Intensidade parcial e ajustes da edição nas amostras.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage surface="immersive" direction="column" align="flex-start" padding={16}>
      <div style={{ width: 360 }}>
        <SeletorControlado inicial="dramatico" intensity={30} ariaLabel="Intensidade de 30" />
      </div>
      <div style={{ width: 360 }}>
        <SeletorControlado inicial="prata" edit={EDICAO_EM_CURSO} ariaLabel="Com a edição em curso" />
      </div>
    </UglDocStage>
  ),
};

/**
 * O seletor dentro de contêineres de tema claro e escuro: é invariante.
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
          surface="immersive"
          padding={16}
        >
          <div style={{ width: 340 }}>
            <SeletorControlado inicial="quente" ariaLabel={`Filtros no tema ${tema === 'light' ? 'claro' : 'escuro'}`} />
          </div>
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Setas movem e escolhem; o foco acompanha; Home e End vão às pontas.
 */
export const Teclado: Story = {
  args: { onChange: fn() },
  render: (args) => (
    <UglDocStage surface="immersive" align="flex-start" padding={16}>
      <div style={{ width: 360 }}>
        <SeletorControlado onChange={args.onChange} />
      </div>
    </UglDocStage>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const [original, segundo] = uglFilters;
    const ultimo = uglFilters[uglFilters.length - 1];
    const opcao = (rotulo: string) => tela.getByRole('radio', { name: rotulo });

    await expect(tela.getByRole('radiogroup', { name: 'Filtros' })).toBeInTheDocument();
    await expect(opcao(original.label)).toHaveAttribute('aria-checked', 'true');
    // Foco móvel: só a opção escolhida está na ordem de Tab.
    await expect(opcao(segundo.label)).toHaveAttribute('tabindex', '-1');

    opcao(original.label).focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(args.onChange).toHaveBeenLastCalledWith(segundo.id);
    await expect(opcao(segundo.label)).toHaveAttribute('aria-checked', 'true');
    await expect(opcao(segundo.label)).toHaveFocus();

    await userEvent.keyboard('{End}');
    await expect(args.onChange).toHaveBeenLastCalledWith(ultimo.id);

    // A seta volta ao começo depois do último.
    await userEvent.keyboard('{ArrowRight}');
    await expect(args.onChange).toHaveBeenLastCalledWith(original.id);
    await expect(opcao(original.label)).toHaveFocus();

    await userEvent.click(opcao(ultimo.label));
    await expect(opcao(ultimo.label)).toHaveAttribute('aria-checked', 'true');
  },
};
