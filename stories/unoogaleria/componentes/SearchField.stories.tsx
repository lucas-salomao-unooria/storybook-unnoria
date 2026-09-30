import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SearchField } from '../../../src/unoogaleria/components/SearchField';
import { Chip } from '../../../src/unoogaleria/components/Chip';
import { ListGroup, ListRow } from '../../../src/unoogaleria/components/ListRow';
import { EmptyState } from '../../../src/unoogaleria/components/EmptyState';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocGrid,
  UglDocCard,
  UglDocSpecs,
  UglDocDecisions,
  UglDocAnatomy,
  UglDocStage,
  UglDocPractices,
  UglDocThemeSwitcher,
  UglDocPropsTable,
} from '../../../.storybook/components';
import { uglMediaItems, uglSearchCategories, uglSearchPlaces } from '../fixtures';

const BAR = '#716C98';

/** Busca de demonstração: casa lugar, legenda e palavras de conteúdo. */
const matches = (query: string) => {
  const term = query.trim().toLocaleLowerCase('pt-BR');
  if (!term) return [];
  return uglMediaItems.filter((item) =>
    [item.location, item.alt, item.description, ...(item.tags ?? [])]
      .filter(Boolean)
      .some((text) => String(text).toLocaleLowerCase('pt-BR').includes(term))
  );
};

/**
 * Busca controlada: o texto mora no estado da estória.
 */
const ControlledSearch: React.FC<{ initial?: string }> = ({ initial = uglSearchPlaces[0] }) => {
  const [query, setQuery] = useState(initial);

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <SearchField ariaLabel="Busca controlada" value={query} onChange={(next) => setQuery(next)} />
      <span className="ugl-text ugl-text--caption ugl-text--secondary">Estado: “{query}”</span>
    </div>
  );
};

/**
 * Tela de busca no aparelho: campo com "Cancelar", sugestões e resultados.
 */
const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const results = useMemo(() => matches(submitted || query), [query, submitted]);
  const hasQuery = query.trim().length > 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'var(--ugl-color-background-secondary)',
      }}
    >
      <div
        style={{
          padding: 'calc(var(--ugl-safe-area-top) + var(--ugl-spacing-xs)) var(--ugl-gutter) var(--ugl-spacing-m)',
          background: 'var(--ugl-color-background-primary)',
        }}
      >
        <SearchField
          value={query}
          onChange={(next) => {
            setQuery(next);
            setSubmitted('');
          }}
          onSubmit={setSubmitted}
          onCancel={() => {
            setQuery('');
            setSubmitted('');
          }}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin', paddingTop: 'var(--ugl-spacing-l)' }}>
        {!hasQuery ? (
          <div style={{ display: 'grid', gap: 'var(--ugl-spacing-xxl)' }}>
            <div style={{ padding: '0 var(--ugl-gutter)' }}>
              <h2 className="ugl-text ugl-text--title-lg" style={{ marginBottom: 12 }}>
                Categorias
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ugl-spacing-xs)' }}>
                {uglSearchCategories.slice(0, 6).map((category) => (
                  <Chip
                    key={category.id}
                    label={category.label}
                    icon={category.icon}
                    onClick={() => setQuery(category.query)}
                  />
                ))}
              </div>
            </div>
            <ListGroup title="Lugares">
              {uglSearchPlaces.map((place) => (
                <ListRow key={place} icon="location" title={place} onClick={() => setQuery(place)} />
              ))}
            </ListGroup>
          </div>
        ) : results.length > 0 ? (
          <ListGroup title={`${results.length} resultado${results.length === 1 ? '' : 's'}`}>
            {results.slice(0, 8).map((item) => (
              <ListRow
                key={item.id}
                icon={item.type === 'video' ? 'video' : 'photo'}
                title={item.alt}
                subtitle={item.location}
                onClick={() => undefined}
              />
            ))}
          </ListGroup>
        ) : (
          <EmptyState
            icon="imageSearch"
            title="Nenhum resultado"
            description={`Nada encontrado para “${query}”. Tente um lugar, uma pessoa ou uma categoria.`}
          />
        )}
      </div>
    </div>
  );
};

/**
 * Página de documentação rica do componente SearchField.
 */
const SearchFieldDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Controles"
      title="SearchField"
      description="Campo de busca da galeria: lupa, texto, disco de limpar e, opcionalmente, o botão de texto Cancelar. É um marco role=search; Enter confirma, Esc limpa e, com o campo vazio, cancela."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Um campo, controlado ou não, com as teclas que a busca pede."
    />
    <UglDocGrid>
      <UglDocCard icon="🔎" title="Topo da tela de busca">
        Com <code>onCancel</code>, o campo ganha o “Cancelar” à direita, que devolve a tela ao
        estado inicial — o mesmo que Esc faz com o campo vazio.
      </UglDocCard>
      <UglDocCard icon="⏎" title="Enter confirma">
        <code>onSubmit(value)</code> dispara no Enter (fora de composição de acentos), e o teclado
        virtual mostra a tecla “buscar” (<code>enterKeyHint</code>).
      </UglDocCard>
      <UglDocCard icon="🧹" title="Limpar de verdade">
        O disco de limpar esvazia o campo, devolve o foco e dispara <code>onChange({'""'})</code> e{' '}
        <code>onClear</code> — também no modo não controlado, em que o texto mora no DOM.
      </UglDocCard>
      <UglDocCard icon="✍️" title="Controlado só quando pedido">
        Sem <code>value</code>, o componente repassa <code>defaultValue</code> e nunca reconcilia o
        texto de volta (regra 4.5.1): preenchimento automático e gerenciadores de texto funcionam.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="SearchField"
      layout="Campo · 44px"
      specs={[
        { label: 'Altura', value: '44px (--ugl-touch-target)' },
        { label: 'Forma', value: '--ugl-radius-m' },
        { label: 'Preenchimento', value: '--ugl-color-fill-field' },
        { label: 'Lupa', value: 'search · 20px · --ugl-color-icon-secondary' },
        { label: 'Texto', value: 'body-lg · Open Sans 400 · 16/24px' },
        { label: 'Espaço reservado', value: '--ugl-color-text-placeholder' },
        { label: 'Limpar', value: 'alvo de 44px · disco de 20px em icon-secondary' },
        { label: 'Cancelar', value: 'Button tertiary md (44px)' },
        { label: 'Foco', value: 'contorno de 2px em --ugl-color-focus-ring na caixa' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Atributos nativos no <input>',
          detail:
            'a ref e os atributos nativos (name, disabled, inputMode, aria-*) vão para o <input>; className, style e theme vão para o invólucro role="search". Em campo, é o elemento que o consumidor precisa alcançar.',
        },
        {
          subject: 'onChange com o texto primeiro',
          detail:
            'a assinatura é onChange(value, event), e não o evento nativo: o botão de limpar e o Esc também chamam onChange, e o texto é o que quase todo consumidor quer.',
        },
        {
          subject: 'Limpar escreve no nó',
          detail:
            'o limpar usa o setter nativo de value e dispara um evento input: o React vê a mudança nos dois modos, e o campo não controlado não depende de estado para esvaziar.',
        },
        {
          subject: 'Esc em dois tempos',
          detail:
            'com texto, Esc limpa; vazio, chama onCancel. Nos dois casos o evento para de propagar — a folha ou o visualizador em volta não fecham junto.',
        },
        {
          subject: 'Enter sem <form>',
          detail:
            'o invólucro é um <div role="search">, e não um <form>: um formulário aninhado no do produto seria HTML inválido. O Enter é tratado no teclado, respeitando a composição de acentos (isComposing).',
        },
        {
          subject: 'Sem contorno em repouso',
          detail:
            'a caixa é só o preenchimento fill-field; quem identifica o controle é a lupa (icon-secondary, ≥ 3:1) e o espaço reservado. O foco ganha o contorno de 2px. Campo de formulário com rótulo é o TextField.',
        },
        {
          subject: 'Disco de limpar desenhado',
          detail:
            'o glifo close de 16px sobre um disco de 20px em icon-secondary (texto em background-primary), à maneira dos campos de busca de sistema; o botão nativo do navegador fica escondido.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UglDocAnatomy
      zones={[
        { name: 'Invólucro (role="search")', role: 'Marco de busca que reúne a caixa e o Cancelar.', token: '--ugl-spacing-3xs' },
        { name: 'Caixa', role: 'Preenchimento com contorno de foco.', token: '--ugl-color-fill-field · --ugl-radius-m' },
        { name: 'Lupa', role: 'Glifo decorativo.', token: '--ugl-color-icon-secondary' },
        { name: 'Entrada', role: 'type="search" com aria-label e enterKeyHint="search".', token: '--ugl-font-body-lg-*' },
        { name: 'Limpar', role: 'Botão de 44px com nome acessível, só com texto.', token: '--ugl-touch-target' },
        { name: 'Cancelar', role: 'Button tertiary, presente só com onCancel.', token: '--ugl-color-text-accent' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Vazio, preenchido, com Cancelar e desabilitado."
    />
    <UglDocStage label="Estados" direction="column" align="stretch" gap={16} width={390}>
      <SearchField ariaLabel="Busca vazia" />
      <SearchField ariaLabel="Busca preenchida" defaultValue={uglSearchPlaces[2]} />
      <SearchField ariaLabel="Busca com cancelar" defaultValue="praia" onCancel={() => undefined} />
      <SearchField ariaLabel="Busca sem limpar" defaultValue="praia" clearable={false} />
      <SearchField ariaLabel="Busca desabilitada" disabled placeholder="Busca indisponível" />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Passar value e onChange juntos, ou nenhum dos dois.',
        'Filtrar a lista em onChange e confirmar pesquisas pesadas em onSubmit.',
        'Usar onCancel no topo da tela de busca, para voltar ao estado inicial.',
        'Ajustar ariaLabel quando houver mais de uma busca na tela.',
      ]}
      donts={[
        'Passar value sem onChange: o campo fica travado.',
        'Usar o SearchField em formulário: para isso existe o TextField, com rótulo visível.',
        'Envolver o campo num <form> só para ganhar o Enter.',
        'Depender só do espaço reservado como nome do campo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Preenchimento, lupa, texto, limpar e foco acompanham data-ugl-theme."
    />
    <UglDocThemeSwitcher>
      {() => (
        <div style={{ width: 358 }}>
          <SearchField ariaLabel="Busca (tema)" defaultValue={uglSearchPlaces[0]} onCancel={() => undefined} />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UglDocPropsTable
      title="SearchField"
      rows={[
        { name: 'value', type: 'string', description: 'Texto (modo controlado). Só vai ao <input> quando definido.' },
        { name: 'defaultValue', type: 'string', description: 'Texto inicial (modo não controlado).' },
        { name: 'onChange', type: '(value: string, event) => void', description: 'A cada alteração, inclusive limpar.' },
        { name: 'onSubmit', type: '(value: string) => void', description: 'Enter confirma a busca.' },
        { name: 'onClear', type: '() => void', description: 'Depois que o limpar (ou Esc) esvazia o campo.' },
        { name: 'placeholder', type: 'string', default: "'Buscar fotos, lugares, pessoas'", description: 'Texto do campo vazio.' },
        { name: 'ariaLabel', type: 'string', default: "'Buscar na galeria'", description: 'Nome acessível do campo.' },
        { name: 'clearable', type: 'boolean', default: 'true', description: 'Exibe o limpar quando há texto.' },
        { name: 'clearLabel', type: 'string', default: "'Limpar busca'", description: 'Nome acessível do limpar.' },
        { name: 'autoFocus', type: 'boolean', default: 'false', description: 'Foca o campo ao montar.' },
        { name: 'onCancel', type: '() => void', description: 'Exibe o Cancelar; Esc com o campo vazio também o chama.' },
        { name: 'cancelLabel', type: 'string', default: "'Cancelar'", description: 'Rótulo do Cancelar.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className / style', type: 'string / CSSProperties', description: 'Classe e estilo do invólucro.' },
        { name: '...input', type: 'React.InputHTMLAttributes<HTMLInputElement>', description: 'Demais atributos nativos, repassados ao <input> (com a ref).' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SearchField> = {
  title: 'Unoogaleria/Componentes/SearchField',
  component: SearchField,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: 'text', description: 'Texto (modo controlado; vazio = não controlado).' },
    defaultValue: { control: 'text', description: 'Texto inicial (modo não controlado).' },
    placeholder: { control: 'text', description: 'Texto do campo vazio.' },
    ariaLabel: { control: 'text', description: 'Nome acessível do campo.' },
    clearable: { control: 'boolean', description: 'Exibe o limpar.' },
    clearLabel: { control: 'text', description: 'Nome acessível do limpar.' },
    autoFocus: { control: 'boolean', description: 'Foca ao montar.' },
    cancelLabel: { control: 'text', description: 'Rótulo do Cancelar.' },
    disabled: { control: 'boolean', description: 'Desabilita o campo.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    onChange: { action: 'onChange', description: 'A cada alteração.' },
    onSubmit: { action: 'onSubmit', description: 'Enter.' },
    onClear: { action: 'onClear', description: 'Depois de limpar.' },
    onCancel: { action: 'onCancel', description: 'Cancelar (exibe o botão).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    defaultValue: '',
    placeholder: 'Buscar fotos, lugares, pessoas',
    ariaLabel: 'Buscar na galeria',
    clearable: true,
    clearLabel: 'Limpar busca',
    autoFocus: false,
    cancelLabel: 'Cancelar',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof SearchField>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SearchFieldDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SearchField',
  render: (args) => (
    <UglDocStage theme={args.theme ?? 'light'} align="stretch" width={390}>
      <SearchField {...args} />
    </UglDocStage>
  ),
};

/**
 * A tela de busca no aparelho: categorias, lugares, resultados e o vazio.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: tela de busca',
  parameters: { layout: 'centered' },
  render: () => (
    <PhoneFrame scale={0.75} ariaLabel="Galeria — busca">
      <SearchScreen />
    </PhoneFrame>
  ),
};

/**
 * Com e sem Cancelar, com e sem limpar.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UglDocStage direction="column" align="stretch" gap={16} width={390}>
      <SearchField ariaLabel="Busca simples" defaultValue="cachoeira" />
      <SearchField ariaLabel="Busca com cancelar" defaultValue="cachoeira" onCancel={() => undefined} />
      <SearchField ariaLabel="Busca sem limpar" defaultValue="cachoeira" clearable={false} />
    </UglDocStage>
  ),
};

/**
 * Vazio, preenchido e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage direction="column" align="stretch" gap={16} width={390}>
      <SearchField ariaLabel="Busca vazia" />
      <SearchField ariaLabel="Busca preenchida" defaultValue={uglSearchPlaces[1]} />
      <SearchField ariaLabel="Busca desabilitada" disabled defaultValue={uglSearchPlaces[1]} />
    </UglDocStage>
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
        <UglDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} align="stretch" direction="column" gap={16} width={390}>
          <SearchField ariaLabel={`Busca vazia (${theme})`} />
          <SearchField ariaLabel={`Busca preenchida (${theme})`} defaultValue={uglSearchPlaces[0]} onCancel={() => undefined} />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Regressão da regra 4.5.1: o limpar esvazia o campo NÃO controlado (o texto
 * mora no DOM) e o controlado, devolvendo o foco e avisando `onChange`/`onClear`.
 */
export const Limpar: Story = {
  name: 'Interação: limpar (controlado e não controlado)',
  args: { onChange: fn(), onClear: fn() },
  render: (args) => (
    <UglDocStage direction="column" align="stretch" gap={16} width={390}>
      <SearchField
        ariaLabel="Busca livre"
        defaultValue={uglSearchPlaces[2]}
        onChange={args.onChange}
        onClear={args.onClear}
      />
      <ControlledSearch />
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const free = canvas.getByRole('searchbox', { name: 'Busca livre' }) as HTMLInputElement;
    await expect(free.value).toBe(uglSearchPlaces[2]);

    const [clearFree] = canvas.getAllByRole('button', { name: 'Limpar busca' });
    await userEvent.click(clearFree);
    await expect(free.value).toBe('');
    await expect(free).toHaveFocus();
    await expect(args.onChange).toHaveBeenLastCalledWith('', expect.anything());
    await expect(args.onClear).toHaveBeenCalledTimes(1);
    await expect(canvas.getAllByRole('button', { name: 'Limpar busca' })).toHaveLength(1);

    await userEvent.type(free, 'serra');
    await expect(free.value).toBe('serra');
    await expect(canvas.getAllByRole('button', { name: 'Limpar busca' })).toHaveLength(2);

    const controlled = canvas.getByRole('searchbox', { name: 'Busca controlada' }) as HTMLInputElement;
    await expect(controlled.value).toBe(uglSearchPlaces[0]);
    const clearButtons = canvas.getAllByRole('button', { name: 'Limpar busca' });
    await userEvent.click(clearButtons[clearButtons.length - 1]);
    await expect(controlled.value).toBe('');
    await expect(canvas.getByText('Estado: “”')).toBeInTheDocument();
  },
};

/**
 * Teclado: Enter confirma com o texto atual; Esc limpa e, com o campo vazio,
 * cancela.
 */
export const Teclado: Story = {
  name: 'Interação: Enter e Esc',
  args: { onSubmit: fn(), onCancel: fn(), onClear: fn() },
  render: (args) => (
    <UglDocStage align="stretch" width={390}>
      <SearchField onSubmit={args.onSubmit} onCancel={args.onCancel} onClear={args.onClear} />
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('searchbox', { name: 'Buscar na galeria' }) as HTMLInputElement;
    await expect(canvas.getByRole('search')).toBeInTheDocument();

    await userEvent.type(input, `${uglSearchCategories[1].query}{Enter}`);
    await expect(args.onSubmit).toHaveBeenCalledWith(uglSearchCategories[1].query);

    await userEvent.keyboard('{Escape}');
    await expect(input.value).toBe('');
    await expect(args.onClear).toHaveBeenCalledTimes(1);
    await expect(args.onCancel).not.toHaveBeenCalled();

    await userEvent.keyboard('{Escape}');
    await expect(args.onCancel).toHaveBeenCalledTimes(1);

    await userEvent.click(canvas.getByRole('button', { name: 'Cancelar' }));
    await expect(args.onCancel).toHaveBeenCalledTimes(2);
  },
};
