import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ListGroup, ListRow } from '../../../src/unoogaleria/components/ListRow';
import type { UglListGroupProps } from '../../../src/unoogaleria/components/ListRow';
import { SegmentedControl } from '../../../src/unoogaleria/components/SegmentedControl';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import type { UglIconName } from '../../../src/unoogaleria/components/Icon';
import type { UglMediaSubtype } from '../../../src/unoogaleria/media';
import { uglSubtypeLabels } from '../../../src/unoogaleria/media';
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
import { uglHiddenItems, uglMediaItems, uglTrashItems, uglVideos } from '../fixtures';

const BAR = '#716C98';

/** Glifo de cada subtipo em "Tipos de mídia". */
const SUBTYPE_ICONS: Record<UglMediaSubtype, UglIconName> = {
  selfie: 'selfie',
  screenshot: 'screenshot',
  panorama: 'panorama',
  live: 'livePhoto',
  burst: 'burst',
  hdr: 'hdr',
};

const countSubtype = (subtype: UglMediaSubtype) =>
  uglMediaItems.filter((item) => item.subtypes?.includes(subtype)).length;

/** Espiões da estória de interação. */
const openVideosSpy = fn();
const openImportedSpy = fn();

/**
 * "Tipos de mídia": uma linha por tipo, com a contagem das fixtures.
 */
const MediaTypesGroup: React.FC<Partial<UglListGroupProps>> = (props) => (
  <ListGroup title="Tipos de mídia" {...props}>
    <ListRow icon="video" title="Vídeos" detail={uglVideos.length} onClick={() => undefined} />
    {(Object.keys(SUBTYPE_ICONS) as UglMediaSubtype[])
      .filter((subtype) => countSubtype(subtype) > 0)
      .map((subtype) => (
        <ListRow
          key={subtype}
          icon={SUBTYPE_ICONS[subtype]}
          title={uglSubtypeLabels[subtype]}
          detail={countSubtype(subtype)}
          onClick={() => undefined}
        />
      ))}
  </ListGroup>
);

/**
 * "Utilitários": importados, ocultos e excluídos, os dois últimos protegidos.
 */
const UtilitiesGroup: React.FC<Partial<UglListGroupProps>> = (props) => (
  <ListGroup
    title="Utilitários"
    footer="Ocultos e Excluídos recentemente pedem desbloqueio para abrir."
    {...props}
  >
    <ListRow icon="imported" title="Importados" detail={4} onClick={() => undefined} />
    <ListRow icon="hide" title="Ocultos" detail={uglHiddenItems.length} locked onClick={() => undefined} />
    <ListRow icon="delete" title="Excluídos recentemente" detail={uglTrashItems.length} locked onClick={() => undefined} />
  </ListGroup>
);

/**
 * A parte de baixo da aba Álbuns, no aparelho.
 */
const AlbumsScreen: React.FC = () => (
  <div
    style={{
      height: '100%',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      padding: 'calc(var(--ugl-safe-area-top) + var(--ugl-spacing-xs)) 0 calc(var(--ugl-safe-area-bottom) + var(--ugl-spacing-xl))',
      boxSizing: 'border-box',
      background: 'var(--ugl-color-background-secondary)',
      display: 'grid',
      alignContent: 'start',
      gap: 'var(--ugl-spacing-xxl)',
    }}
  >
    <div style={{ padding: '0 var(--ugl-gutter)' }}>
      <h1 className="ugl-text ugl-text--display">Álbuns</h1>
    </div>
    <MediaTypesGroup />
    <UtilitiesGroup />
    <ListGroup title="Ajustes da galeria">
      <ListRow icon="darkMode" title="Aparência" trailing={<span style={{ width: 150 }}><SegmentedControl ariaLabel="Aparência" size="sm" fullWidth options={[{ id: 'claro', label: 'Claro' }, { id: 'escuro', label: 'Escuro' }]} /></span>} />
      <ListRow icon="cloudDone" title="Cópia na nuvem" subtitle="Última cópia hoje, 9:12" detail="Ativa" />
      <ListRow title="Apagar a lixeira agora" destructive onClick={() => undefined} chevron={false} />
    </ListGroup>
  </div>
);

