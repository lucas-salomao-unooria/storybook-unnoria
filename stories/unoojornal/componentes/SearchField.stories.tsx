import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SearchField } from '../../../src/unoojornal/components/SearchField';
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

/**
 * Campo controlado pela estória: o texto mora no estado, como num produto que
 * filtra a lista enquanto a pessoa digita.
 */
const CampoControlado: React.FC<{ theme?: 'light' | 'dark'; inicial?: string }> = ({ theme, inicial = '' }) => {
  const [texto, setTexto] = useState(inicial);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <SearchField theme={theme} value={texto} onValueChange={setTexto} />
      <p style={{ margin: 0, fontFamily: 'var(--ujn-font-sans)', fontSize: 12, color: 'var(--ujn-color-text-secondary)' }}>
        Texto no estado: “{texto}”
      </p>
    </div>
  );
};

/**
 * Campo não controlado dentro de um pai que se renderiza de novo.
 */
function CampoNaoControladoComRerender() {
  const [contagem, setContagem] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--ujn-color-background-page)', padding: 16, maxWidth: 480 }}>
      <SearchField />
      <button type="button" onClick={() => setContagem((atual) => atual + 1)}>
        Re-renderizar
      </button>
      <span aria-live="polite" style={{ fontSize: 12 }}>
        Renderizações: {contagem}
      </span>
    </div>
  );
}

/**
 * Página de documentação rica do componente SearchField.
 */
const SearchFieldDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Cabeçalho e navegação"
      title="SearchField"
      description="Campo de busca do jornal: um formulário de busca com lupa, texto e botão de limpar. Enter confirma, Esc limpa. Só é controlado quando recebe value — sem ele, o texto mora no DOM."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="Buscar matérias, autoria e seções." />
    <UjnDocGrid>
      <UjnDocCard icon="🔎" title="Marco de busca">
        Um <code>&lt;form role=&quot;search&quot;&gt;</code>: o leitor de tela o encontra pela lista de
        marcos da página. A lupa é o botão de confirmar.
      </UjnDocCard>
      <UjnDocCard icon="⌨️" title="Enter confirma, Esc limpa">
        Enter e a lupa chamam <code>onSubmit(valor)</code>. Esc esvazia o campo e mantém o foco nele.
      </UjnDocCard>
      <UjnDocCard icon="🧹" title="Limpar sem perder o texto do usuário">
        O botão de limpar aparece com texto no campo. Em modo não controlado ele escreve direto no nó do
        DOM — não há estado que comande o campo.
      </UjnDocCard>
      <UjnDocCard icon="🏷️" title="Campo com nome">
        O <code>&lt;label&gt;</code> é ligado por <code>useId</code> e fica oculto à vista (o campo tem lupa
        e texto de apoio), mas lido pelo leitor de tela.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Campo de busca do cabeçalho de `homepage-default` (`3:7`), com a regra 4.5.1 do repositório."
    />
    <UjnDocSpecs
      component="SearchField"
      layout="Linha (lupa 44px · texto · limpar 44px) · 44px de altura · contorno de 1px"
      specs={[
        { label: 'Superfície', value: '--ujn-color-fill-field' },
        { label: 'Contorno', value: '1px · --ujn-color-border-control (≥ 3:1)' },
        { label: 'Raio', value: '--ujn-radius-s (4px)' },
        { label: 'Foco', value: 'Anel de 2px · --ujn-color-focus-ring' },
        { label: 'Texto', value: 'Body/Medium (16/24, 400) em --ujn-color-text-primary' },
        { label: 'Espaço reservado', value: '--ujn-color-text-muted' },
        { label: 'Alvos', value: 'Lupa e limpar de 44px (--ujn-touch-target)' },
        { label: 'Fronteira', value: "'use client' (estado, refs e API de DOM)" },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Controlado só com value',
          detail:
            'sem value, o <input> recebe defaultValue (AGENTS.md 4.5.1): preenchimento automático e extensões escrevem no DOM sem passar pelo React, e um campo sempre controlado reconciliaria o texto de volta para vazio. O botão de limpar escreve no nó com o setter nativo e dispara input.',
        },
        {
          subject: 'Lupa como botão de confirmar',
          detail:
            'a lupa do arquivo de referência é decorativa; aqui é um botão type="submit" de 44px, que dá ao toque um jeito de confirmar sem o teclado.',
        },
        {
          subject: 'Rótulo oculto à vista',
          detail:
            'o desenho não tem rótulo visível; o <label> existe e é lido pelo leitor de tela, ligado por useId. O texto vem de label ("Buscar") e nomeia também o botão da lupa.',
        },
        {
          subject: 'Contorno de 1px em border-control',
          detail:
            'o preenchimento do campo sobre a página mede menos de 3:1; o contorno em --ujn-color-border-control garante o limite do componente (WCAG 1.4.11).',
        },
        {
          subject: 'Esc limpa',
          detail:
            'com texto no campo, Esc esvazia e para a propagação, para não fechar uma folha ou menu que contenha o campo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Lupa, texto e limpar." />
    <UjnDocStage surface="page" align="stretch" direction="column" padding={16}>
      <SearchField defaultValue="feira de ciências" />
      <UjnDocAnatomy
        zones={[
          { name: 'Lupa (confirmar)', role: 'Botão type="submit" com o nome do campo.', token: 'Icon search sm' },
          { name: 'Campo', role: '<input type="search"> ligado ao <label> por useId.', token: 'Body/Medium' },
          { name: 'Limpar', role: 'Aparece com texto; esvazia o campo e devolve o foco.', token: '--ujn-color-icon-secondary' },
          { name: 'Contorno e foco', role: 'Contorno de 1px; anel de 2px no foco.', token: '--ujn-color-border-control' },
        ]}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real: vazio, preenchido, desabilitado e controlado."
    />
    <UjnDocStage label="Vazio" surface="page" align="stretch" direction="column" padding={16}>
      <SearchField />
    </UjnDocStage>
    <UjnDocStage label="Preenchido (com botão de limpar)" surface="page" align="stretch" direction="column" padding={16}>
      <SearchField defaultValue="feira de ciências" />
    </UjnDocStage>
    <UjnDocStage label="Sem botão de limpar (clearable=false)" surface="page" align="stretch" direction="column" padding={16}>
      <SearchField defaultValue="feira de ciências" clearable={false} />
    </UjnDocStage>
    <UjnDocStage label="Desabilitado" surface="page" align="stretch" direction="column" padding={16}>
      <SearchField defaultValue="feira de ciências" disabled />
    </UjnDocStage>
    <UjnDocStage label="Controlado (value)" surface="page" align="stretch" direction="column" padding={16}>
      <CampoControlado inicial="olimpíada" />
    </UjnDocStage>
    <UjnDocStage label="Largura compacta (390px)" surface="page" align="flex-start" padding={16}>
      <div style={{ width: 390, maxWidth: '100%' }}>
        <SearchField placeholder="Buscar no jornal" />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Busca que não perde o que a pessoa digitou." />
    <UjnDocPractices
      dos={[
        'Deixar o campo não controlado quando o produto só precisa do texto no envio (onSubmit).',
        'Passar value + onValueChange apenas quando o produto filtra enquanto se digita.',
        'Dar ao placeholder um exemplo do que se busca, sem substituir o rótulo.',
        'Normalizar o texto (acentos, caixa) na busca, não no campo.',
      ]}
      donts={[
        'Passar value sem onValueChange: o campo congela e a pessoa não consegue digitar.',
        'Tornar o campo sempre controlado “por segurança”: a senha ou o texto preenchido pelo navegador seria apagado.',
        'Remover o botão de limpar em telas de toque: apagar letra a letra é o pior caso.',
        'Usar o placeholder como único nome do campo.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Campo, contorno e foco acompanham o tema." />
    <UjnDocThemeSwitcher surface="page" padding={16}>
      {(tema) => (
        <div style={{ width: '100%', maxWidth: 480 }}>
          <SearchField theme={tema} defaultValue="feira de ciências" />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do SearchField. Os demais atributos nativos vão ao <input>, que recebe a ref."
    />
    <UjnDocPropsTable
      title="SearchField"
      rows={[
        { name: 'value', type: 'string', description: 'Texto (modo controlado). Só vai ao <input> quando definido.' },
        { name: 'defaultValue', type: 'string', description: 'Texto inicial (modo não controlado).' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Chamado a cada alteração, inclusive ao limpar.' },
        { name: 'onSubmit', type: '(value: string) => void', description: 'Chamado com o texto ao confirmar (Enter ou lupa).' },
        { name: 'placeholder', type: 'string', default: "'Buscar no jornal'", description: 'Texto do campo vazio.' },
        { name: 'label', type: 'string', default: "'Buscar'", description: 'Nome acessível do campo e da lupa (oculto à vista).' },
        { name: 'clearable', type: 'boolean', default: 'true', description: 'Mostra o botão de limpar quando há texto.' },
        { name: 'clearLabel', type: 'string', default: "'Limpar busca'", description: 'Nome acessível do botão de limpar.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional (no <form>).' },
        { name: 'style', type: 'CSSProperties', description: 'Estilo em linha (no <form>).' },
        { name: 'disabled', type: 'boolean', description: 'Desabilita o campo e os botões.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SearchField> = {
  title: 'Unoojornal/Componentes/SearchField',
  component: SearchField,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: false, description: 'Texto controlado (a estória usa o modo não controlado).' },
    defaultValue: { control: 'text', description: 'Texto inicial.' },
    onValueChange: { action: 'onValueChange', description: 'Chamado a cada alteração.' },
    onSubmit: { action: 'onSubmit', description: 'Chamado ao confirmar a busca.' },
    placeholder: { control: 'text', description: 'Texto do campo vazio.' },
    label: { control: 'text', description: 'Nome acessível do campo.' },
    clearable: { control: 'boolean', description: 'Botão de limpar.' },
    clearLabel: { control: 'text', description: 'Nome acessível do botão de limpar.' },
    disabled: { control: 'boolean', description: 'Campo desabilitado.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
    style: { control: false, description: 'Estilo em linha.' },
  },
  args: {
    defaultValue: '',
    placeholder: 'Buscar no jornal',
    label: 'Buscar',
    clearable: true,
    clearLabel: 'Limpar busca',
    disabled: false,
    theme: 'light',
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
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SearchField',
  render: (args) => (
    <div data-ujn-theme={args.theme} style={{ background: 'var(--ujn-color-background-page)', padding: 16, maxWidth: 480 }}>
      <SearchField {...args} />
    </div>
  ),
};

/**
 * Composição fiel ao campo de busca do cabeçalho do jornal.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: busca do cabeçalho',
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)', padding: 16, maxWidth: 480 }}>
      <SearchField />
    </div>
  ),
};

/**
 * O campo preenche a largura do contêiner: larga, média e compacta.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--ujn-color-background-page)', padding: 16 }}>
      {[480, 320, 240].map((largura) => (
        <div key={largura} style={{ width: largura, maxWidth: '100%' }}>
          <SearchField defaultValue={`${largura}px`} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Vazio, preenchido, sem limpar e controlado.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--ujn-color-background-page)', padding: 16, maxWidth: 480 }}>
      <SearchField />
      <SearchField defaultValue="feira de ciências" />
      <SearchField defaultValue="feira de ciências" clearable={false} />
      <CampoControlado inicial="olimpíada" />
    </div>
  ),
};

/**
 * Vazio, preenchido, desabilitado e com foco forçado pelo teclado.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--ujn-color-background-page)', padding: 16, maxWidth: 480 }}>
      <SearchField />
      <SearchField defaultValue="feira de ciências" />
      <SearchField defaultValue="feira de ciências" disabled />
    </div>
  ),
};

/**
 * O campo nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} data-ujn-theme={tema} style={{ background: 'var(--ujn-color-background-page)', padding: 16, maxWidth: 480 }}>
          <SearchField theme={tema} defaultValue="feira de ciências" />
        </div>
      ))}
    </div>
  ),
};

const aoMudar = fn();
const aoEnviar = fn();

/**
 * Modo não controlado: digitar, limpar (escrevendo no nó do DOM) e Enter envia.
 */
export const DigitarLimparEnviar: Story = {
  name: 'Digitar, limpar e Enter envia',
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)', padding: 16, maxWidth: 480 }}>
      <SearchField onValueChange={aoMudar} onSubmit={aoEnviar} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    aoMudar.mockClear();
    aoEnviar.mockClear();
    const tela = within(canvasElement);
    const busca = tela.getByRole('search');
    const campo = within(busca).getByRole('searchbox', { name: 'Buscar' });

    // O rótulo nomeia o campo (htmlFor ligado por useId).
    await expect(campo).toHaveAccessibleName('Buscar');
    await expect(within(busca).queryByRole('button', { name: 'Limpar busca' })).not.toBeInTheDocument();

    await userEvent.type(campo, 'ciência');
    await expect(campo).toHaveValue('ciência');
    await expect(aoMudar).toHaveBeenLastCalledWith('ciência');

    // Modo não controlado: limpar escreve no nó do DOM, esvazia e devolve o foco.
    const limpar = within(busca).getByRole('button', { name: 'Limpar busca' });
    await userEvent.click(limpar);
    await expect(campo).toHaveValue('');
    await expect(campo).toHaveFocus();
    await expect(aoMudar).toHaveBeenLastCalledWith('');
    await expect(within(busca).queryByRole('button', { name: 'Limpar busca' })).not.toBeInTheDocument();

    // O user-event guarda o próprio valor de interface e não enxerga a escrita
    // direta no nó (que é o ponto do componente): `clear` o realinha.
    await userEvent.clear(campo);

    // Enter confirma com o texto atual.
    await userEvent.type(campo, 'agenda{Enter}');
    await expect(aoEnviar).toHaveBeenLastCalledWith('agenda');
    await expect(campo).toHaveValue('agenda');

    // Esc limpa.
    await userEvent.keyboard('{Escape}');
    await expect(campo).toHaveValue('');

    // A lupa também confirma.
    await userEvent.clear(campo);
    await userEvent.type(campo, 'galeria');
    await userEvent.click(within(busca).getByRole('button', { name: 'Buscar' }));
    await expect(aoEnviar).toHaveBeenLastCalledWith('galeria');
  },
};

/**
 * Modo controlado: o texto mora no estado, e limpar passa por onValueChange.
 */
export const ModoControlado: Story = {
  name: 'Modo controlado (value)',
  render: () => (
    <div style={{ background: 'var(--ujn-color-background-page)', padding: 16, maxWidth: 480 }}>
      <CampoControlado inicial="olimpíada" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('searchbox', { name: 'Buscar' });
    await expect(campo).toHaveValue('olimpíada');

    await userEvent.type(campo, ' 2026');
    await expect(campo).toHaveValue('olimpíada 2026');
    await expect(tela.getByText('Texto no estado: “olimpíada 2026”')).toBeVisible();

    await userEvent.click(tela.getByRole('button', { name: 'Limpar busca' }));
    await expect(campo).toHaveValue('');
    await expect(tela.getByText('Texto no estado: “”')).toBeVisible();
  },
};

/**
 * Regra 4.5.1: preenchimento que não passa pelo React sobrevive a uma nova
 * renderização, porque o campo não controlado deixa o texto no DOM.
 */
export const PreenchimentoExternoSobrevive: Story = {
  name: 'Preenchimento externo sobrevive à re-renderização',
  render: () => <CampoNaoControladoComRerender />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('searchbox', { name: 'Buscar' }) as HTMLInputElement;

    // Escrita direta no nó, como faz o preenchimento automático do navegador.
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    setter?.call(campo, 'texto injetado');
    await expect(campo).toHaveValue('texto injetado');

    // Força uma nova renderização do componente.
    await userEvent.click(tela.getByRole('button', { name: 'Re-renderizar' }));
    await expect(campo).toHaveValue('texto injetado');
  },
};
