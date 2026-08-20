import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { RecordButton } from '../../../src/tiktooria';
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
import { tikCameraPreview } from '../fixtures';

const meta: Meta<typeof RecordButton> = {
  title: 'Tik Tooria/Componentes/RecordButton',
  component: RecordButton,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: { type: 'range', min: 48, max: 140, step: 2 } },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
  args: {
    size: 80,
    label: 'Gravar',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof RecordButton>;


const RecordButtonDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Câmera"
      title="RecordButton"
      description="Botão de gravação de 80px da câmera: disco de raio 32 em --tik-color-brand-button dentro de um anel de 6px do mesmo tom, com o vão transparente entre os dois. As duas medidas são literais do arquivo."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="⏺️" title="Duas circunferências">
        Disco central de raio 32 e anel de 6px inscrito no raio 37. O vão entre os dois é transparente, deixando ver a câmera.
      </TikDocCard>
      <TikDocCard icon="🎯" title="Alvo de 80px">
        É o maior alvo de toque do módulo — coerente com a ação mais importante da tela de câmera.
      </TikDocCard>
      <TikDocCard icon="🎨" title="Uma única cor">
        Anel e disco usam o mesmo <code>--tik-color-brand-button</code>. O arquivo não publica variante de gravação em andamento.
      </TikDocCard>
      <TikDocCard icon="🤏" title="Realce ao pressionar">
        Redução de escala de 4% no <code>:active</code>, acrescentada porque o arquivo é estático.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:695"
      frameName="Record Button — TikTok Camera"
      specs={[
        { label: 'Dimensões', value: '80 × 80' },
        { label: 'Disco central', value: 'raio 32' },
        { label: 'Anel', value: '6px, raio 37' },
        { label: 'Cor', value: '#EA4359' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Estado de gravação',
          detail:
            'o arquivo não publica variante “gravando” (quadrado de parada, progresso circular). O componente não a inventa; um produto que precise dela deve compor por cima.',
        },
        {
          subject: 'Realce ao pressionar',
          detail:
            'o arquivo é estático. Foi acrescentada redução de escala no :active, sem introduzir cor nova.',
        },
        {
          subject: 'Anel expresso em porcentagem',
          detail:
            'o inset de 3,75% reproduz o raio 37 no diâmetro de 80px e mantém a proporção quando size muda.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Anel', role: 'Contorno de 6px inscrito, deixando o vão transparente.', token: '--tik-color-brand-button' },
        { name: 'Disco central', role: 'Círculo preenchido a 80% do diâmetro.', token: '--tik-color-brand-button' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Diâmetro oficial de 80px" surface="immersive" gap={40}>
      <RecordButton />
      <RecordButton disabled />
    </TikDocStage>
    <TikDocStage label="Escalas alternativas" surface="immersive" gap={40}>
      {[56, 80, 104, 128].map((size) => (
        <RecordButton key={size} size={size} />
      ))}
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Mantenha o diâmetro de 80px na tela de câmera.',
        'Informe label quando a ação não estiver clara pelo contexto.',
        'Centralize o botão na base da superfície da câmera, como no arquivo.',
      ]}
      donts={[
        'Não pinte o vão entre anel e disco.',
        'Não use cores diferentes no anel e no disco.',
        'Não invente estado de gravação em andamento: componha por cima, se necessário.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher initial="immersive">
      {() => (
        <RecordButton />
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="RecordButton"
      rows={[
        {
          name: 'size',
          type: "number",
          default: "80",
          description:
            'Diâmetro em pixels. O arquivo publica 80px.',
        },
        {
          name: 'label',
          type: "string",
          default: "Gravar",
          description:
            'Rótulo acessível do botão.',
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
            'Demais atributos são repassados ao <button>, incluindo onClick e disabled.',
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
  render: () => <RecordButtonDocumentationPage />,
};

/**
 * Playground com 100% das props do RecordButton expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do RecordButton',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <RecordButton {...args} />
    </div>
  ),
};

/**
 * Réplica visual do frame oficial do Figma, sobre a pré-visualização exportada.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: 414,
        height: 240,
        paddingBottom: 24,
        overflow: 'hidden',
        background: `center/cover no-repeat url(${tikCameraPreview})`,
        borderRadius: 'var(--tik-radius-surface)',
      }}
    >
      <RecordButton />
    </div>
  ),
};

/**
 * Repouso e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 48,
        padding: 40,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <RecordButton />
      <RecordButton disabled />
    </div>
  ),
};

/**
 * Comparação de diâmetros.
 */
export const Tamanhos: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 40,
        alignItems: 'center',
        padding: 40,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      {[56, 80, 104, 128].map((size) => (
        <RecordButton key={size} size={size} />
      ))}
    </div>
  ),
};
