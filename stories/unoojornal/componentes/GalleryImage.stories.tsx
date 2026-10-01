import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { GalleryImage } from '../../../src/unoojornal/components/GalleryImage';
import type { UjnGalleryImageAspectRatio } from '../../../src/unoojornal/components/GalleryImage';
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

/** Espiões das estórias de interação. */
const openSpy = fn();
const linkSpy = fn();

const [foto1, foto2, foto3] = ujnGallery;

const RATIOS: UjnGalleryImageAspectRatio[] = ['3:2', '4:5', '1:1'];

/**
 * Página de documentação rica do componente GalleryImage.
 */
const GalleryImageDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Capa"
      title="GalleryImage"
      description="Fotografia da galeria como <figure> com legenda e crédito. Em 3:2, 4:5 ou 1:1; quando abre algo, a imagem é o alvo — link com href, botão com onOpen — e o hover só realça."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="A célula da galeria da capa."
    />
    <UjnDocGrid>
      <UjnDocCard icon="🖼️" title="Figura com legenda">
        <code>&lt;figure&gt;</code> e <code>&lt;figcaption&gt;</code>: a legenda e o crédito são
        parte da imagem para o leitor de tela e para a impressão.
      </UjnDocCard>
      <UjnDocCard icon="📐" title="Três proporções">
        Paisagem 3:2 (padrão), retrato 4:5 e quadrada 1:1; a imagem é recortada com{' '}
        <code>object-fit: cover</code>.
      </UjnDocCard>
      <UjnDocCard icon="🔎" title="Ampliar ou abrir">
        Com <code>onOpen</code> a imagem é um botão (para ampliar); com <code>href</code>, um
        link. O nome acessível é o <code>alt</code>.
      </UjnDocCard>
      <UjnDocCard icon="🗂️" title="Dentro da grade">
        É a célula do <code>GalleryGrid</code>, que organiza 4, 2 ou 1 coluna por contêiner.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="GalleryImage"
      layout="Figura · largura do contêiner"
      specs={[
        { label: 'Estrutura herdada', value: 'quadro 5:214 do arquivo de origem (só a estrutura)' },
        { label: 'Proporções', value: '3:2 · 4:5 · 1:1' },
        { label: 'Cantos', value: '--ujn-radius-s (4px)' },
        { label: 'Fundo até carregar', value: '--ujn-color-background-subtle' },
        { label: 'Legenda', value: 'body-sm 14/20px · text-secondary' },
        { label: 'Crédito', value: 'caption 12/18px · text-muted' },
        { label: 'Hover e pressionado', value: 'véu --ujn-color-state-hover e -pressed' },
        { label: 'Foco', value: 'anel de 2px em focus-ring, por fora' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'A imagem é o alvo, não a legenda',
          detail:
            'o botão ou link envolve só a fotografia, e o nome acessível é o alt. A legenda fica fora, no <figcaption>, e continua sendo lida como legenda da figura.',
        },
        {
          subject: 'Hover por véu, sem escala',
          detail:
            'o realce é uma camada --ujn-color-state-hover sobre a fotografia: nada de zoom nem sombra, em linha com o jornal plano.',
        },
        {
          subject: 'Crédito separado da legenda',
          detail: 'o crédito é uma linha própria, em tom discreto, para que a legenda possa ser trocada sem perder a atribuição.',
        },
        {
          subject: 'Client Component',
          detail: 'repassa onOpen ao botão ou ao link; por isso o arquivo começa com \'use client\'.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UjnDocStage label="Figura" surface="page" align="flex-start" padding={24}>
      <div style={{ width: 360 }}>
        <GalleryImage {...foto1} onOpen={() => undefined} />
      </div>
    </UjnDocStage>
    <UjnDocAnatomy
      zones={[
        { name: 'Quadro da imagem', role: 'Botão, link ou bloco; proporção fixa.', token: '--ujn-color-background-subtle · --ujn-radius-s' },
        { name: 'Fotografia', role: 'Cobre o quadro; descrita pelo alt.', token: '—' },
        { name: 'Véu de realce', role: 'Hover e pressionado.', token: '--ujn-color-state-hover · --ujn-color-state-pressed' },
        { name: 'Legenda', role: 'Texto do <figcaption>.', token: '--ujn-font-body-sm-*' },
        { name: 'Crédito', role: 'Atribuição da fotografia.', token: '--ujn-font-caption-* · --ujn-color-text-muted' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As três proporções e os três papéis da imagem."
    />
    <UjnDocStage label="Proporções" surface="page" align="flex-start" padding={24} gap={20}>
      {RATIOS.map((ratio) => (
        <div key={ratio} style={{ width: 240 }}>
          <GalleryImage {...foto2} caption={`Proporção ${ratio}`} aspectRatio={ratio} />
        </div>
      ))}
    </UjnDocStage>
    <UjnDocStage label="Papéis: só figura, botão e link" surface="page" align="flex-start" padding={24} gap={20}>
      <div style={{ width: 240 }}>
        <GalleryImage {...foto3} />
      </div>
      <div style={{ width: 240 }}>
        <GalleryImage {...foto3} onOpen={() => undefined} />
      </div>
      <div style={{ width: 240 }}>
        <GalleryImage {...foto3} href="#foto" />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Escrever alt que descreva a cena e caption que a contextualize: são textos diferentes.',
        'Creditar a fotografia sempre que houver autoria.',
        'Usar onOpen para ampliar e href para ir à página da foto.',
        'Manter a mesma proporção dentro de uma grade.',
      ]}
      donts={[
        'Repetir a legenda no alt.',
        'Usar a imagem como botão sem alt: ela é o nome do botão.',
        'Deformar a fotografia: o recorte é por object-fit.',
        'Pôr links dentro da legenda de uma imagem que já é link.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Fundo de espera, legenda, crédito e foco acompanham data-ujn-theme."
    />
    <UjnDocThemeSwitcher surface="page" padding={24}>
      {() => (
        <div style={{ width: 360 }}>
          <GalleryImage {...foto1} onOpen={() => undefined} />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UjnDocPropsTable
      title="GalleryImage"
      rows={[
        { name: 'src', type: 'string', description: 'Endereço da imagem. Obrigatório.' },
        { name: 'alt', type: 'string', description: 'Descrição da imagem; nomeia o botão ou o link. Obrigatória.' },
        { name: 'caption', type: 'React.ReactNode', description: 'Legenda visível. Obrigatória.' },
        { name: 'credit', type: 'string', description: 'Crédito da fotografia.' },
        { name: 'aspectRatio', type: "'3:2' | '4:5' | '1:1'", default: "'3:2'", description: 'Proporção da imagem.' },
        { name: 'href', type: 'string', description: 'Faz da imagem um <a>.' },
        { name: 'onOpen', type: '(event: MouseEvent<HTMLElement>) => void', description: 'Abre a imagem; sem href, faz dela um <button>.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos do <figure>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof GalleryImage> = {
  title: 'Unoojornal/Componentes/GalleryImage',
  component: GalleryImage,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text', description: 'Endereço da imagem.' },
    alt: { control: 'text', description: 'Descrição da imagem.' },
    caption: { control: 'text', description: 'Legenda.' },
    credit: { control: 'text', description: 'Crédito da fotografia.' },
    aspectRatio: { control: 'radio', options: RATIOS, description: 'Proporção da imagem.' },
    href: { control: 'text', description: 'Endereço (faz da imagem um link).' },
    onOpen: { action: 'onOpen', description: 'Abre a imagem (vira botão sem href).' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    ...foto1,
    aspectRatio: '3:2',
  },
};

export default meta;

type Story = StoryObj<typeof GalleryImage>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <GalleryImageDocumentationPage />,
};

/**
 * Playground da figura, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do GalleryImage',
  render: (args) => (
    <UjnDocStage theme={args.theme ?? 'light'} surface="page" align="flex-start" padding={24}>
      <div style={{ width: 360 }}>
        <GalleryImage {...args} href={args.href || undefined} />
      </div>
    </UjnDocStage>
  ),
};

/**
 * Três fotografias da galeria, lado a lado.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: fotografias da galeria',
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      {ujnGallery.slice(0, 3).map((photo) => (
        <div key={photo.id} style={{ width: 300 }}>
          <GalleryImage {...photo} onOpen={() => undefined} />
        </div>
      ))}
    </UjnDocStage>
  ),
};

/**
 * Larguras de 360, 240 e 160px, na proporção padrão.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      {[360, 240, 160].map((width) => (
        <div key={width} style={{ width }}>
          <GalleryImage {...foto1} />
        </div>
      ))}
    </UjnDocStage>
  ),
};

/**
 * As três proporções.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      {RATIOS.map((ratio) => (
        <div key={ratio} style={{ width: 240 }}>
          <GalleryImage {...foto2} caption={`Proporção ${ratio}`} aspectRatio={ratio} onOpen={() => undefined} />
        </div>
      ))}
    </UjnDocStage>
  ),
};

/**
 * Só figura, com botão, com link, sem crédito e com legenda longa.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      <div style={{ width: 240 }}>
        <GalleryImage {...foto3} caption="Só figura (não interativa)" />
      </div>
      <div style={{ width: 240 }}>
        <GalleryImage {...foto3} caption="Botão (onOpen)" onOpen={() => undefined} />
      </div>
      <div style={{ width: 240 }}>
        <GalleryImage {...foto3} caption="Link (href)" href="#foto" />
      </div>
      <div style={{ width: 240 }}>
        <GalleryImage {...foto3} credit={undefined} caption="Sem crédito" />
      </div>
      <div style={{ width: 240 }}>
        <GalleryImage
          {...foto3}
          caption="Uma legenda bem mais longa do que o normal, para mostrar como o texto quebra a linha sem deformar a imagem."
        />
      </div>
    </UjnDocStage>
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
        <UjnDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="flex-start" padding={24}>
          <div style={{ width: 300 }}>
            <GalleryImage {...foto1} onOpen={() => undefined} />
          </div>
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: a imagem é o alvo (botão ou link), nomeada pelo `alt`, e a legenda
 * fica no `<figcaption>`.
 */
export const Abrir: Story = {
  name: 'Interação: abrir a imagem',
  render: () => (
    <UjnDocStage surface="page" align="flex-start" padding={24} gap={20}>
      <div style={{ width: 300 }}>
        <GalleryImage {...foto1} onOpen={openSpy} />
      </div>
      <div style={{ width: 300 }}>
        <GalleryImage
          {...foto2}
          href="#foto-2"
          onOpen={(event) => {
            event.preventDefault();
            linkSpy();
          }}
        />
      </div>
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    openSpy.mockClear();
    linkSpy.mockClear();
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', { name: foto1.alt });
    await userEvent.click(button);
    await expect(openSpy).toHaveBeenCalledTimes(1);
    button.focus();
    await userEvent.keyboard('{Enter}');
    await expect(openSpy).toHaveBeenCalledTimes(2);

    const link = canvas.getByRole('link', { name: foto2.alt });
    await expect(link).toHaveAttribute('href', '#foto-2');
    await userEvent.click(link);
    await expect(linkSpy).toHaveBeenCalledTimes(1);

    // A legenda é a do <figcaption>, fora do botão.
    await expect(canvas.getByText(foto1.caption)).toBeInTheDocument();
    await expect(canvas.getAllByRole('figure')).toHaveLength(2);
  },
};
