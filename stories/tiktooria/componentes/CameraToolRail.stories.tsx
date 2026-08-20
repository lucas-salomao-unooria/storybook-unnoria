import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { CameraToolRail } from '../../../src/tiktooria';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocAnatomy,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocPropsTable,
  TikDocStage,
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { tikCameraPreview, tikCameraTools } from '../fixtures';

const meta: Meta<typeof CameraToolRail> = {
  title: 'Tik Tooria/Componentes/CameraToolRail',
  component: CameraToolRail,
  parameters: { layout: 'padded' },
  argTypes: {
    className: { control: 'text' },
  },
  args: {

  },
};

export default meta;

type Story = StoryObj<typeof CameraToolRail>;


const CameraToolRailDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Câmera"
      title="CameraToolRail"
      description="Coluna de 32×353 na borda direita da câmera, com as seis ferramentas do arquivo: Flip, Speed, Beauty, Filters, Timer e Flash. Cada item é um glifo de 24px sobre um rótulo Bold 10, e o conjunto é renderizado a 90% de opacidade, como no arquivo."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🎛️" title="Seis ferramentas">
        A ordem do arquivo é Flip, Speed, Beauty, Filters, Timer e Flash, de cima para baixo.
      </TikDocCard>
      <TikDocCard icon="🔤" title="Bold 10 sem tracking">
        Único uso de Bold 10 no arquivo — os rótulos da barra de abas usam o mesmo corpo, mas com tracking de 0,15px.
      </TikDocCard>
      <TikDocCard icon="🫥" title="90% de opacidade">
        Aplicada ao conjunto, para que a coluna não compita com a pré-visualização da câmera.
      </TikDocCard>
      <TikDocCard icon="📐" title="Espaçamento de 61,5px">
        Distância entre centros no arquivo. O componente usa gap de 37,5px, que produz o mesmo intervalo com glifo e rótulo.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:672"
      frameName="Camera Settings — TikTok Camera"
      specs={[
        { label: 'Dimensões', value: '32 × 353' },
        { label: 'Glifo', value: '24px' },
        { label: 'Rótulo', value: 'Bold 10 · branco' },
        { label: 'Opacidade', value: '90%' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Espaçamento por coordenada',
          detail:
            'o arquivo posiciona as seis ferramentas em y=75, 136,5, 198,6, 261,5, 323,5 e 385,5 — intervalos entre 61,5 e 62,1px. O componente usa um gap único de 37,5px, o que reproduz o intervalo médio.',
        },
        {
          subject: 'Realce ao pressionar',
          detail:
            'o arquivo é estático. Foi acrescentada redução de escala de 6% no :active, sem introduzir cor nova.',
        },
        {
          subject: 'Glifo do Flash',
          detail:
            'no arquivo o nó se chama “Union” e não “Flash Icon”, como os demais. Foi registrado como flash, com o nome original preservado em figmaName.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Coluna', role: 'Pilha vertical centralizada, a 90% de opacidade.' },
        { name: 'Glifo', role: 'Ícone de 24px em branco.', token: '--tik-icon-size-lg · --tik-color-text-on-immersive' },
        { name: 'Rótulo', role: 'Bold 10 em branco, sem tracking.', token: '--tik-font-tool-*' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="As seis ferramentas do arquivo" surface="immersive" gap={48}>
      <CameraToolRail>
        {tikCameraTools.map((tool) => (
          <CameraToolRail.Item key={tool.label} icon={tool.icon} label={tool.label} />
        ))}
      </CameraToolRail>
    </TikDocStage>
    <TikDocStage label="Coluna reduzida" surface="immersive" gap={48}>
      <CameraToolRail>
        <CameraToolRail.Item icon="flip" label="Flip" />
        <CameraToolRail.Item icon="flash" label="Flash" />
      </CameraToolRail>
    </TikDocStage>
    <TikDocStage label="Item isolado" surface="immersive" gap={48}>
      {tikCameraTools.map((tool) => (
        <CameraToolRail key={tool.label}>
          <CameraToolRail.Item icon={tool.icon} label={tool.label} />
        </CameraToolRail>
      ))}
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Mantenha a ordem das seis ferramentas do arquivo.',
        'Posicione a coluna na borda direita, alinhada ao topo da superfície da câmera.',
        'Use rótulos curtos: a coluna tem 32px de largura.',
      ]}
      donts={[
        'Não use a coluna sobre cromo claro: os glifos são brancos.',
        'Não acrescente tracking ao rótulo Bold 10.',
        'Não remova a opacidade de 90% do conjunto.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher initial="immersive">
      {() => (
        <CameraToolRail>
          {tikCameraTools.map((tool) => (
            <CameraToolRail.Item key={tool.label} icon={tool.icon} label={tool.label} />
          ))}
        </CameraToolRail>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="CameraToolRail"
      rows={[
        {
          name: 'children',
          type: "React.ReactNode",
          description:
            'Itens da coluna.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "React.HTMLAttributes<HTMLDivElement>",
          description:
            'Demais atributos HTML são repassados ao contêiner.',
        },
      ]}
    />
    <TikDocPropsTable
      title="CameraToolRail.Item"
      rows={[
        {
          name: 'icon',
          type: "TikIconName",
          description:
            'Glifo da ferramenta, exibido em 24px.',
        },
        {
          name: 'label',
          type: "React.ReactNode",
          description:
            'Rótulo sob o glifo, em Bold 10.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>",
          description:
            'Demais atributos são repassados ao <button>, incluindo onClick.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CameraToolRailDocumentationPage />,
};

/**
 * Playground com 100% das props do CameraToolRail expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do CameraToolRail',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 32,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <CameraToolRail {...args}>
        {tikCameraTools.map((tool) => (
          <CameraToolRail.Item key={tool.label} icon={tool.icon} label={tool.label} />
        ))}
      </CameraToolRail>
    </div>
  ),
};

/**
 * Playground do item, com todas as props expostas.
 */
export const PlaygroundItem: StoryObj<typeof CameraToolRail.Item> = {
  name: '🕹️ 2. Playground do CameraToolRail.Item',
  argTypes: {
    icon: {
      control: 'select',
      options: ['flip', 'speed', 'magicPen', 'filters', 'timer', 'flash'],
    },
    label: { control: 'text' },
  },
  args: { icon: 'flip', label: 'Flip' },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 32,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <CameraToolRail>
        <CameraToolRail.Item {...args} />
      </CameraToolRail>
    </div>
  ),
};

/**
 * Réplica visual da coluna do frame “TikTok Camera”, sobre a pré-visualização.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        position: 'relative',
        width: 414,
        height: 480,
        overflow: 'hidden',
        background: `center/cover no-repeat url(${tikCameraPreview})`,
        borderRadius: 'var(--tik-radius-surface)',
      }}
    >
      <div style={{ position: 'absolute', right: 16, top: 32 }}>
        <CameraToolRail>
          {tikCameraTools.map((tool) => (
            <CameraToolRail.Item key={tool.label} icon={tool.icon} label={tool.label} />
          ))}
        </CameraToolRail>
      </div>
    </div>
  ),
};

/**
 * Cada ferramenta isolada.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 40,
        padding: 32,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      {tikCameraTools.map((tool) => (
        <CameraToolRail key={tool.label}>
          <CameraToolRail.Item icon={tool.icon} label={tool.label} />
        </CameraToolRail>
      ))}
    </div>
  ),
};

/**
 * Composição modular com CameraToolRail.Item.
 */
export const ComposicaoModular: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 60,
        padding: 32,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <CameraToolRail>
        {tikCameraTools.map((tool) => (
          <CameraToolRail.Item key={tool.label} icon={tool.icon} label={tool.label} />
        ))}
      </CameraToolRail>
      <CameraToolRail>
        <CameraToolRail.Item icon="flip" label="Flip" />
        <CameraToolRail.Item icon="flash" label="Flash" />
      </CameraToolRail>
    </div>
  ),
};