/**
 * Página de documentação rica dos componentes ListRow e ListGroup.
 */
const ListRowDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Listas"
      title="ListRow e ListGroup"
      description="Linha de lista agrupada de 52px — glifo, título, apoio, contagem, cadeado e seta — e o cartão que as reúne. Com href a linha é um link; com onClick, um botão; sem nenhum dos dois, só informa."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="As listas da aba Álbuns e dos ajustes."
    />
    <UglDocGrid>
      <UglDocCard icon="🗂️" title="Tipos de mídia">
        “Vídeos 3 ›”, “Selfies 2 ›”: glifo em icon-accent, contagem à direita formatada em pt-BR
        e a seta de navegação.
      </UglDocCard>
      <UglDocCard icon="🔒" title="Álbuns protegidos">
        <code>locked</code> põe o cadeado antes da contagem e acrescenta “, protegido” ao nome
        acessível — o estado não depende só do glifo.
      </UglDocCard>
      <UglDocCard icon="🔗" title="Botão, link ou informação">
        O elemento raiz muda com a função: <code>&lt;a&gt;</code> com <code>href</code>,{' '}
        <code>&lt;button&gt;</code> com <code>onClick</code>, <code>&lt;div&gt;</code> sem nenhum.
      </UglDocCard>
      <UglDocCard icon="🧾" title="Lista de verdade">
        O <code>ListGroup</code> é um <code>&lt;ul role=&quot;list&quot;&gt;</code> com um{' '}
        <code>&lt;li&gt;</code> por linha, nomeado pelo título, e apaga o fio do último item.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="ListRow"
      layout="Linha · ≥ 52px"
      specs={[
        { label: 'Altura mínima', value: '52px (local)' },
        { label: 'Recuo', value: '--ugl-gutter (16px) nas duas pontas' },
        { label: 'Coluna do glifo', value: '36px (local) · glifo md 24px' },
        { label: 'Título', value: 'body-lg · Open Sans 400 · 16/24px' },
        { label: 'Apoio', value: 'body-md · 14/20px · text-secondary' },
        { label: 'Detalhe', value: 'body-lg · text-secondary · números tabulares' },
        { label: 'Divisor', value: '1px --ugl-color-border-subtle, recuado até o texto' },
        { label: 'Cartão (ListGroup)', value: '--ugl-color-background-primary · --ugl-radius-m' },
        { label: 'Título do grupo', value: 'title-lg · 20/30px' },
        { label: 'Foco', value: 'contorno de 2px em --ugl-color-focus-ring, para dentro' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Medidas locais',
          detail:
            '--ugl-list-row-min-height (52px) e --ugl-list-row-icon-column (36px: o glifo de 24px e 12px até o texto) no topo do ListRow.css — a régua de tamanhos não tem esses degraus.',
        },
        {
          subject: 'Fio recuado desenhado no corpo',
          detail:
            'o divisor é a borda inferior do corpo da linha, que começa depois do glifo — por isso fica recuado até o texto sem cálculo. O ListGroup o apaga no último item.',
        },
        {
          subject: 'Nome acessível com separadores',
          detail:
            'vírgulas invisíveis separam título, apoio, “protegido” e contagem: o leitor de tela ouve “Ocultos, protegido, 1”, e não “Ocultos1”.',
        },
        {
          subject: 'Itens da lista pelo grupo',
          detail:
            'o <li> é criado pelo ListGroup, e não pela linha: uma ListRow solta fora de uma lista não vira um listitem órfão. O role="list" explícito sobrevive ao list-style: none.',
        },
        {
          subject: 'Link desabilitado',
          detail:
            'com href e disabled, a linha perde o href (sai do Tab) e recebe aria-disabled="true" com role="link", em vez de um link que navega apagado.',
        },
        {
          subject: 'Foco para dentro',
          detail:
            'o cartão tem overflow: hidden para arredondar os cantos; o contorno de foco é desenhado 2px para dentro da linha, para não ser cortado.',
        },
        {
          subject: 'Server Components',
          detail: 'ListRow e ListGroup só recebem props e renderizam; o título textual nomeia a lista por aria-label, sem useId.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UglDocAnatomy
      zones={[
        { name: 'Linha (a | button | div)', role: 'Alvo inteiro, com realce e foco.', token: '--ugl-color-state-hover · --ugl-color-focus-ring' },
        { name: 'Glifo', role: 'Opcional, decorativo, em icon-accent (danger quando destrutiva).', token: '--ugl-color-icon-accent' },
        { name: 'Título e apoio', role: 'Coluna de texto; o título trunca.', token: '--ugl-font-body-lg-* · --ugl-font-body-md-*' },
        { name: 'Cadeado', role: 'Com locked, antes da contagem.', token: '--ugl-color-icon-secondary' },
        { name: 'Detalhe', role: 'Contagem ou valor, formatada em pt-BR.', token: '--ugl-color-text-secondary' },
        { name: 'Trailing', role: 'Conteúdo livre (use sem onClick se for interativo).', token: '—' },
        { name: 'Seta', role: 'chevronRight, padrão nas linhas interativas.', token: '--ugl-color-icon-secondary' },
        { name: 'Divisor', role: 'Fio de 1px recuado.', token: '--ugl-color-border-subtle' },
        { name: 'Cartão (ListGroup)', role: 'Lista com título e rodapé.', token: '--ugl-color-background-primary · --ugl-radius-m' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os papéis e os estados da linha, dentro de cartões reais."
    />
    <UglDocStage label="Papéis e conteúdo" surface="secondary" direction="column" align="stretch" padding={16} width={390}>
      <ListGroup title="Matriz" inset={false}>
        <ListRow icon="video" title="Botão com contagem" detail={uglVideos.length} onClick={() => undefined} />
        <ListRow icon="imported" title="Link" href="#importados" />
        <ListRow icon="hide" title="Protegido" detail={1} locked onClick={() => undefined} />
        <ListRow icon="cloudDone" title="Só informa" subtitle="Com linha de apoio" detail="Ativa" />
        <ListRow icon="delete" title="Destrutiva" destructive onClick={() => undefined} chevron={false} />
        <ListRow icon="settings" title="Desabilitada" disabled onClick={() => undefined} />
        <ListRow title="Sem glifo e sem fio" divider={false} detail={1204} />
      </ListGroup>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Usar href para ir a outra tela e onClick para agir na mesma.',
        'Passar detail como número: a formatação em pt-BR vem pronta.',
        'Marcar locked em álbuns protegidos, para que o estado seja lido.',
        'Dar título ao ListGroup: ele nomeia a lista para o leitor de tela.',
      ]}
      donts={[
        'Colocar um controle interativo no trailing de uma linha com onClick (botão dentro de botão).',
        'Usar a ListRow fora de um ListGroup quando ela fizer parte de uma lista.',
        'Tirar a seta de uma linha que navega.',
        'Usar destructive para ações que não apagam nada.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Cartão, fios, textos e glifos acompanham data-ugl-theme."
    />
    <UglDocThemeSwitcher surface="secondary" padding={16}>
      {() => (
        <div style={{ width: 390 }}>
          <UtilitiesGroup />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UglDocPropsTable
      title="ListRow"
      rows={[
        { name: 'title', type: 'React.ReactNode', description: 'Título. Obrigatório.' },
        { name: 'subtitle', type: 'React.ReactNode', description: 'Linha de apoio.' },
        { name: 'icon', type: 'UglIconName', description: 'Glifo à esquerda.' },
        { name: 'iconTone', type: 'UglIconTone', default: "'accent' ('danger' se destructive)", description: 'Tom do glifo.' },
        { name: 'detail', type: 'string | number', description: 'Valor à direita; números em pt-BR.' },
        { name: 'trailing', type: 'React.ReactNode', description: 'Conteúdo livre à direita.' },
        { name: 'chevron', type: 'boolean', default: 'true com onClick/href', description: 'Seta de navegação.' },
        { name: 'locked', type: 'boolean', default: 'false', description: 'Cadeado e “, protegido” no nome.' },
        { name: 'onClick', type: '(event) => void', description: 'Torna a linha um <button>.' },
        { name: 'href / target / rel', type: 'string', description: 'Torna a linha um <a>.' },
        { name: 'divider', type: 'boolean', default: 'true', description: 'Fio recuado na base.' },
        { name: 'destructive', type: 'boolean', default: 'false', description: 'Título em text-danger.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita a linha interativa.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / style / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos do elemento raiz.' },
      ]}
    />
    <UglDocPropsTable
      title="ListGroup"
      rows={[
        { name: 'title', type: 'React.ReactNode', description: 'Título acima do cartão; texto também nomeia a lista.' },
        { name: 'headingLevel', type: '2 | 3', default: '2', description: 'Nível do título.' },
        { name: 'footer', type: 'React.ReactNode', description: 'Apoio abaixo do cartão.' },
        { name: 'inset', type: 'boolean', default: 'true', description: 'Recua o cartão pela margem e arredonda os cantos.' },
        { name: 'children', type: 'React.ReactNode', description: 'As linhas; cada filho vira um <li>.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / style / ...', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos da raiz.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ListRow> = {
  title: 'Unoogaleria/Componentes/ListRow',
  component: ListRow,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título.' },
    subtitle: { control: 'text', description: 'Apoio.' },
    icon: {
      control: 'select',
      options: [undefined, 'video', 'selfie', 'livePhoto', 'screenshot', 'imported', 'hide', 'delete', 'settings'],
      description: 'Glifo.',
    },
    iconTone: {
      control: 'select',
      options: [undefined, 'primary', 'secondary', 'accent', 'danger', 'favorite', 'inherit'],
      description: 'Tom do glifo.',
    },
    detail: { control: 'text', description: 'Valor à direita.' },
    chevron: { control: 'boolean', description: 'Seta.' },
    locked: { control: 'boolean', description: 'Protegido.' },
    href: { control: 'text', description: 'Link (vira <a>).' },
    divider: { control: 'boolean', description: 'Fio recuado.' },
    destructive: { control: 'boolean', description: 'Ação destrutiva.' },
    disabled: { control: 'boolean', description: 'Desabilitada.' },
    onClick: { action: 'onClick', description: 'Torna a linha um botão.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: 'Vídeos',
    icon: 'video',
    detail: String(uglVideos.length),
    locked: false,
    divider: true,
    destructive: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof ListRow>;

/**
 * Documentação rica e completa dos componentes.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ListRowDocumentationPage />,
};

/**
 * Playground da linha, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ListRow',
  render: (args) => (
    <UglDocStage theme={args.theme ?? 'light'} surface="secondary" align="stretch" padding={16} width={390}>
      <ListGroup inset={false}>
        <ListRow {...args} />
      </ListGroup>
    </UglDocStage>
  ),
};

type GroupArgs = UglListGroupProps;

/**
 * Playground do cartão agrupado.
 */
export const PlaygroundGrupo: StoryObj<GroupArgs> = {
  name: '🕹️ 2. Playground do ListGroup',
  argTypes: {
    title: { control: 'text', description: 'Título do grupo.' },
    headingLevel: { control: 'radio', options: [2, 3], description: 'Nível do título.' },
    footer: { control: 'text', description: 'Apoio abaixo do cartão.' },
    inset: { control: 'boolean', description: 'Recuo e cantos arredondados.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: 'Utilitários',
    headingLevel: 2,
    footer: 'Ocultos e Excluídos recentemente pedem desbloqueio para abrir.',
    inset: true,
  },
  // Só as props do grupo: os `args` da meta (do ListRow) também chegam aqui, e
  // espalhá-los no ListGroup poria `locked`, `divider` e `destructive` no DOM.
  render: ({ title, headingLevel, footer, inset, theme, className }) => (
    <UglDocStage theme={theme ?? 'light'} surface="secondary" align="stretch" padding={16} width={420}>
      <ListGroup title={title} headingLevel={headingLevel} footer={footer} inset={inset} theme={theme} className={className}>
        <ListRow icon="imported" title="Importados" detail={4} onClick={() => undefined} />
        <ListRow icon="hide" title="Ocultos" detail={uglHiddenItems.length} locked onClick={() => undefined} />
        <ListRow icon="delete" title="Excluídos recentemente" detail={uglTrashItems.length} locked onClick={() => undefined} />
      </ListGroup>
    </UglDocStage>
  ),
};

/**
 * A aba Álbuns no aparelho: tipos de mídia, utilitários e ajustes.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: aba Álbuns',
  parameters: { layout: 'centered' },
  render: () => (
    <PhoneFrame scale={0.75} ariaLabel="Galeria — álbuns">
      <AlbumsScreen />
    </PhoneFrame>
  ),
};

/**
 * Botão, link, informação, protegida e destrutiva.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UglDocStage surface="secondary" align="stretch" padding={16} width={390}>
      <ListGroup title="Variantes" inset={false}>
        <ListRow icon="video" title="Botão" detail={3} onClick={() => undefined} />
        <ListRow icon="imported" title="Link" href="#importados" />
        <ListRow icon="cloudDone" title="Informação" subtitle="Sem seta nem alvo" detail="Ativa" />
        <ListRow icon="hide" title="Protegida" detail={1} locked onClick={() => undefined} />
        <ListRow icon="delete" title="Destrutiva" destructive onClick={() => undefined} chevron={false} />
      </ListGroup>
    </UglDocStage>
  ),
};

/**
 * Desabilitada (botão e link), sem fio e com título longo.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage surface="secondary" align="stretch" padding={16} width={390}>
      <ListGroup title="Estados" inset={false}>
        <ListRow icon="settings" title="Botão desabilitado" disabled onClick={() => undefined} />
        <ListRow icon="link" title="Link desabilitado" disabled href="#desabilitado" />
        <ListRow title="Um título bem mais longo que a linha, para mostrar o corte com reticências" detail={12} onClick={() => undefined} />
        <ListRow title="Sem fio" divider={false} detail={1204} />
      </ListGroup>
    </UglDocStage>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UglDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="secondary" align="stretch" padding={16} width={390}>
          <MediaTypesGroup />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: a linha é botão com `onClick` e link com `href`; a lista tem um
 * item por linha; a protegida anuncia o estado; a desabilitada não responde.
 */
export const BotaoELink: Story = {
  name: 'Interação: botão e link',
  render: () => (
    <UglDocStage surface="secondary" align="stretch" padding={16} width={390}>
      <ListGroup title="Utilitários" inset={false}>
        <ListRow icon="video" title="Vídeos" detail={uglVideos.length} onClick={openVideosSpy} />
        <ListRow
          icon="imported"
          title="Importados"
          href="#importados"
          onClick={(event) => {
            event.preventDefault();
            openImportedSpy();
          }}
        />
        <ListRow icon="hide" title="Ocultos" detail={uglHiddenItems.length} locked onClick={() => undefined} />
        <ListRow icon="settings" title="Ajustes" disabled onClick={openVideosSpy} />
      </ListGroup>
    </UglDocStage>
  ),
  play: async ({ canvasElement }) => {
    openVideosSpy.mockClear();
    openImportedSpy.mockClear();
    const canvas = within(canvasElement);

    const list = canvas.getByRole('list', { name: 'Utilitários' });
    await expect(within(list).getAllByRole('listitem')).toHaveLength(4);

    const videos = canvas.getByRole('button', { name: /^Vídeos/ });
    await expect(videos).toHaveTextContent(String(uglVideos.length));
    await userEvent.click(videos);
    await expect(openVideosSpy).toHaveBeenCalledTimes(1);

    const imported = canvas.getByRole('link', { name: /Importados/ });
    await expect(imported).toHaveAttribute('href', '#importados');
    imported.focus();
    await userEvent.keyboard('{Enter}');
    await expect(openImportedSpy).toHaveBeenCalledTimes(1);

    await expect(canvas.getByRole('button', { name: /Ocultos.*protegido/ })).toBeInTheDocument();

    const settings = canvas.getByRole('button', { name: /Ajustes/ });
    await expect(settings).toBeDisabled();
    await userEvent.click(settings);
    await expect(openVideosSpy).toHaveBeenCalledTimes(1);
  },
};
