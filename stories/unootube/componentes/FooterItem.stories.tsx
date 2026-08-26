import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { FooterItem, Sidebar } from '../../../src/unootube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocAnatomy,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocSurfaceSwitcher,
} from '../../../.storybook/components';

const meta: Meta<typeof FooterItem> = {
  title: 'Unootube/Componentes/FooterItem',
  component: FooterItem,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
    className: { control: 'text' },
  },
  args: { label: 'About', href: '#' },
};

export default meta;

type Story = StoryObj<typeof FooterItem>;

const GROUP_ONE = ['About', 'Press', 'Copyright', 'Contact us', 'Creators', 'Advertise', 'Developers'];
const GROUP_TWO = ['Terms', 'Privacy', 'Policy & Safety', 'How Unootube works', 'Test new features'];

const FooterItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Navegação"
      title="FooterItem"
      description="Reprodução do nó Navigation/FooterItem (9:3231), o link institucional do rodapé da barra lateral. É o único uso de Roboto Bold 13 em todo o arquivo — uma combinação que a escala publica como Body/Small, mas em peso regular."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Onde o item aparece e o que o distingue."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="📄" title="Rodapé da barra lateral">
        O arquivo agrupa os links em três linhas que quebram naturalmente: institucionais, políticas
        e o aviso de direitos autorais.
      </UniDocCard>
      <UniDocCard icon="🔤" title="Bold 13, combinação única">
        Corpo do degrau Body/Small com peso Bold. Nenhum outro nó do arquivo usa esse par — o desvio
        está registrado na estória de Tipografia.
      </UniDocCard>
      <UniDocCard icon="↔️" title="Folga apenas à direita">
        O recuo é <code>0/8/0/0</code>: os itens se separam pela folga direita de cada um, e não por{' '}
        <code>gap</code> no contêiner. É o que permite a quebra fluida em várias linhas.
      </UniDocCard>
      <UniDocCard icon="🔗" title="Sempre uma âncora">
        Todos os itens navegam. O componente renderiza <code>&lt;a&gt;</code> sem alternativa de
        botão.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="9:3231"
      frameName="Navigation/FooterItem"
      specs={[
        { label: 'Dimensões', value: '35 × 15 (abraça o texto)' },
        { label: 'Recuo', value: '0 / 8 / 0 / 0' },
        { label: 'Rótulo', value: 'Roboto Bold 13 · #AAAAAA' },
        { label: 'Superfície', value: 'transparente' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Roboto Bold 13 fora da escala',
          detail:
            'a escala publica Body/Small como 13 Regular e Label/Medium como 12 Bold. O arquivo combina 13 com Bold neste nó, e em nenhum outro. O par literal foi preservado e anotado no CSS.',
        },
        {
          subject: 'Realce de hover',
          detail:
            'ausente no arquivo. O texto passa de --uni-color-text-secondary a -primary no hover, sem sublinhado, para não competir com o resto da barra lateral.',
        },
        {
          subject: 'Aviso de direitos autorais',
          detail:
            'a terceira linha do rodapé do arquivo é um texto solto, não uma instância deste componente. Nas composições, ele é montado localmente com o mesmo degrau tipográfico.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Âncora',
          role: 'Elemento em linha com folga de 8px à direita.',
          token: '--uni-spacing-8',
        },
        {
          name: 'Rótulo',
          role: 'Corpo de Body/Small em peso Bold, sobre texto secundário.',
          token: '--uni-font-body-sm-size · --uni-font-weight-bold',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: os três grupos do rodapé" surface="secondary" direction="column" align="stretch">
      <Sidebar.Footer>
        <Sidebar.FooterRow>
          {GROUP_ONE.map((label) => (
            <FooterItem key={label} label={label} href="#" />
          ))}
        </Sidebar.FooterRow>
        <Sidebar.FooterRow>
          {GROUP_TWO.map((label) => (
            <FooterItem key={label} label={label} href="#" />
          ))}
        </Sidebar.FooterRow>
        <Sidebar.FooterRow>
          <FooterItem label="© 2026 Unooria LLC" href="#" />
        </Sidebar.FooterRow>
      </Sidebar.Footer>
    </UniDocStage>
    <UniDocStage label="Item isolado" surface="secondary" gap={16}>
      <FooterItem label="About" href="#" />
      <FooterItem label="Press" href="#" />
      <FooterItem label="Copyright" href="#" />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Agrupe os itens com Sidebar.FooterRow para que quebrem naturalmente.',
        'Mantenha os rótulos curtos: a coluna do rodapé tem 176px úteis.',
        'Use href real em todos os itens — todos navegam.',
        'Preserve o peso Bold: é o que distingue o rodapé do resto da barra lateral.',
      ]}
      donts={[
        'Não use gap no contêiner: a separação vem da folga direita de cada item.',
        'Não transforme o item em botão — o arquivo o publica como link.',
        'Não sublinhe o item no hover; a mudança de cor basta.',
        'Não use este degrau tipográfico fora do rodapé.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O item sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['secondary', 'primary', 'deep']}>
      {() => (
        <div style={{ display: 'flex', flexWrap: 'wrap', width: 200 }}>
          {GROUP_ONE.slice(0, 5).map((label) => (
            <FooterItem key={label} label={label} href="#" />
          ))}
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="FooterItem"
      rows={[
        { name: 'label', type: 'React.ReactNode', description: 'Texto do item.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.AnchorHTMLAttributes<HTMLAnchorElement>',
          description: 'Demais atributos são repassados ao <a>, incluindo href, target e rel.',
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
  render: () => <FooterItemDocumentationPage />,
};

/**
 * Playground com 100% das props do FooterItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do FooterItem',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
        background: 'var(--uni-color-background-secondary)',
      }}
    >
      <FooterItem {...args} />
    </div>
  ),
};

/**
 * Réplica visual do rodapé da barra lateral do frame `Home` (3:185).
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 24, background: 'var(--uni-color-background-secondary)', width: 240 }}
    >
      <Sidebar.Footer>
        <Sidebar.FooterRow>
          {GROUP_ONE.map((label) => (
            <FooterItem key={label} label={label} href="#" />
          ))}
        </Sidebar.FooterRow>
        <Sidebar.FooterRow>
          {GROUP_TWO.map((label) => (
            <FooterItem key={label} label={label} href="#" />
          ))}
        </Sidebar.FooterRow>
        <Sidebar.FooterRow>
          <FooterItem label="© 2026 Unooria LLC" href="#" />
        </Sidebar.FooterRow>
      </Sidebar.Footer>
    </div>
  ),
};
