import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../../../src/unooria/components/Pagination/Pagination';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/Pagination/Pagination.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Página principal de documentação rica do componente Pagination
 */
const PaginationDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');
  const [interactivePage, setInteractivePage] = useState<number>(5);
  const [interactiveTotalPages, setInteractiveTotalPages] = useState<number>(10);
  const [interactivePageSize, setInteractivePageSize] = useState<number>(10);
  const [pageChangeLog, setPageChangeLog] = useState<string | null>(null);

  const handlePageChange = (newPage: number) => {
    setInteractivePage(newPage);
    setPageChangeLog(`Navegou para a página ${newPage}`);
    setTimeout(() => setPageChangeLog(null), 2500);
  };

  // Mock de dados para simular listagem real
  const mockTableData = Array.from({ length: 10 }, (_, i) => {
    const itemIndex = (interactivePage - 1) * interactivePageSize + i + 1;
    return {
      id: itemIndex,
      codigo: `CUR-${String(itemIndex).padStart(4, '0')}`,
      curso: [
        'UX Design Avançado',
        'React & Next.js Pro',
        'Arquitetura de Software',
        'Metodologias Ágeis',
        'Inteligência Artificial Aplicada',
        'TypeScript Fullstack',
        'Design System & Tokens',
        'Segurança da Informação',
        'DevOps & CI/CD',
        'Banco de Dados Relacional',
      ][i % 10],
      setor: 'Tecnologia da Informação',
      status: itemIndex % 3 === 0 ? 'Concluído' : 'Em Andamento',
    };
  });

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Navegação"
        title="Pagination"
        description="Componente interativo para organizar grandes volumes de conteúdo, dividindo-os em páginas sequenciais para melhorar a navegação, orientação visual e desempenho da interface."
      />

      {/* FEEDBACK DE MUDANÇA DE PÁGINA */}
      {pageChangeLog && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#22272A',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            fontSize: '14px',
            fontWeight: 600,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <span style={{ color: '#01B574' }}>✓</span>
          <span>{pageChangeLog}</span>
        </div>
      )}

      {/* =========================================================================
          SEÇÃO 1: REPRODUÇÃO FIEL DO FIGMA (Node 24440:20534 / 5223:314)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 24440:20534)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design exato conforme especificado na prancha do Figma para o componente Pagination.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=24440-20534&m=dev"
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
            <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Pagination</h1>
            <span style={{ fontSize: '18px', color: '#7FA5E2', fontWeight: 500 }}>Divisão Sequencial e Navegação por Páginas</span>
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
              O que é o componente Pagination?
            </h3>
            <p style={{ fontSize: '14px', color: '#CBD4D6', margin: 0 }}>
              A paginação organiza grandes volumes de conteúdo, dividindo-os em várias páginas para melhorar a navegação
              e a experiência do usuário. Deve ser intuitiva, exibindo claramente a página atual e oferecendo fácil acesso
              às próximas e anteriores.
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
              <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>
                <strong style={{ color: '#7FA5E2' }}>Exemplo visual do Figma:</strong> Os botões devem ter tamanho adequado para
                cliques precisos (altura padrão de 26px, raio de 8px), com destaque cromático na página ativa (fundo `#6487C2`),
                bordas discretas `#3D4448`, elipses para intervalos longos e mecanismo de salto direto com input numérico.
              </p>
            </div>
          </div>

          {/* Componente Fiel Renderizado dentro do Frame Escuro Figma */}
          <div
            style={{
              backgroundColor: '#1E2328',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span style={{ fontSize: '12px', color: '#7FA5E2', textTransform: 'uppercase', fontWeight: 600, alignSelf: 'flex-start' }}>
              Reprodução 1:1 do Node 5223:314 (10 páginas, página 5 ativa)
            </span>

            <Pagination
              totalPages={10}
              currentPage={5}
              theme="dark"
              showJumpToPage={true}
              onPageChange={(p) => handlePageChange(p)}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: ANATOMIA E ESPECIFICAÇÕES TÉCNICAS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Anatomia e Especificações Técnicas"
          description="Detalhamento das dimensões, raios de borda, gaps e tokens visuais extraídos do Figma."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>🔢</div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', margin: '0 0 6px 0' }}>Botões Numéricos</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#64748B', lineHeight: 1.6 }}>
              <li>Altura: <strong>26px</strong> (SM - Padrão Figma)</li>
              <li>Largura: <strong>27px a 30px</strong> (padding 4px 8px)</li>
              <li>Raio: <strong>8px</strong> (<code>--unooria-radius-md</code>)</li>
              <li>Borda Padrão: <code>1px solid #3D4448</code></li>
              <li>Fundo Ativo: <code>#6487C2</code> (Texto Branco)</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>⚡</div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', margin: '0 0 6px 0' }}>Salto de Página ("Ir para página")</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#64748B', lineHeight: 1.6 }}>
              <li>Rótulo: <em>"Ir para página"</em> (Open Sans 12px)</li>
              <li>Input Box: Largura <strong>56px</strong>, Altura <strong>26px</strong></li>
              <li>Botão Submit: Seta <code>keyboard_arrow_right</code> (24x24px)</li>
              <li>Validação: Apenas inteiros entre <code>1</code> e <code>totalPages</code></li>
            </ul>
          </div>

          {/* Card 3 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>📐</div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', margin: '0 0 6px 0' }}>Gaps & Espaçamentos</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#64748B', lineHeight: 1.6 }}>
              <li>Gap entre botões numéricos: <strong>4px</strong> (<code>--unooria-spacing-xxxs</code>)</li>
              <li>Gap entre grupos principais: <strong>24px</strong> (<code>--unooria-spacing-m</code>)</li>
              <li>Elipses: <code>...</code> com largura de 27px sem borda</li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: SIMULADOR INTERATIVO COM TABELA DE DADOS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <UnooriaDocSectionHeader
              title="Simulador Integrado com Tabela de Dados"
              description="Navegue entre as páginas, altere o número de páginas ou teste o salto direto para visualizar a atualização em tempo real."
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>Total de Páginas:</span>
            <select
              value={interactiveTotalPages}
              onChange={(e) => {
                const total = Number(e.target.value);
                setInteractiveTotalPages(total);
                if (interactivePage > total) setInteractivePage(total);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              <option value={5}>5 páginas</option>
              <option value={10}>10 páginas (Figma)</option>
              <option value={20}>20 páginas</option>
              <option value={50}>50 páginas</option>
            </select>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          {/* Tabela de Dados */}
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '12px 18px', fontWeight: 600, color: '#334155' }}>Código</th>
                <th style={{ padding: '12px 18px', fontWeight: 600, color: '#334155' }}>Nome do Curso</th>
                <th style={{ padding: '12px 18px', fontWeight: 600, color: '#334155' }}>Área Tecnológica</th>
                <th style={{ padding: '12px 18px', fontWeight: 600, color: '#334155' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTableData.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>{row.codigo}</td>
                  <td style={{ padding: '12px 18px', fontWeight: 600, color: '#1E293B' }}>{row.curso}</td>
                  <td style={{ padding: '12px 18px', color: '#475569' }}>{row.setor}</td>
                  <td style={{ padding: '12px 18px' }}>
                    <span
                      style={{
                        backgroundColor: row.status === 'Concluído' ? '#DCFCE7' : '#EFF6FF',
                        color: row.status === 'Concluído' ? '#166534' : '#1D4ED8',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 600,
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Barra de Paginação no Rodapé da Tabela */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#F8FAFC',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <span style={{ fontSize: '13px', color: '#64748B' }}>
              Exibindo página <strong>{interactivePage}</strong> de <strong>{interactiveTotalPages}</strong>
            </span>

            <Pagination
              totalPages={interactiveTotalPages}
              currentPage={interactivePage}
              showJumpToPage={true}
              onPageChange={handlePageChange}
            />
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
            description="Demonstração em tempo real da paginação com contraste balanceado em fundos claros e escuros."
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
            backgroundColor: activeTheme === 'dark' ? '#22272A' : '#FFFFFF',
            borderRadius: '16px',
            border: activeTheme === 'dark' ? '1px solid #383E41' : '1px solid #E2E8F0',
            padding: '32px',
            display: 'flex',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          <Pagination
            totalPages={10}
            currentPage={interactivePage}
            theme={activeTheme}
            showJumpToPage={true}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: BOAS PRÁTICAS DE USO
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Diretrizes essenciais de usabilidade e acessibilidade para navegação sequencial."
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
                <strong>Destaque a página ativa:</strong> Utilize o fundo <code>#6487C2</code> com texto em alto contraste.
              </li>
              <li>
                <strong>Desative setas nos limites:</strong> Desabilite a seta esquerda na página 1 e a seta direita na última página.
              </li>
              <li>
                <strong>Ofereça salto direto:</strong> Inclua o input <em>"Ir para página"</em> quando o total de páginas for superior a 5.
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
                <strong>Não renderize todas as páginas sem elipse:</strong> Listas longas quebram o layout em telas menores.
              </li>
              <li>
                <strong>Não permita valores inválidos no input de salto:</strong> Valide números negativos ou maiores que <code>totalPages</code>.
              </li>
              <li>
                <strong>Não oculte o estado desabilitado:</strong> Elementos desabilitados precisam de <code>opacity: 0.4</code> e <code>cursor: not-allowed</code>.
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
          description="Todas as propriedades suportadas pelo componente Pagination."
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
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>totalPages</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>number</td>
                <td style={{ padding: '12px 18px', color: '#DC2626' }}>Obrigatório</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Quantidade total de páginas calculadas.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>currentPage</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Página ativa no modo controlado.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>defaultPage</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>1</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Página inicial no modo não-controlado.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>showJumpToPage</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>true</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Exibe o formulário &quot;Ir para página [input] &gt;&quot;.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>size</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'sm' | 'md' | 'lg'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'sm' (26px)</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tamanho visual dos botões de paginação.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>theme</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'light' | 'dark'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'light'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tema visual de contraste.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>onPageChange</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>(page: number) =&gt; void</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Função de callback disparada na alteração de página.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Pagination> = {
  title: 'Plataforma Unooria/Componentes/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    totalPages: {
      control: 'number',
      description: 'Quantidade total de páginas',
      defaultValue: 10,
    },
    currentPage: {
      control: 'number',
      description: 'Página ativa atual',
      defaultValue: 5,
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho dos botões (sm: 26px, md: 32px, lg: 40px)',
      defaultValue: 'sm',
    },
    showJumpToPage: {
      control: 'boolean',
      description: 'Exibir grupo "Ir para página"',
      defaultValue: true,
    },
    showFirstLastButtons: {
      control: 'boolean',
      description: 'Exibir botões de primeira e última página',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Desativar paginação',
      defaultValue: false,
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual',
      defaultValue: 'light',
    },
  },
  args: {
    totalPages: 10,
    currentPage: 5,
    size: 'sm',
    showJumpToPage: true,
    showFirstLastButtons: false,
    disabled: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PaginationDocumentationPage />,
};

/**
 * Playground interativo com 100% das props mapeadas em controles do Storybook.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => (
    <div
      style={{
        padding: '32px',
        backgroundColor: args.theme === 'dark' ? '#22272A' : '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        display: 'inline-flex',
      }}
    >
      <Pagination {...args} />
    </div>
  ),
};

/**
 * Réplica visual 1:1 do frame do Figma (Node 24440:20534 / 5223:314).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 24440:20534)',
  render: () => (
    <div
      style={{
        backgroundColor: '#22272A',
        padding: '48px',
        borderRadius: '24px',
        display: 'inline-flex',
        boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
      }}
    >
      <Pagination
        totalPages={10}
        currentPage={5}
        theme="dark"
        showJumpToPage={true}
      />
    </div>
  ),
};

/**
 * Comparativo de todos os tamanhos suportados (SM: 26px, MD: 32px, LG: 40px).
 */
export const Tamanhos: Story = {
  name: 'Tamanhos (SM, MD, LG)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', marginBottom: '8px' }}>
          SM (26px de Altura - Padrão Oficial do Figma)
        </div>
        <Pagination totalPages={8} currentPage={3} size="sm" />
      </div>

      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', marginBottom: '8px' }}>
          MD (32px de Altura)
        </div>
        <Pagination totalPages={8} currentPage={3} size="md" />
      </div>

      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', marginBottom: '8px' }}>
          LG (40px de Altura)
        </div>
        <Pagination totalPages={8} currentPage={3} size="lg" />
      </div>
    </div>
  ),
};

/**
 * Paginação com Seletor de Itens por Página (10, 20, 50, 100).
 */
export const ComItensPorPagina: Story = {
  name: 'Com Seletor de Itens por Página',
  render: () => {
    const [pageSize, setPageSize] = useState<number>(20);
    const [page, setPage] = useState<number>(1);

    return (
      <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <Pagination
          totalPages={15}
          currentPage={page}
          showItemsPerPage={true}
          pageSize={pageSize}
          pageSizeOptions={[10, 20, 50, 100]}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    );
  },
};
