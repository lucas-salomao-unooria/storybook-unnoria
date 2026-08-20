import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { gptGlyphs, type GptGlyphName } from '../../../src/chatgpt/tokens/glyphs';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  GptDocCard,
  GptDocGrid,
  GptDocFigmaSpecs,
  GptDocPractices,
  GptDocPropsTable,
  GptDocStage,
  GptDocThemeSwitcher,
} from '../../../.storybook/components';
import {
  ChatInput,
  IconButton,
  NavItem,
  SearchInput,
  Sidebar,
  Tag,
} from '../../../src/chatgpt/components';
import { gptFigmaNodes } from '../fixtures';

/** Origem de cada glifo dentro da página `🟡 Design system`. */
const ORIGEM: Record<GptGlyphName, { camada: string; uso: string }> = {
  close: { camada: 'IconButton/Default → ✕', uso: 'Fechar diálogo e limpar campo' },
  arrowRight: { camada: 'IconButton/Primary → →', uso: 'Avançar para o próximo passo' },
  send: { camada: 'ChatInput → SendButton → ↑', uso: 'Enviar a mensagem do compositor' },
  sparkle: { camada: 'Tag → ✦', uso: 'Marcar sugestão de prompt' },
  search: { camada: 'SearchInput → ⌕', uso: 'Buscar conversas' },
  plus: { camada: 'Sidebar → NewChatButton → +', uso: 'Iniciar nova conversa' },
  chat: { camada: 'NavItem → 💬', uso: 'Identificar uma conversa na barra lateral' },
};

const NOMES = Object.keys(gptGlyphs) as GptGlyphName[];

/**
 * Página de documentação rica dos glifos.
 */
const GlifosDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Fundamentos • Glifos"
      title="Glifos"
      description="O arquivo de design não publica uma biblioteca de ícones vetoriais: os componentes da página 🟡 Design system usam caracteres tipográficos em camadas de texto Inter Regular como ícone. Estes são os sete caracteres literais lidos dessas camadas — reproduzi-los é o caminho fiel, e evita desenhar vetores que não existem no arquivo."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Por que a seção existe e o que ela não é."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="🔤" title="Glifos, não ícones">
        Cada símbolo é um caractere Unicode renderizado pela própria fonte Inter — o arquivo não
        contém nós vetoriais de ícone na página do design system.
      </GptDocCard>
      <GptDocCard icon="🧾" title="Constante tipada">
        Exportados em <code>gptGlyphs</code>, com <code>GptGlyphName</code> como união dos nomes.
        Os componentes recebem o glifo por prop (<code>glyph</code>, <code>sendGlyph</code>,{' '}
        <code>children</code>).
      </GptDocCard>
      <GptDocCard icon="🚫" title="Nada desenhado à mão">
        Nenhum <code>&lt;path&gt;</code> foi inventado. Se um símbolo não existe no arquivo, ele
        não existe na biblioteca.
      </GptDocCard>
      <GptDocCard icon="🔁" title="Substituição">
        Toda prop de glifo aceita <code>ReactNode</code>: um produto que já tenha família de ícones
        vetoriais pode injetá-la sem alterar o componente.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Camadas de origem de cada caractere."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.page}
      frameName="🟡 Design system (camadas TEXT dos componentes)"
      specs={[
        { label: 'Glifos catalogados', value: '7' },
        { label: 'Fonte', value: 'Inter Regular' },
        { label: 'Corpos usados', value: '12 · 14 · 16 · 18 · 20px' },
        { label: 'Ícones vetoriais', value: 'nenhum na página' },
        { label: 'Alinhamento', value: 'centralizado no alvo de toque' },
        { label: 'Cor', value: 'herdada do componente' },
      ]}
      deviations={[
        'A régua size/icon-* de Primitives/Sizing (12/16/20/24/32) existe na coleção, mas o arquivo a aplica apenas como corpo de fonte dos glifos — não há nó de ícone dimensionado por ela.',
        'A página 🟪 ChatGPT Web Client contém as 19 telas do produto inteiramente achatadas em 4.516 nós vetoriais, sem camadas de texto nem componentes. Ela não é fonte de ícone utilizável e não foi usada nesta implementação.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia dos Glifos"
      description="O caractere, o nome do token e a camada de origem."
      barColor="#5856D6"
    />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 14,
        marginBottom: 32,
      }}
    >
      {NOMES.map((name) => (
        <div
          key={name}
          style={{
            border: '1px solid #E4E8E9',
            borderRadius: 12,
            padding: 16,
            background: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 32, lineHeight: 1, color: '#000000' }}>{gptGlyphs[name]}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#22272A', marginTop: 12 }}>
            {name}
          </div>
          <div
            style={{
              fontSize: 11,
              color: '#475157',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              marginTop: 4,
            }}
          >
            gptGlyphs.{name}
          </div>
          <div style={{ fontSize: 11, color: '#5856D6', marginTop: 6 }}>{ORIGEM[name].camada}</div>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="4. Matriz de Corpos"
      description="Os cinco corpos de glifo usados pelos componentes, alinhados à régua size/icon-*."
      barColor="#5856D6"
    />
    <GptDocStage label="12 · 16 · 20 · 24 · 32px">
      {[12, 16, 20, 24, 32].map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: size, lineHeight: 1, color: '#000000' }}>{gptGlyphs.close}</div>
          <div style={{ fontSize: 11, color: '#475157', marginTop: 10 }}>{size}px</div>
        </div>
      ))}
    </GptDocStage>

    <GptDocStage label="Nos componentes reais">
      <IconButton size="sm" aria-label="Fechar">
        {gptGlyphs.close}
      </IconButton>
      <IconButton variant="primary" aria-label="Avançar">
        {gptGlyphs.arrowRight}
      </IconButton>
      <Tag glyph={gptGlyphs.sparkle}>Brainstorm</Tag>
      <SearchInput readOnly />
      <div style={{ width: 240 }}>
        <NavItem glyph={gptGlyphs.chat} state="active">
          Chat conversation
        </NavItem>
      </div>
    </GptDocStage>

    <GptDocStage label="Compositor e botão de nova conversa" direction="column" align="flex-start">
      <ChatInput readOnly />
      <div style={{ width: 244 }}>
        <Sidebar.NewChatButton />
      </div>
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras derivadas da diretriz de iconografia da arquitetura."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Consumir os caracteres por gptGlyphs, nunca colando o símbolo direto no JSX da aplicação.',
        'Marcar o glifo como aria-hidden e dar o significado ao rótulo acessível do controle — os componentes já fazem isso.',
        'Dimensionar o glifo pelo corpo de fonte do componente, mantendo o alvo de toque quadrado.',
        'Injetar uma família de ícones vetorial pela prop de glifo quando o produto já tiver uma.',
      ]}
      donts={[
        'Desenhar um <svg> aproximado para substituir um glifo — é vedado pela diretriz de iconografia.',
        'Adicionar um símbolo que não exista em nenhuma camada do arquivo de design.',
        'Depender de emoji colorido (💬) para transmitir informação essencial: a renderização varia por sistema.',
        'Reutilizar os ícones do Instanooria ou da Plataforma Unooria dentro do ChatGPT.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="O glifo herda a cor do componente que o contém; o caractere é invariante."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher>
      {() => (
        <>
          <IconButton aria-label="Fechar">{gptGlyphs.close}</IconButton>
          <IconButton variant="filled" aria-label="Avançar">
            {gptGlyphs.arrowRight}
          </IconButton>
          <IconButton variant="primary" aria-label="Enviar">
            {gptGlyphs.send}
          </IconButton>
          <Tag glyph={gptGlyphs.sparkle}>Brainstorm</Tag>
        </>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa dos Glifos"
      description="Caractere, camada de origem e aplicação de cada token."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="gptGlyphs"
      rows={NOMES.map((name) => ({
        name,
        type: `'${gptGlyphs[name]}'`,
        default: ORIGEM[name].camada,
        description: ORIGEM[name].uso,
      }))}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'ChatGPT/Fundamentos/Glifos',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Os sete glifos tipográficos usados como ícone pelos componentes do arquivo Figma do ChatGPT.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa dos glifos.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <GlifosDocumentationPage />,
};

/**
 * Catálogo dos sete caracteres.
 */
export const Catalogo: Story = {
  name: '🔤 Catálogo',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
      {NOMES.map((name) => (
        <div
          key={name}
          style={{
            border: '1px solid #E4E8E9',
            borderRadius: 12,
            padding: 16,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 32, lineHeight: 1 }}>{gptGlyphs[name]}</div>
          <div style={{ fontSize: 13, fontWeight: 700, marginTop: 12 }}>{name}</div>
        </div>
      ))}
    </div>
  ),
};
