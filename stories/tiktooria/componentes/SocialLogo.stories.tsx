import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { ShareAction, SocialLogo } from '../../../src/tiktooria';
import type { TikSocialBrand } from '../../../src/tiktooria';
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

const meta: Meta<typeof SocialLogo> = {
  title: 'Tik Tooria/Componentes/SocialLogo',
  component: SocialLogo,
  parameters: { layout: 'padded' },
  argTypes: {
    brand: {
      control: 'select',
      options: ['whatsapp', 'messenger', 'message', 'sms', 'instagram', 'facebook'],
    },
    size: { control: { type: 'range', min: 24, max: 96, step: 1 } },
    title: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    brand: 'whatsapp',
    size: 47,
    title: '',
  },
};

export default meta;

type Story = StoryObj<typeof SocialLogo>;


const SocialLogoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Folha"
      title="SocialLogo"
      description="Os seis logotipos de terceiros presentes no arquivo de design: WhatsApp, Messenger, Message, SMS, Instagram e Facebook. Todos são vetores literais do Figma; nenhum foi redesenhado. A paleta é exclusiva da folha de compartilhamento e da tela “Find friends” — é proibido reaproveitá-la em qualquer outro componente."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🔒" title="Vetores literais">
        Cada logotipo é o export SVG do nó de origem. Nenhum caminho foi aproximado nem substituído por uma biblioteca de marcas.
      </TikDocCard>
      <TikDocCard icon="🌈" title="Instagram com gradiente">
        O disco usa um gradiente radial de quatro paradas, declarado no <code>&lt;defs&gt;</code> do SVG porque <code>url(#…)</code> não pode vir de uma variável CSS.
      </TikDocCard>
      <TikDocCard icon="☁️" title="SMS com sombra">
        É o único logotipo com efeito no arquivo: <code>--tik-elevation-logo</code>, preto a 5%.
      </TikDocCard>
      <TikDocCard icon="📐" title="Três diâmetros">
        47px (WhatsApp, Messenger), 49px (Message, SMS, Instagram) e 54px (Facebook), conforme o nó de origem.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:887"
      frameName="Social — TikTok Share to"
      specs={[
        { label: 'Logotipos', value: '6' },
        { label: 'Diâmetros', value: '47 · 49 · 54' },
        { label: 'Gradiente', value: 'Instagram, radial de 4 paradas' },
        { label: 'Efeito', value: 'SMS, preto 5%' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Centro do gradiente do Instagram',
          detail:
            'o arquivo declara o gradiente sem centro explícito. O SVG usa cx=0,3 / cy=1,07, posição canônica da marca, mantendo as quatro paradas literais.',
        },
        {
          subject: 'Disco de reserva do Facebook removido',
          detail:
            'o nó do Facebook empilha um disco #C4C4C4 (reserva de mídia) sob o disco branco. Só o branco foi preservado: uma camada invisível não entra no pacote.',
        },
        {
          subject: 'Elipse sobreposta no SMS',
          detail:
            'o arquivo empilha um caminho de balão e uma elipse branca no logotipo de SMS. Os dois nós foram preservados na ordem original, inclusive a sobreposição.',
        },
        {
          subject: 'Marcas de terceiros',
          detail:
            'os logotipos são marcas registradas de seus detentores e estão presentes por fidelidade ao arquivo comunitário de origem. Um produto que publique a folha deve verificar as próprias permissões de uso.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Disco', role: 'Círculo preenchido na cor da marca, ou gradiente no caso do Instagram.', token: '--tik-color-social-*' },
        { name: 'Glifo', role: 'Caminho do logotipo em branco, sobre o disco.' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Os seis logotipos, nos diâmetros do arquivo" surface="sheet" gap={20}>
      <SocialLogo brand="whatsapp" size={47} title="WhatsApp" />
      <SocialLogo brand="messenger" size={47} title="Messenger" />
      <SocialLogo brand="message" size={49} title="Message" />
      <SocialLogo brand="sms" size={49} title="SMS" />
      <SocialLogo brand="instagram" size={49} title="Instagram" />
      <SocialLogo brand="facebook" size={54} title="Facebook" />
    </TikDocStage>
    <TikDocStage label="Comparação de escalas" surface="sheet" gap={20}>
      {[24, 36, 47, 64, 80].map((size) => (
        <SocialLogo key={size} brand="instagram" size={size} />
      ))}
    </TikDocStage>
    <TikDocStage label="Dentro do alvo de compartilhamento" surface="sheet" gap={20}>
      <ShareAction label="WhatsApp" media={<SocialLogo brand="whatsapp" />} />
      <ShareAction label="Instagram" media={<SocialLogo brand="instagram" size={49} />} />
      <ShareAction label="SMS" media={<SocialLogo brand="sms" size={49} />} />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use o diâmetro do arquivo para cada marca: 47, 49 ou 54px.',
        'Informe title quando o logotipo for o único rótulo do alvo.',
        'Passe o logotipo pelo slot media do ShareAction, nunca dentro do disco cinza.',
      ]}
      donts={[
        'Não recolora os logotipos: as cores são das marcas.',
        'Não use --tik-color-social-* fora da folha de compartilhamento e de “Find friends”.',
        'Não redesenhe um logotipo ausente do arquivo — acrescente-o exportando o vetor do Figma.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['sheet', 'chrome', 'immersive']}>
      {() => (
        <>
          {(
            ['whatsapp', 'messenger', 'message', 'sms', 'instagram', 'facebook'] as TikSocialBrand[]
          ).map((brand) => (
            <SocialLogo key={brand} brand={brand} size={47} />
          ))}
        </>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="SocialLogo"
      rows={[
        {
          name: 'brand',
          type: "TikSocialBrand",
          description:
            'Marca representada. Valores: whatsapp, messenger, message, sms, instagram e facebook.',
        },
        {
          name: 'size',
          type: "number",
          default: "47",
          description:
            'Diâmetro em pixels. O arquivo usa 47, 49 e 54.',
        },
        {
          name: 'title',
          type: "string",
          description:
            'Rótulo acessível. Quando omitido, o logotipo é decorativo (aria-hidden).',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "Omit<React.SVGProps<SVGSVGElement>, 'ref'>",
          description:
            'Demais atributos SVG são repassados ao <svg>.',
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
  render: () => <SocialLogoDocumentationPage />,
};

/**
 * Playground com 100% das props do SocialLogo expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SocialLogo',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
        background: 'var(--tik-color-surface-sheet)',
      }}
    >
      <SocialLogo {...args} title={args.title || undefined} />
    </div>
  ),
};

/**
 * Réplica visual da faixa de terceiros da folha “Share to” do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: 414,
        padding: '20px 16px',
        background: 'var(--tik-color-surface-sheet)',
      }}
    >
      <ShareAction label="WhatsApp" media={<SocialLogo brand="whatsapp" />} />
      <ShareAction label="WhatsApp status" media={<SocialLogo brand="whatsapp" />} />
      <ShareAction label="Message" media={<SocialLogo brand="message" size={49} />} />
      <ShareAction label="SMS" media={<SocialLogo brand="sms" size={49} />} />
      <ShareAction label="Messenger" media={<SocialLogo brand="messenger" />} />
      <ShareAction label="Instagram" media={<SocialLogo brand="instagram" size={49} />} />
    </div>
  ),
};

/**
 * Os seis logotipos do arquivo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 24 }}>
      {(
        ['whatsapp', 'messenger', 'message', 'sms', 'instagram', 'facebook'] as TikSocialBrand[]
      ).map((brand) => (
        <div key={brand} style={{ textAlign: 'center' }}>
          <SocialLogo brand={brand} size={brand === 'facebook' ? 54 : 49} title={brand} />
          <div
            style={{
              fontFamily: 'var(--tik-font-sans)',
              fontSize: 11,
              color: 'var(--tik-color-text-secondary)',
              marginTop: 6,
            }}
          >
            {brand}
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Comparação de diâmetros.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', padding: 24 }}>
      {[24, 36, 47, 49, 54, 80].map((size) => (
        <SocialLogo key={size} brand="instagram" size={size} />
      ))}
    </div>
  ),
};
