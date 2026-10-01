import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { GalleryGrid } from '../../../src/unoojornal/components/GalleryGrid';
import { GalleryImage } from '../../../src/unoojornal/components/GalleryImage';
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
import { ujnGallery } from '../fixtures';

const BAR = '#716C98';

/**
 * As fotografias das fixtures dentro da grade real.
 */
const Photos: React.FC<{ count?: number; interactive?: boolean }> = ({ count = ujnGallery.length, interactive = false }) => (
  <>
    {ujnGallery.slice(0, count).map((photo) => (
      <GalleryImage key={photo.id} {...photo} onOpen={interactive ? () => undefined : undefined} />
    ))}
  </>
);

/**
 * Página de documentação rica do componente GalleryGrid.
 */
const GalleryGridDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Capa"
      title="GalleryGrid"
      description="Grade das fotografias da galeria. Colapsa pelo contêiner, e não pela janela: quatro colunas no largo, duas no médio e de uma a duas no compacto."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Organiza as células GalleryImage."
    />
    <UjnDocGrid>
      <UjnDocCard icon="🧱" title="Quatro, três ou duas colunas">
        <code>columns</code> define as colunas no contêiner largo (≥ 960px); o padrão é 4.
      </UjnDocCard>
      <UjnDocCard icon="📦" title="Responde ao contêiner">
        Dentro de uma coluna estreita da página — ou de um quadro de documentação — a grade
        colapsa mesmo numa janela larga.
      </UjnDocCard>
      <UjnDocCard icon="📱" title="No celular">
        Abaixo de 400px é uma coluna só; a partir daí, duas. O espaço entre as imagens é fixo.
      </UjnDocCard>
      <UjnDocCard icon="🖼️" title="Qualquer célula">
        Os filhos são livres; a célula típica é o <code>GalleryImage</code>, com legenda e
        crédito.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="GalleryGrid"
      layout="Grade · largura do contêiner"
      specs={[
        { label: 'Pontos de quebra', value: 'de contêiner: ≥ 960px largo · ≥ 640px médio · abaixo, compacto' },
        { label: 'Largo (≥ 960px)', value: 'columns colunas (2, 3 ou 4; padrão 4)' },
        { label: 'Médio e compacto largo (≥ 400px)', value: '2 colunas' },
        { label: 'Compacto (< 400px)', value: '1 coluna' },
        { label: 'Vão', value: '--ujn-spacing-xl (20px) entre linhas · --ujn-spacing-l (16px) entre colunas' },
        { label: 'Contêiner', value: 'container-type: inline-size' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Raiz é o contêiner, a grade é o filho',
          detail:
            'uma regra de @container só atinge os descendentes do contêiner; por isso a raiz declara container-type e quem muda de colunas é o elemento interno.',
        },
        {
          subject: 'Duas colunas a partir de 400px',
          detail:
            'a espec pede “1–2 no compacto”; 400px é o ponto em que duas fotografias de 3:2 ainda mostram a legenda sem quebrar em cada palavra.',
        },
        {
          subject: 'Sem role de lista',
          detail:
            'as células são <figure>, que já têm semântica própria; envolvê-las em listas adicionaria um nível que o leitor de tela anunciaria sem ganho.',
        },
        {
          subject: 'Server Component',
          detail: 'só recebe props e renderiza markup; sem hooks nem funções repassadas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocStage label="Largo, 4 colunas" surface="page" align="stretch" direction="column" padding={24} width={1040}>
      <GalleryGrid>
        <Photos />
      </GalleryGrid>
    </UjnDocStage>
    <UjnDocAnatomy
      zones={[
        { name: 'Contêiner', role: 'Declara container-type: inline-size.', token: '—' },
        { name: 'Grade interna', role: 'Muda de 1 a 4 colunas pelo contêiner.', token: '--ujn-spacing-xl · --ujn-spacing-l' },
        { name: 'Célula', role: 'GalleryImage ou qualquer elemento.', token: 'GalleryImage' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Da grade larga à do celular, e as colunas de 2 a 4."
    />
    <div style={{ display: 'grid', gap: 16 }}>
      {[1040, 700, 360].map((width) => (
        <UjnDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" padding={24} width={width}>
          <GalleryGrid>
            <Photos />
          </GalleryGrid>
        </UjnDocStage>
      ))}
      {([2, 3] as const).map((columns) => (
        <UjnDocStage key={columns} label={`columns = ${columns} (1040px)`} surface="page" align="stretch" direction="column" padding={24} width={1040}>
          <GalleryGrid columns={columns}>
            <Photos count={columns === 2 ? 4 : 3} />
          </GalleryGrid>
        </UjnDocStage>
      ))}
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Usar fotografias na mesma proporção dentro da grade.',
        'Deixar columns no padrão (4) para a galeria da capa.',
        'Dar legenda e alt a cada GalleryImage.',
        'Colocar a grade num contêiner com largura definida.',
      ]}
      donts={[
        'Forçar colunas com CSS próprio: o colapso por contêiner deixa de valer.',
        'Misturar proporções diferentes na mesma linha.',
        'Usar a grade para texto: ela é para imagens.',
        'Aninhar uma GalleryGrid dentro de outra.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A grade é neutra; as células acompanham data-ujn-theme."
    />
    <UjnDocThemeSwitcher surface="page" padding={24}>
      {() => (
        <div style={{ width: 800 }}>
          <GalleryGrid columns={3}>
            <Photos count={3} />
          </GalleryGrid>
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="GalleryGrid"
      rows={[
        { name: 'columns', type: '2 | 3 | 4', default: '4', description: 'Colunas no contêiner largo (≥ 960px).' },
        { name: 'children', type: 'React.ReactNode', description: 'As células da grade.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Demais atributos do <div>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof GalleryGrid> = {
  title: 'Unoojornal/Componentes/GalleryGrid',
  component: GalleryGrid,
  parameters: { layout: 'padded' },
  argTypes: {
    columns: { control: 'radio', options: [2, 3, 4], description: 'Colunas no contêiner largo.' },
    children: { control: false, description: 'As células da grade.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    columns: 4,
  },
};

export default meta;

type Story = StoryObj<typeof GalleryGrid>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <GalleryGridDocumentationPage />,
};

/**
 * Playground da grade, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do GalleryGrid',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} surface="page" align="stretch" direction="column" padding={24} width={1040}>
      <GalleryGrid columns={args.columns} theme={args.theme} className={args.className}>
        <Photos />
      </GalleryGrid>
    </UjnDocStage>
  ),
};

/**
 * A galeria da capa: quatro fotografias em quatro colunas.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: galeria da capa',
  render: () => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={32} width={1280}>
      <GalleryGrid>
        <Photos interactive />
      </GalleryGrid>
    </UjnDocStage>
  ),
};

/**
 * Larguras de contêiner de 1040, 700 e 360px.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[1040, 700, 360].map((width) => (
        <UjnDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" padding={24} width={width}>
          <GalleryGrid>
            <Photos />
          </GalleryGrid>
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Duas, três e quatro colunas no contêiner largo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {([2, 3, 4] as const).map((columns) => (
        <UjnDocStage key={columns} label={`columns = ${columns}`} surface="page" align="stretch" direction="column" padding={24} width={1040}>
          <GalleryGrid columns={columns}>
            <Photos count={columns} />
          </GalleryGrid>
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Uma fotografia só e número ímpar de células.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="Uma fotografia" surface="page" align="stretch" direction="column" padding={24} width={1040}>
        <GalleryGrid>
          <Photos count={1} />
        </GalleryGrid>
      </UjnDocStage>
      <UjnDocStage label="Três fotografias em quatro colunas" surface="page" align="stretch" direction="column" padding={24} width={1040}>
        <GalleryGrid>
          <Photos count={3} />
        </GalleryGrid>
      </UjnDocStage>
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
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="stretch" direction="column" padding={24} width={1040}>
          <GalleryGrid>
            <Photos />
          </GalleryGrid>
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Estrutura: cada célula é uma figura com legenda, e as colunas acompanham o
 * contêiner — quatro no largo e uma no estreito.
 */
export const Colunas: Story = {
  name: 'Interação: colunas por contêiner',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UjnDocStage label="Largo (1040px)" surface="page" align="stretch" direction="column" padding={24} width={1040}>
        <GalleryGrid data-testid="grade-larga">
          <Photos />
        </GalleryGrid>
      </UjnDocStage>
      <UjnDocStage label="Estreito (320px)" surface="page" align="stretch" direction="column" padding={24} width={320}>
        <GalleryGrid data-testid="grade-estreita">
          <Photos />
        </GalleryGrid>
      </UjnDocStage>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const colunas = (testId: string) => {
      const cells = canvas.getByTestId(testId).querySelector('.ujn-gallery-grid__cells') as HTMLElement;
      return getComputedStyle(cells).gridTemplateColumns.split(' ').length;
    };

    await expect(colunas('grade-larga')).toBe(4);
    await expect(colunas('grade-estreita')).toBe(1);
    await expect(within(canvas.getByTestId('grade-larga')).getAllByRole('figure')).toHaveLength(ujnGallery.length);
  },
};
