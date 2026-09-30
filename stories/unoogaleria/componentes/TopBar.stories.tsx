import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { TopBar } from '../../../src/unoogaleria/components/TopBar';
import type { UglTopBarVariant } from '../../../src/unoogaleria/components/TopBar';
import { IconButton } from '../../../src/unoogaleria/components/IconButton';
import { Button } from '../../../src/unoogaleria/components/Button';
import { MediaGrid } from '../../../src/unoogaleria/components/MediaGrid';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { uglFormatCount, uglFormatLongDate } from '../../../src/unoogaleria/media';
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
import { uglAlbums, uglDemoNow, uglMediaItems } from '../fixtures';

const BAR = '#716C98';

const ALBUM = uglAlbums[0];
const ITENS_DO_ALBUM = uglMediaItems.filter((item) => item.albumIds?.includes(ALBUM.id));
const HOJE = uglFormatLongDate(uglDemoNow);

const acoesDaBiblioteca = (
  <>
    <Button variant="tertiary" size="md">
      Selecionar
    </Button>
    <IconButton icon="more" label="Mais opções" aria-haspopup="menu" />
  </>
);

/**
 * Um álbum aberto no aparelho: a barra sobreposta e a grade correndo por baixo.
 */
const TelaAlbum: React.FC<{ theme?: 'light' | 'dark'; onBack?: () => void }> = ({ theme, onBack }) => (
  <PhoneFrame scale={0.75} theme={theme}>
    <TopBar
      variant="overlay"
      title={ALBUM.title}
      onBack={onBack ?? (() => undefined)}
      backText="Álbuns"
      actions={<IconButton icon="more" label="Opções do álbum" aria-haspopup="menu" />}
    />
    <MediaGrid
      items={ITENS_DO_ALBUM}
      groupBy="none"
      showHeaders={false}
      now={uglDemoNow}
      topInset={44}
      ariaLabel={`Fotos e vídeos de ${ALBUM.title}`}
      footer={uglFormatCount(ITENS_DO_ALBUM)}
    />
  </PhoneFrame>
);

/**
 * A biblioteca no aparelho, com o título grande no topo.
 */
const TelaBiblioteca: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => (
  <PhoneFrame scale={0.75} theme={theme}>
    <TopBar title="Biblioteca" subtitle={HOJE} actions={acoesDaBiblioteca} bordered />
    <MediaGrid items={uglMediaItems} now={uglDemoNow} footer={uglFormatCount(uglMediaItems)} />
  </PhoneFrame>
);

/**
 * Página de documentação rica do componente TopBar.
 */
const TopBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Navegação"
      title="TopBar"
      description="Barra superior das telas da galeria, em três variantes: o título grande da Biblioteca, dos Álbuns e da Busca; a barra compacta de um álbum aberto; e a compacta translúcida que flutua sobre a grade. Sempre começa abaixo da barra de status do aparelho."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma barra por tela, com título, voltar e ações."
    />
    <UglDocGrid>
      <UglDocCard icon="🔠" title="Grande (large)">
        Título em <code>display</code> (34/48) à esquerda, linha de apoio acima dele e ações na linha
        do título. O topo das telas de primeiro nível.
      </UglDocCard>
      <UglDocCard icon="➖" title="Compacta (compact)">
        Título centralizado em <code>title-md</code> entre o voltar e as ações, na altura de{' '}
        <code>--ugl-topbar-height</code>. Um álbum aberto, os ajustes.
      </UglDocCard>
      <UglDocCard icon="🪟" title="Sobreposta (overlay)">
        A compacta, translúcida com desfoque e absoluta no topo: a grade corre por baixo. Passe{' '}
        <code>topInset=44</code> à <code>MediaGrid</code>.
      </UglDocCard>
      <UglDocCard icon="⬅️" title="Voltar">
        <code>onBack</code> mostra o botão com o glifo <code>back</code> (“Voltar”). Com{' '}
        <code>backText</code>, o nome da tela anterior aparece ao lado e o nome acessível vira
        “Voltar: Álbuns”.
      </UglDocCard>
      <UglDocCard icon="📱" title="Área segura">
        A barra soma <code>--ugl-safe-area-top</code> ao próprio recuo: o título nunca fica sob a
        barra de status. Fora do aparelho, a área vale 0.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas e escolhas de composição."
    />
    <UglDocSpecs
      component="TopBar"
      layout="Cabeçalho · 3 variantes"
      specs={[
        { label: 'Recuo superior', value: '--ugl-safe-area-top' },
        { label: 'Altura compacta', value: '--ugl-topbar-height (44px)' },
        { label: 'Título grande', value: 'display · 34/48 · bold' },
        { label: 'Título compacto', value: 'title-md · 18/28' },
        { label: 'Linha de apoio', value: 'label (grande) · caption (compacta)' },
        { label: 'Translúcida', value: '--ugl-color-surface-bar + blur 16px' },
        { label: 'Fio', value: '--ugl-elevation-hairline-bottom' },
        { label: 'Camada', value: '--ugl-z-bar (sticky e overlay)' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Transparente em repouso',
          detail:
            'large e compact não pintam fundo: herdam a superfície da tela (primária na biblioteca, secundária nos álbuns). Só sticky e overlay ganham a barra translúcida, porque só elas ficam sobre conteúdo que rola.',
        },
        {
          subject: 'Linha de apoio acima na grande, abaixo nas compactas',
          detail:
            'na grande, a linha de apoio é um sobretítulo em label (14/600, text-secondary), como a data acima de "Biblioteca". Nas compactas, vira a linha de baixo em caption ("12 itens"), para caber nos 44px.',
        },
        {
          subject: 'Título centrado por flex, não por grade',
          detail:
            'os dois lados da compacta crescem por igual (flex 1 1 0), então o título fica no centro da barra mesmo com uma ação de um lado e duas do outro; quando não cabe, o título encurta com reticências, e não os botões.',
        },
        {
          subject: 'Voltar com texto num só botão',
          detail:
            'com backText, glifo e texto formam um único botão em text-accent, de 44px de altura, com o nome "Voltar: Álbuns" — que contém o texto visível (WCAG 2.5.3). Sem backText, é o IconButton de 44px.',
        },
        {
          subject: 'O voltar da grande alinha o glifo à margem',
          detail:
            'na variante grande, a linha do voltar recua 10px para a esquerda, para que o glifo (e não a caixa de 44px) fique alinhado ao título na margem de 16px.',
        },
        {
          subject: 'Medida local',
          detail: '--ugl-top-bar-back-text-max (120px): o nome da tela anterior encurta com reticências antes de empurrar o título.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Área segura, voltar, título e ações."
    />
    <UglDocStage label="Grande e compacta com voltar (390px)" surface="secondary" align="flex-start" padding={16}>
      <div style={{ width: 390, display: 'grid', gap: 12 }}>
        <TopBar title="Biblioteca" subtitle={HOJE} actions={acoesDaBiblioteca} bordered />
        <TopBar variant="compact" title={ALBUM.title} subtitle="6 itens" onBack={() => undefined} backText="Álbuns" bordered />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Área segura', role: 'Recuo superior igual à barra de status do aparelho.', token: '--ugl-safe-area-top' },
            { name: 'Voltar', role: 'IconButton "Voltar" ou botão com o nome da tela anterior.', token: '--ugl-color-text-accent' },
            { name: 'Linha de apoio', role: 'Sobretítulo na grande; linha de baixo nas compactas.', token: '--ugl-color-text-secondary' },
            { name: 'Título', role: '<h1> (ou <h2>) em display ou title-md.', token: '--ugl-font-display-* · --ugl-font-title-md-*' },
            { name: 'Ações', role: 'IconButton e Button terciário à direita.', token: '--ugl-color-icon-primary' },
            { name: 'Fio', role: 'Opcional, 1px sob a barra.', token: '--ugl-elevation-hairline-bottom' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As três variantes, com e sem voltar, fio e linha de apoio."
    />
    <UglDocStage label="Variantes" surface="secondary" direction="column" align="flex-start" padding={16} gap={12}>
      {(['large', 'compact'] as UglTopBarVariant[]).map((variant) => (
        <div key={variant} style={{ width: 390 }}>
          <TopBar variant={variant} title="Álbuns" headingLevel={2} actions={<IconButton icon="add" label="Novo álbum" />} bordered />
        </div>
      ))}
      <div style={{ width: 390, height: 120, position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
        <MediaGrid items={uglMediaItems.slice(0, 9)} showHeaders={false} topInset={44} ariaLabel="Grade sob a barra sobreposta" />
        <TopBar variant="overlay" title="Recentes" headingLevel={2} onBack={() => undefined} />
      </div>
    </UglDocStage>
    <UglDocStage label="Voltar" surface="secondary" direction="column" align="flex-start" padding={16} gap={12}>
      <div style={{ width: 390 }}>
        <TopBar variant="compact" title="Favoritos" headingLevel={2} onBack={() => undefined} />
      </div>
      <div style={{ width: 390 }}>
        <TopBar variant="compact" title="Favoritos" headingLevel={2} onBack={() => undefined} backText="Álbuns" />
      </div>
      <div style={{ width: 390 }}>
        <TopBar title="Pessoas" headingLevel={2} onBack={() => undefined} backText="Álbuns" subtitle="6 pessoas" />
      </div>
    </UglDocStage>
    <UglDocStage label="No aparelho (área segura de 47px)" surface="secondary" padding={16}>
      <TelaBiblioteca />
      <TelaAlbum />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso da barra superior." />
    <UglDocPractices
      dos={[
        'Usar a grande nas telas de primeiro nível e a compacta nas que se abrem a partir delas.',
        'Usar overlay quando a grade corre por baixo, e passar topInset à MediaGrid.',
        'Dar backText com o nome da tela anterior quando ele ajuda a se localizar.',
        'Manter um só <h1> por tela; em composições com outra barra, headingLevel={2}.',
      ]}
      donts={[
        'Pôr mais de duas ações na barra: as demais vão num menu "Mais".',
        'Somar a área segura por fora: a barra já soma --ugl-safe-area-top.',
        'Usar overlay sobre conteúdo que não rola: sem nada por baixo, a translucidez é ruído.',
        'Escrever títulos longos na compacta: eles encurtam com reticências.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Título, ações e a barra translúcida acompanham o tema."
    />
    <UglDocThemeSwitcher surface="secondary" padding={16}>
      {(tema) => (
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <TelaBiblioteca theme={tema} />
          <TelaAlbum theme={tema} />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do componente TopBar."
    />
    <UglDocPropsTable
      title="TopBar"
      rows={[
        { name: 'title', type: 'ReactNode', description: 'Título da tela. Obrigatório.' },
        { name: 'subtitle', type: 'ReactNode', description: 'Linha de apoio: acima do título na grande, abaixo nas compactas.' },
        { name: 'variant', type: "'large' | 'compact' | 'overlay'", default: "'large'", description: 'Variante.' },
        { name: 'actions', type: 'ReactNode', description: 'Ações à direita.' },
        { name: 'leading', type: 'ReactNode', description: 'Conteúdo à esquerda, depois do voltar.' },
        { name: 'onBack', type: '() => void', description: 'Mostra o voltar e o aciona.' },
        { name: 'backLabel', type: 'string', default: "'Voltar'", description: 'Nome acessível do voltar.' },
        { name: 'backText', type: 'string', description: 'Nome da tela anterior, visível ao lado do glifo.' },
        { name: 'bordered', type: 'boolean', default: 'false', description: 'Fio inferior de 1px.' },
        { name: 'headingLevel', type: '1 | 2', default: '1', description: 'Nível do título.' },
        { name: 'sticky', type: 'boolean', default: 'false', description: 'Cola no topo do contêiner de rolagem, translúcida.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: '...rest', type: 'HTMLAttributes<HTMLElement>', description: 'Atributos nativos do <header>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TopBar> = {
  title: 'Unoogaleria/Componentes/TopBar',
  component: TopBar,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título da tela.' },
    subtitle: { control: 'text', description: 'Linha de apoio.' },
    variant: { control: 'radio', options: ['large', 'compact', 'overlay'], description: 'Variante.' },
    backLabel: { control: 'text', description: 'Nome acessível do voltar.' },
    backText: { control: 'text', description: 'Nome da tela anterior.' },
    bordered: { control: 'boolean', description: 'Fio inferior.' },
    headingLevel: { control: 'radio', options: [1, 2], description: 'Nível do título.' },
    sticky: { control: 'boolean', description: 'Colante e translúcida.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    actions: { control: false, description: 'Ações à direita (ReactNode).' },
    leading: { control: false, description: 'Conteúdo à esquerda (ReactNode).' },
    onBack: { action: 'onBack', description: 'Voltar.' },
  },
  args: {
    title: 'Biblioteca',
    subtitle: HOJE,
    variant: 'large',
    backLabel: 'Voltar',
    backText: '',
    bordered: false,
    headingLevel: 1,
    sticky: false,
    theme: 'light',
    actions: acoesDaBiblioteca,
    onBack: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof TopBar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TopBarDocumentationPage />,
};

/**
 * Playground com todas as propriedades da TopBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da TopBar',
  render: (args) => (
    <UglDocStage theme={args.theme} surface="primary" padding={16}>
      <div style={{ width: 390, height: args.variant === 'overlay' ? 160 : undefined, position: 'relative', overflow: 'hidden' }}>
        {args.variant === 'overlay' && (
          <MediaGrid items={uglMediaItems.slice(0, 9)} showHeaders={false} topInset={44} ariaLabel="Grade sob a barra" />
        )}
        <TopBar {...args} backText={args.backText || undefined} />
      </div>
    </UglDocStage>
  ),
};

/**
 * Um álbum aberto no aparelho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: álbum aberto no aparelho',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <TelaBiblioteca />
      <TelaAlbum />
    </div>
  ),
};

/**
 * As três variantes.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UglDocStage surface="secondary" direction="column" align="flex-start" padding={16} gap={12}>
      <div style={{ width: 390 }}>
        <TopBar title="Álbuns" headingLevel={2} actions={<IconButton icon="add" label="Novo álbum" />} />
      </div>
      <div style={{ width: 390 }}>
        <TopBar variant="compact" title="Favoritos" subtitle="7 itens" headingLevel={2} onBack={() => undefined} backText="Álbuns" />
      </div>
      <div style={{ width: 390, height: 140, position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
        <MediaGrid items={uglMediaItems.slice(0, 9)} showHeaders={false} topInset={44} ariaLabel="Grade sob a barra sobreposta" />
        <TopBar variant="overlay" title="Recentes" headingLevel={2} onBack={() => undefined} />
      </div>
    </UglDocStage>
  ),
};

/**
 * Com e sem voltar, fio, linha de apoio e colante.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage surface="secondary" direction="column" align="flex-start" padding={16} gap={12}>
      <div style={{ width: 390 }}>
        <TopBar variant="compact" title="Sem voltar" headingLevel={2} />
      </div>
      <div style={{ width: 390 }}>
        <TopBar variant="compact" title="Com voltar" headingLevel={2} onBack={() => undefined} bordered />
      </div>
      <div style={{ width: 390 }}>
        <TopBar variant="compact" title="Título muito longo que não cabe na barra compacta" headingLevel={2} onBack={() => undefined} backText="Álbuns" actions={<IconButton icon="more" label="Mais" />} />
      </div>
      <div style={{ width: 390, height: 180, overflowY: 'auto', borderRadius: 12 }}>
        <TopBar title="Colante" headingLevel={2} sticky bordered />
        <MediaGrid items={uglMediaItems.slice(0, 12)} showHeaders={false} style={{ height: 'auto', overflow: 'visible' }} ariaLabel="Conteúdo sob a barra colante" />
      </div>
    </UglDocStage>
  ),
};

/**
 * A barra nos dois temas, no aparelho.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UglDocStage key={tema} label={tema === 'light' ? 'Tema claro' : 'Tema escuro'} theme={tema} surface="secondary" padding={16}>
          <TelaAlbum theme={tema} />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * O voltar com o nome da tela anterior, o título como <h1> e o fundo translúcido.
 */
export const VoltarEAcessibilidade: Story = {
  name: 'Voltar e cabeçalho',
  args: { onBack: fn() },
  render: (args) => (
    <UglDocStage surface="secondary" padding={16}>
      <TelaAlbum onBack={args.onBack} />
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    await expect(tela.getByRole('heading', { level: 1, name: ALBUM.title })).toBeInTheDocument();

    const voltar = tela.getByRole('button', { name: 'Voltar: Álbuns' });
    await userEvent.click(voltar);
    await expect(args.onBack).toHaveBeenCalledTimes(1);

    voltar.focus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onBack).toHaveBeenCalledTimes(2);
  },
};
