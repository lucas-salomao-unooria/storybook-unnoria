import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RichTextEditor } from '../../../src/unooria/components/RichTextEditor/RichTextEditor';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/RichTextEditor/RichTextEditor.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

const FIGMA_SAMPLE_HTML = `
<h2>1. Metodologia Ágil no SENAI</h2>
<p>O <strong>Design System Unooria</strong> foi concebido para entregar consistência, agilidade e acessibilidade em todas as experiências digitais do ecossistema de educação e indústria.</p>
<blockquote>"A simplicidade e a eficiência são os pilares da nossa arquitetura de componentes."</blockquote>
<h3>Principais Recursos:</h3>
<ul>
  <li>Componentes baseados em tokens padronizados.</li>
  <li>Suporte nativo a <em>Light Mode</em> e <em>Dark Mode</em>.</li>
  <li>Acessibilidade semântica (ARIA) em conformidade com a WCAG 2.1 AA.</li>
</ul>
<p>Para mais detalhes, consulte a documentação oficial ou acesse os <a href="https://senai.br" target="_blank">recursos do SENAI</a>.</p>
`;

/**
 * Página principal de documentação rica do componente RichTextEditor
 */
const RichTextEditorDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');
  const [liveHtml, setLiveHtml] = useState<string>(FIGMA_SAMPLE_HTML);
  const [livePlainText, setLivePlainText] = useState<string>('');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Entrada de Texto & Formulários"
        title="RichTextEditor"
        description="O Rich Text Editor permite aos usuários criar e formatar conteúdo textual rico (negrito, itálico, sublinhado, listas, links, títulos, citações e imagens), oferecendo uma experiência moderna e integrada ao Design System Unooria."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 18577:27000 / 18536:24047)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 18577:27000)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design exato conforme especificado na prancha do Figma para o componente Rich Text Editor.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=18577-27000&m=dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#F1F5F9',
              color: '#0086FF',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid #E2E8F0',
            }}
          >
            <span>Abrir no Figma (Dev Mode)</span>
            <span>↗</span>
          </a>
        </div>

        {/* CONTAINER ESCURO FIGMA #22272A */}
        <div
          style={{
            backgroundColor: '#22272A',
            borderRadius: '32px',
            padding: '56px 48px',
            color: '#FFFFFF',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Header do Frame Figma */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '28px' }}>
            <span style={{ fontSize: '16px', color: '#CBD4D6', fontWeight: 400 }}>Components</span>
            <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Rich Text Editor</h1>
            <span style={{ fontSize: '18px', color: '#7FA5E2', fontWeight: 500 }}>Editor de Conteúdo com Formatação Avançada</span>
          </div>

          {/* Texto Conceitual do Figma */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              lineHeight: 1.6,
            }}
          >
            <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
              O que é o Rich Text Editor?
            </h3>
            <p style={{ fontSize: '14px', color: '#CBD4D6', margin: 0 }}>
              O <strong>Rich Text Editor</strong> é um componente que permite ao usuário criar e editar conteúdo textual com
              formatação avançada, como negrito, itálico, sublinhado, listas, links e títulos. Ele oferece uma experiência
              semelhante a de editores de texto comuns (como Google Docs ou Word), mas integrada diretamente na interface da
              aplicação. Seu principal objetivo é dar liberdade para que o usuário produza textos ricos e estruturados sem
              precisar escrever código HTML.
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
              <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>
                <strong style={{ color: '#7FA5E2' }}>Exemplo visual do Figma:</strong> Em um campo de <em>"Descrição da Atividade"</em>,
                o Rich Text Editor permite destacar partes importantes do texto (como prazos ou nomes de responsáveis),
                inserir links úteis e organizar o conteúdo em listas numeradas, melhorando a legibilidade e a compreensão.
              </p>
            </div>
          </div>

          {/* Componente Fiel Renderizado dentro do Frame Escuro Figma */}
          <div
            style={{
              backgroundColor: '#1E2328',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <RichTextEditor
              label="Descrição da Atividade"
              defaultValue={FIGMA_SAMPLE_HTML}
              theme="dark"
              minHeight="260px"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: ANATOMIA DA BARRA DE FERRAMENTAS (7 GRUPOS)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Anatomia da Barra de Ferramentas (7 Grupos Funcionais)"
          description="A Toolbar é dividida em grupos modulares separados por divisores verticais de 1px com ícones do Material Symbols."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[
            {
              group: '1. Histórico',
              desc: 'Comandos de Desfazer (Undo / replay) e Refazer (Redo / forward_media).',
              icons: 'replay, forward_media',
            },
            {
              group: '2. Estilo de Parágrafo',
              desc: 'Dropdown com 9 opções: Normal, Títulos (H1, H2, H3), Listas, Checklist, Citar e Código.',
              icons: 'notes, format_h1, format_quote, code',
            },
            {
              group: '3. Tipografia',
              desc: 'Seletor de Família de Fonte (Open Sans padrão, Neo Sans Pro, Inter, etc.).',
              icons: 'title, keyboard_arrow_down',
            },
            {
              group: '4. Tamanho de Fonte',
              desc: 'NumberButton XS com controle incremental (+) e decremental (-).',
              icons: 'remove, add',
            },
            {
              group: '5. Formatação & Cores',
              desc: 'Negrito, Itálico, Sublinhado, Tachado, Código, Link, Cor do Texto e Cor de Realce.',
              icons: 'format_color_fill, link',
            },
            {
              group: '6. Inserir Mídia',
              desc: 'Botão para inserção de imagens com URL ou upload direto.',
              icons: 'add_photo_alternate, image_search',
            },
            {
              group: '7. Alinhamento & Recuo',
              desc: 'À esquerda, Centralizar, À direita, Justificar, Aumentar recuo e Diminuir recuo.',
              icons: 'format_align_left, format_indent_increase',
            },
          ].map((item) => (
            <div
              key={item.group}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>{item.group}</div>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              <code style={{ fontSize: '11px', color: '#0086FF', backgroundColor: '#F0F7FF', padding: '4px 8px', borderRadius: '4px' }}>
                Ícones: {item.icons}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: SIMULADOR INTERATIVO COM PREVIEW EM TEMPO REAL
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Simulador Interativo com Inspeção de HTML"
          description="Digite, formate com as ferramentas da barra e visualize a sincronização do código HTML e das métricas."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <RichTextEditor
              label="Editor Interativo"
              defaultValue={liveHtml}
              placeholder="Digite seu conteúdo aqui..."
              onChange={(html, text) => {
                setLiveHtml(html);
                setLivePlainText(text);
              }}
              minHeight="220px"
              showWordCount={true}
              showCharCount={true}
              maxLength={2000}
            />

            {/* Código HTML Gerado */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                HTML de Saída Gerado em Tempo Real:
              </div>
              <pre
                style={{
                  backgroundColor: '#1E2328',
                  color: '#A7B5B9',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  lineHeight: 1.5,
                  overflowX: 'auto',
                  margin: 0,
                  maxHeight: '160px',
                }}
              >
                {liveHtml}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 4: SUPORTE A TEMAS (LIGHT & DARK)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <UnooriaDocSectionHeader
            title="Suporte a Temas (Light & Dark Mode)"
            description="Alternância suave entre tema claro e escuro mantendo contraste ideal de texto (#FFFFFF no Dark Mode)."
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTheme('light')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: activeTheme === 'light' ? '1px solid #0086FF' : '1px solid #CBD5E1',
                backgroundColor: activeTheme === 'light' ? '#0086FF' : '#FFFFFF',
                color: activeTheme === 'light' ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Light Mode
            </button>
            <button
              onClick={() => setActiveTheme('dark')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: activeTheme === 'dark' ? '1px solid #7FA5E2' : '1px solid #CBD5E1',
                backgroundColor: activeTheme === 'dark' ? '#22272A' : '#FFFFFF',
                color: activeTheme === 'dark' ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Dark Mode
            </button>
          </div>
        </div>

        <div
          style={{
            backgroundColor: activeTheme === 'dark' ? '#181C1E' : '#F8FAFC',
            borderRadius: '16px',
            border: activeTheme === 'dark' ? '1px solid #383E41' : '1px solid #E2E8F0',
            padding: '32px',
            transition: 'all 0.2s ease',
          }}
        >
          <RichTextEditor
            label="Editor no Tema Selecionado"
            defaultValue="<p>Experimente alternar os botões acima para ver o tema aplicado aos menus, botões e corpo do editor.</p>"
            theme={activeTheme}
            minHeight="180px"
          />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: BOAS PRÁTICAS DE USO
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Diretrizes essenciais de usabilidade para formulários ricos."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* DO */}
          <div
            style={{
              backgroundColor: '#F0FDF4',
              borderRadius: '16px',
              border: '1px solid #BBF7D0',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16A34A', fontWeight: 700, fontSize: '16px' }}>
              <span>✓</span> O QUE FAZER (DO)
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534', fontSize: '14px', lineHeight: 1.6 }}>
              <li>
                <strong>Forneça rótulos claros:</strong> Identifique qual seção do formulário está sendo editada.
              </li>
              <li>
                <strong>Defina altura mínima adequada:</strong> Garanta pelo menos <code>240px</code> para digitação confortável.
              </li>
              <li>
                <strong>Exiba contadores em limites rígidos:</strong> Ative <code>showCharCount</code> e <code>maxLength</code> para evitar textos truncados.
              </li>
            </ul>
          </div>

          {/* DON'T */}
          <div
            style={{
              backgroundColor: '#FEF2F2',
              borderRadius: '16px',
              border: '1px solid #FECACA',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontWeight: 700, fontSize: '16px' }}>
              <span>✕</span> O QUE EVITAR (DON'T)
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#991B1B', fontSize: '14px', lineHeight: 1.6 }}>
              <li>
                <strong>Não use para entradas simples de 1 linha:</strong> Para títulos simples ou e-mails, use o <code>Input</code> padrão.
              </li>
              <li>
                <strong>Não sobrecarregue a barra de ferramentas:</strong> Oculte grupos não necessários através de <code>toolbarConfig</code>.
              </li>
              <li>
                <strong>Não desative atalhos padrão:</strong> Mantenha suporte a <kbd>Ctrl+B</kbd>, <kbd>Ctrl+I</kbd>, <kbd>Tab</kbd> para acessibilidade.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 6: REFERÊNCIA COMPLETA DE PROPS
          ========================================================================= */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="Referência Completa de Props da API"
          description="Todas as propriedades suportadas pelo componente RichTextEditor."
        />

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Prop</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Tipo</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Padrão</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>defaultValue</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>string</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>''</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Conteúdo HTML inicial no modo não-controlado.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>placeholder</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>string</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'Comece a digitar...'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Texto de ajuda quando vazio.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>minHeight</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>string | number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'240px'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Altura mínima da caixa de edição.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>readOnly</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Oculta a barra e bloqueia digitação.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>showWordCount</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>true</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Exibe contador de palavras no rodapé.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>showCharCount</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>true</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Exibe contador de caracteres no rodapé.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>theme</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'light' | 'dark'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'light'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tema visual de contraste.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>onChange</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>(html, text) =&gt; void</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Callback acionado na digitação.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof RichTextEditor> = {
  title: 'Plataforma Unooria/Componentes/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Rótulo do campo',
      defaultValue: 'Descrição da Atividade',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder quando vazio',
      defaultValue: 'Comece a digitar seu texto aqui...',
    },
    minHeight: {
      control: 'text',
      description: 'Altura mínima',
      defaultValue: '240px',
    },
    readOnly: {
      control: 'boolean',
      description: 'Modo apenas leitura',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Desativar componente',
      defaultValue: false,
    },
    showWordCount: {
      control: 'boolean',
      description: 'Exibir contador de palavras',
      defaultValue: true,
    },
    showCharCount: {
      control: 'boolean',
      description: 'Exibir contador de caracteres',
      defaultValue: true,
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual',
      defaultValue: 'light',
    },
  },
  args: {
    label: 'Descrição da Atividade',
    placeholder: 'Comece a digitar seu texto aqui...',
    minHeight: '240px',
    readOnly: false,
    disabled: false,
    showWordCount: true,
    showCharCount: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof RichTextEditor>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <RichTextEditorDocumentationPage />,
};

/**
 * Playground interativo com 100% das props mapeadas em controles do Storybook.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => (
    <div
      style={{
        maxWidth: '840px',
        padding: '24px',
        backgroundColor: args.theme === 'dark' ? '#181C1E' : '#F8FAFC',
        borderRadius: '16px',
      }}
    >
      <RichTextEditor {...args} defaultValue={FIGMA_SAMPLE_HTML} />
    </div>
  ),
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 18577:27000).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 18577:27000)',
  render: () => (
    <div
      style={{
        backgroundColor: '#22272A',
        padding: '48px',
        borderRadius: '24px',
        maxWidth: '840px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
      }}
    >
      <RichTextEditor
        label="Descrição da Atividade"
        defaultValue={FIGMA_SAMPLE_HTML}
        theme="dark"
        minHeight="280px"
      />
    </div>
  ),
};

/**
 * Modo Apenas Leitura (Ideal para visualização de termos, ementas e posts).
 */
export const ModoApenasLeitura: Story = {
  name: 'Modo Apenas Leitura',
  render: () => (
    <div style={{ maxWidth: '800px', padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
      <RichTextEditor
        label="Termos de Uso e Política de Privacidade"
        defaultValue={FIGMA_SAMPLE_HTML}
        readOnly={true}
      />
    </div>
  ),
};

/**
 * Estado de Validação e Erro de Formulário.
 */
export const EstadoDeErro: Story = {
  name: 'Estado de Erro de Validação',
  render: () => (
    <div style={{ maxWidth: '800px', padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
      <RichTextEditor
        label="Justificativa da Proposta"
        placeholder="Descreva detalhadamente a justificativa..."
        error="A justificativa é obrigatória e deve conter ao menos 50 caracteres."
      />
    </div>
  ),
};
