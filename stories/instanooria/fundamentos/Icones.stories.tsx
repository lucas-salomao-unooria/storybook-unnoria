import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Icon,
  instaIcons,
  instaIconNames,
  type InstaIconName,
} from '../../../src/instanooria/components/Icon';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';

/**
 * Agrupamento funcional dos glifos para navegação na galeria.
 */
const ICON_GROUPS: { title: string; description: string; names: InstaIconName[] }[] = [
  {
    title: 'Navegação principal',
    description: 'Glifos das cinco abas da barra inferior, com seus pares preenchidos.',
    names: ['home', 'search', 'searchFilled', 'add', 'heart', 'heartFilled'],
  },
  {
    title: 'Ações de publicação',
    description: 'Ações do rodapé do post e selo de conta oficial.',
    names: ['heart', 'heartFilled', 'comment', 'share', 'bookmark', 'bookmarkFilled', 'more', 'verified'],
  },
  {
    title: 'Barra superior',
    description: 'Atalhos do topo do Feed, do perfil e da caixa de mensagens.',
    names: ['camera', 'igtv', 'back', 'close', 'chevronDown', 'menu', 'lock', 'addChat'],
  },
  {
    title: 'Perfil e conteúdo',
    description: 'Abas do perfil, indicadores de mídia e criação de destaque.',
    names: ['grid', 'tagged', 'video', 'plus', 'cameraCircle', 'searchSmall'],
  },
  {
    title: 'Menu lateral',
    description: 'Itens do menu deslizante do perfil e do seu rodapé.',
    names: ['archive', 'activity', 'nametag', 'closeFriends', 'discover', 'facebook', 'settings'],
  },
];

/**
 * Célula da galeria com cópia do nome do glifo.
 */
const IconCell: React.FC<{ name: InstaIconName; size: number; tone: 'primary' | 'secondary' | 'link' | 'like' }> = ({
  name,
  size,
  tone,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard?.writeText(`<Icon name="${name}" />`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={instaIcons[name].figmaName}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        padding: '18px 10px',
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
      }}
    >
      <Icon name={name} size={size} tone={tone} />
      <span
        style={{
          fontSize: 11.5,
          color: '#22272A',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          wordBreak: 'break-all',
          textAlign: 'center',
        }}
      >
        {name}
      </span>
      <span style={{ fontSize: 10.5, color: copied ? '#01B574' : '#475157' }}>
        {copied ? '✓ Copiado' : instaIcons[name].viewBox}
      </span>
    </button>
  );
};

/**
 * Página de documentação rica da biblioteca de ícones do Instanooria.
 */
