import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SiteFooter } from '../../../src/unooblog/components/SiteFooter';
import type { UblSiteFooterColumn } from '../../../src/unooblog/components/SiteFooter';
import { Button } from '../../../src/unooblog/components/Button';
import { ublSite } from '../fixtures';
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

const BAR = '#716C98';

const COLUNAS: UblSiteFooterColumn[] = [
  {
    heading: 'Explorar',
    links: [
      { label: 'Todos os posts', href: '#posts' },
      { label: 'Tópicos', href: '#topicos' },
      { label: 'Séries', href: '#series' },
      { label: 'Autores', href: '#autores' },
    ],
  },
  {
    heading: 'Sobre',
    links: [
      { label: 'Quem somos', href: '#sobre' },
      { label: 'Como escrevemos', href: '#metodo' },
      { label: 'Contato', href: '#contato' },
    ],
  },
  {
    heading: 'Receber',
    links: [
      { label: 'Feed RSS', href: '#rss' },
      { label: 'Newsletter', href: '#newsletter' },
    ],
  },
];

const LARGURAS = [
  { rotulo: 'Largo (1120px)', largura: 1120 },
  { rotulo: 'Médio (720px)', largura: 720 },
  { rotulo: 'Compacto (390px)', largura: 390 },
] as const;

/**
 * Rodapé sobre a superfície da página, com a largura escolhida.
 */
const FooterDemo: React.FC<{
  largura?: number;
  theme?: 'light' | 'dark';
  colunas?: UblSiteFooterColumn[];
  comSlot?: boolean;
  comDescricao?: boolean;
}> = ({ largura = 1120, theme, colunas = COLUNAS, comSlot = false, comDescricao = true }) => (
  <div
    data-ubl-theme={theme}
    style={{ width: largura, maxWidth: '100%', background: 'var(--ubl-color-background-page)' }}
  >
    <SiteFooter
      siteName={ublSite.name}
      description={comDescricao ? ublSite.tagline : undefined}
      columns={colunas}
      copyright={ublSite.copyright}
    >
      {comSlot ? (
        <Button variant="secondary" size="sm">
          Receber os próximos posts
        </Button>
      ) : undefined}
    </SiteFooter>
  </div>
);

/**
 * Página de documentação rica do componente SiteFooter.
 */
const SiteFooterDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Navegação"
      title="SiteFooter"
      description="Rodapé do site na camada lavanda: marca, descrição e um slot (a newsletter, por exemplo) à esquerda; colunas de links à direita; linha de direitos no fim."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Fechar a página e levar a quem terminou de ler para o próximo passo."
    />
    <UblDocGrid>
      <UblDocCard icon="🔗" title="Colunas de links">
        Cada coluna tem um título <code>&lt;h2&gt;</code> e uma lista. Um link com <code>href</code> é{' '}
        <code>&lt;a&gt;</code>; sem <code>href</code> é <code>&lt;button&gt;</code>.
      </UblDocCard>
      <UblDocCard icon="✉️" title="Slot para a newsletter">
        <code>children</code> entra sob a descrição: o formulário de assinatura, um aviso ou um botão.
      </UblDocCard>
      <UblDocCard icon="📱" title="Empilhado no compacto">
        Abaixo de 640px de contêiner a marca e as colunas se empilham; as colunas se redistribuem sozinhas.
      </UblDocCard>
      <UblDocCard icon="♿" title="Um só marco de navegação">
        As colunas ficam em um único <code>&lt;nav aria-label=&quot;Links do rodapé&quot;&gt;</code>, em vez
        de um marco por coluna.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Composição própria do blog; cores, fontes e glifos são os da Plataforma Unooria."
    />
    <UblDocSpecs
      component="SiteFooter"
      layout="Grade 1 : 2 (marca e slot · colunas de links) · linha de direitos sob um fio de 1px"
      specs={[
        { label: 'Superfície', value: '--ubl-color-background-card (camada lavanda)' },
        { label: 'Fio superior', value: '--ubl-elevation-hairline-top (1px em border-subtle)' },
        { label: 'Conteúdo', value: 'Até --ubl-page-width (1120px), margem --ubl-gutter / --ubl-gutter-wide' },
        { label: 'Título da coluna', value: 'label (14/20) bold em --ubl-color-text-primary' },
        { label: 'Link', value: 'body-md em --ubl-color-text-secondary · sublinhado no hover · alvo de 44px' },
        { label: 'Direitos', value: 'caption (12/16) em --ubl-color-text-muted' },
        { label: 'Quebra', value: '@container ≥ 640px: duas colunas na grade' },
        { label: 'Fronteira', value: 'Server Component (só recebe props e renderiza)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Camada lavanda, não superfície escura',
          detail:
            'o jornal fecha a página com um rodapé escuro invariante; o blog fecha com a camada de cartão (--ubl-color-background-card) e um fio, continuando a página branca. Não existem tokens de rodapé no módulo.',
        },
        {
          subject: 'Um <nav> para todas as colunas',
          detail:
            'vários marcos de navegação num mesmo rodapé só poluiriam a lista de pontos de referência do leitor de tela. Cada coluna é uma <div> com <h2> e lista; o marco é um só, rotulado por navLabel.',
        },
        {
          subject: 'Links e botões pelo mesmo contrato',
          detail:
            'link com href é <a>; sem href é <button type="button"> (ações como "Preferências de cookies"). onClick vale nos dois, e nenhum é decorativo.',
        },
        {
          subject: 'Server Component',
          detail:
            'o componente só recebe props e renderiza markup. Quem passa onClick num link já está em um Client Component; marcar o rodapé como cliente "por precaução" tiraria capacidade sem ganho (AGENTS.md 4.5).',
        },
        {
          subject: 'Alvo de 44px nos links',
          detail:
            'cada link tem min-height de --ubl-touch-target, o que dá à coluna o ritmo de uma lista de toque. O espaçamento entre as colunas é reduzido no compacto pela própria grade.',
        },
        {
          subject: 'Acréscimos ao contrato',
          detail: 'logo (substitui o Logo) e navLabel foram acrescentados; nada foi removido.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Marca, colunas e direitos." />
    <UblDocStage surface="page" align="stretch" direction="column" padding={0}>
      <FooterDemo comSlot />
    </UblDocStage>
    <UblDocAnatomy
      zones={[
        { name: 'Marca', role: 'Logo (ou slot logo), com nome acessível = siteName.', token: 'Logo' },
        { name: 'Descrição', role: 'Frase curta sob a marca.', token: 'body-md' },
        { name: 'Slot (children)', role: 'Newsletter, aviso ou botão; fica sob a descrição.', token: 'children' },
        { name: 'Colunas de links', role: '<nav> com colunas: <h2> e lista de <a> ou <button>.', token: '--ubl-color-text-secondary' },
        { name: 'Direitos', role: 'Linha final sob um fio de 1px.', token: '--ubl-color-text-muted' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real em cada largura de contêiner, com e sem slot."
    />
    {LARGURAS.map(({ rotulo, largura }) => (
      <UblDocStage key={rotulo} label={rotulo} surface="page" align="flex-start" padding={0}>
        <FooterDemo largura={largura} comSlot={largura > 400} />
      </UblDocStage>
    ))}
    <UblDocStage label="Sem descrição, com duas colunas" surface="page" align="stretch" direction="column" padding={0}>
      <FooterDemo comDescricao={false} colunas={COLUNAS.slice(0, 2)} />
    </UblDocStage>
    <UblDocStage label="Itens que são botões (sem href)" surface="page" align="stretch" direction="column" padding={0}>
      <FooterDemo
        colunas={[
          {
            heading: 'Privacidade',
            links: [
              { label: 'Preferências de cookies', onClick: () => undefined },
              { label: 'Política de privacidade', href: '#privacidade' },
            ],
          },
        ]}
      />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Um rodapé que ajuda a continuar." />
    <UblDocPractices
      dos={[
        'Agrupar os links em três ou quatro colunas com títulos que dizem o que há dentro.',
        'Colocar a newsletter no slot, onde ela é a única ação do rodapé.',
        'Usar href em tudo o que leva a outra página; botão só para ações (preferências, idioma).',
        'Manter a linha de direitos curta, uma frase.',
      ]}
      donts={[
        'Repetir no rodapé toda a navegação do cabeçalho: o rodapé é para o que não cabe lá.',
        'Pôr texto longo no slot: a coluna da marca é estreita.',
        'Criar um <nav> por coluna: o rodapé já é um marco de navegação.',
        'Usar o rodapé como único caminho para páginas importantes (contato, privacidade) sem rótulo claro.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Camada, fio e links acompanham o tema." />
    <UblDocThemeSwitcher surface="page" padding={0}>
      {(tema) => (
        <div style={{ width: '100%' }}>
          <FooterDemo theme={tema} comSlot />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do SiteFooter. Os demais atributos nativos vão ao <footer>."
    />
    <UblDocPropsTable
      title="SiteFooter"
      rows={[
        { name: 'siteName', type: 'string', description: 'Nome do site; nome acessível da marca. Obrigatório.' },
        { name: 'description', type: 'string', description: 'Frase curta sob a marca.' },
        { name: 'columns', type: '{ heading: string; links: { label: string; href?: string; onClick?: () => void }[] }[]', description: 'Colunas de links. Obrigatório.' },
        { name: 'copyright', type: 'string', description: 'Linha de direitos, no fim.' },
        { name: 'children', type: 'ReactNode', description: 'Slot sob a descrição (newsletter, aviso).' },
        { name: 'logo', type: 'ReactNode', description: 'Substitui o Logo padrão.' },
        { name: 'navLabel', type: 'string', default: "'Links do rodapé'", description: 'Nome acessível do marco de navegação.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SiteFooter> = {
  title: 'Unooblog/Componentes/SiteFooter',
  component: SiteFooter,
  parameters: { layout: 'padded' },
  argTypes: {
    siteName: { control: 'text', description: 'Nome do site (nome acessível da marca).' },
    description: { control: 'text', description: 'Frase curta sob a marca.' },
    columns: { control: 'object', description: 'Colunas de links.' },
    copyright: { control: 'text', description: 'Linha de direitos.' },
    children: { control: false, description: 'Slot sob a descrição.' },
    logo: { control: false, description: 'Substitui o Logo padrão.' },
    navLabel: { control: 'text', description: 'Nome acessível da navegação.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    siteName: ublSite.name,
    description: ublSite.tagline,
    columns: COLUNAS,
    copyright: ublSite.copyright,
    navLabel: 'Links do rodapé',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof SiteFooter>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SiteFooterDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SiteFooter',
  render: (args) => (
    <div data-ubl-theme={args.theme} style={{ background: 'var(--ubl-color-background-page)', maxWidth: 1120 }}>
      <SiteFooter {...args} />
    </div>
  ),
};

/**
 * Composição do rodapé de fim de página, com a newsletter no slot.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: rodapé com newsletter',
  render: () => <FooterDemo comSlot />,
};

/**
 * As três larguras de contêiner.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {LARGURAS.map(({ rotulo, largura }) => (
        <div key={rotulo}>
          <p style={{ margin: '0 0 4px', fontFamily: 'var(--ubl-font-sans)', fontSize: 12, color: 'var(--ubl-color-text-secondary)' }}>
            {rotulo}
          </p>
          <FooterDemo largura={largura} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Com e sem descrição, slot e terceira coluna.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <FooterDemo comSlot />
      <FooterDemo comDescricao={false} colunas={COLUNAS.slice(0, 2)} />
      <FooterDemo colunas={COLUNAS.slice(0, 1)} />
    </div>
  ),
};

/**
 * Link, link com foco pelo teclado e botão sem destino.
 */
export const Estados: Story = {
  render: () => (
    <FooterDemo
      colunas={[
        {
          heading: 'Estados',
          links: [
            { label: 'Link para uma página', href: '#pagina' },
            { label: 'Botão sem destino', onClick: () => undefined },
          ],
        },
      ]}
    />
  ),
};

/**
 * O rodapé nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <FooterDemo key={tema} theme={tema} comSlot />
      ))}
    </div>
  ),
};

const aoAcionar = fn();

/**
 * Estrutura: um marco de navegação com colunas e títulos; botão dispara onClick.
 */
export const ColunasELinks: Story = {
  name: 'Marco, colunas e botão de ação',
  render: () => (
    <FooterDemo
      colunas={[
        ...COLUNAS.slice(0, 2),
        {
          heading: 'Privacidade',
          links: [
            { label: 'Preferências de cookies', onClick: aoAcionar },
            { label: 'Política de privacidade', href: '#privacidade' },
          ],
        },
      ]}
    />
  ),
  play: async ({ canvasElement }) => {
    aoAcionar.mockClear();
    const tela = within(canvasElement);

    // Um único marco de navegação, com as colunas dentro.
    const marcos = tela.getAllByRole('navigation');
    await expect(marcos).toHaveLength(1);
    await expect(marcos[0]).toHaveAccessibleName('Links do rodapé');
    await expect(within(marcos[0]).getAllByRole('heading', { level: 2 })).toHaveLength(3);
    await expect(tela.getByRole('contentinfo')).toBeInTheDocument();

    // Link com href é <a>; sem href é <button>.
    await expect(tela.getByRole('link', { name: 'Tópicos' })).toHaveAttribute('href', '#topicos');
    const botao = tela.getByRole('button', { name: 'Preferências de cookies' });
    await userEvent.click(botao);
    await expect(aoAcionar).toHaveBeenCalledTimes(1);

    // Teclado: Enter no botão também aciona.
    botao.focus();
    await userEvent.keyboard('{Enter}');
    await expect(aoAcionar).toHaveBeenCalledTimes(2);
  },
};
