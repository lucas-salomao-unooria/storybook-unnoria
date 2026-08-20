import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Button, Scanner } from '../../../src/tiktooria';
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

const meta: Meta<typeof Scanner> = {
  title: 'Tik Tooria/Componentes/Scanner',
  component: Scanner,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: { type: 'range', min: 160, max: 320, step: 5 } },
    hint: { control: 'text' },
    scrim: { control: 'boolean' },
    className: { control: 'text' },
  },
  args: {
    size: 250,
    hint: 'Align QR code in frame to scan',
    scrim: true,
  },
};

export default meta;

type Story = StoryObj<typeof Scanner>;


const ScannerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Leitor de QR"
      title="Scanner"
      description="Moldura de 250px do leitor de QR, com as quatro cantoneiras exportadas literalmente do nó 4:750. O véu do arquivo é uma operação booleana — retângulo de 414×896 menos o quadrado de 250px — reproduzido aqui por uma sombra expandida que produz o mesmo recorte sem exigir um segundo nó em tela cheia."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="⬜" title="Quatro cantoneiras">
        Cada canto é um caminho de 19px com raio, exportado do arquivo. Não são bordas: é um único vetor de quatro formas.
      </TikDocCard>
      <TikDocCard icon="🌫️" title="Véu recortado">
        A sombra de raio 0 e alcance de 9999px preenche tudo ao redor da moldura, reproduzindo a subtração booleana do arquivo.
      </TikDocCard>
      <TikDocCard icon="🔤" title="Dica em Regular 13">
        Texto branco centralizado sob a moldura, a 16px da borda inferior.
      </TikDocCard>
      <TikDocCard icon="🔍" title="Área de leitura livre">
        O interior da moldura fica transparente, deixando a câmera visível.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:749"
      frameName="Scanner — TikTok QR Code Scanner"
      specs={[
        { label: 'Moldura', value: '250 × 250' },
        { label: 'Cantoneiras', value: '19px, raio 1,5' },
        { label: 'Véu', value: 'preto 40%' },
        { label: 'Dica', value: 'Regular 13 · branco' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Véu por sombra expandida',
          detail:
            'o arquivo usa uma BOOLEAN_OPERATION de subtração entre um retângulo de tela cheia e o quadrado de 250px. Reproduzido com box-shadow de raio 0 e alcance de 9999px, que dá o mesmo recorte e funciona em qualquer tamanho de contêiner.',
        },
        {
          subject: 'Dica fora do véu',
          detail:
            'no arquivo a dica fica dentro do frame Scanner, sobre o véu. Aqui ela é irmã da moldura, para não ser coberta pela sombra expandida.',
        },
        {
          subject: 'Barra superior de sistema',
          detail:
            'a tela do leitor usa SF Pro Text no título “Scan” e no link “Photos”, e não a família do produto. Isso está registrado nos degraus de sistema da estória de Tipografia.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Moldura', role: 'Quadrado de 250px com as quatro cantoneiras.', token: '--tik-scanner-size · glifo scannerBrackets' },
        { name: 'Véu', role: 'Sombra expandida que escurece tudo ao redor.', token: '--tik-color-scrim' },
        { name: 'Dica', role: 'Texto em Regular 13 sob a moldura.', token: '--tik-font-meta-* · --tik-color-text-on-immersive' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Como no arquivo — com véu e dica" surface="immersive" padding={48}>
      <Scanner hint="Align QR code in frame to scan" />
    </TikDocStage>
    <TikDocStage label="Sem véu" surface="immersive" padding={48}>
      <Scanner scrim={false} hint="Align QR code in frame to scan" />
    </TikDocStage>
    <TikDocStage label="Sem dica e em tamanhos alternativos" surface="immersive" padding={48} gap={48}>
      <Scanner scrim={false} size={180} />
      <Scanner scrim={false} size={250} />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Mantenha a moldura de 250px, medida do arquivo.',
        'Informe hint com uma instrução curta, como o arquivo faz.',
        'Coloque o leitor sobre a pré-visualização da câmera, centralizado.',
        'Desligue scrim quando o componente estiver dentro de um palco que já tem véu.',
      ]}
      donts={[
        'Não pinte o interior da moldura.',
        'Não substitua as cantoneiras por uma borda contínua.',
        'Não use o leitor sobre cromo claro.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher initial="immersive" padding={48}>
      {() => (
        <Scanner scrim={false} hint="Align QR code in frame to scan" />
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="Scanner"
      rows={[
        {
          name: 'size',
          type: "number",
          default: "250",
          description:
            'Lado da moldura em pixels. O arquivo publica 250px.',
        },
        {
          name: 'hint',
          type: "React.ReactNode",
          description:
            'Dica exibida sob a moldura, em Regular 13.',
        },
        {
          name: 'scrim',
          type: "boolean",
          default: "true",
          description:
            'Aplica o véu ao redor da moldura, reproduzindo a operação booleana do arquivo.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>",
          description:
            'Demais atributos HTML são repassados ao contêiner.',
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
  render: () => <ScannerDocumentationPage />,
};

/**
 * Playground com 100% das props do Scanner expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Scanner',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: 414,
        padding: 60,
        overflow: 'hidden',
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <Scanner {...args} />
    </div>
  ),
};

/**
 * Réplica visual da tela “TikTok QR Code Scanner” do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 414,
        height: 600,
        paddingTop: 120,
        paddingBottom: 40,
        overflow: 'hidden',
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <Scanner hint="Align QR code in frame to scan" />
      <div style={{ position: 'relative' }}>
        <Button variant="floating" fixedWidth={false} icon="plus">
          My TikCode
        </Button>
      </div>
    </div>
  ),
};

/**
 * Com véu, sem véu e sem dica.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 60,
        flexWrap: 'wrap',
        padding: 60,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <Scanner scrim={false} hint="Align QR code in frame to scan" />
      <Scanner scrim={false} />
    </div>
  ),
};

/**
 * Comparação de tamanhos de moldura.
 */
export const Tamanhos: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 48,
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 48,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      {[160, 200, 250, 300].map((size) => (
        <Scanner key={size} size={size} scrim={false} />
      ))}
    </div>
  ),
};