const IconesDocumentationPage = () => {
  const [size, setSize] = useState(24);
  const [tone, setTone] = useState<'primary' | 'secondary' | 'link' | 'like'>('primary');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Instanooria"
        category="Fundamentos • Iconografia"
        title="Ícones"
        description="Biblioteca de 32 glifos do Instanooria. Todo dado vetorial foi exportado diretamente dos assets SVG do arquivo Figma — nenhum caminho foi redesenhado à mão —, preservando o viewBox original de cada camada e, com ele, a proporção exata do design."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Como a biblioteca foi construída e como consumi-la corretamente."
      />
      <InstaDocGrid>
        <InstaDocCard icon="🎯" title="Vetor exportado, não redesenhado">
          Cada glifo carrega o atributo <code>d</code> literal do export do Figma. Redesenhar um
          ícone à mão produziria proporções e raios diferentes dos do design.
        </InstaDocCard>
        <InstaDocCard icon="📐" title="viewBox preservado">
          Os glifos não são normalizados para 24×24. O <code>viewBox</code> original é mantido (ex.:{' '}
          <code>0 0 23.6596 20.5762</code> no coração), o que garante o mesmo peso óptico do arquivo.
        </InstaDocCard>
        <InstaDocCard icon="🎨" title="currentColor por padrão">
          O preenchimento herda <code>currentColor</code>, permitindo colorir por contexto. A única
          exceção é o selo de conta oficial, cujo azul é fixo nos dois temas.
        </InstaDocCard>
        <InstaDocCard icon="♿" title="Decorativo por padrão">
          Sem a prop <code>title</code>, o glifo recebe <code>aria-hidden</code>. Com{' '}
          <code>title</code>, vira <code>role=&quot;img&quot;</code> com rótulo acessível.
        </InstaDocCard>
      </InstaDocGrid>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Origem dos assets vetoriais dentro do arquivo de design."
      />
      <InstaDocFigmaSpecs
        nodeId="0:1724"
        frameName="Tab Bar / Top Bar / Post / Profile Menu"
        specs={[
          { label: 'Glifos', value: `${instaIconNames.length}` },
          { label: 'Formato', value: 'SVG path exportado' },
          { label: 'Tamanho padrão', value: '24px' },
          { label: 'Tamanhos nomeados', value: 'sm 16 · md 24 · lg 28' },
          { label: 'Cor', value: 'currentColor' },
          { label: 'Cor fixa', value: 'verified · #3897F0' },
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Galeria Completa"
        description="Clique em qualquer glifo para copiar a chamada JSX correspondente."
        actions={
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ fontSize: 12, color: '#475157', display: 'flex', gap: 8, alignItems: 'center' }}>
              Tamanho
              <input
                type="range"
                min={12}
                max={48}
                value={size}
                onChange={(event) => setSize(Number(event.target.value))}
              />
              <span style={{ minWidth: 34, fontWeight: 700, color: '#22272A' }}>{size}px</span>
            </label>
            <select
              value={tone}
              onChange={(event) => setTone(event.target.value as typeof tone)}
              style={{
                fontSize: 12,
                padding: '6px 10px',
                borderRadius: 8,
                border: '1px solid #E4E8E9',
                color: '#22272A',
              }}
            >
              <option value="primary">Tom: primary</option>
              <option value="secondary">Tom: secondary</option>
              <option value="link">Tom: link</option>
              <option value="like">Tom: like</option>
            </select>
          </div>
        }
      />

      {ICON_GROUPS.map((group) => (
        <div key={group.title} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 15, margin: '0 0 4px 0', color: '#22272A' }}>{group.title}</h3>
          <p style={{ fontSize: 13, color: '#475157', margin: '0 0 12px 0', lineHeight: 1.6 }}>
            {group.description}
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: 12,
            }}
          >
            {group.names.map((name) => (
              <IconCell key={`${group.title}-${name}`} name={name} size={size} tone={tone} />
            ))}
          </div>
        </div>
      ))}

      <UnooriaDocSectionHeader
        title="4. Matriz de Tamanhos e Tons"
        description="Os três tamanhos nomeados e os seis tons semânticos disponíveis."
      />
      <div
        style={{
          display: 'flex',
          gap: 32,
          flexWrap: 'wrap',
          padding: 24,
          border: '1px solid #E4E8E9',
          borderRadius: 12,
          marginBottom: 32,
          backgroundColor: '#F5F5F5',
        }}
      >
        {(['sm', 'md', 'lg'] as const).map((namedSize) => (
          <div key={namedSize} style={{ textAlign: 'center' }}>
            <Icon name="heart" size={namedSize} />
            <div style={{ fontSize: 12, color: '#475157', marginTop: 8 }}>{namedSize}</div>
          </div>
        ))}
        {(['primary', 'secondary', 'link', 'like'] as const).map((namedTone) => (
          <div key={namedTone} style={{ textAlign: 'center' }}>
            <Icon name="heartFilled" size="md" tone={namedTone} />
            <div style={{ fontSize: 12, color: '#475157', marginTop: 8 }}>{namedTone}</div>
          </div>
        ))}
      </div>

      <UnooriaDocSectionHeader
        title="5. Boas Práticas"
        description="Regras de uso da iconografia verificadas contra o arquivo de design."
      />
      <InstaDocPractices
        dos={[
          'Usar o par preenchido (heartFilled, bookmarkFilled, searchFilled) para indicar estado ativo.',
          'Informar title quando o ícone for a única indicação da ação disponível.',
          'Deixar o glifo herdar currentColor do botão que o contém.',
          'Manter o alvo de toque em 44px mesmo quando o glifo tem 24px.',
        ]}
        donts={[
          'Redesenhar um glifo à mão ou substituí-lo por um de outra biblioteca.',
          'Normalizar o viewBox para 24×24: isso distorce a proporção original.',
          'Aplicar rotação ou espelhamento para "criar" um glifo que não existe no arquivo.',
          'Sobrescrever a cor do selo de conta oficial.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a Temas"
        description="Os tons primary e secondary invertem automaticamente entre Classic e Dark."
      />
      <InstaDocThemeSwitcher>
        {(activeTheme) => (
          <>
            {(['home', 'search', 'add', 'heart', 'bookmark', 'verified'] as InstaIconName[]).map(
              (name) => (
                <Icon key={name} name={name} size={26} theme={activeTheme} />
              )
            )}
          </>
        )}
      </InstaDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente Icon."
      />
      <InstaDocPropsTable
        title="Icon"
        rows={[
          {
            name: 'name',
            type: 'InstaIconName',
            description: 'Nome do glifo na biblioteca exportada do Figma. Obrigatório.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg' | number",
            default: "'md'",
            description: 'Tamanho nomeado (16/24/28px) ou valor em pixels.',
          },
          {
            name: 'tone',
            type: "'primary' | 'secondary' | 'link' | 'like' | 'inverse' | 'inherit'",
            default: "'primary'",
            description: 'Tom semântico aplicado ao preenchimento do glifo.',
          },
          {
            name: 'theme',
            type: "'light' | 'dark'",
            default: "'light'",
            description: 'Tema usado para resolver as variáveis de cor.',
          },
          {
            name: 'title',
            type: 'string',
            description:
              'Rótulo acessível. Quando ausente, o glifo é decorativo e recebe aria-hidden.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'Classe CSS adicional aplicada ao elemento <svg>.',
          },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Icon> = {
  title: 'Instanooria/Fundamentos/Ícones',
  component: Icon,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: {
      control: 'select',
      options: instaIconNames,
      description: 'Nome do glifo na biblioteca exportada do Figma.',
    },
    size: {
      control: { type: 'range', min: 12, max: 64, step: 1 },
      description: 'Tamanho do glifo em pixels.',
    },
    tone: {
      control: 'radio',
      options: ['primary', 'secondary', 'link', 'like', 'inverse', 'inherit'],
      description: 'Tom semântico aplicado ao preenchimento.',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual do componente.',
    },
    title: { control: 'text', description: 'Rótulo acessível do glifo.' },
  },
  args: {
    name: 'heart',
    size: 32,
    tone: 'primary',
    theme: 'light',
    title: '',
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

/**
 * Documentação rica e completa da iconografia baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <IconesDocumentationPage />,
};

/**
 * Playground com todas as propriedades do componente Icon expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Icon',
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <Icon {...args} title={args.title || undefined} />
    </div>
  ),
};

/**
 * Galeria completa dos 32 glifos disponíveis.
 */
export const TodosOsGlifos: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 12,
      }}
    >
      {instaIconNames.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: 16,
            border: '1px solid #E4E8E9',
            borderRadius: 12,
          }}
        >
          <Icon name={name} size={26} />
          <span
            style={{
              fontSize: 11,
              color: '#475157',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              wordBreak: 'break-all',
              textAlign: 'center',
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};
