import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollBar } from '../../../src/unooria/components/ScrollBar/ScrollBar';
import { Icon } from '../../../src/unooria/components/Icon/Icon';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/tokens/scrollbar.css';
import '../../../src/unooria/components/ScrollBar/ScrollBar.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Página principal de documentação rica do componente ScrollBar (Padrão Ouro)
 */
const ScrollBarDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Navegação & Estrutura"
        title="Scroll Bar"
        description="A scroll bar permite a navegação fluida em conteúdos maiores que a tela ou container, podendo ser vertical ou horizontal. Deve ser intuitiva, acessível e integrar-se ao design da interface, eliminando barras cinzas padrão dos navegadores."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 6104:5351)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 6104:5351)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design e proporções exatas conforme especificadas na prancha oficial do Figma para o componente Scroll Bar.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=6104-5351&m=dev"
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

        {/* CONTAINER FIEL FIGMA (445px largura, padding 64px, fundo branco) */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid #E4E8E9',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            maxWidth: '560px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          {/* Header do Frame Figma */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '18px', color: '#475157', fontWeight: 400 }}>Components</span>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#22272A', margin: '0 0 16px 0', lineHeight: 1.2 }}>
              Scroll Bar
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475157', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>O que são:</strong> A scroll bar permite a navegação em conteúdos maiores que a tela,
                podendo ser vertical ou horizontal. Deve ser intuitiva, acessível e integrar-se ao design da interface.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>Exemplo visual:</strong> Pode ser sempre visível ou aparecer ao interagir, com
                contraste adequado para fácil identificação.
              </p>
            </div>
          </div>

          {/* Variantes Figma Renderizadas Fielmente */}
          <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start', borderTop: '1px solid #E4E8E9', paddingTop: '32px' }}>
            {/* Variante 1: Vertical */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C8E94', textTransform: 'uppercase' }}>
                Vertical (4px)
              </span>
              <div
                style={{
                  position: 'relative',
                  width: '12px',
                  height: '240px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '1000px',
                  padding: '8px 0',
                }}
              >
                {/* Trilho 2px */}
                <div
                  style={{
                    position: 'absolute',
                    width: '2px',
                    height: '220px',
                    backgroundColor: 'rgba(34, 39, 42, 0.05)',
                    borderRadius: '1000px',
                  }}
                />
                {/* Thumb 4px */}
                <div
                  style={{
                    position: 'absolute',
                    top: '32px',
                    width: '4px',
                    height: '60px',
                    backgroundColor: 'rgba(34, 39, 42, 0.30)',
                    borderRadius: '1000px',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>

            {/* Variante 2: Horizontal */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#7C8E94', textTransform: 'uppercase' }}>
                Horizontal (4px)
              </span>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '1000px',
                  padding: '0 8px',
                }}
              >
                {/* Trilho 2px */}
                <div
                  style={{
                    position: 'absolute',
                    height: '2px',
                    width: '90%',
                    backgroundColor: 'rgba(34, 39, 42, 0.05)',
                    borderRadius: '1000px',
                  }}
                />
                {/* Thumb 4px */}
                <div
                  style={{
                    position: 'absolute',
                    left: '24px',
                    height: '4px',
                    width: '60px',
                    backgroundColor: 'rgba(34, 39, 42, 0.30)',
                    borderRadius: '1000px',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: ANATOMIA E TABELA DE TOKENS OFICIAIS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Anatomia & Tokens de Cores e Dimensões"
          description="Tokens oficiais do Design System Unooria com integração nativa ao arquivo colors.css."
        />

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E4E8E9' }}>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Propriedade</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Valor Figma</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Token Oficial</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Variável CSS</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Thumb Size (Espessura)</td>
                <td style={{ padding: '12px 18px' }}>4px (Slim)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>spacing-3xs</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-scrollbar-thumb-size: 4px;</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Track Size (Trilho)</td>
                <td style={{ padding: '12px 18px' }}>2px</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>spacing-4xs</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-scrollbar-track-size: 2px;</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Border Radius</td>
                <td style={{ padding: '12px 18px' }}>1000px</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>radius-full</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-scrollbar-radius: 1000px;</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Track (Light Mode)</td>
                <td style={{ padding: '12px 18px' }}>rgba(34, 39, 42, 0.05)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>neutraldark-50</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-opacity-neutraldark-50</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Thumb (Light Default)</td>
                <td style={{ padding: '12px 18px' }}>rgba(34, 39, 42, 0.30)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>neutraldark-300</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-opacity-neutraldark-300</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Thumb (Light Hover)</td>
                <td style={{ padding: '12px 18px' }}>rgba(34, 39, 42, 0.50)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>neutraldark-500</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-opacity-neutraldark-500</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Track (Dark Mode)</td>
                <td style={{ padding: '12px 18px' }}>rgba(255, 255, 255, 0.05)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>neutrallight-50</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-opacity-neutrallight-50</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Thumb (Dark Default)</td>
                <td style={{ padding: '12px 18px' }}>rgba(255, 255, 255, 0.30)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>neutrallight-300</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-opacity-neutrallight-300</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: SIMULADORES INTERATIVOS DE ROLAGEM
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Simuladores Interativos de Rolagem"
          description="Exemplos reais de aplicação do componente ScrollBar em listas verticais, tabelas horizontais e modo auto-hide."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Exemplo 1: Rolagem Vertical em Lista */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Icon name="format_list_bulleted" size="xs" color="#0086FF" />
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#22272A' }}>
                Lista Vertical (Ementa de Módulos)
              </h4>
            </div>

            <ScrollBar maxHeight="220px">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '12px' }}>
                {[
                  '1. Introdução à Arquitetura de Software',
                  '2. Fundamentos de Design System e Tokens',
                  '3. Componentização em React e TypeScript',
                  '4. Gestão de Estado Global com Zustand',
                  '5. Acessibilidade Semântica e WCAG 2.1',
                  '6. Testes Automatizados e Storybook Docs',
                  '7. Otimização de Performance e Bundle Size',
                  '8. Deploy Contínuo e Publicação NPM',
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 14px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: '#334155',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </ScrollBar>
          </div>

          {/* Exemplo 2: Rolagem Horizontal em Tabela */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Icon name="table_chart" size="xs" color="#0086FF" />
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#22272A' }}>
                Tabela com Rolagem Horizontal
              </h4>
            </div>

            <ScrollBar orientation="horizontal">
              <div style={{ minWidth: '540px', paddingBottom: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F1F5F9', textAlign: 'left' }}>
                      <th style={{ padding: '8px 12px' }}>Código</th>
                      <th style={{ padding: '8px 12px' }}>Aluno</th>
                      <th style={{ padding: '8px 12px' }}>Curso</th>
                      <th style={{ padding: '8px 12px' }}>Progresso</th>
                      <th style={{ padding: '8px 12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'AL-001', name: 'Ana Silva', course: 'Dev Full Stack', prog: '92%', status: 'Ativo' },
                      { id: 'AL-002', name: 'Bruno Costa', course: 'UX/UI Design', prog: '65%', status: 'Ativo' },
                      { id: 'AL-003', name: 'Carlos Lima', course: 'Ciência de Dados', prog: '38%', status: 'Pendente' },
                    ].map((row) => (
                      <tr key={row.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                        <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{row.id}</td>
                        <td style={{ padding: '8px 12px', fontWeight: 600 }}>{row.name}</td>
                        <td style={{ padding: '8px 12px' }}>{row.course}</td>
                        <td style={{ padding: '8px 12px' }}>{row.prog}</td>
                        <td style={{ padding: '8px 12px' }}>{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollBar>
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
            description="Contraste adaptativo transparente no fundo escuro (#22272A) e claro (#FFFFFF)."
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
            border: activeTheme === 'dark' ? '1px solid #383E41' : '1px solid #E4E8E9',
            padding: '32px',
            transition: 'all 0.2s ease',
          }}
        >
          <ScrollBar maxHeight="160px" theme={activeTheme}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                paddingRight: '12px',
                color: activeTheme === 'dark' ? '#F5F5F5' : '#22272A',
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: activeTheme === 'dark' ? '#22272A' : '#FFFFFF',
                    border: activeTheme === 'dark' ? '1px solid #3D4448' : '1px solid #E4E8E9',
                    fontSize: '13px',
                  }}
                >
                  Item de Conteúdo Rolável {num} ({activeTheme === 'dark' ? 'Modo Escuro' : 'Modo Claro'})
                </div>
              ))}
            </div>
          </ScrollBar>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: BOAS PRÁTICAS DE USO
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Recomendações para manter a usabilidade consistente em interfaces ricas."
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
                <strong>Use a espessura padrão Slim (4px):</strong> Mantém a barra sutil e não concorre com o conteúdo principal.
              </li>
              <li>
                <strong>Ative autoHide para dashboards e cards:</strong> Oculta a barra enquanto ociosa para um visual limpo.
              </li>
              <li>
                <strong>Adicione padding lateral:</strong> Deixe um pequeno espaçamento (`padding-right: 8px`) para o thumb não sobrepor textos.
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
                <strong>Não use scrollbars cinzas nativas:</strong> Sempre utilize a classe <code>.unooria-scrollbar</code> ou o wrapper <code>ScrollBar</code>.
              </li>
              <li>
                <strong>Não sobreponha rolagem horizontal e vertical desnecessariamente:</strong> Use <code>orientation="vertical"</code> por padrão.
              </li>
              <li>
                <strong>Não force altura fixa minúscula:</strong> Deixe ao menos <code>140px</code> para que o usuário possa rolar confortavelmente.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 6: REFERÊNCIA DE PROPS
          ========================================================================= */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="Referência Completa de Props da API"
          description="Todas as propriedades suportadas pelo componente ScrollBar."
        />

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E4E8E9' }}>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Prop</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Tipo</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Padrão</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>orientation</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'vertical' | 'horizontal' | 'both'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'vertical'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Direção permitida de rolagem.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>thickness</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'slim' | 'regular' | 'thick'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'slim'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Espessura da barra (slim = 4px do Figma).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>autoHide</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Exibe a barra apenas no hover ou rolagem.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>maxHeight</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>string | number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Altura máxima do container com scroll.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>maxWidth</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>string | number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Largura máxima do container com scroll.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>theme</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'light' | 'dark'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'light'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tema visual de contraste.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof ScrollBar> = {
  title: 'Plataforma Unooria/Componentes/ScrollBar',
  component: ScrollBar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: 'Direção da rolagem',
      defaultValue: 'vertical',
    },
    thickness: {
      control: 'radio',
      options: ['slim', 'regular', 'thick'],
      description: 'Espessura visual da barra',
      defaultValue: 'slim',
    },
    autoHide: {
      control: 'boolean',
      description: 'Oculta e exibe com fade-in no hover',
      defaultValue: false,
    },
    maxHeight: {
      control: 'text',
      description: 'Altura máxima',
      defaultValue: '220px',
    },
    maxWidth: {
      control: 'text',
      description: 'Largura máxima',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual',
      defaultValue: 'light',
    },
  },
  args: {
    orientation: 'vertical',
    thickness: 'slim',
    autoHide: false,
    maxHeight: '220px',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ScrollBar>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ScrollBarDocumentationPage />,
};

/**
 * Playground interativo com 100% das props mapeadas em controles.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => (
    <div
      style={{
        maxWidth: '480px',
        padding: '24px',
        backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF',
        borderRadius: '16px',
        border: args.theme === 'dark' ? '1px solid #383E41' : '1px solid #E4E8E9',
      }}
    >
      <ScrollBar {...args}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '12px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              style={{
                padding: '12px',
                backgroundColor: args.theme === 'dark' ? '#22272A' : '#F8FAFC',
                color: args.theme === 'dark' ? '#F5F5F5' : '#22272A',
                borderRadius: '8px',
                fontSize: '13px',
                border: args.theme === 'dark' ? '1px solid #3D4448' : '1px solid #E2E8F0',
              }}
            >
              Elemento rolável da lista número {i}
            </div>
          ))}
        </div>
      </ScrollBar>
    </div>
  ),
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 6104:5351).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 6104:5351)',
  render: () => (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '48px',
        border: '1px solid #E4E8E9',
        maxWidth: '520px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '32px' }}>
        <span style={{ fontSize: '18px', color: '#475157' }}>Components</span>
        <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#22272A', margin: '0 0 16px 0', lineHeight: 1.2 }}>
          Scroll Bar
        </h1>
        <p style={{ fontSize: '13px', color: '#475157', margin: '0 0 8px 0', lineHeight: 1.6 }}>
          <strong>O que são:</strong> A scroll bar permite a navegação em conteúdos maiores que a tela, podendo ser vertical ou horizontal.
        </p>
        <p style={{ fontSize: '13px', color: '#475157', margin: 0, lineHeight: 1.6 }}>
          <strong>Exemplo visual:</strong> Pode ser sempre visível ou aparecer ao interagir, com contraste adequado.
        </p>
      </div>

      <ScrollBar maxHeight="240px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '12px' }}>
          {[
            'Módulo 1: Fundamentos de Arquitetura',
            'Módulo 2: Design Tokens & CSS Variables',
            'Módulo 3: Componentes e Acessibilidade',
            'Módulo 4: Animações e Micro-interações',
            'Módulo 5: Documentação Rica no Storybook',
            'Módulo 6: Testes Automatizados e CI/CD',
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: '12px',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#334155',
                border: '1px solid #E2E8F0',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </ScrollBar>
    </div>
  ),
};

/**
 * Rolagem Vertical com Lista Fluida.
 */
export const RolagemVertical: Story = {
  name: 'Rolagem Vertical',
  render: () => (
    <div style={{ maxWidth: '420px', padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
      <ScrollBar maxHeight="200px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '12px' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: '8px', fontSize: '13px' }}>
              Notificação do Sistema #{i + 1}
            </div>
          ))}
        </div>
      </ScrollBar>
    </div>
  ),
};

/**
 * Rolagem Horizontal em Carrossel/Tabela.
 */
export const RolagemHorizontal: Story = {
  name: 'Rolagem Horizontal',
  render: () => (
    <div style={{ maxWidth: '500px', padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
      <ScrollBar orientation="horizontal">
        <div style={{ display: 'flex', gap: '12px', paddingBottom: '8px', width: 'max-content' }}>
          {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'].map((m) => (
            <div
              key={m}
              style={{
                width: '120px',
                height: '80px',
                backgroundColor: '#F1F5F9',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '13px',
                color: '#334155',
                border: '1px solid #E2E8F0',
              }}
            >
              {m}
            </div>
          ))}
        </div>
      </ScrollBar>
    </div>
  ),
};

/**
 * Modo Auto-Hide (Aparece com fade-in apenas no hover).
 */
export const AutoHideAoInteragir: Story = {
  name: 'Auto-Hide (Aparece ao Interagir)',
  render: () => (
    <div style={{ maxWidth: '420px', padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
      <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 12px 0' }}>
        Passe o mouse sobre a caixa abaixo para ver a barra de rolagem surgir suavemente:
      </p>
      <ScrollBar maxHeight="180px" autoHide={true}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '12px' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: '8px', fontSize: '13px' }}>
              Item com Auto-Hide #{i + 1}
            </div>
          ))}
        </div>
      </ScrollBar>
    </div>
  ),
};
